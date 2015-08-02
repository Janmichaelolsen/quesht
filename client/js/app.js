todoApp = angular.module('todoApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/reg.html',
        controller: 'RegCtrl'
      }).when('/q/:quest_id', {
        templateUrl: '/partials/todo.html',
        controller: 'TodoCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });
