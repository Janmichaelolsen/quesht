todoApp.controller('TodoCtrl', function($rootScope, $scope, $routeParams, todosFactory) {

  $scope.todos = [];
  $scope.isEditable = [];
  $scope.title = $routeParams.quest_id;
  // get all Todos on Load
  $scope.loading = true;
  todosFactory.getTodos().then(function(data) {
    $scope.todos = data.data;
    $scope.loading = false;
  });

  // Save a Todo to the server
  $scope.save = function() {
      todosFactory.saveTodo({
        "name": $scope.nameInput,
        "time": $scope.timeInput
      }).then(function(data) {
        $scope.todos.push(data.data);
      });
      $scope.nameInput = '';
      $scope.timeInput = '';
      $scope.commentInput = '';
  };

  //update the status of the Todo
  $scope.updateStatus = function($event, _id, i) {
    var cbk = $event.target.checked;
    var _t = $scope.todos[i];
    todosFactory.updateTodo({
      _id: _id,
      isCompleted: cbk,
      todo: _t.todo
    }).then(function(data) {
      if (data.data.updatedExisting) {
        _t.isCompleted = cbk;
      } else {
        alert('Oops something went wrong!');
      }
    });
  };

  // Update the edited Todo
  $scope.edit = function($event, i) {
    if ($event.which == 13 && $event.target.value.trim()) {
      var _t = $scope.todos[i];
      todosFactory.updateTodo({
        _id: _t._id,
        todo: $event.target.value.trim(),
        isCompleted: _t.isCompleted
      }).then(function(data) {
              console.log(data);
        if (data.data.updatedExisting) {
          _t.todo = $event.target.value.trim();
          $scope.isEditable[i] = false;
        } else {
          alert('Oops something went wrong!');
        }
      });
    }
  };

  // Delete a Todo
  $scope.delete = function(i) {
    todosFactory.deleteTodo($scope.todos[i]._id).then(function(data) {
      if (data.data) {
        $scope.todos.splice(i, 1);
      }
    });
  };

});

todoApp.controller('RegCtrl', function($rootScope, $scope, $location, todosFactory) {

  $scope.create = function() {
      $location.path('/q/'+$scope.questionNameInput);
      /*todosFactory.saveQuestion({
        "question": $scope.questionInput,
        "url": $scope.questionNameInput
      }).then(function() {
        $location.path('/q/'+$scope.questionNameInput);
      });*/
  };


});
