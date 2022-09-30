learnWordsApp.controller('homeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.statistics = [];
  $scope.statisticsByLevel = [];

  $http.get('learnWords/statistics').then(function (result) {
    var max = Math.max.apply(Math, result.data.map(function (o) { return o.count }));
    for (var i = 0; i < result.data.length; i++) {
      $scope.statistics.push({
        state: result.data[i].state,
        count: result.data[i].count,
        percent: Math.round((result.data[i].count / (max == 0 ? 1 : max)) * 20) * 5
      });
    }
  }, function (err) { console.log(err); });

  var getLevelStatistics = function (levelID, callback) {
    $http.get('learnWords/statistics/byLevel?levelID=' + levelID).then(function (result) {
      callback(
        {
          levelName: result.data[0].levelName,
          count: result.data[0].count,
          percent: Math.round(result.data[0].percentage)
        });
    }, function (err) { console.log(err); })
  }

  getLevelStatistics(1, function (statByLevel) {
    $scope.statisticsByLevel.push(statByLevel);
    getLevelStatistics(2, function (statByLevel) {
      $scope.statisticsByLevel.push(statByLevel);
      getLevelStatistics(3, function (statByLevel) {
        $scope.statisticsByLevel.push(statByLevel);
        getLevelStatistics(4, function (statByLevel) {
          $scope.statisticsByLevel.push(statByLevel);
          getLevelStatistics(5, function (statByLevel) {
            $scope.statisticsByLevel.push(statByLevel);
            getLevelStatistics(6, function (statByLevel) {
              $scope.statisticsByLevel.push(statByLevel);
            });
          });
        });
      });
    });
  });

  $scope.onLearn = function () {
    $location.path('/learnPage');
  };

  $scope.onNew = function () {
    $location.path('/newWord');
  };

  $scope.onTest = function () {
    $location.path('/testPage');
  }
}]);
