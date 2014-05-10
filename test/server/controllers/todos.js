// 'use strict';

// var app = require('../../../server'),
//     user, dummy = require('../../fixtures/dummyuser'),
//     todoscontroller = require('../../../lib/controllers/todos.js'),
//     should = require('should'),
//     request = require('supertest'),
//     passportStub = require('passport-stub'),
//     user,
//     todoid;

// passportStub.install(app);

// dummy.init(function(data) {
//     user = data;
// });

// var todo = {
//     'title': 'Test Title'
// };

// var fn = function(res) {
//     console.log(res);
// };

// describe('Server Todos Controller - ', function(done) {
//     afterEach(function() {
//         passportStub.logout(); // logout after each test
//     });
//     beforeEach(function() {
//         passportStub.login(user);
//     });
//     it('Create a Todo should respond in json', function(done) {
//         request(app).post('/api/todos').send(todo).expect(200).end(function(err, res) {
//             should.not.exist(err);
//             should.exists(res.body._id);
//             todoid = res.body._id;
//             done();
//         });
//     });

//     it('List todos shold respond 200', function(done) {
//         request(app).get('/api/todos').expect(200).end(function(err, res) {
//             should.not.exist(err);
//             should.exist(res.body);
//             res.body.should.be.instanceof(Array).and.have.lengthOf(1);
//             done();
//         });
//     });
// });
