(function() {
  'use strict';
  angular.module('todoApp').directive('todoFocus', function($timeout) {
    return function(scope, elem, attrs) {
      scope.$watch(attrs.todoFocus, function(newVal) {});
      if (newVal) {
        return $timeout(function() {
          return elem[0].focus();
        }, 0, false);
      }
    };
  });

}).call(this);
