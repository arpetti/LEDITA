var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var activityEditDao = require('../../../server/dao/ActivityEditDao');
var fixture = require('../../../server/service/ActivityEditService');

describe('Activity Edit Service', function() {
	
	describe('Does Activity Belong to LD', function() {

		var sandbox = sinon.sandbox.create();

    beforeEach(function() {
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('Calls back with false if dao error occurs', function(done) {
    	var ldId = 45;
    	var activityId = 887;
    	var daoStub = sandbox.stub(activityEditDao, 'getComposesCount', function(ldId, activityId, cb) {
    		cb(new Error('something went wrong with getComposesCount'));
    	});
    	var serviceCB = function(result){
    		expect(result).to.be.false;
    		assert.isTrue(daoStub.withArgs(ldId, activityId).calledOnce);
    		done();
    	};
    	fixture.doesActivityBelongToLD(ldId, activityId, serviceCB);
    });

	});

});