var vh = require('../util/ValidationHelper');
var m = require('../validate/ValidationMessages');
var _ = require('underscore');

module.exports = {

	validateFirstName: function(firstName) {
		var em = [];
		em.push(
			vh.validateAny(vh.validateNullEmpty, [firstName, m.FIRST_NAME_REQUIRED]));
		em.push(
			vh.validateAny(vh.validateLength, [firstName, m.FIRST_NAME_LENGTH, 2, 20]));
		em.push(
			vh.validateAny(vh.validateAlpha, [firstName, m.FIRST_NAME_ALLOWED_CHARS]));
		return _.filter(em, function(message){ return message !== null; });
	}

};