resources = angular.module('todoApp')

resources.factory 'Todos', [
  '$resource', ($resource) ->
    Todos = $resource '/api/todos/:id', id: '@_id',
      query: { method: 'GET', isArray: true }
      get: { method: 'GET' }
      update: { method: 'PUT'}

    angular.extend Todos::,
      # Returns true when the todo is persisted (has an id)
      persisted: -> !!@_id

    Todos
]
