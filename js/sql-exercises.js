/* ============================================================
   קורס 3964 — שפת SQL (אפי פרופוס) — תרגילי SQL חיים
   נבדקים מול מנוע SQL בדפדפן (SQLite אחרי המרת T-SQL ב-tsql-compat.js)
   ------------------------------------------------------------
   חוזה לכל תרגיל:
   { id, set:'workbook'|'space'|'college2'|'ddl',
     topic:'select'|'where'|'join'|'outer'|'group'|'case'|'nested'|'dml'|'ddl'|'temp',
     schema:'practice'|'space'|'college2',
     prompt  — עברית; תמיד מציין אילו עמודות ובאיזה סדר (הבודק משווה ערכים לפי סדר עמודות),
     check   — 'select' (משווים תוצאה) | 'mutate' (משווים את mutateTable אחרי ההרצה) | 'text' (השוואת טקסט מנורמל),
     solution — פתרון רץ (בסגנון T-SQL), alt? — פתרונות נכונים נוספים (כולם עוברים את הבודק),
     official? — הפתרון הרשמי של המרצה מילה במילה כולל טעויות הקלדה (לתצוגה בלבד, לא נבדק),
     hint, explain — טקסט רגיל בעברית (ללא HTML), source — תווית מקור, expectEmpty? }
   סדר: חוברת JOIN (practice) → חייזרים וחלליות (space) → מערכת המכללה (college2) → DDL/DML/טבלאות זמניות/פרוצדורות
   ============================================================ */
window.SQLC = window.SQLC || {};

SQLC.exercises = [

/* =====================================================================
   1) חוברת התרגילים "חוברת תרגילים – SQL" (JOIN) — 14 תרגילים, סכימת practice
      Students(student_id, name, age, city) · Courses(course_id, course_name, price)
      Enrollments(enrollment_id, student_id, course_id, grade)
   ===================================================================== */
  { id:'w1', set:'workbook', topic:'join', schema:'practice', check:'select',
    prompt:`תרגיל 1: הצג את שם הסטודנט, שם הקורס והציון — הצג רק סטודנטים שרשומים לקורס כלשהו. עמודות בסדר: name, course_name, grade.`,
    solution:`SELECT s.name, c.course_name, e.grade
FROM Students s
INNER JOIN Enrollments e ON s.student_id = e.student_id
INNER JOIN Courses c ON c.course_id = e.course_id;`,
    alt:[`SELECT s.name, c.course_name, e.grade
FROM Students s
JOIN Enrollments e ON e.student_id = s.student_id
JOIN Courses c ON e.course_id = c.course_id;`,
`SELECT s.name, c.course_name, e.grade
FROM Students s, Enrollments e, Courses c
WHERE s.student_id = e.student_id AND c.course_id = e.course_id;`],
    official:`Select s.name , c.course_Name , e.grade
From students s
Inner join enrollmets e  on s.studentId = e.studentId
Inner join courses c on c.courseId = e.courseId`,
    hint:`צריך שלוש טבלאות. Enrollments היא טבלת הגשר: מחברים אותה ל-Students לפי student_id ול-Courses לפי course_id.`,
    explain:`INNER JOIN מחזיר רק שורות שיש להן התאמה בשני הצדדים — לכן מתקבלות 8 שורות (אחת לכל הרשמה), ו-Dana, שאין לה אף הרשמה, לא מופיעה. בפתרון הרשמי יש טעויות הקלדה: enrollmets במקום enrollments, ושמות העמודות נכתבו studentId / courseId (camelCase) בעוד שבטבלאות של החוברת הן student_id / course_id. ב-SQL Server שם טבלה או עמודה שגוי = שגיאה (Invalid object name / Invalid column name), אז במבחן מעתיקים את השמות בדיוק מהסכמה. course_Name עם N גדולה לא מזיק — בהגדרת ברירת המחדל SQL Server לא רגיש לאותיות גדולות/קטנות. החלופה עם פסיקים ב-FROM ותנאי החיבור ב-WHERE (הצורה הישנה, כמו בתבנית של מצגת 6) נותנת בדיוק אותה תוצאה.`,
    source:`חוברת JOIN — תרגיל 1 (פתרון רשמי)` },

  { id:'w2', set:'workbook', topic:'join', schema:'practice', check:'select',
    prompt:`תרגיל 2: הצג את שמות הסטודנטים ואת הציונים שלהם — רק עבור ציונים מעל 80. עמודות בסדר: name, grade.`,
    solution:`SELECT s.name, e.grade
FROM Students s
INNER JOIN Enrollments e ON e.student_id = s.student_id
WHERE e.grade > 80;`,
    alt:[`SELECT s.name, e.grade
FROM Students s
JOIN Enrollments e ON e.student_id = s.student_id AND e.grade > 80;`],
    official:`Select s.name , e.grade
From students s
Inner join enrollments e on e.studentId = s.sudentId
Where e.grade > 80`,
    hint:`INNER JOIN בין Students ל-Enrollments, ואחריו WHERE על הציון. "מעל 80" פירושו > 80 (לא >=).`,
    explain:`התוצאה: Dan 95, Dan 82, Maya 91, Noa 88, Noa 94 (5 שורות). מלכודת גבולות: "מעל 80" = > 80, ולכן ציון 80 בדיוק לא היה נכנס. בנתוני החוברת אין ציון 80 בדיוק, כך שכאן גם >= 80 ייתן אותה תוצאה והבודק לא יתפוס את ההבדל — אבל במבחן זו טעות. בפתרון הרשמי יש טעות הקלדה s.sudentId (וגם כאן camelCase במקום student_id). שימו לב: ב-INNER JOIN אין הבדל אם התנאי על הציון נכתב ב-WHERE או בתוך ה-ON (החלופה) — אבל ב-LEFT JOIN יש הבדל גדול (ראו תרגילים 8 ו-13).`,
    source:`חוברת JOIN — תרגיל 2 (פתרון רשמי)` },

  { id:'w3', set:'workbook', topic:'outer', schema:'practice', check:'select',
    prompt:`תרגיל 3: הצג את כל הסטודנטים, וליד כל סטודנט הצג את שם הקורס שאליו הוא רשום. סטודנט שאינו רשום לקורס צריך עדיין להופיע. עמודות בסדר: name, course_name.`,
    solution:`SELECT s.name, c.course_name
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses c ON c.course_id = e.course_id;`,
    alt:[`SELECT s.name, c.course_name
FROM Students s
LEFT OUTER JOIN Enrollments e ON e.student_id = s.student_id
LEFT OUTER JOIN Courses c ON e.course_id = c.course_id;`],
    official:`Select s.name , c.course_name
From students s left join enrollments e on s.studentId = e.studentId
Left join courses c on c.courseId = e.courseId`,
    hint:`LEFT JOIN שומר את כל השורות של הטבלה השמאלית (Students). גם ה-JOIN השני חייב להיות LEFT.`,
    explain:`מתקבלות 9 שורות: 8 ההרשמות ועוד Dana עם NULL בשם הקורס. המלכודת: אם ה-JOIN השני (ל-Courses) יהיה INNER, השורה של Dana (שבה e.course_id הוא NULL) לא תמצא התאמה ותיעלם שוב — כלומר כל השרשרת אחרי LEFT JOIN צריכה להישאר LEFT. LEFT JOIN ו-LEFT OUTER JOIN הם אותו דבר. בפתרון הרשמי שוב studentId / courseId במקום student_id / course_id.`,
    source:`חוברת JOIN — תרגיל 3 (פתרון רשמי)` },

  { id:'w4', set:'workbook', topic:'case', schema:'practice', check:'select',
    prompt:`תרגיל 4: הציגו שם סטודנט, הציון ועמודה חדשה בשם status: ציון 90 ומעלה → 'Excellent'; 80 עד 89 → 'Very Good'; 70 עד 79 → 'Good'; מתחת ל-70 → 'Fail'. כתבו את הערכים באנגלית בדיוק כך (הבודק משווה טקסט). רק סטודנטים שרשומים לקורס. עמודות בסדר: name, grade, status.`,
    solution:`SELECT s.name, e.grade,
  CASE
    WHEN e.grade >= 90 THEN 'Excellent'
    WHEN e.grade >= 80 THEN 'Very Good'
    WHEN e.grade >= 70 THEN 'Good'
    ELSE 'Fail'
  END AS status
FROM Students s
INNER JOIN Enrollments e ON e.student_id = s.student_id;`,
    alt:[`SELECT s.name, e.grade,
  CASE
    WHEN e.grade >= 90 THEN 'Excellent'
    WHEN e.grade BETWEEN 80 AND 89 THEN 'Very Good'
    WHEN e.grade BETWEEN 70 AND 79 THEN 'Good'
    ELSE 'Fail'
  END AS status
FROM Students s
JOIN Enrollments e ON e.student_id = s.student_id;`],
    official:`Select s.name , e.grade ,
Case
     When e.grade >= 90 then 'execllent'
     When e.grade >= 80 then 'very good'
     When e.grade >= 70 then 'good'
     Else 'fail'
     End as status
From students s
Inner join enrollments e on e.studentId = s.StudentId`,
    hint:`CASE WHEN … THEN … ELSE … END AS status בתוך ה-SELECT. כתבו את התנאים מהסף הגבוה לנמוך — התנאי הראשון שמתקיים קובע.`,
    explain:`CASE נבדק מלמעלה למטה והתנאי הראשון שמתקיים "מנצח". לכן WHEN e.grade >= 80 בשורה השנייה מתפרש בפועל כ-80 עד 89 (מי שקיבל 90+ כבר נתפס בשורה הראשונה). אם נהפוך את הסדר ונתחיל ב->= 70, גם ציון 95 יקבל 'Good'. בחוברת התיאורים בעברית (מצויין / טוב מאוד / טוב / נכשל); המרצה עצמו כתב בפתרון ערכים באנגלית — עם טעות הקלדה 'execllent' — ולכן כאן קבענו ערכים מדויקים באנגלית כדי שהבודק יוכל להשוות. עוד טעות בפתרון הרשמי: s.StudentId / e.studentId במקום student_id. התוצאה: Dan 95 Excellent, Dan 82 Very Good, Maya 76 Good, Maya 91 Excellent, Ron 68 Fail, Noa 88 Very Good, Noa 94 Excellent, Tom 55 Fail.`,
    source:`חוברת JOIN — תרגיל 4 (פתרון רשמי)` },

  { id:'w5', set:'workbook', topic:'outer', schema:'practice', check:'select',
    prompt:`תרגיל 5: הצג את כל הסטודנטים, כולל כאלה שאינם רשומים לקורס. הצג: שם הסטודנט, שם הקורס וציון. עמודות בסדר: name, course_name, grade.`,
    solution:`SELECT s.name, c.course_name, e.grade
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses c ON c.course_id = e.course_id;`,
    official:`Select s.name , c.course_name , e.grade
From sudents s left join enrollments e on s.studentId = e.studentId
Left join course c on c.courseId = e.courseId`,
    hint:`בדיוק כמו תרגיל 3, רק עם עמודת הציון — שני LEFT JOIN ברצף מ-Students.`,
    explain:`מתקבלות 9 שורות; ל-Dana יש NULL גם בשם הקורס וגם בציון, כי אין לה אף שורה ב-Enrollments. טעויות בפתרון הרשמי: sudents במקום Students, course במקום Courses (שם הטבלה ברבים), ושוב studentId / courseId. ב-SQL Server כל אחת מהן היא שגיאת הרצה — במבחן מעתיקים שמות מדויקים.`,
    source:`חוברת JOIN — תרגיל 5 (פתרון רשמי)` },

  { id:'w6', set:'workbook', topic:'outer', schema:'practice', check:'select',
    prompt:`תרגיל 6: כתוב שאילתה המציגה את כל הקורסים, גם אם אף סטודנט אינו רשום אליהם. הצג שם סטודנט, שם קורס וציון. יש לפתור ב-RIGHT JOIN. עמודות בסדר (כמו בפתרון הרשמי): name, course_name, grade.`,
    solution:`SELECT s.name, c.course_name, e.grade
FROM Students s
RIGHT JOIN Enrollments e ON s.student_id = e.student_id
RIGHT JOIN Courses c ON c.course_id = e.course_id;`,
    alt:[`SELECT s.name, c.course_name, e.grade
FROM Courses c
LEFT JOIN Enrollments e ON c.course_id = e.course_id
LEFT JOIN Students s ON s.student_id = e.student_id;`],
    official:`Select s.name , c.course_name , e.grade
From sudents s right join enrollments e on s.studentId = e.studentId
right join course c on c.courseId = e.courseId`,
    hint:`RIGHT JOIN שומר את כל השורות של הטבלה הימנית — זו שכתובה אחרי המילה JOIN. כדי לשמור את כל הקורסים, Courses צריכה להיות האחרונה בשרשרת.`,
    explain:`ה-RIGHT JOIN האחרון (אל Courses) מבטיח שכל קורס יופיע. בנתוני החוברת לכל קורס יש לפחות הרשמה אחת, ולכן התוצאה זהה לתרגיל 1 (8 שורות) — קורס בלי סטודנטים היה מופיע עם NULL בשם הסטודנט ובציון (ראו תרגיל 6 — הרחבה, שמוסיף קורס כזה). כל RIGHT JOIN אפשר לכתוב כ-LEFT JOIN על ידי היפוך סדר הטבלאות (החלופה מתחילה מ-Courses). בפתרון הרשמי: sudents ו-course במקום Students ו-Courses, ו-studentId / courseId.`,
    source:`חוברת JOIN — תרגיל 6 (פתרון רשמי)` },

  { id:'w6b', set:'workbook', topic:'outer', schema:'practice', check:'select',
    prompt:`תרגיל 6 — הרחבה: באותה הרצה, הוסיפו קודם קורס חדש שאין בו סטודנטים: INSERT INTO Courses VALUES (105, 'Cyber', 1400); ומיד אחריו הריצו את שאילתת ה-RIGHT JOIN של תרגיל 6. עמודות בסדר: name, course_name, grade.`,
    solution:`INSERT INTO Courses VALUES (105, 'Cyber', 1400);

SELECT s.name, c.course_name, e.grade
FROM Students s
RIGHT JOIN Enrollments e ON s.student_id = e.student_id
RIGHT JOIN Courses c ON c.course_id = e.course_id;`,
    alt:[`INSERT INTO Courses (course_id, course_name, price) VALUES (105, 'Cyber', 1400);
SELECT s.name, c.course_name, e.grade
FROM Courses c
LEFT JOIN Enrollments e ON c.course_id = e.course_id
LEFT JOIN Students s ON s.student_id = e.student_id;`],
    hint:`שתי פקודות מופרדות ב-; — קודם INSERT, אחר כך השאילתה של תרגיל 6. התוצאה שמוצגת היא של הפקודה האחרונה.`,
    explain:`עכשיו מתקבלות 9 שורות: 8 ההרשמות ועוד NULL, Cyber, NULL — הקורס נשמר בזכות ה-RIGHT JOIN האחרון, ואין לו סטודנט או ציון. עם INNER JOIN, Cyber לא היה מופיע. זו הדרך לראות את ההבדל בין סוגי ה-JOIN: לייצר במכוון שורה בלי התאמה.`,
    source:`חוברת JOIN — תרגיל 6 (הרחבה)` },

  { id:'w7', set:'workbook', topic:'case', schema:'practice', check:'select',
    prompt:`תרגיל 7: הציגו את הקורסים ואת המחיר שלהם, וצרו עמודה final_price: מחיר מעל 1500 — הנחה בגובה 10% (price * 0.9); מחיר 1500 ומטה — ללא הנחה. עמודות בסדר: course_name, price, final_price.`,
    solution:`SELECT course_name, price,
  CASE
    WHEN price > 1500 THEN price * 0.9
    ELSE price
  END AS final_price
FROM Courses;`,
    alt:[`SELECT course_name, price,
  CASE WHEN price <= 1500 THEN price ELSE price * 0.9 END AS final_price
FROM Courses;`],
    official:`Select course_name , price ,
Case
    When price > 1500 then price *0.9
    Else price
End
As final_price
From courses`,
    hint:`עמודה מחושבת עם CASE בתוך ה-SELECT; בענף של ההנחה מחשבים price * 0.9.`,
    explain:`רק Python (1800) מקבל הנחה → 1620. Java עולה בדיוק 1500 — זה לא "מעל 1500", ולכן נשאר 1500. הפתרון הרשמי נכון (ה-AS בשורה נפרדת אחרי END זה חוקי). ב-SQL Server, INT * 0.9 מחזיר NUMERIC, ולכן כל העמודה final_price מקבלת טיפוס עשרוני — 1620.0, ואפילו המחירים בלי הנחה יוצגו כ-1200.0 וכו'.`,
    source:`חוברת JOIN — תרגיל 7 (פתרון רשמי)` },

  { id:'w8', set:'workbook', topic:'outer', schema:'practice', check:'select',
    prompt:`תרגיל 8: כתוב שאילתה שמציגה את כל הסטודנטים, אבל אם יש להם קורס — הצג רק קורסים שבהם הציון מעל 80. סטודנט שאין לו קורס כזה צריך עדיין להופיע (עם NULL). עמודות בסדר: name, course_name, grade.`,
    solution:`SELECT s.name, c.course_name, e.grade
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id AND e.grade > 80
LEFT JOIN Courses c ON c.course_id = e.course_id;`,
    hint:`את התנאי על הציון מכניסים לתוך ה-ON של ה-LEFT JOIN (עם AND) — לא ל-WHERE.`,
    explain:`התוצאה (8 שורות): Dan SQL 95, Dan Java 82, Maya Python 91, Noa SQL 88, Noa Python 94, ועוד Ron, Tom ו-Dana עם NULL. תנאי בתוך ה-ON קובע "אילו הרשמות לחבר" — הרשמה עם ציון 80 ומטה פשוט לא מחוברת, אבל הסטודנט עצמו נשמר. אם כותבים WHERE e.grade > 80, הסינון קורה אחרי החיבור: אצל Ron, Tom ו-Dana הציון הוא נמוך או NULL, ו-NULL > 80 אינו TRUE — והם נעלמים, כלומר ה-LEFT JOIN הופך בפועל ל-INNER JOIN. שימו לב ש-Maya לא מקבלת שורת NULL נוספת בגלל הציון 76 — יש לה הרשמה אחרת שעומדת בתנאי.`,
    source:`חוברת JOIN — תרגיל 8 (פתרון לא רשמי)` },

  { id:'w9', set:'workbook', topic:'outer', schema:'practice', check:'select',
    prompt:`תרגיל 9: הצג את כל הסטודנטים שאינם רשומים לאף קורס. עמודה: name.`,
    solution:`SELECT s.name
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
WHERE e.enrollment_id IS NULL;`,
    alt:[`SELECT name FROM Students
WHERE student_id NOT IN (SELECT student_id FROM Enrollments);`,
`SELECT s.name FROM Students s
WHERE NOT EXISTS (SELECT 1 FROM Enrollments e WHERE e.student_id = s.student_id);`],
    hint:`LEFT JOIN מ-Students ל-Enrollments, ואז משאירים רק שורות שלא נמצאה להן התאמה: WHERE e.enrollment_id IS NULL.`,
    explain:`התוצאה: Dana. זו תבנית ה-anti-join: אחרי LEFT JOIN, לסטודנט בלי הרשמה כל עמודות Enrollments הן NULL. בודקים IS NULL על עמודה שאף פעם לא NULL בהתאמה אמיתית (המפתח הראשי enrollment_id או עמודת החיבור) — לא על grade, שיכול להיות NULL גם בהרשמה קיימת. = NULL לעולם לא מחזיר TRUE, תמיד IS NULL. חלופות: NOT IN ו-NOT EXISTS. זהירות עם NOT IN: אם תת-השאילתה מחזירה ולו NULL אחד — התוצאה כולה ריקה; NOT EXISTS בטוח יותר.`,
    source:`חוברת JOIN — תרגיל 9 (פתרון לא רשמי)` },

  { id:'w10', set:'workbook', topic:'outer', schema:'practice', check:'select',
    prompt:`תרגיל 10: הצג את כל הקורסים שאין להם אף סטודנט רשום. בנתוני החוברת לכל קורס יש סטודנט (והתוצאה ריקה), ולכן כדי לבדוק את השאילתה — באותה הרצה הוסיפו קודם קורס בלי סטודנטים: INSERT INTO Courses VALUES (105, 'Cyber', 1400); ומיד אחריו כתבו את השאילתה. עמודה: course_name.`,
    solution:`INSERT INTO Courses VALUES (105, 'Cyber', 1400);

SELECT c.course_name
FROM Courses c
LEFT JOIN Enrollments e ON c.course_id = e.course_id
WHERE e.enrollment_id IS NULL;`,
    alt:[`INSERT INTO Courses VALUES (105, 'Cyber', 1400);
SELECT c.course_name
FROM Enrollments e
RIGHT JOIN Courses c ON c.course_id = e.course_id
WHERE e.enrollment_id IS NULL;`,
`INSERT INTO Courses (course_id, course_name, price) VALUES (105, 'Cyber', 1400);
SELECT course_name FROM Courses
WHERE course_id NOT IN (SELECT course_id FROM Enrollments);`,
`INSERT INTO Courses VALUES (105, 'Cyber', 1400);
SELECT c.course_name FROM Courses c
WHERE NOT EXISTS (SELECT 1 FROM Enrollments e WHERE e.course_id = c.course_id);`],
    hint:`אותה תבנית כמו תרגיל 9, רק מהצד של הקורסים: LEFT JOIN מ-Courses ובדיקת IS NULL. שתי פקודות מופרדות ב-; — התוצאה שמוצגת היא של האחרונה.`,
    explain:`על הנתונים המקוריים של החוברת התוצאה ריקה — וזו התשובה הנכונה, כי לכל אחד מ-4 הקורסים יש לפחות סטודנט אחד ("אם אף רשומה לא עומדת בתנאי — התוצאה היא קבוצה ריקה", מצגת 3). אחרי הוספת Cyber מתקבל Cyber בלבד — כך בודקים שאילתת anti-join: מייצרים במכוון מקרה קצה ומוודאים שהוא נתפס. חלופות: RIGHT JOIN (כש-Courses מימין), NOT IN ו-NOT EXISTS.`,
    source:`חוברת JOIN — תרגיל 10 (פתרון לא רשמי)` },

  { id:'w11', set:'workbook', topic:'case', schema:'practice', check:'select',
    prompt:`תרגיל 11: הצג עבור כל הרשמה: שם הסטודנט, שם הקורס, הציון וקטגוריה (category): ציון 90 ומעלה → 'Excellent'; 80–89 → 'Very Good'; 70–79 → 'Good'; 60–69 → 'Pass'; מתחת ל-60 → 'Fail'. עמודות בסדר: name, course_name, grade, category.`,
    solution:`SELECT s.name, c.course_name, e.grade,
  CASE
    WHEN e.grade >= 90 THEN 'Excellent'
    WHEN e.grade >= 80 THEN 'Very Good'
    WHEN e.grade >= 70 THEN 'Good'
    WHEN e.grade >= 60 THEN 'Pass'
    ELSE 'Fail'
  END AS category
FROM Students s
INNER JOIN Enrollments e ON s.student_id = e.student_id
INNER JOIN Courses c ON c.course_id = e.course_id;`,
    alt:[`SELECT s.name, c.course_name, e.grade,
  CASE
    WHEN e.grade >= 90 THEN 'Excellent'
    WHEN e.grade BETWEEN 80 AND 89 THEN 'Very Good'
    WHEN e.grade BETWEEN 70 AND 79 THEN 'Good'
    WHEN e.grade BETWEEN 60 AND 69 THEN 'Pass'
    ELSE 'Fail'
  END AS category
FROM Students s
JOIN Enrollments e ON s.student_id = e.student_id
JOIN Courses c ON c.course_id = e.course_id;`],
    hint:`"עבור כל הרשמה" → INNER JOIN של שלוש הטבלאות, ו-CASE עם חמישה ספים מהגבוה לנמוך.`,
    explain:`8 שורות: Dan SQL 95 Excellent, Dan Java 82 Very Good, Maya SQL 76 Good, Maya Python 91 Excellent, Ron Networks 68 Pass, Noa SQL 88 Very Good, Noa Python 94 Excellent, Tom Java 55 Fail. ב-PDF הטווחים מוצגים הפוכים (89–80) בגלל כיווניות עברית — הכוונה 80 עד 89. גרסת ה-BETWEEN עובדת כאן כי הציונים שלמים, אבל עם ציון כמו 89.5 היא הייתה "נופלת לחור" בין הטווחים; סולם ה->= בטוח יותר.`,
    source:`חוברת JOIN — תרגיל 11 (פתרון לא רשמי)` },

  { id:'w12', set:'workbook', topic:'case', schema:'practice', check:'select',
    prompt:`תרגיל 12: הצג דוח הכולל: שם הסטודנט, עיר, שם הקורס, מחיר הקורס, הציון, סטטוס הציון (grade_status) והמחיר הסופי (final_price). grade_status — לפי הקטגוריות של תרגיל 11 (Excellent / Very Good / Good / Pass / Fail), ולסטודנט בלי קורס: 'No Course'. כללי המחיר: ציון 90 ומעלה → הנחה של 20%; ציון 80 ומעלה → הנחה של 10%; אחרת → ללא הנחה. המחיר הסופי חייב להיות מסוג DECIMAL(10,2) (השתמשו ב-CAST). בנוסף, סטודנט ללא קורס צריך להופיע בדוח (המחיר הסופי שלו NULL). עמודות בסדר: name, city, course_name, price, grade, grade_status, final_price.`,
    solution:`SELECT s.name, s.city, c.course_name, c.price, e.grade,
  CASE
    WHEN e.grade IS NULL THEN 'No Course'
    WHEN e.grade >= 90 THEN 'Excellent'
    WHEN e.grade >= 80 THEN 'Very Good'
    WHEN e.grade >= 70 THEN 'Good'
    WHEN e.grade >= 60 THEN 'Pass'
    ELSE 'Fail'
  END AS grade_status,
  CAST(
    CASE
      WHEN e.grade >= 90 THEN c.price * 0.8
      WHEN e.grade >= 80 THEN c.price * 0.9
      ELSE c.price
    END AS DECIMAL(10,2)) AS final_price
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses c ON c.course_id = e.course_id;`,
    hint:`שני LEFT JOIN מ-Students ושני ביטויי CASE. את כל ה-CASE של המחיר עוטפים ב-CAST(... AS DECIMAL(10,2)). ב-CASE של הסטטוס בדקו קודם אם הציון NULL.`,
    explain:`Dana מופיעה בזכות ה-LEFT JOIN, עם NULL בקורס, במחיר ובציון. אצלה כל תנאי WHEN על הציון הוא UNKNOWN (השוואה מול NULL), ולכן בלי בדיקה מפורשת היא הייתה נופלת ל-ELSE ומקבלת 'Fail' — בגלל זה WHEN e.grade IS NULL THEN 'No Course' בא ראשון. במחיר: ELSE c.price מחזיר NULL אצלה — וזה נכון, אין קורס ואין מחיר. סדר הספים: >= 90 לפני >= 80, אחרת ציון 95 יקבל רק 10% הנחה. CAST ל-DECIMAL(10,2) מציג שתי ספרות אחרי הנקודה: 960.00, 1350.00, 1200.00, 1440.00, 1300.00, 1080.00, 1440.00, 1500.00. "סטטוס הציון" לא מוגדר בחוברת — כאן הגדרנו אותו לפי תרגיל 11 ועוד 'No Course'.`,
    source:`חוברת JOIN — תרגיל 12 (פתרון לא רשמי)` },

  { id:'w13a', set:'workbook', topic:'outer', schema:'practice', check:'select',
    prompt:`תרגיל 13 (א+ב): נתונה השאילתה: SELECT s.name, e.grade FROM Students s LEFT JOIN Enrollments e ON s.student_id = e.student_id WHERE e.grade >= 80; — הריצו אותה כפי שהיא, וענו: האם כל הסטודנטים יופיעו? מה יקרה לסטודנט שאין לו הרשמה?`,
    solution:`SELECT s.name, e.grade
FROM Students s
LEFT JOIN Enrollments e
   ON s.student_id = e.student_id
WHERE e.grade >= 80;`,
    hint:`הריצו והשוו לששת הסטודנטים בטבלה Students. מי חסר? מה הערך של e.grade אצל סטודנט בלי הרשמה אחרי ה-LEFT JOIN?`,
    explain:`(א) לא. מתקבלות רק 5 שורות: Dan 95, Dan 82, Maya 91, Noa 88, Noa 94 — Ron, Tom ו-Dana נעלמים. (ב) לסטודנט בלי הרשמה (Dana) ה-LEFT JOIN מייצר שורה עם e.grade = NULL, אבל ה-WHERE רץ אחרי החיבור, ו-NULL >= 80 הוא UNKNOWN (לא TRUE) — ולכן השורה נזרקת. גם Ron ו-Tom נעלמים, כי הציונים שלהם (68, 55) נמוכים מ-80. תנאי ב-WHERE על הטבלה הימנית "מבטל" את ה-LEFT JOIN והשאילתה מתנהגת כמו INNER JOIN. התיקון — בסעיף ג.`,
    source:`חוברת JOIN — תרגיל 13 סעיפים א–ב (השאילתה הנתונה)` },

  { id:'w13c', set:'workbook', topic:'outer', schema:'practice', check:'select',
    prompt:`תרגיל 13 (ג): כתוב שאילתה שתציג את כל הסטודנטים, אבל תביא ציונים רק אם הציון >= 80. סטודנט בלי ציון כזה יופיע עם NULL. עמודות בסדר: name, grade.`,
    solution:`SELECT s.name, e.grade
FROM Students s
LEFT JOIN Enrollments e
   ON s.student_id = e.student_id
  AND e.grade >= 80;`,
    hint:`מעבירים את התנאי e.grade >= 80 מה-WHERE לתוך ה-ON (עם AND).`,
    explain:`8 שורות: Dan 95, Dan 82, Maya 91, Noa 88, Noa 94, Ron NULL, Tom NULL, Dana NULL. הכלל: תנאי ב-ON קובע אילו שורות מהטבלה הימנית מצטרפות; תנאי ב-WHERE קובע אילו שורות סופיות נשארות. ב-LEFT JOIN, תנאי על הטבלה הימנית שייך ל-ON. מלכודת נפוצה: WHERE e.grade >= 80 OR e.grade IS NULL איננו שקול — הוא מחזיר את Dana (שבאמת אין לה הרשמה), אבל מאבד את Ron ו-Tom, כי יש להם הרשמה עם ציון נמוך ולכן השורה שלהם לא NULL.`,
    source:`חוברת JOIN — תרגיל 13 סעיף ג (פתרון לא רשמי)` },

  { id:'w14', set:'workbook', topic:'group', schema:'practice', check:'select',
    prompt:`תרגיל 14: כתוב שאילתה שמייצרת דוח עבור כל הסטודנטים, גם כאלה שאין להם הרשמות — שורה אחת לכל סטודנט, עם העמודות בסדר: Student Name, City, Number Of Courses, Average Grade, Best Grade, Worst Grade, Performance, Total Course Cost. Performance: אין קורסים → 'Not Enrolled'; ממוצע 90 ומעלה → 'Excellent'; 80 ומעלה → 'Very Good'; 70 ומעלה → 'Good'; 60 ומעלה → 'Pass'; אחרת → 'Fail'. Average Grade — ממוצע עשרוני עם 2 ספרות אחרי הנקודה (CAST ל-DECIMAL(5,2)). לסטודנט בלי קורסים: Number Of Courses = 0 ו-Total Course Cost = 0 (לא NULL); הממוצע והציון הטוב/הגרוע — NULL. חובה: LEFT JOIN, CASE, CAST, GROUP BY. אסור: RIGHT JOIN ו-subquery. מיון: קודם לפי Performance (סדר א-ב), ואחר כך לפי Average Grade בסדר יורד.`,
    solution:`SELECT s.name AS [Student Name],
       s.city AS City,
       COUNT(e.course_id) AS [Number Of Courses],
       CAST(AVG(CAST(e.grade AS DECIMAL(5,2))) AS DECIMAL(5,2)) AS [Average Grade],
       MAX(e.grade) AS [Best Grade],
       MIN(e.grade) AS [Worst Grade],
       CASE
         WHEN COUNT(e.course_id) = 0 THEN 'Not Enrolled'
         WHEN AVG(CAST(e.grade AS DECIMAL(5,2))) >= 90 THEN 'Excellent'
         WHEN AVG(CAST(e.grade AS DECIMAL(5,2))) >= 80 THEN 'Very Good'
         WHEN AVG(CAST(e.grade AS DECIMAL(5,2))) >= 70 THEN 'Good'
         WHEN AVG(CAST(e.grade AS DECIMAL(5,2))) >= 60 THEN 'Pass'
         ELSE 'Fail'
       END AS Performance,
       ISNULL(SUM(c.price), 0) AS [Total Course Cost]
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses c ON c.course_id = e.course_id
GROUP BY s.student_id, s.name, s.city
ORDER BY Performance, [Average Grade] DESC;`,
    alt:[`SELECT s.name, s.city,
       COUNT(e.enrollment_id),
       CAST(AVG(e.grade * 1.0) AS DECIMAL(5,2)) AS avg_grade,
       MAX(e.grade), MIN(e.grade),
       CASE
         WHEN AVG(e.grade * 1.0) IS NULL THEN 'Not Enrolled'
         WHEN AVG(e.grade * 1.0) >= 90 THEN 'Excellent'
         WHEN AVG(e.grade * 1.0) >= 80 THEN 'Very Good'
         WHEN AVG(e.grade * 1.0) >= 70 THEN 'Good'
         WHEN AVG(e.grade * 1.0) >= 60 THEN 'Pass'
         ELSE 'Fail'
       END AS performance,
       ISNULL(SUM(c.price), 0)
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses c ON c.course_id = e.course_id
GROUP BY s.student_id, s.name, s.city
ORDER BY performance, avg_grade DESC;`],
    hint:`GROUP BY s.student_id, s.name, s.city. ספרו COUNT(e.course_id) — לא COUNT(*). ב-CASE בדקו קודם את 'Not Enrolled'. ל-Total Course Cost: ISNULL(SUM(c.price), 0). שמות עם רווחים — בסוגריים מרובעים [ ].`,
    explain:`הסדר הצפוי: Noa (Excellent, 91.00), Tom (Fail, 55.00), Dana (Not Enrolled), Ron (Pass, 68.00), Dan (Very Good, 88.50), Maya (Very Good, 83.50). המלכודות: (1) COUNT(*) סופר גם את השורה "הריקה" שה-LEFT JOIN יוצר ל-Dana ויחזיר 1 — COUNT(e.course_id) מתעלם מ-NULL ומחזיר 0. (2) ב-SQL Server, AVG על עמודת INT מחזיר מספר שלם: AVG(grade) של Dan = 88 ולא 88.5 — לכן ממירים את הציון ל-DECIMAL לפני הממוצע, וה-CAST החיצוני מעגל ל-2 ספרות אחרי הנקודה. במנוע שבדפדפן (SQLite) AVG כבר מחזיר 88.5, כך שהבודק לא יתפוס את הטעות הזו — אבל במבחן היא קריטית. (3) SUM על NULL בלבד מחזיר NULL — ISNULL(…, 0) הופך ל-0. (4) ב-ORDER BY מותר להשתמש בכינוי עמודה (Performance, [Average Grade]) כי הוא רץ אחרי ה-SELECT; ב-WHERE / GROUP BY / HAVING אסור. (5) בתוך Very Good, Dan (88.5) לפני Maya (83.5) בגלל DESC. (6) אין subquery ואין RIGHT JOIN — רק LEFT JOIN מ-Students.`,
    source:`חוברת JOIN — תרגיל 14 (פתרון לא רשמי)` },

/* =====================================================================
   2) חייזרים וחלליות (space) — תרגול מעבדה (מצגת 4) + 14 התרגילים של מצגת 6
      Aliens(id_no, aname, no_of_legs, diet) · Ships(s_no, sname, no_of_seats, max_speed)
      Planets(p_no, pname, constellation, population) · Trips(t_no, s_no, p_no, d_date, results)
      Aliens_in_trips(t_no, id_no)
   ===================================================================== */
  { id:'sl1', set:'space', topic:'select', schema:'space', check:'select',
    prompt:`הציגו את כל הנתונים (כל העמודות) על כל החייזרים.`,
    solution:`SELECT * FROM Aliens;`,
    alt:[`SELECT id_no, aname, no_of_legs, diet FROM Aliens;`],
    hint:`* פירושו "כל העמודות".`,
    explain:`SELECT * מחזיר את כל העמודות לפי הסדר שבו הוגדרו בטבלה: id_no, aname, no_of_legs, diet — 7 חייזרים. SELECT ו-FROM הם חובה; WHERE אופציונלי.`,
    source:`מצגת 4 — תרגול מעבדה` },

  { id:'sl2', set:'space', topic:'where', schema:'space', check:'select',
    prompt:`הציגו את התזונה (diet) של החייזרים בעלי 2 רגליים — שורה לכל חייזר (בלי DISTINCT). עמודה: diet.`,
    solution:`SELECT diet
FROM Aliens
WHERE no_of_legs = 2;`,
    hint:`WHERE על no_of_legs, ובחירה של עמודה אחת בלבד.`,
    explain:`4 שורות: Vegetarian, Jews, Bad Guys, Vegetarian — Vegetarian מופיע פעמיים (E.T. ו-Cher). אם השאלה הייתה "סוגי התזונה השונים", היינו מוסיפים DISTINCT ומקבלים 3 שורות.`,
    source:`מצגת 4 — תרגול מעבדה` },

  { id:'sl3', set:'space', topic:'where', schema:'space', check:'select',
    prompt:`הציגו את שמות החלליות ואת מספר המושבים שלהן, עבור חלליות שמהירותן המרבית מעל 60 ויש בהן לפחות 5 מושבים. עמודות בסדר: sname, no_of_seats.`,
    solution:`SELECT sname, no_of_seats
FROM Ships
WHERE max_speed > 60 AND no_of_seats >= 5;`,
    hint:`שני תנאים מחוברים ב-AND. "מעל" = >, "לפחות" = >=.`,
    explain:`התוצאה: Titanic (8), Altalena (12). x-sodus נופלת כי המהירות שלה בדיוק 60 — לא "מעל 60". Enterprise נופלת כי יש בה רק 4 מושבים.`,
    source:`מצגת 4 — תרגול מעבדה` },

  { id:'sl4', set:'space', topic:'where', schema:'space', check:'select',
    prompt:`הציגו את שמות כוכבי הלכת ואת האוכלוסייה שלהם, עבור כוכבים שהאוכלוסייה בהם גדולה מ-20,000,000. עמודות בסדר: pname, population.`,
    solution:`SELECT pname, population
FROM Planets
WHERE population > 20000000;`,
    hint:`מספרים כותבים ב-SQL בלי פסיקי אלפים: 20000000.`,
    explain:`התוצאה: Alpha Centaury (31,000,000) ו-Pluto (200,000,000). 20,000,000 עם פסיקים הוא שגיאה ב-SQL — הפסיק מפריד בין ביטויים.`,
    source:`מצגת 4 — תרגול מעבדה (מותאם לנתונים)` },

  { id:'sl5', set:'space', topic:'where', schema:'space', check:'select',
    prompt:`הציגו את תאריכי המסעות לכוכב לכת מספר 2 או מספר 3. עמודה: d_date.`,
    solution:`SELECT d_date
FROM Trips
WHERE p_no = 2 OR p_no = 3;`,
    alt:[`SELECT d_date FROM Trips WHERE p_no IN (2, 3);`],
    hint:`שני תנאים עם OR, או בקיצור IN (2, 3).`,
    explain:`3 מסעות: 2002-01-05 (לכוכב 3), 2004-04-14 ו-2002-06-06 (לכוכב 2). טעות קלאסית: WHERE p_no = 2 OR 3 — ב-SQL Server זו שגיאת תחביר, כי צד ימין של OR חייב להיות תנאי מלא (p_no = 3).`,
    source:`מצגת 4 — תרגול מעבדה` },

  { id:'sl6', set:'space', topic:'select', schema:'space', check:'select',
    prompt:`הציגו את מספרי הרגליים השונים של החייזרים, ללא כפילויות. עמודה: no_of_legs.`,
    solution:`SELECT DISTINCT no_of_legs FROM Aliens;`,
    hint:`DISTINCT מיד אחרי SELECT מסיר שורות כפולות.`,
    explain:`4 ערכים: 2, 12, 13, 4. בלי DISTINCT היינו מקבלים 7 שורות (2 חוזר ארבע פעמים). DISTINCT פועל על כל השורה — אם נבחר שתי עמודות, הוא יסיר רק צירופים שחוזרים במלואם.`,
    source:`מצגת 4 — תרגול מעבדה` },

  { id:'sl7', set:'space', topic:'dml', schema:'space', check:'mutate', mutateTable:'Ships',
    prompt:`עדכנו את המהירות המרבית של החללית x-sodus ל-80.`,
    solution:`UPDATE Ships
SET max_speed = 80
WHERE sname = 'x-sodus';`,
    alt:[`UPDATE Ships SET max_speed = 80 WHERE s_no = 4;`],
    hint:`UPDATE … SET … WHERE. טקסט במירכאות בודדות.`,
    explain:`רק השורה של x-sodus משתנה. UPDATE בלי WHERE היה מעדכן את כל החלליות ל-80 — "שורש לאסונות", כמו שכתוב במצגת 3. עדיף לזהות שורה לפי המפתח הראשי (s_no = 4), כי שם עלול לחזור.`,
    source:`מצגת 4 — תרגול מעבדה` },

  { id:'sl8', set:'space', topic:'dml', schema:'space', check:'mutate', mutateTable:'Ships',
    prompt:`מחקו מטבלת Ships את החללית שמספרה 4.`,
    solution:`DELETE FROM Ships
WHERE s_no = 4;`,
    alt:[`DELETE Ships WHERE s_no = 4;`, `DELETE FROM Ships WHERE sname = 'x-sodus';`],
    hint:`DELETE FROM … WHERE — התנאי קובע אילו שורות יימחקו.`,
    explain:`נשארות 4 חלליות. שימו לב למלכודת שלמות הנתונים: בטבלה Trips יש מסע (t_no = 4) שמפנה ל-s_no = 4 דרך מפתח זר. במנוע שבדפדפן אכיפת FK כבויה ולכן המחיקה עוברת, אבל ב-SQL Server עם ה-REFERENCES מהסכמה הפקודה תיכשל ("The DELETE statement conflicted with the REFERENCE constraint") — ברירת המחדל היא NO ACTION / RESTRICT. הפתרונות (מצגת 2): למחוק קודם את השורות התלויות (Aliens_in_trips של מסע 4, ואז המסע עצמו), או להגדיר את ה-FK עם ON DELETE CASCADE / SET NULL. DELETE בלי WHERE מוחק את כל השורות, אבל הטבלה עצמה נשארת (בניגוד ל-DROP TABLE).`,
    source:`מצגת 4 — תרגול מעבדה` },

  { id:'sl9', set:'space', topic:'ddl', schema:'space', check:'mutate', mutateTable:'Aliens',
    prompt:`הוסיפו לטבלת Aliens עמודה חדשה בשם birth_date מסוג DATE.`,
    solution:`ALTER TABLE Aliens ADD birth_date DATE;`,
    hint:`ALTER TABLE שם_טבלה ADD שם_עמודה סוג.`,
    explain:`העמודה נוספת בסוף הטבלה, ובכל השורות הקיימות הערך שלה NULL. ב-T-SQL כותבים ADD בלי המילה COLUMN (ALTER TABLE … ADD COLUMN היא שגיאה ב-SQL Server, למרות שבמנועים אחרים היא חוקית). להסרה: ALTER TABLE Aliens DROP COLUMN birth_date.`,
    source:`מצגת 4 — תרגול מעבדה` },

  { id:'s3q1', set:'space', topic:'join', schema:'space', check:'select',
    prompt:`שלפו עבור כל מסע את תאריך המסע ואת שם כוכב הלכת. עמודות בסדר: d_date, pname.`,
    solution:`SELECT T.d_date, P.pname
FROM Trips T
JOIN Planets P ON T.p_no = P.p_no;`,
    alt:[`SELECT T.d_date, P.pname
FROM Trips T, Planets P
WHERE T.p_no = P.p_no;`],
    hint:`Trips.p_no הוא מפתח זר ל-Planets — מחברים לפיו.`,
    explain:`7 שורות, אחת לכל מסע. התבנית בשקף 3 של מצגת 6 משתמשת ברשימת טבלאות עם פסיקים ב-FROM ותנאי החיבור ב-WHERE (החלופה) — זה שקול ל-JOIN … ON. אם שוכחים את תנאי החיבור בצורה עם הפסיקים, מקבלים מכפלה קרטזית: 7 × 5 = 35 שורות (לא במקרה יש בצי חללית בשם Cartesian-product).`,
    source:`מצגת 6 — Join Types, שאלה 1 (פתרון לא רשמי)` },

  { id:'s3q2', set:'space', topic:'join', schema:'space', check:'select',
    prompt:`שלפו עבור כל מסע את תאריך המסע, שם כוכב הלכת ושם ספינת החלל. עמודות בסדר: d_date, pname, sname.`,
    solution:`SELECT T.d_date, P.pname, S.sname
FROM Trips T
JOIN Planets P ON T.p_no = P.p_no
JOIN Ships S ON T.s_no = S.s_no;`,
    alt:[`SELECT T.d_date, P.pname, S.sname
FROM Trips T, Planets P, Ships S
WHERE T.p_no = P.p_no AND T.s_no = S.s_no;`],
    hint:`Trips מחזיקה שני מפתחות זרים: p_no ל-Planets ו-s_no ל-Ships — שני JOIN.`,
    explain:`7 שורות. החלליות לפי סדר המסעות: Enterprise, Titanic, Altalena, x-sodus, Enterprise, Cartesian-product, Titanic. כל JOIN נוסף דורש תנאי חיבור משלו; n טבלאות → לפחות n-1 תנאי חיבור.`,
    source:`מצגת 6 — Join Types, שאלה 2 (פתרון לא רשמי)` },

  { id:'s3q3', set:'space', topic:'join', schema:'space', check:'select',
    prompt:`שלפו את שמות החייזרים שהשתתפו במסע לפני שנת 2000 (כל שם פעם אחת). עמודה: aname.`,
    solution:`SELECT DISTINCT A.aname
FROM Aliens A
JOIN Aliens_in_trips AIT ON A.id_no = AIT.id_no
JOIN Trips T ON AIT.t_no = T.t_no
WHERE YEAR(T.d_date) < 2000;`,
    alt:[`SELECT DISTINCT A.aname
FROM Aliens A
JOIN Aliens_in_trips AIT ON A.id_no = AIT.id_no
JOIN Trips T ON AIT.t_no = T.t_no
WHERE T.d_date < '2000-01-01';`,
`SELECT DISTINCT A.aname
FROM Aliens A, Aliens_in_trips AIT, Trips T
WHERE A.id_no = AIT.id_no AND AIT.t_no = T.t_no AND YEAR(T.d_date) < 2000;`],
    hint:`הקשר חייזר↔מסע עובר דרך טבלת הקישור Aliens_in_trips. לסינון לפי שנה: YEAR(d_date) < 2000.`,
    explain:`5 שמות: E.T., Bin-Laden, B.A., Bill Gates, Spoc’s dog — כולם ממסעות 5 ו-6 בשנת 1800. Aliens_in_trips היא טבלת קישור (רבים-לרבים), ולכן אי אפשר להגיע מחייזר למסע בלי לעבור דרכה. DISTINCT נחוץ משום שחייזר שהשתתף בשני מסעות כאלה היה מופיע פעמיים (בנתונים האלה זה לא קורה, אבל זו דרישת השאלה). YEAR() היא פונקציית T-SQL; לחלופין משווים לתאריך '2000-01-01'.`,
    source:`מצגת 6 — Join Types, שאלה 3 (פתרון לא רשמי)` },

  { id:'s4q1', set:'space', topic:'outer', schema:'space', check:'select',
    prompt:`הציגו את כל כוכבי הלכת ואת כל הטיולים שבוצעו אליהם. יש להציג גם כוכבי לכת שלא היה אליהם אף טיול. עמודות בסדר: pname, t_no, d_date.`,
    solution:`SELECT P.pname, T.t_no, T.d_date
FROM Planets P
LEFT JOIN Trips T ON P.p_no = T.p_no;`,
    alt:[`SELECT P.pname, T.t_no, T.d_date
FROM Trips T
RIGHT JOIN Planets P ON P.p_no = T.p_no;`],
    hint:`"גם כוכבים שלא היה אליהם טיול" → OUTER JOIN שבו Planets היא הטבלה שנשמרת.`,
    explain:`7 שורות ובלי אף NULL — בנתונים האלה לכל כוכב לכת היה לפחות מסע אחד, ולכן LEFT JOIN ו-INNER JOIN נותנים כאן אותה תוצאה. ההבדל מתגלה בשאלה הבאה, כשמוסיפים תנאי על התאריך.`,
    source:`מצגת 6 — OUTER Join Types, שאלה 1 (פתרון לא רשמי)` },

  { id:'s4q2', set:'space', topic:'outer', schema:'space', check:'select',
    prompt:`הציגו את כל כוכבי הלכת ואת כל הטיולים שבוצעו אליהם משנת 2004 ואילך. יש להציג גם כוכבי לכת שלא היה אליהם אף טיול משנת 2004 ואילך. עמודות בסדר: pname, t_no, d_date.`,
    solution:`SELECT P.pname, T.t_no, T.d_date
FROM Planets P
LEFT JOIN Trips T ON P.p_no = T.p_no
                 AND YEAR(T.d_date) >= 2004;`,
    alt:[`SELECT P.pname, T.t_no, T.d_date
FROM Planets P
LEFT JOIN Trips T ON P.p_no = T.p_no AND T.d_date >= '2004-01-01';`,
`SELECT P.pname, T.t_no, T.d_date
FROM Trips T
RIGHT JOIN Planets P ON P.p_no = T.p_no AND YEAR(T.d_date) >= 2004;`],
    hint:`תנאי התאריך חייב להיכנס לתוך ה-ON של ה-LEFT JOIN, לא ל-WHERE.`,
    explain:`5 שורות: Naren NULL, Alpha Centaury מסע 3, Pluto NULL, K-PAX מסע 4, London NULL. אם כותבים WHERE YEAR(T.d_date) >= 2004, הכוכבים בלי מסע מתאים מקבלים NULL בתאריך, YEAR(NULL) >= 2004 אינו TRUE, והם נעלמים — מתקבלות רק 2 שורות, כמו ב-INNER JOIN. זו בדיוק המלכודת של תרגיל 13 בחוברת.`,
    source:`מצגת 6 — OUTER Join Types, שאלה 2 (פתרון לא רשמי)` },

  { id:'s5q1', set:'space', topic:'group', schema:'space', check:'select',
    prompt:`מצאו את המהירות המרבית של כלל חלליות הצי הגלקטי. עמודה אחת (max_speed).`,
    solution:`SELECT MAX(max_speed) AS max_speed FROM Ships;`,
    hint:`פונקציית צבירה MAX על כל הטבלה — בלי GROUP BY.`,
    explain:`התוצאה: 150. פונקציית צבירה בלי GROUP BY מסכמת את כל הטבלה לשורה אחת. אי אפשר להוסיף כאן sname לצד MAX בלי GROUP BY (שגיאה ב-SQL Server); כדי לקבל גם את שם החללית המהירה צריך תת-שאילתה — ראו מצגת 6, Nested Queries שאלה 3.`,
    source:`מצגת 6 — Aggregation, שאלה 1 (פתרון לא רשמי)` },

  { id:'s5q2', set:'space', topic:'group', schema:'space', check:'select',
    prompt:`מצאו את האוכלוסייה הממוצעת בכוכבי הלכת של כל מערכת שמש (constellation). עמודות בסדר: constellation, avg_population.`,
    solution:`SELECT constellation, AVG(population) AS avg_population
FROM Planets
GROUP BY constellation;`,
    hint:`"לכל מערכת שמש" → GROUP BY constellation, ו-AVG על population.`,
    explain:`Klingonia 6,000,000 · Milkyway 106,000,000 · Uraion 20,500,000. כל עמודה ב-SELECT שאינה בתוך פונקציית צבירה חייבת להופיע ב-GROUP BY. שימו לב: ב-SQL Server, AVG על עמודת INT מחזיר INT (חותך את השבר); כאן הממוצעים יוצאים שלמים ממילא. אם צריך שבר — AVG(population * 1.0) או AVG(CAST(population AS FLOAT)).`,
    source:`מצגת 6 — Aggregation, שאלה 2 (פתרון לא רשמי)` },

  { id:'s5q3', set:'space', topic:'group', schema:'space', check:'select',
    prompt:`מצאו עבור כל חייזר, כמה פעמים ביקר בכל כוכב לכת. עמודות בסדר: aname, pname, visits.`,
    solution:`SELECT A.aname, P.pname, COUNT(*) AS visits
FROM Aliens A
JOIN Aliens_in_trips AIT ON A.id_no = AIT.id_no
JOIN Trips T ON AIT.t_no = T.t_no
JOIN Planets P ON T.p_no = P.p_no
GROUP BY A.id_no, A.aname, P.p_no, P.pname;`,
    alt:[`SELECT A.aname, P.pname, COUNT(AIT.t_no) AS visits
FROM Aliens A, Aliens_in_trips AIT, Trips T, Planets P
WHERE A.id_no = AIT.id_no AND AIT.t_no = T.t_no AND T.p_no = P.p_no
GROUP BY A.id_no, A.aname, P.p_no, P.pname;`],
    hint:`חיבור של 4 טבלאות: Aliens → Aliens_in_trips → Trips → Planets, וקיבוץ לפי זוג (חייזר, כוכב).`,
    explain:`16 שורות, ובכולן visits = 1 — אף חייזר לא ביקר פעמיים באותו כוכב. מקבצים לפי שני "ממדים" יחד (חייזר וכוכב), ולכן GROUP BY כולל את שניהם. כדאי לקבץ גם לפי המפתחות (id_no, p_no) ולא רק לפי השמות — כך שני חייזרים עם אותו שם לא יתמזגו לקבוצה אחת. מופיעים רק צירופים שקרו בפועל (INNER JOIN).`,
    source:`מצגת 6 — Aggregation, שאלה 3 (פתרון לא רשמי)` },

  { id:'s6q1', set:'space', topic:'group', schema:'space', check:'select',
    prompt:`מצאו את שמות כל החייזרים שהשתתפו ביותר משני מסעות. עמודה: aname.`,
    solution:`SELECT A.aname
FROM Aliens A
JOIN Aliens_in_trips AIT ON A.id_no = AIT.id_no
GROUP BY A.id_no, A.aname
HAVING COUNT(*) > 2;`,
    alt:[`SELECT A.aname
FROM Aliens A, Aliens_in_trips AIT
WHERE A.id_no = AIT.id_no
GROUP BY A.id_no, A.aname
HAVING COUNT(AIT.t_no) > 2;`],
    hint:`סופרים מסעות לכל חייזר (GROUP BY), ומסננים קבוצות עם HAVING COUNT(*) > 2.`,
    explain:`התוצאה: Bin-Laden (4 מסעות) ו-Buck Rogers (3). ספירות כל החייזרים: E.T. 2, Bin-Laden 4, B.A. 2, Buck Rogers 3, Bill Gates 2, Spoc’s dog 2, Cher 1. תנאי על תוצאת צבירה נכתב ב-HAVING (אחרי GROUP BY) — WHERE COUNT(*) > 2 היא שגיאה, כי WHERE רץ לפני הקיבוץ. "יותר משני" = > 2.`,
    source:`מצגת 6 — Aggregation (Having), שאלה 1 (פתרון לא רשמי)` },

  { id:'s6q2', set:'space', topic:'group', schema:'space', check:'select',
    prompt:`מצאו עבור כל כוכב לכת את מספר הרגליים שדרכו עליו (סכום no_of_legs של כל החייזרים בכל המסעות אליו), במידה והיו יותר מ-15. עמודות בסדר: pname, total_legs.`,
    solution:`SELECT P.pname, SUM(A.no_of_legs) AS total_legs
FROM Planets P
JOIN Trips T ON P.p_no = T.p_no
JOIN Aliens_in_trips AIT ON T.t_no = AIT.t_no
JOIN Aliens A ON AIT.id_no = A.id_no
GROUP BY P.p_no, P.pname
HAVING SUM(A.no_of_legs) > 15;`,
    hint:`מכוכב לכת מגיעים לחייזרים דרך Trips ו-Aliens_in_trips. SUM על no_of_legs, ותנאי ב-HAVING.`,
    explain:`התוצאה: Alpha Centaury 33, London 23. הסכומים לכל הכוכבים: Pluto 14, Naren 4, Alpha Centaury 33, K-PAX 14, London 23. "במידה והיו יותר מ-15" הוא תנאי על הסכום — ולכן HAVING SUM(...) > 15 ולא WHERE.`,
    source:`מצגת 6 — Aggregation (Having), שאלה 2 (פתרון לא רשמי)` },

  { id:'s7q1', set:'space', topic:'nested', schema:'space', check:'select',
    prompt:`שלפו את שמות החלליות ואת המהירות המקסימלית שלהן, רק של חלליות שהמהירות המקסימלית שלהן היא מעל הממוצע. עמודות בסדר: sname, max_speed.`,
    solution:`SELECT sname, max_speed
FROM Ships
WHERE max_speed > (SELECT AVG(max_speed) FROM Ships);`,
    hint:`את הממוצע מחשבים בתת-שאילתה בתוך ה-WHERE.`,
    explain:`הממוצע הוא 90, והתוצאה: Enterprise 120, Titanic 150. אי אפשר לכתוב WHERE max_speed > AVG(max_speed) — פונקציית צבירה לא מותרת ב-WHERE. תת-שאילתה שמחזירה ערך יחיד (סקלרית) אפשר להשוות אליה עם > = <.`,
    source:`מצגת 6 — Nested Queries, שאלה 1 (פתרון לא רשמי)` },

  { id:'s7q2', set:'space', topic:'nested', schema:'space', check:'select',
    prompt:`שלפו את שמות החייזרים — רק של חייזרים שמספר הרגליים שלהם שווה למספר הרגליים המינימלי. עמודה: aname.`,
    solution:`SELECT aname
FROM Aliens
WHERE no_of_legs = (SELECT MIN(no_of_legs) FROM Aliens);`,
    hint:`MIN בתת-שאילתה, והשוואה עם =.`,
    explain:`המינימום הוא 2, והתוצאה: E.T., Bin-Laden, B.A., Cher. היתרון של תת-שאילתה על פני TOP 1 … ORDER BY: היא מחזירה את כל מי שבתיקו (כאן ארבעה חייזרים), בעוד TOP 1 היה מחזיר רק אחד. ב-SQL Server אפשר גם WHERE no_of_legs <= ALL (SELECT no_of_legs FROM Aliens) — אבל המנוע שבדפדפן לא מכיר ALL, ולכן כתבו כאן עם MIN.`,
    source:`מצגת 6 — Nested Queries, שאלה 2 (פתרון לא רשמי)` },

  { id:'s7q3', set:'space', topic:'nested', schema:'space', check:'select',
    prompt:`שלפו את שם החללית ואת שמות הכוכבים שבהם ביקרה החללית בעלת המהירות המקסימלית. עמודות בסדר: sname, pname.`,
    solution:`SELECT S.sname, P.pname
FROM Ships S
JOIN Trips T ON S.s_no = T.s_no
JOIN Planets P ON T.p_no = P.p_no
WHERE S.max_speed = (SELECT MAX(max_speed) FROM Ships);`,
    alt:[`SELECT S.sname, P.pname
FROM Ships S
JOIN Trips T ON S.s_no = T.s_no
JOIN Planets P ON T.p_no = P.p_no
WHERE S.s_no IN (SELECT s_no FROM Ships WHERE max_speed = (SELECT MAX(max_speed) FROM Ships));`],
    hint:`JOIN של Ships, Trips ו-Planets, ובתנאי: max_speed = (SELECT MAX(max_speed) FROM Ships).`,
    explain:`החללית המהירה היא Titanic (150), והיא ביקרה ב-Naren (מסע 2) וב-Alpha Centaury (מסע 7). משלבים JOIN רגיל עם תת-שאילתה ב-WHERE.`,
    source:`מצגת 6 — Nested Queries, שאלה 3 (פתרון לא רשמי)` },

  { id:'s7q4', set:'space', topic:'nested', schema:'space', check:'select',
    prompt:`שלפו את שם הכוכב "הכי צפוף" ואת שמות החלליות שביקרו בו. (אין בטבלה עמודת שטח, ולכן "הכי צפוף" = הכוכב עם האוכלוסייה הגדולה ביותר.) עמודות בסדר: pname, sname.`,
    solution:`SELECT P.pname, S.sname
FROM Planets P
JOIN Trips T ON P.p_no = T.p_no
JOIN Ships S ON T.s_no = S.s_no
WHERE P.population = (SELECT MAX(population) FROM Planets);`,
    hint:`MAX(population) בתת-שאילתה, ו-JOIN מ-Planets דרך Trips אל Ships.`,
    explain:`הכוכב עם האוכלוסייה הגדולה ביותר הוא Pluto (200,000,000), ורק Enterprise ביקרה בו (מסע 1). הניסוח "הכי צפוף" בשקף הוא בפועל "הכי מאוכלס" — אין בטבלה עמודת שטח לחישוב צפיפות. ב-SQL Server אפשר גם WHERE P.p_no = (SELECT TOP 1 p_no FROM Planets ORDER BY population DESC), אבל זה מחזיר כוכב אחד בלבד גם אם יש תיקו במקום הראשון — ההשוואה ל-MAX עדיפה. (המנוע בדפדפן לא תומך ב-TOP בתוך תת-שאילתה, אלא רק בתחילת השאילתה הראשית.)`,
    source:`מצגת 6 — Nested Queries, שאלה 4 (פתרון לא רשמי)` },

/* =====================================================================
   3) מערכת המכללה (college2) — צד ה-SQL של "עבודת ישור קו" ושל עבודת ה-MongoDB
      students(id, firstName, lastName, email, phone, city, age, registrationYear)
      lecturers(id, firstName, lastName, department, seniority)
      courses(id, courseName, credits, department, lecturerId)
      enrollments(id, studentId, courseId, enrollmentDate, status)
      assignments(id, courseId, title, maxGrade, dueDate)
      submissions(id, studentId, assignmentId, courseId, grade, submissionDate, status)
   ===================================================================== */
  { id:'c1', set:'college2', topic:'where', schema:'college2', check:'select',
    prompt:`הציגו את הסטודנטים שגרים ב-Tel Aviv או ב-Haifa ושגילם בין 21 ל-25 (כולל), ממוינים לפי גיל בסדר יורד. עמודות בסדר: firstName, lastName, city, age.`,
    solution:`SELECT firstName, lastName, city, age
FROM students
WHERE city IN ('Tel Aviv', 'Haifa') AND age BETWEEN 21 AND 25
ORDER BY age DESC;`,
    alt:[`SELECT firstName, lastName, city, age
FROM students
WHERE (city = 'Tel Aviv' OR city = 'Haifa') AND age >= 21 AND age <= 25
ORDER BY age DESC;`],
    hint:`IN לרשימת ערים, BETWEEN לטווח הגילאים (כולל הקצוות), ORDER BY age DESC.`,
    explain:`התוצאה: David (23), Maya (22), Noa (21). Itai (27) ו-Shira (20) מחוץ לטווח. מלכודת סוגריים: WHERE city = 'Tel Aviv' OR city = 'Haifa' AND age BETWEEN 21 AND 25 בלי סוגריים מתפרש כ-Tel Aviv OR (Haifa AND גיל) — כי AND קודם ל-OR — ואז Itai בן ה-27 נכנס בטעות (בדיוק הדוגמה של "Where (Age >18) and ((Active=1) OR (Group = B))" ממצגת 3).`,
    source:`תרגול נוסף — מערכת המכללה` },

  { id:'c2', set:'college2', topic:'where', schema:'college2', check:'select',
    prompt:`הציגו את הסטודנטים שמספר הטלפון שלהם מתחיל ב-050. עמודות בסדר: firstName, lastName, phone.`,
    solution:`SELECT firstName, lastName, phone
FROM students
WHERE phone LIKE '050%';`,
    hint:`LIKE עם % — "כל רצף תווים" אחרי הקידומת.`,
    explain:`התוצאה: David (0501234567), Shira (0505555555). % מחליף רצף באורך כלשהו (גם 0), ו-_ מחליף תו בודד. ב-T-SQL אפשר גם מחלקות תווים כמו '[0-9]' (כמו ב-CHECK של המיקוד במצגת 3). phone הוא VARCHAR — אילו היה מספר, האפס המוביל היה נעלם, ולכן טלפונים שומרים כטקסט.`,
    source:`תרגול נוסף — מערכת המכללה` },

  { id:'c3', set:'college2', topic:'join', schema:'college2', check:'select',
    prompt:`הציגו את שמות כל הסטודנטים, שמות הקורסים שאליהם הם רשומים ותאריך ההרשמה — הרשמות פעילות בלבד (status = 'Active'). עמודות בסדר: firstName, lastName, courseName, enrollmentDate.`,
    solution:`SELECT s.firstName, s.lastName, c.courseName, e.enrollmentDate
FROM students s
JOIN enrollments e ON s.id = e.studentId
JOIN courses c ON c.id = e.courseId
WHERE e.status = 'Active';`,
    alt:[`SELECT s.firstName, s.lastName, c.courseName, e.enrollmentDate
FROM enrollments e
INNER JOIN students s ON s.id = e.studentId
INNER JOIN courses c ON c.id = e.courseId
WHERE e.status = 'Active';`],
    hint:`enrollments היא טבלת הגשר בין students ל-courses. אל תשכחו את הסינון WHERE e.status = 'Active'.`,
    explain:`13 שורות — 15 ההרשמות פחות שתיים שאינן פעילות (Noa ב-Marketing ו-Eyal ב-Statistics). הטעות הנפוצה בשאלה הזו היא לשכוח את סינון הסטטוס. כאן ה-PK בכל טבלה הוא id, והמפתחות הזרים הם studentId / courseId — מחברים s.id = e.studentId ולא s.studentId.`,
    source:`עבודת ישור קו — שאלה 1 (צד ה-SQL)` },

  { id:'c4', set:'college2', topic:'join', schema:'college2', check:'select',
    prompt:`הציגו את כל ההרשמות (כולל הלא-פעילות) עם השם המלא של הסטודנט (שם פרטי, רווח, שם משפחה — בעמודה אחת), שם הקורס ותאריך ההרשמה. עמודות בסדר: studentName, courseName, enrollmentDate.`,
    solution:`SELECT s.firstName + ' ' + s.lastName AS studentName,
       c.courseName,
       e.enrollmentDate
FROM enrollments e
JOIN students s ON s.id = e.studentId
JOIN courses c ON c.id = e.courseId;`,
    alt:[`SELECT CONCAT(s.firstName, ' ', s.lastName) AS studentName, c.courseName, e.enrollmentDate
FROM enrollments e
JOIN students s ON s.id = e.studentId
JOIN courses c ON c.id = e.courseId;`],
    hint:`שרשור מחרוזות ב-T-SQL: s.firstName + ' ' + s.lastName.`,
    explain:`15 שורות. ב-SQL Server משרשרים טקסט עם + (או עם CONCAT). זהירות: + עם NULL מחזיר NULL לכל הביטוי, ו-+ בין מספר לטקסט ינסה חיבור חשבוני — לכן ממירים קודם עם CAST (כמו CAST(CustomerID AS VARCHAR(10)) + ' - ' + CustomerName במצגת 3). זה המקביל ל-$concat במונגו.`,
    source:`עבודת MongoDB — תרגילים 11–12 (בגרסת SQL)` },

  { id:'c5', set:'college2', topic:'outer', schema:'college2', check:'select',
    prompt:`מצאו את כל הסטודנטים שאין להם אפילו הרשמה אחת לקורס (גם לא הרשמה לא-פעילה). עמודות בסדר: id, firstName, lastName.`,
    solution:`SELECT s.id, s.firstName, s.lastName
FROM students s
LEFT JOIN enrollments e ON s.id = e.studentId
WHERE e.id IS NULL;`,
    alt:[`SELECT s.id, s.firstName, s.lastName
FROM students s
WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.studentId = s.id);`,
`SELECT id, firstName, lastName
FROM students
WHERE id NOT IN (SELECT studentId FROM enrollments);`],
    hint:`anti-join: LEFT JOIN מ-students ל-enrollments, ו-WHERE e.id IS NULL.`,
    explain:`התוצאה: Lior Shalom (id 10) בלבד. Eyal לא מופיע — יש לו הרשמה, גם אם היא Inactive. במונגו המקבילה היא $lookup ואז $match על מערך ריק ({ $size: 0 }). שלוש הדרכים ב-SQL שקולות כאן; NOT EXISTS הכי בטוחה כשיש NULL-ים בעמודה שבתת-השאילתה.`,
    source:`עבודת ישור קו — שאלה 2 · עבודת MongoDB — תרגיל 10 (צד ה-SQL)` },

  { id:'c6', set:'college2', topic:'outer', schema:'college2', check:'select',
    prompt:`מצאו את הסטודנטים שאין להם אף הרשמה פעילה (status = 'Active') — כולל מי שאין לו הרשמות בכלל. עמודות בסדר: id, firstName, lastName.`,
    solution:`SELECT s.id, s.firstName, s.lastName
FROM students s
LEFT JOIN enrollments e ON s.id = e.studentId AND e.status = 'Active'
WHERE e.id IS NULL;`,
    alt:[`SELECT s.id, s.firstName, s.lastName
FROM students s
WHERE NOT EXISTS (SELECT 1 FROM enrollments e
                  WHERE e.studentId = s.id AND e.status = 'Active');`,
`SELECT id, firstName, lastName
FROM students
WHERE id NOT IN (SELECT studentId FROM enrollments WHERE status = 'Active');`],
    hint:`את תנאי הסטטוס שמים בתוך ה-ON של ה-LEFT JOIN, ואז WHERE e.id IS NULL.`,
    explain:`התוצאה: Eyal (id 9, שיש לו רק הרשמה Inactive) ו-Lior (id 10, בלי הרשמות). אם מעבירים את e.status = 'Active' ל-WHERE, התנאי e.id IS NULL וה-status = 'Active' סותרים זה את זה ומתקבלת תוצאה ריקה — שוב ההבדל בין ON ל-WHERE ב-LEFT JOIN. Noa לא מופיעה: יש לה הרשמה פעילה אחת (MongoDB) לצד הלא-פעילה.`,
    source:`תרגול נוסף — מערכת המכללה (וריאציה על שאלה 2)` },

  { id:'c7', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`מצאו את כל הסטודנטים שרשומים ליותר מקורס אחד (סופרים את כל ההרשמות, בלי קשר לסטטוס). עמודות בסדר: studentId, coursesCount.`,
    solution:`SELECT studentId, COUNT(*) AS coursesCount
FROM enrollments
GROUP BY studentId
HAVING COUNT(*) > 1;`,
    alt:[`SELECT studentId, COUNT(courseId) AS coursesCount
FROM enrollments
GROUP BY studentId
HAVING COUNT(courseId) > 1;`],
    hint:`GROUP BY studentId על טבלת enrollments, ו-HAVING COUNT(*) > 1.`,
    explain:`התוצאה: 1 → 3 (David), 2 → 2 (Noa), 4 → 2 (Maya), 7 → 3 (Itai). "יותר מקורס אחד" = > 1. אין צורך ב-JOIN כי מספיק המזהה. במונגו: $group לפי "$studentId" עם $sum: 1, ואחריו $match על המונה — ה-$match שאחרי $group הוא המקביל ל-HAVING.`,
    source:`עבודת MongoDB — תרגיל 5 (בגרסת SQL)` },

  { id:'c8', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`מצאו את הסטודנטים הרשומים ליותר משני קורסים פעילים. עמודות בסדר: firstName, lastName, activeCourses.`,
    solution:`SELECT s.firstName, s.lastName, COUNT(*) AS activeCourses
FROM students s
JOIN enrollments e ON s.id = e.studentId
WHERE e.status = 'Active'
GROUP BY s.id, s.firstName, s.lastName
HAVING COUNT(*) > 2;`,
    hint:`WHERE מסנן הרשמות לפני הקיבוץ (רק Active), HAVING מסנן קבוצות אחרי הקיבוץ (> 2).`,
    explain:`התוצאה: David 3, Itai 3. סדר הביצוע הלוגי: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. תנאי על שורה בודדת (status) — ב-WHERE; תנאי על הקבוצה (COUNT) — ב-HAVING. "יותר משני" = > 2, לא >= 2 — עם >= 2 גם Maya (2 קורסים פעילים) הייתה נכנסת. שימו לב: בנתונים האלה גם שאילתה ששכחה את WHERE e.status = 'Active' מחזירה בדיוק אותה תוצאה (להרשמות הלא-פעילות של Noa ו-Eyal אין השפעה על הסף > 2), ולכן הבודק לא יתפוס את השכחה — אבל במבחן היא תעלה לכם בנקודות. התרגיל הבא (יותר מקורס פעיל אחד) כן חושף אותה. אפשר גם להכניס את תנאי הסטטוס ל-ON של ה-INNER JOIN — ב-INNER JOIN זה שקול.`,
    source:`עבודת ישור קו — שאלה 3 (צד ה-SQL)` },

  { id:'c8b', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`מצאו את הסטודנטים הרשומים ליותר מקורס פעיל אחד (רק הרשמות עם status = 'Active'). עמודות בסדר: firstName, lastName, activeCourses.`,
    solution:`SELECT s.firstName, s.lastName, COUNT(*) AS activeCourses
FROM students s
JOIN enrollments e ON s.id = e.studentId
WHERE e.status = 'Active'
GROUP BY s.id, s.firstName, s.lastName
HAVING COUNT(*) > 1;`,
    alt:[`SELECT s.firstName, s.lastName, COUNT(e.courseId) AS activeCourses
FROM students s
JOIN enrollments e ON s.id = e.studentId AND e.status = 'Active'
GROUP BY s.id, s.firstName, s.lastName
HAVING COUNT(e.courseId) > 1;`],
    hint:`כמו התרגיל הקודם, רק עם הסף > 1. WHERE על הסטטוס לפני הקיבוץ, HAVING על הספירה אחריו.`,
    explain:`התוצאה: David 3, Maya 2, Itai 3. כאן שכחת הסינון כן משנה: Noa רשומה לשני קורסים, אבל רק אחד מהם פעיל (MongoDB) — בלי WHERE e.status = 'Active' היא נכנסת בטעות עם 2. זו בדיוק הסיבה לייצר נתוני קצה מכוונים (סטודנטית עם הרשמה לא-פעילה): בלעדיהם אי אפשר לדעת אם השאילתה באמת מסננת.`,
    source:`תרגול נוסף — מערכת המכללה (וריאציה על שאלה 3)` },

  { id:'c9', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`חשבו כמה סטודנטים רשומים לכל קורס (כל ההרשמות, בלי קשר לסטטוס), על בסיס טבלת enrollments בלבד. עמודות בסדר: courseId, studentsCount.`,
    solution:`SELECT courseId, COUNT(*) AS studentsCount
FROM enrollments
GROUP BY courseId;`,
    alt:[`SELECT courseId, COUNT(studentId) AS studentsCount FROM enrollments GROUP BY courseId;`,
`SELECT courseId, COUNT(DISTINCT studentId) AS studentsCount FROM enrollments GROUP BY courseId;`],
    hint:`GROUP BY courseId ו-COUNT.`,
    explain:`1 → 5, 2 → 3, 3 → 2, 4 → 2, 5 → 3. קורס 6 (Cyber Security) לא מופיע בכלל — אין לו אף שורה ב-enrollments, ו-GROUP BY יוצר קבוצות רק ממה שקיים. כדי לראות אותו עם 0 צריך LEFT JOIN מ-courses (התרגיל הבא).`,
    source:`עבודת MongoDB — תרגיל 6 (בגרסת SQL)` },

  { id:'c10', set:'college2', topic:'outer', schema:'college2', check:'select',
    prompt:`הציגו לכל קורס את מספר הסטודנטים הרשומים אליו — כולל קורסים בלי אף סטודנט (שיופיעו עם 0). עמודות בסדר: courseName, studentsCount.`,
    solution:`SELECT c.courseName, COUNT(e.id) AS studentsCount
FROM courses c
LEFT JOIN enrollments e ON c.id = e.courseId
GROUP BY c.id, c.courseName;`,
    alt:[`SELECT c.courseName, COUNT(e.studentId) AS studentsCount
FROM courses c
LEFT JOIN enrollments e ON e.courseId = c.id
GROUP BY c.id, c.courseName;`],
    hint:`LEFT JOIN מ-courses, וספירה של עמודה מהטבלה הימנית: COUNT(e.id) — לא COUNT(*).`,
    explain:`MongoDB 5, SQL Server 3, Python 2, Marketing 2, Statistics 3, Cyber Security 0. עם COUNT(*) הקורס Cyber Security היה מקבל 1 — כי ה-LEFT JOIN יוצר לו שורה אחת (עם NULL-ים), ו-COUNT(*) סופר שורות. COUNT(עמודה) סופר רק ערכים שאינם NULL. אותה מלכודת כמו בתרגיל 14 בחוברת.`,
    source:`תרגול נוסף — מערכת המכללה (הרחבה לתרגיל 6)` },

  { id:'c11', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`מצאו את כל הקורסים שבהם רשומים יותר מ-2 סטודנטים (כל ההרשמות). עמודות בסדר: courseName, studentsCount.`,
    solution:`SELECT c.courseName, COUNT(*) AS studentsCount
FROM courses c
JOIN enrollments e ON c.id = e.courseId
GROUP BY c.id, c.courseName
HAVING COUNT(*) > 2;`,
    hint:`JOIN ל-courses בשביל השם, GROUP BY, ו-HAVING COUNT(*) > 2.`,
    explain:`התוצאה: MongoDB 5, SQL Server 3, Statistics 3. "יותר מ-2" = > 2, ולכן Python ו-Marketing (2 כל אחד) לא נכנסים. מקבצים לפי c.id וגם c.courseName — ב-SQL Server כל עמודה ב-SELECT שלא בתוך צבירה חייבת להופיע ב-GROUP BY.`,
    source:`עבודת MongoDB — תרגיל 7 (בגרסת SQL)` },

  { id:'c12', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`מצאו את שלושת הקורסים עם מספר הסטודנטים הגדול ביותר (כל ההרשמות). מיון לפי מספר הסטודנטים בסדר יורד, ובמקרה של תיקו — לפי שם הקורס בסדר עולה. עמודות בסדר: courseName, studentsCount.`,
    solution:`SELECT TOP 3 c.courseName, COUNT(*) AS studentsCount
FROM courses c
JOIN enrollments e ON c.id = e.courseId
GROUP BY c.id, c.courseName
ORDER BY studentsCount DESC, c.courseName ASC;`,
    alt:[`SELECT TOP 3 c.courseName, COUNT(e.id) AS studentsCount
FROM enrollments e
JOIN courses c ON c.id = e.courseId
GROUP BY c.id, c.courseName
ORDER BY COUNT(e.id) DESC, c.courseName;`],
    hint:`ב-T-SQL: SELECT TOP 3 … ORDER BY … DESC. ה-TOP נכתב מיד אחרי SELECT.`,
    explain:`התוצאה לפי הסדר: MongoDB 5, SQL Server 3, Statistics 3. TOP n בלי ORDER BY מחזיר 3 שורות שרירותיות (בסדר לא מוגדר) — חייבים מיון. מפתח המיון השני (שם הקורס) מכריע תיקו בין SQL Server ל-Statistics, כך שהסדר חד-משמעי. ב-SQL Server, TOP 3 WITH TIES (כשממיינים רק לפי המספר) היה מחזיר גם את כל מי שבתיקו עם המקום השלישי. במונגו המקבילה: $sort ואחריו $limit: 3. (במנועים אחרים כותבים LIMIT 3 בסוף — לא ב-SQL Server.)`,
    source:`עבודת MongoDB — תרגיל 13 (בגרסת SQL)` },

  { id:'c13', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`חשבו את ממוצע הציונים בכל קורס, על בסיס טבלת submissions. עמודות בסדר: courseId, averageGrade.`,
    solution:`SELECT courseId, AVG(grade) AS averageGrade
FROM submissions
GROUP BY courseId;`,
    hint:`GROUP BY courseId ו-AVG(grade). AVG מתעלם מ-NULL.`,
    explain:`1 → 83, 2 → 75, 3 → 91, 4 → 70, 5 → 85.5. בקורס 1 יש 7 הגשות אבל אחת עם grade = NULL (טרם נבדקה) — AVG מתעלם ממנה ומחלק ב-6. בקורס 4 ההגשה של Shira היא NULL ולכן הממוצע 70 מהגשה אחת. grade מוגדר DECIMAL(5,2), כך שב-SQL Server הממוצע נשאר עשרוני (לא חיתוך כמו ב-INT). במונגו: $avg מתעלם גם הוא מ-null.`,
    source:`עבודת MongoDB — תרגיל 8 (בגרסת SQL)` },

  { id:'c14', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`לכל קורס חשבו: ממוצע ציונים, הציון הגבוה ביותר, הציון הנמוך ביותר ומספר ההגשות (כל ההגשות — כולל כאלה שטרם נבדקו). עמודות בסדר: courseId, averageGrade, maxGrade, minGrade, submissionsCount.`,
    solution:`SELECT courseId,
       AVG(grade) AS averageGrade,
       MAX(grade) AS maxGrade,
       MIN(grade) AS minGrade,
       COUNT(*) AS submissionsCount
FROM submissions
GROUP BY courseId;`,
    alt:[`SELECT courseId, AVG(grade), MAX(grade), MIN(grade), COUNT(id)
FROM submissions
GROUP BY courseId;`],
    hint:`ארבע פונקציות צבירה באותו SELECT. למספר ההגשות — COUNT(*), לא COUNT(grade).`,
    explain:`1 → 83, 100, 60, 7 · 2 → 75, 88, 65, 3 · 3 → 91, 92, 90, 2 · 4 → 70, 70, 70, 2 · 5 → 85.5, 90, 81, 2. COUNT(grade) היה מחזיר 6 בקורס 1 ו-1 בקורס 4 — כי הוא לא סופר NULL. כלומר: COUNT(*) = מספר הגשות, COUNT(grade) = מספר הגשות שנבדקו. AVG, MAX ו-MIN מתעלמים מ-NULL.`,
    source:`עבודת MongoDB — תרגיל 9 (בגרסת SQL)` },

  { id:'c15', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`הציגו ממוצע ציונים לכל קורס, כולל שם הקורס ושם המרצה (שם פרטי + רווח + שם משפחה) — רק קורסים שיש להם הגשות. הגיעו לקורס דרך המטלה (submissions → assignments → courses → lecturers). עמודות בסדר: courseName, lecturerName, avgGrade.`,
    solution:`SELECT c.courseName,
       l.firstName + ' ' + l.lastName AS lecturerName,
       AVG(sb.grade) AS avgGrade
FROM submissions sb
JOIN assignments a ON a.id = sb.assignmentId
JOIN courses c ON c.id = a.courseId
JOIN lecturers l ON l.id = c.lecturerId
GROUP BY c.id, c.courseName, l.firstName, l.lastName;`,
    alt:[`SELECT c.courseName, l.firstName + ' ' + l.lastName AS lecturerName, AVG(sb.grade) AS avgGrade
FROM submissions sb
JOIN courses c ON c.id = sb.courseId
JOIN lecturers l ON l.id = c.lecturerId
GROUP BY c.id, c.courseName, l.firstName, l.lastName;`],
    hint:`ארבע טבלאות בשרשרת, GROUP BY לפי הקורס ושם המרצה, ו-AVG(sb.grade).`,
    explain:`MongoDB – Moshe Cohen 83 · SQL Server – Moshe Cohen 75 · Python – Rina Levi 91 · Marketing – Avi Peretz 70 · Statistics – Avi Peretz 85.5. ב-DOCX של המרצה לטבלת submissions אין עמודת courseId, ולכן המסלול "הרשמי" הוא דרך assignments; בנתונים שלנו יש גם sb.courseId ישירות (כמו ב-PDF), והחלופה משתמשת בו — התוצאה זהה. Cyber Security לא מופיע כי אין לו הגשות (INNER JOIN); אם רוצים אותו עם NULL — מתחילים מ-courses עם LEFT JOIN. במונגו זה רצף של $lookup + $unwind.`,
    source:`עבודת ישור קו — שאלה 6 (צד ה-SQL)` },

  { id:'c16', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`חשבו את ממוצע הציונים של כל סטודנט שהגיש לפחות הגשה אחת, עם השם המלא שלו (שם פרטי + רווח + שם משפחה). הממוצע מעוגל ל-2 ספרות אחרי הנקודה (CAST ל-DECIMAL(5,2)). סטודנט שכל ההגשות שלו טרם נבדקו יופיע עם NULL. עמודות בסדר: studentName, averageGrade.`,
    solution:`SELECT st.firstName + ' ' + st.lastName AS studentName,
       CAST(AVG(sb.grade) AS DECIMAL(5,2)) AS averageGrade
FROM submissions sb
JOIN students st ON st.id = sb.studentId
GROUP BY st.id, st.firstName, st.lastName;`,
    alt:[`SELECT st.firstName + ' ' + st.lastName AS studentName, ROUND(AVG(sb.grade), 2) AS averageGrade
FROM students st
JOIN submissions sb ON sb.studentId = st.id
GROUP BY st.id, st.firstName, st.lastName;`],
    hint:`JOIN בין submissions ל-students, GROUP BY לפי הסטודנט, ושרשור + לשם המלא.`,
    explain:`David Levi 88.75 · Noa Cohen 74.00 · Yossi Mizrahi 65.00 · Maya Peretz 87.50 · Omer Biton 90.00 · Shira Avraham NULL · Itai Friedman 84.33 · Tamar Golan 60.00. Shira מופיעה עם NULL כי ההגשה היחידה שלה (grade = NULL) — AVG של NULL-ים בלבד הוא NULL. Eyal ו-Lior לא מופיעים כי אין להם הגשות (INNER JOIN). מקבצים לפי st.id ולא רק לפי השם — שני סטודנטים עם אותו שם לא יתמזגו. התבנית של התוצאה כמו בדוגמה של המרצה: studentName + averageGrade.`,
    source:`עבודת MongoDB — תרגיל 14 (בגרסת SQL)` },

  { id:'c17', set:'college2', topic:'nested', schema:'college2', check:'select',
    prompt:`מצאו לכל סטודנט את הקורס שבו ממוצע הציונים שלו הוא הגבוה ביותר (רק הגשות שנבדקו — grade IS NOT NULL). עמודות בסדר: studentName (שם פרטי + רווח + שם משפחה), courseName, avgGrade.`,
    solution:`SELECT st.firstName + ' ' + st.lastName AS studentName,
       c.courseName,
       t.avgGrade
FROM (SELECT studentId, courseId, AVG(grade) AS avgGrade
      FROM submissions
      WHERE grade IS NOT NULL
      GROUP BY studentId, courseId) t
JOIN students st ON st.id = t.studentId
JOIN courses c ON c.id = t.courseId
WHERE t.avgGrade = (SELECT MAX(t2.avgGrade)
                    FROM (SELECT studentId, AVG(grade) AS avgGrade
                          FROM submissions
                          WHERE grade IS NOT NULL
                          GROUP BY studentId, courseId) t2
                    WHERE t2.studentId = t.studentId);`,
    alt:[`SELECT studentName, courseName, avgGrade
FROM (SELECT st.firstName + ' ' + st.lastName AS studentName,
             c.courseName,
             AVG(sb.grade) AS avgGrade,
             RANK() OVER (PARTITION BY st.id ORDER BY AVG(sb.grade) DESC) AS rnk
      FROM submissions sb
      JOIN students st ON st.id = sb.studentId
      JOIN courses c ON c.id = sb.courseId
      WHERE sb.grade IS NOT NULL
      GROUP BY st.id, st.firstName, st.lastName, c.id, c.courseName) x
WHERE rnk = 1;`,
`SELECT studentId, courseId, AVG(grade) AS avgGrade
INTO #avg_grades
FROM submissions
WHERE grade IS NOT NULL
GROUP BY studentId, courseId;

SELECT st.firstName + ' ' + st.lastName AS studentName, c.courseName, a.avgGrade
FROM #avg_grades a
JOIN students st ON st.id = a.studentId
JOIN courses c ON c.id = a.courseId
WHERE a.avgGrade = (SELECT MAX(b.avgGrade) FROM #avg_grades b WHERE b.studentId = a.studentId);`],
    hint:`שני שלבים: (1) ממוצע לכל זוג (סטודנט, קורס) — GROUP BY studentId, courseId; (2) להשאיר רק את הזוג שהממוצע שלו שווה למקסימום של אותו סטודנט — תת-שאילתה מתואמת (correlated), פונקציית חלון RANK, או טבלה זמנית.`,
    explain:`התוצאה: David Levi – Python 92 · Noa Cohen – MongoDB 78 · Yossi Mizrahi – SQL Server 65 · Maya Peretz – Python 90 · Omer Biton – Statistics 90 · Itai Friedman – MongoDB 100 · Tamar Golan – MongoDB 60. זו בעיית "המקסימום בתוך כל קבוצה": אי אפשר פשוט לכתוב MAX(AVG(grade)) — צריך קודם טבלת ביניים של ממוצעים. הפתרון הראשי משתמש בטבלה נגזרת (subquery ב-FROM, חייבת כינוי) ובתת-שאילתה מתואמת שמשווה כל שורה למקסימום של אותו סטודנט (t2.studentId = t.studentId). החלופה השלישית עושה את אותו הדבר עם טבלה זמנית #avg_grades — נושא שמופיע בסילבוס. הסינון grade IS NOT NULL חשוב: Shira (שכל ההגשות שלה NULL) הייתה מקבלת ב-RANK ממוצע NULL בדירוג 1 ומופיעה בטעות. במקרה של תיקו בין שני קורסים, כל השיטות כאן יחזירו את שניהם.`,
    source:`עבודת MongoDB — תרגיל 15 (בגרסת SQL)` },

  { id:'c18', set:'college2', topic:'join', schema:'college2', check:'select',
    prompt:`הציגו את כל ההגשות עם שם הסטודנט, שם הקורס ושם המרצה (שמות מלאים: שם פרטי + רווח + שם משפחה). הגיעו לקורס דרך המטלה (assignments). עמודות בסדר: id (מזהה ההגשה), studentName, courseName, lecturerName.`,
    solution:`SELECT sb.id,
       st.firstName + ' ' + st.lastName AS studentName,
       c.courseName,
       l.firstName + ' ' + l.lastName AS lecturerName
FROM submissions sb
JOIN students st ON st.id = sb.studentId
JOIN assignments a ON a.id = sb.assignmentId
JOIN courses c ON c.id = a.courseId
JOIN lecturers l ON l.id = c.lecturerId;`,
    alt:[`SELECT sb.id, st.firstName + ' ' + st.lastName, c.courseName, l.firstName + ' ' + l.lastName
FROM submissions sb
JOIN students st ON st.id = sb.studentId
JOIN courses c ON c.id = sb.courseId
JOIN lecturers l ON l.id = c.lecturerId;`],
    hint:`חמש טבלאות: submissions → students, ו-submissions → assignments → courses → lecturers.`,
    explain:`16 שורות — אחת לכל הגשה. יש שתי טבלאות עם עמודות firstName / lastName (students ו-lecturers), ולכן חובה כינויי טבלה (st., l.) — אחרת SQL Server יחזיר Ambiguous column name. המסלול דרך assignments מתאים לסכמה ב-DOCX (שם אין courseId בהגשות); החלופה דרך sb.courseId מתאימה לסכמה ב-PDF. במונגו: $lookup ל-students, ל-courses ואז ל-lecturers, עם $unwind אחרי כל אחד.`,
    source:`עבודת ישור קו — שאלה 4 (צד ה-SQL)` },

  { id:'c19', set:'college2', topic:'outer', schema:'college2', check:'select',
    prompt:`מצאו את כל המטלות שאין להן אף הגשה. עמודות בסדר: id, title.`,
    solution:`SELECT a.id, a.title
FROM assignments a
LEFT JOIN submissions sb ON a.id = sb.assignmentId
WHERE sb.id IS NULL;`,
    alt:[`SELECT a.id, a.title FROM assignments a
WHERE NOT EXISTS (SELECT 1 FROM submissions sb WHERE sb.assignmentId = a.id);`,
`SELECT id, title FROM assignments
WHERE id NOT IN (SELECT assignmentId FROM submissions);`],
    hint:`anti-join: LEFT JOIN מ-assignments ל-submissions ו-IS NULL על המפתח של ההגשה.`,
    explain:`התוצאה: 7 – Stored Procedures. בודקים IS NULL על sb.id (המפתח הראשי) ולא על sb.grade: הגשה שקיימת אבל עדיין לא נבדקה גם היא בעלת grade = NULL, ובדיקה על grade הייתה מחזירה בטעות גם את מטלות 1 ו-5.`,
    source:`עבודת ישור קו — שאלה 5 (צד ה-SQL)` },

  { id:'c20', set:'college2', topic:'where', schema:'college2', check:'select',
    prompt:`הציגו את ההגשות שטרם נבדקו (grade ריק) — השם המלא של הסטודנט (שם פרטי + רווח + שם משפחה) וכותרת המטלה. עמודות בסדר: studentName, title.`,
    solution:`SELECT st.firstName + ' ' + st.lastName AS studentName, a.title
FROM submissions sb
JOIN students st ON st.id = sb.studentId
JOIN assignments a ON a.id = sb.assignmentId
WHERE sb.grade IS NULL;`,
    hint:`ערך ריק בודקים עם IS NULL — לעולם לא עם = NULL.`,
    explain:`התוצאה: Maya Peretz – Aggregation Project, Shira Avraham – Market Research. WHERE sb.grade = NULL מחזיר 0 שורות, כי כל השוואה עם NULL היא UNKNOWN. במונגו, לעומת זאת, { grade: null } כן עובד (ותופס גם מסמכים שהשדה חסר בהם).`,
    source:`תרגול נוסף — מערכת המכללה` },

  { id:'c21', set:'college2', topic:'outer', schema:'college2', check:'select',
    prompt:`הציגו לכל מרצה את מספר הקורסים שהוא מלמד — כולל מרצים שלא מלמדים אף קורס (עם 0). עמודות בסדר: firstName, lastName, coursesCount.`,
    solution:`SELECT l.firstName, l.lastName, COUNT(c.id) AS coursesCount
FROM lecturers l
LEFT JOIN courses c ON c.lecturerId = l.id
GROUP BY l.id, l.firstName, l.lastName;`,
    hint:`LEFT JOIN מ-lecturers ל-courses, ו-COUNT(c.id).`,
    explain:`Moshe Cohen 2, Rina Levi 2, Avi Peretz 2, Dana Klein 0. קשר אחד-לרבים: המפתח הזר lecturerId יושב בצד ה"רבים" (courses). COUNT(*) היה נותן ל-Dana 1 בגלל שורת ה-NULL של ה-LEFT JOIN.`,
    source:`תרגול נוסף — מערכת המכללה` },

  { id:'c22', set:'college2', topic:'case', schema:'college2', check:'select',
    prompt:`הציגו לכל הגשה את המזהה, הציון ועמודה result: אם הציון ריק → 'Not graded'; 85 ומעלה → 'High'; 70 ומעלה → 'Medium'; אחרת → 'Low'. עמודות בסדר: id, grade, result.`,
    solution:`SELECT id, grade,
  CASE
    WHEN grade IS NULL THEN 'Not graded'
    WHEN grade >= 85 THEN 'High'
    WHEN grade >= 70 THEN 'Medium'
    ELSE 'Low'
  END AS result
FROM submissions;`,
    hint:`ב-CASE בדקו את ה-NULL בתנאי הראשון: WHEN grade IS NULL THEN …`,
    explain:`16 שורות; הגשות 8 ו-12 מקבלות 'Not graded', ו-Low מקבלות רק 65 ו-60 (הגשות 7 ו-16). אם שוכחים את WHEN grade IS NULL, הגשה בלי ציון לא עומדת באף WHEN (השוואה עם NULL היא UNKNOWN) ונופלת ל-ELSE — כלומר מקבלת 'Low' בטעות. ב-CASE פשוט (CASE grade WHEN NULL …) אי אפשר לתפוס NULL בכלל — רק ב-CASE עם WHEN grade IS NULL.`,
    source:`תרגול נוסף — מערכת המכללה` },

  { id:'c23', set:'college2', topic:'group', schema:'college2', check:'select',
    prompt:`הציגו את מספר ההגשות בכל חודש — לפי שנה וחודש של submissionDate, ממוינים לפי שנה ואז חודש (עולה). עמודות בסדר: submissionYear, submissionMonth, submissionsCount.`,
    solution:`SELECT YEAR(submissionDate) AS submissionYear,
       MONTH(submissionDate) AS submissionMonth,
       COUNT(*) AS submissionsCount
FROM submissions
GROUP BY YEAR(submissionDate), MONTH(submissionDate)
ORDER BY submissionYear, submissionMonth;`,
    hint:`הפונקציות YEAR() ו-MONTH() של T-SQL, וקיבוץ לפי שני הביטויים.`,
    explain:`2025/11 → 6 הגשות, 2025/12 → 10 הגשות. ב-GROUP BY חוזרים על הביטוי המלא (YEAR(submissionDate)) — ב-SQL Server אי אפשר להשתמש בו בכינוי submissionYear, כי GROUP BY רץ לפני ה-SELECT; ב-ORDER BY דווקא מותר להשתמש בכינוי. במונגו: $group לפי { $year: "$submissionDate" } ו-{ $month: … }.`,
    source:`תרגול נוסף — מערכת המכללה` },

  { id:'c24', set:'college2', topic:'case', schema:'college2', check:'select',
    prompt:`הציגו את הסטודנטים שגילם גבוה מגיל סף שתלוי בעיר שלהם: Tel Aviv — מעל 22; Haifa — מעל 20; כל עיר אחרת — מעל 24. כתבו את התנאי עם CASE בתוך ה-WHERE (כמו בדוגמה של מצגת 3). עמודות בסדר: firstName, city, age.`,
    solution:`SELECT firstName, city, age
FROM students
WHERE age > CASE city
              WHEN 'Tel Aviv' THEN 22
              WHEN 'Haifa' THEN 20
              ELSE 24
            END;`,
    alt:[`SELECT firstName, city, age
FROM students
WHERE age > CASE
              WHEN city = 'Tel Aviv' THEN 22
              WHEN city = 'Haifa' THEN 20
              ELSE 24
            END;`,
`SELECT firstName, city, age
FROM students
WHERE (city = 'Tel Aviv' AND age > 22)
   OR (city = 'Haifa' AND age > 20)
   OR (city NOT IN ('Tel Aviv', 'Haifa') AND age > 24);`],
    hint:`CASE מחזיר ערך — כאן את גיל הסף — ואפשר להשוות אליו ב-WHERE: WHERE age > CASE city WHEN … THEN … ELSE … END.`,
    explain:`התוצאה: David (Tel Aviv, 23), Noa (Haifa, 21), Yossi (Jerusalem, 25), Itai (Tel Aviv, 27), Eyal (Jerusalem, 26). מקרי הגבול: Maya (Tel Aviv, 22), Shira (Haifa, 20) ו-Omer (Beer Sheva, 24) לא נכנסות כי "מעל" = > ולא >=. CASE הוא ביטוי שמחזיר ערך, ולכן אפשר להשתמש בו בכל מקום שבו מותר ערך — גם בצד אחד של השוואה ב-WHERE. יש שתי צורות: CASE פשוט (CASE city WHEN 'Tel Aviv' THEN …) שמשווה עמודה אחת לערכים, ו-CASE מחופש (CASE WHEN city = 'Tel Aviv' THEN …) שמאפשר כל תנאי. החלופה השלישית — שילוב AND/OR בסוגריים — היא בדיוק "השאילתה השקולה" שבמסגרת בשקף של מצגת 3. שימו לב: בשקף עצמו יש טעויות הקלדה (נקודה-פסיק אחרי FROM CUSTOMERS לפני ה-WHERE, ו-' Haifa' עם רווח בתחילת הטקסט — רווח כזה היה גורם לכך שאף לקוח מחיפה לא יתאים). אל תעתיקו אותן.`,
    source:`מצגת 3 — CASE בתוך WHERE (מותאם למערכת המכללה)` },

  { id:'c25', set:'college2', topic:'select', schema:'college2', check:'select',
    prompt:`הציגו לכל קורס עמודה אחת בשם ID_and_Name בפורמט: מזהה הקורס, רווח, מקף, רווח ושם הקורס — למשל '1 - MongoDB'. השתמשו ב-CAST כדי להמיר את המזהה לטקסט. עמודה: ID_and_Name.`,
    solution:`SELECT CAST(id AS VARCHAR(10)) + ' - ' + courseName AS ID_and_Name
FROM courses;`,
    alt:[`SELECT CONCAT(id, ' - ', courseName) AS ID_and_Name FROM courses;`],
    hint:`CAST(id AS VARCHAR(10)) הופך את המספר לטקסט, ואז משרשרים עם + : … + ' - ' + courseName.`,
    explain:`6 שורות: '1 - MongoDB' עד '6 - Cyber Security'. זו בדיוק הדוגמה של CAST ממצגת 3: CAST(CustomerID AS VARCHAR(10)) + ' - ' + CustomerName AS ID_and_Name. למה CAST? ב-SQL Server הסימן + בין INT לטקסט הוא חיבור חשבוני: SQL Server ינסה להמיר את ' - ' למספר ויחזיר שגיאה (Conversion failed when converting the varchar value ' - ' to data type int). לכן קודם ממירים את המספר ל-VARCHAR. CONCAT (החלופה) ממיר בעצמו וגם מתעלם מ-NULL. שימו לב: המנוע בדפדפן (SQLite) מקבל גם id + ' - ' + courseName בלי CAST, כך שהבודק לא יתפוס את השכחה — אבל ב-SQL Server, ולכן במבחן, זו שגיאה.`,
    source:`מצגת 3 — CAST ושרשור מחרוזות (מותאם למערכת המכללה)` },

  { id:'c26', set:'college2', topic:'select', schema:'college2', check:'select',
    prompt:`הציגו לכל מרצה את השם הפרטי, שם המשפחה, הוותק בשנים (seniority) ועמודה מחושבת בשם Seniority-Months — הוותק בחודשים (seniority * 12). שם העמודה מכיל מקף, ולכן כתבו אותו בסוגריים מרובעים. עמודות בסדר: firstName, lastName, seniority, Seniority-Months.`,
    solution:`SELECT firstName, lastName, seniority,
       seniority * 12 AS [Seniority-Months]
FROM lecturers;`,
    alt:[`SELECT l.firstName, l.lastName, l.seniority, l.seniority * 12 AS SeniorityMonths FROM lecturers l;`],
    hint:`עמודה מחושבת = ביטוי חשבוני בתוך ה-SELECT עם כינוי: seniority * 12 AS [Seniority-Months].`,
    explain:`Moshe Cohen 12 → 144 · Rina Levi 7 → 84 · Avi Peretz 15 → 180 · Dana Klein 3 → 36. עמודה מחושבת לא נשמרת בטבלה — היא מחושבת מחדש בכל הרצה. כמו בשקף של מצגת 3 (Amount = Quantity*Price, [Sale-ID]): שם שמכיל מקף או רווח חייב סוגריים מרובעים — בלי הסוגריים SQL Server מפרש את המקף כסימן מינוס ומחזיר שגיאת תחביר. ב-T-SQL יש גם צורת כינוי נוספת, כמו בשקף: [Seniority-Months] = seniority * 12 — היא חוקית ב-SQL Server, אבל המנוע בדפדפן מכיר רק את הצורה עם AS, ולכן כאן כתבו AS.`,
    source:`מצגת 3 — עמודה מחושבת וסוגריים מרובעים (מותאם למערכת המכללה)` },

/* =====================================================================
   4) DDL / DML / טבלאות זמניות / פרוצדורות וטריגרים
   ===================================================================== */
  { id:'d1', set:'ddl', topic:'ddl', schema:'practice', check:'mutate', mutateTable:'Teachers',
    prompt:`צרו טבלה בשם Teachers עם העמודות בסדר הזה: teacher_id INT — מפתח ראשי; name VARCHAR(50) — חובה (NOT NULL); email VARCHAR(100) — ייחודי (UNIQUE); salary INT — חייב להיות גדול מ-0 (CHECK); city VARCHAR(50) — ברירת מחדל 'Tel Aviv'; course_id INT — מפתח זר ל-Courses(course_id). לאחר מכן הוסיפו מרצה: teacher_id = 1, name = 'Efi', email = 'efi@ono.ac.il', salary = 15000, course_id = 101 — בלי לציין עיר, כדי שתיכנס ברירת המחדל. (הבודק משווה את תוכן הטבלה Teachers אחרי ההרצה. שימו לב: המנוע בדפדפן לא מקבל מפתח זר בשורת העמודה בצורה course_id INT FOREIGN KEY REFERENCES … — כתבו בשורת העמודה רק REFERENCES Courses(course_id), או סעיף FOREIGN KEY (course_id) REFERENCES … בסוף הטבלה. ב-SQL Server כל הצורות חוקיות.)`,
    solution:`CREATE TABLE Teachers (
  teacher_id INT PRIMARY KEY,
  name       VARCHAR(50) NOT NULL,
  email      VARCHAR(100) UNIQUE,
  salary     INT CHECK (salary > 0),
  city       VARCHAR(50) DEFAULT 'Tel Aviv',
  course_id  INT REFERENCES Courses(course_id)
);

INSERT INTO Teachers (teacher_id, name, email, salary, course_id)
VALUES (1, 'Efi', 'efi@ono.ac.il', 15000, 101);`,
    alt:[`CREATE TABLE Teachers (
  teacher_id INT NOT NULL,
  name       VARCHAR(50) NOT NULL,
  email      VARCHAR(100) NULL,
  salary     INT NULL,
  city       VARCHAR(50) DEFAULT 'Tel Aviv',
  course_id  INT NULL,
  PRIMARY KEY (teacher_id),
  CONSTRAINT chk_salary CHECK (salary > 0),
  UNIQUE (email),
  CONSTRAINT fk_teacher_course FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);
INSERT INTO Teachers (teacher_id, name, email, salary, course_id)
VALUES (1, 'Efi', 'efi@ono.ac.il', 15000, 101);`],
    hint:`CREATE TABLE ואחריו INSERT עם רשימת עמודות שלא כוללת את city. אילוצים אפשר לכתוב בשורת העמודה (teacher_id INT PRIMARY KEY, salary INT CHECK (salary > 0)) או בסוף הטבלה עם CONSTRAINT.`,
    explain:`השורה שנשמרת: 1, Efi, efi@ono.ac.il, 15000, Tel Aviv, 101 — העיר נכנסה מברירת המחדל כי city לא הופיעה ב-INSERT. כמו במצגת 3 יש שתי דרכים: אילוץ בשורת העמודה (teacher_id INT PRIMARY KEY), או סעיף נפרד בסוף (PRIMARY KEY (teacher_id), CONSTRAINT … CHECK, UNIQUE (email) — UNIQUE מגדיר מפתח חלופי). מפתח זר בשורת העמודה: course_id INT REFERENCES Courses(course_id) — חוקי ב-T-SQL (כך כתוב גם ב-DDL של עבודת ישור קו), וגם הצורה מהשקף במצגת 3, course_id INT FOREIGN KEY REFERENCES Courses(course_id), חוקית ב-SQL Server — במבחן אפשר לכתוב כל אחת מהן. רק המנוע שבדפדפן לא מקבל את המילים FOREIGN KEY בשורת העמודה. שימו לב: הבודק משווה רק את הנתונים שבטבלה, לא את האילוצים — במבחן האילוצים הם חלק מהציון. אם הטבלה כבר קיימת, CREATE ייכשל — צריך DROP TABLE Teachers קודם.`,
    source:`מצגת 3 — CREATE TABLE ואילוצים` },

  { id:'d2', set:'ddl', topic:'ddl', schema:'college2', check:'mutate', mutateTable:'lessons',
    prompt:`במונגו השיעורים שמורים כמערך lessons מוטמע (embedded) בתוך כל קורס; ב-SQL צריך טבלה נפרדת. צרו טבלה lessons עם העמודות בסדר הזה: id INT — מפתח ראשי; courseId INT — מפתח זר ל-courses(id); title VARCHAR(100) — חובה; duration INT — ברירת מחדל 90, וחייב להיות גדול מ-0. הוסיפו את שלושת השיעורים של קורס SQL Server (courseId = 2 בכולם): id 1 — 'SELECT Basics', משך 90; id 2 — 'JOINs', משך 120; id 3 — 'GROUP BY' בלי לציין duration (כדי שתיכנס ברירת המחדל). (במנוע שבדפדפן כתבו מפתח זר בשורת העמודה רק עם REFERENCES, בלי המילים FOREIGN KEY.)`,
    solution:`CREATE TABLE lessons (
  id       INT PRIMARY KEY,
  courseId INT REFERENCES courses(id),
  title    VARCHAR(100) NOT NULL,
  duration INT DEFAULT 90 CHECK (duration > 0)
);

INSERT INTO lessons VALUES (1, 2, 'SELECT Basics', 90), (2, 2, 'JOINs', 120);
INSERT INTO lessons (id, courseId, title) VALUES (3, 2, 'GROUP BY');`,
    alt:[`CREATE TABLE lessons (
  id INT NOT NULL,
  courseId INT,
  title VARCHAR(100) NOT NULL,
  duration INT DEFAULT 90,
  PRIMARY KEY (id),
  CONSTRAINT fk_lessons_course FOREIGN KEY (courseId) REFERENCES courses(id),
  CONSTRAINT chk_duration CHECK (duration > 0)
);
INSERT INTO lessons (id, courseId, title, duration) VALUES (1, 2, 'SELECT Basics', 90);
INSERT INTO lessons (id, courseId, title, duration) VALUES (2, 2, 'JOINs', 120);
INSERT INTO lessons (id, courseId, title) VALUES (3, 2, 'GROUP BY');`],
    hint:`קשר אחד-לרבים (קורס → שיעורים): המפתח הזר courseId יושב בטבלת ה"רבים" — lessons.`,
    explain:`התוצאה: 3 שורות, והשיעור השלישי מקבל duration = 90 מברירת המחדל — בדיוק כמו המערך המוטמע של קורס 2 במונגו. זה ההבדל המרכזי בין המודלים: במונגו "מטמיעים" (embedding) נתונים שתמיד נקראים יחד עם ההורה, וב-SQL מפרקים לטבלה נפרדת עם מפתח זר (referencing) ומחברים ב-JOIN. INSERT בלי רשימת עמודות מחייב ערך לכל עמודה לפי הסדר המדויק בטבלה; עם רשימת עמודות אפשר לדלג, והעמודות החסרות מקבלות DEFAULT או NULL. אפשר כמה שורות ב-VALUES אחד, מופרדות בפסיקים.`,
    source:`מצגת 3 — CREATE TABLE · שיעור NoSQL — Embedding מול Referencing` },

  { id:'d3', set:'ddl', topic:'dml', schema:'practice', check:'mutate', mutateTable:'Students',
    prompt:`הוסיפו לטבלת Students סטודנט חדש, בלי לציין רשימת עמודות: מזהה 7, השם Avi, גיל 23, עיר Holon.`,
    solution:`INSERT INTO Students VALUES (7, 'Avi', 23, 'Holon');`,
    alt:[`INSERT INTO Students (student_id, name, age, city) VALUES (7, 'Avi', 23, 'Holon');`],
    hint:`INSERT INTO טבלה VALUES (…) — הערכים לפי סדר העמודות בטבלה: student_id, name, age, city.`,
    explain:`בלי רשימת עמודות, רשימת הערכים חייבת להתאים בדיוק לסדר ולמספר העמודות בטבלה (מצגת 3). טקסט בין מירכאות בודדות, מספרים בלי מירכאות. אם מזהה 7 כבר היה קיים — הפקודה הייתה נכשלת על הפרת מפתח ראשי.`,
    source:`מצגת 3 — INSERT` },

  { id:'d4', set:'ddl', topic:'dml', schema:'practice', check:'mutate', mutateTable:'Students',
    prompt:`הוסיפו בפקודת INSERT אחת שני סטודנטים — רק מזהה ושם: (8, 'Lea') ו-(9, 'Omri'). הגיל והעיר יישארו ריקים.`,
    solution:`INSERT INTO Students (student_id, name)
VALUES (8, 'Lea'), (9, 'Omri');`,
    alt:[`INSERT INTO Students (name, student_id) VALUES ('Lea', 8), ('Omri', 9);`,
`INSERT INTO Students (student_id, name) VALUES (8, 'Lea');
INSERT INTO Students (student_id, name) VALUES (9, 'Omri');`],
    hint:`INSERT INTO Students (student_id, name) VALUES (…), (…);`,
    explain:`עם רשימת עמודות אפשר לכתוב את הערכים בכל סדר שרוצים (כל עוד הוא תואם לרשימה) ולהשמיט עמודות — הן מקבלות NULL או DEFAULT. אם אחת העמודות שהושמטו הייתה NOT NULL בלי DEFAULT, הפקודה הייתה נכשלת.`,
    source:`מצגת 3 — INSERT עם רשימת עמודות` },

  { id:'d5', set:'ddl', topic:'dml', schema:'practice', check:'mutate', mutateTable:'Students',
    prompt:`הסטודנט Ron (מזהה 3) עבר לגור ב-Haifa וחגג יום הולדת — עדכנו בפקודה אחת את העיר שלו ל-'Haifa' ואת הגיל ל-20.`,
    solution:`UPDATE Students
SET city = 'Haifa', age = 20
WHERE student_id = 3;`,
    alt:[`UPDATE Students SET age = 20, city = 'Haifa' WHERE name = 'Ron';`],
    hint:`UPDATE … SET עמודה1 = …, עמודה2 = … WHERE …`,
    explain:`כמה עמודות מעדכנים באותו SET, מופרדות בפסיקים (לא AND!). SET city = 'Haifa' AND age = 20 היא טעות קלאסית — ב-SQL Server שגיאת תחביר. בלי WHERE — כל הסטודנטים היו עוברים לחיפה ("שורש לאסונות", מצגת 3). עדיף לזהות לפי המפתח הראשי.`,
    source:`מצגת 3 — UPDATE` },

  { id:'d6', set:'ddl', topic:'dml', schema:'practice', check:'mutate', mutateTable:'Courses',
    prompt:`העלו ב-10% את המחיר של כל הקורסים שמחירם נמוך מ-1500.`,
    solution:`UPDATE Courses
SET price = price * 1.1
WHERE price < 1500;`,
    alt:[`UPDATE Courses SET price = price + price * 0.1 WHERE price < 1500;`],
    hint:`אפשר להשתמש בערך הנוכחי של העמודה בתוך ה-SET: price = price * 1.1.`,
    explain:`SQL (1200 → 1320) ו-Networks (1300 → 1430) מתעדכנים; Java (1500) לא, כי 1500 אינו "נמוך מ-1500". ה-SET מחושב לכל שורה לפי הערכים שלה לפני העדכון. ב-SQL Server העמודה price היא INT, ולכן התוצאה נשמרת כמספר שלם.`,
    source:`מצגת 3 — UPDATE` },

  { id:'d7', set:'ddl', topic:'dml', schema:'practice', check:'mutate', mutateTable:'Enrollments',
    prompt:`מחקו מטבלת Enrollments את כל הרישומים עם ציון נכשל (מתחת ל-60).`,
    solution:`DELETE FROM Enrollments
WHERE grade < 60;`,
    alt:[`DELETE Enrollments WHERE grade < 60;`],
    hint:`DELETE FROM … WHERE …`,
    explain:`נמחקת רק ההרשמה של Tom ל-Java (55). ב-T-SQL המילה FROM אחרי DELETE אופציונלית. DELETE בלי WHERE מוחק את כל השורות — אבל מבנה הטבלה נשאר ("DELETE doesn't DROP the schema"), בניגוד ל-DROP TABLE שמוחק את הטבלה עצמה.`,
    source:`מצגת 3 — DELETE` },

  { id:'d8', set:'ddl', topic:'dml', schema:'practice', check:'mutate', mutateTable:'Enrollments',
    prompt:`מחקו את כל ההרשמות של הסטודנטים שגרים ב-Haifa (השתמשו בתת-שאילתה על Students).`,
    solution:`DELETE FROM Enrollments
WHERE student_id IN (SELECT student_id FROM Students WHERE city = 'Haifa');`,
    alt:[`DELETE FROM Enrollments
WHERE EXISTS (SELECT 1 FROM Students s
              WHERE s.student_id = Enrollments.student_id AND s.city = 'Haifa');`],
    hint:`WHERE student_id IN (SELECT student_id FROM Students WHERE city = 'Haifa')`,
    explain:`נמחקות שתי ההרשמות של Maya (מזהה 2). Dana גרה גם היא בחיפה, אבל אין לה הרשמות — אין מה למחוק. בטבלת Enrollments אין עמודת עיר, ולכן התנאי חייב לעבור דרך Students — עם תת-שאילתה. ב-SQL Server קיימת גם צורה עם JOIN: DELETE e FROM Enrollments e JOIN Students s ON … WHERE s.city = 'Haifa' (תחביר ייחודי ל-T-SQL; המנוע בדפדפן לא תומך בו).`,
    source:`מצגת 3 — DELETE · שאילתות מקוננות` },

  { id:'d9', set:'ddl', topic:'ddl', schema:'practice', check:'mutate', mutateTable:'Students',
    prompt:`הוסיפו לטבלת Students עמודה חדשה בשם email מסוג VARCHAR(100).`,
    solution:`ALTER TABLE Students ADD email VARCHAR(100);`,
    alt:[`ALTER TABLE Students ADD email VARCHAR(100) NULL;`],
    hint:`ALTER TABLE שם_טבלה ADD שם_עמודה טיפוס — בלי המילה COLUMN.`,
    explain:`העמודה נוספת בסוף, עם NULL בכל השורות הקיימות. בתחביר של SQL Server (וכמו בשקף 22 של מצגת 3) כותבים ADD email … ולא ADD COLUMN email … (ADD COLUMN היא שגיאה ב-T-SQL). אם רוצים עמודה NOT NULL בטבלה שכבר יש בה שורות, צריך גם DEFAULT — אחרת אין ערך לשורות הקיימות.`,
    source:`מצגת 3 — ALTER TABLE ADD` },

  { id:'d10', set:'ddl', topic:'ddl', schema:'practice', check:'mutate', mutateTable:'Courses',
    prompt:`הוסיפו לטבלת Courses עמודה discount_price מסוג DECIMAL(10,2), ומלאו אותה לכל הקורסים במחיר אחרי 10% הנחה (price * 0.9).`,
    solution:`ALTER TABLE Courses ADD discount_price DECIMAL(10,2);
GO
UPDATE Courses SET discount_price = price * 0.9;`,
    hint:`שתי פקודות: ALTER TABLE … ADD, ואז UPDATE בלי WHERE (כאן באמת רוצים את כל השורות). ב-SSMS מפרידים ביניהן ב-GO.`,
    explain:`discount_price: SQL 1080, Java 1350, Python 1620, Networks 1170. למה GO? ב-SQL Server אצווה (batch) מקומפלת כיחידה אחת, וה-UPDATE שמתייחס לעמודה שעדיין לא קיימת בזמן הקומפילציה עלול להיכשל עם Invalid column name. GO (פקודה של SSMS, לא של SQL עצמו) מפצל לשתי אצוות. במנוע שבדפדפן GO מוסר אוטומטית, כך שזה עובד גם בלעדיו. UPDATE בלי WHERE הוא בדרך כלל אסון — כאן זו בדיוק הכוונה.`,
    source:`מצגת 3 — ALTER TABLE + UPDATE` },

  { id:'d11', set:'ddl', topic:'ddl', schema:'practice', check:'text',
    prompt:`הוסיפו לטבלת Enrollments אילוץ בשם chk_grade שמבטיח שהציון בין 0 ל-100 (כולל). (נבדק כטקסט — כתבו פקודת ALTER TABLE אחת.)`,
    solution:`ALTER TABLE Enrollments ADD CONSTRAINT chk_grade CHECK (grade BETWEEN 0 AND 100);`,
    alt:[`ALTER TABLE Enrollments ADD CONSTRAINT chk_grade CHECK (grade >= 0 AND grade <= 100);`,
`ALTER TABLE Enrollments ADD CONSTRAINT chk_grade CHECK ((grade >= 0) AND (grade <= 100));`,
`ALTER TABLE Enrollments ADD CONSTRAINT chk_grade CHECK (grade <= 100 AND grade >= 0);`,
`ALTER TABLE Enrollments ADD CONSTRAINT chk_grade CHECK (0 <= grade AND grade <= 100);`],
    hint:`ALTER TABLE שם_טבלה ADD CONSTRAINT שם_אילוץ CHECK (תנאי)`,
    explain:`אחרי ההוספה, כל INSERT או UPDATE שמכניס ציון מחוץ לטווח ייכשל. אם כבר יש בטבלה שורה שמפרה את התנאי, SQL Server ידחה את הוספת האילוץ (אלא אם מוסיפים WITH NOCHECK). להסרה: ALTER TABLE Enrollments DROP CONSTRAINT chk_grade — לכן כדאי תמיד לתת לאילוץ שם. במצגת 3 בשקף 23 יש פסיק מיותר בסוף הדוגמה — לא להעתיק אותו. (המנוע בדפדפן לא תומך ב-ADD CONSTRAINT, ולכן התרגיל נבדק כטקסט: רווחים ואותיות גדולות/קטנות לא משנים.)`,
    source:`מצגת 3 — ALTER TABLE ADD CONSTRAINT` },

  { id:'d12', set:'ddl', topic:'ddl', schema:'college2', check:'text',
    prompt:`הוסיפו לטבלת students אילוץ פורמט בשם chk_phone: מספר הטלפון חייב להיות בדיוק 10 ספרות ולהתחיל ב-05 (השתמשו ב-LIKE עם [0-9], כמו באילוץ המיקוד במצגת 3). (נבדק כטקסט.)`,
    solution:`ALTER TABLE students ADD CONSTRAINT chk_phone CHECK (phone LIKE '05[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]');`,
    hint:`'05' ואחריו שמונה פעמים [0-9] — כל [0-9] מייצג ספרה אחת בדיוק.`,
    explain:`ב-T-SQL, בתוך LIKE, [0-9] הוא תו בודד מתוך טווח; לכן '05' + שמונה [0-9] = בדיוק 10 ספרות. זה בדיוק הרעיון של CONSTRAINT check_zip CHECK (zipCode LIKE '[0-9][0-9][0-9][0-9][0-9]') במצגת 3. % היה מאפשר כל אורך — לא מתאים לאכיפת פורמט מדויק. שימו לב: [0-9] הוא תוספת של SQL Server; ב-SQLite (המנוע בדפדפן) LIKE לא מכיר סוגריים מרובעים, ולכן התרגיל נבדק כטקסט.`,
    source:`מצגת 3 — CHECK עם LIKE (Regex)` },

  { id:'d13', set:'ddl', topic:'ddl', schema:'practice', check:'text',
    prompt:`קבעו ברירת מחדל 'Tel Aviv' לעמודה city בטבלה Students הקיימת, בתחביר של SQL Server — אילוץ DEFAULT בשם DF_Students_city. (נבדק כטקסט.)`,
    solution:`ALTER TABLE Students ADD CONSTRAINT DF_Students_city DEFAULT 'Tel Aviv' FOR city;`,
    alt:[`ALTER TABLE Students ADD CONSTRAINT DF_Students_city DEFAULT ('Tel Aviv') FOR city;`],
    hint:`ב-T-SQL: ALTER TABLE שם_טבלה ADD CONSTRAINT שם_אילוץ DEFAULT ערך FOR שם_עמודה`,
    explain:`בשקף 22 של מצגת 3 מופיע ALTER TABLE customers ALTER city SET DEFAULT 'Tel-Aviv' — זה תחביר של מנועים אחרים ולא עובד ב-SQL Server. ב-T-SQL ברירת מחדל היא אילוץ, ולכן מוסיפים אותה עם ADD CONSTRAINT … DEFAULT … FOR עמודה. ברירת המחדל משפיעה רק על שורות חדשות שלא מציינות city — לא על שורות קיימות. בתוך CREATE TABLE פשוט כותבים city VARCHAR(50) DEFAULT 'Tel Aviv'.`,
    source:`מצגת 3 — ALTER TABLE (תחביר T-SQL מתוקן)` },

  { id:'d14', set:'ddl', topic:'ddl', schema:'practice', check:'text',
    prompt:`שנו את הגדרת העמודה city בטבלה Students ל-VARCHAR(100) שאינה מאפשרת NULL, בתחביר של SQL Server. (נבדק כטקסט.)`,
    solution:`ALTER TABLE Students ALTER COLUMN city VARCHAR(100) NOT NULL;`,
    hint:`ALTER TABLE שם_טבלה ALTER COLUMN שם_עמודה טיפוס NULL / NOT NULL`,
    explain:`בשקף 22 של מצגת 3 כתוב ALTER TABLE customers ALTER customer_login char[10] NULL — ב-SQL Server חובה המילה COLUMN, והסוג נכתב עם סוגריים עגולים: char(10). המעבר ל-NOT NULL יצליח רק אם אין כרגע NULL בעמודה. שינוי שם עמודה (RENAME COLUMN בשקף) לא קיים ב-T-SQL — שם משתמשים ב-EXEC sp_rename 'Students.city', 'town', 'COLUMN'. הסרת עמודה: ALTER TABLE Students DROP COLUMN city.`,
    source:`מצגת 3 — ALTER TABLE (תחביר T-SQL מתוקן)` },

  { id:'d19', set:'ddl', topic:'ddl', schema:'practice', check:'text',
    prompt:`מחקו לגמרי את הטבלה Teachers (מתרגיל ה-CREATE TABLE) — גם את כל הנתונים וגם את מבנה הטבלה עצמו, כך שאפשר יהיה ליצור אותה מחדש. (נבדק כטקסט — פקודה אחת.)`,
    solution:`DROP TABLE Teachers;`,
    alt:[`DROP TABLE IF EXISTS Teachers;`, `DROP TABLE dbo.Teachers;`],
    hint:`DELETE מוחק שורות בלבד. כדי למחוק את הטבלה עצמה — DROP TABLE.`,
    explain:`שלוש פקודות "מחיקה" שונות: DELETE FROM Teachers מוחק שורות (אפשר עם WHERE) — והטבלה נשארת ריקה ("DELETE doesn't DROP the schema", מצגת 3). TRUNCATE TABLE Teachers מוחק את כל השורות בבת אחת, בלי WHERE — המבנה נשאר. DROP TABLE Teachers (פקודת DDL) מוחק את הטבלה כולה — מבנה, נתונים ואילוצים — ואחריה אפשר להריץ שוב CREATE TABLE Teachers (בלעדיה CREATE ייכשל, כי הטבלה כבר קיימת). אם טבלה אחרת מפנה ל-Teachers במפתח זר, SQL Server יסרב למחוק אותה — קודם מוחקים את המפתח הזר או את הטבלה המפנה. DROP TABLE IF EXISTS קיים מ-SQL Server 2016 ומונע שגיאה אם הטבלה לא קיימת.`,
    source:`מצגת 3 — DROP TABLE` },

  { id:'d15', set:'ddl', topic:'temp', schema:'practice', check:'select',
    prompt:`צרו טבלה זמנית בשם #honor (עם SELECT … INTO) שמכילה את name, course_name, grade לכל הרשמה עם ציון 85 ומעלה. אחר כך הציגו את כל השורות שבה, ממוינות לפי grade בסדר יורד. עמודות בסדר: name, course_name, grade.`,
    solution:`SELECT s.name, c.course_name, e.grade
INTO #honor
FROM Students s
JOIN Enrollments e ON s.student_id = e.student_id
JOIN Courses c ON c.course_id = e.course_id
WHERE e.grade >= 85;

SELECT * FROM #honor ORDER BY grade DESC;`,
    alt:[`CREATE TABLE #honor (name VARCHAR(50), course_name VARCHAR(50), grade INT);
INSERT INTO #honor
SELECT s.name, c.course_name, e.grade
FROM Students s
JOIN Enrollments e ON s.student_id = e.student_id
JOIN Courses c ON c.course_id = e.course_id
WHERE e.grade >= 85;
SELECT name, course_name, grade FROM #honor ORDER BY grade DESC;`],
    hint:`SELECT עמודות INTO #honor FROM … WHERE … ; ואז SELECT * FROM #honor ORDER BY grade DESC;`,
    explain:`התוצאה: Dan SQL 95, Noa Python 94, Maya Python 91, Noa SQL 88. SELECT … INTO יוצר את הטבלה ומעתיק אליה את התוצאה בפקודה אחת (העמודות והטיפוסים נגזרים מה-SELECT). # בתחילת השם = טבלה זמנית: היא קיימת רק בחיבור (session) הנוכחי ונמחקת אוטומטית כשהוא נסגר (## = זמנית גלובלית). אם מריצים שוב באותו חיבור — שגיאה, כי #honor כבר קיימת; מוחקים קודם עם DROP TABLE #honor. טבלאות זמניות שימושיות לפירוק שאילתה מסובכת לשלבים (ראו חלופה בתרגיל "הקורס הטוב ביותר לכל סטודנט").`,
    source:`סילבוס — טבלאות זמניות (SELECT INTO)` },

  { id:'d16', set:'ddl', topic:'temp', schema:'practice', check:'select',
    prompt:`צרו טבלה זמנית #course_stats (course_id INT, students INT, max_grade INT) עם CREATE TABLE, מלאו אותה ב-INSERT … SELECT: לכל קורס — מספר ההרשמות והציון הגבוה ביותר. לבסוף הציגו את שם הקורס, מספר הסטודנטים והציון הגבוה — רק לקורסים עם 2 סטודנטים או יותר. עמודות בסדר: course_name, students, max_grade.`,
    solution:`CREATE TABLE #course_stats (course_id INT, students INT, max_grade INT);

INSERT INTO #course_stats (course_id, students, max_grade)
SELECT course_id, COUNT(*), MAX(grade)
FROM Enrollments
GROUP BY course_id;

SELECT c.course_name, t.students, t.max_grade
FROM #course_stats t
JOIN Courses c ON c.course_id = t.course_id
WHERE t.students >= 2;`,
    alt:[`SELECT course_id, COUNT(*) AS students, MAX(grade) AS max_grade
INTO #course_stats
FROM Enrollments
GROUP BY course_id;
SELECT c.course_name, t.students, t.max_grade
FROM #course_stats t JOIN Courses c ON c.course_id = t.course_id
WHERE t.students >= 2;`],
    hint:`שלוש פקודות: CREATE TABLE #…, INSERT INTO #… SELECT … GROUP BY …, ואז SELECT עם JOIN לטבלה הזמנית.`,
    explain:`התוצאה: SQL 3 95, Java 2 82, Python 2 94 (Networks עם סטודנט אחד מסונן). INSERT … SELECT מכניס את כל שורות התוצאה בבת אחת — בלי VALUES. אחרי שהנתונים המסוכמים בטבלה זמנית, אפשר לסנן אותם ב-WHERE רגיל (במקום HAVING) ולחבר אותם ב-JOIN כמו כל טבלה.`,
    source:`סילבוס — טבלאות זמניות (CREATE TABLE #)` },

  { id:'d17', set:'ddl', topic:'ddl', schema:'practice', check:'text',
    prompt:`כתבו פרוצדורה שמורה (Stored Procedure) בשם GetStudentsByCity שמקבלת פרמטר @city מסוג VARCHAR(50) ומחזירה את name ו-age של הסטודנטים שגרים בעיר הזו. כתבו רק את ה-CREATE PROCEDURE (בלי EXEC). (נבדק כטקסט.)`,
    solution:`CREATE PROCEDURE GetStudentsByCity
  @city VARCHAR(50)
AS
BEGIN
  SELECT name, age
  FROM Students
  WHERE city = @city;
END;`,
    alt:[`CREATE PROC GetStudentsByCity @city VARCHAR(50) AS BEGIN SELECT name, age FROM Students WHERE city = @city; END`,
`CREATE PROCEDURE GetStudentsByCity @city VARCHAR(50) AS BEGIN SELECT name, age FROM Students WHERE city = @city END`,
`CREATE PROC GetStudentsByCity @city VARCHAR(50) AS BEGIN SELECT name, age FROM Students WHERE city = @city END`,
`CREATE PROCEDURE GetStudentsByCity @city VARCHAR(50) AS SELECT name, age FROM Students WHERE city = @city`,
`CREATE PROC GetStudentsByCity @city VARCHAR(50) AS SELECT name, age FROM Students WHERE city = @city`,
`CREATE PROCEDURE GetStudentsByCity (@city VARCHAR(50)) AS BEGIN SELECT name, age FROM Students WHERE city = @city; END`,
`CREATE PROCEDURE dbo.GetStudentsByCity @city VARCHAR(50) AS BEGIN SELECT name, age FROM Students WHERE city = @city; END`],
    hint:`CREATE PROCEDURE שם @פרמטר טיפוס AS BEGIN … END. משתמשים בפרמטר בתוך ה-WHERE כמו בעמודה: city = @city.`,
    explain:`פרוצדורה שמורה היא תוכנית ששמורה בשרת ומורצת בשמה; היא יכולה להכיל פקודות DDL, DML, DCL ו-TCL (מצגת 3, "5 רכיבי SQL"). פרמטרים ומשתנים ב-T-SQL מתחילים ב-@. הרצה: EXEC GetStudentsByCity 'Haifa'; (או EXEC GetStudentsByCity @city = 'Haifa'; ) — תחזיר Maya 25 ו-Dana 24. יתרונות: שימוש חוזר, אבטחה (נותנים הרשאת EXECUTE בלי גישה ישירה לטבלה), תוכנית ביצוע שמורה ופחות תעבורה ברשת. לשינוי: ALTER PROCEDURE (או CREATE OR ALTER), למחיקה: DROP PROCEDURE GetStudentsByCity. ב-SSMS כותבים GO לפני ואחרי, כי CREATE PROCEDURE חייבת להיות הפקודה הראשונה באצווה. PROC הוא קיצור חוקי של PROCEDURE, ו-BEGIN…END אופציונליים. (המנוע בדפדפן לא תומך בפרוצדורות, ולכן נבדק כטקסט — הבודק מקבל כמה ניסוחים נפוצים.)`,
    source:`סילבוס — פרוצדורות שמורות` },

  { id:'d18', set:'ddl', topic:'ddl', schema:'practice', check:'text',
    prompt:`נתונה טבלה Enrollments_Log (log_id INT IDENTITY(1,1) PRIMARY KEY, enrollment_id INT, student_id INT, course_id INT, log_date DATETIME). כתבו טריגר בשם trg_enrollment_insert על הטבלה Enrollments, שאחרי כל INSERT רושם ב-Enrollments_Log את enrollment_id, student_id ו-course_id של השורות שנוספו, ואת התאריך והשעה הנוכחיים (GETDATE()). (נבדק כטקסט.)`,
    solution:`CREATE TRIGGER trg_enrollment_insert
ON Enrollments
AFTER INSERT
AS
BEGIN
  INSERT INTO Enrollments_Log (enrollment_id, student_id, course_id, log_date)
  SELECT enrollment_id, student_id, course_id, GETDATE()
  FROM inserted;
END;`,
    alt:[`CREATE TRIGGER trg_enrollment_insert ON Enrollments FOR INSERT AS BEGIN INSERT INTO Enrollments_Log (enrollment_id, student_id, course_id, log_date) SELECT enrollment_id, student_id, course_id, GETDATE() FROM inserted; END`,
`CREATE TRIGGER trg_enrollment_insert ON Enrollments AFTER INSERT AS BEGIN INSERT INTO Enrollments_Log (enrollment_id, student_id, course_id, log_date) SELECT enrollment_id, student_id, course_id, GETDATE() FROM inserted END`,
`CREATE TRIGGER trg_enrollment_insert ON Enrollments AFTER INSERT AS INSERT INTO Enrollments_Log (enrollment_id, student_id, course_id, log_date) SELECT enrollment_id, student_id, course_id, GETDATE() FROM inserted`,
`CREATE TRIGGER trg_enrollment_insert ON Enrollments FOR INSERT AS INSERT INTO Enrollments_Log (enrollment_id, student_id, course_id, log_date) SELECT enrollment_id, student_id, course_id, GETDATE() FROM inserted`,
`CREATE TRIGGER trg_enrollment_insert ON Enrollments AFTER INSERT AS BEGIN INSERT INTO Enrollments_Log (enrollment_id, student_id, course_id, log_date) SELECT i.enrollment_id, i.student_id, i.course_id, GETDATE() FROM inserted i; END`],
    hint:`CREATE TRIGGER שם ON טבלה AFTER INSERT AS BEGIN … END. השורות החדשות זמינות בטבלה הווירטואלית inserted.`,
    explain:`טריגר הוא קוד שרץ אוטומטית כשקורה אירוע על טבלה (INSERT / UPDATE / DELETE) — אף אחד לא קורא לו ב-EXEC. בתוכו יש שתי טבלאות וירטואליות: inserted (השורות החדשות — ב-INSERT, ובגרסה החדשה ב-UPDATE) ו-deleted (השורות הישנות — ב-DELETE, ובגרסה הישנה ב-UPDATE). ב-SQL Server טריגר רץ פעם אחת לכל פקודה, לא לכל שורה — אם INSERT אחד מוסיף 3 שורות, inserted מכיל 3 שורות; לכן כותבים INSERT … SELECT … FROM inserted ולא VALUES עם משתנים (טעות נפוצה שרושמת רק שורה אחת). log_id לא מופיע ברשימה כי IDENTITY ממספר אותו אוטומטית. AFTER (או FOR — מילה נרדפת) רץ אחרי שהפקודה הצליחה; INSTEAD OF רץ במקום הפקודה (למשל כדי לחסום או לשנות אותה). שימושים: תיעוד (audit), אכיפת חוקים מורכבים, עדכון טבלאות סיכום; בתוך טריגר אפשר לבטל את הפעולה עם ROLLBACK (למשל IF EXISTS (SELECT 1 FROM inserted WHERE grade > 100) … ROLLBACK). (המנוע בדפדפן לא תומך בטריגרים של T-SQL, ולכן נבדק כטקסט.)`,
    source:`סילבוס — טריגרים` },
];
