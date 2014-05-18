(function() {
  var todosHttpBackendMock;

  todosHttpBackendMock = function() {
    return angular.module('todosHttpBackendMock', ['ngMockE2E', 'todoApp']).run(function($httpBackend) {
      var authenticated, todos;
      authenticated = true;
      todos = [
        {
          "_id": "53785cf03b72d56031614c65",
          "updatedAt": "2014-05-18T07:10:40.311Z",
          "createdAt": "2014-05-18T07:10:40.311Z",
          "title": "Dummy Title 1",
          "completed": true
        }, {
          "_id": "53785cf03b72d56031614c64",
          "updatedAt": "2014-05-18T07:10:40.309Z",
          "createdAt": "2014-05-18T07:10:40.308Z",
          "title": "Dummy Title 2",
          "completed": false
        }
      ];
      return $httpBackend.whenGET('/api/todos').respond(function(method, url, data, headers) {
        if (authenticated) {
          return [200, todos, {}];
        } else {
          return [401, {}, {}];
        }
      });
    });
  };

  module.exports = {
    todosHttpBackendMock: todosHttpBackendMock
  };

}).call(this);
