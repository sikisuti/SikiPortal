var uuidV1 = require('uuid/v1');

module.exports = {

    tokenList: [],

    clearTokenList: function() {
      for (var i = this.tokenList.length - 1; i >= 0; i--){
        if (Date.now() - this.tokenList[i].validFrom > 36000000) { // 10 hours
          this.removeToken(this.tokenList[i].accessToken);
        }
      }
    },

    generateToken: function(userId) {
      var token = {};
      token.accessToken = uuidV1();
      token.userId = userId;
      token.validFrom = new Date();
      this.tokenList.push(token);
      console.log('[' + new Date() + "] Token generated:");
      console.log('accessToken: ' + token.accessToken + ', userId: ' + token.userId + ', validFrom: ' + token.validFrom);
      return token.accessToken;
    },

    removeToken: function(accessToken) {
      var i = this.tokenList.map(function(token){return token.accessToken}).indexOf(accessToken);
      console.log('[' + new Date() + '] Removing token:');
      console.log('accessToken: ' + this.tokenList[i].accessToken + ', userId: ' + this.tokenList[i].userId + ', validFrom: ' + this.tokenList[i].validFrom);
      this.tokenList.splice(i, 1);
    },

    isAuthorized: function(accessToken) {
      var token = this.findToken(accessToken);
      if (token == undefined) {
        return false;
      }
      else {
        token.validFrom = Date.now();
        return true;
      }
    },

    findToken: function(accessToken) {
      var returnToken = undefined;
      for (var i = 0; i < this.tokenList.length; i++) {
        if (this.tokenList[i].accessToken == accessToken) {
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
