var userDao = require('../dao/UserDao');
var userProfileEditDao = require('../dao/UserProfileEditDao');
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
	},

	// callback(err, message)
	updateFirstName: function(userId, firstName, callback) {
		userProfileEditDao.updateFirstName(userId, firstName, function(err, result) {
			if(err) {
				logger.log().error('Error occurred updating user profile first name for userId: ' + userId, err);
				callback(err, messages.USER_PROFILE_UPDATE_FIRST_NAME_FAIL);
			} else {
				callback();
			}
		});
	},

	// callback(err, message)
	updateLastName: function(userId, lastName, callback) {
		userProfileEditDao.updateLastName(userId, lastName, function(err, result) {
			if(err) {
				logger.log().error('Error occurred updating user profile last name for userId: ' + userId, err);
				callback(err, messages.USER_PROFILE_UPDATE_LAST_NAME_FAIL);
			} else {
				callback();
			}
		});
	}

};