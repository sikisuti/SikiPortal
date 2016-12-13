learnJavaApp.controller('homeController', ['$scope', '$location', function($scope, $location){
    $scope.onNewTest = function(){
      $location.path('/questionnaire');
    };
}]);
