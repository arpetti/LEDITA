var expect = require('chai').expect
var assert = require('chai').assert
var sinon = require('sinon')
var PrerequisiteService = require('../../../server/service/PrerequisiteService');
var RefDao = require('../../../server/dao/RefDao');
var LdCreateDao = require('../../../server/dao/LdCreateDao');
var messages = require('../../../server/validate/ValidationMessages');

describe('Prerequisite Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    it('Inserts needs for existing Objectives', function(done) {
    	var ldId = 67;
    	var objectiveName1 = 'Objective 1';
    	var objectiveId1 = 1;
    	var objectiveName2 = 'Objective 2';
    	var objectiveId2 = 2;
    	var prerequisiteNames = [objectiveName1, objectiveName2];

    	var objectiveDaoResults = [{"id": objectiveId1, "descr": objectiveName1}, {"id": objectiveId2, "descr": objectiveName2}];
    	var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(prerequisiteNames, callback) {
            callback(null, objectiveDaoResults);
        });

        var results = {"affectedRows": 2};
        var bulkInsertNeedsStub = sandbox.stub(LdCreateDao, "bulkInsertNeeds", function(aims, callback) {
        	callback(null, results);
        });

        var needsMatcher = sinon.match(function (value) {
    		return value.length === 2 && 
    			value[0][0] === objectiveId1 &&
    			value[0][1] === ldId &&
    			value[1][0] === objectiveId2 &&
    			value[1][1] === ldId;
		});

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(prerequisiteNames).calledOnce);
        	assert.isTrue(bulkInsertNeedsStub.withArgs(needsMatcher).calledOnce);
        	done();
        };

        PrerequisiteService.insertPrerequisites(ldId, prerequisiteNames, serviceCallback);
    });

	it('Inserts new Objectives and needs for non existing Objectives', function(done) {
		var ldId = 679;
		var objectiveName1 = 'new Objective 1';
		var objectiveName2 = 'new Objective 2';
		var prerequisiteNames = [objectiveName1, objectiveName2];
		var newObjectiveId1 = 11;
		var newObjectiveId2 = 12;

		var objectiveDaoResults = [];
		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(prerequisiteNames, callback) {
            callback(null, objectiveDaoResults);
        });

        var bulkInsertNeedsStub = sandbox.stub(LdCreateDao, "bulkInsertNeeds");
        
        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective", function(objectiveData, callback) {
        	if (objectiveData.descr === objectiveName1) {
        		callback(null, newObjectiveId1);
        	} else {
        		callback(null, newObjectiveId2);
        	}
        });
        
        var singleInsertNeedsStub = sandbox.stub(LdCreateDao, "insertNeed");

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(prerequisiteNames).calledOnce);
        	assert.equal(bulkInsertNeedsStub.callCount, 0);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName1 })).calledOnce);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName2 })).calledOnce);
        	assert.isTrue(singleInsertNeedsStub.withArgs(
        		sinon.match({ objective_id: newObjectiveId1, ld_id: ldId})).calledOnce);
        	assert.isTrue(singleInsertNeedsStub.withArgs(
        		sinon.match({ objective_id: newObjectiveId2, ld_id: ldId})).calledOnce);
        	done();
        };

        PrerequisiteService.insertPrerequisites(ldId, prerequisiteNames, serviceCallback);
	});

	it('Handles mix of existing and new Objectives', function(done) {
		var ldId = 754;
		var existingObjective1 = 'Objective 1';
		var newObjective2 = 'New Objective 2';
		var existingObjective3 = 'Objective 3';
		var prerequisiteNames = [existingObjective1, newObjective2, existingObjective3];

		var existingObjective1Id = 1;
		var newObjective2Id = 2;
		var existingObjective3Id = 3;

		var objectiveDaoResults = [
			{"id": existingObjective1Id, "descr": existingObjective1}, {"id": existingObjective3Id, "descr": existingObjective3}
		];
		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(prerequisiteNames, callback) {
            callback(null, objectiveDaoResults);
        });

        var results = {"affectedRows": 2};
        var bulkInsertNeedsStub = sandbox.stub(LdCreateDao, "bulkInsertNeeds", function(aims, callback) {
        	callback(null, results);
        });

        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective", function(objectiveData, callback) {
        	callback(null, newObjective2Id);
        });
        
        var singleinsertNeedsStub = sandbox.stub(LdCreateDao, "insertNeed");

        var needsMatcher = sinon.match(function (value) {
    		return value.length === 2 && 
    			value[0][0] === existingObjective1Id &&
    			value[0][1] === ldId &&
    			value[1][0] === existingObjective3Id &&
    			value[1][1] === ldId;
		});

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(prerequisiteNames).calledOnce);
        	assert.isTrue(bulkInsertNeedsStub.withArgs(needsMatcher).calledOnce);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: newObjective2 })).calledOnce);
        	assert.isTrue(singleinsertNeedsStub.withArgs(
        		sinon.match({ objective_id: newObjective2Id, ld_id: ldId})).calledOnce);
        	done();
        };

        PrerequisiteService.insertPrerequisites(ldId, prerequisiteNames, serviceCallback);
	});

	it('If error occurs inserting objective, corresponding need is not inserted', function(done) {
		var ldId = 84;
		var objectiveName1 = 'new Objective 1';
		var objectiveName2 = 'new Objective 2';
		var objectiveName3 = 'new Objective 3';
		var prerequisiteNames = [objectiveName1, objectiveName2, objectiveName3];
		var newObjectiveId1 = 11;
		var newObjectiveId2 = 12;
		var newObjectiveId3 = 13;

		var objectiveDaoResults = [];
		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(prerequisiteNames, callback) {
            callback(null, objectiveDaoResults);
        });

        var bulkInsertNeedsStub = sandbox.stub(LdCreateDao, "bulkInsertNeeds");
        
        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective", function(objectiveData, callback) {
        	if (objectiveData.descr === objectiveName1) {
        		callback(null, newObjectiveId1);
        		return;
        	};
        	if (objectiveData.descr === objectiveName2) {
        		callback(new Error('something went wrong'));
        		return;
        	}
        	if (objectiveData.descr === objectiveName3) {
        		callback(null, newObjectiveId3);
        		return;
        	};
        });
        
        var singleinsertNeedsStub = sandbox.stub(LdCreateDao, "insertNeed");

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(prerequisiteNames).calledOnce);
        	assert.equal(bulkInsertNeedsStub.callCount, 0);
        	
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName1 })).calledOnce);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName2 })).calledOnce);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName3 })).calledOnce);
        	
        	assert.isTrue(singleinsertNeedsStub.withArgs(
        		sinon.match({ objective_id: newObjectiveId1, ld_id: ldId})).calledOnce);
        	assert.equal(singleinsertNeedsStub.withArgs(
        		sinon.match({ objective_id: newObjectiveId2, ld_id: ldId })).callCount, 0);
        	assert.isTrue(singleinsertNeedsStub.withArgs(
        		sinon.match({ objective_id: newObjectiveId3, ld_id: ldId})).calledOnce);
        	
        	done();
        };

        PrerequisiteService.insertPrerequisites(ldId, prerequisiteNames, serviceCallback);
	});

	it('If error occurs finding existing objectives, entire flow is halted', function(done) {
		var ldId = 99;
		var existObjective = 'Objective 1';
		var newObjective = 'Objective 75';
		var prerequisiteNames = [existObjective, newObjective];

		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(prerequisiteNames, callback) {
            callback(new Error('something went wrong finding objectives by name'));
        });
        var bulkInsertNeedsStub = sandbox.stub(LdCreateDao, "bulkInsertNeeds");
        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective");
        var singleinsertNeedsStub = sandbox.stub(LdCreateDao, "insertNeed");

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(prerequisiteNames).calledOnce);
        	assert.equal(bulkInsertNeedsStub.callCount, 0);
        	assert.equal(insertObjectiveStub.callCount, 0);
        	assert.equal(singleinsertNeedsStub.callCount, 0);
        	done();
        };

        PrerequisiteService.insertPrerequisites(ldId, prerequisiteNames, serviceCallback);
	});

	it('Does nothing if no prerequisites provided', function(done) {
		var ldId = 98;
		var prerequisiteNames = [];

		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName");
		var bulkInsertNeedsStub = sandbox.stub(LdCreateDao, "bulkInsertNeeds");
        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective");
        var singleinsertNeedsStub = sandbox.stub(LdCreateDao, "insertNeed");

        var serviceCallback = function() {
        	assert.equal(refDaoStub.callCount, 0);
        	assert.equal(bulkInsertNeedsStub.callCount, 0);
        	assert.equal(insertObjectiveStub.callCount, 0);
        	assert.equal(singleinsertNeedsStub.callCount, 0);
        	done();
        };

        PrerequisiteService.insertPrerequisites(ldId, prerequisiteNames, serviceCallback);
	});

	it('Does nothing if prerequisites are undefined', function(done) {
		var ldId = 98;
		var prerequisiteNames = undefined;

		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName");
		var bulkInsertNeedsStub = sandbox.stub(LdCreateDao, "bulkInsertNeeds");
        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective");
        var singleinsertNeedsStub = sandbox.stub(LdCreateDao, "insertNeed");

        var serviceCallback = function() {
        	assert.equal(refDaoStub.callCount, 0);
        	assert.equal(bulkInsertNeedsStub.callCount, 0);
        	assert.equal(insertObjectiveStub.callCount, 0);
        	assert.equal(singleinsertNeedsStub.callCount, 0);
        	done();
        };

        PrerequisiteService.insertPrerequisites(ldId, prerequisiteNames, serviceCallback);
	});

});