const express = require("express");
const upload = require("express-fileupload");
const app = express();
const router = express.Router();
router.use(upload()); //upload files


router
  .get('/', (req, res) => {
    res.render('admin');
  })
  .post('/', (req, res) => {

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://pistil:cVJpGNvyGynM80dG@users-sltb1.mongodb.net/user?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    client.connect(async err => {
      const collection = client.db("user").collection("usernames");
      const credentials =  await collection.findOne({username : req.body.username});
      if (req.body.password == credentials.password) {
        res.render('success');
      } else {
        res.render('error');
      }
      client.close();
    });

  });

module.exports = router;
