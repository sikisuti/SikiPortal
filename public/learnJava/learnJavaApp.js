var learnJavaApp = angular.module('learnJavaApp', ['ngRoute']);

learnJavaApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'learnJava/views/home.html',
      controller: 'homeController'
    })
    .when('/questionnaire', {
      templateUrl: 'learnJava/views/questionnaire.html',
      controller: 'questionnaireController'
    })
    .when('/login', {
      templateUrl: 'learnJava/views/loginPage.html',
      controller: 'loginPageController'
    });
});
