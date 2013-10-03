var expect = require('chai').expect;
var check = require('validator').check;
var ValidationHelper = require('../../../server/util/ValidationHelper');

describe('Validation Helper', function() {

	describe('Check Regex', function() {

		it('Regular expression to allow alpha numeric, accented chars, numbers and spaces', function() {
			var expression = "This is ò valid Learni#ng * Desìgn N@meè 123?";
			try {
				check(expression).regex(ValidationHelper.FIRST_ALPHANUMERIC_REST_ANY_CHAR);
			} catch(err) {
				expect(err).to.be.null;
			}
		});

		it('First character cannot be a special character', function() {
			var expression = "* This is not allowed";
			try {
				check(expression).regex(ValidationHelper.FIRST_ALPHANUMERIC_REST_ANY_CHAR);
			} catch(err) {
				expect(err).not.to.be.null;
			}
		});

		it('Dashes are allowed', function() {
			var expression = "this-is-a-valid-learning-design-name";
			try {
				check(expression).regex(ValidationHelper.FIRST_ALPHANUMERIC_REST_ANY_CHAR);
			} catch(err) {
				expect(err).to.be.null;
			}
		});

	});

	describe('Validate Any - Regex', function() {

		it('Wrapper to validation regex allows alpha numeric, special chars, numbers, spaces', function() {
			var ldName = "This is ò valid Learni#ng * Desìgn N@meè 123?";
			var ldNameInvalidMessage = "Invalid characters";
			
			var validationResult = ValidationHelper.validateAny(ValidationHelper.validateRegEx, 
				[ldName, ldNameInvalidMessage, ValidationHelper.FIRST_ALPHANUMERIC_REST_ANY_CHAR]);
			expect(validationResult).to.be.null;
		});

	});


});