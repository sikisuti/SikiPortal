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
      var data = {
        'username': $scope.username,
        'password': $scope.password
      };
  
      var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
  
      setBusy(true, 'Register user...');
      $http.post('/authorization/user', data, config).then(function(response){
        setBusy(false);
        $location.path('/');
      }, function(response){
        setBusy(false);
        console.log("Register failed");
      });
    };
  }]);