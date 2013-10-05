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
		var builder = new LdBuilder();
		var ld = builder.build();
		var errorMessages = LdCreateValidator.validate(ld);
        expect(errorMessages).to.have.length(0);
	});

	describe('name', function() {

		it('Returns error messages if name is empty', function() {
			var builder = new LdBuilder();
			var ld = builder.withName("").build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_NAME_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_NAME_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

		it('Returns error messages if name is too long', function() {
			var builder = new LdBuilder();
			var ld = builder.withName(TestUtils.buildString(51, 'a')).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_NAME_LENGTH);
		});

		it('Returns error messages if name is null', function() {
			var builder = new LdBuilder();
			var ld = builder.withName(null).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_NAME_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_NAME_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

		it('Returns error messages if name is undefined', function() {
			var builder = new LdBuilder();
			var ld = builder.withName(undefined).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_NAME_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_NAME_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_NAME_ALLOWED_CHARS);
		});

	});

	describe('scope', function() {

		it('Returns error messages if scope is empty', function() {
			var builder = new LdBuilder();
			var ld = builder.withScope("").build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_SCOPE_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_SCOPE_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
		});

		it('Returns error messages if scope is too long', function() {
			var builder = new LdBuilder();
			var ld = builder.withScope(TestUtils.buildString(51, 'b')).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_SCOPE_LENGTH);
		});

		it('Returns error messages if scope is null', function() {
			var builder = new LdBuilder();
			var ld = builder.withScope(null).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_SCOPE_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_SCOPE_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
		});

		it('Returns error messages if scope is undefined', function() {
			var builder = new LdBuilder();
			var ld = builder.withScope(undefined).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_SCOPE_REQUIRED);
	        expect(errorMessages[1]).to.equal(messages.LD_SCOPE_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_SCOPE_ALLOWED_CHARS);
		});

	});

	describe('qcers', function() {

		it('Returns error message if qcers is empty', function() {
			var builder = new LdBuilder();
			var ld = builder.withQcers({}).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
		});

		it('Returns error message if all qcers are false', function() {
			var builder = new LdBuilder();
			var ld = builder.withQcers({"3": false, "6": false}).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
		});

		it('Returns error message if all qcers are null', function() {
			var builder = new LdBuilder();
			var ld = builder.withQcers(null).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
		});

		it('Returns error message if all qcers are undefined', function() {
			var builder = new LdBuilder();
			var ld = builder.withQcers(undefined).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
		});

	});

	describe('topics', function() {

		it('Returns error message if topics is empty', function() {
			var builder = new LdBuilder();
			var ld = builder.withTopics([]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_TOPIC_SELECTED);
		});

		it('Returns error message if topics is not an array', function() {
			var builder = new LdBuilder();
			var ld = builder.withTopics({"a": "b"}).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(2);
	        expect(errorMessages[0]).to.equal(messages.LD_TOPIC_SELECTED);
	        expect(errorMessages[1]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

		it('Returns unique error messages if topics contain empty topics', function() {
			var builder = new LdBuilder();
			var ld = builder.withTopics(["", ""]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(3);
	        expect(errorMessages[0]).to.equal(messages.LD_TOPIC_EMPTY);
	        expect(errorMessages[1]).to.equal(messages.LD_TOPIC_LENGTH);
	        expect(errorMessages[2]).to.equal(messages.LD_TOPIC_ALLOWED_CHARS);
		});

		it('Returns error message if topics contain a too long topic', function() {
			var builder = new LdBuilder();
			var ld = builder.withTopics(["V@l1d T0p#c.", TestUtils.buildString(256, 'c')]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(1);
	        expect(errorMessages[0]).to.equal(messages.LD_TOPIC_LENGTH);
		});

		it('Topics at exactly max length are allowed', function() {
			var builder = new LdBuilder();
			var ld = builder.withTopics([
				TestUtils.buildString(255, 'd'), TestUtils.buildString(255, 'e')
			]).build();
			var errorMessages = LdCreateValidator.validate(ld);
	        expect(errorMessages).to.have.length(0);
		});

	});

});