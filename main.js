// Imports
var express = require('express');
var path = require('path');

// Router files
var carInfo = require('./routes/carInfo');
var shoppingList = require('./routes/shoppingList');

// Create app
var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', function(req, res) {
	res.render('index');
});
app.use('/car', carInfo);
app.use('/shop', shoppingList);

app.listen(3000, function() {
	console.log("Listening on port 3000");
})
