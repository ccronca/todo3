'use strict';

angular.module('todoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/todos', {
        templateUrl: 'partials/todos',
        controller: 'TodosCtrl',
        reloadOnSearch: false,
        resolve: {
          todos: function(Todo) {
            return Todo.query().$promise;
          }
        }
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/profile', {
        templateUrl: 'partials/profile',
        controller: 'ProfileCtrl',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location',
      function($q, $location) {
        return {
          'responseError': function(response) {
            if (response.status === 401) {
              $location.path('/login');
              return $q.reject(response);
            } else {
              return $q.reject(response);
            }
          }
        };
      }
    ]);
  })
  .run(function($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function(event, next) {
      Auth.currentUser().$promise.then(function() {
        if (next.authenticate && !Auth.isLoggedIn()) {
          $location.path('/login');
        }
      });
    });
  });
