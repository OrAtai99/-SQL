/* ============================================================
   מערכת המכללה — מקור אמת יחיד ל-SQL ול-MongoDB
   לפי "עבודת ישור קו" + "עבודת הגשה MongoDB" של המרצה:
   students · lecturers · courses · enrollments · assignments · submissions
   אותן שורות בדיוק בונות גם טבלאות SQL (college2) וגם Collections במונגו.
   מקרי קצה מכוונים (כמו שהמרצה דרש):
   • סטודנט ב-3 קורסים (David, Itai) · ב-2 (Noa, Maya) · ב-1 (Yossi…) · ב-0 (Lior)
   • Eyal רשום רק בהרשמה לא פעילה (Inactive)
   • קורס MongoDB עם 5 סטודנטים · קורס Cyber Security בלי אף סטודנט
   • מטלה (Stored Procedures) בלי אף הגשה · הגשות עם grade = NULL (טרם נבדקו)
   • מרצה (Dana Klein) שלא מלמדת אף קורס
   ============================================================ */
window.SQLC = window.SQLC || {};

SQLC.college2 = {
  students: {
    cols: ['id','firstName','lastName','email','phone','city','age','registrationYear'],
    types:['INT PRIMARY KEY','VARCHAR(50)','VARCHAR(50)','VARCHAR(100)','VARCHAR(20)','VARCHAR(50)','INT','INT'],
    rows: [
      [1,'David','Levi','david@gmail.com','0501234567','Tel Aviv',23,2024],
      [2,'Noa','Cohen','noa@gmail.com','0521111111','Haifa',21,2025],
      [3,'Yossi','Mizrahi','yossi@gmail.com','0532222222','Jerusalem',25,2023],
      [4,'Maya','Peretz','maya@gmail.com','0543333333','Tel Aviv',22,2025],
      [5,'Omer','Biton','omer@gmail.com','0554444444','Beer Sheva',24,2024],
      [6,'Shira','Avraham','shira@gmail.com','0505555555','Haifa',20,2025],
      [7,'Itai','Friedman','itai@gmail.com','0526666666','Tel Aviv',27,2022],
      [8,'Tamar','Golan','tamar@gmail.com','0537777777','Ramat Gan',23,2024],
      [9,'Eyal','Katz','eyal@gmail.com','0548888888','Jerusalem',26,2023],
      [10,'Lior','Shalom','lior@gmail.com','0559999999','Holon',22,2025],
    ]
  },
  lecturers: {
    cols: ['id','firstName','lastName','department','seniority'],
    types:['INT PRIMARY KEY','VARCHAR(50)','VARCHAR(50)','VARCHAR(100)','INT'],
    rows: [
      [1,'Moshe','Cohen','Information Systems',12],
      [2,'Rina','Levi','Information Systems',7],
      [3,'Avi','Peretz','Business',15],
      [4,'Dana','Klein','Data Science',3],
    ]
  },
  courses: {
    cols: ['id','courseName','credits','department','lecturerId'],
    types:['INT PRIMARY KEY','VARCHAR(100)','INT','VARCHAR(100)','INT REFERENCES lecturers(id)'],
    rows: [
      [1,'MongoDB',4,'Information Systems',1],
      [2,'SQL Server',4,'Information Systems',1],
      [3,'Python',3,'Data Science',2],
      [4,'Marketing',2,'Business',3],
      [5,'Statistics',3,'Business',3],
      [6,'Cyber Security',3,'Information Systems',2],
    ]
  },
  enrollments: {
    cols: ['id','studentId','courseId','enrollmentDate','status'],
    types:['INT PRIMARY KEY','INT REFERENCES students(id)','INT REFERENCES courses(id)','DATE','VARCHAR(20)'],
    dateCols: ['enrollmentDate'],
    rows: [
      [1,1,1,'2025-10-01','Active'],
      [2,1,2,'2025-10-01','Active'],
      [3,1,3,'2025-10-03','Active'],
      [4,2,1,'2025-10-02','Active'],
      [5,2,4,'2025-10-05','Inactive'],
      [6,3,2,'2025-10-04','Active'],
      [7,4,1,'2025-10-06','Active'],
      [8,4,3,'2025-10-06','Active'],
      [9,5,5,'2025-10-07','Active'],
      [10,6,4,'2025-10-08','Active'],
      [11,7,1,'2025-10-08','Active'],
      [12,7,2,'2025-10-09','Active'],
      [13,7,5,'2025-10-09','Active'],
      [14,8,1,'2025-10-10','Active'],
      [15,9,5,'2025-10-11','Inactive'],
    ]
  },
  assignments: {
    cols: ['id','courseId','title','maxGrade','dueDate'],
    types:['INT PRIMARY KEY','INT REFERENCES courses(id)','VARCHAR(100)','INT','DATE'],
    dateCols: ['dueDate'],
    rows: [
      [1,1,'Aggregation Project',100,'2025-12-31'],
      [2,1,'CRUD Exercise',100,'2025-11-15'],
      [3,2,'Joins Homework',100,'2025-11-30'],
      [4,3,'Pandas Lab',100,'2025-12-10'],
      [5,4,'Market Research',80,'2025-12-20'],
      [6,5,'Regression Task',100,'2025-12-15'],
      [7,2,'Stored Procedures',100,'2026-01-10'],
    ]
  },
  submissions: {
    cols: ['id','studentId','assignmentId','courseId','grade','submissionDate','status'],
    types:['INT PRIMARY KEY','INT REFERENCES students(id)','INT REFERENCES assignments(id)','INT REFERENCES courses(id)','DECIMAL(5,2)','DATE','VARCHAR(20)'],
    dateCols: ['submissionDate'],
    rows: [
      [1,1,1,1,95,'2025-12-20','Graded'],
      [2,1,2,1,80,'2025-11-14','Graded'],
      [3,1,3,2,88,'2025-11-28','Graded'],
      [4,1,4,3,92,'2025-12-08','Graded'],
      [5,2,1,1,78,'2025-12-21','Graded'],
      [6,2,5,4,70,'2025-12-18','Graded'],
      [7,3,3,2,65,'2025-11-29','Graded'],
      [8,4,1,1,null,'2025-12-30','Submitted'],
      [9,4,2,1,85,'2025-11-13','Graded'],
      [10,4,4,3,90,'2025-12-09','Graded'],
      [11,5,6,5,90,'2025-12-14','Graded'],
      [12,6,5,4,null,'2025-12-19','Submitted'],
      [13,7,1,1,100,'2025-12-25','Graded'],
      [14,7,3,2,72,'2025-11-30','Graded'],
      [15,7,6,5,81,'2025-12-15','Graded'],
      [16,8,2,1,60,'2025-11-10','Graded'],
    ]
  },
};

/* שיעורים — רק במונגו, כמערך מוטמע (Embedded) בתוך כל קורס, כמו בשיעור ה-NoSQL */
SQLC.college2Lessons = {
  1: [ {title:'Intro to NoSQL',duration:90}, {title:'CRUD',duration:90}, {title:'Aggregation',duration:120}, {title:'Indexes',duration:60} ],
  2: [ {title:'SELECT Basics',duration:90}, {title:'JOINs',duration:120}, {title:'GROUP BY',duration:90} ],
  3: [ {title:'Python Basics',duration:90}, {title:'Pandas',duration:120} ],
  4: [ {title:'Market Analysis',duration:90} ],
  5: [ {title:'Descriptive Stats',duration:90}, {title:'Regression',duration:120}, {title:'Probability',duration:90} ],
  6: [],
};

/* ---------- בונים: SQL ---------- */
SQLC.buildCollege2Sql = function(){
  const D = SQLC.college2, order = ['students','lecturers','courses','enrollments','assignments','submissions'];
  const lit = v => v === null ? 'NULL' : (typeof v === 'number' ? String(v) : "'" + String(v).replace(/'/g,"''") + "'");
  return order.map(t => {
    const T = D[t];
    const ddl = `CREATE TABLE ${t} (\n  ` + T.cols.map((c,i) => `${c} ${T.types[i]}`).join(',\n  ') + `\n);`;
    const ins = `INSERT INTO ${t} VALUES\n ` + T.rows.map(r => '(' + r.map(lit).join(',') + ')').join(',\n ') + ';';
    return ddl + '\n' + ins;
  }).join('\n\n');
};

/* ---------- בונים: MongoDB ---------- */
SQLC.buildCollege2Mongo = function(){
  const D = SQLC.college2, out = {};
  Object.keys(D).forEach(t => {
    const T = D[t], dates = T.dateCols || [];
    out[t] = T.rows.map(r => {
      const doc = {};
      T.cols.forEach((c,i) => {
        const key = c === 'id' ? '_id' : c;
        doc[key] = dates.includes(c) && r[i] !== null ? new Date(r[i] + 'T00:00:00Z') : r[i];
      });
      if(t === 'courses') doc.lessons = (SQLC.college2Lessons[doc._id] || []).map(x => ({ ...x }));
      return doc;
    });
  });
  return out;
};

/* מטא-נתונים לתצוגה (SQL) */
SQLC.college2Tables = Object.keys(SQLC.college2).map(t => ({ name:t, cols: SQLC.college2[t].cols.join(', ') }));
