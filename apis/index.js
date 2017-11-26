var express = require('express');
var router = express.Router();

router.use('/learnJava', require('./learnJavaApi'));
router.use('/learnWords', require('./learnWordsApi'));
//router.use('/shop', require('./shopApi'));

module.exports = router;
