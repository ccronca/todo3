'use strict';

// app/scripts/controllers/main.js

angular.module('todoApp')
  .controller('MainCtrl', function ($scope, $timeout, Todo, filterFilter, $location) {
    $scope.text = 'MainPage';
  });
