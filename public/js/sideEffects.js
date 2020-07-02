//=============================================Side Bar=======================================================================
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

//===============================================Tags ============================================================================
// keep track of tags
var tags = [];


//add tag
function addTag() {
  const colors = ['#2274A5', '#F75C03', '#F1C40F', '#D90368', '#00CC66'];
  const forbidden = [];
  const tag = $("#tag").val();
  const color = colors[hash(tag)];
  tags.push(tag);
  if (forbidden.includes(tag)) {
    return;
  }

  html = '<span style="color: ' +
    color + '; border-color: ' + color +
    ';" id="' + tag.replace(/[^a-zA-Z]+/g, '') +
    '"" onclick="removeTag(this.id)" class="tags fira-sans" > ' +
    tag + ' <span style="color: black;"> x</span> </span>';

  $(html).insertAfter("#tagDisplay");
  $("#tag").val('');
  console.log(tags);
  $('#tags').val(tags)
}

function hash(tag) {
  let hash = 0;
  for(let i = 0; i < tag.length; i++){
    hash = hash + tag.charCodeAt(i)%5;
  }
  return hash%5;
}

// remove tags
function removeTag(id) {
  const r = tags.indexOf(id);
  if(r > -1){
    tags.splice(r, 1);
  }

  $("#" + id).remove();
}



//========================================== Quotes ====================================================================
// add quote
function addQuote() {

  $("#file").toggleClass("hidden");
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
// remove qoute
function removeQuote(id) {
  if ($(".quote").hasClass('hidden')) {
    $(".quote").toggleClass("hidden");
  }
  $("." + id).toggleClass("hidden");
  $("." + id + " input").val("");
}

//======================================= Upload file buttons ==============================================================
// swap button text with uploaded photo
$("#photo").change(function() {
  readURL(this);
  if (this.files.length > 0) {
        $('#coverText').addClass("hidden");
        $('#sample1').removeClass("hidden");
        console.log(this.files);
    }else {
      $('#coverText').removeClass("hidden");
      $('#sample1').addClass("hidden");
    }
});

// swap button text with uploaded document
$("#article").change(function() {
  if (this.files.length > 0) {
        $('#articleText').addClass("hidden");
        $('#sample2').removeClass("hidden");
        $('#sample2-2').removeClass("hidden");
        $('#sample2-2').text(this.files[0].name);
    }else {
      $('#articleText').removeClass("hidden");
      $('#sample2').addClass("hidden");
    }
});

// exstact photo
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#sample1').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}


//========================================= handle form ==========================================

$('#form').submit(function(){
    var success = true;
    const validPhotoExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
    const validArticleExtensions = ["doc", "docx", "odt", "pdf", "rtf", "tex", "txt", "wpd"];
    //photo
    if ( !$('#photo').val() || !validPhotoExtensions.includes(/[^.]+$/.exec($('#photo').val())[0])) {
      $('#photoWarning').removeClass('hidden');
      success = false;
    }else {
      $('#photoWarning').addClass('hidden');
    }
    //document
    console.log($('#article').val());
    if (!$('#article').val() ||  !validArticleExtensions.includes(/[^.]+$/.exec($('#article').val())[0])) {
      $('#articleWarning').removeClass('hidden');
      success = false;
    }else {
      $('#articleWarning').addClass('hidden');
    }
    //title
    if ($('#title').val() == '') {
      $('#titleWarning').removeClass('hidden');
      success = false;
    }else {
      $('#titleWarning').addClass('hidden');
    }
    //penName
    if ($('#penName').val() == '') {
      $('#penNameWarning').removeClass('hidden');
      success = false;
    }else {
      $('#penNameWarning').addClass('hidden');
    }
    //handle
    if ($('#handle').val() == '') {
      $('#handleWarning').removeClass('hidden');
      success = false;
    }else {
      $('#handleWarning').addClass('hidden');
    }
    return false;
});
