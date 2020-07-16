module.exports.includes = function(para, quotes) {
  if (quotes.length == 0) {
    return
  }
  for (var i = 0; i < quotes.length; i++) {
    if (para.includes(quotes[i])) {
      console.log(i);
      console.log(quotes.length);
      console.log('success');
      return `<div class="row"> s
        <div class="col ">
          <div class="m-2">
            <p class=" fira-sans text-center quotes">` + quotes[i] + `</p>
          </div>
        </div>
      </div>`
    }

  }

}
