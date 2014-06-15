"use strict"

# lib/controllers/todos.js
mongoose = require("mongoose")
Todo = mongoose.model("Todo")

###
Find todo by id and store it in the request
###
exports.todo = (req, res, next, id) ->
  Todo.load id, (err, todo) ->
    return res.json(500, err)  if err
    return res.json(404, "Failed to load todo " + id)  unless todo
    req.todo = todo
    next()
    return

  return


###
List of todos
###
exports.query = (req, res) ->
  Todo.find(user: req.user).sort("-createdAt").populate("user", "name email").exec (err, todos) ->
    return res.json(500, err)  if err
    res.json todos
    return

  return


###
Show a todo
###
exports.show = (req, res) ->
  res.json req.todo
  return


###
Create a todo
###
exports.create = (req, res) ->
  todo = new Todo(req.body)
  todo.user = req.user
  todo.save (err) ->
    return res.json(500, err)  if err
    res.json todo
    return

  return


###
Update a todo
###
exports.update = (req, res) ->
  delete req.body._id

  delete req.body.user

  Todo.findByIdAndUpdate req.todo._id, req.body, (err, updatedTodo) ->
    return res.json(500, err)  if err
    res.json updatedTodo
    return

  return


###
Remove a todo
###
exports.remove = (req, res) ->
  todo = req.todo
  todo.remove (err) ->
    return res.json(500, err)  if err
    res.json todo
    return

  return

exports.loadFixtures = (req, res) ->
  fixtures = require(process.cwd() + "/test/server/fixtures/dummytodos")
  fixtures (data) ->
    res.json
      success: true
      data: data

    return

  return
