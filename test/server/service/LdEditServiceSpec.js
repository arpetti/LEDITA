var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var LdEditService = require('../../../server/service/LdEditService');
var ScopeService = require('../../../server/service/ScopeService');
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

	describe('Update Learning Design Scope', function() {

		it('Calls back with error if Scope Service returns error', function(done) {
			var scope = 'Some other scope';
			var ldId = 83;

			var scopeError = new Error('something went wrong determining scope id')
	    	var scopeServiceStub = sandbox.stub(ScopeService, "getScopeId", function(scope, callback) {
	    		callback(scopeError);
	    	});

	    	var daoStub = sandbox.stub(LdEditDao, "updateLdScope");
			
			var serviceCB = function(err, message) {
				expect(err).not.to.be.null;
	        	expect(err).to.equal(scopeError);
	        	expect(message).to.equal(messages.LD_SCOPE_UPDATE_FAIL);

	        	assert.isTrue(scopeServiceStub.withArgs(scope).calledOnce);
	        	assert.equal(daoStub.callCount, 0, "LD scope is not updated when scope service returns error");
	        	done();
			};

			LdEditService.updateLdScope(scope, ldId, serviceCB);
		});

		it('Calls back with error if dao returns error', function(done) {
			var scope = 'Some other scope';
			var ldId = 83;
			var scopeId = 64;

			var scopeServiceStub = sandbox.stub(ScopeService, "getScopeId", function(scope, callback) {
	    		callback(null, scopeId);
	    	});

	    	var daoError = new Error('something went wrong');
	        var daoStub = sandbox.stub(LdEditDao, "updateLdScope", function(scopeId, ldId, callback) {
	            callback(daoError);
	        });

	        var serviceCB = function(err, message) {
				expect(err).not.to.be.null;
	        	expect(err).to.equal(daoError);
	        	expect(message).to.equal(messages.LD_SCOPE_UPDATE_FAIL);

	        	assert.isTrue(scopeServiceStub.withArgs(scope).calledOnce);
	        	assert.isTrue(daoStub.withArgs(scopeId, ldId).calledOnce);
	        	done();
			};

			LdEditService.updateLdScope(scope, ldId, serviceCB);
		});

		it('Calls back with nothing if dao update successful', function(done) {
			var scope = 'Some other scope';
			var ldId = 83;
			var scopeId = 64;

			var scopeServiceStub = sandbox.stub(ScopeService, "getScopeId", function(scope, callback) {
	    		callback(null, scopeId);
	    	});

	        var daoStub = sandbox.stub(LdEditDao, "updateLdScope", function(scopeId, ldId, callback) {
	            callback();
	        });

	        var serviceCB = function(err, message) {
	        	expect(err).to.be.undefined;
	        	expect(message).to.be.undefined;

	        	assert.isTrue(scopeServiceStub.withArgs(scope).calledOnce);
	        	assert.isTrue(daoStub.withArgs(scopeId, ldId).calledOnce);
	        	done();
	        };

	        LdEditService.updateLdScope(scope, ldId, serviceCB);
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

	describe('Update Learning Design Publication', function() {

		it('Public calls back with error and message if dao fails', function(done) {
			var ldId = 882;

			var daoError = new Error('something went wrong');
	        var daoStub = sandbox.stub(LdEditDao, "updateLdPublication", function(publication, ldId, callback) {
	            callback(daoError);
	        });

	        var serviceCB = function(err, message) {
	        	expect(err).not.to.be.null;
	        	expect(err).to.equal(daoError);
	        	expect(message).to.equal(messages.LD_PUBLICATION_UPDATE_FAIL);

	        	assert.isTrue(daoStub.withArgs(LdEditService.LD_PUBLIC_INDICATOR, ldId).calledOnce);
	        	done();
	        };

	        LdEditService.updateLdPublic(ldId, serviceCB);
		});

		it('Public calls back with nothing if dao update successful', function(done) {
			var ldId = 882;

	        var daoStub = sandbox.stub(LdEditDao, "updateLdPublication", function(publication, ldId, callback) {
	            callback();
	        });

	        var serviceCB = function(err, message) {
	        	expect(err).to.be.undefined;
	        	expect(message).to.be.undefined;

	        	assert.isTrue(daoStub.withArgs(LdEditService.LD_PUBLIC_INDICATOR, ldId).calledOnce);
	        	done();
	        };

	        LdEditService.updateLdPublic(ldId, serviceCB);
		});

		it('Private calls back with error and message if dao fails', function(done) {
			var ldId = 882;

			var daoError = new Error('something went wrong');
	        var daoStub = sandbox.stub(LdEditDao, "updateLdPublication", function(publication, ldId, callback) {
	            callback(daoError);
	        });

	        var serviceCB = function(err, message) {
	        	expect(err).not.to.be.null;
	        	expect(err).to.equal(daoError);
	        	expect(message).to.equal(messages.LD_PUBLICATION_UPDATE_FAIL);

	        	assert.isTrue(daoStub.withArgs(LdEditService.LD_PRIVATE_INDICATOR, ldId).calledOnce);
	        	done();
	        };

	        LdEditService.updateLdPrivate(ldId, serviceCB);
		});

		it('Private calls back with nothing if dao update successful', function(done) {
			var ldId = 882;

	        var daoStub = sandbox.stub(LdEditDao, "updateLdPublication", function(publication, ldId, callback) {
	            callback();
	        });

	        var serviceCB = function(err, message) {
	        	expect(err).to.be.undefined;
	        	expect(message).to.be.undefined;

	        	assert.isTrue(daoStub.withArgs(LdEditService.LD_PRIVATE_INDICATOR, ldId).calledOnce);
	        	done();
	        };

	        LdEditService.updateLdPrivate(ldId, serviceCB);
		});

	});

});
