//HO_HANDOVER
db.cep2g_insert.mapReduce(
    function () {
        //var time= this.timestamp.substring(0,2);
        var key = {
            CALLTRANSACTIONTYPE: this.CALLTRANSACTIONTYPE
            //STATISTIC_DATE : "$time"
            , DATE: this.STARTOFCHARGINGDATE
            , HOUR: this.TIMESTAMP.substr(0,2)

            , COUNTY : this.BTS_ADDRESS.substr(0, 9) // 縣市
            , DISTRICT : this.BTS_ADDRESS.substr(9, this.BTS_ADDRESS.length-9)    // 地區
            , SITE_NAME : this.SITE_NAME
            , SITE_ID : this.SITE_ID

            //, VENDOR : "$VENDOR"
            //, MODEL : "$MODEL"

            , END_CODE : this.CAUSEFORTERMINATION
            , SIM_TYPE : this.SIM_TYPE
            , CARRIER : this.CARRIER
            //, HO_CALLED_1 : 1

        };
        var value = {
            CALLDURATION: this.CALLDURATION
        };
        emit(key, value);
    },
    function (key, values) {
        var doc = {
            CALLTRANSACTIONTYPE: key.CALLTRANSACTIONTYPE
            //STATISTIC_DATE : "$time"
            , DATE: key.DATE
            , HOUR: key.HOUR
            , COUNTY : key.COUNTY // 縣市
            , DISTRICT : key.DISTRICT
            , SITE_NAME : key.SITE_NAME
            , SITE_ID : key.SITE_ID
            //, VENDOR : "$VENDOR"
            //, MODEL : "$MODEL"
            , END_CODE : key.END_CODE
            , SIM_TYPE : key.SIM_TYPE
            , CARRIER : key.CARRIER
            //,SUM_CALLED_COUNT_0_3: 0
            //,SUM_CALLED_COUNT_3_5: 0
            //,SUM_CALLED_COUNT_5_7: 0
            //,SUM_CALLED_COUNT_7_10: 0
            //,SUM_CALLED_COUNT_10UP: 0

            //,SUM_CALLED_MINUTES_0_3: 0
            //,SUM_CALLED_MINUTES_3_5: 0
            //,SUM_CALLED_MINUTES_5_7: 0
            //,SUM_CALLED_MINUTES_7_10: 0

            //,HO_CALLED_COUNT: 0
            //,HO_CALLED_SECONDS: 0
            //,SUM_CALLED_MINUTES_10UP: 0
        };

        values.forEach(function (value) {
            doc.HO_CALLED_COUNT += 1;
            doc.HO_CALLED_SECONDS += value.CALLDURATION;
            doc.HO_CALLED_MINUTES += (value.CALLDURATION / 60.0);

            //if ((value.CALLDURATION / 60) >= 0 && (value.CALLDURATION / 60) < 3) {
            //    doc.SUM_CALLED_COUNT_0_3 += 1;
            //    doc.SUM_CALLED_MINUTES_0_3 += value.CALLDURATION;
            //} else if ((value.CALLDURATION / 60) >= 3 && (value.CALLDURATION / 60) < 5) {
            //    doc.SUM_CALLED_COUNT_3_5 += 1;
            //    doc.SUM_CALLED_MINUTES_3_5 += value.CALLDURATION;
            //} else if ((value.CALLDURATION / 60) >= 5 && (value.CALLDURATION / 60) < 7) {
            //    doc.SUM_CALLED_COUNT_5_7 += 1;
            //    doc.SUM_CALLED_MINUTES_5_7 += value.CALLDURATION;
            //} else if ((value.CALLDURATION / 60) >= 7 && (value.CALLDURATION / 60) < 10) {
            //    doc.SUM_CALLED_COUNT_7_10 += 1;
            //    doc.SUM_CALLED_MINUTES_7_10 += value.CALLDURATION;
            //} else
            if ((value.CALLDURATION / 60.0) >= 10.0) {
                doc.SUM_CALLED_COUNT_10UP += 1;
                doc.SUM_CALLED_MINUTES_10UP += doc.HO_CALLED_MINUTES;
            }
        });
        //save.SITE_ID = key._id.cellid + "-" + key._id.lacod;
        //doc.time = values.time;
        return doc;
    },
    {
        query: {//--------------------------------filter------------------------------
            /*time: interval,up_falg:1,*/
            CALLTRANSACTIONTYPE:{$in:['1','2']}
        },
        out: "cdr2g_mapR"
    }
);



//==== test ====
//HO_HANDOVER
db.cdr3g_update1.mapReduce(
    function () {
        //var time= this.timestamp.substring(0,2);
        try {
            var key = {
                record_type: this.record_type
                , STATISTIC_DATE: (new Date(this.time.getTime)).toString().substr(0, 13)
                //, STATISTIC_DATE: new Date(this.time.getTime).substr(0,13)
                //, NETWORK: "$NETWORK"
                //, IMEI: "$IMEI"

                //site
                , COUNTY: this.COUNTY.toString().substr(0, 9) //縣市
                //, DISTRICT: this.DISTRICT.toString().substr(9,15) //地區
                , SITE_NAME: this.SITE_NAME
                , SITE_ID: this.SITE_ID

                //phone_type
                //, VENDOR: this.VENDOR
                //, MODEL: this.VENDOR

                //general
                , END_CODE: this.END_CODE
                , SIM_TYPE: this.SIM_TYPE
                , CARRIER: this.CARRIER
            };

            var value = {
                HANGOVER: this.HANGOVER
                , HO_CALLED_COUNT: 1
            };
        }catch (e){}

        if (this.record_type == '1'&& this.orig_mcz_duration!='undefined') value.duration = this.orig_mcz_duration;
        //if (this.record_type == '2'&& this.term_mcz_duration!='undefined') value.duration = this.term_mcz_duration;
        print(key);
        print(value);
        emit(key, value);

    },
    function (key, values) {
        var doc = {
            _id:''
            //record_type: key.record_type
            //, STATISTIC_DATE: key.STATISTIC_DATE
            ////, NETWORK: "$NETWORK"
            ////, IMEI: "$IMEI"
            //
            ////site
            //, COUNTY: key.COUNTY
            //, DISTRICT: key.DISTRICT
            //, SITE_NAME: key.SITE_NAME
            //, SITE_ID: key.SITE_ID
            //
            ////phone_type
            //, VENDOR: key.VENDOR
            //, MODEL: key.VENDOR
            //
            ////general
            //, END_CODE: key.END_CODE
            //, SIM_TYPE: key.SIM_TYPE
            //, CARRIER: key.CARRIER
            //
            //SUM_CALLED_COUNT_0_3: 0,
            //SUM_CALLED_COUNT_3_5: 0,
            //SUM_CALLED_COUNT_5_7: 0,
            //SUM_CALLED_COUNT_7_10: 0,
            //SUM_CALLED_COUNT_10UP: 0,
            //SUM_CALLED_MINUTES_0_3: 0,
            //SUM_CALLED_MINUTES_3_5: 0,
            //SUM_CALLED_MINUTES_5_7: 0,
            //SUM_CALLED_MINUTES_7_10: 0,
            ,HANGOVER:0
            ,HO_CALLED_COUNT: 0
            ,HO_CALLED_MINUTES: 0
            ,SUM_CALLED_MINUTES_10UP: 0
        };

        values.forEach(function (value) {
            doc.HANGOVER +=1;
            doc.HO_CALLED_COUNT += 1;
            doc.HO_CALLED_MINUTES += value.callduration;

            //if ((value.callduration / 60) >= 0 && (value.callduration / 60) < 3) {
            //    doc.SUM_CALLED_COUNT_0_3 += 1;
            //    doc.SUM_CALLED_MINUTES_0_3 += value.callduration;
            //} else if ((value.callduration / 60) >= 3 && (value.callduration / 60) < 5) {
            //    doc.SUM_CALLED_COUNT_3_5 += 1;
            //    doc.SUM_CALLED_MINUTES_3_5 += value.callduration;
            //} else if ((value.callduration / 60) >= 5 && (value.callduration / 60) < 7) {
            //    doc.SUM_CALLED_COUNT_5_7 += 1;
            //    doc.SUM_CALLED_MINUTES_5_7 += value.callduration;
            //} else if ((value.callduration / 60) >= 7 && (value.callduration / 60) < 10) {
            //    doc.SUM_CALLED_COUNT_7_10 += 1;
            //    doc.SUM_CALLED_MINUTES_7_10 += value.callduration;
            //} else
            if ((value.callduration) >= 10) {
                doc.SUM_CALLED_COUNT_10UP += 1;
                doc.SUM_CALLED_MINUTES_10UP += value.callduration;
            }
        });
        //save.SITE_ID = key._id.cellid + "-" + key._id.lacod;
        //doc.time = values.time;
        return doc;
    },
    {
        //query: { //time: interval },
        out: "map3g1"
    }
);