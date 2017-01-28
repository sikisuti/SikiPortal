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
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "config.json")) });

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
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
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

router.get('/searchOxford', function(req, res){
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  console.log('searchOxford started');
  var options = {
    hostname: 'od-api.oxforddictionaries.com',
    port: 443,
    path: '/api/v1/entries/en/' + req.query.word + '/examples;definitions;pronunciations',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'app_id': nconf.get('app_id'),
      'app_key': nconf.get('app_key')
    }
  };
  console.log('url: https://' + options.hostname + ':' + options.port + options.path);
  https.get(options, (response) => {
    var data = '';
    response.on('data', (chunk) => {
      console.log('chunk arrived');
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
      if (jData != undefined && jData.results != undefined && jData.results[0].lexicalEntries != undefined){
        for (var i = 0; i < jData.results[0].lexicalEntries.length; i++) {
          var pronunciation = '';
          var audioFile = '';
          if (jData.results[0].lexicalEntries[i].pronunciations != undefined) {
            pronunciation = jData.results[0].lexicalEntries[i].pronunciations[0].phoneticSpelling;
            audioFile = jData.results[0].lexicalEntries[i].pronunciations[0].audioFile;
          }
          var lexicalCategory = jData.results[0].lexicalEntries[i].lexicalCategory;

          if (jData.results[0].lexicalEntries[i].entries != undefined && jData.results[0].lexicalEntries[i].entries[0].senses != undefined){
            for (var j = 0; j < jData.results[0].lexicalEntries[i].entries[0].senses.length; j++) {
              var definition = jData.results[0].lexicalEntries[i].entries[0].senses[j].definitions[0];
              var example = '';
              if (jData.results[0].lexicalEntries[i].entries[0].senses[j].examples != undefined) {
                example = jData.results[0].lexicalEntries[i].entries[0].senses[j].examples[0].text;
              }
              collectedData.push(
                {
                  lexicalCategory: lexicalCategory,
                  definition: definition,
                  example: example,
                  pronunciation: pronunciation,
                  audioFile: audioFile
                });
            }
          }
        }
      }
      res.send(collectedData);
    });
  });
});

module.exports = router;
