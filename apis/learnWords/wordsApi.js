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

    getWordsFromExistingSession(connection, req.userId, function (sessionWords) {
      if (sessionWords.length == 0) {
        getWordsFromNewSession(connection, req.userId, function (wordsResult) {
          storeSession(wordsResult, connection, function () {
            closeConnectionAndResponse(connection, res, wordsResult);
          })
        })
      } else {
        closeConnectionAndResponse(connection, res, sessionWords);
      }
    });
  });
});

router.post('/', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }

    connection.beginTransaction(function (err) {
      if (err) { res.sendStatus(503); }

      insertWord(connection, req, res, function (insertResult) {
        insertUserWord(connection, req, res, insertResult, function () {
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

var insertWord = function (connection, req, res, callback) {
  var insertWordQuery = connection.query('INSERT INTO words set ?', req.body, function (err, insertResult) {
    console.log(insertWordQuery.sql);
    if (err) {
      connection.rollback(function () {
        console.log(err); connection.release(); res.sendStatus(503);
      });
    }

    callback(insertResult);
  });
};

var insertUserWord = function (connection, req, res, insertResult, callback) {
  var insertUserWordQuery = connection.query('INSERT INTO userWords set ?',
    { userID: req.userId, wordID: insertResult.insertId, state: 1 }, function (err) {
      if (err) {
        connection.rollback(function () {
          console.log(insertUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
        });
      }

      callback();
    }
  );
};

var getWordsFromExistingSession = function (connection, userId, callback) {
  connection.query(
    'SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, uw.state, uw.id AS userWordID, uw.userID, w.audioFile ' +
    'FROM sessionwords sw ' +
    'JOIN userWords uw ON sw.userWordID = uw.id ' +
    'JOIN words w ON uw.wordID = w.id ' +
    'WHERE sw.userID = ' + userId, function (err, sessionResult, fields) {
      if (err) { console.log(err); res.send(err); return; }

      callback(sessionResult);
    }
  );
};

var getWordsFromNewSession = function (connection, userId, callback) {
  connection.query(
    '(SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, uwInner.state, uwInner.id AS userWordID, uwInner.userID, w.audioFile ' +
    'FROM words w ' +
    'JOIN ( ' +
    'SELECT * ' +
    'FROM userWords ' +
    'WHERE userID = ' + userId +
    ') uwInner ON uwInner.wordID = w.id ' +
    'WHERE w.id NOT IN ( ' +
    'SELECT uw.wordID ' +
    'FROM userWords uw ' +
    'WHERE uw.userID = ' + userId + ' AND ( ' +
    'uw.state > 5 OR ( ' +
    '(uw.state = 2 and uw.lastLearned > DATE_ADD(CURDATE(), INTERVAL -4 DAY)) OR ' +
    '(uw.state = 3 and uw.lastLearned > DATE_ADD(CURDATE(), INTERVAL -7 DAY)) OR ' +
    '(uw.state = 4 and uw.lastLearned > DATE_ADD(CURDATE(), INTERVAL -15 DAY)) OR ' +
    '(uw.state = 5 and uw.lastLearned > DATE_ADD(CURDATE(), INTERVAL -30 DAY)) ' +
    ') ' +
    ') ' +
    ') AND (NOT ISNULL(uwInner.userID) OR (ISNULL(uwInner.userID) AND w.levelID <> 1)) ' +
    'ORDER BY uwInner.state DESC, w.levelID ASC ' +
    'LIMIT ' + getRandomInt(7, 9) + ') ' +
    'UNION ' +
    '(SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, uw.state, uw.id AS userWordID, uw.userID, w.audioFile ' +
    'FROM words w ' +
    'JOIN userWords uw ON w.id = uw.wordID ' +
    'WHERE uw.userID = ' + userId + ' AND uw.state = 6 ' +
    'ORDER BY RAND() ' +
    'LIMIT 1)', function (err, wordsResult, fields) {
      if (err) { console.log(err); res.send(err); return; }

      if (wordsResult.length < 5) {
        wordsResult = [];
      }

      callback(wordsResult, connection);
    }
  );
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var storeSession = function (wordsToLearn, connection, callback) {
  if (wordsToLearn.length != 0) {
    var data = [];
    for (var i = 0; i < wordsToLearn.length; i++) {
      data.push([wordsToLearn[i].userID, wordsToLearn[i].userWordID])
    }

    var insertSessionWordsQuery = connection.query('INSERT INTO sessionwords(userID, userWordID) values ?',
      [data], function (err, insertResult) {
        if (err) {
          connection.rollback(function () {
            console.log(insertSessionWordsQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
          });
        }
        console.log('Session stored');
      });
  }

  callback();
};

var closeConnectionAndResponse = function (connection, res, wordsResult) {
  connection.release();
  res.send(wordsResult);
};

module.exports = router;