//dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

//========================= Schemas ===========================================

//article object
const article = {
  tags: Array,
  quotes : Array,
  penName: String,
  title: String,
  handle: String,
  tagsExist: Boolean,
  quotesExist: Boolean,
  quotes : Array,
  photo: String,
  article: String,
};

//account object
const accounts = {
  username: String,
  password: String,
};
//=============================================================================

//connect
const catalog = "mongodb+srv://pistil:cVJpGNvyGynM80dG@users-sltb1.mongodb.net/catalog?retryWrites=true&w=majority";
mongoose.connect(catalog, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// access to usernames
const usernames = mongoose.model('Usernames', new Schema(accounts), 'usernames');
// access to articles
const articles = mongoose.model('Article', new Schema(article), 'article');


// promise access to files
const gridFiles = new Promise((resolve, reject) => {

  const conn = mongoose.createConnection(catalog,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let gfs;

  conn.once('open', () => {
      // Init stream
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('article');
      if(gfs != null){
        resolve(gfs)
      }else {
        reject('Unable to connect')
      }
    });

});

// storage object for grid files
const storage = new GridFsStorage({
  url: catalog,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'article'
        };
        resolve(fileInfo);
      });
    });
  }
});

module.exports.usernames = usernames;
module.exports.articles = articles;
module.exports.gridFiles = gridFiles;
module.exports.storage = storage;
