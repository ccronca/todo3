'use strict'

app = angular.module 'todoApp'

class ProfileCtrl extends BaseCtrl
    @register app
    @inject '$scope'

    initialize: ->
        @text = 'Hola'

    getText: ->
        @text
