(function() {
  'use strict';
  var SettingsCtrl, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = angular.module('todoApp');

  SettingsCtrl = (function(_super) {
    __extends(SettingsCtrl, _super);

    function SettingsCtrl() {
      return SettingsCtrl.__super__.constructor.apply(this, arguments);
    }

    SettingsCtrl.register(app);

    SettingsCtrl.inject('$scope', 'Auth');

    SettingsCtrl.prototype.initialize = function() {
      return this.reset();
    };

    SettingsCtrl.prototype.reset = function() {
      this.message = '';
      this.errors = {};
      return this.submitted = false;
    };

    SettingsCtrl.prototype.changePassword = function(form, user) {
      this.submitted = true;
      if (form.$valid) {
        return this.Auth.changePassword(user.oldPassword, user.newPassword).then((function(_this) {
          return function() {
            _this.reset();
            return _this.message = 'Password successfully changed.';
          };
        })(this)).then(null, (function(_this) {
          return function() {
            form.password.$setValidity('mongoose', false);
            return _this.message = 'Incorrect password';
          };
        })(this));
      }
    };

    SettingsCtrl.prototype.isSubmitted = function() {
      return !!this.submitted;
    };

    SettingsCtrl.prototype.getMessage = function() {
      if (this.message != null) {
        return this.message;
      } else {
        return null;
      }
    };

    return SettingsCtrl;

  })(BaseCtrl);

}).call(this);
