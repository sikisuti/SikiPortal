learnWordsApp.controller('mainCtrl', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies){

  $scope.username = $cookies.get('sikiUsername');

  $scope.$on('$locationChangeStart', function(event, newUrl) {
    if (newUrl.indexOf('register') != -1) {return;}
    console.log('auhorization check...');
    $http.get('/learnWords/authorizationCheck')
      .then(function(response){
        $scope.username = $cookies.get('sikiUsername');
      }, function(err){
        if (err.status == 401) {
          console.log('Redirect to login page...');
          $scope.username = '';
          $location.path('/login');
        }
    });
  });

  $scope.logout = function() {
    $cookies.remove('sikiToken');
    $cookies.remove('sikiUsername');
    $scope.username = '';
    $location.path('/login');
  };

}]);
