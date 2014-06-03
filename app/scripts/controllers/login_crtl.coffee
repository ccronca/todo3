'use strict'

app = angular.module 'todoApp'

class LoginCtrl extends BaseCtrl

    @register app
    @inject '$scope', 'Auth', '$location'

    initialize: ->
        @errors = {}
        @submitted = false
    login: (form, user) ->
        @submitted = true
        if (form.$valid)
            @Auth.login
              email: user.email,
              password: user.password
            .then =>
                @$location.path('/')
            , (err) =>
                @errors = err.data
    isSubmitted: ->
        !! @submitted

    getErrors: ->
        if @errors.message? then @errors.message else null


