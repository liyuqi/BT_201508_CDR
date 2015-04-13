// mongo cdr genCDR2g.js > genCDR_result.txt
//var limit_size = 50000;
//var target_size = 50000000;
//var cdr2g = db.cep2g_sample.find({},{}).limit(limit_size);
//var cdr2g = db.cep2g_sample.find({},{}).limit(100000);

var row = 0 ;
print(new Date().toLocaleTimeString()+'\tprocess: start');
for (var day = 0; day <5; day++) {
//for (var day = 5; day > 0; day--) {
//    var milli = 0;
    var cdr2g = db.cep2g_sample.find({},{}).limit(100000);
    //for (var milli = 0; milli < 1000; milli++) {
    cdr2g.forEach(function (doc) {

        var item = doc;
        item._id = new ObjectId();
        item.time = new Date((new Date).getTime() + day * 24 * 60 * 60 * 1000 /*+ milli*/);
        //item.STARTOFCHARGINGDATE = new Date((new Date).getTime() + day * 24 * 60 * 60 * 1000 /*+ milli*/).toJSON().substr(0, 10);
        //item.TIMESTAMP = new Date((new Date).getTime() + day * 24 * 60 * 60 * 1000 /*+ milli*/).toLocaleTimeString();
        //print(item.STARTOFCHARGINGDATE + '\t' + item.TIMESTAMP + '\t' + item.time.toJSON());
        db.gen_2g.insert(item);
        //milli++;
    });

    print(new Date().toLocaleTimeString()+'\tprocess: day'+day);
}

print(new Date().toLocaleTimeString()+'\tprocess: end');


//'identifier':ID[Math.floor(Math.random()*ID.length)],
//'message':MSG[Math.floor(Math.random()*MSG.length)],
//------------------------------------DD*HH*mm*ss*ms   + rand
//'time':new Date((new Date).getTime() - 1*24*60*60*1000 + i), //Math.floor((Math.random()*23)+1)*60*60*1000)
//-----------------------------------------DD*HH*mm*ss*ms   + rand
//'TIMESTAMP':new Date((new Date).getTime() - 1*24*60*60*1000 + i) //Math.floor((Math.random()*23)+1)*60*60*1000)
