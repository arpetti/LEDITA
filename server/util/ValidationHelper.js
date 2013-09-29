var check = require('validator').check;

module.exports = {

	validateNullEmpty: function(field, message) {
		check(field, message).notNull();
		check(field, message).notEmpty();
	},

	validateAlpha: function(field, message) {
		check(field, message).isAlpha();
	},

	validateLength: function(field, message, min, max) {
		check(field, message).len(min, max);
	},

	validateEmail: function(field, message) {
		check(field, message).isEmail();
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