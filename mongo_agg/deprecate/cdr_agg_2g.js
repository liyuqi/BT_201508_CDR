
//=============================== cep 2g A G G =================================
db.cep2g_insert.aggregate([
    {$match: {/*time: interval,up_falg:1,*/
        CALLTRANSACTIONTYPE:{$in:['1','2']}
    }},
    {$project:{
        time:1,
        //STATISTIC_DATE : "$time"
        date: "$STARTOFCHARGINGDATE"
        , hour: {$substr:["$TIMESTAMP",0,2]}
        // , IMEI : "$SERVEDIMEI"

        //site
        , COUNTY : { $substr: [ "$BTS_ADDRESS", 0, 9 ] }//"$BTS_ADDRESS" //縣市
        , DISTRICT : { $substr: [ "$BTS_ADDRESS", 3, 3 ] }//"$BTS_CODE" //地區
        , SITE_NAME : "$SITE_NAME"
        , SITE_ID : "$SITE_ID"

        //phone_type
        , VENDOR : "$VENDOR"
        , MODEL : "$MODEL"

        //general
        , END_CODE : "$CAUSEFORTERMINATION"
        , SIM_TYPE : "$SIM_TYPE"
        , CARRIER : "$CARRIER"
        //, HO_CALLED_1 : 1
        , HO_CALLED_duration : "$CALLDURATION"
    }},
    {$group:{
        _id: {
            STATISTIC_DATE: {
                date : "$date"
                , hour: "$hour"
            }
            , NETWORK: "$NETWORK"
            , IMEI: "$IMEI"

            //site
            , COUNTY: "$COUNTY" //縣市
            //, DISTRICT: "$DISTRICT" //地區
            , SITE_NAME: "$SITE_NAME"
            , SITE_ID: "$SITE_ID"

            //phone_type
            , VENDOR: "$VENDOR"
            , MODEL: "$MODEL"

            //general
            , END_CODE: "$END_CODE"
            , SIM_TYPE: "$SIM_TYPE"
            , CARRIER: "$CARRIER"
        }

        ,HO_CALLED_COUNT:{$sum:1}
        ,HO_CALLED_MINUTES:{$sum:"$HO_CALLED_duration"}
    }}
    ,{$project:{
            _id:0
           //,STATISTIC_DATE:"$_id.STATISTIC_DATE"
           ,COUNTY : "$_id.COUNTY"
           ,SITE_NAME : "$_id.SITE_NAME"
           ,VENDOR : "$_id.VENDOR"
           ,MODEL : "$_id.MODEL"
           ,SIM_TYPE : "$_id.SIM_TYPE"
           ,CARRIER : "$_id.CARRIER"
           ,HO_CALLED_COUNT :1
           ,HO_CALLED_MINUTES :1
    }}
    //,{    $out:"cdr2g_agg"}
    ]
    //,{    explain: true}
    //,{    allowDiskUse: true}
    //,{    cursor: { batchSize: 0 }
);

/*
var agg_result_sample =
{
    "_id":
    {   "STATISTIC_DATE": { "year" : 2015, "month" : 4, "day" : 1, "hour" : 8 }
    ,
        "NETWORK"    : "1"
        ,"IMEI"      : "3553570565687700"
        ,"COUNTY"    : "彰化縣彰化市"
        ,"SITE_NAME" : "彰化孝德"
        ,"SITE_ID"   : "50019"
        ,"VENDOR"    : "Samsung"
        ,"MODEL"     : "Galaxy Note 10.1 3G_N8000(4.1.1)"
        ,"END_CODE"  : "0"
        ,"SIM_TYPE"  : "other"
        ,"CARRIER"   : "台灣之星"
    }
,   "HO_CALLED_COUNT": 1,
    "HO_CALLED_MINUTES": 0
};*/
