todoApp.factory('todosFactory', function($http) {
  var answerUrl = '/api/answers';
  var questBase = '/api/questions';
  var questGetBase = '/api/questionGet';
  var _queshtService = {};

  _queshtService.getAnswers = function(question){

  };
  _queshtService.saveAnswer = function(answer) {
    return $http.post(answerUrl, answer);
  };

  _queshtService.saveQuestion = function(question) {
    return $http.post(questBase, question);
  };

  _queshtService.getQuestion = function(q_id) {
    return $http.post(questGetBase, q_id);
  };

  _queshtService.updateTodo = function(todo) {
    return $http.put(urlBase, todo);
  };

  _queshtService.deleteAnswer = function(id) {
    return $http.delete(answerUrl + '/' + id);
  };

  return _queshtService;
});
