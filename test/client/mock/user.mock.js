'use strict';

angular.module('todoApp')
  .factory('User', function($q) {
    var queryDeferred = $q.defer();
    var userData = {
      email: 'test@test.com',
      password: 'test'
    };
    return {
      save: function(user, success, error) {
        success(user);
        return queryDeferred;
      },
      update: function(passwords, success, error) {
        userData.password = passwords.newPassword;
        success(userData);
        return queryDeferred;
      }
    };
  });
