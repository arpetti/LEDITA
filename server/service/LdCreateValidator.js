var ValidationHelper = require('../util/ValidationHelper');
var messages = require('./ValidationMessages');
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
		return messages.LD_QCER_SELECTED;
	};
	var selectedQcers = _.filter(_.values(qcers), function(qcer){ return qcer; });
	if (selectedQcers.length === 0) {
		return messages.LD_QCER_SELECTED;
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

var validateTopic = function(topic) {
	var message1 = ValidationHelper.validateAny(ValidationHelper.validateNullEmpty, [topic, messages.LD_TOPIC_EMPTY]);	
	var message2 = ValidationHelper.validateAny(ValidationHelper.validateLength, [topic, messages.LD_TOPIC_LENGTH, 1, 255]);
	var message3 = ValidationHelper.validateAny(ValidationHelper.validateRegEx, 
			[topic, messages.LD_TOPIC_ALLOWED_CHARS, ValidationHelper.FIRST_ALPHANUMERIC_REST_ANY_CHAR]);
	return [message1, message2, message3];
};

var validateTopics = function(topics) {
	var topicMessages = _.map(topics, function(topic){ return validateTopic(topic); });
	var cleanTopicMessages = _.uniq(_.compact(_.flatten(topicMessages)));
	return cleanTopicMessages;
};

module.exports = {

	validate: function(ld) {

		var errorMessages = [];

		// Name
		errorMessages.push(
			ValidationHelper.validateAny(ValidationHelper.validateNullEmpty, [ld.name, messages.LD_NAME_REQUIRED]));
		errorMessages.push(
			ValidationHelper.validateAny(ValidationHelper.validateLength, [ld.name, messages.LD_NAME_LENGTH, 1, 50]));
		errorMessages.push(
			ValidationHelper.validateAny(ValidationHelper.validateRegEx, 
				[ld.name, messages.LD_NAME_ALLOWED_CHARS, ValidationHelper.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));

		// Qcer
		errorMessages.push(atLeastOneQcer(ld.qcers));

		// Scope
		errorMessages.push(
			ValidationHelper.validateAny(ValidationHelper.validateNullEmpty, [ld.scope, messages.LD_SCOPE_REQUIRED]));
		errorMessages.push(
			ValidationHelper.validateAny(ValidationHelper.validateLength, [ld.scope, messages.LD_SCOPE_LENGTH, 1, 50]));
		errorMessages.push(
			ValidationHelper.validateAny(ValidationHelper.validateRegEx, 
				[ld.scope, messages.LD_SCOPE_ALLOWED_CHARS, ValidationHelper.FIRST_ALPHANUMERIC_REST_ANY_CHAR]));

		// Topics
		errorMessages.push(atLeastOneItemInList(ld.topics, messages.LD_TOPIC_SELECTED));
		errorMessages = errorMessages.concat(validateTopics(ld.topics));

		return _.filter(errorMessages, function(message){ return message !== null; });
		
	}

};