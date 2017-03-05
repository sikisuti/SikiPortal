learnWordsApp.controller('learnPageController', ['$scope', '$location', '$http', '$mdDialog', function($scope, $location, $http, $mdDialog){
  var actList;
	var actIndex;
	var round = 1;
	var rndSide;
	var modifiedWords = new Array();

	var sounds = [];

  var words;

  $scope.progressBarWidth = "0%";
  $scope.busy = {
    state: true,
    message: "Loading..."
  };
  var setBusy = function(state, message){
    $scope.busy = state;
    $scope.busy.message = state ? message : "";
  }
  $scope.isFlipped = false;
  $scope.playCachedAudio = function(){playCachedAudio();};

  $scope.audioNotExists = function(){
    return $scope.word == undefined || $scope.word.audioFile.indexOf('http://') == -1;
  }

  $http.get('/learnWords/words').then(function(response){
    words = response.data;
    console.log(words);
    actList = getWords();
    fillContent();
    setBusy(false);
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
  		//sendData();
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

  $scope.roundEnded = function(){
    return round > 9;
  };

  $scope.sendData = function(){
    sendData();
  }

  $scope.setKnown = function(callback){
    var confirm = $mdDialog.confirm()
          .title('Your about to set this word known.')
          .textContent('Are you sure?')
          .ariaLabel('Lucky day')
          //.targetEvent(ev)
          .ok('Yes')
          .cancel('No');

    $mdDialog.show(confirm).then(function() {
      var userWordID = actList[actIndex].userWordID;
      setBusy(true, 'Updating word...')
      if (userWordID == null) {
        $http.post('/learnWords/userWord/' + actList[actIndex].wordID).then(function(response){
          words.splice(words.map(function(word){return word.userWordID}).indexOf(userWordID), 1);
          setBusy(false);
          callback(true);
        }, function(err){console.log(err);});
      } else {
        $http.put('/learnWords/userWord/' + userWordID).then(function(response){
          words.splice(words.map(function(word){return word.userWordID}).indexOf(userWordID), 1);
          setBusy(false);
          callback(true);
        }, function(err){console.log(err);});
      }
    }, function() {
      callback(false);
    });

  }

  var sendData = function() {
    var data = JSON.stringify(words);
    var config = {
      headers : {
        'Content-Type': 'application/json'
      }
    }
    //console.log('post: ' + data);
    setBusy(true, 'Updating words...');
    $http.post('/learnWords/words', data, config).then(function(res){
      setBusy(false);
      $location.path('/');
    }, function(err){
      setBusy(false);
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
    var pastRounds = round - 1;
    var multiplyer = 1;
    if (pastRounds > 5) { multiplyer = 2; }
    if (pastRounds > 6) { pastRounds += pastRounds - 6 }
    var pastSteps = (pastRounds * words.length) + ((multiplyer * words.length) - actList.length + 1);
		var percent = (pastSteps / (12 * words.length)) * 100;
    $scope.progressBarWidth = percent.toFixed(1) + "%";
	}

  $scope.reviseWord = function() {
    actIndex = (actIndex + 1) % actList.length;
    fillContent();
  };

  $scope.skipWord = function() {
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
