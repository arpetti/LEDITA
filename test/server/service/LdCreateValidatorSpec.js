var expect = require('chai').expect;
var LdBuilder = require('../builder/LdBuilder');
var LdCreateValidator = require('../../../server/service/LdCreateValidator');
var messages = require('../../../server/service/ValidationMessages');

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
				scope: scope
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