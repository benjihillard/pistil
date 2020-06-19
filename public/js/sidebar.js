// open sidebar menu
$("#menu").click(function(e) {
  e.preventDefault();
  $("#sidebar").css('left', '0px');

});

// close sidebar menu
$("#exit").click(function(e) {
  e.preventDefault();
  $("#sidebar").css('left', '-100vw');
});
