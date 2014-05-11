'use strict';

angular.module('todoApp')
  .factory('Session', function($q) {
    var queryDeferred = $q.defer();
    return {
      save: function(user, success, error) {
        success(user);
        return queryDeferred;
      },
      delete: function(success, error) {
        success();
        return queryDeferred;
      }
    };
  });
