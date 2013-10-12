var validationHelper = require('../util/ValidationHelper');
var messages = require('../validate/ValidationMessages');
var UserDao = require('../dao/UserDao')
var _ = require('underscore');

module.exports = {

	validate: function(user) {

		var errorMessages = [];

		// First name
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateNullEmpty, [user.firstname, messages.FIRST_NAME_REQUIRED]));
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateLength, [user.firstname, messages.FIRST_NAME_LENGTH, 2, 20]));
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateAlpha, [user.firstname, messages.FIRST_NAME_ALLOWED_CHARS]));
		
		// Surname
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateNullEmpty, [user.surname, messages.SURNAME_REQUIRED]));
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateLength, [user.surname, messages.SURNAME_LENGTH, 2, 20]));
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateAlpha, [user.surname, messages.SURNAME_ALLOWED_CHARS]));

		// Email (a.k.a. Username)
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateNullEmpty, [user.username, messages.EMAIL_REQUIRED]));
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateLength, [user.username, messages.EMAIL_LENGTH, 5, 255]));
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateEmail, [user.username, messages.EMAIL_FORMAT]));

		// Password
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateNullEmpty, [user.password, messages.PASSWORD_REQUIRED]));
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateLength, [user.password, messages.PASSWORD_LENGTH, 8, 40]));

		// Terms
		errorMessages.push(validationHelper.validateTrue(user.terms, messages.TERMS));
		
        return _.filter(errorMessages, function(message){ return message !== null; });
	},

	// callback(err, message)
	validateExists: function(username, callback) {
		UserDao.getUserByEmail(username, function(err, results){
			if (err) {
				callback(err);
				return;
			}
			if (results.length > 0) {
				callback(null, messages.USERNAME_EXISTS);
				return;
			}
			callback(null, null);
        });
	}

};