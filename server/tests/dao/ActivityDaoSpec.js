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
    			expect(results[0].scope).to.be.null;
    			expect(results[0].type).to.equal('ACTIVITY');
    			expect(results[0].org_label).to.equal('PAIR')
    			expect(results[0].dur_min).to.equal(0);
    			expect(results[0].dur_hh).to.equal(0);
    			expect(results[0].dur_dd).to.equal(15);
    			expect(results[0].dur_mon).to.equal(1);
    			expect(results[0].pract_descr).to.equal('Practical description: what to do for the execution of this activity');
    			expect(results[0].edu_descr).to.equal('Pedagogical Description: how to obtain better results and improve learning during the activity');
    			expect(results[0].modality).to.equal('Online');

    			expect(results[1].level).to.equal(2);
    			expect(results[1].position).to.equal(1);
    			expect(results[1].node_name).to.equal('Group 4 Name');
    			expect(results[0].scope).to.be.null;
    			expect(results[1].type).to.equal('ACTIVITY_GROUP');
    			expect(results[1].org_label).to.be.null;
    			expect(results[1].dur_min).to.be.null;
    			expect(results[1].dur_hh).to.be.null;
    			expect(results[1].dur_dd).to.be.null;
    			expect(results[1].dur_mon).to.be.null;
    			expect(results[1].pract_descr).to.be.null;
    			expect(results[1].edu_descr).to.be.null;
    			expect(results[1].modality).to.be.null;

	            done();
        	});
    	});

		it('Get LD Nodes can contain other LDs', function(done) {
			var ldid = 1;
			ActivityDao.getLdNodes(ldid, function(err, results) {
				expect(results).to.have.length(7);
				expect(results[4].type).to.equal('LD');
				expect(results[4].scope).to.equal('Module');
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
				expect(results[0].scope).to.equal('Lesson');

				// Verify second group child is an ACTIVITY...
				expect(results[1].level).to.equal(2);
				expect(results[1].position).to.equal(1);
				expect(results[1].group_child_name).to.equal('Learning Activity 5');
				expect(results[1].max_position).to.equal(2);
				expect(results[1].group_child_type).to.equal('ACTIVITY');
				expect(results[1].scope).to.be.null;

				// Verify third group child is an ACTIVITY...
				expect(results[2].level).to.equal(2);
				expect(results[2].position).to.equal(2);
				expect(results[2].group_child_name).to.equal('Learning Activity 6');
				expect(results[2].max_position).to.equal(2);
				expect(results[2].group_child_type).to.equal('ACTIVITY');
				expect(results[2].scope).to.be.null;

				done();
			});
		});

	});

	describe('Get Activity Details', function() {

		it('Gets technologies and resources', function(done) {
			var activityids = [2, 3];
			ActivityDao.getActivityDetails(activityids, function(err, results) {
				expect(err).to.be.null;
				
				// results are in 2 sections: technology, and resource
				expect(_.keys(results)).to.have.length(2); 
				expect(_.has(results, 'technology'));
				expect(_.has(results, 'resource'));

				// verify technology section
				var tech = results.technology;
				expect(tech).to.have.length(3);
				
				expect(tech[0].activity_id).to.equal(2);
				expect(tech[0].activity_name).to.equal('Learning Activity 2');
				expect(tech[0].technology_name).to.equal('PC');

				expect(tech[1].activity_id).to.equal(2);
				expect(tech[1].activity_name).to.equal('Learning Activity 2');
				expect(tech[1].technology_name).to.equal('Smartphone');
				
				expect(tech[2].activity_id).to.equal(3);
				expect(tech[2].activity_name).to.equal('Learning Activity 3');
				expect(tech[2].technology_name).to.equal('Whiteboard');

				// verify resource section
				var resource = results.resource;
				expect(resource).to.have.length(1);

				expect(resource[0].activity_id).to.equal(2);
				expect(resource[0].resource_name).to.equal('Didactical resource name 2');
				expect(resource[0].resource_type).to.equal('document');
				
				done();
			});
		});

	});

});