var express = require('express');
var router = express.Router();

var auth = require('../../middlewares/auth');
router.use(auth.authorize());

var connections = require('../../db/connections');
var pool = connections.getWordsPool();

router.get('/', function(req, res){
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    connection.query(
      'SELECT state, count(*) AS count FROM userWords WHERE state < 6 AND userID = ' + req.userId + ' GROUP BY state', function(err, result, fields){
      if (err) { console.log(err); res.send(err); return; }

      connection.release();
      res.send(result);
    });
  });
});

module.exports = router;