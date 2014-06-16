'use strict';

app = angular.module 'todoApp', [
  'ngCookies'
  'ngResource'
  'ngSanitize'
  'ngRoute'
]

app.config ($routeProvider, $locationProvider, $httpProvider) ->
    $routeProvider
    .when '/',
        templateUrl: 'partials/main'
        controller: 'MainCtrl as crtl'
    .when '/todos',
        templateUrl: 'partials/todos'
        controller: 'TodosCtrl as todos'
        authenticate: true
        resolve:
            todos: (Todos) -> Todos.query().$promise
            Todo: (Todos) -> new Todos()
    .when '/login',
        templateUrl: 'partials/login'
        controller: 'LoginCtrl as ctrl'
    .when '/signup',
        templateUrl: 'partials/signup'
        controller: 'SignupCtrl as ctrl'
    .when '/settings',
        templateUrl: 'partials/settings'
        controller: 'SettingsCtrl as ctrl'
        authenticate: true
    .when '/profile',
        templateUrl: 'partials/profile'
        controller: 'ProfileCtrl as ctrl'
        authenticate: true
    .otherwise
        redirectTo: '/'

    $locationProvider.html5Mode true

    #Intercept 401s and redirect you to login
    $httpProvider.interceptors.push ['$q', '$location',
        ($q, $location) ->
            'responseError': (response) ->
                if response.status == 401 then $location.path('/login')
                $q.reject response
              ]


app.run ($rootScope, $location, Auth) ->

    #Redirect to login if route requires auth and you're not logged in
    $rootScope.$on '$routeChangeStart', (event, next) ->
        Auth.currentUser().$promise.then ->
          if next.authenticate && !Auth.isLoggedIn() then $location.path '/login'
