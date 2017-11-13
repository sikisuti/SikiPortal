var path = require('path');

var nconf = require('nconf');
nconf.argv().env().file({ file: path.normalize(path.join(__dirname, "../config.json")) });

var mongoose = require('mongoose');

module.exports = {
    getShops: function() {
        return 'return from the mongoManager';
    }, 

    saveShop: function(shop, callback) {
        mongoose.connect('mongodb://localhost/trialdb');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            var shopSchema = mongoose.Schema({
                name: String
            });

            var Shop = mongoose.model('Shopabc', shopSchema);

            var tesco = new Shop({name: 'Tesco'});

            tesco.save(function(err, tesco) {
                if (err) return console.error(err);
                callback('tesco saved');
            });
        });
    }
}