//date time example
/*

 new Date().toISOString();
 new Date().toJSON();
 new Date().toLocaleTimeString();
 new Date().toTimeString();

 new Date().toISOString();
 //2015-04-02T09:41:28.581Z
 new Date().toJSON();
 //2015-04-02T09:41:28.581Z
 new Date().toLocaleTimeString();
 //17:41:28
 new Date().toTimeString();
 //17:41:28 GMT+0800 (台北標準時間)

 new Date().toDateString();
 //Thu Apr 02 2015
 new Date().toLocaleDateString();
 //Thursday, April 02, 2015
 new Date().toLocaleString();
 //Thu Apr 02 2015 17:41:28 GMT+0800 (台北標準時間)
 new Date().toUTCString();
 //Thu, 02 Apr 2015 09:41:30 GMT
 */
/*
 Type	Number	Notes
 Double	1
 String	2
 Object	3
 Array	4
 Binary data	5
 Undefined	6	Deprecated.
 Object id	7
 Boolean	8
 Date	9
 Null	10
 Regular Expression	11
 JavaScript	13
 Symbol	14
 JavaScript (with scope)	15
 32-bit integer	16
 Timestamp	17
 64-bit integer	18
 Min key	255	Query with -1.
 Max key	127
 */


//============================= 3g format =======================
var cursorsite3g = db.
    var cursor3g = db.cep3g.find({},{
    "_id" : 1,
    //"called_number" : 1,          //^[]*index
    "called_imei" : 1,              //*index pt
    "called_imsi" : 1,              //^[]
    "called_subs_last_ci" : 1,      //*index site
    "called_subs_last_lac" : 1,     //*index site
    "called_subs_last_mcc" : 1,
    "called_subs_last_mnc" : 1,
    "calling_imei" : 1,             //*index pt
    "calling_imsi" : 1,             //^[]
    "calling_number" : 1,           //^[]
    "calling_subs_last_ci" : 1,     //*index site
    "calling_subs_last_lac" : 1,    //*index site
    "calling_subs_last_mcc" : 1,
    "calling_subs_last_mnc" : 1,
    "cause_for_termination" : 1,    //____$
    "charging_end_time" : 1,        //*index time
    "charging_start_time" : 1,      //*index time
    "exchange_id" : 1,              //[]
    "orig_mcz_duration" : 1,
    "radio_network_type" : 1,
    "record_type" : 1,
    "term_mcz_duration" : 1,
    "date_time" : 1,                //*index time
    //"time" : 1
});

new Date();
while (cursor3g.hasNext()) {
    var doc = cursor3g.next();
    doc.orig_mcz_duration = parseFloat(doc.orig_mcz_duration);
    doc.term_mcz_duration = parseFloat(doc.term_mcz_duration);
    doc.date_time = new Date(doc.date_time);
    doc.charging_end_time = new Date(doc.charging_end_time);
    doc.charging_start_time = new Date(doc.charging_start_time);
    db.cep3g_sample.insert(doc);
}
new Date();

//============================= 2g format =======================
var cursor2g = db.cep2g.find({},{
    "_id" : 1,
    "RECORDTYPE" : 1,
    "CALLTRANSACTIONTYPE" : 1,  //
    "SERVEDIMSI" : 1,           //^[]
    "SERVEDMSISDN" : 1,         //
    "SERVEDIMEI" : 1,           //*index pt
    "STARTOFCHARGINGDATE" : 1,//*index time
    //"STARTOFCHARGINGTIME" : 1,//*index time
    "TIMESTAMP" : 1,			//*index time
    "CALLDURATION" : 1,
    "OTHERMSRN" : 1,            //^[]
    "EXCHANGEID" : 1,           //[]
    "CAUSEFORTERMINATION" : 1,  //$
    "MCRDESTINATIONNUMBER" : 1, //
    "LASTCELLID_MCCMNC" : 1,
    "LASTCELLID_LAC" : 1,       //*index site
    "LASTCELLID" : 1           //*index site
});
print(new Date());
while (cursor2g.hasNext()) {
    var doc = cursor2g.next();
    doc.STARTOFCHARGINGTIME = new Date(doc.STARTOFCHARGINGDATE + " " + doc.TIMESTAMP);
    db.cep2g_sample.insert(doc);
}
print(new Date());

print(new Date());
var cursor = db.cep3g2.find();
while (cursor.hasNext()) {
    var doc = cursor.next();
    db.cep3g2.update({_id : doc._id}, {$set : {charging_end_time : new ISODate(doc.charging_end_time) }});
    db.cep3g2.update({_id : doc._id}, {$set : {charging_start_time : new ISODate(doc.charging_start_time) }});
    db.cep3g2.update({_id : doc._id}, {$set : {date_time : new ISODate(doc.date_time) }});
}
print(new Date());

