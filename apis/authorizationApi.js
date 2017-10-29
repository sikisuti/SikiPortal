var bcrypt = require('bcrypt-nodejs');
var auth = require('../authManager');

module.exports = function(app, authPool) {

  app.post('/authorization/login', function(req, res) {
    //console.log("Login started -> username: " + req.body.username + ", password: " + req.body.password);
    authPool.getConnection(function (err, connection){
      if (err) {console.log(err); return;}

        connection.query("SELECT * FROM Users WHERE username = '" + req.body.username + "'", function(err, userResult, fields){
        	if (err) { console.log(err); res.send(err); return; }

          if (userResult.length == 0) { console.log('Username not found'); connection.release(); res.json({message:"Wrong username or password"}); return; }
          //console.log('Username found, password check...');
          bcrypt.compare(req.body.password, userResult[0].password, function(err, result) {
            if (err) { console.log(err); res.send(err); return; }

            if (result) {
              //console.log('Login success');
              connection.release();
              var accessToken = auth.generateToken(userResult[0].id);
              res.cookie('sikiToken', accessToken);
              res.cookie('sikiUsername', req.body.username);
              // TODO: put token to the header
              //res.set('Authorization', userResult[0].id);
              res.send({ 'username': req.body.username });
            }
            else {
              console.log('Login failed');
              connection.release(); res.json({message:"Login failure"})
            }
          });
        });
    });
  });

  app.get('/authorization/logout', function(req, res){
    if (req.cookies.sikiToken != undefined) {
      auth.removeToken(req.cookies.sikiToken);
      res.clearCookie('sikiToken');
      res.clearCookie('sikiUsername');
      res.sendStatus(200);
    }
  });

  app.get('/authorization/check', function(req, res){
    if (req.cookies.sikiToken != undefined && auth.isAuthorized(req.cookies.sikiToken)) {
      //console.log("Authenticated");
      res.json({ Authorized: true });
    } else {
      //console.log("Not authenticated");
      res.json({ Authorized: false });
    }    
  })

};
