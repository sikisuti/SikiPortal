learnWordsApp.controller('homeController', ['$scope', '$location', function($scope, $location){
    $scope.onLearn = function(){
      $location.path('/learnPage');
    };
    $scope.onNew = function(){
      $location.path('/newWord');
    };
}]);
