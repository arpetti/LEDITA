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
                  expect(result[1][0].children[2]).to.have.length(1); // Second level of children has 1 activity
                  expect(result[1][0].children[2][0].group_child_name).to.equal('Learning Activity 6');	

                  expect(result[1][1].type).to.equal('ACTIVITY_GROUP'); // Level 1 second node is activity group
                  expect(result[1][1].node_name).to.equal('Group 3 Name'); // Level 1 second node activity group name
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