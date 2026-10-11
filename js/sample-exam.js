/* ============================================================
   קורס 3964 — שפת SQL (מר אפי פרופוס) — המבחן לדוגמה (מועד א, 14.2.25)
   ------------------------------------------------------------
   SQLC.sample = {
     meta     — פרטי דף הבחינה
     original — תקציר השאלות (q1 הסיפור בניסוח שלנו, q2 טבלת המילון, q3 הטבלאות + 10 הבקשות)
     story    — פתרון מלא לשאלות 1–2: ישויות, קשרים, מלכודות, מחוון, מילון נתונים לישות Student
     q3       — לכל אחת מ-10 השאילתות: דפוס, עמודות הפלט, הסבר שלב-אחר-שלב, טעויות,
                דוגמאות שגויות (wrong — נכשלות בבודק), פתרונות חלופיים (alt — עוברים),
                פרשנויות לגיטימיות אחרות לניסוח (accept — תוצאה שונה מהפתרון הרשמי),
                tsql — הפתרון המומלץ לכתיבה על נייר (תקין ב-SQL Server)
     tips     — אסטרטגיה למבחן
   }
   הפתרונות הרשמיים עצמם: SQLC.examQueries (js/sql-data.js), סכימה: SQLC.schemas.college.
   כל הטקסטים הם טקסט רגיל (מוצגים escaped). סדר טעינה: אחרי sql-data.js.
   ============================================================ */
window.SQLC = window.SQLC || {};

SQLC.sample = {

  /* ---------------- פרטי הבחינה ---------------- */
  meta: {
    course: 'בסיסי נתונים ו SQL',
    courseCode: '3964',
    lecturer: 'מר פרופוס אפי',
    faculty: 'מנהל עסקים בהתמחות מערכות מידע',
    year: 'תשפ"ה',
    date: '14.2.25',
    semester: 'א',
    moed: 'א',
    kind: 'מבחן עם שאלות פתוחות',
    material: 'חומר פתוח – מותר הכל',
    structure: '3 שאלות, 4 עמודים',
    notebook: 'משבצות',
    duration: 'לא צוין בדף הבחינה',
    weights: [45, 10, 45],
    rules: [
      'מחברות: כן (סוג המחברת: משבצות)',
      'בסוף הבחינה יש להגיש את כל דפי הבחינה, ביחד עם המחברת',
      'במידה וניתן אישור למחברת טיוטה – גם אותה יש להגיש',
      'חל איסור על כניסה למבחן עם טלפונים ניידים ושעונים חכמים'
    ]
  },

  /* ---------------- תקציר הבחינה ----------------
     שאלה 1 — העובדות שבסיפור בניסוח שלנו (לא הנוסח המקורי, שלא מפורסם באתר ציבורי).
     שאלות 2–3 — מבנה הטבלה, רשימת הטבלאות ו-10 הבקשות (מידע עובדתי). */
  original: {
    q1: [
      'שאלה 1 (45 נקודות) — הסיפור בתמצית (ניסוח שלנו):',
      'מכללה אקדמית רוצה מערכת מידע לניהול הפעילות המנהלית שלה: שלוחות, מחלקות ניהול, סטודנטים, מרצים וקורסים.',
      '• למכללה כמה שלוחות. לכל שלוחה שם ייחודי ומיקום.',
      '• בכל שלוחה פועלות כמה מחלקות ניהול, וכל מחלקה אחראית על תחום מסוים (למשל מחלקת בחינות או דיקאנט).',
      '• בראש כל מחלקה עומד ראש מחלקה — והוא גם אחד המרצים.',
      '• כל מחלקה מנהלת את הסטודנטים ואת המרצים שבתחומה (בסיפור מופיעה גם רשימת שמות לדוגמה של סטודנטים במחלקה למערכות מידע — דקל, אושרי, עמית ועוד).',
      '• כל סטודנט משויך למחלקה ולומד קורסים. לסטודנט נשמרים שם מלא, מספר מזהה ייחודי, כתובת, וגיליון ציונים בקורסים שלמד.',
      '• מרצים מלמדים קורסים. למרצה נשמרים שם מלא, מספר מזהה ייחודי, משכורת ודרגת הוראה.',
      '• כל קורס שייך למחלקה. קורס יכול להיות מועבר על ידי כמה מרצים, וסטודנט יכול להירשם לכמה קורסים — הרישום וההוראה הם שיוכים בין סטודנטים, מרצים וקורסים.',
      'המשימה: לשרטט ERD שמתאר את השלוחות, המחלקות, הסטודנטים, המרצים והקורסים ואת הקשרים ביניהם.'
    ].join('\n'),
    q2: [
      'שאלה 2 (10 נקודות):',
      'כתובו את הטבלה הבאה עבר מחלקת סטודנט',
      '',
      'Entity | Attribute | Type | Description | Data Type | Value Domain | Default Value',
      'ישות | תכונה | סוג/טיפוס | תיאור | סוג מידע | טווח הערכים | ערך ברירת מחדל'
    ].join('\n'),
    q3: [
      'שאלה 3 (45 נקודות):',
      'להלן המערכת המתוארת לצורך ביצוע שאילתות SQL',
      'המערכת מכילה את הטבלאות הבאות:',
      '1. Branches (שלוחות) מידע על שלוחות המכללה.',
      '   ◦ BranchID (PK)',
      '   ◦ BranchName',
      '   ◦ Location',
      '2. Departments (מחלקות ניהול) מחלקות ניהול שונות הפועלות במכללה.',
      '   ◦ DepartmentID (PK)',
      '   ◦ DepartmentName',
      '   ◦ BranchID (FK → Branches)',
      '3. Students (סטודנטים) מידע על הסטודנטים.',
      '   ◦ StudentID (PK)',
      '   ◦ FullName',
      '   ◦ IDNumber',
      '   ◦ Address',
      '   ◦ DepartmentID (FK → Departments)',
      '4. Lecturers (מרצים) מידע על המרצים.',
      '   ◦ LecturerID (PK)',
      '   ◦ FullName',
      '   ◦ IDNumber',
      '   ◦ Salary',
      '   ◦ AcademicRank',
      '   ◦ DepartmentID (FK → Departments)',
      '5. Courses (קורסים) מידע על קורסים הנלמדים במערכת.',
      '   ◦ CourseID (PK)',
      '   ◦ CourseName',
      '   ◦ Credits',
      '   ◦ DepartmentID (FK → Departments)',
      '6. Enrollments (רישום לקורסים) טבלת גישור בין סטודנטים לקורסים.',
      '   ◦ EnrollmentID (PK)',
      '   ◦ StudentID (FK → Students)',
      '   ◦ CourseID (FK → Courses)',
      '   ◦ FinalGrade',
      '7. Teaching (הוראת קורסים) טבלת גישור בין מרצים לקורסים.',
      '   ◦ TeachingID (PK)',
      '   ◦ LecturerID (FK → Lecturers)',
      '   ◦ CourseID (FK → Courses)',
      '',
      'להלן השאלות ב SQL :',
      '1. הצגת כל השמות והמיקומים של השלוחות במערכת.',
      '2. הצגת כל המחלקות עם שמותיהן והשלוחה שבה הן נמצאות.',
      '3. שליפת שמות הסטודנטים עם הקורסים שלהם, רק אם הציון שלהם גבוה מ-80.',
      '4. שליפת כל המרצים שמרוויחים מעל 15,000 ש"ח.',
      '5. הצגת מספר הסטודנטים בכל מחלקה.',
      '6. הצג את כל הקורסים עם המרצים שמלמדים אותם. ודא כי גם קורסים ללא מרצים יוצגו.',
      '7. הצג את כל המחלקות עם מספר הסטודנטים שלהן, כולל מחלקות שאין בהן סטודנטים.',
      '8. מצא את כל הקורסים שמועברים על ידי יותר ממרצה אחד.',
      '9. הצג את שמות הסטודנטים יחד עם שמות המחלקות שלהם.',
      '10. שליפת שמות המרצים עם המחלקות שבהן הם מלמדים.',
      '',
      'בהצלחה !'
    ].join('\n')
  },

  /* ---------------- שאלות 1–2: הסיפור (בתמצית), פתור ---------------- */
  story: {
    id: 'ono-2025a',
    title: 'מערכת ניהול המכללה — המבחן לדוגמה',
    source: 'המבחן לדוגמה — מועד א 14.2.25, שאלות 1 ו-2 (הסיפור בניסוח שלנו)',
    story: [
      'מכללה אקדמית רוצה מערכת מידע לניהול הפעילות המנהלית שלה: שלוחות, מחלקות ניהול, סטודנטים, מרצים וקורסים.',
      '• למכללה כמה שלוחות. לכל שלוחה שם ייחודי ומיקום.',
      '• בכל שלוחה פועלות כמה מחלקות ניהול, וכל מחלקה אחראית על תחום מסוים (למשל מחלקת בחינות או דיקאנט).',
      '• בראש כל מחלקה עומד ראש מחלקה — והוא גם אחד המרצים.',
      '• כל מחלקה מנהלת את הסטודנטים ואת המרצים שבתחומה (בסיפור מופיעה גם רשימת שמות לדוגמה של סטודנטים במחלקה למערכות מידע — דקל, אושרי, עמית ועוד).',
      '• כל סטודנט משויך למחלקה ולומד קורסים. לסטודנט נשמרים שם מלא, מספר מזהה ייחודי, כתובת, וגיליון ציונים בקורסים שלמד.',
      '• מרצים מלמדים קורסים. למרצה נשמרים שם מלא, מספר מזהה ייחודי, משכורת ודרגת הוראה.',
      '• כל קורס שייך למחלקה. קורס יכול להיות מועבר על ידי כמה מרצים, וסטודנט יכול להירשם לכמה קורסים — הרישום וההוראה הם שיוכים בין סטודנטים, מרצים וקורסים.',
      'המשימה: לשרטט ERD שמתאר את השלוחות, המחלקות, הסטודנטים, המרצים והקורסים ואת הקשרים ביניהם.'
    ].join('\n'),

    candidates: [
      { word:'שלוחה', entity:true, why:'יש כמה שלוחות, ולכל אחת נשמר מידע (שם ייחודי, מיקום) — ישות Branches.' },
      { word:'מחלקת ניהול', entity:true, why:'יש מחלקות רבות, לכל אחת שם, שלוחה וראש מחלקה, והיא קשורה לסטודנטים, מרצים וקורסים — ישות Departments.' },
      { word:'סטודנט', entity:true, why:'נשמר עליו מידע אישי (שם מלא, מזהה, כתובת) — ישות Students.' },
      { word:'מרצה', entity:true, why:'נשמרים עליו שם, מזהה, משכורת ודרגת הוראה — ישות Lecturers.' },
      { word:'קורס', entity:true, why:'"מערכת הקורסים מורכבת מקורסים רבים", כל קורס משויך למחלקה — ישות Courses.' },
      { word:'רישום לקורס (מנגנון השיוך סטודנט–קורס)', entity:true, why:'ישות מקשרת (טבלת גישור) שמפרקת את הקשר M:N סטודנט–קורס, ומחזיקה את הציון — Enrollments.' },
      { word:'הוראת קורס (מנגנון השיוך מרצה–קורס)', entity:true, why:'ישות מקשרת (טבלת גישור) שמפרקת את הקשר M:N מרצה–קורס — Teaching.' },
      { word:'ראש מחלקה', entity:false, why:'לא ישות נפרדת: ראש המחלקה "משמש גם כמרצה" — זה תפקיד של מרצה, כלומר קשר 1:1 בין מחלקה למרצה (FK במחלקות), בלי לשכפל את פרטי המרצה.' },
      { word:'מיקום גאוגרפי', entity:false, why:'תכונה של שלוחה (Location).' },
      { word:'גיליון ציונים', entity:false, why:'אוסף הציונים של הסטודנט = שורות הרישום שלו. הציון הוא תכונה של הקשר סטודנט–קורס (FinalGrade ב-Enrollments), לא ישות ולא עמודה בסטודנט.' },
      { word:'מחלקת בחינות / מחלקת הדיקאנט', entity:false, why:'מופעים (שורות) של הישות מחלקה — ערכים של DepartmentName, לא טבלאות נפרדות.' },
      { word:'דקל, אושרי, עמית…', entity:false, why:'מופעים (שורות) של הישות סטודנט — דוגמה לנתונים, לא למבנה.' },
      { word:'תגבורים / תהליך הבחינות', entity:false, why:'תיאור של תחום האחריות של מחלקה. הסיפור לא מבקש לשמור עליהם שום מידע — מסיח דעת.' },
      { word:'משכורת / דרגת הוראה', entity:false, why:'תכונות של מרצה (Salary, AcademicRank).' },
      { word:'מספר מזהה ייחודי', entity:false, why:'תכונה — מפתח של סטודנט ושל מרצה. בטבלאות שאלה 3 יש גם מזהה פנימי (StudentID / LecturerID = PK), ולכן ת"ז (IDNumber) היא מפתח חלופי (UNIQUE). מי שבוחר את ת"ז כ-PK — גם לגיטימי, אם כותב זאת.' },
      { word:'הקריה האקדמית אונו', entity:false, why:'הארגון כולו — מופע יחיד שאין צורך לשמור עליו טבלה. המערכת כולה היא "של" אונו.' }
    ],

    entities: [
      { name:'Branches', he:'שלוחות', attrs:[
        { name:'BranchID', pk:true },
        { name:'BranchName', note:'"לכל שלוחה יש שם ייחודי" → מפתח חלופי (UNIQUE)' },
        { name:'Location', note:'מיקום גאוגרפי' }
      ]},
      { name:'Departments', he:'מחלקות ניהול', attrs:[
        { name:'DepartmentID', pk:true },
        { name:'DepartmentName', note:'התחום: בחינות, דיקאנט, מערכות מידע…' },
        { name:'BranchID', fk:'Branches', note:'השלוחה שבה המחלקה פועלת (צד ה-N של שלוחה 1:N מחלקות)' },
        { name:'HeadLecturerID', fk:'Lecturers', note:'ראש המחלקה — מרצה. קשר 1:1, לכן FK + UNIQUE. בטבלאות של שאלה 3 העמודה הזו הושמטה (פישוט לצורך השאילתות), אבל ב-ERD של שאלה 1 חובה לייצג את ראש המחלקה.' }
      ]},
      { name:'Students', he:'סטודנטים', attrs:[
        { name:'StudentID', pk:true },
        { name:'FullName', note:'שם מלא' },
        { name:'IDNumber', note:'"מספר מזהה ייחודי" (ת"ז) → מפתח חלופי (UNIQUE)' },
        { name:'Address', note:'כתובת מגורים' },
        { name:'DepartmentID', fk:'Departments', note:'מחלקת התחום שהסטודנט משויך אליה' }
      ]},
      { name:'Lecturers', he:'מרצים', attrs:[
        { name:'LecturerID', pk:true },
        { name:'FullName', note:'שם מלא' },
        { name:'IDNumber', note:'"מספר מזהה ייחודי" (ת"ז) → מפתח חלופי (UNIQUE)' },
        { name:'Salary', note:'משכורת' },
        { name:'AcademicRank', note:'דרגת הוראה' },
        { name:'DepartmentID', fk:'Departments', note:'המחלקה שהמרצה פועל בתחומה' }
      ]},
      { name:'Courses', he:'קורסים', attrs:[
        { name:'CourseID', pk:true },
        { name:'CourseName' },
        { name:'Credits', note:'נקודות זכות — לא מוזכר בסיפור אבל מופיע בשאלה 3; מותר להוסיף תכונות סבירות' },
        { name:'DepartmentID', fk:'Departments', note:'"כל קורס משויך למחלקת תחום מסוימת"' }
      ]},
      { name:'Enrollments', he:'רישום לקורסים (גישור)', attrs:[
        { name:'EnrollmentID', pk:true, note:'מפתח מלאכותי; כדאי להוסיף UNIQUE(StudentID, CourseID) נגד רישום כפול. חלופה: PK מורכב (StudentID, CourseID).' },
        { name:'StudentID', fk:'Students' },
        { name:'CourseID', fk:'Courses' },
        { name:'FinalGrade', note:'"גיליון ציונים המשויך לקורסים" — תכונה של הקשר, ולכן בטבלת הגישור' }
      ]},
      { name:'Teaching', he:'הוראת קורסים (גישור)', attrs:[
        { name:'TeachingID', pk:true, note:'מפתח מלאכותי; כדאי UNIQUE(LecturerID, CourseID). חלופה: PK מורכב.' },
        { name:'LecturerID', fk:'Lecturers' },
        { name:'CourseID', fk:'Courses' }
      ]}
    ],

    relationships: [
      { a:'Branches', b:'Departments', verb:'פועלות בה', card:'1:N',
        why:'"בכל שלוחה פועלות מחלקות ניהול שונות" — לשלוחה הרבה מחלקות. הצד השני ("כל מחלקה פועלת בשלוחה אחת") הוא הנחה סבירה שהסיפור לא אומר במפורש — כתבו אותה, והיא תואמת את BranchID (FK) ב-Departments בשאלה 3.' },
      { a:'Departments', b:'Students', verb:'מנהלת / משויכים אליה', card:'1:N',
        why:'"כל מחלקה אחראית על ניהול הסטודנטים… המחלקה למערכות מידע מנהלת סטודנטים כמו דקל, אושרי…" — למחלקה הרבה סטודנטים. "סטודנטים במערכת משויכים למחלקות תחום" (רבים לרבים בניסוח) — ההנחה: כל סטודנט משויך למחלקה אחת, כמו DepartmentID ב-Students בשאלה 3.' },
      { a:'Departments', b:'Lecturers', verb:'מנהלת / פועלים בתחומה', card:'1:N',
        why:'"כל מחלקה אחראית על ניהול הסטודנטים והמרצים הפועלים בתחומה" — למחלקה מרצים רבים; ההנחה: כל מרצה פועל במחלקה אחת (DepartmentID ב-Lecturers בשאלה 3).' },
      { a:'Departments', b:'Lecturers', verb:'עומד בראשה (ראש מחלקה)', card:'1:1',
        why:'"לכל מחלקה יש ראש מחלקה, אשר משמש גם כמרצה" — למחלקה ראש אחד, שהוא מרצה; הנחה: מרצה עומד בראש מחלקה אחת לכל היותר. השתתפות: חובה בצד המחלקה (לכל מחלקה יש ראש), רשות בצד המרצה (רוב המרצים אינם ראשי מחלקה) — ולכן ה-FK נכנס לצד החובה: HeadLecturerID (Lecturers) ב-Departments + UNIQUE. זה קשר שני ונפרד מהשיוך 1:N.' },
      { a:'Departments', b:'Courses', verb:'משויכים אליה', card:'1:N',
        why:'"כל קורס משויך למחלקת תחום מסוימת" — קורס במחלקה אחת, במחלקה קורסים רבים.' },
      { a:'Students', b:'Courses', verb:'נרשם ל- / לומד', card:'M:N', bridge:'Enrollments',
        why:'"לכל סטודנט קיימת אפשרות להירשם למספר קורסים", ובקורס לומדים סטודנטים רבים. הציון ("גיליון ציונים המשויך לקורסים") שייך לצירוף סטודנט+קורס → FinalGrade בטבלת הגישור.' },
      { a:'Lecturers', b:'Courses', verb:'מלמד', card:'M:N', bridge:'Teaching',
        why:'"המרצים מלמדים קורסים שונים" (מרצה → כמה קורסים) + "לכל קורס יש מספר מרצים המעבירים אותו" (קורס → כמה מרצים).' }
    ],

    traps: [
      { q:'איפה שמים את הציון (FinalGrade)?',
        options:['בטבלת Students — "לכל סטודנט יש גיליון ציונים"', 'בטבלת Courses — לכל קורס יש ציון', 'בטבלת הגישור Enrollments — שורה לכל סטודנט בקורס', 'בטבלה נפרדת Grades עם FK לסטודנט בלבד'],
        correct:2,
        explain:'הציון תלוי גם בסטודנט וגם בקורס — זו תכונה של הקשר M:N. ב-Students אפשר לשמור ציון אחד בלבד; ב-Courses — ציון אחד לכל הסטודנטים; וטבלת Grades בלי CourseID לא יודעת לאיזה קורס הציון שייך.' },
      { q:'איך מייצגים את "ראש מחלקה, אשר משמש גם כמרצה"?',
        options:['ישות חדשה HeadOfDepartment עם שם, ת"ז ומשכורת', 'עמודה HeadLecturerID (FK → Lecturers) בטבלת Departments — קשר 1:1', 'אין צורך — DepartmentID שבטבלת Lecturers כבר מייצג את זה', 'עמודת טקסט HeadName (שם ראש המחלקה) בטבלת Departments'],
        correct:1,
        explain:'ראש המחלקה הוא מרצה, ולכן לא משכפלים את פרטיו בישות חדשה. DepartmentID במרצים אומר רק "המרצה פועל במחלקה" (1:N) — לא מי הראש. HeadName הוא טקסט חופשי: שכפול של שם המרצה בלי קשר אמיתי (FK) לטבלת המרצים, ושם יכול לחזור או להשתנות. FK למרצים בתוך Departments (עם UNIQUE) = לכל מחלקה ראש אחד, שהוא מרצה קיים.' },
      { q:'"לכל קורס יש מספר מרצים המעבירים אותו", ומרצה מלמד קורסים שונים. איך מממשים?',
        options:['LecturerID כ-FK בטבלת Courses', 'CourseID כ-FK בטבלת Lecturers', 'טבלת גישור Teaching (LecturerID, CourseID)', 'עמודת טקסט בקורס עם רשימת שמות המרצים'],
        correct:2,
        explain:'זה קשר M:N. FK בצד אחד מאפשר רק "אחד" בצד השני (מרצה אחד לקורס, או קורס אחד למרצה). רשימה בעמודת טקסט שוברת את הנרמול ואי אפשר לחבר אותה ב-JOIN. M:N → תמיד טבלת גישור.' },
      { q:'הקשר שלוחה–מחלקה הוא 1:N. איפה המפתח הזר?',
        options:['BranchID בטבלת Departments', 'DepartmentID בטבלת Branches', 'בטבלת גישור BranchDepartments', 'אין צורך במפתח זר — מספיק שם השלוחה בשם המחלקה'],
        correct:0,
        explain:'ב-1:N ה-PK של צד ה-1 (שלוחה) נכנס כ-FK לצד ה-N (מחלקה). בשלוחה אי אפשר לשמור "רשימת מחלקות" בעמודה אחת, וטבלת גישור מיותרת כשאין M:N.' },
      { q:'האם "מחלקת בחינות" היא ישות נפרדת ב-ERD?',
        options:['כן — לכל מחלקה בסיפור ישות משלה', 'לא — זו שורה (מופע) בישות Departments', 'לא — זו תכונה של Students', 'כן — ישות חלשה שתלויה בשלוחה'],
        correct:1,
        explain:'בחינות, דיקאנט ומערכות מידע הם ערכים של DepartmentName — כולם באותה טבלה. ישות = סוג של דבר, לא דוגמה ספציפית שלו (כמו שדקל ואושרי הם שורות ב-Students).' },
      { q:'ל-Enrollments בשאלה 3 יש PK נפרד (EnrollmentID). מה כדאי להוסיף כדי שסטודנט לא יירשם פעמיים לאותו קורס?',
        options:['UNIQUE (StudentID, CourseID)', 'NOT NULL על FinalGrade', 'אינדקס על FinalGrade', 'כלום — ה-PK כבר מונע כפילויות'],
        correct:0,
        explain:'ה-PK המלאכותי ייחודי בכל שורה גם אם הזוג (סטודנט, קורס) חוזר. אילוץ UNIQUE על הזוג (או PK מורכב במקום EnrollmentID) הוא שמונע רישום כפול.' }
    ],

    rubric: [
      'חמש ישויות הליבה מהסיפור — שלוחה, מחלקה, סטודנט, מרצה, קורס — כל אחת עם שם ותכונות',
      'מפתח ראשי מסומן (קו תחתון) בכל ישות; ת"ז ושם השלוחה מזוהים כייחודיים (מפתח חלופי)',
      'כל קשר עם שם (פועל) וקרדינליות על הקו: שלוחה–מחלקה 1:N, מחלקה–סטודנט 1:N, מחלקה–מרצה 1:N, מחלקה–קורס 1:N',
      'שני קשרי M:N — סטודנט–קורס ומרצה–קורס — מפורקים לטבלאות גישור (Enrollments, Teaching) עם שני FK',
      'הציון כתכונה של הרישום (Enrollments) ולא של הסטודנט',
      'ראש המחלקה מיוצג כקשר 1:1 בין מחלקה למרצה (לא כישות נפרדת שמשכפלת פרטי מרצה)',
      'בכל קשר 1:N ה-FK נמצא בצד ה-N',
      'תכונות שמופיעות בסיפור: שם ומיקום לשלוחה; שם, מזהה וכתובת לסטודנט; שם, מזהה, משכורת ודרגה למרצה',
      'סימון עקבי (Chen או רגלי עורב), מקרא קצר והנחות כתובות במקום שהסיפור עמום'
    ],

    mistakes: [
      'לשים את הציון ב-Students (או לייצר ישות "גיליון ציונים") — הציון תלוי גם בקורס, ולכן שייך לטבלת הגישור.',
      'ראש מחלקה כישות נפרדת עם שם ות"ז — שכפול של נתוני מרצה. ראש מחלקה הוא מרצה → קשר 1:1.',
      'ראש מחלקה כעמודת IsHead (BIT) במרצים — לא מבטיח שלכל מחלקה יש ראש אחד בדיוק (אפשר שניים או אף אחד). FK במחלקות כן מבטיח.',
      'לשכוח את קשר ראש המחלקה בכלל, כי הוא לא מופיע בטבלאות של שאלה 3 — הסיפור של שאלה 1 מזכיר אותו במפורש.',
      'M:N בלי טבלת גישור (CourseID בתוך Lecturers או LecturerID בתוך Courses) — לא מאפשר "מספר מרצים לקורס".',
      'FK בצד הלא נכון של 1:N (למשל רשימת מחלקות בתוך Branches).',
      'מופעים כישויות: "מחלקת בחינות", "דיקאנט", "דקל" — אלה שורות, לא טבלאות.',
      'תכונות כישויות: "מיקום", "משכורת", "דרגת הוראה" — אלה עמודות.',
      'קווי קשר בלי קרדינליות, או שכחה של הקשר שלוחה–מחלקה / מחלקה–קורס.',
      'בשאלה 2: לפרש "מחלקת סטודנט" כמחלקה אקדמית. הכוונה לישות (class) Student — שורה לכל תכונה של הסטודנט.',
      'במילון: ת"ז כ-INT — מאבד אפס מוביל (ת"ז יכולה להתחיל ב-0). נכון: CHAR(9).',
      'במילון: לבלבל בין Type (תפקיד: PK/FK/רגילה) לבין Data Type (INT/NVARCHAR…).',
      'שימו לב לקשר המעגלי Departments ↔ Lecturers (כל אחת מפנה לשנייה): ב-CREATE TABLE אחת מהן נוצרת קודם, וה-FK השני מתווסף אחר כך עם ALTER TABLE … ADD CONSTRAINT (או ש-HeadLecturerID מתחיל NULL).'
    ],

    dictionary: {
      entity: 'Students',
      rows: [
        { attr:'StudentID', type:['PK'], desc:'מזהה פנימי ייחודי של הסטודנט במערכת', dataType:['INT'],
          domain:'מספר שלם חיובי, ייחודי, לא NULL', def:'— (אפשר IDENTITY(1,1) — מספור אוטומטי)', model:'INT' },
        { attr:'FullName', type:['רגילה','מורכבת'], desc:'שם מלא של הסטודנט (פרטי + משפחה)', dataType:['NVARCHAR','VARCHAR'],
          domain:'טקסט עד 100 תווים, חובה (NOT NULL)', def:'—', model:'NVARCHAR(100)' },
        { attr:'IDNumber', type:['מפתח חלופי'], desc:'מספר תעודת זהות — "המספר המזהה הייחודי" מהסיפור', dataType:['CHAR','VARCHAR','NVARCHAR'],
          domain:'בדיוק 9 ספרות (כולל אפסים מובילים), ייחודי (UNIQUE), לא NULL', def:'—', model:'CHAR(9)' },
        { attr:'Address', type:['רגילה','מורכבת'], desc:'כתובת מגורים (רחוב, מספר, עיר)', dataType:['NVARCHAR','VARCHAR'],
          domain:'טקסט עד 200 תווים; רשות (NULL מותר)', def:'NULL', model:'NVARCHAR(200)' },
        { attr:'DepartmentID', type:['FK'], desc:'מחלקת התחום שהסטודנט משויך אליה', dataType:['INT'],
          domain:'DepartmentID שקיים בטבלת Departments; חובה (NOT NULL) — כל סטודנט משויך למחלקה', def:'—', model:'INT' }
      ]
    }
  },

  /* ---------------- שאלה 3: עשר השאילתות לעומק ---------------- */
  q3: {
    1: {
      pattern: 'SELECT בסיסי — בחירת עמודות מטבלה אחת',
      columns: 'שם השלוחה (BranchName), מיקום השלוחה (Location)',
      explain: [
        '1. איפה המידע? שם ומיקום של שלוחה — שניהם בטבלה Branches. טבלה אחת → אין JOIN.',
        '2. אילו עמודות? "השמות והמיקומים" → BranchName, Location — בדיוק אלה, ובסדר שבשאלה.',
        '3. יש תנאי? "כל … במערכת" → אין WHERE.',
        '4. הפתרון: SELECT BranchName, Location FROM Branches;',
        'התבנית: SELECT <העמודות המבוקשות> FROM <הטבלה>; — כל "הצג את ה-X של כל ה-Y" בלי תנאי.',
        'וריאציות צפויות: "רק השלוחות בתל אביב" → WHERE Location = N\'תל אביב\'; "ממוינות לפי שם" → ORDER BY BranchName; "כמה שלוחות יש?" → SELECT COUNT(*) FROM Branches.'
      ].join('\n'),
      mistakes: [
        'SELECT * — מחזיר גם את BranchID שלא התבקש. בוחרים בדיוק את העמודות שבשאלה.',
        'לשכוח את אחת משתי העמודות (רק שמות, בלי מיקום).',
        'לכתוב את שם הטבלה בעברית או ביחיד (Branch) — שמות טבלאות ועמודות מעתיקים בדיוק מרשימת הטבלאות.',
        'להוסיף ORDER BY או DISTINCT "ליתר ביטחון" — לא שגיאה, אבל לא נדרש. ממיינים רק כשהשאלה מבקשת סדר.'
      ],
      wrong: [
        { sql:'SELECT * FROM Branches;', why:'מחזיר 3 עמודות (גם BranchID) — התבקשו רק שם ומיקום.' },
        { sql:'SELECT BranchName FROM Branches;', why:'חסר המיקום — "השמות והמיקומים" הן שתי עמודות.' }
      ],
      alt: [
        'SELECT b.BranchName, b.Location FROM Branches AS b;',
        'SELECT BranchName AS [שם שלוחה], Location AS [מיקום] FROM Branches ORDER BY BranchName;'
      ],
      accept: [],
      tsql: 'SELECT BranchName, Location\nFROM Branches;'
    },

    2: {
      pattern: 'INNER JOIN של שתי טבלאות לאורך FK → PK (שם במקום מזהה)',
      columns: 'שם המחלקה (DepartmentName), שם השלוחה (BranchName)',
      explain: [
        '1. מה מבקשים? שם מחלקה + "השלוחה שבה היא נמצאת". ב-Departments יש רק BranchID (מספר); שם השלוחה נמצא ב-Branches. מידע משתי טבלאות → JOIN.',
        '2. מה מחבר? המפתח הזר Departments.BranchID מצביע על המפתח הראשי Branches.BranchID. תנאי ה-JOIN הוא תמיד FK = PK.',
        '3. כינויים (d, b) מקצרים ומונעים עמימות: BranchID קיים בשתי הטבלאות, ובלי קידומת SQL Server מחזיר Ambiguous column name.',
        '4. הפתרון: SELECT d.DepartmentName, b.BranchName FROM Departments d JOIN Branches b ON d.BranchID = b.BranchID;',
        '5. JOIN לבד = INNER JOIN: רק שורות עם התאמה בשני הצדדים. כאן לכל מחלקה יש שלוחה, ולכן LEFT JOIN (Departments משמאל) נותן אותה תוצאה — ואפילו נאמן יותר ל"כל המחלקות".',
        'התבנית: "הצג X עם ה-Y שלו" כש-Y בטבלה אחרת → FROM X JOIN Y ON X.FK = Y.PK. זו התבנית הנפוצה ביותר במבחן (שאלות 2, 9, 10).'
      ].join('\n'),
      mistakes: [
        'להציג BranchID (מספר) במקום שם השלוחה — "השלוחה" = שמה, שנמצא בטבלה אחרת.',
        'לשכוח את ה-ON (או FROM Departments, Branches בלי WHERE) → מכפלה קרטזית: כל מחלקה עם כל שלוחה.',
        'לחבר PK ל-PK (d.DepartmentID = b.BranchID) במקום FK ל-PK.',
        'BranchID בלי קידומת טבלה — Ambiguous column name ב-SQL Server.',
        'NATURAL JOIN או JOIN … USING (BranchID) — לא קיימים ב-SQL Server. הבודק באתר (SQLite) יקבל אותם, אבל במבחן כותבים JOIN … ON.'
      ],
      wrong: [
        { sql:'SELECT DepartmentName, BranchID FROM Departments;', why:'מוצג מספר השלוחה ולא שמה — חסר JOIN ל-Branches.' },
        { sql:'SELECT d.DepartmentName, b.BranchName FROM Departments d, Branches b;', why:'אין תנאי חיבור → מכפלה קרטזית: 4 מחלקות × 2 שלוחות = 8 שורות, חציין שקריות.' },
        { sql:'SELECT d.DepartmentName, b.BranchName FROM Departments d JOIN Branches b ON d.DepartmentID = b.BranchID;', why:'תנאי JOIN שגוי (PK מול PK): "בחינות" משויכת בטעות לשלוחת תל אביב, ומחלקות 3–4 נעלמות כי אין שלוחות 3–4.' }
      ],
      alt: [
        'SELECT d.DepartmentName, b.BranchName FROM Departments d, Branches b WHERE d.BranchID = b.BranchID;',
        'SELECT d.DepartmentName, b.BranchName FROM Branches b INNER JOIN Departments d ON b.BranchID = d.BranchID;',
        'SELECT d.DepartmentName, b.BranchName FROM Departments d LEFT JOIN Branches b ON d.BranchID = b.BranchID;'
      ],
      accept: [
        '-- פרשנות: "כל המחלקות עם שמותיהן" → גם מזהה המחלקה\nSELECT d.DepartmentID, d.DepartmentName, b.BranchName FROM Departments d JOIN Branches b ON d.BranchID = b.BranchID;',
        '-- פרשנות: "השלוחה שבה הן נמצאות" → גם מיקום השלוחה\nSELECT d.DepartmentName, b.BranchName, b.Location FROM Departments d JOIN Branches b ON d.BranchID = b.BranchID;'
      ],
      tsql: 'SELECT d.DepartmentName, b.BranchName\nFROM Departments d\nJOIN Branches b ON d.BranchID = b.BranchID;'
    },

    3: {
      pattern: 'JOIN של 3 טבלאות דרך טבלת גישור + סינון WHERE על תכונת הקשר',
      columns: 'שם הסטודנט (FullName), שם הקורס (CourseName), הציון (FinalGrade)',
      explain: [
        '1. מה מבקשים? שם סטודנט (Students) + שם קורס (Courses) + תנאי על הציון (Enrollments). שלוש טבלאות.',
        '2. סטודנט–קורס הוא קשר M:N, ולכן אין FK ישיר ביניהם. עוברים דרך הגישור: Students → Enrollments (StudentID) → Courses (CourseID). מספר תנאי ה-ON = מספר הטבלאות פחות 1 (כאן 2).',
        '3. "רק אם הציון גבוה מ-80" — תנאי על כל שורת רישום בנפרד → WHERE e.FinalGrade > 80. גדול ממש: 80 עצמו לא נכלל.',
        '4. הציון בפלט אינו חובה לפי הניסוח, אבל מראה שהסינון עבד (ראו פרשנות חלופית). בבודק באתר הפתרון הרשמי מציג 3 עמודות — שם, קורס, ציון — ולכן כך גם אתם.',
        '5. סטודנט שעבר כמה קורסים מעל 80 יופיע כמה פעמים — זה נכון: כל שורה = סטודנט בקורס.',
        '6. הפתרון: SELECT s.FullName, c.CourseName, e.FinalGrade FROM Students s JOIN Enrollments e ON s.StudentID = e.StudentID JOIN Courses c ON e.CourseID = c.CourseID WHERE e.FinalGrade > 80;',
        'התבנית: "X עם ה-Y שלהם" כשהקשר M:N → שני JOIN דרך טבלת הגישור. תנאי על תכונה של הקשר (ציון, תאריך רישום) → WHERE על עמודה מטבלת הגישור. אותה תבנית בדיוק עם Lecturers → Teaching → Courses.'
      ].join('\n'),
      mistakes: [
        '>= 80 במקום > 80 — "גבוה מ-80" הוא גדול ממש. בנתוני האתר אין ציון 80 בדיוק, ולכן הבודק האוטומטי לא יתפוס את זה — אבל במבחן זו טעות.',
        'לחבר Students ל-Courses ישירות דרך DepartmentID המשותף — זה "כל קורסי המחלקה של הסטודנט", לא הקורסים שלמד בפועל.',
        'להציג CourseID במקום שם הקורס — חסר ה-JOIN השלישי.',
        'לסנן ב-HAVING במקום WHERE — HAVING מיועד לתנאי על קבוצות אחרי GROUP BY; כאן אין קיבוץ.',
        'לפרש כ"ממוצע הסטודנט מעל 80" (GROUP BY + AVG) — השאלה מדברת על הציון בכל קורס.'
      ],
      wrong: [
        { sql:'SELECT s.FullName, c.CourseName, e.FinalGrade FROM Students s JOIN Courses c ON s.DepartmentID = c.DepartmentID JOIN Enrollments e ON e.StudentID = s.StudentID WHERE e.FinalGrade > 80;',
          why:'Courses מחובר דרך המחלקה ולא דרך הרישום — כל ציון "מוצמד" לכל קורסי המחלקה. חייב להיות e.CourseID = c.CourseID.' },
        { sql:'SELECT s.FullName, e.CourseID, e.FinalGrade FROM Students s JOIN Enrollments e ON s.StudentID = e.StudentID WHERE e.FinalGrade > 80;',
          why:'מוצג מספר הקורס ולא שמו — חסר JOIN ל-Courses.' },
        { sql:'SELECT s.FullName, c.CourseName, AVG(e.FinalGrade) FROM Students s JOIN Enrollments e ON s.StudentID = e.StudentID JOIN Courses c ON e.CourseID = c.CourseID GROUP BY s.FullName HAVING AVG(e.FinalGrade) > 80;',
          why:'הופך את השאלה לממוצע לסטודנט: שורה אחת לסטודנט עם קורס "אקראי" (וב-SQL Server — שגיאה, CourseName לא ב-GROUP BY).' },
        { sql:'SELECT s.FullName, c.CourseName, e.FinalGrade FROM Students s LEFT JOIN Enrollments e ON s.StudentID = e.StudentID AND e.FinalGrade > 80 LEFT JOIN Courses c ON e.CourseID = c.CourseID;',
          why:'LEFT JOIN עם תנאי הציון בתוך ה-ON: התנאי רק קובע אילו רישומים "מתחברים", אבל כל הסטודנטים נשמרים — אלמוג, הודיה, אוריה ואיתי מופיעים עם NULL בקורס ובציון. "רק אם הציון גבוה מ-80" = לסנן שורות → JOIN רגיל + WHERE.' }
      ],
      alt: [
        'SELECT s.FullName, c.CourseName, e.FinalGrade FROM Students s, Enrollments e, Courses c WHERE s.StudentID = e.StudentID AND e.CourseID = c.CourseID AND e.FinalGrade > 80;',
        'SELECT s.FullName, c.CourseName, e.FinalGrade FROM Enrollments e JOIN Students s ON s.StudentID = e.StudentID JOIN Courses c ON c.CourseID = e.CourseID AND e.FinalGrade > 80;',
        'SELECT s.FullName, c.CourseName, e.FinalGrade FROM Students s INNER JOIN Enrollments e ON s.StudentID = e.StudentID INNER JOIN Courses c ON e.CourseID = c.CourseID WHERE e.FinalGrade > 80 ORDER BY s.FullName, e.FinalGrade DESC;'
      ],
      accept: [
        '-- פרשנות מילולית: רק שם הסטודנט ושם הקורס (הציון משמש רק לסינון)\nSELECT s.FullName, c.CourseName FROM Students s JOIN Enrollments e ON s.StudentID = e.StudentID JOIN Courses c ON e.CourseID = c.CourseID WHERE e.FinalGrade > 80;'
      ],
      tsql: 'SELECT s.FullName, c.CourseName, e.FinalGrade\nFROM Students s\nJOIN Enrollments e ON s.StudentID = e.StudentID\nJOIN Courses c     ON e.CourseID = c.CourseID\nWHERE e.FinalGrade > 80;'
    },

    4: {
      pattern: 'סינון שורות עם WHERE ואופרטור השוואה מספרי',
      columns: 'שם המרצה (FullName), המשכורת (Salary)',
      explain: [
        '1. טבלה אחת — Lecturers (שם ומשכורת שניהם שם). אין JOIN.',
        '2. "מעל 15,000" → Salary > 15000: גדול ממש, בלי פסיק אלפים ובלי גרשיים — זו עמודה מספרית.',
        '3. מה מציגים? "כל המרצים" — לפחות את שם המרצה; מוסיפים את המשכורת כדי שיראו שהתנאי מתקיים. גם SELECT * מקובל כאן (ראו פרשנות חלופית).',
        '4. הפתרון: SELECT FullName, Salary FROM Lecturers WHERE Salary > 15000;',
        'התבנית: SELECT … FROM … WHERE <עמודה> <אופרטור> <ערך>. אופרטורים: =, <>, >, >=, <, <=, BETWEEN a AND b (כולל הקצוות), IN (…), LIKE, IS NULL. טקסט עברי ב-SQL Server: N\'…\'.',
        'וריאציות צפויות: "בין 12,000 ל-18,000" → BETWEEN 12000 AND 18000; "פרופסורים שמרוויחים מעל" → AND AcademicRank = N\'פרופסור\'; "המרצה עם המשכורת הגבוהה ביותר" → TOP 1 … ORDER BY Salary DESC או תת-שאילתה עם MAX.'
      ].join('\n'),
      mistakes: [
        '>= 15000 במקום > 15000 — "מעל" = גדול ממש. בנתוני האתר אין משכורת 15,000 בדיוק, ולכן הבודק לא יתפוס את זה.',
        'לכתוב 15,000 עם פסיק — שגיאת תחביר; ובגרשיים (\'15,000\') זה כבר טקסט, לא מספר.',
        'HAVING במקום WHERE — אין כאן קיבוץ.',
        'JOIN מיותר לטבלאות אחרות — כשכל המידע בטבלה אחת, לא מחברים.'
      ],
      wrong: [
        { sql:"SELECT FullName, Salary FROM Lecturers WHERE Salary > '15,000';", why:"'15,000' הוא טקסט: ב-SQL Server — שגיאת המרה; ב-SQLite השוואת מספר לטקסט מחזירה 0 שורות. כותבים 15000." },
        { sql:'SELECT FullName, Salary FROM Lecturers WHERE Salary > 15,000;', why:'פסיק אלפים בתוך מספר — שגיאת תחביר (Incorrect syntax near \',\'). מספרים ב-SQL כותבים בלי פסיקים: 15000.' },
        { sql:'SELECT FullName, Salary FROM Lecturers WHERE Salary < 15000;', why:'הסימן הפוך — "מעל" = >.' },
        { sql:'SELECT FullName, MAX(Salary) FROM Lecturers WHERE Salary > 15000;', why:'פונקציית קיבוץ מיותרת: מתקבלת שורה אחת במקום כל המרצים (וב-SQL Server — שגיאה, FullName לא ב-GROUP BY).' }
      ],
      alt: [
        'SELECT l.FullName, l.Salary FROM Lecturers l WHERE l.Salary > 15000 ORDER BY l.Salary DESC;',
        'SELECT FullName, Salary FROM Lecturers WHERE NOT Salary <= 15000;'
      ],
      accept: [
        '-- "שליפת כל המרצים" → כל פרטי המרצה\nSELECT * FROM Lecturers WHERE Salary > 15000;',
        '-- רק שמות המרצים\nSELECT FullName FROM Lecturers WHERE Salary > 15000;'
      ],
      tsql: 'SELECT FullName, Salary\nFROM Lecturers\nWHERE Salary > 15000;'
    },

    5: {
      pattern: 'GROUP BY + COUNT עם INNER JOIN (רק מחלקות שיש בהן סטודנטים)',
      columns: 'שם המחלקה (DepartmentName), מספר הסטודנטים במחלקה',
      explain: [
        '1. "מספר ה-X בכל Y" = ספירה לפי קבוצות → GROUP BY Y + COUNT(X). בפלט: שורה אחת לכל מחלקה.',
        '2. שם המחלקה ב-Departments, הסטודנטים ב-Students → JOIN על Students.DepartmentID = Departments.DepartmentID.',
        '3. חוק הזהב של SQL Server: כל עמודה ב-SELECT שאינה בתוך פונקציית קיבוץ (COUNT/SUM/AVG/MIN/MAX) חייבת להופיע ב-GROUP BY. לכן GROUP BY d.DepartmentID, d.DepartmentName — ה-ID מבטיח ששתי מחלקות עם אותו שם לא יתמזגו, והשם נדרש כדי שמותר יהיה להציג אותו.',
        '4. JOIN רגיל (INNER) מחזיר רק מחלקות שיש בהן לפחות סטודנט אחד — "מנהל עסקים" הריקה לא מופיעה. זה ההבדל המכוון מול שאלה 7, שמוסיפה במפורש "כולל מחלקות שאין בהן סטודנטים". כששתי השאלות באותו מבחן, ההנחה הסבירה היא ששאלה 5 = INNER.',
        '5. הפתרון: SELECT d.DepartmentName, COUNT(s.StudentID) AS NumStudents FROM Departments d JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
        'שימו לב: בפתרון שמריץ האתר כתוב GROUP BY d.DepartmentID בלבד — SQLite מרשה את זה, SQL Server יחזיר שגיאה. במבחן כתבו גם את d.DepartmentName ב-GROUP BY.',
        'עם INNER JOIN מותר גם COUNT(*) — אין שורות NULL. הבעיה עם COUNT(*) מתחילה רק ב-LEFT JOIN (שאלה 7).'
      ].join('\n'),
      mistakes: [
        'עמודה ב-SELECT שלא ב-GROUP BY (s.FullName, או d.DepartmentName כשמקבצים רק לפי ID) — ב-SQL Server: "Column … is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause".',
        'לשכוח GROUP BY — COUNT מחזיר מספר אחד לכל הטבלה.',
        'COUNT(*) יחד עם LEFT JOIN — מחלקה ריקה נספרת כ-1.',
        'פרשנות LEFT JOIN (כולל 0) — לגיטימית, אבל אז כתבו הערה שמסבירה את הבחירה, כי שאלה 7 מבקשת את זה במפורש.'
      ],
      wrong: [
        { sql:'SELECT d.DepartmentName, COUNT(*) FROM Departments d LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
          why:'COUNT(*) סופר שורות, לא סטודנטים: "מנהל עסקים" הריקה מקבלת 1 במקום 0 (שורת ה-NULL נספרת). שגוי בשתי הפרשנויות.' },
        { sql:'SELECT COUNT(StudentID) FROM Students;', why:'אין GROUP BY — מספר אחד לכל המכללה (12) במקום ספירה לכל מחלקה.' },
        { sql:'SELECT d.DepartmentName, s.FullName, COUNT(s.StudentID) FROM Departments d JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentName;',
          why:'s.FullName לא ב-GROUP BY ולא בפונקציית קיבוץ — ב-SQL Server שגיאה; ב-SQLite מוצג שם "אקראי" של סטודנט אחד מכל מחלקה.' },
        { sql:'SELECT d.DepartmentName, COUNT(e.StudentID) FROM Departments d JOIN Students s ON s.DepartmentID = d.DepartmentID JOIN Enrollments e ON e.StudentID = s.StudentID GROUP BY d.DepartmentID, d.DepartmentName;',
          why:'JOIN מיותר ל-Enrollments: סופרים רישומים ולא סטודנטים — מערכות מידע מקבלת 12 (אושרי ודקל רשומים לשני קורסים), ודיקאנט נעלמת כי איתי לא רשום לאף קורס. כל JOIN מיותר יכול להכפיל או למחוק שורות לפני ה-COUNT.' }
      ],
      alt: [
        '-- הגרסה התקינה ב-SQL Server (גם השם ב-GROUP BY)\nSELECT d.DepartmentName, COUNT(s.StudentID) AS NumStudents FROM Departments d JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
        'SELECT d.DepartmentName, COUNT(*) FROM Students s JOIN Departments d ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentName;',
        'SELECT d.DepartmentName, x.NumStudents FROM Departments d JOIN (SELECT DepartmentID, COUNT(*) AS NumStudents FROM Students GROUP BY DepartmentID) x ON x.DepartmentID = d.DepartmentID;'
      ],
      accept: [
        '-- פרשנות: כולל מחלקות בלי סטודנטים (0) — בפועל זה הפתרון של שאלה 7\nSELECT d.DepartmentName, COUNT(s.StudentID) AS NumStudents FROM Departments d LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
        '-- מטבלה אחת: מזהה המחלקה במקום שמה (לגיטימי, פחות קריא)\nSELECT DepartmentID, COUNT(*) AS NumStudents FROM Students GROUP BY DepartmentID;'
      ],
      tsql: 'SELECT d.DepartmentName, COUNT(s.StudentID) AS NumStudents\nFROM Departments d\nJOIN Students s ON s.DepartmentID = d.DepartmentID\nGROUP BY d.DepartmentID, d.DepartmentName;'
    },

    6: {
      pattern: 'LEFT JOIN לאורך שרשרת דרך טבלת גישור — "כולל X בלי Y"',
      columns: 'שם הקורס (CourseName), שם המרצה (FullName) — NULL בקורס ללא מרצה',
      explain: [
        '1. "ודא כי גם קורסים ללא מרצים יוצגו" = LEFT JOIN, כש-Courses היא הטבלה השמאלית (הראשונה ב-FROM) — הטבלה שכל השורות שלה חייבות להופיע.',
        '2. קורס–מרצה הוא M:N → השרשרת: Courses → Teaching → Lecturers.',
        '3. הכלל הקריטי: אחרי LEFT JOIN, כל JOIN שממשיך את השרשרת חייב להיות גם הוא LEFT. אם כותבים LEFT JOIN Teaching ואחריו JOIN Lecturers (INNER), שורת הקורס בלי מרצה (t.LecturerID = NULL) לא תמצא התאמה ותימחק — וה-LEFT הראשון "התבזבז".',
        '4. מה יוצא: קורס עם שני מרצים — שתי שורות; קורס בלי מרצה — שורה אחת עם NULL בעמודת המרצה.',
        '5. הפתרון: SELECT c.CourseName, l.FullName FROM Courses c LEFT JOIN Teaching t ON c.CourseID = t.CourseID LEFT JOIN Lecturers l ON t.LecturerID = l.LecturerID;',
        'אפשר להציג טקסט במקום NULL: ISNULL(l.FullName, N\'אין מרצה\').',
        'התבנית: "הצג את כל ה-X (גם אם אין להם Y)" → FROM X LEFT JOIN …. מילות המפתח בשאלה: "כולל", "גם אם אין", "ודא שגם … יוצגו". אותו דבר מימין: FROM Lecturers l RIGHT JOIN … RIGHT JOIN Courses c.'
      ].join('\n'),
      mistakes: [
        'INNER JOIN — הקורס בלי מרצה (חשבונאות ניהולית) נעלם.',
        'LEFT JOIN ואחריו JOIN רגיל בשרשרת — ה-INNER השני מבטל את ה-LEFT הראשון.',
        'כיוון הפוך: FROM Lecturers LEFT JOIN … — שומר מרצים בלי קורסים, לא קורסים בלי מרצים.',
        'דילוג על טבלת הגישור (Courses LEFT JOIN Lecturers ON c.DepartmentID = l.DepartmentID) — מחבר קורס לכל מרצי המחלקה, לא למי שמלמד אותו.',
        'תנאי על הטבלה הימנית ב-WHERE (למשל WHERE l.Salary > 10000) הופך את ה-LEFT ל-INNER בפועל — תנאי כזה שמים בתוך ה-ON.'
      ],
      wrong: [
        { sql:'SELECT c.CourseName, l.FullName FROM Courses c JOIN Teaching t ON c.CourseID = t.CourseID JOIN Lecturers l ON t.LecturerID = l.LecturerID;',
          why:'INNER JOIN — "חשבונאות ניהולית", שאין לה מרצה, לא מוצגת, בניגוד לדרישה המפורשת.' },
        { sql:'SELECT c.CourseName, l.FullName FROM Courses c LEFT JOIN Teaching t ON c.CourseID = t.CourseID JOIN Lecturers l ON t.LecturerID = l.LecturerID;',
          why:'ה-JOIN השני הוא INNER: בשורת הקורס בלי מרצה t.LecturerID הוא NULL, אין התאמה, והשורה נמחקת. כל JOIN אחרי LEFT בשרשרת — גם LEFT.' },
        { sql:'SELECT c.CourseName, l.FullName FROM Lecturers l LEFT JOIN Teaching t ON t.LecturerID = l.LecturerID LEFT JOIN Courses c ON c.CourseID = t.CourseID;',
          why:'הכיוון הפוך: נשמר המרצה בלי קורסים (מיכל שרון, עם NULL בקורס) ונעלם הקורס בלי מרצה.' },
        { sql:'SELECT c.CourseName, l.FullName FROM Courses c LEFT JOIN Lecturers l ON c.DepartmentID = l.DepartmentID;',
          why:'דילוג על Teaching: כל קורס מוצג עם כל מרצי המחלקה שלו, לא עם מי שבאמת מלמד אותו.' },
        { sql:'SELECT c.CourseName, l.FullName FROM Courses c FULL OUTER JOIN Teaching t ON c.CourseID = t.CourseID FULL OUTER JOIN Lecturers l ON t.LecturerID = l.LecturerID;',
          why:'FULL OUTER JOIN "ליתר ביטחון" שומר את שני הצדדים: הקורס בלי מרצה נשאר, אבל נוספת גם שורה של מרצה בלי קורס (NULL, מיכל שרון) — שלא התבקשה. שומרים רק את הצד שהשאלה אומרת עליו "כל" / "גם … ללא".' }
      ],
      alt: [
        '-- אותו דבר עם RIGHT JOIN: הטבלה שנשמרת (Courses) מימין\nSELECT c.CourseName, l.FullName FROM Lecturers l RIGHT JOIN Teaching t ON t.LecturerID = l.LecturerID RIGHT JOIN Courses c ON c.CourseID = t.CourseID;',
        '-- JOIN מקונן: קודם הוראה + מרצה (INNER), ואז LEFT מהקורסים\nSELECT c.CourseName, l.FullName FROM Courses c LEFT JOIN (Teaching t JOIN Lecturers l ON t.LecturerID = l.LecturerID) ON c.CourseID = t.CourseID;',
        'SELECT c.CourseName, x.FullName FROM Courses c LEFT JOIN (SELECT t.CourseID, l.FullName FROM Teaching t JOIN Lecturers l ON l.LecturerID = t.LecturerID) x ON x.CourseID = c.CourseID;'
      ],
      accept: [
        "-- טקסט במקום NULL לקורס בלי מרצה\nSELECT c.CourseName, ISNULL(l.FullName, N'אין מרצה') AS Lecturer FROM Courses c LEFT JOIN Teaching t ON c.CourseID = t.CourseID LEFT JOIN Lecturers l ON t.LecturerID = l.LecturerID;"
      ],
      tsql: 'SELECT c.CourseName, l.FullName\nFROM Courses c\nLEFT JOIN Teaching t  ON c.CourseID = t.CourseID\nLEFT JOIN Lecturers l ON t.LecturerID = l.LecturerID;'
    },

    7: {
      pattern: 'LEFT JOIN + GROUP BY + COUNT(עמודה) — כולל קבוצות ריקות עם 0',
      columns: 'שם המחלקה (DepartmentName), מספר הסטודנטים (0 במחלקה ריקה)',
      explain: [
        '1. זו שאלה 5 + "כולל מחלקות שאין בהן סטודנטים" → מחליפים JOIN ב-LEFT JOIN, ו-Departments משמאל (הטבלה שכל השורות שלה חייבות להופיע).',
        '2. מחלקה בלי סטודנטים מקבלת אחרי ה-LEFT JOIN שורה אחת שבה כל עמודות Students הן NULL.',
        '3. הנקודה הקריטית: COUNT(s.StudentID) ולא COUNT(*). COUNT(עמודה) מדלג על NULL → 0 למחלקה ריקה; COUNT(*) סופר שורות → 1 (שגוי!). והעמודה חייבת להיות מהטבלה הימנית (Students) — COUNT(d.DepartmentID) אף פעם לא NULL ונותן 1, כמו COUNT(*).',
        '4. GROUP BY d.DepartmentID, d.DepartmentName — חוק הזהב של SQL Server, כמו בשאלה 5.',
        '5. הפתרון: SELECT d.DepartmentName, COUNT(s.StudentID) AS NumStudents FROM Departments d LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
        'בדיקה עצמית על נתוני האתר: "מנהל עסקים" ריקה — אם היא חסרה או מקבלת 1, יש טעות.',
        'דרך נוספת בלי JOIN: תת-שאילתה מתואמת בתוך ה-SELECT — (SELECT COUNT(*) FROM Students s WHERE s.DepartmentID = d.DepartmentID) — מחזירה 0 למחלקה ריקה באופן טבעי.',
        'התבנית הכללית: "כל ה-Y עם מספר ה-X שלהם, כולל Y בלי X" → FROM Y LEFT JOIN X … GROUP BY Y … COUNT(X.PK).'
      ].join('\n'),
      mistakes: [
        'COUNT(*) עם LEFT JOIN → 1 במקום 0 למחלקה ריקה.',
        'INNER JOIN (כמו בשאלה 5) → המחלקה הריקה לא מופיעה כלל.',
        'כיוון הפוך: FROM Students LEFT JOIN Departments — שומר סטודנטים בלי מחלקה, לא מחלקות בלי סטודנטים.',
        'תנאי על Students ב-WHERE אחרי LEFT JOIN — מוחק את שורות ה-NULL ומחזיר להתנהגות של INNER. תנאי כזה שמים ב-ON.',
        'GROUP BY רק לפי ID כשמציגים את השם — עובד באתר (SQLite), שגיאה ב-SQL Server.'
      ],
      wrong: [
        { sql:'SELECT d.DepartmentName, COUNT(*) FROM Departments d LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
          why:'COUNT(*) סופר את שורת ה-NULL: "מנהל עסקים" מקבלת 1 במקום 0.' },
        { sql:'SELECT d.DepartmentName, COUNT(s.StudentID) FROM Departments d JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
          why:'INNER JOIN — המחלקה בלי סטודנטים לא מוצגת, בניגוד ל"כולל מחלקות שאין בהן סטודנטים".' },
        { sql:'SELECT d.DepartmentName, COUNT(s.StudentID) FROM Students s LEFT JOIN Departments d ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
          why:'הכיוון הפוך — הטבלה שנשמרת היא Students; מחלקה בלי סטודנטים לא מופיעה.' },
        { sql:'SELECT d.DepartmentName, COUNT(d.DepartmentID) FROM Departments d LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
          why:'סופרים עמודה מהטבלה השמאלית (Departments), שלעולם אינה NULL — בדיוק כמו COUNT(*): "מנהל עסקים" מקבלת 1. ב-LEFT JOIN סופרים עמודה מהטבלה הימנית (s.StudentID).' }
      ],
      alt: [
        '-- הגרסה התקינה ב-SQL Server (גם השם ב-GROUP BY)\nSELECT d.DepartmentName, COUNT(s.StudentID) AS NumStudents FROM Departments d LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
        '-- תת-שאילתה מתואמת: 0 למחלקה ריקה גם בלי LEFT JOIN\nSELECT d.DepartmentName, (SELECT COUNT(*) FROM Students s WHERE s.DepartmentID = d.DepartmentID) AS NumStudents FROM Departments d;',
        'SELECT d.DepartmentName, COUNT(s.StudentID) FROM Students s RIGHT JOIN Departments d ON s.DepartmentID = d.DepartmentID GROUP BY d.DepartmentID, d.DepartmentName;',
        '-- סופרים קודם בתת-שאילתה, ואז LEFT JOIN + ISNULL ל-0\nSELECT d.DepartmentName, ISNULL(x.Cnt, 0) FROM Departments d LEFT JOIN (SELECT DepartmentID, COUNT(*) AS Cnt FROM Students GROUP BY DepartmentID) x ON x.DepartmentID = d.DepartmentID;'
      ],
      accept: [],
      tsql: 'SELECT d.DepartmentName, COUNT(s.StudentID) AS NumStudents\nFROM Departments d\nLEFT JOIN Students s ON s.DepartmentID = d.DepartmentID\nGROUP BY d.DepartmentID, d.DepartmentName;'
    },

    8: {
      pattern: 'GROUP BY + HAVING — סינון קבוצות לפי ספירה',
      columns: 'שם הקורס (CourseName), מספר המרצים בקורס',
      explain: [
        '1. "יותר ממרצה אחד" = סופרים מרצים לכל קורס ואז מסננים לפי הספירה. תנאי על תוצאה של COUNT/SUM/AVG → HAVING, לא WHERE.',
        '2. מי יודע "מי מלמד מה"? טבלת הגישור Teaching — כל שורה = מרצה אחד בקורס אחד. לכן מספר השורות ב-Teaching לכל CourseID = מספר המרצים בקורס.',
        '3. JOIN ל-Courses בשביל שם הקורס, GROUP BY c.CourseID, c.CourseName, ואז HAVING COUNT(t.LecturerID) > 1.',
        '4. סדר הביצוע הלוגי: FROM/JOIN → WHERE (מסנן שורות) → GROUP BY → HAVING (מסנן קבוצות) → SELECT → ORDER BY. לכן WHERE עוד "לא רואה" את COUNT.',
        '5. הפתרון: SELECT c.CourseName, COUNT(t.LecturerID) AS NumLecturers FROM Courses c JOIN Teaching t ON c.CourseID = t.CourseID GROUP BY c.CourseID, c.CourseName HAVING COUNT(t.LecturerID) > 1;',
        'גם כאן הפתרון שמריץ האתר מקבץ רק לפי c.CourseID — ב-SQL Server חובה להוסיף c.CourseName.',
        'וריאציות: "לפחות 2 מרצים" → >= 2; "מרצים שמלמדים יותר מקורס אחד" → אותו דבר עם GROUP BY לפי המרצה; "סטודנטים שרשומים ליותר מ-2 קורסים" → Enrollments + HAVING COUNT(*) > 2; אם אותו מרצה עלול להופיע פעמיים באותו קורס — COUNT(DISTINCT t.LecturerID).'
      ].join('\n'),
      mistakes: [
        'WHERE COUNT(…) > 1 — שגיאה: אסור פונקציית קיבוץ ב-WHERE.',
        'לקבץ לפי המרצה במקום לפי הקורס — זו שאלה אחרת (מרצים שמלמדים כמה קורסים).',
        '> 0 או >= 1 במקום > 1 — "יותר ממרצה אחד" = לפחות 2.',
        'לשכוח את ה-HAVING — מקבלים את מספר המרצים של כל הקורסים.',
        'GROUP BY רק לפי c.CourseID כשמציגים את c.CourseName — שגיאה ב-SQL Server.'
      ],
      wrong: [
        { sql:'SELECT c.CourseName, COUNT(t.LecturerID) FROM Courses c JOIN Teaching t ON c.CourseID = t.CourseID WHERE COUNT(t.LecturerID) > 1 GROUP BY c.CourseID, c.CourseName;',
          why:'פונקציית קיבוץ ב-WHERE — שגיאת הרצה. WHERE מסנן שורות לפני הקיבוץ; תנאי על COUNT כותבים ב-HAVING אחרי ה-GROUP BY.' },
        { sql:'SELECT c.CourseName, COUNT(t.LecturerID) FROM Courses c JOIN Teaching t ON c.CourseID = t.CourseID GROUP BY c.CourseID, c.CourseName HAVING COUNT(t.LecturerID) >= 1;',
          why:'>= 1 מחזיר כל קורס שיש לו מרצה כלשהו. "יותר מאחד" = > 1.' },
        { sql:'SELECT c.CourseName, COUNT(t.LecturerID) FROM Courses c JOIN Teaching t ON c.CourseID = t.CourseID GROUP BY c.CourseID, c.CourseName;',
          why:'חסר HAVING — מוצגים כל הקורסים עם מספר המרצים, גם אלה עם מרצה אחד.' },
        { sql:'SELECT l.FullName, COUNT(t.CourseID) FROM Lecturers l JOIN Teaching t ON l.LecturerID = t.LecturerID GROUP BY l.LecturerID, l.FullName HAVING COUNT(t.CourseID) > 1;',
          why:'קיבוץ לפי מרצה — עונה על "מרצים שמלמדים יותר מקורס אחד", שאלה אחרת.' },
        { sql:'SELECT c.CourseName, COUNT(l.LecturerID) FROM Courses c JOIN Lecturers l ON c.DepartmentID = l.DepartmentID GROUP BY c.CourseID, c.CourseName HAVING COUNT(l.LecturerID) > 1;',
          why:'דילוג על Teaching: סופרים את מרצי המחלקה של הקורס ולא את מי שמלמד אותו — שלושת קורסי מערכות מידע מקבלים 2, וסטטיסטיקה (שני מרצים ממחלקות שונות) נעלמת. "מי מלמד מה" נמצא רק בטבלת הגישור.' }
      ],
      alt: [
        '-- הגרסה התקינה ב-SQL Server (גם השם ב-GROUP BY)\nSELECT c.CourseName, COUNT(t.LecturerID) AS NumLecturers FROM Courses c JOIN Teaching t ON c.CourseID = t.CourseID GROUP BY c.CourseID, c.CourseName HAVING COUNT(t.LecturerID) > 1;',
        'SELECT c.CourseName, COUNT(DISTINCT t.LecturerID) FROM Teaching t JOIN Courses c ON c.CourseID = t.CourseID GROUP BY c.CourseID, c.CourseName HAVING COUNT(DISTINCT t.LecturerID) >= 2;',
        'SELECT c.CourseName, x.Cnt FROM Courses c JOIN (SELECT CourseID, COUNT(*) AS Cnt FROM Teaching GROUP BY CourseID HAVING COUNT(*) > 1) x ON x.CourseID = c.CourseID;'
      ],
      accept: [
        '-- רק שמות הקורסים, בלי הספירה\nSELECT c.CourseName FROM Courses c JOIN Teaching t ON c.CourseID = t.CourseID GROUP BY c.CourseID, c.CourseName HAVING COUNT(*) > 1;',
        '-- מטבלת הגישור בלבד: מזהה הקורס במקום שמו\nSELECT CourseID, COUNT(*) AS NumLecturers FROM Teaching GROUP BY CourseID HAVING COUNT(*) > 1;',
        '-- בלי GROUP BY: חיבור עצמי של Teaching — שני מרצים שונים באותו קורס\nSELECT DISTINCT c.CourseName FROM Teaching t1 JOIN Teaching t2 ON t1.CourseID = t2.CourseID AND t1.LecturerID <> t2.LecturerID JOIN Courses c ON c.CourseID = t1.CourseID;'
      ],
      tsql: 'SELECT c.CourseName, COUNT(t.LecturerID) AS NumLecturers\nFROM Courses c\nJOIN Teaching t ON c.CourseID = t.CourseID\nGROUP BY c.CourseID, c.CourseName\nHAVING COUNT(t.LecturerID) > 1;'
    },

    9: {
      pattern: 'INNER JOIN פשוט לאורך FK (סטודנט → מחלקה)',
      columns: 'שם הסטודנט (FullName), שם המחלקה (DepartmentName)',
      explain: [
        '1. שם סטודנט — Students; שם מחלקה — Departments. החיבור: Students.DepartmentID (FK) = Departments.DepartmentID (PK). אותה תבנית כמו שאלה 2 (מחלקה → שלוחה), צעד אחד למטה בהיררכיה.',
        '2. כל סטודנט שייך למחלקה אחת (1:N), ולכן מתקבלת שורה אחת לכל סטודנט.',
        '3. הפתרון: SELECT s.FullName, d.DepartmentName FROM Students s JOIN Departments d ON s.DepartmentID = d.DepartmentID;',
        '4. אילו נשאל "כולל סטודנטים שלא שויכו למחלקה" → LEFT JOIN עם Students משמאל.',
        'שימו לב לשמות זהים בין טבלאות: FullName קיים ב-Students וב-Lecturers, DepartmentID בארבע טבלאות — תמיד קידומת (s., d.).',
        'הרחבה טבעית: "סטודנטים עם המחלקה והשלוחה" → JOIN נוסף: JOIN Branches b ON d.BranchID = b.BranchID.'
      ].join('\n'),
      mistakes: [
        'להציג DepartmentID במקום שם המחלקה (בלי JOIN).',
        'מכפלה קרטזית — FROM Students, Departments בלי תנאי.',
        'תנאי JOIN על המפתחות הראשיים (s.StudentID = d.DepartmentID).',
        'עמודה בלי קידומת שקיימת בשתי הטבלאות (DepartmentID) — Ambiguous column name.'
      ],
      wrong: [
        { sql:'SELECT FullName, DepartmentID FROM Students;', why:'מוצג מספר המחלקה, לא שמה.' },
        { sql:'SELECT s.FullName, d.DepartmentName FROM Students s, Departments d;', why:'אין תנאי חיבור → 12 × 4 = 48 שורות: כל סטודנט עם כל מחלקה.' },
        { sql:'SELECT s.FullName, d.DepartmentName FROM Students s JOIN Departments d ON s.StudentID = d.DepartmentID;', why:'PK מול PK: סטודנט 1 "במחלקה 1", סטודנט 2 "במחלקה 2"… — שיוך שגוי, ורוב הסטודנטים נעלמים.' },
        { sql:'SELECT s.FullName, d.DepartmentName FROM Departments d LEFT JOIN Students s ON s.DepartmentID = d.DepartmentID;',
          why:'LEFT JOIN מהצד של Departments שלא התבקש: נוספת שורה (NULL, מנהל עסקים) למחלקה בלי סטודנטים. LEFT JOIN רק כשהשאלה אומרת "כולל" — וכאן היא לא.' }
      ],
      alt: [
        'SELECT s.FullName, d.DepartmentName FROM Students s, Departments d WHERE s.DepartmentID = d.DepartmentID;',
        'SELECT s.FullName, d.DepartmentName FROM Students s LEFT JOIN Departments d ON s.DepartmentID = d.DepartmentID;',
        'SELECT s.FullName, (SELECT d.DepartmentName FROM Departments d WHERE d.DepartmentID = s.DepartmentID) AS DepartmentName FROM Students s;'
      ],
      accept: [],
      tsql: 'SELECT s.FullName, d.DepartmentName\nFROM Students s\nJOIN Departments d ON s.DepartmentID = d.DepartmentID;'
    },

    10: {
      pattern: 'JOIN לאורך FK — וניסוח עם שתי פרשנויות (שיוך מחלקתי מול הוראה בפועל)',
      columns: 'שם המרצה (FullName), שם המחלקה (DepartmentName)',
      explain: [
        '1. הפרשנות הרשמית: "המחלקות שבהן הם מלמדים" = המחלקה שהמרצה משויך אליה — העמודה Lecturers.DepartmentID (FK). JOIN אחד, בדיוק כמו שאלה 9 אבל עם מרצים: SELECT l.FullName, d.DepartmentName FROM Lecturers l JOIN Departments d ON l.DepartmentID = d.DepartmentID;',
        '2. פרשנות שנייה, לגיטימית (הרבים "המחלקות" ו"מלמדים" רומזים אליה): המחלקות של הקורסים שהמרצה מלמד בפועל — Lecturers → Teaching → Courses → Departments (דרך Courses.DepartmentID). כאן חובה DISTINCT, כי מרצה שמלמד שני קורסים באותה מחלקה יופיע פעמיים.',
        '3. בנתוני האתר ההבדל נראה לעין: רות אברהם משויכת לדיקאנט, אבל מלמדת סטטיסטיקה של מחלקת בחינות; ומיכל שרון לא מלמדת אף קורס — ולכן נעלמת בפרשנות השנייה.',
        '4. המלצה למבחן: כתבו את הפתרון הפשוט (1), והוסיפו שורת הערה (-- אם הכוונה למחלקות של הקורסים שהוא מלמד: …) עם הגרסה דרך Teaching. במבחן עם חומר פתוח הבוחן מעריך שזיהיתם את העמימות.',
        'הלקח הכללי: לפני שכותבים — "איזו עמודה מחזיקה את הקשר שהשאלה מתארת?". ב-ERD יש כאן שני מסלולים בין מרצה למחלקה (שיוך ישיר, והוראה דרך קורסים), ובסיפור המלא יש גם שלישי — ראש מחלקה.'
      ].join('\n'),
      mistakes: [
        'PK מול PK (l.LecturerID = d.DepartmentID).',
        'בפרשנות דרך Teaching — לשכוח DISTINCT ולקבל שורות כפולות.',
        'מכפלה קרטזית — FROM Lecturers, Departments בלי תנאי.',
        'לחבר מרצים לקורסים דרך DepartmentID (l.DepartmentID = c.DepartmentID) — זה "באותה מחלקה", לא "מלמד".'
      ],
      wrong: [
        { sql:'SELECT l.FullName, d.DepartmentName FROM Lecturers l JOIN Departments d ON l.LecturerID = d.DepartmentID;',
          why:'PK מול PK: יעל לוי "שייכת" לבחינות במקום למערכות מידע, ומיכל שרון (מרצה 5) נעלמת.' },
        { sql:'SELECT l.FullName, d.DepartmentName FROM Lecturers l JOIN Teaching t ON t.LecturerID = l.LecturerID JOIN Courses c ON c.CourseID = t.CourseID JOIN Departments d ON d.DepartmentID = c.DepartmentID;',
          why:'הפרשנות דרך ההוראה בלי DISTINCT — אפי פרופוס ויעל לוי מופיעים פעמיים עם "מערכות מידע" (שורה לכל קורס). גם עם DISTINCT זו הפרשנות השנייה (ראו פרשנות חלופית), לא הפתרון הרשמי.' },
        { sql:'SELECT l.FullName, d.DepartmentName FROM Lecturers l, Departments d;',
          why:'אין תנאי חיבור → 5 × 4 = 20 שורות.' }
      ],
      alt: [
        'SELECT l.FullName, d.DepartmentName FROM Lecturers l, Departments d WHERE l.DepartmentID = d.DepartmentID;',
        'SELECT l.FullName, d.DepartmentName FROM Departments d INNER JOIN Lecturers l ON d.DepartmentID = l.DepartmentID;',
        'SELECT l.FullName, (SELECT d.DepartmentName FROM Departments d WHERE d.DepartmentID = l.DepartmentID) FROM Lecturers l;'
      ],
      accept: [
        '-- פרשנות: המחלקות של הקורסים שהמרצה מלמד בפועל (דרך Teaching); DISTINCT נגד כפילויות\nSELECT DISTINCT l.FullName, d.DepartmentName FROM Lecturers l JOIN Teaching t ON t.LecturerID = l.LecturerID JOIN Courses c ON c.CourseID = t.CourseID JOIN Departments d ON d.DepartmentID = c.DepartmentID;'
      ],
      tsql: 'SELECT l.FullName, d.DepartmentName\nFROM Lecturers l\nJOIN Departments d ON l.DepartmentID = d.DepartmentID;'
    }
  },

  /* ---------------- אסטרטגיה למבחן ---------------- */
  tips: [
    'קראו קודם את שאלה 3: רשימת 7 הטבלאות שם היא כמעט הפתרון של שאלה 1 — ישויות, מפתחות, FK וטבלאות גישור. חסר בה רק "ראש מחלקה", שאותו מוסיפים ב-ERD כקשר 1:1 בין מחלקה למרצה.',
    'חלקו את הזמן לפי הניקוד: 45% לשאלה 1, 10% לשאלה 2, 45% לשאלה 3. משך הבחינה לא צוין בדף — כשתדעו אותו, חשבו מראש כמה דקות לכל שאלה ואל תחרגו.',
    'ERD על דף משבצות: מלבן לכל ישות עם שם באנגלית ברבים (כמו בשאלה 3), תכונות בתוכו או באליפסות, PK בקו תחתון. כל קו קשר — עם פועל וקרדינליות בשני הקצוות (1 / N / M). מקרא קטן בפינה, ומתחת "הנחות" (למשל: מרצה עומד בראש מחלקה אחת לכל היותר).',
    'מתחת לתרשים כתבו גם את הסכמה הטקסטואלית בסימון של המרצה — Departments (DepartmentID, DepartmentName, BranchID (Branches), HeadLecturerID (Lecturers)). זה מוכיח שאתם יודעים לממש את הקשרים ומגן עליכם אם הציור לא ברור.',
    'שאלה 2: "מחלקת סטודנט" = הישות (class) Student, לא מחלקה אקדמית. שורה לכל תכונה: StudentID, FullName, IDNumber, Address, DepartmentID. Type = תפקיד (PK / FK / מפתח חלופי / רגילה); Data Type = טיפוס SQL Server (INT, NVARCHAR(100), CHAR(9)). ת"ז — CHAR(9), לא INT.',
    'כתיבת SQL על נייר: מילות מפתח באותיות גדולות, כל פסוקית בשורה משלה (SELECT / FROM / JOIN … ON / WHERE / GROUP BY / HAVING / ORDER BY), כינויים קצרים (s, d, c, l, t, e) ו-; בסוף. שמות טבלאות ועמודות — בדיוק כמו ברשימה.',
    'לפני כל שאילתה, חמש שאלות: (1) אילו עמודות בפלט? (2) באילו טבלאות הן? (3) מה מחבר ביניהן — FK = PK, וב-M:N דרך טבלת הגישור? (4) תנאי על שורות → WHERE, על קבוצות → HAVING. (5) "כולל / גם בלי" → LEFT JOIN מהטבלה ש"כל" השורות שלה צריכות להופיע.',
    'חוק ה-GROUP BY של SQL Server: כל עמודה ב-SELECT שאינה בתוך COUNT/SUM/AVG/MIN/MAX חייבת להיות ב-GROUP BY — כתבו GROUP BY d.DepartmentID, d.DepartmentName. המנוע באתר (SQLite) סלחני יותר, אז אל תסמכו עליו בנקודה הזו.',
    'בדקו בראש את מקרי הקצה: מחלקה בלי סטודנטים (שאלה 7 → 0, לא 1 ולא חסרה), קורס בלי מרצה (שאלה 6 → שורה עם NULL), קורס עם שני מרצים (שאלות 6 ו-8 → שתי שורות / ספירה 2). LEFT JOIN רק כשהשאלה אומרת "כולל" או "גם".',
    'ניסוח עמום (שאלה 5 מול 7, שאלה 10)? כתבו פתרון אחד ושורת הערה בעברית (-- הנחה: …) עם החלופה. במבחן עם חומר פתוח הבוחן מעריך נימוק.',
    'חומר פתוח = הכינו מראש דף אחד מסודר: 8 התבניות שמאחורי 10 השאילתות של שאלה 3 (SELECT, JOIN, JOIN דרך גישור, WHERE, GROUP BY + COUNT, LEFT JOIN בשרשרת, LEFT JOIN + COUNT(עמודה), HAVING), כללי המעבר מ-ERD לטבלאות, ושורת מילון לדוגמה. בזמן המבחן אין זמן לחפש במצגות.',
    'המבחן האמיתי צפוי להיבנות על המבנה הזה: סיפור אחר, אותן 3 שאלות ואותם דפוסי שאילתות. תרגלו את הווריאציות של כל דפוס, לא רק את התשובה הספציפית. ובבודק באתר — סדר העמודות חשוב, אז הציגו אותן בסדר שבו השאלה מבקשת.'
  ]
};
