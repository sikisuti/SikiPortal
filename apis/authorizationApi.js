var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, authPool) {

  app.post('/api/authorization/login', function(req, res) {

    authPool.getConnection(function (err, connection){
      if (err) {console.log(err); return;}


        connection.query("SELECT * FROM Users WHERE username = '" + req.body.username + "'", function(err, userResult, fields){
        	if (err) { console.log(err); res.send(err); return; }

          if (userResult.length == 0) { connection.release(); res.json({message:"Wrong username or password"}); return; }

          bcrypt.compare(req.body.password, userResult[0].password, function(err, result) {
            if (err) { console.log(err); res.send(err); return; }

            if (result) {connection.release(); res.json({message:"Login success"})}
            else {connection.release(); res.json({message:"Login failure"})}
          });
        });
    });
  });

};
