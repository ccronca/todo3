'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  db = require('../db.js'),
  express = require('express'),
  request = require('supertest'),
  passportStub = require('passport-stub'),
  user, req = {}, res = {};

require(process.cwd() + '/lib/models/todo');


var dummy = require('../fixtures/dummyuser'),
  todos = require(process.cwd() + '/lib/controllers/todos');

// Passport Configuration
var passport = require(process.cwd() + '/lib/config/passport');

// Setup Express
var app = express();
require(process.cwd() + '/lib/config/express')(app);

passportStub.install(app);

var todo = {
  'title': 'Test Title'
};

app.param('todoId', todos.todo);

app.route('/api/todos')
  .post(todos.create)
  .get(todos.query);
app.route('/api/todos/:todoId')
  .get(todos.show)
  .put(todos.update)
  .delete(todos.remove);

var create = function(done) {
  request(app).post('/api/todos').send(todo).end(done);
};

describe('Server Todos Controller - ', function(done) {
  before(function(done) {
    dummy(function(data) {
      user = data;
      done();
    });
  });
  afterEach(function() {
    passportStub.logout(); // logout after each test
  });
  beforeEach(function() {
    passportStub.login(user);
  });

  it('Create a Todo should respond 200', function(done) {
    request(app).post('/api/todos').send(todo).expect(200).end(done);
  });

  it('Create a Todo should respond with _id data', function(done) {
    create(function(err, res) {
      should.not.exist(err);
      should.exists(res.body._id);
      done();
    });
  });

  it('List todos should respond 200', function(done) {
    request(app).get('/api/todos').expect(200).end(done);
  });

  it('Get mailformed id should respond 500', function(done) {
    request(app).get('/api/todos/nonexistent').expect(500).end(done);
  });
  it('Get unreal id should respond 404', function(done) {
    var id = mongoose.Types.ObjectId();
    request(app).get('/api/todos/' + id).expect(404).end(done);
  });

  it('Get todo should respond 200', function(done) {
    create(function(err, res) {
      request(app).get('/api/todos/' + res.body._id).expect(200).end(done);
    });
  });

});
