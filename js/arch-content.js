/* ============================================================
   קורס 3964 — ארכיטקטורה: SQL מול NoSQL (תכנון מערכת)
   מבוסס על קובץ התרגילים "ארכיטקטורה – SQL מול NOSQL" (3 תרחישים):
     1. ניהול מכללה (א–ט)   — כולל סיכום הפתרון של המרצה + תשובה מתוקנת ומלאה
     2. חנות מסחר אלקטרוני (א–ט) — תשובה מלאה
     3. רשת חברתית (א–יא)   — תשובה מלאה
   מוסיף: פרק אחד (track:'nosql', id:'arch'), שאלות בוחן (topic:'nosql-design'),
   כרטיסיות (track:'nosql') ו-SQLC.archTips.
   קוד SQL = T-SQL (SQL Server). קוד MongoDB = תחביר mongosh תקין.
   בתוך <pre data-lang="orig"> מוצג קוד מקורי של המרצה כפי שנכתב (עם הטעויות) — לא לשימוש.
   הקובץ נטען אחרי nosql-questions.js (משתמש ב-SQLC.bidiLtr לשאלות ולכרטיסיות).
   ============================================================ */
window.SQLC = window.SQLC || {};

(function(){
var bidi = function(s){ return (SQLC.bidiLtr ? SQLC.bidiLtr(String(s)) : String(s)); };

/* ---------- דגשים למבחן בשאלות תכנון ---------- */
SQLC.archTips = [
  'פתחו ב<b>רשימת ישויות וקשרים</b> (1:1, 1:N, M:N). ב-SQL כל ישות היא טבלה, וכל M:N היא טבלת גישור. כתבו DDL עם <code dir="ltr">PRIMARY KEY</code>, <code dir="ltr">FOREIGN KEY</code>, <code dir="ltr">UNIQUE</code> ו-<code dir="ltr">CHECK</code>, לא רק רשימת עמודות.',
  'ב-NoSQL כתבו קודם את <b>דפוסי הגישה</b>: מה נקרא יחד, מה גדל בלי גבול, מה משתנה ומי כותב. רק אחר כך את ה-Collections. צרפו <b>מסמך דוגמה תקין</b> (עם <code dir="ltr">_id</code>, מירכאות ופסיקים) ואת <b>האינדקסים</b>.',
  'כל <b>שכפול</b> צריך שתי שורות הסבר: מי <b>המקור האמיתי</b> של הנתון, ואיך מעדכנים את העותקים (<code dir="ltr">updateMany</code>, <code dir="ltr">arrayFilters</code>). אם העותק הוא <b>Snapshot</b> מכוון, כמו מחיר בזמן קנייה, כתבו שהוא לעולם לא מתעדכן.',
  '<b>מערך לא חסום</b> (עוקבים, לייקים, הגשות) הולך ל-Collection נפרד. <b>מערך חסום וקטן</b> (שיעורים, פריטי הזמנה, מועדי בחינה) מוטמע. תנו חישוב גס של הגודל מול מגבלת <b>16MB</b>.',
  '<b>מקביליות</b>: ב-SQL כותבים <code dir="ltr">UPDATE … WHERE stock &gt; 0</code> בתוך טרנזקציה ובודקים <code dir="ltr">@@ROWCOUNT</code>. במונגו כותבים <code dir="ltr">updateOne</code> עם תנאי ו-<code dir="ltr">$inc</code>, ובודקים <code dir="ltr">modifiedCount</code>. כשצריך לשנות כמה מסמכים יחד משתמשים בטרנזקציה.',
  '<b>ייחודיות</b>: ב-SQL זה <code dir="ltr">UNIQUE (userId, postId)</code>. במונגו זה <code dir="ltr">createIndex({ postId: 1, userId: 1 }, { unique: true })</code>. ה-<code dir="ltr">_id</code> האוטומטי <u>לא</u> מונע כפילות עסקית.',
  'מונה כמו <code dir="ltr">likeCount</code> הוא <b>Cache</b>. המקור האמיתי הוא ה-Collection המפורט, ולכן מתקנים את המונה מעת לעת. לשאלה "אפשר להשתמש בשניהם?" התשובה כמעט תמיד כן: SQL לכסף, לזהויות ולדוחות, ו-NoSQL לתוכן, לקטלוג ולפידים. ציינו גם את מחיר הסנכרון.',
  'תחביר שמוריד נקודות: <code dir="ltr">_id</code> ולא <code dir="ltr">id</code> או <code dir="ltr">Id</code>. <code dir="ltr">db</code> באות קטנה. <code dir="ltr">"$field"</code> עם דולר בתוך ביטוי. ב-<code dir="ltr">$lookup</code> כותבים <code dir="ltr">from / localField / foreignField / as</code> בדיוק כך. שמות שדות וערכים רגישים לאותיות (<code dir="ltr">"Active"</code> ≠ <code dir="ltr">"active"</code>).'
];

var H = [];

/* ============================================================
   פתיחה + עקרונות
   ============================================================ */
H.push(`
<style>
.topic-body .arch-q{margin:16px 0 4px;font-weight:600;color:var(--ink)}
.topic-body details.arch-a{border:1px solid var(--line);border-radius:10px;padding:6px 14px;margin:4px 0 14px;background:var(--card2)}
.topic-body details.arch-a > summary{cursor:pointer;color:var(--accent);font-weight:700;padding:2px 0}
.topic-body details.arch-a[open] > summary{margin-bottom:8px;border-bottom:1px dashed var(--line);padding-bottom:6px}
.topic-body h4.arch-scn{margin-top:30px;padding-top:14px;border-top:2px solid var(--line);font-size:18px}
</style>
<p>בתרגיל "ארכיטקטורה – SQL מול NoSQL" מקבלים <b>תרחיש עסקי</b> ומתכננים אותו פעמיים: פעם כמודל רלציוני (טבלאות, מפתחות ואילוצים), ופעם כמודל מסמכים ב-MongoDB (Collections, מסמכים מוטמעים והפניות). אחר כך מגיעות שאלות דיון. הן בודקות אם אתם מבינים את <b>המחיר</b> של כל החלטה: מה קורה כשנתון משתנה, כשמערך גדל, כששני משתמשים פועלים באותו רגע, ומה חייב להישלף מהר. אין כאן תשובה אחת נכונה, אבל צריכה להיות תשובה <b>מנומקת</b>, שקושרת כל החלטה לאופן שבו משתמשים בנתונים.</p>
<p>מבנה הפרק: (1) העקרונות שהתרגילים בודקים, (2) שיטת עבודה למבחן, (3) שלושת התרחישים מהקובץ: <b>ניהול מכללה</b> (סיכום הפתרון של המרצה, ואחריו תשובה מלאה ומתוקנת), <b>חנות מסחר אלקטרוני</b> ו<b>רשת חברתית</b>. בכל סעיף נסו לענות לבד, ורק אחר כך לחצו על "הצג תשובה".</p>

<h4>העקרונות שהתרגילים בודקים</h4>
<table class="mini">
  <tr><th>#</th><th>עיקרון</th><th>ב-SQL</th><th>ב-MongoDB</th><th>איפה בתרגילים</th></tr>
  <tr><td>1</td><td><b>נרמול מול Embedding / Referencing</b></td><td>נרמול (3NF): כל עובדה נשמרת פעם אחת, קשרים עוברים דרך FK, ואת התמונה המלאה מרכיבים ב-JOIN.</td><td>מתכננים לפי <b>דפוסי הגישה</b>. מה שנקרא יחד נשמר יחד (Embedding). ישות עצמאית, משותפת או גדלה נשמרת בנפרד עם הפניה (Reference).</td><td>סעיפים א–ב בכל תרחיש</td></tr>
  <tr><td>2</td><td><b>כפילות ואנומליות עדכון</b></td><td>נמנעים מכפילות. שינוי שם הוא UPDATE של שורה אחת.</td><td>שכפול מכוון (Denormalization) חוסך <code>$lookup</code>, אבל כל שינוי מחייב <code>updateMany</code> על כל העותקים. אחרת נוצרת אנומליית עדכון. לכן משכפלים רק שדות שכמעט לא משתנים.</td><td>מכללה ג (שם קורס), רשת ח (displayName)</td></tr>
  <tr><td>3</td><td><b>גודל מסמך ומערכים לא חסומים</b></td><td>אין בעיה: עוד שורה בטבלה.</td><td>מסמך מוגבל ל-<b>16MB</b>. מערך שגדל בלי גבול (עוקבים, לייקים, הגשות) עובר ל-Collection נפרד. מערך חסום וקטן נשאר מוטמע.</td><td>מכללה ה, רשת ד–ה</td></tr>
  <tr><td>4</td><td><b>דפוסי קריאה מול דפוסי כתיבה</b></td><td>מודל מנורמל אחד לכל השאילתות. משפרים ביצועים עם אינדקסים.</td><td>הרבה קריאות: משכפלים ומחשבים מראש, כדי שתספיק קריאה אחת. הרבה כתיבות: מסמכים קטנים ונפרדים, בלי "מסמך חם" שכולם כותבים אליו.</td><td>חנות ט, רשת ו–ז</td></tr>
  <tr><td>5</td><td><b>Extended Reference</b></td><td>לא נדרש: JOIN מביא כל עמודה.</td><td>שומרים <code>_id</code> ועוד 2–3 שדות שמוצגים תמיד (שם, תמונה). זה חוסך <code>$lookup</code>, והמחיר הוא עדכון העותקים כשהם משתנים.</td><td>author בפוסט, customer בהזמנה, courseName בהרשמה</td></tr>
  <tr><td>6</td><td><b>Snapshot: מחיר בזמן הקנייה</b></td><td><code>OrderItems.unitPrice</code>. זו לא כפילות אלא עובדה אחרת: המחיר ששולם.</td><td><code>items[].unitPrice</code> בתוך מסמך ההזמנה. לא מעדכנים אותו כשהמחיר במוצר משתנה.</td><td>חנות ג</td></tr>
  <tr><td>7</td><td><b>Attribute / Polymorphic Pattern</b></td><td>יש ארבע דרכים: 150 עמודות שרובן NULL, טבלת EAV, טבלה לכל סוג מוצר, או עמודת JSON.</td><td>כל מסמך מכיל רק את השדות שלו (Polymorphic). כדי לאנדקס: מערך <code>{ k, v }</code> ואינדקס אחד על <code>attributes.k</code> ו-<code>attributes.v</code>.</td><td>חנות ה</td></tr>
  <tr><td>8</td><td><b>מונה שמור מול ערך מחושב</b></td><td><code>COUNT(*)</code> בזמן אמת, או עמודה שמתעדכנת באותה טרנזקציה.</td><td>מונה במסמך (<code>likeCount</code> שמתעדכן ב-<code>$inc</code>) לקריאה מהירה. המקור האמיתי הוא ה-Collection המפורט, ומתקנים סטיות מעת לעת.</td><td>רשת י, gpa של סטודנט</td></tr>
  <tr><td>9</td><td><b>Fan-out on write מול Fan-out on read</b></td><td>פיד = JOIN בין Follows ל-Posts בזמן הקריאה.</td><td><b>Read</b> (pull): שולפים בזמן הצפייה. <b>Write</b> (push): בזמן הפרסום כותבים לפיד של כל עוקב. הקריאה מהירה והכתיבה יקרה. לידוענים משלבים בין השיטות.</td><td>רשת ו–ז</td></tr>
  <tr><td>10</td><td><b>Bucketing (דליים)</b></td><td>לא נדרש: שורה לכל פריט ואינדקס.</td><td>מקבצים הרבה פריטים קטנים (פריטי פיד, מדידות, הודעות) למסמך "דלי" לפי טווח זמן או לפי כמות, למשל 200 בדלי. כך יש פחות מסמכים, האינדקס קטן יותר וכל דלי חסום.</td><td>פיד מחושב, היסטוריה</td></tr>
  <tr><td>11</td><td><b>ייחודיות</b></td><td><code>PRIMARY KEY</code> או <code>UNIQUE (userId, postId)</code>: אילוץ שמוגדר בסכמה, ובנוסף FK שבודק שהמשתמש והפוסט קיימים.</td><td>אינדקס ייחודי: <code>createIndex({ postId: 1, userId: 1 }, { unique: true })</code>. אין FK. ה-<code>_id</code> ייחודי, אבל הוא לא מונע כפילות עסקית.</td><td>רשת ט, מכללה ז</td></tr>
  <tr><td>12</td><td><b>מקביליות (Concurrency)</b></td><td>טרנזקציה, <code>UPDATE … WHERE stock &gt; 0</code> (נעילת שורה) ובדיקת <code>@@ROWCOUNT</code>.</td><td>עדכון של מסמך יחיד הוא אטומי: <code>updateOne</code> עם תנאי ו-<code>$inc</code>, ובדיקת <code>modifiedCount</code>. לכמה מסמכים: טרנזקציה (<code>session.startTransaction()</code>, מגרסה 4.0).</td><td>מכללה ז, חנות ו</td></tr>
  <tr><td>13</td><td><b>ארכיטקטורה משולבת (Polyglot)</b></td><td>"מערכת הרשומה": כסף, זהויות, דוחות ו-ACID.</td><td>קטלוג, תוכן, פידים ועגלות: הרבה קריאות, מבנה גמיש והתרחבות לשרתים רבים (Scale-out). מסנכרנים באירועים (Change Streams) או ב-ETL.</td><td>חנות ט, רשת יא</td></tr>
</table>

<h4>שתי תבניות שכדאי לדעת בעל פה</h4>
<p><b>(1) "אל תמכור את היחידה האחרונה פעמיים"</b>: הבדיקה והעדכון נעשים <u>באותה פקודה</u>. אם קודם קוראים את המלאי ורק אחר כך מעדכנים, נשאר "חלון" שבו שני תהליכים רואים 1 ושניהם מוכרים.</p>
<pre data-lang="sql">-- T-SQL: ה-UPDATE נועל את השורה עד COMMIT. התהליך השני מחכה,
-- ואז מוצא stock = 0, והתנאי מחזיר 0 שורות
UPDATE Products
   SET stock = stock - 1
 WHERE productId = 501 AND stock &gt; 0;
-- @@ROWCOUNT = 0  →  המלאי אזל, ולכן ROLLBACK</pre>
<pre data-lang="mongo">// MongoDB: התנאי וה-$inc הם פעולה אטומית אחת על המסמך
const r = db.products.updateOne(
  { _id: 501, stock: { $gt: 0 } },
  { $inc: { stock: -1 } }
)
// r.modifiedCount === 0  →  המלאי אזל

// אותו תנאי עם findOneAndUpdate מחזיר גם את המסמך המעודכן (או null אם המלאי אזל)
db.products.findOneAndUpdate(
  { _id: 501, stock: { $gt: 0 } },
  { $inc: { stock: -1 } },
  { returnDocument: "after" }
)</pre>
<p><b>(2) "פעם אחת בלבד"</b>: לייק אחד למשתמש לפוסט, או הרשמה אחת לסטודנט בקורס.</p>
<pre data-lang="sql">-- T-SQL
ALTER TABLE Likes ADD CONSTRAINT UQ_Likes UNIQUE (userId, postId);</pre>
<pre data-lang="mongo">// MongoDB — insertOne כפול ייכשל עם E11000 duplicate key error
db.likes.createIndex({ postId: 1, userId: 1 }, { unique: true })</pre>

<h4>שיטת עבודה לשאלת תכנון במבחן</h4>
<ol>
  <li><b>ישויות וקשרים.</b> רשמו את הישויות ואת סוג כל קשר (1:1, 1:N, M:N). כל M:N הופך לטבלת גישור.</li>
  <li><b>SQL.</b> כתבו <code>CREATE TABLE</code> לכל ישות: מפתח ראשי, מפתחות זרים, <code>UNIQUE</code> לכל "פעם אחת בלבד", <code>CHECK</code> לטווחים ו-<code>NOT NULL</code>.</li>
  <li><b>דפוסי גישה.</b> אילו מסכים ודוחות צריך? מה נקרא יחד? מה נכתב הרבה? מה גדל בלי גבול?</li>
  <li><b>NoSQL.</b> לכל Collection כתבו מה מוטמע, מה מופנה ולמה. צרפו מסמך דוגמה תקין ואת האינדקסים.</li>
  <li><b>מחירים.</b> לכל שכפול כתבו מי המקור ואיך מעדכנים. לכל מערך כתבו אם הוא חסום.</li>
  <li><b>מקביליות וייחודיות.</b> פעולה שמשנה מלאי, מקומות או כסף תיכתב כעדכון אטומי או בטרנזקציה. "פעם אחת" יוגדר כ-UNIQUE או כאינדקס ייחודי.</li>
  <li><b>מסקנה.</b> איזה מודל מתאים לאיזה חלק, ולמה. אם השילוב משתלם, כתבו גם מה המחיר שלו.</li>
</ol>
`);

/* ============================================================
   תרחיש 1 — ניהול מכללה
   ============================================================ */
H.push(`
<h4 class="arch-scn">🏫 תרחיש 1: ניהול מכללה</h4>
<p><b>התרחיש העסקי:</b> מכללה מנהלת סטודנטים, מרצים, קורסים, הרשמות, בחינות וציונים. היא צריכה להפיק גיליונות ציונים, לחשב ממוצעים ולנתח את ביצועי הסטודנטים.</p>
<table class="mini">
  <tr><th>סעיף</th><th>השאלה</th></tr>
  <tr><td>א</td><td>תכננו מודל SQL למכללה.</td></tr>
  <tr><td>ב</td><td>תכננו מודל NoSQL למכללה.</td></tr>
  <tr><td>ג</td><td>אם שם הקורס משתנה, בכמה מסמכים ייתכן שנצטרך לעדכן את השם? מה היה קורה ב-SQL, ומה ב-NoSQL?</td></tr>
  <tr><td>ד</td><td>כיצד נחשב ממוצע ציונים לכל סטודנט בכל המחלקה? איזו גישה תידרש ב-SQL ואיזו ב-MongoDB?</td></tr>
  <tr><td>ה</td><td>מה קורה כשסטודנט נרשם ל-200 קורסים לאורך שנות לימודיו? האם נכון להטמיע את כל ההרשמות במסמך אחד?</td></tr>
  <tr><td>ו</td><td>אם צריך להפיק דוח של כל הסטודנטים שקיבלו ציון מעל 90 בקורס מסוים, איזה מבנה יקל על השליפה?</td></tr>
  <tr><td>ז</td><td>כיצד נבטיח שהרשמה לקורס והקצאת מקום בו יהיו עקביות כששני משתמשים פועלים בו-זמנית?</td></tr>
  <tr><td>ח</td><td>מה יקרה אם רוצים להציג תיק סטודנט מלא במסך אחד? האם שכפול הנתונים ב-NoSQL חוסך פעולות JOIN, ומה מחירו?</td></tr>
  <tr><td>ט</td><td>האם העבודה ב-MongoDB מחייבת לשמור מסמך עם מערך הרשמות? הציעו חלופה.</td></tr>
</table>

<h4>הפתרון של המרצה: סיכום</h4>
<p>זה הפתרון שהמרצה צירף לתרגיל. ברוב הסעיפים הכיוון נכון. ההערות בעמודה השמאלית מסמנות מה כדאי להוסיף או לתקן כשכותבים תשובה במבחן.</p>
<table class="mini">
  <tr><th>סעיף</th><th>מה כתב המרצה</th><th>הערה</th></tr>
  <tr><td>א</td><td>8 טבלאות: <code>Students(Id, firstname, lastname, email, deptid)</code>, <code>Departments(Did, dname)</code>, <code>Lecturers(Lid, lname, deptid)</code>, <code>Courses(cid, cname, depid, credits)</code>, <code>CoursesOffering(Oid, courseId, lectid, semester)</code>, <code>Enrollments(Eid, studentid, offeringid, grade)</code>, <code>Exams(Examid, offeringid, examdate, examtype)</code>, <code>ExamResult(ResultId, examid, studentid, score)</code>.</td><td>מבנה מנורמל ונכון. במיוחד חשובה ההבחנה בין <b>קורס</b> (Courses) לבין <b>פתיחה של הקורס בסמסטר</b> (CoursesOffering). כדאי להוסיף טיפוסים, PK/FK מפורשים, <code>UNIQUE</code> על סטודנט+פתיחה, שם פרטי למרצה וראש מחלקה, ולהשתמש בשמות עקביים (כרגע יש deptid, depid וגם lectid).</td></tr>
  <tr><td>ב</td><td>אותם 8 שמות כ-Collections, עם תיאור התוכן: Students מכיל את פרטי הסטודנט, המחלקה ורשימת ההרשמות. Departments מכיל את המחלקה, את פרטי ראש המחלקה ואת מזהי הקורסים. Lecturers מכיל את פרטי המרצה ואת הקורסים שהוא מלמד. Courses מכיל את פרטי הקורס, נקודות הזכות ומידע בסיסי על המחלקה. CoursesOffering מכיל מרצה, רשימת נרשמים, סמסטר/שנה וקורס. Enrollments מכיל מזהי סטודנטים, ציונים ופרטי קורס. Exams מכיל את פרטי הבחינה ורשימת תוצאות. ExamResult מכיל תוצאה לפי סטודנט ואת פרטי הסטודנט. בנוסף יש מסמך דוגמה של סטודנט עם מערך Courses.</td><td>הרעיון של הטמעת מה שנקרא יחד נכון. אבל בהצעה הזו הרשמה נשמרת ב-<b>3 מקומות</b> (Students, CoursesOffering ו-Enrollments), ותוצאת בחינה ב-<b>2 מקומות</b>, בלי לקבוע מי המקור. במונגו בדרך כלל יש <b>פחות</b> Collections מטבלאות, לא אותו מספר עם עותקים. במסמך הדוגמה יש כמה בעיות תחביר: <code>Id</code> במקום <code>_id</code>, מחרוזות בלי מירכאות, טלפון שנשמר כמספר (ה-0 המוביל נעלם), חסרים פסיקים, ו-<code>Courses ([</code> במקום <code>courses: [</code>.</td></tr>
  <tr><td>ג</td><td>ב-SQL השם נשמר בשורה אחת בטבלת הקורסים, ולכן כל השאילתות "מתעדכנות" אוטומטית. ב-NoSQL צריך לעדכן כל מסמך שבו השם נשמר, כלומר מסמכים רבים. אם שומרים רק את מזהה הקורס, שולפים את השם עם <code>$lookup</code>.</td><td>נכון. בתשובה למטה הוספנו את פקודות העדכון עצמן ואת שאלת ה-Snapshot.</td></tr>
  <tr><td>ד</td><td>SQL: <code>AVG(e.grade)</code> עם JOIN ל-enrollments ו-<code>GROUP BY s.studentid</code>. MongoDB: <code>$group</code> עם <code>Id: "$id"</code> ו-<code>AverageGrade: {$avg: "enrollments.grade"}</code>.</td><td>ה-SQL כמעט תקין: חסר מזהה הסטודנט ב-SELECT, ושמות העמודות לא תואמים לסעיף א. ה-<code>$group</code> <b>לא ירוץ</b>, ראו את התשובה המלאה.</td></tr>
  <tr><td>ה</td><td>יתרונות ההטמעה: פשוט לראות את נתוני הסטודנט, ופחות צורך ב-lookup. חסרונות: מסמך הסטודנט גדל ומסתבך, והעדכון מסורבל כי כותבים שוב ושוב לכמה מסמכים.</td><td>נכון. חסר חישוב גודל: 200 הרשמות הן כ-30KB, רחוק מאוד מ-16MB. וחסרות השאילתות מהצד של הקורס.</td></tr>
  <tr><td>ו</td><td>SQL עם JOIN ל-Enrollments ול-courseOffering ותנאי <code>courseid = '1234' AND grade &gt; 90</code>. MongoDB: <code>Db.enrollments.find({ Coursed: '1234', Grade: { $gt: 90 } })</code>.</td><td>הכיוון נכון: Collection של הרשמות וסינון. ב-SQL חסרות עמודות אחרי SELECT, וה-JOIN משתמש ב-offeringid שלא קיים בטבלה (שם העמודה הוא Oid). במונגו יש לתקן: <code>Db</code> ל-<code>db</code>, <code>Coursed</code> ל-<code>courseId</code>, <code>Grade</code> ל-<code>grade</code> (יש רגישות לאותיות), ולהוסיף את הפסיק החסר בין שני התנאים. בנוסף, אם <code>courseId</code> שמור כמספר, <code>'1234'</code> כמחרוזת לא יתאים לו.</td></tr>
  <tr><td>ז</td><td>כל מסמך מקבל מזהה ייחודי, והמערכת מכניסה מסמכים לפי המזהה הזה (עם דוגמה של מסמך עם <code>_id</code>). ב-SQL המקום בזיכרון ננעל לרגע.</td><td>הכיוון ב-SQL (נעילה) נכון. אבל <code>_id</code> ייחודי <b>לא</b> מונע הרשמה כפולה של אותו סטודנט, וגם לא חריגה ממספר המקומות. צריך עדכון אטומי עם תנאי, אינדקס ייחודי מורכב, או טרנזקציה.</td></tr>
  <tr><td>ח</td><td>לשכפול יש יתרון וחיסרון. המסמכים גדולים יותר והעדכונים מורכבים יותר, אבל כל המידע זמין ואין צורך ב-JOIN או ב-lookup מורכבים.</td><td>נכון. הוספנו את השאילתות בשני העולמות ואת Extended Reference כפשרה.</td></tr>
  <tr><td>ט</td><td>Embedding: ההרשמות בתוך מסמך הסטודנט. References: ההרשמות ב-Collection נפרד, ומגיעים אליהן בשאילתה. יש גם שילובים. הבחירה תלויה בגודל, ובשאלה אם רוצים שהכול יהיה זמין בקריאה אחת.</td><td>נכון. בדוגמת ה-References כתוב <code>object(course)</code>. בפועל כותבים <code>ObjectId("...")</code> או מספר, והחלופה המלאה היא Collection של הרשמות שבו לכל מסמך יש <code>studentId</code>.</td></tr>
</table>
<p>מסמך הדוגמה כפי שנכתב בפתרון. זה לא תחביר תקין, ומוצג רק כדי לזהות את הטעויות:</p>
<pre data-lang="orig">{
     Id: 94849
     Name: effi
     Phone: 030930390
     Department : software
     Courses ([
{ Name: java  Num: 39839 }, { Name: sql  Num: 393333 }])</pre>
<p>אותו מסמך בתחביר תקין:</p>
<pre data-lang="mongo">db.students.insertOne({
  _id: 94849,
  name: "Effi",
  phone: "030930390",          // מחרוזת, כדי שה-0 המוביל לא ייעלם
  department: "Software",
  courses: [
    { name: "Java", num: 39839 },
    { name: "SQL",  num: 393333 }
  ]
})</pre>

<h4>תשובה מלאה לכל סעיף</h4>

<p class="arch-q">א. תכננו מודל SQL למכללה.</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p>שמונה הטבלאות של המרצה, עם שמות עקביים, טיפוסים ואילוצים. נוספו גם <code>capacity</code> ו-<code>seatsTaken</code> בפתיחת הקורס, לסעיף ז.</p>
<pre data-lang="sql">CREATE TABLE Departments (
  deptId         INT IDENTITY(1,1) PRIMARY KEY,
  deptName       NVARCHAR(100) NOT NULL UNIQUE,
  headLecturerId INT NULL          -- ה-FK נוסף בהמשך, כי Lecturers עוד לא קיימת
);

CREATE TABLE Students (
  studentId INT IDENTITY(1,1) PRIMARY KEY,
  firstName NVARCHAR(50)  NOT NULL,
  lastName  NVARCHAR(50)  NOT NULL,
  email     NVARCHAR(100) NOT NULL UNIQUE,
  deptId    INT NOT NULL REFERENCES Departments(deptId)
);

CREATE TABLE Lecturers (
  lecturerId INT IDENTITY(1,1) PRIMARY KEY,
  firstName  NVARCHAR(50) NOT NULL,
  lastName   NVARCHAR(50) NOT NULL,
  deptId     INT NOT NULL REFERENCES Departments(deptId)
);

ALTER TABLE Departments
  ADD CONSTRAINT FK_Dept_Head FOREIGN KEY (headLecturerId) REFERENCES Lecturers(lecturerId);

CREATE TABLE Courses (                    -- הקורס כ"מוצר" בקטלוג
  courseId   INT PRIMARY KEY,             -- מספר קורס רשמי (39839)
  courseName NVARCHAR(100) NOT NULL,
  deptId     INT NOT NULL REFERENCES Departments(deptId),
  credits    DECIMAL(3,1) NOT NULL CHECK (credits &gt; 0)
);

CREATE TABLE CourseOfferings (            -- פתיחה של קורס בסמסטר מסוים, עם מרצה
  offeringId INT IDENTITY(1,1) PRIMARY KEY,
  courseId   INT NOT NULL REFERENCES Courses(courseId),
  lecturerId INT NOT NULL REFERENCES Lecturers(lecturerId),
  semester   VARCHAR(10) NOT NULL,        -- למשל '2026A'
  groupNo    TINYINT NOT NULL DEFAULT 1,
  capacity   INT NOT NULL CHECK (capacity &gt; 0),
  seatsTaken INT NOT NULL DEFAULT 0,
  CONSTRAINT CK_Seats    CHECK (seatsTaken BETWEEN 0 AND capacity),
  CONSTRAINT UQ_Offering UNIQUE (courseId, semester, groupNo)
);

CREATE TABLE Enrollments (
  enrollmentId INT IDENTITY(1,1) PRIMARY KEY,
  studentId    INT NOT NULL REFERENCES Students(studentId),
  offeringId   INT NOT NULL REFERENCES CourseOfferings(offeringId),
  enrollDate   DATE NOT NULL DEFAULT GETDATE(),
  grade        DECIMAL(5,2) NULL CHECK (grade BETWEEN 0 AND 100),   -- NULL = עוד אין ציון
  CONSTRAINT UQ_Enroll UNIQUE (studentId, offeringId)               -- הרשמה אחת לפתיחה
);

CREATE TABLE Exams (
  examId     INT IDENTITY(1,1) PRIMARY KEY,
  offeringId INT NOT NULL REFERENCES CourseOfferings(offeringId),
  examDate   DATETIME2 NOT NULL,
  examType   VARCHAR(10) NOT NULL CHECK (examType IN ('A', 'B', 'Quiz'))
);

CREATE TABLE ExamResults (
  resultId  INT IDENTITY(1,1) PRIMARY KEY,
  examId    INT NOT NULL REFERENCES Exams(examId),
  studentId INT NOT NULL REFERENCES Students(studentId),
  score     DECIMAL(5,2) NOT NULL CHECK (score BETWEEN 0 AND 100),
  CONSTRAINT UQ_Result UNIQUE (examId, studentId)
);</pre>
<ul>
  <li><b>קשרים:</b> מחלקה ← סטודנטים, מרצים וקורסים (1:N). קורס ← פתיחות (1:N). סטודנט ↔ פתיחה (M:N דרך Enrollments). פתיחה ← בחינות (1:N). סטודנט ↔ בחינה (M:N דרך ExamResults).</li>
  <li><b>ציון מול תוצאת בחינה:</b> <code>Enrollments.grade</code> הוא הציון הסופי בקורס. <code>ExamResults.score</code> הוא הציון בכל מועד.</li>
  <li>יש FK מעגלי בין Departments ל-Lecturers (ראש מחלקה הוא מרצה, ומרצה שייך למחלקה). לכן ה-FK השני נוסף עם <code>ALTER TABLE</code> אחרי ששתי הטבלאות קיימות.</li>
</ul>
</details>

<p class="arch-q">ב. תכננו מודל NoSQL למכללה.</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p>במקום 8 Collections שמשכפלות זו את זו, יש <b>6</b>, ולכל נתון יש מקור אחד ברור. בחינות ותוצאות בחינה <b>מוטמעות</b>, כי הן חסומות (2–3 מועדים) ונקראות יחד עם ההקשר שלהן.</p>
<table class="mini">
  <tr><th>Collection</th><th>מה בתוכו</th><th>החלטה ונימוק</th></tr>
  <tr><td dir="ltr">departments</td><td>שם המחלקה, וראש המחלקה כ-<code>{ lecturerId, name }</code></td><td>מעט מסמכים. ראש המחלקה נשמר כ-Extended Reference, כי השם מוצג תמיד</td></tr>
  <tr><td dir="ltr">students</td><td>פרטים אישיים, <code>dept: { deptId, name }</code>, ו-<code>stats</code> מחושב (ממוצע, נקודות זכות)</td><td>ישות עצמאית. ההרשמות <b>לא</b> מוטמעות כאן (ראו סעיף ה)</td></tr>
  <tr><td dir="ltr">lecturers</td><td>פרטי המרצה ו-<code>deptId</code></td><td>ישות עצמאית שמלמדת כמה קורסים, ולכן Reference</td></tr>
  <tr><td dir="ltr">courses</td><td>שם, נקודות זכות ו-<code>deptId</code></td><td>קטלוג, ומשתנה לעיתים רחוקות</td></tr>
  <tr><td dir="ltr">courseOfferings</td><td>הקורס והמרצה כ-Extended Reference, סמסטר, <code>capacity</code>, <code>seatsLeft</code>, ומערך <code>exams</code> מוטמע</td><td>המונה <code>seatsLeft</code> מאפשר הרשמה אטומית (סעיף ז). הבחינות חסומות, ולכן מוטמעות</td></tr>
  <tr><td dir="ltr">enrollments</td><td><code>studentId</code>, <code>offeringId</code>, <code>courseId</code>, <code>courseName</code>, <code>semester</code>, <code>grade</code>, ומערך <code>examResults</code> מוטמע</td><td>המקביל לטבלת הגישור. מסמך קטן לכל הרשמה, והוא <b>המקור</b> לציונים</td></tr>
</table>
<pre data-lang="mongo">db.departments.insertOne({
  _id: 10,
  name: "Software Engineering",
  head: { lecturerId: 501, name: "Moshe Cohen" }          // Extended Reference
})

db.students.insertOne({
  _id: 94849,
  firstName: "Noa",
  lastName: "Levi",
  email: "noa@college.ac.il",
  phone: "030930390",
  dept: { deptId: 10, name: "Software Engineering" },     // Extended Reference
  stats: { creditsEarned: 42, gpa: 87.4 }        // מחושב, מתעדכן כשנכנס ציון
})

db.lecturers.insertOne({ _id: 501, firstName: "Moshe", lastName: "Cohen", deptId: 10 })

db.courses.insertOne({ _id: 39839, name: "Java", credits: 4, deptId: 10 })

db.courseOfferings.insertOne({
  _id: 7001,
  course:   { courseId: 39839, name: "Java" },
  lecturer: { lecturerId: 501, name: "Moshe Cohen" },
  semester: "2026A",
  capacity: 60,
  seatsLeft: 60,
  exams: [                                                // חסום: 2–3 מועדים
    { examId: 1, type: "A", date: ISODate("2026-07-01") },
    { examId: 2, type: "B", date: ISODate("2026-07-28") }
  ]
})

db.enrollments.insertOne({
  _id: 880001,
  studentId: 94849,
  offeringId: 7001,
  courseId: 39839,
  courseName: "Java",                                     // עותק לתצוגה
  semester: "2026A",
  grade: 92,
  examResults: [                                          // חסום, ונקרא יחד עם הציון
    { examId: 1, type: "A", score: 88 },
    { examId: 2, type: "B", score: 95 }
  ]
})

// אינדקסים
// הרשמה אחת לפתיחה + שליפת תיק סטודנט
db.enrollments.createIndex({ studentId: 1, offeringId: 1 }, { unique: true })
// דוחות לפי קורס (סעיף ו)
db.enrollments.createIndex({ courseId: 1, grade: -1 })
db.students.createIndex({ email: 1 }, { unique: true })</pre>
<div class="callout">האינדקס <code>{ studentId: 1, offeringId: 1 }</code> משרת גם שאילתות על <code>studentId</code> בלבד, כי זו התחילית שלו (Prefix). לכן לא צריך אינדקס נפרד על <code>studentId</code>.</div>
</details>

<p class="arch-q">ג. אם שם הקורס משתנה, בכמה מסמכים נצטרך לעדכן אותו? מה קורה ב-SQL ומה ב-NoSQL?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL:</b> השם קיים רק בשורה אחת. מעדכנים שורה אחת, וכל JOIN מציג מיד את השם החדש:</p>
<pre data-lang="sql">UPDATE Courses SET courseName = N'Java Advanced' WHERE courseId = 39839;   -- שורה אחת</pre>
<p><b>NoSQL:</b> מספר המסמכים תלוי בכמה מקומות השם שוכפל. במודל שלנו: מסמך אחד ב-<code>courses</code>, כל הפתיחות של הקורס (כמה בשנה), ו<b>כל ההרשמות שאי פעם היו לקורס</b> (אלפים).</p>
<pre data-lang="mongo">db.courses.updateOne({ _id: 39839 }, { $set: { name: "Java Advanced" } })
db.courseOfferings.updateMany(
  { "course.courseId": 39839 },
  { $set: { "course.name": "Java Advanced" } }
)
db.enrollments.updateMany({ courseId: 39839 }, { $set: { courseName: "Java Advanced" } })</pre>
<p>במודל של המרצה השם מוטמע בתוך מערך <code>courses</code> בכל מסמך סטודנט. לכן מעדכנים איבר בתוך מערך, בכל הסטודנטים שלמדו את הקורס:</p>
<pre data-lang="mongo">db.students.updateMany(
  { "courses.num": 39839 },
  { $set: { "courses.$[c].name": "Java Advanced" } },
  { arrayFilters: [ { "c.num": 39839 } ] }
)</pre>
<ul>
  <li>אם שומרים רק <code>courseId</code>, מעדכנים מסמך אחד בלבד, אבל בכל תצוגה צריך <code>$lookup</code>. זה הטרייד-אוף בין שכפול להפניה.</li>
  <li><b>שאלה עסקית:</b> האם גיליון ציונים משנת 2024 צריך להציג את השם החדש? אם המכללה רוצה את השם <b>כפי שהיה</b> בזמן הלימוד, העותק ב-<code>enrollments</code> הוא Snapshot מכוון, ולא מעדכנים אותו.</li>
  <li>שינוי שם קורס הוא נדיר, ולכן שכפול של השם לתצוגה הוא מחיר סביר. את מה שמשתנה הרבה לא משכפלים.</li>
</ul>
</details>

<p class="arch-q">ד. כיצד נחשב ממוצע ציונים לכל סטודנט בכל המחלקה? איזו גישה ב-SQL ואיזו ב-MongoDB?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL:</b> JOIN בין סטודנטים להרשמות, סינון לפי מחלקה, ו-<code>GROUP BY</code> לפי סטודנט. <code>AVG</code> מתעלם מ-NULL, כלומר מקורסים שעוד אין בהם ציון.</p>
<pre data-lang="sql">DECLARE @deptId INT = 10;

SELECT s.studentId, s.firstName, s.lastName,
       CAST(AVG(e.grade) AS DECIMAL(5,2)) AS avgGrade
FROM Students s
JOIN Enrollments e ON e.studentId = s.studentId
WHERE s.deptId = @deptId
GROUP BY s.studentId, s.firstName, s.lastName
ORDER BY avgGrade DESC;</pre>
<p>ממוצע <b>משוקלל</b> לפי נקודות זכות, כמו בגיליון ציונים אמיתי, דורש להגיע עד הקורס. כאן חובה לסנן NULL, אחרת קורס בלי ציון ייכנס למכנה:</p>
<pre data-lang="sql">SELECT s.studentId,
       CAST(SUM(e.grade * c.credits) / SUM(c.credits) AS DECIMAL(5,2)) AS weightedAvg
FROM Students s
JOIN Enrollments e     ON e.studentId  = s.studentId
JOIN CourseOfferings o ON o.offeringId = e.offeringId
JOIN Courses c         ON c.courseId   = o.courseId
WHERE s.deptId = 10 AND e.grade IS NOT NULL
GROUP BY s.studentId;</pre>
<p><b>MongoDB, במודל שלנו</b> (enrollments נפרד): <code>$group</code> על ההרשמות, ואחר כך <code>$lookup</code> לסטודנט, כדי לקבל שם ומחלקה:</p>
<pre data-lang="mongo">db.enrollments.aggregate([
  { $group: { _id: "$studentId", avgGrade: { $avg: "$grade" } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $match: { "student.dept.deptId": 10 } },
  { $project: {
      _id: 0,
      studentId: "$_id",
      name: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      avgGrade: { $round: ["$avgGrade", 2] }
  } },
  { $sort: { avgGrade: -1 } }
])</pre>
<p><b>MongoDB, במודל של המרצה</b> (ההרשמות כמערך בתוך הסטודנט): <code>$unwind</code> פותח את המערך, ואז <code>$group</code>:</p>
<pre data-lang="mongo">db.students.aggregate([
  { $match: { "dept.deptId": 10 } },
  { $unwind: "$enrollments" },
  { $group: {
      _id: "$_id",
      firstName: { $first: "$firstName" },
      avgGrade: { $avg: "$enrollments.grade" }
  } },
  { $sort: { avgGrade: -1 } }
])

// קיצור: $avg בתוך $project מחשב ממוצע של מערך, בלי $unwind
db.students.aggregate([
  { $project: { firstName: 1, avgGrade: { $avg: "$enrollments.grade" } } }
])</pre>
<p>כך נכתב ה-<code>$group</code> בפתרון של המרצה:</p>
<pre data-lang="orig">Db.students.aggregate ([
   {
        $group : {
                  Id: "$id"
                  AverageGrade: {$avg: "enrollments.grade"}}</pre>
<div class="callout warn"><b>למה זה לא ירוץ, ומה לכתוב במבחן:</b> (1) ב-<code>$group</code> המפתח חייב להיות <code>_id</code>, וכל שדה אחר חייב להיות אופרטור צבירה. לכן <code>Id: "$id"</code> מחזיר שגיאה. (2) <code>"enrollments.grade"</code> בלי <code>$</code> הוא מחרוזת קבועה ולא הפניה לשדה, ולכן הממוצע יוצא null. (3) כש-enrollments הוא מערך צריך <code>$unwind</code> לפני <code>$group</code>. (4) <code>Db</code> צריך להיות <code>db</code>, חסר פסיק בין השדות, וחסרות הסגירות <code>} ])</code> (של השלב ושל המערך).</div>
</details>

<p class="arch-q">ה. סטודנט נרשם ל-200 קורסים לאורך הלימודים. האם נכון להטמיע את כל ההרשמות במסמך אחד?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>חישוב גס:</b> הרשמה עם ציון ושתי תוצאות בחינה תופסת כ-150 בתים, כך ש-200 × 150 ≈ <b>30KB</b>. זה רחוק מאוד מ-16MB. כלומר <u>טכנית זה אפשרי</u>, והמערך גם חסום, כי לתואר יש מספר קורסים מקסימלי. ההחלטה תלויה בדפוסי השימוש:</p>
<table class="mini">
  <tr><th>בעד הטמעה</th><th>נגד הטמעה</th></tr>
  <tr><td>תיק סטודנט וגיליון ציונים נשלפים בקריאה אחת, בלי <code>$lookup</code></td><td><b>כותבים רבים:</b> כל מרצה שמזין ציון מעדכן את מסמך הסטודנט, כך שבתקופת מבחנים כמה מרצים שונים כותבים לאותו מסמך</td></tr>
  <tr><td>עדכון אטומי של ההרשמה יחד עם נתוני הסטודנט (למשל הממוצע)</td><td><b>שאילתות מצד הקורס</b> ("כל הנרשמים לקורס", "מעל 90 בקורס") דורשות אינדקס Multikey על המערך, ואחריו <code>$unwind</code> ו-<code>$match</code> נוסף כדי לחלץ את ההרשמה הרלוונטית מכל סטודנט</td></tr>
  <tr><td>פשוט להבנה (זה מה שהמרצה ציין)</td><td>המסמך גדל כל סמסטר, וכל קריאה של פרטים אישיים מושכת גם את כל ההיסטוריה</td></tr>
  <tr><td></td><td>צריך גם לסמן את הסטודנט ברשימת הנרשמים של הפתיחה, ובלי מקור אחד זה מוביל לכפילות</td></tr>
</table>
<p><b>המלצה:</b> Collection נפרד <code>enrollments</code> שהוא המקור. אם המסך הראשי של הסטודנט חייב להיות מהיר, מטמיעים במסמך הסטודנט רק <b>תת-קבוצה</b> (Subset Pattern), למשל ההרשמות של הסמסטר הנוכחי (כ-6), יחד עם <code>stats</code> מחושב. ההיסטוריה המלאה נשארת ב-<code>enrollments</code>.</p>
<pre data-lang="mongo">db.students.updateOne(
  { _id: 94849 },
  { $set: { currentSemester: {
      semester: "2026A",
      courses: [ { offeringId: 7001, name: "Java" } ]
  } } }
)</pre>
</details>

<p class="arch-q">ו. דוח של כל הסטודנטים שקיבלו מעל 90 בקורס מסוים: איזה מבנה יקל על השליפה?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL:</b> שלוש טבלאות ואינדקס שמתאים לתנאי:</p>
<pre data-lang="sql">SELECT s.studentId, s.firstName, s.lastName, o.semester, e.grade
FROM Enrollments e
JOIN Students s        ON s.studentId  = e.studentId
JOIN CourseOfferings o ON o.offeringId = e.offeringId
WHERE o.courseId = 39839
  AND e.grade &gt; 90
ORDER BY e.grade DESC;

CREATE INDEX IX_Enroll_Offering_Grade ON Enrollments(offeringId, grade);</pre>
<p><b>MongoDB:</b> המבנה שהכי מקל הוא Collection של הרשמות שבו <code>courseId</code> ו-<code>grade</code> נמצאים באותו מסמך, עם אינדקס מורכב <code>{ courseId: 1, grade: -1 }</code>. כך הדוח הוא <code>find</code> פשוט שמשתמש באינדקס:</p>
<pre data-lang="mongo">db.enrollments.find(
  { courseId: 39839, grade: { $gt: 90 } },
  { _id: 0, studentId: 1, semester: 1, grade: 1 }
).sort({ grade: -1 })

// עם שמות הסטודנטים
db.enrollments.aggregate([
  { $match: { courseId: 39839, grade: { $gt: 90 } } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "s" } },
  { $unwind: "$s" },
  { $project: {
      _id: 0,
      name: { $concat: ["$s.firstName", " ", "$s.lastName"] },
      semester: 1, grade: 1
  } },
  { $sort: { grade: -1 } }
])</pre>
<p>אם הדוח רץ כל הזמן, אפשר לשמור גם <code>studentName</code> בהרשמה (Extended Reference) ולוותר על ה-<code>$lookup</code>. לשם השוואה, כשההרשמות מוטמעות בסטודנט זה מסורבל יותר:</p>
<pre data-lang="mongo">db.students.aggregate([
  { $match: { enrollments: { $elemMatch: { courseId: 39839, grade: { $gt: 90 } } } } },
  { $unwind: "$enrollments" },
  { $match: { "enrollments.courseId": 39839, "enrollments.grade": { $gt: 90 } } },
  { $project: { firstName: 1, lastName: 1, grade: "$enrollments.grade" } }
])</pre>
<div class="callout">את ה-<code>$match</code> צריך פעמיים. הראשון בוחר סטודנטים ויכול להשתמש באינדקס. השני, אחרי ה-<code>$unwind</code>, משאיר רק את ההרשמה המתאימה, ולא את כל ההרשמות של אותו סטודנט.</div>
</details>

<p class="arch-q">ז. איך נבטיח שהרשמה לקורס והקצאת מקום יהיו עקביות כששני משתמשים פועלים בו-זמנית?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p>יש שתי סכנות: (1) <b>חריגה ממספר המקומות</b>, כששני סטודנטים "תופסים" את המקום האחרון. (2) <b>הרשמה כפולה</b> של אותו סטודנט, למשל אחרי לחיצה כפולה. ה-<code>_id</code> הייחודי לא פותר אף אחת מהן, כי כל ניסיון הרשמה מקבל <code>_id</code> חדש.</p>
<p><b>SQL:</b> טרנזקציה. ה-UPDATE עם התנאי נועל את שורת הפתיחה עד ה-COMMIT, וה-<code>UNIQUE (studentId, offeringId)</code> חוסם הרשמה כפולה:</p>
<pre data-lang="sql">CREATE PROCEDURE RegisterStudent @studentId INT, @offeringId INT
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE CourseOfferings
       SET seatsTaken = seatsTaken + 1
     WHERE offeringId = @offeringId
       AND seatsTaken &lt; capacity;          -- הבדיקה והעדכון בפקודה אחת

    IF @@ROWCOUNT = 0
      THROW 50001, N'הקורס מלא', 1;

    INSERT INTO Enrollments (studentId, offeringId)
    VALUES (@studentId, @offeringId);       -- הפרת UNIQUE = כבר רשום, וכל הטרנזקציה מבוטלת

    COMMIT TRANSACTION;
  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT &gt; 0 ROLLBACK TRANSACTION;
    THROW;
  END CATCH
END;</pre>
<p><b>MongoDB, אפשרות 1:</b> עדכון אטומי של מסמך יחיד עם תנאי (Check-and-Set), ואחריו הכנסה שמוגנת באינדקס ייחודי:</p>
<pre data-lang="mongo">const seat = db.courseOfferings.updateOne(
  { _id: 7001, seatsLeft: { $gt: 0 } },
  { $inc: { seatsLeft: -1 } }
)
if (seat.modifiedCount === 1) {
  try {
    db.enrollments.insertOne(
      { studentId: 94849, offeringId: 7001, courseId: 39839, grade: null }
    )
  } catch (e) {
    // E11000: הסטודנט כבר רשום, ולכן מחזירים את המקום (פעולת פיצוי)
    db.courseOfferings.updateOne({ _id: 7001 }, { $inc: { seatsLeft: 1 } })
  }
} else {
  print("הקורס מלא")
}</pre>
<p><b>MongoDB, אפשרות 2:</b> טרנזקציה מרובת מסמכים, הכול או כלום, כמו ב-SQL. היא נתמכת מגרסה 4.0, ודורשת Replica Set (או Sharded Cluster מגרסה 4.2), לא שרת בודד:</p>
<pre data-lang="mongo">const session = db.getMongo().startSession()
const college = session.getDatabase("college")
session.startTransaction()
try {
  const r = college.courseOfferings.updateOne(
    { _id: 7001, seatsLeft: { $gt: 0 } },
    { $inc: { seatsLeft: -1 } }
  )
  if (r.modifiedCount !== 1) throw new Error("הקורס מלא")
  college.enrollments.insertOne(
    { studentId: 94849, offeringId: 7001, courseId: 39839, grade: null }
  )
  session.commitTransaction()
} catch (e) {
  session.abortTransaction()
  print(e.message)
} finally {
  session.endSession()
}</pre>
<p><b>MongoDB, אפשרות 3:</b> כשמספר המקומות קטן וחסום (60), אפשר להחזיק את רשימת הנרשמים <b>בתוך מסמך הפתיחה</b>. אז פקודה אטומית אחת בודקת גם שיש מקום וגם שהסטודנט עוד לא רשום:</p>
<pre data-lang="mongo">db.courseOfferings.updateOne(
  { _id: 7001, seatsLeft: { $gt: 0 }, "students.studentId": { $ne: 94849 } },
  { $inc: { seatsLeft: -1 }, $push: { students: { studentId: 94849, name: "Noa Levi" } } }
)</pre>
</details>

<p class="arch-q">ח. מה יקרה אם רוצים להציג תיק סטודנט מלא במסך אחד? האם השכפול ב-NoSQL חוסך JOIN, ומה מחירו?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL:</b> תיק מלא הוא JOIN של 6 טבלאות. LEFT JOIN מבטיח שגם סטודנט חדש, שעוד אין לו הרשמות, יופיע:</p>
<pre data-lang="sql">SELECT s.studentId, s.firstName, s.lastName, d.deptName,
       c.courseName, o.semester, l.lastName AS lecturer, e.grade
FROM Students s
JOIN Departments d          ON d.deptId     = s.deptId
LEFT JOIN Enrollments e     ON e.studentId  = s.studentId
LEFT JOIN CourseOfferings o ON o.offeringId = e.offeringId
LEFT JOIN Courses c         ON c.courseId   = o.courseId
LEFT JOIN Lecturers l       ON l.lecturerId = o.lecturerId
WHERE s.studentId = 94849
ORDER BY o.semester, c.courseName;</pre>
<p><b>MongoDB:</b> במודל שלנו מספיק <code>$lookup</code> <b>אחד</b>. שם הקורס, הסמסטר וציוני הבחינות כבר שמורים בהרשמה, והמחלקה כבר שמורה בסטודנט. (אם רוצים גם את שם המרצה, כמו בשאילתת ה-SQL, מוסיפים אותו כעותק בהרשמה או מבצעים <code>$lookup</code> נוסף ל-courseOfferings.)</p>
<pre data-lang="mongo">db.students.aggregate([
  { $match: { _id: 94849 } },
  { $lookup: {
      from: "enrollments", localField: "_id",
      foreignField: "studentId", as: "enrollments"
  } },
  { $project: {
      firstName: 1, lastName: 1, dept: 1, stats: 1,
      "enrollments.courseName": 1, "enrollments.semester": 1,
      "enrollments.grade": 1, "enrollments.examResults": 1
  } }
])</pre>
<p><b>כן, השכפול חוסך JOIN-ים. המחיר:</b></p>
<ul>
  <li><b>אנומליות עדכון:</b> שינוי שם קורס, שם מחלקה או שם מרצה מחייב <code>updateMany</code> על כל העותקים (סעיף ג).</li>
  <li><b>עקביות זמנית:</b> בין העדכון במקור לעדכון העותקים יש רגע שבו התצוגה לא מעודכנת.</li>
  <li><b>מסמכים גדולים וכתיבה יקרה יותר.</b> ערכים מחושבים כמו <code>stats.gpa</code> צריך לחשב מחדש בכל ציון חדש.</li>
  <li><b>הפשרה:</b> משכפלים רק שדות לתצוגה שכמעט לא משתנים (Extended Reference), ולא את כל המסמך. ואם המסך חייב להיות מיידי, אפשר לשמור "תיק" מחושב שמתעדכן ברקע.</li>
</ul>
</details>

<p class="arch-q">ט. האם MongoDB מחייב לשמור מסמך עם מערך הרשמות? הציעו חלופה.</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>לא.</b> MongoDB לא מכתיב מבנה, וההחלטה היא שלנו. יש ארבע אפשרויות:</p>
<table class="mini">
  <tr><th>חלופה</th><th>מתי מתאימה</th></tr>
  <tr><td><b>1. Collection נפרד <code>enrollments</code></b> (References משני הצדדים, כמו טבלת גישור)</td><td>ברירת המחדל המומלצת. מתאימה כשיש הרבה הרשמות, ציונים שמתעדכנים, ושאילתות גם מצד הסטודנט וגם מצד הקורס</td></tr>
  <tr><td><b>2. מערך הפניות בסטודנט:</b> <code>offeringIds: [7001, 7002]</code></td><td>כשצריך רק לדעת "באילו קורסים" ואין מידע על הקשר. אין מקום נוח לציון, לתאריך ולסטטוס</td></tr>
  <tr><td><b>3. מערך מוטמע בסטודנט</b> (ההצעה המקורית)</td><td>כשההרשמות כמעט לא משתנות ונקראות רק מצד הסטודנט</td></tr>
  <tr><td><b>4. רשימת נרשמים בתוך הפתיחה</b></td><td>כשהמספר חסום (קיבולת הכיתה), וחשוב לבדוק מקום באופן אטומי (סעיף ז, אפשרות 3)</td></tr>
</table>
<pre data-lang="mongo">// חלופה 2: מערך הפניות, ו-$lookup עם localField שהוא מערך
db.students.insertOne(
  { _id: 94850, firstName: "Avi", lastName: "Mor", offeringIds: [7001, 7002] }
)

db.students.aggregate([
  { $match: { _id: 94850 } },
  { $lookup: {
      from: "courseOfferings", localField: "offeringIds",
      foreignField: "_id", as: "offerings"
  } }
])</pre>
<div class="callout">בדוגמה של המרצה, <code>object(course)</code> צריך להיות <code>ObjectId("...")</code> (או מספר כמו <code>39839</code>). גם השדה <code>id</code> שבתוך המסמכים הוא שדה רגיל. המפתח הראשי תמיד נקרא <code>_id</code>, ועליו עושים <code>$lookup</code> עם <code>foreignField: "_id"</code>.</div>
</details>
`);

/* ============================================================
   תרחיש 2 — חנות מסחר אלקטרוני
   ============================================================ */
H.push(`
<h4 class="arch-scn">🛒 תרחיש 2: חנות מסחר אלקטרוני</h4>
<p><b>התרחיש העסקי:</b> חנות מוכרת מוצרים בעלי מאפיינים שונים, ומנהלת עגלות קנייה, הזמנות, תשלומים, מלאי ומשלוחים.</p>
<table class="mini">
  <tr><th>סעיף</th><th>השאלה</th></tr>
  <tr><td>א</td><td>תכננו מודל SQL.</td></tr>
  <tr><td>ב</td><td>תכננו מודל NoSQL.</td></tr>
  <tr><td>ג</td><td>מדוע כדאי לשמור את מחיר המוצר בעת הרכישה, ולא להסתמך על המחיר הנוכחי ב-Products?</td></tr>
  <tr><td>ד</td><td>מה היתרון בהטמעת items בתוך מסמך ההזמנה? ומתי עדיף לשמור אותם בנפרד?</td></tr>
  <tr><td>ה</td><td>מוצר יכול לכלול 150 מאפיינים אפשריים, אבל רק 8 מהם רלוונטיים לכל מוצר. כיצד כדאי לייצג אותם בכל אחת מהארכיטקטורות?</td></tr>
  <tr><td>ו</td><td>איך נבטיח ששתי הזמנות בו-זמניות לא ימכרו את יחידת המלאי האחרונה?</td></tr>
  <tr><td>ז</td><td>אם רוצים לחשב הכנסות לפי קטגוריה ולפי חודש, אילו קשרים ושליפות נדרשים?</td></tr>
  <tr><td>ח</td><td>מה קורה כשצריך לעדכן סטטוס של תשלום, הזמנה ומשלוח? האם מסמך הזמנה יחיד הוא פתרון נכון?</td></tr>
  <tr><td>ט</td><td>איזה מודל מתאים יותר לעמוד מוצר שמקבל מיליוני קריאות, ואיזה מודל נוח יותר לניתוח פיננסי מורכב? האם אפשר להשתמש בשניהם?</td></tr>
</table>

<p class="arch-q">א. תכננו מודל SQL לחנות.</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<pre data-lang="sql">CREATE TABLE Customers (
  customerId INT IDENTITY(1,1) PRIMARY KEY,
  fullName   NVARCHAR(100) NOT NULL,
  email      NVARCHAR(100) NOT NULL UNIQUE,
  phone      VARCHAR(20) NULL
);

CREATE TABLE Categories (
  categoryId   INT IDENTITY(1,1) PRIMARY KEY,
  categoryName NVARCHAR(50) NOT NULL UNIQUE,
  parentId     INT NULL REFERENCES Categories(categoryId)    -- תת-קטגוריה
);

CREATE TABLE Products (
  productId  INT IDENTITY(1,1) PRIMARY KEY,
  sku        VARCHAR(30) NOT NULL UNIQUE,
  name       NVARCHAR(150) NOT NULL,
  categoryId INT NOT NULL REFERENCES Categories(categoryId),
  price      DECIMAL(10,2) NOT NULL CHECK (price &gt;= 0),       -- המחיר הנוכחי
  stock      INT NOT NULL CHECK (stock &gt;= 0)                  -- רשת ביטחון: המלאי לעולם לא שלילי
);

CREATE TABLE ProductAttributes (                               -- EAV: רק המאפיינים הרלוונטיים (סעיף ה)
  productId INT NOT NULL REFERENCES Products(productId),
  attrName  NVARCHAR(50)  NOT NULL,
  attrValue NVARCHAR(200) NOT NULL,
  PRIMARY KEY (productId, attrName)
);

CREATE TABLE Carts (
  cartId     INT IDENTITY(1,1) PRIMARY KEY,
  customerId INT NOT NULL UNIQUE REFERENCES Customers(customerId),   -- עגלה אחת ללקוח
  updatedAt  DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE CartItems (
  cartId    INT NOT NULL REFERENCES Carts(cartId),
  productId INT NOT NULL REFERENCES Products(productId),
  quantity  INT NOT NULL CHECK (quantity &gt; 0),
  PRIMARY KEY (cartId, productId)
);

CREATE TABLE Orders (
  orderId     INT IDENTITY(1,1) PRIMARY KEY,
  customerId  INT NOT NULL REFERENCES Customers(customerId),
  orderDate   DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  status      VARCHAR(20) NOT NULL DEFAULT 'New'
              CHECK (status IN ('New', 'Paid', 'Shipped', 'Delivered', 'Cancelled')),
  shipAddress NVARCHAR(200) NOT NULL,
  totalAmount DECIMAL(12,2) NOT NULL
);

CREATE TABLE OrderItems (
  orderId   INT NOT NULL REFERENCES Orders(orderId),
  productId INT NOT NULL REFERENCES Products(productId),
  quantity  INT NOT NULL CHECK (quantity &gt; 0),
  unitPrice DECIMAL(10,2) NOT NULL,                             -- Snapshot: המחיר ברגע הקנייה
  PRIMARY KEY (orderId, productId)
);

CREATE TABLE Payments (
  paymentId INT IDENTITY(1,1) PRIMARY KEY,
  orderId   INT NOT NULL REFERENCES Orders(orderId),            -- 1:N, כולל תשלומים חלקיים והחזרים
  amount    DECIMAL(12,2) NOT NULL,
  method    VARCHAR(20) NOT NULL,
  status    VARCHAR(20) NOT NULL CHECK (status IN ('Pending', 'Approved', 'Declined', 'Refunded')),
  paidAt    DATETIME2 NULL
);

CREATE TABLE Shipments (
  shipmentId INT IDENTITY(1,1) PRIMARY KEY,
  orderId    INT NOT NULL REFERENCES Orders(orderId),           -- 1:N, כולל משלוח מפוצל
  carrier    NVARCHAR(50) NOT NULL,
  trackingNo VARCHAR(40) NULL,
  status     VARCHAR(20) NOT NULL CHECK (status IN ('Preparing', 'InTransit', 'Delivered', 'Returned')),
  shippedAt  DATETIME2 NULL
);</pre>
<ul>
  <li><b>M:N:</b> הזמנה ↔ מוצר דרך <code>OrderItems</code>, ועגלה ↔ מוצר דרך <code>CartItems</code>.</li>
  <li><b>1:N:</b> לקוח ← הזמנות. הזמנה ← תשלומים ומשלוחים. קטגוריה ← מוצרים.</li>
  <li>ה-<code>CHECK (stock &gt;= 0)</code> הוא רשת ביטחון אחרונה. ההגנה העיקרית מפני מכירת יתר נמצאת בסעיף ו.</li>
</ul>
</details>

<p class="arch-q">ב. תכננו מודל NoSQL לחנות.</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<table class="mini">
  <tr><th>Collection</th><th>מה בתוכו</th><th>החלטה ונימוק</th></tr>
  <tr><td dir="ltr">products</td><td>פרטי המוצר, <code>category</code> כ-Extended Reference, מחיר, מלאי, <code>attributes</code> כזוגות <code>{ k, v }</code>, ו-<code>rating</code> מחושב</td><td>כל מה שעמוד המוצר מציג נמצא במסמך אחד (סעיף ט). המלאי נמצא במסמך עצמו, ולכן אפשר לעדכן אותו באופן אטומי (סעיף ו)</td></tr>
  <tr><td dir="ltr">customers</td><td>פרטים, ו-<code>addresses</code> מוטמעות</td><td>הכתובות חסומות (2–5) ונקראות עם הלקוח</td></tr>
  <tr><td dir="ltr">carts</td><td><code>_id</code> שהוא מזהה הלקוח, ו-<code>items</code> מוטמעים</td><td>העגלה קטנה וזמנית. אינדקס TTL מוחק עגלות נטושות</td></tr>
  <tr><td dir="ltr">orders</td><td>לקוח (Extended Reference), <code>items</code> עם Snapshot של המחיר, סיכום, ו-<code>payment</code> ו-<code>shipping</code> כסטטוס נוכחי</td><td>הזמנה נכתבת פעם אחת ונקראת כיחידה אחת. הפריטים חסומים</td></tr>
  <tr><td dir="ltr">payments / shipmentEvents</td><td>כל ניסיון תשלום וכל אירוע מעקב, כמסמך נפרד</td><td>אלה רשימות שגדלות ושייכות למערכות אחרות (סעיף ח)</td></tr>
  <tr><td dir="ltr">reviews</td><td>ביקורת לכל מסמך</td><td>לא חסום. במוצר נשמר רק <code>rating</code> מחושב</td></tr>
</table>
<pre data-lang="mongo">db.products.insertOne({
  _id: 501,
  sku: "LAP-ZEN-14",
  name: "ZenBook 14",
  category: { categoryId: 3, name: "Laptops" },
  price: 4299.90,                 // במערכת אמיתית: NumberDecimal("4299.90")
  stock: 12,
  attributes: [                   // Attribute Pattern: רק 8 המאפיינים של המוצר הזה
    { k: "brand", v: "Asus" },
    { k: "ram_gb", v: 16 },
    { k: "storage_gb", v: 512 },
    { k: "cpu", v: "Intel Core Ultra 7" },
    { k: "screen_inch", v: 14 },
    { k: "weight_kg", v: 1.2 },
    { k: "color", v: "Gray" },
    { k: "os", v: "Windows 11" }
  ],
  rating: { avg: 4.6, count: 318 }
})

db.customers.insertOne({
  _id: 2001,
  name: "Dana Klein",
  email: "dana@mail.com",
  addresses: [ { label: "home", city: "Tel Aviv", street: "Herzl 1" } ]
})

db.carts.insertOne({
  _id: 2001,                      // = customerId: עגלה אחת ללקוח
  items: [ { productId: 501, name: "ZenBook 14", price: 4299.90, qty: 1 } ],
  updatedAt: new Date()
})

db.orders.insertOne({
  _id: 90001,
  customer: { customerId: 2001, name: "Dana Klein", email: "dana@mail.com" },
  orderDate: ISODate("2026-10-01T10:15:00Z"),
  status: "Paid",
  items: [                        // Snapshot: מחיר, שם וקטגוריה ברגע הקנייה
    { productId: 501, sku: "LAP-ZEN-14", name: "ZenBook 14",
      category: "Laptops", unitPrice: 4299.90, qty: 1 },
    { productId: 777, sku: "MOU-01", name: "Wireless Mouse",
      category: "Accessories", unitPrice: 89.90, qty: 2 }
  ],
  total: 4479.70,
  payment: { method: "credit", status: "Approved", amount: 4479.70,
             paidAt: ISODate("2026-10-01T10:16:00Z") },
  shipping: { address: "Herzl 1, Tel Aviv", carrier: "Israel Post",
              trackingNo: null, status: "Preparing" }
})

// אינדקסים
db.products.createIndex({ sku: 1 }, { unique: true })
db.products.createIndex({ "attributes.k": 1, "attributes.v": 1 })
db.customers.createIndex({ email: 1 }, { unique: true })
db.orders.createIndex({ "customer.customerId": 1, orderDate: -1 })
// TTL: עגלה נטושה נמחקת אוטומטית 30 יום אחרי העדכון האחרון
db.carts.createIndex({ updatedAt: 1 }, { expireAfterSeconds: 2592000 })</pre>
</details>

<p class="arch-q">ג. למה לשמור את מחיר המוצר בעת הרכישה, ולא להסתמך על המחיר הנוכחי ב-Products?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<ul>
  <li><b>המחיר משתנה:</b> מבצעים, עליית מחירים, הנחה ללקוח או קופון. הזמנה מ-2025 חייבת להציג את מה ש<b>שולם</b>, ולא את המחיר של היום.</li>
  <li><b>הזמנה היא מסמך פיננסי והיסטורי:</b> חשבונית, דוח הכנסות, החזר כספי ומע"מ מחושבים לפי המחיר ששולם. אם נחשב מחדש לפי <code>Products.price</code>, ההכנסות של חודשים קודמים "ישתנו" בכל שינוי מחיר.</li>
  <li><b>זו לא כפילות:</b> <code>OrderItems.unitPrice</code> הוא <b>עובדה אחרת</b>, המחיר ברגע מסוים, ולכן הוא לא מפר נרמול. נרמול אוסר לשמור את <b>אותה</b> עובדה פעמיים.</li>
  <li>ב-SQL זו עמודה ב-<code>OrderItems</code>. ב-MongoDB זה <code>items[].unitPrice</code>. גם השם, ה-SKU והקטגוריה נשמרים כ-Snapshot, כדי שההזמנה תוצג נכון גם אם המוצר יימחק או ישתנה.</li>
</ul>
<pre data-lang="sql">-- בזמן יצירת ההזמנה: המחיר מועתק מ-Products פעם אחת, ולא מתעדכן יותר
INSERT INTO OrderItems (orderId, productId, quantity, unitPrice)
SELECT 90001, productId, 1, price
FROM Products
WHERE productId = 501;</pre>
</details>

<p class="arch-q">ד. מה היתרון בהטמעת items בתוך מסמך ההזמנה, ומתי עדיף לשמור אותם בנפרד?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<table class="mini">
  <tr><th>יתרונות ההטמעה</th><th>מתי עדיף Collection נפרד (orderItems)</th></tr>
  <tr><td><b>קריאה אחת</b> מחזירה הזמנה שלמה לתצוגה, לחשבונית ולמייל אישור</td><td>הזמנות ענק (B2B) עם אלפי שורות, שמתקרבות ל-16MB או מנפחות כל קריאה</td></tr>
  <tr><td><b>אטומיות:</b> <code>insertOne</code> אחד יוצר את ההזמנה עם כל השורות, הכול או כלום, בלי טרנזקציה</td><td>לכל פריט יש <b>מחזור חיים משלו</b>: נשלח בנפרד על ידי ספק אחר (Marketplace), מוחזר, או מקבל סטטוס משלו</td></tr>
  <tr><td>הפריטים <b>שייכים רק להזמנה הזו</b>, חסומים (בדרך כלל עד כמה עשרות) ולא משתנים אחרי הקנייה</td><td>הרבה עדכונים בו-זמניים לפריטים שונים של אותה הזמנה, כי אז כל הכותבים מתחרים על מסמך אחד</td></tr>
  <tr><td>אין צורך ב-JOIN לטבלת OrderItems</td><td>ניתוח שמתמקד בפריטים (למשל "כל המכירות של מוצר X"). זה אפשרי גם עם <code>$unwind</code>, אבל אינדקס על Collection נפרד מהיר יותר</td></tr>
</table>
<pre data-lang="mongo">// "כמה יחידות נמכרו מכל מוצר" גם כשהפריטים מוטמעים
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.productId", unitsSold: { $sum: "$items.qty" } } },
  { $sort: { unitsSold: -1 } }
])</pre>
</details>

<p class="arch-q">ה. מוצר עם 150 מאפיינים אפשריים, שרק 8 מהם רלוונטיים. איך לייצג את זה בכל ארכיטקטורה?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL: ארבע אפשרויות, ולכל אחת מחיר</b></p>
<table class="mini">
  <tr><th>אפשרות</th><th>יתרון</th><th>חיסרון</th></tr>
  <tr><td>טבלה רחבה עם 150 עמודות</td><td>שאילתות פשוטות וטיפוסים נכונים</td><td>142 עמודות NULL בכל שורה, ו-<code>ALTER TABLE</code> לכל מאפיין חדש</td></tr>
  <tr><td>טבלת EAV, <code>ProductAttributes(productId, attrName, attrValue)</code></td><td>גמיש: שורה לכל מאפיין קיים בלבד</td><td>כל הערכים טקסט, אין <code>CHECK</code> לפי סוג, ושאילתה על כמה מאפיינים דורשת כמה JOIN-ים או PIVOT</td></tr>
  <tr><td>טבלה לכל סוג מוצר (Laptops, Shirts…)</td><td>טיפוסים ואילוצים מדויקים</td><td>הרבה טבלאות, וכל קטגוריה חדשה דורשת טבלה חדשה</td></tr>
  <tr><td>עמודת JSON (<code>NVARCHAR(MAX)</code> עם <code>ISJSON</code>)</td><td>גמיש, ונשאר בטבלת המוצרים</td><td>האילוצים והאינדקסים מוגבלים, והתחביר מסורבל (<code>JSON_VALUE</code>)</td></tr>
</table>
<pre data-lang="sql">-- EAV: מחשבים עם 16GB זיכרון או יותר
SELECT p.productId, p.name
FROM Products p
JOIN ProductAttributes a ON a.productId = p.productId
WHERE a.attrName = 'ram_gb'
  AND TRY_CAST(a.attrValue AS INT) &gt;= 16;

-- עמודת JSON: אותה שאילתה
ALTER TABLE Products ADD attributes NVARCHAR(MAX) NULL
  CONSTRAINT CK_Products_Attr CHECK (ISJSON(attributes) = 1);

SELECT productId, name
FROM Products
WHERE CAST(JSON_VALUE(attributes, '$.ram_gb') AS INT) &gt;= 16;</pre>
<p><b>MongoDB:</b> זה המקרה הקלאסי של <b>סכמה גמישה</b>. כל מסמך מכיל רק את 8 השדות שלו (Polymorphic), בלי NULL-ים ובלי ALTER. כדי שאפשר יהיה לחפש לפי כל מאפיין, משתמשים ב-<b>Attribute Pattern</b>: מערך של זוגות <code>{ k, v }</code> ו<b>אינדקס אחד</b> שמכסה את כל 150 המאפיינים. אם כל מאפיין היה שדה נפרד, היה צריך אינדקס לכל אחד, ויש מגבלה של 64 אינדקסים ל-Collection.</p>
<pre data-lang="mongo">db.products.createIndex({ "attributes.k": 1, "attributes.v": 1 })

// מחשבים עם 16GB זיכרון או יותר — $elemMatch מבטיח ש-k ו-v שייכים לאותו זוג
db.products.find({ attributes: { $elemMatch: { k: "ram_gb", v: { $gte: 16 } } } })

// שני מאפיינים יחד: $all עם שני $elemMatch
db.products.find({
  attributes: { $all: [
    { $elemMatch: { k: "ram_gb", v: { $gte: 16 } } },
    { $elemMatch: { k: "color", v: "Gray" } }
  ] }
})</pre>
<div class="callout">חלופה ב-MongoDB: לשמור את המאפיינים כמסמך מקונן (<code>specs: { ram_gb: 16, color: "Gray" }</code>) ולבנות Wildcard Index: <code>db.products.createIndex({ "specs.$**": 1 })</code>.</div>
</details>

<p class="arch-q">ו. איך נבטיח ששתי הזמנות בו-זמניות לא ימכרו את יחידת המלאי האחרונה?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>הטעות הקלאסית</b> היא לקרוא את המלאי (<code>SELECT stock</code>) ורק אחר כך לעדכן. שני תהליכים קוראים 1, שניהם מחליטים שיש מלאי, ושניהם מוכרים. זה נקרא Race condition או Lost update. הפתרון הוא <b>תנאי ועדכון בפעולה אטומית אחת</b>.</p>
<p><b>SQL:</b> ה-UPDATE לוקח נעילה בלעדית על השורה עד ה-COMMIT. הטרנזקציה השנייה מחכה, וכשהיא ממשיכה היא בודקת את התנאי מול הערך החדש (0), ולכן מעדכנת 0 שורות:</p>
<pre data-lang="sql">DECLARE @customerId INT = 2001, @pid INT = 501, @qty INT = 1, @orderId INT;

BEGIN TRY
  BEGIN TRANSACTION;

  UPDATE Products
     SET stock = stock - @qty
   WHERE productId = @pid
     AND stock &gt;= @qty;

  IF @@ROWCOUNT = 0
    THROW 50002, N'אין מספיק מלאי', 1;

  INSERT INTO Orders (customerId, shipAddress, totalAmount)
  SELECT @customerId, N'Herzl 1, Tel Aviv', price * @qty
  FROM Products WHERE productId = @pid;

  SET @orderId = SCOPE_IDENTITY();

  INSERT INTO OrderItems (orderId, productId, quantity, unitPrice)
  SELECT @orderId, productId, @qty, price
  FROM Products WHERE productId = @pid;

  COMMIT TRANSACTION;
END TRY
BEGIN CATCH
  IF @@TRANCOUNT &gt; 0 ROLLBACK TRANSACTION;
  THROW;
END CATCH;</pre>
<p><b>MongoDB, מוצר אחד:</b> עדכון של מסמך יחיד הוא אטומי. התנאי <code>stock: { $gte: 1 }</code> וה-<code>$inc</code> מתבצעים יחד, ורק עדכון אחד מצליח:</p>
<pre data-lang="mongo">const r = db.products.updateOne(
  { _id: 501, stock: { $gte: 1 } },
  { $inc: { stock: -1 } }
)
if (r.modifiedCount === 0) {
  print("אזל מהמלאי, ההזמנה לא נוצרת")
} else {
  db.orders.insertOne({
    customer: { customerId: 2001 },
    items: [ { productId: 501, unitPrice: 4299.90, qty: 1 } ],
    status: "New",
    orderDate: new Date()
  })
}</pre>
<p><b>MongoDB, כמה מוצרים בהזמנה:</b> טרנזקציה מרובת מסמכים, כך שאם מוצר אחד חסר, אף מלאי לא יורד:</p>
<pre data-lang="mongo">const session = db.getMongo().startSession()
const shop = session.getDatabase("shop")
session.startTransaction()
try {
  const lines = [ { productId: 501, qty: 1 }, { productId: 777, qty: 2 } ]
  for (const it of lines) {
    const r = shop.products.updateOne(
      { _id: it.productId, stock: { $gte: it.qty } },
      { $inc: { stock: -it.qty } }
    )
    if (r.modifiedCount === 0) throw new Error("אין מלאי למוצר " + it.productId)
  }
  shop.orders.insertOne(
    { customer: { customerId: 2001 }, items: lines, status: "New", orderDate: new Date() }
  )
  session.commitTransaction()
} catch (e) {
  session.abortTransaction()
  print(e.message)
} finally {
  session.endSession()
}</pre>
</details>

<p class="arch-q">ז. הכנסות לפי קטגוריה ולפי חודש: אילו קשרים ושליפות נדרשים?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL:</b> ארבע טבלאות בשרשרת: <b>Orders → OrderItems → Products → Categories</b>. ההכנסה מחושבת מ-<code>unitPrice</code> ששולם (סעיף ג), ולא מ-<code>Products.price</code>:</p>
<pre data-lang="sql">SELECT c.categoryName,
       YEAR(o.orderDate)  AS yr,
       MONTH(o.orderDate) AS mon,
       SUM(oi.quantity * oi.unitPrice) AS revenue
FROM Orders o
JOIN OrderItems oi ON oi.orderId   = o.orderId
JOIN Products p    ON p.productId  = oi.productId
JOIN Categories c  ON c.categoryId = p.categoryId
WHERE o.status &lt;&gt; 'Cancelled'
GROUP BY c.categoryName, YEAR(o.orderDate), MONTH(o.orderDate)
ORDER BY yr, mon, revenue DESC;</pre>
<p><b>MongoDB:</b> כשהקטגוריה נשמרה ב-Snapshot בתוך <code>items</code>, אין צורך ב-<code>$lookup</code>. מספיקים <code>$unwind</code> ו-<code>$group</code> עם מפתח מורכב:</p>
<pre data-lang="mongo">db.orders.aggregate([
  { $match: { status: { $ne: "Cancelled" } } },
  { $unwind: "$items" },
  { $group: {
      _id: {
        category: "$items.category",
        year:  { $year: "$orderDate" },
        month: { $month: "$orderDate" }
      },
      revenue: { $sum: { $multiply: ["$items.unitPrice", "$items.qty"] } }
  } },
  { $sort: { "_id.year": 1, "_id.month": 1, revenue: -1 } }
])</pre>
<p>כשבפריט נשמר רק <code>productId</code>, צריך להוסיף <code>$lookup</code> ל-products:</p>
<pre data-lang="mongo">db.orders.aggregate([
  { $match: { status: { $ne: "Cancelled" } } },
  { $unwind: "$items" },
  { $lookup: { from: "products", localField: "items.productId", foreignField: "_id", as: "p" } },
  { $unwind: "$p" },
  { $group: {
      _id: {
        category: "$p.category.name",
        year:  { $year: "$orderDate" },
        month: { $month: "$orderDate" }
      },
      revenue: { $sum: { $multiply: ["$items.unitPrice", "$items.qty"] } }
  } },
  { $sort: { "_id.year": 1, "_id.month": 1, revenue: -1 } }
])</pre>
<div class="callout">יש כאן שאלה עסקית: אם מוצר עבר קטגוריה, האם מכירות העבר עוברות איתו? ב-SQL, ה-JOIN ל-<code>Products</code> מעביר אותן, כי הוא תמיד משתמש בקטגוריה הנוכחית. אם רוצים את הקטגוריה מזמן המכירה, שומרים אותה ב-Snapshot (עמודה ב-<code>OrderItems</code>, או <code>items.category</code> במונגו).</div>
</details>

<p class="arch-q">ח. עדכון סטטוס של תשלום, הזמנה ומשלוח: האם מסמך הזמנה יחיד הוא פתרון נכון?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL:</b> שלוש טבלאות, ולכן טרנזקציה אחת שמעדכנת את כולן יחד. <code>SET XACT_ABORT ON</code> מבטיח שכל שגיאה מבטלת את כל הטרנזקציה. בלעדיו, הפרת אילוץ בפקודה אחת מבטלת רק את אותה פקודה, וה-COMMIT שומר את השאר:</p>
<pre data-lang="sql">SET XACT_ABORT ON;
BEGIN TRANSACTION;
UPDATE Payments SET status = 'Approved', paidAt = SYSDATETIME()
 WHERE orderId = 90001 AND status = 'Pending';
UPDATE Orders SET status = 'Paid' WHERE orderId = 90001;
INSERT INTO Shipments (orderId, carrier, status) VALUES (90001, N'Israel Post', 'Preparing');
COMMIT TRANSACTION;</pre>
<p><b>MongoDB:</b> כשהתשלום והמשלוח מוטמעים בהזמנה, <code>updateOne</code> אחד משנה את שלושת הסטטוסים <b>באופן אטומי</b>, בלי טרנזקציה. התנאי <code>"payment.status": "Pending"</code> מונע אישור כפול:</p>
<pre data-lang="mongo">db.orders.updateOne(
  { _id: 90001, "payment.status": "Pending" },
  {
    $set: {
      status: "Paid",
      "payment.status": "Approved",
      "payment.paidAt": new Date(),
      "shipping.status": "Preparing"
    },
    $push: { history: { status: "Paid", at: new Date() } }
  }
)</pre>
<p><b>האם זה נכון תמיד? לא.</b> מסמך יחיד מתאים כשיש תשלום אחד ומשלוח אחד. הוא מפסיק להתאים כאשר:</p>
<ul>
  <li>יש <b>תשלומים חלקיים</b>, תשלומים בפריסה, ניסיונות כושלים או החזרים. אלה רשימות שגדלות.</li>
  <li>יש <b>משלוח מפוצל</b>, למשל כמה ספקים, וכל אחד מהם יוצר עשרות אירועי מעקב.</li>
  <li><b>מערכות שונות כותבות</b> לאותו מסמך: סליקה, לוגיסטיקה ושירות לקוחות. זה יוצר תחרות על מסמך "חם".</li>
  <li>יש <b>דרישות ביקורת פיננסית</b>: כל תנועה כספית צריכה להישמר כרשומה נפרדת שלא משתנה.</li>
</ul>
<p><b>הפתרון המקובל:</b> בהזמנה נשמר רק <b>הסטטוס הנוכחי</b> (<code>payment.status</code>, <code>shipping.status</code>), לתצוגה מהירה. הפרטים המלאים נשמרים ב-Collections נפרדים, <code>payments</code> ו-<code>shipmentEvents</code>. הכנסת תנועה ועדכון הסיכום נעשים בטרנזקציה.</p>
</details>

<p class="arch-q">ט. עמוד מוצר עם מיליוני קריאות מול ניתוח פיננסי מורכב: איזה מודל לכל אחד, ואפשר להשתמש בשניהם?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<table class="mini">
  <tr><th></th><th>עמוד מוצר (מיליוני קריאות)</th><th>ניתוח פיננסי מורכב</th></tr>
  <tr><td><b>מודל מתאים</b></td><td><b>מסמכים (MongoDB):</b> מסמך מוצר אחד עם כל מה שהעמוד מציג, כלומר מאפיינים, מחיר, דירוג מחושב ו-10 הביקורות האחרונות (Subset)</td><td><b>רלציוני (SQL):</b> נתונים מנורמלים, JOIN-ים חופשיים, <code>GROUP BY</code>, פונקציות חלון וטרנזקציות ACID</td></tr>
  <tr><td><b>למה</b></td><td>קריאה אחת לפי <code>_id</code> בלי JOIN. קל לשכפל לשרתי קריאה (Replica Set) ולפזר בין שרתים (Sharding). Cache (Redis) מעל זה מוסיף עוד מהירות</td><td>שאלות שלא ידועות מראש ("רווח לפי קטגוריה × אזור × רבעון"), דיוק כספי (<code>DECIMAL</code>) ואילוצים. מתחבר לכלי BI ול-Data Warehouse</td></tr>
  <tr><td><b>חולשה</b></td><td>שאילתות אד-הוק ו-JOIN-ים מורכבים פחות נוחים</td><td>JOIN של 6 טבלאות בכל טעינת עמוד מוצר, מיליוני פעמים, הוא בזבוז</td></tr>
</table>
<p><b>כן, אפשר וכדאי להשתמש בשניהם (Polyglot Persistence).</b> SQL הוא מערכת הרשומה להזמנות, לתשלומים ולמלאי. MongoDB משמש לקטלוג, לעמודי המוצר ולעגלות. הסנכרון נעשה באירועים: מוצר שמתעדכן ב-SQL מעדכן את מסמך הקטלוג, או ש-Change Streams של MongoDB מזינים את מחסן הנתונים.</p>
<p><b>המחיר:</b> צריך לתחזק שתי טכנולוגיות. בין המערכות יש עקביות בסופו של דבר (Eventual consistency), כלומר מחיר בעמוד יכול להתעדכן שנייה אחרי השינוי. אין טרנזקציה אחת שחוצה את שני בסיסי הנתונים. ולכל נתון צריך להחליט מי המקור שלו.</p>
</details>
`);

/* ============================================================
   תרחיש 3 — רשת חברתית
   ============================================================ */
H.push(`
<h4 class="arch-scn">📱 תרחיש 3: רשת חברתית</h4>
<p><b>התרחיש העסקי:</b> משתמשים מפרסמים פוסטים, מגיבים, מסמנים לייקים, עוקבים זה אחר זה ומשתפים תמונות.</p>
<table class="mini">
  <tr><th>סעיף</th><th>השאלה</th></tr>
  <tr><td>א</td><td>תכננו מודל SQL.</td></tr>
  <tr><td>ב</td><td>תכננו מודל NoSQL.</td></tr>
  <tr><td>ג</td><td>כתבו דוגמה למסמך פוסט.</td></tr>
  <tr><td>ד</td><td>מדוע לא כדאי בהכרח להטמיע את כל העוקבים של משתמש בתוך מסמך ה-users?</td></tr>
  <tr><td>ה</td><td>אם לפוסט יש מיליון לייקים, מה הבעיה במערך likes בתוך מסמך הפוסט?</td></tr>
  <tr><td>ו</td><td>כיצד אפשר להציג Feed של משתמש שמבוסס על הפוסטים של כל מי שהוא עוקב אחריהם?</td></tr>
  <tr><td>ז</td><td>מה היתרון של Feeds שמוכנים מראש, ומה עלות התחזוקה שלהם כשמשתמש מפרסם פוסט חדש?</td></tr>
  <tr><td>ח</td><td>אם משתמש משנה את שמו, האם יש לעדכן את השם בכל הפוסטים שלו? מה היתרון ומה החיסרון של שמירת displayName בתוך הפוסט?</td></tr>
  <tr><td>ט</td><td>כיצד נוודא שמשתמש לא יסמן לייק לאותו פוסט פעמיים? השוו בין אילוץ ייחודיות ב-SQL לבין אינדקס ייחודי ב-MongoDB.</td></tr>
  <tr><td>י</td><td>האם מספר הלייקים שמופיע במסמך הפוסט צריך להיות הנתון היחיד שמוצג, או נתון מחושב? מה עלול להשתבש?</td></tr>
  <tr><td>יא</td><td>אילו חלקים במערכת הייתם בונים ב-SQL, אילו ב-NoSQL, והאם יש יתרון לארכיטקטורה משולבת?</td></tr>
</table>

<p class="arch-q">א. תכננו מודל SQL לרשת החברתית.</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<pre data-lang="sql">CREATE TABLE Users (
  userId      INT IDENTITY(1,1) PRIMARY KEY,
  userName    VARCHAR(30)   NOT NULL UNIQUE,
  displayName NVARCHAR(60)  NOT NULL,
  email       NVARCHAR(100) NOT NULL UNIQUE,
  createdAt   DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE Follows (                       -- M:N של Users עם עצמה
  followerId INT NOT NULL REFERENCES Users(userId),   -- מי שעוקב
  followeeId INT NOT NULL REFERENCES Users(userId),   -- אחרי מי
  followedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  PRIMARY KEY (followerId, followeeId),
  CHECK (followerId &lt;&gt; followeeId)          -- אי אפשר לעקוב אחרי עצמך
);

CREATE TABLE Posts (
  postId       BIGINT IDENTITY(1,1) PRIMARY KEY,
  authorId     INT NOT NULL REFERENCES Users(userId),
  content      NVARCHAR(2000) NULL,
  createdAt    DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  likeCount    INT NOT NULL DEFAULT 0,      -- מונה שמור (סעיף י)
  commentCount INT NOT NULL DEFAULT 0
);

CREATE TABLE PostPhotos (
  photoId  BIGINT IDENTITY(1,1) PRIMARY KEY,
  postId   BIGINT NOT NULL REFERENCES Posts(postId),
  url      NVARCHAR(400) NOT NULL,         -- הקובץ עצמו נשמר באחסון קבצים, לא ב-DB
  position TINYINT NOT NULL DEFAULT 1
);

CREATE TABLE Comments (
  commentId BIGINT IDENTITY(1,1) PRIMARY KEY,
  postId    BIGINT NOT NULL REFERENCES Posts(postId),
  userId    INT NOT NULL REFERENCES Users(userId),
  body      NVARCHAR(1000) NOT NULL,
  createdAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE Likes (
  userId  INT    NOT NULL REFERENCES Users(userId),
  postId  BIGINT NOT NULL REFERENCES Posts(postId),
  likedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  PRIMARY KEY (userId, postId)               -- לייק אחד למשתמש לפוסט (סעיף ט)
);

CREATE INDEX IX_Posts_Author_Date ON Posts(authorId, createdAt DESC);
CREATE INDEX IX_Follows_Followee  ON Follows(followeeId);      -- "מי עוקב אחריי"
CREATE INDEX IX_Likes_Post        ON Likes(postId);</pre>
</details>

<p class="arch-q">ב. תכננו מודל NoSQL לרשת החברתית.</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<table class="mini">
  <tr><th>Collection</th><th>מה בתוכו</th><th>החלטה ונימוק</th></tr>
  <tr><td dir="ltr">users</td><td>פרופיל, ומונים מחושבים: <code>followersCount</code>, <code>followingCount</code>, <code>postsCount</code></td><td>העוקבים עצמם <b>לא</b> נשמרים כאן (סעיף ד)</td></tr>
  <tr><td dir="ltr">follows</td><td>מסמך לכל קשר: <code>{ followerId, followeeId, createdAt }</code></td><td>קשר M:N לא חסום. שני אינדקסים, כדי לשאול משני הכיוונים</td></tr>
  <tr><td dir="ltr">posts</td><td><code>author</code> כ-Extended Reference, טקסט, <code>photos</code> (עד 10), מונים, ו-<code>recentComments</code> (3 אחרונות)</td><td>מסמך אחד מספיק כדי להציג פוסט בפיד. התמונות חסומות, ולכן מוטמעות. התגובות מוטמעות רק בחלקן (Subset)</td></tr>
  <tr><td dir="ltr">comments</td><td>מסמך לכל תגובה, עם <code>postId</code> ו-<code>author</code></td><td>לא חסום. "כל התגובות" נטענות בדפדוף</td></tr>
  <tr><td dir="ltr">likes</td><td>מסמך לכל לייק: <code>{ postId, userId, createdAt }</code></td><td>לא חסום. אינדקס ייחודי מונע לייק כפול (סעיף ט)</td></tr>
  <tr><td dir="ltr">feeds</td><td>לכל משתמש: 500 הפריטים האחרונים בפיד שלו</td><td>Fan-out on write (סעיף ז). מערך חסום בעזרת <code>$slice</code></td></tr>
</table>
<pre data-lang="mongo">db.users.insertOne({
  _id: 7,
  userName: "noa.levi",
  displayName: "Noa Levi",
  email: "noa@mail.com",
  avatarUrl: "https://cdn.example.com/u/7.jpg",
  bio: "Information Systems student",
  followersCount: 5400,
  followingCount: 310,
  postsCount: 87,
  createdAt: ISODate("2024-01-10")
})

db.follows.insertOne({ followerId: 12, followeeId: 7, createdAt: new Date() })
db.likes.insertOne(
  { postId: ObjectId("66f1a2b3c4d5e6f708091a2b"), userId: 12, createdAt: new Date() }
)
db.comments.insertOne({
  postId: ObjectId("66f1a2b3c4d5e6f708091a2b"),
  author: { userId: 12, displayName: "Avi Mor" },
  text: "כל הכבוד!",
  createdAt: new Date()
})

// אינדקסים
db.users.createIndex({ userName: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })
// "את מי אני עוקב" + אין מעקב כפול
db.follows.createIndex({ followerId: 1, followeeId: 1 }, { unique: true })
// "מי עוקב אחריי", מהחדש לישן
db.follows.createIndex({ followeeId: 1, createdAt: -1 })
// הפוסטים של משתמש, מהחדש לישן (גם לפיד בסעיף ו)
db.posts.createIndex({ "author.userId": 1, createdAt: -1 })
db.comments.createIndex({ postId: 1, createdAt: -1 })
db.likes.createIndex({ postId: 1, userId: 1 }, { unique: true })</pre>
</details>

<p class="arch-q">ג. כתבו דוגמה למסמך פוסט.</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<pre data-lang="mongo">db.posts.insertOne({
  _id: ObjectId("66f1a2b3c4d5e6f708091a2b"),
  author: {                                    // Extended Reference: מה שמוצג ליד הפוסט
    userId: 7,
    userName: "noa.levi",
    displayName: "Noa Levi",
    avatarUrl: "https://cdn.example.com/u/7.jpg"
  },
  text: "סוף סוף סיימתי את עבודת ישור קו!",
  photos: [                                    // חסום (עד 10). הקובץ עצמו נמצא באחסון קבצים
    { url: "https://cdn.example.com/p/66f1-1.jpg", width: 1080, height: 1350 }
  ],
  hashtags: ["sql", "mongodb"],
  createdAt: ISODate("2026-10-16T09:30:00Z"),
  likeCount: 1250,                             // מונה. המקור האמיתי הוא likes
  commentCount: 3,
  recentComments: [                            // Subset: רק 3 האחרונות. כולן נמצאות ב-comments
    { userId: 12, displayName: "Avi Mor", text: "כל הכבוד!",
      createdAt: ISODate("2026-10-16T09:41:00Z") }
  ]
})</pre>
<ul>
  <li><b>מוטמע:</b> פרטי הכותב לתצוגה, תמונות ו-3 תגובות אחרונות. כל אלה חסומים ונקראים יחד עם הפוסט.</li>
  <li><b>לא מוטמע:</b> כל הלייקים וכל התגובות, כי הם לא חסומים. במקומם יש שני מונים.</li>
  <li><b>התמונות עצמן</b> לא נשמרות ב-DB, כי מסמך מוגבל ל-16MB וזה גם יקר. ב-DB נשמר רק הקישור (URL) לאחסון קבצים או ל-CDN.</li>
</ul>
</details>

<p class="arch-q">ד. מדוע לא כדאי בהכרח להטמיע את כל העוקבים בתוך מסמך ה-users?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<ul>
  <li><b>מערך לא חסום:</b> לידוען יש מיליוני עוקבים. כל איבר מערך עם ObjectId תופס כ-20 בתים ב-BSON, כך שכ-800,000 עוקבים כבר מגיעים ל-16MB, ואז כל הכנסה נכשלת.</li>
  <li><b>מסמך "חם":</b> כל מעקב וכל ביטול מעקב כותבים לאותו מסמך. אלפי כתיבות בדקה על מסמך אחד יוצרות תחרות ונעילות.</li>
  <li><b>קריאה כבדה:</b> כל הצגה של הפרופיל (שם ותמונה) מושכת גם מגה-בייטים של מזהים, אלא אם מקפידים על Projection.</li>
  <li><b>שני כיווני שאילתה:</b> צריך גם "מי עוקב אחריי" וגם "את מי אני עוקב". שמירה בשני המסמכים משכפלת כל קשר, וקשה לשמור אותם מסונכרנים.</li>
  <li><b>מידע על הקשר עצמו</b> (מתי התחיל, האם יש התראות) לא מוצא מקום נוח במערך פשוט.</li>
</ul>
<p><b>הפתרון:</b> Collection נפרד <code>follows</code> עם אינדקסים לשני הכיוונים, ובמסמך המשתמש רק <b>מונים</b>:</p>
<pre data-lang="mongo">// מעקב חדש: מסמך בקשר, ועדכון של שני המונים
db.follows.insertOne({ followerId: 12, followeeId: 7, createdAt: new Date() })
db.users.updateOne({ _id: 7 },  { $inc: { followersCount: 1 } })
db.users.updateOne({ _id: 12 }, { $inc: { followingCount: 1 } })

// מי עוקב אחרי משתמש 7? מדפדפים, לא טוענים מיליון בבת אחת
db.follows.find({ followeeId: 7 }).sort({ createdAt: -1 }).limit(50)</pre>
<div class="callout">הטמעה <b>כן</b> סבירה כשהרשימה חסומה וקטנה מטבעה, למשל "חברים קרובים" (עד 50), או במערכת סגורה שבה לכל משתמש יש עשרות עוקבים לכל היותר.</div>
</details>

<p class="arch-q">ה. לפוסט יש מיליון לייקים. מה הבעיה במערך likes בתוך מסמך הפוסט?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<ul>
  <li><b>16MB:</b> מיליון מזהי ObjectId הם כ-20MB (ואם שומרים גם תאריך לכל לייק, הרבה יותר), ולכן המסמך <b>חורג מהמגבלה</b> והלייקים הבאים נכשלים.</li>
  <li><b>ביצועים:</b> כל טעינה של הפוסט בפיד מושכת מגה-בייטים מיותרים. <code>$addToSet</code> שבודק כפילות על מערך של מיליון איברים יקר, וכל לייק משכתב מסמך ענק.</li>
  <li><b>מסמך "חם":</b> פוסט ויראלי מקבל אלפי לייקים בשנייה, וכולם כותבים לאותו מסמך.</li>
  <li><b>שאילתות:</b> "אילו פוסטים אהב משתמש 12" דורשת לסרוק מערכים בכל הפוסטים, וקשה לדפדף ב"מי אהב".</li>
</ul>
<p><b>הפתרון:</b> Collection בשם <code>likes</code> עם מסמך לכל לייק ואינדקס ייחודי, ובפוסט מונה <code>likeCount</code>. אם רוצים להציג "נועה ועוד 1,249 אהבו", אפשר לשמור בפוסט גם רשימה קצרה וחסומה של כמה ממליצים אחרונים.</p>
<pre data-lang="mongo">// "אילו פוסטים אהב משתמש 12" — צריך אינדקס על userId
db.likes.createIndex({ userId: 1, createdAt: -1 })
db.likes.find({ userId: 12 }).sort({ createdAt: -1 }).limit(20)</pre>
</details>

<p class="arch-q">ו. איך מציגים Feed של משתמש, שמבוסס על הפוסטים של כל מי שהוא עוקב אחריו?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL:</b> JOIN בין Follows ל-Posts בזמן הקריאה:</p>
<pre data-lang="sql">DECLARE @me INT = 12;

SELECT TOP (20) p.postId, u.displayName, p.content, p.createdAt, p.likeCount
FROM Follows f
JOIN Posts p ON p.authorId = f.followeeId
JOIN Users u ON u.userId   = p.authorId
WHERE f.followerId = @me
ORDER BY p.createdAt DESC;</pre>
<p><b>MongoDB, Fan-out on read (pull):</b> מוצאים את מי שהמשתמש עוקב אחריהם, ושולפים את הפוסטים שלהם עם <code>$in</code>. האינדקס <code>{ "author.userId": 1, createdAt: -1 }</code> הופך את זה ליעיל:</p>
<pre data-lang="mongo">const followees = db.follows
  .find({ followerId: 12 }, { followeeId: 1, _id: 0 })
  .toArray()
  .map(f => f.followeeId)

db.posts.find({ "author.userId": { $in: followees } })
  .sort({ createdAt: -1 })
  .limit(20)</pre>
<p>אותו דבר בשאילתה אחת, עם aggregate:</p>
<pre data-lang="mongo">db.follows.aggregate([
  { $match: { followerId: 12 } },
  { $lookup: {
      from: "posts", localField: "followeeId",
      foreignField: "author.userId", as: "posts"
  } },
  { $unwind: "$posts" },
  { $replaceRoot: { newRoot: "$posts" } },
  { $sort: { createdAt: -1 } },
  { $limit: 20 }
])</pre>
<p><b>יתרון:</b> הפרסום זול, כי הפוסט נכתב פעם אחת. <b>חיסרון:</b> כל פתיחה של האפליקציה מריצה שאילתה על מאות נעקבים וממזגת את התוצאות. כשיש הרבה נעקבים והרבה צפיות, זה כבד. החלופה מופיעה בסעיף ז.</p>
</details>

<p class="arch-q">ז. מה היתרון של Feeds שמוכנים מראש, ומה עלות התחזוקה כשמשתמש מפרסם פוסט?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>Fan-out on write (push):</b> בזמן הפרסום, הפוסט נכתב מראש לפיד של <b>כל עוקב</b>. קריאת הפיד היא אז שליפה אחת של מסמך מוכן וממוין:</p>
<pre data-lang="mongo">// פרסום פוסט של משתמש 7, והפצה לפידים של העוקבים
const newPostId = db.posts.insertOne({
  author: { userId: 7, displayName: "Noa Levi" },
  text: "פוסט חדש",
  createdAt: new Date(),
  likeCount: 0,
  commentCount: 0
}).insertedId

db.follows.find({ followeeId: 7 }, { followerId: 1, _id: 0 }).forEach(f =>
  db.feeds.updateOne(
    { _id: f.followerId },                    // פיד אחד לכל משתמש
    { $push: { items: {
        $each: [ { postId: newPostId, authorId: 7, createdAt: new Date() } ],
        $sort: { createdAt: -1 },
        $slice: 500                           // שומרים רק 500 אחרונים, כדי שהמערך יישאר חסום
    } } },
    { upsert: true }
  )
)

// קריאת הפיד: מסמך אחד, 20 הפריטים הראשונים
db.feeds.findOne({ _id: 12 }, { items: { $slice: 20 } })</pre>
<table class="mini">
  <tr><th>יתרונות</th><th>עלויות</th></tr>
  <tr><td>קריאה מהירה מאוד: מסמך אחד לפי <code>_id</code>, כבר ממוין. ברשת חברתית יש הרבה יותר קריאות מכתיבות, ולכן זה משתלם</td><td><b>Write amplification:</b> פוסט של משתמש עם 10 מיליון עוקבים הוא 10 מיליון כתיבות</td></tr>
  <tr><td>העומס זז מרגע הצפייה לרגע הפרסום, ואפשר להריץ את ההפצה ברקע, בתור משימות</td><td><b>שכפול ואחסון:</b> אותו מזהה פוסט שמור באלפי פידים, כולל פידים של משתמשים שכבר לא נכנסים</td></tr>
  <tr><td>קל לדפדף ולהציג "ראשון חדש"</td><td><b>תחזוקה:</b> מחיקת פוסט, ביטול מעקב או חסימה מחייבים לנקות את כל הפידים. יש גם עיכוב עד שהפוסט מגיע לכולם</td></tr>
</table>
<div class="callout"><b>הפתרון של הרשתות הגדולות הוא היברידי:</b> לרוב המשתמשים מפיצים בכתיבה (push). אצל ידוענים, עם מיליוני עוקבים, לא מפיצים. את הפוסטים שלהם מושכים בזמן הקריאה (pull) וממזגים עם הפיד המוכן. כדי שהפיד לא יגדל בלי גבול, מגבילים אותו ל-500 פריטים (<code>$slice</code>), או שומרים אותו בדליים לפי תאריך (Bucket Pattern).</div>
</details>

<p class="arch-q">ח. משתמש משנה את שמו: לעדכן את כל הפוסטים? מה היתרון והחיסרון של displayName בתוך הפוסט?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL:</b> אין שאלה. השם נמצא רק ב-<code>Users</code>, וה-JOIN מציג תמיד את השם הנוכחי.</p>
<p><b>MongoDB:</b> כשהשם שמור בפוסטים (Extended Reference), <b>כן</b> צריך לעדכן כדי להציג את השם החדש. זה כולל את הפוסטים, את התגובות ואת התגובות המוטמעות בפוסטים של אחרים:</p>
<pre data-lang="mongo">db.users.updateOne({ _id: 7 }, { $set: { displayName: "Noa Levi-Cohen" } })
db.posts.updateMany({ "author.userId": 7 }, { $set: { "author.displayName": "Noa Levi-Cohen" } })
db.comments.updateMany({ "author.userId": 7 }, { $set: { "author.displayName": "Noa Levi-Cohen" } })
db.posts.updateMany(
  { "recentComments.userId": 7 },
  { $set: { "recentComments.$[c].displayName": "Noa Levi-Cohen" } },
  { arrayFilters: [ { "c.userId": 7 } ] }
)</pre>
<table class="mini">
  <tr><th>יתרון של displayName בפוסט</th><th>חיסרון</th></tr>
  <tr><td>הצגת פיד של 20 פוסטים לא דורשת <code>$lookup</code> ל-users. כל פוסט מוכן לתצוגה, וזה קריטי במערכת עם הרבה קריאות</td><td>שינוי שם הוא <code>updateMany</code> על אלפי פוסטים ותגובות. זה קורה לעיתים רחוקות ואפשר להריץ ברקע, אבל עד שהעדכון מסתיים מוצגים שני שמות</td></tr>
  <tr><td>הפוסט נשאר קריא גם אם שירות המשתמשים לא זמין</td><td>קל לשכוח עותק (למשל ב-<code>recentComments</code>), ואז נשארים שמות ישנים לתמיד</td></tr>
</table>
<p><b>מסקנה:</b> השם משתנה לעיתים רחוקות ונקרא כל הזמן, ולכן שכפול שלו משתלם, בתנאי שיש תהליך עדכון מסודר. החלופה היא לשמור רק <code>userId</code>, ובכל טעינת פיד לשלוף את שמות 20 הכותבים בשאילתה אחת: <code>db.users.find({ _id: { $in: ids } })</code>, בתוספת Cache.</p>
</details>

<p class="arch-q">ט. איך מוודאים שמשתמש לא יסמן לייק פעמיים? השוו בין ייחודיות ב-SQL לאינדקס ייחודי ב-MongoDB.</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>SQL:</b> <code>PRIMARY KEY (userId, postId)</code> (או <code>UNIQUE</code>). ה-INSERT השני נכשל עם שגיאה 2627, ולכן המונה לא עולה:</p>
<pre data-lang="sql">DECLARE @uid INT = 12, @pid BIGINT = 9001;

BEGIN TRY
  BEGIN TRANSACTION;
  INSERT INTO Likes (userId, postId) VALUES (@uid, @pid);       -- נכשל אם כבר קיים
  UPDATE Posts SET likeCount = likeCount + 1 WHERE postId = @pid;
  COMMIT TRANSACTION;
END TRY
BEGIN CATCH
  IF @@TRANCOUNT &gt; 0 ROLLBACK TRANSACTION;
  IF ERROR_NUMBER() NOT IN (2627, 2601) THROW;   -- כפילות היא לא תקלה: המשתמש פשוט כבר סימן לייק
END CATCH;</pre>
<p><b>MongoDB:</b> אינדקס ייחודי מורכב. ה-<code>insertOne</code> השני נכשל עם <code>E11000 duplicate key error</code>:</p>
<pre data-lang="mongo">db.likes.createIndex({ postId: 1, userId: 1 }, { unique: true })

try {
  db.likes.insertOne({ postId: 9001, userId: 12, createdAt: new Date() })
  db.posts.updateOne({ _id: 9001 }, { $inc: { likeCount: 1 } })   // רק אם ההכנסה הצליחה
} catch (e) {
  print("כבר סימנת לייק לפוסט הזה")
}</pre>
<table class="mini">
  <tr><th></th><th>SQL: UNIQUE / PRIMARY KEY</th><th>MongoDB: unique index</th></tr>
  <tr><td>איפה מוגדר</td><td>חלק מהגדרת הטבלה (DDL)</td><td>אינדקס שנוצר בנפרד (<code>createIndex</code>), גם בלי סכמה מחייבת</td></tr>
  <tr><td>אכיפה</td><td>אטומית, ע"י ה-DB, גם בו-זמנית</td><td>אטומית, ע"י ה-DB, גם בו-זמנית</td></tr>
  <tr><td>בדיקת קיום</td><td>יש FK: אי אפשר לסמן לייק לפוסט או למשתמש שלא קיימים</td><td><b>אין FK.</b> אפשר להכניס לייק ל-<code>postId</code> שלא קיים, ולכן הבדיקה נעשית באפליקציה</td></tr>
  <tr><td>נתונים קיימים</td><td><code>ALTER TABLE … ADD CONSTRAINT</code> נכשל אם כבר יש כפילויות</td><td>גם <code>createIndex</code> נכשל אם כבר יש כפילויות, ולכן יוצרים את האינדקס לפני שמתחילים לקבל נתונים</td></tr>
  <tr><td>שדה חסר / NULL</td><td>ב-SQL Server, עמודה עם UNIQUE מאפשרת NULL אחד בלבד</td><td>שדה חסר נחשב null, ושני מסמכים בלי השדה הם כפילות. הפתרון: <code>partialFilterExpression</code></td></tr>
  <tr><td>במערכת מבוזרת</td><td>בשרת אחד</td><td>ב-Collection מבוזר (Sharded), אינדקס ייחודי חייב להתחיל במפתח ה-Shard (Prefix)</td></tr>
</table>
<div class="callout warn">ה-<code>_id</code> האוטומטי לא עוזר כאן. כל ניסיון לייק מקבל <code>_id</code> חדש, ולכן שני לייקים של אותו משתמש הם שני מסמכים "חוקיים". הייחודיות צריכה להיות על <b>הצירוף העסקי</b> <code>{ postId, userId }</code>. אפשרות נוספת היא להגדיר את הצירוף עצמו כ-<code>_id</code>: <code>_id: { postId: 9001, userId: 12 }</code>. אז חייבים לכתוב את השדות תמיד באותו סדר, כי <code>{ userId: 12, postId: 9001 }</code> נחשב ערך אחר.</div>
</details>

<p class="arch-q">י. האם מספר הלייקים במסמך הפוסט צריך להיות הנתון היחיד שמוצג, או נתון מחושב? מה עלול להשתבש?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<p><b>להצגה משתמשים במונה</b> <code>likeCount</code> (Computed Pattern). אם סופרים מיליון מסמכים בכל טעינה של כל פוסט בפיד, <code>countDocuments</code> יחזור מיליוני פעמים בדקה. אבל <b>המונה הוא Cache, ולא מקור האמת.</b> המקור הוא <code>likes</code>.</p>
<p><b>מה עלול להשתבש:</b></p>
<ul>
  <li><b>כשל באמצע:</b> ה-<code>insertOne</code> ל-likes הצליח, אבל השרת נפל לפני ה-<code>$inc</code>, ולכן המונה נמוך מדי. או ההפך.</li>
  <li><b>ניסיון חוזר (Retry):</b> הלקוח שולח שוב, וה-<code>$inc</code> רץ פעמיים בלי לייק חדש.</li>
  <li><b>ביטול לייק או מחיקת משתמש</b> בלי <code>$inc: -1</code> תואם.</li>
  <li><b>עדכון בשתי פקודות נפרדות</b> (קריאה, +1, ואז <code>$set</code>) במקום <code>$inc</code> אטומי. כך הולכים לאיבוד לייקים כשהם מגיעים בו-זמנית (Lost update).</li>
</ul>
<p><b>איך מתמודדים:</b> מעדכנים תמיד עם <code>$inc</code> אטומי. כשהדיוק חשוב, מבצעים את שתי הפעולות בטרנזקציה. ומריצים מעת לעת תהליך תיקון (Reconciliation) שסופר מחדש מ-likes:</p>
<pre data-lang="mongo">// תיקון של פוסט אחד
const n = db.likes.countDocuments({ postId: 9001 })
db.posts.updateOne({ _id: 9001 }, { $set: { likeCount: n } })

// תיקון של כל הפוסטים בבת אחת (MongoDB 4.2 ומעלה)
// (פוסט שכל הלייקים שלו בוטלו לא מופיע כאן, ואותו מאפסים בנפרד)
db.likes.aggregate([
  { $group: { _id: "$postId", n: { $sum: 1 } } },
  { $merge: {
      into: "posts", on: "_id",
      whenMatched: [ { $set: { likeCount: "$$new.n" } } ],
      whenNotMatched: "discard"
  } }
])</pre>
<p>ב-SQL זה אותו רעיון: עמודת <code>likeCount</code> שמתעדכנת באותה טרנזקציה עם ה-INSERT (סעיף ט), ואימות מול <code>SELECT COUNT(*) FROM Likes WHERE postId = @pid</code>. גם קצת אי-דיוק מקובל בתצוגה ("1.2K"). בדוחות ובתשלום למפרסמים סופרים מהמקור.</p>
</details>

<p class="arch-q">יא. אילו חלקים ב-SQL, אילו ב-NoSQL, והאם יש יתרון לארכיטקטורה משולבת?</p>
<details class="arch-a"><summary>הצג תשובה</summary>
<table class="mini">
  <tr><th>חלק במערכת</th><th>איפה</th><th>למה</th></tr>
  <tr><td>חשבונות משתמשים, הרשמה, הרשאות, מייל ושם משתמש ייחודיים</td><td><b>SQL</b></td><td>ייחודיות ועקביות חזקה. מעט שינויים וחשיבות גבוהה</td></tr>
  <tr><td>תשלומים, פרסום, חיוב מפרסמים</td><td><b>SQL</b></td><td>כסף מחייב ACID וביקורת (Audit)</td></tr>
  <tr><td>פוסטים, תגובות, לייקים</td><td><b>NoSQL (MongoDB)</b></td><td>נפח עצום של כתיבות, מבנה גמיש (טקסט, תמונות, סקרים) והתרחבות לשרתים רבים (Sharding)</td></tr>
  <tr><td>Feeds, התראות</td><td><b>NoSQL</b> (ו-Cache כמו Redis)</td><td>מוכנים מראש, נקראים לפי מפתח, וקריאה מהירה מאוד</td></tr>
  <tr><td>גרף העוקבים, "אנשים שאולי אתם מכירים"</td><td>Collection של <code>follows</code>, או <b>Graph DB</b> (Neo4j)</td><td>שאילתות של "חבר של חבר" טבעיות בגרף</td></tr>
  <tr><td>תמונות</td><td><b>אחסון קבצים</b> (Object Storage / CDN)</td><td>קבצים גדולים לא נשמרים ב-DB. ב-DB נשמר רק ה-URL</td></tr>
  <tr><td>אנליטיקה ודוחות</td><td><b>Data Warehouse (SQL)</b></td><td>שאילתות אד-הוק ו-JOIN-ים על נתונים היסטוריים</td></tr>
</table>
<p><b>היתרון של השילוב:</b> כל חלק מקבל את הכלי שמתאים לו. מקבלים ACID היכן שזה חשוב, והתרחבות וגמישות היכן שהנפח עצום. <b>המחיר:</b> סנכרון בין המערכות (אירועים, Outbox, Change Streams), עקביות בסופו של דבר, אין טרנזקציה שחוצה את שני בסיסי הנתונים, ויותר תחזוקה ויותר ידע נדרש. לכן קובעים <b>מקור אחד לכל נתון</b>. למשל, <code>displayName</code> שייך ל-Users ב-SQL, וכל מקום אחר מחזיק עותק שמתעדכן מאירוע "שם שונה".</p>
</details>

<h4>סיכום: מה שמים איפה (בשלושת התרחישים)</h4>
<table class="mini">
  <tr><th>מאפיין של הנתון</th><th>נוטה ל-SQL</th><th>נוטה ל-MongoDB</th></tr>
  <tr><td>מבנה</td><td>קבוע ואחיד (הרשמה, תשלום)</td><td>משתנה ממסמך למסמך (150 מאפייני מוצר, סוגי פוסטים)</td></tr>
  <tr><td>קשרים</td><td>הרבה קשרים ושאילתות שלא ידועות מראש (דוחות)</td><td>נשלף תמיד כיחידה אחת (הזמנה עם פריטים, פוסט לתצוגה)</td></tr>
  <tr><td>עקביות</td><td>כסף, מלאי, ציונים רשמיים, ייחודיות עם FK</td><td>מונים, פידים ותצוגה, שבהם מותר איחור קטן</td></tr>
  <tr><td>היקף</td><td>בינוני, בשרת אחד חזק (Scale-up)</td><td>עצום, על שרתים רבים (Scale-out / Sharding)</td></tr>
  <tr><td>שינוי נתון משותף</td><td>UPDATE של שורה אחת</td><td><code>updateMany</code> על העותקים, או Reference ו-<code>$lookup</code></td></tr>
</table>
`);

/* ---------- הרכבת הפרק ---------- */
H.push('<h4>דגשים למבחן: שאלות תכנון</h4><div class="callout good"><ul>' +
  SQLC.archTips.map(function(t){ return '<li>' + t + '</li>'; }).join('') + '</ul></div>');

SQLC.chapters = (SQLC.chapters || []).concat([
  { id:'arch', track:'nosql', icon:'🏛️', title:'ארכיטקטורה: SQL מול NoSQL — תכנון מערכת', html: H.join('\n') }
]);

/* ============================================================
   בוחן אמריקאי — topic:'nosql-design' (טקסט רגיל, בלי HTML)
   ============================================================ */
var Q = [
  { q:'בתרחיש החנות: למה שומרים unitPrice בכל שורת הזמנה, במקום להסתמך על Products.price?',
    options:['כדי לחסוך JOIN לטבלת Products בכל שליפה של הזמנה','כי אסור לשמור מחיר בטבלת Products אחרי שהמוצר נמכר','כי ההזמנה מתעדת את המחיר ששולם בפועל ברגע הקנייה','כדי ששינוי מחיר במוצר יתעדכן אוטומטית בכל ההזמנות'], correct:2,
    explain:'Snapshot (חנות, סעיף ג): המחיר משתנה (מבצעים, קופונים), אבל חשבונית, דוח הכנסות והחזר כספי חייבים להתבסס על המחיר ששולם. זו לא כפילות, כי זו עובדה אחרת: המחיר ברגע מסוים. לכן לא מעדכנים אותו כשהמחיר במוצר משתנה.' },

  { q:'למוצר יש 150 מאפיינים אפשריים, אבל רק 8 רלוונטיים. איזה ייצוג ב-MongoDB מאפשר לחפש לפי כל מאפיין עם אינדקס אחד?',
    options:['מערך attributes של זוגות { k, v } עם אינדקס מורכב','מסמך עם 150 שדות קבועים, שרובם מכילים null','Collection נפרד לכל אחד מ-150 המאפיינים','מחרוזת טקסט אחת שמכילה את כל המאפיינים'], correct:0,
    explain:'Attribute Pattern (חנות, סעיף ה): כל מסמך מכיל רק את המאפיינים שלו, כזוגות { k, v }, ואינדקס אחד על attributes.k ו-attributes.v מכסה את כולם. מחפשים עם $elemMatch, כדי ש-k ו-v יתאימו לאותו זוג.' },

  { q:'שתי הזמנות מגיעות בו-זמנית ליחידה האחרונה במלאי. איזו פקודה ב-MongoDB מונעת מכירה כפולה?',
    options:['קריאה עם findOne, בדיקה ב-JavaScript ש-stock > 0, ואז updateOne עם $inc','db.products.updateOne({ _id: 501, stock: { $gte: 1 } }, { $inc: { stock: -1 } })','db.products.updateOne({ _id: 501 }, { $inc: { stock: -1 } }, { upsert: true })','db.products.updateMany({ stock: { $gte: 1 } }, { $set: { stock: 0 } })'], correct:1,
    explain:'עדכון של מסמך יחיד הוא אטומי: התנאי stock >= 1 וה-$inc מתבצעים יחד, ולכן רק עדכון אחד מצליח. את התוצאה בודקים ב-modifiedCount. קריאה ואחריה עדכון בשתי פקודות משאירה "חלון" שבו שני התהליכים רואים 1 (Race condition).' },

  { q:'ב-SQL Server, איזו דרך מונעת משתי טרנזקציות למכור את היחידה האחרונה?',
    options:['קריאת stock ב-SELECT, ואם הוא גדול מ-0, UPDATE בפקודה נפרדת','הוספת אינדקס על עמודת stock, כדי שהבדיקה תהיה מהירה יותר','שינוי stock ל-NULL ברגע שהמלאי מגיע ל-0','UPDATE עם התנאי stock > 0, ובדיקת @@ROWCOUNT'], correct:3,
    explain:'UPDATE … SET stock = stock - 1 WHERE productId = @p AND stock > 0 לוקח נעילת שורה עד ה-COMMIT. הטרנזקציה השנייה מחכה, ואז מוצאת 0 ומעדכנת 0 שורות. @@ROWCOUNT = 0 מסמן שהמלאי אזל, ואז מבצעים ROLLBACK (חנות, סעיף ו).' },

  { q:'ברשת החברתית: מדוע לא כדאי בהכרח להטמיע את כל העוקבים בתוך מסמך המשתמש?',
    options:['כי MongoDB לא מאפשר לשמור ObjectId בתוך מערך במסמך','המערך לא חסום, ומסמך הידוען הופך לענק ו"חם"','כי אי אפשר לבנות אינדקס על שדה שמכיל מערך','כי קשר עוקב-נעקב חייב להישמר בבסיס נתונים של גרפים'], correct:1,
    explain:'רשת, סעיף ד: לידוען יש מיליוני עוקבים, וכ-800 אלף מזהים כבר מגיעים ל-16MB. בנוסף, כל מעקב כותב לאותו מסמך, וכל טעינה של הפרופיל מושכת את כל הרשימה. הפתרון: Collection בשם follows, ומונים במסמך המשתמש. אינדקס על מערך דווקא קיים (Multikey).' },

  { q:'לפוסט יש מיליון לייקים. איזה מבנה מתאים?',
    options:['מערך likes בתוך מסמך הפוסט, עם userId של כל אחד מהממליצים','שדה likeCount בלבד, בלי לשמור בכלל מי סימן לייק לפוסט','Collection בשם likes, ומונה likeCount במסמך הפוסט','מסמך יחיד שמרכז את כל הלייקים של כל הפוסטים באתר'], correct:2,
    explain:'רשת, סעיפים ה ו-י: מערך של מיליון מזהים חורג מ-16MB ויוצר מסמך "חם". Collection של likes (מסמך לכל לייק, עם אינדקס ייחודי על { postId, userId }) שומר מי סימן לייק ומונע כפילות. המונה במסמך הפוסט משמש להצגה מהירה.' },

  { q:'מה המשמעות של Fan-out on write ברשת חברתית?',
    options:['בזמן הפרסום, הפוסט נכתב מראש לפיד של כל עוקב','בזמן קריאת הפיד, שולפים את הפוסטים של כל הנעקבים','שכפול של בסיס הנתונים לכמה שרתים, לצורך גיבוי','מחיקה של פוסטים ישנים מהפיד אחרי 30 יום'], correct:0,
    explain:'Push / Fan-out on write (רשת, סעיף ז): העבודה נעשית בזמן הכתיבה, כדי שהקריאה תהיה שליפה אחת של פיד מוכן. Fan-out on read (pull) הוא ההפך: שולפים ומאחדים בזמן הצפייה.' },

  { q:'מה העלות העיקרית של פיד מחושב מראש, כשידוען עם 10 מיליון עוקבים מפרסם פוסט?',
    options:['קריאת הפיד אצל כל העוקבים הופכת לאיטית יותר','אי אפשר יותר למיין את הפיד לפי תאריך הפרסום','הפוסט לא נשמר ב-posts, אלא רק בתוך הפידים','מיליוני כתיבות לפידים בשביל פוסט אחד'], correct:3,
    explain:'Write amplification: פוסט אחד הופך ל-10 מיליון עדכונים של פידים. לכן רשתות גדולות משלבות: הפצה בכתיבה לרוב המשתמשים, ומשיכה בזמן הקריאה לפוסטים של ידוענים (רשת, סעיף ז).' },

  { q:'שם התצוגה (displayName) של משתמש שמור גם בתוך הפוסטים שלו. המשתמש שינה את שמו. מה נכון?',
    options:['אין צורך לעשות דבר, כי MongoDB מעדכן את כל העותקים אוטומטית','צריך updateMany על הפוסטים שלו, כי השם שמור בהם כעותק','צריך למחוק את כל הפוסטים של המשתמש וליצור אותם מחדש','אי אפשר לשנות את השדה displayName אחרי שנוצר פוסט'], correct:1,
    explain:'Extended Reference (רשת, סעיף ח): העותק חוסך $lookup בכל טעינת פיד, אבל שינוי שם מחייב updateMany על הפוסטים ועל התגובות (וגם arrayFilters בתגובות המוטמעות). שינוי שם נדיר ונקרא הרבה, ולכן זה מחיר סביר. ב-SQL יש JOIN, ואין צורך לעדכן.' },

  { q:'איך מבטיחים ב-MongoDB שמשתמש לא יסמן לייק לאותו פוסט פעמיים?',
    options:['בדיקה בצד הלקוח (בדפדפן) לפני שליחת הלייק לשרת','שדה _id אוטומטי לכל לייק, שמבטיח שאין כפילות','אינדקס ייחודי מורכב על { postId, userId } ב-likes','עדכון likeCount עם $inc רק אחרי שהמשתמש אישר'], correct:2,
    explain:'db.likes.createIndex({ postId: 1, userId: 1 }, { unique: true }). ההכנסה השנייה נכשלת עם E11000 (רשת, סעיף ט). ה-_id האוטומטי לא עוזר, כי כל ניסיון מקבל _id חדש. ובדיקה בדפדפן לא מגינה מבקשות בו-זמניות.' },

  { q:'מה המקבילה ב-SQL Server לאינדקס הייחודי על { postId, userId } בטבלת Likes?',
    options:['FOREIGN KEY (postId) REFERENCES Posts(postId)','CHECK (userId <> postId) ברמת הטבלה','DEFAULT SYSDATETIME() על העמודה likedAt','UNIQUE (userId, postId)'], correct:3,
    explain:'PRIMARY KEY (userId, postId) או UNIQUE (userId, postId). INSERT כפול נכשל עם שגיאה 2627. ב-SQL יש בנוסף FK שמוודא שהמשתמש והפוסט קיימים. במונגו אין FK (רשת, סעיף ט).' },

  { q:'המונה likeCount נשמר במסמך הפוסט ומתעדכן ב-$inc. מה עלול להשתבש?',
    options:['המונה עלול לסטות מספירת המסמכים ב-likes','שום דבר, כי MongoDB מחשב את המונה מחדש בכל שליפה','אי אפשר להציג את המונה בלי לבצע $lookup ל-likes','שמירת מספר בתוך מסמך מאטה מאוד את קריאת הפוסט'], correct:0,
    explain:'Computed Pattern (רשת, סעיף י): המונה הוא Cache. הוא יכול לסטות אם הלייק נשמר וה-$inc נכשל, אם יש ניסיון חוזר, או אם ביטול לייק לא הוריד אותו. המקור הוא likes, ולכן מתקנים מעת לעת עם countDocuments, או מעדכנים בטרנזקציה.' },

  { q:'בפתרון המרצה למכללה נכתב: $group: { Id: "$id", AverageGrade: { $avg: … } }. מה השגיאה העיקרית?',
    options:['חובה להוסיף $match לפני כל שלב $group','האופרטור $avg לא קיים בתוך שלב $group','המפתח חייב להיות _id ולא Id','צריך לכתוב "$group" בתוך מירכאות כפולות'], correct:2,
    explain:'ב-$group שדה הקיבוץ נקרא תמיד _id, וכל שדה אחר חייב להיות אופרטור צבירה ($avg, $sum…). לכן Id: "$id" זורק שגיאה. בנוסף, כשההרשמות במערך צריך $unwind לפני $group (מכללה, סעיף ד).' },

  { q:'באותו פתרון נכתב: AverageGrade: { $avg: "enrollments.grade" }. מה הבעיה בביטוי?',
    options:['שם השדה צריך להיות Grade באות גדולה, כמו ב-SQL','בלי $ זו מחרוזת קבועה, ולא הפניה לשדה','$avg מקבל רק מערך של מספרים, לא שם של שדה','צריך לכתוב AVG באותיות גדולות'], correct:1,
    explain:'בתוך ביטוי, "$enrollments.grade" (עם דולר) הוא ערך השדה. "enrollments.grade" בלי דולר הוא טקסט קבוע, ולכן הממוצע יוצא null. שמות שדות רגישים לאותיות, כך ש-Grade הוא שדה אחר (מכללה, סעיף ד).' },

  { q:'במכללה, שם הקורס מוטמע בכל מסמך של סטודנט שלמד אותו. מה ההבדל בין SQL ל-MongoDB כששם הקורס משתנה?',
    options:['אין הבדל, כי בשניהם מעדכנים רשומה אחת בלבד','ב-SQL צריך לעדכן כל הרשמה, ובמונגו רק מסמך קורס אחד','בשניהם צריך למחוק את הקורס ולהכניס אותו מחדש','ב-SQL שורה אחת, ובמונגו updateMany על מסמכים רבים'], correct:3,
    explain:'מכללה, סעיף ג: ב-SQL השם נמצא רק ב-Courses, כך ש-UPDATE של שורה אחת וכל ה-JOIN-ים מציגים את השם החדש. במונגו כל עותק מתעדכן: updateMany עם arrayFilters על "courses.$[c].name". זו אנומליית העדכון שהשכפול יוצר.' },

  { q:'סטודנט למד 200 קורסים, וכל הרשמה (כ-150 בתים) מוטמעת במסמך שלו. מה נכון?',
    options:['זה כ-30KB בלבד. השיקול הוא עדכונים ושאילתות מצד הקורס','המסמך יחרוג ממגבלת 16MB, ולכן ההכנסה תיכשל','MongoDB מגביל כל מערך במסמך ל-100 איברים לכל היותר','אין שום חיסרון להטמעה, כי המערך חסום'], correct:0,
    explain:'200 × 150 בתים ≈ 30KB, רחוק מ-16MB. ההחלטה נגזרת מדפוסי השימוש: מרצים רבים מעדכנים ציונים באותו מסמך, ושאילתות כמו "כל הנרשמים לקורס X" דורשות אינדקס Multikey, $unwind ו-$match נוסף. לכן מומלץ Collection בשם enrollments (מכללה, סעיף ה).' },

  { q:'דוח של כל הסטודנטים שקיבלו מעל 90 בקורס מסוים. איזה מבנה ב-MongoDB הכי מקל על השליפה?',
    options:['מערך enrollments בתוך כל מסמך סטודנט, בלי אינדקס נוסף','מסמך יחיד לכל קורס, שמכיל את כל הציונים מכל השנים','Collection נפרד enrollments, עם אינדקס על courseId ו-grade','שמירת הציונים רק בתוך ExamResult, בלי שדה grade בהרשמה'], correct:2,
    explain:'מכללה, סעיף ו: כש-courseId ו-grade נמצאים באותו מסמך קטן, הדוח הוא find({ courseId: 39839, grade: { $gt: 90 } }), עם אינדקס { courseId: 1, grade: -1 }. כשההרשמות במערך צריך $elemMatch, $unwind ו-$match נוסף.' },

  { q:'במודל המתוקן של המכללה, תוצאות הבחינה (examResults) מוטמעות בתוך מסמך ההרשמה. למה?',
    options:['כי תוצאת בחינה היא ישות עצמאית, שנשלפת תמיד לבד','כי יש 2–3 מועדים בלבד, והם נקראים יחד עם הציון','כי MongoDB לא מאפשר Collection נוסף בשם examResults','כדי שכל ציוני הבחינה של כל הקורס יהיו במסמך אחד'], correct:1,
    explain:'Embedding מתאים למערך חסום וקטן, שנקרא יחד עם ההורה. לכל סטודנט בפתיחה יש מועד א\', מועד ב\' ואולי בוחן, ואלה מוצגים יחד עם הציון הסופי. כך שתי טבלאות SQL (Exams, ExamResults) נכנסות לתוך Collections קיימים.' },

  { q:'מה זה Extended Reference?',
    options:['העתקה מלאה של כל המסמך המקושר לתוך ההורה','הפניה שמכילה רק _id, בלי שום שדה נוסף','_id, ועוד כמה שדות לתצוגה, כמו שם','אינדקס מיוחד שנבנה על שדה של הפניה'], correct:2,
    explain:'שומרים את המזהה ועוד 2–3 שדות שמוצגים תמיד, למשל author: { userId, displayName } בפוסט, או customer: { customerId, name } בהזמנה. זה חוסך $lookup בכל קריאה, והמחיר הוא עדכון העותקים כשהם משתנים.' },

  { q:'בחנות, ב-SQL בחרו בטבלת ProductAttributes(productId, attrName, attrValue). מה החיסרון העיקרי?',
    options:['אין טיפוסים (הכול טקסט), והשאילתות מסורבלות','כל מאפיין חדש מחייב ALTER TABLE על טבלת המוצרים','הטבלה מכילה 150 עמודות שרובן ריקות (NULL)','אין דרך לקשר בין מאפיין למוצר שהוא שייך אליו'], correct:0,
    explain:'EAV גמיש: שורה רק לכל מאפיין שקיים, בלי ALTER. אבל attrValue הוא טקסט (צריך TRY_CAST), אי אפשר להגדיר CHECK לפי סוג המאפיין, וחיפוש לפי כמה מאפיינים דורש כמה JOIN-ים או PIVOT. 150 עמודות NULL הן הבעיה של הטבלה הרחבה, לא של EAV.' },

  { q:'למה לא לשמור במונגו כל אחד מ-150 המאפיינים כשדה נפרד, עם אינדקס לכל אחד?',
    options:['כי MongoDB לא מאפשר מסמכים עם שדות שונים זה מזה','כי אפשר לבנות אינדקס רק על השדה _id של המסמך','כי יש מגבלה של 64 אינדקסים ל-Collection','כי אי אפשר לאנדקס שדות שמכילים ערכים מספריים'], correct:2,
    explain:'לכל Collection יש עד 64 אינדקסים, ובכל מקרה כל אינדקס מאט את הכתיבה. Attribute Pattern ({ k, v } ואינדקס מורכב אחד) או Wildcard Index ("specs.$**") פותרים את זה (חנות, סעיף ה).' },

  { q:'מתי עדיף לשמור את פריטי ההזמנה ב-Collection נפרד, ולא בתוך מסמך ההזמנה?',
    options:['כשלכל הזמנה יש 2–5 פריטים שלא משתנים אחרי הקנייה','כשיש אלפי שורות, או לכל פריט משלוח והחזרה משלו','כשרוצים לשלוף הזמנה שלמה עם כל הפריטים בקריאה אחת','כשרוצים שיצירת ההזמנה תהיה אטומית בלי טרנזקציה'], correct:1,
    explain:'חנות, סעיף ד: הטמעה מתאימה כשהפריטים חסומים, שייכים רק להזמנה, ונקראים ונכתבים יחד. כשיש הזמנות ענק (B2B), או כשלפריט יש מחזור חיים משלו (Marketplace, החזרות), עדיף Collection נפרד.' },

  { q:'מה היתרון של הטמעת items במסמך ההזמנה מבחינת עקביות?',
    options:['אפשר לעדכן מחיר של מוצר בכל ההזמנות בבת אחת','כל פריט במערך מקבל _id ייחודי באופן אוטומטי','MongoDB בודק שכל productId באמת קיים ב-products','insertOne אחד אטומי, בלי טרנזקציה'], correct:3,
    explain:'פעולה על מסמך יחיד היא אטומית: ההזמנה נוצרת עם כל השורות, או שלא נוצרת בכלל. ב-SQL אותו דבר דורש טרנזקציה שמכניסה ל-Orders ול-OrderItems. MongoDB לא בודק FK, ופריטים במערך לא מקבלים _id אוטומטי.' },

  { q:'איזה מודל מתאים לעמוד מוצר שמקבל מיליוני קריאות?',
    options:['מסמך מוצר אחד, עם כל מה שהעמוד מציג','שאילתת JOIN על 6 טבלאות מנורמלות בכל טעינת עמוד','טבלת EAV אחת שמכילה את כל נתוני המוצרים באתר','מחסן נתונים (Data Warehouse) שמתעדכן פעם ביום'], correct:0,
    explain:'חנות, סעיף ט: כל הנתונים לתצוגה נמצאים במסמך אחד (מאפיינים, דירוג מחושב, ביקורות אחרונות), שנשלף לפי _id בלי JOIN. קל לשכפל אותו לשרתי קריאה ולשים מעליו Cache. JOIN של 6 טבלאות מיליוני פעמים הוא בזבוז.' },

  { q:'איזה מודל נוח יותר לניתוח פיננסי מורכב (רווח לפי קטגוריה, אזור ורבעון)?',
    options:['MongoDB, עם מסמכי מוצר שמכילים הכול','מטמון מפתח-ערך (Redis) שמחזיק את ההזמנות','SQL רלציוני: JOIN, ACID ו-GROUP BY','פיד מחושב מראש לכל מנהל כספים'], correct:2,
    explain:'מודל מנורמל מאפשר לשאול שאלות שלא ידועות מראש, עם JOIN-ים חופשיים, GROUP BY ופונקציות חלון. יש בו דיוק כספי (DECIMAL), אילוצים וטרנזקציות, והוא מתחבר לכלי BI ול-Data Warehouse (חנות, סעיף ט).' },

  { q:'מה המחיר העיקרי של ארכיטקטורה משולבת (SQL + MongoDB)?',
    options:['אי אפשר להשתמש יותר ב-JOIN באף אחד מהחלקים','סנכרון בין המערכות ותחזוקה כפולה','כל הנתונים חייבים להישמר פעמיים, בשתי המערכות','אסור ששני בסיסי הנתונים ירוצו באותו שרת'], correct:1,
    explain:'Polyglot persistence (חנות ט, רשת יא): כל חלק מקבל את הכלי שמתאים לו. המחיר: סנכרון באירועים או ב-ETL, עקביות בסופו של דבר, אין טרנזקציה שחוצה את שני בסיסי הנתונים, ושתי טכנולוגיות לתחזק. לכן לכל נתון צריך להגדיר מקור אחד.' },

  { q:'במכללה, שני סטודנטים נרשמים בו-זמנית למקום האחרון בקורס. למה ה-_id הייחודי של כל מסמך לא מספיק?',
    options:['כי _id נוצר רק אם כותבים אותו במפורש בהכנסה','כי ערכי _id אינם ייחודיים בתוך אותו Collection','כי _id מונע רק הרשמה כפולה של אותו הסטודנט','כי _id חדש לא בודק אם נשארו מקומות פנויים'], correct:3,
    explain:'כל ניסיון הרשמה מקבל _id חדש, ולכן שתי ההרשמות "חוקיות". _id לא בודק קיבולת, וגם לא מונע הרשמה כפולה של אותו סטודנט. צריך updateOne עם התנאי seatsLeft > 0 ו-$inc: -1, אינדקס ייחודי על { studentId, offeringId }, או טרנזקציה (מכללה, סעיף ז).' },

  { q:'מתי צריך טרנזקציה מרובת מסמכים ב-MongoDB?',
    options:['כששינוי חייב לגעת בכמה מסמכים, הכול או כלום','בכל updateOne, כי עדכון של מסמך יחיד אינו אטומי','כשמעדכנים כמה שדות שונים באותו מסמך בבת אחת','אף פעם, כי ב-MongoDB אין תמיכה בטרנזקציות'], correct:0,
    explain:'פעולה על מסמך יחיד, כולל כמה שדות ומערכים מוטמעים, היא אטומית בלי טרנזקציה. כשצריך להוריד מלאי בכמה מוצרים וליצור הזמנה, או לתפוס מקום וליצור הרשמה, משתמשים ב-session.startTransaction(), ואחריו commitTransaction או abortTransaction. טרנזקציות כאלה נתמכות מגרסה 4.0, ב-Replica Set.' },

  { q:'מה זה Bucket Pattern?',
    options:['אינדקס מיוחד על שדה תאריך, לשליפה מהירה','מחיקה אוטומטית של מסמכים ישנים (TTL)','קיבוץ פריטים רבים למסמך אחד לפי טווח','פיזור מסמכים בין כמה שרתים (Sharding)'], correct:2,
    explain:'במקום מסמך לכל פריט קטן (פריט פיד, מדידה, הודעה), מקבצים אותם למסמך "דלי" לפי טווח זמן או לפי כמות, למשל 200 בדלי. כך יש פחות מסמכים, האינדקס קטן יותר, וכל מערך נשאר חסום.' },

  { q:'בגישת Fan-out on read, איך נבנה הפיד של משתמש 12?',
    options:['קוראים את מסמך ה-feeds שחושב מראש עבור משתמש 12','מוצאים את הנעקבים ב-follows, ואז posts עם $in, ממוין לפי תאריך','סורקים את כל ה-posts באתר וממיינים לפי תאריך','שומרים את כל הפיד כמערך בתוך מסמך המשתמש'], correct:1,
    explain:'Pull (רשת, סעיף ו): בזמן הצפייה שולפים את רשימת הנעקבים, ואז db.posts.find({ "author.userId": { $in: followees } }).sort({ createdAt: -1 }).limit(20), עם אינדקס { "author.userId": 1, createdAt: -1 }. מסמך feeds מוכן שייך לגישת ה-push.' },

  { q:'איך נקראת הבעיה שבה שם קורס שמור בכמה מקומות, ואחרי שינוי חלק מהעותקים נשארים עם השם הישן?',
    options:['אובדן עדכון (Lost update) בין שתי טרנזקציות','קיפאון (Deadlock) בין שני תהליכים','אנומליית עדכון (Update anomaly)','קריאת רפאים (Phantom read)'], correct:2,
    explain:'אנומליית עדכון היא תוצאה של שכפול: אותה עובדה שמורה בכמה מקומות, ולא כולם עודכנו. ב-SQL נרמול מונע אותה. במונגו בוחרים לשכפל רק שדות שכמעט לא משתנים, ומעדכנים את כל העותקים עם updateMany. Lost update הוא בעיית מקביליות, לא בעיית שכפול.' },

  { q:'בחנות: למה לא תמיד נכון לשמור את כל נתוני התשלום והמשלוח בתוך מסמך ההזמנה?',
    options:['כי MongoDB לא מאפשר מסמך מקונן בתוך מסמך אחר','כי אי אפשר לעדכן כמה שדות במסמך אחד באופן אטומי','כי אסור לשמור את שדה הסטטוס כמחרוזת טקסט','תשלומים חלקיים ומשלוחים מפוצלים מנפחים את המסמך'], correct:3,
    explain:'חנות, סעיף ח: תשלום אחד ומשלוח אחד בתוך ההזמנה מאפשרים updateOne אטומי לכל הסטטוסים. אבל תשלומים חלקיים, החזרים, משלוחים מפוצלים ואירועי מעקב הם רשימות שגדלות, וכמה מערכות כותבות לאותו מסמך. לכן שומרים בהזמנה רק סטטוס נוכחי, ואת הפרטים ב-Collections נפרדים.' }
];

SQLC.quiz = (SQLC.quiz || []).concat(Q.map(function(x){
  return { topic:'nosql-design', q: bidi(x.q), options: x.options.map(bidi), correct: x.correct, explain: bidi(x.explain) };
}));

/* ============================================================
   כרטיסיות
   ============================================================ */
var FC = [
  { front:'למה שומרים unitPrice בשורת ההזמנה?', back:'זה Snapshot: המחיר ששולם ברגע הקנייה. המחיר במוצר משתנה, אבל חשבונית, דוח הכנסות והחזר כספי מתבססים על המחיר ששולם. זו לא כפילות, כי זו עובדה אחרת, ולכן לא מעדכנים אותה.' },
  { front:'מה זה Extended Reference?', back:'הפניה עם _id ועוד כמה שדות שמוצגים תמיד, כמו author: { userId, displayName }. היא חוסכת $lookup, והמחיר הוא updateMany כשהשדות המשוכפלים משתנים.' },
  { front:'מה זה Attribute Pattern?', back:'מאפיינים משתנים נשמרים כמערך של זוגות: attributes: [ { k: "ram_gb", v: 16 } ]. אינדקס אחד על attributes.k ו-attributes.v מכסה את כל המאפיינים, ומחפשים עם $elemMatch.' },
  { front:'150 מאפיינים, 8 רלוונטיים: מה האפשרויות ב-SQL?', back:'טבלה רחבה (הרבה NULL ו-ALTER לכל מאפיין), טבלת EAV (גמיש אבל הכול טקסט ו-JOIN-ים רבים), טבלה לכל סוג מוצר, או עמודת JSON עם ISJSON ו-JSON_VALUE.' },
  { front:'Fan-out on write מול Fan-out on read?', back:'Write (push): בזמן הפרסום כותבים לפיד של כל עוקב. הקריאה מהירה, אבל לידוען יש מיליוני כתיבות. Read (pull): בזמן הצפייה, follows ואז posts עם $in. הפרסום זול והקריאה כבדה. בפועל משלבים את שתי הגישות.' },
  { front:'מה זה Bucket Pattern?', back:'קיבוץ של הרבה פריטים קטנים (פריטי פיד, מדידות) למסמך "דלי" לפי טווח זמן או כמות. כך יש פחות מסמכים, אינדקס קטן יותר ומערך חסום.' },
  { front:'מונה שמור (likeCount) מול ספירה בזמן אמת?', back:'המונה הוא Cache לקריאה מהירה (Computed Pattern), ומתעדכן רק עם $inc אטומי. המקור הוא Collection של likes. המונה יכול לסטות בגלל כשל באמצע או ניסיון חוזר, ולכן מתקנים מעת לעת עם countDocuments.' },
  { front:'למה לא להטמיע עוקבים או לייקים במערך?', back:'זה מערך לא חסום: אצל ידוען הוא מגיע ל-16MB, הוא יוצר מסמך "חם" שכל הכותבים מתחרים עליו, והקריאה כבדה. הפתרון: Collection נפרד (follows / likes) עם אינדקסים, ומונים במסמך.' },
  { front:'איך מונעים מכירת יתר ב-SQL?', back:'בטרנזקציה: UPDATE Products SET stock = stock - @q WHERE productId = @p AND stock >= @q. אם @@ROWCOUNT = 0, עושים ROLLBACK. ה-UPDATE נועל את השורה, ו-CHECK (stock >= 0) הוא רשת ביטחון.' },
  { front:'איך מונעים מכירת יתר ב-MongoDB?', back:'db.products.updateOne({ _id: 501, stock: { $gte: 1 } }, { $inc: { stock: -1 } }). עדכון של מסמך יחיד הוא אטומי. אם modifiedCount === 0, המלאי אזל. לכמה מוצרים משתמשים בטרנזקציה.' },
  { front:'ייחודיות: SQL מול MongoDB?', back:'ב-SQL: UNIQUE או PRIMARY KEY (userId, postId) בתוך ה-DDL, בנוסף ל-FK. במונגו: createIndex({ postId: 1, userId: 1 }, { unique: true }), והכפילות נכשלת עם E11000. אין FK, וה-_id האוטומטי לא מונע כפילות עסקית.' },
  { front:'טרנזקציה ב-MongoDB: איך כותבים?', back:'const s = db.getMongo().startSession(); s.startTransaction(); עובדים דרך s.getDatabase("shop"); ואז s.commitTransaction(). בשגיאה: s.abortTransaction(). בסוף: s.endSession().' },
  { front:'מה זה Polyglot Persistence?', back:'ארכיטקטורה משולבת: SQL לכסף, לזהויות ולדוחות (ACID), ו-MongoDB לקטלוג, לתוכן ולפידים (קריאות רבות, גמישות, Scale-out). המחיר: סנכרון, עקביות בסופו של דבר וצורך במקור אחד לכל נתון.' },
  { front:'שם קורס משתנה: SQL מול NoSQL?', back:'ב-SQL: UPDATE לשורה אחת ב-Courses. במונגו: כל עותק, כלומר updateMany על ההרשמות ו-arrayFilters על מערכים מוטמעים. אם השם צריך להישאר כפי שהיה בזמן הלימוד, העותק הוא Snapshot ולא מעדכנים אותו.' },
  { front:'200 הרשמות של סטודנט: להטמיע?', back:'זה כ-30KB, רחוק מ-16MB, ולכן טכנית אפשרי. אבל מרצים רבים כותבים לאותו מסמך, ושאילתות מצד הקורס דורשות $unwind. לכן מומלץ Collection בשם enrollments, ואולי Subset של הסמסטר הנוכחי בתוך הסטודנט.' },
  { front:'מה התיקון ל-$group של המרצה?', back:'{ $unwind: "$enrollments" }, ואז { $group: { _id: "$_id", avgGrade: { $avg: "$enrollments.grade" } } }. הקיבוץ הוא לפי _id ולא Id, יש $ לפני שם השדה, וכותבים db באות קטנה.' },
  { front:'דפוס קריאה מול דפוס כתיבה: איך זה משפיע על התכנון?', back:'כשיש הרבה קריאות: משכפלים ומחשבים מראש (Extended Reference, פיד מוכן, מונים). כשיש הרבה כתיבות: מסמכים קטנים ונפרדים, בלי מסמך "חם" ובלי לשכפל נתון שמשתנה הרבה.' }
];
SQLC.flashcards = (SQLC.flashcards || []).concat(FC.map(function(c){
  return { track:'nosql', front: bidi(c.front), back: bidi(c.back) };
}));

})();
