'use strict';

angular.module('todoApp')
  .factory('User', function($resource) {
    return $resource('/api/users/:id', {
      id: '@id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        },
        transformResponse: function(data, headersGetter) {
          if (data === 'null') {
            return {
              null: true
            };
          }
          return angular.fromJson(data);
        }
      }
    });
  });
