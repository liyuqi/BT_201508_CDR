//============================= 3g clone collection =======================
//clone
db.cloneCollection(from, collection, query)
{ cloneCollection: "fluentd.phone_sample", from: "172.17.24.196:27017", query: { active: true } }
db.cloneCollection({
    cloneCollection: "fluentd.phone_sample",
    from: "172.17.24.196:27017",
    query: {active: true}
});
db.phone_sample.cloneCollection("172.17.24.196:27017", "fluentd.phone_sample", {});

//db.cloneCollection(from, collection, query)
//{ cloneCollection: "users.profiles", from: "mongodb.example.net:27017", query: { active: true } }
mongoexport -d db_name -c src_collection | mongoimport -d db_name -c dst_collection --drop
//netsh advfirewall firewall add rule name="MongoDB" protocol=TCP dir=in localport=27017 action=allow
//================  btserver4 to local  ======================
mongoexport -h 172.17.24.196 -d fluentd -c phone_sample | mongoimport -h 172.17.24.107 -d cdr -c phone_sample --drop
mongoexport -h 172.17.24.196 -d fluentd -c siteview2g_sample | mongoimport -h 172.17.24.107 -d cdr -c siteview2g_sample --drop
mongoexport -h 172.17.24.196 -d fluentd -c siteview3g_sample | mongoimport -h 172.17.24.107 -d cdr -c siteview3g_sample --drop
mongoexport -h 172.17.24.196 -d tos -c cdr3g_sample | mongoimport -h 172.17.24.107 -d cdr -c cdr3g_sample --drop
mongoexport -h 172.17.24.196 -d tos -c cep2g_sample | mongoimport -h 172.17.24.107 -d cdr -c cdr2g_sample --drop

mongoexport  -d fluentd -c phone_sample      | mongoimport  -d cdr -c phone_sample --drop
mongoexport  -d fluentd -c siteview2g_sample | mongoimport  -d cdr -c siteview2g_sample --drop
mongoexport  -d fluentd -c siteview3g_sample | mongoimport  -d cdr -c siteview3g_sample --drop

mongoexport -d tos -c cep3g_sample | mongoimport -d cdr -c cep3g_sample --drop
mongoexport -d cdr -c cep3g_sample | mongoimport -d cdr -c cep3g1 --drop
mongoexport -d tos -c cep2g | mongoimport -d cdr -c cep2g_sample --drop
mongoexport -d tos -c cep.gprs | mongoimport -d cdr -c cepgprs --drop

//clone cdr from bt4 to bt3 for Roger
mongoexport -h 192.168.0.196 -d cdr -c cep2g_sample | mongoimport -h 192.168.0.194 -d cdr -c cep2g_sample --drop
mongoexport -h 192.168.0.196 -d cdr -c cep3g_sample | mongoimport -h 192.168.0.194 -d cdr -c cep3g_sample --drop
mongoexport -h 192.168.0.196 -d cdr -c cepgprs | mongoimport -h 192.168.0.194 -d cdr -c cepgprs --drop
mongoexport -h 192.168.0.196 -d cdr -c phone_sample | mongoimport -h 192.168.0.194 -d cdr -c phone_sample --drop
mongoexport -h 192.168.0.196 -d cdr -c siteview2g_sample | mongoimport -h 192.168.0.194 -d cdr -c siteview2g_sample --drop
mongoexport -h 192.168.0.196 -d cdr -c siteview3g_sample | mongoimport -h 192.168.0.194 -d cdr -c siteview3g_sample --drop

mongoexport -h 172.17.24.196 -d cdr -c cep3g_string | mongoimport -h 172.17.24.107 -d cdr -c cep3g_string --drop
mongoexport -h 172.17.24.196 -d cdr -c cep2g_string | mongoimport -h 172.17.24.107 -d cdr -c cep2g_string --drop


//clone cdr2g on win mongo cdr
echo %DATE% %TIME%
mongoexport -d cdr -c cdr2g_sample | mongoimport -d cdr -c cep2g1 --drop
echo %DATE% %TIME%
mongoexport -d cdr -c cdr2g_sample | mongoimport -d cdr -c cep2g2 --drop
echo %DATE% %TIME%
mongoexport -d cdr -c cdr2g_sample | mongoimport -d cdr -c cep2g3 --drop
echo %DATE% %TIME%

// cdr collections
cep2g_sample
cep3g_sample
cepgprs
phone_sample
siteview2g_sample
siteview3g_sample


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
