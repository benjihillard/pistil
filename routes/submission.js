
const upload = require("express-fileupload");
const nodemailer = require('nodemailer');
const app = express();
const router = express.Router();
router.use(upload()); //upload files

router
.get('/', (req, res) => {
  res.render('submissions');
})
.post('/', (req, res) => {

  // error types in filling out the form
  let success = true;
  let penNameError = false;
  let handleError = false;
  let emailError = false;
  let titleError = false;
  let pitchError = false;
  let articleError = false;
  let photoError = false;
  let consentError = false;

  console.log(req.body);
  // handle user not uploading photo and article
  if (!req.files || Object.keys(req.files).length !==  2 ) {
    console.log('yes');
    return res.status(400).send('Not enough files were uploaded.');
  }

  // handle if photo is not a photo type
 const validPhotoExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
 const photoType = req.files.photo.name.substring(req.files.photo.name.lastIndexOf('.') + 1, req.files.photo.name.length) || req.files.photo.name;
 if (!validPhotoExtensions.includes(photoType.toLowerCase())) {
   success = false
   photoError = true;
 }
 const photo = req.files.photo.data;

 // handle if article isnt doc type
const validArticleExtensions = ["doc", "docx", "odt", "pdf", "rtf", "tex", "txt", "wpd"];
const articleType = req.files.article.name.substring(req.files.article.name.lastIndexOf('.') + 1, req.files.article.name.length) || req.files.article.name;
if (!validArticleExtensions.includes(articleType.toLowerCase())) {
  success = false
  articleError = true;
}
const article = req.files.article.data

//handle if penName is blank
if (req.body.penName == "") {
  success = false
  penNameError = true;
}
const penName = req.body.penName;

//handle if penName is blank
if (req.body.handle == "") {
  success = false
  handleError = true;
}
const handle = req.body.handle;

//handle if email is vaild
if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) || req.body.email == "") {
  success = false
  emailError = true;
}
const email = req.body.email;

//handle if title is blank
if (req.body.title == "") {
  success = false
  titleError = true;
}
const title = req.body.title;

// handle if pitch is blank
if (req.body.pitch == "") {
  success = false
  pitchError = true;
}
const pitch = req.body.pitch;

// handle if agreed to Terms
if (req.body.consent == undefined){
  success = false
  consentError = true;
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
   text: '',
   html: `<div style="display: flex; flex-wrap: nowrap; background-color: #FB4B4E;">
     <div style="display: grid; grid-template-columns: repeat(1, 1fr);">
       <img style="height: 200px; width: 400px; display: block; margin: 60px auto 0px auto ;" id="1" src="cid:coverphoto" alt="cover photo">
       <div style="display: inline; margin: 30px 25% 30px 25%; border-top: 2.5px solid black; border-bottom: 2.5px solid black;">
         <h1 style="display: inline;  font-family: 'Arial Black', Gadget, sans-serif; font-style: italic; text-align: center; " >` + title + `</h1>
       </div>
       <div style="display: inline; margin: 5px 25% 0px 25%; padding: 10px; background-color: #F5F5F5; border-radius: 10px;">
         <p style="font-family: 'Courier New', Courier, monospace;">` + pitch + `</p>
       </div>
       <div style="display: inline; margin-left: 60%;">
         <h3 style="font-family: 'Arial Black', Gadget, sans-serif; font-style: italic;">- ` + penName + `</h3>
       </div>
       <div style="display: inline; margin: 0px 25% 40px 25%;">
         <h4 style="margin: 2px; font-family: 'Arial Black', Gadget, sans-serif; font-style: italic;">Instagram</h4>
         <h4 style="margin: 2px 0px 0px 20px; font-family: 'Courier New', Courier, monospace;">` + handle + `</h5>
         <h4 style="margin: 2px; font-family: 'Arial Black', Gadget, sans-serif; font-style: italic;">Email</h4>
         <h4 style="margin: 2px 0px 0px 20px; font-family: 'Courier New', Courier, monospace; ">` + email + `</h5>
       </div>
     </div>
   </div>`,
   attachments: [{ // utf-8 string as an attachment
       filename: 'article.' + articleType,
       content: new Buffer(article, 'utf-8')
     },
     { // binary buffer as an attachment
       filename: 'Cover Photo.' + photoType,
       cid: 'coverphoto',
       content: new Buffer(photo, 'utf-8')
     },
     { // binary buffer as an attachment
       filename: 'Cover Photo.' + photoType,
       content: new Buffer(photo, 'utf-8')
     }
   ]
 };



 //redirect
 if (success) {
   // send email
   transporter.sendMail(mailOptions, function(error, info) {
     if (error) {
        res.render('/error')
      }
   });
   res.redirect('/success')
 } else {
   res.render('submissions', {
     penNameError,
     handleError,
     emailError,
     titleError,
     pitchError,
     articleError,
     photoError,
     consentError
   });
 }


});

module.exports = router;
