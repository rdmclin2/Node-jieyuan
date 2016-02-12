var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function(){
    var db = mongoose.connect(config.db,function(err) {
        if(err) {
            console.log('connection error', err);
        } else {
            console.log('connection successful : ' + config.db);
        }
    });
    return db;
};