(function() {
  'use strict';
  angular.module('todoApp').directive('bindKey', function() {
    return function(scope, element, attrs) {
      return element.bind('keydown keypress', function(event) {
        if (event.which === Number(attrs.key)) {
          scope.$apply(function() {
            return scope.$eval(attrs.bindKey);
          });
          return event.preventDefault();
        }
      });
    };
  });

}).call(this);
