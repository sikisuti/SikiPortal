module.exports = function(app){

	app.get("/car", function(req, res){
		var data = {cars: ["IZT-995", "GVP-839"]};
		res.render("carInfo/carInfo", {data: data});
	});
};
