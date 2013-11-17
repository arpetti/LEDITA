var expect = require('chai').expect
var fixture = require('../../../server/util/MoveNodeFillHoleHelper');
var _ =  require('underscore');

describe('Move Node Fill Hole Helper', function() {

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