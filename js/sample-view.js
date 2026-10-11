/* ============================================================
   פורטל 3964 — ⭐ המבחן לדוגמה
   השאלון בתמצית · שאלה 1 (ERD אינטראקטיבי) · שאלה 2 (מילון נתונים) ·
   שאלה 3 (10 השאילתות עם בדיקה) · 40 שאלות דומות · 4 מבחנים מקבילים ·
   מבחן מדומה מלא במשקלות 45/10/45
   תלוי ב: sql-app.js (window.SQLAPP), sample-exam.js, sample-stories.js, sample-variants.js
   ============================================================ */
(function(){
'use strict';
const S = window.SQLC;
const A = () => window.SQLAPP;
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const eb = s => A().ebidi(s);
const LTR = s => '‎' + s + '‎';          // "1:N" מוצג נכון גם בתוך טקסט עברי
const TYPES = ['PK','FK','PK+FK','מפתח חלופי','רגילה','מורכבת','נגזרת','רב-ערכית'];
const DTYPES = ['INT','DECIMAL','VARCHAR','NVARCHAR','CHAR','DATE','DATETIME','BIT'];
const CARDS = ['1:1','1:N','N:1','M:N'];
const LET = ['א','ב','ג','ד'];
const li = s => `<li>${eb(s)}</li>`;
const toTabs = () => { const t = $('#smTabs'), h = ($('header.top') || {}).offsetHeight || 80; if(t) window.scrollTo(0, Math.max(0, t.getBoundingClientRect().top + window.scrollY - h - 10)); };
const firstComment = s => ((String(s).match(/^--\s*(.*)$/m) || [])[1] || '').trim();

/* ---------------- מקורות: המבחן לדוגמה + 4 המבחנים המקבילים ---------------- */
let SOURCES = null;
function sources(){
  if(SOURCES) return SOURCES;
  const X = S.sample || {};
  const sample = {
    id:'sample', icon:'⭐', title:'המבחן לדוגמה — מערכת המכללה', short:'המבחן לדוגמה',
    storyText: (X.story && X.story.story) || '', st: X.story,
    queries: (S.examQueries || []).map(q => Object.assign({ n:q.n, prompt:q.prompt, solution:q.solution }, (X.q3 || {})[q.n] || {})),
    schema:'college'
  };
  const icons = { hospitals:'🏥', travel:'✈️', centers:'🏘️', libraries:'📚' };
  const stories = (S.sampleStories || []).map(st => {
    const key = 'story:' + st.id;
    S.schemas[key] = st.schemaSql; S.tables[key] = st.tables;
    (S.schemaInfo = S.schemaInfo || {})[key] = { title: st.title };
    return { id: st.id, icon: icons[st.id] || '📄', title: st.title, short: st.title, storyText: st.story, st, queries: st.queries, schema: key };
  });
  SOURCES = { sample, stories, all: [sample, ...stories] };
  return SOURCES;
}

/* ---------------- ציור ה-ERD של המבחן לדוגמה ---------------- */
const ERD_SVG = (() => {
  const ink = 'fill:var(--ink)', mut = 'fill:var(--muted)';
  const ent = (cx, cy, he, en) => `<g><rect x="${cx-80}" y="${cy-26}" width="160" height="52" rx="8" style="fill:var(--card);stroke:var(--muted);stroke-width:1.25"/>
    <text x="${cx}" y="${cy-2}" text-anchor="middle" font-weight="700" style="${ink}">${he}</text>
    <text x="${cx}" y="${cy+15}" text-anchor="middle" font-size="11.5" style="${mut}">${en}</text></g>`;
  const dia = (cx, cy, hw, hh, mn, l1, l2) => `<g><polygon points="${cx-hw},${cy} ${cx},${cy-hh} ${cx+hw},${cy} ${cx},${cy+hh}"
      style="fill:${mn ? 'rgba(79,140,255,.14)' : 'var(--card)'};stroke:${mn ? 'var(--accent)' : 'var(--muted)'};stroke-width:${mn ? 2 : 1.25}"/>
    ${l2 ? `<text x="${cx}" y="${cy-3}" text-anchor="middle" font-size="12" font-weight="700" style="${ink}">${l1}</text><text x="${cx}" y="${cy+13}" text-anchor="middle" font-size="10.5" style="${ink}">${l2}</text>`
         : `<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="12" style="${ink}">${l1}</text>`}</g>`;
  const c = (x, y, t, end) => `<text x="${x}" y="${y}" ${end ? 'text-anchor="end"' : ''} font-weight="700" style="${ink}">${t}</text>`;
  return `<svg class="erd-svg" viewBox="0 50 760 600" role="img" aria-label="ERD של המבחן לדוגמה: 5 ישויות ו-7 קשרים" font-size="13">
    <g style="fill:none;stroke:var(--muted);stroke-width:1.25">
      <path d="M380 110V136"/><path d="M380 192V218"/><path d="M300 244H110V285"/><path d="M110 337V378"/>
      <path d="M460 244H650V285"/><path d="M650 337V378"/><path d="M440 270V350H464"/><path d="M576 350H600V378"/>
      <path d="M380 270V394"/><path d="M380 446V574"/><path d="M110 430V502H177"/><path d="M313 502H340V574"/>
      <path d="M650 430V502H583"/><path d="M447 502H420V574"/><path d="M245 532V556"/></g>
    ${ent(380, 84, 'שלוחה', 'Branches')}${ent(380, 244, 'מחלקה', 'Departments')}${ent(110, 404, 'סטודנט', 'Students')}
    ${ent(650, 404, 'מרצה', 'Lecturers')}${ent(380, 600, 'קורס', 'Courses')}
    ${dia(380, 164, 56, 28, false, 'פועלת בה')}${dia(110, 311, 56, 26, false, 'מנהלת')}${dia(650, 311, 56, 26, false, 'מעסיקה')}
    ${dia(520, 350, 56, 26, false, 'ראש מחלקה')}${dia(380, 420, 56, 26, false, 'אחראית על')}
    ${dia(245, 502, 68, 30, true, 'נרשם', 'Enrollments')}${dia(515, 502, 68, 30, true, 'מלמד', 'Teaching')}
    <ellipse cx="245" cy="572" rx="46" ry="16" style="fill:var(--card);stroke:var(--muted);stroke-width:1.25"/>
    <text x="245" y="576" text-anchor="middle" font-size="11.5" style="${ink}">FinalGrade</text>
    ${c(392,128,'1')}${c(392,212,'N')}${c(288,236,'1',1)}${c(122,370,'N')}${c(472,236,'1')}${c(662,370,'N')}
    ${c(452,292,'1')}${c(588,372,'1',1)}${c(392,292,'1')}${c(392,566,'N')}${c(122,470,'M')}${c(328,566,'N',1)}${c(662,470,'M')}${c(432,566,'N')}
  </svg>`;
})();

/* ============================================================
   רכיב 1 — שאלה 1: ERD
   ============================================================ */
function erdComp(box, src, exam){
  const st = src.st, P = A().prog();
  box.innerHTML = `
    ${exam ? '' : `<div class="card sm-howto"><b>איך עובדים:</b> קוראים את הסיפור (למעלה), עונים על שלושת השלבים ולוחצים "בדוק". בסוף — "תשובה מלאה" עם הציור, טבלת הישויות, המחוון והטעויות הנפוצות.</div>`}
    <div class="card sm-step"><h4>שלב 1 · אילו מילים מהסיפור הופכות לטבלה?</h4>
      <p class="muted-sm">סמנו ✓ ליד כל מילה שהיא <b>ישות</b> (כולל ישות מקשרת / טבלת גישור). מה שהוא תכונה, דוגמה או מסיח — השאירו ריק.</p>
      <div class="cand-grid">${st.candidates.map((c,i) => `<label class="cand" data-i="${i}"><input type="checkbox" data-i="${i}"><span>${eb(c.word)}</span></label>`).join('')}</div>
      <ul class="cand-why sm-list hidden"></ul></div>
    <div class="card sm-step"><h4>שלב 2 · הקרדינליות של כל קשר</h4>
      <p class="muted-sm">הקרדינליות נכתבת <b>א:ב</b>. למשל <b dir="ltr">1:N</b> = מופע אחד של ישות א קשור להרבה מופעים של ישות ב.</p>
      <div class="tbl-scroll"><table class="mini rel-table"><thead><tr><th>ישות א</th><th>הקשר</th><th>ישות ב</th><th>א:ב</th></tr></thead><tbody>
      ${st.relationships.map((r,i) => `<tr data-i="${i}"><td dir="ltr"><b>${esc(r.a)}</b></td><td>${eb(r.verb)}</td><td dir="ltr"><b>${esc(r.b)}</b></td>
        <td><select data-i="${i}" dir="ltr"><option value="">—</option>${CARDS.map(c => `<option value="${c}">${LTR(c)}</option>`).join('')}</select><div class="rel-why hidden"></div></td></tr>`).join('')}
      </tbody></table></div></div>
    <div class="card sm-step"><h4>שלב 3 · מלכודות (${st.traps.length})</h4>
      ${st.traps.map((t,i) => `<div class="quiz-q trap" data-i="${i}"><div class="qtext">${eb(t.q)}</div>
        ${t.options.map((o,j) => `<button class="opt" data-i="${i}" data-j="${j}"><span class="mark">${LET[j]}</span> ${eb(o)}</button>`).join('')}
        <div class="explain"></div></div>`).join('')}</div>
    ${exam ? '' : `<div class="sql-actions"><button class="btn ok-btn" data-act="check">✓ בדוק את שאלה 1</button><button class="btn ghost small" data-act="model">👁 תשובה מלאה + מחוון</button></div>
      <div class="feedback"></div>`}
    <div class="sm-model hidden"></div>`;
  const traps = {};
  const paintTrap = i => {
    const t = st.traps[i], q = $(`.trap[data-i="${i}"]`, box), ch = traps[i];
    $$('.opt', q).forEach(o => { const j = +o.dataset.j; o.disabled = true; o.classList.toggle('correct', j === t.correct); o.classList.toggle('wrong', j === ch && ch !== t.correct); o.classList.remove('selected'); });
    const ex = $('.explain', q); ex.innerHTML = `<b>${ch === t.correct ? '✓ נכון.' : ch === undefined ? '✗ לא נענתה.' : '✗ לא נכון.'}</b> התשובה: ${LET[t.correct]}. ${eb(t.explain)}`; ex.classList.add('show');
  };
  $$('.trap .opt', box).forEach(b => b.onclick = () => {
    const i = +b.dataset.i; if(b.disabled) return;
    traps[i] = +b.dataset.j;
    if(exam) $$(`.trap[data-i="${i}"] .opt`, box).forEach(o => o.classList.toggle('selected', o === b));
    else paintTrap(i);
  });
  const grade = () => {
    let ok = 0, max = 0;
    st.candidates.forEach((c,i) => { max++; if($(`.cand input[data-i="${i}"]`, box).checked === !!c.entity) ok++; });
    st.relationships.forEach((r,i) => { max += 2; if($(`.rel-table select[data-i="${i}"]`, box).value === r.card) ok += 2; });
    st.traps.forEach((t,i) => { max += 2; if(traps[i] === t.correct) ok += 2; });
    return { ok, max };
  };
  const reveal = () => {
    st.candidates.forEach((c,i) => { const lab = $(`.cand[data-i="${i}"]`, box), on = $('input', lab).checked;
      lab.classList.toggle('good', on === !!c.entity); lab.classList.toggle('bad', on !== !!c.entity); $('input', lab).disabled = true; });
    const why = $('.cand-why', box);
    why.innerHTML = st.candidates.map(c => `<li><b>${eb(c.word)}</b> — ${c.entity ? '✅ ישות' : '⛔ לא ישות'}. ${eb(c.why || '')}</li>`).join(''); why.classList.remove('hidden');
    st.relationships.forEach((r,i) => { const sel = $(`.rel-table select[data-i="${i}"]`, box), good = sel.value === r.card;
      sel.classList.toggle('good', good); sel.classList.toggle('bad', !good); sel.disabled = true;
      const w = sel.parentElement.querySelector('.rel-why'); w.innerHTML = `${good ? '✓' : '✗ הנכון:'} <b dir="ltr">${esc(r.card)}</b> — ${eb(r.why || '')}`; w.classList.remove('hidden'); });
    st.traps.forEach((t,i) => paintTrap(i));
    showModel();
  };
  const showModel = () => { const m = $('.sm-model', box); m.innerHTML = erdModel(src); m.classList.remove('hidden'); };
  if(!exam){
    $('[data-act="check"]', box).onclick = () => {
      const g = grade(), pct = Math.round(g.ok / g.max * 100); reveal();
      A().fb($('.feedback', box), pct >= 80 ? 'ok' : pct >= 55 ? 'info' : 'err', `ציון שאלה 1: ${pct}% (${g.ok}/${g.max} נק׳ בבדיקה האוטומטית) — גללו למטה לתשובה המלאה. במבחן האמיתי מציירים את ה-ERD במחברת; הבודק מחפש את מה שמופיע ב"מחוון".`);
      P.sample['erd:' + src.id] = Math.max(P.sample['erd:' + src.id] || 0, pct); A().save();
    };
    $('[data-act="model"]', box).onclick = () => { const m = $('.sm-model', box); if(m.classList.contains('hidden')) showModel(); else m.classList.add('hidden'); };
  }
  return { grade, reveal };
}
function erdModel(src){
  const st = src.st;
  return `<div class="card"><h4>✅ התשובה המלאה — ${esc(src.short)}</h4>
    ${src.id === 'sample' ? `<div class="erd-wrap">${ERD_SVG}</div><p class="muted-sm">מלבן = ישות · מעוין = קשר · אליפסה = תכונה של קשר · המעוינים המודגשים (רבים-לרבים) הופכים לטבלאות גישור.</p>` : ''}
    <div class="tbl-scroll"><table class="mini"><thead><tr><th>ישות</th><th>בעברית</th><th>מפתח ראשי</th><th>תכונות</th><th>מפתחות זרים</th></tr></thead><tbody>
    ${st.entities.map(e => `<tr><td dir="ltr"><b>${esc(e.name)}</b></td><td>${esc(e.he || '')}</td>
      <td dir="ltr">${e.attrs.filter(a => a.pk).map(a => esc(a.name)).join(' + ')}</td>
      <td>${e.attrs.filter(a => !a.pk && !a.fk).map(a => `<span dir="ltr">${esc(a.name)}</span>${a.note ? ` <span class="muted-sm">(${eb(a.note)})</span>` : ''}`).join('، ') || '—'}</td>
      <td>${e.attrs.filter(a => a.fk).map(a => `<span dir="ltr">${esc(a.name)} → ${esc(a.fk)}</span>${a.note ? ` <span class="muted-sm">(${eb(a.note)})</span>` : ''}`).join('<br>') || '—'}</td></tr>`).join('')}
    </tbody></table></div>
    <h4>הקשרים</h4>
    <div class="tbl-scroll"><table class="mini"><thead><tr><th>קשר</th><th>א:ב</th><th>למה (מהסיפור)</th></tr></thead><tbody>
    ${st.relationships.map(r => `<tr><td><span dir="ltr">${esc(r.a)}</span> — ${eb(r.verb)} — <span dir="ltr">${esc(r.b)}</span></td><td><b dir="ltr">${esc(r.card)}</b></td><td>${eb(r.why || '')}</td></tr>`).join('')}
    </tbody></table></div>
    <h4>📏 מה הבודק מחפש</h4><ul class="sm-list">${(st.rubric || []).map(li).join('')}</ul>
    <h4>⚠ טעויות נפוצות</h4><ul class="sm-list">${(st.mistakes || []).map(li).join('')}</ul></div>`;
}

/* ============================================================
   רכיב 2 — שאלה 2: מילון נתונים
   ============================================================ */
function dictComp(box, src, exam){
  const d = src.st.dictionary, P = A().prog();
  box.innerHTML = `<div class="card"><h4>מילון נתונים לישות <span dir="ltr">${esc(d.entity)}</span></h4>
    <p class="muted-sm">לכל תכונה בחרו <b>סוג</b> (Type) ו<b>טיפוס נתונים</b> (Data Type). במבחן כותבים גם תיאור, טווח ערכים וברירת מחדל — הם מופיעים בתשובה אחרי הבדיקה.</p>
    <div class="tbl-scroll"><table class="mini dict-play"><thead><tr><th>תכונה</th><th>סוג</th><th>טיפוס נתונים</th><th>תיאור · טווח ערכים · ברירת מחדל</th></tr></thead><tbody>
    ${d.rows.map((r,i) => `<tr data-i="${i}"><td dir="ltr"><b>${esc(r.attr)}</b></td>
      <td><select data-k="type" data-i="${i}"><option value="">—</option>${TYPES.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('')}</select></td>
      <td><select data-k="dt" data-i="${i}" dir="ltr"><option value="">—</option>${DTYPES.map(t => `<option>${t}</option>`).join('')}</select></td>
      <td class="dict-ans"><span class="muted-sm">יוצג אחרי הבדיקה</span></td></tr>`).join('')}
    </tbody></table></div>
    ${exam ? '' : `<div class="sql-actions"><button class="btn ok-btn" data-act="check">✓ בדוק את שאלה 2</button></div><div class="feedback"></div>`}</div>`;
  const grade = () => {
    let ok = 0, max = 0;
    d.rows.forEach((r,i) => { max += 2;
      if((r.type || []).includes($(`select[data-k="type"][data-i="${i}"]`, box).value)) ok++;
      if((r.dataType || []).includes($(`select[data-k="dt"][data-i="${i}"]`, box).value)) ok++; });
    return { ok, max };
  };
  const reveal = () => d.rows.forEach((r,i) => {
    const t = $(`select[data-k="type"][data-i="${i}"]`, box), dt = $(`select[data-k="dt"][data-i="${i}"]`, box);
    const tOk = (r.type || []).includes(t.value), dOk = (r.dataType || []).includes(dt.value);
    t.classList.toggle('good', tOk); t.classList.toggle('bad', !tOk); dt.classList.toggle('good', dOk); dt.classList.toggle('bad', !dOk); t.disabled = dt.disabled = true;
    $(`tr[data-i="${i}"] .dict-ans`, box).innerHTML = `${tOk ? '' : `<div class="bad-txt">✗ סוג: ${r.type.map(esc).join(' / ')}</div>`}${dOk ? '' : `<div class="bad-txt">✗ טיפוס: <span dir="ltr">${r.dataType.map(esc).join(' / ')}</span></div>`}
      <div>${eb(r.desc)}</div><div><b dir="ltr">${esc(r.model)}</b> · ${eb(r.domain)}</div><div class="muted-sm">ברירת מחדל: ${eb(r.def)}</div>`;
  });
  if(!exam) $('[data-act="check"]', box).onclick = () => {
    const g = grade(), pct = Math.round(g.ok / g.max * 100); reveal();
    A().fb($('.feedback', box), pct >= 80 ? 'ok' : 'info', `ציון שאלה 2: ${pct}% (${g.ok}/${g.max}). שימו לב לתשובות המלאות בעמודה האחרונה — כך כותבים את השורה במבחן.`);
    P.sample['dict:' + src.id] = Math.max(P.sample['dict:' + src.id] || 0, pct); A().save();
  };
  return { grade, reveal };
}

/* ============================================================
   רכיב 3 — שאלה 3: 10 השאילתות
   ============================================================ */
function gradeQuery(key, q, code){
  let g = A().gradeSqlUI(key, { check:'select', solution:q.solution }, code);
  if(!g.ok && !g.isError && q.accept && q.accept.length && String(code || '').trim()){
    for(const acc of q.accept){
      const ga = A().gradeSqlUI(key, { check:'select', solution:acc }, code);
      if(ga.ok){ g = Object.assign({}, ga, { accepted:true, msg:`✓ מתקבל — פרשנות לגיטימית אחרת לניסוח${firstComment(acc) ? ` (${esc(firstComment(acc))})` : ''}. הפתרון הרשמי — ב"פתרון והסבר".` }); break; }
    }
  }
  return g;
}
function querySolution(q){
  return A().solutionBlock(q.solution, q.alt, q.explain, null, q.tsql) +
    (q.mistakes && q.mistakes.length ? `<div class="mini-h">⚠ טעויות נפוצות:</div><ul class="sm-list">${q.mistakes.map(li).join('')}</ul>` : '') +
    (q.wrong && q.wrong.length ? `<div class="mini-h">❌ תשובות שגויות (נכשלות בבדיקה):</div>${q.wrong.map(w => `<pre class="alt-sol-pre bad-pre">${esc(w.sql)}</pre><div class="wrong-why">↳ ${eb(w.why)}</div>`).join('')}` : '') +
    (q.accept && q.accept.length ? `<div class="mini-h">🟡 פרשנויות נוספות שמתקבלות:</div>${q.accept.map(a => `<pre class="alt-sol-pre">${esc(a)}</pre>`).join('')}` : '');
}
function queriesComp(box, src, exam){
  const key = src.schema, P = A().prog(), names = (S.tables[key] || []).map(t => t.name);
  const done = q => P.sample['q:' + src.id + ':' + q.n];
  box.innerHTML = `<div class="card sm-schema"><h4>🗂 הטבלאות</h4>${A().tablePreview(names, key)}</div>` +
    src.queries.map((q,k) => `<div class="prompt-box sq-card" data-k="${k}">
      <div class="q-title">שאילתה ${q.n}${q.pattern ? ` <span class="badge-pill">${esc(q.pattern)}</span>` : ''}${!exam && done(q) ? ' <span class="badge-pill good">✓ נפתרה</span>' : ''}</div>
      <div class="exam-prompt">${eb(q.prompt)}</div>
      ${q.columns && !exam ? `<div class="sq-cols">🎯 עמודות הפלט: ${eb(q.columns)}</div>` : ''}
      <textarea class="code-input sq-input" data-k="${k}" spellcheck="false" placeholder="SELECT …"></textarea>
      <div class="sql-actions"><button class="btn ghost small" data-act="run" data-k="${k}">▶ הרץ</button>
        ${exam ? '' : `<button class="btn small ok-btn" data-act="check" data-k="${k}">✓ בדוק</button><button class="btn ghost small" data-act="expect" data-k="${k}">🎯 תוצאה רצויה</button><button class="btn ghost small" data-act="sol" data-k="${k}">👁 פתרון והסבר</button>`}</div>
      <div class="sq-lint"></div><div class="feedback"></div><div class="sq-notes"></div><div class="result-wrap slim sq-out"></div>
      <div class="sol-wrap sq-sol hidden"></div></div>`).join('');
  const card = k => $(`.sq-card[data-k="${k}"]`, box), ta = k => $('.sq-input', card(k));
  $$('.sq-input', box).forEach(t => A().editorKeys(t, () => run(+t.dataset.k)));
  const run = k => {
    const c = card(k), code = ta(k).value;
    if(!exam) $('.sq-lint', c).innerHTML = A().lintHtml(A().lintSql(code, key));
    const { r, error } = A().runSqlUI(key, code);
    if(error){ A().fb($('.feedback', c), 'err', error); $('.sq-out', c).innerHTML = ''; return; }
    $('.feedback', c).className = 'feedback'; $('.sq-notes', c).innerHTML = A().notesHtml(r.notes);
    $('.sq-out', c).innerHTML = '<h4>התוצאה:</h4>' + A().resultTable(r, 30);
  };
  const showOne = (k, withSol) => {
    const q = src.queries[k], c = card(k), code = ta(k).value, g = gradeQuery(key, q, code);
    A().fb($('.feedback', c), code.trim() ? g.kind : 'info', code.trim() ? g.msg : 'לא נענתה.');
    let html = '';
    if(g.user) html += '<h4>התוצאה שלך:</h4>' + A().resultTable(g.user, 15);
    if(!g.ok && g.expected) html += '<h4 class="expect-h">🎯 התוצאה הרצויה:</h4>' + A().resultTable(g.expected, 15);
    $('.sq-out', c).innerHTML = html;
    if(withSol){ const s = $('.sq-sol', c); s.innerHTML = querySolution(q); s.classList.remove('hidden'); }
    return g;
  };
  $$('[data-act]', box).forEach(b => b.onclick = () => {
    const k = +b.dataset.k, q = src.queries[k], c = card(k);
    if(b.dataset.act === 'run') return run(k);
    if(b.dataset.act === 'check'){
      const lint = A().lintSql(ta(k).value, key); $('.sq-lint', c).innerHTML = A().lintHtml(lint);
      const g = showOne(k, false);
      if(g.ok){ P.sample['q:' + src.id + ':' + q.n] = true; A().save(); const t = $('.q-title', c); if(!/נפתרה/.test(t.textContent)) t.insertAdjacentHTML('beforeend', ' <span class="badge-pill good">✓ נפתרה</span>'); }
    }
    if(b.dataset.act === 'expect'){
      try { const r = A().expectedSql(key, { check:'select', solution:q.solution }); $('.sq-out', c).innerHTML = r ? '<h4 class="expect-h">🎯 התוצאה הרצויה:</h4>' + A().resultTable(r, 30) : '<div class="muted-sm">המנוע עוד נטען…</div>'; }
      catch(e){ A().fb($('.feedback', c), 'err', A().friendlySqlError(e.message, key)); }
    }
    if(b.dataset.act === 'sol'){ const s = $('.sq-sol', c); if(s.classList.contains('hidden')){ s.innerHTML = querySolution(q); s.classList.remove('hidden'); } else s.classList.add('hidden'); }
  });
  const grade = () => { let ok = 0; src.queries.forEach((q,k) => { if(gradeQuery(key, q, ta(k).value).ok) ok++; }); return { ok, max: src.queries.length }; };
  const reveal = () => src.queries.forEach((q,k) => { const g = showOne(k, true); const t = ta(k); t.classList.add(g.ok ? 'ok-border' : 'bad-border'); t.readOnly = true; });
  return { grade, reveal };
}

/* ============================================================
   העמוד
   ============================================================ */
const TABS = [
  ['paper','📄 השאלון'], ['erd','🧩 שאלה 1 · ERD'], ['dict','📋 שאלה 2 · מילון'], ['q3','💾 שאלה 3 · 10 שאילתות'],
  ['variants','🔁 40 שאלות דומות'], ['parallel','📚 4 מבחנים מקבילים'], ['mock','🎯 מבחן מדומה מלא']
];
let tab = 'paper', parId = null, parPart = 'erd', built = false, mock = null;
function show(){
  sources();
  if(!built){ built = true; renderShell(); }
  renderTab();
}
function renderShell(){
  $('#sampleBody').innerHTML = `
    <div class="hero sm-hero"><h2>⭐ המבחן לדוגמה — הבסיס למבחן האמיתי</h2>
      <p>המרצה אמר שהמבחן יתבסס על המבחן לדוגמה. כאן הוא מפורק לשלוש השאלות שלו, עם בדיקה אוטומטית, פתרונות מלאים, 40 שאלות דומות ו-4 מבחנים מקבילים באותו מבנה בדיוק.</p>
      <div class="sm-weights"><div class="w"><b>45</b><span>שאלה 1 · ERD מסיפור</span></div><div class="w"><b>10</b><span>שאלה 2 · מילון נתונים</span></div><div class="w"><b>45</b><span>שאלה 3 · 10 שאילתות SQL</span></div></div></div>
    <div class="chip-row sm-tabs" id="smTabs">${TABS.map(([k,l]) => `<button data-t="${k}">${l}</button>`).join('')}</div>
    <div id="smPane"></div>
    <div class="engine-status" data-engine-status></div>`;
  $$('#smTabs button').forEach(b => b.onclick = () => { tab = b.dataset.t; renderTab(); toTabs(); });
}
function renderTab(){
  $$('#smTabs button').forEach(b => b.classList.toggle('active', b.dataset.t === tab));
  const pane = $('#smPane'), src = sources().sample;
  if(tab === 'paper') pane.innerHTML = paperHtml(), bindGo(pane);
  else if(tab === 'erd'){ pane.innerHTML = storyCard(src) + '<div class="sm-c"></div>'; erdComp($('.sm-c', pane), src, false); }
  else if(tab === 'dict'){ pane.innerHTML = `<div class="card"><p>במבחן: "כתבו את הטבלה הבאה עבור ישות הסטודנט" — עמודות: ישות · תכונה · סוג · תיאור · סוג מידע · טווח ערכים · ערך ברירת מחדל.</p></div><div class="sm-c"></div>`; dictComp($('.sm-c', pane), src, false); }
  else if(tab === 'q3'){ pane.innerHTML = `<div class="card sm-howto">10 השאילתות של שאלה 3 על מערכת המכללה. כתבו ב-T-SQL, הריצו ובדקו — "פתרון והסבר" מראה את הפתרון, דרכים חלופיות, טעויות נפוצות ותשובות שגויות לדוגמה.</div><div class="sm-c"></div>`; queriesComp($('.sm-c', pane), src, false); }
  else if(tab === 'variants') pane.innerHTML = variantsHtml(), bindVariants(pane);
  else if(tab === 'parallel') renderParallel(pane);
  else if(tab === 'mock') renderMockIntro(pane);
}
function bindGo(pane){ $$('[data-go]', pane).forEach(b => b.onclick = () => { tab = b.dataset.go; renderTab(); toTabs(); }); }
function storyCard(src){
  return `<div class="card sm-storycard"><h4>${src.icon} הסיפור${src.id === 'sample' ? ' (בתמצית — ניסוח שלנו)' : ''}</h4><div class="sm-story">${eb(src.storyText)}</div></div>`;
}
function paperHtml(){
  const X = S.sample, M = X.meta, P = A().prog(), src = sources().sample;
  const qDone = src.queries.filter(q => P.sample['q:sample:' + q.n]).length;
  return `<div class="card"><h3>📄 מבנה המבחן</h3>
      <ul class="sm-list"><li>${esc(M.kind)} · ${esc(M.material)}</li><li>${esc(M.structure)} · מחברת ${esc(M.notebook)}</li>${M.rules.map(li).join('')}</ul>
      <div class="sm-progress">ההתקדמות שלך: ERD ${P.sample['erd:sample'] ?? '—'}% · מילון ${P.sample['dict:sample'] ?? '—'}% · שאילתות ${qDone}/${src.queries.length}</div></div>
    <div class="card"><h3>שאלה 1 (45 נק׳) — ERD מסיפור</h3><div class="sm-story">${eb(X.original.q1)}</div>
      <div class="sql-actions"><button class="btn small" data-go="erd">🧩 לתרגול שאלה 1</button></div></div>
    <div class="card"><h3>שאלה 2 (10 נק׳) — מילון נתונים לישות סטודנט</h3>
      <div class="tbl-scroll"><table class="mini"><thead><tr><th>ישות</th><th>תכונה</th><th>סוג</th><th>תיאור</th><th>סוג מידע</th><th>טווח ערכים</th><th>ברירת מחדל</th></tr></thead>
      <tbody><tr><td dir="ltr">Entity</td><td dir="ltr">Attribute</td><td dir="ltr">Type</td><td dir="ltr">Description</td><td dir="ltr">Data Type</td><td dir="ltr">Value Domain</td><td dir="ltr">Default Value</td></tr></tbody></table></div>
      <div class="sql-actions"><button class="btn small" data-go="dict">📋 לתרגול שאלה 2</button></div></div>
    <div class="card"><h3>שאלה 3 (45 נק׳) — 10 שאילתות SQL</h3>
      ${A().tablePreview((S.tables.college || []).map(t => t.name), 'college')}
      <ol class="sm-list">${(S.examQueries || []).map(q => li(q.prompt)).join('')}</ol>
      <div class="sql-actions"><button class="btn small" data-go="q3">💾 לפתרון 10 השאילתות</button></div></div>
    <div class="card"><h3>💡 אסטרטגיה למבחן</h3><ul class="sm-list">${(X.tips || []).map(li).join('')}</ul></div>`;
}
function variantsHtml(){
  const P = A().prog(), V = S.exercises.filter(q => q.set === 'sample');
  const by = {}; V.forEach(q => (by[q.base] = by[q.base] || []).push(q));
  return `<div class="card sm-howto">לכל אחת מ-10 השאילתות במבחן — 4 וריאציות במדרג קושי: אותו דפוס על טבלה אחרת · עם תנאי/מיון נוסף · המלכודת של הדפוס · שילוב ברמת מבחן. כולן רצות על אותה מערכת מכללה ונבדקות אוטומטית במעבדת ה-SQL.
      <div class="sql-actions"><button class="btn" data-lab="">🚀 פתחו את כל 40 במעבדה</button></div></div>
    ${Object.keys(by).sort((a,b) => a - b).map(n => { const eq = (S.examQueries || []).find(q => q.n == n);
      return `<div class="card"><h4>שאילתה ${n}${eq ? ` · <span class="muted-sm">${eb(eq.prompt)}</span>` : ''}</h4>
        ${by[n].map((q,i) => `<button class="q-pick ${P.sql[q.id] ? 'done' : ''}" data-lab="${esc(q.id)}"><span class="qp-n">${n}.${i+1}</span> ${eb(q.prompt.length > 110 ? q.prompt.slice(0,108) + '…' : q.prompt)}${P.sql[q.id] ? ' <span class="badge">✓</span>' : ''}</button>`).join('')}</div>`; }).join('')}`;
}
function bindVariants(pane){ $$('[data-lab]', pane).forEach(b => b.onclick = () => A().openLabSet('sample', b.dataset.lab || null)); }

/* ---------------- מבחנים מקבילים ---------------- */
function renderParallel(pane){
  const st = sources().stories; if(!st.length){ pane.innerHTML = '<div class="card">אין מבחנים מקבילים.</div>'; return; }
  if(!parId) parId = st[0].id;
  const src = st.find(s => s.id === parId) || st[0];
  pane.innerHTML = `<div class="card sm-howto">4 מבחנים מקוריים באותו מבנה ובאותה רמה כמו המבחן לדוגמה — סיפור אחר, אותם סוגי שאלות. כל אחד עם סכמה ונתונים משלו שרצים כאן בדפדפן.</div>
    <div class="chip-row" id="parPick">${st.map(s => `<button data-id="${s.id}" class="${s.id === src.id ? 'active' : ''}">${s.icon} ${esc(s.title)}</button>`).join('')}</div>
    <div class="chip-row small" id="parPart">${[['erd','🧩 סיפור + ERD'],['dict','📋 מילון'],['q3','💾 10 שאילתות']].map(([k,l]) => `<button data-p="${k}" class="${parPart === k ? 'active' : ''}">${l}</button>`).join('')}</div>
    ${storyCard(src)}<div class="sm-c"></div>`;
  $$('#parPick button', pane).forEach(b => b.onclick = () => { parId = b.dataset.id; renderParallel(pane); });
  $$('#parPart button', pane).forEach(b => b.onclick = () => { parPart = b.dataset.p; renderParallel(pane); });
  const c = $('.sm-c', pane);
  if(parPart === 'erd') erdComp(c, src, false); else if(parPart === 'dict') dictComp(c, src, false); else queriesComp(c, src, false);
}

/* ---------------- מבחן מדומה מלא 45/10/45 ---------------- */
function renderMockIntro(pane){
  const all = sources().all, P = A().prog(), hist = (P.sample.mocks || []).slice(-5).reverse();
  pane.innerHTML = `<div class="card"><h3>🎯 מבחן מדומה מלא — במשקלות של המבחן</h3>
      <p>שאלה 1 (ERD, 45 נק׳) + שאלה 2 (מילון נתונים, 10 נק׳) + שאלה 3 (10 שאילתות, 45 נק׳). אין משוב באמצע — הציון, הסימונים והפתרונות המלאים מוצגים בסיום. אפשר להריץ שאילתות (כמו מחשב במבחן).</p>
      <p class="muted-sm">ב-ERD הבדיקה האוטומטית בודקת זיהוי ישויות, קרדינליות ומלכודות — במבחן האמיתי מציירים, ולכן השוו גם לתשובה המלאה.</p>
      <div class="exam-modes sm-mock-pick">${[{ id:'random', icon:'🎲', title:'מבחן מקביל אקראי' }, ...all].map(s => `<button class="btn ${s.id === 'random' ? '' : 'ghost'}" data-mock="${s.id}">${s.icon} ${esc(s.id === 'sample' ? 'המבחן לדוגמה עצמו' : s.title)}</button>`).join('')}</div>
      ${hist.length ? `<div class="mini-h">הניסיונות האחרונים:</div><ul class="sm-list">${hist.map(h => `<li>${esc(h.title)} — <b>${h.total}</b> (ERD ${h.erd} · מילון ${h.dict} · שאילתות ${h.q3})</li>`).join('')}</ul>` : ''}</div>`;
  $$('[data-mock]', pane).forEach(b => b.onclick = () => startMock(pane, b.dataset.mock));
}
function startMock(pane, id){
  A().ensureEngines();
  const st = sources().stories, src = id === 'random' ? st[Math.floor(Math.random() * st.length)] : sources().all.find(s => s.id === id);
  clearInterval(mock && mock.timer);
  mock = { src, sec:0, active:true };
  pane.innerHTML = `<div class="scorebar exam-bar sm-mockbar"><b>${src.icon} ${esc(src.title)}</b><span>⏱ <span class="exam-timer" id="smTimer">00:00</span></span>
      <button class="btn small" id="smFinish">סיים והצג ציון</button><button class="btn ghost small hidden" id="smAgain">↺ מבחן חדש</button></div>
    <div id="smMockResult"></div>
    ${storyCard(src)}
    <h3 class="sec-h">שאלה 1 · ERD (45 נק׳)</h3><div id="smM1"></div>
    <h3 class="sec-h">שאלה 2 · מילון נתונים (10 נק׳)</h3><div id="smM2"></div>
    <h3 class="sec-h">שאלה 3 · 10 שאילתות (45 נק׳)</h3><div id="smM3"></div>`;
  mock.erd = erdComp($('#smM1'), src, true); mock.dict = dictComp($('#smM2'), src, true); mock.q3 = queriesComp($('#smM3'), src, true);
  mock.timer = setInterval(() => { mock.sec++; const t = $('#smTimer'); if(t) t.textContent = `${String(Math.floor(mock.sec/60)).padStart(2,'0')}:${String(mock.sec%60).padStart(2,'0')}`; else clearInterval(mock.timer); }, 1000);
  $('#smFinish').onclick = () => finishMock(pane);
  $('#smAgain').onclick = () => { clearInterval(mock.timer); renderMockIntro(pane); toTabs(); };
  toTabs();
}
async function finishMock(pane){
  if(!mock || !mock.active) return;
  if(!confirm('לסיים את המבחן ולהציג ציון?')) return;
  await A().ensureEngines();
  mock.active = false; clearInterval(mock.timer);
  const e = mock.erd.grade(), d = mock.dict.grade(), q = mock.q3.grade();
  mock.erd.reveal(); mock.dict.reveal(); mock.q3.reveal();
  const pe = 45 * e.ok / e.max, pd = 10 * d.ok / d.max, pq = 45 * q.ok / q.max, total = Math.round(pe + pd + pq);
  const P = A().prog(); P.sample.mocks = (P.sample.mocks || []).concat({ id: mock.src.id, title: mock.src.title, total, erd: Math.round(pe), dict: Math.round(pd), q3: Math.round(pq), at: Date.now() }).slice(-20);
  P.examBest = Math.max(P.examBest || 0, total); A().save();
  const mm = String(Math.floor(mock.sec/60)).padStart(2,'0'), ss = String(mock.sec%60).padStart(2,'0');
  $('#smMockResult').innerHTML = `<div class="result-banner ${total >= 60 ? 'pass' : 'fail'}">${total >= 90 ? '🏆' : total >= 60 ? '🎉' : '💪'} ציון: ${total}/100</div>
    <div class="card"><div class="sm-weights"><div class="w"><b>${Math.round(pe)}/45</b><span>ERD (${e.ok}/${e.max})</span></div><div class="w"><b>${Math.round(pd)}/10</b><span>מילון (${d.ok}/${d.max})</span></div><div class="w"><b>${Math.round(pq)}/45</b><span>שאילתות (${q.ok}/${q.max})</span></div></div>
    <p class="muted-sm">⏱ ${mm}:${ss} · גללו למטה — כל תשובה מסומנת, עם התשובה המלאה, התוצאה הרצויה והפתרון.</p></div>`;
  $('#smFinish').classList.add('hidden'); $('#smAgain').classList.remove('hidden');
  $('#smMockResult').scrollIntoView({ behavior:'smooth' });
}

window.SampleView = { show };
})();
