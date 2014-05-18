// Generated by CoffeeScript 1.7.1
(function() {
  describe("Module `todoApp Auth factory`", function() {
    beforeEach(module("todoApp"));
    return describe("Factory `Auth`", function() {
      var $httpBackend, $rootScope, Auth, loginUser, user;
      $rootScope = null;
      $httpBackend = null;
      Auth = null;
      user = {
        email: "test@test.com",
        password: "bar"
      };
      loginUser = function(callback) {
        var promise;
        $httpBackend.whenPOST("/api/session").respond(user);
        promise = Auth.login(user, function() {
          return callback();
        });
        return $httpBackend.flush();
      };
      beforeEach(inject(function(_$rootScope_, _$httpBackend_, _Auth_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        return Auth = _Auth_;
      }));
      it("is defined", function() {
        return expect(Auth).to.not.be.undefined;
      });
      describe(".login()", function() {
        it("is defined", function() {
          return expect(Auth.login).to.not.be.undefined;
        });
        return it("populate current user", function() {
          return loginUser(function() {
            expect($rootScope.currentUser.email).to.not.be.undefined;
            return expect($rootScope.currentUser.email).to.equal(user.email);
          });
        });
      });
      describe(".logout()", function() {
        it("is defined", function() {
          return expect(Auth.logout).to.not.be.undefined;
        });
        return it("delete current user", function() {
          $httpBackend.whenDELETE("/api/session").respond({});
          return loginUser(function() {
            var promise;
            return promise = Auth.logout(function() {
              return expect($rootScope.currentUser).to.be["null"];
            });
          });
        });
      });
      describe(".createUser()", function() {
        it("is defined", function() {
          return expect(Auth.createUser).to.not.be.undefined;
        });
        return it("populate current user", function() {
          var promise;
          $httpBackend.whenPOST("/api/users").respond(user);
          promise = Auth.createUser(user, function() {
            expect($rootScope.currentUser.email).to.not.be.undefined;
            return expect($rootScope.currentUser.email).to.equal(user.email);
          });
          return $httpBackend.flush();
        });
      });
      return describe(".currentUser()", function() {
        it("is defined", function() {
          return expect(Auth.currentUser).to.not.be.undefined;
        });
        return it("get current user", function() {
          $httpBackend.whenGET("/api/users/me").respond(user);
          Auth.currentUser().$promise.then(function(data) {
            return expect.data.to.not.be.undefined;
          });
          return $httpBackend.flush();
        });
      });
    });
  });

}).call(this);
