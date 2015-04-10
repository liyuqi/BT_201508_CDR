//HO_HANDOVER
db.cep3g_sample.mapReduce(
    function () {
        //var time= this.timestamp.substring(0,2);

        var key = {
            record_type: this.record_type
            //, STATISTIC_DATE: new Date(this.time.getTime).substr(0,13)
            , DATE: this.date_time.substr(0,10)
            , HOUR: this.date_time.substr(11,2)

            , COUNTY: this.BTS_ADDRESS.substr(0, 9) // 縣市
            , DISTRICT: this.BTS_ADDRESS.substr(9, this.BTS_ADDRESS.length - 9)    // 地區
            , SITE_NAME: this.SITE_NAME
            , SITE_ID: this.SITE_ID

            //, VENDOR : "$VENDOR"
            //, MODEL : "$MODEL"

            , END_CODE: this.cause_for_termination
            , SIM_TYPE: this.SIM_TYPE
            , CARRIER: this.CARRIER
            //, HANGOVER : this.HANGOVER
        };

        if (this.record_type == '1') {
            if(this.orig_mcz_duration)
                var value = {
                    HANGOVER: this.HANGOVER
                    ,CALLDURATION: this.orig_mcz_duration
                };
        }
        else if (this.record_type == '2') {
            if(this.term_mcz_duration)
                var value = {
                    HANGOVER: this.HANGOVER
                    ,CALLDURATION: this.term_mcz_duration
                };
        }
        //if (this.record_type == '1'&& this.orig_mcz_duration!='undefined') value.duration = this.orig_mcz_duration;
        //if (this.record_type == '2'&& this.term_mcz_duration!='undefined') value.duration = this.term_mcz_duration;
        print(key);
        print(value);
        emit(key, value);

    },
    function (key, values) {
        var doc = {
            record_type: key.record_type
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
            //SUM_CALLED_COUNT_0_3: 0,
            //SUM_CALLED_COUNT_3_5: 0,
            //SUM_CALLED_COUNT_5_7: 0,
            //SUM_CALLED_COUNT_7_10: 0,
            //SUM_CALLED_COUNT_10UP: 0,
            //SUM_CALLED_MINUTES_0_3: 0,
            //SUM_CALLED_MINUTES_3_5: 0,
            //SUM_CALLED_MINUTES_5_7: 0,
            //SUM_CALLED_MINUTES_7_10: 0,
            //,HANGOVER:key.HANGOVER
            //,HO_CALLED_COUNT: 0
            //,HO_CALLED_MINUTES: 0
            //,SUM_CALLED_MINUTES_10UP: 0
        };

        values.forEach(function (value) {
            doc.HO_CALLED_COUNT += value.HANGOVER;
            doc.HO_CALLED_SECONDS += value.CALLDURATION;
            doc.HO_CALLED_MINUTES += (value.HO_CALLED_SECONDS / 60.0);

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
        query: {
            //time: interval
            record_type:{$in:["1","2"]}
        },
        out: "cdr3g_mapR"
    }
);

//
db.cep3g_sample.mapReduce(
    function(){
        for(var key in this){
            emit(key,{count:1});
        }
    },
    function(key,value){
        var total=0;
        for(var i in value){
            total += value[i].count;
            return {count:total};
        }
    },

    {
        query:{
            record_type:{$in:["1","2"]}
        },
        out: "map3g1"
    }
);

db.cdr3g_update1.findOne()
{ "_id" : "acceptable_channel_codings_01", "value" : { "count" : 1 } }
{ "_id" : "acceptable_channel_codings_02", "value" : { "count" : 1 } }
{ "_id" : "acceptable_channel_codings_03", "value" : { "count" : 1 } }
{ "_id" : "acceptable_channel_codings_04", "value" : { "count" : 1 } }
{ "_id" : "acceptable_channel_codings_05", "value" : { "count" : 1 } }

/*以3G CDR為例:
 3G資料源-recordType= 1 (MOC)以 calling_subs_last_lac，calling_subs_last_ci為KEY 或是
 3G資料源-recordType= 2 (MTC) 以called_subs_last_lac，called_subs_last_ci為KEY，再以此KEY去mapping siteview3g(LAC，SAC)，
 取得對應的SITEID及基站住址

 疑問2: 通話時間
 以3G CDR為例
 QA pattern 有兩種，一種依基站，一種依手機，
 TIBCO BE各會依照不同的key去做aggregate 通話秒數(MOC: orig_mcz_duration，MTC: term_mcz_duration)
 再計算出通話次數 與 通話分鐘數-請參閱需求確認表3.2

 手機 aggregate key為                 基站aggregate key為
 MOC-                                MOC-
 Imei: calling_imei 取前8碼，         siteID: 透過calling_subs_last_lac，calling_subs_last_ci 做mapping，
 結束碼: cause_for_termination刪除前4碼，
 卡別: calling_imsi(附件圖1)，4.4
 業者別:called_number(附件圖2)4.5
 MTC-                                MTC-
 Imei: called_imei 取前8碼，          SiteID: 透過called_subs_last_lac，called_subs_last_ci做mapping，
 結束碼: cause_for_termination刪除前4碼，
 卡別called_imsi(附件圖1)，
 業者別: 歸類為MTC業者

 以上為CEP -3G CDR ，TIBCO BE處理邏輯
 通話時間統計由TIBCO BE做統計，故無法提供SQL
 而siteview & siteview3g 不存進DB, 資料放在TIBCO BE memory，故也無法提供SQL
 若要最終版欄位名稱，可以依照提供的DDL schema名稱命名。
 */

//Date
var d = new Date();
var t1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(),0,0,0);
var t0 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()-1,0,0,0);
var interval = {$gte:t0,$lt:t1}; //ISODate("2015-03-31T16:00:00Z")


//update
var convert = function(document){
    var intValue = parseInt(document.field, 10);
    db.collection.update( {_id:document._id}, {$set: {field: intValue}}
    );
};

//HO_HANDOVER
db.cdr3g_update1.mapReduce(
    function () {
            var key = {
                record_type: this.record_type
                , STATISTIC_DATE: this.time.getTime().toString().substr(0, 13)
                //, STATISTIC_DATE: (new Date(this.time.getTime())).toString().substr(0, 13)
            };

            var value = {
                HANGOVER: this.HANGOVER
                , HO_CALLED_COUNT: 1
            };
        emit(key, value);
    },
    function (key, values) {
        var doc = {
            _id:0
            ,HO_CALLED_COUNT: 0
            ,HO_CALLED_MINUTES: 0
        };

        values.forEach(function (value) {
            value.HANGOVER +=1;
            value.HO_CALLED_COUNT += 1;
            value.HO_CALLED_MINUTES += value.callduration;
        });

        return doc;
    },
    {
        out: "map3g2"
    }
);