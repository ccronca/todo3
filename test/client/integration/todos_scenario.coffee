expect = require("./helpers/expect")
utils = require("./helpers/utils")
TodosPage = require("./helpers/page_objects/todos_page")
SignInPage = require("./helpers/page_objects/signin_page")

describe "Tasks page", ->
  todosPage = null
  signinPage = null

  beforeEach ->
    todosPage = new TodosPage()
    signinPage = new SignInPage()
    utils.loadFixtures('/api/todos/_loadFixtures')

    browser.get "/login"
    signinPage.signin()

    browser.get "/todos"

  it "displays a valid page title", ->
    expect(browser.getCurrentUrl()).to.eventually.match /todos$/
    expect(browser.getTitle()).to.eventually.eq "Todos App"

  describe "todos list", ->

    it "displays all todos", ->
      expect(todosPage.todosCount()).to.eventually.eq 3
      expect(todosPage.remaining.getText()).to.eventually.eq "2 items left"

      todo = todosPage.todoAt(0)
      expect(todo.isCompleted()).to.eventually.be.false

      completedTask = todosPage.todoAt(2)
      expect(completedTask.isCompleted()).to.eventually.be.true

  describe "click on 'allChecked' button", ->
    beforeEach ->
      todosPage.allCheckedButton.click()

    it "mark all todos as completed", ->
      expect(todosPage.todosCount()).to.eventually.eq 3
      expect(todosPage.remaining.getText()).to.eventually.eq "0 items left"

    it "twice unmark all todos", ->
      todosPage.allCheckedButton.click()
      expect(todosPage.todosCount()).to.eventually.eq 3
      expect(todosPage.remaining.getText()).to.eventually.eq "3 items left"

  describe "click on 'clearCompleted' button", ->
    it "delete completed todos", ->
      todosPage.clearCompletedButton.click()
      expect(todosPage.todosCount()).to.eventually.eq 2
      expect(todosPage.remaining.getText()).to.eventually.eq "2 items left"

  describe "click on 'filterCompleted' link", ->
    it "show only completed todos", ->
      todosPage.filterCompletedLink.click()
      expect(todosPage.todosCount()).to.eventually.eq 1
      expect(todosPage.remaining.getText()).to.eventually.eq "2 items left"

  describe "click on 'filterActive' link", ->
    it "show only active todos", ->
      todosPage.filterActiveLink.click()
      expect(todosPage.todosCount()).to.eventually.eq 2
      expect(todosPage.remaining.getText()).to.eventually.eq "2 items left"

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
        todo = todosPage.todoAt(2)
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
        utils.takeScreenshot()
        expect(todosPage.todosCount()).to.eventually.eq 4
        expect(todosPage.remaining.getText()).to.eventually.eq "3 items left"

        todo = todosPage.todoAt(0)
        expect(todo.isCompleted()).to.eventually.be.false
        expect(todo.label.getText()).to.eventually.eq "New todo"

  describe "click on todo label", ->

    describe "and write a new title", ->
      it "change the title when press return", ->
        todo = todosPage.todoAt(1)
        todo.label.click()
        todo.setTodo "another test\n"
        expect(todo.label.getText()).to.eventually.eq "another test"

      it "change the title whe loose focus", ->
        todo = todosPage.todoAt(1)
        todo.label.click()
        todo.setTodo "another mogly test"
        todosPage.todoAt(2).label.click()
        expect(todo.label.getText()).to.eventually.eq "another mogly test"

     it "dont change the title when esc is pressed", ->
        todo = todosPage.todoAt(1)
        todo.label.getText().then (oldlabel) ->
          todo.label.click()
          todo.setTodo "another mogly test"
          protractor.getInstance().actions().sendKeys(protractor.Key.ESCAPE).perform();
          expect(todo.label.getText()).to.eventually.eq oldlabel
