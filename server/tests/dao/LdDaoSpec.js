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

	it('Get all learning designs returns results', function(done) {
		var learningDesigns = LdDao.getLearningDesigns(function(err, learningDesigns){
			expect(learningDesigns).to.have.length(8);
            done();
		});
    });

    it('First learning design found is LD Demo 1', function(done) {
        var learningDesigns = LdDao.getLearningDesigns(function(err, learningDesigns){
            expect(learningDesigns[0].id).to.equal(1);
            expect(learningDesigns[0].name).to.equal('LD Demo 1');
            expect(learningDesigns[0].scope).to.equal('Lesson');
            done();
        });
    });

});	