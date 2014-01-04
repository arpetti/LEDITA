var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fixture = require('../../../server/service/UserProjectsService');
var userDao = require('../../../server/dao/UserDao');
var userProjectsDao = require('../../../server/dao/UserProjectsDao');
var messages = require('../../../server/validate/ValidationMessages');

describe.only('User Projects Service', function() {

	describe('Get Public Projects', function() {

		var sandbox = sinon.sandbox.create();

		beforeEach(function() {
		});

		afterEach(function() {
			sandbox.restore();
		});


		it('Returns user profile and projects when successful', function(done) {
			var userId = 34;

			var userResults = [
				{
					name: 'joe', 
					last_name: 'smythe',
					email: 'dont.expose@me.ca',
					workplace: 'a school',
					city: 'minnesota',
					country: 'US',
					image_uri: '/avatar/img.png'
				}
			];
			var userDaoStub = sandbox.stub(userDao, 'getUserById', function(userId, cb) {
				cb(null, userResults);
			});

			var projectResults = [{ld_name: 'foo'}, {ld_name: 'bar'}];
			var userProjectsDaoStub = sandbox.stub(userProjectsDao, 'getPublicProjects', function(userId, cb) {
				cb(null, projectResults);
			});

			var serviceCB = function(err, results) {
				expect(err).to.be.null;
				
				// Verify user info
				expect(results.userInfo.name).to.equal(userResults[0].name);
				expect(results.userInfo.last_name).to.equal(userResults[0].last_name);
				expect(results.userInfo.workplace).to.equal(userResults[0].workplace);
				expect(results.userInfo.city).to.equal(userResults[0].city);
				expect(results.userInfo.country).to.equal(userResults[0].country);
				expect(results.userInfo.image_uri).to.equal(userResults[0].image_uri);
				expect(results.userInfo.email).to.be.undefined;
				
				// Verify user projects
				expect(results.userProjects).to.have.length(projectResults.length);
				expect(results.userProjects).to.equal(projectResults);
				
				assert.isTrue(userDaoStub.withArgs(userId).calledOnce);
				assert.isTrue(userProjectsDaoStub.withArgs(userId).calledOnce);
				done();
			};
			fixture.getPublicProjects(userId, serviceCB);
		});

	});

});