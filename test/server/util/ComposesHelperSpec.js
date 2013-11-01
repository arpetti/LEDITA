var expect = require('chai').expect
var fixture = require('../../../server/util/ComposesHelper');

describe('Composes Helper', function() {

	describe('Find Composes ID', function() {

		it('Finds composes id by ACTIVITY type', function() {
			var composesRecords = [
				{"id":1,"ld_id":1,"activity_id":5,"ld_part_id":null,"activity_group_id":null,"level":1,"position":1},
				{"id":2,"ld_id":1,"activity_id":999,"ld_part_id":null,"activity_group_id":1,"level":2,"position":1},
				{"id":3,"ld_id":1,"activity_id":9,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1},
				{"id":4,"ld_id":1,"activity_id":8,"ld_part_id":null,"activity_group_id":null,"level":3,"position":2},
				{"id":5,"ld_id":1,"activity_id":999,"ld_part_id":2,"activity_group_id":null,"level":4,"position":1},
				{"id":6,"ld_id":1,"activity_id":999,"ld_part_id":null,"activity_group_id":2,"level":5,"position":1},
				{"id":7,"ld_id":1,"activity_id":10,"ld_part_id":null,"activity_group_id":null,"level":6,"position":1}
			];
			var nodeId = 10;
			var nodeType = 'ACTIVITY';
			var level = 6;
			var position = 1;

			var result = fixture.getComposesRecord(composesRecords, nodeId, nodeType, level, position);
			expect(result.id).to.equal(7);
		});

	});

});