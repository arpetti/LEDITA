var vh = require('../util/ValidationHelper');
var m = require('./ValidationMessages');
var _ = require('underscore');

/*
Home.createLd({
	name: $scope.ldName,
	qcers: $scope.selectedQcers,
	scope: $scope.ldScope,
	topics: $scope.selectedTopics,
	objectives: $scope.selectedObjectives,
	requisites: $scope.selectedPrerequisites,
	studentsDescription: $scope.ldStudentsDescr
}
*/

var atLeastOneQcer = function(qcers) {
	if(typeof(qcers) == 'undefined' || qcers == null) {
		return m.LD_QCER_SELECTED;
	};
	var selectedQcers = _.filter(_.values(qcers), function(qcer){ return qcer; });
	if (selectedQcers.length === 0) {
		return m.LD_QCER_SELECTED;
	};
	return null;
};

var atLeastOneItemInList = function(values, message) {
	if(typeof(values) == 'undefined' || values == null 
		|| !_.isArray(values) || values.length === 0) {
		return message;
	} else {
		return null;
	};
};

var validateItem = function(item, messageEmpty, messageLength, messageRegEx) {
	var message1 = vh.validateAny(vh.validateNullEmpty, [item, messageEmpty]);	
	var message2 = vh.validateAny(vh.validateLength, [item, messageLength, 1, 255]);
	var message3 = vh.validateAny(vh.validateRegEx, 
			[item, messageRegEx, vh.FIRST_ALPHANUMERIC_REST_ANY_CHAR]);
	return [message1, message2, message3];
};

var validateListItems = function(items, messageEmpty, messageLength, messageRegEx) {
	var messageResults = _.map(items, function(item){ 
			return validateItem(item, messageEmpty, messageLength, messageRegEx); 
		});
	return _.uniq(_.compact(_.flatten(messageResults)));
};

module.exports = {

	validate: function(ld) {

		var em = [];

		// Name
		em.push(vh.validateAny(vh.validateNullEmpty, [ld.name, m.LD_NAME_REQUIRED]));
		em.push(vh.validateAny(vh.validateLength, [ld.name, m.LD_NAME_LENGTH, 1, 50]));
		em.push(vh.validateAny(vh.validateRegEx, 
			[ld.name, m.LD_NAME_ALLOWED_CHARS, vh.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));

		// Qcer
		em.push(atLeastOneQcer(ld.qcers));

		// Scope
		em.push(vh.validateAny(vh.validateNullEmpty, [ld.scope, m.LD_SCOPE_REQUIRED]));
		em.push(vh.validateAny(vh.validateLength, [ld.scope, m.LD_SCOPE_LENGTH, 1, 50]));
		em.push(vh.validateAny(vh.validateRegEx, 
			[ld.scope, m.LD_SCOPE_ALLOWED_CHARS, vh.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));

		// Topics
		em.push(atLeastOneItemInList(ld.topics, m.LD_TOPIC_SELECTED));
		em = em.concat(validateListItems(ld.topics, m.LD_TOPIC_EMPTY, m.LD_TOPIC_LENGTH, m.LD_TOPIC_ALLOWED_CHARS));

		// Objectives
		em.push(atLeastOneItemInList(ld.objectives, m.LD_OBJECTIVE_SELECTED));
		em = em.concat(validateListItems(ld.objectives, m.LD_OBJECTIVE_EMPTY, m.LD_OBJECTIVE_LENGTH, m.LD_OBJECTIVE_ALLOWED_CHARS));

		return _.filter(em, function(message){ return message !== null; });
		
	}

};