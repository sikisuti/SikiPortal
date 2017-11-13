var express = require('express');
var router = express.Router();

var mongo = require('../db/mongoManager');
/*
var auth = require('../middlewares/auth');
router.use(auth.authorize());
*/
var path = require('path');

var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "../config.json")) });

router.get('/shops', function(req, res) { 
    res.send(mongo.getShops()); 
});

router.post('/shop', function(req, res) {
    mongo.saveShop('abc', function(msg) {
        res.send(msg);
    })
});

module.exports = router;