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

  $scope.newWord = {
    foreignWord: "",
    native: "",
    definition: "",
    exampleSentence: "",
    lexicalCategory: "",
    pronunciation: "",
    audioFile: ""
  };

  $scope.setNative = function(newNative) {
        $scope.newWord.native = newNative;
    };

  $scope.search = function(word) {
    audio = undefined;
    startProcess('Search translation...');
    $http.get('/learnWords/searchNatives?word=' + word)
      .then(function(response){
        $scope.natives = response.data;
        endProcess('Search translation...');
      }, function(err){
        console.log(err);
        endProcess('Search translation...');
      });

    startProcess('Search definition...');
    $http.get('/learnWords/searchOxford?word=' + word.replace(' ', '_'))
      .then(function(response){
        $scope.oxfords = response.data;
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

  $scope.submit = function() {
    if ($scope.newWord.native == "" || $scope.newWord.foreignWord == "" || ($scope.oxfords != undefined && $scope.oxfords.length > 0 && $scope.newWord.definition == "")) {return;}

    $scope.newWord.levelID = 1;
    startProcess('Saving word...');
    $http.post('/learnWords/word', $scope.newWord).then(function(response){
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
