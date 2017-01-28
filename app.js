// Imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "config.json")) });

var port = nconf.get('port');

// Controller files
var carInfoController = require(path.join(__dirname, 'controllers/carInfoController'));
var carInfoApi = require('./apis/carInfoApi');
//var learnJavaApi = require('./apis/learnJavaApi');
var carInfoRefuelApi = require('./apis/carInfoRefuelApi');
var userManagementApi = require('./apis/userManagementApi');
var authorizationApi = require('./apis/authorizationApi');

var connections = require('./db/connections');
var authorization = require('./middlewares/auth');

var auth = require('./authManager');
setInterval(function() { auth.clearTokenList(); }, 1800000); // 30 min

// Create app
var app = express();

// Template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());

// Authentication middleware
//app.use(authorization.authorize(connections.getAuthPool()));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// fire controllers
carInfoController(app, connections.getCarInfoPool());
carInfoApi(app, connections.getCarInfoPool());
//learnJavaApi(app, connections.getJavaQuestionsPool());
app.use(require('./apis'));
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

app.get("/words", function(req, res){
  res.sendFile("/public/learnWords/index.html", {root: __dirname});
});

var server = app.listen(port);
console.log("Listening on port " + port);
