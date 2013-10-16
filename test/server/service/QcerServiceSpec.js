var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var QcerService = require('../../../server/service/QcerService');
var LdCreateDao = require('../../../server/dao/LdCreateDao');
var LdEditDao = require('../../../server/dao/LdEditDao');
var LogWrapper = require('../../../server/util/LogWrapper');

describe('Qcer Service', function() {

	var sandbox = sinon.sandbox.create();

    beforeEach(function() {

    });

    afterEach(function() {
        sandbox.restore();
    });

	it('Deletes existing and attaches new Qcers', function(done) {
		var ldId = 888;
		var qcers = {"1":true, "2":true};

		var deleteDaoStub = sandbox.stub(LdEditDao, "deleteClassificates", function(ldId, callback) {
			callback(null, {});
		});

		var results = {"affectedRows": 2};
        var insertDaoStub = sandbox.stub(LdCreateDao, "insertClassificates", function(classificates, callback) {
        	callback(null, results);
        });

        var classificatesMatcher = sinon.match(function(value) {
    		return value.length === 2 && 
    			value[0][0] === 1 &&
    			value[0][1] === ldId &&
    			value[1][0] === 2 &&
    			value[1][1] === ldId;
		});

        var serviceCB = function(err) {
        	expect(err).to.be.null;
        	assert.isTrue(deleteDaoStub.withArgs(ldId).calledOnce);
        	assert.isTrue(insertDaoStub.withArgs(classificatesMatcher).calledOnce);
        	done();
        };
		QcerService.attachQcers(ldId, qcers, serviceCB);
	});

	it('Does not insert new Qcers if error occurs deleting the existing ones', function(done) {
		var ldId = 888;
		var qcers = {"1":true, "2":true};

		var deleteError = new Error('Something went wrong deleting qcers.');
		var deleteDaoStub = sandbox.stub(LdEditDao, "deleteClassificates", function(ldId, callback) {
			callback(deleteError);
		});

		var insertDaoStub = sandbox.stub(LdCreateDao, "insertClassificates");

        var serviceCB = function(err) {
        	expect(err).to.equal(deleteError);
        	assert.isTrue(deleteDaoStub.withArgs(ldId).calledOnce);
        	assert.equal(insertDaoStub.callCount, 0);
        	done();
        };
		QcerService.attachQcers(ldId, qcers, serviceCB);
	});

	it('Calls back with error if error occurs inserting new qcers', function(done) {
		var ldId = 888;
		var qcers = {"1":true, "2":true};

		var deleteDaoStub = sandbox.stub(LdEditDao, "deleteClassificates", function(ldId, callback) {
			callback(null, {});
		});

		var insertError = new Error('Something went wrong inserting qcers.');
		var insertDaoStub = sandbox.stub(LdCreateDao, "insertClassificates", function(classificates, callback){
			callback(insertError);
		});

		 var classificatesMatcher = sinon.match(function(value) {
    		return value.length === 2 && 
    			value[0][0] === 1 &&
    			value[0][1] === ldId &&
    			value[1][0] === 2 &&
    			value[1][1] === ldId;
		});

        var serviceCB = function(err) {
        	expect(err).to.equal(insertError);
        	assert.isTrue(deleteDaoStub.withArgs(ldId).calledOnce);
        	assert.isTrue(insertDaoStub.withArgs(classificatesMatcher).calledOnce);
        	done();
        };
		QcerService.attachQcers(ldId, qcers, serviceCB);
	});

	it('Makes no dao calls if all qcers are false', function(done) {
		var ldId = 888;
		var qcers = {"1":false, "2":false};

		var deleteDaoStub = sandbox.stub(LdEditDao, "deleteClassificates");
        var insertDaoStub = sandbox.stub(LdCreateDao, "insertClassificates");

        var serviceCB = function(err) {
        	expect(err).not.to.be.null;
        	assert.equal(deleteDaoStub.callCount, 0);
        	assert.equal(insertDaoStub.callCount, 0);
        	done();
        };
		QcerService.attachQcers(ldId, qcers, serviceCB);
	});

});