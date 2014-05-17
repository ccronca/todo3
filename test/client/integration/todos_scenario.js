(function() {
  var TodosPage, expect;

  expect = require("./helpers/expect");

  TodosPage = require("./helpers/page_objects/todos_page");

  describe("Tasks page", function() {
    var todosPage;
    todosPage = null;
    beforeEach(function() {
      browser.get("/todos");
      return todosPage = new TodosPage();
    });
    it("displays a valid page title", function() {
      expect(browser.getCurrentUrl()).to.eventually.match(/todos$/);
      return expect(browser.getTitle()).to.eventually.eq("Todos App");
    });
    return describe("tasks list", function() {
      return it("displays all tasks", function() {
        var completedTask, todo;
        expect(todosPage.todosCount()).to.eventually.eq(3);
        expect(todosPage.remaining.getText()).to.eventually.eq("2 items left");
        todo = todosPage.todoAt(0);
        expect(todo.isCompleted()).to.eventually.be["false"];
        completedTask = todosPage.todoAt(2);
        return expect(completedTask.isCompleted()).to.eventually.be["true"];
      });
    });
  });

}).call(this);
