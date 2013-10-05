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
	}
	return null;
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

		return _.filter(errorMessages, function(message){ return message !== null; });
		
	}

};