/*
var site3g = db.siteview3g_sample.find({}, {
 "BTS_CODE": 1,          //"BTS_CODE" : "RNW30",
 "SITE_ID": 1,           //"SITE_ID" : 10001,
 "SITE_NAME": 1,         //"SITE_NAME" : "中正仁愛",
 "BELONG_TO": 1,         //"BELONG_TO" : "第一維運處",
 "CELL_NO": 1,           //----------"CELL_NO" : 10361,
 "LAC_OD": 1,            //----------"LAC_OD" : 11116,
 "BTS_ADDRESS" : 1,      //"BTS_ADDRESS" : "台北市中正區",
 "BTS_PROP" : 1,         //"BTS_PROP" : "都會區(3小時內維修)",
 "BTS_STATUS" : 1,       //"BTS_STATUS" : "OnAir(BI完工)",
 "OPERATION_UNIT" : 1    //"OPERATION_UNIT" : "北市南維運一課",
 });
 var cdr3g = db.cep3g_sample.find({},{
 "_id" : 1,
 "called_number" : 1,            //^[]*index
 "called_imei" : 1,              //#index pt
 "called_imsi" : 1,              //^[]
 "called_subs_last_ci" : 1,      //#index site
 "called_subs_last_lac" : 1,     //#index site
 "called_subs_last_mcc" : 1,
 "called_subs_last_mnc" : 1,
 "calling_imei" : 1,             //#index pt
 "calling_imsi" : 1,             //^[]
 "calling_number" : 1,           //^[]
 "calling_subs_last_ci" : 1,     //#index site
 "calling_subs_last_lac" : 1,    //#index site
 "calling_subs_last_mcc" : 1,
 "calling_subs_last_mnc" : 1,
 "cause_for_termination" : 1,    //____$
 "charging_end_time" : 1,        //#index time
 "charging_start_time" : 1,      //#index time
 "exchange_id" : 1,              //[]
 "orig_mcz_duration" : 1,
 "radio_network_type" : 1,
 "record_type" : 1,
 "term_mcz_duration" : 1,
 "date_time" : 1,                //#index time
 //"time" : 1
 });

//--------------------------------  build map  --------------------------------
//use cdr
var cdr3g, site3g_map = {}, phone_map = {};
print('build site3g start: ',new Date());
function buildSite3gMap(){
    var obj = {};
    var site3g = db.siteview3g.find({});
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
            BTS_PROP    : site.BTS_PROP,
            BTS_STATUS  : site.BTS_STATUS,
            OPERATION_UNIT : site.OPERATION_UNIT
        };
        site3g_map[site.LAC_OD +'-'+ site.CELL_NO] = obj;
    });
}
buildSite3gMap();
print('build site3g end: ',new Date());
print();
print('build phone start: ',new Date());
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
        phone_map[type.IMEI_VALUE] = obj;
    });
}
buildPhoneMap();
print('build phone end: ',new Date());
print();
print('cdr 3g start: ',new Date());
var cdr_merge = db.cep3g_sample.find({},{
        "_id" : 1,
        "called_number" : 1,            //^[]*index
        "called_imei" : 1,              //#index pt
        "called_imsi" : 1,              //^[]
        "called_subs_last_ci" : 1,      //#index site
        "called_subs_last_lac" : 1,     //#index site
        "called_subs_last_mcc" : 1,
        "called_subs_last_mnc" : 1,
        "calling_imei" : 1,             //#index pt
        "calling_imsi" : 1,             //^[]
        "calling_number" : 1,           //^[]
        "calling_subs_last_ci" : 1,     //#index site
        "calling_subs_last_lac" : 1,    //#index site
        "calling_subs_last_mcc" : 1,
        "calling_subs_last_mnc" : 1,
        "cause_for_termination" : 1,    //____$
        "charging_end_time" : 1,        //#index time
        "charging_start_time" : 1,      //#index time
        "exchange_id" : 1,              //[]
        "orig_mcz_duration" : 1,
        "radio_network_type" : 1,
        "record_type" : 1,
        "term_mcz_duration" : 1,
        "date_time" : 1                //#index time
        //"time" : 1
});
print('cdr_merge');
cdr_merge.forEach(function(doc) {
    var item = {
        _id                  : doc._id,
        called_number        : doc.called_number,
        called_imei          : doc.called_imei,
        called_imsi          : doc.called_imsi,
        called_subs_last_ci  : doc.called_subs_last_ci,
        called_subs_last_lac : doc.called_subs_last_lac,
        called_subs_last_mcc : doc.called_subs_last_mcc,
        called_subs_last_mnc : doc.called_subs_last_mnc,
        calling_imei         : doc.calling_imei,
        calling_imsi         : doc.calling_imsi,
        calling_number       : doc.calling_number,
        calling_subs_last_ci : doc.calling_subs_last_ci,
        calling_subs_last_la : doc.calling_subs_last_la,
        calling_subs_last_mcc: doc.calling_subs_last_mcc,
        calling_subs_last_mnc: doc.calling_subs_last_mnc,
        cause_for_terminatio : doc.cause_for_terminatio,
        charging_end_time    : doc.charging_end_time,
        charging_start_time  : doc.charging_start_time,
        exchange_id          : doc.exchange_id,
        orig_mcz_duration    : doc.orig_mcz_duration,
        radio_network_type   : doc.radio_network_type,
        record_type          : doc.record_type,
        term_mcz_duration    : doc.term_mcz_duration,
        date_time            : doc.date_time
    };
    //embed

    //print(item.record_type);
    //print(typeof(item.calling_imei.substr(0,8)));
    if(item.record_type=="1") {
        //try {
            var cell = item.calling_subs_last_lac +'-'+ item.calling_subs_last_ci;
            print('calling_cell:',item.record_type+':'+cell);
            try {
                item.SITE_ID        = site3g_map[cell].SITE_ID;
                item.SITE_NAME      = site3g_map[cell].SITE_NAME;
                item.BELONG_TO      = site3g_map[cell].BELONG_TO;
                item.CELL_NO        = site3g_map[cell].CELL_NO; //#
                item.LAC_OD         = site3g_map[cell].LAC_OD;   //#
                item.BTS_ADDRESS    = site3g_map[cell].BTS_ADDRESS;
                item.BTS_PROP       = site3g_map[cell].BTS_PROP;
                item.BTS_STATUS     = site3g_map[cell].BTS_STATUS;
                item.OPERATION_UNIT = site3g_map[cell].OPERATION_UNIT;
            } catch (e) {
                item.SITE_ID = '-----';
            }
            /*var calling_imei = item.calling_imei.substr(0, 8);
            //var calling_imei = Number(item.calling_imei.substr(0, 8));
            //print('calling_imei', item.calling_imei);
            //print('calling_imei', calling_imei);
            try {
                //item.IMEI_VALUE  = phone_map[calling_imei].IMEI_VALUE;
                item.PT_OID      = phone_map[calling_imei].PT_OID;
                item.DMS_ID      = phone_map[calling_imei].DMS_ID;
                item.VENDOR      = phone_map[calling_imei].VENDOR;
                item.MODEL       = phone_map[calling_imei].MODEL;
            } catch (e) {
                if (undefined) {
                    item.PT_OID = 99999999;
                }
            }
        } catch (e){
            item.PT_OID = null;
        }*/
    }else if(item.record_type=="2") {
        //try {
            var cell = item.called_subs_last_lac +'-'+ item.called_subs_last_ci;
            print('called_cell:',item.record_type+':'+cell);
            try {
                item.SITE_ID        = site3g_map[cell].SITE_ID;
                item.SITE_NAME      = site3g_map[cell].SITE_NAME;
                item.BELONG_TO      = site3g_map[cell].BELONG_TO;
                item.CELL_NO        = site3g_map[cell].CELL_NO; //#
                item.LAC_OD         = site3g_map[cell].LAC_OD;   //#
                item.BTS_ADDRESS    = site3g_map[cell].BTS_ADDRESS;
                item.BTS_PROP       = site3g_map[cell].BTS_PROP;
                item.BTS_STATUS     = site3g_map[cell].BTS_STATUS;
                item.OPERATION_UNIT = site3g_map[cell].OPERATION_UNIT;
            } catch (e) {
                item.SITE_ID = '-----';
            }
            /*
            var called_imei = item.called_imei.substr(0, 8);
            //print('called_imei', item.called_imei);
            //print('called_imei', called_imei);
            try {
                item.PT_OID      = phone_map[called_imei].PT_OID;
                item.IMEI_VALUE  = phone_map[called_imei].IMEI_VALUE;
                item.DMS_ID      = phone_map[called_imei].DMS_ID;
                item.VENDOR      = phone_map[called_imei].VENDOR;
                item.MODEL       = phone_map[called_imei].MODEL;
            } catch (e) {
                if (undefined) {
                    item.PT_OID = 99999999;
                }
            }
        } catch (e){
            item.PT_OID = null;
        }*/
    }

    //printjson(item);
    db.cdr3g_test.insert(item);

    //doc.flag = 1;
    //db.cep3g_sample.save(doc);
});
print('cdr 3g end: ',new Date());
print();


/*

var aaa = db.cep3g_sample.findOne({},{called_imei:1,calling_imei:1})
> aaa
{
    "_id" : ObjectId("551149a04a9f8634b5000001"),
    "called_imei" : null,
    "calling_imei" : "352072065648840"
}
> phone_map[(aaa.calling_imei).substr(0,8)]
{
    "PT_OID" : 29436,
    "IMEI_VALUE" : 35207206,
    "DMS_ID" : 12240,
    "VENDOR" : "Apple",
    "MODEL" : "iPhone 6_A1586"
}
> phone_map[(aaa.calling_imei).substr(0,8)].VENDOR
Apple*/



//var value = 'value3';
//for(var key in site3g_map)
//{
//    if(site3g_map[key]==value)
//        print(key);
//}
//
//foundKeys = Object.keys(site3g_map).filter(function(key) {
//    return site3g_map[key] == value;
//});
//
//for(var pair in site3g_map){
//    if(site3g_map[key]==)
//    print(Object.keys(key));
//};

//for(var key in site3g_map){print(key)}