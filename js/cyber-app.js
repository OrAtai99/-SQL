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
const LET = ['א','ב','ג','ד','ה'];
const PKEY = 'cyberportal_v1', TKEY = 'bdportal_theme';
const KIND = { concept:'מושגים', process:'תהליכים', scenario:'תרחישים', case:'מקרי בוחן', tool:'כלים ותפקידים', fact:'עובדות', acronym:'🔤 ראשי תיבות', stage:'🔢 שלבים וסדר' };
function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; } return a; }
/* ערבוב דטרמיניסטי — שאלות שנוצרות אוטומטית נשארות זהות בין טעינות (ההתקדמות נשמרת לפי מפתח) */
function seeded(str){ let h = 2166136261; for(let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; }; }
function sshuffle(a, seed){ const r = seeded(seed); a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=(r()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; } return a; }

/* ---------- נתונים מאוחדים ---------- */
const LESSONS = (C.lessons || []).slice().sort((a,b) => a.num - b.num);
LESSONS.forEach(l => { ['concepts','processes','cases','quiz'].forEach(k => l[k] = l[k] || []); });
const LESSON_QS = LESSONS.flatMap(l => l.quiz.map((q,i) => ({ ...q, key: l.id + ':' + i, lesson: l.id })));
const CONCEPTS = LESSONS.flatMap(l => l.concepts.map((c,i) => ({ ...c, key: l.id + ':' + i, lesson: l.id })));
const FLAGS = C.stageFlags || {};
const PROCESSES = LESSONS.flatMap(l => l.processes.map((p,i) => ({ ...p, key: l.id + ':' + i, lesson: l.id, ordered: FLAGS[l.id + '|' + p.name] !== false })));
const CASES = LESSONS.flatMap(l => l.cases.map((c,i) => ({ ...c, key: l.id + ':' + i, lesson: l.id })));
const ACRONYMS = (C.acronyms || []).slice().sort((a,b) => a.abbr.localeCompare(b.abbr));
const ACR_CATS = C.acronymCats || {};
const lessonOf = id => LESSONS.find(l => l.id === id) || { title:id, num:'?', icon:'' };
const lessonLabel = id => { const l = lessonOf(id); return `שיעור ${l.num}`; };

/* ---------- שאלות ראשי תיבות ושלבים: נבדקות ידנית (CYB.extraQuiz) + נוצרות מהנתונים ---------- */
const EXTRA_QS = (C.extraQuiz || []).map((q,i) => ({ ...q, key: 'X:' + i, lesson: q.lesson, source:'extra' }));
const stepName = s => String(s.name || '').replace(/^\s*(שלב\s*)?\d+\s*[.):\-–—]\s*/, '').trim();
function genAcronymQs(){
  const out = [], byCat = {};
  ACRONYMS.forEach(a => (byCat[a.cat] = byCat[a.cat] || []).push(a));
  const others = (a, n, field) => {
    const same = sshuffle((byCat[a.cat] || []).filter(x => x !== a && x[field] !== a[field]), a.abbr + field);
    const rest = sshuffle(ACRONYMS.filter(x => x.cat !== a.cat && x[field] !== a[field]), a.abbr + field + 'r');
    const conf = (a.confuse || []).map(c => ACRONYMS.find(x => x.abbr.toUpperCase() === String(c).toUpperCase())).filter(Boolean);
    const pool = [...conf, ...same, ...rest], seen = new Set([a[field]]), res = [];
    for(const x of pool){ if(res.length >= n) break; if(!seen.has(x[field])){ seen.add(x[field]); res.push(x); } }
    return res;
  };
  /* מסתירים מההגדרה את הקיצור עצמו, את ההרחבה המלאה ואת מילות ההרחבה (Accounting, Recovery…) — שלא יסגירו את התשובה */
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const mask = (txt, a) => {
    let t = String(txt || '').split(a.full).join('___');
    const words = [a.abbr, ...String(a.full).split(/[^A-Za-z0-9&-]+/).filter(w => w.length >= 4)];
    words.forEach(w => { t = t.replace(new RegExp('(^|[^A-Za-z0-9])' + reEsc(w) + '(?=[^A-Za-z0-9]|$)', 'gi'), '$1___'); });
    return t.replace(/(___[\s,]*){2,}/g, '___ ');
  };
  /* "מהו X?" — תשובות בעברית (כמו בשאלות הדוגמה של המרצה): הרישא של ההגדרה, עד הנקודתיים/הנקודה */
  const shortHe = a => { let t = String(a.he || '').split(/[:.(]|\s[–—]\s/)[0].trim(); if(t.length > 55 && t.includes(',')) t = t.split(',')[0].trim();
    return t.length > 70 ? t.slice(0, 68).replace(/\s+\S*$/, '') + '…' : t; };
  /* אותיות הקיצור ← מילות ההרחבה (CIA → Confidentiality, Integrity, Availability; DDoS → D,D,S) */
  const STOP = /^(of|and|as|a|an|the|for|to|in|on|by|with|&)$/i;
  const letterMap = a => {
    const letters = String(a.abbr).replace(/[^A-Z]/g, ''), words = String(a.full).split(/[\s,\/\-–]+/).map(w => w.replace(/[^A-Za-z0-9]/g, '')).filter(w => w && !STOP.test(w));
    return letters.length >= 2 && words.length === letters.length && words.every((w,i) => w[0].toUpperCase() === letters[i]) ? { letters, words } : null;
  };
  const ALLWORDS = [...new Set(ACRONYMS.flatMap(a => { const m = letterMap(a); return m ? m.words : []; }))];
  ACRONYMS.forEach(a => {
    const lesson = (a.lessons || ['L1'])[0], explain = `${a.abbr} = ${a.full} — ${a.he}${a.tip ? ' · ' + a.tip : ''}`;
    const d1 = others(a, 4, 'full');
    if(d1.length === 4) out.push({ key:'G:af:' + a.abbr, kind:'acronym', lesson, difficulty:1, source:'gen', slide:a.slide,
      q:`מה פירוש ראשי התיבות ${a.abbr}?`, options:[a.full, ...d1.map(x => x.full)], correct:0, explain });
    const d2 = others(a, 4, 'abbr');
    if(d2.length === 4 && a.he) out.push({ key:'G:ha:' + a.abbr, kind:'acronym', lesson, difficulty:2, source:'gen', slide:a.slide,
      q:`איזה קיצור מתאים להגדרה: «${mask(a.he, a)}»?`, options:[a.abbr, ...d2.map(x => x.abbr)], correct:0, explain });
    /* "מהו X?" עם תשובות בעברית */
    const mine = shortHe(a), re = new RegExp('(^|[^A-Za-z0-9])' + reEsc(a.abbr) + '([^A-Za-z0-9]|$)', 'i');
    if(mine.length >= 8 && !re.test(mine)){
      const seen = new Set([mine]), d3 = [];
      for(const x of [...others(a, 30, 'abbr')]){ const s = shortHe(x); if(d3.length >= 4) break; if(s.length >= 8 && !seen.has(s) && !re.test(s)){ seen.add(s); d3.push(s); } }
      if(d3.length === 4) out.push({ key:'G:ah:' + a.abbr, kind:'acronym', lesson, difficulty:1, source:'gen', slide:a.slide,
        q:`מהו ${a.abbr}?`, options:[mine, ...d3], correct:0, explain });
    }
    /* "מה מייצגת האות L ב-X?" — אות אחת לכל קיצור (אות שמופיעה פעם אחת בלבד) */
    const m = letterMap(a);
    if(m){
      const idx = sshuffle(m.letters.split('').map((L,i) => i).filter(i => m.letters.split(m.letters[i]).length === 2), a.abbr + 'L');
      if(idx.length){
        const i = idx[0], L = m.letters[i], word = m.words[i], seen = new Set([word.toLowerCase()]), dist = [];
        const pool = [...m.words.filter((w,j) => j !== i), ...sshuffle(ALLWORDS.filter(w => w[0].toUpperCase() === L), a.abbr + 'w'), ...sshuffle(ALLWORDS, a.abbr + 'x')];
        for(const w of pool){ if(dist.length >= 4) break; if(!seen.has(w.toLowerCase())){ seen.add(w.toLowerCase()); dist.push(w); } }
        if(dist.length === 4) out.push({ key:'G:lt:' + a.abbr, kind:'acronym', lesson, difficulty:2, source:'gen', slide:a.slide,
          q:`מה מייצגת האות ${L} בקיצור ${a.abbr}?`, options:[word, ...dist], correct:0, explain:`${a.abbr} = ${a.full}, ולכן ${L} = ${word}. ${a.he}` });
      }
    }
  });
  return out;
}
function genStageQs(){
  const out = [], seenQ = new Set(), seenProc = new Set();
  const push = q => { const k = q.q + '|' + q.options.join('|'); if(seenQ.has(k) || q.options.length !== 5 || new Set(q.options).size !== 5) return; seenQ.add(k); out.push(q); };
  PROCESSES.filter(p => p.ordered && p.steps.length >= 3).forEach(p => {
    if(seenProc.has(p.name)) return; seenProc.add(p.name);   /* אותו תהליך שמופיע בשני שיעורים — פעם אחת */
    const names = p.steps.map(stepName); if(new Set(names).size !== names.length) return;
    const seq = names.map((n,i) => `${i+1}. ${n}`).join(' ← ');
    const explain = `הסדר ב"${p.name}": ${seq}.`, base = { kind:'stage', lesson:p.lesson, slide:p.slide, source:'gen' };
    /* 4 מסיחים: קודם שלבים אחרים מאותו תהליך, ואם אין מספיק — שלבים מתהליכים אחרים באותו שיעור */
    const foreign = PROCESSES.filter(x => x.lesson === p.lesson && x.name !== p.name).flatMap(x => x.steps.map(stepName)).filter(n => !names.includes(n));
    const dist = (exclude, seed) => [...sshuffle(names.filter(n => !exclude.includes(n)), seed), ...sshuffle([...new Set(foreign)], seed + 'x')].slice(0,4);
    push({ ...base, key:'G:first:' + p.key, difficulty:1, q:`מהו השלב הראשון ב"${p.name}"?`, options:[names[0], ...dist([names[0]], p.key + 'f')], correct:0, explain });
    push({ ...base, key:'G:last:' + p.key, difficulty:2, q:`מהו השלב האחרון ב"${p.name}"?`, options:[names[names.length-1], ...dist([names[names.length-1]], p.key + 'l')], correct:0, explain });
    const i = Math.max(0, Math.floor((names.length - 1) / 2) - (names.length > 4 ? 1 : 0));
    if(names.length >= 4) push({ ...base, key:'G:next:' + p.key, difficulty:2, q:`ב"${p.name}" — איזה שלב בא מיד אחרי "${names[i]}"?`, options:[names[i+1], ...dist([names[i], names[i+1]], p.key + 'n')], correct:0, explain });
    if(names.length >= 4){
      const [a,b,c,d] = names.slice(0,4), J = ' ← ';
      push({ ...base, key:'G:ord:' + p.key, difficulty:3, q:`מה הסדר הנכון של ארבעת השלבים הראשונים ב"${p.name}"?`,
        options:[[a,b,c,d].join(J), [b,a,c,d].join(J), [a,c,b,d].join(J), [a,b,d,c].join(J), [b,a,d,c].join(J)], correct:0, explain });
    }
  });
  return out;
}
/* שאלות הדוגמה של המרצה + שאלות דומות + בנק במתכונת המבחן (js/cyber-sample.js) — 5 תשובות */
const SX = C.sampleExam || {};
const SAMPLE_QS = [
  ...(SX.official || []).map(q => ({ ...q, key:'S:o:' + q.n, kind: q.kind || 'concept', source:'official',
      explain: q.explain + (q.eliminationTip ? ' 💡 איך לפסול מסיחים: ' + q.eliminationTip : '') })),
  ...(SX.similar || []).map((q,i) => ({ ...q, key:'S:s:' + i, kind: q.kind || 'concept', source:'similar' })),
  ...(SX.bank || []).map((q,i) => ({ ...q, key:'S:b:' + i, kind: q.kind || 'concept', source:'bank' })),
];
/* סיכום הקורס לחזרה (js/cyber-summary.js): שאלות חזרה, ומושגים מהסיכום שלא הופיעו במילון */
const CS = C.courseSummary || null;
const SUM_QS = ((CS && CS.quiz) || []).map((q,i) => ({ ...q, key:'SUM:q:' + i, kind: q.kind || 'concept', source:'summary' }));
CONCEPTS.push(...((CS && CS.missing) || []).map((c,i) => ({ term:c.term, en:c.en || '', def:c.def, example:c.example || '', slide:c.slide || '', key:'SUM:c:' + i, lesson:c.lesson || 'L1', fromSummary:true })));
/* שאלה שנוצרה אוטומטית ושנוסחה זהה לשאלה קיימת (למשל "מהו RaaS?" משאלות הדוגמה) — מוותרים עליה */
const normQ = s => String(s || '').replace(/\s+/g, ' ').trim();
const TAKEN = new Set([...LESSON_QS, ...SAMPLE_QS, ...SUM_QS, ...EXTRA_QS].map(q => normQ(q.q)));
const GEN_QS = [...genAcronymQs(), ...genStageQs()].filter(q => !TAKEN.has(normQ(q.q)));
const QUESTIONS = [...LESSON_QS, ...SAMPLE_QS, ...SUM_QS, ...EXTRA_QS, ...GEN_QS];
const isEmph = q => q.kind === 'acronym' || q.kind === 'stage';
C.allQuestions = QUESTIONS;   /* לבדיקות (verify) — קריאה בלבד */

/* ---------- התקדמות ---------- */
const DEF = () => ({ read:{}, quiz:{}, seen:{}, known:{}, acrKnown:{}, ordered:{}, examBest:0, exams:[] });
let P = (() => { try { return Object.assign(DEF(), JSON.parse(localStorage.getItem(PKEY) || '{}')); } catch(e){ return DEF(); } })();
function save(){ try { localStorage.setItem(PKEY, JSON.stringify(P)); } catch(e){} }

function applyTheme(t){ document.documentElement.dataset.theme = t; try { localStorage.setItem(TKEY, t); } catch(e){} const b = $('#themeBtn'); if(b) b.textContent = t === 'dark' ? '☀️' : '🌙'; }

/* ============================================================
   ניווט
   ============================================================ */
const VIEWS = ['home','sample','review','lessons','glossary','acronyms','processes','cases','flashcards','quiz','exam'];
function showView(id){
  if(!VIEWS.includes(id)) id = 'home';
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + id));
  $$('nav.tabs button').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  if(id === 'home') renderHome();
  if(id === 'sample') renderSample();
  if(id === 'review') renderReview();
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
  const ORD = PROCESSES.filter(p => p.ordered), ordered = ORD.filter(p => P.ordered[p.key]).length;
  const acr = ACRONYMS.filter(a => P.acrKnown[a.abbr]).length;
  return Math.round(100 * (0.12*r(read, LESSONS.length) + 0.33*r(s.ok, s.n) + 0.12*r(known, CONCEPTS.length) + 0.09*r(ordered, ORD.length) + 0.09*r(acr, ACRONYMS.length) + 0.25*(P.examBest/100)));
}
function renderHome(){
  const pct = readiness(), s = quizStats();
  $('#readyPct').textContent = pct + '%'; $('#readyBar').style.width = pct + '%';
  $('#stRead').textContent = `${LESSONS.filter(l => P.read[l.id]).length}/${LESSONS.length}`;
  $('#stQuiz').textContent = `${s.ok}/${s.n}`;
  $('#stKnown').textContent = `${CONCEPTS.filter(c => P.known[c.key]).length}/${CONCEPTS.length}`;
  if($('#stAcr')) $('#stAcr').textContent = `${ACRONYMS.filter(a => P.acrKnown[a.abbr]).length}/${ACRONYMS.length}`;
  const ORD = PROCESSES.filter(p => p.ordered);
  $('#stOrder').textContent = `${ORD.filter(p => P.ordered[p.key]).length}/${ORD.length}`;
  if($('#emphCounts')) $('#emphCounts').innerHTML = `<b>${CONCEPTS.length}</b> מושגים · <b>${ACRONYMS.length}</b> ראשי תיבות · <b>${ORD.length}</b> תהליכים עם סדר שלבים · <b>${QUESTIONS.filter(isEmph).length}</b> שאלות על ראשי תיבות ושלבים`;
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
  LESSONS.forEach(l => { const s = quizStats(q => q.lesson === l.id && !isEmph(q)); if(s.answered) rows.push({ label:`שיעור ${l.num} — ${l.title}`, pct: Math.round(s.ok/s.answered*100), go:{ lesson:l.id } }); });
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
  if(p.ordered === false) return `<div class="proc-list">${p.steps.map(s => `<div class="proc-item"><div class="ps-name">• ${eb(s.name)}</div>${s.desc?`<div class="ps-desc">${eb(s.desc)}</div>`:''}</div>`).join('')}</div>`;
  return `<div class="proc-flow">${p.steps.map((s,i) => `<div class="proc-step"><div class="ps-n">${i+1}</div><div class="ps-body"><div class="ps-name">${eb(s.name)}</div>${s.desc?`<div class="ps-desc">${eb(s.desc)}</div>`:''}</div></div>`).join('<div class="ps-arrow">←</div>')}</div>`;
}
const procBadge = p => p.ordered === false ? '<span class="badge-pill list-pill">📋 רשימת מרכיבים — אין סדר מחייב</span>' : '<span class="badge-pill seq-pill">🔢 שלבים ברצף — הסדר חשוב</span>';
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
    ${l.processes.length ? `<h4 class="lesson-sub">🔄 תהליכים ומודלים</h4>${PROCESSES.filter(p => p.lesson === l.id).map(p => `<div class="proc-card"><div class="pc-head"><b>${eb(p.name)}</b>${p.en?` <span class="en">${eb(p.en)}</span>`:''} ${procBadge(p)}</div>${p.purpose?`<div class="pc-purpose">${eb(p.purpose)}</div>`:''}${procFlow(p)}</div>`).join('')}` : ''}
    ${ACRONYMS.some(a => (a.lessons||[]).includes(l.id)) ? `<h4 class="lesson-sub">🔤 ראשי התיבות של השיעור</h4><div class="acr-mini">${ACRONYMS.filter(a => (a.lessons||[]).includes(l.id)).map(a => `<span class="acr-chip" title="${esc(a.he)}"><b dir="ltr">${esc(a.abbr)}</b> <span dir="ltr">${esc(a.full)}</span></span>`).join('')}</div>` : ''}
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
    <div class="gc-meta">${esc(lessonLabel(c.lesson))}${c.slide?` · שקף ${esc(c.slide)}`:''}${c.fromSummary?' · 📝 מסיכום הקורס':''}</div></div>`;
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
   ראשי תיבות
   ============================================================ */
let acrCat = 'all', acrHide = false;
function acrCard(a){
  return `<div class="acr-card ${P.acrKnown[a.abbr]?'known':''}" data-abbr="${esc(a.abbr)}">
    <div class="acr-top"><span class="acr-abbr" dir="ltr">${esc(a.abbr)}</span><span class="badge-pill">${esc(ACR_CATS[a.cat] || a.cat)}</span></div>
    <div class="acr-hid">
      <div class="acr-full" dir="ltr">${esc(a.full)}</div>
      <div class="acr-he">${eb(a.he)}</div>
      ${a.tip ? `<div class="acr-tip">💡 ${eb(a.tip)}</div>` : ''}
      ${a.confuse && a.confuse.length ? `<div class="acr-conf">⚠ לא להתבלבל עם: ${a.confuse.map(c => `<b dir="ltr">${esc(c)}</b>`).join(' · ')}</div>` : ''}
    </div>
    <div class="gc-meta">${(a.lessons||[]).map(lessonLabel).join(', ')}${a.slide ? ` · ${esc(a.slide)}` : ''}</div>
    <button class="btn ghost small acr-know" data-know="${esc(a.abbr)}">${P.acrKnown[a.abbr] ? '✓ ידעתי' : 'סמנו: ידעתי'}</button></div>`;
}
function renderAcronyms(){
  const term = ($('#acrSearch').value || '').trim().toLowerCase();
  const list = ACRONYMS.filter(a => (acrCat === 'all' || a.cat === acrCat) && (!term || [a.abbr, a.full, a.he, a.tip].join(' ').toLowerCase().includes(term)));
  $('#acrCount').textContent = `${list.length} ראשי תיבות · ידעתי ${ACRONYMS.filter(a => P.acrKnown[a.abbr]).length}/${ACRONYMS.length}`;
  $('#acrBody').innerHTML = list.length ? `<div class="acr-grid ${acrHide?'hide-defs':''}">${list.map(acrCard).join('')}</div>` : '<div class="muted-sm">לא נמצאו ראשי תיבות.</div>';
  $$('#acrBody .acr-card').forEach(el => el.onclick = e => { if(e.target.closest('[data-know]')) return; if(acrHide) el.classList.toggle('reveal'); });
  $$('#acrBody [data-know]').forEach(b => b.onclick = () => { const k = b.dataset.know; if(P.acrKnown[k]) delete P.acrKnown[k]; else P.acrKnown[k] = true; save(); renderAcronyms(); });
}
function setupAcronyms(){
  const cats = [['all',`הכל (${ACRONYMS.length})`], ...Object.keys(ACR_CATS).filter(k => ACRONYMS.some(a => a.cat === k)).map(k => [k, `${ACR_CATS[k]} (${ACRONYMS.filter(a => a.cat === k).length})`])];
  $('#acrCats').innerHTML = cats.map(([k,t]) => `<button data-c="${esc(k)}" class="${acrCat===k?'active':''}">${esc(t)}</button>`).join('');
  $$('#acrCats button').forEach(b => b.onclick = () => { acrCat = b.dataset.c; $$('#acrCats button').forEach(x => x.classList.toggle('active', x === b)); renderAcronyms(); });
  $('#acrSearch').oninput = renderAcronyms;
  $('#acrHide').onclick = () => { acrHide = !acrHide; $('#acrHide').classList.toggle('active', acrHide); $('#acrHide').textContent = acrHide ? '👁 הצג פירושים' : '🙈 מצב שינון (הסתר פירושים)'; renderAcronyms(); };
  $('#acrDrillBtn').onclick = startDrill;
  $('#acrQuizBtn').onclick = () => goQuizKind('acronym');
  $('#acrFcBtn').onclick = () => { fcSrc = 'acr'; setupFcSrc(); buildFc(); drawFc(); showView('flashcards'); };
  renderAcronyms();
}
/* תרגול מהיר: 10 שאלות ראשי תיבות (בקטגוריה שנבחרה), משוב מיידי */
let drill = null;
function startDrill(){
  const inCat = acrCat === 'all' ? null : ACRONYMS.filter(a => a.cat === acrCat);
  const pool = QUESTIONS.filter(q => q.kind === 'acronym' && (!inCat || inCat.some(a => q.key.endsWith(':' + a.abbr) || q.q.includes(a.abbr))));
  const items = shuffle(pool.length >= 10 ? pool : QUESTIONS.filter(q => q.kind === 'acronym')).sort((x,y) => (P.seen[x.key]||0) - (P.seen[y.key]||0)).slice(0, 10);
  drill = { items, ans:{} };
  items.forEach(q => delete quizPerm[q.key]);
  $('#acrDrill').innerHTML = `<div class="card"><h3>⚡ תרגול מהיר — 10 שאלות${acrCat !== 'all' ? ` · ${esc(ACR_CATS[acrCat])}` : ''}</h3><div id="drillScore" class="muted-sm"></div></div>` + items.map((q,i) => qHtml(q, i+1, 'd-opt')).join('');
  $$('#acrDrill .d-opt').forEach(b => b.onclick = () => { const k = b.dataset.key; if(drill.ans[k] !== undefined) return; const q = QUESTIONS.find(x => x.key === k), j = +b.dataset.j;
    drill.ans[k] = j; P.quiz[k] = (j === q.correct); P.seen[k] = (P.seen[k]||0) + 1; save(); paintQ($('#acrDrill'), k, j);
    const n = Object.keys(drill.ans).length, ok = Object.entries(drill.ans).filter(([kk,jj]) => QUESTIONS.find(x => x.key === kk).correct === jj).length;
    $('#drillScore').textContent = `נענו ${n}/10 · נכונות ${ok}` + (n === 10 ? ` — ${ok >= 8 ? '🎉 מצוין!' : '💪 עוד סבב?'}` : ''); });
  $('#acrDrill').scrollIntoView({ behavior:'smooth' });
}

/* ============================================================
   ⭐ שאלות הדוגמה של המרצה (js/cyber-sample.js)
   ============================================================ */
let sampleBankLesson = 'all', sampleBuilt = false;
const sampleAns = {};
function bindInline(root){
  $$('.i-opt', root).forEach(b => b.onclick = () => {
    const k = b.dataset.key; if(sampleAns[k] !== undefined) return;
    const q = QUESTIONS.find(x => x.key === k), j = +b.dataset.j;
    sampleAns[k] = j; P.quiz[k] = (j === q.correct); P.seen[k] = (P.seen[k]||0) + 1; save();
    paintQ(root, k, j);
    const lessonBtn = $(`.quiz-q[data-key="${CSS.escape(k)}"] .go-lesson`, root); if(lessonBtn) lessonBtn.classList.remove('hidden');
  });
  $$('.go-lesson', root).forEach(b => b.onclick = () => openLesson(b.dataset.l));
  Object.entries(sampleAns).forEach(([k,j]) => { if($(`.quiz-q[data-key="${CSS.escape(k)}"]`, root)) paintQ(root, k, j); });
}
function sampleQHtml(q, num){
  return qHtml(q, num, 'i-opt').replace(/<div class="explain"><\/div><\/div>$/, `<div class="explain"></div><button class="btn ghost small go-lesson hidden" data-l="${esc(q.lesson)}">📚 לשיעור ${esc(String(lessonOf(q.lesson).num))}${q.slide ? ` · שקף ${esc(q.slide)}` : ''}</button></div>`);
}
function renderSample(){
  const box = $('#sampleBody'); if(!box) return;
  if(!SAMPLE_QS.length){ box.innerHTML = '<div class="card">שאלות הדוגמה עוד לא נטענו.</div>'; return; }
  const off = SAMPLE_QS.filter(q => q.source === 'official').sort((a,b) => a.n - b.n), sim = SAMPLE_QS.filter(q => q.source === 'similar'), bank = SAMPLE_QS.filter(q => q.source === 'bank');
  const bankL = bank.filter(q => sampleBankLesson === 'all' || q.lesson === sampleBankLesson);
  box.innerHTML = `
    <div class="card emph-box"><b>📋 מתכונת המבחן:</b> ${eb((SX.format && SX.format.note) || 'שאלות אמריקאיות עם 5 תשובות (א–ה) ותשובה נכונה אחת.')}
      <ul class="tips">${(SX.tips || []).map(t => `<li>${eb(t)}</li>`).join('')}</ul>
      <div class="sql-actions"><button class="btn" id="sampleExamBtn">📝 מבחן במתכונת המבחן — 30 שאלות</button>
        <button class="btn ghost small" id="sampleQuizBtn">❓ כל ${SAMPLE_QS.length} השאלות בסגנון המרצה בבוחן</button></div></div>
    <h3 class="sec-h">⭐ 6 שאלות הדוגמה — ענו, ואז קראו את ההסבר ואיך לפסול מסיחים</h3>
    <div class="sample-list" id="sampleOfficial">${off.map((q,i) => sampleQHtml(q, i+1)).join('')}</div>
    <h3 class="sec-h">🔁 שאלות דומות לשאלות הדוגמה (${sim.length})</h3>
    <p class="muted-sm">לכל שאלת דוגמה — שאלות על אותו רעיון מזוויות אחרות.</p>
    <div class="sample-list" id="sampleSimilar">${off.map(o => { const g = sim.filter(q => q.base === o.n); return g.length ? `<div class="sim-group"><div class="sim-head">דומות לשאלה ${o.n}: ${eb(o.topic || o.q)}</div>${g.map((q,i) => sampleQHtml(q, `${o.n}.${i+1}`)).join('')}</div>` : ''; }).join('')}</div>
    <h3 class="sec-h">📝 בנק שאלות במתכונת המבחן (${bank.length})</h3>
    <div class="chip-row small" id="sampleBankLessons">${[['all','כל השיעורים'], ...LESSONS.filter(l => bank.some(q => q.lesson === l.id)).map(l => [l.id, `שיעור ${l.num}`])].map(([k,t]) => `<button data-l="${esc(k)}" class="${sampleBankLesson===k?'active':''}">${esc(t)}</button>`).join('')}</div>
    <div class="sample-list" id="sampleBank">${bankL.map((q,i) => sampleQHtml(q, i+1)).join('')}</div>`;
  bindInline(box);
  $$('#sampleBankLessons button').forEach(b => b.onclick = () => { sampleBankLesson = b.dataset.l; renderSample(); $('#sampleBankLessons').scrollIntoView(); });
  $('#sampleExamBtn').onclick = () => { showView('exam'); startExam(30, 'format'); };
  $('#sampleQuizBtn').onclick = () => goQuizKind('__sample');
}

/* ============================================================
   📝 סיכום הקורס לחזרה (js/cyber-summary.js)
   ============================================================ */
let revHide = false;
function renderReview(){
  const box = $('#reviewBody'); if(!box) return;
  if(!CS){ box.innerHTML = '<div class="card">סיכום הקורס עוד לא נטען.</div>'; return; }
  const corr = CS.corrections || [];
  /* תיקון שייך לשורה לפי המונח — ואם צוינה טבלה, רק לשורה בטבלה הזו (למשל "הפקת לקחים" מופיע פעמיים) */
  const corrFor = (term, table) => corr.filter(c => c.where !== 'finalReview' && c.term && term && c.term === term && (!c.table || c.table === table));
  const corrFinal = t => corr.filter(c => c.where === 'finalReview' && c.term && String(t).includes(c.term.replace(/\s*\(.*\)\s*$/, '')));
  const lessonBtn = (l, s) => l ? `<button class="rev-lesson" data-l="${esc(l)}" title="לשיעור">📚 ${esc(lessonLabel(l))}${s ? ` · ש' ${esc(s)}` : ''}</button>` : '';
  const block = b => {
    if(b.type === 'table'){
      const n = (b.head && b.head.length) || ((b.rows[0] || {}).cells || []).length;
      return `<div class="rev-table-wrap">${b.title ? `<h4 class="rev-th">${eb(b.title)}</h4>` : ''}<table class="mini rev-table"><thead><tr>${(b.head || []).map(h => `<th>${eb(h)}</th>`).join('')}<th class="rev-src"></th></tr></thead><tbody>
        ${(b.rows || []).map(r => { const cs = corrFor(r.term, b.title || ''); return `<tr>${(r.cells || []).map((c,i) => `<td class="${i === r.cells.length - 1 && n > 1 ? 'rev-def' : 'rev-term'}">${eb(c)}${i === r.cells.length - 1 && cs.length ? cs.map(x => `<div class="rev-corr ${esc(x.severity)}">⚠ לפי השקפים: ${eb(x.slidesSay)}</div>`).join('') : ''}</td>`).join('')}<td class="rev-src">${lessonBtn(r.lesson, r.slide)}</td></tr>`; }).join('')}
      </tbody></table></div>`;
    }
    if(b.type === 'note') return `<div class="callout rev-note">${b.label ? `<b>${eb(b.label)}:</b> ` : ''}${eb(b.text || '')}</div>`;
    if(b.type === 'sequence') return `<div class="rev-seq">${b.title ? `<h4 class="rev-th">${eb(b.title)}</h4>` : ''}${procFlow({ steps: b.steps || [] })}</div>`;
    if(b.type === 'bullets') return `<div class="rev-bul">${b.title ? `<h4 class="rev-th">${eb(b.title)}</h4>` : ''}<ul class="tips">${(b.items || []).map(t => `<li>${eb(t)}</li>`).join('')}</ul></div>`;
    return '';
  };
  const stages = CS.stages || [], nav = [...stages.map(s => [`rev-s${s.n}`, `שלב ${s.n}`]), ...(CS.cases && CS.cases.length ? [['rev-cases','מקרי בוחן']] : []), ...(CS.finalReview && CS.finalReview.length ? [['rev-final','🔥 חזרה אחרונה']] : []), ['rev-practice','⚡ תרגול']];
  box.innerHTML = `
    <div class="card emph-box"><b>📝 ${eb(CS.title || 'סיכום הקורס')}</b> — כל המושגים לפי שלבי הקורס, בטבלאות קצרות. לכל מושג יש קישור לשיעור ולשקף.${corr.length ? ` ${corr.length} מקומות שבהם הניסוח בסיכום לא מדויק מסומנים ב-⚠, עם הנוסח מהשקפים.` : ''}
      <div class="sql-actions"><button class="btn ghost small" id="revHide">${revHide ? '👁 הצג פירושים' : '🙈 מצב שינון (הסתר פירושים)'}</button>
        <button class="btn small" id="revDrillBtn">⚡ בחן את עצמך — 10 שאלות</button>
        <button class="btn ghost small" id="revQuizBtn">❓ כל ${SUM_QS.length} שאלות הסיכום בבוחן</button>
        <button class="btn ghost small" id="revFcBtn">🎴 כרטיסיות מהסיכום</button></div></div>
    <div class="chip-row small rev-nav">${nav.map(([id,t]) => `<button data-go="${id}">${esc(t)}</button>`).join('')}</div>
    <div class="${revHide ? 'rev-hide' : ''}" id="revDoc">
    ${stages.map(s => `<section class="card rev-stage" id="rev-s${s.n}"><h3>שלב ${s.n} — ${eb(s.title)}</h3>${(s.blocks || []).map(block).join('')}</section>`).join('')}
    ${CS.cases && CS.cases.length ? `<section class="card rev-stage" id="rev-cases"><h3>📰 מקרי הבוחן — משפט אחד לכל אירוע</h3><table class="mini rev-table"><thead><tr><th>אירוע</th><th>מה לזכור</th><th class="rev-src"></th></tr></thead><tbody>
      ${CS.cases.map(c => `<tr><td class="rev-term" dir="auto"><b>${eb(c.name)}</b></td><td class="rev-def">${eb(c.text)}</td><td class="rev-src">${lessonBtn(c.lesson)}</td></tr>`).join('')}</tbody></table></section>` : ''}
    ${CS.finalReview && CS.finalReview.length ? `<section class="card rev-stage rev-final" id="rev-final"><h3>🔥 חזרה אחרונה לפני המבחן</h3><ul class="tips">${CS.finalReview.map(t => `<li>${eb(t)}${corrFinal(t).map(x => `<div class="rev-corr ${esc(x.severity)}">⚠ לפי השקפים: ${eb(x.slidesSay)}</div>`).join('')}</li>`).join('')}</ul></section>` : ''}
    </div>
    ${(CS.missing || []).length ? `<div class="card"><h3>📌 מושגים מהסיכום שנוספו למילון</h3><p class="muted-sm">המושגים האלה מופיעים בסיכום ולא היו במילון המושגים של האתר — עכשיו הם שם (מסומנים "מסיכום הקורס").</p><div class="gloss-grid">${CONCEPTS.filter(c => c.fromSummary).map(conceptCard).join('')}</div></div>` : ''}
    <section id="rev-practice"><h3 class="sec-h">⚡ תרגול על הסיכום</h3><div id="revDrill" class="sample-list"><p class="muted-sm">לחצו "בחן את עצמך" לקבלת 10 שאלות (5 תשובות, כמו במבחן).</p></div></section>`;
  $$('#reviewBody .rev-lesson').forEach(b => b.onclick = () => openLesson(b.dataset.l));
  $$('#reviewBody .rev-nav [data-go]').forEach(b => b.onclick = () => { const t = $('#' + b.dataset.go); if(t){ const h = ($('header.top') || {}).offsetHeight || 80; window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY - h - 10); } });
  $$('#revDoc .rev-def').forEach(td => td.onclick = () => { if(revHide) td.classList.toggle('reveal'); });
  $('#revHide').onclick = () => { revHide = !revHide; $('#revDoc').classList.toggle('rev-hide', revHide); $('#revHide').textContent = revHide ? '👁 הצג פירושים' : '🙈 מצב שינון (הסתר פירושים)'; $$('#revDoc .rev-def.reveal').forEach(td => td.classList.remove('reveal')); };
  $('#revDrillBtn').onclick = () => {
    const items = shuffle(SUM_QS).sort((x,y) => (P.seen[x.key]||0) - (P.seen[y.key]||0)).slice(0, 10);
    items.forEach(q => { delete quizPerm[q.key]; delete sampleAns[q.key]; });
    $('#revDrill').innerHTML = items.map((q,i) => sampleQHtml(q, i+1)).join('');
    bindInline($('#revDrill'));
    $('#rev-practice').scrollIntoView({ behavior:'smooth' });
  };
  $('#revQuizBtn').onclick = () => goQuizKind('__summary');
  $('#revFcBtn').onclick = () => { fcSrc = 'sum'; setupFcSrc(); buildFc(); drawFc(); showView('flashcards'); };
}

/* ============================================================
   תהליכים + משחק "סדר את השלבים"
   ============================================================ */
let game = null, procF = 'ordered';
function renderProcesses(){
  if(!PROCESSES.length){ $('#procBody').innerHTML = '<div class="muted-sm">אין תהליכים.</div>'; return; }
  const nO = PROCESSES.filter(p => p.ordered).length, nL = PROCESSES.length - nO;
  const list = PROCESSES.filter(p => procF === 'all' || (procF === 'ordered') === p.ordered);
  $('#procBody').innerHTML = `<div class="card emph-box"><b>🎯 המרצה הדגישה: לדעת את השלבים.</b> ${nO} תהליכים הם <b>רצף שלבים</b> — שם הסדר נשאל במבחן (מה הראשון, מה בא אחרי, מה האחרון). ${nL} הם <b>רשימות מרכיבים</b> (כמו CIA או עקרונות צ'אלדיני) — צריך להכיר את המרכיבים, בלי סדר מחייב.
      <div class="sql-actions"><button class="btn small" data-quiz-kind="stage">❓ ${QUESTIONS.filter(q => q.kind === 'stage').length} שאלות על שלבים וסדר</button></div></div>
    <div class="chip-row">${[['ordered',`🔢 שלבים ברצף (${nO})`],['list',`📋 רשימות מרכיבים (${nL})`],['all',`הכל (${PROCESSES.length})`]].map(([k,t]) => `<button data-pf="${k}" class="${procF===k?'active':''}">${t}</button>`).join('')}</div>` +
    list.map(p => `<div class="card proc-card ${P.ordered[p.key]?'done-card':''}" id="proc-${esc(p.key.replace(':','-'))}">
      <div class="pc-head"><b>${eb(p.name)}</b>${p.en?` <span class="en">${eb(p.en)}</span>`:''} <span class="badge-pill">${esc(lessonLabel(p.lesson))}</span> ${procBadge(p)}${P.ordered[p.key]?' <span class="badge-pill ok">✓ סודר נכון</span>':''}</div>
      ${p.purpose?`<div class="pc-purpose">${eb(p.purpose)}</div>`:''}
      <div class="pc-flow-wrap">${procFlow(p)}</div>
      <div class="order-game hidden"></div>
      <div class="pc-actions">${p.ordered ? `<button class="btn small" data-game="${esc(p.key)}">🧩 סדרו את השלבים</button>` : ''}<button class="btn ghost small" data-toggle="${esc(p.key)}">🙈 הסתר/הצג ${p.ordered ? 'שלבים' : 'מרכיבים'}</button></div>
    </div>`).join('');
  $$('#procBody [data-pf]').forEach(b => b.onclick = () => { procF = b.dataset.pf; renderProcesses(); });
  $$('#procBody [data-quiz-kind]').forEach(b => b.onclick = () => goQuizKind(b.dataset.quizKind));
  $$('#procBody [data-toggle]').forEach(b => b.onclick = () => b.closest('.proc-card').querySelector('.pc-flow-wrap').classList.toggle('hidden'));
  $$('#procBody [data-game]').forEach(b => b.onclick = () => startGame(b.dataset.game, b.closest('.proc-card')));
}
function goQuizKind(k){ quizLesson = 'all'; quizKind = k; renderQuizFilters(); renderQuiz(true); showView('quiz'); }
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
let fcLesson = 'all', fcDir = 'term', fcOrder = [], fcIdx = 0, fcOnlyUnknown = false, fcSrc = 'concepts';
/* fcSrc: 'concepts' (מושג ↔ הגדרה) או 'acr' (ראשי תיבות ↔ פירוש). מפתחות: מושג = L1:3, ראשי תיבות = A:CIA */
const fcKnown = k => k.startsWith('A:') ? P.acrKnown[k.slice(2)] : P.known[k];
const fcSetKnown = (k, v) => { const o = k.startsWith('A:') ? P.acrKnown : P.known, kk = k.startsWith('A:') ? k.slice(2) : k; if(v) o[kk] = true; else delete o[kk]; };
/* שורות הטבלאות בסיכום הקורס — מפתח R:<שלב>:<בלוק>:<שורה> */
const SUM_ROWS = !CS ? [] : (CS.stages || []).flatMap((st,si) => (st.blocks || []).flatMap((b,bi) => b.type === 'table' ? (b.rows || []).map((r,ri) => ({ key:`R:${si}:${bi}:${ri}`, term:r.term, meaning:r.meaning, lesson:r.lesson, stage:st, table:b.title || '' })) : []))
  .filter(r => r.term && r.meaning);
function buildFc(){
  const keys = fcSrc === 'acr'
    ? ACRONYMS.filter(a => fcLesson === 'all' || (a.lessons||[]).includes(fcLesson)).map(a => 'A:' + a.abbr)
    : fcSrc === 'sum'
    ? SUM_ROWS.filter(r => fcLesson === 'all' || r.lesson === fcLesson).map(r => r.key)
    : CONCEPTS.filter(c => fcLesson === 'all' || c.lesson === fcLesson).map(c => c.key);
  fcOrder = shuffle(keys.filter(k => !fcOnlyUnknown || !fcKnown(k))); fcIdx = 0;
}
function drawFc(){
  $('#fcInner').classList.remove('flipped');
  if(!fcOrder.length){ $('#fcFrontTxt').textContent = fcOnlyUnknown ? '🎉 ידעת את כל הכרטיסיות בקבוצה הזו!' : 'אין כרטיסיות'; $('#fcBackTxt').textContent = ''; $('#fcCounter').textContent = '0/0'; $('#fcKnownBadge').style.display = 'none'; return; }
  const k = fcOrder[fcIdx];
  if(k.startsWith('A:')){
    const a = ACRONYMS.find(x => 'A:' + x.abbr === k), full = `${a.abbr} = ${a.full}`;
    $('#fcFrontTxt').textContent = bidi(fcDir === 'term' ? a.abbr : a.he);
    $('#fcBackTxt').textContent = bidi(fcDir === 'term' ? `${a.full} — ${a.he}` : full);
    $('#fcFrontTag').textContent = fcDir === 'term' ? 'ראשי תיבות — מה הפירוש?' : 'פירוש — מה הקיצור?';
    $('#fcCounter').textContent = `${fcIdx+1}/${fcOrder.length} · 🔤 ${(a.lessons||[]).map(lessonLabel).join(', ')}`;
  } else if(k.startsWith('R:')){
    const r = SUM_ROWS.find(x => x.key === k);
    $('#fcFrontTxt').textContent = bidi(fcDir === 'term' ? r.term : r.meaning);
    $('#fcBackTxt').textContent = bidi(fcDir === 'term' ? r.meaning : r.term);
    $('#fcFrontTag').textContent = fcDir === 'term' ? 'מהסיכום — מה הפירוש?' : 'מהסיכום — מה המושג?';
    $('#fcCounter').textContent = `${fcIdx+1}/${fcOrder.length} · 📝 שלב ${r.stage.n}${r.lesson ? ' · ' + lessonLabel(r.lesson) : ''}`;
  } else {
    const c = CONCEPTS.find(x => x.key === k);
    const term = c.term + (c.en ? ` (${c.en})` : '');
    $('#fcFrontTxt').textContent = bidi(fcDir === 'term' ? term : c.def);
    $('#fcBackTxt').textContent = bidi(fcDir === 'term' ? c.def : term);
    $('#fcFrontTag').textContent = fcDir === 'term' ? 'מושג — מה ההגדרה?' : 'הגדרה — מה המושג?';
    $('#fcCounter').textContent = `${fcIdx+1}/${fcOrder.length} · ${lessonLabel(c.lesson)}`;
  }
  $('#fcKnownBadge').style.display = fcKnown(k) ? 'inline-block' : 'none';
}
function setupFcSrc(){
  $('#fcSrc').innerHTML = [['concepts',`📖 מושגים (${CONCEPTS.length})`],['acr',`🔤 ראשי תיבות (${ACRONYMS.length})`], ...(SUM_ROWS.length ? [['sum',`📝 מהסיכום (${SUM_ROWS.length})`]] : [])].map(([k,t]) => `<button data-s="${k}" class="${fcSrc===k?'active':''}">${t}</button>`).join('');
  $$('#fcSrc button').forEach(b => b.onclick = () => { fcSrc = b.dataset.s; setupFcSrc(); buildFc(); drawFc(); });
}
function setupFlashcards(){
  setupFcSrc();
  $('#fcLessons').innerHTML = [['all','הכל'], ...LESSONS.map(l => [l.id, `שיעור ${l.num}`])].map(([k,t]) => `<button data-l="${esc(k)}" class="${fcLesson===k?'active':''}">${esc(t)}</button>`).join('');
  $$('#fcLessons button').forEach(b => b.onclick = () => { fcLesson = b.dataset.l; $$('#fcLessons button').forEach(x => x.classList.toggle('active', x === b)); buildFc(); drawFc(); });
  $('#fcInner').onclick = () => $('#fcInner').classList.toggle('flipped');
  $('#fcNext').onclick = () => { if(fcOrder.length){ fcIdx = (fcIdx+1) % fcOrder.length; drawFc(); } };
  $('#fcPrev').onclick = () => { if(fcOrder.length){ fcIdx = (fcIdx-1+fcOrder.length) % fcOrder.length; drawFc(); } };
  $('#fcShuffle').onclick = () => { buildFc(); drawFc(); };
  $('#fcDir').onclick = () => { fcDir = fcDir === 'term' ? 'def' : 'term'; $('#fcDir').textContent = fcDir === 'term' ? '🔁 הפוך: הגדרה ← מושג' : '🔁 הפוך: מושג ← הגדרה'; drawFc(); };
  $('#fcMode').onclick = () => { fcOnlyUnknown = !fcOnlyUnknown; $('#fcMode').classList.toggle('active', fcOnlyUnknown); buildFc(); drawFc(); };
  $('#fcKnow').onclick = () => { if(!fcOrder.length) return; fcSetKnown(fcOrder[fcIdx], true); save(); if(fcOnlyUnknown){ fcOrder.splice(fcIdx,1); if(fcIdx >= fcOrder.length) fcIdx = 0; } else fcIdx = (fcIdx+1) % fcOrder.length; drawFc(); };
  $('#fcDontKnow').onclick = () => { if(!fcOrder.length) return; fcSetKnown(fcOrder[fcIdx], false); save(); const k = fcOrder.splice(fcIdx,1)[0]; fcOrder.splice(Math.min(fcIdx+3, fcOrder.length), 0, k); if(fcIdx >= fcOrder.length) fcIdx = 0; drawFc(); };
  buildFc(); drawFc();
}

/* ============================================================
   בוחן
   ============================================================ */
let quizLesson = 'all', quizKind = 'all', quizOrder = [], quizShown = 20, quizPerm = {}, quizAns = {};
function quizSet(){ return QUESTIONS.filter(q => (quizLesson === 'all' || q.lesson === quizLesson) &&
  (quizKind === 'all' || (quizKind === '__sample' ? !!q.source && ['official','similar','bank'].includes(q.source) : quizKind === '__summary' ? q.source === 'summary' : q.kind === quizKind))); }
function renderQuizFilters(){
  const lessons = [['all','כל השיעורים'], ...LESSONS.map(l => [l.id, `שיעור ${l.num}`])];
  const kinds = [['all','כל הסוגים'], ...(SAMPLE_QS.length ? [['__sample','⭐ בסגנון שאלות הדוגמה']] : []), ...(SUM_QS.length ? [['__summary','📝 מסיכום הקורס']] : []), ...Object.keys(KIND).filter(k => QUESTIONS.some(q => q.kind === k)).map(k => [k, KIND[k]])];
  $('#quizFilters').innerHTML = `<div class="chip-row">${lessons.map(([k,t]) => `<button data-ql="${esc(k)}" class="${quizLesson===k?'active':''}">${esc(t)}</button>`).join('')}</div>
    <div class="chip-row small">${kinds.map(([k,t]) => `<button data-qk="${esc(k)}" class="${quizKind===k?'active':''}">${esc(t)}</button>`).join('')}</div>`;
  $$('#quizFilters [data-ql]').forEach(b => b.onclick = () => { quizLesson = b.dataset.ql; renderQuizFilters(); renderQuiz(true); });
  $$('#quizFilters [data-qk]').forEach(b => b.onclick = () => { quizKind = b.dataset.qk; renderQuizFilters(); renderQuiz(true); });
}
function qHtml(q, num, cls, extraAttr){
  const perm = quizPerm[q.key] = quizPerm[q.key] || shuffle([...q.options.keys()]);
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
  const fresh = pool => shuffle(pool).sort((x,y) => (P.seen[x.key]||0) - (P.seen[y.key]||0));
  /* ראשי תיבות ושלבים — חצי משאלות ההבנה שנכתבו ונבדקו ידנית, חצי מהשאלות שנוצרו מהנתונים */
  const emphPick = (kind, k, only5) => {
    const ok = q => !only5 || q.options.length === 5;
    const hand = fresh(EXTRA_QS.filter(q => q.kind === kind && ok(q))), gen = fresh(GEN_QS.filter(q => q.kind === kind && ok(q)));
    const take = [...hand.slice(0, Math.ceil(k / 2)), ...gen.slice(0, k)].slice(0, k);
    return take.length < k ? take.concat(hand.slice(Math.ceil(k / 2)).slice(0, k - take.length)) : take;
  };
  /* בסבב לפי שיעורים — כדי שכל השיעורים ייוצגו */
  const roundRobin = (pool, k) => { const by = {}; pool.forEach(q => (by[q.lesson] = by[q.lesson] || []).push(q)); const ls = shuffle(Object.keys(by)), out = []; let i = 0;
    while(out.length < k && ls.some(l => by[l].length)){ const l = ls[i++ % ls.length]; if(by[l].length) out.push(by[l].shift()); } return out; };
  if(mode === 'format'){
    /* במתכונת המבחן: 5 תשובות לכל שאלה — שאלות דומות לשאלות הדוגמה, בנק בסגנון המרצה, ראשי תיבות, שלבים ושאלות שיעור */
    const five = q => q.options.length === 5, out = [];
    out.push(...fresh(SAMPLE_QS.filter(q => q.source === 'similar')).slice(0, Math.round(n * 0.2)));
    out.push(...roundRobin(fresh(SAMPLE_QS.filter(q => q.source === 'bank')), Math.round(n * (SUM_QS.length ? 0.2 : 0.3))));
    if(SUM_QS.length) out.push(...roundRobin(fresh(SUM_QS), Math.round(n * 0.1)));
    out.push(...emphPick('acronym', Math.round(n / 6), true), ...emphPick('stage', Math.round(n / 6), true));
    const used = new Set(out.map(q => q.key));
    out.push(...roundRobin(fresh(LESSON_QS.filter(q => five(q) && !used.has(q.key))), n - out.length));
    if(out.length < n) out.push(...fresh(QUESTIONS.filter(q => five(q) && !out.includes(q))).slice(0, n - out.length));
    return shuffle(out.slice(0, n));
  }
  /* תמהיל: ~2/3 שאלות שיעור · ~1/6 ראשי תיבות · ~1/6 שלבים (הדגשי המרצה) */
  const nA = Math.round(n / 6), nS = Math.round(n / 6), nL = n - nA - nS;
  /* שאלות השיעור — חלוקה יחסית לפי מספר השאלות בכל שיעור, עם עדיפות לשאלות שנראו פחות */
  const total = LESSON_QS.length, alloc = LESSONS.map(l => ({ l, exact: nL * l.quiz.length / total }));
  alloc.forEach(a => a.k = Math.floor(a.exact));
  let rest = nL - alloc.reduce((s,a) => s + a.k, 0);
  alloc.slice().sort((a,b) => (b.exact - b.k) - (a.exact - a.k)).forEach(a => { if(rest > 0 && a.k < a.l.quiz.length){ a.k++; rest--; } });
  const out = [];
  alloc.forEach(a => {
    /* שאלות השיעור + שאלות בסגנון המרצה (דומות ובנק) של אותו שיעור */
    const pool = fresh([...LESSON_QS, ...SAMPLE_QS.filter(q => q.source !== 'official')].filter(q => q.lesson === a.l.id));
    /* גיוון בסוגי השאלות */
    const byKind = {}; pool.forEach(q => (byKind[q.kind] = byKind[q.kind] || []).push(q));
    const kinds = shuffle(Object.keys(byKind)); let i = 0;
    while(out.filter(q => q.lesson === a.l.id).length < a.k && kinds.some(k => byKind[k].length)){ const k = kinds[i++ % kinds.length]; if(byKind[k].length) out.push(byKind[k].shift()); }
  });
  out.push(...emphPick('acronym', nA), ...emphPick('stage', nS));
  return shuffle(out);
}
function startExam(n, mode){
  const items = pickExam(n, mode);
  if(!items.length){ alert(mode === 'wrong' ? 'אין עדיין שאלות שטעית בהן — מצוין! ענו קודם על שאלות בבוחן.' : 'אין שאלות.'); return; }
  exam = { items, sel:{}, sec:0, active:true, mode, n: items.length };
  $('#examIntro').classList.add('hidden'); $('#examRun').classList.remove('hidden'); $('#examResult').innerHTML = '';
  $('#examFinishBtn').classList.remove('hidden'); $('#examRestartBtn').classList.add('hidden');
  $('#examModeTitle').textContent = mode === 'wrong' ? `מבחן על הטעויות שלך — ${items.length} שאלות` : mode === 'format' ? `⭐ במתכונת המבחן — ${items.length} שאלות, 5 תשובות לכל שאלה` : `מבחן אמריקאי — ${items.length} שאלות`;
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
    ...(SAMPLE_QS.length ? [{ n:30, mode:'format', title:'⭐ במתכונת המבחן', desc:'30 שאלות עם 5 תשובות (א–ה) כמו בשאלות הדוגמה של המרצה: שאלות דומות לשאלות הדוגמה, בנק בסגנון שלה, ראשי תיבות, שלבים ושאלות מכל השיעורים.', featured:true, badge:'⭐ כמו המבחן האמיתי' }] : []),
    { n:20, title:'מבחן קצר', desc:'20 שאלות מכל השיעורים, כולל ראשי תיבות ושלבים — חזרה מהירה.' },
    { n:30, title:'מבחן מלא', desc:'30 שאלות: כ-20 מהשיעורים (בחלוקה יחסית), 5 על ראשי תיבות ו-5 על סדר שלבים — לפי הדגשי המרצה.', featured:!SAMPLE_QS.length },
    { n:40, title:'מבחן מורחב', desc:'40 שאלות — לאימון סיבולת ולכיסוי רחב.' },
    { n:30, mode:'wrong', title:'מבחן על הטעויות שלי', desc:'רק שאלות שטעיתם בהן בבוחן או בסימולציות קודמות.' },
  ];
  $('#examModes').innerHTML = modes.map((m,i) => `<div class="card exam-mode ${m.featured?'featured':''}">${m.featured?`<div class="rec-badge">${m.badge || '⭐ מומלץ'}</div>`:''}
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
  setupGlossary(); setupAcronyms(); renderProcesses(); renderCases(); setupFlashcards();
  $$('main [data-view-go]').forEach(b => b.onclick = () => { if(b.dataset.pf){ procF = b.dataset.pf; renderProcesses(); } showView(b.dataset.viewGo); });
  $$('main [data-quiz-go]').forEach(b => b.onclick = () => goQuizKind(b.dataset.quizGo));
  renderQuizFilters(); renderQuiz(true);
  $('#quizRestart').onclick = () => renderQuiz(true);
  setupExam();
  showView((location.hash || '#home').slice(1));
}
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', () => showView(location.hash.slice(1)));
})();
