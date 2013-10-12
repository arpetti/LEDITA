var expect = require('chai').expect;
var LdEditValidator = require('../../../server/validate/LdEditValidator');
var messages = require('../../../server/validate/ValidationMessages');
var TestUtils = require('../testutils/TestUtils');

describe('LD Edit Validation', function() {

	describe('LD Name', function() {

		it('Can contain letters, numbers and some special chars', function() {
			var ldName = "123 ABC * - _ + & #";
			var results = LdEditValidator.validateLdName(ldName);
			expect(results).to.have.length(0);
		});

		it('Cannot be empty', function() {
			var ldName = "";
			var results = LdEditValidator.validateLdName(ldName);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_NAME_REQUIRED);
			expect(results[1]).to.equal(messages.LD_NAME_LENGTH);
			expect(results[2]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

		it('Cannot be null', function() {
			var ldName = null;
			var results = LdEditValidator.validateLdName(ldName);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_NAME_REQUIRED);
			expect(results[1]).to.equal(messages.LD_NAME_LENGTH);
			expect(results[2]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

		it('Cannot be undefined', function() {
			var results = LdEditValidator.validateLdName();
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_NAME_REQUIRED);
			expect(results[1]).to.equal(messages.LD_NAME_LENGTH);
			expect(results[2]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

		it('Cannot contain script tags', function() {
			var ldName = '<script>window.location("evil.com");</script>'
			var results = LdEditValidator.validateLdName(ldName);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

	});

});