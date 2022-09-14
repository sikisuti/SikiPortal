var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth');
router.use(auth.authorize());

var connections = require('../db/connections');
var pool = connections.getWordsPool();

var authManager = require('../authManager');

var https = require('https');

var path = require('path');

var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "../config.json")) });

router.get('/authorizationCheck', function(req, res) { res.send('authorizationCheck OK'); });

router.get('/words', function(req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    getWordsFromExistingSession(connection, req.userId, function(sessionWords) {
      if (sessionWords.length == 0) {
        getWordsFromNewSession(connection, req.userId, function(wordsResult) {
          storeSession(wordsResult, connection, function(){
            closeConnectionAndResponse(connection, res, wordsResult);
          })
        })
      } else {
        closeConnectionAndResponse(connection, res, sessionWords);
      }
    });
  });
});

router.get('/sentence', function(req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

        connection.query('SELECT * FROM sentences ORDER BY RAND() LIMIT 10', function(err, sentencesResult, fields){
        if (err) { console.log(err); res.send(err); return; }

          connection.release();
          sentencesResult[0].audioFile = '';
          res.send(sentencesResult);
        });
  });
});

router.post('/words', function(req, res){
  var wordsToUpdate = [];
  var wordsToInsert = [];

  for (var i = 0; i < req.body.length; i++) {
    if (req.body[i].userWordID == null) {
      wordsToInsert.push([req.userId, req.body[i].wordID, 2]);
    } else {
      if (req.body[i].state < 6) {
        wordsToUpdate.push([req.body[i].state + 1, req.userId, req.body[i].wordID]);
      }
    }
  }

  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    connection.beginTransaction(function(err){
      if (err) { res.sendStatus(503); }
      console.log('Update started');

      insertUserWords(connection, wordsToInsert, function(){
        updateUserWords(connection, wordsToUpdate, function(){
          connection.commit(function(err){
            if (err) {
              connection.rollback(function(){
                connection.release();
                res.sendStatus(503);
                return;
              });
            } else {
              clearSession(connection, req.userId, function() {
                connection.release();
                console.log('Words updated');
                res.sendStatus(200);
              });
            }
          });
        });
      });
    });
  });
});

var insertUserWords = function(connection, wordsToInsert, callback) {
  console.log('wordsToInsert: ' + wordsToInsert);
  if (wordsToInsert.length == 0) {callback();}
  else {

    var insertUserWordQuery = connection.query('INSERT INTO userWords(userID, wordID, state) values ?',
          [wordsToInsert], function(err, insertResult){
      if (err) { connection.rollback(function(){
        console.log(insertUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
        });
      }
      console.log('Words inserted');
      callback();
    });
  }
};

var updateUserWords = function(connection, wordsToUpdate, callback) {
  console.log('wordsToUpdate: ' + wordsToUpdate);
  if (wordsToUpdate.length == 0) {callback();}
  else {

    var i = 0;
    wordsToUpdate.forEach(function(wordToUpdate){
      var updateUserWordQuery = connection.query('UPDATE userWords set state = ? WHERE userID = ? AND wordID = ?',
          wordToUpdate, function(err, updateResult){
        if (err) { connection.rollback(function(){
          console.log(updateUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
          });
        }
        console.log('word with id: ' + wordToUpdate[2] + ' updated')
        i++;
        if (i == wordsToUpdate.length) {
          callback();
        }
      });
    });
  }
};

var clearSession = function(connection, userId, callback) {
  connection.query(
    'DELETE FROM sessionwords WHERE userID = ' + userId, function(err, sessionResult, fields){
      if (err) { console.log(err); res.send(err); return; }

      callback();
    });
}

router.post('/word', function(req, res){
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    connection.beginTransaction(function(err){
      if (err) { res.sendStatus(503); }

      var insertWordQuery = connection.query('INSERT INTO words set ?', req.body, function(err, insertResult){
        console.log(insertWordQuery.sql);
        if (err) { connection.rollback(function(){
           console.log(err); connection.release(); res.sendStatus(503);
          });
        }

        var insertUserWordQuery = connection.query('INSERT INTO userWords set ?',
        {userID: req.userId, wordID: insertResult.insertId, state: 1}, function(err, insertUwResult){
          if (err) { connection.rollback(function(){
            console.log(insertUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
            });
          }

          connection.commit(function(err){
            if (err) { connection.rollback(function(){
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

router.put('/userWord/:id', function(req, res){
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    connection.beginTransaction(function(err){
      if (err) { res.sendStatus(503); }

      var updateUserWordQuery = connection.query('UPDATE userWords SET state = ? WHERE id = ?',
      [7, parseInt(req.params.id)], function(err, updateUwResult){
        if (err) { connection.rollback(function(){
          console.log(updateUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
          });
        }

        console.log('Word set to known. userWordID: ' + req.params.id);
        connection.commit(function(err){
          if (err) { connection.rollback(function(){
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

router.post('/userWord/:wordID', function(req, res){
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    connection.beginTransaction(function(err){
      if (err) { res.sendStatus(503); }

      var insertUserWordQuery = connection.query('INSERT INTO userWords SET ?',
      {userID: req.userId, wordID: req.params.wordID, state: 7}, function(err, insertUwResult){
        if (err) { connection.rollback(function(){
          console.log(insertUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
          });
        }

        console.log('Word set to known. wordID: ' + req.params.wordID);
        connection.commit(function(err){
          if (err) { connection.rollback(function(){
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

router.get('/searchDictionary', function(req, res){
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  var options = {
    hostname: 'www.dictionaryapi.com',
    port: 443,
    path: '/api/v3/references/collegiate/json/' + req.query.word + '?key=' + nconf.get('dictionary_key'),
    method: 'GET'
  };
  https.get(options, (response) => {
    var data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      var collectedData = [];
      try {
        var jData = JSON.parse(data);
      } catch(e) {
        res.sendStatus(200);
        return;
      }

      console.log(jData);
      for (var i = 0; i < jData.length; i++) {
        var pronunciation = '';
        var audioFile = '';
        if (jData[i].hwi && jData[i].hwi.prs && jData[i].hwi.prs[0]) {
          pronunciation = jData[i].hwi.prs[0].mw.replace(/-/g, '');
          if (jData[i].hwi.prs[0].sound) {
            var fileName = jData[i].hwi.prs[0].sound.audio;
            audioFile = 'https://media.merriam-webster.com/audio/prons/en/us/mp3/' + Array.from(fileName)[0] + '/' + fileName + '.mp3';
          }
        }

        var lexicalCategory = jData[i].fl;
        var definition = '';
        if (jData[i].shortdef && jData[i].shortdef[0]) {
          definition = jData[i].shortdef[0];
        }
        
        var example = '';
        try {
          for (var j = 0; j < jData[i].def[0].sseq[0][0][1].dt.length; j++) {
            if (jData[i].def[0].sseq[0][0][1].dt[j][0] == 'vis') {
              var regex = /\{.*?\}/g;
              example = jData[i].def[0].sseq[0][0][1].dt[j][1][0].t.replace(regex, '');
            }
          }
        } catch(e) {}

        collectedData.push(
          {
            lexicalCategory: lexicalCategory,
            definition: definition,
            example: example,
            pronunciation: pronunciation,
            audioFile: audioFile
          });
      }

      res.send(collectedData);
    });
  });
});

router.get('/stateStatistics', function(req, res){
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

var getWordsFromExistingSession = function(connection, userId, callback) {
  connection.query(
    'SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.lexicalCategory, w.definition, uw.state, uw.id AS userWordID, uw.userID, w.audioFile ' +
    'FROM sessionwords sw ' +
    'JOIN userWords uw ON sw.userWordID = uw.id ' +
    'JOIN words w ON uw.wordID = w.id ' +
    'WHERE sw.userID = ' + userId, function(err, sessionResult, fields){
      if (err) { console.log(err); res.send(err); return; }

      callback(sessionResult);
    });
}

var getWordsFromNewSession = function(connection, userId, callback) {
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
    'LIMIT 1)', function(err, wordsResult, fields){
    if (err) { console.log(err); res.send(err); return; }

    callback(wordsResult, connection);
  });
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var storeSession = function(wordsToLearn, connection, callback) {
  if (wordsToLearn.length != 0) {
    var data = [];
    for (var i = 0; i < wordsToLearn.length; i++) {
      data.push([wordsToLearn[i].userID, wordsToLearn[i].userWordID])
    }

    var insertSessionWordsQuery = connection.query('INSERT INTO sessionwords(userID, userWordID) values ?',
          [data], function(err, insertResult){
      if (err) { connection.rollback(function(){
        console.log(insertSessionWordsQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
        });
      }
      console.log('Session stored');
    });
  }

  callback();
};

var closeConnectionAndResponse = function(connection, res, wordsResult) {
  connection.release();
  res.send(wordsResult);
}

module.exports = router;
