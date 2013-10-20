var expect = require('chai').expect
var assert = require('chai').assert
var sinon = require('sinon')
var TopicService = require('../../../server/service/TopicService');
var RefDao = require('../../../server/dao/RefDao');
var LdCreateDao = require('../../../server/dao/LdCreateDao');
var LdEditDao = require('../../../server/dao/LdEditDao');
var messages = require('../../../server/validate/ValidationMessages');

describe('Topic Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    it('Inserts concerns for existing topics', function(done) {
    	var ldId = 67;
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
    			value[0][1] === ldId &&
    			value[1][0] === topicId2 &&
    			value[1][1] === ldId;
		});

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.isTrue(bulkInsertConcernsStub.withArgs(concernsMatcher).calledOnce);
        	done();
        };

        TopicService.insertTopics(ldId, topicNames, serviceCallback);
    });

	it('Inserts new topics and concerns for non existing topics', function(done) {
		var ldId = 679;
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
        		sinon.match({ subject_id: newTopicId1, ld_id: ldId})).calledOnce);
        	assert.isTrue(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopicId2, ld_id: ldId})).calledOnce);
        	done();
        };

        TopicService.insertTopics(ldId, topicNames, serviceCallback);
	});

	it('Handles mix of existing and new topics', function(done) {
		var ldId = 754;
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
    			value[0][1] === ldId &&
    			value[1][0] === existingTopic3Id &&
    			value[1][1] === ldId;
		});

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.isTrue(bulkInsertConcernsStub.withArgs(concernsMatcher).calledOnce);
        	assert.isTrue(insertSubjectStub.withArgs(sinon.match({ name: newTopic2 })).calledOnce);
        	assert.isTrue(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopic2Id, ld_id: ldId})).calledOnce);
        	done();
        };

        TopicService.insertTopics(ldId, topicNames, serviceCallback);
	});

	it('If error occurs inserting subject, corresponding concern is not inserted', function(done) {
		var ldId = 84;
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
        		sinon.match({ subject_id: newTopicId1, ld_id: ldId})).calledOnce);
        	assert.equal(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopicId2, ld_id: ldId })).callCount, 0);
        	assert.isTrue(singleInsertConcernStub.withArgs(
        		sinon.match({ subject_id: newTopicId3, ld_id: ldId})).calledOnce);
        	
        	done();
        };

        TopicService.insertTopics(ldId, topicNames, serviceCallback);
	});

	it('If error occurs finding existing subjects, entire flow is halted', function(done) {
		var ldId = 99;
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

        TopicService.insertTopics(ldId, topicNames, serviceCallback);
	});

	it('Does nothing if no topics are provided', function(done) {
		var ldId = 100;
		var topicNames = [];

		var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName");
		var bulkInsertConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns");
        var insertSubjectStub = sandbox.stub(LdCreateDao, "insertSubject");
        var singleInsertConcernStub = sandbox.stub(LdCreateDao, "insertConcern");

        var serviceCallback = function() {
        	assert.equal(refDaoStub.callCount, 0);
        	assert.equal(bulkInsertConcernsStub.callCount, 0);
        	assert.equal(insertSubjectStub.callCount, 0);
        	assert.equal(singleInsertConcernStub.callCount, 0);
        	done();
        };

        TopicService.insertTopics(ldId, topicNames, serviceCallback);
	});

	it('Does nothing if topics are undefined', function(done) {
		var ldId = 100;
		var topicNames = undefined;

		var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName");
		var bulkInsertConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns");
        var insertSubjectStub = sandbox.stub(LdCreateDao, "insertSubject");
        var singleInsertConcernStub = sandbox.stub(LdCreateDao, "insertConcern");

        var serviceCallback = function() {
        	assert.equal(refDaoStub.callCount, 0);
        	assert.equal(bulkInsertConcernsStub.callCount, 0);
        	assert.equal(insertSubjectStub.callCount, 0);
        	assert.equal(singleInsertConcernStub.callCount, 0);
        	done();
        };

        TopicService.insertTopics(ldId, topicNames, serviceCallback);
	});

	describe('Remove Concern', function() {

		it('Removes a concern', function(done) {
			var ldId = 200;
			var topicName = 'Topic 222';
			var topicId = 222;

			var daoResults = [{"id": topicId, "name": topicName}];
			var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
	            callback(null, daoResults);
	        });

	        var deleteResult = 0;
	        var deleteDaoStub = sandbox.stub(LdEditDao, "deleteConcern", function(ldId, topicId, callback) {
	        	callback(null, deleteResult);
	        });

	        var listMatcher = sinon.match(function(value) {
					return value.length === 1 && value[0] === topicName;
				});

	        var serviceCB = function(err, message) {
	        	expect(err).to.be.undefined;
	        	expect(message).to.be.undefined;
	        	assert.isTrue(refDaoStub.withArgs(listMatcher).calledOnce);
	        	assert.isTrue(deleteDaoStub.withArgs(ldId, topicId).calledOnce);
	        	done();	
	        };
			
			TopicService.removeConcern(ldId, topicName, serviceCB);
		});

		it('Calls back with error and message if Reference Dao calls back with error', function(done) {
			var ldId = 200;
			var topicName = 'Topic 222';
			var topicId = 222;

			var daoError = new Error('Something went wrong in Ref Dao');
			var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
	            callback(daoError);
	        });

	        var deleteDaoStub = sandbox.stub(LdEditDao, "deleteConcern");

	        var listMatcher = sinon.match(function(value) {
					return value.length === 1 && value[0] === topicName;
				});

	        var serviceCB = function(err, message) {
	        	expect(err).to.equal(daoError);
	        	expect(message).to.equal(messages.TOPIC_REMOVE_FAIL);
	        	assert.isTrue(refDaoStub.withArgs(listMatcher).calledOnce);
	        	assert.equal(deleteDaoStub.callCount, 0);
	        	done();	
	        };
			
			TopicService.removeConcern(ldId, topicName, serviceCB);
		});

		it('Calls back with error and message if Reference Dao calls back 0 results', function(done) {
			var ldId = 200;
			var topicName = 'Topic 222';
			var topicId = 222;

			var daoResults = [];
			var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
	            callback(null, daoResults);
	        });

	        var deleteDaoStub = sandbox.stub(LdEditDao, "deleteConcern");

	        var listMatcher = sinon.match(function(value) {
					return value.length === 1 && value[0] === topicName;
				});

	        var serviceCB = function(err, message) {
	        	expect(err).not.to.be.null;
	        	expect(message).to.equal(messages.TOPIC_REMOVE_FAIL);
	        	assert.isTrue(refDaoStub.withArgs(listMatcher).calledOnce);
	        	assert.equal(deleteDaoStub.callCount, 0);
	        	done();	
	        };
			
			TopicService.removeConcern(ldId, topicName, serviceCB);
		});

		it('Calls back with error and message if Delete Dao calls back with error', function(done) {
			var ldId = 200;
			var topicName = 'Topic 222';
			var topicId = 222;

			var daoResults = [{"id": topicId, "name": topicName}];
			var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
	            callback(null, daoResults);
	        });

	        var deleteDaoError = new Error('something went wrong with delete');
	        var deleteDaoStub = sandbox.stub(LdEditDao, "deleteConcern", function(ldId, topicId, callback) {
	        	callback(deleteDaoError);
	        });

	        var listMatcher = sinon.match(function(value) {
					return value.length === 1 && value[0] === topicName;
				});

	        var serviceCB = function(err, message) {
	        	expect(err).to.equal(deleteDaoError)
	        	expect(message).to.equal(messages.TOPIC_REMOVE_FAIL);
	        	assert.isTrue(refDaoStub.withArgs(listMatcher).calledOnce);
	        	assert.isTrue(deleteDaoStub.withArgs(ldId, topicId).calledOnce);
	        	done();	
	        };
			
			TopicService.removeConcern(ldId, topicName, serviceCB);
		});

	});

});