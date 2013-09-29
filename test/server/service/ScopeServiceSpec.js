var expect = require('chai').expect
var assert = require('chai').assert
var sinon = require('sinon')
var ScopeService = require('../../../server/service/ScopeService');
var RefDao = require('../../../server/dao/RefDao');
var LdCreateDao = require('../../../server/dao/LdCreateDao');

describe('Scope Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

	it('Inserts a new scope and returns scope id if scope does not already exist', function(done) {
		var scopeName = "scope test";

		var scopeResults = [];
		var refDaoStub = sandbox.stub(RefDao, "findScopeByName", function(scopeData, callback) {
            callback(null, scopeResults);
        });

        var insertedScopeId = 34;
        var scopeInsertStub = sandbox.stub(LdCreateDao, "insertScope", function(scopeData, callback) {
        	callback(null, insertedScopeId);
        });

        var scopeDataMatcher = sinon.match({name: scopeName});

        var serviceCallback = function(err, scopeId) {
        	expect(err).to.be.null;
        	expect(scopeId).to.equal(insertedScopeId);
        	assert.isTrue(refDaoStub.withArgs(scopeDataMatcher).calledOnce);
        	assert.isTrue(scopeInsertStub.withArgs(scopeDataMatcher).calledOnce);
        	done();
        };

        ScopeService.getScopeId(scopeName, serviceCallback);
	});

	it('Returns existing scope id if scope already exists', function(done) {
		var scopeName = "scope test";
        var scopeId = 34;

		var scopeResults = [{id: scopeId, name: scopeName}];
		var refDaoStub = sandbox.stub(RefDao, "findScopeByName", function(scopeData, callback) {
            callback(null, scopeResults);
        });

        var scopeInsertStub = sandbox.stub(LdCreateDao, "insertScope");

        var scopeDataMatcher = sinon.match({name: scopeName});

        var serviceCallback = function(err, scopeId) {
        	expect(err).to.be.null;
        	expect(scopeId).to.equal(scopeId);
        	assert.isTrue(refDaoStub.withArgs(scopeDataMatcher).calledOnce);
        	assert.equal(scopeInsertStub.callCount, 0);
        	done();
        };

        ScopeService.getScopeId(scopeName, serviceCallback);
	});

	it('Calls back with error if error occurs finding scope by name', function(done) {
		var scopeName = "scope test";

		var refDaoError = new Error("something went wrong");
		var refDaoStub = sandbox.stub(RefDao, "findScopeByName", function(scopeData, callback) {
            callback(refDaoError);
        });

        var scopeInsertStub = sandbox.stub(LdCreateDao, "insertScope");

        var scopeDataMatcher = sinon.match({name: scopeName});

        var serviceCallback = function(err, scopeId) {
        	expect(err).to.equal(refDaoError);
        	expect(scopeId).to.be.undefined;
        	assert.isTrue(refDaoStub.withArgs(scopeDataMatcher).calledOnce);
        	assert.equal(scopeInsertStub.callCount, 0);
        	done();
        };

        ScopeService.getScopeId(scopeName, serviceCallback);
	});

	it('Calls back with error if error occurs inserting scope', function(done) {
		var scopeName = "scope test";

		var scopeResults = [];
		var refDaoStub = sandbox.stub(RefDao, "findScopeByName", function(scopeData, callback) {
            callback(null, scopeResults);
        });

       	var serviceError = new Error("something went wrong");
		var scopeInsertStub = sandbox.stub(LdCreateDao, "insertScope", function(scopeData, callback) {
            callback(serviceError);
        });

        var scopeDataMatcher = sinon.match({name: scopeName});

        var serviceCallback = function(err, scopeId) {
        	expect(err).to.equal(serviceError);
        	expect(scopeId).to.be.undefined;
        	assert.isTrue(refDaoStub.withArgs(scopeDataMatcher).calledOnce);
        	assert.isTrue(scopeInsertStub.withArgs(scopeDataMatcher).calledOnce);
        	done();
        };

        ScopeService.getScopeId(scopeName, serviceCallback);
	});

});