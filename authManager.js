module.exports = {

    tokenList: [],

    clearTokenList: function() {
      //if (this.tokenList == undefined) { tokenList = []; console.log("tokenList init"); }
      //console.log("length: " + this.tokenList.length);
      for (var i = this.tokenList.length - 1; i >= 0; i--){
        //console.log("diff: " + (Date.now() - this.tokenList[i].start));
        if (Date.now() - this.tokenList[i].start > 36000000) { // 10 hours
          this.tokenList.splice(i, 1);
          //console.log(this.tokenList + " removed");
        }
      }
    },

    generateToken: function(userId) {
      var token = {};
      token.user = userId;
      token.start = Date.now();
      this.tokenList.push(token);
      console.log("Token generated: " + this.tokenList);
    },

    isValid: function(token) { return this.tokenList.indexOf(token) > -1; }



}
