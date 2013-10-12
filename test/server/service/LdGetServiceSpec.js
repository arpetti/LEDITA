var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var LdGetService = require('../../../server/service/LdGetService');
var LdDao = require('../../../server/dao/LdDao');
var messages = require('../../../server/validate/ValidationMessages');
var _ = require('underscore');

describe('LD Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('Get All Learning Designs', function() {

    	it('Calls back with error if LdDao.getLearningDesigns returns error', function(done) {

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

            LdGetService.getAllLearningDesigns(getAllCallback);

    	});
    });

    describe('Is LD owned by user', function() {

    	it('Calls back with error if dao returns error', function(done) {
    		var ldId = 1;
    		var userId = 2;

    		var daoError = new Error("something went wrong");
            var daoStub = sandbox.stub(LdDao, "getLearningDesignUserId", function(id, callback) {
                callback(daoError);
            });

            var serviceCb = function(err, result) {
            	expect(err).to.equal(daoError);
                assert.isTrue(daoStub.withArgs(ldId).calledOnce);
            	done();
            };

            LdGetService.isLdOwnedByUser(ldId, userId, serviceCb);
    	});

    	it('Calls back with true if user is owner of LD', function(done) {
    		var ldId = 1;
    		var userId = 2;

    		var daoUserId = 2;
            var daoStub = sandbox.stub(LdDao, "getLearningDesignUserId", function(id, callback) {
                callback(null, daoUserId);
            });

            var serviceCb = function(err, result) {
            	expect(err).to.be.null;
            	expect(result).to.be.true;
                assert.isTrue(daoStub.withArgs(ldId).calledOnce);
            	done();
            };

            LdGetService.isLdOwnedByUser(ldId, userId, serviceCb);
    	});

    	it('Calls back with false if user is not owner of LD', function(done) {
    		var ldId = 1;
    		var userId = 2;

    		var daoUserId = 3;
            var daoStub = sandbox.stub(LdDao, "getLearningDesignUserId", function(id, callback) {
                callback(null, daoUserId);
            });

            var serviceCb = function(err, result) {
            	expect(err).to.be.null;
            	expect(result).to.be.false;
                assert.isTrue(daoStub.withArgs(ldId).calledOnce);
            	done();
            };

            LdGetService.isLdOwnedByUser(ldId, userId, serviceCb);
    	});
    });
});