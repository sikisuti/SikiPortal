var mysql      = require('mysql');

var nconf = require('nconf');
nconf.argv().env().file({ file: "./config.json" });

module.exports = {
  getCarInfoPool: function() {
    return mysql.createPool({
     host     : 'localhost',
     user     : nconf.get('db_user'),
     password : nconf.get('db_password'),
     database : 'CarInfo',
     connectionLimit: 10,
     supportBigNumbers: true
   });
 },

 getJavaQuestionsPool: function() {
   return mysql.createPool({
     host     : 'localhost',
     user     : nconf.get('db_user'),
     password : nconf.get('db_password'),
     database : 'JavaQuestions',
     connectionLimit: 10,
     supportBigNumbers: true
   });
 },

 getAuthPool: function() {
   return mysql.createPool({
        host     : 'localhost',
        user     : nconf.get('db_user'),
        password : nconf.get('db_password'),
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
        database : 'LearnWords',
        connectionLimit: 10,
        supportBigNumbers: true
   });
 }
}
