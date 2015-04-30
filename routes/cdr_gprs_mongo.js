/**
 * Created by Yuqi on 2015/2/16.
 */
/*** Created by Yuqi on 2015/1/21.
 *
 */
// var mongodb = require('../models/db.js');
var util = require('util');
_pageunit = 50;
_statInterval = 5*60*1000;

exports.index = function(req, res){
    res.render('cdr_CRUD_gprs_show', { title: 'show gprs', resp : false});
};

/*exports.cdr_CRUD_insert = function(mongodb){
    return function(req, res) {
        //fields
        var call = {};

        //insert
        var collection = mongodb.get('cepgprs_sample');
        collection.insert(call,{safe: true}, function(err, docs){
            console.log("insert log : " + util.inspect(docs));
            res.render('cdr_CRUD_insert', {title: 'Create log', resp: docs});
        });
    };
};*/

exports.cdr_CRUD_loglist = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('cepgprs_sample');
        collection.col.count({},function(err, count) {
            if(err) res.redirect('cdr_CRUD_gprs_query');
            //console.log(format("count = %s", count));
            res.render('cdr_CRUD_gprs_query', {title: 'cdr', totalcount : count,resp :null});
        });
    };
};

exports.cdr_CRUD_query = function(mongodb){
    return function(req, res) {

        //field input
        var query = {};

        if(req.body.RECORD_TYPE){ //1:MOC,2:MTC
            query.RECORD_TYPE = req.body.RECORD_TYPE.trim();
        }

        /*  時間 抓狂???  */
        if(req.body.G_RECORD_OPENING_TIME/*date_time*/){
            query.G_RECORD_OPENING_TIME = {$regex: new RegExp('^'+req.body.G_RECORD_OPENING_TIME.trim())};
        }

        if(req.body.G_UPLINK/**/){
            query.G_UPLINK = req.body.G_UPLINK.trim();
        }
        if(req.body.G_DOWNLINK/**/){
            query.G_DOWNLINK = req.body.G_DOWNLINK.trim();
        }

        if(req.body.SERVED_MSISDN/**/){
            query.SERVED_MSISDN = req.body.SERVED_MSISDN.trim();
        }
        if(req.body.G_DIAGNOSTICS/**/){
            query.G_DIAGNOSTICS = req.body.G_DIAGNOSTICS.trim();
        }
        if(req.body.CALLED_SUBS_FIRST_LAC/**/){
            query.CALLED_SUBS_FIRST_LAC = req.body.CALLED_SUBS_FIRST_LAC.trim();
        }
        if(req.body.CALLED_SUBS_FIRST_SAC/**/){
            query.CALLED_SUBS_FIRST_SAC = req.body.CALLED_SUBS_FIRST_SAC.trim();
        }

        if(req.body.logid){
            query._id = req.body.logid;
        }
        console.log(query);

        var keys = [];
        for(var k in query) keys.push(k);

        if(keys.length==0)
            res.redirect('/cdr_CRUD_gprs_query');
        //query
        var collection = mongodb.get('cepgprs_sample');
        collection.count({},function(err,db_count){
            collection.count(query, function (err, query_count) {
                collection.find(query, {limit: _max_pageunit}, function (err, docs) {
                    if (query_count) console.log('docs.length: ' + query_count);
                    if (err) res.redirect('/cdr_CRUD_gprs_query');
                    res.render('cdr_CRUD_gprs_result', {
                            title: 'query cdr',
                            db_count:db_count,
                            totalcount:query_count,
                            //page_count:docs.length,
                            resp: docs
                        }
                    );
                });
            });
        });
    };
};

exports.cdr_CRUD_count = function (mongodb) {
    return function (req, res) {
        //var page = req.query.p ? parseInt(req.query.p) : 1;
        console.log('gprs_count');
        var collection = mongodb.get('cepgprs_sample');
        collection.count({},function(err,count){
            collection.find({}, {limit : _pageunit ,sort : { _id : -1 }} , function (err, docs) {
                //if(docs) console.log('cdr: ',docs.length/*,JSON.stringify(docs[0])*/);
                if (err) res.redirect('cdr_CRUD_gprs_show');
                res.render('cdr_CRUD_gprs_show', {
                    //db_count:
                    title: 'cdr count',
                    totalcount: count,
                    resp: docs
                });
            });
        });
    };
};

exports.cdr_CRUD_show = function (mongodb) {
    return function (req, res) {
        console.log('gprs_show');
        var collection = mongodb.get('cepgprs_sample');
        collection.count({}, function (err, count) {
            collection.find({}, {limit: _pageunit, sort: {_id: -1}}, function (e, docs) {
                // console.log("docs data : "+util.inspect(docs));
                var docdetail;
                if (docs.length == 1) docdetail = util.inspect(docs);
                //console.log(docs[0].toJSON());
                res.render('cdr_CRUD_gprs_show', {
                    title: 'cdr show',
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

        var collection = mongodb.get('cepgprs_sample');
        collection.count({}, function (err, count) {
            collection.find({}, //{/*limit: 20,*/ sort: {_id: -1}}, function (e, docs) {
                {skip : (page - 1) * _pageunit,limit : _pageunit,sort : { _id : -1 }}, function (e, docs) {
                    // console.log("docs data : "+util.inspect(docs));
                    var docdetail;
                    if (docs.length == 1) docdetail = util.inspect(docs);
                    res.render('cdr_CRUD_gprs_show', {
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

exports.cdr_gprs_site_report = function(mongodb){
    return function(req, res) {

        //query
        var collection = mongodb.get('cepgprs_agg');
        collection.count({},function(err,db_count){
            collection.count({}, function (err, query_count) {
                collection.find({}, {limit: _max_pageunit}, function (err, docs) {
                    if (docs.length) console.log('docs.length: ' + docs.length);

                    res.render('cdr_CRUD_gprs_flow', {
                        title: 'cepgprs report',
                        db_count: db_count,
                        totalcount: query_count,
                        //page_count:docs.length,
                        result: docs
                    });
                    //if (err) res.redirect('cdr_CRUD_query');
                });
            });
        });
    };
};

//exports.cdr_gprs_site_report = function(mongodb){
//    return function(req, res) {
//
//        //var collection = mongodb.get('cdrgprs_agg');
//        var collection = mongodb.get('cepgprs_join');
//        var i =0;
//        console.log("flow : ");
//        collection.col.aggregate([
//            {$match: {
//                /*time: interval,up_falg:1,*/
//                "RECORD_TYPE":"19"
//            }}
//            ,{$project:{
//                //time:1,
//                //STATISTIC_DATE : "$time"
//                DATE:{ $substr: [ "$G_RECORD_OPENING_TIME", 0, 10 ] }
//                , HOUR:{ $substr: [ "$G_RECORD_OPENING_TIME", 11, 2 ] }
//                //, qHOUR:{ $substr: [ "G_RECORD_OPENING_TIME", 14, 2 ] }
//
//                //site
//                , COUNTY : { $substr: [ "$BTS_ADDRESS", 0, 9 ] }//"$BTS_ADDRESS" //縣市
//                , DISTRICT : { $substr: [ "$BTS_ADDRESS", 9, 9 ] }//"$BTS_CODE" //地區
//                , SITE_NAME : "$SITE_NAME"
//                , SITE_ID : "$SITE_ID"
//                //, END_CODE: "$END_CODE"
//
//                , G_UPLINK : 1
//                , G_DOWNLINK : 1
//                , DATA_LOAD : {$add:["$G_UPLINK","$G_DOWNLINK"]}
//            }}
//            ,{$group:{
//                _id: {
//                    STATISTIC_DATE: {
//                        DATE : "$DATE"
//                        , HOUR : "$HOUR"
//                    }
//                    //site
//                    , COUNTY: "$COUNTY" //縣市
//                    , DISTRICT: "$DISTRICT" //地區
//                    , SITE_NAME: "$SITE_NAME"
//                    , SITE_ID: "$SITE_ID"
//                    //, END_CODE: "$END_CODE"
//                }
//
//                , DATA_UPLOAD: {$sum: "$G_UPLINK"}
//                , DATA_DOWNLOAD: {$sum: "G_DOWNLINK"}
//                , DATA_LOAD: {$sum: "$DATA_LOAD"}
//            }}
//            ,{$project:{
//                _id:1
//                //,STATISTIC_DATE:"$_id.STATISTIC_DATE"
//
//                ////site
//                //,COUNTY : "$_id.COUNTY"
//                //,SITE_NAME : "$_id.SITE_NAME"
//
//                , DATA_UPLOAD: 1
//                , DATA_DOWNLOAD: 1
//                , DATA_LOAD: {$divide: ["$DATA_LOAD", 60]}
//            }}
//            //,{$out:"cdrgprs_agg"}
//        ], function(err, result) {
//            i++;
//            if(err) res.redirect('cdr_CRUD_gprs_show');//console.log("err : "+err.message);
//            if(i==5) console.log("result : "+util.inspect(result));
//            //try{ console.log("result : "+ util.inspect(result[0]));}catch(e){}
//            res.render('cdr_CRUD_gprs_flow', {title: 'flow', result: result });
//        });
//    };
//};