// mongo cdr cep3g_gen_slow.js --port 40000 --eval "var start = 0, end = 6, pick = 100000" > ~/fluentd/agg/log/cep3g_gen_slow.txt

print(new Date().toLocaleTimeString()+'\tprocess: start');

 function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 1; i > 0; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

for (var day = start; day < end; day++) {
    var cdr3g = db.cep3g_sample.find({
        //time : interval
        record_type:{$in:["1","2"]}
    },{}).limit(pick);    //seth 2改，用自己的time來模擬，取消用cep3g_sample的 date_time，所以不用sort。
    cdr3g.forEach(function (doc) {

        var item = doc;
        item._id = new ObjectId();
        item.time = new Date()

        //item.STARTOFCHARGINGDATE = new Date((new Date).getTime() + day * 24 * 60 * 60 * 1000 /*+ milli*/).toJSON().substr(0, 10);
        //item.TIMESTAMP = new Date((new Date).getTime() + day * 24 * 60 * 60 * 1000 /*+ milli*/).toLocaleTimeString();
		
        item.date_time = item.time.toJSON();
 /*gprs*/       //item.G_RECORD_OPENING_TIME = new Date((new Date).getTime() + day * 24 * 60 * 60 * 1000 /*+ milli*/).toJSON();
        //print(item.STARTOFCHARGINGDATE + '\t' + item.TIMESTAMP + '\t' + item.time.toJSON());
		
        db.cep3g_gen1.insert(item);	//seth 測試用
		sleep(11)		//seth 改  //不暫停，每秒可以gen 450 rec，表示寫入一筆只要 2.22 毫秒。 用暫停，模擬真實 23w rec/hr = 64/sec ，表示一筆需要 15.62毫秒。 
								   //15-2=13毫秒。經過測試，2000筆用35秒 ， 表示一筆用了17.5毫秒。建議暫停 11毫秒就好。	
        //milli++;
    });

    print(new Date().toLocaleTimeString()+'\tprocess: day'+day+' ok');	//seth 改
}

print(new Date().toLocaleTimeString()+'\tprocess: end');


//item.time = (new ISODate
//                (new Date
//                        (new Date(
//                            new Date() + 1 * 24 * 60 * 60 * 1000)
//                        ).toJSON().substr(0, 11)
//                    + '18:25:14'
//                )
//            ).toJSON();
