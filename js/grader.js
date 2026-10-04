/* ============================================================
   Grader — לוגיקת הרצה ובדיקה משותפת (דפדפן + בדיקות Node)
   SQL: מריץ על SQLite (אחרי המרת T-SQL), משווה תוצאות ללא תלות בשמות עמודות
   MongoDB: מריץ ב-MongoSim, משווה לפי מצב: docs | values | ids | count
   ============================================================ */
(function(root){
  'use strict';
  const TSQL = root.TSQL, MongoSim = root.MongoSim;

  /* ---------------- SQL ---------------- */
  function normCell(v){
    if(v === null || v === undefined) return '∅';
    if(typeof v === 'number') return (Math.round(v*10000)/10000).toString();
    const n = Number(v);
    if(!isNaN(n) && String(v).trim() !== '') return (Math.round(n*10000)/10000).toString();
    return String(v).trim();
  }
  function canonSql(result, ordered){
    const rows = result.rows.map(r => r.map(normCell).join('│'));
    if(!ordered) rows.sort();
    return rows.join('\n') + '##cols=' + result.columns.length;
  }
  /* ORDER BY ברמה העליונה בלבד (לא בתוך תת-שאילתה) */
  function sqlOrdered(sql){
    const flat = String(sql).replace(/'[^']*'/g, "''");
    let depth = 0, top = '';
    for(const ch of flat){ if(ch === '(') depth++; else if(ch === ')') depth--; else if(depth === 0) top += ch; }
    return /\border\s+by\b/i.test(top);
  }
  function freshDb(SQL, schemaSql){ const db = new SQL.Database(); db.run(schemaSql); return db; }
  /* מריץ קוד משתמש. מחזיר {columns, rows, modified, notes} או זורק שגיאה */
  function runSql(db, userSql){
    const t = TSQL.transpile(userSql);
    const res = db.exec(t.sql);
    const modified = db.getRowsModified();
    if(!res.length) return { columns:[], rows:[], modified, notes:t.notes };
    const last = res[res.length-1];
    return { columns:last.columns, rows:last.values, modified, notes:t.notes };
  }
  function tableState(db, table){ return runSql(db, `SELECT * FROM ${table}`); }

  /* בודק תשובת SQL מול שאלה: q = {check, solution, alt?, mutateTable?} */
  function gradeSql(SQL, schemaSql, q, userSql){
    if(!String(userSql||'').trim()) return { ok:false, empty:true };
    if(q.check === 'text') return gradeSqlText(q, userSql);
    if(q.check === 'mutate'){
      const dbU = freshDb(SQL, schemaSql); const u0 = runSql(dbU, userSql);
      const u = tableState(dbU, q.mutateTable);
      const dbS = freshDb(SQL, schemaSql); runSql(dbS, q.solution);
      const s = tableState(dbS, q.mutateTable);
      return { ok: canonSql(u) === canonSql(s), user:u, expected:s, notes:u0.notes, mutated:true };
    }
    const u = runSql(freshDb(SQL, schemaSql), userSql);
    const s = runSql(freshDb(SQL, schemaSql), q.solution);
    const ordered = sqlOrdered(q.solution);
    return { ok: canonSql(u, ordered) === canonSql(s, ordered), user:u, expected:s, notes:u.notes, ordered };
  }
  /* השוואה טקסטואלית מנורמלת (ל-DDL שלא נתמך ב-SQLite כמו ADD CONSTRAINT) */
  function normText(s){
    return String(s).toLowerCase().replace(/--[^\n]*/g,' ').replace(/[‘’]/g,"'").replace(/[“”]/g,'"')
      .replace(/\s+/g,' ').replace(/\s*([(),;=<>])\s*/g,'$1').replace(/;+$/,'').trim();
  }
  function gradeSqlText(q, userSql){
    const u = normText(userSql);
    const ok = [q.solution, ...(q.alt||[])].some(s => normText(s) === u);
    return { ok, textOnly:true };
  }

  /* ---------------- MongoDB ---------------- */
  function leaves(v, out){
    if(v === null || v === undefined){ out.push('null'); return out; }
    if(v instanceof Date){ out.push('D:' + v.toISOString().slice(0,10)); return out; }
    if(Array.isArray(v)){ v.forEach(x => leaves(x, out)); return out; }
    if(typeof v === 'object'){ Object.keys(v).forEach(k => leaves(v[k], out)); return out; }
    if(typeof v === 'number'){ out.push('N:' + (Math.round(v*100)/100)); return out; }
    if(typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)){ out.push('D:' + v.slice(0,10)); return out; }
    out.push('S:' + String(v)); return out;
  }
  function docKey(d, mode){
    if(mode === 'values') return JSON.stringify(leaves(d, []).sort());
    if(mode === 'ids') return JSON.stringify(d && typeof d === 'object' ? (d._id ?? null) : d);
    return MongoSim.canonical(d, { dropAutoId:true });
  }
  function mongoSame(a, b, mode, ordered){
    mode = mode || 'values';
    if(mode === 'count'){
      const n = x => Array.isArray(x) ? x.length : (typeof x === 'number' ? x : NaN);
      return n(a) === n(b);
    }
    if(Array.isArray(a) && Array.isArray(b)){
      const A = a.map(d => docKey(d, mode)), B = b.map(d => docKey(d, mode));
      if(!ordered){ A.sort(); B.sort(); }
      return A.length === B.length && A.every((x,i) => x === B[i]);
    }
    if(Array.isArray(a) !== Array.isArray(b)){
      /* מסמך בודד מול מערך של אחד (findOne מול find) */
      const arr = Array.isArray(a) ? a : b, one = Array.isArray(a) ? b : a;
      return arr.length === 1 && docKey(arr[0], mode) === docKey(one, mode);
    }
    return docKey(a, mode) === docKey(b, mode);
  }
  function mongoOrdered(code){ return /\.sort\s*\(|\$sort\b/.test(String(code)); }

  /* q = {check:'result'|'state', solution, collection?, compare?, ordered?} */
  function gradeMongo(mingo, dataset, q, userCode){
    if(!String(userCode||'').trim()) return { ok:false, empty:true };
    const ru = new MongoSim(mingo, dataset).run(userCode);
    if(!ru.ok) return { ok:false, error:ru.error, user:ru };
    const rs = new MongoSim(mingo, dataset).run(q.solution);
    if(!rs.ok) return { ok:false, error:'שגיאה בפתרון המובנה: ' + rs.error, user:ru };
    if(q.check === 'state'){
      const coll = q.collection;
      const ok = mongoSame(ru.data[coll] || [], rs.data[coll] || [], 'docs', false);
      return { ok, user:ru, expected:rs, state:true, stateUser:ru.data[coll] || [], stateExpected:rs.data[coll] || [] };
    }
    const ordered = q.ordered !== undefined ? q.ordered : mongoOrdered(q.solution);
    const ok = mongoSame(ru.value, rs.value, q.compare || 'values', ordered);
    return { ok, user:ru, expected:rs, ordered };
  }

  const api = { normCell, canonSql, sqlOrdered, freshDb, runSql, tableState, gradeSql, gradeSqlText, normText,
                leaves, mongoSame, mongoOrdered, gradeMongo };
  root.Grader = api;
  if(typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
