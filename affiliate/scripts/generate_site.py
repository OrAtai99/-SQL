"""
בונה את אתר ה-link-in-bio הסטטי מתוך data/catalog.json.
פלט: affiliate/site/index.html (מתארח חינם ב-GitHub Pages).

זה ה"אתר" שאליו מפנים מהביו באינסטגרם — כאן כל הלינקים האפילייט
לחיצים, ומכאן מגיעות העמלות.
"""
from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "data" / "catalog.json"
OUT = ROOT / "site" / "index.html"

BRAND = "MasterStox"
TAGLINE = "הדילים והגאדג'טים ששווים את הכסף 🛒"
INSTAGRAM = "https://instagram.com/masterstox"


def card(p: dict) -> str:
    title = html.escape(p.get("title", ""))
    img = html.escape(p.get("image_url", ""))
    link = html.escape(p.get("affiliate_link", "#"))
    price = html.escape(str(p.get("price", "")))
    currency = html.escape(str(p.get("currency", "")))
    orig = p.get("original_price")
    discount = p.get("discount_pct")
    rating = p.get("rating")
    orders = p.get("orders")

    badge = f'<span class="badge">{int(discount)}%- הנחה</span>' if discount else ""
    orig_html = (
        f'<span class="orig">{html.escape(str(orig))} {currency}</span>' if orig else ""
    )
    meta = []
    if rating:
        meta.append(f"⭐ {html.escape(str(rating))}")
    if orders:
        meta.append(f"🛒 {html.escape(str(orders))}+ הזמנות")
    meta_html = " · ".join(meta)

    return f"""
      <a class="card" href="{link}" target="_blank" rel="nofollow sponsored noopener">
        <div class="thumb">{badge}<img loading="lazy" src="{img}" alt="{title}"></div>
        <div class="body">
          <h3>{title}</h3>
          <div class="meta">{meta_html}</div>
          <div class="price-row">
            <span class="price">{price} {currency}</span>{orig_html}
          </div>
          <span class="buy">לרכישה בעלי אקספרס ←</span>
        </div>
      </a>"""


def build(catalog: list[dict]) -> str:
    cards = "\n".join(card(p) for p in catalog) or (
        '<p class="empty">עוד רגע נטען מוצרים… בקרוב כאן דילים 🔥</p>'
    )
    return f"""<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{BRAND} · דילים נבחרים</title>
<meta name="description" content="{TAGLINE}">
<style>
  :root {{ --bg:#0f1220; --card:#1a1f35; --accent:#ff4d67; --accent2:#ffb020;
          --text:#f2f4ff; --muted:#9aa3c7; }}
  * {{ box-sizing:border-box; margin:0; padding:0; }}
  body {{ font-family:'Segoe UI',Arial,sans-serif; background:var(--bg); color:var(--text);
         line-height:1.5; -webkit-font-smoothing:antialiased; }}
  header {{ text-align:center; padding:34px 18px 22px; }}
  .logo {{ width:78px; height:78px; border-radius:22px; margin:0 auto 14px;
          background:linear-gradient(135deg,var(--accent),var(--accent2));
          display:flex; align-items:center; justify-content:center; font-size:38px;
          box-shadow:0 10px 30px rgba(255,77,103,.35); }}
  h1 {{ font-size:1.8rem; letter-spacing:.5px; }}
  .tagline {{ color:var(--muted); margin-top:6px; }}
  .ig {{ display:inline-block; margin-top:14px; padding:9px 20px; border-radius:999px;
        background:#fff1; color:var(--text); text-decoration:none; font-weight:600;
        border:1px solid #ffffff22; }}
  .grid {{ max-width:1050px; margin:12px auto 60px; padding:0 16px;
          display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:18px; }}
  .card {{ background:var(--card); border-radius:18px; overflow:hidden; text-decoration:none;
          color:inherit; display:flex; flex-direction:column; transition:transform .15s, box-shadow .15s;
          border:1px solid #ffffff10; }}
  .card:hover {{ transform:translateY(-4px); box-shadow:0 14px 34px rgba(0,0,0,.45); }}
  .thumb {{ position:relative; aspect-ratio:1/1; background:#fff; }}
  .thumb img {{ width:100%; height:100%; object-fit:cover; }}
  .badge {{ position:absolute; top:10px; inset-inline-start:10px; background:var(--accent);
           color:#fff; font-size:.78rem; font-weight:700; padding:4px 9px; border-radius:8px; }}
  .body {{ padding:13px 14px 16px; display:flex; flex-direction:column; gap:7px; flex:1; }}
  h3 {{ font-size:.98rem; font-weight:600; line-height:1.35;
       display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }}
  .meta {{ color:var(--muted); font-size:.82rem; }}
  .price-row {{ display:flex; align-items:baseline; gap:8px; margin-top:auto; }}
  .price {{ color:var(--accent2); font-size:1.25rem; font-weight:800; }}
  .orig {{ color:var(--muted); text-decoration:line-through; font-size:.85rem; }}
  .buy {{ margin-top:4px; font-size:.9rem; font-weight:700; color:var(--accent); }}
  .empty {{ text-align:center; color:var(--muted); padding:60px 20px; grid-column:1/-1; }}
  footer {{ text-align:center; color:var(--muted); font-size:.8rem; padding:20px; }}
  footer a {{ color:var(--muted); }}
</style>
</head>
<body>
  <header>
    <div class="logo">🛒</div>
    <h1>{BRAND}</h1>
    <p class="tagline">{TAGLINE}</p>
    <a class="ig" href="{INSTAGRAM}" target="_blank" rel="noopener">📸 עקבו באינסטגרם</a>
  </header>

  <main class="grid">
    {cards}
  </main>

  <footer>
    <p>המחירים והזמינות מתעדכנים בעלי אקספרס. חלק מהקישורים הם קישורי שותפים —
    רכישה דרכם עשויה לזכות אותנו בעמלה, ללא עלות נוספת לך. 💛</p>
    <p>© {BRAND}</p>
  </footer>
</body>
</html>
"""


def main() -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8")) if CATALOG.exists() else []
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(build(catalog), encoding="utf-8")
    print(f"Built site with {len(catalog)} products -> {OUT}")


if __name__ == "__main__":
    main()
