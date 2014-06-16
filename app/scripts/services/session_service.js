(function() {
  var resources;

  resources = angular.module('todoApp');

  resources.factory('Session', [
    '$resource', function($resource) {
      return $resource('/api/session/');
    }
  ]);

}).call(this);
