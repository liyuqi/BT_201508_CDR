//mongo cdr cdr_join_insert_3g.js > c:\workspace\CDR0324\cdr_insert_3g_result.txt
/*
echo $(date +"%H%M%S-%Y%m%d");
mongo cdr cdr_join_insert_3g.js > ./cdr_insert_3g_result_$(date +"%H%M%S")_$(date +"%Y%m%d").txt
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
var site3g = db.siteview3g_sample.find({}, {
    //"MSC_CODE" : 1,     //"MSC_CODE" : "JHOMSC4",
     "BTS_CODE": 1        //"BTS_CODE" : "RNW30",
    ,"SITE_ID": 1         //"SITE_ID" : 10001,
    ,"SITE_NAME": 1       //"SITE_NAME" : "中正仁愛",
    ,"BELONG_TO": 1       //"BELONG_TO" : "第一維運處",
    ,"CELL_NO": 1         //----------"CELL_NO" : 10361,
    ,"LAC_OD": 1          //----------"LAC_OD" : 11116,
    ,"BTS_ADDRESS" : 1    //"BTS_ADDRESS" : "台北市中正區",
    ,"_id":1
});
//========================= cep 3g find ==========================
var d = new Date();
var t1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(),0,0,0);
var t0 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()-1,0,0,0);
var interval = {$gte:t0,$lt:t1}; //ISODate("2015-03-31T16:00:00Z")
var i = 0;
print(new Date().toLocaleTimeString()+'\tprocess: '+i+' rec');
var cdr3g = db.cep3g_sample.find({
    //time:interval
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
    ,"in_flag" : 1
    ,"_id":1
}).forEach(function(doc){
//while (cdr3g.hasNext()) {    var doc = cdr3g.next();

    if(cdr3g.in_flag!=1) {
        /*********** MOC ************/
        //if (doc.calling_imei)
        //    print(new Date().toLocaleTimeString() + '\trt:' + doc.record_type +
        //    '\tcalling_cell:' + doc.calling_subs_last_lac + '-' + doc.calling_subs_last_ci +
        //    '\tcalling_imei:' + doc.calling_imei.substr(0, 8) + '\tcalling_imsi:' + doc.calling_imsi.substr(0, 6));

        if (doc.record_type == "1") { //========== MOC calling =========
            while (site3g.hasNext()) {
                var site3 = site3g.next();
                if (site3.LAC_OD == doc.calling_subs_last_lac &&
                    site3.CELL_NO == doc.calling_subs_last_ci) {
                    doc.BTS_CODE = site3.BTS_CODE;
                    doc.SITE_ID = site3.SITE_ID;
                    doc.SITE_NAME = site3.SITE_NAME;
                    doc.BELONG_TO = site3.BELONG_TO;
                    //doc.CELL_NO    = site3.CELL_NO;
                    //doc.LAC_OD     = site3.LAC_OD;
                    doc.BTS_ADDRESS = site3.BTS_ADDRESS;
                }
            }
            while (site2g.hasNext()) {
                var site2 = site2g.next();
                if (site2.LAC_OD == doc.calling_subs_last_lac &&
                    site2.CELL_NO == doc.calling_subs_last_ci) {
                    doc.BTS_CODE = site2.BTS_CODE;
                    doc.SITE_ID = site2.SITE_ID;
                    doc.SITE_NAME = site2.SITE_NAME;
                    doc.BELONG_TO = site2.BELONG_TO;
                    //doc.CELL_NO    = site2.CELL_NO;
                    //doc.LAC_OD     = site2.LAC_OD;
                    doc.BTS_ADDRESS = site2.BTS_ADDRESS;
                    doc.HANGOVER = 1; //換手flag
                }
            }
            while (phone_type.hasNext()) {
                var phone = phone_type.next();
                if (phone.IMEI_VALUE == doc.calling_imei.substr(0,8)) {
                    doc.PT_OID = phone.PT_OID;
                    doc.DMS_ID = phone.DMS_ID;
                    doc.VENDOR = phone.VENDOR;
                    doc.MODEL = phone.MODEL;
                }
            }
            //if  (doc.orig_mcz_duration == null||""){doc.orig_mcz_duration=0;}
            //else{doc.orig_mcz_duration = Number(doc.orig_mcz_duration);}
            //if  (doc.term_mcz_duration == null||""){doc.term_mcz_duration=0;}
            //else{doc.term_mcz_duration = Number(doc.term_mcz_duration);}

            if(doc.calling_imsi){   //SIM_TYPE
                if(doc.calling_imsi.substr(0,5)=="46693")
                    doc.SIM_TYPE = 'SIM-2G';
                else if(doc.calling_imsi.substr(0,6)=="466970"||"466971"||"466972"||"466973")
                    doc.SIM_TYPE = 'SIM-2G';
                else if(doc.calling_imsi.substr(0,6)=="466974")
                    doc.SIM_TYPE = 'USIM-3G';
                else if(doc.calling_imsi.substr(0,6)=="466975"||"466976")
                    doc.SIM_TYPE = 'SIM-2G';
                else if(doc.calling_imsi.substr(0,6)=="466978"||"466979")
                    doc.SIM_TYPE = 'ISIM-4G';
                else if(doc.calling_imsi.substr(0,5)=="46699")
                    doc.SIM_TYPE = 'SIM-2G';
                else{doc.SIM_TYPE='roaming'}
            }
            if(doc.called_number){     //CARRIER
                if(doc.called_number.substr(0,4)=="8869"||"1406"||"1411"||"1412"||"1413"||"1414"||"1426"||"1431")
                    doc.CARRIER='台灣大客戶';    //'TWM';
                else if(doc.called_number.substr(0,4)=="1407"||"1410"||"1416"||"1417"||"1427"||"1432")
                    doc.CARRIER='遠傳電信';     //'FET';
                else if(doc.called_number.substr(0,4)=="1409"||"1419"||"1429"||"1433"||"1439")
                    doc.CARRIER='中華電信';     //'CHT';
                else if(doc.called_number.substr(0,4)=="1405"||"1415"||"1425"||"1435"||"1436")
                    doc.CARRIER='亞太電信';     //'ARPT';
                else if(doc.called_number.substr(0,4)=="1418"||"1434")
                    doc.CARRIER='台灣之星';     //'T-STAR';
                else{doc.CARRIER='其他業者';}   //'other'
            }
            print(new Date().toLocaleTimeString() + '\tMOC rt:' + doc.record_type +
                '\t發cell:' + doc.calling_subs_last_lac +'-'+ doc.calling_subs_last_ci+ '  \tsite:' + doc.SITE_ID +
                '\tcalled_num:'+ doc.called_number.substr(0,4) + '\tCARRIER:'+ doc.CARRIER +
                '\t發imsi:'+ doc.calling_imsi.substr(0,6)+ '\tSIM:'+ doc.SIM_TYPE +
                '\t發imei:'+ doc.calling_imei.substr(0,8) + '\tPT:'+ doc.PT_OID );
        }
        /*********** MTC ************/
        //if (doc.called_imei)
        //    print(new Date().toLocaleTimeString() + '\trt:' + doc.record_type +
        //    '\tcalled_cell:' + doc.called_subs_last_lac + '-' + doc.called_subs_last_ci +
        //    '\tcalled_imei:' + doc.called_imei.substr(0, 8) + '\tcalled_imsi:' + doc.called_imsi.substr(0, 6));

        if (cdr3g.record_type == "2") { //========== MTC called =========

            while (site3g.hasNext()) {
                var site3 = site3g.next();
                if (site3.LAC_OD == doc.called_subs_last_lac &&
                    site3.CELL_NO == doc.called_subs_last_ci) {
                    doc.BTS_CODE = site3.BTS_CODE;
                    doc.SITE_ID = site3.SITE_ID;
                    doc.SITE_NAME = site3.SITE_NAME;
                    doc.BELONG_TO = site3.BELONG_TO;
                    //doc.CELL_NO    = site3.CELL_NO;
                    //doc.LAC_OD     = site3.LAC_OD;
                    doc.BTS_ADDRESS = site3.BTS_ADDRESS;
                }
            }
            while (site2g.hasNext()) {
                var site2 = site2g.next();
                if (site2.LAC_OD == doc.called_subs_last_lac &&
                    site2.CELL_NO == doc.called_subs_last_ci) {
                    doc.BTS_CODE = site2.BTS_CODE;
                    doc.SITE_ID = site2.SITE_ID;
                    doc.SITE_NAME = site2.SITE_NAME;
                    doc.BELONG_TO = site2.BELONG_TO;
                    //doc.CELL_NO    = site2.CELL_NO;
                    //doc.LAC_OD     = site2.LAC_OD;
                    doc.BTS_ADDRESS = site2.BTS_ADDRESS;
                    doc.HANGOVER = 1; //========================= 換手 ======//
                }
            }
            while (phone_type.hasNext()) {
                var phone = phone_type.next();
                if (phone.IMEI_VALUE == doc.calling_imei.substr(0,8)) {
                    doc.PT_OID = phone.PT_OID;
                    doc.DMS_ID = phone.DMS_ID;
                    doc.VENDOR = phone.VENDOR;
                    doc.MODEL = phone.MODEL;
                }
            }
            //if  (doc.orig_mcz_duration == null||""){doc.orig_mcz_duration=0;}
            //else{doc.orig_mcz_duration = Number(doc.orig_mcz_duration);}
            //if  (doc.term_mcz_duration == null||""){doc.term_mcz_duration=0;}
            //else{doc.term_mcz_duration = Number(doc.term_mcz_duration);}
            if(doc.called_imsi){   //SIM_TYPE
                     if(doc.called_imsi.substr(0,5)=="46693"){
                    doc.SIM_TYPE = 'SIM-2G'; print('\t'+doc.called_imsi.substr(0,5))}
                else if(doc.called_imsi.substr(0,6)=="466970"||"466971"||"466972"||"466973"){
                    doc.SIM_TYPE = 'SIM-2G';}
                else if(doc.called_imsi.substr(0,6)=="466974"){
                    doc.SIM_TYPE = 'USIM-3G';}
                else if(doc.called_imsi.substr(0,6)=="466975"||"466976"){
                    doc.SIM_TYPE = 'SIM-2G';}
                else if(doc.called_imsi.substr(0,6)=="466978"||"466979"){
                    doc.SIM_TYPE = 'ISIM-4G';}
                else if(doc.called_imsi.substr(0,5)=="46699"){
                    doc.SIM_TYPE = 'SIM-2G';}
                else{doc.SIM_TYPE='other'}
            }
            if(doc.called_number){     //CARRIER
                /*if(doc.called_number.substr(0,4)=="8869"||"1406"||"1411"||"1412"||"1413"||"1414"||"1426"||"1431")
                    doc.CARRIER='台灣大客戶';    //'TWM';
                else if(doc.called_number.substr(0,4)=="1407"||"1410"||"1416"||"1417"||"1427"||"1432")
                    doc.CARRIER='遠傳電信';     //'FET';
                else if(doc.called_number.substr(0,4)=="1409"||"1419"||"1429"||"1433"||"1439")
                    doc.CARRIER='中華電信';     //'CHT';
                else if(doc.called_number.substr(0,4)=="1405"||"1415"||"1425"||"1435"||"1436")
                    doc.CARRIER='亞太電信';     //'ARPT';
                else if(doc.called_number.substr(0,4)=="1418"||"1434")
                    doc.CARRIER='台灣之星';     //'T-STAR';
                else{*/doc.CARRIER='其他業者';//}   //'other'
            }
            print(new Date().toLocaleTimeString() + '\tMTC rt:' + doc.record_type +
            '\tcell:' + doc.called_subs_last_lac +'-'+ doc.called_subs_last_ci + '\tsite:' + doc.SITE_ID +
            '\tcalled_num:'+ doc.called_number.substr(0,4) + '\tCARRIER:'+ doc.CARRIER +
            '\timsi:'+ doc.called_imsi.substr(0,6) + '\tSIM:'+ doc.SIM_TYPE +
            '\timei:'+ doc.called_imei.substr(0,8)+'\tPT:'+ doc.PT_OID);
        }

    }
    if  (doc.orig_mcz_duration == null||""){doc.orig_mcz_duration=0;}
    else{doc.orig_mcz_duration = Number(doc.orig_mcz_duration);}
    if  (doc.term_mcz_duration == null||""){doc.term_mcz_duration=0;}
    else{doc.term_mcz_duration = Number(doc.term_mcz_duration);}

    //doc.time = new Date();        //for TTL
    //doc.charging_end_time = new Date(doc.charging_end_time);
    //doc.charging_start_time = new Date(doc.charging_start_time);
    i++;
    db.cep3g_sample.update({_id : doc._id},{$set : {in_flag : 1}}); //==== cep 3g update
    db.cep3g_insert.save(doc); //============================== cep 3g insert
})
print(new Date().toLocaleTimeString()+'\tprocess: '+i+' rec');
db.cep3g_sample.findOne({in_flag:1},{date_time:1,in_flag:1});
db.cep3g_insert.findOne({},{date_time:1,PT_OID:1,SITE_ID:1,HANGOVER:1});