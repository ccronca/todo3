'use strict';

require(process.cwd() + '/lib/models/todo');

var mongoose = require('mongoose'),
  Todo = mongoose.model('Todo'),
  todos = require('./dummytodosdata'),
  dummyuser = require('./dummyuser')

  // Clear old users, then add a default user

  module.exports = function(callback) {
    Todo.find({}).remove(function() {
      dummyuser(function(user) {
        todos = todos.map(function(t) {
          t['user'] = user;
          return t;
        });
        Todo.create(todos, function(err, data) {
          if (err) return new Error(err);
          callback(user);
        });
      });
    });
  };
