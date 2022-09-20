var express = require('express');
var router = express.Router();

var auth = require('../../middlewares/auth');
router.use(auth.authorize());

var https = require('https');

var path = require('path');

var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "../../config.json")) });

router.get('/search', function (req, res) {
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
      } catch (e) {
        res.sendStatus(200);
        return;
      }

      console.log(jData);
      for (var i = 0; i < jData.length; i++) {
        var definition = '';
        if (jData[i].shortdef && jData[i].shortdef[0]) {
          definition = jData[i].shortdef[0];
        }

        if (definition) {
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

          var example = '';
          try {
            for (var j = 0; j < jData[i].def[0].sseq[0][0][1].dt.length; j++) {
              if (jData[i].def[0].sseq[0][0][1].dt[j][0] == 'vis') {
                var regex = /\{.*?\}/g;
                example = jData[i].def[0].sseq[0][0][1].dt[j][1][0].t.replace(regex, '');
              }
            }
          } catch (e) { }

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

      res.send(collectedData);
    });
  });
});

module.exports = router;