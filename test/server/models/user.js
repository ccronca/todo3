'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  db = require('../db.js'),
  User = mongoose.model('User');

var dummy = require('../fixtures/dummyuser'),
  user;

describe('User Model', function() {
  before(function(done) {
    dummy(function(data) {
      user = data;
      done();
    });
  });

  afterEach(function(done) {
    User.remove().exec();
    done();
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save();
    var userDup = new User(user);
    userDup.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should hash password when save', function(done) {
    user.save(function(err, data) {
      should.exist(data.hashedPassword);
      done();
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err, data) {
      should.exist(err);
      done();
    });
  });

  it('should authenticate user if password is valid', function(done) {
    user.authenticate('test').should.be.true;
    done();
  });

  it('should not authenticate user if password is invalid', function(done) {
    user.authenticate('blah').should.not.be.true;
    done();
  });

  it('should hash password', function(done) {
    user.encryptPassword('test').should.be.equal(user.hashedPassword);
    done();
  });
});
