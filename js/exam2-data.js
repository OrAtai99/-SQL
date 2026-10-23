/* ============================================================
   EXAM2 — נתוני הדמה לסכמת המבחן של 3964 (חלק ב׳, שאלות 11–20)
   מקור אמת יחיד: אותן שורות בונות גם טבלאות SQL (CREATE TABLE + INSERT)
   וגם אובייקט Collections ל-MongoDB.
   הסכמה לפי המבחן לדוגמה 21/10/2026:
   Students · Departments · Lecturers · Courses ·
   CourseOfferings · Enrollments · Exams · ExamResults
   במונגו: אותם שמות ב-camelCase, אותם שמות שדות,
   המזהים נשארים בשדות (studentId, courseId…) ולא ב-_id,
   וההרשמות הן Collection נפרד (לא מערך מוטמע במסמך הסטודנט).

   מקרי קצה מכוונים (כל אחד מפעיל שאלה אחרת):
   • S109 ו-S112 — סטודנטים בלי אף הרשמה                      → ש' 15
   • C80 (ONO) — מוצע רק ב-2025B, ולכן 0 נרשמים ב-2026A        → ש' 14 (מלכודת: סינון הסמסטר ב-ON ולא ב-WHERE)
   • הרשמות עם grade = NULL (E1006, E1019, E1028, E1029, E1035) → ש' 13, 19, 20
   • E1018 — הרשמה כפולה של S106 לאותו מחזור O501              → ש' 12 (DISTINCT)
   • S101 — רשום גם ל-O501 וגם ל-O502, שניהם C20               → ש' 12 מאחד, ש' 16 מפריד
   • ציונים מעל 90 ב-C20/2026A, כולל S101 משני מחזורים         → ש' 16
   • E1031 — ציון 95 ב-C20 אבל בסמסטר 2025B                    → ש' 16 (מלכודת סמסטר)
   • X903 בדיוק 10 תוצאות · X901 11 תוצאות · X904 רק 3          → ש' 17 (גבול "לפחות 10")
   • X902 — 10 תוצאות אבל ממוצע 68                             → ש' 17 (נופל על הממוצע, לא על המספר)
   • E1022 — ציון 25 אבל בסמסטר 2025B                          → ש' 20 (אסור למחוק)
   • S100 ו-O501 קיימים · E9001 לא קיים מראש                   → ש' 18, 19
   ============================================================ */
window.EXAM2 = window.EXAM2 || {};

EXAM2.data = {

  /* ---------- Departments ---------- */
  departments: {
    cols: ['departmentId','departmentName'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(100)'],
    rows: [
      ['D10','Information Systems'],
      ['D20','Business Administration'],
      ['D30','Data Science'],
      ['ONO','Ono General Studies'],
    ]
  },

  /* ---------- Students ---------- */
  students: {
    cols: ['studentId','name','email','departmentId'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(100)','VARCHAR(100)','VARCHAR(10) REFERENCES departments(departmentId)'],
    rows: [
      ['S100','Or Atai','or.atai@ono.ac.il','D10'],
      ['S101','Noa Cohen','noa.cohen@ono.ac.il','D10'],
      ['S102','Yossi Mizrahi','yossi.m@ono.ac.il','D10'],
      ['S103','Maya Peretz','maya.p@ono.ac.il','D20'],
      ['S104','Omer Biton','omer.b@ono.ac.il','D20'],
      ['S105','Shira Avraham','shira.a@ono.ac.il','D30'],
      ['S106','Itai Friedman','itai.f@ono.ac.il','D10'],
      ['S107','Tamar Golan','tamar.g@ono.ac.il','D10'],
      ['S108','Eyal Katz','eyal.k@ono.ac.il','D30'],
      ['S109','Lior Shalom','lior.s@ono.ac.il','D20'],   /* בלי אף הרשמה */
      ['S110','Dana Barak','dana.b@ono.ac.il','D10'],
      ['S111','Gal Mor','gal.m@ono.ac.il','ONO'],
      ['S112','Rotem Levi','rotem.l@ono.ac.il','ONO'],   /* בלי אף הרשמה */
      ['S113','Adi Shani','adi.s@ono.ac.il','D30'],
    ]
  },

  /* ---------- Lecturers ---------- */
  lecturers: {
    cols: ['lecturerId','name','departmentId'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(100)','VARCHAR(10) REFERENCES departments(departmentId)'],
    rows: [
      ['L1','Efi Propos','D10'],
      ['L2','Rina Levi','D10'],
      ['L3','Avi Peretz','D20'],
      ['L4','Dana Klein','D30'],
      ['L5','Yael Ben-Ami','ONO'],
    ]
  },

  /* ---------- Courses ---------- */
  courses: {
    cols: ['courseId','courseName','credits','departmentId'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(100)','INT','VARCHAR(10) REFERENCES departments(departmentId)'],
    rows: [
      ['C10','Web Programming',4,'D10'],        /* credits > 3 */
      ['C20','SQL and NoSQL',4,'D10'],          /* credits > 3 · הקורס של שאלה 16 */
      ['C30','Advanced Databases',5,'D10'],     /* credits > 3 */
      ['C40','Operating Systems',3,'D10'],      /* credits = 3 → לא נכנס לשאלה 11 */
      ['C50','Intro to Statistics',2,'D30'],
      ['C60','Marketing Management',4,'D20'],
      ['C70','Academic Writing',2,'ONO'],
      ['C80','Ethics in Technology',3,'ONO'],   /* מוצע רק ב-2025B → 0 ב-2026A */
    ]
  },

  /* ---------- CourseOfferings ---------- */
  courseOfferings: {
    cols: ['offeringId','courseId','lecturerId','semester','capacity'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(10) REFERENCES courses(courseId)','VARCHAR(10) REFERENCES lecturers(lecturerId)','VARCHAR(10)','INT'],
    rows: [
      ['O501','C20','L1','2026A',30],
      ['O502','C20','L2','2026A',25],
      ['O503','C10','L1','2026A',40],
      ['O504','C30','L2','2026A',20],
      ['O505','C40','L1','2026A',35],
      ['O506','C70','L5','2026A',50],
      ['O507','C50','L4','2026A',30],
      ['O508','C60','L3','2026A',30],
      ['O509','C20','L1','2025B',30],
      ['O510','C80','L5','2025B',40],
    ]
  },

  /* ---------- Enrollments ---------- */
  enrollments: {
    cols: ['enrollmentId','studentId','offeringId','grade','enrolledAt'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(10) REFERENCES students(studentId)','VARCHAR(10) REFERENCES courseOfferings(offeringId)','DECIMAL(5,2)','DATE'],
    dateCols: ['enrolledAt'],
    rows: [
      /* S100 — ממוצע 2026A = 91.67 · לא רשום ל-O501 (כדי ששאלה 18 תוסיף אותו) */
      ['E1001','S100','O503',92,'2026-02-01'],
      ['E1002','S100','O504',88,'2026-02-01'],
      ['E1003','S100','O502',95,'2026-02-02'],
      ['E1035','S100','O505',null,'2026-02-07'],
      /* S101 — שני מחזורים של C20, שניהם מעל 90 */
      ['E1004','S101','O501',91,'2026-02-01'],
      ['E1005','S101','O502',97,'2026-02-01'],
      ['E1006','S101','O503',null,'2026-02-03'],
      /* S102 — ממוצע מתחת ל-85, וציון 45 ב-2026A */
      ['E1007','S102','O501',78,'2026-02-01'],
      ['E1008','S102','O505',65,'2026-02-02'],
      ['E1009','S102','O503',45,'2026-02-04'],
      /* S103 */
      ['E1010','S103','O508',90,'2026-02-01'],
      ['E1011','S103','O507',84,'2026-02-02'],
      /* S104 — ציון 40 ב-2026A */
      ['E1012','S104','O508',72,'2026-02-01'],
      ['E1013','S104','O506',40,'2026-02-03'],
      ['E1033','S104','O503',55,'2026-02-05'],
      /* S105 — הממוצע הגבוה */
      ['E1014','S105','O507',100,'2026-02-01'],
      ['E1015','S105','O504',93,'2026-02-02'],
      /* S106 — E1018 היא הרשמה כפולה לאותו מחזור O501 */
      ['E1016','S106','O501',86,'2026-02-01'],
      ['E1017','S106','O503',86,'2026-02-02'],
      ['E1018','S106','O501',86,'2026-02-05'],
      /* S107 — NULL אחד ושני ציונים גבוהים */
      ['E1019','S107','O505',null,'2026-02-01'],
      ['E1020','S107','O504',91,'2026-02-02'],
      ['E1034','S107','O506',94,'2026-02-06'],
      /* S108 — ציון 30 ב-2026A וציון 25 ב-2025B (האחרון אסור למחיקה) */
      ['E1021','S108','O507',30,'2026-02-01'],
      ['E1022','S108','O509',25,'2026-01-05'],
      /* S110 */
      ['E1023','S110','O503',89,'2026-02-01'],
      ['E1024','S110','O505',82,'2026-02-02'],
      ['E1025','S110','O502',93,'2026-02-03'],
      /* S111 — גם 2026A וגם 2025B בקורס ONO */
      ['E1026','S111','O506',76,'2026-02-01'],
      ['E1027','S111','O510',88,'2026-01-10'],
      /* S113 — נרשם ב-2026A אבל כל הציונים שלו NULL */
      ['E1028','S113','O506',null,'2026-02-01'],
      ['E1029','S113','O507',null,'2026-02-02'],
      /* 2025B נוספות */
      ['E1030','S102','O509',80,'2026-01-05'],
      ['E1031','S103','O509',95,'2026-01-05'],   /* 95 ב-C20 אבל 2025B */
      ['E1032','S106','O510',70,'2026-01-08'],
    ]
  },

  /* ---------- Exams ---------- */
  exams: {
    cols: ['examId','offeringId','examDate','examType'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(10) REFERENCES courseOfferings(offeringId)','DATE','VARCHAR(20)'],
    dateCols: ['examDate'],
    rows: [
      ['X901','O501','2026-06-10','Final'],     /* 11 תוצאות · ממוצע 80.91 → נכנס */
      ['X902','O502','2026-06-12','Final'],     /* 10 תוצאות · ממוצע 68    → נופל על הממוצע */
      ['X903','O503','2026-06-15','Midterm'],   /* בדיוק 10 תוצאות · ממוצע 88 → נכנס */
      ['X904','O504','2026-06-18','Final'],     /* 3 תוצאות · ממוצע 97     → נופל על המספר */
    ]
  },

  /* ---------- ExamResults ---------- */
  examResults: {
    cols: ['resultId','examId','studentId','score'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(10) REFERENCES exams(examId)','VARCHAR(10) REFERENCES students(studentId)','DECIMAL(5,2)'],
    rows: [
      /* X901 — 11 תוצאות, סכום 890, ממוצע 80.9091 */
      ['R001','X901','S100',90],
      ['R002','X901','S101',88],
      ['R003','X901','S102',75],
      ['R004','X901','S103',80],
      ['R005','X901','S104',70],
      ['R006','X901','S105',95],
      ['R007','X901','S106',85],
      ['R008','X901','S107',78],
      ['R009','X901','S108',72],
      ['R010','X901','S109',68],
      ['R011','X901','S110',89],
      /* X902 — 10 תוצאות, סכום 680, ממוצע 68 */
      ['R012','X902','S100',60],
      ['R013','X902','S101',75],
      ['R014','X902','S102',55],
      ['R015','X902','S103',70],
      ['R016','X902','S104',65],
      ['R017','X902','S105',80],
      ['R018','X902','S106',72],
      ['R019','X902','S107',68],
      ['R020','X902','S108',50],
      ['R021','X902','S110',85],
      /* X903 — בדיוק 10 תוצאות, סכום 880, ממוצע 88 */
      ['R022','X903','S100',95],
      ['R023','X903','S101',92],
      ['R024','X903','S102',85],
      ['R025','X903','S103',88],
      ['R026','X903','S104',80],
      ['R027','X903','S105',98],
      ['R028','X903','S106',90],
      ['R029','X903','S107',86],
      ['R030','X903','S110',84],
      ['R031','X903','S113',82],
      /* X904 — רק 3 תוצאות, ממוצע 97 */
      ['R032','X904','S100',98],
      ['R033','X904','S101',96],
      ['R034','X904','S105',97],
    ]
  },
};

/* סדר הטבלאות — חשוב ל-INSERT (אב לפני בן) */
EXAM2.order = ['departments','students','lecturers','courses','courseOfferings','enrollments','exams','examResults'];

/* שמות הטבלאות ב-SQL (PascalCase) מול שמות ה-Collections במונגו (camelCase) */
EXAM2.sqlNames = {
  departments:'Departments', students:'Students', lecturers:'Lecturers', courses:'Courses',
  courseOfferings:'CourseOfferings', enrollments:'Enrollments', exams:'Exams', examResults:'ExamResults'
};

/* ---------- בונה: SQL (CREATE TABLE + INSERT) ---------- */
EXAM2.buildSql = function(){
  const lit = v => v === null ? 'NULL'
    : (typeof v === 'number' ? String(v) : "'" + String(v).replace(/'/g,"''") + "'");
  return EXAM2.order.map(key => {
    const T = EXAM2.data[key], name = EXAM2.sqlNames[key];
    const ddl = `CREATE TABLE ${name} (\n  ` + T.cols.map((c,i) => `${c} ${T.types[i]}`).join(',\n  ') + `\n);`;
    const ins = `INSERT INTO ${name} (${T.cols.join(', ')}) VALUES\n ` +
      T.rows.map(r => '(' + r.map(lit).join(',') + ')').join(',\n ') + ';';
    return ddl + '\n' + ins;
  }).join('\n\n');
};

/* ---------- בונה: MongoDB (אובייקט Collections) ---------- */
/* כל קריאה מחזירה עותק טרי — אין _id, המזהים נשארים בשדות עצמם */
EXAM2.buildMongo = function(){
  const out = {};
  EXAM2.order.forEach(key => {
    const T = EXAM2.data[key], dates = T.dateCols || [];
    out[key] = T.rows.map(r => {
      const doc = {};
      T.cols.forEach((c,i) => {
        doc[c] = (dates.includes(c) && r[i] !== null) ? new Date(r[i] + 'T00:00:00Z') : r[i];
      });
      return doc;
    });
  });
  return out;
};

/* מטא-נתונים לתצוגה */
EXAM2.tables = EXAM2.order.map(key => ({
  key,
  sql: EXAM2.sqlNames[key],
  mongo: key,
  cols: EXAM2.data[key].cols.join(', '),
  rows: EXAM2.data[key].rows.length
}));

/* נוחות: תצלום אחד של ה-Collections (לשימוש קריאה בלבד) */
EXAM2.collections = EXAM2.buildMongo();

if(typeof module !== 'undefined' && module.exports) module.exports = EXAM2;
