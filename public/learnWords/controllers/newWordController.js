learnWordsApp.controller('newWordController', ['$scope', '$location', '$http', function($scope, $location, $http){
  $scope.newWord = {
    foreign: "",
    native: ""
  };

  $scope.search = function(word) {
    $http.get('/learnWords/searchNatives?word=' + word)
    .then(function(response){
      $scope.natives = response.data;
    }, function(err){
      console.log(err);
    });
  }
}]);
