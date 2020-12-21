
const router = express.Router();

router.get('/', (req, res) => {
<<<<<<< HEAD
  connection.gridFiles.then((art) => {
    art.find({}).lean().exec(function(error, data) {
      if (error) {
        res.render('error');
      }
      res.render('home', {catalog: data});
    });
  }).catch((err) => {
    console.log(err);
=======
  connection.articles.find({}).lean().exec(function(error, data) {

     res.render('home', {catalog: data});
>>>>>>> parent of 1c78175... demo1
  });
});
module.exports = router;
