'use strict'

app = angular.module 'todoApp'

class MainCtrl extends BaseCtrl
    @register app
    @inject '$scope'

    initialize: ->
        @text = 'Hola'

    getText: ->
        @text
