var bcrypt = require('bcrypt');
var logWrapper = require('./LogWrapper');
var configHelper = require('./ConfigHelper');
var config = configHelper.config();

module.exports = {

	//TODO Also refactor to single function version that gens salt and hash at once
	generateHash: function(password, callback) {
  		bcrypt.genSalt(config.hash_work_factor, function(err, salt) {
  			if (err) {
          		logWrapper.log().error('bcrypt gen salt error', err);
			    callback(err);
          		return;
        	}
    		bcrypt.hash(password, salt, function(err, hash) {
        		if (err) {
        			logWrapper.log().error('bcrypt hash error', err);
        			callback(err);
        			return;
        		}
        		callback(null, hash);
    		});
		});
  	},

  	compareHash: function(password, hash, callback) {
  		bcrypt.compare(password, hash, function(err, res) {
    		if (err) {
    			logWrapper.log().error('bcrypt compare error', err);
    			callback(err);
    			return;
    		}
    		callback(null, res);
		});
  	}

};