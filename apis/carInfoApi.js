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

  app.get("/api/carInfo/refuelData/:carId", function(req, res){
    pool.getConnection(function(err, connection){
      if (err) { console.log(err); res.json({ message: err }); }

      var query = connection.query(
        'SELECT r.id, DATE_FORMAT(ca.actionDate, "%Y.%m.%d") AS actionDate, r.fuelAmount, r.fuelCost ' +
        'FROM cars c ' +
          'INNER JOIN commonActionData ca ON ca.carId = c.id ' +
          'INNER JOIN refuelData r ON r.commonId = ca.id ' +
        'WHERE c.id = ' + req.params.carId, function(err, result){
          if (err) { console.log(query.sql); console.log(err); connection.release(); res.json({ message: err }) }

          console.log(query.sql);
          console.log(result);
          connection.release();
          res.json({ "aaData" : result });
        });
    });
  });

  app.post("/api/carInfo/refuelData", function(req, res){
    pool.getConnection(function(err, connection){
      if (err) { console.log(err); res.sendStatus(503); }

      connection.beginTransaction(function(err){
        if (err) { res.sendStatus(503); }

        var commonActionDataQuery = connection.query('INSERT INTO commonActionData set ?',
            { carId: req.body.carId, actionDate: req.body.actionDate, km: req.body.km }, function(err, commonResult){
          if (err) { connection.rollback(function(){
            console.log(commonActionDataQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
            });
          }

          var refuelDataQuery = connection.query('INSERT INTO refuelData set ?',
            { commonId: commonResult.insertId, fuelAmount: req.body.fuelAmount.replace(",", "."), fuelCost: req.body.fuelCost.replace(",", ".") }, function(err, result){
            if (err) { connection.rollback(function(){
              console.log(commonActionDataQuery.sql); console.log(refuelDataQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
              });
            }

            console.log(commonActionDataQuery.sql);
            console.log(refuelDataQuery.sql);
            connection.commit(function(err){
              if (err) { connection.rollback(function(){
                  res.sendStatus(503);
                });
              }
            });
            connection.release();
            res.sendStatus(200);
          });
        });
      });
    });
  });

  app.post("/api/carInfo/serviceData", function(req, res){
    console.log(req.body);
    pool.getConnection(function(err, connection){
      if (err) { console.log(err); res.json({ message: err }); }

      connection.beginTransaction(function(err){
        if (err) { res.json({ message: err }); }

        var commonActionDataQuery = connection.query('INSERT INTO commonActionData set ?',
            { carId: req.body.carId, actionDate: req.body.actionDate, km: req.body.km }, function(err, commonResult){
          if (err) { connection.rollback(function(){
            console.log(commonActionDataQuery.sql); console.log(err); connection.release(); res.json({ message: err })
            });
          }

          var serviceDataQuery = connection.query('INSERT INTO serviceData set ?',
              { commonId: commonResult.insertId, serviceCost: req.body.serviceCost }, function(err, serviceResult){
            if (err) { connection.rollback(function(){
              console.log(commonActionDataQuery.sql); console.log(refuelDataQuery.sql); console.log(err); connection.release(); res.json({ message: err })
              });
            }

            req.body.serviceItems.forEach(function(serviceItem){
              var serviceItemQuery = connection.query('INSERT INTO serviceWorks set ?',
                  { serviceDataId: serviceResult.insertId, serviceItemId: serviceItem }, function(err, result){
                if (err) { connection.rollback(function(){ console.log(commonActionDataQuery.sql);
                            console.log(refuelDataQuery.sql);
                            console.log(serviceItemQuery.sql); console.log(err); connection.release(); res.json({ message: err });
                  });
                }

              });
            });

            console.log(commonActionDataQuery.sql);
            console.log(serviceDataQuery.sql);
            connection.commit(function(err){
              if (err) { connection.rollback(function(){
                  res.json({ message: err });
                });
              }
            });
            connection.release();
            res.json({ message: "Success" });
          });
        });
      });
    });
  });
};
