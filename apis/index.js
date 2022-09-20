var express = require('express');
var router = express.Router();

router.use('/authorization', require('./authorizationApi'));

router.use('/learnWords/words', require('./learnWords/wordsApi'));
router.use('/learnWords/userWords', require('./learnWords/userWordsApi'));
router.use('/learnWords/sentences', require('./learnWords/sentencesApi'));
router.use('/learnWords/testWords', require('./learnWords/testWordsApi'));
router.use('/learnWords/dictionary', require('./learnWords/dictionaryApi'));
router.use('/learnWords/statistics', require('./learnWords/statisticsApi'));

module.exports = router;
