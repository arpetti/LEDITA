var check = require('validator').check;

module.exports = {

	FIRST_ALPHANUMERIC_REST_ANY_CHAR: /^[A-Za-z0-9][A-Za-z-9, +-_&#'"òàùèéì@#*]+$/,

	validateNullEmpty: function(field, message) {
		check(field, message).notNull();
		check(field, message).notEmpty();
	},

	validateAlpha: function(field, message) {
		check(field, message).isAlpha();
	},

	validateAlphanumeric: function(field, message) {
		check(field, message).isAlphanumeric();
	},

	validateLength: function(field, message, min, max) {
		check(field, message).len(min, max);
	},

	validateEmail: function(field, message) {
		check(field, message).isEmail();
	},

	validateRegEx: function(field, message, regex) {
		check(field, message).regex(regex);
	},

	validateTrue: function(field, message) {
		if (!field) {
			return message;
		}
		return null;
	},

	validateAny: function(validateFunction, validateArgs) {
		try {
			validateFunction.apply(null, validateArgs);
		} catch(err) {
			return err.message;
		}
		return null;
	}
};