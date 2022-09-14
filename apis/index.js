var express = require('express');
var router = express.Router();

router.use('/learnWords', require('./learnWordsApi'));

module.exports = router;
