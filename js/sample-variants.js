/* ============================================================
   קורס 3964 — שפת SQL (אפי פרופוס) — "שאלות דומות למבחן לדוגמה"
   ------------------------------------------------------------
   40 תרגילי SQL חיים על סכימת college (סכימת שאלה 3 במבחן לדוגמה 14.2.25):
   Branches · Departments · Students · Lecturers · Courses · Enrollments · Teaching
   לכל אחת מ-10 השאילתות במבחן (base 1..10) — 4 וריאציות במדרג קושי:
     k=1  אותו דפוס על טבלה/עמודה אחרת
     k=2  אותו דפוס + תנאי נוסף / מיון
     k=3  טוויסט שבודק את המלכודת של הדפוס (DISTINCT, ON מול WHERE, COUNT(*) מול COUNT(עמודה), >= מול >, קדימות AND/OR …)
     k=4  שילוב קשה יותר, ברמת מבחן
   חוזה (כמו ב-sql-exercises.js) + base = מספר השאילתה במבחן שהתרגיל משקף.
   prompt מציין תמיד את העמודות ואת סדרן (הבודק משווה ערכים לפי סדר עמודות; סדר שורות רק כשיש ORDER BY בפתרון).
   כל הנתונים מ-SQLC.schemas.college (js/sql-data.js) — לא לשנות את הנתונים בלי לבדוק מחדש:
   node verify-sample.js variants
   ============================================================ */
window.SQLC = window.SQLC || {};
SQLC.exercises = SQLC.exercises || [];

SQLC.exercises.push(

/* =====================================================================
   שאילתה 1 — "הצגת כל השמות והמיקומים של השלוחות במערכת"  (SELECT מטבלה אחת)
   ===================================================================== */
  { id:'sv1-1', set:'sample', base:1, topic:'select', schema:'college', check:'select',
    prompt:`הצגת השמות ומספר נקודות הזכות של כל הקורסים במערכת. עמודות בסדר: CourseName, Credits.`,
    solution:`SELECT CourseName, Credits
FROM Courses;`,
    alt:[`SELECT c.CourseName, c.Credits
FROM Courses c;`,
`SELECT CourseName AS [שם הקורס], Credits AS [נקודות זכות]
FROM Courses;`],
    hint:`טבלה אחת (Courses), בלי WHERE ובלי JOIN — רק לבחור את שתי העמודות הנכונות בסדר הנכון.`,
    explain:`5 שורות — אחת לכל קורס. זה בדיוק המבנה של שאילתה 1 במבחן (SELECT עמודות FROM טבלה), רק על טבלה אחרת. הבודק לא מסתכל על שמות העמודות אבל כן על מספרן ועל סדרן: SELECT * היה מחזיר 4 עמודות (כולל CourseID ו-DepartmentID) ונפסל, וגם Credits, CourseName בסדר הפוך נפסל. במבחן — כשמבקשים עמודות מסוימות, לא כותבים SELECT *. כינוי בעברית בסוגריים מרובעים (AS [שם הקורס]) תקין ב-SQL Server ולא משנה את התוצאה.`,
    source:'דומה לשאילתה 1 במבחן לדוגמה' },

  { id:'sv1-2', set:'sample', base:1, topic:'select', schema:'college', check:'select',
    prompt:`הצגת השם, הדרגה האקדמית והמשכורת של כל המרצים, ממוינים לפי המשכורת מהגבוהה לנמוכה. עמודות בסדר: FullName, AcademicRank, Salary.`,
    solution:`SELECT FullName, AcademicRank, Salary
FROM Lecturers
ORDER BY Salary DESC;`,
    alt:[`SELECT l.FullName, l.AcademicRank, l.Salary
FROM Lecturers l
ORDER BY l.Salary DESC;`,
`SELECT FullName, AcademicRank, Salary
FROM Lecturers
ORDER BY 3 DESC;`],
    hint:`ORDER BY בא תמיד בסוף השאילתה. ברירת המחדל היא ASC (מהנמוך לגבוה) — כדי להפוך כותבים DESC.`,
    explain:`5 שורות בסדר: רות אברהם 21000, אפי פרופוס 18000, יעל לוי 16000, מיכל שרון 14000, דן ישראלי 12000. כאן סדר השורות נבדק (יש ORDER BY בפתרון), ולכן שכחת DESC = טעות. ORDER BY 3 DESC (מספר העמודה ברשימת ה-SELECT) עובד גם ב-SQL Server, אבל ברור יותר לכתוב את שם העמודה. אין צורך ב-WHERE — מבקשים את כל המרצים.`,
    source:'דומה לשאילתה 1 במבחן לדוגמה' },

  { id:'sv1-3', set:'sample', base:1, topic:'select', schema:'college', check:'select',
    prompt:`הצגת רשימת הדרגות האקדמיות הקיימות בין המרצים — כל דרגה תופיע פעם אחת בלבד. עמודה אחת: AcademicRank.`,
    solution:`SELECT DISTINCT AcademicRank
FROM Lecturers;`,
    alt:[`SELECT AcademicRank
FROM Lecturers
GROUP BY AcademicRank;`],
    hint:`שני מרצים חולקים את אותה דרגה. איזו מילת מפתח אחרי SELECT מסירה שורות כפולות?`,
    explain:`4 שורות: פרופסור, דוקטור, מרצה, מרצה בכיר. בלי DISTINCT מתקבלות 5 שורות — 'פרופסור' מופיעה פעמיים (אפי פרופוס ורות אברהם) — והבודק פוסל. DISTINCT פועל על השורה כולה: SELECT DISTINCT FullName, AcademicRank לא יסיר כלום, כי כל שורה שונה בשם. חלופה שקולה: GROUP BY AcademicRank (קבוצה אחת לכל דרגה).`,
    source:'דומה לשאילתה 1 במבחן לדוגמה' },

  { id:'sv1-4', set:'sample', base:1, topic:'select', schema:'college', check:'select',
    prompt:`שליפת 3 המרצים בעלי המשכורת הגבוהה ביותר: שם המרצה, המשכורת החודשית והמשכורת השנתית (משכורת × 12), ממוינים מהמשכורת הגבוהה לנמוכה. עמודות בסדר: FullName, Salary, AnnualSalary.`,
    solution:`SELECT TOP 3 FullName, Salary, Salary * 12 AS AnnualSalary
FROM Lecturers
ORDER BY Salary DESC;`,
    alt:[`SELECT TOP (3) l.FullName, l.Salary, l.Salary * 12 AS AnnualSalary
FROM Lecturers l
ORDER BY AnnualSalary DESC;`],
    hint:`עמודה מחושבת: Salary * 12 AS AnnualSalary. ב-SQL Server מגבילים את מספר השורות עם TOP 3 מיד אחרי SELECT — ותמיד יחד עם ORDER BY.`,
    explain:`3 שורות: רות אברהם 21000 252000, אפי פרופוס 18000 216000, יעל לוי 16000 192000. TOP בלי ORDER BY מחזיר 3 שורות "כלשהן" — לא בהכרח הגבוהות. לעמודה מחושבת נותנים כינוי (AS) כדי שתהיה לה כותרת; בכינוי מותר להשתמש ב-ORDER BY (ORDER BY AnnualSalary DESC) אבל לא ב-WHERE. LIMIT 3 הוא תחביר של MySQL/SQLite — במבחן של SQL Server כותבים TOP (בדפדפן TOP מומר אוטומטית ל-LIMIT).`,
    source:'דומה לשאילתה 1 במבחן לדוגמה' },

/* =====================================================================
   שאילתה 2 — "הצגת כל המחלקות עם שמותיהן והשלוחה שבה הן נמצאות"  (JOIN של FK → PK)
   ===================================================================== */
  { id:'sv2-1', set:'sample', base:2, topic:'join', schema:'college', check:'select',
    prompt:`הצגת כל הקורסים עם שמותיהם ושם המחלקה שאליה כל קורס שייך. עמודות בסדר: CourseName, DepartmentName.`,
    solution:`SELECT c.CourseName, d.DepartmentName
FROM Courses c
JOIN Departments d ON c.DepartmentID = d.DepartmentID;`,
    alt:[`SELECT c.CourseName, d.DepartmentName
FROM Departments d
INNER JOIN Courses c ON d.DepartmentID = c.DepartmentID;`,
`SELECT c.CourseName, d.DepartmentName
FROM Courses c, Departments d
WHERE c.DepartmentID = d.DepartmentID;`],
    hint:`Courses.DepartmentID הוא מפתח זר (FK) ל-Departments. מחברים: JOIN Departments d ON c.DepartmentID = d.DepartmentID.`,
    explain:`5 שורות: שלושה קורסים של מערכות מידע, סטטיסטיקה ← בחינות, חשבונאות ניהולית ← מנהל עסקים. זה בדיוק המבנה של שאילתה 2 (מפתח זר ← שם מטבלת האב). מחלקת הדיקאנט לא מופיעה כי אין לה קורסים — וזה נכון, השאלה היא על קורסים. התנאי ב-ON הוא תמיד FK = PK; הסדר בתוך ה-ON (c.DepartmentID = d.DepartmentID או הפוך) לא משנה, וגם צורת הפסיקים הישנה (FROM Courses c, Departments d WHERE …) נותנת אותה תוצאה.`,
    source:'דומה לשאילתה 2 במבחן לדוגמה' },

  { id:'sv2-2', set:'sample', base:2, topic:'join', schema:'college', check:'select',
    prompt:`הצגת המחלקות שנמצאות בשלוחה שמיקומה 'תל אביב', יחד עם שם השלוחה, ממוינות לפי שם המחלקה. עמודות בסדר: DepartmentName, BranchName.`,
    solution:`SELECT d.DepartmentName, b.BranchName
FROM Departments d
JOIN Branches b ON d.BranchID = b.BranchID
WHERE b.Location = N'תל אביב'
ORDER BY d.DepartmentName;`,
    alt:[`SELECT d.DepartmentName, b.BranchName
FROM Departments d
JOIN Branches b ON d.BranchID = b.BranchID AND b.Location = N'תל אביב'
ORDER BY d.DepartmentName;`,
`SELECT d.DepartmentName, b.BranchName
FROM Departments d
JOIN Branches b ON d.BranchID = b.BranchID
WHERE b.Location = 'תל אביב'
ORDER BY d.DepartmentName;`],
    hint:`התנאי הוא על עמודה של Branches (Location), לכן קודם JOIN ואז WHERE b.Location = N'תל אביב'.`,
    explain:`2 שורות: דיקאנט ומנהל עסקים — שתיהן בשלוחת תל אביב. שימו לב להבדל בין BranchName ('שלוחת תל אביב') ל-Location ('תל אביב'): WHERE b.BranchName = 'תל אביב' מחזיר 0 שורות. (וגם הפוך: השלוחה 'קריית אונו' ממוקמת ב'אור יהודה'.) ב-INNER JOIN אפשר לכתוב את התנאי גם בתוך ה-ON — התוצאה זהה. לא מומלץ לכתוב WHERE d.BranchID = 2: זה עובד על הנתונים, אבל לא עונה על השאלה כפי שנוסחה. ב-SQL Server טקסט בעברית כותבים עם N לפני הגרש (N'תל אביב'): בלי N העברית עלולה להפוך ל-???? וההשוואה לא תמצא אף שורה. בדפדפן שתי הצורות עובדות.`,
    source:'דומה לשאילתה 2 במבחן לדוגמה' },

  { id:'sv2-3', set:'sample', base:2, topic:'join', schema:'college', check:'select',
    prompt:`הצגת כל המחלקות: מספר המחלקה, שם המחלקה, מספר השלוחה ושם השלוחה. עמודות בסדר: DepartmentID, DepartmentName, BranchID, BranchName.`,
    solution:`SELECT d.DepartmentID, d.DepartmentName, d.BranchID, b.BranchName
FROM Departments d
JOIN Branches b ON d.BranchID = b.BranchID;`,
    alt:[`SELECT d.DepartmentID, d.DepartmentName, b.BranchID, b.BranchName
FROM Departments d
INNER JOIN Branches b ON b.BranchID = d.BranchID;`,
`SELECT d.DepartmentID, d.DepartmentName, d.BranchID, b.BranchName
FROM Departments d, Branches b
WHERE d.BranchID = b.BranchID;`],
    hint:`BranchID קיימת בשתי הטבלאות — חובה לכתוב מאיזו (d.BranchID או b.BranchID). ואל תשכחו את תנאי החיבור.`,
    explain:`4 שורות. שתי מלכודות: (1) BranchID בלי קידומת → שגיאה Ambiguous column name 'BranchID', כי העמודה קיימת גם ב-Departments וגם ב-Branches. אחרי החיבור הערכים זהים, ולכן d.BranchID ו-b.BranchID נותנים אותה תוצאה. (2) FROM Departments, Branches בלי תנאי חיבור → מכפלה קרטזית: 4 × 2 = 8 שורות, כל מחלקה מופיעה עם שתי השלוחות. גם חיבור על עמודות לא נכונות (d.DepartmentID = b.BranchID) רץ בלי שגיאה ונותן תוצאה שגויה (2 שורות) — מחברים תמיד FK מול ה-PK שהוא מצביע עליו.`,
    source:'דומה לשאילתה 2 במבחן לדוגמה' },

  { id:'sv2-4', set:'sample', base:2, topic:'join', schema:'college', check:'select',
    prompt:`הצגת הקורסים של השלוחה ששמה 'קריית אונו': שם הקורס, שם המחלקה שאליה הקורס שייך ושם השלוחה, ממוינים לפי שם הקורס. עמודות בסדר: CourseName, DepartmentName, BranchName.`,
    solution:`SELECT c.CourseName, d.DepartmentName, b.BranchName
FROM Courses c
JOIN Departments d ON c.DepartmentID = d.DepartmentID
JOIN Branches b ON d.BranchID = b.BranchID
WHERE b.BranchName = N'קריית אונו'
ORDER BY c.CourseName;`,
    alt:[`SELECT c.CourseName, d.DepartmentName, b.BranchName
FROM Branches b
JOIN Departments d ON d.BranchID = b.BranchID AND b.BranchName = N'קריית אונו'
JOIN Courses c ON c.DepartmentID = d.DepartmentID
ORDER BY c.CourseName;`,
`SELECT c.CourseName, d.DepartmentName, b.BranchName
FROM Courses c
JOIN Departments d ON c.DepartmentID = d.DepartmentID
JOIN Branches b ON d.BranchID = b.BranchID
WHERE b.BranchName = 'קריית אונו'
ORDER BY 1;`],
    hint:`אין עמודה שמקשרת ישירות קורס לשלוחה: Courses → Departments (DepartmentID) → Branches (BranchID). שני JOIN ברצף, ואז WHERE על שם השלוחה.`,
    explain:`4 שורות: בסיסי נתונים, מבוא ל-SQL, ניתוח מערכות (מערכות מידע) וסטטיסטיקה (בחינות) — כולן בקריית אונו. חשבונאות ניהולית (מנהל עסקים) נמצאת בשלוחת תל אביב ולכן לא מופיעה. זו "שרשרת" מפתחות זרים: כל JOIN מוסיף טבלה אחת שמחוברת לקודמת. טעות נפוצה: לחבר את Courses ישירות ל-Branches לפי c.DepartmentID = b.BranchID — זה רץ בלי שגיאה אבל משווה מספר מחלקה למספר שלוחה, וזה חסר משמעות (כאן זה מחזיר רק 3 קורסים). ועוד מלכודת: 'קריית אונו' הוא שם השלוחה (BranchName), והמיקום שלה הוא 'אור יהודה' — WHERE b.Location = 'קריית אונו' מחזיר 0 שורות. כאן יש ORDER BY בפתרון, ולכן סדר השורות נבדק: בלי מיון הקורסים יוצאים לפי המספר שלהם ולא לפי השם.`,
    source:'דומה לשאילתה 2 במבחן לדוגמה' },

/* =====================================================================
   שאילתה 3 — "שמות הסטודנטים עם הקורסים שלהם, רק אם הציון גבוה מ-80"
   (ישות ← טבלת גישור ← ישות + WHERE)
   ===================================================================== */
  { id:'sv3-1', set:'sample', base:3, topic:'join', schema:'college', check:'select',
    prompt:`שליפת שמות המרצים עם הקורסים שהם מלמדים — רק קורסים של 4 נקודות זכות. עמודות בסדר: FullName, CourseName.`,
    solution:`SELECT l.FullName, c.CourseName
FROM Lecturers l
JOIN Teaching t ON l.LecturerID = t.LecturerID
JOIN Courses c ON t.CourseID = c.CourseID
WHERE c.Credits = 4;`,
    alt:[`SELECT l.FullName, c.CourseName
FROM Courses c
JOIN Teaching t ON t.CourseID = c.CourseID AND c.Credits = 4
JOIN Lecturers l ON l.LecturerID = t.LecturerID;`,
`SELECT l.FullName, c.CourseName
FROM Lecturers l, Teaching t, Courses c
WHERE l.LecturerID = t.LecturerID AND t.CourseID = c.CourseID AND c.Credits = 4;`],
    hint:`Teaching היא טבלת הגישור בין מרצים לקורסים — בדיוק כמו Enrollments בין סטודנטים לקורסים בשאילתה 3. שלוש טבלאות, שני JOIN, ואז WHERE על Credits.`,
    explain:`4 שורות: אפי פרופוס ויעל לוי ← מבוא ל-SQL, דן ישראלי ורות אברהם ← סטטיסטיקה (לשני הקורסים יש 2 מרצים). הדפוס זהה לשאילתה 3: ישות ← טבלת גישור ← ישות, ותנאי ב-WHERE. מלכודת: לחבר את Lecturers ל-Courses דרך DepartmentID (l.DepartmentID = c.DepartmentID) — זה מחזיר את הקורסים של המחלקה של המרצה, לא את הקורסים שהוא מלמד בפועל. כאן זה היה מחזיר 3 שורות בלי רות אברהם (היא משויכת לדיקאנט, אבל מלמדת סטטיסטיקה של מחלקת בחינות).`,
    source:'דומה לשאילתה 3 במבחן לדוגמה' },

  { id:'sv3-2', set:'sample', base:3, topic:'join', schema:'college', check:'select',
    prompt:`שליפת שמות הסטודנטים עם הקורסים שלהם והציון — רק אם הציון בין 85 ל-95 (כולל 85 ו-95), ממוינים לפי הציון מהגבוה לנמוך. עמודות בסדר: FullName, CourseName, FinalGrade.`,
    solution:`SELECT s.FullName, c.CourseName, e.FinalGrade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID
WHERE e.FinalGrade BETWEEN 85 AND 95
ORDER BY e.FinalGrade DESC;`,
    alt:[`SELECT s.FullName, c.CourseName, e.FinalGrade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID
WHERE e.FinalGrade >= 85 AND e.FinalGrade <= 95
ORDER BY 3 DESC;`],
    hint:`BETWEEN 85 AND 95 כולל את שני הקצוות. אחרי ה-WHERE מוסיפים ORDER BY e.FinalGrade DESC.`,
    explain:`7 שורות לפי הסדר: גיא שלום 95, נועה גל 93, דקל כהן 92, יהודה כץ 90, שני אבישי 89, עמית מזרחי 88, אושרי לוי 85. BETWEEN כולל את שני הגבולות, ושניהם קיימים בנתונים: מי שכותב FinalGrade > 85 מאבד את אושרי לוי (85 בדיוק), ומי שכותב FinalGrade < 95 מאבד את גיא שלום (95 בדיוק). כאן יש ORDER BY בפתרון, ולכן גם סדר השורות נבדק — בלי DESC התשובה נפסלת. שימו לב להבדל מהשאלה המקורית: "גבוה מ-80" = > 80 (בלי הגבול), ואילו "בין 85 ל-95 כולל" = BETWEEN 85 AND 95 (או >= 85 AND <= 95).`,
    source:'דומה לשאילתה 3 במבחן לדוגמה' },

  { id:'sv3-3', set:'sample', base:3, topic:'join', schema:'college', check:'select',
    prompt:`שליפת שמות הסטודנטים שקיבלו לפחות ציון אחד גבוה מ-80 — כל סטודנט יופיע פעם אחת בלבד, גם אם יש לו כמה ציונים כאלה. עמודה אחת: FullName.`,
    solution:`SELECT DISTINCT s.FullName
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
WHERE e.FinalGrade > 80;`,
    alt:[`SELECT FullName
FROM Students
WHERE StudentID IN (SELECT StudentID FROM Enrollments WHERE FinalGrade > 80);`,
`SELECT s.FullName
FROM Students s
WHERE EXISTS (SELECT 1 FROM Enrollments e WHERE e.StudentID = s.StudentID AND e.FinalGrade > 80);`,
`SELECT s.FullName
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
WHERE e.FinalGrade > 80
GROUP BY s.StudentID, s.FullName;`],
    hint:`JOIN + WHERE כמו בשאילתה 3 מחזיר שורה לכל ציון. כדי לקבל כל סטודנט פעם אחת: DISTINCT, או IN עם תת-שאילתה.`,
    explain:`8 שמות: דקל כהן, אושרי לוי, עמית מזרחי, גיא שלום, הראל דוד, יהודה כץ, שני אבישי, נועה גל. בלי DISTINCT מתקבלות 9 שורות — אושרי לוי פעמיים (85 ו-83). זו המלכודת של דפוס "ישות + טבלת גישור": ה-JOIN משכפל את הישות לפי מספר השורות התואמות בגישור. פתרון בלי כפילויות מלכתחילה: WHERE StudentID IN (SELECT StudentID FROM Enrollments WHERE FinalGrade > 80). שימו לב: DISTINCT על השם בלבד היה מאחד שני סטודנטים שונים עם אותו שם — כאן אין כאלה, אבל GROUP BY s.StudentID, s.FullName מדויק יותר.`,
    source:'דומה לשאילתה 3 במבחן לדוגמה' },

  { id:'sv3-4', set:'sample', base:3, topic:'group', schema:'college', check:'select',
    prompt:`שליפת שמות הסטודנטים שכל הציונים שלהם גבוהים מ-80 (מתוך הסטודנטים שרשומים לפחות לקורס אחד), יחד עם הציון הנמוך ביותר של כל אחד מהם. עמודות בסדר: FullName, MinGrade.`,
    solution:`SELECT s.FullName, MIN(e.FinalGrade) AS MinGrade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
GROUP BY s.StudentID, s.FullName
HAVING MIN(e.FinalGrade) > 80;`,
    alt:[`SELECT s.FullName, MIN(e.FinalGrade) AS MinGrade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
WHERE NOT EXISTS (SELECT 1 FROM Enrollments e2
                  WHERE e2.StudentID = s.StudentID AND e2.FinalGrade <= 80)
GROUP BY s.StudentID, s.FullName;`,
`SELECT s.FullName, MIN(e.FinalGrade) AS MinGrade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
WHERE s.StudentID NOT IN (SELECT StudentID FROM Enrollments WHERE FinalGrade <= 80)
GROUP BY s.StudentID, s.FullName;`,
`SELECT s.FullName, MIN(e.FinalGrade) AS MinGrade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
GROUP BY s.StudentID, s.FullName
HAVING SUM(CASE WHEN e.FinalGrade <= 80 THEN 1 ELSE 0 END) = 0;`],
    hint:`"כל הציונים גבוהים מ-80" שקול ל"הציון הנמוך ביותר גבוה מ-80": GROUP BY לפי סטודנט ו-HAVING MIN(e.FinalGrade) > 80.`,
    explain:`7 שורות: אושרי לוי 83, עמית מזרחי 88, גיא שלום 95, הראל דוד 81, יהודה כץ 90, שני אבישי 89, נועה גל 93. המלכודת: WHERE e.FinalGrade > 80 ואחריו GROUP BY בודק "לפחות ציון אחד" — ה-WHERE מסנן את הציונים הנמוכים לפני הקיבוץ, ולכן דקל כהן (92 ו-78) נכנס בטעות (8 שורות). HAVING פועל אחרי הקיבוץ ורואה את כל הציונים של הסטודנט. דרך שנייה: NOT EXISTS / NOT IN על "ציון של 80 ומטה". איתי רון לא רשום לאף קורס — עם NOT EXISTS בלי JOIN הוא היה נכנס ("אין לו אף ציון נמוך"), ולכן השאלה מגבילה לסטודנטים רשומים.`,
    source:'דומה לשאילתה 3 במבחן לדוגמה' },

/* =====================================================================
   שאילתה 4 — "שליפת כל המרצים שמרוויחים מעל 15,000 ש"ח"  (WHERE על טבלה אחת)
   ===================================================================== */
  { id:'sv4-1', set:'sample', base:4, topic:'where', schema:'college', check:'select',
    prompt:`שליפת כל הקורסים שמקנים יותר מ-3 נקודות זכות. עמודות בסדר: CourseName, Credits.`,
    solution:`SELECT CourseName, Credits
FROM Courses
WHERE Credits > 3;`,
    alt:[`SELECT CourseName, Credits
FROM Courses
WHERE Credits >= 4;`],
    hint:`טבלה אחת ו-WHERE עם השוואה מספרית — כמו Salary > 15000 בשאילתה 4.`,
    explain:`2 שורות: מבוא ל-SQL (4) וסטטיסטיקה (4). "יותר מ-3" = > 3; מי שכותב >= 3 מקבל את כל 5 הקורסים. כאן >= 4 שקול, כי נקודות הזכות הן מספרים שלמים. במספרים לא שמים גרשיים, ומספרים גדולים כותבים בלי פסיק: 15000 ולא 15,000 (הפסיק הוא שגיאת תחביר).`,
    source:'דומה לשאילתה 4 במבחן לדוגמה' },

  { id:'sv4-2', set:'sample', base:4, topic:'where', schema:'college', check:'select',
    prompt:`שליפת המרצים שמרוויחים בין 12,000 ל-18,000 ש"ח (כולל שני הגבולות), ממוינים לפי המשכורת מהנמוכה לגבוהה. עמודות בסדר: FullName, AcademicRank, Salary.`,
    solution:`SELECT FullName, AcademicRank, Salary
FROM Lecturers
WHERE Salary BETWEEN 12000 AND 18000
ORDER BY Salary;`,
    alt:[`SELECT FullName, AcademicRank, Salary
FROM Lecturers
WHERE Salary >= 12000 AND Salary <= 18000
ORDER BY Salary ASC;`],
    hint:`BETWEEN … AND … כולל את שני הגבולות. ORDER BY בלי DESC ממיין מהנמוך לגבוה.`,
    explain:`4 שורות לפי הסדר: דן ישראלי 12000, מיכל שרון 14000, יעל לוי 16000, אפי פרופוס 18000. BETWEEN כולל את שני הגבולות, ושניהם קיימים בנתונים: עם > 12000 AND < 18000 מאבדים את דן ישראלי ואת אפי פרופוס. ORDER BY Salary בלי מילה נוספת ממיין מהנמוך לגבוה (ASC). רות אברהם (21000) מחוץ לטווח.`,
    source:'דומה לשאילתה 4 במבחן לדוגמה' },

  { id:'sv4-3', set:'sample', base:4, topic:'where', schema:'college', check:'select',
    prompt:`שליפת המרצים בדרגת 'מרצה בכיר' או בדרגת 'פרופסור' שמרוויחים מעל 15,000 ש"ח (תנאי המשכורת חל על שתי הדרגות). עמודות בסדר: FullName, AcademicRank, Salary.`,
    solution:`SELECT FullName, AcademicRank, Salary
FROM Lecturers
WHERE (AcademicRank = N'מרצה בכיר' OR AcademicRank = N'פרופסור') AND Salary > 15000;`,
    alt:[`SELECT FullName, AcademicRank, Salary
FROM Lecturers
WHERE AcademicRank IN (N'מרצה בכיר', N'פרופסור') AND Salary > 15000;`,
`SELECT FullName, AcademicRank, Salary
FROM Lecturers
WHERE Salary > 15000 AND (AcademicRank = 'מרצה בכיר' OR AcademicRank = 'פרופסור');`],
    hint:`AND מתבצע לפני OR. שימו סוגריים סביב שתי הדרגות — או השתמשו ב-IN.`,
    explain:`2 שורות: אפי פרופוס (פרופסור, 18000) ורות אברהם (פרופסור, 21000). מיכל שרון היא 'מרצה בכיר', אבל מרוויחה 14,000 — מתחת לסף. המלכודת היא קדימות אופרטורים: AND מתבצע לפני OR. בלי סוגריים, AcademicRank = 'מרצה בכיר' OR AcademicRank = 'פרופסור' AND Salary > 15000 מתפרש כ"כל המרצים הבכירים, או פרופסורים שמרוויחים מעל 15,000" — ומיכל שרון נכנסת בטעות (3 שורות). גם מי שמוותר על תנאי הדרגה (רק Salary > 15000) מקבל 3 שורות: יעל לוי (דוקטור, 16000) נכנסת. הפתרון: סוגריים סביב ה-OR, או IN (N'מרצה בכיר', N'פרופסור') שחוסך את הבעיה. אם כותבים את ה-OR בלי סוגריים בסדר ההפוך ('פרופסור' קודם), על הנתונים האלה יוצאת במקרה התוצאה הנכונה (כל הפרופסורים מעל 15,000) — אבל השאילתה עדיין שגויה. ערכי טקסט כותבים בגרשיים בודדים ובדיוק כמו בנתונים, ובעברית ב-SQL Server עם N לפני הגרש.`,
    source:'דומה לשאילתה 4 במבחן לדוגמה' },

  { id:'sv4-4', set:'sample', base:4, topic:'nested', schema:'college', check:'select',
    prompt:`שליפת המרצים שמרוויחים יותר מהמשכורת הממוצעת של כלל המרצים: שם המרצה, המשכורת, והפער בין המשכורת שלו לממוצע (משכורת פחות ממוצע). עמודות בסדר: FullName, Salary, DiffFromAvg.`,
    solution:`SELECT FullName, Salary,
       Salary - (SELECT AVG(Salary) FROM Lecturers) AS DiffFromAvg
FROM Lecturers
WHERE Salary > (SELECT AVG(Salary) FROM Lecturers);`,
    alt:[`SELECT l.FullName, l.Salary, l.Salary - a.AvgSalary AS DiffFromAvg
FROM Lecturers l
CROSS JOIN (SELECT AVG(Salary) AS AvgSalary FROM Lecturers) a
WHERE l.Salary > a.AvgSalary;`],
    hint:`אי אפשר לכתוב AVG בתוך WHERE. חשבו את הממוצע בתת-שאילתה (SELECT AVG(Salary) FROM Lecturers) והשוו אליה.`,
    explain:`הממוצע הוא 16200, ולכן 2 שורות: אפי פרופוס 18000 (פער 1800) ורות אברהם 21000 (פער 4800). WHERE Salary > AVG(Salary) היא שגיאה — פונקציית צבירה אסורה ב-WHERE. לכן מחשבים את הממוצע בתת-שאילתה סקלרית שמחזירה ערך אחד, ומשתמשים בה גם ב-WHERE וגם בעמודה המחושבת. יעל לוי (16000) מתחת לממוצע. הערה: ב-SQL Server, AVG על עמודת INT מחזיר מספר שלם (חותך שברים) — כאן הממוצע עגול ולכן אין הבדל.`,
    source:'דומה לשאילתה 4 במבחן לדוגמה' },

/* =====================================================================
   שאילתה 5 — "הצגת מספר הסטודנטים בכל מחלקה"  (JOIN + GROUP BY + COUNT)
   ===================================================================== */
  { id:'sv5-1', set:'sample', base:5, topic:'group', schema:'college', check:'select',
    prompt:`הצגת מספר הקורסים בכל מחלקה (רק מחלקות שיש בהן קורסים). עמודות בסדר: DepartmentName, NumCourses.`,
    solution:`SELECT d.DepartmentName, COUNT(c.CourseID) AS NumCourses
FROM Departments d
JOIN Courses c ON c.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentID, d.DepartmentName;`,
    alt:[`SELECT d.DepartmentName, COUNT(*) AS NumCourses
FROM Courses c
JOIN Departments d ON c.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName;`],
    hint:`JOIN בין Departments ל-Courses, ואז GROUP BY לפי המחלקה ו-COUNT על הקורסים.`,
    explain:`3 שורות: מערכות מידע 3, בחינות 1, מנהל עסקים 1. דיקאנט לא מופיעה כי אין לה קורסים ו-INNER JOIN משמיט אותה (כמו מחלקת מנהל עסקים בשאילתה 5 המקורית, שאין בה סטודנטים). כדי לראות גם אותה עם 0 — זה הדפוס של שאילתה 7 (LEFT JOIN). חשוב ל-SQL Server: כל עמודה ב-SELECT שאינה בתוך COUNT/SUM/AVG חייבת להופיע ב-GROUP BY, לכן GROUP BY d.DepartmentID, d.DepartmentName (או רק d.DepartmentName). GROUP BY d.DepartmentID לבד עובד בדפדפן (SQLite), אבל ב-SQL Server נותן שגיאה.`,
    source:'דומה לשאילתה 5 במבחן לדוגמה' },

  { id:'sv5-2', set:'sample', base:5, topic:'group', schema:'college', check:'select',
    prompt:`הצגת מספר הסטודנטים שקיבלו ציון גבוה מ-80 בכל קורס, ממוין לפי מספר הסטודנטים מהגבוה לנמוך, ובמקרה של שוויון לפי שם הקורס (א-ת). קורס שאין בו אף ציון כזה לא יוצג. עמודות בסדר: CourseName, NumAbove80.`,
    solution:`SELECT c.CourseName, COUNT(e.StudentID) AS NumAbove80
FROM Courses c
JOIN Enrollments e ON e.CourseID = c.CourseID
WHERE e.FinalGrade > 80
GROUP BY c.CourseID, c.CourseName
ORDER BY NumAbove80 DESC, c.CourseName;`,
    alt:[`SELECT c.CourseName, COUNT(*) AS NumAbove80
FROM Enrollments e
JOIN Courses c ON e.CourseID = c.CourseID
WHERE e.FinalGrade > 80
GROUP BY c.CourseName
ORDER BY COUNT(*) DESC, c.CourseName ASC;`],
    hint:`קודם WHERE (מסנן שורות לפני הקיבוץ), אחר כך GROUP BY ו-COUNT, ובסוף ORDER BY עם שני מפתחות מיון.`,
    explain:`4 שורות: מבוא ל-SQL 3, סטטיסטיקה 3, ניתוח מערכות 2, בסיסי נתונים 1. סדר הביצוע הלוגי: FROM/JOIN ← WHERE (משאיר רק ציונים מעל 80) ← GROUP BY ← COUNT ← ORDER BY. ה-WHERE מסנן שורות לפני הקיבוץ, ולכן נספרים רק הציונים הגבוהים. מבוא ל-SQL וסטטיסטיקה בתיקו (3), ולכן צריך מיון משני לפי שם (מ' לפני ס'). חשבונאות ניהולית לא מופיעה — אין בה רישומים בכלל.`,
    source:'דומה לשאילתה 5 במבחן לדוגמה' },

  { id:'sv5-3', set:'sample', base:5, topic:'group', schema:'college', check:'select',
    prompt:`הצגת מספר הסטודנטים השונים שלומדים בקורסים של כל מחלקה — לפי המחלקה שאליה הקורס שייך (לא המחלקה של הסטודנט). סטודנט שלומד כמה קורסים של אותה מחלקה נספר פעם אחת. רק מחלקות שיש רישומים לקורסים שלהן. עמודות בסדר: DepartmentName, NumStudents.`,
    solution:`SELECT d.DepartmentName, COUNT(DISTINCT e.StudentID) AS NumStudents
FROM Departments d
JOIN Courses c ON c.DepartmentID = d.DepartmentID
JOIN Enrollments e ON e.CourseID = c.CourseID
GROUP BY d.DepartmentID, d.DepartmentName;`,
    alt:[`SELECT d.DepartmentName, COUNT(DISTINCT e.StudentID) AS NumStudents
FROM Enrollments e
JOIN Courses c ON e.CourseID = c.CourseID
JOIN Departments d ON c.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentName;`],
    hint:`המסלול: Departments ← Courses ← Enrollments. סטודנט עם שני קורסים באותה מחלקה מופיע בשתי שורות — COUNT(DISTINCT …) סופר אותו פעם אחת.`,
    explain:`2 שורות: מערכות מידע 8, בחינות 3. לקורסים של מערכות מידע יש 10 רישומים, אבל דקל כהן ואושרי לוי רשומים כל אחד לשני קורסים של המחלקה — COUNT(e.StudentID) או COUNT(*) נותנים 10, ורק COUNT(DISTINCT e.StudentID) נותן 8. שימו לב שזו מחלקת הקורס: גיא שלום ושני אבישי שייכים למערכות מידע אבל לומדים סטטיסטיקה של מחלקת בחינות, ולכן נספרים בבחינות. סיכום: COUNT(*) סופר שורות, COUNT(עמודה) סופר ערכים שאינם NULL, COUNT(DISTINCT עמודה) סופר ערכים שונים.`,
    source:'דומה לשאילתה 5 במבחן לדוגמה' },

  { id:'sv5-4', set:'sample', base:5, topic:'group', schema:'college', check:'select',
    prompt:`הצגת כל השלוחות: שם השלוחה, מספר הסטודנטים בשלוחה (סטודנט שייך לשלוחה דרך המחלקה שלו), ומספר הרישומים לקורסים של הסטודנטים האלה. שלוחה שלסטודנטים שלה אין רישומים תוצג עם 0 רישומים. עמודות בסדר: BranchName, NumStudents, NumEnrollments.`,
    solution:`SELECT b.BranchName,
       COUNT(DISTINCT s.StudentID) AS NumStudents,
       COUNT(e.EnrollmentID) AS NumEnrollments
FROM Branches b
JOIN Departments d ON d.BranchID = b.BranchID
JOIN Students s ON s.DepartmentID = d.DepartmentID
LEFT JOIN Enrollments e ON e.StudentID = s.StudentID
GROUP BY b.BranchID, b.BranchName;`,
    alt:[`SELECT b.BranchName,
       (SELECT COUNT(*) FROM Students s
          JOIN Departments d ON s.DepartmentID = d.DepartmentID
        WHERE d.BranchID = b.BranchID) AS NumStudents,
       (SELECT COUNT(*) FROM Enrollments e
          JOIN Students s ON e.StudentID = s.StudentID
          JOIN Departments d ON s.DepartmentID = d.DepartmentID
        WHERE d.BranchID = b.BranchID) AS NumEnrollments
FROM Branches b;`],
    hint:`שרשרת Branches ← Departments ← Students, ואז LEFT JOIN ל-Enrollments. החיבור לרישומים משכפל סטודנטים — חשבו איזה COUNT מתאים לכל עמודה.`,
    explain:`2 שורות: קריית אונו — 11 סטודנטים ו-13 רישומים; שלוחת תל אביב — סטודנט אחד (איתי רון) ו-0 רישומים. שלוש מלכודות בשאילתה אחת: (1) שרשרת Branches ← Departments ← Students. (2) החיבור ל-Enrollments משכפל סטודנטים: דקל כהן ואושרי לוי מופיעים פעמיים, ולכן COUNT(s.StudentID) היה נותן 13 במקום 11 — צריך COUNT(DISTINCT s.StudentID). (3) איתי רון לא רשום לאף קורס: עם JOIN רגיל ל-Enrollments שלוחת תל אביב נעלמת לגמרי, ולכן LEFT JOIN, ו-COUNT(e.EnrollmentID) (לא COUNT(*), שהיה נותן 1) כדי לקבל 0.`,
    source:'דומה לשאילתה 5 במבחן לדוגמה' },

/* =====================================================================
   שאילתה 6 — "כל הקורסים עם המרצים שמלמדים אותם, כולל קורסים ללא מרצים"
   (LEFT JOIN דרך טבלת גישור)
   ===================================================================== */
  { id:'sv6-1', set:'sample', base:6, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת כל הסטודנטים עם שמות הקורסים שהם רשומים אליהם. ודאו שגם סטודנטים שאינם רשומים לאף קורס יוצגו (עם NULL בשם הקורס). עמודות בסדר: FullName, CourseName.`,
    solution:`SELECT s.FullName, c.CourseName
FROM Students s
LEFT JOIN Enrollments e ON s.StudentID = e.StudentID
LEFT JOIN Courses c ON e.CourseID = c.CourseID;`,
    alt:[`SELECT s.FullName, c.CourseName
FROM Students s
LEFT OUTER JOIN Enrollments e ON e.StudentID = s.StudentID
LEFT OUTER JOIN Courses c ON c.CourseID = e.CourseID;`],
    hint:`הטבלה שכל השורות שלה חייבות להופיע (Students) — ראשונה, משמאל. ושני ה-JOIN בשרשרת צריכים להיות LEFT.`,
    explain:`14 שורות: 13 רישומים + איתי רון עם NULL (הוא היחיד שלא רשום לאף קורס). אותו דפוס כמו שאילתה 6, רק מהצד של הסטודנטים: הטבלה ש"חייבת להופיע במלואה" משמאל, ושני ה-JOIN שאחריה חייבים להיות LEFT. אם ה-JOIN השני (ל-Courses) הוא INNER — השורה של איתי רון (שבה CourseID הוא NULL) נמחקת ומתקבלות 13 שורות. זו הטעות הנפוצה ביותר בשרשרת LEFT JOIN. LEFT JOIN ו-LEFT OUTER JOIN זהים.`,
    source:'דומה לשאילתה 6 במבחן לדוגמה' },

  { id:'sv6-2', set:'sample', base:6, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת כל המרצים עם הקורסים שהם מלמדים, כולל מרצים שאינם מלמדים אף קורס — אצלם יוצג הטקסט 'אין קורס' במקום NULL. מיון לפי שם המרצה, ואחר כך לפי שם הקורס. עמודות בסדר: FullName, CourseName.`,
    solution:`SELECT l.FullName, ISNULL(c.CourseName, N'אין קורס') AS CourseName
FROM Lecturers l
LEFT JOIN Teaching t ON l.LecturerID = t.LecturerID
LEFT JOIN Courses c ON t.CourseID = c.CourseID
ORDER BY l.FullName, c.CourseName;`,
    alt:[`SELECT l.FullName, COALESCE(c.CourseName, N'אין קורס') AS CourseName
FROM Lecturers l
LEFT JOIN Teaching t ON t.LecturerID = l.LecturerID
LEFT JOIN Courses c ON c.CourseID = t.CourseID
ORDER BY 1, 2;`,
`SELECT l.FullName, CASE WHEN c.CourseName IS NULL THEN 'אין קורס' ELSE c.CourseName END
FROM Lecturers l
LEFT JOIN Teaching t ON l.LecturerID = t.LecturerID
LEFT JOIN Courses c ON t.CourseID = c.CourseID
ORDER BY l.FullName, c.CourseName;`],
    hint:`LEFT JOIN מ-Lecturers דרך Teaching אל Courses, ו-ISNULL(c.CourseName, N'אין קורס') כדי להחליף את ה-NULL.`,
    explain:`7 שורות: אפי פרופוס – בסיסי נתונים, מבוא ל-SQL; דן ישראלי – סטטיסטיקה; יעל לוי – מבוא ל-SQL, ניתוח מערכות; מיכל שרון – אין קורס; רות אברהם – סטטיסטיקה. מיכל שרון לא מלמדת אף קורס, ולכן היא מופיעה רק בזכות LEFT JOIN. ISNULL(ערך, חלופה) מחליף NULL בטקסט (שקול ל-COALESCE או ל-CASE WHEN … IS NULL). הטקסט צריך להיות בדיוק 'אין קורס', וב-SQL Server כותבים אותו N'אין קורס' כי הוא בעברית. מיון לפי שתי עמודות: קודם שם המרצה, ובתוך אותו מרצה לפי שם הקורס. בלי המיון המשני הסדר בין שני הקורסים של אותו מרצה לא מוגדר — וכאן הבודק אכן פוסל אותו (אצל אפי פרופוס מבוא ל-SQL יוצא לפני בסיסי נתונים).`,
    source:'דומה לשאילתה 6 במבחן לדוגמה' },

  { id:'sv6-3', set:'sample', base:6, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת כל הקורסים, ולצד כל קורס את שמות הסטודנטים שקיבלו בו ציון גבוה מ-90 ואת הציון. ודאו שגם קורסים שאין בהם אף ציון כזה יוצגו (עם NULL בשם הסטודנט ובציון). עמודות בסדר: CourseName, FullName, FinalGrade.`,
    solution:`SELECT c.CourseName, s.FullName, e.FinalGrade
FROM Courses c
LEFT JOIN Enrollments e ON c.CourseID = e.CourseID AND e.FinalGrade > 90
LEFT JOIN Students s ON e.StudentID = s.StudentID;`,
    alt:[`SELECT c.CourseName, x.FullName, x.FinalGrade
FROM Courses c
LEFT JOIN (SELECT e.CourseID, s.FullName, e.FinalGrade
           FROM Enrollments e
           JOIN Students s ON s.StudentID = e.StudentID
           WHERE e.FinalGrade > 90) x ON x.CourseID = c.CourseID;`],
    hint:`תנאי על הטבלה הימנית של LEFT JOIN נכתב בתוך ה-ON (… AND e.FinalGrade > 90), לא ב-WHERE.`,
    explain:`6 שורות: מבוא ל-SQL – דקל כהן 92; בסיסי נתונים – NULL; ניתוח מערכות – NULL; סטטיסטיקה – גיא שלום 95 ונועה גל 93; חשבונאות ניהולית – NULL. זו המלכודת הגדולה של LEFT JOIN: תנאי על הטבלה הימנית חייב להיות בתוך ה-ON. אם כותבים WHERE e.FinalGrade > 90, שורות ה-NULL נפסלות (NULL > 90 אינו TRUE) וה-LEFT JOIN הופך בפועל ל-INNER — 3 שורות בלבד. גם "התיקון" WHERE e.FinalGrade > 90 OR e.FinalGrade IS NULL לא עובד: הוא מחזיר את חשבונאות ניהולית (אין בה רישומים בכלל), אבל מפספס את בסיסי נתונים ואת ניתוח מערכות — שיש בהם רישומים, אבל אף ציון מעל 90.`,
    source:'דומה לשאילתה 6 במבחן לדוגמה' },

  { id:'sv6-4', set:'sample', base:6, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת כל הקורסים: שם הקורס, שם המחלקה שאליה הקורס שייך ושם המרצה שמלמד אותו. קורס ללא מרצה יוצג עם הטקסט 'טרם שובץ' במקום שם המרצה. מיון לפי שם המחלקה, אחר כך לפי שם הקורס ואחר כך לפי שם המרצה. עמודות בסדר: CourseName, DepartmentName, LecturerName.`,
    solution:`SELECT c.CourseName, d.DepartmentName, ISNULL(l.FullName, N'טרם שובץ') AS LecturerName
FROM Courses c
JOIN Departments d ON c.DepartmentID = d.DepartmentID
LEFT JOIN Teaching t ON c.CourseID = t.CourseID
LEFT JOIN Lecturers l ON t.LecturerID = l.LecturerID
ORDER BY d.DepartmentName, c.CourseName, LecturerName;`,
    alt:[`SELECT c.CourseName, d.DepartmentName, COALESCE(l.FullName, N'טרם שובץ') AS LecturerName
FROM Courses c
LEFT JOIN Teaching t ON t.CourseID = c.CourseID
LEFT JOIN Lecturers l ON l.LecturerID = t.LecturerID
JOIN Departments d ON d.DepartmentID = c.DepartmentID
ORDER BY d.DepartmentName, c.CourseName, l.FullName;`,
`SELECT c.CourseName, d.DepartmentName, ISNULL(l.FullName, 'טרם שובץ')
FROM Courses c
JOIN Departments d ON c.DepartmentID = d.DepartmentID
LEFT JOIN Teaching t ON c.CourseID = t.CourseID
LEFT JOIN Lecturers l ON t.LecturerID = l.LecturerID
ORDER BY 2, 1, 3;`],
    hint:`ל-Departments מספיק JOIN רגיל (לכל קורס יש מחלקה). כל השרשרת אל המרצה (Teaching ואז Lecturers) חייבת להיות LEFT.`,
    explain:`7 שורות לפי הסדר: בחינות – סטטיסטיקה – דן ישראלי, רות אברהם; מנהל עסקים – חשבונאות ניהולית – טרם שובץ; מערכות מידע – בסיסי נתונים – אפי פרופוס; מבוא ל-SQL – אפי פרופוס, יעל לוי; ניתוח מערכות – יעל לוי. החיבור ל-Departments יכול להיות INNER כי לכל קורס יש מחלקה, ואין חשש שתיעלם שורה. אבל LEFT JOIN Teaching ואחריו JOIN Lecturers רגיל מבטל את ה-LEFT ומעלים את חשבונאות ניהולית (6 שורות). הטקסט החלופי הוא בדיוק 'טרם שובץ' (ב-SQL Server: N'טרם שובץ'). ב-ORDER BY מותר להשתמש בכינוי (LecturerName), בעמודה המקורית או במספר העמודה (ORDER BY 2, 1, 3).`,
    source:'דומה לשאילתה 6 במבחן לדוגמה' },

/* =====================================================================
   שאילתה 7 — "כל המחלקות עם מספר הסטודנטים, כולל מחלקות שאין בהן סטודנטים"
   (LEFT JOIN + GROUP BY + COUNT(עמודה))
   ===================================================================== */
  { id:'sv7-1', set:'sample', base:7, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת כל הקורסים עם מספר הסטודנטים הרשומים לכל קורס, כולל קורסים שאין בהם רישומים (יוצג 0). עמודות בסדר: CourseName, NumStudents.`,
    solution:`SELECT c.CourseName, COUNT(e.StudentID) AS NumStudents
FROM Courses c
LEFT JOIN Enrollments e ON e.CourseID = c.CourseID
GROUP BY c.CourseID, c.CourseName;`,
    alt:[`SELECT c.CourseName, COUNT(e.EnrollmentID) AS NumStudents
FROM Courses c
LEFT JOIN Enrollments e ON c.CourseID = e.CourseID
GROUP BY c.CourseName;`,
`SELECT c.CourseName,
       (SELECT COUNT(*) FROM Enrollments e WHERE e.CourseID = c.CourseID) AS NumStudents
FROM Courses c;`],
    hint:`LEFT JOIN כדי לשמור קורס בלי רישומים, ו-COUNT על עמודה מהטבלה הימנית (לא COUNT(*)).`,
    explain:`5 שורות: מבוא ל-SQL 4, בסיסי נתונים 3, ניתוח מערכות 3, סטטיסטיקה 3, חשבונאות ניהולית 0. בדיוק הדפוס של שאילתה 7: LEFT JOIN כדי לשמור קורס בלי רישומים, ו-COUNT על עמודה מהטבלה הימנית. COUNT(*) היה נותן 1 לחשבונאות ניהולית — ה-LEFT JOIN מייצר עבורה שורה אחת (עם NULL), ו-COUNT(*) סופר שורות. COUNT(e.StudentID) מתעלם מ-NULL ולכן נותן 0. חלופה: תת-שאילתה מתואמת בתוך ה-SELECT.`,
    source:'דומה לשאילתה 7 במבחן לדוגמה' },

  { id:'sv7-2', set:'sample', base:7, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת כל המרצים עם מספר הקורסים שכל אחד מהם מלמד, כולל מרצים שאינם מלמדים אף קורס (יוצג 0). מיון לפי מספר הקורסים מהגבוה לנמוך, ובמקרה של שוויון לפי שם המרצה (א-ת). עמודות בסדר: FullName, NumCourses.`,
    solution:`SELECT l.FullName, COUNT(t.CourseID) AS NumCourses
FROM Lecturers l
LEFT JOIN Teaching t ON t.LecturerID = l.LecturerID
GROUP BY l.LecturerID, l.FullName
ORDER BY NumCourses DESC, l.FullName;`,
    alt:[`SELECT l.FullName, COUNT(t.TeachingID) AS NumCourses
FROM Lecturers l
LEFT JOIN Teaching t ON l.LecturerID = t.LecturerID
GROUP BY l.LecturerID, l.FullName
ORDER BY COUNT(t.TeachingID) DESC, l.FullName ASC;`],
    hint:`LEFT JOIN מ-Lecturers ל-Teaching, GROUP BY לפי מרצה, COUNT(t.CourseID), ו-ORDER BY עם שני מפתחות.`,
    explain:`5 שורות: אפי פרופוס 2, יעל לוי 2, דן ישראלי 1, רות אברהם 1, מיכל שרון 0. LEFT JOIN שומר את מיכל שרון, ו-COUNT(t.CourseID) נותן לה 0. יש תיקו (2 ו-1), ולכן מיון משני לפי שם. ב-ORDER BY מותר להשתמש בכינוי NumCourses (או לכתוב שוב COUNT(t.CourseID)); ב-WHERE וב-HAVING אסור להשתמש בכינוי.`,
    source:'דומה לשאילתה 7 במבחן לדוגמה' },

  { id:'sv7-3', set:'sample', base:7, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת כל הקורסים עם מספר הסטודנטים שקיבלו בהם ציון גבוה מ-85, כולל קורסים שאין בהם אף ציון כזה (יוצג 0). עמודות בסדר: CourseName, NumAbove85.`,
    solution:`SELECT c.CourseName, COUNT(e.EnrollmentID) AS NumAbove85
FROM Courses c
LEFT JOIN Enrollments e ON e.CourseID = c.CourseID AND e.FinalGrade > 85
GROUP BY c.CourseID, c.CourseName;`,
    alt:[`SELECT c.CourseName, SUM(CASE WHEN e.FinalGrade > 85 THEN 1 ELSE 0 END) AS NumAbove85
FROM Courses c
LEFT JOIN Enrollments e ON e.CourseID = c.CourseID
GROUP BY c.CourseID, c.CourseName;`,
`SELECT c.CourseName,
       (SELECT COUNT(*) FROM Enrollments e WHERE e.CourseID = c.CourseID AND e.FinalGrade > 85) AS NumAbove85
FROM Courses c;`],
    hint:`שתי מלכודות: התנאי על הציון נכתב בתוך ה-ON (לא ב-WHERE), והספירה היא COUNT על עמודה מהטבלה הימנית (לא COUNT(*)).`,
    explain:`5 שורות: מבוא ל-SQL 2 (92, 90), בסיסי נתונים 0, ניתוח מערכות 1 (88), סטטיסטיקה 3, חשבונאות ניהולית 0. שתי מלכודות מצטלבות: (1) התנאי FinalGrade > 85 חייב להיות ב-ON — ב-WHERE הוא מוחק את הקורסים שקיבלו 0, ונשארות 3 שורות. (2) COUNT(*) במקום COUNT(e.EnrollmentID) נותן 1 לבסיסי נתונים ולחשבונאות ניהולית (שורת ה-NULL נספרת). חלופה בלי תנאי ב-ON: SUM(CASE WHEN e.FinalGrade > 85 THEN 1 ELSE 0 END).`,
    source:'דומה לשאילתה 7 במבחן לדוגמה' },

  { id:'sv7-4', set:'sample', base:7, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת כל המחלקות עם מספר הסטודנטים ומספר המרצים בכל מחלקה, כולל מחלקות שאין בהן סטודנטים או מרצים (יוצג 0). עמודות בסדר: DepartmentName, NumStudents, NumLecturers.`,
    solution:`SELECT d.DepartmentName,
       COUNT(DISTINCT s.StudentID) AS NumStudents,
       COUNT(DISTINCT l.LecturerID) AS NumLecturers
FROM Departments d
LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID
LEFT JOIN Lecturers l ON l.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentID, d.DepartmentName;`,
    alt:[`SELECT d.DepartmentName,
       (SELECT COUNT(*) FROM Students s WHERE s.DepartmentID = d.DepartmentID) AS NumStudents,
       (SELECT COUNT(*) FROM Lecturers l WHERE l.DepartmentID = d.DepartmentID) AS NumLecturers
FROM Departments d;`],
    hint:`שני LEFT JOIN מאותה מחלקה לשתי טבלאות "בנות" משכפלים שורות (כל סטודנט × כל מרצה). COUNT(DISTINCT …) — או שתי תת-שאילתות מתואמות.`,
    explain:`4 שורות: מערכות מידע 10/2, בחינות 1/1, דיקאנט 1/1, מנהל עסקים 0/1. שני LEFT JOIN מאותה טבלה לשתי טבלאות "בנות" יוצרים מכפלה: במערכות מידע כל אחד מ-10 הסטודנטים משוכפל עם 2 המרצים = 20 שורות, ולכן COUNT(s.StudentID) ו-COUNT(l.LecturerID) נותנים 20 ו-20. COUNT(DISTINCT …) מתקן את זה. חלופה בטוחה יותר: שתי תת-שאילתות מתואמות ב-SELECT, אחת לכל ספירה. מנהל עסקים מקבלת 0 סטודנטים כי COUNT מתעלם מ-NULL.`,
    source:'דומה לשאילתה 7 במבחן לדוגמה' },

/* =====================================================================
   שאילתה 8 — "מצא את כל הקורסים שמועברים על ידי יותר ממרצה אחד"  (GROUP BY + HAVING)
   ===================================================================== */
  { id:'sv8-1', set:'sample', base:8, topic:'group', schema:'college', check:'select',
    prompt:`מצא את כל הסטודנטים שרשומים ליותר מקורס אחד, ואת מספר הקורסים של כל אחד מהם. עמודות בסדר: FullName, NumCourses.`,
    solution:`SELECT s.FullName, COUNT(e.CourseID) AS NumCourses
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
GROUP BY s.StudentID, s.FullName
HAVING COUNT(e.CourseID) > 1;`,
    alt:[`SELECT s.FullName, COUNT(*) AS NumCourses
FROM Enrollments e
JOIN Students s ON e.StudentID = s.StudentID
GROUP BY s.StudentID, s.FullName
HAVING COUNT(*) >= 2;`],
    hint:`אותו מבנה כמו שאילתה 8: JOIN, GROUP BY לפי הישות, ו-HAVING COUNT(...) > 1.`,
    explain:`2 שורות: דקל כהן 2, אושרי לוי 2. אותו דפוס כמו שאילתה 8 — GROUP BY לפי הישות ו-HAVING על הספירה — רק על Enrollments במקום Teaching. HAVING (ולא WHERE) כי התנאי הוא על תוצאת COUNT, שמחושבת רק אחרי הקיבוץ. מקבצים לפי s.StudentID (ולא רק לפי השם) כדי ששני סטודנטים בעלי אותו שם לא יאוחדו לקבוצה אחת.`,
    source:'דומה לשאילתה 8 במבחן לדוגמה' },

  { id:'sv8-2', set:'sample', base:8, topic:'group', schema:'college', check:'select',
    prompt:`מצא את כל הקורסים שמועברים על ידי יותר ממרצה אחד, והצג לכל קורס את מספר המרצים ואת המשכורת הממוצעת של המרצים שמלמדים אותו, ממוין לפי המשכורת הממוצעת מהגבוהה לנמוכה. עמודות בסדר: CourseName, NumLecturers, AvgSalary.`,
    solution:`SELECT c.CourseName, COUNT(t.LecturerID) AS NumLecturers, AVG(l.Salary) AS AvgSalary
FROM Courses c
JOIN Teaching t ON c.CourseID = t.CourseID
JOIN Lecturers l ON t.LecturerID = l.LecturerID
GROUP BY c.CourseID, c.CourseName
HAVING COUNT(t.LecturerID) > 1
ORDER BY AvgSalary DESC;`,
    alt:[`SELECT c.CourseName, COUNT(*) AS NumLecturers, AVG(l.Salary) AS AvgSalary
FROM Teaching t
JOIN Courses c ON t.CourseID = c.CourseID
JOIN Lecturers l ON t.LecturerID = l.LecturerID
GROUP BY c.CourseName
HAVING COUNT(*) > 1
ORDER BY AVG(l.Salary) DESC;`],
    hint:`כמו שאילתה 8, ועוד JOIN ל-Lecturers כדי להגיע למשכורת. AVG ו-COUNT באותה שאילתה, HAVING על הספירה, ORDER BY על הממוצע.`,
    explain:`2 שורות: מבוא ל-SQL — 2 מרצים, ממוצע 17000 (18000 ו-16000); סטטיסטיקה — 2 מרצים, ממוצע 16500 (12000 ו-21000). כדי לחשב משכורת צריך להוסיף את Lecturers לשרשרת (Courses ← Teaching ← Lecturers). בשאילתה אחת אפשר כמה פונקציות צבירה; HAVING מסנן קבוצות, ו-ORDER BY ממיין בסוף. ב-HAVING כותבים שוב את הביטוי COUNT(t.LecturerID) — ב-SQL Server אי אפשר להשתמש שם בכינוי NumLecturers.`,
    source:'דומה לשאילתה 8 במבחן לדוגמה' },

  { id:'sv8-3', set:'sample', base:8, topic:'group', schema:'college', check:'select',
    prompt:`מצא את המרצים שמלמדים 2 קורסים או יותר, והצג את מספר הקורסים של כל אחד מהם. עמודות בסדר: FullName, NumCourses.`,
    solution:`SELECT l.FullName, COUNT(t.CourseID) AS NumCourses
FROM Lecturers l
JOIN Teaching t ON l.LecturerID = t.LecturerID
GROUP BY l.LecturerID, l.FullName
HAVING COUNT(t.CourseID) >= 2;`,
    alt:[`SELECT l.FullName, COUNT(*) AS NumCourses
FROM Teaching t
JOIN Lecturers l ON t.LecturerID = l.LecturerID
GROUP BY l.LecturerID, l.FullName
HAVING COUNT(*) > 1;`],
    hint:`"2 או יותר" = "לפחות 2" = >= 2. התנאי על COUNT נכתב ב-HAVING.`,
    explain:`2 שורות: אפי פרופוס 2 ויעל לוי 2. המלכודת: "2 או יותר" (= "לפחות 2") הוא >= 2. מי שכותב > 2 מקבל 0 שורות. במספרים שלמים > 1 שקול ל->= 2, ולכן גם הניסוח של שאילתה 8 עובד כאן. שימו לב לניסוחים: "יותר ממרצה אחד" = > 1, "לפחות 2" = >= 2, "יותר מ-2" = > 2. ועוד טעות קלאסית: WHERE COUNT(...) >= 2 — שגיאה, כי WHERE פועל לפני הקיבוץ.`,
    source:'דומה לשאילתה 8 במבחן לדוגמה' },

  { id:'sv8-4', set:'sample', base:8, topic:'nested', schema:'college', check:'select',
    prompt:`לכל קורס שמועבר על ידי יותר ממרצה אחד — הצג את שם הקורס ואת שמות המרצים שמלמדים אותו (שורה לכל מרצה), ממוין לפי שם הקורס ואחר כך לפי שם המרצה. עמודות בסדר: CourseName, FullName.`,
    solution:`SELECT c.CourseName, l.FullName
FROM Courses c
JOIN Teaching t ON c.CourseID = t.CourseID
JOIN Lecturers l ON t.LecturerID = l.LecturerID
WHERE c.CourseID IN (SELECT CourseID
                     FROM Teaching
                     GROUP BY CourseID
                     HAVING COUNT(*) > 1)
ORDER BY c.CourseName, l.FullName;`,
    alt:[`SELECT c.CourseName, l.FullName
FROM Courses c
JOIN (SELECT CourseID FROM Teaching GROUP BY CourseID HAVING COUNT(*) > 1) m ON m.CourseID = c.CourseID
JOIN Teaching t ON t.CourseID = c.CourseID
JOIN Lecturers l ON l.LecturerID = t.LecturerID
ORDER BY c.CourseName, l.FullName;`,
`SELECT c.CourseName, l.FullName
FROM Courses c
JOIN Teaching t ON c.CourseID = t.CourseID
JOIN Lecturers l ON t.LecturerID = l.LecturerID
WHERE EXISTS (SELECT 1 FROM Teaching t2
              WHERE t2.CourseID = t.CourseID AND t2.LecturerID <> t.LecturerID)
ORDER BY c.CourseName, l.FullName;`],
    hint:`שני שלבים: תת-שאילתה מוצאת את מספרי הקורסים עם יותר ממרצה אחד (GROUP BY + HAVING על Teaching), והשאילתה החיצונית מחזירה את המרצים שלהם עם IN.`,
    explain:`4 שורות: מבוא ל-SQL – אפי פרופוס, יעל לוי; סטטיסטיקה – דן ישראלי, רות אברהם. אי אפשר לעשות את זה ב-GROUP BY אחד: ברגע שמקבצים לפי קורס אין יותר שורה לכל מרצה, ואם מקבצים לפי קורס ומרצה — כל קבוצה מכילה שורה אחת ו-COUNT תמיד 1. הפתרון בשני שלבים: תת-שאילתה מוצאת את הקורסים (שאילתה 8 עצמה, רק עם CourseID), והשאילתה החיצונית מחזירה את פרטי המרצים שלהם עם IN. תת-שאילתה אחרי IN מחזירה עמודה אחת בלבד.`,
    source:'דומה לשאילתה 8 במבחן לדוגמה' },

/* =====================================================================
   שאילתה 9 — "שמות הסטודנטים יחד עם שמות המחלקות שלהם"  (JOIN: מספר ← שם)
   ===================================================================== */
  { id:'sv9-1', set:'sample', base:9, topic:'join', schema:'college', check:'select',
    prompt:`הצגת גיליון הציונים: לכל רישום לקורס — מספר הרישום, שם הסטודנט והציון הסופי. עמודות בסדר: EnrollmentID, FullName, FinalGrade.`,
    solution:`SELECT e.EnrollmentID, s.FullName, e.FinalGrade
FROM Enrollments e
JOIN Students s ON e.StudentID = s.StudentID;`,
    alt:[`SELECT e.EnrollmentID, s.FullName, e.FinalGrade
FROM Students s
INNER JOIN Enrollments e ON s.StudentID = e.StudentID;`],
    hint:`ב-Enrollments יש רק StudentID. כדי להציג שם מחברים ל-Students, שבה StudentID הוא המפתח הראשי.`,
    explain:`13 שורות — אחת לכל רישום. דקל כהן ואושרי לוי מופיעים פעמיים (שני קורסים כל אחד), ואיתי רון לא מופיע (אין לו רישומים) — זה INNER JOIN. אותו דפוס כמו שאילתה 9: בטבלה יש מספר (StudentID) ורוצים להציג במקומו שם, ולכן מחברים לטבלה שבה המספר הוא מפתח ראשי. ב-INNER JOIN סדר הטבלאות (Enrollments עם Students או להפך) לא משנה את התוצאה.`,
    source:'דומה לשאילתה 9 במבחן לדוגמה' },

  { id:'sv9-2', set:'sample', base:9, topic:'join', schema:'college', check:'select',
    prompt:`הצגת שמות הסטודנטים יחד עם הכתובת ושם המחלקה שלהם — רק סטודנטים שגרים באחת מהערים: תל אביב, רמת גן, גבעתיים, חיפה. מיון לפי שם הסטודנט. עמודות בסדר: FullName, Address, DepartmentName.`,
    solution:`SELECT s.FullName, s.Address, d.DepartmentName
FROM Students s
JOIN Departments d ON s.DepartmentID = d.DepartmentID
WHERE s.Address IN (N'תל אביב', N'רמת גן', N'גבעתיים', N'חיפה')
ORDER BY s.FullName;`,
    alt:[`SELECT s.FullName, s.Address, d.DepartmentName
FROM Students s
JOIN Departments d ON s.DepartmentID = d.DepartmentID
WHERE s.Address IN ('תל אביב', 'רמת גן', 'גבעתיים', 'חיפה')
ORDER BY 1;`,
`SELECT s.FullName, s.Address, d.DepartmentName
FROM Students s
JOIN Departments d ON s.DepartmentID = d.DepartmentID
WHERE s.Address = 'תל אביב' OR s.Address = 'רמת גן' OR s.Address = 'גבעתיים' OR s.Address = 'חיפה'
ORDER BY s.FullName ASC;`],
    hint:`JOIN כמו בשאילתה 9, ואז WHERE s.Address IN (...) ו-ORDER BY s.FullName.`,
    explain:`4 שורות לפי הסדר: אלמוג ברק (תל אביב, מערכות מידע), דקל כהן (רמת גן, מערכות מידע), הראל דוד (גבעתיים, מערכות מידע), נועה גל (חיפה, בחינות). IN (N'…', N'…') קצר וקריא יותר מארבעה OR, והתוצאה זהה. כאן כל ה-OR מתייחסים לאותה עמודה ואין תנאי AND נוסף, ולכן אין בעיית קדימות. העיר שמורה בעמודה Address, וההשוואה היא לטקסט המדויק (ב-SQL Server עם N לפני כל ערך בעברית). המיון נבדק: לפי שם הסטודנט, לא לפי העיר — ORDER BY s.Address נותן סדר אחר ונפסל.`,
    source:'דומה לשאילתה 9 במבחן לדוגמה' },

  { id:'sv9-3', set:'sample', base:9, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת שמות כל המחלקות יחד עם שמות הסטודנטים שלהן — כולל מחלקות שאין בהן סטודנטים (עם NULL בשם הסטודנט). עמודות בסדר: DepartmentName, FullName.`,
    solution:`SELECT d.DepartmentName, s.FullName
FROM Departments d
LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID;`,
    alt:[`SELECT d.DepartmentName, s.FullName
FROM Students s
RIGHT JOIN Departments d ON s.DepartmentID = d.DepartmentID;`],
    hint:`איזו טבלה חייבת להופיע במלואה? היא נכתבת ראשונה (משמאל) ב-LEFT JOIN.`,
    explain:`13 שורות: 12 הסטודנטים עם המחלקה שלהם + מנהל עסקים עם NULL. כיוון ה-LEFT JOIN קובע: הטבלה שכל השורות שלה נשמרות היא זו שמשמאל (שנכתבה קודם). Students LEFT JOIN Departments מחזיר רק 12 שורות — לכל סטודנט יש מחלקה, והמחלקה הריקה לא נכנסת. Students RIGHT JOIN Departments שקול לפתרון. שימו לב לניסוחים במבחן לדוגמה: שאילתה 9 מבקשת "שמות הסטודנטים עם המחלקות" (INNER מספיק), ושאילתה 7 מבקשת "כולל מחלקות שאין בהן סטודנטים" — המילים "כולל … ללא/שאין" הן הסימן ל-LEFT JOIN.`,
    source:'דומה לשאילתה 9 במבחן לדוגמה' },

  { id:'sv9-4', set:'sample', base:9, topic:'outer', schema:'college', check:'select',
    prompt:`הצגת שמות כל הסטודנטים, שם המחלקה של כל סטודנט ומספר הקורסים שהוא רשום אליהם — כולל סטודנטים שאינם רשומים לאף קורס (יוצג 0). מיון לפי מספר הקורסים מהגבוה לנמוך, ובמקרה של שוויון לפי שם הסטודנט (א-ת). עמודות בסדר: FullName, DepartmentName, NumCourses.`,
    solution:`SELECT s.FullName, d.DepartmentName, COUNT(e.EnrollmentID) AS NumCourses
FROM Students s
JOIN Departments d ON s.DepartmentID = d.DepartmentID
LEFT JOIN Enrollments e ON e.StudentID = s.StudentID
GROUP BY s.StudentID, s.FullName, d.DepartmentName
ORDER BY NumCourses DESC, s.FullName;`,
    alt:[`SELECT s.FullName, d.DepartmentName,
       (SELECT COUNT(*) FROM Enrollments e WHERE e.StudentID = s.StudentID) AS NumCourses
FROM Students s
JOIN Departments d ON s.DepartmentID = d.DepartmentID
ORDER BY NumCourses DESC, s.FullName;`],
    hint:`JOIN רגיל ל-Departments, LEFT JOIN ל-Enrollments, GROUP BY לפי הסטודנט (כולל שם המחלקה), COUNT על עמודה של Enrollments.`,
    explain:`12 שורות: אושרי לוי ודקל כהן עם 2; תשעה סטודנטים עם 1 (בסדר א-ת: אוריה בן דוד, אלמוג ברק, גיא שלום …); איתי רון (דיקאנט) עם 0 בסוף. שילוב של שלושה דפוסים מהמבחן: JOIN רגיל ל-Departments (שאילתה 9), LEFT JOIN ל-Enrollments כדי לשמור את איתי רון (שאילתה 7), ו-GROUP BY עם COUNT על עמודה מהטבלה הימנית כדי לקבל 0 ולא 1. ב-SQL Server חובה לכלול ב-GROUP BY גם את d.DepartmentName, כי היא מופיעה ב-SELECT ואינה בתוך פונקציית צבירה.`,
    source:'דומה לשאילתה 9 במבחן לדוגמה' },

/* =====================================================================
   שאילתה 10 — "שמות המרצים עם המחלקות שבהן הם מלמדים"
   ===================================================================== */
  { id:'sv10-1', set:'sample', base:10, topic:'join', schema:'college', check:'select',
    prompt:`שליפת שמות המרצים עם שם המחלקה שלהם ושם השלוחה שבה המחלקה נמצאת. עמודות בסדר: FullName, DepartmentName, BranchName.`,
    solution:`SELECT l.FullName, d.DepartmentName, b.BranchName
FROM Lecturers l
JOIN Departments d ON l.DepartmentID = d.DepartmentID
JOIN Branches b ON d.BranchID = b.BranchID;`,
    alt:[`SELECT l.FullName, d.DepartmentName, b.BranchName
FROM Lecturers l, Departments d, Branches b
WHERE l.DepartmentID = d.DepartmentID AND d.BranchID = b.BranchID;`],
    hint:`שאילתה 10 ועוד חוליה אחת בשרשרת: Lecturers ← Departments (DepartmentID) ← Branches (BranchID).`,
    explain:`5 שורות: אפי פרופוס ויעל לוי — מערכות מידע, קריית אונו; דן ישראלי — בחינות, קריית אונו; רות אברהם — דיקאנט, שלוחת תל אביב; מיכל שרון — מנהל עסקים, שלוחת תל אביב. זו הרחבה של שאילתה 10 בעוד חוליה בשרשרת: כל JOIN נוסף מחבר FK בטבלה אחת ל-PK בטבלה הבאה. אין קשר ישיר בין מרצה לשלוחה — עוברים דרך המחלקה.`,
    source:'דומה לשאילתה 10 במבחן לדוגמה' },

  { id:'sv10-2', set:'sample', base:10, topic:'join', schema:'college', check:'select',
    prompt:`שליפת המרצים שמרוויחים מעל 15,000 ש"ח עם שם המחלקה שלהם, ממוינים לפי שם המחלקה ואחר כך לפי שם המרצה. עמודות בסדר: DepartmentName, FullName, Salary.`,
    solution:`SELECT d.DepartmentName, l.FullName, l.Salary
FROM Lecturers l
JOIN Departments d ON l.DepartmentID = d.DepartmentID
WHERE l.Salary > 15000
ORDER BY d.DepartmentName, l.FullName;`,
    alt:[`SELECT d.DepartmentName, l.FullName, l.Salary
FROM Departments d
JOIN Lecturers l ON l.DepartmentID = d.DepartmentID AND l.Salary > 15000
ORDER BY 1, 2;`],
    hint:`שילוב של שאילתה 4 (WHERE על המשכורת) ושאילתה 10 (JOIN למחלקה), ומיון לפי שני מפתחות.`,
    explain:`3 שורות לפי הסדר: דיקאנט – רות אברהם 21000; מערכות מידע – אפי פרופוס 18000; מערכות מידע – יעל לוי 16000. "מעל 15,000" = l.Salary > 15000 (בקוד בלי פסיק). מיון כפול: לפי שם המחלקה, ובתוך אותה מחלקה לפי שם המרצה — אחרת הסדר בין אפי פרופוס ליעל לוי לא מוגדר. שימו לב שהעמודה הראשונה כאן היא שם המחלקה — הבודק מקפיד על סדר העמודות.`,
    source:'דומה לשאילתה 10 במבחן לדוגמה' },

  { id:'sv10-3', set:'sample', base:10, topic:'join', schema:'college', check:'select',
    prompt:`שליפת שמות המרצים עם המחלקות שבהן הם מלמדים בפועל — לפי המחלקה של הקורסים שהם מלמדים (דרך טבלת Teaching), ולא לפי המחלקה שאליה המרצה משויך. כל צירוף של מרצה ומחלקה יופיע פעם אחת בלבד. עמודות בסדר: FullName, DepartmentName.`,
    solution:`SELECT DISTINCT l.FullName, d.DepartmentName
FROM Lecturers l
JOIN Teaching t ON l.LecturerID = t.LecturerID
JOIN Courses c ON t.CourseID = c.CourseID
JOIN Departments d ON c.DepartmentID = d.DepartmentID;`,
    alt:[`SELECT l.FullName, d.DepartmentName
FROM Lecturers l
JOIN Teaching t ON l.LecturerID = t.LecturerID
JOIN Courses c ON t.CourseID = c.CourseID
JOIN Departments d ON c.DepartmentID = d.DepartmentID
GROUP BY l.LecturerID, l.FullName, d.DepartmentID, d.DepartmentName;`],
    hint:`המסלול: Lecturers ← Teaching ← Courses ← Departments (ולא l.DepartmentID). מרצה שמלמד שני קורסים של אותה מחלקה יופיע פעמיים — DISTINCT.`,
    explain:`4 שורות: אפי פרופוס – מערכות מידע, יעל לוי – מערכות מידע, דן ישראלי – בחינות, רות אברהם – בחינות. זו פרשנות שונה מהפתרון הרשמי של שאילתה 10, שמשתמש ב-Lecturers.DepartmentID ונותן 5 שורות. כאן המסלול הוא Lecturers ← Teaching ← Courses ← Departments, וההבדלים: רות אברהם משויכת לדיקאנט אבל מלמדת סטטיסטיקה של מחלקת בחינות; מיכל שרון לא מלמדת אף קורס ולכן נעלמת. בלי DISTINCT מתקבלות 6 שורות — אפי ויעל מלמדים כל אחד שני קורסים של מערכות מידע. במבחן, כשהניסוח עמום ("המחלקות שבהן הם מלמדים") — כתבו בשורה אחת איזו פרשנות בחרתם.`,
    source:'דומה לשאילתה 10 במבחן לדוגמה' },

  { id:'sv10-4', set:'sample', base:10, topic:'join', schema:'college', check:'select',
    prompt:`מצא את המרצים שמלמדים קורס השייך למחלקה אחרת מהמחלקה שאליה הם משויכים. הצג את שם המרצה, שם המחלקה של המרצה, שם הקורס ושם המחלקה של הקורס. עמודות בסדר: FullName, LecturerDept, CourseName, CourseDept.`,
    solution:`SELECT l.FullName, ld.DepartmentName AS LecturerDept,
       c.CourseName, cd.DepartmentName AS CourseDept
FROM Lecturers l
JOIN Departments ld ON l.DepartmentID = ld.DepartmentID
JOIN Teaching t ON t.LecturerID = l.LecturerID
JOIN Courses c ON t.CourseID = c.CourseID
JOIN Departments cd ON c.DepartmentID = cd.DepartmentID
WHERE l.DepartmentID <> c.DepartmentID;`,
    alt:[`SELECT l.FullName, ld.DepartmentName AS LecturerDept,
       c.CourseName, cd.DepartmentName AS CourseDept
FROM Teaching t
JOIN Lecturers l ON t.LecturerID = l.LecturerID
JOIN Courses c ON t.CourseID = c.CourseID
JOIN Departments ld ON ld.DepartmentID = l.DepartmentID
JOIN Departments cd ON cd.DepartmentID = c.DepartmentID
WHERE ld.DepartmentID <> cd.DepartmentID;`],
    hint:`צריך שני שמות מחלקה באותה שורה — מחברים את Departments פעמיים, עם שני כינויים שונים (למשל ld למחלקת המרצה ו-cd למחלקת הקורס).`,
    explain:`שורה אחת: רות אברהם (דיקאנט) מלמדת סטטיסטיקה (בחינות). כדי להציג שני שמות מחלקה באותה שורה מחברים את Departments פעמיים עם שני כינויים שונים — ld למחלקת המרצה ו-cd למחלקת הקורס — והמנוע מתייחס אליהן כאל שתי טבלאות נפרדות. התנאי l.DepartmentID <> c.DepartmentID משווה את המספרים, ו-<> פירושו "שונה מ-". חיבור אחד בלבד ל-Departments היה מכריח את שתי המחלקות להיות אותה מחלקה. בלי שני כינויים שונים מקבלים שגיאה (אותה טבלה פעמיים באותו שם).`,
    source:'דומה לשאילתה 10 במבחן לדוגמה' }

);
