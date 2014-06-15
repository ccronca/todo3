(function() {
  'use strict';
  var app;

  app = angular.module('todoApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute']);

  app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl as crtl'
    }).when('/todos', {
      templateUrl: 'partials/todos',
      controller: 'TodosCtrl as todos',
      authenticate: true,
      resolve: {
        todos: function(Todos) {
          return Todos.query().$promise;
        },
        Todo: function(Todos) {
          return new Todos();
        }
      }
    }).when('/login', {
      templateUrl: 'partials/login',
      controller: 'LoginCtrl as ctrl'
    }).when('/signup', {
      templateUrl: 'partials/signup',
      controller: 'SignupCtrl as ctrl'
    }).when('/settings', {
      templateUrl: 'partials/settings',
      controller: 'SettingsCtrl as ctrl',
      authenticate: true
    }).when('/profile', {
      templateUrl: 'partials/profile',
      controller: 'ProfileCtrl as ctrl',
      authenticate: true
    }).otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
    return $httpProvider.interceptors.push([
      '$q', '$location', function($q, $location) {
        return {
          'responseError': function(response) {
            if (response.status === 401) {
              $location.path('/login');
            }
            return $q.reject(response);
          }
        };
      }
    ]);
  });

  app.run(function($rootScope, $location, Auth) {
    return $rootScope.$on('$routeChangeStart', function(event, next) {
      return Auth.currentUser().$promise.then(function() {
        if (next.authenticate && !Auth.isLoggedIn()) {
          return $location.path('/login');
        }
      });
    });
  });

}).call(this);
