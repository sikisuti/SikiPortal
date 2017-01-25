learnWordsApp.controller('learnPageController', ['$scope', '$location', '$http', function($scope, $location, $http){
  var actList;
	var actIndex;
	var round = 1;
	var rndSide;
	var modifiedWords = new Array();
	var cnt = 0;

	//var sounds = [];

  var words;

  $scope.progressBarWidth = "0%";
  $scope.frontWord = "front";
  $scope.backWord = "back";
  $scope.isFlipped = false;

  $http.get('/learnWords/words').then(function(response){
    words = response.data;
    actList = getWords();
    fillContent();
  }, function(response){
    console.log(response);
  });

  function fillContent(){
  	//var audioButton = document.getElementById("audioButton");

      if (rndSide[actIndex] == 0){
          $scope.frontWord = actList[actIndex].native;
          $scope.backWord = actList[actIndex].foreignWord;
      }
      else {
          $scope.frontWord = actList[actIndex].foreignWord;
          $scope.backWord = actList[actIndex].native;
      }
      /*
      if (actList[actIndex].hasAudio == "yes"){
      	$( "#audioButton" ).show();
      } else {
      	$( "#audioButton" ).hide();
      }*/
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

  var sendData = function() {
    // TODO: Implement
    console.log("TODO: implement sendData()");
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
    /*
		if ($scope.word.trim() == actList[actIndex].native.trim()){
			$scope.word = actList[actIndex].foreignWord;
		}
		else{
			$scope.word = actList[actIndex].native;
		}
    */
  };
}]);
