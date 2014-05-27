(function() {
  var resources;

  resources = angular.module('todoApp');

  resources.factory('User', [
    '$resource', function($resource) {
      var User;
      return User = $resource('/api/users/:id', {
        id: this._id
      }, {
        update: {
          method: 'PUT',
          params: {}
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        },
        transformResponse: function(data, headersGetter) {
          if (data != null) {
            return angular.fromJson(data);
          } else {
            return {
              "null": true
            };
          }
        }
      });
    }
  ]);

}).call(this);
