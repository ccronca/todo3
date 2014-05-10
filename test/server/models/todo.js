'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  db = require('../db.js'),
  should = require('should');

require(__base + 'models/todo');

var dummy = require('../fixtures/dummyuser'),
  user, todo;


var Todo = mongoose.model('Todo');


//The tests
describe('Todo Model', function() {
  before(function(done) {
    dummy.init(function(data) {
      user = data;
      Todo.find({}).remove(function() {
        todo = new Todo({
          title: 'Title',
          user: user
        });
        done();
      });
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return todo.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without title', function(done) {
      todo.title = '';

      return todo.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  describe('Method load', function() {
    it('should populate only user email', function(done) {
      Todo.load(todo._id, function(err, data) {
        data.user.should.have.property('email');
        data.user.should.not.have.properties(['hashed_password', 'password', 'roles']);
        done();
      });
    });


  });

  after(function(done) {
    todo.remove();
    done();
  });
});
