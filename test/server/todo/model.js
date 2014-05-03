'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Todo = mongoose.model('Todo');

//Globals
var user;
var todo;

//The tests
describe('Todo Model', function() {
    beforeEach(function(done) {
        user = new User({
            name: 'Full name',
            email: 'test@test.com',
            username: 'user',
            password: 'password'
        });

        user.save(function() {
            todo = new Todo({
                title: 'Article Title',
                user: user
            });

            done();
        });
    });

    describe('Method Save', function() {
        it('should be able to save without problems', function(done) {
            return todo.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without title', function(done) {
            todo.title = '';

            return todo.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        todo.remove();
        todo.remove();
        done();
    });
});
