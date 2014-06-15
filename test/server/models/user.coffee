should = require('should')
mongoose = require('mongoose')
db = require('../db')
User = mongoose.model('User')

dummy = require('../fixtures/dummyuser')
user = {}

describe 'User Model', ->
  before (done) ->
    dummy (data) ->
      user = data
      done()

  afterEach (done) ->
    User.remove().exec()
    done()

  it 'should fail when saving a duplicate user', (done) ->
    user.save()
    userDup = new User(user)
    userDup.save (err) ->
      should.exist(err)
      done()

  it 'should hash password when save', (done) ->
    user.save (err, data) ->
      should.exist(data.hashedPassword)
      done()

  it 'should fail when saving without an email', (done) ->
    user.email = ''
    user.save (err, data) ->
      should.exist(err)
      done()

  it 'should authenticate user if password is valid', (done) ->
    user.authenticate('test').should.be.true
    done()

  it 'should not authenticate user if password is invalid', (done) ->
    user.authenticate('blah').should.not.be.true
    done()

  it 'should hash password', (done) ->
    user.encryptPassword('test').should.be.equal(user.hashedPassword)
    done()
