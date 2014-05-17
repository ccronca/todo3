(function() {
  'use strict';
  describe('Directive: usertestdirective', function() {
    var scope;
    beforeEach(module('todoApp'));
    scope = {};
    beforeEach(inject(function($controller, $rootScope) {
      return scope = $rootScope.$new();
    }));
    return it('should make hidden element visible', inject(function($compile) {
      var element;
      element = angular.element('<usertestdirective></usertestdirective>');
      element = $compile(element)(scope);
      return expect(element.text()).toBe('this is the usertestdirective directive');
    }));
  });

}).call(this);
