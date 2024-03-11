var fs = require('fs');
var express = require('express');
var router = express.Router();

var auth = require('../../middlewares/auth');
router.use(auth.authorize());

var connections = require('../../db/connections');
var pool = connections.getWordsPool();

var path = require('path');
var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, '../../config.json')) });
var rootDir = nconf.get('rootDir');

router.get('/', function(req, res){
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}
    
    var query = fs.readFileSync(rootDir + '/db/queryForStatistics.sql');
    query = query.toString().replace(/\{userId\}/g, req.userId);
    connection.query(query, function(err, result, fields){
      if (err) { console.log(err); res.send(err); return; }

      connection.release();
      res.send(result);
    });
  });
});

router.get('/byLevel', function(req, res){
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    connection.query(
      'SELECT l.levelName, count(*) AS count, count(*) * 100.0 / (SELECT count(*) FROM words WHERE levelID = ' + req.query.levelID + ') AS percentage ' +
      'FROM userWords uw ' +
      'JOIN words w ON uw.wordID = w.id ' +
      'JOIN levels l ON w.levelID = l.id ' +
      'WHERE uw.state > 5 AND uw.userID = ' + req.userId + ' AND w.levelID = ' + req.query.levelID, function(err, result, fields){
      if (err) { console.log(err); res.send(err); return; }

      connection.release();
      res.send(result);
    });
  });
});

module.exports = router;