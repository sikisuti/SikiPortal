learnWordsApp.controller('registerController', ['$scope', '$location', '$http', function($scope, $location, $http){

  $scope.busy = {
    state: false,
    message: ""
  };
  var setBusy = function(state, message){
    $scope.busy.state = state;
    $scope.busy.message = state ? message : "";
  };

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

      setBusy(true, 'Registering...');
      $http.post('/userManagement/user', data, config).then(function(response){
        if (response.status == 400) {setBusy(false); alert('User already exists!'); return;}

        setBusy(false);
        $location.path('/login');
      }, function(response){
        setBusy(false);
        alert(response.data);
        console.log(response);
      });
    };
}]);
