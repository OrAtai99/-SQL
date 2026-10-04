/* ============================================================
   TSQL → SQLite — שכבת תאימות
   הקורס נלמד ב-Microsoft SQL Server (T-SQL), אבל המנוע בדפדפן הוא SQLite.
   הקובץ ממיר את התחביר הנפוץ של T-SQL כך שאפשר לכתוב כמו במבחן ועדיין להריץ.
   מחזיר { sql, notes } — notes = רשימת ההמרות שבוצעו (להצגה למשתמש).
   ============================================================ */
(function(root){
  'use strict';

  /* מחליף מחרוזות-טקסט ('...') במצייני מקום, כדי שההמרות לא יגעו בתוכן טקסטואלי */
  function protectStrings(sql){
    const lits = [];
    let out = '', i = 0;
    while(i < sql.length){
      const ch = sql[i];
      if(ch === "'"){
        let j = i + 1, s = "'";
        while(j < sql.length){
          if(sql[j] === "'" && sql[j+1] === "'"){ s += "''"; j += 2; continue; }
          s += sql[j];
          if(sql[j] === "'"){ j++; break; }
          j++;
        }
        lits.push(s); out += '\u0001' + (lits.length - 1) + '\u0002'; i = j;
      } else if(ch === '-' && sql[i+1] === '-'){          // הערת שורה
        const e = sql.indexOf('\n', i); const end = e < 0 ? sql.length : e;
        out += ' '.repeat(0); i = end;
      } else { out += ch; i++; }
    }
    return { code: out, lits };
  }
  function restoreStrings(code, lits){ return code.replace(/\u0001(\d+)\u0002/g, (_, n) => lits[+n]); }

  /* מוצא קריאות לפונקציה עם סוגריים מאוזנים ומחליף אותן */
  function replaceFunc(code, name, fn){
    const re = new RegExp('\\b' + name + '\\s*\\(', 'gi');
    let m, out = '', last = 0;
    while((m = re.exec(code))){
      const start = m.index, open = re.lastIndex - 1;
      let depth = 0, k = open;
      for(; k < code.length; k++){
        if(code[k] === '(') depth++;
        else if(code[k] === ')'){ depth--; if(depth === 0) break; }
      }
      if(depth !== 0) break;                         // לא מאוזן — משאירים
      const inner = code.slice(open + 1, k);
      const rep = fn(inner);
      if(rep == null) continue;
      out += code.slice(last, start) + rep;
      last = k + 1; re.lastIndex = k + 1;
    }
    return out + code.slice(last);
  }
  /* מפצל ארגומנטים בפסיקים ברמה העליונה */
  function splitArgs(s){
    const parts = []; let depth = 0, cur = '';
    for(const ch of s){
      if(ch === '(') depth++; else if(ch === ')') depth--;
      if(ch === ',' && depth === 0){ parts.push(cur); cur = ''; } else cur += ch;
    }
    parts.push(cur); return parts.map(x => x.trim());
  }

  function transpile(input){
    const notes = new Set();
    let { code, lits } = protectStrings(String(input || ''));

    /* GO (מפריד אצוות של SSMS) */
    if(/^\s*GO\s*;?\s*$/im.test(code)){ code = code.replace(/^\s*GO\s*;?\s*$/gim, ''); notes.add('GO הוסר'); }

    /* N'טקסט' → 'טקסט' (יוניקוד ב-T-SQL) */
    code = code.replace(/\bN(?=\u0001)/g, () => { notes.add("N'…' → '…'"); return ''; });

    /* #טבלה_זמנית → tmp_טבלה */
    code = code.replace(/#(\w+)/g, (_, n) => { notes.add('#טבלה זמנית → TEMP TABLE'); return 'tmp_' + n; });

    /* IDENTITY(1,1) — מספור אוטומטי. ב-SQLite: INTEGER PRIMARY KEY ממוספר ממילא */
    code = code.replace(/\bIDENTITY\s*\(\s*\d+\s*,\s*\d+\s*\)/gi, () => { notes.add('IDENTITY הוסר (SQLite ממספר אוטומטית)'); return ''; });

    /* col INT FOREIGN KEY REFERENCES t(id) — הצורה מהמצגת (תקינה ב-T-SQL) → REFERENCES בלבד */
    code = code.replace(/\bFOREIGN\s+KEY\s+(?=REFERENCES\b)/gi, () => { notes.add('FOREIGN KEY REFERENCES (בשורת העמודה) → REFERENCES'); return ''; });

    /* LIKE עם מחלקות תווים של T-SQL ([0-9], [A-Z]) → GLOB של SQLite */
    code = code.replace(/\b(NOT\s+)?LIKE(\s+)\u0001(\d+)\u0002/gi, (m, not, sp, n) => {
      const lit = lits[+n];
      if(!/\[/.test(lit)) return m;
      lits[+n] = "'" + lit.slice(1, -1).replace(/%/g, '*').replace(/_/g, '?') + "'";
      notes.add("LIKE '[…]' → GLOB (רגיש לאותיות גדולות/קטנות)");
      return (not || '') + 'GLOB' + sp + '\u0001' + n + '\u0002';
    });

    /* פונקציות תאריך/מחרוזת/NULL */
    code = replaceFunc(code, 'YEAR',  a => { notes.add('YEAR() → strftime'); return `CAST(strftime('%Y', ${a}) AS INTEGER)`; });
    code = replaceFunc(code, 'MONTH', a => { notes.add('MONTH() → strftime'); return `CAST(strftime('%m', ${a}) AS INTEGER)`; });
    code = replaceFunc(code, 'DAY',   a => { notes.add('DAY() → strftime'); return `CAST(strftime('%d', ${a}) AS INTEGER)`; });
    code = code.replace(/\bGETDATE\s*\(\s*\)/gi, () => { notes.add("GETDATE() → datetime('now')"); return "datetime('now')"; });
    code = code.replace(/\bISNULL\s*\(/gi, () => { notes.add('ISNULL() → IFNULL()'); return 'IFNULL('; });
    code = code.replace(/\bLEN\s*\(/gi, () => { notes.add('LEN() → LENGTH()'); return 'LENGTH('; });
    code = replaceFunc(code, 'DATEDIFF', a => {
      const [unit, d1, d2] = splitArgs(a);
      if(!d2) return null;
      const u = unit.toLowerCase().replace(/[\[\]]/g,'');
      notes.add('DATEDIFF → julianday');
      if(u === 'day' || u === 'dd' || u === 'd') return `CAST(julianday(${d2}) - julianday(${d1}) AS INTEGER)`;
      if(u === 'year' || u === 'yy' || u === 'yyyy') return `(CAST(strftime('%Y', ${d2}) AS INTEGER) - CAST(strftime('%Y', ${d1}) AS INTEGER))`;
      if(u === 'month' || u === 'mm' || u === 'm') return `((CAST(strftime('%Y', ${d2}) AS INTEGER) - CAST(strftime('%Y', ${d1}) AS INTEGER))*12 + CAST(strftime('%m', ${d2}) AS INTEGER) - CAST(strftime('%m', ${d1}) AS INTEGER))`;
      return null;
    });

    /* DATEPART(part, x) */
    code = replaceFunc(code, 'DATEPART', a => {
      const [part, d] = splitArgs(a); if(!d) return null;
      const f = { year:'%Y', yy:'%Y', yyyy:'%Y', month:'%m', mm:'%m', m:'%m', day:'%d', dd:'%d', d:'%d', hour:'%H', hh:'%H', minute:'%M', mi:'%M', n:'%M' }[part.toLowerCase().replace(/[\[\]]/g,'')];
      if(!f) return null; notes.add('DATEPART → strftime');
      return `CAST(strftime('${f}', ${d}) AS INTEGER)`;
    });
    /* LEFT(s,n) / RIGHT(s,n) / CHARINDEX(sub,s) */
    code = replaceFunc(code, 'LEFT', a => { const [s, n] = splitArgs(a); if(!n) return null; notes.add('LEFT() → SUBSTR'); return `SUBSTR(${s}, 1, ${n})`; });
    code = replaceFunc(code, 'RIGHT', a => { const [s, n] = splitArgs(a); if(!n) return null; notes.add('RIGHT() → SUBSTR'); return `SUBSTR(${s}, -(${n}))`; });
    code = replaceFunc(code, 'CHARINDEX', a => { const [sub, s] = splitArgs(a); if(!s) return null; notes.add('CHARINDEX() → INSTR'); return `INSTR(${s}, ${sub})`; });

    /* CONVERT(type, x [, style]) → CAST(x AS type) */
    code = replaceFunc(code, 'CONVERT', a => { const [type, x] = splitArgs(a); if(!x) return null; notes.add('CONVERT → CAST'); return `CAST(${x} AS ${type})`; });

    /* CAST: DECIMAL(p,s) → ROUND (עיגול כמו ב-SQL Server); DATE/DATETIME → פונקציות תאריך של SQLite */
    code = replaceFunc(code, 'CAST', a => {
      const m = a.match(/^([\s\S]*)\bAS\s+(?:DECIMAL|NUMERIC)\s*\(\s*\d+\s*(?:,\s*(\d+)\s*)?\)\s*$/i);
      if(m){ notes.add('CAST(… AS DECIMAL(p,s)) → ROUND'); return `ROUND(CAST(${m[1].trim()} AS REAL), ${m[2] || 0})`; }
      const d = a.match(/^([\s\S]*)\bAS\s+(DATE|DATETIME2?|SMALLDATETIME)\s*$/i);
      if(d){ notes.add('CAST(… AS DATE) → date()'); return /^DATE$/i.test(d[2]) ? `date(${d[1].trim()})` : `datetime(${d[1].trim()})`; }
      return 'CAST(' + a + ')';
    });

    /* TOP בתוך תת-שאילתה: (SELECT TOP n …) → (SELECT … LIMIT n) */
    for(let guard = 0; guard < 20; guard++){
      const m = /\(\s*SELECT\s+(DISTINCT\s+)?TOP\s*\(?\s*(\d+)\s*\)?\s*(?:PERCENT\s+)?(WITH\s+TIES\s+)?/i.exec(code);
      if(!m) break;
      let depth = 0, k = m.index;
      for(; k < code.length; k++){ if(code[k] === '(') depth++; else if(code[k] === ')'){ depth--; if(depth === 0) break; } }
      if(depth !== 0) break;
      const inner = code.slice(m.index + m[0].length, k);
      code = code.slice(0, m.index) + '(SELECT ' + (m[1] || '') + inner.replace(/\s*$/, '') + ' LIMIT ' + m[2] + ')' + code.slice(k + 1);
      notes.add('TOP n (בתת-שאילתה) → LIMIT n');
      if(m[3]) notes.add('WITH TIES לא נתמך בדפדפן — ייתכן שיחסרו שורות "תיקו" (ב-SQL Server הן יופיעו)');
    }

    /* שרשור מחרוזות: ב-T-SQL עם + , ב-SQLite עם || (רק כשאחד הצדדים הוא טקסט מפורש) */
    const LIT = '\u0001\\d+\u0002';
    const before = code;
    code = code.replace(new RegExp('(' + LIT + ')\\s*\\+', 'g'), '$1 ||')
               .replace(new RegExp('\\+\\s*(' + LIT + ')', 'g'), '|| $1');
    if(code !== before) notes.add("שרשור + → ||");

    /* פקודה-פקודה: TOP, SELECT INTO, DELETE/INSERT בלי FROM/INTO */
    code = code.split(';').map(stmt => {
      let s = stmt;
      const top = s.match(/^(\s*SELECT\s+(?:DISTINCT\s+)?)TOP\s*\(?\s*(\d+)\s*\)?\s*(?:PERCENT\s+)?(WITH\s+TIES\s+)?/i);
      if(top){ s = top[1] + s.slice(top[0].length); s = s.replace(/\s*$/, '') + ' LIMIT ' + top[2]; notes.add('TOP n → LIMIT n');
        if(top[3]) notes.add('WITH TIES לא נתמך בדפדפן — ייתכן שיחסרו שורות "תיקו" (ב-SQL Server הן יופיעו)'); }
      const into = s.match(/^\s*SELECT\s+([\s\S]*?)\s+INTO\s+(\w+)\s+(FROM\s+[\s\S]*)$/i);
      if(into){ s = ` CREATE TEMP TABLE ${into[2]} AS SELECT ${into[1]} ${into[3]}`; notes.add('SELECT … INTO → CREATE TEMP TABLE'); }
      s = s.replace(/^(\s*DELETE\s+)(?!FROM\b)(\w+)/i, (_, a, t) => { notes.add('DELETE t → DELETE FROM t'); return a + 'FROM ' + t; });
      s = s.replace(/^(\s*INSERT\s+)(?!INTO\b)(\w+)/i, (_, a, t) => { notes.add('INSERT t → INSERT INTO t'); return a + 'INTO ' + t; });
      s = s.replace(/^(\s*CREATE\s+TABLE\s+)(tmp_\w+)/i, (_, a, t) => a.replace(/TABLE/i, 'TEMP TABLE') + t);
      return s;
    }).join(';');

    return { sql: restoreStrings(code, lits), notes: [...notes] };
  }

  const api = { transpile, splitArgs };
  root.TSQL = api;
  if(typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
