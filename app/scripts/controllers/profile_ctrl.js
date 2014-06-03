(function() {
  'use strict';
  var ProfileCtrl, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = angular.module('todoApp');

  ProfileCtrl = (function(_super) {
    __extends(ProfileCtrl, _super);

    function ProfileCtrl() {
      return ProfileCtrl.__super__.constructor.apply(this, arguments);
    }

    ProfileCtrl.register(app);

    ProfileCtrl.inject('$scope');

    ProfileCtrl.prototype.initialize = function() {
      return this.text = 'Hola';
    };

    ProfileCtrl.prototype.getText = function() {
      return this.text;
    };

    return ProfileCtrl;

  })(BaseCtrl);

}).call(this);
