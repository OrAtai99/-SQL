/* ============================================================
   פורטל סטטיסטיקה (6592) — לוגיקה
   ============================================================ */
const S = window.STAT;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LETTERS = ['א','ב','ג','ד','ה','ו'];
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]];} return a; }

/* ---------- ערכת נושא (משותף עם שאר הפורטל) ---------- */
const TKEY='bdportal_theme';
function applyTheme(t){ document.documentElement.dataset.theme=t; try{localStorage.setItem(TKEY,t);}catch(e){}
  const b=$('#themeBtn'); if(b) b.textContent = t==='dark'?'☀️':'🌙'; }

/* ---------- מעקב התקדמות ---------- */
const PKEY='statportal_v1';
let PROG=(()=>{ try{return JSON.parse(localStorage.getItem(PKEY))||{};}catch(e){return {};} })();
PROG.chaptersRead=PROG.chaptersRead||{};
PROG.quiz=PROG.quiz||{};
PROG.fcKnown=PROG.fcKnown||{};
PROG.examBest=PROG.examBest||0;
function saveProg(){ try{localStorage.setItem(PKEY,JSON.stringify(PROG));}catch(e){} }
function readiness(){
  const c=Object.keys(PROG.chaptersRead).length/S.chapters.length;
  const qCorrect=Object.values(PROG.quiz).filter(v=>v===1).length;
  const q=qCorrect/S.quiz.length;
  const e=PROG.examBest/100;
  return { pct:Math.round((c*0.3+q*0.4+e*0.3)*100), chapters:Object.keys(PROG.chaptersRead).length, quizCorrect:qCorrect, examBest:PROG.examBest };
}

/* ---------- ניווט ---------- */
function showView(id){
  $$('.view').forEach(v=>v.classList.toggle('active', v.id==='view-'+id));
  $$('nav.tabs button').forEach(b=>b.classList.toggle('active', b.dataset.view===id));
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='home') renderHome();
}

/* ---------- דף הבית ---------- */
function renderHome(){
  const r=readiness();
  $('#readyPct').textContent=r.pct+'%';
  $('#readyBar').style.width=r.pct+'%';
  $('#statChapters').textContent=`${r.chapters}/${S.chapters.length}`;
  $('#statQuiz').textContent=`${r.quizCorrect}/${S.quiz.length}`;
  $('#statExam').textContent=r.examBest;
  $('#chapterCards').innerHTML=S.chapters.map(c=>`
    <div class="card home-card" data-ch="${c.id}">
      <div class="ic">${c.icon}</div>
      <div><h3>${esc(c.title)}</h3><p style="margin:0;color:var(--muted);font-size:14px">${esc(c.summary)}</p></div>
    </div>`).join('');
  $$('#chapterCards .home-card').forEach(el=>el.onclick=()=>{ showView('chapters'); selectChapter(el.dataset.ch); });
  $('#tipsList').innerHTML=S.examTips.map(t=>`<li>${t}</li>`).join('');
}

/* ---------- פרקים ---------- */
function renderChapterNav(){
  $('#chapterNav').innerHTML=S.chapters.map(c=>`<button data-ch="${c.id}">${c.icon} ${c.title}</button>`).join('');
  $$('#chapterNav button').forEach(b=>b.onclick=()=>selectChapter(b.dataset.ch));
}
function selectChapter(id,markRead=true){
  const c=S.chapters.find(x=>x.id===id)||S.chapters[0];
  if(markRead){ PROG.chaptersRead[c.id]=true; saveProg(); }
  $$('#chapterNav button').forEach(b=>b.classList.toggle('active', b.dataset.ch===c.id));
  $('#chapterBody').innerHTML=`<h2 class="view-title">${c.icon} ${c.title}</h2>`+
    c.sections.map(s=>`<section><h3>${s.heading}</h3>${s.html}</section>`).join('');
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ---------- דף נוסחאות (מרוכז) ---------- */
function renderFormulas(){
  // אוסף את כל תיבות הנוסחאות מכל הפרקים למקום אחד
  const wrap=document.createElement('div');
  $('#formulasBody').innerHTML=S.chapters.map(c=>{
    const tmp=document.createElement('div');
    tmp.innerHTML=c.sections.map(s=>s.html).join('');
    const cards=[...tmp.querySelectorAll('.formula-card')].map(el=>el.outerHTML).join('');
    return cards ? `<div class="card"><h3>${c.icon} ${esc(c.title)}</h3>${cards}</div>` : '';
  }).join('');
}

/* ---------- דוגמאות פתורות ---------- */
function renderExamples(){
  $('#examplesBody').innerHTML=S.workedExamples.map(ex=>`
    <div class="card wex">
      <h3>${ex.icon} ${esc(ex.title)}</h3>
      <ol class="stat-steps">
        ${ex.steps.map(s=>`<li><div class="wex-h">${esc(s.h)}</div><div>${s.html}</div></li>`).join('')}
      </ol>
    </div>`).join('');
}

/* ---------- כרטיסיות ---------- */
let fcIndex=0, fcOrder=[], fcMode='all';
function buildFcOrder(){
  const all=S.flashcards.map((_,i)=>i);
  fcOrder=fcMode==='unknown'?all.filter(i=>!PROG.fcKnown[i]):all;
  if(!fcOrder.length){ fcOrder=all; fcMode='all'; $('#fcMode').classList.remove('active'); }
  fcIndex=0;
}
function renderFlashcards(){ buildFcOrder(); drawCard(); }
function drawCard(){
  const idx=fcOrder[fcIndex], card=S.flashcards[idx];
  $('#fcInner').classList.remove('flipped');
  $('#fcFrontTxt').innerHTML=card.front;
  $('#fcBackTxt').innerHTML=card.back;
  const known=Object.keys(PROG.fcKnown).length;
  $('#fcCounter').innerHTML=`${fcIndex+1} / ${fcOrder.length} <small class="fc-known">· ידועים ${known}/${S.flashcards.length}</small>`;
  $('#fcKnownBadge').style.display=PROG.fcKnown[idx]?'inline-block':'none';
}
function fcNext(){ fcIndex=(fcIndex+1)%fcOrder.length; drawCard(); }
function setupFlashcards(){
  $('#fcInner').onclick=()=>$('#fcInner').classList.toggle('flipped');
  $('#fcNext').onclick=fcNext;
  $('#fcPrev').onclick=()=>{ fcIndex=(fcIndex-1+fcOrder.length)%fcOrder.length; drawCard(); };
  $('#fcShuffle').onclick=()=>{ fcOrder=shuffle(fcOrder); fcIndex=0; drawCard(); };
  $('#fcKnow').onclick=()=>{ const idx=fcOrder[fcIndex]; PROG.fcKnown[idx]=true; saveProg();
    if(fcMode==='unknown'){ fcOrder.splice(fcIndex,1); if(!fcOrder.length) buildFcOrder(); if(fcIndex>=fcOrder.length) fcIndex=0; drawCard(); } else fcNext(); };
  $('#fcDontKnow').onclick=()=>{ const idx=fcOrder[fcIndex]; delete PROG.fcKnown[idx]; saveProg();
    fcOrder.splice(fcIndex,1); fcOrder.splice(Math.min(fcIndex+3,fcOrder.length),0,idx); drawCard(); };
  $('#fcMode').onclick=()=>{ fcMode=fcMode==='all'?'unknown':'all'; $('#fcMode').classList.toggle('active',fcMode==='unknown'); buildFcOrder(); drawCard(); };
}

/* ---------- בוחן (סינון נושא + ערבוב תשובות) ---------- */
let quizFilter='all', answeredNow={}, quizPerm={};
function chapterName(id){ const c=S.chapters.find(x=>x.id===id); return c?c.title.replace(/^\d+\.\s*/,''):id; }
function renderQuizFilters(){
  const topics=[...new Set(S.quiz.map(q=>q.topic))];
  const btns=[`<button data-f="all" class="active">הכל (${S.quiz.length})</button>`,`<button data-f="mistakes">❌ הטעויות שלי</button>`]
    .concat(topics.map(t=>`<button data-f="${t}">${chapterName(t)}</button>`));
  $('#quizFilters').innerHTML=btns.join('');
  $$('#quizFilters button').forEach(b=>b.onclick=()=>{ quizFilter=b.dataset.f;
    $$('#quizFilters button').forEach(x=>x.classList.toggle('active',x===b)); renderQuiz(); });
}
function currentSet(){
  return S.quiz.map((q,gi)=>({q,gi})).filter(o=>
    quizFilter==='all'?true : quizFilter==='mistakes'?PROG.quiz[o.gi]===0 : o.q.topic===quizFilter);
}
function renderQuiz(){
  const set=currentSet();
  if(!set.length){
    $('#quizBody').innerHTML=`<div class="card" style="text-align:center;color:var(--muted)">${quizFilter==='mistakes'?'🎉 אין טעויות שמורות!':'אין שאלות בסינון זה.'}</div>`;
    $('#quizResult').innerHTML=''; $('#quizScore').textContent=''; return;
  }
  $('#quizBody').innerHTML=set.map((o,i)=>{
    const q=o.q, gi=o.gi;
    const perm=shuffle([...q.options.keys()]); quizPerm[gi]=perm;
    return `<div class="quiz-q" data-gi="${gi}">
      <div class="qnum">שאלה ${i+1} <span class="qtopic">${chapterName(q.topic)}</span></div>
      <div class="qtext">${esc(q.q)}</div>
      ${perm.map((orig,disp)=>`<button class="opt" data-gi="${gi}" data-j="${orig}"><span class="mark">${LETTERS[disp]}</span> ${esc(q.options[orig])}</button>`).join('')}
      <div class="explain" id="exp-${gi}"></div>
    </div>`;
  }).join('');
  $$('#quizBody .opt').forEach(b=>b.onclick=()=>pick(+b.dataset.gi,+b.dataset.j));
  set.forEach(o=>{ if(answeredNow[o.gi]!==undefined) paint(o.gi,answeredNow[o.gi]); });
  $('#quizResult').innerHTML=''; updateScore();
}
function paint(gi,chosen){
  const q=S.quiz[gi];
  $$(`.opt[data-gi="${gi}"]`).forEach(o=>{ const orig=+o.dataset.j;
    if(orig===q.correct) o.classList.add('correct'); else if(orig===chosen) o.classList.add('wrong'); o.style.cursor='default'; });
  const ok=chosen===q.correct;
  const disp=(quizPerm[gi]||[...q.options.keys()]).indexOf(q.correct);
  const exp=$('#exp-'+gi);
  if(exp){ exp.innerHTML=`<b>${ok?'✓ נכון!':'✗ לא נכון.'}</b> התשובה הנכונה: ${LETTERS[disp]}. ${esc(q.explain)}`; exp.classList.add('show'); }
}
function pick(gi,chosen){
  if(answeredNow[gi]!==undefined) return;
  answeredNow[gi]=chosen;
  const ok=chosen===S.quiz[gi].correct;
  PROG.quiz[gi]=ok?1:0; saveProg();
  paint(gi,chosen); updateScore();
}
function updateScore(){
  const set=currentSet();
  const answered=set.filter(o=>answeredNow[o.gi]!==undefined).length;
  const correct=set.filter(o=>answeredNow[o.gi]===S.quiz[o.gi].correct).length;
  $('#quizScore').textContent=`נענו ${answered}/${set.length} · נכונות ${correct}`;
  if(answered===set.length&&set.length){
    const pct=Math.round(correct/set.length*100);
    $('#quizResult').innerHTML=`<div class="result-banner ${pct>=60?'pass':'fail'}">${pct>=60?'🎉':'💪'} סיימת! ציון: ${pct} (${correct}/${set.length})</div>`;
  }
}

/* ---------- סימולציית מבחן (20 שאלות = 100) ---------- */
let examTimer=null, examSec=0, examActive=false, examSel={}, examSet=[], examPerm=[];
function startExam(){
  examActive=true; examSec=0; examSel={};
  $('#examIntro').classList.add('hidden'); $('#examRun').classList.remove('hidden'); $('#examResult').innerHTML='';
  examSet=shuffle(S.quiz.map((q,gi)=>({q,gi}))).slice(0,20);
  examPerm=[];
  $('#examBody').innerHTML=examSet.map((o,i)=>{
    const q=o.q; const perm=shuffle([...q.options.keys()]); examPerm[i]=perm;
    return `<div class="quiz-q" data-i="${i}">
      <div class="qnum">שאלה ${i+1} · 5 נק' <span class="qtopic">${chapterName(q.topic)}</span></div>
      <div class="qtext">${esc(q.q)}</div>
      ${perm.map((orig,disp)=>`<button class="opt ex-opt" data-i="${i}" data-j="${orig}"><span class="mark">${LETTERS[disp]}</span> ${esc(q.options[orig])}</button>`).join('')}
      <div class="explain" id="exam-exp-${i}"></div>
    </div>`;
  }).join('');
  $$('#examBody .ex-opt').forEach(b=>b.onclick=()=>{ if(!examActive) return;
    const i=+b.dataset.i; examSel[i]=+b.dataset.j;
    $$(`#examBody .ex-opt[data-i="${i}"]`).forEach(o=>o.classList.remove('selected')); b.classList.add('selected'); });
  clearInterval(examTimer);
  examTimer=setInterval(()=>{ examSec++;
    $('#examTimer').textContent=`${String(Math.floor(examSec/60)).padStart(2,'0')}:${String(examSec%60).padStart(2,'0')}`; },1000);
  window.scrollTo({top:0,behavior:'smooth'});
}
function finishExam(){
  if(!examActive) return;
  const unanswered=examSet.length-Object.keys(examSel).length;
  if(unanswered>0 && !confirm(`יש ${unanswered} שאלות ללא מענה. לסיים בכל זאת?`)) return;
  examActive=false; clearInterval(examTimer);
  let correct=0;
  examSet.forEach((o,i)=>{
    const q=o.q, chosen=examSel[i];
    $$(`#examBody .ex-opt[data-i="${i}"]`).forEach(el=>{ const orig=+el.dataset.j;
      if(orig===q.correct) el.classList.add('correct'); else if(orig===chosen) el.classList.add('wrong'); el.style.cursor='default'; el.onclick=null; });
    if(chosen===q.correct) correct++;
    const disp=examPerm[i].indexOf(q.correct);
    const exp=$('#exam-exp-'+i);
    exp.innerHTML=`<b>${chosen===q.correct?'✓ נכון.':'✗ '+(chosen===undefined?'לא נענתה.':'לא נכון.')}</b> התשובה: ${LETTERS[disp]}. ${esc(q.explain)}`;
    exp.classList.add('show');
  });
  const total=correct*5, pass=total>=60;
  PROG.examBest=Math.max(PROG.examBest,total); saveProg();
  const mm=String(Math.floor(examSec/60)).padStart(2,'0'), ss=String(examSec%60).padStart(2,'0');
  $('#examResult').innerHTML=`
    <div class="result-banner ${pass?'pass':'fail'}">${pass?'🎉 עברת!':'💪 עוד קצת תרגול'} &nbsp; ציון סופי: ${total}/100</div>
    <div class="card">
      <p>📝 נכונות: <b>${correct}/${examSet.length}</b> = ${total} נק'</p>
      <p>⏱ זמן: ${mm}:${ss}</p>
      <p style="color:var(--muted);font-size:13px">גלול למטה — מתחת לכל שאלה מופיע ההסבר והתשובה הנכונה.</p>
    </div>`;
  $('#examResult').scrollIntoView({behavior:'smooth'});
  $('#examFinishBtn').classList.add('hidden'); $('#examRestartBtn').classList.remove('hidden');
}
function setupExam(){
  $('#examStartBtn').onclick=()=>{ startExam(); $('#examFinishBtn').classList.remove('hidden'); $('#examRestartBtn').classList.add('hidden'); };
  $('#examFinishBtn').onclick=finishExam;
  $('#examRestartBtn').onclick=()=>{ $('#examRun').classList.add('hidden'); $('#examIntro').classList.remove('hidden'); };
}

/* ---------- אתחול ---------- */
function init(){
  applyTheme((()=>{ try{return localStorage.getItem(TKEY)||'light';}catch(e){return 'light';} })());
  $('#themeBtn').onclick=()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
  $$('nav.tabs button').forEach(b=>b.onclick=()=>showView(b.dataset.view));
  renderHome();
  renderChapterNav(); selectChapter(S.chapters[0].id,false);
  renderFormulas();
  renderExamples();
  renderFlashcards(); setupFlashcards();
  renderQuizFilters(); renderQuiz();
  $('#quizRestart').onclick=()=>{ answeredNow={}; renderQuiz(); };
  setupExam();
  $('#resetProg').onclick=()=>{ if(confirm('לאפס את כל ההתקדמות בקורס זה?')){ PROG={chaptersRead:{},quiz:{},fcKnown:{},examBest:0}; saveProg(); location.reload(); } };
  showView('home');
  saveProg();
}
document.addEventListener('DOMContentLoaded', init);
