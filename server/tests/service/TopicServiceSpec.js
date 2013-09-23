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
        	done();
        };

        TopicService.insertTopics(ldid, topicNames, serviceCallback);

    });

});