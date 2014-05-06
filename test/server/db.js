'use strict';

var mongoose = require('mongoose'),
    config = require(__base + 'config/config'),
    db = mongoose.connect(config.mongo.uri, config.mongo.options),
    connection = mongoose.connection;

before(function(done) {
    connection.on('open', function() {
        connection.db.dropDatabase(done);
    });
});

after(function(done) {
    connection.close(done);
});

module.exports = function() {
    var afterEach = function(done) {
        connection.db.dropDatabase(done);
    };
};
