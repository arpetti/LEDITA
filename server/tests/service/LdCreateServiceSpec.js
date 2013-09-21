var expect = require('chai').expect
    , assert = require('chai').assert
    , sinon = require('sinon')
    , LdCreateService = require('../../service/LdCreateService')
    , LdCreateDao = require('../../dao/LdCreateDao')
    , messages = require('../../service/ValidationMessages');

describe('LD Create Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

	it.only('Creates all the data successfully when input is valid', function(done) {
		var userId = 29;
		var ldData = {
    		name: "Test LD Create",
    		qcers: {"3": true, "6":true},
    		scope: "Test LD Scope",
    		topics: ["Topic 1","New Topic 23"],
    		objectives: [],
    		requisites: [],
    		studentsDescription: "Test Students Description"
    	};

    	var addedLdId = 65;
        var ldCreateDaoStub = sandbox.stub(LdCreateDao, "createLd", function(ldObj, callback) {
            callback(null, addedLdId);
        });

        var ldMatcher = sinon.match({
        	user_id: userId,
            name: ldData.name,
            scope: ldData.scope,
            students_profile: ldData.studentsDescription
        });

        var ldCreateCallback = function(err, ldid, message) {
        	expect(err).to.be.null;
        	expect(message).to.be.null;
        	expect(ldid).to.equal(addedLdId);

        	assert.isTrue(ldCreateDaoStub.withArgs(ldMatcher).calledOnce);
        	done();
        };

        LdCreateService.createLd(userId, ldData, ldCreateCallback);
	});

});