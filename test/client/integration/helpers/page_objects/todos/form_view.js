(function() {
  var FormView, PageObject,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PageObject = require("./../page_object");

  FormView = (function(_super) {
    __extends(FormView, _super);

    function FormView(base) {
      this.base = base;
    }

    FormView.has("nameField", function() {
      return this.base.findElement(this.By.input("task.name"));
    });

    FormView.has("doneCheckbox", function() {
      return this.base.findElement(this.By.input("task.done"));
    });

    FormView.has("submitButton", function() {
      return this.base.findElement(this.byLabel("Add", "button"));
    });

    FormView.prototype.setName = function(value) {
      this.nameField.clear();
      return this.nameField.sendKeys(value);
    };

    return FormView;

  })(PageObject);

  module.exports = FormView;

}).call(this);
