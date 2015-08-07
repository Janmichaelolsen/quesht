todoApp.controller('TodoCtrl', function($rootScope, $scope, $routeParams, $location, todosFactory) {

  $scope.loading = true;
  $scope.titleEdit = false;
  $scope.questionUrl = $location.absUrl();
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

  $scope.editTitle = function() {
      $scope.titleEdit = true;
  };

  $scope.saveTitle = function($event) {
      $scope.titleEdit = false;
      todosFactory.updateQuestion({
        _id: $routeParams.quest_id,
        new_q: $scope.question});
  };

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
    todosFactory.deleteAnswer($scope.answers[i]._id).then(function(data) {
      if (data.data) {
        $scope.answers.splice(i, 1);
      }
    });
  };

});

todoApp.controller('RegCtrl', function($rootScope, $scope, $location, todosFactory, $interval) {
  $scope.exampleQuestions = ["Who buys what for the party?", "When will you arrive?", "When are you available?", "What do you want for christmas?"];
  var tabIndex = 0;
  $scope.loading = true;
  $scope.newQuestion = function(){
    $scope.hint = "";
    if(tabIndex == $scope.exampleQuestions.length-1){      
      tabIndex = 0;
    }else {
      tabIndex++;
    }
    var res = $scope.exampleQuestions[tabIndex].split("");
    var i=0;
    $scope.appendWord = function(){
      if(i<res.length){
        $scope.hint += res[i];
      }
      i++;
    };
    $interval($scope.appendWord, 30);
      
  };
  $scope.newQuestion();
  $interval($scope.newQuestion, 3000);
  

  $scope.create = function() {
    $scope.loading = true;
    todosFactory.saveQuestion({
      "question": $scope.questionInput,
    }).then(function(data) {
      console.log(data.data._id);
      $location.path("/q/"+data.data._id);
    });
  };
});
