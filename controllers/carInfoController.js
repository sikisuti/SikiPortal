var mysql      = require('mysql');

module.exports = function(app){

	app.get("/car", function(req, res){

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

		connection.query('SELECT * FROM cars', function(err, rows, fields){
			if (err) {
				console.log("Getting cars failed");
			} else {
				console.log(rows);
        res.render("carInfo/carInfo", {data: rows});
			}
      connection.end();
		});
	});
};
