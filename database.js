onst path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

class DB {

  this.uri = "mongodb+srv://pistil:cVJpGNvyGynM80dG@users-sltb1.mongodb.net/catalog?retryWrites=true&w=majority";
  this.connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { DB }
