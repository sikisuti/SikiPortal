learnJavaApp.controller('questionnaireController', ['$scope', '$http', function($scope, $http){

    var goodAnswerNr = 0;

    var resetCounters = function() {
      $scope.questionNr = 0;
      goodAnswerNr = 0;
      $scope.percent = 0;
    }

    var getQuestion = function(){
      $http.get('/api/learnJava/question')
        .then(function(response){
          $scope.question = response.data;
          $scope.codeAreaHeight = getCodeAreaHeight(response.data.code);
          $scope.questionNr += 1;
          console.log(response.data.explanation);
        }, function(response){});
      $scope.action = 'check';
    };

    var getCodeAreaHeight = function(code) {
      var lineNo = (code.match(new RegExp("\n", "g")) || []).length + 1;
      if (lineNo > 15) { lineNo = 15; }
      return (lineNo + 2) * 16;
    };

    resetCounters();
    getQuestion();

    $scope.checkAnswers = function(){
      console.log($scope.question.answers);
      var madeMistake = false;
      $scope.question.answers.forEach(function(answer){
        if (answer.ISCORRECT == answer.selected || (answer.selected == undefined && !answer.ISCORRECT)){
          answer.class = "correct";
        } else {
          answer.class = "incorrect";
          madeMistake = true;
        }
      });

      if (!madeMistake) {
        goodAnswerNr += 1;
      }

      $scope.percent = Math.round((goodAnswerNr / $scope.questionNr) * 100);
      $scope.action = 'next';
    };

    $scope.next = function(){
      getQuestion();
    };

    $scope.reset = function(){
      $http.delete('/api/learnJava/question')
        .then(function(response){
          getQuestion();
        }, function(response){});
      resetCounters();
    };

}]);
