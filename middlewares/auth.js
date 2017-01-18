var auth = require('../authManager');

module.exports = {

  authorize: function(pool) {
    return function(req, res, next) {
      console.log(req.url + " called");
      if (req.url == '/learnJava/views/loginPage.html') { next(); return; }
      if (req.url.startsWith("/learnJava/css/")) { next(); return; }
      if (req.url.startsWith("/js/")) { next(); return; }
      if (req.url == '/api/authorization/login') { next(); return; }
      if (req.cookies.sikiToken == undefined) {
        console.log("send response with status 401...");
        res.status(401).send('Authorization failed');
        return;
      }
      next();
    };
  }

}
