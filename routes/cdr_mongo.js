/**
 * Created by Yuqi on 2015/2/16.
 */
/*** Created by Yuqi on 2015/1/21.
 *
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
        var collection = mongodb.get('cep3g_sample');
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
        var collection = mongodb.get('cep3g_sample');
        collection.count({},function(err,db_count){
            collection.count(query, function (err, query_count) {
                collection.find(query, {limit: _max_pageunit}, function (err, docs) {
                    if (docs.length) console.log('docs.length: ' + docs.length);

                    res.render('cdr_CRUD_query', {
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
        var collection = mongodb.get('cep3g_sample');
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
        var collection = mongodb.get('cep3g_sample');
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

        var collection = mongodb.get('cep3g_sample');
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

exports.cdr_3g_site_report = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('cep3g_agg');
        collection.col.count({},function(err, count) {
            if(err) res.redirect('cdr_3g_site_query');
            //console.log(format("count = %s", count));
            res.render('cdr_3g_site_query', {title: 'cdr', totalcount : count,resp :null});
        });
    };
};


exports.cdr_3g_site_query = function(mongodb){
    return function(req, res) {

        //field input
        var query = {_id:null};

        if(req.body.DATE){
            query._id.DATE = req.body.DATE.trim();
        }
        if(req.body.HOUR){
            query._id.HOUR = req.body.HOUR.trim();
        }
        if(req.body.COUNTY){
            query._id.COUNTY = req.body.COUNTY.trim();
        }
        if(req.body.DISTRICT){
            query._id.DISTRICT = req.body.DISTRICT.trim();
        }
        if(req.body.SITE_NAME){
            query._id.SITE_NAME = req.body.SITE_NAME.trim();
        }
        if(req.body.SITE_ID){
            query._id.SITE_ID = req.body.SITE_ID.trim();
        }
        if(req.body.END_CODE){
            query._id.END_CODE = req.body.END_CODE.trim();
        }
        if(req.body.SIM_TYPE){
            query._id.SIM_TYPE = req.body.SIM_TYPE.trim();
        }
        if(req.body.CARRIER){
            query._id.CARRIER = req.body.CARRIER.trim();
        }

        console.log(util.inspect(query));

        var keys = [];
        for(var k in query) keys.push(k);

        if(keys.length==0)
            res.redirect('cdr_3g_site_query');

        //query
        var collection = mongodb.get('cep3g_agg');
        collection.count({},function(err,db_count){
            collection.count(query, function (err, query_count) {
                collection.find(query, {limit: _max_pageunit}, function (err, docs) {
                    if (docs.length) console.log('docs.length: ' + docs.length);

                    res.render('cdr_3g_site_query', {
                            title: 'query cep3g',
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

//exports.cdr_3g_site_report = function(mongodb){
//    return function(req, res) {
//
//        //query
//        var collection = mongodb.get('cep3g_agg');
//        collection.count({},function(err,db_count){
//            collection.count({}, function (err, query_count) {
//                collection.find({}, {limit: _max_pageunit}, function (err, docs) {
//                    if (docs.length) console.log('docs.length: ' + docs.length);
//
//                    res.render('cdr_3g_site_report', {
//                        title: 'cep3g site',
//                        db_count: db_count,
//                        totalcount: query_count,
//                        //page_count:docs.length,
//                        resp: docs
//                    });
//                    //if (err) res.redirect('cdr_CRUD_query');
//                });
//            });
//        });
//    };
//};

exports.cdr_3g_phone_report = function(mongodb){
    return function(req, res) {

        //query
        var collection = mongodb.get('cep3g_agg');
        collection.count({},function(err,db_count){
            collection.count({}, function (err, query_count) {
                collection.find({}, {limit: _max_pageunit}, function (err, docs) {
                    if (docs.length) console.log('docs.length: ' + docs.length);

                    res.render('cdr_3g_phone_report', {
                        title: 'cep3g phone',
                        db_count: db_count,
                        totalcount: query_count,
                        //page_count:docs.length,
                        resp: docs
                    });
                    //if (err) res.redirect('cdr_CRUD_query');
                });
            });
        });
    };
};

//exports.cdr_3g_site_report = function(mongodb){
//    return function(req, res) {
//
//        var collection = mongodb.get('cep3g_join');
//        var i =0;
//        console.log("site2g : ");
//        collection.col.aggregate([
//            {$match: {
//                /*time: interval,up_falg:1,*/
//                record_type:{$in:["1","2"]}
//                //,SITE_ID: '71778'
//            }}
//            ,{$project:{
//                //STATISTIC_DATE : "$time"
//                DATE:{ $substr: [ "$date_time", 0, 10 ] }
//                , HOUR:{ $substr: [ "$date_time", 11, 2 ] }
//
//                //site
//                , COUNTY : { $substr: [ "$BTS_ADDRESS", 0, 9 ] }//"$BTS_ADDRESS" //縣市3 zh zhar
//                , DISTRICT : { $substr: [ "$BTS_ADDRESS", 9, 9 ] }//"$BTS_CODE" //地區
//                , SITE_NAME : "$SITE_NAME"
//                , SITE_ID : "$SITE_ID"
//
//                ////phone_type
//                //, VENDOR : "$VENDOR"
//                // , MODEL : "$MODEL"
//
//                , HANGOVER : 1
//                , END_CODE : "$cause_for_termination"
//                , SIM_TYPE : "$SIM_TYPE"
//                , CARRIER : "$CARRIER"
//
//                //, HO_CALLED_1 : 1
//                , CALLDURATION : {$add:["$orig_mcz_duration","$term_mcz_duration"]}
//            }}
//            ,{$group:{
//                _id: {
//                    STATISTIC_DATE: {
//                        DATE : "$DATE"
//                        , HOUR: "$HOUR"
//                    }
//                    //site
//                    , COUNTY: "$COUNTY" //縣市
//                    , DISTRICT: "$DISTRICT" //地區
//                    , SITE_NAME: "$SITE_NAME"
//                    , SITE_ID: "$SITE_ID"
//
//                    ////phone_type
//                    //, VENDOR: "$VENDOR"
//                    //, MODEL: "$MODEL"
//
//                    , END_CODE: "$END_CODE"
//                    , SIM_TYPE: "$SIM_TYPE"
//                    , CARRIER: "$CARRIER"
//                    //, IMEI: "$IMEI"
//                }
//
//                ,HO_CALLED_COUNT:{$sum:"$HANGOVER"}
//                ,HO_CALLED_SECOND:{$sum:"$CALLDURATION"}
//            }}
//            ,{$project:{
//                _id:1
//                //,STATISTIC_DATE:"$_id.STATISTIC_DATE"
//                ////site
//                //,COUNTY : "$_id.COUNTY"
//                //, DISTRICT: "$_id.DISTRICT"
//                //,SITE_NAME : "$_id.SITE_NAME"
//
//                ////phone_type
//                //,VENDOR : "$_id.VENDOR"
//                //,MODEL : "$_id.MODEL"
//
//                //,SIM_TYPE : "$_id.SIM_TYPE"
//                //,CARRIER : "$_id.CARRIER"
//                //,END_CODE: "$_id.END_CODE"
//                ,HO_CALLED_COUNT :1
//                ,HO_CALLED_MINUTES :{$divide:["$HO_CALLED_SECOND",60]}
//            }}
//            //,{    $out:"cdr3g_agg"}
//        ], function(err, result) {
//            i++;
//            if(err) res.redirect('cdr_CRUD_3g_show');//console.log("err : "+err.message);
//            if(i==5) console.log("result : "+util.inspect(result));
//            res.render('cdr_3g_site_report', {title: 'flow', resp: result });
//        });
//    };
//};
//
//exports.cdr_3g_phone_report = function(mongodb){
//    return function(req, res) {
//
//        var collection = mongodb.get('cep3g_join');
//        var i=0;
//        console.log("phone2g : ");
//        collection.col.aggregate([
//            {$match: {
//                /*time: interval,up_falg:1,*/
//                record_type:{$in:["1","2"]}
//            }}
//            ,{$project:{
//                //STATISTIC_DATE : "$time"
//                DATE:{ $substr: [ "$date_time", 0, 10 ] }
//                , HOUR:{ $substr: [ "$date_time", 11, 2 ] }
//
//                ////site
//                //, COUNTY : { $substr: [ "$BTS_ADDRESS", 0, 9 ] }//"$BTS_ADDRESS" //縣市3 zh zhar
//                //, DISTRICT : { $substr: [ "$BTS_ADDRESS", 9, 9 ] }//"$BTS_CODE" //地區
//                //, SITE_NAME : "$SITE_NAME"
//                //, SITE_ID : "$SITE_ID"
//
//                //phone_type
//                , VENDOR : "$VENDOR"
//                , MODEL : "$MODEL"
//
//                , HANGOVER : 1
//                , END_CODE : "$cause_for_termination"
//                , SIM_TYPE : "$SIM_TYPE"
//                , CARRIER : "$CARRIER"
//
//                //, HO_CALLED_1 : 1
//                , CALLDURATION : {$add:["$orig_mcz_duration","$term_mcz_duration"]}
//            }}
//            ,{$group:{
//                _id: {
//                    STATISTIC_DATE: {
//                        DATE : "$DATE"
//                        , HOUR: "$HOUR"
//                    }
//                    ////site
//                    //, COUNTY: "$COUNTY" //縣市
//                    //, DISTRICT: "$DISTRICT" //地區
//                    //, SITE_NAME: "$SITE_NAME"
//                    //, SITE_ID: "$SITE_ID"
//
//                    //phone_type
//                    , VENDOR: "$VENDOR"
//                    , MODEL: "$MODEL"
//
//                    , END_CODE: "$END_CODE"
//                    , SIM_TYPE: "$SIM_TYPE"
//                    , CARRIER: "$CARRIER"
//                    //, IMEI: "$IMEI"
//                }
//
//                ,HO_CALLED_COUNT:{$sum:"$HANGOVER"}
//                ,HO_CALLED_SECOND:{$sum:"$CALLDURATION"}
//            }}
//            ,{$project:{
//                _id:1
//                //,STATISTIC_DATE:"$_id.STATISTIC_DATE"
//                ////site
//                //,COUNTY : "$_id.COUNTY"
//                //, DISTRICT: "$_id.DISTRICT"
//                //,SITE_NAME : "$_id.SITE_NAME"
//
//                ////phone_type
//                //,VENDOR : "$_id.VENDOR"
//                //,MODEL : "$_id.MODEL"
//
//                //,SIM_TYPE : "$_id.SIM_TYPE"
//                //,CARRIER : "$_id.CARRIER"
//                //,END_CODE: "$_id.END_CODE"
//                ,HO_CALLED_COUNT :1
//                ,HO_CALLED_MINUTES :{$divide:["$HO_CALLED_SECOND",60]}
//            }}
//            //,{    $out:"cdr3g_agg"}
//        ], function(err, result) {
//            i++;
//            if(err) res.redirect('cdr_CRUD_3g_show');//console.log("err : "+err.message);
//            if(i==5) console.log("result : "+util.inspect(result));
//            res.render('cdr_3g_phone_report', {title: 'flow', resp: result });
//        });
//    };
//};