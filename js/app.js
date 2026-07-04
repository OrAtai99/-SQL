/* ============================================================
   פורטל למידה — ניהול ועיצוב בסיסי נתונים (גרסה 3)
   כולל: מורה SQL חכם, ניתוח חולשות, תרגול טעויות,
   כרטיסיות חכמות, הסברים בסימולציה.
   ============================================================ */
const C = window.COURSE;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const AL = ['א','ב','ג','ד'];

/* ---------------- מעקב התקדמות (localStorage) ---------------- */
const PKEY = 'bdportal_v2';
let PROG = (()=>{ try { return JSON.parse(localStorage.getItem(PKEY)) || {}; } catch(e){ return {}; } })();
PROG.topicsRead = PROG.topicsRead || {};
PROG.quiz = PROG.quiz || {};
PROG.sql  = PROG.sql  || {};
PROG.fcKnown = PROG.fcKnown || {};
PROG.levels = PROG.levels || {};   // { levelId: [solved exercise indices] }
PROG.levelExam = PROG.levelExam || {};   // { levelId: best exam % }
PROG.examBest = PROG.examBest || 0;
function saveProg(){ try { localStorage.setItem(PKEY, JSON.stringify(PROG)); } catch(e){} }

/* ---------------- ערכת נושא ---------------- */
const TKEY = 'bdportal_theme';
function applyTheme(t){
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(TKEY, t); } catch(e){}
  const b = $('#themeBtn'); if(b) b.textContent = t==='dark' ? '☀️' : '🌙';
}
function readiness(){
  const t = Object.keys(PROG.topicsRead).length / C.topics.length;
  const qCorrect = Object.values(PROG.quiz).filter(v=>v===1).length;
  const q = qCorrect / C.quiz.length;
  const s = Object.keys(PROG.sql).length / C.sqlQuestions.length;
  const lv = (C.sqlLevels ? levelsCompleted()/C.sqlLevels.length : 0);
  const e = PROG.examBest / 100;
  return { pct: Math.round((t*0.15 + q*0.25 + s*0.2 + lv*0.2 + e*0.2) * 100),
           topics:Object.keys(PROG.topicsRead).length, quizCorrect:qCorrect,
           sqlSolved:Object.keys(PROG.sql).length, levels:(C.sqlLevels?levelsCompleted():0), examBest:PROG.examBest };
}

/* ---------------- ניווט ---------------- */
function showView(id){
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-'+id));
  $$('nav.tabs button').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  window.scrollTo({top:0, behavior:'smooth'});
  if(id === 'sql') ensureSql();
  if(id === 'sqllevels'){ ensureSql(); renderLevels(); }
  if(id === 'home') renderHome();
}

/* ============================================================
   מסלול SQL מדורג
   ============================================================ */
function levelSolved(id){ return (PROG.levels[id] || []).length; }
function levelComplete(id){
  const lv = C.sqlLevels.find(l=>l.id===id);
  return lv && levelSolved(id) >= lv.exercises.length;
}
function levelUnlocked(id){ return id === 1 || levelComplete(id-1); }
function levelsCompleted(){ return C.sqlLevels.filter(l=>levelComplete(l.id)).length; }

function renderLevels(){
  $('#levelDetail').classList.add('hidden');
  $('#levelsGrid').classList.remove('hidden');
  const done = levelsCompleted();
  $('#levelsProgress').innerHTML = `<b>${done}/${C.sqlLevels.length}</b> רמות הושלמו`;
  $('#levelsProgBar').style.width = Math.round(done/C.sqlLevels.length*100) + '%';
  $('#levelsGrid').innerHTML = C.sqlLevels.map(lv => {
    const solved = levelSolved(lv.id), total = lv.exercises.length;
    const complete = solved >= total, unlocked = levelUnlocked(lv.id);
    const examPct = (PROG.levelExam[lv.id]||0), examPassed = examPct === 100;
    const pct = Math.round(solved/total*100);
    const ic = examPassed?'🏆':complete?'✅':unlocked?'📘':'🔒';
    return `<div class="lvl-card ${complete?'complete':''} ${examPassed?'passed':''} ${unlocked?'':'locked'}" data-id="${lv.id}">
      <div class="lvl-top">
        <span class="lvl-num">רמה ${lv.id}${examPct?` · בחינה ${examPct}%`:''}</span>
        <span class="lvl-ic">${ic}</span>
      </div>
      <h3 class="lvl-title">${esc(lv.title)}</h3>
      <div class="lvl-sub">${esc(lv.subtitle)}</div>
      <div class="lvl-tags">${lv.tags.map(t=>`<code>${esc(t)}</code>`).join('')}</div>
      <div class="lvl-bar"><i style="width:${pct}%"></i></div>
      <div class="lvl-count">${solved}/${total} תרגילים</div>
      ${unlocked ? `<div class="lvl-btns">
          <button class="btn small lvl-go" data-id="${lv.id}">📘 למידה</button>
          <button class="btn ghost small lvl-exam" data-id="${lv.id}">📝 בחינה</button>
        </div>`
        : `<div class="lvl-locked-txt">🔒 השלם את הרמה הקודמת</div>`}
    </div>`;
  }).join('');
  $$('#levelsGrid .lvl-go').forEach(b => b.onclick = e => { e.stopPropagation(); openLevel(+b.dataset.id); });
  $$('#levelsGrid .lvl-exam').forEach(b => b.onclick = e => { e.stopPropagation(); openLevelExam(+b.dataset.id); });
  $$('#levelsGrid .lvl-card:not(.locked)').forEach(c => c.onclick = () => openLevel(+c.dataset.id));
}

let currentLevelId = null;
function openLevel(id){
  const lv = C.sqlLevels.find(l=>l.id===id);
  if(!lv || !levelUnlocked(id)) return;
  currentLevelId = id;
  $('#levelsGrid').classList.add('hidden');
  const detail = $('#levelDetail');
  detail.classList.remove('hidden');
  const examBtn = `<button class="btn lvl-mode-exam" style="background:linear-gradient(135deg,var(--accent2),#5a3fd6)">📝 מעבר לבחינת הרמה</button>`;
  detail.innerHTML = `
    <button class="btn ghost small" id="lvlBack">→ חזרה למסלול</button>
    <div class="lvl-head">
      <h2 class="view-title" style="margin:12px 0 4px">📘 למידה · רמה ${lv.id}: ${esc(lv.title)}</h2>
      <p class="subtitle">${esc(lv.subtitle)}</p>
    </div>
    <div class="card lvl-lesson"><h3>📖 השיעור</h3>${lv.lesson}</div>
    <div class="lvl-ex-head">
      <h3 class="sec-h" style="margin:18px 0 6px">✍️ תרגול (${lv.exercises.length}) — עם רמזים ופתרונות</h3>
      ${examBtn}
    </div>
    <div id="lvlExercises"></div>
    <div id="lvlComplete"></div>`;
  $('#lvlBack').onclick = () => { renderLevels(); window.scrollTo({top:0,behavior:'smooth'}); };
  $('.lvl-mode-exam').onclick = () => openLevelExam(id);
  renderLevelExercises(lv);
  window.scrollTo({top:0, behavior:'smooth'});
}

/* ---------- בחינת רמה ---------- */
function openLevelExam(id){
  const lv = C.sqlLevels.find(l=>l.id===id);
  if(!lv || !levelUnlocked(id)) return;
  currentLevelId = id;
  $('#levelsGrid').classList.add('hidden');
  const detail = $('#levelDetail');
  detail.classList.remove('hidden');
  detail.innerHTML = `
    <button class="btn ghost small" id="lvlBack">→ חזרה למסלול</button>
    <div class="lvl-head">
      <h2 class="view-title" style="margin:12px 0 4px">📝 בחינה · רמה ${lv.id}: ${esc(lv.title)}</h2>
      <p class="subtitle">ענה על כל השאלות ולחץ "סיים בחינה". <b>אין רמזים ואין פתרונות</b> — זו בדיקה אמיתית. אפשר להריץ (▶) כדי לראות את הפלט שלך.</p>
    </div>
    <div id="lvlExamBody"></div>
    <div style="text-align:center;margin-top:8px"><button class="btn" id="lvlExamSubmit">✓ סיים בחינה והצג ציון</button>
      &nbsp;<button class="btn ghost" id="lvlToLearn">📘 חזרה ללמידה</button></div>
    <div id="lvlExamResult" style="margin-top:16px"></div>`;
  $('#lvlBack').onclick = () => { renderLevels(); window.scrollTo({top:0,behavior:'smooth'}); };
  $('#lvlToLearn').onclick = () => openLevel(id);
  $('#lvlExamBody').innerHTML = lv.exercises.map((ex,i)=>`
    <div class="lvl-ex" data-i="${i}">
      <div class="lvl-ex-title"><span class="lvl-ex-num">${i+1}</span> ${esc(ex.prompt)}</div>
      ${tablePreview(tablesInQuery(ex.solution))}
      <textarea class="lvl-exam-input" data-i="${i}" spellcheck="false" placeholder="-- כתוב כאן את השאילתה..."></textarea>
      <div class="lvl-ex-actions"><button class="btn small lvl-exam-run" data-i="${i}">▶ הרץ</button></div>
      <div class="lvl-lint" data-i="${i}"></div>
      <div class="feedback lvl-fb" data-i="${i}"></div>
      <div class="lvl-result" data-i="${i}"></div>
    </div>`).join('');
  const pick=(cls,i)=>$(`#lvlExamBody .${cls}[data-i="${i}"]`);
  $$('#lvlExamBody .lvl-exam-run').forEach(b => b.onclick = () => {
    const i=+b.dataset.i, sql=pick('lvl-exam-input',i).value;
    pick('lvl-lint',i).innerHTML = lintHtml(sql);
    if(!SQLEngine){ setFb(pick('lvl-fb',i), {msg:'מנוע SQL עוד נטען...', kind:'info'}); return; }
    try{ pick('lvl-result',i).innerHTML = '<h4>הפלט שלך:</h4>' + resultTable(runSql(freshDB(), sql)); pick('lvl-fb',i).className='feedback lvl-fb'; }
    catch(e){ setFb(pick('lvl-fb',i), {msg:friendlyError(e.message), kind:'err'}); pick('lvl-result',i).innerHTML=''; }
  });
  $$('#lvlExamBody .lvl-exam-input').forEach(t => t.addEventListener('keydown', e => {
    if(e.ctrlKey && e.key==='Enter'){ e.preventDefault(); pick('lvl-exam-run',+t.dataset.i).click(); }
  }));
  $('#lvlExamSubmit').onclick = () => submitLevelExam(lv);
  window.scrollTo({top:0, behavior:'smooth'});
}
function submitLevelExam(lv){
  const pick=(cls,i)=>$(`#lvlExamBody .${cls}[data-i="${i}"]`);
  let correct=0;
  lv.exercises.forEach((ex,i)=>{
    const sql=pick('lvl-exam-input',i).value;
    const res=gradeSql(ex, sql);
    const card=$(`#lvlExamBody .lvl-ex[data-i="${i}"]`);
    const fb=pick('lvl-fb',i);
    if(res.ok){
      correct++; card.classList.add('solved');
      fb.className='feedback lvl-fb show ok'; fb.textContent='✓ נכון';
      // תשובה נכונה בבחינה נחשבת גם כתרגיל שנפתר (מקדם את פתיחת הרמה הבאה)
      PROG.levels[lv.id] = PROG.levels[lv.id] || [];
      if(!PROG.levels[lv.id].includes(i)) PROG.levels[lv.id].push(i);
    } else {
      card.style.borderColor='var(--bad)';
      fb.className='feedback lvl-fb show err';
      fb.innerHTML=`<b>✗ ${res.msg}</b><br>הפתרון הנכון: <pre style="direction:ltr;text-align:left;margin:6px 0 0;background:var(--code-bg);color:#cfe3ff;padding:8px;border-radius:6px">${esc(ex.solution)}</pre>`;
    }
  });
  const total=lv.exercises.length, pct=Math.round(correct/total*100), pass=pct===100;
  PROG.levelExam[lv.id]=Math.max(PROG.levelExam[lv.id]||0, pct); saveProg();
  const next=C.sqlLevels.find(l=>l.id===lv.id+1);
  $('#lvlExamResult').innerHTML=`
    <div class="result-banner ${pass?'pass':'fail'}">${pass?'🏆 עברת את הבחינה בהצטיינות!':(pct>=60?'👍 כמעט שם':'💪 עוד תרגול')} &nbsp; ציון: ${pct} (${correct}/${total})</div>
    <div style="text-align:center">
      <button class="btn ghost" id="lvlExamRetry">↺ בחינה חוזרת</button>
      <button class="btn ghost" id="lvlExamLearn">📘 חזרה ללמידה</button>
      ${next && pass ? `<button class="btn" id="lvlExamNext">המשך לרמה ${next.id} ←</button>` : ''}
      <button class="btn ghost" id="lvlExamMap">🗺 חזרה למסלול</button>
    </div>`;
  $('#lvlExamRetry').onclick=()=>openLevelExam(lv.id);
  $('#lvlExamLearn').onclick=()=>openLevel(lv.id);
  $('#lvlExamMap').onclick=()=>{ renderLevels(); window.scrollTo({top:0,behavior:'smooth'}); };
  if(next && pass) $('#lvlExamNext').onclick=()=>openLevel(next.id);
  $('#lvlExamResult').scrollIntoView({behavior:'smooth'});
}

function renderLevelExercises(lv){
  const solved = PROG.levels[lv.id] || [];
  $('#lvlExercises').innerHTML = lv.exercises.map((ex,i)=>`
    <div class="lvl-ex ${solved.includes(i)?'solved':''}" data-i="${i}">
      <div class="lvl-ex-title">
        <span class="lvl-ex-num">${solved.includes(i)?'✓':i+1}</span>
        ${esc(ex.prompt)}
      </div>
      ${tablePreview(tablesInQuery(ex.solution))}
      <textarea class="lvl-input" data-i="${i}" spellcheck="false" placeholder="-- כתוב כאן..."></textarea>
      <div class="lvl-ex-actions">
        <button class="btn small lvl-run" data-i="${i}">▶ הרץ</button>
        <button class="btn small lvl-check" data-i="${i}" style="background:linear-gradient(135deg,var(--good),#1ba273)">✓ בדוק</button>
        <button class="btn ghost small lvl-hint" data-i="${i}">💡 רמז</button>
        <button class="btn ghost small lvl-sol" data-i="${i}">👁 פתרון</button>
      </div>
      <div class="lvl-hint-txt" data-i="${i}"></div>
      <div class="lvl-lint" data-i="${i}"></div>
      <div class="feedback lvl-fb" data-i="${i}"></div>
      <pre class="sol-box lvl-solbox" data-i="${i}"></pre>
      <div class="lvl-result" data-i="${i}"></div>
    </div>`).join('');
  const pick = (cls,i) => $(`#lvlExercises .${cls}[data-i="${i}"]`);
  $$('#lvlExercises .lvl-run').forEach(b => b.onclick = () => {
    const i=+b.dataset.i, sql=pick('lvl-input',i).value;
    pick('lvl-lint',i).innerHTML = lintHtml(sql);
    if(!SQLEngine){ setFb(pick('lvl-fb',i), {msg:'מנוע SQL עוד נטען...', kind:'info'}); return; }
    try{ pick('lvl-result',i).innerHTML = '<h4>תוצאה:</h4>' + resultTable(runSql(freshDB(), sql)); pick('lvl-fb',i).className='feedback lvl-fb'; }
    catch(e){ setFb(pick('lvl-fb',i), {msg:friendlyError(e.message), kind:'err'}); pick('lvl-result',i).innerHTML=''; }
  });
  $$('#lvlExercises .lvl-check').forEach(b => b.onclick = () => {
    const i=+b.dataset.i, ex=lv.exercises[i], sql=pick('lvl-input',i).value;
    pick('lvl-lint',i).innerHTML = lintHtml(sql);
    const res = gradeSql(ex, sql);
    const syntaxIssues = res.ok && lintSql(sql).length;
    setFb(pick('lvl-fb',i), syntaxIssues
      ? {kind:'info', msg:'✓ התוצאה נכונה — אבל תקן את הערות התחביר למטה (המרצה מורידה על כך!).'}
      : res);
    let html='';
    if(res.userResult) html += `<h4>${res.mutated?'מצב הטבלה אחרי הפעולה:':'התוצאה שלך:'}</h4>` + resultTable(res.userResult);
    if(!res.ok && SQLEngine && !sqlFailed){ try{ html += `<h4 class="expect-h">🎯 התוצאה הרצויה:</h4>` + resultTable(expectedResult(ex)); }catch(e){} }
    pick('lvl-result',i).innerHTML = html;
    if(res.ok) markLevelSolved(lv, i);
  });
  $$('#lvlExercises .lvl-hint').forEach(b => b.onclick = () => pick('lvl-hint-txt',+b.dataset.i).textContent = '💡 ' + lv.exercises[+b.dataset.i].hint);
  $$('#lvlExercises .lvl-sol').forEach(b => b.onclick = () => {
    const box = pick('lvl-solbox',+b.dataset.i); box.textContent = lv.exercises[+b.dataset.i].solution; box.classList.toggle('show');
  });
  $$('#lvlExercises .lvl-input').forEach(t => t.addEventListener('keydown', e => {
    if(e.ctrlKey && e.key==='Enter'){ e.preventDefault(); pick('lvl-check',+t.dataset.i).click(); }
  }));
  updateLevelComplete(lv);
}
function setFb(el, res){ el.className = 'feedback lvl-fb show ' + (res.kind||'info'); el.innerHTML = res.msg; }
function markLevelSolved(lv, i){
  PROG.levels[lv.id] = PROG.levels[lv.id] || [];
  if(!PROG.levels[lv.id].includes(i)){ PROG.levels[lv.id].push(i); saveProg(); }
  const card = $(`#lvlExercises .lvl-ex[data-i="${i}"]`);
  if(card){ card.classList.add('solved'); card.querySelector('.lvl-ex-num').textContent='✓'; }
  updateLevelComplete(lv);
}
function updateLevelComplete(lv){
  const box = $('#lvlComplete'); if(!box) return;
  if(levelComplete(lv.id)){
    const next = C.sqlLevels.find(l=>l.id===lv.id+1);
    box.innerHTML = `<div class="result-banner pass">🎉 סיימת את רמה ${lv.id}! ${next?`רמה ${next.id} (${esc(next.title)}) נפתחה.`:'סיימת את כל המסלול! 🏆'}</div>
      <div style="text-align:center">${next?`<button class="btn" id="lvlNext">המשך לרמה ${next.id} ←</button> `:''}<button class="btn ghost" id="lvlToMap">חזרה למסלול</button></div>`;
    if(next) $('#lvlNext').onclick = () => openLevel(next.id);
    $('#lvlToMap').onclick = () => { renderLevels(); window.scrollTo({top:0,behavior:'smooth'}); };
  } else box.innerHTML = '';
}

/* ---------------- דף הבית / לוח מחוונים ---------------- */
function renderHome(){
  const r = readiness();
  $('#readyPct').textContent = r.pct + '%';
  $('#readyBar').style.width = r.pct + '%';
  $('#statTopics').textContent = `${r.topics}/${C.topics.length}`;
  $('#statQuiz').textContent = `${r.quizCorrect}/${C.quiz.length}`;
  $('#statSql').textContent = `${r.sqlSolved}/${C.sqlQuestions.length}`;
  if($('#statLevels')) $('#statLevels').textContent = `${r.levels}/${C.sqlLevels.length}`;
  $('#statExam').textContent = r.examBest;

  $('#pathList').innerHTML = C.learningPath.map(p => {
    let done = p.topic ? !!PROG.topicsRead[p.topic] : false;
    return `<div class="path-item ${done?'done':''}" data-topic="${p.topic||''}" data-view="${p.view||'topics'}">
      <div class="path-n">${done?'✓':p.n}</div>
      <div><b>${esc(p.title)}</b><div class="path-goal">${esc(p.goal)}</div></div>
    </div>`;
  }).join('');
  $$('#pathList .path-item').forEach(el => el.onclick = () => {
    const tp = el.dataset.topic;
    if(tp){ showView('topics'); selectTopic(tp); }
    else showView(el.dataset.view);
  });

  $('#tipsList').innerHTML = C.examTips.map(t => `<li>${t}</li>`).join('');
  renderWeak();
}

/* ניתוח חוזקות/חולשות לפי נושא */
function topicStats(){
  const map = {};
  Object.entries(PROG.quiz).forEach(([gi,v])=>{
    const q = C.quiz[+gi]; if(!q) return;
    map[q.topic] = map[q.topic] || {a:0,c:0};
    map[q.topic].a++; map[q.topic].c += v;
  });
  return map;
}
function renderWeak(){
  const stats = topicStats();
  let weakest = null;
  const rows = C.topics.map(t => {
    const s = stats[t.id];
    const pct = s ? Math.round(s.c/s.a*100) : null;
    if(pct !== null && (weakest===null || pct < weakest.pct)) weakest = {t, pct};
    return {t, pct, a: s ? s.a : 0};
  });
  $('#weakTopics').innerHTML = rows.map(r => {
    const cls = r.pct===null ? '' : r.pct>=80 ? 'good' : r.pct>=50 ? 'mid' : 'low';
    return `<div class="weak-row" data-topic="${r.t.id}" title="לחץ לתרגול הנושא">
      <span class="weak-name">${r.t.icon} ${esc(r.t.title)}</span>
      <div class="weak-bar"><i class="${cls}" style="width:${r.pct===null?0:r.pct}%"></i></div>
      <span class="weak-pct">${r.pct===null ? '—' : r.pct+'%'}</span>
    </div>`;
  }).join('') +
  (weakest && weakest.pct < 80
    ? `<div class="weak-tip">📌 מומלץ לחזור על: <b>${weakest.t.icon} ${esc(weakest.t.title)}</b> — לחץ על השורה לתרגול ממוקד.</div>`
    : (weakest ? `<div class="weak-tip good-tip">💪 כל הנושאים שנענו מעל 80% — המשך כך!</div>` : `<div class="weak-tip">ענה על שאלות בבוחן כדי לראות ניתוח חוזקות/חולשות.</div>`));
  $$('#weakTopics .weak-row').forEach(el => el.onclick = () => {
    quizFilter = el.dataset.topic;
    showView('quiz');
    $$('#quizFilters button').forEach(x => x.classList.toggle('active', x.dataset.f===quizFilter));
    renderQuiz();
  });
}

/* ---------------- סיכומי נושאים ---------------- */
function renderTopicNav(){
  $('#topicNav').innerHTML = C.topics.map(t =>
    `<button data-topic="${t.id}">${t.icon} ${t.title}</button>`).join('');
  $$('#topicNav button').forEach(b => b.onclick = () => selectTopic(b.dataset.topic));
}
function selectTopic(id, markRead=true){
  const t = C.topics.find(x => x.id === id) || C.topics[0];
  if(markRead){ PROG.topicsRead[t.id] = true; saveProg(); }
  $$('#topicNav button').forEach(b => b.classList.toggle('active', b.dataset.topic === t.id));
  $('#topicBody').innerHTML = `<h2 class="view-title">${t.icon} ${t.title}</h2>` +
    t.sections.map(s => `<section><h3>${s.heading}</h3>${s.html}</section>`).join('');
  window.scrollTo({top:0, behavior:'smooth'});
}

/* ---------------- דוגמאות פתורות ---------------- */
function renderExamples(){
  $('#examplesBody').innerHTML = C.workedExamples.map(ex => `
    <div class="card wex">
      <h3>${ex.icon} ${esc(ex.title)}</h3>
      <ol class="wex-steps">
        ${ex.steps.map(s => `<li><div class="wex-h">${esc(s.h)}</div><div class="wex-c">${s.html}</div></li>`).join('')}
      </ol>
    </div>`).join('');
}

/* ---------------- כרטיסיות חכמות ---------------- */
let fcIndex = 0, fcOrder = [], fcMode = 'all';
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]];} return a; }
function buildFcOrder(){
  const all = C.flashcards.map((_,i)=>i);
  fcOrder = fcMode==='unknown' ? all.filter(i=>!PROG.fcKnown[i]) : all;
  if(!fcOrder.length){ fcOrder = all; fcMode='all'; $('#fcMode').classList.remove('active'); }
  fcIndex = 0;
}
function renderFlashcards(){ buildFcOrder(); drawCard(); }
function drawCard(){
  const idx = fcOrder[fcIndex];
  const card = C.flashcards[idx];
  $('#fcInner').classList.remove('flipped');
  $('#fcFrontTxt').textContent = card.front;
  $('#fcBackTxt').textContent = card.back;
  const known = Object.keys(PROG.fcKnown).length;
  $('#fcCounter').innerHTML = `${fcIndex+1} / ${fcOrder.length} <small class="fc-known">· ידועים ${known}/${C.flashcards.length}</small>`;
  $('#fcKnownBadge').style.display = PROG.fcKnown[idx] ? 'inline-block' : 'none';
}
function fcNextCard(){ fcIndex = (fcIndex+1) % fcOrder.length; drawCard(); }
function setupFlashcards(){
  $('#fcInner').onclick = () => $('#fcInner').classList.toggle('flipped');
  $('#fcNext').onclick = fcNextCard;
  $('#fcPrev').onclick = () => { fcIndex = (fcIndex-1+fcOrder.length) % fcOrder.length; drawCard(); };
  $('#fcShuffle').onclick = () => { fcOrder = shuffle(fcOrder); fcIndex = 0; drawCard(); };
  $('#fcKnow').onclick = () => {
    const idx = fcOrder[fcIndex];
    PROG.fcKnown[idx] = true; saveProg();
    if(fcMode==='unknown'){ fcOrder.splice(fcIndex,1); if(!fcOrder.length){ buildFcOrder(); } if(fcIndex>=fcOrder.length) fcIndex=0; drawCard(); }
    else fcNextCard();
  };
  $('#fcDontKnow').onclick = () => {
    const idx = fcOrder[fcIndex];
    delete PROG.fcKnown[idx]; saveProg();
    // הכרטיס יחזור שוב — מזיזים אותו כמה מקומות קדימה
    fcOrder.splice(fcIndex,1);
    fcOrder.splice(Math.min(fcIndex+3, fcOrder.length), 0, idx);
    drawCard();
  };
  $('#fcMode').onclick = () => {
    fcMode = fcMode==='all' ? 'unknown' : 'all';
    $('#fcMode').classList.toggle('active', fcMode==='unknown');
    buildFcOrder(); drawCard();
  };
}

/* ---------------- בוחן (סינון נושא + טעויות) ---------------- */
let quizFilter = 'all', answeredNow = {}, quizPerm = {};
function topicName(id){ const t=C.topics.find(x=>x.id===id); return t?t.title:id; }
function renderQuizFilters(){
  const topicsUsed = [...new Set(C.quiz.map(q=>q.topic))];
  const btns = [`<button data-f="all" class="active">הכל (${C.quiz.length})</button>`,
    `<button data-f="official">⭐ מבחן 1</button>`,
    `<button data-f="practice">⭐ מבחן 2</button>`,
    `<button data-f="exam3">⭐ מבחן 3</button>`,
    `<button data-f="exam4">⭐ מבחן 4</button>`,
    `<button data-f="exam5">⭐ מבחן 5</button>`,
    `<button data-f="exam6">⭐ מבחן 6</button>`,
    `<button data-f="exam7">⭐ מבחן 7</button>`,
    `<button data-f="exam8">⭐ מבחן 8</button>`,
    `<button data-f="mistakes">❌ הטעויות שלי</button>`]
    .concat(topicsUsed.map(tp => `<button data-f="${tp}">${topicName(tp)}</button>`));
  $('#quizFilters').innerHTML = btns.join('');
  $$('#quizFilters button').forEach(b => b.onclick = () => { quizFilter = b.dataset.f;
    $$('#quizFilters button').forEach(x=>x.classList.toggle('active', x===b)); renderQuiz(); });
}
function currentQuizSet(){
  return C.quiz.map((q,gi)=>({q,gi})).filter(o =>
    quizFilter==='all' ? true :
    quizFilter==='official' ? o.q.official :
    quizFilter==='practice' ? o.q.practice :
    quizFilter==='exam3' ? o.q.exam3 :
    quizFilter==='exam4' ? o.q.exam4 :
    quizFilter==='exam5' ? o.q.exam5 :
    quizFilter==='exam6' ? o.q.exam6 :
    quizFilter==='exam7' ? o.q.exam7 :
    quizFilter==='exam8' ? o.q.exam8 :
    quizFilter==='mistakes' ? PROG.quiz[o.gi]===0 :
    o.q.topic===quizFilter);
}
function renderQuiz(){
  const set = currentQuizSet();
  if(!set.length){
    $('#quizBody').innerHTML = `<div class="card" style="text-align:center;color:var(--muted)">
      ${quizFilter==='mistakes' ? '🎉 אין טעויות שמורות — כל השאלות שענית עליהן נכונות!' : 'אין שאלות בסינון זה.'}</div>`;
    $('#quizResult').innerHTML=''; $('#quizScore').textContent=''; return;
  }
  $('#quizBody').innerHTML = set.map((o,i) => {
    const q=o.q, gi=o.gi;
    const perm = shuffle([...q.options.keys()]); quizPerm[gi] = perm;  // סדר תשובות אקראי
    return `<div class="quiz-q" data-gi="${gi}">
      <div class="qnum">שאלה ${i+1} ${q.official?'· ⭐ מבחן 1':q.practice?'· ⭐ מבחן 2':q.exam3?'· ⭐ מבחן 3':q.exam4?'· ⭐ מבחן 4':q.exam5?'· ⭐ מבחן 5':q.exam6?'· ⭐ מבחן 6':q.exam7?'· ⭐ מבחן 7':q.exam8?'· ⭐ מבחן 8':''} <span class="qtopic">${topicName(q.topic)}</span></div>
      <div class="qtext">${esc(q.q)}</div>
      ${perm.map((orig,disp)=>`<button class="opt" data-gi="${gi}" data-j="${orig}"><span class="mark">${AL[disp]}</span> ${esc(q.options[orig])}</button>`).join('')}
      <div class="explain" id="exp-${gi}"></div>
    </div>`;
  }).join('');
  $$('#quizBody .opt').forEach(b => b.onclick = () => pickQuiz(+b.dataset.gi, +b.dataset.j));
  // שחזור מצב שאלות שכבר נענו בסשן הזה
  set.forEach(o => { if(answeredNow[o.gi] !== undefined) paintAnswer(o.gi, answeredNow[o.gi]); });
  $('#quizResult').innerHTML = '';
  updateQuizScore();
}
function paintAnswer(gi, chosenOrig){
  const q = C.quiz[gi];
  $$(`.opt[data-gi="${gi}"]`).forEach(o => {
    const orig = +o.dataset.j;
    if(orig === q.correct) o.classList.add('correct');
    else if(orig === chosenOrig) o.classList.add('wrong');
    o.style.cursor = 'default';
  });
  const ok = chosenOrig === q.correct;
  const correctDisp = (quizPerm[gi] || [...q.options.keys()]).indexOf(q.correct);
  const exp = $('#exp-'+gi);
  if(exp){ exp.innerHTML = `<b>${ok ? '✓ נכון!' : '✗ לא נכון.'}</b> התשובה הנכונה: ${AL[correctDisp]}. ${esc(q.explain)}`;
    exp.classList.add('show'); }
}
function pickQuiz(gi,j){
  if(answeredNow[gi] !== undefined) return;
  answeredNow[gi] = j;
  const ok = j === C.quiz[gi].correct;
  PROG.quiz[gi] = ok ? 1 : 0; saveProg();
  paintAnswer(gi, j);
  updateQuizScore();
}
function updateQuizScore(){
  const set = currentQuizSet();
  const answered = set.filter(o => answeredNow[o.gi] !== undefined).length;
  const correct = set.filter(o => answeredNow[o.gi] === C.quiz[o.gi].correct).length;
  $('#quizScore').textContent = `נענו ${answered}/${set.length} · נכונות ${correct}`;
  if(answered === set.length && set.length){
    const pct = Math.round(correct/set.length*100);
    $('#quizResult').innerHTML =
      `<div class="result-banner ${pct>=60?'pass':'fail'}">${pct>=60?'🎉':'💪'} סיימת! ציון: ${pct} (${correct}/${set.length})</div>`;
  }
}

/* ============================================================
   מנוע SQL + מורה חכם
   ============================================================ */
let SQLEngine = null, sqlLoading = false, sqlFailed = false, currentSqlQ = null, sqlFilter='all';

/* --- מרחק לוינשטיין להצעות "אולי התכוונת ל-" --- */
function lev(a,b){
  const m=a.length,n=b.length; if(!m)return n; if(!n)return m;
  let prev = Array.from({length:n+1},(_,j)=>j);
  for(let i=1;i<=m;i++){
    const cur=[i];
    for(let j=1;j<=n;j++)
      cur[j]=Math.min(prev[j]+1, cur[j-1]+1, prev[j-1]+(a[i-1]===b[j-1]?0:1));
    prev=cur;
  }
  return prev[n];
}
function closest(word, list){
  let best=null, bd=Infinity;
  list.forEach(w=>{ const d=lev(word.toLowerCase(), w.toLowerCase()); if(d<bd){bd=d;best=w;} });
  return bd>0 && bd<=2 ? best : null;
}
const SQL_FUNCS = ['SUM','COUNT','AVG','MIN','MAX','UPPER','LOWER','LENGTH','ROUND','STRFTIME'];
const SQL_KEYWORDS = ['SELECT','FROM','WHERE','GROUP BY','HAVING','ORDER BY','JOIN','INNER JOIN','LEFT JOIN','ON','AND','OR','NOT','DISTINCT','BETWEEN','LIKE','IN','AS','IS NULL','UPDATE','SET','DELETE','INSERT INTO','VALUES','ASC','DESC'];

/* --- תרגום שגיאות SQL לעברית + הצעות תיקון --- */
function friendlyError(rawMsg){
  let m;
  if(m = rawMsg.match(/no such function:\s*(\w+)/i)){
    const s = closest(m[1], SQL_FUNCS);
    return `הפונקציה "${esc(m[1])}" לא קיימת` + (s ? ` — אולי התכוונת ל-<b>${s}</b>?` : ` — הפונקציות המוכרות: SUM, COUNT, AVG, MIN, MAX.`);
  }
  if(m = rawMsg.match(/no such table:\s*(\w+)/i)){
    const s = closest(m[1], C.sqlTables.map(t=>t.name));
    return `הטבלה "${esc(m[1])}" לא קיימת` + (s ? ` — אולי התכוונת ל-<b>${s}</b>?` : '') + ` (רשימת הטבלאות בצד).`;
  }
  if(m = rawMsg.match(/no such column:\s*([\w.]+)/i)){
    const cols = [...new Set(C.sqlTables.flatMap(t=>t.cols.split(',').map(c=>c.trim())))];
    const s = closest(m[1].split('.').pop(), cols);
    return `העמודה "${esc(m[1])}" לא קיימת` + (s ? ` — אולי התכוונת ל-<b>${s}</b>?` : '') + ` בדוק את שמות העמודות ברשימת הטבלאות.`;
  }
  if(/incomplete input/i.test(rawMsg))
    return `השאילתה לא הושלמה — בדוק אם חסר סוגר, גרש, או חלק בסוף השאילתה.`;
  if(m = rawMsg.match(/near "([^"]*)":\s*syntax error/i)){
    const s = closest(m[1], SQL_KEYWORDS);
    return `שגיאת תחביר ליד "<b dir="ltr">${esc(m[1])}</b>"` +
      (s && s.toLowerCase()!==m[1].toLowerCase() ? ` — אולי התכוונת ל-<b>${s}</b>?` :
       ` — בדוק את סדר החלקים: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.`);
  }
  if(/ambiguous column name/i.test(rawMsg))
    return `שם עמודה דו-משמעי — כשעמודה קיימת בשתי טבלאות ב-JOIN, ציין את הטבלה: <b dir="ltr">c.ClinicID</b>.`;
  if(/no tables specified/i.test(rawMsg))
    return `חסרה מילת המפתח <b>FROM</b> — צריך לציין מאיזו טבלה שולפים, למשל <b dir="ltr">FROM Products</b>.`;
  if(m = rawMsg.match(/(\d+)\s+values?\s+for\s+(\d+)\s+columns?/i))
    return `ב-INSERT סיפקת ${m[1]} ערכים אבל בטבלה יש ${m[2]} עמודות — מספר הערכים ב-VALUES חייב להתאים.`;
  if(m = rawMsg.match(/UNIQUE constraint failed:\s*([\w.]+)/i))
    return `ערך כפול בשדה <b dir="ltr">${esc(m[1])}</b> — מפתח ראשי חייב להיות ייחודי, והערך הזה כבר קיים בטבלה.`;
  if(/NOT NULL constraint failed/i.test(rawMsg))
    return `ניסית להכניס NULL (או להשמיט ערך) בעמודה שחייבת ערך — למשל מפתח ראשי.`;
  if(/misuse of aggregate/i.test(rawMsg))
    return `פונקציית אגרגציה (SUM/COUNT/AVG) במקום לא חוקי — תנאי על אגרגציה שייך ל-<b>HAVING</b> אחרי GROUP BY, לא ל-WHERE.`;
  if(/datatype mismatch/i.test(rawMsg))
    return `סוג הערך לא מתאים לעמודה — בדוק אם ערבבת טקסט ומספר (טקסט בגרשיים, מספר בלי).`;
  return esc(rawMsg);
}

/* --- בודק טעויות קלאסיות (גם כשהשאילתה רצה) --- */
const ALL_KEYWORDS = ['SELECT','FROM','WHERE','GROUP','BY','HAVING','ORDER','JOIN','INNER','LEFT','RIGHT','OUTER','ON','AND','OR','NOT','DISTINCT','BETWEEN','LIKE','IN','AS','IS','NULL','UPDATE','SET','DELETE','INSERT','INTO','VALUES','ASC','DESC','COUNT','SUM','AVG','MIN','MAX'];
function knownSqlWords(){
  const words = new Set(ALL_KEYWORDS.map(k=>k.toLowerCase()));
  C.sqlTables.forEach(t => {
    words.add(t.name.toLowerCase());
    t.cols.split(',').forEach(c => words.add(c.trim().toLowerCase()));
  });
  return words;
}
function lintSql(sql){
  const w = [];
  const trimmed = sql.trim();

  /* --- תחביר בסיסי --- */
  if(/^SELECT\b/i.test(trimmed) && !/\bFROM\b/i.test(trimmed) && trimmed.length > 8)
    w.push(`חסרה מילת המפתח <b>FROM</b> — לא ציינת מאיזו טבלה לשלוף. למשל: <b dir="ltr">FROM Products</b>.`);
  if(((sql.match(/'/g)||[]).length % 2) === 1)
    w.push(`גרש בודד <b dir="ltr">'</b> שנפתח ולא נסגר — כל טקסט חייב גרש פותח וגרש סוגר: <b dir="ltr">'Red'</b>.`);
  const opens = (sql.match(/\(/g)||[]).length, closes = (sql.match(/\)/g)||[]).length;
  if(opens !== closes)
    w.push(`מספר הסוגריים לא מאוזן — יש ${opens} סוגריים פותחים ו-${closes} סוגרים.`);
  if(/"[^"]*"/.test(sql))
    w.push(`לטקסט משתמשים בגרש בודד <b dir="ltr">'Red'</b> — גרשיים כפולים ב-SQL מיועדים לשמות עמודות, לא לערכים.`);
  if(/[’‘“”„]/.test(sql))
    w.push(`זוהו גרשיים "חכמים" (’ ”) — כנראה מהעתקה מ-Word. השתמש בגרש רגיל <b dir="ltr">'</b>.`);
  if(/(^|[^<>!=])==/.test(sql))
    w.push(`ב-SQL משתמשים בסימן שוויון <b>בודד</b> <b dir="ltr">=</b> להשוואה, לא <b dir="ltr">==</b>.`);
  if(/,\s*FROM\b/i.test(sql))
    w.push(`פסיק מיותר לפני <b>FROM</b> — הסר את הפסיק שאחרי העמודה האחרונה ברשימת ה-SELECT.`);
  if(/,\s*\)/.test(sql))
    w.push(`פסיק מיותר לפני הסוגר <b dir="ltr">)</b>.`);
  if(/\bGROUP\b(?!\s+BY)/i.test(sql))
    w.push(`אחרי <b>GROUP</b> חייב לבוא <b>BY</b> — כותבים <b dir="ltr">GROUP BY</b>.`);
  if(/\bORDER\b(?!\s+BY)/i.test(sql))
    w.push(`אחרי <b>ORDER</b> חייב לבוא <b>BY</b> — כותבים <b dir="ltr">ORDER BY</b>.`);
  if(/\bINSERT\b(?!\s+INTO)/i.test(sql))
    w.push(`אחרי <b>INSERT</b> חייב לבוא <b>INTO</b> — כותבים <b dir="ltr">INSERT INTO</b>.`);
  if(/\bDELETE\b(?!\s+FROM)/i.test(sql))
    w.push(`אחרי <b>DELETE</b> חייב לבוא <b>FROM</b> — כותבים <b dir="ltr">DELETE FROM</b>.`);

  /* --- זיהוי שגיאות הקלדה במילים --- */
  const known = knownSqlWords();
  const cleaned = sql.replace(/'[^']*'/g,' ').replace(/\bAS\s+[A-Za-z_]\w*/gi,' ');
  const tokens = [...new Set(cleaned.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [])];
  tokens.forEach(t => {
    if(t.length < 4 || known.has(t.toLowerCase())) return;
    const s = closest(t, ALL_KEYWORDS);
    if(s) w.push(`המילה "<b dir="ltr">${esc(t)}</b>" לא מוכרת — אולי התכוונת ל-<b>${s}</b>?`);
  });

  /* --- לוגיקת שאילתות --- */
  const selMatch = trimmed.match(/^SELECT\b([\s\S]*?)\bFROM\b/i);
  if(selMatch && !/\bGROUP\s+BY\b/i.test(sql)){
    const sel = selMatch[1];
    const hasAgg = /\b(SUM|COUNT|AVG|MIN|MAX)\s*\(/i.test(sel);
    const residue = sel.replace(/\b(SUM|COUNT|AVG|MIN|MAX)\s*\([^)]*\)/gi,'').replace(/\bAS\s+[A-Za-z_]\w*/gi,'').replace(/\bDISTINCT\b/gi,'').replace(/[,\s*]/g,'');
    if(hasAgg && /[A-Za-z_]/.test(residue))
      w.push(`עמודה רגילה לצד פונקציית אגרגציה דורשת <b>GROUP BY</b> — הוסף <b dir="ltr">GROUP BY</b> על העמודה הרגילה.`);
  }
  const beforeGroup = sql.split(/GROUP\s+BY/i)[0];
  const whereMatch = beforeGroup.match(/\bWHERE\b([\s\S]*)$/i);
  if(whereMatch && /\b(SUM|COUNT|AVG|MIN|MAX)\s*\(/i.test(whereMatch[1]))
    w.push(`תנאי על פונקציית אגרגציה (SUM/COUNT/AVG) שייך ל-<b>HAVING</b> אחרי GROUP BY — לא ל-WHERE!`);
  if(/\bHAVING\b/i.test(sql) && !/\bGROUP\s+BY\b/i.test(sql))
    w.push(`יש HAVING בלי GROUP BY — בדרך כלל HAVING מגיע אחרי קיבוץ.`);
  if(/=\s*NULL/i.test(sql))
    w.push(`השוואה <b dir="ltr">= NULL</b> לא עובדת! בודקים NULL עם <b dir="ltr">IS NULL</b> / <b dir="ltr">IS NOT NULL</b>.`);
  if(/\b(UPDATE|DELETE)\b/i.test(sql) && !/\bWHERE\b/i.test(sql))
    w.push(`UPDATE/DELETE בלי WHERE ישפיעו על <b>כל</b> הרשומות בטבלה!`);

  /* נקודה-פסיק — המרצה מקפידה על תחביר, לכן זו אזהרה בולטת (לא טיפ) */
  const semi = [];
  if(trimmed && !/;\s*$/.test(trimmed) && !/^\s*--/.test(trimmed))
    semi.push(`חסרה <b dir="ltr">;</b> בסוף — כל פקודת SQL מסתיימת בנקודה-פסיק. במבחן מורידים על כך נקודות תחביר!`);

  // אזהרות רגילות (עד 5) + הנקודה-פסיק תמיד מוצגת אחרונה ולא נחתכת
  return [...w.slice(0,5).map(m=>({t:'warn', m})), ...semi.map(m=>({t:'warn', m}))];
}
function lintHtml(sql){
  return lintSql(sql).map(o =>
    `<div class="lint-item ${o.t==='tip'?'tip':''}">${o.t==='tip'?'💡':'⚠'} ${o.m}</div>`).join('');
}
function showLint(sql){ $('#sqlLint').innerHTML = lintHtml(sql); }

function ensureSql(){
  if(SQLEngine || sqlLoading || sqlFailed){ renderSqlSide(); return; }
  sqlLoading = true; setEngineStatus('טוען מנוע SQL...');
  const cdn = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';
  const s = document.createElement('script');
  s.src = cdn + 'sql-wasm.js';
  s.onload = () => {
    initSqlJs({ locateFile: f => cdn + f })
      .then(SQL => { SQLEngine = SQL; sqlLoading=false; setEngineStatus('✓ מנוע SQL מוכן — הריצו שאילתות אמיתיות (Ctrl+Enter להרצה)'); renderSqlSide(); })
      .catch(() => { sqlFailed=true; sqlLoading=false; setEngineStatus('⚠ מנוע SQL לא נטען — בדיקה מקורבת לפי טקסט'); renderSqlSide(); });
  };
  s.onerror = () => { sqlFailed=true; sqlLoading=false; setEngineStatus('⚠ אין חיבור לאינטרנט — בדיקה מקורבת לפי טקסט'); renderSqlSide(); };
  document.head.appendChild(s);
}
function setEngineStatus(t){ const e=$('#engineStatus'); if(e) e.textContent = t; }
function freshDB(){ const db = new SQLEngine.Database(); db.run(C.sqlSchema); return db; }
function runSql(db, sql){
  const res = db.exec(sql);
  if(!res.length) return { columns:[], rows:[], modified: db.getRowsModified() };
  const last = res[res.length-1];
  return { columns:last.columns, rows:last.values, modified: db.getRowsModified() };
}
function normCell(v){
  if(v === null || v === undefined) return '∅';
  if(typeof v === 'number') return (Math.round(v*10000)/10000).toString();
  const n = Number(v);
  if(!isNaN(n) && String(v).trim() !== '') return (Math.round(n*10000)/10000).toString();
  return String(v).trim();
}
function canon(result, ordered){
  const rows = result.rows.map(r => r.map(normCell).join('│'));
  if(!ordered) rows.sort();
  return rows.join('\n') + '##cols=' + result.columns.length;
}
function resultTable(result){
  if(!result.columns.length) return `<div class="feedback info show">בוצע בהצלחה. שורות שהושפעו: ${result.modified}</div>`;
  if(!result.rows.length) return `<div style="color:var(--muted)">אין תוצאות (0 שורות)</div>`;
  return `<table class="result-table"><thead><tr>${result.columns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${
    result.rows.map(r=>`<tr>${r.map(c=>`<td>${c===null?'NULL':esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
/* --- זיהוי הטבלאות הרלוונטיות לשאלה + תצוגה מקדימה --- */
function tablesInQuery(sql){
  const known = C.sqlTables.map(t=>t.name);
  const found = [];
  const re = /\b(?:FROM|JOIN|UPDATE|INTO)\s+([A-Za-z_][A-Za-z0-9_]*)/gi;
  let m;
  while((m = re.exec(sql))){
    const name = known.find(k => k.toLowerCase() === m[1].toLowerCase());
    if(name && !found.includes(name)) found.push(name);
  }
  return found;
}
function tablePreview(names){
  if(!names || !names.length) return '';
  const lines = names.map(n => {
    const meta = C.sqlTables.find(t=>t.name.toLowerCase()===n.toLowerCase());
    return `<div class="tbl-line" dir="ltr"><b>${esc(meta?meta.name:n)}</b> (${esc(meta?meta.cols:'')})</div>`;
  }).join('');
  return `<div class="tbl-preview" data-tables="${names.join(',')}">
    <div class="tbl-preview-head">
      <span class="tbl-preview-lbl">📋 נתונ${names.length>1?'ות הטבלאות':'ה הטבלה'}:</span>
      <button type="button" class="tbl-data-btn">👁 נתוני דוגמה</button>
    </div>
    ${lines}
    <div class="tbl-data hidden"></div>
  </div>`;
}
/* נתוני דוגמה — נטענים רק בלחיצה על הכפתור */
function sampleDataHtml(names){
  return names.map(n => {
    const meta = C.sqlTables.find(t=>t.name.toLowerCase()===n.toLowerCase());
    const realName = meta ? meta.name : n;
    let inner = '';
    if(typeof SQLEngine!=='undefined' && SQLEngine && !sqlFailed){
      try{
        const r = runSql(freshDB(), `SELECT * FROM ${realName}`);
        inner = resultTable({ columns:r.columns, rows:r.rows.slice(0,3), modified:0 }) +
          (r.rows.length>3 ? `<div class="tbl-more">…ועוד ${r.rows.length-3} שורות</div>` : '');
      }catch(e){}
    } else inner = '<div class="tbl-more">מנוע ה-SQL עוד נטען...</div>';
    return `<div class="tbl-one">${names.length>1?`<div class="tbl-one-name">${esc(realName)}</div>`:''}${inner}</div>`;
  }).join('');
}
/* האזנה גלובלית לכפתורי "נתוני דוגמה" (עובד בכל המסכים) */
document.addEventListener('click', e => {
  const btn = e.target.closest('.tbl-data-btn');
  if(!btn) return;
  const wrap = btn.closest('.tbl-preview');
  const dataDiv = wrap.querySelector('.tbl-data');
  if(dataDiv.classList.contains('hidden')){
    dataDiv.innerHTML = sampleDataHtml((wrap.dataset.tables||'').split(',').filter(Boolean));
    dataDiv.classList.remove('hidden');
    btn.textContent = '🙈 הסתר נתונים';
  } else {
    dataDiv.classList.add('hidden');
    btn.textContent = '👁 נתוני דוגמה';
  }
});

function expectedResult(q){
  if(q.check === 'select') return runSql(freshDB(), q.solution);
  const db = freshDB(); db.run(q.solution);
  return runSql(db, `SELECT * FROM ${q.mutateTable}`);
}
function gradeSql(q, userSql){
  if(!userSql.trim()) return { ok:false, msg:'כתוב שאילתה לפני הבדיקה.', kind:'info' };
  if(sqlFailed || !SQLEngine) return textGrade(q, userSql);
  try{
    if(q.check === 'select'){
      const u = runSql(freshDB(), userSql);
      const s = runSql(freshDB(), q.solution);
      const ordered = /order\s+by/i.test(q.solution);
      const ok = canon(u, ordered) === canon(s, ordered);
      return { ok, msg: ok ? '✓ מצוין! התוצאה תואמת לפתרון.' : '✗ התוצאה לא תואמת — השווה מול "התוצאה הרצויה" למטה.', kind: ok?'ok':'err', userResult:u };
    } else {
      const dbU = freshDB(); dbU.run(userSql);
      const u = runSql(dbU, `SELECT * FROM ${q.mutateTable}`);
      const dbS = freshDB(); dbS.run(q.solution);
      const s = runSql(dbS, `SELECT * FROM ${q.mutateTable}`);
      const ok = canon(u) === canon(s);
      return { ok, msg: ok ? `✓ מצוין! מצב טבלת ${q.mutateTable} תואם לפתרון.` : `✗ מצב טבלת ${q.mutateTable} שונה מהצפוי — השווה מול "התוצאה הרצויה" למטה.`, kind: ok?'ok':'err', userResult:u, mutated:true };
    }
  }catch(e){ return { ok:false, msg:friendlyError(e.message), kind:'err', isError:true }; }
}
function textGrade(q, userSql){
  const n = s => s.toLowerCase().replace(/\s+/g,' ').replace(/;+\s*$/,'').replace(/["'`]/g,'').trim();
  const ok = n(userSql) === n(q.solution);
  return { ok, msg: ok ? '✓ נראה תקין (בדיקה מקורבת).' : '⚠ בדיקה מקורבת — השווה לפתרון בעצמך (אין מנוע SQL פעיל).', kind: ok?'ok':'info' };
}
function sqlSet(){ return C.sqlQuestions.filter(q =>
  sqlFilter==='all' ? true :
  sqlFilter==='exam' ? q.exam :
  sqlFilter==='exam2' ? q.exam2 :
  sqlFilter==='exam3' ? q.exam3 :
  sqlFilter==='exam4' ? q.exam4 :
  sqlFilter==='exam5' ? q.exam5 :
  sqlFilter==='exam6' ? q.exam6 :
  sqlFilter==='exam7' ? q.exam7 :
  sqlFilter==='exam8' ? q.exam8 :
  q.topic===sqlFilter); }
function renderSqlSide(){
  const filters = [`<button data-f="all" class="active">הכל</button>`,
    `<button data-f="exam">⭐ מבחן 1</button>`,
    `<button data-f="exam2">⭐ מבחן 2</button>`,
    `<button data-f="exam3">⭐ מבחן 3</button>`,
    `<button data-f="exam4">⭐ מבחן 4</button>`,
    `<button data-f="exam5">⭐ מבחן 5</button>`,
    `<button data-f="exam6">⭐ מבחן 6</button>`,
    `<button data-f="exam7">⭐ מבחן 7</button>`,
    `<button data-f="exam8">⭐ מבחן 8</button>`,
    `<button data-f="sql-basics">שליפה/סינון</button>`,
    `<button data-f="sql-agg">אגרגציה/JOIN</button>`];
  $('#sqlFilters').innerHTML = filters.join('');
  $$('#sqlFilters button').forEach(b => b.onclick = () => { sqlFilter=b.dataset.f;
    $$('#sqlFilters button').forEach(x=>x.classList.toggle('active',x===b)); renderSqlList(); });
  renderSqlList();
  $('#tblList').innerHTML = C.sqlTables.map(t => `<div><b>${t.name}</b> (${t.cols})</div>`).join('');
}
function renderSqlList(){
  const set = sqlSet();
  if(!set.length) return;
  $('#sqlQList').innerHTML = set.map(q =>
    `<button class="q-pick ${PROG.sql[q.id]?'done':''}" data-id="${q.id}">
       שאלה ${q.id} <span class="badge">${q.exam?'⭐ מבחן 1':q.exam2?'⭐ מבחן 2':q.exam3?'⭐ מבחן 3':q.exam4?'⭐ מבחן 4':q.exam5?'⭐ מבחן 5':q.exam6?'⭐ מבחן 6':q.exam7?'⭐ מבחן 7':q.exam8?'⭐ מבחן 8':q.level||''}</span>
     </button>`).join('');
  $$('#sqlQList .q-pick').forEach(b => b.onclick = () => selectSqlQ(+b.dataset.id));
  if(!currentSqlQ || !set.find(q=>q.id===currentSqlQ.id)) selectSqlQ(set[0].id);
  else $(`#sqlQList .q-pick[data-id="${currentSqlQ.id}"]`)?.classList.add('active');
}
function selectSqlQ(id){
  currentSqlQ = C.sqlQuestions.find(q => q.id === id);
  $$('#sqlQList .q-pick').forEach(b => b.classList.toggle('active', +b.dataset.id === id));
  $('#sqlPromptTitle').textContent = `שאלה ${currentSqlQ.id}${currentSqlQ.exam?' (מבחן לדוגמה 1)':currentSqlQ.exam2?' (מבחן תרגול 2)':currentSqlQ.exam3?' (מבחן תרגול 3)':currentSqlQ.exam4?' (מבחן תרגול 4)':currentSqlQ.exam5?' (מבחן תרגול 5)':currentSqlQ.exam6?' (מבחן תרגול 6)':currentSqlQ.exam7?' (מבחן תרגול 7)':currentSqlQ.exam8?' (מבחן תרגול 8)':''} · ${currentSqlQ.level||''}`;
  $('#sqlPromptText').textContent = currentSqlQ.prompt;
  $('#sqlTablePreview').innerHTML = tablePreview(tablesInQuery(currentSqlQ.solution));
  $('#sqlInput').value = '';
  $('#sqlFeedback').className = 'feedback';
  $('#sqlResult').innerHTML = '';
  $('#sqlLint').innerHTML = '';
  $('#sqlSolution').className = 'sol-box';
  $('#sqlSolution').textContent = currentSqlQ.solution;
  $('#sqlHint').textContent = '';
}
function setupSql(){
  $('#sqlRun').onclick = () => {
    const sql = $('#sqlInput').value;
    showLint(sql);
    if(!SQLEngine){ showSqlFeedback({msg:'מנוע SQL לא פעיל — נסה "בדוק תשובה" (בדיקה מקורבת).', kind:'info'}); return; }
    try{
      const r = runSql(freshDB(), sql);
      $('#sqlResult').innerHTML = '<h4>תוצאה:</h4>' + resultTable(r);
      $('#sqlFeedback').className = 'feedback';
    }catch(e){ showSqlFeedback({msg:friendlyError(e.message), kind:'err'}); $('#sqlResult').innerHTML=''; }
  };
  $('#sqlCheck').onclick = () => {
    const sql = $('#sqlInput').value;
    showLint(sql);
    const res = gradeSql(currentSqlQ, sql);
    const syntaxIssues = res.ok && lintSql(sql).length;
    showSqlFeedback(syntaxIssues
      ? {kind:'info', msg:'✓ התוצאה נכונה — אבל שים לב להערות התחביר למטה! המרצה מורידה נקודות על תחביר, אז תקן לפני המבחן.'}
      : res);
    let html = '';
    if(res.userResult) html += `<h4>${res.mutated?'מצב הטבלה אחרי הפעולה שלך:':'התוצאה שלך:'}</h4>` + resultTable(res.userResult);
    if(!res.ok && SQLEngine && !sqlFailed){
      try{ html += `<h4 class="expect-h">🎯 התוצאה הרצויה:</h4>` + resultTable(expectedResult(currentSqlQ)); }catch(e){}
    }
    $('#sqlResult').innerHTML = html;
    if(res.ok){ PROG.sql[currentSqlQ.id]=true; saveProg(); $(`#sqlQList .q-pick[data-id="${currentSqlQ.id}"]`)?.classList.add('done'); }
  };
  $('#sqlExpectBtn').onclick = () => {
    if(!SQLEngine){ showSqlFeedback({msg:'מנוע SQL לא פעיל.', kind:'info'}); return; }
    try{ $('#sqlResult').innerHTML = `<h4 class="expect-h">🎯 התוצאה הרצויה (מה שהשאילתה שלך צריכה להחזיר):</h4>` + resultTable(expectedResult(currentSqlQ)); }
    catch(e){ showSqlFeedback({msg:friendlyError(e.message), kind:'err'}); }
  };
  $('#sqlHintBtn').onclick = () => $('#sqlHint').textContent = '💡 ' + currentSqlQ.hint;
  $('#sqlSolBtn').onclick = () => $('#sqlSolution').classList.toggle('show');
  $('#sqlReset').onclick = () => { $('#sqlInput').value=''; $('#sqlResult').innerHTML=''; $('#sqlLint').innerHTML=''; $('#sqlFeedback').className='feedback'; };
  $('#sqlInput').addEventListener('keydown', e => {
    if(e.ctrlKey && e.key === 'Enter'){ e.preventDefault(); $('#sqlRun').click(); }
  });
}
function showSqlFeedback(res){ const f=$('#sqlFeedback'); f.className='feedback show '+(res.kind||'info'); f.innerHTML=res.msg; }

/* ============================================================
   סימולציית מבחן (15 רשמיות + 5 SQL = 100)
   ============================================================ */
/* קונפיגורציית המבחנים: mcFlag = דגל שאלות אמריקאיות, sqlFlag = דגל שאלות SQL,
   pts5 = ניקוד רשמי (5 נק' לשאלה, 15+5=100); אחרת ציון מנורמל. */
const EXAMS = {
  1: { mcFlag:'official', sqlFlag:'exam',  title:'מבחן לדוגמה 1', pts5:true },
  2: { mcFlag:'practice', sqlFlag:'exam2', title:'מבחן תרגול 2',  pts5:false },
  3: { mcFlag:'exam3',    sqlFlag:'exam3', title:'מבחן תרגול 3',  pts5:true },
  4: { mcFlag:'exam4',    sqlFlag:'exam4', title:'מבחן תרגול 4',  pts5:true },
  5: { mcFlag:'exam5',    sqlFlag:'exam5', title:'מבחן תרגול 5',  pts5:true },
  6: { mcFlag:'exam6',    sqlFlag:'exam6', title:'מבחן תרגול 6',  pts5:true },
  7: { mcFlag:'exam7',    sqlFlag:'exam7', title:'מבחן תרגול 7',  pts5:true },
  8: { mcFlag:'exam8',    sqlFlag:'exam8', title:'מבחן תרגול 8',  pts5:true }
};
let examTimer=null, examSeconds=0, examActive=false, examSelections={}, examMC=[], examSqlQs=[], examKind=1, examPerm=[];
function startExam(kind){
  examKind = kind || 1;
  examActive=true; examSeconds=0; examSelections={};
  $('#examIntro').classList.add('hidden'); $('#examRun').classList.remove('hidden'); $('#examResult').innerHTML='';
  buildExam();
  clearInterval(examTimer);
  examTimer = setInterval(()=>{ examSeconds++;
    $('#examTimer').textContent = `${String(Math.floor(examSeconds/60)).padStart(2,'0')}:${String(examSeconds%60).padStart(2,'0')}`; },1000);
}
function buildExam(){
  const cfg = EXAMS[examKind];
  examMC = C.quiz.filter(q => q[cfg.mcFlag]);
  const sqlQs = C.sqlQuestions.filter(q => q[cfg.sqlFlag]);
  examSqlQs = sqlQs;
  examPerm = [];
  const mc = examMC.map((q,i)=>{
    const perm = shuffle([...q.options.keys()]); examPerm[i] = perm;  // סדר תשובות אקראי
    return `
    <div class="quiz-q" data-i="${i}">
      <div class="qnum">שאלה ${i+1}${EXAMS[examKind].pts5?" · 5 נק'":''}</div>
      <div class="qtext">${esc(q.q)}</div>
      ${perm.map((orig,disp)=>`<button class="opt ex-opt" data-i="${i}" data-j="${orig}"><span class="mark">${AL[disp]}</span> ${esc(q.options[orig])}</button>`).join('')}
      <div class="explain" id="exam-exp-${i}"></div>
    </div>`; }).join('');
  const sq = sqlQs.map((q,k)=>`
    <div class="prompt-box" data-id="${q.id}" style="margin-bottom:14px">
      <div class="q-title">שאלה ${examMC.length+1+k}</div>
      <div style="margin-bottom:10px">${esc(q.prompt)}</div>
      ${tablePreview(tablesInQuery(q.solution))}
      <textarea class="ex-sql" data-id="${q.id}" style="width:100%;min-height:100px;background:var(--code-bg);color:#cfe3ff;border:1px solid var(--line);border-radius:10px;padding:12px;font-family:Consolas,monospace;direction:ltr;text-align:left" placeholder="כתוב כאן את השאילתה..."></textarea>
      <div class="explain" id="exam-sqlexp-${q.id}"></div>
    </div>`).join('');
  const pts5 = EXAMS[examKind].pts5;
  const title1 = pts5 ? `חלק א׳ — ${examMC.length} שאלות אמריקאיות (${examMC.length*5} נק')` : `חלק א׳ — ${examMC.length} שאלות אמריקאיות`;
  const title2 = pts5 ? `חלק ב׳ — ${sqlQs.length} שאילתות SQL (${sqlQs.length*5} נק')` : `חלק ב׳ — ${sqlQs.length} שאילתות SQL`;
  $('#examBody').innerHTML =
    `<h3 style="border-inline-start:4px solid var(--accent);padding-inline-start:12px">${title1}</h3>${mc}
     <h3 style="border-inline-start:4px solid var(--accent2);padding-inline-start:12px;margin-top:20px">${title2}</h3>${sq}`;
  $$('#examBody .ex-opt').forEach(b => b.onclick = () => {
    if(!examActive) return;
    const i=+b.dataset.i;
    examSelections[i]=+b.dataset.j;
    $$(`#examBody .ex-opt[data-i="${i}"]`).forEach(o=>o.classList.remove('selected'));
    b.classList.add('selected');
  });
}
function finishExam(){
  if(!examActive) return;
  const unansweredMC = examMC.length - Object.keys(examSelections).length;
  const emptySql = $$('#examBody .ex-sql').filter(t=>!t.value.trim()).length;
  if((unansweredMC>0 || emptySql>0) &&
     !confirm(`יש ${unansweredMC} שאלות אמריקאיות ו-${emptySql} שאלות SQL ללא מענה. לסיים בכל זאת?`)) return;
  examActive=false; clearInterval(examTimer);
  let mcCorrect=0;
  examMC.forEach((q,i)=>{
    const opts=$$(`#examBody .ex-opt[data-i="${i}"]`);
    const chosen=examSelections[i];
    opts.forEach(o=>{ const orig=+o.dataset.j; if(orig===q.correct)o.classList.add('correct'); else if(orig===chosen)o.classList.add('wrong'); o.style.cursor='default'; o.onclick=null; });
    if(chosen===q.correct) mcCorrect++;
    const correctDisp = (examPerm[i] || [...q.options.keys()]).indexOf(q.correct);
    const exp = $('#exam-exp-'+i);
    exp.innerHTML = `<b>${chosen===q.correct?'✓ נכון.':'✗ '+(chosen===undefined?'לא נענתה.':'לא נכון.')}</b> התשובה: ${AL[correctDisp]}. ${esc(q.explain)}`;
    exp.classList.add('show');
  });
  const sqlQs=examSqlQs; let sqlCorrect=0, detail=[];
  sqlQs.forEach(q=>{
    const ta=$(`#examBody .ex-sql[data-id="${q.id}"]`);
    const res=gradeSql(q, ta?ta.value:'');
    if(res.ok){ sqlCorrect++; ta.style.borderColor='var(--good)'; } else ta.style.borderColor='var(--bad)';
    const exp = $('#exam-sqlexp-'+q.id);
    exp.innerHTML = res.ok ? '<b>✓ נכון.</b>' :
      `<b>✗ ${res.msg}</b><br>הפתרון: <pre style="direction:ltr;text-align:left;margin:8px 0 0;background:var(--code-bg);color:#cfe3ff;padding:10px;border-radius:8px">${esc(q.solution)}</pre>`;
    exp.classList.add('show');
    detail.push(`<li>שאלה ${q.id}: ${res.ok?'✓ נכון':'✗ שגוי'}</li>`);
  });
  const pts5 = EXAMS[examKind].pts5;
  const total = pts5
    ? mcCorrect*5 + sqlCorrect*5
    : Math.round((mcCorrect + sqlCorrect) / (examMC.length + sqlQs.length) * 100);
  const pass = total>=60;
  PROG.examBest = Math.max(PROG.examBest, total); saveProg();
  const mm=String(Math.floor(examSeconds/60)).padStart(2,'0'), ss=String(examSeconds%60).padStart(2,'0');
  $('#examResult').innerHTML = `
    <div class="result-banner ${pass?'pass':'fail'}">${pass?'🎉 עברת!':'💪 עוד קצת תרגול'} &nbsp; ${EXAMS[examKind].title} — ציון סופי: ${total}/100${pts5?'':' (מנורמל)'}</div>
    <div class="card">
      <p>📝 אמריקאי: <b>${mcCorrect}/${examMC.length}</b>${pts5?` = ${mcCorrect*5} נק'`:''}</p>
      <p>💻 SQL: <b>${sqlCorrect}/${sqlQs.length}</b>${pts5?` = ${sqlCorrect*5} נק'`:''}</p>
      <p>⏱ זמן: ${mm}:${ss}</p>
      <ul style="color:var(--muted);font-size:14px">${detail.join('')}</ul>
      <p style="color:var(--muted);font-size:13px">גלול למטה — מתחת לכל שאלה מופיע הסבר מלא + הפתרון.</p>
    </div>`;
  $('#examResult').scrollIntoView({behavior:'smooth'});
  $('#examFinishBtn').classList.add('hidden'); $('#examRestartBtn').classList.remove('hidden');
}
function setupExam(){
  const start = k => { ensureSql(); startExam(k); $('#examFinishBtn').classList.remove('hidden'); $('#examRestartBtn').classList.add('hidden'); };
  [1,2,3,4,5,6,7,8].forEach(k => { const b = $('#examStart'+k); if(b) b.onclick = () => start(k); });
  $('#examFinishBtn').onclick = finishExam;
  $('#examRestartBtn').onclick = () => { $('#examRun').classList.add('hidden'); $('#examIntro').classList.remove('hidden'); };
}

/* ---------------- אתחול ---------------- */
function init(){
  applyTheme((()=>{ try { return localStorage.getItem(TKEY) || 'light'; } catch(e){ return 'light'; } })());
  $('#themeBtn').onclick = () => applyTheme(document.documentElement.dataset.theme==='dark' ? 'light' : 'dark');
  $$('nav.tabs button').forEach(b => b.onclick = () => showView(b.dataset.view));
  renderHome();
  renderTopicNav(); selectTopic(C.topics[0].id, false);
  renderExamples();
  renderFlashcards(); setupFlashcards();
  renderQuizFilters(); renderQuiz();
  $('#quizRestart').onclick = () => { answeredNow={}; renderQuiz(); };
  renderSqlSide(); setupSql();
  setupExam();
  $('#resetProg').onclick = () => {
    if(confirm('לאפס את כל ההתקדמות?')){ PROG={topicsRead:{},quiz:{},sql:{},fcKnown:{},levels:{},levelExam:{},examBest:0}; saveProg(); location.reload(); }
  };
  showView('home');
  saveProg();
}
document.addEventListener('DOMContentLoaded', init);
