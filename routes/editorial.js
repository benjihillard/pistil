const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const router = express.Router();
router.use(bodyParser.json());
router.use(methodOverride('_method'));

const uri = "mongodb+srv://pistil:cVJpGNvyGynM80dG@users-sltb1.mongodb.net/catalog?retryWrites=true&w=majority";
const conn = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('articles');
});
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'articles'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({
  storage
});

router
  .get('/',  (req, res) => {
    res.render('editorial');
  })
  .post('/', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'article', maxCount: 1 }]), (req, res) => {
     console.log(req.body);
     console.log(req.files.photo[0].filename);
     console.log(req.files.article[0].filename);

     //check if tags exist
     let tagsExist = true;
     if (req.body.tags.length == 0){
       tagsExist = false;
     }

     // check how many quotes are used
     let quoteOneExist = true;
     if (req.body.quoteOne == '') {
       quoteOneExist = false
     }

     let quoteTwoExist = true;
     if (req.body.quoteTwo == '') {
       quoteTwoExist = false
     }

     let quoteThreeExist = true;
     if (req.body.quoteThree == '') {
       quoteThreeExist = false
     }

     //create JSON Object
    const json = {
      'penName' : req.body.penName,
      'title' : req.body.title,
      'handle' : req.body.handle,
      'tagsExist' : tagsExist,
      'tags' : req.body.tags,
      'quoteOne' :  {
        'exist' : quoteOneExist,
        'text' : req.body.quoteOne
      },
      'quoteTwo' :  {
        'exist' : quoteTwoExist,
        'text' : req.body.quoteTwo
      },
      'quoteThree' :  {
        'exist' : quoteThreeExist,
        'text' : req.body.quoteThree
      },
      'photo' : req.files.photo[0].filename,
      'article' : req.files.article[0].filename
    };

    console.log(json);
    conn.collection('articles').insert(json);
    res.end()

  })
  .get('/:filename', (req, res) => {
    gfs.files.findOne({
      filename: req.params.filename
    }, (err, file) => {
      // Check if file
      console.log(file);
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
  });

module.exports = router;
