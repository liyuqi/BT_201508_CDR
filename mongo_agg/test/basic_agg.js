//====================================== basic A G G =================================

//mongo cdr --port 40000 "col_cardinality.js" --eval "var collection_name = 'cep3g_sample'" >  col_cardinality_$(date +"%Y%m%d")_$(date +"%H%M%S").txt
var T0,T1; //print(T0.toLocaleTimeString());

T0 = new Date();

db.getCollection(collection_name.toString()).aggregate([
        {$group: {_id: '$' + col_fields[i]}},   //get   field.distinct.value
        {$group: {_id: 1, count: {$sum: 1}}},   //count field.distinct.value
        {$out: col+"_distinct_" + col_fields[i]}
    ]
    //,{    explain: true}
    , {allowDiskUse: true}
    //,{    cursor: { batchSize: 0 }
);

T1 = new Date();
print(i+'.'+collection_name+'_distinct_field :'+col_fields[i]);
print(T0.toLocaleTimeString()+'~'+T1.toLocaleTimeString()+'\t'+(T1-T0)/1000+'\t sec.');

//db.myCollection.aggregate(
//    {$group : {_id : "$myIndexedNonUniqueField"} },
//    {$group: {_id:1, count: {$sum : 1 }}});
//    //.result[0].count;


db.getCollection(collection_name.toString()).aggregate([
        {$group: {_id: '$' + col_fields[i]}},   //get   field.distinct.value
        {$group: {_id: 1, count: {$sum: 1}}},   //count field.distinct.value
        {$out: col+"_distinct_" + col_fields[i]}
    ]
    //,{    explain: true}
    , {allowDiskUse: true}
    //,{    cursor: { batchSize: 0 }
);