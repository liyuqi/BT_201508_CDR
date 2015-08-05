//mongo cdr cdr_mr_3g.js > ./cdr_mr_3g_result_$(date +"%Y%m%d")_$(date +"%H%M%S").txt
print(new Date().toLocaleTimeString()+'\t3g mr start');
var mr3g = db.cep3g_insert.mapReduce(
    function () {
        //var time= this.timestamp.substring(0,2);
        try {
            var key = {
                record_type: this.record_type
                //, STATISTIC_DATE: new Date(this.time.getTime).substr(0,13)
                , DATE: this.date_time.substr(0, 10)
                , HOUR: this.date_time.substr(11, 2)
                , COUNTY: this.BTS_ADDRESS.substr(0, 3)
                , DISTRICT: this.BTS_ADDRESS.substr(3, 3)
                , SITE_NAME: this.SITE_NAME
                , SITE_ID: this.SITE_ID

                //, VENDOR : "$VENDOR"
                //, MODEL : "$MODEL"

                , END_CODE: this.cause_for_termination
                , SIM_TYPE: this.SIM_TYPE
                , CARRIER: this.CARRIER
                //, HANGOVER : this.HANGOVER
            };

            var value = {};
            if (this.record_type == '1') {
                    value.HANGOVER= this.HANGOVER;
                    value.CALLDURATION= this.orig_mcz_duration;
            }
            else if (this.record_type == '2') {
                    value.HANGOVER= this.HANGOVER;
                    value.CALLDURATION= this.term_mcz_duration;
            }
            else {
                value.HANGOVER=0;
                value.CALLDURATION=0;
            }
        }catch(e){}
        //if (this.record_type == '1'&& this.orig_mcz_duration!='undefined') value.duration = this.orig_mcz_duration;
        //if (this.record_type == '2'&& this.term_mcz_duration!='undefined') value.duration = this.term_mcz_duration;
        //print(key);
        //print(value);
        emit(key, value);

    },
    function (key, values) {
        var doc = {
            HO_CALLED_COUNT: 0
            ,HO_CALLED_MINUTES: 0
            ,HO_CALLED_SECONDS: 0

            //,SUM_CALLED_COUNT_0_3: 0
            //,SUM_CALLED_COUNT_3_5: 0
            //,SUM_CALLED_COUNT_5_7: 0
            //,SUM_CALLED_COUNT_7_10: 0
            ,SUM_CALLED_COUNT_10UP: 0

            //,SUM_CALLED_MINUTES_0_3: 0
            //,SUM_CALLED_MINUTES_3_5: 0
            //,SUM_CALLED_MINUTES_5_7: 0
            //,SUM_CALLED_MINUTES_7_10: 0
            ,SUM_CALLED_MINUTES_10UP: 0
        };

        try {
            values.forEach(function (value) {
                if (value.HANGOVER)
                    doc.HANGOVER += value.HANGOVER;
                doc.HO_CALLED_COUNT += 1;
                doc.HO_CALLED_SECONDS += value.CALLDURATION;
            });

            doc.HO_CALLED_MINUTES = (doc.HO_CALLED_SECONDS / 60.0);
            /*     if (doc.HO_CALLED_MINUTES >= 0 && doc.HO_CALLED_MINUTES < 3.0) {
             doc.SUM_CALLED_COUNT_0_3 += 1;    doc.SUM_CALLED_MINUTES_0_3 += doc.HO_CALLED_MINUTES;
             }
             else if (doc.HO_CALLED_MINUTES >= 3.0 && doc.HO_CALLED_MINUTES < 5.0) {
             doc.SUM_CALLED_COUNT_3_5 += 1;    doc.SUM_CALLED_MINUTES_3_5 += doc.HO_CALLED_MINUTES;
             }
             else if (doc.HO_CALLED_MINUTES >= 5.0 && doc.HO_CALLED_MINUTES < 7.0) {
             doc.SUM_CALLED_COUNT_5_7 += 1;    doc.SUM_CALLED_MINUTES_5_7 += doc.HO_CALLED_MINUTES;
             }
             else if (doc.HO_CALLED_MINUTES >= 7.0 && doc.HO_CALLED_MINUTES < 10.0) {
             doc.SUM_CALLED_COUNT_7_10 += 1;   doc.SUM_CALLED_MINUTES_7_10 += doc.HO_CALLED_MINUTES;
             }
             else*/
            if (doc.HO_CALLED_MINUTES >= 10.0) {
                doc.SUM_CALLED_COUNT_10UP += 1;
                doc.SUM_CALLED_MINUTES_10UP += doc.HO_CALLED_MINUTES;
            }
        }catch(e){}
        //save.SITE_ID = key._id.cellid + "-" + key._id.lacod;
        //doc.time = values.time;
        return doc;
    },
    {
        query: {
            //time: interval
            record_type:{$in:["1","2"]}
        },
        out: "cdr3g_mr"
    }
);
//mongo cdr cdr_mr_3g.js > ./cdr_mr_3g_result_$(date +"%Y%m%d")_$(date +"%H%M%S").txt

print(new Date().toLocaleTimeString()+'\t3g mr end');
print(JSON.stringify(mr3g));
//mr3g.forEach(function(doc){
//    print(JSON.stringify(doc));
//});
//{
//    "result" : "cdr3g_mapR",
//    "timeMillis" : 12114,
//    "counts" : {
//    "input" : 228216,
//        "emit" : 228216,
//        "reduce" : 36248,
//        "output" : 4147
//},
//    "ok" : 1
//}

//{
//    "result" : "cdr3g_mapR",
//    "timeMillis" : 9755,
//    "counts" : {
//    "input" : 228216,
//        "emit" : 228216,
//        "reduce" : 34578,
//        "output" : 4136
//},
//    "ok" : 1
//}

//db.cep3g_insert.find({
//    "record_type": "1",
//    //"date_time": /^2014-12-22 2/,
//    "BTS_ADDRESS": "台北市中正區",
//    "SITE_NAME": "中正公園",
//    "SITE_ID": "100PS",
//    //"END_CODE": "0000",
//    "SIM_TYPE": "ISIM",
//    "CARRIER": "台灣大哥大"
//},{HANGOVER:1,orig_mcz_duration:1,term_mcz_duration:1});