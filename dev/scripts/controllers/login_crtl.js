(function() {
  'use strict';
  var LoginCtrl, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = angular.module('todoApp');

  LoginCtrl = (function(_super) {
    __extends(LoginCtrl, _super);

    function LoginCtrl() {
      return LoginCtrl.__super__.constructor.apply(this, arguments);
    }

    LoginCtrl.register(app);

    LoginCtrl.inject('$scope', 'Auth', '$location');

    LoginCtrl.prototype.initialize = function() {
      return this.reset();
    };

    LoginCtrl.prototype.reset = function() {
      this.message = '';
      this.errors = {};
      return this.submitted = false;
    };

    LoginCtrl.prototype.login = function(form, user) {
      this.submitted = true;
      if (form.$valid) {
        return this.Auth.login({
          email: user.email,
          password: user.password
        }).then((function(_this) {
          return function() {
            return _this.$location.path('/');
          };
        })(this), (function(_this) {
          return function(err) {
            return _this.errors = err.data;
          };
        })(this));
      }
    };

    LoginCtrl.prototype.isSubmitted = function() {
      return !!this.submitted;
    };

    LoginCtrl.prototype.getErrors = function() {
      if (this.errors.message != null) {
        return this.errors.message;
      } else {
        return null;
      }
    };

    return LoginCtrl;

  })(BaseCtrl);

}).call(this);
