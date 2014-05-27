resources = angular.module('todoApp')

resources.factory 'Auth', [
    '$rootScope', 'Session', 'User', '$cookieStore', ($rootScope, Session, User, $cookieStore) ->

        getCallBack = (cb) ->
            if cb then callback else angular.noop

        new class Auth
            constructor: ->
                # Get currentUser from cookie
                $rootScope.currentUser = $cookieStore.get 'user' ? null
                $cookieStore.remove 'user'

            login: (user, callback) ->
                cb = getCallBack callback

                Session.save(
                  email: user.email
                  password: user.password
                , (user) ->
                  $rootScope.currentUser = user
                  cb()
                , (err) ->
                  cb err
                ).$promise;

            logout: (callback) ->
                cb = getCallBack callback

                Session.delete( ->
                    $rootScope.currentUser = null;
                    cb()
                , (err) ->
                    cb err
                ).$promise;

            createUser: (user, callback) ->
                cb = getCallBack callback

                User.save(user
                , (user)  ->
                    $rootScope.currentUser = user
                    cb user
                , (err) ->
                    cb err
                ).$promise;

            changePassword: (oldPassword, newPassword, callback) ->
                cb = getCallBack callback

                User.update(
                  oldPassword: oldPassword
                  newPassword: newPassword
                , (user) ->
                    cb user
                , (err) ->
                    cb err
                ).$promise;

            currentUser: -> User.get()

            isLoggedIn: -> !!$rootScope.currentUser
]
