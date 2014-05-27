(function() {
  var __slice = [].slice;

  this.BaseCtrl = (function() {
    BaseCtrl.register = function(app, name) {
      var _ref;
      if (name == null) {
        name = this.name || ((_ref = this.toString().match(/function\s*(.*?)\(/)) != null ? _ref[1] : void 0);
      }
      return app.controller(name, this);
    };

    BaseCtrl.inject = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.$inject = args;
    };

    function BaseCtrl() {
      var args, fn, index, key, _i, _len, _ref, _ref1;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref = this.constructor.$inject;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        key = _ref[index];
        this[key] = args[index];
      }
      _ref1 = this.constructor.prototype;
      for (key in _ref1) {
        fn = _ref1[key];
        if (typeof fn !== 'function') {
          continue;
        }
        if ((key === 'constructor' || key === 'initialize') || key[0] === '_') {
          continue;
        }
        this.$scope[key] = (typeof fn.bind === "function" ? fn.bind(this) : void 0) || _.bind(fn, this);
      }
      if (typeof this.initialize === "function") {
        this.initialize();
      }
      console.log(this.$inject);
    }

    return BaseCtrl;

  })();

}).call(this);