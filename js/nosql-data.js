/* ============================================================
   MongoDB — מאגרי נתונים לסימולטור (נבנים ממקור האמת המשותף)
   _id מספרי (1,2,3…) לשם קריאוּת — במונגו אמיתי זה היה ObjectId("…")
   ============================================================ */
window.SQLC = window.SQLC || {};
SQLC.nosql = SQLC.nosql || {};

SQLC.nosql.datasets = {
  college2: SQLC.buildCollege2Mongo(),
};

SQLC.nosql.datasetInfo = {
  college2: {
    title: 'מערכת המכללה (MongoDB)',
    desc: 'students · lecturers · courses (עם מערך lessons מוטמע) · enrollments · assignments · submissions',
  },
};
