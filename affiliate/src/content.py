"""
יצירת תוכן לפוסטים: בחירת תבנית כיתוב אקראית ומילוי הנתונים של המוצר.
"""
from __future__ import annotations

import random


def build_caption(product: dict, niche: dict, templates: list[str], handle: str) -> str:
    """בונה כיתוב לפוסט אינסטגרם מתוך תבנית אקראית."""
    template = random.choice(templates)
    hashtags = " ".join(niche.get("hashtags", []))
    caption = template.format(
        title=product.get("title", "").strip()[:150],
        price=product.get("price", "?"),
        currency=product.get("currency", ""),
        discount=product.get("discount_pct", 0),
        orders=product.get("orders", 0),
        rating=product.get("rating", ""),
        hashtags=hashtags,
        handle=handle,
    )
    # אינסטגרם: מקסימום ~2200 תווים ו-30 האשטגים
    return caption.strip()[:2200]
