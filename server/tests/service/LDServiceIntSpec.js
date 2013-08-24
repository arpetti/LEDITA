// This is an integration test because the dependencies are not mocked out
// Reference for mocha-promise testing: http://architects.dzone.com/articles/functional-testing-nodejs
var expect = require('chai').expect
    , LDService = require('../../service/LDService')
    , messages = require('../../service/ValidationMessages');

describe('LD Service Integration', function() {

	it('Gets a learning design with subjects, objectives, prerequisites', function(done) {
		var learningDesignId = 1;
		LDService.getLearningDesignPromise(learningDesignId).then(function(result) {
			expect(result).to.have.length(LDService.LD_NUMBER_OF_DATA_ELEMENTS);
			
			var learningDesign = result[0];
			expect(learningDesign).to.have.length(1);
			learningDesignObj = learningDesign[0];
			expect(learningDesignObj.ld_id).to.equal(1);
            expect(learningDesignObj.ld_name).to.equal('Learning Design Title Demo 1');
            expect(learningDesignObj.ld_scope).to.equal('Lesson');
            expect(learningDesignObj.ld_students_profile).to.equal('20 studenti adolescenti di livello B1');
            expect(learningDesignObj.user_name).to.equal('Mario');
            expect(learningDesignObj.user_last_name).to.equal('Rossi');
            expect(learningDesignObj.ld_creation_date).not.to.be.null;
            expect(learningDesignObj.ld_last_edit_date).not.to.be.null;

            var subjects = result[1];
            expect(subjects).to.have.length(2);
            expect(subjects[0].subject_name).to.equal('Topic 1');
            expect(subjects[1].subject_name).to.equal('Topic 5');

            var objectives = result[2];
            expect(objectives).to.have.length(2);
            expect(objectives[0].objective_descr).to.equal('Objective 1');
            expect(objectives[1].objective_descr).to.equal('Objective 6');

            var prerequisites = result[3];
            expect(prerequisites).to.have.length(2);

            /*
            expect(results[0].prereq_name).to.equal('Objective 1');
            expect(results[0].prereq_type).to.equal('OBJECTIVE');
            expect(results[1].prereq_name).to.equal('Objective 2');
            expect(results[1].prereq_type).to.equal('OBJECTIVE');
            */
		}).then(done, done);
	});

	it('Returns empty results when learning design not found', function(done) {
		var learningDesignId = 999;
		LDService.getLearningDesignPromise(learningDesignId).then(function(result) {
			expect(result).to.have.length(LDService.LD_NUMBER_OF_DATA_ELEMENTS);
			expect(result[0]).to.have.length(0);
			expect(result[1]).to.have.length(0);
			expect(result[2]).to.have.length(0);
		}).then(done, done);
	});

});    