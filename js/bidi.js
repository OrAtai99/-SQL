/* ============================================================
   bidiLtr — סידור קטעי אנגלית/קוד בתוך טקסט עברי (RTL)
   מקיף כל קטע לטיני בסימן LRM בלתי נראה כדי שסוגריים וסימנים לא יקפצו.
   אידמפוטנטי. (מקור: nosql-questions.js) — window.bidiLtr(str)
   ============================================================ */
(function(){
var LRM = '‎';
function isStart(s, i){ var c = s[i], n = s[i+1] || '';
  return /[A-Za-z0-9$_{\[(]/.test(c) || ((c === '"' || c === "'") && /[A-Za-z$_]/.test(n)); }
function isEnd(s, i){ var c = s[i], p = s[i-1] || '';
  return /[A-Za-z0-9)}\]]/.test(c) || ((c === '"' || c === "'") && /[A-Za-z0-9$_.)}\]]/.test(p)); }
function unmatched(core){            // אינדקסים של סוגריים בלי בן-זוג בתוך הקטע
  var st = [], bad = {}, pair = { ')':'(', ']':'[', '}':'{' };
  for(var i = 0; i < core.length; i++){
    var c = core[i];
    if(c === '(' || c === '[' || c === '{') st.push(i);
    else if(pair[c]){ if(st.length && core[st[st.length-1]] === pair[c]) st.pop(); else bad[i] = 1; }
  }
  st.forEach(function(i){ bad[i] = 1; });
  return bad;
}
function wrapSeg(seg){             // קטע בלי סוגריים יתומים: חותכים קצוות ועוטפים
  var a = 0, b = seg.length - 1;
  for(var guard = 0; guard < 10; guard++){
    while(a <= b && !isStart(seg, a)) a++;
    while(b >= a && !isEnd(seg, b)) b--;
    if(a > b) return seg;
    var core = seg.slice(a, b + 1);
    if((core.split('"').length - 1) % 2 === 0) break;   // גרשיים יתומים נשארים בחוץ
    if(core[0] === '"') a++; else if(core[core.length - 1] === '"') b--; else break;
  }
  if(a > b) return seg;
  var c = seg.slice(a, b + 1);
  if(!/[A-Za-z$]/.test(c)) return seg;
  return seg.slice(0, a) + LRM + c + LRM + seg.slice(b + 1);
}
function fixRun(run){               // מפצלים בכל סוגר יתום (שייך לסוגריים עבריים)
  var bad = unmatched(run), out = '', seg = '';
  for(var i = 0; i < run.length; i++){
    if(bad[i]){ out += wrapSeg(seg) + run[i]; seg = ''; } else seg += run[i];
  }
  return out + wrapSeg(seg);
}
function negNums(s){                // מספר שלילי בודד בטקסט עברי: "-1 = מיון יורד", "(-1)"
  var parts = s.split(LRM);
  for(var i = 0; i < parts.length; i += 2)   // רק מחוץ לקטעי קוד שכבר עטופים
    parts[i] = parts[i].replace(/(^|[\s(])(-\d+(?:\.\d+)?)(?=$|[\s),.;:])/g, function(m, p, n){ return p + LRM + n + LRM; });
  return parts.join(LRM);
}
function bidi(s){ return negNums(String(s).replace(/‎/g, '').replace(/[^֐-׿]+/g, fixRun)); }
window.bidiLtr = window.bidiLtr || bidi;
})();
