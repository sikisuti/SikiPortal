var mysql      = require('mysql');
var path = require('path');

var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "../config.json")) });

module.exports = {
  getCarInfoPool: function() {
    return mysql.createPool({
     host     : 'localhost',
     user     : nconf.get('db_user'),
     password : nconf.get('db_password'),
     port     : nconf.get('db_port'),
     database : 'CarInfo',
     connectionLimit: 10,
     supportBigNumbers: true
   });
 },

 getAuthPool: function() {
   return mysql.createPool({
        host     : 'localhost',
        user     : nconf.get('db_user'),
        password : nconf.get('db_password'),
        port     : nconf.get('db_port'),
        database : 'Auth',
        connectionLimit: 10,
        supportBigNumbers: true
   });
 },

 getWordsPool: function() {
   return mysql.createPool({
        host     : 'localhost',
        user     : nconf.get('db_user'),
        password : nconf.get('db_password'),
        port     : nconf.get('db_port'),
        database : 'LearnWords',
        connectionLimit: 10,
        supportBigNumbers: true
   });
 }
}
