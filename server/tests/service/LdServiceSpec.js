var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var LDService = require('../../service/LDService');
var LdDao = require('../../dao/LdDao');
var messages = require('../../service/ValidationMessages');
var _ = require('underscore');

describe('LD Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('Get All Learning Designs', function() {

    	it.only('Calls back with error if LdDao.getLearningDesigns returns error', function(done) {

    		var daoGetLdError = new Error("something went wrong");
            var daoGetLdStub = sandbox.stub(LdDao, "getLearningDesigns", function(callback) {
                callback(daoGetLdError);
            });

            var daoGetQcerStub = sandbox.stub(LdDao,"getQcersWithLdId");	

            var getAllCallback = function(err, result, message) {
            	expect(err).to.equal(daoGetLdError);
                expect(result).to.be.null;
                expect(message).to.equal(messages.UNABLE_TO_RETRIEVE_LDS);

                assert.isTrue(daoGetLdStub.calledOnce);
                assert.equal(daoGetQcerStub.callCount, 0, "does not get qcers when getting lds failed");
            	done();
            };

            LDService.getAllLearningDesigns(getAllCallback);

    	});
    });
});