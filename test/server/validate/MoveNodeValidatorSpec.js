var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon')
var fixture = require('../../../server/validate/MoveNodeValidator');
var composesDao = require('../../../server/dao/ComposesDao');
var messages = require('../../../server/validate/ValidationMessages');

describe('Move Node Validator', function() {

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
			{"id": 78, "ld_id":3, "activity_id":88, "ld_part_id":null, "activity_group_id":null, "level": 4, "position": 1},
			{"id": 79, "ld_id":3, "activity_id":89, "ld_part_id":null, "activity_group_id":null, "level": 4, "position": 2},
			{"id": 80, "ld_id":3, "activity_id":90, "ld_part_id":null, "activity_group_id":null, "level": 4, "position": 3}
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
			expect(errorMessage).to.equal(messages.INVALID_MOVE_MAX_POSITION);
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

	it('Level Position - returns error message if target level is full', function(done) {
		var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
            callback(null, composesRecords);
        });

		var ldId = 3;
        var sourceId = '81-ACTIVITY-1-1';
		var targetId = 'levelPosition-3-2';

		var validatorCB = function(errorMessage) {
			expect(errorMessage).not.to.be.null;
			expect(errorMessage).to.equal(messages.INVALID_MOVE_MAX_POSITION);
			assert.isTrue(daoStub.withArgs([ldId]).calledOnce);
			done();
		};
		fixture.validateNodeToNode(ldId, sourceId, targetId, validatorCB);
	});

	it('Level Position - returns error message if target is immediately to left of source', function(done) {
		var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
            callback(null, composesRecords);
        });

		var ldId = 3;
        var sourceId = '82-ACTIVITY-2-1';
		var targetId = 'levelPosition-2-1';

		var validatorCB = function(errorMessage) {
			expect(errorMessage).not.to.be.null;
			expect(errorMessage).to.equal(messages.INVALID_MOVE_LEVEL_POSITION_LEFT);
			assert.isTrue(daoStub.withArgs([ldId]).calledOnce);
			done();
		};
		fixture.validateNodeToNode(ldId, sourceId, targetId, validatorCB);
	});

	it('Level Position - returns error message if target is immediately to right of source', function(done) {
		var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
            callback(null, composesRecords);
        });

		var ldId = 3;
        var sourceId = '82-ACTIVITY-2-1';
		var targetId = 'levelPosition-2-2';

		var validatorCB = function(errorMessage) {
			expect(errorMessage).not.to.be.null;
			expect(errorMessage).to.equal(messages.INVALID_MOVE_LEVEL_POSITION_RIGHT);
			assert.isTrue(daoStub.withArgs([ldId]).calledOnce);
			done();
		};
		fixture.validateNodeToNode(ldId, sourceId, targetId, validatorCB);
	});

	it('Level Position - returns null if moving node from different level to level with space', function(done) {
		var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
            callback(null, composesRecords);
        });

		var ldId = 3;
        var sourceId = '82-ACTIVITY-2-1';
		var targetId = 'levelPosition-4-2';

		var validatorCB = function(errorMessage) {
			expect(errorMessage).to.be.null;
			assert.isTrue(daoStub.withArgs([ldId]).calledOnce);
			done();
		};
		fixture.validateNodeToNode(ldId, sourceId, targetId, validatorCB);
	});

	it('Level Position - returns null if moving node from same level to same level with space', function(done) {
		var daoStub = sandbox.stub(composesDao, "findAllComposes", function(criteria, callback) {
            callback(null, composesRecords);
        });

		var ldId = 3;
        var sourceId = '88-ACTIVITY-4-1';
		var targetId = 'levelPosition-4-3';

		var validatorCB = function(errorMessage) {
			expect(errorMessage).to.be.null;
			assert.isTrue(daoStub.withArgs([ldId]).calledOnce);
			done();
		};
		fixture.validateNodeToNode(ldId, sourceId, targetId, validatorCB);
	});

});