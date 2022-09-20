learnWordsApp.controller('testPageController', ['$scope', '$location', '$http', function($scope, $location, $http){
    var noOfWords;

    var actList;
    var actIndex;
    var rndSide;
    var modifiedWords = new Array();
    var sentences;

    var sounds = [];

    var words;

    $scope.progressBarWidth = "0%";
    $scope.autoVoice = false;
    $scope.busy = {
      state: false,
      message: ""
    };
    
    var setBusy = function(state, message){
        $scope.busy.state = state;
        $scope.busy.message = state ? message : "";
    }
    
    setBusy(false);

    $scope.isFlipped = false;
    $scope.playCachedAudio = function(){playCachedAudio();};

    function playCachedAudio(){
      var indexOfActSound = indexOfSound(actList[actIndex].audioFile);
      if (indexOfActSound < 0){
        sounds[sounds.length] = new Howl({ src: [actList[actIndex].audioFile], autoplay: true });
      } else {
        sounds[indexOfActSound].play();
      }
    }

    function indexOfSound(filename){
      var rtn = -1;
      for (i = 0; i < sounds.length; i++){
        if (sounds[i]._src == filename){
             rtn = i;
         }
       }
       return rtn;
    }

    $scope.audioNotExists = function(){
        return !$scope.word || 
                !$scope.word.audioFile || 
                ($scope.word.audioFile.indexOf('http://') == -1 && $scope.word.audioFile.indexOf('https://') == -1);
    }
   
    $scope.retrieveWordsToTest = function(noOfWords) {
        $http.get('/learnWords/testWords/start?noOfWords=' + noOfWords)
        .then(function(response){
            words = response.data;
            getWords(function(tempList){
              actList = tempList;
              fillContent();
              setBusy(false);
            });
        }, function(err){
            console.log(err);
            setBusy(false);
        });
    }

    function getWords(callback) {
        var tempList = new Array();
        rndSide = new Array();
        for (var i = 0; i < words.length; i++){
            tempList[i] = words[i];
        }

        tempList = shuffle(tempList);
        for (var i = 0; i < words.length; i++){
            tempList[i + words.length] = tempList[i];
        }
        
        for (var i = 0; i < words.length; i++){
            rndSide[i] = Math.round(Math.random());
        }
        
        for (var i = 0; i < words.length; i++){
            rndSide[i + words.length] = Math.abs(rndSide[i] - 1);
        }

        actIndex = 0;
        callback(tempList);
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;
  
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
  
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
  
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
  
        return array;
    }

    $scope.reviseWord = function() {
      actIndex = (actIndex + 1) % actList.length;
      fillContent();
    };
  
    $scope.skipWord = function() {
        actList.splice(actIndex, 1);
        rndSide.splice(actIndex, 1);
        updateProgressBar();
        if (actList.length == 0){
            setBusy(false);
            $location.path('/');
        }
        else{
            actIndex = actIndex % actList.length;
            fillContent();
        }
    };

    $scope.setKnown = function(callback){}

	var updateProgressBar = function(){
        var wordsLength = 2 * words.length;
		var percent = ((wordsLength - actList.length) / wordsLength) * 100;
        $scope.progressBarWidth = percent.toFixed(1) + "%";
	}

    function fillContent(){
      $scope.word = actList[actIndex];
      $scope.isFlipped = rndSide[actIndex] == 1;
      if ($scope.isFlipped && 
        (actList[actIndex].audioFile.indexOf('http://') != -1 || actList[actIndex].audioFile.indexOf('https://') != -1) && 
        $scope.autoVoice) {playCachedAudio();}
    }

    $scope.flipCard = function() {
      $scope.isFlipped = !$scope.isFlipped;
      if ($scope.isFlipped && 
        actList[actIndex].audioFile &&
        (actList[actIndex].audioFile.indexOf('http://') != -1 || actList[actIndex].audioFile.indexOf('https://') != -1) && 
        $scope.autoVoice) {
        playCachedAudio();
      }
    };
  }]);