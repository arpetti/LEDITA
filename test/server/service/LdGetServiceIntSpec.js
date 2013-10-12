// This is an integration test because the dependencies are not mocked out
// Reference for mocha-promise testing: http://architects.dzone.com/articles/functional-testing-nodejs
var expect = require('chai').expect
var LdGetService = require('../../../server/service/LdGetService');
var LdDao = require('../../../server/dao/LdDao');
var messages = require('../../../server/validate/ValidationMessages');
var _ = require('underscore');

describe('LD Service Integration', function() {

	it('Gets all learning designs with qcers', function(done) {
		LdGetService.getAllLearningDesigns(function(err, result, message) {
			expect(err).to.be.null;
			expect(message).to.be.null;
			expect(result).to.have.length(23);

			var ldDemo1 = _.findWhere(result, {
				ld_id: 1
			});
			expect(ldDemo1.ld_name).to.equal('Learningà Designè Titleì Demoò 1ù é');
			expect(ldDemo1.ld_publication).to.equal(LdDao.LD_PUBLIC_INDICATOR);
			expect(ldDemo1.qcers).to.have.length(2);
			expect(ldDemo1.qcers[0].qcer_name).to.equal('A1');
			expect(ldDemo1.qcers[1].qcer_name).to.equal('A2');

			done();
		});
	});

	it('Gets a learning design with subjects, objectives, prerequisites, qcers', function(done) {
		var learningDesignId = 1;
		LdGetService.getLearningDesignPromise(learningDesignId).then(function(result) {
			expect(result).to.have.length(LdGetService.LD_NUMBER_OF_DATA_ELEMENTS);

			var learningDesign = result[0];
			expect(learningDesign).to.have.length(1);
			learningDesignObj = learningDesign[0];
			expect(learningDesignObj.ld_id).to.equal(1);
			expect(learningDesignObj.ld_name).to.equal('Learningà Designè Titleì Demoò 1ù é');
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

			var qcers = result[4];
			expect(qcers).to.have.length(2);
			expect(qcers[0].qcer_name).to.equal('A1');
			expect(qcers[1].qcer_name).to.equal('A2');
		}).then(done, done);
	});

	it('Returns empty results when learning design not found', function(done) {
		var learningDesignId = 999;
		LdGetService.getLearningDesignPromise(learningDesignId).then(function(result) {
			expect(result).to.have.length(LdGetService.LD_NUMBER_OF_DATA_ELEMENTS);
			expect(result[0]).to.have.length(0);
			expect(result[1]).to.have.length(0);
			expect(result[2]).to.have.length(0);
		}).then(done, done);
	});

	describe('Get Learning Design User ID', function() {

		it('Calls back with true if user is owner of LD', function(done) {
			var learningDesignId = 4;
			var userId = 3;
			LdGetService.isLdOwnedByUser(learningDesignId, userId, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.be.true;
				done();
			});
		});

		it('Calls back with false if user is not owner of LD', function(done) {
			var learningDesignId = 4;
			var userId = 1;
			LdGetService.isLdOwnedByUser(learningDesignId, userId, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.be.false;
				done();
			});
		});

	});

});