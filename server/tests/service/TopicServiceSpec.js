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
        var ldCreateDaoConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns", function(concerns, callback) {
        	callback(null, results);
        });

        var ldCreateDaoSubjectsStub = sandbox.stub(LdCreateDao, "insertSubjects");

        var concernsMatcher = sinon.match(function (value) {
    		return value.length === 2 && 
    			value[0][0] === topicId1 &&
    			value[0][1] === ldid &&
    			value[1][0] === topicId2 &&
    			value[1][1] === ldid;
		});

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.isTrue(ldCreateDaoConcernsStub.withArgs(concernsMatcher).calledOnce);
        	assert.equal(ldCreateDaoSubjectsStub.callCount, 0);
        	done();
        };

        TopicService.insertTopics(ldid, topicNames, serviceCallback);
    });

	it('Inserts new topics and concerns for non existing topics', function(done) {
		var ldid = 679;
		var topicName1 = 'new topic 1';
		var topicName2 = 'new topic 2';
		var topicNames = [topicName1, topicName2];

		var topicDaoResults = [];
		var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
            callback(null, topicDaoResults);
        });

        var ldCreateDaoConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns");

		var results = {"affectedRows": 2};
        var ldCreateDaoSubjectsStub = sandbox.stub(LdCreateDao, "insertSubjects", function(subjects, callback) {
        	callback(null, results);
        });

        var subjectsMatcher = sinon.match(function(value) {
        	return value.length === 2 &&
        		value[0][0] === topicName1 &&
        		value[1][0] === topicName2;
        });

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.equal(ldCreateDaoConcernsStub.callCount, 0);
        	assert.isTrue(ldCreateDaoSubjectsStub.withArgs(subjectsMatcher).calledOnce);
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
		var existingTopic3Id = 3;

		var topicDaoResults = [
			{"id": existingTopic1Id, "name": existingTopic1}, {"id": existingTopic3Id, "name": existingTopic3}
		];
		var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
            callback(null, topicDaoResults);
        });

        var results = {"affectedRows": 2};
        var ldCreateDaoConcernsStub = sandbox.stub(LdCreateDao, "insertConcerns", function(concerns, callback) {
        	callback(null, results);
        });

        var results = {"affectedRows": 1};
        var ldCreateDaoSubjectsStub = sandbox.stub(LdCreateDao, "insertSubjects", function(subjects, callback) {
        	callback(null, results);
        });

        var concernsMatcher = sinon.match(function (value) {
    		return value.length === 2 && 
    			value[0][0] === existingTopic1Id &&
    			value[0][1] === ldid &&
    			value[1][0] === existingTopic3Id &&
    			value[1][1] === ldid;
		});

		var subjectsMatcher = sinon.match(function(value) {
        	return value.length === 1 &&
        		value[0][0] === newTopic2;
        });

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	assert.isTrue(ldCreateDaoConcernsStub.withArgs(concernsMatcher).calledOnce);
        	assert.isTrue(ldCreateDaoSubjectsStub.withArgs(subjectsMatcher).calledOnce);
        	done();
        };

        TopicService.insertTopics(ldid, topicNames, serviceCallback);


	});

});