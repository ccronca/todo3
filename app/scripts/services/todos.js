'use strict';

angular.module('todoApp')
    .service('Todos', function Todos(Todo) {
        return {
            getAll: function() {
                return Todo.query().$promise;
            }
        };
    });
