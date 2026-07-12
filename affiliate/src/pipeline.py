"""
הצינור האוטומטי המרכזי של MasterStox.

ריצה אחת עושה:
  1. שולף מוצרים חמים מכל נישה ב-config דרך AliExpress Affiliate API.
  2. מסנן לפי דירוג/הזמנות/מחיר/הנחה.
  3. מעדכן את קטלוג האתר (data/catalog.json) ובונה מחדש את אתר ה-link-in-bio.
  4. בוחר מוצר שטרם פורסם ומעלה עליו פוסט לאינסטגרם (עם כיתוב "לינק בביו").
  5. שומר היסטוריית פרסום כדי לא לחזור על מוצרים.

מצבים:
  • רגיל   — צריך מפתחות ב-.env / משתני סביבה.
  • --demo — משתמש בנתוני דוגמה (בלי API), כדי לראות שהאתר והזרימה עובדים.
  • --no-instagram — שולף ובונה אתר בלבד, בלי לפרסם לאינסטגרם.
"""
from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.aliexpress_client import AliExpressClient
from src.content import build_caption
from src.instagram_publisher import InstagramPublisher
from src.store import Store

ROOT = Path(__file__).resolve().parent.parent
CONFIG_FILE = ROOT / "config.yaml"


def load_config() -> dict:
    return yaml.safe_load(CONFIG_FILE.read_text(encoding="utf-8"))


def load_env() -> None:
    """טוען .env אם קיים (בלי תלות ב-python-dotenv)."""
    env_file = ROOT / ".env"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())


def passes_filters(p: dict, f: dict) -> bool:
    if p.get("rating") is not None and p["rating"] < f.get("min_rating", 0):
        return False
    if p.get("orders", 0) < f.get("min_orders", 0):
        return False
    if p.get("price") is not None and f.get("max_price") and p["price"] > f["max_price"]:
        return False
    if p.get("discount_pct", 0) < f.get("min_discount_pct", 0):
        return False
    return True


def rebuild_site() -> None:
    subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "generate_site.py")],
        check=True,
    )


def fetch_all(cfg: dict, client: AliExpressClient | None, demo: bool) -> list[dict]:
    """שולף ומסנן מוצרים מכל הנישות. במצב demo מחזיר דוגמאות."""
    if demo or client is None:
        from src.demo_data import SAMPLE_PRODUCTS
        return SAMPLE_PRODUCTS

    filters = cfg.get("filters", {})
    per_niche = cfg.get("run", {}).get("products_per_niche", 5)
    collected: list[dict] = []
    for niche in cfg.get("niches", []):
        kw = niche["keywords"]
        try:
            products = client.search_products(
                keywords=kw,
                page_size=20,
                max_price=filters.get("max_price"),
            )
        except RuntimeError as e:
            print(f"⚠️  שגיאה בשליפת '{kw}': {e}", file=sys.stderr)
            continue
        good = [p for p in products if passes_filters(p, filters)][:per_niche]
        for p in good:
            p["_niche"] = niche  # שומר את הנישה לצורך ההאשטגים
        collected.extend(good)
        print(f"✓ '{kw}': {len(good)} מוצרים מתאימים")
    return collected


def run(demo: bool = False, publish_instagram: bool = True) -> int:
    load_env()
    cfg = load_config()
    store = Store()
    brand = cfg.get("brand", {})
    handle = brand.get("instagram_handle", "masterstox")

    # לקוח AliExpress (אם יש מפתחות)
    client: AliExpressClient | None = None
    if not demo:
        key = os.environ.get("ALIEXPRESS_APP_KEY")
        secret = os.environ.get("ALIEXPRESS_APP_SECRET")
        if key and secret:
            client = AliExpressClient(
                app_key=key,
                app_secret=secret,
                tracking_id=os.environ.get("ALIEXPRESS_TRACKING_ID", "default"),
                currency=os.environ.get("TARGET_CURRENCY", "USD"),
                language=os.environ.get("TARGET_LANGUAGE", "EN"),
                ship_to=os.environ.get("SHIP_TO_COUNTRY", "US"),
            )
        else:
            print("ℹ️  לא נמצאו מפתחות AliExpress — עובר למצב demo.", file=sys.stderr)
            demo = True

    # 1-2: שליפה + סינון
    products = fetch_all(cfg, client, demo)
    if not products:
        print("לא נמצאו מוצרים מתאימים בריצה זו.")
        return 0

    # 3: עדכון קטלוג + בניית אתר
    added = store.upsert_products(products)
    print(f"📦 קטלוג: {added} מוצרים חדשים, סה\"כ {len(store.catalog)}.")
    rebuild_site()
    print("🌐 אתר ה-link-in-bio נבנה מחדש.")

    # 4: פרסום לאינסטגרם
    if not publish_instagram:
        print("⏭️  דילוג על פרסום לאינסטגרם (--no-instagram).")
        return 0

    ig_id = os.environ.get("IG_USER_ID")
    ig_token = os.environ.get("IG_ACCESS_TOKEN")
    if not (ig_id and ig_token):
        print("ℹ️  אין מפתחות Instagram — האתר עודכן אך לא פורסם פוסט.", file=sys.stderr)
        return 0

    avoid_days = cfg.get("run", {}).get("avoid_repost_days", 30)
    posts_per_run = cfg.get("run", {}).get("instagram_posts_per_run", 1)
    templates = cfg.get("caption_templates", [])
    publisher = InstagramPublisher(ig_id, ig_token)

    posted = 0
    for p in products:
        if posted >= posts_per_run:
            break
        if store.was_posted_recently(p["product_id"], avoid_days):
            continue
        if not p.get("image_url") or not p.get("affiliate_link"):
            continue
        niche = p.get("_niche", {"hashtags": []})
        caption = build_caption(p, niche, templates, handle)
        try:
            media_id = publisher.publish_image(p["image_url"], caption)
            store.mark_posted(p["product_id"])
            posted += 1
            print(f"📸 פורסם לאינסטגרם: {p['title'][:40]}… (media {media_id})")
        except (RuntimeError, TimeoutError) as e:
            print(f"⚠️  כשל בפרסום '{p['title'][:30]}': {e}", file=sys.stderr)
            continue

    if posted == 0:
        print("לא פורסם פוסט (ייתכן שכל המוצרים כבר פורסמו לאחרונה).")
    return 0


def main() -> None:
    ap = argparse.ArgumentParser(description="MasterStox affiliate automation pipeline")
    ap.add_argument("--demo", action="store_true", help="ריצה עם נתוני דוגמה בלי API")
    ap.add_argument("--no-instagram", action="store_true", help="בלי פרסום לאינסטגרם")
    args = ap.parse_args()
    sys.exit(run(demo=args.demo, publish_instagram=not args.no_instagram))


if __name__ == "__main__":
    main()
