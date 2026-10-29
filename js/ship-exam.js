/* ============================================================
   SHIPX — המבחן לדוגמה האחרון של 3964: סכמת המשלוחים
   נוצר אוטומטית (scratchpad/portalship/gen.js) — לא לערוך ביד.
   mcq      11 שאלות אמריקאיות בניסוח שלנו, עם המפתח הרשמי
   open     9 שאלות פתוחות: ניסוח שלנו, הפתרון הרשמי (sql/mongo, לפיו בודקים)
            ופתרון חלופי שלנו (altSql/altMongo) שמחזיר אותה תוצאה
   practice 15 שאלות תרגול נוספות על אותה סכמה
   ============================================================ */
window.SHIPX = {
 "mcq": [
  {
   "n": 1,
   "topic": "מערך אירועים שגדל — הטמעה מול אוסף נפרד",
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
   "rule": "הטמעה טובה לנתונים קטנים, חסומים בגודל, שנקראים יחד עם המסמך. מערך גדל ללא גבול — אוסף נפרד."
  },
  {
   "n": 2,
   "topic": "מחיר היסטורי בשורת הפריט",
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
   "rule": "לפני שמחליטים אם שדה משוכפל הוא טעות — שואלים אם הוא צילום מצב היסטורי או עותק של ערך עדכני. היסטורי נשמר; עדכני נשלף ממקור מרכזי."
  },
  {
   "n": 3,
   "topic": "null מול שדה חסר ב-MongoDB",
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
   "rule": "‎{field: null}‎ = null או חסר. ‎{field: {$exists: false}}‎ = רק חסר. ‎{field: {$ne: null}}‎ = קיים ואינו ריק."
  },
  {
   "n": 4,
   "topic": "עדכון של מסמך יחיד הוא אטומי",
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
   "rule": "אטומיות של מסמך יחיד אינה טרנזקציה. שינוי שנוגע בכמה מסמכים הוא מה שדורש טרנזקציה."
  },
  {
   "n": 5,
   "topic": "מפתח חלוקה לפי לקוח מול דוחות כלל-מערכתיים",
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
   "rule": "מפתח שמתאים לשאילתה הנפוצה אינו בהכרח מתאים לדוח רוחבי. אלה שני דפוסי גישה שונים."
  },
  {
   "n": 6,
   "topic": "שכפול אסינכרוני — עקביות בסופו של דבר",
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
   "rule": "התנהגות הקריאה נקבעת ב-read preference וב-read concern, ומהירות ההתכנסות נקבעת בקצב השכפול ובאישורי הכתיבה."
  },
  {
   "n": 7,
   "topic": "רבים-לרבים עם כמות ומחיר — טבלת קשר",
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
   "rule": "רבים-לרבים ב-SQL = טבלת גישור. תכונה של הקשר שייכת לטבלת הגישור, לא לאחד הצדדים."
  },
  {
   "n": 8,
   "topic": "עודף אינדקסים — מקום ועלות כתיבה",
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
   "rule": "אינדקס מחליף סריקה באיתור מהיר — בתמורה למקום ולעלות תחזוקה בכל שינוי רלוונטי."
  },
  {
   "n": 9,
   "topic": "ארכיטקטורה משולבת — לכל רכיב המסד שלו",
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
   "rule": "בוחרים לפי צורכי הרכיב. גם להישאר במסד אחד היא תשובה סבירה כשהפשטות והעומס מצדיקים זאת — העיקר לנמק."
  },
  {
   "n": 10,
   "topic": "נתון משוכפל שהשתנה — לעדכן בכל המקומות",
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
   "rule": "שימו לב לניסוח: \"תמיד עדכני\" דורש סנכרון או מקור מרכזי. \"כמו שהיה אז\" דורש בדיוק את ההיפך — צילום מצב שאסור לשנות. השוו לשאלה 2."
  },
  {
   "n": 11,
   "topic": "בחירת מפתח חלוקה — דפוסי שאילתות ופיזור",
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
   "rule": "שימו לב לשאלה 5 ולשאלה 11: אותו נושא, אבל ב-11 נוספו \"קצב גבוה\" ו\"לקוחות עם נפח עצום\" — ולכן התשובה הנכונה היא השקילה ולא הבחירה."
  }
 ],
 "open": [
  {
   "n": 12,
   "id": "S12",
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
   "altSql": "SELECT shipmentId, customerId, createdAt, shippingCost, status\nFROM Shipments\nWHERE deliveredAt IS NULL AND shippingCost > 30\nORDER BY createdAt DESC;",
   "altMongo": "db.shipments.find(\n  { deliveredAt: null, shippingCost: { $gt: 30 } },\n  { _id:0, shipmentId:1, customerId:1,\n    createdAt:1, shippingCost:1, status:1 }\n).sort({ createdAt: -1 })",
   "logic": "שתי טבלאות אין כאן — הכול בטבלת המשלוחים, ולכן אין צירוף ואין קיבוץ. \"טרם נמסר\" מוגדר לפי השדה deliveredAt ולא לפי הסטטוס.",
   "trap": "אל תוסיפו תנאי על status. השאלה הגדירה אי-מסירה לפי deliveredAt, ומשלוח יכול להיות לא נמסר גם כשהסטטוס שלו InTransit וגם כשהוא ריק. תנאי שלא התבקש פוסל שורות נכונות.",
   "compare": "ב-SQL ערך חסר נבדק ב-IS NULL ולעולם לא ב-‎= NULL. במונגו ‎{deliveredAt:null}‎ תופס גם מסמך שבו השדה חסר לגמרי וגם מסמך שבו הוא קיים עם null — זו התנהגות שאין לה מקבילה ב-SQL.",
   "edge": "עלות 30 בדיוק אינה נכללת (SH11). עלות 31 נכללת (SH10). משלוח שלא נמסר אבל עלותו ריקה אינו נכלל (SH03), כי NULL אינו גדול מ-30.",
   "variant": {
    "v": "\"שנמסרו\" ← IS NOT NULL · טווח תאריכים · מיון אחר או TOP",
    "card": "R-01 · R-04",
    "p": [
     "P01"
    ]
   }
  },
  {
   "n": 13,
   "id": "S13",
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
   "altSql": "SELECT c.courierId, c.courierName, c.vehicleType\nFROM Couriers c\nWHERE c.active = 1\n  AND NOT EXISTS (\n    SELECT 1 FROM Shipments s\n    WHERE s.courierId = c.courierId\n  );",
   "altMongo": "db.couriers.aggregate([\n  { $match: { active: true } },\n  { $lookup: { from:\"shipments\", localField:\"courierId\",\n               foreignField:\"courierId\", as:\"assigned\" } },\n  { $match: { \"assigned.0\": { $exists: false } } },\n  { $project: { _id:0, courierId:1, courierName:1, vehicleType:1 } }\n])",
   "logic": "מתחילים מטבלת השליחים, כי השליחים שאין להם משלוחים הם בדיוק מה שצריך להציג. מי שמתחיל מטבלת המשלוחים לא יראה אותם בכלל.",
   "trap": "אל תפתחו את המערך assigned ב-$unwind. מערך ריק הוא בדיוק מה שמחפשים, ו-$unwind רגיל היה מוחק את השליח מהצינור. \"assigned.0\" חסר פירושו שאין אפילו איבר ראשון.",
   "compare": "ב-SQL היעדר קשר נבדק ב-NOT EXISTS — ולא ב-NOT IN, שעלול להחזיר UNKNOWN אם תת-השאילתה מחזירה NULL. במונגו אין NOT EXISTS: מחברים ב-$lookup ואז בודקים שהמערך שחזר ריק.",
   "edge": "שליח פעיל עם משלוח אחד נפסל (K1). שליח לא פעיל בלי משלוחים נפסל גם הוא (K3) — שני התנאים חייבים להתקיים יחד. התוצאה: K2 ו-K4.",
   "variant": {
    "v": "\"שאין להם משלוח בספטמבר\" · \"מספר משלוחים לכל שליח, כולל 0\"",
    "card": "R-22 · R-19",
    "p": [
     "P04",
     "P05"
    ]
   }
  },
  {
   "n": 14,
   "id": "S14",
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
   "altSql": "SELECT c.customerId, c.customerName,\n       SUM(s.shippingCost) AS totalCost\nFROM Customers c\nJOIN Shipments s ON s.customerId = c.customerId\nWHERE s.shippingCost IS NOT NULL\nGROUP BY c.customerId, c.customerName\nHAVING SUM(s.shippingCost) > 200\nORDER BY totalCost DESC;",
   "altMongo": "db.shipments.aggregate([\n  { $match: { shippingCost: { $ne: null } } },\n  { $group: { _id:\"$customerId\",\n              totalCost: { $sum:\"$shippingCost\" } } },\n  { $match: { totalCost: { $gt: 200 } } },\n  { $lookup: { from:\"customers\", localField:\"_id\",\n               foreignField:\"customerId\", as:\"c\" } },\n  { $unwind: \"$c\" },\n  { $project: { _id:0, customerId:\"$_id\",\n                customerName:\"$c.customerName\", totalCost:1 } },\n  { $sort: { totalCost: -1 } }\n])",
   "logic": "במונגו מסכמים קודם ומחברים את שם הלקוח רק אחרי הקיבוץ. הסיבה: אחרי $group נשארים רק ‎_id‎ והשדות שחושבו, ולכן שם הלקוח צריך להגיע מחיבור נוסף.",
   "trap": "אל תחברו את ShipmentEvents או ShipmentItems. חיבור שלא נדרש משכפל כל שורת משלוח לפי מספר האירועים או הפריטים, והסכום מתנפח. אם כבר חיברתם — קבצו כל צד לרמת משלוח לפני החיבור.",
   "compare": "ב-SQL פונקציית SUM מתעלמת מ-NULL מעצמה, ולכן תנאי ה-WHERE כאן הוא הצהרה מפורשת ולא הכרח. במונגו ‎$sum‎ גם מתעלם מערך שאינו מספר, אבל כשצריך לספור את כל המשלוחים ולא רק לסכם — ההבדל קריטי (ראו שאלה 19).",
   "edge": "סכום 200 בדיוק אינו נכלל (C5). לקוח בלי אף עלות מספרית אינו נכלל בכלל. לקוח שיש לו עלות ריקה ועלויות תקינות נכלל לפי הסכום הידוע (C9: 400+250=650, ללא SH16).",
   "variant": {
    "v": "ממוצע במקום סכום · סף על מספר המשלוחים · שני תנאים יחד",
    "card": "R-12 · R-11 · R-14",
    "p": [
     "P07",
     "P02"
    ]
   }
  },
  {
   "n": 15,
   "id": "S15",
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
   "altSql": "SELECT i.itemId, i.itemName,\n       SUM(si.quantity) AS totalQuantity\nFROM Items i\nJOIN ShipmentItems si ON si.itemId = i.itemId\nWHERE i.category = 'Electronics'\n  AND si.quantity IS NOT NULL\nGROUP BY i.itemId, i.itemName\nHAVING SUM(si.quantity) > 100\nORDER BY totalQuantity DESC;",
   "altMongo": "db.shipmentItems.aggregate([\n  { $match: { quantity: { $ne: null } } },\n  { $group: { _id:\"$itemId\",\n              totalQuantity: { $sum:\"$quantity\" } } },\n  { $match: { totalQuantity: { $gt: 100 } } },\n  { $lookup: { from:\"items\", localField:\"_id\",\n               foreignField:\"itemId\", as:\"item\" } },\n  { $unwind: \"$item\" },\n  { $match: { \"item.category\": \"Electronics\" } },\n  { $project: { _id:0, itemId:\"$_id\",\n                itemName:\"$item.itemName\", totalQuantity:1 } },\n  { $sort: { totalQuantity: -1 } }\n])",
   "logic": "שורת פריט שומרת כמות ומחיר של העסקה. הכמות היא סכום של השדה quantity על כל השורות של אותו פריט — ולא מספר השורות.",
   "trap": "הטעות הנפוצה כאן היא COUNT(*) במקום SUM(quantity). פריט שמופיע בשתי שורות של 60 ו-50 נתן 110 יחידות, אבל COUNT היה נותן 2. סמנו במילות השאלה אם מבקשים \"כמה יחידות\" או \"בכמה משלוחים\".",
   "compare": "שתי השפות מגיעות לאותו סכום, אבל סדר השלבים הפוך: ב-SQL מחברים קודם ומקבצים אחרי, ובמונגו נוח לקבץ קודם לפי itemId ולחבר את הקטגוריה והשם רק אחר כך — פחות מסמכים עוברים ב-$lookup.",
   "edge": "סך 100 בדיוק אינו נכלל (I4). פריט מקטגוריה אחרת אינו נכלל גם אם הכמות גבוהה בהרבה (I5 עם 200 יחידות). פריט שמופיע בשתי שורות באותו משלוח נספר פעמיים לעניין הכמות — וזה נכון (I1).",
   "variant": {
    "v": "סכום כספי (כמות × מחיר) במקום יחידות · TOP על קבוצות",
    "card": "R-17 · R-06",
    "p": [
     "P08",
     "P09",
     "P15"
    ]
   }
  },
  {
   "n": 16,
   "id": "S16",
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
   "altSql": "SELECT w.warehouseId, w.warehouseName, w.city\nFROM Warehouses w\nWHERE NOT EXISTS (\n  SELECT 1 FROM Shipments s\n  WHERE s.warehouseId = w.warehouseId\n    AND s.createdAt >= '2026-09-01 00:00:00'\n    AND s.createdAt <  '2026-10-01 00:00:00'\n);",
   "altMongo": "db.warehouses.aggregate([\n  { $lookup: {\n      from: \"shipments\",\n      let: { wid: \"$warehouseId\" },\n      pipeline: [\n        { $match: {\n            $expr: { $eq: [\"$warehouseId\", \"$$wid\"] },\n            createdAt: {\n              $gte: ISODate(\"2026-09-01T00:00:00Z\"),\n              $lt:  ISODate(\"2026-10-01T00:00:00Z\")\n            }\n        } },\n        { $limit: 1 }\n      ],\n      as: \"september\"\n  } },\n  { $match: { \"september.0\": { $exists: false } } },\n  { $project: { _id:0, warehouseId:1, warehouseName:1, city:1 } }\n])",
   "logic": "התבנית: חברו רק את הרשומות שיכולות לפסול את הישות — כאן, משלוחי ספטמבר בלבד — ואז שמרו את מי שלא נמצאה לו אף רשומה כזאת. משלוח בחודש אחר אינו פוסל, ולכן הוא לא נכנס לחיבור מלכתחילה.",
   "trap": "במונגו זו הסיבה היחידה שצריך ‎$lookup‎ עם let ו-pipeline ולא ‎$lookup‎ רגיל: ‎$lookup‎ הפשוט מחבר לפי מפתח בלבד ואין לו מקום לתנאי החודש. ‎$$wid‎ הוא המשתנה שהוגדר ב-let, ו-‎$expr‎ הוא מה שמאפשר להשוות שדה למשתנה בתוך ‎$match‎.",
   "compare": "ב-SQL תנאי התקופה יושב בתוך תת-השאילתה של NOT EXISTS. אם היו מממשים ב-LEFT JOIN, התנאי היה חייב לשבת ב-ON ולא ב-WHERE — ב-WHERE הוא מפיל כל מחסן שאין לו התאמה, כי ה-createdAt שלו NULL.",
   "edge": "מחסן שיצא ממנו משלוח ב-1.10 בשעה 08:00 נכלל בתוצאה, כי הגבול העליון אינו כולל (W2). מחסן שיצא ממנו משלוח ב-30.9 בשעה 23:00 נפסל. מחסן בלי משלוחים בכלל נכלל (W3).",
   "variant": {
    "v": "בלי הגבלת תקופה · \"לפחות משלוח אחד בתקופה\"",
    "card": "R-21 · R-23",
    "p": [
     "P03",
     "P04",
     "P06"
    ]
   }
  },
  {
   "n": 17,
   "id": "S17",
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
   "altSql": "WITH ranked AS (\n  SELECT e.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY e.shipmentId\n      ORDER BY e.eventTime DESC, e.eventId ASC\n    ) AS rn\n  FROM ShipmentEvents e\n)\nSELECT s.shipmentId, r.eventId, r.eventType,\n       r.eventTime, r.location\nFROM Shipments s\nLEFT JOIN ranked r\n  ON r.shipmentId = s.shipmentId AND r.rn = 1;",
   "altMongo": "db.shipments.aggregate([\n  { $lookup: {\n      from: \"shipmentEvents\",\n      let: { sid: \"$shipmentId\" },\n      pipeline: [\n        { $match: { $expr: { $eq: [\"$shipmentId\", \"$$sid\"] } } },\n        { $sort: { eventTime: -1, eventId: 1 } },\n        { $limit: 1 }\n      ],\n      as: \"latest\"\n  } },\n  { $unwind: { path:\"$latest\", preserveNullAndEmptyArrays:true } },\n  { $project: {\n      _id: 0, shipmentId: 1,\n      eventId:   { $ifNull: [\"$latest.eventId\",   null] },\n      eventType: { $ifNull: [\"$latest.eventType\", null] },\n      eventTime: { $ifNull: [\"$latest.eventTime\", null] },\n      location:  { $ifNull: [\"$latest.location\",  null] }\n  } }\n])",
   "logic": "ROW_NUMBER ממספר מחדש בכל משלוח בנפרד (זה ה-PARTITION BY), ממיין מהאירוע החדש לישן, ונותן 1 לאירוע האחרון. ה-CTE בשם WITH אינו יוצר טבלה — הוא רק נותן שם לתת-שאילתה כדי שנוכל לסנן rn = 1.",
   "trap": "שני דברים נפרדים נשברים כאן בקלות. ראשית, התנאי rn = 1 חייב לשבת ב-ON ולא ב-WHERE — ב-WHERE הוא מוחק את המשלוחים שאין להם אירועים. שנית, MAX(eventTime) לבדו אינו פתרון: הוא מחזיר זמן, אבל לא את סוג האירוע והמיקום של אותה שורה.",
   "compare": "ב-SQL בוחרים שורה שלמה בעזרת פונקציית חלון. במונגו אין פונקציות חלון בתחביר הזה, ולכן ממיינים בתוך ה-pipeline של ה-$lookup ולוקחים ‎$limit:1‎. ‎preserveNullAndEmptyArrays‎ הוא המקביל המדויק של LEFT JOIN: בלעדיו ‎$unwind‎ מוחק כל משלוח שהמערך שלו ריק.",
   "edge": "משלוח עם שני אירועים באותה שנייה מחזיר את זה שמזההו קטן (SH04 → E10 ולא E11). משלוח בלי אירועים מופיע בדיוק פעם אחת, עם שדות אירוע ריקים (SH06 עד SH17). בלי מפתח מיון שני הבחירה בתיקו אינה קבועה ועלולה להשתנות בין הרצות.",
   "variant": {
    "v": "רק משלוחים שיש להם אירועים · משלוחים בלי אירועים בכלל",
    "card": "R-26 · R-28",
    "p": [
     "P12",
     "P11"
    ]
   }
  },
  {
   "n": 18,
   "id": "S18",
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
   "altSql": "SELECT c.customerId, c.customerName\nFROM Customers c\nWHERE EXISTS (\n  SELECT 1 FROM Shipments s\n  WHERE s.customerId = c.customerId\n)\nAND NOT EXISTS (\n  SELECT 1 FROM Shipments s\n  WHERE s.customerId = c.customerId\n    AND (s.status <> 'Delivered' OR s.status IS NULL)\n);",
   "altMongo": "db.customers.aggregate([\n  { $lookup: { from:\"shipments\", localField:\"customerId\",\n               foreignField:\"customerId\", as:\"s\" } },\n  { $match: {\n      \"s.0\": { $exists: true },\n      s: { $not: { $elemMatch: { status: { $ne: \"Delivered\" } } } }\n  } },\n  { $project: { _id:0, customerId:1, customerName:1 } }\n])",
   "logic": "את \"כולם\" לא בודקים בסינון — בודקים בשלילה: אין אף רשומה שמפרה את התנאי. לכן התנאי מורכב משני חלקים: יש לפחות אחד, ואין אף מפר. בלי החלק הראשון, לקוח בלי משלוחים היה עובר, כי אין לו מפר.",
   "trap": "הסינון ‎WHERE status = 'Delivered'‎ בלבד אינו מוכיח כלום על \"כולם\" — הוא פשוט מתעלם מהמשלוחים הלא תקינים. וחשוב לא פחות: סטטוס ריק הוא מפר. בלי ‎OR s.status IS NULL‎ הסטטוס החסר חומק דרך ההשוואה ‎<> 'Delivered'‎, שמחזירה UNKNOWN ולא TRUE.",
   "compare": "ב-SQL: EXISTS יחד עם NOT EXISTS. חלופה תקינה באותה מידה: ‎HAVING COUNT(*) >= 1 AND SUM(CASE WHEN status = 'Delivered' THEN 0 ELSE 1 END) = 0‎. במונגו: ‎$not‎ מעל ‎$elemMatch‎ על מערך תוצאות ה-$lookup — ‎$ne‎ מתאים גם לסטטוס חסר, ולכן הוא נתפס כמפר.",
   "edge": "שני משלוחים שנמסרו — נכלל (C5, C6). משלוח אחד שנמסר ואחד InTransit — נפסל (C1, C2). אפס משלוחים — נפסל (C3). משלוח יחיד עם סטטוס ריק — נפסל (C7). אין כפילות בפלט, כי לא עשינו ‎$unwind‎.",
   "variant": {
    "v": "\"לפחות משלוח אחד שנמסר\" · \"אף משלוח לא נמסר\" · \"לפחות שניים, וכולם נמסרו\"",
    "card": "R-23 · R-16",
    "p": [
     "P06",
     "P14",
     "P13"
    ]
   }
  },
  {
   "n": 19,
   "id": "S19",
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
   "altSql": "SELECT c.customerId, c.customerName,\n       COUNT(*) AS shipmentCount,\n       SUM(s.shippingCost) AS totalCost\nFROM Customers c\nJOIN Shipments s ON s.customerId = c.customerId\nWHERE s.createdAt >= '2026-09-01 00:00:00'\n  AND s.createdAt <  '2026-10-01 00:00:00'\nGROUP BY c.customerId, c.customerName\nHAVING COUNT(*) >= 3 AND SUM(s.shippingCost) > 500\nORDER BY totalCost DESC;",
   "altMongo": "db.shipments.aggregate([\n  { $match: { createdAt: {\n      $gte: ISODate(\"2026-09-01T00:00:00Z\"),\n      $lt:  ISODate(\"2026-10-01T00:00:00Z\") } } },\n  { $group: { _id:\"$customerId\",\n      shipmentCount: { $sum: 1 },\n      totalCost: { $sum: { $cond: [\n        { $ne: [\"$shippingCost\", null] }, \"$shippingCost\", 0\n      ] } }\n  } },\n  { $match: { shipmentCount: { $gte: 3 },\n              totalCost: { $gt: 500 } } },\n  { $lookup: { from:\"customers\", localField:\"_id\",\n               foreignField:\"customerId\", as:\"c\" } },\n  { $unwind: \"$c\" },\n  { $project: { _id:0, customerId:\"$_id\",\n      customerName:\"$c.customerName\",\n      shipmentCount:1, totalCost:1 } },\n  { $sort: { totalCost: -1 } }\n])",
   "logic": "שני מדדים על אותה קבוצה: ספירה וסכום. שניהם מחושבים ב-$group, ושני התנאים נבדקים אחריו. זה בדיוק מה ש-HAVING עושה ב-SQL.",
   "trap": "זה ההבדל מול שאלה 14, והוא הלב של השאלה: אסור לסנן עלות חסרה לפני הספירה. כל משלוח בחודש נספר, גם אם עלותו ריקה — ורק הסכום מתעלם ממנה. מי שיסנן קודם יקבל ספירה קטנה יותר ויפסיל לקוח שאמור להיכלל.",
   "compare": "ב-SQL זה קורה מעצמו: COUNT(*) סופר שורות ו-SUM מתעלם מ-NULL. במונגו צריך לכתוב את ההבחנה במפורש — ‎$sum:1‎ לספירה, ו-‎$cond‎ שמחליף עלות חסרה באפס לסכום.",
   "edge": "שלושה משלוחים בספטמבר שסכומם 500 בדיוק נפסלים (C8). שלושה משלוחים שאחד מהם עלות ריקה והסכום 650 נכללים, והספירה נשארת 3 (C9). שני משלוחים בספטמבר ואחד באוגוסט אינם מספיקים.",
   "variant": {
    "v": "חודש אחר או סף אחר — אותו פתרון בדיוק",
    "card": "R-04",
    "p": [
     "P07"
    ]
   }
  },
  {
   "n": 20,
   "id": "S20",
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
   "altSql": "SELECT shipmentId, COUNT(*) AS delayCount\nFROM ShipmentEvents\nWHERE eventType = 'Delayed'\nGROUP BY shipmentId\nHAVING COUNT(*) >= 2\n   AND MAX(eventTime) < '2026-10-01 00:00:00'\nORDER BY delayCount DESC;",
   "altMongo": "db.shipmentEvents.aggregate([\n  { $match: { eventType: \"Delayed\" } },\n  { $group: { _id:\"$shipmentId\",\n      delayCount: { $sum: 1 },\n      lastDelay:  { $max: \"$eventTime\" } } },\n  { $match: { delayCount: { $gte: 2 },\n      lastDelay: { $lt: ISODate(\"2026-10-01T00:00:00Z\") } } },\n  { $project: { _id:0, shipmentId:\"$_id\", delayCount:1 } },\n  { $sort: { delayCount: -1 } }\n])",
   "logic": "שני סוגי תנאים נפרדים. סוג האירוע הוא תנאי על שורה, ולכן הוא לפני הקיבוץ. המספר והזמן המרבי הם תנאים על הקבוצה, ולכן הם אחרי הקיבוץ.",
   "trap": "אל תסננו את הזמן לפני הקיבוץ. אם תוסיפו ‎eventTime < 01.10‎ ל-WHERE, העיכוב שבאוקטובר ייעלם — והמשלוח שהוא פוסל ייראה פתאום כשיר. התנאי הוא על ה-MAX, ולכן חייב להיבדק אחרי שה-MAX חושב.",
   "compare": "ב-SQL מותר לכתוב MAX בתוך HAVING ישירות. במונגו חייבים לחשב את ‎$max‎ כשדה בתוך ‎$group‎ ואז לסנן עליו ב-‎$match‎ — אין דרך לסנן על ערך מצטבר לפני שחישבתם אותו ונתתם לו שם.",
   "edge": "שני עיכובים בספטמבר ועוד אחד באוקטובר — נפסל (SH02). שלושה עיכובים בספטמבר ואירוע Delivered באוקטובר — נכלל, כי בודקים רק אירועי Delayed (SH05). עיכוב יחיד — נפסל (SH03).",
   "variant": {
    "v": "ספירה מותנית של סוג אירוע, כולל 0 · \"אף אירוע אחרי תאריך\"",
    "card": "R-16 · R-24",
    "p": [
     "P10"
    ]
   }
  }
 ],
 "practice": [
  {
   "id": "P01",
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
   "trap": "במונגו ‎.limit()‎ לפני ‎.sort()‎ בשרשרת find נראה שגוי אבל עובד — המנוע מסדר את השלבים. בצינור aggregate זה כן נשבר: ‎$limit‎ לפני ‎$sort‎ חותך את המסמכים הלא נכונים."
  },
  {
   "id": "P02",
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
   "trap": "סטטוס ריק יוצר קבוצה בפני עצמו בשתי השפות — ב-SQL קבוצת NULL, ובמונגו ‎_id: null‎. אם השאלה לא רוצה אותו, צריך לסנן במפורש."
  },
  {
   "id": "P03",
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
   "trap": "ב-SQL בודקים ‎IS NULL‎ על עמודה שלא יכולה להיות ריקה בעצמה — מפתח ראשי. בדיקה על עמודה שמותר לה להיות NULL תחזיר גם התאמות אמיתיות."
  },
  {
   "id": "P04",
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
   "trap": "אם תנאי התקופה יעבור מ-ON ל-WHERE, כל מחסן בלי התאמה ייפול — ה-createdAt שלו ריק, והשוואה ל-NULL אינה TRUE. זו הטעות הנפוצה ביותר ב-LEFT JOIN עם תנאי זמן."
  },
  {
   "id": "P05",
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
   "trap": "אסור COUNT(*) כאן. אחרי LEFT JOIN, שליח בלי משלוחים מקבל שורה אחת עם NULL בצד הימני — ו-COUNT(*) יספור אותה כ-1. ‎COUNT(s.shipmentId)‎ מתעלם מ-NULL ולכן נותן 0."
  },
  {
   "id": "P06",
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
   "trap": "במונגו בדיקה שהמערך אינו ריק עדיפה על ‎$unwind‎: ‎$unwind‎ היה מחזיר את הלקוח פעם לכל משלוח, וכדי לאחד שוב היה צריך ‎$group‎."
  },
  {
   "id": "P07",
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
   "trap": "ההבדל מול שאלה 19: שם סופרים את כולם ולכן אסור לסנן קודם. כאן מחשבים ממוצע ולכן מותר. מה שקובע הוא מה השאלה מבקשת, לא הרגל."
  },
  {
   "id": "P08",
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
   "trap": "שווי הפריטים אינו עלות המשלוח. shippingCost הוא דמי המשלוח, ואין לערבב ביניהם — שאלה שמבקשת \"סך עלות\" צריכה קריאה חוזרת כדי לדעת למה היא מתכוונת."
  },
  {
   "id": "P09",
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
   "trap": "ב-aggregate הסדר חייב להיות ‎$sort‎ ואז ‎$limit‎. הפוך — תקבלו שלושה מסמכים שרירותיים וממוינים."
  },
  {
   "id": "P10",
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
   "trap": "גם כאן COUNT על מזהה הצד הימני ולא COUNT(*). ושוב: תנאי הסוג ב-WHERE היה מוחק כל משלוח שלא עוכב."
  },
  {
   "id": "P11",
   "pattern": "anti-join",
   "title": "משלוחים בלי אף אירוע מעקב",
   "q": "הציגו את המשלוחים שאין להם אף שורה בטבלת האירועים.",
   "cols": [
    "shipmentId"
   ],
   "sql": "SELECT s.shipmentId\nFROM Shipments s\nLEFT JOIN ShipmentEvents e ON e.shipmentId = s.shipmentId\nWHERE e.eventId IS NULL;",
   "mongo": "db.shipments.aggregate([\n  { $lookup: { from:\"shipmentEvents\", localField:\"shipmentId\",\n               foreignField:\"shipmentId\", as:\"events\" } },\n  { $match: { events: { $size: 0 } } },\n  { $project: { _id:0, shipmentId:1 } }\n])",
   "logic": "אותה תבנית של \"שליחים בלי משלוחים\" — רק שמות הטבלאות משתנים. זה היתרון של לחשוב בדפוסים ולא בשאלות.",
   "trap": "אם תתחילו מטבלת האירועים לא תוכלו להגיע למשלוחים שאינם מופיעים בה בכלל."
  },
  {
   "id": "P12",
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
   "trap": "בלי ‎$sort‎ לפני ‎$group‎, ‎$first‎ מחזיר מסמך שרירותי. זו טעות שקטה: הקוד רץ, התוצאה נראית סבירה, והיא לא נכונה. השוו לשאלה 17, שבה חייבים גם את המשלוחים בלי אירועים ולכן התבנית שונה לגמרי."
  },
  {
   "id": "P13",
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
   "trap": "ספירת המפרים חייבת לכסות גם סטטוס ריק. ‎CASE WHEN status = 'Delivered' THEN 0 ELSE 1 END‎ עושה זאת נכון: סטטוס ריק אינו שווה ל-Delivered, ולכן הוא נופל ל-ELSE ונספר כמפר. לעומת זאת ‎CASE WHEN status <> 'Delivered' THEN 1 ELSE 0 END‎ היה מחמיץ אותו."
  },
  {
   "id": "P14",
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
   "trap": "אם תעבירו את תנאי הסטטוס ל-WHERE, הלקוח שאין לו משלוחים ייעלם — וזה בדיוק הלקוח שהשאלה הזאת רוצה."
  },
  {
   "id": "P15",
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
   "trap": "שימו לב להבדל בין מספר השורות למספר הפריטים השונים. משלוח SH01 מופיע בשלוש שורות פריט אבל רק בשני פריטים שונים, כי אותו פריט מופיע בו פעמיים."
  }
 ]
};
