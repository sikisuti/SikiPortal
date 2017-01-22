
var mysql      = require('mysql');

module.exports = {
  getCarInfoPool: function() {
    return mysql.createPool({
     host     : 'localhost',
     user     : 'root',
     password : 'Gaboca.1',
     database : 'CarInfo',
     connectionLimit: 10,
     supportBigNumbers: true
   });
 },

 getJavaQuestionsPool: function() {
   return mysql.createPool({
     host     : 'localhost',
     user     : 'root',
     password : 'Gaboca.1',
     database : 'JavaQuestions',
     connectionLimit: 10,
     supportBigNumbers: true
   });
 },

 getAuthPool: function() {
   return mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'Gaboca.1',
        database : 'Auth',
        connectionLimit: 10,
        supportBigNumbers: true
   });
 },

 getWordsPool: function() {
   return mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'Gaboca.1',
        database : 'LearnWords',
        connectionLimit: 10,
        supportBigNumbers: true
   });
 }
}
