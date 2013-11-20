var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var fixture = require('../../../server/util/MoveNodeHelper');
var moveNodeFillHoleHelper = require('../../../server/util/MoveNodeFillHoleHelper');
var _ =  require('underscore');

describe('Move Node Helper', function() {

	var sandbox = sinon.sandbox.create();

	var l1P1;
	var l2P1;
	var l3P1;
	var l3P2;
	var l4P1;
	var l5P1;
	var l6P1;
	var composesRecords;

	beforeEach(function() {
		l1P1 = {"id":1,"ld_id":1,"activity_id":5,"ld_part_id":null,"activity_group_id":null,"level":1,"position":1};
		l2P1 = {"id":2,"ld_id":1,"activity_id":null,"ld_part_id":null,"activity_group_id":1,"level":2,"position":1};
		l3P1 = {"id":3,"ld_id":1,"activity_id":9,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1};
		l3P2 = {"id":4,"ld_id":1,"activity_id":8,"ld_part_id":null,"activity_group_id":null,"level":3,"position":2};
		l4P1 = {"id":5,"ld_id":1,"activity_id":null,"ld_part_id":2,"activity_group_id":null,"level":4,"position":1};
		l5P1 = {"id":6,"ld_id":1,"activity_id":null,"ld_part_id":null,"activity_group_id":2,"level":5,"position":1};	
		l6P1 = {"id":7,"ld_id":1,"activity_id":10,"ld_part_id":null,"activity_group_id":null,"level":6,"position":1};
		composesRecords = [l1P1, l2P1, l3P1, l3P2, l4P1, l5P1, l6P1];
    });

    afterEach(function() {
        sandbox.restore();
    });

	it('Move type: maxLevel -  sets source node level to max level plus 1', function() {
		var sourceId = '9-ACTIVITY-3-1';
		var targetId = 'maxLevel';
		
		var expectedComposesIdToHaveBeenModified = 3;
		var expectedMaxLevelPlusOne = 7;
		
		var fillHoleFunc = function(input) {
			return input;
		};
		var fillHoleHelperStub = sandbox.stub(moveNodeFillHoleHelper, "fillHoles", fillHoleFunc);
		
		var result = fixture.moveNode(sourceId, targetId, composesRecords);
		var resultById = _.indexBy(result, 'id');

		expect(result).to.have.length(composesRecords.length);
		expect(resultById[expectedComposesIdToHaveBeenModified].level).to.equal(expectedMaxLevelPlusOne);
		assert.isTrue(fillHoleHelperStub.called);
	});

	it('Move type: level increments levels after target', function() {
		var sourceId = '9-ACTIVITY-3-1';
		var targetId = 'level-2';

		var fillHoleFunc = function(input) {
			return input;
		};
		var fillHoleHelperStub = sandbox.stub(moveNodeFillHoleHelper, "fillHoles", fillHoleFunc);

		var result = fixture.moveNode(sourceId, targetId, composesRecords);
		var resultById = _.indexBy(result, 'id');
		
		var expectedComposesId = 3;

		expect(result).to.have.length(composesRecords.length);
		expect(resultById[expectedComposesId].level).to.equal(2);
		expect(resultById[expectedComposesId].position).to.equal(1);
		
		// Nodes that were in level smaller than target should not have moved
		expect(resultById[1].level).to.equal(1); 
		
		// All other nodes should have their level incremented
		expect(resultById[2].level).to.equal(3);
		expect(resultById[4].level).to.equal(4);
		expect(resultById[5].level).to.equal(5);
		expect(resultById[6].level).to.equal(6);
		expect(resultById[7].level).to.equal(7);
		
		assert.isTrue(fillHoleHelperStub.called);
	});

	it('Move type: level - example from demo data LD3', function() {
		var testRecords = [
			{"id":16,"ld_id":3,"activity_id":25,"ld_part_id":null,"activity_group_id":null,"level":1,"position":1},
			{"id":17,"ld_id":3,"activity_id":null,"ld_part_id":null,"activity_group_id":5,"level":2,"position":1},
			{"id":18,"ld_id":3,"activity_id":27,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1},
			{"id":19,"ld_id":3,"activity_id":28,"ld_part_id":null,"activity_group_id":null,"level":3,"position":2},
			{"id":20,"ld_id":3,"activity_id":29,"ld_part_id":null,"activity_group_id":null,"level":4,"position":1},
			{"id":21,"ld_id":3,"activity_id":30,"ld_part_id":null,"activity_group_id":null,"level":4,"position":2}
		];
		var sourceId = '5-ACTIVITY_GROUP-2-1';
		var targetId = 'level-4';

		var fillHoleFunc = function(input) {
			return input;
		};
		var fillHoleHelperStub = sandbox.stub(moveNodeFillHoleHelper, "fillHoles", fillHoleFunc);

		var result = fixture.moveNode(sourceId, targetId, testRecords);
		var resultById = _.indexBy(result, 'id');
		
		// Source node is moved to target level
		expect(resultById[17].level).to.equal(4);

		// Nodes that were in level smaller than target should not be modified
		expect(resultById[16].level).to.equal(1);
		expect(resultById[18].level).to.equal(3);
		expect(resultById[19].level).to.equal(3);

		// Nodes that were in level greater than target should be incremented by one
		expect(resultById[20].level).to.equal(5);
		expect(resultById[21].level).to.equal(5);
	});

	it('Move type: levelPosition - is not implemented yet, returns unmodified records', function() {
		var sourceId = '9-ACTIVITY-3-1';
		var targetId = 'levelPosition-1-4';

		var result = fixture.moveNode(sourceId, targetId, composesRecords);

		var resultById = _.indexBy(result, 'id');
		var expectedComposesId = 3;

		expect(result).to.have.length(composesRecords.length);
		expect(resultById[expectedComposesId].level).to.equal(3);
		expect(resultById[expectedComposesId].position).to.equal(1);
	});

	it('Move type: maxPosition - moves node to max position at same level', function() {
		var sourceId = '9-ACTIVITY-3-1';
		var targetId = 'maxPosition-3';

		var fillHoleFunc = function(input) {
			return input;
		};
		var fillHoleHelperStub = sandbox.stub(moveNodeFillHoleHelper, "fillHoles", fillHoleFunc);

		var result = fixture.moveNode(sourceId, targetId, composesRecords);
		var resultById = _.indexBy(result, 'id');
		var expectedComposesId = 3;

		expect(result).to.have.length(composesRecords.length);
		expect(resultById[expectedComposesId].level).to.equal(3);
		expect(resultById[expectedComposesId].position).to.equal(3);
		assert.isTrue(fillHoleHelperStub.called);
	});

	it('Move type: maxPosition - moves node to max position at different level', function() {
		var sourceId = '9-ACTIVITY-3-1';
		var targetId = 'maxPosition-4';

		var fillHoleFunc = function(input) {
			return input;
		};
		var fillHoleHelperStub = sandbox.stub(moveNodeFillHoleHelper, "fillHoles", fillHoleFunc);

		var result = fixture.moveNode(sourceId, targetId, composesRecords);

		var resultById = _.indexBy(result, 'id');
		var expectedComposesId = 3;

		expect(result).to.have.length(composesRecords.length);
		expect(resultById[expectedComposesId].level).to.equal(4);
		expect(resultById[expectedComposesId].position).to.equal(2);
	});

});