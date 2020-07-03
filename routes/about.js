const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.session.loggedIn);
  res.render('about');
});

module.exports = router;
