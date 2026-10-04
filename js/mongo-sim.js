/* ============================================================
   MongoSim — סימולטור Mongo Shell בדפדפן (מבוסס mingo)
   מריץ פקודות כמו db.students.find({age:{$gt:20}}).sort({age:-1})
   על עותק טרי של נתוני הדוגמה, ומחזיר את התוצאה להצגה ולבדיקה.
   ============================================================ */
(function(root){
  'use strict';

  /* ---------- עזרים ---------- */
  const clone = v => {
    if(v === null || typeof v !== 'object') return v;
    if(v instanceof Date) return new Date(v.getTime());
    if(Array.isArray(v)) return v.map(clone);
    const o = {}; for(const k of Object.keys(v)) o[k] = clone(v[k]); return o;
  };
  const isPlainObj = v => v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date);

  /* מזהה אוטומטי דטרמיניסטי (כדי שתשובת המשתמש והפתרון יקבלו אותם מזהים) */
  function makeIdGen(){ let n = 0; return () => 'oid_' + String(++n).padStart(4,'0'); }

  /* ---------- Cursor ---------- */
  class Cursor {
    constructor(sim, producer){
      this._sim = sim; this._producer = producer;   // producer(spec) → מערך מסמכים
      this._sort = null; this._skip = 0; this._limit = 0; this._proj = null; this._cache = null;
      sim._touch(this);
    }
    _chain(fn){ fn(); this._cache = null; this._sim._touch(this); return this; }
    sort(spec){ return this._chain(() => { this._sort = spec || null; }); }
    skip(n){ return this._chain(() => { this._skip = +n || 0; }); }
    limit(n){ return this._chain(() => { this._limit = +n || 0; }); }
    project(spec){ return this._chain(() => { this._proj = spec || null; }); }
    pretty(){ this._sim._touch(this); return this; }
    explain(){ const r = { queryPlanner:{ winningPlan:{ stage:'COLLSCAN' } }, note:'בסימולטור אין אינדקסים — במונגו אמיתי explain() מראה איך השאילתה בוצעה' }; this._sim._touch({ __value:r }); return r; }
    toArray(){ if(!this._cache) this._cache = this._producer({ sort:this._sort, skip:this._skip, limit:this._limit, projection:this._proj }); return this._cache; }
    count(){ const r = this.toArray().length; this._sim._touch({ __value:r }); return r; }
    size(){ return this.count(); }
    itcount(){ return this.count(); }
    forEach(fn){ this.toArray().forEach(d => fn(d)); this._sim._touch(this); }
    map(fn){ const r = this.toArray().map(d => fn(d)); this._sim._touch({ __value:r }); return r; }
    hasNext(){ return this.toArray().length > 0; }
    next(){ return this.toArray()[0] || null; }
  }

  /* ---------- Collection ---------- */
  class Collection {
    constructor(sim, name){ this._sim = sim; this._name = name; }
    get _docs(){ return this._sim._data[this._name] || (this._sim._data[this._name] = []); }

    _find(filter, projection, opts){
      const M = this._sim._mingo;
      if(opts.projection) projection = opts.projection;
      let cur = M.find(this._docs, filter || {}, projection && Object.keys(projection).length ? projection : undefined);
      if(opts.sort)  cur = cur.sort(opts.sort);
      if(opts.skip)  cur = cur.skip(opts.skip);
      if(opts.limit) cur = cur.limit(opts.limit);
      return cur.all().map(clone);
    }
    find(filter, projection){ return new Cursor(this._sim, o => this._find(filter, projection, o)); }
    findOne(filter, projection){
      const r = this._find(filter, projection, { limit:1 })[0] || null;
      this._sim._touch({ __value:r }); return r;
    }
    countDocuments(filter){ const n = this._sim._mingo.find(this._docs, filter || {}).count(); this._sim._touch({ __value:n }); return n; }
    count(filter){ return this.countDocuments(filter); }
    estimatedDocumentCount(){ return this.countDocuments({}); }
    distinct(field, filter){
      const seen = new Map();
      /* נתיב עם נקודות שנכנס גם לתוך מערכים של מסמכים מוטמעים (lessons.title) */
      const getPath = (o, parts) => {
        if(o == null) return [];
        if(!parts.length) return Array.isArray(o) ? o : [o];
        if(Array.isArray(o)) return o.flatMap(x => getPath(x, parts));
        return getPath(o[parts[0]], parts.slice(1));
      };
      this._sim._mingo.find(this._docs, filter || {}).all().forEach(d => {
        getPath(d, field.split('.')).forEach(x => { if(x !== undefined){ const k = JSON.stringify(x); if(!seen.has(k)) seen.set(k, x); } });
      });
      const r = [...seen.values()]; this._sim._touch({ __value:r }); return r;
    }

    _checkDup(id){
      const k = JSON.stringify(id);
      if(this._docs.some(x => JSON.stringify(x._id) === k))
        throw new Error(`E11000 duplicate key error — כבר קיים ב-${this._name} מסמך עם _id: ${k}. ה-_id חייב להיות ייחודי.`);
    }
    insertOne(doc){
      if(!isPlainObj(doc)) throw new Error('insertOne מצפה למסמך אחד { ... }');
      const d = clone(doc); if(d._id === undefined) d._id = this._sim._newId();
      this._checkDup(d._id);
      this._docs.push(d);
      const r = { acknowledged:true, insertedId:d._id }; this._sim._touch({ __value:r }); return r;
    }
    insertMany(docs){
      if(!Array.isArray(docs)) throw new Error('insertMany מצפה למערך של מסמכים [ {...}, {...} ]');
      const ids = docs.map(doc => { const d = clone(doc); if(d._id === undefined) d._id = this._sim._newId(); this._checkDup(d._id); this._docs.push(d); return d._id; });
      const r = { acknowledged:true, insertedIds:ids }; this._sim._touch({ __value:r }); return r;
    }
    insert(x){ return Array.isArray(x) ? this.insertMany(x) : this.insertOne(x); }

    _applyUpdate(doc, update){
      if(!isPlainObj(update)) throw new Error('מסמך העדכון חייב להיות אובייקט, למשל { $set: { age: 30 } }');
      const ops = Object.keys(update);
      if(!ops.length || !ops.every(k => k.startsWith('$')))
        throw new Error('בעדכון חובה להשתמש באופרטור כמו $set / $inc / $push — למשל { $set: { age: 30 } }. (להחלפת מסמך שלם השתמשו ב-replaceOne)');
      ops.forEach(op => {
        if(op === '$currentDate'){                      // mingo שומר מספר — במונגו זה תאריך
          const set = {}; Object.keys(update[op]).forEach(f => set[f] = new Date());
          return this._sim._mingo.update(doc, { $set: set });
        }
        this._sim._mingo.update(doc, { [op]: update[op] });
      });
    }
    _update(filter, update, options, many){
      const Q = new this._sim._mingo.Query(filter || {});
      let matched = 0, modified = 0, upsertedId;
      for(const d of this._docs){
        if(!Q.test(d)) continue;
        matched++;
        const before = JSON.stringify(d);
        this._applyUpdate(d, update);
        if(JSON.stringify(d) !== before) modified++;
        if(!many) break;
      }
      if(!matched && options && options.upsert){
        const base = {};
        Object.entries(filter || {}).forEach(([k,v]) => { if(!k.startsWith('$') && !isPlainObj(v)) base[k] = v; });
        this._applyUpdate(base, update);
        if(base._id === undefined) base._id = this._sim._newId();
        this._docs.push(base); upsertedId = base._id;
      }
      const r = { acknowledged:true, matchedCount:matched, modifiedCount:modified };
      if(upsertedId !== undefined) r.upsertedId = upsertedId;
      this._sim._touch({ __value:r }); return r;
    }
    updateOne(f, u, o){ return this._update(f, u, o, false); }
    updateMany(f, u, o){ return this._update(f, u, o, true); }
    update(f, u, o){ return this._update(f, u, o, !!(o && o.multi)); }
    replaceOne(filter, replacement){
      const Q = new this._sim._mingo.Query(filter || {});
      const i = this._docs.findIndex(d => Q.test(d));
      if(i >= 0){ const id = this._docs[i]._id; const n = clone(replacement); n._id = id; this._docs[i] = n; }
      const r = { acknowledged:true, matchedCount:i>=0?1:0, modifiedCount:i>=0?1:0 }; this._sim._touch({ __value:r }); return r;
    }
    _delete(filter, many){
      const Q = new this._sim._mingo.Query(filter || {});
      let n = 0; const keep = [];
      for(const d of this._docs){ if((many || n === 0) && Q.test(d)){ n++; continue; } keep.push(d); }
      this._sim._data[this._name] = keep;
      const r = { acknowledged:true, deletedCount:n }; this._sim._touch({ __value:r }); return r;
    }
    deleteOne(f){ return this._delete(f, false); }
    deleteMany(f){ return this._delete(f, true); }
    remove(f){ return this._delete(f, true); }

    /* find-and-modify: מחזירים את המסמך (כברירת מחדל — לפני השינוי, כמו במונגו) */
    _firstIndex(filter, sort){
      const M = this._sim._mingo;
      let cur = M.find(this._docs.map((d,i) => ({ d, i })).map(x => Object.assign(clone(x.d), { __idx:x.i })), filter || {});
      if(sort) cur = cur.sort(sort);
      const hit = cur.all()[0];
      return hit ? hit.__idx : -1;
    }
    findOneAndUpdate(filter, update, options){
      options = options || {};
      const i = this._firstIndex(filter, options.sort);
      if(i < 0){ this._sim._touch({ __value:null }); return null; }
      const before = clone(this._docs[i]);
      this._applyUpdate(this._docs[i], update);
      const after = options.returnNewDocument || options.returnDocument === 'after';
      const r = clone(after ? this._docs[i] : before); this._sim._touch({ __value:r }); return r;
    }
    findOneAndDelete(filter, options){
      const i = this._firstIndex(filter, options && options.sort);
      if(i < 0){ this._sim._touch({ __value:null }); return null; }
      const [r] = this._docs.splice(i, 1); this._sim._touch({ __value:clone(r) }); return clone(r);
    }
    findOneAndReplace(filter, replacement, options){
      options = options || {};
      const i = this._firstIndex(filter, options.sort);
      if(i < 0){ this._sim._touch({ __value:null }); return null; }
      const before = clone(this._docs[i]); const n = clone(replacement); n._id = before._id; this._docs[i] = n;
      const r = clone(options.returnNewDocument || options.returnDocument === 'after' ? n : before); this._sim._touch({ __value:r }); return r;
    }

    aggregate(pipeline){
      if(!Array.isArray(pipeline)) throw new Error('aggregate מצפה למערך של שלבים: [ { $match: ... }, { $group: ... } ]');
      const p = clone(pipeline).map(stage => {
        if(stage && stage.$lookup && typeof stage.$lookup.from === 'string'){
          stage.$lookup.from = clone(this._sim._data[stage.$lookup.from] || []);
        }
        return stage;
      });
      return new Cursor(this._sim, o => {
        const extra = [];
        if(o.sort) extra.push({ $sort:o.sort });
        if(o.skip) extra.push({ $skip:o.skip });
        if(o.limit) extra.push({ $limit:o.limit });
        return this._sim._mingo.aggregate(this._docs, p.concat(extra)).map(clone);
      });
    }

    drop(){ delete this._sim._data[this._name]; this._sim._touch({ __value:true }); return true; }
    createIndex(spec){ const r = Object.keys(spec||{}).map(k => k + '_' + spec[k]).join('_'); this._sim._touch({ __value:r }); return r; }
    getIndexes(){ const r = [{ v:2, key:{ _id:1 }, name:'_id_' }]; this._sim._touch({ __value:r }); return r; }
  }

  /* ---------- Sim ---------- */
  class MongoSim {
    constructor(mingo, data){
      this._mingo = mingo;
      this._data = clone(data || {});
      this._newId = makeIdGen();
      this._last = undefined;
      this._log = [];
    }
    _touch(x){ this._last = x; }

    _dbProxy(){
      const sim = this;
      const fixed = {
        getCollection: n => new Collection(sim, n),
        getCollectionNames: () => { const r = Object.keys(sim._data); sim._touch({ __value:r }); return r; },
        createCollection: n => { if(!sim._data[n]) sim._data[n] = []; const r = { ok:1 }; sim._touch({ __value:r }); return r; },
        dropDatabase: () => { sim._data = {}; const r = { ok:1 }; sim._touch({ __value:r }); return r; },
      };
      return new Proxy({}, {
        get(_, prop){
          if(typeof prop !== 'string') return undefined;
          if(prop in fixed) return fixed[prop];
          return new Collection(sim, prop);
        }
      });
    }

    /* מנקה פקודות של ה-shell שאינן JavaScript */
    _preprocess(code){
      const out = [];
      code.replace(/\r/g,'').split('\n').forEach(line => {
        const t = line.trim();
        if(/^use\s+\w+;?$/i.test(t)) return;                         // use myDB
        if(/^show\s+(collections|tables);?$/i.test(t)){ out.push('db.getCollectionNames();'); return; }
        if(/^show\s+dbs;?$/i.test(t)) return;
        out.push(line);
      });
      return out.join('\n');
    }

    /* מריץ קוד משתמש. מחזיר { ok, value, kind, error, data } */
    run(code){
      /* סימני כיווניות בלתי נראים (מועתקים מטקסט עברי) שוברים JavaScript — מסירים */
      const src = this._preprocess(String(code || '').replace(/[‎‏‪-‮⁦-⁩﻿]/g, ''));
      if(!src.trim()) return { ok:false, error:'כתבו פקודה לפני ההרצה.' };
      const log = this._log = [];
      const helpers = {
        print: (...a) => log.push(a.map(x => typeof x === 'string' ? x : MongoSim.toJson(x)).join(' ')),
        printjson: x => log.push(MongoSim.toJson(x)),
        ObjectId: s => s === undefined ? this._newId() : String(s),
        ISODate: s => s === undefined ? new Date() : new Date(s),
        NumberInt: n => +n, NumberLong: n => +n, NumberDecimal: n => +n,
      };
      const names = ['db', ...Object.keys(helpers)];
      const vals = [this._dbProxy(), ...Object.values(helpers)];
      /* eval ישיר מחזיר את ערך הביטוי האחרון (כמו ה-shell): find(…) / findOne(…)._id / countDocuments(…) */
      const fn = new Function(...names, '__src', '"use strict";\nreturn eval(__src);');
      const kindOf = v => Array.isArray(v) ? 'array' : (v && typeof v === 'object' && !(v instanceof Date) ? 'object' : 'scalar');
      let value, kind;
      try {
        const completion = fn(...vals, src);
        /* הסמן (cursor) מחושב בעצלות — לכן גם הפתרון שלו בתוך ה-try */
        if(completion instanceof Cursor){ value = completion.toArray(); kind = 'docs'; }
        else if(completion instanceof Collection){ value = `[collection ${completion._name}] — הוסיפו פקודה, למשל .find()`; kind = 'scalar'; }
        else if(completion !== undefined && typeof completion !== 'function'){ value = completion; kind = kindOf(completion); }
        else {
          const last = this._last;
          if(last instanceof Cursor){ value = last.toArray(); kind = 'docs'; }
          else if(last && Object.prototype.hasOwnProperty.call(last, '__value')){ value = last.__value; kind = kindOf(value); }
          else { value = undefined; kind = 'none'; }
        }
      }
      catch(e){
        const msg = String(e && e.message || e);
        return { ok:false, error: e && e.name === 'SyntaxError' ? MongoSim.friendlySyntax(msg, src) : MongoSim.friendlyRuntime(msg) };
      }
      return { ok:true, value, kind, log, data:this._data };
    }

    /* ---------- סטטיים: נרמול והשוואה ---------- */
    static canonical(v, opts){
      opts = opts || {};
      const norm = x => {
        if(x === null || x === undefined) return null;
        if(x instanceof Date) return { $date:x.toISOString() };
        if(typeof x === 'number') return Math.round(x * 10000) / 10000;
        if(Array.isArray(x)) return x.map(norm);
        if(typeof x === 'object'){
          const o = {};
          Object.keys(x).sort().forEach(k => {
            if(opts.dropAutoId && k === '_id' && typeof x[k] === 'string' && x[k].startsWith('oid_')) return;
            o[k] = norm(x[k]);
          });
          return o;
        }
        return x;
      };
      return JSON.stringify(norm(v));
    }
    static sameResult(a, b, ordered, opts){
      if(Array.isArray(a) && Array.isArray(b)){
        const A = a.map(x => MongoSim.canonical(x, opts)), B = b.map(x => MongoSim.canonical(x, opts));
        if(!ordered){ A.sort(); B.sort(); }
        return A.length === B.length && A.every((x,i) => x === B[i]);
      }
      return MongoSim.canonical(a, opts) === MongoSim.canonical(b, opts);
    }
    static toJson(v){
      return JSON.stringify(v, (k, x) => {
        if(typeof x === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(x) && this) return x;
        return x;
      }, 2);
    }

    /* ---------- תרגום שגיאות לעברית ---------- */
    static friendlySyntax(msg, src){
      const opens = (src.match(/[({[]/g)||[]).length, closes = (src.match(/[)}\]]/g)||[]).length;
      if(opens !== closes) return `שגיאת תחביר: הסוגריים לא מאוזנים — יש ${opens} פותחים ו-${closes} סוגרים. בדקו את ה-{ } וה-( ).`;
      if(((src.match(/'/g)||[]).length % 2) || ((src.match(/"/g)||[]).length % 2)) return 'שגיאת תחביר: מרכאות שנפתחו ולא נסגרו — כל מחרוזת צריכה מרכאה פותחת וסוגרת.';
      if(/Unexpected identifier|Unexpected string|missing \) after argument list|Unexpected token/.test(msg))
        return `שגיאת תחביר (${msg}) — בדקו שיש פסיק בין שדות באובייקט ({ name: "Dan", age: 22 }) ובין ארגומנטים.`;
      return 'שגיאת תחביר: ' + msg;
    }
    static friendlyRuntime(msg){
      let m;
      if((m = msg.match(/(\w+) is not a function/))) return `"${m[1]}" אינה פקודה מוכרת. פקודות נפוצות: find, findOne, insertOne, insertMany, updateOne, updateMany, deleteOne, deleteMany, aggregate, countDocuments, distinct.`;
      if((m = msg.match(/(\w+) is not defined/))) return `"${m[1]}" לא מוגדר — אולי שכחתם מרכאות סביב מחרוזת, או סימן $ לפני אופרטור (למשל $gt)?`;
      if(/unknown (query|top level) operator|Unknown operator|not supported|Invalid/i.test(msg)) return `אופרטור לא מוכר או לא חוקי: ${msg}. בדקו את האיות (למשל $gt, $lt, $in, $set, $inc).`;
      if(/Update expression/i.test(msg)) return 'בעדכון חובה להשתמש באופרטור כמו $set / $inc — למשל { $set: { age: 30 } }.';
      return msg;
    }
  }

  MongoSim.Cursor = Cursor;
  root.MongoSim = MongoSim;
  if(typeof module !== 'undefined' && module.exports) module.exports = MongoSim;
})(typeof window !== 'undefined' ? window : globalThis);
