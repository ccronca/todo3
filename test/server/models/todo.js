'use strict';

/**
 * Module dependencies.
 */

var path = require('path'),
    appPath = path.join(__dirname, '../../../lib/'),
    config = require(appPath + 'config/config'),
    mongoose = require('mongoose'),
    should = require('should');

require(appPath + 'models/user');
require(appPath + 'models/todo');

var db = mongoose.connect(config.mongo.uri, config.mongo.options),
    dummy = require('../../fixtures/dummyuser'),
    user, todo;


var User = mongoose.model('User'),
    Todo = mongoose.model('Todo');


//The tests
describe('Todo Model', function() {
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
