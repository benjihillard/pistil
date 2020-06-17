$("#menu").click(function(e) {
  e.preventDefault();
  $("#sidebar").css('left', '0px');

});

$("#exit").click(function(e) {
  e.preventDefault();
  $("#sidebar").css('left', '-100vw');
});
