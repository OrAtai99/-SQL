/* ============================================================
   פורטל 3964 — ⭐ המבחן לדוגמה האחרון (סכמת המשלוחים)
   המרצה אמר שהבחינה עצמה תהיה דומה מאוד למבחן הזה.
   חלק א׳ — 11 אמריקאיות · חלק ב׳ — 9 שאלות, SQL + MongoDB עם הרצה ובדיקה
   מול הפתרון הרשמי · 15 שאלות תרגול על אותה סכמה · מצב מבחן עם ציון.
   תלוי ב: sql-app.js (SQLAPP), ship-data.js (SHIP), ship-exam.js (SHIPX),
           grader.js (Grader), mongo-sim.js (MongoSim)
   ============================================================ */
(function(){
'use strict';
const A  = () => window.SQLAPP;
const X  = () => window.SHIPX;
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LET = ['א','ב','ג','ד'];
const EXAM_MINUTES = 150;

/* עמודי החוברת המודפסת ("גרסת כיתה", 101 עמודים) */
const PAGE_A = { 1:8, 2:8, 3:9, 4:9, 5:10, 6:10, 7:11, 8:11, 9:12, 10:12, 11:13 };
const PAGE_B = { 12:'14', 13:'15', 14:'16', 15:'17', 16:'18', 17:'19–20', 18:'21', 19:'22', 20:'23' };

const ASSUMPTIONS = [
  'כל מזהה עסקי (shipmentId, customerId וכו׳) ייחודי בטבלה או באוסף שלו. במונגו הוא שדה רגיל, ולא בהכרח ה-_id.',
  'active הוא בוליאני: ב-SQL ‏1/0, ובמונגו true/false.',
  'כל עוד משלוח לא נמסר, deliveredAt יכול להיות NULL — ובמונגו גם לא להופיע במסמך בכלל.',
  'shippingCost יכול להיות NULL, כשהעלות עוד לא חושבה.',
  'כל שורה ב-ShipmentItems היא פריט אחד בתוך משלוח. אותו פריט יכול להופיע במשלוחים רבים.',
  'ShipmentEvents הוא היסטוריה: לאותו משלוח יכולים להיות כמה אירועים.',
  'בשאלה על עלות או כמות מתייחסים רק לערכים מספריים.',
];

/* ============================================================
   רישום הסכמה במנועים של הפורטל
   ============================================================ */
function register(){
  const S = window.SQLC, D = window.SHIP;
  if(!S || !D || !X()) return false;
  S.schemas = S.schemas || {}; S.tables = S.tables || {}; S.schemaInfo = S.schemaInfo || {};
  S.nosql = S.nosql || {}; S.nosql.datasets = S.nosql.datasets || {};
  if(!S.schemas.ship){
    S.schemas.ship    = D.buildSql();
    S.tables.ship     = D.order.map(k => ({ name: D.sqlNames[k], cols: D.data[k].cols.join(', ') }));
    S.schemaInfo.ship = { title: 'סכמת המשלוחים — המבחן לדוגמה האחרון' };
    S.nosql.datasets.ship = D.buildMongo();
  }
  return true;
}

/* ============================================================
   בדיקה — הרצה אמיתית והשוואת שורות מול הפתרון הרשמי
   ============================================================ */
const isDate = v => v instanceof Date || (v && typeof v === 'object' && Object.prototype.toString.call(v) === '[object Date]');
function cell(v){
  if(v === null || v === undefined) return '∅';
  if(isDate(v)) return new Date(v.getTime()).toISOString().slice(0, 16);
  if(typeof v === 'boolean') return v ? '1' : '0';
  if(typeof v === 'number') return String(Math.round(v * 1000) / 1000);
  const s = String(v).trim();
  const dt = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/.exec(s);
  if(dt) return dt[1] + 'T' + dt[2];
  if(s !== '' && !isNaN(Number(s))) return String(Math.round(Number(s) * 1000) / 1000);
  return s;
}
const rowKey = r => r.map(cell).join(' │ ');
function sameRows(a, b, ordered){
  const P = a.map(rowKey), Q = b.map(rowKey);
  if(!ordered){ P.sort(); Q.sort(); }
  return P.length === Q.length && P.every((x, i) => x === Q[i]);
}
const runSql = code => A().runSqlUI('ship', code);
function mongoSim(){ return window.mingo ? new window.MongoSim(window.mingo, window.SHIP.buildMongo()) : null; }

function why(more, q){
  const tip = q.edge || q.trap || '';
  return tip ? `<div class="e2-hint">💡 ${more ? 'יותר מהצפוי' : 'פחות מהצפוי'} — ${esc(tip)}</div>` : '';
}
function checkSql(q, code){
  if(!String(code || '').trim()) return { ok:false, kind:'info', msg:'כתבו את שאילתת ה-SQL לפני הבדיקה.' };
  const u = runSql(code);
  if(u.error) return { ok:false, kind:'err', msg:'שגיאה בשאילתה: ' + esc(u.error) };
  const s = runSql(q.sql);
  if(s.error) return { ok:false, kind:'err', msg:'שגיאה בפתרון המובנה: ' + esc(s.error) };
  const ordered = window.Grader.sqlOrdered(q.sql);
  const ok = u.r.columns.length === s.r.columns.length && sameRows(u.r.rows, s.r.rows, ordered);
  let msg;
  if(ok) msg = `✓ נכון! ${u.r.rows.length} שורות — זהה לפתרון ${q.points ? 'הרשמי' : 'המובנה'}.`;
  else if(u.r.columns.length !== s.r.columns.length)
    msg = `✗ החזרת ${u.r.columns.length} עמודות, והפתרון מחזיר ${s.r.columns.length}: <code dir="ltr">${esc(s.r.columns.join(', '))}</code>`;
  else if(u.r.rows.length !== s.r.rows.length)
    msg = `✗ קיבלת <b>${u.r.rows.length}</b> שורות, והצפוי הוא <b>${s.r.rows.length}</b>.` + why(u.r.rows.length > s.r.rows.length, q);
  else msg = `✗ מספר השורות נכון (${u.r.rows.length}) אבל התוכן שונה.<div class="e2-hint">💡 ${ordered ? 'גם הסדר נבדק כאן — בדקו את ה-ORDER BY. ' : ''}בדקו את הערכים ואת סדר העמודות.</div>`;
  return { ok, kind: ok ? 'ok' : 'err', msg, result: u.r, notes: u.r.notes };
}
/* שדה חסר ושדה עם null הם אותו דבר בפלט (כמו NULL ב-SQL): אם ההשוואה לפי ערכים נכשלת,
   משווים שוב כשורות לפי עמודות הפלט, ושדה שלא הופיע = null */
function mongoEq(u, s, ordered, cols){
  if(window.Grader.mongoSame(u, s, 'values', ordered)) return true;
  if(!Array.isArray(u) || !Array.isArray(s) || !cols) return false;
  const rows = docs => docs.map(d => cols.map(c => (d == null || d[c] === undefined) ? null : d[c]));
  return sameRows(rows(u), rows(s), ordered);
}
function checkMongo(q, code){
  if(!String(code || '').trim()) return { ok:false, kind:'info', msg:'כתבו את פקודת המונגו לפני הבדיקה.' };
  const su = mongoSim(), ss = mongoSim();
  if(!su) return { ok:false, kind:'info', msg:'⚠ מנוע MongoDB עוד נטען (או שאין חיבור לאינטרנט) — נסו שוב בעוד רגע.' };
  const ru = su.run(code);
  if(!ru.ok) return { ok:false, kind:'err', msg:'שגיאה בפקודה: ' + esc(ru.error) };
  const rs = ss.run(q.mongo);
  if(!rs.ok) return { ok:false, kind:'err', msg:'שגיאה בפתרון המובנה: ' + esc(rs.error) };
  /* הסדר נבדק רק כשהשאלה ביקשה מיון (ORDER BY בפתרון ה-SQL). $sort שמשמש רק לבחירת "האחרון" אינו קובע סדר פלט */
  const ordered = window.Grader.sqlOrdered(q.sql) && window.Grader.mongoOrdered(q.mongo);
  const ok = mongoEq(ru.value, rs.value, ordered, q.cols);
  const un = Array.isArray(ru.value) ? ru.value.length : null, sn = Array.isArray(rs.value) ? rs.value.length : null;
  let msg;
  if(ok) msg = `✓ נכון! ${un === null ? '' : un + ' מסמכים — '}זהה לפתרון ${q.points ? 'הרשמי' : 'המובנה'}.`;
  else if(un !== null && sn !== null && un !== sn) msg = `✗ קיבלת <b>${un}</b> מסמכים, והצפוי הוא <b>${sn}</b>.` + why(un > sn, q);
  else msg = `✗ התוצאה שונה מהפתרון${un !== null ? ` (${un} מסמכים, כמו הצפוי)` : ''}.<div class="e2-hint">💡 ${ordered ? 'גם הסדר נבדק — בדקו את ה-$sort. ' : ''}בדקו אילו שדות חוזרים: <code dir="ltr">_id: 0</code>, ושמות השדות בפלט.</div>`;
  return { ok, kind: ok ? 'ok' : 'err', msg, mres: ru };
}
function mongoOut(r){
  const j = v => {
    const s = JSON.stringify(v, function(k, x){ const o = this[k]; return o instanceof Date ? '__ISO__' + o.toISOString() : x; }, 2);
    return (s === undefined ? 'undefined' : s).replace(/"__ISO__([^"]+)"/g, 'ISODate("$1")');
  };
  if(Array.isArray(r.value))
    return `<div class="res-count">${r.value.length} ${r.kind === 'docs' ? 'מסמכים' : 'ערכים'}</div><pre class="json-out">${esc(j(r.value.slice(0, 12)))}</pre>` +
      (r.value.length > 12 ? `<div class="tbl-more">…ועוד ${r.value.length - 12}</div>` : '');
  if(r.kind === 'none') return '<div class="muted-sm">הפקודה רצה (אין ערך להצגה).</div>';
  return `<pre class="json-out">${esc(j(r.value))}</pre>`;
}

/* ============================================================
   מצב והתקדמות
   ============================================================ */
let built = false, tab = 'about', examOn = false, examEnd = 0, examTick = null;
const examMcq = {};
function prog(){
  const P = A().prog(); P.ship = P.ship || {};
  const S = P.ship; S.mcq = S.mcq || {}; S.b = S.b || {}; S.p = S.p || {}; S.exams = S.exams || [];
  return S;
}
const save = () => A().save();

/* ============================================================
   רינדור
   ============================================================ */
function tbl(head, rows){
  return `<div class="e2-tbl-wrap"><table class="mini"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${
    rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
const code = s => `<code dir="ltr">${esc(s)}</code>`;

function headHtml(){
  return `
  <h2 class="view-title">⭐ המבחן לדוגמה האחרון — מערכת המשלוחים</h2>
  <p class="subtitle"><b>המרצה אמר שהבחינה עצמה תהיה דומה מאוד למבחן הזה.</b> כאן הוא כולו: 11 שאלות אמריקאיות עם המפתח וההסבר, 9 שאלות פתוחות שבהן כותבים SQL ו-MongoDB ומקבלים בדיקה אמיתית מול הפתרון הרשמי, ו-15 שאלות תרגול על אותה סכמה — בדיוק השינויים שסביר שיופיעו בבחינה.</p>
  <div class="e2-bar">
    <button class="btn" id="sxExamBtn">⏱ מצב מבחן (150 דקות)</button>
    <span id="sxTimer" class="exam-timer hidden">02:30:00</span>
    <button class="btn ghost small hidden" id="sxFinishBtn">סיים וקבל ציון</button>
    <span class="muted-sm" id="sxScore"></span>
  </div>
  <div id="sxExamRes"></div>
  <div class="chip-row sx-tabs" id="sxTabs">
    <button data-t="about">🧭 איך ניגשים</button>
    <button data-t="schema">🗂 הסכמה</button>
    <button data-t="a">🅰 חלק א׳ · 11 אמריקאיות</button>
    <button data-t="b">🅱 חלק ב׳ · 9 שאלות</button>
    <button data-t="p">🔁 תרגול נוסף · 15</button>
    <button data-t="map">🗺 מפה ווריאציות</button>
  </div>`;
}

function aboutHtml(){
  return `
  <div class="card e2-warn">
    <h3>📋 מבנה הבחינה</h3>
    <div class="e2-facts">
      <div class="e2-fact">⏱ <b>150 דקות</b></div>
      <div class="e2-fact">🅰 אמריקאיות · <b>6 נק'</b> · בוחרים <b>8 מתוך 10</b></div>
      <div class="e2-fact">🅱 פתוחות · <b>8 נק'</b> · בוחרים <b>7 מתוך 10</b></div>
      <div class="e2-fact">✍ כל שאלה פתוחה: <b>SQL וגם MongoDB</b></div>
      <div class="e2-fact">🎯 104 נק' · תקרה <b>100</b></div>
      <div class="e2-fact">📚 חומר פתוח, <b>מודפס בלבד</b></div>
    </div>
    <p class="e2-note" style="margin-top:10px">במבחן לדוגמה עצמו הניקוד היה 3 ו-7 נקודות לשאלה, ויש בו 11 אמריקאיות ו-9 פתוחות. בבחינה האמיתית — לפי ההנחיות שלמעלה. תחביר, נקודה-פסיק וסוגריים חסרים אינם מורידים ניקוד: הבדיקה היא על הלוגיקה.</p>
  </div>

  <div class="card">
    <h3>🧭 סדר עבודה מומלץ בלשונית הזאת</h3>
    <ol class="tips">
      <li><b>🗂 הסכמה</b> — 5 דקות. שבע טבלאות, ואיפה נמצא כל שדה (הסטטוס והתאריכים על <code dir="ltr">Shipments</code>, הקטגוריה על <code dir="ltr">Items</code>, הכמות על <code dir="ltr">ShipmentItems</code>).</li>
      <li><b>🅰 חלק א׳</b> — לענות על 11 השאלות. אחרי כל תשובה מופיעים: למה הנכונה נכונה, למה כל אחת מהאחרות שגויה, והכלל.</li>
      <li><b>🅱 חלק ב׳</b> — לכתוב לבד, <u>בלי להציץ</u>, SQL ואחר כך MongoDB, וללחוץ "בדוק". רק אחרי ניסיון — "הצג פתרון": הפתרון הרשמי, הנקודות החשובות, המלכודת ומקרי הקצה.</li>
      <li><b>🔁 תרגול נוסף</b> — 15 שאלות על אותה סכמה. הן הווריאציות: מה קורה כשהשאלה בבחינה שונה מעט מהמבחן לדוגמה.</li>
      <li><b>⏱ מצב מבחן</b> — בסוף: 150 דקות, בלי פתרונות ובלי בדיקה, וציון בסוף לפי כללי הבחינה האמיתית.</li>
      <li><b>🔀 תרגול ברמת המבחן</b> (לשונית נפרדת) — לכל שאלה כאן יש שם קבוצה של שאלות דומות, מעורבבות משתי הסכמות, ו-6 מבחנים מעורבבים במבנה הבחינה.</li>
    </ol>
  </div>

  <div class="card">
    <h3>✍ חמשת הצעדים לכל שאלה פתוחה</h3>
    ${tbl(['#','הצעד','מה בודקים'], [
      ['1','<b>מי בפלט?</b>','ובעיקר: האם צריך גם מי שאין לו כלום (מחסן בלי משלוחים, משלוח בלי אירועים)? אם כן — LEFT JOIN, ובמונגו $lookup בלי לאבד מערכים ריקים.'],
      ['2','<b>מזהים את הדפוס</b>','"אף…" = אנטי-צירוף · "כל ה… הם…" = כולם מקיימים · "האחרון של כל…" = ROW_NUMBER / $sort+$group+$first · "לכל… רק אם הסכום…" = GROUP BY + HAVING.'],
      ['3','<b>כותבים SQL</b>','מהטבלה שהישויות בפלט נמצאות בה, ואז הצירופים.'],
      ['4','<b>ממקמים כל תנאי</b>','תנאי על שורה — WHERE ($match לפני $group). תנאי על קבוצה — HAVING ($match אחרי $group). תנאי ששומר מי שאין לו — בתוך ה-ON.'],
      ['5','<b>מתרגמים למונגו ובודקים מלכודת</b>','NULL מול שדה חסר · COUNT(*) מול SUM · טווח תאריכים חצי-פתוח · $unwind שמוחק מערך ריק.'],
    ])}
    <p class="e2-note">החוברת המודפסת: מפת המבחן לדוגמה בעמ' 7, האמריקאיות בעמ' 8–13 והשאלות הפתוחות בעמ' 14–23.</p>
  </div>`;
}

function schemaHtml(){
  const D = window.SHIP;
  const rows = D.order.map(k => {
    const t = D.data[k];
    return [code(D.sqlNames[k]), code(k), `<span dir="ltr">${esc(t.cols.join(', '))}</span>`, String(t.rows.length),
            `<button class="btn ghost small" data-peek="${esc(D.sqlNames[k])}">👁 נתונים</button>`];
  });
  return `
  <div class="card">
    <h3>🗂 שבע הטבלאות — ובמונגו שבעה אוספים באותם שמות</h3>
    ${tbl(['טבלה ב-SQL','אוסף במונגו','שדות','שורות בדמה',''], rows)}
    <div id="sxPeek"></div>
    <h4>דוגמה למסמך משלוח במונגו</h4>
    <pre dir="ltr">{
  shipmentId: "SH100",
  customerId: "C10",
  warehouseId: "W02",
  courierId: "CR5",
  createdAt: ISODate("2026-10-10T08:00:00Z"),
  deliveredAt: null,
  shippingCost: 35,
  status: "InTransit"
}</pre>
    <p class="e2-note">כל הקשרים במונגו הם בהפניה: מזהה עסקי בשדה, ו-$lookup כדי לחבר. שום מערך אינו מוטמע במסמך.</p>
  </div>
  <div class="card">
    <h3>📌 ההנחות של המבחן — הן קובעות את המלכודות</h3>
    <ul class="tips">${ASSUMPTIONS.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
  </div>`;
}

/* ---------- חלק א׳ ---------- */
function mcqHtml(q){
  return `<div class="quiz-q e2-mcq" data-n="${q.n}">
    <div class="qnum">שאלה ${q.n} <span class="qtopic">${esc(q.topic)} · בחוברת עמ' ${PAGE_A[q.n]}</span></div>
    <div class="qtext">${esc(q.q)}</div>
    ${q.options.map((o, j) => `<button class="opt sx-opt" data-n="${q.n}" data-j="${j}"><span class="mark">${LET[j]}</span> ${esc(o)}</button>`).join('')}
    <div class="explain"></div></div>`;
}
function partAHtml(){
  return `
  <p class="subtitle">ענו על כל שאלה — ההסבר נפתח מיד. במבחן עונים על 8 מתוך 10, אבל כאן כדאי לעבור על כולן: כל שאלה היא נושא שעשוי לחזור.</p>
  <div class="sql-actions"><span class="muted-sm" id="sxAStat"></span>
    <button class="btn ghost small" id="sxAReset">↺ לענות מחדש</button></div>
  <div class="e2-mcq-list">${X().mcq.map(mcqHtml).join('')}</div>`;
}
function paintMcq(n, chosen){
  const q = X().mcq.find(x => x.n === n), card = $(`.e2-mcq[data-n="${n}"]`);
  if(!q || !card) return;
  $$('.opt', card).forEach(b => {
    const j = +b.dataset.j;
    b.classList.remove('sx-picked', 'correct', 'wrong');
    if(j === q.correct) b.classList.add('correct');
    else if(j === chosen) b.classList.add('wrong');
    b.disabled = true;
  });
  const ok = chosen === q.correct, ex = $('.explain', card);
  ex.className = 'explain show' + (ok ? ' ok-exp' : '');
  ex.innerHTML = `<b>${ok ? '✓ נכון' : chosen < 0 ? '— לא נענתה' : '✗ לא נכון'}</b> — התשובה הנכונה היא <b>${LET[q.correct]}</b>. ${esc(q.why)}
    <div style="margin-top:6px"><b>למה האחרות שגויות:</b> ${esc(q.wrong)}</div>
    <div style="margin-top:6px"><b>הכלל:</b> ${esc(q.rule)}</div>`;
}
function unpaintMcq(card){
  $$('.opt', card).forEach(b => { b.classList.remove('sx-picked', 'correct', 'wrong'); b.disabled = false; });
  const ex = $('.explain', card); ex.className = 'explain'; ex.innerHTML = '';
}
function paintAStat(){
  const el = $('#sxAStat'); if(!el) return;
  const m = prog().mcq, all = X().mcq;
  const done = all.filter(q => m[q.n] !== undefined).length, right = all.filter(q => m[q.n] === q.correct).length;
  el.innerHTML = `ענית על <b>${done}</b> מתוך ${all.length}, נכון ב-<b>${right}</b>`;
}

/* ---------- חלק ב׳ ותרגול ---------- */
function qCard(q, off){
  const key = off ? String(q.n) : q.id;
  const d = (off ? prog().b : prog().p)[key] || {};
  const mk = (k, t) => `<span class="badge-pill ${d[k] ? 'good' : ''}" data-mark="${k}">${t} ${d[k] ? '✓' : ''}</span>`;
  const sol = off ? `
      <div class="sol-label">✅ הפתרון הרשמי של המרצה — SQL:</div><pre dir="ltr">${esc(q.sql)}</pre>
      <div class="sol-label">✅ הפתרון הרשמי של המרצה — MongoDB:</div><pre dir="ltr">${esc(q.mongo)}</pre>
      <p><b>📌 הנקודות החשובות בפתרון הרשמי:</b></p><ul class="tips">${q.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      <p><b>הלוגיקה:</b> ${esc(q.logic)}</p>
      <p><b>⚠ המלכודת:</b> ${esc(q.trap)}</p>
      <p><b>מקרי הקצה בנתונים:</b> ${esc(q.edge)}</p>
      <p><b>משפט ההשוואה SQL ↔ MongoDB:</b> ${esc(q.compare)}</p>
      <details><summary>🔁 פתרון חלופי — אותה תוצאה בדיוק, בדרך אחרת</summary>
        <div class="sol-label">SQL:</div><pre dir="ltr">${esc(q.altSql)}</pre>
        <div class="sol-label">MongoDB:</div><pre dir="ltr">${esc(q.altMongo)}</pre></details>
      <p class="e2-note">בחוברת המודפסת: עמ' ${PAGE_B[q.n]} · וריאציות: ${esc(q.variant.v)} (כרטיסים ${esc(q.variant.card)})</p>` : `
      <div class="sol-label">✅ פתרון SQL:</div><pre dir="ltr">${esc(q.sql)}</pre>
      <div class="sol-label">✅ פתרון MongoDB:</div><pre dir="ltr">${esc(q.mongo)}</pre>
      <p><b>הלוגיקה:</b> ${esc(q.logic)}</p>
      <p><b>⚠ המלכודת:</b> ${esc(q.trap)}</p>`;
  return `
  <div class="card e2-q" id="${off ? 'sxb-' + q.n : 'sxp-' + q.id}" data-key="${esc(key)}" data-off="${off ? 1 : 0}">
    <h3>${off ? `שאלה ${q.n}` : esc(q.id)} · ${esc(q.title)} ${off ? '<span class="badge-pill">8 נק\'</span>' : ''} ${mk('sql', 'SQL')} ${mk('mongo', 'Mongo')}</h3>
    <p class="e2-prompt">${esc(q.q)}</p>
    ${q.keywords ? `<details class="sx-study"><summary>🔑 מילות המפתח — איך מזהים את הדפוס</summary><p>${esc(q.keywords)}</p></details>` : ''}
    <details class="sx-study"><summary>⚠ המלכודת</summary><p>${esc(q.trap)}</p></details>
    <div class="dual-grid">
      <div class="dual-col"><div class="col-title">💾 SQL (T-SQL)</div>
        <textarea class="code-input" data-in="sql" spellcheck="false" placeholder="SELECT …"></textarea></div>
      <div class="dual-col"><div class="col-title">🍃 MongoDB</div>
        <textarea class="code-input" data-in="mongo" spellcheck="false" placeholder="db.shipments.find({ … })"></textarea></div>
    </div>
    <div class="sql-actions" style="margin-top:10px">
      <button class="btn ok-btn sx-study" data-act="check">✓ בדוק</button>
      <button class="btn ghost small sx-study" data-act="run">▶ הרץ בלי לבדוק</button>
      <button class="btn ghost small sx-study" data-act="sol">👁 הצג פתרון</button>
      <button class="btn ghost small" data-act="clear">🗑 נקה</button>
    </div>
    <div class="feedback" data-fb="sql"></div><div data-notes="sql"></div><div class="result-wrap slim" data-res="sql"></div>
    <div class="feedback" data-fb="mongo"></div><div class="result-wrap slim" data-res="mongo"></div>
    <div class="sol-wrap hidden" data-sol>${sol}</div>
  </div>`;
}
function partBHtml(){
  return `<p class="subtitle">לכל שאלה כותבים <b>שני פתרונות</b>. ה-SQL רץ על SQLite בדפדפן (אחרי המרה מתחביר SQL Server), והמונגו על סימולטור mingo — שניהם על נתוני דמה שנבנו כך שכל מלכודת בשאלה תתפוס פתרון שגוי. הבדיקה משווה מול <b>הפתרון הרשמי של המרצה</b>, שורה מול שורה.</p>
    ${X().open.map(q => qCard(q, true)).join('')}`;
}
function practiceHtml(){
  return `<p class="subtitle">15 שאלות על אותה סכמה, שמכסות את השינויים הסבירים בבחינה: אנטי-צירוף בלי תקופה, LEFT JOIN עם אפסים, TOP, ממוצע, סכום מחושב, האחרון לכל קבוצה רק למי שיש, COUNT DISTINCT ועוד. כל הפתרונות הורצו בשני המנועים.</p>
    ${X().practice.map(q => qCard(q, false)).join('')}`;
}

function mapHtml(){
  const P = X().practice;
  const pt = id => { const p = P.find(x => x.id === id); return p ? `<button class="btn ghost small" data-jump="sxp-${p.id}">${p.id} · ${esc(p.title)}</button>` : ''; };
  return `
  <div class="card">
    <h3>🅰 חלק א׳ — הנושא של כל שאלה</h3>
    ${tbl(['#','הנושא','תשובה','בחוברת'], X().mcq.map(q => [`<button class="btn ghost small" data-jump-a="${q.n}">${q.n}</button>`, esc(q.topic), `<b>${LET[q.correct]}</b>`, `עמ' ${PAGE_A[q.n]}`]))}
  </div>
  <div class="card">
    <h3>🅱 חלק ב׳ — מה עשוי להשתנות בבחינה, ואיפה מתרגלים את זה</h3>
    <p class="e2-note">המרצה אמר שהבחינה דומה מאוד. כלומר: אותם דפוסים, וסביר שתנאי, תקופה או סף ישתנו. לכל שאלה — מה עשוי להשתנות, הכרטיס בחוברת המודפסת, ושאלת התרגול כאן שמכסה את השינוי.</p>
    ${tbl(['#','השאלה','מה עשוי להשתנות','בחוברת','תרגול כאן'], X().open.map(q => [
      `<button class="btn ghost small" data-jump="sxb-${q.n}">${q.n}</button>`, esc(q.title), esc(q.variant.v),
      `עמ' ${PAGE_B[q.n]}<br><span class="e2-note">${esc(q.variant.card)}</span>`, q.variant.p.map(pt).join(' ')]))}
  </div>`;
}

/* ============================================================
   ציון ומצב מבחן
   ============================================================ */
function paintScore(){
  const el = $('#sxScore'); if(!el) return;
  const S = prog(), Q = X();
  const a = Q.mcq.filter(q => S.mcq[q.n] === q.correct).length;
  const b = Q.open.filter(q => (S.b[q.n] || {}).sql && (S.b[q.n] || {}).mongo).length;
  const p = Q.practice.filter(q => (S.p[q.id] || {}).sql && (S.p[q.id] || {}).mongo).length;
  const last = S.exams[S.exams.length - 1];
  el.innerHTML = `חלק א׳ <b>${a}/${Q.mcq.length}</b> · חלק ב׳ בשני הפתרונות <b>${b}/${Q.open.length}</b> · תרגול <b>${p}/${Q.practice.length}</b>${last ? ` · מבחן אחרון: <b>${last.score}</b>` : ''}`;
}
function setTab(t){
  tab = t;
  $$('#sxTabs button').forEach(b => b.classList.toggle('active', b.dataset.t === t));
  $$('.sx-pane').forEach(p => p.classList.toggle('hidden', p.dataset.pane !== t));
}
function tick(){
  const left = Math.max(0, examEnd - Date.now()), s = Math.floor(left / 1000);
  const el = $('#sxTimer');
  el.textContent = [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map(x => String(x).padStart(2, '0')).join(':');
  el.classList.toggle('warn', left < 15 * 60000);
  if(!left) finishExam(true);
}
function startExam(){
  if(!confirm('מצב מבחן: 150 דקות, בלי פתרונות, בלי בדיקה ובלי הרצה — כמו על דף. בסוף מקבלים ציון לפי כללי הבחינה. להתחיל?')) return;
  examOn = true;
  Object.keys(examMcq).forEach(k => delete examMcq[k]);
  $('#view-ship').classList.add('sx-exam');
  $$('.e2-mcq').forEach(unpaintMcq);
  $$('#view-ship [data-sol]').forEach(s => s.classList.add('hidden'));
  $$('#view-ship .e2-q[data-off="1"] textarea').forEach(t => { t.value = ''; t.className = 'code-input'; });
  $$('#view-ship .e2-q .feedback').forEach(f => f.className = 'feedback');
  $$('#view-ship .e2-q [data-res], #view-ship .e2-q [data-notes]').forEach(r => r.innerHTML = '');
  $('#sxExamRes').innerHTML = '<div class="feedback info show">⏱ המבחן התחיל. חלק א׳ ולאחריו חלק ב׳. התשובות נבדקות רק בסוף.</div>';
  $('#sxExamBtn').classList.add('hidden'); $('#sxFinishBtn').classList.remove('hidden'); $('#sxTimer').classList.remove('hidden');
  examEnd = Date.now() + EXAM_MINUTES * 60000;
  tick(); examTick = setInterval(tick, 1000);
  setTab('a'); window.scrollTo(0, 0);
}
function finishExam(timeUp){
  if(!examOn) return;
  if(!timeUp && !confirm('לסיים את המבחן ולקבל ציון?')) return;
  clearInterval(examTick); examOn = false;
  A().ensureEngines().then(() => {
    const Q = X(), S = prog();
    /* חלק א׳: הטובות מבין התשובות, עד 8 שאלות × 6 */
    Q.mcq.forEach(q => { const j = examMcq[q.n]; paintMcq(q.n, typeof j === 'number' ? j : -1); if(typeof j === 'number') S.mcq[q.n] = j; });
    const aRight = Q.mcq.filter(q => examMcq[q.n] === q.correct).length;
    const aPts = Math.min(aRight, 8) * 6;
    /* חלק ב׳: 8 לשאלה עם שני פתרונות נכונים, 4 לשאלה עם אחד; 7 הטובות */
    const per = Q.open.map(q => {
      const card = $('#sxb-' + q.n);
      const gs = checkSql(q, $('[data-in="sql"]', card).value), gm = checkMongo(q, $('[data-in="mongo"]', card).value);
      showCheck(card, gs, gm);
      S.b[q.n] = S.b[q.n] || {}; if(gs.ok) S.b[q.n].sql = true; if(gm.ok) S.b[q.n].mongo = true;
      return { n:q.n, pts: (gs.ok ? 4 : 0) + (gm.ok ? 4 : 0), s:gs.ok, m:gm.ok };
    });
    const bPts = per.map(x => x.pts).sort((a, b) => b - a).slice(0, 7).reduce((a, b) => a + b, 0);
    const score = Math.min(100, aPts + bPts);
    S.exams.push({ at: Date.now(), score, a: aRight, b: per.filter(x => x.s && x.m).length });
    save();
    $('#view-ship').classList.remove('sx-exam');
    $('#sxExamBtn').classList.remove('hidden'); $('#sxFinishBtn').classList.add('hidden'); $('#sxTimer').classList.add('hidden');
    $('#sxExamRes').innerHTML = `<div class="card ${score >= 70 ? 'ok-box' : 'emph-box'}">
      <h3>${timeUp ? '⏰ הזמן נגמר. ' : ''}הציון שלך: ${score}</h3>
      <div class="muted-sm">חלק א׳: ${aRight} נכונות מתוך 11 → ${Math.min(aRight, 8)} × 6 = <b>${aPts}</b> (נספרות עד 8 שאלות)</div>
      <div class="muted-sm">חלק ב׳: ${per.map(x => `${x.n}${x.s && x.m ? '✓' : x.s || x.m ? '½' : '✗'}`).join(' · ')} → 7 הטובות = <b>${bPts}</b> (8 לשאלה עם שני פתרונות נכונים, 4 עם אחד)</div>
      <div class="e2-note">הציון מחמיר ביחס לבחינה: כאן פתרון נחשב נכון רק אם התוצאה שלו זהה לגמרי לפתרון הרשמי, ואין ניקוד חלקי על לוגיקה נכונה עם טעות קטנה. עכשיו אפשר לפתוח את הפתרון בכל שאלה ("👁 הצג פתרון") ולהשוות.</div></div>`;
    paintScore(); paintAStat(); refreshMarks();
    window.scrollTo(0, 0);
  });
}

/* ============================================================
   חיווט
   ============================================================ */
function showCheck(card, gs, gm){
  A().fb($('[data-fb="sql"]', card), gs.kind, '<b>SQL:</b> ' + gs.msg);
  $('[data-notes="sql"]', card).innerHTML = A().notesHtml(gs.notes);
  $('[data-res="sql"]', card).innerHTML = gs.result ? '<h4>התוצאה שלך (SQL):</h4>' + A().resultTable(gs.result, 12) : '';
  A().fb($('[data-fb="mongo"]', card), gm.kind, '<b>MongoDB:</b> ' + gm.msg);
  $('[data-res="mongo"]', card).innerHTML = gm.mres ? '<h4>התוצאה שלך (MongoDB):</h4>' + mongoOut(gm.mres) : '';
  const tS = $('[data-in="sql"]', card), tM = $('[data-in="mongo"]', card);
  tS.classList.toggle('ok-border', !!gs.ok); tS.classList.toggle('bad-border', gs.kind === 'err');
  tM.classList.toggle('ok-border', !!gm.ok); tM.classList.toggle('bad-border', gm.kind === 'err');
}
function refreshMarks(){
  const S = prog();
  $$('#view-ship .e2-q').forEach(card => {
    const d = (card.dataset.off === '1' ? S.b : S.p)[card.dataset.key] || {};
    ['sql', 'mongo'].forEach(k => {
      const el = $(`[data-mark="${k}"]`, card);
      el.classList.toggle('good', d[k] === true);
      el.classList.toggle('miss', d[k] === false);
      el.textContent = (k === 'sql' ? 'SQL ' : 'Mongo ') + (d[k] === true ? '✓' : d[k] === false ? '✗' : '');
    });
  });
}
function wireCard(card){
  const off = card.dataset.off === '1', key = card.dataset.key;
  const q = off ? X().open.find(x => String(x.n) === key) : X().practice.find(x => x.id === key);
  const tS = $('[data-in="sql"]', card), tM = $('[data-in="mongo"]', card);
  const doCheck = () => {
    if(examOn) return;
    A().ensureEngines().then(() => {
      const gs = checkSql(q, tS.value), gm = checkMongo(q, tM.value);
      showCheck(card, gs, gm);
      const S = prog(), box = off ? S.b : S.p; box[key] = box[key] || {};
      if(tS.value.trim()) box[key].sql = !!gs.ok;
      if(tM.value.trim()) box[key].mongo = !!gm.ok;
      save(); refreshMarks(); paintScore();
    });
  };
  $('[data-act="check"]', card).onclick = doCheck;
  $('[data-act="run"]', card).onclick = () => { if(examOn) return; A().ensureEngines().then(() => {
    if(tS.value.trim()){
      const u = runSql(tS.value);
      if(u.error) A().fb($('[data-fb="sql"]', card), 'err', '<b>SQL:</b> ' + esc(u.error));
      else { A().fb($('[data-fb="sql"]', card), 'info', `<b>SQL:</b> רצה בהצלחה — ${u.r.rows.length} שורות.`);
             $('[data-notes="sql"]', card).innerHTML = A().notesHtml(u.r.notes);
             $('[data-res="sql"]', card).innerHTML = '<h4>התוצאה (SQL):</h4>' + A().resultTable(u.r, 12); }
    }
    if(tM.value.trim()){
      const sim = mongoSim();
      if(!sim) return A().fb($('[data-fb="mongo"]', card), 'info', '<b>MongoDB:</b> המנוע עוד נטען — נסו שוב בעוד רגע.');
      const r = sim.run(tM.value);
      if(!r.ok) A().fb($('[data-fb="mongo"]', card), 'err', '<b>MongoDB:</b> ' + esc(r.error));
      else { A().fb($('[data-fb="mongo"]', card), 'info', '<b>MongoDB:</b> רצה בהצלחה.');
             $('[data-res="mongo"]', card).innerHTML = '<h4>התוצאה (MongoDB):</h4>' + mongoOut(r); }
    }
  }); };
  $('[data-act="sol"]', card).onclick = () => {
    if(examOn) return;
    const box = $('[data-sol]', card); box.classList.toggle('hidden');
    $('[data-act="sol"]', card).textContent = box.classList.contains('hidden') ? '👁 הצג פתרון' : '🙈 הסתר פתרון';
  };
  $('[data-act="clear"]', card).onclick = () => {
    tS.value = ''; tM.value = ''; tS.className = 'code-input'; tM.className = 'code-input';
    $$('.feedback', card).forEach(f => f.className = 'feedback');
    $$('[data-res], [data-notes]', card).forEach(r => r.innerHTML = '');
  };
  A().editorKeys(tS, doCheck); A().editorKeys(tM, doCheck);
}
function wire(){
  $$('#sxTabs button').forEach(b => b.onclick = () => { setTab(b.dataset.t); go($('#sxTabs')); });
  $('#sxExamBtn').onclick = startExam;
  $('#sxFinishBtn').onclick = () => finishExam(false);

  /* חלק א׳ */
  $$('#view-ship .sx-opt').forEach(b => b.onclick = () => {
    const n = +b.dataset.n, j = +b.dataset.j;
    if(examOn){
      examMcq[n] = j;
      $$(`.e2-mcq[data-n="${n}"] .opt`).forEach(o => o.classList.toggle('sx-picked', +o.dataset.j === j));
      return;
    }
    prog().mcq[n] = j; save();
    paintMcq(n, j); paintAStat(); paintScore();
  });
  $('#sxAReset').onclick = () => {
    if(examOn) return;
    const S = prog(); S.mcq = {}; save();
    $$('.e2-mcq').forEach(unpaintMcq); paintAStat(); paintScore();
  };
  const m = prog().mcq;
  X().mcq.forEach(q => { if(m[q.n] !== undefined) paintMcq(q.n, m[q.n]); });

  /* חלק ב׳ ותרגול */
  $$('#view-ship .e2-q').forEach(wireCard);

  /* תצוגת נתוני טבלה */
  $$('#view-ship [data-peek]').forEach(b => b.onclick = () => A().ensureEngines().then(() => {
    const t = b.dataset.peek, u = runSql(`SELECT * FROM ${t};`);
    $('#sxPeek').innerHTML = u.error ? `<div class="feedback err show">${esc(u.error)}</div>`
      : `<h4 dir="ltr">${esc(t)}</h4>` + A().resultTable(u.r, 40);
  }));

  /* קפיצה מהמפה */
  $$('#view-ship [data-jump]').forEach(b => b.onclick = () => {
    const id = b.dataset.jump; setTab(id.startsWith('sxb-') ? 'b' : 'p');
    go(document.getElementById(id));
  });
  $$('#view-ship [data-jump-a]').forEach(b => b.onclick = () => {
    setTab('a'); go($(`.e2-mcq[data-n="${b.dataset.jumpA}"]`));
  });
}

/* גלילה לאלמנט מתחת לכותרת הדביקה של העמוד */
function go(el){
  if(!el) return;
  const h = document.querySelector('header'), off = h && getComputedStyle(h).position === 'sticky' ? h.getBoundingClientRect().height : 0;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off - 12, behavior: 'smooth' });
}

/* ============================================================
   API
   ============================================================ */
function render(){
  const box = $('#view-ship');
  if(!box) return;
  if(built){ paintScore(); return; }
  if(!register()){ box.innerHTML = '<div class="card">שגיאה: נתוני מבחן המשלוחים (ship-data.js / ship-exam.js) לא נטענו.</div>'; return; }
  box.innerHTML = `<div class="e2-wrap">${headHtml()}
    <div class="sx-pane" data-pane="about">${aboutHtml()}</div>
    <div class="sx-pane" data-pane="schema">${schemaHtml()}</div>
    <div class="sx-pane" data-pane="a">${partAHtml()}</div>
    <div class="sx-pane" data-pane="b">${partBHtml()}</div>
    <div class="sx-pane" data-pane="p">${practiceHtml()}</div>
    <div class="sx-pane" data-pane="map">${mapHtml()}</div></div>`;
  built = true;
  wire(); setTab(tab); paintAStat(); paintScore(); refreshMarks();
  if(A().ensureEngines) A().ensureEngines();
}

window.SHIPVIEW = { render, _check: { checkSql, checkMongo } };
})();
