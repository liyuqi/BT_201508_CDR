//mongo cdr cdr_join_insert_2g.js > c:\workspace\CDR0324\cdr_insert_2g_result.txt
/*
echo $(date +"%H%M%S-%Y%m%d");
mongo cdr cdr_join_insert_2g.js > ./cdr_insert_2g_result_$(date +"%H%M%S")_$(date +"%Y%m%d").txt;
*/
var phone_type = db.phone_sample.find({}, {
    "PT_OID" : 1        //"PT_OID" : 1,
    ,"IMEI_VALUE" :1    //"IMEI_VALUE" : NumberLong(33229036),
    ,"DMS_ID" : 1       //"DMS_ID" : 1,
    ,"VENDOR" : 1       //"VENDOR" : "ALCATEL",
    ,"MODEL" : 1        //"OT511",
    ,"_id" : 1          //ObjectId("5512418e90b534c75ec2706e")
});
var site2g = db.siteview2g_sample.find({},{
    "MSC_CODE" : 1      //"MSC_CODE" : "JHOMSC4",
    ,"BTS_CODE" : 1     //"BTS_CODE" : "JHOBSC33",
    ,"SITE_ID" : 1      //"SITE_ID" : 10009,
    ,"SITE_NAME" : 1    //"SITE_NAME" : "台北NOVA",
    ,"BELONG_TO" : 1    //"BELONG_TO" : "第一維運處",
    ,"CELL_NO" : 1      //----------"CELL_NO" : 16041,
    ,"LAC_OD" : 1       //----------"LAC_OD" : 14103,
    ,"BTS_ADDRESS" : 1  //"BTS_ADDRESS" : "台北市中正區",
    ,"_id" : 1
});

//========================= cep 2g find ==========================
var d = new Date();
var t1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(),0,0,0);
var t0 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()-1,0,0,0);
var interval = {$gte:t0,$lt:t1}; //ISODate("2015-03-31T16:00:00Z")

var cdr2g = db.cep2g_sample.find({
    CALLTRANSACTIONTYPE:{$in:["1","2"]}
},{
    "CALLTRANSACTIONTYPE" : 1,  //['1','2']
    "SERVEDIMSI" : 1,           //substr(IMSI,0,6)['SIM_2G','USIM_3G','ISIM_4G','roaming']
    "SERVEDMSISDN" : 1,         //
    "SERVEDIMEI" : 1,           //#index pt
    "STARTOFCHARGINGDATE" : 1,  //#index date
    "TIMESTAMP" : 1,			//#index time
    "CALLDURATION" : 1,
    "OTHERMSRN" : 1,            //substr(IMSI,0,8)['TWM','FET','CHT','ARTP','T_START','other','MTC']
    "EXCHANGEID" : 1,           //[]
    "CAUSEFORTERMINATION" : 1,  //$
    "MCRDESTINATIONNUMBER" : 1, //
    "LASTCELLID_MCCMNC" : 1,
    "LASTCELLID_LAC" : 1,       //#index site
    "LASTCELLID" : 1,           //#index site
    "_id":1
});
var i = 0;
print(new Date().toLocaleTimeString()+'\tprocess: '+i+' rec');
while (cdr2g.hasNext()) {
    var doc2 = cdr2g.next();

    if (cdr2g.in_flag != 1) {
        while (site2g.hasNext()) {
            var site2 = site2g.next();
            if (site2.LAC_OD == doc2.LASTCELLID_LAC &&
                site2.CELL_NO == doc2.LASTCELLID) {
                doc2.MSC_CODE = site2.MSC_CODE;
                doc2.BTS_CODE = site2.BTS_CODE;
                doc2.SITE_ID = site2.SITE_ID;
                doc2.SITE_NAME = site2.SITE_NAME;
                doc2.BELONG_TO = site2.BELONG_TO;
                //doc2.CELL_NO     = site2.CELL_NO ;
                //doc2.LAC_OD      = site2.LAC_OD ;
                doc2.BTS_ADDRESS = site2.BTS_ADDRESS;
            }
        }
        while (phone_type.hasNext()) {
            var phone = phone_type.next();
            if (phone.IMEI_VALUE == doc2.SERVEDIMEI.substr(0,8)) {
                doc2.PT_OID = phone.PT_OID;
                doc2.DMS_ID = phone.DMS_ID;
                doc2.VENDOR = phone.VENDOR;
                doc2.MODEL = phone.MODEL;
            }
        }
        if  (doc2.CALLDURATION == null||""){doc2.CALLDURATION=0;}
        //else{doc2.CALLDURATION = Number(doc2.CALLDURATION);}
        if (doc2.SERVEDIMSI) {     //SIM_TYPE
            if (doc2.SERVEDIMSI.substr(0, 5) == '46693')
                doc2.SIM_TYPE = 'SIM-2G';
            if (doc2.SERVEDIMSI.substr(0, 6) == '466970' || '466971' || '466972' || '466973')
                doc2.SIM_TYPE = 'SIM-2G';
            if (doc2.SERVEDIMSI.substr(0, 6) == '466974')
                doc2.SIM_TYPE = 'USIM-3G';
            if (doc2.SERVEDIMSI.substr(0, 6) == '466975' || '466976')
                doc2.SIM_TYPE = 'SIM-2G';
            if (doc2.SERVEDIMSI.substr(0, 6) == '466978' || '466979')
                doc2.SIM_TYPE = 'ISIM-4G';
            if (doc2.SERVEDIMSI.substr(0, 5) == '46699')
                doc2.SIM_TYPE = 'SIM-2G';
            else {
                doc2.SIM_TYPE = 'other'
            }
        }
        if (doc2.OTHERMSRN) {   //CARRIER
            if (doc2.OTHERMSRN.substr(0, 4) == '8869' || '1406' || '1411' || '1412' || '1413' || '1414' || '1426' || '1431')
                doc2.CARRIER = '台灣大客戶';    //'TWM';
            if (doc2.OTHERMSRN.substr(0, 4) == '1407' || '1410' || '1416' || '1417' || '1427' || '1432')
                doc2.CARRIER = '遠傳電信';     //'FET';
            if (doc2.OTHERMSRN.substr(0, 4) == '1409' || '1419' || '1429' || '1433' || '1439')
                doc2.CARRIER = '中華電信';     //'CHT';
            if (doc2.OTHERMSRN.substr(0, 4) == '1405' || '1415' || '1425' || '1435' || '1436')
                doc2.CARRIER = '亞太電信';     //'ARPT';
            if (doc2.OTHERMSRN.substr(0, 4) == '1418' || '1434')
                doc2.CARRIER = '台灣之星';     //'T-STAR';
            else {
                doc2.CARRIER = '其他業者';
            }   //'other'
        }
        print(new Date().toLocaleTimeString() +
        '\trt:' + doc2.CALLTRANSACTIONTYPE + '\timei:', doc2.SERVEDIMSI +
        '\tcell:' + doc2.LASTCELLID_LAC + doc2.LASTCELLID);
    }
    i++;
    db.cep2g_sample.update({_id : doc2._id},{$set : {in_flag : 1}}); //==== cep 3g update
    db.cep2g_insert.save(doc2); //============================== cep 2g insert
}
print(new Date().toLocaleTimeString()+'\tprocess: '+i+' rec');
db.cep2g_sample.findOne({in_flag:1},{time:1,in_flag:1});
db.cep2g_insert.findOne({},{TIMESTAMP:1,PT_OID:1,SITE_ID:1});