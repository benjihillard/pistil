const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.render('error');
  })
  .get('/:title', async (req, res) => {
    connection.articles.findOne({ title: req.params.title }, (err, data) => {
      const penName = data.penName;
      const title = data.title;
      const handle = data.handle;
      const tags = data.tags;
      const quotes = data.quotes;
      const photo = data.photo;
      const article = data.article;
      res.render('article', {penName, title, handle, tags, quotes, photo, article});
    });
  });

module.exports = router;
