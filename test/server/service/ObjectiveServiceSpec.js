var expect = require('chai').expect
var assert = require('chai').assert
var sinon = require('sinon')
var ObjectiveService = require('../../../server/service/ObjectiveService');
var RefDao = require('../../../server/dao/RefDao');
var LdCreateDao = require('../../../server/dao/LdCreateDao');
var messages = require('../../../server/service/ValidationMessages');

describe('Objective Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    it('Inserts aims for existing Objectives', function(done) {
    	var ldId = 67;
    	var objectiveName1 = 'Objective 1';
    	var objectiveId1 = 1;
    	var objectiveName2 = 'Objective 2';
    	var objectiveId2 = 2;
    	var objectiveNames = [objectiveName1, objectiveName2];

    	var objectiveDaoResults = [{"id": objectiveId1, "descr": objectiveName1}, {"id": objectiveId2, "descr": objectiveName2}];
    	var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(objectiveNames, callback) {
            callback(null, objectiveDaoResults);
        });

        var results = {"affectedRows": 2};
        var bulkInsertAimsStub = sandbox.stub(LdCreateDao, "insertAims", function(aims, callback) {
        	callback(null, results);
        });

        var aimsMatcher = sinon.match(function (value) {
    		return value.length === 2 && 
    			value[0][0] === objectiveId1 &&
    			value[0][1] === ldId &&
    			value[1][0] === objectiveId2 &&
    			value[1][1] === ldId;
		});

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(objectiveNames).calledOnce);
        	assert.isTrue(bulkInsertAimsStub.withArgs(aimsMatcher).calledOnce);
        	done();
        };

        ObjectiveService.insertObjectives(ldId, objectiveNames, serviceCallback);
    });

	it('Inserts new Objectives and aims for non existing Objectives', function(done) {
		var ldId = 679;
		var objectiveName1 = 'new Objective 1';
		var objectiveName2 = 'new Objective 2';
		var objectiveNames = [objectiveName1, objectiveName2];
		var newObjectiveId1 = 11;
		var newObjectiveId2 = 12;

		var objectiveDaoResults = [];
		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(objectiveNames, callback) {
            callback(null, objectiveDaoResults);
        });

        var bulkInsertAimsStub = sandbox.stub(LdCreateDao, "insertAims");
        
        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective", function(objectiveData, callback) {
        	if (objectiveData.descr === objectiveName1) {
        		callback(null, newObjectiveId1);
        	} else {
        		callback(null, newObjectiveId2);
        	}
        });
        
        var singleinsertAimstub = sandbox.stub(LdCreateDao, "insertAim");

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(objectiveNames).calledOnce);
        	assert.equal(bulkInsertAimsStub.callCount, 0);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName1 })).calledOnce);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName2 })).calledOnce);
        	assert.isTrue(singleinsertAimstub.withArgs(
        		sinon.match({ objective_id: newObjectiveId1, ld_id: ldId})).calledOnce);
        	assert.isTrue(singleinsertAimstub.withArgs(
        		sinon.match({ objective_id: newObjectiveId2, ld_id: ldId})).calledOnce);
        	done();
        };

        ObjectiveService.insertObjectives(ldId, objectiveNames, serviceCallback);
	});

	it('Handles mix of existing and new Objectives', function(done) {
		var ldId = 754;
		var existingObjective1 = 'Objective 1';
		var newObjective2 = 'New Objective 2';
		var existingObjective3 = 'Objective 3';
		var objectiveNames = [existingObjective1, newObjective2, existingObjective3];

		var existingObjective1Id = 1;
		var newObjective2Id = 2;
		var existingObjective3Id = 3;

		var objectiveDaoResults = [
			{"id": existingObjective1Id, "descr": existingObjective1}, {"id": existingObjective3Id, "descr": existingObjective3}
		];
		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(objectiveNames, callback) {
            callback(null, objectiveDaoResults);
        });

        var results = {"affectedRows": 2};
        var bulkInsertAimsStub = sandbox.stub(LdCreateDao, "insertAims", function(aims, callback) {
        	callback(null, results);
        });

        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective", function(objectiveData, callback) {
        	callback(null, newObjective2Id);
        });
        
        var singleinsertAimstub = sandbox.stub(LdCreateDao, "insertAim");

        var aimsMatcher = sinon.match(function (value) {
    		return value.length === 2 && 
    			value[0][0] === existingObjective1Id &&
    			value[0][1] === ldId &&
    			value[1][0] === existingObjective3Id &&
    			value[1][1] === ldId;
		});

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(objectiveNames).calledOnce);
        	assert.isTrue(bulkInsertAimsStub.withArgs(aimsMatcher).calledOnce);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: newObjective2 })).calledOnce);
        	assert.isTrue(singleinsertAimstub.withArgs(
        		sinon.match({ objective_id: newObjective2Id, ld_id: ldId})).calledOnce);
        	done();
        };

        ObjectiveService.insertObjectives(ldId, objectiveNames, serviceCallback);
	});

	it('If error occurs inserting objective, corresponding aim is not inserted', function(done) {
		var ldId = 84;
		var objectiveName1 = 'new Objective 1';
		var objectiveName2 = 'new Objective 2';
		var objectiveName3 = 'new Objective 3';
		var objectiveNames = [objectiveName1, objectiveName2, objectiveName3];
		var newObjectiveId1 = 11;
		var newObjectiveId2 = 12;
		var newObjectiveId3 = 13;

		var objectiveDaoResults = [];
		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(objectiveNames, callback) {
            callback(null, objectiveDaoResults);
        });

        var bulkInsertAimsStub = sandbox.stub(LdCreateDao, "insertAims");
        
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
        
        var singleinsertAimstub = sandbox.stub(LdCreateDao, "insertAim");

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(objectiveNames).calledOnce);
        	assert.equal(bulkInsertAimsStub.callCount, 0);
        	
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName1 })).calledOnce);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName2 })).calledOnce);
        	assert.isTrue(insertObjectiveStub.withArgs(sinon.match({ descr: objectiveName3 })).calledOnce);
        	
        	assert.isTrue(singleinsertAimstub.withArgs(
        		sinon.match({ objective_id: newObjectiveId1, ld_id: ldId})).calledOnce);
        	assert.equal(singleinsertAimstub.withArgs(
        		sinon.match({ objective_id: newObjectiveId2, ld_id: ldId })).callCount, 0);
        	assert.isTrue(singleinsertAimstub.withArgs(
        		sinon.match({ objective_id: newObjectiveId3, ld_id: ldId})).calledOnce);
        	
        	done();
        };

        ObjectiveService.insertObjectives(ldId, objectiveNames, serviceCallback);
	});

	it('If error occurs finding existing objectives, entire flow is halted', function(done) {
		var ldId = 99;
		var existObjective = 'Objective 1';
		var newObjective = 'Objective 75';
		var objectiveNames = [existObjective, newObjective];

		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName", function(objectiveNames, callback) {
            callback(new Error('something went wrong finding objectives by name'));
        });
        var bulkInsertAimsStub = sandbox.stub(LdCreateDao, "insertAims");
        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective");
        var singleinsertAimstub = sandbox.stub(LdCreateDao, "insertAim");

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(objectiveNames).calledOnce);
        	assert.equal(bulkInsertAimsStub.callCount, 0);
        	assert.equal(insertObjectiveStub.callCount, 0);
        	assert.equal(singleinsertAimstub.callCount, 0);
        	done();
        };

        ObjectiveService.insertObjectives(ldId, objectiveNames, serviceCallback);
	});

	it('Does nothing if no objectives provided', function(done) {
		var ldId = 99;
		var objectiveNames = [];

		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName");
        var bulkInsertAimsStub = sandbox.stub(LdCreateDao, "insertAims");
        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective");
        var singleinsertAimstub = sandbox.stub(LdCreateDao, "insertAim");

        var serviceCallback = function() {
        	assert.equal(refDaoStub.callCount, 0);
        	assert.equal(bulkInsertAimsStub.callCount, 0);
        	assert.equal(insertObjectiveStub.callCount, 0);
        	assert.equal(singleinsertAimstub.callCount, 0);
        	done();
        };

        ObjectiveService.insertObjectives(ldId, objectiveNames, serviceCallback);
	});

	it('Does nothing if objectives are undefined', function(done) {
		var ldId = 99;
		var objectiveNames = undefined;

		var refDaoStub = sandbox.stub(RefDao, "findObjectivesByName");
        var bulkInsertAimsStub = sandbox.stub(LdCreateDao, "insertAims");
        var insertObjectiveStub = sandbox.stub(LdCreateDao, "insertObjective");
        var singleinsertAimstub = sandbox.stub(LdCreateDao, "insertAim");

        var serviceCallback = function() {
        	assert.equal(refDaoStub.callCount, 0);
        	assert.equal(bulkInsertAimsStub.callCount, 0);
        	assert.equal(insertObjectiveStub.callCount, 0);
        	assert.equal(singleinsertAimstub.callCount, 0);
        	done();
        };

        ObjectiveService.insertObjectives(ldId, objectiveNames, serviceCallback);
	});

});