require process.cwd() + "/lib/models/todo"
mongoose = require("mongoose")
Todo = mongoose.model("Todo")
todos = require("./dummytodosdata")
dummyuser = require("./dummyuser")

# Clear old users, then add a default user
module.exports = (callback) ->
  Todo.find({}).remove ->
    dummyuser (user) ->
      todos = todos.map((t) ->
        t["user"] = user
        t
      )
      Todo.create todos, (err, data) ->
        return new Error(err)  if err
        callback user
        return

      return

    return

  return
