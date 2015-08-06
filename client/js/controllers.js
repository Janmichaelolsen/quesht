todoApp.controller('TodoCtrl', function($rootScope, $scope, $routeParams, $location, todosFactory) {

  $scope.todos = [];
  $scope.isEditable = [];
  // get all Todos on Load
  $scope.loading = true;
  todosFactory.getQuestion({q_id: $routeParams.quest_id}).then(function(data) {
    if(data){
      $scope.data = data.data;
      $scope.question = data.data.question.question;
      $scope.answers = data.data.answers;
      $scope.loading = false;
    }else {
      Materialize.toast('Question not found!', 4000);
      $location.path('/');
    }
  });

  $scope.save = function() {
      todosFactory.saveAnswer({
        "name": $scope.nameInput,
        "answer": $scope.answerInput,
        "question": $scope.data.question._id
      }).then(function(data) {
        $scope.answers.push(data.data);
      });
      $scope.nameInput = '';
      $scope.answerInput = '';
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

todoApp.controller('RegCtrl', function($rootScope, $scope, $location, todosFactory, $interval) {
  $scope.exampleQuestions = ["Who buys what?", "When will you arrive?", "When are you available?"];
  var tabIndex = 0;
  $scope.loading = true;
  $scope.hint = $scope.exampleQuestions[tabIndex];
  $scope.newQuestion = function(){
    if(tabIndex == $scope.exampleQuestions.length-1){      
      tabIndex = 0;
    }else {
      tabIndex++;
    }
    $scope.hint = $scope.exampleQuestions[tabIndex];
  };
  $interval($scope.newQuestion, 3000);
  

  $scope.create = function() {
    $scope.loading = true;
    todosFactory.saveQuestion({
      "question": $scope.questionInput,
    }).then(function(data) {
      $location.path("/q/"+data.data._id);
    });
  };
});
