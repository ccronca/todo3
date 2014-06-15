"use strict"
mongoose = require("mongoose")
User = mongoose.model("User")
passport = require("passport")

###
Auth callback
###
exports.authCallback = (req, res) ->
  res.redirect "/"
  return


###
Show login form
###
exports.signin = (req, res) ->
  return res.redirect("/")  if req.isAuthenticated()
  res.redirect "#!/login"
  return


###
Create user
###
exports.create = (req, res, next) ->
  newUser = new User(req.body)
  newUser.provider = "local"
  newUser.save (err) ->
    return res.json(400, err)  if err
    req.logIn newUser, (err) ->
      return next(err)  if err
      res.json req.user.userInfo

    return

  return


###
Get profile of specified user
###
exports.show = (req, res, next) ->
  userId = req.params.id
  User.findById userId, (err, user) ->
    return next(err)  if err
    return res.send(404)  unless user
    res.send profile: user.profile
    return

  return


###
Change password
###
exports.changePassword = (req, res, next) ->
  userId = req.user._id
  oldPass = String(req.body.oldPassword)
  newPass = String(req.body.newPassword)
  User.findById userId, (err, user) ->
    if user.authenticate(oldPass)
      user.password = newPass
      user.save (err) ->
        return res.send(400)  if err
        res.send 200
        return

    else
      res.send 403
    return

  return


###
Get current user
###
exports.me = (req, res) ->
  res.json req.user or null
  return

exports.loadFixtures = (req, res) ->
  fixtures = require(process.cwd() + "/test/server/fixtures/dummyuser")
  fixtures ->
    res.json success: true
    return

  return
