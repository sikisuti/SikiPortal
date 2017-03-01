learnWordsApp.controller('registerController', ['$scope', '$location', '$http', function($scope, $location, $http){
    $scope.submit = function() {
      if ($scope.password != $scope.passwordConfirmation){
        alert('Password fields must be alike!');
        return;
      }
      var data = {
        'username': $scope.username,
        'password': $scope.password
      };

      var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }

      $http.post('/userManagement/user', data, config).then(function(response){
        if (response.status == 400) {alert('User already exists!'); return;}
        $location.path('/login');
      }, function(response){
        alert(response.data);
        console.log(response);
      });
    };
}]);
