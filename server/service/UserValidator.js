var check = require('validator').check
	, messages = require('./ValidationMessages')
	, UserDao = require('../dao/UserDao')
	, _ = require('underscore');

var validateNullEmpty = function(field, message) {
	check(field, message).notNull();
	check(field, message).notEmpty();
}

var validateAlpha = function(field, message) {
	check(field, message).isAlpha();
}

var validateLength = function(field, message, min, max) {
	check(field, message).len(min, max);
}

var validateEmail = function(field, message) {
	check(field, message).isEmail();
}

var validateEquality = function(field1, field2, message) {
	console.log('validateEquality, field1: ' + field1 + ', field2; ' + field2);
	if (field1 !== field2) {
		return message;
	}
	return null;
}

var validateAny = function(validateFunction, validateArgs) {
	try {
		validateFunction.apply(null, validateArgs);
	} catch(err) {
		return err.message;
	}
	return null;
}

module.exports = {

	validate: function(user) {

		var errorMessages=[];

		// First name
		errorMessages.push(
			validateAny(validateNullEmpty, [user.firstname, messages.FIRST_NAME_REQUIRED]));
		errorMessages.push(
			validateAny(validateLength, [user.firstname, messages.FIRST_NAME_LENGTH, 2, 20]));
		errorMessages.push(
			validateAny(validateAlpha, [user.firstname, messages.FIRST_NAME_ALLOWED_CHARS]));
		
		// Surname
		errorMessages.push(
			validateAny(validateNullEmpty, [user.surname, messages.SURNAME_REQUIRED]));
		errorMessages.push(
			validateAny(validateLength, [user.surname, messages.SURNAME_LENGTH, 2, 20]));
		errorMessages.push(
			validateAny(validateAlpha, [user.surname, messages.SURNAME_ALLOWED_CHARS]));

		// Email (a.k.a. Username)
		errorMessages.push(
			validateAny(validateNullEmpty, [user.username, messages.EMAIL_REQUIRED]));
		errorMessages.push(
			validateAny(validateLength, [user.username, messages.EMAIL_LENGTH, 5, 255]));
		errorMessages.push(
			validateAny(validateEmail, [user.username, messages.EMAIL_FORMAT]));

		// Password
		errorMessages.push(
			validateAny(validateNullEmpty, [user.password, messages.PASSWORD_REQUIRED]));
		errorMessages.push(
			validateAny(validateLength, [user.password, messages.PASSWORD_LENGTH, 8, 40]));
		// errorMessages.push(
		// 	validateEquality(user.password, user.retypepassword, messages.PASSWORD_MATCH));
		
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