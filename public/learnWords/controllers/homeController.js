learnWordsApp.controller('homeController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.statistics = [];

  $http.get('learnWords/stateStatistics').then(function(result){
    var max = Math.max.apply(Math, result.data.map(function(o){ return o.count }));
    for (var i = 0; i < result.data.length; i++) {
      $scope.statistics.push({
        state: result.data[i].state,
        count: result.data[i].count,
        percent: Math.round((result.data[i].count / (max == 0 ? 1 : max)) * 20) * 5
      });
    }
    console.log($scope.statistics);
  }, function(err){console.log(err);});

    $scope.onLearn = function(){
      $location.path('/learnPage');
    };
    $scope.onNew = function(){
      $location.path('/newWord');
    };
}]);
