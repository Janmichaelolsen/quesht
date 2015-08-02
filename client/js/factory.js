todoApp.factory('todosFactory', function($http) {
  var urlBase = '/api/todos';
  var questBase = '/api/questions';
  var _todoService = {};

  _todoService.getTodos = function() {
    return $http.get(urlBase);
  };

  _todoService.saveTodo = function(todo) {
    return $http.post(urlBase, todo);
  };

  _todoService.saveQuestion = function(question) {
    return $http.post(questBase, question);
  };

  _todoService.updateTodo = function(todo) {
    return $http.put(urlBase, todo);
  };

  _todoService.deleteTodo = function(id) {
    return $http.delete(urlBase + '/' + id);
  };

  return _todoService;
});
