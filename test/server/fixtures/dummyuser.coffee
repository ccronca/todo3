require process.cwd() + "/lib/models/user"
mongoose = require("mongoose")
User = mongoose.model("User")
user = require("./dummyuserdata")

# Clear old users, then add a default user
module.exports = (callback) ->
  User.find({}).remove ->
    User.create user, (err, data) ->
      return new Error(err)  if err
      callback data
      return

    return

  return
