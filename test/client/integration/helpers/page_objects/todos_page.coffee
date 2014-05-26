PageObject = require("./page_object")
TodoView = require("./todos/todo_view")
FormView = require("./todos/form_view")

class TodosPage extends PageObject

  @has "remaining", ->
    browser.findElement @By.css("span#todo-count")

  @has "allCheckedButton", ->
    browser.findElement @By.input "allChecked"

  @has "clearCompletedButton", ->
    browser.findElement @By.css "button#clear-completed"

  @has "filterAllLink", ->
    browser.findElement @By.css "a#filter-all"

  @has "filterActiveLink", ->
    browser.findElement @By.css "a#filter-active"

  @has "filterCompletedLink", ->
    browser.findElement @By.css "a#filter-completed"

  @has "todos", ->
    browser.findElements @By.css("ul#todo-list li")

  @has "form", ->
    form = browser.findElement @By.css("form#add-form")
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
