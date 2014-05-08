'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.provider = 'local';
    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('email', 'You must enter a valid email address').isEmail();
    req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).json(errors);
    }

    user.roles = ['authenticated'];

    user.save(function(err) {
        if (err) return res.json(400, err);

        req.logIn(user, function(err) {
            if (err) return next(err);

            return res.json(req.user.userInfo);
        });
    });
};

/**
 *  Get profile of specified user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(404);

        res.send({
            profile: user.profile
        });
    });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return res.send(400);

                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
    res.json(req.user || null);
};
