(function() {
  var FormView, PageObject, TodoView, TodosPage,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PageObject = require("./page_object");

  TodoView = require("./todos/todo_view");

  FormView = require("./todos/form_view");

  TodosPage = (function(_super) {
    __extends(TodosPage, _super);

    function TodosPage() {
      return TodosPage.__super__.constructor.apply(this, arguments);
    }

    TodosPage.has("remaining", function() {
      return browser.findElement(this.By.css("span#todo-count"));
    });

    TodosPage.has("archiveButton", function() {
      return browser.findElement(this.byLabel("archive"));
    });

    TodosPage.has("todos", function() {
      return browser.findElements(this.By.css("ul#todo-list li"));
    });

    TodosPage.has("form", function() {
      var form;
      form = browser.findElement(this.By.css("form#todo-form]"));
      return new FormView(form);
    });

    TodosPage.prototype.todoAt = function(index) {
      var todoElement;
      todoElement = browser.findElement(this.By.repeater("(id, todo) in todos").row(index));
      return new TodoView(todoElement);
    };

    TodosPage.prototype.todosCount = function() {
      var d;
      this.waitForAnimations();
      d = protractor.promise.defer();
      this.todos.then(function(todos) {
        return d.fulfill(todos.length);
      });
      return d.promise;
    };

    return TodosPage;

  })(PageObject);

  module.exports = TodosPage;

}).call(this);
