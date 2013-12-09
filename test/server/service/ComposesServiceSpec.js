var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var composesDao = require('../../../server/dao/ComposesDao');
var messages = require('../../../server/validate/ValidationMessages');
var fixture = require('../../../server/service/ComposesService');

describe('Composes Service', function() {

	var sandbox = sinon.sandbox.create();
	var ldId;
	var activityId;

  beforeEach(function() {
  	ldId = 123;
  	activityId = 456;
  });

  afterEach(function() {
      sandbox.restore();
  });

  it('Calls back with error message if dao error occurs finding max level', function(done) {
  	var daoFindError = new Error('something went wrong with find max level');
		var daoFindStub = sandbox.stub(composesDao, 'findMaxLevel', function(ldId, cb) {
			cb(daoFindError);
		});

		var daoInsertStub = sandbox.stub(composesDao, 'insertComposes');

		var serviceCb = function(err, composesId, message) {
			expect(err).not.to.be.null;
			expect(composesId).to.be.null;
			expect(message).to.equal(messages.ACTIVITY_FIND_MAX_LEVEL_FAIL);
			assert.isTrue(daoFindStub.withArgs(ldId).calledOnce);
			assert.equal(daoInsertStub.callCount, 0);
			done();
		};
		fixture.addActivity(ldId, activityId, serviceCb);
  });

  it('Calls back with error message if dao error occurs inserting composes', function(done) {
  	var maxLevel = 1;
  	var daoFindResults = [{"max_level" : maxLevel}];
  	var daoFindStub = sandbox.stub(composesDao, 'findMaxLevel', function(ldId, cb) {
			cb(null, daoFindResults);
		});

		var daoInsertError = new Error('something went wrong with insert');
		var daoInsertStub = sandbox.stub(composesDao, 'insertComposes', function(composesObj, cb) {
			cb(daoInsertError);
		});		

		var composesMatcher = sinon.match({
    	ld_id: ldId,
      activity_id: activityId,
      level: maxLevel + 1,
      position: 1
    });

    var serviceCb = function(err, composesId, message) {
    	expect(err).not.to.be.null;
    	expect(composesId).to.be.null;
    	expect(message).to.equal(messages.ACTIVITY_INSERT_COMPOSES_FAIL);
			assert.isTrue(daoFindStub.withArgs(ldId).calledOnce);
			assert.isTrue(daoInsertStub.withArgs(composesMatcher).calledOnce);
    	done();
    };
    fixture.addActivity(ldId, activityId, serviceCb);
  });

	it('Calls back with composesId when insert successful, level set to 1 when LD had no nodes', function(done) {
		var maxLevel = null;
  	var daoFindResults = [{"max_level" : maxLevel}];
  	var daoFindStub = sandbox.stub(composesDao, 'findMaxLevel', function(ldId, cb) {
			cb(null, daoFindResults);
		});

		var daoInsertedComposesId = 98;
		var daoInsertStub = sandbox.stub(composesDao, 'insertComposes', function(studentsObj, cb) {
			cb(null, daoInsertedComposesId);
		});

		var composesMatcher = sinon.match({
    	ld_id: ldId,
      activity_id: activityId,
      level: 1,
      position: 1
    });

    var serviceCb = function(err, composesId, message) {
    	expect(err).be.null;
    	expect(composesId).to.equal(daoInsertedComposesId);
    	expect(message).to.be.null;
			assert.isTrue(daoFindStub.withArgs(ldId).calledOnce);
			assert.isTrue(daoInsertStub.withArgs(composesMatcher).calledOnce);
    	done();
    };
    fixture.addActivity(ldId, activityId, serviceCb);
	});

});