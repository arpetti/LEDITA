var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fixture = require('../../../server/service/UserProfileEditService');
var userDao = require('../../../server/dao/UserDao');
var userProfileEditDao = require('../../../server/dao/UserProfileEditDao');
var messages = require('../../../server/validate/ValidationMessages');

describe('User Profile Edit Service', function() {

	var sandbox = sinon.sandbox.create();

	describe('Get User Profile', function() {

		beforeEach(function() {

		});

		afterEach(function() {
			sandbox.restore();
		});

		it('Calls back with error and message when user dao errors', function(done) {
			var userId = 98;
			var userDaoError = new Error('something went wrong finding user');
			var userDaoStub = sandbox.stub(userDao, 'getUserById', function(userId, cb) {
				cb(userDaoError);
			});

			var serviceCB = function(err, user, message) {
				expect(err).not.to.be.null;
				expect(user).to.be.null;
				expect(message).to.equal(messages.USER_FIND_FAIL);
				assert.isTrue(userDaoStub.withArgs(userId).calledOnce);
				done();
			};
			fixture.getUserProfile(userId, serviceCB);
		});

		it('Calls back with message when user not found', function(done) {
			var userId = 7896;
			var userDaoResult = [];
			var userDaoStub = sandbox.stub(userDao, 'getUserById', function(userId, cb) {
				cb(null, userDaoResult);
			});

			var serviceCB = function(err, user, message) {
				expect(err).to.be.null;
				expect(user).to.be.null;
				expect(message).to.equal(messages.USER_NOT_FOUND);
				assert.isTrue(userDaoStub.withArgs(userId).calledOnce);
				done();
			};
			fixture.getUserProfile(userId, serviceCB);
		});

		it('Calls back with user when successful', function(done) {
			var userId = 34;
			var userDaoResult = [{
				id: 34,
				name: 'joe'
			}];
			var userDaoStub = sandbox.stub(userDao, 'getUserById', function(userId, cb) {
				cb(null, userDaoResult);
			});

			var serviceCB = function(err, user, message) {
				expect(err).to.be.null;
				expect(user.id).to.equal(userDaoResult[0].id);
				expect(user.name).to.equal(userDaoResult[0].name);
				expect(message).to.be.null;
				assert.isTrue(userDaoStub.withArgs(userId).calledOnce);
				done();
			};
			fixture.getUserProfile(userId, serviceCB);
		});

	});

	describe('Update First Name', function() {

		beforeEach(function() {

		});

		afterEach(function() {
			sandbox.restore();
		});

		it('Calls back with error when user dao errors', function(done) {
			var userId = 45;
			var firstName = 'Janice';
			var daoErr = new Error('something went wrong updating user profile first name');
			var daoStub = sandbox.stub(userProfileEditDao, 'updateFirstName', function(userId, firstName, cb) {
				cb(daoErr);
			});
			var serviceCB = function(err, message) {
				expect(err).to.equal(daoErr);
				expect(message).to.equal(messages.USER_PROFILE_UPDATE_FIRST_NAME_FAIL);
				assert.isTrue(daoStub.withArgs(userId, firstName).calledOnce);
				done();
			};
			fixture.updateFirstName(userId, firstName, serviceCB);
		});

		it('Calls back with nothing when successful', function(done) {
			var userId = 45;
			var firstName = 'Janice';
			var daoResult = 0;
			var daoStub = sandbox.stub(userProfileEditDao, 'updateFirstName', function(userId, firstName, cb) {
				cb(null, daoResult);
			});
			var serviceCB = function(err, message) {
				expect(err).to.be.undefined;
				expect(message).to.be.undefined;
				assert.isTrue(daoStub.withArgs(userId, firstName).calledOnce);
				done();
			};
			fixture.updateFirstName(userId, firstName, serviceCB);
		});
	});

});