'use strict'

describe 'Directive: usertestdirective', () ->

  # load the directive's module
  beforeEach module 'todoApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<usertestdirective></usertestdirective>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the usertestdirective directive'
