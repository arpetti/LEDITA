var expect = require('chai').expect
    , assert = require('chai').assert
    , sinon = require('sinon')
    , RefService = require('../../service/RefService')
    , RefController = require('../../controllers/RefController');

describe('Reference Data Controller', function() {

    var req = { }
        , res = {}
        , sandbox = sinon.sandbox.create();


    describe('getQcers', function() {
    
	    beforeEach(function() {
	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

    	it('Returns a 200 with Qcer results from Reference Service', function(done) {

    		var qcers = [{"qcer_id": 1, "qcer_name": "Q1"}, {"qcer_id": 2, "qcer_name": "Q2"}];
    		var serviceStub = sandbox.stub(RefService, "getQcers", function(callback) {
                callback(null, qcers, null);
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                expect(result).to.equal(qcers);
                
                assert.isTrue(serviceStub.calledOnce);
                done();
            };

            RefController.getQcers(req, res);
    	});

    	it('Returns a 500 with message if Reference Service calls back with error', function(done) {

    		var error = new Error("something went wrong");
    		var refMessage = "Unable to retrieve qcers";
    		var serviceStub = sandbox.stub(RefService, "getQcers", function(callback) {
                callback(error, null, refMessage);
            });

            res.send = function(httpStatus, message) {
                expect(httpStatus).to.equal(500);
                expect(message).to.equal(refMessage);
                
                assert.isTrue(serviceStub.calledOnce);
                done();
            };

            RefController.getQcers(req, res);
    	});

    	it('Returns a 404 with message if Reference Service calls back with no results', function(done) {

    		var refMessage = "No qcers found";
    		var serviceStub = sandbox.stub(RefService, "getQcers", function(callback) {
                callback(null, null, refMessage);
            });

            res.send = function(httpStatus, message) {
                expect(httpStatus).to.equal(404);
                expect(message).to.equal(refMessage);
                
                assert.isTrue(serviceStub.calledOnce);
                done();
            };

            RefController.getQcers(req, res);
    	});

    });

	describe('getSubjectsMatching', function() {

		beforeEach(function() {
	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

	    it('Returns a 200 with Subject results from Reference Service', function(done) {

	    	var subjects = [{"name":"Topic 1"},{"name":"Topic 2"}];
    		var serviceStub = sandbox.stub(RefService, "getSubjectsMatching", function(callback) {
                callback(null, subjects, null);
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                expect(result).to.equal(subjects);
                
                assert.isTrue(serviceStub.calledOnce);
                done();
            };

            RefController.getSubjectsMatching(req, res);
	    });

	    it('Returns a 500 with message if Reference Service calls back with error', function(done) {

    		var error = new Error("something went wrong");
    		var refMessage = "Unable to retrieve subjects";
    		var serviceStub = sandbox.stub(RefService, "getSubjectsMatching", function(callback) {
                callback(error, null, refMessage);
            });

            res.send = function(httpStatus, message) {
                expect(httpStatus).to.equal(500);
                expect(message).to.equal(refMessage);
                
                assert.isTrue(serviceStub.calledOnce);
                done();
            };

            RefController.getSubjectsMatching(req, res);
    	});
	});

});    