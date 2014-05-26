'use strict';

// lib/controllers/todos.js

var mongoose = require('mongoose'),
  Todo = mongoose.model('Todo');

/**
 * Find todo by id and store it in the request
 */
exports.todo = function(req, res, next, id) {
  Todo.load(id, function(err, todo) {
    if (err) return res.json(500, err);
    if (!todo) return res.json(404, 'Failed to load todo ' + id);
    req.todo = todo;
    next();
  });
};

/**
 * List of todos
 */
exports.query = function(req, res) {
  Todo.find({
    user: req.user
  }).sort('-createdAt').populate('user', 'name email').exec(function(err, todos) {
    if (err) return res.json(500, err);
    res.json(todos);
  });
};

/**
 * Show a todo
 */
exports.show = function(req, res) {
  res.json(req.todo);
};

/**
 * Create a todo
 */
exports.create = function(req, res) {
  var todo = new Todo(req.body);
  todo.user = req.user;

  todo.save(function(err) {
    if (err) return res.json(500, err);
    res.json(todo);
  });
};

/**
 * Update a todo
 */
exports.update = function(req, res) {
  delete req.body._id;
  delete req.body.user;

  Todo.findByIdAndUpdate(req.todo._id, req.body, function(err, updatedTodo) {
    if (err) return res.json(500, err);
    res.json(updatedTodo);
  });
};

/**
 * Remove a todo
 */
exports.remove = function(req, res) {
  var todo = req.todo;

  todo.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(todo);
  });
};


exports.loadFixtures = function(req, res) {
  var fixtures = require(process.cwd() +
    '/test/server/fixtures/dummytodos');
  fixtures(function(data) {
    res.json({
      'success': true,
      'data': data
    });
  });
};
