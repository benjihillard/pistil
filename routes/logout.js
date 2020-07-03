const router = express.Router();

router.get('/', (req, res) => {
  req.session.loggedIn = false;
  res.render('logout')
});

module.exports = router;
