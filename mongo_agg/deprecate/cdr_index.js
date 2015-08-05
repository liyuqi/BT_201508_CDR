db.cep3g.find({},{
    "_id" : 1,
    "time" : 1,     //insert time
    "date_time" : 1,                //*index time

    // ============== MTC
    "term_mcz_duration" : 1,
    "called_number" : 1,            //^[]*index
    //"called_imsi" : 1,              //^[]
    SIM_TYPE:1,
    //"called_subs_last_ci" : 1,      //*index site
    //"called_subs_last_lac" : 1,     //*index site

    // ============== MOC
    "orig_mcz_duration" : 1,
    "calling_number" : 1,           //^[]
    //"calling_imsi" : 1,             //^[]
    SIM_TYPE:1,
    //"calling_subs_last_ci" : 1,     //*index site
    //"calling_subs_last_lac" : 1,    //*index site

    // ============== General usage
    "cause_for_termination" : 1,    //____$
    "charging_end_time" : 1,        //*index time
    "charging_start_time" : 1,      //*index time
    "exchange_id" : 1,              //[]
    "radio_network_type" : 1,
    "record_type" : 1,

    // ============== site
    "MSC_CODE" : 2,         //"MSC_CODE" : "JHOMSC4",   //(2g)
    "BTS_CODE": 1,          //"BTS_CODE" : "RNW30",
    "SITE_ID": 1,           //"SITE_ID" : 10001,
    "SITE_NAME": 1,         //"SITE_NAME" : "中正仁愛",
    "BELONG_TO": 1,         //"BELONG_TO" : "第一維運處",
    "CELL_NO": 1,           //----------"CELL_NO" : 10361,
    "LAC_OD": 1,            //----------"LAC_OD" : 11116,
    "BTS_ADDRESS" : 1,      //"BTS_ADDRESS" : "台北市中正區",

    // ============== phone
    //"called_imei" : 1,              //*index pt
    //"calling_imei" : 1,             //*index pt
    "PT_OID" : 1,       //"PT_OID" : 1,
    "IMEI_VALUE" :1,    //"IMEI_VALUE" : NumberLong(33229036),
    "DMS_ID" : 1,       //"DMS_ID" : 1,
    "VENDOR" : 1,       //"VENDOR" : "ALCATEL",
    "MODEL" : 1         //"OT511",
});


db.cep2g.find({},{
    "_id" : 1,
    "CALLTRANSACTIONTYPE" : 1,  //NETWORK
    "STARTOFCHARGINGDATE" : 1,//*index time
    "STARTOFCHARGINGTIME" : 1,//*index time
    "TIMESTAMP" : 1,			//*index time

    //"RECORDTYPE" : 1,
    //"SERVEDIMSI" : 1,           //^[]
    SIM_TYPE:1,
    //"SERVEDMSISDN" : 1,         //
    //"LASTCELLID_MCCMNC" : 1,
    //"LASTCELLID_LAC" : 1,       //*index site
    //"LASTCELLID" : 1           //*index site

    // ============== General
    "CALLDURATION" : 1,
    "OTHERMSRN" : 1,            //^[]
    CARRIER:1,
    "EXCHANGEID" : 1,           //[]
    "CAUSEFORTERMINATION" : 1,  //$
    "MCRDESTINATIONNUMBER" : 1, //

    // ============== site
    "MSC_CODE" : 2,         //"MSC_CODE" : "JHOMSC4",   //(2g)
    "BTS_CODE": 1,          //"BTS_CODE" : "RNW30",
    "SITE_ID": 1,           //"SITE_ID" : 10001,
    "SITE_NAME": 1,         //"SITE_NAME" : "中正仁愛",
    "BELONG_TO": 1,         //"BELONG_TO" : "第一維運處",
    "CELL_NO": 1,           //----------"CELL_NO" : 10361,
    "LAC_OD": 1,            //----------"LAC_OD" : 11116,
    "BTS_ADDRESS" : 1,      //"BTS_ADDRESS" : "台北市中正區",

    // ============== phone
    //"SERVEDIMEI" : 1,           //*index pt
    "PT_OID" : 1,       //"PT_OID" : 1,
    "IMEI_VALUE" :1,    //"IMEI_VALUE" : NumberLong(33229036),
    "DMS_ID" : 1,       //"DMS_ID" : 1,
    "VENDOR" : 1,       //"VENDOR" : "ALCATEL",
    "MODEL" : 1         //"OT511",
});