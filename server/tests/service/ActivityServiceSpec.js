var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var ActivityService = require('../../service/ActivityService');
var ActivityDao = require('../../dao/ActivityDao');
var messages = require('../../service/ValidationMessages');
var _ = require('underscore');

describe('Activity Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('getLDActivityStructure', function() {

        it('Returns message if no LD nodes found', function(done) {

            var ldid = 999;
            var ldNodes = [];
            var activityDaoStub = sandbox.stub(ActivityDao, "getLdNodes", function(id, callback) {
                callback(null, ldNodes);
            });
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getActivityGroups");

            var activityCallback = function(err, result, message) {
                expect(err).to.be.null;
                expect(result).to.be.null;
                expect(message).to.equal(messages.NO_LD_NODES_FOUND);

                assert.isTrue(activityDaoStub.withArgs(ldid).calledOnce);
                assert.equal(activityGroupDaoStub.callCount, 0, "no activity groups fetched when LD has no nodes");
                done();
            };
            ActivityService.getLDActivityStructure(ldid, activityCallback);
        });

        it('Returns message if no activity groups could be found', function(done) {

            var ldid = 30;
            var ldNodes = 
                [
                    {"level": 1, "position": 1, "node_id": 10, "node_name": "My Activity 1", "type": "ACTIVITY"},
                    {"level": 2, "position": 1, "node_id": 11, "node_name": "My Activity 2", "type": "ACTIVITY_GROUP"}
                ];
            var activityDaoStub = sandbox.stub(ActivityDao, "getLdNodes", function(id, callback) {
                callback(null, ldNodes);
            });
            var activityGroups = [];
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getActivityGroups", function(groupids, callback) {
                callback(null, activityGroups);
            });

            var activityCallback = function(err, result, message) {
                expect(err).to.be.null;
                expect(result).to.be.null;
                expect(message).to.equal(messages.NO_ACTIVITIES_FOUND);

                assert.isTrue(activityDaoStub.withArgs(ldid).calledOnce);
                assert.isTrue(activityGroupDaoStub.withArgs([11]).calledOnce);
                done();
            };
            ActivityService.getLDActivityStructure(ldid, activityCallback);

        });

        it('Returns just nodes by level if LD has no activity groups', function(done) {

            var ldid = 20;
            var ldNodes = 
                [
                    {"level": 1, "position": 1, "node_id": 10, "node_name": "My Activity 1", "type": "ACTIVITY"},
                    {"level": 2, "position": 1, "node_id": 11, "node_name": "My Activity 2", "type": "ACTIVITY"},
                    {"level": 3, "position": 1, "node_id": 12, "node_name": "My Activity 3", "type": "ACTIVITY"}
                ];
            var activityDaoStub = sandbox.stub(ActivityDao, "getLdNodes", function(id, callback) {
                callback(null, ldNodes);
            });
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getActivityGroups");

            var activityCallback = function(err, result, message) {
                expect(err).to.be.null;
                expect(_.keys(result)).to.have.length(3); // i.e. 3 levels
                expect(message).to.be.null;

                expect(result[1]).to.have.length(1);
                expect(result[1][0].node_name).to.equal('My Activity 1');
                expect(result[1][0].type).to.equal('ACTIVITY');

                expect(result[2]).to.have.length(1);
                expect(result[2][0].node_name).to.equal('My Activity 2');
                expect(result[2][0].type).to.equal('ACTIVITY');

                expect(result[3]).to.have.length(1);
                expect(result[3][0].node_name).to.equal('My Activity 3');
                expect(result[3][0].type).to.equal('ACTIVITY');

                assert.isTrue(activityDaoStub.withArgs(ldid).calledOnce);
                assert.equal(activityGroupDaoStub.callCount, 0, "no activity groups fetched when LD has no activity groups");
                done();
            };

            ActivityService.getLDActivityStructure(ldid, activityCallback);

        });

    	it('Returns results grouped by level', function(done) {

    		var ldid = 1;
    		var ldNodes = 
    			[
    				{"level": 1, "position": 1, "node_id": 5, "node_name": "Support Activity 1", "type": "ACTIVITY"},
    				{"level": 2, "position": 2, "node_id": 1, "node_name": null, "type": "ACTIVITY_GROUP"},
                    {"level": 3, "position": 1, "node_id": 9, "node_name": "Support Activity 2", "type": "ACTIVITY"},
                    {"level": 3, "position": 2, "node_id": 8, "node_name": "Learning Activity 7", "type": "ACTIVITY"},
                    {"level": 4, "position": 1, "node_id": 2, "node_name": "Learning Design Title Demo 2", "type": "LD"},
                    {"level": 5, "position": 1, "node_id": 2, "node_name": "Group 2 Name", "type": "ACTIVITY_GROUP"},
    				{"level": 6, "position": 1, "node_id": 10, "node_name": "Evaluation Activity 1", "type": "ACTIVITY"}
    			];
            var activityDaoStub = sandbox.stub(ActivityDao, "getLdNodes", function(id, callback) {
                callback(null, ldNodes);
            });

            var activityGroups = 
                [
                    {"activity_group_id": 1, "activity_group_name": null, "level": 1, "position": 1, 
                        "activity_id": 1, "activity_name": "Learning Activity 1", "max_position": 4},
                    {"activity_group_id": 1, "activity_group_name": null, "level": 1, "position": 2, 
                        "activity_id": 2, "activity_name": "Learning Activity 2", "max_position": 4},
                    {"activity_group_id": 1, "activity_group_name": null, "level": 2, "position": 2, 
                        "activity_id": 2, "activity_name": "Learning Activity 3", "max_position": 4},
                    {"activity_group_id": 1, "activity_group_name": null, "level": 2, "position": 2, 
                        "activity_id": 4, "activity_name": "Learning Activity 4", "max_position": 4},
                    {"activity_group_id": 2, "activity_group_name": "Group 2 Name", "level": 2, "position": 1, 
                        "activity_id": 5, "activity_name": "Learning Activity 5", "max_position": 2},
                    {"activity_group_id": 2, "activity_group_name": "Group 2 Name", "level": 2, "position": 2, 
                        "activity_id": 7, "activity_name": "Learning Activity 6", "max_position": 2},
                ];
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getActivityGroups", function(groupids, callback) {
                callback(null, activityGroups);
            });

            var activityCallback = function(err, result, message) {
            	expect(err).to.be.null;
            	expect(message).to.be.null;
                expect(_.keys(result)).to.have.length(6); // i.e. 6 levels

                expect(result[1]).to.have.length(1);
                expect(result[1][0].node_name).to.equal('Support Activity 1');
                expect(result[1][0].type).to.equal('ACTIVITY');

                expect(result[2]).to.have.length(1);
                expect(result[2][0].node_name).to.be.null;
                expect(result[2][0].type).to.equal('ACTIVITY_GROUP');
                expect(result[2][0].max_position).to.equal(4);
                expect(_.keys(result[2][0].children)).to.have.length(2);

                expect(result[3]).to.have.length(2);
                expect(result[3][0].node_name).to.equal('Support Activity 2');
                expect(result[3][0].type).to.equal('ACTIVITY');
                expect(result[3][1].node_name).to.equal('Learning Activity 7');
                expect(result[3][1].type).to.equal('ACTIVITY');

                assert.isTrue(activityDaoStub.withArgs(ldid).calledOnce);
            	assert.isTrue(activityGroupDaoStub.withArgs([1,2]).calledOnce);
            	done();
            };

            ActivityService.getLDActivityStructure(ldid, activityCallback);

    	});

    });

});