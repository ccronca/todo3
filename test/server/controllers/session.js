'use strict';

var app = require('../../../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passportStub = require('passport-stub');

passportStub.install(app);

// user account
var user = {
    'email': 'test@test.com',
    'password': '12345'
};

describe('Server Session Tests - ', function(done) {
    afterEach(function() {
        passportStub.logout(); // logout after each test
    });
    it('Login not exists user - Return a 401', function(done) {
        request(app).post('/api/session').send(user).expect(401, done);
    });
    it('Logout - Return a 200', function(done) {
        request(app).del('/api/session').expect(200, done);
    });
    it('Login - Return a 200', function(done) {
        // Clear old users, then add a default user
        User.find({}).remove(function() {
            User.create({
                provider: 'local',
                name: 'Test User',
                email: 'test@test.com',
                password: '12345'
            }, function() {
                request(app).post('/api/session').send(user).expect(200, done);
            });
        });
    });
});
