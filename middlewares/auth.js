var auth = require('../authManager');

module.exports = {

  authorize: function(pool) {
    return function(req, res, next) {
      console.log('Authorization process started');
      if (req.cookies.sikiToken == undefined) {
        //console.log("Not any token sent");
        res.status(401).send('Authorization failed');
        return;
      } else if (auth.isAuthorized(req.cookies.sikiToken)) {
        //console.log('Authorization finished successfully');
        req.userId = auth.getUserId(req.cookies.sikiToken);
        next();
      } else {
        //console.log("Token authorization failed");
        res.status(401).send('Token authorization failed');
        return;
      }
    };
  }

}
