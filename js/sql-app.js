/* ============================================================
   פורטל 3964 — שפת SQL + NoSQL — לוגיקת האפליקציה
   תלוי ב: tsql-compat.js, mongo-sim.js, grader.js, וכל קבצי SQLC.*
   מנועים (נטענים בעצלות): sql.js (SQLite/WASM) + mingo (MongoDB)
   ============================================================ */
(function(){
'use strict';
const S = window.SQLC, G = window.Grader, TSQL = window.TSQL, MongoSim = window.MongoSim;
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LET = ['א','ב','ג','ד','ה','ו'];
const PKEY = 'sqlportal_v1', TKEY = 'bdportal_theme';
/* סימני כיווניות בלתי נראים — מסירים מקוד שהמשתמש הדביק */
const clean = s => String(s || '').replace(/[‎‏‪-‮⁦-⁩﻿]/g, '');
/* מסדר קוד אנגלי בתוך טקסט עברי (אידמפוטנטי; מוגדר ב-nosql-questions.js) */
const bidi = s => (window.SQLC && SQLC.bidiLtr) ? SQLC.bidiLtr(String(s ?? '')) : String(s ?? '');
const ebidi = s => esc(bidi(s));
function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; } return a; }

S.chapters = S.chapters || []; S.flashcards = S.flashcards || []; S.quiz = S.quiz || [];
S.exercises = S.exercises || []; S.nosql = S.nosql || {}; S.nosql.exercises = S.nosql.exercises || []; S.dual = S.dual || [];

/* ---------------- התקדמות ---------------- */
const DEF = () => ({ read:{}, quiz:{}, sql:{}, mongo:{}, dual:{}, fcKnown:{}, examBest:0, exams:[] });
let P = (() => { try { return Object.assign(DEF(), JSON.parse(localStorage.getItem(PKEY) || '{}')); } catch(e){ return DEF(); } })();
function save(){ try { localStorage.setItem(PKEY, JSON.stringify(P)); } catch(e){} }

/* ---------------- ערכת נושא ---------------- */
function applyTheme(t){
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(TKEY, t); } catch(e){}
  const b = $('#themeBtn'); if(b) b.textContent = t === 'dark' ? '☀️' : '🌙';
}

/* ---------------- תוויות ---------------- */
const TOPIC_NAMES = {
  model:'המודל הרלציוני', ddl:'DDL — הגדרת טבלאות', dml:'DML — עדכון נתונים', select:'SELECT ו-WHERE', join:'JOIN',
  group:'GROUP BY ואגרגציה', case:'CASE ו-CAST', nested:'שאילתות מקוננות', advanced:'פרוצדורות וטריגרים', erd:'ERD',
  mssql:'T-SQL', 'nosql-basics':'יסודות NoSQL', 'nosql-crud':'CRUD במונגו', 'nosql-operators':'אופרטורים',
  'nosql-agg':'Aggregation', 'nosql-design':'תכנון מסמכים', 'nosql-vs-sql':'SQL מול NoSQL'
};
const SQL_SETS = { workbook:'📘 חוברת JOIN', space:'👽 חייזרים (מצגות)', college2:'🏫 מערכת המכללה', ddl:'🏗️ DDL ו-DML' };
const SQL_TOPICS = { select:'SELECT', where:'WHERE', join:'JOIN', outer:'OUTER JOIN', group:'GROUP BY', case:'CASE/CAST', nested:'מקוננות', dml:'DML', ddl:'DDL', temp:'טבלאות זמניות' };
const M_SETS = { pdf:'📄 עבודת MongoDB', lesson:'🍃 שיעור NoSQL', crud:'✏️ CRUD ואופרטורים', agg:'🔗 Aggregation' };
const DUAL_TOPICS = { filter:'סינון', join:'JOIN', group:'קיבוץ', having:'HAVING', anti:'אנטי-JOIN', top:'TOP/limit', nulls:'NULL', dates:'תאריכים', distinct:'DISTINCT', case:'CASE', multi:'כמה טבלאות' };
const isNosqlTopic = t => String(t).startsWith('nosql');

/* ============================================================
   מנועים
   ============================================================ */
let SQLENG = null, MINGO = window.mingo || null, engPromise = null;
function loadScript(src){ return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
function setEngStatus(t){ $$('[data-engine-status]').forEach(e => e.textContent = t); }
function ensureEngines(){
  if(engPromise) return engPromise;
  setEngStatus('⏳ טוען מנועי SQL ו-MongoDB…');
  const cdn = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';
  const pSql = (window.initSqlJs ? Promise.resolve() : loadScript(cdn + 'sql-wasm.js'))
    .then(() => window.initSqlJs({ locateFile: f => cdn + f })).then(SQL => { SQLENG = SQL; }).catch(() => {});
  const pMongo = (window.mingo ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/npm/mingo@6.7.2/dist/mingo.min.js'))
    .then(() => { MINGO = window.mingo || null; }).catch(() => {});
  engPromise = Promise.all([pSql, pMongo]).then(() => {
    if(SQLENG && MINGO) setEngStatus('✓ המנועים מוכנים — Ctrl+Enter להרצה · SQL נכתב בתחביר T-SQL (SQL Server) ומומר אוטומטית');
    else setEngStatus('⚠ חלק מהמנועים לא נטענו (אין אינטרנט?) — בדיקה מקורבת בלבד');
  });
  return engPromise;
}
const schemaSql = key => S.schemas[key];
const dataset = key => S.nosql.datasets[key || 'college2'];

/* ============================================================
   ניווט
   ============================================================ */
const VIEWS = ['home','chapters','syntax','flashcards','quiz','lab','exam'];
function showView(id){
  if(!VIEWS.includes(id)) id = 'home';
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + id));
  $$('nav.tabs button').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  if(id === 'home') renderHome();
  if(id === 'lab' || id === 'exam') ensureEngines();
  window.scrollTo(0, 0);
  try { history.replaceState(null, '', '#' + id); } catch(e){}
}

/* ============================================================
   בית
   ============================================================ */
function stats(){
  const chN = S.chapters.length, chR = S.chapters.filter(c => P.read[c.id]).length;
  const qN = S.quiz.length, qOk = S.quiz.filter((q,i) => P.quiz[i] === true).length;
  const sN = S.exercises.length, sOk = S.exercises.filter(q => P.sql[q.id]).length;
  const mN = S.nosql.exercises.length, mOk = S.nosql.exercises.filter(q => P.mongo[q.id]).length;
  const dN = S.dual.length, dOk = S.dual.filter(d => P.dual[d.id] && P.dual[d.id].sql && P.dual[d.id].mongo).length;
  return { chN, chR, qN, qOk, sN, sOk, mN, mOk, dN, dOk };
}
function readiness(){
  const s = stats(), r = (a,b) => b ? a/b : 0;
  return Math.round(100 * (0.12*r(s.chR,s.chN) + 0.23*r(s.qOk,s.qN) + 0.2*r(s.sOk,s.sN) + 0.2*r(s.mOk,s.mN) + 0.15*r(s.dOk,s.dN) + 0.10*(P.examBest/100)));
}
function renderHome(){
  const s = stats(), pct = readiness();
  $('#readyPct').textContent = pct + '%'; $('#readyBar').style.width = pct + '%';
  $('#stRead').textContent = `${s.chR}/${s.chN}`;
  $('#stQuiz').textContent = `${s.qOk}/${s.qN}`;
  $('#stSql').textContent = `${s.sOk}/${s.sN}`;
  $('#stMongo').textContent = `${s.mOk}/${s.mN}`;
  $('#stDual').textContent = `${s.dOk}/${s.dN}`;
  $('#stExam').textContent = P.examBest;
  const card = c => `<div class="card home-card ${P.read[c.id]?'done-card':''}" data-ch="${esc(c.id)}">
      <div class="ic">${c.icon||'📘'}</div><div><h3>${esc(c.title)}</h3>
      <div class="hc-sub">${P.read[c.id] ? '✓ נקרא' : 'לחצו לקריאה'}</div></div></div>`;
  $('#homeSqlCards').innerHTML = S.chapters.filter(c => c.track === 'sql').map(card).join('');
  $('#homeNosqlCards').innerHTML = S.chapters.filter(c => c.track === 'nosql').map(card).join('');
  $$('#view-home [data-ch]').forEach(el => el.onclick = () => openChapter(el.dataset.ch));
  $('#tipsList').innerHTML = [...(S.examTips||[]), ...(S.nosqlTips||[])].map(t => `<li>${t}</li>`).join('');
  renderWeak();
}
function renderWeak(){
  const by = {};
  S.quiz.forEach((q,i) => { if(P.quiz[i] === undefined) return; const b = by[q.topic] = by[q.topic] || {n:0, ok:0}; b.n++; if(P.quiz[i]) b.ok++; });
  const rows = Object.entries(by).map(([t,b]) => ({ t, pct: Math.round(b.ok/b.n*100), n:b.n })).sort((a,b) => a.pct - b.pct);
  if(!rows.length){ $('#weakList').innerHTML = `<div class="muted-sm">ענו על שאלות בבוחן — כאן יופיעו הנושאים שכדאי לחזק.</div>`; return; }
  $('#weakList').innerHTML = rows.map(r => `<div class="weak-row" data-topic="${esc(r.t)}">
      <div class="weak-name">${esc(TOPIC_NAMES[r.t] || r.t)}</div>
      <div class="weak-bar"><i class="${r.pct>=80?'good':r.pct>=55?'mid':'low'}" style="width:${r.pct}%"></i></div>
      <div class="weak-pct">${r.pct}%</div></div>`).join('') +
    (rows[0].pct < 70 ? `<div class="weak-tip">💡 הנושא החלש ביותר: <b>${esc(TOPIC_NAMES[rows[0].t]||rows[0].t)}</b> — לחצו עליו לתרגול ממוקד.</div>` : `<div class="weak-tip good-tip">💪 כל הנושאים מעל 70% — המשיכו לסימולציות!</div>`);
  $$('#weakList .weak-row').forEach(el => el.onclick = () => { quizTrack = isNosqlTopic(el.dataset.topic) ? 'nosql' : 'sql'; quizTopic = el.dataset.topic; renderQuizFilters(); renderQuiz(); showView('quiz'); });
}

/* ============================================================
   סיכומים
   ============================================================ */
let chapTrack = 'sql', currentChap = null;
function renderChapTrack(){
  $('#chapTrack').innerHTML = [['sql','💾 SQL (T-SQL)'],['nosql','🍃 NoSQL (MongoDB)']]
    .map(([k,l]) => `<button data-t="${k}" class="${chapTrack===k?'active':''}">${l}</button>`).join('');
  $$('#chapTrack button').forEach(b => b.onclick = () => { chapTrack = b.dataset.t; renderChapTrack(); const f = S.chapters.find(c => c.track === chapTrack); if(f) selectChapter(f.id); });
  const list = S.chapters.filter(c => c.track === chapTrack);
  $('#chapNav').innerHTML = list.map(c => `<button data-id="${esc(c.id)}" class="${currentChap===c.id?'active':''}">${c.icon||''} ${esc(c.title)}${P.read[c.id]?' ✓':''}</button>`).join('');
  $$('#chapNav button').forEach(b => b.onclick = () => selectChapter(b.dataset.id));
}
function selectChapter(id){
  const c = S.chapters.find(x => x.id === id); if(!c) return;
  currentChap = id; chapTrack = c.track;
  P.read[id] = true; save();
  renderChapTrack();
  const list = S.chapters.filter(x => x.track === c.track), i = list.findIndex(x => x.id === id);
  const prev = list[i-1], next = list[i+1];
  $('#chapBody').innerHTML = `<section><h3>${c.icon||''} ${esc(c.title)}</h3>${c.html}
    <div class="chap-nav-bottom">
      ${prev ? `<button class="btn ghost small" data-go="${esc(prev.id)}">→ ${esc(prev.title)}</button>` : '<span></span>'}
      ${next ? `<button class="btn small" data-go="${esc(next.id)}">${esc(next.title)} ←</button>` : '<span></span>'}
    </div></section>`;
  $$('#chapBody [data-go]').forEach(b => b.onclick = () => { selectChapter(b.dataset.go); window.scrollTo(0, 0); });
}
function openChapter(id){ showView('chapters'); selectChapter(id); }

/* ============================================================
   תחביר
   ============================================================ */
function renderSyntax(){
  const grp = g => `<div class="card syn-group ${g.mssql?'mssql':''}"><h3>${esc(g.title)}</h3>
      <table class="mini syn-table">${(g.rows||[]).map(r => `<tr><td dir="ltr"><code>${esc(r[0])}</code></td><td>${esc(r[1])}</td></tr>`).join('')}</table></div>`;
  let html = `<h3 class="sec-h">💾 SQL — T-SQL (Microsoft SQL Server)</h3><div class="syn-grid">${(S.syntax||[]).map(grp).join('')}</div>`;
  if(S.nosqlSyntax && S.nosqlSyntax.length) html += `<h3 class="sec-h" style="margin-top:28px">🍃 NoSQL — MongoDB</h3><div class="syn-grid">${S.nosqlSyntax.map(grp).join('')}</div>`;
  if(S.sqlVsMongo && S.sqlVsMongo.length) html += `<h3 class="sec-h" style="margin-top:28px">🔀 מילון תרגום SQL ⇄ MongoDB</h3>
    <div class="card" style="overflow-x:auto"><table class="mini syn-table vs-table"><thead><tr><th>SQL</th><th>MongoDB</th><th>הערה</th></tr></thead><tbody>
    ${S.sqlVsMongo.map(r => `<tr><td dir="ltr"><code>${esc(r[0])}</code></td><td dir="ltr"><code>${esc(r[1])}</code></td><td>${esc(r[2]||'')}</td></tr>`).join('')}</tbody></table></div>`;
  $('#syntaxBody').innerHTML = html;
}

/* ============================================================
   כרטיסיות
   ============================================================ */
let fcTrack = 'all', fcOrder = [], fcIndex = 0, fcOnlyUnknown = false;
function fcSet(){ return S.flashcards.map((c,i) => ({c,i})).filter(o => fcTrack === 'all' || o.c.track === fcTrack); }
function buildFcOrder(){
  let set = fcSet(); if(fcOnlyUnknown) set = set.filter(o => !P.fcKnown[o.i]);
  fcOrder = set.map(o => o.i); fcIndex = 0;
}
function drawCard(){
  const inner = $('#fcInner'); inner.classList.remove('flipped');
  if(!fcOrder.length){ $('#fcFrontTxt').textContent = fcOnlyUnknown ? '🎉 ידעת את כל הכרטיסיות בקבוצה הזו!' : 'אין כרטיסיות'; $('#fcBackTxt').textContent = ''; $('#fcCounter').textContent = '0/0'; $('#fcKnownBadge').style.display='none'; return; }
  const i = fcOrder[fcIndex], c = S.flashcards[i];
  $('#fcFrontTxt').textContent = c.front; $('#fcBackTxt').textContent = c.back;
  $('#fcCounter').textContent = `${fcIndex+1}/${fcOrder.length}` + ` · ${c.track === 'nosql' ? '🍃 NoSQL' : '💾 SQL'}`;
  $('#fcKnownBadge').style.display = P.fcKnown[i] ? 'inline-block' : 'none';
}
function setupFlashcards(){
  $('#fcTrack').innerHTML = [['all','הכל'],['sql','💾 SQL'],['nosql','🍃 NoSQL']].map(([k,l]) => `<button data-t="${k}" class="${fcTrack===k?'active':''}">${l}</button>`).join('');
  $$('#fcTrack button').forEach(b => b.onclick = () => { fcTrack = b.dataset.t; $$('#fcTrack button').forEach(x => x.classList.toggle('active', x === b)); buildFcOrder(); drawCard(); });
  $('#fcInner').onclick = () => $('#fcInner').classList.toggle('flipped');
  $('#fcNext').onclick = () => { if(fcOrder.length){ fcIndex = (fcIndex+1) % fcOrder.length; drawCard(); } };
  $('#fcPrev').onclick = () => { if(fcOrder.length){ fcIndex = (fcIndex-1+fcOrder.length) % fcOrder.length; drawCard(); } };
  $('#fcShuffle').onclick = () => { fcOrder = shuffle(fcOrder); fcIndex = 0; drawCard(); };
  $('#fcMode').onclick = () => { fcOnlyUnknown = !fcOnlyUnknown; $('#fcMode').classList.toggle('active', fcOnlyUnknown); buildFcOrder(); drawCard(); };
  $('#fcKnow').onclick = () => { if(!fcOrder.length) return; P.fcKnown[fcOrder[fcIndex]] = true; save(); if(fcOnlyUnknown){ fcOrder.splice(fcIndex,1); if(fcIndex >= fcOrder.length) fcIndex = 0; } else fcIndex = (fcIndex+1) % fcOrder.length; drawCard(); };
  $('#fcDontKnow').onclick = () => { if(!fcOrder.length) return; delete P.fcKnown[fcOrder[fcIndex]]; save(); const i = fcOrder.splice(fcIndex,1)[0]; fcOrder.splice(Math.min(fcIndex+3, fcOrder.length), 0, i); if(fcIndex >= fcOrder.length) fcIndex = 0; drawCard(); };
  buildFcOrder(); drawCard();
}

/* ============================================================
   בוחן אמריקאי
   ============================================================ */
let quizTrack = 'all', quizTopic = 'all', quizOrder = [], quizShown = 25, quizPerm = {}, quizAnswered = {};
function quizSet(){
  return S.quiz.map((q,gi) => ({q,gi})).filter(o =>
    (quizTrack === 'all' || (quizTrack === 'nosql') === isNosqlTopic(o.q.topic)) &&
    (quizTopic === 'all' || o.q.topic === quizTopic));
}
function renderQuizFilters(){
  const tracks = [['all','הכל'],['sql','💾 SQL'],['nosql','🍃 NoSQL']];
  const topics = [...new Set(S.quiz.filter(q => quizTrack === 'all' || (quizTrack === 'nosql') === isNosqlTopic(q.topic)).map(q => q.topic))];
  $('#quizFilters').innerHTML =
    `<div class="chip-row">${tracks.map(([k,l]) => `<button data-tr="${k}" class="${quizTrack===k?'active':''}">${l}</button>`).join('')}</div>
     <div class="chip-row small">${[['all','כל הנושאים'], ...topics.map(t => [t, TOPIC_NAMES[t]||t])].map(([k,l]) => `<button data-tp="${esc(k)}" class="${quizTopic===k?'active':''}">${esc(l)}</button>`).join('')}</div>`;
  $$('#quizFilters [data-tr]').forEach(b => b.onclick = () => { quizTrack = b.dataset.tr; quizTopic = 'all'; renderQuizFilters(); renderQuiz(); });
  $$('#quizFilters [data-tp]').forEach(b => b.onclick = () => { quizTopic = b.dataset.tp; renderQuizFilters(); renderQuiz(); });
}
function renderQuiz(reshuffle){
  if(reshuffle || !quizOrder.length || quizOrder.__key !== quizTrack + '|' + quizTopic){
    quizOrder = shuffle(quizSet().map(o => o.gi)); quizOrder.__key = quizTrack + '|' + quizTopic; quizShown = 25; quizAnswered = {};
  }
  const shown = quizOrder.slice(0, quizShown);
  $('#quizBody').innerHTML = shown.map((gi, k) => {
    const q = S.quiz[gi];
    const perm = quizPerm[gi] = quizPerm[gi] || shuffle([...q.options.keys()]);
    return `<div class="quiz-q" data-gi="${gi}">
      <div class="qnum">שאלה ${k+1} <span class="qtopic">${esc(TOPIC_NAMES[q.topic]||q.topic)}</span></div>
      <div class="qtext">${ebidi(q.q)}</div>
      ${perm.map((orig, d) => `<button class="opt" data-gi="${gi}" data-j="${orig}"><span class="mark">${LET[d]}</span> ${ebidi(q.options[orig])}</button>`).join('')}
      <div class="explain"></div></div>`;
  }).join('') + (quizOrder.length > quizShown ? `<div style="text-align:center"><button class="btn ghost" id="quizMore">הצג עוד ${Math.min(25, quizOrder.length - quizShown)} שאלות ↓</button></div>` : '');
  $$('#quizBody .opt').forEach(b => b.onclick = () => answerQuiz(+b.dataset.gi, +b.dataset.j));
  Object.entries(quizAnswered).forEach(([gi, j]) => paintQuiz(+gi, j));
  const more = $('#quizMore'); if(more) more.onclick = () => { quizShown += 25; renderQuiz(); };
  $('#quizResult').innerHTML = ''; updateQuizScore();
}
function paintQuiz(gi, chosen){
  const q = S.quiz[gi], box = $(`#quizBody .quiz-q[data-gi="${gi}"]`); if(!box) return;
  $$('.opt', box).forEach(o => { const j = +o.dataset.j; o.classList.toggle('correct', j === q.correct); o.classList.toggle('wrong', j === chosen && j !== q.correct); o.disabled = true; });
  const perm = quizPerm[gi], cd = perm.indexOf(q.correct);
  const ex = $('.explain', box); ex.innerHTML = `<b>${chosen === q.correct ? '✓ נכון!' : '✗ לא נכון.'}</b> התשובה הנכונה: ${LET[cd]}. ${ebidi(q.explain)}`; ex.classList.add('show');
}
function answerQuiz(gi, j){
  if(quizAnswered[gi] !== undefined) return;
  quizAnswered[gi] = j; P.quiz[gi] = (j === S.quiz[gi].correct); save();
  paintQuiz(gi, j); updateQuizScore();
}
function updateQuizScore(){
  const ans = Object.keys(quizAnswered).length, ok = Object.entries(quizAnswered).filter(([gi,j]) => S.quiz[gi].correct === j).length;
  $('#quizScore').textContent = `נענו ${ans}/${quizOrder.length} · נכונות ${ok}` + (ans ? ` (${Math.round(ok/ans*100)}%)` : '');
  if(ans && ans === quizOrder.length){
    const pct = Math.round(ok/ans*100);
    $('#quizResult').innerHTML = `<div class="result-banner ${pct>=60?'pass':'fail'}">${pct>=60?'🎉':'💪'} סיימת את הסט! ציון: ${pct} (${ok}/${ans})</div>`;
  }
}

/* ============================================================
   כלי תצוגה משותפים (SQL / Mongo)
   ============================================================ */
function resultTable(r, limit){
  if(!r) return '';
  if(!r.columns || !r.columns.length) return `<div class="feedback info show">הפקודה בוצעה. שורות שהושפעו: ${r.modified ?? 0}</div>`;
  if(!r.rows.length) return `<div class="muted-sm">אין תוצאות (0 שורות)</div>`;
  const rows = limit ? r.rows.slice(0, limit) : r.rows;
  return `<div class="res-count">${r.rows.length} שורות</div><table class="result-table"><thead><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${
    rows.map(row => `<tr>${row.map(c => `<td>${c === null ? '<span class="null">NULL</span>' : esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>` +
    (limit && r.rows.length > limit ? `<div class="tbl-more">…ועוד ${r.rows.length - limit} שורות</div>` : '');
}
function toShellJson(v){
  const s = JSON.stringify(v, function(k, x){ const o = this[k]; return o instanceof Date ? '__ISO__' + o.toISOString() : x; }, 2);
  return (s === undefined ? 'undefined' : s).replace(/"__ISO__([^"]+)"/g, 'ISODate("$1")');
}
function mongoView(r, limit){
  if(!r) return '';
  if(!r.ok) return '';
  const logs = r.log && r.log.length ? `<pre class="json-out log">${esc(r.log.join('\n'))}</pre>` : '';
  if(r.kind === 'none') return logs || `<div class="muted-sm">הפקודה רצה (אין ערך להצגה).</div>`;
  if(Array.isArray(r.value)){
    const arr = limit ? r.value.slice(0, limit) : r.value;
    return logs + `<div class="res-count">${r.value.length} ${r.kind==='docs'?'מסמכים':'ערכים'}</div><pre class="json-out">${esc(toShellJson(arr))}</pre>` +
      (limit && r.value.length > limit ? `<div class="tbl-more">…ועוד ${r.value.length - limit}</div>` : '');
  }
  return logs + `<pre class="json-out">${esc(toShellJson(r.value))}</pre>`;
}
function stateView(docs){ return `<div class="res-count">${docs.length} מסמכים ב-collection</div><pre class="json-out">${esc(toShellJson(docs))}</pre>`; }
function fb(el, kind, html){ el.className = 'feedback show ' + kind; el.innerHTML = html; }
function notesHtml(notes){ return notes && notes.length ? `<div class="tsql-notes">🔄 הומר אוטומטית מ-T-SQL ל-SQLite: ${notes.map(esc).join(' · ')}</div>` : ''; }

/* ---------- טבלאות / collections — תצוגת נתונים ---------- */
function tablesInQuery(sql, key){
  const known = (S.tables[key] || []).map(t => t.name), found = [];
  const re = /\b(?:FROM|JOIN|UPDATE|INTO|TABLE)\s+([A-Za-z_][A-Za-z0-9_]*)/gi; let m;
  while((m = re.exec(sql))){ const n = known.find(k => k.toLowerCase() === m[1].toLowerCase()); if(n && !found.includes(n)) found.push(n); }
  return found;
}
function tablePreview(names, key){
  if(!names.length) return '';
  return `<div class="tbl-preview" data-tables="${esc(names.join(','))}" data-schema="${esc(key)}">
    <div class="tbl-preview-head"><span class="tbl-preview-lbl">📋 ${names.length>1?'הטבלאות':'הטבלה'}:</span>
    <button type="button" class="tbl-data-btn">👁 נתוני דוגמה</button></div>
    ${names.map(n => { const t = (S.tables[key]||[]).find(x => x.name === n); return `<div class="tbl-line" dir="ltr"><b>${esc(n)}</b> (${esc(t ? t.cols : '')})</div>`; }).join('')}
    <div class="tbl-data hidden"></div></div>`;
}
function sampleData(names, key){
  if(!SQLENG) return '<div class="tbl-more">מנוע ה-SQL עוד נטען… נסו שוב בעוד רגע</div>';
  return names.map(n => {
    try { const r = G.runSql(G.freshDb(SQLENG, schemaSql(key)), `SELECT * FROM ${n}`);
      return `<div class="tbl-one">${names.length>1?`<div class="tbl-one-name">${esc(n)}</div>`:''}${resultTable(r, 8)}</div>`; } catch(e){ return ''; }
  }).join('');
}
document.addEventListener('click', e => {
  const btn = e.target.closest('.tbl-data-btn'); if(!btn) return;
  const wrap = btn.closest('.tbl-preview'), box = $('.tbl-data', wrap);
  if(box.classList.contains('hidden')){
    if(wrap.dataset.coll){
      const ds = dataset(wrap.dataset.ds), colls = wrap.dataset.coll.split(',');
      box.innerHTML = colls.map(c => `<div class="tbl-one"><div class="tbl-one-name">${esc(c)}</div><pre class="json-out">${esc(toShellJson((ds[c]||[]).slice(0,3)))}</pre>${(ds[c]||[]).length>3?`<div class="tbl-more">…סה"כ ${(ds[c]||[]).length} מסמכים</div>`:''}</div>`).join('');
    } else box.innerHTML = sampleData(wrap.dataset.tables.split(','), wrap.dataset.schema);
    box.classList.remove('hidden'); btn.textContent = '🙈 הסתר';
  } else { box.classList.add('hidden'); btn.textContent = '👁 נתוני דוגמה'; }
});
function collectionsIn(code){ const out = []; const re = /db\.(\w+)\.|from\s*:\s*["'](\w+)["']/g; let m; while((m = re.exec(code))){ const n = m[1] || m[2]; if(!out.includes(n) && n !== 'getCollection') out.push(n); } return out; }
function collPreview(colls, dsKey){
  const ds = dataset(dsKey); colls = colls.filter(c => ds && ds[c]);
  if(!colls.length) return '';
  const fields = c => [...new Set((ds[c]||[]).flatMap(d => Object.keys(d)))].join(', ');
  return `<div class="tbl-preview" data-coll="${esc(colls.join(','))}" data-ds="${esc(dsKey||'college2')}">
    <div class="tbl-preview-head"><span class="tbl-preview-lbl">🍃 Collections:</span><button type="button" class="tbl-data-btn">👁 נתוני דוגמה</button></div>
    ${colls.map(c => `<div class="tbl-line" dir="ltr"><b>${esc(c)}</b> { ${esc(fields(c))} }</div>`).join('')}
    <div class="tbl-data hidden"></div></div>`;
}
function schemaBox(key){
  const info = (S.schemaInfo||{})[key] || {};
  return `<div class="schema-title">${esc(info.title || key)}</div>` + (S.tables[key]||[]).map(t => `<div><b>${esc(t.name)}</b> (${esc(t.cols)})</div>`).join('');
}
function collBox(dsKey){
  const ds = dataset(dsKey); if(!ds) return '';
  return Object.keys(ds).map(c => `<div><b>${esc(c)}</b> · ${ds[c].length} מסמכים</div>`).join('');
}

/* ============================================================
   מורה SQL חכם — לינטר T-SQL
   ============================================================ */
/* מרחק עריכה עם החלפת סדר (Damerau/OSA): FORM→FROM = 1 */
function lev(a,b){
  const m=a.length, n=b.length; if(!m) return n; if(!n) return m;
  const d = Array.from({length:m+1}, (_,i) => { const r = new Array(n+1).fill(0); r[0] = i; return r; });
  for(let j=0;j<=n;j++) d[0][j] = j;
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
    const c = a[i-1] === b[j-1] ? 0 : 1;
    d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+c);
    if(i>1 && j>1 && a[i-1] === b[j-2] && a[i-2] === b[j-1]) d[i][j] = Math.min(d[i][j], d[i-2][j-2]+1);
  }
  return d[m][n];
}
/* מילה קצרה — רק מרחק 1; מילה ארוכה (7+) — עד 2. מונע "best"→LEFT */
function closest(w, list){ let best=null, bd=9; list.forEach(x => { const d = lev(w.toLowerCase(), x.toLowerCase()); if(d < bd){ bd = d; best = x; } });
  const lim = w.length >= 7 ? 2 : 1; return bd > 0 && bd <= lim ? best : null; }
const KEYWORDS = ['SELECT','FROM','WHERE','GROUP','BY','HAVING','ORDER','JOIN','INNER','LEFT','RIGHT','FULL','OUTER','CROSS','ON','AND','OR','NOT','DISTINCT','BETWEEN','LIKE','IN','AS','IS','NULL','UPDATE','SET','DELETE','INSERT','INTO','VALUES','ASC','DESC','COUNT','SUM','AVG','MIN','MAX','TOP','CASE','WHEN','THEN','ELSE','END','CAST','CONVERT','EXISTS','UNION','CREATE','TABLE','ALTER','DROP','ADD','COLUMN','CONSTRAINT','PRIMARY','FOREIGN','KEY','REFERENCES','UNIQUE','CHECK','DEFAULT','DECIMAL','VARCHAR','NVARCHAR','CHAR','INT','DATE','DATETIME','FLOAT','BIT','ISNULL','GETDATE','YEAR','MONTH','ROUND','UPPER','LOWER','LEN','PROCEDURE','TRIGGER','VIEW','INDEX','EXEC','BEGIN','AFTER','DECLARE','TRUNCATE','DATEDIFF','IDENTITY','INSERTED','DELETED',
  'RANK','DENSE_RANK','ROW_NUMBER','OVER','PARTITION','PROC','EXECUTE','WITH','TIES','PERCENT','SUBSTRING','CHARINDEX','CONCAT','COALESCE','DATEPART','DATEADD','OUTPUT','RETURN','PRINT','TRAN','TRANSACTION','COMMIT','ROLLBACK','NOCOUNT','INSTEAD','CASCADE','ACTION','NUMERIC','REAL','TEXT','VALUE','DATABASE','SCHEMA','REPLACE','TRIM','LTRIM','RTRIM','ABS','FLOOR','CEILING','POWER','SQRT','NULLIF','IIF','ANY','SOME','ALL','INTERSECT','EXCEPT','DESC','TABLE'];
function friendlySqlError(raw, key){
  let m; const tables = (S.tables[key]||[]);
  if((m = raw.match(/no such table:\s*([\w.]+)/i))){ const s = closest(m[1], tables.map(t=>t.name)); return `הטבלה "${esc(m[1])}" לא קיימת` + (s ? ` — אולי התכוונת ל-<b>${esc(s)}</b>?` : '') + ` (רשימת הטבלאות בצד).`; }
  if((m = raw.match(/no such column:\s*([\w.]+)/i))){ const cols = [...new Set(tables.flatMap(t => t.cols.split(',').map(c=>c.trim())))]; const s = closest(m[1].split('.').pop(), cols); return `העמודה "${esc(m[1])}" לא קיימת` + (s ? ` — אולי התכוונת ל-<b>${esc(s)}</b>?` : '') + ` בדקו את שמות העמודות והכינויים (aliases).`; }
  if((m = raw.match(/no such function:\s*(\w+)/i))) return `הפונקציה "${esc(m[1])}" לא נתמכת כאן` + (closest(m[1], KEYWORDS) ? ` — אולי <b>${closest(m[1], KEYWORDS)}</b>?` : '') + '.';
  if(/incomplete input/i.test(raw)) return 'השאילתה לא הושלמה — חסר סוגר, גרש או חלק בסוף.';
  if((m = raw.match(/near "([^"]*)":\s*syntax error/i))){ const s = closest(m[1], KEYWORDS); return `שגיאת תחביר ליד "<b dir="ltr">${esc(m[1])}</b>"` + (s && s.toLowerCase() !== m[1].toLowerCase() ? ` — אולי התכוונת ל-<b>${s}</b>?` : ' — בדקו את סדר החלקים: SELECT → FROM → JOIN → WHERE → GROUP BY → HAVING → ORDER BY, ופסיקים בין עמודות.'); }
  if(/ambiguous column name/i.test(raw)) return 'שם עמודה דו-משמעי — העמודה קיימת בכמה טבלאות ב-JOIN. ציינו את הטבלה/כינוי: <b dir="ltr">s.student_id</b>.';
  if(/misuse of aggregate/i.test(raw)) return 'פונקציית אגרגציה במקום לא חוקי — תנאי על COUNT/AVG/SUM שייך ל-<b>HAVING</b> (אחרי GROUP BY), לא ל-WHERE.';
  if((m = raw.match(/(\d+)\s+values?\s+for\s+(\d+)\s+columns?/i))) return `ב-INSERT סיפקת ${m[1]} ערכים אבל יש ${m[2]} עמודות — מספר הערכים חייב להתאים.`;
  if((m = raw.match(/UNIQUE constraint failed:\s*([\w.]+)/i))) return `ערך כפול ב-<b dir="ltr">${esc(m[1])}</b> — מפתח ראשי/UNIQUE חייב להיות ייחודי.`;
  if(/NOT NULL constraint failed/i.test(raw)) return 'ניסית להכניס NULL לעמודה שמוגדרת NOT NULL.';
  if(/CHECK constraint failed/i.test(raw)) return 'הערך מפר אילוץ CHECK שהוגדר על הטבלה.';
  if(/already exists/i.test(raw)) return 'הטבלה כבר קיימת — אי אפשר ליצור אותה שוב (צריך DROP קודם).';
  if(/sub-select returns|row value misused/i.test(raw)) return 'תת-שאילתה מחזירה יותר מעמודה אחת במקום שמצופה ערך יחיד.';
  return esc(raw);
}
function lintSql(sql, key){
  const w = [], tips = [], t = sql.trim(); if(!t) return [];
  const noStr = sql.replace(/'[^']*'/g, "''");
  if(/^SELECT\b/i.test(t) && !/\bFROM\b/i.test(noStr) && t.length > 10) w.push('חסרה מילת המפתח <b>FROM</b> — מאיזו טבלה שולפים?');
  if(((sql.match(/'/g)||[]).length % 2) === 1) w.push(`גרש בודד <b dir="ltr">'</b> שנפתח ולא נסגר — טקסט נכתב בין שני גרשים: <b dir="ltr">'Haifa'</b>.`);
  const o = (noStr.match(/\(/g)||[]).length, c = (noStr.match(/\)/g)||[]).length; if(o !== c) w.push(`הסוגריים לא מאוזנים — ${o} פותחים ו-${c} סוגרים.`);
  if(/"[^"]*"/.test(noStr)) w.push(`ב-SQL Server טקסט נכתב בגרש בודד <b dir="ltr">'Haifa'</b>. גרשיים כפולים "…" מיועדים לשמות עמודות.`);
  if(/[’‘“”]/.test(sql)) w.push('זוהו גרשיים "חכמים" (’ ”) — כנראה הועתקו מ-Word/מצגת. השתמשו בגרש רגיל <b dir="ltr">\'</b>.');
  if(/(^|[^<>!=])==/.test(noStr)) w.push('ב-SQL משווים עם <b dir="ltr">=</b> בודד, לא <b dir="ltr">==</b>.');
  if(/,\s*FROM\b/i.test(noStr)) w.push('פסיק מיותר לפני <b>FROM</b>.');
  if(/,\s*\)/.test(noStr)) w.push('פסיק מיותר לפני <b dir="ltr">)</b>.');
  if(/\bGROUP\b(?!\s+BY)/i.test(noStr)) w.push('אחרי GROUP חייב לבוא BY: <b dir="ltr">GROUP BY</b>.');
  if(/\bORDER\b(?!\s+BY)/i.test(noStr)) w.push('אחרי ORDER חייב לבוא BY: <b dir="ltr">ORDER BY</b>.');
  if(/=\s*NULL\b/i.test(noStr) && !/\bSET\b[^;]*=\s*NULL/i.test(noStr)) w.push('<b dir="ltr">= NULL</b> לא עובד! בודקים עם <b dir="ltr">IS NULL</b> / <b dir="ltr">IS NOT NULL</b>.');
  if(/^\s*(UPDATE|DELETE)\b/im.test(noStr) && !/\bWHERE\b/i.test(noStr) && !/\bCREATE\s+(TRIGGER|PROCEDURE|PROC)\b/i.test(noStr)) tips.push('שימו לב: UPDATE/DELETE בלי WHERE משפיעים על <b>כל</b> השורות בטבלה — ודאו שזו הכוונה.');
  const sel = t.match(/^SELECT\b([\s\S]*?)\bFROM\b/i);
  if(sel && !/\bGROUP\s+BY\b/i.test(noStr)){
    const s = sel[1].replace(/'[^']*'/g,''); const hasAgg = /\b(SUM|COUNT|AVG|MIN|MAX)\s*\(/i.test(s);
    const residue = s.replace(/\b(SUM|COUNT|AVG|MIN|MAX)\s*\([^)]*\)/gi,'').replace(/\bAS\s+\[?[\w ]+\]?/gi,'').replace(/\b(DISTINCT|TOP\s+\d+|CAST|ROUND|DECIMAL|AS|ISNULL)\b/gi,'').replace(/[\d,\s*()\[\].]/g,'');
    if(hasAgg && /[A-Za-z_]/.test(residue)) w.push('עמודה רגילה לצד COUNT/SUM/AVG מחייבת <b>GROUP BY</b> על העמודה הרגילה (ב-SQL Server זו שגיאה).');
  }
  const wm = noStr.split(/GROUP\s+BY/i)[0].match(/\bWHERE\b([\s\S]*)$/i);
  if(wm && /\b(SUM|COUNT|AVG|MIN|MAX)\s*\(/i.test(wm[1].replace(/\(\s*SELECT[\s\S]*?\)/gi,''))) w.push('תנאי על אגרגציה (COUNT/AVG…) שייך ל-<b>HAVING</b> אחרי GROUP BY — לא ל-WHERE.');
  if(/\bHAVING\b/i.test(noStr) && !/\bGROUP\s+BY\b/i.test(noStr)) w.push('יש HAVING בלי GROUP BY — HAVING מסנן קבוצות.');
  /* טיפים ל-SQL Server */
  if(/\bLIMIT\s+\d+/i.test(noStr)) w.push('<b>LIMIT</b> לא קיים ב-SQL Server! במבחן כתבו <b dir="ltr">SELECT TOP 3 …</b> (עם ORDER BY).');
  if(/\bIFNULL\s*\(/i.test(noStr)) tips.push('ב-SQL Server הפונקציה נקראת <b dir="ltr">ISNULL(x, 0)</b> (IFNULL זה MySQL/SQLite).');
  if(/\bLENGTH\s*\(/i.test(noStr)) tips.push('ב-SQL Server אורך מחרוזת = <b dir="ltr">LEN()</b>.');
  if(/\|\|/.test(noStr)) tips.push('ב-SQL Server משרשרים מחרוזות עם <b dir="ltr">+</b>: <b dir="ltr">firstName + \' \' + lastName</b>.');
  if(/\bTOP\s+\d+/i.test(noStr) && !/\bORDER\s+BY\b/i.test(noStr)) tips.push('TOP בלי ORDER BY מחזיר שורות "ראשונות" בסדר לא מוגדר — כמעט תמיד צריך ORDER BY.');
  /* הקלדות */
  const known = new Set([...KEYWORDS.map(k => k.toLowerCase()), ...(S.tables[key]||[]).flatMap(tb => [tb.name.toLowerCase(), ...tb.cols.split(',').map(x => x.trim().toLowerCase())])]);
  /* מזהים שהמשתמש הגדיר בעצמו (כינויים, טבלאות זמניות, משתנים, פרוצדורות) — לא בודקים */
  const own = new Set();
  sql.replace(/\b(?:AS|PROCEDURE|PROC|TRIGGER|VIEW|TABLE|INTO|FROM|JOIN|UPDATE)\s+[#@]?(\w+)(?:\s+(?:AS\s+)?(\w+))?/gi, (m, a, b) => { own.add(a.toLowerCase()); if(b && b.length <= 3) own.add(b.toLowerCase()); return m; });
  const toks = [...new Set((sql.replace(/'[^']*'/g,' ').replace(/\[[^\]]*\]/g,' ').replace(/[#@]\w+/g,' ').replace(/\bAS\s+\w+/gi,' ').match(/[A-Za-z_]\w*/g)) || [])]
    .filter(tk => !own.has(tk.toLowerCase()));
  toks.forEach(tk => { if(tk.length < 4 || known.has(tk.toLowerCase())) return; const s = closest(tk, KEYWORDS); if(s) w.push(`המילה "<b dir="ltr">${esc(tk)}</b>" לא מוכרת — אולי <b>${s}</b>?`); });
  if(!/;\s*$/.test(t)) tips.push('מומלץ לסיים כל פקודה ב-<b dir="ltr">;</b> — הרגל טוב שמונע טעויות כשיש כמה פקודות ברצף.');
  return [...w.slice(0,5).map(m => ({t:'warn', m})), ...tips.slice(0,2).map(m => ({t:'tip', m}))];
}
/* מחלץ את הארגומנטים ברמה העליונה של קריאה כמו .updateOne( … ) */
function callArgs(code, method){
  const out = [], re = new RegExp('\\.' + method + '\\s*\\(', 'g'); let m;
  while((m = re.exec(code))){
    let i = re.lastIndex, depth = 1, cur = '', args = [], q = null;
    for(; i < code.length && depth > 0; i++){
      const ch = code[i];
      if(q){ cur += ch; if(ch === q && code[i-1] !== '\\') q = null; continue; }
      if(ch === '"' || ch === "'" || ch === '`'){ q = ch; cur += ch; continue; }
      if('({['.includes(ch)) depth++;
      if(')}]'.includes(ch)){ depth--; if(depth === 0) break; }
      if(ch === ',' && depth === 1){ args.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    args.push(cur.trim()); out.push(args);
  }
  return out;
}
function lintMongo(code){
  const w = [], tips = [], c = code.replace(/\/\/[^\n]*/g, '');
  const k = '\\s*["\']?';
  /* אופרטור השוואה בתוך שדה: { age: { gt: 20 } } */
  let m = c.match(new RegExp(':\\s*\\{' + k + '(gt|gte|lt|lte|ne|nin|eq|in|exists|regex|size|elemMatch)["\']?\\s*:'));
  /* שלב ב-pipeline בלי $: [ { match: … } ] */
  if(!m) m = /\.aggregate\s*\(/.test(c) && c.match(new RegExp('[\\[,]\\s*\\{' + k + '(match|group|sort|project|lookup|unwind|limit|skip|addFields|count)["\']?\\s*:'));
  /* מצטבר ב-$group בלי $: total: { sum: … } */
  if(!m) m = c.match(new RegExp(':\\s*\\{' + k + '(sum|avg|min|max|first|last|push|addToSet)["\']?\\s*:'));
  if(m) w.push(`חסר הסימן <b dir="ltr">$</b> לפני האופרטור — כותבים <b dir="ltr">$${esc(m[1])}</b> ולא <b dir="ltr">${esc(m[1])}</b>.`);
  callArgs(c, 'find').forEach(a => { if(a[1] && /\$(gt|lt|gte|lte|in|ne|eq|regex)\b/.test(a[1])) w.push('הארגומנט <b>השני</b> של find הוא <b>projection</b> (אילו שדות להציג), לא תנאי! תנאים נוספים כותבים באותו אובייקט ראשון.'); });
  [...callArgs(c, 'updateOne'), ...callArgs(c, 'updateMany')].forEach(a => {
    const u = a[1] || '';
    if(/^\{/.test(u) && !/^\{\s*["']?\$/.test(u) && !/^\{\s*\}$/.test(u)) w.push('בעדכון חובה אופרטור: <b dir="ltr">{ $set: { field: value } }</b>. בלי $set זה החלפת מסמך (replaceOne).');
  });
  if(/\$group\s*:\s*\{(?![^}]*_id)/.test(c)) w.push('ב-<b dir="ltr">$group</b> חובה להגדיר <b dir="ltr">_id</b> (לפי מה מקבצים; <b dir="ltr">_id: null</b> = הכל קבוצה אחת).');
  if(/\.aggregate\s*\(\s*\{/.test(c)) w.push('aggregate מקבל <b>מערך</b> של שלבים: <b dir="ltr">aggregate([ {...}, {...} ])</b>.');
  if(/\$group\s*:\s*\{[^}]*:\s*["']\w+["']/.test(c) && !/["']\$\w/.test(c)) tips.push('בתוך $group מפנים לשדה עם <b dir="ltr">"$field"</b> — עם $ בתוך המרכאות.');
  if(/\b(SELECT|WHERE|FROM)\b/.test(c)) w.push('זה נראה כמו SQL — במונגו כותבים <b dir="ltr">db.collection.find({...})</b>.');
  if(/[’‘“”]/.test(c)) w.push('זוהו מרכאות "חכמות" (” ’) — השתמשו ב-" או \' רגילים.');
  if(/\$lookup\s*:\s*\{/.test(c) && !/localField/.test(c) && !/pipeline/.test(c)) w.push('ל-$lookup צריך: from, localField, foreignField, as.');
  return [...w.slice(0,4).map(m => ({t:'warn', m})), ...tips.map(m => ({t:'tip', m}))];
}
const lintHtml = arr => arr.map(o => `<div class="lint-item ${o.t==='tip'?'tip':''}">${o.t==='tip'?'💡':'⚠'} ${o.m}</div>`).join('');

/* ---------- עזרי עורך ---------- */
function editorKeys(ta, runFn){
  ta.addEventListener('keydown', e => {
    if(e.ctrlKey && e.key === 'Enter'){ e.preventDefault(); runFn(); }
    if(e.key === 'Tab' && !e.shiftKey){ e.preventDefault(); const s = ta.selectionStart; ta.value = ta.value.slice(0,s) + '  ' + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = s + 2; }
  });
}

/* ============================================================
   הרצה ובדיקה — SQL
   ============================================================ */
function runSqlUI(key, code){
  code = clean(code);
  if(!SQLENG) return { error:'מנוע ה-SQL עוד נטען (או שאין חיבור לאינטרנט).' };
  try { const db = G.freshDb(SQLENG, schemaSql(key)); return { r: G.runSql(db, code) }; }
  catch(e){ return { error: friendlySqlError(e.message, key) }; }
}
function gradeSqlUI(key, q, code){
  code = clean(code);
  if(!String(code||'').trim()) return { ok:false, msg:'כתבו שאילתה לפני הבדיקה.', kind:'info' };
  if(q.check === 'text'){ const g = G.gradeSqlText(q, code); return { ok:g.ok, kind:g.ok?'ok':'info', msg: g.ok ? '✓ מצוין! התשובה תואמת לפתרון.' : 'ⓘ זו פקודה שלא ניתן להריץ בדפדפן (DDL של SQL Server) — השוו לפתרון. הבדיקה הטקסטואלית לא מצאה התאמה מלאה.', textOnly:true }; }
  if(!SQLENG){ const g = G.gradeSqlText(q, code); return { ok:g.ok, kind:'info', msg:'⚠ מנוע SQL לא פעיל — בדיקה מקורבת לפי טקסט.' }; }
  try {
    const g = G.gradeSql(SQLENG, schemaSql(key), q, code);
    return { ...g, kind: g.ok ? 'ok' : 'err',
      msg: g.ok ? (g.mutated ? `✓ מצוין! מצב הטבלה ${esc(q.mutateTable)} תואם לפתרון.` : '✓ מצוין! התוצאה תואמת לפתרון.')
               : (g.mutated ? `✗ מצב הטבלה ${esc(q.mutateTable)} שונה מהצפוי — השוו מול "התוצאה הרצויה".` :
                  (g.user && g.expected && g.user.columns.length !== g.expected.columns.length ? `✗ מספר העמודות שונה (${g.user.columns.length} במקום ${g.expected.columns.length}) — בדקו אילו עמודות התבקשו ובאיזה סדר.` :
                   g.user && g.expected && g.user.rows.length !== g.expected.rows.length ? `✗ מספר השורות שונה (${g.user.rows.length} במקום ${g.expected.rows.length}) — בדקו את התנאי / סוג ה-JOIN.` :
                   g.ordered ? '✗ התוצאה שונה — שימו לב גם לסדר המיון (ORDER BY).' : '✗ התוצאה לא תואמת — השוו מול "התוצאה הרצויה".')) };
  } catch(e){ return { ok:false, kind:'err', msg: friendlySqlError(e.message, key), isError:true }; }
}
function expectedSql(key, q){
  if(!SQLENG) return null;
  const db = G.freshDb(SQLENG, schemaSql(key));
  if(q.check === 'mutate'){ G.runSql(db, q.solution); return G.tableState(db, q.mutateTable); }
  return G.runSql(db, q.solution);
}

/* ============================================================
   הרצה ובדיקה — MongoDB
   ============================================================ */
function runMongoUI(dsKey, code){
  code = clean(code);
  if(!MINGO) return { ok:false, error:'מנוע MongoDB עוד נטען (או שאין חיבור לאינטרנט).' };
  return new MongoSim(MINGO, dataset(dsKey)).run(code);
}
function gradeMongoUI(dsKey, q, code){
  code = clean(code);
  if(!String(code||'').trim()) return { ok:false, kind:'info', msg:'כתבו פקודה לפני הבדיקה.' };
  if(!MINGO) return { ok:false, kind:'info', msg:'⚠ מנוע MongoDB לא פעיל.' };
  const g = G.gradeMongo(MINGO, dataset(dsKey), q, code);
  if(g.error) return { ...g, kind:'err', msg: esc(g.error) };
  let msg;
  if(g.ok) msg = g.state ? `✓ מצוין! מצב ה-collection <b dir="ltr">${esc(q.collection)}</b> תואם לפתרון.` : '✓ מצוין! התוצאה תואמת לפתרון.';
  else if(g.state) msg = `✗ מצב ה-collection <b dir="ltr">${esc(q.collection)}</b> שונה מהצפוי — השוו מול "התוצאה הרצויה".`;
  else {
    const u = g.user.value, s = g.expected.value;
    if(Array.isArray(u) && Array.isArray(s) && u.length !== s.length) msg = `✗ התקבלו ${u.length} ${g.user.kind==='docs'?'מסמכים':'ערכים'} במקום ${s.length} — בדקו את התנאי / השלבים.`;
    else if((q.compare||'values') === 'values') msg = '✗ התוצאה שונה — בדקו את הערכים ואילו שדות מוצגים (השוו מול "התוצאה הרצויה").' + (g.ordered ? ' שימו לב גם למיון.' : '');
    else msg = '✗ התוצאה לא תואמת — השוו מול "התוצאה הרצויה".';
  }
  return { ...g, kind: g.ok ? 'ok' : 'err', msg };
}

/* ============================================================
   תרגול — לשוניות משנה
   ============================================================ */
let labTab = 'sql';
function showLab(t){
  labTab = t;
  $$('#labTabs button').forEach(b => b.classList.toggle('active', b.dataset.lab === t));
  $$('.lab-pane').forEach(p => p.classList.toggle('hidden', p.id !== 'lab-' + t));
}

/* ---------------- מעבדת SQL ---------------- */
let sqlSetF = 'all', sqlTopicF = 'all', curSql = null;
function sqlList(){ return S.exercises.filter(q => (sqlSetF === 'all' || q.set === sqlSetF) && (sqlTopicF === 'all' || q.topic === sqlTopicF)); }
function renderSqlFilters(){
  const sets = [['all','הכל'], ...Object.keys(SQL_SETS).filter(k => S.exercises.some(q => q.set === k)).map(k => [k, SQL_SETS[k]])];
  const topics = [['all','כל הנושאים'], ...Object.keys(SQL_TOPICS).filter(k => S.exercises.some(q => q.topic === k && (sqlSetF==='all'||q.set===sqlSetF))).map(k => [k, SQL_TOPICS[k]])];
  $('#sqlFilters').innerHTML = `<div class="chip-row">${sets.map(([k,l]) => `<button data-s="${k}" class="${sqlSetF===k?'active':''}">${l}</button>`).join('')}</div>
    <div class="chip-row small">${topics.map(([k,l]) => `<button data-t="${k}" class="${sqlTopicF===k?'active':''}">${l}</button>`).join('')}</div>`;
  $$('#sqlFilters [data-s]').forEach(b => b.onclick = () => { sqlSetF = b.dataset.s; sqlTopicF = 'all'; renderSqlFilters(); renderSqlList(); });
  $$('#sqlFilters [data-t]').forEach(b => b.onclick = () => { sqlTopicF = b.dataset.t; renderSqlFilters(); renderSqlList(); });
}
function renderSqlList(){
  const list = sqlList();
  const done = list.filter(q => P.sql[q.id]).length;
  $('#sqlListHead').textContent = `תרגילים (${done}/${list.length} נפתרו)`;
  $('#sqlQList').innerHTML = list.map((q,i) => `<button class="q-pick ${P.sql[q.id]?'done':''} ${curSql&&curSql.id===q.id?'active':''}" data-id="${esc(q.id)}">
      <span class="qp-n">${i+1}.</span> ${esc(shortPrompt(q.prompt))} <span class="badge">${esc(SQL_TOPICS[q.topic]||q.topic)}${P.sql[q.id]?' ✓':''}</span></button>`).join('') || '<div class="muted-sm">אין תרגילים בסינון הזה</div>';
  $$('#sqlQList .q-pick').forEach(b => b.onclick = () => selectSql(b.dataset.id));
  if(list.length && (!curSql || !list.some(q => q.id === curSql.id))) selectSql(list[0].id);
}
const shortPrompt = p => { const s = clean(p).replace(/\s+/g,' ').trim(); return s.length > 62 ? s.slice(0,60) + '…' : s; };
function selectSql(id){
  const q = S.exercises.find(x => x.id === id); if(!q) return; curSql = q;
  $$('#sqlQList .q-pick').forEach(b => b.classList.toggle('active', b.dataset.id === id));
  $('#sqlTitle').innerHTML = `${esc(q.source || '')} <span class="badge-pill">${esc(SQL_TOPICS[q.topic]||q.topic)}</span> ${q.check==='text'?'<span class="badge-pill warn">בדיקה טקסטואלית</span>':''}`;
  $('#sqlPrompt').textContent = bidi(q.prompt);
  $('#sqlPreview').innerHTML = tablePreview(tablesInQuery(q.solution, q.schema), q.schema);
  $('#sqlSchemaBox').innerHTML = schemaBox(q.schema);
  $('#sqlInput').value = ''; $('#sqlLint').innerHTML = ''; $('#sqlFeedback').className = 'feedback'; $('#sqlResult').innerHTML = ''; $('#sqlHint').innerHTML = ''; $('#sqlNotes').innerHTML = '';
  $('#sqlSolution').classList.add('hidden');
  $('#sqlSolution').innerHTML = solutionBlock(q.solution, q.alt, q.explain, q.official, q.tsql);
}
function solutionBlock(sol, alt, explain, official, tsql){
  return `<div class="sol-label">✅ פתרון:</div><pre class="sol-box show">${esc(tsql || sol)}</pre>` +
    (alt && alt.length ? `<div class="alt-sol-label">💡 יש עוד דרכים נכונות:</div>${alt.map(a => `<pre class="alt-sol-pre">${esc(a)}</pre>`).join('')}` : '') +
    (official ? `<div class="official-box"><div class="sol-label">📄 הפתרון הרשמי של המרצה (כפי שנכתב, כולל טעויות הקלדה):</div><pre class="alt-sol-pre">${esc(official)}</pre></div>` : '') +
    (explain ? `<div class="explain show">${ebidi(explain)}</div>` : '');
}
function setupSqlLab(){
  const run = () => {
    const code = $('#sqlInput').value; $('#sqlLint').innerHTML = lintHtml(lintSql(code, curSql.schema));
    const { r, error } = runSqlUI(curSql.schema, code);
    if(error){ fb($('#sqlFeedback'), 'err', error); $('#sqlResult').innerHTML = ''; $('#sqlNotes').innerHTML = ''; return; }
    $('#sqlFeedback').className = 'feedback'; $('#sqlNotes').innerHTML = notesHtml(r.notes);
    $('#sqlResult').innerHTML = '<h4>התוצאה:</h4>' + resultTable(r);
  };
  $('#sqlRun').onclick = run; editorKeys($('#sqlInput'), run);
  $('#sqlCheck').onclick = () => {
    const code = $('#sqlInput').value, lint = lintSql(code, curSql.schema);
    $('#sqlLint').innerHTML = lintHtml(lint);
    const g = gradeSqlUI(curSql.schema, curSql, code);
    const warnings = lint.filter(x => x.t === 'warn').length;
    fb($('#sqlFeedback'), g.kind, g.ok && warnings ? '✓ התוצאה נכונה — אבל יש הערות תחביר למטה. במבחן בכתב תקנו אותן!' : g.msg);
    $('#sqlNotes').innerHTML = notesHtml(g.notes);
    let html = '';
    if(g.user) html += `<h4>${g.mutated ? 'מצב הטבלה אחרי הפקודה שלך:' : 'התוצאה שלך:'}</h4>` + resultTable(g.user);
    if(!g.ok && g.expected) html += `<h4 class="expect-h">🎯 התוצאה הרצויה:</h4>` + resultTable(g.expected);
    $('#sqlResult').innerHTML = html;
    if(g.ok){ P.sql[curSql.id] = true; save(); renderSqlList(); }
  };
  $('#sqlExpect').onclick = () => {
    if(curSql.check === 'text'){ $('#sqlResult').innerHTML = '<div class="muted-sm">פקודה זו לא רצה בדפדפן — הציגו את הפתרון.</div>'; return; }
    try { const r = expectedSql(curSql.schema, curSql); $('#sqlResult').innerHTML = r ? `<h4 class="expect-h">🎯 התוצאה הרצויה:</h4>` + resultTable(r) : '<div class="muted-sm">המנוע עוד נטען…</div>'; }
    catch(e){ fb($('#sqlFeedback'), 'err', friendlySqlError(e.message, curSql.schema)); }
  };
  $('#sqlHintBtn').onclick = () => $('#sqlHint').innerHTML = '💡 ' + ebidi(curSql.hint || 'אין רמז לתרגיל הזה.');
  $('#sqlSolBtn').onclick = () => $('#sqlSolution').classList.toggle('hidden');
  $('#sqlReset').onclick = () => { $('#sqlInput').value = ''; $('#sqlResult').innerHTML = ''; $('#sqlLint').innerHTML = ''; $('#sqlFeedback').className = 'feedback'; $('#sqlNotes').innerHTML = ''; };
}

/* ---------------- מעבדת MongoDB ---------------- */
let mSetF = 'all', mTopicF = 'all', curM = null;
const SANDBOX = { id:'__sandbox', topic:'find', set:'sandbox', dataset:'college2', prompt:'ארגז חול חופשי: כתבו כל פקודת MongoDB על נתוני המכללה ולחצו "הרץ". (אין בדיקה — רק הרצה.)', solution:'db.students.find({ city: "Tel Aviv" })', hint:'נסו: show collections · db.courses.find({}, {courseName:1}) · db.submissions.aggregate([...])', source:'🧪 ארגז חול' };
function mList(){ return S.nosql.exercises.filter(q => (mSetF === 'all' || q.set === mSetF) && (mTopicF === 'all' || q.topic === mTopicF)); }
const M_TOPICS = { find:'find', operators:'אופרטורים', projection:'projection', sort:'מיון', insert:'insert', update:'update', delete:'delete', aggregate:'aggregate', lookup:'$lookup', array:'מערכים', design:'תכנון' };
function renderMongoFilters(){
  const sets = [['all','הכל'], ...Object.keys(M_SETS).filter(k => S.nosql.exercises.some(q => q.set === k)).map(k => [k, M_SETS[k]])];
  const topics = [['all','כל הנושאים'], ...Object.keys(M_TOPICS).filter(k => S.nosql.exercises.some(q => q.topic === k && (mSetF==='all'||q.set===mSetF))).map(k => [k, M_TOPICS[k]])];
  $('#mongoFilters').innerHTML = `<div class="chip-row">${sets.map(([k,l]) => `<button data-s="${k}" class="${mSetF===k?'active':''}">${l}</button>`).join('')}</div>
    <div class="chip-row small">${topics.map(([k,l]) => `<button data-t="${k}" class="${mTopicF===k?'active':''}">${l}</button>`).join('')}</div>`;
  $$('#mongoFilters [data-s]').forEach(b => b.onclick = () => { mSetF = b.dataset.s; mTopicF = 'all'; renderMongoFilters(); renderMongoList(); });
  $$('#mongoFilters [data-t]').forEach(b => b.onclick = () => { mTopicF = b.dataset.t; renderMongoFilters(); renderMongoList(); });
}
function renderMongoList(){
  const list = mList(), done = list.filter(q => P.mongo[q.id]).length;
  $('#mongoListHead').textContent = `תרגילים (${done}/${list.length} נפתרו)`;
  $('#mongoQList').innerHTML = `<button class="q-pick sandbox ${curM&&curM.id==='__sandbox'?'active':''}" data-id="__sandbox">🧪 ארגז חול — הרצה חופשית</button>` +
    list.map((q,i) => `<button class="q-pick ${P.mongo[q.id]?'done':''} ${curM&&curM.id===q.id?'active':''}" data-id="${esc(q.id)}">
      <span class="qp-n">${i+1}.</span> ${esc(shortPrompt(q.prompt))} <span class="badge">${esc(M_TOPICS[q.topic]||q.topic)}${P.mongo[q.id]?' ✓':''}</span></button>`).join('');
  $$('#mongoQList .q-pick').forEach(b => b.onclick = () => selectMongo(b.dataset.id));
  if(!curM || (curM.id !== '__sandbox' && !list.some(q => q.id === curM.id))) selectMongo(list.length ? list[0].id : '__sandbox');
}
function selectMongo(id){
  const q = id === '__sandbox' ? SANDBOX : S.nosql.exercises.find(x => x.id === id); if(!q) return; curM = q;
  $$('#mongoQList .q-pick').forEach(b => b.classList.toggle('active', b.dataset.id === id));
  const sb = id === '__sandbox';
  $('#mongoTitle').innerHTML = `${esc(q.source||'')} ${sb ? '' : `<span class="badge-pill">${esc(M_TOPICS[q.topic]||q.topic)}</span>`} ${q.check==='state'?`<span class="badge-pill">נבדק מצב ה-collection: ${esc(q.collection)}</span>`:''}`;
  $('#mongoPrompt').textContent = bidi(q.prompt);
  $('#mongoPreview').innerHTML = collPreview(sb ? Object.keys(dataset('college2')) : collectionsIn(q.solution), q.dataset);
  $('#mongoCollBox').innerHTML = collBox(q.dataset);
  $('#mongoInput').value = sb ? q.solution : '';
  $('#mongoLint').innerHTML = ''; $('#mongoFeedback').className = 'feedback'; $('#mongoResult').innerHTML = ''; $('#mongoHint').innerHTML = '';
  $$('.m-graded').forEach(b => b.classList.toggle('hidden', sb));
  $('#mongoSolution').classList.add('hidden');
  $('#mongoSolution').innerHTML = sb ? '' : solutionBlock(q.solution, q.alt, q.explain);
}
function setupMongoLab(){
  const run = () => {
    const code = $('#mongoInput').value; $('#mongoLint').innerHTML = lintHtml(lintMongo(code));
    const r = runMongoUI(curM.dataset, code);
    if(!r.ok){ fb($('#mongoFeedback'), 'err', esc(r.error)); $('#mongoResult').innerHTML = ''; return; }
    $('#mongoFeedback').className = 'feedback';
    $('#mongoResult').innerHTML = '<h4>התוצאה:</h4>' + mongoView(r, 60);
  };
  $('#mongoRun').onclick = run; editorKeys($('#mongoInput'), run);
  $('#mongoCheck').onclick = () => {
    const code = $('#mongoInput').value; $('#mongoLint').innerHTML = lintHtml(lintMongo(code));
    const g = gradeMongoUI(curM.dataset, curM, code);
    fb($('#mongoFeedback'), g.kind, g.msg);
    let html = '';
    if(g.user && g.user.ok) html += g.state ? `<h4>מצב ${esc(curM.collection)} אחרי הפקודה שלך:</h4>` + stateView(g.stateUser) : '<h4>התוצאה שלך:</h4>' + mongoView(g.user, 60);
    if(!g.ok && g.expected) html += g.state ? `<h4 class="expect-h">🎯 המצב הרצוי:</h4>` + stateView(g.stateExpected) : `<h4 class="expect-h">🎯 התוצאה הרצויה:</h4>` + mongoView(g.expected, 60);
    $('#mongoResult').innerHTML = html;
    if(g.ok){ P.mongo[curM.id] = true; save(); renderMongoList(); }
  };
  $('#mongoExpect').onclick = () => {
    const r = runMongoUI(curM.dataset, curM.solution);
    if(!r.ok){ fb($('#mongoFeedback'), 'err', esc(r.error)); return; }
    $('#mongoResult').innerHTML = curM.check === 'state' ? `<h4 class="expect-h">🎯 מצב ${esc(curM.collection)} הרצוי:</h4>` + stateView(r.data[curM.collection]||[]) : `<h4 class="expect-h">🎯 התוצאה הרצויה:</h4>` + mongoView(r, 60);
  };
  $('#mongoHintBtn').onclick = () => $('#mongoHint').innerHTML = '💡 ' + ebidi(curM.hint || 'אין רמז.');
  $('#mongoSolBtn').onclick = () => $('#mongoSolution').classList.toggle('hidden');
  $('#mongoReset').onclick = () => { $('#mongoInput').value = ''; $('#mongoResult').innerHTML = ''; $('#mongoLint').innerHTML = ''; $('#mongoFeedback').className = 'feedback'; };
}

/* ---------------- שאלות כפולות: SQL + MongoDB ---------------- */
let dualTopicF = 'all', curD = null;
function renderDualFilters(){
  const topics = [['all','הכל'], ...Object.keys(DUAL_TOPICS).filter(k => S.dual.some(d => d.topic === k)).map(k => [k, DUAL_TOPICS[k]])];
  $('#dualFilters').innerHTML = `<div class="chip-row">${topics.map(([k,l]) => `<button data-t="${k}" class="${dualTopicF===k?'active':''}">${l}</button>`).join('')}</div>`;
  $$('#dualFilters [data-t]').forEach(b => b.onclick = () => { dualTopicF = b.dataset.t; renderDualFilters(); renderDualList(); });
}
function dualDone(id){ const d = P.dual[id]; return d && d.sql && d.mongo; }
function renderDualList(){
  const list = S.dual.filter(d => dualTopicF === 'all' || d.topic === dualTopicF);
  $('#dualListHead').textContent = `שאלות (${list.filter(d => dualDone(d.id)).length}/${list.length} נפתרו בשתי השפות)`;
  $('#dualQList').innerHTML = list.map((d,i) => { const st = P.dual[d.id] || {};
    return `<button class="q-pick ${dualDone(d.id)?'done':''} ${curD&&curD.id===d.id?'active':''}" data-id="${esc(d.id)}"><span class="qp-n">${i+1}.</span> ${esc(shortPrompt(d.prompt))}
      <span class="badge">${'★'.repeat(d.difficulty||1)} · SQL ${st.sql?'✓':'—'} · Mongo ${st.mongo?'✓':'—'}</span></button>`; }).join('');
  $$('#dualQList .q-pick').forEach(b => b.onclick = () => selectDual(b.dataset.id));
  if(list.length && (!curD || !list.some(d => d.id === curD.id))) selectDual(list[0].id);
}
function selectDual(id){
  const d = S.dual.find(x => x.id === id); if(!d) return; curD = d;
  $$('#dualQList .q-pick').forEach(b => b.classList.toggle('active', b.dataset.id === id));
  $('#dualTitle').innerHTML = `${esc(d.source||'')} <span class="badge-pill">${esc(DUAL_TOPICS[d.topic]||d.topic)}</span> <span class="badge-pill">${'★'.repeat(d.difficulty||1)}</span>`;
  $('#dualPrompt').textContent = bidi(d.prompt);
  $('#dualPreview').innerHTML = tablePreview(tablesInQuery(d.sql.solution, d.sql.schema||'college2'), d.sql.schema||'college2') + collPreview(collectionsIn(d.mongo.solution), d.mongo.dataset);
  ['dualSql','dualMongo'].forEach(k => { $('#'+k).value = ''; $('#'+k+'Fb').className = 'feedback'; $('#'+k+'Res').innerHTML = ''; $('#'+k+'Lint').innerHTML = ''; });
  $('#dualSolution').classList.add('hidden');
  $('#dualSolution').innerHTML = `<div class="dual-grid"><div><h4>💾 SQL</h4>${solutionBlock(d.sql.solution, d.sql.alt, d.sql.explain)}</div><div><h4>🍃 MongoDB</h4>${solutionBlock(d.mongo.solution, d.mongo.alt, d.mongo.explain)}</div></div>`;
}
function setupDual(){
  const sqlQ = () => ({ check:'select', ...curD.sql });
  const mQ = () => ({ check:'result', ...curD.mongo });
  const runS = () => { const code = $('#dualSql').value; $('#dualSqlLint').innerHTML = lintHtml(lintSql(code, curD.sql.schema||'college2'));
    const { r, error } = runSqlUI(curD.sql.schema||'college2', code);
    if(error){ fb($('#dualSqlFb'), 'err', error); $('#dualSqlRes').innerHTML = ''; return; }
    $('#dualSqlFb').className = 'feedback'; $('#dualSqlRes').innerHTML = notesHtml(r.notes) + resultTable(r, 40); };
  const runM = () => { const code = $('#dualMongo').value; $('#dualMongoLint').innerHTML = lintHtml(lintMongo(code));
    const r = runMongoUI(curD.mongo.dataset, code);
    if(!r.ok){ fb($('#dualMongoFb'), 'err', esc(r.error)); $('#dualMongoRes').innerHTML = ''; return; }
    $('#dualMongoFb').className = 'feedback'; $('#dualMongoRes').innerHTML = mongoView(r, 40); };
  $('#dualSqlRun').onclick = runS; $('#dualMongoRun').onclick = runM;
  editorKeys($('#dualSql'), runS); editorKeys($('#dualMongo'), runM);
  const mark = (part, ok) => { if(!ok) return; P.dual[curD.id] = Object.assign({}, P.dual[curD.id], { [part]: true }); save(); renderDualList(); };
  $('#dualSqlCheck').onclick = () => { const g = gradeSqlUI(curD.sql.schema||'college2', sqlQ(), $('#dualSql').value); fb($('#dualSqlFb'), g.kind, g.msg);
    $('#dualSqlRes').innerHTML = (g.user ? '<h4>שלך:</h4>' + resultTable(g.user, 40) : '') + (!g.ok && g.expected ? '<h4 class="expect-h">🎯 רצוי:</h4>' + resultTable(g.expected, 40) : ''); mark('sql', g.ok); };
  $('#dualMongoCheck').onclick = () => { const g = gradeMongoUI(curD.mongo.dataset, mQ(), $('#dualMongo').value); fb($('#dualMongoFb'), g.kind, g.msg);
    $('#dualMongoRes').innerHTML = (g.user && g.user.ok ? '<h4>שלך:</h4>' + mongoView(g.user, 40) : '') + (!g.ok && g.expected ? '<h4 class="expect-h">🎯 רצוי:</h4>' + mongoView(g.expected, 40) : ''); mark('mongo', g.ok); };
  $('#dualSolBtn').onclick = () => $('#dualSolution').classList.toggle('hidden');
}

/* ============================================================
   סימולציית מבחן
   ============================================================ */
let exam = null, examTimer = null;
const EXAM_MODES = {
  dual:   { title:'מבחן SQL + NoSQL', desc:'5 שאלות — כל שאלה נענית גם ב-SQL וגם ב-MongoDB (10+10 נק\'), בדיוק כמו "עבודת ישור קו".' },
  sample: { title:'המבחן לדוגמה (14.2.25)', desc:'10 שאילתות SQL על מערכת המכללה מהמבחן לדוגמה (שאלה 3, 45 נק\' — מנורמל ל-100).' },
  theory: { title:'מבחן תאוריה', desc:'20 שאלות אמריקאיות מעורבות SQL + NoSQL (5 נק\' לשאלה).' },
};
function pickDualExam(){
  const pool = shuffle(S.dual), chosen = [], topics = new Set();
  const want = [1,2,2,3,3];                                   // תמהיל קושי
  want.forEach(dif => {
    let i = pool.findIndex(d => !chosen.includes(d) && (d.difficulty||2) === dif && !topics.has(d.topic));
    if(i < 0) i = pool.findIndex(d => !chosen.includes(d) && !topics.has(d.topic));
    if(i < 0) i = pool.findIndex(d => !chosen.includes(d));
    if(i >= 0){ chosen.push(pool[i]); topics.add(pool[i].topic); }
  });
  return chosen.sort((a,b) => (a.difficulty||2) - (b.difficulty||2));
}
function pickTheory(){
  const all = S.quiz.map((q,gi) => ({q,gi}));
  const sqlPool = shuffle(all.filter(o => !isNosqlTopic(o.q.topic))), nosPool = shuffle(all.filter(o => isNosqlTopic(o.q.topic)));
  let picked = [...sqlPool.slice(0, 11), ...nosPool.slice(0, 9)];
  if(picked.length < 20) picked = picked.concat(shuffle(all.filter(o => !picked.includes(o))).slice(0, 20 - picked.length));
  return shuffle(picked).map(o => ({ gi:o.gi, perm: shuffle([...S.quiz[o.gi].options.keys()]) }));
}
function startExam(mode){
  ensureEngines();
  exam = { mode, sec:0, active:true, items:[] };
  if(mode === 'dual') exam.items = pickDualExam();
  else if(mode === 'sample') exam.items = (S.examQueries||[]).slice();
  else exam.items = pickTheory();
  exam.sel = {};
  $('#examIntro').classList.add('hidden'); $('#examRun').classList.remove('hidden'); $('#examResult').innerHTML = '';
  $('#examFinishBtn').classList.remove('hidden'); $('#examRestartBtn').classList.add('hidden');
  $('#examModeTitle').textContent = EXAM_MODES[mode].title;
  buildExam();
  clearInterval(examTimer);
  examTimer = setInterval(() => { exam.sec++; $('#examTimer').textContent = `${String(Math.floor(exam.sec/60)).padStart(2,'0')}:${String(exam.sec%60).padStart(2,'0')}`; }, 1000);
  window.scrollTo(0,0);
}
function codeArea(cls, attrs, ph){ return `<textarea class="code-input ${cls}" ${attrs} spellcheck="false" placeholder="${esc(ph)}"></textarea>`; }
function buildExam(){
  let html = '';
  if(exam.mode === 'dual'){
    html = `<div class="card exam-note">📋 הנתונים: מערכת המכללה — טבלאות SQL ו-collections במונגו עם אותם נתונים. כתבו לכל שאלה <b>שאילתת SQL (T-SQL)</b> ו<b>שאילתת MongoDB</b>. אפשר להריץ ולבדוק תוצאה (כמו מחשב במבחן), הציון נקבע בסוף.
      ${tablePreview(Object.keys(S.college2), 'college2')}${collPreview(Object.keys(dataset('college2')), 'college2')}</div>` +
      exam.items.map((d,k) => `<div class="prompt-box exam-q" data-k="${k}">
        <div class="q-title">שאלה ${k+1} · 20 נק' <span class="badge-pill">${'★'.repeat(d.difficulty||1)}</span></div>
        <div class="exam-prompt">${ebidi(d.prompt)}</div>
        <div class="dual-grid">
          <div><div class="col-title">💾 SQL (10 נק')</div>${codeArea('ex-sql', `data-k="${k}"`, 'SELECT …')}
            <div class="sql-actions"><button class="btn ghost small ex-run-sql" data-k="${k}">▶ הרץ</button></div><div class="ex-out" id="exSqlOut${k}"></div><div class="explain" id="exSqlExp${k}"></div></div>
          <div><div class="col-title">🍃 MongoDB (10 נק')</div>${codeArea('ex-mongo', `data-k="${k}"`, 'db.collection.find(…)')}
            <div class="sql-actions"><button class="btn ghost small ex-run-mongo" data-k="${k}">▶ הרץ</button></div><div class="ex-out" id="exMongoOut${k}"></div><div class="explain" id="exMongoExp${k}"></div></div>
        </div></div>`).join('');
  } else if(exam.mode === 'sample'){
    html = `<div class="card exam-note">📋 שאלה 3 מהמבחן לדוגמה — מערכת המכללה (שלוחות, מחלקות, סטודנטים, מרצים, קורסים, רישום והוראה). שאלות 1-2 (ERD ומילון נתונים) נמצאות בסיכום "ERD" — הן אינן נבדקות כאן אוטומטית.
      ${tablePreview((S.tables.college||[]).map(t => t.name), 'college')}</div>` +
      exam.items.map((q,k) => `<div class="prompt-box exam-q" data-k="${k}"><div class="q-title">שאילתה ${q.n}</div>
        <div class="exam-prompt">${ebidi(q.prompt)}</div>${codeArea('ex-sql', `data-k="${k}"`, 'SELECT …')}
        <div class="sql-actions"><button class="btn ghost small ex-run-sql" data-k="${k}">▶ הרץ</button></div><div class="ex-out" id="exSqlOut${k}"></div><div class="explain" id="exSqlExp${k}"></div></div>`).join('');
  } else {
    html = exam.items.map((it,k) => { const q = S.quiz[it.gi];
      return `<div class="quiz-q" data-k="${k}"><div class="qnum">שאלה ${k+1} · 5 נק' <span class="qtopic">${esc(TOPIC_NAMES[q.topic]||q.topic)}</span></div>
        <div class="qtext">${ebidi(q.q)}</div>
        ${it.perm.map((orig,d) => `<button class="opt ex-opt" data-k="${k}" data-j="${orig}"><span class="mark">${LET[d]}</span> ${ebidi(q.options[orig])}</button>`).join('')}
        <div class="explain" id="exMcExp${k}"></div></div>`; }).join('');
  }
  $('#examBody').innerHTML = html;
  $$('#examBody .code-input').forEach(ta => editorKeys(ta, () => {}));
  $$('#examBody .ex-run-sql').forEach(b => b.onclick = () => { const k = +b.dataset.k, key = exam.mode === 'sample' ? 'college' : (exam.items[k].sql.schema||'college2');
    const { r, error } = runSqlUI(key, $(`#examBody .ex-sql[data-k="${k}"]`).value);
    $('#exSqlOut'+k).innerHTML = error ? `<div class="feedback err show">${error}</div>` : notesHtml(r.notes) + resultTable(r, 25); });
  $$('#examBody .ex-run-mongo').forEach(b => b.onclick = () => { const k = +b.dataset.k;
    const r = runMongoUI(exam.items[k].mongo.dataset, $(`#examBody .ex-mongo[data-k="${k}"]`).value);
    $('#exMongoOut'+k).innerHTML = !r.ok ? `<div class="feedback err show">${esc(r.error)}</div>` : mongoView(r, 25); });
  $$('#examBody .ex-opt').forEach(b => b.onclick = () => { if(!exam.active) return; const k = +b.dataset.k; exam.sel[k] = +b.dataset.j;
    $$(`#examBody .ex-opt[data-k="${k}"]`).forEach(o => o.classList.toggle('selected', o === b)); });
}
async function finishExam(){
  if(!exam || !exam.active) return;
  const empties = exam.mode === 'theory' ? exam.items.length - Object.keys(exam.sel).length
    : $$('#examBody .code-input').filter(t => !t.value.trim()).length;
  if(empties && !confirm(`יש ${empties} ${exam.mode==='theory'?'שאלות':'תשובות'} ללא מענה. לסיים ולהציג ציון?`)) return;
  await ensureEngines();
  exam.active = false; clearInterval(examTimer);
  let score = 0, max = 0; const lines = [];
  const setExp = (id, ok, html) => { const el = $('#'+id); el.innerHTML = html; el.classList.add('show'); el.classList.toggle('ok-exp', ok); };
  if(exam.mode === 'theory'){
    exam.items.forEach((it,k) => { const q = S.quiz[it.gi], ch = exam.sel[k]; max += 5;
      const ok = ch === q.correct; if(ok) score += 5; P.quiz[it.gi] = ok;
      $$(`#examBody .ex-opt[data-k="${k}"]`).forEach(o => { const j = +o.dataset.j; o.classList.toggle('correct', j === q.correct); o.classList.toggle('wrong', j === ch && !ok); o.disabled = true; });
      setExp('exMcExp'+k, ok, `<b>${ok?'✓ נכון':'✗ '+(ch===undefined?'לא נענתה':'לא נכון')}.</b> התשובה: ${LET[it.perm.indexOf(q.correct)]}. ${ebidi(q.explain)}`); });
  } else {
    exam.items.forEach((item,k) => {
      const isDual = exam.mode === 'dual';
      const sq = isDual ? { check:'select', ...item.sql } : { check:'select', solution:item.solution };
      const key = isDual ? (item.sql.schema||'college2') : 'college';
      const sqlPts = isDual ? 10 : 10, ta = $(`#examBody .ex-sql[data-k="${k}"]`);
      max += sqlPts;
      const g = gradeSqlUI(key, sq, ta.value);
      if(g.ok) score += sqlPts;
      ta.classList.add(g.ok ? 'ok-border' : 'bad-border');
      setExp('exSqlExp'+k, g.ok, `<b>${g.ok?'✓ SQL נכון':'✗ SQL: '+(ta.value.trim()?'':'לא נענתה.')}</b> ${g.ok||!ta.value.trim()?'':g.msg}` +
        (!g.ok && g.user ? '<div class="mini-h">התוצאה שלך:</div>' + resultTable(g.user, 12) : '') +
        (!g.ok && g.expected ? '<div class="mini-h">התוצאה הרצויה:</div>' + resultTable(g.expected, 12) : '') +
        solutionBlock(sq.solution, sq.alt, isDual ? item.sql.explain : ''));
      if(isDual){
        max += 10; const tm = $(`#examBody .ex-mongo[data-k="${k}"]`);
        const gm = gradeMongoUI(item.mongo.dataset, { check:'result', ...item.mongo }, tm.value);
        if(gm.ok) score += 10;
        tm.classList.add(gm.ok ? 'ok-border' : 'bad-border');
        setExp('exMongoExp'+k, gm.ok, `<b>${gm.ok?'✓ MongoDB נכון':'✗ MongoDB: '+(tm.value.trim()?'':'לא נענתה.')}</b> ${gm.ok||!tm.value.trim()?'':gm.msg}` +
          (!gm.ok && gm.user && gm.user.ok ? '<div class="mini-h">התוצאה שלך:</div>' + mongoView(gm.user, 8) : '') +
          (!gm.ok && gm.expected ? '<div class="mini-h">התוצאה הרצויה:</div>' + mongoView(gm.expected, 8) : '') +
          solutionBlock(item.mongo.solution, item.mongo.alt, item.mongo.explain));
        if(g.ok && gm.ok) P.dual[item.id] = { sql:true, mongo:true };
        lines.push(`<li>שאלה ${k+1}: SQL ${g.ok?'✓':'✗'} · MongoDB ${gm.ok?'✓':'✗'}</li>`);
      } else lines.push(`<li>שאילתה ${item.n}: ${g.ok?'✓':'✗'}</li>`);
    });
  }
  const total = Math.round(score / max * 100);
  P.examBest = Math.max(P.examBest, total); P.exams.push({ mode:exam.mode, total, at:Date.now() }); if(P.exams.length > 30) P.exams.shift(); save();
  const mm = String(Math.floor(exam.sec/60)).padStart(2,'0'), ss = String(exam.sec%60).padStart(2,'0');
  $('#examResult').innerHTML = `<div class="result-banner ${total>=60?'pass':'fail'}">${total>=90?'🏆':total>=60?'🎉':'💪'} ${esc(EXAM_MODES[exam.mode].title)} — ציון: ${total}/100</div>
    <div class="card"><p>⏱ זמן: ${mm}:${ss} · ניקוד גולמי: ${score}/${max}</p>${lines.length?`<ul class="res-lines">${lines.join('')}</ul>`:''}
    <p class="muted-sm">גללו למטה — מתחת לכל תשובה מופיעים הבדיקה, התוצאה הרצויה, הפתרון וההסבר.</p></div>`;
  $('#examFinishBtn').classList.add('hidden'); $('#examRestartBtn').classList.remove('hidden');
  $('#examResult').scrollIntoView({ behavior:'smooth' });
}
function setupExam(){
  $('#examModes').innerHTML = Object.entries(EXAM_MODES).map(([k,m]) => `<div class="card exam-mode ${k==='dual'?'featured':''}">
      ${k==='dual'?'<div class="rec-badge">⭐ מומלץ — במתכונת המבחן</div>':''}<h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p>
      <button class="btn" data-mode="${k}">🚀 התחל</button></div>`).join('');
  $$('#examModes [data-mode]').forEach(b => b.onclick = () => startExam(b.dataset.mode));
  $('#examFinishBtn').onclick = finishExam;
  $('#examRestartBtn').onclick = () => { $('#examRun').classList.add('hidden'); $('#examIntro').classList.remove('hidden'); window.scrollTo(0,0); };
}

/* ============================================================
   אתחול
   ============================================================ */
function init(){
  applyTheme((() => { try { return localStorage.getItem(TKEY) || 'light'; } catch(e){ return 'light'; } })());
  $('#themeBtn').onclick = () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  $$('nav.tabs button').forEach(b => b.onclick = () => showView(b.dataset.view));
  $$('#labTabs button').forEach(b => b.onclick = () => showLab(b.dataset.lab));
  $('#homeStart').onclick = () => showView('exam');
  $('#resetProg').onclick = () => { if(confirm('לאפס את כל ההתקדמות בקורס הזה?')){ P = DEF(); save(); location.reload(); } };
  const firstSql = S.chapters.find(c => c.track === 'sql'); if(firstSql){ currentChap = firstSql.id; }
  renderChapTrack(); if(firstSql) { $('#chapBody').innerHTML = ''; selectChapterSilently(firstSql.id); }
  renderSyntax();
  setupFlashcards();
  renderQuizFilters(); renderQuiz();
  $('#quizRestart').onclick = () => { quizPerm = {}; renderQuiz(true); };
  renderSqlFilters(); setupSqlLab(); renderSqlList();
  renderMongoFilters(); setupMongoLab(); renderMongoList();
  renderDualFilters(); setupDual(); renderDualList();
  showLab('dual');
  setupExam();
  showView((location.hash || '#home').slice(1));
}
/* פתיחת פרק ראשון בלי לסמן אותו כ"נקרא" */
function selectChapterSilently(id){ const was = P.read[id]; selectChapter(id); if(!was){ delete P.read[id]; save(); renderChapTrack(); } }

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', () => showView(location.hash.slice(1)));
})();
