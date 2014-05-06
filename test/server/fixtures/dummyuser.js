'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');
// Clear old users, then add a default user

module.exports.init = function(callback) {
    var user = new User({
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    });

    User.find({}).remove(function() {
        User.create(user, function() {
            console.log('finished populating users');
            callback(user);
        });
    });
};
