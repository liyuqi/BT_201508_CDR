//mongo test --port 40000 kerry_test.js --eval "var src_col='src_col',dst_col='dst_col'";

var T0,T1;
T0 = new Date();
var FUNC = [
    "func01"
    ,"func02"
    ,"func03"
    ,"func04"
    ,"func05"
    ,"func06"
    ,"func07"
    ,"func08"
    ,"func09"
    ,"func10"
    ,"func11"
    ,"func12"
    ,"func13"
    ,"func14"
    ,"func15"
    ,"func16"
    ,"func17"
    ,"func18"
    ,"func19"
    ,"func20"
    ,"func21"
    ,"func22"
    ,"func23"
    ,"func24"
    ,"func25"
];

//var UID = [];
//for(var i= 0; i<2500000; i++){
//    UID.push("User"+ i.toString());
//}

for(var i =0;i<2500000;i++){
    for(var j =0;j<450;j++){
        var item = {
            //'UID':UID[Math.floor(Math.random()*UID.length)]
            'UID': 'USER' + i
            , 'FUNC': FUNC[Math.floor(Math.random() * FUNC.length)]
            //------------------------------------DD*HH*mm*ss*ms   + rand
            , 'time': new Date((new Date).getTime() + 1 * 24 * 60 * 60 * 1000 + i * 10+j) //Math.floor((Math.random()*23)+1)*60*60*1000)
            //-----------------------------------------DD*HH*mm*ss*ms   + rand
            //'TIMESTAMP':new Date((new Date).getTime() - 1*24*60*60*1000 + i) //Math.floor((Math.random()*23)+1)*60*60*1000)

        };
        db.getCollection(src_col.toString()).insert(item);
    }
}
T1 = new Date();
print(T0.toLocaleTimeString());
print(T1.toLocaleTimeString());
print((T1-T0)/1000+'\t sec.');

/*
> db.agg_col.find()
{ "_id" : ObjectId("55499021bcfca53c4e16ea99"), "UID" : "User597638", "FUNC" : "func07", "time" : ISODate("2015-05-05T03:53:05.285Z") }
{ "_id" : ObjectId("55499021bcfca53c4e16ea9a"), "UID" : "User1219747", "FUNC" : "func03", "time" : ISODate("2015-05-05T03:53:05.292Z") }
{ "_id" : ObjectId("55499021bcfca53c4e16ea9b"), "UID" : "User1937128", "FUNC" : "func03", "time" : ISODate("2015-05-05T03:53:05.293Z") }
*/



