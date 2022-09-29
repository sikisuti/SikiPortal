var express = require('express');
var router = express.Router();

var auth = require('../../middlewares/auth');
router.use(auth.authorize());

var connections = require('../../db/connections');
var pool = connections.getWordsPool();

router.get('/', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  pool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }

    getWordsFromExistingSession(connection, req.userId, function (sessionWords) {
      if (sessionWords.length == 0) {
        getSettings(connection, req.userId, res, function (userSettings) {
          getWordsFromNewSession(connection, req.userId, userSettings.newWordSuggestion, function (wordsResult) {
            storeSession(req.userId, wordsResult, connection, function () {
              closeConnectionAndResponse(connection, res, wordsResult);
            })
          })
        });
      } else {
        closeConnectionAndResponse(connection, res, sessionWords);
      }
    });
  });
});

var getSettings = function (connection, userId, res, callback) {
  connection.query("SELECT * FROM userSettings WHERE userID = " + userId, function (err, userSettings) {
    if (err) { console.log(err); res.send(err); return; }

    callback(userSettings[0]);
  });
};

router.post('/', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }

    connection.beginTransaction(function (err) {
      if (err) { res.sendStatus(503); }

      insertOrUpdateWord(connection, req, res, function (newId) {
        insertOrUpdateUserWord(connection, req, res, newId, function () {
          connection.commit(function (err) {
            if (err) {
              connection.rollback(function () {
                res.sendStatus(503);
              });
            } else {
              connection.release();
              res.sendStatus(200);
            }
          });
        });
      });
    });
  });
});

router.get('/known', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }

    connection.query(
      'SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, uw.state, uw.id AS userWordID, uw.userID, w.audioFile ' +
      'FROM words w ' +
      'JOIN userWords uw ON w.id = uw.wordID ' +
      'WHERE uw.userID = ' + req.userId + ' AND uw.state > 5 ' +
      'ORDER BY uw.state ASC, RAND() ' +
      'LIMIT 12', function (err, knownWords) {
        if (err) { console.log(err); res.send(err); return; }

        closeConnectionAndResponse(connection, res, knownWords);
      }
    );
  });
});

var insertOrUpdateWord = function (connection, req, res, callback) {
  var getWordQuery = connection.query('SELECT * FROM words WHERE foreignWord = ? AND native = ?', [req.body.foreignWord, req.body.native], function (err, existingWords) {
    if (err) { res.sendStatus(503); }
    else {
      console.log('request\n' + getWordQuery.sql);
      console.log('response\n' + existingWords);
      var existingWord = existingWords ? existingWords[0] : undefined;
      if (existingWord) {
        var updateWordQuery = connection.query('UPDATE words SET ? WHERE id = ?', [req.body, existingWord.id], function (err, result) {
          if (err) { res.sendStatus(503); }
          else {
            console.log('request\n' + updateWordQuery.sql);
            console.log('response\n' + result);
            callback(existingWord.id);
          }
        });
      } else {
        insertWord(connection, req, res, function (newId) {
          callback(newId);
        });
      }
    }
  });
};

var insertWord = function (connection, req, res, callback) {
  var insertWordQuery = connection.query('INSERT INTO words set ?', req.body, function (err, insertResult) {
    console.log(insertWordQuery.sql);
    if (err) {
      connection.rollback(function () {
        console.log(err); connection.release(); res.sendStatus(503);
      });
    } else {
      callback(insertResult.insertId);
    }
  });
};

var insertOrUpdateUserWord = function (connection, req, res, newWordId, callback) {
  var getUserWordQuery = connection.query('SELECT * FROM userWords WHERE userID = ? AND wordID = ?',
    [req.userId, newWordId], function (err, existingUserWords) {
      if (err) { res.sendStatus(503); }
      else {
        console.log('request\n' + getUserWordQuery.sql);
        console.log('response\n' + existingUserWords);
        var existingUserWord = existingUserWords ? existingUserWords[0] : undefined;
        if (existingUserWord) {
          var updateUserWordQuery = connection.query('UPDATE userWords SET state = 1 WHERE id = ?',
            [existingUserWord.id], function (err, result) {
              if (err) { res.sendStatus(503); }
              else {
                console.log('request\n' + updateUserWordQuery.sql);
                console.log('response\n' + result);
                callback();
              }
            });
        } else {
          insertUserWord(connection, req, res, newWordId, function () {
            callback();
          });
        }
      }
    });
}

var insertUserWord = function (connection, req, res, newId, callback) {
  var insertUserWordQuery = connection.query('INSERT INTO userWords set ?',
    { userID: req.userId, wordID: newId, state: 1 }, function (err) {
      if (err) {
        connection.rollback(function () {
          console.log(insertUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
        });
      } else {
        callback();
      }
    }
  );
};

var getWordsFromExistingSession = function (connection, userId, callback) {
  connection.query(
    'SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, w.audioFile ' +
    'FROM sessionwords sw ' +
    'JOIN words w ON sw.wordID = w.id ' +
    'WHERE sw.userID = ' + userId, function (err, sessionResult) {
      if (err) { console.log(err); res.send(err); return; }

      callback(sessionResult);
    }
  );
};

var getWordsFromNewSession = function (connection, userId, newWordSuggestion, callback) {
  var queryWithoutNewWords =
    'SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, uwInner.state, uwInner.id AS userWordID, uwInner.userID, w.audioFile ' +
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
    ') ' +
    'ORDER BY uwInner.state DESC, w.levelID ASC ' +
    'LIMIT ' + getRandomInt(7, 9);
  var queryWithNewWords =
    'SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, uwInner.state, uwInner.id AS userWordID, uwInner.userID, w.audioFile ' +
    'FROM words w ' +
    'LEFT JOIN ( ' +
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
    ') AND (NOT ISNULL(uwInner.userID) OR (ISNULL(uwInner.userID) AND w.levelID <> 7)) ' +
    'ORDER BY uwInner.state DESC, w.levelID ASC ' +
    'LIMIT ' + getRandomInt(7, 9);
  connection.query(newWordSuggestion ? queryWithNewWords : queryWithoutNewWords, function (err, wordsResult) {
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

var storeSession = function (userId, wordsToLearn, connection, callback) {
  if (wordsToLearn.length != 0) {
    var data = [];
    for (var i = 0; i < wordsToLearn.length; i++) {
      data.push([userId, wordsToLearn[i].wordID])
    }

    var insertSessionWordsQuery = connection.query('INSERT INTO sessionwords(userID, wordID) values ?',
      [data], function (err) {
        if (err) {
          connection.rollback(function () {
            console.log(insertSessionWordsQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
          });
        } else {
          console.log('Session stored');
          callback();
        }
      }
    );
  } else {
    callback();
  }
};

var closeConnectionAndResponse = function (connection, res, wordsResult) {
  connection.release();
  res.send(wordsResult);
};

module.exports = router;