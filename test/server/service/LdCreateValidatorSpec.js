var expect = require('chai').expect;
var LdCreateValidator = require('../../../server/service/LdCreateValidator');
var messages = require('../../../server/service/ValidationMessages');

describe('Learning Design Creation Validator', function() {

	it('Valid LD gets no error messages', function() {
		var ld = {
			name: "This is ò valid Learni#ng * Desìgn N@meè 123?.",
    		qcers: {"3": true, "6": true},
    		scope: "Lesson",
    		topics: ["Topic 1", "New Topic 45"],
    		objectives: ["Objective 1", "New Objective 76"],
    		requisites: ["Objective 2", "New Prerequisite 75"],
    		studentsDescription: "Students Description From Integration Test"
		};

		var errorMessages = LdCreateValidator.validate(ld);
        expect(errorMessages).to.have.length(0);
	});
});