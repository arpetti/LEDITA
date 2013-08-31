var expect = require('chai').expect
    , ActivityDao = require('../../dao/ActivityDao');

describe('Activity DAO', function() {   

	describe('Get LD Nodes', function() {

		it('Get LD Nodes returns results', function(done) {
			var ldid = 3;
    		ActivityDao.getLdNodes(ldid, function(err, results) {
    			expect(results).to.have.length(6);
    			
    			expect(results[0].level).to.equal(1);
    			expect(results[0].position).to.equal(1);
    			expect(results[0].node_name).to.equal('Support Activity 3');
    			expect(results[0].type).to.equal('ACTIVITY');
	            
    			expect(results[1].level).to.equal(2);
    			expect(results[1].position).to.equal(1);
    			expect(results[1].node_name).to.equal('Group 4 Name');
    			expect(results[1].type).to.equal('ACTIVITY_GROUP');

	            done();
        	});
    	});

	});

	describe('Get Activity Groups', function() {

		it('Get Activity Groups for multiple activity group ids returns results', function(done) {
			var groupids = [2, 4];
			ActivityDao.getActivityGroups(groupids, function(err, results) {
				expect(results).to.have.length(4);
				done();
			});
		});

	});

});