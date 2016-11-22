module.exports = function(app, pool){

	app.get("/car", function(req, res){

		var cars;
		var serviceItems;

		pool.getConnection(function(err, connection){
			if(err) { console.log(err); return; }

			connection.query('SELECT * FROM cars', function(err, carRows, fields){
				if (err) {
					console.log("Getting cars failed");
				} else {
					cars = carRows;
					connection.query('SELECT * FROM serviceItems', function(err, serviceItemRows, fields){
						if (err) { console.log(err); return; }

						serviceItems = serviceItemRows;
						connection.release();
						res.render("carInfo/carInfo", {data: { cars: cars, serviceItems: serviceItems } });
					});
				}
			});
		});
	});

	app.post("/car", function(req, res){
		console.log(req.body);
		res.end();
	});
};
