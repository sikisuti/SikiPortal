var learnJavaApp = angular.module('learnJavaApp', ['ngRoute']);

learnJavaApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeController'
    })
    .when('/questionnaire', {
      templateUrl: 'views/questionnaire.html',
      controller: 'questionnaireController'
    })
    .when('/login', {
      templateUrl: 'views/loginPage.html',
      controller: 'loginPageController'
    });
});
