var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var ActivityService = require('../../service/ActivityService');
var ActivityDao = require('../../dao/ActivityDao');
var messages = require('../../service/ValidationMessages');

describe('Activity Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('getLDActivityStructure', function() {

    	it('Returns results grouped by level', function(done) {

    		var ldid = 1;

    		var activities = 
    			[
    				{"level": 1, "position": 1, "node_id": 5, "node_name": "Support Activity 1", "type": "ACTIVITY"},
    				{"level": 2, "position": 2, "node_id": 1, "node_name": "N/A", "type": "ACTIVITY_GROUP"},
                    {"level": 3, "position": 1, "node_id": 9, "node_name": "Support Activity 2", "type": "ACTIVITY"},
                    {"level": 3, "position": 2, "node_id": 8, "node_name": "Learning Activity 7", "type": "ACTIVITY"},
                    {"level": 4, "position": 1, "node_id": 2, "node_name": "Learning Design Title Demo 2", "type": "LD"},
                    {"level": 5, "position": 1, "node_id": 2, "node_name": "Group 2 Name", "type": "ACTIVITY_GROUP"},
    				{"level": 6, "position": 1, "node_id": 10, "node_name": "Evaluation Activity 1", "type": "ACTIVITY"}
    			];
            var activityDaoStub = sandbox.stub(ActivityDao, "getLdNodes", function(id, callback) {
                callback(null, activities);
            });

            var activityGroups = 
                [
                    {"activity_group_id": 1, "activity_group_name": null, "level": 1, "position": 1, "activity_id": 1, "activity_name": "Learning Activity 1"},
                    {"activity_group_id": 1, "activity_group_name": null, "level": 1, "position": 2, "activity_id": 2, "activity_name": "Learning Activity 2"},
                    {"activity_group_id": 1, "activity_group_name": null, "level": 2, "position": 2, "activity_id": 2, "activity_name": "Learning Activity 3"},
                    {"activity_group_id": 1, "activity_group_name": null, "level": 2, "position": 2, "activity_id": 4, "activity_name": "Learning Activity 4"},
                    {"activity_group_id": 2, "activity_group_name": "Group 2 Name", "level": 2, "position": 1, "activity_id": 5, "activity_name": "Learning Activity 5"},
                    {"activity_group_id": 2, "activity_group_name": "Group 2 Name", "level": 2, "position": 2, "activity_id": 7, "activity_name": "Learning Activity 6"},
                ];
            var activityGroupDaoStub = sandbox.stub(ActivityDao, "getActivityGroups", function(groupids, callback) {
                callback(null, activityGroups);
            })

            var activityCallback = function(err, result, message) {
            	expect(err).to.be.null;
            	expect(message).to.be.null;
            	console.log(JSON.stringify(result));

                assert.isTrue(activityDaoStub.withArgs(ldid).calledOnce);
            	assert.isTrue(activityGroupDaoStub.withArgs([1,2]).calledOnce);
            	done();
            };

            ActivityService.getLDActivityStructure(ldid, activityCallback);

    	});

    });

});