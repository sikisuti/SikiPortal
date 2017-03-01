var learnWordsApp = angular.module('learnWordsApp', ['ngRoute', 'ngMaterial', 'ngCookies']);

learnWordsApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'learnWords/views/home.html',
      controller: 'homeController'
    })
    .when('/learnPage', {
      templateUrl: 'learnWords/views/learnPage.html',
      controller: 'learnPageController'
    })
    .when('/newWord', {
      templateUrl: 'learnWords/views/newWord.html',
      controller: 'newWordController'
    })
    .when('/login', {
      templateUrl: 'learnWords/views/loginPage.html',
      controller: 'loginPageController'
    })
    .when('/register', {
      templateUrl: 'learnWords/views/register.html',
      controller: 'registerController'
    });
});
