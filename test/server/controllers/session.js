'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  db = require('../db.js'),
  passportStub = require('passport-stub'),
  express = require('express'),
  request = require('supertest'),
  session = require(__base + 'controllers/session'),
  user;

require(__base + 'models/user');
var dummy = require('../fixtures/dummyuser');

// Passport Configuration
// var passport = require(__base + 'config/passport');

// Setup Express
var app = express();
require(__base + 'config/express')(app);

app.route('/api/session')
  .post(session.login)
  .delete(session.logout);

passportStub.install(app);


var userFail = {
  'email': 'test@test.com',
  'password': '12345'
};

var dummy = require('../fixtures/dummyuser'),
  user;

describe('Server Session Tests - ', function(done) {
  db();
  before(function(done) {
    dummy.init(function(data) {
      user = data;
      done();
    });
  });

  afterEach(function() {
    passportStub.logout(); // logout after each test
  });
  it('Login not exists user - Return a 401', function(done) {
    request(app).post('/api/session').send(userFail).expect(401, done);
  });
  it('Logout - Return a 200', function(done) {
    passportStub.login(user);
    request(app).del('/api/session').expect(200, done);
  });
  it('Login - Return a 200', function(done) {
    request(app).post('/api/session').send({
      'email': 'test@test.com',
      'password': 'test'
    }).expect(200, done);
  });
});
