learnWordsApp.controller('mainCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

  $scope.$on('$locationChangeStart', function(event) {
    //console.log('auhorization check...')
    $http.get('/learnWords/authorizationCheck').then(function(response){
    }, function(response){
      if (response.status == 401) {
        console.log('Redirect to login page...');
        $location.path('/login');
      }
    });
  });

}]);
