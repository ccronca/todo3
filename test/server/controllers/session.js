'use strict';

var app = require('../../../server'),
    request = require('supertest'),
    passportStub = require('passport-stub');

require('../dummyuser');

passportStub.install(app);

var userFail = {
    'email': 'test@test.com',
    'password': '12345'
};

// user account
var user = {
    'email': 'test@test.com',
    'password': 'test'
};

describe('Server Session Tests - ', function(done) {
    afterEach(function() {
        passportStub.logout(); // logout after each test
    });
    it('Login not exists user - Return a 401', function(done) {
        request(app).post('/api/session').send(userFail).expect(401, done);
    });
    it('Logout - Return a 200', function(done) {
        request(app).del('/api/session').expect(200, done);
    });
    it('Login - Return a 200', function(done) {
        request(app).post('/api/session').send(user).expect(200, done);
    });
});
