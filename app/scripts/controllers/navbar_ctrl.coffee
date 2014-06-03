'use strict'

app = angular.module 'todoApp'

class NavbarCtrl extends BaseCtrl

    @register app
    @inject '$scope', 'Auth', '$location'

    @initialize: ->
        @menu = [
            'title': 'Home'
            'link': '/'
        ,
            'title': 'Settings'
            'link': '/settings'
        ]
    logout: ->
        @Auth.logout().then =>
            @$location.path '/login'
    isActive: (route) ->
        route == @$location.path()
    getMenu: ->
        @menu
