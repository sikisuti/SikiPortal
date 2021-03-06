var slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  slideIndex = n % slidemap.length;
  let slideContent = slidemap[slideIndex];
  $('#title').html(slideContent.title);
  let folder = slideContent.folder
  $('#description').load('slide/' + folder + '/description.html');
  var img = $('<img>');
  img.css('width', '100%');
  img.attr('src', slideContent.pics[0]);
  $('#pictures').append(img);
}