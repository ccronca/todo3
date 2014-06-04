'use strict'

app = angular.module 'todoApp'

class SettingsCtrl extends BaseCtrl
    @register app
    @inject '$scope', 'Auth'


    initialize: ->
        @reset()

    reset: ->
        @message = ''
        @errors = {}
        @submitted = false

    changePassword: (form, user) ->
        @submitted = true
        if form.$valid
            @Auth.changePassword user.oldPassword, user.newPassword
            .then =>
                @reset()
                @message = 'Password successfully changed.';
            .then null, =>
                form.password.$setValidity 'mongoose', false
                @message = 'Incorrect password';

    isSubmitted: ->
        !! @submitted

    getMessage: ->
        if @message? then @message else null
