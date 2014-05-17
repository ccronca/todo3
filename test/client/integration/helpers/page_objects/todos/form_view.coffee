PageObject = require("./../page_object")

class FormView extends PageObject

  constructor: (@base) ->

  @has "todoField", -> @base.findElement @By.input("newTodo")

  setTodo: (value) ->
    @todoField.clear()
    @todoField.sendKeys value

module.exports = FormView
