'use strict';

require(process.cwd() + '/lib/models/todo');

var mongoose = require('mongoose'),
  Todo = mongoose.model('Todo'),
  todos = require('./dummytodosdata');

// Clear old users, then add a default user

module.exports = function() {
  Todo.find({}).remove(function() {
    for (var i = todos.length - 1; i >= 0; i--) {
      Todo.create(todos[i]);
    }
  });
};
