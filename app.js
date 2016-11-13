// Imports
var express = require('express');
var path = require('path');

var port = 3000;

// Controller files
var carInfoController = require(path.join(__dirname, 'controllers/carInfoController'));
var shoppingListController = require('./controllers/shoppingListController');

// Create app
var app = express();

// Template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(__dirname + '/public'));

// fire controllers
carInfoController(app);
shoppingListController(app);

app.get("/", function(req, res){
  res.render("index");
});

app.listen(port);
console.log("Listening on port " + port);
