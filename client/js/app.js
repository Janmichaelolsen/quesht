todoApp = angular.module('todoApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/reg.html',
        controller: 'RegCtrl'
      }).when('/q/:quest_id', {
        templateUrl: '/partials/question.html',
        controller: 'TodoCtrl'
      }).otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  });
