
const router = express.Router();

router.get('/', (req, res) => {
  connection.articles.find({}).lean().exec(function(error, data) {
    if (error) {
      res.render('error');
    }
    res.render('home', {catalog: data});
  });
});
module.exports = router;
