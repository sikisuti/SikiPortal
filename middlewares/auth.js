module.exports = {

  authorize: function(pool) {
    return function(req, res, next) {
      console.log("Authorization under construction");
      pool.getConnection(function (err, connection){
        if (err) {console.log(err); return;}

        connection.query('SELECT * FROM Users', function(err, authResult, fields){
          if (err) { console.log(err); res.send(err); return; }

          connection.release();
          next();
        });
      });
    };
  },

  register: function(username, password) {

  }
}
