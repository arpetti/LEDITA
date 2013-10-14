var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var LdEditService = require('../../../server/service/LdEditService');
var LdEditDao = require('../../../server/dao/LdEditDao');
var messages = require('../../../server/validate/ValidationMessages');

describe('Learning Design Edit Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

	describe('Update Learning Design Name', function() {

		it('Calls back with error and message if dao fails', function(done) {
			var ldName = 'a modified name';
			var ldId = 387;

			var daoError = new Error('something went wrong');
	        var daoStub = sandbox.stub(LdEditDao, "updateLdName", function(ldName, ldId, callback) {
	            callback(daoError);
	        });

	        var serviceCB = function(err, message) {
	        	expect(err).not.to.be.null;
	        	expect(err).to.equal(daoError);
	        	expect(message).to.equal(messages.LD_NAME_UPDATE_FAIL);

	        	assert.isTrue(daoStub.withArgs(ldName, ldId).calledOnce);
	        	done();
	        };

	        LdEditService.updateLdName(ldName, ldId, serviceCB);
		});

		it('Calls back with nothing if dao update successful', function(done) {
			var ldName = 'a modified name';
			var ldId = 387;

	        var daoStub = sandbox.stub(LdEditDao, "updateLdName", function(ldName, ldId, callback) {
	            callback();
	        });

	        var serviceCB = function(err, message) {
	        	expect(err).to.be.undefined;
	        	expect(message).to.be.undefined;

	        	assert.isTrue(daoStub.withArgs(ldName, ldId).calledOnce);
	        	done();
	        };

	        LdEditService.updateLdName(ldName, ldId, serviceCB);
		});

	});

	describe('Update Students Description', function() {

		it('Calls back with error and message if dao fails', function(done) {
			var studentsDescr = 'a modified students description';
			var ldId = 4590;

			var daoError = new Error('something went wrong');
	        var daoStub = sandbox.stub(LdEditDao, "updateLdStudentsDescr", function(studentsDescr, ldId, callback) {
	            callback(daoError);
	        });

	        var serviceCB = function(err, message) {
	        	expect(err).not.to.be.null;
	        	expect(err).to.equal(daoError);
	        	expect(message).to.equal(messages.STUDENTS_DESCR_UPDATE_FAIL);

	        	assert.isTrue(daoStub.withArgs(studentsDescr, ldId).calledOnce);
	        	done();
	        };

	        LdEditService.updateStudentsDescr(studentsDescr, ldId, serviceCB);
		});

		it('Calls back with nothing if dao update successful', function(done) {
			var studentsDescr = 'a modified students description';
			var ldId = 4590;

	        var daoStub = sandbox.stub(LdEditDao, "updateLdStudentsDescr", function(studentsDescr, ldId, callback) {
	            callback();
	        });

	        var serviceCB = function(err, message) {
	        	expect(err).to.be.undefined;
	        	expect(message).to.be.undefined;

	        	assert.isTrue(daoStub.withArgs(studentsDescr, ldId).calledOnce);
	        	done();
	        };

	        LdEditService.updateStudentsDescr(studentsDescr, ldId, serviceCB);
		});

	});

});
