var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var LdCreateService = require('../../../server/service/LdCreateService');
var ScopeService = require('../../../server/service/ScopeService');
var TopicService = require('../../../server/service/TopicService');
var ObjectiveService = require('../../../server/service/ObjectiveService');
var PrerequisiteService = require('../../../server/service/PrerequisiteService');
var LdCreateDao = require('../../../server/dao/LdCreateDao');
var messages = require('../../../server/validate/ValidationMessages');

describe('LD Create Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

	it('Creates all the data successfully when input is valid', function(done) {
		var userId = 29;
		var ldData = {
    		name: "Test LD Create",
    		qcers: {"3": true, "6": true},
    		scope: "Lesson",
    		topics: ["Topic 1","New Topic 23"],
    		objectives: ["Objective 1", "New Objective 98"],
    		requisites: ["Objective 3", "New Objective 216"],
    		studentsDescription: "Test Students Description"
    	};

    	var scopeId = 1;
    	var scopeServiceStub = sandbox.stub(ScopeService, "getScopeId", function(scope, callback) {
    		callback(null, scopeId);
    	});

    	var addedLdId = 65;
        var ldCreateDaoStub = sandbox.stub(LdCreateDao, "createLd", function(ldObj, callback) {
            callback(null, addedLdId);
        });

        var results = {"affectedRows": 2};
        var ldCreateDaoClassificatesStub = sandbox.stub(LdCreateDao, "insertClassificates", function(classificates, callback) {
        	callback(null, results);
        });

        var topicServiceStub = sandbox.stub(TopicService, "insertTopics", function(ldid, topicNames, callback) {
        	callback(null, addedLdId);
        });

        var objectiveServiceStub = sandbox.stub(ObjectiveService, "insertObjectives", function(ldid, objectiveNames, callback) {
        	callback(null, addedLdId);
        });

        var prerequisiteServiceStub = sandbox.stub(PrerequisiteService, "insertPrerequisites", function(ldid, objectiveNames, callback) {
        	callback(null, addedLdId);
        });

        var ldMatcher = sinon.match({
        	user_id: userId,
            name: ldData.name,
            scope_id: scopeId,
            students_profile: ldData.studentsDescription
        });

        var classificatesMatcher = sinon.match(function(value) {
    		return value.length === 2 && 
    			value[0][0] === 3 &&
    			value[0][1] === addedLdId &&
    			value[1][0] === 6 &&
    			value[1][1] === addedLdId;
		});

        var ldCreateCallback = function(err, ldid, message) {
        	expect(err).to.be.null;
        	expect(message).to.be.null;
        	expect(ldid).to.equal(addedLdId);

        	assert.isTrue(scopeServiceStub.withArgs(ldData.scope).calledOnce);
        	assert.isTrue(ldCreateDaoStub.withArgs(ldMatcher).calledOnce);
        	assert.isTrue(ldCreateDaoClassificatesStub.withArgs(classificatesMatcher).calledOnce);
        	assert.isTrue(topicServiceStub.withArgs(addedLdId, ldData.topics).calledOnce);
        	assert.isTrue(objectiveServiceStub.withArgs(addedLdId, ldData.objectives).calledOnce);
        	assert.isTrue(prerequisiteServiceStub.withArgs(addedLdId, ldData.requisites).calledOnce);
        	done();
        };

        LdCreateService.createLd(userId, ldData, ldCreateCallback);
	});

	it('Does not insert classificates if empty', function(done) {
		var userId = 29;
		var ldData = {
    		name: "Test LD Create",
    		qcers: {},
    		scope: "Lesson",
    		topics: ["Topic 1","New Topic 23"],
    		objectives: ["Objective 1", "New Objective 98"],
    		requisites: ["Objective 3", "New Objective 216"],
    		studentsDescription: "Test Students Description"
    	};

    	var scopeId = 1;
    	var scopeServiceStub = sandbox.stub(ScopeService, "getScopeId", function(scope, callback) {
    		callback(null, scopeId);
    	});

    	var addedLdId = 65;
        var ldCreateDaoStub = sandbox.stub(LdCreateDao, "createLd", function(ldObj, callback) {
            callback(null, addedLdId);
        });

        var ldCreateDaoClassificatesStub = sandbox.stub(LdCreateDao, "insertClassificates");

        var topicServiceStub = sandbox.stub(TopicService, "insertTopics", function(ldid, topicNames, callback) {
        	callback(null, addedLdId);
        });

        var objectiveServiceStub = sandbox.stub(ObjectiveService, "insertObjectives", function(ldid, objectiveNames, callback) {
        	callback(null, addedLdId);
        });

        var prerequisiteServiceStub = sandbox.stub(PrerequisiteService, "insertPrerequisites", function(ldid, objectiveNames, callback) {
        	callback(null, addedLdId);
        });

        var ldMatcher = sinon.match({
        	user_id: userId,
            name: ldData.name,
            scope_id: scopeId,
            students_profile: ldData.studentsDescription
        });

        var ldCreateCallback = function(err, ldid, message) {
        	expect(err).to.be.null;
        	expect(message).to.be.null;
        	expect(ldid).to.equal(addedLdId);

			assert.isTrue(scopeServiceStub.withArgs(ldData.scope).calledOnce);
        	assert.isTrue(ldCreateDaoStub.withArgs(ldMatcher).calledOnce);
        	assert.equal(ldCreateDaoClassificatesStub.callCount, 0, "does not insert classificates when empty");
        	assert.isTrue(topicServiceStub.withArgs(addedLdId, ldData.topics).calledOnce);
        	assert.isTrue(objectiveServiceStub.withArgs(addedLdId, ldData.objectives).calledOnce);
        	assert.isTrue(prerequisiteServiceStub.withArgs(addedLdId, ldData.requisites).calledOnce);
        	done();
        };

        LdCreateService.createLd(userId, ldData, ldCreateCallback);
	});

	it('Halts all inserts if LD insert returns error from dao', function(done) {
		var userId = 29;
		var ldData = {
    		name: "Test LD Create",
    		qcers: {"3": true, "6": true},
    		scope: "Test LD Scope",
    		topics: ["Topic 1","New Topic 23"],
    		objectives: ["Objective 1", "New Objective 98"],
    		requisites: [],
    		studentsDescription: "Test Students Description"
    	};

    	var scopeId = 1;
    	var scopeServiceStub = sandbox.stub(ScopeService, "getScopeId", function(scope, callback) {
    		callback(null, scopeId);
    	});

    	var daoError = new Error('something went wrong');
        var ldCreateDaoStub = sandbox.stub(LdCreateDao, "createLd", function(ldObj, callback) {
            callback(daoError);
        });

        var ldCreateDaoClassificatesStub = sandbox.stub(LdCreateDao, "insertClassificates");
        var topicServiceStub = sandbox.stub(TopicService, "insertTopics");
        var objectiveServiceStub = sandbox.stub(ObjectiveService, "insertObjectives");
        var prerequisiteServiceStub = sandbox.stub(PrerequisiteService, "insertPrerequisites");

        var ldMatcher = sinon.match({
        	user_id: userId,
            name: ldData.name,
            scope_id: scopeId,
            students_profile: ldData.studentsDescription
        });

        var ldCreateCallback = function(err, ldid, message) {
        	expect(err).to.equal(daoError);
        	expect(ldid).to.be.null
        	expect(message).to.equal(messages.UNABLE_TO_CREATE_LD);

			assert.isTrue(scopeServiceStub.withArgs(ldData.scope).calledOnce);
        	assert.isTrue(ldCreateDaoStub.withArgs(ldMatcher).calledOnce);
        	assert.equal(ldCreateDaoClassificatesStub.callCount, 0, "does not insert classificates when error occurs inserting LD");
        	assert.equal(topicServiceStub.callCount, 0);
        	assert.equal(objectiveServiceStub.callCount, 0);
        	assert.equal(prerequisiteServiceStub.callCount, 0);
        	done();
        };

        LdCreateService.createLd(userId, ldData, ldCreateCallback);
	});

	it('Halts all inserts if Scope Service returns an error', function(done) {
		var userId = 29;
		var ldData = {
    		name: "Test LD Create",
    		qcers: {"3": true, "6": true},
    		scope: "Test LD Scope",
    		topics: ["Topic 1","New Topic 23"],
    		objectives: ["Objective 1", "New Objective 98"],
    		requisites: [],
    		studentsDescription: "Test Students Description"
    	};

    	var scopeServiceError = new Error("something went wrong");
    	var scopeServiceStub = sandbox.stub(ScopeService, "getScopeId", function(scope, callback) {
    		callback(scopeServiceError);
    	});

    	var addedLdId = 65;
        var ldCreateDaoStub = sandbox.stub(LdCreateDao, "createLd", function(ldObj, callback) {
            callback(null, addedLdId);
        });

        var ldCreateDaoClassificatesStub = sandbox.stub(LdCreateDao, "insertClassificates");
        var topicServiceStub = sandbox.stub(TopicService, "insertTopics");
        var objectiveServiceStub = sandbox.stub(ObjectiveService, "insertObjectives");
        var prerequisiteServiceStub = sandbox.stub(PrerequisiteService, "insertPrerequisites");

        var ldCreateCallback = function(err, ldid, message) {
        	expect(err).to.equal(scopeServiceError);
        	expect(ldid).to.be.null
        	expect(message).to.equal(messages.UNABLE_TO_CREATE_LD);

			assert.isTrue(scopeServiceStub.withArgs(ldData.scope).calledOnce);
        	assert.equal(ldCreateDaoStub.callCount, 0);
        	assert.equal(ldCreateDaoClassificatesStub.callCount, 0, "does not insert classificates when error occurs inserting LD");
        	assert.equal(topicServiceStub.callCount, 0);
        	assert.equal(objectiveServiceStub.callCount, 0);
        	assert.equal(prerequisiteServiceStub.callCount, 0);
        	done();
        };

        LdCreateService.createLd(userId, ldData, ldCreateCallback);
	});

});