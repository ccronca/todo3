describe "Controller TodosCtrl", ->

  beforeEach module "todoApp"

  ctrl = null
  $scope = null
  todos = null
  todo = null

  count = 0

  # Initialize the controller and a mock scope
  beforeEach inject ($injector, $rootScope, $controller, $q) ->

    $scope = $rootScope.$new()

    ctrl = $controller "TodosCtrl",
      $scope: $scope,
      Todo: $injector.get("Todos"),
      todos: [
        { title: 'Dummy title 1', completed: false, $remove: -> }, { title: 'Dummy title 1', completed: true, $remove: ->  }, { title: 'Dummy title 1', completed: true, $remove: -> }
      ]

      deferred = $q.defer()
      deferred.resolve(true)

    todo =
      $delete: sinon.stub().returns deferred.promise
      $save: sinon.stub().returns deferred.promise
      $update: sinon.stub().returns deferred.promise


  it "assisgns todos", ->
    expect(ctrl.todos).to.not.be.undefined
    expect(ctrl.todos.length).to.equal 3

  describe "#remaining()", ->
    it "should have 1 remaining", ->
      expect(ctrl.remaining()).to.have.length 1

  describe "#completed()", ->
    it "should have 2 completed", ->
      expect(ctrl.completed()).to.have.length 2

  describe "#count()", ->
    it "should have 3 todos", ->
      expect(ctrl.count()).to.equal 3

  describe "#archive()", ->
    beforeEach ->
      $scope.$apply -> ctrl.archive()
    it "should arcvhive 2 todos", ->
      expect(ctrl.count()).to.equal 1
      expect(ctrl.completedCount()).to.equal 0

  describe "#filter()", ->
    it "should change the status a active", ->
      ctrl.filter('active')
      expect(ctrl.status).to.equal 'active'
      expect(ctrl.statusFilter).to.deep.equal {completed: false}
    it "should change the status a completed", ->
      ctrl.filter('completed')
      expect(ctrl.status).to.equal 'completed'
      expect(ctrl.statusFilter).to.deep.equal {completed: true}
    it "should clear the status", ->
      ctrl.filter('')
      expect(ctrl.status).to.equal ''
      expect(ctrl.statusFilter).to.be.null


  describe "#delete()", ->
    beforeEach inject ($q) ->
      $scope.$apply -> ctrl.delete(todo)
    it "deletes the todo", ->
      expect(todo.$delete.called).to.be.true

  describe "#add()", ->
    beforeEach inject ($q) ->
      form = $valid: true
      count = ctrl.todos.length
      $scope.$apply -> ctrl.add(form, todo)
    it "saves the todo", ->
      expect(todo.$save.called).to.be.true
      expect(count).to.be.equal (ctrl.todos.length - 1 )


  describe "#edit()", ->
    beforeEach ->
      $scope.$apply -> ctrl.edit(todo)
    it "save original todo", ->
      expect(ctrl.originalTodo).to.not.be.null
      expect(ctrl.originalTodo).to.be.deep.equal todo

  describe "#doneEditing()", ->
    beforeEach inject ($q) ->
      $scope.$apply -> ctrl.doneEditing(todo)
    it "update the todo", ->
      expect(todo.$update.called).to.be.true
      expect(ctrl.originalTodo).to.be.null


