
const router = express.Router();
const fetch = require('node-fetch');


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
      const articleLink = data.article;
      fetch('http://localhost:3000/host/' + articleLink)
      .then((res) => res.json())
      .then((article) => res.render('article', {penName, title, handle, tags, quotes, photo, article}));
    });
  });

module.exports = router;
