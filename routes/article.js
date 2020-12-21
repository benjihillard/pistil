
const router = express.Router();
const fetch = require('node-fetch');


router.get('/', (req, res) => {
    res.render('error');
  })
  .get('/:title',  (req, res) => {
    console.log('get data..................................................');
    connection.articles.findOne({ title: req.params.title }, (err, data) => {
<<<<<<< HEAD
      if (data == null){
        console.log('I told you............................................');
      }
      if (err) {
        console.log(err);
      }
=======
>>>>>>> parent of 1c78175... demo1
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
<<<<<<< HEAD
      .then((article) => {
        connection.articles.find({}).lean().exec(function(error, data) {
          if (error) {
            console.log(error);
          }
           res.render('article', {penName, title, handle, tags, quotes, photo, article,data})
        });
        });
=======
      .then((article) => res.render('article', {penName, title, handle, tags, quotes, photo, article}));
>>>>>>> parent of 1c78175... demo1
    });
  });

module.exports = router;