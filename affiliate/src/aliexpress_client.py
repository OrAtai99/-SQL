"""
לקוח ל-AliExpress Affiliate API (Open Platform, gateway /sync).

מבצע:
  • חתימת בקשות ב-HMAC-SHA256 (sign_method=sha256) לפי אלגוריתם AliExpress.
  • חיפוש מוצרים (aliexpress.affiliate.product.query)
  • יצירת קישורי אפילייט (aliexpress.affiliate.link.generate)
  • נרמול תוצאות למבנה אחיד שהצינור והאתר מבינים.

הערה על חתימה (מקור #1 לשגיאות InvalidSignature):
  1. אוספים את כל הפרמטרים (מערכת + עסק) חוץ מ-sign.
  2. ממיינים מפתחות בסדר ASCII עולה.
  3. משרשרים key1value1key2value2 ללא מפרידים וללא URL-encode.
  4. HMAC-SHA256 עם ה-App Secret כמפתח, hex גדול (uppercase).
"""
from __future__ import annotations

import hashlib
import hmac
import time

import requests

GATEWAY = "https://api-sg.aliexpress.com/sync"

# שדות שנבקש מה-API (מצמצם את גודל התגובה)
_PRODUCT_FIELDS = ",".join([
    "product_id",
    "product_title",
    "product_main_image_url",
    "product_detail_url",
    "target_sale_price",
    "target_original_price",
    "target_sale_price_currency",
    "discount",
    "evaluate_rate",
    "lastest_volume",
    "promotion_link",
    "first_level_category_name",
])


class AliExpressClient:
    def __init__(
        self,
        app_key: str,
        app_secret: str,
        tracking_id: str,
        currency: str = "USD",
        language: str = "EN",
        ship_to: str = "US",
    ) -> None:
        self.app_key = app_key
        self.app_secret = app_secret
        self.tracking_id = tracking_id
        self.currency = currency
        self.language = language
        self.ship_to = ship_to

    # ---------------- חתימה ובקשה ----------------
    def _sign(self, params: dict[str, str]) -> str:
        base = "".join(f"{k}{params[k]}" for k in sorted(params))
        return hmac.new(
            self.app_secret.encode("utf-8"),
            base.encode("utf-8"),
            hashlib.sha256,
        ).hexdigest().upper()

    def _call(self, method: str, **business) -> dict:
        params: dict[str, str] = {
            "app_key": self.app_key,
            "method": method,
            "sign_method": "sha256",
            "timestamp": str(int(time.time() * 1000)),  # ms עבור gateway /sync
        }
        for k, v in business.items():
            if v is not None:
                params[k] = str(v)
        params["sign"] = self._sign(params)  # חותמים אחרון, בלי לכלול את sign עצמו

        last_err: Exception | None = None
        for attempt in range(3):
            try:
                resp = requests.post(GATEWAY, data=params, timeout=25)
                data = resp.json()
                if "error_response" in data:
                    err = data["error_response"]
                    raise RuntimeError(
                        f"AliExpress API error: {err.get('code')} {err.get('msg')} "
                        f"{err.get('sub_msg', '')}"
                    )
                return data
            except (requests.RequestException, ValueError) as e:
                last_err = e
                time.sleep(2 ** attempt)
        raise RuntimeError(f"AliExpress request failed after retries: {last_err}")

    # ---------------- חיפוש מוצרים ----------------
    def search_products(
        self,
        keywords: str,
        page_size: int = 20,
        sort: str = "LAST_VOLUME_DESC",
        min_price: float | None = None,
        max_price: float | None = None,
    ) -> list[dict]:
        data = self._call(
            "aliexpress.affiliate.product.query",
            keywords=keywords,
            page_no=1,
            page_size=page_size,
            sort=sort,
            min_sale_price=min_price,
            max_sale_price=max_price,
            target_currency=self.currency,
            target_language=self.language,
            ship_to_country=self.ship_to,
            tracking_id=self.tracking_id,
            fields=_PRODUCT_FIELDS,
        )
        products = _dig(
            data,
            "aliexpress_affiliate_product_query_response",
            "resp_result",
            "result",
            "products",
            "product",
        )
        return [self._normalize(p) for p in (products or [])]

    # ---------------- יצירת קישור אפילייט ----------------
    def generate_link(self, source_url: str) -> str | None:
        data = self._call(
            "aliexpress.affiliate.link.generate",
            promotion_link_type=0,
            source_values=source_url,
            tracking_id=self.tracking_id,
        )
        links = _dig(
            data,
            "aliexpress_affiliate_link_generate_response",
            "resp_result",
            "result",
            "promotion_links",
            "promotion_link",
        )
        if links:
            return links[0].get("promotion_link")
        return None

    # ---------------- נרמול ----------------
    def _normalize(self, p: dict) -> dict:
        # מעדיף את promotion_link שכבר מגיע חתום; אחרת מייצר בעצמו
        link = p.get("promotion_link")
        if not link and p.get("product_detail_url"):
            try:
                link = self.generate_link(p["product_detail_url"])
            except RuntimeError:
                link = p.get("product_detail_url")

        sale = _to_float(p.get("target_sale_price"))
        orig = _to_float(p.get("target_original_price"))
        discount = _parse_discount(p.get("discount"), sale, orig)
        rating = _parse_rating(p.get("evaluate_rate"))

        return {
            "product_id": str(p.get("product_id", "")),
            "title": p.get("product_title", ""),
            "image_url": p.get("product_main_image_url", ""),
            "affiliate_link": link or p.get("product_detail_url", ""),
            "price": sale,
            "original_price": orig,
            "currency": p.get("target_sale_price_currency", self.currency),
            "discount_pct": discount,
            "rating": rating,
            "orders": _to_int(p.get("lastest_volume")),
            "category": p.get("first_level_category_name", ""),
        }


# ---------------- עוזרים ----------------
def _dig(d: dict, *keys):
    cur = d
    for k in keys:
        if not isinstance(cur, dict) or k not in cur:
            return None
        cur = cur[k]
    return cur


def _to_float(v) -> float | None:
    try:
        return round(float(v), 2)
    except (TypeError, ValueError):
        return None


def _to_int(v) -> int:
    try:
        return int(v)
    except (TypeError, ValueError):
        return 0


def _parse_rating(v) -> float | None:
    """evaluate_rate מגיע לרוב כמחרוזת אחוזים כמו '95.4%' -> ממיר לדירוג 0-5."""
    if v is None:
        return None
    try:
        pct = float(str(v).replace("%", "").strip())
        return round(pct / 20.0, 1)  # 100% -> 5.0
    except ValueError:
        return None


def _parse_discount(raw, sale, orig) -> int:
    """discount מגיע כ'15%' — אם חסר, מחשב מהמחירים."""
    if raw:
        try:
            return int(float(str(raw).replace("%", "").strip()))
        except ValueError:
            pass
    if sale and orig and orig > 0:
        return int(round((orig - sale) / orig * 100))
    return 0
