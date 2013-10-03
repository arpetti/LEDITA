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

		return _.filter(errorMessages, function(message){ return message !== null; });
		
	}

};