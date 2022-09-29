learnWordsApp.controller('learnPageController', ['$scope', '$location', '$http', '$mdDialog', function ($scope, $location, $http, $mdDialog) {
  var actList;
  var actIndex;
  var round = 1;
  var rndSide;

  var sounds = [];

  var words;
  var knownWords;
  var knownWordsForUpdate = [];

  $scope.progressBarWidth = "0%";
  $scope.autoVoice = false;
  $scope.busy = {
    state: true,
    message: "Loading..."
  };
  var setBusy = function (state, message) {
    $scope.busy.state = state;
    $scope.busy.message = state ? message : "";
  }
  $scope.isFlipped = false;
  $scope.playCachedAudio = function () { playCachedAudio(); };

  $scope.audioNotExists = function () {
    return !$scope.word ||
      !$scope.word.audioFile ||
      ($scope.word.audioFile.indexOf('http://') == -1 && $scope.word.audioFile.indexOf('https://') == -1);
  }

  setBusy(true, "Loading words to learn...")
  $http.get('/learnWords/words').then(function (response) {
    words = response.data;
    setBusy(true, "Loading known words...")
    $http.get('/learnWords/words/known').then(function (knownResponse) {
      knownWords = knownResponse.data;
      getWords(function (tempList) {
        actList = tempList;
        fillContent();
        setBusy(false);
      });
    });
  }, function (response) {
    console.log(response);
  });

  function fillContent() {
    $scope.word = actList[actIndex];
    $scope.isFlipped = rndSide[actIndex] == 1;
    if ($scope.isFlipped &&
      (actList[actIndex].audioFile.indexOf('http://') != -1 || actList[actIndex].audioFile.indexOf('https://') != -1) &&
      $scope.autoVoice) { playCachedAudio(); }
  }

  function playCachedAudio() {
    var indexOfActSound = indexOfSound(actList[actIndex].audioFile);
    if (indexOfActSound < 0) {
      sounds[sounds.length] = new Howl({ src: [actList[actIndex].audioFile], autoplay: true });
    } else {
      sounds[indexOfActSound].play();
    }
  }

  function indexOfSound(filename) {
    var rtn = -1;
    for (i = 0; i < sounds.length; i++) {
      if (sounds[i]._src == filename) {
        rtn = i;
      }
    }
    return rtn;
  }

  function getWords(callback) {
    if (round == 10) {
      sendData();
    }

    var tempList = new Array();
    rndSide = new Array();
    for (var i = 0; i < words.length; i++) {
      tempList[i] = words[i];
    }

    tempList = shuffle(tempList);
    actIndex = 0;

    if (knownWords && knownWords.length > 0) {
      tempList[tempList.length] = knownWords.pop();
    }

    if (round < 4) {
      for (var i = 0; i < tempList.length; i++) {
        rndSide[i] = 0;
      }
    } else if (round < 7) {
      for (var i = 0; i < tempList.length; i++) {
        rndSide[i] = 1;
      }
    } else {      
      var wordCount = tempList.length;
      for (var i = 0; i < words.length; i++) {
        tempList.push(tempList[i]);
      }

      if (knownWords && knownWords.length > 0) {
        tempList[tempList.length] = knownWords.pop();
      }

      rndSide = new Array();
      for (var i = 0; i < wordCount; i++) {
        rndSide[i] = Math.round(Math.random());
      }
      
      for (var i = 0; i < wordCount; i++) {
        rndSide[i + wordCount] = Math.abs(rndSide[i] - 1);
      }
    }

    callback(tempList);
  }

  $scope.roundEnded = function () {
    return round > 9;
  };

  $scope.sendData = function () {
    sendData();
  }

  $scope.setKnown = function (callback) {
    var actWord = actList[actIndex];
    if (actWord.state > 5) {
      callback();
      return;
    }

    var confirm = $mdDialog.confirm()
      .title('Your about to set this word known.')
      .textContent('Are you sure?')
      .ariaLabel('Lucky day')
      //.targetEvent(ev)
      .ok('Yes')
      .cancel('No');

    $mdDialog.show(confirm).then(function () {
      var userWordID = actWord.userWordID;
      setBusy(true, 'Updating word...');
      if (userWordID == null) {
        $http.post('/learnWords/userWords/' + actWord.wordID).then(function (response) {
          words.splice(words.map(function (word) { return word.userWordID }).indexOf(userWordID), 1);
          setBusy(false);
          if (words.length == 0) {
            sendData();
          }

          callback(true);
        }, function (err) { console.log(err); });
      } else {
        $http.put('/learnWords/userWords/' + userWordID).then(function (response) {
          words.splice(words.map(function (word) { return word.userWordID }).indexOf(userWordID), 1);
          setBusy(false);
          if (words.length == 0) {
            sendData();
          }

          callback(true);
        }, function (err) { console.log(err); });
      }
    }, function () {
      callback(false);
    });
  }

  var sendData = function () {
    var data = JSON.stringify(words.concat(knownWordsForUpdate));
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    setBusy(true, 'Updating words...');
    $http.post('/learnWords/userWords', data, config).then(function (res) {
      setBusy(false);
      $location.path('/');
    }, function (err) {
      setBusy(false);
      console.log(err);
    });
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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

  var updateProgressBar = function () {
    var wordCount = (knownWords && knownWords.length > 0) ? words.length + 1 : words.length;
    var pastRounds = round - 1;
    var multiplyer = 1;
    if (pastRounds > 5) { multiplyer = 2; }
    if (pastRounds > 6) { pastRounds += pastRounds - 6 }
    var pastSteps = (pastRounds * wordCount) + ((multiplyer * wordCount) - actList.length + 1);
    var percent = (pastSteps / (12 * wordCount)) * 100;
    $scope.progressBarWidth = percent.toFixed(1) + "%";
  }

  $scope.reviseWord = function () {
    var actWord = actList[actIndex];
    if (actWord.state > 5) {
      knownWordsForUpdate.push(actWord);
    }

    actIndex = (actIndex + 1) % actList.length;
    fillContent();
  };

  $scope.skipWord = function () {
    var actWord = actList[actIndex];
    if (actWord.state > 5) {
      knownWordsForUpdate.push(actWord);
    }

    updateProgressBar();
    actList.splice(actIndex, 1);
    rndSide.splice(actIndex, 1);
    if (actList.length == 0) {
      round = round + 1;
      $scope.word = undefined;
      getWords(function (tempList) {
        actList = tempList;
        fillContent();
      });
    }
    else {
      actIndex = actIndex % actList.length;
      fillContent();
    }
  };

  $scope.flipCard = function () {
    $scope.isFlipped = !$scope.isFlipped;
    if ($scope.isFlipped &&
      actList[actIndex].audioFile &&
      (actList[actIndex].audioFile.indexOf('http://') != -1 || actList[actIndex].audioFile.indexOf('https://') != -1) &&
      $scope.autoVoice) {
      playCachedAudio();
    }
  };
}]);
