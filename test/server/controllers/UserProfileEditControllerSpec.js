var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fixture = require('../../../server/controllers/UserProfileEditController');
var userProfileEditService = require('../../../server/service/UserProfileEditService');
var userProfileEditValidator = require('../../../server/validate/UserProfileEditValidator');

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
			req.user = {
				id: 32
			};
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
			req.user = {
				id: 33
			};
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
			req.user = {
				id: 33
			};
			var serviceResponse = {
				id: 33,
				name: 'Joe',
				last_name: 'Schmoe'
			};
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

	describe('Update First Name', function() {

		var req = {};
		var res = {};
		var sandbox = sinon.sandbox.create();

		beforeEach(function() {

		});

		afterEach(function() {
			sandbox.restore();
		});

		it('Sends 500 with message when service calls back with error', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				firstName: 'Janice'
			};

			var validationResult = [];
			var validatorStub = sandbox.stub(userProfileEditValidator, 'validateFirstName').returns(validationResult);
			
			var serviceError = new Error('something went wrong with service updating user profile last name');
			var serviceMessage = 'update first name failed';
			var serviceStub = sandbox.stub(userProfileEditService, 'updateFirstName', function(userId, firstName, cb) {
				cb(serviceError, serviceMessage);
			});
			
			res.send = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(500);
				expect(responseData).to.equal(serviceMessage);
				
				assert.isTrue(validatorStub.withArgs(req.body.firstName).calledOnce);
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.firstName).calledOnce);
				done();
			};
			fixture.updateFirstName(req, res);
		});

		it('Sends 400 with error messages when validator fails', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				firstName: 'Janice123'
			};

			var validationResult = ['invalid first name'];
			var validatorStub = sandbox.stub(userProfileEditValidator, 'validateFirstName').returns(validationResult);

			var serviceStub = sandbox.stub(userProfileEditService, 'updateFirstName');

			res.send = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(400);
				expect(responseData).to.equal(validationResult);

				assert.isTrue(validatorStub.withArgs(req.body.firstName).calledOnce);
				assert.equal(serviceStub.callCount, 0);
				done();
			}
			fixture.updateFirstName(req, res);
		});

		it('Sends 200 with empty response when successful', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				firstName: 'Janice'
			};

			var validationResult = [];
			var validatorStub = sandbox.stub(userProfileEditValidator, 'validateFirstName').returns(validationResult);

			var serviceStub = sandbox.stub(userProfileEditService, 'updateFirstName', function(userId, firstName, cb) {
				cb();
			});

			res.json = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(200);
				expect(responseData).to.be.empty;

				assert.isTrue(validatorStub.withArgs(req.body.firstName).calledOnce);
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.firstName).calledOnce);
				done();
			}
			fixture.updateFirstName(req, res);
		});

	});

	describe('Update Last Name', function() {

		var req = {};
		var res = {};
		var sandbox = sinon.sandbox.create();

		beforeEach(function() {

		});

		afterEach(function() {
			sandbox.restore();
		});

		it('Sends 500 with message when service calls back with error', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				lastName: 'Smiths'
			};

			var validationResult = [];
			var validatorStub = sandbox.stub(userProfileEditValidator, 'validateLastName').returns(validationResult);

			var serviceError = new Error('something went wrong with service updating user profile first name');
			var serviceMessage = 'update first name failed';
			var serviceStub = sandbox.stub(userProfileEditService, 'updateLastName', function(userId, lastName, cb) {
				cb(serviceError, serviceMessage);
			});

			res.send = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(500);
				expect(responseData).to.equal(serviceMessage);
				
				assert.isTrue(validatorStub.withArgs(req.body.lastName).calledOnce);
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.lastName).calledOnce);
				done();
			};
			fixture.updateLastName(req, res);
		});

		it('Sends 400 with error messages when validator fails', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				lastName: 'Smith123'
			};

			var validationResult = ['invalid last name'];
			var validatorStub = sandbox.stub(userProfileEditValidator, 'validateLastName').returns(validationResult);

			var serviceStub = sandbox.stub(userProfileEditService, 'updateLastName');

			res.send = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(400);
				expect(responseData).to.equal(validationResult);

				assert.isTrue(validatorStub.withArgs(req.body.lastName).calledOnce);
				assert.equal(serviceStub.callCount, 0);
				done();
			}
			fixture.updateLastName(req, res);
		});

		it('Sends 200 with empty response when successful', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				lastName: 'Smiths'
			};

			var validationResult = [];
			var validatorStub = sandbox.stub(userProfileEditValidator, 'validateLastName').returns(validationResult);

			var serviceStub = sandbox.stub(userProfileEditService, 'updateLastName', function(userId, lastName, cb) {
				cb();
			});

			res.json = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(200);
				expect(responseData).to.be.empty;

				assert.isTrue(validatorStub.withArgs(req.body.lastName).calledOnce);
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.lastName).calledOnce);
				done();
			}
			fixture.updateLastName(req, res);
		});

	});

	describe('Update Email', function() {

		var req = {};
		var res = {};
		var sandbox = sinon.sandbox.create();

		beforeEach(function() {

		});

		afterEach(function() {
			sandbox.restore();
		});

		it('Sends 500 with message when service calls back with error', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				email: 'j.j@test.test'
			};
			var serviceError = new Error('something went wrong with service updating user profile email');
			var serviceMessage = 'update email failed';
			var serviceStub = sandbox.stub(userProfileEditService, 'updateEmail', function(userId, email, cb) {
				cb(serviceError, serviceMessage);
			});
			res.send = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(500);
				expect(responseData).to.equal(serviceMessage);
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.email).calledOnce);
				done();
			};
			fixture.updateEmail(req, res);
		});

		it('Sends 200 with empty response when successful', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				email: 'j.j@test.test'
			};
			var serviceStub = sandbox.stub(userProfileEditService, 'updateEmail', function(userId, email, cb) {
				cb();
			});
			res.json = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(200);
				expect(responseData).to.be.empty;
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.email).calledOnce);
				done();
			}
			fixture.updateEmail(req, res);
		});

	});

	describe('Update Workplace', function() {

		var req = {};
		var res = {};
		var sandbox = sinon.sandbox.create();

		beforeEach(function() {

		});

		afterEach(function() {
			sandbox.restore();
		});

		it('Sends 500 with message when service calls back with error', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				workplace: 'Acme Corporation'
			};
			var serviceError = new Error('something went wrong with service updating user profile workplace');
			var serviceMessage = 'update workplace failed';
			var serviceStub = sandbox.stub(userProfileEditService, 'updateWorkplace', function(userId, workplace, cb) {
				cb(serviceError, serviceMessage);
			});
			res.send = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(500);
				expect(responseData).to.equal(serviceMessage);
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.workplace).calledOnce);
				done();
			};
			fixture.updateWorkplace(req, res);
		});

		it('Sends 200 with empty response when successful', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				workplace: 'Acme Corporation'
			};
			var serviceStub = sandbox.stub(userProfileEditService, 'updateWorkplace', function(userId, workplace, cb) {
				cb();
			});
			res.json = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(200);
				expect(responseData).to.be.empty;
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.workplace).calledOnce);
				done();
			}
			fixture.updateWorkplace(req, res);
		});

	});

	describe('Update City', function() {

		var req = {};
		var res = {};
		var sandbox = sinon.sandbox.create();

		beforeEach(function() {

		});

		afterEach(function() {
			sandbox.restore();
		});

		it('Sends 500 with message when service calls back with error', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				city: 'Acmeville'
			};
			var serviceError = new Error('something went wrong with service updating user profile city');
			var serviceMessage = 'update city failed';
			var serviceStub = sandbox.stub(userProfileEditService, 'updateCity', function(userId, city, cb) {
				cb(serviceError, serviceMessage);
			});
			res.send = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(500);
				expect(responseData).to.equal(serviceMessage);
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.city).calledOnce);
				done();
			};
			fixture.updateCity(req, res);
		});

		it('Sends 200 with empty response when successful', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				city: 'Acmeville'
			};
			var serviceStub = sandbox.stub(userProfileEditService, 'updateCity', function(userId, city, cb) {
				cb();
			});
			res.json = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(200);
				expect(responseData).to.be.empty;
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.city).calledOnce);
				done();
			}
			fixture.updateCity(req, res);
		});

	});

	describe('Update Country', function() {

		var req = {};
		var res = {};
		var sandbox = sinon.sandbox.create();

		beforeEach(function() {

		});

		afterEach(function() {
			sandbox.restore();
		});

		it('Sends 500 with message when service calls back with error', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				country: 'Iceland'
			};
			var serviceError = new Error('something went wrong with service updating user profile country');
			var serviceMessage = 'update country failed';
			var serviceStub = sandbox.stub(userProfileEditService, 'updateCountry', function(userId, country, cb) {
				cb(serviceError, serviceMessage);
			});
			res.send = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(500);
				expect(responseData).to.equal(serviceMessage);
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.country).calledOnce);
				done();
			};
			fixture.updateCountry(req, res);
		});

		it('Sends 200 with empty response when successful', function(done) {
			req.user = {
				id: 32
			};
			req.body = {
				country: 'Iceland'
			};
			var serviceStub = sandbox.stub(userProfileEditService, 'updateCountry', function(userId, country, cb) {
				cb();
			});
			res.json = function(httpStatus, responseData) {
				expect(httpStatus).to.equal(200);
				expect(responseData).to.be.empty;
				assert.isTrue(serviceStub.withArgs(req.user.id, req.body.country).calledOnce);
				done();
			}
			fixture.updateCountry(req, res);
		});

	});

});