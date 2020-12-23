
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
  if(req.body.search == undefined){
    res.redirect('/catalog');
    return
  }
  console.log(req.body.search);
  connection.articles.find({ tags: req.body.search }).lean().exec(function(error, data) {
    if (error) {
      res.render('error');
    }
    console.log("this it");
    res.render('catalog', {catalog: data});
  });
})
module.exports = router;
