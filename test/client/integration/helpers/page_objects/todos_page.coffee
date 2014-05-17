PageObject = require("./page_object")
TodoView = require("./todos/todo_view")
FormView = require("./todos/form_view")

class TodosPage extends PageObject

  @has "remaining", ->
    browser.findElement @By.css("span#todo-count")

  @has "archiveButton", ->
    browser.findElement @byLabel "archive"

  @has "todos", ->
    browser.findElements @By.css("ul#todo-list li")

  @has "form", ->
    form = browser.findElement @By.css("form#todo-form]")
    new FormView(form)

  todoAt: (index) ->
    todoElement = browser.findElement @By.repeater("(id, todo) in todos").row(index)
    new TodoView(todoElement)

  todosCount: ->
    @waitForAnimations()

    d = protractor.promise.defer()
    @todos.then (todos) -> d.fulfill todos.length
    d.promise

module.exports = TodosPage
