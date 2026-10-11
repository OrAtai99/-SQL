/* ============================================================
   קורס 3964 — שפת SQL — "מבחנים מקבילים" למבחן לדוגמה (מועד א 14.2.25)
   ------------------------------------------------------------
   SQLC.sampleStories = [ Story, … ]  — 4 מבחנים מקוריים באותו מבנה בדיוק:
     שאלה 1: ERD מסיפור (candidates / entities / relationships / traps / rubric / mistakes)
     שאלה 2: מילון נתונים לישות ה"אנשים" (המקבילה ל"סטודנט")      → dictionary
     שאלה 3: 10 שאילתות על סכימה משלו, באותו סדר סוגים כמו במבחן   → schemaSql + tables + queries
   סדר 10 סוגי השאילתות (זהה למבחן לדוגמה):
     1 הטלה פשוטה · 2 JOIN בן→אב · 3 שלוש טבלאות דרך גישור + סינון מספרי · 4 סינון מספרי
     5 COUNT לפי קבוצה · 6 LEFT JOIN כולל ללא-התאמה · 7 LEFT JOIN + COUNT כולל 0
     8 HAVING COUNT > 1 · 9 שמות + שם היחידה · 10 שמות אנשי הצוות + היחידה
   בכל סכימה יש מקרי קצה מכוונים: יחידת-אב בלי יחידות, יחידה בלי "אנשים", פריט בלי איש צוות,
   פריטים עם 2–3 אנשי צוות, ערך שווה בדיוק לסף (בודק > מול >=), NULL בטבלת הגישור (travel, libraries),
   השאלה חוזרת של אותו ספר (libraries — לכן PK נפרד ל-Loans).
   כל הטקסטים — טקסט רגיל (מוצג escaped). הקוד נבדק ב-verify-sample.js stories.
   ============================================================ */
window.SQLC = window.SQLC || {};
(function(){
  'use strict';
  /* תוויות סוגי השאילתות — זהות בכל ארבעת המבחנים */
  const PAT = {
    1:  'הטלה פשוטה — SELECT עמודות FROM טבלה אחת',
    2:  'JOIN בין שתי טבלאות (בן ← אב דרך FK)',
    3:  'JOIN של שלוש טבלאות דרך טבלת גישור + סינון מספרי',
    4:  'סינון מספרי — WHERE עמודה > ערך',
    5:  'ספירה לפי קבוצה — GROUP BY + COUNT',
    6:  'LEFT JOIN — כולל רשומות בלי התאמה',
    7:  'LEFT JOIN + COUNT — כולל קבוצות עם 0',
    8:  'GROUP BY + HAVING COUNT > 1',
    9:  'JOIN — שמות "האנשים" עם שם היחידה שלהם',
    10: 'JOIN — שמות אנשי הצוות עם היחידה שלהם'
  };

  SQLC.sampleStories = [

  /* =====================================================================
     מבחן מקביל 1 — רשת בתי החולים "מרפא"
     Hospitals → Wards → Patients / Doctors / Procedures ; Treatments + DoctorProcedures
     ===================================================================== */
  {
    id: 'hospitals',
    title: 'רשת בתי החולים "מרפא"',
    source: 'מבחן מקביל 1 — מקורי, באותו מבנה ובאותה רמת קושי כמו המבחן לדוגמה (מועד א 14.2.25)',
    story: `רשת בתי החולים "מרפא" מעוניינת לפתח מערכת מידע לניהול הפעילות הרפואית ברשת. המערכת תתמקד בניהול בתי חולים, מחלקות אשפוז, מטופלים, רופאים, טיפולים ויחסי הגומלין ביניהם.
ברשת "מרפא" פועלים מספר בתי חולים, כאשר לכל בית חולים יש שם ייחודי ועיר שבה הוא ממוקם. בכל בית חולים פועלות מחלקות אשפוז שונות, כאשר כל מחלקה אחראית על תחום רפואי מוגדר, כגון המחלקה הפנימית המטפלת במחלות כרוניות או מחלקת האורתופדיה המטפלת בשברים ובפציעות. לכל מחלקה נשמר גם מספר המיטות שבה.
לכל מחלקה יש מנהל מחלקה, אשר משמש גם כרופא במחלקה ולוקח אחריות על תפקודה; רופא יכול לנהל מחלקה אחת לכל היותר. בנוסף, כל מחלקה אחראית על המטופלים והרופאים הפועלים בתחומה. לדוגמה, המחלקה הפנימית בבית החולים "מרפא צפון" מטפלת במטופלים כמו יוסי, רחל ומוחמד.
כל מטופל מאושפז במחלקה אחת ועובר טיפולים שונים. לכל מטופל יש מידע אישי הכולל שם מלא, מספר תעודת זהות ייחודי, תאריך לידה (שממנו המערכת מציגה את גילו) ועיר מגורים.
כל רופא משויך למחלקה אחת. הרופאים מבצעים טיפולים שונים, וכל רופא מחזיק בפרטי מידע כמו שם מלא, מספר רישיון ייחודי, משכורת ותחום התמחות.
קטלוג הטיפולים ברשת מורכב מטיפולים רבים, כגון צילום רנטגן, בדיקת דם או ניתוח ברך, כאשר כל טיפול משויך למחלקה מסוימת ויש לו מחיר מחירון. כל טיפול יכול להתבצע על ידי כמה רופאים, וכל מטופל יכול לעבור כמה טיפולים. עבור כל טיפול שמטופל עבר נשמרים תאריך הטיפול והעלות בפועל, שעשויה להיות שונה ממחיר המחירון (למשל בעקבות הנחה של קופת החולים).
בהתאם לתיאור זה, יש לייצר תרשים ERD המתאר את מבנה הנתונים של המערכת, תוך התייחסות לבתי החולים, למחלקות האשפוז, למטופלים, לרופאים ולטיפולים, ולתאר את הקשרים ביניהם בהתאם לסיפור המערכת.`,

    candidates: [
      { word:'רשת בתי החולים "מרפא"', entity:false, why:'הארגון כולו — מופע יחיד שהוא המערכת עצמה. אין "הרבה רשתות" לשמור עליהן מידע.' },
      { word:'בית חולים', entity:true,  why:'יש הרבה בתי חולים, ולכל אחד שם ייחודי ועיר — ישות (Hospitals).' },
      { word:'עיר', entity:false, why:'תכונה של בית חולים (וגם של מטופל). לא נשמר על העיר שום מידע משלה.' },
      { word:'מחלקת אשפוז', entity:true,  why:'יחידה ארגונית עם שם, מספר מיטות, מנהל ושיוך לבית חולים — ישות (Wards).' },
      { word:'מספר המיטות', entity:false, why:'תכונה רגילה של מחלקה (Beds).' },
      { word:'מנהל מחלקה', entity:false, why:'זה תפקיד של רופא קיים, לא סוג חדש של "דבר". ממדלים כקשר 1:1 "מנהל" בין Doctors ל-Wards (HeadDoctorID).' },
      { word:'מטופל', entity:true,  why:'הרבה מטופלים עם שם, ת"ז, תאריך לידה ועיר — ישות (Patients).' },
      { word:'יוסי, רחל ומוחמד', entity:false, why:'אלה ערכים — מופעים (שורות) של הישות מטופל, לא ישויות.' },
      { word:'גיל המטופל', entity:false, why:'תכונה נגזרת — מחושבת מתאריך הלידה ולכן לא נשמרת.' },
      { word:'רופא', entity:true,  why:'הרבה רופאים עם שם, רישיון, משכורת והתמחות — ישות (Doctors).' },
      { word:'תחום התמחות', entity:false, why:'תכונה של רופא (Specialty). הסיפור לא שומר מידע נוסף על התמחויות.' },
      { word:'טיפול (בקטלוג)', entity:true,  why:'פריט בקטלוג עם שם, מחיר מחירון ושיוך למחלקה — ישות (Procedures).' },
      { word:'מחיר מחירון', entity:false, why:'תכונה של הטיפול בקטלוג (ListPrice) — קבוע לטיפול.' },
      { word:'טיפול שמטופל עבר', entity:true,  why:'האירוע "מטופל X עבר טיפול Y בתאריך Z בעלות W" — ישות מקשרת (Treatments) של הקשר M:N.' },
      { word:'העלות בפועל', entity:false, why:'תכונה של הקשר מטופל–טיפול — יושבת בטבלת הגישור Treatments, לא בקטלוג.' },
      { word:'קופת החולים', entity:false, why:'מוזכרת רק כהסבר להנחה. הסיפור לא שומר עליה שום מידע — מסיח דעת.' }
    ],

    entities: [
      { name:'Hospitals', he:'בתי חולים', attrs:[
        { name:'HospitalID', pk:true },
        { name:'HospitalName', note:'ייחודי — מפתח חלופי (UNIQUE)' },
        { name:'City' } ] },
      { name:'Wards', he:'מחלקות אשפוז', attrs:[
        { name:'WardID', pk:true },
        { name:'WardName' },
        { name:'Beds', note:'מספר המיטות' },
        { name:'HospitalID', fk:'Hospitals', note:'קשר 1:N — כל מחלקה בבית חולים אחד' },
        { name:'HeadDoctorID', fk:'Doctors', note:'קשר 1:1 "מנהל מחלקה" — FK + UNIQUE' } ] },
      { name:'Patients', he:'מטופלים', attrs:[
        { name:'PatientID', pk:true },
        { name:'FullName' },
        { name:'IDNumber', note:'ת"ז ייחודית — מפתח חלופי' },
        { name:'BirthDate', note:'הגיל נגזר ממנו — לא שומרים Age' },
        { name:'City' },
        { name:'WardID', fk:'Wards', note:'המחלקה שבה המטופל מאושפז' } ] },
      { name:'Doctors', he:'רופאים', attrs:[
        { name:'DoctorID', pk:true },
        { name:'FullName' },
        { name:'LicenseNumber', note:'מספר רישיון ייחודי — מפתח חלופי' },
        { name:'Salary' },
        { name:'Specialty', note:'תחום התמחות' },
        { name:'WardID', fk:'Wards', note:'המחלקה שבה הרופא עובד' } ] },
      { name:'Procedures', he:'טיפולים (קטלוג)', attrs:[
        { name:'ProcedureID', pk:true },
        { name:'ProcedureName' },
        { name:'ListPrice', note:'מחיר מחירון — תכונה של הטיפול' },
        { name:'WardID', fk:'Wards' } ] },
      { name:'Treatments', he:'טיפולים שבוצעו (גישור מטופל–טיפול)', attrs:[
        { name:'TreatmentID', pk:true },
        { name:'PatientID', fk:'Patients' },
        { name:'ProcedureID', fk:'Procedures' },
        { name:'TreatmentDate', note:'תכונת הקשר' },
        { name:'Cost', note:'העלות בפועל — תכונת הקשר (כמו FinalGrade במבחן)' } ] },
      { name:'DoctorProcedures', he:'רופאים מבצעים טיפולים (גישור רופא–טיפול)', attrs:[
        { name:'DoctorProcedureID', pk:true, note:'מפתח מלאכותי; UNIQUE(DoctorID, ProcedureID) נגד שיוך כפול. חלופה: PK מורכב (DoctorID, ProcedureID)' },
        { name:'DoctorID', fk:'Doctors' },
        { name:'ProcedureID', fk:'Procedures' } ] }
    ],

    relationships: [
      { a:'Hospitals', b:'Wards', verb:'מפעיל', card:'1:N', why:'"בכל בית חולים פועלות מחלקות אשפוז שונות" — ומחלקה שייכת לבית חולים אחד. FK HospitalID בצד ה-N (Wards).' },
      { a:'Doctors', b:'Wards', verb:'מנהל', card:'1:1', why:'"לכל מחלקה יש מנהל מחלקה… רופא יכול לנהל מחלקה אחת לכל היותר" — אחד מכל צד. HeadDoctorID ב-Wards + UNIQUE.' },
      { a:'Wards', b:'Doctors', verb:'מעסיקה', card:'1:N', why:'"כל מחלקה אחראית על… הרופאים הפועלים בתחומה" — במחלקה רופאים רבים; "כל רופא משויך למחלקה אחת". FK WardID ב-Doctors. קשר נפרד מקשר הניהול.' },
      { a:'Wards', b:'Patients', verb:'מאשפזת', card:'1:N', why:'"כל מטופל מאושפז במחלקה אחת", ובמחלקה מטופלים רבים. FK WardID ב-Patients.' },
      { a:'Wards', b:'Procedures', verb:'אחראית על', card:'1:N', why:'"כל טיפול משויך למחלקה מסוימת" — ולמחלקה טיפולים רבים בקטלוג.' },
      { a:'Patients', b:'Procedures', verb:'עובר', card:'M:N', bridge:'Treatments', why:'"כל מטופל יכול לעבור כמה טיפולים" וכל טיפול בקטלוג ניתן למטופלים רבים. לקשר יש תכונות (תאריך, עלות בפועל) — הן בטבלת הגישור.' },
      { a:'Doctors', b:'Procedures', verb:'מבצע', card:'M:N', bridge:'DoctorProcedures', why:'"כל טיפול יכול להתבצע על ידי כמה רופאים", ו"הרופאים מבצעים טיפולים שונים".' }
    ],

    traps: [
      { q:'היכן יש לשמור את "העלות בפועל" של טיפול שמטופל עבר?',
        options:['כתכונה של Procedures, ליד מחיר המחירון','כתכונה של Patients','כתכונה של טבלת הגישור Treatments','כתכונה של Doctors'],
        correct:2,
        explain:'העלות בפועל תלויה בצירוף מטופל + טיפול (ובתאריך) — היא תכונה של הקשר M:N ולכן יושבת בטבלת הגישור, בדיוק כמו FinalGrade ב-Enrollments של המבחן לדוגמה. מחיר המחירון (ListPrice) לעומת זאת קבוע לטיפול ולכן שייך ל-Procedures.' },
      { q:'איך נכון לממש את "מנהל מחלקה"?',
        options:['ישות נפרדת WardManagers עם שם ומשכורת','קשר M:N בין Doctors ל-Wards בטבלת גישור','עמודה WardName בטבלת Doctors','עמודה HeadDoctorID בטבלת Wards: FK ל-Doctors עם UNIQUE'],
        correct:3,
        explain:'המנהל הוא רופא — לא סוג חדש של ישות (ישות נפרדת הייתה משכפלת את שם הרופא ומשכורתו). "לכל מחלקה מנהל אחד, ורופא מנהל מחלקה אחת לכל היותר" = 1:1, ומממשים FK בצד אחד + UNIQUE. עדיף בצד המחלקה: מצד המחלקה ההשתתפות היא חובה (לכל מחלקה יש מנהל), ומצד הרופא היא רשות (רוב הרופאים אינם מנהלים). זה קשר שני ונפרד מהקשר 1:N "רופא עובד במחלקה".' },
      { q:'הסיפור אומר שהמערכת "מציגה את גיל המטופל". מה עושים עם הגיל?',
        options:['לא שומרים — זו תכונה נגזרת מ-BirthDate ומחשבים אותה בשאילתה','עמודה Age INT בטבלת Patients','יוצרים ישות Ages','שומרים גם Age וגם BirthDate ליתר ביטחון'],
        correct:0,
        explain:'גיל משתנה כל יום, ולכן עמודת Age "מתיישנת". תכונה נגזרת (אליפסה מקווקוות ב-ERD) לא נשמרת — מחשבים, למשל DATEDIFF(year, BirthDate, GETDATE()).' },
      { q:'"כל טיפול יכול להתבצע על ידי כמה רופאים", ורופא מבצע כמה טיפולים. מה המימוש?',
        options:['FK DoctorID בטבלת Procedures','FK ProcedureID בטבלת Doctors','טבלת גישור DoctorProcedures עם DoctorID ו-ProcedureID','עמודת טקסט ב-Procedures עם שמות הרופאים מופרדים בפסיקים'],
        correct:2,
        explain:'קשר M:N לא מממשים עם FK באחת הטבלאות — FK יחיד מאפשר רק ערך אחד לשורה (כלומר 1:N). רשימה מופרדת בפסיקים שוברת את הצורה הנורמלית הראשונה. הפתרון: טבלת גישור, בדיוק כמו Teaching במבחן לדוגמה.' },
      { q:'"קופת החולים" מוזכרת בסיפור. האם היא ישות?',
        options:['כן — ישות חזקה עם קשר 1:N למטופלים','לא — הסיפור לא שומר עליה שום מידע; היא רק מסבירה למה העלות בפועל שונה ממחיר המחירון','כן — ישות חלשה התלויה במטופל','כן — טבלת גישור בין מטופלים לטיפולים'],
        correct:1,
        explain:'ישות היא "דבר" שהמערכת שומרת עליו מידע. לקופת החולים אין בסיפור אף תכונה ואף קשר מוגדר — זה מסיח דעת. אילו היה כתוב "לכל מטופל נשמרת קופת החולים שלו ולכל קופה מספר טלפון" — אז כן.' }
    ],

    rubric: [
      '5 ישויות עיקריות: Hospitals, Wards, Patients, Doctors, Procedures — כל אחת עם מפתח ראשי מסומן.',
      '2 ישויות מקשרות (גישור) לשני קשרי ה-M:N: Treatments (מטופל–טיפול) ו-DoctorProcedures (רופא–טיפול).',
      'תכונות הקשר TreatmentDate ו-Cost נמצאות ב-Treatments — לא ב-Procedures ולא ב-Patients.',
      'קשרי 1:N עם FK בצד ה-N: Hospitals–Wards, Wards–Patients, Wards–Doctors, Wards–Procedures.',
      'קשר 1:1 "מנהל" בין Doctors ל-Wards (HeadDoctorID + UNIQUE), נפרד מקשר "עובד במחלקה".',
      'מפתחות חלופיים מסומנים: HospitalName, IDNumber, LicenseNumber. הגיל לא נשמר (נגזר).'
    ],
    mistakes: [
      'לשים את העלות בפועל (Cost) בטבלת Procedures — מבלבלים בינה לבין מחיר המחירון.',
      'ליצור ישות "מנהל מחלקה" נפרדת, או לשכוח לגמרי את קשר הניהול.',
      'לממש "רופאים מבצעים טיפולים" עם FK אחד (ProcedureID ב-Doctors) — זה 1:N ולא M:N.',
      'להוסיף ישויות מיותרות: "רשת", "קופת חולים", "עיר".',
      'עמודת Age בטבלת Patients במקום לגזור מ-BirthDate.',
      'FK בצד ה-1 (רשימת מחלקות בתוך Hospitals) במקום FK HospitalID בטבלת Wards.'
    ],

    dictionary: {
      entity: 'Patients',
      rows: [
        { attr:'PatientID', type:['PK'], desc:'מזהה ייחודי של המטופל במערכת', dataType:['INT'], domain:'מספר שלם חיובי, ייחודי, לא NULL', def:'אין (אפשר IDENTITY(1,1) — מספור אוטומטי)', model:'INT' },
        { attr:'FullName', type:['רגילה','מורכבת'], desc:'שם מלא של המטופל (פרטי + משפחה)', dataType:['NVARCHAR','VARCHAR'], domain:'טקסט עד 50 תווים, חובה (NOT NULL)', def:'—', model:'NVARCHAR(50)' },
        { attr:'IDNumber', type:['מפתח חלופי'], desc:'מספר תעודת זהות', dataType:['CHAR','VARCHAR','NVARCHAR'], domain:'בדיוק 9 ספרות (כולל אפסים מובילים — לכן לא INT), ייחודי (UNIQUE), חובה', def:'—', model:'CHAR(9)' },
        { attr:'BirthDate', type:['רגילה'], desc:'תאריך לידה — ממנו מחושב הגיל (הגיל עצמו נגזר ולא נשמר)', dataType:['DATE','DATETIME'], domain:'תאריך עבר, לא אחרי היום', def:'—', model:'DATE' },
        { attr:'City', type:['רגילה'], desc:'עיר המגורים של המטופל', dataType:['NVARCHAR','VARCHAR'], domain:'שם עיר, עד 30 תווים', def:'NULL', model:'NVARCHAR(30)' },
        { attr:'WardID', type:['FK'], desc:'המחלקה שבה המטופל מאושפז', dataType:['INT'], domain:'WardID קיים בטבלת Wards', def:'—', model:'INT' }
      ]
    },

    schemaSql: `
CREATE TABLE Hospitals (HospitalID INT PRIMARY KEY, HospitalName NVARCHAR(50) NOT NULL UNIQUE, City NVARCHAR(30) NOT NULL);
INSERT INTO Hospitals VALUES
 (1,'מרפא צפון','חיפה'),(2,'מרפא מרכז','פתח תקווה'),(3,'מרפא דרום','באר שבע'),
 (4,'מרפא ירושלים','ירושלים'),(5,'מרפא שרון','נתניה'),(6,'מרפא גליל','צפת');

-- HeadDoctorID = הקשר 1:1 "מנהל מחלקה". ב-SQL Server מוסיפים את ה-FK אחרי יצירת Doctors (הפניה מעגלית):
-- ALTER TABLE Wards ADD CONSTRAINT FK_Wards_Head FOREIGN KEY (HeadDoctorID) REFERENCES Doctors(DoctorID);
CREATE TABLE Wards (WardID INT PRIMARY KEY, WardName NVARCHAR(50) NOT NULL, Beds INT CHECK (Beds > 0), HospitalID INT NOT NULL REFERENCES Hospitals(HospitalID), HeadDoctorID INT UNIQUE);
INSERT INTO Wards VALUES
 (10,'פנימית א',30,1,101),(11,'אורתופדיה',24,1,103),(12,'קרדיולוגיה',20,2,105),
 (13,'ילדים',28,3,107),(14,'נשים ויולדות',26,4,108),(15,'שיקום',18,5,110);

CREATE TABLE Patients (PatientID INT PRIMARY KEY, FullName NVARCHAR(50) NOT NULL, IDNumber CHAR(9) NOT NULL UNIQUE, BirthDate DATE, City NVARCHAR(30), WardID INT REFERENCES Wards(WardID));
INSERT INTO Patients VALUES
 (1,'יוסי לוי','203456781','1958-03-12','חיפה',10),
 (2,'רחל אברהם','204567892','1947-11-02','קריית אתא',10),
 (3,'מוחמד עבאס','205678903','1971-06-25','שפרעם',10),
 (4,'אנה קוזלוב','206789014','1980-01-17','חיפה',11),
 (5,'דוד מזרחי','207890125','1965-09-30','נשר',11),
 (6,'שירה בן חיים','208901236','1990-04-08','פתח תקווה',12),
 (7,'אהרון כהן','209012347','1952-12-21','ראש העין',12),
 (8,'נוי אלמוג','210123458','2016-07-14','באר שבע',13),
 (9,'איתן שגיא','211234569','2019-02-03','אופקים',13),
 (10,'מירב טל','212345670','1994-10-11','ירושלים',14),
 (11,'רוני חזן','213456781','1985-05-05','חיפה',11);

CREATE TABLE Doctors (DoctorID INT PRIMARY KEY, FullName NVARCHAR(50) NOT NULL, LicenseNumber VARCHAR(10) NOT NULL UNIQUE, Salary INT, Specialty NVARCHAR(30), WardID INT REFERENCES Wards(WardID));
INSERT INTO Doctors VALUES
 (101,'אבי גולן','MD-10231',34000,'רפואה פנימית',10),
 (102,'רונית שמעוני','MD-10457',28000,'רפואה פנימית',10),
 (103,'יוסף חדד','MD-11872',41000,'אורתופדיה',11),
 (104,'מאיה לוין','MD-12019',30000,'אורתופדיה',11),
 (105,'סאמר חורי','MD-12544',38000,'קרדיולוגיה',12),
 (106,'ליאת כץ','MD-13090',26500,'קרדיולוגיה',12),
 (107,'תמר אלון','MD-13377',31500,'רפואת ילדים',13),
 (108,'דנה פרץ','MD-14102',33000,'גינקולוגיה',14),
 (109,'עומר נאסר','MD-14660',24000,'רפואת ילדים',13),
 (110,'גלית רבינוביץ','MD-15013',29500,'שיקום',15);

CREATE TABLE Procedures (ProcedureID INT PRIMARY KEY, ProcedureName NVARCHAR(50) NOT NULL, ListPrice DECIMAL(10,2), WardID INT REFERENCES Wards(WardID));
INSERT INTO Procedures VALUES
 (201,'בדיקת דם מקיפה',350,10),(202,'אקו לב',1200,12),(203,'צנתור',14500,12),
 (204,'ניתוח ברך',32000,11),(205,'צילום רנטגן',450,11),(206,'פיזיותרפיה',600,15),
 (207,'אולטרסאונד הריון',900,14),(208,'חיסון ילדים',150,13);

CREATE TABLE Treatments (TreatmentID INT PRIMARY KEY, PatientID INT REFERENCES Patients(PatientID), ProcedureID INT REFERENCES Procedures(ProcedureID), TreatmentDate DATE, Cost DECIMAL(10,2));
INSERT INTO Treatments VALUES
 (1,1,201,'2025-01-05',350),(2,1,202,'2025-01-09',1000),(3,2,201,'2025-01-11',280),
 (4,3,203,'2025-02-02',12800),(5,4,204,'2025-02-15',32000),(6,4,205,'2025-02-10',450),
 (7,5,205,'2025-03-01',300),(8,6,202,'2025-03-04',1200),(9,7,203,'2025-03-08',14500),
 (10,8,208,'2025-03-20',150),(11,9,208,'2025-03-21',150),(12,10,207,'2025-04-02',750),
 (13,5,204,'2025-04-10',27500),(14,3,202,'2025-02-01',1100),(15,6,206,'2025-04-20',600);

CREATE TABLE DoctorProcedures (DoctorProcedureID INT PRIMARY KEY, DoctorID INT REFERENCES Doctors(DoctorID), ProcedureID INT REFERENCES Procedures(ProcedureID), UNIQUE (DoctorID, ProcedureID));
INSERT INTO DoctorProcedures VALUES
 (1,101,201),(2,102,201),(3,105,202),(4,106,202),(5,105,203),(6,103,204),
 (7,104,204),(8,104,205),(9,110,206),(10,108,207);
`,
    tables: [
      { name:'Hospitals',        cols:'HospitalID, HospitalName, City' },
      { name:'Wards',            cols:'WardID, WardName, Beds, HospitalID, HeadDoctorID' },
      { name:'Patients',         cols:'PatientID, FullName, IDNumber, BirthDate, City, WardID' },
      { name:'Doctors',          cols:'DoctorID, FullName, LicenseNumber, Salary, Specialty, WardID' },
      { name:'Procedures',       cols:'ProcedureID, ProcedureName, ListPrice, WardID' },
      { name:'Treatments',       cols:'TreatmentID, PatientID, ProcedureID, TreatmentDate, Cost' },
      { name:'DoctorProcedures', cols:'DoctorProcedureID, DoctorID, ProcedureID' }
    ],

    queries: [
      { n:1, pattern:PAT[1],
        prompt:'הצג את השמות והערים של כל בתי החולים ברשת. פלט: שם בית החולים, העיר (2 עמודות).',
        solution:`SELECT HospitalName, City
FROM Hospitals;`,
        alt:[`SELECT h.HospitalName, h.City FROM Hospitals AS h;`,
             `SELECT HospitalName, City FROM Hospitals ORDER BY HospitalName;`],
        explain:`אין כאן JOIN ואין סינון — בוחרים 2 עמודות מטבלה אחת. "מרפא גליל" מופיע אף שאין בו עדיין מחלקות, כי לא מצטרפים לשום טבלה ולכן אף שורה לא "נופלת". SELECT * היה מחזיר גם את HospitalID — 3 עמודות במקום 2.` },

      { n:2, pattern:PAT[2],
        prompt:'הצג את כל מחלקות האשפוז עם שמותיהן ושם בית החולים שבו הן נמצאות. פלט: שם המחלקה, שם בית החולים (2 עמודות).',
        solution:`SELECT w.WardName, h.HospitalName
FROM Wards w
JOIN Hospitals h ON w.HospitalID = h.HospitalID;`,
        alt:[`SELECT w.WardName, h.HospitalName FROM Hospitals h INNER JOIN Wards w ON h.HospitalID = w.HospitalID;`,
             `SELECT w.WardName, h.HospitalName FROM Wards w, Hospitals h WHERE w.HospitalID = h.HospitalID;`],
        explain:`JOIN בין טבלת הבן (Wards — שבה ה-FK HospitalID) לטבלת האב (Hospitals). תנאי ה-ON מחבר FK ל-PK. "מרפא גליל" (בלי מחלקות) לא מופיע — וזה נכון, כי מבקשים את המחלקות. טעות נפוצה: לשכוח את תנאי ההצטרפות (FROM Wards, Hospitals בלי WHERE) — מתקבלת מכפלה קרטזית של 6×6 = 36 שורות.` },

      { n:3, pattern:PAT[3],
        prompt:'שלוף את שמות המטופלים עם הטיפולים שעברו, רק אם העלות בפועל של הטיפול גבוהה מ-1,000 ש"ח. פלט: שם המטופל, שם הטיפול, העלות בפועל (3 עמודות).',
        solution:`SELECT p.FullName, pr.ProcedureName, t.Cost
FROM Patients p
JOIN Treatments t ON p.PatientID = t.PatientID
JOIN Procedures pr ON t.ProcedureID = pr.ProcedureID
WHERE t.Cost > 1000;`,
        alt:[`SELECT p.FullName, pr.ProcedureName, t.Cost FROM Treatments t JOIN Patients p ON p.PatientID = t.PatientID JOIN Procedures pr ON pr.ProcedureID = t.ProcedureID WHERE t.Cost > 1000;`,
             `SELECT p.FullName, pr.ProcedureName, t.Cost FROM Patients p, Treatments t, Procedures pr WHERE p.PatientID = t.PatientID AND t.ProcedureID = pr.ProcedureID AND t.Cost > 1000;`],
        explain:`שלוש טבלאות: מטופל ← Treatments (טבלת הגישור) → טיפול. הסינון הוא על Cost שבטבלת הגישור — לא על ListPrice שבקטלוג: אקו הלב של יוסי לוי עלה בפועל 1,000 בדיוק (מחיר מחירון 1,200), ולכן הוא לא נכלל. "גבוה מ-" = > ולא >=. רוני חזן לא עבר טיפולים, ולכן JOIN רגיל לא מחזיר אותו — וזה הרצוי.` },

      { n:4, pattern:PAT[4],
        prompt:'שלוף את כל הרופאים שמרוויחים מעל 30,000 ש"ח. פלט: שם הרופא, המשכורת (2 עמודות).',
        solution:`SELECT FullName, Salary
FROM Doctors
WHERE Salary > 30000;`,
        alt:[`SELECT d.FullName, d.Salary FROM Doctors d WHERE d.Salary > 30000 ORDER BY d.Salary DESC;`,
             `SELECT FullName, Salary FROM Doctors WHERE NOT Salary <= 30000;`],
        explain:`סינון WHERE על עמודה מספרית. מאיה לוין מרוויחה 30,000 בדיוק — "מעל" לא כולל אותה (>= היה מוסיף שורה). מספרים כותבים בלי גרשיים ובלי פסיק אלפים: 30000 ולא '30,000'. ORDER BY רשות — לא נדרש בשאלה.` },

      { n:5, pattern:PAT[5],
        prompt:'הצג את מספר המטופלים בכל מחלקה. פלט: שם המחלקה, מספר המטופלים (2 עמודות). מספיק להציג מחלקות שיש בהן מטופלים.',
        solution:`SELECT w.WardName, COUNT(p.PatientID) AS NumPatients
FROM Wards w
JOIN Patients p ON p.WardID = w.WardID
GROUP BY w.WardID, w.WardName;`,
        alt:[`SELECT w.WardName, COUNT(*) AS NumPatients FROM Wards w JOIN Patients p ON p.WardID = w.WardID GROUP BY w.WardID, w.WardName;`,
             `SELECT w.WardName, x.Cnt FROM Wards w JOIN (SELECT WardID, COUNT(*) AS Cnt FROM Patients GROUP BY WardID) x ON x.WardID = w.WardID;`],
        accept:[`SELECT w.WardName, COUNT(p.PatientID) AS NumPatients FROM Wards w LEFT JOIN Patients p ON p.WardID = w.WardID GROUP BY w.WardID, w.WardName;`],
        explain:`GROUP BY לפי מחלקה ו-COUNT לכל קבוצה. ב-SQL Server כל עמודה ב-SELECT שאינה בתוך פונקציה צוברת חייבת להופיע ב-GROUP BY (אחרת שגיאה 8120) — לכן מקבצים לפי WardID וגם WardName. מחלקת השיקום ריקה ולכן לא מופיעה ב-JOIN רגיל; גרסת LEFT JOIN (שמציגה אותה עם 0) מתקבלת גם היא — וזו בדיוק שאלה 7.` },

      { n:6, pattern:PAT[6],
        prompt:'הצג את כל הטיפולים עם הרופאים שמבצעים אותם. ודא שגם טיפולים שאין להם רופא מבצע יוצגו. פלט: שם הטיפול, שם הרופא (2 עמודות; לטיפול בלי רופא יופיע NULL).',
        solution:`SELECT pr.ProcedureName, d.FullName
FROM Procedures pr
LEFT JOIN DoctorProcedures dp ON pr.ProcedureID = dp.ProcedureID
LEFT JOIN Doctors d ON dp.DoctorID = d.DoctorID;`,
        alt:[`SELECT pr.ProcedureName, d.FullName FROM Doctors d JOIN DoctorProcedures dp ON d.DoctorID = dp.DoctorID RIGHT JOIN Procedures pr ON dp.ProcedureID = pr.ProcedureID;`],
        explain:`הטבלה ש"כולה חייבת להופיע" (Procedures) כתובה משמאל, ושני ה-JOIN הם LEFT. מלכודת: LEFT JOIN לגישור ואחריו JOIN רגיל ל-Doctors — ה-JOIN השני מוחק שוב את "חיסון ילדים" (ה-NULL לא מתאים לאף רופא). טיפול עם שני רופאים (כמו "אקו לב") מופיע פעמיים — שורה לכל רופא.` },

      { n:7, pattern:PAT[7],
        prompt:'הצג את כל המחלקות עם מספר המטופלים שלהן, כולל מחלקות שאין בהן מטופלים. פלט: שם המחלקה, מספר המטופלים (2 עמודות; למחלקה ריקה — 0).',
        solution:`SELECT w.WardName, COUNT(p.PatientID) AS NumPatients
FROM Wards w
LEFT JOIN Patients p ON p.WardID = w.WardID
GROUP BY w.WardID, w.WardName;`,
        alt:[`SELECT w.WardName, (SELECT COUNT(*) FROM Patients p WHERE p.WardID = w.WardID) AS NumPatients FROM Wards w;`],
        explain:`LEFT JOIN שומר את מחלקת השיקום עם NULL בצד המטופל. COUNT(p.PatientID) סופר רק ערכים שאינם NULL ולכן מחזיר 0; COUNT(*) סופר את השורה עצמה ומחזיר 1 — הטעות הקלאסית בשאלה הזו.` },

      { n:8, pattern:PAT[8],
        prompt:'מצא את כל הטיפולים שמבוצעים על ידי יותר מרופא אחד. פלט: שם הטיפול, מספר הרופאים (2 עמודות).',
        solution:`SELECT pr.ProcedureName, COUNT(dp.DoctorID) AS NumDoctors
FROM Procedures pr
JOIN DoctorProcedures dp ON pr.ProcedureID = dp.ProcedureID
GROUP BY pr.ProcedureID, pr.ProcedureName
HAVING COUNT(dp.DoctorID) > 1;`,
        alt:[`SELECT pr.ProcedureName, COUNT(*) FROM Procedures pr JOIN DoctorProcedures dp ON pr.ProcedureID = dp.ProcedureID GROUP BY pr.ProcedureID, pr.ProcedureName HAVING COUNT(*) > 1;`,
             `SELECT pr.ProcedureName, COUNT(DISTINCT dp.DoctorID) FROM Procedures pr JOIN DoctorProcedures dp ON pr.ProcedureID = dp.ProcedureID GROUP BY pr.ProcedureID, pr.ProcedureName HAVING COUNT(DISTINCT dp.DoctorID) >= 2;`],
        explain:`מקבצים את טבלת הגישור לפי טיפול וסופרים רופאים. תנאי על תוצאת COUNT נכתב ב-HAVING (אחרי GROUP BY) — WHERE COUNT(...) > 1 הוא שגיאה 147 ב-SQL Server. טיפול עם רופא אחד (כמו "צנתור") וטיפול בלי רופא לא עוברים את הסינון.` },

      { n:9, pattern:PAT[9],
        prompt:'הצג את שמות המטופלים יחד עם שמות המחלקות שבהן הם מאושפזים. פלט: שם המטופל, שם המחלקה (2 עמודות).',
        solution:`SELECT p.FullName, w.WardName
FROM Patients p
JOIN Wards w ON p.WardID = w.WardID;`,
        alt:[`SELECT p.FullName, w.WardName FROM Patients p, Wards w WHERE p.WardID = w.WardID;`],
        explain:`JOIN פשוט בן → אב: Patients.WardID (FK) = Wards.WardID (PK). כל מטופל מופיע פעם אחת, כולל רוני חזן שלא עבר טיפולים — כאן לא נוגעים בטבלת Treatments בכלל.` },

      { n:10, pattern:PAT[10],
        prompt:'שלוף את שמות הרופאים עם המחלקות שבהן הם עובדים. פלט: שם הרופא, שם המחלקה (2 עמודות).',
        solution:`SELECT d.FullName, w.WardName
FROM Doctors d
JOIN Wards w ON d.WardID = w.WardID;`,
        alt:[`SELECT d.FullName, w.WardName FROM Wards w INNER JOIN Doctors d ON w.WardID = d.WardID;`],
        accept:[`SELECT DISTINCT d.FullName, w.WardName FROM Doctors d JOIN DoctorProcedures dp ON d.DoctorID = dp.DoctorID JOIN Procedures pr ON dp.ProcedureID = pr.ProcedureID JOIN Wards w ON pr.WardID = w.WardID;`],
        explain:`כמו שאלה 9, הפעם עם Doctors: FK WardID ← PK של Wards. אל תתבלבלו עם HeadDoctorID — זה קשר הניהול (1:1), ו-JOIN עליו היה מחזיר רק את 6 המנהלים. פרשנות נוספת שמתקבלת: "המחלקות של הטיפולים שהרופא מבצע" — דרך DoctorProcedures ו-Procedures עם DISTINCT.` }
    ]
  },

  /* =====================================================================
     מבחן מקביל 2 — חברת הנסיעות "גלובוס"
     Offices → Desks → Customers / Guides / Tours ; Bookings + TourGuides
     ===================================================================== */
  {
    id: 'travel',
    title: 'חברת הנסיעות "גלובוס"',
    source: 'מבחן מקביל 2 — מקורי, באותו מבנה ובאותה רמת קושי כמו המבחן לדוגמה (מועד א 14.2.25)',
    story: `חברת הנסיעות "גלובוס" מעוניינת לפתח מערכת מידע לניהול הטיולים המאורגנים שהיא משווקת. המערכת תתמקד בניהול סניפים, דסקים של יעדים, לקוחות, מדריכי טיולים, טיולים ויחסי הגומלין ביניהם.
לחברה מספר סניפים ברחבי הארץ, כאשר לכל סניף יש שם ייחודי ועיר שבה הוא פועל. בכל סניף פועלים דסקים שונים, כאשר כל דסק אחראי על אזור יעד מוגדר, כגון דסק אירופה המשווק טיולים לאיטליה ולצרפת או דסק המזרח הרחוק המשווק טיולים ליפן ולתאילנד.
לכל דסק יש ראש דסק, שהוא גם אחד ממדריכי הטיולים של החברה ולוקח אחריות על תפקוד הדסק; מדריך יכול לעמוד בראש דסק אחד לכל היותר. בנוסף, כל דסק אחראי על הלקוחות והמדריכים הפועלים בתחומו. לדוגמה, דסק אירופה בסניף תל אביב מטפל בלקוחות כמו מיכל, אורן וסיגל.
כל לקוח משויך לדסק אחד המטפל בו ומזמין טיולים שונים. לכל לקוח יש מידע אישי הכולל שם מלא, מספר תעודת זהות ייחודי, טלפון נייד ועיר מגורים.
כל מדריך משויך לדסק אחד. מדריכי הטיולים מדריכים טיולים שונים, וכל מדריך מחזיק בפרטי מידע כמו שם מלא, מספר רישיון הדרכה ייחודי, משכורת חודשית ודרגה (מדריך מתחיל, בכיר או ראשי).
קטלוג הטיולים מורכב מטיולים רבים, כאשר כל טיול משויך לדסק מסוים, ולכל טיול יש שם, ארץ יעד, מספר ימים ומחיר בסיס. בכל טיול משתתפים כמה מדריכים, וכל לקוח יכול להזמין כמה טיולים. עבור כל הזמנה נשמרים תאריך ההזמנה, המחיר ששולם בפועל (לאחר הנחות) וציון שביעות הרצון (1–10) שהלקוח נותן בסיום הטיול. המערכת מציגה גם את מספר הנרשמים לכל טיול. הטיסות עצמן מוזמנות דרך חברות תעופה חיצוניות ואינן מנוהלות במערכת.
בהתאם לתיאור זה, יש לייצר תרשים ERD המתאר את מבנה הנתונים של המערכת, תוך התייחסות לסניפים, לדסקים, ללקוחות, למדריכים ולטיולים, ולתאר את הקשרים ביניהם בהתאם לסיפור המערכת.`,

    candidates: [
      { word:'חברת הנסיעות "גלובוס"', entity:false, why:'הארגון עצמו — מופע יחיד שהוא המערכת. לא שומרים "טבלת חברות".' },
      { word:'סניף', entity:true,  why:'הרבה סניפים, לכל אחד שם ייחודי ועיר — ישות (Offices).' },
      { word:'עיר', entity:false, why:'תכונה של סניף (וגם של לקוח) — לא נשמר על העיר מידע משלה.' },
      { word:'דסק', entity:true,  why:'יחידה ארגונית עם שם, ראש דסק ושיוך לסניף — ישות (Desks).' },
      { word:'ראש דסק', entity:false, why:'תפקיד של מדריך קיים — קשר 1:1 בין Guides ל-Desks (HeadGuideID), לא ישות חדשה.' },
      { word:'לקוח', entity:true,  why:'הרבה לקוחות עם שם, ת"ז, טלפון ועיר — ישות (Customers).' },
      { word:'מיכל, אורן וסיגל', entity:false, why:'ערכים — שורות בטבלת הלקוחות, לא ישויות.' },
      { word:'מדריך טיולים', entity:true,  why:'הרבה מדריכים עם שם, רישיון, משכורת ודרגה — ישות (Guides).' },
      { word:'דרגה (מתחיל/בכיר/ראשי)', entity:false, why:'תכונה של מדריך עם תחום ערכים סגור (GuideRank).' },
      { word:'טיול', entity:true,  why:'פריט בקטלוג עם שם, ארץ, ימים ומחיר בסיס — ישות (Tours).' },
      { word:'ארץ יעד', entity:false, why:'תכונה של טיול (Country). הסיפור לא שומר על מדינות מידע נוסף.' },
      { word:'הזמנה', entity:true,  why:'הקשר M:N לקוח–טיול, עם תכונות משלו (תאריך, מחיר ששולם, ציון) — ישות מקשרת (Bookings).' },
      { word:'המחיר ששולם בפועל', entity:false, why:'תכונה של ההזמנה (PricePaid) — שונה ממחיר הבסיס של הטיול.' },
      { word:'מספר הנרשמים לטיול', entity:false, why:'תכונה נגזרת — COUNT על Bookings. לא נשמרת.' },
      { word:'חברות תעופה', entity:false, why:'הסיפור אומר במפורש שהטיסות "אינן מנוהלות במערכת" — מחוץ לגבולות המערכת.' }
    ],

    entities: [
      { name:'Offices', he:'סניפים', attrs:[
        { name:'OfficeID', pk:true },
        { name:'OfficeName', note:'ייחודי — מפתח חלופי' },
        { name:'City' } ] },
      { name:'Desks', he:'דסקים', attrs:[
        { name:'DeskID', pk:true },
        { name:'DeskName' },
        { name:'OfficeID', fk:'Offices', note:'קשר 1:N — כל דסק בסניף אחד' },
        { name:'HeadGuideID', fk:'Guides', note:'קשר 1:1 "ראש דסק" — FK + UNIQUE' } ] },
      { name:'Customers', he:'לקוחות', attrs:[
        { name:'CustomerID', pk:true },
        { name:'FullName' },
        { name:'IDNumber', note:'ת"ז ייחודית — מפתח חלופי' },
        { name:'Phone' },
        { name:'City' },
        { name:'DeskID', fk:'Desks', note:'הדסק שמטפל בלקוח' } ] },
      { name:'Guides', he:'מדריכי טיולים', attrs:[
        { name:'GuideID', pk:true },
        { name:'FullName' },
        { name:'LicenseNumber', note:'רישיון הדרכה ייחודי — מפתח חלופי' },
        { name:'Salary' },
        { name:'GuideRank', note:'מתחיל / בכיר / ראשי' },
        { name:'DeskID', fk:'Desks', note:'הדסק שבו המדריך עובד' } ] },
      { name:'Tours', he:'טיולים', attrs:[
        { name:'TourID', pk:true },
        { name:'TourName' },
        { name:'Country', note:'ארץ יעד — תכונה, לא ישות' },
        { name:'Days' },
        { name:'BasePrice', note:'מחיר בסיס — תכונה של הטיול' },
        { name:'DeskID', fk:'Desks' } ] },
      { name:'Bookings', he:'הזמנות (גישור לקוח–טיול)', attrs:[
        { name:'BookingID', pk:true },
        { name:'CustomerID', fk:'Customers' },
        { name:'TourID', fk:'Tours' },
        { name:'BookingDate', note:'תכונת הקשר' },
        { name:'PricePaid', note:'המחיר ששולם בפועל — תכונת הקשר' },
        { name:'Satisfaction', note:'ציון שביעות רצון 1–10 — תכונת הקשר (כמו FinalGrade)' } ] },
      { name:'TourGuides', he:'מדריכים בטיולים (גישור מדריך–טיול)', attrs:[
        { name:'TourGuideID', pk:true, note:'מפתח מלאכותי; UNIQUE(GuideID, TourID) נגד שיוך כפול. חלופה: PK מורכב (GuideID, TourID)' },
        { name:'GuideID', fk:'Guides' },
        { name:'TourID', fk:'Tours' } ] }
    ],

    relationships: [
      { a:'Offices', b:'Desks', verb:'מפעיל', card:'1:N', why:'"בכל סניף פועלים דסקים שונים" — ודסק שייך לסניף אחד. FK OfficeID ב-Desks.' },
      { a:'Guides', b:'Desks', verb:'עומד בראש', card:'1:1', why:'"לכל דסק יש ראש דסק… מדריך יכול לעמוד בראש דסק אחד לכל היותר" — אחד מכל צד. HeadGuideID ב-Desks + UNIQUE.' },
      { a:'Desks', b:'Guides', verb:'מעסיק', card:'1:N', why:'"כל דסק אחראי על… המדריכים הפועלים בתחומו" ו"כל מדריך משויך לדסק אחד". FK DeskID ב-Guides. קשר נפרד מקשר ראש הדסק.' },
      { a:'Desks', b:'Customers', verb:'מטפל ב', card:'1:N', why:'"כל לקוח משויך לדסק אחד המטפל בו", ולדסק לקוחות רבים.' },
      { a:'Desks', b:'Tours', verb:'משווק', card:'1:N', why:'"כל טיול משויך לדסק מסוים", ולדסק טיולים רבים.' },
      { a:'Customers', b:'Tours', verb:'מזמין', card:'M:N', bridge:'Bookings', why:'"כל לקוח יכול להזמין כמה טיולים", ובכל טיול לקוחות רבים. להזמנה תכונות משלה (תאריך, מחיר ששולם, ציון) — בטבלת הגישור.' },
      { a:'Guides', b:'Tours', verb:'מדריך', card:'M:N', bridge:'TourGuides', why:'"בכל טיול משתתפים כמה מדריכים", ו"מדריכי הטיולים מדריכים טיולים שונים".' }
    ],

    traps: [
      { q:'לקוח שילם 9,300 ש"ח על טיול שמחיר הבסיס שלו 9,800 ש"ח. איפה נשמר הסכום 9,300?',
        options:['ב-Tours.BasePrice — מעדכנים את מחיר הבסיס','בטבלת Customers, בעמודת PricePaid','ב-Bookings.PricePaid — תכונה של ההזמנה (הקשר M:N)','לא שומרים — מחשבים מ-BasePrice'],
        correct:2,
        explain:'המחיר ששולם תלוי בצירוף לקוח + טיול (הנחה אישית), ולכן הוא תכונה של הקשר ונשמר בטבלת הגישור. עדכון BasePrice היה משנה את המחיר לכל הלקוחות; עמודה ב-Customers לא יודעת לאיזה טיול הסכום שייך.' },
      { q:'"המערכת מציגה גם את מספר הנרשמים לכל טיול". מה נכון?',
        options:['זו תכונה נגזרת — מחשבים COUNT על Bookings ולא שומרים','מוסיפים עמודה NumRegistered ל-Tours ומעדכנים אותה בכל הזמנה','יוצרים ישות Registrations נוספת מלבד Bookings','שומרים את המספר בטבלת Desks'],
        correct:0,
        explain:'"מציגה" ≠ "שומרת". את מספר הנרשמים אפשר תמיד לחשב: SELECT TourID, COUNT(*) FROM Bookings GROUP BY TourID. עמודה שמורה הייתה עלולה לא להתאים לטבלת ההזמנות (חוסר עקביות).' },
      { q:'איך ממדלים את "ראש הדסק"?',
        options:['ישות DeskHeads נפרדת עם שם וטלפון','עמודת IsHead BIT בטבלת Guides — היא מבטיחה ראש אחד בדיוק לכל דסק','קשר M:N בין Guides ל-Desks','HeadGuideID בטבלת Desks: FK ל-Guides + UNIQUE (קשר 1:1)'],
        correct:3,
        explain:'ראש הדסק הוא מדריך — לכן FK לטבלת Guides. UNIQUE מבטיח שמדריך לא יעמוד בראש שני דסקים. דגל IsHead לא מונע שני "ראשים" באותו דסק או דסק בלי ראש — הוא לא מבטא את ה-1:1.' },
      { q:'"ארץ יעד" של טיול — ישות או תכונה?',
        options:['ישות Countries — חובה','תכונה (Country) של Tours — הסיפור לא שומר מידע נוסף על מדינות','תכונה של Customers','תכונה של Desks'],
        correct:1,
        explain:'מבחן הישות: האם שומרים על זה מידע משלו? כאן לא — רק שם הארץ. אילו נכתב "לכל ארץ נשמרים המטבע ודרישות הוויזה" — הייתה זו ישות עם קשר 1:N לטיולים.' },
      { q:'מה עושים עם "חברות התעופה" שבסיפור?',
        options:['ישות Airlines עם קשר M:N לטיולים','מוסיפים תכונה Airline ל-Customers','מתעלמים — הסיפור אומר במפורש שהטיסות אינן מנוהלות במערכת','ישות חלשה של Tours'],
        correct:2,
        explain:'גבולות המערכת נקבעים בסיפור. משפט כמו "אינן מנוהלות במערכת" הוא רמז מכוון שמדובר במסיח דעת.' }
    ],

    rubric: [
      '5 ישויות עיקריות: Offices, Desks, Customers, Guides, Tours — כל אחת עם PK.',
      '2 ישויות מקשרות: Bookings (לקוח–טיול) ו-TourGuides (מדריך–טיול).',
      'PricePaid, BookingDate ו-Satisfaction בטבלת Bookings; BasePrice נשאר ב-Tours.',
      'קשרי 1:N עם FK בצד ה-N: Offices–Desks, Desks–Customers, Desks–Guides, Desks–Tours.',
      'קשר 1:1 "ראש דסק" (HeadGuideID + UNIQUE), נפרד מקשר "מדריך עובד בדסק".',
      'מספר הנרשמים לא נשמר (נגזר); חברות התעופה לא ממודלות; מפתחות חלופיים: OfficeName, IDNumber, LicenseNumber.'
    ],
    mistakes: [
      'לשים PricePaid או Satisfaction בטבלת Tours או בטבלת Customers.',
      'עמודה NumRegistered בטבלת Tours (תכונה נגזרת).',
      'ישות Countries או Airlines ללא שום מידע שהסיפור דורש.',
      'לממש "מדריכים בטיול" עם FK GuideID בטבלת Tours — מאפשר מדריך אחד בלבד לטיול.',
      'לשכוח את קשר ראש הדסק, או לממש אותו כדגל IsHead.',
      'לחבר לקוח ישירות לסניף במקום לדסק (הסיפור: "כל לקוח משויך לדסק אחד").'
    ],

    dictionary: {
      entity: 'Customers',
      rows: [
        { attr:'CustomerID', type:['PK'], desc:'מזהה ייחודי של הלקוח', dataType:['INT'], domain:'מספר שלם חיובי, ייחודי, לא NULL', def:'אין (אפשר IDENTITY(1,1))', model:'INT' },
        { attr:'FullName', type:['רגילה','מורכבת'], desc:'שם מלא של הלקוח (פרטי + משפחה)', dataType:['NVARCHAR','VARCHAR'], domain:'טקסט עד 50 תווים, חובה', def:'—', model:'NVARCHAR(50)' },
        { attr:'IDNumber', type:['מפתח חלופי'], desc:'מספר תעודת זהות', dataType:['CHAR','VARCHAR','NVARCHAR'], domain:'בדיוק 9 ספרות (כולל אפסים מובילים — לכן לא INT), ייחודי, חובה', def:'—', model:'CHAR(9)' },
        { attr:'Phone', type:['רגילה'], desc:'טלפון נייד ליצירת קשר', dataType:['VARCHAR','CHAR','NVARCHAR'], domain:'פורמט 05X-XXXXXXX', def:'NULL', model:'VARCHAR(15)' },
        { attr:'City', type:['רגילה'], desc:'עיר המגורים של הלקוח', dataType:['NVARCHAR','VARCHAR'], domain:'שם עיר, עד 30 תווים', def:'NULL', model:'NVARCHAR(30)' },
        { attr:'DeskID', type:['FK'], desc:'הדסק שמטפל בלקוח', dataType:['INT'], domain:'DeskID קיים בטבלת Desks', def:'—', model:'INT' }
      ]
    },

    schemaSql: `
CREATE TABLE Offices (OfficeID INT PRIMARY KEY, OfficeName NVARCHAR(50) NOT NULL UNIQUE, City NVARCHAR(30) NOT NULL);
INSERT INTO Offices VALUES
 (1,'גלובוס תל אביב','תל אביב'),(2,'גלובוס חיפה','חיפה'),(3,'גלובוס ירושלים','ירושלים'),
 (4,'גלובוס באר שבע','באר שבע'),(5,'גלובוס אילת','אילת'),(6,'גלובוס נתניה','נתניה');

-- HeadGuideID = הקשר 1:1 "ראש דסק". ב-SQL Server מוסיפים את ה-FK אחרי יצירת Guides (הפניה מעגלית):
-- ALTER TABLE Desks ADD CONSTRAINT FK_Desks_Head FOREIGN KEY (HeadGuideID) REFERENCES Guides(GuideID);
CREATE TABLE Desks (DeskID INT PRIMARY KEY, DeskName NVARCHAR(50) NOT NULL, OfficeID INT NOT NULL REFERENCES Offices(OfficeID), HeadGuideID INT UNIQUE);
INSERT INTO Desks VALUES
 (11,'דסק אירופה',1,21),(12,'דסק המזרח הרחוק',1,23),(13,'דסק אפריקה',2,25),
 (14,'דסק אמריקה',3,26),(15,'דסק ישראל',4,28),(16,'דסק סקנדינביה',6,29);

CREATE TABLE Customers (CustomerID INT PRIMARY KEY, FullName NVARCHAR(50) NOT NULL, IDNumber CHAR(9) NOT NULL UNIQUE, Phone VARCHAR(15), City NVARCHAR(30), DeskID INT REFERENCES Desks(DeskID));
INSERT INTO Customers VALUES
 (1,'מיכל אדלר','301234567','050-1234567','תל אביב',11),
 (2,'אורן ביטון','302345678','052-2345678','רמת גן',11),
 (3,'סיגל חסון','303456789','054-3456789','הרצליה',11),
 (4,'יונתן קליין','304567890','053-4567890','חולון',12),
 (5,'ליה וולך','305678901','050-5678901','תל אביב',12),
 (6,'אחמד מנסור','306789012','052-6789012','חיפה',13),
 (7,'רינת גבאי','307890123','054-7890123','עכו',13),
 (8,'עמרי דהן','308901234','058-8901234','ירושלים',14),
 (9,'טל ששון','309012345','050-9012345','מבשרת ציון',14),
 (10,'נטע ארד','310123456','052-0123456','נתניה',16),
 (11,'גבי סלים','311234567','053-1234567','כפר סבא',16);

CREATE TABLE Guides (GuideID INT PRIMARY KEY, FullName NVARCHAR(50) NOT NULL, LicenseNumber VARCHAR(10) NOT NULL UNIQUE, Salary INT, GuideRank NVARCHAR(20), DeskID INT REFERENCES Desks(DeskID));
INSERT INTO Guides VALUES
 (21,'עדי שגב','LG-4021',15500,'ראשי',11),
 (22,'בועז נחמיאס','LG-4188',11000,'מתחיל',11),
 (23,'קרן יוסף','LG-4302',13500,'בכיר',12),
 (24,'ניר אשכנזי','LG-4419',12000,'בכיר',12),
 (25,'פטימה זועבי','LG-4570',12800,'בכיר',13),
 (26,'גיל רוזן','LG-4633',16000,'ראשי',14),
 (27,'הדס מלכה','LG-4791',9800,'מתחיל',14),
 (28,'שי פרידמן','LG-4855',11500,'בכיר',15),
 (29,'אינגריד לוי','LG-4902',13000,'בכיר',16);

CREATE TABLE Tours (TourID INT PRIMARY KEY, TourName NVARCHAR(50) NOT NULL, Country NVARCHAR(30), Days INT, BasePrice DECIMAL(10,2), DeskID INT REFERENCES Desks(DeskID));
INSERT INTO Tours VALUES
 (101,'קסמי טוסקנה','איטליה',8,9800,11),
 (102,'פריז והלואר','צרפת',7,8900,11),
 (103,'יפן בפריחת הדובדבן','יפן',14,21500,12),
 (104,'תאילנד הקלאסית','תאילנד',12,12900,12),
 (105,'ספארי בקניה','קניה',10,17800,13),
 (106,'הפארקים הלאומיים','ארצות הברית',15,19900,14),
 (107,'הגליל והגולן','ישראל',4,2400,15),
 (108,'פיורדים בנורווגיה','נורווגיה',9,15400,16),
 (109,'מרוקו המלכותית','מרוקו',8,8600,13);

CREATE TABLE Bookings (BookingID INT PRIMARY KEY, CustomerID INT REFERENCES Customers(CustomerID), TourID INT REFERENCES Tours(TourID), BookingDate DATE, PricePaid DECIMAL(10,2), Satisfaction INT CHECK (Satisfaction BETWEEN 1 AND 10));
INSERT INTO Bookings VALUES
 (1,1,101,'2025-01-10',9800,9),(2,1,103,'2025-02-01',20500,10),(3,2,101,'2025-01-12',9300,8),
 (4,3,102,'2025-02-20',8900,7),(5,4,103,'2025-03-02',21500,9),(6,5,104,'2025-03-05',12900,NULL),
 (7,6,105,'2025-03-11',16900,10),(8,7,105,'2025-03-15',17800,6),(9,7,109,'2025-04-01',8600,9),
 (10,8,106,'2025-04-03',19900,8),(11,9,106,'2025-04-07',18900,9),(12,10,108,'2025-04-20',15400,NULL),
 (13,4,101,'2025-05-02',9800,10);

CREATE TABLE TourGuides (TourGuideID INT PRIMARY KEY, GuideID INT REFERENCES Guides(GuideID), TourID INT REFERENCES Tours(TourID), UNIQUE (GuideID, TourID));
INSERT INTO TourGuides VALUES
 (1,21,101),(2,22,101),(3,21,102),(4,23,103),(5,24,103),(6,24,104),(7,25,105),
 (8,22,105),(9,26,106),(10,27,106),(11,29,106),(12,29,108),(13,25,109);
`,
    tables: [
      { name:'Offices',    cols:'OfficeID, OfficeName, City' },
      { name:'Desks',      cols:'DeskID, DeskName, OfficeID, HeadGuideID' },
      { name:'Customers',  cols:'CustomerID, FullName, IDNumber, Phone, City, DeskID' },
      { name:'Guides',     cols:'GuideID, FullName, LicenseNumber, Salary, GuideRank, DeskID' },
      { name:'Tours',      cols:'TourID, TourName, Country, Days, BasePrice, DeskID' },
      { name:'Bookings',   cols:'BookingID, CustomerID, TourID, BookingDate, PricePaid, Satisfaction' },
      { name:'TourGuides', cols:'TourGuideID, GuideID, TourID' }
    ],

    queries: [
      { n:1, pattern:PAT[1],
        prompt:'הצג את השמות והערים של כל הסניפים של החברה. פלט: שם הסניף, העיר (2 עמודות).',
        solution:`SELECT OfficeName, City
FROM Offices;`,
        alt:[`SELECT o.OfficeName, o.City FROM Offices o;`],
        explain:`הטלה פשוטה של 2 עמודות. "גלובוס אילת" מופיע אף שאין בו דסקים — אין JOIN שיכול להעלים אותו. שימו לב לסדר העמודות: קודם שם ואז עיר, כמו בניסוח השאלה.` },

      { n:2, pattern:PAT[2],
        prompt:'הצג את כל הדסקים עם שמותיהם ושם הסניף שבו הם פועלים. פלט: שם הדסק, שם הסניף (2 עמודות).',
        solution:`SELECT d.DeskName, o.OfficeName
FROM Desks d
JOIN Offices o ON d.OfficeID = o.OfficeID;`,
        alt:[`SELECT d.DeskName, o.OfficeName FROM Offices o JOIN Desks d ON o.OfficeID = d.OfficeID;`,
             `SELECT d.DeskName, o.OfficeName FROM Desks d, Offices o WHERE d.OfficeID = o.OfficeID;`],
        explain:`Desks.OfficeID (FK) = Offices.OfficeID (PK). בסניף תל אביב שני דסקים — שם הסניף חוזר פעמיים, וזה תקין. שימו לב לא לחבר דרך HeadGuideID — זה קשר אחר לגמרי (ראש הדסק).` },

      { n:3, pattern:PAT[3],
        prompt:'שלוף את שמות הלקוחות עם הטיולים שהזמינו, רק אם ציון שביעות הרצון שנתנו גבוה מ-8. פלט: שם הלקוח, שם הטיול, ציון שביעות הרצון (3 עמודות).',
        solution:`SELECT c.FullName, t.TourName, b.Satisfaction
FROM Customers c
JOIN Bookings b ON c.CustomerID = b.CustomerID
JOIN Tours t ON b.TourID = t.TourID
WHERE b.Satisfaction > 8;`,
        alt:[`SELECT c.FullName, t.TourName, b.Satisfaction FROM Bookings b JOIN Customers c ON c.CustomerID = b.CustomerID JOIN Tours t ON t.TourID = b.TourID WHERE b.Satisfaction > 8;`,
             `SELECT c.FullName, t.TourName, b.Satisfaction FROM Customers c, Bookings b, Tours t WHERE c.CustomerID = b.CustomerID AND b.TourID = t.TourID AND b.Satisfaction > 8;`],
        explain:`לקוח ← Bookings (גישור) → טיול, והסינון על Satisfaction שבטבלת הגישור. אורן ביטון נתן 8 בדיוק — לא נכלל (> ולא >=). ליה וולך ונטע ארד עוד לא טיילו (Satisfaction = NULL) — השוואה עם NULL אינה "אמת", ולכן הן לא מופיעות. מיכל אדלר מופיעה פעמיים — שני טיולים שונים.` },

      { n:4, pattern:PAT[4],
        prompt:'שלוף את כל המדריכים שמרוויחים מעל 12,000 ש"ח. פלט: שם המדריך, המשכורת (2 עמודות).',
        solution:`SELECT FullName, Salary
FROM Guides
WHERE Salary > 12000;`,
        alt:[`SELECT g.FullName, g.Salary FROM Guides g WHERE g.Salary > 12000 ORDER BY g.Salary DESC;`],
        explain:`WHERE עם השוואה מספרית. ניר אשכנזי מרוויח 12,000 בדיוק ולכן לא נכלל. בלי גרשיים סביב המספר ובלי פסיק אלפים.` },

      { n:5, pattern:PAT[5],
        prompt:'הצג את מספר הלקוחות בכל דסק. פלט: שם הדסק, מספר הלקוחות (2 עמודות). מספיק להציג דסקים שיש בהם לקוחות.',
        solution:`SELECT d.DeskName, COUNT(c.CustomerID) AS NumCustomers
FROM Desks d
JOIN Customers c ON c.DeskID = d.DeskID
GROUP BY d.DeskID, d.DeskName;`,
        alt:[`SELECT d.DeskName, COUNT(*) FROM Customers c JOIN Desks d ON c.DeskID = d.DeskID GROUP BY d.DeskID, d.DeskName;`],
        accept:[`SELECT d.DeskName, COUNT(c.CustomerID) FROM Desks d LEFT JOIN Customers c ON c.DeskID = d.DeskID GROUP BY d.DeskID, d.DeskName;`],
        explain:`מקבצים לפי דסק וסופרים לקוחות. ב-SQL Server כל עמודה לא-צוברת ב-SELECT חייבת להיות ב-GROUP BY, ולכן DeskID וגם DeskName. "דסק ישראל" ריק ולא מופיע ב-JOIN רגיל; אם הצגתם אותו עם 0 (LEFT JOIN) — גם זה מתקבל, וזו שאלה 7.` },

      { n:6, pattern:PAT[6],
        prompt:'הצג את כל הטיולים עם המדריכים שמדריכים בהם. ודא שגם טיולים שאין בהם מדריכים יוצגו. פלט: שם הטיול, שם המדריך (2 עמודות; לטיול בלי מדריך יופיע NULL).',
        solution:`SELECT t.TourName, g.FullName
FROM Tours t
LEFT JOIN TourGuides tg ON t.TourID = tg.TourID
LEFT JOIN Guides g ON tg.GuideID = g.GuideID;`,
        alt:[`SELECT t.TourName, g.FullName FROM Guides g JOIN TourGuides tg ON g.GuideID = tg.GuideID RIGHT JOIN Tours t ON tg.TourID = t.TourID;`],
        explain:`Tours משמאל ושני LEFT JOIN — כך "הגליל והגולן" (בלי מדריכים) נשאר עם NULL. אם ה-JOIN השני רגיל, הוא מעלים את השורה הזו שוב. "הפארקים הלאומיים" מופיע 3 פעמים — שורה לכל מדריך.` },

      { n:7, pattern:PAT[7],
        prompt:'הצג את כל הדסקים עם מספר הלקוחות שלהם, כולל דסקים שאין בהם לקוחות. פלט: שם הדסק, מספר הלקוחות (2 עמודות; לדסק ריק — 0).',
        solution:`SELECT d.DeskName, COUNT(c.CustomerID) AS NumCustomers
FROM Desks d
LEFT JOIN Customers c ON c.DeskID = d.DeskID
GROUP BY d.DeskID, d.DeskName;`,
        alt:[`SELECT d.DeskName, (SELECT COUNT(*) FROM Customers c WHERE c.DeskID = d.DeskID) FROM Desks d;`],
        explain:`LEFT JOIN שומר את "דסק ישראל", ו-COUNT(c.CustomerID) מחזיר לו 0 כי הוא מתעלם מ-NULL. COUNT(*) היה מחזיר 1 — טעות נפוצה. Desks חייבת להיות בצד שמאל של ה-LEFT JOIN.` },

      { n:8, pattern:PAT[8],
        prompt:'מצא את כל הטיולים שמודרכים על ידי יותר ממדריך אחד. פלט: שם הטיול, מספר המדריכים (2 עמודות).',
        solution:`SELECT t.TourName, COUNT(tg.GuideID) AS NumGuides
FROM Tours t
JOIN TourGuides tg ON t.TourID = tg.TourID
GROUP BY t.TourID, t.TourName
HAVING COUNT(tg.GuideID) > 1;`,
        alt:[`SELECT t.TourName, COUNT(*) FROM TourGuides tg JOIN Tours t ON t.TourID = tg.TourID GROUP BY t.TourID, t.TourName HAVING COUNT(*) >= 2;`],
        explain:`GROUP BY על הטיול + HAVING על תוצאת ה-COUNT. סינון של פונקציה צוברת לא נכתב ב-WHERE. "פריז והלואר" (מדריך אחד) ו"הגליל והגולן" (בלי מדריך) לא עוברים את הסף.` },

      { n:9, pattern:PAT[9],
        prompt:'הצג את שמות הלקוחות יחד עם שמות הדסקים שמטפלים בהם. פלט: שם הלקוח, שם הדסק (2 עמודות).',
        solution:`SELECT c.FullName, d.DeskName
FROM Customers c
JOIN Desks d ON c.DeskID = d.DeskID;`,
        alt:[`SELECT c.FullName, d.DeskName FROM Customers c, Desks d WHERE c.DeskID = d.DeskID;`],
        explain:`JOIN בן → אב: Customers.DeskID = Desks.DeskID. כל 11 הלקוחות מופיעים, כולל גבי סלים שעוד לא הזמין טיול — אין כאן מעבר דרך Bookings.` },

      { n:10, pattern:PAT[10],
        prompt:'שלוף את שמות המדריכים עם הדסקים שבהם הם עובדים. פלט: שם המדריך, שם הדסק (2 עמודות).',
        solution:`SELECT g.FullName, d.DeskName
FROM Guides g
JOIN Desks d ON g.DeskID = d.DeskID;`,
        alt:[`SELECT g.FullName, d.DeskName FROM Desks d JOIN Guides g ON d.DeskID = g.DeskID;`],
        accept:[`SELECT DISTINCT g.FullName, d.DeskName FROM Guides g JOIN TourGuides tg ON g.GuideID = tg.GuideID JOIN Tours t ON tg.TourID = t.TourID JOIN Desks d ON t.DeskID = d.DeskID;`],
        explain:`Guides.DeskID = Desks.DeskID. לא להתבלבל עם Desks.HeadGuideID (ראש הדסק) — JOIN עליו מחזיר רק 6 ראשי דסקים. פרשנות נוספת שמתקבלת: "הדסקים של הטיולים שהמדריך מדריך" (דרך TourGuides ו-Tours, עם DISTINCT) — שם, למשל, בועז נחמיאס מופיע עם שני דסקים.` }
    ]
  },

  /* =====================================================================
     מבחן מקביל 3 — רשת המרכזים הקהילתיים (מתנ"סים)
     Centers → Divisions → Participants / Instructors / Activities ; Registrations + ActivityInstructors
     ===================================================================== */
  {
    id: 'centers',
    title: 'רשת המרכזים הקהילתיים של גבעת אורנים',
    source: 'מבחן מקביל 3 — מקורי, באותו מבנה ובאותה רמת קושי כמו המבחן לדוגמה (מועד א 14.2.25)',
    story: `עיריית גבעת אורנים מעוניינת לפתח מערכת מידע לניהול רשת המרכזים הקהילתיים (מתנ"סים) בעיר. המערכת תתמקד בניהול מרכזים קהילתיים, אגפי פעילות, משתתפים, מדריכים, חוגים ויחסי הגומלין ביניהם.
ברשת פועלים מספר מרכזים קהילתיים, כאשר לכל מרכז יש שם ייחודי והשכונה שבה הוא נמצא. בכל מרכז פועלים אגפים שונים, כאשר כל אגף אחראי על קהל יעד או תחום מוגדר, כגון אגף הילדים המפעיל חוגי העשרה אחרי הלימודים או אגף גיל הזהב המפעיל פעילות לאזרחים ותיקים.
לכל אגף יש רכז אגף, שהוא גם אחד המדריכים ולוקח אחריות על תפקוד האגף; מדריך יכול לרכז אגף אחד לכל היותר. בנוסף, כל אגף אחראי על המשתתפים והמדריכים הפועלים בתחומו. לדוגמה, אגף הילדים במרכז הקהילתי הדר מטפל במשתתפים כמו אלה, נדב ויעל.
כל משתתף משויך לאגף אחד ונרשם לחוגים שונים. לכל משתתף יש מידע אישי הכולל שם מלא, מספר תעודת זהות ייחודי, תאריך לידה וטלפון ליצירת קשר. המערכת מציגה גם את גיל המשתתף.
כל מדריך משויך לאגף אחד. המדריכים מעבירים חוגים שונים, וכל מדריך מחזיק בפרטי מידע כמו שם מלא, מספר תעודת זהות ייחודי, משכורת חודשית ותחום הדרכה.
מערך החוגים מורכב מחוגים רבים, כאשר כל חוג משויך לאגף מסוים, ולכל חוג יש שם, דמי השתתפות חודשיים ויום קבוע שבו הוא מתקיים בחדר מסוים במרכז. בכל חוג יכולים להדריך כמה מדריכים, וכל משתתף יכול להירשם לכמה חוגים. עבור כל רישום נשמרים תאריך הרישום ואחוז הנוכחות של המשתתף באותו חוג.
בהתאם לתיאור זה, יש לייצר תרשים ERD המתאר את מבנה הנתונים של המערכת, תוך התייחסות למרכזים הקהילתיים, לאגפים, למשתתפים, למדריכים ולחוגים, ולתאר את הקשרים ביניהם בהתאם לסיפור המערכת.`,

    candidates: [
      { word:'עיריית גבעת אורנים', entity:false, why:'מזמינת המערכת — מופע יחיד, לא נשמר עליה מידע.' },
      { word:'מרכז קהילתי', entity:true,  why:'הרבה מרכזים, לכל אחד שם ייחודי ושכונה — ישות (Centers).' },
      { word:'שכונה', entity:false, why:'תכונה של מרכז (Neighborhood).' },
      { word:'אגף', entity:true,  why:'יחידה ארגונית עם שם, רכז ושיוך למרכז — ישות (Divisions).' },
      { word:'רכז אגף', entity:false, why:'תפקיד של מדריך קיים — קשר 1:1 (CoordinatorID ב-Divisions), לא ישות חדשה.' },
      { word:'משתתף', entity:true,  why:'הרבה משתתפים עם שם, ת"ז, תאריך לידה וטלפון — ישות (Participants).' },
      { word:'אלה, נדב ויעל', entity:false, why:'ערכים — שורות בטבלת המשתתפים.' },
      { word:'גיל המשתתף', entity:false, why:'תכונה נגזרת מתאריך הלידה — "מציגה", לא "שומרת".' },
      { word:'מדריך', entity:true,  why:'הרבה מדריכים עם שם, ת"ז, משכורת ותחום — ישות (Instructors).' },
      { word:'תחום הדרכה', entity:false, why:'תכונה של מדריך (Expertise).' },
      { word:'חוג', entity:true,  why:'פריט עם שם, דמי השתתפות, יום וחדר ושיוך לאגף — ישות (Activities).' },
      { word:'חדר', entity:false, why:'תכונה של חוג (Room). הסיפור לא שומר על חדרים מידע משלהם (קיבולת, ציוד…).' },
      { word:'דמי השתתפות חודשיים', entity:false, why:'תכונה של החוג (MonthlyFee) — זהה לכל המשתתפים בו.' },
      { word:'רישום לחוג', entity:true,  why:'הקשר M:N משתתף–חוג, עם תכונות משלו (תאריך, אחוז נוכחות) — ישות מקשרת (Registrations).' },
      { word:'אחוז נוכחות', entity:false, why:'תכונה של הרישום — תלויה גם במשתתף וגם בחוג.' }
    ],

    entities: [
      { name:'Centers', he:'מרכזים קהילתיים', attrs:[
        { name:'CenterID', pk:true },
        { name:'CenterName', note:'ייחודי — מפתח חלופי' },
        { name:'Neighborhood' } ] },
      { name:'Divisions', he:'אגפים', attrs:[
        { name:'DivisionID', pk:true },
        { name:'DivisionName' },
        { name:'CenterID', fk:'Centers', note:'קשר 1:N — כל אגף במרכז אחד' },
        { name:'CoordinatorID', fk:'Instructors', note:'קשר 1:1 "רכז אגף" — FK + UNIQUE' } ] },
      { name:'Participants', he:'משתתפים', attrs:[
        { name:'ParticipantID', pk:true },
        { name:'FullName' },
        { name:'IDNumber', note:'ת"ז ייחודית — מפתח חלופי' },
        { name:'BirthDate', note:'הגיל נגזר ממנו' },
        { name:'Phone' },
        { name:'DivisionID', fk:'Divisions' } ] },
      { name:'Instructors', he:'מדריכים', attrs:[
        { name:'InstructorID', pk:true },
        { name:'FullName' },
        { name:'IDNumber', note:'מפתח חלופי' },
        { name:'Salary' },
        { name:'Expertise', note:'תחום הדרכה' },
        { name:'DivisionID', fk:'Divisions', note:'האגף שבו המדריך עובד' } ] },
      { name:'Activities', he:'חוגים', attrs:[
        { name:'ActivityID', pk:true },
        { name:'ActivityName' },
        { name:'MonthlyFee', note:'תכונה של החוג — לא של הרישום' },
        { name:'MeetingDay' },
        { name:'Room', note:'תכונה, לא ישות' },
        { name:'DivisionID', fk:'Divisions' } ] },
      { name:'Registrations', he:'רישומים (גישור משתתף–חוג)', attrs:[
        { name:'RegistrationID', pk:true },
        { name:'ParticipantID', fk:'Participants' },
        { name:'ActivityID', fk:'Activities' },
        { name:'RegistrationDate', note:'תכונת הקשר' },
        { name:'AttendancePct', note:'אחוז נוכחות — תכונת הקשר (כמו FinalGrade)' } ] },
      { name:'ActivityInstructors', he:'מדריכים בחוגים (גישור מדריך–חוג)', attrs:[
        { name:'ActivityInstructorID', pk:true, note:'מפתח מלאכותי; UNIQUE(InstructorID, ActivityID) נגד שיוך כפול. חלופה: PK מורכב (InstructorID, ActivityID)' },
        { name:'InstructorID', fk:'Instructors' },
        { name:'ActivityID', fk:'Activities' } ] }
    ],

    relationships: [
      { a:'Centers', b:'Divisions', verb:'מפעיל', card:'1:N', why:'"בכל מרכז פועלים אגפים שונים" — ואגף שייך למרכז אחד.' },
      { a:'Instructors', b:'Divisions', verb:'מרכז', card:'1:1', why:'"לכל אגף יש רכז אגף… מדריך יכול לרכז אגף אחד לכל היותר". CoordinatorID ב-Divisions + UNIQUE.' },
      { a:'Divisions', b:'Instructors', verb:'מעסיק', card:'1:N', why:'"כל אגף אחראי על… המדריכים הפועלים בתחומו" ו"כל מדריך משויך לאגף אחד". FK DivisionID ב-Instructors. קשר נפרד מקשר הריכוז.' },
      { a:'Divisions', b:'Participants', verb:'משרת', card:'1:N', why:'"כל משתתף משויך לאגף אחד", ובאגף משתתפים רבים.' },
      { a:'Divisions', b:'Activities', verb:'מפעיל', card:'1:N', why:'"כל חוג משויך לאגף מסוים", ולאגף חוגים רבים.' },
      { a:'Participants', b:'Activities', verb:'נרשם ל', card:'M:N', bridge:'Registrations', why:'"כל משתתף יכול להירשם לכמה חוגים", ובכל חוג משתתפים רבים. תאריך הרישום ואחוז הנוכחות — בטבלת הגישור.' },
      { a:'Instructors', b:'Activities', verb:'מדריך ב', card:'M:N', bridge:'ActivityInstructors', why:'"בכל חוג יכולים להדריך כמה מדריכים", ו"המדריכים מעבירים חוגים שונים".' }
    ],

    traps: [
      { q:'איפה נשמר "אחוז הנוכחות"?',
        options:['Participants.AttendancePct','Activities.AttendancePct','Registrations.AttendancePct — תכונה של הרישום (הקשר M:N)','Instructors.AttendancePct'],
        correct:2,
        explain:'אחוז הנוכחות הוא "של המשתתף באותו חוג" — תלוי בשני הצדדים, ולכן הוא תכונה של הקשר ויושב בטבלת הגישור (כמו FinalGrade במבחן לדוגמה).' },
      { q:'"דמי השתתפות חודשיים" — איפה הם נשמרים?',
        options:['Activities.MonthlyFee — מחיר קבוע של החוג','Registrations.MonthlyFee — כי כל רישום משלם','Participants.MonthlyFee','Divisions.MonthlyFee'],
        correct:0,
        explain:'לפי הסיפור "לכל חוג יש… דמי השתתפות חודשיים" — הערך תלוי בחוג בלבד, ולכן הוא תכונה של Activities. רק אם היה כתוב שכל משתתף יכול לקבל מחיר שונה (הנחת אחים, מלגה) — הוא היה עובר לטבלת הגישור. השוו לאחוז הנוכחות, שתלוי בשני הצדדים.' },
      { q:'"החוג מתקיים בחדר מסוים במרכז". מה זה החדר?',
        options:['ישות Rooms עם קשר M:N לחוגים','תכונה של Divisions','ישות חלשה של Centers','תכונה (Room) של Activities — לא נשמר על החדר מידע נוסף'],
        correct:3,
        explain:'ישות דורשת מידע משלה. אילו נכתב "לכל חדר נשמרים קיבולת וציוד" — היה זה Rooms עם FK RoomID ב-Activities. כאן החדר הוא רק ערך שמתאר את החוג.' },
      { q:'בין Instructors ל-Divisions יש שני קשרים. מה נכון?',
        options:['זה אותו קשר — מספיק FK אחד','"מדריך שייך לאגף" הוא 1:N (DivisionID ב-Instructors), ו"רכז אגף" הוא 1:1 (CoordinatorID ב-Divisions + UNIQUE) — שני קשרים נפרדים','שניהם M:N ולכן צריך טבלת גישור אחת לשניהם','"רכז אגף" הוא ישות חלשה'],
        correct:1,
        explain:'לכל קשר משמעות אחרת: אגף מעסיק מדריכים רבים, אבל רק אחד מהם הוא הרכז. לכן שני קווים בתרשים ושני FK — כמו "ראש מחלקה" מול "מרצה במחלקה" במבחן לדוגמה.' },
      { q:'אילו היה כתוב "לכל משתתף יכולים להיות כמה מספרי טלפון" — מה היה משתנה?',
        options:['כלום — עמודת Phone אחת עם פסיקים','מוסיפים Phone1, Phone2, Phone3 ל-Participants','זו תכונה רב-ערכית: טבלה נפרדת ParticipantPhones(ParticipantID, Phone)','הופכים את Phone למפתח הראשי'],
        correct:2,
        explain:'תכונה רב-ערכית (אליפסה כפולה) ממומשת בטבלה נפרדת שמפתחה (ParticipantID, Phone). רשימה בעמודה אחת שוברת את הצורה הנורמלית הראשונה; Phone1..3 מגביל ויוצר NULL-ים.' }
    ],

    rubric: [
      '5 ישויות עיקריות: Centers, Divisions, Participants, Instructors, Activities — כל אחת עם PK.',
      '2 ישויות מקשרות: Registrations (משתתף–חוג) ו-ActivityInstructors (מדריך–חוג).',
      'AttendancePct ו-RegistrationDate ב-Registrations; MonthlyFee, MeetingDay ו-Room ב-Activities.',
      'קשרי 1:N עם FK בצד ה-N: Centers–Divisions, Divisions–Participants, Divisions–Instructors, Divisions–Activities.',
      'קשר 1:1 "רכז אגף" (CoordinatorID + UNIQUE), נפרד מקשר "מדריך עובד באגף".',
      'הגיל לא נשמר (נגזר מ-BirthDate); מפתחות חלופיים: CenterName ו-IDNumber.'
    ],
    mistakes: [
      'לשים את אחוז הנוכחות ב-Participants או ב-Activities.',
      'להעביר את דמי ההשתתפות לטבלת הגישור בלי שהסיפור מצדיק זאת.',
      'ישות Rooms או "עירייה" מיותרת.',
      'לממש "מדריכים בחוג" עם FK InstructorID ב-Activities — מאפשר מדריך אחד בלבד.',
      'עמודת Age ב-Participants.',
      'לחבר משתתף ישירות למרכז הקהילתי במקום לאגף.'
    ],

    dictionary: {
      entity: 'Participants',
      rows: [
        { attr:'ParticipantID', type:['PK'], desc:'מזהה ייחודי של המשתתף', dataType:['INT'], domain:'מספר שלם חיובי, ייחודי, לא NULL', def:'אין (אפשר IDENTITY(1,1))', model:'INT' },
        { attr:'FullName', type:['רגילה','מורכבת'], desc:'שם מלא של המשתתף (פרטי + משפחה)', dataType:['NVARCHAR','VARCHAR'], domain:'טקסט עד 50 תווים, חובה', def:'—', model:'NVARCHAR(50)' },
        { attr:'IDNumber', type:['מפתח חלופי'], desc:'מספר תעודת זהות', dataType:['CHAR','VARCHAR','NVARCHAR'], domain:'בדיוק 9 ספרות (כולל אפסים מובילים — לכן לא INT), ייחודי, חובה', def:'—', model:'CHAR(9)' },
        { attr:'BirthDate', type:['רגילה'], desc:'תאריך לידה — ממנו מחושב הגיל המוצג', dataType:['DATE','DATETIME'], domain:'תאריך עבר, לא אחרי היום', def:'—', model:'DATE' },
        { attr:'Phone', type:['רגילה'], desc:'טלפון ליצירת קשר', dataType:['VARCHAR','CHAR','NVARCHAR'], domain:'מספר טלפון ישראלי, נייד או קווי (למשל 050-1234567 או 03-1234567)', def:'NULL', model:'VARCHAR(15)' },
        { attr:'DivisionID', type:['FK'], desc:'האגף שאליו המשתתף משויך', dataType:['INT'], domain:'DivisionID קיים בטבלת Divisions', def:'—', model:'INT' }
      ]
    },

    schemaSql: `
CREATE TABLE Centers (CenterID INT PRIMARY KEY, CenterName NVARCHAR(50) NOT NULL UNIQUE, Neighborhood NVARCHAR(30) NOT NULL);
INSERT INTO Centers VALUES
 (1,'המרכז הקהילתי הדר','הדר'),(2,'המרכז הקהילתי נווה גן','נווה גן'),(3,'המרכז הקהילתי רמות','רמות'),
 (4,'המרכז הקהילתי גבעת הזיתים','גבעת הזיתים'),(5,'המרכז הקהילתי כרמל','כרמל'),(6,'המרכז הקהילתי נאות אפקה','נאות אפקה');

-- CoordinatorID = הקשר 1:1 "רכז אגף". ב-SQL Server מוסיפים את ה-FK אחרי יצירת Instructors (הפניה מעגלית):
-- ALTER TABLE Divisions ADD CONSTRAINT FK_Divisions_Coord FOREIGN KEY (CoordinatorID) REFERENCES Instructors(InstructorID);
CREATE TABLE Divisions (DivisionID INT PRIMARY KEY, DivisionName NVARCHAR(50) NOT NULL, CenterID INT NOT NULL REFERENCES Centers(CenterID), CoordinatorID INT UNIQUE);
INSERT INTO Divisions VALUES
 (11,'אגף ילדים',1,31),(12,'אגף נוער',1,33),(13,'אגף מבוגרים',2,35),
 (14,'אגף גיל הזהב',3,36),(15,'אגף ספורט',4,38),(16,'אגף אומנויות',5,39);

CREATE TABLE Participants (ParticipantID INT PRIMARY KEY, FullName NVARCHAR(50) NOT NULL, IDNumber CHAR(9) NOT NULL UNIQUE, BirthDate DATE, Phone VARCHAR(15), DivisionID INT REFERENCES Divisions(DivisionID));
INSERT INTO Participants VALUES
 (1,'אלה ברגר','331111110','2015-04-12','050-3311111',11),
 (2,'נדב ששון','332222221','2014-09-30','052-3322222',11),
 (3,'יעל מימון','333333332','2016-01-22','054-3333333',11),
 (4,'עמית רז','334444443','2009-06-17','053-3344444',12),
 (5,'שחר דגן','335555554','2010-11-03','050-3355555',12),
 (6,'ריטה גורדון','336666665','1975-02-28','052-3366666',13),
 (7,'משה פרלמן','337777776','1950-08-19','03-6377777',14),
 (8,'זהבה קדוש','338888887','1948-03-05','03-6388888',14),
 (9,'רפאל אוחנה','339999998','1946-12-25','054-3399999',14),
 (10,'דפנה שור','340000009','1988-07-07','058-3400000',16),
 (11,'בני ממן','341111110','1979-10-14','050-3411111',13);

CREATE TABLE Instructors (InstructorID INT PRIMARY KEY, FullName NVARCHAR(50) NOT NULL, IDNumber CHAR(9) NOT NULL UNIQUE, Salary INT, Expertise NVARCHAR(30), DivisionID INT REFERENCES Divisions(DivisionID));
INSERT INTO Instructors VALUES
 (31,'שרון אביטל','023456781',9200,'מחול',11),
 (32,'עידו פלד','024567892',7400,'רובוטיקה',11),
 (33,'מור יעקב','025678903',8000,'תיאטרון',12),
 (34,'חן גבריאלי','026789014',8600,'כדורסל',12),
 (35,'ולדימיר פוקס','027890125',10400,'שחמט',13),
 (36,'אסתר כהנא','028901236',7800,'התעמלות',14),
 (37,'יוסי אבוטבול','029012347',6900,'אומנות',14),
 (38,'לירון סער','030123458',9900,'כושר',15),
 (39,'נדב ארליך','031234569',8300,'קרמיקה',16);

CREATE TABLE Activities (ActivityID INT PRIMARY KEY, ActivityName NVARCHAR(50) NOT NULL, MonthlyFee DECIMAL(8,2), MeetingDay NVARCHAR(10), Room NVARCHAR(20), DivisionID INT REFERENCES Divisions(DivisionID));
INSERT INTO Activities VALUES
 (101,'בלט קלאסי',220,'שני','אולם מחול',11),
 (102,'רובוטיקה לילדים',260,'רביעי','מעבדה',11),
 (103,'להקת תיאטרון',240,'שלישי','אולם מופעים',12),
 (104,'ליגת כדורסל',200,'חמישי','אולם ספורט',12),
 (105,'מועדון שחמט',150,'ראשון','חדר 3',13),
 (106,'התעמלות בונה עצם',120,'שני','סטודיו',14),
 (107,'סדנת קרמיקה',280,'רביעי','סדנה',16),
 (108,'פילאטיס',180,'שלישי','סטודיו',15),
 (109,'ציור בצבעי מים',190,'חמישי','חדר 5',14);

CREATE TABLE Registrations (RegistrationID INT PRIMARY KEY, ParticipantID INT REFERENCES Participants(ParticipantID), ActivityID INT REFERENCES Activities(ActivityID), RegistrationDate DATE, AttendancePct INT CHECK (AttendancePct BETWEEN 0 AND 100));
INSERT INTO Registrations VALUES
 (1,1,101,'2024-09-01',92),(2,1,102,'2024-09-01',75),(3,2,102,'2024-09-03',68),
 (4,3,101,'2024-09-05',81),(5,4,103,'2024-09-02',88),(6,4,104,'2024-09-02',54),
 (7,5,104,'2024-09-10',97),(8,6,105,'2024-10-01',79),(9,7,106,'2024-09-15',100),
 (10,8,106,'2024-09-15',73),(11,9,109,'2024-10-12',85),(12,10,107,'2024-11-01',90),
 (13,6,107,'2024-11-03',60);

CREATE TABLE ActivityInstructors (ActivityInstructorID INT PRIMARY KEY, InstructorID INT REFERENCES Instructors(InstructorID), ActivityID INT REFERENCES Activities(ActivityID), UNIQUE (InstructorID, ActivityID));
INSERT INTO ActivityInstructors VALUES
 (1,31,101),(2,32,102),(3,31,102),(4,33,103),(5,34,103),(6,34,104),
 (7,35,105),(8,36,106),(9,38,106),(10,37,106),(11,39,107),(12,37,109);
`,
    tables: [
      { name:'Centers',             cols:'CenterID, CenterName, Neighborhood' },
      { name:'Divisions',           cols:'DivisionID, DivisionName, CenterID, CoordinatorID' },
      { name:'Participants',        cols:'ParticipantID, FullName, IDNumber, BirthDate, Phone, DivisionID' },
      { name:'Instructors',         cols:'InstructorID, FullName, IDNumber, Salary, Expertise, DivisionID' },
      { name:'Activities',          cols:'ActivityID, ActivityName, MonthlyFee, MeetingDay, Room, DivisionID' },
      { name:'Registrations',       cols:'RegistrationID, ParticipantID, ActivityID, RegistrationDate, AttendancePct' },
      { name:'ActivityInstructors', cols:'ActivityInstructorID, InstructorID, ActivityID' }
    ],

    queries: [
      { n:1, pattern:PAT[1],
        prompt:'הצג את השמות והשכונות של כל המרכזים הקהילתיים. פלט: שם המרכז, השכונה (2 עמודות).',
        solution:`SELECT CenterName, Neighborhood
FROM Centers;`,
        alt:[`SELECT c.CenterName, c.Neighborhood FROM Centers AS c;`],
        explain:`הטלה של 2 עמודות מטבלה אחת. המרכז בנאות אפקה מופיע אף שאין בו אגפים. שאלה 1 במבחן היא "נקודות חינם" — רק לא לשכוח את סדר העמודות ולא לכתוב SELECT *.` },

      { n:2, pattern:PAT[2],
        prompt:'הצג את כל האגפים עם שמותיהם ושם המרכז הקהילתי שבו הם פועלים. פלט: שם האגף, שם המרכז (2 עמודות).',
        solution:`SELECT d.DivisionName, c.CenterName
FROM Divisions d
JOIN Centers c ON d.CenterID = c.CenterID;`,
        alt:[`SELECT d.DivisionName, c.CenterName FROM Centers c JOIN Divisions d ON c.CenterID = d.CenterID;`,
             `SELECT d.DivisionName, c.CenterName FROM Divisions d, Centers c WHERE d.CenterID = c.CenterID;`],
        explain:`Divisions.CenterID (FK) = Centers.CenterID (PK). במרכז הדר שני אגפים — שמו מופיע פעמיים. ב-JOIN רגיל המרכז בנאות אפקה (בלי אגפים) לא מופיע, וזה נכון כי השאלה היא על האגפים.` },

      { n:3, pattern:PAT[3],
        prompt:'שלוף את שמות המשתתפים עם החוגים שלהם, רק אם אחוז הנוכחות שלהם בחוג גבוה מ-75. פלט: שם המשתתף, שם החוג, אחוז הנוכחות (3 עמודות).',
        solution:`SELECT p.FullName, a.ActivityName, r.AttendancePct
FROM Participants p
JOIN Registrations r ON p.ParticipantID = r.ParticipantID
JOIN Activities a ON r.ActivityID = a.ActivityID
WHERE r.AttendancePct > 75;`,
        alt:[`SELECT p.FullName, a.ActivityName, r.AttendancePct FROM Registrations r JOIN Participants p ON p.ParticipantID = r.ParticipantID JOIN Activities a ON a.ActivityID = r.ActivityID WHERE r.AttendancePct > 75;`,
             `SELECT p.FullName, a.ActivityName, r.AttendancePct FROM Participants p, Registrations r, Activities a WHERE p.ParticipantID = r.ParticipantID AND r.ActivityID = a.ActivityID AND r.AttendancePct > 75;`],
        explain:`משתתף ← Registrations (גישור) → חוג, וסינון על AttendancePct שבטבלת הגישור. אלה ברגר הגיעה ל-75 בדיוק ברובוטיקה — השורה הזו לא נכללת (> ולא >=), אבל הבלט שלה (92) כן. בני ממן לא רשום לאף חוג ולכן לא מופיע.` },

      { n:4, pattern:PAT[4],
        prompt:'שלוף את כל המדריכים שמרוויחים מעל 8,000 ש"ח. פלט: שם המדריך, המשכורת (2 עמודות).',
        solution:`SELECT FullName, Salary
FROM Instructors
WHERE Salary > 8000;`,
        alt:[`SELECT i.FullName, i.Salary FROM Instructors i WHERE i.Salary > 8000 ORDER BY i.FullName;`],
        explain:`WHERE עם השוואה מספרית. מור יעקב מרוויחה 8,000 בדיוק — לא נכללת. אין צורך ב-JOIN: כל המידע בטבלת Instructors.` },

      { n:5, pattern:PAT[5],
        prompt:'הצג את מספר המשתתפים בכל אגף. פלט: שם האגף, מספר המשתתפים (2 עמודות). מספיק להציג אגפים שיש בהם משתתפים.',
        solution:`SELECT d.DivisionName, COUNT(p.ParticipantID) AS NumParticipants
FROM Divisions d
JOIN Participants p ON p.DivisionID = d.DivisionID
GROUP BY d.DivisionID, d.DivisionName;`,
        alt:[`SELECT d.DivisionName, COUNT(*) FROM Participants p JOIN Divisions d ON p.DivisionID = d.DivisionID GROUP BY d.DivisionID, d.DivisionName;`],
        accept:[`SELECT d.DivisionName, COUNT(p.ParticipantID) FROM Divisions d LEFT JOIN Participants p ON p.DivisionID = d.DivisionID GROUP BY d.DivisionID, d.DivisionName;`],
        explain:`GROUP BY לפי האגף ו-COUNT. ב-SQL Server חייבים לקבץ גם לפי DivisionName כי הוא מופיע ב-SELECT. אגף הספורט ריק ולכן לא מופיע ב-JOIN רגיל; הצגתו עם 0 (LEFT JOIN) מתקבלת גם היא.` },

      { n:6, pattern:PAT[6],
        prompt:'הצג את כל החוגים עם המדריכים שמדריכים בהם. ודא שגם חוגים שאין להם מדריך יוצגו. פלט: שם החוג, שם המדריך (2 עמודות; לחוג בלי מדריך יופיע NULL).',
        solution:`SELECT a.ActivityName, i.FullName
FROM Activities a
LEFT JOIN ActivityInstructors ai ON a.ActivityID = ai.ActivityID
LEFT JOIN Instructors i ON ai.InstructorID = i.InstructorID;`,
        alt:[`SELECT a.ActivityName, i.FullName FROM Instructors i JOIN ActivityInstructors ai ON i.InstructorID = ai.InstructorID RIGHT JOIN Activities a ON ai.ActivityID = a.ActivityID;`],
        explain:`Activities משמאל + שני LEFT JOIN. "פילאטיס" (בלי מדריך) מופיע עם NULL. אם ה-JOIN השני ל-Instructors הוא רגיל — השורה הזו נעלמת שוב. "התעמלות בונה עצם" מופיע 3 פעמים — שורה לכל מדריך.` },

      { n:7, pattern:PAT[7],
        prompt:'הצג את כל האגפים עם מספר המשתתפים שלהם, כולל אגפים שאין בהם משתתפים. פלט: שם האגף, מספר המשתתפים (2 עמודות; לאגף ריק — 0).',
        solution:`SELECT d.DivisionName, COUNT(p.ParticipantID) AS NumParticipants
FROM Divisions d
LEFT JOIN Participants p ON p.DivisionID = d.DivisionID
GROUP BY d.DivisionID, d.DivisionName;`,
        alt:[`SELECT d.DivisionName, (SELECT COUNT(*) FROM Participants p WHERE p.DivisionID = d.DivisionID) FROM Divisions d;`],
        explain:`LEFT JOIN משאיר את אגף הספורט עם NULL בעמודות המשתתף, ו-COUNT(p.ParticipantID) מחזיר 0. COUNT(*) היה מחזיר 1 כי הוא סופר שורות ולא ערכים.` },

      { n:8, pattern:PAT[8],
        prompt:'מצא את כל החוגים שמודרכים על ידי יותר ממדריך אחד. פלט: שם החוג, מספר המדריכים (2 עמודות).',
        solution:`SELECT a.ActivityName, COUNT(ai.InstructorID) AS NumInstructors
FROM Activities a
JOIN ActivityInstructors ai ON a.ActivityID = ai.ActivityID
GROUP BY a.ActivityID, a.ActivityName
HAVING COUNT(ai.InstructorID) > 1;`,
        alt:[`SELECT a.ActivityName, COUNT(*) FROM ActivityInstructors ai JOIN Activities a ON a.ActivityID = ai.ActivityID GROUP BY a.ActivityID, a.ActivityName HAVING COUNT(*) > 1;`],
        explain:`קיבוץ לפי חוג וסינון הקבוצות ב-HAVING. "בלט קלאסי" (מדריך אחד) ו"פילאטיס" (בלי מדריך) לא עוברים. WHERE לא יכול להכיל COUNT — שגיאה 147 ב-SQL Server.` },

      { n:9, pattern:PAT[9],
        prompt:'הצג את שמות המשתתפים יחד עם שמות האגפים שלהם. פלט: שם המשתתף, שם האגף (2 עמודות).',
        solution:`SELECT p.FullName, d.DivisionName
FROM Participants p
JOIN Divisions d ON p.DivisionID = d.DivisionID;`,
        alt:[`SELECT p.FullName, d.DivisionName FROM Participants p, Divisions d WHERE p.DivisionID = d.DivisionID;`],
        explain:`Participants.DivisionID = Divisions.DivisionID. כל 11 המשתתפים מופיעים פעם אחת — כולל בני ממן שלא רשום לחוגים.` },

      { n:10, pattern:PAT[10],
        prompt:'שלוף את שמות המדריכים עם האגפים שבהם הם עובדים. פלט: שם המדריך, שם האגף (2 עמודות).',
        solution:`SELECT i.FullName, d.DivisionName
FROM Instructors i
JOIN Divisions d ON i.DivisionID = d.DivisionID;`,
        alt:[`SELECT i.FullName, d.DivisionName FROM Divisions d JOIN Instructors i ON d.DivisionID = i.DivisionID;`],
        accept:[`SELECT DISTINCT i.FullName, d.DivisionName FROM Instructors i JOIN ActivityInstructors ai ON i.InstructorID = ai.InstructorID JOIN Activities a ON ai.ActivityID = a.ActivityID JOIN Divisions d ON a.DivisionID = d.DivisionID;`],
        explain:`Instructors.DivisionID = Divisions.DivisionID — לא CoordinatorID (קשר הריכוז מחזיר רק 6 רכזים). פרשנות נוספת שמתקבלת: "האגפים של החוגים שהמדריך מעביר" — דרך ActivityInstructors ו-Activities, עם DISTINCT.` }
    ]
  },

  /* =====================================================================
     מבחן מקביל 4 — רשת הספריות העירונית "דף חדש"
     Libraries → Sections → Readers / Librarians / Books ; Loans + Recommendations
     ===================================================================== */
  {
    id: 'libraries',
    title: 'רשת הספריות העירונית "דף חדש"',
    source: 'מבחן מקביל 4 — מקורי, באותו מבנה ובאותה רמת קושי כמו המבחן לדוגמה (מועד א 14.2.25)',
    story: `רשת הספריות העירונית "דף חדש" מעוניינת לפתח מערכת מידע לניהול פעילות ההשאלה בספריות. המערכת תתמקד בניהול ספריות, אגפים, קוראים, ספרנים, ספרים ויחסי הגומלין ביניהם.
ברשת "דף חדש" פועלות מספר ספריות, כאשר לכל ספרייה יש שם ייחודי ומיקום בעיר. בכל ספרייה פועלים אגפים שונים, כאשר כל אגף אחראי על תחום מוגדר, כגון אגף הילדים המפעיל את שעת הסיפור או אגף השפות הזרות המחזיק ספרים באנגלית ובצרפתית.
לכל אגף יש ראש אגף, שהוא גם אחד הספרנים ולוקח אחריות על תפקוד האגף; ספרן יכול לעמוד בראש אגף אחד לכל היותר. בנוסף, כל אגף אחראי על הקוראים והספרנים הפועלים בתחומו. לדוגמה, אגף המבוגרים בספרייה המרכזית משרת קוראים כמו אביגיל, שמעון ולנה.
כל קורא משויך לאגף אחד, שבו הונפק כרטיס הקורא שלו, ומשאיל ספרים שונים. לכל קורא יש מידע אישי הכולל שם מלא, מספר תעודת זהות ייחודי, טלפון ותאריך הצטרפות לספרייה.
כל ספרן משויך לאגף אחד. הספרנים ממליצים על ספרים שונים מהאוסף (ההמלצות מוצגות לכל קוראי הרשת), וכל ספרן מחזיק בפרטי מידע כמו שם מלא, מספר תעודת זהות ייחודי, משכורת והסמכה מקצועית.
אוסף הספרים מורכב מספרים רבים, כאשר כל ספר משויך לאגף מסוים, ולכל ספר יש שם, שם מחבר ומספר עותקים. על כל ספר יכולים להמליץ כמה ספרנים, וכל קורא יכול להשאיל כמה ספרים, וגם להשאיל שוב ספר שכבר קרא. עבור כל השאלה נשמרים תאריך ההשאלה, תאריך ההחזרה בפועל ודירוג (1–5) שהקורא נותן לספר בעת ההחזרה. תאריך ההחזרה הצפוי הוא תמיד 21 ימים מיום ההשאלה.
בהתאם לתיאור זה, יש לייצר תרשים ERD המתאר את מבנה הנתונים של המערכת, תוך התייחסות לספריות, לאגפים, לקוראים, לספרנים ולספרים, ולתאר את הקשרים ביניהם בהתאם לסיפור המערכת.`,

    candidates: [
      { word:'רשת הספריות "דף חדש"', entity:false, why:'הארגון כולו — מופע יחיד, לא נשמר עליו מידע.' },
      { word:'ספרייה', entity:true,  why:'הרבה ספריות, לכל אחת שם ייחודי ומיקום — ישות (Libraries).' },
      { word:'מיקום', entity:false, why:'תכונה של ספרייה (Location).' },
      { word:'אגף', entity:true,  why:'יחידה ארגונית עם שם, ראש אגף ושיוך לספרייה — ישות (Sections).' },
      { word:'ראש אגף', entity:false, why:'תפקיד של ספרן קיים — קשר 1:1 (HeadLibrarianID ב-Sections).' },
      { word:'קורא', entity:true,  why:'הרבה קוראים עם שם, ת"ז, טלפון ותאריך הצטרפות — ישות (Readers).' },
      { word:'כרטיס קורא', entity:false, why:'הכרטיס רק מזהה את הקורא; "האגף שבו הונפק" הוא ה-FK SectionID של הקורא — אין לכרטיס מידע משלו.' },
      { word:'ספרן', entity:true,  why:'הרבה ספרנים עם שם, ת"ז, משכורת והסמכה — ישות (Librarians).' },
      { word:'הסמכה מקצועית', entity:false, why:'תכונה של ספרן (Qualification).' },
      { word:'ספר', entity:true,  why:'פריט באוסף עם שם, מחבר, עותקים ושיוך לאגף — ישות (Books).' },
      { word:'שם מחבר', entity:false, why:'תכונה של ספר (Author) — הסיפור לא שומר על מחברים מידע משלהם.' },
      { word:'מספר עותקים', entity:false, why:'תכונה רגילה של ספר (Copies) — הסיפור לא מבחין בין עותקים.' },
      { word:'השאלה', entity:true,  why:'הקשר M:N קורא–ספר, עם תאריכים ודירוג — ישות מקשרת (Loans).' },
      { word:'תאריך החזרה צפוי', entity:false, why:'תכונה נגזרת — תמיד 21 ימים אחרי LoanDate, לכן לא נשמרת.' },
      { word:'המלצה', entity:true,  why:'הקשר M:N ספרן–ספר — ישות מקשרת (Recommendations).' }
    ],

    entities: [
      { name:'Libraries', he:'ספריות', attrs:[
        { name:'LibraryID', pk:true },
        { name:'LibraryName', note:'ייחודי — מפתח חלופי' },
        { name:'Location' } ] },
      { name:'Sections', he:'אגפים', attrs:[
        { name:'SectionID', pk:true },
        { name:'SectionName' },
        { name:'LibraryID', fk:'Libraries', note:'קשר 1:N — כל אגף בספרייה אחת' },
        { name:'HeadLibrarianID', fk:'Librarians', note:'קשר 1:1 "ראש אגף" — FK + UNIQUE' } ] },
      { name:'Readers', he:'קוראים', attrs:[
        { name:'ReaderID', pk:true },
        { name:'FullName' },
        { name:'IDNumber', note:'ת"ז ייחודית — מפתח חלופי' },
        { name:'Phone' },
        { name:'JoinDate', note:'ברירת מחדל: תאריך היום' },
        { name:'SectionID', fk:'Sections', note:'האגף שבו הונפק כרטיס הקורא' } ] },
      { name:'Librarians', he:'ספרנים', attrs:[
        { name:'LibrarianID', pk:true },
        { name:'FullName' },
        { name:'IDNumber', note:'מפתח חלופי' },
        { name:'Salary' },
        { name:'Qualification', note:'הסמכה מקצועית' },
        { name:'SectionID', fk:'Sections', note:'האגף שבו הספרן עובד' } ] },
      { name:'Books', he:'ספרים', attrs:[
        { name:'BookID', pk:true },
        { name:'Title' },
        { name:'Author', note:'תכונה, לא ישות' },
        { name:'Copies', note:'מספר עותקים — תכונה רגילה' },
        { name:'SectionID', fk:'Sections' } ] },
      { name:'Loans', he:'השאלות (גישור קורא–ספר)', attrs:[
        { name:'LoanID', pk:true, note:'PK נפרד — כי אותו קורא יכול להשאיל אותו ספר שוב' },
        { name:'ReaderID', fk:'Readers' },
        { name:'BookID', fk:'Books' },
        { name:'LoanDate', note:'תכונת הקשר; תאריך ההחזרה הצפוי נגזר ממנו' },
        { name:'ReturnDate', note:'NULL כל עוד הספר לא הוחזר' },
        { name:'Rating', note:'דירוג 1–5 — תכונת הקשר (כמו FinalGrade)' } ] },
      { name:'Recommendations', he:'המלצות (גישור ספרן–ספר)', attrs:[
        { name:'RecommendationID', pk:true, note:'מפתח מלאכותי; UNIQUE(LibrarianID, BookID) נגד שיוך כפול. חלופה: PK מורכב (LibrarianID, BookID)' },
        { name:'LibrarianID', fk:'Librarians' },
        { name:'BookID', fk:'Books' } ] }
    ],

    relationships: [
      { a:'Libraries', b:'Sections', verb:'מפעילה', card:'1:N', why:'"בכל ספרייה פועלים אגפים שונים" — ואגף שייך לספרייה אחת.' },
      { a:'Librarians', b:'Sections', verb:'עומד בראש', card:'1:1', why:'"לכל אגף יש ראש אגף… ספרן יכול לעמוד בראש אגף אחד לכל היותר". HeadLibrarianID ב-Sections + UNIQUE.' },
      { a:'Sections', b:'Librarians', verb:'מעסיק', card:'1:N', why:'"כל אגף אחראי על… הספרנים הפועלים בתחומו" ו"כל ספרן משויך לאגף אחד". FK SectionID ב-Librarians. קשר נפרד מקשר ראש האגף.' },
      { a:'Sections', b:'Readers', verb:'משרת', card:'1:N', why:'"כל קורא משויך לאגף אחד, שבו הונפק כרטיס הקורא שלו".' },
      { a:'Sections', b:'Books', verb:'מחזיק', card:'1:N', why:'"כל ספר משויך לאגף מסוים", ולאגף ספרים רבים.' },
      { a:'Readers', b:'Books', verb:'משאיל', card:'M:N', bridge:'Loans', why:'"כל קורא יכול להשאיל כמה ספרים", וכל ספר מושאל לקוראים רבים. להשאלה תאריכים ודירוג — בטבלת הגישור.' },
      { a:'Librarians', b:'Books', verb:'ממליץ על', card:'M:N', bridge:'Recommendations', why:'"על כל ספר יכולים להמליץ כמה ספרנים", ו"הספרנים ממליצים על ספרים שונים מהאוסף" (ספרן → ספרים רבים). ההמלצה לא מופנית לקורא מסוים, ולכן זה קשר בינארי ספרן–ספר ולא קשר משולש.' }
    ],

    traps: [
      { q:'"שם מחבר" — ישות או תכונה?',
        options:['תכונה (Author) של Books — לא נשמר שום מידע נוסף על מחברים','ישות Authors — חובה','תכונה של Librarians','טבלת גישור בין ספרים לקוראים'],
        correct:0,
        explain:'לפי הסיפור לספר יש "שם מחבר" — ערך בלבד. אילו נכתב "ספר יכול להיכתב בידי כמה מחברים, ולכל מחבר נשמרים ארץ מוצא ושנת לידה" — היו כאן ישות Authors וקשר M:N.' },
      { q:'"תאריך ההחזרה הצפוי הוא תמיד 21 ימים מיום ההשאלה". מה עושים?',
        options:['עמודה DueDate בטבלת Loans','עמודה DueDate בטבלת Books','ישות DueDates','תכונה נגזרת — מחשבים DATEADD(day, 21, LoanDate) ולא שומרים'],
        correct:3,
        explain:'ערך שתמיד מחושב מערך אחר הוא תכונה נגזרת. שמירתו כפולה ועלולה לסתור את LoanDate. לעומת זאת ReturnDate (ההחזרה בפועל) אינו נגזר — נשמר.' },
      { q:'הדירוג (1–5) שהקורא נותן — איפה הוא נשמר?',
        options:['Books.Rating','Readers.Rating','Loans.Rating — תכונה של ההשאלה (הקשר M:N)','Recommendations.Rating'],
        correct:2,
        explain:'הדירוג ניתן "בעת ההחזרה" — שייך להשאלה מסוימת של קורא מסוים לספר מסוים. Recommendations הוא קשר אחר (ספרן–ספר) ואין לו קשר לדירוג של הקורא.' },
      { q:'קורא יכול להשאיל שוב ספר שכבר קרא. מה המשמעות לגבי מפתח טבלת Loans?',
        options:['(ReaderID, BookID) כמפתח מורכב — מספיק','צריך LoanID נפרד (או מפתח שכולל גם LoanDate) — כי אותו זוג קורא–ספר חוזר','BookID לבד','ReaderID לבד'],
        correct:1,
        explain:'אם המפתח הוא רק (ReaderID, BookID), השאלה חוזרת של אותו ספר תפר את ייחודיות המפתח. לכן PK נפרד (LoanID) — כמו EnrollmentID במבחן לדוגמה — או מפתח מורכב שכולל את התאריך.' },
      { q:'"מספר עותקים" — מה נכון לפי הסיפור?',
        options:['תכונה נגזרת — לא שומרים','ישות חלשה Copies — חובה','תכונה רגילה (Copies) של Books','תכונה של Sections'],
        correct:2,
        explain:'הסיפור מתייחס לעותקים כמספר בלבד. אילו לכל עותק היה ברקוד ומצב פיזי, וההשאלה הייתה של עותק מסוים — היה צורך בישות חלשה Copies (BookID + CopyNo) וההשאלה הייתה מתחברת אליה.' }
    ],

    rubric: [
      '5 ישויות עיקריות: Libraries, Sections, Readers, Librarians, Books — כל אחת עם PK.',
      '2 ישויות מקשרות: Loans (קורא–ספר) ו-Recommendations (ספרן–ספר).',
      'LoanDate, ReturnDate ו-Rating ב-Loans, עם PK נפרד (LoanID) שמאפשר השאלה חוזרת.',
      'קשרי 1:N עם FK בצד ה-N: Libraries–Sections, Sections–Readers, Sections–Librarians, Sections–Books.',
      'קשר 1:1 "ראש אגף" (HeadLibrarianID + UNIQUE), נפרד מקשר "ספרן עובד באגף".',
      'תאריך ההחזרה הצפוי לא נשמר (נגזר); Author ו-Copies תכונות של Books; מפתחות חלופיים: LibraryName ו-IDNumber.'
    ],
    mistakes: [
      'לשים את הדירוג ב-Books ("דירוג הספר") במקום בהשאלה.',
      'עמודת DueDate — תכונה נגזרת.',
      'ישויות Authors או "כרטיס קורא" שהסיפור לא מצדיק.',
      'מפתח (ReaderID, BookID) לטבלת Loans — חוסם השאלה חוזרת.',
      'לבלבל בין שני קשרי ה-M:N: המלצה (ספרן–ספר) מול השאלה (קורא–ספר).',
      'לחבר קורא ישירות לספרייה במקום לאגף.'
    ],

    dictionary: {
      entity: 'Readers',
      rows: [
        { attr:'ReaderID', type:['PK'], desc:'מזהה ייחודי של הקורא (מספר כרטיס קורא)', dataType:['INT'], domain:'מספר שלם חיובי, ייחודי, לא NULL', def:'אין (אפשר IDENTITY(1,1))', model:'INT' },
        { attr:'FullName', type:['רגילה','מורכבת'], desc:'שם מלא של הקורא (פרטי + משפחה)', dataType:['NVARCHAR','VARCHAR'], domain:'טקסט עד 50 תווים, חובה', def:'—', model:'NVARCHAR(50)' },
        { attr:'IDNumber', type:['מפתח חלופי'], desc:'מספר תעודת זהות', dataType:['CHAR','VARCHAR','NVARCHAR'], domain:'בדיוק 9 ספרות (כולל אפסים מובילים — לכן לא INT), ייחודי, חובה', def:'—', model:'CHAR(9)' },
        { attr:'Phone', type:['רגילה'], desc:'טלפון ליצירת קשר (תזכורות החזרה)', dataType:['VARCHAR','CHAR','NVARCHAR'], domain:'פורמט 05X-XXXXXXX', def:'NULL', model:'VARCHAR(15)' },
        { attr:'JoinDate', type:['רגילה'], desc:'תאריך ההצטרפות לספרייה', dataType:['DATE','DATETIME'], domain:'תאריך, לא אחרי היום', def:'GETDATE() — תאריך היום', model:'DATE' },
        { attr:'SectionID', type:['FK'], desc:'האגף שבו הונפק כרטיס הקורא', dataType:['INT'], domain:'SectionID קיים בטבלת Sections', def:'—', model:'INT' }
      ]
    },

    schemaSql: `
CREATE TABLE Libraries (LibraryID INT PRIMARY KEY, LibraryName NVARCHAR(50) NOT NULL UNIQUE, Location NVARCHAR(30) NOT NULL);
INSERT INTO Libraries VALUES
 (1,'הספרייה המרכזית','מרכז העיר'),(2,'ספריית נווה שאנן','נווה שאנן'),(3,'ספריית הכרמל','הכרמל'),
 (4,'ספריית קריית אליעזר','קריית אליעזר'),(5,'ספריית בת גלים','בת גלים'),(6,'ספריית רמת אלון','רמת אלון');

-- HeadLibrarianID = הקשר 1:1 "ראש אגף". ב-SQL Server מוסיפים את ה-FK אחרי יצירת Librarians (הפניה מעגלית):
-- ALTER TABLE Sections ADD CONSTRAINT FK_Sections_Head FOREIGN KEY (HeadLibrarianID) REFERENCES Librarians(LibrarianID);
CREATE TABLE Sections (SectionID INT PRIMARY KEY, SectionName NVARCHAR(50) NOT NULL, LibraryID INT NOT NULL REFERENCES Libraries(LibraryID), HeadLibrarianID INT UNIQUE);
INSERT INTO Sections VALUES
 (11,'אגף מבוגרים',1,21),(12,'אגף ילדים',1,23),(13,'אגף נוער',2,25),
 (14,'אגף שפות זרות',3,26),(15,'אגף מוזיקה',4,28),(16,'אגף קומיקס',5,29);

-- ב-SQL Server: JoinDate DATE DEFAULT GETDATE()
CREATE TABLE Readers (ReaderID INT PRIMARY KEY, FullName NVARCHAR(50) NOT NULL, IDNumber CHAR(9) NOT NULL UNIQUE, Phone VARCHAR(15), JoinDate DATE, SectionID INT REFERENCES Sections(SectionID));
INSERT INTO Readers VALUES
 (1,'אביגיל רון','051234560','050-7654321','2019-03-01',11),
 (2,'שמעון אזולאי','052345671','052-1112223','2015-06-15',11),
 (3,'לנה פישר','053456782','054-3334445','2021-01-10',11),
 (4,'תומר גרין','054567893','053-5556667','2022-09-01',12),
 (5,'מאיה שלו','055678904','050-7778889','2023-02-20',12),
 (6,'סאלח חטיב','056789015','052-9990001','2018-11-11',13),
 (7,'אורית נוימן','057890126','054-2223334','2020-05-05',13),
 (8,'קובי ממן','058901237','058-4445556','2017-07-07',14),
 (9,'אלינה סמירנוב','059012348','050-6667778','2024-01-15',14),
 (10,'יואב אשרוב','060123459','053-8889990','2016-04-04',16),
 (11,'רותם גל','061234560','052-0001112','2024-08-20',16);

CREATE TABLE Librarians (LibrarianID INT PRIMARY KEY, FullName NVARCHAR(50) NOT NULL, IDNumber CHAR(9) NOT NULL UNIQUE, Salary INT, Qualification NVARCHAR(30), SectionID INT REFERENCES Sections(SectionID));
INSERT INTO Librarians VALUES
 (21,'רבקה זילבר','041111111',12400,'ספרנית מוסמכת',11),
 (22,'אליהו נגר','042222222',8900,'עוזר ספרן',11),
 (23,'מיכל טננבאום','043333333',10000,'ספרנית',12),
 (24,'יובל קרמר','044444444',9600,'ספרן',12),
 (25,'נגה בן עמי','045555555',11200,'ספרנית מוסמכת',13),
 (26,'סרגיי ליבוביץ','046666666',10800,'ספרן מוסמך',14),
 (27,'הילה שטרן','047777777',7900,'עוזרת ספרן',14),
 (28,'דורון חביב','048888888',10500,'ספרן',15),
 (29,'טליה אורן','049999999',10200,'ספרנית',16);

CREATE TABLE Books (BookID INT PRIMARY KEY, Title NVARCHAR(100) NOT NULL, Author NVARCHAR(50), Copies INT CHECK (Copies >= 0), SectionID INT REFERENCES Sections(SectionID));
INSERT INTO Books VALUES
 (101,'הבית ברחוב הנביאים','נעמי ברק',3,11),
 (102,'אור אחרון בחיפה','דן אלמוג',2,11),
 (103,'הדובי שלא רצה לישון','רותי שמש',5,12),
 (104,'מסע אל הכוכב הירוק','אלון פז',4,12),
 (105,'קיץ של נערים','שירי וקנין',3,13),
 (106,'Pride and Prejudice','Jane Austen',2,14),
 (107,'Le Petit Prince','Antoine de Saint-Exupery',2,14),
 (108,'מבוא למוזיקה קלאסית','יואל שגיא',1,15),
 (109,'גיבורים בחלל','תום ריבלין',4,16);

CREATE TABLE Loans (LoanID INT PRIMARY KEY, ReaderID INT REFERENCES Readers(ReaderID), BookID INT REFERENCES Books(BookID), LoanDate DATE NOT NULL, ReturnDate DATE, Rating INT CHECK (Rating BETWEEN 1 AND 5));
INSERT INTO Loans VALUES
 (1,1,101,'2025-01-03','2025-01-20',5),(2,1,102,'2025-02-01','2025-02-18',3),
 (3,2,101,'2025-01-15','2025-02-10',4),(4,3,106,'2025-01-20','2025-02-05',2),
 (5,4,103,'2025-02-02','2025-02-12',5),(6,5,104,'2025-02-10',NULL,NULL),
 (7,6,105,'2025-02-14','2025-03-01',4),(8,7,105,'2025-03-01','2025-03-30',1),
 (9,8,107,'2025-03-03','2025-03-20',5),(10,9,106,'2025-03-09','2025-03-25',4),
 (11,10,109,'2025-03-15','2025-04-01',3),(12,3,102,'2025-04-01','2025-04-15',5),
 (13,1,101,'2025-05-10','2025-05-28',4);

CREATE TABLE Recommendations (RecommendationID INT PRIMARY KEY, LibrarianID INT REFERENCES Librarians(LibrarianID), BookID INT REFERENCES Books(BookID), UNIQUE (LibrarianID, BookID));
INSERT INTO Recommendations VALUES
 (1,21,101),(2,22,101),(3,21,102),(4,23,103),(5,24,103),(6,24,104),(7,25,105),
 (8,26,106),(9,27,106),(10,21,106),(11,26,107),(12,29,109),(13,25,109);
`,
    tables: [
      { name:'Libraries',       cols:'LibraryID, LibraryName, Location' },
      { name:'Sections',        cols:'SectionID, SectionName, LibraryID, HeadLibrarianID' },
      { name:'Readers',         cols:'ReaderID, FullName, IDNumber, Phone, JoinDate, SectionID' },
      { name:'Librarians',      cols:'LibrarianID, FullName, IDNumber, Salary, Qualification, SectionID' },
      { name:'Books',           cols:'BookID, Title, Author, Copies, SectionID' },
      { name:'Loans',           cols:'LoanID, ReaderID, BookID, LoanDate, ReturnDate, Rating' },
      { name:'Recommendations', cols:'RecommendationID, LibrarianID, BookID' }
    ],

    queries: [
      { n:1, pattern:PAT[1],
        prompt:'הצג את השמות והמיקומים של כל הספריות ברשת. פלט: שם הספרייה, המיקום (2 עמודות).',
        solution:`SELECT LibraryName, Location
FROM Libraries;`,
        alt:[`SELECT l.LibraryName, l.Location FROM Libraries l;`],
        explain:`העתק כמעט מדויק של שאלה 1 במבחן לדוגמה ("שמות ומיקומים של השלוחות"). ספריית רמת אלון מופיעה אף שאין בה אגפים.` },

      { n:2, pattern:PAT[2],
        prompt:'הצג את כל האגפים עם שמותיהם ושם הספרייה שבה הם נמצאים. פלט: שם האגף, שם הספרייה (2 עמודות).',
        solution:`SELECT s.SectionName, l.LibraryName
FROM Sections s
JOIN Libraries l ON s.LibraryID = l.LibraryID;`,
        alt:[`SELECT s.SectionName, l.LibraryName FROM Libraries l JOIN Sections s ON l.LibraryID = s.LibraryID;`,
             `SELECT s.SectionName, l.LibraryName FROM Sections s, Libraries l WHERE s.LibraryID = l.LibraryID;`],
        explain:`Sections.LibraryID (FK) = Libraries.LibraryID (PK). בספרייה המרכזית שני אגפים, ולכן שמה מופיע פעמיים. ספריית רמת אלון (בלי אגפים) לא מופיעה — השאלה על האגפים.` },

      { n:3, pattern:PAT[3],
        prompt:'שלוף את שמות הקוראים עם הספרים שהשאילו, רק אם הדירוג שנתנו לספר גבוה מ-3. פלט: שם הקורא, שם הספר, הדירוג (3 עמודות).',
        solution:`SELECT r.FullName, b.Title, lo.Rating
FROM Readers r
JOIN Loans lo ON r.ReaderID = lo.ReaderID
JOIN Books b ON lo.BookID = b.BookID
WHERE lo.Rating > 3;`,
        alt:[`SELECT r.FullName, b.Title, lo.Rating FROM Loans lo JOIN Readers r ON r.ReaderID = lo.ReaderID JOIN Books b ON b.BookID = lo.BookID WHERE lo.Rating > 3;`,
             `SELECT r.FullName, b.Title, lo.Rating FROM Readers r, Loans lo, Books b WHERE r.ReaderID = lo.ReaderID AND lo.BookID = b.BookID AND lo.Rating >= 4;`],
        explain:`קורא ← Loans (גישור) → ספר, וסינון על Rating שבטבלת הגישור. אביגיל רון דירגה את "אור אחרון בחיפה" ב-3 בדיוק — לא נכלל. ההשאלה של מאיה שלו טרם הוחזרה (Rating = NULL) ולכן לא מופיעה. אביגיל השאילה את "הבית ברחוב הנביאים" פעמיים (דירוג 5 ואחר כך 4) — שתי שורות נפרדות; זה אפשרי רק כי ל-Loans יש PK נפרד (LoanID) ולא (ReaderID, BookID). (Rating הוא מספר שלם בין 1 ל-5, ולכן גם >= 4 נותן כאן אותה תוצאה.)` },

      { n:4, pattern:PAT[4],
        prompt:'שלוף את כל הספרנים שמרוויחים מעל 10,000 ש"ח. פלט: שם הספרן, המשכורת (2 עמודות).',
        solution:`SELECT FullName, Salary
FROM Librarians
WHERE Salary > 10000;`,
        alt:[`SELECT l.FullName, l.Salary FROM Librarians l WHERE l.Salary > 10000 ORDER BY l.Salary DESC;`],
        explain:`WHERE פשוט. מיכל טננבאום מרוויחה 10,000 בדיוק — לא נכללת ("מעל" = >). המספר נכתב 10000, בלי פסיק ובלי גרשיים.` },

      { n:5, pattern:PAT[5],
        prompt:'הצג את מספר הקוראים בכל אגף. פלט: שם האגף, מספר הקוראים (2 עמודות). מספיק להציג אגפים שיש בהם קוראים.',
        solution:`SELECT s.SectionName, COUNT(r.ReaderID) AS NumReaders
FROM Sections s
JOIN Readers r ON r.SectionID = s.SectionID
GROUP BY s.SectionID, s.SectionName;`,
        alt:[`SELECT s.SectionName, COUNT(*) FROM Readers r JOIN Sections s ON r.SectionID = s.SectionID GROUP BY s.SectionID, s.SectionName;`],
        accept:[`SELECT s.SectionName, COUNT(r.ReaderID) FROM Sections s LEFT JOIN Readers r ON r.SectionID = s.SectionID GROUP BY s.SectionID, s.SectionName;`],
        explain:`GROUP BY לפי אגף + COUNT. SectionName חייב להופיע ב-GROUP BY כי הוא ב-SELECT (SQL Server). אגף המוזיקה ריק — לא מופיע ב-JOIN רגיל; LEFT JOIN עם 0 מתקבל גם הוא (וזו שאלה 7).` },

      { n:6, pattern:PAT[6],
        prompt:'הצג את כל הספרים עם הספרנים שממליצים עליהם. ודא שגם ספרים שאף ספרן לא המליץ עליהם יוצגו. פלט: שם הספר, שם הספרן (2 עמודות; לספר בלי המלצה יופיע NULL).',
        solution:`SELECT b.Title, li.FullName
FROM Books b
LEFT JOIN Recommendations rc ON b.BookID = rc.BookID
LEFT JOIN Librarians li ON rc.LibrarianID = li.LibrarianID;`,
        alt:[`SELECT b.Title, li.FullName FROM Librarians li JOIN Recommendations rc ON li.LibrarianID = rc.LibrarianID RIGHT JOIN Books b ON rc.BookID = b.BookID;`],
        explain:`Books משמאל + שני LEFT JOIN. "מבוא למוזיקה קלאסית" (בלי המלצות) מופיע עם NULL. JOIN רגיל באחד משני השלבים מוחק אותו. שימו לב לא לחבר דרך Loans — הקשר כאן הוא "ספרן ממליץ", לא "קורא משאיל".` },

      { n:7, pattern:PAT[7],
        prompt:'הצג את כל האגפים עם מספר הקוראים שלהם, כולל אגפים שאין בהם קוראים. פלט: שם האגף, מספר הקוראים (2 עמודות; לאגף ריק — 0).',
        solution:`SELECT s.SectionName, COUNT(r.ReaderID) AS NumReaders
FROM Sections s
LEFT JOIN Readers r ON r.SectionID = s.SectionID
GROUP BY s.SectionID, s.SectionName;`,
        alt:[`SELECT s.SectionName, (SELECT COUNT(*) FROM Readers r WHERE r.SectionID = s.SectionID) FROM Sections s;`],
        explain:`LEFT JOIN שומר את אגף המוזיקה, ו-COUNT(r.ReaderID) מחזיר לו 0. COUNT(*) היה מחזיר 1. אם כותבים FROM Readers LEFT JOIN Sections (הפוך) — האגף הריק נעלם.` },

      { n:8, pattern:PAT[8],
        prompt:'מצא את כל הספרים שעליהם ממליץ יותר מספרן אחד. פלט: שם הספר, מספר הספרנים הממליצים (2 עמודות).',
        solution:`SELECT b.Title, COUNT(rc.LibrarianID) AS NumLibrarians
FROM Books b
JOIN Recommendations rc ON b.BookID = rc.BookID
GROUP BY b.BookID, b.Title
HAVING COUNT(rc.LibrarianID) > 1;`,
        alt:[`SELECT b.Title, COUNT(*) FROM Recommendations rc JOIN Books b ON b.BookID = rc.BookID GROUP BY b.BookID, b.Title HAVING COUNT(*) > 1;`],
        explain:`קיבוץ לפי ספר והתנאי על הספירה ב-HAVING. "Pride and Prejudice" עם 3 ממליצים; "אור אחרון בחיפה" עם ממליצה אחת לא עובר.` },

      { n:9, pattern:PAT[9],
        prompt:'הצג את שמות הקוראים יחד עם שמות האגפים שלהם. פלט: שם הקורא, שם האגף (2 עמודות).',
        solution:`SELECT r.FullName, s.SectionName
FROM Readers r
JOIN Sections s ON r.SectionID = s.SectionID;`,
        alt:[`SELECT r.FullName, s.SectionName FROM Readers r, Sections s WHERE r.SectionID = s.SectionID;`],
        explain:`Readers.SectionID = Sections.SectionID. כל 11 הקוראים מופיעים פעם אחת — גם רותם גל, שעוד לא השאילה ספר.` },

      { n:10, pattern:PAT[10],
        prompt:'שלוף את שמות הספרנים עם האגפים שבהם הם עובדים. פלט: שם הספרן, שם האגף (2 עמודות).',
        solution:`SELECT li.FullName, s.SectionName
FROM Librarians li
JOIN Sections s ON li.SectionID = s.SectionID;`,
        alt:[`SELECT li.FullName, s.SectionName FROM Sections s JOIN Librarians li ON s.SectionID = li.SectionID;`,
             `SELECT li.FullName, s.SectionName FROM Librarians li, Sections s WHERE li.SectionID = s.SectionID;`],
        explain:`Librarians.SectionID = Sections.SectionID — לא HeadLibrarianID (שמחזיר רק את 6 ראשי האגפים). וגם לא דרך Recommendations: "ממליץ על ספר של אגף" אינו "עובד באגף". למשל, רבקה זילבר ממליצה על "Pride and Prejudice" של אגף השפות הזרות, אבל היא עובדת באגף המבוגרים, ולכן המסלול הזה מוסיף שורות שגויות.` }
    ]
  }

  ];
})();
