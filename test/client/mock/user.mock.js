'use strict';

angular.module('todoApp')
  .factory('User', function($q) {
    var queryDeferred = $q.defer();
    return {
      save: function(user, success, error) {
        success(user);
        return queryDeferred;
      },
      update: function(user, success, error) {
        success(user);
        return queryDeferred;
      },
      get: function() {
        return {
          email: 'test@test.com',
          password: 'test'
        };
      }
    };
  });
