'use strict';
var newrelic = require('newrelic');

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    appPath = process.cwd();

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
require('./lib/config/util').walk(appPath + '/lib/models', null, function(path) {
    require(path);
});

if (config.dummydata && process.env.NODE_ENV !== 'test') {
    // Populate empty DB with sample data
    require('./lib/config/dummydata');
}

// Passport Configuration
var passport = require('./lib/config/passport');

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// Start server
app.listen(config.port, config.ip, function() {
    console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
