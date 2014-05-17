PageObject = require("./../page_object")

class TodoView extends PageObject

  constructor: (@element) ->

  @has "checkbox", ->
    @element.findElement @By.css("input[type=checkbox]")

  @has "label", ->
    @element.findElement @By.css("label")

  isCompleted: ->
    d = protractor.promise.defer()

    @element.getAttribute("class").then (cls) ->
      d.fulfill cls.indexOf("completed") isnt -1

    d.promise

module.exports = TodoView
