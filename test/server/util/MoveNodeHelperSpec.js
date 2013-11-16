var expect = require('chai').expect
var fixture = require('../../../server/util/MoveNodeHelper');
var _ =  require('underscore');

describe('Move Node Helper', function() {

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

	it('Move type: maxLevel -  sets source node level to max level plus 1', function() {
		var sourceId = '9-ACTIVITY-3-1';
		var targetId = 'maxLevel';
		
		var expectedComposesIdToHaveBeenModified = 3;
		var expectedMaxLevelPlusOne = 7;
		
		var result = fixture.moveNode(sourceId, targetId, composesRecords);
		var resultById = _.indexBy(result, 'id');

		expect(result).to.have.length(composesRecords.length);
		expect(resultById[expectedComposesIdToHaveBeenModified].level).to.equal(expectedMaxLevelPlusOne);
	});

	it('Move type: maxLevel -  sets source node level to max level plus 1 and fills level hole', function() {
		var sourceId = '2-ACTIVITY_GROUP-5-1';
		var targetId = 'maxLevel';
		
		var expectedComposesIdToHaveBeenModified = 6;
		var expectedMaxLevelPlusOneFillHole = 6;
		
		var expectedComposesIdToHaveLevelHoleFilled = 7;
		var expectedHoleFilledLevel = 5;

		var result = fixture.moveNode(sourceId, targetId, composesRecords);
		var resultById = _.indexBy(result, 'id');

		expect(result).to.have.length(composesRecords.length);
		expect(resultById[expectedComposesIdToHaveBeenModified].level).to.equal(expectedMaxLevelPlusOneFillHole);
		expect(resultById[expectedComposesIdToHaveLevelHoleFilled].level).to.equal(expectedHoleFilledLevel);
	});

	it('Move type: level - is not implemented yet, returns unmodified records', function() {
		var sourceId = '9-ACTIVITY-3-1';
		var targetId = 'level-1';

		var result = fixture.moveNode(sourceId, targetId, composesRecords);

		var resultById = _.indexBy(result, 'id');
		var expectedComposesId = 3;

		expect(result).to.have.length(composesRecords.length);
		expect(resultById[expectedComposesId].level).to.equal(3);
		expect(resultById[expectedComposesId].position).to.equal(1);
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

	it('Move type: maxPosition - is not implemented yet, returns unmodified records', function() {
		var sourceId = '9-ACTIVITY-3-1';
		var targetId = 'maxPosition-1';

		var result = fixture.moveNode(sourceId, targetId, composesRecords);

		var resultById = _.indexBy(result, 'id');
		var expectedComposesId = 3;

		expect(result).to.have.length(composesRecords.length);
		expect(resultById[expectedComposesId].level).to.equal(3);
		expect(resultById[expectedComposesId].position).to.equal(1);
	});

	describe('Fill Holes', function() {

		it('Fills level holes in the middle', function() {
			var testRecords = [
				{id: 95, level: 1, position: 1},
				{id: 96, level: 1, position: 2},
				{id: 97, level: 3, position: 1},
				{id: 98, level: 4, position: 1},
			];
			fixture.fillLevelHoles(testRecords);
			
			var resultById = _.indexBy(testRecords, 'id');
			expect(resultById[95].level).to.equal(1);
			expect(resultById[96].level).to.equal(1);
			expect(resultById[97].level).to.equal(2);
			expect(resultById[98].level).to.equal(3);
		});

		it('Fills level holes at the beginning', function() {
			var testRecords = [
				{id: 95, level: 2, position: 1},
				{id: 96, level: 2, position: 2},
				{id: 97, level: 3, position: 1},
				{id: 98, level: 4, position: 1},
			];
			fixture.fillLevelHoles(testRecords);

			var resultById = _.indexBy(testRecords, 'id');
			expect(resultById[95].level).to.equal(1);
			expect(resultById[96].level).to.equal(2);
			expect(resultById[97].level).to.equal(3);
			expect(resultById[98].level).to.equal(4);
		});

		it('Fills multiple level holes', function() {
			var testRecords = [
				{id: 95, level: 2, position: 1},
				{id: 96, level: 2, position: 2},
				{id: 97, level: 3, position: 1},
				{id: 98, level: 5, position: 1},
				{id: 99, level: 7, position: 1},
			];
			fixture.fillLevelHoles(testRecords);

			var resultById = _.indexBy(testRecords, 'id');
			expect(resultById[95].level).to.equal(1);
			expect(resultById[96].level).to.equal(2);
			expect(resultById[97].level).to.equal(3);
			expect(resultById[98].level).to.equal(4);
			expect(resultById[99].level).to.equal(5);
		});

	});

});