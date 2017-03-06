learnWordsApp.controller('loginPageController', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies){

  $scope.busy = {
    state: false,
    message: ""
  };
  var setBusy = function(state, message){
    $scope.busy.state = state;
    $scope.busy.message = state ? message : "";
  };

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

      setBusy(true, 'Logging in...');
      $http.post('/authorization/login', data, config).then(function(response){
        setBusy(false);
        $location.path('/');
      }, function(response){
        setBusy(false);
        console.log("Authentication failed");
      });
    };

    $scope.register = function(){
      $location.path('/register');
    };
}]);
