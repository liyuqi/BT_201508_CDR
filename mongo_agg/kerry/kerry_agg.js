//mongo test --port 40000 "./kerry_agg.js" --eval "var src_col='src_col',dst_col='dst_col'" > ./test_result/kerry_agg$(date +"%Y%m%d")_$(date +"%H%M%S").txt

var T0,T1;
T0 = new Date(); //print(T0.toLocaleTimeString());
db.getCollection(src_col.toString()).aggregate([

        {$group:{
            _id: {
                UID:"$UID"
                ,FUNC:"$FUNC"
            },
            count:{$sum:1}
        }}
        ,{$project:{
            _id:1
            ,UID:"$_id.UID"
            ,FUNC:"$_id.FUNC"
            ,count:"$count"
        }
        }
        //,{ $sort : { UID : 1, count: 1 } }
        ,{ $out: ''+dst_col.toString()}
    ]
    //,{    explain: true}
    ,{    allowDiskUse: true}
    //,{    cursor: { batchSize: 0 }
);
T1 = new Date();
print(T0.toLocaleTimeString());
print(T1.toLocaleTimeString());
print((T1-T0)/1000+'\t sec.');

print('db.dst_col.findOne:');
printjson(db.getCollection(dst_col.toString()).findOne());