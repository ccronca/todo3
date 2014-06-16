(function() {
  'use strict';
  var MainCtrl, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = angular.module('todoApp');

  MainCtrl = (function(_super) {
    __extends(MainCtrl, _super);

    function MainCtrl() {
      return MainCtrl.__super__.constructor.apply(this, arguments);
    }

    MainCtrl.register(app);

    MainCtrl.inject('$scope');

    MainCtrl.prototype.initialize = function() {
      return this.text = 'Hola';
    };

    MainCtrl.prototype.getText = function() {
      return this.text;
    };

    return MainCtrl;

  })(BaseCtrl);

}).call(this);
