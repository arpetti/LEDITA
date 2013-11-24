var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon')
var fixture = require('../../../server/validate/MoveNodeValidator');
var composesDao = require('../../../server/dao/ComposesDao');
var messages = require('../../../server/validate/ValidationMessages');

describe.only('Move Node Validator', function() {

	var sandbox = sinon.sandbox.create();
	var composesRecords;

    beforeEach(function() {
    	composesRecords = [
			{"id": 71, "ld_id":3, "activity_id":81, "ld_part_id":null, "activity_group_id":null, "level": 1, "position": 1},
			{"id": 72, "ld_id":3, "activity_id":82, "ld_part_id":null, "activity_group_id":null, "level": 2, "position": 1},
			{"id": 73, "ld_id":3, "activity_id":83, "ld_part_id":null, "activity_group_id":null, "level": 2, "position": 2},
			{"id": 74, "ld_id":3, "activity_id":84, "ld_part_id":null, "activity_group_id":null, "level": 3, "position": 1},
			{"id": 75, "ld_id":3, "activity_id":85, "ld_part_id":null, "activity_group_id":null, "level": 3, "position": 2},
			{"id": 76, "ld_id":3, "activity_id":86, "ld_part_id":null, "activity_group_id":null, "level": 3, "position": 3},
			{"id": 77, "ld_id":3, "activity_id":87, "ld_part_id":null, "activity_group_id":null, "level": 3, "position": 4},
		];
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('Returns null if dao calls back with error', function(done) {
    	var daoError = new Error('something went wrong');
        var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
            callback(daoError);
        });

        var ldId = 3;
        var sourceId = '81-ACTIVITY-1-1';
		var targetId = 'maxPosition-2';
		
        var validatorCB = function(errorMessage) {
			expect(errorMessage).to.be.null;
			assert.isTrue(daoStub.withArgs([ldId]).calledOnce);
			done();
		};
		fixture.validateNodeToNode(ldId, sourceId, targetId, validatorCB);
	});

	it('Returns null if dao calls back with empty list', function(done) {
    	var daoResults = [];
        var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
            callback(null, daoResults);
        });

        var ldId = 3;
        var sourceId = '81-ACTIVITY-1-1';
		var targetId = 'maxPosition-2';

        var validatorCB = function(errorMessage) {
			expect(errorMessage).to.be.null;
			assert.isTrue(daoStub.withArgs([ldId]).calledOnce);
			done();
		};
		fixture.validateNodeToNode(ldId, sourceId, targetId, validatorCB);
	});

	it('Max Position - Returns error message when target level has a node at position 4', function(done) {
		var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
            callback(null, composesRecords);
        });

		var ldId = 3;
        var sourceId = '81-ACTIVITY-1-1';
		var targetId = 'maxPosition-3';

		var validatorCB = function(errorMessage) {
			expect(errorMessage).not.to.be.null;
			expect(errorMessage).to.equal(messages.INVALID_LEVEL_POSITION_MOVE);
			assert.isTrue(daoStub.withArgs([ldId]).calledOnce);
			done();
		};
		fixture.validateNodeToNode(ldId, sourceId, targetId, validatorCB);
	});

	it('Max Position - Returns null when target level does not have a node at position 4 ', function(done) {
		var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
            callback(null, composesRecords);
        });

		var ldId = 3;
        var sourceId = '81-ACTIVITY-1-1';
		var targetId = 'maxPosition-2';

		var validatorCB = function(errorMessage) {
			expect(errorMessage).to.be.null;
			assert.isTrue(daoStub.withArgs([ldId]).calledOnce);
			done();
		};
		fixture.validateNodeToNode(ldId, sourceId, targetId, validatorCB);
	});

});