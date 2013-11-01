var expect = require('chai').expect
var fixture = require('../../../server/util/ComposesHelper');
var _ = require('underscore');

describe('Composes Helper', function() {

	var composesRecords = [
		{"id":1,"ld_id":1,"activity_id":5,"ld_part_id":null,"activity_group_id":null,"level":1,"position":1},
		{"id":2,"ld_id":1,"activity_id":999,"ld_part_id":null,"activity_group_id":1,"level":2,"position":1},
		{"id":3,"ld_id":1,"activity_id":9,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1},
		{"id":4,"ld_id":1,"activity_id":8,"ld_part_id":null,"activity_group_id":null,"level":3,"position":2},
		{"id":5,"ld_id":1,"activity_id":null,"ld_part_id":2,"activity_group_id":null,"level":4,"position":1},
		{"id":6,"ld_id":1,"activity_id":null,"ld_part_id":null,"activity_group_id":2,"level":5,"position":1},
		{"id":7,"ld_id":1,"activity_id":10,"ld_part_id":null,"activity_group_id":null,"level":6,"position":1}
	];

	describe('Find Composes ID', function() {

		it('Finds composes id by ACTIVITY', function() {
			var nodeId = 10;
			var nodeType = 'ACTIVITY';
			var level = 6;
			var position = 1;

			var result = fixture.getComposesRecord(composesRecords, nodeId, nodeType, level, position);
			expect(result.id).to.equal(7);
		});

		it('Finds composes id by LD', function() {
			var nodeId = 2;
			var nodeType = 'LD';
			var level = 4;
			var position = 1;

			var result = fixture.getComposesRecord(composesRecords, nodeId, nodeType, level, position);
			expect(result.id).to.equal(5);
		});

		it('Finds composes id by ACTIVITY_GROUP', function() {
			var nodeId = 2;
			var nodeType = 'ACTIVITY_GROUP';
			var level = 5;
			var position = 1;

			var result = fixture.getComposesRecord(composesRecords, nodeId, nodeType, level, position);
			expect(result.id).to.equal(6);
		});

		it('Finds null if node not found', function() {
			var nodeId = 222;
			var nodeType = 'ACTIVITY_GROUP';
			var level = 5;
			var position = 1;

			var result = fixture.getComposesRecord(composesRecords, nodeId, nodeType, level, position);
			expect(result).to.be.null;
		});

	});

	describe('Finds Nodes in Path', function() {

		it('Finds nodes for move = top', function() {
			var results = fixture.getNodesInPath('top', composesRecords, 3, 1);
			expect(results).to.have.length(4);
			expect(_.isEqual(composesRecords[2], results[0])).to.be.true;
			expect(_.isEqual(composesRecords[4], results[1])).to.be.true;
			expect(_.isEqual(composesRecords[5], results[2])).to.be.true;
			expect(_.isEqual(composesRecords[6], results[3])).to.be.true;
		});

	});

});