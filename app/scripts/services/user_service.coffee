resources = angular.module('todoApp')

resources.factory 'User', [
  '$resource', ($resource) ->
    User = $resource '/api/users/:id', id: @_id,
        update: { method: 'PUT', params: {} }
        get: { method: 'GET', params: { id: 'me' } }
        transformResponse: (data, headersGetter) ->
            if data? then angular.fromJson data else { null: true }

]
