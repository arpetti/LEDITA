var expect = require('chai').expect;
var LdCreateValidator = require('../../../server/service/LdCreateValidator');
var messages = require('../../../server/service/ValidationMessages');
var TestUtils = require('../testutils/TestUtils');

// TODO: Ideally this would be in a module but having trouble exporting a constructor function
var LdBuilder = function() {
	var name = "This is ò valid - Learni#ng * Desìgn N@meè 123?.";
	var qcers = {
		"3": true,
		"6": false
	};
	var scope = "Lesson";
	var topics = ["Topic 1", "New Topic 45"];
	var objectives = ["Objective 1", "New Objective 76"];
	var requisites = ["Objective 2", "New Prerequisite 75"];
	var studentsDescription = "Students in a classroom";

	return {
		withName: function(anotherName) {
			name = anotherName;
			return this;
		},
		withQcers: function(anotherQcers) {
			qcers = anotherQcers;
			return this;
		},
		withScope: function(anotherScope) {
			scope = anotherScope;
			return this;
		},
		withTopics: function(anotherTopics) {
			topics = anotherTopics;
			return this;
		},
		withObjectives: function(anotherObjectives) {
			objectives = anotherObjectives;
			return this;
		},
		withRequisites: function(anotherRequisites) {
			requisites = anotherRequisites;
			return this;
		},
		withStudentsDescription: function(anotherStudentsDescription) {
			studentsDescription = anotherStudentsDescription;
			return this;
		},
		build: function() {
			return {
				name: name,
				qcers: qcers,
				scope: scope,
				topics: topics,
				objectives: objectives,
				requisites: requisites,
				studentsDescription: studentsDescription
			};
		}
	};
};

describe('Learning Design Creation Validator', function() {

	it('Valid LD gets no error messages', function() {
		var ld = new LdBuilder().build();
		var errorMessages = LdCreateValidator.validate(ld);
        expect(errorMessages).to.have.length(0);
	});

	describe('name', function() {

		it('Returns error messages if name is empty', function() {
			var ld = new LdBuilder().withName("").build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_NAME_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_NAME_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

		it('Returns error messages if name is too long', function() {
			var ld = new LdBuilder().withName(TestUtils.buildString(51, 'a')).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_NAME_LENGTH);
		});

		it('Returns error messages if name is null', function() {
			var ld = new LdBuilder().withName(null).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_NAME_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_NAME_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

		it('Returns error messages if name is undefined', function() {
			var ld = new LdBuilder().withName(undefined).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_NAME_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_NAME_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

	});

	describe('scope', function() {

		it('Returns error messages if scope is empty', function() {
			var ld = new LdBuilder().withScope("").build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_SCOPE_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_SCOPE_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
		});

		it('Returns error messages if scope is too long', function() {
			var ld = new LdBuilder().withScope(TestUtils.buildString(51, 'b')).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_SCOPE_LENGTH);
		});

		it('Returns error messages if scope is null', function() {
			var ld = new LdBuilder().withScope(null).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_SCOPE_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_SCOPE_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
		});

		it('Returns error messages if scope is undefined', function() {
			var ld = new LdBuilder().withScope(undefined).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_SCOPE_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_SCOPE_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
		});

	});

	describe('qcers', function() {

		it('Returns error message if qcers is empty', function() {
			var ld = new LdBuilder().withQcers({}).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
		});

		it('Returns error message if all qcers are false', function() {
			var ld = new LdBuilder().withQcers({"3": false, "6": false}).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
		});

		it('Returns error message if all qcers are null', function() {
			var ld = new LdBuilder().withQcers(null).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
		});

		it('Returns error message if all qcers are undefined', function() {
			var ld = new LdBuilder().withQcers(undefined).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
		});

	});

	describe('topics', function() {

		it('Returns error message if topics is empty', function() {
			var ld = new LdBuilder().withTopics([]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_TOPIC_SELECTED);
		});

		it('Returns error messages if topics is not an array', function() {
			var ld = new LdBuilder().withTopics({"a": "b"}).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(2);
	        expect(errorMessages[0]).to.equal(messages.LD_TOPIC_SELECTED);
	        expect(errorMessages[1]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

		it('Returns unique error messages if topics contain empty items', function() {
			var ld = new LdBuilder().withTopics(["", ""]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_TOPIC_EMPTY);
	        expect(errorMessages[1]).to.equal(messages.LD_TOPIC_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

		it('Returns error message if topics contain a too long item', function() {
			var ld = new LdBuilder().withTopics(["V@l1d T0p#c.", TestUtils.buildString(256, 'c')]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_TOPIC_LENGTH);
		});

		it('Topic items at exactly max length are allowed', function() {
			var ld = new LdBuilder().withTopics([
				TestUtils.buildString(255, 'd'), TestUtils.buildString(255, 'e')
			]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(0);
		});

		it('Topic items cannot start with a special character', function() {
			var ld = new LdBuilder().withTopics(["* This is bad", "This is good *"]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

	});

	describe('objectives', function() {

		it('Returns error message if objectives is empty', function() {
			var ld = new LdBuilder().withObjectives([]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_OBJECTIVE_SELECTED);
		});

		it('Returns error messages if objectives is not an array', function() {
			var ld = new LdBuilder().withObjectives({"a": "b"}).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(2);
	        expect(errorMessages[0]).to.equal(messages.LD_OBJECTIVE_SELECTED);
	        expect(errorMessages[1]).to.equal(messages.LD_OBJECTIVE_ALLOWED_CHARS);
		});

		it('Returns unique error messages if objectives contain empty items', function() {
			var ld = new LdBuilder().withObjectives(["", ""]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_OBJECTIVE_EMPTY);
	        expect(errorMessages[1]).to.equal(messages.LD_OBJECTIVE_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_OBJECTIVE_ALLOWED_CHARS);
		});

		it('Returns error message if objectives contain a too long item', function() {
			var ld = new LdBuilder().withObjectives(["V@l1d 0Bjectv30#.", TestUtils.buildString(256, 'f')]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_OBJECTIVE_LENGTH);
		});

		it('Objective items at exactly max length are allowed', function() {
			var ld = new LdBuilder().withObjectives([
				TestUtils.buildString(255, 'g'), TestUtils.buildString(255, 'h')
			]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(0);
		});

		it('Objective items cannot start with a special character', function() {
			var ld = new LdBuilder().withObjectives(["* This is bad", "This is good *"]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_OBJECTIVE_ALLOWED_CHARS);
		});

	});

	describe('prerequisites', function() {

		it('Prerequisites can be empty', function() {
			var ld = new LdBuilder().withRequisites([]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(0);
		});

		it('Returns unique error messages if prerequisites contain empty items', function() {
			var ld = new LdBuilder().withRequisites(["", ""]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_PREREQ_EMPTY);
	        expect(errorMessages[1]).to.equal(messages.LD_PREREQ_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_PREREQ_ALLOWED_CHARS);
		});

		it('Returns error message if prerequisites contain a too long item', function() {
			var ld = new LdBuilder().withRequisites(["V@l1d Pr3rq...", TestUtils.buildString(256, 'g')]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_PREREQ_LENGTH);
		});

		it('Prerequisite items at exactly max length are allowed', function() {
			var ld = new LdBuilder().withRequisites([
				TestUtils.buildString(255, 'h'), TestUtils.buildString(255, 'i')
			]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(0);
		});

		it('Prerequisite items cannot start with a special character', function() {
			var ld = new LdBuilder().withRequisites(["* This is bad", "This is good *"]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_PREREQ_ALLOWED_CHARS);
		});

	});

});