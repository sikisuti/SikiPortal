module.exports = function(app, pool){

  var mixedQuestionIds;
  var currentQuestionId;

  app.get("/api/learnJava/question", function(req, res){

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

          result.question = questionResult[0].QUESTION;
          result.code = formatCode(questionResult[0].CODE);

          connection.query('SELECT * FROM ANSWERS WHERE question_id = ' + questionResult[0].ID, function(err, answerResult, fields){
            if (err) { console.log(err); res.send(err); return; }

            result.answers = answerResult;

            //console.log(result);
            connection.release();
            res.send(result);
          });
  			});
      });
    });
  });

  app.delete("/api/learnJava/question", function(req, res){
    mixedQuestionIds = null;
    res.sendStatus(200);
  });

  var mixQuestions = function(noOfQuestions, callback){
    if (mixedQuestionIds == null) {
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

};
