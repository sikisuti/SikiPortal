// Imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql      = require('mysql');

var port = 3000;

// Controller files
var carInfoController = require(path.join(__dirname, 'controllers/carInfoController'));
var carInfoApi = require('./apis/carInfoApi');
var learnJavaApi = require('./apis/learnJavaApi');
var carInfoRefuelApi = require('./apis/carInfoRefuelApi');

// Create app
var app = express();

// Template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var carInfoPool = mysql.createPool({
   host     : 'localhost',
   user     : 'root',
   password : 'Gaboca.1',
   database : 'CarInfo',
   connectionLimit: 10,
   supportBigNumbers: true
});

var javaQuestionsPool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Gaboca.1',
  database : 'JavaQuestions',
  connectionLimit: 10,
  supportBigNumbers: true
});

// fire controllers
carInfoController(app, carInfoPool);
carInfoApi(app, carInfoPool);
learnJavaApi(app, javaQuestionsPool);
carInfoRefuelApi(app, carInfoPool);

app.get("/", function(req, res){
  res.render("index");
});

app.get("/shop", function(req, res){
  res.sendFile("/public/shoppingList/index.html", {root: __dirname});
});

app.get("/java", function(req, res){
  res.sendFile("/public/learnJava/index.html", {root: __dirname});
});

var server = app.listen(port);
console.log("Listening on port " + port);
