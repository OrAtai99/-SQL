/* ============================================================
   קורס 3964 — תרגילי MongoDB חיים (נבדקים מול MongoSim בדפדפן)
   מאגר: college2 (students · lecturers · courses+lessons · enrollments · assignments · submissions)
   חוזה לכל תרגיל:
     id, set:'pdf'|'lesson'|'crud'|'agg', topic, dataset:'college2', prompt,
     check:'result'|'state', collection? (ל-state), compare?:'values'|'docs'|'ids'|'count', ordered?,
     solution, alt?, hint, explain, source, expectEmpty?
   set:
     pdf    — 15 התרגילים של "עבודת הגשה MongoDB – מערכת לניהול מכללה" (מותאמים לנתונים)
     lesson — שיעור ה-NoSQL: חלק ה' (משימות 1-10) + שאלות 1, 6, 7, 8
     crud   — תרגול לכל פקודה/אופרטור מדף "פקודות חשובות ב-NoSQL" של המרצה
     agg    — Aggregation: $match/$group/$sort/$limit/$project/$count/$unwind/$lookup/$addFields/$cond/$round,
              anti-join, HAVING, ושאלות "עבודת ישור קו" (גרסת המונגו)
   הפתרונות כאן הם פתרונות לדוגמה (לא רשמיים של המרצה) — נבדקו מול הנתונים.
   ============================================================ */
window.SQLC = window.SQLC || {};
SQLC.nosql = SQLC.nosql || {};

SQLC.nosql.exercises = [

  /* ======================================================================
     חלק א' — עבודת ההגשה (PDF): 15 תרגילים
     ====================================================================== */
  { id:'mpdf1', set:'pdf', topic:'find', dataset:'college2',
    prompt:`תרגיל 1 — הציגו את כל הסטודנטים.`,
    check:'result', compare:'ids',
    solution:`db.students.find()`,
    alt:[`db.students.find({})`, `db.students.find({}).pretty()`, `db.students.aggregate([])`],
    hint:`find() בלי תנאי (או עם מסנן ריק {}) מחזיר את כל המסמכים ב-Collection.`,
    explain:`Collection: students · find — זו שליפה פשוטה בלי חישוב ובלי חיבור, ולכן אין צורך ב-aggregate.
find() בלי מסנן מחזיר את כל המסמכים (כמו SELECT * FROM students).
ב-Mongo Shell אפשר להוסיף .pretty() כדי לקבל תצוגה מסודרת. אם יש הרבה מסמכים, ה-Shell מציג 20 בכל פעם, ו-it מציג את הבאים.
הערה: בסימולטור ה-_id הוא מספר (1, 2, 3…) כדי שיהיה קל לקרוא. במונגו אמיתי הוא ObjectId("…").`,
    source:`עבודת הגשה MongoDB — תרגיל 1` },

  { id:'mpdf2', set:'pdf', topic:'find', dataset:'college2',
    prompt:`תרגיל 2 — הציגו את כל הסטודנטים שגרים בתל אביב (city הוא "Tel Aviv"). הציגו את המסמכים המלאים (אם בוחרים להציג רק חלק מהשדות, צריך להשאיר את _id).`,
    check:'result', compare:'ids',
    solution:`db.students.find({ city: "Tel Aviv" })`,
    alt:[`db.students.find({ city: { $eq: "Tel Aviv" } })`, `db.students.aggregate([ { $match: { city: "Tel Aviv" } } ])`],
    hint:`מסנן במבנה { שדה: ערך } — זה ה-WHERE של מונגו.`,
    explain:`Collection: students · find — צריך רק לסנן, בלי לקבץ.
המסנן { city: "Tel Aviv" } הוא תנאי שוויון, כמו WHERE city = 'Tel Aviv'.
ההשוואה רגישה לאותיות גדולות וקטנות: "tel aviv" לא יחזיר אף מסמך.
התוצאה: David, Maya, Itai.`,
    source:`עבודת הגשה MongoDB — תרגיל 2` },

  { id:'mpdf3', set:'pdf', topic:'update', dataset:'college2',
    prompt:`תרגיל 3 — עדכנו את מספר הטלפון של הסטודנטית Noa Cohen (_id: 2) ל-"0529999999", ואחר כך הציגו אותה כדי לוודא שהעדכון הצליח.`,
    check:'state', collection:'students',
    solution:`db.students.updateOne(
  { _id: 2 },
  { $set: { phone: "0529999999" } }
)
db.students.find({ _id: 2 })`,
    alt:[`db.students.updateOne({ firstName: "Noa", lastName: "Cohen" }, { $set: { phone: "0529999999" } })
db.students.findOne({ firstName: "Noa", lastName: "Cohen" })`,
         `db.students.findOneAndUpdate({ _id: 2 }, { $set: { phone: "0529999999" } }, { returnNewDocument: true })`],
    hint:`updateOne(מסנן, { $set: { שדה: ערך } }) ואחריו find או findOne עם אותו מסנן.`,
    explain:`Collection: students · updateOne — מעדכנים מסמך אחד בלבד.
הארגומנט הראשון ({ _id: 2 }) בוחר את המסמך. השני ({ $set: { phone: … } }) משנה רק את השדה phone, וכל שאר השדות נשארים כמו שהם.
בלי $set (למשל { phone: "…" } לבד) מונגו מחזיר שגיאה, כי עדכון חייב אופרטור. להחלפת מסמך שלם יש את replaceOne.
הפקודה find({ _id: 2 }) אחרי העדכון היא שלב האימות שהמרצה ביקש.
ב-SQL: UPDATE students SET phone = '0529999999' WHERE id = 2;`,
    source:`עבודת הגשה MongoDB — תרגיל 3` },

  { id:'mpdf4', set:'pdf', topic:'update', dataset:'college2',
    prompt:`תרגיל 4 — הוסיפו לכל הסטודנטים שגרים ב-"Tel Aviv" שדה חדש region עם הערך "Center".`,
    check:'state', collection:'students',
    solution:`db.students.updateMany(
  { city: "Tel Aviv" },
  { $set: { region: "Center" } }
)`,
    alt:[`db.students.update({ city: "Tel Aviv" }, { $set: { region: "Center" } }, { multi: true })`],
    hint:`כשצריך לעדכן כמה מסמכים משתמשים ב-updateMany. updateOne יעדכן רק את הראשון.`,
    explain:`Collection: students · updateMany — העדכון חל על כל המסמכים שעונים לתנאי.
‏$set על שדה שלא קיים מוסיף אותו. זו הגמישות של מונגו (Flexible Schema): רק ל-3 סטודנטים מתל אביב יהיה region, ולשאר המסמכים לא יהיה השדה בכלל.
ב-SQL היינו צריכים קודם ALTER TABLE students ADD region VARCHAR(20), ואז הייתה נוספת עמודה לכל השורות (עם NULL), ורק אחר כך UPDATE … WHERE city = 'Tel Aviv'.
טעות נפוצה: updateOne מעדכן רק את המסמך הראשון שנמצא (David).`,
    source:`עבודת הגשה MongoDB — תרגיל 4` },

  { id:'mpdf5', set:'pdf', topic:'aggregate', dataset:'college2',
    prompt:`תרגיל 5 — מצאו את כל הסטודנטים שרשומים ליותר מקורס אחד (ספרו את כל ההרשמות, בלי סינון לפי status).
התוצאה צריכה להכיל: studentId, coursesCount (בלי _id).`,
    check:'result',
    solution:`db.enrollments.aggregate([
  { $group: { _id: "$studentId", coursesCount: { $sum: 1 } } },
  { $match: { coursesCount: { $gt: 1 } } },
  { $project: { _id: 0, studentId: "$_id", coursesCount: 1 } }
])`,
    alt:[`db.enrollments.aggregate([
  { $group: { _id: "$studentId", coursesCount: { $count: {} } } },
  { $match: { coursesCount: { $gt: 1 } } },
  { $project: { _id: 0, studentId: "$_id", coursesCount: 1 } }
])`,
         `db.enrollments.aggregate([
  { $group: { _id: "$studentId", coursesCount: { $sum: 1 } } },
  { $match: { coursesCount: { $gte: 2 } } }
])`],
    hint:`$group לפי "$studentId" עם { $sum: 1 }, ואחריו $match על השדה המחושב (זה ה-HAVING).`,
    explain:`Collection: enrollments, כי כל מסמך שם הוא הרשמה אחת · aggregate, כי צריך לקבץ ולספור.
1. $group: מקבץ לפי studentId. הביטוי { $sum: 1 } מוסיף 1 על כל מסמך בקבוצה, כמו COUNT(*).
2. $match: בא אחרי הקיבוץ, ולכן הוא מסנן קבוצות (כמו HAVING) ומשאיר רק coursesCount גדול מ-1.
3. $project: מעביר את מפתח הקבוצה (_id) לשדה studentId ומסתיר את _id.
התוצאה: 1 (3 קורסים), 2 (2), 4 (2), 7 (3).
ב-SQL: SELECT studentId, COUNT(*) AS coursesCount FROM enrollments GROUP BY studentId HAVING COUNT(*) > 1;`,
    source:`עבודת הגשה MongoDB — תרגיל 5` },

  { id:'mpdf6', set:'pdf', topic:'aggregate', dataset:'college2',
    prompt:`תרגיל 6 — חשבו כמה סטודנטים רשומים לכל קורס (כל ההרשמות). הציגו כל קורס שיש בו לפחות הרשמה אחת.
התוצאה: courseId, studentsCount (בלי _id).`,
    check:'result',
    solution:`db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $project: { _id: 0, courseId: "$_id", studentsCount: 1 } }
])`,
    alt:[`db.enrollments.aggregate([ { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } } ])`,
         `db.enrollments.aggregate([ { $group: { _id: "$courseId", studentsCount: { $count: {} } } }, { $sort: { _id: 1 } } ])`],
    hint:`אותו דבר כמו תרגיל 5, רק שמקבצים לפי "$courseId" ובלי סינון אחרי הקיבוץ.`,
    explain:`Collection: enrollments · aggregate.
1. $group: קבוצה לכל courseId, ובכל קבוצה { $sum: 1 } סופר את ההרשמות.
2. $project: מציג courseId ו-studentsCount.
שימו לב: קורס 6 (Cyber Security) לא מופיע, כי אין לו אף מסמך ב-enrollments ו-$group רואה רק מסמכים שקיימים. כדי לקבל גם קורסים עם 0 מתחילים מ-courses ומשתמשים ב-$lookup + $size (ראו תרגיל Aggregation "כולל קורסים ריקים").
ב-SQL: SELECT courseId, COUNT(*) FROM enrollments GROUP BY courseId;`,
    source:`עבודת הגשה MongoDB — תרגיל 6` },

  { id:'mpdf7', set:'pdf', topic:'aggregate', dataset:'college2',
    prompt:`תרגיל 7 — מצאו את כל הקורסים שבהם רשומים יותר מ-2 סטודנטים (כל ההרשמות).
התוצאה: courseId, studentsCount (בלי _id).`,
    check:'result',
    solution:`db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $match: { studentsCount: { $gt: 2 } } },
  { $project: { _id: 0, courseId: "$_id", studentsCount: 1 } }
])`,
    alt:[`db.courses.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enr" } },
  { $project: { _id: 0, courseId: "$_id", studentsCount: { $size: "$enr" } } },
  { $match: { studentsCount: { $gt: 2 } } }
])`],
    hint:`"יותר מ-2" זה $gt: 2 ולא $gte: 2.`,
    explain:`Collection: enrollments · aggregate.
1. $group: סופר הרשמות לכל courseId.
2. $match: אחרי הקיבוץ, משאיר רק studentsCount גדול מ-2 (זה ה-HAVING).
3. $project: מעצב את הפלט.
התוצאה: קורס 1 (5), קורס 2 (3), קורס 5 (3).
מלכודת: "יותר מ-2" זה $gt: 2. עם $gte: 2 ייכנסו גם קורסים 3 ו-4.
ב-SQL: … GROUP BY courseId HAVING COUNT(*) > 2;`,
    source:`עבודת הגשה MongoDB — תרגיל 7` },

  { id:'mpdf8', set:'pdf', topic:'aggregate', dataset:'college2',
    prompt:`תרגיל 8 — חשבו את ממוצע הציונים בכל קורס (לפי submissions; בלי עיגול).
התוצאה: courseId, averageGrade (בלי _id).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $project: { _id: 0, courseId: "$_id", averageGrade: 1 } }
])`,
    alt:[`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $project: { _id: 0, courseId: "$_id", averageGrade: 1 } }
])`],
    hint:`$group לפי "$courseId" עם { $avg: "$grade" }. ל-submissions יש courseId משלה, אז לא צריך $lookup.`,
    explain:`Collection: submissions, כי הציונים נמצאים שם ולכל הגשה יש courseId · aggregate.
1. $group: קבוצה לכל קורס, ו-{ $avg: "$grade" } מחשב ממוצע.
2. $project: courseId ו-averageGrade.
‏$avg מתעלם מ-null (בדיוק כמו AVG ב-SQL), ולכן ההגשה של Shira שעוד לא נבדקה לא מורידה את הממוצע של Marketing. לכן גם עם $match: { grade: { $ne: null } } וגם בלעדיו מקבלים כאן אותה תוצאה.
התוצאה: 1→83, 2→75, 3→91, 4→70, 5→85.5.
ב-SQL: SELECT courseId, AVG(grade) FROM submissions GROUP BY courseId; (ב-SQL Server, AVG על עמודת INT מחזיר מספר שלם. כאן grade הוא DECIMAL, ולכן 85.5 נשמר).`,
    source:`עבודת הגשה MongoDB — תרגיל 8` },

  { id:'mpdf9', set:'pdf', topic:'aggregate', dataset:'college2',
    prompt:`תרגיל 9 — לכל קורס חשבו: ממוצע ציונים, ציון מקסימלי, ציון מינימלי ומספר ההגשות (כל ההגשות לקורס, כולל הגשות שעוד לא נבדקו).
התוצאה: courseId, averageGrade, maxGrade, minGrade, submissionsCount (בלי _id).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      averageGrade: { $avg: "$grade" },
      maxGrade: { $max: "$grade" },
      minGrade: { $min: "$grade" },
      submissionsCount: { $sum: 1 }
  } },
  { $project: { _id: 0, courseId: "$_id", averageGrade: 1, maxGrade: 1, minGrade: 1, submissionsCount: 1 } }
])`,
    alt:[`db.submissions.aggregate([
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" }, maxGrade: { $max: "$grade" },
              minGrade: { $min: "$grade" }, submissionsCount: { $count: {} } } },
  { $project: { _id: 0, courseId: "$_id", averageGrade: 1, maxGrade: 1, minGrade: 1, submissionsCount: 1 } }
])`],
    hint:`אפשר לחשב כמה Accumulators באותו $group: ‏$avg, ‏$max, ‏$min, ‏$sum.`,
    explain:`Collection: submissions · aggregate.
1. $group: לכל courseId מחשבים 4 ערכים במעבר אחד: $avg, $max, $min (כולם מתעלמים מ-null), ו-{ $sum: 1 } שסופר את כל המסמכים בקבוצה, כולל אלה עם grade: null.
2. $project: מסדר את שמות השדות כמו בדוגמה של המרצה.
קורס 1: ממוצע 83, מקסימום 100, מינימום 60, ‏7 הגשות (אחת מהן בלי ציון).
אם רוצים לספור רק הגשות שנבדקו, מוסיפים קודם $match: { grade: { $ne: null } }. ב-SQL זה ההבדל בין COUNT(*) ל-COUNT(grade).
ב-SQL: SELECT courseId, AVG(grade), MAX(grade), MIN(grade), COUNT(*) FROM submissions GROUP BY courseId;`,
    source:`עבודת הגשה MongoDB — תרגיל 9` },

  { id:'mpdf10', set:'pdf', topic:'lookup', dataset:'college2',
    prompt:`תרגיל 10 — מצאו את כל הסטודנטים שלא רשומים לאף קורס. הציגו את מסמכי הסטודנטים (אם בוחרים להציג רק חלק מהשדות, צריך להשאיר את _id).`,
    check:'result', compare:'ids',
    solution:`db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $match: { enrollments: { $size: 0 } } }
])`,
    alt:[`db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $match: { enrollments: { $eq: [] } } }
])`,
         `db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $match: { "enrollments.0": { $exists: false } } }
])`,
         `db.students.find({ _id: { $nin: db.enrollments.distinct("studentId") } })`],
    hint:`מחברים students עם enrollments באמצעות $lookup. לסטודנט בלי הרשמות יתקבל מערך ריק, ומסננים לפי { $size: 0 }.`,
    explain:`Collection: students, כי מחפשים סטודנטים. מתחילים מהצד שאמור להופיע בתוצאה · aggregate, כי צריך חיבור.
1. $lookup: לכל סטודנט מוסיף מערך enrollments עם כל ההרשמות שבהן studentId שווה ל-_id שלו. זה LEFT JOIN: גם סטודנט בלי הרשמות נשאר, עם מערך ריק [].
2. $match: { enrollments: { $size: 0 } } משאיר רק את מי שהמערך שלו ריק. זה ה-Anti-Join.
התוצאה: Lior Shalom (_id 10).
דרך נוספת: find עם $nin על הרשימה ש-distinct("studentId") מחזיר.
זו גם שאלה 2 ב"עבודת ישור קו".
ב-SQL: SELECT s.* FROM students s LEFT JOIN enrollments e ON s.id = e.studentId WHERE e.id IS NULL; (או NOT EXISTS / NOT IN).`,
    source:`עבודת הגשה MongoDB — תרגיל 10` },

  { id:'mpdf11', set:'pdf', topic:'lookup', dataset:'college2',
    prompt:`תרגיל 11 — הציגו את כל ההרשמות יחד עם פרטי הסטודנט. כל תוצאה צריכה לכלול את כל שדות ההרשמה ואת מסמך הסטודנט המלא (בשדה student).`,
    check:'result',
    solution:`db.enrollments.aggregate([
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" }
])`,
    alt:[`db.enrollments.aggregate([
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } }
])`],
    hint:`$lookup מ-enrollments אל students: ‏localField הוא studentId ו-foreignField הוא _id.`,
    explain:`Collection: enrollments, כי רוצים שורה לכל הרשמה · aggregate, כי צריך חיבור.
1. $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } מוסיף לכל הרשמה מערך עם הסטודנט המתאים. זה ה-JOIN.
2. $unwind: "$student" הופך את המערך (שיש בו איבר אחד) לאובייקט רגיל, כך שהתוצאה קריאה יותר (student.firstName ולא student[0].firstName).
התוצאה: 15 הרשמות, כל אחת עם פרטי הסטודנט שלה.
ב-SQL: SELECT * FROM enrollments e JOIN students s ON e.studentId = s.id;`,
    source:`עבודת הגשה MongoDB — תרגיל 11` },

  { id:'mpdf12', set:'pdf', topic:'lookup', dataset:'college2',
    prompt:`תרגיל 12 — הציגו את כל ההרשמות עם שם הסטודנט, שם הקורס ותאריך ההרשמה.
התוצאה: studentName (שם פרטי, רווח ושם משפחה, למשל "David Levi"), courseName, enrollmentDate (התאריך כפי שהוא שמור). בלי _id.`,
    check:'result',
    solution:`db.enrollments.aggregate([
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: {
      _id: 0,
      studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      courseName: "$course.courseName",
      enrollmentDate: 1
  } }
])`,
    alt:[`db.enrollments.aggregate([
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "c" } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "s" } },
  { $unwind: "$c" }, { $unwind: "$s" },
  { $project: { _id: 0, studentName: { $concat: ["$s.firstName", " ", "$s.lastName"] }, courseName: "$c.courseName", enrollmentDate: 1 } }
])`],
    hint:`שני $lookup (אחד ל-students ואחד ל-courses), כל אחד עם $unwind אחריו, ובסוף $project עם $concat.`,
    explain:`Collection: enrollments, כי ההרשמה היא טבלת הקישור שמחזיקה גם studentId וגם courseId · aggregate.
1. $lookup ל-students ואחריו $unwind: מצרף את מסמך הסטודנט כאובייקט.
2. $lookup ל-courses ואחריו $unwind: מצרף את מסמך הקורס.
3. $project: ‏$concat מחבר שם פרטי, רווח ושם משפחה. "$course.courseName" שולף שדה מתוך האובייקט המצורף (Dot Notation). ‏enrollmentDate: 1 משאיר את השדה המקורי, ו-_id: 0 מסתיר את המזהה.
ב-SQL: SELECT s.firstName + ' ' + s.lastName AS studentName, c.courseName, e.enrollmentDate FROM enrollments e JOIN students s ON e.studentId = s.id JOIN courses c ON e.courseId = c.id;`,
    source:`עבודת הגשה MongoDB — תרגיל 12` },

  { id:'mpdf13', set:'pdf', topic:'lookup', dataset:'college2',
    prompt:`תרגיל 13 — מצאו את שלושת הקורסים עם מספר הסטודנטים הגדול ביותר (כל ההרשמות).
התוצאה: courseName, studentsCount, ממוינים מהגדול לקטן (בלי _id). בתיקו: לפי מספר הקורס (courseId) בסדר עולה.`,
    check:'result',
    solution:`db.enrollments.aggregate([
  { $group: { _id: "$courseId", studentsCount: { $sum: 1 } } },
  { $sort: { studentsCount: -1, _id: 1 } },
  { $limit: 3 },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, courseName: "$course.courseName", studentsCount: 1 } }
])`,
    alt:[`db.courses.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enr" } },
  { $project: { _id: 1, courseName: 1, studentsCount: { $size: "$enr" } } },
  { $sort: { studentsCount: -1, _id: 1 } },
  { $limit: 3 },
  { $project: { _id: 0, courseName: 1, studentsCount: 1 } }
])`],
    hint:`סופרים לפי courseId, ממיינים בסדר יורד ({ studentsCount: -1, _id: 1 }), לוקחים 3 עם $limit, ורק אז מביאים את שם הקורס.`,
    explain:`Collection: enrollments · aggregate.
1. $group: סופר הרשמות לכל קורס.
2. $sort: { studentsCount: -1, _id: 1 } ממיין מהגדול לקטן (‎-1 = יורד, ‏1 = עולה). המפתח השני (_id, שהוא כאן courseId) מכריע רק כשיש תיקו.
3. $limit: 3 משאיר רק את שלושת הראשונים (כמו TOP 3).
4. $lookup + $unwind: מביא את מסמך הקורס כדי להציג את שמו. כדאי לעשות את זה אחרי $limit, כי ככה החיבור רץ רק על 3 מסמכים.
5. $project: courseName ו-studentsCount.
התוצאה: MongoDB (5), SQL Server (3), Statistics (3). ל-SQL Server ול-Statistics יש תיקו, ולכן צריך מפתח מיון שני. בלי מפתח כזה מונגו לא מבטיח את הסדר ביניהם.
ב-SQL: SELECT TOP 3 c.courseName, COUNT(*) AS studentsCount FROM enrollments e JOIN courses c ON e.courseId = c.id GROUP BY c.id, c.courseName ORDER BY COUNT(*) DESC, c.id;`,
    source:`עבודת הגשה MongoDB — תרגיל 13` },

  { id:'mpdf14', set:'pdf', topic:'lookup', dataset:'college2',
    prompt:`תרגיל 14 — חשבו את ממוצע הציונים של כל סטודנט. השתמשו רק בהגשות שקיבלו ציון, כך שסטודנט שאין לו אף ציון לא יופיע.
התוצאה: studentName (למשל "David Levi"), averageGrade (בלי עיגול, בלי _id).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$studentId", averageGrade: { $avg: "$grade" } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: {
      _id: 0,
      studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      averageGrade: 1
  } }
])`,
    alt:[`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "s" } },
  { $unwind: "$s" },
  { $group: { _id: { $concat: ["$s.firstName", " ", "$s.lastName"] }, averageGrade: { $avg: "$grade" } } }
])`],
    hint:`$match ‏(grade שונה מ-null) ← $group לפי studentId עם $avg ← ‏$lookup ל-students ← ‏$unwind ← ‏$project עם $concat.`,
    explain:`Collection: submissions, כי שם נמצאים הציונים · aggregate.
1. $match: { grade: { $ne: null } } מסנן הגשות שעוד לא נבדקו. בלי השלב הזה Shira הייתה מופיעה עם averageGrade: null. (בסימולטור היא מופיעה עם 0. זו מגבלה של הסימולטור, ובמבחן כותבים null.)
2. $group: ממוצע לכל studentId.
3. $lookup + $unwind: מביא את מסמך הסטודנט כדי לקבל את השם. עושים את זה אחרי הקיבוץ, ולכן החיבור רץ על 7 מסמכים ולא על 14.
4. $project: ‏$concat יוצר studentName, ומשאירים את averageGrade.
התוצאה: David Levi 88.75, Noa Cohen 74, Yossi Mizrahi 65, Maya Peretz 87.5, Omer Biton 90, Itai Friedman 84.33…, Tamar Golan 60.
ב-SQL: SELECT s.firstName + ' ' + s.lastName, AVG(sub.grade) FROM submissions sub JOIN students s ON sub.studentId = s.id WHERE sub.grade IS NOT NULL GROUP BY s.id, s.firstName, s.lastName;`,
    source:`עבודת הגשה MongoDB — תרגיל 14` },

  { id:'mpdf15', set:'pdf', topic:'aggregate', dataset:'college2',
    prompt:`תרגיל 15 — מצאו לכל סטודנט את הקורס שבו ממוצע הציונים שלו הוא הגבוה ביותר (רק הגשות שקיבלו ציון).
התוצאה: studentId, courseId, averageGrade (בלי _id).`,
    check:'result', ordered:false,
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: { studentId: "$studentId", courseId: "$courseId" }, averageGrade: { $avg: "$grade" } } },
  { $sort: { averageGrade: -1 } },
  { $group: {
      _id: "$_id.studentId",
      courseId: { $first: "$_id.courseId" },
      averageGrade: { $first: "$averageGrade" }
  } },
  { $project: { _id: 0, studentId: "$_id", courseId: 1, averageGrade: 1 } }
])`,
    alt:[`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: { s: "$studentId", c: "$courseId" }, avg: { $avg: "$grade" } } },
  { $sort: { "_id.s": 1, avg: -1 } },
  { $group: { _id: "$_id.s", courseId: { $first: "$_id.c" }, averageGrade: { $first: "$avg" } } }
])`],
    hint:`שני $group: הראשון לפי זוג (studentId, courseId) עם $avg, אחריו $sort יורד לפי הממוצע, והשני לפי studentId עם $first.`,
    explain:`Collection: submissions · aggregate. זו בעיית "המקסימום בתוך כל קבוצה".
1. $match: רק הגשות עם ציון.
2. $group ראשון: המפתח הוא מסמך { studentId, courseId }, ולכן יש קבוצה לכל זוג סטודנט-קורס עם הממוצע שלו.
3. $sort: { averageGrade: -1 } ממיין את כל הזוגות מהממוצע הגבוה לנמוך.
4. $group שני: מקבץ שוב, הפעם לפי studentId בלבד. ‏$first לוקח את המסמך הראשון בכל קבוצה, ובגלל המיון זה הקורס עם הממוצע הגבוה ביותר.
5. $project: מעצב את הפלט.
התוצאה: 1→קורס 3 (92), 2→קורס 1 (78), 3→קורס 2 (65), 4→קורס 3 (90), 5→קורס 5 (90), 7→קורס 1 (100), 8→קורס 1 (60).
אם מחליפים את $sort ו-$first ב-$max, מקבלים את הממוצע הגבוה אבל לא יודעים באיזה קורס הוא.`,
    source:`עבודת הגשה MongoDB — תרגיל 15` },

  /* ======================================================================
     חלק ב' — שיעור ה-NoSQL (חלק ה' + שאלות 1, 6, 7, 8)
     ====================================================================== */
  { id:'mles1', set:'lesson', topic:'projection', dataset:'college2',
    prompt:`חלק ה', משימה 1 — הציגו את כל הסטודנטים, הפעם רק עם firstName, lastName, email (בלי _id).`,
    check:'result',
    solution:`db.students.find({}, { _id: 0, firstName: 1, lastName: 1, email: 1 })`,
    alt:[`db.students.find().project({ _id: 0, firstName: 1, lastName: 1, email: 1 })`,
         `db.students.aggregate([ { $project: { _id: 0, firstName: 1, lastName: 1, email: 1 } } ])`],
    hint:`הארגומנט השני של find הוא Projection: ‏1 = להציג, ‏0 = להסתיר. את _id צריך להסתיר במפורש.`,
    explain:`Collection: students · find עם Projection.
הארגומנט הראשון {} אומר שאין סינון. השני קובע אילו שדות יוצגו.
‏_id מוצג תמיד, אלא אם כותבים _id: 0. זה המקרה היחיד שבו מותר לשלב 0 ו-1 באותה Projection.
ב-SQL: SELECT firstName, lastName, email FROM students;`,
    source:`שיעור NoSQL — חלק ה', משימה 1 (בתוספת Projection)` },

  { id:'mles2', set:'lesson', topic:'operators', dataset:'college2',
    prompt:`חלק ה', משימה 2 — הציגו את כל הסטודנטים שנרשמו למכללה אחרי 2024 (registrationYear גדול מ-2024).`,
    check:'result', compare:'ids',
    solution:`db.students.find({ registrationYear: { $gt: 2024 } })`,
    alt:[`db.students.find({ registrationYear: { $gte: 2025 } })`],
    hint:`אופרטור השוואה נכתב בתוך השדה: { שדה: { $gt: ערך } }.`,
    explain:`Collection: students · find.
‏{ $gt: 2024 } פירושו "גדול מ-". האופרטורים $gt, $gte, $lt, $lte תמיד נכתבים בתוך השדה.
בשיעור השדה היה registrationDate מסוג תאריך, ואז כותבים: find({ registrationDate: { $gt: new Date("2026-01-01") } }). בנתונים שלנו יש registrationYear, שהוא מספר.
התוצאה: Noa, Maya, Shira, Lior.
ב-SQL: SELECT * FROM students WHERE registrationYear > 2024;`,
    source:`שיעור NoSQL — חלק ה', משימה 2` },

  { id:'mles2b', set:'lesson', topic:'operators', dataset:'college2',
    prompt:`חלק ה', משימה 2 (גרסת תאריך) — הציגו את כל ההרשמות שבוצעו אחרי 7 באוקטובר 2025 (enrollmentDate מאוחר מ-2025-10-07, לא כולל).`,
    check:'result', compare:'ids',
    solution:`db.enrollments.find({ enrollmentDate: { $gt: ISODate("2025-10-07") } })`,
    alt:[`db.enrollments.find({ enrollmentDate: { $gt: new Date("2025-10-07") } })`,
         `db.enrollments.find({ enrollmentDate: { $gte: ISODate("2025-10-08") } })`],
    hint:`משווים תאריך לתאריך: ISODate("2025-10-07") או new Date("2025-10-07").`,
    explain:`Collection: enrollments · find.
תאריכים במונגו נשמרים כאובייקט Date, ולכן משווים אותם לתאריך ולא למחרוזת. השוואה ל-"2025-10-07" כמחרוזת לא תחזיר כלום.
‏$gt לא כולל את היום עצמו, ולכן ההרשמה מ-7.10 (מס' 9) לא נכנסת.
התוצאה: הרשמות 10 עד 15.
ב-SQL: SELECT * FROM enrollments WHERE enrollmentDate > '2025-10-07';`,
    source:`שיעור NoSQL — חלק ה', משימה 2 (השוואת תאריכים)` },

  { id:'mles3', set:'lesson', topic:'array', dataset:'college2',
    prompt:`חלק ה', משימה 3 — הציגו את כל הקורסים שיש בהם לפחות 3 שיעורים (במערך lessons המוטמע).`,
    check:'result', compare:'ids',
    solution:`db.courses.find({ $expr: { $gte: [ { $size: "$lessons" }, 3 ] } })`,
    alt:[`db.courses.find({ "lessons.2": { $exists: true } })`,
         `db.courses.aggregate([
  { $addFields: { lessonsCount: { $size: "$lessons" } } },
  { $match: { lessonsCount: { $gte: 3 } } }
])`],
    hint:`האופרטור $size בתוך find יודע לבדוק רק גודל מדויק. לבדיקה של "לפחות" צריך $expr, או את הטריק "lessons.2".`,
    explain:`Collection: courses · find עם $expr. השיעורים מוטמעים (Embedded) בתוך מסמך הקורס.
‏{ lessons: { $size: 3 } } מחזיר רק קורסים עם בדיוק 3 שיעורים, ולא תומך ב-$gte.
לכן משתמשים ב-$expr, שמאפשר להשתמש בביטויי Aggregation בתוך find: ‏{ $size: "$lessons" } מחשב את אורך המערך, ו-$gte משווה אותו ל-3.
טריק נוסף: "lessons.2" הוא האיבר השלישי במערך (האינדקס מתחיל ב-0). אם הוא קיים, יש לפחות 3 שיעורים.
התוצאה: MongoDB (4), SQL Server (3), Statistics (3).`,
    source:`שיעור NoSQL — חלק ה', משימה 3` },

  { id:'mles4', set:'lesson', topic:'lookup', dataset:'college2',
    prompt:`חלק ה', משימה 4 — הציגו את כל הקורסים שיש בהם לפחות מטלה אחת עם maxGrade של 100. המטלות נמצאות ב-Collection נפרד בשם assignments. הציגו את מסמכי הקורסים (אם בוחרים להציג רק חלק מהשדות, צריך להשאיר את _id).`,
    check:'result', compare:'ids',
    solution:`db.courses.aggregate([
  { $lookup: { from: "assignments", localField: "_id", foreignField: "courseId", as: "assignments" } },
  { $match: { "assignments.maxGrade": 100 } }
])`,
    alt:[`db.courses.find({ _id: { $in: db.assignments.distinct("courseId", { maxGrade: 100 }) } })`],
    hint:`$lookup מ-courses אל assignments, ואחריו $match על "assignments.maxGrade".`,
    explain:`Collection: courses · aggregate, כי המטלות שמורות ב-Collection אחר.
1. $lookup: מצרף לכל קורס מערך עם המטלות שלו.
2. $match: { "assignments.maxGrade": 100 }. כשמשתמשים ב-Dot Notation על מערך, התנאי מתקיים אם לפחות איבר אחד במערך עומד בו.
בשיעור המטלות היו מוטמעות בתוך הקורס, ואז הפתרון היה פשוט find({ "assignments.maxGrade": 100 }). זה אחד היתרונות של Embedding.
התוצאה: MongoDB, SQL Server, Python, Statistics. ל-Marketing יש מטלה עם maxGrade 80, ול-Cyber Security אין מטלות בכלל.`,
    source:`שיעור NoSQL — חלק ה', משימה 4` },

  { id:'mles5', set:'lesson', topic:'lookup', dataset:'college2',
    prompt:`חלק ה', משימה 5 — הציגו את הסטודנטים הרשומים ליותר מקורס אחד (כל ההרשמות). הפעם התחילו מ-students.
התוצאה: firstName, lastName, coursesCount (בלי _id).`,
    check:'result',
    solution:`db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $addFields: { coursesCount: { $size: "$enrollments" } } },
  { $match: { coursesCount: { $gt: 1 } } },
  { $project: { _id: 0, firstName: 1, lastName: 1, coursesCount: 1 } }
])`,
    alt:[`db.enrollments.aggregate([
  { $group: { _id: "$studentId", coursesCount: { $sum: 1 } } },
  { $match: { coursesCount: { $gt: 1 } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "s" } },
  { $unwind: "$s" },
  { $project: { _id: 0, firstName: "$s.firstName", lastName: "$s.lastName", coursesCount: 1 } }
])`],
    hint:`$lookup מביא לכל סטודנט מערך הרשמות. ‏$size סופר אותו, ואז מסננים עם $match.`,
    explain:`Collection: students · aggregate. כמו שכתוב בשיעור, זה דורש Aggregation.
1. $lookup: לכל סטודנט נוצר מערך עם כל ההרשמות שלו.
2. $addFields: מוסיף שדה מחושב coursesCount, שהוא גודל המערך ($size). שאר השדות נשארים.
3. $match: משאיר רק סטודנטים עם coursesCount גדול מ-1.
4. $project: שם ומספר קורסים בלבד.
התוצאה: David Levi 3, Noa Cohen 2, Maya Peretz 2, Itai Friedman 3.
דרך אחרת (ב-alt): מתחילים מ-enrollments עם $group ו-$match, ורק בסוף מביאים את השם עם $lookup.`,
    source:`שיעור NoSQL — חלק ה', משימה 5` },

  { id:'mles6', set:'lesson', topic:'lookup', dataset:'college2',
    prompt:`חלק ה', משימה 6 — מצאו את הסטודנטים שלא רשומים לאף קורס.
התוצאה: firstName, lastName בלבד (בלי _id).`,
    check:'result',
    solution:`db.students.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "studentId", as: "enrollments" } },
  { $match: { enrollments: { $size: 0 } } },
  { $project: { _id: 0, firstName: 1, lastName: 1 } }
])`,
    alt:[`db.students.find({ _id: { $nin: db.enrollments.distinct("studentId") } }, { _id: 0, firstName: 1, lastName: 1 })`],
    hint:`Anti-Join: ‏$lookup, ואחריו $match על מערך ריק, ואחריו $project.`,
    explain:`Collection: students · aggregate.
1. $lookup: מצרף לכל סטודנט את ההרשמות שלו (LEFT JOIN).
2. $match: { enrollments: { $size: 0 } } משאיר רק סטודנטים בלי הרשמות.
3. $project: מציג רק שם פרטי ושם משפחה.
התוצאה: Lior Shalom.
אפשר גם בלי Aggregation: ‏distinct מחזיר את רשימת ה-studentId שיש להם הרשמה, ו-$nin מוצא את מי שלא נמצא ברשימה. זה כמו NOT IN ב-SQL.`,
    source:`שיעור NoSQL — חלק ה', משימה 6` },

  { id:'mles7', set:'lesson', topic:'find', dataset:'college2',
    prompt:`חלק ה', משימה 7 — הציגו את כל ההגשות שעדיין לא קיבלו ציון (grade הוא null).`,
    check:'result', compare:'ids',
    solution:`db.submissions.find({ grade: null })`,
    alt:[`db.submissions.find({ grade: { $eq: null } })`, `db.submissions.find({ grade: { $type: "null" } })`],
    hint:`פשוט { grade: null }.`,
    explain:`Collection: submissions · find.
‏{ grade: null } מחזיר מסמכים שבהם grade שווה null, וגם מסמכים שאין בהם שדה grade בכלל.
אם רוצים רק את מי שבאמת שמור בו null (ולא שדה חסר), כותבים { grade: { $type: "null" } }.
התוצאה: הגשות 8 (Maya) ו-12 (Shira).
ב-SQL: SELECT * FROM submissions WHERE grade IS NULL; (ב-SQL התנאי ‏grade = NULL לא מחזיר אף שורה, וחייבים IS NULL. במונגו { grade: null } עובד).`,
    source:`שיעור NoSQL — חלק ה', משימה 7` },

  { id:'mles8', set:'lesson', topic:'aggregate', dataset:'college2',
    prompt:`חלק ה', משימה 8 — מצאו את הממוצע של כל סטודנט (רק הגשות עם ציון. סטודנט שאין לו אף ציון לא יופיע).
התוצאה: studentId, averageGrade (בלי עיגול, בלי _id).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$studentId", averageGrade: { $avg: "$grade" } } },
  { $project: { _id: 0, studentId: "$_id", averageGrade: 1 } }
])`,
    alt:[`db.submissions.aggregate([
  { $match: { grade: { $type: "number" } } },
  { $group: { _id: "$studentId", averageGrade: { $avg: "$grade" } } }
])`],
    hint:`$match ← $group עם $avg ← $project.`,
    explain:`Collection: submissions · aggregate.
1. $match: מוציא הגשות עם grade: null.
2. $group: ממוצע לכל studentId.
3. $project: מעביר את _id לשדה studentId, כמו בדוגמה בשיעור.
למה צריך את $match אם $avg ממילא מתעלם מ-null? בגלל Shira (סטודנטית 6). כל ההגשות שלה עם null, ובלי הסינון היא הייתה מופיעה עם averageGrade: null. (בסימולטור היא מופיעה עם 0. זו מגבלה של הסימולטור; במונגו אמיתי $avg על קבוצה שכל הערכים בה null מחזיר null.)
התוצאה: 1→88.75, 2→74, 3→65, 4→87.5, 5→90, 7→84.33…, 8→60.`,
    source:`שיעור NoSQL — חלק ה', משימה 8` },

  { id:'mles9', set:'lesson', topic:'aggregate', dataset:'college2',
    prompt:`חלק ה', משימה 9 — מצאו את הסטודנט בעל ממוצע הציונים הגבוה ביותר (רק הגשות עם ציון).
התוצאה: מסמך אחד עם studentId, averageGrade (בלי _id).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$studentId", averageGrade: { $avg: "$grade" } } },
  { $sort: { averageGrade: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, studentId: "$_id", averageGrade: 1 } }
])`,
    alt:[`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$studentId", averageGrade: { $avg: "$grade" } } },
  { $sort: { averageGrade: -1 } },
  { $limit: 1 }
])`],
    hint:`כמו משימה 8, ובנוסף $sort יורד ו-$limit: 1.`,
    explain:`Collection: submissions · aggregate.
1. $match: רק ציונים קיימים.
2. $group: ממוצע לכל סטודנט.
3. $sort: { averageGrade: -1 } מהגבוה לנמוך.
4. $limit: 1 משאיר רק את הראשון.
5. $project: מעצב את הפלט.
התוצאה: סטודנט 5 (Omer Biton) עם 90.
ב-SQL: SELECT TOP 1 studentId, AVG(grade) FROM submissions WHERE grade IS NOT NULL GROUP BY studentId ORDER BY AVG(grade) DESC;
אם יש תיקו במקום הראשון, $limit: 1 יחזיר רק אחד מהם (כמו TOP 1 בלי WITH TIES).`,
    source:`שיעור NoSQL — חלק ה', משימה 9` },

  { id:'mles10', set:'lesson', topic:'lookup', dataset:'college2',
    prompt:`חלק ה', משימה 10 — לכל קורס (כולל קורסים שאין בהם הרשמות) מצאו: מספר הסטודנטים הרשומים (כל ההרשמות), מספר העבודות ומספר ההגשות.
התוצאה: courseName, studentsCount, assignmentsCount, submissionsCount (בלי _id).`,
    check:'result',
    solution:`db.courses.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enrollments" } },
  { $lookup: { from: "assignments", localField: "_id", foreignField: "courseId", as: "assignments" } },
  { $lookup: { from: "submissions", localField: "_id", foreignField: "courseId", as: "submissions" } },
  { $project: {
      _id: 0,
      courseName: 1,
      studentsCount: { $size: "$enrollments" },
      assignmentsCount: { $size: "$assignments" },
      submissionsCount: { $size: "$submissions" }
  } }
])`,
    alt:[`db.courses.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "e" } },
  { $lookup: { from: "assignments", localField: "_id", foreignField: "courseId", as: "a" } },
  { $lookup: { from: "submissions", localField: "_id", foreignField: "courseId", as: "s" } },
  { $addFields: { studentsCount: { $size: "$e" }, assignmentsCount: { $size: "$a" }, submissionsCount: { $size: "$s" } } },
  { $project: { _id: 0, courseName: 1, studentsCount: 1, assignmentsCount: 1, submissionsCount: 1 } }
])`],
    hint:`מתחילים מ-courses ועושים שלושה $lookup, ואחריהם $project עם $size על כל מערך.`,
    explain:`Collection: courses, כי רוצים שורה לכל קורס, גם לקורס ריק · aggregate.
1. שלושה $lookup: כל אחד מצרף לקורס מערך. ההרשמות, המטלות וההגשות מקושרות כולן דרך courseId.
2. $project: ‏$size סופר כמה איברים יש בכל מערך.
‏$lookup הוא LEFT JOIN, ולכן Cyber Security מופיע עם 0 / 0 / 0. אם היינו מתחילים מ-enrollments עם $group, הוא לא היה מופיע.
התוצאה (studentsCount / assignmentsCount / submissionsCount): MongoDB 5/2/7, SQL Server 3/2/3, Python 2/1/2, Marketing 2/1/2, Statistics 3/1/2, Cyber Security 0/0/0.
ב-SQL צריך COUNT(DISTINCT …) על שלושה LEFT JOIN, או שלוש תת-שאילתות, כדי שהספירות לא יוכפלו זו בזו.`,
    source:`שיעור NoSQL — חלק ה', משימה 10` },

  { id:'mles-q7', set:'lesson', topic:'lookup', dataset:'college2',
    prompt:`שאלה 7 — כתבו Aggregation Pipeline שמחזיר את 3 הקורסים עם ממוצע הציונים הגבוה ביותר (רק הגשות עם ציון).
התוצאה: courseName, averageGrade, ממוינים מהגבוה לנמוך (בלי _id, בלי עיגול).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, courseName: "$course.courseName", averageGrade: 1 } },
  { $sort: { averageGrade: -1 } },
  { $limit: 3 }
])`,
    alt:[`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $sort: { averageGrade: -1 } },
  { $limit: 3 },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: { _id: 0, courseName: "$course.courseName", averageGrade: 1 } }
])`],
    hint:`לפי הרמז של המרצה: ‏$match ← $group ← ‏$lookup ← ‏$project ← ‏$sort ← ‏$limit (עם $unwind אחרי ה-$lookup).`,
    explain:`Collection: submissions · aggregate.
1. $match: רק הגשות עם ציון.
2. $group: ממוצע לכל courseId.
3. $lookup + $unwind: מביא את מסמך הקורס בשביל השם.
4. $project: courseName ו-averageGrade.
5. $sort: { averageGrade: -1 } מהגבוה לנמוך.
6. $limit: 3.
התוצאה: Python 91, Statistics 85.5, MongoDB 83.
שיפור ביצועים (ב-alt): אם שמים $sort ו-$limit לפני ה-$lookup, החיבור רץ רק על 3 מסמכים.`,
    source:`שיעור NoSQL — שאלה 7` },

  { id:'mles-q8', set:'lesson', topic:'lookup', dataset:'college2',
    prompt:`שאלה 8 — לכל סטודנט הציגו את הקורס שבו קיבל את ממוצע הציונים הגבוה ביותר (רק הגשות עם ציון).
התוצאה: studentName (למשל "David Levi"), bestCourse (שם הקורס), averageGrade (בלי _id).`,
    check:'result', ordered:false,
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: { studentId: "$studentId", courseId: "$courseId" }, averageGrade: { $avg: "$grade" } } },
  { $lookup: { from: "courses", localField: "_id.courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $sort: { averageGrade: -1 } },
  { $group: {
      _id: "$_id.studentId",
      bestCourse: { $first: "$course.courseName" },
      averageGrade: { $first: "$averageGrade" }
  } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: {
      _id: 0,
      studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      bestCourse: 1,
      averageGrade: 1
  } }
])`,
    alt:[`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "s" } },
  { $unwind: "$s" },
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "c" } },
  { $unwind: "$c" },
  { $group: { _id: { name: { $concat: ["$s.firstName", " ", "$s.lastName"] }, course: "$c.courseName" }, avg: { $avg: "$grade" } } },
  { $sort: { avg: -1 } },
  { $group: { _id: "$_id.name", bestCourse: { $first: "$_id.course" }, averageGrade: { $first: "$avg" } } }
])`],
    hint:`שני $group: הראשון לפי (סטודנט, קורס), אחריו $sort יורד, והשני לפי סטודנט עם $first. צריך $lookup גם לקורסים וגם לסטודנטים.`,
    explain:`Collection: submissions · aggregate. משתמשים בכל השלבים שהמרצה דרש: ‏$match, ‏$group, ‏$lookup, ‏$unwind, ‏$sort, ‏$group, ‏$project.
1. $match: רק ציונים קיימים.
2. $group (1): ממוצע לכל זוג { studentId, courseId }.
3. $lookup + $unwind: מביא את שם הקורס. ‏localField יכול להיות שדה פנימי כמו "_id.courseId".
4. $sort: { averageGrade: -1 } ממיין את כל הזוגות מהגבוה לנמוך.
5. $group (2): לפי studentId. ‏$first לוקח את הזוג הראשון בכל קבוצה, כלומר את הקורס הטוב ביותר ואת הממוצע שלו.
6. $lookup + $unwind ל-students, ואחריהם $project עם $concat ל-studentName.
התוצאה: David Levi → Python 92, Noa Cohen → MongoDB 78, Yossi Mizrahi → SQL Server 65, Maya Peretz → Python 90, Omer Biton → Statistics 90, Itai Friedman → MongoDB 100, Tamar Golan → MongoDB 60.`,
    source:`שיעור NoSQL — שאלה 8` },

  { id:'mles-q1', set:'lesson', topic:'design', dataset:'college2',
    prompt:`שאלה 1 (תכנון: Embedding מול Reference) — הוסיפו קורס חדש לפי עקרונות התכנון מהשיעור:
_id: 7, courseName: "Vector DB", credits: 3, department: "Data Science",
lecturerId: 4 (Reference למרצה Dana Klein. לא להטמיע את פרטי המרצה),
lessons: מערך מוטמע עם שני שיעורים, { title: "Embeddings", duration: 90 } ו-{ title: "Similarity Search", duration: 120 }.`,
    check:'state', collection:'courses',
    solution:`db.courses.insertOne({
  _id: 7,
  courseName: "Vector DB",
  credits: 3,
  department: "Data Science",
  lecturerId: 4,
  lessons: [
    { title: "Embeddings", duration: 90 },
    { title: "Similarity Search", duration: 120 }
  ]
})`,
    alt:[`db.courses.insertMany([ { _id: 7, courseName: "Vector DB", credits: 3, department: "Data Science", lecturerId: 4,
  lessons: [ { title: "Embeddings", duration: 90 }, { title: "Similarity Search", duration: 120 } ] } ])`],
    hint:`insertOne עם lecturerId כמספר (Reference) ו-lessons כמערך של מסמכים (Embedded).`,
    explain:`Collection: courses · insertOne.
למה המרצה הוא Reference (lecturerId) ולא מסמך מוטמע?
• מרצה הוא ישות עצמאית שמלמדת כמה קורסים. אם נטמיע אותו, הפרטים שלו ישוכפלו בכל קורס.
• כשהמייל או המחלקה של המרצה משתנים, מעדכנים מסמך אחד ב-lecturers ולא כל קורס.
למה השיעורים מוטמעים (Embedded)?
• שיעור שייך לקורס אחד בלבד ולא קיים בלעדיו.
• כמעט תמיד קוראים אותו יחד עם הקורס, ולכן שליפה אחת מביאה הכל, בלי $lookup.
• מספר השיעורים קטן וחסום, ולכן המסמך לא יגדל בלי סוף.
כלל אצבע: מטמיעים נתונים קטנים שתמיד נקראים יחד (קשר 1:מעט). מפנים (Reference) לישויות משותפות, לקשרים של רבים-לרבים ולמערכים שגדלים בלי גבול.`,
    source:`שיעור NoSQL — שאלה 1 (תכנון) ושאלה 2 (מבנה הקורס)` },

  { id:'mles-q6a', set:'lesson', topic:'design', dataset:'college2',
    prompt:`שאלה 6 (מדרגיות) — בעתיד ייתכן קורס עם 5,000 סטודנטים ועשרות אלפי הגשות, ולכן לא שומרים מערך students בתוך מסמך הקורס.
רשמו את Lior Shalom (studentId: 10) לקורס Cyber Security (courseId: 6) כמסמך חדש ב-enrollments:
_id: 16, studentId: 10, courseId: 6, enrollmentDate: 2026-02-01 (ISODate), status: "Active".`,
    check:'state', collection:'enrollments',
    solution:`db.enrollments.insertOne({
  _id: 16,
  studentId: 10,
  courseId: 6,
  enrollmentDate: ISODate("2026-02-01"),
  status: "Active"
})`,
    alt:[`db.enrollments.insertOne({ _id: 16, studentId: 10, courseId: 6, enrollmentDate: new Date("2026-02-01"), status: "Active" })`],
    hint:`insertOne ל-enrollments, לא $push למערך בתוך courses.`,
    explain:`Collection: enrollments · insertOne. הרשמה היא מסמך קטן ונפרד שמחזיק שני References.
למה לא להטמיע 5,000 סטודנטים או עשרות אלפי הגשות בתוך מסמך הקורס?
• גודל: למסמך במונגו יש מגבלה של 16MB, ומערך שגדל בלי גבול (Unbounded Array) יגיע אליה בסוף.
• ביצועים: כל קריאה של הקורס תמשוך את כל המערך הענק, גם כשצריך רק את שם הקורס.
• עדכון: כל הוספת הגשה משנה את אותו מסמך ענק, וכמה משתמשים שמגישים באותו זמן מתנגשים על אותו מסמך.
• שליפה מהירה: לשאלה "כל ההגשות של סטודנט X" היינו צריכים לסרוק מערכים בתוך כל הקורסים.
המבנה המומלץ: students ו-lecturers כ-Collections נפרדים. ‏courses עם Reference למרצה (lecturerId), ועם lessons ו-assignments מוטמעים, כי גם 100 שיעורים ו-20 עבודות הם כמות קטנה וחסומה (בנתוני האתר assignments הוא Collection נפרד, כמו בעבודת ההגשה, וגם זה לגיטימי). ‏enrollments ו-submissions כ-Collections נפרדים עם References (studentId, courseId, assignmentId), ואינדקסים על שדות ה-Reference.`,
    source:`שיעור NoSQL — שאלה 6 (סעיפים 1-3)` },

  { id:'mles-q6b', set:'lesson', topic:'design', dataset:'college2',
    prompt:`שאלה 6 (שליפה מהירה) — כדי שהשליפה של כל ההגשות של קורס תהיה מהירה גם עם עשרות אלפי הגשות, צרו אינדקס עולה על השדה courseId ב-Collection submissions.`,
    check:'result',
    solution:`db.submissions.createIndex({ courseId: 1 })`,
    hint:`createIndex({ שדה: 1 }): ‏1 לאינדקס עולה, ‎-1 לאינדקס יורד.`,
    explain:`Collection: submissions · createIndex.
בלי אינדקס, find({ courseId: 1 }) סורק את כל ה-Collection (COLLSCAN). עם אינדקס על courseId מונגו קופץ ישר למסמכים המתאימים (IXSCAN).
את ההבדל רואים עם .explain() בסוף השאילתה (בדף הפקודות: "בדיקת ביצועים ואינדקסים"). בסימולטור אין אינדקסים אמיתיים, ולכן explain תמיד מראה COLLSCAN.
הפקודה מחזירה את שם האינדקס, "courseId_1".
זה המשלים של Referencing: כשמפרידים לכמה Collections, שמים אינדקס על שדות ה-Reference שלפיהם מסננים ומחברים ($lookup).
מחיר: כל אינדקס מאט קצת את הכתיבה (insert/update) ותופס מקום. לכן יוצרים אינדקס רק על שדות שמחפשים לפיהם הרבה.
ב-SQL: CREATE INDEX ix_sub_course ON submissions(courseId);`,
    source:`שיעור NoSQL — שאלה 6 (ביצועים ושליפה מהירה)` },

  /* ======================================================================
     חלק ג' — CRUD: תרגול לכל שורה בדף "פקודות חשובות ב-NoSQL"
     ====================================================================== */
  /* ---- תנאים ואופרטורים ---- */
  { id:'mc-eq', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$eq — הציגו את הסטודנטים שגילם בדיוק 23. השתמשו באופרטור $eq.`,
    check:'result', compare:'ids',
    solution:`db.students.find({ age: { $eq: 23 } })`,
    alt:[`db.students.find({ age: 23 })`],
    hint:`{ age: { $eq: 23 } } שקול ל-{ age: 23 }.`,
    explain:`Collection: students · find.
‏$eq הוא "שווה ל-". הכתיבה המקוצרת { age: 23 } עושה בדיוק אותו דבר, ולכן ב-$eq משתמשים בעיקר בתוך $expr או בביטויים מורכבים.
התוצאה: David (23), Tamar (23).`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($eq)` },

  { id:'mc-ne', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$ne — הציגו את כל הסטודנטים שלא גרים ב-"Tel Aviv".`,
    check:'result', compare:'ids',
    solution:`db.students.find({ city: { $ne: "Tel Aviv" } })`,
    alt:[`db.students.find({ city: { $nin: ["Tel Aviv"] } })`, `db.students.find({ city: { $not: { $eq: "Tel Aviv" } } })`],
    hint:`$ne = לא שווה ל-.`,
    explain:`Collection: students · find.
‏$ne פירושו "לא שווה". הוא מחזיר גם מסמכים שאין בהם את השדה בכלל, כי שדה חסר הוא "לא Tel Aviv". ב-SQL זה שונה: ‏WHERE city != 'Tel Aviv' לא מחזיר שורות שבהן city הוא NULL.
התוצאה: 7 סטודנטים (כולם חוץ מ-David, Maya, Itai).`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($ne)` },

  { id:'mc-gt', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$gt — הציגו את כל ההגשות שהציון שלהן גבוה מ-85 (לא כולל 85).`,
    check:'result', compare:'ids',
    solution:`db.submissions.find({ grade: { $gt: 85 } })`,
    alt:[`db.submissions.find({ grade: { $gte: 86 } })`],
    hint:`{ grade: { $gt: 85 } }.`,
    explain:`Collection: submissions · find.
‏$gt הוא "גדול מ-" (Greater Than), ולכן הגשה 9 עם ציון 85 בדיוק לא נכנסת. עם $gte היא כן הייתה נכנסת.
התוצאה: הגשות 1 (95), 3 (88), 4 (92), 10 (90), 11 (90), 13 (100).`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($gt)` },

  { id:'mc-range', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$gte / $lte — הציגו את הסטודנטים שגילם בין 22 ל-24 (כולל שני הקצוות).`,
    check:'result', compare:'ids',
    solution:`db.students.find({ age: { $gte: 22, $lte: 24 } })`,
    alt:[`db.students.find({ $and: [ { age: { $gte: 22 } }, { age: { $lte: 24 } } ] })`],
    hint:`אפשר לשים שני אופרטורים על אותו שדה באותו אובייקט: { age: { $gte: 22, $lte: 24 } }.`,
    explain:`Collection: students · find.
שני אופרטורים בתוך אותו אובייקט של שדה מחוברים ב"וגם", וזה טווח. זה כמו BETWEEN 22 AND 24 ב-SQL, שכולל את הקצוות.
אסור לכתוב { age: { $gte: 22 }, age: { $lte: 24 } }, כי מפתח שמופיע פעמיים באובייקט JavaScript דורס את הקודם, ונשאר רק התנאי האחרון.
התוצאה: David 23, Maya 22, Omer 24, Tamar 23, Lior 22.`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($gte, $lte)` },

  { id:'mc-lt', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$lt — הציגו את ההגשות שהציון שלהן נמוך מ-70.`,
    check:'result', compare:'ids',
    solution:`db.submissions.find({ grade: { $lt: 70 } })`,
    alt:[`db.submissions.find({ grade: { $lte: 69 } })`],
    hint:`{ grade: { $lt: 70 } }. שימו לב מה קורה להגשות עם grade: null.`,
    explain:`Collection: submissions · find.
‏$lt הוא "קטן מ-". חשוב לדעת: הוא לא מחזיר מסמכים שבהם grade הוא null. מונגו משווה רק ערכים מאותו סוג, ולכן null הוא לא "קטן מ-70".
כך גם ב-SQL: השוואה של NULL למספר נותנת UNKNOWN, והשורה לא נכנסת.
התוצאה: הגשות 7 (65) ו-16 (60).`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($lt)` },

  { id:'mc-in', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$in — הציגו את הסטודנטים שגרים ב-"Haifa" או ב-"Jerusalem".`,
    check:'result', compare:'ids',
    solution:`db.students.find({ city: { $in: ["Haifa", "Jerusalem"] } })`,
    alt:[`db.students.find({ $or: [ { city: "Haifa" }, { city: "Jerusalem" } ] })`],
    hint:`$in מקבל מערך של ערכים אפשריים.`,
    explain:`Collection: students · find.
‏{ city: { $in: [...] } } פירושו שהערך נמצא ברשימה, כמו IN ('Haifa','Jerusalem') ב-SQL.
זה שקול ל-$or על אותו שדה, אבל קצר יותר.
התוצאה: Noa, Yossi, Shira, Eyal.`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($in)` },

  { id:'mc-nin', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$nin — הציגו את הקורסים שהמחלקה (department) שלהם היא לא "Business" וגם לא "Data Science".`,
    check:'result', compare:'ids',
    solution:`db.courses.find({ department: { $nin: ["Business", "Data Science"] } })`,
    alt:[`db.courses.find({ department: "Information Systems" })`,
         `db.courses.find({ $nor: [ { department: "Business" }, { department: "Data Science" } ] })`],
    hint:`$nin = לא נמצא ברשימה.`,
    explain:`Collection: courses · find.
‏$nin הוא NOT IN. כמו $ne, הוא מחזיר גם מסמכים שאין בהם את השדה בכלל.
התוצאה: MongoDB, SQL Server, Cyber Security (כולם Information Systems).`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($nin)` },

  { id:'mc-exists', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$exists — קודם הוסיפו region: "Center" לכל הסטודנטים מ-"Tel Aviv" (כמו בתרגיל 4 בעבודה). אחר כך, באותה הרצה, הציגו את כל הסטודנטים שאין להם שדה region.`,
    check:'result', compare:'ids',
    solution:`db.students.updateMany({ city: "Tel Aviv" }, { $set: { region: "Center" } })
db.students.find({ region: { $exists: false } })`,
    alt:[`db.students.updateMany({ city: "Tel Aviv" }, { $set: { region: "Center" } })
db.students.find({ region: null })`],
    hint:`שתי פקודות ברצף. התוצאה שנבדקת היא של הפקודה האחרונה: find({ region: { $exists: false } }).`,
    explain:`Collection: students · updateMany ואחריו find.
‏{ $exists: true } מחזיר מסמכים שבהם השדה קיים, ו-{ $exists: false } מחזיר מסמכים שאין בהם את השדה.
זה שימושי במיוחד במונגו, כי למסמכים באותו Collection יכולים להיות שדות שונים (Flexible Schema).
‏{ region: null } מחזיר כאן את אותה תוצאה, כי הוא תופס גם שדה חסר. ההבדל: הוא גם תופס מסמך שבו region שמור עם הערך null.
התוצאה: 7 הסטודנטים שלא גרים בתל אביב.`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($exists)` },

  { id:'mc-type', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$type — הציגו את ההגשות שבהן grade הוא מספר (כלומר הגשות שכבר נבדקו).`,
    check:'result', compare:'ids',
    solution:`db.submissions.find({ grade: { $type: "number" } })`,
    alt:[`db.submissions.find({ grade: { $ne: null } })`, `db.submissions.find({ grade: { $type: "int" } })`],
    hint:`{ grade: { $type: "number" } }. ‏"number" תופס את כל סוגי המספרים.`,
    explain:`Collection: submissions · find.
‏$type בודק את סוג הערך ששמור בשדה. ‏"number" הוא כינוי לכל סוגי המספרים (int, long, double, decimal). בדף של המרצה מופיעה הדוגמה { age: { $type: "int" } }.
‏{ $type: "null" } מחזיר את ההגשות שעוד לא נבדקו.
התוצאה: 14 הגשות (כולן חוץ מ-8 ו-12).`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($type)` },

  { id:'mc-regex', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$regex — הציגו את הסטודנטים ששם המשפחה שלהם מסתיים באות "n".`,
    check:'result', compare:'ids',
    solution:`db.students.find({ lastName: { $regex: "n$" } })`,
    alt:[`db.students.find({ lastName: { $regex: ".*n$" } })`],
    hint:`בביטוי רגולרי, ^ מסמן התחלה ו-$ מסמן סוף: "n$".`,
    explain:`Collection: students · find.
‏$regex מחפש לפי תבנית טקסט, כמו LIKE ב-SQL.
• "^A" מתחיל ב-A (כמו LIKE 'A%').
• "n$" מסתיים ב-n (כמו LIKE '%n').
• "ab" מכיל ab (כמו LIKE '%ab%').
ב-Shell אפשר לכתוב גם /n$/ במקום { $regex: "n$" }.
התוצאה: Cohen, Biton, Friedman, Golan.`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($regex)` },

  { id:'mc-regex-i', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$regex + $options — הציגו את הקורסים שבשם שלהם (courseName) מופיעה האות s, בלי הבדל בין אות גדולה לקטנה.`,
    check:'result', compare:'ids',
    solution:`db.courses.find({ courseName: { $regex: "s", $options: "i" } })`,
    alt:[`db.courses.find({ courseName: { $regex: "[sS]" } })`],
    hint:`$options: "i" = Case-Insensitive.`,
    explain:`Collection: courses · find.
בלי האפשרות "i", ‏$regex מבחין בין אותיות גדולות לקטנות. "s" לבד היה מחזיר רק Statistics, כי ב-SQL Server וב-Cyber Security יש רק S גדולה.
עם $options: "i" ‏(או /s/i ב-Shell) מתקבלים SQL Server, Statistics, Cyber Security.`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($regex)` },

  { id:'mc-and', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$and — הציגו את הסטודנטים שגרים ב-"Tel Aviv" וגם גילם גבוה מ-22. כתבו את התנאי עם $and מפורש.`,
    check:'result', compare:'ids',
    solution:`db.students.find({ $and: [ { city: "Tel Aviv" }, { age: { $gt: 22 } } ] })`,
    alt:[`db.students.find({ city: "Tel Aviv", age: { $gt: 22 } })`],
    hint:`$and מקבל מערך של תנאים. אפשר גם פשוט לשים כמה שדות באותו מסנן.`,
    explain:`Collection: students · find.
‏{ $and: [ תנאי1, תנאי2 ] } מחזיר מסמכים שעומדים בכל התנאים.
כשהתנאים על שדות שונים, אפשר לכתוב בקיצור { city: "Tel Aviv", age: { $gt: 22 } }, כי פסיק במסנן פירושו AND.
‏$and מפורש נחוץ כשאותו מפתח היה מופיע פעמיים באותו אובייקט, למשל שני $or (מפתח כפול דורס את הקודם).
התוצאה: David (23), Itai (27). ‏Maya בת 22 בדיוק, ולכן לא נכנסת.`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($and)` },

  { id:'mc-or', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$or — הציגו את הסטודנטים שגרים ב-"Haifa" או שגילם 26 ומעלה.`,
    check:'result', compare:'ids',
    solution:`db.students.find({ $or: [ { city: "Haifa" }, { age: { $gte: 26 } } ] })`,
    alt:[`db.students.aggregate([ { $match: { $or: [ { city: "Haifa" }, { age: { $gte: 26 } } ] } } ])`],
    hint:`{ $or: [ {תנאי1}, {תנאי2} ] }. מסמך עובר אם לפחות תנאי אחד מתקיים.`,
    explain:`Collection: students · find.
‏$or מקבל מערך של תנאים, ומסמך נכנס לתוצאה אם לפחות אחד מהם מתקיים.
התוצאה: Noa, Shira (Haifa), Itai 27, Eyal 26.
ב-SQL: WHERE city = 'Haifa' OR age >= 26`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($or)` },

  { id:'mc-not', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$not — הציגו את הסטודנטים שגילם לא גבוה מ-23. השתמשו ב-$not על התנאי $gt.`,
    check:'result', compare:'ids',
    solution:`db.students.find({ age: { $not: { $gt: 23 } } })`,
    alt:[`db.students.find({ age: { $lte: 23 } })`],
    hint:`$not נכתב בתוך השדה ועוטף אופרטור: { age: { $not: { $gt: 23 } } }.`,
    explain:`Collection: students · find.
‏$not הופך את התנאי שבתוכו. הוא נכתב ברמת השדה ולא ברמה העליונה של המסנן.
ההבדל מ-$lte: ‏$not מחזיר גם מסמכים שאין בהם שדה age בכלל. כאן לכל הסטודנטים יש גיל, ולכן התוצאה זהה.
התוצאה: David, Noa, Maya, Shira, Tamar, Lior.`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($not)` },

  { id:'mc-nor', set:'crud', topic:'operators', dataset:'college2',
    prompt:`$nor — הציגו את הסטודנטים שלא גרים ב-"Tel Aviv" וגם לא נרשמו ב-2025 (registrationYear).`,
    check:'result', compare:'ids',
    solution:`db.students.find({ $nor: [ { city: "Tel Aviv" }, { registrationYear: 2025 } ] })`,
    alt:[`db.students.find({ city: { $ne: "Tel Aviv" }, registrationYear: { $ne: 2025 } })`],
    hint:`$nor = אף אחד מהתנאים לא מתקיים.`,
    explain:`Collection: students · find.
‏{ $nor: [A, B] } שקול ל-NOT (A OR B), שהוא (NOT A) AND (NOT B).
התוצאה: Yossi, Omer, Tamar, Eyal.`,
    source:`דף פקודות MongoDB — תנאים ואופרטורים ($nor)` },

  /* ---- מערכים ו-Dot Notation ---- */
  { id:'mc-dot', set:'crud', topic:'array', dataset:'college2',
    prompt:`Dot Notation — הציגו את הקורסים שיש בהם שיעור שהכותרת (title) שלו היא "JOINs".`,
    check:'result', compare:'ids',
    solution:`db.courses.find({ "lessons.title": "JOINs" })`,
    alt:[`db.courses.find({ lessons: { $elemMatch: { title: "JOINs" } } })`],
    hint:`"lessons.title" (חובה במרכאות) מחפש בתוך כל איבר במערך.`,
    explain:`Collection: courses · find.
‏"lessons.title" ניגש לשדה title שבתוך המסמכים שבמערך lessons. מספיק שאיבר אחד מתאים כדי שהקורס ייכנס לתוצאה.
שם שדה שיש בו נקודה חייב להיות במרכאות.
התוצאה: SQL Server.`,
    source:`דף פקודות MongoDB — find + שיעור NoSQL (שיעורים מוטמעים)` },

  { id:'mc-elemmatch', set:'crud', topic:'array', dataset:'college2',
    prompt:`$elemMatch — הציגו את הקורסים שיש בהם שיעור אחד שגם הכותרת שלו מתחילה ב-"P" וגם משכו 120 דקות או יותר (שני התנאים על אותו שיעור).`,
    check:'result', compare:'ids',
    solution:`db.courses.find({ lessons: { $elemMatch: { title: { $regex: "^P" }, duration: { $gte: 120 } } } })`,
    hint:`בלי $elemMatch כל תנאי יכול להתקיים על שיעור אחר. ‏$elemMatch מחייב שאותו איבר יעמוד בכל התנאים.`,
    explain:`Collection: courses · find.
‏$elemMatch בודק שאיבר אחד במערך עומד בכל התנאים יחד.
המלכודת: עם { "lessons.title": { $regex: "^P" }, "lessons.duration": { $gte: 120 } } גם Statistics נכנס. יש בו Probability (מתחיל ב-P, ‏90 דקות) ו-Regression (‏120 דקות), כלומר כל תנאי מתקיים על שיעור אחר.
התוצאה הנכונה: רק Python (בגלל Pandas, ‏120 דקות).`,
    source:`עבודה עם מערכים (שיעור NoSQL — lessons מוטמעים)` },

  { id:'mc-size', set:'crud', topic:'array', dataset:'college2',
    prompt:`$size — הציגו את הקורסים שיש בהם בדיוק 2 שיעורים.`,
    check:'result', compare:'ids',
    solution:`db.courses.find({ lessons: { $size: 2 } })`,
    alt:[`db.courses.find({ $expr: { $eq: [ { $size: "$lessons" }, 2 ] } })`],
    hint:`{ lessons: { $size: 2 } }.`,
    explain:`Collection: courses · find.
‏$size בתוך find בודק אורך מדויק בלבד. אי אפשר לכתוב בו $gt, ולכן "לפחות 3 שיעורים" נפתר עם $expr או עם "lessons.2" (ראו משימה 3 בשיעור).
‏{ lessons: { $size: 0 } } מוצא קורס בלי שיעורים (Cyber Security).
התוצאה: Python.`,
    source:`עבודה עם מערכים (שיעור NoSQL)` },

  /* ---- Projection / sort / limit / skip ---- */
  { id:'mc-proj-in', set:'crud', topic:'projection', dataset:'college2',
    prompt:`Projection (הכללה) — הציגו את הסטודנטים מ-"Tel Aviv" עם השדות firstName ו-phone בלבד (בלי _id).`,
    check:'result',
    solution:`db.students.find({ city: "Tel Aviv" }, { _id: 0, firstName: 1, phone: 1 })`,
    alt:[`db.students.find({ city: "Tel Aviv" }).project({ _id: 0, firstName: 1, phone: 1 })`],
    hint:`find(מסנן, { _id: 0, firstName: 1, phone: 1 }).`,
    explain:`Collection: students · find.
הארגומנט השני הוא ה-Projection. ‏1 פירושו להציג את השדה. ‏_id מוצג תמיד אלא אם כותבים _id: 0.
‏.project({...}) אחרי find עושה אותו דבר (מופיע בדף הפקודות).
ב-SQL: SELECT firstName, phone FROM students WHERE city = 'Tel Aviv';`,
    source:`דף פקודות MongoDB — פקודות על find (project)` },

  { id:'mc-proj-ex', set:'crud', topic:'projection', dataset:'college2',
    prompt:`Projection (החרגה) — הציגו את כל הקורסים עם כל השדות חוץ מהמערך lessons (כולל _id).`,
    check:'result',
    solution:`db.courses.find({}, { lessons: 0 })`,
    alt:[`db.courses.aggregate([ { $unset: "lessons" } ])`, `db.courses.aggregate([ { $project: { lessons: 0 } } ])`],
    hint:`{ lessons: 0 } מסתיר רק את השדה הזה ומציג את כל השאר.`,
    explain:`Collection: courses · find.
‏Projection עם 0 מחריגה שדה, וכל שאר השדות מוצגים.
אסור לשלב 0 ו-1 באותה Projection, חוץ מ-_id. למשל { courseName: 1, lessons: 0 } מחזיר שגיאה.
ב-Aggregation עושים את אותו דבר עם { $unset: "lessons" } או עם $project: { lessons: 0 }.`,
    source:`דף פקודות MongoDB — project / $unset` },

  { id:'mc-sort', set:'crud', topic:'sort', dataset:'college2',
    prompt:`sort — הציגו את כל הסטודנטים ממוינים לפי גיל מהגדול לקטן. כשהגיל זהה, מיינו לפי firstName בסדר אלפביתי.
הציגו firstName ו-age בלבד (בלי _id).`,
    check:'result',
    solution:`db.students.find({}, { _id: 0, firstName: 1, age: 1 }).sort({ age: -1, firstName: 1 })`,
    alt:[`db.students.aggregate([ { $sort: { age: -1, firstName: 1 } }, { $project: { _id: 0, firstName: 1, age: 1 } } ])`],
    hint:`sort({ age: -1, firstName: 1 }): ‏‎-1 יורד, ‏1 עולה. סדר השדות קובע את סדר המיון.`,
    explain:`Collection: students · find + sort.
‏.sort({ age: -1, firstName: 1 }) ממיין קודם לפי גיל בסדר יורד, ורק כשיש תיקו בגיל מכריע firstName בסדר עולה.
התוצאה מתחילה ב-Itai 27, Eyal 26, Yossi 25 ומסתיימת ב-Shira 20. בגיל 23 מופיעים David ואחריו Tamar.
ב-SQL: ORDER BY age DESC, firstName ASC`,
    source:`דף פקודות MongoDB — פקודות על find (sort)` },

  { id:'mc-limit', set:'crud', topic:'sort', dataset:'college2',
    prompt:`limit — הציגו את 3 הסטודנטים המבוגרים ביותר, מהמבוגר לצעיר: firstName ו-age בלבד (בלי _id).`,
    check:'result',
    solution:`db.students.find({}, { _id: 0, firstName: 1, age: 1 }).sort({ age: -1 }).limit(3)`,
    alt:[`db.students.aggregate([ { $sort: { age: -1 } }, { $limit: 3 }, { $project: { _id: 0, firstName: 1, age: 1 } } ])`],
    hint:`קודם sort יורד ואז limit(3).`,
    explain:`Collection: students · find + sort + limit.
‏.limit(3) מחזיר רק 3 מסמכים. בלי sort לפניו מקבלים 3 מסמכים "ראשונים" שרירותיים.
ב-find מונגו תמיד ממיין לפני שהוא מגביל, לא משנה באיזה סדר כתבתם sort ו-limit. ב-Aggregation הסדר של השלבים כן קובע.
התוצאה: Itai 27, Eyal 26, Yossi 25.
ב-SQL Server: SELECT TOP 3 firstName, age FROM students ORDER BY age DESC;`,
    source:`דף פקודות MongoDB — פקודות על find (limit)` },

  { id:'mc-skip', set:'crud', topic:'sort', dataset:'college2',
    prompt:`skip (Pagination) — מציגים את הסטודנטים בעמודים של 3, ממוינים לפי _id עולה. הציגו את עמוד 2 (המסמכים המלאים).`,
    check:'result', compare:'ids',
    solution:`db.students.find().sort({ _id: 1 }).skip(3).limit(3)`,
    alt:[`db.students.aggregate([ { $sort: { _id: 1 } }, { $skip: 3 }, { $limit: 3 } ])`],
    hint:`עמוד n בגודל k: ‏skip((n-1)*k).limit(k).`,
    explain:`Collection: students · find + sort + skip + limit.
‏.skip(3) מדלג על 3 המסמכים הראשונים (עמוד 1), ו-.limit(3) לוקח את 3 הבאים.
התוצאה: סטודנטים 4, 5, 6 (Maya, Omer, Shira).
ב-SQL Server: ORDER BY id OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY;`,
    source:`דף פקודות MongoDB — פקודות על find (skip)` },

  /* ---- ספירה / distinct / findOne ---- */
  { id:'mc-count', set:'crud', topic:'find', dataset:'college2',
    prompt:`countDocuments — כמה סטודנטים גרים ב-"Tel Aviv"? (התוצאה: מספר)`,
    check:'result',
    solution:`db.students.countDocuments({ city: "Tel Aviv" })`,
    alt:[`db.students.find({ city: "Tel Aviv" }).count()`,
         `db.students.aggregate([ { $match: { city: "Tel Aviv" } }, { $count: "total" } ])`],
    hint:`countDocuments(מסנן) מחזיר מספר.`,
    explain:`Collection: students · countDocuments.
‏countDocuments(filter) סופר את המסמכים שעונים על התנאי, כמו SELECT COUNT(*) … WHERE.
‏estimatedDocumentCount() נותן הערכה מהירה של כל ה-Collection ולא מקבל תנאי.
‏.count() על find עדיין עובד, אבל מסומן כמיושן (deprecated).
התוצאה: 3.`,
    source:`דף פקודות MongoDB — countDocuments` },

  { id:'mc-estimated', set:'crud', topic:'find', dataset:'college2',
    prompt:`estimatedDocumentCount — כמה מסמכים יש בסך הכל ב-Collection submissions? השתמשו בפקודה שנותנת הערכה מהירה בלי תנאי. (התוצאה: מספר)`,
    check:'result',
    solution:`db.submissions.estimatedDocumentCount()`,
    alt:[`db.submissions.countDocuments({})`],
    hint:`estimatedDocumentCount() לא מקבלת מסנן בכלל.`,
    explain:`Collection: submissions · estimatedDocumentCount.
הפקודה לא מקבלת מסנן. היא לוקחת את מספר המסמכים מהמטא-דאטה של ה-Collection בלי לסרוק אותו, ולכן היא מהירה מאוד גם על מיליוני מסמכים.
‏countDocuments({}) סופרת את המסמכים בפועל. היא מדויקת תמיד אבל איטית יותר, והיא היחידה מבין השתיים שמקבלת תנאי.
התוצאה: 16.
ב-SQL: SELECT COUNT(*) FROM submissions;`,
    source:`דף פקודות MongoDB — פעולות נוספות (estimatedDocumentCount)` },

  { id:'mc-distinct', set:'crud', topic:'find', dataset:'college2',
    prompt:`distinct — הציגו את רשימת הערים השונות שבהן גרים סטודנטים (מערך של ערכים).`,
    check:'result',
    solution:`db.students.distinct("city")`,
    alt:[`db.students.aggregate([ { $group: { _id: "$city" } } ])`],
    hint:`distinct("שם_שדה") מחזיר מערך של ערכים ייחודיים.`,
    explain:`Collection: students · distinct.
‏distinct("city") מחזיר מערך של הערכים בלי כפילויות, כמו SELECT DISTINCT city ב-SQL.
אפשר להוסיף מסנן כארגומנט שני, למשל distinct("city", { age: { $gt: 22 } }).
ב-Aggregation: ‏$group עם _id: "$city" נותן קבוצה אחת לכל עיר.
התוצאה: 6 ערים.`,
    source:`דף פקודות MongoDB — distinct` },

  { id:'mc-findone', set:'crud', topic:'find', dataset:'college2',
    prompt:`findOne — הציגו את המרצה ששם המשפחה שלו "Klein" (מסמך אחד).`,
    check:'result', compare:'ids',
    solution:`db.lecturers.findOne({ lastName: "Klein" })`,
    alt:[`db.lecturers.find({ lastName: "Klein" })`],
    hint:`findOne מחזיר מסמך אחד, לא Cursor.`,
    explain:`Collection: lecturers · findOne.
‏findOne מחזיר את המסמך הראשון שמתאים לתנאי כאובייקט אחד, או null אם אין התאמה. ‏find מחזיר Cursor עם כל ההתאמות.
משתמשים בו כשמצפים לתוצאה אחת, למשל חיפוש לפי _id או לפי מייל ייחודי.
התוצאה: Dana Klein (_id 4).`,
    source:`דף פקודות MongoDB — findOne` },

  /* ---- insert ---- */
  { id:'mc-insertone', set:'crud', topic:'insert', dataset:'college2',
    prompt:`insertOne — הוסיפו סטודנט חדש:
_id: 11, firstName: "Roni", lastName: "Bar", email: "roni@gmail.com", phone: "0501112222", city: "Eilat", age: 24, registrationYear: 2026.`,
    check:'state', collection:'students',
    solution:`db.students.insertOne({
  _id: 11,
  firstName: "Roni",
  lastName: "Bar",
  email: "roni@gmail.com",
  phone: "0501112222",
  city: "Eilat",
  age: 24,
  registrationYear: 2026
})`,
    alt:[`db.students.insertMany([ { _id: 11, firstName: "Roni", lastName: "Bar", email: "roni@gmail.com", phone: "0501112222", city: "Eilat", age: 24, registrationYear: 2026 } ])`],
    hint:`insertOne({ ... }) עם מסמך אחד. שמות שדות בלי מרכאות, מחרוזות במרכאות.`,
    explain:`Collection: students · insertOne.
‏insertOne מקבל מסמך אחד ומחזיר { acknowledged: true, insertedId: 11 }.
אם לא נותנים _id, מונגו יוצר ObjectId ייחודי באופן אוטומטי. כאן נתנו מספר כדי שיתאים לשאר הנתונים.
אם מוסיפים מסמך עם _id שכבר קיים, מתקבלת שגיאת duplicate key, כמו הפרת PRIMARY KEY ב-SQL.
ב-SQL: INSERT INTO students VALUES (11, 'Roni', 'Bar', 'roni@gmail.com', '0501112222', 'Eilat', 24, 2026);`,
    source:`דף פקודות MongoDB — insertOne` },

  { id:'mc-insertmany', set:'crud', topic:'insert', dataset:'college2',
    prompt:`insertMany — רשמו את Lior (studentId: 10) לשני קורסים בפקודה אחת: courseId 2 ו-courseId 6.
בכל הרשמה: enrollmentDate הוא 2026-02-01 (ISODate), ו-status הוא "Active". אל תכתבו _id, מונגו ייצור אותו.`,
    check:'state', collection:'enrollments',
    solution:`db.enrollments.insertMany([
  { studentId: 10, courseId: 2, enrollmentDate: ISODate("2026-02-01"), status: "Active" },
  { studentId: 10, courseId: 6, enrollmentDate: ISODate("2026-02-01"), status: "Active" }
])`,
    alt:[`db.enrollments.insertMany([
  { studentId: 10, courseId: 2, enrollmentDate: new Date("2026-02-01"), status: "Active" },
  { studentId: 10, courseId: 6, enrollmentDate: new Date("2026-02-01"), status: "Active" }
])`,
         `db.enrollments.insertOne({ studentId: 10, courseId: 2, enrollmentDate: ISODate("2026-02-01"), status: "Active" })
db.enrollments.insertOne({ studentId: 10, courseId: 6, enrollmentDate: ISODate("2026-02-01"), status: "Active" })`],
    hint:`insertMany([ {...}, {...} ]) מקבל מערך, כלומר סוגריים מרובעים.`,
    explain:`Collection: enrollments · insertMany.
‏insertMany מקבל מערך של מסמכים ומוסיף את כולם בפקודה אחת. הוא מחזיר insertedIds, ה-ObjectId שנוצרו.
‏ISODate("2026-02-01") ו-new Date("2026-02-01") יוצרים אותו תאריך. ‏new Date() בלי ארגומנט נותן את הרגע הנוכחי.
ב-SQL: INSERT INTO enrollments (studentId, courseId, enrollmentDate, status) VALUES (10,2,'2026-02-01','Active'), (10,6,'2026-02-01','Active');`,
    source:`דף פקודות MongoDB — insertMany` },

  /* ---- update ---- */
  { id:'mc-set', set:'crud', topic:'update', dataset:'college2',
    prompt:`$set — Maya Peretz (_id: 4) עברה לגור ב-"Haifa" ובינתיים גם חגגה יום הולדת. עדכנו את העיר ל-"Haifa" ואת הגיל ל-23 בפקודה אחת.`,
    check:'state', collection:'students',
    solution:`db.students.updateOne({ _id: 4 }, { $set: { city: "Haifa", age: 23 } })`,
    alt:[`db.students.updateOne({ _id: 4 }, { $set: { city: "Haifa" }, $inc: { age: 1 } })`],
    hint:`אפשר לשים כמה שדות באותו $set.`,
    explain:`Collection: students · updateOne.
‏$set מקבל אובייקט עם כמה שדות ומעדכן את כולם בבת אחת. שדות שלא הוזכרו לא משתנים.
אפשר גם לשלב כמה אופרטורים באותו עדכון, למשל $set על העיר ו-$inc: { age: 1 } על הגיל.
ב-SQL: UPDATE students SET city = 'Haifa', age = 23 WHERE id = 4;`,
    source:`דף פקודות MongoDB — אופרטורים לעדכון ($set)` },

  { id:'mc-inc', set:'crud', topic:'update', dataset:'college2',
    prompt:`$inc — המרצה החליט על פקטור: הוסיפו 5 נקודות לציון של כל ההגשות למטלה 3 (assignmentId: 3).`,
    check:'state', collection:'submissions',
    solution:`db.submissions.updateMany({ assignmentId: 3 }, { $inc: { grade: 5 } })`,
    hint:`$inc מגדיל ערך מספרי (או מקטין, עם מספר שלילי).`,
    explain:`Collection: submissions · updateMany + $inc.
‏{ $inc: { grade: 5 } } מוסיף 5 לערך הקיים, כמו SET grade = grade + 5 ב-SQL. ‏{ $inc: { grade: -5 } } מוריד 5.
‏updateMany, כי יש 3 הגשות למטלה הזו: 88→93, ‏65→70, ‏72→77.
אם השדה לא קיים, $inc יוצר אותו עם הערך שנתתם.`,
    source:`דף פקודות MongoDB — אופרטורים לעדכון ($inc)` },

  { id:'mc-unset', set:'crud', topic:'update', dataset:'college2',
    prompt:`$unset — מחקו את השדה phone מהמסמך של Lior Shalom (_id: 10).`,
    check:'state', collection:'students',
    solution:`db.students.updateOne({ _id: 10 }, { $unset: { phone: "" } })`,
    alt:[`db.students.updateOne({ _id: 10 }, { $unset: { phone: 1 } })`],
    hint:`{ $unset: { phone: "" } }. הערך עצמו לא משנה.`,
    explain:`Collection: students · updateOne + $unset.
‏$unset מוחק את השדה מהמסמך לגמרי. זה לא אותו דבר כמו לשים בו null.
הערך שכותבים ("" או 1) לא משנה. בדף של המרצה הכתיבה היא { $unset: { age: "" } }.
ב-SQL אי אפשר למחוק עמודה משורה אחת. אפשר רק UPDATE … SET phone = NULL, או ALTER TABLE … DROP COLUMN לכל הטבלה.`,
    source:`דף פקודות MongoDB — אופרטורים לעדכון ($unset)` },

  { id:'mc-mul', set:'crud', topic:'update', dataset:'college2',
    prompt:`$mul — הכפילו פי 2 את מספר נקודות הזכות (credits) של כל הקורסים במחלקה "Business".`,
    check:'state', collection:'courses',
    solution:`db.courses.updateMany({ department: "Business" }, { $mul: { credits: 2 } })`,
    hint:`{ $mul: { credits: 2 } }.`,
    explain:`Collection: courses · updateMany + $mul.
‏$mul מכפיל את הערך הקיים, כמו SET credits = credits * 2. בדף של המרצה הדוגמה היא { $mul: { price: 1.1 } }, כלומר העלאה של 10%.
התוצאה: Marketing 2→4, ‏Statistics 3→6.`,
    source:`דף פקודות MongoDB — אופרטורים לעדכון ($mul)` },

  { id:'mc-rename', set:'crud', topic:'update', dataset:'college2',
    prompt:`$rename — שנו את שם השדה phone ל-mobile בכל מסמכי הסטודנטים.`,
    check:'state', collection:'students',
    solution:`db.students.updateMany({}, { $rename: { phone: "mobile" } })`,
    hint:`{ $rename: { שם_ישן: "שם_חדש" } }. השם החדש נכתב כמחרוזת.`,
    explain:`Collection: students · updateMany עם מסנן ריק {} (כל המסמכים) + $rename.
‏$rename משנה את שם השדה ושומר על הערך שלו. במסמך שהשדה לא קיים בו, לא קורה כלום.
ב-SQL Server: EXEC sp_rename 'students.phone', 'mobile', 'COLUMN'; (שינוי סכמה, לא עדכון נתונים).`,
    source:`דף פקודות MongoDB — אופרטורים לעדכון ($rename)` },

  { id:'mc-max', set:'crud', topic:'update', dataset:'college2',
    prompt:`$max (עדכון) — מדיניות חדשה: הוותק (seniority) המינימלי שנרשם לכל מרצה הוא 10. מרצה עם ותק נמוך מ-10 יעודכן ל-10, ומרצה עם ותק גבוה יותר יישאר כמו שהוא. עשו את זה בפקודה אחת בלי מסנן.`,
    check:'state', collection:'lecturers',
    solution:`db.lecturers.updateMany({}, { $max: { seniority: 10 } })`,
    alt:[`db.lecturers.updateMany({ seniority: { $lt: 10 } }, { $set: { seniority: 10 } })`],
    hint:`$max מעדכן רק אם הערך החדש גדול מהערך הקיים.`,
    explain:`Collection: lecturers · updateMany + $max.
‏{ $max: { seniority: 10 } } מעדכן ל-10 רק אם 10 גדול מהערך הנוכחי. ‏$min עובד הפוך: מעדכן רק אם הערך החדש קטן יותר.
השמות מבלבלים: ‏$max מעלה ערכים נמוכים, כלומר שומר "לכל הפחות 10".
התוצאה: Rina 7→10, ‏Dana 3→10, ‏Moshe (12) ו-Avi (15) לא משתנים.`,
    source:`דף פקודות MongoDB — אופרטורים לעדכון ($min / $max)` },

  { id:'mc-min', set:'crud', topic:'update', dataset:'college2',
    prompt:`$min (עדכון) — בדוח חדש הוותק (seniority) מוגבל לתקרה של 10. מרצה עם ותק גבוה מ-10 יעודכן ל-10, וכל השאר יישארו כמו שהם. עשו את זה בפקודה אחת בלי מסנן.`,
    check:'state', collection:'lecturers',
    solution:`db.lecturers.updateMany({}, { $min: { seniority: 10 } })`,
    alt:[`db.lecturers.updateMany({ seniority: { $gt: 10 } }, { $set: { seniority: 10 } })`],
    hint:`$min מעדכן רק אם הערך החדש קטן מהערך הקיים.`,
    explain:`Collection: lecturers · updateMany + $min.
‏{ $min: { seniority: 10 } } משווה בין 10 לערך הקיים, ומעדכן ל-10 רק אם 10 קטן ממנו. כך אף ערך לא נשאר מעל 10.
זה ההפך מ-$max בתרגיל הקודם: ‏$min שומר "לכל היותר 10", ו-$max שומר "לכל הפחות 10".
התוצאה: Moshe 12→10, ‏Avi 15→10, ‏Rina (7) ו-Dana (3) לא משתנים.
ב-SQL: UPDATE lecturers SET seniority = 10 WHERE seniority > 10;`,
    source:`דף פקודות MongoDB — אופרטורים לעדכון ($min)` },

  { id:'mc-push', set:'crud', topic:'array', dataset:'college2',
    prompt:`$push + $each — הוסיפו לקורס Cyber Security (_id: 6) שני שיעורים בפקודה אחת: { title: "Network Basics", duration: 90 } ואחריו { title: "Encryption", duration: 120 }.`,
    check:'state', collection:'courses',
    solution:`db.courses.updateOne(
  { _id: 6 },
  { $push: { lessons: { $each: [
      { title: "Network Basics", duration: 90 },
      { title: "Encryption", duration: 120 }
  ] } } }
)`,
    alt:[`db.courses.updateOne({ _id: 6 }, { $push: { lessons: { title: "Network Basics", duration: 90 } } })
db.courses.updateOne({ _id: 6 }, { $push: { lessons: { title: "Encryption", duration: 120 } } })`],
    hint:`$push מוסיף איבר אחד. כדי להוסיף כמה איברים בבת אחת עוטפים אותם ב-$each.`,
    explain:`Collection: courses · updateOne + $push.
‏$push מוסיף איבר לסוף המערך. ‏{ $push: { lessons: [a, b] } } בלי $each היה מוסיף איבר אחד שהוא בעצמו מערך, וזה לא מה שרצינו.
‏$each מוסיף כל איבר בנפרד. אפשר לשלב איתו $position (באיזה מקום להוסיף) ו-$slice (לשמור רק N איברים).
‏$push גם לא בודק כפילויות. אם צריך את זה, משתמשים ב-$addToSet.`,
    source:`דף פקודות MongoDB — עבודה עם מערכים ($push, $each)` },

  { id:'mc-addtoset', set:'crud', topic:'array', dataset:'college2',
    prompt:`$addToSet — הוסיפו לקורס Marketing (_id: 4) את השיעורים { title: "Market Analysis", duration: 90 } ו-{ title: "Branding", duration: 60 }, כך שלא תיווצר כפילות. השיעור הראשון כבר קיים.`,
    check:'state', collection:'courses',
    solution:`db.courses.updateOne(
  { _id: 4 },
  { $addToSet: { lessons: { $each: [
      { title: "Market Analysis", duration: 90 },
      { title: "Branding", duration: 60 }
  ] } } }
)`,
    alt:[`db.courses.updateOne({ _id: 4 }, { $addToSet: { lessons: { title: "Market Analysis", duration: 90 } } })
db.courses.updateOne({ _id: 4 }, { $addToSet: { lessons: { title: "Branding", duration: 60 } } })`],
    hint:`$addToSet עם $each מוסיף רק איברים שעוד לא קיימים במערך.`,
    explain:`Collection: courses · updateOne + $addToSet.
‏$addToSet מוסיף איבר רק אם אין במערך איבר זהה, ובכך מונע כפילויות. ‏Market Analysis כבר קיים ולכן לא נוסף. רק Branding נוסף.
עם $push, ‏Market Analysis היה מופיע פעמיים.
כשהאיברים הם מסמכים, "זהה" פירושו אותם שדות, עם אותם ערכים ובאותו סדר.`,
    source:`דף פקודות MongoDB — עבודה עם מערכים ($addToSet)` },

  { id:'mc-pull', set:'crud', topic:'array', dataset:'college2',
    prompt:`$pull — הסירו מהקורס MongoDB (_id: 1) את השיעור שהכותרת שלו "Indexes".`,
    check:'state', collection:'courses',
    solution:`db.courses.updateOne({ _id: 1 }, { $pull: { lessons: { title: "Indexes" } } })`,
    alt:[`db.courses.updateOne({ _id: 1 }, { $pull: { lessons: { title: "Indexes", duration: 60 } } })`],
    hint:`$pull מסיר את כל האיברים שעומדים בתנאי: { $pull: { lessons: { title: "Indexes" } } }.`,
    explain:`Collection: courses · updateOne + $pull.
‏$pull מסיר מהמערך כל איבר שעומד בתנאי. כשהאיברים הם מסמכים, התנאי הוא מסנן חלקי, כאן לפי title בלבד.
הבדלים בין האופרטורים: ‏$pull מסיר לפי תנאי. ‏$pullAll מסיר רשימה של ערכים מדויקים. ‏$pop מסיר מההתחלה או מהסוף.`,
    source:`דף פקודות MongoDB — עבודה עם מערכים ($pull)` },

  { id:'mc-pop', set:'crud', topic:'array', dataset:'college2',
    prompt:`$pop — הסירו את השיעור האחרון במערך lessons של הקורס Statistics (_id: 5).`,
    check:'state', collection:'courses',
    solution:`db.courses.updateOne({ _id: 5 }, { $pop: { lessons: 1 } })`,
    alt:[`db.courses.updateOne({ _id: 5 }, { $pull: { lessons: { title: "Probability" } } })`],
    hint:`{ $pop: { lessons: 1 } } מסיר את האחרון, ו-{ $pop: { lessons: -1 } } מסיר את הראשון.`,
    explain:`Collection: courses · updateOne + $pop.
‏$pop: 1 מסיר את האיבר האחרון במערך, ו-$pop: -1 מסיר את הראשון.
כאן יוסר Probability, ובקורס יישארו Descriptive Stats ו-Regression.`,
    source:`דף פקודות MongoDB — עבודה עם מערכים ($pop)` },

  { id:'mc-pullall', set:'crud', topic:'array', dataset:'college2',
    prompt:`$pullAll — הסירו מהקורס MongoDB (_id: 1), בפקודה אחת, את שני השיעורים { title: "CRUD", duration: 90 } ו-{ title: "Indexes", duration: 60 }.`,
    check:'state', collection:'courses',
    solution:`db.courses.updateOne(
  { _id: 1 },
  { $pullAll: { lessons: [
      { title: "CRUD", duration: 90 },
      { title: "Indexes", duration: 60 }
  ] } }
)`,
    alt:[`db.courses.updateOne({ _id: 1 }, { $pull: { lessons: { title: { $in: ["CRUD", "Indexes"] } } } })`],
    hint:`$pullAll מקבל מערך של ערכים מדויקים להסרה: { $pullAll: { lessons: [ {...}, {...} ] } }.`,
    explain:`Collection: courses · updateOne + $pullAll.
‏$pullAll מקבל רשימה של ערכים מדויקים ומסיר מהמערך כל איבר ששווה לאחד מהם.
כשהאיברים הם מסמכים, צריך לכתוב כל מסמך במלואו. ‏{ title: "CRUD" } לבד לא יסיר כלום, כי הוא לא שווה ל-{ title: "CRUD", duration: 90 }. (במונגו אמיתי גם סדר השדות צריך להיות זהה.)
לעומת זאת, ‏$pull מקבל תנאי. לכן { $pull: { lessons: { title: { $in: ["CRUD", "Indexes"] } } } } עושה את אותו דבר לפי title בלבד.
התוצאה: בקורס נשארים Intro to NoSQL ו-Aggregation.`,
    source:`דף פקודות MongoDB — עבודה עם מערכים ($pullAll)` },

  { id:'mc-position', set:'crud', topic:'array', dataset:'college2',
    prompt:`$push + $position — הוסיפו שיעור פתיחה { title: "Course Intro", duration: 30 } בתחילת מערך השיעורים של הקורס Python (_id: 3), לפני כל השיעורים הקיימים.`,
    check:'state', collection:'courses',
    solution:`db.courses.updateOne(
  { _id: 3 },
  { $push: { lessons: { $each: [ { title: "Course Intro", duration: 30 } ], $position: 0 } } }
)`,
    hint:`$position קובע באיזה מקום להוסיף, והוא עובד רק יחד עם $each (גם כשמוסיפים איבר אחד).`,
    explain:`Collection: courses · updateOne + $push.
‏$push רגיל מוסיף לסוף המערך. ‏$position: 0 מוסיף לפני האיבר הראשון (האינדקס מתחיל ב-0).
‏$position חייב לבוא יחד עם $each, ולכן גם איבר יחיד נכתב בתוך מערך: { $each: [ {...} ], $position: 0 }.
התוצאה: Course Intro, Python Basics, Pandas.`,
    source:`דף פקודות MongoDB — עבודה עם מערכים ($each, $position)` },

  { id:'mc-slice', set:'crud', topic:'array', dataset:'college2',
    prompt:`$push + $slice — הוסיפו לקורס MongoDB (_id: 1) את השיעור { title: "Sharding", duration: 90 }, ושמרו במערך רק את 4 השיעורים האחרונים. השיעור הראשון במערך יימחק.`,
    check:'state', collection:'courses',
    solution:`db.courses.updateOne(
  { _id: 1 },
  { $push: { lessons: { $each: [ { title: "Sharding", duration: 90 } ], $slice: -4 } } }
)`,
    hint:`$slice עם מספר שלילי שומר את N האיברים האחרונים. גם הוא עובד רק יחד עם $each.`,
    explain:`Collection: courses · updateOne + $push.
‏$slice בתוך $push חותך את המערך אחרי ההוספה. מספר חיובי שומר את N האיברים הראשונים, ומספר שלילי שומר את N האחרונים.
כאן ‎-4 שומר את CRUD, ‏Aggregation, ‏Indexes ו-Sharding, ו-Intro to NoSQL נמחק.
כך שומרים מערך חסום (Bounded Array), למשל "10 ההגשות האחרונות". זה פתרון לבעיה משאלה 6 בשיעור: מערך שגדל בלי סוף.`,
    source:`דף פקודות MongoDB — עבודה עם מערכים ($each, $slice)` },

  { id:'mc-replace', set:'crud', topic:'update', dataset:'college2',
    prompt:`replaceOne — החליפו את כל המסמך של המרצה Dana Klein (_id: 4) במסמך החדש הבא (שימו לב: אין בו seniority):
{ firstName: "Dana", lastName: "Klein", department: "AI", email: "dana@college.com" }`,
    check:'state', collection:'lecturers',
    solution:`db.lecturers.replaceOne(
  { _id: 4 },
  { firstName: "Dana", lastName: "Klein", department: "AI", email: "dana@college.com" }
)`,
    alt:[`db.lecturers.findOneAndReplace({ _id: 4 }, { firstName: "Dana", lastName: "Klein", department: "AI", email: "dana@college.com" })`],
    hint:`replaceOne(מסנן, מסמך_חדש). במסמך החדש אין אופרטורים כמו $set.`,
    explain:`Collection: lecturers · replaceOne.
‏replaceOne מחליף את כל תוכן המסמך במסמך החדש. רק ה-_id נשמר. שדה שלא מופיע במסמך החדש נמחק, ולכן seniority נעלם מהמסמך של Dana.
ההבדל מ-updateOne + $set: ‏$set משנה רק את השדות שכתובים בו ומשאיר את השאר. עם { $set: { department: "AI", email: "dana@college.com" } } השדה seniority: 3 היה נשאר, וזו תשובה שגויה כאן.
מתי משתמשים בזה? כשמבנה המסמך כולו משתנה (בדף הפקודות: "כשצריך להחליף את כל המבנה").`,
    source:`דף פקודות MongoDB — replaceOne` },

  { id:'mc-upsert', set:'crud', topic:'update', dataset:'college2',
    prompt:`upsert — עדכנו את המרצה עם _id: 5. אם הוא לא קיים, צרו אותו. השדות: firstName: "Yael", lastName: "Mor", department: "Business", seniority: 1.`,
    check:'state', collection:'lecturers',
    solution:`db.lecturers.updateOne(
  { _id: 5 },
  { $set: { firstName: "Yael", lastName: "Mor", department: "Business", seniority: 1 } },
  { upsert: true }
)`,
    alt:[`db.lecturers.insertOne({ _id: 5, firstName: "Yael", lastName: "Mor", department: "Business", seniority: 1 })`],
    hint:`הארגומנט השלישי של updateOne הוא אפשרויות: { upsert: true }.`,
    explain:`Collection: lecturers · updateOne עם { upsert: true }.
‏upsert הוא צירוף של update ו-insert. אם יש מסמך שמתאים למסנן, הוא מתעדכן. אם אין, נוצר מסמך חדש משדות המסנן (_id: 5) ומשדות ה-$set.
הפקודה מחזירה upsertedId כשנוצר מסמך חדש.
ב-SQL Server משיגים את זה עם MERGE, או עם IF EXISTS … UPDATE ELSE INSERT.`,
    source:`עדכון עם אפשרות upsert (השלמה לדף הפקודות)` },

  { id:'mc-foau', set:'crud', topic:'update', dataset:'college2',
    prompt:`findOneAndUpdate — הוסיפו 10 נקודות לציון של הגשה 7, והחזירו את המסמך אחרי העדכון.`,
    check:'result',
    solution:`db.submissions.findOneAndUpdate(
  { _id: 7 },
  { $inc: { grade: 10 } },
  { returnNewDocument: true }
)`,
    alt:[`db.submissions.findOneAndUpdate({ _id: 7 }, { $inc: { grade: 10 } }, { returnDocument: "after" })`],
    hint:`ברירת המחדל מחזירה את המסמך לפני העדכון. צריך { returnNewDocument: true }.`,
    explain:`Collection: submissions · findOneAndUpdate.
הפקודה מוצאת מסמך, מעדכנת אותו ומחזירה אותו, הכל בפעולה אחת ("פעולה משולבת" בדף הפקודות).
ברירת המחדל מחזירה את המסמך כפי שהיה לפני העדכון (grade: 65). ‏{ returnNewDocument: true }, או { returnDocument: "after" } בדרייברים, מחזיר את המסמך המעודכן (grade: 75).
‏findOneAndDelete ו-findOneAndReplace עובדות באותו אופן: מוחקות או מחליפות את המסמך ומחזירות אותו.`,
    source:`דף פקודות MongoDB — פעולות נוספות (findOneAndUpdate)` },

  { id:'mc-foar', set:'crud', topic:'update', dataset:'college2',
    prompt:`findOneAndReplace — החליפו את המסמך של המרצה Avi Peretz (_id: 3) במסמך { firstName: "Avi", lastName: "Peretz", department: "Management", seniority: 16 }, והחזירו את המסמך אחרי ההחלפה.`,
    check:'result',
    solution:`db.lecturers.findOneAndReplace(
  { _id: 3 },
  { firstName: "Avi", lastName: "Peretz", department: "Management", seniority: 16 },
  { returnNewDocument: true }
)`,
    alt:[`db.lecturers.findOneAndReplace({ _id: 3 }, { firstName: "Avi", lastName: "Peretz", department: "Management", seniority: 16 }, { returnDocument: "after" })`],
    hint:`כמו findOneAndUpdate: ברירת המחדל מחזירה את המסמך הישן. כדי לקבל את החדש מוסיפים { returnNewDocument: true }.`,
    explain:`Collection: lecturers · findOneAndReplace.
הפקודה מחליפה את המסמך כולו (כמו replaceOne), ובנוסף מחזירה אותו.
בלי אפשרויות היא מחזירה את המסמך כפי שהיה לפני ההחלפה (department: "Business", seniority: 15). עם { returnNewDocument: true } היא מחזירה את המסמך החדש.
ה-_id נשמר (3), גם אם לא כתבתם אותו במסמך החדש.`,
    source:`דף פקודות MongoDB — פעולות נוספות (findOneAndReplace)` },

  /* ---- delete ---- */
  { id:'mc-deleteone', set:'crud', topic:'delete', dataset:'college2',
    prompt:`deleteOne — מחקו את הגשה 16.`,
    check:'state', collection:'submissions',
    solution:`db.submissions.deleteOne({ _id: 16 })`,
    alt:[`db.submissions.findOneAndDelete({ _id: 16 })`, `db.submissions.deleteMany({ _id: 16 })`],
    hint:`deleteOne(מסנן) מוחק את המסמך הראשון שמתאים.`,
    explain:`Collection: submissions · deleteOne.
‏deleteOne מוחק מסמך אחד בלבד, הראשון שמתאים, גם אם יש כמה התאמות. הוא מחזיר { deletedCount: 1 }.
כשרוצים למחוק מסמך מסוים, מסננים לפי _id כדי שלא יימחק מסמך אחר.
‏findOneAndDelete מוחק ומחזיר את המסמך שנמחק.
ב-SQL: DELETE FROM submissions WHERE id = 16;`,
    source:`דף פקודות MongoDB — deleteOne` },

  { id:'mc-foad', set:'crud', topic:'delete', dataset:'college2',
    prompt:`findOneAndDelete — מחקו את ההגשה של Shira Avraham (studentId: 6), והחזירו את המסמך שנמחק.`,
    check:'result',
    solution:`db.submissions.findOneAndDelete({ studentId: 6 })`,
    alt:[`db.submissions.findOneAndDelete({ _id: 12 })`],
    hint:`findOneAndDelete(מסנן) מוחק את המסמך הראשון שמתאים ומחזיר אותו.`,
    explain:`Collection: submissions · findOneAndDelete.
הפקודה מוצאת את המסמך הראשון שמתאים, מוחקת אותו ומחזירה אותו כפי שהיה. ל-Shira יש הגשה אחת בלבד (_id 12), עם grade: null.
לעומת זאת, deleteOne מחזיר רק { acknowledged: true, deletedCount: 1 }, ולכן הוא לא מתאים כשצריך לראות מה נמחק (למשל כדי לרשום את זה ביומן).
אם כמה מסמכים מתאימים, אפשר לבחור איזה יימחק עם האפשרות sort, למשל { sort: { submissionDate: 1 } }.`,
    source:`דף פקודות MongoDB — פעולות נוספות (findOneAndDelete)` },

  { id:'mc-deletemany', set:'crud', topic:'delete', dataset:'college2',
    prompt:`deleteMany — מחקו את כל ההרשמות שאינן פעילות (status: "Inactive").`,
    check:'state', collection:'enrollments',
    solution:`db.enrollments.deleteMany({ status: "Inactive" })`,
    alt:[`db.enrollments.deleteMany({ status: { $ne: "Active" } })`],
    hint:`deleteMany(מסנן) מוחק את כל ההתאמות.`,
    explain:`Collection: enrollments · deleteMany.
‏deleteMany מוחק את כל המסמכים שמתאימים לתנאי. כאן נמחקות 2 הרשמות (של Noa ל-Marketing ושל Eyal ל-Statistics).
זהירות: deleteMany({}) עם מסנן ריק מוחק את כל המסמכים ב-Collection. זה כמו DELETE FROM enrollments בלי WHERE.
אין במונגו מפתח זר שימנע את המחיקה (כמו RESTRICT או CASCADE ב-SQL). את שלמות ההפניות צריך לשמור בקוד.`,
    source:`דף פקודות MongoDB — deleteMany` },

  /* ======================================================================
     חלק ד' — Aggregation Pipeline
     ====================================================================== */
  { id:'ma-count', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$match + $count — כמה הרשמות פעילות (status: "Active") יש? פתרו עם aggregate.
התוצאה: מסמך אחד { activeCount: … }.`,
    check:'result',
    solution:`db.enrollments.aggregate([
  { $match: { status: "Active" } },
  { $count: "activeCount" }
])`,
    alt:[`db.enrollments.countDocuments({ status: "Active" })`,
         `db.enrollments.aggregate([ { $match: { status: "Active" } }, { $group: { _id: null, activeCount: { $sum: 1 } } }, { $project: { _id: 0 } } ])`],
    hint:`$count: "שם_שדה" סופר את המסמכים שהגיעו לשלב הזה ויוצר מסמך אחד.`,
    explain:`Collection: enrollments · aggregate.
1. $match: מסנן הרשמות פעילות, כמו WHERE.
2. $count: "activeCount" סופר כמה מסמכים הגיעו לשלב ומחזיר { activeCount: 13 }.
אותו דבר עם $group: ‏{ _id: null, activeCount: { $sum: 1 } }. ‏_id: null פירושו שכל המסמכים נכנסים לקבוצה אחת.
ב-SQL: SELECT COUNT(*) AS activeCount FROM enrollments WHERE status = 'Active';`,
    source:`דף פקודות MongoDB — Aggregation ($match, $count)` },

  { id:'ma-group-city', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$group + $sort — כמה סטודנטים יש בכל עיר? מיינו לפי מספר הסטודנטים מהגדול לקטן, ובמקרה של תיקו לפי שם העיר בסדר אלפביתי.
התוצאה: city, studentsCount (בלי _id).`,
    check:'result',
    solution:`db.students.aggregate([
  { $group: { _id: "$city", studentsCount: { $sum: 1 } } },
  { $sort: { studentsCount: -1, _id: 1 } },
  { $project: { _id: 0, city: "$_id", studentsCount: 1 } }
])`,
    alt:[`db.students.aggregate([
  { $group: { _id: "$city", studentsCount: { $sum: 1 } } },
  { $project: { _id: 0, city: "$_id", studentsCount: 1 } },
  { $sort: { studentsCount: -1, city: 1 } }
])`],
    hint:`$group לפי "$city", ואחריו $sort עם שני מפתחות: { studentsCount: -1, _id: 1 }.`,
    explain:`Collection: students · aggregate.
1. $group: קבוצה לכל עיר. ‏"$city" עם $ פירושו הערך של השדה, ובלי $ זו סתם מחרוזת.
2. $sort: קודם לפי הספירה בסדר יורד, ובתיקו לפי שם העיר (שנמצא עכשיו ב-_id) בסדר עולה.
3. $project: משנה את השם של _id ל-city.
התוצאה: Tel Aviv 3, Haifa 2, Jerusalem 2, Beer Sheva 1, Holon 1, Ramat Gan 1.
ב-SQL: SELECT city, COUNT(*) FROM students GROUP BY city ORDER BY COUNT(*) DESC, city;`,
    source:`דף פקודות MongoDB — Aggregation ($group, $sort)` },

  { id:'ma-group-sum', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$group + $sum של שדה — חשבו את סך נקודות הזכות (credits) של הקורסים בכל מחלקה.
התוצאה: department, totalCredits (בלי _id).`,
    check:'result',
    solution:`db.courses.aggregate([
  { $group: { _id: "$department", totalCredits: { $sum: "$credits" } } },
  { $project: { _id: 0, department: "$_id", totalCredits: 1 } }
])`,
    alt:[`db.courses.aggregate([ { $group: { _id: "$department", totalCredits: { $sum: "$credits" } } } ])`],
    hint:`{ $sum: "$credits" } מסכם ערכים, ו-{ $sum: 1 } סופר מסמכים.`,
    explain:`Collection: courses · aggregate.
1. $group: קבוצה לכל מחלקה. ‏{ $sum: "$credits" } מחבר את ערכי השדה, כמו SUM(credits).
2. $project: מציג department ו-totalCredits.
אל תתבלבלו: ‏{ $sum: 1 } מוסיף 1 על כל מסמך (ספירה), ו-{ $sum: "$credits" } מסכם את הערכים (סכום).
התוצאה: Information Systems 11, Data Science 3, Business 5.`,
    source:`דף פקודות MongoDB — פונקציות חישוב בתוך group ($sum)` },

  { id:'ma-group-null', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$group עם _id: null — חשבו סטטיסטיקה כללית על כל ההגשות שקיבלו ציון: ממוצע, ציון מקסימלי, ציון מינימלי ומספר ההגשות שנבדקו.
התוצאה: מסמך אחד עם averageGrade, maxGrade, minGrade, gradedCount (בלי _id, בלי עיגול).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: {
      _id: null,
      averageGrade: { $avg: "$grade" },
      maxGrade: { $max: "$grade" },
      minGrade: { $min: "$grade" },
      gradedCount: { $sum: 1 }
  } },
  { $project: { _id: 0 } }
])`,
    alt:[`db.submissions.aggregate([
  { $group: { _id: null, averageGrade: { $avg: "$grade" }, maxGrade: { $max: "$grade" },
              minGrade: { $min: "$grade" }, gradedCount: { $sum: { $cond: [ { $eq: ["$grade", null] }, 0, 1 ] } } } },
  { $project: { _id: 0 } }
])`],
    hint:`_id: null = קבוצה אחת לכל המסמכים, כמו פונקציות צבירה בלי GROUP BY.`,
    explain:`Collection: submissions · aggregate.
1. $match: רק הגשות שנבדקו, ולכן $sum: 1 סופר רק אותן.
2. $group עם _id: null: כל המסמכים בקבוצה אחת, וכמה Accumulators במעבר אחד.
3. $project: { _id: 0 } מסתיר את ה-_id (שערכו null).
התוצאה: averageGrade ≈ 81.86, maxGrade 100, minGrade 60, gradedCount 14.
ב-SQL: SELECT AVG(grade), MAX(grade), MIN(grade), COUNT(grade) FROM submissions;`,
    source:`דף פקודות MongoDB — פונקציות חישוב בתוך group ($avg/$max/$min)` },

  { id:'ma-round', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`$round — חשבו לכל מרצה את ממוצע הציונים בכל הקורסים שהוא מלמד (ממוצע של כל הציונים יחד, לא ממוצע של ממוצעי הקורסים; רק הגשות עם ציון), מעוגל לספרה אחת אחרי הנקודה.
התוצאה: lecturerName (שם פרטי, רווח ושם משפחה), averageGrade (בלי _id). מרצה שאין לו ציונים לא יופיע.`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $group: { _id: "$course.lecturerId", averageGrade: { $avg: "$grade" } } },
  { $lookup: { from: "lecturers", localField: "_id", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: {
      _id: 0,
      lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] },
      averageGrade: { $round: ["$averageGrade", 1] }
  } }
])`,
    hint:`submissions ← $lookup courses (בשביל lecturerId) ← $group לפי "$course.lecturerId" ← $lookup lecturers ← $project עם $round: [ערך, 1].`,
    explain:`Collection: submissions · aggregate.
1. $match: רק ציונים קיימים.
2. $lookup + $unwind ל-courses: להגשה יש courseId, אבל את המרצה מוצאים רק דרך הקורס (lecturerId).
3. $group: לפי "$course.lecturerId", כלומר לפי שדה מתוך המסמך שצורף.
4. $lookup + $unwind ל-lecturers: בשביל שם המרצה.
5. $project: ‏$concat לשם, ו-{ $round: ["$averageGrade", 1] } לעיגול לספרה אחת.
התוצאה: Moshe Cohen 80.3, Rina Levi 91, Avi Peretz 80.3. ‏Dana Klein לא מלמדת אף קורס ולכן לא מופיעה.
שימו לב: כש-$round מעגל ערך שנמצא בדיוק באמצע (5), הוא מעגל אל הספרה הזוגית (Round Half to Even). ‏ROUND ב-SQL Server מעגל במקרה כזה כלפי מעלה.`,
    source:`Aggregation — $round + $lookup בשני שלבים` },

  { id:'ma-size', set:'agg', topic:'array', dataset:'college2',
    prompt:`$project עם $size ו-$sum על מערך — לכל קורס הציגו כמה שיעורים יש בו וכמה דקות הם נמשכים בסך הכל.
התוצאה: courseName, lessonsCount, totalMinutes (בלי _id, כל 6 הקורסים).`,
    check:'result',
    solution:`db.courses.aggregate([
  { $project: {
      _id: 0,
      courseName: 1,
      lessonsCount: { $size: "$lessons" },
      totalMinutes: { $sum: "$lessons.duration" }
  } }
])`,
    alt:[`db.courses.aggregate([
  { $addFields: { lessonsCount: { $size: "$lessons" }, totalMinutes: { $sum: "$lessons.duration" } } },
  { $project: { _id: 0, courseName: 1, lessonsCount: 1, totalMinutes: 1 } }
])`,
         `db.courses.aggregate([
  { $set: { lessonsCount: { $size: "$lessons" }, totalMinutes: { $sum: "$lessons.duration" } } },
  { $project: { _id: 0, courseName: 1, lessonsCount: 1, totalMinutes: 1 } }
])`],
    hint:`"$lessons.duration" מחזיר מערך של כל המשכים, ו-$sum מחבר אותו.`,
    explain:`Collection: courses · aggregate, עם שלב אחד.
‏$project יכול גם ליצור שדות מחושבים:
• { $size: "$lessons" } סופר את האיברים במערך.
• "$lessons.duration" מחזיר מערך של ערכי duration, למשל [90,90,120,60], ו-$sum בתוך $project מחבר אותו.
‏$addFields (או השם החלופי $set) מוסיף שדות ומשאיר את כל השאר.
אין צורך ב-$unwind, ולכן גם Cyber Security נשאר בתוצאה עם 0 ו-0.
התוצאה: MongoDB 4/360, SQL Server 3/300, Python 2/210, Marketing 1/90, Statistics 3/300, Cyber Security 0/0.`,
    source:`דף פקודות MongoDB — Aggregation ($project, $addFields, $set)` },

  { id:'ma-unwind', set:'agg', topic:'array', dataset:'college2',
    prompt:`$unwind — הציגו את כל השיעורים שנמשכים 120 דקות או יותר, מכל הקורסים.
התוצאה: courseName, title, duration (בלי _id).`,
    check:'result',
    solution:`db.courses.aggregate([
  { $unwind: "$lessons" },
  { $match: { "lessons.duration": { $gte: 120 } } },
  { $project: { _id: 0, courseName: 1, title: "$lessons.title", duration: "$lessons.duration" } }
])`,
    hint:`$unwind: "$lessons" יוצר מסמך נפרד לכל שיעור, ואחריו $match על "lessons.duration".`,
    explain:`Collection: courses · aggregate.
1. $unwind: "$lessons" מפרק את המערך: לקורס עם 4 שיעורים נוצרים 4 מסמכים, ובכל אחד lessons הוא אובייקט אחד ולא מערך.
2. $match: מסנן שיעורים ארוכים.
3. $project: מוציא את title ו-duration לשדות ברמה העליונה.
קורס עם מערך ריק (Cyber Security) נעלם ב-$unwind. כדי להשאיר אותו כותבים { $unwind: { path: "$lessons", preserveNullAndEmptyArrays: true } }.
התוצאה: MongoDB/Aggregation, SQL Server/JOINs, Python/Pandas, Statistics/Regression.`,
    source:`דף פקודות MongoDB — Aggregation ($unwind)` },

  { id:'ma-unwind-group', set:'agg', topic:'array', dataset:'college2',
    prompt:`$unwind + $group — כמה שיעורים יש מכל משך (duration), בכל הקורסים יחד? מיינו לפי המשך בסדר עולה.
התוצאה: duration, lessonsCount (בלי _id).`,
    check:'result',
    solution:`db.courses.aggregate([
  { $unwind: "$lessons" },
  { $group: { _id: "$lessons.duration", lessonsCount: { $sum: 1 } } },
  { $sort: { _id: 1 } },
  { $project: { _id: 0, duration: "$_id", lessonsCount: 1 } }
])`,
    alt:[`db.courses.aggregate([
  { $unwind: "$lessons" },
  { $group: { _id: "$lessons.duration", lessonsCount: { $sum: 1 } } },
  { $project: { _id: 0, duration: "$_id", lessonsCount: 1 } },
  { $sort: { duration: 1 } }
])`],
    hint:`קודם מפרקים את המערך, ואחר כך מקבצים לפי "$lessons.duration".`,
    explain:`Collection: courses · aggregate.
1. $unwind: מסמך לכל שיעור (13 שיעורים).
2. $group: מקבץ לפי משך השיעור וסופר.
3. $sort: לפי המשך בסדר עולה.
4. $project: משנה את השם של _id ל-duration.
התוצאה: 60 דקות: 1, ‏90 דקות: 8, ‏120 דקות: 4.
כך עושים GROUP BY על נתונים ששמורים בתוך מערך מוטמע.`,
    source:`Aggregation — $unwind ואחריו $group` },

  { id:'ma-cond', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$cond — לכל הגשה שקיבלה ציון, הציגו את _id, את grade ושדה result: ‏"Pass" אם הציון 70 ומעלה, אחרת "Fail".
התוצאה: _id, grade, result.`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $project: {
      grade: 1,
      result: { $cond: { if: { $gte: ["$grade", 70] }, then: "Pass", else: "Fail" } }
  } }
])`,
    alt:[`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $project: { grade: 1, result: { $cond: [ { $gte: ["$grade", 70] }, "Pass", "Fail" ] } } }
])`],
    hint:`{ $cond: { if: …, then: …, else: … } }. בתוך ביטוי, השוואה נכתבת כמערך: { $gte: ["$grade", 70] }.`,
    explain:`Collection: submissions · aggregate.
1. $match: בלי ההגשות שלא נבדקו. בהשוואה בתוך ביטוי, null נחשב קטן מכל מספר, ולכן הן היו מקבלות "Fail".
2. $project: ‏$cond הוא ה-CASE WHEN של מונגו. יש לו שתי צורות כתיבה: { if, then, else } או מערך [תנאי, ערך_אם_כן, ערך_אם_לא].
שימו לב: בתוך ביטוי Aggregation, $gte מקבל מערך של שני ערכים ["$grade", 70], ולא את הצורה של find ({ grade: { $gte: 70 } }).
ב-SQL: SELECT id, grade, CASE WHEN grade >= 70 THEN 'Pass' ELSE 'Fail' END AS result FROM submissions WHERE grade IS NOT NULL;`,
    source:`Aggregation — $cond (המקבילה של CASE)` },

  { id:'ma-sum-cond', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$sum + $cond — לכל קורס שיש לו הגשות, ספרו כמה הגשות כבר נבדקו (grade הוא לא null) וכמה ממתינות (grade הוא null).
התוצאה: courseId, gradedCount, pendingCount, בדיוק בשמות האלה (בלי _id). כאן נבדקים גם שמות השדות, כדי שלא יתחלפו בין "נבדקו" ל"ממתינות".`,
    check:'result', compare:'docs',
    solution:`db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      gradedCount: { $sum: { $cond: [ { $eq: ["$grade", null] }, 0, 1 ] } },
      pendingCount: { $sum: { $cond: [ { $eq: ["$grade", null] }, 1, 0 ] } }
  } },
  { $project: { _id: 0, courseId: "$_id", gradedCount: 1, pendingCount: 1 } }
])`,
    alt:[`db.submissions.aggregate([
  { $group: {
      _id: "$courseId",
      gradedCount: { $sum: { $cond: { if: { $ne: ["$grade", null] }, then: 1, else: 0 } } },
      pendingCount: { $sum: { $cond: { if: { $eq: ["$grade", null] }, then: 1, else: 0 } } }
  } },
  { $project: { _id: 0, courseId: "$_id", gradedCount: 1, pendingCount: 1 } }
])`],
    hint:`ספירה מותנית: ‏{ $sum: { $cond: [תנאי, 1, 0] } }.`,
    explain:`Collection: submissions · aggregate.
1. $group: לכל קורס מחשבים שני סכומים. ‏$cond מחזיר 1 או 0 לכל מסמך, ו-$sum מחבר אותם. כך סופרים רק מסמכים שעומדים בתנאי.
2. $project: מעצב את הפלט.
התוצאה: קורס 1: ‏6 נבדקו ו-1 ממתינה, קורס 4: ‏1 ו-1, ושאר הקורסים: כל ההגשות נבדקו.
ב-SQL: SUM(CASE WHEN grade IS NULL THEN 0 ELSE 1 END). אפשר גם COUNT(grade) ל-gradedCount, ו-COUNT(*) - COUNT(grade) ל-pendingCount.`,
    source:`Aggregation — ספירה מותנית ($sum + $cond)` },

  { id:'ma-lookup', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`$lookup בסיסי — הציגו כל קורס עם שם המרצה שלו.
התוצאה: courseName, lecturerName (שם פרטי, רווח ושם משפחה), בלי _id.`,
    check:'result',
    solution:`db.courses.aggregate([
  { $lookup: { from: "lecturers", localField: "lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: {
      _id: 0,
      courseName: 1,
      lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] }
  } }
])`,
    hint:`from: "lecturers", localField: "lecturerId", foreignField: "_id".`,
    explain:`Collection: courses · aggregate.
1. $lookup: ארבעה פרמטרים. ‏from הוא ה-Collection שמצרפים. ‏localField הוא השדה אצלנו (lecturerId). ‏foreignField הוא השדה שם (_id). ‏as הוא שם המערך שייווצר.
2. $unwind: הופך את המערך לאובייקט, כי לכל קורס יש מרצה אחד.
3. $project: מחבר את השם המלא.
במונגו אמיתי lecturerId הוא ObjectId, וגם _id של המרצה הוא ObjectId. ‏$lookup עובד רק כששני הצדדים מאותו סוג.
ב-SQL: SELECT c.courseName, l.firstName + ' ' + l.lastName FROM courses c JOIN lecturers l ON c.lecturerId = l.id;`,
    source:`דף פקודות MongoDB — $lookup (כמו JOIN)` },

  { id:'ma-lookup-sub', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`$match + $lookup — הציגו את כל ההגשות של David Levi (studentId: 1) עם שם המטלה.
התוצאה: title (שם המטלה), grade (בלי _id).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $match: { studentId: 1 } },
  { $lookup: { from: "assignments", localField: "assignmentId", foreignField: "_id", as: "assignment" } },
  { $unwind: "$assignment" },
  { $project: { _id: 0, title: "$assignment.title", grade: 1 } }
])`,
    hint:`שמים את $match לפני ה-$lookup, כך שהחיבור ירוץ רק על ההגשות של David.`,
    explain:`Collection: submissions · aggregate.
1. $match: קודם מסננים את ההגשות של סטודנט 1. כדאי לסנן כמה שיותר מוקדם, כי אז השלבים הבאים מטפלים בפחות מסמכים.
2. $lookup + $unwind: מביא את מסמך המטלה.
3. $project: שם המטלה והציון.
התוצאה: Aggregation Project 95, CRUD Exercise 80, Joins Homework 88, Pandas Lab 92.`,
    source:`Aggregation — $match לפני $lookup` },

  { id:'ma-anti-asg', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`Anti-Join — מצאו את כל המטלות שאין להן אף הגשה. הציגו את מסמכי המטלות (אם בוחרים להציג רק חלק מהשדות, צריך להשאיר את _id).`,
    check:'result', compare:'ids',
    solution:`db.assignments.aggregate([
  { $lookup: { from: "submissions", localField: "_id", foreignField: "assignmentId", as: "submissions" } },
  { $match: { submissions: { $size: 0 } } }
])`,
    alt:[`db.assignments.find({ _id: { $nin: db.submissions.distinct("assignmentId") } })`,
         `db.assignments.aggregate([
  { $lookup: { from: "submissions", localField: "_id", foreignField: "assignmentId", as: "subs" } },
  { $match: { "subs.0": { $exists: false } } },
  { $project: { subs: 0 } }
])`],
    hint:`מתחילים מ-assignments, עושים $lookup ל-submissions, ומסננים מערך ריק.`,
    explain:`Collection: assignments · aggregate.
1. $lookup: לכל מטלה נוצר מערך ההגשות שלה.
2. $match: { submissions: { $size: 0 } } משאיר מטלות בלי הגשות.
התוצאה: Stored Procedures (_id 7).
ב-SQL: SELECT a.* FROM assignments a LEFT JOIN submissions s ON a.id = s.assignmentId WHERE s.id IS NULL;
(זו שאלה 5 ב"עבודת ישור קו")`,
    source:`עבודת ישור קו — שאלה 5 (גרסת MongoDB)` },

  { id:'ma-anti-lect', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`Anti-Join — מצאו את המרצים שלא מלמדים אף קורס. הציגו את מסמכי המרצים (אם בוחרים להציג רק חלק מהשדות, צריך להשאיר את _id).`,
    check:'result', compare:'ids',
    solution:`db.lecturers.aggregate([
  { $lookup: { from: "courses", localField: "_id", foreignField: "lecturerId", as: "courses" } },
  { $match: { courses: { $size: 0 } } }
])`,
    alt:[`db.lecturers.find({ _id: { $nin: db.courses.distinct("lecturerId") } })`],
    hint:`אותה תבנית: ‏$lookup ← ‏$match על { $size: 0 }.`,
    explain:`Collection: lecturers · aggregate.
1. $lookup: לכל מרצה מערך של הקורסים שבהם lecturerId שווה ל-_id שלו.
2. $match: מערך ריק פירושו מרצה בלי קורסים.
התוצאה: Dana Klein.
מתחילים תמיד מה-Collection של הישויות שרוצים לקבל בתוצאה, כאן המרצים.`,
    source:`Aggregation — Anti-Join` },

  { id:'ma-zero', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`כולל קורסים ריקים — הציגו לכל קורס את מספר ההרשמות שלו (כל הסטטוסים), כולל קורסים עם 0.
התוצאה: courseName, studentsCount (בלי _id, כל 6 הקורסים).`,
    check:'result',
    solution:`db.courses.aggregate([
  { $lookup: { from: "enrollments", localField: "_id", foreignField: "courseId", as: "enrollments" } },
  { $project: { _id: 0, courseName: 1, studentsCount: { $size: "$enrollments" } } }
])`,
    hint:`מתחילים מ-courses ולא מ-enrollments.`,
    explain:`Collection: courses · aggregate.
1. $lookup: ‏LEFT JOIN, ולכן קורס בלי הרשמות מקבל מערך ריק ולא נעלם.
2. $project: ‏$size של המערך הוא מספר ההרשמות.
ההבדל מתרגיל 6 בעבודה: שם התחלנו מ-enrollments עם $group, ולכן Cyber Security לא הופיע. כאן הוא מופיע עם 0.
ב-SQL: SELECT c.courseName, COUNT(e.id) FROM courses c LEFT JOIN enrollments e ON c.id = e.courseId GROUP BY c.courseName; (‏COUNT(e.id) ולא COUNT(*), אחרת יתקבל 1).`,
    source:`Aggregation — LEFT JOIN עם ספירה` },

  { id:'ma-having', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`HAVING — מצאו את הקורסים שממוצע הציונים בהם גבוה מ-80.
התוצאה: courseId, averageGrade (בלי _id, בלי עיגול).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $match: { averageGrade: { $gt: 80 } } },
  { $project: { _id: 0, courseId: "$_id", averageGrade: 1 } }
])`,
    alt:[`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $match: { averageGrade: { $gt: 80 } } }
])`],
    hint:`$match שבא אחרי $group מסנן קבוצות, ולכן הוא ה-HAVING.`,
    explain:`Collection: submissions · aggregate.
1. $group: ממוצע לכל קורס.
2. $match: מסנן לפי השדה המחושב averageGrade. במונגו אין מילה נפרדת ל-HAVING: ‏$match לפני $group הוא WHERE, ו-$match אחרי $group הוא HAVING.
3. $project: מעצב את הפלט.
התוצאה: קורס 1 (83), קורס 3 (91), קורס 5 (85.5).
ב-SQL: SELECT courseId, AVG(grade) FROM submissions GROUP BY courseId HAVING AVG(grade) > 80;`,
    source:`Aggregation — $match אחרי $group (HAVING)` },

  { id:'ma-docx1', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`עבודת ישור קו, שאלה 1 — הציגו את שמות הסטודנטים, שמות הקורסים שהם רשומים אליהם ותאריך ההרשמה, רק להרשמות פעילות.
התוצאה: firstName, lastName, courseName, enrollmentDate (בלי _id).`,
    check:'result',
    solution:`db.enrollments.aggregate([
  { $match: { status: "Active" } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $project: {
      _id: 0,
      firstName: "$student.firstName",
      lastName: "$student.lastName",
      courseName: "$course.courseName",
      enrollmentDate: 1
  } }
])`,
    hint:`$match על status לפני ה-$lookup-ים. בלי הסינון יתקבלו 15 שורות במקום 13.`,
    explain:`Collection: enrollments · aggregate.
1. $match: { status: "Active" }. זה הסינון שהכי קל לשכוח בשאלה הזו.
2. $lookup + $unwind ל-students.
3. $lookup + $unwind ל-courses.
4. $project: לוקח את השדות מתוך האובייקטים שצורפו.
התוצאה: 13 הרשמות. חסרות Noa ב-Marketing ו-Eyal ב-Statistics, שתיהן Inactive.
ב-SQL: SELECT s.firstName, s.lastName, c.courseName, e.enrollmentDate FROM enrollments e JOIN students s ON e.studentId = s.id JOIN courses c ON e.courseId = c.id WHERE e.status = 'Active';`,
    source:`עבודת ישור קו — שאלה 1 (גרסת MongoDB)` },

  { id:'ma-docx3', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`עבודת ישור קו, שאלה 3 — מצאו את הסטודנטים שרשומים ליותר משני קורסים פעילים.
התוצאה: firstName, lastName, activeCourses (בלי _id).`,
    check:'result',
    solution:`db.enrollments.aggregate([
  { $match: { status: "Active" } },
  { $group: { _id: "$studentId", activeCourses: { $sum: 1 } } },
  { $match: { activeCourses: { $gt: 2 } } },
  { $lookup: { from: "students", localField: "_id", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $project: { _id: 0, firstName: "$student.firstName", lastName: "$student.lastName", activeCourses: 1 } }
])`,
    hint:`$match (Active) ← ‏$group ← ‏$match (גדול מ-2) ← ‏$lookup ← ‏$unwind ← ‏$project.`,
    explain:`Collection: enrollments · aggregate.
1. $match לפני $group: סינון שורות, כמו WHERE status = 'Active'.
2. $group: ספירת הרשמות פעילות לכל סטודנט.
3. $match אחרי $group: סינון קבוצות, כמו HAVING COUNT(*) > 2. "יותר משני קורסים" זה $gt: 2.
4. $lookup + $unwind + $project: מביאים את שם הסטודנט.
התוצאה: David Levi 3, Itai Friedman 3.
ב-SQL: SELECT s.firstName, s.lastName, COUNT(*) FROM enrollments e JOIN students s ON e.studentId = s.id WHERE e.status = 'Active' GROUP BY s.id, s.firstName, s.lastName HAVING COUNT(*) > 2;`,
    source:`עבודת ישור קו — שאלה 3 (גרסת MongoDB)` },

  { id:'ma-docx4', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`עבודת ישור קו, שאלה 4 — הציגו את כל ההגשות עם שם הסטודנט, שם הקורס ושם המרצה.
התוצאה: studentName, courseName, lecturerName (שמות מלאים, עם רווח בין השם הפרטי לשם המשפחה), grade (בלי _id, כל 16 ההגשות).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "lecturers", localField: "course.lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: {
      _id: 0,
      studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
      courseName: "$course.courseName",
      lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] },
      grade: 1
  } }
])`,
    hint:`שלושה $lookup. השלישי משתמש ב-localField: "course.lecturerId", שדה מתוך הקורס שצירפנו בשלב הקודם.`,
    explain:`Collection: submissions · aggregate.
1. $lookup + $unwind ל-students: שם הסטודנט.
2. $lookup + $unwind ל-courses: שם הקורס, וגם lecturerId.
3. $lookup + $unwind ל-lecturers: ה-localField הוא "course.lecturerId". אפשר לחבר לפי שדה שהגיע מ-$lookup קודם, וזה JOIN בשרשרת.
4. $project: שלושה שמות והציון.
בשרשרת $lookup הסדר חשוב: אי אפשר להגיע למרצה לפני שצירפנו את הקורס.
במסמך המקורי של עבודת ישור קו לטבלת submissions ב-SQL אין courseId, ולכן שם עוברים דרך assignments: ‏submissions → assignments → courses → lecturers. בנתוני האתר יש courseId בשתי הגרסאות.`,
    source:`עבודת ישור קו — שאלה 4 (גרסת MongoDB)` },

  { id:'ma-docx6', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`עבודת ישור קו, שאלה 6 — הציגו את ממוצע הציונים בכל קורס, יחד עם שם הקורס ושם המרצה (רק קורסים שיש בהם ציונים).
התוצאה: courseName, lecturerName (שם מלא), averageGrade (בלי _id, בלי עיגול).`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $match: { grade: { $ne: null } } },
  { $group: { _id: "$courseId", averageGrade: { $avg: "$grade" } } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $unwind: "$course" },
  { $lookup: { from: "lecturers", localField: "course.lecturerId", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: {
      _id: 0,
      courseName: "$course.courseName",
      lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] },
      averageGrade: 1
  } }
])`,
    alt:[`db.submissions.aggregate([
  { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "c" } },
  { $unwind: "$c" },
  { $lookup: { from: "lecturers", localField: "c.lecturerId", foreignField: "_id", as: "l" } },
  { $unwind: "$l" },
  { $group: { _id: { course: "$c.courseName", lecturer: { $concat: ["$l.firstName", " ", "$l.lastName"] } }, averageGrade: { $avg: "$grade" } } }
])`],
    hint:`קודם $group לפי courseId (ממוצע), ואחר כך שני $lookup: לקורס, ומשם למרצה.`,
    explain:`Collection: submissions · aggregate.
1. $match + $group: ממוצע לכל קורס.
2. $lookup + $unwind ל-courses: שם הקורס ו-lecturerId.
3. $lookup + $unwind ל-lecturers: שם המרצה.
4. $project: מעצב את הפלט.
יעילות: מקבצים קודם (נשארים 5 מסמכים) ורק אחר כך מצרפים. ב-alt מצרפים לכל 16 ההגשות ורק אז מקבצים.
התוצאה: MongoDB / Moshe Cohen 83, SQL Server / Moshe Cohen 75, Python / Rina Levi 91, Marketing / Avi Peretz 70, Statistics / Avi Peretz 85.5.
ב-SQL: … GROUP BY c.courseName, l.firstName, l.lastName. כל עמודה ב-SELECT שאינה פונקציית צבירה חייבת להופיע ב-GROUP BY.`,
    source:`עבודת ישור קו — שאלה 6 (גרסת MongoDB)` },

  { id:'ma-push', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$push כ-Accumulator — לכל מרצה שמלמד לפחות קורס אחד, הציגו את רשימת שמות הקורסים שלו.
התוצאה: lecturerName (שם מלא), courses (מערך של שמות קורסים), בלי _id.`,
    check:'result',
    solution:`db.courses.aggregate([
  { $group: { _id: "$lecturerId", courses: { $push: "$courseName" } } },
  { $lookup: { from: "lecturers", localField: "_id", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: {
      _id: 0,
      lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] },
      courses: 1
  } }
])`,
    alt:[`db.courses.aggregate([
  { $group: { _id: "$lecturerId", courses: { $addToSet: "$courseName" } } },
  { $lookup: { from: "lecturers", localField: "_id", foreignField: "_id", as: "lecturer" } },
  { $unwind: "$lecturer" },
  { $project: { _id: 0, lecturerName: { $concat: ["$lecturer.firstName", " ", "$lecturer.lastName"] }, courses: 1 } }
])`],
    hint:`בתוך $group, ‏{ $push: "$courseName" } אוסף את הערכים של כל קבוצה למערך.`,
    explain:`Collection: courses · aggregate.
1. $group: לפי lecturerId. ‏$push יוצר מערך עם כל שמות הקורסים בקבוצה. ‏$addToSet עושה אותו דבר בלי כפילויות.
2. $lookup + $unwind: שם המרצה.
3. $project: מעצב את הפלט.
התוצאה: Moshe Cohen [MongoDB, SQL Server], Rina Levi [Python, Cyber Security], Avi Peretz [Marketing, Statistics].
ב-SQL Server: STRING_AGG(courseName, ', '). זה מחזיר מחרוזת אחת ולא מערך.`,
    source:`דף פקודות MongoDB — פונקציות חישוב בתוך group ($push)` },

  { id:'ma-addtoset', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$addToSet כ-Accumulator — לכל שנת הרשמה (registrationYear) הציגו את הערים השונות שמהן הגיעו הסטודנטים, בלי כפילויות. מיינו לפי השנה בסדר עולה.
התוצאה: registrationYear, cities (מערך), בלי _id.`,
    check:'result',
    solution:`db.students.aggregate([
  { $group: { _id: "$registrationYear", cities: { $addToSet: "$city" } } },
  { $sort: { _id: 1 } },
  { $project: { _id: 0, registrationYear: "$_id", cities: 1 } }
])`,
    hint:`$addToSet בתוך $group אוסף ערכים ייחודיים.`,
    explain:`Collection: students · aggregate.
1. $group: לפי שנה. ‏$addToSet מוסיף עיר למערך רק אם היא עוד לא שם.
2. $sort: לפי השנה בסדר עולה.
3. $project: משנה את השם של _id.
דוגמה: ב-2025 נרשמו שתי סטודנטיות מחיפה (Noa ו-Shira), אבל Haifa מופיעה פעם אחת. עם $push היא הייתה מופיעה פעמיים.
התוצאה: 2022 [Tel Aviv], 2023 [Jerusalem], 2024 [Tel Aviv, Beer Sheva, Ramat Gan], 2025 [Haifa, Tel Aviv, Holon].
‏$addToSet לא מבטיח סדר בתוך המערך, ולכן הבדיקה כאן לא תלויה בסדר הערים.`,
    source:`דף פקודות MongoDB — פונקציות חישוב בתוך group ($addToSet)` },

  { id:'ma-first-last', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$first / $last — לכל קורס שיש בו הרשמות, מצאו מי הסטודנט שנרשם ראשון ומי נרשם אחרון (לפי enrollmentDate, כל ההרשמות).
התוצאה: courseId, firstStudentId, lastStudentId, בדיוק בשמות האלה (בלי _id). כאן נבדקים גם שמות השדות, כדי שלא יתחלפו "ראשון" ו"אחרון".`,
    check:'result', compare:'docs', ordered:false,
    solution:`db.enrollments.aggregate([
  { $sort: { enrollmentDate: 1 } },
  { $group: {
      _id: "$courseId",
      firstStudentId: { $first: "$studentId" },
      lastStudentId: { $last: "$studentId" }
  } },
  { $project: { _id: 0, courseId: "$_id", firstStudentId: 1, lastStudentId: 1 } }
])`,
    alt:[`db.enrollments.aggregate([
  { $sort: { enrollmentDate: -1 } },
  { $group: { _id: "$courseId", firstStudentId: { $last: "$studentId" }, lastStudentId: { $first: "$studentId" } } },
  { $project: { _id: 0, courseId: "$_id", firstStudentId: 1, lastStudentId: 1 } }
])`],
    hint:`קודם $sort לפי enrollmentDate בסדר עולה, ואז $group עם { $first: "$studentId" } ו-{ $last: "$studentId" }.`,
    explain:`Collection: enrollments · aggregate.
1. $sort: { enrollmentDate: 1 } מסדר את ההרשמות מהמוקדמת למאוחרת. בלי המיון, "ראשון" ו"אחרון" הם פשוט לפי הסדר שבו המסמכים שמורים, ולכן אין להם משמעות.
2. $group: לפי courseId. ‏$first לוקח את studentId מהמסמך הראשון בכל קבוצה, ו-$last מהאחרון.
3. $project: מעצב את הפלט.
התוצאה: קורס 1: ‏1 ראשון ו-8 אחרון, קורס 2: ‏1 ו-7, קורס 3: ‏1 ו-4, קורס 4: ‏2 ו-6, קורס 5: ‏5 ו-9.
‏$min ו-$max על enrollmentDate היו נותנים את התאריכים עצמם, אבל לא את הסטודנט. בשביל זה צריך $sort עם $first ו-$last.`,
    source:`דף פקודות MongoDB — פונקציות חישוב בתוך group ($first, $last)` },

  { id:'ma-sort-limit', set:'agg', topic:'sort', dataset:'college2',
    prompt:`$sort + $limit — הציגו את 3 ההגשות האחרונות לפי תאריך ההגשה, מהמאוחרת למוקדמת.
התוצאה: _id, studentId, submissionDate.`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $sort: { submissionDate: -1 } },
  { $limit: 3 },
  { $project: { studentId: 1, submissionDate: 1 } }
])`,
    alt:[`db.submissions.find({}, { studentId: 1, submissionDate: 1 }).sort({ submissionDate: -1 }).limit(3)`],
    hint:`מיון לפי תאריך בסדר יורד ({ submissionDate: -1 }), ואחריו $limit: 3.`,
    explain:`Collection: submissions · aggregate (אפשר גם find).
1. $sort: { submissionDate: -1 } ממיין את התאריכים מהחדש לישן.
2. $limit: 3.
3. $project: ‏_id מוצג כברירת מחדל, ומוסיפים studentId ו-submissionDate.
ב-Aggregation סדר השלבים קובע: $limit לפני $sort היה לוקח 3 מסמכים שרירותיים ורק אז ממיין אותם.
התוצאה: הגשה 8 (30.12), הגשה 13 (25.12), הגשה 5 (21.12).`,
    source:`דף פקודות MongoDB — Aggregation ($sort, $limit)` },

  { id:'ma-replaceroot', set:'agg', topic:'lookup', dataset:'college2',
    prompt:`$replaceRoot — הציגו את מסמכי הסטודנטים (כמסמך ראשי, בלי עטיפת ההרשמה) של כל מי שרשום כ-Active לקורס MongoDB (courseId: 1).`,
    check:'result', compare:'ids',
    solution:`db.enrollments.aggregate([
  { $match: { courseId: 1, status: "Active" } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $replaceRoot: { newRoot: "$student" } }
])`,
    alt:[`db.enrollments.aggregate([
  { $match: { courseId: 1, status: "Active" } },
  { $lookup: { from: "students", localField: "studentId", foreignField: "_id", as: "student" } },
  { $unwind: "$student" },
  { $replaceWith: "$student" }
])`,
         `db.students.find({ _id: { $in: db.enrollments.distinct("studentId", { courseId: 1, status: "Active" }) } })`],
    hint:`אחרי $lookup ו-$unwind, ‏{ $replaceRoot: { newRoot: "$student" } } הופך את המסמך המוטמע למסמך הראשי.`,
    explain:`Collection: enrollments · aggregate.
1. $match: הרשמות פעילות לקורס 1.
2. $lookup + $unwind: מצרף את מסמך הסטודנט.
3. $replaceRoot: מחליף את כל המסמך (ההרשמה) בתת-המסמך student, ולכן התוצאה נראית כמו מסמכי students רגילים. ‏$replaceWith: "$student" הוא כתיב מקוצר לאותו דבר.
התוצאה: David, Noa, Maya, Itai, Tamar.
ב-SQL: SELECT s.* FROM enrollments e JOIN students s ON e.studentId = s.id WHERE e.courseId = 1 AND e.status = 'Active';`,
    source:`דף פקודות MongoDB — Aggregation ($replaceRoot, $replaceWith)` },

  { id:'ma-facet', set:'agg', topic:'aggregate', dataset:'college2',
    prompt:`$facet — בפקודת aggregate אחת על submissions, החזירו שני "דוחות" במקביל:
byStatus: מספר ההגשות לכל status (השדות status, count).
topGrades: שלוש ההגשות עם הציון הגבוה ביותר (השדות _id, grade).
התוצאה: מסמך אחד עם שני השדות byStatus ו-topGrades.`,
    check:'result',
    solution:`db.submissions.aggregate([
  { $facet: {
      byStatus: [
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { _id: 0, status: "$_id", count: 1 } }
      ],
      topGrades: [
        { $match: { grade: { $ne: null } } },
        { $sort: { grade: -1 } },
        { $limit: 3 },
        { $project: { grade: 1 } }
      ]
  } }
])`,
    alt:[`db.submissions.aggregate([
  { $facet: {
      byStatus: [ { $group: { _id: "$status", count: { $count: {} } } } ],
      topGrades: [ { $sort: { grade: -1 } }, { $limit: 3 }, { $project: { _id: 1, grade: 1 } } ]
  } }
])`],
    hint:`{ $facet: { שם1: [ שלבים... ], שם2: [ שלבים... ] } }. כל שם מקבל Pipeline משלו.`,
    explain:`Collection: submissions · aggregate עם שלב אחד, $facet.
‏$facet מריץ כמה Pipelines על אותם מסמכים, וכל Pipeline מחזיר מערך בשדה משלו. כך מקבלים כמה סיכומים בבת אחת, בלי לקרוא את ה-Collection כמה פעמים. זה שימושי למשל בדשבורד.
• byStatus: ‏$group לפי status וספירה, ואחריו $project שמשנה את השם של _id.
• topGrades: ‏$match (בלי הגשות שלא נבדקו), ‏$sort יורד, ‏$limit: 3 ו-$project.
התוצאה: byStatus: Graded 14, ‏Submitted 2. ‏topGrades: הגשה 13 (100), הגשה 1 (95), הגשה 4 (92).
בתוך $facet אפשר להשתמש כמעט בכל שלב, חוץ מ-$out, ‏$merge ו-$facet עצמו.`,
    source:`דף פקודות MongoDB — Aggregation ($facet)` },
];
