//============================= 3g clone collection =======================
//clone
//db.cloneCollection(from, collection, query)
//{ cloneCollection: "fluentd.phone_sample", from: "172.17.24.196:27017", query: { active: true } }
db.cloneCollection({
    cloneCollection: "fluentd.phone_sample",
    from: "172.17.24.196:27017",
    query: {active: true}
});
db.phone_sample.cloneCollection("172.17.24.196:27017", "fluentd.phone_sample", {});

//db.cloneCollection(from, collection, query)
//{ cloneCollection: "users.profiles", from: "mongodb.example.net:27017", query: { active: true } }
//mongoexport -d db_name -c src_collection | mongoimport -d db_name -c dst_collection --drop
//netsh advfirewall firewall add rule name="MongoDB" protocol=TCP dir=in localport=27017 action=allow
//================  btserver4 to local  ======================
//mongoexport -h 172.17.24.196 -d fluentd -c phone_sample | mongoimport -h 172.17.24.107 -d cdr -c phone_sample --drop
//mongoexport -h 172.17.24.196 -d fluentd -c siteview2g_sample | mongoimport -h 172.17.24.107 -d cdr -c siteview2g_sample --drop
//mongoexport -h 172.17.24.196 -d fluentd -c siteview3g_sample | mongoimport -h 172.17.24.107 -d cdr -c siteview3g_sample --drop
//mongoexport -h 172.17.24.196 -d tos -c cdr3g_sample | mongoimport -h 172.17.24.107 -d cdr -c cdr3g_sample --drop
//mongoexport -h 172.17.24.196 -d tos -c cep2g_sample | mongoimport -h 172.17.24.107 -d cdr -c cdr2g_sample --drop
//
//mongoexport  -d fluentd -c phone_sample      | mongoimport  -d cdr -c phone_sample --drop
//mongoexport  -d fluentd -c siteview2g_sample | mongoimport  -d cdr -c siteview2g_sample --drop
//mongoexport  -d fluentd -c siteview3g_sample | mongoimport  -d cdr -c siteview3g_sample --drop
//
//mongoexport -d tos -c cep3g_sample | mongoimport -d cdr -c cep3g_sample --drop
//mongoexport -d cdr -c cep3g_sample | mongoimport -d cdr -c cep3g1 --drop
//mongoexport -d tos -c cep2g | mongoimport -d cdr -c cep2g_sample --drop
//mongoexport -d tos -c cep.gprs | mongoimport -d cdr -c cepgprs --drop

//clone cdr from bt4 to bt3 for Roger
//mongoexport -h 192.168.0.190 -d cdr -q '{CALLTRANSACTIONTYPE:{$in:["1","2"]}}' -c cep2g_sample| mongoimport -h 192.168.0.107 -d cdr -c cep2g_sample --drop;
//mongoexport -h 192.168.0.190 -d cdr -q '{}' -c cep3g_sample      | mongoimport -h 192.168.0.196 -d cdr -c cep3g_sample --drop;
//mongoexport -h 192.168.0.190 -d cdr -q '{}' -c phone_sample      | mongoimport -h 192.168.0.107 -d cdr -c phone_sample --drop;
//mongoexport -h 192.168.0.190 -d cdr -q '{}' -c siteview2g_sample | mongoimport -h 192.168.0.107 -d cdr -c siteview2g_sample --drop;
//mongoexport -h 192.168.0.190 -d cdr -q '{}' -c siteview3g_sample | mongoimport -h 192.168.0.107 -d cdr -c siteview3g_sample --drop;
//mongoexport -h 192.168.0.190 -d cdr -q '{"RECORD_TYPE":"19",G_RECORD_OPENING_TIME:{$in:[/^2015-01-02/,/^2015-01-03/]}}' -c cepgprs_sample    | mongoimport -h 192.168.0.196 -d cdr -c cepgprs_sample --drop;
//
//mongoexport -h 172.17.24.196 -d cdr -q '{"record_type":{$in:["1","2"]}}' -c cep3g_string | mongoimport -h 172.17.24.107 -d cdr -c cep3g_string --drop
//mongoexport -h 172.17.24.196 -d cdr -q '{}' -c cep2g_string | mongoimport -h 172.17.24.107 -d cdr -c cep2g_string --drop

//sudo scp btserver1@btserver1:/home/btserver4/backup/etc/hadoop/core-site.xml  /usr/local/hadoop/etc/hadoop/core-site.xml
//clone cdr2g on win mongo cdr
//echo %DATE% %TIME%
//mongoexport -d cdr -c cdr2g_sample | mongoimport -d cdr -c cep2g1 --drop
//echo %DATE% %TIME%
//mongoexport -d cdr -c cdr2g_sample | mongoimport -d cdr -c cep2g2 --drop
//echo %DATE% %TIME%
//mongoexport -d cdr -c cdr2g_sample | mongoimport -d cdr -c cep2g3 --drop
//echo %DATE% %TIME%

db.cep2g_sample.findOne({
    "CALLTRANSACTIONTYPE":{$in:["1","2"]}
},{
    "CALLDURATION" : 2,
    "CALLTRANSACTIONTYPE" : "1",
    "CAUSEFORTERMINATION" : "0",
    "EXCHANGEID" : "CHAMSC1",
    "LASTCELLID" : "33738",
    "LASTCELLID_LAC" : "30306",
    "LASTCELLID_MCCMNC" : "466 97",
    "MCRDESTINATIONNUMBER" : "",
    "OTHERMSRN" : "886983744762",
    "SERVEDIMEI" : "8784280546282978",
    "SERVEDIMSI" : "466974807435077",
    "SERVEDMSISDN" : "886973413001",
    "STARTOFCHARGINGDATE" : "2015-01-05",
    "TIMESTAMP" : "10:09:59",
    
    "up_flag" : 1,
    "SITE_ID" : "51022",
    "SITE_NAME" : "員林中正二",
    "BELONG_TO" : "第三維運處",
    "CELL_NO" : "33738",
    "LAC_OD" : "30306",
    "BTS_ADDRESS" : "彰化縣員林鎮",
    "SIM_TYPE" : "USIM",
    "CARRIER" : "台灣大哥大",
    "_id" : ObjectId("5524fc9fe4b00ac5bf08ea8a")
});

db.cep3g_sample.findOne({
    "record_type":{$in:["1","2"]}
},{
    "called_number" : 1,          //^[]#index
    "called_imei" : 1,              //#index pt
    "called_imsi" : 1,              //^[]
    "called_subs_last_ci" : 1,      //#index site
    "called_subs_last_lac" : 1,     //#index site

    "calling_imei" : 1,             //#index pt
    "calling_imsi" : 1,             //^[]
    "calling_number" : 1,           //^[]
    "calling_subs_last_ci" : 1,     //#index site
    "calling_subs_last_lac" : 1,    //#index site

    "cause_for_termination" : 1,    //____$
    "charging_end_time" : 1,        //#index time
    "charging_start_time" : 1,      //#index time
    "exchange_id" : 1,              //[]
    "orig_mcz_duration" : 1,
    "radio_network_type" : 1,
    "record_type" : 1,
    "term_mcz_duration" : 1,
    "date_time" : 1,                //#index time
    "_id":1
});

db.cepgprs.find({
    /*time: interval,up_falg:1,*/
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


/*
 //The following example models the tree using Nested Sets:

 db.categories.insert( { _id: "Books", parent: 0, left: 1, right: 12 } );
 db.categories.insert( { _id: "Programming", parent: "Books", left: 2, right: 11 } );
 db.categories.insert( { _id: "Languages", parent: "Programming", left: 3, right: 4 } );
 db.categories.insert( { _id: "Databases", parent: "Programming", left: 5, right: 10 } );
 db.categories.insert( { _id: "MongoDB", parent: "Databases", left: 6, right: 7 } );
 db.categories.insert( { _id: "dbm", parent: "Databases", left: 8, right: 9 } );

 //You can query to retrieve the descendants of a node:
 var databaseCategory = db.categories.findOne( { _id: "Databases" } );
 db.categories.find( { left: { $gt: databaseCategory.left }, right: { $lt: databaseCategory.right } } );

 var site3g = db.siteview3g.find({});
 db.cep3g_sample.find({ called_subs_last_lac:site3g.LAC_OD, called_subs_last_ci:site3g.CELL_NO});
 db.cep3g_sample.find({
 calling_subs_last_lac: {$exists: true},
 calling_subs_last_lac: site3g.LAC_OD,
 calling_subs_last_ci: {$exists: true},
 calling_subs_last_ci:site3g.CELL_NO
 });*/
