/* ============================================================
   EXAM2BANK — בנק תרגול לחלק ב׳ של מבחן 3964 (SQL + NoSQL)
   45 שאלות, כל אחת עם פתרון SQL ופתרון MongoDB שהורצו ואומתו
   על נתוני exam2-data.js (scratchpad/newexam/verify-bank.js).
   kind:'select' → משווים את שורות התוצאה.
   kind:'state'  → משווים את מצב הטבלה אחרי הפקודה (stateTable).
   cols = סדר העמודות של ה-SQL, לצורך מיפוי מסמכי המונגו לשורות.
   ============================================================ */
window.EXAM2BANK = (function(){
'use strict';
const Q = [];
const add = o => Q.push(o);

/* ---------- filter-sort ---------- */
add({ id:'B-01', pattern:'filter-sort', difficulty:1, kind:'select',
  cols:['studentId','name','email'],
  q:'הציגו את כל הסטודנטים השייכים למחלקה D10 — מזהה הסטודנט, שמו והאימייל שלו. מיינו לפי שם הסטודנט בסדר עולה.',
  keywords:'"השייכים למחלקה D10" ← תנאי שוויון אחד ב-WHERE. "מיינו לפי השם בסדר עולה" ← ORDER BY אחד, עולה. אין צירוף ואין קיבוץ.',
  sql:`SELECT studentId, name, email\nFROM Students\nWHERE departmentId = 'D10'\nORDER BY name ASC;`,
  mongo:`db.students.find(\n  { departmentId: "D10" },\n  { _id: 0, studentId: 1, name: 1, email: 1 }\n).sort({ name: 1 })`,
  logic:'טבלה אחת בלבד — Students. ה-WHERE מסנן את השורות וה-ORDER BY קובע את הסדר. במונגו הארגומנט הראשון של find הוא הפילטר והשני הוא ה-projection (היטל) שבוחר אילו שדות יחזרו, בדיוק כמו רשימת העמודות אחרי SELECT. את ה-_id צריך לכבות במפורש כי מונגו מחזיר אותו כברירת מחדל.',
  trap:'שכחת _id: 0 ב-projection — התוצאה תכלול עמודה שלא התבקשה. מלכודת שנייה: במונגו ברירת המחדל של sort היא לא "עולה" אלא "מה שתכתוב" — 1 זה עולה ו-1- זה יורד, ואין ערך ברירת מחדל.',
  compare:'כששולפים מאוסף אחד בלי צירוף, ההבדל בין הגישות הוא תחבירי בלבד — WHERE/ORDER BY מול find/.sort().' });

add({ id:'B-02', pattern:'filter-sort', difficulty:2, kind:'select',
  cols:['offeringId','courseId','capacity'],
  q:'הציגו את מחזורי הקורס של סמסטר 2026A שהקיבולת שלהם 30 ומעלה — מזהה המחזור, מזהה הקורס והקיבולת. מיינו לפי הקיבולת בסדר יורד, ובתוך קיבולת זהה לפי מזהה המחזור בסדר עולה.',
  keywords:'"30 ומעלה" ← >= ולא >. "ובתוך קיבולת זהה" ← מיון שני, שנכנס לתוקף רק בתיקו.',
  sql:`SELECT offeringId, courseId, capacity\nFROM CourseOfferings\nWHERE semester = '2026A' AND capacity >= 30\nORDER BY capacity DESC, offeringId ASC;`,
  mongo:`db.courseOfferings.find(\n  { semester: "2026A", capacity: { $gte: 30 } },\n  { _id: 0, offeringId: 1, courseId: 1, capacity: 1 }\n).sort({ capacity: -1, offeringId: 1 })`,
  logic:'שני תנאים ב-WHERE מחוברים ב-AND; במונגו שני שדות באותו אובייקט פילטר הם AND אוטומטי. המיון הראשון יורד על הקיבולת, והמיון השני עולה על מזהה המחזור כדי שהסדר יהיה חד-משמעי — בנתונים יש שלושה מחזורים עם קיבולת 30 בדיוק.',
  trap:'כתיבת capacity > 30 במקום >= 30 מוציאה שלושה מחזורים. מלכודת שנייה: בלי המיון השני הסדר בין שלושת המחזורים בקיבולת 30 שרירותי, ושני המנועים עשויים להחזיר אותו אחרת.',
  compare:'הפילטר במונגו מתורגם מילה במילה מה-WHERE, אבל כל השוואה שאינה שוויון דורשת אופרטור מפורש ($gte) ולא סימן.' });

/* ---------- join-2 ---------- */
add({ id:'B-03', pattern:'join-2', difficulty:1, kind:'select',
  cols:['name','departmentName'],
  q:'הציגו לכל סטודנט את שמו ואת שם המחלקה שלו. מיינו לפי שם המחלקה ואז לפי שם הסטודנט.',
  keywords:'"שם המחלקה" ← הנתון לא יושב ב-Students אלא ב-Departments, ולכן נדרש צירוף של שתי טבלאות.',
  sql:`SELECT s.name, d.departmentName\nFROM Students s\nJOIN Departments d ON d.departmentId = s.departmentId\nORDER BY d.departmentName ASC, s.name ASC;`,
  mongo:`db.students.aggregate([\n  { $lookup: { from: "departments", localField: "departmentId", foreignField: "departmentId", as: "d" } },\n  { $unwind: "$d" },\n  { $project: { _id: 0, name: 1, departmentName: "$d.departmentName" } },\n  { $sort: { departmentName: 1, name: 1 } }\n])`,
  logic:'מתחילים מהסטודנטים, כי הם ה"רבים" בקשר. ב-SQL JOUN יחיד על המפתח הזר מספיק. במונגו $lookup מביא את מסמכי המחלקה לתוך מערך בשם d, ולכן אחריו חייב לבוא $unwind כדי לפרוס את המערך בחזרה לשורה שטוחה — ורק אז אפשר להתייחס ל-$d.departmentName.',
  trap:'שכחת $unwind — השדה departmentName יחזור כמערך של ערך אחד ולא כערך בודד, והשורות לא יתאימו לתוצאת ה-SQL. מלכודת שנייה: כיוון הצירוף — localField הוא השדה באוסף שממנו יוצאים (students) ו-foreignField הוא השדה באוסף שאליו מצטרפים.',
  compare:'ב-SQL הצירוף הוא הצהרה אחת שהמנוע מתרגם לתוכנית ביצוע, ואילו במונגו הוא שני שלבים ידניים בצינור — $lookup ואחריו $unwind.' });

add({ id:'B-04', pattern:'join-2', difficulty:2, kind:'select',
  cols:['offeringId','courseId','lecturerName'],
  q:'הציגו את מחזורי הקורס של סמסטר 2026A יחד עם שם המרצה — מזהה המחזור, מזהה הקורס ושם המרצה. מיינו לפי שם המרצה ואז לפי מזהה המחזור.',
  keywords:'"יחד עם שם המרצה" ← צירוף ל-Lecturers. "של סמסטר 2026A" ← הסינון יושב על טבלת המחזורים, ולכן אפשר (ועדיף) לסנן לפני הצירוף.',
  sql:`SELECT o.offeringId, o.courseId, l.name AS lecturerName\nFROM CourseOfferings o\nJOIN Lecturers l ON l.lecturerId = o.lecturerId\nWHERE o.semester = '2026A'\nORDER BY l.name ASC, o.offeringId ASC;`,
  mongo:`db.courseOfferings.aggregate([\n  { $match: { semester: "2026A" } },\n  { $lookup: { from: "lecturers", localField: "lecturerId", foreignField: "lecturerId", as: "l" } },\n  { $unwind: "$l" },\n  { $project: { _id: 0, offeringId: 1, courseId: 1, lecturerName: "$l.name" } },\n  { $sort: { lecturerName: 1, offeringId: 1 } }\n])`,
  logic:'שמים את ה-$match בראש הצינור, לפני ה-$lookup — כך הצירוף רץ על שמונה מחזורים ולא על עשרה. ב-SQL מקום ה-WHERE בטקסט אינו משנה, כי המנוע עצמו מחליט מתי לסנן. ה-AS בשאילתה וה-"$l.name" במונגו עושים את אותו דבר: נותנים שם חדש לעמודה.',
  trap:'מרצה אחד מלמד כמה מחזורים, ולכן שם המרצה חוזר כמה פעמים — זה נכון ולא דורש DISTINCT. מלכודת שנייה: בלי המיון השני, הסדר בין שלושת המחזורים של Efi Propos אינו מוגדר.',
  compare:'במונגו הסדר בצינור הוא גם הסמנטיקה וגם הביצועים — $match לפני $lookup הוא אופטימיזציה שהמתכנת עושה בעצמו, בעוד ש-SQL עושה אותה עבורך.' });

/* ---------- join-3plus ---------- */
add({ id:'B-05', pattern:'join-3plus', difficulty:3, kind:'select',
  cols:['studentName','courseName','lecturerName'],
  q:'הציגו לכל הרשמה בסמסטר 2026A את שם הסטודנט, שם הקורס ושם המרצה. יש להציג כל הרשמה בשורה נפרדת. מיינו לפי שם הסטודנט, ואז שם הקורס, ואז שם המרצה.',
  keywords:'"שם הסטודנט, שם הקורס ושם המרצה" ← שלושה שמות משלוש טבלאות שונות, ואליהן מגיעים דרך CourseOfferings. "כל הרשמה בשורה נפרדת" ← בלי DISTINCT ובלי קיבוץ.',
  sql:`SELECT s.name AS studentName, c.courseName, l.name AS lecturerName\nFROM Enrollments e\nJOIN Students s        ON s.studentId  = e.studentId\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nJOIN Courses c         ON c.courseId   = o.courseId\nJOIN Lecturers l       ON l.lecturerId = o.lecturerId\nWHERE o.semester = '2026A'\nORDER BY s.name ASC, c.courseName ASC, l.name ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $lookup: { from: "courseOfferings", localField: "offeringId", foreignField: "offeringId", as: "off" } },\n  { $unwind: "$off" },\n  { $match: { "off.semester": "2026A" } },\n  { $lookup: { from: "students", localField: "studentId", foreignField: "studentId", as: "st" } },\n  { $unwind: "$st" },\n  { $lookup: { from: "courses", localField: "off.courseId", foreignField: "courseId", as: "crs" } },\n  { $unwind: "$crs" },\n  { $lookup: { from: "lecturers", localField: "off.lecturerId", foreignField: "lecturerId", as: "lec" } },\n  { $unwind: "$lec" },\n  { $project: { _id: 0, studentName: "$st.name", courseName: "$crs.courseName", lecturerName: "$lec.name" } },\n  { $sort: { studentName: 1, courseName: 1, lecturerName: 1 } }\n])`,
  logic:'ההרשמות הן הטבלה המרכזית, וממנה מתפצלים לארבעה כיוונים. הסמסטר והמרצה יושבים על מחזור הקורס ולא על הקורס, ולכן ה-$lookup הראשון חייב להיות ל-courseOfferings — ורק אחריו אפשר לסנן את הסמסטר ולהמשיך דרך off.courseId ו-off.lecturerId.',
  trap:'לחפש את lecturerId בטבלת Courses. המרצה משויך למחזור (CourseOfferings) ולא לקורס — אותו קורס יכול להתנהל אצל שני מרצים שונים באותו סמסטר. מלכודת שנייה: הוספת DISTINCT — S106 נרשם פעמיים לאותו מחזור, והשאלה דורשת במפורש את שתי השורות.',
  compare:'צירוף של חמש טבלאות הוא בשאילתת SQL עוד ארבע שורות, ובמונגו צינור של שמונה שלבים — זה ההבדל המעשי בין מודל טבלאי שנבנה לצירופים ומודל מסמכים שלא.' });

add({ id:'B-06', pattern:'join-3plus', difficulty:3, kind:'select',
  cols:['studentName','examId','examType','courseName','score'],
  q:'הציגו את כל תוצאות הבחינות מסוג Final — שם הסטודנט, מזהה הבחינה, סוג הבחינה, שם הקורס והציון. מיינו לפי הציון בסדר יורד, ואז לפי שם הסטודנט, ואז לפי מזהה הבחינה.',
  keywords:'"מסוג Final" ← הסינון יושב ב-Exams. "שם הקורס" ← מ-Exams דרך CourseOfferings ל-Courses. "שם הסטודנט" ← צירוף נוסף ל-Students.',
  sql:`SELECT s.name AS studentName, x.examId, x.examType, c.courseName, r.score\nFROM ExamResults r\nJOIN Exams x           ON x.examId     = r.examId\nJOIN Students s        ON s.studentId  = r.studentId\nJOIN CourseOfferings o ON o.offeringId = x.offeringId\nJOIN Courses c         ON c.courseId   = o.courseId\nWHERE x.examType = 'Final'\nORDER BY r.score DESC, s.name ASC, x.examId ASC;`,
  mongo:`db.examResults.aggregate([\n  { $lookup: { from: "exams", localField: "examId", foreignField: "examId", as: "ex" } },\n  { $unwind: "$ex" },\n  { $match: { "ex.examType": "Final" } },\n  { $lookup: { from: "students", localField: "studentId", foreignField: "studentId", as: "st" } },\n  { $unwind: "$st" },\n  { $lookup: { from: "courseOfferings", localField: "ex.offeringId", foreignField: "offeringId", as: "off" } },\n  { $unwind: "$off" },\n  { $lookup: { from: "courses", localField: "off.courseId", foreignField: "courseId", as: "crs" } },\n  { $unwind: "$crs" },\n  { $project: { _id: 0, studentName: "$st.name", examId: 1, examType: "$ex.examType", courseName: "$crs.courseName", score: 1 } },\n  { $sort: { score: -1, studentName: 1, examId: 1 } }\n])`,
  logic:'שרשרת של ארבעה צירופים: תוצאה → בחינה → מחזור → קורס, ובמקביל תוצאה → סטודנט. שם הקורס אינו שמור בבחינה, ולכן אין דרך קצרה — חייבים לעבור דרך מחזור הקורס. את סוג הבחינה מסננים מיד אחרי הצירוף הראשון, כדי לצמצם את העבודה בהמשך.',
  trap:'שלושה מיונים נדרשים כאן ולא אחד: יש זוגות של תוצאות עם אותו ציון בדיוק (למשל 85, 72, 68), והסדר ביניהן נקבע לפי שם הסטודנט. מלכודת שנייה: examType מופיע בפלט אף שהוא גם תנאי הסינון — זה לא כפילות אלא דרישת השאלה.',
  compare:'ככל שמספר הישויות בשאלה גדל, פער האורך בין שתי הגישות גדל פי כמה — וזה בדיוק המקום שבו מודל טבלאי מנצח, כל עוד הנתונים אינם מוטמעים יחד.' });

/* ---------- distinct ---------- */
add({ id:'B-07', pattern:'distinct', difficulty:2, kind:'select',
  cols:['studentId'],
  q:'הציגו את מזהי הסטודנטים שיש להם לפחות הרשמה אחת — כל מזהה פעם אחת בלבד. מיינו בסדר עולה.',
  keywords:'"כל מזהה פעם אחת בלבד" ← DISTINCT ב-SQL, $group במונגו. "לפחות הרשמה אחת" ← אין צורך בצירוף, ההרשמות עצמן מכילות את המזהה.',
  sql:`SELECT DISTINCT studentId\nFROM Enrollments\nORDER BY studentId ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $group: { _id: "$studentId" } },\n  { $project: { _id: 0, studentId: "$_id" } },\n  { $sort: { studentId: 1 } }\n])`,
  logic:'בטבלת ההרשמות יש 35 שורות אבל רק 12 סטודנטים שונים. ב-SQL מילה אחת פותרת את זה. במונגו אין DISTINCT בצינור — מקבצים לפי השדה, מה שמשאיר מסמך אחד לכל ערך ייחודי, ואז $project מחזיר את ה-_id לשם השדה המקורי.',
  trap:'שכחת DISTINCT מחזירה 35 שורות במקום 12. מלכודת שנייה: במונגו לשכוח את ה-$project ולהשאיר את השדה בשם _id — התוצאה נכונה לוגית אבל שם העמודה שונה.',
  compare:'DISTINCT ב-SQL הוא מילת מפתח, ובמונגו הוא תוצאה של קיבוץ — כלומר אותה פעולה לוגית, פעם כהצהרה ופעם כשלב בצינור.' });

add({ id:'B-08', pattern:'distinct', difficulty:3, kind:'select',
  cols:['courseName'],
  q:'הציגו את שמות הקורסים שיש להם לפחות מחזור אחד — כל שם פעם אחת בלבד, גם אם הקורס מוצע בכמה מחזורים. מיינו לפי שם הקורס.',
  keywords:'"גם אם הקורס מוצע בכמה מחזורים" ← אזהרה מפורשת מפני כפילויות ← DISTINCT. "שיש להם לפחות מחזור אחד" ← JOIN רגיל ולא LEFT JOIN.',
  sql:`SELECT DISTINCT c.courseName\nFROM Courses c\nJOIN CourseOfferings o ON o.courseId = c.courseId\nORDER BY c.courseName ASC;`,
  mongo:`db.courseOfferings.aggregate([\n  { $lookup: { from: "courses", localField: "courseId", foreignField: "courseId", as: "c" } },\n  { $unwind: "$c" },\n  { $group: { _id: "$c.courseName" } },\n  { $project: { _id: 0, courseName: "$_id" } },\n  { $sort: { courseName: 1 } }\n])`,
  logic:'הצירוף מכפיל את הקורס פעם לכל מחזור שלו — הקורס C20 מוצע בשלושה מחזורים ולכן היה מופיע שלוש פעמים. DISTINCT ב-SQL ו-$group במונגו מצמצמים חזרה לשם אחד. במונגו נוח להתחיל דווקא מהמחזורים, כי הם ה"רבים" בקשר.',
  trap:'הסרת DISTINCT מחזירה 10 שורות במקום 8, כי C20 מוצע שלוש פעמים ו-C80 פעם אחת. מלכודת שנייה: שימוש ב-LEFT JOIN כאן שגוי — הוא היה מכניס גם קורסים בלי שום מחזור, והשאלה ביקשה "שיש להם לפחות מחזור אחד".',
  compare:'הכפילות נוצרת בשתי הגישות מאותה סיבה — פריסה של קשר אחד-לרבים — ולכן גם הפתרון הוא אותו פתרון לוגי בשני תחבירים.' });

/* ---------- group-count ---------- */
add({ id:'B-09', pattern:'group-count', difficulty:1, kind:'select',
  cols:['departmentId','studentCount'],
  q:'לכל מחלקה — מזהה המחלקה ומספר הסטודנטים הרשומים בה. מיינו לפי מספר הסטודנטים בסדר יורד, ובתיקו לפי מזהה המחלקה בסדר עולה.',
  keywords:'"לכל מחלקה" ← GROUP BY / $group. "מספר הסטודנטים" ← COUNT / $sum: 1.',
  sql:`SELECT departmentId, COUNT(*) AS studentCount\nFROM Students\nGROUP BY departmentId\nORDER BY studentCount DESC, departmentId ASC;`,
  mongo:`db.students.aggregate([\n  { $group: { _id: "$departmentId", studentCount: { $sum: 1 } } },\n  { $project: { _id: 0, departmentId: "$_id", studentCount: 1 } },\n  { $sort: { studentCount: -1, departmentId: 1 } }\n])`,
  logic:'מזהה המחלקה שמור כבר בטבלת הסטודנטים, ולכן אין צורך בצירוף. ב-SQL COUNT(*) סופר שורות בקבוצה; במונגו המקבילה היא $sum: 1 — מוסיפים 1 לכל מסמך בקבוצה. הקיבוץ במונגו נעשה תמיד לתוך השדה _id, ולכן בסוף צריך $project כדי להחזיר לו את שמו האמיתי.',
  trap:'מיון בלי מפתח שני: D20 ו-D30 שניהם עם 3 סטודנטים, והסדר ביניהם יהיה שרירותי. מלכודת שנייה: במונגו לכתוב $count במקום $sum: 1 בתוך $group — $count הוא שלב נפרד בצינור ולא אופרטור של קיבוץ.',
  compare:'הקיבוץ עצמו מתורגם אחד לאחד, אבל במונגו המפתח תמיד נקרא _id, ולכן תמיד נדרש שלב נוסף כדי לקבל שמות עמודות כמו ב-SQL.' });

add({ id:'B-10', pattern:'group-count', difficulty:2, kind:'select',
  cols:['offeringId','enrollCount'],
  q:'לכל מחזור קורס בסמסטר 2026A שיש אליו לפחות הרשמה אחת — מזהה המחזור ומספר ההרשמות אליו. מיינו לפי מספר ההרשמות יורד, ובתיקו לפי מזהה המחזור עולה.',
  keywords:'"שיש אליו לפחות הרשמה אחת" ← JOIN רגיל (לא LEFT JOIN, ולכן אין צורך להציג אפסים). "בסמסטר 2026A" ← הסמסטר יושב על טבלת המחזורים ולכן נדרש צירוף.',
  sql:`SELECT e.offeringId, COUNT(*) AS enrollCount\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nWHERE o.semester = '2026A'\nGROUP BY e.offeringId\nORDER BY enrollCount DESC, e.offeringId ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $lookup: { from: "courseOfferings", localField: "offeringId", foreignField: "offeringId", as: "off" } },\n  { $unwind: "$off" },\n  { $match: { "off.semester": "2026A" } },\n  { $group: { _id: "$offeringId", enrollCount: { $sum: 1 } } },\n  { $project: { _id: 0, offeringId: "$_id", enrollCount: 1 } },\n  { $sort: { enrollCount: -1, offeringId: 1 } }\n])`,
  logic:'מתחילים מההרשמות כי הן מה שסופרים, מצרפים את המחזור רק כדי להגיע לשדה הסמסטר, ואז מקבצים. הסינון קורה לפני הקיבוץ — WHERE ב-SQL ו-$match לפני ה-$group במונגו — כי הוא על שורה בודדת ולא על תוצאת חישוב.',
  trap:'ארבעה מחזורים (O501, O505, O506, O507) עם 4 הרשמות כל אחד — בלי המיון השני הסדר ביניהם שרירותי. מלכודת שנייה: קיבוץ לפי off.offeringId במקום offeringId עובד גם כן, אבל אם תקבץ לפי courseId תקבל תשובה אחרת לגמרי (קורס מול מחזור).',
  compare:'ב-SQL הסינון והקיבוץ מוצהרים בשתי פסוקיות והמנוע מסדר ביניהם, ואילו במונגו הסדר שבו תכתוב את $match ואת $group הוא הסדר שירוץ בפועל.' });

/* ---------- group-avg ---------- */
add({ id:'B-11', pattern:'group-avg', difficulty:2, kind:'select',
  cols:['courseId','courseName','avgGrade'],
  q:'לכל קורס בסמסטר 2026A — מזהה הקורס, שם הקורס וממוצע הציונים בו. יש להתחשב רק בהרשמות שבהן קיים ציון. מיינו לפי הממוצע יורד, ובתיקו לפי מזהה הקורס.',
  keywords:'"ממוצע הציונים" ← AVG / $avg. "רק בהרשמות שבהן קיים ציון" ← grade IS NOT NULL, סינון לפני הקיבוץ. "לכל קורס" (ולא "לכל מחזור") ← מקבצים לפי courseId.',
  sql:`SELECT c.courseId, c.courseName, AVG(e.grade) AS avgGrade\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nJOIN Courses c         ON c.courseId   = o.courseId\nWHERE o.semester = '2026A' AND e.grade IS NOT NULL\nGROUP BY c.courseId, c.courseName\nORDER BY avgGrade DESC, c.courseId ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $lookup: { from: "courseOfferings", localField: "offeringId", foreignField: "offeringId", as: "off" } },\n  { $unwind: "$off" },\n  { $match: { "off.semester": "2026A", grade: { $ne: null } } },\n  { $group: { _id: "$off.courseId", avgGrade: { $avg: "$grade" } } },\n  { $lookup: { from: "courses", localField: "_id", foreignField: "courseId", as: "c" } },\n  { $unwind: "$c" },\n  { $project: { _id: 0, courseId: "$_id", courseName: "$c.courseName", avgGrade: 1 } },\n  { $sort: { avgGrade: -1, courseId: 1 } }\n])`,
  logic:'הקיבוץ הוא לפי קורס, ולכן שני מחזורים של אותו קורס מתמזגים לממוצע אחד — C20 למשל מאחד את O501 ו-O502. במונגו מקבצים לפי off.courseId ואת שם הקורס מביאים ב-$lookup אחרי הקיבוץ, כך שהצירוף רץ על 7 קבוצות ולא על 30 הרשמות.',
  trap:'קיבוץ לפי offeringId במקום courseId מחזיר 8 שורות במקום 7 ומפצל את C20 לשני ממוצעים. מלכודת שנייה: חישוב SUM(grade)/COUNT(*) במקום AVG — המונה מדלג על NULL והמכנה סופר אותו, והממוצע יוצא נמוך מדי.',
  compare:'AVG ו-$avg מתעלמים שניהם מ-NULL, ולכן כאן הסמנטיקה זהה — ההבדל הוא רק שבמונגו הצירוף שמביא את שם הקורס הוא החלטה של המתכנת מתי לבצע.' });

add({ id:'B-12', pattern:'group-avg', difficulty:2, kind:'select',
  cols:['examId','examineesCount','avgScore'],
  q:'לכל בחינה — מזהה הבחינה, מספר הנבחנים בה וממוצע הציונים בה. מיינו לפי מזהה הבחינה בסדר עולה.',
  keywords:'"לכל בחינה" ← GROUP BY examId. "מספר הנבחנים" + "ממוצע הציונים" ← שני חישובים באותו קיבוץ.',
  sql:`SELECT examId, COUNT(*) AS examineesCount, AVG(score) AS avgScore\nFROM ExamResults\nGROUP BY examId\nORDER BY examId ASC;`,
  mongo:`db.examResults.aggregate([\n  { $group: { _id: "$examId", examineesCount: { $sum: 1 }, avgScore: { $avg: "$score" } } },\n  { $project: { _id: 0, examId: "$_id", examineesCount: 1, avgScore: 1 } },\n  { $sort: { examId: 1 } }\n])`,
  logic:'אין כאן שום צירוף — מזהה הבחינה שמור בתוך טבלת התוצאות, ולכן הכול נעשה בקיבוץ אחד. שני חישובים יכולים לשבת באותו $group בלי מחיר נוסף, בדיוק כמו שני אגרגטים אחרי אותו SELECT.',
  trap:'צירוף מיותר לטבלת Exams. הוא לא מזיק כאן, אבל הוא מבזבז זמן במבחן — וכשהבחינה נשאלת על "כל הבחינות" הוא גם מסתיר בחינה שאין לה אף תוצאה. מלכודת שנייה: AVG על עמודה שלמה בעולם ה-SQL Server עשוי להחזיר מספר שלם; כאן score הוא DECIMAL ולכן הממוצע שבור.',
  compare:'כששני המנועים עובדים על אוסף יחיד, $group הוא בדיוק GROUP BY — וההבדל היחיד שנשאר הוא שם המפתח (_id).' });

/* ---------- having ---------- */
add({ id:'B-13', pattern:'having', difficulty:2, kind:'select',
  cols:['departmentId','departmentName','studentCount'],
  q:'הציגו רק את המחלקות שיש בהן יותר משני סטודנטים — מזהה המחלקה, שם המחלקה ומספר הסטודנטים. מיינו לפי מספר הסטודנטים יורד, ובתיקו לפי מזהה המחלקה.',
  keywords:'"הציגו רק את המחלקות שיש בהן יותר מ-" ← HAVING, כי התנאי הוא על תוצאת הספירה ולא על שורה בודדת. "יותר מ-2" ← > 2 ולא >= 2.',
  sql:`SELECT d.departmentId, d.departmentName, COUNT(s.studentId) AS studentCount\nFROM Departments d\nJOIN Students s ON s.departmentId = d.departmentId\nGROUP BY d.departmentId, d.departmentName\nHAVING COUNT(s.studentId) > 2\nORDER BY studentCount DESC, d.departmentId ASC;`,
  mongo:`db.students.aggregate([\n  { $group: { _id: "$departmentId", studentCount: { $sum: 1 } } },\n  { $match: { studentCount: { $gt: 2 } } },\n  { $lookup: { from: "departments", localField: "_id", foreignField: "departmentId", as: "d" } },\n  { $unwind: "$d" },\n  { $project: { _id: 0, departmentId: "$_id", departmentName: "$d.departmentName", studentCount: 1 } },\n  { $sort: { studentCount: -1, departmentId: 1 } }\n])`,
  logic:'התנאי "יותר משני סטודנטים" מתייחס לקבוצה שלמה, ולכן אי אפשר לבדוק אותו ב-WHERE — הוא קיים רק אחרי הקיבוץ. ב-SQL זו המילה HAVING; במונגו זה אותו $match בדיוק, אבל ממוקם אחרי ה-$group. את שם המחלקה מביאים אחרי הסינון, כך שהצירוף רץ על שלוש קבוצות בלבד.',
  trap:'כתיבת התנאי ב-WHERE במקום ב-HAVING — ב-SQL זו שגיאת מנוע, ובמונגו זה גרוע יותר: $match לפני ה-$group ירוץ בשקט ויחזיר תשובה שגויה. מלכודת שנייה: ONO עם שני סטודנטים בדיוק לא אמורה להופיע, ולכן >= 2 מחזיר 4 שורות במקום 3.',
  compare:'ההבדל בין WHERE ל-HAVING הוא שתי מילות מפתח ב-SQL, ובמונגו הוא אותו שלב במקום אחר בצינור — כלומר במונגו המיקום הוא המשמעות.' });

add({ id:'B-14', pattern:'having', difficulty:3, kind:'select',
  cols:['studentId','studentName','gradedCount','avgGrade'],
  q:'התחשבו רק בהרשמות שבהן קיים ציון. הציגו את הסטודנטים שיש להם שלושה ציונים או יותר וממוצע ציונים נמוך מ-90 — מזהה, שם, מספר הציונים והממוצע. מיינו לפי הממוצע בסדר עולה, ובתיקו לפי המזהה.',
  keywords:'"שלושה ציונים או יותר" ← >= 3. "וממוצע נמוך מ-90" ← שני תנאי HAVING מחוברים ב-AND. "התחשבו רק בהרשמות שבהן קיים ציון" ← סינון לפני הקיבוץ.',
  sql:`SELECT e.studentId, s.name AS studentName, COUNT(e.grade) AS gradedCount, AVG(e.grade) AS avgGrade\nFROM Enrollments e\nJOIN Students s ON s.studentId = e.studentId\nWHERE e.grade IS NOT NULL\nGROUP BY e.studentId, s.name\nHAVING COUNT(e.grade) >= 3 AND AVG(e.grade) < 90\nORDER BY avgGrade ASC, e.studentId ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $match: { grade: { $ne: null } } },\n  { $group: { _id: "$studentId", gradedCount: { $sum: 1 }, avgGrade: { $avg: "$grade" } } },\n  { $match: { gradedCount: { $gte: 3 }, avgGrade: { $lt: 90 } } },\n  { $lookup: { from: "students", localField: "_id", foreignField: "studentId", as: "st" } },\n  { $unwind: "$st" },\n  { $project: { _id: 0, studentId: "$_id", studentName: "$st.name", gradedCount: 1, avgGrade: 1 } },\n  { $sort: { avgGrade: 1, studentId: 1 } }\n])`,
  logic:'שלושה שלבים בסדר קבוע: קודם זורקים הרשמות בלי ציון, אחר כך מקבצים ומחשבים, ורק בסוף מסננים את הקבוצות. במונגו שני ה-$match הם אותו אופרטור בשני מקומות שונים — הראשון על מסמך בודד והשני על תוצאת החישוב.',
  trap:'S100 עם ממוצע 91.67 נופל על התנאי השני, ו-S113 (שכל הציונים שלו NULL) נעלם כבר בשלב הראשון. מלכודת שנייה: COUNT(*) במקום COUNT(grade) — כאן זה יוצא אותו דבר רק מפני שסיננו NULL מראש; בלי הסינון התוצאות שונות.',
  compare:'שתי הגישות דורשות להבין מתי מסננים — לפני או אחרי החישוב — אבל רק במונגו הטעות הזו עוברת בשקט בלי הודעת שגיאה.' });

/* ---------- left-join-zero ---------- */
add({ id:'B-15', pattern:'left-join-zero', difficulty:2, kind:'select',
  cols:['lecturerId','name','offeringCount'],
  q:'לכל מרצה — מזהה המרצה, שמו ומספר מחזורי הקורס שהוא מלמד בסמסטר 2025B. יש לכלול גם מרצים שאינם מלמדים אף מחזור בסמסטר הזה ולהציג עבורם 0. מיינו לפי המספר יורד, ובתיקו לפי מזהה המרצה.',
  keywords:'"יש לכלול גם מרצים שאינם מלמדים … ולהציג עבורם 0" ← זו ההגדרה המילולית של LEFT JOIN. סינון הסמסטר חייב לשבת בתנאי ה-ON ולא ב-WHERE.',
  sql:`SELECT l.lecturerId, l.name, COUNT(o.offeringId) AS offeringCount\nFROM Lecturers l\nLEFT JOIN CourseOfferings o ON o.lecturerId = l.lecturerId AND o.semester = '2025B'\nGROUP BY l.lecturerId, l.name\nORDER BY offeringCount DESC, l.lecturerId ASC;`,
  mongo:`db.lecturers.aggregate([\n  { $lookup: { from: "courseOfferings", localField: "lecturerId", foreignField: "lecturerId", as: "offs" } },\n  { $addFields: { offs25: { $filter: { input: "$offs", as: "o", cond: { $eq: ["$$o.semester", "2025B"] } } } } },\n  { $project: { _id: 0, lecturerId: 1, name: 1, offeringCount: { $size: "$offs25" } } },\n  { $sort: { offeringCount: -1, lecturerId: 1 } }\n])`,
  logic:'מתחילים מטבלת האב (Lecturers) כדי שכל מרצה יופיע בוודאות, ומצרפים אליה את המחזורים. COUNT(o.offeringId) סופר רק התאמות אמיתיות ולכן מחזיר 0 כשאין אף אחת. במונגו $lookup תמיד מחזיר מערך — גם ריק — ולכן מסננים אותו עם $filter ואז $size נותן את הספירה, כולל 0.',
  trap:'שימת o.semester = \'2025B\' ב-WHERE הופכת את ה-LEFT JOIN ל-JOIN רגיל, וזורקת את שלושת המרצים ללא מחזור ב-2025B — התוצאה תהיה 2 שורות במקום 5. מלכודת שנייה: COUNT(*) במקום COUNT(o.offeringId) סופר את שורת ה-NULL ומחזיר 1 במקום 0.',
  compare:'ב-SQL ההכללה של השורות הריקות היא מילת מפתח (LEFT), ובמונגו היא התנהגות ברירת המחדל של $lookup — ולכן דווקא במונגו קל יותר לקבל אפסים וקשה יותר להיפטר מהם.' });

add({ id:'B-16', pattern:'left-join-zero', difficulty:2, kind:'select',
  cols:['studentId','name','resultCount'],
  q:'לכל סטודנט — מזהה, שם ומספר תוצאות הבחינה שרשומות עליו. יש לכלול גם סטודנטים שאין להם אף תוצאת בחינה ולהציג עבורם 0. מיינו לפי המספר יורד, ובתיקו לפי המזהה.',
  keywords:'"יש לכלול גם סטודנטים שאין להם אף תוצאה" ← LEFT JOIN, ואין כאן תנאי סמסטר ולכן אין את מלכודת ה-ON.',
  sql:`SELECT s.studentId, s.name, COUNT(r.resultId) AS resultCount\nFROM Students s\nLEFT JOIN ExamResults r ON r.studentId = s.studentId\nGROUP BY s.studentId, s.name\nORDER BY resultCount DESC, s.studentId ASC;`,
  mongo:`db.students.aggregate([\n  { $lookup: { from: "examResults", localField: "studentId", foreignField: "studentId", as: "res" } },\n  { $project: { _id: 0, studentId: 1, name: 1, resultCount: { $size: "$res" } } },\n  { $sort: { resultCount: -1, studentId: 1 } }\n])`,
  logic:'כאן אין תנאי נוסף על הצירוף, ולכן ה-LEFT JOIN פשוט ו-$lookup לא דורש $filter — $size על המערך שהצירוף החזיר נותן ישירות את הספירה. 14 סטודנטים נכנסים לתשובה, שניים מהם עם 0.',
  trap:'שימוש ב-JOIN רגיל מוריד את התשובה ל-12 שורות ומעלים את S111 ו-S112. מלכודת שנייה: במונגו לכתוב { $size: "$res" } בתוך $match במקום ב-$project — ב-$match האופרטור $size מתנהג אחרת (בודק אורך מדויק) ואינו מחשב ערך.',
  compare:'השאלה "לכל X, גם אם אין לו Y" היא בדיוק המקום שבו $lookup נוח מ-LEFT JOIN — הוא מחזיר מערך ריק מעצמו, בלי מילת מפתח ובלי מלכודת ON מול WHERE.' });

/* ---------- anti-join ---------- */
add({ id:'B-17', pattern:'anti-join', difficulty:2, kind:'select',
  cols:['courseId','courseName'],
  q:'הציגו את הקורסים שלא הוצעו באף מחזור בסמסטר 2026A — מזהה הקורס ושמו. מיינו לפי מזהה הקורס.',
  keywords:'"שלא הוצעו באף מחזור ב-" ← אנטי-צירוף: LEFT JOIN ואחריו בדיקת IS NULL, או NOT IN. הסינון של הסמסטר חייב לשבת ב-ON.',
  sql:`SELECT c.courseId, c.courseName\nFROM Courses c\nLEFT JOIN CourseOfferings o ON o.courseId = c.courseId AND o.semester = '2026A'\nWHERE o.offeringId IS NULL\nORDER BY c.courseId ASC;`,
  mongo:`db.courses.aggregate([\n  { $lookup: { from: "courseOfferings", localField: "courseId", foreignField: "courseId", as: "offs" } },\n  { $addFields: { offs26: { $filter: { input: "$offs", as: "o", cond: { $eq: ["$$o.semester", "2026A"] } } } } },\n  { $match: { offs26: { $size: 0 } } },\n  { $project: { _id: 0, courseId: 1, courseName: 1 }  },\n  { $sort: { courseId: 1 } }\n])`,
  logic:'אנטי-צירוף הוא LEFT JOIN שממנו משאירים דווקא את השורות שלא מצאו התאמה. ב-SQL מזהים אותן לפי עמודה מהטבלה הימנית שיצאה NULL. במונגו אין "לא מצא" — יש מערך ריק, ולכן התנאי הוא $size: 0.',
  trap:'בדיקת IS NULL על עמודה שיכולה להיות NULL גם בשורה אמיתית. חייבים לבדוק עמודה שאינה מאפשרת NULL, כמו o.offeringId שהוא מפתח ראשי. מלכודת שנייה: העברת תנאי הסמסטר ל-WHERE — אז כל הקורסים שיש להם מחזור ב-2025B ייחשבו בטעות כ"לא הוצעו".',
  compare:'SQL מבטא "אין התאמה" דרך NULL שנוצר בצירוף, ומונגו מבטא זאת דרך מערך באורך 0 — אותה לוגיקה, אבל במונגו היא מפורשת ולכן קשה יותר לטעות בה.' });

add({ id:'B-18', pattern:'anti-join', difficulty:2, kind:'select',
  cols:['studentId','name'],
  q:'הציגו את הסטודנטים שלא נבחנו באף בחינה — מזהה ושם. מיינו לפי המזהה.',
  keywords:'"שלא נבחנו באף בחינה" ← אנטי-צירוף מול ExamResults, בלי שום תנאי נוסף.',
  sql:`SELECT s.studentId, s.name\nFROM Students s\nLEFT JOIN ExamResults r ON r.studentId = s.studentId\nWHERE r.resultId IS NULL\nORDER BY s.studentId ASC;`,
  mongo:`db.students.aggregate([\n  { $lookup: { from: "examResults", localField: "studentId", foreignField: "studentId", as: "res" } },\n  { $match: { res: { $size: 0 } } },\n  { $project: { _id: 0, studentId: 1, name: 1 } },\n  { $sort: { studentId: 1 } }\n])`,
  logic:'השאלה היא על היעדר רשומה, ולכן מתחילים מהסטודנטים ולא מהתוצאות. ב-SQL אפשר גם NOT IN (SELECT studentId FROM ExamResults) או NOT EXISTS, ושלושתם נותנים את אותן שתי שורות. במונגו $lookup + $size: 0 הוא הדפוס הישיר.',
  trap:'NOT IN מול תת-שאילתה שמחזירה NULL מחזיר תוצאה ריקה בכל SQL Server — כאן studentId הוא מפתח זר שאינו NULL ולכן זה בטוח, אבל זו מלכודת מפורסמת. מלכודת שנייה: לנסות לפתור את זה עם COUNT = 0 בלי LEFT JOIN — JOIN רגיל פשוט לא יחזיר את השורות האלה בכלל.',
  compare:'שתי הגישות עונות על אותה שאלה, אבל ב-SQL יש לה שלושה ניסוחים חלופיים (LEFT JOIN / NOT IN / NOT EXISTS) ובמונגו בעצם אחד.' });

/* ---------- top-n ---------- */
add({ id:'B-19', pattern:'top-n', difficulty:1, kind:'select',
  cols:['enrollmentId','studentId','grade'],
  q:'הציגו את שלוש ההרשמות עם הציון הגבוה ביותר — מזהה ההרשמה, מזהה הסטודנט והציון. התחשבו רק בהרשמות שיש בהן ציון. מיינו לפי הציון יורד, ובתיקו לפי מזהה ההרשמה עולה.',
  keywords:'"שלוש … עם הגבוה ביותר" ← TOP 3 ב-T-SQL (LIMIT 3 ב-SQLite), ו-.limit(3) במונגו. חייב מיון — אחרת "הגבוה ביותר" חסר משמעות.',
  sql:`SELECT TOP 3 enrollmentId, studentId, grade\nFROM Enrollments\nWHERE grade IS NOT NULL\nORDER BY grade DESC, enrollmentId ASC;`,
  mongo:`db.enrollments.find(\n  { grade: { $ne: null } },\n  { _id: 0, enrollmentId: 1, studentId: 1, grade: 1 }\n).sort({ grade: -1, enrollmentId: 1 }).limit(3)`,
  logic:'TOP חותך את התוצאה אחרי המיון, ולכן בלי ORDER BY הוא מחזיר שלוש שורות שרירותיות. במונגו הסדר של הפעולות בשרשרת אינו משנה — המנוע תמיד ממיין לפני ש-limit חותך — אבל כדאי לכתוב sort לפני limit כדי שהקוד יקרא כמו הכוונה.',
  trap:'שני ציונים של 95 (E1003 ו-E1031) נמצאים על הגבול, ובלי המיון השני אי אפשר לדעת מי מהם נכנס לשלישייה. מלכודת שנייה: הרשמות עם grade = NULL — בלי הסינון הן אינן נכנסות למיון יורד ב-SQL אבל כן משתתפות בו במונגו, ושתי הגישות יחזירו תשובות שונות.',
  compare:'TOP ב-T-SQL הוא תוספת ל-SELECT, ובמונגו limit הוא שלב בשרשרת — ובשני המנועים הוא חסר משמעות בלי מיון מלא וחד-משמעי.' });

add({ id:'B-20', pattern:'top-n', difficulty:3, kind:'select',
  cols:['courseId','courseName','credits'],
  q:'סדרו את הקורסים לפי נקודות הזכות בסדר יורד, ובתיקו לפי מזהה הקורס עולה. דלגו על שני הקורסים הראשונים והציגו את שלושת הקורסים שאחריהם — מזהה, שם ונקודות זכות.',
  keywords:'"דלגו על … והציגו את … שאחריהם" ← דפדוף: OFFSET 2 ROWS FETCH NEXT 3 ROWS ONLY ב-T-SQL, .skip(2).limit(3) במונגו.',
  sql:`SELECT courseId, courseName, credits\nFROM Courses\nORDER BY credits DESC, courseId ASC\nOFFSET 2 ROWS FETCH NEXT 3 ROWS ONLY;`,
  mongo:`db.courses.find(\n  {},\n  { _id: 0, courseId: 1, courseName: 1, credits: 1 }\n).sort({ credits: -1, courseId: 1 }).skip(2).limit(3)`,
  logic:'זהו הדפוס שמממש "עמוד שני בטבלה". ב-T-SQL פסוקית ה-OFFSET/FETCH חייבת לבוא מיד אחרי ORDER BY ואינה יכולה להופיע בלעדיו. במונגו skip מדלג ו-limit חותך, ושניהם פועלים על התוצאה אחרי המיון.',
  trap:'בלי מיון חד-משמעי הדפדוף חסר ערך: שלושה קורסים עם 4 נקודות זכות ושניים עם 3, ולכן בלי המיון השני על courseId "העמוד השני" משתנה בכל הרצה. מלכודת שנייה: לכתוב FETCH NEXT 3 בלי OFFSET — זה שגיאת תחביר ב-SQL Server, ה-OFFSET חובה.',
  compare:'הדפדוף הוא אותו רעיון בשתי הגישות, אבל ב-T-SQL הוא פסוקית אחת צמודה ל-ORDER BY ובמונגו הוא שתי קריאות נפרדות בשרשרת.' });

add({ id:'B-21', pattern:'top-n', difficulty:3, kind:'select',
  cols:['studentId','studentName','enrollCount'],
  q:'הציגו את שני הסטודנטים עם מספר ההרשמות הגדול ביותר — מזהה הסטודנט, שמו ומספר ההרשמות. מיינו לפי מספר ההרשמות יורד, ובתיקו לפי מזהה הסטודנט עולה.',
  keywords:'"שני … עם הגדול ביותר" + "מספר ההרשמות" ← קודם קיבוץ וספירה, ורק אחר כך חיתוך של TOP / limit.',
  sql:`SELECT TOP 2 e.studentId, s.name AS studentName, COUNT(*) AS enrollCount\nFROM Enrollments e\nJOIN Students s ON s.studentId = e.studentId\nGROUP BY e.studentId, s.name\nORDER BY enrollCount DESC, e.studentId ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $group: { _id: "$studentId", enrollCount: { $sum: 1 } } },\n  { $lookup: { from: "students", localField: "_id", foreignField: "studentId", as: "st" } },\n  { $unwind: "$st" },\n  { $project: { _id: 0, studentId: "$_id", studentName: "$st.name", enrollCount: 1 } },\n  { $sort: { enrollCount: -1, studentId: 1 } },\n  { $limit: 2 }\n])`,
  logic:'החיתוך חייב לקרות אחרון — אחרי הקיבוץ, אחרי הצירוף ואחרי המיון. במונגו זה גלוי לעין: $limit הוא השלב האחרון בצינור. ב-SQL זה פחות גלוי, כי TOP נכתב בראש השאילתה אבל מבוצע בסוף.',
  trap:'שלושה סטודנטים (S100, S102, S106) עם 4 הרשמות כל אחד, ולכן בלי המיון השני אי אפשר לדעת מי שני הנבחרים. מלכודת שנייה: לשים $limit לפני $group — אז מקבצים שתי הרשמות שרירותיות ולא שני סטודנטים.',
  compare:'ב-SQL סדר הביצוע סמוי והמנוע מסדר אותו, ואילו במונגו הוא כתוב במפורש — ולכן טעות בסדר השלבים היא טעות שקטה שתחזיר מספר סביר אבל שגוי.' });

/* ---------- subquery-where ---------- */
add({ id:'B-22', pattern:'subquery-where', difficulty:2, kind:'select',
  cols:['enrollmentId','studentId','grade'],
  q:'הציגו את ההרשמות שהציון בהן גבוה מממוצע כל הציונים במערכת — מזהה ההרשמה, מזהה הסטודנט והציון. מיינו לפי הציון יורד, ובתיקו לפי מזהה ההרשמה.',
  keywords:'"גבוה מממוצע כל הציונים" ← תת-שאילתה סקלרית ב-WHERE. את הממוצע חייבים לחשב לפני ההשוואה, ולכן אי אפשר לכתוב WHERE grade > AVG(grade).',
  sql:`SELECT enrollmentId, studentId, grade\nFROM Enrollments\nWHERE grade > (SELECT AVG(grade) FROM Enrollments)\nORDER BY grade DESC, enrollmentId ASC;`,
  mongo:`var avg = db.enrollments.aggregate([\n  { $match: { grade: { $ne: null } } },\n  { $group: { _id: null, a: { $avg: "$grade" } } }\n]).toArray()[0].a;\n\ndb.enrollments.find(\n  { grade: { $gt: avg } },\n  { _id: 0, enrollmentId: 1, studentId: 1, grade: 1 }\n).sort({ grade: -1, enrollmentId: 1 })`,
  logic:'הממוצע הכללי הוא מספר אחד (78.53), והשאלה משווה כל שורה אליו. ב-SQL תת-השאילתה מוטמעת בתוך ה-WHERE והמנוע מחשב אותה פעם אחת. במונגו אין תת-שאילתות, ולכן מחשבים את הממוצע בפקודה ראשונה, שומרים במשתנה ומשתמשים בו בפקודה השנייה — בדיוק כמו שעושים בפועל בקוד אפליקציה.',
  trap:'לכתוב WHERE grade > AVG(grade) — זו שגיאת מנוע, כי פונקציית קיבוץ אינה חוקית ב-WHERE. מלכודת שנייה: שורות עם grade = NULL אינן עוברות את ההשוואה באף אחד מהמנועים, ולכן אין צורך להגן עליהן — אבל כן צריך לוודא ש-NULL אינו נכנס לחישוב הממוצע.',
  compare:'תת-שאילתה היא יתרון מובהק של SQL: היא הופכת שני שלבים לפקודה אטומית אחת, בעוד שבמונגו יש ביניהם רגע שבו הנתונים יכולים להשתנות.' });

add({ id:'B-23', pattern:'subquery-where', difficulty:3, kind:'select',
  cols:['offeringId','courseId','semester','capacity'],
  q:'הציגו את מחזורי הקורס שהקיבולת שלהם גדולה מהקיבולת הממוצעת של כל המחזורים — מזהה המחזור, מזהה הקורס, הסמסטר והקיבולת. מיינו לפי הקיבולת יורד, ובתיקו לפי מזהה המחזור.',
  keywords:'"גדולה מהקיבולת הממוצעת של כל המחזורים" ← אותו דפוס של תת-שאילתה סקלרית, הפעם על אותה טבלה שממנה שולפים.',
  sql:`SELECT offeringId, courseId, semester, capacity\nFROM CourseOfferings\nWHERE capacity > (SELECT AVG(capacity) FROM CourseOfferings)\nORDER BY capacity DESC, offeringId ASC;`,
  mongo:`var avg = db.courseOfferings.aggregate([\n  { $group: { _id: null, a: { $avg: "$capacity" } } }\n]).toArray()[0].a;\n\ndb.courseOfferings.find(\n  { capacity: { $gt: avg } },\n  { _id: 0, offeringId: 1, courseId: 1, semester: 1, capacity: 1 }\n).sort({ capacity: -1, offeringId: 1 })`,
  logic:'התת-שאילתה רצה על אותה טבלה, וזה חוקי לחלוטין — המנוע מחשב קודם את הממוצע (33) ואז משווה כל שורה אליו. במונגו החישוב הוא $group עם _id: null, שהוא הדרך לקבץ את כל האוסף לקבוצה אחת.',
  trap:'שני מחזורים (O503 ו-O510) עם קיבולת 40 — בלי המיון השני הסדר ביניהם שרירותי. מלכודת שנייה: במונגו לשכוח את .toArray()[0].a ולהעביר ל-$gt את הסמן עצמו — התוצאה תהיה ריקה או שגיאה.',
  compare:'ב-SQL "ממוצע הכול" הוא ביטוי בתוך התנאי, ובמונגו הוא פקודה עם $group: null שתוצאתה נשמרת במשתנה — שתי דרכים לאותו חישוב, אבל רק אחת מהן אטומית.' });

/* ---------- subquery-in ---------- */
add({ id:'B-24', pattern:'subquery-in', difficulty:2, kind:'select',
  cols:['studentId','name'],
  q:'הציגו את הסטודנטים שנרשמו לפחות למחזור אחד של הקורס C20 — מזהה ושם. כל סטודנט פעם אחת בלבד. מיינו לפי המזהה.',
  keywords:'"נרשמו לפחות למחזור אחד של הקורס C20" ← רשימה של מזהים, ולכן IN ולא =. "כל סטודנט פעם אחת" ← IN מחזיר כל שורה פעם אחת מעצמו, בלי DISTINCT.',
  sql:`SELECT studentId, name\nFROM Students\nWHERE studentId IN (\n  SELECT studentId FROM Enrollments\n  WHERE offeringId IN (SELECT offeringId FROM CourseOfferings WHERE courseId = 'C20')\n)\nORDER BY studentId ASC;`,
  mongo:`var offs = db.courseOfferings.find({ courseId: "C20" }, { _id: 0, offeringId: 1 })\n            .map(o => o.offeringId);\nvar ids  = db.enrollments.distinct("studentId", { offeringId: { $in: offs } });\n\ndb.students.find({ studentId: { $in: ids } }, { _id: 0, studentId: 1, name: 1 })\n  .sort({ studentId: 1 })`,
  logic:'הקורס C20 מוצע בשלושה מחזורים (O501, O502, O509), ולכן לא מדובר במזהה אחד אלא ברשימה. שתי תת-שאילתות מקוננות ב-SQL: הפנימית מביאה את המחזורים, החיצונית את הסטודנטים. במונגו זה שלוש פקודות — map לרשימת המחזורים, distinct לרשימת הסטודנטים, ואז השליפה עצמה.',
  trap:'שימוש בצירוף במקום ב-IN מחזיר 10 שורות במקום 6, כי S106 נרשם פעמיים ל-O501 ו-S101 רשום לשני מחזורים של C20 — ואז צריך DISTINCT. מלכודת שנייה: במונגו לכתוב { $in: offs } כשה-offs הוא מערך של מסמכים ולא של מחרוזות — ה-map הוא מה שהופך אותו לרשימת ערכים.',
  compare:'IN עם תת-שאילתה הוא פקודה אחת ב-SQL ושרשרת של שלוש פקודות במונגו, אבל דווקא הפיצול הזה הוא מה שמאלץ אותך לראות אילו מזהים בדיוק נכנסים לרשימה.' });

add({ id:'B-25', pattern:'subquery-in', difficulty:3, kind:'select',
  cols:['resultId','examId','studentId','score'],
  q:'הציגו את תוצאות הבחינה שהציון בהן גבוה מ-90 ושהבחינה שלהן התקיימה במחזור קורס של סמסטר 2026A — מזהה התוצאה, מזהה הבחינה, מזהה הסטודנט והציון. מיינו לפי הציון יורד, ובתיקו לפי מזהה התוצאה.',
  keywords:'"שהבחינה שלהן התקיימה במחזור קורס של סמסטר 2026A" ← הסמסטר נמצא שתי טבלאות משם, ולכן תת-שאילתה מקוננת (או שרשרת צירופים).',
  sql:`SELECT r.resultId, r.examId, r.studentId, r.score\nFROM ExamResults r\nWHERE r.score > 90\n  AND r.examId IN (\n    SELECT examId FROM Exams\n    WHERE offeringId IN (SELECT offeringId FROM CourseOfferings WHERE semester = '2026A')\n  )\nORDER BY r.score DESC, r.resultId ASC;`,
  mongo:`var offs = db.courseOfferings.find({ semester: "2026A" }, { _id: 0, offeringId: 1 })\n            .map(o => o.offeringId);\nvar exs  = db.exams.find({ offeringId: { $in: offs } }, { _id: 0, examId: 1 })\n            .map(x => x.examId);\n\ndb.examResults.find(\n  { score: { $gt: 90 }, examId: { $in: exs } },\n  { _id: 0, resultId: 1, examId: 1, studentId: 1, score: 1 }\n).sort({ score: -1, resultId: 1 })`,
  logic:'שני תנאים בלתי תלויים: אחד על השורה עצמה (ציון מעל 90) ואחד על שרשרת ההשתייכות שלה (בחינה → מחזור → סמסטר). ב-SQL התת-שאילתות מקוננות שתי רמות; במונגו אותה שרשרת היא שתי שאילתות עזר, שכל אחת מזינה את הבאה.',
  trap:'שני ציונים של 98 (R027 ו-R032) — בלי המיון השני הסדר ביניהם שרירותי. מלכודת שנייה: לכתוב score >= 90 — התשובה תגדל, כי "גבוה מ-90" הוא > ולא >=.',
  compare:'תת-שאילתה מקוננת מבטאת ב-SQL שרשרת שלמה של קשרים בתוך פקודה אחת, ובמונגו אותה שרשרת מתורגמת לכמה פקודות עצמאיות שמעבירות ביניהן רשימות מזהים.' });

/* ---------- like ---------- */
add({ id:'B-26', pattern:'like', difficulty:1, kind:'select',
  cols:['studentId','name'],
  q:'הציגו את הסטודנטים ששמם מכיל את הרצף "an" — מזהה ושם. מיינו לפי המזהה.',
  keywords:'"מכיל את הרצף" ← LIKE עם % משני הצדדים ב-SQL, ו-$regex בלי עוגנים במונגו.',
  sql:`SELECT studentId, name\nFROM Students\nWHERE name LIKE '%an%'\nORDER BY studentId ASC;`,
  mongo:`db.students.find(\n  { name: { $regex: "an" } },\n  { _id: 0, studentId: 1, name: 1 }\n).sort({ studentId: 1 })`,
  logic:'% ב-LIKE הוא "אפס תווים או יותר", ולכן \'%an%\' פירושו "an במקום כלשהו". במונגו ביטוי רגולרי בלי התווים ^ ו-$ מחפש התאמה חלקית מעצמו, ולכן אין בו מקבילה ל-%.',
  trap:'LIKE ב-SQL Server וב-SQLite אינו רגיש לאותיות גדולות וקטנות, ואילו $regex של מונגו רגיש כברירת מחדל — אותה שאלה יכולה להחזיר תשובות שונות בשני המנועים. כדי להשוות אותן צריך $options: "i". מלכודת שנייה: לכתוב = \'%an%\' במקום LIKE — סימן השוויון לא מכיר ב-%.',
  compare:'LIKE מכיר שני תווי תחליף בלבד (% ו-_), ו-$regex הוא מנוע ביטויים רגולריים שלם — ולכן במונגו החיפוש חזק יותר אבל גם רגיש לאותיות, ומצריך תשומת לב נוספת.' });

add({ id:'B-27', pattern:'like', difficulty:2, kind:'select',
  cols:['courseId','courseName','credits'],
  q:'הציגו את הקורסים ששם הקורס שלהם מתחיל באות A או מסתיים במילה Management — מזהה, שם ונקודות זכות. מיינו לפי שם הקורס.',
  keywords:'"מתחיל ב-" ← LIKE \'A%\' (ה-% רק בסוף) / $regex: "^A". "מסתיים ב-" ← LIKE \'%Management\' / $regex: "Management$". "או" ← OR ב-SQL, $or במונגו.',
  sql:`SELECT courseId, courseName, credits\nFROM Courses\nWHERE courseName LIKE 'A%' OR courseName LIKE '%Management'\nORDER BY courseName ASC;`,
  mongo:`db.courses.find(\n  { $or: [ { courseName: { $regex: "^A" } }, { courseName: { $regex: "Management$" } } ] },\n  { _id: 0, courseId: 1, courseName: 1, credits: 1 }\n).sort({ courseName: 1 })`,
  logic:'מקום ה-% הוא כל הסיפור: בתחילת התבנית הוא פותח את ההתחלה, ובסופה הוא פותח את הסוף. בביטוי רגולרי התפקיד הזה הפוך — ^ ו-$ הם עוגנים שסוגרים, וברירת המחדל היא התאמה חלקית.',
  trap:'במונגו שני תנאים על אותו שדה אינם יכולים לשבת באותו אובייקט פילטר (המפתח courseName יופיע פעמיים והשני ידרוס את הראשון) — חייבים $or מפורש. מלכודת שנייה: לכתוב \'%A%\' במקום \'A%\' — זה גם מחזיר קורסים שה-a נמצא באמצע שמם.',
  compare:'ב-SQL ה-OR הוא מילת קישור רגילה בין שני תנאים, ובמונגו הוא אופרטור שעוטף מערך של פילטרים — וזו הסיבה שהניסוח שלו נראה שונה כל כך.' });

/* ---------- between-date ---------- */
add({ id:'B-28', pattern:'between-date', difficulty:1, kind:'select',
  cols:['enrollmentId','studentId','enrolledAt','grade'],
  q:'הציגו את ההרשמות שבוצעו בין 1 בפברואר 2026 ל-3 בפברואר 2026 (כולל שני התאריכים) — מזהה ההרשמה, מזהה הסטודנט, תאריך ההרשמה והציון. מיינו לפי התאריך, ובתיקו לפי מזהה ההרשמה.',
  keywords:'"בין … ל… כולל" ← BETWEEN ב-SQL (שהוא תמיד כולל את שני הקצוות), ובמונגו $gte ו-$lte על אותו שדה.',
  sql:`SELECT enrollmentId, studentId, enrolledAt, grade\nFROM Enrollments\nWHERE enrolledAt BETWEEN '2026-02-01' AND '2026-02-03'\nORDER BY enrolledAt ASC, enrollmentId ASC;`,
  mongo:`db.enrollments.find(\n  { enrolledAt: { $gte: ISODate("2026-02-01"), $lte: ISODate("2026-02-03") } },\n  { _id: 0, enrollmentId: 1, studentId: 1, enrolledAt: 1, grade: 1 }\n).sort({ enrolledAt: 1, enrollmentId: 1 })`,
  logic:'BETWEEN הוא קיצור ל-">= וגם <=", ולכן הוא תמיד כולל את שני הגבולות. במונגו אין BETWEEN — כותבים את שני האופרטורים בתוך אותו אובייקט על אותו שדה, וזה AND. חשוב להשתמש ב-ISODate ולא במחרוזת, כי השדה שמור כטיפוס תאריך.',
  trap:'השוואת תאריך למחרוזת במונגו — { enrolledAt: { $gte: "2026-02-01" } } אינו מחזיר כלום, כי מחרוזת ותאריך הם טיפוסים שונים. מלכודת שנייה: שדה תאריך שכולל גם שעה — BETWEEN עד \'2026-02-03\' יחתוך את כל מה שקרה באותו יום אחרי חצות; כאן השעות הן 00:00 ולכן זה בטוח.',
  compare:'ב-SQL טווח תאריכים הוא פסוקית אחת קריאה, ובמונגו הוא שני אופרטורים בתוך אובייקט — אבל במונגו הטיפוס של הערך הוא חלק מהתנאי, ולכן השוואה לטיפוס שגוי נכשלת בשקט.' });

add({ id:'B-29', pattern:'between-date', difficulty:2, kind:'select',
  cols:['enrollmentId','studentId','offeringId','enrolledAt'],
  q:'הציגו את ההרשמות למחזורי קורס של סמסטר 2025B שבוצעו במהלך חודש ינואר 2026 — מזהה ההרשמה, מזהה הסטודנט, מזהה המחזור ותאריך ההרשמה. מיינו לפי התאריך, ובתיקו לפי מזהה ההרשמה.',
  keywords:'"במהלך חודש ינואר 2026" ← טווח תאריכים. "למחזורי קורס של סמסטר 2025B" ← הסמסטר יושב בטבלה אחרת, ולכן צירוף נוסף.',
  sql:`SELECT e.enrollmentId, e.studentId, e.offeringId, e.enrolledAt\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nWHERE o.semester = '2025B'\n  AND e.enrolledAt BETWEEN '2026-01-01' AND '2026-01-31'\nORDER BY e.enrolledAt ASC, e.enrollmentId ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $match: { enrolledAt: { $gte: ISODate("2026-01-01"), $lte: ISODate("2026-01-31") } } },\n  { $lookup: { from: "courseOfferings", localField: "offeringId", foreignField: "offeringId", as: "off" } },\n  { $unwind: "$off" },\n  { $match: { "off.semester": "2025B" } },\n  { $project: { _id: 0, enrollmentId: 1, studentId: 1, offeringId: 1, enrolledAt: 1 } },\n  { $sort: { enrolledAt: 1, enrollmentId: 1 } }\n])`,
  logic:'שני תנאים משתי טבלאות, ולכן נדרש צירוף. במונגו עדיף לסנן קודם את טווח התאריכים ורק אחר כך לצרף — כך ה-$lookup רץ על חמש הרשמות ולא על 35. שלושת הערכים בתאריך 5 בינואר נבדלים ביניהם רק לפי מזהה ההרשמה, ולכן המיון השני חובה.',
  trap:'שלוש הרשמות באותו תאריך בדיוק (2026-01-05) — בלי מיון שני התשובה אינה חד-משמעית. מלכודת שנייה: לכתוב את טווח התאריכים כ-"ינואר" דרך YEAR() ו-MONTH() במקום BETWEEN — זה עובד, אבל פונקציה על עמודה מבטלת את השימוש באינדקס.',
  compare:'סדר הסינון במונגו נקבע על ידי המתכנת והוא משפיע ישירות על כמות העבודה, בעוד שב-SQL אותו תנאי נכתב פעם אחת ב-WHERE והאופטימייזר בוחר את הסדר.' });

/* ---------- count-distinct ---------- */
add({ id:'B-30', pattern:'count-distinct', difficulty:2, kind:'select',
  cols:['courseId','studentCount'],
  q:'לכל קורס — מזהה הקורס ומספר הסטודנטים השונים שנרשמו אליו. סטודנט שנרשם לשני מחזורים של אותו קורס נספר פעם אחת בלבד. מיינו לפי המספר יורד, ובתיקו לפי מזהה הקורס.',
  keywords:'"מספר הסטודנטים השונים" + "נספר פעם אחת בלבד" ← COUNT(DISTINCT studentId) ב-SQL, ובמונגו $addToSet ואחריו $size.',
  sql:`SELECT o.courseId, COUNT(DISTINCT e.studentId) AS studentCount\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nGROUP BY o.courseId\nORDER BY studentCount DESC, o.courseId ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $lookup: { from: "courseOfferings", localField: "offeringId", foreignField: "offeringId", as: "off" } },\n  { $unwind: "$off" },\n  { $group: { _id: "$off.courseId", studs: { $addToSet: "$studentId" } } },\n  { $project: { _id: 0, courseId: "$_id", studentCount: { $size: "$studs" } } },\n  { $sort: { studentCount: -1, courseId: 1 } }\n])`,
  logic:'C20 מוצע בשלושה מחזורים, ויש בו 10 הרשמות אבל רק 7 סטודנטים שונים — זה בדיוק ההבדל בין COUNT לבין COUNT DISTINCT. במונגו אין DISTINCT בתוך קיבוץ: אוספים את הערכים לקבוצה ($addToSet, שאינו מכניס כפילויות) ואז מודדים את אורכה.',
  trap:'COUNT(*) במקום COUNT(DISTINCT studentId) מחזיר 10 עבור C20 במקום 7, וגם משנה את הסדר של כל התשובה. מלכודת שנייה: במונגו לכתוב $push במקום $addToSet — $push שומר כפילויות, ו-$size יחזיר את מספר ההרשמות ולא את מספר הסטודנטים.',
  compare:'DISTINCT בתוך פונקציית קיבוץ הוא תוספת של מילה אחת ב-SQL, ובמונגו הוא שינוי של אופרטור הצבירה — $addToSet במקום $push — כלומר במונגו הייחודיות מיושמת במבנה הנתונים עצמו.' });

add({ id:'B-31', pattern:'count-distinct', difficulty:2, kind:'select',
  cols:['lecturerId','courseCount'],
  q:'לכל מרצה — מזהה המרצה ומספר הקורסים השונים שהוא מלמד. מרצה שמלמד שני מחזורים של אותו קורס נספר פעם אחת. מיינו לפי המספר יורד, ובתיקו לפי מזהה המרצה.',
  keywords:'"מספר הקורסים השונים" ← COUNT(DISTINCT courseId). אין צורך בצירוף — שני השדות שמורים באותה טבלה (CourseOfferings).',
  sql:`SELECT lecturerId, COUNT(DISTINCT courseId) AS courseCount\nFROM CourseOfferings\nGROUP BY lecturerId\nORDER BY courseCount DESC, lecturerId ASC;`,
  mongo:`db.courseOfferings.aggregate([\n  { $group: { _id: "$lecturerId", cs: { $addToSet: "$courseId" } } },\n  { $project: { _id: 0, lecturerId: "$_id", courseCount: { $size: "$cs" } } },\n  { $sort: { courseCount: -1, lecturerId: 1 } }\n])`,
  logic:'המרצה L1 מלמד ארבעה מחזורים אבל רק שלושה קורסים שונים, כי C20 חוזר אצלו גם ב-2026A וגם ב-2025B. הקיבוץ הוא על טבלה אחת, ולכן זו השאלה הנקייה ביותר להבין בה את ההבדל בין "מספר השורות" לבין "מספר הערכים השונים".',
  trap:'COUNT(courseId) בלי DISTINCT מחזיר 4 עבור L1 ומעלה אותו שלא בצדק — והוא גם משנה את סדר המיון. מלכודת שנייה: שני מרצים עם 2 קורסים (L2 ו-L5) ושני מרצים עם 1 (L3 ו-L4) — בלי המיון השני על המזהה התשובה אינה חד-משמעית.',
  compare:'הקיבוץ והספירה מתורגמים כאן אחד לאחד, וכל הפער בין הגישות מצטמצם לשאלה איך כל מנוע מייצג "ייחודיות" — מילת מפתח מול מבנה קבוצה.' });

/* ---------- multi-group ---------- */
add({ id:'B-32', pattern:'multi-group', difficulty:2, kind:'select',
  cols:['semester','courseId','enrollCount'],
  q:'לכל צירוף של סמסטר ומזהה קורס — הסמסטר, מזהה הקורס ומספר ההרשמות באותו צירוף. מיינו לפי הסמסטר עולה, ואז לפי מספר ההרשמות יורד, ואז לפי מזהה הקורס עולה.',
  keywords:'"לכל צירוף של … ו…" ← GROUP BY על שני שדות, ובמונגו _id שהוא אובייקט עם שני מפתחות.',
  sql:`SELECT o.semester, o.courseId, COUNT(*) AS enrollCount\nFROM Enrollments e\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nGROUP BY o.semester, o.courseId\nORDER BY o.semester ASC, enrollCount DESC, o.courseId ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $lookup: { from: "courseOfferings", localField: "offeringId", foreignField: "offeringId", as: "off" } },\n  { $unwind: "$off" },\n  { $group: { _id: { semester: "$off.semester", courseId: "$off.courseId" }, enrollCount: { $sum: 1 } } },\n  { $project: { _id: 0, semester: "$_id.semester", courseId: "$_id.courseId", enrollCount: 1 } },\n  { $sort: { semester: 1, enrollCount: -1, courseId: 1 } }\n])`,
  logic:'כל שורה בתשובה היא זוג (סמסטר, קורס), ולכן C20 מופיע פעמיים — פעם ב-2026A עם 7 הרשמות ופעם ב-2025B עם 3. במונגו המפתח המורכב נכתב כאובייקט בתוך _id, ואז ה-$project משטח אותו חזרה לשני שדות נפרדים.',
  trap:'קיבוץ לפי שדה אחד בלבד מאחד את שני הסמסטרים ומחזיר 7 שורות במקום 9. מלכודת שנייה: במונגו לשכוח את ה-$project ולהשאיר את ה-_id כאובייקט — אז גם המיון לא יעבוד, כי אין שדה בשם semester ברמה העליונה.',
  compare:'ב-SQL הוספת שדה שני ל-GROUP BY היא תוספת של מילה, ובמונגו היא שינוי מבנה ה-_id ממפתח בודד לאובייקט — ולכן היא מחייבת גם שלב $project נוסף.' });

add({ id:'B-33', pattern:'multi-group', difficulty:3, kind:'select',
  cols:['departmentId','semester','enrollCount'],
  q:'לכל צירוף של מחלקת הסטודנט וסמסטר — מזהה המחלקה, הסמסטר ומספר ההרשמות. מיינו לפי מזהה המחלקה ואז לפי הסמסטר.',
  keywords:'"מחלקת הסטודנט" ← Students. "סמסטר" ← CourseOfferings. שני שדות הקיבוץ מגיעים משתי טבלאות שונות, ולכן צריך שני צירופים לפני הקיבוץ.',
  sql:`SELECT s.departmentId, o.semester, COUNT(*) AS enrollCount\nFROM Enrollments e\nJOIN Students s        ON s.studentId  = e.studentId\nJOIN CourseOfferings o ON o.offeringId = e.offeringId\nGROUP BY s.departmentId, o.semester\nORDER BY s.departmentId ASC, o.semester ASC;`,
  mongo:`db.enrollments.aggregate([\n  { $lookup: { from: "students", localField: "studentId", foreignField: "studentId", as: "st" } },\n  { $unwind: "$st" },\n  { $lookup: { from: "courseOfferings", localField: "offeringId", foreignField: "offeringId", as: "off" } },\n  { $unwind: "$off" },\n  { $group: { _id: { departmentId: "$st.departmentId", semester: "$off.semester" }, enrollCount: { $sum: 1 } } },\n  { $project: { _id: 0, departmentId: "$_id.departmentId", semester: "$_id.semester", enrollCount: 1 } },\n  { $sort: { departmentId: 1, semester: 1 } }\n])`,
  logic:'כאן הקיבוץ חייב לבוא אחרי שני צירופים, כי אף אחד משני שדות הקיבוץ אינו קיים בטבלת ההרשמות. השאלה היא "מחלקת הסטודנט" ולא "מחלקת הקורס" — שני נתונים שונים לגמרי, שגם נותנים תשובות שונות.',
  trap:'צירוף למחלקה דרך הקורס (Courses.departmentId) במקום דרך הסטודנט — זו שאלה אחרת לגמרי, והתשובה תהיה 6 שורות במקום 8. מלכודת שנייה: מחלקה שאין לה אף הרשמה לא תופיע בכלל — וזה נכון, כי השאלה לא ביקשה LEFT JOIN.',
  compare:'ככל שמספר הצירופים שלפני הקיבוץ עולה, הצינור במונגו מתארך בזוג שלבים לכל צירוף — בעוד ששאילתת SQL גדלה בשורה אחת.' });

/* ---------- self-join ---------- */
add({ id:'B-34', pattern:'self-join', difficulty:3, kind:'select',
  cols:['courseA','courseB','departmentId','credits'],
  q:'הציגו זוגות של קורסים מאותה מחלקה שיש להם אותו מספר נקודות זכות. כל זוג פעם אחת בלבד, ואין להציג קורס מול עצמו. עמודות: שם הקורס הראשון, שם הקורס השני, מזהה המחלקה ונקודות הזכות. מיינו לפי שם הקורס הראשון ואז לפי השני.',
  keywords:'"זוגות … מאותה" ← צירוף של טבלה עם עצמה (self join). "כל זוג פעם אחת ולא קורס מול עצמו" ← תנאי אי-שוויון מכוון: b.courseId > a.courseId.',
  sql:`SELECT a.courseName AS courseA, b.courseName AS courseB, a.departmentId, a.credits\nFROM Courses a\nJOIN Courses b ON b.departmentId = a.departmentId\n              AND b.credits      = a.credits\n              AND b.courseId     > a.courseId\nORDER BY a.courseName ASC, b.courseName ASC;`,
  mongo:`db.courses.aggregate([\n  { $lookup: { from: "courses", localField: "departmentId", foreignField: "departmentId", as: "same" } },\n  { $unwind: "$same" },\n  { $match: { $expr: { $and: [ { $eq: ["$credits", "$same.credits"] }, { $gt: ["$same.courseId", "$courseId"] } ] } } },\n  { $project: { _id: 0, courseA: "$courseName", courseB: "$same.courseName", departmentId: 1, credits: 1 } },\n  { $sort: { courseA: 1, courseB: 1 } }\n])`,
  logic:'צירוף עצמי הוא אותה טבלה בשני כינויים, a ו-b, כאילו היו שתי טבלאות. התנאי b.courseId > a.courseId עושה שתי עבודות בבת אחת: הוא מונע מקורס להצטרף לעצמו (כי המזהה אינו גדול מעצמו), והוא משאיר מכל זוג רק כיוון אחד. במונגו $lookup על אותו אוסף עושה את הצירוף, ואת ההשוואה בין שני שדות של אותו מסמך חייבים לכתוב ב-$expr.',
  trap:'שימוש ב-<> (שונה) במקום > מחזיר כל זוג פעמיים, בשני הכיוונים. מלכודת שנייה: במונגו אי אפשר להשוות שני שדות בפילטר רגיל — { credits: "$same.credits" } מחפש את המחרוזת עצמה; חייבים $expr.',
  compare:'ב-SQL צירוף עצמי הוא רק עניין של כינויים, ובמונגו הוא דורש גם $lookup על אותו אוסף וגם $expr כדי להשוות שדה לשדה — ולכן הוא אחד הדפוסים שבהם הפער בין הגישות גדול במיוחד.' });

add({ id:'B-35', pattern:'self-join', difficulty:3, kind:'select',
  cols:['departmentId','studentA','studentB'],
  q:'הציגו את כל זוגות הסטודנטים הלומדים באותה מחלקה — מזהה המחלקה, מזהה הסטודנט הראשון ומזהה הסטודנט השני. כל זוג פעם אחת בלבד ובלי לצרף סטודנט לעצמו. מיינו לפי מזהה המחלקה, ואז לפי המזהה הראשון, ואז לפי השני.',
  keywords:'"זוגות סטודנטים באותה מחלקה" ← צירוף עצמי על Students. "כל זוג פעם אחת ובלי לצרף סטודנט לעצמו" ← b.studentId > a.studentId.',
  sql:`SELECT a.departmentId, a.studentId AS studentA, b.studentId AS studentB\nFROM Students a\nJOIN Students b ON b.departmentId = a.departmentId\n               AND b.studentId    > a.studentId\nORDER BY a.departmentId ASC, a.studentId ASC, b.studentId ASC;`,
  mongo:`db.students.aggregate([\n  { $lookup: { from: "students", localField: "departmentId", foreignField: "departmentId", as: "peer" } },\n  { $unwind: "$peer" },\n  { $match: { $expr: { $gt: ["$peer.studentId", "$studentId"] } } },\n  { $project: { _id: 0, departmentId: 1, studentA: "$studentId", studentB: "$peer.studentId" } },\n  { $sort: { departmentId: 1, studentA: 1, studentB: 1 } }\n])`,
  logic:'התשובה היא כל הזוגות הלא-מסודרים בתוך כל מחלקה: מחלקה עם 6 סטודנטים נותנת 15 זוגות, עם 3 נותנת 3, ועם 2 נותנת 1 — סך הכול 22 שורות. התנאי על אי-שוויון המזהים הוא מה שהופך צירוף של "כל אחד עם כולם" לרשימת זוגות נקייה.',
  trap:'בלי שום תנאי אי-שוויון מקבלים 50 שורות: כל סטודנט מול עצמו וכל זוג פעמיים. מלכודת שנייה: שימוש ב-<> מוריד רק את הסטודנט מול עצמו ומשאיר 44 שורות — כלומר כל זוג עדיין פעמיים.',
  compare:'הסינון של הכפילות נעשה בשתי הגישות בדיוק באותה דרך — תנאי אי-שוויון על המזהה — אבל במונגו הוא חייב לעבור דרך $expr, כי השוואת שדה לשדה אינה חלק מתחביר הפילטר הרגיל.' });

/* ---------- insert ---------- */
add({ id:'B-36', pattern:'insert', difficulty:1, kind:'state', stateTable:'Enrollments',
  q:'רשמו את הסטודנט S109 למחזור הקורס O508. מזהה ההרשמה הוא E9002, תאריך ההרשמה 25/10/2026, ועדיין אין ציון.',
  keywords:'"רשמו את … למחזור" ← INSERT לטבלת ההרשמות (ולא עדכון של טבלה אחרת). "עדיין אין ציון" ← grade = NULL במפורש, ולא 0 ולא השמטת השדה.',
  sql:`INSERT INTO Enrollments (enrollmentId, studentId, offeringId, grade, enrolledAt)\nVALUES ('E9002', 'S109', 'O508', NULL, '2026-10-25');`,
  mongo:`db.enrollments.insertOne({\n  enrollmentId: "E9002",\n  studentId:    "S109",\n  offeringId:   "O508",\n  grade:        null,\n  enrolledAt:   ISODate("2026-10-25")\n})`,
  logic:'הרשמה היא שורה חדשה בטבלה המקשרת, לא שינוי בסטודנט ולא שינוי במחזור. מציינים את רשימת העמודות במפורש כדי שהפקודה תמשיך לעבוד גם אם סדר העמודות בטבלה ישתנה. במונגו המסמך נכתב כאובייקט אחד, והתאריך חייב להיות ISODate ולא מחרוזת.',
  trap:'כתיבת grade = 0 במקום NULL. אפס הוא ציון כושל אמיתי, ו-NULL הוא "עדיין לא נקבע" — שני נתונים שונים לגמרי, וכל חישוב ממוצע יראה את ההבדל. מלכודת שנייה: במונגו להשמיט את שדה grade לגמרי — המסמך יהיה שונה במבנה מכל שאר המסמכים באוסף, מה שפוגע בדוחות.',
  compare:'ב-SQL מבנה השורה נאכף על ידי הסכמה, ואילו במונגו שום דבר לא מונע ממך להשמיט שדה או לאיית אותו אחרת — ולכן האחידות היא אחריות המתכנת.' });

add({ id:'B-37', pattern:'insert', difficulty:2, kind:'state', stateTable:'Students',
  q:'הוסיפו סטודנטית חדשה: מזהה S114, שם "Noga Tal", אימייל noga.t@ono.ac.il, מחלקה D30.',
  keywords:'"הוסיפו סטודנטית חדשה" ← INSERT לטבלת Students. כל ארבעת השדות נתונים במפורש, ולכן אין כאן NULL.',
  sql:`INSERT INTO Students (studentId, name, email, departmentId)\nVALUES ('S114', 'Noga Tal', 'noga.t@ono.ac.il', 'D30');`,
  mongo:`db.students.insertOne({\n  studentId:    "S114",\n  name:         "Noga Tal",\n  email:        "noga.t@ono.ac.il",\n  departmentId: "D30"\n})`,
  logic:'שורה אחת חדשה. departmentId הוא מפתח זר ל-Departments, ולכן ב-SQL אי אפשר להכניס מחלקה שאינה קיימת — המנוע יסרב. במונגו אין מפתחות זרים: המסמך ייכנס גם אם D30 לא קיים בכלל, והבדיקה הזו היא באחריות האפליקציה.',
  trap:'במונגו המסמך יקבל _id אוטומטי, ולכן studentId אינו המפתח הראשוני אלא שדה רגיל — ואין שום דבר שמונע הכנסה של שני סטודנטים עם אותו studentId. כדי להגן צריך unique index על השדה. מלכודת שנייה: ב-SQL להשמיט את רשימת העמודות ולסמוך על הסדר — זה שביר.',
  compare:'ההוספה עצמה כמעט זהה, וכל ההבדל הוא במה שהמנוע מבטיח: SQL בודק טיפוסים, מפתח ראשי ומפתחות זרים, ומונגו מקבל כמעט כל מסמך.' });

/* ---------- update-conditional ---------- */
add({ id:'B-38', pattern:'update-conditional', difficulty:2, kind:'state', stateTable:'Enrollments',
  q:'קבעו ציון 0 לכל ההרשמות של מחזור הקורס O505 שאין בהן ציון (הציון הוא NULL). אין לשנות הרשמות שכבר יש בהן ציון.',
  keywords:'"שאין בהן ציון" ← grade IS NULL כתנאי ב-WHERE. "אין לשנות הרשמות שכבר יש בהן ציון" ← התנאי חייב להיות חלק מהפקודה, לא בדיקה נפרדת.',
  sql:`UPDATE Enrollments\nSET grade = 0\nWHERE offeringId = 'O505' AND grade IS NULL;`,
  mongo:`db.enrollments.updateMany(\n  { offeringId: "O505", grade: null },\n  { $set: { grade: 0 } }\n)`,
  logic:'שני תנאים ב-WHERE: גם המחזור הנכון וגם ציון חסר. במחזור O505 יש ארבע הרשמות, שתיים מהן בלי ציון — ולכן בדיוק שתיים משתנות. במונגו updateMany מעדכן את כל ההתאמות, ו-updateOne היה מעדכן רק את הראשונה.',
  trap:'שימוש ב-updateOne במקום updateMany — התוצאה תיראה סבירה אבל רק הרשמה אחת תתעדכן. מלכודת שנייה: במונגו grade: null תופס גם מסמכים שבהם השדה חסר לגמרי; אם רוצים רק "קיים אבל null" צריך { grade: { $type: "null" } }.',
  compare:'ב-SQL אין ספק כמה שורות יתעדכנו — כל מה שעונה ל-WHERE — ואילו במונגו זו החלטה שלך בין updateOne ל-updateMany, וזו אחת הטעויות הנפוצות ביותר.' });

add({ id:'B-39', pattern:'update-conditional', difficulty:2, kind:'state', stateTable:'CourseOfferings',
  q:'הגדילו ב-10 את הקיבולת של כל מחזורי הקורס של סמסטר 2026A שהקיבולת הנוכחית שלהם קטנה מ-30.',
  keywords:'"הגדילו ב-10" ← עדכון יחסי: capacity = capacity + 10 ב-SQL, ו-$inc במונגו. "קטנה מ-30" ← < ולא <=.',
  sql:`UPDATE CourseOfferings\nSET capacity = capacity + 10\nWHERE semester = '2026A' AND capacity < 30;`,
  mongo:`db.courseOfferings.updateMany(\n  { semester: "2026A", capacity: { $lt: 30 } },\n  { $inc: { capacity: 10 } }\n)`,
  logic:'"הגדילו ב-" אינו קביעת ערך אלא חישוב על הערך הקיים. ב-SQL כותבים את העמודה בשני צדי ההשוואה; במונגו יש אופרטור מיועד לכך, $inc, שמוסיף בצורה אטומית. בנתונים שני מחזורים עונים לתנאי: O502 עם 25 ו-O504 עם 20.',
  trap:'שימוש ב-$set במקום ב-$inc — { $set: { capacity: 10 } } יקבע את הקיבולת ל-10 במקום להוסיף 10, כלומר יקטין אותה. מלכודת שנייה: שלושה מחזורים עם קיבולת 30 בדיוק אינם אמורים להשתנות, ולכן <= 30 הוא תשובה שגויה.',
  compare:'$inc הוא פעולה אטומית על השדה, ובאותה מידה גם capacity = capacity + 10 ב-SQL — בשתי הגישות אין צורך לקרוא את הערך קודם, וזה בדיוק מה שמונע התנגשות בין שני משתמשים.' });

/* ---------- update-from-other ---------- */
add({ id:'B-40', pattern:'update-from-other', difficulty:3, kind:'state', stateTable:'Enrollments',
  q:'הוסיפו 2 נקודות לציון של כל ההרשמות שיש בהן ציון, במחזורי קורס של סמסטר 2026A שמשתייכים לקורסים של מחלקה D10. אם נדרשת שאילתת עזר לאיתור מזהי המחזורים — יש להציג אותה.',
  keywords:'"במחזורי קורס … שמשתייכים לקורסים של מחלקה D10" ← התנאי מגיע משתי טבלאות אחרות, ולכן נדרשת תת-שאילתה עם צירוף פנימי. "שיש בהן ציון" ← הגנה על NULL.',
  helper:`SELECT o.offeringId\nFROM CourseOfferings o\nJOIN Courses c ON c.courseId = o.courseId\nWHERE o.semester = '2026A' AND c.departmentId = 'D10';\n-- מחזיר: O501, O502, O503, O504, O505`,
  sql:`UPDATE Enrollments\nSET grade = grade + 2\nWHERE grade IS NOT NULL\n  AND offeringId IN (\n    SELECT o.offeringId\n    FROM CourseOfferings o\n    JOIN Courses c ON c.courseId = o.courseId\n    WHERE o.semester = '2026A' AND c.departmentId = 'D10'\n  );`,
  mongo:`var offs = db.courseOfferings.aggregate([\n  { $match: { semester: "2026A" } },\n  { $lookup: { from: "courses", localField: "courseId", foreignField: "courseId", as: "c" } },\n  { $unwind: "$c" },\n  { $match: { "c.departmentId": "D10" } },\n  { $project: { _id: 0, offeringId: 1 } }\n]).map(o => o.offeringId);\n\ndb.enrollments.updateMany(\n  { offeringId: { $in: offs }, grade: { $ne: null } },\n  { $inc: { grade: 2 } }\n)`,
  logic:'התנאי של העדכון אינו קיים בטבלה שמתעדכנת: המחלקה שמורה ב-Courses והסמסטר ב-CourseOfferings. ב-SQL פותרים זאת בתת-שאילתה שמצרפת את שתי הטבלאות ומחזירה רשימת מזהי מחזורים, וה-IN מצמצם את העדכון אליהם. במונגו אין תת-שאילתות, ולכן שאילתת העזר היא פקודה נפרדת שתוצאתה נשמרת במשתנה.',
  trap:'השמטת grade IS NOT NULL — ב-SQL NULL + 2 נשאר NULL ולכן אין נזק, אבל במונגו $inc על שדה null הופך אותו למספר 2, וחמש הרשמות "ללא ציון" יקבלו פתאום ציון. זו דוגמה למקרה שבו אותה פקודה מתנהגת אחרת בשני המנועים. מלכודת שנייה: לכלול גם מחזורים של 2025B — O509 הוא C20 של מחלקה D10 אבל בסמסטר הלא נכון.',
  compare:'תת-השאילתה הופכת את העדכון ב-SQL לפקודה אטומית אחת, ואילו במונגו יש שאילתה ואחריה פקודה — שתי פעולות שביניהן הנתונים יכולים להשתנות.' });

add({ id:'B-41', pattern:'update-from-other', difficulty:2, kind:'state', stateTable:'ExamResults',
  q:'הוסיפו 3 נקודות לציון בכל תוצאות הבחינה של בחינות מסוג Midterm.',
  keywords:'"של בחינות מסוג Midterm" ← סוג הבחינה שמור ב-Exams ולא ב-ExamResults, ולכן תת-שאילתה (או שאילתת עזר במונגו).',
  helper:`SELECT examId FROM Exams WHERE examType = 'Midterm';\n-- מחזיר: X903`,
  sql:`UPDATE ExamResults\nSET score = score + 3\nWHERE examId IN (SELECT examId FROM Exams WHERE examType = 'Midterm');`,
  mongo:`var ex = db.exams.find({ examType: "Midterm" }, { _id: 0, examId: 1 })\n          .map(x => x.examId);\n\ndb.examResults.updateMany(\n  { examId: { $in: ex } },\n  { $inc: { score: 3 } }\n)`,
  logic:'סוג הבחינה אינו משוכפל לתוך שורות התוצאות, ולכן אי אפשר לסנן אותו ישירות. התת-שאילתה מחזירה את מזהי הבחינות המתאימות (כאן X903 בלבד), וה-IN מגביל את העדכון ל-10 התוצאות שלה. במונגו אותו דבר בשתי פקודות, עם map שמוציא מערך מחרוזות.',
  trap:'עדכון כל ה-ExamResults בלי התנאי — 34 שורות במקום 10, ובפקודת עדכון אין "בטל". טיפ בטיחות: להריץ קודם את אותו תנאי בתוך SELECT כדי לראות מה עומד להשתנות. מלכודת שנייה: במונגו לשכוח את ה-map ולהעביר ל-$in מערך של מסמכים — אז לא יתעדכן דבר, בשקט.',
  compare:'השאלה "לעדכן לפי נתון שיושב בטבלה אחרת" היא בדיוק מה ש-SQL נבנה בשבילו, ובמונגו היא תמיד מתפרקת לשתי פעולות — מה שמחייב לשאול מה קורה אם משהו משתנה ביניהן.' });

/* ---------- delete-conditional ---------- */
add({ id:'B-42', pattern:'delete-conditional', difficulty:2, kind:'state', stateTable:'Enrollments',
  q:'מחקו את כל ההרשמות שאין בהן ציון (הציון הוא NULL) ושתאריך ההרשמה שלהן לפני 2 בפברואר 2026. אין למחוק הרשמות שיש בהן ציון.',
  keywords:'"שאין בהן ציון" ← IS NULL. "לפני 2 בפברואר" ← < ולא <=, ולכן ה-2 בפברואר עצמו אינו נמחק. שני התנאים מחוברים ב-AND.',
  sql:`DELETE FROM Enrollments\nWHERE grade IS NULL AND enrolledAt < '2026-02-02';`,
  mongo:`db.enrollments.deleteMany({\n  grade:      null,\n  enrolledAt: { $lt: ISODate("2026-02-02") }\n})`,
  logic:'בנתונים יש חמש הרשמות בלי ציון, אבל רק שתיים מהן לפני 2 בפברואר (E1019 ו-E1028) — ולכן נמחקות שתיים בלבד ונשארות 33 שורות. שני התנאים חייבים להיות באותה פקודה; פיצול לשתי פקודות היה מוחק יותר מדי.',
  trap:'כתיבת <= במקום < מוחקת גם את E1029 מ-2 בפברואר. מלכודת שנייה: מחיקה היא פעולה שאי אפשר לבטל, ולכן תמיד כדאי להריץ קודם SELECT עם אותו WHERE בדיוק ולראות מה עומד להימחק — זה לוקח 10 שניות ומציל שאלה שלמה.',
  compare:'בשתי הגישות המחיקה היא פקודה אחת עם אותם שני תנאים, אבל במונגו הטיפוס של הערך הוא חלק מהתנאי — ISODate ולא מחרוזת — ואילו ב-SQL ההשוואה לתאריך סובלנית יותר.' });

add({ id:'B-43', pattern:'delete-conditional', difficulty:3, kind:'state', stateTable:'ExamResults',
  q:'מחקו את כל תוצאות הבחינה שהציון בהן נמוך מ-70 ושהבחינה שלהן היא מסוג Final. אין למחוק תוצאות של בחינות אחרות. אם נדרשת שאילתת עזר — יש להציג אותה.',
  keywords:'"מסוג Final" ← סוג הבחינה שמור ב-Exams, ולכן תת-שאילתה. "נמוך מ-70" ← < 70. "אין למחוק תוצאות של בחינות אחרות" ← הגנה מפורשת מפני מחיקה רחבה מדי.',
  helper:`SELECT examId FROM Exams WHERE examType = 'Final';\n-- מחזיר: X901, X902, X904`,
  sql:`DELETE FROM ExamResults\nWHERE score < 70\n  AND examId IN (SELECT examId FROM Exams WHERE examType = 'Final');`,
  mongo:`var ex = db.exams.find({ examType: "Final" }, { _id: 0, examId: 1 })\n          .map(x => x.examId);\n\ndb.examResults.deleteMany({\n  score:  { $lt: 70 },\n  examId: { $in: ex }\n})`,
  logic:'שני תנאים: אחד על השורה עצמה והשני על טבלה אחרת. בנתונים יש שש תוצאות מתחת ל-70, וכולן שייכות לבחינות Final — אבל זה נכון רק במקרה, ובלי התנאי על סוג הבחינה הפקודה הייתה לא נכונה לוגית. נשארות 28 תוצאות.',
  trap:'השמטת התנאי על סוג הבחינה. בנתוני הדוגמה התוצאה יוצאת זהה, ולכן הטעות אינה נראית — אבל בנתונים אמיתיים היא תמחק גם תוצאות Midterm. במבחן שופטים את הלוגיקה, לא רק את המספר. מלכודת שנייה: במונגו לשכוח ש-deleteOne מוחק רק מסמך אחד.',
  compare:'ב-SQL התת-שאילתה הופכת את המחיקה לפקודה אחת אטומית, ואילו במונגו רשימת המזהים נקראת רגע לפני המחיקה — ואם בחינה שינתה סוג בינתיים, נמחק הדבר הלא נכון.' });

/* ---------- nested-aggregate ---------- */
add({ id:'B-44', pattern:'nested-aggregate', difficulty:3, kind:'select',
  cols:['maxEnrollments'],
  q:'מהו מספר ההרשמות הגדול ביותר שיש למחזור קורס בודד? הציגו מספר אחד בעמודה בשם maxEnrollments.',
  keywords:'"הגדול ביותר … למחזור בודד" ← מקסימום של ספירות, כלומר אגרגציה על תוצאת אגרגציה: קודם סופרים לכל מחזור, ואז לוקחים את המקסימום.',
  sql:`SELECT MAX(c) AS maxEnrollments\nFROM (SELECT COUNT(*) AS c FROM Enrollments GROUP BY offeringId) t;`,
  mongo:`db.enrollments.aggregate([\n  { $group: { _id: "$offeringId", c: { $sum: 1 } } },\n  { $group: { _id: null, maxEnrollments: { $max: "$c" } } },\n  { $project: { _id: 0, maxEnrollments: 1 } }\n])`,
  logic:'אי אפשר לכתוב MAX(COUNT(*)) — פונקציית קיבוץ אינה יכולה לעטוף פונקציית קיבוץ אחרת. ב-SQL פותרים זאת בתת-שאילתה ב-FROM: השאילתה הפנימית מייצרת טבלה של ספירות, והחיצונית לוקחת ממנה את המקסימום. במונגו זה פשוט שני שלבי $group זה אחרי זה — הראשון סופר, השני ממקסם.',
  trap:'כתיבת SELECT MAX(COUNT(*)) FROM Enrollments GROUP BY offeringId — שגיאת מנוע. מלכודת שנייה: לשכוח את הכינוי לתת-השאילתה (ה-t אחרי הסוגר) — ב-SQL Server וב-SQLite טבלה נגזרת חייבת שם.',
  compare:'הצינור של מונגו מתאים לשאלה הזו באופן טבעי — אגרגציה על אגרגציה היא עוד שלב — ואילו ב-SQL נדרשת תת-שאילתה ב-FROM, שהיא הדרך של SQL לשרשר שלבים.' });

add({ id:'B-45', pattern:'nested-aggregate', difficulty:4, kind:'select',
  cols:['offeringId','enrollCount'],
  q:'הציגו את מחזור הקורס שיש אליו מספר ההרשמות הגדול ביותר — מזהה המחזור ומספר ההרשמות. אם יש כמה מחזורים עם אותו מספר מקסימלי, הציגו את כולם. מיינו לפי מזהה המחזור.',
  keywords:'"אם יש כמה … הציגו את כולם" ← אסור להסתפק ב-TOP 1 / limit(1); צריך להשוות את הספירה למקסימום, כלומר HAVING מול תת-שאילתה.',
  sql:`SELECT offeringId, COUNT(*) AS enrollCount\nFROM Enrollments\nGROUP BY offeringId\nHAVING COUNT(*) = (SELECT MAX(c) FROM (SELECT COUNT(*) AS c FROM Enrollments GROUP BY offeringId) t)\nORDER BY offeringId ASC;`,
  mongo:`var mx = db.enrollments.aggregate([\n  { $group: { _id: "$offeringId", c: { $sum: 1 } } },\n  { $group: { _id: null, m: { $max: "$c" } } }\n]).toArray()[0].m;\n\ndb.enrollments.aggregate([\n  { $group: { _id: "$offeringId", enrollCount: { $sum: 1 } } },\n  { $match: { enrollCount: mx } },\n  { $project: { _id: 0, offeringId: "$_id", enrollCount: 1 } },\n  { $sort: { offeringId: 1 } }\n])`,
  logic:'כאן יש שתי אגרגציות מקוננות וגם סינון קבוצות לפי תוצאתן. התת-שאילתה הפנימית מחשבת את הספירה המקסימלית (6), וה-HAVING משאיר רק את הקבוצות ששוות לה. במונגו מחשבים את המקסימום בפקודה ראשונה, ואז מסננים עם $match אחרי ה-$group — זה ה-HAVING של מונגו.',
  trap:'שימוש ב-TOP 1 / limit(1) אחרי מיון יורד. בנתוני הדוגמה יש מחזור מוביל יחיד ולכן התשובה תצא נכונה במקרה — אבל השאלה דרשה במפורש להציג את כולם בתיקו, וזו הלוגיקה שנבדקת. מלכודת שנייה: לשים את ה-$match לפני ה-$group — אז הוא יסנן הרשמות בודדות ולא קבוצות.',
  compare:'השאלה "מי המקסימום, כולל תיקו" חושפת את ההבדל הכי עמוק בין הגישות: ב-SQL היא פקודה אחת עם תת-שאילתה מקוננת, ובמונגו היא שתי פקודות שביניהן משתנה — ולכן התשובה אינה אטומית.' });

return { questions: Q };
})();

if(typeof module !== 'undefined' && module.exports) module.exports = window.EXAM2BANK;
