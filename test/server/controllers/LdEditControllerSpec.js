var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var LdEditController = require('../../../server/controllers/LdEditController');
var LdEditValidator = require('../../../server/validate/LdEditValidator')
var LdEditService = require('../../../server/service/LdEditService');
var messages = require('../../../server/validate/ValidationMessages');

describe('Learning Design Edit Controller', function() {

	describe('Update Learning Design Name', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 400 if validator returns error messages', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var ldName = 'this is a name';
    		req.body = {ldName: ldName};

    		var errorMessages = ['something wrong with that name'];
            var validateStub = sandbox.stub(LdEditValidator, "validateLdName").returns(errorMessages);

            var serviceStub = sandbox.stub(LdEditService, "updateLdName");

            res.send = function(httpStatus, ldDataErrors) {
                expect(httpStatus).to.equal(400);
                expect(ldDataErrors).to.equal(errorMessages);
                assert.isTrue(validateStub.withArgs(ldName).calledOnce);
                assert.equal(serviceStub.callCount, 0, "ld name is not updated when there are validation errors");
                done();
            };
            LdEditController.updateLdName(req, res);
		});

		it('Sends 500 if service calls back with error', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var ldName = 'this is a name';
    		req.body = {ldName: ldName};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateLdName").returns(errorMessages);

            var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to update LD Name";
    		var serviceStub = sandbox.stub(LdEditService, "updateLdName", function(ldName, ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(validateStub.withArgs(ldName).calledOnce);
                assert.isTrue(serviceStub.withArgs(ldName, ldId).calledOnce);
                done();
            };
            LdEditController.updateLdName(req, res);
		});

		it('Sends 200 if service update is successful', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var ldName = 'this is a name';
    		req.body = {ldName: ldName};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateLdName").returns(errorMessages);

    		var serviceStub = sandbox.stub(LdEditService, "updateLdName", function(ldName, ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                expect(result.ldName).to.equal(ldName);
                assert.isTrue(validateStub.withArgs(ldName).calledOnce);
                assert.isTrue(serviceStub.withArgs(ldName, ldId).calledOnce);
                done();
            };
            LdEditController.updateLdName(req, res);
		});
	});

	describe('Update Learning Design Scope', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 400 if validator returns error messages', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var ldScope = 'this is a scope';
    		req.body = {ldScope: ldScope};

    		var errorMessages = ['something wrong with that scope'];
            var validateStub = sandbox.stub(LdEditValidator, "validateLdScope").returns(errorMessages);

            var serviceStub = sandbox.stub(LdEditService, "updateLdScope");

            res.send = function(httpStatus, ldDataErrors) {
                expect(httpStatus).to.equal(400);
                expect(ldDataErrors).to.equal(errorMessages);
                assert.isTrue(validateStub.withArgs(ldScope).calledOnce);
                assert.equal(serviceStub.callCount, 0, "ld scope is not updated when there are validation errors");
                done();
            };
            LdEditController.updateLdScope(req, res);
		});

		it('Sends 500 if service calls back with error', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var ldScope = 'this is a scope';
    		req.body = {ldScope: ldScope};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateLdScope").returns(errorMessages);

            var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to update LD Scope";
    		var serviceStub = sandbox.stub(LdEditService, "updateLdScope", function(ldName, ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(validateStub.withArgs(ldScope).calledOnce);
                assert.isTrue(serviceStub.withArgs(ldScope, ldId).calledOnce);
                done();
            };
            LdEditController.updateLdScope(req, res);
		});

		it('Sends 200 if service update is successful', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var ldScope = 'this is a scope';
    		req.body = {ldScope: ldScope};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateLdScope").returns(errorMessages);

    		var serviceStub = sandbox.stub(LdEditService, "updateLdScope", function(ldName, ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                expect(result.ldScope).to.equal(ldScope);
                assert.isTrue(validateStub.withArgs(ldScope).calledOnce);
                assert.isTrue(serviceStub.withArgs(ldScope, ldId).calledOnce);
                done();
            };
            LdEditController.updateLdScope(req, res);
		});
	});

	describe('Update Learning Design Qcers', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 400 if validator returns error messages', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var ldQcers = {"1":false, "2":false};
    		req.body = {ldQcers: ldQcers};

    		var errorMessages = ['something wrong with that qcers'];
            var validateStub = sandbox.stub(LdEditValidator, "validateQcers").returns(errorMessages);

            var serviceStub = sandbox.stub(LdEditService, "updateQcers");

            res.send = function(httpStatus, ldDataErrors) {
                expect(httpStatus).to.equal(400);
                expect(ldDataErrors).to.equal(errorMessages);
                assert.isTrue(validateStub.withArgs(ldQcers).calledOnce);
                assert.equal(serviceStub.callCount, 0, "ld qcers are not updated when there are validation errors");
                done();
            };
            LdEditController.updateQcers(req, res);
		});

		it('Sends 500 if service calls back with error', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var ldQcers = {"1":false, "2":false};
    		req.body = {ldQcers: ldQcers};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateQcers").returns(errorMessages);

            var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to update LD Qcers";
    		var serviceStub = sandbox.stub(LdEditService, "updateQcers", function(qcers, ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(validateStub.withArgs(ldQcers).calledOnce);
                assert.isTrue(serviceStub.withArgs(ldQcers, ldId).calledOnce);
                done();
            };
            LdEditController.updateQcers(req, res);
		});

		it('Sends 200 if service update is successful', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var ldQcers = {"1":false, "2":false};
    		req.body = {ldQcers: ldQcers};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateQcers").returns(errorMessages);

    		var serviceStub = sandbox.stub(LdEditService, "updateQcers", function(qcers, ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                assert.isTrue(validateStub.withArgs(ldQcers).calledOnce);
                assert.isTrue(serviceStub.withArgs(ldQcers, ldId).calledOnce);
                done();
            };
            LdEditController.updateQcers(req, res);
		});
	});

	describe('Add Topic', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 400 if validator returns error messages', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var topic = "something to add";
    		req.body = {topic: topic};

    		var errorMessages = ['something wrong with that topic'];
            var validateStub = sandbox.stub(LdEditValidator, "validateTopic").returns(errorMessages);

            var serviceStub = sandbox.stub(LdEditService, "addTopic");

            res.send = function(httpStatus, ldDataErrors) {
                expect(httpStatus).to.equal(400);
                expect(ldDataErrors).to.equal(errorMessages);
                assert.isTrue(validateStub.withArgs(topic).calledOnce);
                assert.equal(serviceStub.callCount, 0, "topic is not added when there are validation errors");
                done();
            };
            LdEditController.addTopic(req, res);
		});

		it('Sends 500 if service calls back with error', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var topic = "something to add";
    		req.body = {topic: topic};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateTopic").returns(errorMessages);

            var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to add topic";
    		var serviceStub = sandbox.stub(LdEditService, "addTopic", function(qcers, ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(validateStub.withArgs(topic).calledOnce);
                assert.isTrue(serviceStub.withArgs(topic, ldId).calledOnce);
                done();
            };
            LdEditController.addTopic(req, res);
		});

		it('Sends 200 if service update is successful', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var topic = "something to add";
    		req.body = {topic: topic};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateTopic").returns(errorMessages);

    		var serviceStub = sandbox.stub(LdEditService, "addTopic", function(topic, ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                assert.isTrue(validateStub.withArgs(topic).calledOnce);
                assert.isTrue(serviceStub.withArgs(topic, ldId).calledOnce);
                done();
            };
            LdEditController.addTopic(req, res);
		});
	});

	describe('Remove Topic', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

	    it('Sends 200 if service update is successful', function(done) {
	    	var ldId = 956;
    		req.params = {id: ldId};

    		var topic = "something to remove";
    		req.body = {topic: topic};

    		var serviceStub = sandbox.stub(LdEditService, "removeTopic", function(topic, ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                assert.isTrue(serviceStub.withArgs(topic, ldId).calledOnce);
                done();
            };
            LdEditController.removeTopic(req, res);
	    });

	    it('Sends 500 with message if service update fails', function(done) {
	    	var ldId = 956;
    		req.params = {id: ldId};

    		var topic = "something to remove";
    		req.body = {topic: topic};

    		var serviceError = new Error('something went wrong');
    		var serviceMessage = 'failed to remove';
    		var serviceStub = sandbox.stub(LdEditService, "removeTopic", function(topic, ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(serviceStub.withArgs(topic, ldId).calledOnce);
                done();
            };
            LdEditController.removeTopic(req, res);
	    });
	});

	describe('Add Objective', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 400 if validator returns error messages', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var objective = "something to add";
    		req.body = {objective: objective};

    		var errorMessages = ['something wrong with that objective'];
            var validateStub = sandbox.stub(LdEditValidator, "validateObjective").returns(errorMessages);

            var serviceStub = sandbox.stub(LdEditService, "addObjective");

            res.send = function(httpStatus, ldDataErrors) {
                expect(httpStatus).to.equal(400);
                expect(ldDataErrors).to.equal(errorMessages);
                assert.isTrue(validateStub.withArgs(objective).calledOnce);
                assert.equal(serviceStub.callCount, 0, "objective is not added when there are validation errors");
                done();
            };
            LdEditController.addObjective(req, res);
		});

		it('Sends 500 if service calls back with error', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var objective = "something to add";
    		req.body = {objective: objective};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateObjective").returns(errorMessages);

            var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to add objective";
    		var serviceStub = sandbox.stub(LdEditService, "addObjective", function(qcers, ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(validateStub.withArgs(objective).calledOnce);
                assert.isTrue(serviceStub.withArgs(objective, ldId).calledOnce);
                done();
            };
            LdEditController.addObjective(req, res);
		});

		it('Sends 200 if service update is successful', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var objective = "something to add";
    		req.body = {objective: objective};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateObjective").returns(errorMessages);

    		var serviceStub = sandbox.stub(LdEditService, "addObjective", function(qcers, ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                assert.isTrue(validateStub.withArgs(objective).calledOnce);
                assert.isTrue(serviceStub.withArgs(objective, ldId).calledOnce);
                done();
            };
            LdEditController.addObjective(req, res);
		});
	});

	describe('Add Prerequisite', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 400 if validator returns error messages', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var prerequisite = "something to add";
    		req.body = {prerequisite: prerequisite};

    		var errorMessages = ['something wrong with that prerequisite'];
            var validateStub = sandbox.stub(LdEditValidator, "validatePrerequisite").returns(errorMessages);

            var serviceStub = sandbox.stub(LdEditService, "addPrerequisite");

            res.send = function(httpStatus, ldDataErrors) {
                expect(httpStatus).to.equal(400);
                expect(ldDataErrors).to.equal(errorMessages);
                assert.isTrue(validateStub.withArgs(prerequisite).calledOnce);
                assert.equal(serviceStub.callCount, 0, "prerequisite is not added when there are validation errors");
                done();
            };
            LdEditController.addPrerequisite(req, res);
		});

		it('Sends 500 if service calls back with error', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var prerequisite = "something to add";
    		req.body = {prerequisite: prerequisite};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validatePrerequisite").returns(errorMessages);

            var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to add prerequisite";
    		var serviceStub = sandbox.stub(LdEditService, "addPrerequisite", function(qcers, ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(validateStub.withArgs(prerequisite).calledOnce);
                assert.isTrue(serviceStub.withArgs(prerequisite, ldId).calledOnce);
                done();
            };
            LdEditController.addPrerequisite(req, res);
		});

		it('Sends 200 if service update is successful', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var prerequisite = "something to add";
    		req.body = {prerequisite: prerequisite};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validatePrerequisite").returns(errorMessages);

    		var serviceStub = sandbox.stub(LdEditService, "addPrerequisite", function(qcers, ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                assert.isTrue(validateStub.withArgs(prerequisite).calledOnce);
                assert.isTrue(serviceStub.withArgs(prerequisite, ldId).calledOnce);
                done();
            };
            LdEditController.addPrerequisite(req, res);
		});
	});

	describe('Update Students Description', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 400 if validator returns error messages', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var studentsDescr = 'this is a students description';
    		req.body = {studentsDescr: studentsDescr};

    		var errorMessages = ['something wrong with that description'];
            var validateStub = sandbox.stub(LdEditValidator, "validateStudentsDescr").returns(errorMessages);

            var serviceStub = sandbox.stub(LdEditService, "updateStudentsDescr");

            res.send = function(httpStatus, ldDataErrors) {
                expect(httpStatus).to.equal(400);
                expect(ldDataErrors).to.equal(errorMessages);
                assert.isTrue(validateStub.withArgs(studentsDescr).calledOnce);
                assert.equal(serviceStub.callCount, 0, "students description is not updated when there are validation errors");
                done();
            };
            LdEditController.updateStudentsDescr(req, res);
		});

		it('Sends 500 if service calls back with error', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var studentsDescr = 'this is a students description';
    		req.body = {studentsDescr: studentsDescr};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateStudentsDescr").returns(errorMessages);

            var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to update Students Description";
    		var serviceStub = sandbox.stub(LdEditService, "updateStudentsDescr", function(studentsDescr, ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(validateStub.withArgs(studentsDescr).calledOnce);
                assert.isTrue(serviceStub.withArgs(studentsDescr, ldId).calledOnce);
                done();
            };
            LdEditController.updateStudentsDescr(req, res);
		});

		it('Sends 200 if service update is successful', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var studentsDescr = 'this is a students description';
    		req.body = {studentsDescr: studentsDescr};

    		var errorMessages = [];
            var validateStub = sandbox.stub(LdEditValidator, "validateStudentsDescr").returns(errorMessages);

    		var serviceStub = sandbox.stub(LdEditService, "updateStudentsDescr", function(studentsDescr, ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                expect(result.studentsDescr).to.equal(studentsDescr);
                assert.isTrue(validateStub.withArgs(studentsDescr).calledOnce);
                assert.isTrue(serviceStub.withArgs(studentsDescr, ldId).calledOnce);
                done();
            };
            LdEditController.updateStudentsDescr(req, res);
		});
	});

	describe('Update Publication to Public', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 500 if service calls back with error', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to update Publication";
    		var serviceStub = sandbox.stub(LdEditService, "updateLdPublic", function(ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(serviceStub.withArgs(ldId).calledOnce);
                done();
            };
            LdEditController.updateLdPublic(req, res);
		});

		it('Sends 200 if service update is successful', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var serviceStub = sandbox.stub(LdEditService, "updateLdPublic", function(ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                assert.isTrue(serviceStub.withArgs(ldId).calledOnce);
                done();
            };
            LdEditController.updateLdPublic(req, res);
		});

	});

	describe('Update Publication to Private', function() {

		var req = {}
	        , res = {}
	        , sandbox = sinon.sandbox.create();

	    beforeEach(function() {

	    });

	    afterEach(function() {
	        sandbox.restore();
	    });

		it('Sends 500 if service calls back with error', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var serviceError = new Error("something went wrong");
            var serviceMessage = "Unable to update Publication";
    		var serviceStub = sandbox.stub(LdEditService, "updateLdPrivate", function(ldId, callback) {
                callback(serviceError, serviceMessage);
            });

            res.send = function(httpStatus, errMessage) {
                expect(httpStatus).to.equal(500);
                expect(errMessage).to.equal(serviceMessage);
                assert.isTrue(serviceStub.withArgs(ldId).calledOnce);
                done();
            };
            LdEditController.updateLdPrivate(req, res);
		});

		it('Sends 200 if service update is successful', function(done) {
			var ldId = 956;
    		req.params = {id: ldId};

    		var serviceStub = sandbox.stub(LdEditService, "updateLdPrivate", function(ldId, callback) {
                callback();
            });

            res.json = function(httpStatus, result) {
                expect(httpStatus).to.equal(200);
                assert.isTrue(serviceStub.withArgs(ldId).calledOnce);
                done();
            };
            LdEditController.updateLdPrivate(req, res);
		});

	});

});