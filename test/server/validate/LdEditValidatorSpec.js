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

		it('Can be exactly 50 characters long', function() {
			var ldName = TestUtils.buildString(50, 'a');
			var results = LdEditValidator.validateLdName(ldName);
			expect(results).to.have.length(0);
		});

		it('Cannot exceed 50 characters', function() {
			var ldName = TestUtils.buildString(51, 'a');
			var results = LdEditValidator.validateLdName(ldName);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_NAME_LENGTH);
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

	describe('Students Description', function() {

		it('Can contain letters, numbers and some special chars', function() {
			var studentsDescr = "123 ABC * - _ + & #";
			var results = LdEditValidator.validateStudentsDescr(studentsDescr);
			expect(results).to.have.length(0);
		});

		it('Can be exactly 500 characters long', function() {
			var studentsDescr = TestUtils.buildString(500, 'b');
			var results = LdEditValidator.validateStudentsDescr(studentsDescr);
			expect(results).to.have.length(0);
		});

		it('Cannot exceed 500 characters', function() {
			var studentsDescr = TestUtils.buildString(501, 'a');
			var results = LdEditValidator.validateStudentsDescr(studentsDescr);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_STUDENTS_DESC_LENGTH);
		});

		it('Cannot be empty', function() {
			var studentsDescr = "";
			var results = LdEditValidator.validateStudentsDescr(studentsDescr);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_STUDENTS_DESC_REQUIRED);
			expect(results[1]).to.equal(messages.LD_STUDENTS_DESC_LENGTH);
			expect(results[2]).to.equal(messages.LD_STUDENTS_DESC_ALLOWED_CHARS);
		});

		it('Cannot be null', function() {
			var studentsDescr = null;
			var results = LdEditValidator.validateStudentsDescr(studentsDescr);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_STUDENTS_DESC_REQUIRED);
			expect(results[1]).to.equal(messages.LD_STUDENTS_DESC_LENGTH);
			expect(results[2]).to.equal(messages.LD_STUDENTS_DESC_ALLOWED_CHARS);
		});

		it('Cannot be undefined', function() {
			var results = LdEditValidator.validateStudentsDescr();
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_STUDENTS_DESC_REQUIRED);
			expect(results[1]).to.equal(messages.LD_STUDENTS_DESC_LENGTH);
			expect(results[2]).to.equal(messages.LD_STUDENTS_DESC_ALLOWED_CHARS);
		});

		it('Cannot contain script tags', function() {
			var studentsDescr = '<script>window.location("evil.com");</script>'
			var results = LdEditValidator.validateStudentsDescr(studentsDescr);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_STUDENTS_DESC_ALLOWED_CHARS);
		});

	});

});