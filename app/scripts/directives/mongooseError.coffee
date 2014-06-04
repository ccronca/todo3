'use strict';

angular.module('todoApp')
#Removes server error when user updates input
.directive 'mongooseError', ->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel) ->
        element.on 'keydown', ->
            ngModel.$setValidity 'mongoose', true
