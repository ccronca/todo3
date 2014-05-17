expect = require("./helpers/expect")
utils = require("./helpers/utils")
TodosPage = require("./helpers/page_objects/todos_page")

describe "Tasks page", ->
  todosPage = null

  beforeEach ->
    browser.get "/todos"

    todosPage = new TodosPage()
    utils.loadFixtures('/api/todos/_loadFixtures')

  it "displays a valid page title", ->
    expect(browser.getCurrentUrl()).to.eventually.match /todos$/
    expect(browser.getTitle()).to.eventually.eq "Todos App"

  describe "tasks list", ->

    it "displays all tasks", ->
      expect(todosPage.todosCount()).to.eventually.eq 3
      expect(todosPage.remaining.getText()).to.eventually.eq "2 items left"

      todo = todosPage.todoAt(0)
      expect(todo.isCompleted()).to.eventually.be.true

      completedTask = todosPage.todoAt(2)
      expect(completedTask.isCompleted()).to.eventually.be.false

  describe "click on 'allChecked' button", ->
    beforeEach ->
      todosPage.allCheckedButton.click()

    it "mark all task as completed", ->
      expect(todosPage.todosCount()).to.eventually.eq 3
      expect(todosPage.remaining.getText()).to.eventually.eq "0 items left"

    it "unmark all tasks", ->
      todosPage.allCheckedButton.click()
      expect(todosPage.todosCount()).to.eventually.eq 3
      expect(todosPage.remaining.getText()).to.eventually.eq "3 items left"

  describe "click on 'clearCompleted' button", ->
    it "delete completed tasks", ->
      todosPage.clearCompletedButton.click()
      expect(todosPage.todosCount()).to.eventually.eq 2)
      expect(todosPage.remaining.getText()).to.eventually.eq "2 items left"

  describe "click on 'filterCompleted' link", ->
    it "show only completed tasks", ->
      todos.filterCompletedLink.click()
      expect(todosPage.todosCount()).to.eventually.eq 1)
      expect(todosPage.remaining.getText()).to.eventually.eq "3 items left"

  describe "click on 'filterActive' link", ->
    it "show only active tasks", ->
      todos.filterActiveLink.click()
      expect(todosPage.todosCount()).to.eventually.eq 2)
      expect(todosPage.remaining.getText()).to.eventually.eq "3 items left"

  describe "click on todo's checkbox", ->
    todo = null

    describe "when a todo is not completed", ->
      beforeEach ->
        todo = todosPage.todoAt(1)
        todo.checkbox.click()

      it "marks the todo as completed", ->
        expect(todo.isCompleted()).to.eventually.be.true
        expect(todosPage.remaining.getText()).to.eventually.eq "1 item left"

    describe "when a todo is completed", ->
      beforeEach ->
        todo = todosPage.todoAt(0)
        todo.checkbox.click()

      it "marks the todo as not completed", ->
        expect(todo.isCompleted()).to.eventually.be.false
        expect(todosPage.remaining.getText()).to.eventually.eq "3 items left"

  describe "new todo form", ->
    form = null
    beforeEach -> form = todosPage.form

    describe "fill in the title and return", ->

      it "creates a new todo", ->
        form.setTodo "New todo\n"

        expect(todosPage.todosCount()).to.eventually.eq 4
        expect(todosPage.remaining.getText()).to.eventually.eq "3 items left"

        todo = todosPage.todoAt(0)
        expect(todo.isCompleted()).to.eventually.be.false
        expect(todo.label.getText()).to.eventually.eq "New todo"
