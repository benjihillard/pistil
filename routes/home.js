
const router = express.Router();

router.get('/', (req, res) => {
  connection.articles.find({}).lean().exec(function(error, data) {
    console.log(data);
     res.render('home', {catalog: data});
  });
});
module.exports = router;
