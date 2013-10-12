var vh = require('../util/ValidationHelper');
var m = require('../service/ValidationMessages');
var _ = require('underscore');

module.exports = {

	validateLdName: function(ldName) {
		var em = [];

		em.push(vh.validateAny(vh.validateNullEmpty, [ldName, m.LD_NAME_REQUIRED]));
		em.push(vh.validateAny(vh.validateLength, [ldName, m.LD_NAME_LENGTH, 1, 50]));
		em.push(vh.validateAny(vh.validateRegEx, 
			[ldName, m.LD_NAME_ALLOWED_CHARS, vh.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));

		return _.filter(em, function(message){ return message !== null; });
	}
};