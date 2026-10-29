/* ============================================================
   SHIP — נתוני דמה לסכמת המשלוחים (המבחן לדוגמה של הכיתה)
   Customers · Warehouses · Couriers · Shipments ·
   ShipmentEvents · ShipmentItems · Items
   אותן שורות בונות גם SQL וגם Collections ל-MongoDB.

   מקרי קצה מכוונים:
   • C3 — לקוח בלי אף משלוח                     → ש' 18 (נפסל), P06
   • C5 — סכום בדיוק 200                        → ש' 14 (גבול)
   • C7 — משלוח עם status = NULL                → ש' 18 (נפסל)
   • C8 — שלושה בספטמבר וסכום בדיוק 500          → ש' 19 (גבול)
   • C9 — שלושה בספטמבר, אחד מהם עלות NULL       → ש' 19 (סופרים 3, מסכמים 2)
   • SH10 — עלות 31 ללא מסירה                   → ש' 12 (נכלל)
   • SH11 — עלות בדיוק 30 ללא מסירה              → ש' 12 (נפסל)
   • W2 — משלוחים באוקטובר בלבד                  → ש' 16 (נכלל)
   • W3 — בלי משלוחים בכלל                       → ש' 16, P03
   • K2, K4 — שליחים פעילים בלי משלוחים          → ש' 13
   • K3 — לא פעיל ובלי משלוחים                   → ש' 13 (נפסל)
   • SH04 — שני אירועים באותה שנייה              → ש' 17 (שובר שוויון)
   • SH06..SH17 — בלי אירועים                    → ש' 17 (חייבים להופיע), P11
   • SH02 — שני עיכובים, האחרון באוקטובר         → ש' 20 (נפסל)
   • I4 — סך כמות בדיוק 100                      → ש' 15 (גבול)
   • I5 — כמות גבוהה אך קטגוריה אחרת             → ש' 15 (נפסל)
   • SH01/I1 — שתי שורות לאותו פריט              → P15 (COUNT DISTINCT)
   ============================================================ */
window.SHIP = window.SHIP || {};

SHIP.data = {

  customers: {
    cols: ['customerId','customerName','city','active'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(60)','VARCHAR(40)','INTEGER'],
    boolCols: ['active'],
    rows: [
      ['C1','Dana Levi','Haifa',1],
      ['C2','Noam Bar','Tel Aviv',1],
      ['C3','Lee Cohen','Haifa',1],
      ['C4','Avi Mor','Eilat',0],
      ['C5','Gal Adler','Tel Aviv',1],
      ['C6','Roni Shaked','Haifa',1],
      ['C7','Tal Peled','Beer Sheva',1],
      ['C8','Ido Navon','Haifa',1],
      ['C9','Shira Tamir','Tel Aviv',1],
    ]
  },

  warehouses: {
    cols: ['warehouseId','warehouseName','city'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(60)','VARCHAR(40)'],
    rows: [
      ['W1','North Hub','Haifa'],
      ['W2','Center Hub','Tel Aviv'],
      ['W3','South Hub','Beer Sheva'],
      ['W4','East Hub','Jerusalem'],
    ]
  },

  couriers: {
    cols: ['courierId','courierName','vehicleType','active'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(60)','VARCHAR(20)','INTEGER'],
    boolCols: ['active'],
    rows: [
      ['K1','Dan Arieli','Van',1],
      ['K2','Shir Barak','Bike',1],
      ['K3','Omer Tal','Truck',0],
      ['K4','Lior Hed','Van',1],
      ['K5','Maya Ron','Bike',1],
    ]
  },

  shipments: {
    cols: ['shipmentId','customerId','warehouseId','courierId','createdAt','deliveredAt','shippingCost','status'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(10)','VARCHAR(10)','VARCHAR(10)','DATETIME','DATETIME','DECIMAL(10,2)','VARCHAR(20)'],
    dateTimeCols: ['createdAt','deliveredAt'],
    rows: [
      ['SH01','C1','W1','K1','2026-09-02 10:00:00','2026-09-05 15:00:00',250,'Delivered'],
      ['SH02','C1','W1','K1','2026-09-10 09:00:00','2026-09-12 12:00:00',300,'Delivered'],
      ['SH03','C1','W4','K5','2026-09-20 14:00:00',null,null,'InTransit'],
      ['SH04','C2','W2','K1','2026-10-01 08:00:00',null,45,'InTransit'],
      ['SH05','C2','W4','K5','2026-09-03 11:00:00','2026-09-06 18:00:00',600,'Delivered'],
      ['SH06','C5','W1','K1','2026-08-15 10:00:00','2026-08-18 10:00:00',120,'Delivered'],
      ['SH07','C5','W1','K1','2026-08-20 10:00:00','2026-08-22 10:00:00',80,'Delivered'],
      ['SH08','C6','W2','K5','2026-10-05 09:00:00','2026-10-07 10:00:00',310,'Delivered'],
      ['SH09','C6','W2','K5','2026-10-08 09:00:00','2026-10-09 10:00:00',40,'Delivered'],
      ['SH10','C7','W1','K1','2026-09-25 10:00:00',null,31,null],
      ['SH11','C4','W4','K5','2026-09-28 10:00:00',null,30,'InTransit'],
      ['SH12','C8','W4','K1','2026-09-05 10:00:00','2026-09-07 10:00:00',150,'Delivered'],
      ['SH13','C8','W4','K1','2026-09-12 10:00:00','2026-09-14 10:00:00',150,'Delivered'],
      ['SH14','C8','W4','K1','2026-09-18 10:00:00','2026-09-20 10:00:00',200,'Delivered'],
      ['SH15','C9','W1','K5','2026-09-08 10:00:00','2026-09-10 10:00:00',400,'Delivered'],
      ['SH16','C9','W1','K5','2026-09-14 10:00:00','2026-09-16 10:00:00',null,'Delivered'],
      ['SH17','C9','W1','K5','2026-09-22 10:00:00','2026-09-24 10:00:00',250,'Delivered'],
    ]
  },

  shipmentEvents: {
    cols: ['eventId','shipmentId','eventType','eventTime','location'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(10)','VARCHAR(20)','DATETIME','VARCHAR(40)'],
    dateTimeCols: ['eventTime'],
    rows: [
      ['E01','SH01','Created',  '2026-09-02 10:00:00','Haifa'],
      ['E02','SH01','Delayed',  '2026-09-03 11:00:00','Haifa'],
      ['E03','SH01','Delayed',  '2026-09-04 09:00:00','Haifa'],
      ['E04','SH01','Delivered','2026-09-05 15:00:00','Tel Aviv'],
      ['E05','SH02','Created',  '2026-09-10 09:00:00','Haifa'],
      ['E06','SH02','Delayed',  '2026-09-11 08:00:00','Haifa'],
      ['E07','SH02','Delayed',  '2026-10-02 08:00:00','Haifa'],
      ['E08','SH03','Created',  '2026-09-20 14:00:00','Jerusalem'],
      ['E09','SH03','Delayed',  '2026-09-21 10:00:00','Jerusalem'],
      ['E10','SH04','Scanned',  '2026-10-01 09:00:00','Tel Aviv'],
      ['E11','SH04','Scanned',  '2026-10-01 09:00:00','Tel Aviv'],
      ['E12','SH05','Created',  '2026-09-03 11:00:00','Jerusalem'],
      ['E13','SH05','Delayed',  '2026-09-04 10:00:00','Jerusalem'],
      ['E14','SH05','Delayed',  '2026-09-05 10:00:00','Jerusalem'],
      ['E15','SH05','Delayed',  '2026-09-06 10:00:00','Jerusalem'],
      ['E16','SH05','Delivered','2026-09-06 18:00:00','Tel Aviv'],
    ]
  },

  items: {
    cols: ['itemId','itemName','category'],
    types:['VARCHAR(10) PRIMARY KEY','VARCHAR(60)','VARCHAR(30)'],
    rows: [
      ['I1','Keyboard','Electronics'],
      ['I2','Monitor','Electronics'],
      ['I3','Chair','Furniture'],
      ['I4','Mouse','Electronics'],
      ['I5','Desk','Furniture'],
      ['I6','Lamp','Lighting'],
    ]
  },

  /* בלי מפתח ראשי: ייתכנו כמה שורות לאותו צירוף משלוח-פריט */
  shipmentItems: {
    cols: ['shipmentId','itemId','quantity','unitPrice'],
    types:['VARCHAR(10)','VARCHAR(10)','INTEGER','DECIMAL(10,2)'],
    rows: [
      ['SH01','I1',60,50],
      ['SH01','I1',10,50],
      ['SH01','I2',70,300],
      ['SH02','I1',50,50],
      ['SH02','I4',60,20],
      ['SH05','I2',45,300],
      ['SH05','I3',30,150],
      ['SH08','I4',40,20],
      ['SH08','I6',90,60],
      ['SH12','I5',200,400],
    ]
  },
};

SHIP.order = ['customers','warehouses','couriers','shipments','shipmentEvents','items','shipmentItems'];

SHIP.sqlNames = {
  customers:'Customers', warehouses:'Warehouses', couriers:'Couriers',
  shipments:'Shipments', shipmentEvents:'ShipmentEvents',
  items:'Items', shipmentItems:'ShipmentItems',
};

SHIP.buildSql = function(){
  const q = String.fromCharCode(39);
  const lit = v => v === null ? 'NULL'
    : (typeof v === 'number' ? String(v) : q + String(v).split(q).join(q + q) + q);
  return SHIP.order.map(key => {
    const T = SHIP.data[key], name = SHIP.sqlNames[key];
    const ddl = 'CREATE TABLE ' + name + ' (\n  '
      + T.cols.map((c, i) => c + ' ' + T.types[i]).join(',\n  ') + '\n);';
    const ins = 'INSERT INTO ' + name + ' (' + T.cols.join(', ') + ') VALUES\n '
      + T.rows.map(r => '(' + r.map(lit).join(',') + ')').join(',\n ') + ';';
    return ddl + '\n' + ins;
  }).join('\n\n');
};

SHIP.buildMongo = function(){
  const out = {};
  SHIP.order.forEach(key => {
    const T = SHIP.data[key], dts = T.dateTimeCols || [], bools = T.boolCols || [];
    out[key] = T.rows.map(r => {
      const doc = {};
      T.cols.forEach((c, i) => {
        let v = r[i];
        if (v !== null && dts.includes(c))   v = new Date(String(v).replace(' ', 'T') + 'Z');
        if (v !== null && bools.includes(c)) v = !!v;
        doc[c] = v;
      });
      return doc;
    });
  });
  return out;
};

if (typeof module !== 'undefined' && module.exports) module.exports = SHIP;
