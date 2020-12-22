
const multer = require('multer');
const methodOverride = require('method-override');
const storage = connection.storage;
const upload = multer({ storage });

const router = express.Router();
router.use(methodOverride('_method'));


router
  .get('/',  (req, res) => {
    res.render('editorial');
  })
  .post('/', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'article', maxCount: 1 }]), (req, res) => {


     //check if tags exist
     let tagsExist = false;
     const tags = req.body.tags.split(",").map(String);
     if (req.body.tags.length != 0){
       tagsExist = true;
     }

     // check if quotes exist
     let quotes = [];
     let quotesExist = true;
     if (req.body.quoteOne !== '') {
       quotes.push(req.body.quoteOne);
     }

     if (req.body.quoteTwo !== '') {
       quotes.push(req.body.quoteTwo);
     }

     if (req.body.quoteThree !== '') {
       quotes.push(req.body.quoteThree);
     }

     if(quotes.length == 0){
       quotesExist = false;
     }

     //create JSON Object
    var json = {
      penName: req.body.penName,
      title: req.body.title,
      handle: req.body.handle,
      tagsExist: tagsExist,
      tags: tags,
      quotesExist: quotesExist,
      quotes : quotes,
      photo: req.files.photo[0].filename,
      article: req.files.article[0].filename,
    };

    console.log(json);
    connection.articles.insertMany(json, function(err, result) {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('article/' + req.body.title )
    }

  });

  })
  .get('/:filename', (req, res) => {

    connection.gridFiles.then((gfs) =>{
      gfs.files.findOne({  filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: 'Not an image'
          });
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  });

module.exports = router;
