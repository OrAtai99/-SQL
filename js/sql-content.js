/* ============================================================
   קורס 3964 — שפת SQL (מרצה: אפי פרופוס) — תוכן לימודי, מסלול SQL
   ------------------------------------------------------------
   SQLC.examTips   — דגשים חמים למבחן (HTML)
   SQLC.chapters   — 11 פרקי סיכום (track:'sql'); nosql-content.js מוסיף אחריהם את פרקי ה-NoSQL
   SQLC.syntax     — דף תחביר T-SQL מרוכז (קבוצות; mssql:true = הבדלי SQL Server)
   SQLC.flashcards — כרטיסיות זיכרון (טקסט רגיל)
   כל הפלטים שמוצגים בפרקים הופקו בהרצה אמיתית על סכימות האתר
   (practice = חוברת ה-JOIN · space = מצגת 6 · college2 = עבודת ישור קו).
   כשהתנהגות SQL Server שונה מהמנוע שבאתר (SQLite) — זה מצוין במפורש בטקסט.
   ============================================================ */
window.SQLC = window.SQLC || {};

/* ---------- דגשים חמים למבחן (SQL + NoSQL) ---------- */
SQLC.examTips = [
  'כל שאלה במבחן נפתרת <b>פעמיים</b> — שאילתת <b>SQL</b> וגם שאילתת <b>MongoDB</b> (בדיוק כמו ב"עבודת ישור קו"). לפני שכותבים: מאיזו טבלה/Collection מתחילים, אילו עמודות/שדות מוצגים, ואיזה סינון (למשל <code>status = \'Active\'</code>) נדרש בשתי השפות.',
  '"<b>כל</b> ה-X, <b>כולל</b> כאלה שאין להם Y" → <code>LEFT JOIN</code> (במונגו: <code>$lookup</code> — שהוא תמיד outer). "X <b>שאין</b> להם אף Y" → <code>LEFT JOIN … WHERE Y.id IS NULL</code> או <code>NOT EXISTS</code> (במונגו: <code>$lookup</code> ואז <code>{$match:{arr:{$size:0}}}</code>).',
  '<b>מלכודת ON מול WHERE:</b> תנאי על הטבלה הימנית של <code>LEFT JOIN</code> שנכתב ב-<code>WHERE</code> מוחק את שורות ה-NULL והופך את השאילתה ל-INNER. כדי לשמור את כולם — שים את התנאי בתוך ה-<code>ON</code> (חוברת תרגיל 13, מצגת 6 שקף 4).',
  '<b>WHERE</b> מסנן שורות <u>לפני</u> הקיבוץ, <b>HAVING</b> מסנן קבוצות <u>אחרי</u> <code>GROUP BY</code>. תנאי על <code>COUNT/SUM/AVG</code> → תמיד HAVING. וכל עמודה ב-SELECT שאינה בתוך פונקציית צבירה חייבת להופיע ב-<code>GROUP BY</code>.',
  '<b>NULL:</b> בודקים רק עם <code>IS NULL</code> (אף פעם <code>= NULL</code>). <code>COUNT(*)</code> סופר גם שורת NULL של LEFT JOIN (נותן 1 במקום 0) — השתמש ב-<code>COUNT(e.id)</code>. <code>AVG</code> מתעלם מ-NULL, ו-<code>NOT IN</code> מול רשימה שיש בה NULL מחזיר תוצאה ריקה.',
  '<b>T-SQL (SQL Server)</b>: <code>TOP n</code> ולא LIMIT, <code>ISNULL(x,0)</code>, שרשור עם <code>+</code>, <code>LEN()</code>, <code>GETDATE()</code>, <code>[שם עם רווח]</code>, טקסט בגרש בודד <code>\'...\'</code> בלבד (מרכאות כפולות = שם עמודה), ועברית עם <code>NVARCHAR</code> ו-<code>N\'...\'</code>.',
  '<code>AVG</code> על עמודת <b>INT</b> ב-SQL Server מחזיר מספר שלם (88.5 הופך ל-88)! כתוב <code>AVG(CAST(grade AS DECIMAL(5,2)))</code>, ואם צריך תצוגה של 2 ספרות — עטוף שוב ב-<code>CAST(… AS DECIMAL(10,2))</code>.',
  'קרא גבולות במדויק: "<b>מעל</b> 80" = <code>&gt; 80</code>, "80 <b>ומעלה</b>" = <code>&gt;= 80</code>, "יותר <b>משני</b> קורסים" = <code>COUNT(*) &gt; 2</code>. ב-<code>CASE</code> כתוב את התנאים מהגבוה לנמוך — ה-WHEN הראשון שמתקיים קובע.',
  'שאלות "המקסימום/המינימום" — עדיף <code>WHERE col = (SELECT MAX(col) FROM …)</code> על פני <code>TOP 1 … ORDER BY</code>, כי תת-השאילתה מחזירה <b>את כל השוויונות</b> (למשל 4 חייזרים עם 2 רגליים).',
  'בדיקה עצמית לפני הגשה: פסיקים בין עמודות (בלי פסיק לפני FROM), כינוי (alias) לכל טבלה ושימוש עקבי בו, <code>ON</code> לכל JOIN, ו-<code>DISTINCT</code> כשמבקשים "שמות" ושם יכול לחזור. ב-UPDATE/DELETE — תמיד <code>WHERE</code>.',
];

/* ---------- פרקי סיכום (track: sql) — nosql-content.js מוסיף אחריהם ---------- */
SQLC.chapters = [
  {
    id:'model', track:'sql', icon:'🧱', title:'המודל הרלציוני, מפתחות ואילוצי שלמות',
    html:`
<p>לפני שכותבים SQL צריך לדבר באותה שפה של המרצה (מצגת 2 — <i>The Relational Model – Recap</i>): מה זו טבלה, מה זה מפתח, ואילו <b>אילוצי שלמות</b> מסד הנתונים שומר. שאלות זיהוי ("איזה אילוץ הופר?") הן שאלות קלאסיות למבחן.</p>

<h4>מושגי יסוד — פורמלי מול יומיומי</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>מונח פורמלי</th><th>בשפה יומיומית</th><th>הסבר</th></tr>
<tr><td dir="ltr">Relation</td><td>טבלה</td><td>אוסף של רשומות עם אותו מבנה. שם הטבלה ייחודי בבסיס הנתונים.</td></tr>
<tr><td dir="ltr">Tuple</td><td>שורה / רשומה</td><td>רשימה סדורה של ערכים, למשל <code>&lt;492883, 'Dan Maor', …&gt;</code>.</td></tr>
<tr><td dir="ltr">Attribute</td><td>עמודה</td><td>שם עמודה — ייחודי בתוך הטבלה.</td></tr>
<tr><td dir="ltr">Data Item</td><td>ערך בתא</td><td>הערך שבמפגש שורה-עמודה.</td></tr>
<tr><td dir="ltr">Value Domain</td><td>מרחב ערכים</td><td>כל הערכים החוקיים לעמודה — טיפוס + פורמט + טווח. למשל ת"ז = 9 ספרות; מגדר ∈ {'Male','Female'}; טלפון בפורמט <code>dd-ddd-dddd</code>.</td></tr>
<tr><td dir="ltr">Schema</td><td>הגדרת הטבלה</td><td><code>R(A1, A2, …, An)</code> — שם הטבלה ורשימת העמודות.</td></tr>
<tr><td dir="ltr">State</td><td>הטבלה עם הנתונים</td><td>השורות שנמצאות בטבלה ברגע נתון. <b>Database State</b> = איחוד כל ה-states של כל הטבלאות.</td></tr>
</table></div>
<ul>
  <li><b>העמודות סדורות, השורות לא.</b> לכן אין "שורה ראשונה" בטבלה — סדר מובטח רק עם <code>ORDER BY</code>.</li>
  <li><b>Relation ≠ Relationship</b>: Relation היא טבלה; Relationship הוא <u>קשר</u> בין ישויות. בדוגמת המרצה <code>CUSTOMERS</code> היא ישות ו-<code>SALES</code> היא טבלה שמייצגת קשר (מי קנה מה).</li>
  <li><b>NULL</b> = ערך לא ידוע או לא רלוונטי. המתכנן מחליט לכל עמודה אם NULL מותר.</li>
  <li>אותו מרחב ערכים יכול לשמש שתי עמודות עם משמעות שונה — <code>Invoice-date</code> ו-<code>Payment-date</code> הן שתיהן Date.</li>
</ul>

<h4>מפתחות — מהרחב לצר</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>מושג</th><th>הגדרה</th><th>דוגמה</th></tr>
<tr><td><b>מפתח-על</b> (Superkey)</td><td>קבוצת עמודות שהשילוב שלהן <u>ייחודי בכל מצב חוקי</u> של הטבלה. לכל טבלה יש לפחות אחד (כל העמודות יחד), וכל הרחבה של מפתח-על היא גם מפתח-על.</td><td>אם ב-<code>R(a,b,c,d,e)</code> הקבוצה <code>{a,b,c}</code> היא מפתח-על, אז גם <code>{a,b,c,d}</code>, <code>{a,b,c,e}</code>, <code>{a,b,c,d,e}</code>.</td></tr>
<tr><td><b>מפתח</b> (Key)</td><td>מפתח-על <b>מינימלי</b> — אי אפשר להוריד ממנו אף עמודה בלי לאבד ייחודיות.</td><td><code>{Student-ID, Name, Address}</code> הוא מפתח-על אבל <u>לא</u> מפתח (אפשר להוריד Name ו-Address).</td></tr>
<tr><td><b>מפתח מועמד</b> (Candidate)</td><td>כל המפתחות האפשריים בטבלה. עמודה שנמצאת באחד מהם = <i>prime attribute</i>.</td><td>ב-STUDENTS: <code>{Student-ID}</code>, <code>{Cell-Phone}</code>, <code>{Name, Home-Phone}</code>.</td></tr>
<tr><td><b>מפתח ראשי</b> (PK)</td><td>המועמד שנבחר (כלל אצבע: זה עם הכי מעט עמודות). מסומן ב<u>קו תחתון</u>. לא יכול להיות NULL.</td><td>ב-CAR: <code>License_number</code>.</td></tr>
<tr><td><b>מפתח חלופי</b> (Alternate)</td><td>מועמד שלא נבחר להיות PK. ב-SQL מגדירים אותו עם <code>UNIQUE</code>.</td><td>ב-CAR: <code>Engine_serial_number</code>.</td></tr>
</table></div>

<p><b>מפתח מורכב (Composite PK)</b> — מפתח ראשי של כמה עמודות, כולן בקו תחתון:</p>
<ul>
  <li><code>SERVICE_CALLS (<u>Customer_ID</u>, <u>Date-time</u>, Category, …)</code> — אותו לקוח יכול להתקשר הרבה פעמים, אבל לא פעמיים באותו רגע.</li>
  <li><code>Aliens_in_trips (<u>t_no</u>, <u>id_no</u>)</code> — טבלת קישור: אותו חייזר באותו מסע פעם אחת.</li>
  <li><code>SALES (<u>Customer-ID</u>, <u>Product-ID</u>, <u>Location-ID</u>, <u>Sale-Date</u>, Quantity, …)</code> — שאלת המרצה "למה Sale-Date חלק מהמפתח?" → כדי שאותו לקוח יוכל לקנות את אותו מוצר באותו סניף <b>בתאריכים שונים</b>.</li>
</ul>

<p><b>תרגיל המרצה (מצגת 2, עמ' 17)</b> — האם הקבוצה היא מפתח בטבלת PRODUCTS, שיש בה 7 מוצרים?</p>
<div style="overflow-x:auto"><table class="mini">
<tr><th>קבוצת עמודות</th><th>לפי השורות הקיימות בלבד</th><th>בהנחה שיתווספו שורות</th></tr>
<tr><td dir="ltr">{Prod-ID}</td><td>Y</td><td>Y</td></tr>
<tr><td dir="ltr">{Prod-ID, Firm, Type}</td><td>N</td><td>N</td></tr>
<tr><td dir="ltr">{Firm, Product, Type}</td><td>N</td><td>N</td></tr>
<tr><td dir="ltr">{Firm, Product, Type, Package}</td><td>N</td><td>N</td></tr>
<tr><td dir="ltr">{Firm, Product, Price}</td><td>N</td><td>N</td></tr>
<tr><td dir="ltr">{Price}</td><td><b>Y</b></td><td><b>N</b></td></tr>
</table></div>
<div class="callout"><b>הלקח:</b> מפתח נקבע לפי <u>כל המצבים החוקיים</u> של הטבלה, לא לפי הנתונים שיש בה כרגע. כרגע אין שני מוצרים באותו מחיר — אבל אין שום כלל עסקי שמונע זאת, ולכן <code>{Price}</code> אינו מפתח. ו-<code>{Prod-ID, Firm, Type}</code> או <code>{Firm, Product, Price}</code> אמנם ייחודיים בנתונים, אבל הם לא <u>מינימליים</u> (Prod-ID לבד / Price לבד כבר ייחודיים) — לכן "N" כבר בעמודה הראשונה. <code>{Firm, Product, Type}</code> אפילו לא ייחודי: Tnuva | Milk | 1 Litter מופיע פעמיים (Paper ו-Plastic). ו-<code>{Firm, Product, Type, Package}</code> ייחודי בנתונים אבל שוב לא מינימלי — אפשר להוריד ממנו את Firm (או את Product) והוא עדיין ייחודי.</div>

<h4>מפתח זר (FK) והסימון של המרצה</h4>
<p>מפתח זר הוא עמודה בטבלה <b>המפנה</b> (referencing) שהערך שלה חייב להיות <b>PK קיים</b> בטבלה <b>המופנית</b> (referenced) — או NULL. בסכמה הטקסטואלית המרצה מסמן FK בשם הטבלה המופנית <b>בסוגריים</b> אחרי העמודה, וה-PK בקו תחתון:</p>
<pre>FACULTIES (<u>Faculty-ID</u>, Name, …)
STUDENTS  (<u>Student-ID</u>, Name, Faculty-ID (FACULTIES), …)</pre>
<p>מערכת המכללה מעבודת ישור קו (college2) באותו סימון:</p>
<pre>LECTURERS   (<u>id</u>, firstName, lastName, department, seniority)
STUDENTS    (<u>id</u>, firstName, lastName, email, phone, city, age, registrationYear)
COURSES     (<u>id</u>, courseName, credits, department, lecturerId (LECTURERS))
ENROLLMENTS (<u>id</u>, studentId (STUDENTS), courseId (COURSES), enrollmentDate, status)
ASSIGNMENTS (<u>id</u>, courseId (COURSES), title, maxGrade, dueDate)
SUBMISSIONS (<u>id</u>, studentId (STUDENTS), assignmentId (ASSIGNMENTS), courseId (COURSES),
             grade, submissionDate, status)</pre>
<ul>
  <li><b>FK שהוא חלק מה-PK</b> לא יכול להיות NULL: <code>SERVICE_CALLS (<u>Customer-ID (CUSTOMERS)</u>, <u>Date-Time</u>, …)</code>.</li>
  <li><b>FK שהוא גם ה-PK</b> = קשר <b>1:1</b>: <code>VIP_CUSTOMERS (<u>VIP-Customer-ID (CUSTOMERS)</u>, Credit-Line, …)</code>.</li>
  <li><b>FK שמפנה לאותה טבלה</b> = קשר <b>רקורסיבי</b>: <code>EMPLOYEES (<u>Employee-ID</u>, …, Supervisor (EMPLOYEES))</code> — המנהל הוא גם עובד.</li>
</ul>

<h4>ארבעת סוגי אילוצי השלמות</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>אילוץ</th><th>הכלל</th><th>דוגמה להפרה</th></tr>
<tr><td><b>Key</b> — אילוץ מפתח</td><td>אין שתי שורות עם אותו ערך מפתח.</td><td>שתי קריאות שירות עם אותו <code>(Customer ID, Date/Time)</code>.</td></tr>
<tr><td><b>Entity Integrity</b> — שלמות ישות</td><td>PK (וכל חלק ממנו) לא יכול להיות NULL.</td><td>Customer ID = NULL.</td></tr>
<tr><td><b>Domain</b> — מרחב ערכים</td><td>כל ערך שייך למרחב הערכים של העמודה (טיפוס, טווח, פורמט).</td><td>Length = <code>-3</code>, Length = <code>'Twelve'</code>, Satisfaction = <code>'Unhappy'</code>.</td></tr>
<tr><td><b>Referential Integrity</b> — שלמות הפניה</td><td>ערך FK קיים כ-PK בטבלה המופנית, או NULL.</td><td>מרצה עם Faculty-ID = <code>'HUM'</code> כשאין פקולטה כזו.</td></tr>
</table></div>
<div class="callout">NULL בעמודה <u>רגילה</u> (Category, Severity…) אינו בהכרח הפרה — "Not necessarily! Depending on business rules". רק NULL ב-PK הוא תמיד הפרה.</div>

<p><b>תרגיל המרצה (עמ' 40):</b> בטבלה <code>LECTURER (<u>Lecturer-ID</u>, Lecturer-Name, Faculty-ID (FACULTY))</code> קיימים 432, 393, 875, 173, והפקולטות הן SCI, ENG, ART. איזה אילוץ יופר בכל INSERT?</p>
<div style="overflow-x:auto"><table class="mini">
<tr><th>השורה שמכניסים</th><th>תשובה</th><th>למה</th></tr>
<tr><td dir="ltr">(a) NULL | Yoram Shomroni | SCI</td><td>Entity Integrity</td><td>PK ריק</td></tr>
<tr><td dir="ltr">(b) 393 | Yoram Shomroni | SCI</td><td>Key</td><td>393 כבר קיים</td></tr>
<tr><td dir="ltr">(c) 789 | 789 | ENG</td><td>Domain</td><td>שם מרצה לא יכול להיות מספר</td></tr>
<tr><td dir="ltr">(d) 392 | Yoram Shomroni | HUM</td><td>Referential Integrity</td><td>אין פקולטה HUM</td></tr>
<tr><td dir="ltr">(e) 589 | Yariv Barak | NULL</td><td>אין הפרה</td><td>FK רגיל רשאי להיות NULL; שם כפול אינו הפרה (השם אינו מפתח)</td></tr>
</table></div>

<h4>איזו פעולה יכולה להפר איזה אילוץ?</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>פעולה</th><th>אילו אילוצים עלולים להיות מופרים</th></tr>
<tr><td dir="ltr">INSERT</td><td>כל הארבעה: <code>Key, Entity, Domain, Referential</code>.</td></tr>
<tr><td dir="ltr">UPDATE</td><td>כל הארבעה — עדכון PK, FK או ערך רגיל.</td></tr>
<tr><td dir="ltr">DELETE</td><td><b>רק Referential Integrity</b> — כשמוחקים שורה שה-PK שלה מוזכר כ-FK בשורות אחרות (מחיקת פקולטה SCI כשמרצה 432 משויך אליה).</td></tr>
</table></div>

<h4>מה עושים כשפעולה מפרה שלמות הפניה?</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>אפשרות</th><th>משמעות</th><th>ב-SQL Server</th></tr>
<tr><td><b>RESTRICT / REJECT</b></td><td>הפעולה נדחית (ברירת המחדל).</td><td dir="ltr">ON DELETE NO ACTION</td></tr>
<tr><td><b>CASCADE</b></td><td>הפעולה "מתגלגלת": מחיקה/עדכון של שורת האב מוחקת/מעדכנת גם את שורות הבן.</td><td dir="ltr">ON DELETE CASCADE / ON UPDATE CASCADE</td></tr>
<tr><td><b>SET NULL</b></td><td>ה-FK בשורות הבן הופך ל-NULL. <u>לא אפשרי</u> כשה-FK הוא חלק מה-PK (או NOT NULL).</td><td dir="ltr">ON DELETE SET NULL</td></tr>
<tr><td><b>SET DEFAULT</b></td><td>ה-FK מקבל ערך ברירת מחדל שהוגדר מראש.</td><td dir="ltr">ON DELETE SET DEFAULT</td></tr>
<tr><td>להודיע / Trigger</td><td>לבצע ולהודיע למשתמש, או להפעיל טריגר/פרוצדורה שמתקנת.</td><td dir="ltr">CREATE TRIGGER …</td></tr>
</table></div>
<p>ההחלטה מתקבלת בשלב התכנון הלוגי ונכתבת ב-<code>CREATE TABLE</code>. מה יקרה ב-college2 כשמוחקים את הסטודנט David, שמספרו 1 והוא רשום בהרשמות 1, 2 ו-3?</p>
<pre>CONSTRAINT FK_enr_student FOREIGN KEY (studentId)
    REFERENCES students(id)
    ON DELETE CASCADE      -- DELETE FROM students WHERE id = 1  -&gt;  enrollments 1,2,3 are deleted too
    ON UPDATE CASCADE      -- UPDATE students SET id = 100 WHERE id = 1  -&gt;  studentId becomes 100
-- NO ACTION (default): the DELETE fails with error 547 (REFERENCE constraint conflict)
-- SET NULL           : enrollments 1,2,3 stay, with studentId = NULL</pre>
<p>שימו לב: ל-David יש גם הגשות (submissions 1–4). אם ל-FK של <code>submissions.studentId</code> אין <code>CASCADE</code>, ה-DELETE ייכשל בגללן (שגיאה 547) — גם כשל-enrollments כן הוגדר CASCADE. כל FK מקבל החלטה משלו.</p>

<h4>בדיקת שלמות עם SQL</h4>
<p>אפשר לבדוק בשאילתה אם הנתונים מפרים אילוץ. תוצאה ריקה = אין הפרה. ב-college2 הנתונים תקינים:</p>
<pre>SELECT e.id, e.courseId
FROM enrollments e
LEFT JOIN courses c ON c.id = e.courseId
WHERE c.id IS NULL;</pre><p><b>תוצאה:</b> Referential — הרשמות שמפנות לקורס שלא קיים — 0 שורות (תוצאה ריקה)</p>
<pre>SELECT email, COUNT(*) AS times
FROM students
GROUP BY email
HAVING COUNT(*) &gt; 1;</pre><p><b>תוצאה:</b> Key — ערך שחוזר בעמודה שאמורה להיות ייחודית — 0 שורות (תוצאה ריקה)</p>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li>"ייחודי בנתונים הנוכחיים" ≠ מפתח. מפתח הוא כלל על <u>כל</u> המצבים האפשריים (<code>{Price}</code>).</li>
  <li>מפתח = מפתח-על <b>מינימלי</b>. קבוצה ייחודית שאפשר להוריד ממנה עמודה — היא מפתח-על, לא מפתח.</li>
  <li>DELETE מפר <b>רק</b> שלמות הפניה. INSERT ו-UPDATE יכולים להפר את כל הארבעה.</li>
  <li>FK מותר להיות NULL (אלא אם הוא NOT NULL או חלק מה-PK); PK לעולם לא.</li>
  <li>SET NULL לא אפשרי כשה-FK הוא חלק מהמפתח הראשי.</li>
  <li>ב-MongoDB <b>אין</b> אכיפת FK: <code>studentId</code> במסמך הרשמה הוא סתם מספר — שמירת השלמות היא באחריות האפליקציה.</li>
</ul></div>
`
  },
  {
    id:'ddl', track:'sql', icon:'🏗️', title:'DDL — יצירה ושינוי של טבלאות',
    html:`
<p>שאילתה (Query) היא רצף פעולות רלציוניות: <b>קלט</b> — טבלה אחת או יותר, <b>פלט</b> — טבלה אחת. לפני שאפשר לשאול צריך להגדיר את הטבלאות — זה תפקיד ה-DDL.</p>

<h4>5 הרכיבים של SQL (מצגת 3)</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>רכיב</th><th>תפקיד</th><th>פקודות</th></tr>
<tr><td><b>DDL</b> — Data Definition</td><td>הגדרה ושינוי של אובייקטים (טבלאות, עמודות, מפתחות, אינדקסים)</td><td dir="ltr">CREATE, ALTER, DROP</td></tr>
<tr><td><b>DML</b> — Data Manipulation</td><td>שליפה, הוספה, עדכון ומחיקה של נתונים</td><td dir="ltr">SELECT, INSERT, UPDATE, DELETE</td></tr>
<tr><td><b>DCL</b> — Data Control</td><td>הרשאות ותפקידים</td><td dir="ltr">GRANT, REVOKE</td></tr>
<tr><td><b>TCL</b> — Transaction Control</td><td>ניהול טרנזקציות</td><td dir="ltr">BEGIN TRAN, COMMIT, ROLLBACK</td></tr>
<tr><td><b>S.P.</b> — Stored Procedures</td><td>תוכניות שרצות בשרת; יכולות להכיל פקודות מכל הסוגים</td><td dir="ltr">CREATE PROCEDURE, EXEC</td></tr>
</table></div>
<div class="callout">בשקף כתוב שדוגמה ל-TCL היא "Commit, Revoke" — זו טעות בשקף: <code>REVOKE</code> שייך ל-DCL, והזוג של COMMIT הוא <code>ROLLBACK</code>.</div>

<h4>מה מגדירים כשיוצרים טבלה?</h4>
<ul>
  <li><b>שם הטבלה</b>.</li>
  <li><b>עמודות</b> — שם, טיפוס נתונים, והאם NULL מותר.</li>
  <li><b>מפתחות</b> — מפתח ראשי ומפתחות זרים.</li>
  <li><b>אילוצים</b> — כללים שנאכפים בכל הוספה ועדכון: <code>CHECK</code>, <code>UNIQUE</code>, <code>DEFAULT</code>.</li>
</ul>

<h4>טיפוסי נתונים ב-SQL Server</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>טיפוס</th><th>מה שומר</th><th>הערות</th></tr>
<tr><td dir="ltr">INT</td><td>מספר שלם</td><td>עד כ-2.1 מיליארד.</td></tr>
<tr><td dir="ltr">DECIMAL(p,s) / NUMERIC(p,s)</td><td>עשרוני מדויק</td><td>p = סה"כ ספרות, s = ספרות אחרי הנקודה. <code>DECIMAL(5,2)</code> → עד 999.99 (הציון ב-submissions). <code>DECIMAL(10,2)</code> → עד 99999999.99 (כסף).</td></tr>
<tr><td dir="ltr">FLOAT</td><td>עשרוני בקירוב</td><td>לא לכסף — יש שגיאות עיגול.</td></tr>
<tr><td dir="ltr">CHAR(n)</td><td>טקסט באורך קבוע</td><td>מרופד ברווחים. מתאים לת"ז, מיקוד: <code>CHAR(5)</code>.</td></tr>
<tr><td dir="ltr">VARCHAR(n)</td><td>טקסט באורך משתנה</td><td>אנגלית/ספרות.</td></tr>
<tr><td dir="ltr">NVARCHAR(n)</td><td>טקסט יוניקוד</td><td><b>לעברית</b>. ליטרל עברי כותבים עם N: <code>N'חיפה'</code> (בלי N העברית עלולה להפוך ל-<code>????</code>).</td></tr>
<tr><td dir="ltr">DATE / TIME / DATETIME</td><td>תאריך / שעה / שניהם</td><td>ליטרל בפורמט <code>'YYYY-MM-DD'</code>.</td></tr>
<tr><td dir="ltr">BIT</td><td>בוליאני</td><td>0 / 1 (או NULL). אין BOOLEAN ב-SQL Server.</td></tr>
</table></div>

<h4>CREATE TABLE — NULL / NOT NULL ומפתח ראשי</h4>
<p>יש <b>שתי דרכים</b> להגדיר מפתח ראשי: <u>בשורת העמודה</u> (inline), או <u>כפסוקית נפרדת</u> בסוף ההגדרה. מפתח מורכב אפשר להגדיר רק בדרך השנייה.</p>
<pre>-- 1) inline
CREATE TABLE CUSTOMERS (
    CustomerID    INT          NOT NULL PRIMARY KEY,
    CustomerName  VARCHAR(50)  NULL,
    Gender        CHAR(1)      NULL,
    City          VARCHAR(50)  DEFAULT 'Tel-Aviv',
    ZipCode       CHAR(5)      NULL
);

-- 2) separate clause — required for a composite key
CREATE TABLE Aliens_in_trips (
    t_no   INT NOT NULL REFERENCES Trips(t_no),
    id_no  INT NOT NULL REFERENCES Aliens(id_no),
    PRIMARY KEY (t_no, id_no)
);</pre>
<div class="callout warn">כתיבת <code>PRIMARY KEY</code> ליד <u>שתי</u> עמודות נפרדות היא שגיאה — טבלה יכולה להכיל מפתח ראשי <b>אחד</b> בלבד. למפתח מורכב: <code>PRIMARY KEY (t_no, id_no)</code>.</div>

<h4>מפתח זר — שלוש צורות כתיבה</h4>
<pre>-- a) inline, as in the "ישור קו" assignment (the FOREIGN KEY keyword is optional)
lecturerId INT REFERENCES lecturers(id)

-- b) inline, as on slide 14
CustomerID INT NULL FOREIGN KEY REFERENCES CUSTOMERS (CustomerID)

-- c) named constraint at the end + referential actions (slides 20-21)
CONSTRAINT FK_CUSTOMER_ZIP FOREIGN KEY (ZipCode)
    REFERENCES ZIP_CODES (Zipcode)
    ON DELETE SET DEFAULT      -- referenced row deleted -&gt; set the default value
    ON UPDATE CASCADE          -- referenced value updated -&gt; update all referring rows</pre>
<p>ערך ה-FK חייב להתאים לטיפוס של ה-PK שאליו הוא מפנה, והטבלה המופנית חייבת להיות <b>קיימת קודם</b> — לכן יוצרים קודם את טבלאות "האב" — <code>lecturers, students</code> — ורק אחר כך את "הבנים" — <code>courses, enrollments</code>.</p>

<h4>DEFAULT, CHECK, UNIQUE — הדוגמה מהשקף</h4>
<pre>CREATE TABLE CUSTOMERS (
    CustomerID     INT          NOT NULL,
    CustomerName   VARCHAR(50)  NULL,
    Gender         CHAR(1)      NULL,
    City           VARCHAR(50)  NULL,
    ZipCode        CHAR(5)      NULL,
    CustomerLogin  VARCHAR(50)  NULL,
    PRIMARY KEY (CustomerID),                                          -- PK as a clause
    CONSTRAINT check_zip    CHECK (ZipCode LIKE '[0-9][0-9][0-9][0-9][0-9]'),  -- exactly 5 digits
    CONSTRAINT check_gender CHECK (Gender IN ('M', 'F')),              -- allowed values
    UNIQUE (CustomerLogin)                                             -- alternate key
);</pre>
<div style="overflow-x:auto"><table class="mini">
<tr><th>אילוץ</th><th>מה עושה</th><th>פרט שחשוב לזכור</th></tr>
<tr><td dir="ltr">DEFAULT v</td><td>ערך שנכנס כשלא מציינים את העמודה ב-INSERT</td><td>אם כותבים במפורש <code>NULL</code> — נכנס NULL, לא ה-DEFAULT.</td></tr>
<tr><td dir="ltr">CHECK (cond)</td><td>תנאי שכל שורה חייבת לקיים</td><td>תנאי שתוצאתו UNKNOWN (בגלל NULL) <b>עובר</b> את הבדיקה.</td></tr>
<tr><td dir="ltr">UNIQUE (cols)</td><td>מפתח חלופי — אין כפילויות</td><td>ב-SQL Server עמודת UNIQUE מרשה <b>NULL אחד בלבד</b>.</td></tr>
<tr><td dir="ltr">NOT NULL</td><td>חובה ערך</td><td>PRIMARY KEY הוא אוטומטית NOT NULL.</td></tr>
</table></div>
<p><b>תבניות LIKE בתוך CHECK</b> (סוגריים מרובעים הם תוספת של T-SQL):</p>
<div style="overflow-x:auto"><table class="mini">
<tr><th>תבנית</th><th>משמעות</th></tr>
<tr><td dir="ltr">'[0-9][0-9][0-9][0-9][0-9]'</td><td>בדיוק 5 תווים, כל אחד ספרה (מיקוד).</td></tr>
<tr><td dir="ltr">'05[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'</td><td>טלפון נייד: 05 ואחריו 8 ספרות.</td></tr>
<tr><td dir="ltr">'%[A-Z a-z]'</td><td>הדוגמה מהשקף (users): כל רצף, ו<b>התו האחרון</b> אות או רווח.</td></tr>
<tr><td dir="ltr">'%@%.%'</td><td>בדיקת מייל בסיסית: יש @ ואחריו נקודה.</td></tr>
</table></div>

<h4>IDENTITY — מספור אוטומטי</h4>
<pre>CREATE TABLE grade_log (
    logId      INT IDENTITY(1,1) PRIMARY KEY,   -- start at 1, step 1
    note       NVARCHAR(200),
    createdAt  DATETIME DEFAULT GETDATE()
);
INSERT INTO grade_log (note) VALUES (N'בדיקה');   -- logId = 1 automatically</pre>
<p>לא מכניסים ערך לעמודת IDENTITY (זו שגיאה, אלא אם מפעילים <code>SET IDENTITY_INSERT … ON</code>). המקבילה ב-MySQL היא <code>AUTO_INCREMENT</code>.</p>

<h4>דוגמה מלאה: מערכת המכללה (ישור קו) ב-T-SQL עם אילוצים</h4>
<pre>CREATE TABLE lecturers (
    id          INT           PRIMARY KEY,
    firstName   NVARCHAR(50)  NOT NULL,
    lastName    NVARCHAR(50)  NOT NULL,
    department  NVARCHAR(100),
    seniority   INT           DEFAULT 0 CHECK (seniority &gt;= 0)
);

CREATE TABLE students (
    id                INT           PRIMARY KEY,
    firstName         NVARCHAR(50)  NOT NULL,
    lastName          NVARCHAR(50)  NOT NULL,
    email             VARCHAR(100)  NOT NULL UNIQUE,              -- alternate key
    phone             CHAR(10),
    city              NVARCHAR(50)  DEFAULT N'Tel Aviv',
    age               INT           CHECK (age BETWEEN 16 AND 120),
    registrationYear  INT           DEFAULT YEAR(GETDATE()),
    CONSTRAINT check_phone CHECK (phone LIKE '05[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
);

CREATE TABLE courses (
    id          INT           PRIMARY KEY,
    courseName  NVARCHAR(100) NOT NULL,
    credits     INT           NOT NULL CHECK (credits &gt; 0),
    department  NVARCHAR(100),
    lecturerId  INT           REFERENCES lecturers(id)            -- FK inline
);

CREATE TABLE enrollments (
    id              INT          PRIMARY KEY,
    studentId       INT          NOT NULL,
    courseId        INT          NOT NULL,
    enrollmentDate  DATE         NOT NULL DEFAULT GETDATE(),
    status          VARCHAR(20)  NOT NULL DEFAULT 'Active',
    CONSTRAINT FK_enr_student FOREIGN KEY (studentId) REFERENCES students(id)
        ON DELETE CASCADE,
    CONSTRAINT FK_enr_course  FOREIGN KEY (courseId)  REFERENCES courses(id),
    CONSTRAINT check_status   CHECK (status IN ('Active', 'Inactive')),
    CONSTRAINT UQ_enr         UNIQUE (studentId, courseId)        -- no double enrollment
);</pre>

<h4>DROP TABLE — מחיקת הטבלה עצמה</h4>
<pre>DROP TABLE enrollments;            -- children first
DROP TABLE courses;
DROP TABLE IF EXISTS grade_log;    -- SQL Server 2016+: no error if it does not exist</pre>
<ul>
  <li>אי אפשר להריץ <code>CREATE TABLE</code> על טבלה שכבר קיימת — קודם <code>DROP</code>.</li>
  <li>אי אפשר למחוק טבלה שטבלה אחרת מפנה אליה ב-FK — מוחקים קודם את הבנים (enrollments) ואז את האב (courses).</li>
  <li><code>DROP</code> מוחק את <b>המבנה וכל הנתונים</b>; <code>DELETE</code> מוחק רק שורות (ראו פרק DML).</li>
</ul>

<h4>ALTER TABLE — שינוי מבנה של טבלה קיימת</h4>
<p>בשקפים 22–24 חלק מהצורות <b>אינן T-SQL תקין</b>. כך כותבים אותן ב-SQL Server בפועל:</p>
<div style="overflow-x:auto"><table class="mini">
<tr><th>פעולה</th><th>כפי שבשקף</th><th>ב-SQL Server</th></tr>
<tr><td>הוספת עמודה</td><td dir="ltr">ALTER TABLE customers ADD customer_login varchar(20) NULL</td><td dir="ltr">✔ זהה</td></tr>
<tr><td>שינוי טיפוס</td><td dir="ltr">ALTER TABLE customers ALTER customer_login char[10] NULL</td><td dir="ltr">ALTER TABLE customers ALTER COLUMN customer_login CHAR(10) NULL;</td></tr>
<tr><td>שינוי שם עמודה</td><td dir="ltr">ALTER TABLE customers RENAME COLUMN customer_login to cust_login</td><td dir="ltr">EXEC sp_rename 'customers.customer_login', 'cust_login', 'COLUMN';</td></tr>
<tr><td>ברירת מחדל</td><td dir="ltr">ALTER TABLE customers ALTER city SET DEFAULT 'Tel-Aviv'</td><td dir="ltr">ALTER TABLE customers ADD CONSTRAINT DF_city DEFAULT 'Tel-Aviv' FOR City;</td></tr>
<tr><td>הוספת אילוץ</td><td dir="ltr">ALTER TABLE customers ADD CONSTRAINT check_zip CHECK (…),</td><td dir="ltr">✔ זהה (בלי הפסיק בסוף)</td></tr>
<tr><td>הסרת אילוץ</td><td dir="ltr">ALTER TABLE customers DROP CONSTRAINT check_zip</td><td dir="ltr">✔ זהה</td></tr>
<tr><td>הסרת עמודה</td><td dir="ltr">ALTER TABLE customers DROP COLUMN customer_login</td><td dir="ltr">✔ זהה</td></tr>
</table></div>
<div class="callout"><b>שלושת התיקונים שחייבים לזכור ל-SQL Server:</b>
<ul>
  <li>שינוי טיפוס — <code>ALTER COLUMN</code> (עם המילה COLUMN, וטיפוס בסוגריים עגולים <code>CHAR(10)</code> ולא <code>char[10]</code>).</li>
  <li>שינוי שם — אין <code>RENAME COLUMN</code> ב-T-SQL; כותבים <code>EXEC sp_rename 'customers.customer_login', 'cust_login', 'COLUMN';</code></li>
  <li>ברירת מחדל לעמודה קיימת — אין <code>SET DEFAULT</code>; מוסיפים אילוץ: <code>ADD CONSTRAINT DF_city DEFAULT 'Tel-Aviv' FOR City</code>.</li>
</ul></div>
<p>עוד צורות שימושיות:</p>
<pre>ALTER TABLE enrollments ADD CONSTRAINT FK_enr_course
    FOREIGN KEY (courseId) REFERENCES courses(id);          -- add a FK later
ALTER TABLE students ADD isActive BIT NOT NULL DEFAULT 1;   -- existing rows get 1
ALTER TABLE students ADD CONSTRAINT UQ_students_email UNIQUE (email);</pre>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li>עמודת טקסט עברית → <code>NVARCHAR</code> וליטרל <code>N'...'</code>.</li>
  <li><code>DECIMAL(5,2)</code> מחזיק עד 999.99 — לא 99999.99. ה-p כולל גם את הספרות שאחרי הנקודה.</li>
  <li><code>ALTER COLUMN</code> (עם המילה COLUMN!), ושינוי שם רק עם <code>sp_rename</code>.</li>
  <li>אי אפשר <code>DROP COLUMN</code> לעמודה שיש עליה אילוץ (DEFAULT/CHECK/FK) — קודם <code>DROP CONSTRAINT</code>. זו הסיבה לתת לאילוצים <b>שמות</b>.</li>
  <li>הוספת עמודת <code>NOT NULL</code> לטבלה עם נתונים — רק עם <code>DEFAULT</code>.</li>
  <li>סדר יצירה: אב לפני בן. סדר מחיקה: בן לפני אב.</li>
</ul></div>
`
  },
  {
    id:'dml', track:'sql', icon:'✏️', title:'DML — הוספה, עדכון ומחיקה',
    html:`
<p>DML עובד על <b>הנתונים</b> שבתוך הטבלאות. "The Big 4": <code>INSERT</code> (הוספה), <code>UPDATE</code> (עדכון), <code>DELETE</code> (מחיקה) ו-<code>SELECT</code> (שליפה — בפרקים הבאים). כל הדוגמאות כאן רצו על מערכת המכללה (college2) — כל דוגמה מתחילה מהנתונים המקוריים.</p>
<p>הערה על התצוגה: <code>grade</code> בטבלת submissions הוא <code>DECIMAL(5,2)</code>, ולכן ב-SQL Server ציון יוצג <code>85.00</code>. בטבלאות התוצאה בפרקים הוא מוצג כמו במנוע של האתר — <code>85</code>. הערך זהה.</p>

<h4>INSERT בלי רשימת עמודות</h4>
<p>חייבים לתת ערך ל<b>כל</b> העמודות, <b>בדיוק בסדר שבו הן מוגדרות בטבלה</b>. טקסט ותאריכים בין גרשיים בודדים.</p>
<pre>INSERT INTO students
VALUES (11, 'Roni', 'Bar', 'roni@gmail.com', '0501112233', 'Haifa', 24, 2025);

SELECT * FROM students WHERE id = 11;</pre><p><b>תוצאה:</b> שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>firstName</th><th>lastName</th><th>email</th><th>phone</th><th>city</th><th>age</th><th>registrationYear</th></tr><tr><td>11</td><td>Roni</td><td>Bar</td><td>roni@gmail.com</td><td>0501112233</td><td>Haifa</td><td>24</td><td>2025</td></tr></table></div>

<h4>INSERT עם רשימת עמודות</h4>
<p>אפשר כל <b>סדר</b> ורשימה <b>חלקית</b>. עמודה שלא צוינה מקבלת את ה-<code>DEFAULT</code> שלה, ואם אין — <code>NULL</code> (ואם היא NOT NULL בלי DEFAULT — שגיאה).</p>
<pre>INSERT INTO students (id, lastName, firstName, city)
VALUES (12, 'Ben', 'Gal', 'Eilat');

SELECT * FROM students WHERE id = 12;</pre><p><b>תוצאה:</b> שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>firstName</th><th>lastName</th><th>email</th><th>phone</th><th>city</th><th>age</th><th>registrationYear</th></tr><tr><td>12</td><td>Gal</td><td>Ben</td><td><i>NULL</i></td><td><i>NULL</i></td><td>Eilat</td><td><i>NULL</i></td><td><i>NULL</i></td></tr></table></div>

<h4>כמה שורות בפקודה אחת</h4>
<pre>INSERT INTO lecturers (id, firstName, lastName, department, seniority)
VALUES (5, 'Yael', 'Bar', 'Business', 2),
       (6, 'Tal',  'Oz',  'Data Science', 9);

SELECT * FROM lecturers;</pre><p><b>תוצאה:</b> 6 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>firstName</th><th>lastName</th><th>department</th><th>seniority</th></tr><tr><td>1</td><td>Moshe</td><td>Cohen</td><td>Information Systems</td><td>12</td></tr><tr><td>2</td><td>Rina</td><td>Levi</td><td>Information Systems</td><td>7</td></tr><tr><td>3</td><td>Avi</td><td>Peretz</td><td>Business</td><td>15</td></tr><tr><td>4</td><td>Dana</td><td>Klein</td><td>Data Science</td><td>3</td></tr><tr><td>5</td><td>Yael</td><td>Bar</td><td>Business</td><td>2</td></tr><tr><td>6</td><td>Tal</td><td>Oz</td><td>Data Science</td><td>9</td></tr></table></div>

<h4>INSERT … SELECT — הכנסת תוצאה של שאילתה</h4>
<p>במקום <code>VALUES</code> כותבים <code>SELECT</code>; מספר העמודות והטיפוסים צריכים להתאים.</p>
<pre>CREATE TABLE #inactive (studentId INT, courseId INT);

INSERT INTO #inactive (studentId, courseId)
SELECT studentId, courseId
FROM enrollments
WHERE status = 'Inactive';

SELECT * FROM #inactive;</pre><p><b>תוצאה:</b> 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>studentId</th><th>courseId</th></tr><tr><td>2</td><td>4</td></tr><tr><td>9</td><td>5</td></tr></table></div>

<h4>UPDATE — עדכון שורות קיימות</h4>
<p>תחביר: <code>UPDATE טבלה SET עמודה = ערך, עמודה = ערך … WHERE תנאי</code>. אפשר כמה השמות ב-SET אחד, מופרדות בפסיקים.</p>
<pre>UPDATE students
SET phone = '0500000000', city = 'Tel Aviv'
WHERE id = 10;

SELECT id, firstName, phone, city FROM students WHERE id = 10;</pre><p><b>תוצאה:</b> שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>firstName</th><th>phone</th><th>city</th></tr><tr><td>10</td><td>Lior</td><td>0500000000</td><td>Tel Aviv</td></tr></table></div>
<p>ב-SET מותר חישוב שמשתמש בערך הקודם. שימו לב: <code>NULL + 5</code> הוא עדיין <code>NULL</code> (הגשה 12 טרם נבדקה):</p>
<pre>UPDATE submissions
SET grade = grade + 5
WHERE courseId = 4;

SELECT id, courseId, grade FROM submissions WHERE courseId = 4;</pre><p><b>תוצאה:</b> 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>courseId</th><th>grade</th></tr><tr><td>6</td><td>4</td><td>75</td></tr><tr><td>12</td><td>4</td><td><i>NULL</i></td></tr></table></div>
<p>עדכון לפי טבלה אחרת — עם תת-שאילתה (עובד בכל מסד נתונים):</p>
<pre>UPDATE enrollments
SET status = 'Inactive'
WHERE studentId IN (SELECT id FROM students WHERE city = 'Jerusalem');</pre><p><b>הודעה:</b> <code>(2 rows affected)</code></p>
<p>ב-T-SQL אפשר גם <code>UPDATE … FROM … JOIN</code> (תחביר של SQL Server, לא SQL סטנדרטי — במבחן שתי הצורות תקינות):</p>
<pre>UPDATE e
SET e.status = 'Inactive'
FROM enrollments e
JOIN students s ON s.id = e.studentId
WHERE s.city = 'Jerusalem';</pre>

<h4>DELETE — מחיקת שורות</h4>
<pre>DELETE FROM submissions
WHERE grade IS NULL;</pre><p><b>הודעה:</b> <code>(2 rows affected)</code></p>
<p>ב-T-SQL מותר גם לכתוב <code>DELETE submissions WHERE …</code> (בלי FROM) — אבל הצורה הסטנדרטית עם FROM עדיפה.</p>

<div class="callout warn"><b>"A root for disasters!"</b> — UPDATE או DELETE <b>בלי WHERE</b> פועלים על <u>כל</u> הטבלה:
<pre>UPDATE students SET city = 'Haifa';     -- every student now lives in Haifa!</pre><p><b>הודעה:</b> <code>(10 rows affected)</code></p>
<pre>DELETE FROM submissions;               -- all rows deleted…

SELECT COUNT(*) AS rows_left FROM submissions;   -- …but the table still exists</pre><p><b>תוצאה:</b> שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>rows_left</th></tr><tr><td>0</td></tr></table></div>
</div>
<p><b>הרגל טוב:</b> כתבו קודם <code>SELECT * FROM … WHERE …</code> עם אותו תנאי, ודאו שחוזרות בדיוק השורות הנכונות — ורק אז החליפו ל-UPDATE/DELETE. ב-SQL Server אפשר גם לעטוף ב-<code>BEGIN TRAN … ROLLBACK</code> כדי לנסות בלי לשמור.</p>

<h4>DELETE מול TRUNCATE מול DROP</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>פקודה</th><th>מה נמחק</th><th>WHERE?</th><th>הערות</th></tr>
<tr><td dir="ltr">DELETE FROM t [WHERE …]</td><td>שורות (חלק או כולן)</td><td>כן</td><td>DML; מפעיל טריגרים; המבנה נשאר.</td></tr>
<tr><td dir="ltr">TRUNCATE TABLE t</td><td>כל השורות</td><td>לא</td><td>מהיר; מאפס IDENTITY; לא עובד על טבלה ש-FK מפנה אליה.</td></tr>
<tr><td dir="ltr">DROP TABLE t</td><td>הטבלה עצמה + הנתונים</td><td>לא</td><td>DDL; המבנה נעלם — צריך CREATE מחדש.</td></tr>
</table></div>

<h4>DML ושלמות הפניה</h4>
<ul>
  <li><code>DELETE FROM courses WHERE id = 1;</code> ב-SQL Server <b>ייכשל</b> (שגיאה 547, "conflicted with the REFERENCE constraint") כי הרשמות, מטלות והגשות מפנות לקורס — אלא אם הוגדר <code>ON DELETE CASCADE</code>. מוחקים קודם את הבנים.</li>
  <li><code>INSERT</code> של הרשמה עם <code>courseId = 99</code> שלא קיים — ייכשל באותה שגיאה (FK).</li>
  <li>INSERT עם id שכבר קיים — שגיאה 2627 "Violation of PRIMARY KEY constraint".</li>
  <li>הערה: במנוע של האתר (SQLite) אילוצי FK <b>לא</b> נאכפים, ולכן מחיקות כאלה "יצליחו" — במבחן תמיד חשבו כמו SQL Server.</li>
</ul>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li>INSERT בלי רשימת עמודות — מספר הערכים והסדר חייבים להתאים בדיוק לטבלה.</li>
  <li>טקסט בגרש בודד <code>'Haifa'</code>, לא במרכאות כפולות ולא בגרשיים "חכמים" ‘…’ שמגיעים מ-Word.</li>
  <li><code>SET a = 1 AND b = 2</code> — שגוי! בין השמות ב-SET מפרידים ב<b>פסיק</b>: <code>SET a = 1, b = 2</code>.</li>
  <li><code>WHERE grade = NULL</code> לא יעדכן/ימחק כלום — צריך <code>IS NULL</code>.</li>
  <li>UPDATE/DELETE בלי WHERE = כל הטבלה. DELETE לא מוחק את המבנה; DROP כן.</li>
</ul></div>
`
  },
  {
    id:'select', track:'sql', icon:'🔍', title:'SELECT ו-WHERE — שליפה וסינון',
    html:`
<h4>המבנה הכללי</h4>
<pre>SELECT    &lt;attribute list&gt;        -- mandatory
FROM      &lt;table list&gt;            -- mandatory
WHERE     &lt;condition&gt;             -- optional: filters rows
GROUP BY  &lt;grouping attributes&gt;   -- optional
HAVING    &lt;group condition&gt;       -- optional
ORDER BY  &lt;attribute list&gt;        -- optional</pre>
<p><code>SELECT</code> ו-<code>FROM</code> הם <b>חובה</b>; כל השאר אופציונלי, אבל <b>הסדר קבוע</b>. אם אף שורה לא עומדת בתנאי — מתקבלת תוצאה ריקה (לא שגיאה).</p>

<h4>DISTINCT, כינויים ו-*</h4>
<pre>SELECT DISTINCT city
FROM students
ORDER BY city;</pre><p><b>תוצאה:</b> 6 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>city</th></tr><tr><td>Beer Sheva</td></tr><tr><td>Haifa</td></tr><tr><td>Holon</td></tr><tr><td>Jerusalem</td></tr><tr><td>Ramat Gan</td></tr><tr><td>Tel Aviv</td></tr></table></div>
<p><code>DISTINCT</code> מסיר שורות כפולות <b>מהתוצאה</b> (10 סטודנטים → 6 ערים). הוא חל על <u>כל השורה</u>: <code>SELECT DISTINCT city, age</code> מסיר רק צירופים זהים של עיר+גיל.</p>
<pre>SELECT s.firstName AS [First Name], s.age AS Age
FROM students AS s
WHERE s.city = 'Haifa';</pre><p><b>תוצאה:</b> 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>First Name</th><th>Age</th></tr><tr><td>Noa</td><td>21</td></tr><tr><td>Shira</td><td>20</td></tr></table></div>
<ul>
  <li><b>כינוי לטבלה</b> (<code>students AS s</code> או פשוט <code>students s</code>) — מקצר, וחובה כשאותה טבלה מופיעה פעמיים.</li>
  <li><b>כינוי לעמודה</b> (<code>AS Age</code>) — משנה את כותרת העמודה בפלט. כינוי עם רווח או מקף — בסוגריים מרובעים: <code>[First Name]</code>.</li>
  <li><code>SELECT *</code> — כל העמודות, בסדר שבו הוגדרו.</li>
</ul>

<h4>עמודות מחושבות ופונקציות</h4>
<p>עמודה מחושבת היא ביטוי חשבוני ב-SELECT, עם כינוי. הדוגמה הזו רצה על טבלת <code>Courses</code> של חוברת התרגילים (practice); שאר הדוגמאות בפרק — על college2.</p>
<pre>SELECT course_name, price, price * 1.17 AS price_with_vat
FROM Courses;</pre><p><b>תוצאה:</b> 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>course_name</th><th>price</th><th>price_with_vat</th></tr><tr><td>SQL</td><td>1200</td><td>1404.00</td></tr><tr><td>Java</td><td>1500</td><td>1755.00</td></tr><tr><td>Python</td><td>1800</td><td>2106.00</td></tr><tr><td>Networks</td><td>1300</td><td>1521.00</td></tr></table></div>
<p>בשקף 34 מופיעה גם צורת כינוי ייחודית ל-T-SQL: <code>Amount = Quantity*Price</code> (שקול ל-<code>Quantity*Price AS Amount</code>), ושם עמודה עם מקף בסוגריים מרובעים — <code>[Sale-ID]</code>. בלי הסוגריים SQL Server יקרא את <code>Sale-ID</code> כ"Sale פחות ID".</p>
<pre>SELECT firstName, lastName,
       UPPER(lastName)                     AS upperLast,
       LEFT(firstName, 1) + LEFT(lastName, 1) AS initials,
       LEN(email)                          AS emailLength
FROM students
WHERE id &lt;= 3;</pre><p><b>תוצאה:</b> ב-SQL Server — 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>lastName</th><th>upperLast</th><th>initials</th><th>emailLength</th></tr><tr><td>David</td><td>Levi</td><td>LEVI</td><td>DL</td><td>15</td></tr><tr><td>Noa</td><td>Cohen</td><td>COHEN</td><td>NC</td><td>13</td></tr><tr><td>Yossi</td><td>Mizrahi</td><td>MIZRAHI</td><td>YM</td><td>15</td></tr></table></div>
<p>(זו הדוגמה משקף 35: <code>Upper(Left(FirstName, 1) + Left(LastName, 1))</code>. במנוע של האתר אין <code>LEFT()</code>, ושרשור <code>+</code> של שתי עמודות בלי טקסט קבוע ביניהן לא מומר — לכן את הדוגמה הזו מתרגלים בכתיבה.)</p>
<pre>SELECT id, enrollmentDate,
       YEAR(enrollmentDate)  AS y,
       MONTH(enrollmentDate) AS m,
       DAY(enrollmentDate)   AS d
FROM enrollments
WHERE id &lt;= 3;</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>enrollmentDate</th><th>y</th><th>m</th><th>d</th></tr><tr><td>1</td><td>2025-10-01</td><td>2025</td><td>10</td><td>1</td></tr><tr><td>2</td><td>2025-10-01</td><td>2025</td><td>10</td><td>1</td></tr><tr><td>3</td><td>2025-10-03</td><td>2025</td><td>10</td><td>3</td></tr></table></div>
<pre>SELECT title, dueDate,
       DATEDIFF(day, '2025-12-01', dueDate) AS daysFromDec1
FROM assignments;</pre><p><b>תוצאה:</b> 7 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>title</th><th>dueDate</th><th>daysFromDec1</th></tr><tr><td>Aggregation Project</td><td>2025-12-31</td><td>30</td></tr><tr><td>CRUD Exercise</td><td>2025-11-15</td><td>-16</td></tr><tr><td>Joins Homework</td><td>2025-11-30</td><td>-1</td></tr><tr><td>Pandas Lab</td><td>2025-12-10</td><td>9</td></tr><tr><td>Market Research</td><td>2025-12-20</td><td>19</td></tr><tr><td>Regression Task</td><td>2025-12-15</td><td>14</td></tr><tr><td>Stored Procedures</td><td>2026-01-10</td><td>40</td></tr></table></div>
<div style="overflow-x:auto"><table class="mini">
<tr><th>פונקציה</th><th>דוגמה</th><th>תוצאה</th></tr>
<tr><td dir="ltr">ROUND(x, n)</td><td dir="ltr">ROUND(85.456, 1)</td><td dir="ltr">85.500 (SQL Server שומר את מספר הספרות ומאפס)</td></tr>
<tr><td dir="ltr">UPPER / LOWER</td><td dir="ltr">UPPER('levi')</td><td dir="ltr">LEVI</td></tr>
<tr><td dir="ltr">LEFT / RIGHT</td><td dir="ltr">LEFT('David', 2)</td><td dir="ltr">Da</td></tr>
<tr><td dir="ltr">SUBSTRING(s, start, len)</td><td dir="ltr">SUBSTRING('David', 2, 3)</td><td dir="ltr">avi</td></tr>
<tr><td dir="ltr">LEN</td><td dir="ltr">LEN('Noa')</td><td dir="ltr">3</td></tr>
<tr><td dir="ltr">YEAR / MONTH / DAY</td><td dir="ltr">YEAR('2025-10-01')</td><td dir="ltr">2025</td></tr>
<tr><td dir="ltr">GETDATE()</td><td dir="ltr">GETDATE()</td><td>התאריך והשעה עכשיו</td></tr>
<tr><td dir="ltr">DATEDIFF(unit, start, end)</td><td dir="ltr">DATEDIFF(day, '2025-12-01', '2025-12-31')</td><td dir="ltr">30 (end פחות start)</td></tr>
</table></div>

<h4>WHERE — אופרטורים</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>אופרטור</th><th>משמעות</th></tr>
<tr><td dir="ltr">=  &lt;&gt;  &lt;  &gt;  &lt;=  &gt;=</td><td>השוואה (<code>&lt;&gt;</code> = שונה; גם <code>!=</code> עובד ב-SQL Server)</td></tr>
<tr><td dir="ltr">AND  OR  NOT</td><td>צירוף תנאים — <b>AND קודם ל-OR</b></td></tr>
<tr><td dir="ltr">BETWEEN a AND b</td><td>טווח <b>כולל</b> את שני הקצוות</td></tr>
<tr><td dir="ltr">IN (v1, v2, …) / NOT IN</td><td>אחד מתוך רשימה</td></tr>
<tr><td dir="ltr">IS NULL / IS NOT NULL</td><td>בדיקת ערך חסר</td></tr>
<tr><td dir="ltr">LIKE 'pattern'</td><td>התאמת תבנית טקסט</td></tr>
</table></div>
<pre>SELECT firstName, city, age
FROM students
WHERE city &lt;&gt; 'Tel Aviv' AND age &gt;= 25;</pre><p><b>תוצאה:</b> 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>city</th><th>age</th></tr><tr><td>Yossi</td><td>Jerusalem</td><td>25</td></tr><tr><td>Eyal</td><td>Jerusalem</td><td>26</td></tr></table></div>
<p>בתנאי מותר חישוב או פונקציה: <code>WHERE Quantity*Price &gt; 5000</code>, <code>WHERE YEAR(ShipmentDate) = 2007</code>.</p>

<h4>AND / OR — סוגריים משנים את התשובה (שקף 38)</h4>
<p>נתונה הטבלה Customers (טבלת הקלט, 3 שורות):</p>
<div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>CustID</th><th>Age</th><th>Active</th><th>Group</th></tr><tr><td>1</td><td>16</td><td>1</td><td>A</td></tr><tr><td>2</td><td>18</td><td>1</td><td>B</td></tr><tr><td>3</td><td>20</td><td>0</td><td>B</td></tr></table></div>
<div style="overflow-x:auto"><table class="mini">
<tr><th>תנאי</th><th>מחזיר</th></tr>
<tr><td dir="ltr">WHERE (Age &gt; 18) AND ((Active = 1) OR ([Group] = 'B'))</td><td><b>CustID 3 בלבד</b></td></tr>
<tr><td dir="ltr">WHERE ((Age &gt; 18) AND (Active = 1)) OR ([Group] = 'B')</td><td><b>CustID 2 ו-3</b></td></tr>
<tr><td dir="ltr">WHERE Age &gt; 18 AND Active = 1 OR [Group] = 'B'</td><td>כמו השני (AND מתבצע לפני OR) → 2 ו-3</td></tr>
</table></div>
<p>(בשקף כתוב <code>Group = B</code>; בפועל <code>Group</code> היא מילה שמורה ולכן <code>[Group]</code>, והערך הוא טקסט — <code>'B'</code>.) אותו דבר על college2:</p>
<pre>SELECT firstName, city, age
FROM students
WHERE city = 'Haifa' OR city = 'Tel Aviv' AND age &gt; 22;</pre><p><b>תוצאה:</b> בלי סוגריים: כל חיפה + תל אביב מעל 22 — 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>city</th><th>age</th></tr><tr><td>David</td><td>Tel Aviv</td><td>23</td></tr><tr><td>Noa</td><td>Haifa</td><td>21</td></tr><tr><td>Shira</td><td>Haifa</td><td>20</td></tr><tr><td>Itai</td><td>Tel Aviv</td><td>27</td></tr></table></div>
<pre>SELECT firstName, city, age
FROM students
WHERE (city = 'Haifa' OR city = 'Tel Aviv') AND age &gt; 22;</pre><p><b>תוצאה:</b> עם סוגריים: רק מי שמעל 22 — 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>city</th><th>age</th></tr><tr><td>David</td><td>Tel Aviv</td><td>23</td></tr><tr><td>Itai</td><td>Tel Aviv</td><td>27</td></tr></table></div>

<h4>BETWEEN — כולל את הקצוות</h4>
<pre>SELECT firstName, age
FROM students
WHERE age BETWEEN 22 AND 24;</pre><p><b>תוצאה:</b> 5 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>age</th></tr><tr><td>David</td><td>23</td></tr><tr><td>Maya</td><td>22</td></tr><tr><td>Omer</td><td>24</td></tr><tr><td>Tamar</td><td>23</td></tr><tr><td>Lior</td><td>22</td></tr></table></div>
<pre>SELECT id, studentId, enrollmentDate
FROM enrollments
WHERE enrollmentDate BETWEEN '2025-10-05' AND '2025-10-08';</pre><p><b>תוצאה:</b> 6 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>studentId</th><th>enrollmentDate</th></tr><tr><td>5</td><td>2</td><td>2025-10-05</td></tr><tr><td>7</td><td>4</td><td>2025-10-06</td></tr><tr><td>8</td><td>4</td><td>2025-10-06</td></tr><tr><td>9</td><td>5</td><td>2025-10-07</td></tr><tr><td>10</td><td>6</td><td>2025-10-08</td></tr><tr><td>11</td><td>7</td><td>2025-10-08</td></tr></table></div>
<div class="callout">עם <code>DATETIME</code> (תאריך + שעה) הגבול העליון <code>'2025-10-08'</code> הוא חצות בתחילת היום — הרשמה מ-<code>2025-10-08 14:00</code> <b>לא</b> תיכלל. בטוח יותר: <code>&gt;= '2025-10-05' AND &lt; '2025-10-09'</code>.</div>

<h4>IN / NOT IN</h4>
<pre>SELECT firstName, city
FROM students
WHERE city IN ('Haifa', 'Holon');</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>city</th></tr><tr><td>Noa</td><td>Haifa</td></tr><tr><td>Shira</td><td>Haifa</td></tr><tr><td>Lior</td><td>Holon</td></tr></table></div>
<p><code>NOT IN ('Tel Aviv', 'Haifa')</code> מחזיר את כל השאר. (מלכודת NULL ב-NOT IN — בפרק השאילתות המקוננות.)</p>

<h4>IS NULL</h4>
<pre>SELECT id, studentId, assignmentId, grade
FROM submissions
WHERE grade IS NULL;</pre><p><b>תוצאה:</b> הגשות שטרם נבדקו — 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>studentId</th><th>assignmentId</th><th>grade</th></tr><tr><td>8</td><td>4</td><td>1</td><td><i>NULL</i></td></tr><tr><td>12</td><td>6</td><td>5</td><td><i>NULL</i></td></tr></table></div>
<pre>SELECT id, grade
FROM submissions
WHERE grade = NULL;</pre><p><b>תוצאה:</b> אף פעם לא כך! — 0 שורות (תוצאה ריקה)</p>
<p>השוואה ל-NULL עם <code>=</code> נותנת UNKNOWN (לא TRUE) — ולכן אף שורה לא חוזרת, <b>בלי שגיאה</b>.</p>

<h4>LIKE — התאמת תבניות</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>תו כללי</th><th>משמעות</th><th>דוגמה</th></tr>
<tr><td dir="ltr">%</td><td>רצף של 0 תווים או יותר</td><td dir="ltr">'Jo%' — מתחיל ב-Jo</td></tr>
<tr><td dir="ltr">_</td><td>תו אחד בדיוק</td><td dir="ltr">'_a%' — האות השנייה a</td></tr>
<tr><td dir="ltr">[abc] / [a-f]</td><td>תו אחד מתוך קבוצה/טווח (T-SQL)</td><td dir="ltr">'[DM]%' — מתחיל ב-D או M</td></tr>
<tr><td dir="ltr">[^abc]</td><td>תו אחד שאינו בקבוצה (T-SQL)</td><td dir="ltr">'[^0-9]%' — לא מתחיל בספרה</td></tr>
</table></div>
<pre>SELECT firstName
FROM students
WHERE firstName LIKE '_a%';</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th></tr><tr><td>David</td></tr><tr><td>Maya</td></tr><tr><td>Tamar</td></tr></table></div>
<pre>SELECT firstName
FROM students
WHERE firstName LIKE '%a';</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th></tr><tr><td>Noa</td></tr><tr><td>Maya</td></tr><tr><td>Shira</td></tr></table></div>
<p><b>תוצאה:</b> ב-SQL Server, <code>SELECT firstName FROM students WHERE firstName LIKE '[DM]%'</code> — 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th></tr><tr><td>David</td></tr><tr><td>Maya</td></tr></table></div>
<p>(במנוע של האתר — SQLite — אין סוגריים מרובעים ב-LIKE, ולכן אותה שאילתה מחזירה שם תוצאה ריקה <b>בלי שגיאה</b>. במבחן זה תחביר תקין של SQL Server.)</p>

<h4>ORDER BY — מיון לפי כמה עמודות</h4>
<pre>SELECT firstName, city, age
FROM students
ORDER BY city ASC, age DESC;</pre><p><b>תוצאה:</b> 10 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>city</th><th>age</th></tr><tr><td>Omer</td><td>Beer Sheva</td><td>24</td></tr><tr><td>Noa</td><td>Haifa</td><td>21</td></tr><tr><td>Shira</td><td>Haifa</td><td>20</td></tr><tr><td>Lior</td><td>Holon</td><td>22</td></tr><tr><td>Eyal</td><td>Jerusalem</td><td>26</td></tr><tr><td>Yossi</td><td>Jerusalem</td><td>25</td></tr><tr><td>Tamar</td><td>Ramat Gan</td><td>23</td></tr><tr><td>Itai</td><td>Tel Aviv</td><td>27</td></tr><tr><td>David</td><td>Tel Aviv</td><td>23</td></tr><tr><td>Maya</td><td>Tel Aviv</td><td>22</td></tr></table></div>
<p>ממיינים לפי <code>city</code>; רק בתוך אותה עיר ממיינים לפי <code>age</code> בסדר יורד. <code>ASC</code> היא ברירת המחדל. מותר למיין לפי כינוי (<code>ORDER BY Age</code>) ולפי עמודה שלא מוצגת. ב-SQL Server, NULL מופיע ראשון במיון עולה.</p>

<h4>TOP n</h4>
<pre>SELECT TOP 3 firstName, age
FROM students
ORDER BY age DESC;</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>age</th></tr><tr><td>Itai</td><td>27</td></tr><tr><td>Eyal</td><td>26</td></tr><tr><td>Yossi</td><td>25</td></tr></table></div>
<p><code>TOP</code> בלי <code>ORDER BY</code> מחזיר 3 שורות <u>כלשהן</u>. ומה עם שוויון? <code>SELECT TOP 3 firstName, age FROM students ORDER BY age</code> מחזיר את Shira בת 20, את Noa בת 21 ו<b>רק אחד</b> מבין Maya ו-Lior — שניהם בני 22. עם <code>WITH TIES</code> מקבלים את שניהם:</p>
<p><b>תוצאה:</b> ב-SQL Server, <code>SELECT TOP 3 WITH TIES firstName, age FROM students ORDER BY age</code> — 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>age</th></tr><tr><td>Shira</td><td>20</td></tr><tr><td>Noa</td><td>21</td></tr><tr><td>Maya</td><td>22</td></tr><tr><td>Lior</td><td>22</td></tr></table></div>
<p>(<code>WITH TIES</code> חייב <code>ORDER BY</code>. המנוע של האתר מתעלם ממנו ומחזיר 3 שורות — כאן סמכו על SQL Server.)</p>

<h4>סדר הביצוע הלוגי — למה כינוי לא עובד ב-WHERE</h4>
<pre>FROM / JOIN  →  WHERE  →  GROUP BY  →  HAVING  →  SELECT  →  DISTINCT  →  ORDER BY  →  TOP</pre>
<p>ה-<code>SELECT</code> "מתבצע" אחרי ה-<code>WHERE</code>, ולכן <code>WHERE price_with_vat &gt; 1500</code> נכשל ("Invalid column name") — חוזרים על הביטוי: <code>WHERE price * 1.17 &gt; 1500</code>. ב-<code>ORDER BY</code>, שמתבצע אחרי ה-SELECT, מותר להשתמש בכינוי.</p>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li><code>= NULL</code> מחזיר תוצאה ריקה בשקט — רק <code>IS NULL</code>.</li>
  <li>AND לפני OR — כשמערבבים, <b>שימו סוגריים</b>.</li>
  <li><code>BETWEEN</code> כולל את שני הקצוות; <code>BETWEEN 24 AND 22</code> (הפוך) מחזיר כלום.</li>
  <li>מחרוזות בגרש בודד. <code>WHERE Director = "Woody Allen"</code> (כמו בשקף) נכשל ב-SQL Server — מרכאות כפולות הן שם עמודה.</li>
  <li>כינוי מ-SELECT לא מוכר ב-WHERE / GROUP BY / HAVING.</li>
  <li><code>TOP</code> בלי <code>ORDER BY</code> = שורות שרירותיות.</li>
  <li>עמודה עם מקף/רווח או שם שמור כמו <code>Group</code>, <code>Order</code>, <code>User</code> — בסוגריים מרובעים.</li>
</ul></div>
`
  },
  {
    id:'case', track:'sql', icon:'🧮', title:'CASE, CAST, עמודות מחושבות ו-NULL',
    html:`
<p><code>CASE</code> הוא ה-if/else של SQL: הוא מחזיר <b>ערך</b>, ולכן אפשר לשים אותו בכל מקום שמצפה לערך — ב-SELECT (עמודה חדשה), ב-WHERE, ב-ORDER BY ואפילו בתוך פונקציית צבירה.</p>

<h4>CASE "מחפש" (Searched) — תנאים מלאים</h4>
<pre>CASE
    WHEN condition1 THEN value1
    WHEN condition2 THEN value2
    ...
    ELSE valueN          -- optional; without ELSE -&gt; NULL
END AS alias             -- the alias comes after END</pre>
<p><b>חוברת, תרגיל 11</b> — קטגוריית ציון לכל הרשמה:</p>
<pre>SELECT s.name, c.course_name, e.grade,
       CASE
           WHEN e.grade &gt;= 90 THEN 'Excellent'
           WHEN e.grade &gt;= 80 THEN 'Very Good'
           WHEN e.grade &gt;= 70 THEN 'Good'
           WHEN e.grade &gt;= 60 THEN 'Pass'
           ELSE 'Fail'
       END AS category
FROM Students s
INNER JOIN Enrollments e ON s.student_id = e.student_id
INNER JOIN Courses c     ON c.course_id  = e.course_id;</pre><p><b>תוצאה:</b> 8 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>name</th><th>course_name</th><th>grade</th><th>category</th></tr><tr><td>Dan</td><td>SQL</td><td>95</td><td>Excellent</td></tr><tr><td>Dan</td><td>Java</td><td>82</td><td>Very Good</td></tr><tr><td>Maya</td><td>SQL</td><td>76</td><td>Good</td></tr><tr><td>Maya</td><td>Python</td><td>91</td><td>Excellent</td></tr><tr><td>Ron</td><td>Networks</td><td>68</td><td>Pass</td></tr><tr><td>Noa</td><td>SQL</td><td>88</td><td>Very Good</td></tr><tr><td>Noa</td><td>Python</td><td>94</td><td>Excellent</td></tr><tr><td>Tom</td><td>Java</td><td>55</td><td>Fail</td></tr></table></div>
<div class="callout"><b>הסדר קובע!</b> ה-WHEN הראשון שמתקיים מנצח, והשאר לא נבדקים. לכן מסדרים מהסף הגבוה לנמוך ולא צריך לכתוב <code>BETWEEN 80 AND 89</code>. כך נראית טעות בסדר:</div>
<pre>SELECT s.name, e.grade,
       CASE
           WHEN e.grade &gt;= 70 THEN 'Good'
           WHEN e.grade &gt;= 90 THEN 'Excellent'
           ELSE 'Fail'
       END AS status
FROM Students s
JOIN Enrollments e ON s.student_id = e.student_id
WHERE s.name IN ('Dan', 'Maya');</pre><p><b>תוצאה:</b> גם 95 וגם 91 קיבלו Good — כי התנאי '70 ומעלה' נבדק ראשון — 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>name</th><th>grade</th><th>status</th></tr><tr><td>Dan</td><td>95</td><td>Good</td></tr><tr><td>Dan</td><td>82</td><td>Good</td></tr><tr><td>Maya</td><td>76</td><td>Good</td></tr><tr><td>Maya</td><td>91</td><td>Good</td></tr></table></div>

<h4>CASE "פשוט" (Simple) — השוואה לעמודה אחת</h4>
<pre>SELECT id, studentId, status,
       CASE status
           WHEN 'Active'   THEN N'פעיל'
           WHEN 'Inactive' THEN N'לא פעיל'
       END AS status_he
FROM enrollments
WHERE studentId IN (2, 9);</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>studentId</th><th>status</th><th>status_he</th></tr><tr><td>4</td><td>2</td><td>Active</td><td>פעיל</td></tr><tr><td>5</td><td>2</td><td>Inactive</td><td>לא פעיל</td></tr><tr><td>15</td><td>9</td><td>Inactive</td><td>לא פעיל</td></tr></table></div>
<p>בצורה הפשוטה אפשר רק <b>שוויון</b> לערך. לטווחים (<code>&gt;=</code>) או ל-NULL — צריך את הצורה המחפשת. <code>CASE grade WHEN NULL THEN …</code> לעולם לא יתקיים; כותבים <code>CASE WHEN grade IS NULL THEN …</code>:</p>
<pre>SELECT id, grade,
       CASE
           WHEN grade IS NULL THEN 'Not graded'
           WHEN grade &gt;= 85   THEN 'High'
           ELSE 'Regular'
       END AS level
FROM submissions
WHERE studentId = 4;</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>grade</th><th>level</th></tr><tr><td>8</td><td><i>NULL</i></td><td>Not graded</td></tr><tr><td>9</td><td>85</td><td>High</td></tr><tr><td>10</td><td>90</td><td>High</td></tr></table></div>

<h4>CASE בתוך WHERE (מצגת 3)</h4>
<p><b>צורה 1 (שקף 43):</b> ה-CASE מחזיר 1 או 0 לכל שורה, ומשאירים רק את השורות שקיבלו 1:</p>
<pre>SELECT firstName, city
FROM students
WHERE CASE
          WHEN city = 'Tel Aviv' THEN 1
          WHEN city = 'Haifa'    THEN 0
          ELSE 0
      END = 1;</pre><p><b>תוצאה:</b> רק תושבי תל אביב — 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>city</th></tr><tr><td>David</td><td>Tel Aviv</td></tr><tr><td>Maya</td><td>Tel Aviv</td></tr><tr><td>Itai</td><td>Tel Aviv</td></tr></table></div>
<p><b>צורה 2 (שקף 44):</b> CASE פשוט שמחזיר <b>סף שונה לכל עיר</b>, ומשווים אליו את הגיל:</p>
<pre>SELECT firstName, city, age
FROM students
WHERE age &gt; CASE city
                WHEN 'Tel Aviv' THEN 22
                WHEN 'Haifa'    THEN 20
                ELSE 25
            END;</pre><p><b>תוצאה:</b> 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>city</th><th>age</th></tr><tr><td>David</td><td>Tel Aviv</td><td>23</td></tr><tr><td>Noa</td><td>Haifa</td><td>21</td></tr><tr><td>Itai</td><td>Tel Aviv</td><td>27</td></tr><tr><td>Eyal</td><td>Jerusalem</td><td>26</td></tr></table></div>
<p>השאילתה השקולה בלי CASE (כמו בשקף המסוגר):</p>
<pre>WHERE (city = 'Tel Aviv' AND age &gt; 22)
   OR (city = 'Haifa'    AND age &gt; 20)
   OR (city NOT IN ('Tel Aviv', 'Haifa') AND age &gt; 25)</pre>
<p>בשקפים 43–44 יש שתי שגיאות להכיר: <code>FROM CUSTOMERS;</code> עם נקודה-פסיק <u>לפני</u> ה-WHERE (זה מסיים את הפקודה!), ו-<code>' Haifa'</code> עם רווח מוביל — שלא ישווה ל-<code>'Haifa'</code>.</p>

<h4>עמודות מחושבות — הנחות (חוברת תרגילים 7 ו-12)</h4>
<p><b>תרגיל 7</b> — מחיר <u>מעל</u> 1500 מקבל 10% הנחה (1500 עצמו — בלי הנחה):</p>
<pre>SELECT course_name, price,
       CASE
           WHEN price &gt; 1500 THEN price * 0.9
           ELSE price
       END AS final_price
FROM Courses;</pre><p><b>תוצאה:</b> 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>course_name</th><th>price</th><th>final_price</th></tr><tr><td>SQL</td><td>1200</td><td>1200.0</td></tr><tr><td>Java</td><td>1500</td><td>1500.0</td></tr><tr><td>Python</td><td>1800</td><td>1620.0</td></tr><tr><td>Networks</td><td>1300</td><td>1300.0</td></tr></table></div>
<p>ב-SQL Server <code>price * 0.9</code> הוא NUMERIC עם ספרה אחת אחרי הנקודה, ו-CASE מחזיר טיפוס אחד לכל השורות — לכן גם 1200 מוצג <code>1200.0</code>.</p>
<p><b>תרגיל 12</b> — דוח עם הנחה לפי ציון (‎90+ → 20%, ‎80+ → 10%), מחיר סופי מסוג <code>DECIMAL(10,2)</code>, וסטודנט בלי קורס חייב להופיע:</p>
<pre>SELECT s.name, s.city, c.course_name, c.price, e.grade,
       CASE
           WHEN e.grade IS NULL THEN 'No Course'
           WHEN e.grade &gt;= 90 THEN 'Excellent'
           WHEN e.grade &gt;= 80 THEN 'Very Good'
           WHEN e.grade &gt;= 70 THEN 'Good'
           WHEN e.grade &gt;= 60 THEN 'Pass'
           ELSE 'Fail'
       END AS grade_status,
       CAST(CASE
                WHEN e.grade &gt;= 90 THEN c.price * 0.8
                WHEN e.grade &gt;= 80 THEN c.price * 0.9
                ELSE c.price
            END AS DECIMAL(10,2)) AS final_price
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses c     ON c.course_id  = e.course_id;</pre><p><b>תוצאה:</b> 9 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>name</th><th>city</th><th>course_name</th><th>price</th><th>grade</th><th>grade_status</th><th>final_price</th></tr><tr><td>Dan</td><td>Tel Aviv</td><td>SQL</td><td>1200</td><td>95</td><td>Excellent</td><td>960.00</td></tr><tr><td>Dan</td><td>Tel Aviv</td><td>Java</td><td>1500</td><td>82</td><td>Very Good</td><td>1350.00</td></tr><tr><td>Maya</td><td>Haifa</td><td>SQL</td><td>1200</td><td>76</td><td>Good</td><td>1200.00</td></tr><tr><td>Maya</td><td>Haifa</td><td>Python</td><td>1800</td><td>91</td><td>Excellent</td><td>1440.00</td></tr><tr><td>Ron</td><td>Jerusalem</td><td>Networks</td><td>1300</td><td>68</td><td>Pass</td><td>1300.00</td></tr><tr><td>Noa</td><td>Tel Aviv</td><td>SQL</td><td>1200</td><td>88</td><td>Very Good</td><td>1080.00</td></tr><tr><td>Noa</td><td>Tel Aviv</td><td>Python</td><td>1800</td><td>94</td><td>Excellent</td><td>1440.00</td></tr><tr><td>Tom</td><td>Beer Sheva</td><td>Java</td><td>1500</td><td>55</td><td>Fail</td><td>1500.00</td></tr><tr><td>Dana</td><td>Haifa</td><td><i>NULL</i></td><td><i>NULL</i></td><td><i>NULL</i></td><td>No Course</td><td><i>NULL</i></td></tr></table></div>
<p>שימו לב ל-Dana: אין לה הרשמה, ולכן <code>e.grade</code> הוא NULL — בלי ה-WHEN הראשון היא הייתה מקבלת <code>'Fail'</code> מה-ELSE. (פתרון לא רשמי — לתרגיל 12 אין פתרון בקובץ המרצה.)</p>

<h4>CAST ו-CONVERT — המרת טיפוסים</h4>
<pre>CAST(expression AS data_type)
CONVERT(data_type, expression [, style])      -- T-SQL only</pre>
<pre>SELECT CAST(id AS VARCHAR(10)) + ' - ' + firstName AS id_and_name
FROM students
WHERE id &lt;= 3;</pre><p><b>תוצאה:</b> שקף 45: מספר + טקסט מחייב CAST — 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id_and_name</th></tr><tr><td>1 - David</td></tr><tr><td>2 - Noa</td></tr><tr><td>3 - Yossi</td></tr></table></div>
<ul>
  <li>בלי ה-CAST: <code>id + ' - ' + firstName</code> נכשל ב-SQL Server ("Conversion failed when converting the varchar value ' - ' to data type int") — כי <code>+</code> בין מספר לטקסט מנסה <b>לחבר מספרים</b>.</li>
  <li><code>CONVERT(VARCHAR(10), enrollmentDate, 103)</code> → <code>01/10/2025</code> (סגנון 103 = dd/mm/yyyy).</li>
  <li><code>CAST(x AS DECIMAL(10,2))</code> <b>מעגל</b> לשתי ספרות: 81.125 → 81.13.</li>
</ul>

<h4>AVG על INT — המלכודת של SQL Server</h4>
<p>ב-SQL Server, פעולה על מספרים שלמים מחזירה מספר שלם: <code>7 / 2 = 3</code>, וגם <code>AVG</code> על עמודת INT <b>קוטע</b> את השבר. הציונים בחוברת (95, 82, 76, 91, 68, 88, 94, 55) הם INT:</p>
<pre>SELECT AVG(grade)                                         AS avg_int,
       AVG(CAST(grade AS DECIMAL(5,2)))                   AS avg_decimal,
       CAST(AVG(CAST(grade AS DECIMAL(5,2))) AS DECIMAL(5,2)) AS avg_2_digits
FROM Enrollments;</pre>
<p><b>תוצאה:</b> ב-SQL Server — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>avg_int</th><th>avg_decimal</th><th>avg_2_digits</th></tr><tr><td>81</td><td>81.125000</td><td>81.13</td></tr></table></div>
<div class="callout">במנוע של האתר (SQLite) <code>AVG(grade)</code> מחזיר 81.125 גם בלי CAST — אל תסמכו על זה במבחן: ב-SQL Server חייבים CAST (ותרגיל 14 בחוברת אכן מחייב שימוש ב-CAST — זה המקום הטבעי שלו). בטבלת submissions של college2 הציון כבר <code>DECIMAL(5,2)</code>, ולכן שם AVG מחזיר שבר בכל מקרה.</div>

<h4>ISNULL ו-COALESCE — החלפת NULL</h4>
<pre>SELECT id, studentId, grade,
       ISNULL(grade, 0) AS grade_or_0
FROM submissions
WHERE studentId IN (4, 6);</pre><p><b>תוצאה:</b> 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>studentId</th><th>grade</th><th>grade_or_0</th></tr><tr><td>8</td><td>4</td><td><i>NULL</i></td><td>0</td></tr><tr><td>9</td><td>4</td><td>85</td><td>85</td></tr><tr><td>10</td><td>4</td><td>90</td><td>90</td></tr><tr><td>12</td><td>6</td><td><i>NULL</i></td><td>0</td></tr></table></div>
<ul>
  <li><code>ISNULL(x, v)</code> — T-SQL, שני ארגומנטים. <code>COALESCE(a, b, c, …)</code> — סטנדרטי, מחזיר את הראשון שאינו NULL (למשל <code>COALESCE(phone, email, 'none')</code>).</li>
  <li>המקבילה ב-MySQL/SQLite: <code>IFNULL</code>.</li>
</ul>
<p><b>זהירות:</b> החלפת NULL ב-0 <u>משנה ממוצעים</u>. בקורס Marketing יש ציון 70 והגשה אחת שלא נבדקה:</p>
<pre>SELECT CAST(AVG(grade) AS DECIMAL(5,2))            AS avg_ignore_null,
       CAST(AVG(ISNULL(grade, 0)) AS DECIMAL(5,2)) AS avg_null_as_0
FROM submissions
WHERE courseId = 4;</pre><p><b>תוצאה:</b> שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>avg_ignore_null</th><th>avg_null_as_0</th></tr><tr><td>70.00</td><td>35.00</td></tr></table></div>
<p>AVG מתעלם מ-NULL ומחשב <code>70 / 1 = 70</code>, אבל אחרי ISNULL ה-NULL נספר כאפס: <code>(70 + 0) / 2 = 35</code>. מה נכון? תלוי בשאלה — "ממוצע הציונים שנבדקו" = הראשון.</p>

<h4>CASE ב-ORDER BY — סדר מותאם</h4>
<pre>ORDER BY CASE status WHEN 'Active' THEN 1 ELSE 2 END, enrollmentDate</pre>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li>סדר ה-WHEN: מהגבוה לנמוך. ה-WHEN הראשון שמתקיים קובע.</li>
  <li>לא לשכוח <code>END</code>; הכינוי (<code>AS status</code>) בא <b>אחרי</b> END.</li>
  <li>CASE בלי ELSE מחזיר NULL כשאף WHEN לא מתקיים.</li>
  <li>בדיקת NULL ב-CASE רק בצורה המחפשת: <code>WHEN x IS NULL</code>. ובדוח עם LEFT JOIN — טפלו ב-NULL <b>ראשון</b>.</li>
  <li>"מעל 1500" = <code>&gt; 1500</code> (1500 בלי הנחה); "90 ומעלה" = <code>&gt;= 90</code>.</li>
  <li>AVG על INT ב-SQL Server = מספר שלם. <code>CAST(grade AS DECIMAL(5,2))</code> <u>בתוך</u> ה-AVG.</li>
  <li>מספר + טקסט עם <code>+</code> → CAST קודם.</li>
</ul></div>
`
  },
  {
    id:'joins', track:'sql', icon:'🔗', title:'JOIN — צירוף טבלאות (לב המבחן)',
    html:`
<p>JOIN מצרף שורות משתי טבלאות לפי תנאי — כמעט תמיד <b>FK = PK</b>. הדוגמאות כאן רצות על נתוני חוברת התרגילים (practice): 6 סטודנטים, 4 קורסים, 8 הרשמות — ו<b>הסטודנטית Dana לא רשומה לאף קורס</b>. זה בדיוק מקרה הקצה שמבדיל בין סוגי ה-JOIN.</p>

<h4>INNER JOIN — רק שורות עם התאמה בשני הצדדים</h4>
<p><b>חוברת, תרגיל 1</b> — שם סטודנט, שם קורס וציון, רק לסטודנטים רשומים:</p>
<pre>SELECT s.name, c.course_name, e.grade
FROM Students s
INNER JOIN Enrollments e ON s.student_id = e.student_id
INNER JOIN Courses c     ON c.course_id  = e.course_id;</pre><p><b>תוצאה:</b> 8 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>name</th><th>course_name</th><th>grade</th></tr><tr><td>Dan</td><td>SQL</td><td>95</td></tr><tr><td>Dan</td><td>Java</td><td>82</td></tr><tr><td>Maya</td><td>SQL</td><td>76</td></tr><tr><td>Maya</td><td>Python</td><td>91</td></tr><tr><td>Ron</td><td>Networks</td><td>68</td></tr><tr><td>Noa</td><td>SQL</td><td>88</td></tr><tr><td>Noa</td><td>Python</td><td>94</td></tr><tr><td>Tom</td><td>Java</td><td>55</td></tr></table></div>
<div class="callout">בפתרון הרשמי של המרצה יש שגיאות הקלדה: <code>enrollmets</code>, <code>sudents</code>, <code>course</code> ו-<code>s.studentId</code>. העמודות האמיתיות בטבלאות הן <code>student_id</code> / <code>course_id</code> — במבחן העתיקו שמות <b>בדיוק</b> מהסכמה שניתנה. <code>JOIN</code> לבד = <code>INNER JOIN</code>.</div>

<h4>LEFT JOIN — כל השורות מהטבלה השמאלית</h4>
<p><b>תרגיל 5</b> — כל הסטודנטים, כולל מי שאינו רשום. כשאין התאמה, העמודות מהצד הימני מתמלאות ב-NULL:</p>
<pre>SELECT s.name, c.course_name, e.grade
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses c     ON c.course_id  = e.course_id;</pre><p><b>תוצאה:</b> 9 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>name</th><th>course_name</th><th>grade</th></tr><tr><td>Dan</td><td>SQL</td><td>95</td></tr><tr><td>Dan</td><td>Java</td><td>82</td></tr><tr><td>Maya</td><td>SQL</td><td>76</td></tr><tr><td>Maya</td><td>Python</td><td>91</td></tr><tr><td>Ron</td><td>Networks</td><td>68</td></tr><tr><td>Noa</td><td>SQL</td><td>88</td></tr><tr><td>Noa</td><td>Python</td><td>94</td></tr><tr><td>Tom</td><td>Java</td><td>55</td></tr><tr><td>Dana</td><td><i>NULL</i></td><td><i>NULL</i></td></tr></table></div>
<p>"שמאלית" = הטבלה שכתובה <b>לפני</b> המילה JOIN. בשרשרת — גם ה-JOIN השני חייב להיות LEFT. אם השני הוא INNER, שורת ה-NULL של Dana לא מוצאת קורס ו<b>נמחקת שוב</b>:</p>
<pre>SELECT s.name, c.course_name
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
INNER JOIN Courses c    ON c.course_id  = e.course_id;</pre><p><b>תוצאה:</b> Dana נעלמה — 8 שורות</p>

<h4>RIGHT JOIN — כל השורות מהטבלה הימנית</h4>
<p><b>תרגיל 6</b> ("יש לפתור ב-right join") — כל הקורסים, גם בלי סטודנטים. הטבלה שצריך לשמור (Courses) נכתבת <b>אחרונה</b>:</p>
<pre>SELECT s.name, c.course_name, e.grade
FROM Students s
RIGHT JOIN Enrollments e ON s.student_id = e.student_id
RIGHT JOIN Courses c     ON c.course_id  = e.course_id;</pre><p><b>תוצאה:</b> כמו תרגיל 1, כי בחוברת לכל קורס יש לפחות סטודנט אחד — 8 שורות</p>
<p>ב-college2 יש קורס בלי סטודנטים (Cyber Security) — שם רואים את ההבדל:</p>
<pre>SELECT c.courseName, e.studentId
FROM enrollments e
RIGHT JOIN courses c ON c.id = e.courseId
WHERE c.id &gt;= 5;</pre><p><b>תוצאה:</b> 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>courseName</th><th>studentId</th></tr><tr><td>Statistics</td><td>5</td></tr><tr><td>Statistics</td><td>7</td></tr><tr><td>Statistics</td><td>9</td></tr><tr><td>Cyber Security</td><td><i>NULL</i></td></tr></table></div>
<p><code>A RIGHT JOIN B</code> זהה ל-<code>B LEFT JOIN A</code>. רוב האנשים מעדיפים LEFT — תרגיל 14 בחוברת אפילו <b>אוסר</b> RIGHT JOIN.</p>

<h4>FULL JOIN — כל השורות משני הצדדים</h4>
<pre>SELECT l.firstName, l.lastName, c.courseName
FROM lecturers l
FULL JOIN courses c ON c.lecturerId = l.id;</pre><p><b>תוצאה:</b> 7 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>lastName</th><th>courseName</th></tr><tr><td>Moshe</td><td>Cohen</td><td>MongoDB</td></tr><tr><td>Moshe</td><td>Cohen</td><td>SQL Server</td></tr><tr><td>Rina</td><td>Levi</td><td>Python</td></tr><tr><td>Rina</td><td>Levi</td><td>Cyber Security</td></tr><tr><td>Avi</td><td>Peretz</td><td>Marketing</td></tr><tr><td>Avi</td><td>Peretz</td><td>Statistics</td></tr><tr><td>Dana</td><td>Klein</td><td><i>NULL</i></td></tr></table></div>
<p>המרצה Dana Klein לא מלמדת אף קורס — היא מופיעה עם NULL. (קורס בלי מרצה היה מופיע עם NULL בצד של המרצה.)</p>

<h4>צירוף דרך טבלת קישור (רבים-לרבים)</h4>
<p>חייזר ↔ מסע הוא קשר רבים-לרבים, ולכן עוברים דרך <code>Aliens_in_trips</code>. <b>מצגת 6, שקף 3, שאלה 3</b> — שמות החייזרים שהשתתפו במסע לפני שנת 2000:</p>
<pre>SELECT DISTINCT A.aname
FROM Aliens A
JOIN Aliens_in_trips AIT ON A.id_no = AIT.id_no
JOIN Trips T             ON AIT.t_no = T.t_no
WHERE YEAR(T.d_date) &lt; 2000;</pre><p><b>תוצאה:</b> 5 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>aname</th></tr><tr><td>Bill Gates</td></tr><tr><td>E.T.</td></tr><tr><td>Bin-Laden</td></tr><tr><td>B.A.</td></tr><tr><td>Spoc’s dog</td></tr></table></div>
<p>(המסעות 5 ו-6 מ-1800.) <code>DISTINCT</code> חשוב כשמבקשים "שמות": חייזר שהשתתף בשני מסעות כאלה היה מופיע פעמיים.</p>
<p><b>עבודת ישור קו, שאלה 1</b> — סטודנטים, קורסים ותאריך הרשמה, <u>הרשמות פעילות בלבד</u>:</p>
<pre>SELECT s.firstName, s.lastName, c.courseName, e.enrollmentDate
FROM enrollments e
JOIN students s ON s.id = e.studentId
JOIN courses c  ON c.id = e.courseId
WHERE e.status = 'Active';</pre><p><b>תוצאה:</b> 13 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>lastName</th><th>courseName</th><th>enrollmentDate</th></tr><tr><td>David</td><td>Levi</td><td>MongoDB</td><td>2025-10-01</td></tr><tr><td>David</td><td>Levi</td><td>SQL Server</td><td>2025-10-01</td></tr><tr><td>David</td><td>Levi</td><td>Python</td><td>2025-10-03</td></tr><tr><td>Noa</td><td>Cohen</td><td>MongoDB</td><td>2025-10-02</td></tr><tr><td>Yossi</td><td>Mizrahi</td><td>SQL Server</td><td>2025-10-04</td></tr><tr><td>Maya</td><td>Peretz</td><td>MongoDB</td><td>2025-10-06</td></tr><tr><td colspan="4">… ועוד 7 שורות</td></tr></table></div>
<p><b>עבודת ישור קו, שאלה 4</b> — כל ההגשות עם שם הסטודנט, שם הקורס והמרצה (4 טבלאות):</p>
<pre>SELECT sub.id AS submissionId,
       st.firstName + ' ' + st.lastName AS student,
       c.courseName,
       l.firstName + ' ' + l.lastName   AS lecturer,
       sub.grade
FROM submissions sub
JOIN students  st ON st.id = sub.studentId
JOIN courses   c  ON c.id  = sub.courseId
JOIN lecturers l  ON l.id  = c.lecturerId;</pre><p><b>תוצאה:</b> 16 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>submissionId</th><th>student</th><th>courseName</th><th>lecturer</th><th>grade</th></tr><tr><td>1</td><td>David Levi</td><td>MongoDB</td><td>Moshe Cohen</td><td>95</td></tr><tr><td>2</td><td>David Levi</td><td>MongoDB</td><td>Moshe Cohen</td><td>80</td></tr><tr><td>3</td><td>David Levi</td><td>SQL Server</td><td>Moshe Cohen</td><td>88</td></tr><tr><td>4</td><td>David Levi</td><td>Python</td><td>Rina Levi</td><td>92</td></tr><tr><td>5</td><td>Noa Cohen</td><td>MongoDB</td><td>Moshe Cohen</td><td>78</td></tr><tr><td colspan="5">… ועוד 11 שורות</td></tr></table></div>
<p>ב-college2 יש ל-submissions עמודת <code>courseId</code>. אם אין (כמו ב-DDL המקורי של המטלה) — עוברים דרך המטלה: <code>JOIN assignments a ON a.id = sub.assignmentId JOIN courses c ON c.id = a.courseId</code>.</p>

<h4>הצורה הישנה — טבלאות עם פסיק ותנאי ב-WHERE</h4>
<p>זו התבנית בשקף 3 של מצגת 6 (<code>FROM table1, …, tablen</code>). <b>שאלה 1</b> — לכל מסע: תאריך ושם כוכב הלכת:</p>
<pre>SELECT T.t_no, T.d_date, P.pname
FROM Trips T, Planets P
WHERE T.p_no = P.p_no;</pre><p><b>תוצאה:</b> 7 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>t_no</th><th>d_date</th><th>pname</th></tr><tr><td>1</td><td>2002-01-05 15:30</td><td>Pluto</td></tr><tr><td>2</td><td>2002-02-22 02:22</td><td>Naren</td></tr><tr><td>3</td><td>2004-04-14 14:44</td><td>Alpha Centaury</td></tr><tr><td>4</td><td>2004-04-14 14:46</td><td>K-PAX</td></tr><tr><td>5</td><td>1800-06-06 18:06</td><td>London</td></tr><tr><td>6</td><td>1800-06-06 21:09</td><td>London</td></tr><tr><td>7</td><td>2002-06-06 15:35</td><td>Alpha Centaury</td></tr></table></div>
<pre>SELECT COUNT(*) AS row_count
FROM Trips, Planets;</pre><p><b>תוצאה:</b> שכחנו את תנאי הצירוף → מכפלה קרטזית 7 × 5 — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>row_count</th></tr><tr><td>35</td></tr></table></div>
<p>הצורה הישנה שקולה ל-INNER JOIN, אבל קל לשכוח בה את התנאי — ואי אפשר לכתוב בה OUTER JOIN. במבחן עדיף <code>JOIN … ON</code>.</p>

<h4>המלכודת הגדולה: תנאי ב-ON מול תנאי ב-WHERE</h4>
<p><b>חוברת, תרגיל 13</b> — מה מחזירה השאילתה הזו?</p>
<pre>SELECT s.name, e.grade
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
WHERE e.grade &gt;= 80;</pre><p><b>תוצאה:</b> Ron, Tom ו-Dana נעלמו — 5 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>name</th><th>grade</th></tr><tr><td>Dan</td><td>95</td></tr><tr><td>Dan</td><td>82</td></tr><tr><td>Maya</td><td>91</td></tr><tr><td>Noa</td><td>88</td></tr><tr><td>Noa</td><td>94</td></tr></table></div>
<ol>
  <li><b>האם כל הסטודנטים יופיעו?</b> לא.</li>
  <li><b>מה קורה לסטודנט בלי הרשמה?</b> ה-LEFT JOIN יוצר לו שורה עם <code>e.grade = NULL</code>, ואז ה-WHERE בודק <code>NULL &gt;= 80</code> → UNKNOWN → השורה נזרקת. גם Ron עם 68 ו-Tom עם 55 נעלמים. בפועל השאילתה הפכה ל-INNER JOIN.</li>
  <li><b>הפתרון:</b> להעביר את התנאי ל-ON — הוא מגביל <u>אילו הרשמות מצטרפות</u>, בלי למחוק סטודנטים:</li>
</ol>
<pre>SELECT s.name, e.grade
FROM Students s
LEFT JOIN Enrollments e
       ON s.student_id = e.student_id
      AND e.grade &gt;= 80;</pre><p><b>תוצאה:</b> כל 6 הסטודנטים מופיעים — 8 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>name</th><th>grade</th></tr><tr><td>Dan</td><td>82</td></tr><tr><td>Dan</td><td>95</td></tr><tr><td>Maya</td><td>91</td></tr><tr><td>Ron</td><td><i>NULL</i></td></tr><tr><td>Noa</td><td>88</td></tr><tr><td>Noa</td><td>94</td></tr><tr><td>Tom</td><td><i>NULL</i></td></tr><tr><td>Dana</td><td><i>NULL</i></td></tr></table></div>
<p>Maya מופיעה רק עם 91 (ה-76 לא עמד בתנאי ה-ON), ו-Ron, Tom, Dana מופיעים עם NULL. זה גם הפתרון ל<b>תרגיל 8</b> (שם התנאי <code>&gt; 80</code>).</p>
<p><b>מצגת 6, שקף 4, שאלה 2</b> — כל כוכבי הלכת והטיולים אליהם <u>משנת 2004 ואילך</u>, כולל כוכבים בלי טיול כזה:</p>
<pre>SELECT P.p_no, P.pname, T.t_no, T.d_date
FROM Planets P
LEFT JOIN Trips T ON P.p_no = T.p_no
WHERE YEAR(T.d_date) &gt;= 2004;</pre><p><b>תוצאה:</b> תנאי ב-WHERE — שגוי, רק 2 כוכבים — 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>p_no</th><th>pname</th><th>t_no</th><th>d_date</th></tr><tr><td>2</td><td>Alpha Centaury</td><td>3</td><td>2004-04-14 14:44</td></tr><tr><td>4</td><td>K-PAX</td><td>4</td><td>2004-04-14 14:46</td></tr></table></div>
<pre>SELECT P.p_no, P.pname, T.t_no, T.d_date
FROM Planets P
LEFT JOIN Trips T
       ON P.p_no = T.p_no
      AND YEAR(T.d_date) &gt;= 2004;</pre><p><b>תוצאה:</b> תנאי ב-ON — נכון, כל 5 הכוכבים — 5 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>p_no</th><th>pname</th><th>t_no</th><th>d_date</th></tr><tr><td>1</td><td>Naren</td><td><i>NULL</i></td><td><i>NULL</i></td></tr><tr><td>2</td><td>Alpha Centaury</td><td>3</td><td>2004-04-14 14:44</td></tr><tr><td>3</td><td>Pluto</td><td><i>NULL</i></td><td><i>NULL</i></td></tr><tr><td>4</td><td>K-PAX</td><td>4</td><td>2004-04-14 14:46</td></tr><tr><td>5</td><td>London</td><td><i>NULL</i></td><td><i>NULL</i></td></tr></table></div>
<div class="callout"><b>כלל אצבע:</b> ב-LEFT JOIN — תנאי על הטבלה <b>הימנית</b> (שאולי חסרה) → ב-<code>ON</code>. תנאי על הטבלה <b>השמאלית</b> (שאותה רוצים לשמור) → ב-<code>WHERE</code>. ב-INNER JOIN אין הבדל בתוצאה.</div>

<h4>Anti-Join — "מי שאין לו אף…"</h4>
<p>LEFT JOIN ואז משאירים רק את השורות שלא מצאו התאמה — אלה שה-PK של הצד הימני שלהן הוא NULL:</p>
<pre>SELECT s.name
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
WHERE e.enrollment_id IS NULL;</pre><p><b>תוצאה:</b> חוברת תרגיל 9 — סטודנטים שלא רשומים לאף קורס — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>name</th></tr><tr><td>Dana</td></tr></table></div>
<pre>SELECT c.course_name
FROM Courses c
LEFT JOIN Enrollments e ON c.course_id = e.course_id
WHERE e.enrollment_id IS NULL;</pre><p><b>תוצאה:</b> חוברת תרגיל 10 — קורסים בלי אף סטודנט — 0 שורות (תוצאה ריקה)</p>
<p>תוצאה ריקה היא תשובה נכונה — בחוברת לכל קורס יש סטודנט. ב-college2 (ישור קו שאלות 2 ו-5):</p>
<pre>SELECT s.id, s.firstName, s.lastName
FROM students s
LEFT JOIN enrollments e ON e.studentId = s.id
WHERE e.id IS NULL;</pre><p><b>תוצאה:</b> סטודנטים בלי אף הרשמה — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>firstName</th><th>lastName</th></tr><tr><td>10</td><td>Lior</td><td>Shalom</td></tr></table></div>
<pre>SELECT a.id, a.title
FROM assignments a
LEFT JOIN submissions sub ON sub.assignmentId = a.id
WHERE sub.id IS NULL;</pre><p><b>תוצאה:</b> מטלות בלי אף הגשה — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>title</th></tr><tr><td>7</td><td>Stored Procedures</td></tr></table></div>
<p>כאן ה-IS NULL ב-WHERE הוא <b>בכוונה</b> — הוא בודק את ה-PK של הצד הימני (שלעולם אינו NULL בשורה אמיתית). אותו דבר אפשר עם <code>NOT EXISTS</code> או <code>NOT IN</code> (בפרק השאילתות המקוננות).</p>

<h4>Self-Join — טבלה עם עצמה</h4>
<p>אותה טבלה פעמיים, עם שני כינויים שונים. שימוש קלאסי: קשר רקורסיבי (<code>EMPLOYEES.Supervisor</code> → <code>EMPLOYEES</code>). ב-college2 — זוגות סטודנטים מאותה עיר:</p>
<pre>SELECT a.firstName AS student1, b.firstName AS student2, a.city
FROM students a
JOIN students b ON a.city = b.city AND a.id &lt; b.id;</pre><p><b>תוצאה:</b> 5 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>student1</th><th>student2</th><th>city</th></tr><tr><td>David</td><td>Maya</td><td>Tel Aviv</td></tr><tr><td>David</td><td>Itai</td><td>Tel Aviv</td></tr><tr><td>Noa</td><td>Shira</td><td>Haifa</td></tr><tr><td>Yossi</td><td>Eyal</td><td>Jerusalem</td></tr><tr><td>Maya</td><td>Itai</td><td>Tel Aviv</td></tr></table></div>
<p><code>a.id &lt; b.id</code> מונע זוג של סטודנט עם עצמו ואת אותו זוג פעמיים (David-Maya וגם Maya-David).</p>

<h4>איך מזהים איזה JOIN השאלה מבקשת?</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>הניסוח בשאלה</th><th>מה כותבים</th></tr>
<tr><td>"הצג X עם Y" (רק מי שיש לו)</td><td dir="ltr">X INNER JOIN Y</td></tr>
<tr><td>"<b>כל</b> ה-X, <b>גם/כולל</b> כאלה שאין להם Y"</td><td dir="ltr">X LEFT JOIN Y</td></tr>
<tr><td>"כל ה-Y…" + "יש לפתור ב-RIGHT JOIN"</td><td dir="ltr">X RIGHT JOIN Y</td></tr>
<tr><td>"X <b>שאין</b> להם אף Y"</td><td dir="ltr">X LEFT JOIN Y … WHERE Y.id IS NULL</td></tr>
<tr><td>"כל ה-X, אבל Y רק אם…"</td><td dir="ltr">X LEFT JOIN Y ON … AND condition</td></tr>
<tr><td>"כל ה-X וכל ה-Y"</td><td dir="ltr">X FULL JOIN Y</td></tr>
<tr><td>קשר רבים-לרבים (סטודנט–קורס, חייזר–מסע)</td><td>דרך טבלת הקישור (Enrollments / Aliens_in_trips)</td></tr>
</table></div>

<div class="callout"><b>ובמונגו?</b> <code>$lookup</code> הוא תמיד <b>LEFT OUTER JOIN</b> (מסמך בלי התאמה מקבל מערך ריק). INNER ≈ <code>$lookup</code> + <code>$unwind</code> (בלי <code>preserveNullAndEmptyArrays</code>). Anti-join ≈ <code>$lookup</code> ואז <code>{ $match: { enr: { $size: 0 } } }</code>.</div>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li>תנאי על הטבלה הימנית של LEFT JOIN ב-WHERE → הופך ל-INNER. שימו אותו ב-ON.</li>
  <li>שרשרת: אחרי LEFT JOIN, גם ה-JOIN הבא חייב להיות LEFT.</li>
  <li>Anti-join: <code>WHERE right.PK IS NULL</code> — לא על עמודה שיכולה להיות NULL בעצמה (כמו grade).</li>
  <li>שם עמודה שקיים בשתי טבלאות (<code>id</code>) חייב קידומת — אחרת "Ambiguous column name".</li>
  <li>שכחת תנאי צירוף (או ON שגוי) = מכפלה קרטזית — יותר מדי שורות.</li>
  <li>"שמות" שעלולים לחזור → <code>DISTINCT</code>.</li>
</ul></div>
`
  },
  {
    id:'group', track:'sql', icon:'📊', title:'GROUP BY, פונקציות צבירה ו-HAVING',
    html:`
<h4>פונקציות צבירה</h4>
<p>פונקציית צבירה הופכת <b>הרבה שורות לערך אחד</b>. בלי GROUP BY — כל הטבלה היא קבוצה אחת:</p>
<pre>SELECT COUNT(*)   AS n,
       MIN(grade) AS min_grade,
       MAX(grade) AS max_grade,
       SUM(grade) AS total,
       AVG(grade) AS avg_grade
FROM Enrollments;            -- practice (workbook) data</pre>
<p><b>תוצאה:</b> ב-SQL Server — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>n</th><th>min_grade</th><th>max_grade</th><th>total</th><th>avg_grade</th></tr><tr><td>8</td><td>55</td><td>95</td><td>649</td><td>81</td></tr></table></div>
<p>הממוצע המדויק הוא <code>649 / 8 = 81.125</code>, אבל grade הוא INT ולכן SQL Server מחזיר 81 — ראו פרק CASE/CAST.</p>
<div style="overflow-x:auto"><table class="mini">
<tr><th>פונקציה</th><th>מה מחזירה</th><th>NULL</th></tr>
<tr><td dir="ltr">COUNT(*)</td><td>מספר <b>שורות</b></td><td>סופר גם שורות עם NULL</td></tr>
<tr><td dir="ltr">COUNT(col)</td><td>מספר ערכים שאינם NULL בעמודה</td><td>מדלג על NULL</td></tr>
<tr><td dir="ltr">COUNT(DISTINCT col)</td><td>מספר ערכים <b>שונים</b></td><td>מדלג על NULL</td></tr>
<tr><td dir="ltr">SUM / AVG</td><td>סכום / ממוצע</td><td>מדלגים על NULL</td></tr>
<tr><td dir="ltr">MIN / MAX</td><td>הקטן / הגדול (גם לטקסט ותאריכים)</td><td>מדלגים על NULL</td></tr>
</table></div>
<pre>SELECT COUNT(*)                  AS all_rows,
       COUNT(grade)              AS graded,
       COUNT(DISTINCT studentId) AS students
FROM submissions;</pre><p><b>תוצאה:</b> שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>all_rows</th><th>graded</th><th>students</th></tr><tr><td>16</td><td>14</td><td>8</td></tr></table></div>
<p>16 הגשות, 14 עם ציון (2 טרם נבדקו), של 8 סטודנטים שונים.</p>

<h4>GROUP BY — קבוצה לכל ערך</h4>
<p><b>מצגת 6, שקף 5</b> — האוכלוסייה הממוצעת בכוכבי הלכת של כל מערכת שמש:</p>
<pre>SELECT constellation, AVG(population) AS avg_population
FROM Planets
GROUP BY constellation;</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>constellation</th><th>avg_population</th></tr><tr><td>Klingonia</td><td>6000000</td></tr><tr><td>Milkyway</td><td>106000000</td></tr><tr><td>Uraion</td><td>20500000</td></tr></table></div>
<p><b>הכלל:</b> כל עמודה ב-SELECT שאינה בתוך פונקציית צבירה <b>חייבת</b> להופיע ב-GROUP BY. אחרת SQL Server מחזיר שגיאה 8120: <i>"Column … is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause"</i>. (המנוע של האתר — SQLite — סלחני ומחזיר ערך שרירותי. במבחן כתבו לפי SQL Server.)</p>
<p>כשמקבצים לפי ישות, מקבצים לפי ה-<b>מפתח</b> שלה + העמודות שמציגים: <code>GROUP BY A.id_no, A.aname</code> — כי שני חייזרים יכולים להיקרא באותו שם.</p>

<h4>COUNT(*) מול COUNT(עמודה) — עם LEFT JOIN</h4>
<p>כמה סטודנטים בכל קורס, <b>כולל</b> קורסים בלי סטודנטים:</p>
<pre>SELECT c.courseName,
       COUNT(*)    AS count_star,
       COUNT(e.id) AS count_col
FROM courses c
LEFT JOIN enrollments e ON e.courseId = c.id
GROUP BY c.id, c.courseName;</pre><p><b>תוצאה:</b> 6 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>courseName</th><th>count_star</th><th>count_col</th></tr><tr><td>MongoDB</td><td>5</td><td>5</td></tr><tr><td>SQL Server</td><td>3</td><td>3</td></tr><tr><td>Python</td><td>2</td><td>2</td></tr><tr><td>Marketing</td><td>2</td><td>2</td></tr><tr><td>Statistics</td><td>3</td><td>3</td></tr><tr><td>Cyber Security</td><td>1</td><td>0</td></tr></table></div>
<div class="callout warn">ל-Cyber Security אין הרשמות, אבל ה-LEFT JOIN יצר לו <b>שורה אחת</b> עם NULL — <code>COUNT(*)</code> סופר אותה ונותן 1 — שגוי! <code>COUNT(e.id)</code> מדלג על ה-NULL ונותן 0 — נכון. אחרי LEFT JOIN סופרים תמיד עמודה מהטבלה הימנית שאינה יכולה להיות NULL בשורה אמיתית — בדרך כלל ה-PK שלה (<code>e.id</code>) או ה-FK שעליו נעשה הצירוף.</div>

<h4>WHERE מול HAVING</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th></th><th dir="ltr">WHERE</th><th dir="ltr">HAVING</th></tr>
<tr><td>מתי</td><td><b>לפני</b> הקיבוץ</td><td><b>אחרי</b> הקיבוץ</td></tr>
<tr><td>מסנן</td><td>שורות</td><td>קבוצות</td></tr>
<tr><td>מותר פונקציית צבירה?</td><td><b>לא</b> (שגיאה 147)</td><td>כן — זה כל הרעיון</td></tr>
</table></div>
<p><b>עבודת ישור קו, שאלה 3</b> — הסטודנטים הרשומים ליותר משני קורסים <u>פעילים</u>:</p>
<pre>SELECT s.id, s.firstName, s.lastName, COUNT(*) AS activeCourses
FROM students s
JOIN enrollments e ON e.studentId = s.id
WHERE e.status = 'Active'            -- rows: only active enrollments
GROUP BY s.id, s.firstName, s.lastName
HAVING COUNT(*) &gt; 2;                 -- groups: more than two</pre><p><b>תוצאה:</b> 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>firstName</th><th>lastName</th><th>activeCourses</th></tr><tr><td>1</td><td>David</td><td>Levi</td><td>3</td></tr><tr><td>7</td><td>Itai</td><td>Friedman</td><td>3</td></tr></table></div>
<p>הסינון לפי סטטוס הוא על <u>שורות</u> → WHERE. הספירה היא על <u>קבוצות</u> → HAVING. ה-WHERE משנה את הספירה: עם "יותר מקורס אחד" (<code>&gt; 1</code>) Noa נכנסת רק בלי ה-WHERE — יש לה 2 הרשמות, אבל רק אחת פעילה:</p>
<pre>SELECT s.firstName, COUNT(*) AS courses
FROM students s
JOIN enrollments e ON e.studentId = s.id
GROUP BY s.id, s.firstName
HAVING COUNT(*) &gt; 1;</pre><p><b>תוצאה:</b> בלי סינון סטטוס — 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>courses</th></tr><tr><td>David</td><td>3</td></tr><tr><td>Noa</td><td>2</td></tr><tr><td>Maya</td><td>2</td></tr><tr><td>Itai</td><td>3</td></tr></table></div>
<pre>SELECT s.firstName, COUNT(*) AS activeCourses
FROM students s
JOIN enrollments e ON e.studentId = s.id
WHERE e.status = 'Active'
GROUP BY s.id, s.firstName
HAVING COUNT(*) &gt; 1;</pre><p><b>תוצאה:</b> רק הרשמות פעילות — Noa יצאה — 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>activeCourses</th></tr><tr><td>David</td><td>3</td></tr><tr><td>Maya</td><td>2</td></tr><tr><td>Itai</td><td>3</td></tr></table></div>
<p><b>מצגת 6, שקף 6</b> — חייזרים שהשתתפו ביותר משני מסעות, וכוכבים שדרכו עליהם יותר מ-15 רגליים:</p>
<pre>SELECT A.aname
FROM Aliens A
JOIN Aliens_in_trips AIT ON A.id_no = AIT.id_no
GROUP BY A.id_no, A.aname
HAVING COUNT(*) &gt; 2;</pre><p><b>תוצאה:</b> 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>aname</th></tr><tr><td>Bin-Laden</td></tr><tr><td>Buck Rogers</td></tr></table></div>
<pre>SELECT P.pname, SUM(A.no_of_legs) AS legs
FROM Planets P
JOIN Trips T             ON P.p_no   = T.p_no
JOIN Aliens_in_trips AIT ON T.t_no   = AIT.t_no
JOIN Aliens A            ON AIT.id_no = A.id_no
GROUP BY P.p_no, P.pname
HAVING SUM(A.no_of_legs) &gt; 15;</pre><p><b>תוצאה:</b> 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>pname</th><th>legs</th></tr><tr><td>Alpha Centaury</td><td>33</td></tr><tr><td>London</td><td>23</td></tr></table></div>

<h4>GROUP BY על כמה עמודות</h4>
<p><b>מצגת 6, שקף 5, שאלה 3</b> — לכל חייזר, כמה פעמים ביקר בכל כוכב: קבוצה לכל <u>צירוף</u> (חייזר, כוכב).</p>
<pre>SELECT A.aname, P.pname, COUNT(*) AS visits
FROM Aliens A
JOIN Aliens_in_trips AIT ON A.id_no = AIT.id_no
JOIN Trips T             ON AIT.t_no = T.t_no
JOIN Planets P           ON T.p_no  = P.p_no
GROUP BY A.id_no, A.aname, P.p_no, P.pname;</pre><p><b>תוצאה:</b> 16 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>aname</th><th>pname</th><th>visits</th></tr><tr><td>E.T.</td><td>Pluto</td><td>1</td></tr><tr><td>E.T.</td><td>London</td><td>1</td></tr><tr><td>Bin-Laden</td><td>Naren</td><td>1</td></tr><tr><td>Bin-Laden</td><td>Alpha Centaury</td><td>1</td></tr><tr><td>Bin-Laden</td><td>K-PAX</td><td>1</td></tr><tr><td colspan="3">… ועוד 11 שורות</td></tr></table></div>

<h4>ממוצע לכל קורס עם שמות (ישור קו, שאלה 6)</h4>
<pre>SELECT c.courseName,
       l.firstName + ' ' + l.lastName       AS lecturer,
       CAST(AVG(sub.grade) AS DECIMAL(5,2)) AS avgGrade
FROM submissions sub
JOIN courses c   ON c.id = sub.courseId
JOIN lecturers l ON l.id = c.lecturerId
GROUP BY c.id, c.courseName, l.firstName, l.lastName;</pre><p><b>תוצאה:</b> 5 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>courseName</th><th>lecturer</th><th>avgGrade</th></tr><tr><td>MongoDB</td><td>Moshe Cohen</td><td>83.00</td></tr><tr><td>SQL Server</td><td>Moshe Cohen</td><td>75.00</td></tr><tr><td>Python</td><td>Rina Levi</td><td>91.00</td></tr><tr><td>Marketing</td><td>Avi Peretz</td><td>70.00</td></tr><tr><td>Statistics</td><td>Avi Peretz</td><td>85.50</td></tr></table></div>
<p>AVG מתעלם מהציונים החסרים (NULL). Cyber Security לא מופיע כי אין לו הגשות; אם רוצים גם אותו — מתחילים מ-courses ועושים LEFT JOIN להגשות (הממוצע יהיה NULL).</p>

<h4>מיון לפי צבירה ו-TOP</h4>
<p>שלושת הקורסים עם הכי הרבה סטודנטים (תרגיל 13 במטלת MongoDB):</p>
<pre>SELECT TOP 3 c.courseName, COUNT(*) AS students
FROM enrollments e
JOIN courses c ON c.id = e.courseId
GROUP BY c.id, c.courseName
ORDER BY students DESC;</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>courseName</th><th>students</th></tr><tr><td>MongoDB</td><td>5</td></tr><tr><td>SQL Server</td><td>3</td></tr><tr><td>Statistics</td><td>3</td></tr></table></div>
<p>ב-ORDER BY מותר להשתמש בכינוי (<code>students</code>) או לחזור על <code>COUNT(*)</code>. הקורסים "SQL Server" ו-"Statistics" שווים (3 כל אחד) — הסדר ביניהם שרירותי.</p>

<h4>חוברת, תרגיל 14 — הדוח המסכם (צעד-אחר-צעד)</h4>
<p>דוח לכל הסטודנטים, גם בלי הרשמות: שם, עיר, מספר קורסים, ממוצע, ציון מקסימלי ומינימלי, Performance ועלות כוללת. חובה: LEFT JOIN, CASE, CAST, GROUP BY; אסור RIGHT JOIN ו-subquery; שורה אחת לכל סטודנט; מיון לפי Performance ואז ממוצע יורד.</p>
<ol>
  <li><b>FROM:</b> מתחילים מ-<code>Students</code> (צריך את כולם) → <code>LEFT JOIN Enrollments</code> → <code>LEFT JOIN Courses</code> (בשביל המחיר).</li>
  <li><b>GROUP BY</b> <code>s.student_id, s.name, s.city</code> → שורה אחת לסטודנט.</li>
  <li><b>מספר קורסים:</b> <code>COUNT(e.course_id)</code> — לא <code>COUNT(*)</code>, אחרת Dana תקבל 1.</li>
  <li><b>ממוצע:</b> <code>CAST(AVG(CAST(e.grade AS DECIMAL(5,2))) AS DECIMAL(5,2))</code> — ה-CAST הפנימי מונע קיטוע של INT, החיצוני קובע 2 ספרות.</li>
  <li><b>Performance:</b> CASE שבודק <u>קודם</u> "אין קורסים" (<code>COUNT(e.course_id) = 0</code>), ורק אחר כך את הספים מהגבוה לנמוך.</li>
  <li><b>עלות:</b> <code>ISNULL(SUM(c.price), 0)</code> — ל-Dana SUM מחזיר NULL.</li>
  <li><b>ORDER BY</b> <code>Performance, [Average Grade] DESC</code> — מותר כי ORDER BY רץ אחרי SELECT.</li>
</ol>
<pre>SELECT s.name AS [Student Name],
       s.city AS City,
       COUNT(e.course_id) AS [Number Of Courses],
       CAST(AVG(CAST(e.grade AS DECIMAL(5,2))) AS DECIMAL(5,2)) AS [Average Grade],
       MAX(e.grade) AS [Best Grade],
       MIN(e.grade) AS [Worst Grade],
       CASE
           WHEN COUNT(e.course_id) = 0 THEN 'Not Enrolled'
           WHEN AVG(CAST(e.grade AS DECIMAL(5,2))) &gt;= 90 THEN 'Excellent'
           WHEN AVG(CAST(e.grade AS DECIMAL(5,2))) &gt;= 80 THEN 'Very Good'
           WHEN AVG(CAST(e.grade AS DECIMAL(5,2))) &gt;= 70 THEN 'Good'
           WHEN AVG(CAST(e.grade AS DECIMAL(5,2))) &gt;= 60 THEN 'Pass'
           ELSE 'Fail'
       END AS Performance,
       ISNULL(SUM(c.price), 0) AS [Total Course Cost]
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses c     ON c.course_id  = e.course_id
GROUP BY s.student_id, s.name, s.city
ORDER BY Performance, [Average Grade] DESC;</pre><p><b>תוצאה:</b> 6 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>Student Name</th><th>City</th><th>Number Of Courses</th><th>Average Grade</th><th>Best Grade</th><th>Worst Grade</th><th>Performance</th><th>Total Course Cost</th></tr><tr><td>Noa</td><td>Tel Aviv</td><td>2</td><td>91.00</td><td>94</td><td>88</td><td>Excellent</td><td>3000</td></tr><tr><td>Tom</td><td>Beer Sheva</td><td>1</td><td>55.00</td><td>55</td><td>55</td><td>Fail</td><td>1500</td></tr><tr><td>Dana</td><td>Haifa</td><td>0</td><td><i>NULL</i></td><td><i>NULL</i></td><td><i>NULL</i></td><td>Not Enrolled</td><td>0</td></tr><tr><td>Ron</td><td>Jerusalem</td><td>1</td><td>68.00</td><td>68</td><td>68</td><td>Pass</td><td>1300</td></tr><tr><td>Dan</td><td>Tel Aviv</td><td>2</td><td>88.50</td><td>95</td><td>82</td><td>Very Good</td><td>2700</td></tr><tr><td>Maya</td><td>Haifa</td><td>2</td><td>83.50</td><td>91</td><td>76</td><td>Very Good</td><td>3000</td></tr></table></div>
<p>Performance הוא טקסט, ולכן המיון שלו <b>אלפביתי</b>: <code>Excellent → Fail → Not Enrolled → Pass → Very Good</code>. בתוך Very Good — Dan עם 88.50 לפני Maya עם 83.50. (פתרון לא רשמי — לתרגילים 8–14 אין פתרון בקובץ המרצה.)</p>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li>עמודה ב-SELECT שלא ב-GROUP BY ולא בצבירה → שגיאה 8120 ב-SQL Server.</li>
  <li>תנאי על COUNT/SUM/AVG ב-WHERE → שגיאה 147. הוא שייך ל-HAVING.</li>
  <li>אחרי LEFT JOIN: <code>COUNT(right.col)</code> ולא <code>COUNT(*)</code>.</li>
  <li>"יותר משני" = <code>&gt; 2</code>; "לפחות שני" = <code>&gt;= 2</code>.</li>
  <li>AVG על INT קוטע; <code>SUM</code> של קבוצה בלי ערכים הוא NULL (לא 0) → <code>ISNULL(SUM(…), 0)</code>.</li>
  <li>סדר: <code>WHERE → GROUP BY → HAVING → ORDER BY</code>. HAVING לפני GROUP BY — שגיאת תחביר.</li>
</ul></div>
`
  },
  {
    id:'nested', track:'sql', icon:'🪆', title:'שאילתות מקוננות וטבלאות זמניות',
    html:`
<p>תת-שאילתה (Subquery) היא <code>SELECT</code> בתוך סוגריים, בתוך שאילתה אחרת. הסילבוס מציג אותה יחד עם <b>טבלאות זמניות</b> כ"טבלאות עזר". כל הדוגמאות של מצגת 6 (שקף 7) כאן — עם התוצאות.</p>

<h4>תת-שאילתה שמחזירה ערך אחד (Scalar) — השוואה ל-AVG / MIN / MAX</h4>
<p><b>שאלה 1</b> — חלליות שהמהירות המקסימלית שלהן מעל הממוצע:</p>
<pre>SELECT sname, max_speed
FROM Ships
WHERE max_speed &gt; (SELECT AVG(max_speed) FROM Ships);</pre><p><b>תוצאה:</b> 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>sname</th><th>max_speed</th></tr><tr><td>Enterprise</td><td>120</td></tr><tr><td>Titanic</td><td>150</td></tr></table></div>
<p>הממוצע הוא <code>(120+150+70+60+50) / 5 = 90</code>. אי אפשר לכתוב <code>WHERE max_speed &gt; AVG(max_speed)</code> — פונקציית צבירה אסורה ב-WHERE.</p>
<p><b>שאלה 2</b> — חייזרים שמספר הרגליים שלהם שווה למינימום:</p>
<pre>SELECT aname
FROM Aliens
WHERE no_of_legs = (SELECT MIN(no_of_legs) FROM Aliens);</pre><p><b>תוצאה:</b> 4 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>aname</th></tr><tr><td>E.T.</td></tr><tr><td>Bin-Laden</td></tr><tr><td>B.A.</td></tr><tr><td>Cher</td></tr></table></div>
<p><b>שאלה 3</b> — שם החללית המהירה ביותר והכוכבים שבהם ביקרה:</p>
<pre>SELECT S.sname, P.pname
FROM Ships S
JOIN Trips T   ON S.s_no = T.s_no
JOIN Planets P ON T.p_no = P.p_no
WHERE S.max_speed = (SELECT MAX(max_speed) FROM Ships);</pre><p><b>תוצאה:</b> 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>sname</th><th>pname</th></tr><tr><td>Titanic</td><td>Naren</td></tr><tr><td>Titanic</td><td>Alpha Centaury</td></tr></table></div>
<p><b>שאלה 4</b> — הכוכב "הכי צפוף" (הכי הרבה אוכלוסייה — אין בטבלה עמודת שטח) והחלליות שביקרו בו:</p>
<pre>SELECT P.pname, S.sname
FROM Planets P
JOIN Trips T ON P.p_no = T.p_no
JOIN Ships S ON T.s_no = S.s_no
WHERE P.population = (SELECT MAX(population) FROM Planets);</pre><p><b>תוצאה:</b> שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>pname</th><th>sname</th></tr><tr><td>Pluto</td><td>Enterprise</td></tr></table></div>

<h4>TOP 1 מול תת-שאילתה — שוויונות</h4>
<pre>SELECT TOP 1 aname, no_of_legs
FROM Aliens
ORDER BY no_of_legs;</pre><p><b>תוצאה:</b> רק חייזר אחד מתוך ארבעה עם 2 רגליים — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>aname</th><th>no_of_legs</th></tr><tr><td>E.T.</td><td>2</td></tr></table></div>
<p>ל-4 חייזרים יש 2 רגליים, אבל <code>TOP 1</code> מחזיר רק אחד (שרירותי). <code>= (SELECT MIN(…))</code> מחזיר את כולם — ולכן הוא התשובה הבטוחה לשאלות "המקסימום/המינימום". (<code>TOP 1 WITH TIES</code> הוא חלופה ב-T-SQL.)</p>

<h4>IN / NOT IN עם תת-שאילתה</h4>
<pre>SELECT firstName, lastName
FROM students
WHERE id IN (SELECT studentId FROM submissions WHERE courseId = 2);</pre><p><b>תוצאה:</b> סטודנטים שהגישו מטלה בקורס 2, הוא קורס SQL Server — 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>lastName</th></tr><tr><td>David</td><td>Levi</td></tr><tr><td>Yossi</td><td>Mizrahi</td></tr><tr><td>Itai</td><td>Friedman</td></tr></table></div>
<pre>SELECT id, firstName, lastName
FROM students
WHERE id NOT IN (SELECT studentId FROM enrollments);</pre><p><b>תוצאה:</b> סטודנטים בלי אף הרשמה — ישור קו שאלה 2 — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>firstName</th><th>lastName</th></tr><tr><td>10</td><td>Lior</td><td>Shalom</td></tr></table></div>
<div class="callout warn"><b>מלכודת NOT IN + NULL:</b> אם תת-השאילתה מחזירה ולו <b>NULL אחד</b>, <code>NOT IN</code> מחזיר תוצאה ריקה — כי <code>x &lt;&gt; NULL</code> הוא UNKNOWN:
<pre>SELECT firstName
FROM students
WHERE id NOT IN (1, 2, NULL);</pre><p><b>תוצאה:</b> 0 שורות (תוצאה ריקה)</p>
כשעמודת תת-השאילתה יכולה להכיל NULL — השתמשו ב-<code>NOT EXISTS</code> או הוסיפו <code>WHERE col IS NOT NULL</code> בתוכה.</div>

<h4>EXISTS / NOT EXISTS — תת-שאילתה מתואמת</h4>
<p>תת-שאילתה <b>מתואמת</b> (correlated) משתמשת בעמודה מהשאילתה החיצונית ורצה "לכל שורה". <code>EXISTS</code> רק בודק אם חזרה שורה כלשהי — מה שכתוב ב-SELECT הפנימי לא משנה (נהוג <code>SELECT 1</code>).</p>
<pre>SELECT c.id, c.courseName
FROM courses c
WHERE NOT EXISTS (SELECT 1
                  FROM enrollments e
                  WHERE e.courseId = c.id);</pre><p><b>תוצאה:</b> קורסים בלי אף הרשמה — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>courseName</th></tr><tr><td>6</td><td>Cyber Security</td></tr></table></div>
<pre>SELECT a.id, a.title
FROM assignments a
WHERE NOT EXISTS (SELECT 1 FROM submissions s WHERE s.assignmentId = a.id);</pre><p><b>תוצאה:</b> מטלות בלי אף הגשה — ישור קו שאלה 5 — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>title</th></tr><tr><td>7</td><td>Stored Procedures</td></tr></table></div>
<p>שלוש דרכים שקולות ל-"X שאין לו Y": <code>LEFT JOIN … WHERE y.id IS NULL</code>, <code>NOT EXISTS</code>, <code>NOT IN</code> (בזהירות עם NULL).</p>
<p>תת-שאילתה מתואמת עם צבירה — ההגשה עם הציון הגבוה ביותר <b>בכל קורס</b>:</p>
<pre>SELECT s.id, s.courseId, s.studentId, s.grade
FROM submissions s
WHERE s.grade = (SELECT MAX(s2.grade)
                 FROM submissions s2
                 WHERE s2.courseId = s.courseId);</pre><p><b>תוצאה:</b> 5 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>courseId</th><th>studentId</th><th>grade</th></tr><tr><td>3</td><td>2</td><td>1</td><td>88</td></tr><tr><td>4</td><td>3</td><td>1</td><td>92</td></tr><tr><td>6</td><td>4</td><td>2</td><td>70</td></tr><tr><td>11</td><td>5</td><td>5</td><td>90</td></tr><tr><td>13</td><td>1</td><td>7</td><td>100</td></tr></table></div>

<h4>תת-שאילתה בתוך SELECT</h4>
<pre>SELECT c.courseName,
       (SELECT COUNT(*) FROM enrollments e WHERE e.courseId = c.id) AS students
FROM courses c;</pre><p><b>תוצאה:</b> 6 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>courseName</th><th>students</th></tr><tr><td>MongoDB</td><td>5</td></tr><tr><td>SQL Server</td><td>3</td></tr><tr><td>Python</td><td>2</td></tr><tr><td>Marketing</td><td>2</td></tr><tr><td>Statistics</td><td>3</td></tr><tr><td>Cyber Security</td><td>0</td></tr></table></div>
<p>כאן <code>COUNT(*)</code> נותן 0 ל-Cyber Security — כי אין JOIN שיוצר שורת NULL. התת-שאילתה חייבת להחזיר <b>ערך אחד</b>, אחרת שגיאה.</p>

<h4>טבלה נגזרת (Derived Table) — תת-שאילתה ב-FROM</h4>
<p>קודם מחשבים ממוצע לכל סטודנט, ואז מסננים ומצרפים שמות. ב-SQL Server לטבלה נגזרת <b>חייב</b> להיות כינוי (<code>AS t</code>):</p>
<pre>SELECT st.firstName, st.lastName, t.avgGrade
FROM (SELECT studentId,
             CAST(AVG(grade) AS DECIMAL(5,2)) AS avgGrade
      FROM submissions
      GROUP BY studentId) AS t
JOIN students st ON st.id = t.studentId
WHERE t.avgGrade &gt; 85;</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>lastName</th><th>avgGrade</th></tr><tr><td>David</td><td>Levi</td><td>88.75</td></tr><tr><td>Maya</td><td>Peretz</td><td>87.50</td></tr><tr><td>Omer</td><td>Biton</td><td>90.00</td></tr></table></div>
<p>אותו דבר עם <b>CTE</b> (<code>WITH</code>) — קריא יותר, אותה תוצאה:</p>
<pre>WITH t AS (
    SELECT studentId, CAST(AVG(grade) AS DECIMAL(5,2)) AS avgGrade
    FROM submissions
    GROUP BY studentId
)
SELECT st.firstName, st.lastName, t.avgGrade
FROM t
JOIN students st ON st.id = t.studentId
WHERE t.avgGrade &gt; 85;</pre>

<h4>טבלאות זמניות (#temp)</h4>
<p>טבלה ששמה מתחיל ב-<code>#</code> נשמרת ב-tempdb ונמחקת אוטומטית בסוף החיבור (session). <code>##</code> = גלובלית לכל החיבורים. שימושית לפירוק שאילתה מסובכת לשלבים.</p>
<p><b>דרך 1 — SELECT … INTO</b> (יוצרת את הטבלה מהתוצאה):</p>
<pre>SELECT studentId, COUNT(*) AS activeCourses
INTO #active
FROM enrollments
WHERE status = 'Active'
GROUP BY studentId;

SELECT s.firstName, a.activeCourses
FROM #active a
JOIN students s ON s.id = a.studentId
WHERE a.activeCourses &gt;= 2;</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>activeCourses</th></tr><tr><td>David</td><td>3</td></tr><tr><td>Maya</td><td>2</td></tr><tr><td>Itai</td><td>3</td></tr></table></div>
<p><b>דרך 2 — CREATE TABLE ואז INSERT … SELECT:</b></p>
<pre>CREATE TABLE #courseAvg (
    courseId  INT,
    avgGrade  DECIMAL(5,2)
);

INSERT INTO #courseAvg (courseId, avgGrade)
SELECT courseId, AVG(grade)
FROM submissions
GROUP BY courseId;

SELECT c.courseName, ca.avgGrade
FROM #courseAvg ca
JOIN courses c ON c.id = ca.courseId
WHERE ca.avgGrade &gt;= 80;</pre><p><b>תוצאה:</b> 3 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>courseName</th><th>avgGrade</th></tr><tr><td>MongoDB</td><td>83.00</td></tr><tr><td>Python</td><td>91.00</td></tr><tr><td>Statistics</td><td>85.50</td></tr></table></div>
<pre>DROP TABLE #courseAvg;      -- optional: dropped automatically when the session ends</pre>
<p>ב-SQL Server יש גם <b>משתנה טבלה</b>: <code>DECLARE @t TABLE (courseId INT, avgGrade DECIMAL(5,2));</code> — חי רק בתוך ה-batch.</p>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li><code>=</code> מול תת-שאילתה שמחזירה <b>כמה</b> שורות → שגיאה ("Subquery returned more than 1 value"). במקרה כזה <code>IN</code>.</li>
  <li><code>NOT IN</code> עם NULL ברשימה → תוצאה ריקה.</li>
  <li>פונקציית צבירה לא נכנסת ל-WHERE ישירות — רק דרך תת-שאילתה: <code>WHERE x &gt; (SELECT AVG(x) …)</code>.</li>
  <li>טבלה נגזרת בלי כינוי → שגיאה ב-SQL Server.</li>
  <li><code>ORDER BY</code> בתוך תת-שאילתה/טבלה נגזרת אסור (אלא עם TOP).</li>
  <li>"הכי גבוה/נמוך" — תת-שאילתה עם MAX/MIN תופסת שוויונות; TOP 1 לא.</li>
</ul></div>
`
  },
  {
    id:'advanced', track:'sql', icon:'⚙️', title:'VIEW, פרוצדורות, טריגרים וטרנזקציות',
    html:`
<div class="callout"><b>מהסילבוס:</b> "בסוף נכנס לאלמנטים תכנותיים יותר של SQL כולל טריגרים ופרוצדורות שמורות" — וגם אינדקסים ואופטימיזציה כנושא אופציונלי. "הבחינה הסופית כוללת את כלל החומר הנלמד", אז כדאי להכיר את התחביר. הקוד כאן הוא T-SQL של SQL Server; המנוע באתר לא מריץ פרוצדורות וטריגרים, ולכן כשמוצגת תוצאה — היא מה ש-SQL Server היה מחזיר על נתוני college2.</div>

<h4>GO — מפריד אצוות (batch)</h4>
<p><code>GO</code> אינו פקודת SQL אלא סימן ל-SSMS "שלח עד כאן". <code>CREATE VIEW</code>, <code>CREATE PROCEDURE</code> ו-<code>CREATE TRIGGER</code> חייבים להיות <b>הפקודה הראשונה באצווה</b> — לכן כותבים <code>GO</code> לפניהם ואחריהם, לבד בשורה.</p>

<h4>VIEW — שאילתה שמורה</h4>
<p>View הוא "טבלה וירטואלית": נשמרת <b>השאילתה</b>, לא הנתונים — ולכן הוא תמיד מעודכן. משתמשים בו לפישוט שאילתות חוזרות ולהרשאות (חשיפת חלק מהעמודות בלבד).</p>
<pre>CREATE VIEW vw_ActiveEnrollments AS
SELECT s.firstName, s.lastName, c.courseName, e.enrollmentDate
FROM enrollments e
JOIN students s ON s.id = e.studentId
JOIN courses c  ON c.id = e.courseId
WHERE e.status = 'Active';
GO

SELECT *
FROM vw_ActiveEnrollments
WHERE courseName = 'MongoDB';</pre><p><b>תוצאה:</b> 5 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>firstName</th><th>lastName</th><th>courseName</th><th>enrollmentDate</th></tr><tr><td>David</td><td>Levi</td><td>MongoDB</td><td>2025-10-01</td></tr><tr><td>Noa</td><td>Cohen</td><td>MongoDB</td><td>2025-10-02</td></tr><tr><td>Maya</td><td>Peretz</td><td>MongoDB</td><td>2025-10-06</td></tr><tr><td>Itai</td><td>Friedman</td><td>MongoDB</td><td>2025-10-08</td></tr><tr><td>Tamar</td><td>Golan</td><td>MongoDB</td><td>2025-10-10</td></tr></table></div>
<ul>
  <li>שינוי: <code>ALTER VIEW vw_ActiveEnrollments AS …</code>; מחיקה: <code>DROP VIEW vw_ActiveEnrollments;</code></li>
  <li>אסור <code>ORDER BY</code> בתוך ה-View (אלא עם TOP) — ממיינים בשאילתה שקוראת ממנו.</li>
</ul>

<h4>STORED PROCEDURE — פרוצדורה שמורה</h4>
<p>תוכנית שנשמרת בשרת ומקבלת <b>פרמטרים</b> (מתחילים ב-<code>@</code>). מריצים עם <code>EXEC</code>. (הקידומת <code>sp_</code> בשמות כאן עובדת, אבל Microsoft ממליצה להימנע ממנה — היא מסמנת פרוצדורות מערכת. בפרויקט אמיתי נהוג <code>usp_</code> או שם בלי קידומת.)</p>
<pre>CREATE PROCEDURE sp_StudentsByCity
    @city NVARCHAR(50)
AS
BEGIN
    SELECT id, firstName, lastName
    FROM students
    WHERE city = @city;
END;
GO

EXEC sp_StudentsByCity @city = N'Haifa';     -- or: EXEC sp_StudentsByCity N'Haifa';</pre><p><b>תוצאה:</b> הרצת <code>EXEC sp_StudentsByCity @city = N'Haifa'</code> — 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>id</th><th>firstName</th><th>lastName</th></tr><tr><td>2</td><td>Noa</td><td>Cohen</td></tr><tr><td>6</td><td>Shira</td><td>Avraham</td></tr></table></div>
<p>פרוצדורה עם בדיקות ו-INSERT — רישום סטודנט לקורס:</p>
<pre>CREATE PROCEDURE sp_EnrollStudent
    @studentId INT,
    @courseId  INT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM students WHERE id = @studentId)
    BEGIN
        PRINT 'Student not found';
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM enrollments
               WHERE studentId = @studentId AND courseId = @courseId)
    BEGIN
        PRINT 'Already enrolled';
        RETURN;
    END

    DECLARE @newId INT;
    SELECT @newId = ISNULL(MAX(id), 0) + 1 FROM enrollments;

    INSERT INTO enrollments (id, studentId, courseId, enrollmentDate, status)
    VALUES (@newId, @studentId, @courseId, GETDATE(), 'Active');
END;
GO

EXEC sp_EnrollStudent @studentId = 10, @courseId = 6;   -- Lior -&gt; Cyber Security (new id = 16)
EXEC sp_EnrollStudent 10, 6;                            -- second time: prints 'Already enrolled'</pre>
<p>פרמטר <b>OUTPUT</b> — הפרוצדורה מחזירה ערכים למשתנים של מי שקרא לה:</p>
<pre>CREATE PROCEDURE sp_CourseStats
    @courseId INT,
    @students INT OUTPUT,
    @avgGrade DECIMAL(5,2) OUTPUT
AS
BEGIN
    SELECT @students = COUNT(*)   FROM enrollments WHERE courseId = @courseId;
    SELECT @avgGrade = AVG(grade) FROM submissions WHERE courseId = @courseId;
END;
GO

DECLARE @n INT, @avg DECIMAL(5,2);
EXEC sp_CourseStats @courseId = 1, @students = @n OUTPUT, @avgGrade = @avg OUTPUT;
SELECT @n AS students, @avg AS avgGrade;</pre>
<p><b>תוצאה:</b> ב-SQL Server, עבור קורס 1 — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>students</th><th>avgGrade</th></tr><tr><td>5</td><td>83.00</td></tr></table></div>
<p>שינוי: <code>ALTER PROCEDURE</code>; מחיקה: <code>DROP PROCEDURE sp_CourseStats;</code>. משתנים: <code>DECLARE @x INT = 5;</code>, <code>SET @x = 6;</code>, <code>SELECT @x = MAX(id) FROM …</code>.</p>

<h4>TRIGGER — קוד שרץ אוטומטית</h4>
<p>טריגר "נדלק" מעצמו על INSERT / UPDATE / DELETE בטבלה. בתוכו יש שתי טבלאות-מדומות:</p>
<div style="overflow-x:auto"><table class="mini">
<tr><th>הפעולה</th><th dir="ltr">inserted</th><th dir="ltr">deleted</th></tr>
<tr><td dir="ltr">INSERT</td><td>השורות החדשות</td><td>ריקה</td></tr>
<tr><td dir="ltr">DELETE</td><td>ריקה</td><td>השורות שנמחקו</td></tr>
<tr><td dir="ltr">UPDATE</td><td>הערכים <b>החדשים</b></td><td>הערכים <b>הישנים</b></td></tr>
</table></div>
<p><b>AFTER UPDATE</b> — יומן שינויי ציונים:</p>
<pre>CREATE TABLE grade_log (
    logId         INT IDENTITY(1,1) PRIMARY KEY,
    submissionId  INT,
    oldGrade      DECIMAL(5,2),
    newGrade      DECIMAL(5,2),
    changedAt     DATETIME DEFAULT GETDATE()
);
GO

CREATE TRIGGER trg_GradeChanged
ON submissions
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO grade_log (submissionId, oldGrade, newGrade)
    SELECT d.id, d.grade, i.grade
    FROM inserted i
    JOIN deleted d ON d.id = i.id
    WHERE ISNULL(d.grade, -1) &lt;&gt; ISNULL(i.grade, -1);   -- only real changes
END;
GO

UPDATE submissions SET grade = 88 WHERE id = 8;   -- Maya's ungraded submission
SELECT submissionId, oldGrade, newGrade FROM grade_log;</pre>
<p><b>תוצאה:</b> ב-SQL Server — שורה אחת</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>submissionId</th><th>oldGrade</th><th>newGrade</th></tr><tr><td>8</td><td><i>NULL</i></td><td>88.00</td></tr></table></div>
<p><b>AFTER INSERT עם ביטול</b> — כלל עסקי: אי אפשר להגיש אחרי מועד ההגשה:</p>
<pre>CREATE TRIGGER trg_NoLateSubmission
ON submissions
AFTER INSERT
AS
BEGIN
    IF EXISTS (SELECT 1
               FROM inserted i
               JOIN assignments a ON a.id = i.assignmentId
               WHERE i.submissionDate &gt; a.dueDate)
    BEGIN
        RAISERROR('Submission after the due date is not allowed', 16, 1);
        ROLLBACK TRANSACTION;          -- cancels the INSERT
    END
END;</pre>
<p><b>AFTER DELETE</b> — ארכיון: <code>INSERT INTO students_archive (id, firstName, lastName, deletedAt) SELECT id, firstName, lastName, GETDATE() FROM deleted;</code>. יש גם <code>INSTEAD OF</code> — רץ <u>במקום</u> הפעולה המקורית.</p>
<div class="callout warn">טריגר רץ <b>פעם אחת לכל פקודה</b>, לא לכל שורה. <code>UPDATE … WHERE courseId = 1</code> מכניס ל-inserted כמה שורות — לכן כותבים קוד "על קבוצה" (JOIN עם inserted/deleted), ולא <code>SELECT @g = grade FROM inserted</code> שיתפוס רק שורה אחת.</div>

<h4>טרנזקציות — הכל או כלום</h4>
<pre>BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE enrollments SET status = 'Inactive'
    WHERE studentId = 2 AND courseId = 1;           -- Noa leaves MongoDB

    INSERT INTO enrollments (id, studentId, courseId, enrollmentDate, status)
    VALUES (16, 2, 6, '2025-10-15', 'Active');       -- ...and joins Cyber Security

    COMMIT TRANSACTION;          -- both succeeded -&gt; save
END TRY
BEGIN CATCH
    IF @@TRANCOUNT &gt; 0
        ROLLBACK TRANSACTION;    -- any error -&gt; undo both
    PRINT ERROR_MESSAGE();
END CATCH;</pre>
<div style="overflow-x:auto"><table class="mini">
<tr><th>ACID</th><th>משמעות</th></tr>
<tr><td><b>A</b>tomicity</td><td>הכל או כלום — אין "חצי העברה".</td></tr>
<tr><td><b>C</b>onsistency</td><td>מצב תקין למצב תקין — כל האילוצים נשמרים.</td></tr>
<tr><td><b>I</b>solation</td><td>טרנזקציות במקביל לא רואות זו את חצאי-העבודה של זו.</td></tr>
<tr><td><b>D</b>urability</td><td>אחרי COMMIT — השינוי נשמר גם אם השרת נופל.</td></tr>
</table></div>
<p>אלה פקודות ה-<b>TCL</b>. כל פקודה בודדת ב-SQL Server היא ממילא טרנזקציה אוטומטית (autocommit).</p>

<h4>אינדקסים — למה ומתי (נושא אופציונלי)</h4>
<p>אינדקס הוא מבנה עזר (כמו אינדקס בסוף ספר) שמאפשר למצוא שורות בלי לסרוק את כל הטבלה.</p>
<pre>CREATE INDEX IX_enrollments_studentId ON enrollments (studentId);
CREATE UNIQUE INDEX UX_students_email ON students (email);
CREATE INDEX IX_submissions_course_grade ON submissions (courseId, grade);
DROP INDEX IX_enrollments_studentId ON enrollments;</pre>
<ul>
  <li><b>כדאי</b> על עמודות שמופיעות הרבה ב-<code>WHERE</code>, <code>JOIN … ON</code> (בעיקר עמודות FK), <code>ORDER BY</code> ו-<code>GROUP BY</code>, ובעלות ערכים רבים ושונים.</li>
  <li><b>לא כדאי</b> בטבלה קטנה, על עמודה עם מעט ערכים (status עם 2 ערכים), או על עמודה שמתעדכנת כל הזמן.</li>
  <li><b>המחיר:</b> כל INSERT/UPDATE/DELETE צריך לעדכן גם את האינדקסים, ויש עלות אחסון.</li>
  <li><b>Clustered</b> — קובע את הסדר הפיזי של השורות; אחד לטבלה (ה-PK כברירת מחדל). <b>Nonclustered</b> — מבנה נפרד עם מצביעים; אפשר הרבה.</li>
  <li>במונגו: <code>db.enrollments.createIndex({ studentId: 1 })</code>.</li>
</ul>

<h4>DCL — הרשאות (בקצרה)</h4>
<pre>GRANT SELECT ON vw_ActiveEnrollments TO analyst;     -- read access to the view only
REVOKE SELECT ON vw_ActiveEnrollments FROM analyst;</pre>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li><code>CREATE PROCEDURE/VIEW/TRIGGER</code> חייב להיות ראשון באצווה — <code>GO</code> לפניו.</li>
  <li>פרמטרים ומשתנים מתחילים ב-<code>@</code>; מריצים פרוצדורה עם <code>EXEC</code> (לא CALL כמו ב-MySQL).</li>
  <li>בטריגר: inserted = חדש, deleted = ישן. ב-UPDATE יש את שתיהן.</li>
  <li>טריגר רץ פעם אחת לפקודה — לכתוב על קבוצה, לא על שורה.</li>
  <li>View לא שומר נתונים ולא מקבל ORDER BY.</li>
  <li>אינדקס מאיץ קריאה ומאט כתיבה.</li>
</ul></div>
`
  },
  {
    id:'erd', track:'sql', icon:'🗺️', title:'ERD ומילון נתונים',
    html:`
<p>במבחן לדוגמה של הקורס היו 3 שאלות: <b>ERD מסיפור מקרה</b> — 45 נק', <b>טבלת מילון נתונים</b> — 10 נק', ו<b>עשר שאילתות SQL</b> — 45 נק'. גם כשהדגש הוא SQL + MongoDB — תכנון נכון (ישויות, קשרים, מפתחות) הוא הבסיס לשתיהן, ובמונגו הוא מכתיב את ההחלטה בין הטמעה (Embedding) להפניה (Referencing).</p>

<h4>שלבי הפתרון — ERD מסיפור</h4>
<ol>
  <li><b>ישויות</b> — שמות עצם מרכזיים שעליהם שומרים מידע (סטודנט, מרצה, קורס). כל ישות → טבלה.</li>
  <li><b>תכונות</b> — פרטי המידע של כל ישות. מסמנים את <u>המפתח</u> בקו תחתון.</li>
  <li><b>קשרים</b> — פעלים בין ישויות: מרצה <u>מלמד</u> קורס, סטודנט <u>נרשם</u> לקורס.</li>
  <li><b>קרדינליות</b> — 1:1, 1:N או M:N, לפי ניסוח הסיפור (ראו טבלה).</li>
  <li><b>השתתפות</b> — חובה (כל X חייב Y) או רשות (X יכול בלי Y).</li>
  <li><b>תכונות של קשר</b> — מידע ששייך לצירוף ולא לאף ישות לבד (הציון שייך ל"סטודנט בקורס").</li>
  <li><b>ישויות חלשות</b> וסוגי תכונות מיוחדים (רב-ערכית, נגזרת, מורכבת).</li>
</ol>

<h4>איך מזהים קרדינליות מהניסוח</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>בסיפור כתוב</th><th>קרדינליות</th><th>במימוש</th></tr>
<tr><td>"לכל מחלקה ראש מחלקה <b>אחד</b>, וכל מרצה עומד בראש מחלקה אחת לכל היותר"</td><td>1:1</td><td>FK + UNIQUE באחד הצדדים (עדיף בצד שההשתתפות בו חובה)</td></tr>
<tr><td>"במחלקה <b>הרבה</b> מרצים, וכל מרצה שייך למחלקה <b>אחת</b>"</td><td>1:N</td><td>FK בצד ה-N (lecturers.deptId)</td></tr>
<tr><td>"סטודנט נרשם ל<b>כמה</b> קורסים, ובכל קורס <b>הרבה</b> סטודנטים"</td><td>M:N</td><td><b>טבלת גישור</b> (Enrollments) עם שני ה-FK</td></tr>
<tr><td>"עובד מדווח למנהל, שהוא גם עובד"</td><td>רקורסיבי 1:N</td><td>FK לאותה טבלה: <code>Supervisor (EMPLOYEES)</code></td></tr>
</table></div>

<h4>סימונים בתרשים (Chen)</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>רכיב</th><th>צורה</th></tr>
<tr><td>ישות</td><td>מלבן</td></tr>
<tr><td>ישות חלשה</td><td>מלבן <b>כפול</b>; הקשר המזהה שלה — מעוין כפול; המפתח החלקי — קו תחתון מקווקו</td></tr>
<tr><td>קשר</td><td>מעוין, עם 1 / N / M על הקווים</td></tr>
<tr><td>תכונה / תכונת מפתח</td><td>אליפסה / אליפסה עם קו תחתון</td></tr>
<tr><td>תכונה רב-ערכית (כמה טלפונים)</td><td>אליפסה כפולה</td></tr>
<tr><td>תכונה נגזרת (גיל מתאריך לידה)</td><td>אליפסה מקווקוות</td></tr>
<tr><td>השתתפות חובה / רשות</td><td>קו כפול / קו יחיד</td></tr>
</table></div>
<p>בסימון "רגלי עורב" (Crow's Foot): מזלג = רבים, קו = אחד, עיגול = אפס (רשות).</p>

<h4>דוגמה מלאה — מסיפור לטבלאות</h4>
<div class="callout"><b>הסיפור:</b> המכללה מנהלת סטודנטים, מרצים וקורסים. לכל סטודנט: ת"ז, שם, תאריך לידה ו<u>כמה</u> מספרי טלפון. כל מרצה שייך למחלקה אחת, ובכל מחלקה מרצים רבים. כל קורס מועבר ע"י מרצה אחד, ומרצה יכול ללמד כמה קורסים. סטודנט נרשם לקורסים רבים ובכל קורס סטודנטים רבים; בכל רישום נשמרים תאריך הרישום והציון. לכל קורס מטלות הממוספרות 1, 2, 3… <u>בתוך הקורס</u>.</div>
<ul>
  <li><b>ישויות:</b> <code>STUDENT</code>, <code>LECTURER</code>, <code>DEPARTMENT</code>, <code>COURSE</code>, ו-<code>ASSIGNMENT</code> — ישות <b>חלשה</b>: "מטלה 2" לא מזהה מטלה בלי הקורס.</li>
  <li><b>קשרים:</b> <code>DEPARTMENT 1:N LECTURER</code> · <code>LECTURER 1:N COURSE</code> · <code>STUDENT M:N COURSE</code> עם התכונות <code>EnrollDate, Grade</code> · <code>COURSE 1:N ASSIGNMENT</code> — קשר מזהה.</li>
  <li><b>תכונות מיוחדות:</b> <code>Phones</code> — רב-ערכית; <code>Age</code> — נגזרת מ-<code>BirthDate</code>, ולכן לא נשמרת.</li>
</ul>
<pre>DEPARTMENTS    (<u>DeptID</u>, DeptName)
LECTURERS      (<u>LecturerID</u>, Name, DeptID (DEPARTMENTS))
COURSES        (<u>CourseID</u>, CourseName, LecturerID (LECTURERS))
STUDENTS       (<u>StudentID</u>, Name, BirthDate)
STUDENT_PHONES (<u>StudentID (STUDENTS)</u>, <u>Phone</u>)                       -- multi-valued attribute
ENROLLMENTS    (<u>StudentID (STUDENTS)</u>, <u>CourseID (COURSES)</u>, EnrollDate, Grade)   -- M:N bridge
ASSIGNMENTS    (<u>CourseID (COURSES)</u>, <u>AssignmentNo</u>, Title, DueDate)   -- weak entity</pre>

<h4>כללי המעבר מ-ERD לטבלאות</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>במודל</th><th>בטבלאות</th></tr>
<tr><td>ישות חזקה</td><td>טבלה; המפתח → PK.</td></tr>
<tr><td>קשר 1:N</td><td>ה-PK של צד ה-1 נכנס כ-FK לטבלה של צד ה-N.</td></tr>
<tr><td>קשר M:N</td><td>טבלה חדשה עם שני ה-FK (יחד — PK מורכב, או PK נפרד + UNIQUE), ותכונות הקשר (ציון, תאריך).</td></tr>
<tr><td>קשר 1:1</td><td>FK בצד אחד + UNIQUE (או FK שהוא גם ה-PK, כמו VIP_CUSTOMERS).</td></tr>
<tr><td>ישות חלשה</td><td>PK = ה-PK של ישות הבעלים + המפתח החלקי.</td></tr>
<tr><td>תכונה רב-ערכית</td><td>טבלה נפרדת (מפתח הישות + הערך).</td></tr>
<tr><td>תכונה מורכבת (כתובת)</td><td>מפרקים לעמודות פשוטות: <code>Street, City, Zip</code>.</td></tr>
<tr><td>תכונה נגזרת</td><td>לא נשמרת — מחשבים בשאילתה.</td></tr>
</table></div>
<div class="callout">במערכת המכללה של ישור קו טבלת הגישור <code>enrollments</code> קיבלה <b>PK נפרד</b> (<code>id</code>) — זה לגיטימי, ואז כדאי <code>UNIQUE (studentId, courseId)</code> כדי למנוע רישום כפול. במונגו אותו קשר M:N נשמר כ-collection נפרד של הרשמות (Referencing), כי מספר ההרשמות גדל בלי גבול.</div>

<h4>שאלה 2: מילון נתונים (Data Dictionary)</h4>
<p>לכל תכונה של כל ישות — שורה בטבלה עם 7 העמודות. דוגמה מלאה לישות Student של college2 (ולשתי עמודות FK מ-Enrollment):</p>
<div style="overflow-x:auto">
<table class="mini" style="min-width:640px">
<tr><th dir="ltr">Entity</th><th dir="ltr">Attribute</th><th dir="ltr">Type</th><th dir="ltr">Description</th><th dir="ltr">Data Type</th><th dir="ltr">Value Domain</th><th dir="ltr">Default Value</th></tr>
<tr><td dir="ltr">Student</td><td dir="ltr">id</td><td>PK</td><td>מזהה ייחודי של סטודנט</td><td dir="ltr">INT</td><td>מספר שלם חיובי, ייחודי, לא NULL</td><td>—</td></tr>
<tr><td dir="ltr">Student</td><td dir="ltr">firstName</td><td>רגילה, חובה</td><td>שם פרטי</td><td dir="ltr">NVARCHAR(50)</td><td>טקסט עד 50 תווים, לא ריק</td><td>—</td></tr>
<tr><td dir="ltr">Student</td><td dir="ltr">lastName</td><td>רגילה, חובה</td><td>שם משפחה</td><td dir="ltr">NVARCHAR(50)</td><td>טקסט עד 50 תווים, לא ריק</td><td>—</td></tr>
<tr><td dir="ltr">Student</td><td dir="ltr">email</td><td>מפתח חלופי (UNIQUE)</td><td>כתובת דוא"ל</td><td dir="ltr">VARCHAR(100)</td><td>פורמט x@y.z, ייחודי</td><td>—</td></tr>
<tr><td dir="ltr">Student</td><td dir="ltr">phone</td><td>רגילה, רשות</td><td>טלפון נייד</td><td dir="ltr">CHAR(10)</td><td>05 ואחריו 8 ספרות</td><td dir="ltr">NULL</td></tr>
<tr><td dir="ltr">Student</td><td dir="ltr">city</td><td>רגילה</td><td>עיר מגורים</td><td dir="ltr">NVARCHAR(50)</td><td>שם עיר</td><td dir="ltr">'Tel Aviv'</td></tr>
<tr><td dir="ltr">Student</td><td dir="ltr">age</td><td>רגילה</td><td>גיל בשנים</td><td dir="ltr">INT</td><td>16–120</td><td dir="ltr">NULL</td></tr>
<tr><td dir="ltr">Student</td><td dir="ltr">registrationYear</td><td>רגילה</td><td>שנת ההרשמה למכללה</td><td dir="ltr">INT</td><td>2000 עד השנה הנוכחית</td><td dir="ltr">YEAR(GETDATE())</td></tr>
<tr><td dir="ltr">Enrollment</td><td dir="ltr">studentId</td><td>FK → Student</td><td>הסטודנט שנרשם</td><td dir="ltr">INT</td><td>id קיים בטבלת students</td><td>—</td></tr>
<tr><td dir="ltr">Enrollment</td><td dir="ltr">status</td><td>רגילה</td><td>האם ההרשמה פעילה</td><td dir="ltr">VARCHAR(20)</td><td dir="ltr">'Active' / 'Inactive'</td><td dir="ltr">'Active'</td></tr>
</table>
</div>
<ul>
  <li><b>Type</b> = תפקיד התכונה: PK / FK / מפתח חלופי / רגילה (ואפשר לציין חובה/רשות, רב-ערכית, נגזרת).</li>
  <li><b>Data Type</b> = הטיפוס הטכני ב-SQL Server: <code>INT, NVARCHAR(n), DECIMAL(p,s), DATE, BIT</code>.</li>
  <li><b>Value Domain</b> = הערכים החוקיים — טווח, פורמט, רשימה סגורה, או "קיים בטבלה X" ל-FK. זה בדיוק מה שהופך אחר כך ל-CHECK / FK.</li>
  <li><b>Default Value</b> = הערך שנכנס כשלא מציינים — הופך ל-DEFAULT ב-CREATE TABLE.</li>
</ul>

<div class="callout warn"><b>מלכודות נפוצות</b>
<ul>
  <li>קשר M:N <b>לא</b> מממשים עם FK באחת הטבלאות — רק בטבלת גישור.</li>
  <li>ב-1:N ה-FK עובר לצד ה-<b>N</b> (לקורס יש lecturerId, לא למרצה רשימת קורסים).</li>
  <li>תכונה של הקשר (ציון, תאריך רישום) שייכת לטבלת הגישור — לא לסטודנט ולא לקורס.</li>
  <li>ישות חלשה: המפתח שלה כולל את מפתח הבעלים.</li>
  <li>תכונה נגזרת (גיל) לא שומרים; תכונה רב-ערכית (טלפונים) — טבלה נפרדת.</li>
  <li>במילון הנתונים: Type (תפקיד) ≠ Data Type (טיפוס טכני).</li>
</ul></div>
`
  },
  {
    id:'mssql', track:'sql', icon:'🛠️', title:'T-SQL מול MySQL/SQLite וטעויות קלאסיות',
    html:`
<p>הקורס נלמד על <b>Microsoft SQL Server</b> (T-SQL), אבל הרבה חומר ברשת (ומנוע התרגול באתר — SQLite) כתוב בניב אחר. הטבלה הזו היא "מילון תרגום" — במבחן כותבים בעמודה של SQL Server.</p>

<h4>T-SQL מול MySQL / SQLite</h4>
<div style="overflow-x:auto">
<table class="mini" style="min-width:600px">
<tr><th>נושא</th><th dir="ltr">SQL Server (T-SQL)</th><th dir="ltr">MySQL</th><th dir="ltr">SQLite</th></tr>
<tr><td>הגבלת שורות</td><td dir="ltr">SELECT TOP 5 …</td><td dir="ltr">… LIMIT 5</td><td dir="ltr">… LIMIT 5</td></tr>
<tr><td>דילוג + הגבלה</td><td dir="ltr">ORDER BY x OFFSET 10 ROWS FETCH NEXT 5 ROWS ONLY</td><td dir="ltr">LIMIT 10, 5</td><td dir="ltr">LIMIT 5 OFFSET 10</td></tr>
<tr><td>שרשור</td><td dir="ltr">a + ' ' + b  /  CONCAT(a, b)</td><td dir="ltr">CONCAT(a, b)</td><td dir="ltr">a || b</td></tr>
<tr><td>החלפת NULL</td><td dir="ltr">ISNULL(x, 0)</td><td dir="ltr">IFNULL(x, 0)</td><td dir="ltr">IFNULL(x, 0)</td></tr>
<tr><td>אורך מחרוזת</td><td dir="ltr">LEN(s)</td><td dir="ltr">LENGTH(s)</td><td dir="ltr">LENGTH(s)</td></tr>
<tr><td>תת-מחרוזת</td><td dir="ltr">SUBSTRING(s, 1, 3), LEFT(s, 3)</td><td dir="ltr">SUBSTRING / LEFT</td><td dir="ltr">substr(s, 1, 3)</td></tr>
<tr><td>עכשיו</td><td dir="ltr">GETDATE()</td><td dir="ltr">NOW()</td><td dir="ltr">datetime('now')</td></tr>
<tr><td>הפרש תאריכים</td><td dir="ltr">DATEDIFF(day, start, end)</td><td dir="ltr">DATEDIFF(end, start)</td><td dir="ltr">julianday(end) - julianday(start)</td></tr>
<tr><td>הוספה לתאריך</td><td dir="ltr">DATEADD(day, 7, d)</td><td dir="ltr">DATE_ADD(d, INTERVAL 7 DAY)</td><td dir="ltr">date(d, '+7 days')</td></tr>
<tr><td>מספור אוטומטי</td><td dir="ltr">INT IDENTITY(1,1)</td><td dir="ltr">AUTO_INCREMENT</td><td dir="ltr">INTEGER PRIMARY KEY</td></tr>
<tr><td>שם עם רווח</td><td dir="ltr">[First Name]</td><td dir="ltr">\`First Name\`</td><td dir="ltr">"First Name"</td></tr>
<tr><td>טקסט עברי</td><td dir="ltr">NVARCHAR + N'חיפה'</td><td dir="ltr">VARCHAR (utf8mb4)</td><td dir="ltr">TEXT</td></tr>
<tr><td>בוליאני</td><td dir="ltr">BIT (0/1)</td><td dir="ltr">BOOLEAN</td><td dir="ltr">INTEGER</td></tr>
<tr><td>שינוי טיפוס עמודה</td><td dir="ltr">ALTER TABLE t ALTER COLUMN c INT</td><td dir="ltr">ALTER TABLE t MODIFY c INT</td><td>— (בונים טבלה מחדש)</td></tr>
<tr><td>שינוי שם עמודה</td><td dir="ltr">EXEC sp_rename 't.a', 'b', 'COLUMN'</td><td dir="ltr">RENAME COLUMN a TO b</td><td dir="ltr">RENAME COLUMN a TO b</td></tr>
<tr><td>טבלה זמנית</td><td dir="ltr">#t  /  SELECT … INTO #t</td><td dir="ltr">CREATE TEMPORARY TABLE</td><td dir="ltr">CREATE TEMP TABLE</td></tr>
<tr><td>הרצת פרוצדורה</td><td dir="ltr">EXEC p @a = 5</td><td dir="ltr">CALL p(5)</td><td>— אין</td></tr>
<tr><td>משתנים</td><td dir="ltr">DECLARE @x INT = 5;</td><td dir="ltr">SET @x = 5;</td><td>— אין</td></tr>
<tr><td>חילוק שלמים</td><td dir="ltr">7 / 2 = 3</td><td dir="ltr">7 / 2 = 3.5000</td><td dir="ltr">7 / 2 = 3</td></tr>
<tr><td>AVG על INT</td><td dir="ltr">שלם (קוטע)</td><td dir="ltr">עשרוני</td><td dir="ltr">עשרוני</td></tr>
<tr><td>השוואת טקסט</td><td>לא תלוי רישיות (ברירת מחדל)</td><td>לא תלוי רישיות</td><td><code>=</code> תלוי רישיות</td></tr>
</table>
</div>

<h4>טעויות קלאסיות — ומה SQL Server עונה</h4>
<div style="overflow-x:auto"><table class="mini">
<tr><th>הטעות</th><th>מה קורה</th><th>התיקון</th></tr>
<tr><td>גרשיים "חכמים" מ-Word/מהשקפים: <code>‘Tel-Aviv’</code></td><td>שגיאת תחביר</td><td>רק <code>'</code> ישר</td></tr>
<tr><td dir="ltr">WHERE city = "Haifa"</td><td dir="ltr">Msg 207: Invalid column name 'Haifa'</td><td>מרכאות כפולות = שם; טקסט ב-<code>'Haifa'</code></td></tr>
<tr><td>שכחת פסיק בין עמודות</td><td><b>אין שגיאה!</b> העמודה השנייה הופכת לכינוי של הראשונה (ראו דוגמה למטה)</td><td>לבדוק פסיקים</td></tr>
<tr><td dir="ltr">SELECT a, b, FROM t</td><td dir="ltr">Msg 156: Incorrect syntax near the keyword 'FROM'</td><td>בלי פסיק לפני FROM</td></tr>
<tr><td dir="ltr">WHERE grade = NULL</td><td><b>אין שגיאה</b> — 0 שורות</td><td dir="ltr">IS NULL</td></tr>
<tr><td>עמודה ב-SELECT שלא ב-GROUP BY</td><td dir="ltr">Msg 8120: … is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause</td><td>להוסיף ל-GROUP BY</td></tr>
<tr><td dir="ltr">WHERE COUNT(*) &gt; 2</td><td dir="ltr">Msg 147: An aggregate may not appear in the WHERE clause …</td><td dir="ltr">HAVING COUNT(*) &gt; 2</td></tr>
<tr><td>כינוי מ-SELECT בתוך WHERE</td><td dir="ltr">Msg 207: Invalid column name</td><td>לחזור על הביטוי</td></tr>
<tr><td dir="ltr">SELECT id FROM students s JOIN enrollments e ON …</td><td dir="ltr">Msg 209: Ambiguous column name 'id'</td><td dir="ltr">s.id</td></tr>
<tr><td>שגיאת הקלדה בשם טבלה (<code>enrollmets</code>)</td><td dir="ltr">Msg 208: Invalid object name 'enrollmets'</td><td>להעתיק שמות מהסכמה</td></tr>
<tr><td dir="ltr">id + ' - ' + firstName</td><td dir="ltr">Msg 245: Conversion failed when converting the varchar value ' - ' to data type int</td><td dir="ltr">CAST(id AS VARCHAR(10)) + …</td></tr>
<tr><td>INSERT עם PK קיים</td><td dir="ltr">Msg 2627: Violation of PRIMARY KEY constraint</td><td>ערך ייחודי</td></tr>
<tr><td>INSERT בלי ערך לעמודת NOT NULL</td><td dir="ltr">Msg 515: Cannot insert the value NULL into column …</td><td>לתת ערך / DEFAULT</td></tr>
<tr><td>DELETE של שורה ש-FK מפנה אליה</td><td dir="ltr">Msg 547: The DELETE statement conflicted with the REFERENCE constraint …</td><td>למחוק קודם את הבנים / CASCADE</td></tr>
<tr><td>CREATE PROCEDURE אחרי פקודה אחרת באותה אצווה</td><td dir="ltr">'CREATE/ALTER PROCEDURE' must be the first statement in a query batch</td><td><code>GO</code> לפני</td></tr>
<tr><td>ORDER BY בתוך View / טבלה נגזרת</td><td dir="ltr">Msg 1033: The ORDER BY clause is invalid in views, … derived tables, subqueries …</td><td>למיין בשאילתה החיצונית</td></tr>
<tr><td>שם שמור כשם עמודה (<code>Group</code>, <code>Order</code>, <code>User</code>)</td><td>שגיאת תחביר</td><td dir="ltr">[Group]</td></tr>
</table></div>

<h4>הפסיק החסר — דוגמה חיה</h4>
<pre>SELECT firstName lastName
FROM students
WHERE id &lt;= 2;</pre><p><b>תוצאה:</b> עמודה אחת בשם lastName שמכילה… שמות פרטיים — 2 שורות</p><div style="overflow-x:auto" dir="ltr"><table class="mini" dir="ltr"><tr><th>lastName</th></tr><tr><td>David</td></tr><tr><td>Noa</td></tr></table></div>

<h4>נקודה-פסיק, GO ותאריכים</h4>
<ul>
  <li><code>;</code> מסיים פקודה. ב-T-SQL הוא ברוב המקרים לא חובה, אבל מומלץ — וחובה לפני <code>WITH</code> של CTE אם הפקודה הקודמת לא הסתיימה בו. נקודה-פסיק <u>באמצע</u> פקודה (כמו <code>FROM CUSTOMERS;</code> לפני ה-WHERE בשקף 43) מסיימת אותה מוקדם — ה-WHERE "נשאר יתום" ומקבלים שגיאה.</li>
  <li><code>GO</code> — מפריד אצוות של SSMS, לבד בשורה; לא חלק מ-SQL.</li>
  <li>תאריכים: <code>'2025-10-01'</code> בטוח ל-<code>DATE</code>. פורמט כמו <code>'1/1/2018'</code> (בשקפים) תלוי בהגדרות השפה של השרת (חודש/יום או יום/חודש). הכי בטוח לכל טיפוס: <code>'20251001'</code>.</li>
  <li><code>'a' + NULL</code> = NULL ב-SQL Server; <code>CONCAT('a', NULL)</code> = <code>'a'</code>.</li>
  <li>השוואת טקסט ב-SQL Server בדרך כלל <b>לא</b> תלויה ברישיות (<code>'haifa' = 'Haifa'</code> אמת). ב-SQLite שבאתר <code>=</code> כן תלוי רישיות — אל תתבלבלו.</li>
</ul>

<h4>מה המנוע של האתר ממיר בשבילכם — ואיפה הוא שונה מ-SQL Server</h4>
<p>כשמתרגלים באתר אפשר לכתוב T-SQL כמו במבחן. אלה מומרים אוטומטית: <code>TOP</code>, <code>YEAR()/MONTH()/DAY()</code>, <code>ISNULL</code>, <code>LEN</code>, <code>GETDATE()</code>, <code>DATEDIFF</code>, <code>CAST(… AS DECIMAL(p,s))</code>, שרשור <code>+</code> כשיש טקסט קבוע לידו (<code>firstName + ' ' + lastName</code>), <code>[שמות]</code>, <code>N'…'</code>, <code>#temp</code> ו-<code>SELECT … INTO</code>.</p>
<div style="overflow-x:auto"><table class="mini">
<tr><th>מה כותבים</th><th>במנוע של האתר</th><th>ב-SQL Server (מה שקובע במבחן)</th></tr>
<tr><td dir="ltr">ALTER COLUMN, ADD/DROP CONSTRAINT, sp_rename, CONVERT, DATEADD, LEFT(), פרוצדורות, טריגרים</td><td>שגיאה — לא נתמך</td><td>תקין — מתרגלים בכתיבה</td></tr>
<tr><td dir="ltr">TOP 3 WITH TIES … ORDER BY</td><td>מתעלם מ-WITH TIES (3 שורות)</td><td>כולל שוויונות (יכול להיות יותר מ-3)</td></tr>
<tr><td dir="ltr">LIKE '[DM]%'</td><td>תוצאה ריקה, בלי שגיאה</td><td>מתחיל ב-D או M</td></tr>
<tr><td dir="ltr">firstName + lastName</td><td>0 (חיבור מספרי), בלי שגיאה</td><td>שרשור טקסט</td></tr>
<tr><td dir="ltr">id + ' - ' + firstName</td><td>עובד: 1 - David</td><td>שגיאה 245 — חובה CAST</td></tr>
<tr><td dir="ltr">WHERE city = "Haifa"</td><td>עובד (נקרא כטקסט)</td><td>שגיאה 207 — Invalid column name</td></tr>
<tr><td dir="ltr">WHERE city = 'haifa'</td><td>0 שורות (תלוי רישיות)</td><td>מוצא את Haifa</td></tr>
<tr><td dir="ltr">AVG על עמודת INT</td><td>שבר (81.125)</td><td>שלם (81) — חובה CAST</td></tr>
<tr><td>עמודה ב-SELECT שלא ב-GROUP BY</td><td>ערך שרירותי, בלי שגיאה</td><td>שגיאה 8120</td></tr>
<tr><td><code>=</code> מול תת-שאילתה שמחזירה כמה שורות</td><td>לוקח את הראשונה, בלי שגיאה</td><td>שגיאה 512 — צריך IN</td></tr>
<tr><td>מחיקה של אב ש-FK מפנה אליו</td><td>מצליחה (FK לא נאכף)</td><td>שגיאה 547</td></tr>
</table></div>
<p>הכלל: אם באתר "עבד" — זה עוד לא אומר שזה נכון ב-SQL Server. בכל שורה בטבלה הזו, כתבו במבחן לפי עמודת SQL Server.</p>

<div class="callout warn"><b>מלכודות נפוצות — צ'קליסט לפני הגשת שאילתה</b>
<ul>
  <li>שמות טבלאות ועמודות — מועתקים מהסכמה בדיוק (student_id ≠ studentId).</li>
  <li>פסיק בין כל שתי עמודות, אף פסיק לפני FROM.</li>
  <li>כל טבלה עם כינוי, וכל עמודה משותפת עם קידומת.</li>
  <li>לכל JOIN יש ON; LEFT כשצריך "כולל מי שאין לו".</li>
  <li>GROUP BY מכיל את כל העמודות שלא בצבירה; תנאי על צבירה ב-HAVING.</li>
  <li>NULL → IS NULL / ISNULL / COUNT(col).</li>
  <li>טקסט בגרש בודד, עברית עם N'…', והגבלה עם TOP.</li>
</ul></div>
`
  }
];

/* ---------- דף תחביר T-SQL מרוכז ---------- */
SQLC.syntax = [
  { title:'DDL — יצירה, שינוי ומחיקה של טבלאות', rows:[
    ['CREATE TABLE t (id INT PRIMARY KEY, name NVARCHAR(50) NOT NULL, ...);', 'יצירת טבלה'],
    ['PRIMARY KEY (c1, c2)', 'מפתח ראשי (גם מורכב) — כפסוקית בסוף ההגדרה'],
    ['col INT REFERENCES parent(id)', 'מפתח זר בשורת העמודה (כמו בעבודת ישור קו)'],
    ['id INT IDENTITY(1,1) PRIMARY KEY', 'מספור אוטומטי'],
    ['DROP TABLE t;   /   DROP TABLE IF EXISTS t;', 'מחיקת הטבלה והנתונים (בנים לפני אבות)'],
    ['ALTER TABLE t ADD col VARCHAR(20) NULL;', 'הוספת עמודה'],
    ['ALTER TABLE t ALTER COLUMN col CHAR(10) NULL;', 'שינוי טיפוס עמודה'],
    ['ALTER TABLE t DROP COLUMN col;', 'הסרת עמודה (אחרי הסרת האילוצים שעליה)'],
    ["EXEC sp_rename 't.old_name', 'new_name', 'COLUMN';", 'שינוי שם עמודה'],
  ]},
  { title:'אילוצים (Constraints)', rows:[
    ['col INT NOT NULL', 'חובה ערך'],
    ["City VARCHAR(50) DEFAULT 'Tel-Aviv'", 'ברירת מחדל כשלא מציינים את העמודה'],
    ["CONSTRAINT check_gender CHECK (Gender IN ('M', 'F'))", 'אילוץ ערכים מותרים'],
    ["CONSTRAINT check_zip CHECK (ZipCode LIKE '[0-9][0-9][0-9][0-9][0-9]')", 'אילוץ פורמט — בדיוק 5 ספרות'],
    ['UNIQUE (CustomerLogin)', 'מפתח חלופי (ב-SQL Server: NULL אחד לכל היותר)'],
    ['CONSTRAINT FK_x FOREIGN KEY (col) REFERENCES p(id)', 'מפתח זר עם שם'],
    ['ON DELETE NO ACTION | CASCADE | SET NULL | SET DEFAULT', 'מה קורה לבנים כשהאב נמחק'],
    ['ON UPDATE CASCADE', 'שינוי ה-PK באב מתעדכן בבנים'],
    ['ALTER TABLE t ADD CONSTRAINT check_zip CHECK (...);', 'הוספת אילוץ לטבלה קיימת'],
    ['ALTER TABLE t DROP CONSTRAINT check_zip;', 'הסרת אילוץ'],
    ["ALTER TABLE t ADD CONSTRAINT DF_city DEFAULT 'Tel-Aviv' FOR City;", 'הוספת DEFAULT לעמודה קיימת'],
  ]},
  { title:'DML — הוספה, עדכון ומחיקה', rows:[
    ["INSERT INTO t VALUES (1, 'Dan', 22);", 'כל העמודות — בדיוק בסדר שבטבלה'],
    ["INSERT INTO t (id, name) VALUES (1, 'Dan'), (2, 'Noa');", 'עמודות נבחרות, כמה שורות; השאר DEFAULT/NULL'],
    ['INSERT INTO t (c1, c2) SELECT c1, c2 FROM s WHERE ...;', 'הכנסת תוצאה של שאילתה'],
    ['UPDATE t SET c1 = v1, c2 = c2 + 1 WHERE cond;', 'עדכון — פסיק בין ההשמות; בלי WHERE = כל הטבלה'],
    ['DELETE FROM t WHERE cond;', 'מחיקת שורות (המבנה נשאר)'],
    ['TRUNCATE TABLE t;', 'ריקון מהיר של כל השורות'],
  ]},
  { title:'SELECT ו-WHERE', rows:[
    ['SELECT DISTINCT c1, c2 AS alias FROM t AS x', 'עמודות, כינויים, הסרת כפולות'],
    ['SELECT [Sale-ID], Quantity * Price AS Amount', 'עמודה מחושבת; שם עם מקף בסוגריים מרובעים'],
    ['WHERE a > 18 AND (b = 1 OR c = 2)', 'AND קודם ל-OR — סוגריים!'],
    ['WHERE c <> v', 'שונה מ-'],
    ['WHERE c BETWEEN a AND b', 'טווח — כולל את שני הקצוות'],
    ["WHERE c IN ('Haifa', 'Holon')   /   NOT IN (...)", 'אחד מתוך רשימה'],
    ['WHERE c IS NULL   /   IS NOT NULL', 'בדיקת NULL (לעולם לא = NULL)'],
    ["WHERE c LIKE 'Jo%'   /   '_a%'   /   '[DM]%'", '% = כל רצף · _ = תו אחד · [ ] = תו מקבוצה'],
    ['ORDER BY c1 DESC, c2 ASC', 'מיון לפי כמה עמודות'],
    ['SELECT TOP 3 ... ORDER BY c DESC', 'שלוש השורות הראשונות'],
    ['SELECT TOP 3 WITH TIES ... ORDER BY c', 'כולל שורות שוות במקום האחרון'],
  ]},
  { title:'JOIN', rows:[
    ['FROM a INNER JOIN b ON a.id = b.aId', 'רק שורות עם התאמה'],
    ['FROM a LEFT JOIN b ON a.id = b.aId', 'כל a; עמודות b יהיו NULL כשאין התאמה'],
    ['FROM a RIGHT JOIN b ON a.id = b.aId', 'כל b'],
    ['FROM a FULL JOIN b ON a.id = b.aId', 'כל a וכל b'],
    ['LEFT JOIN b ON a.id = b.aId AND b.grade >= 80', 'מסנן את b בלי לאבד שורות של a'],
    ['LEFT JOIN b ON a.id = b.aId WHERE b.id IS NULL', 'Anti-join: a שאין להם אף b'],
    ['JOIN link l ON l.aId = a.id JOIN c ON c.id = l.cId', 'רבים-לרבים דרך טבלת קישור'],
    ['FROM a, b WHERE a.id = b.aId', 'צירוף בצורה הישנה (בלי WHERE = מכפלה קרטזית)'],
    ['FROM t x JOIN t y ON x.city = y.city AND x.id < y.id', 'Self-join — אותה טבלה עם שני כינויים'],
  ]},
  { title:'GROUP BY ו-HAVING', rows:[
    ['COUNT(*)   /   COUNT(col)   /   COUNT(DISTINCT col)', 'שורות · ערכים שאינם NULL · ערכים שונים'],
    ['SUM(col), AVG(col), MIN(col), MAX(col)', 'מתעלמות מ-NULL'],
    ['GROUP BY s.id, s.name', 'כל עמודה ב-SELECT שלא בתוך צבירה'],
    ['HAVING COUNT(*) > 2', 'תנאי על קבוצה (אחרי הקיבוץ)'],
    ['ORDER BY COUNT(*) DESC', 'מיון לפי ערך מצטבר'],
    ['SELECT · FROM · WHERE · GROUP BY · HAVING · ORDER BY', 'סדר הכתיבה'],
    ['FROM · WHERE · GROUP BY · HAVING · SELECT · ORDER BY', 'סדר הביצוע הלוגי'],
  ]},
  { title:'CASE, CAST ופונקציות', rows:[
    ["CASE WHEN g >= 90 THEN 'Excellent' WHEN g >= 80 THEN 'Very Good' ELSE 'Fail' END AS lvl", 'CASE מחפש — מהסף הגבוה לנמוך'],
    ["CASE status WHEN 'Active' THEN 1 ELSE 0 END", 'CASE פשוט — שוויון בלבד'],
    ['WHERE age > CASE city WHEN ... THEN 30 ELSE 0 END', 'CASE בתוך WHERE'],
    ['CAST(x AS DECIMAL(10,2))', 'המרה + עיגול ל-2 ספרות'],
    ['AVG(CAST(grade AS DECIMAL(5,2)))', 'ממוצע בלי קיטוע של INT'],
    ["CAST(id AS VARCHAR(10)) + ' - ' + name", 'מספר + טקסט'],
    ['CONVERT(VARCHAR(10), d, 103)', 'תאריך בפורמט dd/mm/yyyy'],
    ['ISNULL(x, 0)   /   COALESCE(a, b, c)', 'החלפת NULL'],
    ['UPPER, LOWER, LEN, LEFT(s, n), SUBSTRING(s, i, n), REPLACE', 'פונקציות מחרוזת'],
    ['YEAR(d), MONTH(d), DAY(d), GETDATE()', 'פונקציות תאריך'],
    ['DATEADD(day, 7, d)   /   DATEDIFF(day, start, end)', 'חשבון תאריכים'],
    ['ROUND(x, 2)', 'עיגול'],
  ]},
  { title:'שאילתות מקוננות וטבלאות זמניות', rows:[
    ['WHERE x > (SELECT AVG(x) FROM t)', 'השוואה לערך מחושב'],
    ['WHERE x = (SELECT MAX(x) FROM t)', 'המקסימום — כולל שוויונות'],
    ['WHERE id IN (SELECT aId FROM b)', 'שייכות לתוצאה של שאילתה'],
    ['WHERE NOT EXISTS (SELECT 1 FROM b WHERE b.aId = a.id)', 'תת-שאילתה מתואמת — a בלי b'],
    ['SELECT name, (SELECT COUNT(*) FROM b WHERE b.aId = a.id) AS n FROM a', 'תת-שאילתה ב-SELECT'],
    ['FROM (SELECT aId, AVG(x) AS avgX FROM b GROUP BY aId) AS t', 'טבלה נגזרת — חובה כינוי'],
    ['WITH t AS (SELECT ...) SELECT ... FROM t', 'CTE'],
    ['SELECT c1, c2 INTO #t FROM s WHERE ...', 'יצירת טבלה זמנית מתוצאה'],
    ['CREATE TABLE #t (id INT); INSERT INTO #t SELECT ...', 'טבלה זמנית מוגדרת מראש'],
    ['DROP TABLE #t;', 'מחיקה (אחרת — אוטומטית בסוף ה-session)'],
  ]},
  { title:'VIEW, פרוצדורות, טריגרים וטרנזקציות', rows:[
    ['GO', 'מפריד אצוות — לבד בשורה, לפני CREATE VIEW / PROCEDURE / TRIGGER'],
    ["CREATE VIEW v AS SELECT ... FROM ... WHERE status = 'Active';", 'שאילתה שמורה (בלי ORDER BY)'],
    ['CREATE PROCEDURE p @city NVARCHAR(50) AS BEGIN SELECT ... WHERE city = @city; END;', 'פרוצדורה עם פרמטר'],
    ["EXEC p @city = N'Haifa';", 'הרצת פרוצדורה'],
    ['@n INT OUTPUT   /   EXEC p @n = @cnt OUTPUT;', 'פרמטר פלט'],
    ['DECLARE @x INT = 5;   SET @x = 6;   SELECT @x = MAX(id) FROM t;', 'משתנים'],
    ['IF EXISTS (SELECT 1 FROM t WHERE ...) BEGIN ... END', 'תנאי בתוך קוד'],
    ['CREATE TRIGGER trg ON t AFTER INSERT, UPDATE AS BEGIN ... END;', 'טריגר — פעם אחת לכל פקודה'],
    ['inserted   /   deleted', 'השורות החדשות / הישנות בתוך טריגר'],
    ['BEGIN TRAN; ... COMMIT;   /   ROLLBACK;', 'טרנזקציה — הכל או כלום'],
    ['BEGIN TRY ... END TRY BEGIN CATCH ... END CATCH', 'טיפול בשגיאות'],
    ['CREATE INDEX IX_t_col ON t (col);', 'אינדקס'],
  ]},
  { title:'⚠ T-SQL מול MySQL / SQLite', mssql:true, rows:[
    ['SELECT TOP 5 * FROM t', 'במקום LIMIT 5'],
    ["firstName + ' ' + lastName", 'שרשור (במקום CONCAT או ||)'],
    ['ISNULL(x, 0)', 'במקום IFNULL'],
    ['LEN(s)', 'במקום LENGTH'],
    ['GETDATE()', 'במקום NOW()'],
    ['DATEDIFF(day, start, end)', 'היחידה ראשונה; התוצאה end פחות start'],
    ['INT IDENTITY(1,1)', 'במקום AUTO_INCREMENT'],
    ['[Column Name]', 'במקום `name` (MySQL) או "name"'],
    ["NVARCHAR(50) + N'חיפה'", 'טקסט בעברית (יוניקוד)'],
    ["'Haifa'", 'טקסט רק בגרש בודד; "Haifa" = שם עמודה'],
    ['ALTER TABLE t ALTER COLUMN c INT', 'במקום MODIFY'],
    ["EXEC sp_rename 't.a', 'b', 'COLUMN'", 'במקום RENAME COLUMN'],
    ['#temp   /   SELECT ... INTO #temp', 'במקום CREATE TEMPORARY TABLE'],
    ['EXEC p 5', 'במקום CALL p(5)'],
    ['7 / 2 = 3   ·   7 / 2.0 = 3.500000', 'חילוק שלמים; גם AVG על INT מחזיר שלם'],
    ['BIT', 'במקום BOOLEAN (ערכים 0/1)'],
  ]},
];

/* ---------- כרטיסיות זיכרון (טקסט רגיל) ---------- */
SQLC.flashcards = [
  { track:'sql', front:'מהו מפתח-על (Superkey)?', back:'קבוצת עמודות שהשילוב שלהן ייחודי בכל מצב חוקי של הטבלה. לכל טבלה יש לפחות אחד (כל העמודות), וכל הרחבה של מפתח-על היא גם מפתח-על.' },
  { track:'sql', front:'מפתח (Key) מול מפתח-על?', back:'מפתח = מפתח-על מינימלי: אי אפשר להוריד ממנו אף עמודה בלי לאבד ייחודיות. {Student-ID, Name} הוא מפתח-על אבל לא מפתח.' },
  { track:'sql', front:'מפתח מועמד, ראשי וחלופי?', back:'מועמדים = כל המפתחות האפשריים. ראשי (PK) = המועמד שנבחר — קו תחתון, לא NULL. חלופי = מועמד שלא נבחר; ב-SQL מגדירים אותו עם UNIQUE.' },
  { track:'sql', front:'{Price} ייחודי בכל השורות הקיימות — האם הוא מפתח?', back:'לא. מפתח נקבע לפי כל המצבים החוקיים של הטבלה, לא לפי הנתונים הנוכחיים — ואין כלל שמונע שני מוצרים באותו מחיר.' },
  { track:'sql', front:'איך המרצה מסמן מפתח זר בסכמה טקסטואלית?', back:'שם הטבלה המופנית בסוגריים אחרי העמודה: STUDENTS (Student-ID, Name, Faculty-ID (FACULTIES)). המפתח הראשי מסומן בקו תחתון.' },
  { track:'sql', front:'ארבעת אילוצי השלמות?', back:'Key — אין שני ערכי מפתח זהים. Entity Integrity — PK לא NULL. Domain — כל ערך ממרחב הערכים של העמודה. Referential Integrity — FK קיים כ-PK בטבלה המופנית, או NULL.' },
  { track:'sql', front:'איזה אילוץ פעולת DELETE יכולה להפר?', back:'רק שלמות הפניה (Referential) — כשמוחקים שורה שה-PK שלה מופיע כ-FK אצל אחרים. INSERT ו-UPDATE יכולים להפר את כל הארבעה.' },
  { track:'sql', front:'RESTRICT / CASCADE / SET NULL / SET DEFAULT?', back:'דחיית הפעולה (ברירת המחדל, NO ACTION) / גלגול המחיקה או העדכון לשורות הבן / ה-FK הופך NULL / ה-FK מקבל ערך ברירת מחדל. SET NULL לא אפשרי כשה-FK הוא חלק מה-PK.' },
  { track:'sql', front:'חמשת הרכיבים של SQL?', back:'DDL (CREATE, ALTER, DROP) · DML (SELECT, INSERT, UPDATE, DELETE) · DCL (GRANT, REVOKE) · TCL (COMMIT, ROLLBACK) · Stored Procedures.' },
  { track:'sql', front:'שתי דרכים להגדיר PRIMARY KEY?', back:'בשורת העמודה: id INT PRIMARY KEY. או כפסוקית בסוף: PRIMARY KEY (id). מפתח מורכב (כמה עמודות) — רק בדרך השנייה: PRIMARY KEY (t_no, id_no).' },
  { track:'sql', front:'DECIMAL(5,2) — מה הערך המקסימלי?', back:'999.99 — סך הכל 5 ספרות, מהן 2 אחרי הנקודה. DECIMAL(10,2) מגיע עד 99999999.99.' },
  { track:'sql', front:'NVARCHAR מול VARCHAR?', back:"NVARCHAR שומר יוניקוד — מתאים לעברית. ליטרל עברי כותבים עם N: N'חיפה'." },
  { track:'sql', front:"מה עושה CHECK (ZipCode LIKE '[0-9][0-9][0-9][0-9][0-9]')?", back:'מחייב שהמיקוד יהיה בדיוק 5 ספרות. [0-9] = תו אחד שהוא ספרה (תחביר T-SQL).' },
  { track:'sql', front:'איך משנים טיפוס או שם של עמודה ב-SQL Server?', back:"טיפוס: ALTER TABLE t ALTER COLUMN col CHAR(10) NULL; שם: EXEC sp_rename 't.old', 'new', 'COLUMN'; — אין RENAME COLUMN ב-T-SQL." },
  { track:'sql', front:'INSERT עם רשימת עמודות מול בלי?', back:'בלי רשימה — ערך לכל העמודות בדיוק בסדר שבטבלה. עם רשימה — כל סדר וגם חלקית; עמודה שלא צוינה מקבלת DEFAULT, ואם אין — NULL.' },
  { track:'sql', front:'UPDATE של כמה עמודות?', back:'UPDATE t SET a = 1, b = 2 WHERE cond; — פסיק בין ההשמות (לא AND). בלי WHERE מתעדכנת כל הטבלה!' },
  { track:'sql', front:'DELETE מול TRUNCATE מול DROP?', back:'DELETE — מוחק שורות (אפשר WHERE), המבנה נשאר. TRUNCATE — מרוקן את כל השורות במהירות. DROP — מוחק את הטבלה עצמה עם הנתונים.' },
  { track:'sql', front:'AND או OR — מי מתבצע קודם?', back:'AND. לכן a OR b AND c פירושו a OR (b AND c). כשמערבבים — שמים סוגריים.' },
  { track:'sql', front:'BETWEEN 22 AND 24 — כולל את 22 ו-24?', back:'כן, שני הקצוות כלולים.' },
  { track:'sql', front:'LIKE: מה ההבדל בין % ל-_ ?', back:"% = רצף של 0 תווים או יותר. _ = תו אחד בדיוק. '_a%' = האות השנייה היא a." },
  { track:'sql', front:'למה WHERE grade = NULL לא מחזיר כלום?', back:'השוואה ל-NULL נותנת UNKNOWN ולא TRUE — אז אף שורה לא עוברת, בלי שגיאה. בודקים עם IS NULL / IS NOT NULL.' },
  { track:'sql', front:'למה כינוי מה-SELECT לא עובד ב-WHERE?', back:'סדר הביצוע הלוגי: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. ה-WHERE רץ לפני שהכינוי נוצר. ב-ORDER BY מותר להשתמש בכינוי.' },
  { track:'sql', front:'TOP 1 מול TOP 1 WITH TIES?', back:'TOP 1 מחזיר שורה אחת גם כשיש שוויון. WITH TIES מחזיר את כל השורות ששוות לאחרונה.' },
  { track:'sql', front:'למה סדר ה-WHEN ב-CASE חשוב?', back:'ה-WHEN הראשון שמתקיים קובע, והשאר לא נבדקים. מסדרים מהסף הגבוה לנמוך: >= 90, >= 80, >= 70...' },
  { track:'sql', front:'מה מחזיר CASE בלי ELSE כשאף תנאי לא מתקיים?', back:'NULL.' },
  { track:'sql', front:'AVG על עמודת INT ב-SQL Server?', back:'מחזיר מספר שלם — 88.5 הופך ל-88. הפתרון: AVG(CAST(grade AS DECIMAL(5,2))), ולתצוגה CAST(... AS DECIMAL(10,2)).' },
  { track:'sql', front:"למה id + ' - ' + name נכשל ב-SQL Server?", back:"כי + בין INT לטקסט מנסה לחבר מספרים: Conversion failed. צריך CAST(id AS VARCHAR(10)) + ' - ' + name." },
  { track:'sql', front:'ISNULL מול COALESCE?', back:'ISNULL(x, v) — של T-SQL, שני ארגומנטים. COALESCE(a, b, c) — סטנדרטי, מחזיר את הראשון שאינו NULL.' },
  { track:'sql', front:'INNER JOIN מול LEFT JOIN?', back:'INNER — רק שורות עם התאמה בשני הצדדים. LEFT — כל שורות הטבלה השמאלית, ו-NULL בעמודות הימניות כשאין התאמה.' },
  { track:'sql', front:'"כל הסטודנטים, אבל ציונים רק אם מעל 80" — איפה שמים את התנאי?', back:'ב-ON של ה-LEFT JOIN: ON s.student_id = e.student_id AND e.grade > 80. ב-WHERE הוא היה מוחק את מי שאין לו ציון כזה (הופך ל-INNER).' },
  { track:'sql', front:'איך מוצאים סטודנטים שלא רשומים לאף קורס?', back:'LEFT JOIN Enrollments e ... WHERE e.enrollment_id IS NULL. או NOT EXISTS (SELECT 1 FROM Enrollments e WHERE e.student_id = s.student_id).' },
  { track:'sql', front:'LEFT JOIN ואחריו INNER JOIN — מה הבעיה?', back:'ה-INNER מוחק שוב את שורות ה-NULL שה-LEFT יצר. בשרשרת — כל ה-JOINים שאחרי ה-LEFT צריכים להיות LEFT.' },
  { track:'sql', front:'COUNT(*) מול COUNT(e.id) אחרי LEFT JOIN?', back:'COUNT(*) סופר גם את שורת ה-NULL (קורס בלי סטודנטים יקבל 1). COUNT(e.id) מדלג על NULL ונותן 0 — הנכון.' },
  { track:'sql', front:'WHERE מול HAVING?', back:'WHERE מסנן שורות לפני הקיבוץ; HAVING מסנן קבוצות אחרי GROUP BY. תנאי על COUNT / SUM / AVG → HAVING.' },
  { track:'sql', front:'מה כלל ה-GROUP BY?', back:'כל עמודה ב-SELECT שאינה בתוך פונקציית צבירה חייבת להופיע ב-GROUP BY — אחרת SQL Server מחזיר שגיאה 8120.' },
  { track:'sql', front:'מה מחזיר WHERE id NOT IN (1, 2, NULL)?', back:'תוצאה ריקה: x <> NULL הוא UNKNOWN. כשתת-השאילתה עלולה להחזיר NULL — עדיף NOT EXISTS.' },
  { track:'sql', front:'למה WHERE x = (SELECT MAX(x) ...) עדיף על TOP 1?', back:'תת-השאילתה מחזירה את כל השורות השוות למקסימום (שוויונות); TOP 1 מחזיר רק אחת.' },
  { track:'sql', front:'טבלה זמנית ב-SQL Server?', back:'שם שמתחיל ב-#: SELECT ... INTO #t FROM ... או CREATE TABLE #t (...). נמחקת אוטומטית בסוף ה-session; ## = גלובלית.' },
  { track:'sql', front:'מה חובה בטבלה נגזרת (תת-שאילתה ב-FROM)?', back:'כינוי: FROM (SELECT ... GROUP BY ...) AS t.' },
  { track:'sql', front:'inserted ו-deleted בטריגר?', back:'inserted = השורות החדשות (INSERT, UPDATE). deleted = השורות הישנות (DELETE, UPDATE). ב-UPDATE יש את שתיהן. הטריגר רץ פעם אחת לכל פקודה.' },
  { track:'sql', front:'למה צריך GO לפני CREATE PROCEDURE?', back:'CREATE PROCEDURE / VIEW / TRIGGER חייב להיות הפקודה הראשונה באצווה. GO (לבד בשורה) מפריד בין אצוות ב-SSMS.' },
  { track:'sql', front:'מה זה ACID?', back:'Atomicity (הכל או כלום), Consistency (מצב תקין לתקין), Isolation (בידוד בין טרנזקציות), Durability (אחרי COMMIT השינוי נשמר).' },
  { track:'sql', front:'איך ממשים קשר M:N מה-ERD?', back:'טבלת גישור עם שני המפתחות הזרים, ועם תכונות הקשר (ציון, תאריך רישום). למשל Enrollments בין Students ל-Courses.' },
  { track:'sql', front:'בקשר 1:N — לאיזו טבלה נכנס ה-FK?', back:'לטבלה של צד ה-N. לקורס יש lecturerId; למרצה אין עמודה של קורסים.' },
  { track:'sql', front:'מהי ישות חלשה?', back:'ישות בלי מפתח עצמאי שמזוהה דרך ישות בעלים. בתרשים: מלבן כפול וקשר מזהה במעוין כפול. בטבלה: PK = מפתח הבעלים + מפתח חלקי.' },
  { track:'sql', front:'מילון נתונים: Type מול Data Type?', back:'Type = תפקיד התכונה (PK / FK / מפתח חלופי / רגילה). Data Type = הטיפוס הטכני (INT, NVARCHAR(50), DECIMAL(5,2)).' },
  { track:'sql', front:'WHERE city = "Haifa" ב-SQL Server?', back:'שגיאה: Invalid column name. מרכאות כפולות הן שם עמודה; טקסט נכתב רק בגרש בודד: \'Haifa\'.' },
  { track:'sql', front:'SELECT firstName lastName FROM students — מה יוצא?', back:'אין שגיאה! חסר פסיק, ולכן lastName הופך לכינוי של firstName — עמודה אחת בשם lastName עם שמות פרטיים.' },
];
