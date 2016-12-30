learnJavaApp.controller('questionnaireController', ['$scope', '$http', function($scope, $http){

    var getQuestion = function(){
      $http.get('/api/learnJava/question')
        .then(function(response){
          $scope.question = response.data;
          $scope.codeAreaHeight = getCodeAreaHeight(response.data.code);
        }, function(response){});
    };

    var getCodeAreaHeight = function(code) {
      var lineNo = (code.match(new RegExp("\n", "g")) || []).length + 1;
      if (lineNo > 15) { lineNo = 15; }
      return (lineNo + 2) * 16;
    };

    getQuestion();

    $scope.checkAnswers = function(){
      console.log($scope.question.answers);
      $scope.question.answers.forEach(function(answer){
        if (answer.ISCORRECT == answer.selected || (answer.selected == undefined && !answer.ISCORRECT)){
          answer.class = "correct";
        } else {
          answer.class = "incorrect";
        }
      });
    };

    $scope.next = function(){
      getQuestion();
    };

    $scope.reset = function(){
      $http.delete('/api/learnJava/question')
        .then(function(response){
          getQuestion();
        }, function(response){});
    };

}]);
