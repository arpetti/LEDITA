var expect = require('chai').expect
    , ActivityDao = require('../../dao/ActivityDao');

describe('Activity DAO', function() {   

	describe('Get LD Activities', function() {

		it('Get LD Activities returns results', function(done) {
			var ldid = 3;
    		ActivityDao.getLdActivities(ldid, function(err, activities){
    			expect(activities).to.have.length(6);
	            // expect(learningDesigns[0].ld_id).to.equal(1);
	            // expect(learningDesigns[0].ld_name).to.equal('Learning Design Title Demo 1');
	            // expect(learningDesigns[0].ld_scope).to.equal('Lesson');
	            // expect(learningDesigns[0].user_name).to.equal('Mario');
	            // expect(learningDesigns[0].user_last_name).to.equal('Rossi');
	            done();
        	});
    	});

	});

});