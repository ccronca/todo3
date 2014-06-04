'use strict'

app = angular.module 'todoApp'

class SignupCtrl extends BaseCtrl
    @register app
    @inject '$scope', 'Auth', '$location'

    initialize: ->
        @reset()

    reset: ->
        @message = ''
        @errors = {}
        @submitted = false

    register: (form, user) ->
        @submitted = true
        if form.$valid
            @Auth.createUser
                name: user.name,
                email: user.email,
                password: user.password
            .then =>
                #Account created, redirect to home
                @$location.path '/'
            .then null, (err) =>
                # Update validity of form fields that match the mongoose errors
                angular.forEach err.data.errors, (error, field) =>
                    form[field].$setValidity 'mongoose', false
                    @errors[field] = error.message
    isSubmitted: ->
        !! @submitted

    getMessage: ->
        if @message? then @message else null

    getError: (field) ->
        if @errors[field]? then @errors[field] else null
