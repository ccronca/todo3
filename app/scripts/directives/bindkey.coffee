'use strict'

angular.module('todoApp')
  .directive('bindKey', () ->
    (scope, element, attrs) ->
      element.bind 'keydown keypress', (event) ->
        if event.which == Number(attrs.key)
            scope.$apply () ->
                scope.$eval attrs.bindKey
            event.preventDefault()
  )
