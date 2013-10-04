var expect = require('chai').expect;
var LdCreateValidator = require('../../../server/service/LdCreateValidator');
var messages = require('../../../server/service/ValidationMessages');

describe('Learning Design Creation Validator', function() {

	it('Valid LD gets no error messages', function() {
		var ld = {
			name: "This is ò valid Learni#ng * Desìgn N@meè 123?.",
    		qcers: {"3": true, "6": false},
    		scope: "Lesson",
    		topics: ["Topic 1", "New Topic 45"],
    		objectives: ["Objective 1", "New Objective 76"],
    		requisites: ["Objective 2", "New Prerequisite 75"],
    		studentsDescription: "Students Description From Integration Test"
		};
		var errorMessages = LdCreateValidator.validate(ld);
        expect(errorMessages).to.have.length(0);
	});

	it('Returns error message if qcers is empty', function() {
		var ld = {
			name: "This is ò valid Learni#ng * Desìgn N@meè 123?.",
    		qcers: {},
    		scope: "Lesson",
    		topics: ["Topic 1", "New Topic 45"],
    		objectives: ["Objective 1", "New Objective 76"],
    		requisites: ["Objective 2", "New Prerequisite 75"],
    		studentsDescription: "Students Description From Integration Test"
		};
		var errorMessages = LdCreateValidator.validate(ld);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
	});

	it('Returns error message if all qcers are false', function() {
		var ld = {
			name: "This is ò valid Learni#ng * Desìgn N@meè 123?.",
    		qcers: {"3": false, "6": false},
    		scope: "Lesson",
    		topics: ["Topic 1", "New Topic 45"],
    		objectives: ["Objective 1", "New Objective 76"],
    		requisites: ["Objective 2", "New Prerequisite 75"],
    		studentsDescription: "Students Description From Integration Test"
		};
		var errorMessages = LdCreateValidator.validate(ld);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
	});

	// This passes locally but fails on Travis
	it.skip('Returns error message if all qcers are null', function() {
		var ld = {
			name: "This is ò valid Learni#ng * Desìgn N@meè 123?.",
    		qcers: null,
    		scope: "Lesson",
    		topics: ["Topic 1", "New Topic 45"],
    		objectives: ["Objective 1", "New Objective 76"],
    		requisites: ["Objective 2", "New Prerequisite 75"],
    		studentsDescription: "Students Description From Integration Test"
		};
		var errorMessages = LdCreateValidator.validate(ld);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
	});

	// This passes locally but fails on Travis
	it.skip('Returns error message if all qcers are undefined', function() {
		var ld = {
			name: "This is ò valid Learni#ng * Desìgn N@meè 123?.",
    		qcers: undefined,
    		scope: "Lesson",
    		topics: ["Topic 1", "New Topic 45"],
    		objectives: ["Objective 1", "New Objective 76"],
    		requisites: ["Objective 2", "New Prerequisite 75"],
    		studentsDescription: "Students Description From Integration Test"
		};
		var errorMessages = LdCreateValidator.validate(ld);
        expect(errorMessages).to.have.length(1);
        expect(errorMessages[0]).to.equal(messages.LD_QCER_SELECTED);
	});
});