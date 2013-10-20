var vh = require('../util/ValidationHelper');
var m = require('../validate/ValidationMessages');
var _ = require('underscore');

module.exports = {

	validateLdName: function(ldName) {
		var em = [];
		em.push(vh.validateAny(vh.validateNullEmpty, [ldName, m.LD_NAME_REQUIRED]));
		em.push(vh.validateAny(vh.validateLength, [ldName, m.LD_NAME_LENGTH, 1, 50]));
		em.push(vh.validateAny(vh.validateRegEx, 
			[ldName, m.LD_NAME_ALLOWED_CHARS, vh.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));
		return _.filter(em, function(message){ return message !== null; });
	},

	validateLdScope: function(ldScope) {
		var em = [];
		em.push(vh.validateAny(vh.validateNullEmpty, [ldScope, m.LD_SCOPE_REQUIRED]));
		em.push(vh.validateAny(vh.validateLength, [ldScope, m.LD_SCOPE_LENGTH, 1, 50]));
		em.push(vh.validateAny(vh.validateRegEx, 
			[ldScope, m.LD_SCOPE_ALLOWED_CHARS, vh.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));
		return _.filter(em, function(message){ return message !== null; });
	},

	validateStudentsDescr: function(studentsDescr) {
		var em = [];
		em.push(vh.validateAny(vh.validateNullEmpty, [studentsDescr, m.LD_STUDENTS_DESC_REQUIRED]));
		em.push(vh.validateAny(vh.validateLength, [studentsDescr, m.LD_STUDENTS_DESC_LENGTH, 1, 500]));
		em.push(vh.validateAny(vh.validateRegEx, 
			[studentsDescr, m.LD_STUDENTS_DESC_ALLOWED_CHARS, vh.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));
		return _.filter(em, function(message){ return message !== null; });
	},

	validateTopic: function(topic) {
		var em = [];
		em.push(vh.validateAny(vh.validateNullEmpty, [topic, m.LD_TOPIC_EMPTY]));
		em.push(vh.validateAny(vh.validateLength, [topic, m.LD_TOPIC_LENGTH, 1, 255]));
		em.push(vh.validateAny(vh.validateRegEx, 
			[topic, m.LD_TOPIC_ALLOWED_CHARS, vh.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));
		return _.filter(em, function(message){ return message !== null; });
	},

	validateObjective: function(objective) {
		var em = [];
		em.push(vh.validateAny(vh.validateNullEmpty, [objective, m.LD_OBJECTIVE_EMPTY]));
		em.push(vh.validateAny(vh.validateLength, [objective, m.LD_OBJECTIVE_LENGTH, 1, 255]));
		em.push(vh.validateAny(vh.validateRegEx, 
			[objective, m.LD_OBJECTIVE_ALLOWED_CHARS, vh.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));
		return _.filter(em, function(message){ return message !== null; });
	},

	/**
	 * Validates at least one qcer in list is set to true
	 * @param {object} qcers, for example: {"1":true, "2":true}
	 * @return {list} messages to be returned if validation error occurs
	 */
	validateQcers: function(qcers) {
		var em = [];
		em.push(vh.validateAtLeastOneQcer(qcers, m.LD_QCER_SELECTED));
		return _.filter(em, function(message){ return message !== null; });
	}
};