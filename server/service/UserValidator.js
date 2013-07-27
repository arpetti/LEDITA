var check = require('validator').check
	, messages = require('./ValidationMessages')
	, _ = require('underscore');

var validateLength = function(field, message, min, max) {
	check(field, message).len(min, max);
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
		errorMessages.push(
			validateAny(validateLength, [user.firstname, messages.FIRST_NAME_LENGTH, 2, 20]));
		errorMessages.push(
			validateAny(validateLength, [user.surname, messages.SURNAME_LENGTH, 2, 20]));
		
        return _.filter(errorMessages, function(message){ return message !== null; });
	}

};