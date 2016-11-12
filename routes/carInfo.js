var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var data = {cars: ["IZT-995", "GVP-839"]}
	res.render('carInfo/carInfo', {data: data});
});

module.exports = router;
