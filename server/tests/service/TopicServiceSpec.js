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
    	var topic1 = 'Topic 1';
    	var topic2 = 'Topic 2';
    	var topicNames = [topic1, topic2];

    	var topicDaoResults = [{"id": 1,"name": topic1}, {"id": 2,"name": topic2}];
    	var refDaoStub = sandbox.stub(RefDao, "findSubjectsByName", function(topicNames, callback) {
            callback(null, topicDaoResults);
        });

        var serviceCallback = function() {
        	assert.isTrue(refDaoStub.withArgs(topicNames).calledOnce);
        	done();
        };

        TopicService.insertTopics(ldid, topicNames, serviceCallback);

    });

});