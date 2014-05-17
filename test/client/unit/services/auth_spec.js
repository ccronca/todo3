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

  it('should create user', function() {
    Auth.createUser(user, function(data) {
      expect(data).toEqual(user);
      expect($rootScope.currentUser).toEqual(user);
    });

  });

  it('should change password of user', function() {
    var newpassword = 'newpassword';
    Auth.changePassword(user.password, newpassword, function(data) {
      expect(data.password).toEqual(newpassword);
    });

  });

  it('should check user login status', function() {
    expect(Auth.isLoggedIn()).toBeFalsy();
    $rootScope.currentUser = user;
    expect(Auth.isLoggedIn()).toBeTruthy();
  });

});
