(function() {
  'use strict';
  var SignupCtrl, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = angular.module('todoApp');

  SignupCtrl = (function(_super) {
    __extends(SignupCtrl, _super);

    function SignupCtrl() {
      return SignupCtrl.__super__.constructor.apply(this, arguments);
    }

    SignupCtrl.register(app);

    SignupCtrl.inject('$scope', 'Auth', '$location');

    SignupCtrl.prototype.initialize = function() {
      return this.reset();
    };

    SignupCtrl.prototype.reset = function() {
      this.message = '';
      this.errors = {};
      return this.submitted = false;
    };

    SignupCtrl.prototype.register = function(form, user) {
      this.submitted = true;
      if (form.$valid) {
        return this.Auth.createUser({
          name: user.name,
          email: user.email,
          password: user.password
        }).then((function(_this) {
          return function() {
            return _this.$location.path('/');
          };
        })(this)).then(null, (function(_this) {
          return function(err) {
            return angular.forEach(err.data.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              return _this.errors[field] = error.message;
            });
          };
        })(this));
      }
    };

    SignupCtrl.prototype.isSubmitted = function() {
      return !!this.submitted;
    };

    SignupCtrl.prototype.getMessage = function() {
      if (this.message != null) {
        return this.message;
      } else {
        return null;
      }
    };

    SignupCtrl.prototype.getError = function(field) {
      if (this.errors[field] != null) {
        return this.errors[field];
      } else {
        return null;
      }
    };

    return SignupCtrl;

  })(BaseCtrl);

}).call(this);
