var expect = require('chai').expect
    , ActivityDao = require('../../dao/ActivityDao');

describe('Activity DAO', function() {   

	describe('Get LD Activities', function() {

		it('Get LD Activities returns results', function(done) {
			var ldid = 3;
    		ActivityDao.getLdActivities(ldid, function(err, activities){
    			expect(activities).to.have.length(6);
    			
    			expect(activities[0].level).to.equal(1);
    			expect(activities[0].position).to.equal(1);
    			expect(activities[0].target_name).to.equal('Support Activity 3');
    			expect(activities[0].type).to.equal('ACTIVITY');
	            
    			expect(activities[5].level).to.equal(2);
    			expect(activities[5].position).to.equal(1);
    			expect(activities[5].target_name).to.equal('Group 4 Name');
    			expect(activities[5].type).to.equal('ACTIVITY_GROUP');

	            done();
        	});
    	});

	});

});