const bodyParser = require('body-parser');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({
  extended: false
}));


router
  .get('/', (req, res) => {
    res.render('admin');
  })
  .post('/', (req, res) => {
    console.log(req.body);
    let failedLogin = true;
    connection.usernames.findOne({ username: req.body.username }, function(err, data) {
      console.log(data);
      if (req.body.password == data.password) {
        req.session.loggedIn = true;
        res.redirect('/');

      } else {
        res.render('admin', { failedLogin });
      }
    });

  });

module.exports = router;
