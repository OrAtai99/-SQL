/* ============================================================
   פורטל 3964 — 🔀 תרגול ברמת המבחן
   כל מאגרי התרגול, מסודרים לפי המבחן האחרון (סכמת המשלוחים):
   חלק ב׳ — 10 משבצות (9 שאלות המבחן + שאלה עשירית), ובכל אחת שאלות
            דומות משתי הסכמות, מעורבבות. חלק א׳ — 10 נושאים.
   מבחנים — 6 מבחנים מעורבבים במבנה הבחינה, 150 דקות, עם ציון.
   הנתונים (js/mix-exam.js, MIXX) נטענים רק כשנכנסים ללשונית.
   תלוי ב: sql-app.js (SQLAPP), ship-data.js (SHIP), exam2-data.js (EXAM2),
           grader.js (Grader), mongo-sim.js (MongoSim)
   ============================================================ */
(function(){
'use strict';
const A  = () => window.SQLAPP;
const X  = () => window.MIXX;
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LET = ['א','ב','ג','ד'];
const EXAM_MINUTES = 150;
const DATA = { ship: () => window.SHIP, exam2: () => window.EXAM2 };
const SCHEMA_NAME = { ship:'🚚 משלוחים', exam2:'🎓 מכללה' };
const SRC_NAME = { official:'⭐ המבחן האחרון', ship:'תרגול משלוחים', bank:'בנק המכללה', college:'מבחן המכללה', extra:'דפוס נוסף', new:'🆕 חדשה' };

/* ============================================================
   טעינת הנתונים ורישום שתי הסכמות במנועים
   ============================================================ */
let loading = null;
function loadData(){
  if(X()) return Promise.resolve();
  if(loading) return loading;
  const me = document.querySelector('script[src*="mix-view.js"]');
  const ver = me && me.src.includes('?') ? '?' + me.src.split('?')[1] : '';
  loading = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'js/mix-exam.js' + ver; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
  return loading;
}
function register(){
  const S = window.SQLC;
  if(!S || !window.SHIP || !window.EXAM2) return false;
  S.schemas = S.schemas || {}; S.tables = S.tables || {}; S.schemaInfo = S.schemaInfo || {};
  S.nosql = S.nosql || {}; S.nosql.datasets = S.nosql.datasets || {};
  if(!S.schemas.ship){
    const D = window.SHIP;
    S.schemas.ship = D.buildSql();
    S.tables.ship = D.order.map(k => ({ name: D.sqlNames[k], cols: D.data[k].cols.join(', ') }));
    S.schemaInfo.ship = { title: 'סכמת המשלוחים — המבחן לדוגמה האחרון' };
    S.nosql.datasets.ship = D.buildMongo();
  }
  if(!S.schemas.exam2){
    const E = window.EXAM2;
    S.schemas.exam2 = E.buildSql();
    S.tables.exam2 = E.order.map(k => ({ name: E.sqlNames[k], cols: E.data[k].cols.join(', ') }));
    S.schemaInfo.exam2 = { title: 'סכמת מבחן 2026 — מערכת המכללה' };
    S.nosql.datasets.exam2 = E.buildMongo();
  }
  return true;
}

/* ============================================================
   בדיקה — כמו בלשונית המבחן האחרון, אבל לפי הסכמה של כל שאלה
   ============================================================ */
const isDate = v => v instanceof Date || (v && typeof v === 'object' && Object.prototype.toString.call(v) === '[object Date]');
function cell(v){
  if(v === null || v === undefined) return '∅';
  if(isDate(v)) return new Date(v.getTime()).toISOString().slice(0, 16);
  if(typeof v === 'boolean') return v ? '1' : '0';
  if(typeof v === 'number') return String(Math.round(v * 1000) / 1000);
  const s = String(v).trim();
  const dt = /^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}:\d{2}))?/.exec(s);
  if(dt && (s.length === 10 || dt[2])) return dt[1] + 'T' + (dt[2] || '00:00');
  if(s !== '' && !isNaN(Number(s))) return String(Math.round(Number(s) * 1000) / 1000);
  return s;
}
const rowKey = r => r.map(cell).join(' │ ');
function sameRows(a, b, ordered){
  const P = a.map(rowKey), Q = b.map(rowKey);
  if(!ordered){ P.sort(); Q.sort(); }
  return P.length === Q.length && P.every((x, i) => x === Q[i]);
}
const runSql = (q, code) => A().runSqlUI(q.schema, code);
const mongoSim = q => window.mingo ? new window.MongoSim(window.mingo, DATA[q.schema]().buildMongo()) : null;
const solName = q => q.src === 'official' ? 'הרשמי' : 'המובנה';
const why = (more, q) => {
  const tip = q.edge || q.trap || '';
  return tip ? `<div class="e2-hint">💡 ${more ? 'יותר מהצפוי' : 'פחות מהצפוי'} — ${esc(tip)}</div>` : '';
};
function checkSql(q, code){
  if(!String(code || '').trim()) return { ok:false, kind:'info', msg:'כתבו את שאילתת ה-SQL לפני הבדיקה.' };
  const u = runSql(q, code);
  if(u.error) return { ok:false, kind:'err', msg:'שגיאה בשאילתה: ' + esc(u.error) };
  const s = runSql(q, q.sql);
  if(s.error) return { ok:false, kind:'err', msg:'שגיאה בפתרון המובנה: ' + esc(s.error) };
  const ordered = window.Grader.sqlOrdered(q.sql);
  const ok = u.r.columns.length === s.r.columns.length && sameRows(u.r.rows, s.r.rows, ordered);
  let msg;
  if(ok) msg = `✓ נכון! ${u.r.rows.length} שורות — זהה לפתרון ${solName(q)}.`;
  else if(u.r.columns.length !== s.r.columns.length)
    msg = `✗ החזרת ${u.r.columns.length} עמודות, והפתרון מחזיר ${s.r.columns.length}: <code dir="ltr">${esc(s.r.columns.join(', '))}</code>`;
  else if(u.r.rows.length !== s.r.rows.length)
    msg = `✗ קיבלת <b>${u.r.rows.length}</b> שורות, והצפוי הוא <b>${s.r.rows.length}</b>.` + why(u.r.rows.length > s.r.rows.length, q);
  else msg = `✗ מספר השורות נכון (${u.r.rows.length}) אבל התוכן שונה.<div class="e2-hint">💡 ${ordered ? 'גם הסדר נבדק כאן — בדקו את ה-ORDER BY. ' : ''}בדקו את הערכים ואת סדר העמודות.</div>`;
  return { ok, kind: ok ? 'ok' : 'err', msg, result: u.r, notes: u.r.notes };
}
/* שדה חסר ושדה עם null הם אותו דבר בפלט, כמו NULL ב-SQL */
function mongoEq(u, s, ordered, cols){
  if(window.Grader.mongoSame(u, s, 'values', ordered)) return true;
  if(!Array.isArray(u) || !Array.isArray(s) || !cols) return false;
  const rows = docs => docs.map(d => cols.map(c => (d == null || d[c] === undefined) ? null : d[c]));
  return sameRows(rows(u), rows(s), ordered);
}
function checkMongo(q, code){
  if(!String(code || '').trim()) return { ok:false, kind:'info', msg:'כתבו את פקודת המונגו לפני הבדיקה.' };
  const su = mongoSim(q), ss = mongoSim(q);
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
  if(ok) msg = `✓ נכון! ${un === null ? '' : un + ' מסמכים — '}זהה לפתרון ${solName(q)}.`;
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
let built = false, tab = 'about', slotSel = 'S12', famSel = 'T1';
let exam = null;            /* { id, end, tick, mcq:{} } בזמן מבחן */
function prog(){
  const P = A().prog(); P.mix = P.mix || {};
  const M = P.mix; M.a = M.a || {}; M.b = M.b || {}; M.ex = M.ex || {};
  return M;
}
const save = () => A().save();

/* ============================================================
   רינדור — רכיבים
   ============================================================ */
function tbl(head, rows){
  return `<div class="e2-tbl-wrap"><table class="mini"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${
    rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function schemaBox(schema){
  const D = DATA[schema]();
  return `<details class="mx-schema"><summary>🗂 הטבלאות של סכמת ה${schema === 'ship' ? 'משלוחים' : 'מכללה'}</summary>
    ${tbl(['טבלה ב-SQL','אוסף במונגו','שדות'], D.order.map(k => [`<code dir="ltr">${esc(D.sqlNames[k])}</code>`, `<code dir="ltr">${esc(k)}</code>`, `<span dir="ltr">${esc(D.data[k].cols.join(', '))}</span>`]))}</details>`;
}
const badge = q => `<span class="badge-pill mx-sch-${q.schema}">${SCHEMA_NAME[q.schema]}</span><span class="badge-pill">${SRC_NAME[q.src]}</span>`;
/* איפה השאלה בחוברת המודפסת — או באיזה כרטיס נעזרים כשהיא אינה שם. מוסתר בזמן מבחן */
function bookLine(q){
  if(q.book) return `<div class="mx-study mx-book in">📖 <b>בחוברת, עמ' ${q.book.page}</b> — ${esc(q.book.where)}. שווה לנסות לבד לפני שמציצים.</div>`;
  if(q.card) return `<div class="mx-study mx-book out">✍ <b>לא מודפסת בחוברת.</b> פותרים בעזרת כרטיס <b>${esc(q.card.code)}</b> — ${esc(q.card.title)}, עמ' ${q.card.page}.</div>`;
  if(q.hint) return `<div class="mx-study mx-book out">✍ <b>לא מודפסת בחוברת.</b> נעזרים בשאלת המקור באותו נושא — ${q.hint.anchors.map(a => `שאלה ${a.n} (עמ' ${a.page})`).join(', ')} — ובכללי הפסילה בעמ' ${q.hint.rules}.</div>`;
  return '';
}

/* כרטיס שאלה פתוחה. prefix מבדיל בין התרגול לבין המבחן — אותה שאלה יכולה להופיע בשניהם */
function qCard(q, prefix, label){
  const d = prog().b[q.id] || {};
  const mk = (k, t) => `<span class="badge-pill ${d[k] ? 'good' : ''}" data-mark="${k}">${t} ${d[k] ? '✓' : d[k] === false ? '✗' : ''}</span>`;
  const official = q.src === 'official';
  return `
  <div class="card e2-q ${official ? 'mx-anchor' : ''}" id="${prefix}-${esc(q.id)}" data-qid="${esc(q.id)}">
    <h3>${label ? esc(label) + ' · ' : ''}${esc(q.title)} ${badge(q)} ${mk('sql', 'SQL')} ${mk('mongo', 'Mongo')}</h3>
    <p class="e2-prompt">${esc(q.q)}</p>
    ${bookLine(q)}
    ${schemaBox(q.schema)}
    ${q.keywords ? `<details class="mx-study"><summary>🔑 מילות המפתח — איך מזהים את הדפוס</summary><p>${esc(q.keywords)}</p></details>` : ''}
    <details class="mx-study"><summary>⚠ המלכודת</summary><p>${esc(q.trap)}</p></details>
    <div class="dual-grid">
      <div class="dual-col"><div class="col-title">💾 SQL (T-SQL)</div>
        <textarea class="code-input" data-in="sql" spellcheck="false" placeholder="SELECT …"></textarea></div>
      <div class="dual-col"><div class="col-title">🍃 MongoDB</div>
        <textarea class="code-input" data-in="mongo" spellcheck="false" placeholder="db.${q.schema === 'ship' ? 'shipments' : 'enrollments'}.aggregate([ … ])"></textarea></div>
    </div>
    <div class="sql-actions" style="margin-top:10px">
      <button class="btn ok-btn mx-study" data-act="check">✓ בדוק</button>
      <button class="btn ghost small mx-study" data-act="run">▶ הרץ בלי לבדוק</button>
      <button class="btn ghost small mx-study" data-act="sol">👁 הצג פתרון</button>
      <button class="btn ghost small" data-act="clear">🗑 נקה</button>
    </div>
    <div class="feedback" data-fb="sql"></div><div data-notes="sql"></div><div class="result-wrap slim" data-res="sql"></div>
    <div class="feedback" data-fb="mongo"></div><div class="result-wrap slim" data-res="mongo"></div>
    <div class="sol-wrap hidden" data-sol>
      <div class="sol-label">✅ פתרון ${official ? 'רשמי של המרצה' : ''} — SQL:</div><pre dir="ltr">${esc(q.sql)}</pre>
      <div class="sol-label">✅ פתרון ${official ? 'רשמי של המרצה' : ''} — MongoDB:</div><pre dir="ltr">${esc(q.mongo)}</pre>
      ${q.points ? `<p><b>📌 הנקודות החשובות בפתרון הרשמי:</b></p><ul class="tips">${q.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
      <p><b>הלוגיקה:</b> ${esc(q.logic)}</p>
      <p><b>⚠ המלכודת:</b> ${esc(q.trap)}</p>
      ${q.edge ? `<p><b>מקרי הקצה בנתונים:</b> ${esc(q.edge)}</p>` : ''}
      ${q.compare ? `<p><b>משפט ההשוואה SQL ↔ MongoDB:</b> ${esc(q.compare)}</p>` : ''}
    </div>
  </div>`;
}
function mcqCard(q, prefix, label){
  return `<div class="quiz-q e2-mcq ${q.src === 'official' ? 'mx-anchor' : ''}" id="${prefix}-${esc(q.id)}" data-qid="${esc(q.id)}">
    <div class="qnum">${esc(label)} <span class="qtopic">${q.src === 'official' ? '⭐ מהמבחן האחרון, שאלה ' + q.n : SRC_NAME[q.src]}</span></div>
    <div class="qtext">${esc(q.q)}</div>
    ${bookLine(q)}
    ${q.options.map((o, j) => `<button class="opt mx-opt" data-j="${j}"><span class="mark">${LET[j]}</span> ${esc(o)}</button>`).join('')}
    <div class="explain"></div></div>`;
}
function paintMcq(card, q, chosen){
  $$('.opt', card).forEach(b => {
    const j = +b.dataset.j;
    b.classList.remove('mx-picked', 'correct', 'wrong');
    if(j === q.correct) b.classList.add('correct');
    else if(j === chosen) b.classList.add('wrong');
    b.disabled = true;
  });
  const ok = chosen === q.correct, ex = $('.explain', card);
  ex.className = 'explain show' + (ok ? ' ok-exp' : '');
  ex.innerHTML = `<b>${ok ? '✓ נכון' : chosen < 0 ? '— לא נענתה' : '✗ לא נכון'}</b> — התשובה הנכונה היא <b>${LET[q.correct]}</b>. ` + (q.why
    ? `${esc(q.why)}<div style="margin-top:6px"><b>למה האחרות שגויות:</b> ${esc(q.wrong)}</div><div style="margin-top:6px"><b>הכלל:</b> ${esc(q.rule)}</div>`
    : esc(q.explain));
}
function unpaintMcq(card){
  $$('.opt', card).forEach(b => { b.classList.remove('mx-picked', 'correct', 'wrong'); b.disabled = false; });
  const ex = $('.explain', card); ex.className = 'explain'; ex.innerHTML = '';
}

/* ============================================================
   הלשוניות
   ============================================================ */
function headHtml(){
  const M = X();
  return `
  <h2 class="view-title">🔀 תרגול ברמת המבחן — כל השאלות, מסודרות לפי המבחן האחרון</h2>
  <p class="subtitle">כל מאגרי התרגול של הקורס, מסודרים מחדש סביב <b>המבחן לדוגמה האחרון</b>. לכל אחת מ-9 השאלות הפתוחות שבו יש כאן "משבצת": שאלות דומות באותו דפוס ובאותה רמה, <b>מעורבבות משתי הסכמות</b> — משלוחים ומכללה. כך מתרגלים לזהות את הדפוס, ולא לזכור תשובה. ${Object.keys(M.open).length} שאלות פתוחות, ${Object.keys(M.mcq).length} אמריקאיות ו-${M.exams.length} מבחנים מעורבבים.</p>
  <div class="e2-bar">
    <span id="mxTimer" class="exam-timer hidden">02:30:00</span>
    <button class="btn ghost small hidden" id="mxFinishBtn">סיים וקבל ציון</button>
    <span class="muted-sm" id="mxScore"></span>
  </div>
  <div class="chip-row sx-tabs" id="mxTabs">
    <button data-t="about">🧭 איך זה בנוי</button>
    <button data-t="b">🅱 חלק ב׳ — לפי שאלות המבחן</button>
    <button data-t="a">🅰 חלק א׳ — לפי נושאי המבחן</button>
    <button data-t="ex">📝 ${M.exams.length} מבחנים מעורבבים</button>
  </div>`;
}

function aboutHtml(){
  const M = X();
  const slotRows = M.slots.map(s => {
    const anc = s.anchor ? M.open[s.anchor] : null;
    const sh = s.ids.filter(id => M.open[id].schema === 'ship').length;
    return [anc ? `<b>${anc.n}</b>` : '<b>10</b>', esc(anc ? anc.title : s.title), esc(s.title),
            `${s.ids.length} <span class="e2-note">(${sh} משלוחים · ${s.ids.length - sh} מכללה)</span>`,
            `<button class="btn ghost small" data-goslot="${s.key}">לתרגול ←</button>`];
  });
  return `
  <div class="card">
    <h3>🧭 מה עשינו כאן</h3>
    <ol class="tips">
      <li><b>כל שאלת SELECT</b> מכל המאגרים — תרגול המשלוחים, בנק המכללה (45), מבחן המכללה, הדפוסים הנוספים — שובצה ל<b>אחת</b> מתשע השאלות הפתוחות של המבחן האחרון, לפי הדפוס שלה. שאלות שינוי (INSERT/UPDATE/DELETE) לא נכנסו: במבחן האחרון לא היו כאלה.</li>
      <li>בתוך כל משבצת השאלות <b>מסודרות לפי הקרבה לרמת המבחן</b>, ו<b>מתחלפות בין שתי הסכמות</b>: שאלה על משלוחים, אחריה שאלה על מכללה. הדפוס זהה, השמות שונים — בדיוק מה שיקרה בבחינה.</li>
      <li>איפה שהמאגרים היו דלים (אנטי-צירוף, "האחרון לכל קבוצה", שני תנאי קבוצה, צבירה בתוך HAVING ועוד) — <b>נכתבו 17 שאלות חדשות</b> (🆕), כולן הורצו בשני המנועים והמלכודת בכל אחת נבדקה.</li>
      <li>בחלק א׳ — 90 האמריקאיות של הבנק סודרו לפי <b>10 הנושאים של המבחן האחרון</b>. שלושה נושאים שהיו במבחן לא הופיעו בבנק בכלל — <b>מפתח חלוקה, שכפול ועקביות, NULL מול שדה חסר</b> — ונכתבו עבורם שאלות חדשות. בסך הכול נוספו 53 אמריקאיות חדשות, ואף אחת מהן אינה מודפסת בחוברת.</li>
      <li><b>6 מבחנים מעורבבים</b> במבנה הבחינה: 10 אמריקאיות (נושא אחד מכל משפחה) ו-10 פתוחות (שאלה אחת מכל משבצת), בלי אף שאלה שחוזרת בין המבחנים. <b>מבחנים ב׳–ו׳ בנויים רק משאלות שאינן מודפסות בחוברת</b> — חלקן נכתבו במיוחד לשם כך. כך מתרגלים את מה שיקרה בבחינה: לפתור בעזרת החוברת, ולא למצוא בה את התשובה.</li>
      <li>על כל שאלה כתוב <b>📖 באיזה עמוד בחוברת היא מודפסת</b>, או <b>✍ באיזה כרטיס נעזרים</b> כשהיא אינה שם. בזמן מבחן הסימון מוסתר.</li>
    </ol>
    <p class="e2-note">סדר עבודה מומלץ: קודם לפתור את המבחן האחרון בלשונית "⭐ המבחן האחרון". אחר כך כאן — משבצת אחר משבצת, 2–3 שאלות בכל אחת. ובסוף — המבחנים המעורבבים, עם טיימר.</p>
  </div>
  <div class="card">
    <h3>🅱 עשר המשבצות של חלק ב׳</h3>
    ${tbl(['#','השאלה במבחן האחרון','הדפוס','שאלות דומות',''], slotRows)}
  </div>
  <div class="card">
    <h3>🅰 עשרת הנושאים של חלק א׳</h3>
    ${tbl(['#','הנושא','במבחן האחרון','שאלות',''], M.families.map((f, i) => [String(i + 1), esc(f.title),
      f.anchorIds.map(id => 'שאלה ' + M.mcq[id].n).join(', '), String(f.ids.length),
      `<button class="btn ghost small" data-gofam="${f.key}">לתרגול ←</button>`]))}
  </div>`;
}

function slotHtml(){
  const M = X(), s = M.slots.find(x => x.key === slotSel);
  const anc = s.anchor ? M.open[s.anchor] : null;
  return `
  <div class="chip-row" id="mxSlots">${M.slots.map(x => {
    const a = x.anchor ? M.open[x.anchor] : null;
    return `<button data-s="${x.key}" class="${x.key === slotSel ? 'active' : ''}">${a ? 'ש׳ ' + a.n : 'ש׳ 10'} · ${esc(x.title)}</button>`; }).join('')}</div>
  <div class="card e2-warn mx-slot-head">
    <h3>${anc ? `שאלה ${anc.n} במבחן האחרון — ${esc(anc.title)}` : esc(s.title)}</h3>
    <p><b>הדפוס:</b> ${esc(s.title)}. ${esc(s.tip)}</p>
    <p class="e2-note">${anc ? 'השאלה המקורית מופיעה ראשונה (⭐), ואחריה ' : ''}${s.ids.length} שאלות דומות, מתחלפות בין שתי הסכמות. מומלץ: לפתור 2–3 ולעבור למשבצת הבאה, ולחזור לשאר בסבב שני.</p>
  </div>
  ${anc ? qCard(anc, 'mxd', '⭐ המקור') : ''}
  ${s.ids.map((id, i) => qCard(M.open[id], 'mxd', `${i + 1}/${s.ids.length}`)).join('')}`;
}

function famHtml(){
  const M = X(), f = M.families.find(x => x.key === famSel);
  const all = f.anchorIds.concat(f.ids);
  const m = prog().a, right = f.ids.filter(id => m[id] === M.mcq[id].correct).length, done = f.ids.filter(id => m[id] !== undefined).length;
  return `
  <div class="chip-row" id="mxFams">${M.families.map((x, i) => `<button data-f="${x.key}" class="${x.key === famSel ? 'active' : ''}">${i + 1} · ${esc(x.title)}</button>`).join('')}</div>
  <div class="sql-actions"><span class="muted-sm">בנושא הזה: ענית על <b>${done}</b> מתוך ${f.ids.length}, נכון ב-<b>${right}</b></span>
    <button class="btn ghost small" id="mxFamReset">↺ לענות מחדש בנושא</button></div>
  <div class="e2-mcq-list">${all.map((id, i) => mcqCard(M.mcq[id], 'mxa', i < f.anchorIds.length ? '⭐ המקור' : `${i - f.anchorIds.length + 1}/${f.ids.length}`)).join('')}</div>`;
}

function examsHtml(){
  const M = X(), E = prog().ex;
  return `
  <p class="subtitle">כל מבחן בנוי בדיוק כמו הבחינה: <b>10 אמריקאיות</b> (עונים על 8, 6 נק' לשאלה) ו-<b>10 פתוחות</b> (עונים על 7, 8 נק' לשאלה — 4 ל-SQL ו-4 למונגו), 150 דקות. כל אמריקאית מנושא אחר של המבחן האחרון, וכל שאלה פתוחה ממשבצת אחרת — באותו סדר כמו במבחן. אף שאלה אינה חוזרת בין המבחנים.</p>
  <div class="mx-exam-list">${M.exams.map(e => {
    const h = E[e.id] || [], best = h.length ? Math.max(...h.map(x => x.score)) : null;
    const sh = e.b.filter(id => M.open[id].schema === 'ship').length;
    return `<div class="card mx-exam-card">
      <h3>📝 ${esc(e.title)}</h3>
      <div class="muted-sm">10 אמריקאיות · 10 פתוחות (${sh} משלוחים, ${10 - sh} מכללה)</div>
      <div class="muted-sm">${e.clean ? '✍ <b>אף שאלה אינה מודפסת בחוברת</b> — פותרים בעזרתה' : '📖 חלק מהשאלות מודפסות בחוברת'}</div>
      <div class="muted-sm">${h.length ? `נעשה ${h.length} פעמים · ציון אחרון <b>${h[h.length - 1].score}</b> · הטוב ביותר <b>${best}</b>` : 'עוד לא נעשה'}</div>
      <button class="btn" data-start="${e.id}" style="margin-top:8px">⏱ התחל (150 דקות)</button></div>`; }).join('')}</div>
  <div id="mxExamBox"></div>`;
}

function examBodyHtml(e){
  const M = X();
  return `
  <div class="card e2-warn"><h3>📝 ${esc(e.title)}</h3>
    <p>חלק א׳ ואחריו חלק ב׳. בזמן המבחן אין בדיקה, אין הרצה ואין פתרונות — כמו על דף. התשובות נבדקות בסוף. בכל שאלה פתוחה רשומה הסכמה שלה, ואפשר לפתוח את רשימת הטבלאות.</p>
    ${e.clean ? '<p><b>אף שאלה במבחן הזה אינה מודפסת בחוברת.</b> החוברת פתוחה לידך כמו בבחינה: שאלה אמריקאית — עמ׳ 7, נושא, ושאלת המקור. שאלה פתוחה — מזהים את הדפוס, עמ׳ 3, כרטיס, ומתאימים את השלד. אחרי ההגשה יופיע על כל שאלה איזה עמוד היה עוזר.</p>' : ''}</div>
  <h3 class="mx-part">🅰 חלק א׳ — 10 שאלות אמריקאיות</h3>
  <div class="e2-mcq-list">${e.a.map((id, i) => mcqCard(M.mcq[id], 'mxe', `שאלה ${i + 1}`)).join('')}</div>
  <h3 class="mx-part">🅱 חלק ב׳ — 10 שאלות פתוחות</h3>
  ${e.b.map((id, i) => qCard(M.open[id], 'mxe', `שאלה ${i + 11}`)).join('')}`;
}

/* ============================================================
   ציון ומצב מבחן
   ============================================================ */
function paintScore(){
  const el = $('#mxScore'); if(!el) return;
  const M = X(), P = prog();
  const b = Object.keys(M.open).filter(id => (P.b[id] || {}).sql && (P.b[id] || {}).mongo).length;
  const a = Object.keys(M.mcq).filter(id => P.a[id] === M.mcq[id].correct).length;
  const runs = Object.values(P.ex).reduce((n, h) => n + h.length, 0);
  el.innerHTML = exam ? '' : `פתוחות בשני הפתרונות <b>${b}/${Object.keys(M.open).length}</b> · אמריקאיות נכונות <b>${a}/${Object.keys(M.mcq).length}</b> · מבחנים שנעשו <b>${runs}</b>`;
}
function setTab(t){
  tab = t;
  $$('#mxTabs button').forEach(b => b.classList.toggle('active', b.dataset.t === t));
  $$('#view-mix .mx-pane').forEach(p => p.classList.toggle('hidden', p.dataset.pane !== t));
}
function tick(){
  const left = Math.max(0, exam.end - Date.now()), s = Math.floor(left / 1000);
  const el = $('#mxTimer');
  el.textContent = [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map(x => String(x).padStart(2, '0')).join(':');
  el.classList.toggle('warn', left < 15 * 60000);
  if(!left) finishExam(true);
}
function startExam(id){
  if(exam) return;
  const e = X().exams.find(x => x.id === id);
  if(!confirm(`${e.title}: 150 דקות, בלי פתרונות, בלי בדיקה ובלי הרצה — כמו על דף. בסוף מקבלים ציון לפי כללי הבחינה. להתחיל?`)) return;
  exam = { id, mcq:{}, end: Date.now() + EXAM_MINUTES * 60000 };
  const box = $('#mxExamBox');
  box.innerHTML = examBodyHtml(e);
  $('#view-mix').classList.add('mx-exam');
  $$('#view-mix [data-start]').forEach(b => b.disabled = true);
  $$('#mxTabs button').forEach(b => b.disabled = true);
  $('#mxFinishBtn').classList.remove('hidden'); $('#mxTimer').classList.remove('hidden');
  wireCards(box, true);
  tick(); exam.tick = setInterval(tick, 1000);
  paintScore();
  go(box);
}
function finishExam(timeUp){
  if(!exam) return;
  if(!timeUp && !confirm('לסיים את המבחן ולקבל ציון?')) return;
  clearInterval(exam.tick);
  const cur = exam; exam = null;
  A().ensureEngines().then(() => {
    const M = X(), P = prog(), e = M.exams.find(x => x.id === cur.id), box = $('#mxExamBox');
    /* חלק א׳: עד 8 תשובות נכונות × 6 */
    e.a.forEach(id => { const j = cur.mcq[id], card = $(`#mxe-${CSS.escape(id)}`);
      paintMcq(card, M.mcq[id], typeof j === 'number' ? j : -1); if(typeof j === 'number') P.a[id] = j; });
    const aRight = e.a.filter(id => cur.mcq[id] === M.mcq[id].correct).length;
    const aPts = Math.min(aRight, 8) * 6;
    /* חלק ב׳: 4 ל-SQL נכון ו-4 למונגו נכון; נספרות 7 השאלות הטובות */
    const per = e.b.map((id, i) => {
      const q = M.open[id], card = $(`#mxe-${CSS.escape(id)}`);
      const gs = checkSql(q, $('[data-in="sql"]', card).value), gm = checkMongo(q, $('[data-in="mongo"]', card).value);
      showCheck(card, gs, gm);
      P.b[id] = P.b[id] || {}; if(gs.ok) P.b[id].sql = true; if(gm.ok) P.b[id].mongo = true;
      return { i, id, slot: M.slots[i], pts: (gs.ok ? 4 : 0) + (gm.ok ? 4 : 0), s: gs.ok, m: gm.ok };
    });
    const bPts = per.map(x => x.pts).sort((a, b) => b - a).slice(0, 7).reduce((a, b) => a + b, 0);
    const score = Math.min(100, aPts + bPts);
    (P.ex[e.id] = P.ex[e.id] || []).push({ at: Date.now(), score, a: aRight, b: per.filter(x => x.s && x.m).length });
    save();
    const weakB = per.filter(x => !(x.s && x.m)), weakA = e.a.map((id, i) => ({ id, f: M.families[i] })).filter(x => cur.mcq[x.id] !== M.mcq[x.id].correct);
    $('#view-mix').classList.remove('mx-exam');
    $$('#mxTabs button').forEach(b => b.disabled = false);
    $('#mxFinishBtn').classList.add('hidden'); $('#mxTimer').classList.add('hidden');
    box.insertAdjacentHTML('afterbegin', `<div class="card ${score >= 70 ? 'ok-box' : 'emph-box'}" id="mxResult">
      <h3>${timeUp ? '⏰ הזמן נגמר. ' : ''}${esc(e.title)} — הציון שלך: ${score}</h3>
      <div class="muted-sm">חלק א׳: ${aRight} נכונות מתוך 10 → ${Math.min(aRight, 8)} × 6 = <b>${aPts}</b> (נספרות עד 8)</div>
      <div class="muted-sm">חלק ב׳: ${per.map(x => `${x.i + 11}${x.s && x.m ? '✓' : x.s || x.m ? '½' : '✗'}`).join(' · ')} → 7 הטובות = <b>${bPts}</b></div>
      ${weakB.length ? `<p style="margin-top:8px"><b>לחזור לתרגול — חלק ב׳:</b> ${[...new Set(weakB.map(x => x.slot.key))].map(k => {
        const s = M.slots.find(z => z.key === k); return `<button class="btn ghost small" data-goslot="${k}">${esc(s.title)}</button>`; }).join(' ')}</p>` : ''}
      ${weakA.length ? `<p><b>לחזור לתרגול — חלק א׳:</b> ${weakA.map(x => `<button class="btn ghost small" data-gofam="${x.f.key}">${esc(x.f.title)}</button>`).join(' ')}</p>` : ''}
      <div class="e2-note">הציון מחמיר ביחס לבחינה: פתרון נחשב נכון רק אם התוצאה שלו זהה לגמרי לפתרון, בלי ניקוד חלקי על לוגיקה נכונה עם טעות קטנה. עכשיו הבדיקה והפתרונות פתוחים בכל שאלה.</div></div>`);
    wireJumps(box);
    $$('#view-mix [data-start]').forEach(b => b.disabled = false);
    paintScore(); refreshMarks();
    go($('#mxResult'));
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
  const B = prog().b;
  $$('#view-mix .e2-q').forEach(card => {
    const d = B[card.dataset.qid] || {};
    ['sql', 'mongo'].forEach(k => {
      const el = $(`[data-mark="${k}"]`, card); if(!el) return;
      el.classList.toggle('good', d[k] === true);
      el.textContent = (k === 'sql' ? 'SQL ' : 'Mongo ') + (d[k] === true ? '✓' : d[k] === false ? '✗' : '');
    });
  });
}
function wireOpen(card){
  const q = X().open[card.dataset.qid];
  const tS = $('[data-in="sql"]', card), tM = $('[data-in="mongo"]', card);
  const inExam = () => exam && card.closest('#mxExamBox');
  const doCheck = () => {
    if(inExam()) return;
    A().ensureEngines().then(() => {
      const gs = checkSql(q, tS.value), gm = checkMongo(q, tM.value);
      showCheck(card, gs, gm);
      const B = prog().b; B[q.id] = B[q.id] || {};
      if(tS.value.trim()) B[q.id].sql = !!gs.ok;
      if(tM.value.trim()) B[q.id].mongo = !!gm.ok;
      save(); refreshMarks(); paintScore();
    });
  };
  $('[data-act="check"]', card).onclick = doCheck;
  $('[data-act="run"]', card).onclick = () => { if(inExam()) return; A().ensureEngines().then(() => {
    if(tS.value.trim()){
      const u = runSql(q, tS.value);
      if(u.error) A().fb($('[data-fb="sql"]', card), 'err', '<b>SQL:</b> ' + esc(u.error));
      else { A().fb($('[data-fb="sql"]', card), 'info', `<b>SQL:</b> רצה בהצלחה — ${u.r.rows.length} שורות.`);
             $('[data-notes="sql"]', card).innerHTML = A().notesHtml(u.r.notes);
             $('[data-res="sql"]', card).innerHTML = '<h4>התוצאה (SQL):</h4>' + A().resultTable(u.r, 12); }
    }
    if(tM.value.trim()){
      const sim = mongoSim(q);
      if(!sim) return A().fb($('[data-fb="mongo"]', card), 'info', '<b>MongoDB:</b> המנוע עוד נטען — נסו שוב בעוד רגע.');
      const r = sim.run(tM.value);
      if(!r.ok) A().fb($('[data-fb="mongo"]', card), 'err', '<b>MongoDB:</b> ' + esc(r.error));
      else { A().fb($('[data-fb="mongo"]', card), 'info', '<b>MongoDB:</b> רצה בהצלחה.');
             $('[data-res="mongo"]', card).innerHTML = '<h4>התוצאה (MongoDB):</h4>' + mongoOut(r); }
    }
  }); };
  $('[data-act="sol"]', card).onclick = () => {
    if(inExam()) return;
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
function wireMcq(card, examMode){
  const q = X().mcq[card.dataset.qid];
  $$('.mx-opt', card).forEach(b => b.onclick = () => {
    const j = +b.dataset.j;
    if(examMode && exam){
      exam.mcq[q.id] = j;
      $$('.opt', card).forEach(o => o.classList.toggle('mx-picked', +o.dataset.j === j));
      return;
    }
    prog().a[q.id] = j; save();
    paintMcq(card, q, j); paintScore();
    if(tab === 'a') paintFamStat();
  });
  if(!examMode){ const j = prog().a[q.id]; if(j !== undefined) paintMcq(card, q, j); }
}
function wireCards(root, examMode){
  $$('.e2-q', root).forEach(wireOpen);
  $$('.e2-mcq', root).forEach(c => wireMcq(c, examMode));
}
function paintFamStat(){
  const M = X(), f = M.families.find(x => x.key === famSel), m = prog().a;
  const right = f.ids.filter(id => m[id] === M.mcq[id].correct).length, done = f.ids.filter(id => m[id] !== undefined).length;
  const el = $('#view-mix [data-pane="a"] .sql-actions .muted-sm');
  if(el) el.innerHTML = `בנושא הזה: ענית על <b>${done}</b> מתוך ${f.ids.length}, נכון ב-<b>${right}</b>`;
}
function renderSlot(){
  const pane = $('#view-mix [data-pane="b"]'); pane.innerHTML = slotHtml();
  $$('#mxSlots button', pane).forEach(b => b.onclick = () => { slotSel = b.dataset.s; renderSlot(); go($('#mxSlots')); });
  wireCards(pane, false); refreshMarks();
}
function renderFam(){
  const pane = $('#view-mix [data-pane="a"]'); pane.innerHTML = famHtml();
  $$('#mxFams button', pane).forEach(b => b.onclick = () => { famSel = b.dataset.f; renderFam(); go($('#mxFams')); });
  $('#mxFamReset').onclick = () => {
    const f = X().families.find(x => x.key === famSel), m = prog().a;
    f.anchorIds.concat(f.ids).forEach(id => delete m[id]); save(); renderFam(); paintScore();
  };
  wireCards(pane, false);
}
function wireJumps(root){
  $$('[data-goslot]', root).forEach(b => b.onclick = () => { if(exam) return; slotSel = b.dataset.goslot; renderSlot(); setTab('b'); go($('#mxTabs')); });
  $$('[data-gofam]', root).forEach(b => b.onclick = () => { if(exam) return; famSel = b.dataset.gofam; renderFam(); setTab('a'); go($('#mxTabs')); });
}
function wire(){
  $$('#mxTabs button').forEach(b => b.onclick = () => { setTab(b.dataset.t); go($('#mxTabs')); });
  $('#mxFinishBtn').onclick = () => finishExam(false);
  const pEx = $('#view-mix [data-pane="ex"]');
  $$('[data-start]', pEx).forEach(b => b.onclick = () => startExam(b.dataset.start));
  wireJumps($('#view-mix [data-pane="about"]'));
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
function build(){
  const box = $('#view-mix');
  if(!register() || !X()){ box.innerHTML = '<div class="card">שגיאה: נתוני התרגול (mix-exam.js) או נתוני הסכמות לא נטענו.</div>'; return; }
  box.innerHTML = `<div class="e2-wrap">${headHtml()}
    <div class="mx-pane" data-pane="about">${aboutHtml()}</div>
    <div class="mx-pane" data-pane="b"></div>
    <div class="mx-pane" data-pane="a"></div>
    <div class="mx-pane" data-pane="ex">${examsHtml()}</div></div>`;
  built = true;
  renderSlot(); renderFam(); wire(); setTab(tab); paintScore();
}
function render(){
  const box = $('#view-mix');
  if(!box) return;
  if(built){ paintScore(); return; }
  box.innerHTML = '<div class="card">⏳ טוען את מאגר התרגול…</div>';
  loadData().then(build, () => { box.innerHTML = '<div class="card">שגיאה בטעינת מאגר התרגול (js/mix-exam.js). נסו לרענן את הדף.</div>'; });
  if(A().ensureEngines) A().ensureEngines();
}

window.MIXVIEW = { render, _check: { checkSql, checkMongo } };
})();
