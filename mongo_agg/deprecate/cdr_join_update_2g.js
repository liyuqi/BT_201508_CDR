//mongo cdr cdr_join_update_2g.js > c:\workspace\CDR0324\cdr_update_2g_result.txt
//mongo cdr cdr_join_update_2g.js > ./cdr_update_2g_result.txt
//mongo cdr cdr_join_update_2g.js > ./cdr_update_2g_result_$(date +"%H%M%S")_$(date +"%Y%m%d").txt
var cdr2g, phone_map = {}, site2g_map = {};
//print('build phone start: \t',new Date().toLocaleTimeString());
function buildPhoneMap(){
    var obj = {};
    var phone = db.phone_sample.find({});
    phone.forEach(function(type){
        obj = {
            //id          : type._id,
            PT_OID      : type.PT_OID.toString(),
            IMEI_VALUE  : type.IMEI_VALUE.toString(),
            DMS_ID      : type.DMS_ID.toString(),
            VENDOR      : type.VENDOR.toString(),
            MODEL       : type.MODEL.toString()
        };
        phone_map[type.IMEI_VALUE+''] = obj;
    });
}
buildPhoneMap();
//print('build phone end  : \t',new Date().toLocaleTimeString());
//print();

//print('build site2g start: \t',new Date().toLocaleTimeString());
function buildSite2gMap(){
    var obj = {};
    var site2g = db.siteview2g_sample.find({});
    site2g.forEach(function(site){
        obj = {
            //id          :site._id,
            BTS_CODE    : site.BTS_CODE.toString(),
            SITE_ID     : site.SITE_ID.toString(),     //return
            SITE_NAME   : site.SITE_NAME.toString(),
            BELONG_TO   : site.BELONG_TO.toString(),
            CELL_NO     : site.CELL_NO.toString(),     //cell
            LAC_OD      : site.LAC_OD.toString(),       //lac
            BTS_ADDRESS : site.BTS_ADDRESS.toString()
        };
        site2g_map[site.LAC_OD +'-'+ site.CELL_NO] = obj;
    });
}
buildSite2gMap();
//print('build site2g end  : \t',new Date().toLocaleTimeString());
//print();







//for(var key in site2g_map){print(key)}
var i=0;
print(new Date().toLocaleTimeString()+'\tprocess:'+i);
//var d = new Date();
//var t1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(),0,0,0);
//var t0 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()-1,0,0,0);
//var interval = {$gte:t0,$lt:t1}; //ISODate("2015-03-31T16:00:00Z")
var cdr2g = db.cep2g_sample.find({    //time : interval
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
    "up_flag":1,
    "_id":1
}).forEach(function (doc) { //================= cep 2g find =================
//while(cdr2g.hasNext()){
    //var doc = col.next();
    if(doc.up_flag!=2) {  //================================================= update done, erich up_flag:1
        if (doc.CALLTRANSACTIONTYPE == '1' || '2') {
            try {
                var cell = doc.LASTCELLID_LAC + '-' + doc.LASTCELLID;
                //print(new Date().toLocaleTimeString()+'\trt:'+doc.CALLTRANSACTIONTYPE+'\tcalled_imei:', doc.SERVEDIMEI+'\tcalled_cell:'+cell);
                try {
                    doc.SITE_ID = site2g_map[cell].SITE_ID;
                    doc.SITE_NAME = site2g_map[cell].SITE_NAME;
                    doc.BELONG_TO = site2g_map[cell].BELONG_TO;
                    doc.CELL_NO = site2g_map[cell].CELL_NO;  //#
                    doc.LAC_OD = site2g_map[cell].LAC_OD;   //#
                    doc.BTS_ADDRESS = site2g_map[cell].BTS_ADDRESS;
                } catch (e) {
                } //doc.SITE_ID = '-----'; }
                try {
                    //doc.IMEI_VALUE  = phone_map[calling_imei].IMEI_VALUE;
                    doc.PT_OID = phone_map[SERVEDIMEI].PT_OID;
                    doc.DMS_ID = phone_map[SERVEDIMEI].DMS_ID;
                    doc.VENDOR = phone_map[SERVEDIMEI].VENDOR;
                    doc.MODEL = phone_map[SERVEDIMEI].MODEL;
                } catch (e) {
                } //doc.PT_OID = 99999999; }
            } catch (e) {
            }
            if (doc.SERVEDIMSI) {
                if (doc.SERVEDIMSI.substr(0, 5) == "46693")
                    doc.SIM_TYPE = 'SIM-2G';
                else if (doc.SERVEDIMSI.substr(0, 6) == "466970"||"466971"||"466972"||"466973")
                    doc.SIM_TYPE = 'SIM-2G';
                else if (doc.SERVEDIMSI.substr(0, 6) == "466974")
                    doc.SIM_TYPE = 'USIM-3G';
                else if (doc.SERVEDIMSI.substr(0, 6) == "466975"||"466976")
                    doc.SIM_TYPE = 'SIM-2G';
                else if (doc.SERVEDIMSI.substr(0, 6) == "466978"||"466979")
                    doc.SIM_TYPE = 'ISIM-4G';
                else if (doc.SERVEDIMSI.substr(0, 5) == "46699")
                    doc.SIM_TYPE = 'SIM-2G';
                else {
                    doc.SIM_TYPE = 'roaming'
                }
            }
            if (doc.OTHERMSRN) {
                if (doc.OTHERMSRN.substr(0, 4) == "8869"||"1406"||"1411"||"1412"||"1413"||"1414"||"1426"||"1431")
                    doc.CARRIER = '台灣大客戶';    //'TWM';
                else if (doc.OTHERMSRN.substr(0, 4) == "1407"||"1410"||"1416"||"1417"||"1427"||"1432")
                    doc.CARRIER = '遠傳電信';     //'FET';
                else if (doc.OTHERMSRN.substr(0, 4) == "1409"||"1419"||"1429"||"1433"||"1439")
                    doc.CARRIER = '中華電信';     //'CHT';
                else if (doc.OTHERMSRN.substr(0, 4) == "1405"||"1415"||"1425"||"1435"||"1436")
                    doc.CARRIER = '亞太電信';     //'APT';
                else if (doc.OTHERMSRN.substr(0, 4) == "1418"||"1434")
                    doc.CARRIER = '台灣之星';     //'T-STAR';
                else {
                    doc.CARRIER = '其他業者';
                }
            }
            if (doc.CALLDURATION == null || "") {
                doc.CALLDURATION = 0;
            }
            //else{doc.CALLDURATION = Number(doc.CALLDURATION);}
        }
        print(new Date().toLocaleTimeString() + '\trt:' + doc.CALLTRANSACTIONTYPE +
            '\tcell:' + doc.LASTCELLID_LAC + '-' + doc.LASTCELLID + '   \tsite:' + doc.SITE_ID +
            '\timsi:' + doc.SERVEDIMSI.substr(0, 6) + '\tSIM:' + doc.SIM_TYPE +
            '\timei:' + doc.SERVEDIMEI.substr(0, 8) + '\tPT:' + doc.PT_OID +
            '\tmsrn:' + doc.OTHERMSRN.substr(0, 4) + '    \tCARRIER:' + doc.CARRIER
        );


             //doc.up_flag = 1;  //================================================= update done, erich up_flag:1
             //db.cep2g_sample.save(doc); //============= cep 2g save =============
             db.cep2g_sample.update({_id:doc._id},{$set : {up_flag:1}}); //============= cep 2g save =============
             db.cep2g_insert.save(doc);
    }else{} //print("else")

    i++;
});
print(new Date().toLocaleTimeString()+'\tprocess:'+i);
db.cep2g_sample.findOne({up_flag:1},{STARTOFCHARGINGDATE:1,TIMESTAMP:1,LASTCELLID_LAC:1,LASTCELLID:1,up_flag:1});
//mongo cdr cdr_join_update_2g.js > ./cdr_update_2g_result_$(date +"%H%M%S")_$(date +"%Y%m%d").txt