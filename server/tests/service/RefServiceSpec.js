var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var RefService = require('../../service/RefService');
var RefDao = require('../../dao/RefDao');
var messages = require('../../service/ValidationMessages');

describe('Reference Data Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    it('Returns qcer results', function(done) {

    	var qcers = [{"qcer_id": 1, "qcer_name": "Q1"}, {"qcer_id": 2, "qcer_name": "Q2"}];
    	var refDaoStub = sandbox.stub(RefDao, "getQcers", function(callback) {
            callback(null, qcers);
        });

        var refServiceCallback = function(err, results, message) {
        	expect(err).to.be.null;
        	expect(message).to.be.null;
        	expect(results).not.to.be.null;
        	expect(results).to.have.length(qcers.length);

     		assert.isTrue(refDaoStub.calledOnce);
        	done();
        }
        RefService.getQcers(refServiceCallback);
    });

    it('Returns message if qcers not found', function(done) {

    	var qcers = [];
    	var refDaoStub = sandbox.stub(RefDao, "getQcers", function(callback) {
            callback(null, qcers);
        });

        var refServiceCallback = function(err, results, message) {
        	expect(err).to.be.null;
        	expect(message).to.be.equal(messages.QCERS_NOT_FOUND);
        	expect(results).to.be.null;

     		assert.isTrue(refDaoStub.calledOnce);
        	done();
        }
        RefService.getQcers(refServiceCallback);
    });

    it('Returns error and message if error occurs calling dao', function(done) {

    	var daoError = new Error('something went wrong');
    	var refDaoStub = sandbox.stub(RefDao, "getQcers", function(callback) {
            callback(daoError);
        });
        var refServiceCallback = function(err, results, message) {
        	expect(err).not.to.be.null;
        	expect(err).to.equal(daoError);
        	expect(message).to.be.equal(messages.UNABLE_TO_RETRIEVE_QCERS);
        	expect(results).to.be.null;

     		assert.isTrue(refDaoStub.calledOnce);
        	done();
        }
        RefService.getQcers(refServiceCallback);
    });

});