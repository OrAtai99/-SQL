/* ============================================================
   תוכן הקורס: ניהול ועיצוב בסיסי נתונים (3963)
   מבוסס על המצגות, תבניות ה-SQL והמבחן לדוגמה + הרחבות.
   קובץ זה יוצר את window.COURSE. שאר הקבצים (questions.js, sqldata.js)
   מוסיפים אליו מאגרי שאלות ונתוני SQL.
   ============================================================ */
window.COURSE = {

/* ---------- מסלול למידה מומלץ ---------- */
learningPath: [
  { n:1, title:"יסודות ומושגי בסיס", topic:"fundamentals", goal:"להבין מה זה בסיס נתונים, DBMS, טבלה/רשומה/שדה/מפתח." },
  { n:2, title:"מודל ER ו-ERD", topic:"er", goal:"לזהות ישויות, תכונות, קשרים, מפתח ראשי — ולסמן ERD נכון." },
  { n:3, title:"קרדינליות וסוגי קשרים", topic:"cardinality", goal:"1:1 / 1:N / N:M, קשר בינארי/טרינרי/רקורסיבי, השתתפות מלאה." },
  { n:4, title:"המרה ל-DSD ופירוק N:M", topic:"dsd", goal:"להמיר ERD לטבלאות, למקם מפתח זר, לשבור רבים-לרבים." },
  { n:5, title:"נרמול 1NF → 3NF", topic:"normalization", goal:"לזהות ולתקן הפרות נרמול (חלקית / טרנזיטיבית)." },
  { n:6, title:"SQL — שליפה וסינון", topic:"sql-basics", goal:"SELECT/WHERE, אופרטורים, BETWEEN/IN/LIKE, NULL, DISTINCT, ORDER BY." },
  { n:7, title:"SQL — אגרגציה, JOIN, DML", topic:"sql-agg", goal:"COUNT/SUM/AVG, GROUP BY/HAVING, JOIN, INSERT/UPDATE/DELETE." },
  { n:8, title:"דוגמאות פתורות", view:"examples", goal:"לעבור על פתרונות מלאים שלב-אחר-שלב (ERD→DSD, נרמול, SQL)." },
  { n:9, title:"תרגול ובוחן", view:"quiz", goal:"לענות על מאגר השאלות עד 100% בכל נושא." },
  { n:10, title:"סימולציית מבחן", view:"exam", goal:"מבחן מלא בתנאי אמת — לחזור עד ציון 100." }
],

/* ---------- דגשים חמים לפני המבחן ---------- */
examTips: [
  "COUNT(עמודה) <b>לא</b> סופר NULL; COUNT(*) סופר את כל הרשומות.",
  "בקשר 1:N המפתח הזר יושב תמיד בצד ה<b>רבים</b> (M).",
  "מפתח ראשי בטבלת קשר N:M = <b>צירוף</b> שני המפתחות הזרים (מפתח מורכב).",
  "WHERE מסנן שורות <b>לפני</b> הקיבוץ; HAVING מסנן קבוצות <b>אחרי</b> הקיבוץ.",
  "בודקים NULL עם IS NULL / IS NOT NULL — <b>אף פעם לא</b> עם = NULL.",
  "כשמערבבים AND ו-OR — חובה סוגריים סביב ה-OR.",
  "BETWEEN כולל את שני הקצוות.",
  "תלות חלקית = הפרת 2NF · תלות טרנזיטיבית = הפרת 3NF.",
  "תכונה רב-ערכית → טבלה נפרדת (מפתח הישות + הערך, יחד PK).",
  "השתתפות מלאה (קו כפול) = כל ישות חייבת להשתתף לפחות בקשר אחד.",
  "UPDATE/DELETE בלי WHERE → משפיעים על כל הטבלה!",
  "קו כפול = מינימום 1; ישות חלשה מקבלת מפתח חלקי; Is-A יורש את כל ה-PK של האב."
],

/* ---------- סיכומי נושאים ---------- */
topics: [
  {
    id: "fundamentals",
    icon: "🗄️",
    title: "יסודות בסיסי נתונים",
    summary: "מה זה בסיס נתונים, DBMS, ומושגי היסוד.",
    sections: [
      { heading: "מהו בסיס נתונים?",
        html: `<p>בסיס נתונים הוא מערכת מאורגנת ל<b>אחסון, ניהול ושליפה</b> של מידע — כמו ספרייה דיגיטלית. הוא מחליף קבצי אקסל שמתקשים בכמויות גדולות ונוצרות בהם כפילויות, חוסר עקביות וקשיי חיפוש.</p>
        <ul>
          <li><b>טבלה (Table)</b> — אוסף מאורגן של נתונים בשורות ועמודות.</li>
          <li><b>רשומה (Record / Row)</b> — שורה אחת בטבלה, מידע על ישות מסוימת.</li>
          <li><b>שדה (Field / Column)</b> — עמודה בטבלה, תכונה ספציפית.</li>
          <li><b>מפתח (Key)</b> — שדה ייחודי שמזהה כל רשומה.</li>
        </ul>` },
      { heading: "למה בסיס נתונים ולא אקסל?",
        html: `<ul>
          <li><b>יכולת גדילה (Scalability)</b> — ממאות רשומות למיליונים, בלי לאבד ביצועים.</li>
          <li><b>הפחתת כפילויות</b> — לא שומרים את אותו נתון בכמה מקומות.</li>
          <li><b>שלמות ועקביות</b> — מניעת מידע סותר.</li>
          <li><b>אבטחה והרשאות</b> — שליטה מי רואה / עורך / מוחק.</li>
        </ul>` },
      { heading: "DBMS ו-SQL",
        html: `<p><b>DBMS</b> (Database Management System) — תוכנה המשמשת ממשק בין המשתמשים לנתונים: אחסון, שליפה, אבטחה, גיבוי והתאוששות. דוגמאות: <b>MySQL</b> (קוד פתוח), <b>Oracle</b> (ארגונים גדולים), <b>SQL Server</b> (מיקרוסופט).</p>
        <p><b>SQL</b> (Structured Query Language) — השפה הסטנדרטית לתקשורת עם כל ה-DBMS.</p>` },
      { heading: "🎯 דגשים למבחן",
        html: `<div class="callout warn">
          • זכור את שרשרת המושגים: בסיס נתונים ⊃ טבלה ⊃ שורה (רשומה) ⊃ שדה (עמודה).<br>
          • מפתח = שדה שמזהה רשומה <b>ייחודית</b>.<br>
          • איכות נתונים = ניקוי (הסרת שגיאות/כפילויות), טיוב (דיוק ואחידות), אינטגרציה (חיבור ממקורות).
        </div>` }
    ]
  },
  {
    id: "er",
    icon: "🔷",
    title: "מודל ER ו-ERD",
    summary: "ישויות, תכונות, קשרים, מפתח ראשי, וסימון גרפי.",
    sections: [
      { heading: "מהו מודל ישויות-קשרים (ER)?",
        html: `<p>מודל ER (Entity-Relationship) הוא גישה <b>מושגית</b> לתיאור מבנה בסיס הנתונים, ללא תלות בטכנולוגיה. <b>דיאגרמת ER (ERD)</b> היא הייצוג הגרפי — כלי תכנון שמאפשר להבין את מבנה הנתונים <b>לפני</b> המימוש הפיזי, ומונע טעויות יקרות.</p>` },
      { heading: "ישות, תכונה, מפתח ראשי",
        html: `<ul>
          <li><b>ישות (Entity)</b> — אובייקט/מושג בעל קיום עצמאי שרוצים לשמור עליו מידע (לקוח, מוצר, הזמנה).</li>
          <li><b>תכונה (Attribute)</b> — מאפיין שמתאר את הישות (שם, מחיר, תאריך).</li>
          <li><b>מפתח ראשי (Primary Key)</b> — תכונה (או צירוף) שמזהה כל מופע <b>ייחודית</b>. חייב להיות ייחודי ולא ריק (NOT NULL).</li>
        </ul>` },
      { heading: "סוגי תכונות",
        html: `<table class="mini">
          <tr><th>סוג תכונה</th><th>הסבר</th><th>דוגמה</th></tr>
          <tr><td>פשוטה (Simple)</td><td>ערך אטומי בודד</td><td>גיל</td></tr>
          <tr><td>מורכבת (Composite)</td><td>מתפרקת לתת-תכונות</td><td>כתובת = עיר+רחוב+מיקוד</td></tr>
          <tr><td><b>רב-ערכית (Multivalued)</b></td><td>כמה ערכים לאותה ישות</td><td>מספרי טלפון</td></tr>
          <tr><td>נגזרת (Derived)</td><td>מחושבת מתכונה אחרת</td><td>גיל (מתאריך לידה)</td></tr>
        </table>
        <div class="callout warn">תכונה <b>רב-ערכית</b> במעבר ל-DSD הופכת ל<b>טבלה נפרדת</b> (מפתח הישות + הערך, שניהם יחד PK). אסור פסיקים או טלפון1/טלפון2.</div>` },
      { heading: "סימון גרפי ב-ERD",
        html: `<table class="mini">
          <tr><th>רכיב</th><th>סימון</th></tr>
          <tr><td>ישות</td><td>מלבן עם שם הישות</td></tr>
          <tr><td>קשר</td><td>מעוין עם שם הקשר</td></tr>
          <tr><td>תכונה</td><td>אליפסה המחוברת בקו</td></tr>
          <tr><td>מפתח ראשי</td><td>תכונה עם <u>קו תחתי</u></td></tr>
          <tr><td>השתתפות מלאה</td><td>קו כפול</td></tr>
        </table>` },
      { heading: "ישות חלשה מול ירושה (Is-A)",
        html: `<ul>
          <li><b>ישות חלשה (Weak Entity)</b> — תלויה בקיום ישות מזהה (בעלים). מקבלת <b>מפתח חלקי</b> מהבעלים; המפתח המלא = מפתח הבעלים + המפתח החלקי.</li>
          <li><b>Is-A (ירושה)</b> — תת-ישות <b>יורשת את כל המפתח הראשי</b> של ישות האב הכללית.</li>
        </ul>
        <div class="callout warn">הבחנה למבחן: ישות חלשה = מפתח <b>חלקי</b> מהמזהה. ישות יורשת = <b>כל</b> המפתח הראשי של האב.</div>` },
      { heading: "🎯 דגשים למבחן",
        html: `<div class="callout warn">
          • ישות = מלבן · קשר = מעוין · תכונה = אליפסה · PK = קו תחתי.<br>
          • לקשר עצמו יכולות להיות <b>תכונות</b> (למשל "תאריך רכישה" בקשר "רוכש").<br>
          • ההבחנה הקשה: תכונה מול ישות — אם למשהו יש משמעות עצמאית, זו ישות; אחרת תכונה.
        </div>` }
    ]
  },
  {
    id: "cardinality",
    icon: "🔗",
    title: "קרדינליות וסוגי קשרים",
    summary: "1:1, 1:N, N:M, בינארי/טרינרי/רקורסיבי, השתתפות מלאה.",
    sections: [
      { heading: "קרדינליות (Cardinality)",
        html: `<p>קרדינליות מציינת <b>כמה מופעים</b> של ישות אחת יכולים להיות קשורים למופעים של ישות אחרת. שלושה סוגים:</p>
        <table class="mini">
          <tr><th>סוג</th><th>משמעות</th><th>דוגמה</th></tr>
          <tr><td><b>1:1</b></td><td>רשומה אחת מ-A ↔ רשומה אחת מ-B</td><td>אזרח ↔ תעודת זהות</td></tr>
          <tr><td><b>1:N</b></td><td>רשומה אחת מ-A ↔ הרבה מ-B (הנפוץ ביותר)</td><td>מחלקה → עובדים</td></tr>
          <tr><td><b>N:M</b></td><td>הרבה מ-A ↔ הרבה מ-B</td><td>סטודנטים ↔ קורסים</td></tr>
        </table>` },
      { heading: "דרגות קשר",
        html: `<ul>
          <li><b>בינארי</b> — בין שתי ישויות (הנפוץ והפשוט). סטודנט נרשם לקורס.</li>
          <li><b>טרינרי</b> — בין שלוש ישויות בו-זמנית.</li>
          <li><b>אונארי / רקורסיבי</b> — קשר של ישות עם <b>עצמה</b> (עובד מנהל עובד; קורס דורש קורס-קדם). חשוב להגדיר תפקידים: "מנהל"/"מנוהל".</li>
        </ul>
        <div class="callout">עיקרון הפשטות: קשרים מורכבים (3+ ישויות) מומלץ לפרק לקשרים בינאריים.</div>` },
      { heading: "1:1 — נדיר אך חשוב",
        html: `<p>כל רשומה בישות אחת מתאימה לרשומה אחת ויחידה בשנייה. נדיר; מופיע כשמפרידים מידע רגיש/נדיר לטבלה נפרדת, או בישות חלשה. דוגמאות: אזרח↔ת"ז, עובד↔משרד אישי, משתמש↔פרופיל.</p>` },
      { heading: "1:N — הנפוץ ביותר",
        html: `<p>רשומה אחת "אם" קשורה למספר רשומות "בנות", אך כל "בת" שייכת ל"אם" אחת בלבד. מחלקה→עובדים, קטגוריה→מוצרים, לקוח→הזמנות.</p>
        <div class="callout warn">מיושם ע"י <b>מפתח זר בטבלת ה"רבים"</b> שמצביע ל-PK של ה"אחד".</div>` },
      { heading: "N:M — מורכבות שדורשת פתרון",
        html: `<p>רשומות משני הצדדים קשורות לרבות מהצד השני. <b>לא ניתן לממש ישירות</b> בבסיס נתונים יחסי — דורש <b>טבלת ביניים (Associative Entity)</b> עם שני מפתחות זרים. סטודנט↔קורסים, עובד↔פרויקטים, מוצר↔הזמנות.</p>` },
      { heading: "השתתפות מלאה (קו כפול)",
        html: `<div class="callout warn"><b>קו כפול</b> = <b>השתתפות מלאה</b>: כל ישות בקבוצה <b>חייבת</b> להשתתף לפחות בקשר אחד (מינימום 1, לא 0). קו יחיד = השתתפות חלקית (מינימום 0).</div>` },
      { heading: "🎯 טעויות נפוצות",
        html: `<ul>
          <li><b>בלבול תכונה/ישות</b> — "כתובת" בד"כ תכונה, לא ישות.</li>
          <li><b>קרדינליות שגויה</b> — תמיד לשאול: "יכול להיות יותר מרשומה אחת בצד השני?"</li>
          <li><b>N:M סמוי</b> — כל קשר רבים-לרבים דורש טבלת ביניים.</li>
        </ul>` }
    ]
  },
  {
    id: "dsd",
    icon: "🧱",
    title: "המרה ל-DSD ופירוק N:M",
    summary: "מ-ERD לטבלאות, מפתח זר, שבירת רבים-לרבים, מפתח מורכב.",
    sections: [
      { heading: "מ-ERD לטבלאות — הכללים",
        html: `<ol>
          <li><b>כל ישות → טבלה.</b> תכונות → עמודות. PK של הישות → PK של הטבלה.</li>
          <li><b>קשר 1:N</b> → מפתח זר בצד ה<b>"רבים"</b> (M), מצביע ל-PK בצד ה"אחד".</li>
          <li><b>קשר 1:1</b> → מפתח זר באחד הצדדים (או איחוד הטבלאות).</li>
          <li><b>קשר N:M</b> → <b>טבלת קשר נפרדת</b> עם מפתחות זרים משני הצדדים.</li>
          <li><b>תכונה רב-ערכית</b> → טבלה נפרדת (PK הישות + הערך).</li>
        </ol>` },
      { heading: "מפתח זר (Foreign Key)",
        html: `<p><b>מפתח זר</b> = שדה בטבלה אחת ש<b>מפנה ל-PK בטבלה אחרת</b>, יוצר קשר לוגי ומבטיח <b>שלמות התייחסותית (Referential Integrity)</b>.</p>
        <div class="callout">שלמות התייחסותית: אם עובדים מצביעים למחלקה, ניסיון למחוק מחלקה עם עובדים <b>ייחסם</b> בשגיאה (אלא אם הוגדר ON DELETE CASCADE).</div>` },
      { heading: "פירוק קשר N:M — שלב אחר שלב",
        html: `<ol>
          <li>מזהים קשר N:M בין שתי ישויות.</li>
          <li>יוצרים <b>טבלת ביניים (Junction Table)</b> חדשה.</li>
          <li>מוסיפים בה <b>שני מפתחות זרים</b> לשתי הטבלאות המקוריות.</li>
          <li>(אופ') מוסיפים תכונות של הקשר: תאריך, כמות, ציון.</li>
        </ol>
        <div class="callout warn">התוצאה: קשר N:M הופך ל<b>שני קשרי 1:N</b>. המפתח הראשי של טבלת הביניים = <b>צירוף שני המפתחות הזרים</b> (מפתח מורכב), למשל <code>PK=(StudentID, CourseID)</code>. כך נמנעת כפילות של אותו זוג.</div>` },
      { heading: "🎯 דגשים למבחן",
        html: `<div class="callout warn">
          • 1:N → FK בצד ה<b>רבים</b>.<br>
          • N:M → טבלת קשר + PK מורכב משני ה-FK.<br>
          • מחיקה שמפרה שלמות התייחסותית → נחסמת (אם אין CASCADE).<br>
          • ראה גם דוגמה פתורה מלאה בלשונית "דוגמאות פתורות".
        </div>` }
    ]
  },
  {
    id: "normalization",
    icon: "📐",
    title: "נרמול (1NF → 3NF)",
    summary: "אטומיות, תלות מלאה, תלות טרנזיטיבית.",
    sections: [
      { heading: "למה לנרמל?",
        html: `<p>טבלאות לא מנורמלות יוצרות <b>כפילויות</b>, <b>אנומליות עדכון/הכנסה/מחיקה</b>. נרמול מונע אותן, מייעל אחסון ומבטיח עקביות.</p>
        <div class="callout">כל רמה <b>כוללת</b> את הקודמות: טבלה ב-3NF היא גם 1NF וגם 2NF.</div>` },
      { heading: "1NF — ערכים אטומיים",
        html: `<p>כל תא מכיל <b>ערך יחיד</b>. אין רשימות, אין קבוצות ערכים, אין שדות מרובים (טלפון1, טלפון2). תכונה רב-ערכית מוצאת לטבלה נפרדת.</p>` },
      { heading: "2NF — תלות מלאה במפתח",
        html: `<p>חייב לעמוד ב-1NF, ובנוסף: כל שדה שאינו מפתח תלוי ב<b>כל</b> המפתח הראשי, ולא רק ב<b>חלק</b> ממנו.</p>
        <div class="callout warn">רלוונטי במיוחד כש<b>המפתח מורכב</b>. 2NF מונע <b>תלות חלקית</b>. פתרון: מוציאים את השדה שתלוי בחלק מהמפתח לטבלה נפרדת עם אותו חלק כ-PK.</div>` },
      { heading: "3NF — אין תלות טרנזיטיבית",
        html: `<p>חייב לעמוד ב-2NF, ובנוסף: כל שדה לא-מפתח תלוי <b>ישירות</b> ב-PK בלבד — לא דרך שדה אחר שאינו מפתח.</p>
        <p><b>תלות טרנזיטיבית:</b> A→B וגם B→C, אז C תלוי ב-A דרך B. דוגמה: <code>Projects(ProjectID, ManagerID, ManagerName)</code> — ProjectID→ManagerID→ManagerName → הפרת 3NF.</p>
        <div class="callout">פתרון: מוציאים את השדה התלוי ל<b>טבלה חדשה</b> שבה השדה הקובע (ManagerID) הוא PK, ומקשרים ב-FK.</div>` },
      { heading: "טבלת סיכום",
        html: `<table class="mini">
          <tr><th>רמה</th><th>מבטיחה</th><th>מטפלת ב-</th></tr>
          <tr><td><b>1NF</b></td><td>ערכים אטומיים</td><td>רשימות / שדות מרובים</td></tr>
          <tr><td><b>2NF</b></td><td>תלות מלאה במפתח</td><td>תלות חלקית (מפתח מורכב)</td></tr>
          <tr><td><b>3NF</b></td><td>תלות ישירה בלבד</td><td>תלות טרנזיטיבית</td></tr>
        </table>
        <div class="callout warn">שאלת מבחן קלאסית: "איזו רמה מופרת?" — חפש: ערך לא-אטומי (1NF), תלות בחלק ממפתח מורכב (2NF), תלות בשדה לא-מפתח (3NF).</div>` }
    ]
  },
  {
    id: "sql-basics",
    icon: "💬",
    title: "SQL — שליפה וסינון",
    summary: "SELECT, WHERE, אופרטורים, BETWEEN/IN, LIKE, NULL, DISTINCT, ORDER BY.",
    sections: [
      { heading: "סדר הכתיבה הכללי (קריטי!)",
        html: `<pre>SELECT  columns
FROM    table
JOIN    other ON table.id = other.id
WHERE   row_condition
GROUP BY group_column
HAVING  group_condition
ORDER BY column ASC/DESC;</pre>
        <p>לא חייבים את כל החלקים — אבל כשמשתמשים, <b>הסדר הזה מחייב</b>.</p>` },
      { heading: "SELECT / FROM / WHERE",
        html: `<pre>SELECT first_name, last_name, age
FROM employees
WHERE age > 30;</pre>
        <p><code>SELECT</code> בוחר עמודות, <code>FROM</code> בוחר טבלה, <code>WHERE</code> מסנן שורות. <code>SELECT *</code> = כל העמודות.</p>` },
      { heading: "אופרטורי השוואה ולוגיקה",
        html: `<p>השוואה: <code>=</code> , <code>&lt;&gt;</code> או <code>!=</code> (שונה), <code>&gt;</code> , <code>&lt;</code> , <code>&gt;=</code> , <code>&lt;=</code>.</p>
        <ul>
          <li><b>AND</b> — רק אם <b>כל</b> התנאים מתקיימים.</li>
          <li><b>OR</b> — אם <b>לפחות אחד</b> מתקיים.</li>
          <li><b>NOT</b> — הופך תנאי.</li>
        </ul>
        <div class="callout warn">מערבבים AND ו-OR? <b>חובה סוגריים</b>:<br><code>WHERE Color='Red' AND (Price>100000 OR Year>2022)</code> = אדומים ש(מחיר>100000 או שנה>2022).</div>` },
      { heading: "BETWEEN, IN, LIKE",
        html: `<pre>WHERE GPA BETWEEN 85 AND 95        -- כולל 85 וגם 95
WHERE department IN ('Sales','HR') -- אחד מהערכים
WHERE name LIKE 'A%'               -- מתחיל ב-A
WHERE email LIKE '%gmail%'         -- מכיל gmail</pre>
        <p><code>%</code> = אפס או יותר תווים. <code>BETWEEN a AND b</code> שקול ל-<code>&gt;=a AND &lt;=b</code>.</p>` },
      { heading: "NULL — ערך חסר",
        html: `<div class="callout warn">NULL אינו 0 ואינו מחרוזת ריקה. בודקים תמיד עם <code>IS NULL</code> / <code>IS NOT NULL</code> — <b>לעולם לא</b> עם <code>= NULL</code>.</div>` },
      { heading: "DISTINCT ו-ORDER BY",
        html: `<pre>SELECT DISTINCT department FROM employees;       -- ללא כפילויות
SELECT COUNT(DISTINCT UserID) FROM Logins;       -- ספירת ייחודיים
ORDER BY GPA DESC;                               -- DESC=יורד, ASC=עולה (ברירת מחדל)</pre>` },
      { heading: "פונקציות תאריך (YEAR/MONTH/DAY)",
        html: `<p>בסגנון <b>SQL Server</b> (כמו במבחן):</p>
        <pre>WHERE Status='Delayed' AND YEAR(DeliveryDate)=2022;</pre>
        <div class="callout warn">במגרש התרגול כאן רץ <b>SQLite</b> — כותבים <code>strftime('%Y', DeliveryDate)='2022'</code> במקום <code>YEAR()</code>. <b>במבחן הכתוב</b> — השתמשו ב-YEAR()/MONTH().</div>` }
    ]
  },
  {
    id: "sql-agg",
    icon: "📊",
    title: "SQL — אגרגציה, GROUP BY, JOIN",
    summary: "COUNT/SUM/AVG/MAX/MIN, GROUP BY, HAVING, JOIN, DML.",
    sections: [
      { heading: "פונקציות אגרגציה",
        html: `<table class="mini">
          <tr><th>פונקציה</th><th>פעולה</th></tr>
          <tr><td>COUNT()</td><td>ספירת רשומות</td></tr>
          <tr><td>SUM()</td><td>סכום עמודה מספרית</td></tr>
          <tr><td>AVG()</td><td>ממוצע</td></tr>
          <tr><td>MAX() / MIN()</td><td>מקסימום / מינימום</td></tr>
        </table>
        <div class="callout warn"><code>COUNT(column)</code> <b>לא סופר NULL</b>! <code>COUNT(*)</code> סופר את כל הרשומות. (50 רשומות, 10 NULL → COUNT(column)=40)</div>` },
      { heading: "GROUP BY ו-HAVING",
        html: `<pre>SELECT Region, SUM(Cost) AS TotalCost
FROM Shipments
GROUP BY Region
HAVING SUM(Cost) > 2500;</pre>
        <ul>
          <li>מקבצים <b>לפי</b> השדה שמחלק לקבוצות (Region) — לא השדה שסוכמים.</li>
          <li><b>WHERE</b> מסנן שורות <b>לפני</b> הקיבוץ; <b>HAVING</b> מסנן קבוצות <b>אחרי</b> (על SUM/COUNT/AVG).</li>
          <li>עמודה ב-SELECT לצד GROUP BY חייבת להיות בתוך אגרגציה <b>או</b> ב-GROUP BY.</li>
        </ul>` },
      { heading: "JOIN — חיבור טבלאות",
        html: `<table class="mini">
          <tr><th>סוג</th><th>מחזיר</th></tr>
          <tr><td><b>INNER JOIN</b></td><td>רק רשומות עם התאמה בשתי הטבלאות</td></tr>
          <tr><td><b>LEFT JOIN</b></td><td>כל השמאלית + התאמות מהימנית (אחרת NULL)</td></tr>
          <tr><td><b>RIGHT JOIN</b></td><td>הפוך מ-LEFT</td></tr>
          <tr><td><b>FULL OUTER</b></td><td>כל הרשומות משתי הטבלאות</td></tr>
        </table>
        <pre>SELECT c.ClinicName, COUNT(d.DoctorID) AS DoctorsCount
FROM Clinics c
LEFT JOIN Doctors d ON c.ClinicID = d.ClinicID
GROUP BY c.ClinicName;</pre>
        <div class="callout">INNER מציג רק מרפאות עם רופאים; LEFT מציג <b>גם</b> מרפאות ללא רופאים (עם 0).</div>` },
      { heading: "DML — INSERT / UPDATE / DELETE",
        html: `<pre>INSERT INTO Students (ID, Name) VALUES (101, 'דני');

UPDATE Products
SET UnitPrice = UnitPrice * 0.95
WHERE Category = 'Electronics';

DELETE FROM UserLogs
WHERE Status = 'Expired' OR LogDate IS NULL;</pre>
        <div class="callout warn"><b>UPDATE/DELETE בלי WHERE → כל הטבלה!</b> תמיד הריצו SELECT עם אותו WHERE לפני. UPDATE משנה <b>ערכים</b>; ALTER/MODIFY משנים <b>מבנה</b>.</div>` },
      { heading: "🎯 סדר הביצוע הלוגי (למה HAVING עובד על אגרגציה)",
        html: `<p>ה-DBMS מבצע בסדר: <code>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</code>. לכן WHERE (מוקדם) לא יכול להשתמש ב-alias או באגרגציה, ו-HAVING (מאוחר) כן.</p>` }
    ]
  }
],

/* ---------- דוגמאות פתורות (שלב אחר שלב) ---------- */
workedExamples: [
  {
    id:"we-dsd",
    icon:"🧱",
    title:"המרת ERD ל-DSD — מערכת אוניברסיטה",
    steps:[
      { h:"התרחיש", html:`<p>נתון ERD: <b>סטודנט</b>(מס' סטודנט, שם), <b>קורס</b>(קוד קורס, שם, נק"ז), <b>מרצה</b>(מס' מרצה, שם). קשרים: סטודנט <b>נרשם</b> לקורס (N:M, עם תכונה "ציון"); מרצה <b>מלמד</b> קורס (1:N).</p>` },
      { h:"שלב 1 — כל ישות לטבלה", html:`<pre>Students(<u>StudentID</u>, Name)
Courses(<u>CourseID</u>, CourseName, Credits)
Instructors(<u>InstructorID</u>, Name)</pre><p>כל תכונה → עמודה; ה-PK מסומן.</p>` },
      { h:"שלב 2 — קשר 1:N (מרצה מלמד קורס)", html:`<p>מוסיפים <b>מפתח זר בצד ה"רבים"</b> = הקורס:</p><pre>Courses(<u>CourseID</u>, CourseName, Credits, InstructorID*)
   -- InstructorID* הוא FK → Instructors.InstructorID</pre><div class="callout">קורס אחד מועבר ע"י מרצה אחד → ה-FK בקורס.</div>` },
      { h:"שלב 3 — קשר N:M (נרשם)", html:`<p>יוצרים <b>טבלת ביניים</b> עם שני FK + תכונת הקשר "ציון":</p><pre>Enrollments(<u>StudentID*</u>, <u>CourseID*</u>, Grade)
   -- PK מורכב = (StudentID, CourseID)
   -- StudentID* → Students,  CourseID* → Courses</pre>` },
      { h:"התוצאה הסופית (DSD)", html:`<pre>Students(<u>StudentID</u>, Name)
Instructors(<u>InstructorID</u>, Name)
Courses(<u>CourseID</u>, CourseName, Credits, InstructorID*)
Enrollments(<u>StudentID*</u>, <u>CourseID*</u>, Grade)</pre><div class="callout warn">שים לב: הקשר N:M נשבר לשני קשרי 1:N דרך Enrollments, וה-PK שלה מורכב משני ה-FK.</div>` }
    ]
  },
  {
    id:"we-norm",
    icon:"📐",
    title:"נרמול שלב אחר שלב — 1NF → 2NF → 3NF",
    steps:[
      { h:"הטבלה הבעייתית", html:`<p>טבלת הזמנות לא מנורמלת:</p><pre>Orders(OrderID, ProductIDs, CustomerID, CustomerCity, CityZip)</pre><p>ProductIDs מכיל רשימה ("P1,P2"); CustomerCity תלוי ב-CustomerID; CityZip תלוי ב-CustomerCity.</p>` },
      { h:"1NF — אטומיות", html:`<p>ProductIDs אינו אטומי (רשימה). מפרקים לשורות/טבלה נפרדת:</p><pre>OrderItems(<u>OrderID*</u>, <u>ProductID*</u>)
Orders(<u>OrderID</u>, CustomerID, CustomerCity, CityZip)</pre><div class="callout">עכשיו כל תא = ערך יחיד.</div>` },
      { h:"2NF — תלות מלאה", html:`<p>נניח PK מורכב <code>(OrderID, ProductID)</code> ב-OrderItems, ותכונה כמו <code>ProductName</code> תלויה רק ב-ProductID (חלק מהמפתח) → תלות חלקית. מוציאים:</p><pre>Products(<u>ProductID</u>, ProductName)
OrderItems(<u>OrderID*</u>, <u>ProductID*</u>, Quantity)</pre>` },
      { h:"3NF — אין תלות טרנזיטיבית", html:`<p>ב-Orders: CustomerID → CustomerCity → CityZip. CityZip תלוי ב-PK <b>דרך</b> CustomerCity (שדה לא-מפתח) → תלות טרנזיטיבית. מוציאים:</p><pre>Customers(<u>CustomerID</u>, CustomerCity)
Cities(<u>CustomerCity</u>, CityZip)
Orders(<u>OrderID</u>, CustomerID*)</pre>` },
      { h:"התוצאה — הכל ב-3NF", html:`<pre>Orders(<u>OrderID</u>, CustomerID*)
Customers(<u>CustomerID</u>, CustomerCity*)
Cities(<u>CustomerCity</u>, CityZip)
Products(<u>ProductID</u>, ProductName)
OrderItems(<u>OrderID*</u>, <u>ProductID*</u>, Quantity)</pre><div class="callout warn">כל שדה לא-מפתח תלוי ישירות ורק ב-PK של הטבלה שלו.</div>` }
    ]
  },
  {
    id:"we-sql",
    icon:"💬",
    title:"בניית שאילתת SQL מורכבת — שלב אחר שלב",
    steps:[
      { h:"המשימה", html:`<p>"הצג לכל עיר את מספר הלקוחות השונים וסך ההזמנות, רק לערים עם 2+ לקוחות, מהגבוה לנמוך."</p><p>טבלה: <code>Orders(OrderID, CustomerID, City, TotalPrice)</code></p>` },
      { h:"שלב 1 — מאיפה ומה מקבצים", html:`<pre>SELECT City
FROM Orders
GROUP BY City;</pre><p>מקבצים לפי City.</p>` },
      { h:"שלב 2 — האגרגציות", html:`<pre>SELECT City,
       COUNT(DISTINCT CustomerID) AS Customers,
       SUM(TotalPrice) AS Total
FROM Orders
GROUP BY City;</pre>` },
      { h:"שלב 3 — סינון קבוצות (HAVING)", html:`<pre>...
GROUP BY City
HAVING COUNT(DISTINCT CustomerID) >= 2;</pre><div class="callout">תנאי על תוצאה קבוצתית → HAVING, לא WHERE.</div>` },
      { h:"שלב 4 — מיון", html:`<pre>SELECT City,
       COUNT(DISTINCT CustomerID) AS Customers,
       SUM(TotalPrice) AS Total
FROM Orders
GROUP BY City
HAVING COUNT(DISTINCT CustomerID) >= 2
ORDER BY Total DESC;</pre><div class="callout warn">תרגל שאילתה זו בעצמך בלשונית "תרגול SQL" (טבלת Orders זמינה שם).</div>` }
    ]
  }
],

/* ---------- כרטיסיות זיכרון ---------- */
flashcards: [
  { front:"מפתח ראשי (Primary Key)", back:"תכונה/צירוף שמזהה כל רשומה ייחודית. חייב ייחודי ולא ריק (NOT NULL)." },
  { front:"מפתח זר (Foreign Key)", back:"שדה שמפנה ל-PK בטבלה אחרת — יוצר קשר ומבטיח שלמות התייחסותית." },
  { front:"איפה יושב ה-FK בקשר 1:N?", back:"בצד ה\"רבים\" (M), ומצביע ל-PK בצד ה\"אחד\"." },
  { front:"מפתח ראשי בטבלת קשר N:M", back:"מפתח מורכב = צירוף שני ה-FK, למשל (StudentID, CourseID)." },
  { front:"תכונה רב-ערכית ב-DSD", back:"טבלה נפרדת עם PK הישות + הערך, שניהם יחד PK." },
  { front:"תכונה נגזרת (Derived)", back:"מחושבת מתכונה אחרת (גיל מתאריך לידה) — לא שומרים אותה." },
  { front:"השתתפות מלאה (קו כפול)", back:"כל ישות חייבת להשתתף לפחות בקשר אחד (מינימום 1, לא 0)." },
  { front:"ישות חלשה מול Is-A", back:"חלשה = מפתח חלקי מהמזהה. Is-A = יורשת את כל ה-PK של האב." },
  { front:"קשר רקורסיבי", back:"קשר של ישות עם עצמה (עובד מנהל עובד). מגדירים תפקידים." },
  { front:"1NF", back:"ערכים אטומיים — כל תא ערך יחיד, בלי רשימות/שדות מרובים." },
  { front:"2NF", back:"תלות מלאה במפתח — אין תלות חלקית (רלוונטי למפתח מורכב)." },
  { front:"3NF", back:"אין תלות טרנזיטיבית — שדה לא-מפתח תלוי ישירות ב-PK." },
  { front:"תלות טרנזיטיבית", back:"A→B→C: C תלוי ב-PK דרך שדה לא-מפתח. פותרים בטבלה נפרדת." },
  { front:"COUNT(column) מול COUNT(*)", back:"COUNT(column) לא סופר NULL; COUNT(*) סופר הכל." },
  { front:"WHERE מול HAVING", back:"WHERE מסנן שורות לפני הקיבוץ; HAVING מסנן קבוצות אחרי." },
  { front:"בדיקת NULL", back:"תמיד IS NULL / IS NOT NULL — לעולם לא = NULL." },
  { front:"BETWEEN", back:"כולל שני הקצוות. GPA BETWEEN 85 AND 95 = גם 85 וגם 95." },
  { front:"IN", back:"בודק אם ערך תואם לאחד מרשימה. IN ('A','B','C')." },
  { front:"LIKE ו-%", back:"'A%' מתחיל ב-A · '%gmail%' מכיל gmail · % = אפס+ תווים." },
  { front:"DISTINCT", back:"מחזיר ערכים ייחודיים בלבד (ללא כפילויות)." },
  { front:"ORDER BY", back:"מיון. ASC=עולה (ברירת מחדל), DESC=יורד. מופיע בסוף." },
  { front:"UPDATE בלי WHERE", back:"מעדכן את כל הרשומות! (כך גם DELETE)." },
  { front:"INNER מול LEFT JOIN", back:"INNER = רק התאמות. LEFT = כל השמאלית גם בלי התאמה (NULL)." },
  { front:"פירוק N:M", back:"טבלת ביניים עם 2 FK → הופך רבים-לרבים לשני קשרי 1:N." },
  { front:"שלמות התייחסותית", back:"FK חייב להצביע ל-PK קיים; מחיקה שמפרה זאת נחסמת (אם אין CASCADE)." },
  { front:"סדר SELECT (כתיבה)", back:"SELECT→FROM→JOIN/ON→WHERE→GROUP BY→HAVING→ORDER BY." },
  { front:"סדר ביצוע לוגי", back:"FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY." },
  { front:"UPDATE מול ALTER", back:"UPDATE משנה ערכים (שורות); ALTER משנה מבנה (טבלה)." },
  { front:"קרדינליות 1:1", back:"רשומה אחת ↔ רשומה אחת. נדיר (אזרח↔ת\"ז)." },
  { front:"DBMS", back:"תוכנה לניהול בסיס נתונים: אחסון, שליפה, אבטחה, גיבוי. (MySQL/Oracle/SQL Server)" }
]
};
