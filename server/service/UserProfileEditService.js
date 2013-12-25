var userDao = require('../dao/UserDao');
var messages = require('../validate/ValidationMessages');
var logger = require('../util/LogWrapper');

module.exports = {

	// callback(err, user, message)
	getUserProfile: function(userId, callback) {
		userDao.getUserById(userId, function(err, result) {
			if (err) {
				logger.log().error('Error occurred finding user profile by userId: ' + userId, err);
				callback(err, null, messages.USER_FIND_FAIL);
			} else if (result.length === 0) {
					callback(null, null, messages.USER_NOT_FOUND);
			} else {
					callback(null, result[0], null);
			}
		});
	}

};