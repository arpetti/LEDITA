// This is an integration test because the dependencies are not mocked out
var expect = require('chai').expect;
var ActivityService = require('../../service/ActivityService');
var messages = require('../../service/ValidationMessages');
var _ = require('underscore');

describe('Activity Service Integration', function() {

	it('Returns activity structure for Learning Design 2', function(done) {
		var ldid = 2;
		ActivityService.getLDActivityStructure(ldid, function(err, result, message){
                  expect(err).to.be.null;
                  expect(message).to.be.null;

                  expect(_.keys(result)).to.have.length(4); // 4 levels
                  
                  expect(result[1]).to.have.length(2); // Level 1 has 2 Nodes
                  expect(result[1][0].type).to.equal('ACTIVITY_GROUP'); // Level 1 first node is activity group
                  expect(result[1][0].max_position).to.equal(1);
                  expect(result[1][0].node_name).to.be.null; // Level 1 first node activity group has no name
                  
                  expect(_.keys(result[1][0].children)).to.have.length(2); // Level 1 first node activity group has 2 levels of children
                  expect(result[1][0].children[1]).to.have.length(1); // First level of children has 1 activity
                  
                  expect(result[1][0].children[1][0].group_child_name).to.equal('Learning Activity 5');
                  expect(result[1][0].children[1][0].org_label).to.equal('INDIVIDUAL');	
                  expect(result[1][0].children[1][0].dur_min).to.equal(15);
                  expect(result[1][0].children[1][0].dur_hh).to.equal(0);
                  expect(result[1][0].children[1][0].dur_dd).to.equal(0);
                  expect(result[1][0].children[1][0].dur_mon).to.equal(0);
                  expect(result[1][0].children[1][0].modality).to.equal('Face to face');
                  
                  expect(result[1][0].children[2]).to.have.length(1); // Second level of children has 1 activity
                  expect(result[1][0].children[2][0].group_child_name).to.equal('Learning Activity 6');	

                  expect(result[1][1].type).to.equal('ACTIVITY_GROUP'); // Level 1 second node is activity group
                  expect(result[1][1].node_name).to.equal('Group 3 Name'); // Level 1 second node activity group name

                  expect(result[2][0].type).to.equal('ACTIVITY') // Level 2 first node is ACTIVITY
                  expect(result[2][0].node_name).to.equal('Support Activity 2');
                  expect(result[2][0].org_label).to.equal('INDIVIDUAL');
                  expect(result[2][0].dur_min).to.equal(0);
                  expect(result[2][0].dur_hh).to.equal(0);
                  expect(result[2][0].dur_dd).to.equal(15);
                  expect(result[2][0].dur_mon).to.equal(1);
                  expect(result[2][0].pract_descr).to.equal('Practical description: what to do for the execution of this activity');
                  expect(result[2][0].edu_descr).to.equal('Pedagogical Description: how to obtain better results and improve learning during the activity');
                  expect(result[2][0].modality).to.equal('Online');

      		done();
		});
	});

      it('Returns no results for Learning Design that has no structure defined', function(done) {
            var ldid = 10;
            ActivityService.getLDActivityStructure(ldid, function(err, result, message) {
                  expect(err).to.be.null;
                  expect(result).to.be.null;
                  expect(message).to.equal(messages.NO_LD_NODES_FOUND);
                  done();
            });
      });

});