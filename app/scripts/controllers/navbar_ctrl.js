(function() {
  'use strict';
  var NavbarCtrl, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = angular.module('todoApp');

  NavbarCtrl = (function(_super) {
    __extends(NavbarCtrl, _super);

    function NavbarCtrl() {
      return NavbarCtrl.__super__.constructor.apply(this, arguments);
    }

    NavbarCtrl.register(app);

    NavbarCtrl.inject('$scope', 'Auth', '$location');

    NavbarCtrl.initialize = function() {
      return this.menu = [
        {
          'title': 'Home',
          'link': '/'
        }, {
          'title': 'Settings',
          'link': '/settings'
        }
      ];
    };

    NavbarCtrl.prototype.logout = function() {
      return this.Auth.logout().then((function(_this) {
        return function() {
          return _this.$location.path('/login');
        };
      })(this));
    };

    NavbarCtrl.prototype.isActive = function(route) {
      return route === this.$location.path();
    };

    NavbarCtrl.prototype.getMenu = function() {
      return this.menu;
    };

    return NavbarCtrl;

  })(BaseCtrl);

}).call(this);
