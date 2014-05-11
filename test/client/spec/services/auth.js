'use strict';

describe('Service: Auth', function() {
  // load the service's module
  beforeEach(module('todoApp'));

  var Auth, $rootScope, user = {
      email: 'test@test.com',
      password: 'test'
    };

  // instantiate service
  beforeEach(inject(function(_Auth_, _$rootScope_) {
    Auth = _Auth_;
    $rootScope = _$rootScope_;
  }));

  it('should exists', function() {
    expect( !! Auth).toBeTruthy();
  });

  it('should login user', function() {
    Auth.login(user, function() {
      expect($rootScope.currentUser).toEqual(user);
    });

  });

  it('should logout user', function() {
    $rootScope.currentUser = user;
    Auth.logout(function() {
      expect($rootScope.currentUser).toBe(null);
    });

  });
});
