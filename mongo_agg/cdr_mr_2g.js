//HO_HANDOVER
db.cep2g_insert.mapReduce(
    function () {
        //var time= this.timestamp.substring(0,2);
        try {
            var key = {
                CALLTRANSACTIONTYPE: this.CALLTRANSACTIONTYPE
                //STATISTIC_DATE : "$time"
                , DATE: this.STARTOFCHARGINGDATE
                , HOUR: this.TIMESTAMP.substr(0, 2)

                , COUNTY: this.BTS_ADDRESS.substr(0, 3)
                , DISTRICT: this.BTS_ADDRESS.substr(3, 3)
                , SITE_NAME: this.SITE_NAME
                , SITE_ID: this.SITE_ID

                //, VENDOR : "$VENDOR"
                //, MODEL : "$MODEL"

                , END_CODE: this.CAUSEFORTERMINATION
                , SIM_TYPE: this.SIM_TYPE
                , CARRIER: this.CARRIER
                //, HO_CALLED_1 : 1

            };
        }catch(e){}
        var value = {
            CALLDURATION: this.CALLDURATION
        };
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

        values.forEach(function (value) {
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
         else*/ if (doc.HO_CALLED_MINUTES >= 10.0) {
            doc.SUM_CALLED_COUNT_10UP += 1;   doc.SUM_CALLED_MINUTES_10UP += doc.HO_CALLED_MINUTES;
        }

        //save.SITE_ID = key._id.cellid + "-" + key._id.lacod;
        //doc.time = values.time;
        return doc;
    },
    {
        query: {//--------------------------------filter------------------------------
            /*time: interval,up_falg:1,*/
            CALLTRANSACTIONTYPE:{$in:['1','2']}
        },
        out: "cdr2g_mr"
    }
);

//{
//    "result" : "cdr2g_mr",
//    "timeMillis" : 9129,
//    "counts" : {
//    "input" : 244723,
//        "emit" : 244723,
//        "reduce" : 83431,
//        "output" : 69153
//},
//    "ok" : 1
//}