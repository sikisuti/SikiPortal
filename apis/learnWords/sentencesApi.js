var express = require('express');
var router = express.Router();

var auth = require('../../middlewares/auth');
router.use(auth.authorize());

var connections = require('../../db/connections');
var pool = connections.getWordsPool();

var path = require('path');

var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "../../config.json")) });

router.get('/', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  pool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }

    connection.query('SELECT * FROM sentences ORDER BY RAND() LIMIT 10', function (err, sentencesResult, fields) {
      if (err) { console.log(err); res.send(err); return; }

      connection.release();
      sentencesResult[0].audioFile = '';
      res.send(sentencesResult);
    });
  });
});

module.exports = router;