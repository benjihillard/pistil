const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

app.use('/',express.static(__dirname + '/home'));
app.use('/about',express.static(__dirname + '/about'));
app.use('/catalog',express.static(__dirname + '/catalog'));
app.use('/submissions',express.static(__dirname + '/submissions'));





app.listen(process.env.port || 3000);

console.log("Running at Port 3000");
