var expect = require('chai').expect;
var check = require('validator').check;
var ValidationHelper = require('../../../server/util/ValidationHelper');

describe('Validation Helper', function() {

	var alphaNumericSpecialCharsSpacesRegEx = /^[a-zA-Z0-9.,!?:;... òàùèéì@#*]+$/;
	
	describe('Check Regex', function() {

		it('Regular expression to allow alpha numeric, accented chars, numbers and spaces', function() {
			var expression = "This is ò valid Learni#ng * Desìgn N@meè 123?";
			try {
				check(expression).regex(alphaNumericSpecialCharsSpacesRegEx);
			} catch(err) {
				expect(err).to.be.null;
			}
		});

		it('Dashes are not allowed', function() {
			var expression = "This is an invalid-learning-design-name";
			try {
				check(expression).regex(alphaNumericSpecialCharsSpacesRegEx);
			} catch(err) {
				expect(err).not.to.be.null;
			}
		});

	});

	describe('Validate Any - Regex', function() {

		it('Wrapper to validation regex allows alpha numeric, special chars, numbers, spaces', function() {
			var ldName = "This is ò valid Learni#ng * Desìgn N@meè 123?";
			var ldNameInvalidMessage = "Invalid characters";
			
			var validationResult = ValidationHelper.validateAny(ValidationHelper.validateRegEx, 
				[ldName, ldNameInvalidMessage, alphaNumericSpecialCharsSpacesRegEx]);
			expect(validationResult).to.be.null;
		});

	});


});