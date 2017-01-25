var uuidV1 = require('uuid/v1');

module.exports = {

    tokenList: [],

    clearTokenList: function() {
      //if (this.tokenList == undefined) { tokenList = []; console.log("tokenList init"); }
      //console.log("length: " + this.tokenList.length);
      for (var i = this.tokenList.length - 1; i >= 0; i--){
        //console.log("diff: " + (Date.now() - this.tokenList[i].start));
        if (Date.now() - this.tokenList[i].validFrom > 36000000) { // 10 hours
          this.tokenList.splice(i, 1);
          //console.log(this.tokenList + " removed");
        }
      }
    },

    generateToken: function(userId) {
      var token = {};
      token.accessToken = uuidV1();
      token.userId = userId;
      token.validFrom = Date.now();
      this.tokenList.push(token);
      //console.log("Token generated:");
      //console.log('accessToken: ' + token.accessToken + ', userId: ' + token.userId + ', validFrom: ' + token.validFrom);
      return token.accessToken;
    },

    isAuthorized: function(accessToken) {
      var token = this.findToken(accessToken);
      if (token == undefined) {
        //console.log("Authorization failed");
        return false;
      }
      else {
        //console.log("Authorization success");
        token.validFrom = Date.now();
        return true;
      }
    },

    findToken: function(accessToken) {
      var returnToken = undefined;
      //console.log("AccessToken to find: " + accessToken);
      //console.log("Valid tokens:");
      for (var i = 0; i < this.tokenList.length; i++) {
        //console.log(this.tokenList[i].accessToken);
        if (this.tokenList[i].accessToken == accessToken) {
          //console.log("Token found");
          returnToken = this.tokenList[i];
          break;
        }
      };

      return returnToken;
    },

    getUserId: function(accessToken) {
      var token = this.findToken(accessToken);
      if (token != undefined) {
        return token.userId;
      }
    }

}
