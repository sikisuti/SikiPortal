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
