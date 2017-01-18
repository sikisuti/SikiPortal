learnJavaApp.controller('loginPageController', ['$scope', '$location', '$http', function($scope, $location, $http){
    $scope.submit = function() {
      var data = {
        'username': $scope.username,
        'password': $scope.password
      };

      var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }

      $http.post('/api/authorization/login', data, config).then(function(response){
        $location.path('/');
      }, function(response){
        console.log("Authentication failed");
      });
    };
}]);
