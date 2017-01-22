var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth');
router.use(auth.authorize());

var connections = require('../db/connections');
var pool = connections.getJavaQuestionsPool();

var authManager = require('../authManager');

//module.exports = function(app, pool){

  var mixedQuestionIds;
  var currentQuestionId;

  router.get('/authorizationCheck', function(req, res) {});

  router.get("/question", function(req, res){
    console.log("/question GET called");
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    mixQuestions(null, function(){
      if (mixedQuestionIds.length - 1 > currentQuestionId) {
        currentQuestionId += 1;
      } else {
        res.status(400);
        res.send('end');
        return;
      }

      pool.getConnection(function (err, connection){
        if (err) {console.log(err); return;}

        var result = JSON.parse('{}');

        connection.query(
          'SELECT * FROM QUESTIONS q WHERE q.ID = ' + mixedQuestionIds[currentQuestionId].ID, function(err, questionResult, fields){
  				if (err) { console.log(err); res.send(err); return; }

          result.id = questionResult[0].ID;
          result.question = questionResult[0].QUESTION;
          result.code = formatCode(questionResult[0].CODE);
          result.explanation = questionResult[0].EXPLANATION;

          connection.query('SELECT * FROM ANSWERS WHERE question_id = ' + questionResult[0].ID, function(err, answerResult, fields){
            if (err) { console.log(err); res.send(err); return; }

            result.answers = answerResult;

            result.answers.forEach(function(answer){
              if (answer.ISCODE) { answer.ANSWER = formatCode(answer.ANSWER); }
            });

            //console.log(result);
            connection.release();
            res.send(result);
          });
  			});
      });
    });
  });

  router.delete("/question", function(req, res){
    mixedQuestionIds = null;
    res.sendStatus(200);
  });

  router.post("/question", function(req, res){
    pool.getConnection(function (err, connection){
      if (err) {console.log(err); return;}

      connection.beginTransaction(function(err){
        if (err) { res.sendStatus(503); }

        var insertAttemptQuery = connection.query('INSERT INTO ATTEMPTS set ?',
            { USER_ID: authManager.getUserId(req.cookies.sikiToken), QUESTION_ID: req.body.questionId, ISCORRECT: req.body.isCorrect }, function(err, attemptResult){
          if (err) { connection.rollback(function(){
            console.log(insertAttemptQuery.sql); console.log(err); connection.release(); res.sendStatus(503);
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

  var mixQuestions = function(noOfQuestions, callback){
    if (mixedQuestionIds == null || currentQuestionId == mixedQuestionIds.length - 1) {
      pool.getConnection(function (err, connection){
        if (err) {console.log(err); return;}

        connection.query('SELECT ID FROM QUESTIONS ORDER BY RAND()', function(err, questionResult, fields){
            if (err) { console.log(err); res.send(err); return; }

            mixedQuestionIds = questionResult;
            currentQuestionId = -1;
            connection.release();
            callback();
        });
      });
    } else {
      callback();
    }
  };

  var formatCode = function(code){
    var tmpCode = "";

        var ident = 0;
        for (var i = 0; i < code.length; i++){
            tmpCode = tmpCode.concat(code.charAt(i));
            if (code.charAt(i) == '{'){
                ident++;
            }
            if (i + 1 < code.length && code.charAt(i + 1) == '}') {
                ident--;
            }
            if (code.charAt(i) == '\n'){
                for (var j = 0; j < ident; j++){
                    tmpCode =tmpCode.concat('  ');
                }
            }
        }

        return tmpCode;
  };

//};

module.exports = router;
