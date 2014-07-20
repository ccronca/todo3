resources = angular.module('todoApp')

resources.factory 'Session', [
    '$resource', ($resource) ->
        $resource '/api/session/'
]
