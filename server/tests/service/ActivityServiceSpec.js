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
    				{"level": 1, "position": 1, "target_id": 111, "target_name": "support", "type": "ACTIVITY"},
    				{"level": 1, "position": 2, "target_id": 222, "target_name": "lab", "type": "ACTIVITY"},
    				{"level": 2, "position": 1, "target_id": 333, "target_name": "evaluation", "type": "ACTIVITY_GROUP"},
    			];
            var activityDaoStub = sandbox.stub(ActivityDao, "getLdActivities", function(id, callback) {
                callback(null, activities);
            });

            var activityCallback = function(err, result, message) {
            	expect(err).to.be.null;
            	expect(message).to.be.null;
            	console.log(JSON.stringify(result));

            	assert.isTrue(activityDaoStub.withArgs(ldid).calledOnce);
            	done();
            };

            ActivityService.getLDActivityStructure(ldid, activityCallback);

    	});

    });

});