var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var RefService = require('../../../server/service/RefService');
var RefDao = require('../../../server/dao/RefDao');
var messages = require('../../../server/service/ValidationMessages');

describe('Reference Data Service', function() {

	var sandbox = sinon.sandbox.create();

	describe('QCER', function() {

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

    describe('SCOPE', function() {

    	beforeEach(function() {
	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

	    it('Returns scope results', function(done) {

	    	var partial = 'Le';
	    	var scopes = [{"name":"Lesson"},{"name":"Lezione"}];
	    	var refDaoStub = sandbox.stub(RefDao, "getScopesMatching", function(partial, callback) {
	            callback(null, scopes);
	        });

	        var refServiceCallback = function(err, results, message) {
	        	expect(err).to.be.null;
	        	expect(message).to.be.null;
	        	expect(results).not.to.be.null;
	        	expect(results).to.have.length(scopes.length);
	        	expect(results[0]).to.equal(scopes[0].name);
	        	expect(results[1]).to.equal(scopes[1].name);

	     		assert.isTrue(refDaoStub.withArgs(partial).calledOnce);
	        	done();
	        }
	        RefService.getScopesMatching(partial, refServiceCallback);
		});

		it('Empty result is not considered an error', function(done) {

			var partial = 'Zz';
			var scopes = [];
	    	var refDaoStub = sandbox.stub(RefDao, "getScopesMatching", function(partial, callback) {
	            callback(null, scopes);
	        });

	        var refServiceCallback = function(err, results, message) {
	        	expect(err).to.be.null;
	        	expect(message).to.be.null;
	        	expect(results).not.to.be.null;
	        	expect(results).to.have.length(0);

	     		assert.isTrue(refDaoStub.withArgs(partial).calledOnce);
	        	done();
	        }
	        RefService.getScopesMatching(partial, refServiceCallback);
		});

		it('Returns error if error occurs calling dao', function(done) {

			var partial = 'something';
	    	var daoError = new Error('something went wrong');
	    	var refDaoStub = sandbox.stub(RefDao, "getScopesMatching", function(partial, callback) {
	            callback(daoError);
	        });
	        var refServiceCallback = function(err, results, message) {
	        	expect(err).not.to.be.null;
	        	expect(err).to.equal(daoError);
	        	expect(message).to.equal(messages.UNABLE_TO_RETRIEVE_SCOPES);
	        	expect(results).to.be.null;

	     		assert.isTrue(refDaoStub.withArgs(partial).calledOnce);
	        	done();
	        }
	        RefService.getScopesMatching(partial, refServiceCallback);
	    });

    });

	describe('SUBJECT', function() {

    	beforeEach(function() {
	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

	    it('Returns subject results', function(done) {

	    	var partial = 'To';
	    	var subjects = [{"name":"Topic 1"},{"name":"Topic 2"}];
	    	var refDaoStub = sandbox.stub(RefDao, "getSubjectsMatching", function(partial, callback) {
	            callback(null, subjects);
	        });

	        var refServiceCallback = function(err, results, message) {
	        	expect(err).to.be.null;
	        	expect(message).to.be.null;
	        	expect(results).not.to.be.null;
	        	expect(results).to.have.length(subjects.length);
	        	expect(results[0]).to.equal(subjects[0].name);
	        	expect(results[1]).to.equal(subjects[1].name);

	     		assert.isTrue(refDaoStub.withArgs(partial).calledOnce);
	        	done();
	        }
	        RefService.getSubjectsMatching(partial, refServiceCallback);
		});

		it('Empty result is not considered an error', function(done) {

			var partial = 'Zz';
			var subjects = [];
	    	var refDaoStub = sandbox.stub(RefDao, "getSubjectsMatching", function(partial, callback) {
	            callback(null, subjects);
	        });

	        var refServiceCallback = function(err, results, message) {
	        	expect(err).to.be.null;
	        	expect(message).to.be.null;
	        	expect(results).not.to.be.null;
	        	expect(results).to.have.length(0);

	     		assert.isTrue(refDaoStub.withArgs(partial).calledOnce);
	        	done();
	        }
	        RefService.getSubjectsMatching(partial, refServiceCallback);
		});

		it('Returns error if error occurs calling dao', function(done) {

			var partial = 'something';
	    	var daoError = new Error('something went wrong');
	    	var refDaoStub = sandbox.stub(RefDao, "getSubjectsMatching", function(partial, callback) {
	            callback(daoError);
	        });
	        var refServiceCallback = function(err, results, message) {
	        	expect(err).not.to.be.null;
	        	expect(err).to.equal(daoError);
	        	expect(message).to.equal(messages.UNABLE_TO_RETRIEVE_SUBJECTS);
	        	expect(results).to.be.null;

	     		assert.isTrue(refDaoStub.withArgs(partial).calledOnce);
	        	done();
	        }
	        RefService.getSubjectsMatching(partial, refServiceCallback);
	    });

    });

	describe('OBJECTIVE', function() {

    	beforeEach(function() {
	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

	    it('Returns objective results', function(done) {

	    	var partial = 'To';
	    	var objectives = [{"descr": "Objective 1"},{"descr":"Objective 2"}];
	    	var refDaoStub = sandbox.stub(RefDao, "getObjectivesMatching", function(partial, callback) {
	            callback(null, objectives);
	        });

	        var refServiceCallback = function(err, results, message) {
	        	expect(err).to.be.null;
	        	expect(message).to.be.null;
	        	expect(results).not.to.be.null;
	        	expect(results).to.have.length(objectives.length);
	        	expect(results[0]).to.equal(objectives[0].descr);
	        	expect(results[1]).to.equal(objectives[1].descr);

	     		assert.isTrue(refDaoStub.withArgs(partial).calledOnce);
	        	done();
	        }
	        RefService.getObjectivesMatching(partial, refServiceCallback);
		});

		it('Empty result is not considered an error', function(done) {

			var partial = 'Zz';
			var objectives = [];
	    	var refDaoStub = sandbox.stub(RefDao, "getObjectivesMatching", function(partial, callback) {
	            callback(null, objectives);
	        });

	        var refServiceCallback = function(err, results, message) {
	        	expect(err).to.be.null;
	        	expect(message).to.be.null;
	        	expect(results).not.to.be.null;
	        	expect(results).to.have.length(0);

	     		assert.isTrue(refDaoStub.withArgs(partial).calledOnce);
	        	done();
	        }
	        RefService.getObjectivesMatching(partial, refServiceCallback);
		});

		it('Returns error if error occurs calling dao', function(done) {

			var partial = 'something';
	    	var daoError = new Error('something went wrong');
	    	var refDaoStub = sandbox.stub(RefDao, "getObjectivesMatching", function(partial, callback) {
	            callback(daoError);
	        });
	        var refServiceCallback = function(err, results, message) {
	        	expect(err).not.to.be.null;
	        	expect(err).to.equal(daoError);
	        	expect(message).to.equal(messages.UNABLE_TO_RETRIEVE_OBJECTIVES);
	        	expect(results).to.be.null;

	     		assert.isTrue(refDaoStub.withArgs(partial).calledOnce);
	        	done();
	        }
	        RefService.getObjectivesMatching(partial, refServiceCallback);
	    });

    });

});