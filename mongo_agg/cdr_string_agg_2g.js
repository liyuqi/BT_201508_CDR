//=============================== cep 2g A G G =================================
//mongo cdr cdr_string_agg_2g.js > ./cdr_agg_2g_result_$(date +"%Y%m%d")_$(date +"%H%M%S").txt
print(new Date().toLocaleTimeString());
var agg_2g = db.cep2g_insert.aggregate([
        {$match: {/*time: interval,up_falg:1,*/
            CALLTRANSACTIONTYPE:{$in:['1','2']}
        }},
        {$project:{
            //time:1,
            //STATISTIC_DATE : "$time"
              DATE: "$STARTOFCHARGINGDATE"
            , HOUR: {$substr:["$TIMESTAMP",0,2]}

            , COUNTY : { $substr: [ "$BTS_ADDRESS", 0, 9 ] }//"$BTS_ADDRESS" //縣市
            , DISTRICT : { $substr: [ "$BTS_ADDRESS", 3, 3 ] }//"$BTS_CODE" //地區
            , SITE_NAME : "$SITE_NAME"
            , SITE_ID : "$SITE_ID"

            //, VENDOR : "$VENDOR"
            //, MODEL : "$MODEL"

            , END_CODE : "$CAUSEFORTERMINATION"
            , SIM_TYPE : "$SIM_TYPE"
            , CARRIER : "$CARRIER"
            //, HO_CALLED_1 : 1
            , CALLDURATION : "$CALLDURATION"
        }},
        {$group:{
            _id: {
                STATISTIC_DATE: {
                      DATE : "$DATE"
                    , HOUR : "$HOUR"
                }
                , COUNTY: "$COUNTY" //縣市
                // , DISTRICT: "$DISTRICT" //地區
                , SITE_NAME: "$SITE_NAME"
                , SITE_ID: "$SITE_ID"

                //, VENDOR: "$VENDOR"
                //, MODEL: "$MODEL"

                , END_CODE: "$END_CODE"
                , SIM_TYPE: "$SIM_TYPE"
                , CARRIER: "$CARRIER"
                //, IMEI: "$IMEI"
            }

            ,HO_CALLED_COUNT:{$sum:1}
            ,HO_CALLED_MINUTES:{$sum:"$CALLDURATION"}
        }}
        ,{$project:{
            _id:0
            ,STATISTIC_DATE:"$_id.STATISTIC_DATE"
            ,COUNTY : "$_id.COUNTY"
            ,SITE_NAME : "$_id.SITE_NAME"
            //,VENDOR : "$_id.VENDOR"
            //,MODEL : "$_id.MODEL"
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

print(new Date().toLocaleTimeString());
print(agg_2g.result.length);
agg_2g.result.forEach(function(doc){
    //print(JSON.stringify(doc));
});