var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth');
router.use(auth.authorize());

var connections = require('../db/connections');
var pool = connections.getWordsPool();

var authManager = require('../authManager');

var https = require('https');

router.get('/authorizationCheck', function(req, res) { res.sendStatus(200)});

router.get('/words', function(req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    connection.query(
      '(SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.partID, uw.state, uw.id AS userWordID, w.hasAudio ' +
			'FROM words w ' +
			   'LEFT OUTER JOIN userWords uw ON w.id = uw.wordID ' +
			'WHERE (uw.userID=' + req.userId + ' or ISNULL(uw.userID)) and ' +
			   '(ISNULL(uw.state) or ' +
              'uw.state = 1 or ' +
							'(uw.state = 2 and uw.lastLearned < curdate() - 4) or ' +
							'(uw.state = 3 and uw.lastLearned < curdate() - 7) or ' +
							'(uw.state = 4 and uw.lastLearned < curdate() - 15) or ' +
							'(uw.state = 5 and uw.lastLearned < curdate() - 30)) ' +
			'ORDER BY uw.state DESC, w.levelID ASC ' +
			'LIMIT 9) ' +
      'UNION ' +
      '(SELECT w.id AS wordID, w.native, w.foreignWord, w.exampleSentence, w.pronunciation, w.levelID, w.partID, uw.state, uw.id AS userWordID, w.hasAudio ' +
			'FROM words w ' +
			   'LEFT OUTER JOIN userWords uw ON w.id = uw.wordID ' +
      'WHERE uw.userID=' + req.userId + ' and uw.state > 5 ' +
      'ORDER BY RAND() ' +
      'LIMIT 1)', function(err, wordsResult, fields){
      if (err) { console.log(err); res.send(err); return; }

      connection.release();
      res.send(wordsResult);
    });
  });
});

router.post('/words', function(req, res){
  //console.log('request body: ' + req.body);
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    connection.beginTransaction(function(err){
      if (err) { res.sendStatus(503); }

      //console.log('body length: ' + req.body.length);
      for (var i = 0; i < req.body.length; i++){
        //console.log('userWordID: ' + req.body[i].userWordID);
        if (req.body[i].userWordID == null) {
          //console.log('insert, req.userId: ' + req.userId + ', req.body[i].wordID: ' + req.body[i].wordID );
          var insertUserWordQuery = connection.query('INSERT INTO userWords set ?',
                { userID: req.userId, wordID: req.body[i].wordID, state: 1 }, function(err, insertResult){
            if (err) { connection.rollback(function(){
              console.log(insertUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
              });
            }

            //console.log('userWord inserted: wordId: ' + req.body[i].wordID + " " + req.body[i].native);
          });
        } else {
          //console.log('req.body[i].state: ' + req.body[i].state);
          if (req.body[i].state < 6) {
            //console.log('update, req.userId: ' + req.userId + ', req.body[i].wordID: ' + req.body[i].wordID );
            var updateUserWordQuery = connection.query('UPDATE userWords set ? WHERE userID = ' + req.userId + ' AND wordID = ' + req.body[i].wordID,
                { state: req.body[i].state + 1 }, function(err, updateResult){
              if (err) { connection.rollback(function(){
                console.log(updateUserWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503); return;
                });
              }

              //console.log('userWord updated: wordId: ' + req.body[i].wordID + " " + req.body[i].native + " new state: " + (req.body[i].state + 1));
            });
          }
        }
      }

      connection.commit(function(err){
        if (err) {
          connection.rollback(function(){
            connection.release();
            res.sendStatus(503);
            return;
          });
        }
      });
      connection.release();
      //console.log('Words updated');
      res.sendStatus(200);
    });
  });
});

router.post('/word', function(req, res){
  pool.getConnection(function (err, connection){
    if (err) {console.log(err); return;}

    connection.beginTransaction(function(err){
      if (err) { res.sendStatus(503); }

      var insertWordQuery = connection.query('INSERT INTO words set ?',
          { native: req.body.native,
            foreignWord: req.body.foreignWord,
            exampleSentence: req.body.exampleSentence,
            pronunciation: req.body.pronunciation,
            levelID: req.body.levelID,
            partID: req.body.partID,
            hasAudio: req.body.hasAudio
          }, function(err, updateResult){
        if (err) { connection.rollback(function(){
          console.log(insertWordQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
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

router.get('/searchNatives', function(req, res){
  https.get('https://glosbe.com/gapi/translate?from=eng&dest=hun&format=json&phrase=' + req.query.word, (response) => {
    var data = '';
    response.on('data', (d) => {
      data += d;
    });
    response.on('end', () => {
      var collectedData = [];
      var jData = JSON.parse(data);
      for (var i = 0; i < jData.tuc.length; i++) {
        if (jData.tuc[i].phrase != undefined) {
          collectedData.push({name: jData.tuc[i].phrase.text});
        }
      }
      res.send(collectedData);
    });
  });
});

module.exports = router;
