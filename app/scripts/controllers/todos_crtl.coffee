'use strict'

app = angular.module 'todoApp'

class TodosCtrl extends BaseCtrl

    @register app
    @inject '$scope', 'todos', 'Todo'

    initialize: ->
        @reset()

    isClean: (todo) ->
        angular.equals todo, @Todo

    remaining: ->
        todo for todo in @todos when not todo.completed

    completed: ->
        todo for todo in @todos when todo.completed

    completedCount: ->
        @completed().length

    count: ->
        @todos.length

    remainingCount: ->
        @remaining().length

    archive: ->
        angular.forEach @completed(), (todo) ->
            todo.$remove()
        @todos = @remaining()

    reset: ->
        return if @isClean @$scope.todo
        @$scope.todo = angular.copy(@Todo)
        @originalTodo = null
        @$scope.todoForm?.$setPristine()
        @$scope.todoForm?.$submitted = false

    filter: (status) ->
        @status = status
        @statusFilter = if status == 'active' then {completed: false} else if status == 'completed' then completed: true else null;

    add: (form, todo) ->
        return if @isClean(todo)
        form?.$submitted = true
        return unless form?.$valid
        promise = todo.$save()
        #successMessage = if product.id? then "Product was updated" else "Product was created"

        promise.then (data) =>
            @todos.unshift @data
            @reset()
            # @alerts.success successMessage
    delete: (todo) ->
        promise = todo.$delete()
        promise.then =>
            index = @todos.indexOf(todo)
            @todos.splice(index, 1) if index isnt -1

      #@alerts.info "Product was deleted"

    # begin editing a todo, save the original in case of cancel
    edit: (todo) ->
      @originalTodo = angular.copy todo

    # update when done editing, or if title is erased remove the todo
    doneEditing: (todo) ->
      todo.$update()
      @originalTodo = null

    # revert the edited todo back to what it was
    revertEditing: (todo) ->
      index = @todos.indexOf(todo)
      @todos[index] = @originalTodo if index isnt -1
      @originalTodo = null


    # mark all as completed or not, then update remotely
    markAll: (allCompleted)  ->
      angular.forEach @todos, (todo) ->
        todo.completed = !allCompleted
        todo.$update()

    checkOriginalTodo: (todo) ->
        todo._id == if not @originalTodo then null else @originalTodo._id

