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
                callback(serviceError, null, serviceMessage);
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
                callback(serviceError, null, serviceMessage);
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
                callback(serviceError, null, serviceMessage);
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

});