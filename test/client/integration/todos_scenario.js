(function() {
  var TodosPage, expect, utils;

  expect = require("./helpers/expect");

  utils = require("./helpers/utils");

  TodosPage = require("./helpers/page_objects/todos_page");

  describe("Tasks page", function() {
    var todosPage;
    todosPage = null;
    beforeEach(function() {
      browser.get("/todos");
      todosPage = new TodosPage();
      return utils.loadFixtures('/api/todos/_loadFixtures');
    });
    it("displays a valid page title", function() {
      expect(browser.getCurrentUrl()).to.eventually.match(/todos$/);
      return expect(browser.getTitle()).to.eventually.eq("Todos App");
    });
    describe("tasks list", function() {
      return it("displays all tasks", function() {
        var completedTask, todo;
        expect(todosPage.todosCount()).to.eventually.eq(3);
        expect(todosPage.remaining.getText()).to.eventually.eq("2 items left");
        todo = todosPage.todoAt(0);
        expect(todo.isCompleted()).to.eventually.be["true"];
        completedTask = todosPage.todoAt(2);
        return expect(completedTask.isCompleted()).to.eventually.be["false"];
      });
    });
    describe("click on `allChecked` button", function() {
      beforeEach(function() {
        return todosPage.allCheckedButton.click();
      });
      it("mark all task as completed", function() {
        expect(todosPage.todosCount()).to.eventually.eq(3);
        return expect(todosPage.remaining.getText()).to.eventually.eq("0 items left");
      });
      return it("unmark all tasks", function() {
        todosPage.allCheckedButton.click();
        expect(todosPage.todosCount()).to.eventually.eq(3);
        return expect(todosPage.remaining.getText()).to.eventually.eq("3 items left");
      });
    });
    describe("click on todo's checkbox", function() {
      var todo;
      todo = null;
      describe("when a todo is not completed", function() {
        beforeEach(function() {
          todo = todosPage.todoAt(1);
          return todo.checkbox.click();
        });
        return it("marks the todo as completed", function() {
          expect(todo.isCompleted()).to.eventually.be["true"];
          return expect(todosPage.remaining.getText()).to.eventually.eq("1 item left");
        });
      });
      return describe("when a todo is completed", function() {
        beforeEach(function() {
          todo = todosPage.todoAt(0);
          return todo.checkbox.click();
        });
        return it("marks the todo as not completed", function() {
          expect(todo.isCompleted()).to.eventually.be["false"];
          return expect(todosPage.remaining.getText()).to.eventually.eq("3 items left");
        });
      });
    });
    return describe("new todo form", function() {
      var form;
      form = null;
      beforeEach(function() {
        return form = todosPage.form;
      });
      return describe("fill in the title and return", function() {
        return it("creates a new todo", function() {
          var todo;
          form.setTodo("New todo\n");
          expect(todosPage.todosCount()).to.eventually.eq(4);
          expect(todosPage.remaining.getText()).to.eventually.eq("3 items left");
          todo = todosPage.todoAt(0);
          expect(todo.isCompleted()).to.eventually.be["false"];
          return expect(todo.label.getText()).to.eventually.eq("New todo");
        });
      });
    });
  });

}).call(this);
