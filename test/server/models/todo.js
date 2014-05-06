'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    db = require('../db.js'),
    should = require('should');

require(__base + 'models/user');
require(__base + 'models/todo');

var dummy = require('../fixtures/dummyuser'),
    user, todo;


var User = mongoose.model('User'),
    Todo = mongoose.model('Todo');


//The tests
describe('Todo Model', function() {
    db();
    before(function(done) {
        dummy.init(function(data) {
            user = data;
            Todo.find({}).remove(function() {
                todo = new Todo({
                    title: 'Article Title',
                    user: user
                });
                done();
            });
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

    after(function(done) {
        todo.remove();
        done();
    });
});
