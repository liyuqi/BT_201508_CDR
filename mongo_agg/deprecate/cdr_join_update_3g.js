//mongo cdr cdr_join_update_3g.js > c:\workspace\CDR0324\cdr_test_result.txt
//mongo cdr cdr_join_update_3g.js > ./cdr_update_3g_result.txt
//mongo cdr cdr_join_update_3g.js > ./cdr_update_3g_result_$(date +"%H%M%S")_$(date +"%Y%m%d").txt
var cdr3g, phone_map = {}, site2g_map = {}, site3g_map = {};
//print('build phone start: \t',new Date().toLocaleTimeString());
function buildPhoneMap(){
    var obj = {};
    var phone = db.phone_type.find({});
    phone.forEach(function(type){
        obj = {
            //id          : type._id,
            PT_OID      : type.PT_OID,
            IMEI_VALUE  : type.IMEI_VALUE,
            DMS_ID      : type.DMS_ID,
            VENDOR      : type.VENDOR,
            MODEL       : type.MODEL
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
            BTS_CODE    : site.BTS_CODE,
            SITE_ID     : site.SITE_ID,     //return
            SITE_NAME   : site.SITE_NAME,
            BELONG_TO   : site.BELONG_TO,
            CELL_NO     : site.CELL_NO,     //cell
            LAC_OD      : site.LAC_OD,       //lac
            BTS_ADDRESS : site.BTS_ADDRESS
        };
        site2g_map[site.LAC_OD +'-'+ site.CELL_NO] = obj;
    });
}
buildSite2gMap();
//print('build site2g end  : \t',new Date().toLocaleTimeString());
//print();
var SIM_TYPE_map = [

     {SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^46693/}
    ,{SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^4669870/}
    ,{SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^4669871/}
    ,{SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^4669872/}
    ,{SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^4669873/}
    ,{SIM_TYPE:'USIM',GENERATION:'3G',IMSI_STARTOF:/^4669874/}
    ,{SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^4669875/}
    ,{SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^4669876/}
    ,{SIM_TYPE:'ISIM',GENERATION:'4G',IMSI_STARTOF:/^4669877/}
    ,{SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^4669878/}
    ,{SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^4669879/}
    ,{SIM_TYPE:'SIM',GENERATION:'2G',IMSI_STARTOF:/^46699/}
    ,{SIM_TYPE:'roaming',GENERATION:'all',IMSI_STARTOF:/^*/}
];
var CARRIER_map = [
     {CARRIER:'台灣大哥大',NPRN:/^9/}
    ,{CARRIER:'台灣大哥大',NPRN:/^886/}
    ,{CARRIER:'台灣大哥大',NPRN:/^1406/}
    ,{CARRIER:'台灣大哥大',NPRN:/^1411/}
    ,{CARRIER:'台灣大哥大',NPRN:/^1412/}
    ,{CARRIER:'台灣大哥大',NPRN:/^1413/}
    ,{CARRIER:'台灣大哥大',NPRN:/^1414/}
    ,{CARRIER:'台灣大哥大',NPRN:/^1426/}
    ,{CARRIER:'台灣大哥大',NPRN:/^1431/}
    ,{CARRIER:'遠傳電信',NPRN:/^1407/}
    ,{CARRIER:'遠傳電信',NPRN:/^1410/}
    ,{CARRIER:'遠傳電信',NPRN:/^1416/}
    ,{CARRIER:'遠傳電信',NPRN:/^1417/}
    ,{CARRIER:'遠傳電信',NPRN:/^1427/}
    ,{CARRIER:'遠傳電信',NPRN:/^1432/}
    ,{CARRIER:'中華電信',NPRN:/^1409/}
    ,{CARRIER:'中華電信',NPRN:/^1419/}
    ,{CARRIER:'中華電信',NPRN:/^1429/}
    ,{CARRIER:'中華電信',NPRN:/^1433/}
    ,{CARRIER:'中華電信',NPRN:/^1439/}
    ,{CARRIER:'亞太電信',NPRN:/^1405/}
    ,{CARRIER:'亞太電信',NPRN:/^1415/}
    ,{CARRIER:'亞太電信',NPRN:/^1425/}
    ,{CARRIER:'亞太電信',NPRN:/^1435/}
    ,{CARRIER:'亞太電信',NPRN:/^1436/}
    ,{CARRIER:'台灣之星',NPRN:/^1418/}
    ,{CARRIER:'台灣之星',NPRN:/^1434/}
    ,{CARRIER:'其他業者',NPRN:/^14??/}
];
//print('build site3g start: \t',new Date().toLocaleTimeString());
function buildSite3gMap(){
    var obj = {};
    var site3g = db.siteview3g_sample.find({});
    site3g.forEach(function(site){
        obj = {
            //id          :site._id,
            BTS_CODE    : site.BTS_CODE,
            SITE_ID     : site.SITE_ID,     //return
            SITE_NAME   : site.SITE_NAME,
            BELONG_TO   : site.BELONG_TO,
            CELL_NO     : site.CELL_NO,     //cell
            LAC_OD      : site.LAC_OD,       //lac
            BTS_ADDRESS : site.BTS_ADDRESS,
        };
        site3g_map[site.LAC_OD +'-'+ site.CELL_NO] = obj;
    });
}
buildSite3gMap();
//print('build site3g end  : \t',new Date().toLocaleTimeString());
//print();



//for(var key in site3g_map){print(key)}
var i=0;
print(new Date().toLocaleTimeString()+'\tprocess:'+i);

var d = new Date();
var t1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(),0,0,0);
var t0 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()-1,0,0,0);
var interval = {$gte:t0,$lt:t1}; //ISODate("2015-03-31T16:00:00Z")
db.cep3g_sample.find({    //time : interval
    record_type:{$in:["1","2"]}
},{
    "called_number" : 1             //substr(IMSI,0,8)['TWM','FET','CHT','ARTP','T_START','other','MTC']
    ,"called_imei" : 1              //#index phone MTC
    ,"called_imsi" : 1              //substr(IMSI,0,6)['SIM_2G','USIM_3G','ISIM_4G','roaming']
    ,"called_subs_last_ci" : 1      //#index site MTC
    ,"called_subs_last_lac" : 1     //#index site MTC

    ,"calling_imei" : 1             //#index phone MOC
    ,"calling_imsi" : 1             //substr(IMSI,0,6)['SIM_2G','USIM_3G','ISIM_4G','roaming']
    //,"calling_number" : 1           //^[]
    ,"calling_subs_last_ci" : 1     //#index site MOC
    ,"calling_subs_last_lac" : 1    //#index site MOC

    ,"cause_for_termination" : 1    //c = 100
    ,"charging_end_time" : 1
    ,"charging_start_time" : 1
    ,"exchange_id" : 1
    ,"orig_mcz_duration" : 1        //$sum
    ,"radio_network_type" : 1
    ,"record_type" : 1
    ,"term_mcz_duration" : 1        //$sum
    ,"date_time" : 1                //#index date, time
    ,"up_flag" : 1
    ,"_id":1
}).forEach(function (doc) {
    if(doc.up_flag!=1) {  //======================================== update done, erich up_flag:1
        if(doc.record_type=="1") {
            try{
                 var cell = doc.calling_subs_last_lac + '-' + doc.calling_subs_last_ci;
                 var calling_imei = doc.calling_imei.substr(0,8);
                 //print(new Date().toLocaleTimeString()+'\trt:'+doc.record_type+'\tcalling_imei:', doc.calling_imei+'\tcalling_cell:'+cell);
                 //if (site3g_map[cell]) {
                 try {
                     doc.SITE_ID     = site3g_map[cell].SITE_ID;
                     doc.SITE_NAME   = site3g_map[cell].SITE_NAME;
                     doc.BELONG_TO   = site3g_map[cell].BELONG_TO;
                     doc.CELL_NO     = site3g_map[cell].CELL_NO;  //#
                     doc.LAC_OD      = site3g_map[cell].LAC_OD;   //#
                     doc.BTS_ADDRESS = site3g_map[cell].BTS_ADDRESS;
                 } catch(e){ } //doc.SITE_ID = '-----'; }
                 try {
                     doc.SITE_ID     = site2g_map[cell].SITE_ID;
                     doc.SITE_NAME   = site2g_map[cell].SITE_NAME;
                     doc.BELONG_TO   = site2g_map[cell].BELONG_TO;
                     doc.CELL_NO     = site2g_map[cell].CELL_NO;  //#
                     doc.LAC_OD      = site2g_map[cell].LAC_OD;   //#
                     doc.BTS_ADDRESS = site2g_map[cell].BTS_ADDRESS;
                     doc.HANGOVER    = 1; //========================= 換手 ======//
                 } catch(e){ } //doc.SITE_ID = '-----'; }
                 try {
                     //print(new Date().toLocaleTimeString()+'\trt:'+doc.record_type+'\tcalled_imei:', doc.calling_imei+'\tcalled_cell:'+cell);
                     //doc.IMEI_VALUE  = phone_map[calling_imei].IMEI_VALUE;
                     doc.PT_OID      = phone_map[calling_imei].PT_OID;
                     doc.DMS_ID      = phone_map[calling_imei].DMS_ID;
                     doc.VENDOR      = phone_map[calling_imei].VENDOR;
                     doc.MODEL       = phone_map[calling_imei].MODEL;
                 } catch (e) { } //doc.PT_OID = 99999999; }
                 //}
            }catch(e){}
            if  (doc.orig_mcz_duration == null||""){doc.orig_mcz_duration=0;}
            //else{doc.orig_mcz_duration = Number(doc.orig_mcz_duration);}
            if  (doc.term_mcz_duration == null||""){doc.term_mcz_duration=0;}
            //else{doc.term_mcz_duration = Number(doc.term_mcz_duration);}

            print(new Date().toLocaleTimeString() + '\tMOC rt:' + doc.record_type +
            '\t發cell:' + doc.calling_subs_last_lac +'-'+ doc.calling_subs_last_ci+ '  \tsite:' + doc.SITE_ID +
            '\tcalled_num:'+ doc.called_number.substr(0,4) + '\tCARRIER:'+ doc3.CARRIER +
            '\t發imsi:'+ doc.calling_imsi.substr(0,6)+ '\tSIM:'+ doc.SIM_TYPE +
            '\t發imei:'+ doc.calling_imei.substr(0,8) + '\tPT:'+ doc.PT_OID );

        }else if(doc.record_type=="2") {
            try {
                 var cell = doc.called_subs_last_lac +'-'+ doc.called_subs_last_ci;
                 var called_imei = doc.called_imei.substr(0, 8);
                 print(new Date().toLocaleTimeString()+'\trt:'+doc.record_type+'\tcalled__imei:', doc.called_imei+'\tcalled__cell:'+cell);
                 try {
                     doc.SITE_ID     = site3g_map[cell].SITE_ID;
                     doc.SITE_NAME   = site3g_map[cell].SITE_NAME;
                     doc.BELONG_TO   = site3g_map[cell].BELONG_TO;
                     doc.CELL_NO     = site3g_map[cell].CELL_NO; //#
                     doc.LAC_OD      = site3g_map[cell].LAC_OD;   //#
                     doc.BTS_ADDRESS = site3g_map[cell].BTS_ADDRESS;
                 } catch (e) { } //doc.SITE_ID = '-----'; }
                 try {
                     doc.SITE_ID     = site2g_map[cell].SITE_ID;
                     doc.SITE_NAME   = site2g_map[cell].SITE_NAME;
                     doc.BELONG_TO   = site2g_map[cell].BELONG_TO;
                     doc.CELL_NO     = site2g_map[cell].CELL_NO;  //#
                     doc.LAC_OD      = site2g_map[cell].LAC_OD;   //#
                     doc.BTS_ADDRESS = site2g_map[cell].BTS_ADDRESS;
                     doc.HANGOVER    = 1; //========================= 換手 ======//
                 } catch(e){ } //doc.SITE_ID = '-----'; }
                 try {
                     doc.PT_OID      = phone_map[called_imei].PT_OID;
                     doc.IMEI_VALUE  = phone_map[called_imei].IMEI_VALUE;
                     doc.DMS_ID      = phone_map[called_imei].DMS_ID;
                     doc.VENDOR      = phone_map[called_imei].VENDOR;
                     doc.MODEL       = phone_map[called_imei].MODEL;
                 } catch (e) { } //if (undefined) { doc.PT_OID = 99999999; }
                if(doc.calling_imsi){
                    if(doc.calling_imsi.substr(0,5)=='46693')
                        doc.SIM_TYPE = 'SIM-2G';
                    if(doc.calling_imsi.substr(0,6)=='466970'||'466971'||'466972'||'466973')
                        doc.SIM_TYPE = 'SIM-2G';
                    if(doc.calling_imsi.substr(0,6)=='466974')
                        doc.SIM_TYPE = 'USIM-3G';
                    if(doc.calling_imsi.substr(0,6)=='466975'||'466976')
                        doc.SIM_TYPE = 'SIM-2G';
                    if(doc.calling_imsi.substr(0,6)=='466978'||'466979')
                        doc.SIM_TYPE = 'ISIM-4G';
                    if(doc.calling_imsi.substr(0,5)=='46699')
                        doc.SIM_TYPE = 'SIM-2G';
                    else{doc.SIM_TYPE='other'}
                }
                if(doc.called_number){
                    if(doc.called_number.substr(0,4)=='8869'||'1406'||'1411'||'1412'||'1413'||'1414'||'1426'||'1431')
                        doc.CARRIER='台灣大客戶';    //'TWM';
                    if(doc.called_number.substr(0,4)=='1407'||'1410'||'1416'||'1417'||'1427'||'1432')
                        doc.CARRIER='遠傳電信';     //'FET';
                    if(doc.called_number.substr(0,4)=='1409'||'1419'||'1429'||'1433'||'1439')
                        doc.CARRIER='中華電信';     //'CHT';
                    if(doc.called_number.substr(0,4)=='1405'||'1415'||'1425'||'1435'||'1436')
                        doc.CARRIER='亞太電信';     //'APT';
                    if(doc.called_number.substr(0,4)=='1418'||'1434')
                        doc.CARRIER='台灣之星';     //'T-STAR';
                    else{doc.CARRIER='其他業者';}
                }
            }catch(e){}
            if(doc.called_imsi){        //SIM_TYPE
                if(doc.called_imsi.substr(0,5)=='46693')
                    doc.SIM_TYPE = 'SIM-2G';
                else if(doc.called_imsi.substr(0,6)=='466970'||'466971'||'466972'||'466973')
                    doc.SIM_TYPE = 'SIM-2G';
                else if(doc.called_imsi.substr(0,6)=='466974')
                    doc.SIM_TYPE = 'USIM-3G';
                else if(doc.called_imsi.substr(0,6)=='466975'||'466976')
                    doc.SIM_TYPE = 'SIM-2G';
                else if(doc.called_imsi.substr(0,6)=='466978'||'466979')
                    doc.SIM_TYPE = 'ISIM-4G';
                else if(doc.called_imsi.substr(0,5)=='46699')
                    doc.SIM_TYPE = 'SIM-2G';
                else{doc.SIM_TYPE='other'}
            }
            if(doc.called_number){      //CARRIER
                if(doc.called_number.substr(0,4)=='8869'||'1406'||'1411'||'1412'||'1413'||'1414'||'1426'||'1431')
                    doc.CARRIER='台灣大客戶';    //'TWM';
                else if(doc.called_number.substr(0,4)=='1407'||'1410'||'1416'||'1417'||'1427'||'1432')
                    doc.CARRIER='遠傳電信';     //'FET';
                else if(doc.called_number.substr(0,4)=='1409'||'1419'||'1429'||'1433'||'1439')
                    doc.CARRIER='中華電信';     //'CHT';
                else if(doc.called_number.substr(0,4)=='1405'||'1415'||'1425'||'1435'||'1436')
                    doc.CARRIER='亞太電信';     //'ARPT';
                else if(doc.called_number.substr(0,4)=='1418'||'1434')
                    doc.CARRIER='台灣之星';     //'T-STAR';
                else{doc.CARRIER='其他業者';}   //'other'
            }

            if  (doc.orig_mcz_duration == null||""){doc.orig_mcz_duration=0;}
            //else{doc.orig_mcz_duration = Number(doc.orig_mcz_duration);}
            if  (doc.term_mcz_duration == null||""){doc.term_mcz_duration=0;}
            //else{doc.term_mcz_duration = Number(doc.term_mcz_duration);}

            print(new Date().toLocaleTimeString() + '\tMTC rt:' + doc.record_type +
            '\tcell:' + doc.called_subs_last_lac +'-'+ doc.called_subs_last_ci + '\tsite:' + doc.SITE_ID +
            '\tcalled_num:'+ doc.called_number.substr(0,4) + '\tCARRIER:'+ doc.CARRIER +
            '\timsi:'+ doc.called_imsi.substr(0,6) + '\tSIM:'+ doc.SIM_TYPE +
            '\timei:'+ doc.called_imei.substr(0,8)+'\tPT:'+ doc.PT_OID);
         }
        //doc.up_flag = 1; //======================================== update done, erich up_flag:1
        db.cep3g_sample.update({_id: doc._id}, {$set: {up_flag:1});
        db.cep3g_insert.save(doc);
    }else{}
    i++;
});
print(new Date().toLocaleTimeString()+'\tprocess:'+i);
db.cep3g_sample.findOne({up_flag:1},{time:1,upflag:1});
//mongo cdr cdr_join_update_3g.js > ./cdr_update_3g_result_$(date +"%H%M%S")_$(date +"%Y%m%d").txt