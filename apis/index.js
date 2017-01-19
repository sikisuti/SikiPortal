var express = require('express');
var router = express.Router();

router.use('/learnJava', require('./learnJavaApi'));

module.exports = router;
