# 🛒 MasterStox — עסק אפילייט אוטומטי (AliExpress → אינסטגרם)

מערכת אוטומטית מלאה שמריצה עסק שיווק שותפים (affiliate) של AliExpress:
שולפת מוצרים חמים, בונה **אתר link-in-bio** עם הלינקים שלך, ומעלה **פוסטים
לאינסטגרם** (@MasterStox) באופן אוטומטי — כדי שתרוויח עמלות מכל רכישה.

הכל רץ **בחינם** על תשתית GitHub (Actions לתזמון + Pages לאתר). אין שרת לתחזק.

---

## 🧭 איך זה עובד (התמונה הגדולה)

```
┌─────────────────┐   ┌──────────────┐   ┌────────────────────┐
│ AliExpress API  │──▶│   הצינור     │──▶│  אתר link-in-bio   │  ← הלינקים הלחיצים
│ (מוצרים חמים +  │   │  pipeline.py │   │  (GitHub Pages)    │    שמייצרים עמלה
│  לינקים אפילייט)│   │              │   └────────────────────┘
└─────────────────┘   │  מסנן, בונה, │   ┌────────────────────┐
                      │  מפרסם       │──▶│  Instagram Graph   │  ← פוסט אוטומטי
                      └──────────────┘   │  (@MasterStox)     │    "לינק בביו"
   ⏰ GitHub Actions מריץ פעמיים ביום    └────────────────────┘
```

> **למה אתר?** אינסטגרם לא מאפשר קישורים לחיצים בכיתוב הפוסט. לכן כל הלינקים
> יושבים באתר ה-link-in-bio, ובביו של העמוד שמים קישור אחד לאתר. כל פוסט מפנה
> "לינק בביו". זה בדיוק מה שהעמוד שופיפיי שהיה לך עשה — רק חינמי ואוטומטי.

---

## 🚀 הקמה — 5 שלבים (כ-30 דקות, חד-פעמי)

### שלב 1 — AliExpress Affiliate (מפתחות API)
1. הירשם והתאשר בתוכנית השותפים: <https://portals.aliexpress.com>
2. בפורטל, צור/העתק את ה-**Tracking ID (PID)** שלך (למשל `masterstox`).
3. פתח אפליקציית מפתח ב-<https://openservice.aliexpress.com> (Open Platform)
   וקבל **App Key** + **App Secret**.
4. בקש עבור האפליקציה גישה לחבילת ה-API של **Affiliate**
   (`aliexpress.affiliate.*`).

### שלב 2 — Instagram (חשבון + טוקן)
1. הפוך את @MasterStox לחשבון **Business/Creator** וחבר אותו לעמוד פייסבוק.
2. צור אפליקציית **Meta** ב-<https://developers.facebook.com> והוסף את מוצר
   **Instagram Graph API**. בקש את ההרשאות:
   `instagram_basic`, `instagram_content_publish`, `pages_show_list`,
   `pages_read_engagement`.
3. ב-**Graph API Explorer** הפק *User Token* קצר-טווח עם ההרשאות האלה, ואז הרץ:
   ```bash
   python scripts/get_ig_token.py \
     --app-id <APP_ID> --app-secret <APP_SECRET> --short-token <SHORT_TOKEN>
   ```
   הכלי יחזיר לך `IG_USER_ID` ו-`IG_ACCESS_TOKEN` (טוקן ארוך-טווח).

### שלב 3 — הזנת הסודות ל-GitHub
במאגר: **Settings → Secrets and variables → Actions → New repository secret**,
והוסף:

| Secret | ערך |
|---|---|
| `ALIEXPRESS_APP_KEY` | ה-App Key |
| `ALIEXPRESS_APP_SECRET` | ה-App Secret |
| `ALIEXPRESS_TRACKING_ID` | ה-Tracking ID (למשל `masterstox`) |
| `IG_USER_ID` | מזהה חשבון האינסטגרם העסקי |
| `IG_ACCESS_TOKEN` | הטוקן הארוך-טווח |

(אופציונלי, תחת *Variables*: `TARGET_CURRENCY=ILS`, `TARGET_LANGUAGE=HE`,
`SHIP_TO_COUNTRY=IL`.)

### שלב 4 — הפעלת האתר (GitHub Pages)
**Settings → Pages → Source: Deploy from a branch → main / (root)**.
האתר יהיה זמין בכתובת:
`https://<user>.github.io/<repo>/affiliate/site/`
שים את הכתובת הזו ב-**ביו של האינסטגרם**.

### שלב 5 — זהו! האוטומציה רצה
ה-workflow (`.github/workflows/affiliate-daily.yml`) רץ **פעמיים ביום**
אוטומטית: שולף מוצרים → מעדכן את האתר → מעלה פוסט. אפשר גם להריץ ידנית
מלשונית **Actions → Run workflow**.

---

## 🎛️ התאמה אישית — `config.yaml`
בלי לגעת בקוד אפשר לשנות:
- **`niches`** — מילות החיפוש וההאשטגים לכל תחום.
- **`filters`** — דירוג מינימלי, מספר הזמנות, מחיר מקסימלי, אחוז הנחה.
- **`run`** — כמה מוצרים למשוך, כמה פוסטים ביום, כל כמה זמן לא לחזור על מוצר.
- **`caption_templates`** — נוסחי הכיתוב לפוסטים.

---

## 🧪 בדיקה מקומית (בלי מפתחות)
```bash
pip install -r requirements.txt
python src/pipeline.py --demo --no-instagram   # בונה אתר מנתוני דוגמה
open site/index.html                            # צפייה באתר
```
עם מפתחות אמיתיים ב-`.env` (העתק מ-`.env.example`):
```bash
python src/pipeline.py --no-instagram   # שליפה אמיתית + אתר, בלי לפרסם
python src/pipeline.py                   # ריצה מלאה כולל פרסום לאינסטגרם
```

---

## 📁 מבנה הפרויקט
```
affiliate/
├── config.yaml                 הגדרות הקמפיין (נישות, סינון, כיתובים)
├── .env.example                תבנית משתני סביבה
├── requirements.txt
├── src/
│   ├── aliexpress_client.py    לקוח API (חתימה, חיפוש, יצירת לינקים)
│   ├── instagram_publisher.py  פרסום דרך Instagram Graph API
│   ├── content.py              יצירת כיתובים
│   ├── store.py                קטלוג + מניעת פרסום כפול
│   ├── demo_data.py            נתוני דוגמה למצב --demo
│   └── pipeline.py             המנוע הראשי
├── scripts/
│   ├── generate_site.py        בניית אתר ה-link-in-bio
│   └── get_ig_token.py         כלי חד-פעמי לטוקן אינסטגרם
├── site/                       האתר שנבנה (מתארח ב-GitHub Pages)
└── data/                       catalog.json + posted.json (מצב נשמר)
```

---

## ⚖️ חוקיות ותנאי שימוש (חשוב)
- **גילוי נאות**: הפוסטים והאתר כוללים ציון שמדובר בקישורי שותפים — נדרש
  לפי מדיניות אינסטגרם וה-FTC/רשות הגנת הצרכן.
- **רק תוכן שלך, רק החשבון שלך**: המערכת משתמשת ב-API הרשמי של Meta ומפרסמת
  לחשבון שבבעלותך בלבד. אין אוטומציה של לייקים/עוקבים/תגובות/הודעות — זה נוגד
  את תנאי אינסטגרם ומסכן את החשבון.
- **מכסת פרסום**: אינסטגרם מגביל את מספר הפוסטים ביממה. ברירת המחדל היא פוסט
  אחד לריצה כדי להישאר בטוח.
- שמור על `.env` מחוץ ל-git (כלול ב-`.gitignore`). סודות רק ב-GitHub Secrets.
