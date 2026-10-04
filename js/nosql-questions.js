/* ============================================================
   קורס 3964 — MongoDB / NoSQL — בוחן אמריקאי
   נטען אחרי sql-questions.js ומצטרף ל-SQLC.quiz.
   מבוסס על: דף "פקודות חשובות ב-NoSQL" של המרצה, שיעור ה-NoSQL
   (Embedding/Referencing, enrollments, מערכים לא חסומים, grade=null)
   ועבודת "ישור קו" (SQL + NoSQL על מערכת המכללה).
   שאלות קריאת-קוד חושבו בהרצה על נתוני college2 (MongoSim).
   הטקסט מוצג כטקסט רגיל (escaped) — בלי HTML.
   בסוף הקובץ: תיקון כיווניות (bidi) — קטעי קוד באנגלית בתוך טקסט עברי
   מוקפים בסימן LRM בלתי נראה, כדי ש-$ וסוגריים לא "יקפצו" לצד הלא נכון.
   ============================================================ */
window.SQLC = window.SQLC || {};

(function(){
var Q = [

  /* ---------------- nosql-basics ---------------- */
  { topic:'nosql-basics', q:'במעבר מ-SQL ל-MongoDB, מה המקבילה של "שורה" (Row) בטבלה?',
    options:['Document','Field','Collection','Database'], correct:0,
    explain:'טבלה ↔ Collection, שורה ↔ Document (מסמך), עמודה ↔ Field (שדה). כל מסמך הוא אובייקט בסגנון JSON.' },

  { topic:'nosql-basics', q:'מה קורה כשמכניסים מסמך עם insertOne בלי לציין את השדה _id?',
    options:['הפקודה נכשלת, כי חובה לכתוב _id בכל מסמך חדש שמוכנס','נוצר _id ייחודי (ObjectId) באופן אוטומטי','המסמך נשמר בלי מפתח ראשי, ואפשר להוסיף אחר כך','השדה _id נשמר עם הערך null כברירת מחדל'], correct:1,
    explain:'לכל מסמך חייב להיות _id ייחודי — זה המפתח הראשי של ה-Collection. אם לא מציינים אותו, MongoDB מייצר ObjectId אוטומטית. (בנתוני התרגול באתר ה-_id מספרי 1,2,3… לשם קריאות.)' },

  { topic:'nosql-basics', q:'מה הכוונה ב"סכמה גמישה" (Flexible Schema) ב-MongoDB?',
    options:['כל שדה יכול להכיל רק סוג נתון אחד שנקבע מראש','חובה להגדיר את מבנה ה-Collection לפני כל הכנסה','מסמכים באותו Collection יכולים להכיל שדות שונים','אפשר לשנות את שם ה-Collection רק דרך ALTER TABLE'], correct:2,
    explain:'אין CREATE TABLE עם עמודות קבועות: מסמך אחד יכול להכיל phone ומסמך אחר לא — בלי ALTER TABLE. בגלל זה צריך זהירות בשאילתות: שדה חסר אינו אותו דבר כמו שדה שערכו null.' },

  { topic:'nosql-basics', q:'לאיזה סוג של מסד NoSQL שייך MongoDB?',
    options:['Key-Value (מפתח-ערך)','Graph (גרפים)','Column-Family (עמודות)','Document (מסמכים)'], correct:3,
    explain:'MongoDB הוא מסד מסמכים: הנתונים נשמרים כמסמכים (BSON) בתוך Collections. Redis הוא Key-Value, Neo4j הוא Graph ו-Cassandra היא Column-Family.' },

  { topic:'nosql-basics', q:'מה עושה הפקודה use college ב-Mongo Shell כשמסד בשם college עדיין לא קיים?',
    options:['עוברת אליו; הוא נוצר רק כשנשמרים בו נתונים','מחזירה שגיאה, כי אפשר לעבור רק למסד שכבר קיים בשרת','יוצרת מסד ריק עם כל ה-Collections של המכללה','מוחקת את המסד הנוכחי ויוצרת במקומו מסד חדש'], correct:0,
    explain:'use מחליף את ה-db הנוכחי. MongoDB יוצר מסד ו-Collection "בעצלות" — רק בהכנסה הראשונה. גם Collection שלא קיים נוצר אוטומטית ב-insertOne הראשון אליו.' },

  { topic:'nosql-basics', q:'איך כותבים ב-Mongo Shell תאריך קבוע, כמו enrollmentDate בעבודת "ישור קו"?',
    options:['enrollmentDate: DATE "2025-10-01"','enrollmentDate: CAST("2025-10-01" AS DATE)','enrollmentDate: GETDATE("2025-10-01")','enrollmentDate: ISODate("2025-10-01")'], correct:3,
    explain:'ב-Shell יוצרים תאריך עם ISODate("YYYY-MM-DD") או new Date("YYYY-MM-DD"); new Date() בלי ארגומנט = התאריך הנוכחי. CAST ו-GETDATE שייכות ל-T-SQL.' },

  { topic:'nosql-basics', q:'באיזה פורמט MongoDB שומר את המסמכים בפועל?',
    options:['CSV — שורות עם ערכים מופרדים בפסיקים','BSON — ייצוג בינארי של JSON','XML — תגיות פותחות וסוגרות','טבלאות עם עמודות קבועות מראש'], correct:1,
    explain:'כותבים מסמכים בתחביר דמוי JSON, והם נשמרים כ-BSON (Binary JSON) — שתומך גם בסוגים כמו Date, ObjectId ומספרים שלמים/עשרוניים.' },

  { topic:'nosql-basics', q:'מה מציגה הפקודה show collections?',
    options:['את רשימת כל מסדי הנתונים שבשרת','את כל המסמכים מכל ה-Collections','את ה-Collections שבמסד הנוכחי','את מבנה השדות (הסכמה) של כל Collection'], correct:2,
    explain:'show collections מציגה את שמות ה-Collections במסד שנבחר ב-use. show dbs מציגה את מסדי הנתונים. אין ב-MongoDB "סכמה" קבועה להצגה.' },

  /* ---------------- nosql-crud ---------------- */
  { topic:'nosql-crud', q:'יש 3 סטודנטים מ-Tel Aviv. מה יקרה בהרצת db.students.updateOne({city:"Tel Aviv"}, {$set:{region:"Center"}})?',
    options:['רק המסמך הראשון שמתאים לתנאי יעודכן','תתקבל שגיאה, כי יותר ממסמך אחד מתאים לתנאי','כל 3 הסטודנטים מ-Tel Aviv יעודכנו','רק המסמך האחרון שמתאים לתנאי יעודכן'], correct:0,
    explain:'updateOne מעדכנת רק את המסמך הראשון שמתאים לתנאי (matchedCount: 1). כדי לעדכן את כל המתאימים משתמשים ב-updateMany — המקבילה של UPDATE … WHERE ב-SQL.' },

  { topic:'nosql-crud', q:'מה תחזיר db.students.updateMany({city:"Tel Aviv"}, {$set:{region:"Center"}}) על נתוני המכללה?',
    options:['{ matchedCount: 1, modifiedCount: 1 }','{ matchedCount: 3, modifiedCount: 0 }','{ matchedCount: 10, modifiedCount: 3 }','{ matchedCount: 3, modifiedCount: 3 }'], correct:3,
    explain:'יש 3 סטודנטים מ-Tel Aviv (David, Maya, Itai). updateMany מעדכנת את כולם, ו-$set מוסיף להם את השדה החדש region — לכן גם matched וגם modified שווים 3.' },

  { topic:'nosql-crud', q:'מה ההבדל בין replaceOne לבין updateOne עם $set?',
    options:['replaceOne מחליפה את כל המסמך (חוץ מ-_id); $set משנה רק את השדות שצוינו','אין הבדל — שתיהן משנות רק את השדות שנכתבו בפקודה','replaceOne מעדכנת את כל המסמכים המתאימים, ו-updateOne רק את הראשון','$set מוחקת את כל שאר השדות, ו-replaceOne שומרת עליהם כמו שהם'], correct:0,
    explain:'replaceOne מקבלת מסמך שלם ומחליפה בו את המסמך הקיים — כל שדה שלא נכתב נעלם (ה-_id נשמר). updateOne עם $set משנה או מוסיף רק את השדות שבתוך ה-$set.' },

  { topic:'nosql-crud', q:'אחרי db.students.replaceOne({_id:2}, {firstName:"Noa", city:"Eilat"}), אילו שדות יהיו במסמך 2?',
    options:['כל השדות הקודמים, עם city מעודכן','_id, firstName ו-city בלבד','firstName ו-city בלבד, בלי _id','הפקודה נכשלת כי חסר בה $set'], correct:1,
    explain:'replaceOne מחליפה את המסמך כולו: lastName, email, age וכו\' נעלמים, וה-_id נשמר תמיד. כדי לשנות רק את העיר משתמשים ב-updateOne עם $set.' },

  { topic:'nosql-crud', q:'מה קורה בהרצת db.students.updateOne({_id:1}, {city:"Eilat"})?',
    options:['העיר של סטודנט 1 משתנה ל-Eilat','מתקבלת שגיאה: עדכון חייב אופרטור כמו $set','המסמך כולו מוחלף במסמך החדש { city: "Eilat" }','נוסף מסמך חדש שבו city: "Eilat"'], correct:1,
    explain:'בפקודות update חובה להשתמש באופרטור עדכון ($set, $inc…). בלי אופרטור mongosh מחזיר שגיאה ("Update document requires atomic operators"). להחלפת מסמך שלם יש replaceOne.' },

  { topic:'nosql-crud', q:'ב-students יש 10 מסמכים, 2 מהם מ-Haifa. כמה מסמכים יישארו אחרי db.students.deleteOne({city:"Haifa"})?',
    options:['9','10','8','0'], correct:0,
    explain:'deleteOne מוחקת רק את המסמך הראשון שמתאים לתנאי, ולכן נשארים 9. deleteMany({city:"Haifa"}) הייתה מוחקת את שניהם (deletedCount: 2).' },

  { topic:'nosql-crud', q:'מה ההבדל בין countDocuments() לבין estimatedDocumentCount()?',
    options:['estimated מקבלת תנאי, ו-countDocuments סופרת תמיד את כל המסמכים ב-Collection','countDocuments מקבלת תנאי וסופרת בדיוק; estimated היא ספירה מהירה בלי תנאי','שתיהן זהות לגמרי, ו-estimated היא רק שם ישן של אותה פקודה','countDocuments מחזירה מערך של מסמכים, ו-estimated מחזירה רק מספר'], correct:1,
    explain:'לפי דף הפקודות: countDocuments() סופרת כמה מסמכים עומדים בתנאי (כמו COUNT(*) עם WHERE). estimatedDocumentCount() היא הערכה מהירה של גודל כל ה-Collection, ללא תנאי.' },

  { topic:'nosql-crud', q:'מה מחזירה db.students.find({city:"Tel Aviv"}, {firstName:1, _id:0})?',
    options:['3 מסמכים, שבכל אחד רק השדה firstName','3 מסמכים, שבכל אחד firstName ו-_id','מסמך אחד בלבד: { firstName: "David" }','10 מסמכים, שבכל אחד רק השדה firstName'], correct:0,
    explain:'הארגומנט הראשון הוא התנאי (3 סטודנטים מ-Tel Aviv), והשני הוא projection: 1 = להציג, _id:0 = להסתיר את _id (שמוצג כברירת מחדל). התוצאה: David, Maya, Itai.' },

  { topic:'nosql-crud', q:'מה מחזירה db.students.find().sort({age:-1}).limit(2)?',
    options:['את 2 המבוגרים ביותר: Itai ו-Eyal','את 2 הצעירים ביותר: Shira ו-Noa','את 2 המסמכים הראשונים שהוכנסו','את כל הסטודנטים, מהמבוגר ביותר לצעיר'], correct:0,
    explain:'-1 = מיון יורד (מהגדול לקטן), ו-limit(2) לוקח את 2 הראשונים: Itai (27) ו-Eyal (26). זו המקבילה של SELECT TOP 2 … ORDER BY age DESC.' },

  { topic:'nosql-crud', q:'מי יוחזר מ-db.students.find().sort({age:1}).skip(1).limit(1)?',
    options:['Shira (גיל 20)','Maya (גיל 22)','Itai (גיל 27)','Noa (גיל 21)'], correct:3,
    explain:'מיון עולה: Shira (20), Noa (21), Lior/Maya (22)… skip(1) מדלג על הראשונה ו-limit(1) לוקח מסמך אחד — Noa. השילוב skip + limit משמש לדפדוף (Pagination).' },

  { topic:'nosql-crud', q:'מה מחזירה db.students.findOneAndUpdate({_id:1}, {$set:{city:"Eilat"}}) כשלא מעבירים אפשרויות נוספות?',
    options:['את המסמך אחרי העדכון (city: "Eilat")','אובייקט { matchedCount: 1, modifiedCount: 1 }','את המסמך לפני העדכון (city: "Tel Aviv")','רק את הערך החדש של השדה: "Eilat"'], correct:2,
    explain:'findOneAndUpdate מוצאת, מעדכנת ומחזירה את המסמך עצמו (ולא סטטיסטיקה כמו updateOne). כברירת מחדל מוחזר המסמך כפי שהיה לפני השינוי; לגרסה החדשה מוסיפים { returnNewDocument: true }.' },

  /* ---------------- nosql-operators ---------------- */
  { topic:'nosql-operators', q:'איזו מהפקודות כתובה נכון?',
    options:['db.submissions.find({ $gt: { grade: 80 } })','db.students.updateOne({_id:1}, { age: { $set: 21 } })','db.submissions.find({ grade: { $gt: 80 } })','db.students.updateOne({_id:1}, { $set: 21 })'], correct:2,
    explain:'כלל מדף הפקודות: אופרטור סינון נכתב בתוך השדה — { grade: { $gt: 80 } }. אופרטור עדכון נכתב בחוץ, לפני השדה — { $set: { age: 21 } }.' },

  { topic:'nosql-operators', q:'כמה מסמכים תחזיר db.students.countDocuments({city: {$in: ["Haifa","Jerusalem"]}})?',
    options:['2','6','0','4'], correct:3,
    explain:'Haifa: Noa, Shira; Jerusalem: Yossi, Eyal — סה"כ 4. $in = "נמצא בתוך רשימה", בדיוק כמו IN ב-SQL ($nin = NOT IN).' },

  { topic:'nosql-operators', q:'כמה סטודנטים מחזירה db.students.find({$or: [{city:"Haifa"}, {age:{$gt:25}}]})?',
    options:['4','2','0','6'], correct:0,
    explain:'Haifa: Noa, Shira. גיל מעל 25: Itai (27), Eyal (26). אין חפיפה ולכן 4. ב-$or מספיק שאחד התנאים מתקיים.' },

  { topic:'nosql-operators', q:'מה המשמעות של db.students.find({city:"Tel Aviv", age:{$gt:22}})?',
    options:['סטודנטים מ-Tel Aviv, או סטודנטים בני יותר מ-22','שגיאה — חובה לכתוב $and במפורש','רק התנאי האחרון (age) נלקח בחשבון','סטודנטים מ-Tel Aviv וגם בני יותר מ-22'], correct:3,
    explain:'כמה שדות באותו אובייקט סינון = AND מובלע. כאן: David (23) ו-Itai (27). $and מפורש נחוץ בעיקר כשאותו שדה חוזר פעמיים בתנאי.' },

  { topic:'nosql-operators', q:'ב-submissions יש 16 הגשות, ו-2 מהן עדיין לא נבדקו (grade: null). מה יחזיר db.submissions.countDocuments({grade: {$exists: false}})?',
    options:['2','0','14','16'], correct:1,
    explain:'$exists בודק אם השדה קיים — וב-2 ההגשות שלא נבדקו השדה grade קיים, רק ערכו null. לכן 0. כדי למצוא אותן כותבים { grade: null } (שמוצא גם null וגם שדה חסר).' },

  { topic:'nosql-operators', q:'הציונים מתחת ל-70 בנתונים הם 60 ו-65, ויש עוד 2 הגשות עם grade: null. מה יחזיר db.submissions.countDocuments({grade: {$lt: 70}})?',
    options:['2','0','4','14'], correct:0,
    explain:'אופרטורי השוואה ($lt, $gt…) משווים רק לערכים מאותו סוג — null אינו "קטן מ-70", ולכן רק 60 ו-65 נספרים. בדומה ל-SQL, שבו NULL < 70 אינו אמת.' },

  { topic:'nosql-operators', q:'לקורס Marketing יש שיעור אחד: {title:"Market Analysis", duration:90}. מריצים עליו $addToSet עם אותו שיעור בדיוק. כמה שיעורים יהיו במערך?',
    options:['2','0','1','שגיאה'], correct:2,
    explain:'$addToSet מוסיף איבר רק אם הוא לא קיים כבר במערך (מניעת כפילויות), ולכן נשאר שיעור אחד. $push היה מוסיף אותו שוב → 2 שיעורים.' },

  { topic:'nosql-operators', q:'איזה עדכון מסיר מהמערך lessons את כל השיעורים שמשכם קצר מ-90 דקות?',
    options:['{$pop: {lessons: {duration: {$lt: 90}}}}','{$pullAll: {lessons: {duration: {$lt: 90}}}}','{$unset: {lessons: {duration: {$lt: 90}}}}','{$pull: {lessons: {duration: {$lt: 90}}}}'], correct:3,
    explain:'$pull מוחק איברים שעומדים בתנאי. $pullAll מוחק רשימת ערכים מסוימים ({$pullAll: {tags: ["a","c"]}}), $pop מוחק איבר מההתחלה (-1) או מהסוף (1), ו-$unset מוחק שדה שלם.' },

  { topic:'nosql-operators', q:'השאילתה db.courses.find({lessons: {$elemMatch: {duration: {$gte: 100}, title: {$regex: "^P"}}}}) מחזירה רק את Python. למה db.courses.find({"lessons.duration": {$gte: 100}, "lessons.title": {$regex: "^P"}}) מחזירה גם את Statistics?',
    options:['כי $regex לא תלוי ברישיות ומוצא גם p קטנה','כי בלי $elemMatch התנאים מתחברים ב-OR','כי ב-Statistics יש שיעור של 120 דקות ושיעור אחר שמתחיל ב-P','כי סימון נקודה בודק רק את השיעור הראשון במערך lessons, ולא את השאר'], correct:2,
    explain:'בלי $elemMatch כל תנאי נבדק בנפרד מול איברי המערך: ב-Statistics יש Regression (120 דק\') ו-Probability (מתחיל ב-P) — שני שיעורים שונים. $elemMatch מחייב שאותו איבר יעמוד בכל התנאים (Pandas ב-Python).' },

  { topic:'nosql-operators', q:'מה יחזיר db.courses.find({lessons: {$size: 3}}) על נתוני המכללה?',
    options:['כל הקורסים שיש להם 3 שיעורים או יותר: MongoDB, SQL Server ו-Statistics','שגיאה — $size חייב להיות משולב עם אופרטור השוואה','הקורסים עם בדיוק 3 שיעורים: SQL Server ו-Statistics','כל הקורסים שיש להם פחות מ-3 שיעורים במערך lessons'], correct:2,
    explain:'$size בודק גודל מדויק בלבד ואי אפשר לשלב בו $gte. ל"לפחות 3 שיעורים" כותבים {"lessons.2": {$exists: true}} או $expr עם $size — ואז גם MongoDB (4 שיעורים) נכלל.' },

  { topic:'nosql-operators', q:'הגיל של David הוא 23. מה יהיה גילו אחרי db.students.updateOne({_id:1}, {$min: {age: 30}})?',
    options:['30','53','null','23'], correct:3,
    explain:'$min כאופרטור עדכון משנה את הערך רק אם הערך החדש קטן מהקיים. 30 > 23 ולכן אין שינוי. {$max: {age: 30}} היה משנה ל-30, ו-{$inc: {age: 30}} היה נותן 53.' },

  { topic:'nosql-operators', q:'איך מוחקים את השדה phone (ורק אותו) מהמסמך של סטודנט 1?',
    options:['db.students.updateOne({_id:1}, {$set: {phone: null}})','db.students.updateOne({_id:1}, {$unset: {phone: ""}})','db.students.deleteOne({_id:1, phone: 1})','db.students.updateOne({_id:1}, {$pull: {phone: ""}})'], correct:1,
    explain:'$unset מוחק את השדה מהמסמך (הערך "" לא משנה). $set ל-null משאיר את השדה עם ערך null, deleteOne מוחק את כל המסמך, ו-$pull עובד רק על מערכים.' },

  /* ---------------- nosql-agg ---------------- */
  { topic:'nosql-agg', q:'כמה מסמכים יחזיר db.enrollments.aggregate([{$match:{status:"Active"}}, {$group:{_id:"$courseId", n:{$sum:1}}}, {$match:{n:{$gte:3}}}])?',
    options:['2','3','1','5'], correct:0,
    explain:'הרשמות פעילות לפי קורס: MongoDB 5, SQL Server 3, Python 2, Statistics 2 (ההרשמה של Eyal לא פעילה), Marketing 1 → רק 2 קורסים עם 3 ומעלה. בלי ה-$match הראשון גם Statistics היה נכנס (3) → 3 מסמכים.' },

  { topic:'nosql-agg', q:'למאיה (studentId 4) יש 3 הגשות: 85, 90 ו-null. מה יחזיר עבורה $group לפי studentId עם averageGrade: {$avg: "$grade"}?',
    options:['87.5','58.33','0','175'], correct:0,
    explain:'$avg מתעלם מערכי null — כמו AVG ב-SQL שמתעלם מ-NULL: (85+90)/2 = 87.5. אילו null היה נספר כ-0 הממוצע היה 58.33.' },

  { topic:'nosql-agg', q:'יש 6 קורסים עם 4, 3, 2, 1, 3 ו-0 שיעורים. כמה מסמכים יחזיר db.courses.aggregate([{$unwind: "$lessons"}])?',
    options:['13','6','14','5'], correct:0,
    explain:'$unwind יוצר מסמך נפרד לכל איבר במערך: 4+3+2+1+3 = 13. הקורס Cyber Security (מערך ריק) נעלם מהתוצאה; עם preserveNullAndEmptyArrays: true הוא היה נשאר → 14.' },

  { topic:'nosql-agg', q:'מה יחזיר db.submissions.aggregate([{$group: {_id: "courseId", n: {$sum: 1}}}])?',
    options:['5 מסמכים — מסמך אחד לכל קורס, עם מספר ההגשות שלו','שגיאה — חסר הסימן $ לפני שם השדה courseId','16 מסמכים — אחד לכל הגשה','מסמך אחד: { _id: "courseId", n: 16 }'], correct:3,
    explain:'בלי $ המחרוזת "courseId" היא ערך קבוע ולא הפניה לשדה, ולכן כל 16 ההגשות נכנסות לקבוצה אחת. כדי לקבץ לפי השדה כותבים _id: "$courseId".' },

  { topic:'nosql-agg', q:'אחרי {$lookup: {from:"courses", localField:"courseId", foreignField:"_id", as:"course"}} על enrollments — מה יש בשדה course של כל הרשמה?',
    options:['מסמך הקורס עצמו (אובייקט, לא מערך)','רק הערך של courseName מהקורס','מערך שמכיל את מסמך הקורס התואם','מספר הקורסים שנמצאו להרשמה'], correct:2,
    explain:'$lookup תמיד מחזיר מערך — גם כשיש התאמה אחת, וגם מערך ריק כשאין. לכן אחריו משתמשים ב-$unwind: "$course" כדי לעבוד ישירות עם "$course.courseName".' },

  { topic:'nosql-agg', q:'במחלקת Information Systems יש 3 קורסים, עם credits של 4, 4 ו-3. ב-$group לפי department, מה יחזירו n: {$sum: 1} ו-total: {$sum: "$credits"}?',
    options:['n = 11, total = 3','n = 3, total = 11','שניהם 3','שניהם 11'], correct:1,
    explain:'$sum: 1 מוסיף 1 לכל מסמך — כלומר COUNT(*). $sum: "$credits" מסכם את ערכי השדה — כלומר SUM(credits).' },

  { topic:'nosql-agg', q:'מה המסמך הראשון בתוצאה של db.submissions.aggregate([{$match:{grade:{$ne:null}}}, {$group:{_id:"$courseId", avg:{$avg:"$grade"}}}, {$sort:{avg:-1}}, {$limit:1}])?',
    options:['{ _id: 1, avg: 83 }','{ _id: 5, avg: 85.5 }','{ _id: 2, avg: 75 }','{ _id: 3, avg: 91 }'], correct:3,
    explain:'ממוצעים לפי קורס: Python (3) = 91, Statistics (5) = 85.5, MongoDB (1) = 83, SQL Server (2) = 75, Marketing (4) = 70. מיון יורד + $limit: 1 = הממוצע הגבוה ביותר (כמו TOP 1 … ORDER BY DESC).' },

  { topic:'nosql-agg', q:'מה מחזיר db.students.aggregate([{$match: {city: "Tel Aviv"}}, {$count: "n"}])?',
    options:['מסמך אחד: { n: 3 }','את המספר 3 בלבד','{ _id: "Tel Aviv", n: 3 }','3 מסמכים של סטודנטים'], correct:0,
    explain:'שלב $count מחזיר מסמך יחיד, עם שדה בשם שבחרנו ובו מספר המסמכים שהגיעו לשלב. (countDocuments, לעומת זאת, מחזירה מספר פשוט.)' },

  { topic:'nosql-agg', q:'לסטודנט 1 יש 4 הגשות בקורסים 1, 1, 2, 3. ב-$group לפי studentId, מה יחזירו courses: {$push: "$courseId"} ו-uniq: {$addToSet: "$courseId"}?',
    options:['courses: [1,2,3], uniq: [1,1,2,3]','courses: 4, uniq: 3','courses: [1,1,2,3], uniq: [1,2,3]','שניהם [1,2,3]'], correct:2,
    explain:'כ-accumulator, $push אוסף את כל הערכים (כולל כפילויות) למערך, ו-$addToSet אוסף רק ערכים ייחודיים (הסדר בתוך $addToSet אינו מובטח).' },

  { topic:'nosql-agg', q:'איזה שלב יוצר שדה fullName בצורה "David Levi"?',
    options:['{$project: {fullName: {$concat: ["firstName", " ", "lastName"]}}}','{$project: {fullName: {$concat: ["$firstName", " ", "$lastName"]}}}','{$project: {fullName: "$firstName" + " " + "$lastName"}}','{$group: {_id: "$firstName", fullName: {$concat: ["$firstName", "$lastName"]}}}'], correct:1,
    explain:'$concat מחבר מחרוזות, ושמות שדות חייבים $ לפניהם — בלי $ מתקבל הטקסט "firstName" עצמו. + אינו אופרטור של MongoDB, וב-$group אי אפשר להשתמש ב-$concat כ-accumulator.' },

  { topic:'nosql-agg', q:'בשאלה 8 בשיעור ("לכל סטודנט — הקורס שבו הממוצע שלו הכי גבוה") יש שני שלבי $group. מה תפקיד כל אחד?',
    options:['ראשון: ממוצע לכל סטודנט על כל הקורסים. שני: ממוצע לכל קורס על כל הסטודנטים','ראשון: ממיין את ההגשות לפי ציון. שני: מגביל את התוצאה ל-3 הקורסים הטובים','ראשון: סופר כמה הגשות יש לכל סטודנט. שני: מסכם את הציונים של כל קורס','ראשון: ממוצע לכל זוג (סטודנט, קורס). שני: לכל סטודנט — הזוג הראשון אחרי $sort'], correct:3,
    explain:'שלב 1: $group לפי {studentId, courseId} עם $avg. אחריו $sort לפי הממוצע בסדר יורד, ושלב 2: $group לפי studentId עם $first — הקורס הראשון בכל קבוצה הוא הטוב ביותר. $lookup + $unwind מביאים שמות, ו-$project מעצב את הפלט.' },

  { topic:'nosql-agg', q:'למה מומלץ למקם $match כמה שיותר מוקדם ב-pipeline?',
    options:['כי $match לא עובד אחרי שלב $group','כדי לצמצם את המסמכים שעוברים הלאה','כי $match חייב להיות תמיד השלב הראשון ב-pipeline','כדי שהתוצאה תמוין אוטומטית לפי _id'], correct:1,
    explain:'סינון מוקדם = פחות מסמכים ל-$group ול-$lookup, ולכן ביצועים טובים יותר ($match בתחילת ה-pipeline יכול גם להשתמש באינדקס). $match אחרי $group חוקי לגמרי — הוא המקביל ל-HAVING.' },

  /* ---------------- nosql-design ---------------- */
  { topic:'nosql-design', q:'מרצה מלמד כמה קורסים, ופרטיו (מחלקה, ותק) מתעדכנים מדי פעם. מה עדיף לשמור במסמך הקורס?',
    options:['עותק מלא של פרטי המרצה בתוך כל קורס','הפניה: lecturerId שמצביע על מסמך ב-lecturers','את רשימת כל הקורסים של המרצה בתוך מסמך הקורס','שום דבר — אין צורך לקשר בין מרצה לקורס'], correct:1,
    explain:'כשאותו מידע משותף לכמה מסמכים ומשתנה — Reference עדיף: מעדכנים את המרצה במקום אחד. Embedding היה מחייב לעדכן כל קורס בנפרד ועלול ליצור חוסר עקביות. זו גם הדרישה בשאלה 2 בשיעור ("Reference למרצה").' },

  { topic:'nosql-design', q:'למה סביר לשמור את השיעורים (lessons) כמערך מוטמע בתוך מסמך הקורס?',
    options:['כי MongoDB לא מאפשר ליצור Collection נפרד לשיעורים','כי כך אפשר לשתף שיעור אחד בין כמה קורסים','כי מערכים מוטמעים לא נספרים בגודל המסמך','כי הם שייכים לקורס אחד, מעטים, ונשלפים יחד איתו'], correct:3,
    explain:'Embedding מתאים ליחס "חלק מ-" עם כמות חסומה (one-to-few): השיעורים לא קיימים בלי הקורס, ובשליפת קורס מקבלים הכול בקריאה אחת — בלי $lookup.' },

  { topic:'nosql-design', q:'בשאלה 6 בשיעור: קורס עשוי להכיל 5,000 סטודנטים. מה הבעיה בשמירת כולם במערך students בתוך מסמך הקורס?',
    options:['MongoDB לא תומך במערכים של יותר מ-100 איברים','אי אפשר לשמור ObjectId בתוך מערך של מסמך אחר','אין בעיה — זה תמיד העיצוב המהיר ביותר לשליפה','מערך שגדל בלי גבול מנפח את המסמך (עד 16MB) ומייקר עדכונים'], correct:3,
    explain:'מערך לא חסום (Unbounded Array): למסמך יש מגבלת גודל של 16MB, כל עדכון כותב מסמך ענק, ושליפת פרטי הקורס מושכת גם אלפי סטודנטים מיותרים. הפתרון: Collection נפרד (enrollments) עם הפניות — וכך גם לעשרות אלפי ההגשות (submissions).' },

  { topic:'nosql-design', q:'איך מומלץ לממש ב-MongoDB את הקשר רבים-לרבים בין סטודנטים לקורסים?',
    options:['Collection נפרד enrollments עם studentId ו-courseId','שדה courseId יחיד בכל מסמך של סטודנט','מערך courses בתוך כל סטודנט, עם עותק מלא של פרטי כל קורס','שדה studentId יחיד בכל מסמך של קורס'], correct:0,
    explain:'כמו טבלת גישור ב-SQL: כל מסמך ב-enrollments מייצג הרשמה אחת, מחזיק שתי הפניות (studentId, courseId) ונתונים על הקשר עצמו (enrollmentDate, status). שדה יחיד מאפשר רק קורס אחד לסטודנט.' },

  { topic:'nosql-design', q:'החלטנו לשמור את courseName גם בתוך כל מסמך הרשמה (בנוסף ל-courseId). מה המחיר של ההחלטה?',
    options:['אי אפשר יותר לבצע $lookup ל-courses','כל ההרשמות של הקורס יימחקו אוטומטית כשהקורס יימחק','אם שם הקורס משתנה — צריך לעדכן את כל ההרשמות שלו','שליפת ההרשמות תהיה איטית יותר מבעבר'], correct:2,
    explain:'שכפול נתונים (Denormalization) חוסך $lookup ומאיץ קריאה, אבל כל שינוי בשם מחייב updateMany על כל העותקים — אחרת הנתונים לא עקביים. לכן משכפלים רק שדות שכמעט לא משתנים.' },

  { topic:'nosql-design', q:'מה נשמר בפועל במסמך קורס במודל Reference, כמו lecturerId: ObjectId("...")?',
    options:['רק ה-_id של מסמך המרצה','עותק של כל פרטי המרצה, שמתעדכן אוטומטית','קישור שמוחק את הקורס כשהמרצה נמחק','שם המרצה בלבד, כדי לחסוך מקום במסמך'], correct:0,
    explain:'Reference שומר רק את המזהה (_id) של המסמך המקושר. את פרטי המרצה מביאים בשאילתה — עם $lookup, או בשאילתה שנייה ל-lecturers.' },

  { topic:'nosql-design', q:'מתי Embedding עדיף בדרך כלל על Referencing?',
    options:['כשהנתונים משותפים להרבה מסמכים ומתעדכנים לעיתים קרובות','כשמספר האיברים עשוי להגיע לעשרות אלפים','כשהנתונים נקראים יחד, שייכים להורה אחד וכמותם חסומה','כשצריך לשלוף את הנתונים גם בנפרד מההורה'], correct:2,
    explain:'Embedding: נתונים שתמיד נקראים יחד, שייכים להורה יחיד וכמותם קטנה וחסומה (lessons בקורס). Referencing: נתונים משותפים, משתנים, גדלים בלי גבול או נשלפים לבד (מרצים, הרשמות, הגשות).' },

  { topic:'nosql-design', q:'למה בשיעור מסמנים הגשה שעדיין לא נבדקה כ-grade: null ולא כ-grade: 0?',
    options:['כי MongoDB לא מאפשר לשמור את המספר 0','כי $avg מתעלם מ-null, אבל 0 מוריד את הממוצע','כי שדה שערכו null נמחק אוטומטית מהמסמך','כי grade: 0 היה גורם למחיקת ההגשה מה-Collection כולו'], correct:1,
    explain:'null = "אין ציון עדיין". $avg/$sum/$min/$max מתעלמים מ-null (כמו AVG ב-SQL מתעלם מ-NULL), כך שהממוצע לא נפגע, ואפשר למצוא את ההגשות האלה עם {grade: null}. ציון 0 הוא ציון אמיתי ויוריד ממוצעים.' },

  /* ---------------- nosql-vs-sql ---------------- */
  { topic:'nosql-vs-sql', q:'שלב $match שמופיע אחרי $group מקביל ב-SQL ל...',
    options:['WHERE','ORDER BY','JOIN','HAVING'], correct:3,
    explain:'$match לפני $group מסנן מסמכים = WHERE. $match אחרי $group מסנן קבוצות לפי תוצאת אגרגציה = HAVING.' },

  { topic:'nosql-vs-sql', q:"מה התרגום ל-MongoDB של SELECT firstName, age FROM students WHERE city = 'Haifa' ORDER BY age DESC?",
    options:['db.students.find({firstName:1, age:1}, {city:"Haifa"}).sort({age:-1})','db.students.find({city:"Haifa"}, {firstName:1, age:1, _id:0}).sort({age:-1})','db.students.find({city:"Haifa"}, {firstName:1, age:1, _id:0}).sort({age:1})','db.students.find({city:"Haifa", firstName:1, age:1, _id:0}).sort({age:"DESC"})'], correct:1,
    explain:'הארגומנט הראשון של find הוא התנאי (WHERE), והשני הוא ה-projection (העמודות שב-SELECT; _id:0 מסתיר את _id). DESC = -1, ASC = 1.' },

  { topic:'nosql-vs-sql', q:'איזה pipeline מקביל ל-SELECT courseId, COUNT(*) FROM enrollments GROUP BY courseId HAVING COUNT(*) > 2?',
    options:['[{$match:{n:{$gt:2}}}, {$group:{_id:"$courseId", n:{$sum:1}}}]','[{$group:{_id:"courseId", n:{$count:1}}}, {$match:{n:{$gt:2}}}]','[{$group:{_id:"$courseId", n:{$sum:1}}}, {$match:{n:{$gt:2}}}]','[{$group:{_id:"$courseId", n:{$sum:"$courseId"}}}, {$match:{n:{$gt:2}}}]'], correct:2,
    explain:'קודם מקבצים ($group = GROUP BY, $sum: 1 = COUNT(*)), ורק אחר כך מסננים את הקבוצות ($match = HAVING). $match לפני $group עדיין לא מכיר את n. _id: "courseId" בלי $ יוצר קבוצה אחת בלבד, ו-$sum: "$courseId" מסכם את מספרי הקורסים במקום לספור הרשמות. על נתוני המכללה התוצאה: קורסים 1 (5), 2 (3) ו-5 (3).' },

  { topic:'nosql-vs-sql', q:'איך מוצאים ב-MongoDB סטודנטים בלי אף הרשמה (המקביל ל-LEFT JOIN enrollments … WHERE e.id IS NULL)?',
    options:['db.students.aggregate([{$lookup:{…, as:"e"}}, {$match:{e:{$size:0}}}])','db.students.aggregate([{$lookup:{…, as:"e"}}, {$unwind:"$e"}])','db.enrollments.aggregate([{$group:{_id:"$studentId", n:{$sum:1}}}, {$match:{n:0}}])','db.students.find({enrollments: null})'], correct:0,
    explain:'$lookup מחזיר לכל סטודנט מערך הרשמות; מי שהמערך שלו ריק ($size: 0) — אין לו הרשמות (בנתונים: Lior). $group על enrollments לא יכול למצוא סטודנט שאין לו אף מסמך שם, ו-find({enrollments: null}) מחזיר את כל 10 הסטודנטים — כי לאף אחד מהם אין שדה כזה (שדה חסר נחשב null).' },

  { topic:'nosql-vs-sql', q:'$lookup מ-students ל-enrollments ואחריו {$unwind: "$e"} — לאיזה JOIN זה מקביל, ומה קורה ל-Lior שאין לו הרשמות?',
    options:['LEFT JOIN — Lior נשאר עם e ריק','INNER JOIN — Lior מופיע עם e: null','INNER JOIN — Lior נעלם מהתוצאה','CROSS JOIN — Lior מופיע מול כל הרשמה'], correct:2,
    explain:'$unwind על מערך ריק מוחק את המסמך — כמו INNER JOIN (15 מסמכים, אחד לכל הרשמה). לקבלת LEFT JOIN מוסיפים preserveNullAndEmptyArrays: true (16 מסמכים, Lior בלי e).' },

  { topic:'nosql-vs-sql', q:'ב-SQL Server, AVG על עמודת INT עם הערכים 88 ו-89 מחזיר 88. מה יחזיר $avg ב-MongoDB על אותם ערכים?',
    options:['88','89','88.5','שגיאה'], correct:2,
    explain:'ב-SQL Server, AVG על INT מחזיר INT (החלק העשרוני נחתך) — ולכן כותבים AVG(CAST(grade AS DECIMAL(5,2))). $avg במונגו מחזיר מספר עשרוני: 88.5. (שימו לב: מנוע ה-SQL של האתר הוא SQLite, ושם AVG מחזיר 88.5.)' },

  { topic:'nosql-vs-sql', q:'במה שונה השדה lecturerId ב-MongoDB מהעמודה lecturerId INT REFERENCES lecturers(id) ב-SQL Server?',
    options:['MongoDB מוחק אוטומטית קורסים של מרצה שנמחק (CASCADE)','MongoDB לא אוכף אותו (אין שלמות הפניות)','ב-MongoDB חובה שההפניה תהיה מחרוזת ולא מספר','אין הבדל — שני המסדים אוכפים שלמות הפניות באותה צורה בדיוק'], correct:1,
    explain:'ב-SQL המפתח הזר נאכף: אי אפשר להכניס lecturerId שלא קיים בטבלת lecturers, ומחיקת מרצה שיש לו קורסים נחסמת (ברירת המחדל, בדומה ל-RESTRICT), אלא אם הוגדר ON DELETE CASCADE או ON DELETE SET NULL. ב-MongoDB ההפניה היא ערך רגיל — אפשר לשמור lecturerId של מרצה שלא קיים, העקביות באחריות האפליקציה, והחיבור נעשה רק בשאילתה עם $lookup.' },

  { topic:'nosql-vs-sql', q:'על נתוני המכללה (2 הגשות שעדיין לא נבדקו) מריצים ב-SQL Server את SELECT * FROM submissions WHERE grade = NULL, וב-MongoDB את db.submissions.find({grade: null}). כמה תוצאות תחזיר כל אחת?',
    options:['SQL: 2 שורות · MongoDB: 2 מסמכים','SQL: 0 שורות · MongoDB: 0 מסמכים','SQL: 0 שורות · MongoDB: 2 מסמכים','SQL: 2 שורות · MongoDB: 0 מסמכים'], correct:2,
    explain:'ב-SQL השוואה ל-NULL עם = מחזירה UNKNOWN (לא TRUE), ולכן אף שורה לא עוברת — חובה לכתוב WHERE grade IS NULL. במונגו {grade: null} היא בדיוק הדרך הנכונה: היא מוצאת גם ערך null וגם מסמך שאין בו את השדה (כאן ההגשות 8 ו-12). לכן בשאלה "הגשות שעוד לא קיבלו ציון": SQL — IS NULL, NoSQL — {grade: null}.' },

  { topic:'nosql-vs-sql', q:'מה המקבילה ב-MongoDB ל-SELECT DISTINCT city FROM students, ומה היא מחזירה על נתוני המכללה (10 סטודנטים מ-6 ערים)?',
    options:['db.students.distinct("city") — את המספר 6','db.students.find({}, {city:1, _id:0}) — 6 מסמכים','db.students.find({}, {city:1, _id:0}) — מערך של 6 ערים','db.students.distinct("city") — מערך של 6 ערים'], correct:3,
    explain:'distinct("city") מחזירה מערך של הערכים הייחודיים: ["Tel Aviv", "Haifa", "Jerusalem", "Beer Sheva", "Ramat Gan", "Holon"]. היא לא מחזירה ספירה — את המספר מקבלים עם .length או עם $group. find עם projection מחזירה 10 מסמכים, כולל כפילויות (כמו SELECT city בלי DISTINCT).' },
];

/* ---------- תיקון כיווניות (bidi) ----------
   הטקסט מוצג בתוך דף RTL. בלי עזרה, סימנים ניטרליים בקצוות של קוד באנגלית
   ({$  ]  })  "…") מקבלים את כיוון העברית ו"קופצים" לצד השני:
   {$pull: …}  מוצג כ-  pull: …}$  ו-  $avg  מוצג כ-  avg$.
   לכן כל קטע לטיני (קוד/מונח) מוקף ב-LRM (U+200E, בלתי נראה).
   סוגר שנפתח בעברית ונסגר אחרי מילה לועזית — "(בנתונים: Lior)" — נשאר מחוץ לקטע. */
var LRM = '‎';
function isStart(s, i){ var c = s[i], n = s[i+1] || '';
  return /[A-Za-z0-9$_{\[(]/.test(c) || ((c === '"' || c === "'") && /[A-Za-z$_]/.test(n)); }
function isEnd(s, i){ var c = s[i], p = s[i-1] || '';
  return /[A-Za-z0-9)}\]]/.test(c) || ((c === '"' || c === "'") && /[A-Za-z0-9$_.)}\]]/.test(p)); }
function unmatched(core){            // אינדקסים של סוגריים בלי בן-זוג בתוך הקטע
  var st = [], bad = {}, pair = { ')':'(', ']':'[', '}':'{' };
  for(var i = 0; i < core.length; i++){
    var c = core[i];
    if(c === '(' || c === '[' || c === '{') st.push(i);
    else if(pair[c]){ if(st.length && core[st[st.length-1]] === pair[c]) st.pop(); else bad[i] = 1; }
  }
  st.forEach(function(i){ bad[i] = 1; });
  return bad;
}
function wrapSeg(seg){             // קטע בלי סוגריים יתומים: חותכים קצוות ועוטפים
  var a = 0, b = seg.length - 1;
  for(var guard = 0; guard < 10; guard++){
    while(a <= b && !isStart(seg, a)) a++;
    while(b >= a && !isEnd(seg, b)) b--;
    if(a > b) return seg;
    var core = seg.slice(a, b + 1);
    if((core.split('"').length - 1) % 2 === 0) break;   // גרשיים יתומים נשארים בחוץ
    if(core[0] === '"') a++; else if(core[core.length - 1] === '"') b--; else break;
  }
  if(a > b) return seg;
  var c = seg.slice(a, b + 1);
  if(!/[A-Za-z$]/.test(c)) return seg;
  return seg.slice(0, a) + LRM + c + LRM + seg.slice(b + 1);
}
function fixRun(run){               // מפצלים בכל סוגר יתום (שייך לסוגריים עבריים)
  var bad = unmatched(run), out = '', seg = '';
  for(var i = 0; i < run.length; i++){
    if(bad[i]){ out += wrapSeg(seg) + run[i]; seg = ''; } else seg += run[i];
  }
  return out + wrapSeg(seg);
}
function negNums(s){                // מספר שלילי בודד בטקסט עברי: "-1 = מיון יורד", "(-1)"
  var parts = s.split(LRM);
  for(var i = 0; i < parts.length; i += 2)   // רק מחוץ לקטעי קוד שכבר עטופים
    parts[i] = parts[i].replace(/(^|[\s(])(-\d+(?:\.\d+)?)(?=$|[\s),.;:])/g, function(m, p, n){ return p + LRM + n + LRM; });
  return parts.join(LRM);
}
function bidi(s){ return negNums(String(s).replace(/‎/g, '').replace(/[^֐-׿]+/g, fixRun)); }
SQLC.bidiLtr = SQLC.bidiLtr || bidi;   // לשימוש חוזר (אידמפוטנטי) גם בטקסטים אחרים באתר

SQLC.quiz = (SQLC.quiz || []).concat(Q.map(function(x){
  return { topic: x.topic, q: bidi(x.q), options: x.options.map(bidi), correct: x.correct, explain: bidi(x.explain) };
}));
})();
