const express = require("express");
const router = express.Router();
const textract = require('textract');
const mime = require('mime');


router.get('/:filename', (req, res) => {
  connection.gridFiles.then((gfs) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
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
      } else if (file.contentType === 'application/octet-stream') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        const type = mime.getType(file.filename);
        console.log(type);
        var buf = new Buffer.from('buffer');
        readstream.on('data',function(chunk){
          buf = Buffer.concat([buf, chunk]);
        });
        readstream.on('end',function(){
          buf = buf.slice(6);
          console.log(buf);
          textract.fromBufferWithMime(type , buf , { preserveLineBreaks: true } ,function( error, text ) {
            let re = /(.+)((\r?\n.S)*)/g;
            let arr = text.match(re);
            res.json({ article : arr })
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


module.exports = router;
