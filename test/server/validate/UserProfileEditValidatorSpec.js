var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fixture = require('../../../server/validate/UserProfileEditValidator');
var messages = require('../../../server/validate/ValidationMessages');
var testUtils = require('../testutils/TestUtils');

describe('User Profile Edit Validator', function() {

	describe('First Name', function() {

		it('Cannot be empty', function() {
			var firstName = '';
			var results = fixture.validateFirstName(firstName);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.FIRST_NAME_REQUIRED);
			expect(results[1]).to.equal(messages.FIRST_NAME_LENGTH);
			expect(results[2]).to.equal(messages.FIRST_NAME_ALLOWED_CHARS);
		});

		it('Cannot be null', function() {
			var firstName = null;
			var results = fixture.validateFirstName(firstName);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.FIRST_NAME_REQUIRED);
			expect(results[1]).to.equal(messages.FIRST_NAME_LENGTH);
			expect(results[2]).to.equal(messages.FIRST_NAME_ALLOWED_CHARS);
		});

		it('Cannot be less than 2 characters', function() {
			var firstName = 'a';
			var results = fixture.validateFirstName(firstName);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.FIRST_NAME_LENGTH);
		});

		it('Cannot be more than 20 characters', function() {
			var firstName = testUtils.buildString(21, 'a');
			var results = fixture.validateFirstName(firstName);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.FIRST_NAME_LENGTH);
		});

		it('Can be exactly 20 characters', function() {
			var firstName = testUtils.buildString(20, 'a');
			var results = fixture.validateFirstName(firstName);
			expect(results).to.have.length(0);
		});

		it('Can be between 2 and 20 characters, all alpha chars', function() {
			var firstName = 'Johnny';
			var results = fixture.validateFirstName(firstName);
			expect(results).to.have.length(0);
		});

		it('Cannot be numeric', function() {
			var firstName = 'Johnny5';
			var results = fixture.validateFirstName(firstName);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.FIRST_NAME_ALLOWED_CHARS);
		});

	});

});