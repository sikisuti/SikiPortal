learnJavaApp.controller('mainCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){
  $scope.$on('$locationChangeStart', function(event) {
    $http.get('/api/authorization/check').then(function(response){
      if (response.status == 401) {
        console.log('no auth');
        // TODO: redirect to login page
      }
    }, function(response){});
  });
}]);
