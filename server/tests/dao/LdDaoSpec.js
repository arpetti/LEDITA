var expect = require('chai').expect
    , sinon = require('sinon')
    , LdDao = require('../../dao/LdDao');

describe('Learning Design DAO', function() {    

	var req = { }
        , res = {}
        , next = {}
        , sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

	it('Get all learning designs returns 8 results', function(done) {
		var learningDesigns = LdDao.getLearningDesigns(function(err, learningDesigns){
			expect(learningDesigns).to.have.length(8);
            done();
		});
    });

    it('First learning design found is LD Demo 1, created by user Mario Rossi', function(done) {
        var learningDesigns = LdDao.getLearningDesigns(function(err, learningDesigns){
            expect(learningDesigns[0].ld_id).to.equal(1);
            expect(learningDesigns[0].ld_name).to.equal('LD Demo 1');
            expect(learningDesigns[0].ld_scope).to.equal('Lesson');
            expect(learningDesigns[0].user_name).to.equal('Mario');
            expect(learningDesigns[0].user_last_name).to.equal('Rossi');
            done();
        });
    });

});	