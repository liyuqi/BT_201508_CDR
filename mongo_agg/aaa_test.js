//var aaa = 'a_collection';

//insert
for(var i=0; i<10; i++)    db.aaa.insert({'a':1,'b':1,'c':i});

//load
var col = db.aaa.find({},{});

//update
while (col.hasNext()) {
    var doc = col.next();
    if (doc.up_flag != 1) {
        doc.c += 5;
        doc.up_flag = 1;
        print(doc._id.toString());
        db.aaa.update({'_id': doc._id}, {$set: doc})
    }
    else{
        db.aaa.update({'_id': doc._id}, {$set: {up_flag:1}})
    }
}
//find
db.aaa.find({},{});


db.cep2g_sample.find({CALLTRANSACTIONTYPE:{$in:["1","2"]}},{_id:1,CALLTRANSACTIONTYPE:1});

cdr2g.forEach(function (doc) { //================= cep 2g find =================
    if (doc.up_flag != 1) {  //================================================= update done, erich up_flag:1
        //if (doc.CALLTRANSACTIONTYPE == "1") {
            print(doc.CALLTRANSACTIONTYPE)
        //}
    }
};