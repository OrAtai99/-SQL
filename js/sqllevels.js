/* ============================================================
   מסלול SQL מדורג — 14 רמות ננעלות.
   כל רמה: שיעור קצר + תרגילים חיים (רצים על אותה סכימה).
   כל תרגיל בפורמט של gradeSql: {prompt, solution, check, mutateTable?, hint}
   ============================================================ */
window.COURSE.sqlLevels = [
{
  id:1, title:"SELECT בסיסי", subtitle:"שליפת כל הנתונים מטבלה", tags:["SELECT","FROM","*"],
  lesson:`<p>כל שאילתת שליפה מתחילה ב-<code>SELECT</code> (מה להציג) ו-<code>FROM</code> (מאיזו טבלה). הכוכבית <code>*</code> מציגה את <b>כל</b> העמודות.</p>
    <pre>SELECT *
FROM Students;</pre>
    <p>זה יחזיר את כל השורות וכל העמודות של טבלת הסטודנטים. תמיד מסיימים בנקודה-פסיק <code>;</code>.</p>`,
  exercises:[
    { prompt:"הצג את כל הרשומות והעמודות מטבלת Students.", solution:"SELECT * FROM Students;", check:"select", hint:"SELECT * FROM Students;" },
    { prompt:"הצג את כל הרשומות מטבלת Cars.", solution:"SELECT * FROM Cars;", check:"select", hint:"SELECT * FROM Cars;" },
    { prompt:"הצג את כל הרשומות מטבלת Departments.", solution:"SELECT * FROM Departments;", check:"select", hint:"SELECT * FROM Departments;" },
    { prompt:"הצג את כל הרשומות מטבלת Products.", solution:"SELECT * FROM Products;", check:"select", hint:"SELECT * FROM Products;" }
  ]
},
{
  id:2, title:"בחירת עמודות", subtitle:"להציג רק את מה שצריך", tags:["SELECT col1, col2","AS"],
  lesson:`<p>במקום <code>*</code>, כותבים את שמות העמודות שרוצים, מופרדים בפסיקים:</p>
    <pre>SELECT StudentName, GPA
FROM Students;</pre>
    <p>אפשר לתת לעמודה כותרת חלופית בתצוגה עם <code>AS</code>:</p>
    <pre>SELECT StudentName AS Name, GPA AS Grade
FROM Students;</pre>`,
  exercises:[
    { prompt:"הצג רק את שם הסטודנט (StudentName) וה-GPA שלו.", solution:"SELECT StudentName, GPA FROM Students;", check:"select", hint:"SELECT StudentName, GPA FROM Students;" },
    { prompt:"הצג את הקטגוריה (Category) והמחיר (UnitPrice) של המוצרים.", solution:"SELECT Category, UnitPrice FROM Products;", check:"select", hint:"מפרידים בין שמות העמודות בפסיק." },
    { prompt:"הצג את שם העובד (EmpName) והשכר (Salary).", solution:"SELECT EmpName, Salary FROM Employees;", check:"select", hint:"SELECT EmpName, Salary FROM Employees;" },
    { prompt:"הצג את שם המחלקה (DeptName) בלבד מטבלת Departments.", solution:"SELECT DeptName FROM Departments;", check:"select", hint:"עמודה אחת בלבד ב-SELECT." }
  ]
},
{
  id:3, title:"סינון עם WHERE", subtitle:"להחזיר רק שורות שמקיימות תנאי", tags:["WHERE","=","<>","<",">"],
  lesson:`<p><code>WHERE</code> מסנן שורות לפי תנאי. אופרטורים: <code>=</code> שווה, <code>&lt;&gt;</code> שונה, <code>&gt;</code> גדול, <code>&lt;</code> קטן, <code>&gt;=</code>, <code>&lt;=</code>.</p>
    <pre>SELECT * FROM Employees
WHERE Salary > 9000;</pre>
    <div class="callout warn">טקסט תמיד עוטפים בגרשיים בודדים: <code>WHERE Faculty = 'Engineering'</code>. מספרים — בלי גרשיים.</div>`,
  exercises:[
    { prompt:"הצג את כל הסטודנטים מפקולטת 'Engineering'.", solution:"SELECT * FROM Students WHERE Faculty = 'Engineering';", check:"select", hint:"WHERE Faculty = 'Engineering' — טקסט בגרשיים." },
    { prompt:"הצג עובדים ששכרם (Salary) גבוה מ-9,000.", solution:"SELECT * FROM Employees WHERE Salary > 9000;", check:"select", hint:"WHERE Salary > 9000 (מספר בלי גרשיים)." },
    { prompt:"הצג מוצרים שמחירם (UnitPrice) נמוך מ-100.", solution:"SELECT * FROM Products WHERE UnitPrice < 100;", check:"select", hint:"WHERE UnitPrice < 100." },
    { prompt:"הצג את כל הרכבים שאינם אדומים (Color שונה מ-'Red').", solution:"SELECT * FROM Cars WHERE Color <> 'Red';", check:"select", hint:"WHERE Color <> 'Red' — הסימן <> אומר 'שונה מ'." },
    { prompt:"הצג סטודנטים עם GPA של 90 ומעלה.", solution:"SELECT * FROM Students WHERE GPA >= 90;", check:"select", hint:"WHERE GPA >= 90." }
  ]
},
{
  id:4, title:"תנאים מרובים", subtitle:"לשלב תנאים עם AND / OR / NOT", tags:["AND","OR","NOT"],
  lesson:`<p><b>AND</b> — כל התנאים חייבים להתקיים. <b>OR</b> — מספיק שאחד יתקיים. <b>NOT</b> — הופך תנאי.</p>
    <pre>WHERE Faculty = 'Engineering' AND GPA > 88</pre>
    <div class="callout warn">כשמערבבים AND ו-OR — <b>חובה סוגריים</b> כדי לקבוע את הסדר:<br><code>WHERE Color='Red' AND (Price>100000 OR Year>2022)</code></div>`,
  exercises:[
    { prompt:"הצג סטודנטים מ-'Engineering' שה-GPA שלהם מעל 88.", solution:"SELECT * FROM Students WHERE Faculty = 'Engineering' AND GPA > 88;", check:"select", hint:"שני תנאים מחוברים ב-AND." },
    { prompt:"הצג עובדים ששייכים למחלקה 1 או למחלקה 2 (DeptID).", solution:"SELECT * FROM Employees WHERE DeptID = 1 OR DeptID = 2;", check:"select", hint:"WHERE DeptID = 1 OR DeptID = 2." },
    { prompt:"הצג רכבים אדומים שמחירם מעל 100,000.", solution:"SELECT * FROM Cars WHERE Color = 'Red' AND Price > 100000;", check:"select", hint:"Color='Red' AND Price>100000." },
    { prompt:"הצג את כל המוצרים שאינם בקטגוריית 'Food' (השתמש ב-NOT).", solution:"SELECT * FROM Products WHERE NOT Category = 'Food';", check:"select", hint:"WHERE NOT Category = 'Food' (או Category <> 'Food')." },
    { prompt:"הצג רכבים אדומים שמחירם מעל 100,000 או ששנתם אחרי 2022. שים לב לסוגריים!", solution:"SELECT * FROM Cars WHERE Color = 'Red' AND (Price > 100000 OR Year > 2022);", check:"select", hint:"Color='Red' AND (Price>100000 OR Year>2022) — הסוגריים קריטיים." }
  ]
},
{
  id:5, title:"טווחים ורשימות", subtitle:"BETWEEN לטווח, IN לרשימת ערכים", tags:["BETWEEN","IN"],
  lesson:`<p><code>BETWEEN a AND b</code> בודק אם ערך בטווח — <b>כולל את שני הקצוות</b>. <code>IN</code> בודק אם ערך שייך לרשימה.</p>
    <pre>WHERE GPA BETWEEN 85 AND 95
WHERE Faculty IN ('Engineering','Arts')</pre>`,
  exercises:[
    { prompt:"הצג מוצרים שמחירם (UnitPrice) בין 40 ל-600.", solution:"SELECT * FROM Products WHERE UnitPrice BETWEEN 40 AND 600;", check:"select", hint:"WHERE UnitPrice BETWEEN 40 AND 600 — כולל את הקצוות." },
    { prompt:"הצג סטודנטים עם GPA בין 85 ל-95.", solution:"SELECT * FROM Students WHERE GPA BETWEEN 85 AND 95;", check:"select", hint:"BETWEEN 85 AND 95." },
    { prompt:"הצג עובדים ממחלקות 1 ו-3 (השתמש ב-IN).", solution:"SELECT * FROM Employees WHERE DeptID IN (1, 3);", check:"select", hint:"WHERE DeptID IN (1, 3)." },
    { prompt:"הצג סטודנטים מהפקולטות 'Engineering' או 'Arts' (השתמש ב-IN).", solution:"SELECT * FROM Students WHERE Faculty IN ('Engineering','Arts');", check:"select", hint:"WHERE Faculty IN ('Engineering','Arts')." },
    { prompt:"הצג רכבים משנות הייצור 2019, 2020 או 2021.", solution:"SELECT * FROM Cars WHERE Year IN (2019, 2020, 2021);", check:"select", hint:"WHERE Year IN (2019, 2020, 2021)." }
  ]
},
{
  id:6, title:"חיפוש טקסט", subtitle:"התאמה חלקית עם LIKE", tags:["LIKE","%"],
  lesson:`<p><code>LIKE</code> מחפש לפי תבנית. הסימן <code>%</code> = אפס או יותר תווים:</p>
    <ul><li><code>'A%'</code> — מתחיל ב-A</li><li><code>'%com'</code> — מסתיים ב-com</li><li><code>'%gmail%'</code> — מכיל gmail</li></ul>
    <pre>WHERE Email LIKE '%gmail%'</pre>`,
  exercises:[
    { prompt:"הצג סטודנטים ששמם (StudentName) מתחיל באות א.", solution:"SELECT * FROM Students WHERE StudentName LIKE 'א%';", check:"select", hint:"LIKE 'א%' — האות ואז % לכל השאר." },
    { prompt:"הצג סטודנטים שכתובת האימייל שלהם מכילה 'gmail'.", solution:"SELECT * FROM Students WHERE Email LIKE '%gmail%';", check:"select", hint:"LIKE '%gmail%' — אחוזים משני הצדדים = מכיל." },
    { prompt:"הצג סטודנטים שהאימייל שלהם מסתיים ב-'.com'.", solution:"SELECT * FROM Students WHERE Email LIKE '%.com';", check:"select", hint:"LIKE '%.com' — אחוז לפני = מסתיים ב." },
    { prompt:"הצג מוצרים שהקטגוריה שלהם מתחילה באות E.", solution:"SELECT * FROM Products WHERE Category LIKE 'E%';", check:"select", hint:"LIKE 'E%'." },
    { prompt:"הצג הזמנות מערים ששמן מכיל 'תל'.", solution:"SELECT * FROM Orders WHERE City LIKE '%תל%';", check:"select", hint:"LIKE '%תל%'." }
  ]
},
{
  id:7, title:"ערכים ייחודיים", subtitle:"הסרת כפילויות עם DISTINCT", tags:["DISTINCT","COUNT(DISTINCT)"],
  lesson:`<p><code>DISTINCT</code> מציג כל ערך פעם אחת בלבד (ללא כפילויות).</p>
    <pre>SELECT DISTINCT Faculty FROM Students;</pre>
    <p>לספירת ערכים ייחודיים: <code>COUNT(DISTINCT ...)</code>:</p>
    <pre>SELECT COUNT(DISTINCT UserID) FROM Logins;</pre>`,
  exercises:[
    { prompt:"הצג את רשימת הפקולטות הייחודיות (ללא כפילויות).", solution:"SELECT DISTINCT Faculty FROM Students;", check:"select", hint:"SELECT DISTINCT Faculty ..." },
    { prompt:"הצג את רשימת הערים הייחודיות מטבלת Orders.", solution:"SELECT DISTINCT City FROM Orders;", check:"select", hint:"SELECT DISTINCT City FROM Orders;" },
    { prompt:"הצג את רשימת הקטגוריות הייחודיות של המוצרים.", solution:"SELECT DISTINCT Category FROM Products;", check:"select", hint:"SELECT DISTINCT Category FROM Products;" },
    { prompt:"כמה פקולטות שונות קיימות? (השתמש ב-COUNT DISTINCT)", solution:"SELECT COUNT(DISTINCT Faculty) FROM Students;", check:"select", hint:"COUNT(DISTINCT Faculty)." },
    { prompt:"כמה משתמשים ייחודיים (UserID) התחברו בטבלת Logins?", solution:"SELECT COUNT(DISTINCT UserID) FROM Logins;", check:"select", hint:"COUNT(DISTINCT UserID)." }
  ]
},
{
  id:8, title:"מיון תוצאות", subtitle:"ORDER BY — עולה ויורד", tags:["ORDER BY","ASC","DESC"],
  lesson:`<p><code>ORDER BY</code> ממיין את התוצאות. <code>ASC</code> = עולה (ברירת מחדל), <code>DESC</code> = יורד. תמיד בסוף השאילתה.</p>
    <pre>SELECT * FROM Students
ORDER BY GPA DESC;</pre>
    <p>אפשר למיין לפי כמה עמודות: <code>ORDER BY Faculty ASC, GPA DESC</code></p>`,
  exercises:[
    { prompt:"הצג את כל הסטודנטים ממוינים לפי GPA מהגבוה לנמוך.", solution:"SELECT * FROM Students ORDER BY GPA DESC;", check:"select", hint:"ORDER BY GPA DESC." },
    { prompt:"הצג את כל העובדים ממוינים לפי שכר מהנמוך לגבוה.", solution:"SELECT * FROM Employees ORDER BY Salary ASC;", check:"select", hint:"ORDER BY Salary ASC (או בלי ASC — זו ברירת המחדל)." },
    { prompt:"הצג מוצרים ממוינים לפי מחיר מהגבוה לנמוך.", solution:"SELECT * FROM Products ORDER BY UnitPrice DESC;", check:"select", hint:"ORDER BY UnitPrice DESC." },
    { prompt:"הצג סטודנטים ממוינים לפי פקולטה (עולה) ובתוך כל פקולטה לפי GPA (יורד).", solution:"SELECT * FROM Students ORDER BY Faculty ASC, GPA DESC;", check:"select", hint:"ORDER BY Faculty ASC, GPA DESC — מיון מרובה." },
    { prompt:"הצג רכבים אדומים בלבד, ממוינים לפי מחיר מהגבוה לנמוך.", solution:"SELECT * FROM Cars WHERE Color = 'Red' ORDER BY Price DESC;", check:"select", hint:"קודם WHERE Color='Red', ואז ORDER BY Price DESC." }
  ]
},
{
  id:9, title:"פונקציות חישוב", subtitle:"COUNT, SUM, AVG, MIN, MAX", tags:["COUNT","SUM","AVG","MIN","MAX"],
  lesson:`<p>פונקציות אגרגציה מחשבות ערך אחד מכל השורות:</p>
    <ul><li><code>COUNT(*)</code> — כמה שורות</li><li><code>SUM(col)</code> — סכום</li><li><code>AVG(col)</code> — ממוצע</li><li><code>MAX/MIN(col)</code> — הכי גבוה/נמוך</li></ul>
    <div class="callout warn"><code>COUNT(עמודה)</code> <b>לא סופר NULL</b>, אבל <code>COUNT(*)</code> סופר את כל השורות.</div>`,
  exercises:[
    { prompt:"כמה סטודנטים יש בטבלת Students?", solution:"SELECT COUNT(*) FROM Students;", check:"select", hint:"SELECT COUNT(*) FROM Students;" },
    { prompt:"מהו סכום כל המשכורות בטבלת Employees?", solution:"SELECT SUM(Salary) FROM Employees;", check:"select", hint:"SELECT SUM(Salary) FROM Employees;" },
    { prompt:"מהו ממוצע ה-GPA של כל הסטודנטים?", solution:"SELECT AVG(GPA) FROM Students;", check:"select", hint:"SELECT AVG(GPA) FROM Students;" },
    { prompt:"מהו השכר הגבוה ביותר בטבלת Employees?", solution:"SELECT MAX(Salary) FROM Employees;", check:"select", hint:"SELECT MAX(Salary) FROM Employees;" },
    { prompt:"מהו המחיר הנמוך ביותר בטבלת Products?", solution:"SELECT MIN(UnitPrice) FROM Products;", check:"select", hint:"SELECT MIN(UnitPrice) FROM Products;" }
  ]
},
{
  id:10, title:"תאריכים וערכים חסרים", subtitle:"NULL וסינון לפי תאריך", tags:["IS NULL","IS NOT NULL","YEAR"],
  lesson:`<p>ערך חסר הוא <code>NULL</code>. בודקים אותו <b>תמיד</b> עם <code>IS NULL</code> / <code>IS NOT NULL</code> — לעולם לא עם <code>= NULL</code>.</p>
    <pre>WHERE Bonus IS NULL</pre>
    <div class="callout warn">בסינון לפי שנה: <b>במבחן הכתוב</b> משתמשים ב-<code>YEAR(OrderDate)=2023</code>. במגרש כאן (SQLite) נשתמש בתבנית <code>OrderDate LIKE '2023%'</code>.</div>`,
  exercises:[
    { prompt:"הצג עובדים שאין להם בונוס (Bonus ריק).", solution:"SELECT * FROM Employees WHERE Bonus IS NULL;", check:"select", hint:"WHERE Bonus IS NULL — לא = NULL!" },
    { prompt:"הצג עובדים שיש להם בונוס (Bonus לא ריק).", solution:"SELECT * FROM Employees WHERE Bonus IS NOT NULL;", check:"select", hint:"WHERE Bonus IS NOT NULL." },
    { prompt:"הצג רשומות UserLogs שהתאריך (LogDate) בהן ריק.", solution:"SELECT * FROM UserLogs WHERE LogDate IS NULL;", check:"select", hint:"WHERE LogDate IS NULL." },
    { prompt:"הצג את כל ההזמנות משנת 2023 (רמז: OrderDate מתחיל ב-'2023').", solution:"SELECT * FROM Orders WHERE OrderDate LIKE '2023%';", check:"select", hint:"WHERE OrderDate LIKE '2023%'." },
    { prompt:"הצג את ההתחברויות (Logins) משנת 2025.", solution:"SELECT * FROM Logins WHERE LoginDate LIKE '2025%';", check:"select", hint:"WHERE LoginDate LIKE '2025%'." }
  ]
},
{
  id:11, title:"קיבוץ נתונים", subtitle:"GROUP BY — סיכום לכל קבוצה", tags:["GROUP BY"],
  lesson:`<p><code>GROUP BY</code> מקבץ שורות בעלות ערך משותף, ומחשב אגרגציה לכל קבוצה.</p>
    <pre>SELECT Faculty, COUNT(*)
FROM Students
GROUP BY Faculty;</pre>
    <div class="callout warn">כלל: כל עמודה ב-SELECT שאינה בתוך פונקציית אגרגציה — חייבת להופיע ב-GROUP BY.</div>`,
  exercises:[
    { prompt:"כמה סטודנטים יש בכל פקולטה? הצג פקולטה ומספר.", solution:"SELECT Faculty, COUNT(*) AS Num FROM Students GROUP BY Faculty;", check:"select", hint:"GROUP BY Faculty עם COUNT(*)." },
    { prompt:"הצג לכל עיר את סך סכומי ההזמנות (TotalPrice).", solution:"SELECT City, SUM(TotalPrice) AS Total FROM Orders GROUP BY City;", check:"select", hint:"GROUP BY City עם SUM(TotalPrice)." },
    { prompt:"הצג לכל מחלקה (DeptID) את השכר הממוצע.", solution:"SELECT DeptID, AVG(Salary) AS AvgSalary FROM Employees GROUP BY DeptID;", check:"select", hint:"GROUP BY DeptID עם AVG(Salary)." },
    { prompt:"כמה מוצרים יש בכל קטגוריה?", solution:"SELECT Category, COUNT(*) AS Num FROM Products GROUP BY Category;", check:"select", hint:"GROUP BY Category עם COUNT(*)." },
    { prompt:"כמה הזמנות ביצע כל לקוח (CustomerID)?", solution:"SELECT CustomerID, COUNT(*) AS Num FROM Orders GROUP BY CustomerID;", check:"select", hint:"GROUP BY CustomerID עם COUNT(*)." }
  ]
},
{
  id:12, title:"סינון קבוצות", subtitle:"HAVING — תנאי על תוצאה קבוצתית", tags:["HAVING","WHERE vs HAVING"],
  lesson:`<p><code>HAVING</code> מסנן <b>קבוצות</b> אחרי GROUP BY, בדיוק כמו ש-WHERE מסנן שורות לפניו.</p>
    <pre>SELECT City, SUM(TotalPrice) AS Total
FROM Orders
GROUP BY City
HAVING SUM(TotalPrice) > 2000;</pre>
    <div class="callout warn"><b>WHERE</b> = לפני הקיבוץ (שורות). <b>HAVING</b> = אחרי הקיבוץ (על SUM/COUNT/AVG).</div>`,
  exercises:[
    { prompt:"הצג פקולטות שיש בהן יותר מסטודנט אחד (פקולטה + מספר).", solution:"SELECT Faculty, COUNT(*) AS Num FROM Students GROUP BY Faculty HAVING COUNT(*) > 1;", check:"select", hint:"GROUP BY Faculty ... HAVING COUNT(*) > 1." },
    { prompt:"הצג ערים שסך ההזמנות בהן מעל 2,000.", solution:"SELECT City, SUM(TotalPrice) AS Total FROM Orders GROUP BY City HAVING SUM(TotalPrice) > 2000;", check:"select", hint:"HAVING SUM(TotalPrice) > 2000." },
    { prompt:"הצג מחלקות (DeptID) שהשכר הממוצע בהן מעל 9,000.", solution:"SELECT DeptID, AVG(Salary) AS AvgSalary FROM Employees GROUP BY DeptID HAVING AVG(Salary) > 9000;", check:"select", hint:"HAVING AVG(Salary) > 9000." },
    { prompt:"הצג לקוחות (CustomerID) שביצעו יותר מהזמנה אחת.", solution:"SELECT CustomerID, COUNT(*) AS Num FROM Orders GROUP BY CustomerID HAVING COUNT(*) > 1;", check:"select", hint:"HAVING COUNT(*) > 1." },
    { prompt:"הצג קטגוריות שיש בהן 2 מוצרים או יותר.", solution:"SELECT Category, COUNT(*) AS Num FROM Products GROUP BY Category HAVING COUNT(*) >= 2;", check:"select", hint:"HAVING COUNT(*) >= 2." }
  ]
},
{
  id:13, title:"חיבור טבלאות", subtitle:"JOIN — לשלב מידע מטבלאות", tags:["JOIN","INNER","LEFT"],
  lesson:`<p><code>JOIN</code> מחבר טבלאות לפי עמודה משותפת (בעזרת <code>ON</code>). <b>INNER JOIN</b> מחזיר רק התאמות; <b>LEFT JOIN</b> שומר את כל השמאלית גם בלי התאמה.</p>
    <pre>SELECT c.ClinicName, d.DoctorName
FROM Clinics c
JOIN Doctors d ON d.ClinicID = c.ClinicID;</pre>
    <p>נהוג לתת לטבלאות כינוי קצר (c, d) ולהשתמש בו לפני שמות העמודות.</p>`,
  exercises:[
    { prompt:"הצג את שם המרפאה (ClinicName) ואת שם הרופא (DoctorName) לכל רופא.", solution:"SELECT c.ClinicName, d.DoctorName FROM Clinics c JOIN Doctors d ON d.ClinicID = c.ClinicID;", check:"select", hint:"JOIN Doctors ON d.ClinicID = c.ClinicID." },
    { prompt:"הצג את שם העובד (EmpName) ואת שם המחלקה שלו (DeptName).", solution:"SELECT e.EmpName, d.DeptName FROM Employees e JOIN Departments d ON e.DeptID = d.DeptID;", check:"select", hint:"JOIN Departments ON e.DeptID = d.DeptID." },
    { prompt:"הצג את שם המרפאה ואת מספר הרופאים בכל מרפאה (JOIN + GROUP BY).", solution:"SELECT c.ClinicName, COUNT(d.DoctorID) AS Num FROM Clinics c JOIN Doctors d ON d.ClinicID = c.ClinicID GROUP BY c.ClinicName;", check:"select", hint:"JOIN ואז GROUP BY c.ClinicName עם COUNT." },
    { prompt:"הצג את כל המחלקות ומספר העובדים בכל אחת — כולל מחלקות ללא עובדים (LEFT JOIN).", solution:"SELECT d.DeptName, COUNT(e.EmpID) AS Num FROM Departments d LEFT JOIN Employees e ON e.DeptID = d.DeptID GROUP BY d.DeptName;", check:"select", hint:"LEFT JOIN כדי לכלול מחלקות ריקות (יציגו 0)." },
    { prompt:"הצג את שם הסטודנט ואת שם הקורס לכל רישום (Enrollments).", solution:"SELECT s.StudentName, co.CourseName FROM Enrollments e JOIN Students s ON s.StudentID = e.StudentID JOIN Courses co ON co.CourseID = e.CourseID;", check:"select", hint:"JOIN כפול: קודם ל-Students ואז ל-Courses." }
  ]
},
{
  id:14, title:"שינוי נתונים (DML)", subtitle:"INSERT, UPDATE, DELETE", tags:["INSERT","UPDATE","DELETE"],
  lesson:`<p>פקודות לשינוי הנתונים:</p>
    <pre>INSERT INTO Departments VALUES (5, 'Marketing');
UPDATE Products SET UnitPrice = UnitPrice * 0.95 WHERE Category = 'Electronics';
DELETE FROM Orders WHERE TotalPrice < 400;</pre>
    <div class="callout warn">🚨 <b>UPDATE / DELETE ללא WHERE ישפיעו על כל הרשומות בטבלה!</b> תמיד בדוק את ה-WHERE.</div>`,
  exercises:[
    { prompt:"הוסף מחלקה חדשה: DeptID=5, DeptName='Marketing'.", solution:"INSERT INTO Departments VALUES (5, 'Marketing');", check:"mutate", mutateTable:"Departments", hint:"INSERT INTO Departments VALUES (5, 'Marketing');" },
    { prompt:"עדכן את מחיר כל מוצרי 'Electronics' כך שיקטן ב-5%.", solution:"UPDATE Products SET UnitPrice = UnitPrice * 0.95 WHERE Category = 'Electronics';", check:"mutate", mutateTable:"Products", hint:"UPDATE ... SET UnitPrice = UnitPrice * 0.95 WHERE Category='Electronics'." },
    { prompt:"העלה את השכר של עובדי מחלקה 3 ב-10%.", solution:"UPDATE Employees SET Salary = Salary * 1.1 WHERE DeptID = 3;", check:"mutate", mutateTable:"Employees", hint:"העלאה ב-10% = הכפלה ב-1.1, עם WHERE DeptID=3." },
    { prompt:"מחק את כל ההזמנות שסכומן (TotalPrice) נמוך מ-400.", solution:"DELETE FROM Orders WHERE TotalPrice < 400;", check:"mutate", mutateTable:"Orders", hint:"DELETE FROM Orders WHERE TotalPrice < 400." },
    { prompt:"מחק מ-UserLogs את הרשומות שהסטטוס בהן 'Expired' או שהתאריך ריק.", solution:"DELETE FROM UserLogs WHERE Status = 'Expired' OR LogDate IS NULL;", check:"mutate", mutateTable:"UserLogs", hint:"DELETE ... WHERE Status='Expired' OR LogDate IS NULL." }
  ]
}
];
