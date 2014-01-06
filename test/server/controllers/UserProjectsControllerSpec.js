var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var userProjectsService = require('../../../server/service/UserProjectsService');
var fixture = require('../../../server/controllers/UserProjectsController');

describe('User Projects Controller', function() {

	describe('Get Public Projects', function() {

		var req = {};
    var res = {};
    var sandbox = sinon.sandbox.create();

    beforeEach(function() {
    });

    afterEach(function() {
      sandbox.restore();
    });

		it('Sends 500 with error messgae when service calls back with error', function(done) {
			var userId = 45;
			req.params = {id: userId};

			var serviceError = new Error('something went wrong getting public projects');
			var serviceStub = sandbox.stub(userProjectsService, 'getPublicProjects', function(userId, cb) {
				cb(serviceError);
			});

			res.send = function(httpStatus, message) {
				expect(httpStatus).to.equal(500);
				expect(message).to.equal(serviceError.message);
				assert.isTrue(serviceStub.withArgs(userId).calledOnce);
				done();
			};
			fixture.getPublicProjects(req, res);
		});

		it('Sends 200 with results when successful', function(done) {
			var userId = 45;
			req.params = {id: userId};

			var serviceResult = {userInfo: {name: 'joe'}, userProjects: [{ld_name: 'LD1'}, {ld_name: 'LD2'}]};
			var serviceStub = sandbox.stub(userProjectsService, 'getPublicProjects', function(userId, cb) {
				cb(null, serviceResult);
			});

			res.json = function(httpStatus, results) {
				expect(httpStatus).to.equal(200);
				expect(results).to.equal(serviceResult);
				assert.isTrue(serviceStub.withArgs(userId).calledOnce);
				done();
			};
			fixture.getPublicProjects(req, res);
		});

	});

	describe('Get Public and Private Projects', function() {

		var req = {};
    var res = {};
    var sandbox = sinon.sandbox.create();

    beforeEach(function() {
    });

    afterEach(function() {
      sandbox.restore();
    });

		it('Sends 500 with error messgae when service calls back with error', function(done) {
			var userId = 45;
			req.user = {id: userId};

			var serviceError = new Error('something went wrong getting public and private projects');
			var serviceStub = sandbox.stub(userProjectsService, 'getPublicAndPrivateProjects', function(userId, cb) {
				cb(serviceError);
			});

			res.send = function(httpStatus, message) {
				expect(httpStatus).to.equal(500);
				expect(message).to.equal(serviceError.message);
				assert.isTrue(serviceStub.withArgs(userId).calledOnce);
				done();
			};
			fixture.getPublicAndPrivateProjects(req, res);
		});

		it('Sends 200 with results when successful', function(done) {
			var userId = 45;
			req.user = {id: userId};

			var serviceResult = [{ld_name: 'LD1'}, {ld_name: 'LD2'}];
			var serviceStub = sandbox.stub(userProjectsService, 'getPublicAndPrivateProjects', function(userId, cb) {
				cb(null, serviceResult);
			});

			res.json = function(httpStatus, results) {
				expect(httpStatus).to.equal(200);
				expect(results).to.equal(serviceResult);
				assert.isTrue(serviceStub.withArgs(userId).calledOnce);
				done();
			};
			fixture.getPublicAndPrivateProjects(req, res);
		});

	});

});