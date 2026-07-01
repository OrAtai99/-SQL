/* ============================================================
   פורטל למידה — ניהול ועיצוב בסיסי נתונים
   ============================================================ */
const C = window.COURSE;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------------- ניווט בין מסכים ---------------- */
function showView(id){
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-'+id));
  $$('nav.tabs button').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  window.scrollTo({top:0, behavior:'smooth'});
  if(id === 'sql') ensureSql();
}

/* ---------------- דף הבית ---------------- */
function renderHome(){
  const wrap = $('#homeCards');
  wrap.innerHTML = C.topics.map(t => `
    <div class="card home-card" data-topic="${t.id}">
      <div class="ic">${t.icon}</div>
      <div><h3>${t.title}</h3><p style="margin:0;color:var(--muted);font-size:14px">${t.summary}</p></div>
    </div>`).join('');
  $$('#homeCards .home-card').forEach(c =>
    c.onclick = () => { showView('topics'); selectTopic(c.dataset.topic); });

  $('#statTopics').textContent = C.topics.length;
  $('#statQuiz').textContent = C.quiz.length;
  $('#statSql').textContent = C.sqlQuestions.length;
  $('#statCards').textContent = C.flashcards.length;
}

/* ---------------- סיכומי נושאים ---------------- */
function renderTopicNav(){
  $('#topicNav').innerHTML = C.topics.map(t =>
    `<button data-topic="${t.id}">${t.icon} ${t.title}</button>`).join('');
  $$('#topicNav button').forEach(b => b.onclick = () => selectTopic(b.dataset.topic));
}
function selectTopic(id){
  const t = C.topics.find(x => x.id === id) || C.topics[0];
  $$('#topicNav button').forEach(b => b.classList.toggle('active', b.dataset.topic === t.id));
  $('#topicBody').innerHTML = `<h2 class="view-title">${t.icon} ${t.title}</h2>` +
    t.sections.map(s => `<section><h3>${s.heading}</h3>${s.html}</section>`).join('');
  window.scrollTo({top:0, behavior:'smooth'});
}

/* ---------------- כרטיסיות זיכרון ---------------- */
let fcIndex = 0, fcOrder = [];
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]];} return a; }
function renderFlashcards(){
  fcOrder = C.flashcards.map((_,i)=>i);
  fcIndex = 0;
  drawCard();
}
function drawCard(){
  const card = C.flashcards[fcOrder[fcIndex]];
  $('#fcInner').classList.remove('flipped');
  $('#fcFrontTxt').textContent = card.front;
  $('#fcBackTxt').textContent = card.back;
  $('#fcCounter').textContent = `${fcIndex+1} / ${fcOrder.length}`;
}
function setupFlashcards(){
  $('#fcInner').onclick = () => $('#fcInner').classList.toggle('flipped');
  $('#fcNext').onclick = () => { fcIndex = (fcIndex+1) % fcOrder.length; drawCard(); };
  $('#fcPrev').onclick = () => { fcIndex = (fcIndex-1+fcOrder.length) % fcOrder.length; drawCard(); };
  $('#fcShuffle').onclick = () => { fcOrder = shuffle(fcOrder); fcIndex = 0; drawCard(); };
}

/* ---------------- בוחן אמריקאי ---------------- */
const AL = ['א','ב','ג','ד'];
let quizAnswers = {};
function renderQuiz(){
  quizAnswers = {};
  const wrap = $('#quizBody');
  wrap.innerHTML = C.quiz.map((q,i) => `
    <div class="quiz-q" data-i="${i}">
      <div class="qnum">שאלה ${i+1}</div>
      <div class="qtext">${esc(q.q)}</div>
      ${q.options.map((o,j)=>`<button class="opt" data-i="${i}" data-j="${j}">
        <span class="mark">${AL[j]}</span> ${esc(o)}</button>`).join('')}
      <div class="explain" id="exp-${i}"></div>
    </div>`).join('');
  $$('#quizBody .opt').forEach(b => b.onclick = () => pickQuiz(+b.dataset.i, +b.dataset.j));
  $('#quizResult').innerHTML = '';
  updateQuizScore();
}
function pickQuiz(i,j){
  if(quizAnswers[i] !== undefined) return; // נעילה אחרי בחירה
  quizAnswers[i] = j;
  const q = C.quiz[i];
  const opts = $$(`.opt[data-i="${i}"]`);
  opts.forEach((o,k) => {
    if(k === q.correct) o.classList.add('correct');
    else if(k === j) o.classList.add('wrong');
    o.style.cursor = 'default';
  });
  const exp = $('#exp-'+i);
  const ok = j === q.correct;
  exp.innerHTML = `<b>${ok ? '✓ נכון!' : '✗ לא נכון.'}</b> התשובה הנכונה: ${AL[q.correct]}. ${esc(q.explain)}`;
  exp.classList.add('show');
  updateQuizScore();
}
function updateQuizScore(){
  const answered = Object.keys(quizAnswers).length;
  const correct = Object.entries(quizAnswers).filter(([i,j]) => +j === C.quiz[+i].correct).length;
  $('#quizScore').textContent = `נענו ${answered}/${C.quiz.length} · נכונות ${correct}`;
  if(answered === C.quiz.length){
    const pct = Math.round(correct/C.quiz.length*100);
    const pass = pct >= 60;
    $('#quizResult').innerHTML =
      `<div class="result-banner ${pass?'pass':'fail'}">
        ${pass?'🎉':'💪'} סיימת את הבוחן! ציון: ${pct} (${correct}/${C.quiz.length})
      </div>`;
    $('#quizResult').scrollIntoView({behavior:'smooth'});
  }
}

/* ============================================================
   מנוע SQL (sql.js) + בדיקה אוטומטית
   ============================================================ */
let SQLEngine = null, sqlLoading = false, sqlFailed = false, currentSqlQ = null;

function ensureSql(){
  if(SQLEngine || sqlLoading || sqlFailed) { renderSqlSide(); return; }
  sqlLoading = true;
  setEngineStatus('טוען מנוע SQL...');
  const cdn = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';
  const s = document.createElement('script');
  s.src = cdn + 'sql-wasm.js';
  s.onload = () => {
    initSqlJs({ locateFile: f => cdn + f })
      .then(SQL => { SQLEngine = SQL; sqlLoading = false; setEngineStatus('✓ מנוע SQL מוכן — הריצו שאילתות אמיתיות'); renderSqlSide(); })
      .catch(() => { sqlFailed = true; sqlLoading = false; setEngineStatus('⚠ מנוע SQL לא נטען — בדיקה מקורבת לפי טקסט'); renderSqlSide(); });
  };
  s.onerror = () => { sqlFailed = true; sqlLoading = false; setEngineStatus('⚠ אין חיבור לאינטרנט — בדיקה מקורבת לפי טקסט'); renderSqlSide(); };
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
  if(!ordered) rows.sort();          // ברירת מחדל: השוואה ללא תלות בסדר
  return rows.join('\n') + '##cols=' + result.columns.length;
}
function resultTable(result){
  if(!result.columns.length){
    return `<div class="feedback info show">בוצע בהצלחה. שורות שהושפעו: ${result.modified}</div>`;
  }
  if(!result.rows.length) return `<div style="color:var(--muted)">אין תוצאות (0 שורות)</div>`;
  return `<table class="result-table"><thead><tr>${
    result.columns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${
    result.rows.map(r=>`<tr>${r.map(c=>`<td>${c===null?'NULL':esc(c)}</td>`).join('')}</tr>`).join('')
  }</tbody></table>`;
}

/* בדיקת שאילתה מול הפתרון */
function gradeSql(q, userSql){
  if(!userSql.trim()) return { ok:false, msg:'כתוב שאילתה לפני הבדיקה.', kind:'info' };
  if(sqlFailed || !SQLEngine) return textGrade(q, userSql);
  try{
    if(q.check === 'select'){
      const u = runSql(freshDB(), userSql);
      const s = runSql(freshDB(), q.solution);
      const ordered = /order\s+by/i.test(q.solution); // שאלת מיון? נשווה לפי הסדר
      const ok = canon(u, ordered) === canon(s, ordered);
      return { ok, msg: ok ? '✓ מצוין! התוצאה תואמת לפתרון.' : '✗ התוצאה לא תואמת. השווה לפתרון ונסה שוב.',
               kind: ok?'ok':'err', userResult:u };
    } else { // mutate
      const dbU = freshDB(); dbU.run(userSql);
      const u = runSql(dbU, `SELECT * FROM ${q.mutateTable}`);
      const dbS = freshDB(); dbS.run(q.solution);
      const s = runSql(dbS, `SELECT * FROM ${q.mutateTable}`);
      const ok = canon(u) === canon(s);
      return { ok, msg: ok ? `✓ מצוין! מצב טבלת ${q.mutateTable} תואם לפתרון.` : `✗ מצב טבלת ${q.mutateTable} שונה מהצפוי. בדוק את ה-WHERE ונסה שוב.`,
               kind: ok?'ok':'err', userResult:u, mutated:true };
    }
  }catch(e){
    return { ok:false, msg:'שגיאת SQL: ' + e.message, kind:'err' };
  }
}
/* בדיקה מקורבת לפי טקסט (כשאין מנוע) */
function textGrade(q, userSql){
  const n = s => s.toLowerCase().replace(/\s+/g,' ').replace(/;+\s*$/,'').replace(/["'`]/g,'').trim();
  const ok = n(userSql) === n(q.solution);
  return { ok, msg: ok ? '✓ נראה תקין (בדיקה מקורבת).' : '⚠ בדיקה מקורבת — השווה לפתרון בעצמך (אין מנוע SQL פעיל).',
           kind: ok?'ok':'info' };
}

/* ---------------- מסך תרגול SQL ---------------- */
function renderSqlSide(){
  $('#sqlQList').innerHTML = C.sqlQuestions.map(q =>
    `<button class="q-pick" data-id="${q.id}">
       שאלה ${q.id} ${q.exam?'<span class="badge">· מהמבחן</span>':'<span class="badge">· תרגול</span>'}
     </button>`).join('');
  $$('#sqlQList .q-pick').forEach(b => b.onclick = () => selectSqlQ(+b.dataset.id));
  $('#tblList').innerHTML = C.sqlTables.map(t =>
    `<div><b>${t.name}</b> (${t.cols})</div>`).join('');
  if(!currentSqlQ) selectSqlQ(C.sqlQuestions[0].id);
}
function selectSqlQ(id){
  currentSqlQ = C.sqlQuestions.find(q => q.id === id);
  $$('#sqlQList .q-pick').forEach(b => b.classList.toggle('active', +b.dataset.id === id));
  $('#sqlPromptTitle').textContent = `שאלה ${currentSqlQ.id}${currentSqlQ.exam?' (מהמבחן לדוגמה)':''}`;
  $('#sqlPromptText').textContent = currentSqlQ.prompt;
  $('#sqlInput').value = '';
  $('#sqlFeedback').className = 'feedback';
  $('#sqlResult').innerHTML = '';
  $('#sqlSolution').className = 'sol-box';
  $('#sqlSolution').textContent = currentSqlQ.solution;
  $('#sqlHint').textContent = '';
}
function setupSql(){
  $('#sqlRun').onclick = () => {
    if(!SQLEngine){ showSqlFeedback({msg:'מנוע SQL לא פעיל — נסה לבדוק תשובה (בדיקה מקורבת).', kind:'info'}); return; }
    try{
      const r = runSql(freshDB(), $('#sqlInput').value);
      $('#sqlResult').innerHTML = '<h4>תוצאה:</h4>' + resultTable(r);
      $('#sqlFeedback').className = 'feedback';
    }catch(e){ showSqlFeedback({msg:'שגיאת SQL: '+e.message, kind:'err'}); $('#sqlResult').innerHTML=''; }
  };
  $('#sqlCheck').onclick = () => {
    const res = gradeSql(currentSqlQ, $('#sqlInput').value);
    showSqlFeedback(res);
    if(res.userResult) $('#sqlResult').innerHTML = `<h4>${res.mutated?'מצב הטבלה אחרי הפעולה:':'התוצאה שלך:'}</h4>` + resultTable(res.userResult);
    if(res.ok) $(`#sqlQList .q-pick[data-id="${currentSqlQ.id}"]`).classList.add('done');
  };
  $('#sqlHintBtn').onclick = () => $('#sqlHint').textContent = '💡 ' + currentSqlQ.hint;
  $('#sqlSolBtn').onclick = () => $('#sqlSolution').classList.toggle('show');
  $('#sqlReset').onclick = () => { $('#sqlInput').value=''; $('#sqlResult').innerHTML=''; $('#sqlFeedback').className='feedback'; };
}
function showSqlFeedback(res){
  const f = $('#sqlFeedback');
  f.className = 'feedback show ' + (res.kind || 'info');
  f.textContent = res.msg;
}

/* ============================================================
   סימולציית מבחן (75 נק' אמריקאי + 25 נק' SQL = 100)
   ============================================================ */
let examTimer = null, examSeconds = 0, examActive = false;
function startExam(){
  examActive = true; examSeconds = 0;
  $('#examIntro').classList.add('hidden');
  $('#examRun').classList.remove('hidden');
  $('#examResult').innerHTML = '';
  buildExam();
  clearInterval(examTimer);
  examTimer = setInterval(() => {
    examSeconds++;
    const m = String(Math.floor(examSeconds/60)).padStart(2,'0');
    const s = String(examSeconds%60).padStart(2,'0');
    $('#examTimer').textContent = `${m}:${s}`;
  }, 1000);
}
function buildExam(){
  const mc = C.quiz.map((q,i)=>`
    <div class="quiz-q" data-i="${i}">
      <div class="qnum">שאלה ${i+1} · 5 נק'</div>
      <div class="qtext">${esc(q.q)}</div>
      ${q.options.map((o,j)=>`<button class="opt ex-opt" data-i="${i}" data-j="${j}"><span class="mark">${AL[j]}</span> ${esc(o)}</button>`).join('')}
    </div>`).join('');
  const sqlQs = C.sqlQuestions.filter(q=>q.exam);
  const sq = sqlQs.map((q,k)=>`
    <div class="prompt-box" data-id="${q.id}" style="margin-bottom:14px">
      <div class="q-title">שאלה ${16+k} · 5 נק'</div>
      <div style="margin-bottom:10px">${esc(q.prompt)}</div>
      <textarea class="ex-sql" data-id="${q.id}" style="width:100%;min-height:110px;background:var(--code-bg);color:#cfe3ff;border:1px solid var(--line);border-radius:10px;padding:12px;font-family:Consolas,monospace;direction:ltr;text-align:left" placeholder="כתוב כאן את השאילתה..."></textarea>
    </div>`).join('');
  $('#examBody').innerHTML =
    `<h3 style="border-inline-start:4px solid var(--accent);padding-inline-start:12px">חלק א׳ — שאלות אמריקאיות (75 נק')</h3>${mc}
     <h3 style="border-inline-start:4px solid var(--accent2);padding-inline-start:12px;margin-top:20px">חלק ב׳ — שאילתות SQL (25 נק')</h3>${sq}`;
  let sel = {};
  $$('#examBody .ex-opt').forEach(b => b.onclick = () => {
    if(!examActive) return;
    const i=+b.dataset.i, j=+b.dataset.j;
    sel[i]=j;
    $$(`#examBody .ex-opt[data-i="${i}"]`).forEach(o=>o.classList.remove('selected'));
    b.classList.add('selected');
  });
  $('#examBody').dataset.ready = '1';
  examSelections = sel;
}
let examSelections = {};
function finishExam(){
  if(!examActive) return;
  examActive = false; clearInterval(examTimer);
  // ציון אמריקאי
  let mcCorrect = 0;
  C.quiz.forEach((q,i)=>{
    const opts = $$(`#examBody .ex-opt[data-i="${i}"]`);
    const chosen = examSelections[i];
    opts.forEach((o,k)=>{
      if(k===q.correct) o.classList.add('correct');
      else if(k===chosen) o.classList.add('wrong');
      o.style.cursor='default'; o.onclick=null;
    });
    if(chosen === q.correct) mcCorrect++;
  });
  // ציון SQL
  const sqlQs = C.sqlQuestions.filter(q=>q.exam);
  let sqlCorrect = 0; let sqlDetail = [];
  sqlQs.forEach(q=>{
    const ta = $(`#examBody .ex-sql[data-id="${q.id}"]`);
    const res = gradeSql(q, ta ? ta.value : '');
    if(res.ok){ sqlCorrect++; ta.style.borderColor='var(--good)'; }
    else ta.style.borderColor='var(--bad)';
    sqlDetail.push(`<li>שאלה ${q.id}: ${res.ok?'✓ נכון (5/5)':'✗ '+ (res.msg||'שגוי') }</li>`);
  });
  const mcPts = mcCorrect*5, sqlPts = sqlCorrect*5, total = mcPts + sqlPts;
  const pass = total >= 60;
  const mm = String(Math.floor(examSeconds/60)).padStart(2,'0'), ss=String(examSeconds%60).padStart(2,'0');
  $('#examResult').innerHTML = `
    <div class="result-banner ${pass?'pass':'fail'}">
      ${pass?'🎉 עברת!':'💪 עוד קצת תרגול'} &nbsp; ציון סופי: ${total}/100
    </div>
    <div class="card">
      <p>📝 אמריקאי: <b>${mcCorrect}/${C.quiz.length}</b> = ${mcPts} נק'</p>
      <p>💻 SQL: <b>${sqlCorrect}/${sqlQs.length}</b> = ${sqlPts} נק'</p>
      <p>⏱ זמן: ${mm}:${ss}</p>
      <ul style="color:var(--muted);font-size:14px">${sqlDetail.join('')}</ul>
      <p style="color:var(--muted);font-size:13px">גלול למעלה לראות את התשובות הנכונות מסומנות בכל שאלה אמריקאית.</p>
    </div>`;
  $('#examResult').scrollIntoView({behavior:'smooth'});
  $('#examFinishBtn').classList.add('hidden');
  $('#examRestartBtn').classList.remove('hidden');
}
function setupExam(){
  $('#examStartBtn').onclick = () => { ensureSql(); startExam(); $('#examFinishBtn').classList.remove('hidden'); $('#examRestartBtn').classList.add('hidden'); };
  $('#examFinishBtn').onclick = finishExam;
  $('#examRestartBtn').onclick = () => { $('#examRun').classList.add('hidden'); $('#examIntro').classList.remove('hidden'); };
}

/* ---------------- אתחול ---------------- */
function init(){
  $$('nav.tabs button').forEach(b => b.onclick = () => showView(b.dataset.view));
  renderHome();
  renderTopicNav();
  selectTopic(C.topics[0].id);
  renderFlashcards();
  setupFlashcards();
  renderQuiz();
  $('#quizRestart').onclick = renderQuiz;
  renderSqlSide();
  setupSql();
  setupExam();
  showView('home');
}
document.addEventListener('DOMContentLoaded', init);
