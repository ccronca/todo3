'use strict';

require(__base + 'models/user');

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  user = require('./dummyuserdata');

// Clear old users, then add a default user

module.exports.init = function(callback) {
  User.find({}).remove(function() {
    User.create(user, function() {
      console.log('finished populating users');
      callback(user);
    });
  });
};
