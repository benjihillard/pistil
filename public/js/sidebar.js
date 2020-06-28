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


// tag options
var tags = [];

function addTag() {
  const colors = ['#2274A5', '#F75C03', '#F1C40F', '#D90368', '#00CC66']
  const forbidden = [];
  const color = shuffle(colors)[0]
  const tag = $("#tag").val();
  tags.push(tag);
  if (forbidden.includes(tag)) {
    return;
  }

  html = '<span style="color: ' +
    color + '; border-color: ' + color +
    ';" id="' + tag.replace(/[^a-zA-Z]+/g, '') +
    '"" onclick="remove(this.id)" class="tags fira-sans" > ' +
    tag + ' <span style="color: black;"> x</span> </span>';

  $(html).insertAfter("#tagDisplay");
  $("#tag").val('');
  $('#tags').val(tags)
}

function shuffle(array) {
  var m = array.length,
    t, i;
  while (m > 0) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function remove(id) {
  const r = tags.indexOf(id);
  if(r > -1){
    tags.splice(r, 1);
  }

  $("#" + id).remove();
}


var counter = 0;

function addQuote() {

  $("#file").toggleClass("hidden");
  console.log($("#file").val());
  if ($(".quote1").hasClass('hidden')) {
    $(".quote1 input").val($(".quote input").val());
    $(".quote input").val('');
    $(".quote1").toggleClass("hidden");
  } else if ($(".quote2").hasClass('hidden')) {
    $(".quote2 input").val($(".quote input").val());
    $(".quote input").val("");
    $(".quote2").toggleClass("hidden");
  } else if ($(".quote3").hasClass('hidden')) {
    $(".quote3 input").val($(".quote input").val());
    $(".quote input").val('');
    $(".quote3").toggleClass("hidden");
    $(".quote").toggleClass("hidden");
  }
}

function removeQuote(id) {
  if ($(".quote").hasClass('hidden')) {
    $(".quote").toggleClass("hidden");
  }
  $("." + id).toggleClass("hidden");
  $("." + id + " input").val("");
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#sample1').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

$("#photo").change(function() {
  readURL(this);
  $('#coverText').toggleClass("hidden");
  $('#sample1').toggleClass("hidden");
});

$("#article").change(function() {
  $('#articleText').toggleClass("hidden");
  $('#sample2').toggleClass("hidden");
});
