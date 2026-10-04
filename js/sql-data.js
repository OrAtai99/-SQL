/* ============================================================
   קורס 3964 — שפת SQL (מר אפי פרופוס) — סכימות מנוע ה-SQL
   ------------------------------------------------------------
   README / חוזה הנתונים של הפורטל (sql.html):
   • SQLC.schemas[key]   — DDL+INSERT לכל סכימה (practice | college | space | college2)
   • SQLC.tables[key]    — [{name, cols}] לתצוגה מקדימה ולרמזי שגיאות
   • SQLC.schemaInfo[key]— {title, desc} בעברית
   • SQLC.exercises      — js/sql-exercises.js (תרגילי SQL חיים)
   • SQLC.examQueries    — 10 שאילתות המבחן לדוגמה (סכימת college)
   • SQLC.nosql          — js/nosql-*.js (MongoDB)
   • SQLC.dual           — js/dual-questions.js (שאלה אחת: SQL + MongoDB)
   קוד T-SQL מומר ל-SQLite ע"י js/tsql-compat.js (TOP, YEAR, ISNULL, CAST DECIMAL, + …)
   סדר טעינה: college2-data.js → sql-data.js → שאר קבצי התוכן → app
   ============================================================ */
window.SQLC = window.SQLC || {};

/* ---------- סכימות ---------- */
/* practice = חוברת התרגילים (Students/Courses/Enrollments) — הנתונים המדויקים מה-PDF
   college  = סכימת המבחן לדוגמה (7 טבלאות: שלוחות→מחלקות→סטודנטים/מרצים/קורסים→גישור)
   space    = חייזרים/חלליות/כוכבים/מסעות — "תזכורת לסכמה" ממצגת 6 (נתונים מדויקים)
   college2 = מערכת המכללה של עבודת ישור קו (גם SQL וגם MongoDB) — js/college2-data.js */
SQLC.schemas = {

  practice: `
CREATE TABLE Students (student_id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT);
INSERT INTO Students VALUES
 (1,'Dan',22,'Tel Aviv'),(2,'Maya',25,'Haifa'),(3,'Ron',19,'Jerusalem'),
 (4,'Noa',28,'Tel Aviv'),(5,'Tom',21,'Beer Sheva'),(6,'Dana',24,'Haifa');

CREATE TABLE Courses (course_id INTEGER PRIMARY KEY, course_name TEXT, price INTEGER);
INSERT INTO Courses VALUES
 (101,'SQL',1200),(102,'Java',1500),(103,'Python',1800),(104,'Networks',1300);

CREATE TABLE Enrollments (enrollment_id INTEGER PRIMARY KEY, student_id INTEGER, course_id INTEGER, grade INTEGER);
INSERT INTO Enrollments VALUES
 (1,1,101,95),(2,1,102,82),(3,2,101,76),(4,2,103,91),
 (5,3,104,68),(6,4,101,88),(7,4,103,94),(8,5,102,55);
`,

  college: `
CREATE TABLE Branches (BranchID INTEGER PRIMARY KEY, BranchName TEXT, Location TEXT);
INSERT INTO Branches VALUES
 (1,'קריית אונו','אור יהודה'),(2,'שלוחת תל אביב','תל אביב');

CREATE TABLE Departments (DepartmentID INTEGER PRIMARY KEY, DepartmentName TEXT, BranchID INTEGER);
INSERT INTO Departments VALUES
 (1,'מערכות מידע',1),(2,'בחינות',1),(3,'דיקאנט',2),(4,'מנהל עסקים',2);

CREATE TABLE Students (StudentID INTEGER PRIMARY KEY, FullName TEXT, IDNumber TEXT, Address TEXT, DepartmentID INTEGER);
INSERT INTO Students VALUES
 (1,'דקל כהן','311111111','רמת גן',1),
 (2,'אושרי לוי','322222222','חולון',1),
 (3,'עמית מזרחי','333333333','בת ים',1),
 (4,'אלמוג ברק','344444444','תל אביב',1),
 (5,'גיא שלום','355555555','ראשון לציון',1),
 (6,'הראל דוד','366666666','גבעתיים',1),
 (7,'הודיה נחום','377777777','אור יהודה',1),
 (8,'יהודה כץ','388888888','פתח תקווה',1),
 (9,'אוריה בן דוד','399999999','יהוד',1),
 (10,'שני אבישי','300000000','קריית אונו',1),
 (11,'נועה גל','411111111','חיפה',2),
 (12,'איתי רון','422222222','נתניה',3);

CREATE TABLE Lecturers (LecturerID INTEGER PRIMARY KEY, FullName TEXT, IDNumber TEXT, Salary INTEGER, AcademicRank TEXT, DepartmentID INTEGER);
INSERT INTO Lecturers VALUES
 (1,'אפי פרופוס','511111111',18000,'פרופסור',1),
 (2,'יעל לוי','522222222',16000,'דוקטור',1),
 (3,'דן ישראלי','533333333',12000,'מרצה',2),
 (4,'רות אברהם','544444444',21000,'פרופסור',3),
 (5,'מיכל שרון','555555555',14000,'מרצה בכיר',4);

CREATE TABLE Courses (CourseID INTEGER PRIMARY KEY, CourseName TEXT, Credits INTEGER, DepartmentID INTEGER);
INSERT INTO Courses VALUES
 (101,'מבוא ל-SQL',4,1),
 (102,'בסיסי נתונים',3,1),
 (103,'ניתוח מערכות',3,1),
 (104,'סטטיסטיקה',4,2),
 (105,'חשבונאות ניהולית',3,4);

CREATE TABLE Enrollments (EnrollmentID INTEGER PRIMARY KEY, StudentID INTEGER, CourseID INTEGER, FinalGrade INTEGER);
INSERT INTO Enrollments VALUES
 (1,1,101,92),(2,1,102,78),(3,2,101,85),(4,3,103,88),(5,4,101,70),
 (6,5,104,95),(7,6,102,81),(8,7,103,60),(9,8,101,90),(10,9,102,74),
 (11,10,104,89),(12,11,104,93),(13,2,103,83);

CREATE TABLE Teaching (TeachingID INTEGER PRIMARY KEY, LecturerID INTEGER, CourseID INTEGER);
INSERT INTO Teaching VALUES
 (1,1,101),(2,2,101),(3,1,102),(4,2,103),(5,3,104),(6,4,104);
`,

  space: `
CREATE TABLE Aliens (id_no INT PRIMARY KEY, aname VARCHAR(50), no_of_legs INT, diet VARCHAR(50));
INSERT INTO Aliens VALUES
 (1,'E.T.',2,'Vegetarian'),(2,'Bin-Laden',2,'Jews'),(3,'B.A.',2,'Bad Guys'),
 (4,'Buck Rogers',12,'Humans'),(5,'Bill Gates',13,'Weird mushrooms'),
 (6,'Spoc’s dog',4,'Logic riddles'),(7,'Cher',2,'Vegetarian');

CREATE TABLE Ships (s_no INT PRIMARY KEY, sname VARCHAR(50), no_of_seats INT, max_speed INT);
INSERT INTO Ships VALUES
 (1,'Enterprise',4,120),(2,'Titanic',8,150),(3,'Altalena',12,70),
 (4,'x-sodus',20,60),(5,'Cartesian-product',35,50);

CREATE TABLE Planets (p_no INT PRIMARY KEY, pname VARCHAR(50), constellation VARCHAR(50), population INT);
INSERT INTO Planets VALUES
 (1,'Naren','Uraion',10000000),(2,'Alpha Centaury','Uraion',31000000),
 (3,'Pluto','Milkyway',200000000),(4,'K-PAX','Klingonia',6000000),
 (5,'London','Milkyway',12000000);

CREATE TABLE Trips (t_no INT PRIMARY KEY, s_no INT REFERENCES Ships(s_no), p_no INT REFERENCES Planets(p_no), d_date DATETIME, results VARCHAR(100));
INSERT INTO Trips VALUES
 (1,1,3,'2002-01-05 15:30','All clear'),
 (2,2,1,'2002-02-22 02:22','Don’t ask'),
 (3,3,2,'2004-04-14 14:44','Great sea-food'),
 (4,4,4,'2004-04-14 14:46','Need more madasim'),
 (5,1,5,'1800-06-06 18:06','Raining'),
 (6,5,5,'1800-06-06 21:09','Still raining'),
 (7,2,2,'2002-06-06 15:35','Too dark to see');

CREATE TABLE Aliens_in_trips (t_no INT REFERENCES Trips(t_no), id_no INT REFERENCES Aliens(id_no), PRIMARY KEY (t_no, id_no));
INSERT INTO Aliens_in_trips VALUES
 (1,1),(1,4),(2,2),(2,3),(3,2),(3,4),(3,5),(4,2),(4,4),(5,5),(5,1),(6,2),(6,3),(6,6),(7,6),(7,7);
`
};
/* college2 נבנה ממקור האמת המשותף ל-SQL ולמונגו */
SQLC.schemas.college2 = SQLC.buildCollege2Sql();

SQLC.schemaInfo = {
  practice: { title:'חוברת JOIN', desc:'Students · Courses · Enrollments — הנתונים המדויקים מחוברת התרגילים' },
  college:  { title:'המבחן לדוגמה', desc:'שלוחות, מחלקות, סטודנטים, מרצים, קורסים + טבלאות גישור' },
  space:    { title:'חייזרים וחלליות', desc:'Aliens · Ships · Planets · Trips · Aliens_in_trips — מצגות 4 ו-6' },
  college2: { title:'מערכת המכללה (SQL + NoSQL)', desc:'students · lecturers · courses · enrollments · assignments · submissions — עבודת ישור קו' },
};

/* ---------- מטא-נתונים לטבלאות (לתצוגה מקדימה + רמזי שגיאות) ---------- */
SQLC.tables = {
  practice: [
    { name:'Students',    cols:'student_id, name, age, city' },
    { name:'Courses',     cols:'course_id, course_name, price' },
    { name:'Enrollments', cols:'enrollment_id, student_id, course_id, grade' },
  ],
  college: [
    { name:'Branches',    cols:'BranchID, BranchName, Location' },
    { name:'Departments', cols:'DepartmentID, DepartmentName, BranchID' },
    { name:'Students',    cols:'StudentID, FullName, IDNumber, Address, DepartmentID' },
    { name:'Lecturers',   cols:'LecturerID, FullName, IDNumber, Salary, AcademicRank, DepartmentID' },
    { name:'Courses',     cols:'CourseID, CourseName, Credits, DepartmentID' },
    { name:'Enrollments', cols:'EnrollmentID, StudentID, CourseID, FinalGrade' },
    { name:'Teaching',    cols:'TeachingID, LecturerID, CourseID' },
  ],
  space: [
    { name:'Aliens',          cols:'id_no, aname, no_of_legs, diet' },
    { name:'Ships',           cols:'s_no, sname, no_of_seats, max_speed' },
    { name:'Planets',         cols:'p_no, pname, constellation, population' },
    { name:'Trips',           cols:'t_no, s_no, p_no, d_date, results' },
    { name:'Aliens_in_trips', cols:'t_no, id_no' },
  ],
  college2: SQLC.college2Tables,
};

/* ---------- 10 שאילתות המבחן לדוגמה (על סכימת college) ---------- */
SQLC.examQueries = [
  { n:1,  prompt:'הצג את כל השמות והמיקומים של השלוחות במערכת.',
    solution:`SELECT BranchName, Location FROM Branches;` },
  { n:2,  prompt:'הצג את כל המחלקות עם שמותיהן ושם השלוחה שבה הן נמצאות.',
    solution:`SELECT d.DepartmentName, b.BranchName
FROM Departments d
JOIN Branches b ON d.BranchID = b.BranchID;` },
  { n:3,  prompt:'שלוף את שמות הסטודנטים עם הקורסים שלהם — רק אם הציון גבוה מ-80.',
    solution:`SELECT s.FullName, c.CourseName, e.FinalGrade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID
WHERE e.FinalGrade > 80;` },
  { n:4,  prompt:'שלוף את כל המרצים שמרוויחים מעל 15,000 ש"ח.',
    solution:`SELECT FullName, Salary FROM Lecturers WHERE Salary > 15000;` },
  { n:5,  prompt:'הצג את מספר הסטודנטים בכל מחלקה.',
    solution:`SELECT d.DepartmentName, COUNT(s.StudentID) AS NumStudents
FROM Departments d
JOIN Students s ON s.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentID;` },
  { n:6,  prompt:'הצג את כל הקורסים עם המרצים שמלמדים אותם. ודא שגם קורסים ללא מרצים יוצגו (LEFT JOIN).',
    solution:`SELECT c.CourseName, l.FullName
FROM Courses c
LEFT JOIN Teaching t ON c.CourseID = t.CourseID
LEFT JOIN Lecturers l ON t.LecturerID = l.LecturerID;` },
  { n:7,  prompt:'הצג את כל המחלקות עם מספר הסטודנטים שלהן, כולל מחלקות שאין בהן סטודנטים (LEFT JOIN).',
    solution:`SELECT d.DepartmentName, COUNT(s.StudentID) AS NumStudents
FROM Departments d
LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID
GROUP BY d.DepartmentID;` },
  { n:8,  prompt:'מצא את כל הקורסים שמועברים על ידי יותר ממרצה אחד.',
    solution:`SELECT c.CourseName, COUNT(t.LecturerID) AS NumLecturers
FROM Courses c
JOIN Teaching t ON c.CourseID = t.CourseID
GROUP BY c.CourseID
HAVING COUNT(t.LecturerID) > 1;` },
  { n:9,  prompt:'הצג את שמות הסטודנטים יחד עם שמות המחלקות שלהם.',
    solution:`SELECT s.FullName, d.DepartmentName
FROM Students s
JOIN Departments d ON s.DepartmentID = d.DepartmentID;` },
  { n:10, prompt:'שלוף את שמות המרצים עם המחלקות שבהן הם מלמדים.',
    solution:`SELECT l.FullName, d.DepartmentName
FROM Lecturers l
JOIN Departments d ON l.DepartmentID = d.DepartmentID;` },
];
