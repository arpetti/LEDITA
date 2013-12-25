var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fixture = require('../../../server/controllers/UserProfileEditController');
var userProfileEditService = require('../../../server/service/UserProfileEditService');

describe('User Profile Edit Controller', function() {

	describe('Get User Profile', function() {

		var req = {};
		var res = {};
		var sandbox = sinon.sandbox.create();

		beforeEach(function() {

		});

		afterEach(function() {
			sandbox.restore();
		});

		it('Sends 500 if service calls back with error', function(done) {
			req.user = {id: 32};
			var serviceError = new Error('something went wrong getting user profile');
			var serviceMessage = 'user find failure';
			var serviceStub = sandbox.stub(userProfileEditService, 'getUserProfile', function(userId, cb) {
				cb(serviceError, null, serviceMessage);
			});

			res.send = function(httpStatus, errMessage) {
				expect(httpStatus).to.equal(500);
				expect(errMessage).to.equal(serviceMessage);
				assert.isTrue(serviceStub.withArgs(req.user.id).calledOnce);
				done();
			};
			fixture.getUserProfile(req, res);
		});

		it('Sends 404 if user not found', function(done) {
			req.user = {id: 33};
			var serviceMessage = 'user not found';
			var serviceStub = sandbox.stub(userProfileEditService, 'getUserProfile', function(userId, cb) {
				cb(null, null, serviceMessage);
			});

			res.send = function(httpStatus, errMessage) {
				expect(httpStatus).to.equal(404);
				expect(errMessage).to.equal(serviceMessage);
				assert.isTrue(serviceStub.withArgs(req.user.id).calledOnce);
				done();
			};
			fixture.getUserProfile(req, res);
		});

		it('Sends 200 with user when found', function(done) {
			req.user = {id: 33};
			var serviceResponse = {id: 33, name: 'Joe', last_name: 'Schmoe'};
			var serviceStub = sandbox.stub(userProfileEditService, 'getUserProfile', function(userId, cb) {
				cb(null, serviceResponse, null);
			});

			res.json = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(200);
				expect(responseData).to.equal(serviceResponse);
				assert.isTrue(serviceStub.withArgs(req.user.id).calledOnce);
				done();
			};
			fixture.getUserProfile(req, res);
		})

	});

});