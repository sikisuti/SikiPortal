module.exports = function(app, pool){

  app.get("/api/carInfo/cars", function(req, res){
    pool.getConnection(function (err, connection){
      if (err) {console.log(err); return;}

      connection.query('SELECT * FROM cars', function(err, carRows, fields){
				if (err) { console.log(err); res.send(err); return; }

        connection.release();
        res.send(carRows);
			});
    });
  });

  app.get("/api/carInfo/serviceItems", function(req, res){
    pool.getConnection(function (err, connection){
      if (err) {console.log(err); return;}

      connection.query('SELECT * FROM serviceItems', function(err, serviceItemRows, fields){
        if (err) { console.log(err); return; }

        connection.release();
        res.send(serviceItemRows);
      });
    });
  });

};
