
const router = express.Router();

router.get('/', (req, res) => {
  connection.gridFiles.then((art) => {
    art.find({}).lean().exec(function(error, data) {
      if (error) {
        res.render('error');
      }
      res.render('home', {catalog: data});
    });
  }).catch((err) => {
    console.log(err);
  });
});
module.exports = router;
