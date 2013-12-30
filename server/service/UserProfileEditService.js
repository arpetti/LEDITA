var userDao = require('../dao/UserDao');
var userProfileEditDao = require('../dao/UserProfileEditDao');
var messages = require('../validate/ValidationMessages');
var logger = require('../util/LogWrapper');

var updateProfile = function(updateFunc, userId, dataValue, message, cb) {
	updateFunc.apply(null, [userId, dataValue, function(err, result) {
		if(err) {
			logger.log().error('Error occurred updating user profile for userId: ' + userId, err);
			cb(err, message);
		} else {
			cb();
		}
	}]);
};

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
		updateProfile(userProfileEditDao.updateFirstName, userId, firstName, messages.USER_PROFILE_UPDATE_FIRST_NAME_FAIL, callback);
	},

	// callback(err, message)
	updateLastName: function(userId, lastName, callback) {
		updateProfile(userProfileEditDao.updateLastName, userId, lastName, messages.USER_PROFILE_UPDATE_LAST_NAME_FAIL, callback);
	},

	// callback(err, message)
	updateEmail: function(userId, email, callback) {
		updateProfile(userProfileEditDao.updateEmail, userId, email, messages.USER_PROFILE_UPDATE_EMAIL_FAIL, callback);
	},

	// callback(err, message)
	updateWorkplace: function(userId, workplace, callback) {
		updateProfile(userProfileEditDao.updateWorkplace, userId, workplace, messages.USER_PROFILE_UPDATE_WORKPLACE_FAIL, callback);
	},

	// callback(err, message)
	updateCity: function(userId, city, callback) {
		updateProfile(userProfileEditDao.updateCity, userId, city, messages.USER_PROFILE_UPDATE_CITY_FAIL, callback);
	},

	// callback(err, message)
	updateCountry: function(userId, country, callback) {
		updateProfile(userProfileEditDao.updateCountry, userId, country, messages.USER_PROFILE_UPDATE_COUNTRY_FAIL, callback);
	}

};