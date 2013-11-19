var expect = require('chai').expect
var fixture = require('../../../server/util/MoveNodeFillHoleHelper');
var _ =  require('underscore');

describe('Move Node Fill Hole Helper', function() {

	describe('Fill Level Holes', function() {

		it('Fills level holes in the middle', function() {
			var testRecords = [
				{id: 95, level: 1, position: 1},
				{id: 96, level: 1, position: 2},
				{id: 97, level: 3, position: 1},
				{id: 98, level: 4, position: 1},
			];
			
			var results = fixture.fillLevelHoles(testRecords);
			var resultById = _.indexBy(results, 'id');

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
			
			var results = fixture.fillLevelHoles(testRecords);
			var resultById = _.indexBy(results, 'id');

			expect(resultById[95].level).to.equal(1);
			expect(resultById[96].level).to.equal(1);
			expect(resultById[97].level).to.equal(2);
			expect(resultById[98].level).to.equal(3);
		});

		it('Fills multiple level holes', function() {
			var testRecords = [
				{id: 95, level: 2, position: 1},
				{id: 96, level: 2, position: 2},
				{id: 97, level: 3, position: 1},
				{id: 98, level: 5, position: 1},
				{id: 99, level: 7, position: 1},
			];
			
			var results = fixture.fillLevelHoles(testRecords);
			var resultById = _.indexBy(results, 'id');

			expect(resultById[95].level).to.equal(1);
			expect(resultById[96].level).to.equal(1);
			expect(resultById[97].level).to.equal(2);
			expect(resultById[98].level).to.equal(3);
			expect(resultById[99].level).to.equal(4);
		});

		it('Fill level holes keeps multiple nodes in levels together', function() {
			var testRecords = [
				{"id": 16, "level": 1, "position": 1},
				{"id": 18, "level": 3, "position": 1},
				{"id": 19, "level": 3, "position": 2},
				{"id": 17, "level": 4, "position": 1},
				{"id": 20, "level": 5, "position": 1},
				{"id": 21, "level": 5, "position": 2}
			];
			
			var results = fixture.fillLevelHoles(testRecords);
			var resultById = _.indexBy(testRecords, 'id');
			
			expect(resultById[16].level).to.equal(1);
			expect(resultById[18].level).to.equal(2);
			expect(resultById[19].level).to.equal(2);
			expect(resultById[17].level).to.equal(3);
			expect(resultById[20].level).to.equal(4);
			expect(resultById[21].level).to.equal(4);
		});

	});

	describe('Fill Position Holes', function() {

		it('Fills Position Holes for each Level', function() {
			var testRecords = [
				{"id": 90, "level": 1, "position": 2},
				{"id": 91, "level": 1, "position": 4},
				{"id": 92, "level": 2, "position": 1},
				{"id": 93, "level": 2, "position": 3},
				{"id": 94, "level": 2, "position": 4},
			];

			var results = fixture.fillPositionHoles(testRecords);
			var resultById = _.indexBy(testRecords, 'id');

			expect(resultById[90].position).to.equal(1);
			expect(resultById[91].position).to.equal(2);
			expect(resultById[92].position).to.equal(1);
			expect(resultById[93].position).to.equal(2);
			expect(resultById[94].position).to.equal(3);
		});

	});

});