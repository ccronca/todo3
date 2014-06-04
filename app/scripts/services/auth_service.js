(function() {
  var resources;

  resources = angular.module('todoApp');

  resources.factory('Auth', [
    '$rootScope', 'Session', 'User', '$cookieStore', function($rootScope, Session, User, $cookieStore) {
      var Auth, getCallBack;
      getCallBack = function(cb) {
        if (cb) {
          return cb;
        } else {
          return angular.noop;
        }
      };
      return new (Auth = (function() {
        function Auth() {
          $rootScope.currentUser = $cookieStore.get('user' != null ? 'user' : null);
          $cookieStore.remove('user');
        }

        Auth.prototype.login = function(user, callback) {
          var cb;
          cb = getCallBack(callback);
          return Session.save({
            email: user.email,
            password: user.password
          }, function(user) {
            $rootScope.currentUser = user;
            return cb();
          }, function(err) {
            return cb(err);
          }).$promise;
        };

        Auth.prototype.logout = function(callback) {
          var cb;
          cb = getCallBack(callback);
          return Session["delete"](function() {
            $rootScope.currentUser = null;
            return cb();
          }, function(err) {
            return cb(err);
          }).$promise;
        };

        Auth.prototype.createUser = function(user, callback) {
          var cb;
          cb = getCallBack(callback);
          return User.save(user, function(user) {
            $rootScope.currentUser = user;
            return cb(user);
          }, function(err) {
            return cb(err);
          }).$promise;
        };

        Auth.prototype.changePassword = function(oldPassword, newPassword, callback) {
          var cb;
          cb = getCallBack(callback);
          return User.update({
            oldPassword: oldPassword,
            newPassword: newPassword
          }, function(user) {
            return cb(user);
          }, function(err) {
            return cb(err);
          }).$promise;
        };

        Auth.prototype.currentUser = function() {
          return User.get();
        };

        Auth.prototype.isLoggedIn = function() {
          return !!$rootScope.currentUser;
        };

        return Auth;

      })());
    }
  ]);

}).call(this);
