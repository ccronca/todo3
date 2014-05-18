'use strict';

require(process.cwd() + '/lib/models/user');

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  user = require('./dummyuserdata');

// Clear old users, then add a default user

module.exports = function(callback) {
  User.find({}).remove(function() {
    User.create(user, function(err, data) {
      if (err) return new Error(err);
      callback(data);
    });
  });
};
