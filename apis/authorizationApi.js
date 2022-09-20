var bcrypt = require('bcrypt-nodejs');
var auth = require('../authManager');

var express = require('express');
var router = express.Router();

var connections = require('../db/connections');
var authPool = connections.getAuthPool();

router.post('/login', function (req, res) {
  //console.log("Login started -> username: " + req.body.username + ", password: " + req.body.password);
  authPool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }

    connection.query("SELECT * FROM Users WHERE username = '" + req.body.username + "'", function (err, userResult, fields) {
      if (err) { console.log(err); res.send(err); return; }

      if (userResult.length == 0) { console.log('Username not found'); connection.release(); res.json({ message: "Wrong username or password" }); return; }
      //console.log('Username found, password check...');
      bcrypt.compare(req.body.password, userResult[0].password, function (err, result) {
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
          connection.release(); res.json({ message: "Login failure" })
        }
      });
    });
  });
});

router.get('/logout', function (req, res) {
  if (req.cookies.sikiToken != undefined) {
    auth.removeToken(req.cookies.sikiToken);
    res.clearCookie('sikiToken');
    res.clearCookie('sikiUsername');
    res.sendStatus(200);
  }
});

router.get('/check', function (req, res) {
  if (req.cookies.sikiToken != undefined && auth.isAuthorized(req.cookies.sikiToken)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.post('/user', function (req, res) {
  authPool.getConnection(function (err, connection) {
    if (err) { console.log(err); res.sendStatus(503); }

    var userSelect = connection.query("SELECT * FROM Users u WHERE u.username = '" + req.body.username + "'", function (err, selectResult) {
      if (err) { console.log(userSelect.sql); console.log(err); connection.release(); res.json({ message: err }) }

      if (selectResult.length != 0) { connection.release(); res.status(400).send('User already exists'); return; }
      bcrypt.hash(req.body.password, null, null, function (err, hash) {
        if (err) { console.log(err); res.sendStatus(503); }

        connection.beginTransaction(function (err) {
          if (err) { res.sendStatus(503); }

          var userQuery = connection.query('INSERT INTO Users set ?',
            { username: req.body.username, password: hash }, function (err, userResult) {
              if (err) {
                connection.rollback(function () {
                  console.log(userQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
                });
              }

              connection.commit(function (err) {
                if (err) {
                  connection.rollback(function () {
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

module.exports = router;
