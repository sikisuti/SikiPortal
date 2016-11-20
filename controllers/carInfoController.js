var mysql      = require('mysql');

module.exports = function(app){

	app.get("/car", function(req, res){

		var cars;
		var serviceItems;

    var connection = mysql.createConnection({
       host     : 'localhost',
       user     : 'root',
       password : 'Gaboca.1',
       database : 'CarInfo'
    });

		connection.connect(function(err){
			if (err) {
				console.log("Database connection failed\n" + err);
			} else {
				console.log("Database connection established");
			}
		});

		connection.query('SELECT * FROM cars', function(err, carRows, fields){
			if (err) {
				console.log("Getting cars failed");
			} else {
				cars = carRows;
				connection.query('SELECT * FROM serviceItems', function(err, serviceItemRows, fields){
					if (err) {
						console.log("Getting serviceItems failed");
					} else {
						serviceItems = serviceItemRows;
						console.log(serviceItems);
						connection.end();
						res.render("carInfo/carInfo", {data: { cars: cars, serviceItems: serviceItems } });
					}
				});
			}

		});

	});
};
