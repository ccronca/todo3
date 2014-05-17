'use strict';

describe('Service: Todo', function() {

  // load the service's module
  beforeEach(module('todoApp'));

  var Todo, mockBackend;

  // instantiate service
  beforeEach(inject(function(_Todo_, _$httpBackend_) {
    Todo = _Todo_;
    mockBackend = _$httpBackend_;
  }));

  it('should exists', function() {
    expect( !! Todo).toBeTruthy();
  });

  it('should contain todos', function() {
    mockBackend.when('GET', 'api/todos')
      .respond([{
        id: 0,
        title: 'Test title'
      }]);

    var todos = Todo.query();
    mockBackend.flush();
    expect(todos.length).toEqual(1);
  });

});
