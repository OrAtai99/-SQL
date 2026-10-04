/* ============================================================
   קורס 3964 — שפת SQL (מר אפי פרופוס) — בוחן אמריקאי: חלק SQL
   ------------------------------------------------------------
   חוזה: SQLC.quiz = [ {topic, q, options:[4-5], correct:<index>, explain} ]
   • נושאים: model ddl dml select join group case nested advanced erd mssql
   • nosql-questions.js משרשר אחרי הקובץ הזה (לכן כאן מבצעים השמה עם =)
   • שאלות "קריאת קוד" חושבו בפועל על הנתונים (practice / space / college2)
     בעזרת המנוע של הפורטל; ההתנהגות שמתוארת היא של SQL Server (T-SQL).
     הבדלים מ-SQLite שבדפדפן (AVG של INT, GROUP BY חסר, תת-שאילתה עם =)
     מוסברים בגוף ההסבר.
   • ההסברים לא מפנים ל"אפשרות ג'" וכדומה — סדר התשובות עשוי להתערבב.
   ============================================================ */
window.SQLC = window.SQLC || {};

SQLC.quiz = [

  /* ======================= model — המודל הרלציוני ======================= */
  { topic:'model',
    q:`ברלציה R(a, b, c, d, e) ידוע ש-{a, b, c} הוא מפתח-על (Superkey). איזו קבוצה היא בוודאות גם מפתח-על?`,
    options:['{a, b, c, e}', '{a, b}', '{a, b, d, e}', '{c, d, e}'], correct:0,
    explain:`כל הרחבה של מפתח-על היא גם מפתח-על: אם {a, b, c} כבר מזהה כל רשומה באופן ייחודי, הוספת תכונה (e) לא יכולה לפגוע בייחודיות. לעומת זאת, {a, b} הוא תת-קבוצה, והסרת c עלולה לשבור את הייחודיות. {a, b, d, e} ו-{c, d, e} לא מכילות את כל {a, b, c}, ועליהן אין לנו מידע. זו בדיוק הדוגמה ממצגת 2: {a,b,c,d}, {a,b,c,e}, {a,b,c,d,e}.` },

  { topic:'model',
    q:`מהו "מפתח" (Key) לפי ההגדרה במודל הרלציוני?`,
    options:[
      'כל קבוצת תכונות שערכיה ייחודיים בנתונים הקיימים',
      'מפתח-על מינימלי – הסרת תכונה כלשהי תבטל את הייחודיות',
      'המפתח שהמתכנן בחר מבין כל המפתחות המועמדים',
      'תכונה שמפנה אל המפתח הראשי של טבלה אחרת'],
    correct:1,
    explain:`Key = Superkey מינימלי: אי אפשר להוריד ממנו אף תכונה בלי לאבד ייחודיות. "המפתח שנבחר מבין המועמדים" הוא המפתח הראשי (PK), "תכונה שמפנה לטבלה אחרת" היא מפתח זר (FK), וייחודיות בנתונים של היום בלבד אינה מספיקה – מפתח חייב להיות ייחודי בכל מצב חוקי של הטבלה.` },

  { topic:'model',
    q:`בטבלת PRODUCTS ממצגת 2, העמודה Price ייחודית בכל 7 השורות הקיימות כרגע. האם {Price} הוא מפתח?`,
    options:[
      'לא – מפתח חייב להישאר ייחודי גם בשורות עתידיות',
      'כן – כרגע אין שני מוצרים עם אותו מחיר',
      'כן – כל עמודה מספרית שאין בה כפילויות היא מפתח',
      'לא – מפתח חייב להיות מורכב מיותר מעמודה אחת'],
    correct:0,
    explain:`מפתח נקבע לפי כל המצבים החוקיים של הרלציה, לא לפי הנתונים של היום. בתרגיל במצגת 2 התשובה עבור {Price} היא Y "לפי השורות הקיימות" אבל N "בהנחה שיתווספו שורות" – שני מוצרים יכולים בהחלט לעלות אותו מחיר. מפתח יכול להיות בן עמודה אחת – למשל {Prod-ID}.` },

  { topic:'model',
    q:`בטבלת CAR המפתח הראשי הוא License_number, אבל גם Engine_serial_number ייחודי לכל רכב ומינימלי. איך נקרא Engine_serial_number?`,
    options:['מפתח זר (Foreign Key)', 'מפתח-על בלבד (Superkey), לא מפתח', 'מפתח חלופי (Alternate Key)', 'תכונה רגילה, לא מפתח'],
    correct:2,
    explain:`שתי העמודות הן מפתחות מועמדים (Candidate Keys). אחד מהם נבחר להיות המפתח הראשי, והמועמדים שלא נבחרו נקראים מפתחות חלופיים (Alternate Keys). ב-SQL מגדירים מפתח חלופי עם UNIQUE. זה לא FK, כי הוא לא מפנה לטבלה אחרת.` },

  { topic:'model',
    q:`בטבלה LECTURER(Lecturer-ID, Lecturer-Name, Faculty-ID(FACULTY)) מנסים להכניס את הרשומה (NULL, 'Yoram Shomroni', 'SCI'). איזה אילוץ מופר?`,
    options:['אילוץ שלמות ישות (Entity Integrity)', 'אילוץ מפתח (Key constraint)', 'אילוץ מרחב ערכים (Domain)', 'אילוץ שלמות הפניה (Referential Integrity)'],
    correct:0,
    explain:`מפתח ראשי לעולם אינו יכול להיות NULL – זו הגדרת שלמות הישות (סעיף a בתרגיל של מצגת 2). אילוץ מפתח מופר כשמכניסים ערך PK שכבר קיים (סעיף b: 393), Domain – כשהערך אינו מהתחום (סעיף c: שם = 789), ו-Referential – כש-FK מצביע על ערך שלא קיים (סעיף d: HUM).` },

  { topic:'model',
    q:`ב-LECTURER כבר קיים מרצה בשם Yariv Barak. מכניסים את הרשומה (589, 'Yariv Barak', NULL), כש-589 הוא מזהה חדש. איזה אילוץ מופר?`,
    options:[
      'אילוץ מפתח – השם כבר קיים בטבלה',
      'שלמות הפניה – Faculty-ID ריק',
      'שלמות ישות – יש ערך NULL ברשומה',
      'אף אילוץ אינו מופר'],
    correct:3,
    explain:`ה-PK הוא Lecturer-ID, ו-589 חדש וייחודי, ולכן שם כפול אינו בעיה. מפתח זר מותר להיות NULL (כל עוד הוא לא חלק מה-PK ולא הוגדר NOT NULL). NULL פשוט אומר "לא משויך לפקולטה". שלמות ישות נוגעת רק ל-NULL במפתח הראשי. זו תשובה (e) בשקף: No Violation.` },

  { topic:'model',
    q:`איזו פעולה יכולה להפר רק את אילוץ שלמות ההפניה (Referential Integrity), ולא אף אחד משלושת האילוצים האחרים?`,
    options:['INSERT', 'UPDATE', 'גם INSERT וגם UPDATE', 'DELETE'],
    correct:3,
    explain:`מחיקה לא מכניסה ערכים חדשים, ולכן אינה יכולה ליצור כפילות מפתח, NULL במפתח או ערך מחוץ לתחום. היא כן יכולה להשאיר רשומות "יתומות": אם מוחקים את הפקולטה SCI, מרצה 432 עדיין מצביע עליה. INSERT ו-UPDATE יכולים להפר את כל ארבעת האילוצים.` },

  { topic:'model',
    q:`ב-SERVICE_CALLS(Customer-ID(CUSTOMERS), Date-Time, ...) המפתח הראשי הוא Customer-ID + Date-Time. איזו דרך טיפול אינה אפשרית כשמוחקים לקוח שיש לו קריאות שירות?`,
    options:[
      'RESTRICT – לחסום את המחיקה',
      'SET NULL – לאפס את Customer-ID',
      'CASCADE – למחוק גם את הקריאות',
      'Trigger שמבצע תיקון אוטומטי'],
    correct:1,
    explain:`כשהמפתח הזר הוא חלק מהמפתח הראשי הוא לא יכול להיות NULL (שלמות ישות), ולכן SET NULL לא אפשרי. מצגת 2 מדגישה את זה במפורש. חסימה (RESTRICT/REJECT), מחיקה מדורגת (CASCADE) או טריגר/פרוצדורה – כולן אפשריות.` },

  { topic:'model',
    q:`מה ההבדל בין "סכמה" (Schema) ל"מצב" (State) של רלציה?`,
    options:[
      'סכמה = שם הטבלה ותכונותיה; מצב = הרשומות שבה ברגע נתון',
      'סכמה = הרשומות שבטבלה; מצב = ההגדרה של העמודות שלה',
      'סכמה = אוסף כל הטבלאות; מצב = רשימת המפתחות הזרים',
      'אין הבדל – אלה שני שמות לאותו מושג במודל הרלציוני'],
    correct:0,
    explain:`R(A1..An) היא הסכמה: שם הרלציה והתכונות שלה (Table definition). המצב (State) הוא קבוצת הרשומות שהרלציה מחזיקה בנקודת זמן מסוימת (Populated table), והוא משתנה עם כל INSERT, UPDATE או DELETE. מצב בסיס הנתונים הוא איחוד המצבים של כל הרלציות.` },

  /* ======================= ddl — הגדרת מבנה ======================= */
  { topic:'ddl',
    q:`לאיזה רכיב של שפת SQL שייכות הפקודות GRANT ו-REVOKE?`,
    options:['DDL', 'DML', 'DCL', 'TCL'], correct:2,
    explain:`DCL (Data Control Language) מטפל בהרשאות ובגישה: Grant ו-Revoke. DDL מגדיר מבנה (CREATE/ALTER/DROP), DML עובד עם נתונים (SELECT/INSERT/UPDATE/DELETE), ו-TCL מנהל טרנזקציות (COMMIT/ROLLBACK). בשקף במצגת 3 נכתב בטעות "Commit, Revoke" תחת TCL – הנכון הוא Commit ו-Rollback.` },

  { topic:'ddl',
    q:`איזו הגדרה של מפתח ראשי מורכב לטבלה Aliens_in_trips(t_no, id_no) תקינה ב-SQL Server?`,
    options:[
      'PRIMARY KEY (t_no, id_no)',
      't_no INT PRIMARY KEY, id_no INT PRIMARY KEY',
      'PRIMARY KEY t_no + id_no',
      'PRIMARY KEY (t_no) AND (id_no)'],
    correct:0,
    explain:`מפתח מורכב מגדירים כסעיף נפרד בסוף ה-CREATE TABLE: PRIMARY KEY (t_no, id_no). זו "הדרך השנייה" להגדרת PK ממצגת 3. כתיבת PRIMARY KEY ליד כל אחת משתי העמודות היא ניסיון להגדיר שני מפתחות ראשיים, וזו שגיאה כי לטבלה יש PK אחד בלבד. שתי הצורות האחרות אינן תחביר חוקי.` },

  { topic:'ddl',
    q:`מה מבטיח האילוץ CONSTRAINT check_zip CHECK (ZipCode LIKE '[0-9][0-9][0-9][0-9][0-9]')?`,
    options:['שהמיקוד יכיל בדיוק 5 ספרות', 'שהמיקוד יכיל לפחות ספרה אחת', 'שהמיקוד יהיה מספר בין 0 ל-9', 'שהמיקוד יתחיל ב-0 ויסתיים ב-9'],
    correct:0,
    explain:`ב-T-SQL, הביטוי [0-9] בתבנית LIKE מייצג תו בודד שהוא ספרה. חמישה כאלה ברצף, בלי %, פירושם מחרוזת של בדיוק 5 ספרות (check_zip ממצגת 3). התבנית '%[0-9]%' הייתה אומרת "לפחות ספרה אחת".` },

  { topic:'ddl',
    q:`העמודה Gender מוגדרת CHAR(1) NULL עם CONSTRAINT check_gender CHECK (Gender IN ('M','F')). מה יקרה ב-INSERT שבו Gender = NULL?`,
    options:[
      'השורה תיכנס – CHECK דוחה רק תנאי שהוא FALSE',
      'שגיאה – NULL אינו M או F, ולכן ה-CHECK נכשל',
      "השורה תיכנס, ו-Gender יקבל אוטומטית 'M'",
      'שגיאה – אסור CHECK על עמודה שמאפשרת NULL'],
    correct:0,
    explain:`אילוץ CHECK דוחה שורה רק כשהתנאי מחזיר FALSE. NULL IN ('M','F') מחזיר UNKNOWN, ולכן השורה מתקבלת. כדי לחסום NULL צריך להוסיף NOT NULL לעמודה. ערך ברירת מחדל לא נקבע מעצמו – רק אם הוגדר DEFAULT.` },

  { topic:'ddl',
    q:`איזו טענה נכונה לגבי UNIQUE לעומת PRIMARY KEY ב-SQL Server?`,
    options:[
      'UNIQUE אוסר NULL לחלוטין, בדיוק כמו PRIMARY KEY',
      'UNIQUE מגדיר מפתח זר שמצביע על טבלה אחרת',
      'בטבלה יכולים להיות כמה UNIQUE, אבל רק PK אחד',
      'אפשר להגדיר UNIQUE רק על עמודה אחת, לא על כמה'],
    correct:2,
    explain:`UNIQUE מגדיר מפתח חלופי (Alternate Key), כמו UNIQUE (CustomerLogin) במצגת 3. בטבלה יכולים להיות כמה אילוצים כאלה, וגם על כמה עמודות יחד: UNIQUE (a, b). בניגוד ל-PK, עמודת UNIQUE מאפשרת NULL. ב-SQL Server מותר NULL אחד בלבד, כי שני NULL נחשבים כפילות. מפתח ראשי יש רק אחד, והוא אף פעם לא NULL.` },

  { topic:'ddl',
    q:`ב-CUSTOMERS מוגדר: CONSTRAINT FK_CUSTOMER_ZIP FOREIGN KEY (ZipCode) REFERENCES ZIP_CODES (Zipcode) ON DELETE SET DEFAULT ON UPDATE CASCADE. מה יקרה כשמעדכנים מיקוד בטבלה ZIP_CODES?`,
    options:[
      'העדכון ייחסם כי יש לקוחות שמפנים למיקוד',
      'המיקוד יתעדכן אוטומטית גם אצל הלקוחות המפנים',
      'הלקוחות המפנים יקבלו את ערך ברירת המחדל',
      'הלקוחות שמפנים למיקוד יימחקו מהטבלה'],
    correct:1,
    explain:`ON UPDATE CASCADE פירושו "If a referenced value is updated also update all the referring values" (מצגת 3). SET DEFAULT מוגדר כאן רק למחיקה (ON DELETE): אם מוחקים מיקוד, הלקוחות מקבלים את ערך ברירת המחדל. חסימה היא התנהגות ברירת המחדל (NO ACTION) כשלא מגדירים פעולה.` },

  { topic:'ddl',
    q:`העמודה City מוגדרת varchar(50) DEFAULT 'Tel-Aviv' ומאפשרת NULL. מריצים INSERT INTO CUSTOMERS (CustomerID, CustomerName, City) VALUES (7, 'Dana', NULL). מה יהיה ערך City?`,
    options:[
      'NULL – ערך מפורש גובר על DEFAULT',
      "'Tel-Aviv' – זה ערך ברירת המחדל",
      'שגיאה – אסור NULL בעמודה עם DEFAULT',
      "מחרוזת ריקה ''"],
    correct:0,
    explain:`DEFAULT מופעל רק כשהעמודה לא מופיעה ברשימת העמודות של ה-INSERT (או כשכותבים את המילה DEFAULT במקום ערך). כאן ביקשנו NULL במפורש, והעמודה מאפשרת NULL, ולכן נשמר NULL. כדי לקבל Tel-Aviv צריך להשמיט את City מה-INSERT.` },

  { topic:'ddl',
    q:`איזו פקודה מוחקת את הטבלה כולה – גם את הנתונים וגם את המבנה (הסכמה) שלה?`,
    options:['DELETE FROM Customers', 'TRUNCATE TABLE Customers', 'ALTER TABLE Customers DROP *', 'DROP TABLE Customers'],
    correct:3,
    explain:`DROP TABLE מסיר את הטבלה מבסיס הנתונים לגמרי. DELETE ו-TRUNCATE מרוקנים שורות, אבל "The table schema still exists!" – הטבלה נשארת ריקה. ALTER TABLE ... DROP COLUMN מוחק עמודה מסוימת, והצורה DROP * אינה חוקית. וגם: אי אפשר להריץ CREATE על טבלה שכבר קיימת בלי DROP לפני כן.` },

  { topic:'ddl',
    q:`איזו פקודה משנה את הטיפוס של עמודה קיימת בתחביר תקין של SQL Server?`,
    options:[
      'ALTER TABLE customers ALTER customer_login char[10] NULL',
      'ALTER TABLE customers ALTER COLUMN customer_login CHAR(10) NULL',
      'ALTER TABLE customers MODIFY customer_login CHAR(10) NULL',
      'UPDATE customers SET customer_login = CHAR(10)'],
    correct:1,
    explain:`ב-T-SQL הצורה היא ALTER TABLE <table> ALTER COLUMN <col> <type> NULL/NOT NULL. בשקף 22 מופיע ALTER customer_login char[10], בלי המילה COLUMN ועם סוגריים מרובעים, וזה לא ירוץ ב-SQL Server. MODIFY הוא תחביר של MySQL ו-Oracle, ו-UPDATE משנה נתונים ולא מבנה.` },

  { topic:'ddl',
    q:`מה ההבדל בין CHAR(10) ל-VARCHAR(10)?`,
    options:[
      'CHAR שומר תו אחד בלבד; VARCHAR שומר עד 10 תווים',
      'CHAR באורך קבוע ומרופד ברווחים; VARCHAR באורך משתנה',
      'CHAR מיועד למספרים; VARCHAR מיועד לטקסט בלבד',
      'אין הבדל בשמירה – רק VARCHAR מאפשר NULL'],
    correct:1,
    explain:`CHAR(n) הוא מחרוזת באורך קבוע שמושלמת ברווחים (Fixed-length, space-padded). VARCHAR(n) הוא באורך משתנה, עד n תווים. לכן CHAR מתאים לערכים באורך ידוע, כמו מיקוד CHAR(5) או מגדר CHAR(1). שני הטיפוסים מאפשרים NULL אם לא הוגדר NOT NULL.` },

  { topic:'ddl',
    q:`העמודה grade בטבלת submissions מוגדרת DECIMAL(5,2). מהו הערך הגדול ביותר שאפשר לשמור בה?`,
    options:['99999.99', '99.999', '999.99', '5.2'], correct:2,
    explain:`DECIMAL(p,s): p הוא מספר הספרות הכולל, ו-s הוא כמה מהן אחרי הנקודה. 5 ספרות, מתוכן 2 אחרי הנקודה, משאירות 3 לפניה, ולכן המקסימום הוא 999.99. ציון 100.00 נכנס בלי בעיה.` },

  { topic:'ddl',
    q:`איזו הגדרת עמודה עם מפתח זר תקינה בתוך CREATE TABLE courses ב-SQL Server?`,
    options:[
      'lecturerId INT REFERENCES lecturers(id)',
      'lecturerId INT FOREIGN KEY lecturers.id',
      'lecturerId INT REFERENCES (lecturers, id)',
      'lecturerId INT LINK TO lecturers ON id'],
    correct:0,
    explain:`זו בדיוק הצורה מעבודת ישור קו: lecturerId INT REFERENCES lecturers(id). המילים FOREIGN KEY בהגדרה בתוך העמודה הן אופציונליות; במצגת 3 מופיע CustomerID int NULL FOREIGN KEY REFERENCES CUSTOMERS (CustomerID). שאר הצורות אינן תחביר SQL.` },

  /* ======================= dml — שינוי נתונים ======================= */
  { topic:'dml',
    q:`הטבלה מוגדרת Courses(course_id INT, course_name VARCHAR(50), price INT). מה יקרה בהרצת INSERT INTO Courses VALUES ('Excel', 105, 900)?`,
    options:[
      'השורה תיכנס – SQL Server ישבץ כל ערך לעמודה המתאימה לטיפוס שלו',
      "שגיאה – הערכים משובצים לפי סדר העמודות, ו-'Excel' אינו INT",
      'השורה תיכנס עם course_id = NULL כי הערך הראשון טקסט',
      'השורה תיכנס, אבל course_name יקבל את הערך 105'],
    correct:1,
    explain:`ב-INSERT בלי רשימת עמודות, "the list of values must correspond exactly to the order in which the columns exist in the table" (מצגת 3). הערך הראשון 'Excel' הולך ל-course_id שהוא INT. ההמרה נכשלת ומתקבלת שגיאה. כדי לכתוב בסדר אחר מציינים רשימת עמודות: INSERT INTO Courses (course_name, course_id, price) VALUES (...).` },

  { topic:'dml',
    q:`מריצים INSERT INTO CUSTOMERS (CustomerID, Gender, CustomerName) VALUES (3212, 'M', 'Joe Smith'). מה יקבלו שאר העמודות בטבלה (City, ZipCode)?`,
    options:[
      'תמיד 0 או מחרוזת ריקה, לפי סוג העמודה',
      'את הערך מהשורה האחרונה שהוכנסה לטבלה',
      'השאילתה תיכשל – חייבים את כל העמודות',
      'NULL, או ערך ה-DEFAULT אם הוגדר לעמודה'],
    correct:3,
    explain:`עם רשימת עמודות אפשר לתת רשימה חלקית ובכל סדר. עמודות שלא צוינו "are filled-in with a NULL, or a default value" (מצגת 3). שגיאה תתקבל רק אם עמודה שלא צוינה מוגדרת NOT NULL ואין לה DEFAULT.` },

  { topic:'dml',
    q:`מחירי הקורסים בחוברת: 1200, 1500, 1800, 1300. מריצים UPDATE Courses SET price = price * 1.1 WHERE price > 1300. כמה שורות יתעדכנו?`,
    options:['2', '1', '3', '4'], correct:0,
    explain:`התנאי price > 1300 מתקיים רק עבור 1500 (Java) ו-1800 (Python). 1300 אינו גדול מ-1300. בלי WHERE היו מתעדכנות כל 4 השורות – "A root for disasters!" כלשון המצגת.` },

  { topic:'dml',
    q:`איזו פקודה מעדכנת שתי עמודות באותה פקודה בצורה תקינה?`,
    options:[
      "UPDATE CUSTOMERS SET Status = 'Active' AND TicketsSoFar = 0",
      "UPDATE CUSTOMERS SET Status = 'Active' SET TicketsSoFar = 0",
      "UPDATE CUSTOMERS SET Status = 'Active', TicketsSoFar = 0",
      "UPDATE CUSTOMERS SET (Status, TicketsSoFar) = ('Active', 0)"],
    correct:2,
    explain:`ב-SET מפרידים בין ההשמות בפסיק: SET a = x, b = y (מצגת 3). AND שייך לתנאים ב-WHERE, וב-SET הוא שגיאת תחביר. אין SET כפול, ותחביר של זוג ערכים (a, b) = (x, y) לא נתמך ב-SQL Server. בלי WHERE, העדכון יחול על כל הלקוחות.` },

  { topic:'dml',
    q:`על נתוני החוברת (ציונים: 95, 82, 76, 91, 68, 88, 94, 55) מריצים:
DELETE FROM Enrollments WHERE grade < 70;
SELECT COUNT(*) FROM Enrollments;
מה התוצאה?`,
    options:['2', '0', '8', '6'], correct:3,
    explain:`נמחקות רק שתי השורות עם ציון מתחת ל-70: 68 של Ron ו-55 של Tom. נשארות 6. הטבלה עצמה ממשיכה להתקיים, כי DELETE מוחק שורות ולא את הסכמה.` },

  { topic:'dml',
    q:`ב-college2 מוגדר enrollments.courseId INT REFERENCES courses(id), בלי ON DELETE. מה יקרה ב-SQL Server בהרצת DELETE FROM courses WHERE id = 1 (קורס MongoDB, שיש לו 5 הרשמות)?`,
    options:[
      'הקורס יימחק וגם 5 ההרשמות שלו יימחקו',
      'הקורס יימחק, וב-courseId של ההרשמות יופיע NULL',
      'הפקודה תיכשל בגלל התנגשות עם אילוץ ה-FK',
      'הקורס יימחק וההרשמות יישארו מצביעות על 1'],
    correct:2,
    explain:`ברירת המחדל ב-SQL Server היא NO ACTION, כלומר RESTRICT: אי אפשר למחוק רשומה שרשומות אחרות מפנות אליה, ומתקבלת שגיאת REFERENCE constraint. מחיקה מדורגת קורית רק עם ON DELETE CASCADE, ו-NULL רק עם ON DELETE SET NULL. הפניה "יתומה" היא בדיוק מה שאילוץ שלמות ההפניה מונע.` },

  { topic:'dml',
    q:`מה נכון לגבי TRUNCATE TABLE לעומת DELETE ב-SQL Server?`,
    options:[
      'TRUNCATE מוחק גם את מבנה הטבלה, כמו DROP',
      'TRUNCATE מרוקן את כל השורות ואינו מקבל WHERE',
      'TRUNCATE מאפשר תנאי WHERE ממש כמו DELETE',
      'TRUNCATE מוחק רק שורות שיש בהן ערכי NULL'],
    correct:1,
    explain:`TRUNCATE TABLE מרוקן את הטבלה כולה במהירות, והמבנה נשאר, אבל אי אפשר לסנן עם WHERE. DELETE FROM יכול למחוק הכל או רק שורות שעונות על תנאי. DROP TABLE הוא זה שמוחק גם את הסכמה. בנוסף, אי אפשר להריץ TRUNCATE על טבלה שמפתח זר מפנה אליה.` },

  /* ======================= select — שליפה וסינון ======================= */
  { topic:'select',
    q:`בחוברת: Dan (Tel Aviv, 22), Maya (Haifa, 25), Ron (Jerusalem, 19), Noa (Tel Aviv, 28), Tom (Beer Sheva, 21), Dana (Haifa, 24). השאילתה SELECT DISTINCT city FROM Students מחזירה 4 שורות. כמה שורות תחזיר SELECT DISTINCT city, age FROM Students?`,
    options:['4', '2', '6', '10'], correct:2,
    explain:`DISTINCT פועל על השורה כולה, לא על העמודה הראשונה בלבד. שתי שורות נחשבות כפולות רק אם כל הערכים בהן זהים. כאן לכל זוג (עיר, גיל) יש ערך אחר, ולכן מוחזרות כל 6 השורות. DISTINCT city לבדו מסיר את הכפילויות של Tel Aviv ושל Haifa ומשאיר 4.` },

  { topic:'select',
    q:`בטבלה Customers (CustID, Age, Active, Group) יש 3 שורות: (1, 16, 1, A), (2, 18, 1, B), (3, 20, 0, B). אילו לקוחות יחזיר התנאי
WHERE (Age > 18) AND ((Active = 1) OR (Group = 'B'))?`,
    options:['רק 3', '2 ו-3', '1, 2 ו-3', 'אף לקוח'], correct:0,
    explain:`הסוגריים קובעים: קודם Age > 18, ורק לקוח 3 (בן 20) עובר. אחר כך (Active = 1 OR Group = B): לקוח 3 שייך ל-B, אז התנאי מתקיים. התוצאה: 3 בלבד. בשקף 38 משווים את זה ל-((Age > 18) AND (Active = 1)) OR (Group = B), שמחזיר את 2 ו-3. הסוגריים משנים את התוצאה.` },

  { topic:'select',
    q:`בתל אביב גרים 3 סטודנטים (גילאים 23, 22, 27) ובחיפה 2 (גילאים 21, 20). מה תחזיר:
SELECT COUNT(*) FROM students
WHERE city = 'Tel Aviv' OR city = 'Haifa' AND age > 22`,
    options:['0', '2', '5', '3'], correct:3,
    explain:`AND מחושב לפני OR, ולכן התנאי מתפרש כך: city = 'Tel Aviv' OR (city = 'Haifa' AND age > 22). כל 3 תושבי תל אביב עוברים בלי בדיקת גיל, ואף אחד מחיפה אינו מעל 22, כך שהתוצאה 3. מי שהתכוון ל"תל אביב או חיפה, ובגיל מעל 22" צריך סוגריים: (city = 'Tel Aviv' OR city = 'Haifa') AND age > 22. אז התוצאה 2 (גילאים 23 ו-27).` },

  { topic:'select',
    q:`בטבלת submissions יש 2 הגשות שעדיין לא נבדקו (grade הוא NULL). כמה שורות תחזיר SELECT * FROM submissions WHERE grade = NULL?`,
    options:['0', '2', '14', '16'], correct:0,
    explain:`השוואה ל-NULL עם = מחזירה תמיד UNKNOWN ולא TRUE, ולכן אף שורה לא עוברת. בודקים NULL רק עם IS NULL: WHERE grade IS NULL מחזיר 2 שורות.` },

  { topic:'select',
    q:`בטבלת submissions יש 16 הגשות: באחת הציון 80, ובשתיים grade = NULL. מה תחזיר SELECT COUNT(*) FROM submissions WHERE grade <> 80?`,
    options:['15', '14', '13', '16'], correct:2,
    explain:`עבור NULL, הביטוי grade <> 80 מחזיר UNKNOWN, ולכן שתי ההגשות בלי ציון לא נספרות: 16 פחות 1 (הציון 80) פחות 2 (NULL) = 13. כדי לכלול גם אותן כותבים WHERE grade <> 80 OR grade IS NULL.` },

  { topic:'select',
    q:`מחירי הקורסים בחוברת: 1200, 1500, 1800, 1300. מה תחזיר SELECT COUNT(*) FROM Courses WHERE price BETWEEN 1200 AND 1500?`,
    options:['1', '2', '4', '3'], correct:3,
    explain:`BETWEEN כולל את שני הקצוות, כלומר price >= 1200 AND price <= 1500. לכן נספרים 1200, 1500 ו-1300, סך הכל 3. רק 1800 בחוץ.` },

  { topic:'select',
    q:`שמות הסטודנטים בחוברת: Dan, Maya, Ron, Noa, Tom, Dana. כמה שמות יחזיר התנאי WHERE name LIKE '_a%'?`,
    options:['3', '1', '2', '4'], correct:0,
    explain:`_ מייצג תו אחד בדיוק, ו-% מייצג כל רצף, גם ריק. כלומר: האות השנייה היא a. מתאימים Dan, Maya ו-Dana, סך הכל 3. Noa לא מתאים, כי ה-a שלו במקום השלישי.` },

  { topic:'select',
    q:`מה יקרה ב-SQL Server בהרצת השאילתה?
SELECT course_name, price * 0.9 AS final_price
FROM Courses
WHERE final_price > 1000`,
    options:[
      'תחזיר רק את הקורסים שמחירם אחרי ההנחה גבוה מ-1000',
      'שגיאה – הכינוי מה-SELECT לא מוכר בשלב ה-WHERE',
      'תחזיר את כל הקורסים ותתעלם מהתנאי שב-WHERE',
      'תחזיר את הקורסים שמחירם המקורי מעל 1000'],
    correct:1,
    explain:`סדר הביצוע הלוגי הוא FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. ה-WHERE רץ לפני שה-SELECT יוצר את הכינוי final_price, ולכן מתקבלת שגיאת Invalid column name. הפתרון: לחזור על הביטוי, WHERE price * 0.9 > 1000. ב-ORDER BY דווקא מותר להשתמש בכינוי, כי הוא רץ אחרי ה-SELECT.` },

  { topic:'select',
    q:`בטבלה SALES יש עמודה בשם Sale-ID (עם מקף). איך שולפים את הערכים שלה נכון ב-SQL Server?`,
    options:['SELECT Sale-ID FROM SALES', "SELECT 'Sale-ID' FROM SALES", 'SELECT (Sale-ID) FROM SALES', 'SELECT [Sale-ID] FROM SALES'],
    correct:3,
    explain:`כששם עמודה מכיל מקף (או רווח) עוטפים אותו בסוגריים מרובעים: [Sale-ID]. במצגת 3: When attribute comprise "-" use "[]". בלי סוגריים זה מתפרש כ-Sale פחות ID. עם גרשיים בודדים מקבלים את המחרוזת הקבועה 'Sale-ID' בכל שורה, ולא את ערכי העמודה.` },

  { topic:'select',
    q:`מהו סדר הכתיבה הנכון של חלקי משפט SELECT?`,
    options:[
      'SELECT, FROM, GROUP BY, WHERE, HAVING, ORDER BY',
      'SELECT, FROM, WHERE, HAVING, GROUP BY, ORDER BY',
      'SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY',
      'SELECT, FROM, WHERE, ORDER BY, GROUP BY, HAVING'],
    correct:2,
    explain:`זה התחביר הכללי ממצגת 3. רק SELECT ו-FROM הם חובה; השאר אופציונליים, אבל אם הם מופיעים – אז בסדר הזה. WHERE מסנן שורות לפני הקיבוץ, HAVING מסנן קבוצות אחריו, ו-ORDER BY תמיד אחרון.` },

  { topic:'select',
    q:`בתרגיל 14 בחוברת נדרש למיין "קודם לפי Performance, ולאחר מכן לפי Average Grade בסדר יורד". איך ימוין הדוח עם ORDER BY Performance, [Average Grade] DESC?`,
    options:[
      'שתי העמודות יורדות – DESC חל על כל הרשימה',
      'Performance עולה, ובתוך כל ערך – ממוצע יורד',
      'רק לפי הממוצע, בסדר יורד – Performance לא משפיע',
      'שגיאה – אסור למיין לפי שתי עמודות יחד'],
    correct:1,
    explain:`כל כיוון מיון (ASC או DESC) חל רק על העמודה שכתובה מיד לפניו. ל-Performance לא כתוב כיוון, ולכן חלה ברירת המחדל ASC (סדר עולה, כלומר אלפביתי). העמודה השנייה משמשת רק לשבירת שוויון: בין שורות עם אותו Performance, הממוצע הגבוה יופיע ראשון. כדי ששתיהן יהיו בסדר יורד צריך לכתוב DESC אחרי כל אחת מהן. ה-[ ] נחוצים כי בשם Average Grade יש רווח.` },

  /* ======================= join — צירופים ======================= */
  { topic:'join',
    q:`תרגיל 13 בחוברת. ציוני 8 ההרשמות: 95, 82, 76, 91, 68, 88, 94, 55, ול-Dana אין הרשמה. כמה שורות תחזיר:
SELECT s.name, e.grade
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
WHERE e.grade >= 80;`,
    options:['5', '9', '8', '6'], correct:0,
    explain:`ה-LEFT JOIN מייצר 9 שורות, כולל Dana עם NULL. אחר כך רץ ה-WHERE: NULL >= 80 הוא UNKNOWN, ולכן Dana נפלטת, וגם הציונים 76, 68 ו-55. נשארות 5 שורות (95, 82, 91, 88, 94). בפועל השאילתה הפכה ל-INNER JOIN. כדי לשמור את כל הסטודנטים מעבירים את התנאי ל-ON.` },

  { topic:'join',
    q:`הציונים בחוברת: Dan 95, 82 · Maya 76, 91 · Ron 68 · Noa 88, 94 · Tom 55 · ל-Dana אין הרשמה. מה תחזיר:
SELECT s.name, e.grade
FROM Students s
LEFT JOIN Enrollments e
  ON s.student_id = e.student_id AND e.grade > 80;`,
    options:[
      '5 שורות – רק ההרשמות עם ציון מעל 80, בלי סטודנטים אחרים',
      '8 שורות – 5 ציונים מעל 80, ועוד Ron, Tom ו-Dana עם NULL',
      '9 שורות – כל 8 ההרשמות בחוברת, ועוד Dana עם NULL',
      '6 שורות – כל סטודנט פעם אחת, עם הציון הגבוה ביותר שלו'],
    correct:1,
    explain:`תנאי בתוך ON הוא חלק מתנאי ההתאמה ולא מסנן את התוצאה, ולכן כל סטודנט נשמר. Dan, Maya ו-Noa מופיעים עם הציונים שמעל 80 (5 שורות). Ron (68), Tom (55) ו-Dana (בלי הרשמה), שאין להם ציון מעל 80, מופיעים פעם אחת עם NULL. סך הכל 8. זה הרעיון של תרגיל 8 בחוברת (שם מוסיפים עוד LEFT JOIN ל-Courses כדי להציג גם את שם הקורס).` },

  { topic:'join',
    q:`רוצים להציג את כל 5 כוכבי הלכת ואת הטיולים אליהם משנת 2004 ואילך, כולל כוכבים שלא היה אליהם טיול כזה (מצגת 6). טיולים מ-2004 ואילך היו רק לשני כוכבים. מה הבעיה בשאילתה?
SELECT P.pname, T.t_no
FROM Planets P LEFT JOIN Trips T ON P.p_no = T.p_no
WHERE YEAR(T.d_date) >= 2004`,
    options:[
      'אין בעיה – היא מחזירה את כל 5 כוכבי הלכת',
      'היא נכשלת כי YEAR אינה פונקציה של SQL Server',
      'היא מחזירה 7 שורות כי LEFT JOIN מתעלם מה-WHERE',
      'מוחזרים רק 2 כוכבים; את התנאי צריך להעביר ל-ON'],
    correct:3,
    explain:`ה-WHERE מסנן אחרי ה-JOIN. לכוכב בלי טיול מ-2004 יש d_date = NULL, ו-YEAR(NULL) >= 2004 אינו TRUE, ולכן הוא נפלט. נשארים רק Alpha Centaury (טיול 3) ו-K-PAX (טיול 4). כשהתנאי נמצא ב-ON (... AND YEAR(T.d_date) >= 2004) מקבלים 5 שורות: Naren, Pluto ו-London מופיעים עם NULL. YEAR() היא כן פונקציה של SQL Server.` },

  { topic:'join',
    q:`מה יציג COUNT(*) עבור הקורס Cyber Security, שאין בו אף הרשמה?
SELECT c.courseName, COUNT(*) AS n
FROM courses c
LEFT JOIN enrollments e ON c.id = e.courseId
GROUP BY c.id, c.courseName`,
    options:['1', '0', 'NULL', 'הקורס לא יופיע'], correct:0,
    explain:`LEFT JOIN משאיר את Cyber Security בשורה אחת שבה כל העמודות של enrollments הן NULL. COUNT(*) סופר שורות, ולכן יחזיר 1 – וזו טעות. COUNT(e.id) (או COUNT(e.courseId)) סופר רק ערכים שאינם NULL ומחזיר 0. זו הספירה הנכונה ל"מספר הרשמות לכל קורס, כולל קורסים בלי הרשמות".` },

  { topic:'join',
    q:`איזו שאילתה מחזירה את הסטודנטים שאין להם אף הרשמה (במערכת המכללה זה Lior)?`,
    options:[
      'SELECT s.firstName FROM students s INNER JOIN enrollments e ON s.id = e.studentId WHERE e.studentId IS NULL',
      'SELECT s.firstName FROM students s LEFT JOIN enrollments e ON s.id = e.studentId WHERE e.studentId IS NULL',
      'SELECT s.firstName FROM students s LEFT JOIN enrollments e ON s.id = e.studentId WHERE e.studentId = NULL',
      'SELECT s.firstName FROM students s LEFT JOIN enrollments e ON s.id = e.studentId AND e.studentId IS NULL'],
    correct:1,
    explain:`LEFT JOIN שומר את כל הסטודנטים. למי שאין הרשמה, כל העמודות של e הן NULL, ו-WHERE e.studentId IS NULL משאיר בדיוק אותם (anti-join). עם INNER JOIN אין שורות כאלה בכלל, ולכן 0 שורות. עם = NULL התנאי אף פעם לא TRUE, ולכן גם 0 שורות. כשה-IS NULL נמצא בתוך ה-ON הוא לא מסנן כלום, ומוחזרים כל 10 הסטודנטים.` },

  { topic:'join',
    q:`איזה צירוף מחזיר בדיוק אותן שורות כמו FROM Students s RIGHT JOIN Enrollments e ON s.student_id = e.student_id?`,
    options:[
      'FROM Students s LEFT JOIN Enrollments e ON s.student_id = e.student_id',
      'FROM Enrollments e RIGHT JOIN Students s ON s.student_id = e.student_id',
      'FROM Enrollments e LEFT JOIN Students s ON s.student_id = e.student_id',
      'FROM Students s FULL JOIN Enrollments e ON s.student_id = e.student_id'],
    correct:2,
    explain:`RIGHT JOIN שומר את כל השורות של הטבלה הימנית, כאן Enrollments. אם מחליפים את סדר הטבלאות, אותה טבלה עוברת לשמאל, ולכן A RIGHT JOIN B שקול ל-B LEFT JOIN A. הצירוף Enrollments RIGHT JOIN Students דווקא שומר את כל הסטודנטים – כמו Students LEFT JOIN Enrollments.` },

  { topic:'join',
    q:`במערכת המכללה 4 מרצים: Moshe, Rina ו-Avi מלמדים 2 קורסים כל אחד, ו-Dana לא מלמדת אף קורס. כמה שורות תחזיר:
SELECT l.firstName, c.courseName
FROM lecturers l LEFT JOIN courses c ON l.id = c.lecturerId`,
    options:['4', '6', '8', '7'], correct:3,
    explain:`כל מרצה מופיע פעם אחת לכל קורס שלו: 3 מרצים כפול 2 = 6 שורות. Dana מופיעה עוד פעם אחת עם courseName = NULL, כי LEFT JOIN שומר אותה. סך הכל 7. ב-INNER JOIN היו רק 6 שורות.` },

  { topic:'join',
    q:`בחוברת יש 6 סטודנטים ו-4 קורסים. כמה שורות תחזיר SELECT * FROM Students, Courses (בלי WHERE)?`,
    options:['24', '10', '6', '8'], correct:0,
    explain:`רשימת טבלאות ב-FROM בלי תנאי צירוף יוצרת מכפלה קרטזית (CROSS JOIN): כל שורה מהטבלה הראשונה עם כל שורה מהשנייה, כלומר 6 × 4 = 24. לכן בצירוף "הישן" עם פסיקים, כמו בשקפים של מצגת 6, חובה להוסיף ב-WHERE את תנאי החיבור, למשל WHERE T.p_no = P.p_no.` },

  { topic:'join',
    q:`מה יקרה בהרצת השאילתה?
SELECT student_id, name, grade
FROM Students s JOIN Enrollments e ON s.student_id = e.student_id`,
    options:[
      'תרוץ ותציג את student_id מטבלת Students',
      'שגיאה – student_id קיים בשתי הטבלאות (Ambiguous)',
      'תרוץ ותציג את student_id פעמיים, פעם מכל טבלה',
      'שגיאה – חובה לכתוב INNER JOIN ולא רק JOIN'],
    correct:1,
    explain:`העמודה student_id קיימת גם ב-Students וגם ב-Enrollments, ו-SQL Server לא יודע מאיזו טבלה לקחת, ולכן מתקבלת השגיאה Ambiguous column name. צריך לציין את הטבלה: s.student_id. name ו-grade קיימות בטבלה אחת בלבד, ולכן הן תקינות. JOIN לבד שקול ל-INNER JOIN.` },

  { topic:'join',
    q:`לחללית Enterprise (s_no = 1) היו 2 מסעות: מסע 1 עם E.T. ו-Buck Rogers, ומסע 5 עם Bill Gates ו-E.T. כמה שורות תחזיר:
SELECT A.aname
FROM Aliens A
JOIN Aliens_in_trips AIT ON A.id_no = AIT.id_no
JOIN Trips T ON AIT.t_no = T.t_no
WHERE T.s_no = 1`,
    options:['2', '3', '7', '4'], correct:3,
    explain:`הצירוף מחזיר שורה לכל זוג (מסע, חייזר): 2 + 2 = 4, ו-E.T. מופיע פעמיים. כדי לקבל רשימת שמות בלי כפילויות (3 שמות) מוסיפים SELECT DISTINCT, בדיוק כמו בתרגיל "שמות החייזרים שהשתתפו במסע לפני שנת 2000".` },

  { topic:'join',
    q:`כמה שורות תחזיר השאילתה על נתוני החוברת (8 הרשמות; ל-Dana אין הרשמה)?
SELECT s.name, c.course_name
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
JOIN Courses c ON c.course_id = e.course_id`,
    options:['9 – כל 8 ההרשמות ועוד Dana עם NULL', '6 – שורה אחת לכל סטודנט', '8 – Dana נעלמת בגלל ה-JOIN השני', '4 – שורה אחת לכל קורס'],
    correct:2,
    explain:`אחרי ה-LEFT JOIN הראשון, ל-Dana יש e.course_id = NULL. ה-INNER JOIN השני דורש c.course_id = NULL, תנאי שלעולם לא מתקיים, ולכן Dana נפלטת ונשארות 8 שורות. כשרוצים לשמור את כל הסטודנטים, גם הצירוף השני חייב להיות LEFT JOIN, כמו בפתרון הרשמי לתרגילים 3 ו-5.` },

  { topic:'join',
    q:`בפתרון הרשמי לתרגיל 6 ("כל הקורסים, גם בלי סטודנטים – לפתור ב-RIGHT JOIN"), בשמות עמודות מתוקנים:
FROM Students s
RIGHT JOIN Enrollments e ON s.student_id = e.student_id
RIGHT JOIN Courses c ON c.course_id = e.course_id
איזו טבלה נשמרת במלואה בתוצאה?`,
    options:['Students', 'Enrollments', 'אף אחת – זה INNER JOIN', 'Courses'], correct:3,
    explain:`כל RIGHT JOIN שומר את כל השורות של הטבלה שמימינו. הצירוף האחרון הוא RIGHT JOIN Courses, ולכן כל הקורסים נשמרים – גם קורס בלי הרשמות, עם NULL בשם הסטודנט. במערכת המכללה המבנה הזה מחזיר 16 שורות: 15 הרשמות ועוד Cyber Security.` },

  { topic:'join',
    q:`בתבנית של מצגת 6 מצרפים טבלאות "בסגנון הישן" – פסיקים ב-FROM ותנאי החיבור ב-WHERE: SELECT T.d_date, P.pname FROM Trips T, Planets P WHERE T.p_no = P.p_no. לאיזה צירוף זה שקול?`,
    options:[
      'FROM Trips T LEFT JOIN Planets P ON T.p_no = P.p_no',
      'FROM Trips T JOIN Planets P ON T.p_no = P.p_no',
      'FROM Trips T CROSS JOIN Planets P',
      'FROM Trips T FULL JOIN Planets P ON T.p_no = P.p_no'],
    correct:1,
    explain:`פסיק בין טבלאות יוצר מכפלה קרטזית, ותנאי ההתאמה ב-WHERE משאיר רק זוגות מתאימים – בדיוק כמו (INNER) JOIN עם ON. אין כאן שמירה של שורות בלי התאמה, כמו ב-LEFT או ב-FULL. בלי ה-WHERE זה היה CROSS JOIN.` },

  { topic:'join',
    q:`מה מחזיר FULL OUTER JOIN בין students ל-enrollments?`,
    options:[
      'רק שורות שיש להן התאמה בשתי הטבלאות',
      'את כל השורות מהטבלה השמאלית, ומהימנית רק את אלה שמתאימות',
      'את כל השורות משתי הטבלאות, עם NULL היכן שאין התאמה',
      'כל צירוף אפשרי של שורה משמאל עם שורה מימין'],
    correct:2,
    explain:`FULL JOIN הוא LEFT ו-RIGHT יחד: שורות עם התאמה מופיעות פעם אחת, ושורות בלי התאמה מכל צד מופיעות עם NULL בצד השני. INNER מחזיר רק התאמות, LEFT שומר רק את השמאלית, ו"כל צירוף אפשרי" הוא CROSS JOIN. במערכת המכללה: 15 הרשמות ועוד Lior, כלומר 16 שורות.` },

  /* ======================= group — צבירה וקיבוץ ======================= */
  { topic:'group',
    q:`רוצים להציג רק ערים שיש בהן יותר מסטודנט אחד. איפה נכתב התנאי COUNT(*) > 1?`,
    options:[
      'WHERE COUNT(*) > 1, לפני GROUP BY',
      'GROUP BY city, COUNT(*) > 1',
      'ORDER BY COUNT(*) > 1, בסוף',
      'HAVING COUNT(*) > 1, אחרי GROUP BY'],
    correct:3,
    explain:`WHERE מסנן שורות בודדות לפני הקיבוץ, ובשלב הזה עוד אין COUNT. תנאי על תוצאה של פונקציית צבירה נכתב ב-HAVING, שמסנן קבוצות אחרי GROUP BY. WHERE COUNT(*) > 1 יחזיר שגיאה ב-SQL Server.` },

  { topic:'group',
    q:`מה יקרה ב-SQL Server?
SELECT city, name, COUNT(*)
FROM Students
GROUP BY city`,
    options:[
      'תחזיר לכל עיר שם אקראי אחד מתוך הסטודנטים שבה',
      'שגיאה – name אינו ב-GROUP BY ואינו בתוך צבירה',
      'תחזיר שורה נפרדת לכל סטודנט, עם ספירה 1 בכל שורה',
      'תחזיר את כל השמות של כל עיר בתא אחד'],
    correct:1,
    explain:`כל עמודה ב-SELECT שאינה בתוך פונקציית צבירה חייבת להופיע ב-GROUP BY (שגיאה 8120). לכל עיר יש כמה שמות, ו-SQL Server לא יבחר אחד מהם. שימו לב: SQLite, המנוע שבדפדפן, דווקא מתיר את זה ובוחר שם כלשהו. במבחן כותבים לפי SQL Server: GROUP BY city, name, או מסירים את name.` },

  { topic:'group',
    q:`ערי הסטודנטים בחוברת: Tel Aviv ×2, Haifa ×2, Jerusalem, Beer Sheva. כמה שורות תחזיר:
SELECT city, COUNT(*) FROM Students GROUP BY city HAVING COUNT(*) > 1`,
    options:['2', '1', '4', '6'], correct:0,
    explain:`GROUP BY city יוצר 4 קבוצות. HAVING משאיר רק קבוצות עם יותר משורה אחת: Tel Aviv (2) ו-Haifa (2), כלומר 2 שורות.` },

  { topic:'group',
    q:`העמודה grade מוגדרת INT. ל-Maya שני ציונים: 76 ו-91. מה יחזיר SQL Server עבור SELECT AVG(grade) FROM Enrollments WHERE student_id = 2?`,
    options:['83', '83.5', '84', '83.50'], correct:0,
    explain:`ב-SQL Server, AVG של עמודה מטיפוס INT מחזיר INT, והחלק העשרוני נחתך ולא מעוגל: 167 / 2 = 83. כדי לקבל 83.5 ממירים לפני החישוב: AVG(CAST(grade AS DECIMAL(5,2))) או AVG(grade * 1.0). במנוע SQLite שבאתר תראו 83.5 – זה הבדל בין המנועים.` },

  { topic:'group',
    q:`בקורס MongoDB (courseId = 1) יש 7 הגשות: 95, 80, 78, NULL, 85, 100, 60. מה יחזיר AVG(grade)?`,
    options:['71.14 – הסכום 498 חלקי 7 הגשות', 'NULL – כי יש הגשה בלי ציון', '83 – הסכום 498 חלקי 6 ציונים', '85 – החציון של הציונים'],
    correct:2,
    explain:`פונקציות צבירה (AVG, SUM, MIN, MAX, COUNT(col)) מתעלמות מ-NULL. לכן AVG = 498 / 6 = 83, וההגשה שלא נבדקה לא נחשבת כ-0. אם רוצים להחשיב אותה כ-0 כותבים AVG(ISNULL(grade, 0)), ואז מקבלים 71.14.` },

  { topic:'group',
    q:`בטבלת submissions יש 16 שורות, ובשתיים מהן grade = NULL. מה תחזיר SELECT COUNT(*), COUNT(grade) FROM submissions?`,
    options:['16, 16', '14, 14', '14, 16', '16, 14'], correct:3,
    explain:`COUNT(*) סופר שורות, כולל שורות עם NULL, ולכן 16. COUNT(grade) סופר רק שורות שבהן grade אינו NULL, ולכן 14.` },

  { topic:'group',
    q:`בטבלת enrollments יש 15 הרשמות של 9 סטודנטים שונים ל-5 קורסים שונים. מה תחזיר SELECT COUNT(DISTINCT studentId) FROM enrollments?`,
    options:['9', '15', '5', '10'], correct:0,
    explain:`COUNT(DISTINCT col) סופר ערכים שונים (ולא סופר NULL). יש 15 הרשמות, אבל רק 9 סטודנטים שונים. Lior לא רשום כלל, ולכן התשובה אינה 10.` },

  { topic:'group',
    q:`יש הגשות ב-5 קורסים. בכל אחד מקורסים 1, 2, 3 ו-5 יש לפחות ציון אחד של 80 ומעלה, ובקורס 4 הציונים הם 70 ו-NULL. כמה שורות תחזיר:
SELECT courseId, COUNT(*)
FROM submissions
WHERE grade >= 80
GROUP BY courseId`,
    options:['5', '6', '4', '16'], correct:2,
    explain:`ה-WHERE רץ לפני הקיבוץ. בקורס 4 אף שורה לא עוברת (70 קטן מ-80, ו-NULL >= 80 אינו TRUE), ולכן הקבוצה שלו לא נוצרת בכלל, ולא תופיע שורה עם 0. נשארים קורסים 1, 2, 3 ו-5, כלומר 4 שורות.` },

  { topic:'group',
    q:`בטבלת enrollments יש הרשמות ל-5 קורסים (לקורס 6 אין הרשמות). בקורסים 1–3 כל ההרשמות במצב Active, ובקורסים 4 ו-5 יש גם Active וגם Inactive. כמה שורות תחזיר:
SELECT courseId, status, COUNT(*)
FROM enrollments
GROUP BY courseId, status`,
    options:['5', '2', '15', '7'], correct:3,
    explain:`כל קבוצה היא צירוף ייחודי של (courseId, status). לקורסים 1, 2 ו-3 יש קבוצה אחת כל אחד (3 קבוצות), ולקורסים 4 ו-5 שתי קבוצות כל אחד (4 קבוצות). סך הכל 7.` },

  { topic:'group',
    q:`מהירויות החלליות: 120, 150, 70, 60, 50. מה תחזיר SELECT MAX(max_speed), MIN(max_speed) FROM Ships?`,
    options:['שורה אחת: 150, 50', 'חמש שורות – אחת לכל חללית', 'שגיאה – חסר GROUP BY', 'שתי שורות: 150 ו-50'],
    correct:0,
    explain:`פונקציות צבירה בלי GROUP BY מתייחסות לכל הטבלה כקבוצה אחת ומחזירות שורה אחת. GROUP BY נדרש רק כשמופיעה לצידן עמודה רגילה שאינה בתוך צבירה.` },

  { topic:'group',
    q:`איזו שאילתה תקינה ב-SQL Server ומחזירה את הקורסים שממוצע הציונים בהם מעל 80?`,
    options:[
      'SELECT courseId, AVG(grade) AS avgG FROM submissions HAVING AVG(grade) > 80 GROUP BY courseId',
      'SELECT courseId, AVG(grade) AS avgG FROM submissions GROUP BY courseId HAVING avgG > 80',
      'SELECT courseId, AVG(grade) AS avgG FROM submissions GROUP BY courseId HAVING AVG(grade) > 80',
      'SELECT courseId, AVG(grade) AS avgG FROM submissions GROUP BY courseId WHERE AVG(grade) > 80'],
    correct:2,
    explain:`תנאי על ממוצע הוא תנאי על קבוצה, ולכן הוא נכתב ב-HAVING, אחרי GROUP BY. ב-SQL Server אי אפשר להשתמש ב-HAVING בכינוי מה-SELECT (avgG), כי HAVING מחושב לפני ה-SELECT. לכן חוזרים על הביטוי AVG(grade). WHERE לא יכול להכיל פונקציית צבירה, וממילא הוא חייב להופיע לפני GROUP BY. התוצאה: קורסים 1 (83), 3 (91) ו-5 (85.5).` },

  /* ======================= case — CASE ו-CAST ======================= */
  { topic:'case',
    q:`מה יחזיר הביטוי עבור ציון 95?
CASE
  WHEN grade >= 70 THEN 'good'
  WHEN grade >= 90 THEN 'excellent'
  ELSE 'fail'
END`,
    options:["'excellent'", "גם 'good' וגם 'excellent'", "'good'", "'fail'"], correct:2,
    explain:`CASE נבדק מלמעלה למטה ועוצר ב-WHEN הראשון שמתקיים. 95 >= 70, ולכן מוחזר 'good', והשורה של 90 בכלל לא נבדקת. לכן כותבים את הספים מהגבוה לנמוך: קודם >= 90, אחר כך >= 80 וכן הלאה, כמו בפתרון הרשמי לתרגיל 4. בסדר השגוי הזה אף ציון לא יקבל excellent.` },

  { topic:'case',
    q:`מה יחזיר הביטוי עבור City = 'Eilat'?
CASE
  WHEN City = 'Tel-Aviv' THEN 'Local'
  WHEN City = 'Jerusalem' THEN 'Domestic'
END`,
    options:["'International'", "מחרוזת ריקה ''", 'שגיאה – חסר ELSE', 'NULL'], correct:3,
    explain:`ELSE אינו חובה. כשאף WHEN לא מתקיים ואין ELSE, הביטוי CASE מחזיר NULL. בדוגמה במצגת 3 מופיע ELSE 'International' בדיוק כדי לטפל בשאר הערים.` },

  { topic:'case',
    q:`בתרגיל 7: "מחיר מעל 1500 – 10% הנחה, 1500 ומטה – ללא הנחה". מה יהיה final_price של Java, שמחירו 1500?
CASE WHEN price > 1500 THEN price * 0.9 ELSE price END AS final_price`,
    options:['1350', '1650', 'NULL', '1500'], correct:3,
    explain:`1500 > 1500 הוא FALSE, ולכן נכנסים ל-ELSE ומקבלים את המחיר המקורי, 1500. רק Python (1800) מקבל הנחה ומגיע ל-1620. שימו לב לגבולות: "מעל" פירושו >, ו"ומעלה" פירושו >=.` },

  { topic:'case',
    q:`הציון הנמוך ביותר בפועל הוא 60, ויש 2 הגשות עם grade = NULL. מה תחזיר השאילתה?
SELECT COUNT(*) FROM submissions
WHERE CASE WHEN grade >= 60 THEN 'Pass' ELSE 'Fail' END = 'Fail'`,
    options:['2', '0', '14', '16'], correct:0,
    explain:`עבור grade = NULL התנאי grade >= 60 הוא UNKNOWN ולא TRUE, ולכן CASE ממשיך ל-ELSE ומחזיר 'Fail'. כך שתי ההגשות שלא נבדקו מסומנות בטעות כנכשלות. הדרך הנכונה: להוסיף ראשון WHEN grade IS NULL THEN 'Not graded', כלומר לבדוק NULL לפני שאר התנאים.` },

  { topic:'case',
    q:`אילו לקוחות תחזיר השאילתה ממצגת 3?
SELECT CustomerName, City FROM CUSTOMERS
WHERE CASE
  WHEN City = 'Tel-Aviv' THEN 1
  WHEN City = 'Haifa' THEN 0
  ELSE 0
END = 1`,
    options:['לקוחות מתל אביב ומחיפה', 'רק לקוחות מתל אביב', 'כל הלקוחות שאינם מחיפה', 'כל הלקוחות בטבלה'], correct:1,
    explain:`ה-CASE מחזיר 1 רק עבור Tel-Aviv. חיפה וכל שאר הערים מקבלות 0. התנאי END = 1 משאיר רק את מי שקיבל 1, כלומר רק לקוחות מתל אביב. זה שקול ל-WHERE City = 'Tel-Aviv'.` },

  { topic:'case',
    q:`איזה ביטוי CASE אינו תקין תחבירית?`,
    options:[
      "CASE City WHEN 'Haifa' THEN 40 ELSE 0 END",
      "CASE WHEN grade >= 90 THEN 'A' ELSE 'B' END",
      "CASE WHEN City IN ('Haifa', 'Eilat') THEN 1 END",
      "CASE grade WHEN >= 90 THEN 'A' ELSE 'B' END"],
    correct:3,
    explain:`ב-CASE "פשוט" (CASE עמודה WHEN ערך) כל WHEN בודק שוויון בלבד, ואי אפשר לכתוב בו >=. להשוואות טווח משתמשים ב-CASE "מחפש": CASE WHEN grade >= 90 THEN ... END. הביטוי עם IN תקין גם בלי ELSE, והוא יחזיר NULL כשאין התאמה.` },

  { topic:'case',
    q:`העמודה grade היא INT, ול-Maya הציונים 76 ו-91. מה יחזיר SQL Server עבור CAST(AVG(grade) AS DECIMAL(5,2))?`,
    options:['83.50', '84.00', '83.00', '83.5'], correct:2,
    explain:`סדר החישוב קובע. AVG(grade) על INT מחושב קודם ומחזיר 83 (החלק העשרוני נחתך), ורק אז CAST הופך אותו ל-83.00. כדי לקבל 83.50 צריך להמיר לפני הממוצע: CAST(AVG(CAST(grade AS DECIMAL(5,2))) AS DECIMAL(5,2)). זה בדיוק המקום שבו תרגיל 14 בחוברת דורש CAST (העמודה Average Grade). SQLite שבדפדפן יחזיר 83.5 בשני המקרים.` },

  /* ======================= nested — תתי-שאילתות ======================= */
  { topic:'nested',
    q:`מהירויות החלליות: 120, 150, 70, 60, 50. כמה שורות תחזיר:
SELECT sname, max_speed FROM Ships
WHERE max_speed > (SELECT AVG(max_speed) FROM Ships)`,
    options:['2', '1', '3', '5'], correct:0,
    explain:`תת-השאילתה מחושבת פעם אחת: AVG = 450 / 5 = 90. נשארות החלליות שמעל 90: Enterprise (120) ו-Titanic (150), כלומר 2. אי אפשר לכתוב ישירות WHERE max_speed > AVG(max_speed), כי פונקציית צבירה לא מותרת ב-WHERE. לכן צריך תת-שאילתה.` },

  { topic:'nested',
    q:`תת-השאילתה מחזירה גם NULL, בגלל הקורס Cyber Security שאין בו הרשמות. כמה שורות תחזיר:
SELECT firstName FROM students
WHERE id NOT IN (
  SELECT e.studentId
  FROM courses c LEFT JOIN enrollments e ON c.id = e.courseId)`,
    options:['1', '9', '0', '10'], correct:2,
    explain:`x NOT IN (..., NULL) פירושו x <> ... AND x <> NULL. ההשוואה x <> NULL היא UNKNOWN, ולכן התנאי אף פעם לא TRUE. מוחזרות 0 שורות, ואפילו Lior לא מופיע. זו מלכודת קלאסית: עם NOT IN מסננים NULL בתת-השאילתה (WHERE e.studentId IS NOT NULL) או משתמשים ב-NOT EXISTS. בלי ה-NULL התוצאה הייתה Lior.` },

  { topic:'nested',
    q:`מה יקרה ב-SQL Server?
SELECT firstName FROM students
WHERE id = (SELECT studentId FROM enrollments WHERE courseId = 1)`,
    options:[
      'תחזיר את 5 הסטודנטים הרשומים לקורס 1',
      'שגיאה – תת-השאילתה מחזירה יותר מערך אחד',
      'תחזיר רק את הסטודנט הראשון שתת-השאילתה מצאה',
      'תחזיר 0 שורות כי אין שוויון מלא'],
    correct:1,
    explain:`עם = (וגם עם < או >) תת-השאילתה חייבת להחזיר ערך יחיד. בקורס 1 רשומים 5 סטודנטים, ולכן SQL Server זורק את השגיאה "Subquery returned more than 1 value". הפתרון: WHERE id IN (SELECT ...). שימו לב: SQLite שבדפדפן לא נכשל אלא לוקח את הערך הראשון, אבל ב-SQL Server זו שגיאה.` },

  { topic:'nested',
    q:`מה מחזירה השאילתה המתואמת (Correlated)?
SELECT s1.id, s1.courseId, s1.grade
FROM submissions s1
WHERE s1.grade > (SELECT AVG(s2.grade) FROM submissions s2
                  WHERE s2.courseId = s1.courseId)`,
    options:[
      'הגשות שהציון בהן גבוה מהממוצע הכללי של כל ההגשות',
      'קורסים שהממוצע שלהם גבוה מהממוצע הכללי של כל הקורסים',
      'הגשה אחת לכל קורס – זו שהציון בה הוא הגבוה ביותר',
      'הגשות שהציון בהן גבוה מהממוצע של הקורס שלהן'],
    correct:3,
    explain:`תת-שאילתה מתואמת מתייחסת לשורה החיצונית (s1.courseId), ולכן היא מחושבת מחדש לכל הגשה – על הקורס של אותה הגשה בלבד. על הנתונים מתקבלות 6 הגשות: בקורס 1 הציונים 95, 85 ו-100 (הממוצע 83), ובקורסים 2, 3 ו-5 הציונים 88, 92 ו-90. בקורס 4 אף הגשה אינה מעל 70.` },

  { topic:'nested',
    q:`איזו שאילתה מחזירה את הקורסים שאין בהם אף הרשמה (Cyber Security)?`,
    options:[
      'SELECT courseName FROM courses c WHERE EXISTS (SELECT * FROM enrollments e WHERE e.courseId = c.id)',
      'SELECT courseName FROM courses c WHERE NOT EXISTS (SELECT * FROM enrollments e WHERE e.courseId = c.id)',
      'SELECT courseName FROM courses c WHERE NOT EXISTS (SELECT * FROM enrollments e WHERE e.courseId <> c.id)',
      'SELECT courseName FROM courses c WHERE c.id NOT IN (SELECT id FROM enrollments)'],
    correct:1,
    explain:`NOT EXISTS מחזיר TRUE כשתת-השאילתה המתואמת לא מצאה אף הרשמה לקורס, ולכן מתקבל Cyber Security. EXISTS בלי NOT מחזיר את ההפך: קורסים שיש בהם הרשמות. עם <> כמעט תמיד תימצא הרשמה לקורס אחר, ולכן אף קורס לא יוחזר. הגרסה עם NOT IN משווה ל-enrollments.id (מזהה ההרשמה) במקום ל-courseId – עמודה שגויה, ולכן היא לא מחזירה כלום.` },

  { topic:'nested',
    q:`מה חסר כדי שהשאילתה תרוץ ב-SQL Server?
SELECT AVG(cnt)
FROM (SELECT studentId, COUNT(*) AS cnt FROM enrollments GROUP BY studentId)`,
    options:[
      'GROUP BY studentId גם בשאילתה החיצונית',
      'ORDER BY בתוך תת-השאילתה',
      'כינוי לתת-השאילתה שב-FROM, למשל ) AS t',
      'שום דבר – השאילתה תקינה ותרוץ בלי שינוי'],
    correct:2,
    explain:`ב-SQL Server, טבלה נגזרת (תת-שאילתה ב-FROM) חייבת לקבל שם: FROM (SELECT ...) AS t. בלי שם מתקבלת שגיאת תחביר. AVG בשאילתה החיצונית על כל השורות לא צריך GROUP BY, ו-ORDER BY בתוך תת-שאילתה אסור (אלא עם TOP). שימו לב גם ש-AVG(cnt) על INT יחזיר 1 ולא 1.67.` },

  { topic:'nested',
    q:`מצגת 6, "הכוכב הכי צפוף". אוכלוסיות: Naren 10M, Alpha Centaury 31M, Pluto 200M, K-PAX 6M, London 12M. החלליות שטסו לכל כוכב: Pluto (Enterprise), Naren (Titanic), Alpha Centaury (Altalena, Titanic), K-PAX (x-sodus), London (Enterprise, Cartesian-product). מה תחזיר:
SELECT P.pname, S.sname
FROM Planets P
JOIN Trips T ON P.p_no = T.p_no
JOIN Ships S ON T.s_no = S.s_no
WHERE P.population = (SELECT MAX(population) FROM Planets)`,
    options:['London, Enterprise', 'Pluto, Titanic', 'Pluto, Enterprise', 'Alpha Centaury, Titanic'], correct:2,
    explain:`MAX(population) הוא 200,000,000, האוכלוסייה של Pluto. לפלוטו היה מסע אחד בלבד (מסע 1), בחללית Enterprise. השוואה ל-MAX בתת-שאילתה עדיפה על TOP 1 ... ORDER BY, כי היא מחזירה את כל השוויוניים אם יש כאלה.` },

  /* ======================= advanced — זמניות, פרוצדורות, טריגרים, אינדקסים ======================= */
  { topic:'advanced',
    q:`מה נכון לגבי טבלה זמנית מקומית, כמו #young, ב-SQL Server?`,
    options:[
      'היא נשמרת לצמיתות עד שמריצים עליה DROP TABLE',
      'היא זמינה לכל המשתמשים שמחוברים לשרת באותו הזמן בדיוק',
      'אי אפשר להכניס אליה נתונים, אפשר רק לקרוא ממנה',
      'רק החיבור שיצר אותה רואה אותה, והיא נמחקת כשהוא נסגר'],
    correct:3,
    explain:`טבלה עם # אחד היא טבלה זמנית מקומית: היא נשמרת ב-tempdb, רק ה-session שיצר אותה רואה אותה, והיא נמחקת אוטומטית כשה-session מסתיים (אפשר גם DROP TABLE #young מוקדם יותר). ## (שתי סולמיות) היא טבלה זמנית גלובלית, שכל ה-sessions רואים. אפשר להריץ עליה INSERT, UPDATE ו-DELETE כמו על טבלה רגילה.` },

  { topic:'advanced',
    q:`גילאי הסטודנטים בחוברת: 22, 25, 19, 28, 21, 24. מה יחזיר הקוד?
SELECT name, age INTO #young FROM Students WHERE age < 23;
SELECT COUNT(*) FROM #young;`,
    options:['3', '2', '6', 'שגיאה – לא הריצו CREATE TABLE #young'], correct:0,
    explain:`SELECT ... INTO #young יוצר את הטבלה הזמנית בעצמו, בלי CREATE TABLE מראש, וממלא אותה בתוצאה: Dan (22), Ron (19) ו-Tom (21), כלומר 3 שורות. דווקא אם #young כבר קיימת תתקבל שגיאה.` },

  { topic:'advanced',
    q:`נתונה הפרוצדורה CREATE PROCEDURE GetStudentsByCity @city VARCHAR(50) AS SELECT * FROM students WHERE city = @city. איך מריצים אותה עבור חיפה?`,
    options:[
      "SELECT * FROM GetStudentsByCity('Haifa')",
      "EXEC GetStudentsByCity @city = 'Haifa'",
      "CALL GetStudentsByCity WHERE city = 'Haifa'",
      "RUN PROCEDURE GetStudentsByCity 'Haifa'"],
    correct:1,
    explain:`ב-SQL Server מפעילים פרוצדורה שמורה עם EXEC (או EXECUTE), ומעבירים פרמטרים לפי שם (@city = ...) או לפי מיקום. אי אפשר להריץ SELECT FROM על פרוצדורה – זה מתאים לפונקציה טבלאית. CALL הוא תחביר של MySQL, ו-RUN PROCEDURE לא קיים.` },

  { topic:'advanced',
    q:`בטריגר AFTER INSERT ב-SQL Server, איך ניגשים לשורות שנוספו זה עתה?`,
    options:['דרך הטבלה הווירטואלית deleted', 'דרך המשתנה המובנה @@NEWROWS', 'דרך הטבלה הווירטואלית inserted', 'עם SELECT TOP 1 ... ORDER BY id DESC'],
    correct:2,
    explain:`בתוך טריגר יש שתי טבלאות וירטואליות: inserted (השורות החדשות ב-INSERT, והערכים החדשים ב-UPDATE) ו-deleted (השורות שנמחקו ב-DELETE, והערכים הישנים ב-UPDATE). פקודה אחת יכולה להכניס כמה שורות, ולכן לקחת "את השורה האחרונה" זו טעות.` },

  { topic:'advanced',
    q:`מה ההבדל המרכזי בין טריגר (Trigger) לפרוצדורה שמורה (Stored Procedure)?`,
    options:[
      'טריגר יכול להכיל רק SELECT; פרוצדורה יכולה להכיל גם INSERT',
      'טריגר רץ מעצמו בתגובה לאירוע בטבלה; פרוצדורה מורצת עם EXEC',
      'פרוצדורה רצה מעצמה בכל שינוי בטבלה; טריגר מורץ עם EXEC',
      'אין הבדל מעשי – שניהם רצים רק כשקוראים להם בשם שלהם'],
    correct:1,
    explain:`טריגר מופעל מעצמו כשמתבצע INSERT, UPDATE או DELETE על הטבלה שהוא מוגדר עליה, ואי אפשר לקרוא לו ישירות. פרוצדורה שמורה היא תוכנית ששמורה בשרת ומפעילים אותה במפורש עם EXEC. היא יכולה להכיל פקודות DDL, DML, DCL ו-TCL (מצגת 3). גם טריגר יכול להכיל פקודות DML.` },

  { topic:'advanced',
    q:`מה נכון לגבי אינדקס (Index) על עמודה?`,
    options:[
      'הוא מאיץ את כל הפעולות, כולל INSERT ו-UPDATE, בלי שום מחיר',
      'הוא מבטיח שערכי העמודה יהיו ייחודיים, בדיוק כמו UNIQUE',
      'הוא מאיץ חיפוש לפי העמודה, אבל מאט מעט את INSERT ו-UPDATE',
      'הוא הופך את העמודה למפתח הראשי של הטבלה באופן אוטומטי'],
    correct:2,
    explain:`אינדקס הוא מבנה עזר, כמו אינדקס בסוף ספר, שמאפשר למצוא שורות בלי לסרוק את כל הטבלה. לכן WHERE, JOIN ו-ORDER BY על העמודה מהירים יותר. המחיר: כל שינוי בנתונים מחייב לעדכן גם את האינדקס, וצריך מקום אחסון. אינדקס רגיל לא מחייב ייחודיות (רק UNIQUE INDEX), ולא הופך עמודה ל-PK. ב-SQL Server יש לכל טבלה לכל היותר אינדקס Clustered אחד.` },

  /* ======================= erd — מודל לטבלאות ======================= */
  { topic:'erd',
    q:`חייזר יכול להשתתף בהרבה מסעות, ובכל מסע משתתפים הרבה חייזרים. איך מממשים את הקשר הזה?`,
    options:[
      'עמודת t_no בטבלת Aliens',
      'עמודת id_no בטבלת Trips',
      'רשימת חייזרים מופרדת בפסיקים בעמודה חדשה בטבלת Trips',
      'טבלת קישור Aliens_in_trips עם PK (t_no, id_no)'],
    correct:3,
    explain:`קשר רבים-לרבים (M:N) אי אפשר לממש עם מפתח זר אחד, כי כל צד היה צריך כמה ערכים. יוצרים טבלת קישור שמכילה את שני המפתחות הזרים, והצירוף שלהם הוא המפתח הראשי – בדיוק Aliens_in_trips(t_no(Trips), id_no(Aliens)). רשימה מופרדת בפסיקים מפרה את הנרמול, כי הערך אינו אטומי.` },

  { topic:'erd',
    q:`כל קורס מועבר על ידי מרצה אחד, ומרצה יכול להעביר כמה קורסים (1:N). היכן ממקמים את המפתח הזר?`,
    options:[
      'בטבלת lecturers – עמודה courseId',
      'בטבלת courses – העמודה lecturerId',
      'בשתי הטבלאות, כל אחת מפנה לשנייה',
      'רק בטבלת קישור lecturer_courses'],
    correct:1,
    explain:`בקשר 1:N המפתח הזר נמצא בצד של ה"רבים". לכל קורס יש בדיוק מרצה אחד, ולכן courses.lecturerId REFERENCES lecturers(id), כמו בעבודת ישור קו. עמודת courseId בטבלת המרצים הייתה צריכה להכיל כמה ערכים למרצה אחד. טבלת קישור נחוצה רק בקשר M:N.` },

  { topic:'erd',
    q:`ב-EMPLOYEES(Employee-ID, Employee-Name, Supervisor(EMPLOYEES)) העמודה Supervisor מפנה לאותה טבלה. איזה סוג קשר זה?`,
    options:[
      'קשר רבים-לרבים שדורש טבלת קישור',
      'קשר 1:1 שבו ה-FK הוא גם ה-PK',
      'קשר רקורסיבי – FK שמפנה לאותה רלציה',
      'הגדרה שגויה – FK חייב להפנות לטבלה אחרת'],
    correct:2,
    explain:`מפתח זר יכול להפנות לאותה טבלה. זה קשר רקורסיבי (Recursive): המנהל של עובד הוא בעצמו עובד (מצגת 2). קשר 1:1 שבו ה-FK הוא גם ה-PK הוא מקרה אחר, כמו VIP_CUSTOMERS(VIP-Customer-ID(CUSTOMERS), ...).` },

  /* ======================= mssql — ייחודי ל-SQL Server ======================= */
  { topic:'mssql',
    q:`מה נכון לגבי SELECT TOP 3 * FROM students ב-SQL Server, כשאין ORDER BY?`,
    options:[
      'תמיד יוחזרו 3 הסטודנטים עם ה-id הנמוך ביותר',
      'שגיאה – TOP חייב להופיע יחד עם ORDER BY',
      'יוחזרו 3 שורות כלשהן – הסדר אינו מובטח',
      'יוחזרו 3 השורות האחרונות שנוספו לטבלה'],
    correct:2,
    explain:`טבלה היא קבוצה, ו-"tuples are not considered to be ordered" (מצגת 2). בלי ORDER BY, SQL Server מחזיר 3 שורות כלשהן – לרוב לפי האינדקס, אבל זה לא מובטח. כשצריך "3 הראשונים לפי..." חובה TOP יחד עם ORDER BY, למשל SELECT TOP 2 sname FROM Ships ORDER BY max_speed DESC מחזיר Titanic ו-Enterprise. TOP חוקי גם בלי ORDER BY. ב-SQL Server אין LIMIT – זה תחביר של MySQL ו-SQLite.` },

  { topic:'mssql',
    q:`מה יקרה ב-SQL Server (בהגדרות ברירת המחדל) בהרצת SELECT * FROM MOVIES WHERE Director = "Woody Allen"?`,
    options:[
      'יוחזרו הסרטים של Woody Allen',
      'יוחזרו 0 שורות, כי מרכאות כפולות לא מתאימות לטקסט',
      'השאילתה תרוץ ותתעלם מהתנאי',
      'שגיאה – "Woody Allen" מתפרש כשם עמודה ולא כמחרוזת'],
    correct:3,
    explain:`ב-SQL Server מחרוזות נכתבות בגרשיים בודדים: 'Woody Allen'. מרכאות כפולות מסמנות מזהה (שם של עמודה או טבלה) כש-QUOTED_IDENTIFIER ON, וזו ברירת המחדל. לכן מתקבלת השגיאה Invalid column name. בשקפים מופיעות גם מרכאות "חכמות" (‘ ’), אבל בקוד אמיתי חייבים גרש ישר.` },

  { topic:'mssql',
    q:`CustomerID הוא INT ו-CustomerName הוא VARCHAR. איזה ביטוי יחזיר ב-SQL Server טקסט כמו "1323 - Joe Smith"?`,
    options:[
      "CustomerID + ' - ' + CustomerName",
      "CAST(CustomerID AS VARCHAR(10)) + ' - ' + CustomerName",
      "CustomerID & ' - ' & CustomerName",
      "CAST(CustomerID + ' - ' + CustomerName AS VARCHAR)"],
    correct:1,
    explain:`ב-T-SQL האופרטור + משמש גם לחיבור וגם לשרשור. כשאחד הצדדים הוא INT, SQL Server מנסה להמיר את הטקסט ל-INT (טיפוס בעדיפות גבוהה יותר) ונכשל על ' - '. לכן ממירים קודם את המספר לטקסט – זו בדיוק דוגמת ה-CAST ממצגת 3. כשה-CAST עוטף את כל הביטוי הוא מגיע מאוחר מדי, כי החיבור הכושל כבר קרה בפנים. & אינו אופרטור שרשור.` },

  { topic:'mssql',
    q:`בקורס 4 (Marketing) יש שתי הגשות: 70 ו-NULL. מה תחזיר SELECT AVG(ISNULL(grade, 0)) FROM submissions WHERE courseId = 4?`,
    options:['70', 'NULL', '0', '35'], correct:3,
    explain:`ISNULL(grade, 0) מחליף את ה-NULL ב-0 לפני חישוב הממוצע, ולכן ההגשה שלא נבדקה נספרת: (70 + 0) / 2 = 35. בלי ISNULL, AVG(grade) מתעלם מה-NULL ומחזיר 70. אל תבלבלו בין הפונקציה ISNULL(x, y) של SQL Server לבין התנאי x IS NULL.` },

  { topic:'mssql',
    q:`איזו שאילתה מחזירה את המכפלה Quantity * Price כעמודה בשם Amount, ותקינה ב-T-SQL?`,
    options:[
      'SELECT Quantity * Price INTO Amount FROM SALES',
      'SELECT Amount = Quantity * Price FROM SALES',
      'SELECT Quantity * Price => Amount FROM SALES',
      'SELECT SET Amount = Quantity * Price FROM SALES'],
    correct:1,
    explain:`ב-T-SQL יש שתי דרכים לתת שם לעמודה מחושבת: Quantity * Price AS Amount, או Amount = Quantity * Price, כמו בשקף 34 במצגת 3. INTO Amount לא נותן שם לעמודה – הוא מנסה ליצור טבלה חדשה בשם Amount (וכאן אף ייכשל, כי לעמודה המחושבת אין שם). => ו-SELECT SET אינם תחביר SQL.` },

  { topic:'mssql',
    q:`ב-Trips העמודה d_date היא DATETIME. שלושה מסעות היו ב-2002, שניים ב-1800, ושניים (3 ו-4) ב-2004-04-14 בשעות 14:44 ו-14:46. כמה מסעות יחזיר WHERE d_date BETWEEN '2002-01-01' AND '2004-04-14'?`,
    options:['5', '7', '3', '2'], correct:2,
    explain:`כשמשווים DATETIME למחרוזת תאריך בלי שעה, היא מתפרשת כחצות: '2004-04-14' הוא 2004-04-14 00:00. מסעות 3 ו-4 (14:44 ו-14:46) מאוחרים מזה, ולכן נשארים בחוץ. נשארים 3 המסעות של 2002. BETWEEN אמנם כולל את הקצוות, אבל הקצה כאן הוא חצות. הפתרון: d_date >= '2002-01-01' AND d_date < '2004-04-15'.` },

];
