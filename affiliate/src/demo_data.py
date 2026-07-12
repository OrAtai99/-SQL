"""
נתוני דוגמה למצב --demo: מאפשרים להריץ את הצינור ולבנות את האתר
בלי מפתחות API, כדי לראות שהזרימה עובדת מקצה לקצה.
התמונות הן placeholders ציבוריים; במצב אמיתי הכל מגיע מ-AliExpress.
"""

SAMPLE_PRODUCTS = [
    {
        "product_id": "demo-1001",
        "title": "מנורת LED חכמה RGB עם שליטה מהאפליקציה ו-Wi-Fi",
        "image_url": "https://picsum.photos/seed/smartlamp/600",
        "affiliate_link": "https://s.click.aliexpress.com/e/_demoSmartLamp",
        "price": 12.99, "original_price": 24.99, "currency": "ILS",
        "discount_pct": 48, "rating": 4.8, "orders": 5400,
        "category": "Smart Home",
        "_niche": {"hashtags": ["#smarthome", "#gadgets", "#homeautomation", "#tech"]},
    },
    {
        "product_id": "demo-1002",
        "title": "מקלף ירקות רב-תכליתי מנירוסטה עם ידית ארגונומית",
        "image_url": "https://picsum.photos/seed/peeler/600",
        "affiliate_link": "https://s.click.aliexpress.com/e/_demoPeeler",
        "price": 3.49, "original_price": 6.99, "currency": "ILS",
        "discount_pct": 50, "rating": 4.9, "orders": 12800,
        "category": "Kitchen",
        "_niche": {"hashtags": ["#kitchengadgets", "#cooking", "#homehacks"]},
    },
    {
        "product_id": "demo-1003",
        "title": "מטען אלחוטי מגנטי 15W תואם MagSafe לאייפון",
        "image_url": "https://picsum.photos/seed/charger/600",
        "affiliate_link": "https://s.click.aliexpress.com/e/_demoCharger",
        "price": 8.75, "original_price": 15.00, "currency": "ILS",
        "discount_pct": 42, "rating": 4.7, "orders": 3300,
        "category": "Phone Accessories",
        "_niche": {"hashtags": ["#phoneaccessories", "#techdeals", "#gadgets"]},
    },
    {
        "product_id": "demo-1004",
        "title": "רצועות התנגדות לאימון ביתי — סט 5 עצמות",
        "image_url": "https://picsum.photos/seed/fitness/600",
        "affiliate_link": "https://s.click.aliexpress.com/e/_demoBands",
        "price": 6.20, "original_price": 11.00, "currency": "ILS",
        "discount_pct": 44, "rating": 4.6, "orders": 7100,
        "category": "Fitness",
        "_niche": {"hashtags": ["#fitness", "#homegym", "#workout"]},
    },
    {
        "product_id": "demo-1005",
        "title": "מחזיק טלפון מגנטי לרכב לפתח האוורור — 360°",
        "image_url": "https://picsum.photos/seed/carmount/600",
        "affiliate_link": "https://s.click.aliexpress.com/e/_demoCarMount",
        "price": 4.99, "original_price": 9.99, "currency": "ILS",
        "discount_pct": 50, "rating": 4.7, "orders": 9200,
        "category": "Car Accessories",
        "_niche": {"hashtags": ["#caraccessories", "#cargadgets", "#autolife"]},
    },
    {
        "product_id": "demo-1006",
        "title": "אוזניות Bluetooth 5.3 אלחוטיות עם קופסת טעינה ENC",
        "image_url": "https://picsum.photos/seed/earbuds/600",
        "affiliate_link": "https://s.click.aliexpress.com/e/_demoEarbuds",
        "price": 14.90, "original_price": 29.90, "currency": "ILS",
        "discount_pct": 50, "rating": 4.8, "orders": 21000,
        "category": "Phone Accessories",
        "_niche": {"hashtags": ["#phoneaccessories", "#techdeals", "#gadgets"]},
    },
]
