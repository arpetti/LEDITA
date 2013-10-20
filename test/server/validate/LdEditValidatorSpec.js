var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var LdEditValidator = require('../../../server/validate/LdEditValidator');
var ValidationHelper = require('../../../server/util/ValidationHelper');
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

	describe('LD Scope', function() {

		it('Can contain letters, numbers and some special chars', function() {
			var ldScope = "123 ABC * - _ + & #";
			var results = LdEditValidator.validateLdScope(ldScope);
			expect(results).to.have.length(0);
		});

		it('Can be exactly 50 characters long', function() {
			var ldScope = TestUtils.buildString(50, 'a');
			var results = LdEditValidator.validateLdScope(ldScope);
			expect(results).to.have.length(0);
		});

		it('Cannot exceed 50 characters', function() {
			var ldScope = TestUtils.buildString(51, 'a');
			var results = LdEditValidator.validateLdScope(ldScope);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_SCOPE_LENGTH);
		});

		it('Cannot be empty', function() {
			var ldScope = "";
			var results = LdEditValidator.validateLdScope(ldScope);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_SCOPE_REQUIRED);
			expect(results[1]).to.equal(messages.LD_SCOPE_LENGTH);
			expect(results[2]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
		});

		it('Cannot be null', function() {
			var ldScope = null;
			var results = LdEditValidator.validateLdScope(ldScope);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_SCOPE_REQUIRED);
			expect(results[1]).to.equal(messages.LD_SCOPE_LENGTH);
			expect(results[2]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
		});

		it('Cannot be undefined', function() {
			var results = LdEditValidator.validateLdScope();
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_SCOPE_REQUIRED);
			expect(results[1]).to.equal(messages.LD_SCOPE_LENGTH);
			expect(results[2]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
		});

		it('Cannot contain script tags', function() {
			var ldScope = '<script>window.location("evil.com");</script>'
			var results = LdEditValidator.validateLdScope(ldScope);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
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

	describe('Topic', function() {

		it('Can contain letters and numbers', function() {
			var topic = "Topic ABC abc 1234567890";
			var results = LdEditValidator.validateTopic(topic);
			expect(results).to.have.length(0);
		});

		it('Can be exactly 255 characters long', function() {
			var topic = TestUtils.buildString(255, 'a');
			var results = LdEditValidator.validateTopic(topic);
			expect(results).to.have.length(0);
		});

		it('Cannot exceed 255 characters', function() {
			var topic = TestUtils.buildString(256, 'a');
			var results = LdEditValidator.validateTopic(topic);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_TOPIC_LENGTH);
		});

		it('Cannot be empty', function() {
			var topic = "";
			var results = LdEditValidator.validateTopic(topic);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_TOPIC_EMPTY);
			expect(results[1]).to.equal(messages.LD_TOPIC_LENGTH);
			expect(results[2]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

		it('Cannot be null', function() {
			var topic = null;
			var results = LdEditValidator.validateTopic(topic);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_TOPIC_EMPTY);
			expect(results[1]).to.equal(messages.LD_TOPIC_LENGTH);
			expect(results[2]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

		it('Cannot be undefined', function() {
			var results = LdEditValidator.validateTopic();
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_TOPIC_EMPTY);
			expect(results[1]).to.equal(messages.LD_TOPIC_LENGTH);
			expect(results[2]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

		it('Cannot contain script tags', function() {
			var topic = '<script>window.location("evil.com");</script>'
			var results = LdEditValidator.validateTopic(topic);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

		it('Cannot contain special characters', function() {
			var topic = 'Topic *&^%$#@!)(';
			var results = LdEditValidator.validateTopic(topic);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

		it('Can contain numbers', function() {
			var topic = 'Topic 123';
			var results = LdEditValidator.validateTopic(topic);
			expect(results).to.have.length(0);
		});

	});

	describe('Objective', function() {

		it('Can contain letters and numbers', function() {
			var objective = "objective ABC abc 1234567890";
			var results = LdEditValidator.validateObjective(objective);
			expect(results).to.have.length(0);
		});

		it('Can be exactly 255 characters long', function() {
			var objective = TestUtils.buildString(255, 'a');
			var results = LdEditValidator.validateObjective(objective);
			expect(results).to.have.length(0);
		});

		it('Cannot exceed 255 characters', function() {
			var objective = TestUtils.buildString(256, 'a');
			var results = LdEditValidator.validateObjective(objective);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_OBJECTIVE_LENGTH);
		});

		it('Cannot be empty', function() {
			var objective = "";
			var results = LdEditValidator.validateObjective(objective);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_OBJECTIVE_EMPTY);
			expect(results[1]).to.equal(messages.LD_OBJECTIVE_LENGTH);
			expect(results[2]).to.equal(messages.LD_OBJECTIVE_ALLOWED_CHARS);
		});

		it('Cannot be null', function() {
			var objective = null;
			var results = LdEditValidator.validateObjective(objective);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_OBJECTIVE_EMPTY);
			expect(results[1]).to.equal(messages.LD_OBJECTIVE_LENGTH);
			expect(results[2]).to.equal(messages.LD_OBJECTIVE_ALLOWED_CHARS);
		});

		it('Cannot be undefined', function() {
			var results = LdEditValidator.validateObjective();
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_OBJECTIVE_EMPTY);
			expect(results[1]).to.equal(messages.LD_OBJECTIVE_LENGTH);
			expect(results[2]).to.equal(messages.LD_OBJECTIVE_ALLOWED_CHARS);
		});

		it('Cannot contain script tags', function() {
			var objective = '<script>window.location("evil.com");</script>'
			var results = LdEditValidator.validateObjective(objective);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_OBJECTIVE_ALLOWED_CHARS);
		});

		it('Cannot contain special characters', function() {
			var objective = 'objective *&^%$#@!)(';
			var results = LdEditValidator.validateObjective(objective);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_OBJECTIVE_ALLOWED_CHARS);
		});

		it('Can contain numbers', function() {
			var objective = 'objective 123';
			var results = LdEditValidator.validateObjective(objective);
			expect(results).to.have.length(0);
		});

	});

	describe('Prerequisite', function() {

		it('Can contain letters and numbers', function() {
			var prerequisite = "prerequisite ABC abc 1234567890";
			var results = LdEditValidator.validatePrerequisite(prerequisite);
			expect(results).to.have.length(0);
		});

		it('Can be exactly 255 characters long', function() {
			var prerequisite = TestUtils.buildString(255, 'a');
			var results = LdEditValidator.validatePrerequisite(prerequisite);
			expect(results).to.have.length(0);
		});

		it('Cannot exceed 255 characters', function() {
			var prerequisite = TestUtils.buildString(256, 'a');
			var results = LdEditValidator.validatePrerequisite(prerequisite);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_PREREQ_LENGTH);
		});

		it('Cannot be empty', function() {
			var prerequisite = "";
			var results = LdEditValidator.validatePrerequisite(prerequisite);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_PREREQ_EMPTY);
			expect(results[1]).to.equal(messages.LD_PREREQ_LENGTH);
			expect(results[2]).to.equal(messages.LD_PREREQ_ALLOWED_CHARS);
		});

		it('Cannot be null', function() {
			var prerequisite = null;
			var results = LdEditValidator.validatePrerequisite(prerequisite);
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_PREREQ_EMPTY);
			expect(results[1]).to.equal(messages.LD_PREREQ_LENGTH);
			expect(results[2]).to.equal(messages.LD_PREREQ_ALLOWED_CHARS);
		});

		it('Cannot be undefined', function() {
			var results = LdEditValidator.validatePrerequisite();
			expect(results).to.have.length(3);
			expect(results[0]).to.equal(messages.LD_PREREQ_EMPTY);
			expect(results[1]).to.equal(messages.LD_PREREQ_LENGTH);
			expect(results[2]).to.equal(messages.LD_PREREQ_ALLOWED_CHARS);
		});

		it('Cannot contain script tags', function() {
			var prerequisite = '<script>window.location("evil.com");</script>'
			var results = LdEditValidator.validatePrerequisite(prerequisite);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_PREREQ_ALLOWED_CHARS);
		});

		it('Cannot contain special characters', function() {
			var prerequisite = 'prerequisite *&^%$#@!)(';
			var results = LdEditValidator.validatePrerequisite(prerequisite);
			expect(results).to.have.length(1);
			expect(results[0]).to.equal(messages.LD_PREREQ_ALLOWED_CHARS);
		});

		it('Can contain numbers', function() {
			var prerequisite = 'prerequisite 123';
			var results = LdEditValidator.validatePrerequisite(prerequisite);
			expect(results).to.have.length(0);
		});

	});

	// Mock interaction with Validator Helper since that's already been tested in great detail re: qcer
	describe('Qcer', function() {

		var sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

	    it('Returns list of single error message if validation helper returns message', function() {
	    	var qcers = {"1":false, "2":false};

	    	var vhResponse = messages.LD_QCER_SELECTED;
	    	var vhStub = sandbox.stub(ValidationHelper, "validateAtLeastOneQcer").returns(vhResponse);
	    	
	    	var results = LdEditValidator.validateQcers(qcers);
	    	expect(results).to.have.length(1);
	    	expect(results[0]).to.equal(vhResponse);
	    	assert.isTrue(vhStub.withArgs(qcers).calledOnce);
	    });

	    it('Returns empty list if validation helper returns null', function() {
	    	var qcers = {"1":false, "2":false};

	    	var vhResponse = null;
	    	var vhStub = sandbox.stub(ValidationHelper, "validateAtLeastOneQcer").returns(vhResponse);
	    	
	    	var results = LdEditValidator.validateQcers(qcers);
	    	expect(results).to.have.length(0);
	    	assert.isTrue(vhStub.withArgs(qcers).calledOnce);
	    });

	});

});