//=============================== cep 2g A G G =================================
//mongo 192.168.0.196/cdr cep2g_agg.js > ./cep2g_agg_$(date +"%Y%m%d")_$(date +"%H%M%S").txt
//mongo cdr --port 40000 "./gprs_distinct2.js" > ./gprs_distinct$(date +"%Y%m%d")_$(date +"%H%M%S").txt

//use cdr
var gprs_field = [
    "RECORD_TYPE"
    ,"POTENTIAL_DUPLICATE"
    ,"SYSTEM_TYPE"
    ,"RECORD_SEQ_NUM"
    ,"SERVED_IMSI"
    ,"RECORD_OPENING_TIME"
    ,"SERVED_IMEI"
    ,"SERVED_MSISDN"
    ,"SGSN_ADDRESS"
    ,"GGSN_ADDRESS"
    ,"CHARGING_ID"
    ,"APN_NETWORK"
    ,"APN_OPERATOR"
    ,"SERVED_PDP_TYPE_ORG"
    ,"SERVED_PDP_ADDRESS"
    ,"LOCATION_AREA_CODE"
    ,"ROUTING_AREA"
    ,"CELL_IDENTITY"
    ,"SGSN_CHANGE"
    ,"S_CHARGING_CHARACTERISTICS"
    ,"PLMN_ID"
    ,"NETWORK_INITIATED_PDP_CONTEXT"
    ,"S_CAUSE_FOR_RECORD_CLOSING"
    ,"AIR_INTERFACE"
    ,"S_COMPLETE"
    ,"S_UPLINK"
    ,"S_DOWNLINK"
    ,"S_QOS_REQUESTED01"
    ,"S_QOS_REQUESTED02"
    ,"S_QOS_REQUESTED03"
    ,"S_QOS_REQUESTED04"
    ,"S_QOS_REQUESTED05"
    ,"S_QOS_REQUESTED06"
    ,"S_QOS_REQUESTED07"
    ,"S_QOS_REQUESTED08"
    ,"S_QOS_REQUESTED09"
    ,"S_QOS_REQUESTED10"
    ,"S_QOS_REQUESTED11"
    ,"S_QOS_REQUESTED12"
    ,"S_QOS_REQUESTED13"
    ,"S_QOS_NEGOTIATED01"
    ,"S_QOS_NEGOTIATED02"
    ,"S_QOS_NEGOTIATED03"
    ,"S_QOS_NEGOTIATED04"
    ,"S_QOS_NEGOTIATED05"
    ,"S_QOS_NEGOTIATED06"
    ,"S_QOS_NEGOTIATED07"
    ,"S_QOS_NEGOTIATED08"
    ,"S_QOS_NEGOTIATED09"
    ,"S_QOS_NEGOTIATED10"
    ,"S_QOS_NEGOTIATED11"
    ,"S_QOS_NEGOTIATED12"
    ,"S_QOS_NEGOTIATED13"
    ,"S_RECORD_OPENING_TIME"
    ,"S_TIMESTAMP"
    ,"S_FIRST_SEQUENCE_NUMBER"
    ,"S_LAST_SEQUENCE_NUMBER"
    ,"S_DURATION"
    ,"G_CHARGING_CHARACTERISTICS"
    ,"G_CAUSE_FOR_RECORD_CLOSING"
    ,"G_COMPLETE"
    ,"G_UPLINK"
    ,"G_DOWNLINK"
    ,"G_QOS_NEGOTIATED01"
    ,"G_QOS_NEGOTIATED02"
    ,"G_QOS_NEGOTIATED03"
    ,"G_QOS_NEGOTIATED04"
    ,"G_QOS_NEGOTIATED05"
    ,"G_QOS_NEGOTIATED06"
    ,"G_QOS_NEGOTIATED07"
    ,"G_QOS_NEGOTIATED08"
    ,"G_QOS_NEGOTIATED09"
    ,"G_QOS_NEGOTIATED10"
    ,"G_QOS_NEGOTIATED11"
    ,"G_QOS_NEGOTIATED12"
    ,"G_QOS_NEGOTIATED13"
    ,"G_QOS_NEGOTIATED14"
    ,"G_QOS_NEGOTIATED15"
    ,"G_RECORD_OPENING_TIME"
    ,"G_TIMESTAMP"
    ,"G_FIRST_SEQUENCE_NUMBER"
    ,"G_LAST_SEQUENCE_NUMBER"
    ,"G_DURATION"
    ,"CDR_STORED"
    ,"ICID"
    ,"SERVICE_CENTRE"
    ,"RECORDING_ENTITY"
    ,"CALLING_PARTY_NUMBER"
    ,"DESTINATION_NUMBER"
    ,"MESSAGE_REFERENCE"
    ,"SMS_RESULT"
    ,"S_UPLINK_KBYTEPS"
    ,"S_DOWNLINK_KBYTEPS"
    ,"G_UPLINK_KBYTEPS"
    ,"G_DOWNLINK_KBYTEPS"
    ,"DIAGNOSTICS_VALUE"
    ,"DIAGNOSTICS_INITIATION_CAUSE"
    ,"DIAGNOSTICS_PROCESS_FAMILYID"
    ,"DIAGNOSTICS_SGSN_ERROR_CAUSE"
    ,"G_DIAGNOSTICS"
    ,"CALLED_SUBS_FIRST_MNC_MCC"
    ,"CALLED_SUBS_FIRST_LAC"
    ,"CALLED_SUBS_FIRST_SAC"
];

var T0 = new Date(); //print(T0.toLocaleTimeString());

for(var i=0; i<gprs_field.length; i++) {
    TT0 = new Date();
    //var temp_field = gprs_field[i].toString();
    //var fd = db.cepgprs_sample.distinct(temp_field);

    //db.cepgprs_sample.mapReduce(
    //    function () {
    //        emit(this.gprs_field[i], {count: 1});
    //    }
    //    ,function(key,values){
    //        var count = 0;
    //        values.forEach(function(v){
    //            count += v['count'];
    //        });
    //        return {count:count};
    //    },
    //    {
    ////query: {        record_type:{$in:["1","2"]}    },
    //        out: {
    //            merge:"cepgprs_distinct" //replace/merge/reduce
    //            //,inline:1 //use memory either shard
    //            //,sharded:1
    //            //,nonAtomic:0
    //    }}
    //);

    db.cepgprs_sample.aggregate([
            {$group: {_id: '$' + gprs_field[i]}},
            {$group: {_id: 1, count: {$sum: 1}}},
            {$out: "gprsdistinct_" + gprs_field[i]}
        ]

        //,{    explain: true}
        , {allowDiskUse: true}
        //,{    cursor: { batchSize: 0 }
    );

    TT1 = new Date();
    //print('db.cepgprs.distinct(\''+gprs_field[i]+'\').length:\t' + fd.length +'\t:' + (TT1-TT0)/1000+'sec.');
}

var T1 = new Date();
print(T0.toLocaleTimeString());
print(T1.toLocaleTimeString());
print((T1-T0)/1000+'\t sec.');


db.weblogs.aggregate([{$group: {_id: '$url'} }]);