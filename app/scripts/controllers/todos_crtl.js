(function() {
  'use strict';
  var TodosCtrl, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = angular.module('todoApp');

  TodosCtrl = (function(_super) {
    __extends(TodosCtrl, _super);

    function TodosCtrl() {
      return TodosCtrl.__super__.constructor.apply(this, arguments);
    }

    TodosCtrl.register(app);

    TodosCtrl.inject('$scope', 'todos', 'Todo');

    TodosCtrl.prototype.initialize = function() {
      return this.reset();
    };

    TodosCtrl.prototype.isClean = function(todo) {
      return angular.equals(todo, this.Todo);
    };

    TodosCtrl.prototype.remaining = function() {
      var todo, _i, _len, _ref, _results;
      _ref = this.todos;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        todo = _ref[_i];
        if (!todo.completed) {
          _results.push(todo);
        }
      }
      return _results;
    };

    TodosCtrl.prototype.completed = function() {
      var todo, _i, _len, _ref, _results;
      _ref = this.todos;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        todo = _ref[_i];
        if (todo.completed) {
          _results.push(todo);
        }
      }
      return _results;
    };

    TodosCtrl.prototype.completedCount = function() {
      return this.completed().length;
    };

    TodosCtrl.prototype.count = function() {
      return this.todos.length;
    };

    TodosCtrl.prototype.remainingCount = function() {
      return this.remaining().length;
    };

    TodosCtrl.prototype.archive = function() {
      angular.forEach(this.completed(), function(todo) {
        return todo.$remove();
      });
      return this.todos = this.remaining();
    };

    TodosCtrl.prototype.reset = function() {
      var _ref, _ref1;
      if (this.isClean(this.$scope.todo)) {
        return;
      }
      this.$scope.todo = angular.copy(this.Todo);
      this.originalTodo = null;
      if ((_ref = this.$scope.todoForm) != null) {
        _ref.$setPristine();
      }
      return (_ref1 = this.$scope.todoForm) != null ? _ref1.$submitted = false : void 0;
    };

    TodosCtrl.prototype.filter = function(status) {
      this.status = status;
      return this.statusFilter = status === 'active' ? {
        completed: false
      } : status === 'completed' ? {
        completed: true
      } : null;
    };

    TodosCtrl.prototype.add = function(form, todo) {
      var promise;
      if (this.isClean(todo)) {
        return;
      }
      if (form != null) {
        form.$submitted = true;
      }
      if (!(form != null ? form.$valid : void 0)) {
        return;
      }
      promise = todo.$save();
      return promise.then((function(_this) {
        return function(data) {
          _this.todos.unshift(data);
          return _this.reset();
        };
      })(this));
    };

    TodosCtrl.prototype["delete"] = function(todo) {
      var promise;
      promise = todo.$delete();
      return promise.then((function(_this) {
        return function() {
          var index;
          index = _this.todos.indexOf(todo);
          if (index !== -1) {
            return _this.todos.splice(index, 1);
          }
        };
      })(this));
    };

    TodosCtrl.prototype.edit = function(todo) {
      return this.originalTodo = angular.copy(todo);
    };

    TodosCtrl.prototype.doneEditing = function(todo) {
      todo.$update();
      return this.originalTodo = null;
    };

    TodosCtrl.prototype.revertEditing = function(todo) {
      var index;
      index = this.todos.indexOf(todo);
      if (index !== -1) {
        this.todos[index] = this.originalTodo;
      }
      return this.originalTodo = null;
    };

    TodosCtrl.prototype.markAll = function(allCompleted) {
      return angular.forEach(this.todos, function(todo) {
        todo.completed = !allCompleted;
        return todo.$update();
      });
    };

    TodosCtrl.prototype.checkOriginalTodo = function(todo) {
      return todo._id === (!this.originalTodo ? null : this.originalTodo._id);
    };

    return TodosCtrl;

  })(BaseCtrl);

}).call(this);
