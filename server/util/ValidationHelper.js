var check = require('validator').check;
var _ = require('underscore');

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
	},

	/**
	 * Validates at least one qcer in list is set to true. Returns null if validation passes.
	 * @param {object} qcers, for example: {"1":true, "2":true}
	 * @return {string} message to be returned if validation error occurs
	 */
	validateAtLeastOneQcer: function(qcers, message) {
		if(typeof(qcers) == 'undefined' || qcers == null) {
			return message;
		};
		var selectedQcers = _.filter(_.values(qcers), function(qcer){ return qcer; });
		if (selectedQcers.length === 0) {
			return message;
		};
		return null;
	}
};