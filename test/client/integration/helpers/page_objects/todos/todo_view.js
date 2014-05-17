(function() {
  var PageObject, TodoView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PageObject = require("./../page_object");

  TodoView = (function(_super) {
    __extends(TodoView, _super);

    function TodoView(element) {
      this.element = element;
    }

    TodoView.has("checkbox", function() {
      return this.element.findElement(this.By.css("input[type=checkbox]"));
    });

    TodoView.has("label", function() {
      return this.element.findElement(this.By.css("label"));
    });

    TodoView.prototype.isCompleted = function() {
      var d;
      d = protractor.promise.defer();
      this.element.getAttribute("class").then(function(cls) {
        return d.fulfill(cls.indexOf("completed") !== -1);
      });
      return d.promise;
    };

    return TodoView;

  })(PageObject);

  module.exports = TodoView;

}).call(this);
