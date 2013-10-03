var validationHelper = require('../util/ValidationHelper');
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

var alphaNumericSpecialCharsSpacesRegEx = /^[a-zA-Z0-9.,!?:;... òàùèéì@#*]+$/;

module.exports = {

	validate: function(ld) {

		var errorMessages = [];

		// Name
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateNullEmpty, [ld.name, messages.LD_NAME_REQUIRED]));
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateLength, [ld.name, messages.LD_NAME_LENGTH, 1, 50]));
		errorMessages.push(
			validationHelper.validateAny(validationHelper.validateRegEx, 
				[ld.name, messages.LD_NAME_ALLOWED_CHARS, alphaNumericSpecialCharsSpacesRegEx]));

		return _.filter(errorMessages, function(message){ return message !== null; });
		
	}

};