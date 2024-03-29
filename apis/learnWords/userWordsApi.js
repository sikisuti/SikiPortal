var express = require('express');
var router = express.Router();

var auth = require('../../middlewares/auth');
router.use(auth.authorize());

var connections = require('../../db/connections');
var pool = connections.getWordsPool();

router.post('/', function (req, res) {
  var wordsToUpdate = [];
  var wordsToInsert = [];

  for (var i = 0; i < req.body.length; i++) {
    if (req.body[i].userWordID == null) {
      wordsToInsert.push([req.userId, req.body[i].wordID, 2]);
    } else {
      wordsToUpdate.push([req.body[i].state + 1, req.userId, req.body[i].wordID]);
    }
  }

  pool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }
    else {
      connection.beginTransaction(function (err) {
        if (err) { res.sendStatus(503); }
        else {
          console.log('Update started');

          insertUserWords(connection, wordsToInsert, function () {
            updateUserWords(connection, wordsToUpdate, function () {
              connection.commit(function (err) {
                if (err) {
                  connection.rollback(function () {
                    connection.release();
                    res.sendStatus(503);
                    return;
                  });
                } else {
                  clearSession(connection, req.userId, function () {
                    connection.release();
                    console.log('Words updated');
                    res.sendStatus(200);
                  });
                }
              });
            });
          });
        }
      });
    }
  });
});

router.post('/:wordID', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }
    else {
      connection.beginTransaction(function (err) {
        if (err) { res.sendStatus(503); }
        else {
          var insertUserWordQuery = connection.query('INSERT INTO userWords SET ?',
            { userID: req.userId, wordID: req.params.wordID, state: 6 }, function (err, insertUwResult) {
              if (err) {
                connection.rollback(function () {
                  console.log(insertUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
                });
              } else {
                console.log('Word set to known. wordID: ' + req.params.wordID);
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
              }
            }
          );
        }
      });
    }
  });
});

router.put('/:id', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) { console.log(err); return; }
    else {
      connection.beginTransaction(function (err) {
        if (err) { res.sendStatus(503); }
        else {
          var updateUserWordQuery = connection.query('UPDATE userWords SET state = ? WHERE id = ?',
            [6, parseInt(req.params.id)], function (err, updateUwResult) {
              if (err) {
                connection.rollback(function () {
                  console.log(updateUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
                });
              } else {
                console.log('Word set to known. userWordID: ' + req.params.id);
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
              }
            });
        }
      });
    }
  });
});

var insertUserWords = function (connection, wordsToInsert, callback) {
  console.log('wordsToInsert: ' + wordsToInsert);
  if (wordsToInsert.length == 0) { callback(); }
  else {
    var insertUserWordQuery = connection.query('INSERT INTO userWords(userID, wordID, state) values ?',
      [wordsToInsert], function (err, insertResult) {
        if (err) {
          connection.rollback(function () {
            console.log(insertUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
          });
        } else {
          console.log('Words inserted');
          callback();
        }
      });
  }
};

var updateUserWords = function (connection, wordsToUpdate, callback) {
  console.log('wordsToUpdate: ' + wordsToUpdate);
  if (wordsToUpdate.length == 0) { callback(); }
  else {
    var i = 0;
    wordsToUpdate.forEach(function (wordToUpdate) {
      var updateUserWordQuery = connection.query('UPDATE userWords set state = ? WHERE userID = ? AND wordID = ?',
        wordToUpdate, function (err, updateResult) {
          if (err) {
            connection.rollback(function () {
              console.log(updateUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
            });
          } else {
            console.log('word with id: ' + wordToUpdate[2] + ' updated')
            i++;
            if (i == wordsToUpdate.length) {
              callback();
            }
          }
        });
    });
  }
};

var clearSession = function (connection, userId, callback) {
  connection.query(
    'DELETE FROM sessionwords WHERE userID = ' + userId, function (err, sessionResult, fields) {
      if (err) { console.log(err); res.send(err); return; }
      else {
        callback();
      }
    });
}

module.exports = router;