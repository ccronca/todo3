'use strict';

angular.module('todoApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
