// Imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql      = require('mysql');

var port = 3000;

// Controller files
var carInfoController = require(path.join(__dirname, 'controllers/carInfoController'));
var carInfoApi = require('./apis/carInfoApi');
var shoppingListController = require('./controllers/shoppingListController');

// Create app
var app = express();

// Template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var pool = mysql.createPool({
   host     : 'localhost',
   user     : 'root',
   password : 'Gaboca.1',
   database : 'CarInfo',
   connectionLimit: 10,
   supportBigNumbers: true
});

// fire controllers
carInfoController(app, pool);
carInfoApi(app, pool);
shoppingListController(app, pool);

app.get("/", function(req, res){
  res.render("index");
});

var server = app.listen(port);
console.log("Listening on port " + port);
