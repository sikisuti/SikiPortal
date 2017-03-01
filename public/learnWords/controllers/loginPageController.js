learnWordsApp.controller('loginPageController', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies){
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

      $http.post('/authorization/login', data, config).then(function(response){
        $cookies.put('sikiUsername', response.data);
        $location.path('/');
      }, function(response){
        console.log("Authentication failed");
      });
    };

    $scope.register = function(){
      $location.path('/register');
    };
}]);
