var wordCell = document.getElementById('wordCell');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(wordCell);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("swiperight", function(ev) {
  angular.element($('#learnView')).scope().reviseWord();
  angular.element($('#learnView')).scope().$apply();
});

mc.on("swipedown", function(ev) {
  angular.element($('#learnView')).scope().skipWord();
  angular.element($('#learnView')).scope().$apply();
});

mc.on("tap", function(ev) {
  angular.element($('#learnView')).scope().turnWord();
  angular.element($('#learnView')).scope().$apply();
});

document.onkeydown = keyPressed;
function keyPressed(e){
	e = e || window.event;

  if (e.keyCode == '32') {
      // space
    angular.element($('#learnView')).scope().turnWord();
  angular.element($('#learnView')).scope().$apply();
  }
	if (e.keyCode == '37') {
        // left arrow

  }
  if (e.keyCode == '38') {
      // up arrow

  }
  else if (e.keyCode == '39') {
      // right arrow
    angular.element($('#learnView')).scope().reviseWord();
    angular.element($('#learnView')).scope().$apply();
  }
  else if (e.keyCode == '40') {
      // down arrow
    angular.element($('#learnView')).scope().skipWord();
    angular.element($('#learnView')).scope().$apply();
  }
}
