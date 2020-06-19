// dependencies
const express = require("express");
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const upload = require("express-fileupload");
const nodemailer = require('nodemailer');
const port = process.env.port || 3000;

// setting handle bars as backend framework
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// middleware
app.use(upload()); //upload files
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// handle user submissions
app.post('/submissions', (req, res) => {

  // error types in filling out the form
  let success = true;
  let penNameError = false;
  let handleError = false;
  let emailError = false;
  let titleError = false;
  let pitchError = false;
  let articleError = false;
  let photoError = false;

  // handle user not uploading photo and article
  if (!req.files || Object.keys(req.files).length !== 2) {
    return res.status(400).send('Not enough files were uploaded.');
  }

  // handle if photo is not a photo type
  const validPhotoExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
  const photoType = req.files.photo.name.substring(req.files.photo.name.lastIndexOf('.')+1, req.files.photo.name.length) || req.files.photo.name;
  console.log(photoType);
  if(!validPhotoExtensions.includes(photoType.toLowerCase())){
    success = false
    photoError = true;
  }
  const photo = req.files.photo.data

  // handle if article isnt doc type
  const validArticleExtensions = ["doc", "docx", "odt", "pdf", "rtf", "tex", "txt", "wpd"];
  const articleType = req.files.article.name.substring(req.files.article.name.lastIndexOf('.')+1, req.files.article.name.length) || req.files.article.name;
  if(!validArticleExtensions.includes(articleType.toLowerCase())){
    success = false
    articleError = true;
  }
  const article = req.files.article.data

  //handle if penName is blank
  if(req.body.penName == ""){
    success = false
    penNameError = true;
  }else {
    const penName = req.body.penName;
  }

  //handle if penName is blank
  if(req.body.handle == ""){
    success = false
    handleError = true;
  }else {
    const penName = req.body.handle;
  }

  //handle if email is vaild
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) || req.body.email == ""){
    success = false
    emailError = true;
  }else {
    const penName = req.body.email;
  }

  //handle if title is blank
  if(req.body.title == ""){
    success = false
    titleError = true;
  }else {
    const penName = req.body.title;
  }

  // handle if pitch is blank
  if(req.body.pitch == ""){
    success = false
    pitchError = true;
  }else {
    const penName = req.body.pitch;
  }


  //set up email to send from
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'magazinepistil@gmail.com',
      pass: 'Pa$$word'
    }
  });

  //email html


  // compose email
  const mailOptions = {
    from: 'magazinepistil@gmail.com',
    to: 'pistilmag@gmail.com',
    subject: 'New Pitch',
    text: 'this is for you',
    html: '<img style="width: 100px; height: 100px;" id="1" src="cid:coverphoto">',
    attachments: [
    {   // utf-8 string as an attachment
        filename: 'article.' + articleType,
        content: new Buffer(article,'utf-8')
    },
    {   // binary buffer as an attachment
        filename: 'Cover Photo.' + photoType,
        cid: 'coverphoto',
        content: new Buffer(photo,'utf-8')
    },
    {   // binary buffer as an attachment
        filename: 'Cover Photo.' + photoType,
        content: new Buffer(photo,'utf-8')
    }]
  };

  // send email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  //redirect
  if(success){
    res.redirect('/congratulations')
  }else {
    res.render('submissions', {penNameError, handleError, emailError, titleError, pitchError, articleError, photoError});
  }

});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/submissions', (req, res) => {
  res.render('submissions');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/catalog', (req, res) => {
  res.render('catalog');
});

app.get('/congratulations', (req, res) => {
  res.render('congratulations');
});

app.listen(port, () => console.log(`Running at Port ${port}`));
