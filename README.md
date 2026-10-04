# פורטל הכנה למבחנים — הקריה האקדמית אונו

פורטל למידה אינטראקטיבי בעברית, עם מסך בחירת קורס (`index.html`) ושלושה קורסים:

| קורס | דף | מה יש |
|---|---|---|
| ניהול ועיצוב בסיסי נתונים (3963) | `db.html` | סיכומים, בוחן, מסלול SQL מדורג, תרגול SQL חי, 8 מבחני תרגול |
| סטטיסטיקה למנהל עסקים (6592) | `stat.html` | 4 פרקים, דף נוסחאות, דוגמאות פתורות, מחולל מבחנים |
| שפת SQL + NoSQL (3964) | `sql.html` | סיכומי T-SQL ו-MongoDB, תרגול חי ב-SQL וב-MongoDB, שאלות שנפתרות בשתי השפות, מחולל מבחנים |

## קורס 3964 — שפת SQL + NoSQL
- **מנוע SQL בדפדפן** (SQLite / sql.js) עם שכבת המרה מ-T-SQL (`js/tsql-compat.js`): ‏TOP, ‏YEAR, ‏ISNULL, ‏CAST AS DECIMAL, שרשור `+`, טבלאות `#temp` ועוד — כותבים בתחביר של SQL Server.
- **סימולטור MongoDB** (`js/mongo-sim.js`, על בסיס mingo): ‏find, ‏insert/update/delete, ‏aggregate עם ‏$lookup ועוד.
- **בדיקה אוטומטית** (`js/grader.js`) — משווה את התוצאה שלכם לפתרון.
- **נתוני המכללה** ממקור אחד (`js/college2-data.js`) — אותם נתונים בטבלאות SQL וב-collections של מונגו.
- תוכן: `sql-content.js`, `nosql-content.js` (סיכומים), `sql-questions.js`, `nosql-questions.js` (בוחן), `sql-exercises.js`, `nosql-exercises.js`, `dual-questions.js` (תרגול).

## הפעלה
פותחים את `index.html` בדפדפן, או נכנסים לאתר החי: https://oratai99.github.io/-SQL/
מסכי התרגול טוענים את המנועים מ-CDN ולכן דורשים חיבור לאינטרנט. ההתקדמות נשמרת בדפדפן (localStorage).

התוכן מבוסס על חומרי הקורסים: מצגות, חוברות תרגילים, מבחנים לדוגמה ועבודות הגשה.
