
//mongo cdr --port 40000 "col_cardinality.js" --eval "var col = 'cep3g_sample'" >  col_cardinality_$(date +"%Y%m%d")_$(date +"%H%M%S").txt
var T0,T1; //print(T0.toLocaleTimeString());
//============================ get col keys/field/schema =============================
T0 = new Date();
var col_doc = db.getCollection(col.toString()).findOne();
//var col_doc = db.cep3g_sample.findOne();
var col_fields = [];
for(var k in col_doc) col_fields.push(k);
T1 = new Date();
print('get col_fields:');
print(T0.toLocaleTimeString()+'~'+T1.toLocaleTimeString()+'\t'+(T1-T0)/1000+'\t sec.');

//============================ generate distinct field col =============================
for(var i in col_fields) {
    T0 = new Date();

    db.getCollection(col.toString()).aggregate([
            {$group: {_id: '$' + col_fields[i]}},   //get   field.distinct.value
            {$group: {_id: 1, count: {$sum: 1}}},   //count field.distinct.value
            {$out: col+"_distinct_" + col_fields[i]}
        ]
        //,{    explain: true}
        , {allowDiskUse: true}
        //,{    cursor: { batchSize: 0 }
    );

    T1 = new Date();
    print(i+'.'+col+'_distinct_field :'+col_fields[i]);
    print(T0.toLocaleTimeString()+'~'+T1.toLocaleTimeString()+'\t'+(T1-T0)/1000+'\t sec.');
}

//============================ collect distinct field col =============================
T0 = new Date(); //print(T0.toLocaleTimeString());
for(var i in col_fields) {
    //var tempagg =
    db.getCollection(col+'_distinct_'+col_fields[i].toString()).find({},{})
        .forEach(function (doc){
            var tempdoc = doc;
            //tempdoc._id = new ObjectId();
            tempdoc._id = col_fields[i];
            db.getCollection(col.toString()+'_cardinality').save(tempdoc);
        })
}
T1 = new Date();
print(col+'_cardinality');
print(T0.toLocaleTimeString()+'~'+T1.toLocaleTimeString()+'\t'+(T1-T0)/1000+'\t sec.');


//============================ drop distinct field col =============================
for(var i in col_fields) {
    //var tempagg =
    db.getCollection(col+'_distinct_'+col_fields[i].toString()).drop();
    //db.getCollection('cep3g_sample_distinct_'+col_fields[i].toString()).drop();
}

print(col+'_temp.drop():\tdone');

//print(T0.toLocaleTimeString());
//print(T1.toLocaleTimeString());
//print((T1-T0)/1000+'\t sec.');

//{$group: {_id: '$' + col_fields[i],count:{$sum:1}}},  //each field.distinct.value.count
//                                  v=collection_name  v=collection_name
//mongoexport --port 40000 -d cdr -c _cardinality --out _cardinality.csv --type=csv --fields _id,count
//mongo cdr --port 40000 "col_cardinality.js" --eval "var col = 'cep3g_sample'" >  col_cardinality_$(date +"%Y%m%d")_$(date +"%H%M%S").txt