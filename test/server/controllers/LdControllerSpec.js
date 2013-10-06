var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var when   = require('when');
var LdController = require('../../../server/controllers/LdController');
var LearningDesignDao = require('../../../server/dao/LdDao');
var LdGetService = require('../../../server/service/LdGetService');
var LdCreateValidator = require('../../../server/service/LdCreateValidator')
var LdCreateService = require('../../../server/service/LdCreateService');
var messages = require('../../../server/service/ValidationMessages');

describe('Learning Design Controller', function() {

    var req = {}
        , res = {}
        , sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('find by id', function() {

    	it('Returns a 500 when unexpected error occurs getting learning design from dao', function(done) {

    		var learningDesignId = 956;
    		req.params = {id: learningDesignId};

            var serviceError = new Error("something went wrong");
            var serviceStub = sandbox.stub(LdGetService, 'getLearningDesignPromise').
                returns(when.reject(serviceError));

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceError.message);
                assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
                done();
            };

            LdController.findById(req, res);
    	});

    	it('Returns a 404 when learning design not found', function(done) {

    		var learningDesignId = 956;
    		req.params = {id: learningDesignId};

            var serviceResponse = [
                    [],
                    [],
                    [],
                    [],
                    []
                ];
            var serviceStub = sandbox.stub(LdGetService, 'getLearningDesignPromise').
                returns(when(serviceResponse));

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(404);
                expect(errMessage).to.equal(messages.LD_NOT_FOUND);
                assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
            };

            LdController.findById(req, res).then(function(results) {
                }).then(done, done);

    	});

        it('Returns a 400 when incorrect number of data elements are found', function(done) {
            var learningDesignId = 956;
            req.params = {id: learningDesignId};

            var serviceResponse = [
                    [{"ld_id":1,"ld_name":"Learningà Designè Titleì Demoò 1ù é"}],
                    [{"subject_name":"Topic 1"},{"subject_name":"Topic 5"}],
                    [{"objective_descr":"Objective 1"},{"objective_descr":"Objective 6"}],
                    [{"prereq_name":"prereq1", "prereq_type": "OBJECTIVE"}],
                    [{"qcer_name":"C1"}],
                    [{"something": "does not belong here"}]
                ];
            var serviceStub = sandbox.stub(LdGetService, 'getLearningDesignPromise').
                returns(when(serviceResponse));

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(400);
                expect(errMessage).to.equal(messages.LD_DETAIL_NOT_FOUND);
                assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
            }

            LdController.findById(req, res).then(function(results) {
                }).then(done, done);
        });

    	it('Returns a 200 when learning design is found', function(done) {
    		var learningDesignId = 956;
    		req.params = {id: learningDesignId};

            var serviceResponse = [
                    [{"ld_id":1,"ld_name":"Learningà Designè Titleì Demoò 1ù é"}],
                    [{"subject_name":"Topic 1"},{"subject_name":"Topic 5"}],
                    [{"objective_descr":"Objective 1"},{"objective_descr":"Objective 6"}],
                    [{"qcer_name": "A2"}]
                ]
            var serviceStub = sandbox.stub(LdGetService, 'getLearningDesignPromise').
                returns(when(serviceResponse));

            res.json = function(httpStatus, result) {
            	expect(httpStatus).to.equal(200);
            	expect(result.ld_id).to.equal(1);
            	expect(result.ld_name).to.equal('Learningà Designè Titleì Demoò 1ù é');
                expect(result.subjects[0].subject_name).to.equal('Topic 1');
                expect(result.subjects[1].subject_name).to.equal('Topic 5');
                expect(result.objectives[0].objective_descr).to.equal('Objective 1');
                expect(result.objectives[1].objective_descr).to.equal('Objective 6');
                expect(result.qcers[0].qcer_name).to.equal('A2');

            	assert.isTrue(serviceStub.withArgs(learningDesignId).calledOnce);
            }

            LdController.findById(req, res).then(function(results) {
                }).then(done, done);
    	});

    });

    describe('find all', function() {

    	it('Returns a 500 when unexpected error occurs getting learning designs from dao', function(done) {

    		var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to retrieve lds";
    		var serviceStub = sandbox.stub(LdGetService, "getAllLearningDesigns", function(callback) {
                callback(serviceError, null, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                
                assert.isTrue(serviceStub.calledOnce);
                done();
            };

            LdController.index(req, res);
    	});

    	it('Returns a 200 when learning designs are retrieved successfully', function(done) {

    		var ldResults = [{ld_id: 1, ld_name: "Demo 1"}, {ld_id: 2, ld_name: "Demo 2"}];
    		var serviceStub = sandbox.stub(LdGetService, "getAllLearningDesigns", function(callback) {
                callback(null, ldResults);
            });

            res.json = function(httpStatus, results) {
                expect(httpStatus).to.equal(200);
                expect(results.length).to.equal(ldResults.length);
                expect(results).to.equal(ldResults);
                
                assert.isTrue(serviceStub.calledOnce);
                done();
            };

            LdController.index(req, res);
    	});
    });

	describe('Create Learning Design', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Returns a 500 when Create LD Service returns error', function(done) {
			var user = {id: 12};
			var ldData = {
				name: "Test LD Create",
	    		qcers: {"3": true, "6": true},
	    		scope: "Test LD Scope",
	    		topics: ["Topic 1","New Topic 23"],
	    		objectives: ["Objective 1", "New Objective 98"],
	    		requisites: ["Objective 3", "New Objective 216"],
	    		studentsDescription: "Test Students Description"
			};	
			req.user = user;
			req.body = ldData;

			var errorMessages = [];
            var validateStub = sandbox.stub(LdCreateValidator, "validate").returns(errorMessages);

			var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to create LD";
    		var serviceStub = sandbox.stub(LdCreateService, "createLd", function(userId, ldData, callback) {
                callback(serviceError, null, serviceMessage);
            });

			res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(validateStub.withArgs(req.body).calledOnce);
                assert.isTrue(serviceStub.withArgs(user.id, req.body).calledOnce);
                done();
            };
            LdController.createLd(req, res);
		});

		it('Returns a 400 with validation messages when ld create validation fails', function(done) {
			var user = {id: 12};
			var ldData = {
				name: "",
	    		qcers: {},
	    		scope: "",
	    		topics: [],
	    		objectives: [],
	    		requisites: [],
	    		studentsDescription: ""
			};	
			req.user = user;
			req.body = ldData;

			var errorMessages = ["bad data"];
            var validateStub = sandbox.stub(LdCreateValidator, "validate").returns(errorMessages);

            var serviceStub = sandbox.stub(LdCreateService, "createLd");

            res.send = function(httpStatus, ldDataErrors) {
                expect(httpStatus).to.equal(400);
                expect(ldDataErrors).to.equal(errorMessages);
                assert.isTrue(validateStub.withArgs(req.body).calledOnce);
                assert.equal(serviceStub.callCount, 0, "ld is not created when there are validation errors");
                done();
            };
            LdController.createLd(req, res);
		});

		it('Returns a 200 with newly created LD ID when successful', function(done) {
			var user = {id: 12};
			var ldData = {
				name: "Test LD Create",
	    		qcers: {"3": true, "6": true},
	    		scope: "Test LD Scope",
	    		topics: ["Topic 1","New Topic 23"],
	    		objectives: ["Objective 1", "New Objective 98"],
	    		requisites: ["Objective 3", "New Objective 216"],
	    		studentsDescription: "Test Students Description"
			};	
			req.user = user;
			req.body = ldData;

			var errorMessages = [];
            var validateStub = sandbox.stub(LdCreateValidator, "validate").returns(errorMessages);

			var ldId = 201;
    		var serviceStub = sandbox.stub(LdCreateService, "createLd", function(userId, ldData, callback) {
                callback(null, ldId, null);
            });

			res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                expect(result.ldid).to.equal(ldId);
                assert.isTrue(validateStub.withArgs(req.body).calledOnce);
                assert.isTrue(serviceStub.withArgs(user.id, req.body).calledOnce);
                done();
            };
            LdController.createLd(req, res);
		});

	});

});    