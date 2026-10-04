/* ============================================================
   קורס 3964 — שאלות כפולות: כל שאלה נפתרת גם ב-SQL וגם ב-MongoDB
   בדיוק כמו ב"עבודת ישור קו" של המרצה ("יש לכתוב עבור כל הצגה גם
   שאילתא ב-SQL וגם שאילתא ב-NOSQL") — זה פורמט המבחן.
   סכימה: college2 (js/college2-data.js) — אותן שורות ב-SQL ובמונגו.
   ------------------------------------------------------------
   חוזה:
   SQLC.dual = [{ id, topic, difficulty(1-3), source, prompt,
                  sql:   { solution, alt?, explain },
                  mongo: { solution, alt?, compare?, ordered?, explain } }]
   topic: filter | join | group | having | anti | top | nulls | dates | distinct | case | multi
   • prompt מציין בדיוק אילו עמודות/שדות להציג ובאיזה סדר.
   • בדיקת SQL: משווים ערכים לפי סדר העמודות (שמות העמודות לא נבדקים);
     סדר השורות נבדק רק כשבפתרון יש ORDER BY.
   • בדיקת מונגו (compare:'values'): שמות השדות לא נבדקים — לכן מותר
     שמזהה יופיע כ-_id; אבל שדה מיותר (למשל _id שלא ביקשו) = תשובה שונה.
   • explain = טקסט רגיל; \n = שורה חדשה (להציג עם white-space: pre-line).
   הפתרונות כתובים בסגנון T-SQL (SQL Server) ומומרים ל-SQLite להרצה.
   הפתרונות אינם רשמיים של המרצה — נכתבו ונבדקו מול הנתונים.
   ============================================================ */
window.SQLC = window.SQLC || {};

SQLC.dual = [

  /* ================== עבודת ישור קו — 6 השאלות ================== */

  { id:'d1', topic:'join', difficulty:2, source:'עבודת ישור קו — שאלה 1 · עבודת MongoDB (PDF) — תרגיל 12',
    prompt:`הציגו את שמות כל הסטודנטים, שמות הקורסים שאליהם הם רשומים ותאריך ההרשמה. יש להציג הרשמות פעילות בלבד (status = 'Active').
פלט (לפי הסדר): firstName, lastName, courseName, enrollmentDate. במונגו: אותם שדות, בלי _id.`,
    sql:{
      solution:`SELECT s.firstName, s.lastName, c.courseName, e.enrollmentDate
FROM enrollments e
JOIN students s ON e.studentId = s.id
JOIN courses  c ON e.courseId  = c.id
WHERE e.status = 'Active';`,
      alt:[
`SELECT s.firstName, s.lastName, c.courseName, e.enrollmentDate
FROM students s
INNER JOIN enrollments e ON s.id = e.studentId
INNER JOIN courses c ON c.id = e.courseId
WHERE e.status = 'Active';`,
`SELECT s.firstName, s.lastName, c.courseName, e.enrollmentDate
FROM students s, enrollments e, courses c
WHERE s.id = e.studentId AND c.id = e.courseId AND e.status = 'Active';`],
      explain:`טבלת הקישור enrollments היא מרכז השאילתה: כל שורה בה = הרשמה אחת של סטודנט לקורס.
מחברים אותה ל-students (e.studentId = s.id) ול-courses (e.courseId = c.id) — שני תנאי JOIN לשלוש טבלאות.
WHERE e.status = 'Active' משאיר רק הרשמות פעילות. בלי הסינון יופיעו גם ההרשמות הלא פעילות של Noa (Marketing) ושל Eyal (Statistics): 15 שורות במקום 13. זו הטעות הנפוצה בשאלה הזו.
INNER JOIN מתאים כאן, כי מבקשים רק סטודנטים שרשומים בפועל (Lior, שלא רשום לשום קורס, לא אמור להופיע).
אפשר לכתוב גם את ה-JOIN בסגנון הישן: כל הטבלאות ב-FROM מופרדות בפסיק, ותנאי הקישור ב-WHERE (ראו פתרון חלופי).`
    },
    mongo:{
      solution:`db.enrollments.aggregate([
  { $match: { status: "Active" } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, firstName: "$student.firstName", lastName: "$student.lastName",
                courseName: "$course.courseName", enrollmentDate: 1 } }
])`,
      alt:[
`db.enrollments.aggregate([
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$student" },
  { $unwind: "$course" },
  { $match: { status: "Active" } },
  { $project: { _id: 0, firstName: "$student.firstName", lastName: "$student.lastName",
                courseName: "$course.courseName", enrollmentDate: "$enrollmentDate" } }
])`],
      explain:`מתחילים מ-enrollments, כמו טבלת הקישור ב-SQL. בוחרים aggregate ולא find, כי צריך לחבר 3 Collections ול-find אין JOIN.
1) $match: { status: "Active" } — סינון כמו WHERE. כדאי לסנן ראשון, כדי שה-$lookup יעבוד על פחות מסמכים. שימו לב: במונגו ההשוואה רגישה לאותיות ("active" ≠ "Active").
2) $lookup ל-students — localField: "studentId" מול foreignField: "_id". התוצאה נשמרת כמערך בשדה student.
3) $unwind: "$student" — הופך את המערך (עם איבר אחד) לאובייקט רגיל, כדי שאפשר יהיה לכתוב "$student.firstName".
4) $lookup + $unwind ל-courses באותו אופן (courseId מול _id).
5) $project — בוחר ומעצב את שדות הפלט: "$student.firstName" שולף שדה מתוך תת-המסמך, ו-_id: 0 מסתיר את מזהה ההרשמה.`
    }
  },

  { id:'d2', topic:'anti', difficulty:2, source:'עבודת ישור קו — שאלה 2 · עבודת MongoDB (PDF) — תרגיל 10 · שיעור NoSQL — חלק ה׳ משימה 6',
    prompt:`מצאו את כל הסטודנטים שאין להם אפילו הרשמה אחת לקורס (גם לא הרשמה לא פעילה).
פלט: id, firstName, lastName (במונגו: _id, firstName, lastName).`,
    sql:{
      solution:`SELECT s.id, s.firstName, s.lastName
FROM students s
LEFT JOIN enrollments e ON s.id = e.studentId
WHERE e.id IS NULL;`,
      alt:[
`SELECT id, firstName, lastName
FROM students
WHERE id NOT IN (SELECT studentId FROM enrollments);`,
`SELECT s.id, s.firstName, s.lastName
FROM students s
WHERE NOT EXISTS (SELECT * FROM enrollments e WHERE e.studentId = s.id);`],
      explain:`זה Anti-Join: מחפשים שורות שאין להן התאמה בטבלה השנייה.
LEFT JOIN שומר את כל הסטודנטים. לסטודנט בלי הרשמה, כל העמודות של enrollments מתמלאות ב-NULL, ו-WHERE e.id IS NULL משאיר רק אותו.
התוצאה: Lior Shalom בלבד. Eyal Katz לא מופיע, כי יש לו הרשמה (לא פעילה), והשאלה מדברת על "אף הרשמה".
חלופות שקולות: NOT IN עם תת-שאילתה, או NOT EXISTS.
זהירות ב-NOT IN: אם תת-השאילתה מחזירה ולו NULL אחד, התוצאה ריקה. NOT EXISTS ו-LEFT JOIN לא סובלים מהבעיה הזו.`
    },
    mongo:{
      solution:`db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $match: { enrollments: { $size: 0 } } },
  { $project: { firstName: 1, lastName: 1 } }
])`,
      alt:[
`db.students.find(
  { _id: { $nin: db.enrollments.distinct("studentId") } },
  { firstName: 1, lastName: 1 }
)`,
`db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $match: { enrollments: { $eq: [] } } },
  { $project: { firstName: 1, lastName: 1 } }
])`],
      explain:`מתחילים מ-students, כי מחפשים סטודנטים. צריך aggregate בשביל $lookup.
1) $lookup — מצרף לכל סטודנט מערך enrollments עם כל ההרשמות שלו (_id מול studentId). לסטודנט בלי הרשמות המערך ריק ([]), וזה המקביל ל-NULL של LEFT JOIN.
2) $match: { enrollments: { $size: 0 } } — משאיר רק סטודנטים שהמערך שלהם ריק.
3) $project — מציג שם פרטי ושם משפחה. _id נשאר, כי הוא מוצג כברירת מחדל.
חלופה קצרה עם find: db.enrollments.distinct("studentId") מחזיר רשימה של כל מי שיש לו הרשמה, ו-$nin בוחר את מי שלא ברשימה. זו המקבילה של NOT IN.`
    }
  },

  { id:'d3', topic:'having', difficulty:2, source:'עבודת ישור קו — שאלה 3',
    prompt:`מצאו את הסטודנטים הרשומים ליותר משני קורסים פעילים.
פלט: studentId, firstName, lastName, activeCourses (מספר ההרשמות הפעילות). במונגו מותר ש-studentId יופיע בשדה _id במקום בשדה נפרד (לא בשניהם).`,
    sql:{
      solution:`SELECT s.id AS studentId, s.firstName, s.lastName, COUNT(*) AS activeCourses
FROM students s
JOIN enrollments e ON s.id = e.studentId
WHERE e.status = 'Active'
GROUP BY s.id, s.firstName, s.lastName
HAVING COUNT(*) > 2;`,
      alt:[
`SELECT s.id, s.firstName, s.lastName, COUNT(e.courseId)
FROM students s
JOIN enrollments e ON s.id = e.studentId
WHERE e.status = 'Active'
GROUP BY s.id, s.firstName, s.lastName
HAVING COUNT(e.courseId) > 2;`,
`SELECT s.id, s.firstName, s.lastName, t.activeCourses
FROM students s
JOIN (SELECT studentId, COUNT(*) AS activeCourses
      FROM enrollments
      WHERE status = 'Active'
      GROUP BY studentId
      HAVING COUNT(*) > 2) t ON s.id = t.studentId;`],
      explain:`סדר הביצוע: WHERE מסנן שורות לפני הקיבוץ (רק הרשמות פעילות) ← GROUP BY יוצר קבוצה לכל סטודנט ← HAVING מסנן קבוצות אחרי הספירה.
"יותר משני" פירושו > 2, לא >= 2.
כל עמודה ב-SELECT שאינה בתוך פונקציית צבירה חייבת להופיע ב-GROUP BY, ולכן מקבצים גם לפי firstName ו-lastName. ב-SQL Server, אם שוכחים, מקבלים שגיאה. המנוע של האתר (SQLite) לא יתריע על כך, אז הקפידו בעצמכם.
אי אפשר לכתוב WHERE COUNT(*) > 2, כי פונקציות צבירה לא מותרות ב-WHERE.
התוצאה: David Levi ו-Itai Friedman, עם 3 קורסים פעילים כל אחד.
זהירות: בנתונים שלנו גם שאילתה בלי WHERE e.status = 'Active' מחזירה במקרה אותה תוצאה, כי אף סטודנט לא מגיע ל-3 הרשמות בעזרת הרשמה לא פעילה. לכן הבודק באתר לא יתפוס את הטעות הזו. במבחן חובה לסנן, כי השאלה מדברת על קורסים פעילים.`
    },
    mongo:{
      solution:`db.enrollments.aggregate([
  { $match: { status: "Active" } },
  { $group: { _id: "$studentId", activeCourses: { $sum: 1 } } },
  { $match: { activeCourses: { $gt: 2 } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: { _id: 0, studentId: "$_id", firstName: "$student.firstName",
                lastName: "$student.lastName", activeCourses: 1 } }
])`,
      alt:[
`db.enrollments.aggregate([
  { $match: { status: "Active" } },
  { $group: { _id: "$studentId", activeCourses: { $sum: 1 } } },
  { $match: { activeCourses: { $gt: 2 } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: { firstName: "$student.firstName", lastName: "$student.lastName", activeCourses: 1 } }
])`],
      explain:`מתחילים מ-enrollments, כי סופרים הרשמות.
1) $match: { status: "Active" } — רק הרשמות פעילות, כמו WHERE.
2) $group — _id: "$studentId" יוצר קבוצה לכל סטודנט, ו-activeCourses: { $sum: 1 } מוסיף 1 לכל מסמך, בדיוק כמו COUNT(*).
3) $match אחרי $group — מסנן קבוצות, כמו HAVING: { activeCourses: { $gt: 2 } }.
4) $lookup + $unwind ל-students — להביא את השם. ה-_id של הקבוצה הוא ה-studentId.
5) $project — מעצב את הפלט. studentId: "$_id" מעתיק את מזהה הקבוצה לשדה בשם ברור.
הכלל: $match לפני $group = WHERE, ו-$match אחרי $group = HAVING.`
    }
  },

  { id:'d4', topic:'multi', difficulty:3, source:'עבודת ישור קו — שאלה 4',
    prompt:`הציגו את כל ההגשות עם שם הסטודנט, שם הקורס והמרצה.
פלט: submissionId, studentName, courseName, lecturerName. שמות מלאים בפורמט "שם פרטי, רווח, שם משפחה" (למשל "David Levi"). במונגו מותר שמזהה ההגשה יופיע בשדה _id במקום בשדה נפרד (לא בשניהם).`,
    sql:{
      solution:`SELECT sub.id AS submissionId,
       st.firstName + ' ' + st.lastName AS studentName,
       c.courseName,
       l.firstName + ' ' + l.lastName AS lecturerName
FROM submissions sub
JOIN students    st ON sub.studentId    = st.id
JOIN assignments a  ON sub.assignmentId = a.id
JOIN courses     c  ON a.courseId       = c.id
JOIN lecturers   l  ON c.lecturerId     = l.id;`,
      alt:[
`SELECT sub.id, st.firstName + ' ' + st.lastName, c.courseName, l.firstName + ' ' + l.lastName
FROM submissions sub
JOIN students  st ON sub.studentId = st.id
JOIN courses   c  ON sub.courseId  = c.id
JOIN lecturers l  ON c.lecturerId  = l.id;`,
`SELECT sub.id, CONCAT(st.firstName, ' ', st.lastName), c.courseName, CONCAT(l.firstName, ' ', l.lastName)
FROM submissions sub
JOIN students    st ON sub.studentId    = st.id
JOIN assignments a  ON sub.assignmentId = a.id
JOIN courses     c  ON a.courseId       = c.id
JOIN lecturers   l  ON c.lecturerId     = l.id;`],
      explain:`בסכמה של עבודת ישור קו (DOCX), בטבלת submissions אין עמודת courseId. לכן הדרך לקורס עוברת דרך המטלה:
submissions → assignments (assignmentId) → courses (courseId) → lecturers (lecturerId), ובנוסף submissions → students.
5 טבלאות דורשות 4 תנאי JOIN. כלל אצבע: מספר הטבלאות פחות 1.
שרשור שם מלא ב-T-SQL: firstName + ' ' + lastName, או CONCAT(firstName, ' ', lastName).
בנתונים שלנו, וגם בעבודת ה-PDF, יש גם sub.courseId. זה קיצור דרך שנותן אותה תוצאה (ראו פתרון חלופי), אבל במבחן לפי סכמת ה-DOCX הוא לא קיים.
התוצאה כוללת את כל 16 ההגשות, גם את אלה שעוד לא נבדקו.`
    },
    mongo:{
      solution:`db.submissions.aggregate([
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
      lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] } } }
])`,
      alt:[
`db.submissions.aggregate([
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "lecturers", localField: "course.lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: {
      studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      courseName: "$course.courseName",
      lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] } } }
])`],
      explain:`מתחילים מ-submissions, כי כל שורה בפלט היא הגשה. כל JOIN של SQL הופך לזוג $lookup + $unwind.
1) $lookup + $unwind ל-students — studentId מול _id, כדי לקבל את שם הסטודנט.
2) $lookup + $unwind ל-assignments — assignmentId מול _id, כדי לדעת לאיזה קורס שייכת המטלה.
3) $lookup + $unwind ל-courses — localField: "assignment.courseId". אפשר להשתמש בשדה מתוך תת-מסמך שנוצר בשלב קודם.
4) $lookup + $unwind ל-lecturers — localField: "course.lecturerId".
5) $project — $concat: ["$student.firstName", " ", "$student.lastName"] בונה שם מלא, המקביל ל-+ ב-T-SQL. _id נשאר והוא מזהה ההגשה.
בלי $unwind, השדה student היה מערך, ו-"$student.firstName" היה מחזיר מערך של שמות ולא מחרוזת.
קיצור דרך: ההגשות שלנו מכילות גם courseId (כמו ב-PDF), ואז אפשר לדלג על assignments (ראו פתרון חלופי).`
    }
  },

  { id:'d5', topic:'anti', difficulty:2, source:'עבודת ישור קו — שאלה 5',
    prompt:`מצאו את כל המטלות שאין להן אף הגשה.
פלט: id, title, courseId (במונגו: _id, title, courseId).`,
    sql:{
      solution:`SELECT a.id, a.title, a.courseId
FROM assignments a
LEFT JOIN submissions sub ON a.id = sub.assignmentId
WHERE sub.id IS NULL;`,
      alt:[
`SELECT id, title, courseId
FROM assignments
WHERE id NOT IN (SELECT assignmentId FROM submissions);`,
`SELECT a.id, a.title, a.courseId
FROM assignments a
WHERE NOT EXISTS (SELECT * FROM submissions sub WHERE sub.assignmentId = a.id);`],
      explain:`אותו דפוס Anti-Join כמו בשאלה 2, הפעם בין assignments ל-submissions.
LEFT JOIN שומר את כל המטלות. למטלה בלי הגשה, sub.id יוצא NULL, ו-WHERE sub.id IS NULL משאיר רק אותה.
בודקים IS NULL על עמודת המפתח של הטבלה הימנית (sub.id), כי היא אף פעם לא NULL בשורה אמיתית. אם תבדקו sub.grade IS NULL תקבלו בטעות גם הגשות שעוד לא נבדקו.
התוצאה: Stored Procedures (מטלה 7, קורס SQL Server).`
    },
    mongo:{
      solution:`db.assignments.aggregate([
  { $lookup: { from: "submissions", localField: "_id", foreignField: "assignmentId", as: "submissions" } },
  { $match: { submissions: { $size: 0 } } },
  { $project: { title: 1, courseId: 1 } }
])`,
      alt:[
`db.assignments.find(
  { _id: { $nin: db.submissions.distinct("assignmentId") } },
  { title: 1, courseId: 1 }
)`],
      explain:`מתחילים מ-assignments, כי מחפשים מטלות.
1) $lookup — לכל מטלה מצורף מערך submissions עם כל ההגשות שלה (_id מול assignmentId).
2) $match: { submissions: { $size: 0 } } — רק מטלות שהמערך שלהן ריק, כלומר אין להן אף הגשה.
3) $project — מציג title ו-courseId (_id מוצג כברירת מחדל).
חלופה עם find: distinct("assignmentId") על submissions מחזיר את כל המטלות שהוגשו, ו-$nin בוחר את השאר.`
    }
  },

  { id:'d6', topic:'multi', difficulty:3, source:'עבודת ישור קו — שאלה 6',
    prompt:`הציגו ממוצע ציונים לכל קורס, כולל שם הקורס ושם המרצה.
פלט: courseName, lecturerName ("שם פרטי, רווח, שם משפחה"), averageGrade (במונגו בלי _id). יוצגו רק קורסים שיש להם הגשות. הגשות שטרם נבדקו (grade = NULL) לא נכנסות לממוצע.`,
    sql:{
      solution:`SELECT c.courseName,
       l.firstName + ' ' + l.lastName AS lecturerName,
       AVG(sub.grade) AS averageGrade
FROM submissions sub
JOIN assignments a ON sub.assignmentId = a.id
JOIN courses     c ON a.courseId       = c.id
JOIN lecturers   l ON c.lecturerId     = l.id
GROUP BY c.id, c.courseName, l.firstName, l.lastName;`,
      alt:[
`SELECT c.courseName, l.firstName + ' ' + l.lastName, AVG(sub.grade)
FROM submissions sub
JOIN courses   c ON sub.courseId  = c.id
JOIN lecturers l ON c.lecturerId  = l.id
GROUP BY c.id, c.courseName, l.firstName, l.lastName;`,
`SELECT c.courseName, l.firstName + ' ' + l.lastName, AVG(sub.grade)
FROM submissions sub
JOIN assignments a ON sub.assignmentId = a.id
JOIN courses     c ON a.courseId       = c.id
JOIN lecturers   l ON c.lecturerId     = l.id
WHERE sub.grade IS NOT NULL
GROUP BY c.id, c.courseName, l.firstName, l.lastName;`],
      explain:`מסלול ה-JOIN זהה לשאלה 4: דרך assignments, כי בסכמת ה-DOCX אין courseId ב-submissions.
AVG מתעלם אוטומטית מ-NULL. לכן ההגשה של Maya ב-MongoDB וההגשה של Shira ב-Marketing, שעוד לא נבדקו, לא מורידות את הממוצע: Marketing = 70 ולא 35.
ב-GROUP BY מקבצים לפי c.id (המפתח), וגם לפי כל עמודה לא-מצטברת שמופיעה ב-SELECT (courseName, firstName, lastName).
Cyber Security לא מופיע, כי אין לו הגשות ו-INNER JOIN מסנן אותו.
grade מוגדר DECIMAL(5,2), ולכן AVG מחזיר שבר (85.5). ב-SQL Server הוא יוצג כ-85.500000. אילו העמודה הייתה INT, SQL Server היה חותך את הממוצע למספר שלם (85). במנוע שבאתר (SQLite) הממוצע תמיד עשרוני.`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $lookup: { from: "assignments", localField: "assignmentId", foreignField: "_id", as: "assignment" } },
  { $unwind: "$assignment" },
  { $group: { _id: "$assignment.courseId", averageGrade: { $avg: "$grade" } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "lecturers", localField: "course.lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: { _id: 0, courseName: "$course.courseName",
                lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] },
                averageGrade: 1 } }
])`,
      alt:[
`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "lecturers", localField: "course.lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: { _id: 0, courseName: "$course.courseName",
                lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] },
                averageGrade: 1 } }
])`],
      explain:`מתחילים מ-submissions, כי שם נמצאים הציונים.
1) $lookup + $unwind ל-assignments — כדי לדעת לאיזה קורס שייכת כל הגשה (assignment.courseId).
2) $group — _id: "$assignment.courseId" יוצר קבוצה לכל קורס, ו-averageGrade: { $avg: "$grade" } מחשב ממוצע. $avg מתעלם מ-null, בדיוק כמו AVG.
3) $lookup + $unwind ל-courses — ה-_id של הקבוצה הוא courseId, וכך מקבלים את courseName.
4) $lookup + $unwind ל-lecturers — לפי course.lecturerId.
5) $project — courseName, lecturerName עם $concat, ו-averageGrade.
טיפ ביצועים: עושים $group לפני ה-$lookup של הקורס והמרצה. כך מצרפים 5 מסמכים (קבוצות) ולא 16 הגשות.
אם יש courseId בהגשה (PDF), אפשר לקבץ ישר לפי "$courseId" (ראו פתרון חלופי).`
    }
  },

  /* ================== עבודת MongoDB (PDF) + שיעור NoSQL ================== */

  { id:'d7', topic:'filter', difficulty:1, source:'עבודת MongoDB (PDF) — תרגילים 1–2',
    prompt:`הציגו את כל הסטודנטים שגרים בתל אביב (city = "Tel Aviv"), עם כל השדות.
פלט: כל העמודות (SELECT *) או המסמכים המלאים.`,
    sql:{
      solution:`SELECT * FROM students WHERE city = 'Tel Aviv';`,
      alt:[`SELECT id, firstName, lastName, email, phone, city, age, registrationYear FROM students WHERE city = 'Tel Aviv';`],
      explain:`SELECT * מחזיר את כל העמודות, ו-WHERE מסנן שורות.
ב-SQL מחרוזת נכתבת בגרש בודד: 'Tel Aviv'.
ב-SQL Server ההשוואה בדרך כלל לא רגישה לאותיות גדולות/קטנות (collation ברירת מחדל), כך ש-'tel aviv' יחזיר אותה תוצאה. במונגו ההשוואה רגישה! גם במנוע של האתר (SQLite) ההשוואה עם = רגישה, לכן כתבו בדיוק 'Tel Aviv'.
תרגיל 1 ב-PDF ("הציגו את כל הסטודנטים") הוא אותה שאילתה בלי WHERE: SELECT * FROM students, ובמונגו db.students.find().`
    },
    mongo:{
      solution:`db.students.find({ city: "Tel Aviv" })`,
      alt:[`db.students.find({ city: { $eq: "Tel Aviv" } })`, `db.students.aggregate([ { $match: { city: "Tel Aviv" } } ])`],
      explain:`מתחילים מ-students ובוחרים find, כי יש רק סינון בלי חישוב או חיבור.
find(filter) — הארגומנט הראשון הוא אובייקט התנאי, המקביל ל-WHERE.
{ city: "Tel Aviv" } הוא קיצור של { city: { $eq: "Tel Aviv" } }.
אין ארגומנט שני (projection), ולכן כל השדות מוצגים, כולל _id. זה המקביל ל-SELECT *.
אותו דבר עם aggregate: [{ $match: { city: "Tel Aviv" } }]. $match הוא ה-WHERE של ה-pipeline.`
    }
  },

  { id:'d8', topic:'having', difficulty:2, source:'עבודת MongoDB (PDF) — תרגיל 5 · שיעור NoSQL — חלק ה׳ משימה 5',
    prompt:`מצאו את כל הסטודנטים שרשומים ליותר מקורס אחד. סופרים את כל ההרשמות, גם הלא פעילות (כמו בתרגיל 5 ב-PDF).
פלט: studentId, coursesCount. במונגו מותר ש-studentId יופיע בשדה _id במקום בשדה נפרד (לא בשניהם).`,
    sql:{
      solution:`SELECT studentId, COUNT(*) AS coursesCount
FROM enrollments
GROUP BY studentId
HAVING COUNT(*) > 1;`,
      alt:[
`SELECT studentId, COUNT(courseId) AS coursesCount
FROM enrollments
GROUP BY studentId
HAVING COUNT(courseId) > 1;`,
`SELECT studentId, COUNT(DISTINCT courseId)
FROM enrollments
GROUP BY studentId
HAVING COUNT(DISTINCT courseId) > 1;`],
      explain:`אין צורך ב-JOIN, כי studentId כבר נמצא ב-enrollments.
GROUP BY studentId יוצר קבוצה לכל סטודנט, COUNT(*) סופר את ההרשמות שלו, ו-HAVING COUNT(*) > 1 משאיר רק מי שרשום ליותר מקורס אחד.
התוצאה: 1 (3 הרשמות), 2 (2), 4 (2), 7 (3). שימו לב: אצל Noa (2) אחת ההרשמות לא פעילה. אם השאלה הייתה "פעילים", היה צריך להוסיף WHERE status = 'Active', והיא הייתה יוצאת מהרשימה.`
    },
    mongo:{
      solution:`db.enrollments.aggregate([
  { $group: { _id: "$studentId", coursesCount: { $sum: 1 } } },
  { $match: { coursesCount: { $gt: 1 } } },
  { $project: { _id: 0, studentId: "$_id", coursesCount: 1 } }
])`,
      alt:[
`db.enrollments.aggregate([
  { $group: { _id: "$studentId", coursesCount: { $sum: 1 } } },
  { $match: { coursesCount: { $gt: 1 } } }
])`],
      explain:`מתחילים מ-enrollments. צריך aggregate, כי find לא יודע לקבץ ולספור. זה גם הרמז בשיעור: "כאן כנראה תצטרכו להשתמש ב-Aggregation".
1) $group — _id: "$studentId" יוצר קבוצה לכל סטודנט, ו-coursesCount: { $sum: 1 } סופר מסמכים.
2) $match: { coursesCount: { $gt: 1 } } — מסנן קבוצות אחרי הקיבוץ, כמו HAVING.
3) $project — משנה את שם _id ל-studentId, כמו שה-PDF מבקש (studentId, coursesCount). השלב לא חובה, כי הערכים זהים.`
    }
  },

  { id:'d9', topic:'group', difficulty:1, source:'עבודת MongoDB (PDF) — תרגיל 6',
    prompt:`חשבו כמה סטודנטים רשומים לכל קורס (כל ההרשמות, גם הלא פעילות).
פלט: courseId, studentsCount. במונגו מותר ש-courseId יופיע בשדה _id במקום בשדה נפרד (לא בשניהם). אין להציג קורס שאין לו הרשמות (כמו בתרגיל ב-PDF).`,
    sql:{
      solution:`SELECT courseId, COUNT(*) AS studentsCount
FROM enrollments
GROUP BY courseId;`,
      alt:[`SELECT courseId, COUNT(studentId) FROM enrollments GROUP BY courseId;`],
      explain:`GROUP BY courseId יוצר קבוצה לכל קורס, ו-COUNT(*) סופר כמה הרשמות יש בה.
התוצאה: קורס 1 = 5, קורס 2 = 3, קורס 3 = 2, קורס 4 = 2, קורס 5 = 3.
קורס 6 (Cyber Security) לא מופיע, כי אין לו שורות ב-enrollments. כדי להציג אותו עם 0 צריך להתחיל מטבלת courses עם LEFT JOIN ו-COUNT(e.id), או עם תת-שאילתה (ראו את השאלה על מספר הסטודנטים, המטלות וההגשות בכל קורס).`
    },
    mongo:{
      solution:`db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } }
])`,
      alt:[
`db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $project: { _id: 0, courseId: "$_id", studentsCount: 1 } }
])`],
      explain:`שלב אחד בלבד:
$group — _id: "$courseId" קובע לפי מה מקבצים (כמו GROUP BY courseId), ו-studentsCount: { $sum: 1 } מוסיף 1 לכל מסמך בקבוצה (כמו COUNT(*)).
התוצאה בסגנון שה-PDF מבקש: courseId ← מספר סטודנטים. בפלט, ה-courseId נמצא בשדה _id.
אפשר להוסיף $project כדי לשנות את _id לשם courseId.`
    }
  },

  { id:'d10', topic:'having', difficulty:2, source:'עבודת MongoDB (PDF) — תרגיל 7',
    prompt:`מצאו את כל הקורסים שבהם רשומים יותר מ-2 סטודנטים (כל ההרשמות).
פלט: courseName, studentsCount (במונגו בלי _id).`,
    sql:{
      solution:`SELECT c.courseName, COUNT(*) AS studentsCount
FROM courses c
JOIN enrollments e ON c.id = e.courseId
GROUP BY c.id, c.courseName
HAVING COUNT(*) > 2;`,
      alt:[
`SELECT c.courseName, t.studentsCount
FROM courses c
JOIN (SELECT courseId, COUNT(*) AS studentsCount
      FROM enrollments
      GROUP BY courseId
      HAVING COUNT(*) > 2) t ON c.id = t.courseId;`],
      explain:`JOIN ל-courses נותן את שם הקורס. מקבצים לפי c.id וגם לפי c.courseName, כי היא מופיעה ב-SELECT.
HAVING COUNT(*) > 2: "יותר מ-2" פירושו לפחות 3.
התוצאה: MongoDB (5), SQL Server (3), Statistics (3).
מלכודת: אם סופרים רק הרשמות פעילות, ל-Statistics יש רק 2 (ההרשמה של Eyal לא פעילה), והוא נעלם. קראו היטב מה סופרים.`
    },
    mongo:{
      solution:`db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $match: { studentsCount: { $gt: 2 } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, courseName: "$course.courseName", studentsCount: 1 } }
])`,
      explain:`1) $group לפי courseId עם $sum: 1 — ספירת הרשמות לכל קורס.
2) $match: { studentsCount: { $gt: 2 } } — כמו HAVING.
3) $lookup ל-courses — ה-_id של הקבוצה הוא ה-courseId, ומחברים אותו ל-_id של הקורס.
4) $unwind — הופך את מערך course לאובייקט.
5) $project — courseName ו-studentsCount, בלי _id.
סינון לפני $lookup = פחות מסמכים לחבר.`
    }
  },

  { id:'d11', topic:'group', difficulty:2, source:'עבודת MongoDB (PDF) — תרגילים 8–9',
    prompt:`לכל קורס חשבו: ממוצע ציונים, הציון הגבוה ביותר, הציון הנמוך ביותר ומספר ההגשות. מספר ההגשות כולל גם הגשות שטרם נבדקו.
פלט: courseId, averageGrade, maxGrade, minGrade, submissionsCount. במונגו מותר ש-courseId יופיע בשדה _id במקום בשדה נפרד (לא בשניהם).`,
    sql:{
      solution:`SELECT courseId,
       AVG(grade) AS averageGrade,
       MAX(grade) AS maxGrade,
       MIN(grade) AS minGrade,
       COUNT(*)   AS submissionsCount
FROM submissions
GROUP BY courseId;`,
      alt:[
`SELECT sub.courseId, AVG(sub.grade), MAX(sub.grade), MIN(sub.grade), COUNT(sub.id)
FROM submissions sub
GROUP BY sub.courseId;`],
      explain:`כמה פונקציות צבירה על אותה קבוצה, ב-SELECT אחד.
COUNT(*) סופר שורות, כולל הגשה עם grade = NULL: בקורס MongoDB יש 7 הגשות. COUNT(grade) היה סופר רק ציונים קיימים (6). זה ההבדל החשוב בין השניים!
AVG, MAX ו-MIN מתעלמים מ-NULL. בקורס MongoDB: ממוצע 83, מקסימום 100, מינימום 60.
משתמשים ב-courseId שקיים ב-submissions לפי עבודת ה-PDF. בסכמת ה-DOCX היה צריך JOIN ל-assignments.
תרגיל 8 הוא אותה שאילתה עם averageGrade בלבד.`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      averageGrade: { $avg: "$grade" },
      maxGrade: { $max: "$grade" },
      minGrade: { $min: "$grade" },
      submissionsCount: { $sum: 1 } } }
])`,
      alt:[
`db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      averageGrade: { $avg: "$grade" },
      maxGrade: { $max: "$grade" },
      minGrade: { $min: "$grade" },
      submissionsCount: { $sum: 1 } } },
  { $project: { _id: 0, courseId: "$_id", averageGrade: 1, maxGrade: 1, minGrade: 1, submissionsCount: 1 } }
])`],
      explain:`שלב $group אחד עם כמה פונקציות צבירה (accumulators):
• _id: "$courseId" — מקבצים לפי קורס.
• $avg, $max, $min על "$grade" — מתעלמים מ-null, כמו ב-SQL.
• submissionsCount: { $sum: 1 } — סופר כל מסמך, כולל הגשות עם grade: null. זה המקביל ל-COUNT(*).
אין צורך ב-$lookup, כי courseId כבר נמצא בכל הגשה (לפי ה-PDF).
שמות השדות זהים לדוגמה שבתרגיל 9: averageGrade, maxGrade, minGrade, submissionsCount.`
    }
  },

  { id:'d12', topic:'top', difficulty:2, source:'עבודת MongoDB (PDF) — תרגיל 13',
    prompt:`מצאו את שלושת הקורסים עם מספר הסטודנטים הגדול ביותר (כל ההרשמות).
פלט: courseName, studentsCount (במונגו בלי _id), ממוינים מהגדול לקטן. בשוויון, ממיינים לפי courseName בסדר עולה.`,
    sql:{
      solution:`SELECT TOP 3 c.courseName, COUNT(*) AS studentsCount
FROM courses c
JOIN enrollments e ON c.id = e.courseId
GROUP BY c.id, c.courseName
ORDER BY studentsCount DESC, c.courseName;`,
      alt:[
`SELECT TOP 3 c.courseName, COUNT(e.id) AS studentsCount
FROM enrollments e
JOIN courses c ON e.courseId = c.id
GROUP BY c.id, c.courseName
ORDER BY COUNT(e.id) DESC, c.courseName ASC;`],
      explain:`TOP 3 בלי ORDER BY חסר משמעות: יחזרו 3 שורות שרירותיות. קודם ממיינים, ואז לוקחים את השלוש הראשונות.
ב-ORDER BY מותר להשתמש בכינוי (studentsCount), אבל ב-WHERE וב-HAVING לא.
ל-SQL Server ול-Statistics יש אותו מספר (3), ולכן מיון משני לפי שם הופך את התוצאה לחד-משמעית.
הרחבה: TOP 3 WITH TIES מחזיר גם קורסים שקשורים במקום השלישי. השוויון נבדק לפי כל עמודות ה-ORDER BY, ולכן זה רלוונטי רק כשממיינים לפי studentsCount בלבד.
הערה: LIMIT 3 הוא תחביר של MySQL/SQLite. ב-SQL Server כותבים TOP. האתר ממיר את TOP ל-LIMIT מאחורי הקלעים.`
    },
    mongo:{
      solution:`db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, courseName: "$course.courseName", studentsCount: 1 } },
  { $sort: { studentsCount: -1, courseName: 1 } },
  { $limit: 3 }
])`,
      alt:[
`db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $sort: { studentsCount: -1, "course.courseName": 1 } },
  { $limit: 3 },
  { $project: { _id: 0, courseName: "$course.courseName", studentsCount: 1 } }
])`],
      explain:`1) $group לפי courseId עם $sum: 1 — כמה הרשמות לכל קורס.
2) $lookup + $unwind ל-courses — להביא את courseName.
3) $project — courseName ו-studentsCount.
4) $sort: { studentsCount: -1, courseName: 1 } — 1- = יורד (DESC), 1 = עולה (ASC). המפתח השני שובר שוויון.
5) $limit: 3 — שלוש התוצאות הראשונות, כמו TOP 3.
ב-pipeline הסדר קובע: $sort חייב לבוא לפני $limit.`
    }
  },

  { id:'d13', topic:'group', difficulty:3, source:'עבודת MongoDB (PDF) — תרגיל 14 · שיעור NoSQL — חלק ה׳ משימה 8',
    prompt:`חשבו את ממוצע הציונים של כל סטודנט, רק מהגשות שנבדקו (grade לא NULL).
פלט: studentName ("David Levi"), averageGrade מעוגל ל-2 ספרות אחרי הנקודה (במונגו בלי _id). סטודנט בלי אף ציון לא יופיע.`,
    sql:{
      solution:`SELECT s.firstName + ' ' + s.lastName AS studentName,
       CAST(AVG(sub.grade) AS DECIMAL(5,2)) AS averageGrade
FROM students s
JOIN submissions sub ON s.id = sub.studentId
WHERE sub.grade IS NOT NULL
GROUP BY s.id, s.firstName, s.lastName;`,
      alt:[
`SELECT s.firstName + ' ' + s.lastName AS studentName, ROUND(AVG(sub.grade), 2) AS averageGrade
FROM students s
JOIN submissions sub ON s.id = sub.studentId
WHERE sub.grade IS NOT NULL
GROUP BY s.id, s.firstName, s.lastName;`,
`SELECT CONCAT(s.firstName, ' ', s.lastName), CAST(AVG(sub.grade) AS DECIMAL(5,2))
FROM submissions sub
JOIN students s ON sub.studentId = s.id
WHERE sub.grade IS NOT NULL
GROUP BY s.id, s.firstName, s.lastName;`],
      explain:`JOIN בין students ל-submissions, ו-WHERE sub.grade IS NOT NULL משאיר רק הגשות שנבדקו.
מקבצים לפי s.id, ולא רק לפי השם, כי שני סטודנטים יכולים להיקרא אותו דבר. firstName ו-lastName נכנסים ל-GROUP BY כי הם ב-SELECT.
CAST(AVG(...) AS DECIMAL(5,2)) מעגל ל-2 ספרות: אצל Itai הממוצע 253/3 = 84.333..., והפלט הוא 84.33. אפשר גם ROUND(AVG(...), 2).
בלי ה-WHERE, Shira (שיש לה רק הגשה שלא נבדקה) הייתה מופיעה עם ממוצע NULL.
Maya: (85 + 90) / 2 = 87.5. ההגשה שלה שלא נבדקה לא נספרת. (87.5 הוא גם הערך שמופיע בדוגמת הפלט של תרגיל 14 ב-PDF.)`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$studentId", averageGrade: { $avg: "$grade" } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: { _id: 0,
                studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
                averageGrade: { $round: ["$averageGrade", 2] } } }
])`,
      explain:`מתחילים מ-submissions, כי שם הציונים, ומצרפים את שם הסטודנט רק בסוף.
1) $match: { grade: { $ne: null } } — רק הגשות שנבדקו.
2) $group — _id: "$studentId" ו-averageGrade: { $avg: "$grade" }.
3) $lookup ל-students — ה-_id של הקבוצה הוא ה-studentId.
4) $unwind — מערך student הופך לאובייקט.
5) $project — studentName עם $concat (שם פרטי + רווח + שם משפחה), ו-$round: ["$averageGrade", 2] מעגל ל-2 ספרות.
בלי שלב 1, במונגו אמיתי $avg של קבוצה שכל הערכים שלה null מחזיר null, ו-Shira הייתה מופיעה עם averageGrade: null. (בסימולטור של האתר היא תופיע עם 0, וגם זו תשובה שגויה.)`
    }
  },

  { id:'d14', topic:'multi', difficulty:3, source:'עבודת MongoDB (PDF) — תרגיל 15 · שיעור NoSQL — שאלה 8',
    prompt:`לכל סטודנט, הציגו את הקורס שבו ממוצע הציונים שלו הוא הגבוה ביותר (רק הגשות שנבדקו).
פלט: studentName ("David Levi"), bestCourse (שם הקורס), averageGrade (הממוצע שלו באותו קורס). במונגו בלי _id.`,
    sql:{
      solution:`SELECT studentId, courseId, AVG(grade) AS avgGrade
INTO #studentCourseAvg
FROM submissions
WHERE grade IS NOT NULL
GROUP BY studentId, courseId;

SELECT s.firstName + ' ' + s.lastName AS studentName,
       c.courseName AS bestCourse,
       t.avgGrade   AS averageGrade
FROM #studentCourseAvg t
JOIN students s ON t.studentId = s.id
JOIN courses  c ON t.courseId  = c.id
WHERE t.avgGrade = (SELECT MAX(t2.avgGrade)
                    FROM #studentCourseAvg t2
                    WHERE t2.studentId = t.studentId);`,
      alt:[
`WITH studentCourseAvg AS (
  SELECT studentId, courseId, AVG(grade) AS avgGrade
  FROM submissions
  WHERE grade IS NOT NULL
  GROUP BY studentId, courseId
)
SELECT s.firstName + ' ' + s.lastName, c.courseName, t.avgGrade
FROM studentCourseAvg t
JOIN students s ON t.studentId = s.id
JOIN courses  c ON t.courseId  = c.id
WHERE t.avgGrade = (SELECT MAX(t2.avgGrade) FROM studentCourseAvg t2 WHERE t2.studentId = t.studentId);`,
`SELECT s.firstName + ' ' + s.lastName, c.courseName, t.avgGrade
FROM (SELECT studentId, courseId, AVG(grade) AS avgGrade
      FROM submissions
      WHERE grade IS NOT NULL
      GROUP BY studentId, courseId) t
JOIN students s ON t.studentId = s.id
JOIN courses  c ON t.courseId  = c.id
WHERE t.avgGrade = (SELECT MAX(x.avgGrade)
                    FROM (SELECT studentId, AVG(grade) AS avgGrade
                          FROM submissions
                          WHERE grade IS NOT NULL
                          GROUP BY studentId, courseId) x
                    WHERE x.studentId = t.studentId);`],
      explain:`שאלה בשני שלבים: "המקסימום בתוך כל קבוצה".
שלב 1: טבלה זמנית #studentCourseAvg עם ממוצע לכל זוג (סטודנט, קורס): GROUP BY studentId, courseId. ב-T-SQL, SELECT ... INTO #name יוצר טבלה זמנית מתוצאת השאילתה. ב-SQL Server הטבלה קיימת עד סוף החיבור (session), ולכן כדי להריץ שוב צריך קודם DROP TABLE #studentCourseAvg.
שלב 2: מכל השורות של סטודנט, משאירים את זו שהממוצע שלה שווה למקסימום שלו. תת-שאילתה מתואמת (correlated): t2.studentId = t.studentId מחשבת את המקסימום בנפרד לכל סטודנט.
אותו רעיון אפשר לכתוב עם CTE (WITH ... AS) או עם טבלה נגזרת ב-FROM (ראו פתרונות חלופיים).
אם לסטודנט יש שני קורסים עם אותו ממוצע מקסימלי, יופיעו שניהם. בנתונים שלנו אין שוויון כזה.
התוצאה: David → Python 92, Noa → MongoDB 78, Yossi → SQL Server 65, Maya → Python 90, Omer → Statistics 90, Itai → MongoDB 100, Tamar → MongoDB 60.`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: { studentId: "$studentId", courseId: "$courseId" }, avgGrade: { $avg: "$grade" } } },
  { $lookup: { from: "courses", localField: "_id.courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $sort: { avgGrade: -1 } },
  { $group: { _id: "$_id.studentId", bestCourse: { $first: "$course.courseName" }, averageGrade: { $first: "$avgGrade" } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: { _id: 0,
                studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
                bestCourse: 1, averageGrade: 1 } }
])`,
      ordered:false,
      explain:`זה ה-pipeline שהשיעור דורש: $match, $group, $lookup, $unwind, $sort, $group, $project. שימו לב ש-$group מופיע פעמיים.
1) $match — רק הגשות שנבדקו.
2) $group ראשון — _id מורכב { studentId, courseId }: ממוצע לכל זוג סטודנט-קורס.
3) $lookup + $unwind ל-courses — לפי "_id.courseId", כדי להביא את שם הקורס.
4) $sort: { avgGrade: -1 } — ממיינים מהממוצע הגבוה לנמוך.
5) $group שני — _id: "$_id.studentId" (קבוצה לכל סטודנט). $first לוקח את המסמך הראשון בכל קבוצה, ובזכות המיון זה הקורס עם הממוצע הגבוה ביותר.
6) $lookup + $unwind ל-students — להביא את השם.
7) $project — studentName עם $concat, bestCourse ו-averageGrade.
הבדל מה-SQL: אם לסטודנט יש שני קורסים עם אותו ממוצע מקסימלי, $first יחזיר רק אחד מהם, ואילו פתרון ה-SQL יחזיר את שניהם.
הסדר של הפלט הסופי לא חשוב, ולכן הבדיקה כאן לא תלויה בסדר.`
    }
  },

  { id:'d15', topic:'top', difficulty:3, source:'שיעור NoSQL — שאלה 7',
    prompt:`הציגו את 3 הקורסים עם ממוצע הציונים הגבוה ביותר (הגשות שנבדקו).
פלט: courseName, averageGrade (במונגו בלי _id), מהממוצע הגבוה לנמוך.`,
    sql:{
      solution:`SELECT TOP 3 c.courseName, AVG(sub.grade) AS averageGrade
FROM submissions sub
JOIN courses c ON sub.courseId = c.id
GROUP BY c.id, c.courseName
ORDER BY averageGrade DESC;`,
      alt:[
`SELECT TOP 3 c.courseName, AVG(sub.grade) AS averageGrade
FROM submissions sub
JOIN assignments a ON sub.assignmentId = a.id
JOIN courses c ON a.courseId = c.id
WHERE sub.grade IS NOT NULL
GROUP BY c.id, c.courseName
ORDER BY AVG(sub.grade) DESC;`],
      explain:`GROUP BY לפי קורס, ואז AVG(sub.grade). ה-AVG מתעלם בעצמו מ-NULL, ולכן WHERE grade IS NOT NULL לא משנה כאן את התוצאה.
ORDER BY averageGrade DESC ואז TOP 3.
התוצאה: Python 91, Statistics 85.5, MongoDB 83.
בסכמת ה-DOCX (בלי courseId בהגשה) מחברים דרך assignments (ראו פתרון חלופי).`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $sort: { averageGrade: -1 } },
  { $limit: 3 },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, courseName: "$course.courseName", averageGrade: 1 } }
])`,
      explain:`השלבים מהרמז בשיעור: $match, $group, $sort, $limit, $lookup, $project.
1) $match — רק הגשות עם ציון.
2) $group לפי courseId עם $avg.
3) $sort: { averageGrade: -1 } — מהגבוה לנמוך.
4) $limit: 3 — שלושת הראשונים.
5) $lookup + $unwind ל-courses — רק עכשיו מביאים שמות, ורק ל-3 קורסים. זה יעיל יותר מלחבר את כולם.
6) $project — courseName ו-averageGrade.
הסדר נשמר: $lookup, $unwind ו-$project לא משנים את סדר המסמכים.`
    }
  },

  { id:'d16', topic:'multi', difficulty:3, source:'שיעור NoSQL — חלק ה׳ משימה 10',
    prompt:`מצאו עבור כל קורס: מספר הסטודנטים הרשומים (כל ההרשמות), מספר המטלות ומספר ההגשות. יש לכלול גם קורסים שאין להם כלום (0).
פלט: courseName, studentsCount, assignmentsCount, submissionsCount (במונגו בלי _id).`,
    sql:{
      solution:`SELECT c.courseName,
       (SELECT COUNT(*) FROM enrollments e  WHERE e.courseId  = c.id) AS studentsCount,
       (SELECT COUNT(*) FROM assignments a  WHERE a.courseId  = c.id) AS assignmentsCount,
       (SELECT COUNT(*) FROM submissions sub WHERE sub.courseId = c.id) AS submissionsCount
FROM courses c;`,
      alt:[
`SELECT c.courseName, COUNT(DISTINCT e.id), COUNT(DISTINCT a.id), COUNT(DISTINCT sub.id)
FROM courses c
LEFT JOIN enrollments e  ON e.courseId  = c.id
LEFT JOIN assignments a  ON a.courseId  = c.id
LEFT JOIN submissions sub ON sub.courseId = c.id
GROUP BY c.id, c.courseName;`],
      explain:`תת-שאילתה מתואמת ב-SELECT סופרת לכל קורס בנפרד (WHERE ... = c.id). קורס בלי שורות מקבל 0, כמו Cyber Security.
מלכודת: אם מחברים את שלוש הטבלאות ב-JOIN רגיל ומשתמשים ב-COUNT(*), השורות מוכפלות זו בזו (fan-out). בקורס MongoDB יוצא 5 × 2 × 7 = 70 שורות! לכן בפתרון החלופי משתמשים ב-COUNT(DISTINCT ...) וב-LEFT JOIN, כדי לא לאבד קורסים בלי נתונים.
התוצאה: MongoDB 5/2/7, SQL Server 3/2/3, Python 2/1/2, Marketing 2/1/2, Statistics 3/1/2, Cyber Security 0/0/0.`
    },
    mongo:{
      solution:`db.courses.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enrollments" } },
  { $lookup: { from: "assignments", localField: "_id", foreignField: "courseId", as: "assignments" } },
  { $lookup: { from: "submissions", localField: "_id", foreignField: "courseId", as: "submissions" } },
  { $project: { _id: 0, courseName: 1,
                studentsCount: { $size: "$enrollments" },
                assignmentsCount: { $size: "$assignments" },
                submissionsCount: { $size: "$submissions" } } }
])`,
      explain:`מתחילים מ-courses, כי צריך שורה לכל קורס, גם לקורס ריק.
1–3) שלושה $lookup נפרדים, כל אחד יוצר מערך משלו בתוך מסמך הקורס (enrollments, assignments, submissions). אין כאן הכפלת שורות כמו ב-JOIN, כי כל מערך עומד בפני עצמו.
4) $project עם $size — סופר את האיברים בכל מערך. למערך ריק $size מחזיר 0, ולכן Cyber Security מופיע עם אפסים.
אין צורך ב-$unwind, כי לא צריך את התוכן של המערכים, רק את הגודל שלהם.
זה התרגיל מהשיעור עם התוצאה { courseName, studentsCount, assignmentsCount, submissionsCount }.`
    }
  },

  { id:'d17', topic:'top', difficulty:3, source:'שיעור NoSQL — חלק ה׳ משימה 9',
    prompt:`מצאו את הסטודנט בעל ממוצע הציונים הגבוה ביותר (הגשות שנבדקו).
פלט: studentName ("David Levi"), averageGrade (במונגו בלי _id).`,
    sql:{
      solution:`SELECT TOP 1 s.firstName + ' ' + s.lastName AS studentName,
       AVG(sub.grade) AS averageGrade
FROM students s
JOIN submissions sub ON s.id = sub.studentId
WHERE sub.grade IS NOT NULL
GROUP BY s.id, s.firstName, s.lastName
ORDER BY averageGrade DESC;`,
      alt:[
`SELECT s.firstName + ' ' + s.lastName AS studentName, AVG(sub.grade) AS averageGrade
FROM students s
JOIN submissions sub ON s.id = sub.studentId
WHERE sub.grade IS NOT NULL
GROUP BY s.id, s.firstName, s.lastName
HAVING AVG(sub.grade) = (SELECT MAX(t.avgGrade)
                         FROM (SELECT AVG(grade) AS avgGrade
                               FROM submissions
                               WHERE grade IS NOT NULL
                               GROUP BY studentId) t);`],
      explain:`דרך 1: מחשבים ממוצע לכל סטודנט, ממיינים מהגבוה לנמוך, ולוקחים TOP 1.
דרך 2 (שאילתה מקוננת, כמו במצגת 6): HAVING AVG(...) = (SELECT MAX(...)) מעל טבלה נגזרת של ממוצעים. ב-SQL Server חובה לתת כינוי (t) לטבלה נגזרת ב-FROM. היתרון של הדרך הזו: אם יש שוויון במקום הראשון, יוצגו כל המובילים.
אי אפשר לכתוב MAX(AVG(grade)), כי ב-SQL Server אסור לקנן פונקציות צבירה.
התוצאה: Omer Biton, ממוצע 90.`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$studentId", averageGrade: { $avg: "$grade" } } },
  { $sort: { averageGrade: -1 } },
  { $limit: 1 },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: { _id: 0,
                studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
                averageGrade: 1 } }
])`,
      explain:`1) $match — רק הגשות עם ציון.
2) $group לפי studentId עם $avg — ממוצע לכל סטודנט (זו משימה 8 בשיעור).
3) $sort: { averageGrade: -1 } — מהגבוה לנמוך.
4) $limit: 1 — המוביל בלבד.
5) $lookup + $unwind ל-students — להביא את השם.
6) $project — studentName עם $concat ו-averageGrade.`
    }
  },

  /* ================== סינון בסיסי: = · IN · טווח · LIKE ↔ $regex · AND/OR ================== */

  { id:'d18', topic:'filter', difficulty:1, source:'תרגול נוסף — IN ↔ $in',
    prompt:`הציגו את הסטודנטים שגרים בחיפה (Haifa) או בירושלים (Jerusalem).
פלט: firstName, lastName, city (במונגו בלי _id).`,
    sql:{
      solution:`SELECT firstName, lastName, city
FROM students
WHERE city IN ('Haifa', 'Jerusalem');`,
      alt:[`SELECT firstName, lastName, city FROM students WHERE city = 'Haifa' OR city = 'Jerusalem';`],
      explain:`IN (...) הוא קיצור של כמה תנאי = עם OR ביניהם.
ההפך: NOT IN ('Haifa', 'Jerusalem').
התוצאה: Noa ו-Shira (Haifa), Yossi ו-Eyal (Jerusalem).`
    },
    mongo:{
      solution:`db.students.find(
  { city: { $in: ["Haifa", "Jerusalem"] } },
  { _id: 0, firstName: 1, lastName: 1, city: 1 }
)`,
      alt:[
`db.students.find(
  { $or: [ { city: "Haifa" }, { city: "Jerusalem" } ] },
  { _id: 0, firstName: 1, lastName: 1, city: 1 }
)`,
`db.students.find({ city: { $in: ["Haifa", "Jerusalem"] } }).project({ _id: 0, firstName: 1, lastName: 1, city: 1 })`],
      explain:`find עם שני ארגומנטים:
1) התנאי — { city: { $in: [ ... ] } }. הערך של $in הוא מערך, וזה המקביל ל-IN (...). ההפך הוא $nin.
2) ה-projection — אילו שדות להציג: 1 = להציג, 0 = להסתיר. _id מוצג תמיד, אלא אם כותבים _id: 0.
אפשר לכתוב גם $or עם מערך של תנאים, או לשרשר .project() על ה-cursor.`
    }
  },

  { id:'d19', topic:'filter', difficulty:1, source:'תרגול נוסף — BETWEEN ↔ $gte/$lte',
    prompt:`הציגו את הסטודנטים שגילם בין 22 ל-25, כולל שני הקצוות.
פלט: firstName, lastName, age (במונגו בלי _id).`,
    sql:{
      solution:`SELECT firstName, lastName, age
FROM students
WHERE age BETWEEN 22 AND 25;`,
      alt:[`SELECT firstName, lastName, age FROM students WHERE age >= 22 AND age <= 25;`],
      explain:`BETWEEN a AND b כולל את שני הקצוות, ושקול ל-age >= 22 AND age <= 25.
סדר הערכים חשוב: BETWEEN 25 AND 22 יחזיר תוצאה ריקה.
התוצאה: 6 סטודנטים (David 23, Yossi 25, Maya 22, Omer 24, Tamar 23, Lior 22).`
    },
    mongo:{
      solution:`db.students.find(
  { age: { $gte: 22, $lte: 25 } },
  { _id: 0, firstName: 1, lastName: 1, age: 1 }
)`,
      alt:[
`db.students.find(
  { $and: [ { age: { $gte: 22 } }, { age: { $lte: 25 } } ] },
  { _id: 0, firstName: 1, lastName: 1, age: 1 }
)`],
      explain:`במונגו אין BETWEEN. כותבים שני אופרטורים באותו אובייקט של השדה: { $gte: 22, $lte: 25 }. כמה אופרטורים על אותו שדה = AND.
$gte = גדול או שווה (>=), $lte = קטן או שווה (<=). בלי ה-e (‏$gt, $lt) הקצוות לא נכללים.
אפשר גם $and מפורש עם מערך של תנאים.`
    }
  },

  { id:'d20', topic:'filter', difficulty:1, source:'תרגול נוסף — LIKE ↔ $regex',
    prompt:`הציגו את הסטודנטים שמספר הטלפון שלהם מתחיל ב-050.
פלט: firstName, lastName, phone (במונגו בלי _id).`,
    sql:{
      solution:`SELECT firstName, lastName, phone
FROM students
WHERE phone LIKE '050%';`,
      alt:[`SELECT firstName, lastName, phone FROM students WHERE SUBSTRING(phone, 1, 3) = '050';`],
      explain:`ב-LIKE, ‏% = כל רצף תווים (גם ריק), ו-_ = תו אחד בדיוק.
'050%' = מתחיל ב-050. '%050' = מסתיים ב-050. '%050%' = מכיל 050.
phone מוגדר VARCHAR, ולכן ה-0 בהתחלה נשמר. אילו היה INT, האפס היה נעלם.
ב-SQL Server אפשר גם LEFT(phone, 3) = '050'. במנוע של האתר השתמשו ב-SUBSTRING(phone, 1, 3), כי LEFT() לא נתמך בו.
התוצאה: David (0501234567) ו-Shira (0505555555).`
    },
    mongo:{
      solution:`db.students.find(
  { phone: { $regex: "^050" } },
  { _id: 0, firstName: 1, lastName: 1, phone: 1 }
)`,
      explain:`$regex מחפש לפי תבנית (ביטוי רגולרי):
^ = תחילת הטקסט, $ = סוף הטקסט, .* = כל רצף.
טבלת המרה: LIKE '050%' ↔ "^050"; LIKE '%050' ↔ "050$"; LIKE '%050%' ↔ "050"; LIKE '050' (בלי %) ↔ "^050$".
אפשר גם בכתיב מקוצר: { phone: /^050/ }.`
    }
  },

  { id:'d21', topic:'filter', difficulty:2, source:'תרגול נוסף — רגישות לאותיות: LIKE ↔ $regex עם $options',
    prompt:`הציגו את הקורסים שבשמם מופיע הרצף "sql", בלי תלות באותיות גדולות/קטנות.
פלט: courseName, credits (במונגו בלי _id).`,
    sql:{
      solution:`SELECT courseName, credits
FROM courses
WHERE courseName LIKE '%sql%';`,
      alt:[`SELECT courseName, credits FROM courses WHERE UPPER(courseName) LIKE '%SQL%';`],
      explain:`ב-SQL Server, ה-collation ברירת המחדל לא רגיש לאותיות (CI = Case Insensitive). לכן '%sql%' מוצא גם את "SQL Server".
כדי להיות בטוחים בכל מערכת, אפשר להמיר את שני הצדדים לאותו מקרה: UPPER(courseName) LIKE '%SQL%'.
התוצאה: SQL Server (credits = 4).`
    },
    mongo:{
      solution:`db.courses.find(
  { courseName: { $regex: "sql", $options: "i" } },
  { _id: 0, courseName: 1, credits: 1 }
)`,
      explain:`במונגו $regex רגיש לאותיות כברירת מחדל. "sql" לא ימצא את "SQL Server"!
$options: "i" (ignore case) מבטל את הרגישות. בכתיב מקוצר: /sql/i.
אין ^ ואין $ בתבנית, ולכן מחפשים "מכיל" (כמו '%sql%').
זה הבדל חשוב בין SQL Server למונגו: גם { city: "tel aviv" } לא ימצא "Tel Aviv".`
    }
  },

  { id:'d22', topic:'filter', difficulty:2, source:'תרגול נוסף — AND/OR וקדימות ↔ $or',
    prompt:`הציגו את הקורסים של מחלקת Information Systems שבהם credits = 4, וגם את כל הקורסים של מחלקת Business (בלי קשר ל-credits).
פלט: courseName, department, credits (במונגו בלי _id).`,
    sql:{
      solution:`SELECT courseName, department, credits
FROM courses
WHERE (department = 'Information Systems' AND credits = 4)
   OR department = 'Business';`,
      alt:[`SELECT courseName, department, credits FROM courses WHERE department = 'Business' OR department = 'Information Systems' AND credits = 4;`],
      explain:`ל-AND יש קדימות על OR (כמו כפל לפני חיבור), ולכן הסוגריים כאן לא חובה, אבל מומלץ לכתוב אותם לבהירות.
מלכודת: department = 'Information Systems' AND (credits = 4 OR department = 'Business') היא שאילתה אחרת לגמרי, ומחזירה רק 2 קורסים.
התוצאה: MongoDB, SQL Server, Marketing, Statistics.`
    },
    mongo:{
      solution:`db.courses.find(
  { $or: [
      { department: "Information Systems", credits: 4 },
      { department: "Business" }
  ] },
  { _id: 0, courseName: 1, department: 1, credits: 1 }
)`,
      alt:[
`db.courses.find(
  { $or: [
      { $and: [ { department: "Information Systems" }, { credits: 4 } ] },
      { department: "Business" }
  ] },
  { _id: 0, courseName: 1, department: 1, credits: 1 }
)`],
      explain:`$or מקבל מערך של תנאים, ומסמך עובר אם לפחות אחד מהם מתקיים.
בתוך אובייקט תנאי אחד, כמה שדות = AND: { department: "Information Systems", credits: 4 }.
אפשר לכתוב $and מפורש, אבל לרוב זה מיותר. צריך אותו רק כשאי אפשר לכתוב את התנאים כמפתחות שונים באותו אובייקט: למשל שני $or שונים, או שני תנאים על אותו שדה עם אותו אופרטור.`
    }
  },

  /* ================== מיון + TOP · DISTINCT · קיבוץ ================== */

  { id:'d23', topic:'top', difficulty:1, source:'תרגול נוסף — ORDER BY + TOP ↔ sort + limit',
    prompt:`הציגו את 3 הסטודנטים המבוגרים ביותר.
פלט: firstName, lastName, age, מהמבוגר לצעיר (במונגו בלי _id).`,
    sql:{
      solution:`SELECT TOP 3 firstName, lastName, age
FROM students
ORDER BY age DESC;`,
      explain:`ORDER BY age DESC ממיין מהגדול לקטן, ו-TOP 3 לוקח את 3 הראשונים.
ב-SQL Server כותבים TOP אחרי SELECT. LIMIT הוא תחביר של MySQL/SQLite. האתר ממיר את TOP ל-LIMIT מאחורי הקלעים, אבל במבחן כותבים TOP.
ברירת המחדל של ORDER BY היא ASC (עולה).
התוצאה: Itai 27, Eyal 26, Yossi 25.`
    },
    mongo:{
      solution:`db.students.find({}, { _id: 0, firstName: 1, lastName: 1, age: 1 }).sort({ age: -1 }).limit(3)`,
      alt:[
`db.students.aggregate([
  { $sort: { age: -1 } },
  { $limit: 3 },
  { $project: { _id: 0, firstName: 1, lastName: 1, age: 1 } }
])`,
`db.students.find({}, { _id: 0, firstName: 1, lastName: 1, age: 1 }).limit(3).sort({ age: -1 })`],
      explain:`find({}) — תנאי ריק = כל המסמכים. הארגומנט השני הוא ה-projection.
.sort({ age: -1 }) — 1- = יורד (DESC), 1 = עולה (ASC).
.limit(3) — רק 3 מסמכים, כמו TOP 3.
ב-find, המיון תמיד מתבצע לפני ה-limit, גם אם כותבים limit קודם. ב-aggregate זה לא כך: שם הסדר של השלבים קובע.`
    }
  },

  { id:'d24', topic:'distinct', difficulty:1, source:'תרגול נוסף — DISTINCT ↔ distinct()',
    prompt:`הציגו את רשימת הערים השונות שבהן גרים סטודנטים, בלי כפילויות.
פלט: city.`,
    sql:{
      solution:`SELECT DISTINCT city FROM students;`,
      alt:[`SELECT city FROM students GROUP BY city;`],
      explain:`DISTINCT מסיר שורות כפולות מהתוצאה. Tel Aviv מופיעה 3 פעמים בטבלה, אבל פעם אחת בפלט.
GROUP BY city בלי פונקציית צבירה נותן אותה תוצאה.
התוצאה: 6 ערים.`
    },
    mongo:{
      solution:`db.students.distinct("city")`,
      alt:[`db.students.aggregate([ { $group: { _id: "$city" } } ])`],
      explain:`distinct("city") מחזיר מערך של ערכים ייחודיים, ולא מסמכים: ["Tel Aviv", "Haifa", ...].
זו פקודה מדף הפקודות של המרצה, עם הדוגמה "רשימת ערים שונות".
חלופה ב-aggregate: $group עם _id: "$city" בלי accumulators. כל קבוצה = ערך ייחודי.
אפשר להוסיף תנאי כארגומנט שני: distinct("city", { age: { $gt: 23 } }).`
    }
  },

  { id:'d25', topic:'distinct', difficulty:2, source:'תרגול נוסף — DISTINCT עם JOIN ↔ distinct מקונן',
    prompt:`מאילו ערים מגיעים הסטודנטים שרשומים לקורס MongoDB? הציגו כל עיר פעם אחת. חפשו את הקורס לפי השם (courseName = "MongoDB"), ולא לפי מספר.
פלט: city.`,
    sql:{
      solution:`SELECT DISTINCT s.city
FROM students s
JOIN enrollments e ON s.id = e.studentId
JOIN courses c ON e.courseId = c.id
WHERE c.courseName = 'MongoDB';`,
      alt:[
`SELECT DISTINCT city
FROM students
WHERE id IN (SELECT studentId
             FROM enrollments
             WHERE courseId = (SELECT id FROM courses WHERE courseName = 'MongoDB'));`],
      explain:`ב-MongoDB רשומים 5 סטודנטים, ושלושה מהם מתל אביב. בלי DISTINCT, Tel Aviv תופיע 3 פעמים.
פתרון חלופי עם שאילתות מקוננות: הפנימית מוצאת את id של הקורס, האמצעית את הסטודנטים שלו, והחיצונית את הערים.
= (SELECT ...) מותר רק כשתת-השאילתה מחזירה ערך אחד. אם ייתכנו כמה ערכים, משתמשים ב-IN.
התוצאה: Tel Aviv, Haifa, Ramat Gan.`
    },
    mongo:{
      solution:`db.enrollments.aggregate([
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $match: { "course.courseName": "MongoDB" } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $group: { _id: "$student.city" } }
])`,
      alt:[
`db.students.distinct("city", {
  _id: { $in: db.enrollments.distinct("studentId", {
    courseId: db.courses.findOne({ courseName: "MongoDB" })._id
  }) }
})`],
      explain:`דרך 1 (aggregate):
1) $lookup + $unwind ל-courses — מצרפים לכל הרשמה את פרטי הקורס.
2) $match: { "course.courseName": "MongoDB" } — שם שדה עם נקודה חייב להיות במרכאות.
3) $lookup + $unwind ל-students.
4) $group: { _id: "$student.city" } — קבוצה לכל עיר = ערכים ייחודיים, כמו DISTINCT.
דרך 2 (המקבילה של שאילתות מקוננות): findOne מחזיר את מסמך הקורס, ו-._id שולף ממנו את המזהה. distinct על enrollments נותן את הסטודנטים של הקורס, ו-distinct("city", {...}) נותן את הערים שלהם.`
    }
  },

  { id:'d26', topic:'group', difficulty:2, source:'תרגול נוסף — LEFT JOIN + COUNT(עמודה) ↔ $lookup + $size',
    prompt:`הציגו לכל מרצה כמה קורסים הוא מלמד, כולל מרצים שלא מלמדים אף קורס (0).
פלט: firstName, lastName, coursesCount (במונגו בלי _id).`,
    sql:{
      solution:`SELECT l.firstName, l.lastName, COUNT(c.id) AS coursesCount
FROM lecturers l
LEFT JOIN courses c ON l.id = c.lecturerId
GROUP BY l.id, l.firstName, l.lastName;`,
      alt:[
`SELECT l.firstName, l.lastName,
       (SELECT COUNT(*) FROM courses c WHERE c.lecturerId = l.id) AS coursesCount
FROM lecturers l;`],
      explain:`LEFT JOIN שומר גם את Dana Klein, שלא מלמדת אף קורס. בשורה שלה, כל עמודות courses הן NULL.
המלכודת: COUNT(*) סופר שורות, ולכן Dana הייתה מקבלת 1, כי שורת ה-NULL היא עדיין שורה! COUNT(c.id) סופר רק ערכים שאינם NULL, ולכן נותן 0.
INNER JOIN היה מעלים את Dana לגמרי.
התוצאה: Moshe 2, Rina 2, Avi 2, Dana 0.`
    },
    mongo:{
      solution:`db.lecturers.aggregate([
  { $lookup: { from: "courses", localField: "_id", foreignField: "lecturerId", as: "courses" } },
  { $project: { _id: 0, firstName: 1, lastName: 1, coursesCount: { $size: "$courses" } } }
])`,
      explain:`מתחילים מ-lecturers, כי צריך שורה לכל מרצה.
1) $lookup — מצרף לכל מרצה מערך courses עם הקורסים שלו. אצל Dana המערך ריק.
2) $project עם { $size: "$courses" } — גודל המערך = מספר הקורסים, ולמערך ריק התוצאה 0.
למה לא $group על courses? כי ל-Dana אין אף מסמך ב-courses, אז היא לא תופיע בשום קבוצה. זו אותה בעיה כמו INNER JOIN.
וגם לא $unwind: $unwind מוחק מסמכים עם מערך ריק (אלא אם מוסיפים preserveNullAndEmptyArrays: true).`
    }
  },

  { id:'d27', topic:'having', difficulty:2, source:'תרגול נוסף — HAVING על ממוצע ↔ $match אחרי $group',
    prompt:`הציגו את הקורסים שממוצע הציונים בהם (הגשות שנבדקו) גבוה מ-80.
פלט: courseName, averageGrade (במונגו בלי _id).`,
    sql:{
      solution:`SELECT c.courseName, AVG(sub.grade) AS averageGrade
FROM courses c
JOIN submissions sub ON c.id = sub.courseId
GROUP BY c.id, c.courseName
HAVING AVG(sub.grade) > 80;`,
      alt:[
`SELECT c.courseName, AVG(sub.grade) AS averageGrade
FROM submissions sub
JOIN assignments a ON sub.assignmentId = a.id
JOIN courses c ON a.courseId = c.id
WHERE sub.grade IS NOT NULL
GROUP BY c.id, c.courseName
HAVING AVG(sub.grade) > 80;`],
      explain:`תנאי על תוצאה של פונקציית צבירה נכתב ב-HAVING, אחרי GROUP BY.
WHERE AVG(...) > 80 הוא שגיאה, כי WHERE פועל על שורות בודדות, לפני הקיבוץ.
ב-SQL Server אי אפשר לכתוב HAVING averageGrade > 80, כי הכינוי עוד לא מוכר בשלב הזה. חייבים לחזור על AVG(sub.grade). (המנוע של האתר, SQLite, כן מקבל את הכינוי ב-HAVING. אל תסתמכו על זה במבחן.)
התוצאה: MongoDB 83, Python 91, Statistics 85.5.`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $match: { averageGrade: { $gt: 80 } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, courseName: "$course.courseName", averageGrade: 1 } }
])`,
      explain:`1) $group לפי courseId עם $avg (מתעלם מ-null).
2) $match אחרי $group — מסנן לפי שדה שנוצר בקיבוץ (averageGrade). זה ה-HAVING של מונגו. במונגו מותר להשתמש בשם השדה החדש.
3) $lookup + $unwind ל-courses — להביא את שם הקורס.
4) $project — courseName ו-averageGrade.`
    }
  },

  /* ================== JOIN ================== */

  { id:'d28', topic:'join', difficulty:2, source:'תרגול נוסף — JOIN + סינון לפי ותק',
    prompt:`הציגו את הקורסים שמלמדים מרצים עם ותק של יותר מ-10 שנים.
פלט: courseName, lecturerLastName (שם המשפחה של המרצה), seniority (במונגו בלי _id).`,
    sql:{
      solution:`SELECT c.courseName, l.lastName AS lecturerLastName, l.seniority
FROM courses c
JOIN lecturers l ON c.lecturerId = l.id
WHERE l.seniority > 10;`,
      alt:[
`SELECT c.courseName, l.lastName, l.seniority
FROM lecturers l
INNER JOIN courses c ON l.id = c.lecturerId AND l.seniority > 10;`],
      explain:`JOIN בין courses ל-lecturers לפי המפתח הזר c.lecturerId = l.id, ו-WHERE מסנן לפי ותק.
ב-INNER JOIN אין הבדל אם התנאי l.seniority > 10 נכתב ב-WHERE או ב-ON. ב-LEFT JOIN יש הבדל גדול (ראו את השאלה על סטודנטים בלי אף הרשמה פעילה).
התוצאה: MongoDB ו-SQL Server (Cohen, 12), Marketing ו-Statistics (Peretz, 15).`
    },
    mongo:{
      solution:`db.courses.aggregate([
  { $lookup: { from: "lecturers", localField: "lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $match: { "lecturer.seniority": { $gt: 10 } } },
  { $project: { _id: 0, courseName: 1, lecturerLastName: "$lecturer.lastName", seniority: "$lecturer.seniority" } }
])`,
      alt:[
`db.lecturers.aggregate([
  { $match: { seniority: { $gt: 10 } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "lecturerId", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, courseName: "$course.courseName", lecturerLastName: "$lastName", seniority: 1 } }
])`],
      explain:`דרך 1: מ-courses.
1) $lookup ל-lecturers (lecturerId מול _id).
2) $unwind — לכל קורס יש מרצה אחד, והמערך הופך לאובייקט.
3) $match: { "lecturer.seniority": { $gt: 10 } } — סינון על שדה של תת-מסמך, עם מרכאות בגלל הנקודה.
4) $project — מעצב את הפלט.
דרך 2 (חלופית): מתחילים מ-lecturers, מסננים קודם ($match) ורק אז מצרפים את הקורסים. כאן $unwind מפרק מערך עם 2 קורסים לשני מסמכים נפרדים, וזה המקביל לקשר 1:N ב-JOIN.`
    }
  },

  { id:'d29', topic:'join', difficulty:2, source:'שיעור NoSQL — חלק ה׳ משימה 4 (בגרסת טבלאות) · EXISTS ↔ $in',
    prompt:`הציגו את הקורסים שיש להם לפחות מטלה אחת שהציון המקסימלי שלה (maxGrade) הוא 100. כל קורס יופיע פעם אחת.
פלט: id, courseName (במונגו: _id, courseName).`,
    sql:{
      solution:`SELECT c.id, c.courseName
FROM courses c
WHERE EXISTS (SELECT *
              FROM assignments a
              WHERE a.courseId = c.id AND a.maxGrade = 100);`,
      alt:[
`SELECT id, courseName
FROM courses
WHERE id IN (SELECT courseId FROM assignments WHERE maxGrade = 100);`,
`SELECT DISTINCT c.id, c.courseName
FROM courses c
JOIN assignments a ON c.id = a.courseId
WHERE a.maxGrade = 100;`],
      explain:`זה Semi-Join: קורסים שיש להם לפחות שורה מתאימה בטבלה אחרת. EXISTS מחזיר אמת אם תת-השאילתה מוצאת לפחות שורה אחת.
אם כותבים JOIN רגיל, חייבים DISTINCT: לקורס MongoDB יש שתי מטלות עם 100, והוא היה מופיע פעמיים.
התוצאה: MongoDB, SQL Server, Python, Statistics. ל-Marketing יש רק מטלה עם maxGrade 80.`
    },
    mongo:{
      solution:`db.courses.find(
  { _id: { $in: db.assignments.distinct("courseId", { maxGrade: 100 }) } },
  { courseName: 1 }
)`,
      alt:[
`db.courses.aggregate([
  { $lookup: { from: "assignments", localField: "_id", foreignField: "courseId", as: "assignments" } },
  { $match: { "assignments.maxGrade": 100 } },
  { $project: { courseName: 1 } }
])`],
      explain:`דרך 1: distinct("courseId", { maxGrade: 100 }) מחזיר את מזהי הקורסים שיש להם מטלה עם 100. אחר כך find עם $in, המקביל ל-IN (subquery).
דרך 2: $lookup מצרף לכל קורס מערך assignments, ו-$match: { "assignments.maxGrade": 100 } עובר אם לפחות איבר אחד במערך מתאים. כך מונגו משווה מול מערכים.
בשיעור ה-NoSQL המטלות שמורות בתוך הקורס (Embedded), ושם מספיק: db.courses.find({ "assignments.maxGrade": 100 }).`
    }
  },

  /* ================== Anti-Join ================== */

  { id:'d30', topic:'anti', difficulty:1, source:'תרגול נוסף — מרצה בלי קורסים',
    prompt:`מצאו מרצים שלא מלמדים אף קורס.
פלט: id, firstName, lastName, department (במונגו: _id במקום id).`,
    sql:{
      solution:`SELECT l.id, l.firstName, l.lastName, l.department
FROM lecturers l
LEFT JOIN courses c ON l.id = c.lecturerId
WHERE c.id IS NULL;`,
      alt:[
`SELECT id, firstName, lastName, department
FROM lecturers
WHERE id NOT IN (SELECT lecturerId FROM courses);`,
`SELECT l.id, l.firstName, l.lastName, l.department
FROM lecturers l
WHERE NOT EXISTS (SELECT * FROM courses c WHERE c.lecturerId = l.id);`],
      explain:`תבנית ה-Anti-Join הקלאסית: LEFT JOIN + WHERE <מפתח של הטבלה הימנית> IS NULL.
שלוש דרכים שקולות: LEFT JOIN/IS NULL, ‏NOT IN, ‏NOT EXISTS.
התוצאה: Dana Klein (Data Science).`
    },
    mongo:{
      solution:`db.lecturers.aggregate([
  { $lookup: { from: "courses", localField: "_id", foreignField: "lecturerId", as: "courses" } },
  { $match: { courses: { $size: 0 } } },
  { $project: { firstName: 1, lastName: 1, department: 1 } }
])`,
      alt:[
`db.lecturers.find(
  { _id: { $nin: db.courses.distinct("lecturerId") } },
  { firstName: 1, lastName: 1, department: 1 }
)`],
      explain:`1) $lookup — לכל מרצה מצורף מערך courses (_id מול lecturerId).
2) $match: { courses: { $size: 0 } } — רק מרצים שהמערך שלהם ריק.
3) $project — firstName, lastName, department. _id מוצג כברירת מחדל.
חלופה: distinct("lecturerId") על courses + $nin.`
    }
  },

  { id:'d31', topic:'anti', difficulty:3, source:'תרגול נוסף — מלכודת ON מול WHERE ב-LEFT JOIN (כמו מצגת 6)',
    prompt:`מצאו את הסטודנטים שאין להם אף הרשמה פעילה: אין להם הרשמות בכלל, או שכל ההרשמות שלהם לא פעילות.
פלט: id, firstName, lastName (במונגו: _id, firstName, lastName).`,
    sql:{
      solution:`SELECT s.id, s.firstName, s.lastName
FROM students s
LEFT JOIN enrollments e ON s.id = e.studentId AND e.status = 'Active'
WHERE e.id IS NULL;`,
      alt:[
`SELECT id, firstName, lastName
FROM students
WHERE id NOT IN (SELECT studentId FROM enrollments WHERE status = 'Active');`,
`SELECT s.id, s.firstName, s.lastName
FROM students s
WHERE NOT EXISTS (SELECT * FROM enrollments e
                  WHERE e.studentId = s.id AND e.status = 'Active');`],
      explain:`התנאי על הטבלה הימנית (e.status = 'Active') חייב להיות בתוך ה-ON של ה-LEFT JOIN. כך מצרפים רק הרשמות פעילות, וסטודנט שאין לו אף הרשמה פעילה מקבל NULL.
מה קורה אם מעבירים את התנאי ל-WHERE? WHERE e.status = 'Active' AND e.id IS NULL היא סתירה, והתוצאה ריקה. זו אותה מלכודת כמו בתרגיל ה-OUTER JOIN במצגת 6, שם התנאי על התאריך צריך להיות ב-ON.
טעות נפוצה נוספת: WHERE e.id IS NULL OR e.status <> 'Active' עם LEFT JOIN רגיל. היא מחזירה גם את Noa, כי יש לה הרשמה לא פעילה, למרות שיש לה גם הרשמה פעילה.
התוצאה: Eyal Katz (יש לו רק הרשמה לא פעילה) ו-Lior Shalom (אין לו הרשמות בכלל).`
    },
    mongo:{
      solution:`db.students.find(
  { _id: { $nin: db.enrollments.distinct("studentId", { status: "Active" }) } },
  { firstName: 1, lastName: 1 }
)`,
      alt:[
`db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $match: { "enrollments.status": { $ne: "Active" } } },
  { $project: { firstName: 1, lastName: 1 } }
])`,
`db.students.aggregate([
  { $lookup: {
      from: "enrollments",
      let: { sid: "$_id" },
      pipeline: [ { $match: { $expr: { $and: [ { $eq: ["$studentId", "$$sid"] },
                                               { $eq: ["$status", "Active"] } ] } } } ],
      as: "activeEnrollments" } },
  { $match: { activeEnrollments: { $size: 0 } } },
  { $project: { firstName: 1, lastName: 1 } }
])`],
      explain:`דרך 1 (find):
distinct("studentId", { status: "Active" }) — הארגומנט השני הוא תנאי, והתוצאה היא רשימת הסטודנטים שיש להם הרשמה פעילה.
$nin — כל מי שלא ברשימה. זו המקבילה של NOT IN.
דרך 2 (aggregate):
$lookup מצרף את כל ההרשמות, ואז { "enrollments.status": { $ne: "Active" } }. על שדה מערך, $ne פירושו "אף איבר במערך אינו Active", והוא מתקיים גם על מערך ריק.
שימו לב: $size: 0 אחרי $lookup רגיל היה שגוי כאן. הוא היה מוצא רק את Lior, כי ל-Eyal יש הרשמה, אמנם לא פעילה.
דרך 3 (מתקדם, ראו פתרון חלופי אחרון): $lookup עם let ו-pipeline מצרף רק הרשמות פעילות, ואז $size: 0 נכון. זו המקבילה המדויקת לתנאי בתוך ה-ON של ה-LEFT JOIN.`
    }
  },

  /* ================== שאילתה על 4 טבלאות ================== */

  { id:'d32', topic:'multi', difficulty:3, source:'תרגול נוסף — 4 טבלאות ↔ $lookup משורשר',
    prompt:`הציגו את הסטודנטים שרשומים לפחות לאחד מהקורסים שמלמד המרצה Moshe Cohen (לפי כל ההרשמות). כל סטודנט יופיע פעם אחת.
פלט: firstName, lastName בלבד (במונגו בלי _id).`,
    sql:{
      solution:`SELECT DISTINCT s.firstName, s.lastName
FROM students s
JOIN enrollments e ON s.id = e.studentId
JOIN courses     c ON e.courseId = c.id
JOIN lecturers   l ON c.lecturerId = l.id
WHERE l.firstName = 'Moshe' AND l.lastName = 'Cohen';`,
      alt:[
`SELECT firstName, lastName
FROM students
WHERE id IN (SELECT e.studentId
             FROM enrollments e
             JOIN courses c ON e.courseId = c.id
             JOIN lecturers l ON c.lecturerId = l.id
             WHERE l.firstName = 'Moshe' AND l.lastName = 'Cohen');`],
      explain:`שרשרת של 4 טבלאות: students → enrollments → courses → lecturers, עם 3 תנאי JOIN.
מסננים לפי שם פרטי וגם שם משפחה של המרצה, כי שם משפחה לבד לא בהכרח ייחודי (יכולים להיות שני מרצים בשם Cohen). בנתונים שלנו יש רק מרצה אחד בשם Cohen. Noa Cohen היא סטודנטית, והתנאי l.lastName בודק רק את טבלת המרצים.
DISTINCT נדרש: David ו-Itai לומדים בשני הקורסים של Moshe (MongoDB ו-SQL Server), ובלעדיו הם היו מופיעים פעמיים.
בפתרון החלופי עם IN אין צורך ב-DISTINCT, כי כל סטודנט נבדק פעם אחת.
התוצאה: David, Noa, Yossi, Maya, Itai, Tamar.`
    },
    mongo:{
      solution:`db.lecturers.aggregate([
  { $match: { firstName: "Moshe", lastName: "Cohen" } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "lecturerId", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "enrollments", localField: "course._id", foreignField: "courseId", as: "enrollment" } },
  { $unwind: "$enrollment" },
  { $lookup: { from: "students", localField: "enrollment.studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $group: { _id: { firstName: "$student.firstName", lastName: "$student.lastName" } } },
  { $project: { _id: 0, firstName: "$_id.firstName", lastName: "$_id.lastName" } }
])`,
      alt:[
`db.enrollments.aggregate([
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "lecturers", localField: "course.lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $match: { "lecturer.firstName": "Moshe", "lecturer.lastName": "Cohen" } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $group: { _id: "$studentId", firstName: { $first: "$student.firstName" }, lastName: { $first: "$student.lastName" } } },
  { $project: { _id: 0, firstName: 1, lastName: 1 } }
])`],
      explain:`מתחילים מהמרצה ומסננים מוקדם. כך כל ה-$lookup שאחריו עובדים על מעט מסמכים.
1) $match — Moshe Cohen.
2) $lookup + $unwind ל-courses — מתקבלים 2 מסמכים, אחד לכל קורס שלו.
3) $lookup + $unwind ל-enrollments — לפי "course._id". מתקבל מסמך לכל הרשמה.
4) $lookup + $unwind ל-students — לפי "enrollment.studentId".
5) $group עם _id מורכב { firstName, lastName } — מסיר כפילויות, כמו DISTINCT.
6) $project — מוציא את השמות מתוך _id לשדות רגילים.`
    }
  },

  /* ================== NULL ↔ null ================== */

  { id:'d33', topic:'nulls', difficulty:1, source:'שיעור NoSQL — חלק ה׳ משימה 7',
    prompt:`הציגו את כל ההגשות שעדיין לא קיבלו ציון (אין ערך ב-grade).
פלט: id, studentId, assignmentId, status (במונגו: _id במקום id).`,
    sql:{
      solution:`SELECT id, studentId, assignmentId, status
FROM submissions
WHERE grade IS NULL;`,
      explain:`NULL הוא "ערך לא ידוע", ולא ערך רגיל. כל השוואה איתו (כולל = NULL) מחזירה UNKNOWN, ולא TRUE.
לכן WHERE grade = NULL מחזיר 0 שורות! הדרך הנכונה: IS NULL, ולהפך IS NOT NULL.
התוצאה: הגשה 8 (Maya, Aggregation Project) והגשה 12 (Shira, Market Research), שתיהן בסטטוס Submitted.`
    },
    mongo:{
      solution:`db.submissions.find(
  { grade: null },
  { studentId: 1, assignmentId: 1, status: 1 }
)`,
      alt:[
`db.submissions.find({ grade: { $eq: null } }, { studentId: 1, assignmentId: 1, status: 1 })`,
`db.submissions.aggregate([
  { $match: { grade: null } },
  { $project: { studentId: 1, assignmentId: 1, status: 1 } }
])`],
      explain:`במונגו, { grade: null } עובד ישירות, בלי IS. הוא מוצא מסמכים שבהם grade שווה null, וגם מסמכים שאין בהם שדה grade בכלל.
כדי למצוא רק null מפורש: { grade: { $type: "null" } }. כדי למצוא רק מסמכים שחסר בהם השדה: { grade: { $exists: false } }.
ההפך (הגשות שנבדקו): { grade: { $ne: null } }.`
    }
  },

  { id:'d34', topic:'nulls', difficulty:2, source:'תרגול נוסף — COUNT(*) מול COUNT(עמודה)',
    prompt:`לכל קורס הציגו כמה הגשות יש בסך הכול וכמה מהן כבר קיבלו ציון.
פלט: courseId, totalSubmissions, gradedSubmissions. במונגו מותר ש-courseId יופיע בשדה _id במקום בשדה נפרד (לא בשניהם).`,
    sql:{
      solution:`SELECT courseId,
       COUNT(*)     AS totalSubmissions,
       COUNT(grade) AS gradedSubmissions
FROM submissions
GROUP BY courseId;`,
      alt:[
`SELECT courseId, COUNT(*), SUM(CASE WHEN grade IS NOT NULL THEN 1 ELSE 0 END)
FROM submissions
GROUP BY courseId;`],
      explain:`COUNT(*) סופר שורות, כולל שורות עם NULL. COUNT(grade) סופר רק שורות שבהן grade אינו NULL.
זה ההבדל היחיד ביניהם, והוא מופיע הרבה במבחנים.
התוצאה: קורס 1: 7/6, קורס 4: 2/1, ובשאר הקורסים כל ההגשות נבדקו.`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      totalSubmissions: { $sum: 1 },
      gradedSubmissions: { $sum: { $cond: [ { $ne: ["$grade", null] }, 1, 0 ] } } } }
])`,
      explain:`שלב $group אחד:
• totalSubmissions: { $sum: 1 } — מוסיף 1 לכל מסמך, כמו COUNT(*).
• gradedSubmissions — במונגו אין accumulator מקביל ל-COUNT(עמודה). לכן מוסיפים 1 רק כשיש ציון: $cond: [תנאי, 1, 0]. התנאי { $ne: ["$grade", null] } נכתב בתחביר של ביטוי, עם מערך של שני ערכים.
שימו לב לשני התחבירים: בתנאי של find/$match כותבים { grade: { $ne: null } }, ובתוך ביטוי (expression) כותבים { $ne: ["$grade", null] }.`
    }
  },

  { id:'d35', topic:'nulls', difficulty:2, source:'תרגול נוסף — NULL במיון',
    prompt:`הציגו את 3 הציונים הנמוכים ביותר, רק מהגשות שנבדקו.
פלט: id, studentId, grade, מהנמוך לגבוה (במונגו: _id במקום id).`,
    sql:{
      solution:`SELECT TOP 3 id, studentId, grade
FROM submissions
WHERE grade IS NOT NULL
ORDER BY grade;`,
      alt:[`SELECT TOP 3 id, studentId, grade FROM submissions WHERE grade IS NOT NULL ORDER BY grade ASC;`],
      explain:`המלכודת: ב-SQL Server ערכי NULL נחשבים "הכי קטנים" במיון, ולכן ORDER BY grade (ASC) מציב אותם ראשונים.
בלי WHERE grade IS NOT NULL, ה-TOP 3 היה מחזיר את שתי ההגשות שלא נבדקו ואחריהן את 60.
התוצאה: הגשה 16 (60), הגשה 7 (65), הגשה 6 (70).`
    },
    mongo:{
      solution:`db.submissions.find(
  { grade: { $ne: null } },
  { studentId: 1, grade: 1 }
).sort({ grade: 1 }).limit(3)`,
      alt:[
`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $sort: { grade: 1 } },
  { $limit: 3 },
  { $project: { studentId: 1, grade: 1 } }
])`],
      explain:`גם במונגו null קטן מכל מספר בסדר המיון, ולכן sort({ grade: 1 }) מציב את ה-null ראשונים. זו אותה מלכודת כמו ב-SQL Server.
1) תנאי { grade: { $ne: null } } — מסנן את ההגשות שלא נבדקו.
2) sort({ grade: 1 }) — מהנמוך לגבוה.
3) limit(3) — שלושת הראשונים.`
    }
  },

  { id:'d36', topic:'nulls', difficulty:3, source:'תרגול נוסף — ISNULL ↔ $ifNull',
    prompt:`לכל קורס חשבו שני ממוצעים: averageGraded (ממוצע רק של הגשות שנבדקו) ו-averageWithZeros (ממוצע שבו הגשה שטרם נבדקה נחשבת כ-0).
פלט: courseId, averageGraded, averageWithZeros, מעוגלים ל-2 ספרות אחרי הנקודה. במונגו מותר ש-courseId יופיע בשדה _id במקום בשדה נפרד (לא בשניהם).`,
    sql:{
      solution:`SELECT courseId,
       CAST(AVG(grade) AS DECIMAL(5,2))            AS averageGraded,
       CAST(AVG(ISNULL(grade, 0)) AS DECIMAL(5,2)) AS averageWithZeros
FROM submissions
GROUP BY courseId;`,
      alt:[
`SELECT courseId,
       CAST(AVG(grade) AS DECIMAL(5,2)),
       CAST(AVG(COALESCE(grade, 0)) AS DECIMAL(5,2))
FROM submissions
GROUP BY courseId;`,
`SELECT courseId, ROUND(AVG(grade), 2), ROUND(AVG(ISNULL(grade, 0)), 2)
FROM submissions
GROUP BY courseId;`,
`SELECT courseId,
       CAST(AVG(grade) AS DECIMAL(5,2)),
       CAST(SUM(ISNULL(grade, 0)) * 1.0 / COUNT(*) AS DECIMAL(5,2))
FROM submissions
GROUP BY courseId;`],
      explain:`AVG(grade) מתעלם מ-NULL: בקורס MongoDB ‏498 / 6 = 83.
ISNULL(grade, 0) מחליף NULL ב-0 לפני החישוב, ולכן ההגשה נספרת: ‏498 / 7 = 71.14. ב-Marketing: ‏70 מול 35.
ISNULL הוא פונקציה של T-SQL. COALESCE היא הגרסה הסטנדרטית, ויכולה לקבל יותר משני ארגומנטים.
CAST(... AS DECIMAL(5,2)) מעגל ל-2 ספרות.
דרך נוספת: SUM(ISNULL(grade, 0)) / COUNT(*). זהירות מחילוק שלמים: ב-SQL Server זה עובד כי grade הוא DECIMAL, אבל במנוע של האתר (SQLite) הציונים נשמרים כמספרים שלמים ו-498 / 7 נותן 71. לכן כופלים ב-1.0 (ראו פתרון חלופי אחרון).`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      averageGraded: { $avg: "$grade" },
      averageWithZeros: { $avg: { $ifNull: ["$grade", 0] } } } },
  { $project: {
      averageGraded: { $round: ["$averageGraded", 2] },
      averageWithZeros: { $round: ["$averageWithZeros", 2] } } }
])`,
      explain:`1) $group לפי courseId:
• $avg: "$grade" — מתעלם מ-null.
• $avg: { $ifNull: ["$grade", 0] } — ‏$ifNull מחזיר 0 כשה-grade הוא null או חסר, והוא המקביל ל-ISNULL ול-COALESCE.
2) $project עם $round: [ערך, 2] — עיגול ל-2 ספרות. _id (ה-courseId) נשאר.`
    }
  },

  /* ================== תאריכים ================== */

  { id:'d37', topic:'dates', difficulty:1, source:'תרגול נוסף — טווח תאריכים',
    prompt:`הציגו את ההרשמות שבוצעו בין 5 ל-8 באוקטובר 2025, כולל שני התאריכים.
פלט: id, studentId, courseId, enrollmentDate (במונגו: _id במקום id).`,
    sql:{
      solution:`SELECT id, studentId, courseId, enrollmentDate
FROM enrollments
WHERE enrollmentDate BETWEEN '2025-10-05' AND '2025-10-08';`,
      alt:[`SELECT id, studentId, courseId, enrollmentDate FROM enrollments WHERE enrollmentDate >= '2025-10-05' AND enrollmentDate <= '2025-10-08';`],
      explain:`עמודה מסוג DATE משווים לליטרל בפורמט 'YYYY-MM-DD', והוא מומר אוטומטית לתאריך.
BETWEEN כולל את שני הקצוות.
זהירות: אם העמודה הייתה DATETIME (עם שעה), BETWEEN ... AND '2025-10-08' היה מפספס רשומות מאוחר יותר באותו יום (08 בשעה 10:00 > 08 בשעה 00:00). אז עדיף < '2025-10-09'.
התוצאה: 6 הרשמות (5, 7, 8, 9, 10, 11).`
    },
    mongo:{
      solution:`db.enrollments.find(
  { enrollmentDate: { $gte: ISODate("2025-10-05"), $lte: ISODate("2025-10-08") } },
  { studentId: 1, courseId: 1, enrollmentDate: 1 }
)`,
      alt:[
`db.enrollments.find(
  { enrollmentDate: { $gte: new Date("2025-10-05"), $lt: new Date("2025-10-09") } },
  { studentId: 1, courseId: 1, enrollmentDate: 1 }
)`],
      explain:`במונגו התאריכים שמורים כאובייקט Date, כמו ב-DOCX: ISODate("2025-10-01"). לכן משווים מול ISODate(...) או new Date(...), ולא מול מחרוזת!
{ $gte: "2025-10-05" } (מחרוזת) לא ימצא כלום, כי מחרוזת ותאריך הם טיפוסים שונים.
$gte + $lte באותו אובייקט = טווח כולל. החלופה הבטוחה כשיש שעות: $lt של היום הבא.`
    }
  },

  { id:'d38', topic:'dates', difficulty:2, source:'תרגול נוסף — YEAR/MONTH ↔ טווח ISODate',
    prompt:`הציגו את ההגשות שהוגשו בחודש דצמבר 2025.
פלט: id, studentId, submissionDate (במונגו: _id במקום id).`,
    sql:{
      solution:`SELECT id, studentId, submissionDate
FROM submissions
WHERE YEAR(submissionDate) = 2025 AND MONTH(submissionDate) = 12;`,
      alt:[
`SELECT id, studentId, submissionDate FROM submissions WHERE submissionDate BETWEEN '2025-12-01' AND '2025-12-31';`,
`SELECT id, studentId, submissionDate FROM submissions WHERE submissionDate >= '2025-12-01' AND submissionDate < '2026-01-01';`],
      explain:`YEAR() ו-MONTH() (וגם DAY()) מחלצים חלק מתאריך ב-T-SQL.
חובה לבדוק גם את השנה. MONTH(...) = 12 לבד היה תופס גם את דצמבר של שנים אחרות.
החלופה עם טווח (>= '2025-12-01' AND < '2026-01-01') יעילה יותר כשיש אינדקס, כי לא מפעילים פונקציה על העמודה.
התוצאה: 10 הגשות.`
    },
    mongo:{
      solution:`db.submissions.find(
  { submissionDate: { $gte: ISODate("2025-12-01"), $lt: ISODate("2026-01-01") } },
  { studentId: 1, submissionDate: 1 }
)`,
      alt:[
`db.submissions.find(
  { $expr: { $and: [ { $eq: [ { $year: "$submissionDate" }, 2025 ] },
                     { $eq: [ { $month: "$submissionDate" }, 12 ] } ] } },
  { studentId: 1, submissionDate: 1 }
)`],
      explain:`הדרך הפשוטה: טווח, מ-1 בדצמבר (כולל) ועד 1 בינואר (לא כולל).
חלופה, המקבילה המדויקת ל-YEAR/MONTH: האופרטורים $year ו-$month הם ביטויים (expressions), ולכן צריך לעטוף אותם ב-$expr בתוך find.`
    }
  },

  { id:'d39', topic:'dates', difficulty:3, source:'תרגול נוסף — השוואה בין שני שדות תאריך (JOIN) ↔ $expr',
    prompt:`הציגו הגשות שהוגשו ביום האחרון של המטלה או אחריו (submissionDate >= dueDate).
פלט: submissionId, title, dueDate, submissionDate. במונגו מותר שמזהה ההגשה יופיע בשדה _id במקום בשדה נפרד (לא בשניהם).`,
    sql:{
      solution:`SELECT sub.id AS submissionId, a.title, a.dueDate, sub.submissionDate
FROM submissions sub
JOIN assignments a ON sub.assignmentId = a.id
WHERE sub.submissionDate >= a.dueDate;`,
      alt:[
`SELECT sub.id, a.title, a.dueDate, sub.submissionDate
FROM submissions sub
JOIN assignments a ON sub.assignmentId = a.id
WHERE DATEDIFF(day, a.dueDate, sub.submissionDate) >= 0;`],
      explain:`תאריך היעד נמצא ב-assignments ותאריך ההגשה ב-submissions, ולכן צריך JOIN ואז השוואה בין שתי עמודות.
DATEDIFF(day, start, end) מחזיר end פחות start בימים. ‏0 = באותו יום, ומספר חיובי = באיחור.
התוצאה: הגשה 14 (Joins Homework, ‏30/11) והגשה 15 (Regression Task, ‏15/12), שתיהן ביום האחרון. אין בנתונים הגשות באיחור.`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $lookup: { from: "assignments", localField: "assignmentId", foreignField: "_id", as: "assignment" } },
  { $unwind: "$assignment" },
  { $match: { $expr: { $gte: ["$submissionDate", "$assignment.dueDate"] } } },
  { $project: { title: "$assignment.title", dueDate: "$assignment.dueDate", submissionDate: 1 } }
])`,
      explain:`1) $lookup + $unwind ל-assignments — מביאים את dueDate לתוך מסמך ההגשה.
2) $match עם $expr — תנאי רגיל ב-$match משווה שדה לערך קבוע. כדי להשוות שני שדות של אותו מסמך צריך $expr, עם "$" לפני שמות השדות: { $gte: ["$submissionDate", "$assignment.dueDate"] }.
3) $project — title ו-dueDate מתוך המטלה, ו-submissionDate. _id הוא מזהה ההגשה.`
    }
  },

  /* ================== CASE ↔ $cond / $switch ================== */

  { id:'d40', topic:'case', difficulty:2, source:'תרגול נוסף — CASE ↔ $switch / $cond',
    prompt:`הציגו לכל הגשה תווית: "Not graded" אם אין ציון, "Pass" אם הציון 70 ומעלה, ואחרת "Fail".
פלט: id, studentId, grade, result (במונגו: _id במקום id).`,
    sql:{
      solution:`SELECT id, studentId, grade,
       CASE
         WHEN grade IS NULL THEN 'Not graded'
         WHEN grade >= 70   THEN 'Pass'
         ELSE 'Fail'
       END AS result
FROM submissions;`,
      alt:[
`SELECT id, studentId, grade,
       CASE WHEN grade >= 70 THEN 'Pass'
            WHEN grade < 70  THEN 'Fail'
            ELSE 'Not graded'
       END AS result
FROM submissions;`],
      explain:`CASE בודק את ה-WHEN לפי הסדר ועוצר בראשון שמתקיים. ELSE תופס את כל השאר.
המלכודת: בלי השורה WHEN grade IS NULL, הביטוי NULL >= 70 יוצא UNKNOWN (לא TRUE), ולכן הגשה שלא נבדקה הייתה נופלת ל-ELSE ומקבלת 'Fail'.
בפתרון החלופי ה-NULL נופל בכוונה ל-ELSE, וגם זה נכון.
CASE יכול להופיע ב-SELECT, ב-WHERE, ב-ORDER BY ובתוך פונקציות צבירה (ראו את השאלה על ספירת הגשות שעברו ונכשלו).`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $project: {
      studentId: 1, grade: 1,
      result: { $switch: {
        branches: [
          { case: { $eq: ["$grade", null] }, then: "Not graded" },
          { case: { $gte: ["$grade", 70] },  then: "Pass" }
        ],
        default: "Fail" } } } }
])`,
      alt:[
`db.submissions.aggregate([
  { $project: {
      studentId: 1, grade: 1,
      result: { $cond: [ { $eq: ["$grade", null] }, "Not graded",
                         { $cond: [ { $gte: ["$grade", 70] }, "Pass", "Fail" ] } ] } } }
])`],
      explain:`$project יוצר שדה מחושב result.
$switch הוא המקביל המדויק ל-CASE: ‏branches = רשימת WHEN/THEN (case/then), ו-default = ELSE. גם הוא עוצר בתנאי הראשון שמתקיים.
$cond: [תנאי, אם-כן, אם-לא] הוא ה-IF של מונגו, וקינון שלו נותן כמה מצבים (ראו חלופה). יש גם כתיב מלא: { $cond: { if: ..., then: ..., else: ... } }.
במונגו חובה לבדוק את null ראשון: בתוך ביטוי, null נחשב קטן מכל מספר, ולכן { $lt: ["$grade", 70] } מחזיר true עבור הגשה שלא נבדקה. החלופה של SQL (Pass, אחר כך Fail עם < 70, ו-'Not graded' ב-ELSE) לא עובדת כך במונגו: ההגשות שלא נבדקו יקבלו "Fail".
הסימולטור של האתר לא משחזר את ההתנהגות הזו של null, ולכן לא יתפוס את הטעות. שימו לב לזה בעצמכם.`
    }
  },

  { id:'d41', topic:'case', difficulty:3, source:'תרגול נוסף — SUM(CASE) ↔ $sum + $cond',
    prompt:`לכל קורס ספרו כמה הגשות עברו (ציון 70 ומעלה) וכמה נכשלו (מתחת ל-70), רק מהגשות שנבדקו.
פלט: courseId, passedCount, failedCount. במונגו מותר ש-courseId יופיע בשדה _id במקום בשדה נפרד (לא בשניהם).`,
    sql:{
      solution:`SELECT courseId,
       SUM(CASE WHEN grade >= 70 THEN 1 ELSE 0 END) AS passedCount,
       SUM(CASE WHEN grade <  70 THEN 1 ELSE 0 END) AS failedCount
FROM submissions
WHERE grade IS NOT NULL
GROUP BY courseId;`,
      alt:[
`SELECT courseId,
       COUNT(CASE WHEN grade >= 70 THEN 1 END),
       COUNT(CASE WHEN grade < 70 THEN 1 END)
FROM submissions
WHERE grade IS NOT NULL
GROUP BY courseId;`],
      explain:`"ספירה מותנית": CASE מחזיר 1 לשורה שעומדת בתנאי ו-0 לאחרת, ו-SUM סוכם את האחדות.
חלופה: COUNT(CASE WHEN ... THEN 1 END). בלי ELSE, ה-CASE מחזיר NULL, ו-COUNT מתעלם מ-NULL.
WHERE grade IS NOT NULL מוציא הגשות שלא נבדקו, כדי שלא ייספרו באף צד.
התוצאה: קורס 1: ‏5/1, קורס 2: ‏2/1, קורס 3: ‏2/0, קורס 4: ‏1/0, קורס 5: ‏2/0.`
    },
    mongo:{
      solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: {
      _id: "$courseId",
      passedCount: { $sum: { $cond: [ { $gte: ["$grade", 70] }, 1, 0 ] } },
      failedCount: { $sum: { $cond: [ { $lt:  ["$grade", 70] }, 1, 0 ] } } } }
])`,
      explain:`1) $match: { grade: { $ne: null } } — חובה! במונגו אמיתי, בהשוואה בתוך ביטוי null נחשב קטן מכל מספר, ולכן { $lt: [null, 70] } מחזיר true. בלי הסינון, הגשה שלא נבדקה הייתה נספרת כנכשלת. (הסימולטור של האתר לא משחזר את זה ויקבל גם תשובה בלי $match, אבל במונגו אמיתי היא שגויה.)
2) $group לפי courseId:
• passedCount: { $sum: { $cond: [ { $gte: ["$grade", 70] }, 1, 0 ] } } — מוסיף 1 רק כשהתנאי מתקיים, בדיוק כמו SUM(CASE WHEN ... THEN 1 ELSE 0 END).
• failedCount — אותו דבר עם $lt.`
    }
  }

];
