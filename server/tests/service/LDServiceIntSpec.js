// This is an integration test because the dependencies are not mocked out

var expect = require('chai').expect
    , LDService = require('../../service/LDService')
    , messages = require('../../service/ValidationMessages');

describe('LD Service Integration', function() {

	it('Gets a learning design with subjects', function(done) {
		var learningDesignId = 1;
		LDService.getLearningDesignDetail(learningDesignId, function(err, message, learningDesignDetail) {
			expect(err).to.be.null;
			expect(message).to.be.null;
			expect(learningDesignDetail.ld_id).to.equal(1);
            expect(learningDesignDetail.ld_name).to.equal('Learning Design Title Demo 1');
            expect(learningDesignDetail.ld_scope).to.equal('Lesson');
            expect(learningDesignDetail.ld_students_profile).to.equal('20 studenti adolescenti di livello B1');
            expect(learningDesignDetail.user_name).to.equal('Mario');
            expect(learningDesignDetail.user_last_name).to.equal('Rossi');
            expect(learningDesignDetail.ld_creation_date).not.to.be.null;
            expect(learningDesignDetail.ld_last_edit_date).not.to.be.null;
            expect(learningDesignDetail.subjects).to.have.length(2);
            expect(learningDesignDetail.subjects[0].subject_name).to.equal('Subject 1');
            expect(learningDesignDetail.subjects[1].subject_name).to.equal('Subject 2');
			done();
		});
	});

	it('Gets a learning design with no subjects', function(done) {
		var learningDesignId = 9;
		LDService.getLearningDesignDetail(learningDesignId, function(err, message, learningDesignDetail) {
			expect(err).to.be.null;
			expect(message).to.be.null;
			expect(learningDesignDetail.ld_id).to.equal(9);
            expect(learningDesignDetail.ld_name).to.equal('Learning Design Title Demo 9');
            expect(learningDesignDetail.ld_scope).to.equal('Lesson');
            expect(learningDesignDetail.ld_students_profile).to.equal('20 studenti adolescenti di livello B1');
            expect(learningDesignDetail.user_name).to.equal('Mario');
            expect(learningDesignDetail.user_last_name).to.equal('Rossi');
            expect(learningDesignDetail.ld_creation_date).not.to.be.null;
            expect(learningDesignDetail.ld_last_edit_date).not.to.be.null;
            expect(learningDesignDetail.subjects).to.have.length(0);
			done();
		});
	});

	it('Returns an error message when learning design not found', function(done) {
		var learningDesignId = -999;
		LDService.getLearningDesignDetail(learningDesignId, function(err, message, learningDesignDetail) {
			expect(err).to.be.null;
			expect(message).to.equal(messages.LD_NOT_FOUND)
			expect(learningDesignDetail).to.be.null;
			done();
		});
	});

});    