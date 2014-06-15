"use strict"
mongoose = require("mongoose")
User = mongoose.model("User")
passport = require("passport")
LocalStrategy = require("passport-local").Strategy
FacebookStrategy = require("passport-facebook").Strategy
randomstring = require("randomstring")

# load the auth variables
configAuth = require("./auth")

###
Passport configuration
###
passport.serializeUser (user, done) ->
  done null, user.id
  return

passport.deserializeUser (id, done) ->
  User.findOne
    _id: id
  , "-salt -hashedPassword", (err, user) -> # don't ever give out the password or salt
    done err, user
    return

  return


# add other strategies for more authentication flexibility
passport.use new LocalStrategy(
  usernameField: "email"
  passwordField: "password" # this is the virtual field on the model
, (email, password, done) ->
  User.findOne
    email: email.toLowerCase()
  , (err, user) ->
    return done(err)  if err
    unless user
      return done(null, false,
        message: "This email is not registered."
      )
    unless user.authenticate(password)
      return done(null, false,
        message: "This password is not correct."
      )
    done null, user

  return
)

# =========================================================================
# FACEBOOK ================================================================
# =========================================================================
passport.use new FacebookStrategy(
  
  # pull in our app id and secret from our auth.js file
  clientID: configAuth.facebook.clientID
  clientSecret: configAuth.facebook.clientSecret
  callbackURL: configAuth.facebook.callbackURL

# facebook will send back the token and profile
, (token, refreshToken, profile, done) ->
  
  # asynchronous
  process.nextTick ->
    
    # find the user in the database based on their facebook id
    User.findOne
      "facebook.id": profile.id
    , (err, user) ->
      
      # if there is an error, stop everything and return that
      # ie an error connecting to the database
      return done(err)  if err
      
      # if the user is found, then log them in
      if user
        done null, user # user found, return that user
      else
        
        # if there is no user found with that facebook id, create them
        newUser = new User()
        newUser.facebook = {}
        
        # set all of the facebook information in our user model
        newUser.facebook.id = profile.id # set the users facebook id
        newUser.facebook.token = token # we will save the token that facebook provides to the user
        newUser.facebook.name = newUser.name = profile.name.givenName + " " + profile.name.familyName # look at the passport user profile to see how names are returned
        newUser.facebook.email = newUser.email = profile.emails[0].value # facebook can return multiple emails so we'll take the first
        newUser.password = randomstring.generate()
        
        # save our user to the database
        newUser.save (err) ->
          throw err  if err
          
          # if successful, return the new user
          done null, newUser

      return

    return

  return
)
module.exports = passport
