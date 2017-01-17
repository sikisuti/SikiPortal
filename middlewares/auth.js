var auth = require('../authManager');

module.exports = {

  authorize: function(pool) {
    return function(req, res, next) {
      if (req.cookies.sikiToken == undefined) {
        console.log("no auth");
        res.cookie('sikiToken', 'abc');
        res.status(401).send('Authorization failed');
        return;
      }
      next();
    };
  }

}
