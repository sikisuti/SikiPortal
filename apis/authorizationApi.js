var bcrypt = require('bcrypt-nodejs');
var auth = require('../authManager');

module.exports = function(app, authPool) {

  app.post('/authorization/login', function(req, res) {
    console.log("Login started -> username: " + req.body.username + ", password: " + req.body.password);
    authPool.getConnection(function (err, connection){
      if (err) {console.log(err); return;}

        connection.query("SELECT * FROM Users WHERE username = '" + req.body.username + "'", function(err, userResult, fields){
        	if (err) { console.log(err); res.send(err); return; }

          if (userResult.length == 0) { connection.release(); res.json({message:"Wrong username or password"}); return; }

          bcrypt.compare(req.body.password, userResult[0].password, function(err, result) {
            if (err) { console.log(err); res.send(err); return; }

            if (result) {
              console.log('Login success');
              connection.release();
              var accessToken = auth.generateToken(userResult[0].id);
              res.cookie('sikiToken', accessToken);
              // TODO: put token to the header
              //res.set('Authorization', userResult[0].id);
              res.json({message:"Login success"});
            }
            else {
              console.log('Login failed');
              connection.release(); res.json({message:"Login failure"})
            }
          });
        });
    });
  });

};
