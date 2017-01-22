var express = require('express');
var router = express.Router();

router.use('/learnJava', require('./learnJavaApi'));
router.use('/learnWords', require('./learnWordsApi'));

module.exports = router;
