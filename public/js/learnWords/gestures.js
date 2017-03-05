var card = document.getElementById('card');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(card);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("swiperight", function(ev) {
  reviseWord();
});

mc.on("swipedown", function(ev) {
  skipWord();
});

mc.on("swipeup", function(ev){
  setKnown();
});

mc.on("tap", function(ev) {
  angular.element($('#learnView')).scope().flipCard();
  angular.element($('#learnView')).scope().$apply();
});

document.onkeydown = keyPressed;
function keyPressed(e){
	e = e || window.event;

  if (e.keyCode == '32') {
      // space
    angular.element($('#learnView')).scope().flipCard();
    angular.element($('#learnView')).scope().$apply();
  }
	if (e.keyCode == '37') {
        // left arrow

  }
  if (e.keyCode == '38') {
      // up arrow
    setKnown();
  }
  else if (e.keyCode == '39') {
      // right arrow
    reviseWord();
  }
  else if (e.keyCode == '40') {
      // down arrow
    skipWord();
  }
};

var reviseWord = function(){
  $('#card').animate({right: '-300px'}, {duration: 100, complete: function(){
    angular.element($('#learnView')).scope().reviseWord();
    angular.element($('#learnView')).scope().$apply();
  }});
  $('#card').animate({visibility: 'hidden'}, 1).animate({right: '300px'}, 1).animate({visibility: 'visible'}, 1)
  .animate({right: '0px'}, 100);
};

var skipWord = function(){
  $('#card').animate({top: '300px'}, {duration: 100, complete: function(){
    angular.element($('#learnView')).scope().skipWord();
    angular.element($('#learnView')).scope().$apply();
  }});
  $('#card').animate({visibility: 'hidden'}, 1).animate({right: '300px', top: '0px'}, 1).animate({visibility: 'visible'}, 1)
  .animate({right: '0px'}, 100);
};

var setKnown = function(){
  angular.element($('#learnView')).scope().setKnown(function(isApproved){
    if (isApproved) {
      //angular.element($('#learnView')).scope().$apply();
      $('#card').animate({top: '-300px'}, {duration: 100, complete: function(){
        angular.element($('#learnView')).scope().skipWord();
        angular.element($('#learnView')).scope().$apply();
        $('#card').animate({visibility: 'hidden'}, 1).animate({right: '300px', top: '0px'}, 1)
        .animate({visibility: 'visible'}, 1).animate({right: '0px'}, 100);
      }});

    }
  });

};
