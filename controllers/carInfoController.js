module.exports = function(app, pool){

	app.get("/car", function(req, res){
		res.render("carInfo/carInfo");
	});

	app.post("/car", function(req, res){
		res.render("carInfo/carInfo");
	});
};
