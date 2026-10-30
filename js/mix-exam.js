/* ============================================================
   MIXX — כל התרגול של 3964, מסודר לפי המבחן האחרון (סכמת המשלוחים)
   נוצר אוטומטית (scratchpad/mix/gen-mix.js) — לא לערוך ביד.
   families  10 משפחות של חלק א׳, אחת לכל נושא במבחן האחרון
   slots     10 משבצות של חלק ב׳: 9 שאלות המבחן + שאלה עשירית
   open      97 שאלות פתוחות (schema: ship / exam2) — כולן אומתו בשני המנועים
   mcq       154 אמריקאיות
   exams     6 מבחנים מעורבבים, 10 + 10 שאלות, בלי חזרות; ב׳–ו׳ — רק שאלות שאינן בחוברת
   book/card/hint  איפה השאלה בחוברת המודפסת, או באיזה כרטיס נעזרים כשהיא אינה שם
   ============================================================ */
window.MIXX = {
 "families": [
  {
   "key": "T1",
   "title": "מערך שגדל — הטמעה מול אוסף נפרד",
   "anchorIds": [
    "SX-1"
   ],
   "ids": [
    "N-B01",
    "N-B02",
    "N-B03",
    "N-B04",
    "N-B05",
    "A-26",
    "A-22",
    "A-24",
    "A-38",
    "A-40",
    "A-43",
    "A-44",
    "A-42",
    "A-23",
    "A-25",
    "A-27",
    "A-39",
    "A-19",
    "A-20",
    "A-21",
    "A-37",
    "A-41",
    "A-45"
   ]
  },
  {
   "key": "T2",
   "title": "מחיר היסטורי — צילום מצב מול ערך עדכני",
   "anchorIds": [
    "SX-2"
   ],
   "ids": [
    "N-B06",
    "N-B07",
    "N-B08",
    "N-B09",
    "N-B10",
    "A-15",
    "A-17",
    "A-12",
    "A-13",
    "A-16",
    "A-10",
    "A-11",
    "A-14",
    "A-18"
   ]
  },
  {
   "key": "T3",
   "title": "NULL, שדה חסר וסכמה גמישה",
   "anchorIds": [
    "SX-3"
   ],
   "ids": [
    "N-A02",
    "N-A04",
    "N-A01",
    "N-A03",
    "N-A05",
    "N-B11",
    "A-69",
    "A-72",
    "A-65",
    "A-67",
    "A-68",
    "A-70",
    "A-71",
    "A-64",
    "A-66"
   ]
  },
  {
   "key": "T4",
   "title": "אטומיות וכתיבה במקביל",
   "anchorIds": [
    "SX-4"
   ],
   "ids": [
    "N-B12",
    "N-B13",
    "N-B15",
    "N-B14",
    "N-B16",
    "A-59",
    "A-63",
    "A-56",
    "A-58",
    "A-55",
    "A-57",
    "A-60",
    "A-61",
    "A-62"
   ]
  },
  {
   "key": "T5",
   "title": "מפתח חלוקה (Sharding)",
   "anchorIds": [
    "SX-5",
    "SX-11"
   ],
   "ids": [
    "N-A06",
    "N-A07",
    "N-A10",
    "N-A11",
    "N-A08",
    "N-A09"
   ]
  },
  {
   "key": "T6",
   "title": "שכפול ועקביות",
   "anchorIds": [
    "SX-6"
   ],
   "ids": [
    "N-A12",
    "N-A15",
    "N-A17",
    "N-A13",
    "N-A14",
    "N-A16"
   ]
  },
  {
   "key": "T7",
   "title": "רבים-לרבים ותכונות של הקשר",
   "anchorIds": [
    "SX-7"
   ],
   "ids": [
    "N-B17",
    "N-B19",
    "N-B20",
    "N-B18",
    "N-B21",
    "A-07",
    "A-09",
    "A-02",
    "A-05",
    "A-06",
    "A-08",
    "A-01",
    "A-03",
    "A-04"
   ]
  },
  {
   "key": "T8",
   "title": "אינדקסים — תועלת ועלות",
   "anchorIds": [
    "SX-8"
   ],
   "ids": [
    "N-B22",
    "N-B24",
    "N-B25",
    "N-B23",
    "N-B26",
    "A-75",
    "A-79",
    "A-73",
    "A-78",
    "A-80",
    "A-81",
    "A-74",
    "A-76",
    "A-77"
   ]
  },
  {
   "key": "T9",
   "title": "ארכיטקטורה משולבת",
   "anchorIds": [
    "SX-9"
   ],
   "ids": [
    "N-B27",
    "N-B29",
    "N-B30",
    "N-B31",
    "N-B28",
    "A-31",
    "A-33",
    "A-35",
    "A-87",
    "A-90",
    "A-29",
    "A-30",
    "A-84",
    "A-86",
    "A-36",
    "A-82",
    "A-89",
    "A-28",
    "A-32",
    "A-34",
    "A-83",
    "A-85",
    "A-88"
   ]
  },
  {
   "key": "T10",
   "title": "נתון משוכפל — הטמעה מול הפניה",
   "anchorIds": [
    "SX-10"
   ],
   "ids": [
    "N-B32",
    "N-B33",
    "N-B35",
    "N-B36",
    "N-B34",
    "A-50",
    "A-53",
    "A-48",
    "A-49",
    "A-51",
    "A-46",
    "A-47",
    "A-52",
    "A-54"
   ]
  }
 ],
 "slots": [
  {
   "key": "S12",
   "title": "סינון עם NULL ותנאים",
   "tip": "תנאי על שורה בודדת, ובעיקר IS NULL / IS NOT NULL וגבולות (> מול >=). אין צירוף ואין קיבוץ.",
   "anchor": "SX12",
   "ids": [
    "B-02",
    "P01",
    "E11",
    "N14",
    "X06",
    "B-28",
    "B-29",
    "B-27",
    "B-19",
    "B-01",
    "B-26"
   ]
  },
  {
   "key": "S13",
   "title": "אנטי-צירוף — מי שאין לו אף…",
   "tip": "LEFT JOIN ואז IS NULL על מפתח מהצד הימני, או NOT EXISTS. במונגו: ‎$lookup‎ ואז ‎$size: 0‎.",
   "anchor": "SX13",
   "ids": [
    "P03",
    "B-17",
    "P11",
    "E15",
    "N01",
    "B-18",
    "N15"
   ]
  },
  {
   "key": "S14",
   "title": "קיבוץ ותנאי על סכום או ממוצע",
   "tip": "GROUP BY + HAVING על SUM / AVG. במונגו ‎$match‎ אחרי ה-‎$group‎. זהירות מ-NULL במכנה.",
   "anchor": "SX14",
   "ids": [
    "N02",
    "B-13",
    "P07",
    "E13",
    "P02",
    "B-11",
    "B-12",
    "B-09",
    "B-10"
   ]
  },
  {
   "key": "S15",
   "title": "צירוף כמה טבלאות + קיבוץ + תנאי",
   "tip": "מצרפים עד שכל השדות זמינים, מסננים שורות ב-WHERE, ואז קיבוץ ו-HAVING. במונגו ‎$lookup‎+‎$unwind‎ לכל צירוף.",
   "anchor": "SX15",
   "ids": [
    "P09",
    "X07",
    "P08",
    "B-30",
    "P15",
    "X10",
    "B-31",
    "B-32",
    "B-33",
    "B-06"
   ]
  },
  {
   "key": "S16",
   "title": "אנטי-צירוף בתקופה / LEFT JOIN עם תנאי ב-ON",
   "tip": "התנאי על הצד הימני (תקופה, סטטוס) עובר לתוך ה-ON — אחרת הישויות בלי התאמה נזרקות.",
   "anchor": "SX16",
   "ids": [
    "P04",
    "X04",
    "P14",
    "E14",
    "P10",
    "X11",
    "P05",
    "B-15",
    "B-16"
   ]
  },
  {
   "key": "S17",
   "title": "האחרון / הגבוה ביותר לכל קבוצה",
   "tip": "ROW_NUMBER() OVER (PARTITION BY … ORDER BY …) ובחירת rn = 1. במונגו ‎$sort‎ ואז ‎$group‎ עם ‎$first‎, או ‎$lookup‎ עם pipeline ו-‎$limit: 1‎.",
   "anchor": "SX17",
   "ids": [
    "P12",
    "X01",
    "N03",
    "N04",
    "N09",
    "X02",
    "N10",
    "N11"
   ]
  },
  {
   "key": "S18",
   "title": "כולם מקיימים / יש לפחות אחד",
   "tip": "\"כולם\" = אין אף מפר (NOT EXISTS) + יש לפחות אחד (EXISTS). חלופה: HAVING עם COUNT ו-MIN/MAX.",
   "anchor": "SX18",
   "ids": [
    "P13",
    "X03",
    "P06",
    "X12",
    "N16",
    "B-24",
    "B-25",
    "B-07"
   ]
  },
  {
   "key": "S19",
   "title": "שני תנאי קבוצה + תקופה",
   "tip": "WHERE לתקופה, ואז HAVING עם שני תנאים מחוברים ב-AND. COUNT(*) ולא COUNT(עמודה) כשה-NULL צריך להיספר.",
   "anchor": "SX19",
   "ids": [
    "N05",
    "E17",
    "N06",
    "N07",
    "B-14",
    "X13",
    "N17"
   ]
  },
  {
   "key": "S20",
   "title": "צבירה בתוך HAVING / תת-שאילתה עם צבירה",
   "tip": "תנאי על כל הקבוצה (MAX/MIN בתוך HAVING), או השוואה לממוצע / למקסימום שמחושב בתת-שאילתה.",
   "anchor": "SX20",
   "ids": [
    "N08",
    "N12",
    "X05",
    "B-45",
    "B-22",
    "B-44",
    "B-23",
    "X09",
    "N13"
   ]
  },
  {
   "key": "S99",
   "title": "שאלה עשירית — דפוס נוסף",
   "tip": "בבחינה יהיו 10 שאלות פתוחות, ובמבחן לדוגמה היו 9. כאן הדפוסים שסביר שימלאו את העשירית: צירוף עצמי, DISTINCT, צירוף בלי קיבוץ, TOP ודפדוף.",
   "anchor": null,
   "ids": [
    "E16",
    "B-34",
    "E12",
    "B-35",
    "B-21",
    "B-20",
    "B-05",
    "B-08",
    "B-03",
    "B-04"
   ]
  }
 ],
 "open": {
  "SX12": {
   "id": "SX12",
   "schema": "ship",
   "src": "official",
   "n": 12,
   "pattern": "filter-null",
   "title": "משלוחים שלא נמסרו ועלותם מעל 30",
   "q": "הציגו את כל המשלוחים שטרם נמסרו ושעלות המשלוח שלהם גדולה מ-30. יש להציג את מזהה המשלוח, מזהה הלקוח, תאריך היצירה, עלות המשלוח והסטטוס, ולמיין מהחדש לישן.",
   "keywords": "טרם נמסרו → deliveredAt ריק · גדולה מ-30 → ‎> 30 ולא ‎>=‎ · מהחדש לישן → ORDER BY createdAt DESC",
   "cols": [
    "shipmentId",
    "customerId",
    "createdAt",
    "shippingCost",
    "status"
   ],
   "sql": "SELECT shipmentId, customerId, createdAt, shippingCost, status\nFROM Shipments\nWHERE deliveredAt IS NULL\n  AND shippingCost IS NOT NULL\n  AND shippingCost > 30\nORDER BY createdAt DESC;",
   "mongo": "db.shipments.find(\n  {\n    deliveredAt: null,\n    shippingCost: { $type: \"number\", $gt: 30 }\n  },\n  { _id: 0, shipmentId: 1, customerId: 1, createdAt: 1,\n    shippingCost: 1, status: 1 }\n).sort({ createdAt: -1 })",
   "points": [
    "ב-SQL שדה חסר ו-NULL הם אותו דבר, ולכן deliveredAt IS NULL מכסה את שני המקרים. לעולם לא בודקים NULL עם סימן שוויון.",
    "ב-MongoDB, { deliveredAt: null } מתאים גם למסמכים שבהם הערך null וגם למסמכים שבהם השדה חסר. זו בדיוק שאלה 3 בחלק א'.",
    "$type: \"number\" מבטיח שהעלות היא ערך מספרי, כפי שדורשת הנחה 7. כל השדות נמצאים ב-Collection אחד, ולכן מספיק find()."
   ],
   "logic": "שתי טבלאות אין כאן — הכול בטבלת המשלוחים, ולכן אין צירוף ואין קיבוץ. \"טרם נמסר\" מוגדר לפי השדה deliveredAt ולא לפי הסטטוס.",
   "trap": "אל תוסיפו תנאי על status. השאלה הגדירה אי-מסירה לפי deliveredAt, ומשלוח יכול להיות לא נמסר גם כשהסטטוס שלו InTransit וגם כשהוא ריק. תנאי שלא התבקש פוסל שורות נכונות.",
   "compare": "ב-SQL ערך חסר נבדק ב-IS NULL ולעולם לא ב-‎= NULL. במונגו ‎{deliveredAt:null}‎ תופס גם מסמך שבו השדה חסר לגמרי וגם מסמך שבו הוא קיים עם null — זו התנהגות שאין לה מקבילה ב-SQL.",
   "edge": "עלות 30 בדיוק אינה נכללת (SH11). עלות 31 נכללת (SH10). משלוח שלא נמסר אבל עלותו ריקה אינו נכלל (SH03), כי NULL אינו גדול מ-30.",
   "slot": "S12",
   "book": {
    "page": 14,
    "where": "שאלה 12 במבחן לדוגמה, עם הפתרון הרשמי"
   }
  },
  "SX13": {
   "id": "SX13",
   "schema": "ship",
   "src": "official",
   "n": 13,
   "pattern": "anti-join",
   "title": "שליחים פעילים שאין להם אף משלוח",
   "q": "הציגו את מזהה השליח, שמו וסוג הרכב שלו, עבור כל שליח פעיל שלא שויך לו אף משלוח.",
   "keywords": "פעיל → active = 1 · אין לו אף → NOT EXISTS · שני תנאים נפרדים, לא תנאי אחד",
   "cols": [
    "courierId",
    "courierName",
    "vehicleType"
   ],
   "sql": "SELECT c.courierId, c.courierName, c.vehicleType\nFROM Couriers c\nLEFT JOIN Shipments s ON c.courierId = s.courierId\nWHERE c.active = 1\n  AND s.shipmentId IS NULL;",
   "mongo": "db.couriers.aggregate([\n  { $match: { active: true } },\n  { $lookup: {\n      from: \"shipments\",\n      localField: \"courierId\",\n      foreignField: \"courierId\",\n      as: \"shipments\" } },\n  { $match: { shipments: { $size: 0 } } },\n  { $project: { _id: 0, courierId: 1, courierName: 1, vehicleType: 1 } }\n])",
   "points": [
    "LEFT JOIN + IS NULL מוצא שליחים שאין להם אף התאמה בטבלת המשלוחים. התנאי active = 1 נבדק בנפרד, כמו שהשאלה דורשת.",
    "כל שליח מופיע פעם אחת, כי לשליח בלי משלוחים יש בדיוק שורה אחת אחרי ה-LEFT JOIN.",
    "ב-MongoDB: $lookup מחזיר מערך, ו-$size: 0 מוצא את מי שהמערך שלו ריק. זה המקביל ל-LEFT JOIN + IS NULL, כך גם בטבלת ההשוואה של המרצה."
   ],
   "logic": "מתחילים מטבלת השליחים, כי השליחים שאין להם משלוחים הם בדיוק מה שצריך להציג. מי שמתחיל מטבלת המשלוחים לא יראה אותם בכלל.",
   "trap": "אל תפתחו את המערך assigned ב-$unwind. מערך ריק הוא בדיוק מה שמחפשים, ו-$unwind רגיל היה מוחק את השליח מהצינור. \"assigned.0\" חסר פירושו שאין אפילו איבר ראשון.",
   "compare": "ב-SQL היעדר קשר נבדק ב-NOT EXISTS — ולא ב-NOT IN, שעלול להחזיר UNKNOWN אם תת-השאילתה מחזירה NULL. במונגו אין NOT EXISTS: מחברים ב-$lookup ואז בודקים שהמערך שחזר ריק.",
   "edge": "שליח פעיל עם משלוח אחד נפסל (K1). שליח לא פעיל בלי משלוחים נפסל גם הוא (K3) — שני התנאים חייבים להתקיים יחד. התוצאה: K2 ו-K4.",
   "slot": "S13",
   "book": {
    "page": 15,
    "where": "שאלה 13 במבחן לדוגמה, עם הפתרון הרשמי"
   }
  },
  "SX14": {
   "id": "SX14",
   "schema": "ship",
   "src": "official",
   "n": 14,
   "pattern": "group-having",
   "title": "לקוחות שסך עלויות המשלוח שלהם מעל 200",
   "q": "הציגו לכל לקוח את מזההו, שמו וסך עלויות המשלוח שלו, רק עבור לקוחות שהסך גדול מ-200. יש להתחשב רק בעלויות מספריות, ולמיין לפי הסכום בסדר יורד.",
   "keywords": "סך לכל לקוח → GROUP BY · רק מעל 200 → HAVING · עלויות מספריות בלבד → IS NOT NULL",
   "cols": [
    "customerId",
    "customerName",
    "totalCost"
   ],
   "sql": "SELECT c.customerId, c.customerName, SUM(s.shippingCost) AS totalCost\nFROM Customers c\nINNER JOIN Shipments s ON c.customerId = s.customerId\nWHERE s.shippingCost IS NOT NULL\nGROUP BY c.customerId, c.customerName\nHAVING SUM(s.shippingCost) > 200\nORDER BY totalCost DESC;",
   "mongo": "db.shipments.aggregate([\n  { $match: { shippingCost: { $type: \"number\" } } },\n  { $group: { _id: \"$customerId\",\n              totalCost: { $sum: \"$shippingCost\" } } },\n  { $match: { totalCost: { $gt: 200 } } },\n  { $lookup: {\n      from: \"customers\",\n      localField: \"_id\",\n      foreignField: \"customerId\",\n      as: \"customer\" } },\n  { $unwind: \"$customer\" },\n  { $project: { _id: 0,\n                customerId: \"$_id\",\n                customerName: \"$customer.customerName\",\n                totalCost: 1 } },\n  { $sort: { totalCost: -1 } }\n])",
   "points": [
    "WHERE מסנן לפני הקיבוץ, ו-HAVING מסנן אחרי הקיבוץ, כלומר על הסכום.",
    "ב-MongoDB: $match לפני $group הוא המקביל ל-WHERE, ו-$match אחרי $group הוא המקביל ל-HAVING.",
    "קודם מקבצים ורק אחר כך מבצעים $lookup, כך שמחפשים את שם הלקוח פעם אחת לכל לקוח ולא לכל משלוח."
   ],
   "logic": "במונגו מסכמים קודם ומחברים את שם הלקוח רק אחרי הקיבוץ. הסיבה: אחרי $group נשארים רק ‎_id‎ והשדות שחושבו, ולכן שם הלקוח צריך להגיע מחיבור נוסף.",
   "trap": "אל תחברו את ShipmentEvents או ShipmentItems. חיבור שלא נדרש משכפל כל שורת משלוח לפי מספר האירועים או הפריטים, והסכום מתנפח. אם כבר חיברתם — קבצו כל צד לרמת משלוח לפני החיבור.",
   "compare": "ב-SQL פונקציית SUM מתעלמת מ-NULL מעצמה, ולכן תנאי ה-WHERE כאן הוא הצהרה מפורשת ולא הכרח. במונגו ‎$sum‎ גם מתעלם מערך שאינו מספר, אבל כשצריך לספור את כל המשלוחים ולא רק לסכם — ההבדל קריטי (ראו שאלה 19).",
   "edge": "סכום 200 בדיוק אינו נכלל (C5). לקוח בלי אף עלות מספרית אינו נכלל בכלל. לקוח שיש לו עלות ריקה ועלויות תקינות נכלל לפי הסכום הידוע (C9: 400+250=650, ללא SH16).",
   "slot": "S14",
   "book": {
    "page": 16,
    "where": "שאלה 14 במבחן לדוגמה, עם הפתרון הרשמי"
   }
  },
  "SX15": {
   "id": "SX15",
   "schema": "ship",
   "src": "official",
   "n": 15,
   "pattern": "join-group-having",
   "title": "פריטי Electronics שנשלחו ביותר מ-100 יחידות",
   "q": "הציגו את מזהה הפריט, שמו וסך היחידות שנשלחו, עבור פריטים בקטגוריה Electronics שסך היחידות שלהם גדול מ-100. מיינו לפי סך היחידות בסדר יורד.",
   "keywords": "סך יחידות → SUM(quantity) ולא COUNT(*) · קטגוריה → חיבור לטבלת Items · יותר מ-100 → HAVING",
   "cols": [
    "itemId",
    "itemName",
    "totalQuantity"
   ],
   "sql": "SELECT i.itemId, i.itemName, SUM(si.quantity) AS totalQuantity\nFROM ShipmentItems si\nINNER JOIN Items i ON si.itemId = i.itemId\nWHERE i.category = 'Electronics'\n  AND si.quantity IS NOT NULL\nGROUP BY i.itemId, i.itemName\nHAVING SUM(si.quantity) > 100\nORDER BY totalQuantity DESC;",
   "mongo": "db.shipmentItems.aggregate([\n  { $match: { quantity: { $type: \"number\" } } },\n  { $group: { _id: \"$itemId\",\n              totalQuantity: { $sum: \"$quantity\" } } },\n  { $match: { totalQuantity: { $gt: 100 } } },\n  { $lookup: {\n      from: \"items\",\n      localField: \"_id\",\n      foreignField: \"itemId\",\n      as: \"item\" } },\n  { $unwind: \"$item\" },\n  { $match: { \"item.category\": \"Electronics\" } },\n  { $project: { _id: 0,\n                itemId: \"$_id\",\n                itemName: \"$item.itemName\",\n                totalQuantity: 1 } },\n  { $sort: { totalQuantity: -1 } }\n])",
   "points": [
    "המלכודת: לסכם עם SUM(quantity) ולא לספור עם COUNT(*). ב-MongoDB זה ההבדל בין $sum: \"$quantity\" לבין $sum: 1.",
    "הסינון לפי קטגוריה נעשה אחרי ה-$lookup, כי השדה category נמצא ב-items ולא ב-shipmentItems.",
    "סדר הפעולות: סכום ← סינון על הסכום ← חיבור לפרטי הפריט ← סינון קטגוריה ← מיון."
   ],
   "logic": "שורת פריט שומרת כמות ומחיר של העסקה. הכמות היא סכום של השדה quantity על כל השורות של אותו פריט — ולא מספר השורות.",
   "trap": "הטעות הנפוצה כאן היא COUNT(*) במקום SUM(quantity). פריט שמופיע בשתי שורות של 60 ו-50 נתן 110 יחידות, אבל COUNT היה נותן 2. סמנו במילות השאלה אם מבקשים \"כמה יחידות\" או \"בכמה משלוחים\".",
   "compare": "שתי השפות מגיעות לאותו סכום, אבל סדר השלבים הפוך: ב-SQL מחברים קודם ומקבצים אחרי, ובמונגו נוח לקבץ קודם לפי itemId ולחבר את הקטגוריה והשם רק אחר כך — פחות מסמכים עוברים ב-$lookup.",
   "edge": "סך 100 בדיוק אינו נכלל (I4). פריט מקטגוריה אחרת אינו נכלל גם אם הכמות גבוהה בהרבה (I5 עם 200 יחידות). פריט שמופיע בשתי שורות באותו משלוח נספר פעמיים לעניין הכמות — וזה נכון (I1).",
   "slot": "S15",
   "book": {
    "page": 17,
    "where": "שאלה 15 במבחן לדוגמה, עם הפתרון הרשמי"
   }
  },
  "SX16": {
   "id": "SX16",
   "schema": "ship",
   "src": "official",
   "n": 16,
   "pattern": "anti-join-period",
   "title": "מחסנים שלא יצא מהם אף משלוח בספטמבר",
   "q": "הציגו את מזהה המחסן, שמו והעיר שלו, עבור כל מחסן שלא נוצר ממנו אף משלוח בספטמבר 2026. יש לכלול גם מחסנים שאין להם משלוחים כלל, וגם מחסנים שיצאו מהם משלוחים בחודשים אחרים בלבד.",
   "keywords": "לא בחודש → NOT EXISTS עם טווח תאריכים · כולל מי שאין לו כלום → להתחיל מהמחסנים · ספטמבר → ‎>= 01.09 וגם ‎< 01.10",
   "cols": [
    "warehouseId",
    "warehouseName",
    "city"
   ],
   "sql": "SELECT w.warehouseId, w.warehouseName, w.city\nFROM Warehouses w\nLEFT JOIN Shipments s\n       ON w.warehouseId = s.warehouseId\n      AND s.createdAt >= '2026-09-01'\n      AND s.createdAt <  '2026-10-01'\nWHERE s.shipmentId IS NULL;",
   "mongo": "// Step 1: warehouses that DID have shipments in September 2026\nconst septWarehouses = db.shipments.distinct(\"warehouseId\", {\n  createdAt: { $gte: ISODate(\"2026-09-01T00:00:00Z\"),\n               $lt:  ISODate(\"2026-10-01T00:00:00Z\") }\n});\n\n// Step 2: all warehouses that are NOT in that list\ndb.warehouses.find(\n  { warehouseId: { $nin: septWarehouses } },\n  { _id: 0, warehouseId: 1, warehouseName: 1, city: 1 }\n)",
   "points": [
    "המלכודת החשובה: תנאי התאריך חייב להיות בתוך ה-ON ולא ב-WHERE. ב-WHERE הוא היה מוחק את שורות ה-NULL והופך את ה-LEFT JOIN ל-INNER JOIN, ומחסנים בלי משלוחים היו נעלמים.",
    "טווח התאריכים מתחיל ב-1 בספטמבר 2026 כולל, ונגמר לפני 1 באוקטובר 2026, שאינו כלול. כך 1 באוקטובר לא נכלל, ומשלוחים מכל שעות היום של 30 בספטמבר כן נכללים.",
    "ב-MongoDB: הפרש קבוצות. קודם distinct מחזיר את המחסנים שהיו פעילים בספטמבר, ואז $nin מחזיר את כל השאר, כולל מחסנים שאין להם משלוחים בכלל."
   ],
   "logic": "התבנית: חברו רק את הרשומות שיכולות לפסול את הישות — כאן, משלוחי ספטמבר בלבד — ואז שמרו את מי שלא נמצאה לו אף רשומה כזאת. משלוח בחודש אחר אינו פוסל, ולכן הוא לא נכנס לחיבור מלכתחילה.",
   "trap": "במונגו זו הסיבה היחידה שצריך ‎$lookup‎ עם let ו-pipeline ולא ‎$lookup‎ רגיל: ‎$lookup‎ הפשוט מחבר לפי מפתח בלבד ואין לו מקום לתנאי החודש. ‎$$wid‎ הוא המשתנה שהוגדר ב-let, ו-‎$expr‎ הוא מה שמאפשר להשוות שדה למשתנה בתוך ‎$match‎.",
   "compare": "ב-SQL תנאי התקופה יושב בתוך תת-השאילתה של NOT EXISTS. אם היו מממשים ב-LEFT JOIN, התנאי היה חייב לשבת ב-ON ולא ב-WHERE — ב-WHERE הוא מפיל כל מחסן שאין לו התאמה, כי ה-createdAt שלו NULL.",
   "edge": "מחסן שיצא ממנו משלוח ב-1.10 בשעה 08:00 נכלל בתוצאה, כי הגבול העליון אינו כולל (W2). מחסן שיצא ממנו משלוח ב-30.9 בשעה 23:00 נפסל. מחסן בלי משלוחים בכלל נכלל (W3).",
   "slot": "S16",
   "book": {
    "page": 18,
    "where": "שאלה 16 במבחן לדוגמה, עם הפתרון הרשמי"
   }
  },
  "SX17": {
   "id": "SX17",
   "schema": "ship",
   "src": "official",
   "n": 17,
   "pattern": "latest-per-group",
   "title": "האירוע האחרון של כל משלוח, כולל משלוחים בלי אירועים",
   "q": "הציגו לכל משלוח את מזהה המשלוח ואת פרטי האירוע האחרון שלו: מזהה האירוע, סוג האירוע, זמן האירוע והמיקום. יש לכלול גם משלוחים שאין להם אף אירוע. אם לשני אירועים אותו זמן מרבי, בחרו את זה שמזהה האירוע שלו קטן יותר.",
   "keywords": "האחרון לכל → ROW_NUMBER עם PARTITION BY · כולל מי שאין לו → LEFT JOIN · שובר שוויון → מפתח מיון שני",
   "cols": [
    "shipmentId",
    "eventId",
    "eventType",
    "eventTime",
    "location"
   ],
   "sql": "SELECT s.shipmentId, e.eventId, e.eventType, e.eventTime, e.location\nFROM Shipments s\nLEFT JOIN (\n    SELECT eventId, shipmentId, eventType, eventTime, location,\n           ROW_NUMBER() OVER (PARTITION BY shipmentId\n                              ORDER BY eventTime DESC, eventId ASC) AS rn\n    FROM ShipmentEvents\n) e ON s.shipmentId = e.shipmentId\n   AND e.rn = 1;",
   "mongo": "db.shipments.aggregate([\n  { $lookup: {\n      from: \"shipmentEvents\",\n      localField: \"shipmentId\",\n      foreignField: \"shipmentId\",\n      as: \"events\" } },\n  { $unwind: { path: \"$events\",\n               preserveNullAndEmptyArrays: true } },\n  { $sort: { shipmentId: 1,\n             \"events.eventTime\": -1,\n             \"events.eventId\": 1 } },\n  { $group: { _id: \"$shipmentId\",\n              lastEvent: { $first: \"$events\" } } },\n  { $project: { _id: 0,\n                shipmentId: \"$_id\",\n                eventId:   \"$lastEvent.eventId\",\n                eventType: \"$lastEvent.eventType\",\n                eventTime: \"$lastEvent.eventTime\",\n                location:  \"$lastEvent.location\" } }\n])",
   "points": [
    "ROW_NUMBER() ממספר את האירועים של כל משלוח מהחדש לישן. eventId ASC הוא כלל ההכרעה כשיש שוויון בזמן.",
    "התנאי rn = 1 נמצא בתוך ה-ON ולא ב-WHERE, כדי שמשלוחים בלי אירועים יישארו בתוצאה עם ערכי NULL.",
    "ב-MongoDB: השילוב $sort + $group + $first הוא המקביל ל-ROW_NUMBER, בדיוק כמו בטבלת ההשוואה של המרצה.",
    "preserveNullAndEmptyArrays: true שומר משלוחים בלי אירועים, בדיוק כמו LEFT JOIN."
   ],
   "logic": "ROW_NUMBER ממספר מחדש בכל משלוח בנפרד (זה ה-PARTITION BY), ממיין מהאירוע החדש לישן, ונותן 1 לאירוע האחרון. ה-CTE בשם WITH אינו יוצר טבלה — הוא רק נותן שם לתת-שאילתה כדי שנוכל לסנן rn = 1.",
   "trap": "שני דברים נפרדים נשברים כאן בקלות. ראשית, התנאי rn = 1 חייב לשבת ב-ON ולא ב-WHERE — ב-WHERE הוא מוחק את המשלוחים שאין להם אירועים. שנית, MAX(eventTime) לבדו אינו פתרון: הוא מחזיר זמן, אבל לא את סוג האירוע והמיקום של אותה שורה.",
   "compare": "ב-SQL בוחרים שורה שלמה בעזרת פונקציית חלון. במונגו אין פונקציות חלון בתחביר הזה, ולכן ממיינים בתוך ה-pipeline של ה-$lookup ולוקחים ‎$limit:1‎. ‎preserveNullAndEmptyArrays‎ הוא המקביל המדויק של LEFT JOIN: בלעדיו ‎$unwind‎ מוחק כל משלוח שהמערך שלו ריק.",
   "edge": "משלוח עם שני אירועים באותה שנייה מחזיר את זה שמזההו קטן (SH04 → E10 ולא E11). משלוח בלי אירועים מופיע בדיוק פעם אחת, עם שדות אירוע ריקים (SH06 עד SH17). בלי מפתח מיון שני הבחירה בתיקו אינה קבועה ועלולה להשתנות בין הרצות.",
   "slot": "S17",
   "book": {
    "page": 19,
    "where": "שאלה 17 במבחן לדוגמה, עם הפתרון הרשמי"
   }
  },
  "SX18": {
   "id": "SX18",
   "schema": "ship",
   "src": "official",
   "n": 18,
   "pattern": "all-satisfy",
   "title": "לקוחות שכל משלוחיהם נמסרו, ויש להם לפחות משלוח אחד",
   "q": "הציגו את מזהה הלקוח ואת שמו, עבור לקוחות שכל המשלוחים שלהם בסטטוס Delivered. לקוח בלי משלוחים כלל, או לקוח שיש לו אפילו משלוח אחד בסטטוס אחר, אינו נכלל.",
   "keywords": "כולם → \"לא קיים מפר\" · לפחות אחד → EXISTS נוסף · סטטוס אחר כולל גם סטטוס ריק",
   "cols": [
    "customerId",
    "customerName"
   ],
   "sql": "SELECT c.customerId, c.customerName\nFROM Customers c\nINNER JOIN Shipments s ON c.customerId = s.customerId\nGROUP BY c.customerId, c.customerName\nHAVING SUM(CASE WHEN s.status = 'Delivered' THEN 0 ELSE 1 END) = 0;",
   "mongo": "db.shipments.aggregate([\n  { $group: { _id: \"$customerId\",\n              notDelivered: { $sum: {\n                $cond: [ { $eq: [\"$status\", \"Delivered\"] }, 0, 1 ] } } } },\n  { $match: { notDelivered: 0 } },\n  { $lookup: {\n      from: \"customers\",\n      localField: \"_id\",\n      foreignField: \"customerId\",\n      as: \"customer\" } },\n  { $unwind: \"$customer\" },\n  { $project: { _id: 0,\n                customerId: \"$_id\",\n                customerName: \"$customer.customerName\" } }\n])",
   "points": [
    "INNER JOIN מבטיח שהלקוח יופיע רק אם יש לו לפחות משלוח אחד.",
    "CASE סופר כמה משלוחים אינם Delivered, והתנאי הוא שהספירה שווה ל-0. כך נבדקים כל המשלוחים, ולא רק קיומו של משלוח אחד שנמסר. משלוח בלי סטטוס נספר כמשלוח שלא נמסר.",
    "ב-MongoDB: $cond הוא המקביל ל-CASE WHEN, ו-$group מבטיח שכל לקוח מופיע פעם אחת."
   ],
   "logic": "את \"כולם\" לא בודקים בסינון — בודקים בשלילה: אין אף רשומה שמפרה את התנאי. לכן התנאי מורכב משני חלקים: יש לפחות אחד, ואין אף מפר. בלי החלק הראשון, לקוח בלי משלוחים היה עובר, כי אין לו מפר.",
   "trap": "הסינון ‎WHERE status = 'Delivered'‎ בלבד אינו מוכיח כלום על \"כולם\" — הוא פשוט מתעלם מהמשלוחים הלא תקינים. וחשוב לא פחות: סטטוס ריק הוא מפר. בלי ‎OR s.status IS NULL‎ הסטטוס החסר חומק דרך ההשוואה ‎<> 'Delivered'‎, שמחזירה UNKNOWN ולא TRUE.",
   "compare": "ב-SQL: EXISTS יחד עם NOT EXISTS. חלופה תקינה באותה מידה: ‎HAVING COUNT(*) >= 1 AND SUM(CASE WHEN status = 'Delivered' THEN 0 ELSE 1 END) = 0‎. במונגו: ‎$not‎ מעל ‎$elemMatch‎ על מערך תוצאות ה-$lookup — ‎$ne‎ מתאים גם לסטטוס חסר, ולכן הוא נתפס כמפר.",
   "edge": "שני משלוחים שנמסרו — נכלל (C5, C6). משלוח אחד שנמסר ואחד InTransit — נפסל (C1, C2). אפס משלוחים — נפסל (C3). משלוח יחיד עם סטטוס ריק — נפסל (C7). אין כפילות בפלט, כי לא עשינו ‎$unwind‎.",
   "slot": "S18",
   "book": {
    "page": 21,
    "where": "שאלה 18 במבחן לדוגמה, עם הפתרון הרשמי"
   }
  },
  "SX19": {
   "id": "SX19",
   "schema": "ship",
   "src": "official",
   "n": 19,
   "pattern": "double-having",
   "title": "לקוחות עם שלושה משלוחים בספטמבר וסכום מעל 500",
   "q": "הציגו את מזהה הלקוח, שמו, מספר המשלוחים שלו בספטמבר 2026 וסך עלויות המשלוח באותו חודש — רק עבור לקוחות שהיו להם לפחות שלושה משלוחים בחודש וסך עלויותיהם גדול מ-500. מיינו לפי הסכום בסדר יורד.",
   "keywords": "לפחות שלושה → COUNT(*) ‎>= 3 · וגם סכום → שני תנאי HAVING · בספטמבר → טווח על createdAt",
   "cols": [
    "customerId",
    "customerName",
    "shipmentCount",
    "totalCost"
   ],
   "sql": "SELECT c.customerId, c.customerName,\n       COUNT(*)            AS shipmentsCount,\n       SUM(s.shippingCost) AS totalCost\nFROM Customers c\nINNER JOIN Shipments s ON c.customerId = s.customerId\nWHERE s.createdAt >= '2026-09-01'\n  AND s.createdAt <  '2026-10-01'\nGROUP BY c.customerId, c.customerName\nHAVING COUNT(*) >= 3\n   AND SUM(s.shippingCost) > 500\nORDER BY totalCost DESC;",
   "mongo": "db.shipments.aggregate([\n  { $match: { createdAt: { $gte: ISODate(\"2026-09-01T00:00:00Z\"),\n                           $lt:  ISODate(\"2026-10-01T00:00:00Z\") } } },\n  { $group: { _id: \"$customerId\",\n              shipmentsCount: { $sum: 1 },\n              totalCost: { $sum: \"$shippingCost\" } } },\n  { $match: { shipmentsCount: { $gte: 3 },\n              totalCost: { $gt: 500 } } },\n  { $lookup: {\n      from: \"customers\",\n      localField: \"_id\",\n      foreignField: \"customerId\",\n      as: \"customer\" } },\n  { $unwind: \"$customer\" },\n  { $project: { _id: 0,\n                customerId: \"$_id\",\n                customerName: \"$customer.customerName\",\n                shipmentsCount: 1,\n                totalCost: 1 } },\n  { $sort: { totalCost: -1 } }\n])",
   "points": [
    "אותו טווח תאריכים כמו בשאלה 16: עד 1 באוקטובר, לא כולל.",
    "COUNT(*) סופר את כל המשלוחים, גם כאלה שעלותם NULL, ו-SUM מתעלם מ-NULL. ב-MongoDB, $sum: 1 סופר הכול, ו-$sum: \"$shippingCost\" מתעלם מערכים שאינם מספריים.",
    "שני התנאים על הקבוצה, הכמות והסכום, נמצאים ב-HAVING, וב-MongoDB ב-$match שאחרי ה-$group."
   ],
   "logic": "שני מדדים על אותה קבוצה: ספירה וסכום. שניהם מחושבים ב-$group, ושני התנאים נבדקים אחריו. זה בדיוק מה ש-HAVING עושה ב-SQL.",
   "trap": "זה ההבדל מול שאלה 14, והוא הלב של השאלה: אסור לסנן עלות חסרה לפני הספירה. כל משלוח בחודש נספר, גם אם עלותו ריקה — ורק הסכום מתעלם ממנה. מי שיסנן קודם יקבל ספירה קטנה יותר ויפסיל לקוח שאמור להיכלל.",
   "compare": "ב-SQL זה קורה מעצמו: COUNT(*) סופר שורות ו-SUM מתעלם מ-NULL. במונגו צריך לכתוב את ההבחנה במפורש — ‎$sum:1‎ לספירה, ו-‎$cond‎ שמחליף עלות חסרה באפס לסכום.",
   "edge": "שלושה משלוחים בספטמבר שסכומם 500 בדיוק נפסלים (C8). שלושה משלוחים שאחד מהם עלות ריקה והסכום 650 נכללים, והספירה נשארת 3 (C9). שני משלוחים בספטמבר ואחד באוגוסט אינם מספיקים.",
   "slot": "S19",
   "book": {
    "page": 22,
    "where": "שאלה 19 במבחן לדוגמה, עם הפתרון הרשמי"
   }
  },
  "SX20": {
   "id": "SX20",
   "schema": "ship",
   "src": "official",
   "n": 20,
   "pattern": "aggregate-in-having",
   "title": "משלוחים עם שני עיכובים לפחות, שכולם לפני אוקטובר",
   "q": "הציגו את מזהה המשלוח ואת מספר אירועי העיכוב שלו, עבור משלוחים שהיו בהם לפחות שני אירועי Delayed, ושהזמן של אירוע העיכוב המאוחר ביותר שלהם הוא לפני 1.10.2026. מיינו לפי מספר העיכובים בסדר יורד.",
   "keywords": "לפחות שניים → HAVING COUNT · המאוחר לפני → MAX(eventTime) בתוך HAVING · רק עיכובים → סינון סוג האירוע לפני הקיבוץ",
   "cols": [
    "shipmentId",
    "delayCount"
   ],
   "sql": "SELECT shipmentId, COUNT(*) AS delayedCount\nFROM ShipmentEvents\nWHERE eventType = 'Delayed'\nGROUP BY shipmentId\nHAVING COUNT(*) >= 2\n   AND MAX(eventTime) < '2026-10-01'\nORDER BY delayedCount DESC;",
   "mongo": "db.shipmentEvents.aggregate([\n  { $match: { eventType: \"Delayed\" } },\n  { $group: { _id: \"$shipmentId\",\n              delayedCount: { $sum: 1 },\n              lastDelay: { $max: \"$eventTime\" } } },\n  { $match: { delayedCount: { $gte: 2 },\n              lastDelay: { $lt: ISODate(\"2026-10-01T00:00:00Z\") } } },\n  { $project: { _id: 0, shipmentId: \"$_id\", delayedCount: 1 } },\n  { $sort: { delayedCount: -1 } }\n])",
   "points": [
    "קודם מסננים רק אירועי Delayed עם WHERE, ואחר כך בודקים את הקבוצה ב-HAVING: כמות של 2 לפחות, וגם שהאירוע המאוחר ביותר היה לפני 1 באוקטובר.",
    "בודקים את MAX(eventTime) ולא כל אירוע בנפרד: משלוח שיש לו עיכוב אחד אחרי 1 באוקטובר לא יופיע, גם אם יש לו שני עיכובים לפני.",
    "ב-MongoDB: $max בתוך $group מחשב את זמן העיכוב האחרון, ו-$match שאחרי הקיבוץ בודק את שני התנאים."
   ],
   "logic": "שני סוגי תנאים נפרדים. סוג האירוע הוא תנאי על שורה, ולכן הוא לפני הקיבוץ. המספר והזמן המרבי הם תנאים על הקבוצה, ולכן הם אחרי הקיבוץ.",
   "trap": "אל תסננו את הזמן לפני הקיבוץ. אם תוסיפו ‎eventTime < 01.10‎ ל-WHERE, העיכוב שבאוקטובר ייעלם — והמשלוח שהוא פוסל ייראה פתאום כשיר. התנאי הוא על ה-MAX, ולכן חייב להיבדק אחרי שה-MAX חושב.",
   "compare": "ב-SQL מותר לכתוב MAX בתוך HAVING ישירות. במונגו חייבים לחשב את ‎$max‎ כשדה בתוך ‎$group‎ ואז לסנן עליו ב-‎$match‎ — אין דרך לסנן על ערך מצטבר לפני שחישבתם אותו ונתתם לו שם.",
   "edge": "שני עיכובים בספטמבר ועוד אחד באוקטובר — נפסל (SH02). שלושה עיכובים בספטמבר ואירוע Delivered באוקטובר — נכלל, כי בודקים רק אירועי Delayed (SH05). עיכוב יחיד — נפסל (SH03).",
   "slot": "S20",
   "book": {
    "page": 23,
    "where": "שאלה 20 במבחן לדוגמה, עם הפתרון הרשמי"
   }
  },
  "P01": {
   "id": "P01",
   "schema": "ship",
   "src": "ship",
   "pattern": "top-n",
   "title": "חמשת המשלוחים היקרים",
   "q": "הציגו את חמשת המשלוחים בעלי עלות המשלוח הגבוהה ביותר. מיינו לפי העלות בסדר יורד, ובמקרה של שוויון לפי מזהה המשלוח בסדר עולה.",
   "cols": [
    "shipmentId",
    "shippingCost"
   ],
   "sql": "SELECT TOP (5) shipmentId, shippingCost\nFROM Shipments\nWHERE shippingCost IS NOT NULL\nORDER BY shippingCost DESC, shipmentId ASC;",
   "mongo": "db.shipments.find(\n  { shippingCost: { $ne: null } },\n  { _id:0, shipmentId:1, shippingCost:1 }\n).sort({ shippingCost:-1, shipmentId:1 }).limit(5)",
   "logic": "ראשית ממיינים, ורק אחר כך חותכים. מפתח המיון השני הופך בחירה בתיקו לקבועה.",
   "trap": "במונגו ‎.limit()‎ לפני ‎.sort()‎ בשרשרת find נראה שגוי אבל עובד — המנוע מסדר את השלבים. בצינור aggregate זה כן נשבר: ‎$limit‎ לפני ‎$sort‎ חותך את המסמכים הלא נכונים.",
   "slot": "S12",
   "card": {
    "code": "R-27",
    "page": 91,
    "title": "TOP / דפדוף"
   }
  },
  "P02": {
   "id": "P02",
   "schema": "ship",
   "src": "ship",
   "pattern": "group-count",
   "title": "מספר המשלוחים בכל סטטוס",
   "q": "הציגו לכל סטטוס את מספר המשלוחים שבו, ודרגו מהגבוה לנמוך.",
   "cols": [
    "status",
    "shipmentCount"
   ],
   "sql": "SELECT status, COUNT(*) AS shipmentCount\nFROM Shipments\nGROUP BY status\nORDER BY shipmentCount DESC;",
   "mongo": "db.shipments.aggregate([\n  { $group: { _id:\"$status\", shipmentCount:{ $sum:1 } } },\n  { $project: { _id:0, status:\"$_id\", shipmentCount:1 } },\n  { $sort: { shipmentCount:-1 } }\n])",
   "logic": "הכול בטבלה אחת, ולכן אין צירוף. ‎$sum:1‎ סופר מסמכים.",
   "trap": "סטטוס ריק יוצר קבוצה בפני עצמו בשתי השפות — ב-SQL קבוצת NULL, ובמונגו ‎_id: null‎. אם השאלה לא רוצה אותו, צריך לסנן במפורש.",
   "slot": "S14",
   "card": {
    "code": "R-11",
    "page": 75,
    "title": "קיבוץ וספירה"
   }
  },
  "P03": {
   "id": "P03",
   "schema": "ship",
   "src": "ship",
   "pattern": "anti-join",
   "title": "מחסנים בלי משלוחים כלל",
   "q": "הציגו מחסנים שלא יצא מהם אף משלוח, אי פעם.",
   "cols": [
    "warehouseId",
    "warehouseName"
   ],
   "sql": "SELECT w.warehouseId, w.warehouseName\nFROM Warehouses w\nLEFT JOIN Shipments s ON s.warehouseId = w.warehouseId\nWHERE s.shipmentId IS NULL;",
   "mongo": "db.warehouses.aggregate([\n  { $lookup: { from:\"shipments\", localField:\"warehouseId\",\n               foreignField:\"warehouseId\", as:\"matches\" } },\n  { $match: { matches: { $size: 0 } } },\n  { $project: { _id:0, warehouseId:1, warehouseName:1 } }\n])",
   "logic": "אנטי-צירוף קלאסי בשתי הצורות: LEFT JOIN ואז \"הצד הימני ריק\", או ‎$lookup‎ ואז מערך באורך אפס.",
   "trap": "ב-SQL בודקים ‎IS NULL‎ על עמודה שלא יכולה להיות ריקה בעצמה — מפתח ראשי. בדיקה על עמודה שמותר לה להיות NULL תחזיר גם התאמות אמיתיות.",
   "slot": "S13",
   "card": {
    "code": "R-21",
    "page": 86,
    "title": "אנטי-צירוף — מי שאין לו כלום"
   }
  },
  "P04": {
   "id": "P04",
   "schema": "ship",
   "src": "ship",
   "pattern": "anti-join-period",
   "title": "מחסנים בלי משלוחים בספטמבר, ב-LEFT JOIN",
   "q": "אותה דרישה של שאלה 16, אבל בניסוח של LEFT JOIN: הציגו מחסנים שאין להם אף משלוח שנוצר בספטמבר 2026, גם אם יצאו מהם משלוחים בחודשים אחרים.",
   "cols": [
    "warehouseId",
    "warehouseName"
   ],
   "sql": "SELECT w.warehouseId, w.warehouseName\nFROM Warehouses w\nLEFT JOIN Shipments s\n  ON s.warehouseId = w.warehouseId\n AND s.createdAt >= '2026-09-01 00:00:00'\n AND s.createdAt <  '2026-10-01 00:00:00'\nWHERE s.shipmentId IS NULL;",
   "mongo": "db.warehouses.aggregate([\n  { $lookup: { from:\"shipments\", let:{ wid:\"$warehouseId\" },\n      pipeline: [\n        { $match: { $expr: { $eq:[\"$warehouseId\",\"$$wid\"] } } },\n        { $match: { createdAt: {\n            $gte: ISODate(\"2026-09-01T00:00:00Z\"),\n            $lt:  ISODate(\"2026-10-01T00:00:00Z\") } } }\n      ], as:\"september\" } },\n  { $match: { september: { $size: 0 } } },\n  { $project: { _id:0, warehouseId:1, warehouseName:1 } }\n])",
   "logic": "שתי הדרכים — NOT EXISTS ו-LEFT JOIN עם תנאי ב-ON — מחזירות אותה תשובה. בחרו את מה שאתם זוכרים נכון תחת לחץ.",
   "trap": "אם תנאי התקופה יעבור מ-ON ל-WHERE, כל מחסן בלי התאמה ייפול — ה-createdAt שלו ריק, והשוואה ל-NULL אינה TRUE. זו הטעות הנפוצה ביותר ב-LEFT JOIN עם תנאי זמן.",
   "slot": "S16",
   "card": {
    "code": "R-22",
    "page": 86,
    "title": "אנטי-צירוף מוגבל לתקופה או לתנאי"
   }
  },
  "P05": {
   "id": "P05",
   "schema": "ship",
   "src": "ship",
   "pattern": "left-join-zero",
   "title": "מספר המשלוחים של כל שליח פעיל, כולל אפס",
   "q": "הציגו כל שליח פעיל ואת מספר המשלוחים שלו, כולל שליחים שאין להם אף משלוח — להם יש להציג 0.",
   "cols": [
    "courierId",
    "courierName",
    "shipmentCount"
   ],
   "sql": "SELECT c.courierId, c.courierName,\n       COUNT(s.shipmentId) AS shipmentCount\nFROM Couriers c\nLEFT JOIN Shipments s ON s.courierId = c.courierId\nWHERE c.active = 1\nGROUP BY c.courierId, c.courierName;",
   "mongo": "db.couriers.aggregate([\n  { $match: { active: true } },\n  { $lookup: { from:\"shipments\", localField:\"courierId\",\n               foreignField:\"courierId\", as:\"deliveries\" } },\n  { $project: { _id:0, courierId:1, courierName:1,\n                shipmentCount: { $size:\"$deliveries\" } } }\n])",
   "logic": "כשצריך גם אפס — מתחילים מהישות שרוצים לשמר, ולא מהטבלה שסופרים ממנה.",
   "trap": "אסור COUNT(*) כאן. אחרי LEFT JOIN, שליח בלי משלוחים מקבל שורה אחת עם NULL בצד הימני — ו-COUNT(*) יספור אותה כ-1. ‎COUNT(s.shipmentId)‎ מתעלם מ-NULL ולכן נותן 0.",
   "slot": "S16",
   "card": {
    "code": "R-19",
    "page": 84,
    "title": "LEFT JOIN עם אפסים"
   }
  },
  "P06": {
   "id": "P06",
   "schema": "ship",
   "src": "ship",
   "pattern": "exists",
   "title": "לקוחות שיש להם לפחות משלוח אחד",
   "q": "הציגו את הלקוחות שיש להם משלוחים, כל לקוח פעם אחת בלבד.",
   "cols": [
    "customerId",
    "customerName"
   ],
   "sql": "SELECT DISTINCT c.customerId, c.customerName\nFROM Customers c\nJOIN Shipments s ON s.customerId = c.customerId;",
   "mongo": "db.customers.aggregate([\n  { $lookup: { from:\"shipments\", localField:\"customerId\",\n               foreignField:\"customerId\", as:\"deliveries\" } },\n  { $match: { \"deliveries.0\": { $exists: true } } },\n  { $project: { _id:0, customerId:1, customerName:1 } }\n])",
   "logic": "צירוף רגיל מחזיר שורה לכל משלוח, ולכן צריך DISTINCT. אפשר גם ‎WHERE EXISTS‎ — ואז אין כפילות מלכתחילה ואין צורך ב-DISTINCT.",
   "trap": "במונגו בדיקה שהמערך אינו ריק עדיפה על ‎$unwind‎: ‎$unwind‎ היה מחזיר את הלקוח פעם לכל משלוח, וכדי לאחד שוב היה צריך ‎$group‎.",
   "slot": "S18",
   "card": {
    "code": "R-23",
    "page": 88,
    "title": "יש לפחות אחד"
   }
  },
  "P07": {
   "id": "P07",
   "schema": "ship",
   "src": "ship",
   "pattern": "group-avg",
   "title": "לקוחות שממוצע עלות המשלוח שלהם מעל 70",
   "q": "חשבו לכל לקוח את ממוצע עלויות המשלוח המספריות שלו, והציגו רק לקוחות שהממוצע שלהם גדול מ-70.",
   "cols": [
    "customerId",
    "avgCost"
   ],
   "sql": "SELECT customerId, AVG(shippingCost) AS avgCost\nFROM Shipments\nWHERE shippingCost IS NOT NULL\nGROUP BY customerId\nHAVING AVG(shippingCost) > 70;",
   "mongo": "db.shipments.aggregate([\n  { $match: { shippingCost: { $ne: null } } },\n  { $group: { _id:\"$customerId\", avgCost:{ $avg:\"$shippingCost\" } } },\n  { $match: { avgCost: { $gt: 70 } } },\n  { $project: { _id:0, customerId:\"$_id\", avgCost:1 } }\n])",
   "logic": "ממוצע מחושב רק על ערכים ידועים, ולכן מסננים חסרים לפני הקיבוץ — וכאן זה מותר, כי השאלה מדברת על עלויות מספריות בלבד.",
   "trap": "ההבדל מול שאלה 19: שם סופרים את כולם ולכן אסור לסנן קודם. כאן מחשבים ממוצע ולכן מותר. מה שקובע הוא מה השאלה מבקשת, לא הרגל.",
   "slot": "S14",
   "card": {
    "code": "R-12",
    "page": 76,
    "title": "קיבוץ וממוצע"
   }
  },
  "P08": {
   "id": "P08",
   "schema": "ship",
   "src": "ship",
   "pattern": "computed-sum",
   "title": "שווי הפריטים בכל משלוח",
   "q": "חשבו לכל משלוח את סך שווי הפריטים שבו — כלומר סכום המכפלות של הכמות במחיר ליחידה.",
   "cols": [
    "shipmentId",
    "itemsValue"
   ],
   "sql": "SELECT shipmentId, SUM(quantity * unitPrice) AS itemsValue\nFROM ShipmentItems\nGROUP BY shipmentId;",
   "mongo": "db.shipmentItems.aggregate([\n  { $group: { _id:\"$shipmentId\", itemsValue:{ $sum:{\n      $multiply: [\"$quantity\",\"$unitPrice\"] } } } },\n  { $project: { _id:0, shipmentId:\"$_id\", itemsValue:1 } }\n])",
   "logic": "המכפלה מחושבת לכל שורה ואז מסוכמת. ב-SQL זה ביטוי בתוך SUM, ובמונגו זה ‎$multiply‎ בתוך ‎$sum‎.",
   "trap": "שווי הפריטים אינו עלות המשלוח. shippingCost הוא דמי המשלוח, ואין לערבב ביניהם — שאלה שמבקשת \"סך עלות\" צריכה קריאה חוזרת כדי לדעת למה היא מתכוונת.",
   "slot": "S15",
   "card": {
    "code": "R-17",
    "page": 81,
    "title": "סכום מחושב"
   }
  },
  "P09": {
   "id": "P09",
   "schema": "ship",
   "src": "ship",
   "pattern": "top-n-group",
   "title": "שלוש הקטגוריות עם הכי הרבה יחידות",
   "q": "הציגו את שלוש הקטגוריות שסך היחידות שנשלחו בהן הוא הגבוה ביותר.",
   "cols": [
    "category",
    "units"
   ],
   "sql": "SELECT TOP (3) i.category, SUM(si.quantity) AS units\nFROM ShipmentItems si\nJOIN Items i ON i.itemId = si.itemId\nWHERE si.quantity IS NOT NULL\nGROUP BY i.category\nORDER BY units DESC;",
   "mongo": "db.shipmentItems.aggregate([\n  { $match: { quantity: { $ne: null } } },\n  { $lookup: { from:\"items\", localField:\"itemId\",\n               foreignField:\"itemId\", as:\"item\" } },\n  { $unwind: \"$item\" },\n  { $group: { _id:\"$item.category\", units:{ $sum:\"$quantity\" } } },\n  { $sort: { units:-1 } },\n  { $limit: 3 },\n  { $project: { _id:0, category:\"$_id\", units:1 } }\n])",
   "logic": "מחברים פריט לקטגוריה, מקבצים לפי קטגוריה, ממיינים וחותכים. ‎$unwind‎ כאן בטוח, כי לכל שורת פריט יש בדיוק פריט אחד מתאים.",
   "trap": "ב-aggregate הסדר חייב להיות ‎$sort‎ ואז ‎$limit‎. הפוך — תקבלו שלושה מסמכים שרירותיים וממוינים.",
   "slot": "S15",
   "book": {
    "page": 92,
    "where": "הדוגמה הפתורה בכרטיס R-28 — TOP על קבוצות"
   }
  },
  "P10": {
   "id": "P10",
   "schema": "ship",
   "src": "ship",
   "pattern": "left-join-zero-cond",
   "title": "מספר אירועי העיכוב בכל משלוח, כולל אפס",
   "q": "הציגו לכל משלוח את מספר אירועי ה-Delayed שלו, כולל משלוחים שלא עוכבו בכלל.",
   "cols": [
    "shipmentId",
    "delayedCount"
   ],
   "sql": "SELECT s.shipmentId, COUNT(e.eventId) AS delayedCount\nFROM Shipments s\nLEFT JOIN ShipmentEvents e\n  ON e.shipmentId = s.shipmentId\n AND e.eventType = 'Delayed'\nGROUP BY s.shipmentId;",
   "mongo": "db.shipments.aggregate([\n  { $lookup: { from:\"shipmentEvents\", let:{ sid:\"$shipmentId\" },\n      pipeline: [ { $match: { $expr: { $and: [\n          { $eq: [\"$shipmentId\",\"$$sid\"] },\n          { $eq: [\"$eventType\",\"Delayed\"] }\n      ] } } } ], as:\"delays\" } },\n  { $project: { _id:0, shipmentId:1,\n                delayedCount: { $size:\"$delays\" } } }\n])",
   "logic": "שני דברים בבת אחת: שמירת כל המשלוחים, וסינון סוג האירוע. לכן תנאי הסוג נכנס ל-ON או ל-pipeline של ה-$lookup — לא ל-WHERE ולא ל-$match חיצוני.",
   "trap": "גם כאן COUNT על מזהה הצד הימני ולא COUNT(*). ושוב: תנאי הסוג ב-WHERE היה מוחק כל משלוח שלא עוכב.",
   "slot": "S16",
   "card": {
    "code": "R-20",
    "page": 85,
    "title": "LEFT JOIN עם תנאי ב-ON"
   }
  },
  "P11": {
   "id": "P11",
   "schema": "ship",
   "src": "ship",
   "pattern": "anti-join",
   "title": "משלוחים בלי אף אירוע מעקב",
   "q": "הציגו את המשלוחים שאין להם אף שורה בטבלת האירועים.",
   "cols": [
    "shipmentId"
   ],
   "sql": "SELECT s.shipmentId\nFROM Shipments s\nLEFT JOIN ShipmentEvents e ON e.shipmentId = s.shipmentId\nWHERE e.eventId IS NULL;",
   "mongo": "db.shipments.aggregate([\n  { $lookup: { from:\"shipmentEvents\", localField:\"shipmentId\",\n               foreignField:\"shipmentId\", as:\"events\" } },\n  { $match: { events: { $size: 0 } } },\n  { $project: { _id:0, shipmentId:1 } }\n])",
   "logic": "אותה תבנית של \"שליחים בלי משלוחים\" — רק שמות הטבלאות משתנים. זה היתרון של לחשוב בדפוסים ולא בשאלות.",
   "trap": "אם תתחילו מטבלת האירועים לא תוכלו להגיע למשלוחים שאינם מופיעים בה בכלל.",
   "slot": "S13",
   "card": {
    "code": "R-21",
    "page": 86,
    "title": "אנטי-צירוף — מי שאין לו כלום"
   }
  },
  "P12": {
   "id": "P12",
   "schema": "ship",
   "src": "ship",
   "pattern": "latest-per-group",
   "title": "האירוע האחרון, רק למשלוחים שיש להם אירועים",
   "q": "הציגו את האירוע האחרון של כל משלוח שיש לו לפחות אירוע אחד, לפי זמן יורד ומזהה אירוע עולה.",
   "cols": [
    "shipmentId",
    "eventId",
    "eventTime"
   ],
   "sql": "WITH ranked AS (\n  SELECT e.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY e.shipmentId\n      ORDER BY e.eventTime DESC, e.eventId ASC\n    ) AS rn\n  FROM ShipmentEvents e\n)\nSELECT shipmentId, eventId, eventTime\nFROM ranked\nWHERE rn = 1;",
   "mongo": "db.shipmentEvents.aggregate([\n  { $sort: { shipmentId:1, eventTime:-1, eventId:1 } },\n  { $group: { _id:\"$shipmentId\", last:{ $first:\"$$ROOT\" } } },\n  { $project: { _id:0, shipmentId:\"$_id\",\n                eventId:\"$last.eventId\",\n                eventTime:\"$last.eventTime\" } }\n])",
   "logic": "כאן אין דרישה לכלול משלוחים בלי אירועים, ולכן מותר להתחיל מאוסף האירועים — וזה הופך את הפתרון לקצר בהרבה. ‎$$ROOT‎ הוא כל המסמך הנוכחי, ו-‎$first‎ לוקח את הראשון בסדר שהוגדר.",
   "trap": "בלי ‎$sort‎ לפני ‎$group‎, ‎$first‎ מחזיר מסמך שרירותי. זו טעות שקטה: הקוד רץ, התוצאה נראית סבירה, והיא לא נכונה. השוו לשאלה 17, שבה חייבים גם את המשלוחים בלי אירועים ולכן התבנית שונה לגמרי.",
   "slot": "S17",
   "card": {
    "code": "R-26",
    "page": 91,
    "title": "האחרון לכל קבוצה — רק למי שיש"
   }
  },
  "P13": {
   "id": "P13",
   "schema": "ship",
   "src": "ship",
   "pattern": "all-satisfy",
   "title": "לקוחות עם לפחות שני משלוחים, שכולם נמסרו",
   "q": "הציגו רק לקוחות שיש להם לפחות שני משלוחים, וכל המשלוחים שלהם בסטטוס Delivered.",
   "cols": [
    "customerId",
    "customerName"
   ],
   "sql": "SELECT c.customerId, c.customerName\nFROM Customers c\nJOIN Shipments s ON s.customerId = c.customerId\nGROUP BY c.customerId, c.customerName\nHAVING COUNT(*) >= 2\n   AND SUM(CASE WHEN s.status = 'Delivered' THEN 0 ELSE 1 END) = 0;",
   "mongo": "db.shipments.aggregate([\n  { $group: { _id:\"$customerId\", n:{ $sum:1 },\n      bad: { $sum: { $cond: [\n        { $eq: [\"$status\",\"Delivered\"] }, 0, 1 ] } } } },\n  { $match: { n: { $gte: 2 }, bad: 0 } },\n  { $lookup: { from:\"customers\", localField:\"_id\",\n               foreignField:\"customerId\", as:\"customer\" } },\n  { $unwind: \"$customer\" },\n  { $project: { _id:0, customerId:\"$_id\",\n                customerName:\"$customer.customerName\" } }\n])",
   "logic": "זו הדרך השנייה לבדוק \"כולם\": סופרים את המפרים ודורשים אפס. ‎CASE WHEN‎ ב-SQL ו-‎$cond‎ במונגו עושים אותו דבר — ממירים תנאי למספר שאפשר לסכם.",
   "trap": "ספירת המפרים חייבת לכסות גם סטטוס ריק. ‎CASE WHEN status = 'Delivered' THEN 0 ELSE 1 END‎ עושה זאת נכון: סטטוס ריק אינו שווה ל-Delivered, ולכן הוא נופל ל-ELSE ונספר כמפר. לעומת זאת ‎CASE WHEN status <> 'Delivered' THEN 1 ELSE 0 END‎ היה מחמיץ אותו.",
   "slot": "S18",
   "card": {
    "code": "R-24",
    "page": 89,
    "title": "כולם מקיימים"
   }
  },
  "P14": {
   "id": "P14",
   "schema": "ship",
   "src": "ship",
   "pattern": "anti-join-cond",
   "title": "לקוחות שאין להם אף משלוח שנמסר",
   "q": "הציגו את כל הלקוחות שאין להם אף משלוח בסטטוס Delivered — כולל לקוחות שאין להם משלוחים בכלל.",
   "cols": [
    "customerId",
    "customerName"
   ],
   "sql": "SELECT c.customerId, c.customerName\nFROM Customers c\nLEFT JOIN Shipments s\n  ON s.customerId = c.customerId\n AND s.status = 'Delivered'\nWHERE s.shipmentId IS NULL;",
   "mongo": "db.customers.aggregate([\n  { $lookup: { from:\"shipments\", let:{ cid:\"$customerId\" },\n      pipeline: [ { $match: { $expr: { $and: [\n          { $eq: [\"$customerId\",\"$$cid\"] },\n          { $eq: [\"$status\",\"Delivered\"] }\n      ] } } } ], as:\"delivered\" } },\n  { $match: { delivered: { $size: 0 } } },\n  { $project: { _id:0, customerId:1, customerName:1 } }\n])",
   "logic": "ההבדל מול שאלה 18 חשוב ושווה דקה של מחשבה. \"אין אפילו אחד שנמסר\" כולל גם לקוח בלי משלוחים. \"כל משלוחיו נמסרו\" דורש לפחות משלוח אחד. שתי השאלות נשמעות דומה ומחזירות קבוצות הפוכות כמעט.",
   "trap": "אם תעבירו את תנאי הסטטוס ל-WHERE, הלקוח שאין לו משלוחים ייעלם — וזה בדיוק הלקוח שהשאלה הזאת רוצה.",
   "slot": "S16",
   "card": {
    "code": "R-22",
    "page": 86,
    "title": "אנטי-צירוף מוגבל לתקופה או לתנאי"
   }
  },
  "P15": {
   "id": "P15",
   "schema": "ship",
   "src": "ship",
   "pattern": "count-distinct",
   "title": "מספר הפריטים השונים בכל משלוח",
   "q": "הציגו לכל משלוח את מספר הפריטים השונים שמופיעים בשורות הפריטים שלו.",
   "cols": [
    "shipmentId",
    "distinctItems"
   ],
   "sql": "SELECT shipmentId, COUNT(DISTINCT itemId) AS distinctItems\nFROM ShipmentItems\nGROUP BY shipmentId;",
   "mongo": "db.shipmentItems.aggregate([\n  { $group: { _id:\"$shipmentId\", ids:{ $addToSet:\"$itemId\" } } },\n  { $project: { _id:0, shipmentId:\"$_id\",\n                distinctItems: { $size:\"$ids\" } } }\n])",
   "logic": "במונגו אין ‎COUNT(DISTINCT)‎ בתוך ‎$group‎. התחליף הוא ‎$addToSet‎, שאוסף ערכים ייחודיים למערך, ואחריו ‎$size‎.",
   "trap": "שימו לב להבדל בין מספר השורות למספר הפריטים השונים. משלוח SH01 מופיע בשלוש שורות פריט אבל רק בשני פריטים שונים, כי אותו פריט מופיע בו פעמיים.",
   "slot": "S15",
   "card": {
    "code": "R-09",
    "page": 74,
    "title": "COUNT DISTINCT"
   }
  },
  "B-01": {
   "id": "B-01",
   "schema": "exam2",
   "src": "bank",
   "pattern": "filter-sort",
   "title": "סינון ומיון",
   "q": "הציגו את כל הסטודנטים השייכים למחלקה D10 — מזהה הסטודנט, שמו והאימייל שלו. מיינו לפי שם הסטודנט בסדר עולה.",
   "keywords": "\"השייכים למחלקה D10\" ← תנאי שוויון אחד ב-WHERE. \"מיינו לפי השם בסדר עולה\" ← ORDER BY אחד, עולה. אין צירוף ואין קיבוץ.",
   "cols": [
    "studentId",
    "name",
    "email"
   ],
   "sql": "SELECT studentId, name, email\nFROM Students\nWHERE departmentId = 'D10'\nORDER BY name ASC;",
   "mongo": "db.students.find(\n  { departmentId: \"D10\" },\n  { _id: 0, studentId: 1, name: 1, email: 1 }\n).sort({ name: 1 })",
   "logic": "טבלה אחת בלבד — Students. ה-WHERE מסנן את השורות וה-ORDER BY קובע את הסדר. במונגו הארגומנט הראשון של find הוא הפילטר והשני הוא ה-projection (היטל) שבוחר אילו שדות יחזרו, בדיוק כמו רשימת העמודות אחרי SELECT. את ה-_id צריך לכבות במפורש כי מונגו מחזיר אותו כברירת מחדל.",
   "trap": "שכחת _id: 0 ב-projection — התוצאה תכלול עמודה שלא התבקשה. מלכודת שנייה: במונגו ברירת המחדל של sort היא לא \"עולה\" אלא \"מה שתכתוב\" — 1 זה עולה ו-1- זה יורד, ואין ערך ברירת מחדל.",
   "compare": "כששולפים מאוסף אחד בלי צירוף, ההבדל בין הגישות הוא תחבירי בלבד — WHERE/ORDER BY מול find/.sort().",
   "slot": "S12",
   "card": {
    "code": "R-01",
    "page": 68,
    "title": "סינון ומיון"
   }
  },
  "B-02": {
   "id": "B-02",
   "schema": "exam2",
   "src": "bank",
   "pattern": "filter-sort",
   "title": "סינון ומיון",
   "q": "הציגו את מחזורי הקורס של סמסטר 2026A שהקיבולת שלהם 30 ומעלה — מזהה המחזור, מזהה הקורס והקיבולת. מיינו לפי הקיבולת בסדר יורד, ובתוך קיבולת זהה לפי מזהה המחזור בסדר עולה.",
   "keywords": "\"30 ומעלה\" ← >= ולא >. \"ובתוך קיבולת זהה\" ← מיון שני, שנכנס לתוקף רק בתיקו.",
   "cols": [
    "offeringId",
    "courseId",
    "capacity"
   ],
   "sql": "SELECT offeringId, courseId, capacity\nFROM CourseOfferings\nWHERE semester = '2026A' AND capacity >= 30\nORDER BY capacity DESC, offeringId ASC;",
   "mongo": "db.courseOfferings.find(\n  { semester: \"2026A\", capacity: { $gte: 30 } },\n  { _id: 0, offeringId: 1, courseId: 1, capacity: 1 }\n).sort({ capacity: -1, offeringId: 1 })",
   "logic": "שני תנאים ב-WHERE מחוברים ב-AND; במונגו שני שדות באותו אובייקט פילטר הם AND אוטומטי. המיון הראשון יורד על הקיבולת, והמיון השני עולה על מזהה המחזור כדי שהסדר יהיה חד-משמעי — בנתונים יש שלושה מחזורים עם קיבולת 30 בדיוק.",
   "trap": "כתיבת capacity > 30 במקום >= 30 מוציאה שלושה מחזורים. מלכודת שנייה: בלי המיון השני הסדר בין שלושת המחזורים בקיבולת 30 שרירותי, ושני המנועים עשויים להחזיר אותו אחרת.",
   "compare": "הפילטר במונגו מתורגם מילה במילה מה-WHERE, אבל כל השוואה שאינה שוויון דורשת אופרטור מפורש ($gte) ולא סימן.",
   "slot": "S12",
   "card": {
    "code": "R-01",
    "page": 68,
    "title": "סינון ומיון"
   }
  },
  "B-03": {
   "id": "B-03",
   "schema": "exam2",
   "src": "bank",
   "pattern": "join-2",
   "title": "צירוף שתי טבלאות",
   "q": "הציגו לכל סטודנט את שמו ואת שם המחלקה שלו. מיינו לפי שם המחלקה ואז לפי שם הסטודנט.",
   "keywords": "\"שם המחלקה\" ← הנתון לא יושב ב-Students אלא ב-Departments, ולכן נדרש צירוף של שתי טבלאות.",
   "cols": [
    "name",
    "departmentName"
   ],
   "sql": "SELECT s.name, d.departmentName\nFROM Students s\nJOIN Departments d ON d.departmentId = s.departmentId\nORDER BY d.departmentName ASC, s.name ASC;",
   "mongo": "db.students.aggregate([\n  { $lookup: { from: \"departments\", localField: \"departmentId\", foreignField: \"departmentId\", as: \"d\" } },\n  { $unwind: \"$d\" },\n  { $project: { _id: 0, name: 1, departmentName: \"$d.departmentName\" } },\n  { $sort: { departmentName: 1, name: 1 } }\n])",
   "logic": "מתחילים מהסטודנטים, כי הם ה\"רבים\" בקשר. ב-SQL JOUN יחיד על המפתח הזר מספיק. במונגו $lookup מביא את מסמכי המחלקה לתוך מערך בשם d, ולכן אחריו חייב לבוא $unwind כדי לפרוס את המערך בחזרה לשורה שטוחה — ורק אז אפשר להתייחס ל-$d.departmentName.",
   "trap": "שכחת $unwind — השדה departmentName יחזור כמערך של ערך אחד ולא כערך בודד, והשורות לא יתאימו לתוצאת ה-SQL. מלכודת שנייה: כיוון הצירוף — localField הוא השדה באוסף שממנו יוצאים (students) ו-foreignField הוא השדה באוסף שאליו מצטרפים.",
   "compare": "ב-SQL הצירוף הוא הצהרה אחת שהמנוע מתרגם לתוכנית ביצוע, ואילו במונגו הוא שני שלבים ידניים בצינור — $lookup ואחריו $unwind.",
   "slot": "S99",
   "book": {
    "page": 70,
    "where": "הדוגמה הפתורה בכרטיס R-05 — צירוף שתי טבלאות"
   }
  },
  "B-04": {
   "id": "B-04",
   "schema": "exam2",
   "src": "bank",
   "pattern": "join-2",
   "title": "צירוף שתי טבלאות",
   "q": "הציגו את מחזורי הקורס של סמסטר 2026A יחד עם שם המרצה — מזהה המחזור, מזהה הקורס ושם המרצה. מיינו לפי שם המרצה ואז לפי מזהה המחזור.",
   "keywords": "\"יחד עם שם המרצה\" ← צירוף ל-Lecturers. \"של סמסטר 2026A\" ← הסינון יושב על טבלת המחזורים, ולכן אפשר (ועדיף) לסנן לפני הצירוף.",
   "cols": [
    "offeringId",
    "courseId",
    "lecturerName"
   ],
   "sql": "SELECT o.offeringId, o.courseId, l.name AS lecturerName\nFROM CourseOfferings o\nJOIN Lecturers l ON l.lecturerId = o.lecturerId\nWHERE o.semester = '2026A'\nORDER BY l.name ASC, o.offeringId ASC;",
   "mongo": "db.courseOfferings.aggregate([\n  { $match: { semester: \"2026A\" } },\n  { $lookup: { from: \"lecturers\", localField: \"lecturerId\", foreignField: \"lecturerId\", as: \"l\" } },\n  { $unwind: \"$l\" },\n  { $project: { _id: 0, offeringId: 1, courseId: 1, lecturerName: \"$l.name\" } },\n  { $sort: { lecturerName: 1, offeringId: 1 } }\n])",
   "logic": "שמים את ה-$match בראש הצינור, לפני ה-$lookup — כך הצירוף רץ על שמונה מחזורים ולא על עשרה. ב-SQL מקום ה-WHERE בטקסט אינו משנה, כי המנוע עצמו מחליט מתי לסנן. ה-AS בשאילתה וה-\"$l.name\" במונגו עושים את אותו דבר: נותנים שם חדש לעמודה.",
   "trap": "מרצה אחד מלמד כמה מחזורים, ולכן שם המרצה חוזר כמה פעמים — זה נכון ולא דורש DISTINCT. מלכודת שנייה: בלי המיון השני, הסדר בין שלושת המחזורים של Efi Propos אינו מוגדר.",
   "compare": "במונגו הסדר בצינור הוא גם הסמנטיקה וגם הביצועים — $match לפני $lookup הוא אופטימיזציה שהמתכנת עושה בעצמו, בעוד ש-SQL עושה אותה עבורך.",
   "slot": "S99",
   "card": {
    "code": "R-05",
    "page": 70,
    "title": "צירוף שתי טבלאות"
   }
  },
  "B-05": {
   "id": "B-05",
   "schema": "exam2",
   "src": "bank",
   "pattern": "join-3plus",
   "title": "צירוף שלוש טבלאות ויותר",
   "q": "הציגו לכל הרשמה בסמסטר 2026A את שם הסטודנט, שם הקורס ושם המרצה. יש להציג כל הרשמה בשורה נפרדת. מיינו לפי שם הסטודנט, ואז שם הקורס, ואז שם המרצה.",
   "keywords": "\"שם הסטודנט, שם הקורס ושם המרצה\" ← שלושה שמות משלוש טבלאות שונות, ואליהן מגיעים דרך CourseOfferings. \"כל הרשמה בשורה נפרדת\" ← בלי DISTINCT ובלי קיבוץ.",
   "cols": [
    "studentName",
    "courseName",
    "lecturerName"
   ],
   "sql": "SELECT s.name AS studentName, c.courseName, l.name AS lecturerName\nFROM Enrollments e\nJOIN Students s        ON s.studentId  = e.studentId\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nJOIN Courses c         ON c.courseId   = o.courseId\nJOIN Lecturers l       ON l.lecturerId = o.lecturerId\nWHERE o.semester = '2026A'\nORDER BY s.name ASC, c.courseName ASC, l.name ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $match: { \"off.semester\": \"2026A\" } },\n  { $lookup: { from: \"students\", localField: \"studentId\", foreignField: \"studentId\", as: \"st\" } },\n  { $unwind: \"$st\" },\n  { $lookup: { from: \"courses\", localField: \"off.courseId\", foreignField: \"courseId\", as: \"crs\" } },\n  { $unwind: \"$crs\" },\n  { $lookup: { from: \"lecturers\", localField: \"off.lecturerId\", foreignField: \"lecturerId\", as: \"lec\" } },\n  { $unwind: \"$lec\" },\n  { $project: { _id: 0, studentName: \"$st.name\", courseName: \"$crs.courseName\", lecturerName: \"$lec.name\" } },\n  { $sort: { studentName: 1, courseName: 1, lecturerName: 1 } }\n])",
   "logic": "ההרשמות הן הטבלה המרכזית, וממנה מתפצלים לארבעה כיוונים. הסמסטר והמרצה יושבים על מחזור הקורס ולא על הקורס, ולכן ה-$lookup הראשון חייב להיות ל-courseOfferings — ורק אחריו אפשר לסנן את הסמסטר ולהמשיך דרך off.courseId ו-off.lecturerId.",
   "trap": "לחפש את lecturerId בטבלת Courses. המרצה משויך למחזור (CourseOfferings) ולא לקורס — אותו קורס יכול להתנהל אצל שני מרצים שונים באותו סמסטר. מלכודת שנייה: הוספת DISTINCT — S106 נרשם פעמיים לאותו מחזור, והשאלה דורשת במפורש את שתי השורות.",
   "compare": "צירוף של חמש טבלאות הוא בשאילתת SQL עוד ארבע שורות, ובמונגו צינור של שמונה שלבים — זה ההבדל המעשי בין מודל טבלאי שנבנה לצירופים ומודל מסמכים שלא.",
   "slot": "S99",
   "card": {
    "code": "R-06",
    "page": 71,
    "title": "צירוף שלוש טבלאות ויותר"
   }
  },
  "B-06": {
   "id": "B-06",
   "schema": "exam2",
   "src": "bank",
   "pattern": "join-3plus",
   "title": "צירוף שלוש טבלאות ויותר",
   "q": "הציגו את כל תוצאות הבחינות מסוג Final — שם הסטודנט, מזהה הבחינה, סוג הבחינה, שם הקורס והציון. מיינו לפי הציון בסדר יורד, ואז לפי שם הסטודנט, ואז לפי מזהה הבחינה.",
   "keywords": "\"מסוג Final\" ← הסינון יושב ב-Exams. \"שם הקורס\" ← מ-Exams דרך CourseOfferings ל-Courses. \"שם הסטודנט\" ← צירוף נוסף ל-Students.",
   "cols": [
    "studentName",
    "examId",
    "examType",
    "courseName",
    "score"
   ],
   "sql": "SELECT s.name AS studentName, x.examId, x.examType, c.courseName, r.score\nFROM ExamResults r\nJOIN Exams x           ON x.examId     = r.examId\nJOIN Students s        ON s.studentId  = r.studentId\nJOIN CourseOfferings o ON o.offeringId = x.offeringId\nJOIN Courses c         ON c.courseId   = o.courseId\nWHERE x.examType = 'Final'\nORDER BY r.score DESC, s.name ASC, x.examId ASC;",
   "mongo": "db.examResults.aggregate([\n  { $lookup: { from: \"exams\", localField: \"examId\", foreignField: \"examId\", as: \"ex\" } },\n  { $unwind: \"$ex\" },\n  { $match: { \"ex.examType\": \"Final\" } },\n  { $lookup: { from: \"students\", localField: \"studentId\", foreignField: \"studentId\", as: \"st\" } },\n  { $unwind: \"$st\" },\n  { $lookup: { from: \"courseOfferings\", localField: \"ex.offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $lookup: { from: \"courses\", localField: \"off.courseId\", foreignField: \"courseId\", as: \"crs\" } },\n  { $unwind: \"$crs\" },\n  { $project: { _id: 0, studentName: \"$st.name\", examId: 1, examType: \"$ex.examType\", courseName: \"$crs.courseName\", score: 1 } },\n  { $sort: { score: -1, studentName: 1, examId: 1 } }\n])",
   "logic": "שרשרת של ארבעה צירופים: תוצאה → בחינה → מחזור → קורס, ובמקביל תוצאה → סטודנט. שם הקורס אינו שמור בבחינה, ולכן אין דרך קצרה — חייבים לעבור דרך מחזור הקורס. את סוג הבחינה מסננים מיד אחרי הצירוף הראשון, כדי לצמצם את העבודה בהמשך.",
   "trap": "שלושה מיונים נדרשים כאן ולא אחד: יש זוגות של תוצאות עם אותו ציון בדיוק (למשל 85, 72, 68), והסדר ביניהן נקבע לפי שם הסטודנט. מלכודת שנייה: examType מופיע בפלט אף שהוא גם תנאי הסינון — זה לא כפילות אלא דרישת השאלה.",
   "compare": "ככל שמספר הישויות בשאלה גדל, פער האורך בין שתי הגישות גדל פי כמה — וזה בדיוק המקום שבו מודל טבלאי מנצח, כל עוד הנתונים אינם מוטמעים יחד.",
   "slot": "S15",
   "card": {
    "code": "R-06",
    "page": 71,
    "title": "צירוף שלוש טבלאות ויותר"
   }
  },
  "B-07": {
   "id": "B-07",
   "schema": "exam2",
   "src": "bank",
   "pattern": "distinct",
   "title": "ללא כפילויות",
   "q": "הציגו את מזהי הסטודנטים שיש להם לפחות הרשמה אחת — כל מזהה פעם אחת בלבד. מיינו בסדר עולה.",
   "keywords": "\"כל מזהה פעם אחת בלבד\" ← DISTINCT ב-SQL, $group במונגו. \"לפחות הרשמה אחת\" ← אין צורך בצירוף, ההרשמות עצמן מכילות את המזהה.",
   "cols": [
    "studentId"
   ],
   "sql": "SELECT DISTINCT studentId\nFROM Enrollments\nORDER BY studentId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $group: { _id: \"$studentId\" } },\n  { $project: { _id: 0, studentId: \"$_id\" } },\n  { $sort: { studentId: 1 } }\n])",
   "logic": "בטבלת ההרשמות יש 35 שורות אבל רק 12 סטודנטים שונים. ב-SQL מילה אחת פותרת את זה. במונגו אין DISTINCT בצינור — מקבצים לפי השדה, מה שמשאיר מסמך אחד לכל ערך ייחודי, ואז $project מחזיר את ה-_id לשם השדה המקורי.",
   "trap": "שכחת DISTINCT מחזירה 35 שורות במקום 12. מלכודת שנייה: במונגו לשכוח את ה-$project ולהשאיר את השדה בשם _id — התוצאה נכונה לוגית אבל שם העמודה שונה.",
   "compare": "DISTINCT ב-SQL הוא מילת מפתח, ובמונגו הוא תוצאה של קיבוץ — כלומר אותה פעולה לוגית, פעם כהצהרה ופעם כשלב בצינור.",
   "slot": "S18",
   "card": {
    "code": "R-08",
    "page": 73,
    "title": "ללא כפילויות"
   }
  },
  "B-08": {
   "id": "B-08",
   "schema": "exam2",
   "src": "bank",
   "pattern": "distinct",
   "title": "ללא כפילויות",
   "q": "הציגו את שמות הקורסים שיש להם לפחות מחזור אחד — כל שם פעם אחת בלבד, גם אם הקורס מוצע בכמה מחזורים. מיינו לפי שם הקורס.",
   "keywords": "\"גם אם הקורס מוצע בכמה מחזורים\" ← אזהרה מפורשת מפני כפילויות ← DISTINCT. \"שיש להם לפחות מחזור אחד\" ← JOIN רגיל ולא LEFT JOIN.",
   "cols": [
    "courseName"
   ],
   "sql": "SELECT DISTINCT c.courseName\nFROM Courses c\nJOIN CourseOfferings o ON o.courseId = c.courseId\nORDER BY c.courseName ASC;",
   "mongo": "db.courseOfferings.aggregate([\n  { $lookup: { from: \"courses\", localField: \"courseId\", foreignField: \"courseId\", as: \"c\" } },\n  { $unwind: \"$c\" },\n  { $group: { _id: \"$c.courseName\" } },\n  { $project: { _id: 0, courseName: \"$_id\" } },\n  { $sort: { courseName: 1 } }\n])",
   "logic": "הצירוף מכפיל את הקורס פעם לכל מחזור שלו — הקורס C20 מוצע בשלושה מחזורים ולכן היה מופיע שלוש פעמים. DISTINCT ב-SQL ו-$group במונגו מצמצמים חזרה לשם אחד. במונגו נוח להתחיל דווקא מהמחזורים, כי הם ה\"רבים\" בקשר.",
   "trap": "הסרת DISTINCT מחזירה 10 שורות במקום 8, כי C20 מוצע שלוש פעמים ו-C80 פעם אחת. מלכודת שנייה: שימוש ב-LEFT JOIN כאן שגוי — הוא היה מכניס גם קורסים בלי שום מחזור, והשאלה ביקשה \"שיש להם לפחות מחזור אחד\".",
   "compare": "הכפילות נוצרת בשתי הגישות מאותה סיבה — פריסה של קשר אחד-לרבים — ולכן גם הפתרון הוא אותו פתרון לוגי בשני תחבירים.",
   "slot": "S99",
   "card": {
    "code": "R-08",
    "page": 73,
    "title": "ללא כפילויות"
   }
  },
  "B-09": {
   "id": "B-09",
   "schema": "exam2",
   "src": "bank",
   "pattern": "group-count",
   "title": "קיבוץ וספירה",
   "q": "לכל מחלקה — מזהה המחלקה ומספר הסטודנטים הרשומים בה. מיינו לפי מספר הסטודנטים בסדר יורד, ובתיקו לפי מזהה המחלקה בסדר עולה.",
   "keywords": "\"לכל מחלקה\" ← GROUP BY / $group. \"מספר הסטודנטים\" ← COUNT / $sum: 1.",
   "cols": [
    "departmentId",
    "studentCount"
   ],
   "sql": "SELECT departmentId, COUNT(*) AS studentCount\nFROM Students\nGROUP BY departmentId\nORDER BY studentCount DESC, departmentId ASC;",
   "mongo": "db.students.aggregate([\n  { $group: { _id: \"$departmentId\", studentCount: { $sum: 1 } } },\n  { $project: { _id: 0, departmentId: \"$_id\", studentCount: 1 } },\n  { $sort: { studentCount: -1, departmentId: 1 } }\n])",
   "logic": "מזהה המחלקה שמור כבר בטבלת הסטודנטים, ולכן אין צורך בצירוף. ב-SQL COUNT(*) סופר שורות בקבוצה; במונגו המקבילה היא $sum: 1 — מוסיפים 1 לכל מסמך בקבוצה. הקיבוץ במונגו נעשה תמיד לתוך השדה _id, ולכן בסוף צריך $project כדי להחזיר לו את שמו האמיתי.",
   "trap": "מיון בלי מפתח שני: D20 ו-D30 שניהם עם 3 סטודנטים, והסדר ביניהם יהיה שרירותי. מלכודת שנייה: במונגו לכתוב $count במקום $sum: 1 בתוך $group — $count הוא שלב נפרד בצינור ולא אופרטור של קיבוץ.",
   "compare": "הקיבוץ עצמו מתורגם אחד לאחד, אבל במונגו המפתח תמיד נקרא _id, ולכן תמיד נדרש שלב נוסף כדי לקבל שמות עמודות כמו ב-SQL.",
   "slot": "S14",
   "book": {
    "page": 75,
    "where": "הדוגמה הפתורה בכרטיס R-11 — קיבוץ וספירה"
   }
  },
  "B-10": {
   "id": "B-10",
   "schema": "exam2",
   "src": "bank",
   "pattern": "group-count",
   "title": "קיבוץ וספירה",
   "q": "לכל מחזור קורס בסמסטר 2026A שיש אליו לפחות הרשמה אחת — מזהה המחזור ומספר ההרשמות אליו. מיינו לפי מספר ההרשמות יורד, ובתיקו לפי מזהה המחזור עולה.",
   "keywords": "\"שיש אליו לפחות הרשמה אחת\" ← JOIN רגיל (לא LEFT JOIN, ולכן אין צורך להציג אפסים). \"בסמסטר 2026A\" ← הסמסטר יושב על טבלת המחזורים ולכן נדרש צירוף.",
   "cols": [
    "offeringId",
    "enrollCount"
   ],
   "sql": "SELECT e.offeringId, COUNT(*) AS enrollCount\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nWHERE o.semester = '2026A'\nGROUP BY e.offeringId\nORDER BY enrollCount DESC, e.offeringId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $match: { \"off.semester\": \"2026A\" } },\n  { $group: { _id: \"$offeringId\", enrollCount: { $sum: 1 } } },\n  { $project: { _id: 0, offeringId: \"$_id\", enrollCount: 1 } },\n  { $sort: { enrollCount: -1, offeringId: 1 } }\n])",
   "logic": "מתחילים מההרשמות כי הן מה שסופרים, מצרפים את המחזור רק כדי להגיע לשדה הסמסטר, ואז מקבצים. הסינון קורה לפני הקיבוץ — WHERE ב-SQL ו-$match לפני ה-$group במונגו — כי הוא על שורה בודדת ולא על תוצאת חישוב.",
   "trap": "ארבעה מחזורים (O501, O505, O506, O507) עם 4 הרשמות כל אחד — בלי המיון השני הסדר ביניהם שרירותי. מלכודת שנייה: קיבוץ לפי off.offeringId במקום offeringId עובד גם כן, אבל אם תקבץ לפי courseId תקבל תשובה אחרת לגמרי (קורס מול מחזור).",
   "compare": "ב-SQL הסינון והקיבוץ מוצהרים בשתי פסוקיות והמנוע מסדר ביניהם, ואילו במונגו הסדר שבו תכתוב את $match ואת $group הוא הסדר שירוץ בפועל.",
   "slot": "S14",
   "card": {
    "code": "R-11",
    "page": 75,
    "title": "קיבוץ וספירה"
   }
  },
  "B-11": {
   "id": "B-11",
   "schema": "exam2",
   "src": "bank",
   "pattern": "group-avg",
   "title": "קיבוץ וממוצע",
   "q": "לכל קורס בסמסטר 2026A — מזהה הקורס, שם הקורס וממוצע הציונים בו. יש להתחשב רק בהרשמות שבהן קיים ציון. מיינו לפי הממוצע יורד, ובתיקו לפי מזהה הקורס.",
   "keywords": "\"ממוצע הציונים\" ← AVG / $avg. \"רק בהרשמות שבהן קיים ציון\" ← grade IS NOT NULL, סינון לפני הקיבוץ. \"לכל קורס\" (ולא \"לכל מחזור\") ← מקבצים לפי courseId.",
   "cols": [
    "courseId",
    "courseName",
    "avgGrade"
   ],
   "sql": "SELECT c.courseId, c.courseName, AVG(e.grade) AS avgGrade\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nJOIN Courses c         ON c.courseId   = o.courseId\nWHERE o.semester = '2026A' AND e.grade IS NOT NULL\nGROUP BY c.courseId, c.courseName\nORDER BY avgGrade DESC, c.courseId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $match: { \"off.semester\": \"2026A\", grade: { $ne: null } } },\n  { $group: { _id: \"$off.courseId\", avgGrade: { $avg: \"$grade\" } } },\n  { $lookup: { from: \"courses\", localField: \"_id\", foreignField: \"courseId\", as: \"c\" } },\n  { $unwind: \"$c\" },\n  { $project: { _id: 0, courseId: \"$_id\", courseName: \"$c.courseName\", avgGrade: 1 } },\n  { $sort: { avgGrade: -1, courseId: 1 } }\n])",
   "logic": "הקיבוץ הוא לפי קורס, ולכן שני מחזורים של אותו קורס מתמזגים לממוצע אחד — C20 למשל מאחד את O501 ו-O502. במונגו מקבצים לפי off.courseId ואת שם הקורס מביאים ב-$lookup אחרי הקיבוץ, כך שהצירוף רץ על 7 קבוצות ולא על 30 הרשמות.",
   "trap": "קיבוץ לפי offeringId במקום courseId מחזיר 8 שורות במקום 7 ומפצל את C20 לשני ממוצעים. מלכודת שנייה: חישוב SUM(grade)/COUNT(*) במקום AVG — המונה מדלג על NULL והמכנה סופר אותו, והממוצע יוצא נמוך מדי.",
   "compare": "AVG ו-$avg מתעלמים שניהם מ-NULL, ולכן כאן הסמנטיקה זהה — ההבדל הוא רק שבמונגו הצירוף שמביא את שם הקורס הוא החלטה של המתכנת מתי לבצע.",
   "slot": "S14",
   "card": {
    "code": "R-12",
    "page": 76,
    "title": "קיבוץ וממוצע"
   }
  },
  "B-12": {
   "id": "B-12",
   "schema": "exam2",
   "src": "bank",
   "pattern": "group-avg",
   "title": "קיבוץ וממוצע",
   "q": "לכל בחינה — מזהה הבחינה, מספר הנבחנים בה וממוצע הציונים בה. מיינו לפי מזהה הבחינה בסדר עולה.",
   "keywords": "\"לכל בחינה\" ← GROUP BY examId. \"מספר הנבחנים\" + \"ממוצע הציונים\" ← שני חישובים באותו קיבוץ.",
   "cols": [
    "examId",
    "examineesCount",
    "avgScore"
   ],
   "sql": "SELECT examId, COUNT(*) AS examineesCount, AVG(score) AS avgScore\nFROM ExamResults\nGROUP BY examId\nORDER BY examId ASC;",
   "mongo": "db.examResults.aggregate([\n  { $group: { _id: \"$examId\", examineesCount: { $sum: 1 }, avgScore: { $avg: \"$score\" } } },\n  { $project: { _id: 0, examId: \"$_id\", examineesCount: 1, avgScore: 1 } },\n  { $sort: { examId: 1 } }\n])",
   "logic": "אין כאן שום צירוף — מזהה הבחינה שמור בתוך טבלת התוצאות, ולכן הכול נעשה בקיבוץ אחד. שני חישובים יכולים לשבת באותו $group בלי מחיר נוסף, בדיוק כמו שני אגרגטים אחרי אותו SELECT.",
   "trap": "צירוף מיותר לטבלת Exams. הוא לא מזיק כאן, אבל הוא מבזבז זמן במבחן — וכשהבחינה נשאלת על \"כל הבחינות\" הוא גם מסתיר בחינה שאין לה אף תוצאה. מלכודת שנייה: AVG על עמודה שלמה בעולם ה-SQL Server עשוי להחזיר מספר שלם; כאן score הוא DECIMAL ולכן הממוצע שבור.",
   "compare": "כששני המנועים עובדים על אוסף יחיד, $group הוא בדיוק GROUP BY — וההבדל היחיד שנשאר הוא שם המפתח (_id).",
   "slot": "S14",
   "card": {
    "code": "R-12",
    "page": 76,
    "title": "קיבוץ וממוצע"
   }
  },
  "B-13": {
   "id": "B-13",
   "schema": "exam2",
   "src": "bank",
   "pattern": "having",
   "title": "תנאי על תוצאת קיבוץ",
   "q": "הציגו רק את המחלקות שיש בהן יותר משני סטודנטים — מזהה המחלקה, שם המחלקה ומספר הסטודנטים. מיינו לפי מספר הסטודנטים יורד, ובתיקו לפי מזהה המחלקה.",
   "keywords": "\"הציגו רק את המחלקות שיש בהן יותר מ-\" ← HAVING, כי התנאי הוא על תוצאת הספירה ולא על שורה בודדת. \"יותר מ-2\" ← > 2 ולא >= 2.",
   "cols": [
    "departmentId",
    "departmentName",
    "studentCount"
   ],
   "sql": "SELECT d.departmentId, d.departmentName, COUNT(s.studentId) AS studentCount\nFROM Departments d\nJOIN Students s ON s.departmentId = d.departmentId\nGROUP BY d.departmentId, d.departmentName\nHAVING COUNT(s.studentId) > 2\nORDER BY studentCount DESC, d.departmentId ASC;",
   "mongo": "db.students.aggregate([\n  { $group: { _id: \"$departmentId\", studentCount: { $sum: 1 } } },\n  { $match: { studentCount: { $gt: 2 } } },\n  { $lookup: { from: \"departments\", localField: \"_id\", foreignField: \"departmentId\", as: \"d\" } },\n  { $unwind: \"$d\" },\n  { $project: { _id: 0, departmentId: \"$_id\", departmentName: \"$d.departmentName\", studentCount: 1 } },\n  { $sort: { studentCount: -1, departmentId: 1 } }\n])",
   "logic": "התנאי \"יותר משני סטודנטים\" מתייחס לקבוצה שלמה, ולכן אי אפשר לבדוק אותו ב-WHERE — הוא קיים רק אחרי הקיבוץ. ב-SQL זו המילה HAVING; במונגו זה אותו $match בדיוק, אבל ממוקם אחרי ה-$group. את שם המחלקה מביאים אחרי הסינון, כך שהצירוף רץ על שלוש קבוצות בלבד.",
   "trap": "כתיבת התנאי ב-WHERE במקום ב-HAVING — ב-SQL זו שגיאת מנוע, ובמונגו זה גרוע יותר: $match לפני ה-$group ירוץ בשקט ויחזיר תשובה שגויה. מלכודת שנייה: ONO עם שני סטודנטים בדיוק לא אמורה להופיע, ולכן >= 2 מחזיר 4 שורות במקום 3.",
   "compare": "ההבדל בין WHERE ל-HAVING הוא שתי מילות מפתח ב-SQL, ובמונגו הוא אותו שלב במקום אחר בצינור — כלומר במונגו המיקום הוא המשמעות.",
   "slot": "S14",
   "book": {
    "page": 77,
    "where": "הדוגמה הפתורה בכרטיס R-13 — תנאי על תוצאת קיבוץ"
   }
  },
  "B-14": {
   "id": "B-14",
   "schema": "exam2",
   "src": "bank",
   "pattern": "having",
   "title": "תנאי על תוצאת קיבוץ",
   "q": "התחשבו רק בהרשמות שבהן קיים ציון. הציגו את הסטודנטים שיש להם שלושה ציונים או יותר וממוצע ציונים נמוך מ-90 — מזהה, שם, מספר הציונים והממוצע. מיינו לפי הממוצע בסדר עולה, ובתיקו לפי המזהה.",
   "keywords": "\"שלושה ציונים או יותר\" ← >= 3. \"וממוצע נמוך מ-90\" ← שני תנאי HAVING מחוברים ב-AND. \"התחשבו רק בהרשמות שבהן קיים ציון\" ← סינון לפני הקיבוץ.",
   "cols": [
    "studentId",
    "studentName",
    "gradedCount",
    "avgGrade"
   ],
   "sql": "SELECT e.studentId, s.name AS studentName, COUNT(e.grade) AS gradedCount, AVG(e.grade) AS avgGrade\nFROM Enrollments e\nJOIN Students s ON s.studentId = e.studentId\nWHERE e.grade IS NOT NULL\nGROUP BY e.studentId, s.name\nHAVING COUNT(e.grade) >= 3 AND AVG(e.grade) < 90\nORDER BY avgGrade ASC, e.studentId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $match: { grade: { $ne: null } } },\n  { $group: { _id: \"$studentId\", gradedCount: { $sum: 1 }, avgGrade: { $avg: \"$grade\" } } },\n  { $match: { gradedCount: { $gte: 3 }, avgGrade: { $lt: 90 } } },\n  { $lookup: { from: \"students\", localField: \"_id\", foreignField: \"studentId\", as: \"st\" } },\n  { $unwind: \"$st\" },\n  { $project: { _id: 0, studentId: \"$_id\", studentName: \"$st.name\", gradedCount: 1, avgGrade: 1 } },\n  { $sort: { avgGrade: 1, studentId: 1 } }\n])",
   "logic": "שלושה שלבים בסדר קבוע: קודם זורקים הרשמות בלי ציון, אחר כך מקבצים ומחשבים, ורק בסוף מסננים את הקבוצות. במונגו שני ה-$match הם אותו אופרטור בשני מקומות שונים — הראשון על מסמך בודד והשני על תוצאת החישוב.",
   "trap": "S100 עם ממוצע 91.67 נופל על התנאי השני, ו-S113 (שכל הציונים שלו NULL) נעלם כבר בשלב הראשון. מלכודת שנייה: COUNT(*) במקום COUNT(grade) — כאן זה יוצא אותו דבר רק מפני שסיננו NULL מראש; בלי הסינון התוצאות שונות.",
   "compare": "שתי הגישות דורשות להבין מתי מסננים — לפני או אחרי החישוב — אבל רק במונגו הטעות הזו עוברת בשקט בלי הודעת שגיאה.",
   "slot": "S19",
   "card": {
    "code": "R-13",
    "page": 77,
    "title": "תנאי על תוצאת קיבוץ"
   }
  },
  "B-15": {
   "id": "B-15",
   "schema": "exam2",
   "src": "bank",
   "pattern": "left-join-zero",
   "title": "LEFT JOIN עם אפסים",
   "q": "לכל מרצה — מזהה המרצה, שמו ומספר מחזורי הקורס שהוא מלמד בסמסטר 2025B. יש לכלול גם מרצים שאינם מלמדים אף מחזור בסמסטר הזה ולהציג עבורם 0. מיינו לפי המספר יורד, ובתיקו לפי מזהה המרצה.",
   "keywords": "\"יש לכלול גם מרצים שאינם מלמדים … ולהציג עבורם 0\" ← זו ההגדרה המילולית של LEFT JOIN. סינון הסמסטר חייב לשבת בתנאי ה-ON ולא ב-WHERE.",
   "cols": [
    "lecturerId",
    "name",
    "offeringCount"
   ],
   "sql": "SELECT l.lecturerId, l.name, COUNT(o.offeringId) AS offeringCount\nFROM Lecturers l\nLEFT JOIN CourseOfferings o ON o.lecturerId = l.lecturerId AND o.semester = '2025B'\nGROUP BY l.lecturerId, l.name\nORDER BY offeringCount DESC, l.lecturerId ASC;",
   "mongo": "db.lecturers.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"lecturerId\", foreignField: \"lecturerId\", as: \"offs\" } },\n  { $addFields: { offs25: { $filter: { input: \"$offs\", as: \"o\", cond: { $eq: [\"$$o.semester\", \"2025B\"] } } } } },\n  { $project: { _id: 0, lecturerId: 1, name: 1, offeringCount: { $size: \"$offs25\" } } },\n  { $sort: { offeringCount: -1, lecturerId: 1 } }\n])",
   "logic": "מתחילים מטבלת האב (Lecturers) כדי שכל מרצה יופיע בוודאות, ומצרפים אליה את המחזורים. COUNT(o.offeringId) סופר רק התאמות אמיתיות ולכן מחזיר 0 כשאין אף אחת. במונגו $lookup תמיד מחזיר מערך — גם ריק — ולכן מסננים אותו עם $filter ואז $size נותן את הספירה, כולל 0.",
   "trap": "שימת o.semester = '2025B' ב-WHERE הופכת את ה-LEFT JOIN ל-JOIN רגיל, וזורקת את שלושת המרצים ללא מחזור ב-2025B — התוצאה תהיה 2 שורות במקום 5. מלכודת שנייה: COUNT(*) במקום COUNT(o.offeringId) סופר את שורת ה-NULL ומחזיר 1 במקום 0.",
   "compare": "ב-SQL ההכללה של השורות הריקות היא מילת מפתח (LEFT), ובמונגו היא התנהגות ברירת המחדל של $lookup — ולכן דווקא במונגו קל יותר לקבל אפסים וקשה יותר להיפטר מהם.",
   "slot": "S16",
   "card": {
    "code": "R-19",
    "page": 84,
    "title": "LEFT JOIN עם אפסים"
   }
  },
  "B-16": {
   "id": "B-16",
   "schema": "exam2",
   "src": "bank",
   "pattern": "left-join-zero",
   "title": "LEFT JOIN עם אפסים",
   "q": "לכל סטודנט — מזהה, שם ומספר תוצאות הבחינה שרשומות עליו. יש לכלול גם סטודנטים שאין להם אף תוצאת בחינה ולהציג עבורם 0. מיינו לפי המספר יורד, ובתיקו לפי המזהה.",
   "keywords": "\"יש לכלול גם סטודנטים שאין להם אף תוצאה\" ← LEFT JOIN, ואין כאן תנאי סמסטר ולכן אין את מלכודת ה-ON.",
   "cols": [
    "studentId",
    "name",
    "resultCount"
   ],
   "sql": "SELECT s.studentId, s.name, COUNT(r.resultId) AS resultCount\nFROM Students s\nLEFT JOIN ExamResults r ON r.studentId = s.studentId\nGROUP BY s.studentId, s.name\nORDER BY resultCount DESC, s.studentId ASC;",
   "mongo": "db.students.aggregate([\n  { $lookup: { from: \"examResults\", localField: \"studentId\", foreignField: \"studentId\", as: \"res\" } },\n  { $project: { _id: 0, studentId: 1, name: 1, resultCount: { $size: \"$res\" } } },\n  { $sort: { resultCount: -1, studentId: 1 } }\n])",
   "logic": "כאן אין תנאי נוסף על הצירוף, ולכן ה-LEFT JOIN פשוט ו-$lookup לא דורש $filter — $size על המערך שהצירוף החזיר נותן ישירות את הספירה. 14 סטודנטים נכנסים לתשובה, שניים מהם עם 0.",
   "trap": "שימוש ב-JOIN רגיל מוריד את התשובה ל-12 שורות ומעלים את S111 ו-S112. מלכודת שנייה: במונגו לכתוב { $size: \"$res\" } בתוך $match במקום ב-$project — ב-$match האופרטור $size מתנהג אחרת (בודק אורך מדויק) ואינו מחשב ערך.",
   "compare": "השאלה \"לכל X, גם אם אין לו Y\" היא בדיוק המקום שבו $lookup נוח מ-LEFT JOIN — הוא מחזיר מערך ריק מעצמו, בלי מילת מפתח ובלי מלכודת ON מול WHERE.",
   "slot": "S16",
   "card": {
    "code": "R-19",
    "page": 84,
    "title": "LEFT JOIN עם אפסים"
   }
  },
  "B-17": {
   "id": "B-17",
   "schema": "exam2",
   "src": "bank",
   "pattern": "anti-join",
   "title": "אנטי-צירוף",
   "q": "הציגו את הקורסים שלא הוצעו באף מחזור בסמסטר 2026A — מזהה הקורס ושמו. מיינו לפי מזהה הקורס.",
   "keywords": "\"שלא הוצעו באף מחזור ב-\" ← אנטי-צירוף: LEFT JOIN ואחריו בדיקת IS NULL, או NOT IN. הסינון של הסמסטר חייב לשבת ב-ON.",
   "cols": [
    "courseId",
    "courseName"
   ],
   "sql": "SELECT c.courseId, c.courseName\nFROM Courses c\nLEFT JOIN CourseOfferings o ON o.courseId = c.courseId AND o.semester = '2026A'\nWHERE o.offeringId IS NULL\nORDER BY c.courseId ASC;",
   "mongo": "db.courses.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"courseId\", foreignField: \"courseId\", as: \"offs\" } },\n  { $addFields: { offs26: { $filter: { input: \"$offs\", as: \"o\", cond: { $eq: [\"$$o.semester\", \"2026A\"] } } } } },\n  { $match: { offs26: { $size: 0 } } },\n  { $project: { _id: 0, courseId: 1, courseName: 1 }  },\n  { $sort: { courseId: 1 } }\n])",
   "logic": "אנטי-צירוף הוא LEFT JOIN שממנו משאירים דווקא את השורות שלא מצאו התאמה. ב-SQL מזהים אותן לפי עמודה מהטבלה הימנית שיצאה NULL. במונגו אין \"לא מצא\" — יש מערך ריק, ולכן התנאי הוא $size: 0.",
   "trap": "בדיקת IS NULL על עמודה שיכולה להיות NULL גם בשורה אמיתית. חייבים לבדוק עמודה שאינה מאפשרת NULL, כמו o.offeringId שהוא מפתח ראשי. מלכודת שנייה: העברת תנאי הסמסטר ל-WHERE — אז כל הקורסים שיש להם מחזור ב-2025B ייחשבו בטעות כ\"לא הוצעו\".",
   "compare": "SQL מבטא \"אין התאמה\" דרך NULL שנוצר בצירוף, ומונגו מבטא זאת דרך מערך באורך 0 — אותה לוגיקה, אבל במונגו היא מפורשת ולכן קשה יותר לטעות בה.",
   "slot": "S13",
   "card": {
    "code": "R-21",
    "page": 86,
    "title": "אנטי-צירוף — מי שאין לו כלום"
   }
  },
  "B-18": {
   "id": "B-18",
   "schema": "exam2",
   "src": "bank",
   "pattern": "anti-join",
   "title": "אנטי-צירוף",
   "q": "הציגו את הסטודנטים שלא נבחנו באף בחינה — מזהה ושם. מיינו לפי המזהה.",
   "keywords": "\"שלא נבחנו באף בחינה\" ← אנטי-צירוף מול ExamResults, בלי שום תנאי נוסף.",
   "cols": [
    "studentId",
    "name"
   ],
   "sql": "SELECT s.studentId, s.name\nFROM Students s\nLEFT JOIN ExamResults r ON r.studentId = s.studentId\nWHERE r.resultId IS NULL\nORDER BY s.studentId ASC;",
   "mongo": "db.students.aggregate([\n  { $lookup: { from: \"examResults\", localField: \"studentId\", foreignField: \"studentId\", as: \"res\" } },\n  { $match: { res: { $size: 0 } } },\n  { $project: { _id: 0, studentId: 1, name: 1 } },\n  { $sort: { studentId: 1 } }\n])",
   "logic": "השאלה היא על היעדר רשומה, ולכן מתחילים מהסטודנטים ולא מהתוצאות. ב-SQL אפשר גם NOT IN (SELECT studentId FROM ExamResults) או NOT EXISTS, ושלושתם נותנים את אותן שתי שורות. במונגו $lookup + $size: 0 הוא הדפוס הישיר.",
   "trap": "NOT IN מול תת-שאילתה שמחזירה NULL מחזיר תוצאה ריקה בכל SQL Server — כאן studentId הוא מפתח זר שאינו NULL ולכן זה בטוח, אבל זו מלכודת מפורסמת. מלכודת שנייה: לנסות לפתור את זה עם COUNT = 0 בלי LEFT JOIN — JOIN רגיל פשוט לא יחזיר את השורות האלה בכלל.",
   "compare": "שתי הגישות עונות על אותה שאלה, אבל ב-SQL יש לה שלושה ניסוחים חלופיים (LEFT JOIN / NOT IN / NOT EXISTS) ובמונגו בעצם אחד.",
   "slot": "S13",
   "card": {
    "code": "R-21",
    "page": 86,
    "title": "אנטי-צירוף — מי שאין לו כלום"
   }
  },
  "B-19": {
   "id": "B-19",
   "schema": "exam2",
   "src": "bank",
   "pattern": "top-n",
   "title": "TOP / דפדוף",
   "q": "הציגו את שלוש ההרשמות עם הציון הגבוה ביותר — מזהה ההרשמה, מזהה הסטודנט והציון. התחשבו רק בהרשמות שיש בהן ציון. מיינו לפי הציון יורד, ובתיקו לפי מזהה ההרשמה עולה.",
   "keywords": "\"שלוש … עם הגבוה ביותר\" ← TOP 3 ב-T-SQL (LIMIT 3 ב-SQLite), ו-.limit(3) במונגו. חייב מיון — אחרת \"הגבוה ביותר\" חסר משמעות.",
   "cols": [
    "enrollmentId",
    "studentId",
    "grade"
   ],
   "sql": "SELECT TOP 3 enrollmentId, studentId, grade\nFROM Enrollments\nWHERE grade IS NOT NULL\nORDER BY grade DESC, enrollmentId ASC;",
   "mongo": "db.enrollments.find(\n  { grade: { $ne: null } },\n  { _id: 0, enrollmentId: 1, studentId: 1, grade: 1 }\n).sort({ grade: -1, enrollmentId: 1 }).limit(3)",
   "logic": "TOP חותך את התוצאה אחרי המיון, ולכן בלי ORDER BY הוא מחזיר שלוש שורות שרירותיות. במונגו הסדר של הפעולות בשרשרת אינו משנה — המנוע תמיד ממיין לפני ש-limit חותך — אבל כדאי לכתוב sort לפני limit כדי שהקוד יקרא כמו הכוונה.",
   "trap": "שני ציונים של 95 (E1003 ו-E1031) נמצאים על הגבול, ובלי המיון השני אי אפשר לדעת מי מהם נכנס לשלישייה. מלכודת שנייה: הרשמות עם grade = NULL — בלי הסינון הן אינן נכנסות למיון יורד ב-SQL אבל כן משתתפות בו במונגו, ושתי הגישות יחזירו תשובות שונות.",
   "compare": "TOP ב-T-SQL הוא תוספת ל-SELECT, ובמונגו limit הוא שלב בשרשרת — ובשני המנועים הוא חסר משמעות בלי מיון מלא וחד-משמעי.",
   "slot": "S12",
   "book": {
    "page": 91,
    "where": "הדוגמה הפתורה בכרטיס R-27 — TOP / דפדוף"
   }
  },
  "B-20": {
   "id": "B-20",
   "schema": "exam2",
   "src": "bank",
   "pattern": "top-n",
   "title": "TOP / דפדוף",
   "q": "סדרו את הקורסים לפי נקודות הזכות בסדר יורד, ובתיקו לפי מזהה הקורס עולה. דלגו על שני הקורסים הראשונים והציגו את שלושת הקורסים שאחריהם — מזהה, שם ונקודות זכות.",
   "keywords": "\"דלגו על … והציגו את … שאחריהם\" ← דפדוף: OFFSET 2 ROWS FETCH NEXT 3 ROWS ONLY ב-T-SQL, .skip(2).limit(3) במונגו.",
   "cols": [
    "courseId",
    "courseName",
    "credits"
   ],
   "sql": "SELECT courseId, courseName, credits\nFROM Courses\nORDER BY credits DESC, courseId ASC\nOFFSET 2 ROWS FETCH NEXT 3 ROWS ONLY;",
   "mongo": "db.courses.find(\n  {},\n  { _id: 0, courseId: 1, courseName: 1, credits: 1 }\n).sort({ credits: -1, courseId: 1 }).skip(2).limit(3)",
   "logic": "זהו הדפוס שמממש \"עמוד שני בטבלה\". ב-T-SQL פסוקית ה-OFFSET/FETCH חייבת לבוא מיד אחרי ORDER BY ואינה יכולה להופיע בלעדיו. במונגו skip מדלג ו-limit חותך, ושניהם פועלים על התוצאה אחרי המיון.",
   "trap": "בלי מיון חד-משמעי הדפדוף חסר ערך: שלושה קורסים עם 4 נקודות זכות ושניים עם 3, ולכן בלי המיון השני על courseId \"העמוד השני\" משתנה בכל הרצה. מלכודת שנייה: לכתוב FETCH NEXT 3 בלי OFFSET — זה שגיאת תחביר ב-SQL Server, ה-OFFSET חובה.",
   "compare": "הדפדוף הוא אותו רעיון בשתי הגישות, אבל ב-T-SQL הוא פסוקית אחת צמודה ל-ORDER BY ובמונגו הוא שתי קריאות נפרדות בשרשרת.",
   "slot": "S99",
   "card": {
    "code": "R-27",
    "page": 91,
    "title": "TOP / דפדוף"
   }
  },
  "B-21": {
   "id": "B-21",
   "schema": "exam2",
   "src": "bank",
   "pattern": "top-n",
   "title": "TOP / דפדוף",
   "q": "הציגו את שני הסטודנטים עם מספר ההרשמות הגדול ביותר — מזהה הסטודנט, שמו ומספר ההרשמות. מיינו לפי מספר ההרשמות יורד, ובתיקו לפי מזהה הסטודנט עולה.",
   "keywords": "\"שני … עם הגדול ביותר\" + \"מספר ההרשמות\" ← קודם קיבוץ וספירה, ורק אחר כך חיתוך של TOP / limit.",
   "cols": [
    "studentId",
    "studentName",
    "enrollCount"
   ],
   "sql": "SELECT TOP 2 e.studentId, s.name AS studentName, COUNT(*) AS enrollCount\nFROM Enrollments e\nJOIN Students s ON s.studentId = e.studentId\nGROUP BY e.studentId, s.name\nORDER BY enrollCount DESC, e.studentId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $group: { _id: \"$studentId\", enrollCount: { $sum: 1 } } },\n  { $lookup: { from: \"students\", localField: \"_id\", foreignField: \"studentId\", as: \"st\" } },\n  { $unwind: \"$st\" },\n  { $project: { _id: 0, studentId: \"$_id\", studentName: \"$st.name\", enrollCount: 1 } },\n  { $sort: { enrollCount: -1, studentId: 1 } },\n  { $limit: 2 }\n])",
   "logic": "החיתוך חייב לקרות אחרון — אחרי הקיבוץ, אחרי הצירוף ואחרי המיון. במונגו זה גלוי לעין: $limit הוא השלב האחרון בצינור. ב-SQL זה פחות גלוי, כי TOP נכתב בראש השאילתה אבל מבוצע בסוף.",
   "trap": "שלושה סטודנטים (S100, S102, S106) עם 4 הרשמות כל אחד, ולכן בלי המיון השני אי אפשר לדעת מי שני הנבחרים. מלכודת שנייה: לשים $limit לפני $group — אז מקבצים שתי הרשמות שרירותיות ולא שני סטודנטים.",
   "compare": "ב-SQL סדר הביצוע סמוי והמנוע מסדר אותו, ואילו במונגו הוא כתוב במפורש — ולכן טעות בסדר השלבים היא טעות שקטה שתחזיר מספר סביר אבל שגוי.",
   "slot": "S99",
   "card": {
    "code": "R-27",
    "page": 91,
    "title": "TOP / דפדוף"
   }
  },
  "B-22": {
   "id": "B-22",
   "schema": "exam2",
   "src": "bank",
   "pattern": "subquery-where",
   "title": "תת-שאילתה — מעל הממוצע",
   "q": "הציגו את ההרשמות שהציון בהן גבוה מממוצע כל הציונים במערכת — מזהה ההרשמה, מזהה הסטודנט והציון. מיינו לפי הציון יורד, ובתיקו לפי מזהה ההרשמה.",
   "keywords": "\"גבוה מממוצע כל הציונים\" ← תת-שאילתה סקלרית ב-WHERE. את הממוצע חייבים לחשב לפני ההשוואה, ולכן אי אפשר לכתוב WHERE grade > AVG(grade).",
   "cols": [
    "enrollmentId",
    "studentId",
    "grade"
   ],
   "sql": "SELECT enrollmentId, studentId, grade\nFROM Enrollments\nWHERE grade > (SELECT AVG(grade) FROM Enrollments)\nORDER BY grade DESC, enrollmentId ASC;",
   "mongo": "var avg = db.enrollments.aggregate([\n  { $match: { grade: { $ne: null } } },\n  { $group: { _id: null, a: { $avg: \"$grade\" } } }\n]).toArray()[0].a;\n\ndb.enrollments.find(\n  { grade: { $gt: avg } },\n  { _id: 0, enrollmentId: 1, studentId: 1, grade: 1 }\n).sort({ grade: -1, enrollmentId: 1 })",
   "logic": "הממוצע הכללי הוא מספר אחד (78.53), והשאלה משווה כל שורה אליו. ב-SQL תת-השאילתה מוטמעת בתוך ה-WHERE והמנוע מחשב אותה פעם אחת. במונגו אין תת-שאילתות, ולכן מחשבים את הממוצע בפקודה ראשונה, שומרים במשתנה ומשתמשים בו בפקודה השנייה — בדיוק כמו שעושים בפועל בקוד אפליקציה.",
   "trap": "לכתוב WHERE grade > AVG(grade) — זו שגיאת מנוע, כי פונקציית קיבוץ אינה חוקית ב-WHERE. מלכודת שנייה: שורות עם grade = NULL אינן עוברות את ההשוואה באף אחד מהמנועים, ולכן אין צורך להגן עליהן — אבל כן צריך לוודא ש-NULL אינו נכנס לחישוב הממוצע.",
   "compare": "תת-שאילתה היא יתרון מובהק של SQL: היא הופכת שני שלבים לפקודה אטומית אחת, בעוד שבמונגו יש ביניהם רגע שבו הנתונים יכולים להשתנות.",
   "slot": "S20",
   "book": {
    "page": 93,
    "where": "הדוגמה הפתורה בכרטיס R-29 — תת-שאילתה ב-WHERE — מעל הממוצע"
   }
  },
  "B-23": {
   "id": "B-23",
   "schema": "exam2",
   "src": "bank",
   "pattern": "subquery-where",
   "title": "תת-שאילתה — מעל הממוצע",
   "q": "הציגו את מחזורי הקורס שהקיבולת שלהם גדולה מהקיבולת הממוצעת של כל המחזורים — מזהה המחזור, מזהה הקורס, הסמסטר והקיבולת. מיינו לפי הקיבולת יורד, ובתיקו לפי מזהה המחזור.",
   "keywords": "\"גדולה מהקיבולת הממוצעת של כל המחזורים\" ← אותו דפוס של תת-שאילתה סקלרית, הפעם על אותה טבלה שממנה שולפים.",
   "cols": [
    "offeringId",
    "courseId",
    "semester",
    "capacity"
   ],
   "sql": "SELECT offeringId, courseId, semester, capacity\nFROM CourseOfferings\nWHERE capacity > (SELECT AVG(capacity) FROM CourseOfferings)\nORDER BY capacity DESC, offeringId ASC;",
   "mongo": "var avg = db.courseOfferings.aggregate([\n  { $group: { _id: null, a: { $avg: \"$capacity\" } } }\n]).toArray()[0].a;\n\ndb.courseOfferings.find(\n  { capacity: { $gt: avg } },\n  { _id: 0, offeringId: 1, courseId: 1, semester: 1, capacity: 1 }\n).sort({ capacity: -1, offeringId: 1 })",
   "logic": "התת-שאילתה רצה על אותה טבלה, וזה חוקי לחלוטין — המנוע מחשב קודם את הממוצע (33) ואז משווה כל שורה אליו. במונגו החישוב הוא $group עם _id: null, שהוא הדרך לקבץ את כל האוסף לקבוצה אחת.",
   "trap": "שני מחזורים (O503 ו-O510) עם קיבולת 40 — בלי המיון השני הסדר ביניהם שרירותי. מלכודת שנייה: במונגו לשכוח את .toArray()[0].a ולהעביר ל-$gt את הסמן עצמו — התוצאה תהיה ריקה או שגיאה.",
   "compare": "ב-SQL \"ממוצע הכול\" הוא ביטוי בתוך התנאי, ובמונגו הוא פקודה עם $group: null שתוצאתה נשמרת במשתנה — שתי דרכים לאותו חישוב, אבל רק אחת מהן אטומית.",
   "slot": "S20",
   "card": {
    "code": "R-29",
    "page": 93,
    "title": "תת-שאילתה ב-WHERE — מעל הממוצע"
   }
  },
  "B-24": {
   "id": "B-24",
   "schema": "exam2",
   "src": "bank",
   "pattern": "subquery-in",
   "title": "תת-שאילתה עם IN",
   "q": "הציגו את הסטודנטים שנרשמו לפחות למחזור אחד של הקורס C20 — מזהה ושם. כל סטודנט פעם אחת בלבד. מיינו לפי המזהה.",
   "keywords": "\"נרשמו לפחות למחזור אחד של הקורס C20\" ← רשימה של מזהים, ולכן IN ולא =. \"כל סטודנט פעם אחת\" ← IN מחזיר כל שורה פעם אחת מעצמו, בלי DISTINCT.",
   "cols": [
    "studentId",
    "name"
   ],
   "sql": "SELECT studentId, name\nFROM Students\nWHERE studentId IN (\n  SELECT studentId FROM Enrollments\n  WHERE offeringId IN (SELECT offeringId FROM CourseOfferings WHERE courseId = 'C20')\n)\nORDER BY studentId ASC;",
   "mongo": "var offs = db.courseOfferings.find({ courseId: \"C20\" }, { _id: 0, offeringId: 1 })\n            .map(o => o.offeringId);\nvar ids  = db.enrollments.distinct(\"studentId\", { offeringId: { $in: offs } });\n\ndb.students.find({ studentId: { $in: ids } }, { _id: 0, studentId: 1, name: 1 })\n  .sort({ studentId: 1 })",
   "logic": "הקורס C20 מוצע בשלושה מחזורים (O501, O502, O509), ולכן לא מדובר במזהה אחד אלא ברשימה. שתי תת-שאילתות מקוננות ב-SQL: הפנימית מביאה את המחזורים, החיצונית את הסטודנטים. במונגו זה שלוש פקודות — map לרשימת המחזורים, distinct לרשימת הסטודנטים, ואז השליפה עצמה.",
   "trap": "שימוש בצירוף במקום ב-IN מחזיר 10 שורות במקום 6, כי S106 נרשם פעמיים ל-O501 ו-S101 רשום לשני מחזורים של C20 — ואז צריך DISTINCT. מלכודת שנייה: במונגו לכתוב { $in: offs } כשה-offs הוא מערך של מסמכים ולא של מחרוזות — ה-map הוא מה שהופך אותו לרשימת ערכים.",
   "compare": "IN עם תת-שאילתה הוא פקודה אחת ב-SQL ושרשרת של שלוש פקודות במונגו, אבל דווקא הפיצול הזה הוא מה שמאלץ אותך לראות אילו מזהים בדיוק נכנסים לרשימה.",
   "slot": "S18",
   "book": {
    "page": 94,
    "where": "הדוגמה הפתורה בכרטיס R-30 — תת-שאילתה עם IN"
   }
  },
  "B-25": {
   "id": "B-25",
   "schema": "exam2",
   "src": "bank",
   "pattern": "subquery-in",
   "title": "תת-שאילתה עם IN",
   "q": "הציגו את תוצאות הבחינה שהציון בהן גבוה מ-90 ושהבחינה שלהן התקיימה במחזור קורס של סמסטר 2026A — מזהה התוצאה, מזהה הבחינה, מזהה הסטודנט והציון. מיינו לפי הציון יורד, ובתיקו לפי מזהה התוצאה.",
   "keywords": "\"שהבחינה שלהן התקיימה במחזור קורס של סמסטר 2026A\" ← הסמסטר נמצא שתי טבלאות משם, ולכן תת-שאילתה מקוננת (או שרשרת צירופים).",
   "cols": [
    "resultId",
    "examId",
    "studentId",
    "score"
   ],
   "sql": "SELECT r.resultId, r.examId, r.studentId, r.score\nFROM ExamResults r\nWHERE r.score > 90\n  AND r.examId IN (\n    SELECT examId FROM Exams\n    WHERE offeringId IN (SELECT offeringId FROM CourseOfferings WHERE semester = '2026A')\n  )\nORDER BY r.score DESC, r.resultId ASC;",
   "mongo": "var offs = db.courseOfferings.find({ semester: \"2026A\" }, { _id: 0, offeringId: 1 })\n            .map(o => o.offeringId);\nvar exs  = db.exams.find({ offeringId: { $in: offs } }, { _id: 0, examId: 1 })\n            .map(x => x.examId);\n\ndb.examResults.find(\n  { score: { $gt: 90 }, examId: { $in: exs } },\n  { _id: 0, resultId: 1, examId: 1, studentId: 1, score: 1 }\n).sort({ score: -1, resultId: 1 })",
   "logic": "שני תנאים בלתי תלויים: אחד על השורה עצמה (ציון מעל 90) ואחד על שרשרת ההשתייכות שלה (בחינה → מחזור → סמסטר). ב-SQL התת-שאילתות מקוננות שתי רמות; במונגו אותה שרשרת היא שתי שאילתות עזר, שכל אחת מזינה את הבאה.",
   "trap": "שני ציונים של 98 (R027 ו-R032) — בלי המיון השני הסדר ביניהם שרירותי. מלכודת שנייה: לכתוב score >= 90 — התשובה תגדל, כי \"גבוה מ-90\" הוא > ולא >=.",
   "compare": "תת-שאילתה מקוננת מבטאת ב-SQL שרשרת שלמה של קשרים בתוך פקודה אחת, ובמונגו אותה שרשרת מתורגמת לכמה פקודות עצמאיות שמעבירות ביניהן רשימות מזהים.",
   "slot": "S18",
   "card": {
    "code": "R-30",
    "page": 94,
    "title": "תת-שאילתה עם IN"
   }
  },
  "B-26": {
   "id": "B-26",
   "schema": "exam2",
   "src": "bank",
   "pattern": "like",
   "title": "חיפוש בטקסט",
   "q": "הציגו את הסטודנטים ששמם מכיל את הרצף \"an\" — מזהה ושם. מיינו לפי המזהה.",
   "keywords": "\"מכיל את הרצף\" ← LIKE עם % משני הצדדים ב-SQL, ו-$regex בלי עוגנים במונגו.",
   "cols": [
    "studentId",
    "name"
   ],
   "sql": "SELECT studentId, name\nFROM Students\nWHERE name LIKE '%an%'\nORDER BY studentId ASC;",
   "mongo": "db.students.find(\n  { name: { $regex: \"an\" } },\n  { _id: 0, studentId: 1, name: 1 }\n).sort({ studentId: 1 })",
   "logic": "% ב-LIKE הוא \"אפס תווים או יותר\", ולכן '%an%' פירושו \"an במקום כלשהו\". במונגו ביטוי רגולרי בלי התווים ^ ו-$ מחפש התאמה חלקית מעצמו, ולכן אין בו מקבילה ל-%.",
   "trap": "LIKE ב-SQL Server וב-SQLite אינו רגיש לאותיות גדולות וקטנות, ואילו $regex של מונגו רגיש כברירת מחדל — אותה שאלה יכולה להחזיר תשובות שונות בשני המנועים. כדי להשוות אותן צריך $options: \"i\". מלכודת שנייה: לכתוב = '%an%' במקום LIKE — סימן השוויון לא מכיר ב-%.",
   "compare": "LIKE מכיר שני תווי תחליף בלבד (% ו-_), ו-$regex הוא מנוע ביטויים רגולריים שלם — ולכן במונגו החיפוש חזק יותר אבל גם רגיש לאותיות, ומצריך תשומת לב נוספת.",
   "slot": "S12",
   "book": {
    "page": 69,
    "where": "הדוגמה הפתורה בכרטיס R-03 — חיפוש בטקסט"
   }
  },
  "B-27": {
   "id": "B-27",
   "schema": "exam2",
   "src": "bank",
   "pattern": "like",
   "title": "חיפוש בטקסט",
   "q": "הציגו את הקורסים ששם הקורס שלהם מתחיל באות A או מסתיים במילה Management — מזהה, שם ונקודות זכות. מיינו לפי שם הקורס.",
   "keywords": "\"מתחיל ב-\" ← LIKE 'A%' (ה-% רק בסוף) / $regex: \"^A\". \"מסתיים ב-\" ← LIKE '%Management' / $regex: \"Management$\". \"או\" ← OR ב-SQL, $or במונגו.",
   "cols": [
    "courseId",
    "courseName",
    "credits"
   ],
   "sql": "SELECT courseId, courseName, credits\nFROM Courses\nWHERE courseName LIKE 'A%' OR courseName LIKE '%Management'\nORDER BY courseName ASC;",
   "mongo": "db.courses.find(\n  { $or: [ { courseName: { $regex: \"^A\" } }, { courseName: { $regex: \"Management$\" } } ] },\n  { _id: 0, courseId: 1, courseName: 1, credits: 1 }\n).sort({ courseName: 1 })",
   "logic": "מקום ה-% הוא כל הסיפור: בתחילת התבנית הוא פותח את ההתחלה, ובסופה הוא פותח את הסוף. בביטוי רגולרי התפקיד הזה הפוך — ^ ו-$ הם עוגנים שסוגרים, וברירת המחדל היא התאמה חלקית.",
   "trap": "במונגו שני תנאים על אותו שדה אינם יכולים לשבת באותו אובייקט פילטר (המפתח courseName יופיע פעמיים והשני ידרוס את הראשון) — חייבים $or מפורש. מלכודת שנייה: לכתוב '%A%' במקום 'A%' — זה גם מחזיר קורסים שה-a נמצא באמצע שמם.",
   "compare": "ב-SQL ה-OR הוא מילת קישור רגילה בין שני תנאים, ובמונגו הוא אופרטור שעוטף מערך של פילטרים — וזו הסיבה שהניסוח שלו נראה שונה כל כך.",
   "slot": "S12",
   "card": {
    "code": "R-03",
    "page": 69,
    "title": "חיפוש בטקסט"
   }
  },
  "B-28": {
   "id": "B-28",
   "schema": "exam2",
   "src": "bank",
   "pattern": "between-date",
   "title": "טווח תאריכים",
   "q": "הציגו את ההרשמות שבוצעו בין 1 בפברואר 2026 ל-3 בפברואר 2026 (כולל שני התאריכים) — מזהה ההרשמה, מזהה הסטודנט, תאריך ההרשמה והציון. מיינו לפי התאריך, ובתיקו לפי מזהה ההרשמה.",
   "keywords": "\"בין … ל… כולל\" ← BETWEEN ב-SQL (שהוא תמיד כולל את שני הקצוות), ובמונגו $gte ו-$lte על אותו שדה.",
   "cols": [
    "enrollmentId",
    "studentId",
    "enrolledAt",
    "grade"
   ],
   "sql": "SELECT enrollmentId, studentId, enrolledAt, grade\nFROM Enrollments\nWHERE enrolledAt BETWEEN '2026-02-01' AND '2026-02-03'\nORDER BY enrolledAt ASC, enrollmentId ASC;",
   "mongo": "db.enrollments.find(\n  { enrolledAt: { $gte: ISODate(\"2026-02-01\"), $lte: ISODate(\"2026-02-03\") } },\n  { _id: 0, enrollmentId: 1, studentId: 1, enrolledAt: 1, grade: 1 }\n).sort({ enrolledAt: 1, enrollmentId: 1 })",
   "logic": "BETWEEN הוא קיצור ל-\">= וגם <=\", ולכן הוא תמיד כולל את שני הגבולות. במונגו אין BETWEEN — כותבים את שני האופרטורים בתוך אותו אובייקט על אותו שדה, וזה AND. חשוב להשתמש ב-ISODate ולא במחרוזת, כי השדה שמור כטיפוס תאריך.",
   "trap": "השוואת תאריך למחרוזת במונגו — { enrolledAt: { $gte: \"2026-02-01\" } } אינו מחזיר כלום, כי מחרוזת ותאריך הם טיפוסים שונים. מלכודת שנייה: שדה תאריך שכולל גם שעה — BETWEEN עד '2026-02-03' יחתוך את כל מה שקרה באותו יום אחרי חצות; כאן השעות הן 00:00 ולכן זה בטוח.",
   "compare": "ב-SQL טווח תאריכים הוא פסוקית אחת קריאה, ובמונגו הוא שני אופרטורים בתוך אובייקט — אבל במונגו הטיפוס של הערך הוא חלק מהתנאי, ולכן השוואה לטיפוס שגוי נכשלת בשקט.",
   "slot": "S12",
   "book": {
    "page": 70,
    "where": "הדוגמה הפתורה בכרטיס R-04 — טווח תאריכים"
   }
  },
  "B-29": {
   "id": "B-29",
   "schema": "exam2",
   "src": "bank",
   "pattern": "between-date",
   "title": "טווח תאריכים",
   "q": "הציגו את ההרשמות למחזורי קורס של סמסטר 2025B שבוצעו במהלך חודש ינואר 2026 — מזהה ההרשמה, מזהה הסטודנט, מזהה המחזור ותאריך ההרשמה. מיינו לפי התאריך, ובתיקו לפי מזהה ההרשמה.",
   "keywords": "\"במהלך חודש ינואר 2026\" ← טווח תאריכים. \"למחזורי קורס של סמסטר 2025B\" ← הסמסטר יושב בטבלה אחרת, ולכן צירוף נוסף.",
   "cols": [
    "enrollmentId",
    "studentId",
    "offeringId",
    "enrolledAt"
   ],
   "sql": "SELECT e.enrollmentId, e.studentId, e.offeringId, e.enrolledAt\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nWHERE o.semester = '2025B'\n  AND e.enrolledAt BETWEEN '2026-01-01' AND '2026-01-31'\nORDER BY e.enrolledAt ASC, e.enrollmentId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $match: { enrolledAt: { $gte: ISODate(\"2026-01-01\"), $lte: ISODate(\"2026-01-31\") } } },\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $match: { \"off.semester\": \"2025B\" } },\n  { $project: { _id: 0, enrollmentId: 1, studentId: 1, offeringId: 1, enrolledAt: 1 } },\n  { $sort: { enrolledAt: 1, enrollmentId: 1 } }\n])",
   "logic": "שני תנאים משתי טבלאות, ולכן נדרש צירוף. במונגו עדיף לסנן קודם את טווח התאריכים ורק אחר כך לצרף — כך ה-$lookup רץ על חמש הרשמות ולא על 35. שלושת הערכים בתאריך 5 בינואר נבדלים ביניהם רק לפי מזהה ההרשמה, ולכן המיון השני חובה.",
   "trap": "שלוש הרשמות באותו תאריך בדיוק (2026-01-05) — בלי מיון שני התשובה אינה חד-משמעית. מלכודת שנייה: לכתוב את טווח התאריכים כ-\"ינואר\" דרך YEAR() ו-MONTH() במקום BETWEEN — זה עובד, אבל פונקציה על עמודה מבטלת את השימוש באינדקס.",
   "compare": "סדר הסינון במונגו נקבע על ידי המתכנת והוא משפיע ישירות על כמות העבודה, בעוד שב-SQL אותו תנאי נכתב פעם אחת ב-WHERE והאופטימייזר בוחר את הסדר.",
   "slot": "S12",
   "card": {
    "code": "R-04",
    "page": 70,
    "title": "טווח תאריכים"
   }
  },
  "B-30": {
   "id": "B-30",
   "schema": "exam2",
   "src": "bank",
   "pattern": "count-distinct",
   "title": "COUNT DISTINCT",
   "q": "לכל קורס — מזהה הקורס ומספר הסטודנטים השונים שנרשמו אליו. סטודנט שנרשם לשני מחזורים של אותו קורס נספר פעם אחת בלבד. מיינו לפי המספר יורד, ובתיקו לפי מזהה הקורס.",
   "keywords": "\"מספר הסטודנטים השונים\" + \"נספר פעם אחת בלבד\" ← COUNT(DISTINCT studentId) ב-SQL, ובמונגו $addToSet ואחריו $size.",
   "cols": [
    "courseId",
    "studentCount"
   ],
   "sql": "SELECT o.courseId, COUNT(DISTINCT e.studentId) AS studentCount\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nGROUP BY o.courseId\nORDER BY studentCount DESC, o.courseId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $group: { _id: \"$off.courseId\", studs: { $addToSet: \"$studentId\" } } },\n  { $project: { _id: 0, courseId: \"$_id\", studentCount: { $size: \"$studs\" } } },\n  { $sort: { studentCount: -1, courseId: 1 } }\n])",
   "logic": "C20 מוצע בשלושה מחזורים, ויש בו 10 הרשמות אבל רק 7 סטודנטים שונים — זה בדיוק ההבדל בין COUNT לבין COUNT DISTINCT. במונגו אין DISTINCT בתוך קיבוץ: אוספים את הערכים לקבוצה ($addToSet, שאינו מכניס כפילויות) ואז מודדים את אורכה.",
   "trap": "COUNT(*) במקום COUNT(DISTINCT studentId) מחזיר 10 עבור C20 במקום 7, וגם משנה את הסדר של כל התשובה. מלכודת שנייה: במונגו לכתוב $push במקום $addToSet — $push שומר כפילויות, ו-$size יחזיר את מספר ההרשמות ולא את מספר הסטודנטים.",
   "compare": "DISTINCT בתוך פונקציית קיבוץ הוא תוספת של מילה אחת ב-SQL, ובמונגו הוא שינוי של אופרטור הצבירה — $addToSet במקום $push — כלומר במונגו הייחודיות מיושמת במבנה הנתונים עצמו.",
   "slot": "S15",
   "card": {
    "code": "R-09",
    "page": 74,
    "title": "COUNT DISTINCT"
   }
  },
  "B-31": {
   "id": "B-31",
   "schema": "exam2",
   "src": "bank",
   "pattern": "count-distinct",
   "title": "COUNT DISTINCT",
   "q": "לכל מרצה — מזהה המרצה ומספר הקורסים השונים שהוא מלמד. מרצה שמלמד שני מחזורים של אותו קורס נספר פעם אחת. מיינו לפי המספר יורד, ובתיקו לפי מזהה המרצה.",
   "keywords": "\"מספר הקורסים השונים\" ← COUNT(DISTINCT courseId). אין צורך בצירוף — שני השדות שמורים באותה טבלה (CourseOfferings).",
   "cols": [
    "lecturerId",
    "courseCount"
   ],
   "sql": "SELECT lecturerId, COUNT(DISTINCT courseId) AS courseCount\nFROM CourseOfferings\nGROUP BY lecturerId\nORDER BY courseCount DESC, lecturerId ASC;",
   "mongo": "db.courseOfferings.aggregate([\n  { $group: { _id: \"$lecturerId\", cs: { $addToSet: \"$courseId\" } } },\n  { $project: { _id: 0, lecturerId: \"$_id\", courseCount: { $size: \"$cs\" } } },\n  { $sort: { courseCount: -1, lecturerId: 1 } }\n])",
   "logic": "המרצה L1 מלמד ארבעה מחזורים אבל רק שלושה קורסים שונים, כי C20 חוזר אצלו גם ב-2026A וגם ב-2025B. הקיבוץ הוא על טבלה אחת, ולכן זו השאלה הנקייה ביותר להבין בה את ההבדל בין \"מספר השורות\" לבין \"מספר הערכים השונים\".",
   "trap": "COUNT(courseId) בלי DISTINCT מחזיר 4 עבור L1 ומעלה אותו שלא בצדק — והוא גם משנה את סדר המיון. מלכודת שנייה: שני מרצים עם 2 קורסים (L2 ו-L5) ושני מרצים עם 1 (L3 ו-L4) — בלי המיון השני על המזהה התשובה אינה חד-משמעית.",
   "compare": "הקיבוץ והספירה מתורגמים כאן אחד לאחד, וכל הפער בין הגישות מצטמצם לשאלה איך כל מנוע מייצג \"ייחודיות\" — מילת מפתח מול מבנה קבוצה.",
   "slot": "S15",
   "card": {
    "code": "R-09",
    "page": 74,
    "title": "COUNT DISTINCT"
   }
  },
  "B-32": {
   "id": "B-32",
   "schema": "exam2",
   "src": "bank",
   "pattern": "multi-group",
   "title": "קיבוץ על שני שדות",
   "q": "לכל צירוף של סמסטר ומזהה קורס — הסמסטר, מזהה הקורס ומספר ההרשמות באותו צירוף. מיינו לפי הסמסטר עולה, ואז לפי מספר ההרשמות יורד, ואז לפי מזהה הקורס עולה.",
   "keywords": "\"לכל צירוף של … ו…\" ← GROUP BY על שני שדות, ובמונגו _id שהוא אובייקט עם שני מפתחות.",
   "cols": [
    "semester",
    "courseId",
    "enrollCount"
   ],
   "sql": "SELECT o.semester, o.courseId, COUNT(*) AS enrollCount\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nGROUP BY o.semester, o.courseId\nORDER BY o.semester ASC, enrollCount DESC, o.courseId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $group: { _id: { semester: \"$off.semester\", courseId: \"$off.courseId\" }, enrollCount: { $sum: 1 } } },\n  { $project: { _id: 0, semester: \"$_id.semester\", courseId: \"$_id.courseId\", enrollCount: 1 } },\n  { $sort: { semester: 1, enrollCount: -1, courseId: 1 } }\n])",
   "logic": "כל שורה בתשובה היא זוג (סמסטר, קורס), ולכן C20 מופיע פעמיים — פעם ב-2026A עם 7 הרשמות ופעם ב-2025B עם 3. במונגו המפתח המורכב נכתב כאובייקט בתוך _id, ואז ה-$project משטח אותו חזרה לשני שדות נפרדים.",
   "trap": "קיבוץ לפי שדה אחד בלבד מאחד את שני הסמסטרים ומחזיר 7 שורות במקום 9. מלכודת שנייה: במונגו לשכוח את ה-$project ולהשאיר את ה-_id כאובייקט — אז גם המיון לא יעבוד, כי אין שדה בשם semester ברמה העליונה.",
   "compare": "ב-SQL הוספת שדה שני ל-GROUP BY היא תוספת של מילה, ובמונגו היא שינוי מבנה ה-_id ממפתח בודד לאובייקט — ולכן היא מחייבת גם שלב $project נוסף.",
   "slot": "S15",
   "card": {
    "code": "R-10",
    "page": 74,
    "title": "קיבוץ על שני שדות"
   }
  },
  "B-33": {
   "id": "B-33",
   "schema": "exam2",
   "src": "bank",
   "pattern": "multi-group",
   "title": "קיבוץ על שני שדות",
   "q": "לכל צירוף של מחלקת הסטודנט וסמסטר — מזהה המחלקה, הסמסטר ומספר ההרשמות. מיינו לפי מזהה המחלקה ואז לפי הסמסטר.",
   "keywords": "\"מחלקת הסטודנט\" ← Students. \"סמסטר\" ← CourseOfferings. שני שדות הקיבוץ מגיעים משתי טבלאות שונות, ולכן צריך שני צירופים לפני הקיבוץ.",
   "cols": [
    "departmentId",
    "semester",
    "enrollCount"
   ],
   "sql": "SELECT s.departmentId, o.semester, COUNT(*) AS enrollCount\nFROM Enrollments e\nJOIN Students s        ON s.studentId  = e.studentId\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nGROUP BY s.departmentId, o.semester\nORDER BY s.departmentId ASC, o.semester ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"students\", localField: \"studentId\", foreignField: \"studentId\", as: \"st\" } },\n  { $unwind: \"$st\" },\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $group: { _id: { departmentId: \"$st.departmentId\", semester: \"$off.semester\" }, enrollCount: { $sum: 1 } } },\n  { $project: { _id: 0, departmentId: \"$_id.departmentId\", semester: \"$_id.semester\", enrollCount: 1 } },\n  { $sort: { departmentId: 1, semester: 1 } }\n])",
   "logic": "כאן הקיבוץ חייב לבוא אחרי שני צירופים, כי אף אחד משני שדות הקיבוץ אינו קיים בטבלת ההרשמות. השאלה היא \"מחלקת הסטודנט\" ולא \"מחלקת הקורס\" — שני נתונים שונים לגמרי, שגם נותנים תשובות שונות.",
   "trap": "צירוף למחלקה דרך הקורס (Courses.departmentId) במקום דרך הסטודנט — זו שאלה אחרת לגמרי, והתשובה תהיה 6 שורות במקום 8. מלכודת שנייה: מחלקה שאין לה אף הרשמה לא תופיע בכלל — וזה נכון, כי השאלה לא ביקשה LEFT JOIN.",
   "compare": "ככל שמספר הצירופים שלפני הקיבוץ עולה, הצינור במונגו מתארך בזוג שלבים לכל צירוף — בעוד ששאילתת SQL גדלה בשורה אחת.",
   "slot": "S15",
   "card": {
    "code": "R-10",
    "page": 74,
    "title": "קיבוץ על שני שדות"
   }
  },
  "B-34": {
   "id": "B-34",
   "schema": "exam2",
   "src": "bank",
   "pattern": "self-join",
   "title": "צירוף עצמי",
   "q": "הציגו זוגות של קורסים מאותה מחלקה שיש להם אותו מספר נקודות זכות. כל זוג פעם אחת בלבד, ואין להציג קורס מול עצמו. עמודות: שם הקורס הראשון, שם הקורס השני, מזהה המחלקה ונקודות הזכות. מיינו לפי שם הקורס הראשון ואז לפי השני.",
   "keywords": "\"זוגות … מאותה\" ← צירוף של טבלה עם עצמה (self join). \"כל זוג פעם אחת ולא קורס מול עצמו\" ← תנאי אי-שוויון מכוון: b.courseId > a.courseId.",
   "cols": [
    "courseA",
    "courseB",
    "departmentId",
    "credits"
   ],
   "sql": "SELECT a.courseName AS courseA, b.courseName AS courseB, a.departmentId, a.credits\nFROM Courses a\nJOIN Courses b ON b.departmentId = a.departmentId\n              AND b.credits      = a.credits\n              AND b.courseId     > a.courseId\nORDER BY a.courseName ASC, b.courseName ASC;",
   "mongo": "db.courses.aggregate([\n  { $lookup: { from: \"courses\", localField: \"departmentId\", foreignField: \"departmentId\", as: \"same\" } },\n  { $unwind: \"$same\" },\n  { $match: { $expr: { $and: [ { $eq: [\"$credits\", \"$same.credits\"] }, { $gt: [\"$same.courseId\", \"$courseId\"] } ] } } },\n  { $project: { _id: 0, courseA: \"$courseName\", courseB: \"$same.courseName\", departmentId: 1, credits: 1 } },\n  { $sort: { courseA: 1, courseB: 1 } }\n])",
   "logic": "צירוף עצמי הוא אותה טבלה בשני כינויים, a ו-b, כאילו היו שתי טבלאות. התנאי b.courseId > a.courseId עושה שתי עבודות בבת אחת: הוא מונע מקורס להצטרף לעצמו (כי המזהה אינו גדול מעצמו), והוא משאיר מכל זוג רק כיוון אחד. במונגו $lookup על אותו אוסף עושה את הצירוף, ואת ההשוואה בין שני שדות של אותו מסמך חייבים לכתוב ב-$expr.",
   "trap": "שימוש ב-<> (שונה) במקום > מחזיר כל זוג פעמיים, בשני הכיוונים. מלכודת שנייה: במונגו אי אפשר להשוות שני שדות בפילטר רגיל — { credits: \"$same.credits\" } מחפש את המחרוזת עצמה; חייבים $expr.",
   "compare": "ב-SQL צירוף עצמי הוא רק עניין של כינויים, ובמונגו הוא דורש גם $lookup על אותו אוסף וגם $expr כדי להשוות שדה לשדה — ולכן הוא אחד הדפוסים שבהם הפער בין הגישות גדול במיוחד.",
   "slot": "S99",
   "book": {
    "page": 72,
    "where": "הדוגמה הפתורה בכרטיס R-07 — צירוף עצמי"
   }
  },
  "B-35": {
   "id": "B-35",
   "schema": "exam2",
   "src": "bank",
   "pattern": "self-join",
   "title": "צירוף עצמי",
   "q": "הציגו את כל זוגות הסטודנטים הלומדים באותה מחלקה — מזהה המחלקה, מזהה הסטודנט הראשון ומזהה הסטודנט השני. כל זוג פעם אחת בלבד ובלי לצרף סטודנט לעצמו. מיינו לפי מזהה המחלקה, ואז לפי המזהה הראשון, ואז לפי השני.",
   "keywords": "\"זוגות סטודנטים באותה מחלקה\" ← צירוף עצמי על Students. \"כל זוג פעם אחת ובלי לצרף סטודנט לעצמו\" ← b.studentId > a.studentId.",
   "cols": [
    "departmentId",
    "studentA",
    "studentB"
   ],
   "sql": "SELECT a.departmentId, a.studentId AS studentA, b.studentId AS studentB\nFROM Students a\nJOIN Students b ON b.departmentId = a.departmentId\n               AND b.studentId    > a.studentId\nORDER BY a.departmentId ASC, a.studentId ASC, b.studentId ASC;",
   "mongo": "db.students.aggregate([\n  { $lookup: { from: \"students\", localField: \"departmentId\", foreignField: \"departmentId\", as: \"peer\" } },\n  { $unwind: \"$peer\" },\n  { $match: { $expr: { $gt: [\"$peer.studentId\", \"$studentId\"] } } },\n  { $project: { _id: 0, departmentId: 1, studentA: \"$studentId\", studentB: \"$peer.studentId\" } },\n  { $sort: { departmentId: 1, studentA: 1, studentB: 1 } }\n])",
   "logic": "התשובה היא כל הזוגות הלא-מסודרים בתוך כל מחלקה: מחלקה עם 6 סטודנטים נותנת 15 זוגות, עם 3 נותנת 3, ועם 2 נותנת 1 — סך הכול 22 שורות. התנאי על אי-שוויון המזהים הוא מה שהופך צירוף של \"כל אחד עם כולם\" לרשימת זוגות נקייה.",
   "trap": "בלי שום תנאי אי-שוויון מקבלים 50 שורות: כל סטודנט מול עצמו וכל זוג פעמיים. מלכודת שנייה: שימוש ב-<> מוריד רק את הסטודנט מול עצמו ומשאיר 44 שורות — כלומר כל זוג עדיין פעמיים.",
   "compare": "הסינון של הכפילות נעשה בשתי הגישות בדיוק באותה דרך — תנאי אי-שוויון על המזהה — אבל במונגו הוא חייב לעבור דרך $expr, כי השוואת שדה לשדה אינה חלק מתחביר הפילטר הרגיל.",
   "slot": "S99",
   "card": {
    "code": "R-07",
    "page": 72,
    "title": "צירוף עצמי"
   }
  },
  "B-44": {
   "id": "B-44",
   "schema": "exam2",
   "src": "bank",
   "pattern": "nested-aggregate",
   "title": "צבירה מקוננת",
   "q": "מהו מספר ההרשמות הגדול ביותר שיש למחזור קורס בודד? הציגו מספר אחד בעמודה בשם maxEnrollments.",
   "keywords": "\"הגדול ביותר … למחזור בודד\" ← מקסימום של ספירות, כלומר אגרגציה על תוצאת אגרגציה: קודם סופרים לכל מחזור, ואז לוקחים את המקסימום.",
   "cols": [
    "maxEnrollments"
   ],
   "sql": "SELECT MAX(c) AS maxEnrollments\nFROM (SELECT COUNT(*) AS c FROM Enrollments GROUP BY offeringId) t;",
   "mongo": "db.enrollments.aggregate([\n  { $group: { _id: \"$offeringId\", c: { $sum: 1 } } },\n  { $group: { _id: null, maxEnrollments: { $max: \"$c\" } } },\n  { $project: { _id: 0, maxEnrollments: 1 } }\n])",
   "logic": "אי אפשר לכתוב MAX(COUNT(*)) — פונקציית קיבוץ אינה יכולה לעטוף פונקציית קיבוץ אחרת. ב-SQL פותרים זאת בתת-שאילתה ב-FROM: השאילתה הפנימית מייצרת טבלה של ספירות, והחיצונית לוקחת ממנה את המקסימום. במונגו זה פשוט שני שלבי $group זה אחרי זה — הראשון סופר, השני ממקסם.",
   "trap": "כתיבת SELECT MAX(COUNT(*)) FROM Enrollments GROUP BY offeringId — שגיאת מנוע. מלכודת שנייה: לשכוח את הכינוי לתת-השאילתה (ה-t אחרי הסוגר) — ב-SQL Server וב-SQLite טבלה נגזרת חייבת שם.",
   "compare": "הצינור של מונגו מתאים לשאלה הזו באופן טבעי — אגרגציה על אגרגציה היא עוד שלב — ואילו ב-SQL נדרשת תת-שאילתה ב-FROM, שהיא הדרך של SQL לשרשר שלבים.",
   "slot": "S20",
   "card": {
    "code": "R-15",
    "page": 79,
    "title": "צבירה בתוך HAVING — MAX ו-MIN"
   }
  },
  "B-45": {
   "id": "B-45",
   "schema": "exam2",
   "src": "bank",
   "pattern": "nested-aggregate",
   "title": "צבירה מקוננת",
   "q": "הציגו את מחזור הקורס שיש אליו מספר ההרשמות הגדול ביותר — מזהה המחזור ומספר ההרשמות. אם יש כמה מחזורים עם אותו מספר מקסימלי, הציגו את כולם. מיינו לפי מזהה המחזור.",
   "keywords": "\"אם יש כמה … הציגו את כולם\" ← אסור להסתפק ב-TOP 1 / limit(1); צריך להשוות את הספירה למקסימום, כלומר HAVING מול תת-שאילתה.",
   "cols": [
    "offeringId",
    "enrollCount"
   ],
   "sql": "SELECT offeringId, COUNT(*) AS enrollCount\nFROM Enrollments\nGROUP BY offeringId\nHAVING COUNT(*) = (SELECT MAX(c) FROM (SELECT COUNT(*) AS c FROM Enrollments GROUP BY offeringId) t)\nORDER BY offeringId ASC;",
   "mongo": "var mx = db.enrollments.aggregate([\n  { $group: { _id: \"$offeringId\", c: { $sum: 1 } } },\n  { $group: { _id: null, m: { $max: \"$c\" } } }\n]).toArray()[0].m;\n\ndb.enrollments.aggregate([\n  { $group: { _id: \"$offeringId\", enrollCount: { $sum: 1 } } },\n  { $match: { enrollCount: mx } },\n  { $project: { _id: 0, offeringId: \"$_id\", enrollCount: 1 } },\n  { $sort: { offeringId: 1 } }\n])",
   "logic": "כאן יש שתי אגרגציות מקוננות וגם סינון קבוצות לפי תוצאתן. התת-שאילתה הפנימית מחשבת את הספירה המקסימלית (6), וה-HAVING משאיר רק את הקבוצות ששוות לה. במונגו מחשבים את המקסימום בפקודה ראשונה, ואז מסננים עם $match אחרי ה-$group — זה ה-HAVING של מונגו.",
   "trap": "שימוש ב-TOP 1 / limit(1) אחרי מיון יורד. בנתוני הדוגמה יש מחזור מוביל יחיד ולכן התשובה תצא נכונה במקרה — אבל השאלה דרשה במפורש להציג את כולם בתיקו, וזו הלוגיקה שנבדקת. מלכודת שנייה: לשים את ה-$match לפני ה-$group — אז הוא יסנן הרשמות בודדות ולא קבוצות.",
   "compare": "השאלה \"מי המקסימום, כולל תיקו\" חושפת את ההבדל הכי עמוק בין הגישות: ב-SQL היא פקודה אחת עם תת-שאילתה מקוננת, ובמונגו היא שתי פקודות שביניהן משתנה — ולכן התשובה אינה אטומית.",
   "slot": "S20",
   "card": {
    "code": "R-15",
    "page": 79,
    "title": "צבירה בתוך HAVING — MAX ו-MIN"
   }
  },
  "E11": {
   "id": "E11",
   "schema": "exam2",
   "src": "college",
   "title": "סינון + מיון כפול",
   "q": "כתבו שאילתה שמציגה את כל הקורסים השייכים למחלקה D10 שנקודות הזכות שלהם גדולות מ-3. יש להציג את שם הקורס ואת נקודות הזכות, למיין לפי נקודות הזכות בסדר יורד ולאחר מכן לפי שם הקורס בסדר עולה.",
   "keywords": "\"השייכים למחלקה D10\" + \"גדולות מ-3\" ← שני תנאים ב-WHERE עם AND. \"ולאחר מכן לפי שם הקורס בסדר עולה\" ← מיון שני, שנכנס לתוקף רק כששתי שורות שוות במיון הראשון.",
   "cols": [
    "courseName",
    "credits"
   ],
   "sql": "SELECT courseName, credits\nFROM Courses\nWHERE departmentId = 'D10' AND credits > 3\nORDER BY credits DESC, courseName ASC;",
   "mongo": "db.courses.find(\n  { departmentId: \"D10\", credits: { $gt: 3 } },\n  { _id: 0, courseName: 1, credits: 1 }\n).sort({ credits: -1, courseName: 1 })",
   "logic": "הטבלה היחידה שצריך היא Courses — אין כאן שום צירוף. שני התנאים ב-WHERE מסננים את השורות; במונגו שני תנאים בתוך אותו אובייקט פילטר הם AND אוטומטי. הארגומנט השני ב-find הוא ה-projection (היטל) — הוא בוחר אילו שדות יחזרו, בדיוק כמו רשימת העמודות אחרי SELECT.",
   "trap": "שכחת המיון השני — בלעדיו הסדר בין שני הקורסים עם 4 נקודות זכות אינו מוגדר והתשובה תיחשב שגויה. מלכודת שנייה: credits > 3 ולא >= 3 — בנתונים יש קורס עם בדיוק 3 נקודות זכות (Operating Systems) והוא לא צריך להופיע.",
   "compare": "בשתי הגישות זו פעולה על אוסף אחד ללא צירוף, ולכן ההבדל תחבירי בלבד — WHERE/ORDER BY מול find/.sort(). הפער האמיתי בין הארכיטקטורות מתחיל רק כשנדרש לחבר כמה ישויות.",
   "slot": "S12",
   "book": {
    "page": 68,
    "where": "הדוגמה הפתורה בכרטיס R-01 — סינון ומיון"
   }
  },
  "E12": {
   "id": "E12",
   "schema": "exam2",
   "src": "college",
   "title": "צירוף ארבע טבלאות + DISTINCT",
   "q": "כתבו שאילתה שמציגה את שמות הסטודנטים ואת שמות הקורסים שאליהם נרשמו בסמסטר 2026A. יש להציג כל צירוף של סטודנט וקורס פעם אחת בלבד, גם אם קיימות רשומות כפולות.",
   "keywords": "\"פעם אחת בלבד\" + \"גם אם קיימות רשומות כפולות\" ← DISTINCT ב-SQL, $group במונגו. \"שמות הסטודנטים ושמות הקורסים\" ← צריך להגיע גם ל-Students וגם ל-Courses, כלומר צירוף דרך Enrollments → CourseOfferings → Courses.",
   "cols": [
    "studentName",
    "courseName"
   ],
   "sql": "SELECT DISTINCT s.name AS studentName, c.courseName\nFROM Enrollments e\nJOIN Students s        ON s.studentId  = e.studentId\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nJOIN Courses c         ON c.courseId   = o.courseId\nWHERE o.semester = '2026A'\nORDER BY s.name ASC, c.courseName ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $match: { \"off.semester\": \"2026A\" } },\n  { $lookup: { from: \"students\", localField: \"studentId\", foreignField: \"studentId\", as: \"st\" } },\n  { $unwind: \"$st\" },\n  { $lookup: { from: \"courses\", localField: \"off.courseId\", foreignField: \"courseId\", as: \"crs\" } },\n  { $unwind: \"$crs\" },\n  { $group: { _id: { studentName: \"$st.name\", courseName: \"$crs.courseName\" } } },\n  { $project: { _id: 0, studentName: \"$_id.studentName\", courseName: \"$_id.courseName\" } },\n  { $sort: { studentName: 1, courseName: 1 } }\n])",
   "logic": "מתחילים מההרשמות, כי הן הטבלה שמקשרת בין סטודנט למחזור קורס. כל $lookup הוא המקבילה של JOIN אחד: הוא מביא מסמכים מאוסף אחר לתוך מערך, ולכן אחריו צריך $unwind כדי לפרוס את המערך לשורה שטוחה. הסמסטר יושב על CourseOfferings ולא על הקורס, ולכן מסננים אותו אחרי ה-$lookup הראשון. במונגו אין DISTINCT — מקבצים לפי צירוף שני השדות ואז $project משטח את ה-_id חזרה לשדות רגילים.",
   "trap": "כפילויות. בנתונים יש 30 שורות הרשמה ב-2026A אבל רק 28 צירופים שונים. הכפילות משני מקורות: (1) E1018 — הרשמה כפולה מילולית של אותו סטודנט לאותו מחזור; (2) S101 רשום גם ל-O501 וגם ל-O502 — שני מחזורים שונים של אותו קורס C20. הסרת DISTINCT / $group מחזירה 30 שורות ונחשבת שגיאה.",
   "compare": "ב-SQL הצירוף מוצהר פעם אחת ו-DISTINCT מילה אחת, ואילו במונגו כל צירוף דורש זוג שלבים ($lookup + $unwind) ואת האיחוד צריך לבטא כקיבוץ — מה שהופך את מודל המסמכים ליעיל כשהנתונים מוטמעים יחד, ומסורבל כשהם מפוזרים בין אוספים.",
   "slot": "S99",
   "book": {
    "page": 73,
    "where": "הדוגמה הפתורה בכרטיס R-08 — ללא כפילויות"
   }
  },
  "E13": {
   "id": "E13",
   "schema": "exam2",
   "src": "college",
   "title": "קיבוץ עם HAVING על ממוצע",
   "q": "כתבו שאילתה שמציגה לכל סטודנט שנרשם לפחות לקורס אחד בסמסטר 2026A את מזהה הסטודנט, שמו וממוצע ציוניו בסמסטר. יש להתחשב רק בהרשמות שבהן קיים ציון מספרי, להציג רק סטודנטים שממוצע ציוניהם גדול מ-85, ולמיין לפי הממוצע בסדר יורד.",
   "keywords": "\"לכל סטודנט\" ← GROUP BY. \"ממוצע ציוניו\" ← AVG. \"יש להציג רק סטודנטים שממוצע ציוניהם גדול מ-85\" ← HAVING (סינון אחרי הקיבוץ). \"יש להתחשב רק בהרשמות שבהן קיים ציון מספרי\" ← grade IS NOT NULL, סינון לפני הקיבוץ.",
   "cols": [
    "studentId",
    "studentName",
    "avgGrade"
   ],
   "sql": "SELECT e.studentId, s.name AS studentName, AVG(e.grade) AS avgGrade\nFROM Enrollments e\nJOIN Students s        ON s.studentId  = e.studentId\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nWHERE o.semester = '2026A' AND e.grade IS NOT NULL\nGROUP BY e.studentId, s.name\nHAVING AVG(e.grade) > 85\nORDER BY avgGrade DESC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $match: { \"off.semester\": \"2026A\", grade: { $ne: null } } },\n  { $group: { _id: \"$studentId\", avgGrade: { $avg: \"$grade\" } } },\n  { $match: { avgGrade: { $gt: 85 } } },\n  { $lookup: { from: \"students\", localField: \"_id\", foreignField: \"studentId\", as: \"st\" } },\n  { $unwind: \"$st\" },\n  { $project: { _id: 0, studentId: \"$_id\", studentName: \"$st.name\", avgGrade: 1 } },\n  { $sort: { avgGrade: -1 } }\n])",
   "logic": "שני סינונים בשני זמנים שונים, וזה כל הסיפור. WHERE (ובמונגו ה-$match הראשון) מסנן שורות בודדות לפני שמחשבים משהו. HAVING (ובמונגו ה-$match השני, אחרי ה-$group) מסנן קבוצות לפי תוצאת החישוב. במונגו מקבצים לפי studentId בלבד, ואת שם הסטודנט מביאים ב-$lookup אחרי הקיבוץ — כך הצירוף רץ על 7 קבוצות ולא על 30 הרשמות. הערה: במונגו $avg גם הוא מתעלם מ-null, ולכן grade: { $ne: null } לא משנה את התוצאה כאן — כותבים אותו כי השאלה דורשת זאת.",
   "trap": "AVG מתעלם מ-NULL אוטומטית — ולכן אם מחשבים SUM(grade)/COUNT(*) במקום AVG(grade), המונה מתעלם מה-NULL אבל המכנה סופר אותו, והממוצע יוצא נמוך מדי. בנתונים זה מוריד את התשובה מ-7 שורות ל-4. דוגמה חיה: S107 — שלוש הרשמות, אחת בלי ציון; הממוצע הנכון 92.5 ולא 61.67. מלכודת שנייה: S113 נרשם לשני קורסים ב-2026A אבל כל הציונים שלו NULL — ולכן הוא לא אמור להופיע.",
   "compare": "שתי הגישות מבדילות בין סינון לפני החישוב לסינון אחריו, אבל ב-SQL אלה שתי מילות מפתח שונות (WHERE מול HAVING) ובמונגו זה אותו שלב $match שממוקם במקום אחר בצינור — כלומר במונגו הסדר של השלבים הוא הסמנטיקה.",
   "slot": "S14",
   "book": {
    "page": 76,
    "where": "הדוגמה הפתורה בכרטיס R-12 — קיבוץ וממוצע"
   }
  },
  "E14": {
   "id": "E14",
   "schema": "exam2",
   "src": "college",
   "title": "LEFT JOIN עם ספירה (כולל אפסים)",
   "q": "כתבו שאילתה שמציגה לכל קורס במחלקה ONO את שם הקורס ואת מספר הסטודנטים שנרשמו אליו בסמסטר 2026A. יש לכלול גם קורסים שלא נרשם אליהם אף סטודנט, ולהציג עבורם את המספר 0. למיין בסדר יורד לפי מספר הסטודנטים.",
   "keywords": "\"יש לכלול גם קורסים שלא נרשם אליהם אף סטודנט, ולהציג עבורם את המספר 0\" ← זו ההגדרה המילולית של LEFT JOIN. אם היה כתוב רק \"לכל קורס שנרשמו אליו\", היה מספיק JOIN רגיל.",
   "cols": [
    "courseName",
    "studentCount"
   ],
   "sql": "SELECT c.courseName, COUNT(e.enrollmentId) AS studentCount\nFROM Courses c\nLEFT JOIN CourseOfferings o ON o.courseId   = c.courseId AND o.semester = '2026A'\nLEFT JOIN Enrollments e     ON e.offeringId = o.offeringId\nWHERE c.departmentId = 'ONO'\nGROUP BY c.courseId, c.courseName\nORDER BY studentCount DESC;",
   "mongo": "db.courses.aggregate([\n  { $match: { departmentId: \"ONO\" } },\n  { $lookup: { from: \"courseOfferings\", localField: \"courseId\", foreignField: \"courseId\", as: \"offs\" } },\n  { $addFields: { offs2026: { $filter: { input: \"$offs\", as: \"o\", cond: { $eq: [\"$$o.semester\", \"2026A\"] } } } } },\n  { $addFields: { offIds:   { $map:    { input: \"$offs2026\", as: \"o\", in: \"$$o.offeringId\" } } } },\n  { $lookup: { from: \"enrollments\", localField: \"offIds\", foreignField: \"offeringId\", as: \"enr\" } },\n  { $project: { _id: 0, courseName: 1, studentCount: { $size: \"$enr\" } } },\n  { $sort: { studentCount: -1 } }\n])",
   "logic": "מתחילים מהקורסים, לא מההרשמות — אחרת קורס בלי נרשמים לא יהיה מאיפה להופיע. ב-SQL LEFT JOIN שומר כל שורה מהטבלה השמאלית גם כשאין לה התאמה. במונגו אין \"left join\" נפרד: $lookup תמיד משמר את מסמך המקור ומחזיר מערך ריק כשאין התאמה — ולכן $size על המערך נותן 0 במקום הנכון. סינון הסמסטר נעשה בתוך המערך עם $filter, ואחר כך $map מוציא ממנו את מזהי המחזורים.",
   "trap": "שלוש מלכודות באותה שאלה. (1) סינון הסמסטר ב-WHERE במקום בתנאי ה-ON — אז השורה של C80 (שאין לה מחזור ב-2026A) נזרקת, והתוצאה מתכווצת מ-2 שורות ל-1. (2) COUNT(*) במקום COUNT(e.enrollmentId) — ב-LEFT JOIN שורת ה\"אין התאמה\" קיימת פיזית, ולכן COUNT(*) סופר אותה ומחזיר 1 במקום 0. (3) ויתור על סינון הסמסטר לגמרי — C80 מקבל 2 נרשמים מהסמסטר 2025B שאינו קשור לשאלה.",
   "compare": "ב-SQL ההכללה של השורות הריקות דורשת החלטה מפורשת (LEFT ולא INNER) ואת סינון הסמסטר דווקא בתוך ה-ON, ואילו במונגו $lookup משמר את המסמך מטבעו ולכן האפסים מתקבלים \"בחינם\" — אבל את סינון הסמסטר צריך לבנות ביד בתוך המערך עם $filter.",
   "slot": "S16",
   "book": {
    "page": 84,
    "where": "הדוגמה הפתורה בכרטיס R-19 — LEFT JOIN עם אפסים"
   }
  },
  "E15": {
   "id": "E15",
   "schema": "exam2",
   "src": "college",
   "title": "אנטי-צירוף (מי שאין לו כלום)",
   "q": "כתבו שאילתה שמציגה את כל הסטודנטים שלא נרשמו לאף מחזור קורס, באף סמסטר. יש להציג את מזהה הסטודנט ואת שמו.",
   "keywords": "\"שלא נרשמו לאף … באף סמסטר\" ← אנטי-צירוף: LEFT JOIN ואחריו תנאי שהצד הימני ריק. שימו לב ל\"באף סמסטר\" — זה אומר בלי סינון סמסטר, בשונה משאלות 12–14.",
   "cols": [
    "studentId",
    "name"
   ],
   "sql": "SELECT s.studentId, s.name\nFROM Students s\nLEFT JOIN Enrollments e ON e.studentId = s.studentId\nWHERE e.enrollmentId IS NULL\nORDER BY s.studentId ASC;",
   "mongo": "db.students.aggregate([\n  { $lookup: { from: \"enrollments\", localField: \"studentId\", foreignField: \"studentId\", as: \"enr\" } },\n  { $match: { enr: { $size: 0 } } },\n  { $project: { _id: 0, studentId: 1, name: 1 } },\n  { $sort: { studentId: 1 } }\n])",
   "logic": "הטריק נקרא אנטי-צירוף (Anti-Join): מבצעים LEFT JOIN שמביא לכל סטודנט את ההרשמות שלו, ואז שומרים דווקא את השורות שבהן הצד הימני יצא ריק — כלומר NULL. במונגו זה ישיר יותר: $lookup מחזיר מערך, ואם המערך ריק אז לסטודנט אין הרשמות, ולכן $size: 0. חלופה שקולה ב-SQL: WHERE NOT EXISTS (SELECT 1 FROM Enrollments e WHERE e.studentId = s.studentId).",
   "trap": "בדיקת IS NULL על העמודה הלא-נכונה. חייבים לבדוק עמודה שלא יכולה להיות NULL בעצמה בשורה אמיתית — מפתח ראשי כמו e.enrollmentId הוא בחירה בטוחה; בדיקה על e.grade IS NULL מחזירה 7 שורות במקום 2, כי היא גורפת גם את חמש ההרשמות של סטודנטים שכן נרשמו אך טרם קיבלו ציון. מלכודת שנייה, מונגו: $match: { enr: { $eq: [] } } שקול ועובד, אבל $match: { enr: null } אינו שקול — $lookup לא מחזיר null אלא מערך ריק.",
   "compare": "ב-SQL \"אין לו כלום\" מתבטא בעקיפין — דרך שורת NULL שנוצרת מצירוף שמאלי שנכשל, ואילו במונגו הוא נבדק ישירות על אורך המערך, מה שהופך את הניסוח במונגו לקריא יותר ואת כוונת השאילתה ב-SQL לתלויה בבחירת העמודה הנכונה.",
   "slot": "S13",
   "book": {
    "page": 86,
    "where": "הדוגמה הפתורה בכרטיס R-21 — אנטי-צירוף — מי שאין לו כלום"
   }
  },
  "E16": {
   "id": "E16",
   "schema": "exam2",
   "src": "college",
   "title": "צירוף ללא קיבוץ (כל תוצאה בנפרד)",
   "q": "כתבו שאילתה שמציגה את שמות הסטודנטים שקיבלו ציון גבוה מ-90 בקורס שמזההו C20, בסמסטר 2026A. יש להציג שם סטודנט, שם קורס וציון. אם אותו סטודנט קיבל ציונים מתאימים ביותר ממחזור קורס אחד — יש להציג כל תוצאה מתאימה בנפרד.",
   "keywords": "\"יש להציג כל תוצאה מתאימה בנפרד\" ← ההוראה ההפוכה משאלה 12: אסור DISTINCT ואסור קיבוץ. \"בקורס שמזההו C20, בסמסטר 2026A\" ← שני סינונים שיושבים שניהם על CourseOfferings.",
   "cols": [
    "studentName",
    "courseName",
    "grade"
   ],
   "sql": "SELECT s.name AS studentName, c.courseName, e.grade\nFROM Enrollments e\nJOIN Students s        ON s.studentId  = e.studentId\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nJOIN Courses c         ON c.courseId   = o.courseId\nWHERE o.courseId = 'C20' AND o.semester = '2026A' AND e.grade > 90\nORDER BY e.grade DESC, s.name ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $match: { grade: { $gt: 90 } } },\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\", foreignField: \"offeringId\", as: \"off\" } },\n  { $unwind: \"$off\" },\n  { $match: { \"off.courseId\": \"C20\", \"off.semester\": \"2026A\" } },\n  { $lookup: { from: \"students\", localField: \"studentId\", foreignField: \"studentId\", as: \"st\" } },\n  { $unwind: \"$st\" },\n  { $lookup: { from: \"courses\", localField: \"off.courseId\", foreignField: \"courseId\", as: \"crs\" } },\n  { $unwind: \"$crs\" },\n  { $project: { _id: 0, studentName: \"$st.name\", courseName: \"$crs.courseName\", grade: 1 } },\n  { $sort: { grade: -1, studentName: 1 } }\n])",
   "logic": "כל שורת הרשמה שעומדת בשלושת התנאים היא שורה בתשובה — אין קיבוץ ואין איחוד. הציון grade יושב על ההרשמה, בעוד מזהה הקורס והסמסטר יושבים על מחזור הקורס; לכן מסננים את הציון לפני הצירוף (יעיל יותר) ואת הקורס והסמסטר אחרי ה-$lookup הראשון.",
   "trap": "שתיים. (1) הוספת DISTINCT או $group \"ליתר ביטחון\" — Noa Cohen קיבלה 91 ב-O501 וגם 97 ב-O502, שני מחזורים של אותו קורס C20; איחוד ירד מ-4 שורות ל-3 וייפסל. (2) שכחת סינון הסמסטר — S103 קיבלה 95 ב-C20 אבל במחזור O509 שהוא 2025B; בלי הסינון התשובה תגדל ל-5 שורות.",
   "compare": "בשתי הגישות \"להציג כל תוצאה בנפרד\" פירושו פשוט לא להפעיל איחוד, אבל ב-SQL הסיכון הוא לכתוב DISTINCT מהרגל, ובמונגו הסיכון הוא ש-$unwind אחרי $lookup ייצור בעצמו שורות נוספות שלא התכוונת אליהן.",
   "slot": "S99",
   "book": {
    "page": 71,
    "where": "הדוגמה הפתורה בכרטיס R-06 — צירוף שלוש טבלאות ויותר"
   }
  },
  "E17": {
   "id": "E17",
   "schema": "exam2",
   "src": "college",
   "title": "קיבוץ עם שני תנאי HAVING",
   "q": "כתבו שאילתה שמציגה לכל בחינה את מזהה הבחינה, סוג הבחינה, מספר הנבחנים וממוצע הציונים. יש לכלול רק בחינות שבהן לפחות 10 תוצאות, ולהציג רק בחינות שבהן הממוצע גדול מ-75. למיין לפי הממוצע בסדר יורד.",
   "keywords": "\"לכל בחינה\" ← GROUP BY. \"מספר הנבחנים והממוצע\" ← COUNT + AVG. \"לכלול רק … לפחות 10 תוצאות\" וגם \"להציג רק … ממוצע גדול מ-75\" ← שני תנאים ב-HAVING מחוברים ב-AND. \"לפחות 10\" ← >= 10, לא > 10.",
   "cols": [
    "examId",
    "examType",
    "examineesCount",
    "avgScore"
   ],
   "sql": "SELECT x.examId, x.examType, COUNT(r.resultId) AS examineesCount, AVG(r.score) AS avgScore\nFROM Exams x\nJOIN ExamResults r ON r.examId = x.examId\nGROUP BY x.examId, x.examType\nHAVING COUNT(r.resultId) >= 10 AND AVG(r.score) > 75\nORDER BY avgScore DESC;",
   "mongo": "db.examResults.aggregate([\n  { $group: { _id: \"$examId\", examineesCount: { $sum: 1 }, avgScore: { $avg: \"$score\" } } },\n  { $match: { examineesCount: { $gte: 10 }, avgScore: { $gt: 75 } } },\n  { $lookup: { from: \"exams\", localField: \"_id\", foreignField: \"examId\", as: \"ex\" } },\n  { $unwind: \"$ex\" },\n  { $project: { _id: 0, examId: \"$_id\", examType: \"$ex.examType\", examineesCount: 1, avgScore: 1 } },\n  { $sort: { avgScore: -1 } }\n])",
   "logic": "כאן המונגו יוצא פשוט יותר: מקבצים את התוצאות לפי examId, מחשבים $sum: 1 (ספירה) ו-$avg באותו שלב, ורק אז מצרפים את Exams כדי לקבל את examType. שני התנאים נכנסים ל-$match אחד שבא אחרי ה-$group — בדיוק מה ש-HAVING עושה. ב-SQL חייבים לכתוב את ביטויי הצבירה שוב בתוך ה-HAVING ולא את הכינוי, כי HAVING מתבצע לפני שהכינויים נוצרים.",
   "trap": "לבדוק רק אחד משני התנאים. הנתונים בנויים כך שכל אחד מהם מפיל בחינה אחרת: X904 ממוצע 97 — הגבוה ביותר — אבל רק 3 תוצאות, ולכן בלי תנאי הספירה הוא יצוץ בראש התשובה; X902 יש לו 10 תוצאות אבל ממוצע 68, ולכן בלי תנאי הממוצע הוא יצוץ בתחתית. מלכודת שנייה: X903 עם בדיוק 10 תוצאות — > 10 במקום >= 10 ימחק אותו, ואיתו את חצי התשובה.",
   "compare": "ב-SQL החישוב והסינון עליו כתובים בשני מקומות (SELECT ו-HAVING) וצריך לחזור על הביטוי, ואילו במונגו החישוב מקבל שם ב-$group ואפשר לסנן לפי השם ב-$match הבא — יתרון קריאות למונגו דווקא במקרה הזה.",
   "slot": "S19",
   "book": {
    "page": 79,
    "where": "הדוגמה הפתורה בכרטיס R-15 — צבירה בתוך HAVING — MAX ו-MIN"
   }
  },
  "X01": {
   "id": "X01",
   "schema": "exam2",
   "src": "extra",
   "pattern": "latest-per-group",
   "title": "ההרשמה האחרונה של כל סטודנט, כולל מי שלא נרשם",
   "q": "כתבו שאילתה המציגה לכל סטודנט את מזהה הסטודנט, שמו, ואת פרטי ההרשמה האחרונה שלו: מזהה ההרשמה, מזהה מחזור הקורס ותאריך ההרשמה. יש לכלול גם סטודנטים שלא נרשמו לאף מחזור קורס. אם לסטודנט שתי הרשמות באותו תאריך, בחרו את זו שמזהה ההרשמה שלה קטן יותר.",
   "keywords": "האחרון לכל → ROW_NUMBER עם PARTITION BY · כולל מי שלא נרשם → LEFT JOIN · שוויון בתאריך → מפתח מיון שני",
   "cols": [
    "studentId",
    "name",
    "enrollmentId",
    "offeringId",
    "enrolledAt"
   ],
   "sql": "WITH ranked AS (\n  SELECT e.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY e.studentId\n      ORDER BY e.enrolledAt DESC, e.enrollmentId ASC\n    ) AS rn\n  FROM Enrollments e\n)\nSELECT s.studentId, s.name,\n       r.enrollmentId, r.offeringId, r.enrolledAt\nFROM Students s\nLEFT JOIN ranked r\n  ON r.studentId = s.studentId AND r.rn = 1;",
   "mongo": "db.students.aggregate([\n  { $lookup: {\n      from: \"enrollments\",\n      let: { sid: \"$studentId\" },\n      pipeline: [\n        { $match: { $expr: { $eq: [\"$studentId\", \"$$sid\"] } } },\n        { $sort: { enrolledAt: -1, enrollmentId: 1 } },\n        { $limit: 1 }\n      ],\n      as: \"last\"\n  } },\n  { $unwind: { path: \"$last\", preserveNullAndEmptyArrays: true } },\n  { $project: {\n      _id: 0, studentId: 1, name: 1,\n      enrollmentId: { $ifNull: [\"$last.enrollmentId\", null] },\n      offeringId:   { $ifNull: [\"$last.offeringId\",   null] },\n      enrolledAt:   { $ifNull: [\"$last.enrolledAt\",   null] }\n  } }\n])",
   "logic": "שלוש דרישות נפרדות באותה שאלה: שורה אחת לכל סטודנט, השורה האחרונה שלו, וגם סטודנט בלי הרשמות. ROW_NUMBER פותר את שתי הראשונות, ו-LEFT JOIN את השלישית.",
   "trap": "התנאי rn = 1 חייב לשבת ב-ON. אם תעבירו אותו ל-WHERE, שני הסטודנטים שלא נרשמו ייעלמו — rn שלהם ריק, והשוואה ל-NULL אינה TRUE. במונגו המקביל הוא preserveNullAndEmptyArrays: בלעדיו $unwind מוחק אותם.",
   "compare": "ב-SQL בוחרים שורה שלמה בפונקציית חלון. במונגו אין פונקציות חלון, ולכן ממיינים בתוך ה-pipeline של ה-$lookup ולוקחים $limit:1 — פעולה נפרדת לכל סטודנט.",
   "edge": "שני הסטודנטים שאין להם הרשמות מופיעים בדיוק פעם אחת, עם שדות הרשמה ריקים. סטודנט עם שתי הרשמות באותו תאריך מחזיר את זו שמזההה קטן.",
   "slot": "S17",
   "book": {
    "page": 90,
    "where": "הדוגמה הפתורה בכרטיס R-25 — האחרון לכל קבוצה — כולל מי שאין לו"
   }
  },
  "X02": {
   "id": "X02",
   "schema": "exam2",
   "src": "extra",
   "pattern": "latest-per-group",
   "title": "ההרשמה האחרונה, רק למי שנרשם",
   "q": "כתבו שאילתה המציגה לכל סטודנט שיש לו לפחות הרשמה אחת את מזהה ההרשמה האחרונה שלו ואת תאריכה.",
   "keywords": "רק למי שיש → מותר להתחיל מההרשמות · האחרון → מיון ואז לקיחת הראשון",
   "cols": [
    "studentId",
    "enrollmentId",
    "enrolledAt"
   ],
   "sql": "WITH ranked AS (\n  SELECT e.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY e.studentId\n      ORDER BY e.enrolledAt DESC, e.enrollmentId ASC\n    ) AS rn\n  FROM Enrollments e\n)\nSELECT studentId, enrollmentId, enrolledAt\nFROM ranked\nWHERE rn = 1;",
   "mongo": "db.enrollments.aggregate([\n  { $sort: { studentId: 1, enrolledAt: -1, enrollmentId: 1 } },\n  { $group: { _id: \"$studentId\", last: { $first: \"$$ROOT\" } } },\n  { $project: { _id: 0, studentId: \"$_id\",\n                enrollmentId: \"$last.enrollmentId\",\n                enrolledAt:   \"$last.enrolledAt\" } }\n])",
   "logic": "כאן אין דרישה לכלול סטודנטים בלי הרשמות, ולכן מותר להתחיל מאוסף ההרשמות — וזה מקצר את הפתרון מאוד. $$ROOT הוא כל המסמך הנוכחי, ו-$first לוקח את הראשון בסדר שהוגדר.",
   "trap": "בלי $sort לפני $group, ה-$first מחזיר מסמך שרירותי. זו טעות שקטה: הקוד רץ, התוצאה נראית סבירה, והיא לא נכונה. והשוו ל-X01 — הבדל של מילה אחת בניסוח (\"כולל מי שלא נרשם\") מחליף את כל התבנית.",
   "compare": "אותה שאלה בדיוק, פחות דרישה אחת — ושני הפתרונות מתקצרים. זה הרווח מזיהוי הדפוס: קודם קובעים אם צריך לשמר ישויות בלי קשרים, ורק אז בוחרים כלים.",
   "edge": "התוצאה מכילה רק את הסטודנטים שנרשמו. שניים שלא נרשמו אינם מופיעים — וזה נכון כאן.",
   "slot": "S17",
   "book": {
    "page": 91,
    "where": "הדוגמה הפתורה בכרטיס R-26 — האחרון לכל קבוצה — רק למי שיש"
   }
  },
  "X03": {
   "id": "X03",
   "schema": "exam2",
   "src": "extra",
   "pattern": "all-satisfy",
   "title": "סטודנטים שכל ציוניהם הידועים מעל 85",
   "q": "כתבו שאילתה המציגה את מזהה הסטודנט ואת שמו, עבור סטודנטים שכל הציונים שנקבעו להם גדולים מ-85. סטודנט שאין לו אף ציון מספרי אינו נכלל. הרשמה שהציון בה טרם נקבע אינה פוסלת את הסטודנט.",
   "keywords": "כולם → \"לא קיים מפר\" · יש לפחות אחד → EXISTS נוסף · טרם נקבע → לא מפר, אבל גם לא נחשב",
   "cols": [
    "studentId",
    "name"
   ],
   "sql": "SELECT s.studentId, s.name\nFROM Students s\nWHERE EXISTS (\n  SELECT 1 FROM Enrollments e\n  WHERE e.studentId = s.studentId AND e.grade IS NOT NULL\n)\nAND NOT EXISTS (\n  SELECT 1 FROM Enrollments e\n  WHERE e.studentId = s.studentId\n    AND e.grade IS NOT NULL AND e.grade <= 85\n);",
   "mongo": "db.students.aggregate([\n  { $lookup: { from: \"enrollments\", localField: \"studentId\",\n               foreignField: \"studentId\", as: \"e\" } },\n  { $addFields: {\n      known: { $filter: { input: \"$e\", as: \"x\",\n               cond: { $ne: [\"$$x.grade\", null] } } }\n  } },\n  { $match: {\n      \"known.0\": { $exists: true },\n      known: { $not: { $elemMatch: { grade: { $lte: 85 } } } }\n  } },\n  { $project: { _id: 0, studentId: 1, name: 1 } }\n])",
   "logic": "את \"כולם\" בודקים בשלילה: אין אף רשומה שמפרה את התנאי. התנאי מורכב משני חלקים — יש לפחות אחד, ואין אף מפר. בלי החלק הראשון, סטודנט בלי ציונים כלל היה עובר, כי אין לו מפר.",
   "trap": "השאלה מבחינה בין \"ציון נמוך\" ובין \"ציון שטרם נקבע\", ולכן שני התנאים מסננים grade IS NOT NULL. אם תשכחו את הסינון בתנאי השני, הרשמה עם ציון ריק לא תיתפס כמפר — וזה נכון כאן. אבל אם תשכחו אותו בתנאי הראשון, סטודנט שכל ציוניו ריקים ייחשב כמי שיש לו ציון.",
   "compare": "ב-SQL: EXISTS יחד עם NOT EXISTS. חלופה תקינה: ‎GROUP BY ... HAVING COUNT(grade) >= 1 AND MIN(grade) > 85‎. במונגו: ‎$filter‎ מצמצם את מערך ההרשמות לאלה שיש בהן ציון, ואז ‎$not‎ מעל ‎$elemMatch‎ מחפש מפר בתוכו.",
   "edge": "סטודנט עם ציונים 92, 88, 95 והרשמה אחת בלי ציון — נכלל. סטודנט עם 90, 84, 95 — נפסל בגלל ה-84. סטודנט שכל שלוש הרשמותיו בלי ציון — נפסל. סטודנט בלי הרשמות — נפסל.",
   "slot": "S18",
   "book": {
    "page": 89,
    "where": "הדוגמה הפתורה בכרטיס R-24 — כולם מקיימים"
   }
  },
  "X04": {
   "id": "X04",
   "schema": "exam2",
   "src": "extra",
   "pattern": "anti-join-period",
   "title": "סטודנטים שלא נרשמו לאף מחזור בסמסטר 2025B",
   "q": "כתבו שאילתה המציגה את מזהה הסטודנט ואת שמו, עבור כל סטודנט שלא נרשם לאף מחזור קורס בסמסטר 2025B. יש לכלול גם סטודנטים שלא נרשמו לאף מחזור קורס בכלל.",
   "keywords": "לא בסמסטר מסוים → NOT EXISTS עם צירוף לסמסטר · כולל מי שלא נרשם כלל → להתחיל מהסטודנטים",
   "cols": [
    "studentId",
    "name"
   ],
   "sql": "SELECT s.studentId, s.name\nFROM Students s\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM Enrollments e\n  JOIN CourseOfferings o ON o.offeringId = e.offeringId\n  WHERE e.studentId = s.studentId\n    AND o.semester = '2025B'\n);",
   "mongo": "db.students.aggregate([\n  { $lookup: { from: \"enrollments\", localField: \"studentId\",\n               foreignField: \"studentId\", as: \"e\" } },\n  { $lookup: { from: \"courseOfferings\", localField: \"e.offeringId\",\n               foreignField: \"offeringId\", as: \"offs\" } },\n  { $match: { \"offs.semester\": { $ne: \"2025B\" } } },\n  { $project: { _id: 0, studentId: 1, name: 1 } }\n])",
   "logic": "התבנית: אספו את כל מה שיכול לפסול את הישות, ואז דרשו שאין בו אף פוסל. הסמסטר אינו שדה של ההרשמה אלא של מחזור הקורס, ולכן צריך שתי קפיצות: סטודנט → הרשמות → מחזורים.",
   "trap": "אל תסננו את הסמסטר אחרי החיבור החיצוני. אם תכתבו ‎LEFT JOIN ... WHERE o.semester <> '2025B'‎, תקבלו כל סטודנט שיש לו הרשמה כלשהי לסמסטר אחר — ולא את מי שאין לו 2025B. ההבדל: \"יש לו משהו אחר\" אינו \"אין לו את זה\".",
   "compare": "ב-SQL תת-השאילתה של NOT EXISTS מכילה את הצירוף ואת התנאי יחד. במונגו יש כאן שני דברים ששווה להכיר: ‎localField‎ יכול להצביע על שדה בתוך מערך (‎\"e.offeringId\"‎) וה-$lookup מתאים לכל איבר בו; ו-‎$ne‎ על שדה של מערך פירושו \"אף איבר אינו שווה\" — בדיוק NOT EXISTS. מסמך שהמערך שלו ריק עובר גם הוא, וזה מה שמשאיר בפנים את מי שלא נרשם כלל.",
   "edge": "סטודנט שנרשם רק ב-2026A נכלל. סטודנט שנרשם גם ב-2026A וגם ב-2025B נפסל. סטודנט בלי הרשמות בכלל נכלל — וזו בדיוק הדרישה שמפילה פתרונות שמתחילים מההרשמות.",
   "slot": "S16",
   "book": {
    "page": 86,
    "where": "הדוגמה הפתורה בכרטיס R-22 — אנטי-צירוף מוגבל לתקופה או לתנאי"
   }
  },
  "X05": {
   "id": "X05",
   "schema": "exam2",
   "src": "extra",
   "pattern": "conditional-count",
   "title": "לכל מחזור: הרשמות, ציונים שנקבעו, ועוברים",
   "q": "כתבו שאילתה המציגה לכל מחזור קורס את מזההו, את מספר ההרשמות אליו, את מספר ההרשמות שהציון בהן נקבע, ואת מספר ההרשמות שהציון בהן 60 ומעלה. מיינו לפי מזהה המחזור.",
   "keywords": "שלושה מדדים על אותה קבוצה · ספירה מותנית → CASE WHEN בתוך SUM · לספור את כולם → COUNT(*)",
   "cols": [
    "offeringId",
    "total",
    "graded",
    "passed"
   ],
   "sql": "SELECT offeringId,\n       COUNT(*) AS total,\n       COUNT(grade) AS graded,\n       SUM(CASE WHEN grade >= 60 THEN 1 ELSE 0 END) AS passed\nFROM Enrollments\nGROUP BY offeringId\nORDER BY offeringId;",
   "mongo": "db.enrollments.aggregate([\n  { $group: {\n      _id: \"$offeringId\",\n      total:  { $sum: 1 },\n      graded: { $sum: { $cond: [\n                 { $ne: [\"$grade\", null] }, 1, 0 ] } },\n      passed: { $sum: { $cond: [\n                 { $gte: [\"$grade\", 60] }, 1, 0 ] } }\n  } },\n  { $project: { _id: 0, offeringId: \"$_id\",\n                total: 1, graded: 1, passed: 1 } },\n  { $sort: { offeringId: 1 } }\n])",
   "logic": "שלוש ספירות שונות על אותה קבוצה, בלי שלוש שאילתות. CASE WHEN הופך תנאי למספר — 1 כשהוא מתקיים, 0 כשלא — ואז SUM סופר את המתקיימים.",
   "trap": "ההבדל בין COUNT(*) ל-COUNT(grade) הוא לב השאלה. COUNT(*) סופר שורות, ולכן גם הרשמה בלי ציון. COUNT(grade) סופר רק ערכים שאינם ריקים. במונגו ‎$sum:1‎ הוא המקביל ל-COUNT(*), ולספירת ציונים שנקבעו צריך ‎$cond‎ מפורש.",
   "compare": "ב-SQL יש קיצור מוכן לספירה שמדלגת על חסרים: ‎COUNT(column)‎. במונגו אין קיצור כזה — כל ספירה מותנית נכתבת כ-‎$cond‎ בתוך ‎$sum‎. בשתי השפות התבנית אחת: ממירים תנאי ל-0/1 ומסכמים.",
   "edge": "מחזור שכל ההרשמות בו בלי ציון מחזיר total גדול מאפס, graded אפס ו-passed אפס. במונגו ‎$gte: [null, 60]‎ מחזיר false ולכן ציון ריק אינו נספר כעובר — וזה תואם את ה-SQL, שבו ‎NULL >= 60‎ אינו TRUE.",
   "slot": "S20",
   "book": {
    "page": 80,
    "where": "הדוגמה הפתורה בכרטיס R-16 — ספירה מותנית — CASE ו-$cond"
   }
  },
  "X06": {
   "id": "X06",
   "schema": "exam2",
   "src": "extra",
   "pattern": "coalesce-case",
   "title": "ציון להצגה ומצב ההרשמה",
   "q": "כתבו שאילתה המציגה לכל הרשמה את מזההה, את הציון להצגה — כאשר ציון שטרם נקבע מוצג כ-0 — ואת מצב ההרשמה: \"Graded\" אם הציון נקבע, ו-\"Pending\" אם לא. מיינו לפי מזהה ההרשמה.",
   "keywords": "להציג חסר כאפס → COALESCE · טקסט לפי תנאי → CASE WHEN",
   "cols": [
    "enrollmentId",
    "displayGrade",
    "gradeState"
   ],
   "sql": "SELECT enrollmentId,\n       COALESCE(grade, 0) AS displayGrade,\n       CASE WHEN grade IS NULL THEN 'Pending'\n            ELSE 'Graded' END AS gradeState\nFROM Enrollments\nORDER BY enrollmentId;",
   "mongo": "db.enrollments.aggregate([\n  { $project: {\n      _id: 0, enrollmentId: 1,\n      displayGrade: { $ifNull: [\"$grade\", 0] },\n      gradeState: { $cond: [\n        { $eq: [\"$grade\", null] }, \"Pending\", \"Graded\" ] }\n  } },\n  { $sort: { enrollmentId: 1 } }\n])",
   "logic": "COALESCE מחזיר את הערך הראשון שאינו ריק, ולכן COALESCE(grade, 0) נותן את הציון כשהוא קיים ואפס כשאינו. CASE WHEN בונה טקסט לפי תנאי. ‎$ifNull‎ ו-‎$cond‎ הם המקבילים המדויקים.",
   "trap": "ברירת מחדל לתצוגה אינה הופכת ציון חסר לציון ידוע. אם אחרי COALESCE תחשבו ממוצע, האפסים ייכנסו לחישוב והממוצע יהיה שגוי. COALESCE מיועד לשורת הפלט, לא לבסיס החישוב.",
   "compare": "שתי השפות מבחינות בין \"אין ערך\" ובין \"ערך אפס\", ושתיהן מאפשרות להציג חסר כאפס רק בפלט. ההבדל: במונגו ‎$ifNull‎ מתייחס גם לשדה שאינו קיים כלל — מצב שאין לו מקבילה ב-SQL.",
   "edge": "חמש ההרשמות שהציון בהן ריק מחזירות displayGrade = 0 ו-gradeState = Pending. הרשמה עם ציון 40 מחזירה 40 ו-Graded — ציון נמוך אינו ציון חסר.",
   "slot": "S12",
   "book": {
    "page": 69,
    "where": "הדוגמה הפתורה בכרטיס R-02 — ערך חסר — IS NULL, COALESCE, CASE"
   }
  },
  "X07": {
   "id": "X07",
   "schema": "exam2",
   "src": "extra",
   "pattern": "computed-sum",
   "title": "סך נקודות הזכות של כל סטודנט בסמסטר 2026A",
   "q": "כתבו שאילתה המציגה לכל סטודנט שנרשם בסמסטר 2026A את מזההו, את שמו ואת סך נקודות הזכות של הקורסים שנרשם אליהם באותו סמסטר. מיינו לפי סך הנקודות בסדר יורד ולאחר מכן לפי מזהה הסטודנט.",
   "keywords": "סך נקודות → SUM על שדה מטבלה שלישית · שרשרת של שלושה צירופים",
   "cols": [
    "studentId",
    "name",
    "totalCredits"
   ],
   "sql": "SELECT s.studentId, s.name, SUM(c.credits) AS totalCredits\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nJOIN Courses c ON c.courseId = o.courseId\nJOIN Students s ON s.studentId = e.studentId\nWHERE o.semester = '2026A'\nGROUP BY s.studentId, s.name\nORDER BY totalCredits DESC, s.studentId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\",\n               foreignField: \"offeringId\", as: \"o\" } },\n  { $unwind: \"$o\" },\n  { $match: { \"o.semester\": \"2026A\" } },\n  { $lookup: { from: \"courses\", localField: \"o.courseId\",\n               foreignField: \"courseId\", as: \"c\" } },\n  { $unwind: \"$c\" },\n  { $group: { _id: \"$studentId\",\n              totalCredits: { $sum: \"$c.credits\" } } },\n  { $lookup: { from: \"students\", localField: \"_id\",\n               foreignField: \"studentId\", as: \"s\" } },\n  { $unwind: \"$s\" },\n  { $project: { _id: 0, studentId: \"$_id\",\n                name: \"$s.name\", totalCredits: 1 } },\n  { $sort: { totalCredits: -1, studentId: 1 } }\n])",
   "logic": "נקודות הזכות יושבות בטבלת הקורסים, אבל ההרשמה מצביעה על מחזור. לכן צריך שתי קפיצות: הרשמה → מחזור → קורס. רק אז יש credits לסכום.",
   "trap": "השדה credits הוא תכונה של הקורס, ולכן אם סטודנט נרשם לשני מחזורים של אותו קורס הנקודות ייספרו פעמיים. אם השאלה מתכוונת לנקודות בפועל, צריך לקבץ קודם לפי קורס — קראו את הניסוח פעמיים.",
   "compare": "בשתי השפות הסדר דומה: מצטמצמים לסמסטר קודם, ואז מחברים. במונגו כל ‎$lookup‎ דורש ‎$unwind‎ אחריו כדי להפוך מערך של התאמה אחת לשדה רגיל — זה המקביל של JOIN פנימי.",
   "edge": "סטודנט שנרשם רק ב-2025B אינו מופיע. סטודנט שנרשם לשני מחזורים של אותו קורס מקבל את הנקודות פעמיים, לפי הניסוח הזה.",
   "slot": "S15",
   "book": {
    "page": 81,
    "where": "הדוגמה הפתורה בכרטיס R-17 — סכום מחושב"
   }
  },
  "X09": {
   "id": "X09",
   "schema": "exam2",
   "src": "extra",
   "pattern": "nullif",
   "title": "ממוצע ציונים מחושב, בלי חלוקה באפס",
   "q": "כתבו שאילתה המציגה לכל מחזור קורס את מזההו, את מספר הציונים שנקבעו בו ואת ממוצע הציונים — מחושב כסכום הציונים חלקי מספרם, בלי שהשאילתה תיכשל כאשר אין אף ציון. מיינו לפי מזהה המחזור.",
   "keywords": "חלוקה בטוחה → NULLIF על המחנה · ממוצע מחושב ביד → SUM חלקי COUNT",
   "cols": [
    "offeringId",
    "gradedCount",
    "avgGrade"
   ],
   "sql": "SELECT offeringId,\n       COUNT(grade) AS gradedCount,\n       SUM(grade) * 1.0 / NULLIF(COUNT(grade), 0) AS avgGrade\nFROM Enrollments\nGROUP BY offeringId\nORDER BY offeringId;",
   "mongo": "db.enrollments.aggregate([\n  { $group: {\n      _id: \"$offeringId\",\n      gradedCount: { $sum: { $cond: [\n                      { $ne: [\"$grade\", null] }, 1, 0 ] } },\n      gradeSum:    { $sum: { $cond: [\n                      { $ne: [\"$grade\", null] }, \"$grade\", 0 ] } }\n  } },\n  { $project: {\n      _id: 0, offeringId: \"$_id\", gradedCount: 1,\n      avgGrade: { $cond: [\n        { $eq: [\"$gradedCount\", 0] }, null,\n        { $divide: [\"$gradeSum\", \"$gradedCount\"] } ] }\n  } },\n  { $sort: { offeringId: 1 } }\n])",
   "logic": "NULLIF(x, 0) מחזיר NULL כאשר x שווה אפס, ולכן החלוקה מחזירה NULL במקום להיכשל. הכפל ב-1.0 מונע חלוקה שלמה במנועים שבהם חלוקת שני שלמים מחזירה שלם.",
   "trap": "אל תחשבו ממוצע כ-‎SUM(grade) / COUNT(*)‎. המחנה חייב להיות מספר הציונים שנקבעו ולא מספר ההרשמות — אחרת כל הרשמה בלי ציון מורידה את הממוצע באופן שגוי.",
   "compare": "ב-SQL יש AVG שעושה את כל זה מעצמו, ומתעלם מ-NULL. השאלה הזאת מבקשת לחשב ביד — וזה מה שחושף איך AVG באמת עובד. במונגו ‎$avg‎ מתנהג כמו AVG, וכאן בנינו את החישוב משלביו כדי להראות את ההבדל.",
   "edge": "מחזור שכל ההרשמות בו בלי ציון מחזיר gradedCount = 0 וממוצע ריק — ולא שגיאת חלוקה באפס. מחזור עם ציון אחד מחזיר את הציון עצמו כממוצע.",
   "slot": "S20",
   "book": {
    "page": 82,
    "where": "הדוגמה הפתורה בכרטיס R-18 — חלוקה בטוחה — NULLIF"
   }
  },
  "X10": {
   "id": "X10",
   "schema": "exam2",
   "src": "extra",
   "pattern": "count-distinct-join",
   "title": "מספר הקורסים השונים שכל סטודנט נרשם אליהם",
   "q": "כתבו שאילתה המציגה לכל סטודנט שנרשם לפחות למחזור אחד את מזההו ואת מספר הקורסים השונים שנרשם אליהם — כאשר שני מחזורים של אותו קורס נספרים פעם אחת. מיינו לפי מספר הקורסים בסדר יורד ולאחר מכן לפי מזהה הסטודנט.",
   "keywords": "כמה שונים → COUNT DISTINCT · שני מחזורים של אותו קורס → נספרים כאחד",
   "cols": [
    "studentId",
    "distinctCourses"
   ],
   "sql": "SELECT e.studentId, COUNT(DISTINCT o.courseId) AS distinctCourses\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nGROUP BY e.studentId\nORDER BY distinctCourses DESC, e.studentId ASC;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\",\n               foreignField: \"offeringId\", as: \"o\" } },\n  { $unwind: \"$o\" },\n  { $group: { _id: \"$studentId\",\n              courses: { $addToSet: \"$o.courseId\" } } },\n  { $project: { _id: 0, studentId: \"$_id\",\n                distinctCourses: { $size: \"$courses\" } } },\n  { $sort: { distinctCourses: -1, studentId: 1 } }\n])",
   "logic": "הסכמה מפרידה בין קורס ובין מחזור קורס, ולכן \"כמה קורסים\" אינו \"כמה הרשמות\". סופרים ערכים ייחודיים של courseId — ולשם כך צריך לקפוץ מההרשמה למחזור.",
   "trap": "במונגו אין ‎COUNT(DISTINCT)‎ בתוך ‎$group‎. התחליף הוא ‎$addToSet‎, שאוסף למערך בלי כפילויות, ואחריו ‎$size‎. מי שיכתוב ‎$sum:1‎ יקבל את מספר ההרשמות ולא את מספר הקורסים.",
   "compare": "שתי השפות מגיעות לאותו מספר בשתי דרכים שונות מהותית: ב-SQL זו פונקציית צבירה אחת, ובמונגו זו בניית קבוצה ואז מדידת גודלה. היתרון של ‎$addToSet‎: אם תרצו גם את הרשימה עצמה, היא כבר בידכם.",
   "edge": "סטודנט שנרשם לשני מחזורים של אותו קורס ועוד קורס אחד מחזיר 2 ולא 3. הרשמה כפולה לאותו מחזור בדיוק אינה משנה את המספר. סטודנטים בלי הרשמות אינם מופיעים.",
   "slot": "S15",
   "book": {
    "page": 74,
    "where": "הדוגמה הפתורה בכרטיס R-09 — COUNT DISTINCT"
   }
  },
  "X11": {
   "id": "X11",
   "schema": "exam2",
   "src": "extra",
   "pattern": "left-join-zero-period",
   "title": "מספר ההרשמות לכל מרצה בסמסטר 2025B, כולל אפס",
   "q": "כתבו שאילתה המציגה לכל מרצה את מזההו, את שמו ואת מספר ההרשמות למחזורים שהוא לימד בסמסטר 2025B. יש לכלול גם מרצים שלא לימדו באותו סמסטר, ולהציג עבורם 0. מיינו לפי מספר ההרשמות בסדר יורד ולאחר מכן לפי מזהה המרצה.",
   "keywords": "כולל אפס → LEFT JOIN · תנאי הסמסטר → בתוך ה-ON ולא ב-WHERE · לספור → על מזהה הצד הימני",
   "cols": [
    "lecturerId",
    "name",
    "enrollmentCount"
   ],
   "sql": "SELECT l.lecturerId, l.name,\n       COUNT(e.enrollmentId) AS enrollmentCount\nFROM Lecturers l\nLEFT JOIN CourseOfferings o\n  ON o.lecturerId = l.lecturerId AND o.semester = '2025B'\nLEFT JOIN Enrollments e\n  ON e.offeringId = o.offeringId\nGROUP BY l.lecturerId, l.name\nORDER BY enrollmentCount DESC, l.lecturerId ASC;",
   "mongo": "db.lecturers.aggregate([\n  { $lookup: {\n      from: \"courseOfferings\",\n      let: { lid: \"$lecturerId\" },\n      pipeline: [\n        { $match: { $expr: { $eq: [\"$lecturerId\", \"$$lid\"] },\n                    semester: \"2025B\" } }\n      ],\n      as: \"offs\"\n  } },\n  { $lookup: { from: \"enrollments\", localField: \"offs.offeringId\",\n               foreignField: \"offeringId\", as: \"e\" } },\n  { $project: {\n      _id: 0, lecturerId: 1, name: 1,\n      enrollmentCount: { $size: \"$e\" }\n  } },\n  { $sort: { enrollmentCount: -1, lecturerId: 1 } }\n])",
   "logic": "שתי דרישות שמתנגשות: לשמר את כל המרצים, ולהגביל את הספירה לסמסטר אחד. הפתרון הוא להכניס את תנאי הסמסטר לתנאי החיבור עצמו — ולא לסינון שאחריו.",
   "trap": "שתי מלכודות בשאלה אחת. ראשית, ‎o.semester = '2025B'‎ ב-WHERE היה מפיל כל מרצה שלא לימד בסמסטר הזה. שנית, ‎COUNT(*)‎ היה נותן 1 לאותם מרצים — כי אחרי LEFT JOIN נשארת להם שורה אחת עם NULL. ‎COUNT(e.enrollmentId)‎ מתעלם מ-NULL ולכן נותן 0.",
   "compare": "ב-SQL זו שרשרת של שני LEFT JOIN, והתנאי יושב ב-ON של הראשון. במונגו ה-$lookup הראשון מצומצם לסמסטר דרך ה-pipeline שלו, והשני מחבר לפי ‎\"offs.offeringId\"‎ — שדה בתוך מערך, שה-$lookup יודע לפרוס. ‎$size‎ על מערך ריק מחזיר 0, וזה מה שנותן את האפסים בלי טיפול מיוחד.",
   "edge": "שלושה מרצים שלא לימדו ב-2025B מחזירים 0. מרצה שלימד מחזור אחד עם שלוש הרשמות מחזיר 3. מרצה שלימד מחזור בלי הרשמות מחזיר 0 גם הוא.",
   "slot": "S16",
   "book": {
    "page": 85,
    "where": "הדוגמה הפתורה בכרטיס R-20 — LEFT JOIN עם תנאי ב-ON"
   }
  },
  "X12": {
   "id": "X12",
   "schema": "exam2",
   "src": "extra",
   "pattern": "exists",
   "title": "סטודנטים שיש להם לפחות ציון אחד מעל 90",
   "q": "כתבו שאילתה המציגה את מזהה הסטודנט ואת שמו, עבור סטודנטים שיש להם לפחות הרשמה אחת שהציון בה גדול מ-90. כל סטודנט פעם אחת בלבד.",
   "keywords": "לפחות אחד → EXISTS · פעם אחת בלבד → EXISTS אינו משכפל",
   "cols": [
    "studentId",
    "name"
   ],
   "sql": "SELECT s.studentId, s.name\nFROM Students s\nWHERE EXISTS (\n  SELECT 1 FROM Enrollments e\n  WHERE e.studentId = s.studentId AND e.grade > 90\n);",
   "mongo": "db.students.aggregate([\n  { $lookup: {\n      from: \"enrollments\",\n      let: { sid: \"$studentId\" },\n      pipeline: [\n        { $match: { $expr: { $eq: [\"$studentId\", \"$$sid\"] },\n                    grade: { $gt: 90 } } },\n        { $limit: 1 }\n      ],\n      as: \"high\"\n  } },\n  { $match: { \"high.0\": { $exists: true } } },\n  { $project: { _id: 0, studentId: 1, name: 1 } }\n])",
   "logic": "EXISTS בודק קיום ועוצר בהתאמה הראשונה. לכן הוא גם אינו משכפל את הסטודנט כשיש לו כמה ציונים גבוהים — בניגוד לצירוף רגיל, שהיה דורש DISTINCT.",
   "trap": "מי שיכתוב ‎JOIN‎ במקום ‎EXISTS‎ יקבל סטודנט עם שני ציונים מעל 90 פעמיים. ובמונגו: ‎$limit:1‎ בתוך ה-pipeline הוא מה שהופך את החיבור לבדיקת קיום ולא לאיסוף כל ההתאמות.",
   "compare": "ב-SQL EXISTS הוא כלי ייעודי לבדיקת קיום. במונגו בונים אותו מחיבור מוגבל ל-‎$limit:1‎ ואז בדיקה שהאיבר הראשון קיים. אותו רעיון, מימוש שונה לגמרי.",
   "edge": "ציון 90 בדיוק אינו נכלל. סטודנט עם שני ציונים מעל 90 מופיע פעם אחת. הרשמה שהציון בה ריק אינה נחשבת, כי ‎NULL > 90‎ אינו TRUE.",
   "slot": "S18",
   "book": {
    "page": 88,
    "where": "הדוגמה הפתורה בכרטיס R-23 — יש לפחות אחד"
   }
  },
  "X13": {
   "id": "X13",
   "schema": "exam2",
   "src": "extra",
   "pattern": "multi-group-having",
   "title": "קורסים שמוצעים ביותר ממחזור אחד באותו סמסטר",
   "q": "כתבו שאילתה המציגה את מזהה הקורס, את הסמסטר ואת מספר המחזורים, עבור כל צירוף של קורס וסמסטר שבו יש יותר ממחזור קורס אחד.",
   "keywords": "צירוף של שני שדות → GROUP BY על שניהם · יותר מאחד → HAVING COUNT(*) ‎> 1",
   "cols": [
    "courseId",
    "semester",
    "offeringCount"
   ],
   "sql": "SELECT courseId, semester, COUNT(*) AS offeringCount\nFROM CourseOfferings\nGROUP BY courseId, semester\nHAVING COUNT(*) > 1;",
   "mongo": "db.courseOfferings.aggregate([\n  { $group: {\n      _id: { courseId: \"$courseId\", semester: \"$semester\" },\n      offeringCount: { $sum: 1 }\n  } },\n  { $match: { offeringCount: { $gt: 1 } } },\n  { $project: { _id: 0,\n      courseId: \"$_id.courseId\",\n      semester: \"$_id.semester\",\n      offeringCount: 1 }\n  }\n])",
   "logic": "הקבוצה אינה שדה אחד אלא צירוף של שניים. ב-SQL פשוט מונים את שני השדות ב-GROUP BY; במונגו ה-‎_id‎ הופך לאובייקט עם שני מפתחות.",
   "trap": "אחרי קיבוץ על אובייקט, השדות נגישים רק דרך ‎$_id.courseId‎ — ולא דרך ‎$courseId‎, שנעלם. זו הטעות הנפוצה: ‎$project‎ שמנסה להציג שדה מקורי שכבר לא קיים אחרי ה-‎$group‎.",
   "compare": "ב-SQL השדות שקובצנו לפיהם נשארים זמינים ב-SELECT כאילו לא קרה דבר. במונגו הם נדחסים לתוך ‎_id‎ וצריך לחלץ אותם בחזרה. זה ההבדל המעשי הגדול ביותר בין GROUP BY ל-‎$group‎.",
   "edge": "קורס שמוצע בשני מחזורים באותו סמסטר נכלל. קורס שמוצע במחזור אחד בכל אחד משני סמסטרים אינו נכלל — הצירוף הוא קורס וסמסטר יחד, ולכן כל צירוף נספר בנפרד.",
   "slot": "S19",
   "book": {
    "page": 74,
    "where": "הדוגמה הפתורה בכרטיס R-10 — קיבוץ על שני שדות"
   }
  },
  "N01": {
   "id": "N01",
   "schema": "ship",
   "src": "new",
   "pattern": "anti-join",
   "title": "משלוחים שנמסרו ואין להם אף שורת פריט",
   "q": "הציגו את המשלוחים שנמסרו (status = Delivered) ושאין להם אף שורה בטבלת ShipmentItems — מזהה המשלוח, מזהה הלקוח ועלות המשלוח.",
   "keywords": "\"שאין להם אף שורה\" ← אנטי-צירוף: LEFT JOIN ואז IS NULL, או NOT EXISTS. \"שנמסרו\" ← תנאי רגיל על המשלוח, ב-WHERE.",
   "cols": [
    "shipmentId",
    "customerId",
    "shippingCost"
   ],
   "sql": "SELECT s.shipmentId, s.customerId, s.shippingCost\nFROM Shipments s\nLEFT JOIN ShipmentItems si ON si.shipmentId = s.shipmentId\nWHERE s.status = 'Delivered'\n  AND si.shipmentId IS NULL;",
   "mongo": "db.shipments.aggregate([\n  { $match: { status: \"Delivered\" } },\n  { $lookup: { from: \"shipmentItems\", localField: \"shipmentId\",\n               foreignField: \"shipmentId\", as: \"items\" } },\n  { $match: { items: { $size: 0 } } },\n  { $project: { _id: 0, shipmentId: 1, customerId: 1, shippingCost: 1 } }\n])",
   "logic": "מתחילים מהמשלוחים, כי הם הישויות שבפלט. LEFT JOIN מביא לכל משלוח את שורות הפריטים שלו, והתנאי IS NULL משאיר רק משלוחים שלא נמצאה להם אף שורה. במונגו ‎$lookup‎ מחזיר מערך, ומערך ריק ‎($size: 0)‎ פירושו שאין למשלוח פריטים.",
   "trap": "LEFT JOIN בלי התנאי IS NULL מחזיר את כל המשלוחים שנמסרו, ו-SH01 יופיע שלוש פעמים, פעם לכל שורת פריט. מלכודת שנייה: לסנן את SH16 בגלל שהעלות שלו NULL. השאלה לא ביקשה זאת.",
   "compare": "ב-SQL \"אין לו\" נבדק בעקיפין, דרך שורת NULL שנוצרת כשהצירוף השמאלי לא מוצא התאמה. במונגו בודקים ישירות שהמערך ריק.",
   "slot": "S13",
   "card": {
    "code": "R-21",
    "page": 86,
    "title": "אנטי-צירוף — מי שאין לו כלום"
   }
  },
  "N02": {
   "id": "N02",
   "schema": "ship",
   "src": "new",
   "pattern": "group-having",
   "title": "מחסנים שממוצע עלות המשלוח שלהם מעל 200",
   "q": "הציגו את המחסנים שממוצע עלות המשלוח של המשלוחים שיצאו מהם גדול מ-200 — מזהה המחסן, שם המחסן והממוצע. משלוח שעלותו טרם חושבה (NULL) אינו נכנס לממוצע.",
   "keywords": "\"ממוצע … לכל מחסן\" ← GROUP BY ו-AVG. \"גדול מ-200\" על הממוצע ← HAVING, ולא WHERE. \"טרם חושבה אינו נכנס\" ← בדיוק מה ש-AVG עושה לבד.",
   "cols": [
    "warehouseId",
    "warehouseName",
    "avgCost"
   ],
   "sql": "SELECT w.warehouseId, w.warehouseName,\n       AVG(s.shippingCost) AS avgCost\nFROM Warehouses w\nJOIN Shipments s ON s.warehouseId = w.warehouseId\nGROUP BY w.warehouseId, w.warehouseName\nHAVING AVG(s.shippingCost) > 200;",
   "mongo": "db.shipments.aggregate([\n  { $group: { _id: \"$warehouseId\", avgCost: { $avg: \"$shippingCost\" } } },\n  { $match: { avgCost: { $gt: 200 } } },\n  { $lookup: { from: \"warehouses\", localField: \"_id\",\n               foreignField: \"warehouseId\", as: \"w\" } },\n  { $unwind: \"$w\" },\n  { $project: { _id: 0, warehouseId: \"$_id\",\n                warehouseName: \"$w.warehouseName\", avgCost: 1 } }\n])",
   "logic": "מקבצים לפי מחסן. AVG מתעלם מ-NULL בעצמו: הוא מחלק את הסכום רק במספר העלויות הידועות. התנאי על הממוצע נבדק אחרי הקיבוץ, ולכן הוא ב-HAVING. במונגו זה ‎$match‎ שבא אחרי ה-‎$group‎.",
   "trap": "חישוב ידני של SUM(shippingCost) / COUNT(*). ‏COUNT(*) סופר גם את המשלוחים בלי עלות, ולכן המכנה גדול מדי. בנתונים זה מוריד את W1 מ-204.4 ל-178.9 ואת W4 מ-226 ל-188.3, ושניהם נעלמים מהתוצאה.",
   "compare": "בשתי השפות פונקציית הממוצע מתעלמת מערכים ריקים. ההבדל הוא במיקום התנאי: ב-SQL הוא יושב במילת מפתח נפרדת (HAVING), ובמונגו באותו ‎$match‎, רק אחרי ה-‎$group‎.",
   "slot": "S14",
   "card": {
    "code": "R-13",
    "page": 77,
    "title": "תנאי על תוצאת קיבוץ"
   }
  },
  "N03": {
   "id": "N03",
   "schema": "ship",
   "src": "new",
   "pattern": "latest-per-group",
   "title": "המשלוח האחרון של כל לקוח, כולל לקוחות בלי משלוחים",
   "q": "הציגו לכל לקוח את מזהה הלקוח, שמו, ואת המשלוח האחרון שלו לפי זמן היצירה: מזהה המשלוח וזמן היצירה. יש לכלול גם לקוחות שאין להם אף משלוח. אם יש שני משלוחים באותו זמן, בחרו את זה שמזהה המשלוח שלו קטן יותר.",
   "keywords": "\"האחרון של כל לקוח\" ← ROW_NUMBER עם PARTITION BY. \"כולל לקוחות שאין להם\" ← LEFT JOIN, והתנאי rn = 1 בתוך ה-ON. \"באותו זמן … הקטן\" ← מפתח מיון שני.",
   "cols": [
    "customerId",
    "customerName",
    "shipmentId",
    "createdAt"
   ],
   "sql": "WITH ranked AS (\n  SELECT s.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY s.customerId\n      ORDER BY s.createdAt DESC, s.shipmentId ASC\n    ) AS rn\n  FROM Shipments s\n)\nSELECT c.customerId, c.customerName,\n       r.shipmentId, r.createdAt\nFROM Customers c\nLEFT JOIN ranked r\n  ON r.customerId = c.customerId AND r.rn = 1;",
   "mongo": "db.customers.aggregate([\n  { $lookup: {\n      from: \"shipments\",\n      let: { cid: \"$customerId\" },\n      pipeline: [\n        { $match: { $expr: { $eq: [\"$customerId\", \"$$cid\"] } } },\n        { $sort: { createdAt: -1, shipmentId: 1 } },\n        { $limit: 1 }\n      ],\n      as: \"last\"\n  } },\n  { $unwind: { path: \"$last\", preserveNullAndEmptyArrays: true } },\n  { $project: { _id: 0, customerId: 1, customerName: 1,\n                shipmentId: { $ifNull: [\"$last.shipmentId\", null] },\n                createdAt:  { $ifNull: [\"$last.createdAt\",  null] } } }\n])",
   "logic": "יש כאן שלוש דרישות: שורה אחת לכל לקוח, המשלוח האחרון שלו, וגם לקוח בלי משלוחים. ROW_NUMBER ממספר את המשלוחים של כל לקוח מהחדש לישן, ו-LEFT JOIN על rn = 1 שומר גם לקוח שאין לו משלוחים. במונגו ממיינים בתוך ה-pipeline של ה-‎$lookup‎ ולוקחים ‎$limit: 1‎.",
   "trap": "rn = 1 ב-WHERE במקום ב-ON: ללקוח C3 אין משלוחים, ולכן rn שלו ריק, ההשוואה אינה מחזירה TRUE, והוא נעלם. במונגו אותה טעות היא ‎$unwind‎ בלי ‎preserveNullAndEmptyArrays‎, שמוחק אותו באותה צורה.",
   "compare": "ב-SQL בוחרים שורה שלמה בפונקציית חלון. במונגו אין פונקציית חלון פשוטה, ולכן ממיינים ולוקחים את הראשון בתוך ה-‎$lookup‎ של כל לקוח.",
   "slot": "S17",
   "card": {
    "code": "R-26",
    "page": 91,
    "title": "האחרון לכל קבוצה — רק למי שיש"
   }
  },
  "N04": {
   "id": "N04",
   "schema": "exam2",
   "src": "new",
   "pattern": "latest-per-group",
   "title": "המחזור האחרון של כל קורס",
   "q": "הציגו לכל קורס את מזהה הקורס, שם הקורס, ואת המחזור האחרון שלו: מזהה המחזור והסמסטר. המחזור האחרון הוא המחזור שהסמסטר שלו המאוחר ביותר. אם לקורס כמה מחזורים באותו סמסטר, בחרו את המחזור עם הקיבולת הגדולה ביותר.",
   "keywords": "\"האחרון של כל קורס\" ← ROW_NUMBER עם PARTITION BY courseId. \"כמה מחזורים באותו סמסטר … הקיבולת הגדולה\" ← מפתח מיון שני שמכריע בתיקו.",
   "cols": [
    "courseId",
    "courseName",
    "offeringId",
    "semester"
   ],
   "sql": "WITH ranked AS (\n  SELECT o.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY o.courseId\n      ORDER BY o.semester DESC, o.capacity DESC, o.offeringId ASC\n    ) AS rn\n  FROM CourseOfferings o\n)\nSELECT c.courseId, c.courseName, r.offeringId, r.semester\nFROM Courses c\nJOIN ranked r ON r.courseId = c.courseId AND r.rn = 1;",
   "mongo": "db.courseOfferings.aggregate([\n  { $sort: { courseId: 1, semester: -1, capacity: -1, offeringId: 1 } },\n  { $group: { _id: \"$courseId\", last: { $first: \"$$ROOT\" } } },\n  { $lookup: { from: \"courses\", localField: \"_id\",\n               foreignField: \"courseId\", as: \"c\" } },\n  { $unwind: \"$c\" },\n  { $project: { _id: 0, courseId: \"$_id\", courseName: \"$c.courseName\",\n                offeringId: \"$last.offeringId\", semester: \"$last.semester\" } }\n])",
   "logic": "ממספרים את המחזורים של כל קורס מהסמסטר המאוחר לקודם, ובתוך אותו סמסטר מהקיבולת הגדולה לקטנה. לוקחים את המחזור שקיבל את המספר 1. במונגו ‎$sort‎ ואחריו ‎$group‎ עם ‎$first‎ עושים את אותו הדבר.",
   "trap": "MAX(semester) ב-GROUP BY ואז צירוף חזרה לפי הסמסטר. לקורס C20 יש שני מחזורים ב-2026A ‏(O501 ו-O502), ושניהם יחזרו, כך שמתקבלות 9 שורות במקום 8. רק ROW_NUMBER, או מיון ואחריו ‎$first‎, מכריעים בתיקו.",
   "compare": "ב-SQL פונקציית החלון בוחרת שורה שלמה. במונגו עושים זאת בשני שלבים: מיון, ואז ‎$first‎ בתוך הקבוצה. בלי ה-‎$sort‎ שלפניו, ה-‎$first‎ מחזיר מסמך שרירותי.",
   "slot": "S17",
   "card": {
    "code": "R-26",
    "page": 91,
    "title": "האחרון לכל קבוצה — רק למי שיש"
   }
  },
  "N05": {
   "id": "N05",
   "schema": "ship",
   "src": "new",
   "pattern": "double-having",
   "title": "שליחים עם 5 משלוחים לפחות בספטמבר וסכום מעל 1000",
   "q": "הציגו את השליחים שיצרו לפחות 5 משלוחים בספטמבר 2026, ושסך עלויות המשלוח שלהם בספטמבר גדול מ-1000 — מזהה השליח, שמו, מספר המשלוחים וסך העלויות. משלוח שעלותו NULL נספר במספר המשלוחים.",
   "keywords": "\"בספטמבר 2026\" ← WHERE עם טווח חצי-פתוח, לפני הקיבוץ. \"לפחות 5 … וסך … מעל 1000\" ← שני תנאים ב-HAVING, מחוברים ב-AND. \"NULL נספר\" ← COUNT(*) ולא COUNT(shippingCost).",
   "cols": [
    "courierId",
    "courierName",
    "shipmentsCount",
    "totalCost"
   ],
   "sql": "SELECT k.courierId, k.courierName,\n       COUNT(*)            AS shipmentsCount,\n       SUM(s.shippingCost) AS totalCost\nFROM Couriers k\nJOIN Shipments s ON s.courierId = k.courierId\nWHERE s.createdAt >= '2026-09-01'\n  AND s.createdAt <  '2026-10-01'\nGROUP BY k.courierId, k.courierName\nHAVING COUNT(*) >= 5\n   AND SUM(s.shippingCost) > 1000;",
   "mongo": "db.shipments.aggregate([\n  { $match: { createdAt: { $gte: ISODate(\"2026-09-01T00:00:00Z\"),\n                           $lt:  ISODate(\"2026-10-01T00:00:00Z\") } } },\n  { $group: { _id: \"$courierId\",\n              shipmentsCount: { $sum: 1 },\n              totalCost: { $sum: \"$shippingCost\" } } },\n  { $match: { shipmentsCount: { $gte: 5 }, totalCost: { $gt: 1000 } } },\n  { $lookup: { from: \"couriers\", localField: \"_id\",\n               foreignField: \"courierId\", as: \"k\" } },\n  { $unwind: \"$k\" },\n  { $project: { _id: 0, courierId: \"$_id\", courierName: \"$k.courierName\",\n                shipmentsCount: 1, totalCost: 1 } }\n])",
   "logic": "שלושה סינונים בשני שלבים. התקופה היא תנאי על כל משלוח, ולכן היא נבדקת לפני הקיבוץ. שני התנאים האחרים הם על הקבוצה, ולכן הם נבדקים אחריו. במונגו: ‎$match‎ ראשון לתקופה, ‎$group‎ שמחשב גם ספירה וגם סכום, ו-‎$match‎ שני לשני התנאים.",
   "trap": "COUNT(shippingCost) במקום COUNT(*): לשליח K5 יש בספטמבר שני משלוחים בלי עלות, ולכן הספירה תחזיר 4 והוא ייפול. מלכודת שנייה: לשכוח את תנאי התקופה. אז SH04 של K1, מאוקטובר, נכנס לחישוב.",
   "compare": "ב-SQL חוזרים על הביטוי עצמו בתוך ה-HAVING. במונגו החישוב מקבל שם ב-‎$group‎, ומסננים לפי השם ב-‎$match‎ הבא. ‏‎$sum: 1‎ סופר כל מסמך, בדיוק כמו COUNT(*).",
   "slot": "S19",
   "card": {
    "code": "R-14",
    "page": 78,
    "title": "שני תנאי קבוצה יחד"
   }
  },
  "N06": {
   "id": "N06",
   "schema": "ship",
   "src": "new",
   "pattern": "double-having",
   "title": "לקוחות עם 3 משלוחים שנמסרו לפחות וממוצע מעל 160",
   "q": "התחשבו רק במשלוחים שנמסרו (status = Delivered). הציגו את הלקוחות שיש להם לפחות 3 משלוחים כאלה, ושממוצע עלות המשלוח שלהם גדול מ-160 — מזהה הלקוח, שמו, מספר המשלוחים והממוצע. משלוח שנמסר בלי עלות נספר במספר המשלוחים, אבל לא נכנס לממוצע.",
   "keywords": "\"רק משלוחים שנמסרו\" ← WHERE, לפני הקיבוץ. \"לפחות 3 … וממוצע מעל 160\" ← שני תנאים ב-HAVING. \"נספר … אבל לא נכנס לממוצע\" ← COUNT(*) יחד עם AVG, שמתעלם מ-NULL.",
   "cols": [
    "customerId",
    "customerName",
    "shipmentsCount",
    "avgCost"
   ],
   "sql": "SELECT c.customerId, c.customerName,\n       COUNT(*)            AS shipmentsCount,\n       AVG(s.shippingCost) AS avgCost\nFROM Customers c\nJOIN Shipments s ON s.customerId = c.customerId\nWHERE s.status = 'Delivered'\nGROUP BY c.customerId, c.customerName\nHAVING COUNT(*) >= 3\n   AND AVG(s.shippingCost) > 160;",
   "mongo": "db.shipments.aggregate([\n  { $match: { status: \"Delivered\" } },\n  { $group: { _id: \"$customerId\",\n              shipmentsCount: { $sum: 1 },\n              avgCost: { $avg: \"$shippingCost\" } } },\n  { $match: { shipmentsCount: { $gte: 3 }, avgCost: { $gt: 160 } } },\n  { $lookup: { from: \"customers\", localField: \"_id\",\n               foreignField: \"customerId\", as: \"c\" } },\n  { $unwind: \"$c\" },\n  { $project: { _id: 0, customerId: \"$_id\", customerName: \"$c.customerName\",\n                shipmentsCount: 1, avgCost: 1 } }\n])",
   "logic": "המבנה זהה לשאלה 19 במבחן: סינון שורות, קיבוץ ושני תנאי קבוצה. ההבדל הוא שכאן אחד התנאים הוא ממוצע, ולכן אין צורך לחשב אותו ביד.",
   "trap": "COUNT(shippingCost) במקום COUNT(*): ל-C9 יש שלושה משלוחים שנמסרו, ולאחד מהם אין עלות. ספירת העמודה תחזיר 2, ו-C9 ייפול על התנאי \"לפחות 3\".",
   "compare": "‏AVG ו-‎$avg‎ מתנהגים אותו דבר מול ערך ריק: שניהם מדלגים עליו. ההבדל הוא בספירה: COUNT(*) ו-‎$sum: 1‎ סופרים כל שורה, ו-COUNT(עמודה) מדלג על NULL.",
   "slot": "S19",
   "card": {
    "code": "R-14",
    "page": 78,
    "title": "שני תנאי קבוצה יחד"
   }
  },
  "N07": {
   "id": "N07",
   "schema": "exam2",
   "src": "new",
   "pattern": "double-having",
   "title": "מרצים עם 2 מחזורים לפחות ב-2026A וקיבולת כוללת 80 ומעלה",
   "q": "הציגו את המרצים שמלמדים לפחות 2 מחזורי קורס בסמסטר 2026A, ושהקיבולת הכוללת של המחזורים שלהם בסמסטר הזה היא 80 ומעלה — מזהה המרצה, שמו, מספר המחזורים והקיבולת הכוללת.",
   "keywords": "\"בסמסטר 2026A\" ← WHERE, לפני הקיבוץ. \"לפחות 2 … וקיבולת כוללת 80 ומעלה\" ← HAVING עם COUNT ועם SUM. \"ומעלה\" ← >=.",
   "cols": [
    "lecturerId",
    "name",
    "offeringsCount",
    "totalCapacity"
   ],
   "sql": "SELECT l.lecturerId, l.name,\n       COUNT(*)        AS offeringsCount,\n       SUM(o.capacity) AS totalCapacity\nFROM Lecturers l\nJOIN CourseOfferings o ON o.lecturerId = l.lecturerId\nWHERE o.semester = '2026A'\nGROUP BY l.lecturerId, l.name\nHAVING COUNT(*) >= 2\n   AND SUM(o.capacity) >= 80;",
   "mongo": "db.courseOfferings.aggregate([\n  { $match: { semester: \"2026A\" } },\n  { $group: { _id: \"$lecturerId\",\n              offeringsCount: { $sum: 1 },\n              totalCapacity: { $sum: \"$capacity\" } } },\n  { $match: { offeringsCount: { $gte: 2 }, totalCapacity: { $gte: 80 } } },\n  { $lookup: { from: \"lecturers\", localField: \"_id\",\n               foreignField: \"lecturerId\", as: \"l\" } },\n  { $unwind: \"$l\" },\n  { $project: { _id: 0, lecturerId: \"$_id\", name: \"$l.name\",\n                offeringsCount: 1, totalCapacity: 1 } }\n])",
   "logic": "הסמסטר הוא תנאי על כל מחזור בנפרד, ולכן הוא נבדק לפני הקיבוץ. הספירה והסכום הם תנאים על הקבוצה, ולכן הם ב-HAVING.",
   "trap": "שכחת תנאי הסמסטר: אז ל-L5 יש שני מחזורים, O506 ב-2026A ו-O510 ב-2025B, עם קיבולת כוללת של 90, והוא נכנס לתוצאה בטעות. מלכודת שנייה: לשים את תנאי הסמסטר ב-HAVING. ב-SQL Server זו שגיאה, כי semester אינו מופיע ב-GROUP BY.",
   "compare": "בשתי השפות סדר הפעולות זהה: סינון שורות, קיבוץ, וסינון קבוצות. ב-SQL אלה WHERE ו-HAVING, ובמונגו שני שלבי ‎$match‎, אחד לפני ה-‎$group‎ ואחד אחריו.",
   "slot": "S19",
   "card": {
    "code": "R-14",
    "page": 78,
    "title": "שני תנאי קבוצה יחד"
   }
  },
  "N08": {
   "id": "N08",
   "schema": "exam2",
   "src": "new",
   "pattern": "aggregate-in-having",
   "title": "סטודנטים עם 2 הרשמות לפחות, שכולן מפברואר 2026 ואילך",
   "q": "הציגו את הסטודנטים שיש להם לפחות 2 הרשמות, ושכל ההרשמות שלהם בוצעו ב-1 בפברואר 2026 או אחריו — מזהה הסטודנט, שמו ומספר ההרשמות. סטודנט שיש לו אפילו הרשמה אחת מלפני פברואר אינו נכלל.",
   "keywords": "\"כל ההרשמות … אחרי\" ← תנאי על כל הקבוצה: MIN(enrolledAt) >= התאריך, ב-HAVING. \"לפחות 2\" ← COUNT(*) באותו HAVING. אסור לסנן את התאריך ב-WHERE.",
   "cols": [
    "studentId",
    "name",
    "enrollmentsCount"
   ],
   "sql": "SELECT s.studentId, s.name,\n       COUNT(*) AS enrollmentsCount\nFROM Students s\nJOIN Enrollments e ON e.studentId = s.studentId\nGROUP BY s.studentId, s.name\nHAVING COUNT(*) >= 2\n   AND MIN(e.enrolledAt) >= '2026-02-01';",
   "mongo": "db.enrollments.aggregate([\n  { $group: { _id: \"$studentId\",\n              enrollmentsCount: { $sum: 1 },\n              firstAt: { $min: \"$enrolledAt\" } } },\n  { $match: { enrollmentsCount: { $gte: 2 },\n              firstAt: { $gte: ISODate(\"2026-02-01T00:00:00Z\") } } },\n  { $lookup: { from: \"students\", localField: \"_id\",\n               foreignField: \"studentId\", as: \"s\" } },\n  { $unwind: \"$s\" },\n  { $project: { _id: 0, studentId: \"$_id\", name: \"$s.name\", enrollmentsCount: 1 } }\n])",
   "logic": "\"כל ההרשמות אחרי התאריך\" שקול ל\"ההרשמה הראשונה אחרי התאריך\". לכן מחשבים את ההרשמה המוקדמת ביותר של כל סטודנט (MIN) ובודקים אותה ב-HAVING, יחד עם הספירה. זה אותו דפוס כמו בשאלה 20 במבחן: COUNT יחד עם MAX או MIN בתוך HAVING.",
   "trap": "סינון התאריך ב-WHERE: ההרשמות מינואר נמחקות לפני הספירה, ו-S102, S103 ו-S106 נכנסים לתוצאה בטעות. הם נרשמו גם בינואר, ולכן לא כל ההרשמות שלהם מפברואר. כך מתקבלות 10 שורות במקום 7.",
   "compare": "ב-SQL כותבים MIN בתוך HAVING. במונגו מחשבים ‎$min‎ ב-‎$group‎, נותנים לו שם ומסננים לפיו ב-‎$match‎ הבא.",
   "slot": "S20",
   "card": {
    "code": "R-15",
    "page": 79,
    "title": "צבירה בתוך HAVING — MAX ו-MIN"
   }
  },
  "N09": {
   "id": "N09",
   "schema": "ship",
   "src": "new",
   "pattern": "latest-per-group",
   "title": "המשלוח היקר ביותר מכל מחסן",
   "q": "הציגו לכל מחסן שיצאו ממנו משלוחים עם עלות ידועה את המשלוח היקר ביותר שיצא ממנו — מזהה המחסן, שם המחסן, מזהה המשלוח ועלות המשלוח. משלוח שעלותו NULL אינו נחשב. אם יש שוויון, בחרו את המשלוח שמזהה שלו קטן יותר.",
   "keywords": "\"היקר ביותר מכל מחסן\" ← שורה אחת לכל קבוצה, עם פרטים מהשורה עצמה. לכן ROW_NUMBER, ולא רק MAX. \"עלות NULL אינו נחשב\" ← WHERE shippingCost IS NOT NULL.",
   "cols": [
    "warehouseId",
    "warehouseName",
    "shipmentId",
    "shippingCost"
   ],
   "sql": "WITH ranked AS (\n  SELECT s.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY s.warehouseId\n      ORDER BY s.shippingCost DESC, s.shipmentId ASC\n    ) AS rn\n  FROM Shipments s\n  WHERE s.shippingCost IS NOT NULL\n)\nSELECT w.warehouseId, w.warehouseName, r.shipmentId, r.shippingCost\nFROM Warehouses w\nJOIN ranked r ON r.warehouseId = w.warehouseId AND r.rn = 1;",
   "mongo": "db.shipments.aggregate([\n  { $match: { shippingCost: { $ne: null } } },\n  { $sort: { warehouseId: 1, shippingCost: -1, shipmentId: 1 } },\n  { $group: { _id: \"$warehouseId\", top: { $first: \"$$ROOT\" } } },\n  { $lookup: { from: \"warehouses\", localField: \"_id\",\n               foreignField: \"warehouseId\", as: \"w\" } },\n  { $unwind: \"$w\" },\n  { $project: { _id: 0, warehouseId: \"$_id\", warehouseName: \"$w.warehouseName\",\n                shipmentId: \"$top.shipmentId\", shippingCost: \"$top.shippingCost\" } }\n])",
   "logic": "זה אותו דפוס כמו \"האחרון לכל קבוצה\", רק שהמיון הוא לפי עלות ולא לפי זמן. MAX(shippingCost) לבד נותן את הסכום הגבוה, אבל לא את מזהה המשלוח. בשביל המזהה צריך לבחור את השורה כולה.",
   "trap": "GROUP BY warehouseId עם MAX(shippingCost), ו-shipmentId ב-SELECT. ב-SQL Server זו שגיאה, ובמנועים אחרים מתקבל מזהה שרירותי. מלכודת שנייה: לא לסנן NULL. אז גם מחסן שכל משלוחיו בלי עלות היה מופיע בתוצאה.",
   "compare": "ב-SQL: ROW_NUMBER, או תת-שאילתה שמחזירה את ה-MAX ואחריה צירוף חזרה. במונגו: ‎$sort‎, ואחריו ‎$group‎ עם ‎$first: \"$$ROOT\"‎.",
   "slot": "S17",
   "card": {
    "code": "R-26",
    "page": 91,
    "title": "האחרון לכל קבוצה — רק למי שיש"
   }
  },
  "N10": {
   "id": "N10",
   "schema": "ship",
   "src": "new",
   "pattern": "latest-per-group",
   "title": "המשלוח האחרון שבו נשלח כל פריט",
   "q": "הציגו לכל פריט שנשלח לפחות פעם אחת את המשלוח האחרון שבו הוא נשלח, לפי זמן יצירת המשלוח — מזהה הפריט, שם הפריט, מזהה המשלוח וזמן היצירה. אם יש שני משלוחים באותו זמן, בחרו את זה שמזהה המשלוח שלו קטן יותר.",
   "keywords": "\"האחרון שבו … לכל פריט\" ← ROW_NUMBER עם PARTITION BY itemId. הזמן יושב על Shipments והפריט על ShipmentItems ← קודם צירוף, ואז הדירוג. \"שנשלח לפחות פעם אחת\" ← INNER JOIN מספיק.",
   "cols": [
    "itemId",
    "itemName",
    "shipmentId",
    "createdAt"
   ],
   "sql": "WITH ranked AS (\n  SELECT si.itemId, s.shipmentId, s.createdAt,\n    ROW_NUMBER() OVER (\n      PARTITION BY si.itemId\n      ORDER BY s.createdAt DESC, s.shipmentId ASC\n    ) AS rn\n  FROM ShipmentItems si\n  JOIN Shipments s ON s.shipmentId = si.shipmentId\n)\nSELECT i.itemId, i.itemName, r.shipmentId, r.createdAt\nFROM Items i\nJOIN ranked r ON r.itemId = i.itemId AND r.rn = 1;",
   "mongo": "db.shipmentItems.aggregate([\n  { $lookup: { from: \"shipments\", localField: \"shipmentId\",\n               foreignField: \"shipmentId\", as: \"s\" } },\n  { $unwind: \"$s\" },\n  { $sort: { itemId: 1, \"s.createdAt\": -1, shipmentId: 1 } },\n  { $group: { _id: \"$itemId\", last: { $first: \"$s\" } } },\n  { $lookup: { from: \"items\", localField: \"_id\",\n               foreignField: \"itemId\", as: \"i\" } },\n  { $unwind: \"$i\" },\n  { $project: { _id: 0, itemId: \"$_id\", itemName: \"$i.itemName\",\n                shipmentId: \"$last.shipmentId\", createdAt: \"$last.createdAt\" } }\n])",
   "logic": "הנתון שלפיו ממיינים (זמן היצירה) נמצא בטבלה אחרת מהקבוצה (הפריט), ולכן קודם מצרפים את ShipmentItems ל-Shipments, ורק אחר כך מדרגים בתוך כל פריט. במונגו: ‎$lookup‎ ו-‎$unwind‎, ואז ‎$sort‎ ו-‎$group‎ עם ‎$first‎.",
   "trap": "GROUP BY itemId עם MAX(createdAt) נותן את הזמן, אבל לא את מזהה המשלוח. ניסיון להוסיף את shipmentId ל-GROUP BY מחזיר שורה לכל משלוח, ולא שורה לכל פריט. מלכודת שנייה: ב-SH01 הפריט I1 מופיע בשתי שורות, ובלי דירוג אמיתי הוא עלול להופיע פעמיים.",
   "compare": "ב-SQL הצירוף נכנס לתוך ה-CTE, ופונקציית החלון רצה על התוצאה המצורפת. במונגו הסדר זהה: קודם ‎$lookup‎, ורק אחריו ‎$sort‎ על שדה מהמסמך המצורף ‎(\"s.createdAt\")‎.",
   "slot": "S17",
   "card": {
    "code": "R-26",
    "page": 91,
    "title": "האחרון לכל קבוצה — רק למי שיש"
   }
  },
  "N11": {
   "id": "N11",
   "schema": "exam2",
   "src": "new",
   "pattern": "latest-per-group",
   "title": "תוצאת הבחינה הגבוהה ביותר של כל סטודנט",
   "q": "הציגו לכל סטודנט שיש לו לפחות תוצאת בחינה אחת את התוצאה הגבוהה ביותר שלו — מזהה הסטודנט, מזהה התוצאה, מזהה הבחינה והציון. אם יש שתי תוצאות עם אותו ציון, בחרו את זו שמזהה התוצאה שלה קטן יותר.",
   "keywords": "\"הגבוהה ביותר של כל סטודנט\" ← שורה אחת לכל קבוצה, עם פרטים מהשורה עצמה ← ROW_NUMBER, ולא רק MAX. \"אותו ציון … המזהה הקטן\" ← מפתח מיון שני.",
   "cols": [
    "studentId",
    "resultId",
    "examId",
    "score"
   ],
   "sql": "WITH ranked AS (\n  SELECT r.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY r.studentId\n      ORDER BY r.score DESC, r.resultId ASC\n    ) AS rn\n  FROM ExamResults r\n)\nSELECT studentId, resultId, examId, score\nFROM ranked\nWHERE rn = 1;",
   "mongo": "db.examResults.aggregate([\n  { $sort: { studentId: 1, score: -1, resultId: 1 } },\n  { $group: { _id: \"$studentId\", top: { $first: \"$$ROOT\" } } },\n  { $project: { _id: 0, studentId: \"$_id\", resultId: \"$top.resultId\",\n                examId: \"$top.examId\", score: \"$top.score\" } }\n])",
   "logic": "זה \"האחרון לכל קבוצה\" עם מיון לפי ציון במקום לפי זמן. כאן לא צריך לכלול סטודנטים בלי תוצאות, ולכן מותר להתחיל ישר מ-ExamResults, בלי LEFT JOIN, ולסנן rn = 1 ב-WHERE.",
   "trap": "MAX(score) עם GROUP BY studentId נותן את הציון, אבל לא את מזהה התוצאה ואת מזהה הבחינה. צירוף חזרה לפי הציון יחזיר שתי שורות לסטודנט שקיבל את אותו ציון בשתי בחינות.",
   "compare": "ב-SQL זו פונקציית חלון אחת. במונגו ‎$sort‎ על שלושה מפתחות, ואחריו ‎$group‎ עם ‎$first: \"$$ROOT\"‎. בלי ה-‎$sort‎ שלפני, ה-‎$first‎ שרירותי.",
   "slot": "S17",
   "card": {
    "code": "R-26",
    "page": 91,
    "title": "האחרון לכל קבוצה — רק למי שיש"
   }
  },
  "N12": {
   "id": "N12",
   "schema": "ship",
   "src": "new",
   "pattern": "aggregate-in-having",
   "title": "לקוחות עם 3 משלוחים לפחות, שהזול שבהם עלה יותר מ-100",
   "q": "הציגו את הלקוחות שיש להם לפחות 3 משלוחים, ושהמשלוח הזול ביותר שלהם (מבין המשלוחים שהעלות שלהם ידועה) עלה יותר מ-100 — מזהה הלקוח, שמו, מספר המשלוחים והעלות הנמוכה ביותר. משלוח בלי עלות נספר במספר המשלוחים.",
   "keywords": "\"הזול ביותר … יותר מ-100\" ← תנאי על כל הקבוצה: MIN(shippingCost) > 100, ב-HAVING. \"לפחות 3\" ← COUNT(*) באותו HAVING. אסור לסנן את העלות ב-WHERE.",
   "cols": [
    "customerId",
    "customerName",
    "shipmentsCount",
    "minCost"
   ],
   "sql": "SELECT c.customerId, c.customerName,\n       COUNT(*)            AS shipmentsCount,\n       MIN(s.shippingCost) AS minCost\nFROM Customers c\nJOIN Shipments s ON s.customerId = c.customerId\nGROUP BY c.customerId, c.customerName\nHAVING COUNT(*) >= 3\n   AND MIN(s.shippingCost) > 100;",
   "mongo": "db.shipments.aggregate([\n  { $group: { _id: \"$customerId\",\n              shipmentsCount: { $sum: 1 },\n              minCost: { $min: \"$shippingCost\" } } },\n  { $match: { shipmentsCount: { $gte: 3 }, minCost: { $gt: 100 } } },\n  { $lookup: { from: \"customers\", localField: \"_id\",\n               foreignField: \"customerId\", as: \"c\" } },\n  { $unwind: \"$c\" },\n  { $project: { _id: 0, customerId: \"$_id\", customerName: \"$c.customerName\",\n                shipmentsCount: 1, minCost: 1 } }\n])",
   "logic": "\"כל המשלוחים עלו יותר מ-100\" שקול ל\"הזול שבהם עלה יותר מ-100\". לכן מחשבים MIN לכל לקוח ובודקים אותו ב-HAVING, יחד עם הספירה. MIN מתעלם מ-NULL, ו-COUNT(*) סופר כל משלוח. בדיוק מה שהשאלה ביקשה.",
   "trap": "סינון WHERE shippingCost > 100 לפני הקיבוץ: המשלוחים בלי עלות נמחקים לפני הספירה, ו-C1 ו-C9 יורדים ל-2 משלוחים ונפסלים. אותה מלכודת כמו בשאלה 20 במבחן: תנאי על \"כולם\" שייך ל-HAVING, לא ל-WHERE.",
   "compare": "ב-SQL כותבים MIN בתוך HAVING. במונגו ‎$min‎ ב-‎$group‎, ואז ‎$match‎ על השם שנתתם לו. גם ‎$min‎ מדלג על null.",
   "slot": "S20",
   "card": {
    "code": "R-15",
    "page": 79,
    "title": "צבירה בתוך HAVING — MAX ו-MIN"
   }
  },
  "N13": {
   "id": "N13",
   "schema": "exam2",
   "src": "new",
   "pattern": "aggregate-in-having",
   "title": "מחזורים עם 3 ציונים לפחות, שהנמוך בהם 80 ומעלה",
   "q": "הציגו את מחזורי הקורס שיש בהם לפחות 3 הרשמות עם ציון, ושהציון הנמוך ביותר בהם הוא 80 ומעלה — מזהה המחזור, מספר הציונים והציון הנמוך ביותר. הרשמה בלי ציון אינה נספרת.",
   "keywords": "\"הנמוך ביותר … 80 ומעלה\" ← MIN(grade) >= 80 ב-HAVING. \"לפחות 3 הרשמות עם ציון\" ← COUNT(grade), שמדלג על NULL.",
   "cols": [
    "offeringId",
    "gradedCount",
    "minGrade"
   ],
   "sql": "SELECT e.offeringId,\n       COUNT(e.grade) AS gradedCount,\n       MIN(e.grade)   AS minGrade\nFROM Enrollments e\nGROUP BY e.offeringId\nHAVING COUNT(e.grade) >= 3\n   AND MIN(e.grade) >= 80;",
   "mongo": "db.enrollments.aggregate([\n  { $match: { grade: { $ne: null } } },\n  { $group: { _id: \"$offeringId\",\n              gradedCount: { $sum: 1 },\n              minGrade: { $min: \"$grade\" } } },\n  { $match: { gradedCount: { $gte: 3 }, minGrade: { $gte: 80 } } },\n  { $project: { _id: 0, offeringId: \"$_id\", gradedCount: 1, minGrade: 1 } }\n])",
   "logic": "\"כל הציונים 80 ומעלה\" שקול ל\"הנמוך שבהם 80 ומעלה\". את הספירה עושים על העמודה grade, כדי שהרשמה בלי ציון לא תיספר. במונגו מסננים קודם את מי שאין לו ציון, ואז ‎$sum: 1‎ סופר רק ציונים.",
   "trap": "סינון WHERE grade >= 80 לפני הקיבוץ: אז הציון 78 ב-O501 והציון 45 ב-O503 נמחקים לפני הבדיקה, ושני המחזורים נכנסים בטעות, כי נשארו להם 3 ציונים גבוהים. כך מתקבלות 4 שורות במקום 2.",
   "compare": "ב-SQL ההבחנה בין \"כל ההרשמות\" ל\"הרשמות עם ציון\" היא COUNT(*) מול COUNT(grade). במונגו אין COUNT(עמודה), ולכן מסננים null ב-‎$match‎ לפני ה-‎$group‎.",
   "slot": "S20",
   "card": {
    "code": "R-15",
    "page": 79,
    "title": "צבירה בתוך HAVING — MAX ו-MIN"
   }
  },
  "N14": {
   "id": "N14",
   "schema": "ship",
   "src": "new",
   "pattern": "filter-null",
   "title": "משלוחי ספטמבר שאינם Delivered, כולל סטטוס חסר",
   "q": "הציגו את המשלוחים שנוצרו בספטמבר 2026 והסטטוס שלהם אינו Delivered — כולל משלוחים שהסטטוס שלהם חסר (NULL). הציגו מזהה משלוח, מזהה לקוח, סטטוס ועלות, ומיינו לפי זמן היצירה בסדר עולה.",
   "keywords": "\"אינו Delivered … כולל חסר\" ← <> לבדו לא תופס NULL, ולכן צריך OR status IS NULL. \"בספטמבר\" ← טווח חצי-פתוח. \"מיינו\" ← ORDER BY, והסדר נבדק.",
   "cols": [
    "shipmentId",
    "customerId",
    "status",
    "shippingCost"
   ],
   "sql": "SELECT shipmentId, customerId, status, shippingCost\nFROM Shipments\nWHERE createdAt >= '2026-09-01'\n  AND createdAt <  '2026-10-01'\n  AND (status <> 'Delivered' OR status IS NULL)\nORDER BY createdAt ASC;",
   "mongo": "db.shipments.find(\n  { createdAt: { $gte: ISODate(\"2026-09-01T00:00:00Z\"),\n                 $lt:  ISODate(\"2026-10-01T00:00:00Z\") },\n    status: { $ne: \"Delivered\" } },\n  { _id: 0, shipmentId: 1, customerId: 1, status: 1, shippingCost: 1 }\n).sort({ createdAt: 1 })",
   "logic": "שני תנאים: טווח תאריכים חצי-פתוח, ו\"שונה מ-Delivered\" שכולל גם ערך חסר. ב-SQL ההשוואה ל-NULL אינה TRUE, ולכן חייבים להוסיף OR IS NULL בסוגריים. במונגו ‎$ne‎ תופס גם null וגם שדה חסר, בלי תוספת.",
   "trap": "status <> 'Delivered' לבדו: SH10, שהסטטוס שלו NULL, נעלם בשקט, ומתקבלות 2 שורות במקום 3. מלכודת שנייה: לשכוח את הסוגריים סביב ה-OR. אז התנאי IS NULL \"בורח\" מתנאי התאריכים.",
   "compare": "זה אחד ההבדלים החשובים בין השפות: ב-SQL ‏<> מדלג על NULL, ובמונגו ‎$ne‎ כולל אותו. אותה כוונה, ותוספת של OR IS NULL רק בצד אחד.",
   "slot": "S12",
   "card": {
    "code": "R-02",
    "page": 69,
    "title": "ערך חסר — IS NULL, COALESCE, CASE"
   }
  },
  "N15": {
   "id": "N15",
   "schema": "exam2",
   "src": "new",
   "pattern": "anti-join",
   "title": "קורסים שאין להם אף בחינה, בשום מחזור",
   "q": "הציגו את הקורסים שאין להם אף בחינה באף אחד מהמחזורים שלהם — מזהה הקורס ושם הקורס. שימו לב: בחינה שייכת למחזור (offeringId), ולא ישירות לקורס.",
   "keywords": "\"שאין להם אף …\" ← אנטי-צירוף. \"בחינה שייכת למחזור\" ← הדרך לבחינה עוברת דרך CourseOfferings, ולכן הבדיקה היא על קורס שלם ולא על מחזור בודד ← NOT EXISTS.",
   "cols": [
    "courseId",
    "courseName"
   ],
   "sql": "SELECT c.courseId, c.courseName\nFROM Courses c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM CourseOfferings o\n  JOIN Exams x ON x.offeringId = o.offeringId\n  WHERE o.courseId = c.courseId\n);",
   "mongo": "db.courses.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"courseId\",\n               foreignField: \"courseId\", as: \"offs\" } },\n  { $lookup: {\n      from: \"exams\",\n      let: { ids: \"$offs.offeringId\" },\n      pipeline: [ { $match: { $expr: { $in: [\"$offeringId\", \"$$ids\"] } } } ],\n      as: \"exams\" } },\n  { $match: { exams: { $size: 0 } } },\n  { $project: { _id: 0, courseId: 1, courseName: 1 } }\n])",
   "logic": "השאלה היא על הקורס כולו: אין לו בחינה באף מחזור. NOT EXISTS מחפש בחינה כלשהי בכל המחזורים של הקורס, ומשאיר רק קורסים שלא נמצאה להם אף אחת. במונגו ה-‎$lookup‎ השני מקבל את כל מזהי המחזורים של הקורס כמערך ‎(let)‎, ומחזיר כל בחינה שה-offeringId שלה נמצא במערך ‎($in)‎.",
   "trap": "שני LEFT JOIN ואז WHERE x.examId IS NULL: לקורס C20 יש שלושה מחזורים, ולשניים מהם יש בחינה. אבל למחזור O509 אין, ולכן נוצרת שורה עם NULL, ו-C20 נכנס בטעות. הבדיקה הזו שואלת על מחזור בודד, והשאלה שואלת על הקורס כולו.",
   "compare": "ב-SQL הדרך הבטוחה היא NOT EXISTS על הצירוף כולו, או GROUP BY עם HAVING COUNT(x.examId) = 0. במונגו ‎$lookup‎ עם pipeline ו-‎$in‎ מחפש בחינה לכל אחד מהמחזורים, ומערך ריק בסוף אומר \"אף אחת\".",
   "slot": "S13",
   "card": {
    "code": "R-21",
    "page": 86,
    "title": "אנטי-צירוף — מי שאין לו כלום"
   }
  },
  "N16": {
   "id": "N16",
   "schema": "ship",
   "src": "new",
   "pattern": "all-satisfy",
   "title": "לקוחות שכל המשלוחים שלהם נוצרו בספטמבר",
   "q": "הציגו את הלקוחות שכל המשלוחים שלהם נוצרו בספטמבר 2026, ויש להם לפחות משלוח אחד — מזהה הלקוח ושמו.",
   "keywords": "\"כל המשלוחים … בספטמבר\" ← אין אף משלוח מחוץ לספטמבר (NOT EXISTS). \"ויש להם לפחות משלוח אחד\" ← EXISTS נוסף, אחרת לקוח בלי משלוחים \"עובר\".",
   "cols": [
    "customerId",
    "customerName"
   ],
   "sql": "SELECT c.customerId, c.customerName\nFROM Customers c\nWHERE EXISTS (\n  SELECT 1 FROM Shipments s\n  WHERE s.customerId = c.customerId\n)\nAND NOT EXISTS (\n  SELECT 1 FROM Shipments s\n  WHERE s.customerId = c.customerId\n    AND (s.createdAt < '2026-09-01' OR s.createdAt >= '2026-10-01')\n);",
   "mongo": "db.customers.aggregate([\n  { $lookup: { from: \"shipments\", localField: \"customerId\",\n               foreignField: \"customerId\", as: \"s\" } },\n  { $match: {\n      \"s.0\": { $exists: true },\n      s: { $not: { $elemMatch: { $or: [\n        { createdAt: { $lt:  ISODate(\"2026-09-01T00:00:00Z\") } },\n        { createdAt: { $gte: ISODate(\"2026-10-01T00:00:00Z\") } }\n      ] } } }\n  } },\n  { $project: { _id: 0, customerId: 1, customerName: 1 } }\n])",
   "logic": "את \"כולם\" בודקים בשלילה: אין אף משלוח שמחוץ לספטמבר. ובנוסף: יש לפחות משלוח אחד. בלי התנאי השני, C3, שאין לו משלוחים בכלל, היה עובר, כי אין לו אף משלוח \"מפר\".",
   "trap": "WHERE על ספטמבר ואז \"יש משלוח\": C2 שלח גם בספטמבר (SH05) וגם באוקטובר (SH04), והוא ייכנס בטעות. הסינון ב-WHERE מעלים את המשלוח המפר במקום לבדוק אותו.",
   "compare": "ב-SQL: EXISTS יחד עם NOT EXISTS. חלופה תקינה: GROUP BY עם HAVING MIN(createdAt) >= '2026-09-01' AND MAX(createdAt) < '2026-10-01'. במונגו: ‎\"s.0\": {$exists: true}‎ בשביל \"יש לפחות אחד\", ו-‎$not‎ מעל ‎$elemMatch‎ בשביל \"אין מפר\".",
   "slot": "S18",
   "card": {
    "code": "R-24",
    "page": 89,
    "title": "כולם מקיימים"
   }
  },
  "N17": {
   "id": "N17",
   "schema": "exam2",
   "src": "new",
   "pattern": "double-having",
   "title": "סטודנטים ב-3 מחזורים שונים לפחות ב-2026A, עם ממוצע מעל 80",
   "q": "הציגו את הסטודנטים שנרשמו לפחות ל-3 מחזורי קורס שונים בסמסטר 2026A, ושממוצע הציונים שלהם בסמסטר הזה (רק ציונים ידועים) גבוה מ-80 — מזהה הסטודנט, שמו, מספר המחזורים השונים והממוצע.",
   "keywords": "\"בסמסטר 2026A\" ← WHERE, לפני הקיבוץ. \"לפחות 3 מחזורים שונים\" ← COUNT(DISTINCT offeringId), ולא COUNT(*). \"וממוצע … מעל 80\" ← תנאי שני ב-HAVING.",
   "cols": [
    "studentId",
    "name",
    "offeringsCount",
    "avgGrade"
   ],
   "sql": "SELECT s.studentId, s.name,\n       COUNT(DISTINCT e.offeringId) AS offeringsCount,\n       AVG(e.grade)                 AS avgGrade\nFROM Students s\nJOIN Enrollments e     ON e.studentId  = s.studentId\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nWHERE o.semester = '2026A'\nGROUP BY s.studentId, s.name\nHAVING COUNT(DISTINCT e.offeringId) >= 3\n   AND AVG(e.grade) > 80;",
   "mongo": "db.enrollments.aggregate([\n  { $lookup: { from: \"courseOfferings\", localField: \"offeringId\",\n               foreignField: \"offeringId\", as: \"o\" } },\n  { $unwind: \"$o\" },\n  { $match: { \"o.semester\": \"2026A\" } },\n  { $group: { _id: \"$studentId\",\n              offerings: { $addToSet: \"$offeringId\" },\n              avgGrade: { $avg: \"$grade\" } } },\n  { $project: { offeringsCount: { $size: \"$offerings\" }, avgGrade: 1 } },\n  { $match: { offeringsCount: { $gte: 3 }, avgGrade: { $gt: 80 } } },\n  { $lookup: { from: \"students\", localField: \"_id\",\n               foreignField: \"studentId\", as: \"s\" } },\n  { $unwind: \"$s\" },\n  { $project: { _id: 0, studentId: \"$_id\", name: \"$s.name\",\n                offeringsCount: 1, avgGrade: 1 } }\n])",
   "logic": "אותו מבנה כמו שאלה 19 במבחן: סינון תקופה, קיבוץ ושני תנאי קבוצה. החידוש הוא המילה \"שונים\": סופרים מחזורים ייחודיים ולא שורות. AVG מתעלם מציון ריק בעצמו.",
   "trap": "COUNT(*) במקום COUNT(DISTINCT offeringId): ל-S106 יש שתי הרשמות לאותו מחזור O501, ולכן COUNT(*) מחזיר 3, והוא נכנס בטעות למרות שנרשם רק לשני מחזורים שונים. במונגו המקביל לספירה ייחודית הוא ‎$addToSet‎ ואחריו ‎$size‎.",
   "compare": "ב-SQL ספירה ייחודית היא מילה אחת (DISTINCT בתוך COUNT). במונגו אוספים את הערכים לקבוצה ‎($addToSet)‎ וסופרים את גודלה ‎($size)‎.",
   "slot": "S19",
   "card": {
    "code": "R-14",
    "page": 78,
    "title": "שני תנאי קבוצה יחד"
   }
  }
 },
 "mcq": {
  "SX-1": {
   "id": "SX-1",
   "fam": "T1",
   "src": "official",
   "n": 1,
   "q": "במודל מסמכים, כל משלוח שומר בתוכו מערך של אירועי מעקב. מספר האירועים למשלוח עלול להגיע להיקף גדול מאוד, ואירועים חדשים נוספים לעיתים קרובות. מה הקביעה המדויקת ביותר?",
   "options": [
    "תמיד עדיף להטמיע את האירועים, כי קריאה אחת עדיפה ארכיטקטונית על כל מספר של שליפות.",
    "אוסף נפרד לאירועים יכול להתאים יותר כשהמערך גדל מאוד, אבל ייתכן שיידרשו שליפות נוספות כדי להציג משלוח יחד עם ההיסטוריה שלו.",
    "ב-MongoDB לא ניתן לשמור מערכים בתוך מסמך.",
    "ב-SQL לא ניתן לייצג היסטוריה של אירועים."
   ],
   "correct": 1,
   "why": "מערך שגדל בלי גבול יוצר בעיות גודל מסמך, עלות עדכון וביצועים. אוסף נפרד פותר אותן — במחיר של שליפה נוספת כדי להציג משלוח יחד עם ההיסטוריה שלו.",
   "wrong": "א׳ — \"תמיד\" הוא הדגל האדום: הטמעה אינה עדיפה כשהמערך גדל ללא גבול. ג׳ — מונגו כן תומך במערכים, זו אחת מתכונות הליבה שלו. ד׳ — ב-SQL מייצגים היסטוריית אירועים בטבלה נפרדת עם מפתח זר, בלי שום בעיה.",
   "rule": "הטמעה טובה לנתונים קטנים, חסומים בגודל, שנקראים יחד עם המסמך. מערך גדל ללא גבול — אוסף נפרד.",
   "book": {
    "page": 8,
    "where": "שאלה 1 במבחן לדוגמה"
   }
  },
  "SX-2": {
   "id": "SX-2",
   "fam": "T2",
   "src": "official",
   "n": 2,
   "q": "כשנוצר משלוח, נשמר ב-ShipmentItems המחיר ליחידה (unitPrice) של כל פריט. מאוחר יותר המחיר בקטלוג משתנה. מה נכון, אם רוצים לשמר את המחיר שבו הלקוח חויב בפועל?",
   "options": [
    "חייבים לעדכן את כל המשלוחים הקודמים למחיר החדש.",
    "צריך להסיר את המחיר מ-ShipmentItems ולחשב אותו תמיד לפי הקטלוג העדכני.",
    "שומרים את מחיר העסקה ההיסטורי ולא משנים אותו כשמחיר הקטלוג משתנה.",
    "שכפול של מחיר הוא תמיד הפרת נרמול, ולכן הוא אסור."
   ],
   "correct": 2,
   "why": "מחיר העסקה הוא עובדה היסטורית: זה הסכום שהלקוח חויב בו. שינוי מחיר הקטלוג בעתיד אינו משנה את מה שקרה בעבר.",
   "wrong": "א׳ וב׳ — שתיהן מעוותות את נתוני העבר ומוחקות את הסכום שנגבה בפועל. ד׳ — שמירת מחיר היסטורי אינה כפילות אסורה, כי מחיר קטלוג נוכחי ומחיר עסקה הם שתי עובדות עסקיות שונות.",
   "rule": "לפני שמחליטים אם שדה משוכפל הוא טעות — שואלים אם הוא צילום מצב היסטורי או עותק של ערך עדכני. היסטורי נשמר; עדכני נשלף ממקור מרכזי.",
   "book": {
    "page": 8,
    "where": "שאלה 2 במבחן לדוגמה"
   }
  },
  "SX-3": {
   "id": "SX-3",
   "fam": "T3",
   "src": "official",
   "n": 3,
   "q": "ב-SQL, למשלוח שעוד לא נמסר יש deliveredAt = NULL. ב-MongoDB, בחלק מהמסמכים השדה לא קיים בכלל, ובאחרים הוא קיים עם null. מה נכון?",
   "options": [
    "ב-SQL, הבדיקה התקינה לערך חסר היא deliveredAt = NULL.",
    "ב-MongoDB, הסינון { deliveredAt: null } יכול להחזיר גם מסמכים שבהם השדה לא קיים.",
    "NULL ושדה שאינו קיים הם אותו מושג בכל מסדי הנתונים.",
    "ב-MongoDB אין דרך להבדיל בין שדה שאינו קיים לבין שדה שערכו null."
   ],
   "correct": 1,
   "why": "במונגו המסנן ‎{field: null}‎ תופס גם מסמך שהשדה בו חסר לגמרי וגם מסמך שבו הוא קיים עם null. זו התנהגות שאין לה מקבילה ב-SQL.",
   "wrong": "א׳ — ב-SQL בודקים חסר ב-IS NULL; השוואת שוויון מחזירה UNKNOWN. ג׳ — במודל המסמכים \"אין שדה\" ו\"שדה ריק\" אינם זהים. ד׳ — אפשר להבחין: ‎$exists: false‎ תופס רק חסר.",
   "rule": "‎{field: null}‎ = null או חסר. ‎{field: {$exists: false}}‎ = רק חסר. ‎{field: {$ne: null}}‎ = קיים ואינו ריק.",
   "book": {
    "page": 9,
    "where": "שאלה 3 במבחן לדוגמה"
   }
  },
  "SX-4": {
   "id": "SX-4",
   "fam": "T4",
   "src": "official",
   "n": 4,
   "q": "כשחבילה נמסרת, צריך לשנות את סטטוס המשלוח ל-Delivered וגם לשמור את זמן המסירה. מה הקביעה המדויקת ביותר?",
   "options": [
    "אם שתי הפעולות נשלחות כשתי פקודות נפרדות, מובטח ששתיהן יצליחו יחד או ייכשלו יחד.",
    "ב-MongoDB, עדכון של מסמך בודד הוא אטומי ברמת המסמך, ולכן אפשר לעדכן את שני השדות בפעולה אחת.",
    "ב-MongoDB אי אפשר לעדכן יותר משדה אחד בפקודה אחת.",
    "SQL לא תומך בטרנזקציות."
   ],
   "correct": 1,
   "why": "כתיבה אחת למסמך אחד היא אטומית, גם כשהיא משנה כמה שדות. שני השדות נמצאים באותו מסמך, ולכן ‎$set‎ אחד מספיק ואין צורך בטרנזקציה.",
   "wrong": "א׳ — שתי פקודות עצמאיות אינן הופכות ליחידה אטומית מעצם היותן. ג׳ — ‎$set‎ מעדכן כמה שדות יחד. ד׳ — SQL תומך בטרנזקציות, זו אחת מתכונות הליבה שלו.",
   "rule": "אטומיות של מסמך יחיד אינה טרנזקציה. שינוי שנוגע בכמה מסמכים הוא מה שדורש טרנזקציה.",
   "book": {
    "page": 9,
    "where": "שאלה 4 במבחן לדוגמה"
   }
  },
  "SX-5": {
   "id": "SX-5",
   "fam": "T5",
   "src": "official",
   "n": 5,
   "q": "נתוני המשלוחים מחולקים למחיצות לפי customerId. רוב השאילתות מחפשות את כל המשלוחים של לקוח אחד, אבל דוח חודשי צריך לעבור על המשלוחים של כל הלקוחות. מה המסקנה המדויקת ביותר?",
   "options": [
    "מפתח החלוקה מתאים לשאילתות לפי לקוח, אבל דוחות על כל המערכת עשויים להצטרך לגשת לכמה מחיצות.",
    "חלוקה לפי customerId מבטיחה שכל דוח חודשי ירוץ על שרת אחד.",
    "למפתח החלוקה אין השפעה על ביצועי השאילתות.",
    "חלוקה למחיצות מייתרת את הצורך לתכנן אינדקסים."
   ],
   "correct": 0,
   "why": "מפתח לקוח מאפשר ניתוב ממוקד לשאילתה שמחפשת לקוח אחד. דוח שסורק את כל הלקוחות אינו יכול להתמקד במחיצה אחת, ולכן יפנה למחיצות רבות.",
   "wrong": "ב׳ — דוח על כל הלקוחות נוגע בהכרח בכל המחיצות. ג׳ — מפתח החלוקה קובע את נתיב הגישה ולכן משפיע ישירות. ד׳ — אינדקסים נחוצים גם במערכת מחולקת.",
   "rule": "מפתח שמתאים לשאילתה הנפוצה אינו בהכרח מתאים לדוח רוחבי. אלה שני דפוסי גישה שונים.",
   "book": {
    "page": 10,
    "where": "שאלה 5 במבחן לדוגמה"
   }
  },
  "SX-6": {
   "id": "SX-6",
   "fam": "T6",
   "src": "official",
   "n": 6,
   "q": "במערכת מבוזרת שמשכפלת את נתוני המשלוחים, אחרי שינוי סטטוס שרת אחד כבר מציג Delivered, ושרת אחר עדיין מציג InTransit לזמן קצר. מה נכון?",
   "options": [
    "זה בהכרח באג, כי שכפול מבטיח שכל השרתים מתעדכנים באותו רגע.",
    "זה יכול לקרות בשכפול אסינכרוני, בהתאם למדיניות העקביות של המערכת.",
    "זה יכול לקרות רק במסדי מסמכים, ולא במסדי SQL מבוזרים.",
    "שכפול מונע מצב שבו קוראים נתונים לא מעודכנים."
   ],
   "correct": 1,
   "why": "בשכפול אסינכרוני יש השהיה בהפצת העדכון, ולכן עותק משני עשוי להציג לזמן קצר מידע ישן. זו התנהגות מתוכננת שנקבעת במדיניות העקביות — לא תקלה.",
   "wrong": "א׳ — שכפול אינו מבטיח עדכון בו-זמני. ג׳ — אותה התנהגות קיימת בכל מערכת מבוזרת, גם רלציונית. ד׳ — שכפול הוא בדיוק מה שמאפשר קריאה ישנה מעותק משני.",
   "rule": "התנהגות הקריאה נקבעת ב-read preference וב-read concern, ומהירות ההתכנסות נקבעת בקצב השכפול ובאישורי הכתיבה.",
   "book": {
    "page": 10,
    "where": "שאלה 6 במבחן לדוגמה"
   }
  },
  "SX-7": {
   "id": "SX-7",
   "fam": "T7",
   "src": "official",
   "n": 7,
   "q": "במשלוח יכולים להיות פריטים רבים, ואותו פריט יכול להופיע במשלוחים רבים. לכל פריט בכל משלוח שומרים גם כמות ומחיר ליחידה. מה התכנון המתאים ביותר?",
   "options": [
    "לשמור את כל מזהי המשלוחים בשדה טקסט אחד בטבלת Items.",
    "ב-SQL — טבלת קשר ShipmentItems. ב-MongoDB — לבחור בין אוסף של שורות משלוח לבין הטמעה בתוך מסמך המשלוח, לפי היקף הנתונים ודפוסי הגישה.",
    "לפתוח טבלת Items חדשה לכל משלוח.",
    "לשמור את הכמות והמחיר רק בטבלת Items, כי הם לא תלויים במשלוח."
   ],
   "correct": 1,
   "why": "זה קשר רבים-לרבים, ולכן ב-SQL צריך טבלת גישור. הכמות והמחיר אינם תכונה של הפריט אלא של השורה — של הצירוף משלוח-פריט. במונגו הבחירה בין הטמעה לאוסף נפרד תלויה בהיקף ובדפוס הקריאה.",
   "wrong": "א׳ — רשימת מזהים בשדה טקסט אינה מודל קשר ואי אפשר לחבר לפיה. ג׳ — טבלה לכל משלוח אינה מודל נתונים. ד׳ — הכמות והמחיר תלויים לגמרי במשלוח ולכן אינם יכולים לשבת בקטלוג.",
   "rule": "רבים-לרבים ב-SQL = טבלת גישור. תכונה של הקשר שייכת לטבלת הגישור, לא לאחד הצדדים.",
   "book": {
    "page": 11,
    "where": "שאלה 7 במבחן לדוגמה"
   }
  },
  "SX-8": {
   "id": "SX-8",
   "fam": "T8",
   "src": "official",
   "n": 8,
   "q": "על האוסף shipments הוגדרו אינדקסים רבים על שדות שונים, אבל רוב השאילתות משתמשות רק בשניים מהם. מה נכון?",
   "options": [
    "כל אינדקס נוסף משפר את הקריאה ולא משפיע על הכתיבה.",
    "אינדקסים תופסים מקום ועלולים להוסיף עלות להוספה, לעדכון ולמחיקה.",
    "צריך ליצור אינדקס על כל שדה, בלי קשר לדפוסי השאילתות.",
    "MongoDB לא תומך ביותר מאינדקס אחד לאוסף."
   ],
   "correct": 1,
   "why": "אינדקס הוא מבנה נוסף שצריך לעדכן בכל כתיבה, והוא תופס מקום. אינדקס שלא משמש אף שאילתה הוא עלות נטו בלי תועלת.",
   "wrong": "א׳ — אינדקס דווקא מעלה את עלות הכתיבה. ג׳ — אינדקס על כל שדה הוא בזבוז ופוגע בכתיבה. ד׳ — מונגו תומך בהרבה אינדקסים לאוסף.",
   "rule": "אינדקס מחליף סריקה באיתור מהיר — בתמורה למקום ולעלות תחזוקה בכל שינוי רלוונטי.",
   "book": {
    "page": 11,
    "where": "שאלה 8 במבחן לדוגמה"
   }
  },
  "SX-9": {
   "id": "SX-9",
   "fam": "T9",
   "src": "official",
   "n": 9,
   "q": "חברת משלוחים צריכה גם דוחות כספיים אמינים וגם קליטה מהירה של זרם גדול של אירועי מיקום. מה ההחלטה הסבירה ביותר?",
   "options": [
    "NoSQL לכל הצרכים, כי הוא תמיד מהיר יותר.",
    "SQL לכל הצרכים, כי הוא תמיד מהיר יותר.",
    "לבחור ארכיטקטורה לפי הדרישות של כל רכיב, ולשקול שילוב של מסד טרנזקציוני עם מערכת שמותאמת לקליטה ולעיבוד של אירועים.",
    "לוותר על אינדקסים כדי לא לפגוע בעקביות."
   ],
   "correct": 2,
   "why": "שני הרכיבים דורשים דברים הפוכים: דוח פיננסי דורש עקביות ודיוק, וזרם אירועים דורש קליטה מהירה בנפח גדול. סביר להתאים לכל רכיב את הכלי שלו, ולשקול שילוב.",
   "wrong": "א׳ וב׳ — אין מסד שהוא \"תמיד מהיר יותר\"; זה תלוי בדפוס העבודה. ד׳ — אינדקסים אינם פוגעים בעקביות.",
   "rule": "בוחרים לפי צורכי הרכיב. גם להישאר במסד אחד היא תשובה סבירה כשהפשטות והעומס מצדיקים זאת — העיקר לנמק.",
   "book": {
    "page": 12,
    "where": "שאלה 9 במבחן לדוגמה"
   }
  },
  "SX-10": {
   "id": "SX-10",
   "fam": "T10",
   "src": "official",
   "n": 10,
   "q": "עיר המגורים של הלקוח נשמרת גם במסמך הלקוח וגם בכל אחד ממסמכי המשלוח שלו, כדי להציג משלוחים מהר בלי שליפה נוספת. הלקוח עובר עיר, והדרישה העסקית היא שכל המשלוחים, גם הישנים, יציגו תמיד את העיר העדכנית. מה הקביעה המדויקת ביותר?",
   "options": [
    "השכפול מבטיח שהעיר תתעדכן מעצמה בכל מסמכי המשלוח.",
    "צריך לעדכן את כל מסמכי המשלוח הרלוונטיים, או לשנות את השליפה כך שהעיר תילקח ממקור מרכזי. בשני המקרים משלמים בביצועים או בתחזוקה.",
    "אינדקס ייחודי על שם העיר יבטיח עקביות בין המסמכים.",
    "ב-MongoDB אי אפשר לממש את הדרישה, וב-SQL היא מובטחת גם כששם העיר משוכפל."
   ],
   "correct": 1,
   "why": "עותק אינו מתעדכן מעצמו. אם הדרישה היא ערך עדכני תמיד, או שמעדכנים את כל העותקים במפורש, או ששולפים ממקור מרכזי ומשלמים בשליפה נוספת.",
   "wrong": "א׳ — שכפול אינו מסנכרן אוטומטית. ג׳ — אינדקס ייחודי מונע כפילות ערכים, הוא אינו מסנכרן שדות. ד׳ — אפשר לממש בשני המודלים; גם ב-SQL עמודה משוכפלת לא מתעדכנת מעצמה.",
   "rule": "שימו לב לניסוח: \"תמיד עדכני\" דורש סנכרון או מקור מרכזי. \"כמו שהיה אז\" דורש בדיוק את ההיפך — צילום מצב שאסור לשנות. השוו לשאלה 2.",
   "book": {
    "page": 12,
    "where": "שאלה 10 במבחן לדוגמה"
   }
  },
  "SX-11": {
   "id": "SX-11",
   "fam": "T5",
   "src": "official",
   "n": 11,
   "q": "מערכת גלובלית מנהלת משלוחים של מיליוני לקוחות. רוב השאילתות מחפשות משלוחים לפי customerId, ויש גם דוח יומי של מספר המשלוחים בכל מדינה. משלוחים נוצרים בקצב גבוה, ולחלק מהלקוחות יש כמות עצומה של משלוחים. מה ההחלטה הארכיטקטונית הסבירה ביותר?",
   "options": [
    "תמיד לבחור ב-customerId כמפתח חלוקה, כי מפתח שמשרת את רוב השאילתות מבטיח גם עומס אחיד.",
    "תמיד לבחור בתאריך יצירת המשלוח, כי מפתח לפי זמן מבטיח שהכתיבות יתפזרו באופן שווה בין המחיצות.",
    "לבחון לכל מפתח אפשרי את דפוסי השאילתות, את פיזור הנתונים ואת העומס. מפתח שמתאים לחיפוש לפי לקוח עלול לייצר עומס לא אחיד, ודוחות על כל המערכת עשויים לסרוק מחיצות רבות.",
    "לא צריך לבחור מפתח חלוקה מראש, כי מסד מבוזר מנתב כל שאילתה למחיצה הנכונה בעצמו ובלי עלות ביצועים."
   ],
   "correct": 2,
   "why": "בחירת מפתח חלוקה היא איזון בין שלושה דברים: דפוס השאילתות, פיזור הנתונים ועומסי הקריאה והכתיבה. אין מפתח שמנצח בכל שלושת הממדים.",
   "wrong": "א׳ — לקוחות עם נפח עצום יוצרים פיזור לא אחיד ועומס חריג. ב׳ — מפתח זמן שעולה ברצף מרכז את כל הכתיבות החדשות באותו מקום. ד׳ — חלוקה לעולם אינה חינם, והיא אינה מתרחשת מעצמה.",
   "rule": "שימו לב לשאלה 5 ולשאלה 11: אותו נושא, אבל ב-11 נוספו \"קצב גבוה\" ו\"לקוחות עם נפח עצום\" — ולכן התשובה הנכונה היא השקילה ולא הבחירה.",
   "book": {
    "page": 13,
    "where": "שאלה 11 במבחן לדוגמה"
   }
  },
  "A-01": {
   "id": "A-01",
   "fam": "T7",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "במכללה יש קשר רבים-לרבים בין סטודנטים לקורסים. כיצד מייצגים את ההרשמות ב-SQL?",
   "options": [
    "בטבלה מקשרת נפרדת Enrollments, שבה מזהה הרשמה, מזהה סטודנט, מזהה מחזור קורס, ציון ותאריך — והקישור במפתחות זרים.",
    "בעמודה אחת בטבלת Students שמכילה את רשימת מזהי הקורסים של הסטודנט, מופרדים בפסיקים, כדי לחסוך טבלה נוספת במודל.",
    "בשתי עמודות מפתח זר בטבלת Courses — אחת לסטודנט ואחת למרצה — כך שכל שורה בקורס מתארת גם את ההרשמה אליו.",
    "בלי טבלה נוספת: מגדירים אינדקס מורכב על Students ועל Courses, והמסד יוצר מהם את הקשר רבים-לרבים ישירות."
   ],
   "correct": 0,
   "explain": "הנכונה — טבלה מקשרת. המרצה ניסח: \"ב-SQL קשרי many-to-many בין סטודנטים לקורסים מנוהלים דרך טבלת Enrollments\". ב׳ — רשימה בפסיקים שוברת נורמליזציה, אי אפשר לעשות עליה JOIN, אילוץ או אינדקס. ג׳ — טבלת Courses מתארת קורס, לא הרשמה; שם אין מקום לציון ולתאריך ההרשמה של סטודנט מסוים. ד׳ — אינדקס מזרז שליפה, הוא אינו יוצר קשר בין טבלאות.",
   "book": {
    "page": 42,
    "where": "שאלה A-01 בעשרת הנושאים"
   }
  },
  "A-02": {
   "id": "A-02",
   "fam": "T7",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "סטודנט נרשם לאורך שנות לימודיו ל-200 קורסים. מתכנת מציע לשמור את כל 200 ההרשמות כמערך בתוך מסמך הסטודנט ב-MongoDB.\n\nמה השיקול שמכריע כאן?",
   "options": [
    "לטובת ההטמעה: כל התיק של הסטודנט נשלף בקריאה אחת בלי lookup, וזה השיקול החשוב ביותר במערכת אקדמית.",
    "נגד ההטמעה: המסמך גדל בלי הגבלה ונעשה מסורבל, וקשה לבצע עליו שאילתות — עדיף 200 מסמכים נפרדים.",
    "הבחירה ניטרלית: MongoDB מגביל מסמך ל-16MB, ו-200 הרשמות רחוקות מהגבול, ולכן אין הבדל מעשי בין הגישות.",
    "לטובת ההטמעה, אבל רק בתנאי שמוסיפים אינדקס ייחודי על המערך הפנימי כדי למנוע הרשמה כפולה לאותו מחזור."
   ],
   "correct": 1,
   "explain": "המרצה נשאל בדיוק את השאלה הזאת וענה במשפט אחד: \"לא. עדיף לעשות 200 נפרדים.\" א׳ — יתרון אמיתי של ההטמעה (הוא עצמו מנה אותו), אבל הוא אינו מכריע מול צמיחה בלתי חסומה. ג׳ — הגבול הטכני אינו השיקול; הבעיה היא עדכון וקשיות השאילתות. ד׳ — אינדקס ייחודי אינו פותר מסמך שגדל.",
   "book": {
    "page": 42,
    "where": "שאלה A-02 בעשרת הנושאים"
   }
  },
  "A-03": {
   "id": "A-03",
   "fam": "T7",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "המכללה מפיקה דוח שנתי: ממוצע ציונים לכל מחלקה, עבור סטודנטים שקיבלו מעל 90. איזו גישה עדיפה לדוח הזה לפי המרצה?",
   "options": [
    "MongoDB, כי המידע המוטמע מאפשר סינון בלי lookup ולכן גם האגרגציה עצמה פשוטה יותר לכתיבה ולהרצה.",
    "שתי הגישות שקולות: הדוח יידרש לאותו מספר פעולות בשתיהן.",
    "SQL — מבחינת הכתיבה NoSQL קל יותר, אבל מבחינת השליפה SQL עדיף.",
    "MongoDB, כי אגרגציה על collection אחד מהירה תמיד מ-JOIN בין שלוש טבלאות, בלי קשר לאינדקסים."
   ],
   "correct": 2,
   "explain": "זה ניסוח ישיר שלו: \"SQL. מבחינת הכתיבה NoSQL קל יותר, אבל מבחינת השליפה SQL עדיף.\" א׳ — היפוך: הסינון הפשוט הוא היתרון של מונגו בשליפה פשוטה, לא באגרגציה מורכבת. ב׳ — ניסוח \"שקול לחלוטין\" שגוי. ד׳ — ניסוח מוחלט (\"תמיד\", \"בלי קשר לאינדקסים\") ולכן שגוי.",
   "book": {
    "page": 42,
    "where": "שאלה A-03 בעשרת הנושאים"
   }
  },
  "A-04": {
   "id": "A-04",
   "fam": "T7",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהו החיסרון של SQL בהפקת דוחות מורכבים במערכת המכללה?",
   "options": [
    "הנתונים מפוזרים בכמה עותקים, ולכן הדוח עלול להציג ערך שאינו מעודכן אם עדכון חלקי נכשל באמצע.",
    "אי אפשר לחשב ממוצע בשאילתה אחת, ולכן נדרש להוציא את כל השורות ולעבד אותן בקוד האפליקציה.",
    "SQL אינו תומך בקיבוץ לפי מחלקה בלי עמודה מחושבת.",
    "השאילתות עצמן מורכבות יותר לכתיבה ודורשות JOIN בין כמה טבלאות."
   ],
   "correct": 3,
   "explain": "הנכונה — זה החיסרון שהמרצה מנה ל-SQL. א׳ — היפוך: זה החיסרון של מונגו (כפילויות ואי-עקביות), לא של SQL, שבו כל נתון שמור פעם אחת. ב׳ — שגוי: AVG עם GROUP BY עושה זאת בשאילתה אחת. ג׳ — שגוי: GROUP BY אינו דורש עמודה מחושבת.",
   "book": {
    "page": 42,
    "where": "שאלה A-04 בעשרת הנושאים"
   }
  },
  "A-05": {
   "id": "A-05",
   "fam": "T7",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "המרצה נשאל מה עדיף למערכת המכללה בכללותה, SQL או MongoDB. מה היה הנימוק המרכזי שלו?",
   "options": [
    "SQL עדיף — לא תהיה כפילות בנתונים, יש יותר סדר וארגון, וקל יותר לעדכן נתונים.",
    "MongoDB עדיף — ההרשמות נשלפות בקריאה אחת, ולכן התיק של הסטודנט מוצג מהר יותר במסך אחד.",
    "ארכיטקטורה משולבת היא ההמלצה שלו: הסטודנטים והמחלקות ב-SQL, וההרשמות והציונים ב-MongoDB.",
    "אין לו המלצה — הוא אמר שהבחירה נקבעת רק לפי מספר הסטודנטים הרשומים במכללה באותה שנה."
   ],
   "correct": 0,
   "explain": "ניסוח שלו, מילה במילה: \"SQL עדיף כי לא יהיו כפילות בנתונים... בנוסף, ב-SQL יש יותר סדר וארגון, וקל יותר לעדכן נתונים בהשוואה ל-MongoDB.\" ב׳ — יתרון נכון של ההטמעה, אבל לא זו ההמלצה שלו למערכת הזאת. ג׳ — הוא כן הזכיר \"שילובים\" כאפשרות כללית, אבל לא כהמלצה למכללה. ד׳ — הוא נימק בעקביות ובסדר, לא בהיקף.",
   "book": {
    "page": 43,
    "where": "שאלה A-05 בעשרת הנושאים"
   }
  },
  "A-06": {
   "id": "A-06",
   "fam": "T7",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "אילו יתרונות מנה המרצה דווקא לטובת הטמעת ההרשמות בתוך מסמך הסטודנט?",
   "options": [
    "אכיפת מפתחות זרים אוטומטית, ואפשרות להגדיר אילוץ UNIQUE על צירוף הסטודנט והמחזור בתוך המערך.",
    "פשטות בראיית הנתונים על הסטודנט, וצמצום הצורך ב-lookup.",
    "חיסכון במקום באחסון, כי הנתון אינו נשמר פעמיים.",
    "אפשרות להפיק דוחות ממוצעים לפי מחלקה בשאילתה אחת, בלי להשתמש באגרגציה או בשלבי עיבוד."
   ],
   "correct": 1,
   "explain": "אלה שני היתרונות שהוא מנה בפתרון שלו. א׳ — היפוך: אכיפת מפתחות זרים היא תכונה של SQL, לא של מסמך מוטמע במונגו. ג׳ — היפוך: הטמעה דווקא מגדילה כפילות ונפח. ד׳ — היפוך: דוחות אגרגטיביים הם היתרון של SQL.",
   "book": {
    "page": 43,
    "where": "שאלה A-06 בעשרת הנושאים"
   }
  },
  "A-07": {
   "id": "A-07",
   "fam": "T7",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 3,
   "q": "במכללה החליטו להטמיע בכל מסמך הרשמה גם את שם הקורס, כדי להציג את תיק הסטודנט בקריאה אחת. שנה אחר כך שינו את שם הקורס.\n\nמה הבעיה במבנה הזה?",
   "options": [
    "אין בעיה: שם הקורס הוא נתון עובדתי של ההרשמה וצריך להישאר בדיוק כפי שהיה ברגע ההרשמה.",
    "הבעיה היא בגודל: מסמך ההרשמה גדל בשדה נוסף ולכן השליפה של תיק הסטודנט מאטה משמעותית.",
    "שם הקורס משוכפל בכל מסמכי ההרשמה, ולכן השינוי מחייב מעבר על כולם — ועדכון חלקי ישאיר שמות סותרים.",
    "הבעיה היא שאי אפשר להגדיר אינדקס ייחודי על שדה טקסט שאינו מזהה, ולכן השם עלול להיכנס פעמיים."
   ],
   "correct": 2,
   "explain": "הנכונה — זה בדיוק מה שהמרצה אמר על שינוי שם: \"ב-MongoDB צריך לעבור על כל ה-collections ולעדכן אותם\". א׳ — נכון לגבי המחיר ההיסטורי, ולא לגבי שם לתצוגה: השם קיים במקור אחר וצריך להתרענן. ב׳ — שדה טקסט אחד אינו מקור האיטיות. ד׳ — אינדקס ייחודי אפשרי על כל שדה, וזו אינה הבעיה כאן.",
   "book": {
    "page": 43,
    "where": "שאלה A-07 בעשרת הנושאים"
   }
  },
  "A-08": {
   "id": "A-08",
   "fam": "T7",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מה תפקידה של הטבלה CourseOfferings במודל של המכללה, לפי המרצה?",
   "options": [
    "היא מקשרת בין הסטודנט לבין הציון שלו, ולכן בה נשמרים הציון ותאריך ההרשמה של כל סטודנט בקורס.",
    "היא מחליפה את טבלת Courses ומכילה גם את שם הקורס, גם את נקודות הזכות וגם את מזהה המחלקה.",
    "היא טבלת סיכום עם ממוצע הציונים של כל קורס בסמסטר.",
    "היא מקשרת בין הקורס לבין המרצה והסמסטר — מחזור ההוראה הקונקרטי."
   ],
   "correct": 3,
   "explain": "הוא ניסח: \"ה-Course Offering מקשר לך בין קורס לבין Lecture\", ולעומת זאת \"ה-Enrollments מקשר לך בין הסטודנט לבין ה-Grade\". א׳ — זה תפקיד Enrollments, לא CourseOfferings. ב׳ — טבלת Courses נשארת; המחזור מצביע אליה. ג׳ — אין במודל טבלת סיכום כזאת.",
   "book": {
    "page": 43,
    "where": "שאלה A-08 בעשרת הנושאים"
   }
  },
  "A-09": {
   "id": "A-09",
   "fam": "T7",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 3,
   "q": "במכללה רוצים גם להציג לכל סטודנט את תיק הלימודים המלא במסך אחד, וגם להפיק דוח ממוצעים לפי מחלקה.\n\nמהי המסקנה הנכונה משני דפוסי הגישה האלה?",
   "options": [
    "שני הדפוסים מושכים לכיוונים הפוכים, ולכן מכריעים לפי הפעולה הנפוצה ומציינים את המחיר.",
    "הטמעה פותרת את שני הדפוסים יחד, כי אגרגציה על מסמכים מוטמעים פשוטה יותר מ-JOIN בין טבלאות.",
    "מבנה מנורמל פותר את שני הדפוסים בלי מחיר, כי גם תיק מלא נשלף ב-JOIN אחד מהיר ובלי lookup.",
    "אין קשר בין דפוסי הגישה להחלטה: ההחלטה בין SQL ל-MongoDB נקבעת רק לפי גמישות הסכמה הנדרשת."
   ],
   "correct": 0,
   "explain": "הנכונה — תיק במסך אחד מזמין הטמעה, דוח אגרגטיבי מזמין נורמליזציה; לכן מכריעים לפי הפעולה הנפוצה ומנסחים את המחיר. ב׳ ו-ג׳ מציגים \"פתרון בלי מחיר\", וזה בדיוק מה שהמרצה אומר שלא קיים. ד׳ — דפוס הגישה הוא השלב הראשון בתבנית התשובה שלו.",
   "book": {
    "page": 44,
    "where": "שאלה A-09 בעשרת הנושאים"
   }
  },
  "A-10": {
   "id": "A-10",
   "fam": "T2",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "בחנות מקוונת פרטי המוצר שמורים גם בקטלוג וגם בהזמנות. מדוע יש היגיון לשמור בהזמנה את המחיר שהיה בעת הרכישה?",
   "options": [
    "כדי לחסוך מקום באחסון: שמירת המחיר בהזמנה מייתרת את עמודת המחיר בטבלת הקטלוג הנוכחית.",
    "כדי להציג ללקוח את ההנחה שקיבל, כדי לנתח מכירות ורווח, וכדי להחזיר כסף לפי מה ששולם בפועל.",
    "כדי שאפשר יהיה לעדכן את המחיר בהזמנה אוטומטית בכל פעם שהמחיר בקטלוג מתעדכן, ולשמור עקביות.",
    "כדי להגדיר אינדקס ייחודי על צירוף מזהה ההזמנה והמחיר, ולמנוע כך שתי הזמנות זהות של אותו לקוח."
   ],
   "correct": 1,
   "explain": "שלוש הסיבות שהמרצה מנה: הצגת ההנחה, ניתוח עסקי והחזר כספי לפי המחיר ששולם. א׳ — היפוך: הקטלוג חייב להמשיך לשמור את המחיר הנוכחי. ג׳ — הפוך מהמטרה: בדיוק את העדכון הזה אנחנו מונעים. ד׳ — אינדקס ייחודי אינו קשור לשמירת היסטוריה.",
   "book": {
    "page": 44,
    "where": "שאלה A-10 בעשרת הנושאים"
   }
  },
  "A-11": {
   "id": "A-11",
   "fam": "T2",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מה ההבדל בין שכפול המחיר ההיסטורי לתוך ההזמנה לבין שכפול שם המוצר לתוכה?",
   "options": [
    "אין הבדל: שניהם נתונים עובדתיים של העסקה, ולכן שניהם חייבים להישמר ואסור לעדכן אף אחד מהם.",
    "אין הבדל: שניהם נתוני תצוגה ולכן מיותרים בהזמנה.",
    "המחיר ההיסטורי הוא נתון עובדתי של העסקה; שם המוצר משוכפל לנוחות תצוגה בלבד.",
    "שם המוצר הוא העובדתי והמחיר הוא התצוגה, כי המחיר תמיד נגזר מהקטלוג הנוכחי ומהמבצעים הפעילים."
   ],
   "correct": 2,
   "explain": "ניסוח שלו: \"שכפול מחיר היסטורי משמש להצגת המחיר בעת ביצוע העסקה (נתון עובדתי). שכפול שם מוצר משמש לפשט את הנתונים לצורכי תצוגה בלבד.\" מכאן גם ההבדל במחיר העדכון: את המחיר אסור לעדכן, את השם אפשר וצריך. ד׳ הוא היפוך מדויק של התשובה הנכונה.",
   "book": {
    "page": 45,
    "where": "שאלה A-11 בעשרת הנושאים"
   }
  },
  "A-12": {
   "id": "A-12",
   "fam": "T2",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "שם מוצר שונה. ב-SQL הוא שמור בטבלת המוצרים בלבד; ב-MongoDB הוא הוטמע בתוך כל מסמכי ההזמנות.\n\nמה ההבדל בעלות העדכון?",
   "options": [
    "ב-MongoDB העדכון זול יותר, כי פעולה אחת מעדכנת את כל המסמכים הרלוונטיים בצורה אטומית ובטוחה.",
    "בשתי הגישות העלות זהה, כי בשתיהן שם המוצר נשמר במקום אחד בלבד ומשם הוא נקרא בכל שליפה.",
    "ב-SQL צריך לעדכן את כל הטבלאות שמקושרות לטבלת המוצרים, וב-MongoDB רק את מסמך המוצר האחד.",
    "ב-SQL משנים ברשומה אחת בטבלת המוצרים; ב-MongoDB צריך לעבור על כל ה-collections ולעדכן אותם."
   ],
   "correct": 3,
   "explain": "ניסוח שלו, מילה במילה. ג׳ הוא היפוך: ב-SQL הטבלאות מקושרות דרך המזהה ולכן השאילתות \"רואות\" את השם המעודכן בלי לגעת בהן. א׳ — אין ב-MongoDB עדכון חוצה-collections אטומי. ב׳ — מתעלם מכך שהשם הוטמע.",
   "book": {
    "page": 45,
    "where": "שאלה A-12 בעשרת הנושאים"
   }
  },
  "A-13": {
   "id": "A-13",
   "fam": "T2",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "איזו חלופה הציע המרצה עצמו כדי להימנע מהצורך לעדכן שם מוצר בהרבה מסמכים?",
   "options": [
    "לשמור בהזמנה רק את מזהה המוצר, ולשלוף את השם מה-collection המתאים באמצעות lookup.",
    "לשמור את השם בשני המקומות ולהריץ תהליך לילי שמסנכרן ביניהם, כדי שהעדכון לא יחסום את המשתמשים.",
    "להגדיר מפתח זר ב-MongoDB בין מסמכי ההזמנות למסמך המוצר, כך שהשם יתעדכן בכל המסמכים אוטומטית.",
    "לאסור שינוי שם של מוצר שנמכר, ובמקום זאת להוסיף מוצר חדש עם השם החדש ולהשאיר את הישן כארכיון."
   ],
   "correct": 0,
   "explain": "הוא כתב: \"אם נשמר המידע של השם רק לפי course id... אז אפשר לשלוף את שם הקורס מה-collection המתאים באמצעות lookup\". ג׳ — ל-MongoDB אין מפתחות זרים שמעדכנים אוטומטית. ב׳ ו-ד׳ הם עקיפות שהמרצה לא הציע ושמשאירות את הכפילות או מסבכות את הקטלוג.",
   "book": {
    "page": 45,
    "where": "שאלה A-13 בעשרת הנושאים"
   }
  },
  "A-14": {
   "id": "A-14",
   "fam": "T2",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "האם שכפול נתונים ב-NoSQL הוא בהכרח טעות עיצוב?",
   "options": [
    "כן, בהכרח. שכפול שובר את כללי הנורמליזציה, ולכן הוא תמיד באג שצריך לתקן לפני עליה לייצור.",
    "לא בהכרח — הכפילות היא חלק מהעיצוב, והיא הופכת לבעיה רק באי-עקביות בעדכונים חלקיים.",
    "לא, ושכפול אינו יוצר שום סיכון כל עוד מוגדר אינדקס ייחודי על השדה שמשוכפל בין המסמכים.",
    "כן, אלא אם מדובר בנתון שמשתנה בכל שנייה — ואז שכפול הוא הדרך היחידה לשמור על ביצועים."
   ],
   "correct": 1,
   "explain": "ניסוח שלו: \"ב-NoSQL זה לא בהכרח טעות, כי כל ישות מכילה את כל המידע שיש עליה\", ובסיכום: \"הופך לבעיה רק כאשר גורם לחוסר עקביות בעדכונים חלקיים\". א׳ — ניסוח מוחלט. ג׳ — אינדקס ייחודי אינו מונע אי-עקביות בין עותקים. ד׳ — היפוך: דווקא נתון שמשתנה בכל שנייה אסור להטמיע.",
   "book": {
    "page": 45,
    "where": "שאלה A-14 בעשרת הנושאים"
   }
  },
  "A-15": {
   "id": "A-15",
   "fam": "T2",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "ברשת חנויות שם המוצר מוטמע בכל ההזמנות. תהליך העדכון התחיל, עדכן חלק מהמסמכים ונפל באמצע.\n\nמה הנזק המדויק?",
   "options": [
    "אין נזק: המסמכים שלא עודכנו שומרים את השם ההיסטורי, וזה בדיוק המידע שרצינו לשמר בהזמנה.",
    "הנזק הוא בביצועים בלבד — חלק מהשאילתות יסרקו יותר מסמכים עד שהעדכון יושלם בהרצה הבאה.",
    "חלק מהמסמכים מחזיקים שם אחד וחלק אחר, ואי אפשר לדעת מהו הנתון הנכון.",
    "MongoDB יחזיר שגיאה בשליפה שתמצא שני ערכים שונים."
   ],
   "correct": 2,
   "explain": "זה בדיוק הניסוח שלו: \"אם עדכנתי מסמך אחד ולא עדכנתי את שאר המסמכים, איך אתה יודע בעצם מה העדכון הנכון?\" א׳ — טענה נכונה לגבי מחיר העסקה, אבל לא לגבי שם לתצוגה, שאמור להתרענן. ד׳ — המסד אינו בודק אחידות בין מסמכים, וזאת בדיוק הסכנה.",
   "book": {
    "page": 46,
    "where": "שאלה A-15 בעשרת הנושאים"
   }
  },
  "A-16": {
   "id": "A-16",
   "fam": "T2",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מתי שכפול של נתון הוא בחירה בטוחה, ולא סיכון?",
   "options": [
    "כששומרים את הנתון במקביל גם בטבלה מנורמלת, כדי שתמיד יהיה אפשר להשוות בין שני העותקים.",
    "רק ב-SQL, כי שם יש טרנזקציות שמגנות על שני העותקים.",
    "כשהנתון קטן בנפח, בלי קשר לקצב השינוי שלו — נתון קטן אינו מכביד גם אם הוא מופיע פעמים רבות.",
    "כשלנתון אין מחיר עדכון — הוא לא ישתנה עוד, כמו מחיר של עסקה שהסתיימה."
   ],
   "correct": 3,
   "explain": "הקריטריון הוא מחיר העדכון, לא הנפח. ג׳ — ניסוח \"בלי קשר לקצב השינוי\" מחמיץ את הגורם המכריע. א׳ — שני עותקים מנוהלים הם עוד כפילות, לא פתרון. ב׳ — ב-SQL משכפלים את המחיר להזמנה בלי טרנזקציה מתמשכת; הטרנזקציה אינה הסיבה.",
   "book": {
    "page": 46,
    "where": "שאלה A-16 בעשרת הנושאים"
   }
  },
  "A-17": {
   "id": "A-17",
   "fam": "T2",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "מנהל פיתוח טוען: \"רק MongoDB יכול לשמור מחיר היסטורי, כי ב-SQL המחיר יושב בקטלוג ומתעדכן.\"\n\nמה התשובה הנכונה?",
   "options": [
    "גם SQL שומר היסטוריה: משכפלים את המחיר לטבלת ההזמנות ולא נוגעים בקטלוג.",
    "הטענה נכונה: ב-SQL מפתח זר מחייב את שורת ההזמנה להצביע למחיר הנוכחי שבטבלת הקטלוג.",
    "הטענה נכונה, אבל רק במקרה שבטבלת ההזמנות אין עמודת תאריך שמאפשרת לשחזר את המחיר שהיה.",
    "הטענה שגויה, והפתרון הנכון ב-SQL הוא טריגר שמעדכן את שורות ההזמנות בכל שינוי מחיר בקטלוג."
   ],
   "correct": 0,
   "explain": "המרצה ניסח זאת ישירות: \"צריך לשכפל אותו לטבלת ההזמנות ולא לטבלה של הקטלוג הנוכחי\". ב׳ — מפתח זר מקשר למוצר, לא \"למחיר הנוכחי\". ד׳ — טריגר שמעדכן את ההזמנות הוא בדיוק מה שיהרוס את ההיסטוריה. ג׳ — עמודת תאריך אינה משחזרת מחיר שלא נשמר.",
   "book": {
    "page": 46,
    "where": "שאלה A-17 בעשרת הנושאים"
   }
  },
  "A-18": {
   "id": "A-18",
   "fam": "T2",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהו המחיר של הטמעת נתון משותף, כמו שם מוצר, בתוך מסמכי ההזמנות?",
   "options": [
    "המחיר הוא שאי אפשר להציג את ההזמנה בקריאה אחת, כי כל פריט דורש שליפה נפרדת של פרטי המוצר.",
    "המחיר הוא כפילות: אותו נתון מופיע בהרבה מסמכים, ולכן עדכון דורש מעבר על כולם.",
    "המחיר הוא שאי אפשר להגדיר אינדקס על שדות שנמצאים בתוך אובייקט מוטמע בתוך מסמך ההזמנה.",
    "אין מחיר: הטמעה היא השיטה המומלצת לכל סוג נתון ב-MongoDB, ולכן היא בחירת ברירת המחדל."
   ],
   "correct": 1,
   "explain": "הנכונה. א׳ — היפוך: קריאה אחת היא בדיוק היתרון של ההטמעה. ג׳ — אפשר לאנדקס שדות מוטמעים ב-MongoDB. ד׳ — ניסוח מוחלט; המרצה מדגיש שלכל פתרון יש מחיר.",
   "book": {
    "page": 46,
    "where": "שאלה A-18 בעשרת הנושאים"
   }
  },
  "A-19": {
   "id": "A-19",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מדוע בעייתי להטמיע את כל רשימת העוקבים בתוך מסמך המשתמש ברשת חברתית?",
   "options": [
    "כי MongoDB אינו תומך בשמירת מערכים בתוך מסמך, ולכן רשימת מזהים חייבת לשבת ב-collection נפרד.",
    "כי רשימת העוקבים היא נתון עובדתי של אירוע, ולכן היא חייבת להישמר בנפרד מטעמי ביקורת ותיעוד.",
    "כי עוקבים משתנים בכל שנייה, וגודל המסמך יכול להיות מאוד גדול ומגושם — מדובר במיליונים.",
    "כי אי אפשר להגדיר אינדקס ייחודי על מסמך שיש בתוכו מערך, ולכן לא ניתן למנוע מעקב כפול."
   ],
   "correct": 2,
   "explain": "שני הנימוקים שלו, וחייבים להופיע שניהם: קצב שינוי + גודל בלתי חסום. א׳ — שגוי טכנית: מונגו תומך במערכים. ד׳ — שגוי: אפשר להגדיר אינדקס ייחודי גם על שדה בתוך מערך. ב׳ — טענה מסוג אחר (היסטוריה), שאינה הנימוק כאן.",
   "book": {
    "page": 47,
    "where": "שאלה A-19 בעשרת הנושאים"
   }
  },
  "A-20": {
   "id": "A-20",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "איזה מבנה הציע המרצה לשמירת קשרי מעקב ולייקים?",
   "options": [
    "טבלה אחת רחבה שמכילה את כל המשתמשים, הפוסטים והלייקים, עם עמודת סוג שמבדילה ביניהם.",
    "מערך של מזהי עוקבים בתוך מסמך המשתמש, ובתוספת אינדקס ייחודי על המערך כדי למנוע כפילות.",
    "קובץ לוג חיצוני לכל קשר מעקב, שנטען למסד פעם ביום בתהליך אצווה כדי לא להכביד על הכתיבה.",
    "ב-SQL טבלאות מקשרות עם מפתחות זרים (users, posts, likes, followers); ב-NoSQL מסמך נפרד לכל קשר."
   ],
   "correct": 3,
   "explain": "ניסוח שלו: \"ב-SQL: טבלאות מקשרות עם foreign keys... ב-NoSQL: מסמכים נפרדים לכל קשר או הכנסת מזהים בתוך המסמכים\". ב׳ — זו בדיוק הגישה שהוא פסל למיליוני עוקבים. א׳ — טבלה רחבה אחת שוברת את המודל. ג׳ — אין לכך בסיס בחומר.",
   "book": {
    "page": 47,
    "where": "שאלה A-20 בעשרת הנושאים"
   }
  },
  "A-21": {
   "id": "A-21",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "כיצד מונעים שמשתמש ייתן לייק פעמיים לאותו פוסט?",
   "options": [
    "אינדקס ייחודי על צירוף userId ו-postId — הוא מונע כפילות של אותו צירוף ערכים.",
    "אינדקס ייחודי על userId בלבד, כדי שכל משתמש יופיע פעם אחת בלבד ב-collection הלייקים.",
    "אינדקס ייחודי על postId בלבד, כדי שלכל פוסט יישמר לייק אחד שמייצג את כל המשתמשים שלחצו.",
    "בדיקה בקוד האפליקציה לפני כל הכנסה, שהיא התחליף המומלץ לאינדקס כי היא אינה מאטה כתיבה."
   ],
   "correct": 0,
   "explain": "ניסוח שלו: \"unique index מונע כפילויות של אותו combination של ערכים\", ובסיכום: \"Unique Index על צירוף user ID ו-post ID\". ב׳ ו-ג׳ מגבילים שדה בודד ולכן שוברים התנהגות חוקית. ד׳ — בדיקה בקוד אינה עומדת בשתי בקשות בו-זמנית, וזאת בדיוק הסיבה לאינדקס.",
   "book": {
    "page": 47,
    "where": "שאלה A-21 בעשרת הנושאים"
   }
  },
  "A-22": {
   "id": "A-22",
   "fam": "T1",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "מתכנת הגדיר ב-collection הלייקים אינדקס ייחודי על השדה userId בלבד, כדי למנוע לייק כפול.\n\nמה תהיה התוצאה בפועל?",
   "options": [
    "הלייק הכפול יימנע כנדרש, אבל שליפת כל הלייקים של פוסט מסוים תאט מאוד בגלל האינדקס הנוסף.",
    "כל משתמש יוכל לתת לייק אחד בלבד בכל המערכת, והלייק השני שלו לכל פוסט אחר ייכשל.",
    "האינדקס לא ישפיע כלל, כי אינדקס ייחודי על שדה בודד אינו נאכף ב-MongoDB אלא על _id בלבד.",
    "הלייקים יישמרו כרגיל, אבל הסדר הכרונולוגי שלהם לא יישמר ולכן לא יהיה אפשר למיין אותם."
   ],
   "correct": 1,
   "explain": "הנכונה — האילוץ הוא על הערך של שדה אחד, ולכן הוא חוסם התנהגות חוקית לגמרי. ג׳ — שגוי: אינדקס ייחודי נאכף על כל שדה. א׳ ו-ד׳ מייחסים לאינדקס השפעות שאינן קיימות.",
   "book": {
    "page": 48,
    "where": "שאלה A-22 בעשרת הנושאים"
   }
  },
  "A-23": {
   "id": "A-23",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "איזה קריטריון נתן המרצה להכרעה בין SQL ל-NoSQL ברשת החברתית?",
   "options": [
    "מספר המשתמשים הרשומים במערכת, ומעליו מיליון משתמשים עוברים ל-NoSQL בלי קשר למבנה.",
    "האם יש במערכת צורך בדוחות כספיים, ואם כן — SQL, ואם לא — NoSQL, בלי שיקולים נוספים.",
    "גודל המערכים: SQL אם המערכים גדולים מאוד, NoSQL אם הם קטנים יותר כי ההצגה קלה יותר.",
    "שפת התכנות שבה כתובה האפליקציה ומידת ההיכרות של הצוות עם כל אחד משני סוגי המסדים."
   ],
   "correct": 2,
   "explain": "ניסוח שלו: \"SQL — אם המערכים גדולים מאוד. NoSQL — אם המערכים קטנים יותר, כי ההצגה תהיה קלה יותר.\" זה הקריטריון החוזר שלו. שאר האפשרויות הן שיקולים שלא הוא העלה בהקשר הזה.",
   "book": {
    "page": 48,
    "where": "שאלה A-23 בעשרת הנושאים"
   }
  },
  "A-24": {
   "id": "A-24",
   "fam": "T1",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "משתמש עוקב אחרי 500 משתמשים, וה-feed שלו נטען לאט.\n\nאיזו קבוצת טכניקות הציע המרצה?",
   "options": [
    "להעביר את כל ה-feed ל-SQL ולהריץ JOIN בין חמש טבלאות, כי לשליפות מורכבות SQL יעיל יותר.",
    "להטמיע את כל הפוסטים של 500 המשתמשים בתוך מסמך המשתמש, כדי לקבל את ה-feed בקריאה אחת.",
    "להגדיר אינדקס ייחודי על צירוף העוקב והנעקב, שגם מונע מעקב כפול וגם מזרז את בניית ה-feed.",
    "להציג רק את 100 המשתמשים האחרונים, להוסיף שדה כמות עוקבים שמתעדכן בזמן אמת, ולהציג רק מה שנכנס למסך."
   ],
   "correct": 3,
   "explain": "שלוש הטכניקות שלו: הגבלה, שדה מחושב והצגה חלקית. ב׳ — הפוך ממה שהוא פסל (מסמך ענק). ג׳ — האינדקס הייחודי אכן נדרש, אבל לשם מניעת כפילות; זו טענה נכונה שאינה עונה על שאלת הביצועים. א׳ — אינו הפתרון שהוא הציע לתרחיש הזה.",
   "book": {
    "page": 48,
    "where": "שאלה A-24 בעשרת הנושאים"
   }
  },
  "A-25": {
   "id": "A-25",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מהו המחיר של שדה \"מספר עוקבים\" שנשמר במסמך המשתמש ומתעדכן בזמן אמת?",
   "options": [
    "השדה המחושב הוא נתון משוכפל: אם העדכון שלו נכשל, הוא לא יתאים לספירה האמיתית.",
    "השדה המחושב מאט כל כתיבה בכל ה-collection, כי הוא מחייב סריקה מלאה של קשרי המעקב בכל שינוי.",
    "אין מחיר: שדה מחושב הוא שיפור נקי של הביצועים, ולכן כדאי להוסיף אותו לכל שאילתה נפוצה.",
    "השדה המחושב מונע הגדרת אינדקס ייחודי על המסמך, ולכן הוא פוגע ביכולת למנוע מעקב כפול."
   ],
   "correct": 0,
   "explain": "הנכונה — זה בדיוק \"אי-עקביות בעדכונים חלקיים\" שהמרצה הצביע עליה. ב׳ — מונה אחד מתעדכן בפעולה קטנה, לא בסריקה. ג׳ — ניסוח מוחלט. ד׳ — אין קשר בין שדה מחושב לאינדקס ייחודי.",
   "book": {
    "page": 48,
    "where": "שאלה A-25 בעשרת הנושאים"
   }
  },
  "A-26": {
   "id": "A-26",
   "fam": "T1",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 3,
   "q": "ברשת חברתית הוחלט להטמיע את 50 הלייקים האחרונים בכל מסמך פוסט, \"כדי לקבל הכול בקריאה אחת\". כעת מבקשים דוח: כל המשתמשים שנתנו יותר מ-100 לייקים בחודש.\n\nמה נכון?",
   "options": [
    "הדוח יהיה מהיר במיוחד, כי כל הלייקים כבר מוטמעים בתוך הפוסטים ולכן אין צורך ב-lookup כלשהו.",
    "יתרון הקריאה האחת לא עוזר לדוח הזה: הוא דורש אגרגציה לרוחב כל הפוסטים, ובמבנה הזה גם חסרים לייקים.",
    "הדוח בלתי אפשרי ב-MongoDB, כי אין בו מנגנון אגרגציה שמאפשר לקבץ ולספור לפי משתמש.",
    "הדוח יעבוד היטב, אבל רק אם מוסיפים אינדקס ייחודי על מערך הלייקים שבתוך כל מסמך פוסט."
   ],
   "correct": 1,
   "explain": "הנכונה — \"היתרון של קריאה אחת נעלם בשאילתות מורכבות\", וכאן ההטמעה גם קטעה מידע (רק 50 אחרונים). א׳ — היפוך. ג׳ — שגוי: ל-MongoDB יש aggregation. ד׳ — אינדקס אינו מחזיר לייקים שלא נשמרו.",
   "book": {
    "page": 49,
    "where": "שאלה A-26 בעשרת הנושאים"
   }
  },
  "A-27": {
   "id": "A-27",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מה אינדקס ייחודי מונע, ומה הוא אינו מונע?",
   "options": [
    "הוא מונע גם כפילות של צירוף ערכים וגם חריגה ממספר הלייקים המותר לכל פוסט במערכת.",
    "הוא מונע חריגה מקיבולת שהוגדרה מראש, אבל אינו מונע כפילות של אותו צירוף ערכים בשתי רשומות.",
    "הוא מונע רק כפילות של אותו צירוף ערכים — הוא אינו פותר קיבולת או מגבלות כמות.",
    "הוא אינו מונע דבר ב-MongoDB; זהו מנגנון של SQL בלבד, ובמונגו צריך לממש אותו בקוד האפליקציה."
   ],
   "correct": 2,
   "explain": "ניסוח המרצה: \"unique index מונע כפילויות של אותו combination של ערכים\" — וזה כל מה שהוא עושה. שתי רשומות שונות שמתחרות על המקום האחרון הן שתי רשומות חוקיות, ולכן האינדקס לא יעצור אותן. ב׳ הוא היפוך מדויק, ד׳ שגוי עובדתית.",
   "book": {
    "page": 49,
    "where": "שאלה A-27 בעשרת הנושאים"
   }
  },
  "A-28": {
   "id": "A-28",
   "fam": "T9",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "בבית חולים בדיקות מעבדה שונות כוללות שדות שונים לחלוטין. מהו היתרון של מבנה מסמכים גמיש?",
   "options": [
    "מבנה גמיש מאפשר להגדיר מפתחות זרים בין מסמכים בלי לשנות את הסכמה, ולכן הוא שומר על קשרים.",
    "מבנה גמיש מבטיח שכל מסמך יכיל את אותם שדות, ולכן הדוחות יוצאים אחידים בלי עיבוד מקדים.",
    "מבנה גמיש חוסך מקום באחסון כי המסד דוחס את השדות הריקים ואינו שומר אותם כלל בדיסק.",
    "ב-MongoDB ניתן להוסיף שדות חדשים במהירות בזמן אמת, בעוד ש-SQL דורש בדיקה ועדכון של הטבלה."
   ],
   "correct": 3,
   "explain": "ניסוח שלו, מילה במילה. ב׳ — היפוך: גמישות פירושה שאין אחידות מובטחת. א׳ — למונגו אין מפתחות זרים אכופים. ג׳ — חיסכון במקום הוא תוצאה אפשרית, לא היתרון שהוא מנה, ו\"דחיסה\" אינה ההסבר.",
   "book": {
    "page": 50,
    "where": "שאלה A-28 בעשרת הנושאים"
   }
  },
  "A-29": {
   "id": "A-29",
   "fam": "T9",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "בבית חולים עברו ל-MongoDB בשל גמישות הסכמה. מנהל הפיתוח אומר: \"עכשיו אין צורך בבדיקות — המסד מקבל כל מסמך.\"\n\nמה התשובה?",
   "options": [
    "הגמישות אינה מבטלת את הצורך לבדוק תלויות ולאמת נתונים — למשל לפני מחיקת רשומה שתלויים בה אחרים.",
    "הוא צודק: MongoDB מריץ validation אוטומטי על כל מסמך לפני הכתיבה ודוחה מסמכים לא תקינים.",
    "הוא צודק, בתנאי שכל מסמך מקבל _id ייחודי — המזהה הייחודי הוא שמחליף את כל הבדיקות הלוגיות.",
    "הוא טועה, אבל רק מסיבת ביצועים: בדיקות תקינות מאיטות את הכתיבה ולכן כדאי להריץ אותן באצווה."
   ],
   "correct": 0,
   "explain": "ניסוח שלו: \"גמישות ה-schema... לא מבטלת את הצורך לבדוק תלויות — למשל, אם מוצר נקנה או הוזמן, לא ניתן למחוק אותו ללא validation\". ב׳ — שגוי: validation במונגו צריך להגדיר במפורש. ג׳ — _id מונע התנגשות מסמכים, לא שבירת חוקים עסקיים. ד׳ — מחליף את טעות הנתונים בטיעון ביצועים.",
   "book": {
    "page": 50,
    "where": "שאלה A-29 בעשרת הנושאים"
   }
  },
  "A-30": {
   "id": "A-30",
   "fam": "T9",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "בבית חולים מחקו רשומת מטופל שיש לה תוצאות מעבדה משויכות. ב-SQL הפעולה נחסמה; ב-MongoDB היא עברה בשקט.\n\nמי אוכף את תקינות הנתונים בכל אחת מהארכיטקטורות?",
   "options": [
    "בשתי הארכיטקטורות המסד אוכף את החוקים העסקיים באופן זהה, וההבדל הוא רק בתחביר ההגדרה.",
    "ב-SQL המסד אוכף במפתחות זרים ובאילוצים; ב-MongoDB האחריות עוברת לאפליקציה או ל-validation מוגדר.",
    "ב-MongoDB המסד אוכף וב-SQL האפליקציה, כי ב-SQL האילוצים הם המלצה בלבד ואינם נבדקים בכתיבה.",
    "בשתיהן האפליקציה אוכפת, והמפתחות הזרים והאילוצים הם תיעוד למתכנת ולא מנגנון שנאכף בפועל."
   ],
   "correct": 1,
   "explain": "הנכונה — ההבדל הוא במי אוכף, לא בשאלה אם יש חוקים. ג׳ הוא היפוך מדויק, ד׳ שגוי עובדתית (אילוצי SQL נאכפים), א׳ מתעלם מההבדל המרכזי.",
   "book": {
    "page": 50,
    "where": "שאלה A-30 בעשרת הנושאים"
   }
  },
  "A-31": {
   "id": "A-31",
   "fam": "T9",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בבית חולים הוחלט להטמיע את כל תוצאות המעבדה של מטופל בתוך מסמך המטופל. למטופל כרוני הצטברו אלפי תוצאות.\n\nמה השיקול שמכריע?",
   "options": [
    "ההטמעה נכונה: התיק הרפואי המלא נשלף בקריאה אחת, וזה השיקול היחיד שחשוב במערכת רפואית.",
    "אין הכרעה — מגבלת גודל המסמך לא תגיע בפועל, ולכן שתי הגישות שקולות מבחינה מעשית לגמרי.",
    "מספר התוצאות אינו חסום, ולכן המסמך גדל ומסורבל — מסמך נפרד לכל תוצאה, כמו 200 ההרשמות.",
    "ההכרעה היא לפי גמישות הסכמה בלבד: מכיוון שהשדות משתנים בין בדיקות, חייבים להטמיע אותן יחד."
   ],
   "correct": 2,
   "explain": "זה אותו דפוס בדיוק של \"עדיף לעשות 200 נפרדים\". א׳ — יתרון אמיתי, אבל \"השיקול היחיד\" הוא ניסוח מוחלט ושגוי. ד׳ — גמישות הסכמה נשמרת גם במסמך נפרד לכל תוצאה, ולכן אינה שיקול לכאן.",
   "book": {
    "page": 50,
    "where": "שאלה A-31 בעשרת הנושאים"
   }
  },
  "A-32": {
   "id": "A-32",
   "fam": "T9",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהו המחיר של מסמך נפרד לכל תוצאת מעבדה, במקום הטמעה במסמך המטופל?",
   "options": [
    "אין מחיר; מסמך נפרד עדיף בכל קריטריון — גם בקריאה, גם בכתיבה וגם בדוחות, ולכן זו בחירה חופשית.",
    "המחיר הוא שאי אפשר להוסיף שדות חדשים לסוג בדיקה חדש, כי כל המסמכים ב-collection חייבים להתאים.",
    "התוצאה תאבד את השיוך למטופל.",
    "המחיר הוא lookup נוסף בעת הצגת התיק המלא."
   ],
   "correct": 3,
   "explain": "הנכונה — זהו המחיר, ולכן התשובה במבחן חייבת לכלול אותו. א׳ — ניסוח מוחלט. ב׳ — גמישות הסכמה נשמרת. ג׳ — השיוך נשמר בשדה patientId; חוסר מפתח זר אינו מאבד נתון.",
   "book": {
    "page": 51,
    "where": "שאלה A-32 בעשרת הנושאים"
   }
  },
  "A-33": {
   "id": "A-33",
   "fam": "T9",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בבית חולים: זהות המטופל, אשפוזים, מרשמים וחיובים מצד אחד; תוצאות מעבדה ודימות מצד שני.\n\nאיזו חלוקה מתאימה?",
   "options": [
    "הליבה העסקית ב-SQL — מבנה קבוע, עקביות קריטית ודוחות; תוצאות הבדיקות ב-NoSQL — מבנה משתנה ונפח גדול.",
    "הכול ב-NoSQL, כי בית חולים מייצר נפח גדול של נתונים ולכן גמישות חשובה יותר מעקביות מלאה.",
    "הכול ב-SQL, כי נתונים רפואיים מחייבים מפתחות זרים ואילוצים, ולכן גמישות סכמה אסורה כאן לגמרי.",
    "חלוקה הפוכה: המרשמים והחיובים ב-NoSQL כי הם משתנים, ותוצאות הבדיקות ב-SQL כי המבנה שלהן קבוע."
   ],
   "correct": 0,
   "explain": "הנכונה — חלוקה לפי דפוס הגישה ולפי מבנה הנתון. ד׳ הוא היפוך מדויק: חיובים הם בדיוק הנתון שדורש עקביות, ותוצאות בדיקה הן בדיוק הנתון בעל המבנה המשתנה. ב׳ ו-ג׳ הם ניסוחים מוחלטים לשני הכיוונים.",
   "book": {
    "page": 51,
    "where": "שאלה A-33 בעשרת הנושאים"
   }
  },
  "A-34": {
   "id": "A-34",
   "fam": "T9",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מה קורה ב-SQL כשמוסיפים עמודה שרלוונטית רק לחלק קטן מהרשומות?",
   "options": [
    "עמודות ריקות ב-SQL אינן בעיה, כי NULL אינו תופס מקום ואינו משפיע על שאילתות ועל דוחות קיימים.",
    "העמודה חלה על כל הרשומות, ולכן נוצרת טבלה רחבה שרוב הרשומות משאירות בה ערך ריק.",
    "SQL אינו מאפשר להוסיף עמודה לטבלה שיש בה נתונים, ולכן חייבים ליצור טבלה חדשה ולהעביר אליה.",
    "העמודה נוספת רק לרשומות חדשות שייכתבו מעתה, ולכן הרשומות הקיימות אינן נוגעות בה ואין בעיה."
   ],
   "correct": 1,
   "explain": "הנכונה — זהו המקרה של \"150 מאפיינים אפשריים, 8 רלוונטיים\". ג׳ ו-ד׳ שגויים עובדתית. א׳ — שגוי: טבלה רחבה עם NULL מכבידה על תחזוקה, על שאילתות ועל הבנת המודל.",
   "book": {
    "page": 51,
    "where": "שאלה A-34 בעשרת הנושאים"
   }
  },
  "A-35": {
   "id": "A-35",
   "fam": "T9",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בבית חולים נכתב מסמך תוצאת בדיקה שבו שדה הערך נקרא value במקום result. שום שגיאה לא נזרקה.\n\nמה הסיכון?",
   "options": [
    "אין סיכון: MongoDB ממפה שמות שדות דומים זה לזה אוטומטית, ולכן השליפה תמצא את הנתון בכל מקרה.",
    "הסיכון הוא ביצועים: שני שמות מכפילים את האינדקס.",
    "הטעות תתגלה רק כשהדוח או המסך ייראו שבורים, כי המסד אינו אוכף מבנה.",
    "MongoDB ידחה את המסמך בשליפה הראשונה שתבקש את השדה result, ולכן הטעות תתגלה מיד ותתוקן."
   ],
   "correct": 2,
   "explain": "הנכונה — \"הגמישות מעבירה את האחריות על תקינות הנתונים מהמסד לאפליקציה\". א׳ ו-ד׳ שגויים עובדתית: המסד אינו ממפה ואינו דוחה. ב׳ — הופך כשל נתונים לכשל ביצועים.",
   "book": {
    "page": 51,
    "where": "שאלה A-35 בעשרת הנושאים"
   }
  },
  "A-36": {
   "id": "A-36",
   "fam": "T9",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "האם בית חולים הוא בהכרח מערכת שמתאימה ל-NoSQL?",
   "options": [
    "כן — נתונים רפואיים דורשים גמישות סכמה גבוהה, ולכן NoSQL עדיף לכל רכיב במערכת כזאת תמיד.",
    "לא — נתונים רפואיים דורשים עקביות מוחלטת, ולכן SQL עדיף לכל רכיב במערכת כזאת, בלי יוצא מן הכלל.",
    "כן, אבל רק בבית חולים שבו רשומים פחות ממיליון מטופלים ונפח תוצאות הבדיקות עדיין קטן.",
    "לא בהכרח: לכל רכיב דפוס גישה ומבנה אחרים, ולכן ההכרעה היא לפי הרכיב ולא לפי המערכת כולה."
   ],
   "correct": 3,
   "explain": "\"האם בהכרח\" — התשובה תמיד \"לא בהכרח\" + נימוק לשני הכיוונים. א׳ ו-ב׳ הם שני ניסוחים מוחלטים הופכיים, ושניהם שגויים. ג׳ — ההכרעה אינה לפי מספר המטופלים אלא לפי דפוס הגישה והמבנה.",
   "book": {
    "page": 52,
    "where": "שאלה A-36 בעשרת הנושאים"
   }
  },
  "A-37": {
   "id": "A-37",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מדוע לא לשמור את כל אירועי המעקב כמערך בתוך מסמך המשלוח?",
   "options": [
    "המערך אינו חסום — עשרות תחנות ו-GPS בכל שנייה מייצרים אלפי רשומות, והמסמך גדל בלי הגבלה.",
    "MongoDB מגביל מערך ל-100 פריטים, ולכן אירועים נוספים יידחו והמידע ההיסטורי יאבד בשקט.",
    "אירועי מעקב הם נתון עובדתי של העסקה, ולכן הם חייבים להישמר דווקא בטבלה רלציונית עם אילוצים.",
    "מערך בתוך מסמך אינו ניתן למיון לפי חתימת זמן, ולכן אי אפשר להציג את האירועים בסדר כרונולוגי."
   ],
   "correct": 0,
   "explain": "זאת בדיוק הבעיה של מיליוני העוקבים: צמיחה בלתי חסומה + תדירות כתיבה גבוהה. ב׳ ו-ד׳ שגויים עובדתית. ג׳ — \"נתון עובדתי\" הוא טיעון נכון כשלעצמו, אבל הוא אינו הנימוק נגד מערך מוטמע.",
   "book": {
    "page": 52,
    "where": "שאלה A-37 בעשרת הנושאים"
   }
  },
  "A-38": {
   "id": "A-38",
   "fam": "T1",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "חברת שילוח צריכה להציג ללקוח את הסטטוס הנוכחי מיד, ובמקביל לשמור היסטוריה מלאה של כל האירועים.\n\nאיזה מבנה מתאים?",
   "options": [
    "מערך אירועים בתוך מסמך המשלוח, ושליפה של האיבר האחרון במערך בכל בקשה של הלקוח לסטטוס.",
    "שדה סטטוס נוכחי במסמך המשלוח, ובמקביל collection נפרד עם מסמך לכל אירוע.",
    "collection אחד של אירועים בלבד, וחישוב הסטטוס בכל בקשה באגרגציה על כל אירועי המשלוח.",
    "שתי מערכות נפרדות לחלוטין, בלי שום שדה מזהה משותף ביניהן, כדי שכל אחת תוכל להתפתח לבד."
   ],
   "correct": 1,
   "explain": "הנכונה — בדיוק הרעיון של שדה \"מספר עוקבים\" שהמרצה הציע: נתון מוכן מראש לפעולה הנפוצה, והיסטוריה מלאה במסמכים נפרדים. ג׳ — טכנית אפשרי ואף נכון להיסטוריה, אבל אינו עונה על \"להציג מיד\". א׳ — מערך בלתי חסום. ד׳ — בלי מזהה משותף אין קישור.",
   "book": {
    "page": 53,
    "where": "שאלה A-38 בעשרת הנושאים"
   }
  },
  "A-39": {
   "id": "A-39",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מהו המחיר של שדה \"סטטוס נוכחי\" במסמך המשלוח?",
   "options": [
    "אין מחיר: הסטטוס נגזר ישירות מהאירועים בזמן השליפה, ולכן הוא תמיד מדויק ומסונכרן איתם.",
    "המחיר הוא נפח: שדה נוסף במסמך המשלוח מכפיל את גודלו ולכן מכביד על כל שליפה במערכת.",
    "הסטטוס הוא נתון משוכפל — אם העדכון שלו נכשל, הוא לא יתאים להיסטוריה.",
    "המחיר הוא שאי אפשר להגדיר אינדקס על שדה שמתעדכן בתדירות גבוהה, ולכן השליפה לפיו איטית."
   ],
   "correct": 2,
   "explain": "הנכונה — \"שדה מחושב הוא נתון משוכפל\", וזה המחיר שהתשובה במבחן חייבת לנסח. א׳ — שגוי: השדה נשמר ולא נגזר. ב׳ ו-ד׳ מייחסים לשדה אחד השפעות שאינן קיימות.",
   "book": {
    "page": 53,
    "where": "שאלה A-39 בעשרת הנושאים"
   }
  },
  "A-40": {
   "id": "A-40",
   "fam": "T1",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "אירוע מעקב משעה 09:00 מגיע לשרת באיחור, אחרי שאירוע משעה 11:00 כבר נרשם. המערכת מעדכנת את שדה הסטטוס לפי סדר ההגעה.\n\nמה יקרה, ומה הפתרון?",
   "options": [
    "ההיסטוריה תישבר ואירוע 11:00 יימחק; הפתרון הוא לאסור כתיבה של אירועים שלא בסדר כרונולוגי.",
    "לא יקרה דבר: MongoDB מסדר כתיבות לפי חתימת הזמן שבמסמך ומתעלם מאירועים שהגיעו באיחור.",
    "הסטטוס יישאר נכון, אבל ההיסטוריה תוצג בסדר הפוך; הפתרון הוא מיון לפי זמן בעת השליפה.",
    "הסטטוס \"יחזור אחורה\" והלקוח יראה תחנה קודמת; הפתרון — לעדכן את הסטטוס רק אם חתימת הזמן מאוחרת."
   ],
   "correct": 3,
   "explain": "הנכונה — אי-עקביות מעדכון חלקי של נתון משוכפל, והפתרון הוא עדכון מותנה בחתימת זמן. ההיסטוריה עצמה אינה נפגעת כי כל אירוע הוא מסמך נפרד — ולכן א׳ שגוי. ב׳ שגוי עובדתית. ג׳ — מתאר בעיה אחרת (סדר תצוגה) ומחמיץ את שבירת הסטטוס.",
   "book": {
    "page": 53,
    "where": "שאלה A-40 בעשרת הנושאים"
   }
  },
  "A-41": {
   "id": "A-41",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "אילו שיקולים מצדיקים להפריד את אחסון נתוני ה-GPS מהמסד העסקי?",
   "options": [
    "נפח וקצב כתיבה עצומים, דפוס גישה שונה ומחזור חיים קצר — ולכן הם יפגעו בביצועי המערכת העסקית.",
    "נתוני GPS אינם ניתנים לאינדוקס באותו מסד שבו מוגדרים מפתחות זרים, ולכן ההפרדה היא כפויה טכנית.",
    "נתוני GPS חייבים להיות עקביים יותר מהחיובים ומההזמנות, ולכן הם דורשים מסד עם אילוצים חזקים.",
    "SQL אינו יכול לשמור קואורדינטות ולכן נתוני מיקום מחייבים אחסון מסוג אחר בכל מערכת שילוח."
   ],
   "correct": 0,
   "explain": "שלושת השיקולים: נפח וקצב כתיבה, דפוס גישה, מחזור חיים. ג׳ הוא היפוך: דווקא החיובים דורשים עקביות גבוהה יותר. ב׳ ו-ד׳ שגויים עובדתית.",
   "book": {
    "page": 53,
    "where": "שאלה A-41 בעשרת הנושאים"
   }
  },
  "A-42": {
   "id": "A-42",
   "fam": "T1",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "בחברת שילוח הפרידו את נתוני ה-GPS לאחסון נפרד מהמסד העסקי.\n\nמה המחיר של ההחלטה?",
   "options": [
    "אין מחיר; ההפרדה משפרת כל קריטריון — ביצועים, עקביות, תחזוקה ועלות — בלי תמורה כלשהי.",
    "שתי מערכות לתחזק וצורך לסנכרן ביניהן — והסנכרון הוא המקום שבו נוצרת אי-עקביות.",
    "המחיר הוא שנתוני ה-GPS יאבדו את חתימת הזמן שלהם, ולכן לא יהיה אפשר לשחזר מסלול היסטורי.",
    "המחיר הוא שאי אפשר יהיה למחוק נתוני GPS ישנים, כי אחסון נפרד אינו תומך במחיקה לפי תאריך."
   ],
   "correct": 1,
   "explain": "הנכונה — זה המחיר הקבוע של ארכיטקטורה משולבת. א׳ — ניסוח מוחלט, וזו טעות קלאסית בחלק א׳. ג׳ ו-ד׳ שגויים עובדתית.",
   "book": {
    "page": 54,
    "where": "שאלה A-42 בעשרת הנושאים"
   }
  },
  "A-43": {
   "id": "A-43",
   "fam": "T1",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בחברת שילוח כל רכב מדווח מיקום בכל שנייה. הנתונים נקראים בעיקר כשרוצים לשחזר בדיעבד את המסלול של משלוח מסוים.\n\nמהו דפוס הגישה לנתוני ה-GPS?",
   "options": [
    "נקרא הרבה ונכתב מעט, ולכן הוא דורש אינדקסים רבים על כל שדה שמופיע בשאילתות התצוגה.",
    "נכתב ונקרא באותה תדירות, ודורש עקביות מלאה בדיוק כמו החיובים והתשלומים של אותה חברה.",
    "נכתב הרבה ונקרא מעט, לרוב כסדרה לפי זמן.",
    "נכתב פעם ביום בתהליך אצווה."
   ],
   "correct": 2,
   "explain": "הנכונה — ולכן הוא מתאים לאחסון שמותאם לכתיבה ולסדרות זמן, בעוד שהנתונים העסקיים נקראים הרבה ודורשים עקביות. א׳ הוא היפוך של דפוס הגישה. ב׳ ו-ד׳ סותרים את \"דיווח בכל שנייה\".",
   "book": {
    "page": 54,
    "where": "שאלה A-43 בעשרת הנושאים"
   }
  },
  "A-44": {
   "id": "A-44",
   "fam": "T1",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בחברת השילוח נתוני ה-GPS של שלוש השנים האחרונות תופסים פי עשרים מנפח כל הנתונים העסקיים יחד.\n\nאיזה שיקול תכנוני עולה מכאן?",
   "options": [
    "יש להעביר גם את ההזמנות והחיובים לאותו אחסון שבו יושב ה-GPS, כדי לאחד את התחזוקה והגיבוי.",
    "יש לדחוס את הנתונים העסקיים, כי הם הגורם האמיתי לנפח והם אלה שגדלים בקצב הגבוה ביותר.",
    "יש להגדיר אינדקס ייחודי על צירוף מזהה הרכב וחתימת הזמן, וההגדרה הזאת תקטין את הנפח הכולל.",
    "מחזור החיים שונה: אפשר למחוק או לארכב נתוני GPS אחרי תקופה, בעוד שהזמנות וחיובים נשמרים לשנים."
   ],
   "correct": 3,
   "explain": "הנכונה — מחזור חיים הוא אחד משלושת השיקולים להפרדה. א׳ הוא היפוך של ההמלצה. ב׳ מזהה את הגורם הלא נכון. ג׳ — אינדקס מוסיף נפח, הוא אינו מקטין אותו.",
   "book": {
    "page": 54,
    "where": "שאלה A-44 בעשרת הנושאים"
   }
  },
  "A-45": {
   "id": "A-45",
   "fam": "T1",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מדוע לא לחשב את הסטטוס הנוכחי בכל בקשה באגרגציה על כל אירועי המשלוח?",
   "options": [
    "כי זה מחייב לסרוק אלפי רשומות בכל הצגה, והפעולה הנפוצה היא בדיוק הצגת הסטטוס.",
    "כי MongoDB אינו תומך באגרגציה שמסתמכת על חתימת זמן, ולכן אי אפשר למצוא את האירוע האחרון.",
    "כי אגרגציה אינה יכולה להחזיר מסמך בודד אלא רק קבוצות מקובצות, ולכן התוצאה לא תהיה שימושית.",
    "כי האגרגציה מוחקת את האירועים שהיא עברה עליהם, ולכן ההיסטוריה תאבד אחרי ההצגה הראשונה."
   ],
   "correct": 0,
   "explain": "הנכונה — השלב הראשון בתבנית התשובה הוא \"מה הפעולה הנפוצה\", וכאן היא הצגת הסטטוס. ב׳, ג׳ ו-ד׳ שגויים עובדתית.",
   "book": {
    "page": 54,
    "where": "שאלה A-45 בעשרת הנושאים"
   }
  },
  "A-46": {
   "id": "A-46",
   "fam": "T10",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "במערכת הזמנות: פריטי ההזמנה נשלפים כמעט תמיד יחד עם ההזמנה, אך נתוני המוצר משתנים לעיתים קרובות. מה להטמיע ומה לשמור בהפניה?",
   "options": [
    "להטמיע את נתוני המוצר מהקטלוג בתוך כל פריט, ולשמור את ההזמנה עצמה בהפניה לפי מזהה הלקוח.",
    "להטמיע את פריטי ההזמנה בתוך ההזמנה (כמות, מחיר בעת הרכישה, שם לתצוגה), ולשמור את המוצר בהפניה.",
    "להטמיע הכול — גם הפריטים וגם כל פרטי הקטלוג — כדי שכל הצגה של הזמנה תהיה קריאה אחת בלבד.",
    "לשמור הכול בהפניה — גם הפריטים וגם המוצר — כדי למנוע כל כפילות ולשמור על עקביות מוחלטת."
   ],
   "correct": 1,
   "explain": "הנכונה — ההכרעה לפי דפוס הגישה: הפריטים נשלפים יחד עם ההזמנה והמערך חסום, ולכן מוטמעים; נתוני המוצר משתנים ומשותפים, ולכן בהפניה. א׳ הוא היפוך מדויק. ג׳ ו-ד׳ הם פתרונות חד-צדדיים שמתעלמים מהמחיר של כל אחד.",
   "book": {
    "page": 55,
    "where": "שאלה A-46 בעשרת הנושאים"
   }
  },
  "A-47": {
   "id": "A-47",
   "fam": "T10",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "כיצד משפיעה הבחירה בין הטמעה להפניה על מספר פעולות הקריאה בהצגת הזמנה?",
   "options": [
    "מספר הקריאות זהה בשתי הגישות, כי המסד מאחד את הקריאות לפעולה אחת לפני שהוא מחזיר תשובה.",
    "בהפניה נדרשת קריאה אחת, ובהטמעה נדרשות שלוש — אחת להזמנה, אחת לפריטים ואחת למוצרים.",
    "בהטמעה — קריאה אחת בלי lookup; בהפניה — קריאה להזמנה, לפריטים ולמוצרים, או JOIN בין שלוש טבלאות.",
    "בהטמעה נדרשת קריאה נפרדת לכל פריט בהזמנה, ולכן הזמנה עם עשרה פריטים דורשת עשר קריאות."
   ],
   "correct": 2,
   "explain": "ניסוח המרצה על תיק מלא במסך אחד: \"הוא חוסך JOIN כי כל התיק אמור להישלף בקריאה אחת. החיסרון הוא שהנתונים יהיו כפולים.\" ב׳ ו-ד׳ הם היפוכים. א׳ שגוי עובדתית.",
   "book": {
    "page": 55,
    "where": "שאלה A-47 בעשרת הנושאים"
   }
  },
  "A-48": {
   "id": "A-48",
   "fam": "T10",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "בחנות עם מיליון הזמנות עודכן המחיר הקטלוגי של מוצר פופולרי.\n\nאיך משפיעה כאן ההחלטה בין הטמעה להפניה?",
   "options": [
    "בהטמעה העדכון זול, כי כל ההזמנות מצביעות לאותו מסמך מוצר ולכן די בעדכון אחד שמשפיע על כולן.",
    "בהפניה העדכון יקר, כי צריך לעדכן גם את מסמכי ההזמנות וגם את הקטלוג כדי לשמור על עקביות.",
    "בשתי הגישות העדכון זהה בעלותו, כי בשתיהן מדובר בעדכון של שדה מחיר בודד במסד הנתונים.",
    "בהפניה — עדכון במקום אחד וכל ההזמנות רואות אותו דרך המזהה; בהטמעה — מעבר על כל המסמכים."
   ],
   "correct": 3,
   "explain": "הנכונה — זהו ניסוח המרצה: \"ב-SQL אתה משנה את זה במקום אחד... וב-MongoDB צריך לעבור על כל ה-collections ולעדכן אותם\", וכל עדכון חלקי יוצר אי-עקביות. א׳ ו-ב׳ הם היפוכים מדויקים.",
   "book": {
    "page": 56,
    "where": "שאלה A-48 בעשרת הנושאים"
   }
  },
  "A-49": {
   "id": "A-49",
   "fam": "T10",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מהו הקריטריון שנתן המרצה להכרעה בין embedded לבין references?",
   "options": [
    "הבחירה לפי גודל הזיכרון ולפי הקריאות למשתמש: אם רוצים שהכול יהיה קריא — embedded; אחרת references.",
    "הבחירה קבועה: embedded ב-MongoDB ו-references ב-SQL, כי כך מוגדרות שתי השפות מעצם טבען.",
    "הבחירה לפי מספר המשתמשים במערכת: מעל אלף משתמשים בוחרים references, ומתחת לכך embedded.",
    "הבחירה לפי האם קיימת במודל טבלה מקשרת: אם קיימת — references, ואם לא — embedded בהכרח."
   ],
   "correct": 0,
   "explain": "ניסוח שלו: \"הבחירה שלנו תעשה לפי גודל הזיכרון, ואם אנחנו רוצים שהכל יהיה קריא למשתמש אז נבחר embedded, אחרת נבחר References. ויש גם שילובים בין השניים.\" ג׳ ו-ד׳ הם קריטריונים מומצאים. ב׳ — גם ב-MongoDB יש הפניות וגם ב-SQL יש שכפול מכוון.",
   "book": {
    "page": 56,
    "where": "שאלה A-49 בעשרת הנושאים"
   }
  },
  "A-50": {
   "id": "A-50",
   "fam": "T10",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 3,
   "q": "מתכנת שמר ב-MongoDB את פריטי ההזמנה כ-collection נפרד, \"כי כך עושים ב-SQL\". הפריטים נשלפים כמעט תמיד יחד עם ההזמנה, ומספרם קטן וחסום.\n\nמה הבעיה?",
   "options": [
    "אין בעיה: מסמך נפרד לכל פריט הוא הגישה הנכונה ב-MongoDB בכל מקרה, כי היא מונעת מסמך גדול.",
    "הוא שילם lookup בכל הצגת הזמנה, בלי לקבל תמורה: המערך חסום והנתונים לא ישתנו עוד.",
    "הבעיה היא שאי אפשר לשמור מחיר היסטורי במסמך נפרד, ולכן המחיר בעת הרכישה יאבד אחרי עדכון.",
    "הבעיה היא שהפריטים יאבדו את הסדר שבו הוזמנו, כי ל-collection נפרד אין סדר פנימי מובטח."
   ],
   "correct": 1,
   "explain": "הנכונה — החלטה נכונה בתרחיש אחר, שהועתקה לתרחיש שבו היא רק עולה ולא מרוויחה. א׳ — ניסוח מוחלט. ג׳ ו-ד׳ שגויים עובדתית: גם מסמך נפרד שומר מחיר ואפשר למיין אותו.",
   "book": {
    "page": 56,
    "where": "שאלה A-50 בעשרת הנושאים"
   }
  },
  "A-51": {
   "id": "A-51",
   "fam": "T10",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מדוע המחיר בעת הרכישה מוטמע בהזמנה, בעוד שהמחיר הקטלוגי נשמר בהפניה?",
   "options": [
    "כי המחיר הקטלוגי נשמר כמספר והמחיר ההיסטורי נשמר כטקסט, ולכן הם מתאימים למבנים שונים.",
    "כי המחיר הקטלוגי שמור בטבלה אחרת, ולכן האילוצים אוסרים להטמיע אותו במסמך אחר במערכת.",
    "כי מחיר העסקה לא ישתנה עוד ולכן אין לו מחיר עדכון, והמחיר הקטלוגי משתנה ומשותף להרבה הזמנות.",
    "כי המחיר בעת הרכישה אינו נדרש בדוחות כספיים, ולכן אין חשיבות למקום שבו הוא נשמר במסד."
   ],
   "correct": 2,
   "explain": "הנכונה — שני השלבים מהתבנית: קצב שינוי + מחיר העדכון. ד׳ — היפוך: המחיר בעת הרכישה הוא בדיוק מה שנדרש לניתוח העסקי ולהחזרים. א׳ ו-ב׳ שגויים עובדתית.",
   "book": {
    "page": 56,
    "where": "שאלה A-51 בעשרת הנושאים"
   }
  },
  "A-52": {
   "id": "A-52",
   "fam": "T10",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהו היתרון ומהו החיסרון של שכפול מידע לתוך המסמך, לפי הפתרון של המרצה?",
   "options": [
    "אין חיסרון: שכפול הוא יתרון נקי, כי הוא חוסך JOIN ו-lookup ואינו משפיע על נפח או על עדכון.",
    "אין יתרון: שכפול הוא תמיד חיסרון, כי הוא מגדיל את הנפח ושובר את כללי הנורמליזציה של המודל.",
    "היתרון הוא עקביות גבוהה יותר, והחיסרון הוא שאי אפשר לבצע lookup בין המסמכים המשוכפלים.",
    "היתרון — כל המידע גלוי לעין ואין צורך ב-JOIN או lookup; החיסרון — המסמכים גדולים והעדכונים מורכבים."
   ],
   "correct": 3,
   "explain": "ניסוח שלו: \"יש יתרון ויש חיסרון בשכפול מידע. המסמכים יהיו גדולים יותר ועדכונים יהיו מורכבים יותר. מצד שני... כל המידע יהיה גלוי לעין ולא נצטרך לחפש או לבצע פקודות join או lookup מורכבות.\" א׳ ו-ב׳ הם תשובות חד-צדדיות, בדיוק מה שהוא אומר לא לעשות. ג׳ הוא היפוך.",
   "book": {
    "page": 57,
    "where": "שאלה A-52 בעשרת הנושאים"
   }
  },
  "A-53": {
   "id": "A-53",
   "fam": "T10",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בהזמנה נשמרה כתובת המסירה. הלקוח עבר דירה שנה אחר כך ועדכן את הכתובת בפרופיל שלו.\n\nמה צריך לקרות עם הכתובת שבהזמנה הישנה?",
   "options": [
    "היא נשארת כפי שהייתה: הכתובת בהזמנה היא נתון עובדתי של אותה מסירה, כמו המחיר בעת הרכישה.",
    "היא צריכה להתעדכן אוטומטית לכתובת החדשה, כדי שהנתונים במערכת יישארו עקביים ביניהם.",
    "היא צריכה להימחק מההזמנה הישנה, כי הכתובת כבר אינה תקפה ושמירתה היא מידע מטעה ללקוח.",
    "היא צריכה להפוך להפניה לפרופיל הלקוח, כדי למנוע כפילות של אותו נתון בשני מקומות במסד."
   ],
   "correct": 0,
   "explain": "הנכונה — אותו דפוס בדיוק של המחיר ההיסטורי: נתון עובדתי של עסקה שהסתיימה. ב׳ ו-ד׳ היו מוחקים את המידע ההיסטורי. ג׳ — מחיקה גורעת מידע עובדתי.",
   "book": {
    "page": 57,
    "where": "שאלה A-53 בעשרת הנושאים"
   }
  },
  "A-54": {
   "id": "A-54",
   "fam": "T10",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מה קובע בפועל אם להטמיע נתון או לשמור אותו בהפניה?",
   "options": [
    "סוג המסד שבחרנו: ב-MongoDB מטמיעים כברירת מחדל, וב-SQL מפנים, כי כך בנויות שתי השפות.",
    "דפוס הגישה בפועל: מה נשלף יחד, האם המערך חסום, וכל כמה זמן הנתון משתנה.",
    "מספר הטבלאות או ה-collections הקיימים במערכת, כי מודל קטן מתאים להטמעה ומודל גדול להפניה.",
    "שפת התכנות של האפליקציה ושיטת העבודה של הצוות, כי הם קובעים אילו שליפות נוח לכתוב."
   ],
   "correct": 1,
   "explain": "הנכונה — אלה שלושת השלבים הראשונים בתבנית התשובה של המרצה. א׳ — גם ב-MongoDB מפנים (והוא עצמו המליץ על כך להרשמות), וגם ב-SQL משכפלים (המחיר ההיסטורי). ג׳ ו-ד׳ אינם שיקולי מודל.",
   "book": {
    "page": 57,
    "where": "שאלה A-54 בעשרת הנושאים"
   }
  },
  "A-55": {
   "id": "A-55",
   "fam": "T4",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "כיצד מונעים שסטודנט יירשם פעמיים לאותו מחזור קורס?",
   "options": [
    "בדיקה בקוד האפליקציה לפני ההכנסה, בשתי הארכיטקטורות — זו הדרך היחידה שעובדת בשני המסדים.",
    "אילוץ UNIQUE על studentId בלבד ב-SQL, ואינדקס ייחודי על offeringId בלבד ב-MongoDB.",
    "ב-SQL אילוץ UNIQUE על צירוף studentId ו-offeringId, וב-MongoDB unique index על אותו צירוף.",
    "מפתח ראשי משותף לשתי הטבלאות, שמונע כל כפילות של רשומות בין טבלת הסטודנטים לטבלת המחזורים."
   ],
   "correct": 2,
   "explain": "הנכונה — ההגבלה היא על הצירוף ולא על כל שדה בנפרד, ולכן סטודנט יכול להירשם להרבה מחזורים ומחזור יכול לקבל הרבה סטודנטים. ב׳ — חוסם התנהגות חוקית. א׳ — בדיקה בקוד נכשלת בשתי בקשות בו-זמנית. ד׳ — אין דבר כזה מפתח ראשי משותף לשתי טבלאות.",
   "book": {
    "page": 58,
    "where": "שאלה A-55 בעשרת הנושאים"
   }
  },
  "A-56": {
   "id": "A-56",
   "fam": "T4",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "שני סטודנטים לוחצים \"הירשם\" באותו רגע על המקום האחרון. הקוד קורא את הקיבולת, מוודא שיש מקום, ואז כותב.\n\nמה הכשל?",
   "options": [
    "הכשל הוא בביצועים: שתי הבקשות ממתינות זו לזו ולכן ההרשמה נראית איטית מאוד לשני הסטודנטים.",
    "אין כשל: המסד מסדר את הבקשות לפי סדר ההגעה, ולכן הבקשה השנייה תראה קיבולת אפס ותידחה.",
    "הכשל הוא שהקיבולת נשמרת כנתון משוכפל בשני מקומות, ולכן שתי הבקשות קוראות ערכים שונים.",
    "בין הבדיקה לכתיבה יש פער זמן: שתיהן רואות מקום פנוי, שתיהן מחליטות שמותר, ושתיהן כותבות."
   ],
   "correct": 3,
   "explain": "הנכונה — \"הבדיקה הייתה נכונה כשהיא בוצעה, אבל היא התיישנה לפני הכתיבה\". ב׳ — המסד אינו מסדר קריאה ואחריה כתיבה כפעולה אחת מעצמו. א׳ מחליף נכונות בביצועים. ג׳ מתאר בעיה אחרת לגמרי.",
   "book": {
    "page": 58,
    "where": "שאלה A-56 בעשרת הנושאים"
   }
  },
  "A-57": {
   "id": "A-57",
   "fam": "T4",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מה אמר המרצה על שני משתמשים שמתחרים על המקום האחרון בקורס?",
   "options": [
    "ב-SQL משתמשים ב-locking — המערכת נועלת את המקום בזיכרון; ב-NoSQL כל מסמך מקבל ID ייחודי שפותר התנגשויות.",
    "ב-SQL מגדירים אינדקס ייחודי על שדה הקיבולת, וב-NoSQL מגדירים מפתח זר בין ההרשמה למחזור.",
    "בשתי הארכיטקטורות הפתרון הוא לבדוק את הקיבולת פעמיים — לפני הכתיבה ואחריה — ולבטל אם חרגנו.",
    "ב-SQL אין פתרון מובנה לבעיה הזאת, ולכן חייבים לממש תור בקשות בקוד האפליקציה או בשרת ביניים."
   ],
   "correct": 0,
   "explain": "ניסוח שלו, מילה במילה. ד׳ — שגוי: locking הוא בדיוק המנגנון המובנה. ב׳ — אינדקס ייחודי על קיבולת אינו מונע התנגשות, ולמונגו אין מפתחות זרים אכופים. ג׳ — \"לבדוק פעמיים\" הוא עוד גרסה של אותו פער זמן.",
   "book": {
    "page": 58,
    "where": "שאלה A-57 בעשרת הנושאים"
   }
  },
  "A-58": {
   "id": "A-58",
   "fam": "T4",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מהו המחיר של שימוש בנעילה (locking)?",
   "options": [
    "אין מחיר: נעילה היא מנגנון חינמי שמנוהל בזיכרון המסד ולכן אינה משפיעה על בקשות אחרות.",
    "נעילה מעכבת משתמשים אחרים ופוגעת בביצועים בעומס.",
    "נעילה מונעת גם הרשמה כפולה, ולכן השימוש בה מייתר לחלוטין את הצורך באינדקס ייחודי בטבלה.",
    "נעילה מוחקת את הרשומה אם הטרנזקציה נכשלת."
   ],
   "correct": 1,
   "explain": "הנכונה — \"נעילה אינה חינם\". ג׳ — טענה שנשמעת סבירה אבל שגויה: נעילה מגנה על פעולה בזמן, אינדקס ייחודי מגן על הנתון לנצח; הם אינם מחליפים זה את זה. ד׳ שגוי עובדתית. א׳ — ניסוח מוחלט.",
   "book": {
    "page": 58,
    "where": "שאלה A-58 בעשרת הנושאים"
   }
  },
  "A-59": {
   "id": "A-59",
   "fam": "T4",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "מתכנת אומר: \"ב-MongoDB כל מסמך מקבל _id ייחודי, ולכן אין בעיה של הרשמה כפולה.\"\n\nמה התשובה?",
   "options": [
    "הוא צודק: שני מסמכים לא יכולים לקבל אותו _id, ולכן שתי הרשמות זהות אינן יכולות להיווצר.",
    "הוא טועה, כי _id אינו ייחודי ב-MongoDB אלא אם מגדירים עליו במפורש אינדקס ייחודי בעת היצירה.",
    "_id ייחודי מונע התנגשות בין מסמכים, אבל להרשמה כפולה צריך בנוסף אינדקס ייחודי על הצירוף.",
    "הוא צודק רק אם יש פחות ממיליון מסמכים ב-collection, כי מעבר לכך ייתכנו התנגשויות במזהים."
   ],
   "correct": 2,
   "explain": "הנכונה — שתי הרשמות של אותו סטודנט לאותו מחזור הן שני מסמכים שונים עם שני _id שונים, ולכן הן חוקיות מבחינת המסד. א׳ הוא בדיוק הבלבול שהשאלה בודקת. ב׳ ו-ד׳ שגויים עובדתית.",
   "book": {
    "page": 59,
    "where": "שאלה A-59 בעשרת הנושאים"
   }
  },
  "A-60": {
   "id": "A-60",
   "fam": "T4",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהי פעולה אטומית?",
   "options": [
    "פעולה שמתבצעת מהר יותר מפעולה רגילה, כי המסד מריץ אותה בזיכרון בלי לכתוב ללוג בדיסק.",
    "פעולה שהמסד שומר בלוג, כך שאפשר לבטל אותה אחר כך אם מתגלה שהיא גרמה לאי-עקביות בנתונים.",
    "פעולה שמתבצעת על מסמך אחד בלבד, ולכן היא אינה יכולה להיכשל בשום מצב ואין צורך לבדוק אותה.",
    "פעולה שמתבצעת במלואה או בכלל לא, ולכן אין בה חלון שבו מישהו אחר יכול להתערב."
   ],
   "correct": 3,
   "explain": "הנכונה. ג׳ — נכון שעדכון מסמך בודד הוא אטומי, אבל ההגדרה אינה \"אינו יכול להיכשל\"; הוא יכול להיכשל — ואז לא מתבצע כלל. א׳ ו-ב׳ מתארים דברים אחרים (ביצועים, rollback).",
   "book": {
    "page": 59,
    "where": "שאלה A-60 בעשרת הנושאים"
   }
  },
  "A-61": {
   "id": "A-61",
   "fam": "T4",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "האם שימוש ב-NoSQL פירושו בהכרח ויתור על עקביות?",
   "options": [
    "לא בהכרח: אינדקס ייחודי, מזהה ייחודי לכל מסמך, פעולות אטומיות וטרנזקציות שומרים על עקביות גם ב-MongoDB.",
    "כן: MongoDB אינו תומך בטרנזקציות על פני כמה מסמכים, ולכן אי-עקביות היא בלתי נמנעת בכל מערכת.",
    "כן, אלא אם מוסיפים מפתחות זרים ל-collections — וזו האפשרות היחידה לשמור על עקביות במונגו.",
    "לא, ואין שום הבדל בין המסדים: בשניהם המסד עצמו אוכף עקביות באותה מידה ובאותם מנגנונים."
   ],
   "correct": 0,
   "explain": "ניסוח שלו: \"שכפול נתונים ב-NoSQL אינו בהכרח טעות, אלא הופך לבעיה רק כאשר גורם לחוסר עקביות בעדכונים חלקיים\". ב׳ ו-ג׳ שגויים עובדתית (MongoDB תומך בטרנזקציות; אין לו מפתחות זרים). ד׳ — תשובה חד-צדדית לכיוון השני: ההבדל כן קיים, והוא במי אוכף.",
   "book": {
    "page": 59,
    "where": "שאלה A-61 בעשרת הנושאים"
   }
  },
  "A-62": {
   "id": "A-62",
   "fam": "T4",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהו ההבדל האמיתי בין SQL ל-MongoDB בשמירה על עקביות?",
   "options": [
    "ההבדל הוא שב-MongoDB אין שום דרך למנוע כפילות של אותו צירוף ערכים בשתי רשומות שונות.",
    "ב-SQL העקביות נאכפת על ידי המסד במפתחות זרים ובאילוצים; ב-MongoDB האחריות עוברת במידה רבה למתכנת.",
    "ההבדל הוא רק בשפה שבה כותבים את האילוצים, ולכן הוא עניין תחבירי ולא הבדל ארכיטקטוני אמיתי.",
    "ההבדל הוא שב-SQL אין פעולות אטומיות על רשומה בודדת, ולכן שם חייבים להשתמש בטרנזקציה לכל עדכון."
   ],
   "correct": 1,
   "explain": "הנכונה — \"ההבדל הוא בכמה עבודה צריך להשקיע, לא בשאלה אם אפשר\". א׳ שגוי (יש unique index). ד׳ שגוי עובדתית. ג׳ מצמצם הבדל ארכיטקטוני לתחביר.",
   "book": {
    "page": 59,
    "where": "שאלה A-62 בעשרת הנושאים"
   }
  },
  "A-63": {
   "id": "A-63",
   "fam": "T4",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בהרשמה לקורס צריך גם להקטין את הקיבולת במסמך המחזור וגם להוסיף מסמך הרשמה. אם רק אחת מהפעולות מצליחה — הנתונים שבורים.\n\nמה נדרש?",
   "options": [
    "אינדקס ייחודי על צירוף הסטודנט והמחזור, שימנע מצב שבו רק אחת משתי הפעולות תתבצע בהצלחה.",
    "פעולה אטומית על מסמך אחד, שמספיקה כאן.",
    "טרנזקציה: או ששתי הפעולות מצליחות, או ששתיהן מתבטלות.",
    "נעילה של כל ה-collection לאורך כל תהליך ההרשמה, כדי שאף בקשה אחרת לא תיכנס בין שתי הפעולות."
   ],
   "correct": 2,
   "explain": "הנכונה — טרנזקציה עושה לכמה פעולות את מה שפעולה אטומית עושה לאחת. א׳ — אינדקס ייחודי הוא התשובה הנכונה לשאלת הכפילות, אבל אינו עונה על השאלה הזאת. ב׳ — מדובר בשני מסמכים שונים. ד׳ — נעילה גורפת פוגעת בביצועים ואינה מבטיחה ביטול של פעולה שנכשלה.",
   "book": {
    "page": 60,
    "where": "שאלה A-63 בעשרת הנושאים"
   }
  },
  "A-64": {
   "id": "A-64",
   "fam": "T3",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהן ההשלכות של הוספת עמודות חדשות למודל רלציוני, כדי לתמוך בקטגוריית מוצרים חדשה?",
   "options": [
    "הוספת עמודה אינה משפיעה על הרשומות הקיימות ולכן אין לה שום השלכה על המודל או על השאילתות.",
    "הוספת עמודה מחייבת ליצור טבלה חדשה ולהעביר אליה את כל הנתונים, כי אין ב-SQL הוספת עמודה.",
    "הוספת עמודה אפשרית רק בטבלה ריקה, ולכן בקטלוג פעיל חייבים להגדיר מראש את כל העמודות.",
    "העמודה חלה על כל הרשומות, גם על אלה שאינן רלוונטיות — נוצרת טבלה רחבה עם הרבה NULL."
   ],
   "correct": 3,
   "explain": "הנכונה — \"אם מוצר כולל 150 מאפיינים אפשריים, אך רק 8 מהם רלוונטיים לכל מוצר\", והשינוי גם דורש בדיקה ועדכון של הטבלה ולעיתים התאמת שאילתות ודוחות. ב׳ ו-ג׳ שגויים עובדתית. א׳ — ניסוח מוחלט שמתעלם מכל המחיר.",
   "book": {
    "page": 60,
    "where": "שאלה A-64 בעשרת הנושאים"
   }
  },
  "A-65": {
   "id": "A-65",
   "fam": "T3",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "בחנות מקוונת כל מוצר יכול לכלול 150 מאפיינים אפשריים, אבל רק כ-8 מהם רלוונטיים לכל מוצר בפועל.\n\nאיזה ייצוג מתאים ב-MongoDB?",
   "options": [
    "כל מסמך מוצר נושא רק את השדות הרלוונטיים לו, או שדה attributes אחד שבתוכו זוגות של מאפיין וערך.",
    "150 שדות בכל מסמך, כשהשדות שאינם רלוונטיים מקבלים null — כדי שהמבנה יישאר אחיד בין המסמכים.",
    "collection נפרד לכל קטגוריית מוצרים, עם סכמה מוגדרת וקבועה לכל אחד מהם בנפרד ובלי שדות חופשיים.",
    "מערך של 150 איברים בכל מסמך, לפי סדר קבוע של המאפיינים, כך שהמיקום במערך מזהה את המאפיין."
   ],
   "correct": 0,
   "explain": "הנכונה — שתי הדרכים שהגמישות מאפשרת. ב׳ — מעביר ל-MongoDB בדיוק את הבעיה של SQL (עמודות ריקות). ד׳ — מבנה שברירי שאי אפשר לשלוף לפיו. ג׳ — מפצל את הקטלוג ומונע שליפה אחידה.",
   "book": {
    "page": 61,
    "where": "שאלה A-65 בעשרת הנושאים"
   }
  },
  "A-66": {
   "id": "A-66",
   "fam": "T3",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהו היתרון של מבנה מסמכים גמיש, בניסוח של המרצה?",
   "options": [
    "הגמישות מאפשרת להגדיר מפתחות זרים בין collections בלי סכמה, ולכן היא שומרת על קשרים בין המסמכים.",
    "אפשר להוסיף שדות חדשים במהירות בזמן אמת, בלי לעדכן את מבנה הטבלה.",
    "הגמישות מבטיחה שכל המסמכים יישארו באותו מבנה.",
    "הגמישות חוסכת אינדקסים, כי שדה שאינו קיים במסמך אינו נדרש לאינדקס ולכן האינדקסים קטנים יותר."
   ],
   "correct": 1,
   "explain": "ניסוח שלו, מילה במילה. ג׳ — היפוך: גמישות פירושה בדיוק שאין אחידות מובטחת. א׳ ו-ד׳ שגויים עובדתית.",
   "book": {
    "page": 61,
    "where": "שאלה A-66 בעשרת הנושאים"
   }
  },
  "A-67": {
   "id": "A-67",
   "fam": "T3",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "בחנות עברו לקטלוג גמיש ב-MongoDB. מנהל מבקש למחוק מוצר שהוסר מהמדף.\n\nמה הסיכון?",
   "options": [
    "אין סיכון: מחיקת מסמך ב-MongoDB היא פעולה אטומית, ולכן היא בטוחה ואינה יכולה לשבור נתונים.",
    "הסיכון הוא ביצועים: מחיקה מחייבת בנייה מחדש של כל האינדקסים ב-collection ולכן היא יקרה.",
    "הגמישות מאפשרת מחיקה קלה אבל אינה מבטלת בדיקת תלויות — אם למוצר יש הזמנות פעילות, אסור למחוק.",
    "הסיכון הוא שהמסמך יימחק רק חלקית, ויישארו בו שדות ריקים שימשיכו להופיע בדוחות ובשליפות."
   ],
   "correct": 2,
   "explain": "ניסוח שלו: \"אם מוצר נקנה או הוזמן, לא ניתן למחוק אותו ללא validation\". א׳ — אטומיות היא טענה נכונה שאינה עונה על השאלה: הפעולה תצליח בדיוק, וזאת הבעיה. ב׳ ו-ד׳ שגויים עובדתית.",
   "book": {
    "page": 61,
    "where": "שאלה A-67 בעשרת הנושאים"
   }
  },
  "A-68": {
   "id": "A-68",
   "fam": "T3",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מהו המחיר של סכמה גמישה?",
   "options": [
    "הגמישות מונעת כתיבת דוחות כלשהם ב-MongoDB, ולכן כל דוח מחייב להעביר את הנתונים ל-SQL קודם.",
    "הגמישות מאטה כל שליפה בערך פי שניים לעומת סכמה קבועה, כי המסד בודק את מבנה כל מסמך בנפרד.",
    "הגמישות מחייבת להגדיר אינדקס ייחודי על כל שדה חדש שמתווסף, אחרת השדה לא יהיה זמין לשליפה.",
    "בלי מבנה אכוף, אותו מאפיין עלול להיכנס בשמות או בסוגים שונים, ושדה חיוני עלול להיעדר בשקט."
   ],
   "correct": 3,
   "explain": "הנכונה — \"הגמישות מעבירה את האחריות על תקינות הנתונים מהמסד לאפליקציה, ולכן היא דורשת validation מפורש\". א׳, ב׳ ו-ג׳ שגויים עובדתית.",
   "book": {
    "page": 61,
    "where": "שאלה A-68 בעשרת הנושאים"
   }
  },
  "A-69": {
   "id": "A-69",
   "fam": "T3",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "חנות מקוונת שוקלת לעבור כולה ל-MongoDB בגלל הקטגוריה החדשה עם המאפיינים המשתנים.\n\nאיזו תשובה נכונה?",
   "options": [
    "לא בהכרח: המאפיינים משתנים, אבל המחירים, ההזמנות והתשלומים דורשים עקביות ודוחות — ולכן עדיף לשלב.",
    "כן: ברגע שיש במערכת מבנה משתנה, MongoDB עדיף לכל רכיב בה, כולל ההזמנות והתשלומים.",
    "לא, וגם אין שום דרך לייצג מאפיינים משתנים ב-MongoDB בלי להגדיר קודם סכמה מלאה לכל קטגוריה.",
    "כן, בתנאי היחיד שמוסיפים validation לכל collection — ואז MongoDB שקול ל-SQL בכל קריטריון."
   ],
   "correct": 0,
   "explain": "\"האם בהכרח\" — התשובה \"לא בהכרח\", ולשני הכיוונים: שני שיקולים (עקביות ואימות; דוחות ושאילתות), ואפשר גם לפתור בתוך SQL בטבלת מאפיינים. ב׳ — ניסוח מוחלט. ג׳ — שגוי עובדתית. ד׳ — validation אינו מבטל את יתרון הדוחות של SQL.",
   "book": {
    "page": 62,
    "where": "שאלה A-69 בעשרת הנושאים"
   }
  },
  "A-70": {
   "id": "A-70",
   "fam": "T3",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "כיצד אפשר לייצג מאפיינים משתנים בתוך SQL, בלי לעבור ל-MongoDB?",
   "options": [
    "אין דרך: SQL מחייב עמודה לכל מאפיין.",
    "טבלת מאפיינים נפרדת, שבה כל שורה היא מוצר, מאפיין וערך.",
    "עמודה אחת מסוג טקסט שבה נשמרים כל המאפיינים כמחרוזת מופרדת בפסיקים, ושמפרקים אותה בקוד.",
    "טבלה חדשה לכל קטגוריה, עם מפתח ראשי משותף לכולן, כך שכל קטגוריה מקבלת את העמודות שלה."
   ],
   "correct": 1,
   "explain": "הנכונה — \"טבלת מאפיינים נפרדת, שבה כל שורה היא מוצר, מאפיין וערך\". א׳ — ניסוח מוחלט ושגוי. ג׳ — מחרוזת בפסיקים שוברת נורמליזציה ואינה ניתנת לשליפה. ד׳ — טבלה לכל קטגוריה מתפוצצת בכל קטגוריה חדשה, וזאת בדיוק הבעיה שרצינו לפתור.",
   "book": {
    "page": 62,
    "where": "שאלה A-70 בעשרת הנושאים"
   }
  },
  "A-71": {
   "id": "A-71",
   "fam": "T3",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מהו המבנה המסודר יותר לייצוג מאפיינים משתנים ב-MongoDB?",
   "options": [
    "לפזר כל מאפיין חדש כשדה נפרד ברמת המסמך, בלי לקבץ אותם, כדי שכל שדה יהיה זמין לאינדקס ישירות.",
    "לשמור את כל השדות, הקבועים והמשתנים יחד, בתוך מערך אחד של זוגות, כולל המזהה והמחיר של המוצר.",
    "לשמור את השדות הקבועים ברמת המסמך, ואת המאפיינים המשתנים כאובייקט פנימי אחד.",
    "לשמור את המאפיינים המשתנים ב-collection נפרד, ולבצע lookup אליו בכל שליפה של מוצר מהקטלוג."
   ],
   "correct": 2,
   "explain": "הנכונה — \"כך ברור מה קבוע ומה משתנה, וקל להוסיף קטגוריה בלי לפזר שדות חדשים בכל רמות המסמך\". א׳ — אפשרי, אבל פחות מסודר. ב׳ — מאבד את השדות הקבועים. ד׳ — משלם lookup על נתון שנשלף תמיד יחד עם המוצר.",
   "book": {
    "page": 62,
    "where": "שאלה A-71 בעשרת הנושאים"
   }
  },
  "A-72": {
   "id": "A-72",
   "fam": "T3",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בחנות יש דוח קבוע: הכנסות לפי קטגוריה ולפי חודש. הקטלוג גמיש, אבל הדוח חייב לרוץ כל חודש באותו מבנה.\n\nמה השיקול שמכריע?",
   "options": [
    "הגמישות מכריעה: אם הקטלוג גמיש, גם הדוח צריך לרוץ על אותו מסד כדי לא לפצל את המערכת לשניים.",
    "אין כאן שיקול מכריע: דוח חודשי אינו נחשב דפוס גישה, כי הוא רץ פעם אחת בחודש ולא בזמן אמת.",
    "הדוח מכריע לטובת MongoDB, כי אגרגציה על collection אחד פשוטה יותר מ-JOIN בין שלוש טבלאות.",
    "הדוח הקבוע מכריע לטובת הסדר של SQL: לשאילתות מורכבות SQL יעיל יותר, ושם כדאי שהכספים יישבו."
   ],
   "correct": 3,
   "explain": "הנכונה — \"אם יש דוחות קבועים — הסדר של SQL שווה יותר\". ג׳ — היפוך של עמדת המרצה על שליפות מורכבות. א׳ — מניח שהמערכת חייבת להיות מסד אחד. ב׳ — דוח קבוע הוא בהחלט דפוס גישה.",
   "book": {
    "page": 62,
    "where": "שאלה A-72 בעשרת הנושאים"
   }
  },
  "A-73": {
   "id": "A-73",
   "fam": "T8",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "השאילתה הנפוצה במערכת מאתרת את כל ההרשמות של סטודנט מסוים בסמסטר נתון, ומציגה שם קורס וציון.\n\nאילו שדות מתאימים לאינדקס?",
   "options": [
    "studentId ו-offeringId בהרשמות, ו-semester ו-courseId במחזורים — השדות שמסננים ומצטרפים לפיהם.",
    "grade ו-enrolledAt בהרשמות, כי אלה השדות שמוצגים למשתמש בסוף ולכן הם צריכים להיות זמינים מהר.",
    "כל השדות בשתי הטבלאות, כדי לכסות מראש כל שאילתה עתידית ולא להידרש לשינוי אינדקסים בהמשך.",
    "רק המפתחות הראשיים של שתי הטבלאות, שאינם מאונדקסים כברירת מחדל ולכן דורשים הגדרה מפורשת."
   ],
   "correct": 0,
   "explain": "הנכונה — מתחילים מהשאילתה הנפוצה, והיא שקובעת. ב׳ — מאנדקס שדות תצוגה שלא מסננים לפיהם. ג׳ — \"ליתר ביטחון\" הוא בדיוק מה שאסור. ד׳ — שגוי: מפתח ראשי מאונדקס אוטומטית.",
   "book": {
    "page": 63,
    "where": "שאלה A-73 בעשרת הנושאים"
   }
  },
  "A-74": {
   "id": "A-74",
   "fam": "T8",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהו אינדקס מורכב (Compound Index)?",
   "options": [
    "שני אינדקסים נפרדים על שני שדות, שהמסד מאחד ביניהם בזמן ריצה כדי לשרת שאילתה אחת.",
    "אינדקס על כמה שדות יחד, שמאפשר להגיע ישר לקבוצת הרשומות הנכונה במהלך אחד.",
    "אינדקס שנבנה רק על שדות מחושבים, ולכן הוא מתעדכן בכל שינוי של אחד השדות שמהם הוא נגזר.",
    "אינדקס ייחודי שחל על צירוף של כמה שדות, ולכן תפקידו היחיד הוא למנוע כפילות ולא לזרז שליפה."
   ],
   "correct": 1,
   "explain": "הנכונה. ד׳ — מבלבל בין אינדקס מורכב (ביצועים) לאינדקס ייחודי (מניעת כפילות); צירוף שדות יכול להיות אחד מהם, שניהם או אף אחד. א׳ ו-ג׳ מתארים דברים אחרים.",
   "book": {
    "page": 63,
    "where": "שאלה A-74 בעשרת הנושאים"
   }
  },
  "A-75": {
   "id": "A-75",
   "fam": "T8",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "הוגדר אינדקס מורכב על (offeringId, studentId). השאילתה הנפוצה מסננת לפי studentId ואחר כך לפי סמסטר.\n\nמה הבעיה?",
   "options": [
    "אין בעיה: אינדקס מורכב ממוין לפי כל השדות שבו, ולכן הוא משרת כל סדר של תנאי סינון בשאילתה.",
    "הבעיה היא שהאינדקס ייחודי ולכן הוא ידחה הרשמות חוקיות של אותו סטודנט למחזורים שונים.",
    "אינדקס מורכב ממוין לפי השדה הראשון, ולכן אינו משרת שאילתה שמסננת רק לפי השני — צריך להפוך את הסדר.",
    "הבעיה היא בגודל: שני שדות באינדקס אחד תופסים יותר מקום באחסון משני אינדקסים נפרדים על אותם שדות."
   ],
   "correct": 2,
   "explain": "הנכונה — אינדקס מורכב ממוין לפי השדה הראשון ואחר כך לפי השני, ולכן (offeringId, studentId) לא יעזור לשאילתה שמחפשת סטודנט מסוים. א׳ — שגוי, וזאת בדיוק הטעות. ב׳ — אינדקס מורכב אינו ייחודי אלא אם הוגדר כך. ד׳ — שגוי עובדתית.",
   "book": {
    "page": 63,
    "where": "שאלה A-75 בעשרת הנושאים"
   }
  },
  "A-76": {
   "id": "A-76",
   "fam": "T8",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מדוע אינדקס על כל שדה אינו החלטה טובה?",
   "options": [
    "כי המסד מגביל את מספר האינדקסים לשלושה לכל טבלה, ולכן חייבים לבחור את החשובים ביותר.",
    "כי אינדקס נוסף מאט את פעולת הקריאה שהוא עצמו אמור לזרז, ולכן התועלת שלו מתבטלת.",
    "כי אינדקסים נוספים שוברים את העקביות בין הטבלאות, ולכן הם עלולים להחזיר שורות חסרות.",
    "כי אינדקס מאט כתיבה — כל הוספה, עדכון ומחיקה מעדכנים גם אותו — והוא תופס מקום באחסון ובזיכרון."
   ],
   "correct": 3,
   "explain": "הנכונה — \"אינדקסים נבנים לפי דפוס הגישה בפועל ולא ליתר ביטחון\". ב׳ הוא היפוך: אינדקס מזרז קריאה ומאט כתיבה. א׳ ו-ג׳ שגויים עובדתית.",
   "book": {
    "page": 64,
    "where": "שאלה A-76 בעשרת הנושאים"
   }
  },
  "A-77": {
   "id": "A-77",
   "fam": "T8",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "האם שימוש ב-NoSQL מבטיח ביצועים טובים יותר?",
   "options": [
    "לא: הביצועים נקבעים לפי התאמת המודל לדפוס הגישה ולפי האינדקסים, ולא לפי סוג המסד.",
    "כן: MongoDB מהיר יותר בכל סוג שאילתה, כי אין בו JOIN ולכן אין בו את הפעולה היקרה ביותר.",
    "כן, כל עוד המידע מוטמע בתוך המסמך — הטמעה מבטיחה שליפה בקריאה אחת ולכן גם ביצועים טובים.",
    "לא, כי MongoDB אינו תומך באינדקסים ולכן כל שליפה בו היא סריקה מלאה של כל ה-collection."
   ],
   "correct": 0,
   "explain": "הנכונה — ובמשפט שלו: \"מבחינת הכתיבה NoSQL קל יותר, אבל מבחינת השליפה SQL עדיף\". ב׳ ו-ג׳ הם ניסוחים מוחלטים. ד׳ שגוי עובדתית: ל-MongoDB יש אינדקסים, ובלעדיהם הוא אכן סורק — וזה בדיוק העניין.",
   "book": {
    "page": 64,
    "where": "שאלה A-77 בעשרת הנושאים"
   }
  },
  "A-78": {
   "id": "A-78",
   "fam": "T8",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "דוח מבקש את כל הסטודנטים עם ציון מעל 90, עם ממוצעים לפי מחלקה.\n\nמה עמדת המרצה על הביצועים?",
   "options": [
    "MongoDB יעיל יותר, כי סינון על מסמך שבו המידע מוטמע אינו דורש lookup ולכן הוא מהיר יותר.",
    "SQL יעיל יותר לשאילתות מורכבות כאלה, גם כשהוא דורש JOIN בין כמה טבלאות.",
    "השניים שקולים, כי בשניהם מוגדר אינדקס על שדה הציון ולכן הסינון עצמו עולה אותו דבר.",
    "MongoDB יעיל יותר, כי הוא קל יותר בכתיבה — וקלות הכתיבה גוררת גם שליפה מהירה יותר."
   ],
   "correct": 1,
   "explain": "ניסוח שלו: \"לשאילתות מורכבות כגון סינון סטודנטים עם ציון מעל 90, SQL יעיל יותר ומצריך JOIN עם מספר טבלאות\". א׳ — טענה נכונה על שליפה פשוטה, לא על אגרגציה מורכבת. ד׳ — מחליף בין קלות כתיבה ליעילות שליפה, וזאת בדיוק ההבחנה שלו.",
   "book": {
    "page": 64,
    "where": "שאלה A-78 בעשרת הנושאים"
   }
  },
  "A-79": {
   "id": "A-79",
   "fam": "T8",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "ב-MongoDB עם מיליוני מסמכי הרשמה, שאילתה לפי studentId לוקחת שניות ארוכות. המידע מוטמע ואין אינדקס על השדה.\n\nמה ההסבר?",
   "options": [
    "MongoDB אינו יכול לאנדקס שדה שאינו _id, ולכן איטיות בשליפה לפי שדה אחר היא בלתי נמנעת.",
    "הבעיה היא בהטמעה: היה צריך לשמור את ההרשמות בהפניה, ואז השליפה הייתה מהירה גם בלי אינדקס.",
    "בלי אינדקס מתאים גם MongoDB סורק מיליוני מסמכים — ההטמעה אינה תחליף לאינדקס.",
    "הבעיה היא שההטמעה מחייבת lookup בכל שליפה, וה-lookup הוא הגורם האמיתי לאיטיות כאן."
   ],
   "correct": 2,
   "explain": "הנכונה — \"בלי אינדקס מתאים, גם MongoDB סורק מיליוני מסמכים ויהיה איטי\". א׳ שגוי עובדתית. ד׳ — היפוך: הטמעה דווקא מייתרת lookup. ב׳ — מחליף את הבעיה האמיתית (אינדקס) בשינוי מודל שאינו נדרש.",
   "book": {
    "page": 64,
    "where": "שאלה A-79 בעשרת הנושאים"
   }
  },
  "A-80": {
   "id": "A-80",
   "fam": "T8",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "איזה שדה כדאי לשים ראשון באינדקס מורכב?",
   "options": [
    "השדה שהערכים בו קטנים ביותר מבחינת גודל, כדי שהאינדקס עצמו יתפוס פחות מקום באחסון.",
    "השדה שמופיע ראשון בהגדרת הטבלה.",
    "השדה שמוצג למשתמש בדוח, כי הוא השדה שהשאילתה בסופו של דבר צריכה להחזיר למסך או לקובץ.",
    "השדה שעליו יש שוויון מדויק ושמצמצם הכי הרבה רשומות."
   ],
   "correct": 3,
   "explain": "הנכונה — כאן studentId, ואחריו השאר. אינדקס מורכב ממוין לפי השדה הראשון, ולכן הוא יכול לשרת גם שאילתה שמסננת רק לפיו. א׳, ב׳ ו-ג׳ הם קריטריונים שאינם קשורים לאופן שבו האינדקס נסרק.",
   "book": {
    "page": 65,
    "where": "שאלה A-80 בעשרת הנושאים"
   }
  },
  "A-81": {
   "id": "A-81",
   "fam": "T8",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "אילו שדות דווקא לא כדאי לאנדקס בטבלת ההרשמות, בהינתן השאילתה הנפוצה?",
   "options": [
    "grade ו-enrolledAt — השאילתה הנפוצה אינה מסננת לפיהם.",
    "studentId — הוא מפתח זר ולכן הוא מאונדקס אוטומטית בכל מסד נתונים, והגדרה נוספת תיצור כפילות.",
    "semester — שדה טקסט אינו ניתן לאינדוקס יעיל, ולכן אינדקס עליו יצרוך מקום בלי לזרז את השליפה.",
    "offeringId — שדה הצטרפות אינו משפר שליפה."
   ],
   "correct": 0,
   "explain": "הנכונה — אינדקס על שדה שאף שאילתה לא מסננת לפיו הוא עלות בלי תועלת. ב׳ — מפתח זר אינו מאונדקס אוטומטית בכל מסד (רק המפתח הראשי). ג׳ — שדה טקסט כן ניתן לאינדוקס. ד׳ — שדה הצטרפות הוא דווקא מועמד מרכזי לאינדקס.",
   "book": {
    "page": 65,
    "where": "שאלה A-81 בעשרת הנושאים"
   }
  },
  "A-82": {
   "id": "A-82",
   "fam": "T9",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "כיצד נראית ארכיטקטורה שמבוססת על SQL בלבד, לארגון עם הזמנות, קטלוג, נתוני זמן-אמת ודוחות?",
   "options": [
    "מסד רלציוני אחד, ובנוסף קובצי לוג חיצוניים לכל רכיב שאינו מתאים לו, שנקראים ישירות מהאפליקציה.",
    "מסד רלציוני אחד לכל הרכיבים, עם טבלה נפרדת ואינדקס על חתימת הזמן לנתוני הזמן-אמת וניקוי נתונים ישנים.",
    "מסד רלציוני נפרד לכל רכיב, כדי שכל אחד יקבל סכמה משלו וכדי שעומס ברכיב אחד לא יפגע באחרים.",
    "מסד רלציוני אחד, שבו הדוחות הניהוליים מחושבים בקוד האפליקציה ולא בשאילתות, כדי להקל על המסד."
   ],
   "correct": 1,
   "explain": "הנכונה — ואם הדוחות מכבידים, מריצים אותם על העתק קריאה או שומרים תוצאות בטבלת סיכום. א׳ — קובצי לוג חיצוניים הם לא מסד. ג׳ — זה כבר אינו \"SQL אחד\" והוא מכניס את בעיית הסנכרון בלי התמורה של NoSQL. ד׳ — מבטל את היתרון המרכזי של SQL.",
   "book": {
    "page": 65,
    "where": "שאלה A-82 בעשרת הנושאים"
   }
  },
  "A-83": {
   "id": "A-83",
   "fam": "T9",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהי החלוקה הנכונה בארכיטקטורה משולבת?",
   "options": [
    "SQL לנתוני הזמן-אמת ול-GPS, ו-NoSQL להזמנות ולתשלומים, כי הם משתנים לעיתים קרובות.",
    "SQL לדוחות בלבד, ו-NoSQL לכל השאר, כדי שהדוחות לא יתחרו על משאבים עם שאר המערכת.",
    "SQL לליבה העסקית — הזמנות, תשלומים, לקוחות ומלאי; NoSQL לקטלוג הגמיש ולנתוני השימוש בזמן אמת.",
    "חלוקה לפי צוותי הפיתוח בארגון, כדי שכל צוות יתחזק מסד אחד ויתמחה בו לעומק עם הזמן."
   ],
   "correct": 2,
   "explain": "הנכונה — החלוקה לפי דפוס הגישה ומבנה הנתון. א׳ הוא היפוך מדויק: תשלומים הם בדיוק מה שדורש עקביות. ב׳ — הדוחות הם בדיוק מה שצריך לרוץ על SQL מול הנתונים העסקיים. ד׳ — שיקול ארגוני, לא ארכיטקטוני.",
   "book": {
    "page": 66,
    "where": "שאלה A-83 בעשרת הנושאים"
   }
  },
  "A-84": {
   "id": "A-84",
   "fam": "T9",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "בארכיטקטורה משולבת ההזמנות ב-SQL ונתוני השימוש ב-NoSQL. שני המסדים עקביים בתוך עצמם.\n\nאיפה נוצרת אי-העקביות?",
   "options": [
    "בתוך ה-SQL, כי הוא מכיל פחות נתונים ולכן האילוצים שלו מכסים פחות מקרים מאשר במערכת שלמה.",
    "בתוך ה-NoSQL, כי אין בו אינדקסים ייחודיים ולכן אותו נתון עלול להיכנס אליו פעמיים בלי התרעה.",
    "אין אי-עקביות: שני מסדים שכל אחד מהם עקבי בתוך עצמו יוצרים יחד מערכת עקבית לחלוטין.",
    "בין שני המסדים: אין ביניהם טרנזקציה אחת, והסנכרון הוא בדיוק המקום שבו נוצרת אי-עקביות."
   ],
   "correct": 3,
   "explain": "הנכונה — זה המחיר המרכזי של ארכיטקטורה משולבת. ב׳ — שגוי: ל-MongoDB יש אינדקסים ייחודיים. ג׳ — בדיוק הטעות שהשאלה בודקת. א׳ — חסר היגיון ארכיטקטוני.",
   "book": {
    "page": 66,
    "where": "שאלה A-84 בעשרת הנושאים"
   }
  },
  "A-85": {
   "id": "A-85",
   "fam": "T9",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מה אומר ציר \"מורכבות התחזוקה\" על ארכיטקטורה משולבת?",
   "options": [
    "שתי מערכות, שתי שפות שאילתה, שני מנגנוני גיבוי, ובנוסף תהליך הסנכרון שגם הוא דורש תחזוקה.",
    "התחזוקה זהה לזו של מסד אחד, כי שני המסדים מנוהלים מאותו ממשק ניהול ובאותם כלי ניטור וגיבוי.",
    "התחזוקה פשוטה יותר מאשר במסד אחד, כי כל מסד קטן יותר ולכן כל תקלה בו מקומית וקלה לאיתור.",
    "התחזוקה מורכבת רק אם שני המסדים יושבים על אותו שרת פיזי ומתחרים על אותם משאבי חומרה."
   ],
   "correct": 0,
   "explain": "הנכונה — ומול זה, SQL בלבד: מערכת אחת, שפה אחת, גיבוי אחד, צוות אחד. ב׳ ו-ג׳ מתעלמים מהסנכרון, שהוא בדיוק הרכיב הנוסף. ד׳ — מצמצם בעיה ארכיטקטונית לשאלת חומרה.",
   "book": {
    "page": 66,
    "where": "שאלה A-85 בעשרת הנושאים"
   }
  },
  "A-86": {
   "id": "A-86",
   "fam": "T9",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 1,
   "q": "ארגון עם נפח בינוני, צוות קטן, דרישת עקביות גבוהה בכספים, והרבה דוחות מורכבים.\n\nמה מתאים?",
   "options": [
    "ארכיטקטורה משולבת, כי דוחות מורכבים צריכים לרוץ על מסד נפרד שלא יתחרה עם המערכת התפעולית.",
    "SQL בלבד: הנפח בינוני, העקביות קריטית, הדוחות מרכזיים, ואי אפשר לתחזק שתי מערכות בצוות קטן.",
    "NoSQL בלבד, כי צוות קטן מתחזק בקלות רבה יותר מסד בלי סכמה ובלי צורך בניהול מבנה הנתונים.",
    "שני מסדים רלציוניים נפרדים, אחד לכספים ואחד לדוחות, כדי להפריד בין עומס תפעולי לעומס אנליטי."
   ],
   "correct": 1,
   "explain": "הנכונה — \"זאת ברירת המחדל\", וכך גם המרצה המליץ למערכת המכללה. א׳ ו-ד׳ מוסיפים מערכת שנייה בלי שרכיב כלשהו הוכיח שהוא שובר את ה-SQL. ג׳ — מוותר על העקביות ועל הדוחות, שהם בדיוק הדרישות כאן.",
   "book": {
    "page": 66,
    "where": "שאלה A-86 בעשרת הנושאים"
   }
  },
  "A-87": {
   "id": "A-87",
   "fam": "T9",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "באותו ארגון נוסף רכיב שמקבל מיליארד מדידות חיישנים בשבוע, במבנה שמשתנה בין סוגי החיישנים.\n\nמה משתנה בהחלטה?",
   "options": [
    "שום דבר: רכיב אחד אינו מצדיק שינוי ארכיטקטורה, ואפשר להכניס גם אותו לטבלה נוספת ב-SQL.",
    "צריך להעביר את כל המערכת ל-NoSQL, כי רכיב אחד ששובר את ה-SQL מוכיח שהמודל כולו אינו מתאים.",
    "יש רכיב שבאמת שובר את ה-SQL — נפח עצום ומבנה משתנה — ולכן הוא מצדיק מעבר לארכיטקטורה משולבת.",
    "צריך להגדיר אינדקס מורכב על מזהה החיישן ועל חתימת הזמן, וזה יפתור גם את הנפח וגם את המבנה."
   ],
   "correct": 2,
   "explain": "הנכונה — \"אני עובר לארכיטקטורה משולבת רק כשרכיב מסוים מוכיח שהוא לא מתאים ל-SQL\". ב׳ — קופץ מרכיב אחד לכל המערכת. ד׳ — אינדקס אינו פותר מבנה משתנה ואף מוסיף עלות כתיבה. א׳ — מתעלם מהנתונים שבשאלה.",
   "book": {
    "page": 67,
    "where": "שאלה A-87 בעשרת הנושאים"
   }
  },
  "A-88": {
   "id": "A-88",
   "fam": "T9",
   "src": "bank",
   "kind": "concept",
   "difficulty": 1,
   "q": "מהי ברירת המחדל הנכונה בבחירת ארכיטקטורה?",
   "options": [
    "להתחיל משולב, ולאחד למסד אחד רק אם התחזוקה של שתי המערכות מתגלה בפועל כיקרה מדי לארגון.",
    "להתחיל מ-NoSQL, כי הוא גמיש יותר בשלבים המוקדמים שבהם מבנה הנתונים עוד אינו מגובש סופית.",
    "לבחור מראש לפי שפת התכנות של האפליקציה ולפי הספריות שקיימות בה לעבודה עם כל סוג מסד.",
    "להתחיל מ-SQL בלבד, ולעבור למשולב רק כשרכיב מסוים מוכיח שהוא לא מתאים לו."
   ],
   "correct": 3,
   "explain": "הנכונה — \"ולא מראש\". א׳ — הופך את הסדר ומשלם את מחיר הסנכרון מההתחלה. ב׳ — גמישות אינה שיקול מכריע כשהעקביות קריטית. ג׳ — שיקול טכנולוגי ולא שיקול נתונים.",
   "book": {
    "page": 67,
    "where": "שאלה A-88 בעשרת הנושאים"
   }
  },
  "A-89": {
   "id": "A-89",
   "fam": "T9",
   "src": "bank",
   "kind": "concept",
   "difficulty": 2,
   "q": "מה אומר ציר \"עלויות התפעול\" על ארכיטקטורה משולבת?",
   "options": [
    "משולב יקר יותר בקבוע — שני מסדים, שני תשלומי אחסון וידע בשני עולמות — ומשתלם כשהנפח גדול דיו.",
    "משולב זול יותר תמיד, כי כל מסד קטן יותר ולכן החומרה שנדרשת לכל אחד מהם זולה יותר באופן ניכר.",
    "העלויות זהות בשתי הארכיטקטורות, כי מדובר באותו נפח נתונים כולל שרק מחולק בין שני מקומות.",
    "משולב זול יותר בהתחלה ויקר יותר בהמשך, בעוד ש-SQL בלבד מתייקר בהתחלה ומתאזן לאחר מכן."
   ],
   "correct": 0,
   "explain": "הנכונה — ההפרדה משתלמת \"כשהנפח גדול דיו שהפרדה חוסכת יותר ממה שהיא עולה\". ב׳ — ניסוח מוחלט ומתעלם מעלות הידע והסנכרון. ד׳ — היפוך של מה שקורה בפועל: SQL בלבד זול יותר בהתחלה.",
   "book": {
    "page": 67,
    "where": "שאלה A-89 בעשרת הנושאים"
   }
  },
  "A-90": {
   "id": "A-90",
   "fam": "T9",
   "src": "bank",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בארכיטקטורה משולבת נדרש דוח שמצרף נתוני הזמנות מה-SQL עם נתוני שימוש מה-NoSQL.\n\nמה הדרך המקובלת?",
   "options": [
    "להריץ שאילתה אחת שקוראת משני המסדים במקביל בזמן אמת, ולאחד את התוצאות בשכבת הביניים.",
    "להפיק את הדוח מה-SQL, ולהעביר אליו את הנתונים הנדרשים מה-NoSQL בתהליך תקופתי.",
    "להעתיק את כל נתוני ה-SQL ל-NoSQL לפני כל הפקת דוח, כדי שהדוח ירוץ על מסד אחד בלבד.",
    "לוותר על הדוח: שאילתה שחוצה שני מסדים שונים אינה אפשרית ולכן אין לדרוש דוח כזה כלל."
   ],
   "correct": 1,
   "explain": "הנכונה — \"הדוחות הניהוליים מופקים מה-SQL, ונתונים שנדרשים בדוח מצד ה-NoSQL מועברים אליו בתהליך תקופתי\". א׳ — אפשרי טכנית אבל מורכב ואיטי, וזה המחיר שהשאלה מצביעה עליו. ג׳ — העתקה מלאה לכל דוח אינה מעשית. ד׳ — ניסוח מוחלט ושגוי.",
   "book": {
    "page": 67,
    "where": "שאלה A-90 בעשרת הנושאים"
   }
  },
  "N-A01": {
   "id": "N-A01",
   "fam": "T3",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "באוסף customers, בחלק מהמסמכים אין שדה phone בכלל, ובאחרים הוא קיים עם הערך null. מה מחזיר המסנן ‎{ phone: { $exists: false } }‎?",
   "options": [
    "את כל המסמכים שאין בהם טלפון שמיש — גם אלה שהשדה חסר בהם וגם אלה שערכו null.",
    "רק את המסמכים שהשדה phone אינו קיים בהם בכלל.",
    "רק את המסמכים שהשדה phone קיים בהם, אבל הערך שלו הוא null.",
    "שגיאה, כי האופרטור ‎$exists‎ מקבל רק את הערך true ולא את false."
   ],
   "correct": 1,
   "why": "‏‎$exists: false‎ בודק אם השדה קיים במסמך, ולא מה הערך שלו. מסמך עם ‎phone: null‎ מכיל את השדה, ולכן אינו נתפס.",
   "wrong": "א׳ — זה מה שעושה ‎{ phone: null }‎, שתופס גם חסר וגם null. ג׳ — זה ‎{ phone: { $type: \"null\" } }‎. ד׳ — ‎$exists‎ מקבל גם true וגם false.",
   "rule": "‏‎{f: null}‎ = חסר או null · ‏‎{f: {$exists: false}}‎ = רק חסר · ‏‎{f: {$ne: null}}‎ = קיים ואינו null.",
   "hint": {
    "anchors": [
     {
      "n": 3,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-A02": {
   "id": "N-A02",
   "fam": "T3",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "רוצים לשלוף רק לקוחות שיש להם מספר טלפון אמיתי. בחלק מהמסמכים השדה phone חסר, ובחלק הוא null. איזה מסנן נכון?",
   "options": [
    "‏‎{ phone: { $exists: true } }‎, כי הוא מוציא כל מסמך שאין בו מספר טלפון.",
    "‏‎{ phone: { $ne: \"\" } }‎, כי null ושדה חסר נחשבים במונגו למחרוזת ריקה.",
    "‏‎{ phone: { $ne: null } }‎, כי הוא מוציא גם שדה חסר וגם שדה שערכו null.",
    "אין מסנן כזה, וצריך לשלוף את כל המסמכים ולסנן אותם בקוד האפליקציה."
   ],
   "correct": 2,
   "why": "במונגו שדה חסר מתנהג בהשוואה כמו null. לכן ‎$ne: null‎ משאיר רק מסמכים שהשדה קיים בהם עם ערך שאינו null.",
   "wrong": "א׳ — ‎$exists: true‎ משאיר גם מסמכים שבהם ‎phone: null‎, כי השדה קיים בהם. ב׳ — null ומחרוזת ריקה הם ערכים שונים, וחסר אינו מחרוזת ריקה. ד׳ — יש מסנן כזה, והוא ‎$ne: null‎.",
   "rule": "\"יש ערך אמיתי\" = ‎$ne: null‎. ב-SQL המקבילה היא IS NOT NULL.",
   "hint": {
    "anchors": [
     {
      "n": 3,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-A03": {
   "id": "N-A03",
   "fam": "T3",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "ב-SQL כותבים ‎WHERE phone <> '050-1111111'‎. מה קורה ללקוחות שה-phone שלהם NULL?",
   "options": [
    "הם מוחזרים, כי ערך NULL שונה מכל מספר טלפון שאפשר לכתוב בתנאי.",
    "השאילתה נכשלת בשגיאה, כי SQL אינו מאפשר להשוות עמודה שיש בה NULL.",
    "הם מוחזרים רק אם העמודה הוגדרה מראש כ-NULLABLE בזמן יצירת הטבלה.",
    "הם לא מוחזרים: השוואה ל-NULL אינה TRUE. מוסיפים ‎OR phone IS NULL‎."
   ],
   "correct": 3,
   "why": "כל השוואה ל-NULL מחזירה UNKNOWN, ו-WHERE משאיר רק שורות שהתנאי שלהן TRUE. לכן השורות האלה נעלמות בשקט.",
   "wrong": "א׳ — זו האינטואיציה, אבל ההיגיון התלת-ערכי של SQL אינו עובד כך. ב׳ — אין שגיאה; השורות פשוט אינן נבחרות. ג׳ — הגדרת העמודה אינה משנה את תוצאת ההשוואה.",
   "rule": "ב-SQL: ‏= NULL ו-<> NULL לעולם אינם TRUE. משתמשים ב-IS NULL וב-IS NOT NULL, ובשאלת \"שונה מ…\" שוקלים להוסיף OR IS NULL.",
   "hint": {
    "anchors": [
     {
      "n": 3,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-A04": {
   "id": "N-A04",
   "fam": "T3",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "לחלק מההזמנות אין הנחה: ב-SQL העמודה discount היא NULL, ובמונגו השדה חסר. מחשבים את ההנחה הממוצעת ב-AVG(discount) וב-‎$avg: \"$discount\"‎. מה נכון?",
   "options": [
    "שתיהן מדלגות על הזמנות בלי הנחה. כדי לספור אותן כאפס ממירים: COALESCE או ‎$ifNull‎.",
    "AVG ב-SQL מחשב NULL כאפס, ו-‎$avg‎ מדלג על שדה חסר, ולכן שתי התוצאות יהיו שונות זו מזו.",
    "שתי הפונקציות מחזירות NULL ברגע שיש בנתונים אפילו ערך חסר אחד, ולכן צריך לסנן אותו קודם.",
    "‏‎$avg‎ נכשל כשיש מסמך שהשדה חסר בו, ולכן חייבים להוסיף קודם ‎$match‎ עם ‎$exists‎."
   ],
   "correct": 0,
   "why": "גם AVG ב-SQL וגם ‎$avg‎ במונגו מדלגים על ערך ריק: הם מחלקים רק במספר הערכים הקיימים. זה נכון לפעמים, אבל אם \"בלי הנחה\" פירושו הנחה של 0, צריך להמיר במפורש.",
   "wrong": "ב׳ — AVG אינו מחשב NULL כאפס, הוא מדלג עליו. ג׳ — NULL אחד אינו \"מדביק\" את הממוצע; רק כשכל הערכים ריקים התוצאה ריקה. ד׳ — ‎$avg‎ אינו נכשל על שדה חסר, הוא מדלג עליו.",
   "rule": "פונקציות צבירה (AVG, SUM, COUNT(עמודה)) מדלגות על ערכים ריקים. \"אין ערך = 0\" דורש המרה מפורשת לפני הצבירה.",
   "hint": {
    "anchors": [
     {
      "n": 3,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-A05": {
   "id": "N-A05",
   "fam": "T3",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "מה ההבדל בין COUNT(*) לבין COUNT(phone) בטבלת Customers?",
   "options": [
    "אין ביניהן הבדל: שתיהן סופרות את כל השורות בטבלה, כולל שורות עם NULL.",
    "COUNT(phone) סופר רק ערכים שונים זה מזה, ו-COUNT(*) סופר את כל השורות.",
    "COUNT(*) סופר את כל השורות, ו-COUNT(phone) רק שורות שבהן phone אינו NULL.",
    "COUNT(*) מדלג על שורה שיש בה NULL באחת העמודות, ו-COUNT(phone) סופר הכול."
   ],
   "correct": 2,
   "why": "‏COUNT(*) סופר שורות. COUNT(עמודה) סופר ערכים שאינם NULL בעמודה הזו. במונגו המקבילה של COUNT(*) היא ‎$sum: 1‎ בתוך ‎$group‎.",
   "wrong": "א׳ — ההבדל הוא בדיוק ב-NULL. ב׳ — לערכים שונים צריך COUNT(DISTINCT phone). ד׳ — COUNT(*) אינו מדלג על אף שורה.",
   "rule": "אחרי LEFT JOIN סופרים עמודה מהצד הימני (COUNT(e.id)), כדי שמי שאין לו התאמה יקבל 0 ולא 1.",
   "hint": {
    "anchors": [
     {
      "n": 3,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-A06": {
   "id": "N-A06",
   "fam": "T5",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "אוסף ההזמנות מחולק למחיצות לפי טווחי orderDate, תאריך שתמיד עולה. בכל רגע נוצרות אלפי הזמנות חדשות. מה הבעיה הצפויה?",
   "options": [
    "אין בעיה, כי תאריך הוא שדה ייחודי, וערכים ייחודיים מתפזרים שווה בין המחיצות.",
    "כל הכתיבות החדשות נוחתות במחיצה האחרונה, והיא הופכת לנקודה חמה.",
    "שאילתות לפי טווח תאריכים יהיו איטיות, כי הן תמיד נשלחות לכל המחיצות.",
    "מסד מבוזר אינו מאפשר להגדיר שדה תאריך כמפתח חלוקה, ולכן ההגדרה תיכשל."
   ],
   "correct": 1,
   "why": "במפתח שעולה ברצף, כל ערך חדש גדול מכל הקודמים, ולכן נופל בטווח של המחיצה האחרונה. העומס על הכתיבה מתרכז בשרת אחד.",
   "wrong": "א׳ — ייחודיות אינה פיזור: ערכים ייחודיים שעולים ברצף נוחתים כולם באותו קצה. ג׳ — דווקא שאילתת טווח תאריכים יכולה להתמקד במחיצות מעטות. ד׳ — מותר; הבעיה היא העומס, לא החוקיות.",
   "rule": "מפתח שעולה ברצף (זמן, מונה) = כתיבות מרוכזות. הפתרונות: מפתח מעורב (hashed) או מפתח מורכב שמתחיל בשדה מפוזר.",
   "hint": {
    "anchors": [
     {
      "n": 5,
      "page": 10
     },
     {
      "n": 11,
      "page": 13
     }
    ],
    "rules": 39
   }
  },
  "N-A07": {
   "id": "N-A07",
   "fam": "T5",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "משתמשי אפליקציה מחולקים למחיצות לפי country. ‏80% מהמשתמשים מישראל. מה המסקנה המדויקת ביותר?",
   "options": [
    "המפתח מצוין, כי כל השאילתות של משתמש ישראלי ינותבו למחיצה אחת ממוקדת.",
    "הפיזור יהיה שווה, כי מסד מבוזר מאזן את הנתונים בין המחיצות באופן אוטומטי.",
    "המערכת תכפיל אוטומטית את מספר המחיצות של ישראל, ולכן העומס יתאזן מעצמו.",
    "רוב הנתונים והעומס יתרכזו בערך אחד, ואי אפשר לפצל ערך מפתח יחיד בין שרתים."
   ],
   "correct": 3,
   "why": "מאזן הנתונים יכול להזיז רק טווחים שלמים של המפתח. אם 80% מהמסמכים חולקים את אותו ערך, אי אפשר לפצל אותם בין שרתים, ומחיצה אחת נושאת את רוב הנתונים ואת רוב העומס.",
   "wrong": "א׳ — התמקדות במחיצה אחת טובה רק כשהמחיצה לא עמוסה מדי; כאן היא נושאת כמעט הכול. ב׳ — המאזן אינו יכול לפצל ערך מפתח יחיד. ג׳ — אין הכפלה אוטומטית לפי ערך.",
   "rule": "מפתח חלוקה טוב: הרבה ערכים אפשריים (cardinality גבוהה), פיזור אחיד ביניהם, ושאילתות נפוצות שכוללות אותו.",
   "hint": {
    "anchors": [
     {
      "n": 5,
      "page": 10
     },
     {
      "n": 11,
      "page": 13
     }
    ],
    "rules": 39
   }
  },
  "N-A08": {
   "id": "N-A08",
   "fam": "T5",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "האוסף shipments מחולק לפי customerId. מגיעה שאילתה שמחפשת את כל המשלוחים בסטטוס Delayed, בלי שום תנאי על customerId. מה יקרה?",
   "options": [
    "היא תישלח לכל המחיצות והתוצאות יאוחדו. זה עובד, אבל יקר משאילתה ממוקדת.",
    "היא תיכשל, כי במערכת מחולקת חייבים לכלול את מפתח החלוקה בכל שאילתה.",
    "היא תרוץ רק על המחיצה הראשונה, ולכן תחזיר תוצאה חלקית בלי הודעת שגיאה.",
    "היא תהיה מהירה בדיוק כמו שאילתה לפי customerId, כי status הוא שדה קטן."
   ],
   "correct": 0,
   "why": "הנתב אינו יודע באיזו מחיצה נמצאים המסמכים המתאימים, ולכן הוא שולח את השאילתה לכולן ומאחד את התשובות (scatter-gather).",
   "wrong": "ב׳ — מותר לשאול בלי מפתח החלוקה; זה רק יקר יותר. ג׳ — הנתב אינו מחזיר תוצאה חלקית בשקט. ד׳ — גודל השדה אינו קובע את הניתוב; מה שקובע הוא אם השאילתה כוללת את המפתח.",
   "rule": "שאילתה עם מפתח החלוקה = ממוקדת (targeted). בלעדיו = שידור לכל המחיצות. לכן בוחרים מפתח לפי השאילתות הנפוצות.",
   "hint": {
    "anchors": [
     {
      "n": 5,
      "page": 10
     },
     {
      "n": 11,
      "page": 13
     }
    ],
    "rules": 39
   }
  },
  "N-A09": {
   "id": "N-A09",
   "fam": "T5",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "מה ההבדל בין חלוקה למחיצות (Sharding) לבין שכפול (Replication)?",
   "options": [
    "אלה שני שמות לאותו מנגנון: בשניהם מעתיקים את כל הנתונים לכמה שרתים.",
    "שכפול מחלק את הנתונים בין שרתים, וחלוקה שומרת עותקים זהים של אותם נתונים.",
    "חלוקה מפזרת חלקים שונים של הנתונים בין שרתים; שכפול שומר עותקים לזמינות.",
    "חלוקה קיימת רק במסדי SQL, ושכפול קיים רק במסדי NoSQL כמו MongoDB."
   ],
   "correct": 2,
   "why": "בחלוקה כל שרת מחזיק רק חלק מהנתונים, ולכן המערכת יכולה לגדול מעבר לשרת אחד. בשכפול כל עותק מחזיק את אותם נתונים, כך שנפילת שרת אחד אינה מפילה את המערכת.",
   "wrong": "א׳ — חלוקה אינה מעתיקה את כל הנתונים לכל שרת. ב׳ — זה בדיוק ההפך. ד׳ — שני המנגנונים קיימים בשני סוגי המסדים; במונגו, למשל, כל מחיצה היא בעצמה קבוצת שכפול.",
   "rule": "Sharding = פיצול לגדילה (scale-out). Replication = עותקים לזמינות. מערכת גדולה משתמשת בשניהם יחד.",
   "hint": {
    "anchors": [
     {
      "n": 5,
      "page": 10
     },
     {
      "n": 11,
      "page": 13
     }
    ],
    "rules": 39
   }
  },
  "N-A10": {
   "id": "N-A10",
   "fam": "T5",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "אוסף ההזמנות מחולק לפי השדה status, שיש לו שלושה ערכים בלבד: New, Shipped, Delivered. הנתונים גדלים מהר. מה הבעיה?",
   "options": [
    "אין בעיה, כי שלושה ערכים מאפשרים שלוש מחיצות שמאוזנות זו מול זו לחלוטין.",
    "יש מעט ערכים, ולכן אי אפשר לפזר על יותר משלושה טווחים, וטווח שגדל לא יתפצל.",
    "סטטוס משתנה, ולכן המסד ימחק את המסמך ויכתוב אותו מחדש בכל עדכון של סטטוס.",
    "הבעיה היחידה היא בשאילתות לפי לקוח, וכל שאר השאילתות יעבדו באותה יעילות."
   ],
   "correct": 1,
   "why": "כשלמפתח יש מעט ערכים, כל המסמכים עם אותו ערך חייבים לשבת יחד. כשקבוצה כזו גדלה, אי אפשר לחלק אותה, וזה מגביל את מספר המחיצות שאפשר לנצל.",
   "wrong": "א׳ — הערכים לא יתחלקו שווה, ובוודאי שלא יאפשרו גדילה מעבר לשלושה שרתים. ג׳ — עדכון סטטוס אינו מוחק מסמך; עם זאת, שינוי ערך המפתח מעביר את המסמך בין מחיצות וזה יקר. ד׳ — זו לא הבעיה היחידה וגם לא המרכזית.",
   "rule": "cardinality נמוכה במפתח החלוקה = תקרה על הגדילה. מפתח טוב הוא מפתח שיש לו הרבה ערכים, ושאינו משתנה לעיתים קרובות.",
   "hint": {
    "anchors": [
     {
      "n": 5,
      "page": 10
     },
     {
      "n": 11,
      "page": 13
     }
    ],
    "rules": 39
   }
  },
  "N-A11": {
   "id": "N-A11",
   "fam": "T5",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "מערכת קולטת מדידות ממיליוני חיישנים. רוב השאילתות מבקשות את המדידות של חיישן אחד בטווח זמן. מה מפתח החלוקה הסביר ביותר?",
   "options": [
    "רק זמן המדידה, כי כמעט כל השאילתות כוללות טווח זמן ולכן ימוקדו למחיצה אחת.",
    "מזהה רנדומלי חדש לכל מדידה, כי הוא מבטיח פיזור מושלם וזה השיקול החשוב היחיד.",
    "סוג החיישן, כי יש מעט סוגים ולכן קל לנהל את המחיצות ולדעת איפה כל נתון.",
    "מפתח מורכב: מזהה החיישן ואחריו הזמן. כך הכתיבות מתפזרות, ושאילתה לחיישן ממוקדת."
   ],
   "correct": 3,
   "why": "מזהה החיישן מפזר את הכתיבות, כי יש מיליוני חיישנים. הוספת הזמן אחריו שומרת את המדידות של כל חיישן מסודרות, ומאפשרת שאילתת טווח ממוקדת.",
   "wrong": "א׳ — זמן לבדו עולה ברצף, ומרכז את כל הכתיבות במחיצה אחת. ב׳ — פיזור מושלם, אבל כל שאילתה על חיישן תישלח לכל המחיצות. ג׳ — מעט ערכים, ולכן אי אפשר לפזר.",
   "rule": "בוחרים מפתח שמאזן שלושה דברים: פיזור הכתיבות, cardinality גבוהה, והתאמה לשאילתה הנפוצה. מפתח מורכב משיג לעיתים את שלושתם.",
   "hint": {
    "anchors": [
     {
      "n": 5,
      "page": 10
     },
     {
      "n": 11,
      "page": 13
     }
    ],
    "rules": 39
   }
  },
  "N-A12": {
   "id": "N-A12",
   "fam": "T6",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "משתמש מעדכן את כתובת המשלוח שלו, והאפליקציה מציגה מיד את הפרופיל, אבל עדיין עם הכתובת הישנה. הכתיבה נשלחה ל-primary, והקריאה מוגדרת להעדיף secondary. מה ההסבר?",
   "options": [
    "הקריאה הגיעה לעותק משני שעוד לא קיבל את העדכון. כדי לראות מיד — קוראים מה-primary.",
    "העדכון נכשל, כי אילו הצליח, כל העותקים היו מציגים את הכתובת החדשה באותו רגע.",
    "זו תקלה בכונן הקשיח של ה-secondary, ולכן צריך להחליף אותו לפני שהבעיה תחמיר.",
    "זה יכול לקרות רק במסד רלציוני מבוזר, ואינו קורה במסד מסמכים כמו MongoDB."
   ],
   "correct": 0,
   "why": "בשכפול אסינכרוני העותק המשני מקבל את השינויים באיחור קצר. קריאה ממנו מיד אחרי כתיבה עלולה להחזיר את הערך הקודם. זו התנהגות צפויה, לא תקלה.",
   "wrong": "ב׳ — הכתיבה הצליחה ב-primary; ההשהיה היא בהפצה. ג׳ — אין כאן תקלת חומרה. ד׳ — זה קורה בכל מערכת עם שכפול אסינכרוני, רלציונית או לא.",
   "rule": "\"לקרוא את מה שכתבתי\" (read-your-writes) דורש לקרוא מה-primary, או להגדיר רמת עקביות שמבטיחה זאת.",
   "hint": {
    "anchors": [
     {
      "n": 6,
      "page": 10
     }
    ],
    "rules": 39
   }
  },
  "N-A13": {
   "id": "N-A13",
   "fam": "T6",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "מה המטרה העיקרית של קבוצת שכפול (Replica Set) במונגו?",
   "options": [
    "לחלק את הנתונים בין כמה שרתים, כך שכל שרת יחזיק רק חלק קטן מהם.",
    "להאיץ את הכתיבות, כי כל שרת בקבוצה מקבל כתיבות במקביל לשאר השרתים.",
    "זמינות: עותקים של אותם נתונים, ואם ה-primary נופל — עותק אחר מחליף אותו.",
    "להחליף את הגיבויים, כי כל שינוי נשמר ממילא בכמה מקומות בו-זמנית."
   ],
   "correct": 2,
   "why": "קבוצת שכפול שומרת את אותם נתונים בכמה שרתים. כשה-primary נופל, השאר בוחרים primary חדש והמערכת ממשיכה לעבוד.",
   "wrong": "א׳ — זו חלוקה למחיצות (sharding), לא שכפול. ב׳ — כל הכתיבות עוברות דרך ה-primary היחיד, ולכן שכפול אינו מאיץ כתיבה. ד׳ — שכפול אינו גיבוי: מחיקה שגויה משוכפלת לכל העותקים.",
   "rule": "שכפול = זמינות וקריאה. חלוקה = גדילה בנפח ובכתיבה. גיבוי = שחזור לנקודת זמן.",
   "hint": {
    "anchors": [
     {
      "n": 6,
      "page": 10
     }
    ],
    "rules": 39
   }
  },
  "N-A14": {
   "id": "N-A14",
   "fam": "T6",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "מוגדר ‎writeConcern: { w: \"majority\" }‎. מה המשמעות?",
   "options": [
    "הכתיבה נשמרת רק בחצי מהעותקים בקבוצה, כדי לחסוך מקום אחסון בשרתים.",
    "האישור מגיע רק אחרי שרוב העותקים קיבלו את הכתיבה — איטי יותר, אבל לא תאבד.",
    "הכתיבה תבוצע רק אם רוב המשתמשים המחוברים באותו רגע יאשרו אותה.",
    "הכתיבה מאושרת מיד, וההפצה שלה לשאר העותקים בקבוצה מתבטלת לגמרי."
   ],
   "correct": 1,
   "why": "האישור מחכה עד שרוב העותקים קיבלו את הכתיבה. אם ה-primary נופל אחר כך, העותק שייבחר במקומו כבר מכיל אותה. המחיר הוא זמן תגובה ארוך יותר.",
   "wrong": "א׳ — אין כאן חיסכון במקום; כל העותקים מקבלים את הכתיבה בסוף. ג׳ — \"רוב\" מתייחס לשרתים, לא למשתמשים. ד׳ — זה ההפך: האישור מחכה, וההפצה ממשיכה.",
   "rule": "יש איזון בין מהירות לבטיחות: ‏w: 1 מהיר יותר, ‏w: \"majority\" בטוח יותר.",
   "hint": {
    "anchors": [
     {
      "n": 6,
      "page": 10
     }
    ],
    "rules": 39
   }
  },
  "N-A15": {
   "id": "N-A15",
   "fam": "T6",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "במערכת אחת יש שני רכיבים: יתרת חשבון בנק, ומונה לייקים על פוסט. איזו דרישת עקביות מתאימה לכל רכיב?",
   "options": [
    "עקביות חזקה לשניהם, כי כל נתון במערכת חייב להיות מדויק בכל רגע ורגע.",
    "עקביות בסופו של דבר לשניהם, כי עקביות חזקה איטית מדי לכל מערכת מודרנית.",
    "עקביות בסופו של דבר ליתרה, ועקביות חזקה למונה הלייקים שמוצג לכולם.",
    "חזקה ליתרה, כי קריאה ישנה עלולה לאשר משיכה; בסופו של דבר ללייקים."
   ],
   "correct": 3,
   "why": "בוחרים עקביות לפי מחיר הטעות. ביתרה, קריאה ישנה גורמת לנזק כספי. במונה לייקים, אם המספר מתעדכן בעוד שנייה, איש לא נפגע.",
   "wrong": "א׳ — עקביות חזקה בכל מקום מאטה את המערכת בלי צורך. ב׳ — לא בכל רכיב אפשר לוותר על עקביות. ג׳ — זה בדיוק ההפך.",
   "rule": "השאלה היא תמיד \"מה קורה אם קראתי ערך ישן?\". אם התשובה היא נזק, צריך עקביות חזקה. אם רק אי-דיוק רגעי, עקביות בסופו של דבר מספיקה.",
   "hint": {
    "anchors": [
     {
      "n": 6,
      "page": 10
     }
    ],
    "rules": 39
   }
  },
  "N-A16": {
   "id": "N-A16",
   "fam": "T6",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "מישהו מוחק בטעות את כל אוסף ההזמנות. למערכת יש קבוצת שכפול עם שלושה עותקים. מה נכון?",
   "options": [
    "אין בעיה, כי שני העותקים האחרים שומרים את הנתונים כפי שהיו לפני המחיקה.",
    "המחיקה תשוכפל לכל העותקים, ולכן שכפול אינו גיבוי; כדי לשחזר צריך גיבוי.",
    "העותקים המשניים מסרבים לקבל פקודות מחיקה, ולכן הנתונים נשמרים בהם.",
    "המחיקה תתבטל אוטומטית, כי רוב העותקים בקבוצה לא אישרו אותה מראש."
   ],
   "correct": 1,
   "why": "שכפול מעתיק כל שינוי, כולל מחיקה שגויה. תוך זמן קצר כל העותקים זהים, כלומר כולם ריקים.",
   "wrong": "א׳ — העותקים מקבלים את אותה פקודת מחיקה. ג׳ — עותקים משניים משכפלים את כל הפעולות. ד׳ — אין \"הצבעה\" על תוכן הפעולה; רוב העותקים יאשרו אותה כרגיל.",
   "rule": "שכפול מגן מנפילת שרת. גיבוי מגן מטעות אנוש. צריך את שניהם.",
   "hint": {
    "anchors": [
     {
      "n": 6,
      "page": 10
     }
    ],
    "rules": 39
   }
  },
  "N-A17": {
   "id": "N-A17",
   "fam": "T6",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "מערכת משלוחים מוסיפה עוד שני שרתים משניים לקבוצת השכפול, כדי להגדיל את קצב הכתיבה של אירועי המעקב. מה נכון?",
   "options": [
    "קצב הכתיבה יגדל פי שלושה, כי כל שרת בקבוצה יקלוט שליש מהכתיבות.",
    "קצב הכתיבה יגדל, אבל רק אם האירועים מוטמעים בתוך מסמך המשלוח עצמו.",
    "לא יגדל: כל הכתיבות עוברות דרך ה-primary. לגדילה בכתיבה — sharding.",
    "השרתים החדשים יאטו את הקריאות, כי כל קריאה עוברת על כל העותקים."
   ],
   "correct": 2,
   "why": "בקבוצת שכפול יש primary אחד שמקבל את כל הכתיבות, והמשניים רק מעתיקים ממנו. עוד עותקים מוסיפים זמינות ואפשרות לקריאה, לא קיבולת כתיבה.",
   "wrong": "א׳ — המשניים אינם מקבלים כתיבות ישירות. ב׳ — הטמעה אינה קשורה לחלוקת עומס הכתיבה בין שרתים. ד׳ — קריאה נשלחת לעותק אחד, לא לכולם.",
   "rule": "עומס כתיבה = sharding. עומס קריאה וזמינות = replication.",
   "hint": {
    "anchors": [
     {
      "n": 6,
      "page": 10
     }
    ],
    "rules": 39
   }
  },
  "N-B01": {
   "id": "N-B01",
   "fam": "T1",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "באתר חדשות, כל כתבה שומרת בתוכה מערך של כל התגובות עליה. לכתבות פופולריות יש עשרות אלפי תגובות, והאתר מציג בכל פעם רק את 20 התגובות האחרונות. מה הקביעה המדויקת ביותר?",
   "options": [
    "ההטמעה מתאימה, כי כל התגובות נשלפות יחד עם הכתבה בקריאה אחת ומהירה.",
    "אין בעיה בהיקף, כי ב-MongoDB אין שום הגבלה על הגודל של מסמך בודד.",
    "אוסף תגובות נפרד עם אינדקס לפי כתבה וזמן: המערך אינו חסום, ומציגים רק 20.",
    "התגובות חייבות לעבור ל-SQL, כי מונגו אינו יודע למיין איברים של מערך."
   ],
   "correct": 2,
   "why": "המערך גדל בלי גבול, וכל תגובה חדשה מגדילה מסמך שכבר גדול. מכיוון שבכל הצגה צריך רק 20 תגובות, אין טעם לשלוף את כולן עם הכתבה. אוסף נפרד עם אינדקס נותן את 20 האחרונות ביעילות.",
   "wrong": "א׳ — קריאה אחת היא יתרון רק כשקוראים את כל המידע; כאן קוראים חלק קטן ממנו. ב׳ — יש תקרה למסמך (16MB). ד׳ — מונגו ממיין גם מערכים וגם אוספים; הבעיה היא הגדילה, לא היכולת.",
   "rule": "מערך שגדל בלי גבול, ושממנו מציגים רק חלק, עובר לאוסף נפרד.",
   "hint": {
    "anchors": [
     {
      "n": 1,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B02": {
   "id": "N-B02",
   "fam": "T1",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "לכל לקוח יש לכל היותר שלוש כתובות משלוח, והן תמיד מוצגות יחד עם פרופיל הלקוח. מה התכנון הסביר ביותר במונגו?",
   "options": [
    "להטמיע את הכתובות כמערך במסמך הלקוח: הרשימה קטנה, חסומה ונקראת יחד.",
    "אוסף כתובות נפרד, כי הטמעה של מערך במסמך היא תמיד טעות ארכיטקטונית.",
    "כל כתובת כמסמך נפרד בלי קשר ללקוח, ולחפש את הכתובות לפי שם העיר.",
    "שדה טקסט אחד עם כל הכתובות מופרדות בפסיקים, כדי לחסוך מקום במסמך."
   ],
   "correct": 0,
   "why": "שלושת התנאים להטמעה מתקיימים כאן: הרשימה קטנה, היא חסומה בגודל, והיא נקראת תמיד עם המסמך. ההטמעה חוסכת $lookup בכל הצגה של פרופיל.",
   "wrong": "ב׳ — \"תמיד\" הוא דגל אדום; הטמעה של רשימה קטנה וחסומה היא בדיוק המקרה המומלץ. ג׳ — בלי הפניה ללקוח אי אפשר לדעת של מי הכתובת. ד׳ — טקסט עם פסיקים אינו מודל נתונים ואי אפשר לסנן לפיו.",
   "rule": "הטמעה = קטן, חסום ונקרא יחד. ההיפך מכל אחד מהשלושה הוא סיבה לשקול הפניה.",
   "hint": {
    "anchors": [
     {
      "n": 1,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B03": {
   "id": "N-B03",
   "fam": "T1",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "חיישן טמפרטורה שולח מדידה בכל שנייה, והמערכת שומרת את כל המדידות במערך בתוך מסמך החיישן. מה יקרה לאורך זמן?",
   "options": [
    "שום דבר מיוחד, כי מערך במונגו יכול לגדול בלי השפעה על הביצועים.",
    "המדידות הישנות יימחקו אוטומטית כשהמערך יתמלא, ולכן אין צורך בתכנון.",
    "הבעיה היחידה תהיה שאי אפשר לשלוף מדידה בודדת מתוך מערך גדול.",
    "המסמך יגדל בלי גבול עד תקרת הגודל; עדיף אוסף מדידות נפרד."
   ],
   "correct": 3,
   "why": "86,400 מדידות ביום לחיישן אחד: המערך גדל מהר, המסמך מתקרב לתקרת 16MB, וכל עדכון נוגע במסמך ענק. אוסף נפרד, או \"סל\" של מדידות לכל שעה, שומר על מסמכים קטנים.",
   "wrong": "א׳ — מסמך שגדל מכביד על כל כתיבה וקריאה. ב׳ — מונגו אינו מוחק איברים ממערך מעצמו. ג׳ — אפשר לשלוף איבר ממערך; זו לא הבעיה.",
   "rule": "קצב גבוה ואין סוף = אוסף נפרד. בדיוק כמו אירועי המעקב בשאלה 1 במבחן.",
   "hint": {
    "anchors": [
     {
      "n": 1,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B04": {
   "id": "N-B04",
   "fam": "T1",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "בהזמנה יש בין 1 ל-10 שורות פריטים. השורות נוצרות פעם אחת עם ההזמנה, כמעט לא משתנות, ומוצגות תמיד יחד איתה. מה נכון?",
   "options": [
    "חייבים אוסף נפרד לשורות, כי כל קשר אחד-לרבים במונגו נשמר בהפניה.",
    "הטמעה מתאימה: רשימה קטנה, חסומה ונקראת יחד, והיצירה היא כתיבה אטומית אחת.",
    "הטמעה אסורה, כי היא יוצרת כפילות של נתוני הפריט בכל הזמנה והזמנה.",
    "אין הבדל בין הטמעה להפניה, כי מונגו מצרף את המסמכים מאחורי הקלעים."
   ],
   "correct": 1,
   "why": "שורות ההזמנה הן חלק מההזמנה עצמה. הן מעטות, לא גדלות, ונקראות יחד. הטמעה נותנת שליפה אחת וכתיבה אטומית אחת למסמך אחד.",
   "wrong": "א׳ — אחד-לרבים קטן וחסום הוא דווקא המקרה הקלאסי להטמעה. ג׳ — מה שנשמר בשורה הוא כמות ומחיר של העסקה, ואלה נתונים של ההזמנה. ד׳ — מונגו אינו מצרף מעצמו; הפניה דורשת $lookup מפורש.",
   "rule": "אחד-למעט, שנקרא יחד = הטמעה. אחד-להרבה, שגדל = הפניה.",
   "hint": {
    "anchors": [
     {
      "n": 1,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B05": {
   "id": "N-B05",
   "fam": "T1",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "מה המשמעות המעשית של תקרת גודל המסמך (16MB) במונגו לתכנון מודל?",
   "options": [
    "היא רלוונטית רק לקבצים ולתמונות שנשמרים במסמך, ולא למערכים של נתונים.",
    "היא מבטיחה שכל שאילתה תרוץ מהר, ולכן במונגו אין צורך באינדקסים בכלל.",
    "אפשר לעקוף אותה בקלות, אם מוסיפים עוד שדות במקום עוד איברים במערך.",
    "מערך שגדל בלי גבול יגיע אליה בסוף, ולכן לא מטמיעים נתון שאינו חסום."
   ],
   "correct": 3,
   "why": "התקרה היא על המסמך כולו. כל מבנה בתוך המסמך שגדל בלי גבול יפגע בה מתישהו, וגם לפני כן המסמך הופך כבד לקריאה ולעדכון.",
   "wrong": "א׳ — כל תוכן המסמך נספר, כולל מערכים. ב׳ — גודל מסמך אינו קשור למהירות שאילתה או לאינדקסים. ג׳ — שדות נוספים נכנסים לאותו מסמך ולאותה תקרה.",
   "rule": "השאלה בכל תכנון הטמעה: האם הדבר הזה חסום בגודל? אם לא — אוסף נפרד.",
   "hint": {
    "anchors": [
     {
      "n": 1,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B06": {
   "id": "N-B06",
   "fam": "T2",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בכל חשבונית נשמרת כתובת הלקוח כפי שהייתה ביום ההפקה. הלקוח עבר דירה. מה נכון לגבי החשבוניות הקודמות?",
   "options": [
    "נשארת כפי שהייתה: חשבונית מתעדת רגע, והכתובת בה היא צילום מצב.",
    "צריך לעדכן את כל החשבוניות הקודמות לכתובת החדשה, כדי שלא תהיה כפילות.",
    "צריך למחוק את הכתובת מכל החשבוניות, ולשלוף אותה תמיד ממסמך הלקוח.",
    "אסור מלכתחילה לשמור כתובת בחשבונית, כי זו הפרה של כללי הנרמול."
   ],
   "correct": 0,
   "why": "החשבונית מתעדת עסקה שקרתה בתאריך מסוים, לכתובת מסוימת. שינוי עתידי של הכתובת אינו משנה את העובדה שהחשבונית נשלחה לכתובת הקודמת.",
   "wrong": "ב׳ וג׳ — שתיהן משכתבות היסטוריה, והחשבונית תציג כתובת שהלקוח לא גר בה ביום ההפקה. ד׳ — צילום מצב היסטורי אינו כפילות אסורה; זו עובדה אחרת מהכתובת הנוכחית.",
   "rule": "כמו המחיר בשאלה 2: מה שהיה נכון ברגע העסקה נשמר בעסקה ואינו מתעדכן.",
   "hint": {
    "anchors": [
     {
      "n": 2,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B07": {
   "id": "N-B07",
   "fam": "T2",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בעגלת קניות שעוד לא שולמה שמורים פריטים, ובינתיים המחיר בקטלוג ירד. מה נכון?",
   "options": [
    "העגלה חייבת לשמור את המחיר מהרגע שבו הפריט נוסף אליה, בדיוק כמו בהזמנה.",
    "עגלה עוד אינה עסקה, ולכן מציגה את המחיר העדכני; הצילום נעשה ברגע התשלום.",
    "צריך לבטל את העגלה ולבקש מהלקוח להוסיף את הפריטים מחדש, כי המחיר השתנה.",
    "אין הבדל בין עגלה להזמנה, ושתיהן מציגות תמיד את המחיר העדכני מהקטלוג."
   ],
   "correct": 1,
   "why": "צילום מצב נשמר רק כשהעסקה נסגרת. עד אז המחיר הנכון הוא המחיר הנוכחי. ברגע התשלום ההזמנה שומרת את המחיר ששולם, וזה כבר לא משתנה.",
   "wrong": "א׳ — עגלה אינה עסקה סגורה, ואין סיבה לנעול בה מחיר. ג׳ — שינוי מחיר אינו מבטל עגלה. ד׳ — בהזמנה דווקא שומרים את המחיר ששולם, ולא את מחיר הקטלוג.",
   "rule": "השאלה היא תמיד \"מתי נסגרה העסקה?\". לפני — ערך עדכני. אחרי — צילום מצב.",
   "hint": {
    "anchors": [
     {
      "n": 2,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B08": {
   "id": "N-B08",
   "fam": "T2",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "רוצים דוח שמראה כמה הנחה קיבל כל לקוח בכל רכישה. מה צריך להיות שמור בשורת ההזמנה?",
   "options": [
    "רק את מזהה המוצר, כי את המחיר אפשר תמיד לשלוף מהקטלוג בזמן הפקת הדוח.",
    "רק את מחיר הקטלוג הנוכחי, כי הוא המחיר המעודכן והאמין ביותר במערכת.",
    "את המחיר ששולם, ואת מחיר המחירון באותו רגע — שניהם צילום מצב של הרכישה.",
    "שום מחיר, כי את ההנחה אפשר לחשב בדוח לפי המחירים שבקטלוג של היום."
   ],
   "correct": 2,
   "why": "הנחה היא הפער בין המחיר שהיה אז לבין המחיר ששולם אז. מחיר הקטלוג של היום אינו מספר על העבר, ולכן את שני המספרים שומרים בעסקה.",
   "wrong": "א׳ וב׳ — מחיר הקטלוג משתנה, ושליפה שלו היום נותנת תשובה שגויה על העבר. ד׳ — מחירי היום אינם מחירי העסקה.",
   "rule": "כל מספר שדוח על העבר צריך — נשמר בעסקה ברגע שהיא נסגרת.",
   "hint": {
    "anchors": [
     {
      "n": 2,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B09": {
   "id": "N-B09",
   "fam": "T2",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "מערכת תשלומים מקבלת תשלום בדולרים ושומרת אותו בשקלים. שער החליפין משתנה כל יום. מה נכון?",
   "options": [
    "מספיק לשמור את הסכום בדולרים, ולחשב שקלים לפי השער של היום בכל הצגה.",
    "צריך לעדכן כל לילה את כל התשלומים הישנים לפי שער החליפין החדש.",
    "שער חליפין הוא נתון קבוע לאורך זמן, ולכן אין צורך לשמור אותו בכלל.",
    "שומרים בתשלום את השער שבו בוצעה ההמרה, כי הוא חלק מהעסקה עצמה."
   ],
   "correct": 3,
   "why": "השער שבו בוצעה ההמרה קבע את הסכום שנגבה. הוא נתון של העסקה, בדיוק כמו המחיר ששולם, ולכן נשמר איתה.",
   "wrong": "א׳ — השער של היום ייתן סכום שונה מזה שנגבה. ב׳ — עדכון התשלומים הישנים משכתב היסטוריה. ג׳ — שער חליפין משתנה כל הזמן.",
   "rule": "ערך חיצוני שהשתתף בחישוב של עסקה נשמר עם העסקה.",
   "hint": {
    "anchors": [
     {
      "n": 2,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B10": {
   "id": "N-B10",
   "fam": "T2",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "השכר של עובד משתנה מדי פעם, וצריך לדעת מה היה השכר שלו בכל חודש בעבר. מה התכנון הנכון?",
   "options": [
    "טבלה או מערך של היסטוריית שכר עם תאריך תחילה; השכר הנוכחי הוא האחרון.",
    "עמודת שכר אחת בטבלת העובדים, שמעדכנים אותה בכל פעם שהשכר משתנה.",
    "לשמור את השכר רק בתלושים שהופקו, ולמחוק אותו לגמרי מטבלת העובדים.",
    "עמודה נפרדת לכל חודש בטבלת העובדים, כדי שכל השכר יהיה בשורה אחת."
   ],
   "correct": 0,
   "why": "עדכון במקום מוחק את העבר. היסטוריה עם תאריכי תחילה שומרת כל ערך שהיה, ומאפשרת לשאול גם \"מה עכשיו\" וגם \"מה היה בחודש X\".",
   "wrong": "ב׳ — כל עדכון מוחק את השכר הקודם. ג׳ — בלי מקור אחד לשכר קשה לדעת מה תקף היום. ד׳ — עמודה לכל חודש היא מבנה שגדל לרוחב ואינו מנורמל.",
   "rule": "כשהשאלה כוללת \"מה היה ב…\" — צריך היסטוריה, לא עדכון במקום.",
   "hint": {
    "anchors": [
     {
      "n": 2,
      "page": 8
     }
    ],
    "rules": 39
   }
  },
  "N-B11": {
   "id": "N-B11",
   "fam": "T3",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "ב-SQL כותבים ‎WHERE studentId NOT IN (SELECT mentorId FROM Students)‎, ובעמודה mentorId יש גם ערכי NULL. מה תחזיר השאילתה?",
   "options": [
    "את כל הסטודנטים שאינם מנחים של אף סטודנט אחר, כמו שמצפים מ-NOT IN.",
    "שגיאה, כי SQL אינו מאפשר שערך NULL יופיע בתוצאה של תת-שאילתה.",
    "שום שורה: מול NULL ההשוואה אינה TRUE. NOT EXISTS אינו נופל בזה.",
    "רק את הסטודנטים שעמודת ה-mentorId שלהם עצמם מכילה את הערך NULL."
   ],
   "correct": 2,
   "why": "‏NOT IN שקול ל\"שונה מכל אחד מהערכים\". מול NULL ההשוואה מחזירה UNKNOWN, ולכן התנאי כולו אינו TRUE לאף שורה. NOT EXISTS בודק קיום שורה, ולא משווה ערכים, ולכן אינו נפגע.",
   "wrong": "א׳ — זו הציפייה, ובדיוק לכן זו מלכודת. ב׳ — אין שגיאה; פשוט אין תוצאות. ד׳ — אין קשר לערך של הסטודנט עצמו.",
   "rule": "אנטי-צירוף עם תת-שאילתה שעלולה להכיל NULL — NOT EXISTS (או LEFT JOIN … IS NULL), ולא NOT IN.",
   "hint": {
    "anchors": [
     {
      "n": 3,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-B12": {
   "id": "N-B12",
   "fam": "T4",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "נשאר פריט אחד במלאי. האפליקציה קוראת את המלאי, בודקת שהוא גדול מ-0, ורק אז שולחת עדכון שמוריד אותו ב-1. שני לקוחות לוחצים \"קנה\" באותה שנייה. מה עלול לקרות?",
   "options": [
    "שום דבר, כי מסד הנתונים מבצע את שתי הבקשות אחת אחרי השנייה בכל מקרה.",
    "שניהם יקראו מלאי 1 ויקנו. הפתרון: תנאי המלאי בתוך פקודת העדכון עצמה.",
    "הבקשה השנייה תיכשל תמיד, כי מונגו נועל את כל האוסף בזמן כל קריאה.",
    "הבעיה תיפתר אם מגדירים אינדקס על שדה המלאי, כי הוא מאיץ את הבדיקה."
   ],
   "correct": 1,
   "why": "בין הקריאה לעדכון עובר זמן, ובזמן הזה שני התהליכים רואים את אותו מלאי. כשהתנאי נמצא בתוך פקודת העדכון ‎(stock > 0, ואז ‎$inc: -1)‎, רק אחד מהם יצליח לעדכן.",
   "wrong": "א׳ — הקריאה והעדכון הם שתי פעולות, והמסד אינו מחבר ביניהן. ג׳ — אין נעילה כזו על קריאה. ד׳ — אינדקס מאיץ חיפוש, הוא אינו מונע מצב מרוץ.",
   "rule": "\"בודקים ואז מעדכנים\" בשתי פקודות = מצב מרוץ. מכניסים את הבדיקה לתוך העדכון.",
   "hint": {
    "anchors": [
     {
      "n": 4,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-B13": {
   "id": "N-B13",
   "fam": "T4",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "העברת כסף בין שני חשבונות, שכל אחד מהם הוא מסמך נפרד במונגו: מורידים מחשבון א׳ ומוסיפים לחשבון ב׳. מה נכון?",
   "options": [
    "אין צורך בשום מנגנון נוסף, כי כל פקודת עדכון במונגו היא אטומית.",
    "אפשר לבצע את שני העדכונים ב-updateOne אחד, כי שני החשבונות באותו אוסף.",
    "מונגו אינו מתאים לנתונים כספיים, ולכן אין דרך לבצע בו את ההעברה.",
    "השינוי נוגע בשני מסמכים, ולכן צריך טרנזקציה שתבצע את שניהם יחד."
   ],
   "correct": 3,
   "why": "כל עדכון לבד הוא אטומי, אבל אם הראשון הצליח והשני נכשל, הכסף נעלם. טרנזקציה הופכת את שניהם ליחידה אחת.",
   "wrong": "א׳ — אטומיות היא ברמת המסמך הבודד, לא ברמת הפעולה העסקית. ב׳ — updateOne מעדכן מסמך אחד בלבד. ג׳ — מונגו תומך בטרנזקציות על כמה מסמכים.",
   "rule": "מסמך אחד — אטומי מעצמו. כמה מסמכים שחייבים להשתנות יחד — טרנזקציה.",
   "hint": {
    "anchors": [
     {
      "n": 4,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-B14": {
   "id": "N-B14",
   "fam": "T4",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "כשמשלוח נמסר, מעדכנים את הסטטוס שלו ובאותה פקודה מוסיפים אירוע למערך האירועים שבתוך אותו מסמך ‎($set‎ יחד עם ‎$push)‎. מה נכון?",
   "options": [
    "אטומית: שני השינויים הם במסמך אחד ובפקודה אחת, ויקרו יחד.",
    "צריך טרנזקציה, כי הפקודה מעדכנת שני שדות שונים, גם אם הם באותו מסמך.",
    "אי אפשר לשלב ‎$set‎ ו-‎$push‎ באותה פקודה, וצריך לשלוח שתי פקודות.",
    "רק ה-‎$set‎ אטומי, וה-‎$push‎ מתבצע ברקע זמן קצר לאחר מכן."
   ],
   "correct": 0,
   "why": "כתיבה אחת למסמך אחד היא אטומית, בלי קשר למספר השדות או לסוגי האופרטורים שבה.",
   "wrong": "ב׳ — טרנזקציה נדרשת רק כשנוגעים בכמה מסמכים. ג׳ — אפשר לשלב כמה אופרטורי עדכון בפקודה אחת. ד׳ — אין חלוקה כזו; כל הפקודה מתבצעת יחד.",
   "rule": "אותה שאלה כמו שאלה 4 במבחן: כמה שדות באותו מסמך = פעולה אטומית אחת.",
   "hint": {
    "anchors": [
     {
      "n": 4,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-B15": {
   "id": "N-B15",
   "fam": "T4",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "פקודת updateMany אמורה לעדכן 10,000 מסמכים, והשרת נופל אחרי 4,000. מה המצב?",
   "options": [
    "אף מסמך לא עודכן, כי updateMany אטומית כמו כל פקודה על מסמך אחד.",
    "כל 10,000 עודכנו, כי המסד משלים את הפקודה מעצמו אחרי שהוא עולה מחדש.",
    "חלק עודכנו וחלק לא: האטומיות היא לכל מסמך בנפרד, לא לפקודה כולה.",
    "המסמכים שכבר עודכנו יחזרו אוטומטית לערך הקודם שלהם כשהשרת יעלה."
   ],
   "correct": 2,
   "why": "updateMany היא הרבה עדכונים של מסמך בודד. כל אחד מהם אטומי, אבל הסדרה כולה אינה יחידה אחת. כך נוצרים בדיוק העדכונים החלקיים שהמרצה מזהיר מהם.",
   "wrong": "א׳ ו-ד׳ — אין ביטול אוטומטי של מה שכבר נכתב. ב׳ — המסד אינו זוכר פקודה שנקטעה ואינו משלים אותה.",
   "rule": "updateMany אינה טרנזקציה. עדכון חלקי = נתונים סותרים, כמו בשאלת השם המשוכפל.",
   "hint": {
    "anchors": [
     {
      "n": 4,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-B16": {
   "id": "N-B16",
   "fam": "T4",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "רוצים למנוע שסטודנט יירשם פעמיים לאותו מחזור, גם כששתי בקשות מגיעות באותו רגע. מה הפתרון המתאים?",
   "options": [
    "לבדוק באפליקציה, לפני כל הרשמה, אם כבר קיימת הרשמה של הסטודנט למחזור.",
    "אינדקס ייחודי על הצירוף studentId + offeringId, שהמסד עצמו אוכף.",
    "אינדקס רגיל על מזהה הסטודנט בלבד, כדי שהחיפוש אחר הרשמה קודמת יהיה מהיר.",
    "לשמור את ההרשמות כמערך בתוך מסמך הסטודנט, כי מערך אינו מאפשר כפילויות."
   ],
   "correct": 1,
   "why": "בדיקה באפליקציה נכשלת במקביל, כי שתי הבקשות בודקות לפני ששתיהן כותבות. אינדקס ייחודי נאכף על ידי המסד ברגע הכתיבה, ולכן השנייה נדחית.",
   "wrong": "א׳ — מצב מרוץ: שתיהן יראו \"אין הרשמה\". ג׳ — אינדקס רגיל אינו מונע כפילות, ועל סטודנט לבד הוא היה מונע גם הרשמה למחזור אחר. ד׳ — מערך מאפשר כפילויות.",
   "rule": "כפילות שאסור שתקרה — אינדקס ייחודי. אבל הוא אינו מונע חריגה מקיבולת; לזה צריך עדכון מותנה.",
   "hint": {
    "anchors": [
     {
      "n": 4,
      "page": 9
     }
    ],
    "rules": 39
   }
  },
  "N-B17": {
   "id": "N-B17",
   "fam": "T7",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "במרפאה, רופא מטפל בהרבה מטופלים ומטופל מגיע להרבה רופאים. לכל ביקור נשמרים תאריך ואבחנה. איפה נשמרים התאריך והאבחנה ב-SQL?",
   "options": [
    "בטבלת הרופאים, כי הרופא הוא זה שקובע את האבחנה בכל ביקור.",
    "בטבלת המטופלים, כי האבחנה והתאריך שייכים בסופו של דבר למטופל.",
    "בשתי הטבלאות במקביל, כדי שיהיה אפשר לשלוף אותם מכל אחד מהצדדים.",
    "בטבלת קשר Visits עם מפתחות זרים לשני הצדדים: אלה תכונות של הביקור."
   ],
   "correct": 3,
   "why": "התאריך והאבחנה אינם של הרופא ואינם של המטופל; הם של מפגש מסוים ביניהם. לכן הם יושבים בטבלת הקשר, כמו הכמות והמחיר ב-ShipmentItems.",
   "wrong": "א׳ וב׳ — לרופא יש הרבה ביקורים ולמטופל הרבה ביקורים; עמודה אחת לא יכולה להחזיק את כולם. ג׳ — שכפול בשני מקומות יוצר כפילות וסתירות.",
   "rule": "תכונה שתלויה בשני הצדדים יחד שייכת לטבלת הקשר.",
   "hint": {
    "anchors": [
     {
      "n": 7,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B18": {
   "id": "N-B18",
   "fam": "T7",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "במודל של המכללה, איפה נשמר הציון של סטודנט בקורס?",
   "options": [
    "בטבלת ההרשמות: ציון שייך לסטודנט מסוים במחזור מסוים.",
    "בטבלת הסטודנטים, בעמודה נפרדת לכל קורס שהסטודנט לומד בו.",
    "בטבלת הקורסים, כרשימה של כל הציונים שניתנו בקורס עד היום.",
    "בטבלת המרצים, כי המרצה הוא זה שנותן את הציון לכל סטודנט."
   ],
   "correct": 0,
   "why": "לכל סטודנט יש ציון שונה בכל מחזור, ולכל מחזור יש ציונים של הרבה סטודנטים. זו תכונה של הקשר, ולכן מקומה בטבלת הקשר Enrollments.",
   "wrong": "ב׳ — עמודה לכל קורס היא מבנה שגדל לרוחב ואינו מנורמל. ג׳ — רשימה בתוך עמודה שוברת את הצורה הנורמלית הראשונה. ד׳ — המרצה אינו קובע את המבנה; הציון שייך להרשמה.",
   "rule": "שואלים: \"הערך הזה שייך למי?\". אם התשובה היא \"לזוג\" — טבלת קשר.",
   "hint": {
    "anchors": [
     {
      "n": 7,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B19": {
   "id": "N-B19",
   "fam": "T7",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בטבלת Books יש עמודה authors, שבה שמות כל הכותבים של הספר מופרדים בפסיקים. מה הבעיה העיקרית?",
   "options": [
    "אין בעיה, כי כך חוסכים טבלה ואת כל הצירופים שהיו נדרשים בשליפה.",
    "הבעיה היא רק באורך המקסימלי של העמודה, ומספיק להגדיל אותו.",
    "אי אפשר לצרף, לסנן או לאנדקס כותב בודד. צריך טבלת קשר BookAuthors.",
    "הבעיה היא שאם יעבירו את הנתונים למונגו, הוא לא יוכל לקרוא את העמודה."
   ],
   "correct": 2,
   "why": "זה קשר רבים-לרבים: לספר כמה כותבים, ולכותב כמה ספרים. רשימה בתוך עמודה שוברת את הצורה הנורמלית הראשונה, ואין עליה JOIN, אילוץ או אינדקס.",
   "wrong": "א׳ — החיסכון בטבלה עולה ביכולת לשאול שאלות על הנתונים. ב׳ — האורך אינו הבעיה. ד׳ — אין קשר למונגו.",
   "rule": "רשימה בתוך עמודה = סימן לקשר רבים-לרבים שחסרה לו טבלת קשר.",
   "hint": {
    "anchors": [
     {
      "n": 7,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B20": {
   "id": "N-B20",
   "fam": "T7",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "רוצים לייצג במונגו את ההרשמות של סטודנטים לקורסים, כולל ציון. לכל קורס יש מאות סטודנטים, ויש דוחות רבים לפי קורס וגם תיק אישי לכל סטודנט. מה ההחלטה הסבירה?",
   "options": [
    "להטמיע תמיד את ההרשמות בתוך מסמך הסטודנט, כי זו הדרך המקובלת במונגו.",
    "אוסף הרשמות נפרד, שמשרת גם דוחות לפי קורס וגם תיק אישי של סטודנט.",
    "להטמיע את כל הסטודנטים בתוך מסמך הקורס, כי רוב הדוחות הם לפי קורס.",
    "מונגו אינו יכול לייצג קשר רבים-לרבים, ולכן חייבים לעבור ל-SQL."
   ],
   "correct": 1,
   "why": "שתי דרכי גישה שונות (לפי סטודנט ולפי קורס) והיקף של מאות לכל קורס. אוסף נפרד משרת את שתיהן עם אינדקסים, בדיוק כמו טבלת קשר.",
   "wrong": "א׳ — \"תמיד\" הוא דגל אדום; דוחות לפי קורס יחייבו לפרק את כל מסמכי הסטודנטים. ג׳ — מאות סטודנטים לקורס יוצרים מסמך שגדל, ותיק אישי ידרוש לחפש בכל הקורסים. ד׳ — מונגו מייצג רבים-לרבים בהפניה.",
   "rule": "כמו שאלה 7 במבחן: במונגו בוחרים בין הטמעה לאוסף נפרד לפי ההיקף ודפוסי הגישה.",
   "hint": {
    "anchors": [
     {
      "n": 7,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B21": {
   "id": "N-B21",
   "fam": "T7",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "מה מונע ב-SQL הרשמה כפולה של אותו סטודנט לאותו מחזור בטבלת Enrollments?",
   "options": [
    "מפתח זר מטבלת Enrollments לטבלת Students, שמוודא שהסטודנט קיים.",
    "אינדקס על עמודת הציון, כדי שהמסד יזהה מהר הרשמה שכבר קיבלה ציון.",
    "אילוץ ייחודיות, או מפתח ראשי, על הצירוף studentId + offeringId.",
    "שום דבר, כי SQL אינו מסוגל למנוע שורות כפולות באותה טבלה."
   ],
   "correct": 2,
   "why": "מפתח זר מוודא שהסטודנט קיים, אבל לא שהוא רשום פעם אחת. אילוץ ייחודיות על הזוג דוחה שורה שנייה עם אותו סטודנט ואותו מחזור.",
   "wrong": "א׳ — מפתח זר בודק קיום, לא ייחודיות. ב׳ — אינדקס על ציון אינו קשור לכפילות הרשמה. ד׳ — אילוצי ייחודיות הם חלק בסיסי מ-SQL.",
   "rule": "קיום = מפתח זר. \"פעם אחת בלבד\" = ייחודיות על הצירוף.",
   "hint": {
    "anchors": [
     {
      "n": 7,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B22": {
   "id": "N-B22",
   "fam": "T8",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "השאילתה הנפוצה ביותר: כל המשלוחים של לקוח מסוים, ממוינים מהחדש לישן. איזה אינדקס מתאים לה?",
   "options": [
    "אינדקס מורכב: customerId ואחריו createdAt יורד — סינון ומיון יחד.",
    "שני אינדקסים נפרדים, על customerId ועל createdAt, ששקולים לאינדקס מורכב.",
    "אינדקס על createdAt בלבד, כי המיון הוא החלק הכבד ביותר בשאילתה.",
    "אינדקס על כל שדות המסמך, כדי לכסות גם כל שאילתה שתתווסף בעתיד."
   ],
   "correct": 0,
   "why": "אינדקס מורכב שמתחיל בשדה השוויון וממשיך בשדה המיון נותן גם סינון וגם סדר. סדר השדות קובע: שוויון קודם, מיון אחריו.",
   "wrong": "ב׳ — שני אינדקסים נפרדים אינם שקולים לאינדקס מורכב. ג׳ — בלי customerId בתחילת האינדקס צריך לעבור על משלוחים של כולם. ד׳ — אינדקס על כל שדה מכביד על כל כתיבה.",
   "rule": "אינדקס מורכב לפי דפוס השאילתה: שדות שוויון, אחריהם שדה המיון או הטווח.",
   "hint": {
    "anchors": [
     {
      "n": 8,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B23": {
   "id": "N-B23",
   "fam": "T8",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "יש אינדקס מורכב על ‎{ customerId: 1, createdAt: -1 }‎. איזו שאילתה לא תוכל להשתמש בו ביעילות?",
   "options": [
    "כל המשלוחים של לקוח C5.",
    "כל המשלוחים של לקוח C5 מספטמבר.",
    "כל המשלוחים של לקוח C5, ממוינים לפי זמן.",
    "כל המשלוחים מספטמבר, של כל הלקוחות."
   ],
   "correct": 3,
   "why": "אינדקס מורכב עובד משמאל לימין. שאילתה שמתחילה בשדה השני (createdAt) בלי הראשון (customerId) אינה יכולה לנצל את הסדר שלו.",
   "wrong": "א׳ — משתמשת בשדה הראשון. ב׳ — שדה ראשון בשוויון, והשני כטווח. ג׳ — שדה ראשון בשוויון, והשני כמיון.",
   "rule": "אינדקס על ‎(A, B)‎ משרת שאילתות על A, ועל A ו-B. לא על B לבד.",
   "hint": {
    "anchors": [
     {
      "n": 8,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B24": {
   "id": "N-B24",
   "fam": "T8",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "באוסף לוגים נכתבים אלפי מסמכים בשנייה, ומריצים עליו שאילתות פעם ביום. הוגדרו עליו שמונה אינדקסים. מה נכון?",
   "options": [
    "אינדקסים משפרים גם קריאה וגם כתיבה, ולכן כדאי להוסיף עוד כמה.",
    "כל מסמך חדש מעדכן את כל שמונת האינדקסים; משאירים רק את הנחוצים.",
    "מספר האינדקסים אינו משפיע, כי האינדקסים מתעדכנים רק פעם בלילה.",
    "אינדקסים משפיעים רק על עדכון של מסמך קיים, ולא על הוספה של חדש."
   ],
   "correct": 1,
   "why": "במערכת שבה כמעט הכול כתיבה, כל אינדקס הוא עלות על כל מסמך חדש, והתועלת שלו קטנה כי קוראים מעט.",
   "wrong": "א׳ — אינדקס מאט כתיבה. ג׳ — אינדקס מתעדכן בכל כתיבה, לא בלילה. ד׳ — הוספה מעדכנת את כל האינדקסים.",
   "rule": "כמו שאלה 8 במבחן: אינדקס שווה את עלותו רק כששאילתה אמיתית משתמשת בו.",
   "hint": {
    "anchors": [
     {
      "n": 8,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B25": {
   "id": "N-B25",
   "fam": "T8",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "מוסיפים אינדקס על השדה active, שיש לו רק שני ערכים, ו-95% מהמסמכים הם active = true. מה צפוי בשאילתה ‎{ active: true }‎?",
   "options": [
    "שיפור דרמטי בזמן הריצה, כי כל אינדקס מאיץ כל שאילתה שמסננת לפיו.",
    "השאילתה תיכשל, כי במונגו אסור להגדיר אינדקס על שדה בוליאני.",
    "שיפור קטן, אם בכלל: התנאי מחזיר כמעט את כל האוסף.",
    "האינדקס יגרום לשאילתה להחזיר רק את 5% המסמכים שאינם פעילים."
   ],
   "correct": 2,
   "why": "אינדקס מועיל כשהוא מצמצם את מספר המסמכים שצריך לקרוא. כשהתנאי מחזיר כמעט הכול, אין מה לצמצם.",
   "wrong": "א׳ — אינדקס אינו מאיץ כל שאילתה; הכול תלוי בכמה הוא מסנן. ב׳ — מותר אינדקס על כל שדה. ד׳ — אינדקס אינו משנה את התוצאה, רק את הדרך אליה.",
   "rule": "אינדקס על שדה עם מעט ערכים ופיזור לא אחיד — כמעט חסר תועלת לערך הנפוץ.",
   "hint": {
    "anchors": [
     {
      "n": 8,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B26": {
   "id": "N-B26",
   "fam": "T8",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "הוגדר אינדקס ייחודי על email באוסף המשתמשים. מה נכון?",
   "options": [
    "הוא מונע שני משתמשים עם אותו email, וגם מאיץ חיפוש לפי email.",
    "הוא רק מאיץ חיפוש לפי email, ואינו מונע הכנסה של ערך כפול.",
    "הוא רק מונע כפילויות, ואינו משמש את המסד בזמן חיפוש לפי email.",
    "הוא מסנכרן את ה-email בכל המסמכים האחרים שבהם הכתובת מופיעה."
   ],
   "correct": 0,
   "why": "אינדקס ייחודי הוא אינדקס לכל דבר, ולכן הוא משמש גם לחיפוש. בנוסף, המסד דוחה כתיבה שתיצור ערך כפול.",
   "wrong": "ב׳ — ייחודיות היא בדיוק מה שהופך אותו לייחודי. ג׳ — הוא משמש גם לחיפוש. ד׳ — אינדקס אינו מעדכן ערכים במסמכים אחרים.",
   "rule": "אינדקס ייחודי = חיפוש מהיר + אין שני ערכים זהים. הוא לא מסנכרן עותקים.",
   "hint": {
    "anchors": [
     {
      "n": 8,
      "page": 11
     }
    ],
    "rules": 39
   }
  },
  "N-B27": {
   "id": "N-B27",
   "fam": "T9",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "אתר מכירות מחזיק תשלומים והזמנות, וגם קטלוג מוצרים שבו לכל קטגוריה מאפיינים אחרים (מידות לבגדים, נפח למחשבים). מה ההחלטה הסבירה?",
   "options": [
    "הכול ב-NoSQL, כי הוא תמיד גמיש יותר ומהיר יותר מכל מסד רלציוני.",
    "הכול ב-SQL, ולכל מאפיין חדש מוסיפים עמודה חדשה לכל המוצרים.",
    "תשלומים ב-SQL וקטלוג במסד מסמכים — או מסד אחד, אם מנמקים.",
    "לשכפל את כל הנתונים לשני המסדים, כדי שכל שאילתה תרוץ בכל אחד מהם."
   ],
   "correct": 2,
   "why": "תשלומים דורשים עקביות וטרנזקציות. קטלוג עם מאפיינים שונים לכל קטגוריה מתאים לסכמה גמישה. כל רכיב מקבל את מה שמתאים לו, והמחיר הוא תחזוקה של שני מסדים.",
   "wrong": "א׳ וב׳ — \"הכול\" ו\"תמיד\" מתעלמים מהדרישות השונות של כל רכיב; עמודה לכל מאפיין יוצרת טבלה ענקית ומלאת NULL. ד׳ — שכפול מלא מכפיל את בעיות הסנכרון בלי תועלת.",
   "rule": "לכל רכיב — המסד שמתאים לדפוס הגישה שלו, ולנמק גם את המחיר.",
   "hint": {
    "anchors": [
     {
      "n": 9,
      "page": 12
     }
    ],
    "rules": 39
   }
  },
  "N-B28": {
   "id": "N-B28",
   "fam": "T9",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "מה המחיר העיקרי של ארכיטקטורה משולבת (SQL וגם NoSQL)?",
   "options": [
    "אין מחיר: כל רכיב מקבל את המסד הטוב ביותר עבורו, וזה הכול.",
    "שתי מערכות לתחזק, אין JOIN ביניהן, וצריך לסנכרן נתונים משותפים.",
    "המחיר היחיד הוא תשלום על רישיון נוסף עבור המסד השני.",
    "אי אפשר להשתמש באינדקסים באף אחד מהמסדים כשהם עובדים יחד."
   ],
   "correct": 1,
   "why": "שילוב נותן התאמה לכל רכיב, אבל מוסיף מורכבות: שני מסדים, שני צוותי ידע, אינטגרציה ביניהם, ונתונים שצריך לסנכרן.",
   "wrong": "א׳ — לכל החלטה ארכיטקטונית יש מחיר; תשובה בלי מחיר היא תשובה חלקית. ג׳ — הרישיון הוא הבעיה הקטנה. ד׳ — אין קשר לאינדקסים.",
   "rule": "בכל תשובה על ארכיטקטורה: גם היתרון וגם המחיר.",
   "hint": {
    "anchors": [
     {
      "n": 9,
      "page": 12
     }
    ],
    "rules": 39
   }
  },
  "N-B29": {
   "id": "N-B29",
   "fam": "T9",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "סטארט-אפ קטן, צוות של שלושה מפתחים, עומס צנוע, והנתונים רלציוניים ברובם (לקוחות, הזמנות, חשבוניות). מה ההחלטה הסבירה?",
   "options": [
    "מסד SQL אחד: מתאים לנתונים, ופשוט לצוות קטן. מוסיפים רכיב כשיש צורך.",
    "חובה ארכיטקטורה משולבת, כי זו הגישה המודרנית שמתאימה לכל מערכת.",
    "חובה NoSQL, כי סטארט-אפ צריך גמישות מלאה כבר מהיום הראשון.",
    "כמה שיותר מסדים שונים, כדי להיות מוכנים מראש לכל גדילה עתידית."
   ],
   "correct": 0,
   "why": "ההחלטה נגזרת מהדרישות. כשהנתונים רלציוניים, העומס צנוע והצוות קטן, מערכת אחת פשוטה היא היתרון הגדול.",
   "wrong": "ב׳, ג׳ ו-ד׳ — \"חובה\" ו\"כמה שיותר\" הם דגלים אדומים; הם מתעלמים מהעלות של כל מערכת נוספת.",
   "rule": "כמו בכלל של שאלה 9: גם להישאר במסד אחד היא תשובה סבירה, אם מנמקים.",
   "hint": {
    "anchors": [
     {
      "n": 9,
      "page": 12
     }
    ],
    "rules": 39
   }
  },
  "N-B30": {
   "id": "N-B30",
   "fam": "T9",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "אפליקציית צ׳אט: חשבונות משתמשים ותשלומים על מנוי, ובנוסף מיליוני הודעות ביום שנשלפות לפי שיחה. מה ההחלטה הסבירה?",
   "options": [
    "הכול ב-SQL, כי הודעות הן טקסט, וטקסט מתאים במיוחד לטבלאות.",
    "הכול במונגו, כולל התשלומים, כי מונגו תומך בטרנזקציות ולכן אין הבדל.",
    "למחוק כל הודעה אחרי יום, כדי שיהיה אפשר להסתפק במסד אחד בלבד.",
    "חשבונות ותשלומים במסד טרנזקציוני; הודעות במסד שמותאם לכתיבה בנפח גדול."
   ],
   "correct": 3,
   "why": "שני רכיבים עם דרישות הפוכות: תשלומים צריכים עקביות, והודעות צריכות קליטה מהירה בנפח עצום. התאמה לכל רכיב היא ההחלטה הסבירה.",
   "wrong": "א׳ — הבעיה אינה סוג הנתון אלא הקצב והנפח. ב׳ — תמיכה בטרנזקציות אינה אומרת שמסד אחד מתאים לשני הדפוסים. ג׳ — מחיקת נתונים כדי להתאים לטכנולוגיה הפוכה לסדר הנכון.",
   "rule": "מזהים את הרכיבים, ולכל אחד שואלים: עקביות או קצב? שליפה לפי מה?",
   "hint": {
    "anchors": [
     {
      "n": 9,
      "page": 12
     }
    ],
    "rules": 39
   }
  },
  "N-B31": {
   "id": "N-B31",
   "fam": "T9",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בבית חולים, נתוני החיוב נשמרים ב-SQL ותוצאות הבדיקות במונגו. רופא רוצה מסך אחד שמציג חיובים ותוצאות של מטופל. מה נכון?",
   "options": [
    "אפשר לכתוב JOIN אחד בין טבלת SQL לאוסף במונגו, לפי מזהה המטופל.",
    "אי אפשר להציג את החיובים ואת התוצאות יחד בשום דרך שהיא.",
    "אין JOIN בין המסדים: האפליקציה שולפת מכל אחד ומחברת לפי המזהה.",
    "צריך להעביר את כל הנתונים למונגו, כי רק שם אפשר לחבר בין נתונים."
   ],
   "correct": 2,
   "why": "כל מסד יודע לחבר רק את הנתונים שבתוכו. מסך שמשלב את שניהם נבנה באפליקציה, לפי מזהה משותף.",
   "wrong": "א׳ — אין JOIN בין שתי מערכות שונות. ב׳ — אפשר, ברמת האפליקציה. ד׳ — אין צורך לוותר על השילוב; צריך רק לחבר באפליקציה.",
   "rule": "בארכיטקטורה משולבת המזהה המשותף הוא הדבק, והאפליקציה היא שמחברת.",
   "hint": {
    "anchors": [
     {
      "n": 9,
      "page": 12
     }
    ],
    "rules": 39
   }
  },
  "N-B32": {
   "id": "N-B32",
   "fam": "T10",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "שם המחבר מוטמע בכל מסמך ספר, כדי להציג רשימות ספרים בלי $lookup. שמות של מחברים כמעט אף פעם לא משתנים, והרשימות נקראות מיליוני פעמים ביום. מה נכון?",
   "options": [
    "פשרה סבירה: חוסכים צירוף בכל קריאה, ובשינוי שם נדיר מעדכנים את כולם.",
    "זו טעות תמיד, כי כל שכפול של נתון הוא הפרה של כללי הנרמול.",
    "השם יתעדכן בכל הספרים מעצמו, כי מונגו מזהה שמדובר באותו מחבר.",
    "אין צורך לעדכן אף פעם, כי שם של מחבר הוא צילום מצב של רגע הכתיבה."
   ],
   "correct": 0,
   "why": "שכפול משתלם כשהנתון כמעט לא משתנה ונקרא הרבה. המחיר, עדכון של כל העותקים, משולם רק לעיתים רחוקות.",
   "wrong": "ב׳ — \"תמיד\" מתעלם מהאיזון בין קריאה לעדכון. ג׳ — עותק אינו מתעדכן מעצמו. ד׳ — שם לתצוגה אמור להיות עדכני; זה לא מחיר ששולם.",
   "rule": "שכפול טוב = נקרא הרבה, משתנה מעט. שכפול רע = משתנה הרבה.",
   "hint": {
    "anchors": [
     {
      "n": 10,
      "page": 12
     }
    ],
    "rules": 39
   }
  },
  "N-B33": {
   "id": "N-B33",
   "fam": "T10",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "המחיר הנוכחי של מוצר, שמשתנה כמה פעמים ביום, מוטמע במיליון מסמכי \"רשימת משאלות\". מה הבעיה?",
   "options": [
    "אין בעיה, כי מחיר הוא צילום מצב, ולכן אין צורך לעדכן אותו בכלל.",
    "כל שינוי מחיר מחייב לעדכן מיליון מסמכים; עדיף להפנות למוצר.",
    "הבעיה היחידה היא נפח האחסון שהמחיר תופס במיליון המסמכים.",
    "מונגו יחסום את העדכון, כי אסור לעדכן יותר מאלף מסמכים בפקודה אחת."
   ],
   "correct": 1,
   "why": "נתון שמשתנה הרבה ומשוכפל בהרבה מקומות הוא השילוב הגרוע ביותר: עלות כתיבה גבוהה וסיכון לנתונים סותרים. הפניה שומרת מקור אחד.",
   "wrong": "א׳ — ברשימת משאלות רוצים את המחיר של היום; זה לא מחיר ששולם. ג׳ — הנפח הוא הבעיה הקטנה. ד׳ — אין מגבלה כזו; הבעיה היא העלות והעקביות.",
   "rule": "משתנה הרבה + מופיע בהרבה מקומות = הפניה, לא הטמעה.",
   "hint": {
    "anchors": [
     {
      "n": 10,
      "page": 12
     }
    ],
    "rules": 39
   }
  },
  "N-B34": {
   "id": "N-B34",
   "fam": "T10",
   "src": "new",
   "kind": "concept",
   "difficulty": 2,
   "q": "מחלקה שינתה את שמה. ב-SQL השם שמור רק בטבלת Departments. במונגו השם מוטמע בכל מסמך סטודנט. מה ההבדל בעדכון?",
   "options": [
    "אין הבדל: בשני המסדים מעדכנים שורה או מסמך אחד בלבד.",
    "ב-SQL צריך לעדכן את כל הסטודנטים, ובמונגו מספיק לעדכן מסמך אחד.",
    "במונגו אי אפשר לעדכן שם שמוטמע בכמה מסמכים, ולכן צריך למחוק ולהכניס.",
    "ב-SQL שורה אחת; במונגו כל מסמכי הסטודנטים, ועדכון חלקי ישאיר סתירות."
   ],
   "correct": 3,
   "why": "במודל מנורמל לכל נתון יש מקום אחד. במודל עם הטמעה הנתון מופיע בכל מסמך, ולכן העדכון רוחבי. המרצה אמר זאת במפורש: \"ב-MongoDB צריך לעבור על כל ה-collections ולעדכן אותם\".",
   "wrong": "א׳ — במונגו השם מופיע בהרבה מסמכים. ב׳ — זה ההיפך. ג׳ — אפשר, עם updateMany; הבעיה היא העלות והסיכון לעדכון חלקי.",
   "rule": "SQL: עדכון במקום אחד. הטמעה: עדכון בכל המקומות.",
   "hint": {
    "anchors": [
     {
      "n": 10,
      "page": 12
     }
    ],
    "rules": 39
   }
  },
  "N-B35": {
   "id": "N-B35",
   "fam": "T10",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "בכל מסמך פוסט שמור שדה likesCount, ובנוסף יש אוסף likes שבו כל לייק הוא מסמך. מה נכון לגבי המונה?",
   "options": [
    "המונה מתעדכן מעצמו בכל פעם שמתווסף מסמך לאוסף likes.",
    "המונה מיותר תמיד, וצריך לספור את אוסף likes בכל הצגה של פוסט.",
    "המונה הוא עותק: כל לייק מוסיף מסמך וגם ‎$inc‎. אם אחד נכשל — הוא סוטה.",
    "אי אפשר להגדיל מונה במונגו בפקודה אחת, וצריך לקרוא ולכתוב מחדש."
   ],
   "correct": 2,
   "why": "המונה חוסך ספירה בכל הצגה, וזה היתרון. המחיר: שני מקומות שצריכים להתעדכן יחד. אם אחד מהם נכשל, המונה כבר לא תואם את המציאות.",
   "wrong": "א׳ — אין עדכון אוטומטי בין אוספים. ב׳ — \"תמיד\" מתעלם מהיתרון של מונה בפוסטים עם מיליוני לייקים. ד׳ — ‎$inc‎ עושה בדיוק את זה.",
   "rule": "כל נתון מחושב שנשמר (מונה, סכום) הוא עותק, וצריך לסנכרן אותו כמו כל עותק אחר.",
   "hint": {
    "anchors": [
     {
      "n": 10,
      "page": 12
     }
    ],
    "rules": 39
   }
  },
  "N-B36": {
   "id": "N-B36",
   "fam": "T10",
   "src": "new",
   "kind": "scenario",
   "difficulty": 2,
   "q": "שם הקטגוריה מוטמע ב-50,000 מסמכי מוצר, ומשנים אותו ב-updateMany. מה צריך להבין לפני שמריצים?",
   "options": [
    "הפקודה אטומית כולה, ולכן אין שום סיכון גם אם היא נקטעת באמצע.",
    "הפקודה תיכשל, כי אסור לעדכן יותר מ-1,000 מסמכים בפקודה אחת.",
    "אחרי העדכון השם הישן יישמר אוטומטית כהיסטוריה בכל מסמך מוצר.",
    "כל מסמך אטומי, הפקודה כולה לא: אם היא נקטעת, חלק יציגו את השם הישן."
   ],
   "correct": 3,
   "why": "זה המחיר של שכפול נתון לתצוגה: שינוי אחד הופך לעשרות אלפי כתיבות, וכל הפסקה באמצע משאירה נתונים סותרים.",
   "wrong": "א׳ — האטומיות היא ברמת המסמך הבודד. ב׳ — אין מגבלה כזו. ג׳ — מונגו אינו שומר היסטוריה מעצמו.",
   "rule": "לפני עדכון רוחבי שואלים: מה קורה אם הוא נעצר באמצע?",
   "hint": {
    "anchors": [
     {
      "n": 10,
      "page": 12
     }
    ],
    "rules": 39
   }
  }
 },
 "exams": [
  {
   "id": "M1",
   "title": "מבחן מעורבב א׳",
   "clean": false,
   "a": [
    "A-26",
    "A-15",
    "N-A02",
    "A-59",
    "N-A06",
    "N-A12",
    "A-07",
    "A-75",
    "A-31",
    "A-50"
   ],
   "b": [
    "B-02",
    "P03",
    "B-13",
    "P09",
    "X04",
    "P12",
    "X03",
    "E17",
    "N08",
    "E16"
   ]
  },
  {
   "id": "M2",
   "title": "מבחן מעורבב ב׳",
   "clean": true,
   "a": [
    "N-B01",
    "N-B06",
    "N-A01",
    "N-B12",
    "N-A07",
    "N-A13",
    "N-B17",
    "N-B22",
    "N-B27",
    "N-B32"
   ],
   "b": [
    "N14",
    "N15",
    "P07",
    "B-30",
    "P04",
    "N10",
    "B-25",
    "N17",
    "B-45",
    "B-35"
   ]
  },
  {
   "id": "M3",
   "title": "מבחן מעורבב ג׳",
   "clean": true,
   "a": [
    "N-B02",
    "N-B07",
    "N-A03",
    "N-B13",
    "N-A08",
    "N-A14",
    "N-B18",
    "N-B23",
    "N-B28",
    "N-B33"
   ],
   "b": [
    "P01",
    "B-17",
    "B-11",
    "P15",
    "P14",
    "N11",
    "B-07",
    "N05",
    "B-44",
    "B-21"
   ]
  },
  {
   "id": "M4",
   "title": "מבחן מעורבב ד׳",
   "clean": true,
   "a": [
    "N-B03",
    "N-B08",
    "N-A04",
    "N-B14",
    "N-A09",
    "N-A15",
    "N-B19",
    "N-B24",
    "N-B29",
    "N-B34"
   ],
   "b": [
    "B-29",
    "P11",
    "B-12",
    "B-31",
    "P10",
    "N03",
    "N16",
    "N06",
    "B-23",
    "B-20"
   ]
  },
  {
   "id": "M5",
   "title": "מבחן מעורבב ה׳",
   "clean": true,
   "a": [
    "N-B04",
    "N-B09",
    "N-A05",
    "N-B15",
    "N-A10",
    "N-A16",
    "N-B20",
    "N-B25",
    "N-B30",
    "N-B35"
   ],
   "b": [
    "B-27",
    "N01",
    "B-10",
    "B-33",
    "P05",
    "N04",
    "P13",
    "N07",
    "N12",
    "B-05"
   ]
  },
  {
   "id": "M6",
   "title": "מבחן מעורבב ו׳",
   "clean": true,
   "a": [
    "N-B05",
    "N-B10",
    "N-B11",
    "N-B16",
    "N-A11",
    "N-A17",
    "N-B21",
    "N-B26",
    "N-B31",
    "N-B36"
   ],
   "b": [
    "B-01",
    "B-18",
    "N02",
    "P08",
    "B-15",
    "N09",
    "P06",
    "B-14",
    "N13",
    "B-08"
   ]
  }
 ]
};
