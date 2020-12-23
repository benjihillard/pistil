
const router = express.Router();

router.get('/', (req, res) => {
  connection.articles.find({}).lean().exec(function(error, data) {
    if (error) {
      res.render('error');
    }
     res.render('catalog', {catalog: data});
  });
})
.post('/:search', (req, res) => {
  if(req.params.search == undefined){
    res.redirect('/catalog');
    return
  }
  console.log(req.params.search);
  connection.articles.find({ tags: req.params.search }).lean().exec(function(error, data) {
    if (error) {
      res.render('error');
    }
    console.log("this it");
    res.render('catalog', {catalog: data});
  });
})
module.exports = router;
