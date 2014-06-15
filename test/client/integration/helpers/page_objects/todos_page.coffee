PageObject = require("./page_object")
TodoView = require("./todos/todo_view")
FormView = require("./todos/form_view")

class TodosPage extends PageObject

  @has "remaining", ->
    browser.findElement @By.css("span#todoCount")

  @has "allCheckedButton", ->
    browser.findElement @By.input "allChecked"

  @has "clearCompletedButton", ->
    browser.findElement @By.css "button#clearCompleted"

  @has "filterAllLink", ->
    browser.findElement @By.css "a#filterAll"

  @has "filterActiveLink", ->
    browser.findElement @By.css "a#filterActive"

  @has "filterCompletedLink", ->
    browser.findElement @By.css "a#filterCompleted"

  @has "todos", ->
    browser.findElements @By.css("ul#todoList li")

  @has "form", ->
    form = browser.findElement @By.css("form#addForm")
    new FormView(form)

  todoAt: (index) ->
    todoElement = browser.findElement @By.repeater("(id, todo) in todos.todos").row(index)
    new TodoView(todoElement)

  todosCount: ->
    @waitForAnimations()

    d = protractor.promise.defer()
    @todos.then (todos) -> d.fulfill todos.length
    d.promise

module.exports = TodosPage
