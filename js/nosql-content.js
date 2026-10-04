/* ============================================================
   קורס 3964 — NoSQL / MongoDB — תוכן לימודי
   פרקים (track:'nosql') · דף תחביר MongoDB · מילון SQL↔MongoDB · כרטיסיות · דגשים
   כל הדוגמאות רצות על college2 (המכללה של "עבודת ישור קו") — הפלטים המוצגים
   הם פלטים אמיתיים מהרצה במנועי האתר (MongoSim / SQLite אחרי המרת T-SQL).
   קובץ זה נטען אחרי sql-content.js.
   ============================================================ */
window.SQLC = window.SQLC || {};

/* ---------- פרקי סיכום NoSQL ---------- */
SQLC.chapters = (SQLC.chapters || []).concat([
  {
    id:'nosql-intro', track:'nosql', icon:'🍃', title:'מבוא ל-NoSQL ול-MongoDB',
    html:`
<p><b>NoSQL</b> (<i>Not only SQL</i>) הוא שם כולל לבסיסי נתונים שאינם בנויים על המודל הרלציוני: אין בהם טבלאות עם סכמה קבועה, והם לא מתוכננים סביב JOIN-ים בין טבלאות מנורמלות (ב-MongoDB יש <code>$lookup</code>, אבל משתמשים בו במשורה). הנתונים נשמרים במבנה שמתאים לאופן שבו האפליקציה קוראת אותם, למשל מסמכים, זוגות מפתח-ערך, עמודות או גרפים. היתרונות: <b>גמישות במבנה</b>, עבודה עם <b>כמויות נתונים עצומות</b>, ו<b>התרחבות קלה</b> לשרתים רבים.</p>

<h4>למה צריך NoSQL? (איפה SQL מתקשה)</h4>
<ul>
  <li><b>סכמה נוקשה.</b> ב-SQL כל שורה חייבת להתאים למבנה הטבלה, וכל שינוי במבנה דורש <code>ALTER TABLE</code>.</li>
  <li><b>נתונים לא אחידים.</b> במוצרים, בפרופילים ובלוגים לכל רשומה יש שדות אחרים. ב-SQL זה נגמר בהרבה NULL או בהרבה טבלאות.</li>
  <li><b>היקף ועומס.</b> כשיש מיליוני משתמשים במקביל, קל יותר להוסיף שרתים (Scale-out) מאשר לחזק שרת אחד.</li>
  <li><b>JOIN-ים יקרים.</b> במודל מסמכים, מה שנקרא יחד נשמר יחד. אובייקט שלם (קורס עם השיעורים שלו) נשלף בקריאה אחת.</li>
</ul>

<h4>4 המשפחות של NoSQL</h4>
<table class="mini">
  <tr><th>סוג</th><th>איך הנתונים נשמרים</th><th>דוגמאות</th><th>מתאים ל-</th></tr>
  <tr><td><b>מסמכים</b> (Document)</td><td>מסמכי JSON/BSON בתוך Collections. לכל מסמך יכול להיות מבנה משלו</td><td dir="ltr">MongoDB, CouchDB</td><td>קטלוג מוצרים, ניהול תוכן, אפליקציות web ומובייל, מערכת מכללה</td></tr>
  <tr><td><b>מפתח-ערך</b> (Key-Value)</td><td>"מילון" ענק: מפתח ייחודי ← ערך. ה-DB לא מתעניין במבנה הערך</td><td dir="ltr">Redis, Amazon DynamoDB</td><td>Cache, סשנים של משתמשים, עגלת קניות</td></tr>
  <tr><td><b>עמודות</b> (Column-family / Wide-column)</td><td>שורות עם "משפחות עמודות". כל שורה יכולה להכיל עמודות אחרות, ומספר עצום של עמודות</td><td dir="ltr">Apache Cassandra, HBase</td><td>כמויות עצומות של כתיבות: IoT, לוגים, אנליטיקה</td></tr>
  <tr><td><b>גרפים</b> (Graph)</td><td>צמתים (Nodes) וקשתות (Edges), ולשניהם יכולות להיות תכונות</td><td dir="ltr">Neo4j</td><td>רשתות חברתיות, מנועי המלצות, זיהוי הונאות</td></tr>
</table>

<div class="callout"><b>העשרה מהסילבוס: Vector Database.</b> בסיס נתונים ששומר <b>וקטורים</b> (Embeddings), כלומר רשימות ארוכות של מספרים שמייצגות את המשמעות של טקסט או תמונה. הוא מחפש לפי <b>דמיון</b> (השכנים הקרובים ביותר) ולא לפי התאמה מדויקת כמו <code>WHERE</code>. משמש לחיפוש סמנטי ולמערכות AI, למשל RAG: שליפת המסמכים הרלוונטיים לפני שהצ'טבוט עונה. דוגמאות: Pinecone, Milvus, Weaviate, ו-MongoDB Atlas Vector Search.</div>

<h4>MongoDB: מילון מונחים מול SQL</h4>
<table class="mini">
  <tr><th>SQL (רלציוני)</th><th>MongoDB</th><th>הערה</th></tr>
  <tr><td>Database</td><td>Database</td><td>בוחרים עם <code>use college</code>. הוא נוצר אוטומטית בכתיבה הראשונה</td></tr>
  <tr><td>Table (טבלה)</td><td><b>Collection</b> (אוסף)</td><td>אין צורך ב-CREATE: ה-Collection נוצר בהכנסה הראשונה</td></tr>
  <tr><td>Row / Record (שורה)</td><td><b>Document</b> (מסמך)</td><td>אובייקט בסגנון JSON</td></tr>
  <tr><td>Column (עמודה)</td><td><b>Field</b> (שדה)</td><td>יכול להכיל גם מערך או מסמך מקונן</td></tr>
  <tr><td>Primary Key</td><td><code>_id</code></td><td>חובה בכל מסמך וייחודי. אם לא נותנים ערך, נוצר אוטומטית ObjectId</td></tr>
  <tr><td>Foreign Key</td><td>Reference: שדה שמחזיק <code>_id</code> של מסמך אחר</td><td>למשל <code>lecturerId</code>. <b>אין</b> אכיפה אוטומטית של שלמות ההפניות</td></tr>
  <tr><td>טבלת גישור (M:N)</td><td>Collection מקשר</td><td>למשל <code>enrollments</code></td></tr>
  <tr><td>JOIN</td><td><code>$lookup</code>, או הטמעה (Embedding)</td><td>מפורט בפרקי המידול וה-Aggregation</td></tr>
  <tr><td>סכמה קבועה</td><td>סכמה גמישה (Flexible schema)</td><td>מסמכים באותו Collection יכולים להיות שונים זה מזה</td></tr>
  <tr><td>SELECT … WHERE</td><td><code>find(filter, projection)</code></td><td>מפורט בפרק השאילתות</td></tr>
  <tr><td>GROUP BY, JOIN, HAVING</td><td><code>aggregate([ … ])</code></td><td>Pipeline של שלבים</td></tr>
</table>

<h4>JSON ו-BSON</h4>
<p>מסמך ב-MongoDB נכתב כמו אובייקט <b>JSON</b>: זוגות של <code>שדה: ערך</code> בתוך סוגריים מסולסלים, מופרדים בפסיקים. בפועל הוא נשמר בפורמט <b>BSON</b> (<i>Binary JSON</i>), ייצוג בינארי שמהיר לסרוק. BSON מוסיף טיפוסים שאין ב-JSON: <code>Date</code>, <code>ObjectId</code>, מספרים שלמים (int/long), <code>double</code> ו-<code>Decimal128</code>.</p>
<p>כך נראה סטודנט ב-college2. ב-SQL זו שורה אחת בטבלה <code>students</code>:</p>
<pre>db.students.findOne({ _id: 1 })</pre><pre>// פלט
{
  _id: 1,
  firstName: "David",
  lastName: "Levi",
  email: "david@gmail.com",
  phone: "0501234567",
  city: "Tel Aviv",
  age: 23,
  registrationYear: 2024
}</pre>
<p>למסמך יכולים להיות גם <b>מערך</b> ו<b>מסמכים מקוננים</b>. כך נראה קורס שבתוכו מערך שיעורים מוטמע (ב-SQL זו הייתה טבלה נפרדת):</p>
<pre>db.courses.findOne({ _id: 3 })</pre><pre>// פלט
{
  _id: 3,
  courseName: "Python",
  credits: 3,
  department: "Data Science",
  lecturerId: 2,
  lessons: [ { title: "Python Basics", duration: 90 }, { title: "Pandas", duration: 120 } ]
}</pre>

<h4>_id ו-ObjectId</h4>
<ul>
  <li>לכל מסמך חייב להיות שדה <code>_id</code>. זה ה-Primary Key של ה-Collection: הוא ייחודי, ואי אפשר לשנות אותו אחרי ההכנסה.</li>
  <li>אם לא מכניסים <code>_id</code>, MongoDB יוצר אוטומטית <b>ObjectId</b>. זה מזהה של 12 בתים שנכתב כ-24 תווים הקסדצימליים, למשל <code>ObjectId("65f1c2a9e4b0a1b2c3d4e5f6")</code>. הוא בנוי מחותמת זמן (4 בתים), ערך אקראי (5) ומונה (3), ולכן הוא ייחודי גם בין שרתים שונים ומכיל את זמן היצירה.</li>
  <li>הכנסה של מסמך עם <code>_id</code> שכבר קיים נכשלת בשגיאה <code>E11000 duplicate key error</code>.</li>
  <li><b>הפניה</b> (Reference) למסמך אחר היא שמירה של ה-<code>_id</code> שלו: <code>lecturerId: ObjectId("...")</code>. זה המקביל ל-Foreign Key.</li>
</ul>
<div class="callout">באתר (college2) ערכי <code>_id</code> הם מספרים פשוטים (1, 2, 3…), כדי שיהיה קל לקרוא אותם ולהשוות ל-SQL. במבחן ובמונגו אמיתי כותבים <code>ObjectId("...")</code>, והעיקרון זהה. גם תאריכים נכתבים כמו בעבודות: <code>ISODate("2025-10-01")</code> לתאריך קבוע, או <code>new Date()</code> לתאריך של עכשיו.</div>

<h4>סכמה גמישה (Flexible Schema)</h4>
<p>אין <code>CREATE TABLE</code> ואין <code>ALTER TABLE</code>. אפשר להכניס לאותו Collection מסמך עם שדות אחרים, עם מערך או עם מסמך מקונן, בלי לשנות שום דבר במבנה:</p>
<pre>db.students.insertOne({
  _id: 11, firstName: "Roni", lastName: "Bar", city: "Haifa",
  hobbies: ["chess", "guitar"],
  address: { street: "Herzl 5", zip: "33000" }
})</pre><pre>// פלט
{ acknowledged: true, insertedId: 11 }</pre><pre>db.students.find({ _id: { $gte: 10 } })</pre><pre>// פלט
[
  {
    _id: 10,
    firstName: "Lior",
    lastName: "Shalom",
    email: "lior@gmail.com",
    phone: "0559999999",
    city: "Holon",
    age: 22,
    registrationYear: 2025
  },
  {
    _id: 11,
    firstName: "Roni",
    lastName: "Bar",
    city: "Haifa",
    hobbies: [ "chess", "guitar" ],
    address: { street: "Herzl 5", zip: "33000" }
  }
]</pre>
<p>Lior (10) ו-Roni (11) נמצאים באותו Collection. לרוני אין email, phone ו-age, אבל יש לה מערך ומסמך מקונן. ב-SQL זה היה דורש <code>ALTER TABLE</code> וטבלאות נוספות.</p>
<div class="callout warn">לגמישות יש מחיר. אין NOT NULL, CHECK או FOREIGN KEY אוטומטיים, וטעות כתיב בשם שדה (<code>fristName</code>) פשוט יוצרת שדה חדש בלי שום שגיאה. MongoDB תומך גם ב-Schema Validation, אבל היא לא מופעלת כברירת מחדל.</div>

<h4>התרחבות (Scaling)</h4>
<table class="mini">
  <tr><th></th><th>אנכית (Scale Up)</th><th>אופקית (Scale Out)</th></tr>
  <tr><td>מה עושים</td><td>משדרגים שרת אחד (CPU, RAM, דיסק)</td><td>מוסיפים שרתים ומחלקים ביניהם את הנתונים</td></tr>
  <tr><td>אופייני ל-</td><td>SQL מסורתי</td><td>NoSQL. ב-MongoDB זה נקרא <b>Sharding</b>: חלוקה לפי Shard Key</td></tr>
  <tr><td>מגבלה</td><td>יש תקרה, והמחיר עולה מהר</td><td>ניהול מורכב יותר, ושאלות של עקביות</td></tr>
</table>
<p>בנוסף, <b>Replica Set</b> ב-MongoDB הוא כמה עותקים של אותם נתונים: שרת ראשי (Primary) ושרתים משניים (Secondaries). כך מקבלים זמינות גבוהה: אם הראשי נופל, שרת אחר תופס את מקומו.</p>

<h4>ACID מול BASE</h4>
<ul>
  <li><b>SQL ← ACID:</b> Atomicity, Consistency, Isolation, Durability. טרנזקציה מתבצעת כולה או לא מתבצעת בכלל, וזה קריטי בבנק ובהנהלת חשבונות.</li>
  <li><b>NoSQL ← לרוב BASE:</b> Basically Available, Soft state, Eventual consistency. מעדיפים זמינות והתרחבות, והנתונים "מתיישרים" בין השרתים תוך זמן קצר.</li>
  <li>ב-MongoDB פעולה על <b>מסמך אחד</b> היא תמיד אטומית, ולכן Embedding עוזר לעקביות. מגרסה 4.0 יש גם טרנזקציות על כמה מסמכים.</li>
</ul>

<h4>מתי SQL ומתי NoSQL?</h4>
<table class="mini">
  <tr><th>קריטריון</th><th>SQL (SQL Server)</th><th>NoSQL (MongoDB)</th></tr>
  <tr><td>מבנה הנתונים</td><td>קבוע וידוע מראש</td><td>משתנה, לא אחיד או מקונן</td></tr>
  <tr><td>קשרים</td><td>הרבה קשרים מורכבים והרבה JOIN</td><td>מה שנקרא יחד נשמר יחד</td></tr>
  <tr><td>טרנזקציות ועקביות</td><td>קריטיות (בנק, מלאי, שכר)</td><td>פחות קריטיות, או ברמת מסמך</td></tr>
  <tr><td>היקף ועומס</td><td>בינוני, Scale-up</td><td>עצום, Scale-out (Sharding)</td></tr>
  <tr><td>שפת שאילתות</td><td>SQL סטנדרטית ועשירה</td><td>API על JSON: <code>find</code> / <code>aggregate</code></td></tr>
  <tr><td>דוגמאות</td><td>בנק, ERP, הנהלת חשבונות</td><td>קטלוג מוצרים, תוכן, IoT, לוגים, אפליקציות מובייל</td></tr>
</table>
<div class="callout">במבחן, כשמבקשים "נמקו", צריך לקשור את הבחירה לתכונה של הנתונים: <b>מבנה</b> (קבוע או משתנה), <b>קשרים</b>, <b>היקף</b>, ו<b>אופן השליפה</b> (מה נקרא יחד).</div>

<h4>פקודות Shell בסיסיות</h4>
<p><code>use college</code> עובר ל-database (שנוצר בכתיבה הראשונה). <code>show collections</code> מציג את ה-Collections שבו:</p>
<pre>use college
show collections</pre><pre>// פלט
[ "students", "lecturers", "courses", "enrollments", "assignments", "submissions" ]</pre>
<p>(ב-mongosh אמיתי כל שם מודפס בשורה נפרדת.) במבחן נכתוב כל פקודה כך: <code>db.&lt;collection&gt;.&lt;פקודה&gt;( … )</code>, למשל <code>db.students.find()</code>.</p>
`
  },
  {
    id:'nosql-model', track:'nosql', icon:'🗂️', title:'מידול נתונים: Embedding מול Referencing',
    html:`
<p>זו השאלה המרכזית בתכנון ב-MongoDB, וגם שאלה 1 בשיעור ה-NoSQL: <b>מה לשמור בתוך המסמך (Embedding)</b> ו<b>מה לשמור בנפרד ולהפנות אליו (Referencing)</b>. ב-SQL התשובה כמעט תמיד "טבלה נפרדת + FK" (נרמול). ב-MongoDB מתכננים לפי <b>אופן השימוש</b>: מה נקרא יחד, כמה זה גדל, ומה משתנה.</p>

<h4>הדוגמה של המרצה: המרצה בתוך הקורס, או הפניה?</h4>
<pre>// אפשרות א' — Embedding: פרטי המרצה מוטמעים בתוך מסמך הקורס
{
  courseName: "MongoDB",
  lecturer: {
    name: "David Cohen",
    email: "david@college.com"
  }
}

// אפשרות ב' — Referencing: בקורס נשמר רק ה-_id של המרצה
{
  courseName: "MongoDB",
  lecturerId: ObjectId("...")
}</pre>
<table class="mini">
  <tr><th></th><th>Embedding (מוטמע)</th><th>Referencing (הפניה)</th></tr>
  <tr><td>שליפה</td><td>קריאה אחת מחזירה את הקורס עם המרצה. מהיר, בלי <code>$lookup</code></td><td>כדי לקבל את שם המרצה צריך <code>$lookup</code> (או שתי שאילתות)</td></tr>
  <tr><td>כפילויות</td><td>מרצה שמלמד כמה קורסים משוכפל בכל אחד מהם</td><td>פרטי המרצה נשמרים פעם אחת, ב-<code>lecturers</code></td></tr>
  <tr><td>עדכון</td><td>שינוי מייל מחייב לעדכן את כל הקורסים שלו (סכנה לחוסר עקביות)</td><td>מעדכנים מסמך אחד</td></tr>
  <tr><td>מרצה בלי קורס</td><td>אין לו איפה להישמר</td><td>קיים כמסמך עצמאי</td></tr>
  <tr><td>גודל מסמך הקורס</td><td>גדל</td><td>מינימלי</td></tr>
</table>
<div class="callout"><b>תשובה מנומקת: Reference.</b> מרצה הוא <b>ישות עצמאית</b> עם חיים משלו (מחלקה, ותק). הוא יכול ללמד <b>כמה קורסים</b> (ב-college2 משה כהן מלמד גם MongoDB וגם SQL Server), ויכול גם לא ללמד <b>אף קורס</b> (דנה קליין). Embedding היה משכפל את פרטיו ויוצר אנומליית עדכון. לכן שומרים <code>lecturerId</code> בקורס, כמו FK בצד ה"רבים", ומביאים את השם עם <code>$lookup</code> כשצריך. זה גם מה ששאלה 2 בשיעור דרשה: "Reference למרצה".<br>Embedding של המרצה סביר רק אם לכל קורס יש מרצה ייחודי, הפרטים כמעט לא משתנים, ותמיד מציגים אותם יחד עם הקורס. יש גם פתרון ביניים מקובל: Reference, ובנוסף עותק של השם בלבד (<code>lecturerName</code>) לתצוגה מהירה.</div>

<h4>מתי Embedding ומתי Referencing: כללי אצבע</h4>
<table class="mini">
  <tr><th>Embedding (מסמך מוטמע / מערך)</th><th>Referencing (הפניה ב-<code>_id</code>)</th></tr>
  <tr><td>קשר של "מכיל / חלק מ-": לילד אין קיום בלי ההורה</td><td>הישות עצמאית ונשלפת גם לבד</td></tr>
  <tr><td>1:1, או 1:מעט (few)</td><td>1:הרבה מאוד, או M:N</td></tr>
  <tr><td>הנתונים נקראים תמיד יחד</td><td>נקראים בנפרד, או רק לפעמים</td></tr>
  <tr><td>המערך <b>חסום</b> (Bounded) וקטן</td><td>המערך גדל <b>בלי הגבלה</b> (Unbounded)</td></tr>
  <tr><td>משתנה לעיתים רחוקות</td><td>משתנה הרבה, או משותף לכמה מסמכים</td></tr>
  <tr><td>יתרון: קריאה אחת, ועדכון אטומי של כל המסמך</td><td>יתרון: אין כפילויות, והמסמכים נשארים קטנים</td></tr>
</table>

<h4>סוגי קשרים ואיך ממדלים אותם</h4>
<table class="mini">
  <tr><th>קשר</th><th>דוגמה</th><th>מידול מומלץ</th></tr>
  <tr><td><b>1:1</b></td><td>סטודנט ↔ כתובת</td><td>Embedding: <code>address: { street, city, zip }</code></td></tr>
  <tr><td><b>1:מעט</b></td><td>קורס ↔ שיעורים</td><td>מערך מוטמע <code>lessons: [ { title, duration } ]</code>, וכך זה ב-college2</td></tr>
  <tr><td><b>1:הרבה</b> / ישות עצמאית</td><td>מרצה ↔ קורסים, קורס ↔ מטלות</td><td>Reference <b>בצד ה"רבים"</b>: <code>courses.lecturerId</code>, <code>assignments.courseId</code>, בדיוק כמו FK</td></tr>
  <tr><td><b>M:N</b></td><td>סטודנטים ↔ קורסים</td><td><b>Collection מקשר</b> <code>enrollments</code>, המקביל לטבלת גישור. גם המידע על הקשר עצמו (תאריך, סטטוס) נשמר שם</td></tr>
</table>
<pre>// enrollments — Collection מקשר (שאלה 3 בשיעור)
{
  studentId: ObjectId("..."),
  courseId: ObjectId("..."),
  enrollmentDate: new Date(),
  status: "active"
}</pre>
<p>חלופה ל-M:N: מערך הפניות בתוך הסטודנט, <code>courseIds: [1, 2, 3]</code>. זה אפשרי כשלכל סטודנט יש מעט קורסים, אבל אין מקום נוח לתאריך ולסטטוס של כל הרשמה, והשאלה "מי רשום לקורס X" מחייבת לסרוק מערכים בכל הסטודנטים. לכן Collection מקשר הוא הפתרון הנקי, וזה מה שהמרצה דרש.</p>

<h4>המודל של college2 (הנתונים באתר)</h4>
<table class="mini">
  <tr><th>Collection</th><th>שדות</th><th>החלטת מידול</th></tr>
  <tr><td dir="ltr">students</td><td dir="ltr">_id, firstName, lastName, email, phone, city, age, registrationYear</td><td>ישות עצמאית</td></tr>
  <tr><td dir="ltr">lecturers</td><td dir="ltr">_id, firstName, lastName, department, seniority</td><td>ישות עצמאית</td></tr>
  <tr><td dir="ltr">courses</td><td dir="ltr">_id, courseName, credits, department, lecturerId, lessons[ {title, duration} ]</td><td><code>lecturerId</code> הוא Reference, <code>lessons</code> הוא מערך מוטמע (1:מעט וחסום)</td></tr>
  <tr><td dir="ltr">enrollments</td><td dir="ltr">_id, studentId, courseId, enrollmentDate, status</td><td>Collection מקשר (M:N)</td></tr>
  <tr><td dir="ltr">assignments</td><td dir="ltr">_id, courseId, title, maxGrade, dueDate</td><td>Reference לקורס</td></tr>
  <tr><td dir="ltr">submissions</td><td dir="ltr">_id, studentId, assignmentId, courseId, grade, submissionDate, status</td><td>3 הפניות. <code>grade</code> יכול להיות <code>null</code> (עבודה שטרם נבדקה)</td></tr>
</table>
<pre>db.courses.findOne({ _id: 1 })</pre><pre>// פלט
{
  _id: 1,
  courseName: "MongoDB",
  credits: 4,
  department: "Information Systems",
  lecturerId: 1,
  lessons: [
    { title: "Intro to NoSQL", duration: 90 },
    { title: "CRUD", duration: 90 },
    { title: "Aggregation", duration: 120 },
    { title: "Indexes", duration: 60 }
  ]
}</pre>
<div class="callout">ב-SQL (college2) אין טבלת שיעורים, כי השיעורים קיימים רק במונגו כמערך מוטמע. בכל שאר הטבלאות הנתונים זהים: <code>id</code> ב-SQL הוא <code>_id</code> במונגו, וה-FK-ים (<code>studentId</code>, <code>courseId</code>…) הם שדות הפניה עם אותם מספרים.</div>

<h4>מערכים לא חסומים ומגבלת ה-16MB</h4>
<ul>
  <li>גודל מסמך ב-MongoDB מוגבל ל-<b>16MB</b> (מגבלת BSON). מערך שגדל בלי גבול, כמו כל ההגשות או כל הסטודנטים, עלול לחצות אותה, ואז ההכנסה <b>נכשלת</b>.</li>
  <li>הבעיות מתחילות עוד לפני 16MB. כל קריאה טוענת את כל המערך לזיכרון ומעבירה אותו ברשת, כל עדכון כותב מסמך ענק, כל הכותבים מתחרים על אותו מסמך (Hot document), ואינדקס על מערך גדול (Multikey) הוא כבד.</li>
  <li><b>הכלל:</b> מטמיעים מערך רק כשיש לו גבול עליון סביר וידוע, כמו שיעורים בקורס או כתובות של לקוח. מה שגדל בלי גבול עובר ל-Collection נפרד עם Reference.</li>
</ul>

<h4>שאלה 6 מהשיעור: קורס עם 5,000 סטודנטים (תשובה מלאה)</h4>
<p>המכללה מודיעה שבעתיד ייתכן קורס עם 5,000 סטודנטים, 100 שיעורים, 20 עבודות ועשרות אלפי הגשות.</p>
<p><b>6.1: האם לשמור את כל הסטודנטים בתוך ה-Document של הקורס?</b> <u>לא.</u></p>
<ul>
  <li><b>מערך לא חסום.</b> כל הרשמה מגדילה את המסמך: 5,000 איברים היום, ויותר בסמסטר הבא.</li>
  <li><b>גודל וביצועים.</b> כל הצגה של פרטי הקורס (שם, תיאור) טוענת גם את 5,000 הסטודנטים. בחישוב גס, 5,000 × כ-200 בתים ≈ 1MB. זה עדיין מתחת ל-16MB, אבל כבד מאוד לכל קריאה ולכל עדכון.</li>
  <li><b>עומס כתיבה.</b> כל הרשמה או ביטול היא עדכון של אותו מסמך, וזה צוואר בקבוק.</li>
  <li><b>כפילויות.</b> שם הסטודנט שמור גם ב-<code>students</code> וגם בכל קורס שלו, ולכן שינוי שם מחייב עדכונים רבים.</li>
  <li><b>שאילתה מהצד השני קשה.</b> כדי לענות על "באילו קורסים רשום דוד?" צריך לסרוק את המערכים בכל הקורסים.</li>
  <li><b>מידע על ההרשמה עצמה</b> (תאריך, סטטוס) מסבך את המערך עוד יותר.</li>
</ul>
<p><b>6.2: האם לשמור את כל ההגשות בתוך ה-Course Document?</b> <u>בהחלט לא.</u> זה מקרה גרוע עוד יותר:</p>
<ul>
  <li>עשרות אלפי הגשות, כל אחת עם סטודנט, עבודה, ציון, תאריך, הערות וקובץ, מתקרבות ל-16MB ויכולות לחרוג, ואז הכתיבה נכשלת.</li>
  <li>כל בדיקת עבודה (עדכון ציון) משכתבת מסמך ענק, ובודקים רבים מעדכנים את אותו מסמך במקביל.</li>
  <li>שאילתות כמו "ההגשות של סטודנט X" או "ההגשות שטרם נבדקו" מחייבות <code>$unwind</code> של עשרות אלפי איברים בכל פעם. אי אפשר לדפדף (skip/limit), למיין או להשתמש באינדקס ביעילות.</li>
</ul>
<p><b>6.3: מבנה נתונים טוב יותר</b></p>
<pre>// courses — מידע יציב + מערכים חסומים מוטמעים
{
  _id: ObjectId("..."),
  courseName: "MongoDB",
  description: "NoSQL Database Course",
  startDate: ISODate("2026-03-01"),
  endDate: ISODate("2026-07-01"),
  lecturerId: ObjectId("..."),            // Reference — המרצה ישות עצמאית
  lessons: [                              // Embedded — עד 100, חסום, נקרא עם הקורס
    { lessonId: 1, title: "Intro", date: ISODate("2026-03-02"), duration: 90 }
  ],
  assignments: [                          // Embedded — 20 עבודות, חסום
    { assignmentId: 1, title: "CRUD", dueDate: ISODate("2026-04-01"), maxGrade: 100 }
  ],
  studentsCount: 5000                     // שדה מחושב לתצוגה מהירה (מתעדכן ב-$inc)
}

// enrollments — מסמך קטן לכל הרשמה (5,000 מסמכים, לא מערך אחד)
{ _id: ObjectId("..."), studentId: ObjectId("..."), courseId: ObjectId("..."),
  enrollmentDate: ISODate("2026-02-20"), status: "Active" }

// submissions — מסמך קטן לכל הגשה (עשרות אלפי מסמכים)
{ _id: ObjectId("..."), studentId: ObjectId("..."), courseId: ObjectId("..."),
  assignmentId: 1, grade: null, submissionDate: ISODate("2026-04-01"), status: "Submitted" }

// אינדקסים לשליפה מהירה
db.enrollments.createIndex({ courseId: 1 })
db.enrollments.createIndex({ studentId: 1, courseId: 1 }, { unique: true })
db.submissions.createIndex({ courseId: 1, assignmentId: 1 })
db.submissions.createIndex({ studentId: 1 })</pre>
<table class="mini">
  <tr><th>קריטריון</th><th>ההחלטה והנימוק</th></tr>
  <tr><td><b>Embedding</b></td><td>שיעורים (100) ועבודות (20) הם מערכים חסומים וקטנים, שייכים רק לקורס ונקראים איתו, ולכן מוטמעים. אם לעבודה יש תיאור ארוך או קבצים, אפשר להוציא אותה ל-Collection נפרד (<code>assignments</code>, כמו ב-college2).</td></tr>
  <tr><td><b>Referencing</b></td><td>סטודנטים, הרשמות והגשות הם לא חסומים ועצמאיים, ולכן כל אחד ב-Collection נפרד עם <code>studentId</code> / <code>courseId</code> (כמו FK). גם המרצה נשמר כ-Reference.</td></tr>
  <tr><td><b>גודל Documents</b></td><td>כל מסמך קטן (מאות בתים) ורחוק מאוד מ-16MB. מסמך הקורס לא גדל כשנרשמים עוד סטודנטים.</td></tr>
  <tr><td><b>ביצועים</b></td><td>העדכונים קטנים ומתפזרים על מסמכים שונים, כך שאין התנגשות על מסמך אחד. ה-Aggregation מתחיל ב-<code>$match</code> על שדה שיש עליו אינדקס.</td></tr>
  <tr><td><b>שליפה מהירה</b></td><td>יש אינדקסים על <code>courseId</code> ועל <code>studentId</code>. מדפדפים עם <code>sort</code> + <code>skip</code> + <code>limit</code>. שדה מחושב (<code>studentsCount</code>) או עותק של שם לתצוגה חוסכים <code>$lookup</code>.</td></tr>
  <tr><td><b>עדכון נתונים</b></td><td>עדכון ציון הוא <code>updateOne</code> על הגשה אחת. שינוי פרטי סטודנט הוא שינוי של מסמך אחד ב-<code>students</code>, בלי כפילויות. הרשמה חדשה היא <code>insertOne</code> ל-<code>enrollments</code>, ועוד <code>$inc</code> ל-<code>studentsCount</code>.</td></tr>
</table>
<p>אינדקס שנוצר מחזיר את השם שלו:</p>
<pre>db.enrollments.createIndex({ studentId: 1, courseId: 1 }, { unique: true })</pre><pre>// פלט
"studentId_1_courseId_1"</pre>
<div class="callout warn"><b>במבחן:</b> נמקו כל החלטה לפי ארבע שאלות. (1) האם הנתונים נקראים יחד? (2) האם המערך חסום? (3) האם הישות עצמאית או משותפת לכמה מסמכים? (4) כמה הנתונים משתנים? תשובה כמו "Embedding כי זה מהיר" בלי להתייחס לגודל ולעדכונים לא תקבל ניקוד מלא.</div>
`
  },
  {
    id:'nosql-crud', track:'nosql', icon:'✏️', title:'CRUD: הכנסה, שליפה, עדכון ומחיקה',
    html:`
<p><b>CRUD</b> הם ראשי התיבות של Create, Read, Update, Delete. כל פקודה נכתבת על Collection בצורה <code>db.&lt;collection&gt;.&lt;command&gt;( … )</code>. כל הדוגמאות כאן רצו על college2, ולכל אחת מוצג הפלט שהתקבל. כל דוגמה מתחילה מהנתונים המקוריים.</p>
<table class="mini">
  <tr><th>פעולה</th><th>SQL</th><th>MongoDB</th></tr>
  <tr><td>Create</td><td dir="ltr">INSERT INTO … VALUES</td><td dir="ltr">insertOne / insertMany</td></tr>
  <tr><td>Read</td><td dir="ltr">SELECT … FROM … WHERE</td><td dir="ltr">find / findOne / countDocuments / distinct</td></tr>
  <tr><td>Update</td><td dir="ltr">UPDATE … SET … WHERE</td><td dir="ltr">updateOne / updateMany / replaceOne</td></tr>
  <tr><td>Delete</td><td dir="ltr">DELETE FROM … WHERE</td><td dir="ltr">deleteOne / deleteMany</td></tr>
</table>

<h4>Create: insertOne / insertMany</h4>
<pre>db.students.insertOne({
  _id: 11,
  firstName: "Roni",
  lastName: "Bar",
  email: "roni@gmail.com",
  phone: "0501112222",
  city: "Haifa",
  age: 24,
  registrationYear: 2026
})</pre><pre>// פלט
{ acknowledged: true, insertedId: 11 }</pre>
<ul>
  <li>הפקודה מחזירה <code>acknowledged: true</code> (השרת אישר) ואת <code>insertedId</code>.</li>
  <li>בלי <code>_id</code> נוצר אוטומטית <code>ObjectId("…")</code>. בסימולטור של האתר יופיע במקומו מזהה כמו <code>"oid_0001"</code>.</li>
  <li>ה-Collection לא חייב להיות קיים, כי הוא נוצר בהכנסה הראשונה. אין צורך ב-CREATE.</li>
</ul>
<pre>db.lecturers.insertMany([
  { _id: 5, firstName: "Yael", lastName: "Mor", department: "Data Science", seniority: 2 },
  { _id: 6, firstName: "Ron", lastName: "Tal", department: "Business", seniority: 9 }
])</pre><pre>// פלט
{ acknowledged: true, insertedIds: [ 5, 6 ] }</pre>
<div class="callout"><code>insertMany</code> מקבלת <b>מערך</b> <code>[ {…}, {…} ]</code>. אם שוכחים את הסוגריים המרובעים זו שגיאה. במונגו אמיתי <code>insertedIds</code> מוצג כאובייקט <code>{ '0': 5, '1': 6 }</code>. המקבילה ב-SQL היא <code>INSERT INTO lecturers VALUES (…), (…);</code>.</div>
<p>הכנסת הרשמה עם תאריך. <code>ISODate("…")</code> מתאים לתאריך קבוע, ו-<code>new Date()</code> לתאריך של עכשיו:</p>
<pre>db.enrollments.insertOne({
  _id: 16,
  studentId: 10,
  courseId: 6,
  enrollmentDate: ISODate("2025-10-12"),
  status: "Active"
})</pre><pre>// פלט
{ acknowledged: true, insertedId: 16 }</pre>

<h4>Read: find(filter, projection)</h4>
<p>הפרמטר הראשון הוא <b>התנאי</b> (filter), המקביל ל-WHERE. הפרמטר השני הוא <b>ההטלה</b> (projection), שקובעת אילו שדות להציג, כמו רשימת העמודות ב-SELECT. שניהם אופציונליים. <code>db.students.find()</code> בלי פרמטרים, או עם <code>{}</code>, מחזירה את כל המסמכים (תרגיל 1 בעבודה):</p>
<pre>db.students.find()</pre><pre>// פלט
[
  {
    _id: 1,
    firstName: "David",
    lastName: "Levi",
    email: "david@gmail.com",
    phone: "0501234567",
    city: "Tel Aviv",
    age: 23,
    registrationYear: 2024
  },
  {
    _id: 2,
    firstName: "Noa",
    lastName: "Cohen",
    email: "noa@gmail.com",
    phone: "0521111111",
    city: "Haifa",
    age: 21,
    registrationYear: 2025
  },
  // … ועוד 8 מסמכים
]</pre>
<p>סינון לפי עיר (תרגיל 2 בעבודה):</p>
<pre>db.students.find({ city: "Tel Aviv" })</pre><pre>// פלט
[
  {
    _id: 1,
    firstName: "David",
    lastName: "Levi",
    email: "david@gmail.com",
    phone: "0501234567",
    city: "Tel Aviv",
    age: 23,
    registrationYear: 2024
  },
  {
    _id: 4,
    firstName: "Maya",
    lastName: "Peretz",
    email: "maya@gmail.com",
    phone: "0543333333",
    city: "Tel Aviv",
    age: 22,
    registrationYear: 2025
  },
  {
    _id: 7,
    firstName: "Itai",
    lastName: "Friedman",
    email: "itai@gmail.com",
    phone: "0526666666",
    city: "Tel Aviv",
    age: 27,
    registrationYear: 2022
  }
]</pre>
<p>עם Projection: <code>1</code> פירושו "הצג", ו-<code>_id: 0</code> מסתיר את <code>_id</code>, שמוצג תמיד אלא אם מסתירים אותו במפורש:</p>
<pre>db.students.find({ city: "Tel Aviv" }, { firstName: 1, lastName: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "David", lastName: "Levi" },
  { firstName: "Maya", lastName: "Peretz" },
  { firstName: "Itai", lastName: "Friedman" }
]</pre>
<pre>-- המקבילה ב-SQL
SELECT firstName, lastName FROM students WHERE city = 'Tel Aviv';</pre>

<h4>findOne</h4>
<p>מחזירה <b>מסמך אחד</b>: הראשון שמתאים לתנאי, לפי סדר האחסון. התוצאה היא אובייקט ולא Cursor, ואם אין התאמה מתקבל <code>null</code>.</p>
<pre>db.students.findOne({ city: "Haifa" })</pre><pre>// פלט
{
  _id: 2,
  firstName: "Noa",
  lastName: "Cohen",
  email: "noa@gmail.com",
  phone: "0521111111",
  city: "Haifa",
  age: 21,
  registrationYear: 2025
}</pre>
<pre>db.students.findOne({ city: "Eilat" })</pre><pre>// פלט
null</pre>

<h4>ספירה: countDocuments / estimatedDocumentCount</h4>
<pre>db.enrollments.countDocuments({ status: "Active" })</pre><pre>// פלט
13</pre>
<pre>db.students.estimatedDocumentCount()</pre><pre>// פלט
10</pre>
<p><code>countDocuments(filter)</code> סופרת בדיוק לפי תנאי, כמו <code>SELECT COUNT(*) … WHERE</code>. <code>estimatedDocumentCount()</code> לא מקבלת תנאי, ומחזירה הערכה מהירה מתוך המטא-דאטה של ה-Collection.</p>

<h4>distinct: ערכים ייחודיים</h4>
<pre>db.students.distinct("city")</pre><pre>// פלט
[ "Tel Aviv", "Haifa", "Jerusalem", "Beer Sheva", "Ramat Gan", "Holon" ]</pre>
<p>זה המקביל ל-<code>SELECT DISTINCT city FROM students</code>, אבל התוצאה היא <b>מערך של ערכים</b> ולא מסמכים. אפשר להוסיף תנאי כפרמטר שני:</p>
<pre>db.enrollments.distinct("studentId", { status: "Active" })</pre><pre>// פלט
[ 1, 2, 3, 4, 5, 6, 7, 8 ]</pre>
<p>9 (Eyal) לא מופיע כי ההרשמה היחידה שלו לא פעילה, ו-10 (Lior) לא מופיע כי הוא לא רשום לאף קורס.</p>

<h4>Update: updateOne / updateMany</h4>
<p>המבנה הוא <code>updateOne(filter, update, options)</code>. מסמך העדכון <b>חייב</b> להשתמש באופרטור כמו <code>$set</code>, <code>$inc</code> או <code>$push</code>. תרגיל 3 בעבודה: עדכון הטלפון של סטודנט, ואז הצגה שלו כדי לוודא שהעדכון הצליח:</p>
<pre>db.students.updateOne({ _id: 2 }, { $set: { phone: "0529999999" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 2 })</pre><pre>// פלט
{
  _id: 2,
  firstName: "Noa",
  lastName: "Cohen",
  email: "noa@gmail.com",
  phone: "0529999999",
  city: "Haifa",
  age: 21,
  registrationYear: 2025
}</pre>
<ul>
  <li><code>matchedCount</code> הוא מספר המסמכים שעמדו בתנאי, ו-<code>modifiedCount</code> הוא מספר המסמכים שבאמת השתנו. במונגו אמיתי מוצגים גם <code>upsertedCount: 0</code> ו-<code>insertedId: null</code>.</li>
</ul>
<p>תרגיל 4 בעבודה: הוספת השדה <code>region</code> לכל הסטודנטים שגרים בתל אביב:</p>
<pre>db.students.updateMany({ city: "Tel Aviv" }, { $set: { region: "Center" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 3, modifiedCount: 3 }</pre><pre>db.students.find({ region: "Center" }, { firstName: 1, city: 1, region: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "David", city: "Tel Aviv", region: "Center" },
  { firstName: "Maya", city: "Tel Aviv", region: "Center" },
  { firstName: "Itai", city: "Tel Aviv", region: "Center" }
]</pre>
<p><b>updateOne מול updateMany.</b> אותו תנאי בדיוק, אבל <code>updateOne</code> מעדכן רק את המסמך <b>הראשון</b> שמתאים:</p>
<pre>db.students.updateOne({ city: "Tel Aviv" }, { $set: { region: "Center" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.find({ city: "Tel Aviv" }, { firstName: 1, region: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "David", region: "Center" },
  { firstName: "Maya" },
  { firstName: "Itai" }
]</pre>
<p><b>matched מול modified.</b> כשהערך כבר קיים, המסמך נמצא אבל לא שונה:</p>
<pre>db.students.updateOne({ _id: 1 }, { $set: { city: "Tel Aviv" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 0 }</pre>
<div class="callout warn">
<b>שתי טעויות קלאסיות:</b><br>
1. <code>updateMany({}, …)</code> מעדכן את <b>כל</b> המסמכים, בדיוק כמו UPDATE בלי WHERE.<br>
2. עדכון בלי אופרטור, למשל <code>updateOne({ _id: 1 }, { city: "Haifa" })</code>, נכשל במונגו בשגיאה <i>Update document requires atomic operators</i>. כדי להחליף מסמך שלם משתמשים ב-<code>replaceOne</code>.
</div>
<pre>db.students.updateOne({ _id: 1 }, { city: "Haifa" })</pre><pre>// שגיאה
בעדכון חובה להשתמש באופרטור כמו $set / $inc / $push — למשל { $set: { age: 30 } }. (להחלפת מסמך שלם השתמשו ב-replaceOne)</pre>

<h4>upsert: עדכן, ואם לא קיים — הכנס</h4>
<pre>db.students.updateOne(
  { _id: 12 },
  { $set: { firstName: "Gal", city: "Eilat" } },
  { upsert: true }
)</pre><pre>// פלט
{ acknowledged: true, matchedCount: 0, modifiedCount: 0, upsertedId: 12 }</pre><pre>db.students.findOne({ _id: 12 })</pre><pre>// פלט
{ _id: 12, firstName: "Gal", city: "Eilat" }</pre>
<p>אין מסמך עם <code>_id: 12</code>, ולכן נוצר מסמך חדש. הוא מורכב משדות השוויון שבתנאי (<code>_id</code>) ומהשדות של <code>$set</code>. אם המסמך היה קיים, היה מתבצע עדכון רגיל. בסימולטור התוצאה מציגה <code>upsertedId: 12</code>. ב-mongosh אמיתי היא נראית כך: <code>{ acknowledged: true, insertedId: 12, matchedCount: 0, modifiedCount: 0, upsertedCount: 1 }</code>.</p>

<h4>replaceOne מול $set</h4>
<pre>db.lecturers.replaceOne(
  { _id: 4 },
  { firstName: "Dana", lastName: "Klein", department: "AI" }
)</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.lecturers.findOne({ _id: 4 })</pre><pre>// פלט
{ _id: 4, firstName: "Dana", lastName: "Klein", department: "AI" }</pre>
<p>השדה <code>seniority</code> <b>נעלם</b>. <code>replaceOne</code> מחליפה את כל המסמך (רק <code>_id</code> נשמר), ובמסמך החדש אסור להשתמש באופרטורים. לעומת זאת, <code>$set</code> משנה רק את השדה שצוין:</p>
<pre>db.lecturers.updateOne({ _id: 4 }, { $set: { department: "AI" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.lecturers.findOne({ _id: 4 })</pre><pre>// פלט
{ _id: 4, firstName: "Dana", lastName: "Klein", department: "AI", seniority: 3 }</pre>

<h4>Delete: deleteOne / deleteMany</h4>
<pre>db.enrollments.deleteOne({ status: "Inactive" })</pre><pre>// פלט
{ acknowledged: true, deletedCount: 1 }</pre><pre>db.enrollments.find({ status: "Inactive" })</pre><pre>// פלט
[
  {
    _id: 15,
    studentId: 9,
    courseId: 5,
    enrollmentDate: ISODate("2025-10-11T00:00:00.000Z"),
    status: "Inactive"
  }
]</pre>
<p><code>deleteOne</code> מחקה רק את ההרשמה הלא-פעילה הראשונה (של Noa, <code>_id: 5</code>). זו של Eyal נשארה.</p>
<pre>db.submissions.deleteMany({ grade: null })</pre><pre>// פלט
{ acknowledged: true, deletedCount: 2 }</pre>
<pre>db.enrollments.deleteMany({})</pre><pre>// פלט
{ acknowledged: true, deletedCount: 15 }</pre>
<div class="callout warn"><code>deleteMany({})</code> מוחק את <b>כל המסמכים</b>, כמו <code>DELETE FROM enrollments</code> בלי WHERE, אבל ה-Collection עצמו נשאר. כדי למחוק את ה-Collection כולו משתמשים ב-<code>db.enrollments.drop()</code>, המקביל ל-<code>DROP TABLE</code>.</div>

<h4>findOneAndUpdate / findOneAndDelete / findOneAndReplace</h4>
<p>אלה פעולות משולבות: הן מוצאות מסמך אחד, משנות או מוחקות אותו, ו<b>מחזירות את המסמך עצמו</b> במקום ספירות. כברירת מחדל מוחזר המסמך <b>לפני</b> השינוי:</p>
<pre>db.submissions.findOneAndUpdate(
  { _id: 8 },
  { $set: { grade: 88, status: "Graded" } }
)</pre><pre>// פלט
{
  _id: 8,
  studentId: 4,
  assignmentId: 1,
  courseId: 1,
  grade: null,
  submissionDate: ISODate("2025-12-30T00:00:00.000Z"),
  status: "Submitted"
}</pre>
<p>עם <code>returnNewDocument: true</code> (או <code>returnDocument: "after"</code>) מוחזר המסמך <b>אחרי</b> העדכון:</p>
<pre>db.submissions.findOneAndUpdate(
  { _id: 8 },
  { $set: { grade: 88, status: "Graded" } },
  { returnNewDocument: true }
)</pre><pre>// פלט
{
  _id: 8,
  studentId: 4,
  assignmentId: 1,
  courseId: 1,
  grade: 88,
  submissionDate: ISODate("2025-12-30T00:00:00.000Z"),
  status: "Graded"
}</pre>
<p>כשכמה מסמכים מתאימים, <code>sort</code> קובע איזה מהם יטופל. כאן נמחקת ההרשמה הלא-פעילה האחרונה, והפקודה מחזירה אותה:</p>
<pre>db.enrollments.findOneAndDelete({ status: "Inactive" }, { sort: { enrollmentDate: -1 } })</pre><pre>// פלט
{
  _id: 15,
  studentId: 9,
  courseId: 5,
  enrollmentDate: ISODate("2025-10-11T00:00:00.000Z"),
  status: "Inactive"
}</pre>
<pre>db.lecturers.findOneAndReplace(
  { _id: 4 },
  { firstName: "Dana", lastName: "Klein", department: "AI", seniority: 4 },
  { returnNewDocument: true }
)</pre><pre>// פלט
{ _id: 4, firstName: "Dana", lastName: "Klein", department: "AI", seniority: 4 }</pre>
<p><code>bulkWrite([ … ])</code> מבצעת כמה פעולות (insertOne, updateOne, deleteOne…) בקריאה אחת, ומשמשת לשיפור ביצועים. היא לא נתמכת בסימולטור של האתר.</p>

<h4>סיכום: מה כל פקודה מחזירה</h4>
<table class="mini">
  <tr><th>פקודה</th><th>ערך מוחזר</th></tr>
  <tr><td dir="ltr">insertOne</td><td dir="ltr">{ acknowledged, insertedId }</td></tr>
  <tr><td dir="ltr">insertMany</td><td dir="ltr">{ acknowledged, insertedIds }</td></tr>
  <tr><td dir="ltr">find</td><td>Cursor: רשימת מסמכים, שאפשר לשרשר עליה sort / limit / skip</td></tr>
  <tr><td dir="ltr">findOne</td><td>מסמך אחד, או <code>null</code></td></tr>
  <tr><td dir="ltr">updateOne / updateMany / replaceOne</td><td><code>{ acknowledged, matchedCount, modifiedCount }</code>. ב-mongosh גם <code>upsertedCount</code>, וב-upsert גם ה-<code>_id</code> של המסמך שנוצר</td></tr>
  <tr><td dir="ltr">deleteOne / deleteMany</td><td dir="ltr">{ acknowledged, deletedCount }</td></tr>
  <tr><td dir="ltr">countDocuments / estimatedDocumentCount</td><td>מספר</td></tr>
  <tr><td dir="ltr">distinct</td><td>מערך של ערכים</td></tr>
  <tr><td dir="ltr">findOneAndUpdate / Delete / Replace</td><td>המסמך עצמו (כברירת מחדל, לפני השינוי)</td></tr>
</table>
`
  },
  {
    id:'nosql-query', track:'nosql', icon:'🔎', title:'שאילתות: אופרטורים, מערכים ו-Projection',
    html:`
<p>ה-filter של <code>find</code> הוא בעצמו מסמך. <b>שוויון</b> כותבים ישירות: <code>{ city: "Haifa" }</code>. לכל תנאי אחר משתמשים ב<b>אופרטור</b> שמתחיל ב-<code>$</code>: <code>{ age: { $gt: 20 } }</code>.</p>

<div class="callout warn">
<b>הכלל הכי חשוב בתחביר: איפה האופרטור נכתב</b><br>
• <b>אופרטור סינון</b> (בשאילתה) נכתב <b>בתוך השדה</b>, בתבנית <code>{ field: { $op: value } }</code>: <code>{ grade: { $gt: 80 } }</code><br>
• <b>אופרטור עדכון</b> נכתב <b>מחוץ לשדה</b>, בתבנית <code>{ $op: { field: value } }</code>: <code>{ $set: { age: 21 } }</code><br>
דרך לזכור: בשאילתה קודם השדה ואחריו האופרטור. בעדכון קודם האופרטור ואחריו השדה.<br>
יוצאים מן הכלל: האופרטורים הלוגיים <code>$and</code> / <code>$or</code> / <code>$nor</code> נכתבים ברמה העליונה של ה-filter, כי הם מחברים תנאים שלמים: <code>{ $or: [ {…}, {…} ] }</code>. לעומתם <code>$not</code> נכתב בתוך השדה.
</div>
<pre>db.submissions.find({ grade: { $gt: 80 } })                       // ✔ סינון — האופרטור בתוך השדה
db.submissions.updateOne({ _id: 8 }, { $set: { grade: 80 } })     // ✔ עדכון — האופרטור בחוץ
db.submissions.find({ $gt: { grade: 80 } })                       // ✘ שגיאה — unknown top level operator</pre>

<h4>אופרטורי השוואה</h4>
<table class="mini">
  <tr><th>אופרטור</th><th>משמעות</th><th>SQL</th><th>דוגמה (מדף הפקודות)</th></tr>
  <tr><td dir="ltr">$eq</td><td>שווה ל-</td><td dir="ltr">=</td><td dir="ltr">{ age: { $eq: 20 } }</td></tr>
  <tr><td dir="ltr">$ne</td><td>לא שווה ל- (כולל מסמכים שאין בהם את השדה!)</td><td dir="ltr">&lt;&gt;</td><td dir="ltr">{ age: { $ne: 20 } }</td></tr>
  <tr><td dir="ltr">$gt / $gte</td><td>גדול מ- / גדול או שווה</td><td dir="ltr">&gt; / &gt;=</td><td dir="ltr">{ grade: { $gt: 80 } }</td></tr>
  <tr><td dir="ltr">$lt / $lte</td><td>קטן מ- / קטן או שווה</td><td dir="ltr">&lt; / &lt;=</td><td dir="ltr">{ grade: { $lt: 60 } }</td></tr>
  <tr><td dir="ltr">$in</td><td>נמצא בתוך רשימה</td><td dir="ltr">IN (…)</td><td dir="ltr">{ city: { $in: ["Tel Aviv","Haifa"] } }</td></tr>
  <tr><td dir="ltr">$nin</td><td>לא נמצא ברשימה (כולל מסמכים שאין בהם את השדה)</td><td dir="ltr">NOT IN (…)</td><td dir="ltr">{ city: { $nin: ["Tel Aviv","Haifa"] } }</td></tr>
</table>
<pre>db.students.find({ age: { $gt: 24 } }, { firstName: 1, age: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "Yossi", age: 25 },
  { firstName: "Itai", age: 27 },
  { firstName: "Eyal", age: 26 }
]</pre>
<p>טווח, המקביל ל-<code>BETWEEN 22 AND 23</code>: שני אופרטורים <b>באותו אובייקט</b> של השדה:</p>
<pre>db.students.find({ age: { $gte: 22, $lte: 23 } }, { firstName: 1, age: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "David", age: 23 },
  { firstName: "Maya", age: 22 },
  { firstName: "Tamar", age: 23 },
  { firstName: "Lior", age: 22 }
]</pre>
<pre>db.students.find({ city: { $in: ["Haifa", "Holon"] } }, { firstName: 1, city: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "Noa", city: "Haifa" },
  { firstName: "Shira", city: "Haifa" },
  { firstName: "Lior", city: "Holon" }
]</pre>
<pre>db.enrollments.find({ status: { $ne: "Active" } }, { studentId: 1, courseId: 1, status: 1 })</pre><pre>// פלט
[
  { _id: 5, studentId: 2, courseId: 4, status: "Inactive" },
  { _id: 15, studentId: 9, courseId: 5, status: "Inactive" }
]</pre>
<p>השוואת <b>תאריכים</b> נעשית מול <code>ISODate(…)</code> ולא מול מחרוזת. כאן מוצגות ההרשמות מ-9/10/2025 ואילך:</p>
<pre>db.enrollments.find(
  { enrollmentDate: { $gte: ISODate("2025-10-09") } },
  { studentId: 1, enrollmentDate: 1 }
)</pre><pre>// פלט
[
  { _id: 12, studentId: 7, enrollmentDate: ISODate("2025-10-09T00:00:00.000Z") },
  { _id: 13, studentId: 7, enrollmentDate: ISODate("2025-10-09T00:00:00.000Z") },
  { _id: 14, studentId: 8, enrollmentDate: ISODate("2025-10-10T00:00:00.000Z") },
  { _id: 15, studentId: 9, enrollmentDate: ISODate("2025-10-11T00:00:00.000Z") }
]</pre>
<p>משימה 2 בשיעור, "הסטודנטים שנרשמו אחרי תאריך מסוים": בשיעור השדה הוא <code>registrationDate</code>, ולכן הפתרון הוא <code>{ registrationDate: { $gt: new Date("2026-01-01") } }</code>. ב-college2 יש שנת הרשמה, ולכן:</p>
<pre>db.students.find({ registrationYear: { $gt: 2024 } }, { firstName: 1, registrationYear: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "Noa", registrationYear: 2025 },
  { firstName: "Maya", registrationYear: 2025 },
  { firstName: "Shira", registrationYear: 2025 },
  { firstName: "Lior", registrationYear: 2025 }
]</pre>
<p>שימו לב: "אחרי" פירושו <code>$gt</code>, ו"מ-… ואילך" פירושו <code>$gte</code>.</p>
<p><b>חודש או שנה מסוימים</b> (המקביל ל-<code>WHERE YEAR(submissionDate) = 2025 AND MONTH(submissionDate) = 11</code>): כותבים טווח, מתחילת החודש (כולל, <code>$gte</code>) ועד תחילת החודש הבא (לא כולל, <code>$lt</code>). כך לא מפספסים הגשה מ-30/11 בשעה 14:00, ש-<code>$lte: ISODate("2025-11-30")</code> היה מפספס:</p>
<pre>db.submissions.find(
  { submissionDate: { $gte: ISODate("2025-11-01"), $lt: ISODate("2025-12-01") } },
  { studentId: 1, submissionDate: 1 }
)</pre><pre>// פלט
[
  { _id: 2, studentId: 1, submissionDate: ISODate("2025-11-14T00:00:00.000Z") },
  { _id: 3, studentId: 1, submissionDate: ISODate("2025-11-28T00:00:00.000Z") },
  { _id: 7, studentId: 3, submissionDate: ISODate("2025-11-29T00:00:00.000Z") },
  { _id: 9, studentId: 4, submissionDate: ISODate("2025-11-13T00:00:00.000Z") },
  { _id: 14, studentId: 7, submissionDate: ISODate("2025-11-30T00:00:00.000Z") },
  { _id: 16, studentId: 8, submissionDate: ISODate("2025-11-10T00:00:00.000Z") }
]</pre>
<p>המקבילה המדויקת ל-<code>YEAR</code> / <code>MONTH</code> היא האופרטורים <code>$year</code> ו-<code>$month</code>. הם ביטויי Aggregation, ולכן בתוך <code>find</code> צריך לעטוף אותם ב-<code>$expr</code>:</p>
<pre>db.submissions.countDocuments({ $expr: { $and: [
  { $eq: [ { $year: "$submissionDate" }, 2025 ] },
  { $eq: [ { $month: "$submissionDate" }, 11 ] }
] } })</pre><pre>// פלט
6</pre>
<div class="callout warn"><b>מלכודת: שני תנאים על אותו שדה בשני מפתחות נפרדים.</b> באובייקט JavaScript המפתח השני <b>דורס</b> את הראשון, ולכן בשאילתה הבאה מתבצע רק <code>$lt: 23</code>. Shira, שהיא בת 20, נכנסת לתוצאה:</div>
<pre>db.students.find({ age: { $gt: 20 }, age: { $lt: 23 } }, { firstName: 1, age: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "Noa", age: 21 },
  { firstName: "Maya", age: 22 },
  { firstName: "Shira", age: 20 },
  { firstName: "Lior", age: 22 }
]</pre>
<p>הכתיבה הנכונה היא <code>{ age: { $gt: 20, $lt: 23 } }</code>, או <code>$and</code> מפורש.</p>

<h4>אופרטורים לוגיים: $and, $or, $nor, $not</h4>
<p><b>AND מרומז:</b> כמה שדות באותו filter מחוברים ב-AND:</p>
<pre>db.students.find({ city: "Tel Aviv", age: { $lt: 25 } }, { firstName: 1, age: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "David", age: 23 },
  { firstName: "Maya", age: 22 }
]</pre>
<p>זה זהה ל-<code>{ $and: [ { city: "Tel Aviv" }, { age: { $lt: 25 } } ] }</code>.</p>
<p><b>$or</b> מקבל <b>מערך</b> של תנאים:</p>
<pre>db.students.find(
  { $or: [ { city: "Haifa" }, { age: { $gt: 25 } } ] },
  { firstName: 1, city: 1, age: 1, _id: 0 }
)</pre><pre>// פלט
[
  { firstName: "Noa", city: "Haifa", age: 21 },
  { firstName: "Shira", city: "Haifa", age: 20 },
  { firstName: "Itai", city: "Tel Aviv", age: 27 },
  { firstName: "Eyal", city: "Jerusalem", age: 26 }
]</pre>
<p><b>מתי חייבים <code>$and</code> מפורש?</b> כשיש שני <code>$or</code>, כי אי אפשר לכתוב את המפתח <code>$or</code> פעמיים באותו אובייקט. בשפת SQL זה <code>(city = 'Tel Aviv' OR city = 'Haifa') AND (age &lt; 21 OR age &gt; 26)</code>:</p>
<pre>db.students.find(
  { $and: [
      { $or: [ { city: "Tel Aviv" }, { city: "Haifa" } ] },
      { $or: [ { age: { $lt: 21 } }, { age: { $gt: 26 } } ] }
  ] },
  { firstName: 1, city: 1, age: 1, _id: 0 }
)</pre><pre>// פלט
[
  { firstName: "Shira", city: "Haifa", age: 20 },
  { firstName: "Itai", city: "Tel Aviv", age: 27 }
]</pre>
<p><b>$nor</b> מחזיר את מה שלא מקיים <b>אף אחד</b> מהתנאים, כמו <code>NOT (A OR B)</code>:</p>
<pre>db.students.find(
  { $nor: [ { city: "Tel Aviv" }, { city: "Haifa" } ] },
  { firstName: 1, city: 1, _id: 0 }
)</pre><pre>// פלט
[
  { firstName: "Yossi", city: "Jerusalem" },
  { firstName: "Omer", city: "Beer Sheva" },
  { firstName: "Tamar", city: "Ramat Gan" },
  { firstName: "Eyal", city: "Jerusalem" },
  { firstName: "Lior", city: "Holon" }
]</pre>
<p><b>$not</b> נכתב בתוך השדה והופך את התנאי:</p>
<pre>db.students.find({ age: { $not: { $gt: 23 } } }, { firstName: 1, age: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "David", age: 23 },
  { firstName: "Noa", age: 21 },
  { firstName: "Maya", age: 22 },
  { firstName: "Shira", age: 20 },
  { firstName: "Tamar", age: 23 },
  { firstName: "Lior", age: 22 }
]</pre>
<p>זה דומה ל-<code>{ age: { $lte: 23 } }</code>, אבל <code>$not</code> מחזיר <b>גם</b> מסמכים שאין בהם את השדה <code>age</code> בכלל.</p>

<h4>אופרטורי אלמנט: $exists ו-$type</h4>
<p><code>$exists</code> בודק אם השדה קיים במסמך, וזה רלוונטי במיוחד בגלל הסכמה הגמישה. אחרי תרגיל 4 רק לסטודנטים מתל אביב יש <code>region</code>:</p>
<pre>db.students.updateMany({ city: "Tel Aviv" }, { $set: { region: "Center" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 3, modifiedCount: 3 }</pre><pre>db.students.find({ region: { $exists: true } }, { firstName: 1, region: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "David", region: "Center" },
  { firstName: "Maya", region: "Center" },
  { firstName: "Itai", region: "Center" }
]</pre>
<p><code>$type</code> בודק את סוג הנתון: <code>"string"</code>, <code>"number"</code> (כל סוג מספרי), <code>"int"</code>, <code>"double"</code>, <code>"date"</code>, <code>"array"</code>, <code>"object"</code>, <code>"bool"</code>, <code>"null"</code>, <code>"objectId"</code>. הדוגמה מדף הפקודות היא <code>{ age: { $type: "int" } }</code>.</p>
<pre>db.submissions.find({ grade: { $type: "null" } }, { studentId: 1, grade: 1 })</pre><pre>// פלט
[
  { _id: 8, studentId: 4, grade: null },
  { _id: 12, studentId: 6, grade: null }
]</pre>

<h4>null מול שדה חסר</h4>
<p>נוסיף הגשה <b>בלי</b> השדה <code>grade</code> בכלל, ונשווה שלושה תנאים:</p>
<pre>db.submissions.insertOne({ _id: 17, studentId: 9, assignmentId: 6, courseId: 5, submissionDate: ISODate("2025-12-16"), status: "Submitted" })</pre><pre>// פלט
{ acknowledged: true, insertedId: 17 }</pre><pre>db.submissions.find({ grade: null }, { grade: 1 })</pre><pre>// פלט
[
  { _id: 8, grade: null },
  { _id: 12, grade: null },
  { _id: 17 }
]</pre><pre>db.submissions.find({ grade: { $exists: false } }, { grade: 1 })</pre><pre>// פלט
[
  { _id: 17 }
]</pre><pre>db.submissions.find({ grade: { $type: "null" } }, { grade: 1 })</pre><pre>// פלט
[
  { _id: 8, grade: null },
  { _id: 12, grade: null }
]</pre>
<table class="mini">
  <tr><th>תנאי</th><th>מה הוא מוצא</th><th>SQL</th></tr>
  <tr><td dir="ltr">{ grade: null }</td><td>ערך <code>null</code> <b>או</b> שדה שלא קיים (8, 12, 17)</td><td dir="ltr">grade IS NULL</td></tr>
  <tr><td dir="ltr">{ grade: { $ne: null } }</td><td>יש ציון אמיתי</td><td dir="ltr">grade IS NOT NULL</td></tr>
  <tr><td dir="ltr">{ grade: { $exists: false } }</td><td>רק מסמכים שאין בהם את השדה (17)</td><td>—</td></tr>
  <tr><td dir="ltr">{ grade: { $type: "null" } }</td><td>רק ערך <code>null</code> מפורש (8, 12)</td><td>—</td></tr>
</table>
<p>משימה 7 בשיעור, "ההגשות שעדיין לא קיבלו ציון", היא <code>db.submissions.find({ grade: null })</code>.</p>

<h4>$regex: חיפוש לפי תבנית (המקביל ל-LIKE)</h4>
<pre>db.students.find({ firstName: { $regex: "^S" } }, { firstName: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "Shira" }
]</pre>
<pre>db.students.find({ lastName: { $regex: "an$" } }, { firstName: 1, lastName: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "Itai", lastName: "Friedman" },
  { firstName: "Tamar", lastName: "Golan" }
]</pre>
<pre>db.students.find({ city: { $regex: "tel", $options: "i" } }, { firstName: 1, city: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "David", city: "Tel Aviv" },
  { firstName: "Maya", city: "Tel Aviv" },
  { firstName: "Itai", city: "Tel Aviv" }
]</pre>
<table class="mini">
  <tr><th>SQL (LIKE)</th><th>MongoDB ($regex)</th><th>משמעות</th></tr>
  <tr><td dir="ltr">LIKE 'S%'</td><td dir="ltr">{ $regex: "^S" }  או  /^S/</td><td>מתחיל ב-S</td></tr>
  <tr><td dir="ltr">LIKE '%an'</td><td dir="ltr">{ $regex: "an$" }</td><td>מסתיים ב-an</td></tr>
  <tr><td dir="ltr">LIKE '%av%'</td><td dir="ltr">{ $regex: "av" }</td><td>מכיל av</td></tr>
  <tr><td dir="ltr">LIKE 'D____'</td><td dir="ltr">{ $regex: "^D.{4}$" }</td><td>D ועוד 4 תווים בדיוק (<code>.</code> = תו אחד)</td></tr>
  <tr><td dir="ltr">LIKE '[0-9]%'</td><td dir="ltr">{ $regex: "^[0-9]" }</td><td>מתחיל בספרה</td></tr>
</table>
<div class="callout warn">ב-MongoDB ההשוואה של מחרוזות (וגם <code>$regex</code>) <b>רגישה לאותיות גדולות וקטנות</b>: <code>"active"</code> שונה מ-<code>"Active"</code>. ב-SQL Server, עם ה-Collation של ברירת המחדל, ההשוואה <b>לא</b> רגישה לרישיות. במונגו מוסיפים <code>$options: "i"</code> כדי להתעלם מרישיות.</div>

<h4>מערכים ומסמכים מוטמעים</h4>
<p><b>Dot notation:</b> פונים לשדה שבתוך מסמך מוטמע או בתוך איברי מערך עם נקודה. במקרה כזה <b>חובה לשים מרכאות</b> סביב שם השדה:</p>
<pre>db.courses.find({ "lessons.title": "JOINs" }, { courseName: 1, _id: 0 })</pre><pre>// פלט
[
  { courseName: "SQL Server" }
]</pre>
<pre>db.courses.find({ "lessons.duration": { $gte: 120 } }, { courseName: 1, _id: 0 })</pre><pre>// פלט
[
  { courseName: "MongoDB" },
  { courseName: "SQL Server" },
  { courseName: "Python" },
  { courseName: "Statistics" }
]</pre>
<p>התנאי מתקיים אם <b>איבר כלשהו</b> במערך עומד בו. <b>$size</b> בודק אורך מדויק של מערך:</p>
<pre>db.courses.find({ lessons: { $size: 3 } }, { courseName: 1, _id: 0 })</pre><pre>// פלט
[
  { courseName: "SQL Server" },
  { courseName: "Statistics" }
]</pre>
<p><code>$size</code> מקבל רק מספר מדויק, ולכן <code>{ $size: { $gte: 3 } }</code> <b>לא חוקי</b>. משימה 3 בשיעור, "קורסים עם לפחות 3 שיעורים", נפתרת אחרת. הדרך הראשונה: בודקים שקיים איבר באינדקס 2, כלומר האיבר השלישי:</p>
<pre>db.courses.find({ "lessons.2": { $exists: true } }, { courseName: 1, _id: 0 })</pre><pre>// פלט
[
  { courseName: "MongoDB" },
  { courseName: "SQL Server" },
  { courseName: "Statistics" }
]</pre>
<p>הדרך השנייה: <code>$expr</code>, שמאפשר להשתמש בביטויי Aggregation בתוך <code>find</code>:</p>
<pre>db.courses.find({ $expr: { $gte: [ { $size: "$lessons" }, 3 ] } }, { courseName: 1, _id: 0 })</pre><pre>// פלט
[
  { courseName: "MongoDB" },
  { courseName: "SQL Server" },
  { courseName: "Statistics" }
]</pre>
<p>מערך ריק:</p>
<pre>db.courses.find({ lessons: { $size: 0 } }, { courseName: 1, _id: 0 })</pre><pre>// פלט
[
  { courseName: "Cyber Security" }
]</pre>

<h4>$elemMatch: כל התנאים על אותו איבר</h4>
<p>זו מלכודת קלאסית. כשכותבים שני תנאים נפרדים על שדות של מערך, כל תנאי יכול להתקיים ב<b>איבר אחר</b>:</p>
<pre>db.courses.find(
  { "lessons.duration": 120, "lessons.title": { $regex: "^P" } },
  { courseName: 1, _id: 0 }
)</pre><pre>// פלט
[
  { courseName: "Python" },
  { courseName: "Statistics" }
]</pre>
<p>Statistics נכנס לתוצאה, כי השיעור Regression נמשך 120 דקות והשיעור Probability מתחיל ב-P. אלה שני שיעורים שונים! עם <code>$elemMatch</code> שני התנאים חייבים להתקיים <b>באותו שיעור</b>:</p>
<pre>db.courses.find(
  { lessons: { $elemMatch: { duration: 120, title: { $regex: "^P" } } } },
  { courseName: 1, _id: 0 }
)</pre><pre>// פלט
[
  { courseName: "Python" }
]</pre>
<p>משימה 4 בשיעור, "קורסים שיש בהם עבודה עם ציון מקסימלי 100": בשיעור העבודות מוטמעות בקורס, ולכן הפתרון הוא <code>db.courses.find({ "assignments.maxGrade": 100 })</code>. ב-college2 העבודות נמצאות ב-Collection נפרד, ולכן הפתרון בשני שלבים:</p>
<pre>const ids = db.assignments.distinct("courseId", { maxGrade: 100 });
db.courses.find({ _id: { $in: ids } }, { courseName: 1 })</pre><pre>// פלט
[
  { _id: 1, courseName: "MongoDB" },
  { _id: 2, courseName: "SQL Server" },
  { _id: 3, courseName: "Python" },
  { _id: 5, courseName: "Statistics" }
]</pre>

<h4>Projection: חוקי ההטלה</h4>
<ul>
  <li><b>הכללה</b> <code>{ firstName: 1, lastName: 1 }</code>: מציגה רק את השדות האלה, ואת <code>_id</code> (אלא אם כתבו <code>_id: 0</code>).</li>
  <li><b>החרגה</b> <code>{ email: 0, phone: 0 }</code>: מציגה הכל חוץ מהשדות האלה.</li>
  <li><b>אסור לערבב</b> 1 ו-0 באותה הטלה. היוצא מן הכלל היחיד הוא <code>_id: 0</code>.</li>
</ul>
<pre>db.students.find({}, { firstName: 1, email: 0 })</pre><pre>// שגיאה
Projection cannot have a mix of inclusion and exclusion.</pre>
<p>במונגו אמיתי ההודעה היא <i>Cannot do exclusion on field email in inclusion projection</i>.</p>
<p>הטלה של שדה בתוך מערך מוטמע:</p>
<pre>db.courses.find({ _id: { $lte: 2 } }, { courseName: 1, "lessons.title": 1, _id: 0 })</pre><pre>// פלט
[
  {
    courseName: "MongoDB",
    lessons: [
      { title: "Intro to NoSQL" },
      { title: "CRUD" },
      { title: "Aggregation" },
      { title: "Indexes" }
    ]
  },
  {
    courseName: "SQL Server",
    lessons: [ { title: "SELECT Basics" }, { title: "JOINs" }, { title: "GROUP BY" } ]
  }
]</pre>
<p><code>$slice</code> בהטלה מציג רק חלק מהמערך. כאן מוצגים 2 השיעורים הראשונים:</p>
<pre>db.courses.find({ _id: 1 }, { courseName: 1, lessons: { $slice: 2 }, _id: 0 })</pre><pre>// פלט
[
  {
    courseName: "MongoDB",
    lessons: [ { title: "Intro to NoSQL", duration: 90 }, { title: "CRUD", duration: 90 } ]
  }
]</pre>

<h4>פקודות על find (Cursor): sort, limit, skip, count, project, explain</h4>
<pre>db.students.find({}, { firstName: 1, age: 1, _id: 0 }).sort({ age: -1 }).limit(3)</pre><pre>// פלט
[
  { firstName: "Itai", age: 27 },
  { firstName: "Eyal", age: 26 },
  { firstName: "Yossi", age: 25 }
]</pre>
<pre>-- המקבילה ב-SQL Server
SELECT TOP 3 firstName, age FROM students ORDER BY age DESC;</pre>
<ul>
  <li><code>sort</code>: <code>1</code> הוא סדר עולה (ASC) ו-<code>-1</code> הוא סדר יורד (DESC). אפשר כמה מפתחות: <code>{ city: 1, age: -1 }</code>.</li>
  <li>MongoDB תמיד מבצע קודם <b>sort</b>, אחר כך <b>skip</b>, ובסוף <b>limit</b>, בלי קשר לסדר שבו כתבתם אותם. גם <code>.limit(3).sort({ age: -1 })</code> מחזיר את 3 המבוגרים ביותר.</li>
</ul>
<pre>db.students.find({}, { firstName: 1, city: 1, age: 1, _id: 0 }).sort({ city: 1, age: -1 }).limit(5)</pre><pre>// פלט
[
  { firstName: "Omer", city: "Beer Sheva", age: 24 },
  { firstName: "Noa", city: "Haifa", age: 21 },
  { firstName: "Shira", city: "Haifa", age: 20 },
  { firstName: "Lior", city: "Holon", age: 22 },
  { firstName: "Eyal", city: "Jerusalem", age: 26 }
]</pre>
<p><b>דפדוף (Pagination)</b> עם <code>skip</code>: עמוד מספר <i>p</i> בגודל <i>n</i> הוא <code>skip((p-1)*n).limit(n)</code>. כאן מוצג עמוד 2 בגודל 3:</p>
<pre>db.students.find({}, { firstName: 1 }).sort({ _id: 1 }).skip(3).limit(3)</pre><pre>// פלט
[
  { _id: 4, firstName: "Maya" },
  { _id: 5, firstName: "Omer" },
  { _id: 6, firstName: "Shira" }
]</pre>
<p><code>.count()</code> על Cursor היא דרך ישנה (deprecated). עדיף להשתמש ב-<code>countDocuments</code>:</p>
<pre>db.students.find({ city: "Tel Aviv" }).count()</pre><pre>// פלט
3</pre>
<p><code>.project()</code> היא דרך חלופית לכתוב את ההטלה:</p>
<pre>db.students.find({ city: "Haifa" }).project({ firstName: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "Noa" },
  { firstName: "Shira" }
]</pre>
<p><code>.explain()</code> מראה <b>איך</b> MongoDB ביצע את השאילתה, ומשמשת לבדיקת ביצועים ואינדקסים. <code>COLLSCAN</code> פירושו סריקה של כל ה-Collection, ו-<code>IXSCAN</code> פירושו שימוש באינדקס, למשל אחרי <code>db.students.createIndex({ city: 1 })</code>:</p>
<pre>db.students.find({ city: "Haifa" }).explain("executionStats")</pre>
`
  },
  {
    id:'nosql-update', track:'nosql', icon:'🔧', title:'אופרטורי עדכון ומערכים',
    html:`
<p>אופרטורי עדכון נכתבים <b>מחוץ לשדה</b>: <code>{ $op: { field: value } }</code>. אפשר לשלב כמה אופרטורים בעדכון אחד, למשל <code>{ $set: {…}, $inc: {…} }</code>, כל עוד כל שדה מופיע רק באופרטור אחד. בכל דוגמה מוצג קודם הערך שהפקודה מחזירה, ואחריו מצב המסמך <b>אחרי</b> העדכון. כל דוגמה מתחילה מהנתונים המקוריים.</p>
<table class="mini">
  <tr><th>אופרטור</th><th>מה הוא עושה</th><th>דוגמה</th><th>מקבילה ב-SQL</th></tr>
  <tr><td dir="ltr">$set</td><td>משנה ערך, או מוסיף שדה חדש</td><td dir="ltr">{ $set: { age: 21 } }</td><td dir="ltr">SET age = 21</td></tr>
  <tr><td dir="ltr">$unset</td><td>מוחק את השדה מהמסמך</td><td dir="ltr">{ $unset: { age: "" } }</td><td>(בערך) <code>SET age = NULL</code></td></tr>
  <tr><td dir="ltr">$inc</td><td>מגדיל או מקטין מספר</td><td dir="ltr">{ $inc: { grade: 5 } }</td><td dir="ltr">SET grade = grade + 5</td></tr>
  <tr><td dir="ltr">$mul</td><td>מכפיל ערך מספרי</td><td dir="ltr">{ $mul: { price: 1.1 } }</td><td dir="ltr">SET price = price * 1.1</td></tr>
  <tr><td dir="ltr">$min / $max</td><td>מעדכן רק אם הערך החדש קטן / גדול יותר</td><td dir="ltr">{ $max: { grade: 70 } }</td><td><code>CASE WHEN</code> בתוך SET</td></tr>
  <tr><td dir="ltr">$rename</td><td>משנה שם של שדה</td><td dir="ltr">{ $rename: { oldName: "newName" } }</td><td dir="ltr">sp_rename</td></tr>
  <tr><td dir="ltr">$currentDate</td><td>מכניס את התאריך הנוכחי</td><td dir="ltr">{ $currentDate: { lastModified: true } }</td><td dir="ltr">SET lastModified = GETDATE()</td></tr>
</table>

<h4>$set: שינוי או הוספה של שדות</h4>
<pre>db.students.updateOne({ _id: 3 }, { $set: { city: "Tel Aviv", age: 26 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 3 }, { firstName: 1, city: 1, age: 1, _id: 0 })</pre><pre>// פלט
{ firstName: "Yossi", city: "Tel Aviv", age: 26 }</pre>
<p>לפני העדכון Yossi גר ב-Jerusalem והיה בן 25. <code>$set</code> עם dot notation יוצר <b>מסמך מוטמע</b> אם הוא לא קיים:</p>
<pre>db.students.updateOne({ _id: 1 }, { $set: { "address.street": "Herzl 1", "address.zip": "61000" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 }, { firstName: 1, address: 1, _id: 0 })</pre><pre>// פלט
{ firstName: "David", address: { street: "Herzl 1", zip: "61000" } }</pre>

<h4>$unset: מחיקת שדה</h4>
<pre>db.students.updateOne({ _id: 1 }, { $unset: { phone: "" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 })</pre><pre>// פלט
{
  _id: 1,
  firstName: "David",
  lastName: "Levi",
  email: "david@gmail.com",
  city: "Tel Aviv",
  age: 23,
  registrationYear: 2024
}</pre>
<p>הערך שכותבים ב-<code>$unset</code> (כאן <code>""</code>) לא משנה. השדה <code>phone</code> נעלם מהמסמך לגמרי. זה שונה מ-<code>SET phone = NULL</code> ב-SQL, שבו העמודה נשארת והערך הופך ל-NULL.</p>

<h4>$inc: הגדלה והקטנה</h4>
<pre>db.lecturers.updateMany({}, { $inc: { seniority: 1 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 4, modifiedCount: 4 }</pre><pre>db.lecturers.find({}, { firstName: 1, seniority: 1, _id: 0 })</pre><pre>// פלט
[
  { firstName: "Moshe", seniority: 13 },
  { firstName: "Rina", seniority: 8 },
  { firstName: "Avi", seniority: 16 },
  { firstName: "Dana", seniority: 4 }
]</pre>
<p>לפני העדכון הוותק היה 12, 7, 15 ו-3. ב-SQL זה <code>UPDATE lecturers SET seniority = seniority + 1;</code>. כדי להקטין משתמשים במספר שלילי: <code>{ $inc: { seniority: -1 } }</code>. אם השדה לא קיים, <code>$inc</code> יוצר אותו עם הערך שניתן:</p>
<pre>db.students.updateOne({ _id: 3 }, { $inc: { credits: 4 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 3 }, { firstName: 1, credits: 1, _id: 0 })</pre><pre>// פלט
{ firstName: "Yossi", credits: 4 }</pre>

<h4>$mul: הכפלה</h4>
<pre>db.assignments.updateOne({ _id: 5 }, { $mul: { maxGrade: 1.25 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.assignments.findOne({ _id: 5 }, { title: 1, maxGrade: 1, _id: 0 })</pre><pre>// פלט
{ title: "Market Research", maxGrade: 100 }</pre>
<p>הציון המקסימלי היה 80, ואחרי ההכפלה ב-1.25 הוא 100.</p>

<h4>$max ו-$min: עדכון מותנה</h4>
<p>שימושי כשרוצים לשמור, למשל, את הציון הטוב ביותר. בהגשה 7 הציון הוא 65:</p>
<pre>db.submissions.updateOne({ _id: 7 }, { $max: { grade: 70 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.submissions.updateOne({ _id: 7 }, { $max: { grade: 60 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 0 }</pre><pre>db.submissions.findOne({ _id: 7 }, { grade: 1 })</pre><pre>// פלט
{ _id: 7, grade: 70 }</pre>
<p>70 גדול מ-65, ולכן הציון עודכן. 60 קטן מ-70, ולכן לא היה שינוי (<code>modifiedCount: 0</code>). <code>$min</code> עובד הפוך: הוא מעדכן רק אם הערך החדש <b>קטן</b> יותר.</p>

<h4>$rename: שינוי שם של שדה</h4>
<pre>db.students.updateMany({}, { $rename: { registrationYear: "startYear" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 10, modifiedCount: 10 }</pre><pre>db.students.findOne({ _id: 1 })</pre><pre>// פלט
{
  _id: 1,
  firstName: "David",
  lastName: "Levi",
  email: "david@gmail.com",
  phone: "0501234567",
  city: "Tel Aviv",
  age: 23,
  startYear: 2024
}</pre>

<h4>$currentDate: תאריך נוכחי</h4>
<pre>db.submissions.updateOne({ _id: 8 }, { $currentDate: { lastModified: true } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre>
<p>המסמך מקבל שדה <code>lastModified</code> עם התאריך והשעה של רגע העדכון (<code>ISODate(…)</code>), בדומה ל-<code>GETDATE()</code> ב-SQL Server.</p>

<h4>שילוב כמה אופרטורים בעדכון אחד</h4>
<pre>db.lecturers.updateOne({ _id: 4 }, { $set: { department: "AI" }, $inc: { seniority: 2 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.lecturers.findOne({ _id: 4 })</pre><pre>// פלט
{ _id: 4, firstName: "Dana", lastName: "Klein", department: "AI", seniority: 5 }</pre>

<h4>עבודה עם מערכים</h4>
<table class="mini">
  <tr><th>אופרטור</th><th>מה הוא עושה</th><th>למה צריך אותו</th></tr>
  <tr><td dir="ltr">$push</td><td>מוסיף איבר למערך (גם אם הוא כבר קיים בו)</td><td>הוספת קורס או שיעור</td></tr>
  <tr><td dir="ltr">$addToSet</td><td>מוסיף איבר רק אם הוא לא קיים</td><td>מניעת כפילויות</td></tr>
  <tr><td dir="ltr">$pop</td><td>מוחק איבר מהסוף (<code>1</code>) או מההתחלה (<code>-1</code>)</td><td>הסרת איבר</td></tr>
  <tr><td dir="ltr">$pull</td><td>מוחק את כל האיברים שעומדים בתנאי</td><td>מחיקה לפי תנאי</td></tr>
  <tr><td dir="ltr">$pullAll</td><td>מוחק כמה ערכים ספציפיים</td><td>הסרה של כמה ערכים</td></tr>
  <tr><td dir="ltr">$each</td><td>מאפשר להוסיף כמה איברים בפעולה אחת (עם $push / $addToSet)</td><td>הוספה מרובה</td></tr>
  <tr><td dir="ltr">$position</td><td>קובע באיזה מיקום להכניס (עם $push + $each)</td><td>הכנסה למקום מסוים</td></tr>
  <tr><td dir="ltr">$slice</td><td>מגביל את גודל המערך אחרי ההוספה (עם $push + $each)</td><td>שמירה של N האיברים האחרונים</td></tr>
</table>

<h4>$push</h4>
<p>הוספת שיעור לקורס Marketing, שיש בו שיעור אחד:</p>
<pre>db.courses.updateOne({ _id: 4 }, { $push: { lessons: { title: "Branding", duration: 60 } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.courses.findOne({ _id: 4 }, { courseName: 1, lessons: 1, _id: 0 })</pre><pre>// פלט
{
  courseName: "Marketing",
  lessons: [ { title: "Market Analysis", duration: 90 }, { title: "Branding", duration: 60 } ]
}</pre>
<p>אם המערך לא קיים, <code>$push</code> יוצר אותו:</p>
<pre>db.students.updateOne({ _id: 1 }, { $push: { skills: "SQL" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 }, { firstName: 1, skills: 1, _id: 0 })</pre><pre>// פלט
{ firstName: "David", skills: [ "SQL" ] }</pre>

<h4>$addToSet מול $push</h4>
<pre>db.students.updateOne({ _id: 1 }, { $push: { skills: "SQL" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.updateOne({ _id: 1 }, { $addToSet: { skills: "SQL" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 0 }</pre><pre>db.students.updateOne({ _id: 1 }, { $push: { skills: "SQL" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 }, { skills: 1, _id: 0 })</pre><pre>// פלט
{ skills: [ "SQL", "SQL" ] }</pre>
<p>ה-<code>$addToSet</code> לא שינה כלום (<code>modifiedCount: 0</code>), כי "SQL" כבר היה במערך. ה-<code>$push</code> השני הוסיף <b>כפילות</b>.</p>

<h4>$each: כמה איברים בבת אחת</h4>
<pre>db.students.updateOne({ _id: 1 }, { $push: { skills: { $each: ["SQL", "Python", "MongoDB"] } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 }, { skills: 1, _id: 0 })</pre><pre>// פלט
{ skills: [ "SQL", "Python", "MongoDB" ] }</pre>
<div class="callout warn"><b>טעות נפוצה:</b> בלי <code>$each</code>, המערך כולו נכנס כ<b>איבר אחד</b>, ונוצר מערך בתוך מערך:</div>
<pre>db.students.updateOne({ _id: 1 }, { $push: { skills: ["Python", "MongoDB"] } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 }, { skills: 1, _id: 0 })</pre><pre>// פלט
{ skills: [ [ "Python", "MongoDB" ] ] }</pre>
<p>עם <code>$addToSet</code> + <code>$each</code> נוספים רק הערכים החדשים:</p>
<pre>db.students.updateOne({ _id: 1 }, { $push: { skills: { $each: ["SQL", "Python"] } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.updateOne({ _id: 1 }, { $addToSet: { skills: { $each: ["Python", "Excel"] } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 }, { skills: 1, _id: 0 })</pre><pre>// פלט
{ skills: [ "SQL", "Python", "Excel" ] }</pre>

<h4>$position: הכנסה במיקום מסוים</h4>
<pre>db.courses.updateOne(
  { _id: 3 },
  { $push: { lessons: { $each: [ { title: "Welcome", duration: 30 } ], $position: 0 } } }
)</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.courses.findOne({ _id: 3 }, { lessons: 1, _id: 0 })</pre><pre>// פלט
{
  lessons: [
    { title: "Welcome", duration: 30 },
    { title: "Python Basics", duration: 90 },
    { title: "Pandas", duration: 120 }
  ]
}</pre>

<h4>$slice: הגבלת גודל המערך</h4>
<pre>db.students.updateOne({ _id: 1 }, { $push: { skills: { $each: ["SQL", "Python", "MongoDB"] } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.updateOne({ _id: 1 }, { $push: { skills: { $each: ["Excel"], $slice: -3 } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 }, { skills: 1, _id: 0 })</pre><pre>// פלט
{ skills: [ "Python", "MongoDB", "Excel" ] }</pre>
<p><code>$slice: -3</code> משאיר את 3 האיברים <b>האחרונים</b>, ו-<code>$slice: 3</code> משאיר את 3 הראשונים. <code>$slice</code> ו-<code>$position</code> עובדים רק יחד עם <code>$each</code>.</p>

<h4>$pop: הסרה מההתחלה או מהסוף</h4>
<pre>db.courses.updateOne({ _id: 1 }, { $pop: { lessons: 1 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.courses.findOne({ _id: 1 }, { lessons: 1, _id: 0 })</pre><pre>// פלט
{
  lessons: [
    { title: "Intro to NoSQL", duration: 90 },
    { title: "CRUD", duration: 90 },
    { title: "Aggregation", duration: 120 }
  ]
}</pre>
<p>השיעור האחרון (Indexes) הוסר. <code>{ $pop: { lessons: -1 } }</code> היה מסיר את הראשון.</p>

<h4>$pull: הסרה לפי תנאי</h4>
<pre>db.courses.updateOne({ _id: 1 }, { $pull: { lessons: { duration: { $lt: 90 } } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.courses.findOne({ _id: 1 }, { lessons: 1, _id: 0 })</pre><pre>// פלט
{
  lessons: [
    { title: "Intro to NoSQL", duration: 90 },
    { title: "CRUD", duration: 90 },
    { title: "Aggregation", duration: 120 }
  ]
}</pre>
<p>במערך של ערכים פשוטים, <code>$pull</code> מוחק <b>את כל המופעים</b> של הערך:</p>
<pre>db.students.updateOne({ _id: 1 }, { $push: { skills: { $each: ["SQL", "Python", "SQL"] } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.updateOne({ _id: 1 }, { $pull: { skills: "SQL" } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 }, { skills: 1, _id: 0 })</pre><pre>// פלט
{ skills: [ "Python" ] }</pre>
<p>אפשר להריץ <code>$pull</code> גם על כל ה-Collection. כאן מוסרים מכל הקורסים השיעורים שנמשכים 120 דקות:</p>
<pre>db.courses.updateMany({}, { $pull: { lessons: { duration: 120 } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 6, modifiedCount: 4 }</pre>
<p><code>matchedCount: 6</code>, כי <code>{}</code> מתאים לכל הקורסים. <code>modifiedCount: 4</code>, כי רק בארבעה קורסים היה שיעור של 120 דקות.</p>

<h4>$pullAll: הסרה של כמה ערכים ספציפיים</h4>
<pre>db.students.updateOne({ _id: 1 }, { $push: { skills: { $each: ["SQL", "Python", "MongoDB", "Excel"] } } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.updateOne({ _id: 1 }, { $pullAll: { skills: ["SQL", "Excel"] } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.students.findOne({ _id: 1 }, { skills: 1, _id: 0 })</pre><pre>// פלט
{ skills: [ "Python", "MongoDB" ] }</pre>

<h4>עדכון איבר בתוך מערך מוטמע</h4>
<p><b>לפי אינדקס:</b> <code>"lessons.0.duration"</code> הוא השדה duration של השיעור הראשון:</p>
<pre>db.courses.updateOne({ _id: 2 }, { $set: { "lessons.0.duration": 100 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.courses.findOne({ _id: 2 }, { lessons: 1, _id: 0 })</pre><pre>// פלט
{
  lessons: [
    { title: "SELECT Basics", duration: 100 },
    { title: "JOINs", duration: 120 },
    { title: "GROUP BY", duration: 90 }
  ]
}</pre>
<p><b>כל האיברים:</b> <code>$[]</code> פונה לכל איבר במערך. כאן מוסיפים 10 דקות לכל שיעור:</p>
<pre>db.courses.updateOne({ _id: 2 }, { $inc: { "lessons.$[].duration": 10 } })</pre><pre>// פלט
{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }</pre><pre>db.courses.findOne({ _id: 2 }, { lessons: 1, _id: 0 })</pre><pre>// פלט
{
  lessons: [
    { title: "SELECT Basics", duration: 100 },
    { title: "JOINs", duration: 130 },
    { title: "GROUP BY", duration: 100 }
  ]
}</pre>
<p><b>האיבר שנמצא בסינון:</b> האופרטור הפוזיציוני <code>$</code> פונה לאיבר הראשון שהתאים לתנאי של ה-filter. הוא עובד במונגו אמיתי, אבל לא נתמך בסימולטור של האתר:</p>
<pre>db.courses.updateOne(
  { _id: 2, "lessons.title": "JOINs" },
  { $set: { "lessons.$.duration": 150 } }      // $ = השיעור שנמצא ב-filter (JOINs)
)</pre>
`
  },
  {
    id:'nosql-agg', track:'nosql', icon:'📊', title:'Aggregation Pipeline: קיבוץ, JOIN ועיבוד',
    html:`
<p><code>aggregate</code> מקבלת <b>מערך של שלבים</b> (stages). המסמכים עוברים מהשלב הראשון לאחרון, כמו בפס ייצור: הפלט של כל שלב הוא הקלט של השלב הבא. לכן <b>הסדר קובע</b>. כך מתרגמים את החלקים של שאילתת SQL:</p>
<pre>db.submissions.aggregate([
  { $match:   { … } },   // 1. סינון שורות          ← WHERE
  { $group:   { … } },   // 2. קיבוץ + חישובים       ← GROUP BY + COUNT/AVG/…
  { $match:   { … } },   // 3. סינון קבוצות          ← HAVING
  { $lookup:  { … } },   // 4. צירוף Collection אחר  ← JOIN
  { $unwind:  "$…" },    //    פירוק המערך שנוצר
  { $project: { … } },   // 5. עיצוב הפלט            ← SELECT (עמודות, כינויים, חישובים)
  { $sort:    { … } },   // 6. מיון                  ← ORDER BY
  { $limit:   3 }        // 7. הגבלה                 ← TOP 3
])</pre>
<ul>
  <li>מתי להשתמש ב-<b>find</b>: סינון, הטלה, מיון והגבלה על Collection אחד.</li>
  <li>מתי להשתמש ב-<b>aggregate</b>: כשיש קיבוץ (ספירות, ממוצעים), צירוף של כמה Collections, חישוב שדות חדשים, או שינוי של מבנה המסמך. זה בדיוק מה שהמרצה ביקש להסביר בכל תרגיל: <i>למה find ולמה aggregate</i>.</li>
  <li>כדאי לשים <code>$match</code> <b>מוקדם ככל האפשר</b>, כדי להקטין את מספר המסמכים ולאפשר שימוש באינדקס.</li>
  <li>אחרי <code>$group</code> נשארים <b>רק</b> השדה <code>_id</code> והשדות שחושבו. שאר השדות נעלמים, בדיוק כמו ב-SQL, שבו אחרי GROUP BY אפשר לבחור רק את עמודות הקיבוץ ופונקציות צבירה.</li>
</ul>

<h4>השלבים (Stages)</h4>
<table class="mini">
  <tr><th>Stage</th><th>מה הוא עושה</th><th>מקבילה ב-SQL</th></tr>
  <tr><td dir="ltr">$match</td><td>מסנן מסמכים, עם אותו תחביר כמו filter של find</td><td>WHERE (או HAVING, אם הוא בא אחרי $group)</td></tr>
  <tr><td dir="ltr">$project</td><td>בוחר שדות, משנה שמות ויוצר שדות מחושבים</td><td>רשימת העמודות ב-SELECT</td></tr>
  <tr><td dir="ltr">$group</td><td>מקבץ לפי <code>_id</code> ומחשב סכום, ממוצע וכו'</td><td>GROUP BY + פונקציות צבירה</td></tr>
  <tr><td dir="ltr">$sort / $limit / $skip</td><td>מיון, הגבלה, דילוג</td><td>ORDER BY / TOP / OFFSET</td></tr>
  <tr><td dir="ltr">$count</td><td>מחזיר מסמך אחד עם מספר המסמכים שהגיעו לשלב</td><td dir="ltr">SELECT COUNT(*) AS …</td></tr>
  <tr><td dir="ltr">$unwind</td><td>מפרק מערך: מסמך נפרד לכל איבר</td><td>(שימושי אחרי JOIN)</td></tr>
  <tr><td dir="ltr">$lookup</td><td>מצרף Collection אחר. התוצאה היא <b>מערך</b></td><td>LEFT OUTER JOIN</td></tr>
  <tr><td dir="ltr">$addFields / $set</td><td>מוסיף או משנה שדות, ושומר את כל השאר</td><td>עמודה מחושבת בנוסף ל-*</td></tr>
  <tr><td dir="ltr">$unset</td><td>מסיר שדות</td><td>—</td></tr>
  <tr><td dir="ltr">$replaceRoot / $replaceWith</td><td>מחליף את המסמך כולו במסמך מקונן</td><td>—</td></tr>
  <tr><td dir="ltr">$facet</td><td>מריץ כמה pipelines במקביל על אותם מסמכים</td><td>כמה שאילתות בבת אחת</td></tr>
  <tr><td dir="ltr">$out / $merge</td><td>שומר את התוצאה ב-Collection (חייב להיות השלב האחרון)</td><td dir="ltr">SELECT … INTO</td></tr>
</table>

<h4>פונקציות חישוב בתוך $group (Accumulators)</h4>
<table class="mini">
  <tr><th>Accumulator</th><th>משמעות</th><th>דוגמה</th></tr>
  <tr><td dir="ltr">$sum</td><td>סכום. <code>$sum: 1</code> סופר מסמכים, כמו <code>COUNT(*)</code></td><td dir="ltr">{ $sum: "$grade" }  /  { $sum: 1 }</td></tr>
  <tr><td dir="ltr">$avg</td><td>ממוצע. מתעלם מ-null ומשדות חסרים, כמו AVG</td><td dir="ltr">{ $avg: "$grade" }</td></tr>
  <tr><td dir="ltr">$min / $max</td><td>מינימום / מקסימום</td><td dir="ltr">{ $max: "$grade" }</td></tr>
  <tr><td dir="ltr">$count</td><td>ספירה. זהה ל-<code>$sum: 1</code> (MongoDB 5.0 ומעלה)</td><td dir="ltr">{ $count: {} }</td></tr>
  <tr><td dir="ltr">$first / $last</td><td>הערך הראשון / האחרון בקבוצה. תלוי בסדר, ולכן צריך <code>$sort</code> לפניו</td><td dir="ltr">{ $first: "$courseId" }</td></tr>
  <tr><td dir="ltr">$push</td><td>יוצר מערך מכל הערכים (כולל כפילויות)</td><td dir="ltr">{ $push: "$grade" }</td></tr>
  <tr><td dir="ltr">$addToSet</td><td>יוצר מערך של ערכים ייחודיים</td><td dir="ltr">{ $addToSet: "$courseId" }</td></tr>
</table>

<h4>החוקים של _id ב-$group</h4>
<ul>
  <li><code>_id: "$courseId"</code> מקבץ לפי השדה, כמו <code>GROUP BY courseId</code>. ה-<code>$</code> פירושו "הערך של השדה". <b>בלי <code>$</code> זו סתם מחרוזת קבועה!</b></li>
  <li><code>_id: null</code> יוצר קבוצה אחת לכל המסמכים, כמו פונקציית צבירה בלי GROUP BY.</li>
  <li><b>מפתח מורכב</b> <code>_id: { courseId: "$courseId", status: "$status" }</code> שקול ל-<code>GROUP BY courseId, status</code>.</li>
  <li>המפתח נשמר בשדה <code>_id</code> של התוצאה. כדי לתת לו שם אחר מוסיפים אחר כך <code>$project: { courseId: "$_id", _id: 0 }</code>.</li>
</ul>

<h4>דוגמה 1: כמה סטודנטים רשומים לכל קורס (תרגיל 6 בעבודה)</h4>
<pre>db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])</pre><pre>// פלט
[
  { _id: 1, studentsCount: 5 },
  { _id: 2, studentsCount: 3 },
  { _id: 3, studentsCount: 2 },
  { _id: 4, studentsCount: 2 },
  { _id: 5, studentsCount: 3 }
]</pre>
<pre>-- SQL
SELECT courseId, COUNT(*) AS studentsCount
FROM enrollments
GROUP BY courseId
ORDER BY courseId;</pre>
<p>קורס 6 (Cyber Security) לא מופיע, כי אין לו אף הרשמה. <code>$group</code> יוצר קבוצות רק מהמסמכים שקיימים. כדי לקבל גם קורסים עם 0 צריך להתחיל מ-<code>courses</code> ולהשתמש ב-<code>$lookup</code> (ראו דוגמה 10).</p>

<h4>דוגמה 2: HAVING = $match אחרי $group (תרגיל 7 בעבודה)</h4>
<pre>db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $match: { studentsCount: { $gt: 2 } } },
  { $sort: { _id: 1 } }
])</pre><pre>// פלט
[
  { _id: 1, studentsCount: 5 },
  { _id: 2, studentsCount: 3 },
  { _id: 5, studentsCount: 3 }
]</pre>
<p>ה-<code>$match</code> השני פונה לשדה <b>החדש</b> <code>studentsCount</code>, שנוצר ב-<code>$group</code>. זה המקביל ל-<code>HAVING COUNT(*) &gt; 2</code>.</p>

<h4>דוגמה 3: _id: null, חישוב על כל ה-Collection</h4>
<pre>db.submissions.aggregate([
  { $group: { _id: null, total: { $sum: 1 }, avgGrade: { $avg: "$grade" }, maxGrade: { $max: "$grade" } } }
])</pre><pre>// פלט
[
  { _id: null, total: 16, avgGrade: 81.85714285714286, maxGrade: 100 }
]</pre>
<p>יש 16 הגשות, אבל הממוצע חושב רק על 14 הציונים הקיימים (1146 / 14), כי <code>$avg</code> מתעלם מ-<code>null</code>, בדיוק כמו <code>AVG</code> ב-SQL.</p>

<h4>דוגמה 4: סטטיסטיקה לכל קורס (תרגיל 9 בעבודה), ומלכודת ה-null</h4>
<pre>db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      averageGrade: { $avg: "$grade" },
      maxGrade: { $max: "$grade" },
      minGrade: { $min: "$grade" },
      submissionsCount: { $sum: 1 }
  } },
  { $project: {
      _id: 0,
      courseId: "$_id",
      averageGrade: { $round: ["$averageGrade", 2] },
      maxGrade: "$maxGrade",
      minGrade: "$minGrade",
      submissionsCount: "$submissionsCount"
  } },
  { $sort: { courseId: 1 } }
])</pre><pre>// פלט
[
  { courseId: 1, averageGrade: 83, maxGrade: 100, minGrade: 60, submissionsCount: 7 },
  { courseId: 2, averageGrade: 75, maxGrade: 88, minGrade: 65, submissionsCount: 3 },
  { courseId: 3, averageGrade: 91, maxGrade: 92, minGrade: 90, submissionsCount: 2 },
  { courseId: 4, averageGrade: 70, maxGrade: 70, minGrade: 70, submissionsCount: 2 },
  { courseId: 5, averageGrade: 85.5, maxGrade: 90, minGrade: 81, submissionsCount: 2 }
]</pre>
<p>ה-<code>$project</code> מעביר את מפתח הקיבוץ מ-<code>_id</code> לשדה בשם <code>courseId</code>, בדיוק בפורמט שהמרצה ביקש בתרגיל 9 (<code>courseId, averageGrade, maxGrade, minGrade, submissionsCount</code>). ה-<code>$sort</code> בא אחרי ה-<code>$project</code>, ולכן הוא ממיין לפי השם החדש.</p>
<div class="callout warn">בקורס 1 יש 7 הגשות (<code>$sum: 1</code> סופר גם את ההגשה בלי ציון), אבל הממוצע 83 מחושב על 6 ציונים בלבד. זה ההבדל בין <code>COUNT(*)</code> ל-<code>COUNT(grade)</code>. כדי לספור רק הגשות שנבדקו, מסננים קודם (<code>$match: { grade: { $ne: null } }</code>) או משתמשים בספירה מותנית:</div>
<pre>db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      all: { $sum: 1 },
      graded: { $sum: { $cond: [ { $ne: ["$grade", null] }, 1, 0 ] } }
  } },
  { $sort: { _id: 1 } }
])</pre><pre>// פלט
[
  { _id: 1, all: 7, graded: 6 },
  { _id: 2, all: 3, graded: 3 },
  { _id: 3, all: 2, graded: 2 },
  { _id: 4, all: 2, graded: 1 },
  { _id: 5, all: 2, graded: 2 }
]</pre>

<h4>דוגמה 5: מפתח קיבוץ מורכב</h4>
<pre>db.enrollments.aggregate([
  { $group: { _id: { courseId: "$courseId", status: "$status" }, n: { $sum: 1 } } },
  { $sort: { "_id.courseId": 1, "_id.status": 1 } }
])</pre><pre>// פלט
[
  { _id: { courseId: 1, status: "Active" }, n: 5 },
  { _id: { courseId: 2, status: "Active" }, n: 3 },
  { _id: { courseId: 3, status: "Active" }, n: 2 },
  { _id: { courseId: 4, status: "Active" }, n: 1 },
  { _id: { courseId: 4, status: "Inactive" }, n: 1 },
  { _id: { courseId: 5, status: "Active" }, n: 2 },
  { _id: { courseId: 5, status: "Inactive" }, n: 1 }
]</pre>

<h4>דוגמה 6: $push ו-$addToSet</h4>
<pre>db.submissions.aggregate([
  { $group: { _id: "$studentId", courses: { $addToSet: "$courseId" }, grades: { $push: "$grade" } } },
  { $sort: { _id: 1 } }
])</pre><pre>// פלט
[
  { _id: 1, courses: [ 1, 2, 3 ], grades: [ 95, 80, 88, 92 ] },
  { _id: 2, courses: [ 1, 4 ], grades: [ 78, 70 ] },
  { _id: 3, courses: [ 2 ], grades: [ 65 ] },
  { _id: 4, courses: [ 1, 3 ], grades: [ null, 85, 90 ] },
  { _id: 5, courses: [ 5 ], grades: [ 90 ] },
  { _id: 6, courses: [ 4 ], grades: [ null ] },
  { _id: 7, courses: [ 1, 2, 5 ], grades: [ 100, 72, 81 ] },
  { _id: 8, courses: [ 1 ], grades: [ 60 ] }
]</pre>
<p><code>$push</code> שומר כל ערך (גם כפילויות וגם <code>null</code>), ו-<code>$addToSet</code> שומר כל ערך פעם אחת. סדר האיברים ב-<code>$addToSet</code> לא מובטח.</p>

<h4>JOIN = $lookup + $unwind</h4>
<pre>{ $lookup: {
    from: "students",          // ה-Collection שמצרפים (הטבלה השנייה ב-JOIN)
    localField: "studentId",   // השדה במסמך הנוכחי (ה-FK)
    foreignField: "_id",       // השדה ב-Collection השני (ה-PK)
    as: "student"              // שם השדה החדש — תמיד מערך!
} }</pre>
<pre>db.enrollments.aggregate([
  { $match: { _id: 1 } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } }
])</pre><pre>// פלט
[
  {
    _id: 1,
    studentId: 1,
    courseId: 1,
    enrollmentDate: ISODate("2025-10-01T00:00:00.000Z"),
    status: "Active",
    student: [
      {
        _id: 1,
        firstName: "David",
        lastName: "Levi",
        email: "david@gmail.com",
        phone: "0501234567",
        city: "Tel Aviv",
        age: 23,
        registrationYear: 2024
      }
    ]
  }
]</pre>
<p><code>student</code> הוא <b>מערך</b>, גם כשיש בו התאמה אחת בלבד. <code>$unwind</code> הופך אותו למסמך רגיל, ואז אפשר לגשת ל-<code>"$student.firstName"</code>:</p>
<pre>db.enrollments.aggregate([
  { $match: { _id: 1 } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: { _id: 0, studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] }, courseId: 1, status: 1 } }
])</pre><pre>// פלט
[
  { courseId: 1, status: "Active", studentName: "David Levi" }
]</pre>
<div class="callout warn"><b>שוכחים <code>$unwind</code>?</b> אז <code>"$student.firstName"</code> הוא מערך, ו-<code>$concat</code> נכשל. במונגו אמיתי ההודעה היא <i>$concat only supports strings, not array</i>. אפשר להשתמש ב-<code>$unwind</code>, או לשלוף את האיבר הראשון עם <code>{ $arrayElemAt: ["$student.firstName", 0] }</code>.</div>
<pre>db.enrollments.aggregate([
  { $match: { _id: 1 } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $project: { name: { $concat: ["$student.firstName", " ", "$student.lastName"] } } }
])</pre><pre>// שגיאה
$concat only supports strings.</pre>

<h4>INNER מול LEFT: מה עושה $unwind</h4>
<p><code>$lookup</code> לבדו מתנהג כמו <b>LEFT OUTER JOIN</b>: כל מסמך נשאר, גם אם קיבל מערך ריק. ה-<code>$unwind</code> הרגיל הוא מה ש<b>זורק</b> מסמכים עם מערך ריק, ולכן הצירוף הופך ל-INNER JOIN. Cyber Security נעלם:</p>
<pre>db.courses.aggregate([
  { $match: { _id: { $gte: 5 } } },
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enr" } },
  { $unwind: "$enr" },
  { $project: { _id: 0, courseName: 1, studentId: "$enr.studentId" } }
])</pre><pre>// פלט
[
  { courseName: "Statistics", studentId: 5 },
  { courseName: "Statistics", studentId: 7 },
  { courseName: "Statistics", studentId: 9 }
]</pre>
<p>עם <code>preserveNullAndEmptyArrays: true</code> מקבלים <b>LEFT JOIN</b>: הקורס נשאר, בלי <code>studentId</code>, כמו NULL ב-SQL:</p>
<pre>db.courses.aggregate([
  { $match: { _id: { $gte: 5 } } },
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enr" } },
  { $unwind: { path: "$enr", preserveNullAndEmptyArrays: true } },
  { $project: { _id: 0, courseName: 1, studentId: "$enr.studentId" } }
])</pre><pre>// פלט
[
  { courseName: "Statistics", studentId: 5 },
  { courseName: "Statistics", studentId: 7 },
  { courseName: "Statistics", studentId: 9 },
  { courseName: "Cyber Security" }
]</pre>

<h4>Anti-join: סטודנטים שלא רשומים לאף קורס (משימה 6 בשיעור / תרגיל 10)</h4>
<pre>db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $match: { enrollments: { $size: 0 } } },
  { $project: { firstName: 1, lastName: 1 } }
])</pre><pre>// פלט
[
  { _id: 10, firstName: "Lior", lastName: "Shalom" }
]</pre>
<p>הרעיון: מצרפים, ומשאירים רק מסמכים שבהם מערך ההרשמות <b>ריק</b>. זה המקביל ל-<code>LEFT JOIN … WHERE e.id IS NULL</code>. אפשר לכתוב את התנאי גם כ-<code>{ enrollments: [] }</code> או כ-<code>{ "enrollments.0": { $exists: false } }</code>. דרך נוספת, בשני שלבים, מקבילה ל-<code>NOT IN</code>:</p>
<pre>const enrolled = db.enrollments.distinct("studentId");
db.students.find({ _id: { $nin: enrolled } }, { firstName: 1, lastName: 1 })</pre><pre>// פלט
[
  { _id: 10, firstName: "Lior", lastName: "Shalom" }
]</pre>

<h4>דוגמה 7: סטודנטים שרשומים ליותר מקורס אחד (משימה 5 בשיעור / תרגיל 5)</h4>
<pre>db.enrollments.aggregate([
  { $group: { _id: "$studentId", coursesCount: { $sum: 1 } } },
  { $match: { coursesCount: { $gt: 1 } } },
  { $project: { _id: 0, studentId: "$_id", coursesCount: "$coursesCount" } },
  { $sort: { studentId: 1 } }
])</pre><pre>// פלט
[
  { studentId: 1, coursesCount: 3 },
  { studentId: 2, coursesCount: 2 },
  { studentId: 4, coursesCount: 2 },
  { studentId: 7, coursesCount: 3 }
]</pre>

<h4>דוגמה 8: ממוצע לכל סטודנט עם שם מלא (משימה 8 / תרגיל 14)</h4>
<pre>db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$studentId", avgGrade: { $avg: "$grade" } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: {
      _id: 0,
      studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      averageGrade: { $round: ["$avgGrade", 2] }
  } },
  { $sort: { averageGrade: -1 } }
])</pre><pre>// פלט
[
  { studentName: "Omer Biton", averageGrade: 90 },
  { studentName: "David Levi", averageGrade: 88.75 },
  { studentName: "Maya Peretz", averageGrade: 87.5 },
  { studentName: "Itai Friedman", averageGrade: 84.33 },
  { studentName: "Noa Cohen", averageGrade: 74 },
  { studentName: "Yossi Mizrahi", averageGrade: 65 },
  { studentName: "Tamar Golan", averageGrade: 60 }
]</pre>
<ul>
  <li><b>מאיזה Collection מתחילים?</b> מ-<code>submissions</code>, כי שם נמצאים הציונים.</li>
  <li><b>$match</b> מסנן הגשות בלי ציון. <b>$group</b> מחשב ממוצע לכל <code>studentId</code>. <b>$lookup</b> + <b>$unwind</b> מביאים את פרטי הסטודנט. <b>$project</b> בונה שם מלא עם <code>$concat</code> ומעגל עם <code>$round</code>.</li>
  <li>Shira (6) לא מופיעה, כי ההגשה היחידה שלה עדיין לא נבדקה.</li>
  <li>במשימה 8 בשיעור הפלט המבוקש הוא <code>{ studentId, averageGrade }</code> בלי שם. שם מספיקים <code>$match</code> ו-<code>$group</code>, ואחריהם <code>{ $project: { _id: 0, studentId: "$_id", averageGrade: "$avgGrade" } }</code>, בלי <code>$lookup</code>.</li>
</ul>
<p>משימה 9, "הסטודנט עם הממוצע הגבוה ביותר", היא אותו pipeline עם <code>$sort: { averageGrade: -1 }</code> ואחריו <code>{ $limit: 1 }</code>:</p>
<pre>db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$studentId", averageGrade: { $avg: "$grade" } } },
  { $sort: { averageGrade: -1 } },
  { $limit: 1 }
])</pre><pre>// פלט
[
  { _id: 5, averageGrade: 90 }
]</pre>

<h4>דוגמה 9: שלושת הקורסים עם הכי הרבה סטודנטים (תרגיל 13)</h4>
<pre>db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $sort: { studentsCount: -1, _id: 1 } },
  { $limit: 3 },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, courseName: "$course.courseName", studentsCount: "$studentsCount" } }
])</pre><pre>// פלט
[
  { courseName: "MongoDB", studentsCount: 5 },
  { courseName: "SQL Server", studentsCount: 3 },
  { courseName: "Statistics", studentsCount: 3 }
]</pre>
<p>ל-SQL Server ול-Statistics יש 3 סטודנטים לכל אחד, כלומר יש <b>שוויון</b>. מפתח המיון השני (<code>_id: 1</code>) קובע סדר יציב. בלעדיו הסדר בין קבוצות שוות לא מובטח.</p>

<h4>דוגמה 10: לכל קורס, מספר סטודנטים, עבודות והגשות (משימה 10 בשיעור)</h4>
<pre>db.courses.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enr" } },
  { $lookup: { from: "assignments", localField: "_id", foreignField: "courseId", as: "asg" } },
  { $lookup: { from: "submissions", localField: "_id", foreignField: "courseId", as: "sub" } },
  { $project: {
      _id: 0,
      courseName: 1,
      studentsCount: { $size: "$enr" },
      assignmentsCount: { $size: "$asg" },
      submissionsCount: { $size: "$sub" }
  } }
])</pre><pre>// פלט
[
  { courseName: "MongoDB", studentsCount: 5, assignmentsCount: 2, submissionsCount: 7 },
  { courseName: "SQL Server", studentsCount: 3, assignmentsCount: 2, submissionsCount: 3 },
  { courseName: "Python", studentsCount: 2, assignmentsCount: 1, submissionsCount: 2 },
  { courseName: "Marketing", studentsCount: 2, assignmentsCount: 1, submissionsCount: 2 },
  { courseName: "Statistics", studentsCount: 3, assignmentsCount: 1, submissionsCount: 2 },
  { courseName: "Cyber Security", studentsCount: 0, assignmentsCount: 0, submissionsCount: 0 }
]</pre>
<p>מתחילים מ-<code>courses</code>, ולכן גם Cyber Security מופיע עם אפסים. זה היתרון של <code>$lookup</code> + <code>$size</code> על פני <code>$group</code>. כאן <code>studentsCount</code> סופר את כל ההרשמות. כדי לספור רק הרשמות פעילות אפשר להשתמש ב-<code>$lookup</code> עם pipeline:</p>
<pre>db.courses.aggregate([
  { $lookup: {
      from: "enrollments",
      let: { cid: "$_id" },
      pipeline: [ { $match: { $expr: { $and: [ { $eq: ["$courseId", "$$cid"] }, { $eq: ["$status", "Active"] } ] } } } ],
      as: "active"
  } },
  { $project: { _id: 0, courseName: 1, activeStudents: { $size: "$active" } } }
])</pre><pre>// פלט
[
  { courseName: "MongoDB", activeStudents: 5 },
  { courseName: "SQL Server", activeStudents: 3 },
  { courseName: "Python", activeStudents: 2 },
  { courseName: "Marketing", activeStudents: 1 },
  { courseName: "Statistics", activeStudents: 2 },
  { courseName: "Cyber Security", activeStudents: 0 }
]</pre>

<h4>דוגמה 11: שאלה 7 בשיעור, 3 הקורסים עם ממוצע הציונים הגבוה ביותר</h4>
<pre>db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$courseId", avgGrade: { $avg: "$grade" } } },
  { $sort: { avgGrade: -1 } },
  { $limit: 3 },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $project: { _id: 0, courseName: { $arrayElemAt: ["$course.courseName", 0] }, averageGrade: { $round: ["$avgGrade", 2] } } }
])</pre><pre>// פלט
[
  { courseName: "Python", averageGrade: 91 },
  { courseName: "Statistics", averageGrade: 85.5 },
  { courseName: "MongoDB", averageGrade: 83 }
]</pre>
<p>הפתרון משתמש בדיוק בשלבים מהרמז של המרצה: <code>$match, $group, $lookup, $project, $sort, $limit</code>. ה-<code>$sort</code> וה-<code>$limit</code> באים <b>לפני</b> ה-<code>$lookup</code>, כדי לצרף רק 3 מסמכים. ברמז אין <code>$unwind</code>, ולכן <code>$arrayElemAt</code> שולף את שם הקורס מתוך המערך.</p>

<h4>דוגמה 12: שאלה 8 בשיעור (וגם תרגיל 15), לכל סטודנט הקורס עם הממוצע הגבוה ביותר</h4>
<pre>db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: { studentId: "$studentId", courseId: "$courseId" }, avgGrade: { $avg: "$grade" } } },
  { $sort: { "_id.studentId": 1, avgGrade: -1 } },
  { $group: { _id: "$_id.studentId", bestCourseId: { $first: "$_id.courseId" }, bestAvg: { $first: "$avgGrade" } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $lookup: { from: "courses", localField: "bestCourseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: {
      _id: 0,
      studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      bestCourse: "$course.courseName",
      averageGrade: "$bestAvg"
  } },
  { $sort: { studentName: 1 } }
])</pre><pre>// פלט
[
  { studentName: "David Levi", bestCourse: "Python", averageGrade: 92 },
  { studentName: "Itai Friedman", bestCourse: "MongoDB", averageGrade: 100 },
  { studentName: "Maya Peretz", bestCourse: "Python", averageGrade: 90 },
  { studentName: "Noa Cohen", bestCourse: "MongoDB", averageGrade: 78 },
  { studentName: "Omer Biton", bestCourse: "Statistics", averageGrade: 90 },
  { studentName: "Tamar Golan", bestCourse: "MongoDB", averageGrade: 60 },
  { studentName: "Yossi Mizrahi", bestCourse: "SQL Server", averageGrade: 65 }
]</pre>
<ol>
  <li><b>$match</b> משאיר רק הגשות עם ציון.</li>
  <li><b>$group ראשון</b> מחשב ממוצע לכל זוג (סטודנט, קורס), עם מפתח מורכב.</li>
  <li><b>$sort</b> ממיין לפי סטודנט, ובתוך כל סטודנט מהממוצע הגבוה לנמוך.</li>
  <li><b>$group שני</b> מקבץ לפי סטודנט בלבד. <code>$first</code> לוקח את השורה הראשונה, כלומר את הקורס עם הממוצע הגבוה ביותר. זו טכניקת ה-argmax.</li>
  <li><b>$lookup + $unwind</b> פעמיים מביאים את שם הסטודנט ואת שם הקורס. <b>$project</b> בונה את הפלט בפורמט שהמרצה ביקש.</li>
</ol>
<p>David קיבל בממוצע 87.5 ב-MongoDB, 88 ב-SQL Server ו-92 ב-Python, ולכן הקורס הטוב ביותר שלו הוא Python. Shira לא מופיעה, כי אין לה אף ציון. הפתרון כולל את כל השלבים שהמרצה דרש: <code>$match, $group, $lookup, $unwind, $sort, $group, $project</code>.</p>

<h4>שרשרת $lookup: הגשה ← מטלה ← קורס ← מרצה</h4>
<p>ב-<code>localField</code> אפשר לכתוב נתיב עם נקודה לשדה שהגיע מ-<code>$lookup</code> קודם:</p>
<pre>db.submissions.aggregate([
  { $match: { _id: { $in: [1, 4, 6] } } },
  { $lookup: { from: "assignments", localField: "assignmentId", foreignField: "_id", as: "assignment" } },
  { $unwind: "$assignment" },
  { $lookup: { from: "courses", localField: "assignment.courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "lecturers", localField: "course.lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: {
      title: "$assignment.title",
      courseName: "$course.courseName",
      lecturer: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] }
  } }
])</pre><pre>// פלט
[
  { _id: 1, title: "Aggregation Project", courseName: "MongoDB", lecturer: "Moshe Cohen" },
  { _id: 4, title: "Pandas Lab", courseName: "Python", lecturer: "Rina Levi" },
  { _id: 6, title: "Market Research", courseName: "Marketing", lecturer: "Avi Peretz" }
]</pre>

<h4>$unwind על מערך מוטמע</h4>
<p>כמה שיעורים יש בכל קורס, ומה סך הדקות:</p>
<pre>db.courses.aggregate([
  { $unwind: "$lessons" },
  { $group: { _id: "$courseName", lessonsCount: { $sum: 1 }, totalMinutes: { $sum: "$lessons.duration" } } },
  { $sort: { totalMinutes: -1, _id: 1 } }
])</pre><pre>// פלט
[
  { _id: "MongoDB", lessonsCount: 4, totalMinutes: 360 },
  { _id: "SQL Server", lessonsCount: 3, totalMinutes: 300 },
  { _id: "Statistics", lessonsCount: 3, totalMinutes: 300 },
  { _id: "Python", lessonsCount: 2, totalMinutes: 210 },
  { _id: "Marketing", lessonsCount: 1, totalMinutes: 90 }
]</pre>
<p>Cyber Security נעלם, כי למערך הריק שלו אין איברים לפרק. אפשר לחשב את אותו דבר בלי <code>$unwind</code>, ישירות על המערך:</p>
<pre>db.courses.aggregate([
  { $project: { _id: 0, courseName: 1, lessonsCount: { $size: "$lessons" }, totalMinutes: { $sum: "$lessons.duration" } } }
])</pre><pre>// פלט
[
  { courseName: "MongoDB", lessonsCount: 4, totalMinutes: 360 },
  { courseName: "SQL Server", lessonsCount: 3, totalMinutes: 300 },
  { courseName: "Python", lessonsCount: 2, totalMinutes: 210 },
  { courseName: "Marketing", lessonsCount: 1, totalMinutes: 90 },
  { courseName: "Statistics", lessonsCount: 3, totalMinutes: 300 },
  { courseName: "Cyber Security", lessonsCount: 0, totalMinutes: 0 }
]</pre>

<h4>$count, $addFields / $set, $unset</h4>
<pre>db.submissions.aggregate([
  { $match: { grade: { $gte: 90 } } },
  { $count: "excellentCount" }
])</pre><pre>// פלט
[
  { excellentCount: 5 }
]</pre>
<pre>db.students.aggregate([
  { $match: { city: "Haifa" } },
  { $addFields: { fullName: { $concat: ["$firstName", " ", "$lastName"] } } },
  { $unset: ["email", "phone", "registrationYear"] }
])</pre><pre>// פלט
[
  { _id: 2, firstName: "Noa", lastName: "Cohen", city: "Haifa", age: 21, fullName: "Noa Cohen" },
  {
    _id: 6,
    firstName: "Shira",
    lastName: "Avraham",
    city: "Haifa",
    age: 20,
    fullName: "Shira Avraham"
  }
]</pre>
<p><code>$project</code> משאיר <b>רק</b> את השדות שנבחרו. <code>$addFields</code> (או <code>$set</code>, שזהה לו) משאיר את <b>כל</b> השדות ומוסיף עליהם. <code>$unset</code> מסיר שדות.</p>

<h4>$cond ו-$switch: המקבילה של CASE</h4>
<pre>db.submissions.aggregate([
  { $match: { courseId: 1 } },
  { $project: {
      grade: 1,
      level: { $switch: {
        branches: [
          { case: { $eq: ["$grade", null] }, then: "Not graded" },
          { case: { $gte: ["$grade", 90] }, then: "Excellent" },
          { case: { $gte: ["$grade", 80] }, then: "Very Good" }
        ],
        default: "Other"
      } }
  } }
])</pre><pre>// פלט
[
  { _id: 1, grade: 95, level: "Excellent" },
  { _id: 2, grade: 80, level: "Very Good" },
  { _id: 5, grade: 78, level: "Other" },
  { _id: 8, grade: null, level: "Not graded" },
  { _id: 9, grade: 85, level: "Very Good" },
  { _id: 13, grade: 100, level: "Excellent" },
  { _id: 16, grade: 60, level: "Other" }
]</pre>
<p>תנאי אחד בלבד: <code>{ $cond: [ { $gte: ["$grade", 90] }, "Excellent", "Regular" ] }</code>, או בצורה המפורשת <code>{ $cond: { if: …, then: …, else: … } }</code>. בדיוק כמו ב-CASE, התנאים ב-<code>$switch</code> נבדקים לפי הסדר.</p>

<h4>$ifNull ו-$month: המקבילות של ISNULL ושל MONTH</h4>
<p><code>$ifNull: [ביטוי, ערך חלופי]</code> מחזיר את הערך החלופי כשהביטוי הוא <code>null</code> או חסר, בדיוק כמו <code>ISNULL(grade, 0)</code> ב-T-SQL. כאן מחושבים שני ממוצעים לכל קורס: רק של הגשות שנבדקו, ושל כל ההגשות כשהגשה בלי ציון נחשבת 0:</p>
<pre>db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      averageGraded: { $avg: "$grade" },
      averageWithZeros: { $avg: { $ifNull: ["$grade", 0] } }
  } },
  { $project: {
      _id: 0,
      courseId: "$_id",
      averageGraded: { $round: ["$averageGraded", 2] },
      averageWithZeros: { $round: ["$averageWithZeros", 2] }
  } },
  { $sort: { courseId: 1 } }
])</pre><pre>// פלט
[
  { courseId: 1, averageGraded: 83, averageWithZeros: 71.14 },
  { courseId: 2, averageGraded: 75, averageWithZeros: 75 },
  { courseId: 3, averageGraded: 91, averageWithZeros: 91 },
  { courseId: 4, averageGraded: 70, averageWithZeros: 35 },
  { courseId: 5, averageGraded: 85.5, averageWithZeros: 85.5 }
]</pre>
<p>אותה שאילתה ב-SQL:</p>
<pre>SELECT courseId,
       CAST(AVG(grade) AS DECIMAL(5,2))            AS averageGraded,
       CAST(AVG(ISNULL(grade, 0)) AS DECIMAL(5,2)) AS averageWithZeros
FROM submissions
GROUP BY courseId
ORDER BY courseId;</pre>
<p>בקורס 1 הממוצע יורד מ-83 (498 / 6) ל-71.14 (498 / 7), ובקורס 4 מ-70 ל-35. <code>$month</code>, <code>$year</code> ו-<code>$dayOfMonth</code> מחלצים חלק מתאריך, כמו <code>MONTH</code>, <code>YEAR</code> ו-<code>DAY</code>. כך סופרים הגשות לפי חודש (<code>GROUP BY MONTH(submissionDate)</code>):</p>
<pre>db.submissions.aggregate([
  { $group: { _id: { $month: "$submissionDate" }, submissionsCount: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])</pre><pre>// פלט
[
  { _id: 11, submissionsCount: 6 },
  { _id: 12, submissionsCount: 10 }
]</pre>

<h4>$replaceRoot / $replaceWith</h4>
<p>המרצה של קורס Python, כמסמך עצמאי:</p>
<pre>db.courses.aggregate([
  { $match: { _id: 3 } },
  { $lookup: { from: "lecturers", localField: "lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $replaceRoot: { newRoot: "$lecturer" } }
])</pre><pre>// פלט
[
  { _id: 2, firstName: "Rina", lastName: "Levi", department: "Information Systems", seniority: 7 }
]</pre>
<p><code>{ $replaceWith: "$lecturer" }</code> הוא צורת כתיבה קצרה לאותו דבר.</p>

<h4>$facet: כמה pipelines במקביל</h4>
<pre>db.submissions.aggregate([
  { $facet: {
      graded:  [ { $match: { grade: { $ne: null } } }, { $count: "n" } ],
      pending: [ { $match: { grade: null } }, { $count: "n" } ],
      top2:    [ { $sort: { grade: -1 } }, { $limit: 2 }, { $project: { grade: 1 } } ]
  } }
])</pre><pre>// פלט
[
  {
    graded: [ { n: 14 } ],
    pending: [ { n: 2 } ],
    top2: [ { _id: 13, grade: 100 }, { _id: 1, grade: 95 } ]
  }
]</pre>

<h4>$out ו-$merge: שמירת התוצאה (תיאוריה)</h4>
<pre>db.submissions.aggregate([
  { $match: { grade: null } },
  { $out: "pendingSubmissions" }        // יוצר (או מחליף לגמרי) Collection עם התוצאה
])

db.submissions.aggregate([
  { $group: { _id: "$courseId", avgGrade: { $avg: "$grade" } } },
  { $merge: { into: "courseStats", whenMatched: "replace", whenNotMatched: "insert" } }
])</pre>
<p>שני השלבים חייבים להיות <b>האחרונים</b> ב-pipeline. <code>$out</code> מחליף את כל ה-Collection, ודומה ל-<code>SELECT … INTO</code>. <code>$merge</code> ממזג מסמך-מסמך לתוך Collection קיים. שניהם לא נתמכים בסימולטור של האתר.</p>

<h4>טעויות נפוצות ב-Aggregation</h4>
<ul>
  <li><b>שכחתם את ה-<code>$</code> לפני שם השדה.</b> <code>_id: "courseId"</code> הוא מחרוזת קבועה, ולכן כל המסמכים נכנסים לקבוצה אחת:</li>
</ul>
<pre>db.submissions.aggregate([ { $group: { _id: "courseId", n: { $sum: 1 } } } ])</pre><pre>// פלט
[
  { _id: "courseId", n: 16 }
]</pre>
<ul>
  <li><b>פניתם לשדה שכבר לא קיים.</b> אחרי <code>$group</code> המפתח נמצא ב-<code>_id</code>, ולכן <code>$match: { courseId: 1 }</code> לא ימצא כלום.</li>
  <li><b>שכחתם <code>$unwind</code> אחרי <code>$lookup</code></b>, ואז <code>$concat</code> נכשל או שהפלט מכיל מערכים.</li>
  <li>השתמשתם ב-<b><code>$first</code> / <code>$last</code> בלי <code>$sort</code> לפניהם</b>. התוצאה שרירותית.</li>
  <li>כתבתם <b><code>$limit</code> לפני <code>$sort</code></b> כשרציתם Top-N. ב-aggregate, בניגוד ל-find, הסדר קובע!</li>
  <li><b>$size על שדה חסר.</b> <code>$size</code> על שדה שלא קיים זורק שגיאה. אפשר לעטוף כך: <code>{ $size: { $ifNull: ["$arr", []] } }</code>.</li>
</ul>
`
  },
  {
    id:'nosql-vs-sql', track:'nosql', icon:'⚖️', title:'SQL מול MongoDB: עבודת ישור קו',
    html:`
<p>ב"עבודת ישור קו" המרצה כתב: <b>"יש לכתוב עבור כל הצגה גם שאילתא ב-SQL וגם שאילתא ב-NoSQL"</b>. זה גם המבנה הצפוי בחלק המשולב של המבחן. בפרק הזה כל אחת משש השאלות של העבודה פתורה בשתי השפות על college2, עם הפלט האמיתי של כל פתרון. לפני כן מוצגת שיטת תרגום כללית, ובסוף הפרק יש רשימה של טעויות נפוצות.</p>

<h4>שיטת התרגום: מ-SQL ל-Pipeline</h4>
<p>ב-SQL כותבים את חלקי השאילתה בסדר קבוע (SELECT קודם), אבל ה-DB מבצע אותם בסדר אחר. ב-aggregate כותבים את השלבים <b>בסדר הביצוע</b>:</p>
<table class="mini">
  <tr><th>סדר ביצוע</th><th>SQL</th><th>MongoDB</th></tr>
  <tr><td>1</td><td dir="ltr">FROM t</td><td dir="ltr">db.t.aggregate([ … ])</td></tr>
  <tr><td>2</td><td dir="ltr">JOIN t2 ON t.fk = t2.id</td><td dir="ltr">{ $lookup: { from: "t2", localField: "fk", foreignField: "_id", as: "x" } }, { $unwind: "$x" }</td></tr>
  <tr><td>3</td><td dir="ltr">WHERE …</td><td dir="ltr">{ $match: { … } }</td></tr>
  <tr><td>4</td><td dir="ltr">GROUP BY col + COUNT/AVG…</td><td dir="ltr">{ $group: { _id: "$col", n: { $sum: 1 }, avg: { $avg: "$x" } } }</td></tr>
  <tr><td>5</td><td dir="ltr">HAVING …</td><td dir="ltr">{ $match: { … } }   (אחרי ה-$group)</td></tr>
  <tr><td>6</td><td dir="ltr">SELECT cols / AS / expr</td><td dir="ltr">{ $project: { … } }</td></tr>
  <tr><td>7</td><td dir="ltr">ORDER BY</td><td dir="ltr">{ $sort: { … } }</td></tr>
  <tr><td>8</td><td dir="ltr">TOP n</td><td dir="ltr">{ $limit: n }</td></tr>
</table>
<ol>
  <li><b>מאיזה Collection מתחילים?</b> מזה שמחזיק את הרשומות שאתם סופרים או מציגים, כלומר הטבלה של ה-FROM. כשצריך "כולל אלה שאין להם" (LEFT JOIN), מתחילים מהצד שחייב להופיע.</li>
  <li><b>מסננים מוקדם.</b> תנאי על שדה של ה-Collection הראשי נכתב כ-<code>$match</code> ראשון, למשל <code>status: "Active"</code>. תנאי על שדה שמגיע מ-Collection אחר נכתב אחרי ה-<code>$lookup</code> שמביא אותו.</li>
  <li><b>לכל JOIN</b> מוסיפים <code>$lookup</code> (ה-FK הוא <code>localField</code>, ה-<code>_id</code> הוא <code>foreignField</code>) ואחריו <code>$unwind</code>. אם ה-FK נמצא ב-Collection השני, כמו כשמתחילים מ-students ומחפשים enrollments, ההפך: <code>localField: "_id"</code> ו-<code>foreignField: "studentId"</code>.</li>
  <li><b>קיבוץ:</b> עמודות ה-GROUP BY נכנסות ל-<code>_id</code>, והאגרגציות נכתבות כ-accumulators.</li>
  <li><b>תנאי על תוצאה מצטברת</b> הופך ל-<code>$match</code> אחרי ה-<code>$group</code>.</li>
  <li><b>מעצבים את הפלט</b> עם <code>$project</code>: שמות, <code>$concat</code>, <code>$round</code>, <code>_id: 0</code>.</li>
  <li><b>ממיינים ומגבילים</b> עם <code>$sort</code> ו-<code>$limit</code>.</li>
  <li><b>בדיקה עצמית:</b> האם סיננתי Active? האם טיפלתי ב-null? האם כתבתי &gt; ולא ≥? האם השמות בפלט נכונים?</li>
</ol>
<div class="callout">ב-DDL של עבודת ישור קו אין <code>courseId</code> בטבלת <code>submissions</code>. לכן כדי להגיע מהגשה לקורס עוברים דרך <code>assignments</code>: <b>submissions → assignments → courses → lecturers</b>. כך נפתרו כאן שאלות 4 ו-6. ב-college2 של האתר יש גם <code>courseId</code> בהגשה (כמו ב-PDF של MongoDB), ולכן קיצור הדרך עובד באתר, אבל הפתרון דרך assignments נכון בשתי הסכמות.</div>
<div class="callout">פלטי ה-SQL כאן הגיעו ממנוע האתר. ב-SQL Server עמודת <code>grade</code> (‏DECIMAL(5,2)) תוצג כ-<code>95.00</code>, והתוצאה של <code>CAST(AVG(…) AS DECIMAL(5,2))</code> כ-<code>85.50</code>. הערכים עצמם זהים.</div>

<h4>שאלה 1: שמות הסטודנטים, שמות הקורסים ותאריך ההרשמה (הרשמות פעילות בלבד)</h4>
<pre>SELECT s.firstName + ' ' + s.lastName AS studentName,
       c.courseName,
       e.enrollmentDate
FROM enrollments e
JOIN students s ON e.studentId = s.id
JOIN courses  c ON e.courseId  = c.id
WHERE e.status = 'Active'
ORDER BY e.enrollmentDate, studentName, c.courseName;</pre><pre>-- פלט
studentName   | courseName | enrollmentDate
--------------+------------+---------------
David Levi    | MongoDB    | 2025-10-01
David Levi    | SQL Server | 2025-10-01
Noa Cohen     | MongoDB    | 2025-10-02
David Levi    | Python     | 2025-10-03
Yossi Mizrahi | SQL Server | 2025-10-04
Maya Peretz   | MongoDB    | 2025-10-06
Maya Peretz   | Python     | 2025-10-06
Omer Biton    | Statistics | 2025-10-07
Itai Friedman | MongoDB    | 2025-10-08
Shira Avraham | Marketing  | 2025-10-08
Itai Friedman | SQL Server | 2025-10-09
Itai Friedman | Statistics | 2025-10-09
Tamar Golan   | MongoDB    | 2025-10-10
(13 rows)</pre>
<pre>db.enrollments.aggregate([
  { $match: { status: "Active" } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: {
      _id: 0,
      studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      courseName: "$course.courseName",
      enrollmentDate: "$enrollmentDate"
  } },
  { $sort: { enrollmentDate: 1, studentName: 1, courseName: 1 } }
])</pre><pre>// פלט
[
  { studentName: "David Levi", courseName: "MongoDB", enrollmentDate: ISODate("2025-10-01T00:00:00.000Z") },
  { studentName: "David Levi", courseName: "SQL Server", enrollmentDate: ISODate("2025-10-01T00:00:00.000Z") },
  { studentName: "Noa Cohen", courseName: "MongoDB", enrollmentDate: ISODate("2025-10-02T00:00:00.000Z") },
  { studentName: "David Levi", courseName: "Python", enrollmentDate: ISODate("2025-10-03T00:00:00.000Z") },
  { studentName: "Yossi Mizrahi", courseName: "SQL Server", enrollmentDate: ISODate("2025-10-04T00:00:00.000Z") },
  { studentName: "Maya Peretz", courseName: "MongoDB", enrollmentDate: ISODate("2025-10-06T00:00:00.000Z") },
  { studentName: "Maya Peretz", courseName: "Python", enrollmentDate: ISODate("2025-10-06T00:00:00.000Z") },
  { studentName: "Omer Biton", courseName: "Statistics", enrollmentDate: ISODate("2025-10-07T00:00:00.000Z") },
  { studentName: "Itai Friedman", courseName: "MongoDB", enrollmentDate: ISODate("2025-10-08T00:00:00.000Z") },
  { studentName: "Shira Avraham", courseName: "Marketing", enrollmentDate: ISODate("2025-10-08T00:00:00.000Z") },
  { studentName: "Itai Friedman", courseName: "SQL Server", enrollmentDate: ISODate("2025-10-09T00:00:00.000Z") },
  { studentName: "Itai Friedman", courseName: "Statistics", enrollmentDate: ISODate("2025-10-09T00:00:00.000Z") },
  { studentName: "Tamar Golan", courseName: "MongoDB", enrollmentDate: ISODate("2025-10-10T00:00:00.000Z") }
]</pre>
<ul>
  <li>מתחילים מ-<code>enrollments</code>, כי כל שורה בפלט היא <b>הרשמה</b>. מצרפים את students ואת courses, שהם שני JOIN-ים, ולכן יש שני זוגות של <code>$lookup</code> + <code>$unwind</code>.</li>
  <li>יש 13 שורות: 15 הרשמות פחות 2 לא פעילות (Noa ב-Marketing ו-Eyal ב-Statistics). <b>הטעות הנפוצה היא לשכוח את הסינון של Active.</b></li>
  <li>ה-<code>$match</code> בא <b>לפני</b> ה-<code>$lookup</code>-ים, כדי לצרף רק את המסמכים הנחוצים.</li>
  <li>מפתח המיון השלישי (<code>courseName</code>) קובע סדר קבוע כשלאותו סטודנט יש שתי הרשמות באותו יום (David ב-1/10, Itai ב-9/10).</li>
</ul>

<h4>שאלה 2: הסטודנטים שאין להם אפילו הרשמה אחת</h4>
<pre>SELECT s.id, s.firstName, s.lastName
FROM students s
LEFT JOIN enrollments e ON s.id = e.studentId
WHERE e.id IS NULL;</pre><pre>-- פלט
id | firstName | lastName
---+-----------+---------
10 | Lior      | Shalom
(1 rows)</pre>
<p>חלופות שקולות ב-SQL:</p>
<pre>SELECT id, firstName, lastName
FROM students
WHERE id NOT IN (SELECT studentId FROM enrollments);</pre><pre>-- פלט
id | firstName | lastName
---+-----------+---------
10 | Lior      | Shalom
(1 rows)</pre>
<pre>SELECT s.id, s.firstName, s.lastName
FROM students s
WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.studentId = s.id);</pre>
<pre>db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $match: { enrollments: { $size: 0 } } },
  { $project: { firstName: 1, lastName: 1 } }
])</pre><pre>// פלט
[
  { _id: 10, firstName: "Lior", lastName: "Shalom" }
]</pre>
<ul>
  <li>מתחילים מ-<code>students</code>, כי אלה הרשומות שצריך להחזיר. זה ה"צד השמאלי" של ה-LEFT JOIN.</li>
  <li>Eyal (9) <b>לא</b> מופיע. נכון שההרשמה שלו לא פעילה, אבל השאלה היא על "אפילו הרשמה אחת", ולכן הרשמה לא פעילה נחשבת. אם השאלה הייתה "בלי הרשמה <b>פעילה</b>", היה צריך לסנן status בתוך ה-JOIN, או להשתמש ב-<code>$lookup</code> עם pipeline.</li>
  <li><b>מלכודת ב-SQL:</b> את הבדיקה <code>IS NULL</code> עושים על עמודה מהטבלה הימנית שלא יכולה להיות NULL בשורה קיימת, כמו ה-PK שלה (<code>e.id</code>).</li>
  <li><b>מלכודת ב-NOT IN:</b> אם תת-השאילתה מחזירה ולו NULL אחד (למשל <code>studentId</code> ריק באחת ההרשמות), <code>NOT IN</code> מחזיר 0 שורות. <code>NOT EXISTS</code> ו-<code>LEFT JOIN … IS NULL</code> לא נפגעים מזה.</li>
</ul>

<h4>שאלה 3: הסטודנטים שרשומים ליותר משני קורסים פעילים</h4>
<pre>SELECT s.id, s.firstName, s.lastName, COUNT(*) AS activeCourses
FROM students s
JOIN enrollments e ON s.id = e.studentId
WHERE e.status = 'Active'
GROUP BY s.id, s.firstName, s.lastName
HAVING COUNT(*) &gt; 2;</pre><pre>-- פלט
id | firstName | lastName | activeCourses
---+-----------+----------+--------------
1  | David     | Levi     | 3
7  | Itai      | Friedman | 3
(2 rows)</pre>
<pre>db.enrollments.aggregate([
  { $match: { status: "Active" } },
  { $group: { _id: "$studentId", activeCourses: { $sum: 1 } } },
  { $match: { activeCourses: { $gt: 2 } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: { firstName: "$student.firstName", lastName: "$student.lastName", activeCourses: "$activeCourses" } }
])</pre><pre>// פלט
[
  { _id: 1, firstName: "David", lastName: "Levi", activeCourses: 3 },
  { _id: 7, firstName: "Itai", lastName: "Friedman", activeCourses: 3 }
]</pre>
<ul>
  <li>"יותר משני קורסים" פירושו <code>&gt; 2</code>, ולא <code>&gt;= 2</code>. לכן Maya, עם 2 קורסים פעילים, לא נכנסת לתוצאה. ל-Noa יש 2 הרשמות, אבל רק אחת מהן פעילה.</li>
  <li><b>WHERE</b> (<code>status = 'Active'</code>) מסנן <b>לפני</b> הקיבוץ, ולכן ב-Mongo הוא <code>$match</code> ראשון. <b>HAVING</b> מסנן <b>אחרי</b> הקיבוץ, ולכן ב-Mongo הוא <code>$match</code> אחרי ה-<code>$group</code>.</li>
  <li>ב-SQL Server חובה לכלול ב-GROUP BY את כל עמודות ה-SELECT שאינן אגרגציה (firstName, lastName). ב-Mongo מביאים את השמות אחרי הקיבוץ, עם <code>$lookup</code>.</li>
</ul>

<h4>שאלה 4: כל ההגשות עם שם הסטודנט, שם הקורס והמרצה</h4>
<pre>SELECT sub.id AS submissionId,
       s.firstName + ' ' + s.lastName AS studentName,
       c.courseName,
       l.firstName + ' ' + l.lastName AS lecturerName,
       a.title,
       sub.grade
FROM submissions sub
JOIN students    s ON sub.studentId    = s.id
JOIN assignments a ON sub.assignmentId = a.id
JOIN courses     c ON a.courseId       = c.id
JOIN lecturers   l ON c.lecturerId     = l.id
ORDER BY sub.id;</pre><pre>-- פלט
submissionId | studentName   | courseName | lecturerName | title               | grade
-------------+---------------+------------+--------------+---------------------+------
1            | David Levi    | MongoDB    | Moshe Cohen  | Aggregation Project | 95
2            | David Levi    | MongoDB    | Moshe Cohen  | CRUD Exercise       | 80
3            | David Levi    | SQL Server | Moshe Cohen  | Joins Homework      | 88
4            | David Levi    | Python     | Rina Levi    | Pandas Lab          | 92
5            | Noa Cohen     | MongoDB    | Moshe Cohen  | Aggregation Project | 78
6            | Noa Cohen     | Marketing  | Avi Peretz   | Market Research     | 70
7            | Yossi Mizrahi | SQL Server | Moshe Cohen  | Joins Homework      | 65
8            | Maya Peretz   | MongoDB    | Moshe Cohen  | Aggregation Project | NULL
9            | Maya Peretz   | MongoDB    | Moshe Cohen  | CRUD Exercise       | 85
10           | Maya Peretz   | Python     | Rina Levi    | Pandas Lab          | 90
11           | Omer Biton    | Statistics | Avi Peretz   | Regression Task     | 90
12           | Shira Avraham | Marketing  | Avi Peretz   | Market Research     | NULL
13           | Itai Friedman | MongoDB    | Moshe Cohen  | Aggregation Project | 100
14           | Itai Friedman | SQL Server | Moshe Cohen  | Joins Homework      | 72
15           | Itai Friedman | Statistics | Avi Peretz   | Regression Task     | 81
16           | Tamar Golan   | MongoDB    | Moshe Cohen  | CRUD Exercise       | 60
(16 rows)</pre>
<pre>db.submissions.aggregate([
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $lookup: { from: "assignments", localField: "assignmentId", foreignField: "_id", as: "assignment" } },
  { $unwind: "$assignment" },
  { $lookup: { from: "courses", localField: "assignment.courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "lecturers", localField: "course.lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: {
      studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      courseName: "$course.courseName",
      lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] },
      title: "$assignment.title",
      grade: "$grade"
  } },
  { $sort: { _id: 1 } }
])</pre><pre>// פלט
[
  { _id: 1, studentName: "David Levi", courseName: "MongoDB", lecturerName: "Moshe Cohen", title: "Aggregation Project", grade: 95 },
  { _id: 2, studentName: "David Levi", courseName: "MongoDB", lecturerName: "Moshe Cohen", title: "CRUD Exercise", grade: 80 },
  { _id: 3, studentName: "David Levi", courseName: "SQL Server", lecturerName: "Moshe Cohen", title: "Joins Homework", grade: 88 },
  { _id: 4, studentName: "David Levi", courseName: "Python", lecturerName: "Rina Levi", title: "Pandas Lab", grade: 92 },
  // … ועוד 12 מסמכים
]</pre>
<ul>
  <li>יש 4 JOIN-ים, ולכן 4 זוגות של <code>$lookup</code> + <code>$unwind</code>. השרשרת עוברת דרך שדות שהגיעו מ-lookup קודם (<code>"assignment.courseId"</code>, <code>"course.lecturerId"</code>).</li>
  <li>כל 16 ההגשות מופיעות, כולל אלה עם <code>grade = NULL</code>. ה-JOIN-ים מתבצעים על המפתחות, והציון לא משפיע עליהם.</li>
  <li>בגלל ש-college2 שומר גם <code>courseId</code> בהגשה, אפשר לקצר: <code>localField: "courseId"</code> ישירות ל-courses.</li>
</ul>

<h4>שאלה 5: המטלות שאין להן אף הגשה</h4>
<pre>SELECT a.id, a.title, a.courseId
FROM assignments a
LEFT JOIN submissions s ON a.id = s.assignmentId
WHERE s.id IS NULL;</pre><pre>-- פלט
id | title             | courseId
---+-------------------+---------
7  | Stored Procedures | 2
(1 rows)</pre>
<pre>db.assignments.aggregate([
  { $lookup: { from: "submissions", localField: "_id", foreignField: "assignmentId", as: "subs" } },
  { $match: { subs: { $size: 0 } } },
  { $project: { title: 1, courseId: 1 } }
])</pre><pre>// פלט
[
  { _id: 7, title: "Stored Procedures", courseId: 2 }
]</pre>
<p>זה אותו דפוס Anti-join כמו בשאלה 2, הפעם מהצד של <code>assignments</code>. ב-SQL אפשר לכתוב גם <code>WHERE a.id NOT IN (SELECT assignmentId FROM submissions)</code>.</p>

<h4>שאלה 6: ממוצע ציונים לכל קורס, כולל שם הקורס ושם המרצה</h4>
<pre>SELECT c.courseName,
       l.firstName + ' ' + l.lastName AS lecturerName,
       CAST(AVG(s.grade) AS DECIMAL(5,2)) AS averageGrade
FROM submissions s
JOIN assignments a ON s.assignmentId = a.id
JOIN courses     c ON a.courseId     = c.id
JOIN lecturers   l ON c.lecturerId   = l.id
GROUP BY c.id, c.courseName, l.firstName, l.lastName
ORDER BY averageGrade DESC;</pre><pre>-- פלט
courseName | lecturerName | averageGrade
-----------+--------------+-------------
Python     | Rina Levi    | 91
Statistics | Avi Peretz   | 85.5
MongoDB    | Moshe Cohen  | 83
SQL Server | Moshe Cohen  | 75
Marketing  | Avi Peretz   | 70
(5 rows)</pre>
<pre>db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $lookup: { from: "assignments", localField: "assignmentId", foreignField: "_id", as: "assignment" } },
  { $unwind: "$assignment" },
  { $group: { _id: "$assignment.courseId", avgGrade: { $avg: "$grade" } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "lecturers", localField: "course.lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: {
      _id: 0,
      courseName: "$course.courseName",
      lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] },
      averageGrade: { $round: ["$avgGrade", 2] }
  } },
  { $sort: { averageGrade: -1 } }
])</pre><pre>// פלט
[
  { courseName: "Python", lecturerName: "Rina Levi", averageGrade: 91 },
  { courseName: "Statistics", lecturerName: "Avi Peretz", averageGrade: 85.5 },
  { courseName: "MongoDB", lecturerName: "Moshe Cohen", averageGrade: 83 },
  { courseName: "SQL Server", lecturerName: "Moshe Cohen", averageGrade: 75 },
  { courseName: "Marketing", lecturerName: "Avi Peretz", averageGrade: 70 }
]</pre>
<ul>
  <li>גם <code>AVG</code> וגם <code>$avg</code> מתעלמים מ-NULL. לכן בשתי השפות הממוצע של הקורס MongoDB (קורס 1) הוא 83 (498 / 6), כי ההגשה של Maya עוד לא נבדקה. ב-Mongo ה-<code>$match</code> על grade לא חובה לחישוב הממוצע, אבל הוא מבהיר את הכוונה. הבדל קטן: קורס שאף הגשה שלו עוד לא נבדקה היה מופיע ב-SQL עם <code>NULL</code>, ואילו ה-<code>$match</code> היה מוציא אותו מהתוצאה במונגו. ב-college2 אין קורס כזה.</li>
  <li><b>טריק:</b> קודם מקבצים (<code>$group</code>), ורק אחר כך מצרפים את courses ואת lecturers. כך ה-<code>$lookup</code> ל-courses ול-lecturers רץ על 5 מסמכים (אחד לכל קורס) במקום על 14 הגשות. זה המקביל ל-GROUP BY לפי <code>c.id</code> ב-SQL.</li>
  <li>Cyber Security לא מופיע, כי אין לו מטלות ולכן אין לו הגשות. אם רוצים "<b>כל</b> הקורסים" (עם NULL), צריך LEFT JOIN שמתחיל מ-courses:</li>
</ul>
<pre>SELECT c.courseName,
       l.firstName + ' ' + l.lastName AS lecturerName,
       CAST(AVG(s.grade) AS DECIMAL(5,2)) AS averageGrade
FROM courses c
JOIN lecturers        l ON c.lecturerId   = l.id
LEFT JOIN assignments a ON a.courseId     = c.id
LEFT JOIN submissions s ON s.assignmentId = a.id
GROUP BY c.id, c.courseName, l.firstName, l.lastName
ORDER BY averageGrade DESC;</pre><pre>-- פלט
courseName     | lecturerName | averageGrade
---------------+--------------+-------------
Python         | Rina Levi    | 91
Statistics     | Avi Peretz   | 85.5
MongoDB        | Moshe Cohen  | 83
SQL Server     | Moshe Cohen  | 75
Marketing      | Avi Peretz   | 70
Cyber Security | Rina Levi    | NULL
(6 rows)</pre>

<h4>מילון מונחים: SQL ↔ MongoDB</h4>
<table class="mini">
  <tr><th>SQL Server</th><th>MongoDB</th></tr>
  <tr><td>Database</td><td>Database (<code>use college</code>)</td></tr>
  <tr><td>Table</td><td>Collection</td></tr>
  <tr><td>Row</td><td>Document</td></tr>
  <tr><td>Column</td><td>Field</td></tr>
  <tr><td>PRIMARY KEY (<code>id INT</code>)</td><td><code>_id</code> (ObjectId, נוצר אוטומטית)</td></tr>
  <tr><td>FOREIGN KEY / REFERENCES</td><td>Reference (<code>lecturerId: ObjectId("…")</code>), בלי אכיפה</td></tr>
  <tr><td>טבלת גישור (M:N)</td><td>Collection מקשר (<code>enrollments</code>), או מערך הפניות</td></tr>
  <tr><td>טבלה נפרדת לנתוני ילד</td><td>Embedded document / מערך מוטמע (<code>lessons</code>)</td></tr>
  <tr><td>CREATE TABLE / ALTER TABLE</td><td>לא נחוץ, כי הסכמה גמישה</td></tr>
  <tr><td>NULL</td><td><code>null</code>, או שדה שלא קיים בכלל</td></tr>
  <tr><td>JOIN</td><td><code>$lookup</code> (+ <code>$unwind</code>)</td></tr>
  <tr><td>CREATE INDEX</td><td><code>createIndex({ field: 1 })</code></td></tr>
  <tr><td>SELECT … INTO / טבלה זמנית</td><td><code>$out</code> / <code>$merge</code></td></tr>
  <tr><td>טרנזקציה (ACID)</td><td>אטומיות ברמת מסמך. יש גם טרנזקציות רב-מסמכיות (מגרסה 4.0)</td></tr>
</table>

<h4>טעויות נפוצות בתרגום</h4>
<ol>
  <li><b>רישיות של מחרוזות.</b> ב-SQL Server <code>'active' = 'Active'</code> (ה-Collation של ברירת המחדל לא רגיש לרישיות), אבל ב-MongoDB <code>"active"</code> ≠ <code>"Active"</code>. בשיעור הופיע <code>status: "active"</code>, ובעבודה <code>"Active"</code>. כתבו בדיוק כמו בנתונים.</li>
  <li><b>שכחתם את ה-<code>$</code></b> לפני שם שדה בתוך ביטוי (<code>"$grade"</code>), או שמתם <code>$</code> במקום שבו כותבים שם שדה כמפתח (<code>localField: "studentId"</code> נכתב <b>בלי</b> <code>$</code>).</li>
  <li><b>אין <code>$unwind</code> אחרי <code>$lookup</code></b>, ואז התוצאה היא מערכים ו-<code>$concat</code> נכשל.</li>
  <li><b>find במקום aggregate.</b> אם יש JOIN, קיבוץ או שדה מחושב, צריך aggregate.</li>
  <li><b>HAVING הפך ל-$match לפני ה-$group</b>, ואז השדה המצטבר עוד לא קיים.</li>
  <li><b>COUNT(*) מול COUNT(col).</b> <code>$sum: 1</code> סופר את כל המסמכים, כולל אלה עם grade = null. כדי לספור רק ציונים מסננים קודם, או משתמשים ב-<code>$cond</code>.</li>
  <li><b>ממוצע של INT ב-SQL Server הוא מספר שלם!</b> <code>AVG(age)</code> על עמודת INT מחזיר 23 ולא 23.3. התיקון: <code>AVG(CAST(age AS DECIMAL(5,2)))</code> או <code>AVG(age * 1.0)</code>. ב-Mongo <code>$avg</code> תמיד עשרוני. (מנוע האתר מחזיר 23.3 בשני המקרים, אבל במבחן כתבו לפי SQL Server.)</li>
  <li><b>תאריכים.</b> ב-SQL כותבים <code>'2025-10-09'</code>. ב-Mongo משווים מול <code>ISODate("2025-10-09")</code> ולא מול מחרוזת.</li>
  <li><b>טיפוסים ב-$lookup.</b> <code>localField</code> ו-<code>foreignField</code> חייבים להיות מאותו טיפוס: ObjectId מול ObjectId. מחרוזת לא תתאים ל-ObjectId.</li>
  <li><b>מיון אחרי $project</b> נעשה לפי השמות <b>החדשים</b> (<code>averageGrade</code>), ומיון לפני ה-<code>$project</code> נעשה לפי השמות המקוריים.</li>
  <li><b>Top-N עם שוויון.</b> הוסיפו מפתח מיון שני (<code>{ n: -1, _id: 1 }</code> / <code>ORDER BY n DESC, id</code>), כדי שהתוצאה תהיה יציבה.</li>
</ol>
`
  }
]);

/* ---------- דף תחביר MongoDB (לפי "פקודות חשובות ב-NoSQL" של המרצה) ---------- */
SQLC.nosqlSyntax = [
  { title:'פקודות בסיסיות (CRUD)', rows:[
    ['db.students.find({ city: "Haifa" })', 'מחזירה את כל המסמכים שעומדים בתנאי. בלי תנאי (או עם {}) מוחזרים כל המסמכים'],
    ['db.students.find({ city: "Haifa" }, { firstName: 1, _id: 0 })', 'הפרמטר השני הוא Projection: אילו שדות להציג (1 = הצג, 0 = הסתר)'],
    ['db.students.findOne({ _id: 1 })', 'מחזירה מסמך אחד (הראשון שמתאים) או null'],
    ['db.students.insertOne({ firstName: "Dan", age: 22 })', 'מוסיפה מסמך אחד. אם אין _id, נוצר ObjectId אוטומטית'],
    ['db.students.insertMany([ { … }, { … } ])', 'מוסיפה כמה מסמכים בבת אחת, ומקבלת מערך'],
    ['db.students.updateOne({ _id: 1 }, { $set: { age: 24 } })', 'מעדכנת את המסמך הראשון שמתאים לתנאי'],
    ['db.students.updateMany({ city: "Tel Aviv" }, { $set: { region: "Center" } })', 'מעדכנת את כל המסמכים שמתאימים לתנאי'],
    ['db.students.updateOne({ _id: 12 }, { $set: { … } }, { upsert: true })', 'upsert: מעדכנת, ואם אין התאמה מכניסה מסמך חדש'],
    ['db.lecturers.replaceOne({ _id: 4 }, { firstName: "Dana", … })', 'מחליפה מסמך שלם. שדות שלא נכתבו נמחקים (רק _id נשמר)'],
    ['db.enrollments.deleteOne({ status: "Inactive" })', 'מוחקת את המסמך הראשון שמתאים לתנאי'],
    ['db.submissions.deleteMany({ grade: null })', 'מוחקת את כל המסמכים שמתאימים. deleteMany({}) מוחקת הכל!'],
    ['db.enrollments.countDocuments({ status: "Active" })', 'סופרת כמה מסמכים עומדים בתנאי'],
    ['db.students.distinct("city")', 'מחזירה מערך של הערכים הייחודיים של שדה, כמו SELECT DISTINCT'],
  ]},
  { title:'פקודות על find (Cursor)', rows:[
    ['.sort({ age: -1, firstName: 1 })', 'ממיינת: 1 בסדר עולה, ‎-1 בסדר יורד (ORDER BY)'],
    ['.limit(5)', 'מגבילה את מספר התוצאות (TOP 5)'],
    ['.skip(10)', 'מדלגת על מסמכים, לצורך Pagination: skip((page-1)*size)'],
    ['.project({ firstName: 1, _id: 0 })', 'קובעת אילו שדות להציג'],
    ['.count()', 'מחזירה את מספר התוצאות (דרך ישנה; עדיף countDocuments)'],
    ['.explain("executionStats")', 'מציגה איך MongoDB ביצע את השאילתה: COLLSCAN (סריקה מלאה) או IXSCAN (אינדקס)'],
    ['.pretty()', 'מדפיסה בצורה מעוצבת (ב-shell הישן)'],
    ['find().sort().skip().limit()', 'סדר הביצוע תמיד sort, אחר כך skip, ובסוף limit, בלי קשר לסדר הכתיבה'],
  ]},
  { title:'אופרטורי השוואה (בתוך השדה)', rows:[
    ['{ age: { $eq: 20 } }', 'שווה ל- (זהה ל-{ age: 20 })'],
    ['{ age: { $ne: 20 } }', 'לא שווה ל- (כולל מסמכים שאין בהם את השדה)'],
    ['{ grade: { $gt: 80 } }', 'גדול מ-'],
    ['{ grade: { $gte: 80 } }', 'גדול או שווה'],
    ['{ grade: { $lt: 60 } }', 'קטן מ-'],
    ['{ grade: { $lte: 60 } }', 'קטן או שווה'],
    ['{ age: { $gte: 22, $lte: 25 } }', 'טווח (BETWEEN): שני אופרטורים באותו אובייקט'],
    ['{ city: { $in: ["Tel Aviv", "Haifa"] } }', 'נמצא בתוך רשימה (IN)'],
    ['{ city: { $nin: ["Tel Aviv", "Haifa"] } }', 'לא נמצא ברשימה (NOT IN)'],
  ]},
  { title:'לוגיקה, אלמנט, טקסט ומערכים בשאילתה', rows:[
    ['{ city: "Haifa", age: { $gt: 20 } }', 'AND מרומז: כמה שדות באותו filter'],
    ['{ $and: [ { … }, { … } ] }', 'וגם, באופן מפורש. חובה כשיש שני $or'],
    ['{ $or: [ { city: "Haifa" }, { age: { $gt: 25 } } ] }', 'או: לפחות אחד מהתנאים'],
    ['{ $nor: [ { city: "Haifa" }, { city: "Holon" } ] }', 'אף אחד מהתנאים, כמו NOT (A OR B)'],
    ['{ age: { $not: { $gt: 23 } } }', 'שלילה של תנאי, נכתבת בתוך השדה'],
    ['{ email: { $exists: true } }', 'בודק שהשדה קיים במסמך'],
    ['{ age: { $type: "int" } }', 'בודק את סוג הנתון ("string", "number", "null", "array"…)'],
    ['{ firstName: { $regex: "^A" } }', 'חיפוש לפי תבנית (LIKE): "^A" מתחיל ב-A, "a$" מסתיים ב-a'],
    ['{ city: { $regex: "tel", $options: "i" } }', 'חיפוש בלי רגישות לאותיות גדולות וקטנות'],
    ['{ grade: null }', 'null או שדה חסר (IS NULL)'],
    ['{ "lessons.title": "JOINs" }', 'Dot notation: שדה בתוך מסמך מוטמע או בתוך איברי מערך (חובה מרכאות)'],
    ['{ lessons: { $size: 3 } }', 'מערך באורך מדויק'],
    ['{ "lessons.2": { $exists: true } }', 'במערך יש לפחות 3 איברים'],
    ['{ lessons: { $elemMatch: { duration: 120, title: "Pandas" } } }', 'כל התנאים מתקיימים על אותו איבר במערך'],
    ['{ $expr: { $gte: [ { $size: "$lessons" }, 3 ] } }', 'ביטוי Aggregation בתוך find'],
  ]},
  { title:'אופרטורים לעדכון (מחוץ לשדה)', rows:[
    ['{ $set: { age: 21 } }', 'משנה ערך של שדה, או מוסיף שדה'],
    ['{ $unset: { age: "" } }', 'מוחק את השדה מהמסמך'],
    ['{ $inc: { grade: 5 } }', 'מגדיל או מקטין מספר (מספר שלילי מקטין)'],
    ['{ $mul: { price: 1.1 } }', 'מכפיל ערך מספרי'],
    ['{ $min: { grade: 60 } }', 'מעדכן רק אם הערך החדש קטן יותר'],
    ['{ $max: { grade: 90 } }', 'מעדכן רק אם הערך החדש גדול יותר'],
    ['{ $rename: { oldName: "newName" } }', 'משנה שם של שדה'],
    ['{ $currentDate: { lastModified: true } }', 'מכניס את התאריך הנוכחי'],
    ['{ $set: { "address.city": "Haifa" } }', 'מעדכן שדה בתוך מסמך מוטמע (dot notation)'],
  ]},
  { title:'עבודה עם מערכים', rows:[
    ['{ $push: { skills: "SQL" } }', 'מוסיף איבר למערך (גם אם הוא כבר קיים)'],
    ['{ $addToSet: { skills: "SQL" } }', 'מוסיף איבר רק אם הוא לא קיים (מונע כפילויות)'],
    ['{ $pop: { lessons: 1 } }', 'מוחק את האיבר האחרון (‎-1 מוחק את הראשון)'],
    ['{ $pull: { lessons: { duration: { $lt: 90 } } } }', 'מוחק את כל האיברים שעומדים בתנאי'],
    ['{ $pullAll: { skills: ["SQL", "Excel"] } }', 'מוחק כמה ערכים ספציפיים'],
    ['{ $push: { skills: { $each: ["A", "B"] } } }', '$each: מוסיף כמה איברים בבת אחת'],
    ['{ $push: { lessons: { $each: [ { … } ], $position: 0 } } }', '$position: מכניס במיקום מסוים (0 = בהתחלה)'],
    ['{ $push: { skills: { $each: ["X"], $slice: -3 } } }', '$slice: אחרי ההוספה שומר רק את 3 האיברים האחרונים'],
    ['{ $inc: { "lessons.$[].duration": 10 } }', 'מעדכן את כל האיברים במערך'],
  ]},
  { title:'Aggregation: שלבים (Stages)', rows:[
    ['{ $match: { status: "Active" } }', 'מסנן מסמכים (WHERE). אחרי $group הוא משמש כ-HAVING'],
    ['{ $project: { _id: 0, name: "$firstName" } }', 'בוחר שדות, משנה שמות או יוצר שדות מחושבים (SELECT)'],
    ['{ $group: { _id: "$courseId", n: { $sum: 1 } } }', 'מקבץ מסמכים ומחשב (GROUP BY)'],
    ['{ $sort: { n: -1 } }', 'ממיין (ORDER BY)'],
    ['{ $limit: 3 }', 'מגביל את מספר התוצאות (TOP)'],
    ['{ $skip: 10 }', 'מדלג על תוצאות (Pagination)'],
    ['{ $unwind: "$lessons" }', 'מפרק מערך למסמכים נפרדים'],
    ['{ $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } }', 'מחבר Collection אחר (JOIN). התוצאה היא מערך'],
    ['{ $count: "total" }', 'סופר את המסמכים שהגיעו לשלב'],
    ['{ $addFields: { fullName: { $concat: ["$firstName", " ", "$lastName"] } } }', 'מוסיף שדות ושומר את כל השאר ($set זהה)'],
    ['{ $unset: ["email", "phone"] }', 'מסיר שדות'],
    ['{ $replaceRoot: { newRoot: "$lecturer" } }', 'מחליף את המסמך הראשי (‏$replaceWith: "$lecturer" זהה)'],
    ['{ $facet: { a: [ … ], b: [ … ] } }', 'מריץ כמה pipelines במקביל'],
    ['{ $out: "newCollection" }', 'שומר את התוצאה ב-Collection (חייב להיות השלב האחרון)'],
    ['{ $merge: { into: "stats" } }', 'ממזג את התוצאות לתוך Collection (חייב להיות השלב האחרון)'],
  ]},
  { title:'Accumulators וביטויים', rows:[
    ['{ $sum: 1 }', 'סופר מסמכים, כמו COUNT(*)'],
    ['{ $sum: "$grade" }', 'סכום'],
    ['{ $avg: "$grade" }', 'ממוצע (מתעלם מ-null)'],
    ['{ $min: "$grade" } / { $max: "$grade" }', 'מינימום / מקסימום'],
    ['{ $count: {} }', 'ספירה (זהה ל-$sum: 1)'],
    ['{ $first: "$x" } / { $last: "$x" }', 'הערך הראשון / האחרון בקבוצה (אחרי $sort)'],
    ['{ $push: "$grade" }', 'יוצר מערך מכל הערכים'],
    ['{ $addToSet: "$courseId" }', 'יוצר מערך של ערכים ייחודיים'],
    ['_id: null', 'קבוצה אחת לכל המסמכים'],
    ['_id: { s: "$studentId", c: "$courseId" }', 'קיבוץ לפי כמה שדות'],
    ['{ $concat: ["$firstName", " ", "$lastName"] }', 'שרשור מחרוזות (שם מלא)'],
    ['{ $round: ["$avg", 2] }', 'עיגול ל-2 ספרות אחרי הנקודה'],
    ['{ $cond: [ { $gte: ["$grade", 90] }, "A", "B" ] }', 'תנאי (CASE WHEN … ELSE). לכמה תנאים: $switch'],
    ['{ $ifNull: ["$grade", 0] }', 'ערך חלופי ל-null (כמו ISNULL)'],
    ['{ $year: "$submissionDate" } / { $month: "$submissionDate" }', 'חלק מתאריך, כמו YEAR / MONTH. בתוך find צריך לעטוף ב-$expr'],
    ['{ $size: "$enrollments" }', 'אורך מערך (למשל אחרי $lookup)'],
    ['{ $arrayElemAt: ["$course.courseName", 0] }', 'איבר במערך לפי אינדקס'],
  ]},
  { title:'פעולות נוספות ו-Shell', rows:[
    ['db.c.findOneAndUpdate(filter, update, { returnNewDocument: true })', 'מוצאת, מעדכנת ומחזירה את המסמך (כברירת מחדל, לפני השינוי)'],
    ['db.c.findOneAndDelete(filter, { sort: { … } })', 'מוצאת, מוחקת ומחזירה את המסמך'],
    ['db.c.findOneAndReplace(filter, newDoc)', 'מחליפה מסמך ומחזירה אותו (כברירת מחדל, לפני ההחלפה)'],
    ['db.c.bulkWrite([ { insertOne: … }, { updateOne: … } ])', 'מבצעת כמה פעולות בקריאה אחת, ליעילות'],
    ['db.c.estimatedDocumentCount()', 'הערכה מהירה של מספר המסמכים (בלי תנאי)'],
    ['db.c.createIndex({ city: 1 })', 'יוצרת אינדקס (CREATE INDEX)'],
    ['db.c.drop()', 'מוחקת את ה-Collection (DROP TABLE)'],
    ['use college', 'מעבר ל-database'],
    ['show collections', 'רשימת ה-Collections'],
    ['ObjectId("…") / ISODate("2025-10-01") / new Date()', 'מזהה / תאריך קבוע / התאריך הנוכחי'],
  ]},
];

/* ---------- מילון תרגום SQL ↔ MongoDB (על college2) ---------- */
SQLC.sqlVsMongo = [
  ['SELECT * FROM students;', 'db.students.find()', 'כל השורות = כל המסמכים'],
  ['SELECT firstName, lastName FROM students;', 'db.students.find({}, { firstName: 1, lastName: 1, _id: 0 })', 'בחירת עמודות היא Projection. השדה _id מוצג תמיד, אלא אם כותבים _id: 0'],
  ["SELECT * FROM students WHERE city = 'Haifa';", 'db.students.find({ city: "Haifa" })', 'שוויון נכתב ישירות: { שדה: ערך }'],
  ['SELECT * FROM students WHERE age > 25;', 'db.students.find({ age: { $gt: 25 } })', 'אופרטור ההשוואה נכתב בתוך השדה: $gt $gte $lt $lte $ne'],
  ['SELECT * FROM students WHERE age BETWEEN 22 AND 25;', 'db.students.find({ age: { $gte: 22, $lte: 25 } })', 'BETWEEN כולל את הקצוות, ולכן $gte ו-$lte באותו אובייקט'],
  ["SELECT * FROM students WHERE city IN ('Haifa', 'Holon');", 'db.students.find({ city: { $in: ["Haifa", "Holon"] } })', 'NOT IN מתורגם ל-$nin'],
  ["SELECT * FROM students WHERE city = 'Tel Aviv' AND age < 25;", 'db.students.find({ city: "Tel Aviv", age: { $lt: 25 } })', 'כמה שדות באותו filter מחוברים ב-AND מרומז'],
  ["SELECT * FROM students WHERE city = 'Haifa' OR age > 25;", 'db.students.find({ $or: [ { city: "Haifa" }, { age: { $gt: 25 } } ] })', '$or מקבל מערך של תנאים ונכתב ברמה העליונה של ה-filter'],
  ["SELECT * FROM students WHERE firstName LIKE 'S%';", 'db.students.find({ firstName: { $regex: "^S" } })', "LIKE '%x' הופך ל-\"x$\", ו-'%x%' הופך ל-\"x\". רגיש לרישיות, אלא אם מוסיפים $options: \"i\""],
  ['SELECT * FROM submissions WHERE grade IS NULL;', 'db.submissions.find({ grade: null })', 'מוצא גם מסמכים שאין בהם את השדה. IS NOT NULL הוא { grade: { $ne: null } }'],
  ['SELECT * FROM submissions WHERE YEAR(submissionDate) = 2025 AND MONTH(submissionDate) = 11;', 'db.submissions.find({ submissionDate: { $gte: ISODate("2025-11-01"), $lt: ISODate("2025-12-01") } })', 'חודש = טווח: מתחילת החודש (כולל) עד תחילת החודש הבא (לא כולל). חלופה: $expr עם $year ו-$month'],
  ['SELECT TOP 3 * FROM students ORDER BY age DESC;', 'db.students.find().sort({ age: -1 }).limit(3)', '1 = ASC, ‎-1 = DESC. ב-aggregate: $sort ואחריו $limit'],
  ["SELECT COUNT(*) FROM enrollments WHERE status = 'Active';", 'db.enrollments.countDocuments({ status: "Active" })', 'ב-aggregate: { $count: "n" }, או $sum: 1 בתוך $group'],
  ['SELECT DISTINCT city FROM students;', 'db.students.distinct("city")', 'התוצאה היא מערך של ערכים, לא מסמכים'],
  ['SELECT courseId, COUNT(*) AS n FROM enrollments GROUP BY courseId;', 'db.enrollments.aggregate([ { $group: { _id: "$courseId", n: { $sum: 1 } } } ])', 'עמודות ה-GROUP BY נכנסות ל-_id (עם $), ו-COUNT(*) הוא $sum: 1'],
  ['SELECT courseId, AVG(grade) AS avgGrade, MAX(grade) AS maxGrade FROM submissions GROUP BY courseId;', 'db.submissions.aggregate([ { $group: { _id: "$courseId", avgGrade: { $avg: "$grade" }, maxGrade: { $max: "$grade" } } } ])', 'AVG/SUM/MIN/MAX הופכים ל-$avg/$sum/$min/$max, ושניהם מתעלמים מ-NULL'],
  ['SELECT courseId, AVG(ISNULL(grade, 0)) AS avgWithZeros FROM submissions GROUP BY courseId;', 'db.submissions.aggregate([ { $group: { _id: "$courseId", avgWithZeros: { $avg: { $ifNull: ["$grade", 0] } } } } ])', 'ISNULL / COALESCE הופכים ל-$ifNull: הגשה בלי ציון נספרת כ-0 בממוצע'],
  ['SELECT courseId, COUNT(*) AS n FROM enrollments GROUP BY courseId HAVING COUNT(*) > 2;', 'db.enrollments.aggregate([ { $group: { _id: "$courseId", n: { $sum: 1 } } }, { $match: { n: { $gt: 2 } } } ])', 'HAVING הוא $match שבא אחרי $group, על השדה המחושב'],
  ['SELECT e.id, s.firstName FROM enrollments e JOIN students s ON e.studentId = s.id;', 'db.enrollments.aggregate([ { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "s" } }, { $unwind: "$s" }, { $project: { firstName: "$s.firstName" } } ])', '$lookup מחזיר מערך, ו-$unwind פורק אותו. מסמכים בלי התאמה נזרקים, כמו ב-INNER JOIN'],
  ['SELECT c.courseName, e.studentId FROM courses c LEFT JOIN enrollments e ON e.courseId = c.id;', 'db.courses.aggregate([ { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "e" } }, { $unwind: { path: "$e", preserveNullAndEmptyArrays: true } }, { $project: { _id: 0, courseName: 1, studentId: "$e.studentId" } } ])', 'preserveNullAndEmptyArrays: true שומר גם מסמכים בלי התאמה, כמו LEFT JOIN'],
  ['SELECT s.* FROM students s LEFT JOIN enrollments e ON s.id = e.studentId WHERE e.id IS NULL;', 'db.students.aggregate([ { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "e" } }, { $match: { e: { $size: 0 } } } ])', 'Anti-join ("אין להם אף…"): מערך ריק אחרי $lookup, עם { $size: 0 } או { e: [] }'],
  ["SELECT id, CASE WHEN grade >= 90 THEN 'Excellent' ELSE 'Regular' END AS level FROM submissions;", 'db.submissions.aggregate([ { $project: { level: { $cond: [ { $gte: ["$grade", 90] }, "Excellent", "Regular" ] } } } ])', 'לכמה תנאים משתמשים ב-$switch, עם branches ו-default'],
  ["SELECT firstName + ' ' + lastName AS fullName FROM students;", 'db.students.aggregate([ { $project: { _id: 0, fullName: { $concat: ["$firstName", " ", "$lastName"] } } } ])', 'ב-T-SQL משרשרים עם +, ובמונגו עם $concat (מחרוזות בלבד). _id: 0 כי ב-SELECT לא ביקשנו את ה-id'],
  ['SELECT CAST(AVG(grade) AS DECIMAL(5,2)) AS avgGrade FROM submissions;', 'db.submissions.aggregate([ { $group: { _id: null, avg: { $avg: "$grade" } } }, { $project: { _id: 0, avgGrade: { $round: ["$avg", 2] } } } ])', 'עיגול ל-2 ספרות. _id: null פירושו קבוצה אחת לכל המסמכים'],
  ["INSERT INTO students (id, firstName, city) VALUES (11, 'Roni', 'Haifa');", 'db.students.insertOne({ _id: 11, firstName: "Roni", city: "Haifa" })', 'לכמה שורות משתמשים ב-insertMany([ … ]). אין צורך ב-CREATE TABLE'],
  ["UPDATE students SET phone = '0529999999' WHERE id = 2;", 'db.students.updateOne({ _id: 2 }, { $set: { phone: "0529999999" } })', 'לכמה מסמכים משתמשים ב-updateMany. בלי $set זו שגיאה'],
  ['UPDATE lecturers SET seniority = seniority + 1;', 'db.lecturers.updateMany({}, { $inc: { seniority: 1 } })', 'filter ריק {} = כל המסמכים, כמו UPDATE בלי WHERE'],
  ['DELETE FROM submissions WHERE grade IS NULL;', 'db.submissions.deleteMany({ grade: null })', 'deleteOne מוחק רק את המסמך הראשון שמתאים'],
  ['ALTER TABLE students ADD region VARCHAR(20);', 'db.students.updateMany({ city: "Tel Aviv" }, { $set: { region: "Center" } })', 'אין ALTER: השדה החדש נוסף רק למסמכים שמעדכנים (סכמה גמישה)'],
  ['DROP TABLE enrollments;', 'db.enrollments.drop()', 'deleteMany({}) מוחק רק את המסמכים, וה-Collection נשאר'],
  ['CREATE INDEX ix_city ON students(city);', 'db.students.createIndex({ city: 1 })', 'אחרי יצירת האינדקס, explain() מראה IXSCAN במקום COLLSCAN'],
];

/* ---------- כרטיסיות NoSQL ---------- */
SQLC.flashcards = (SQLC.flashcards || []).concat([
  { track:'nosql', front:'מה זה NoSQL?', back:'בסיס נתונים לא רלציוני ("Not only SQL"). אין בו טבלאות עם סכמה קבועה, המבנה גמיש (מסמכים, מפתח-ערך, עמודות, גרפים), והוא מתרחב אופקית לשרתים רבים.' },
  { track:'nosql', front:'מהן 4 המשפחות של NoSQL?', back:'מסמכים (MongoDB), מפתח-ערך (Redis), עמודות / Wide-column (Cassandra), גרפים (Neo4j).' },
  { track:'nosql', front:'מה זה Vector Database?', back:'בסיס נתונים ששומר וקטורים (Embeddings) ומחפש לפי דמיון, כלומר השכנים הקרובים ביותר. משמש לחיפוש סמנטי ולמערכות AI / RAG.' },
  { track:'nosql', front:'Collection / Document / Field במונחי SQL?', back:'Collection = טבלה, Document = שורה, Field = עמודה. השדה _id הוא ה-Primary Key.' },
  { track:'nosql', front:'מה זה BSON?', back:'Binary JSON: הפורמט שבו MongoDB שומר מסמכים. הוא מהיר לסריקה ומוסיף טיפוסים כמו Date, ObjectId, int ו-Decimal128.' },
  { track:'nosql', front:'מה זה _id ו-ObjectId?', back:'_id הוא המפתח הראשי: חובה בכל מסמך וייחודי. אם לא נותנים ערך, נוצר ObjectId בגודל 12 בתים (חותמת זמן + ערך אקראי + מונה).' },
  { track:'nosql', front:'מה המשמעות של סכמה גמישה?', back:'מסמכים באותו Collection יכולים להכיל שדות שונים, ואין צורך ב-CREATE TABLE או ALTER TABLE. החיסרון: אין אכיפה אוטומטית של NOT NULL, CHECK או FK.' },
  { track:'nosql', front:'Scale-up מול Scale-out?', back:'Scale-up: משדרגים שרת אחד (טיפוסי ל-SQL). Scale-out: מוסיפים שרתים, וב-MongoDB זה Sharding. Replica Set הוא עותקים של הנתונים לזמינות גבוהה.' },
  { track:'nosql', front:'Embedding מול Referencing?', back:'Embedding: הנתונים שמורים בתוך המסמך. קריאה אחת, ומתאים לקשר 1:מעט, למערך חסום ולנתונים שנקראים יחד. Referencing: שומרים את ה-_id של מסמך אחר. אין כפילויות, ומתאים לישות עצמאית, ל-1:הרבה ול-M:N.' },
  { track:'nosql', front:'להטמיע את המרצה בקורס, או לשמור lecturerId?', back:'lecturerId (Reference). מרצה הוא ישות עצמאית שמלמדת כמה קורסים (או אף קורס), ושינוי בפרטים שלו לא צריך להתעדכן בהרבה מסמכים.' },
  { track:'nosql', front:'איך ממדלים קשר M:N ב-MongoDB?', back:'עם Collection מקשר, למשל enrollments עם studentId, courseId, enrollmentDate ו-status. זה המקביל לטבלת גישור.' },
  { track:'nosql', front:'מה מגבלת הגודל של מסמך ב-MongoDB?', back:'16MB. לכן לא מטמיעים מערכים שגדלים בלי גבול, כמו אלפי סטודנטים או עשרות אלפי הגשות בתוך קורס.' },
  { track:'nosql', front:'קורס עם 5,000 סטודנטים: להטמיע אותם במסמך הקורס?', back:'לא. זה מערך לא חסום: המסמך כבד, כל העדכונים מתרכזים במסמך אחד, נוצרות כפילויות, ושאילתה מהצד של הסטודנט קשה. הפתרון: Collection נפרד בשם enrollments, עם אינדקסים על courseId ועל studentId.' },
  { track:'nosql', front:'find(filter, projection): מה כל פרמטר?', back:'filter הוא התנאי (WHERE). projection קובע אילו שדות להציג: 1 = הצג, 0 = הסתר. השדה _id מוצג, אלא אם כותבים _id: 0.' },
  { track:'nosql', front:'findOne מול find?', back:'findOne מחזירה מסמך אחד (הראשון שמתאים) או null. find מחזירה Cursor עם כל המסמכים המתאימים.' },
  { track:'nosql', front:'updateOne מול updateMany?', back:'updateOne מעדכנת רק את המסמך הראשון שמתאים לתנאי. updateMany מעדכנת את כל המסמכים שמתאימים.' },
  { track:'nosql', front:'matchedCount מול modifiedCount?', back:'matchedCount הוא מספר המסמכים שעמדו בתנאי. modifiedCount הוא מספר המסמכים שהשתנו בפועל (0 אם הערך כבר היה זהה).' },
  { track:'nosql', front:'replaceOne מול updateOne עם $set?', back:'replaceOne מחליפה את כל המסמך, ושדות שלא נכתבו נמחקים (רק _id נשמר). $set משנה רק את השדות שצוינו.' },
  { track:'nosql', front:'מה זה upsert?', back:'האפשרות { upsert: true } בעדכון: אם יש מסמך מתאים הוא מתעדכן, ואם אין, נוצר מסמך חדש מהתנאי ומה-$set.' },
  { track:'nosql', front:'countDocuments מול estimatedDocumentCount?', back:'countDocuments סופרת בדיוק לפי תנאי. estimatedDocumentCount מחזירה הערכה מהירה של כל ה-Collection, בלי תנאי.' },
  { track:'nosql', front:'איפה כותבים את האופרטור בשאילתה, ואיפה בעדכון?', back:'בשאילתה, בתוך השדה: { grade: { $gt: 80 } }. בעדכון, מחוץ לשדה: { $set: { grade: 80 } }.' },
  { track:'nosql', front:'איך כותבים OR ב-MongoDB?', back:'{ $or: [ { city: "Haifa" }, { age: { $gt: 25 } } ] }. האופרטור $or מקבל מערך של תנאים ונכתב ברמה העליונה של ה-filter.' },
  { track:'nosql', front:'מה מוצא התנאי { grade: null }?', back:'מסמכים שבהם grade הוא null, וגם מסמכים שאין בהם את השדה בכלל. רק null מפורש: { $type: "null" }. רק שדה חסר: { $exists: false }.' },
  { track:'nosql', front:"איך כותבים LIKE 'S%' ב-MongoDB?", back:'{ firstName: { $regex: "^S" } }. כדי להתעלם מאותיות גדולות וקטנות מוסיפים $options: "i".' },
  { track:'nosql', front:'$size מול "lessons.2"?', back:'$size בודק רק אורך מדויק. כדי לבדוק "לפחות 3 איברים" כותבים { "lessons.2": { $exists: true } }, או $expr עם $size.' },
  { track:'nosql', front:'למה צריך $elemMatch?', back:'כדי שכמה תנאים יתקיימו על אותו איבר במערך. בלעדיו, כל תנאי יכול להתקיים באיבר אחר.' },
  { track:'nosql', front:'$push מול $addToSet?', back:'$push מוסיף תמיד, גם כפילות. $addToSet מוסיף רק אם הערך לא קיים במערך.' },
  { track:'nosql', front:'$pull מול $pullAll מול $pop?', back:'$pull מוחק איברים לפי תנאי. $pullAll מוחק רשימה של ערכים ספציפיים. $pop מוחק את האיבר האחרון (1) או את הראשון (-1).' },
  { track:'nosql', front:'למה צריך $each?', back:'כדי להוסיף כמה איברים בפעולה אחת עם $push או $addToSet. בלי $each המערך כולו נכנס כאיבר אחד. גם $position ו-$slice עובדים רק עם $each.' },
  { track:'nosql', front:'מה זה Aggregation Pipeline?', back:'מערך של שלבים שכל אחד מעבד את הפלט של השלב הקודם, למשל $match, אחריו $group, אחריו $lookup, $project, $sort ו-$limit. הסדר קובע.' },
  { track:'nosql', front:'איך כותבים HAVING ב-MongoDB?', back:'$match שבא אחרי $group, על השדה המחושב. למשל { $match: { n: { $gt: 2 } } }.' },
  { track:'nosql', front:'איך כותבים JOIN ב-MongoDB?', back:'$lookup (עם from, localField, foreignField ו-as) מחזיר מערך, ו-$unwind פורק אותו למסמך. preserveNullAndEmptyArrays: true הופך את הצירוף ל-LEFT JOIN.' },
  { track:'nosql', front:'איך מוצאים סטודנטים בלי אף הרשמה במונגו?', back:'$lookup ל-enrollments, ואחריו $match: { enrollments: { $size: 0 } }. זה Anti-join, המקביל ל-LEFT JOIN … WHERE e.id IS NULL.' },
  { track:'nosql', front:'מה המשמעות של _id: null ב-$group?', back:'קבוצה אחת שמכילה את כל המסמכים, כלומר חישוב על כל ה-Collection (כמו COUNT(*) בלי GROUP BY).' },
  { track:'nosql', front:'למה כותבים "$grade" עם דולר?', back:'בתוך ביטוי, "$grade" פירושו הערך של השדה grade. "grade" בלי דולר הוא סתם מחרוזת קבועה.' },
  { track:'nosql', front:'$sum: 1 מול ספירה של ציונים בלבד?', back:'$sum: 1 סופר את כל המסמכים (כמו COUNT(*)), גם אלה עם grade null. $avg מתעלם מ-null. כדי לספור רק ציונים, מסננים קודם עם $match, או משתמשים ב-$cond.' },
  { track:'nosql', front:'איך כותבים ISNULL(grade, 0) ב-MongoDB?', back:'{ $ifNull: ["$grade", 0] }. מחזיר 0 כשה-grade הוא null או חסר. למשל ממוצע שבו הגשה בלי ציון נחשבת 0: { $avg: { $ifNull: ["$grade", 0] } }.' },
  { track:'nosql', front:'איך מסננים לפי חודש (MONTH = 11) ב-MongoDB?', back:'עם טווח: { submissionDate: { $gte: ISODate("2025-11-01"), $lt: ISODate("2025-12-01") } }. חלופה: $expr עם { $month: "$submissionDate" } ו-{ $year: … }.' },
  { track:'nosql', front:'$project מול $addFields?', back:'$project משאיר רק את השדות שנבחרו. $addFields (או $set) מוסיף שדות ושומר את כל השאר.' },
  { track:'nosql', front:'איך בונים שם מלא ב-MongoDB?', back:'{ $concat: ["$firstName", " ", "$lastName"] }. אם השדות הגיעו מ-$lookup, צריך $unwind לפני כן, אחרת הם מערכים.' },
  { track:'nosql', front:'איך מוצאים את "הטוב ביותר בכל קבוצה"?', back:'קודם $sort, ואחריו $group עם $first. כך פתרנו את שאלה 8: הקורס עם הממוצע הגבוה ביותר לכל סטודנט.' },
  { track:'nosql', front:'$out מול $merge?', back:'שניהם שומרים את התוצאה של ה-pipeline ב-Collection, ושניהם חייבים להיות השלב האחרון. $out מחליף את כל ה-Collection, ו-$merge ממזג מסמך-מסמך.' },
  { track:'nosql', front:"'Active' מול 'active': יש הבדל?", back:'ב-SQL Server, עם ה-Collation של ברירת המחדל, אין הבדל. ב-MongoDB יש הבדל: "active" לא שווה ל-"Active".' },
]);

/* ---------- דגשים חמים לחלק ה-NoSQL ---------- */
SQLC.nosqlTips = [
  'בכל שאלה כתבו <b>גם SQL וגם MongoDB</b>, כמו ב"עבודת ישור קו". התחילו מה-SQL, ותרגמו לפי סדר הביצוע: <code dir="ltr">$match → $lookup + $unwind → $group → $match → $project → $sort → $limit</code>.',
  'אופרטור <b>סינון</b> נכתב <b>בתוך</b> השדה: <code dir="ltr">{ grade: { $gt: 80 } }</code>. אופרטור <b>עדכון</b> נכתב <b>מחוץ</b> לשדה: <code dir="ltr">{ $set: { grade: 80 } }</code>. עדכון בלי <code dir="ltr">$set</code> הוא שגיאה.',
  '<b>JOIN</b> = <code dir="ltr">$lookup</code> + <code dir="ltr">$unwind</code>, ו-<code dir="ltr">$lookup</code> תמיד מחזיר מערך. בשאלה מסוג <b>"אין להם אף…"</b> כותבים <code dir="ltr">$lookup</code> + <code dir="ltr">{ $size: 0 }</code>, המקביל ל-<code dir="ltr">LEFT JOIN … IS NULL</code>.',
  '<b>HAVING</b> = <code dir="ltr">$match</code> <u>אחרי</u> <code dir="ltr">$group</code>. "יותר משני" פירושו <code dir="ltr">$gt: 2</code>, ולא <code dir="ltr">$gte</code>.',
  'ב-<code dir="ltr">$group</code> כותבים <code dir="ltr">_id: "$field"</code> <b>עם $</b>. <code dir="ltr">$sum: 1</code> סופר מסמכים, ו-<code dir="ltr">$avg</code> מתעלם מ-<code dir="ltr">null</code>. שימו לב ש-<code dir="ltr">{ grade: null }</code> מוצא גם מסמכים שאין בהם את השדה.',
  'בשאלות מידול <b>נמקו</b> לפי ארבע שאלות: (1) האם הנתונים נקראים יחד, (2) האם המערך חסום (מגבלת 16MB), (3) האם הישות עצמאית או משותפת, (4) כמה היא משתנה. מרצה = Reference, שיעורים = Embedded, הרשמות והגשות = Collection נפרד.',
  'אל תשכחו לסנן <code dir="ltr">status: "Active"</code> כשהשאלה מדברת על הרשמות "פעילות". במונגו <code dir="ltr">"active"</code> ≠ <code dir="ltr">"Active"</code>, כי יש רגישות לאותיות גדולות וקטנות.',
  'שם מלא: <code dir="ltr">{ $concat: ["$student.firstName", " ", "$student.lastName"] }</code>. עיגול: <code dir="ltr">{ $round: ["$avg", 2] }</code>. Top-N: <code dir="ltr">$sort</code> ואחריו <code dir="ltr">$limit</code>, ובמקרה של שוויון מוסיפים מפתח מיון שני.',
];
