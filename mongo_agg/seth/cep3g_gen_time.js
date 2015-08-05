// mongo cdr cep3g_gen_time.js --port 40000 --eval "var start = 0, end = 2, pick = 1000" > cep3g_gen_time.txt

print(new Date().toLocaleTimeString()+'\tprocess: start');


for (var day = start; day < end; day++) {
    var cdr3g = db.cep3g_sample.find({
        //time : interval
        record_type:{$in:["1","2"]}
    },{}).limit(pick).sort({date_time:1});    //seth 改，這樣才能讓cep3g_gen的date_time 有順序寫入。 建議在cep3g_sample建立date_time 的index
    cdr3g.forEach(function (doc) {

        var item = doc;
        item._id = new ObjectId();
        item.time = new ISODate
                        (new Date
                                (new Date(
                                    new Date().getTime() + day * 24 * 60 * 60 * 1000)
                                ).toJSON().substr(0, 11)
                            + item.date_time.substr(11,8)		// seth 問，為什麼要取 cep3g_sample 的date_time? 不能自己gen嗎?
                        );

        //item.STARTOFCHARGINGDATE = new Date((new Date).getTime() + day * 24 * 60 * 60 * 1000 /*+ milli*/).toJSON().substr(0, 10);
        //item.TIMESTAMP = new Date((new Date).getTime() + day * 24 * 60 * 60 * 1000 /*+ milli*/).toLocaleTimeString();
        item.date_time = item.time.toJSON();		//seth 改
		
 /*gprs*/       //item.G_RECORD_OPENING_TIME = new Date((new Date).getTime() + day * 24 * 60 * 60 * 1000 /*+ milli*/).toJSON();
        //print(item.STARTOFCHARGINGDATE + '\t' + item.TIMESTAMP + '\t' + item.time.toJSON());
        db.cep3g_gen1.insert(item);  //seth 測試用
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
