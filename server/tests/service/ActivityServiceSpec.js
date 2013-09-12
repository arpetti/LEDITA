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
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getGroups");

            var activityCallback = function(err, result, message) {
                expect(err).to.be.null;
                expect(result).to.be.null;
                expect(message).to.equal(messages.NO_LD_NODES_FOUND);

                assert.isTrue(activityDaoStub.withArgs(ldid).calledOnce);
                assert.equal(activityGroupDaoStub.callCount, 0, "no groups fetched when LD has no nodes");
                done();
            };
            ActivityService.getLDActivityStructure(ldid, activityCallback);
        });

        it('Returns message if no groups could be found', function(done) {

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
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getGroups", function(groupids, callback) {
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

        it('Returns just nodes by level if LD has no groups', function(done) {

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
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getGroups");

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

            var groups = 
                [
                    {"group_id": 1, "group_name": null, "level": 1, "position": 1, 
                        "group_child_id": 1, "group_child_name": "Learning Activity 1", "max_position": 4},
                    {"group_id": 1, "group_name": null, "level": 1, "position": 2, 
                        "group_child_id": 2, "group_child_name": "Learning Activity 2", "max_position": 4},
                    {"group_id": 1, "group_name": null, "level": 2, "position": 4, 
                        "group_child_id": 2, "group_child_name": "Learning Activity 3", "max_position": 4},
                    {"group_id": 1, "group_name": null, "level": 2, "position": 2, 
                        "group_child_id": 4, "group_child_name": "Learning Activity 4", "max_position": 4},
                    {"group_id": 2, "group_name": "Group 2 Name", "level": 2, "position": 1, 
                        "group_child_id": 5, "group_child_name": "Learning Activity 5", "max_position": 2},
                    {"group_id": 2, "group_name": "Group 2 Name", "level": 2, "position": 2, 
                        "activity_id": 7, "group_child_name": "Learning Activity 6", "max_position": 2},
                ];
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getGroups", function(groupids, callback) {
                callback(null, groups);
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

    describe('Get Enriched Structure', function() {

        it.only('Gets complete structure', function(done) {
            var ldid = 1;
            
            var ldNodes = 
                [
                    {"level": 1, "position": 1, "node_id": 11, "type": "LD", "node_name": "LD 11"},
                    {"level": 2, "position": 1, "node_id": 12, "type": "ACTIVITY_GROUP", "node_name": "AG 12"},
                    {"level": 3, "position": 1, "node_id": 13, "type": "ACTIVITY", "node_name": "ACT 13"}
                ];
            var activityDaoStub = sandbox.stub(ActivityDao, "getLdNodes", function(id, callback) {
                callback(null, ldNodes);
            });

            var groups = 
                [
                    {"group_id": 12, "group_name": "AG 12", "level": 1, "position": 1, 
                        "group_child_id": 21, "group_child_type": "ACTIVITY", "group_child_name": "ACT 21", "max_position": 2},
                    {"group_id": 12, "group_name": "AG 12", "level": 1, "position": 2, 
                        "group_child_id": 22, "group_child_type": "LD", "group_child_name": "LD 22", "max_position": 2}
                ];
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getGroups", function(groupids, callback) {
                callback(null, groups);
            });

            var activityDetails = {
                "technology": [
                    {
                      "activity_id": 13,
                      "activity_name": "ACT 13",
                      "technology_id": 1,
                      "technology_name": "Tablet"
                    },
                    {
                      "activity_id": 21,
                      "activity_name": "ACT 21",
                      "technology_id": 2,
                      "technology_name": "PC"
                    }
                ],
                "resource": [
                    {
                      "activity_id": 13,
                      "activity_name": "ACT 13",
                      "resource_id": 2,
                      "resource_name": "Didactical resource name 2",
                      "resource_type": "document",
                      "resource_descr": "Description of the didactical resource number 2",
                      "resource_copy": "Carlo Neri",
                      "resource_link": null
                    }
                ],
                "qcer": [
                    {
                      "ld_id": 22,
                      "qcer_name": "B1"
                    }
                ]
            };
            var activityDetailDaoStub = sandbox.stub(ActivityDao, "getActivityDetails", function(activityids, ldids, callback) {
                callback(null, activityDetails);
            });

            var activityCallback = function(err, result, message) {
                expect(err).to.be.null;
                expect(message).to.be.null;
                expect(_.keys(result)).to.have.length(3); // i.e. 3 levels

                // TODO Assert tech, resource, qcer attached to expected nodes

                assert.isTrue(activityDaoStub.withArgs(ldid).calledOnce);
                assert.isTrue(activityGroupDaoStub.withArgs([12]).calledOnce);
                assert.isTrue(activityDetailDaoStub.withArgs([13,21], [11, 22]).calledOnce);
                done();
            };

            ActivityService.getEnrichedLDActivityStructure(ldid, activityCallback);
        });

    });

});