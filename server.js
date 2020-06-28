// Dependencies
const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');

// set app an listening port
const app = express();
const port = process.env.port || 3000;

// middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  loggedIn: true,
}));

// setting handle bars as backend framework
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
      login: true,
    }
}));

app.set('view engine', 'handlebars');


// handle About Page
const about = require('./routes/about.js');
app.use('/about', about);

// handle home page
const home = require('./routes/home.js');
app.use('/', home);

// handle user submissions
const submission = require('./routes/submission.js');
app.use('/submissions', submission );

// handle Catalog Page
const catalog = require('./routes/catalog.js');
app.use('/catalog', catalog);

// handle Admin Page
const editorial = require('./routes/editorial.js');
app.use('/editorial', editorial);

// handle Admin Page
const admin = require('./routes/admin.js');
app.use('/admin', admin);

// handle Success Page
const success = require('./routes/Success.js');
app.use('/success', success);

// handle Error Page
const error = require('./routes/error.js');
app.use('/error', error);

// listen
app.listen(port, () => console.log(`Running at Port ${port}`));
