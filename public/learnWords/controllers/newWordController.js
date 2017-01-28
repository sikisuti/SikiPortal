learnWordsApp.controller('newWordController', ['$scope', '$location', '$http', function($scope, $location, $http){
  $scope.newWord = {
    foreign: "",
    native: "",
    definition: ""
  };

  $scope.search = function(word) {
    $http.get('/learnWords/searchNatives?word=' + word)
      .then(function(response){
        $scope.natives = response.data;
      }, function(err){
        console.log(err);
      });

    $http.get('/learnWords/searchOxford?word=' + word.replace(' ', '_'))
      .then(function(response){
        $scope.oxfords = response.data;
        console.log(response.data);
      }, function(err){
        console.log(err);
      });
  }
}]);
