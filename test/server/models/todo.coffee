###
Module dependencies.
###
mongoose = require("mongoose")
db = require("../db")
should = require("should")
require process.cwd() + "/lib/models/todo"
dummy = require("../fixtures/dummyuser")
user = undefined
todo = undefined
Todo = mongoose.model("Todo")

#The tests
describe "Todo Model", ->
  before (done) ->
    dummy (data) ->
      user = data
      Todo.find({}).remove ->
        todo = new Todo(
          title: "Title"
          user: user
        )
        done()
        return

      return

    return

  describe "Method Save", ->
    it "should be able to save without problems", (done) ->
      todo.save (err) ->
        should.not.exist err
        done()
        return


    it "should be able to show an error when try to save without title", (done) ->
      todo.title = ""
      todo.save (err) ->
        should.exist err
        done()
        return


    return

  describe "Method load", ->
    it "should populate only user email", (done) ->
      Todo.load todo._id, (err, data) ->
        data.user.should.have.property "email"
        data.user.should.not.have.properties [
          "hashed_password"
          "password"
          "roles"
        ]
        done()
        return

      return

    return

  after (done) ->
    todo.remove()
    done()
    return

  return

