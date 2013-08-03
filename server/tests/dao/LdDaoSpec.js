var expect = require('chai').expect
    , LdDao = require('../../dao/LdDao');

describe('Learning Design DAO', function() {    

	it('Get all learning designs returns 8 results', function(done) {
		LdDao.getLearningDesigns(function(err, learningDesigns){
			expect(learningDesigns).to.have.length(8);
            done();
		});
    });

    it('First learning design found is LD Demo 1, created by user Mario Rossi', function(done) {
        LdDao.getLearningDesigns(function(err, learningDesigns){
            expect(learningDesigns[0].ld_id).to.equal(1);
            expect(learningDesigns[0].ld_name).to.equal('LD Demo 1');
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
            expect(learningDesigns[0].ld_name).to.equal('LD Demo 1');
            expect(learningDesigns[0].ld_scope).to.equal('Lesson');
            expect(learningDesigns[0].user_name).to.equal('Mario');
            expect(learningDesigns[0].user_last_name).to.equal('Rossi');
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

});	