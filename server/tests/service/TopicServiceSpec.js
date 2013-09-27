var expect = require('chai').expect
var assert = require('chai').assert
var sinon = require('sinon')
var TopicService = require('../../service/TopicService');
var RefDao = require('../../dao/RefDao');
var LdCreateDao = require('../../dao/LdCreateDao');
var messages = require('../../service/ValidationMessages');

describe('Topic Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    it('Inserts concerns for existing topics', function(done) {
    	var ldid = 67;
    	var topicName1 = 'Topic 1';
    	var topicId1 = 1;
    	var topicName2 = 'Topic 2';
    	var topicId2 = 2;
    	var topicNames = [topicName1, topicName2];

    	var topicDaoResults = [{"id": topicId1, "name": topicName1}, {"id": topicId2, "name": topicName2}];
    	var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
            callback(null, topicDaoResults);
        });

        var results = {"affectedRows": 2};
        var bulkInsertConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns", function(concerns, callback) {
        	callback(null, results);
        });

        var concernsMatcher = sinon.match(function (value) {
    		return value.length === 2 && 
    			value[0][0] === topicId1 &&
    			value[0][1] === ldid &&
    			value[1][0] === topicId2 &&
    			value[1][1] === ldid;
		});

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.isTrue(bulkInsertConcernsStub.withArgs(concernsMatcher).calledOnce);
        	done();
        };

        TopicService.insertTopics(ldid, topicNames, serviceCallback);
    });

	it('Inserts new topics and concerns for non existing topics', function(done) {
		var ldid = 679;
		var topicName1 = 'new topic 1';
		var topicName2 = 'new topic 2';
		var topicNames = [topicName1, topicName2];
		var newTopicId1 = 11;
		var newTopicId2 = 12;

		var topicDaoResults = [];
		var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
            callback(null, topicDaoResults);
        });

        var bulkInsertConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns");
        
        var insertSubjectStub = sandbox.stub(LdCreateDao, "insertSubject", function(topicData, callback) {
        	if (topicData.name === topicName1) {
        		callback(null, newTopicId1);
        	} else {
        		callback(null, newTopicId2);
        	}
        });
        
        var singleInsertConcernStub = sandbox.stub(LdCreateDao, "insertConcern");

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.equal(bulkInsertConcernsStub.callCount, 0);
        	assert.isTrue(insertSubjectStub.withArgs(sinon.match({ name: topicName1 })).calledOnce);
        	assert.isTrue(insertSubjectStub.withArgs(sinon.match({ name: topicName2 })).calledOnce);
        	assert.isTrue(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopicId1, ld_id: ldid})).calledOnce);
        	assert.isTrue(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopicId2, ld_id: ldid})).calledOnce);
        	done();
        };

        TopicService.insertTopics(ldid, topicNames, serviceCallback);
	});

	it('Handles mix of existing and new topics', function(done) {
		var ldid = 754;
		var existingTopic1 = 'Topic 1';
		var newTopic2 = 'New Topic 2';
		var existingTopic3 = 'Topic 3';
		var topicNames = [existingTopic1, newTopic2, existingTopic3];

		var existingTopic1Id = 1;
		var newTopic2Id = 2;
		var existingTopic3Id = 3;

		var topicDaoResults = [
			{"id": existingTopic1Id, "name": existingTopic1}, {"id": existingTopic3Id, "name": existingTopic3}
		];
		var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
            callback(null, topicDaoResults);
        });

        var results = {"affectedRows": 2};
        var bulkInsertConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns", function(concerns, callback) {
        	callback(null, results);
        });

        var insertSubjectStub = sandbox.stub(LdCreateDao, "insertSubject", function(topicData, callback) {
        	callback(null, newTopic2Id);
        });
        
        var singleInsertConcernStub = sandbox.stub(LdCreateDao, "insertConcern");

        var concernsMatcher = sinon.match(function (value) {
    		return value.length === 2 && 
    			value[0][0] === existingTopic1Id &&
    			value[0][1] === ldid &&
    			value[1][0] === existingTopic3Id &&
    			value[1][1] === ldid;
		});

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.isTrue(bulkInsertConcernsStub.withArgs(concernsMatcher).calledOnce);
        	assert.isTrue(insertSubjectStub.withArgs(sinon.match({ name: newTopic2 })).calledOnce);
        	assert.isTrue(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopic2Id, ld_id: ldid})).calledOnce);
        	done();
        };

        TopicService.insertTopics(ldid, topicNames, serviceCallback);
	});

	it('If error occurs inserting subject, corresponding concern is not inserted', function(done) {
		var ldid = 84;
		var topicName1 = 'new topic 1';
		var topicName2 = 'new topic 2';
		var topicName3 = 'new topic 3';
		var topicNames = [topicName1, topicName2, topicName3];
		var newTopicId1 = 11;
		var newTopicId2 = 12;
		var newTopicId3 = 13;

		var topicDaoResults = [];
		var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
            callback(null, topicDaoResults);
        });

        var bulkInsertConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns");
        
        var insertSubjectStub = sandbox.stub(LdCreateDao, "insertSubject", function(topicData, callback) {
        	if (topicData.name === topicName1) {
        		callback(null, newTopicId1);
        		return;
        	};
        	if (topicData.name === topicName2) {
        		callback(new Error('something went wrong'));
        		return;
        	}
        	if (topicData.name === topicName3) {
        		callback(null, newTopicId3);
        		return;
        	};
        });
        
        var singleInsertConcernStub = sandbox.stub(LdCreateDao, "insertConcern");

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.equal(bulkInsertConcernsStub.callCount, 0);
        	
        	assert.isTrue(insertSubjectStub.withArgs(sinon.match({ name: topicName1 })).calledOnce);
        	assert.isTrue(insertSubjectStub.withArgs(sinon.match({ name: topicName2 })).calledOnce);
        	assert.isTrue(insertSubjectStub.withArgs(sinon.match({ name: topicName3 })).calledOnce);
        	
        	assert.isTrue(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopicId1, ld_id: ldid})).calledOnce);
        	assert.equal(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopicId2, ld_id: ldid })).callCount, 0);
        	assert.isTrue(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopicId3, ld_id: ldid})).calledOnce);
        	
        	done();
        };

        TopicService.insertTopics(ldid, topicNames, serviceCallback);
	});

	it('If error occurs finding existing subjects, entire flow is halted', function(done) {
		var ldid = 99;
		var existTopic = 'Topic 1';
		var newTopic = 'Topic 75';
		var topicNames = [existTopic, newTopic];

		var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
            callback(new Error('something went wrong finding subjects by name'));
        });
        var bulkInsertConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns");
        var insertSubjectStub = sandbox.stub(LdCreateDao, "insertSubject");
        var singleInsertConcernStub = sandbox.stub(LdCreateDao, "insertConcern");

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.equal(bulkInsertConcernsStub.callCount, 0);
        	assert.equal(insertSubjectStub.callCount, 0);
        	assert.equal(singleInsertConcernStub.callCount, 0);
        	done();
        };

        TopicService.insertTopics(ldid, topicNames, serviceCallback);
	});

});