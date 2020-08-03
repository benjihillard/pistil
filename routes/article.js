
const router = express.Router();
const fetch = require('node-fetch');


router.get('/', (req, res) => {
    res.render('error');
  })
  .get('/:title', async (req, res) => {
    console.log('get data');
    connection.articles.findOne({ title: req.params.title }, (err, data) => {
      if (err) {
        console.log(err);
      }
      const penName = data.penName;
      const title = data.title;
      const handle = data.handle;
      const tags = data.tags;
      const quotes = data.quotes;
      const photo = data.photo;
      const articleLink = data.article;
      console.log('got host');
      fetch('http://localhost:3000/host/' + articleLink)
      .then((res) => res.json())
      .then((article) => {
        connection.articles.find({}).lean().exec(function(error, data) {
          if (error) {
            console.log(error);
          }
           res.render('article', {penName, title, handle, tags, quotes, photo, article,data})
        });
        });
    });
  });

module.exports = router;
