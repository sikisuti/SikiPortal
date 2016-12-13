var shoppingListApp = angular.module('shoppingListApp', ['ngRoute']);

shoppingListApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'shoppingList/views/home.html',
      controller: 'homeController'
    });
});
