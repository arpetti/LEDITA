var expect = require('chai').expect
    , LdDao = require('../../dao/LdDao');

describe('Learning Design DAO', function() {    

	it('Get all learning designs returns 30 results', function(done) {
		LdDao.getLearningDesigns(function(err, learningDesigns){
			expect(learningDesigns).to.have.length(30);
            done();
		});
    });

    it('First learning design found is LD Demo 1, created by user Mario Rossi', function(done) {
        LdDao.getLearningDesigns(function(err, learningDesigns){
            expect(learningDesigns[0].ld_id).to.equal(1);
            expect(learningDesigns[0].ld_name).to.equal('Learning Design Title Demo 1');
            expect(learningDesigns[0].ld_scope).to.equal('Lesson');
            expect(learningDesigns[0].user_name).to.equal('Mario');
            expect(learningDesigns[0].user_last_name).to.equal('Rossi');
            done();
        });
    });

    it('Get learning design by id 1 is LD Demo 1, created by user Mario Rossi', function(done) {
        var learningDesignId = 1;
        LdDao.getLearningDesign(learningDesignId, function(err, learningDesigns){
            expect(learningDesigns).to.have.length(1);
            expect(learningDesigns[0].ld_id).to.equal(1);
            expect(learningDesigns[0].ld_name).to.equal('Learning Design Title Demo 1');
            expect(learningDesigns[0].ld_scope).to.equal('Lesson');
            expect(learningDesigns[0].ld_students_profile).to.equal('20 studenti adolescenti di livello B1');
            expect(learningDesigns[0].user_name).to.equal('Mario');
            expect(learningDesigns[0].user_last_name).to.equal('Rossi');
            expect(learningDesigns[0].ld_creation_date).not.to.be.null;
            expect(learningDesigns[0].ld_last_edit_date).not.to.be.null;
            done();
        });
    });

    it('Get learning design for id that is not found returns no results', function(done) {
        var learningDesignId = 99999;
        LdDao.getLearningDesign(learningDesignId, function(err, learningDesigns){
            expect(learningDesigns).to.have.length(0);
            done();
        });
    });

    it('Get learning design for null id returns no results', function(done) {
        var learningDesignId = null;
        LdDao.getLearningDesign(learningDesignId, function(err, learningDesigns){
            expect(learningDesigns).to.have.length(0);
            done();
        });
    });

    it('Get learning design for undefined id returns no results', function(done) {
        var learningDesignId;
        LdDao.getLearningDesign(learningDesignId, function(err, learningDesigns){
            expect(learningDesigns).to.have.length(0);
            done();
        });
    });

    it('Get learning design subjects returns results', function(done) {
        var learningDesignId = 1;
        LdDao.getLearningDesignSubjects(learningDesignId, function(err, results){
            expect(results).to.have.length(2);
            expect(results[0].ld_id).to.equal(1);
            expect(results[0].ld_name).to.equal('Learning Design Title Demo 1');
            expect(results[0].subject_id).to.equal(1);
            expect(results[0].subject_name).to.equal('Subject 1');
            expect(results[1].ld_id).to.equal(1);
            expect(results[1].ld_name).to.equal('Learning Design Title Demo 1');
            expect(results[1].subject_id).to.equal(2);
            expect(results[1].subject_name).to.equal('Subject 2');
            done();
        });
    });

    it('Get learning design subjects returns no results when LD has no subjects', function(done) {
        var learningDesignId = 9;
        LdDao.getLearningDesignSubjects(learningDesignId, function(err, results){
            expect(results).to.have.length(0);
            done();
        });
    });

});	