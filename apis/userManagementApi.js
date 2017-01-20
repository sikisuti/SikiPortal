var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, authPool) {

  app.post('/userManagement/user', function(req, res) {
      authPool.getConnection(function(err, connection){
        if (err) { console.log(err); res.sendStatus(503); }

        var userSelect = connection.query("SELECT * FROM Users u WHERE u.username = '" + req.body.username + "'", function(err, selectResult) {
          if (err) { console.log(userSelect.sql); console.log(err); connection.release(); res.json({ message: err }) }

          if (selectResult.length != 0) { connection.release(); res.json({ message: "User already exists"}); return;}
          bcrypt.hash(req.body.password, null, null, function(err, hash) {
            if (err) { console.log(err); res.sendStatus(503); }

            connection.beginTransaction(function(err){
              if (err) { res.sendStatus(503); }

              var userQuery = connection.query('INSERT INTO Users set ?',
                    { username: req.body.username, password: hash }, function(err, userResult){
                if (err) { connection.rollback(function(){
                  console.log(userQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
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
};
