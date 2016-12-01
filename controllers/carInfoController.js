module.exports = function(app, pool){

	app.get("/car", function(req, res){
		res.render("carInfo/carInfo", {data: { resultType: "", resultMessage: "" }});
	});

	app.post("/car", function(req, res){
		res.render("carInfo/carInfo");
	});
};
