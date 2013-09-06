var expect = require('chai').expect
var ActivityDao = require('../../dao/ActivityDao');
var _ = require('underscore');

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
    			expect(results[0].org_label).to.equal('PAIR')
    			expect(results[0].dur_min).to.equal(0);
    			expect(results[0].dur_hh).to.equal(0);
    			expect(results[0].dur_dd).to.equal(15);
    			expect(results[0].dur_mon).to.equal(1);
    			expect(results[0].pract_descr).to.equal('Practical description: what to do for the execution of this activity');
    			expect(results[0].edu_descr).to.equal('Pedagogical Description: how to obtain better results and improve learning during the activity');

    			expect(results[1].level).to.equal(2);
    			expect(results[1].position).to.equal(1);
    			expect(results[1].node_name).to.equal('Group 4 Name');
    			expect(results[1].type).to.equal('ACTIVITY_GROUP');
    			expect(results[1].org_label).to.be.null;
    			expect(results[1].dur_min).to.be.null;
    			expect(results[1].dur_hh).to.be.null;
    			expect(results[1].dur_dd).to.be.null;
    			expect(results[1].dur_mon).to.be.null;
    			expect(results[1].pract_descr).to.be.null;
    			expect(results[1].edu_descr).to.be.null;

	            done();
        	});
    	});

	});

	describe('Get Groups', function() {

		it('Get Groups for multiple group ids returns results', function(done) {
			var groupids = [2, 4];
			ActivityDao.getGroups(groupids, function(err, results) {
				expect(results).to.have.length(5);
				done();
			});
		});

		it('Group information contains max position, org label and duration', function(done) {
			var groupids = [5];
			var group5ExpectedMaxPosition = 3;
			
			ActivityDao.getGroups(groupids, function(err, results) {
				expect(results).to.have.length(6);
				expect(results[0].org_label).to.equal('PAIR');
				expect(results[0].dur_min).to.equal(15);
				expect(results[0].dur_hh).to.equal(0);
				expect(results[0].dur_dd).to.equal(0);
				expect(results[0].dur_mon).to.equal(0);

				var allMaxPosAreSame = _.every(results, function(value) {
					return value.max_position === group5ExpectedMaxPosition
				});
				expect(allMaxPosAreSame).to.be.true;
				
				done();
			});
		});

		it('Groups can have both Activity and LD children', function(done) {
			var groupids = [2];
			ActivityDao.getGroups(groupids, function(err, results) {
				expect(results).to.have.length(3);

				// Verify first group child is an LD
				expect(results[0].level).to.equal(1);
				expect(results[0].position).to.equal(1);
				expect(results[0].group_child_name).to.equal('Learning Design Title Demo 7');
				expect(results[0].max_position).to.equal(2);
				expect(results[0].group_child_type).to.equal('LD');

				// Verify second group child is an ACTIVITY...
				expect(results[1].level).to.equal(2);
				expect(results[1].position).to.equal(1);
				expect(results[1].group_child_name).to.equal('Learning Activity 5');
				expect(results[1].max_position).to.equal(2);
				expect(results[1].group_child_type).to.equal('ACTIVITY');

				// Verify third group child is an ACTIVITY...
				expect(results[2].level).to.equal(2);
				expect(results[2].position).to.equal(2);
				expect(results[2].group_child_name).to.equal('Learning Activity 6');
				expect(results[2].max_position).to.equal(2);
				expect(results[2].group_child_type).to.equal('ACTIVITY');

				done();
			});
		});

	});

});