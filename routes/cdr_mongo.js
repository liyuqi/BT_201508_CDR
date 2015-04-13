/**
 * Created by Yuqi on 2015/2/16.
 */
/*** Created by Yuqi on 2015/1/21.
 * > db.logs.findOne()
 {
         "_id" : ObjectId("54d966730778511cff000009"),
         "identifier" : "%PIX-6-302005",
         "message" : "Built UDP connection for faddr 198.207.223.240/53337 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
         "TIMESTAMP" : "2015-02-10T10:01:23+08:00",             //寫入時間
         "time" : ISODate("2004-03-29T01:54:18Z")               //syslog時間
 }
 */
// var mongodb = require('../models/db.js');
var util = require('util');
_pageunit = 50;
_max_pageunit = 50;
_statInterval = 5*60*1000;

exports.index = function(req, res){
    res.render('cdr_CRUD_show', { title: 'show cdr', resp : false});
};

/*exports.cdr_CRUD_insert = function(mongodb){
    return function(req, res) {
        //fields
        var call = {};

        //insert
        var collection = mongodb.get('cep3g');
        collection.insert(call,{safe: true}, function(err, docs){
            console.log("insert log : " + util.inspect(docs));
            res.render('cdr_CRUD_insert', {title: 'Create log', resp: docs});
        });
    };
};*/

exports.cdr_CRUD_loglist = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('cep3g_string');
        collection.col.count({},function(err, count) {
            if(err) res.redirect('cdr_CRUD_query');
            //console.log(format("count = %s", count));
            res.render('cdr_CRUD_query', {title: 'cdr', totalcount : count,resp :null});
        });
    };
};

exports.cdr_CRUD_query = function(mongodb){
    return function(req, res) {

        //field input
        var query = {};
        //if(req.body.date_time){
        //    query.date_time = req.body.date_time.trim();
        //}
        //if(req.body.charging_start_time){
        //    if(req.body.charging_end_time){
        //        query.time = {$gte: Number(req.body.charging_start_time), $lt: Number(req.body.charging_end_time)};
        //    }else{
        //        query.time = {$gte: Number(req.body.charging_start_time)};
        //    }
        //}
        //if(req.body.charging_end_time){
        //    if(req.body.charging_start_time){
        //        query.time = {$gte: Number(req.body.charging_start_time.trim()), $lt: Number(req.body.charging_end_time.trim())};
        //    }else{
        //        query.time = {$lt : Number(req.body.charging_end_time.trim())}
        //    }
        //}
        if(req.body.called_number){
            query.called_number = req.body.called_number.trim();
        }
        if(req.body.calling_imei){
            query.calling_imei = req.body.calling_imei.trim();
        }
        if(req.body.called_imei){
            query.called_imei = req.body.called_imei.trim();
        }
        if(req.body.calling_imsi){
            query.calling_imsi = req.body.calling_imsi.trim();
        }
        if(req.body.called_imsi){
            query.called_imsi = req.body.called_imsi.trim();
        }
        if(req.body.calling_number){
            query.calling_number = req.body.calling_number.trim();
        }
        //if(req.body.calling_subs_last_ci){
        //    query.calling_subs_last_ci = req.body.calling_subs_last_ci.trim();
        //}
        //if(req.body.calling_subs_last_lac){
        //    query.calling_subs_last_lac = req.body.calling_subs_last_lac.trim();
        //}
        //if(req.body.calling_subs_last_mcc){
        //    query.calling_subs_last_mcc = req.body.calling_subs_last_mcc.trim();
        //}
        //if(req.body.calling_subs_last_mnc){
        //    query.calling_subs_last_mnc = req.body.calling_subs_last_mnc.trim();
        //}
        if(req.body.exchange_id){
            query.exchange_id = req.body.exchange_id.trim();
        }
        if(req.body.cause_for_termination){
            query.cause_for_termination = req.body.cause_for_termination.trim();
        }
        //if(req.body.charging_end_time){
        //    query.charging_end_time = req.body.charging_end_time.trim();
        //}
        //if(req.body.charging_start_time){
        //    query.charging_start_time = req.body.charging_start_time.trim();
        //}
        if(req.body.orig_mcz_duration){
            query.orig_mcz_duration = req.body.orig_mcz_duration.trim();
        }
        if(req.body.term_mcz_duration){
            query.term_mcz_duration = req.body.term_mcz_duration.trim();
        }
        if(req.body.radio_network_type){
            query.radio_network_type = req.body.radio_network_type.trim();
        }
        if(req.body.record_type){
            query.record_type = req.body.record_type.trim();
        }
        //if (req.body.logid) {
        //    query._id = req.body.logid;
        //}
        console.log(util.inspect(query));

        var keys = [];
        for(var k in query) keys.push(k);

        if(keys.length==0)
            res.redirect('cdr_CRUD_query');

        //query
        var collection = mongodb.get('cep3g_string');
        collection.count({},function(err,db_count){
            collection.count(query, function (err, query_count) {
                collection.find(query, {limit: _max_pageunit}, function (err, docs) {
                    if (docs.length) console.log('docs.length: ' + docs.length);

                    res.render('cdr_CRUD_result', {
                            title: 'query cdr',
                            db_count: db_count,
                            totalcount: query_count,
                            //page_count:docs.length,
                            resp: docs
                        }
                    );
                    //if (err) res.redirect('cdr_CRUD_query');
                });
            });
        });
    };
};

exports.cdr_CRUD_count = function (mongodb) {
    return function (req, res) {
        //var page = req.query.p ? parseInt(req.query.p) : 1;
        console.log('cdr_count');
        var collection = mongodb.get('cep3g_string');
        collection.count({},function(err,count){
            collection.find({}, {limit : _pageunit ,sort : { _id : -1 }} , function (err, docs) {
                console.log('cdr: ',docs.length/*,JSON.stringify(docs[0])*/);
                if (err) res.redirect('cdr_CRUD_show');
                res.render('cdr_CRUD_show', {
                    title: 'cdr',
                    totalcount: count,
                    resp: docs
                });
            });
        });
    };
};

exports.cdr_CRUD_show = function (mongodb) {
    return function (req, res) {
        console.log('cdr_show');
        var collection = mongodb.get('cep3g_string');
        collection.count({}, function (err, count) {
            collection.find({}, {limit: _pageunit, sort: {_id: -1}}, function (e, docs) {
                // console.log("docs data : "+util.inspect(docs));
                var docdetail;
                if (docs.length == 1) docdetail = util.inspect(docs);
                //console.log(docs[0].toJSON());
                res.render('cdr_CRUD_show', {
                    title: 'cdr',
                    totalcount: count,
                    resp: docs,
                    logdetail: docdetail
                });
            });
        });
    };
};

exports.cdr_CRUD_show_pagging = function (mongodb) {
    return function (req, res) {
        var page = req.query.p ? parseInt(req.query.p) : 1;

        var collection = mongodb.get('cep3g_string');
        collection.count({}, function (err, count) {
            collection.find({}, //{/*limit: 20,*/ sort: {_id: -1}}, function (e, docs) {
                {skip : (page - 1) * _pageunit,limit : _pageunit,sort : { _id : -1 }}, function (e, docs) {
                    // console.log("docs data : "+util.inspect(docs));
                    var docdetail;
                    if (docs.length == 1) docdetail = util.inspect(docs);
                    res.render('cdr_CRUD_show', {
                        title: 'cdr',
                        totalcount: count,
                        resp: docs,
                        logdetail: docdetail,
                        page: page,
                        pageTotal: Math.ceil(docs.length / _pageunit),
                        isFirstPage: (page - 1) == 0,
                        isLastPage: ((page - 1) * _pageunit + docs.length) == docs.length
                    });
                });
        });
    };
};

exports.cdr_site_report = function(mongodb){
    return function(req, res) {

        var collection = mongodb.get('cep3g_insert');

        console.log("flow : ");
        collection.col.aggregate([
            {$match: {
                /*time: interval,up_falg:1,*/
                record_type:{$in:["1","2"]}
            }},
            {$project:{
                //STATISTIC_DATE : "$time"
                DATE:{ $substr: [ "$date_time", 0, 10 ] }
                , HOUR:{ $substr: [ "$date_time", 11, 2 ] }

                //site
                , COUNTY : { $substr: [ "$BTS_ADDRESS", 0, 9 ] }//"$BTS_ADDRESS" //縣市3 zh zhar
                , DISTRICT : { $substr: [ "$BTS_ADDRESS", 9, 9 ] }//"$BTS_CODE" //地區
                , SITE_NAME : "$SITE_NAME"
                , SITE_ID : "$SITE_ID"

                //phone_type
                //, VENDOR : "$VENDOR"
                // , MODEL : "$MODEL"

                , HANGOVER : 1
                , END_CODE : "$cause_for_termination"
                , SIM_TYPE : "$SIM_TYPE"
                , CARRIER : "$CARRIER"

                //, HO_CALLED_1 : 1
                , CALLDURATION : {$add:["$orig_mcz_duration","$term_mcz_duration"]}
            }},
            {$group:{
                _id: {
                    STATISTIC_DATE: {
                        DATE : "$DATE"
                        , HOUR: "$HOUR"
                    }
                    //site
                    , COUNTY: "$COUNTY" //縣市
                    , DISTRICT: "$DISTRICT" //地區
                    , SITE_NAME: "$SITE_NAME"
                    , SITE_ID: "$SITE_ID"

                    //phone_type
                    //, VENDOR: "$VENDOR"                , MODEL: "$MODEL"

                    , END_CODE: "$END_CODE"
                    , SIM_TYPE: "$SIM_TYPE"
                    , CARRIER: "$CARRIER"
                    //, IMEI: "$IMEI"
                }

                ,HO_CALLED_COUNT:{$sum:"$HANGOVER"}
                ,HO_CALLED_SECOND:{$sum:"$CALLDURATION"}
            }}
            ,{$project:{
                _id:0
                ,STATISTIC_DATE:"$_id.STATISTIC_DATE"
                //site
                ,COUNTY : "$_id.COUNTY"
                , DISTRICT: "$_id.DISTRICT"
                ,SITE_NAME : "$_id.SITE_NAME"

                //phone_type
                //,VENDOR : "$_id.VENDOR"
                //,MODEL : "$_id.MODEL"

                ,SIM_TYPE : "$_id.SIM_TYPE"
                ,CARRIER : "$_id.CARRIER"
                ,END_CODE: "$END_CODE"
                ,HO_CALLED_COUNT :1
                ,HO_CALLED_MINUTES :{$divide:["$HO_CALLED_SECOND",60]}
            }}
            //,{    $out:"cdr3g_agg"}
        ], function(err, result) {
            if(err) console.log("err : "+err.message);
            console.log("result : "+util.inspect(result));
            res.render('cdr_site_report', {title: 'flow', result: result });
        });
    };
};

exports.cdr_phone_report = function(mongodb){
    return function(req, res) {

        var collection = mongodb.get('cep3g_insert');

        console.log("flow : ");
        collection.col.aggregate([
            {$match: {
                /*time: interval,up_falg:1,*/
                record_type:{$in:["1","2"]}
            }},
            {$project:{
                //STATISTIC_DATE : "$time"
                DATE:{ $substr: [ "$date_time", 0, 10 ] }
                , HOUR:{ $substr: [ "$date_time", 11, 2 ] }

                //site
                //, COUNTY : { $substr: [ "$BTS_ADDRESS", 0, 9 ] }//"$BTS_ADDRESS" //縣市3 zh zhar
                //, DISTRICT : { $substr: [ "$BTS_ADDRESS", 9, 9 ] }//"$BTS_CODE" //地區
                //, SITE_NAME : "$SITE_NAME"
                //, SITE_ID : "$SITE_ID"

                //phone_type
                , VENDOR : "$VENDOR"
                , MODEL : "$MODEL"

                , HANGOVER : 1
                , END_CODE : "$cause_for_termination"
                , SIM_TYPE : "$SIM_TYPE"
                , CARRIER : "$CARRIER"

                //, HO_CALLED_1 : 1
                , CALLDURATION : {$add:["$orig_mcz_duration","$term_mcz_duration"]}
            }},
            {$group:{
                _id: {
                    STATISTIC_DATE: {
                        DATE : "$DATE"
                        , HOUR: "$HOUR"
                    }
                    //site
                    //, COUNTY: "$COUNTY" //縣市
                    //, DISTRICT: "$DISTRICT" //地區
                    //, SITE_NAME: "$SITE_NAME"
                    //, SITE_ID: "$SITE_ID"

                    //phone_type
                    , VENDOR: "$VENDOR"
                    , MODEL: "$MODEL"

                    , END_CODE: "$END_CODE"
                    , SIM_TYPE: "$SIM_TYPE"
                    , CARRIER: "$CARRIER"
                    //, IMEI: "$IMEI"
                }

                ,HO_CALLED_COUNT:{$sum:"$HANGOVER"}
                ,HO_CALLED_SECOND:{$sum:"$CALLDURATION"}
            }}
            ,{$project:{
                _id:1
                //,STATISTIC_DATE:"$_id.STATISTIC_DATE"
                //site
                //,COUNTY : "$_id.COUNTY"
                //, DISTRICT: "$_id.DISTRICT"
                //,SITE_NAME : "$_id.SITE_NAME"

                //phone_type
                //,VENDOR : "$_id.VENDOR"
                //,MODEL : "$_id.MODEL"

                //,SIM_TYPE : "$_id.SIM_TYPE"
                //,CARRIER : "$_id.CARRIER"
                //,END_CODE: "$_id.END_CODE"
                ,HO_CALLED_COUNT :1
                ,HO_CALLED_MINUTES :{$divide:["$HO_CALLED_SECOND",60]}
            }}
            //,{    $out:"cdr3g_agg"}
        ], function(err, result) {
            if(err) console.log("err : "+err.message);
            console.log("result : "+util.inspect(result));
            res.render('cdr_phone_report', {title: 'flow', result: result });
        });
    };
};