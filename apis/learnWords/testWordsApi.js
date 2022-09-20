var express = require('express');
var router = express.Router();

var auth = require('../../middlewares/auth');
router.use(auth.authorize());

var connections = require('../../db/connections');
var pool = connections.getWordsPool();

router.get('/start', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  pool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }

    connection.query(
      '(SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, uwInner.state, uwInner.id AS userWordID, uwInner.userID, w.audioFile ' +
      'FROM words w ' +
      'JOIN ( ' +
      'SELECT * ' +
      'FROM userWords ' +
      'WHERE userID = ' + req.userId +
      ') uwInner ON uwInner.wordID = w.id ' +
      'ORDER BY uwInner.id DESC ' +
      'LIMIT ' + req.query.noOfWords + ')', function (err, testWords, fields) {
        if (err) { console.log(err); res.send(err); return; }

        closeConnectionAndResponse(connection, res, testWords);
      });
  });
});

var closeConnectionAndResponse = function (connection, res, wordsResult) {
  connection.release();
  res.send(wordsResult);
}

module.exports = router;