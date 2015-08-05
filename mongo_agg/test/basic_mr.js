//====================================== basic M R =================================
//mongo cdr --port 40000 basic_mr.js --eval "var src_col = 'siteview2g_sample'" > ./basic_mr_$(date +"%Y%m%d")_$(date +"%H%M%S").txt
//db.runCommand({mapReduce:'cepgprs_sample',map:map,reduce:reduce,out:'cepgprs_mr1'});
//db.getCollection('').mapReduce(
//    function(){
//        for(var key in this){
//            emit(key,{count:1});
//        }
//    }
//    ,function(key,values){
//        var total = 0;
//        //for(var i in values){
//        //    total += emits[i].count;
//        //}
//
//        values.forEach(function(value){
//            total += value.count;
//        });
//        return {'count':total};
//    }
//    ,{
//        //query: {        record_type:{$in:["1","2"]}    },
//        out: {
//            replace:"odtails_distinct1" //replace/merge/reduce
//            //,inline:1 //use memory either shard
//            //,sharded:1
//            //,nonAtomic:0
//        }}
//);


var T0,T1;
T0 = new Date();
print(T0.toLocaleTimeString());
//var src_col = 'siteview2g_sample';
db.getCollection(src_col.toString()).mapReduce(
    function(){
        for(var key in this){
            if(this[key]=="")
                emit(key,{distinct:0,empty:1});
            else
                emit(key,{distinct:1,empty:0});
        }
    }
    ,function(key,values){
        var sum_distinct = 0;
        var sum_empty = 0;

        //for(var i in values){
        //    total += emits[i].count;
        //}

        values.forEach(function(value){
            sum_distinct += value.count;
            sum_empty += value.empty;
        });
        return {'distinct':sum_distinct,'empty':sum_empty};
    }
    ,{
        //query: {        record_type:{$in:["1","2"]}    },
        out: {  //replace/merge/reduce
            replace: src_col.toString()+'_distinct'
            //,inline:1 //use memory either shard
            //,sharded:1
            //,nonAtomic:0
        }}
);

T1 = new Date();
print(T1.toLocaleTimeString()+'\t'+(T1-T0)/1000+'\t sec.');

//var result = [
//{ "_id" : "BTS", "value" : { "count" : 22597, "empty" : 0 } }
//,{ "_id" : "BTS_ADDRESS", "value" : { "count" : 22577, "empty" : 20 } }
//,{ "_id" : "BTS_CODE", "value" : { "count" : 22597, "empty" : 0 } }
//,{ "_id" : "BTS_PROP", "value" : { "count" : 22569, "empty" : 28 } }
//,{ "_id" : "BTS_STATUS", "value" : { "count" : 22574, "empty" : 23 } }
//];