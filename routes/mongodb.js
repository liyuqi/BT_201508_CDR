//mongodbDemo
// var mongodb = require('../models/db.js');
//require( '../db' );
var mongoose = require('mongoose');
var events = mongoose.model('events');
var util = require('util');
exports.mongoosePrac1 = function(){
    return function(req, res) {
        events.find( function ( err, event1s ){
            //console.log("events : "+util.inspect(event1s));
            res.render( 'mongoosePrac1', {
                title : 'Express Todo Example',
                dataset : event1s
            });
        });
    };
};