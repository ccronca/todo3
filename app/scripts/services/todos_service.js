(function() {
  var resources;

  resources = angular.module('todoApp');

  resources.factory('Todos', [
    '$resource', function($resource) {
      var Todos;
      Todos = $resource('/api/todos/:id', {
        id: '@_id'
      }, {
        query: {
          method: 'GET',
          isArray: true
        },
        get: {
          method: 'GET'
        },
        update: {
          method: 'PUT'
        }
      });
      angular.extend(Todos.prototype, {
        persisted: function() {
          return !!this._id;
        }
      });
      return Todos;
    }
  ]);

}).call(this);
