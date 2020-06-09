$("#menu").click(function(e) {
  e.preventDefault();
  $("#sidebar").css('left', '0px');

});

$("#content").click(function(e) {
  e.preventDefault();
  console.log("click");
});
