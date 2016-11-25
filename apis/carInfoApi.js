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

  app.post("/api/carInfo/cars", function(req, res){
    console.log(req.body);
    res.json({ message: "Created" });
  });

  app.post("/api/carInfo/refuelData", function(req, res){
    var responseMessage;
    pool.getConnection(function(err, connection){
      if (err) { console.log(err); res.json({ message: err }); }

      connection.query('INSERT INTO commonActionData values ?', { carId: req.body.carId, actionDate: req.body.actionDate, km: req.body.km }, function(err, commonResult){
        if (err) { console.log(err); connection.release(); res.json({ message: err }) }

        connection.query('INSERT INTO refuelData values ?', { commonId: commonResult.insertId, fuelAmount: req.body.fuelAmount, fuelCost: req.body.fuelCost }, function(err, result){
          if (err) { console.log(err); connection.release(); res.json({ message: err }) }

          connection.release();
          res.json({ message: "Success" });
        });
      });
    });
  });
};
