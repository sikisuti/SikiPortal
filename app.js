// Imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var port = 3000;

// Controller files
var carInfoController = require(path.join(__dirname, 'controllers/carInfoController'));
var carInfoApi = require('./apis/carInfoApi');
var learnJavaApi = require('./apis/learnJavaApi');
var carInfoRefuelApi = require('./apis/carInfoRefuelApi');
var userManagementApi = require('./apis/userManagementApi');
var authorizationApi = require('./apis/authorizationApi');

var connections = require('./db/connections');
var authorization = require('./middlewares/auth');

// Create app
var app = express();

// Template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(__dirname + '/public'));

// Authentication middleware
app.use(authorization.authorize(connections.getAuthPool()));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// fire controllers
carInfoController(app, connections.getCarInfoPool());
carInfoApi(app, connections.getCarInfoPool());
learnJavaApi(app, connections.getJavaQuestionsPool());
carInfoRefuelApi(app, connections.getCarInfoPool());
userManagementApi(app, connections.getAuthPool());
authorizationApi(app, connections.getAuthPool());

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
