const router = express.Router();
const textract = require('textract');
const mime = require('mime');
var bodyParser = require('body-parser')



router.get('/:filename', (req, res) => {
  console.log('opps');
  connection.gridFiles.then((gfs) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }

      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType ==='image/bmp' || file.contentType === 'image/gif' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else if (file.contentType === 'application/octet-stream') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        const type = mime.getType(file.filename);
        var buf = new Buffer.from('buffer');
        readstream.on('data',function(chunk){
          buf = Buffer.concat([buf, chunk]);
        });
        readstream.on('end',function(){
          buf = buf.slice(6);
          console.log('break.................................................................................................');
          textract.fromBufferWithMime(type , buf , { preserveLineBreaks: true } ,function( error, text ) {
            let re = /(.+)((\r?\n.S)*)/g;
            res.json({ article : text.match(re)})
          })
        })

      } else {
        console.log(file.contentType);
      }
      /*{
             res.status(404).json({
               err: 'Not an image'
             });*/

    });
  }).catch((err) => {
    console.log(err);
  });
})
.post('/delete',  (req, res) => {
  console.log(req.body);
  connection.articles.findOne({ title: req.body.title }, (err, data) => {

    connection.gridFiles.then((gfs) => {
      gfs.remove({ filename: data.photo, root: 'article' }, (err, gridStore) => {
        if (err) {
          return res.status(404).json({ err: err });
        }
        console.log('deleted photo');

      });
      gfs.remove({ filename: data.article, root: 'article' }, (err, gridStore) => {
        if (err) {
          return res.status(404).json({ err: err });
        }
        console.log('deleted article');


      });
      console.log(data.title);
      console.log(data.photo);
      console.log(data.article);
    });
  });
  connection.articles.deleteOne({ title: req.body.title }, function (err) {
    if (err) return handleError(err);
  });

  res.redirect(req.get('referer'));
});


module.exports = router;
