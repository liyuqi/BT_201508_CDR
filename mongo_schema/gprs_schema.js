
//var d = new Date();
//var t1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(),0,0,0);
//var t0 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()-1,0,0,0);
//var interval = {$gte:t0,$lt:t1}; //ISODate("2015-03-31T16:00:00Z")
db.cepgprs_sample.find({
    "RECORD_TYPE":"19"
},{
    "RECORD_TYPE"             : 1
    , "SERVED_MSISDN"           : 1
    , "G_UPLINK"                : 1 //#sum
    , "G_DOWNLINK"              : 1 //#sum
    , "G_RECORD_OPENING_TIME"   : 1
    , "G_DIAGNOSTICS"           : 1
    //site
    , COUNTY : 1 //縣市3 zh zhar
    , DISTRICT : 1//"$BTS_CODE" //地區
    , SITE_NAME : 1
    , SITE_ID : 1
    //, "CALLED_SUBS_FIRST_LAC"   : 1
    //, "CALLED_SUBS_FIRST_SAC"   : 1
    ,"_id":0
});

db.cepgprs_sample.find({
    /*time: interval,up_falg:1,*/
    //"RECORD_TYPE":"99"
    "RECORD_TYPE":"19"
    },{
      "RECORD_TYPE"             : 1
    , "SERVED_MSISDN"           : 1
    , "G_UPLINK"                : 1
    , "G_DOWNLINK"              : 1
    , "G_RECORD_OPENING_TIME"   : 1
    , "G_DIAGNOSTICS"           : 1
    , "CALLED_SUBS_FIRST_LAC"   : 1
    , "CALLED_SUBS_FIRST_SAC"   : 1
    ,"_id":0
}).pretty();

db.cepgprs_sample.findOne(
{
    "_id" : ObjectId("54c76ea1e4b0aedfdeaff418"),
    "RECORD_TYPE" : "19",
    "POTENTIAL_DUPLICATE" : "0",
    "SYSTEM_TYPE" : "3",
    "RECORD_SEQ_NUM" : "7472295",
    "SERVED_IMSI" : "466974106932519",
    "RECORD_OPENING_TIME" : "2015-01-02 23:45:00",
    "SERVED_IMEI" : "3526510618337478",
    "SERVED_MSISDN" : "886987611519",
    "SGSN_ADDRESS" : "103.2.219.53",
    "GGSN_ADDRESS" : "61.31.43.104",
    "CHARGING_ID" : "867367205",
    "APN_NETWORK" : "internet",
    "APN_OPERATOR" : "",
    "SERVED_PDP_TYPE_ORG" : "1",
    "SERVED_PDP_ADDRESS" : "10.96.180.103",
    "LOCATION_AREA_CODE" : "0",
    "ROUTING_AREA" : "0",
    "CELL_IDENTITY" : "0",
    "SGSN_CHANGE" : "0",
    "S_CHARGING_CHARACTERISTICS" : "0",
    "PLMN_ID" : "406679",
    "NETWORK_INITIATED_PDP_CONTEXT" : "0",
    "S_CAUSE_FOR_RECORD_CLOSING" : "0",
    "AIR_INTERFACE" : "0",
    "S_COMPLETE" : "0",
    "S_UPLINK" : "0",
    "S_DOWNLINK" : "0",
    "S_QOS_REQUESTED01" : "00",
    "S_QOS_REQUESTED02" : "00",
    "S_QOS_REQUESTED03" : "00",
    "S_QOS_REQUESTED04" : "00",
    "S_QOS_REQUESTED05" : "00",
    "S_QOS_REQUESTED06" : "00",
    "S_QOS_REQUESTED07" : "00",
    "S_QOS_REQUESTED08" : "00",
    "S_QOS_REQUESTED09" : "00",
    "S_QOS_REQUESTED10" : "00",
    "S_QOS_REQUESTED11" : "00",
    "S_QOS_REQUESTED12" : "00",
    "S_QOS_REQUESTED13" : "00",
    "S_QOS_NEGOTIATED01" : "00",
    "S_QOS_NEGOTIATED02" : "00",
    "S_QOS_NEGOTIATED03" : "00",
    "S_QOS_NEGOTIATED04" : "00",
    "S_QOS_NEGOTIATED05" : "00",
    "S_QOS_NEGOTIATED06" : "00",
    "S_QOS_NEGOTIATED07" : "00",
    "S_QOS_NEGOTIATED08" : "00",
    "S_QOS_NEGOTIATED09" : "00",
    "S_QOS_NEGOTIATED10" : "00",
    "S_QOS_NEGOTIATED11" : "00",
    "S_QOS_NEGOTIATED12" : "00",
    "S_QOS_NEGOTIATED13" : "00",
    "S_RECORD_OPENING_TIME" : "",
    "S_TIMESTAMP" : "",
    "S_FIRST_SEQUENCE_NUMBER" : "0",
    "S_LAST_SEQUENCE_NUMBER" : "0",
    "S_DURATION" : "0",
    "G_CHARGING_CHARACTERISTICS" : "8",
    "G_CAUSE_FOR_RECORD_CLOSING" : "1",
    "G_COMPLETE" : "1",
    "G_UPLINK" : "329532",
    "G_DOWNLINK" : "20642941",
    "G_QOS_NEGOTIATED01" : "01",
    "G_QOS_NEGOTIATED02" : "02",
    "G_QOS_NEGOTIATED03" : "93",
    "G_QOS_NEGOTIATED04" : "96",
    "G_QOS_NEGOTIATED05" : "8F",
    "G_QOS_NEGOTIATED06" : "FE",
    "G_QOS_NEGOTIATED07" : "74",
    "G_QOS_NEGOTIATED08" : "80",
    "G_QOS_NEGOTIATED09" : "00",
    "G_QOS_NEGOTIATED10" : "00",
    "G_QOS_NEGOTIATED11" : "00",
    "G_QOS_NEGOTIATED12" : "4F",
    "G_QOS_NEGOTIATED13" : "00",
    "G_QOS_NEGOTIATED14" : "00",
    "G_QOS_NEGOTIATED15" : "00",
    "G_RECORD_OPENING_TIME" : "2015-01-02 23:45:00",
    "G_TIMESTAMP" : "2015-01-02 23:45:49",
    "G_FIRST_SEQUENCE_NUMBER" : "6",
    "G_LAST_SEQUENCE_NUMBER" : "6",
    "G_DURATION" : "49",
    "CDR_STORED" : "0",
    "ICID" : "",
    "SERVICE_CENTRE" : "0",
    "RECORDING_ENTITY" : "0",
    "CALLING_PARTY_NUMBER" : "",
    "DESTINATION_NUMBER" : "",
    "MESSAGE_REFERENCE" : "00",
    "SMS_RESULT" : "0",
    "S_UPLINK_KBYTEPS" : "0",
    "S_DOWNLINK_KBYTEPS" : "0",
    "G_UPLINK_KBYTEPS" : "329532",
    "G_DOWNLINK_KBYTEPS" : "20642941",
    "DIAGNOSTICS_VALUE" : "00",
    "DIAGNOSTICS_INITIATION_CAUSE" : "00",
    "DIAGNOSTICS_PROCESS_FAMILYID" : "",
    "DIAGNOSTICS_SGSN_ERROR_CAUSE" : "00000000",
    "G_DIAGNOSTICS" : "FFFF",
    "CALLED_SUBS_FIRST_MNC_MCC" : "1046697",
    "CALLED_SUBS_FIRST_LAC" : "31112",
    "CALLED_SUBS_FIRST_SAC" : "35540",
    "GGSN_ADDRESS4" : null
});