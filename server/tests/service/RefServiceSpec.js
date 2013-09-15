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

    describe('SUBJECT', function() {

    	beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

	    it('Returns subject results', function(done) {

	    	var subjects = [{"name":"Topic 1"},{"name":"Topic 2"}];
	    	var refDaoStub = sandbox.stub(RefDao, "getSubjectsMatching", function(callback) {
	            callback(null, subjects);
	        });

	        var refServiceCallback = function(err, results) {
	        	expect(err).to.be.null;
	        	expect(results).not.to.be.null;
	        	expect(results).to.have.length(subjects.length);
	        	expect(results[0].name).to.equal(subjects[0].name);
	        	expect(results[1].name).to.equal(subjects[1].name);

	     		assert.isTrue(refDaoStub.calledOnce);
	        	done();
	        }
	        RefService.getSubjectsMatching(refServiceCallback);
		});

		it('Empty result is not considered an error', function(done) {

			var subjects = [];
	    	var refDaoStub = sandbox.stub(RefDao, "getSubjectsMatching", function(callback) {
	            callback(null, subjects);
	        });

	        var refServiceCallback = function(err, results) {
	        	expect(err).to.be.null;
	        	expect(results).not.to.be.null;
	        	expect(results).to.have.length(0);

	     		assert.isTrue(refDaoStub.calledOnce);
	        	done();
	        }
	        RefService.getSubjectsMatching(refServiceCallback);
		});

		it('Returns error if error occurs calling dao', function(done) {

	    	var daoError = new Error('something went wrong');
	    	var refDaoStub = sandbox.stub(RefDao, "getSubjectsMatching", function(callback) {
	            callback(daoError);
	        });
	        var refServiceCallback = function(err, results) {
	        	expect(err).not.to.be.null;
	        	expect(err).to.equal(daoError);
	        	expect(results).to.be.undefined;

	     		assert.isTrue(refDaoStub.calledOnce);
	        	done();
	        }
	        RefService.getSubjectsMatching(refServiceCallback);
	    });

    });

});