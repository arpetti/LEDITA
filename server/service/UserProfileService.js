var UserProfileDao = require('../dao/UserProfileDao');
var messages = require('../validate/ValidationMessages');

module.exports = {

	// callback(err, result, message)
	getUniqueUsers: function(callback) {
		UserProfileDao.getUniqueUsers(function(err, results) {
			if (err) {
				callback(err, null, messages.UNABLE_TO_RETRIEVE_USER);
				return;
			}
			if (results.length == 0) {
				callback(null, null, messages.USER_NOT_FOUND);
				return;
			}
			callback(null, results, null);
		});
	}
};