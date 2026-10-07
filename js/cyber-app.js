/* ============================================================
   פורטל 7186 — מבוא להגנת סייבר — לוגיקת האפליקציה
   נתונים: CYB.meta (cyber-meta.js) + CYB.lessons (cyber-L1..L8.js)
   ============================================================ */
(function(){
'use strict';
const C = window.CYB || { lessons:[], meta:{} };
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bidi = s => window.bidiLtr ? window.bidiLtr(String(s ?? '')) : String(s ?? '');
const eb = s => esc(bidi(s));
const LET = ['א','ב','ג','ד'];
const PKEY = 'cyberportal_v1', TKEY = 'bdportal_theme';
const KIND = { concept:'מושגים', process:'תהליכים', scenario:'תרחישים', case:'מקרי בוחן', tool:'כלים ותפקידים', fact:'עובדות' };
function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; } return a; }

/* ---------- נתונים מאוחדים ---------- */
const LESSONS = (C.lessons || []).slice().sort((a,b) => a.num - b.num);
LESSONS.forEach(l => { ['concepts','processes','cases','quiz'].forEach(k => l[k] = l[k] || []); });
const QUESTIONS = LESSONS.flatMap(l => l.quiz.map((q,i) => ({ ...q, key: l.id + ':' + i, lesson: l.id })));
const CONCEPTS = LESSONS.flatMap(l => l.concepts.map((c,i) => ({ ...c, key: l.id + ':' + i, lesson: l.id })));
const PROCESSES = LESSONS.flatMap(l => l.processes.map((p,i) => ({ ...p, key: l.id + ':' + i, lesson: l.id })));
const CASES = LESSONS.flatMap(l => l.cases.map((c,i) => ({ ...c, key: l.id + ':' + i, lesson: l.id })));
const lessonOf = id => LESSONS.find(l => l.id === id) || { title:id, num:'?', icon:'' };
const lessonLabel = id => { const l = lessonOf(id); return `שיעור ${l.num}`; };

/* ---------- התקדמות ---------- */
const DEF = () => ({ read:{}, quiz:{}, seen:{}, known:{}, ordered:{}, examBest:0, exams:[] });
let P = (() => { try { return Object.assign(DEF(), JSON.parse(localStorage.getItem(PKEY) || '{}')); } catch(e){ return DEF(); } })();
function save(){ try { localStorage.setItem(PKEY, JSON.stringify(P)); } catch(e){} }

function applyTheme(t){ document.documentElement.dataset.theme = t; try { localStorage.setItem(TKEY, t); } catch(e){} const b = $('#themeBtn'); if(b) b.textContent = t === 'dark' ? '☀️' : '🌙'; }

/* ============================================================
   ניווט
   ============================================================ */
const VIEWS = ['home','lessons','glossary','processes','cases','flashcards','quiz','exam'];
function showView(id){
  if(!VIEWS.includes(id)) id = 'home';
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + id));
  $$('nav.tabs button').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  if(id === 'home') renderHome();
  window.scrollTo(0, 0);
  try { history.replaceState(null, '', '#' + id); } catch(e){}
}

/* ============================================================
   בית
   ============================================================ */
function quizStats(filter){
  const qs = QUESTIONS.filter(filter || (() => true));
  const answered = qs.filter(q => P.quiz[q.key] !== undefined), ok = answered.filter(q => P.quiz[q.key] === true);
  return { n: qs.length, answered: answered.length, ok: ok.length };
}
function readiness(){
  const r = (a,b) => b ? a/b : 0, s = quizStats();
  const read = LESSONS.filter(l => P.read[l.id]).length;
  const known = CONCEPTS.filter(c => P.known[c.key]).length;
  const ordered = PROCESSES.filter(p => P.ordered[p.key]).length;
  return Math.round(100 * (0.12*r(read, LESSONS.length) + 0.38*r(s.ok, s.n) + 0.15*r(known, CONCEPTS.length) + 0.10*r(ordered, PROCESSES.length) + 0.25*(P.examBest/100)));
}
function renderHome(){
  const pct = readiness(), s = quizStats();
  $('#readyPct').textContent = pct + '%'; $('#readyBar').style.width = pct + '%';
  $('#stRead').textContent = `${LESSONS.filter(l => P.read[l.id]).length}/${LESSONS.length}`;
  $('#stQuiz').textContent = `${s.ok}/${s.n}`;
  $('#stKnown').textContent = `${CONCEPTS.filter(c => P.known[c.key]).length}/${CONCEPTS.length}`;
  $('#stOrder').textContent = `${PROCESSES.filter(p => P.ordered[p.key]).length}/${PROCESSES.length}`;
  $('#stExam').textContent = P.examBest;
  $('#homeExamInfo').textContent = (C.meta && C.meta.exam) || 'מבחן אמריקאי';
  $('#homeLessons').innerHTML = LESSONS.map(l => { const st = quizStats(q => q.lesson === l.id);
    return `<div class="card home-card ${P.read[l.id]?'done-card':''}" data-l="${esc(l.id)}">
      <div class="ic">${l.icon||'🛡️'}</div><div><h3>שיעור ${l.num}: ${eb(l.title)}</h3>
      <div class="hc-sub">${l.concepts.length} מושגים · ${l.processes.length} תהליכים · ${l.quiz.length} שאלות${st.answered ? ` · דיוק ${Math.round(st.ok/st.answered*100)}%` : ''}${P.read[l.id] ? ' · ✓ נקרא' : ''}</div></div></div>`; }).join('');
  $$('#homeLessons [data-l]').forEach(el => el.onclick = () => openLesson(el.dataset.l));
  $('#homeGoals').innerHTML = ((C.meta && C.meta.goals) || []).map(g => `<li>${eb(g)}</li>`).join('');
  renderWeak();
}
function renderWeak(){
  const rows = [];
  LESSONS.forEach(l => { const s = quizStats(q => q.lesson === l.id); if(s.answered) rows.push({ label:`שיעור ${l.num} — ${l.title}`, pct: Math.round(s.ok/s.answered*100), go:{ lesson:l.id } }); });
  Object.keys(KIND).forEach(k => { const s = quizStats(q => q.kind === k); if(s.answered >= 3) rows.push({ label:`סוג: ${KIND[k]}`, pct: Math.round(s.ok/s.answered*100), go:{ kind:k } }); });
  rows.sort((a,b) => a.pct - b.pct);
  if(!rows.length){ $('#weakList').innerHTML = '<div class="muted-sm">ענו על שאלות בבוחן — כאן תראו אילו שיעורים וסוגי שאלות כדאי לחזק.</div>'; return; }
  $('#weakList').innerHTML = rows.map((r,i) => `<div class="weak-row" data-i="${i}"><div class="weak-name">${eb(r.label)}</div>
    <div class="weak-bar"><i class="${r.pct>=80?'good':r.pct>=55?'mid':'low'}" style="width:${r.pct}%"></i></div><div class="weak-pct">${r.pct}%</div></div>`).join('') +
    (rows[0].pct < 70 ? `<div class="weak-tip">💡 הכי חלש: <b>${eb(rows[0].label)}</b> — לחצו לתרגול ממוקד.</div>` : `<div class="weak-tip good-tip">💪 הכל מעל 70% — עברו לסימולציות!</div>`);
  $$('#weakList .weak-row').forEach(el => el.onclick = () => { const g = rows[+el.dataset.i].go; quizLesson = g.lesson || 'all'; quizKind = g.kind || 'all'; renderQuizFilters(); renderQuiz(true); showView('quiz'); });
}

/* ============================================================
   שיעורים
   ============================================================ */
let curLesson = null;
function renderLessonNav(){
  $('#lessonNav').innerHTML = LESSONS.map(l => `<button data-id="${esc(l.id)}" class="${curLesson===l.id?'active':''}">${l.icon||''} ${l.num}. ${eb(l.title)}${P.read[l.id]?' ✓':''}</button>`).join('');
  $$('#lessonNav button').forEach(b => b.onclick = () => selectLesson(b.dataset.id));
}
function procFlow(p){
  return `<div class="proc-flow">${p.steps.map((s,i) => `<div class="proc-step"><div class="ps-n">${i+1}</div><div class="ps-body"><div class="ps-name">${eb(s.name)}</div>${s.desc?`<div class="ps-desc">${eb(s.desc)}</div>`:''}</div></div>`).join('<div class="ps-arrow">←</div>')}</div>`;
}
function selectLesson(id, markRead = true){
  const l = lessonOf(id); if(!l.id) return;
  curLesson = id; if(markRead){ P.read[id] = true; save(); }
  renderLessonNav();
  const i = LESSONS.indexOf(l), prev = LESSONS[i-1], next = LESSONS[i+1];
  $('#lessonBody').innerHTML = `<section>
    <h3>${l.icon||''} שיעור ${l.num}: ${eb(l.title)}</h3>
    <div class="callout lesson-summary">${eb(l.summary)}</div>
    ${l.html}
    ${l.concepts.length ? `<h4 class="lesson-sub">📖 מושגי השיעור (${l.concepts.length})</h4><div class="gloss-grid">${l.concepts.map(conceptCard).join('')}</div>` : ''}
    ${l.processes.length ? `<h4 class="lesson-sub">🔄 תהליכים ומודלים</h4>${l.processes.map(p => `<div class="proc-card"><div class="pc-head"><b>${eb(p.name)}</b>${p.en?` <span class="en">${eb(p.en)}</span>`:''}</div>${p.purpose?`<div class="pc-purpose">${eb(p.purpose)}</div>`:''}${procFlow(p)}</div>`).join('')}` : ''}
    ${l.cases.length ? `<h4 class="lesson-sub">📰 מקרי בוחן</h4><div class="case-grid">${l.cases.map(caseCard).join('')}</div>` : ''}
    <div class="lesson-actions"><button class="btn" data-practice="${esc(l.id)}">❓ תרגול שאלות על השיעור (${l.quiz.length})</button></div>
    <div class="chap-nav-bottom">
      ${prev ? `<button class="btn ghost small" data-go="${esc(prev.id)}">→ שיעור ${prev.num}</button>` : '<span></span>'}
      ${next ? `<button class="btn small" data-go="${esc(next.id)}">שיעור ${next.num} ←</button>` : '<span></span>'}
    </div></section>`;
  $$('#lessonBody [data-go]').forEach(b => b.onclick = () => { selectLesson(b.dataset.go); window.scrollTo(0,0); });
  $$('#lessonBody [data-practice]').forEach(b => b.onclick = () => { quizLesson = b.dataset.practice; quizKind = 'all'; renderQuizFilters(); renderQuiz(true); showView('quiz'); });
}
function openLesson(id){ showView('lessons'); selectLesson(id); }

/* ============================================================
   מושגים
   ============================================================ */
function conceptCard(c){
  return `<div class="gloss-card ${P.known[c.key]?'known':''}" data-key="${esc(c.key)}">
    <div class="gc-term">${eb(c.term)}${c.en?` <span class="en" dir="ltr">${esc(c.en)}</span>`:''}</div>
    <div class="gc-def">${eb(c.def)}</div>
    ${c.example?`<div class="gc-ex">לדוגמה: ${eb(c.example)}</div>`:''}
    <div class="gc-meta">${esc(lessonLabel(c.lesson))}${c.slide?` · שקף ${esc(c.slide)}`:''}</div></div>`;
}
let glossLesson = 'all', glossHide = false;
function renderGlossary(){
  const term = ($('#glossSearch').value || '').trim().toLowerCase();
  const list = CONCEPTS.filter(c => (glossLesson === 'all' || c.lesson === glossLesson) &&
    (!term || [c.term, c.en, c.def, c.example].join(' ').toLowerCase().includes(term)));
  $('#glossCount').textContent = `${list.length} מושגים`;
  $('#glossBody').innerHTML = list.length ? `<div class="gloss-grid ${glossHide?'hide-defs':''}">${list.map(conceptCard).join('')}</div>` : '<div class="muted-sm">לא נמצאו מושגים.</div>';
  $$('#glossBody .gloss-card').forEach(el => el.onclick = () => { if(glossHide) el.classList.toggle('reveal'); });
}
function setupGlossary(){
  $('#glossLessons').innerHTML = [['all','הכל'], ...LESSONS.map(l => [l.id, `שיעור ${l.num}`])].map(([k,t]) => `<button data-l="${esc(k)}" class="${glossLesson===k?'active':''}">${esc(t)}</button>`).join('');
  $$('#glossLessons button').forEach(b => b.onclick = () => { glossLesson = b.dataset.l; $$('#glossLessons button').forEach(x => x.classList.toggle('active', x === b)); renderGlossary(); });
  $('#glossSearch').oninput = renderGlossary;
  $('#glossHide').onclick = () => { glossHide = !glossHide; $('#glossHide').classList.toggle('active', glossHide); $('#glossHide').textContent = glossHide ? '👁 הצג הגדרות' : '🙈 מצב שינון (הסתר הגדרות)'; renderGlossary(); };
  renderGlossary();
}

/* ============================================================
   תהליכים + משחק "סדר את השלבים"
   ============================================================ */
let game = null;
function renderProcesses(){
  if(!PROCESSES.length){ $('#procBody').innerHTML = '<div class="muted-sm">אין תהליכים.</div>'; return; }
  $('#procBody').innerHTML = PROCESSES.map(p => `<div class="card proc-card ${P.ordered[p.key]?'done-card':''}" id="proc-${esc(p.key.replace(':','-'))}">
      <div class="pc-head"><b>${eb(p.name)}</b>${p.en?` <span class="en">${eb(p.en)}</span>`:''} <span class="badge-pill">${esc(lessonLabel(p.lesson))}</span>${P.ordered[p.key]?' <span class="badge-pill ok">✓ סודר נכון</span>':''}</div>
      ${p.purpose?`<div class="pc-purpose">${eb(p.purpose)}</div>`:''}
      <div class="pc-flow-wrap">${procFlow(p)}</div>
      <div class="order-game hidden"></div>
      <div class="pc-actions"><button class="btn small" data-game="${esc(p.key)}">🧩 סדרו את השלבים</button><button class="btn ghost small" data-toggle="${esc(p.key)}">🙈 הסתר/הצג שלבים</button></div>
    </div>`).join('');
  $$('#procBody [data-toggle]').forEach(b => b.onclick = () => b.closest('.proc-card').querySelector('.pc-flow-wrap').classList.toggle('hidden'));
  $$('#procBody [data-game]').forEach(b => b.onclick = () => startGame(b.dataset.game, b.closest('.proc-card')));
}
function startGame(key, card){
  const p = PROCESSES.find(x => x.key === key); if(!p) return;
  card.querySelector('.pc-flow-wrap').classList.add('hidden');
  const box = card.querySelector('.order-game'); box.classList.remove('hidden');
  game = { key, next:0, mistakes:0, order: shuffle(p.steps.map((s,i) => i)) };
  if(p.steps.length > 2 && game.order.every((v,i) => v === i)) game.order.reverse();
  const draw = () => {
    box.innerHTML = `<div class="og-help">לחצו על השלבים <b>לפי הסדר הנכון</b> (שלב ${Math.min(game.next+1, p.steps.length)} מתוך ${p.steps.length})${game.mistakes?` · טעויות: ${game.mistakes}`:''}</div>
      <div class="og-done">${p.steps.slice(0, game.next).map((s,i) => `<span class="og-chip ok">${i+1}. ${eb(s.name)}</span>`).join('')}</div>
      <div class="og-pool">${game.order.filter(i => i >= game.next).map(i => `<button class="og-chip" data-i="${i}">${eb(p.steps[i].name)}</button>`).join('')}</div>
      <div class="og-msg"></div>`;
    $$('.og-pool button', box).forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      if(i === game.next){ game.next++; if(game.next === p.steps.length){ finishGame(p, card); return; } draw(); }
      else { game.mistakes++; b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400);
        $('.og-msg', box).innerHTML = `✗ לא זה. רמז: השלב הבא קשור ל"${eb(p.steps[game.next].desc ? p.steps[game.next].desc.slice(0, 60) + (p.steps[game.next].desc.length > 60 ? '…' : '') : p.steps[game.next].name)}"`; }
    });
  };
  draw();
}
function finishGame(p, card){
  const perfect = game.mistakes === 0;
  if(perfect){ P.ordered[p.key] = true; save(); }
  const box = card.querySelector('.order-game');
  box.innerHTML = `<div class="feedback show ${perfect?'ok':'info'}">${perfect ? '🎉 מושלם — כל השלבים לפי הסדר, בלי טעויות!' : `✓ סיימתם עם ${game.mistakes} טעויות — נסו שוב עד שזה יוצא בלי טעויות.`}</div>${procFlow(p)}`;
}

/* ============================================================
   מקרי בוחן
   ============================================================ */
function caseCard(c){
  return `<div class="case-card"><div class="cc-name">${eb(c.name)}${c.year?` <span class="badge-pill">${esc(c.year)}</span>`:''}</div>
    <div class="cc-row"><b>מה קרה:</b> ${eb(c.what)}</div>
    ${c.how?`<div class="cc-row"><b>שיטת התקיפה:</b> ${eb(c.how)}</div>`:''}
    ${c.impact?`<div class="cc-row"><b>השפעה ולקחים:</b> ${eb(c.impact)}</div>`:''}
    <div class="gc-meta">${esc(lessonLabel(c.lesson))}${c.slide?` · שקף ${esc(c.slide)}`:''}</div></div>`;
}
function renderCases(){ $('#casesBody').innerHTML = CASES.length ? `<div class="case-grid">${CASES.map(caseCard).join('')}</div>` : '<div class="muted-sm">אין מקרי בוחן.</div>'; }

/* ============================================================
   כרטיסיות (מושג ↔ הגדרה)
   ============================================================ */
let fcLesson = 'all', fcDir = 'term', fcOrder = [], fcIdx = 0, fcOnlyUnknown = false;
function buildFc(){ fcOrder = shuffle(CONCEPTS.filter(c => (fcLesson === 'all' || c.lesson === fcLesson) && (!fcOnlyUnknown || !P.known[c.key])).map(c => c.key)); fcIdx = 0; }
function drawFc(){
  $('#fcInner').classList.remove('flipped');
  if(!fcOrder.length){ $('#fcFrontTxt').textContent = fcOnlyUnknown ? '🎉 ידעת את כל המושגים בקבוצה הזו!' : 'אין מושגים'; $('#fcBackTxt').textContent = ''; $('#fcCounter').textContent = '0/0'; $('#fcKnownBadge').style.display = 'none'; return; }
  const c = CONCEPTS.find(x => x.key === fcOrder[fcIdx]);
  const term = c.term + (c.en ? ` (${c.en})` : '');
  $('#fcFrontTxt').textContent = bidi(fcDir === 'term' ? term : c.def);
  $('#fcBackTxt').textContent = bidi(fcDir === 'term' ? c.def : term);
  $('#fcFrontTag').textContent = fcDir === 'term' ? 'מושג — מה ההגדרה?' : 'הגדרה — מה המושג?';
  $('#fcCounter').textContent = `${fcIdx+1}/${fcOrder.length} · ${lessonLabel(c.lesson)}`;
  $('#fcKnownBadge').style.display = P.known[c.key] ? 'inline-block' : 'none';
}
function setupFlashcards(){
  $('#fcLessons').innerHTML = [['all','הכל'], ...LESSONS.map(l => [l.id, `שיעור ${l.num}`])].map(([k,t]) => `<button data-l="${esc(k)}" class="${fcLesson===k?'active':''}">${esc(t)}</button>`).join('');
  $$('#fcLessons button').forEach(b => b.onclick = () => { fcLesson = b.dataset.l; $$('#fcLessons button').forEach(x => x.classList.toggle('active', x === b)); buildFc(); drawFc(); });
  $('#fcInner').onclick = () => $('#fcInner').classList.toggle('flipped');
  $('#fcNext').onclick = () => { if(fcOrder.length){ fcIdx = (fcIdx+1) % fcOrder.length; drawFc(); } };
  $('#fcPrev').onclick = () => { if(fcOrder.length){ fcIdx = (fcIdx-1+fcOrder.length) % fcOrder.length; drawFc(); } };
  $('#fcShuffle').onclick = () => { buildFc(); drawFc(); };
  $('#fcDir').onclick = () => { fcDir = fcDir === 'term' ? 'def' : 'term'; $('#fcDir').textContent = fcDir === 'term' ? '🔁 הפוך: הגדרה ← מושג' : '🔁 הפוך: מושג ← הגדרה'; drawFc(); };
  $('#fcMode').onclick = () => { fcOnlyUnknown = !fcOnlyUnknown; $('#fcMode').classList.toggle('active', fcOnlyUnknown); buildFc(); drawFc(); };
  $('#fcKnow').onclick = () => { if(!fcOrder.length) return; P.known[fcOrder[fcIdx]] = true; save(); if(fcOnlyUnknown){ fcOrder.splice(fcIdx,1); if(fcIdx >= fcOrder.length) fcIdx = 0; } else fcIdx = (fcIdx+1) % fcOrder.length; drawFc(); };
  $('#fcDontKnow').onclick = () => { if(!fcOrder.length) return; delete P.known[fcOrder[fcIdx]]; save(); const k = fcOrder.splice(fcIdx,1)[0]; fcOrder.splice(Math.min(fcIdx+3, fcOrder.length), 0, k); if(fcIdx >= fcOrder.length) fcIdx = 0; drawFc(); };
  buildFc(); drawFc();
}

/* ============================================================
   בוחן
   ============================================================ */
let quizLesson = 'all', quizKind = 'all', quizOrder = [], quizShown = 20, quizPerm = {}, quizAns = {};
function quizSet(){ return QUESTIONS.filter(q => (quizLesson === 'all' || q.lesson === quizLesson) && (quizKind === 'all' || q.kind === quizKind) && (quizLesson !== 'wrong' || true)); }
function renderQuizFilters(){
  const lessons = [['all','כל השיעורים'], ...LESSONS.map(l => [l.id, `שיעור ${l.num}`])];
  const kinds = [['all','כל הסוגים'], ...Object.keys(KIND).filter(k => QUESTIONS.some(q => q.kind === k)).map(k => [k, KIND[k]])];
  $('#quizFilters').innerHTML = `<div class="chip-row">${lessons.map(([k,t]) => `<button data-ql="${esc(k)}" class="${quizLesson===k?'active':''}">${esc(t)}</button>`).join('')}</div>
    <div class="chip-row small">${kinds.map(([k,t]) => `<button data-qk="${esc(k)}" class="${quizKind===k?'active':''}">${esc(t)}</button>`).join('')}</div>`;
  $$('#quizFilters [data-ql]').forEach(b => b.onclick = () => { quizLesson = b.dataset.ql; renderQuizFilters(); renderQuiz(true); });
  $$('#quizFilters [data-qk]').forEach(b => b.onclick = () => { quizKind = b.dataset.qk; renderQuizFilters(); renderQuiz(true); });
}
function qHtml(q, num, cls, extraAttr){
  const perm = quizPerm[q.key] = quizPerm[q.key] || shuffle([0,1,2,3]);
  return `<div class="quiz-q" data-key="${esc(q.key)}" ${extraAttr||''}>
    <div class="qnum">שאלה ${num} <span class="qtopic">${esc(lessonLabel(q.lesson))} · ${esc(KIND[q.kind]||q.kind)}</span></div>
    <div class="qtext">${eb(q.q)}</div>
    ${perm.map((orig,d) => `<button class="opt ${cls}" data-key="${esc(q.key)}" data-j="${orig}"><span class="mark">${LET[d]}</span> ${eb(q.options[orig])}</button>`).join('')}
    <div class="explain"></div></div>`;
}
function renderQuiz(reset){
  if(reset || !quizOrder.length){ quizOrder = shuffle(quizSet().map(q => q.key)); quizShown = 20; quizAns = {}; quizPerm = {}; }
  const byKey = k => QUESTIONS.find(q => q.key === k);
  $('#quizBody').innerHTML = quizOrder.slice(0, quizShown).map((k,i) => qHtml(byKey(k), i+1, 'q-opt')).join('') +
    (quizOrder.length > quizShown ? `<div style="text-align:center"><button class="btn ghost" id="quizMore">הצג עוד ${Math.min(20, quizOrder.length - quizShown)} שאלות ↓</button></div>` : '') +
    (!quizOrder.length ? '<div class="muted-sm">אין שאלות בסינון הזה.</div>' : '');
  $$('#quizBody .q-opt').forEach(b => b.onclick = () => answerQuiz(b.dataset.key, +b.dataset.j));
  Object.entries(quizAns).forEach(([k,j]) => paintQ($('#quizBody'), k, j));
  const more = $('#quizMore'); if(more) more.onclick = () => { quizShown += 20; renderQuiz(); };
  $('#quizResult').innerHTML = ''; updateQuizScore();
}
function paintQ(root, key, chosen, quiet){
  const q = QUESTIONS.find(x => x.key === key), box = $(`.quiz-q[data-key="${CSS.escape(key)}"]`, root); if(!box) return;
  $$('.opt', box).forEach(o => { const j = +o.dataset.j; o.classList.toggle('correct', j === q.correct); o.classList.toggle('wrong', j === chosen && j !== q.correct); o.disabled = true; });
  const cd = quizPerm[key].indexOf(q.correct), ex = $('.explain', box);
  ex.innerHTML = `<b>${chosen === q.correct ? '✓ נכון!' : chosen === undefined ? '✗ לא נענתה.' : '✗ לא נכון.'}</b> התשובה הנכונה: ${LET[cd]}. ${eb(q.explain)}${q.slide ? `<span class="slide-ref"> (שקף ${esc(q.slide)})</span>` : ''}`;
  ex.classList.add('show'); ex.classList.toggle('ok-exp', chosen === q.correct);
}
function answerQuiz(key, j){
  if(quizAns[key] !== undefined) return;
  const q = QUESTIONS.find(x => x.key === key);
  quizAns[key] = j; P.quiz[key] = (j === q.correct); P.seen[key] = (P.seen[key]||0) + 1; save();
  paintQ($('#quizBody'), key, j); updateQuizScore();
}
function updateQuizScore(){
  const ans = Object.keys(quizAns).length, ok = Object.entries(quizAns).filter(([k,j]) => QUESTIONS.find(q => q.key === k).correct === j).length;
  $('#quizScore').textContent = `נענו ${ans}/${quizOrder.length} · נכונות ${ok}` + (ans ? ` (${Math.round(ok/ans*100)}%)` : '');
  if(ans && ans === quizOrder.length){ const pct = Math.round(ok/ans*100); $('#quizResult').innerHTML = `<div class="result-banner ${pct>=60?'pass':'fail'}">${pct>=60?'🎉':'💪'} סיימת את הסט! ציון: ${pct} (${ok}/${ans})</div>`; }
}

/* ============================================================
   סימולציית מבחן
   ============================================================ */
let exam = null, examTimer = null;
function pickExam(n, mode){
  if(mode === 'wrong'){
    const pool = shuffle(QUESTIONS.filter(q => P.quiz[q.key] === false));
    return pool.slice(0, n);
  }
  /* חלוקה יחסית לפי מספר השאלות בכל שיעור, עם עדיפות לשאלות שנראו פחות */
  const total = QUESTIONS.length, alloc = LESSONS.map(l => ({ l, exact: n * l.quiz.length / total }));
  alloc.forEach(a => a.k = Math.floor(a.exact));
  let rest = n - alloc.reduce((s,a) => s + a.k, 0);
  alloc.slice().sort((a,b) => (b.exact - b.k) - (a.exact - a.k)).forEach(a => { if(rest > 0 && a.k < a.l.quiz.length){ a.k++; rest--; } });
  const out = [];
  alloc.forEach(a => {
    const pool = shuffle(QUESTIONS.filter(q => q.lesson === a.l.id)).sort((x,y) => (P.seen[x.key]||0) - (P.seen[y.key]||0));
    /* גיוון בסוגי השאלות */
    const byKind = {}; pool.forEach(q => (byKind[q.kind] = byKind[q.kind] || []).push(q));
    const kinds = shuffle(Object.keys(byKind)); let i = 0;
    while(out.filter(q => q.lesson === a.l.id).length < a.k && kinds.some(k => byKind[k].length)){ const k = kinds[i++ % kinds.length]; if(byKind[k].length) out.push(byKind[k].shift()); }
  });
  return shuffle(out);
}
function startExam(n, mode){
  const items = pickExam(n, mode);
  if(!items.length){ alert(mode === 'wrong' ? 'אין עדיין שאלות שטעית בהן — מצוין! ענו קודם על שאלות בבוחן.' : 'אין שאלות.'); return; }
  exam = { items, sel:{}, sec:0, active:true, mode, n: items.length };
  $('#examIntro').classList.add('hidden'); $('#examRun').classList.remove('hidden'); $('#examResult').innerHTML = '';
  $('#examFinishBtn').classList.remove('hidden'); $('#examRestartBtn').classList.add('hidden');
  $('#examModeTitle').textContent = mode === 'wrong' ? `מבחן על הטעויות שלך — ${items.length} שאלות` : `מבחן אמריקאי — ${items.length} שאלות`;
  items.forEach(q => delete quizPerm[q.key]);
  $('#examBody').innerHTML = items.map((q,i) => qHtml(q, i+1, 'ex-opt')).join('');
  $$('#examBody .ex-opt').forEach(b => b.onclick = () => { if(!exam.active) return; const k = b.dataset.key; exam.sel[k] = +b.dataset.j;
    $$(`#examBody .ex-opt[data-key="${CSS.escape(k)}"]`).forEach(o => o.classList.toggle('selected', o === b)); updateExamProgress(); });
  updateExamProgress();
  clearInterval(examTimer);
  examTimer = setInterval(() => { exam.sec++; $('#examTimer').textContent = `${String(Math.floor(exam.sec/60)).padStart(2,'0')}:${String(exam.sec%60).padStart(2,'0')}`; }, 1000);
  window.scrollTo(0,0);
}
function updateExamProgress(){ $('#examProgress').textContent = `נענו ${Object.keys(exam.sel).length}/${exam.items.length}`; }
function finishExam(){
  if(!exam || !exam.active) return;
  const empty = exam.items.length - Object.keys(exam.sel).length;
  if(empty && !confirm(`יש ${empty} שאלות ללא מענה. לסיים ולהציג ציון?`)) return;
  exam.active = false; clearInterval(examTimer);
  let ok = 0; const per = {}, perKind = {};
  exam.items.forEach(q => {
    const ch = exam.sel[q.key], right = ch === q.correct; if(right) ok++;
    P.quiz[q.key] = right; P.seen[q.key] = (P.seen[q.key]||0) + 1;
    (per[q.lesson] = per[q.lesson] || { n:0, ok:0 }).n++; if(right) per[q.lesson].ok++;
    (perKind[q.kind] = perKind[q.kind] || { n:0, ok:0 }).n++; if(right) perKind[q.kind].ok++;
    paintQ($('#examBody'), q.key, ch);
  });
  const total = Math.round(ok / exam.items.length * 100);
  if(exam.mode !== 'wrong'){ P.examBest = Math.max(P.examBest, total); P.exams.push({ n:exam.items.length, total, at:Date.now() }); if(P.exams.length > 30) P.exams.shift(); }
  save();
  const bar = (label, s) => { const p = Math.round(s.ok/s.n*100); return `<div class="weak-row"><div class="weak-name">${eb(label)}</div><div class="weak-bar"><i class="${p>=80?'good':p>=55?'mid':'low'}" style="width:${p}%"></i></div><div class="weak-pct">${s.ok}/${s.n}</div></div>`; };
  const mm = String(Math.floor(exam.sec/60)).padStart(2,'0'), ss = String(exam.sec%60).padStart(2,'0');
  $('#examResult').innerHTML = `<div class="result-banner ${total>=60?'pass':'fail'}">${total>=90?'🏆':total>=60?'🎉':'💪'} ציון: ${total}/100 (${ok}/${exam.items.length} נכונות)</div>
    <div class="card"><p>⏱ זמן: ${mm}:${ss}</p>
      <div class="exam-breakdown"><div><h4>לפי שיעור</h4>${LESSONS.filter(l => per[l.id]).map(l => bar(`שיעור ${l.num} — ${l.title}`, per[l.id])).join('')}</div>
      <div><h4>לפי סוג שאלה</h4>${Object.keys(perKind).map(k => bar(KIND[k]||k, perKind[k])).join('')}</div></div>
      <p class="muted-sm">גללו למטה — מתחת לכל שאלה מופיעים התשובה הנכונה, ההסבר ומספר השקף. השאלות שטעיתם בהן נכנסות ל"מבחן על הטעויות".</p></div>`;
  $('#examFinishBtn').classList.add('hidden'); $('#examRestartBtn').classList.remove('hidden');
  $('#examResult').scrollIntoView({ behavior:'smooth' });
}
function setupExam(){
  const modes = [
    { n:20, title:'מבחן קצר', desc:'20 שאלות מכל השיעורים — חזרה מהירה.' },
    { n:30, title:'מבחן מלא', desc:'30 שאלות בחלוקה יחסית לפי השיעורים — במתכונת המבחן.', featured:true },
    { n:40, title:'מבחן מורחב', desc:'40 שאלות — לאימון סיבולת ולכיסוי רחב.' },
    { n:30, mode:'wrong', title:'מבחן על הטעויות שלי', desc:'רק שאלות שטעיתם בהן בבוחן או בסימולציות קודמות.' },
  ];
  $('#examModes').innerHTML = modes.map((m,i) => `<div class="card exam-mode ${m.featured?'featured':''}">${m.featured?'<div class="rec-badge">⭐ מומלץ</div>':''}
      <h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p><button class="btn" data-m="${i}">🚀 התחל</button></div>`).join('');
  $$('#examModes [data-m]').forEach(b => b.onclick = () => { const m = modes[+b.dataset.m]; startExam(m.n, m.mode); });
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
  $('#homeStart').onclick = () => showView('exam');
  $('#resetProg').onclick = () => { if(confirm('לאפס את כל ההתקדמות בקורס הזה?')){ P = DEF(); save(); location.reload(); } };
  $('#metaTopics').innerHTML = ((C.meta && C.meta.topics) || []).map(t => `<li>${eb(t)}</li>`).join('');
  $('#metaMethod').textContent = (C.meta && C.meta.method) || '';
  renderLessonNav(); if(LESSONS[0]) selectLesson(LESSONS[0].id, false);
  setupGlossary(); renderProcesses(); renderCases(); setupFlashcards();
  renderQuizFilters(); renderQuiz(true);
  $('#quizRestart').onclick = () => renderQuiz(true);
  setupExam();
  showView((location.hash || '#home').slice(1));
}
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', () => showView(location.hash.slice(1)));
})();
