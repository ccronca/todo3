should = require('should')
mongoose = require('mongoose')
db = require('../db')
express = require('express')
request = require('supertest')
session = require(process.cwd() + '/lib/controllers/session')
user = {}

dummy = require('../fixtures/dummyuser')

# Passport Configuration
passport = require(process.cwd() + '/lib/config/passport')

# Setup Express
app = express();
require(process.cwd() + '/lib/config/express')(app)

app.route('/api/session')
  .post(session.login)
  .delete(session.logout)

userFail =
  'email': 'test@test.com',
  'password': '12345'


describe 'Server Session Tests - ', (done) ->
  before (done) ->
    dummy (data) ->
      user = data;
      done();

  it 'Login not exists user - Return a 401', (done) ->
    request(app).post('/api/session').send(userFail).expect(401, done)

  it 'Logout - Return a 200', (done) ->
    request(app).del('/api/session').expect(200, done)

  it 'Login - Return a 200', (done)  ->
    request(app).post('/api/session').send(
      'email': user.email,
      'password': user.password
    ).expect(200, done)
