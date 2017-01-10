module.exports = function(app, pool){

  app.get("/api/carInfo/refuelData/:carId", function(req, res){
    pool.getConnection(function(err, connection){
      if (err) { console.log(err); res.json({ message: err }); }

      var query = connection.query(
        'SELECT r.id, DATE_FORMAT(ca.actionDate, "%Y-%m-%d") AS actionDate, ca.km, r.fuelAmount, r.fuelCost ' +
        'FROM cars c ' +
          'INNER JOIN commonActionData ca ON ca.carId = c.id ' +
          'INNER JOIN refuelData r ON r.commonId = ca.id ' +
        'WHERE c.id = ' + req.params.carId + " " +
        "ORDER BY ca.actionDate DESC " +
        "LIMIT 10", function(err, result){
          if (err) { console.log(query.sql); console.log(err); connection.release(); res.json({ message: err }) }

          var rtnResult = {aaData: []};
          for (var i = 0; i < result.length; i++){
            console.log("row:");
            console.log(result[i]);
            var jsonData = {};
            for (var key in result[i]){
              jsonData[key] = result[i][key];
            }
            jsonData["distance"] = null;
            jsonData["consume"] = null;
            if (i < result.length - 1) {
              jsonData["distance"] = result[i].km - result[i+1].km;
              jsonData["consume"] = Math.round((result[i].fuelAmount * 1000) / jsonData["distance"]) / 10
            }
            rtnResult.aaData.push(jsonData);
          }
          console.log("rtnResult:");
          console.log(rtnResult);
          connection.release();
          res.json(rtnResult);
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

  app.put('/api/carInfo/refuelData', function(req, res) {
    pool.getConnection(function(err, connection){
      if (err) { console.log(err); res.sendStatus(503); }

      connection.beginTransaction(function(err){
        if (err) { res.sendStatus(503); }

        var rfSelectQuery = connection.query("SELECT r.commonId FROM refuelData r WHERE r.id=" + req.body.id, function(err, refuelSelectResult){
          if (err) { connection.rollback(function(){
            console.log(rfSelectQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
            });
          }
          console.log(refuelSelectResult);
          var commonUpdateQuery = connection.query("UPDATE commonActionData SET ? WHERE id=" + refuelSelectResult[0].commonId,
            {carId: req.body.carId, actionDate: req.body.actionDate, km: req.body.km}, function(err, commonUpdateResult){
              if (err) { connection.rollback(function(){
                console.log(commonUpdateQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
                });
              }

              var refuelUpdateQuery = connection.query("UPDATE refuelData SET ? WHERE id=" + req.body.id,
                {fuelAmount: req.body.fuelAmount, fuelCost: req.body.fuelCost}, function(err, refuelUpdateResult){
                  if (err) { connection.rollback(function(){
                    console.log(refuelUpdateQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
                    });
                  }

                  console.log(commonUpdateQuery.sql);
                  console.log(refuelUpdateQuery.sql);
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
  });

  app.delete('/api/carInfo/refuelData', function(req, res) {
    pool.getConnection(function(err, connection){
      if (err) { console.log(err); res.sendStatus(503); }

      connection.beginTransaction(function(err){
        if (err) { res.sendStatus(503); }

        var rfSelectQuery = connection.query("SELECT r.commonId FROM refuelData r WHERE r.id=" + req.body.id, function(err, refuelSelectResult){
          if (err) { connection.rollback(function(){
            console.log(rfSelectQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
            });
          }

          var refuelDeleteQuery = connection.query("DELETE FROM refuelData WHERE id=" + req.body.id, function(err, refuelDeleteResult){
              if (err) { connection.rollback(function(){
                console.log(refuelDeleteQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
                });
              }

              var commonDeleteQuery = connection.query("DELETE FROM commonActionData WHERE id=" + refuelSelectResult[0].commonId, function(err, commonDeleteResult){
                  if (err) { connection.rollback(function(){
                    console.log(commonDeleteQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
                    });
                  }

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
  });

  app.get('/api/carInfo/statistics/:carId', function(req, res){

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    pool.getConnection(function(err, connection){
      if (err) { console.log(err); res.sendStatus(503); }

      connection.beginTransaction(function(err){
        if (err) { res.sendStatus(503); }

        var query = connection.query(
          "SELECT c.km, r.fuelAmount " +
          "FROM commonActionData c " +
          "INNER JOIN refuelData r ON r.commonId = c.id " +
          "WHERE c.carId=" + req.params.carId + " " +
          "ORDER BY c.actionDate DESC " +
          "LIMIT 10", function(err, result){
          if (err) { connection.rollback(function(){
            console.log(query.sql); console.log(err); connection.release(); res.sendStatus(503);
            });
          }

          var totalKm = result[0].km - result[result.length - 1].km;
          var totalFuelAmount = result.slice(0, result.length - 1).reduce(function(a, b){ return a + b.fuelAmount; }, 0);

          console.log("totalkm: " + totalKm);
          console.log("totalFuelAmount: " + totalFuelAmount);

          console.log(result);
          connection.release();
          res.json({avgConsume: Math.round((totalFuelAmount * 1000) / totalKm) / 10});
        });
      });
    });
  });

};
