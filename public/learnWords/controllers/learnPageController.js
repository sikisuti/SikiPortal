learnWordsApp.controller('learnPageController', ['$scope', '$location', '$http', function($scope, $location, $http){
  var actList;
	var actIndex;
	var round = 1;
	var rndSide;
	var modifiedWords = new Array();
	var cnt = 0;

	var sounds = [];

  var words;

  $scope.progressBarWidth = "0%";
  $scope.isFlipped = false;
  $scope.playCachedAudio = function(){playCachedAudio();};

  $http.get('/learnWords/words').then(function(response){
    words = response.data;
    console.log(words);
    actList = getWords();
    fillContent();
  }, function(response){
    console.log(response);
  });

  function fillContent(){
    $scope.word = actList[actIndex];
    $scope.isFlipped = rndSide[actIndex] == 1;
    //if ($scope.isFlipped && actList[actIndex].hasAudio == 'yes') {playCachedAudio();}
  }

  function playCachedAudio(){
    //var filename = "learnWords/audio/" + actList[actIndex].foreignWord.replace(" ", "_") + ".mp3";
    var indexOfActSound = indexOfSound(actList[actIndex].audioFile);
    if (indexOfActSound < 0){
      sounds[sounds.length] = new Howl({ src: [actList[actIndex].audioFile] });
      sounds[sounds.length - 1].play();
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

  function getWords(){
  	var tempList = new Array();
  	rndSide = new Array();
  	for (var i = 0; i < words.length; i++){
  		tempList[i] = words[i];
  	}
  	tempList = shuffle(tempList);
  	actIndex = 0;
  	if (round == 10){
  		sendData();
      }
  	if (round < 4){
  		for (var i = 0; i < words.length; i++){
      		rndSide[i] = 0;
      	}
      }
  	else if (round < 7){
  		for (var i = 0; i < words.length; i++){
      		rndSide[i] = 1;
      	}
      }
  	else {
  		for (var i = 0; i < words.length; i++){
      		tempList[i + words.length] = tempList[i];
      	}
      	rndSide = new Array();
  		for (var i = 0; i < words.length; i++){
      		rndSide[i] = Math.round(Math.random());
      	}
  		for (var i = 0; i < words.length; i++){
      		rndSide[i + words.length] = Math.abs(rndSide[i] - 1);
      	}
      }
  	return tempList;
  }

  $scope.sendData = function(){
    sendData();
  }

  var sendData = function() {
    var data = JSON.stringify(words);
    var config = {
      headers : {
        'Content-Type': 'application/json'
      }
    }
    console.log('post: ' + data);
    $http.post('/learnWords/words', data, config).then(function(res){
      $location.path('/');
    }, function(err){
      console.log(err);
    });
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

	var updateProgressBar = function(){
		var percent = (cnt / (12 * words.length)) * 100;
    $scope.progressBarWidth = percent.toFixed(1) + "%";
	}

  $scope.reviseWord = function() {
    actIndex = (actIndex + 1) % actList.length;
    fillContent();
  };

  $scope.skipWord = function() {
    cnt = cnt + 1;
		updateProgressBar();
		actList.splice(actIndex, 1);
		rndSide.splice(actIndex, 1);
    if (actList.length == 0){
			round = round + 1;
			actList = getWords();
    }
    else{
      actIndex = actIndex % actList.length;
    }
    fillContent();
  };

  $scope.flipCard = function() {
    $scope.isFlipped = !$scope.isFlipped;
    //if ($scope.isFlipped && actList[actIndex].hasAudio == 'yes') {playCachedAudio();}
  };
}]);