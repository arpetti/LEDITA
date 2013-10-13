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
            var serviceMessage = "Unable to create LD";
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

});