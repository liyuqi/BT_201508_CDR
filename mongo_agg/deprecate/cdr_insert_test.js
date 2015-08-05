
/*new Date();
 for (var i = 0; i < cdr2g.length; i++) {
 var doc = cdr2g[i];
 for (var j = 0; j < site2g.length; j++) {
 var site = site2g[j];
 if (site[j].LAC_OD == doc[i].LASTCELLID_LAC &&
 site[j].CELL_NO == doc[i].LASTCELLID) {
 doc[i].MSC_CODE = site[j].MSC_CODE;
 doc[i].BTS_CODE = site[j].BTS_CODE;
 doc[i].SITE_ID = site[j].SITE_ID;
 doc[i].SITE_NAME = site[j].SITE_NAME;
 doc[i].BELONG_TO = site[j].BELONG_TO;
 doc[i].CELL_NO = site[j].CELL_NO;
 doc[i].LAC_OD = site[j].LAC_OD;
 doc[i].BTS_ADDRESS = site[j].BTS_ADDRESS;
 doc[i].BTS_PROP = site[j].BTS_PROP;
 doc[i].BTS_STATUS = site[j].BTS_STATUS;
 doc[i].OPERATION_UNIT = site[j].OPERATION_UNIT;
 }
 doc[i].STARTOFCHARGINGTIME = new Date(doc[i].STARTOFCHARGINGDATE + " " + doc[i].TIMESTAMP);
 db.cdr2g.insert(doc[i]);
 }
 }
 new Date();*/