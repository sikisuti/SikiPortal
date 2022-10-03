learnWordsApp.controller('newWordController', ['$scope', '$location', '$http', function($scope, $location, $http){

  var audio;

  $scope.busy = {
    state: false,
    message: ""
  };
  var processes = [];
  var startProcess = function(message){
    processes.push(message);
    $scope.busy.state = true;
    $scope.busy.message = message;
  };
  var endProcess = function(message){
    processes.splice(processes.indexOf(message), 1);
    if (processes.length > 0){
      $scope.busy.message = processes[processes.length - 1];
    } else {
      $scope.busy.state = false;
      $scope.busy.message = "";
    }
  };

  $scope.newWord = {};

  /*$scope.search = function(word) {
    audio = undefined;

    startProcess('Search definition...');
    $http.get('/learnWords/dictionary/search?word=' + word.replace(' ', '_'))
      .then(function(response){
        $scope.oxfords = response.data;
        endProcess('Search definition...');
      }, function(err){
        console.log(err);
        endProcess('Search definition...');
      });
  };*/

  $scope.searchExistings = function(foreignWord) {
    audio = undefined;

    startProcess('Search existing...');
    $http.get('/learnWords/words/byForeign/' + foreignWord.replace(' ', '_'))
      .then(function(response){
        $scope.existingWords = response.data;
        endProcess('Search definition...');
      }, function(err){
        console.log(err);
        endProcess('Search definition...');
      });
  };

  $scope.selectItem = function(item) {
    $scope.newWord.definition = item.definition;
    $scope.newWord.lexicalCategory = item.lexicalCategory;
    $scope.newWord.exampleSentence = item.example;
    $scope.newWord.pronunciation = item.pronunciation;
    $scope.newWord.audioFile = item.audioFile;
  };

  $scope.selectExisting = function(existingWord) {
    $scope.newWord.id = existingWord.id;
    $scope.newWord.native = existingWord.native;
    $scope.newWord.audioFile = existingWord.audioFile;
  };

  $scope.submit = function() {
    if ($scope.newWord.native == "" || $scope.newWord.foreignWord == "") {return;}

    $scope.newWord.levelID = 1;
    if (!$scope.newWord.audioFile) { $scope.newWord.audioFile = 'n/a'; }
    startProcess('Saving word...');
    $http.post('/learnWords/words', $scope.newWord).then(function(response){
      endProcess('Saving word...');
      $location.path('/');
    }, function(err){
      console.log(err);
      endProcess('Saving word...');
    });
  }

  $scope.play = function(audioFile) {
    if (audioFile != ""){
      if (audio == undefined){
        audio = new Howl({ src: [audioFile] });
      }
      audio.play();
    }

  }
}]);
