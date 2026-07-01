/* ============================================================
   תוכן הקורס: ניהול ועיצוב בסיסי נתונים (3963)
   מבוסס על המצגות, תבניות ה-SQL והמבחן לדוגמה.
   ============================================================ */
window.COURSE = {

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
          <li><b>טבלה</b> — אוסף מאורגן של נתונים בשורות ועמודות.</li>
          <li><b>רשומה (Record)</b> — שורה אחת בטבלה, מידע על ישות מסוימת.</li>
          <li><b>שדה (Field)</b> — עמודה בטבלה, תכונה ספציפית.</li>
          <li><b>מפתח (Key)</b> — שדה ייחודי שמזהה כל רשומה.</li>
        </ul>` },
      { heading: "למה צריך בסיס נתונים?",
        html: `<ul>
          <li><b>יכולת גדילה (Scalability)</b> — ממאות רשומות למיליונים, בלי לאבד ביצועים.</li>
          <li><b>הפחתת כפילויות</b> — לא שומרים את אותו נתון בכמה מקומות.</li>
          <li><b>שלמות ועקביות</b> — מניעת מידע סותר.</li>
          <li><b>אבטחה והרשאות</b> — שליטה מי רואה / עורך / מוחק.</li>
        </ul>` },
      { heading: "DBMS — מערכת לניהול בסיסי נתונים",
        html: `<p><b>DBMS</b> (Database Management System) היא תוכנה המשמשת ממשק בין המשתמשים לנתונים: אחסון, שליפה, אבטחה, גיבוי והתאוששות.</p>
        <p><b>דוגמאות:</b> MySQL (קוד פתוח, פופולרי), Oracle (ארגונים גדולים — בנקאות/ביטוח), SQL Server (של מיקרוסופט, סביבת Windows).</p>
        <p><b>SQL</b> (Structured Query Language) היא השפה הסטנדרטית לתקשורת עם כל ה-DBMS.</p>` }
    ]
  },
  {
    id: "er",
    icon: "🔷",
    title: "מודל ER ו-ERD",
    summary: "ישויות, תכונות, קשרים, מפתח ראשי וסימון גרפי.",
    sections: [
      { heading: "מהו מודל ישויות-קשרים (ER)?",
        html: `<p>מודל ישויות-קשרים (Entity-Relationship) הוא גישה <b>מושגית</b> לתיאור מבנה בסיס הנתונים, ללא תלות בטכנולוגיה. <b>דיאגרמת ER (ERD)</b> היא הייצוג הגרפי שלו בסמלים סטנדרטיים — כלי תכנון שמאפשר להבין את מבנה הנתונים <b>לפני</b> המימוש הפיזי.</p>` },
      { heading: "ישות, תכונה ומפתח ראשי",
        html: `<ul>
          <li><b>ישות (Entity)</b> — אובייקט/מושג בעל קיום עצמאי שרוצים לשמור עליו מידע (לקוח, מוצר, הזמנה).</li>
          <li><b>תכונה (Attribute)</b> — מאפיין שמתאר את הישות (שם, מחיר, תאריך).</li>
          <li><b>מפתח ראשי (Primary Key)</b> — תכונה (או צירוף תכונות) שמזהה כל מופע <b>באופן ייחודי</b>. חייב להיות ייחודי ולא ריק (NOT NULL).</li>
        </ul>` },
      { heading: "סימון גרפי ב-ERD",
        html: `<table class="mini">
          <tr><th>רכיב</th><th>סימון</th></tr>
          <tr><td>ישות</td><td>מלבן עם שם הישות</td></tr>
          <tr><td>קשר</td><td>מעוין עם שם הקשר</td></tr>
          <tr><td>תכונה</td><td>אליפסה המחוברת בקו</td></tr>
          <tr><td>מפתח ראשי</td><td>תכונה עם <u>קו תחתי</u></td></tr>
        </table>` },
      { heading: "תכונה רב-ערכית (Multivalued)",
        html: `<p>תכונה שיכולה להחזיק כמה ערכים (למשל כמה מספרי טלפון לעובד). במעבר ל-DSD <b>אסור</b> לדחוס לפסיקים או לסדרת שדות (טלפון1, טלפון2). הפתרון:</p>
        <div class="callout">תכונה רב-ערכית הופכת ל<b>טבלה נפרדת</b> הכוללת את המפתח הראשי של הישות + הערך, ושניהם יחד הם המפתח הראשי. כך נשמרת אטומיות (1NF).</div>` },
      { heading: "ישות חלשה מול ירושה (Is-A)",
        html: `<ul>
          <li><b>ישות חלשה</b> — תלויה בקיום הישות המזהה (הבעלים). מקבלת <b>מפתח חלקי</b> מהבעלים.</li>
          <li><b>Is-A (ירושה)</b> — תת-ישות <b>יורשת את כל המפתח הראשי</b> של ישות האב הכללית.</li>
        </ul>
        <div class="callout warn">הבחנה למבחן: ישות חלשה = מפתח <b>חלקי</b> מהמזהה. ישות יורשת = <b>כל</b> המפתח הראשי של האב.</div>` }
    ]
  },
  {
    id: "cardinality",
    icon: "🔗",
    title: "קרדינליות וסוגי קשרים",
    summary: "1:1, 1:N, N:M, קשר בינארי/טרינרי/רקורסיבי, השתתפות מלאה.",
    sections: [
      { heading: "קרדינליות (Cardinality / Multiplicity)",
        html: `<p>קרדינליות מציינת <b>כמה מופעים</b> של ישות אחת יכולים להיות קשורים למופעים של ישות אחרת. שלושה סוגים:</p>
        <table class="mini">
          <tr><th>סוג</th><th>משמעות</th><th>דוגמה</th></tr>
          <tr><td><b>1:1</b></td><td>רשומה אחת מ-A ↔ רשומה אחת מ-B</td><td>אזרח ↔ תעודת זהות</td></tr>
          <tr><td><b>1:N</b></td><td>רשומה אחת מ-A ↔ הרבה מ-B (הנפוץ ביותר)</td><td>מחלקה → עובדים</td></tr>
          <tr><td><b>N:M</b></td><td>הרבה מ-A ↔ הרבה מ-B</td><td>סטודנטים ↔ קורסים</td></tr>
        </table>` },
      { heading: "דרגות קשר",
        html: `<ul>
          <li><b>בינארי</b> — בין שתי ישויות (הנפוץ והפשוט ביותר). סטודנט נרשם לקורס.</li>
          <li><b>טרינרי</b> — בין שלוש ישויות בו-זמנית.</li>
          <li><b>אונארי / רקורסיבי</b> — קשר של ישות עם <b>עצמה</b> (עובד מנהל עובד; קורס דורש קורס קדם). חשוב להגדיר תפקידים: "מנהל" / "מנוהל".</li>
        </ul>
        <div class="callout">עיקרון הפשטות: קשרים מורכבים (3+ ישויות) מומלץ לפרק לסדרת קשרים בינאריים.</div>` },
      { heading: "אילוץ השתתפות מלאה (קו כפול)",
        html: `<div class="callout warn"><b>קו כפול</b> ב-ERD = <b>השתתפות מלאה</b>: כל ישות בקבוצה <b>חייבת</b> להשתתף לפחות בקשר אחד מסוג זה (מינימום 1, לא 0).</div>` },
      { heading: "טעויות נפוצות",
        html: `<ul>
          <li><b>בלבול תכונה/ישות</b> — "כתובת" היא בד"כ תכונה של לקוח, לא ישות. שאלה: יש לה משמעות עצמאית? אם לא — תכונה.</li>
          <li><b>קרדינליות שגויה</b> — תמיד לשאול: "יכול להיות יותר מרשומה אחת בצד השני?"</li>
          <li><b>N:M סמוי</b> — כל קשר רבים-לרבים דורש <b>טבלת ביניים</b>; אי אפשר לממש ישירות.</li>
        </ul>` }
    ]
  },
  {
    id: "dsd",
    icon: "🧱",
    title: "המרה ל-DSD ופירוק N:M",
    summary: "מ-ERD לטבלאות, מפתח זר, שבירת רבים-לרבים, מפתח מורכב.",
    sections: [
      { heading: "מ-ERD לטבלאות יחסיות",
        html: `<ol>
          <li><b>כל ישות → טבלה.</b> תכונות → עמודות. המפתח הראשי של הישות → מפתח ראשי של הטבלה.</li>
          <li><b>קשר 1:N</b> → מפתח זר בצד ה<b>"רבים"</b> (ה-M), מצביע למפתח הראשי בצד ה"אחד".</li>
          <li><b>קשר 1:1</b> → מפתח זר באחד הצדדים (או איחוד הטבלאות).</li>
          <li><b>קשר N:M</b> → <b>טבלת קשר נפרדת</b> עם מפתחות זרים משני הצדדים.</li>
        </ol>
        <div class="callout warn">למבחן: בקשר 1:N המפתח הזר תמיד יושב בצד ה<b>"רבים"</b>.</div>` },
      { heading: "מפתח זר (Foreign Key)",
        html: `<p><b>מפתח זר</b> = שדה בטבלה אחת ש<b>מפנה למפתח הראשי בטבלה אחרת</b>, ובכך יוצר קשר לוגי ומבטיח <b>שלמות התייחסותית (Referential Integrity)</b>.</p>
        <div class="callout">שלמות התייחסותית: אם עובדים מצביעים למחלקה, ניסיון למחוק את המחלקה <b>ייחסם</b> בהודעת שגיאה (אלא אם הוגדר CASCADE).</div>` },
      { heading: "פירוק קשר רבים-לרבים (N:M)",
        html: `<p>קשר N:M בעייתי ולא ניתן לממש ישירות. הפתרון: <b>טבלת ביניים (Junction / Associative Table)</b> שמפצלת אותו ל<b>שני קשרי 1:N</b>.</p>
        <ol>
          <li>מזהים את הקשר N:M בין שתי ישויות.</li>
          <li>יוצרים טבלת ביניים חדשה.</li>
          <li>מוסיפים בה <b>שני מפתחות זרים</b> לשתי הטבלאות המקוריות.</li>
          <li>(אופ') מוסיפים תכונות של הקשר עצמו — תאריך רישום, כמות, ציון.</li>
        </ol>
        <p><b>דוגמה:</b> Students ↔ Courses → טבלת <code>Enrollments(StudentID, CourseID, EnrollDate)</code>.</p>` },
      { heading: "מפתח ראשי בטבלת קשר",
        html: `<div class="callout warn">המפתח הראשי בטבלה המקשרת הוא <b>מפתח מורכב (Composite Key)</b> = <b>צירוף שני המפתחות הזרים</b>, למשל <code>PK = (StudentID, CourseID)</code>. כל אחד מהם גם FK לטבלה שלו. כך נמנעת כפילות — אותו זוג לא מופיע פעמיים.</div>` }
    ]
  },
  {
    id: "normalization",
    icon: "📐",
    title: "נרמול (1NF → 3NF)",
    summary: "אטומיות, תלות מלאה, ותלות טרנזיטיבית.",
    sections: [
      { heading: "למה לנרמל?",
        html: `<p>טבלאות לא מנורמלות יוצרות <b>כפילויות</b>, <b>אנומליות עדכון</b> ובעיות הכנסה. נרמול מונע אותן, מייעל אחסון ומבטיח עקביות.</p>
        <div class="callout">כל רמה <b>כוללת</b> את הקודמות: טבלה ב-3NF היא גם 1NF וגם 2NF.</div>` },
      { heading: "1NF — ערכים אטומיים",
        html: `<p>כל תא מכיל <b>ערך יחיד</b>. אין רשימות, אין קבוצות ערכים, אין שדות מרובים (טלפון1, טלפון2). תכונה רב-ערכית מוצאת לטבלה נפרדת.</p>` },
      { heading: "2NF — תלות מלאה במפתח",
        html: `<p>חייב לעמוד ב-1NF, ובנוסף: כל שדה שאינו מפתח תלוי ב<b>כל</b> המפתח הראשי, ולא רק ב<b>חלק</b> ממנו.</p>
        <div class="callout warn">רלוונטי במיוחד כש<b>המפתח מורכב</b> (משני שדות+). 2NF מונע <b>תלות חלקית</b>.</div>` },
      { heading: "3NF — אין תלות טרנזיטיבית",
        html: `<p>חייב לעמוד ב-2NF, ובנוסף: כל שדה שאינו מפתח תלוי <b>ישירות</b> במפתח הראשי בלבד — ולא דרך שדה אחר שאינו מפתח.</p>
        <p><b>תלות טרנזיטיבית:</b> אם A→B וגם B→C, אז C תלוי ב-A דרך B. דוגמה קלאסית: <code>Projects(ProjectID, ManagerID, ManagerName)</code> — ProjectID→ManagerID→ManagerName, לכן ManagerName תלוי במפתח <b>דרך שדה לא-מפתח</b> → הפרת 3NF.</p>
        <div class="callout">פתרון: מוציאים את השדה התלוי ל<b>טבלה חדשה</b> שבה השדה הקובע (ManagerID) הוא המפתח הראשי, ומקשרים ב-FK.</div>` },
      { heading: "סיכום מהיר",
        html: `<table class="mini">
          <tr><th>רמה</th><th>מבטיחה</th><th>מטפלת ב-</th></tr>
          <tr><td><b>1NF</b></td><td>ערכים אטומיים</td><td>רשימות / שדות מרובים</td></tr>
          <tr><td><b>2NF</b></td><td>תלות מלאה במפתח</td><td>תלות חלקית (מפתח מורכב)</td></tr>
          <tr><td><b>3NF</b></td><td>תלות ישירה בלבד</td><td>תלות טרנזיטיבית</td></tr>
        </table>` }
    ]
  },
  {
    id: "sql-basics",
    icon: "💬",
    title: "SQL — שליפה וסינון",
    summary: "SELECT, WHERE, AND/OR/NOT, BETWEEN/IN, LIKE, DISTINCT, ORDER BY.",
    sections: [
      { heading: "סדר הכתיבה הכללי (קריטי למבחן!)",
        html: `<pre>SELECT  columns
FROM    table
JOIN    other ON table.id = other.id
WHERE   row_condition
GROUP BY group_column
HAVING  group_condition
ORDER BY column ASC/DESC;</pre>
        <p>לא חייבים את כל החלקים — אבל כשמשתמשים, <b>הסדר הזה מחייב</b>.</p>` },
      { heading: "SELECT / FROM / WHERE",
        html: `<p><code>SELECT</code> בוחר אילו עמודות להציג, <code>FROM</code> מאיזו טבלה, <code>WHERE</code> מסנן שורות. <code>SELECT *</code> = כל העמודות.</p>
        <pre>SELECT first_name, last_name, age
FROM employees
WHERE age > 30;</pre>` },
      { heading: "אופרטורים לוגיים",
        html: `<ul>
          <li><b>AND</b> — מחזיר רשומה רק אם <b>כל</b> התנאים מתקיימים.</li>
          <li><b>OR</b> — מחזיר אם <b>לפחות אחד</b> מתקיים.</li>
          <li><b>NOT</b> — הופך תנאי.</li>
        </ul>
        <div class="callout warn">כשמערבבים AND ו-OR — חובה <b>סוגריים</b>, אחרת הפירוש לוגית שגוי.<br>
        <code>WHERE Color='Red' AND (Price>100000 OR Year>2022)</code> = רכבים אדומים ש(מחירם>100000 או שנתם>2022).</div>` },
      { heading: "BETWEEN ו-IN",
        html: `<pre>WHERE GPA BETWEEN 85 AND 95   -- כולל את שני הקצוות (85 ו-95)
WHERE department IN ('Sales','HR','IT')</pre>
        <p><code>BETWEEN a AND b</code> שקול ל-<code>&gt;=a AND &lt;=b</code>.</p>` },
      { heading: "NULL — ערך חסר",
        html: `<div class="callout warn">NULL אינו 0 ואינו מחרוזת ריקה. בודקים תמיד עם <code>IS NULL</code> / <code>IS NOT NULL</code> — <b>לעולם לא</b> עם <code>= NULL</code>.</div>` },
      { heading: "LIKE, DISTINCT, ORDER BY",
        html: `<pre>WHERE first_name LIKE 'A%'   -- מתחיל ב-A   (% = אפס+ תווים)
WHERE email LIKE '%gmail%'   -- מכיל gmail

SELECT DISTINCT department FROM employees;   -- ללא כפילויות
SELECT COUNT(DISTINCT UserID) FROM Logins;   -- ספירת ערכים ייחודיים

ORDER BY GPA DESC;   -- DESC=יורד, ASC=עולה (ברירת מחדל=עולה)</pre>` },
      { heading: "פונקציות תאריך (YEAR / MONTH / DAY)",
        html: `<p>לעיתים נדרש להחיל תנאי על חלק מתאריך. בסגנון <b>SQL Server</b> (כמו במבחן) משתמשים בפונקציות:</p>
        <pre>SELECT ShipmentID
FROM Deliveries
WHERE Status = 'Delayed' AND YEAR(DeliveryDate) = 2022;</pre>
        <div class="callout warn">שימו לב: במגרש התרגול כאן רץ מנוע <b>SQLite</b>, שבו כותבים <code>strftime('%Y', DeliveryDate) = '2022'</code> במקום <code>YEAR(...)</code>. <b>במבחן הכתוב</b> — השתמשו ב-<code>YEAR()</code>/<code>MONTH()</code> כפי שלמדתם במצגות.</div>` }
    ]
  },
  {
    id: "sql-agg",
    icon: "📊",
    title: "SQL — פונקציות, GROUP BY, JOIN",
    summary: "COUNT/SUM/AVG/MAX/MIN, GROUP BY, HAVING, JOIN, DML.",
    sections: [
      { heading: "פונקציות אגרגציה",
        html: `<table class="mini">
          <tr><th>פונקציה</th><th>פעולה</th></tr>
          <tr><td>COUNT()</td><td>ספירת רשומות</td></tr>
          <tr><td>SUM()</td><td>סכום עמודה מספרית</td></tr>
          <tr><td>AVG()</td><td>ממוצע</td></tr>
          <tr><td>MAX() / MIN()</td><td>ערך מקסימלי / מינימלי</td></tr>
        </table>
        <div class="callout warn"><code>COUNT(column)</code> <b>לא סופר NULL</b>! <code>COUNT(*)</code> סופר את כל הרשומות. (50 רשומות, 10 NULL → COUNT(column)=40)</div>` },
      { heading: "GROUP BY ו-HAVING",
        html: `<pre>SELECT Region, SUM(Cost) AS TotalCost
FROM Shipments
GROUP BY Region
HAVING SUM(Cost) > 2500;</pre>
        <ul>
          <li>מקבצים <b>לפי</b> השדה שמחלק לקבוצות (Region) — <b>לא</b> השדה שסוכמים.</li>
          <li><b>WHERE</b> מסנן שורות <b>לפני</b> הקיבוץ; <b>HAVING</b> מסנן קבוצות <b>אחרי</b> הקיבוץ (מתאים ל-SUM/COUNT/AVG).</li>
          <li>עמודה ב-SELECT לצד GROUP BY חייבת להיות בתוך פונקציית אגרגציה <b>או</b> להופיע ב-GROUP BY.</li>
        </ul>` },
      { heading: "JOIN — חיבור טבלאות",
        html: `<table class="mini">
          <tr><th>סוג</th><th>מחזיר</th></tr>
          <tr><td><b>INNER JOIN</b></td><td>רק רשומות עם התאמה בשתי הטבלאות</td></tr>
          <tr><td><b>LEFT JOIN</b></td><td>כל הרשומות מהשמאלית + התאמות מהימנית (אחרת NULL)</td></tr>
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
        <div class="callout warn"><b>UPDATE/DELETE בלי WHERE → משפיעים על כל הטבלה!</b> תמיד הריצו SELECT עם אותו WHERE לפני, כדי לבדוק מה ישתנה/יימחק. UPDATE משנה <b>ערכים</b> (ALTER/MODIFY משנים <b>מבנה</b>).</div>` }
    ]
  }
],

/* ---------- כרטיסיות זיכרון ---------- */
flashcards: [
  { front: "מפתח ראשי (Primary Key)", back: "תכונה/צירוף תכונות שמזהה כל רשומה באופן ייחודי. חייב להיות ייחודי ולא ריק (NOT NULL)." },
  { front: "מפתח זר (Foreign Key)", back: "שדה שמפנה למפתח הראשי בטבלה אחרת — יוצר קשר לוגי ומבטיח שלמות התייחסותית." },
  { front: "איפה יושב ה-FK בקשר 1:N?", back: "בצד ה\"רבים\" (M), ומצביע למפתח הראשי בצד ה\"אחד\"." },
  { front: "מפתח ראשי בטבלת קשר N:M", back: "מפתח מורכב = צירוף שני המפתחות הזרים, למשל (StudentID, CourseID)." },
  { front: "תכונה רב-ערכית ב-DSD", back: "הופכת לטבלה נפרדת עם המפתח של הישות + הערך, ושניהם יחד מפתח ראשי." },
  { front: "השתתפות מלאה (קו כפול)", back: "כל ישות בקבוצה חייבת להשתתף לפחות בקשר אחד (מינימום 1, לא 0)." },
  { front: "ישות חלשה מול Is-A", back: "ישות חלשה = מפתח חלקי מהמזהה. Is-A = יורשת את כל המפתח הראשי של האב." },
  { front: "1NF", back: "ערכים אטומיים — כל תא ערך יחיד, בלי רשימות/שדות מרובים." },
  { front: "2NF", back: "תלות מלאה במפתח — אין תלות חלקית (רלוונטי למפתח מורכב)." },
  { front: "3NF", back: "אין תלות טרנזיטיבית — שדה לא-מפתח תלוי ישירות במפתח, לא דרך שדה אחר." },
  { front: "COUNT(column) מול COUNT(*)", back: "COUNT(column) לא סופר NULL; COUNT(*) סופר את כל הרשומות." },
  { front: "WHERE מול HAVING", back: "WHERE מסנן שורות לפני הקיבוץ; HAVING מסנן קבוצות אחרי הקיבוץ (על SUM/COUNT/AVG)." },
  { front: "בדיקת NULL", back: "תמיד IS NULL / IS NOT NULL — לעולם לא = NULL." },
  { front: "BETWEEN", back: "כולל את שני הקצוות. GPA BETWEEN 85 AND 95 = גם 85 וגם 95." },
  { front: "UPDATE בלי WHERE", back: "מעדכן את כל הרשומות בטבלה! (כך גם DELETE)." },
  { front: "INNER מול LEFT JOIN", back: "INNER = רק התאמות בשתי הטבלאות. LEFT = כל השמאלית גם בלי התאמה (NULL)." },
  { front: "פירוק N:M", back: "טבלת ביניים עם 2 FK → הופך קשר רבים-לרבים לשני קשרי 1:N." },
  { front: "סדר SELECT", back: "SELECT → FROM → JOIN/ON → WHERE → GROUP BY → HAVING → ORDER BY." }
],

/* ---------- בוחן אמריקאי (15 שאלות מהמבחן לדוגמה) ---------- */
quiz: [
  { q: "בתרשים ERD תכונה רב-ערכית (כגון \"מספרי טלפון\" של עובד) תיוצג במעבר ל-DSD באופן הבא:",
    options: [
      "כשדה בודד המכיל את כל המספרים מופרדים בפסיקים",
      "כטבלה נפרדת הכוללת את המפתח הראשי של העובד ואת מספר הטלפון, כששניהם יחד מהווים מפתח ראשי",
      "כסדרת שדות (טלפון1, טלפון2 וכו')",
      "לא ניתן לייצג תכונה רב-ערכית במודל הטבלאי" ],
    correct: 1,
    explain: "תכונה רב-ערכית הופכת לטבלה נפרדת כדי לשמור ערכים אטומיים (1NF) — כל מספר הוא שורה נפרדת עם FK לעובד." },
  { q: "Projects(ProjectID, ManagerID, ManagerName, Budget). ProjectID הוא המפתח הראשי וכל מנהל מנהל פרויקט אחד. איזו רמת נרמול מופרת?",
    options: ["1NF", "2NF", "3NF — קיימת תלות טרנזיטיבית (שם המנהל תלוי בקוד המנהל)", "הטבלה מנורמלת לחלוטין"],
    correct: 2,
    explain: "ProjectID→ManagerID וגם ManagerID→ManagerName, לכן ManagerName תלוי ב-ProjectID דרך שדה לא-מפתח (תלות טרנזיטיבית) → הפרת 3NF." },
  { q: "SELECT COUNT(Bonus) FROM Employees, כאשר יש 50 רשומות ו-10 מהן NULL בשדה הבונוס. מה התוצאה?",
    options: ["50", "40", "60", "לא ניתן לדעת"],
    correct: 1,
    explain: "COUNT(עמודה) סופר רק ערכים שאינם NULL, לכן 50−10 = 40." },
  { q: "בהמרת קשר רבים-לרבים (N:M) בין סטודנט לקורס ל-DSD, מה יהיה המפתח הראשי בטבלה המקשרת?",
    options: ["מפתח רץ (Auto-ID) שנוסף לטבלה", "המפתח הראשי של הסטודנט בלבד", "שילוב המפתחות הראשיים של שתי הטבלאות (סטודנט וקורס)", "לא ניתן להגדיר מפתח ראשי לטבלה מקשרת"],
    correct: 2,
    explain: "PK מורכב = (StudentID, CourseID), כשכל אחד גם FK לטבלה שלו. זה מונע כפילות של אותו זוג." },
  { q: "מהו ההבדל העקרוני בין קשר \"ישות חלשה\" לבין קשר \"Is-A\" (ירושה)?",
    options: [
      "אין הבדל, שניהם מיוצגים באותו אופן ב-DSD",
      "ישות חלשה תלויה בקיום הישות המזהה, וישות יורשת היא עצמאית לחלוטין",
      "ישות חלשה מקבלת מפתח חלקי מהישות המזהה, וישות יורשת מקבלת את כל המפתח הראשי של ישות האב",
      "כל התשובות נכונות" ],
    correct: 2,
    explain: "ישות חלשה מזוהה ע\"י בעלים + מפתח חלקי. ב-Is-A תת-הישות יורשת את המפתח הראשי המלא של ישות האב הכללית." },
  { q: "SELECT * FROM Cars WHERE Color='Red' AND (Price>100000 OR Year>2022). אילו רכבים יישלפו?",
    options: [
      "כל הרכבים האדומים שמחירם מעל 100,000, וגם כל הרכבים משנת 2022 ומעלה",
      "רכבים אדומים שמחירם מעל 100,000 או שהם משנת 2022 ומעלה",
      "כל הרכבים האדומים שיוצרו לפני 2022",
      "לא יישלפו רשומות כלל בשל טעות לוגית בסוגריים" ],
    correct: 1,
    explain: "ה-AND מחייב Color='Red', והסוגריים מחייבים שלפחות אחד מתוך (Price>100000 או Year>2022) יתקיים. כלומר: רכבים אדומים שמקיימים את אחד התנאים בסוגריים." },
  { q: "מהי ההגדרה המדויקת של \"מפתח זר\" (Foreign Key)?",
    options: [
      "שדה המזהה באופן חד-ערכי רשומה בטבלה שבה הוא נמצא",
      "שדה המכיל ערכים ייחודיים בלבד ואינו מאפשר כפילויות",
      "שדה בטבלה המפנה למפתח הראשי בטבלה אחרת לצורך יצירת קשר לוגי",
      "מפתח המורכב משלושה שדות או יותר" ],
    correct: 2,
    explain: "מפתח זר מפנה למפתח הראשי בטבלה אחרת ובכך יוצר את הקשר ומבטיח שלמות התייחסותית. (תשובה א מתארת מפתח ראשי.)" },
  { q: "איזו רמת נרמול מבטיחה שכל שדה שאינו מפתח תלוי במפתח הראשי באופן מלא (ולא רק בחלק ממנו)?",
    options: ["1NF", "2NF", "3NF", "כל התשובות נכונות"],
    correct: 1,
    explain: "2NF מונע תלות חלקית: שדה לא-מפתח לא יכול להיות תלוי רק בחלק ממפתח מורכב." },
  { q: "בשאילתת SQL הכוללת GROUP BY, מתי נשתמש ב-HAVING?",
    options: [
      "כשנרצה לסנן שורות בודדות לפני הקיבוץ",
      "כשנרצה להחיל תנאי על תוצאות פונקציות אגרגטיביות (SUM/COUNT) אחרי הקיבוץ",
      "כשנרצה למיין את התוצאות בסדר יורד",
      "לא ניתן להשתמש ב-HAVING יחד עם GROUP BY" ],
    correct: 1,
    explain: "WHERE מסנן לפני GROUP BY; HAVING מסנן קבוצות אחרי חישובי SUM/COUNT/AVG." },
  { q: "בתרשים DSD, בקשר יחיד-לרבים (1:N), היכן ימוקם המפתח הזר?",
    options: ["בצד ה\"יחיד\" (ה-1)", "בצד ה\"רבים\" (ה-M)", "בטבלה שלישית חדשה", "בשני הצדדים"],
    correct: 1,
    explain: "ה-FK יושב בצד ה\"רבים\" ומצביע ל-PK של הצד ה\"יחיד\", כדי שכל רשומה בצד M תדע למי היא שייכת." },
  { q: "מה משמעות \"אילוץ השתתפות מלאה\" (קו כפול) ב-ERD?",
    options: [
      "כל ישות בקבוצה חייבת להשתתף לפחות בקשר אחד מסוג זה",
      "כל ישות יכולה להשתתף לכל היותר בקשר אחד",
      "הישות היא ישות חזקה שאינה זקוקה למפתח ראשי",
      "הקשר הוא תמיד רבים-לרבים" ],
    correct: 0,
    explain: "קו כפול = מינימום 1 (לא 0): אין מופעים בישות שאינם קשורים בקשר." },
  { q: "מה יקרה בניסיון למחוק רשומה מטבלת \"מחלקות\" כשיש עובדים מקושרים אליה (בהנחת שלמות התייחסותית)?",
    options: [
      "המחלקה תימחק והעובדים יישארו ללא מחלקה",
      "המחלקה וכל העובדים המשויכים יימחקו אוטומטית",
      "המערכת תמנע את המחיקה ותציג הודעת שגיאה כדי לשמור על תקינות הנתונים",
      "לא ניתן לדעת" ],
    correct: 2,
    explain: "ה-FK בעובדים מפנה למחלקות; מחיקה תפר שלמות התייחסותית — לכן תיחסם (אלא אם הוגדר CASCADE)." },
  { q: "בנרמול ל-3NF, מהו הטיפול הנכון בתלות טרנזיטיבית?",
    options: [
      "איחוד כל השדות לטבלה אחת גדולה",
      "מחיקת השדות התלויים מבסיס הנתונים",
      "הוצאת השדות התלויים לטבלה חדשה שבה השדה הקובע יהיה המפתח הראשי",
      "הפיכת השדה התלוי למפתח זר בטבלה המקורית בלי לפתוח טבלה חדשה" ],
    correct: 2,
    explain: "מעבירים את התלות (למשל ManagerID→ManagerName) לטבלה נפרדת שבה הקובע הוא PK, ומקשרים ב-FK." },
  { q: "איזו פקודה תשמש לשינוי ודריסת ערך קיים בתוך שדה בטבלה?",
    options: ["CHANGE", "UPDATE", "ALTER", "MODIFY"],
    correct: 1,
    explain: "UPDATE משנה נתונים קיימים (ערכים בשורות). ALTER/MODIFY משנים את מבנה הטבלה, לא ערכים." },
  { q: "מה ההבדל בין AND לבין OR בתנאי סינון?",
    options: [
      "AND מחזיר אם לפחות תנאי אחד מתקיים; OR רק אם כולם",
      "AND מחזיר רק אם כל התנאים מתקיימים; OR מחזיר אם לפחות אחד מתקיים",
      "אין הבדל, שניהם עושים אותו דבר",
      "OR משמש רק עם מספרים ו-AND רק עם טקסט" ],
    correct: 1,
    explain: "AND דורש שכל התנאים יתקיימו; OR מספיק לו שאחד יתקיים." }
],

/* ---------- סכימת בסיס הנתונים לתרגול SQL ---------- */
sqlSchema: `
CREATE TABLE Shipments (ShipmentID INTEGER PRIMARY KEY, Region TEXT, Cost INTEGER);
INSERT INTO Shipments VALUES (1,'North',1000),(2,'North',2000),(3,'South',500),(4,'South',800),(5,'East',3000),(6,'West',2600),(7,'West',100);

CREATE TABLE Clinics (ClinicID INTEGER PRIMARY KEY, ClinicName TEXT);
INSERT INTO Clinics VALUES (1,'מרפאת הצפון'),(2,'מרפאת המרכז'),(3,'מרפאת הדרום');

CREATE TABLE Doctors (DoctorID INTEGER PRIMARY KEY, DoctorName TEXT, ClinicID INTEGER);
INSERT INTO Doctors VALUES (10,'ד\"ר לוי',1),(11,'ד\"ר כהן',1),(12,'ד\"ר שרה',2);

CREATE TABLE Products (ProductID INTEGER PRIMARY KEY, Category TEXT, UnitPrice INTEGER);
INSERT INTO Products VALUES (1,'Electronics',1000),(2,'Electronics',500),(3,'Food',20),(4,'Toys',50);

CREATE TABLE Students (StudentID INTEGER PRIMARY KEY, StudentName TEXT, GPA INTEGER, StartYear INTEGER);
INSERT INTO Students VALUES (1,'אבי',90,2019),(2,'נועה',88,2020),(3,'דן',95,2021),(4,'מאיה',80,2019),(5,'תום',85,2022),(6,'ליה',96,2021);

CREATE TABLE UserLogs (LogID INTEGER PRIMARY KEY, Status TEXT, LogDate TEXT);
INSERT INTO UserLogs VALUES (1,'Active','2024-01-01'),(2,'Expired','2024-02-01'),(3,'Active',NULL),(4,'Expired',NULL),(5,'Pending','2024-03-01');

CREATE TABLE Employees (EmpID INTEGER PRIMARY KEY, Name TEXT, Department TEXT, Salary INTEGER, Bonus INTEGER);
INSERT INTO Employees VALUES (1,'דנה','Sales',8000,500),(2,'יוסי','Sales',12000,NULL),(3,'רון','IT',15000,1000),(4,'גל','IT',9000,NULL),(5,'מור','HR',7000,NULL);

CREATE TABLE Cars (CarID INTEGER PRIMARY KEY, Color TEXT, Price INTEGER, Year INTEGER);
INSERT INTO Cars VALUES (1,'Red',150000,2020),(2,'Red',80000,2023),(3,'Blue',200000,2024),(4,'Red',50000,2019),(5,'Red',90000,2021);
`,

/* תיאור הטבלאות להצגה למשתמש */
sqlTables: [
  { name: "Shipments", cols: "ShipmentID, Region, Cost" },
  { name: "Clinics", cols: "ClinicID, ClinicName" },
  { name: "Doctors", cols: "DoctorID, DoctorName, ClinicID" },
  { name: "Products", cols: "ProductID, Category, UnitPrice" },
  { name: "Students", cols: "StudentID, StudentName, GPA, StartYear" },
  { name: "UserLogs", cols: "LogID, Status, LogDate" },
  { name: "Employees", cols: "EmpID, Name, Department, Salary, Bonus" },
  { name: "Cars", cols: "CarID, Color, Price, Year" }
],

/* ---------- שאלות SQL לתרגול (5 מהמבחן + תרגול נוסף) ---------- */
sqlQuestions: [
  { id: 16, exam: true,
    prompt: "טבלת Shipments(ShipmentID, Region, Cost). כתוב שאילתה המציגה את סכום העלויות הכולל לכל אזור, עבור אזורים שבהם הסכום גבוה מ-2,500.",
    solution: "SELECT Region, SUM(Cost) AS TotalCost\nFROM Shipments\nGROUP BY Region\nHAVING SUM(Cost) > 2500;",
    check: "select",
    hint: "מקבצים לפי Region, סוכמים Cost, ומסננים קבוצות עם HAVING (לא WHERE!)." },
  { id: 17, exam: true,
    prompt: "טבלאות Clinics(ClinicID, ClinicName) ו-Doctors(DoctorID, DoctorName, ClinicID). הצג את שם המרפאה ואת מספר הרופאים בכל מרפאה.",
    solution: "SELECT c.ClinicName, COUNT(d.DoctorID) AS NumDoctors\nFROM Clinics c\nINNER JOIN Doctors d ON d.ClinicID = c.ClinicID\nGROUP BY c.ClinicName;",
    check: "select",
    hint: "JOIN בין הטבלאות לפי ClinicID, COUNT על הרופאים, GROUP BY לפי שם המרפאה. (שים לב: INNER JOIN ישמיט מרפאות בלי רופאים — ל-LEFT JOIN ראה תרגיל 23.)" },
  { id: 18, exam: true,
    prompt: "טבלת Products(ProductID, Category, UnitPrice). עדכן את המחיר של כל המוצרים בקטגוריית 'Electronics' כך שיקטן ב-5%.",
    solution: "UPDATE Products\nSET UnitPrice = UnitPrice * 0.95\nWHERE Category = 'Electronics';",
    check: "mutate", mutateTable: "Products",
    hint: "UPDATE ... SET UnitPrice = UnitPrice * 0.95 ... WHERE Category='Electronics'. אל תשכח WHERE!" },
  { id: 19, exam: true,
    prompt: "טבלת Students(StudentID, StudentName, GPA, StartYear). הצג את כל פרטי הסטודנטים שה-GPA שלהם בין 85 ל-95, ושנת התחלתם אינה 2020.",
    solution: "SELECT *\nFROM Students\nWHERE GPA BETWEEN 85 AND 95\n  AND StartYear <> 2020;",
    check: "select",
    hint: "BETWEEN 85 AND 95 (כולל קצוות) ביחד עם StartYear <> 2020 (שונה מ-)." },
  { id: 20, exam: true,
    prompt: "טבלת UserLogs(LogID, Status, LogDate). מחק את כל הרשומות שבהן הסטטוס 'Expired' או שהתאריך ריק (NULL).",
    solution: "DELETE FROM UserLogs\nWHERE Status = 'Expired'\n   OR LogDate IS NULL;",
    check: "mutate", mutateTable: "UserLogs",
    hint: "DELETE FROM ... WHERE Status='Expired' OR LogDate IS NULL. זוכר — לא משווים = NULL!" },

  { id: 21, exam: false,
    prompt: "טבלת Cars(CarID, Color, Price, Year). הצג את כל הרכבים האדומים שמחירם מעל 100,000 או ששנתם אחרי 2022.",
    solution: "SELECT *\nFROM Cars\nWHERE Color = 'Red'\n  AND (Price > 100000 OR Year > 2022);",
    check: "select",
    hint: "שים לב לסוגריים סביב ה-OR — אחרת הלוגיקה משתנה." },
  { id: 22, exam: false,
    prompt: "טבלת Employees(EmpID, Name, Department, Salary, Bonus). כמה עובדים מקבלים בונוס בפועל (ערך לא-ריק)?",
    solution: "SELECT COUNT(Bonus) AS WithBonus\nFROM Employees;",
    check: "select",
    hint: "COUNT(Bonus) מתעלם מ-NULL — בדיוק מה שצריך כאן." },
  { id: 23, exam: false,
    prompt: "טבלאות Clinics ו-Doctors. הצג את כל המרפאות ומספר הרופאים בכל אחת — כולל מרפאות ללא רופאים (יציגו 0).",
    solution: "SELECT c.ClinicName, COUNT(d.DoctorID) AS NumDoctors\nFROM Clinics c\nLEFT JOIN Doctors d ON d.ClinicID = c.ClinicID\nGROUP BY c.ClinicName;",
    check: "select",
    hint: "כאן צריך LEFT JOIN כדי לשמר מרפאות בלי התאמה. COUNT(d.DoctorID) ייתן 0 עבורן." },
  { id: 24, exam: false,
    prompt: "טבלת Employees. הצג כל מחלקה והשכר הממוצע בה, רק עבור מחלקות שבהן השכר הממוצע מעל 9,000, מהגבוה לנמוך.",
    solution: "SELECT Department, AVG(Salary) AS AvgSalary\nFROM Employees\nGROUP BY Department\nHAVING AVG(Salary) > 9000\nORDER BY AvgSalary DESC;",
    check: "select",
    hint: "GROUP BY Department, HAVING על הממוצע, ORDER BY ... DESC בסוף." }
]
};
