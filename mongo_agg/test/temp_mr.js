db.getCollection('').mapReduce(
    function(){
        for(var key in this){

            emit(key,{count:1});
        }
    }
    ,function(key,values){
        var total = 0;
        //for(var i in values){
        //    total += emits[i].count;
        //}

        values.forEach(function(value){
            total += value.count;
        });
        return {'count':total};
    }
    ,{
        //query: {        record_type:{$in:["1","2"]}    },
        out: {
            replace:"odtails_distinct1" //replace/merge/reduce
            //,inline:1 //use memory either shard
            //,sharded:1
            //,nonAtomic:0
        }}
);




var col= 'order_details';
var col_doc = db.getCollection(col.toString()).findOne();
var temp = db.getCollection(col.toString()).find().limit(10);
//var col_doc = db.cep3g_sample.findOne();
var col_fields = [];
for(var k in col_doc) col_fields.push(k);
printjson(temp[col_fields[k]]);



for (var key in temp){
    for(var i in col_fields) {
        var field_name = col_fields[i].toString();
        var obj = {};
        obj[field_name] = temp[key][col_fields[i]];
        printjson(obj);
    }
}