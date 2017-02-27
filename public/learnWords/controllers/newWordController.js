learnWordsApp.controller('newWordController', ['$scope', '$location', '$http', function($scope, $location, $http){

  var audio;

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
    $http.get('/learnWords/searchNatives?word=' + word)
      .then(function(response){
        $scope.natives = response.data;
      }, function(err){
        console.log(err);
      });

    $http.get('/learnWords/searchOxford?word=' + word.replace(' ', '_'))
      .then(function(response){
        $scope.oxfords = response.data;
      }, function(err){
        console.log(err);
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
    $http.post('/learnWords/word', $scope.newWord).then(function(response){
      $location.path('/');
    }, function(err){console.log(err);});
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
