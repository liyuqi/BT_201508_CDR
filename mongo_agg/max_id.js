//
//mongo cdr max_id.js
//mongo cdr --eval "var max_id = db.cep3g_sample.find({record_type:{\$in:['1','2']}},{_id:1}).sort({_id:-1}).limit(1); max_id.shellPrint()"
var max_id = db.cep3g_sample.find({record_type:{$in:['1','2']}},{_id:1}).sort({_id:-1}).limit(1).shellPrint()
.forEach(function(doc){
    print(doc._id);
});

// mongo cdr --eval "var n = (db.cep3g_sample.count() - db.cep3g_agg.count())/$pick; print(Math.ceil(n));"

//mongo cdr --eval "var n = (db.cep3g_sample.count() - db.cep3g_agg.count())/$pick; print(Math.ceil(n));"