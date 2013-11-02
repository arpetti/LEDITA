var expect = require('chai').expect
var fixture = require('../../../server/util/ComposesHelper');
var _ = require('underscore');

describe('Composes Helper', function() {

	var l1P1 = {"id":1,"ld_id":1,"activity_id":5,"ld_part_id":null,"activity_group_id":null,"level":1,"position":1};
	var l2P1 = {"id":2,"ld_id":1,"activity_id":null,"ld_part_id":null,"activity_group_id":1,"level":2,"position":1};
	var l3P1 = {"id":3,"ld_id":1,"activity_id":9,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1};
	var l3P2 = {"id":4,"ld_id":1,"activity_id":8,"ld_part_id":null,"activity_group_id":null,"level":3,"position":2};
	var l4P1 = {"id":5,"ld_id":1,"activity_id":null,"ld_part_id":2,"activity_group_id":null,"level":4,"position":1};
	var l5P1 = {"id":6,"ld_id":1,"activity_id":null,"ld_part_id":null,"activity_group_id":2,"level":5,"position":1};	
	var l6P1 = {"id":7,"ld_id":1,"activity_id":10,"ld_part_id":null,"activity_group_id":null,"level":6,"position":1};
	
	var composesRecords = [l1P1, l2P1, l3P1, l3P2, l4P1, l5P1, l6P1];

	describe('Find Composes ID', function() {

		it('Finds composes id by ACTIVITY', function() {
			var nodeId = 10;
			var nodeType = 'ACTIVITY';
			var level = 6;
			var position = 1;

			var result = fixture.getComposesRecord(composesRecords, nodeId, nodeType, level, position);
			expect(result.id).to.equal(l6P1.id);
		});

		it('Finds composes id by LD', function() {
			var nodeId = 2;
			var nodeType = 'LD';
			var level = 4;
			var position = 1;

			var result = fixture.getComposesRecord(composesRecords, nodeId, nodeType, level, position);
			expect(result.id).to.equal(l4P1.id);
		});

		it('Finds composes id by ACTIVITY_GROUP', function() {
			var nodeId = 2;
			var nodeType = 'ACTIVITY_GROUP';
			var level = 5;
			var position = 1;

			var result = fixture.getComposesRecord(composesRecords, nodeId, nodeType, level, position);
			expect(result.id).to.equal(l5P1.id);
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
			var move = 'top';
			var startLevel = 3;
			var startPosition = 1;
			var filterComposesId = 2; 
			var results = fixture.getNodesInPath(move, composesRecords, startLevel, startPosition, filterComposesId);
			expect(results).to.have.length(4);
			expect(_.isEqual(l3P1, results[0])).to.be.true;
			expect(_.isEqual(l4P1, results[1])).to.be.true;
			expect(_.isEqual(l5P1, results[2])).to.be.true;
			expect(_.isEqual(l6P1, results[3])).to.be.true;
		});

		it('Finds nodes for move = bottom', function() {
			var move = 'bottom';
			var startLevel = 3;
			var startPosition = 1;
			var filterComposesId = 5; 
			var results = fixture.getNodesInPath(move, composesRecords, startLevel, startPosition, filterComposesId);
			expect(results).to.have.length(3);
			expect(_.isEqual(l1P1, results[0])).to.be.true;
			expect(_.isEqual(l2P1, results[1])).to.be.true;
			expect(_.isEqual(l3P1, results[2])).to.be.true;
		});

		it('Finds nodes for move = bottom, filters node in path', function() {
			var move = 'bottom';
			var startLevel = 3;
			var startPosition = 1;
			var filterComposesId = 2; 
			var results = fixture.getNodesInPath(move, composesRecords, startLevel, startPosition, filterComposesId);
			expect(results).to.have.length(2);
			expect(_.isEqual(l1P1, results[0])).to.be.true;
			expect(_.isEqual(l3P1, results[1])).to.be.true;
		});

		it('Finds nodes for move = left', function() {
			var move = 'left';
			var startLevel = 3;
			var startPosition = 1;
			var filterComposesId = 2; 
			var results = fixture.getNodesInPath(move, composesRecords, startLevel, startPosition, filterComposesId);
			expect(results).to.have.length(2);
			expect(_.isEqual(l3P1, results[0])).to.be.true;
			expect(_.isEqual(l3P2, results[1])).to.be.true;
		});

		it('Finds nodes for move = right', function() {
			var move = 'right';
			var startLevel = 4;
			var startPosition = 1;
			var filterComposesId = 2; 
			var results = fixture.getNodesInPath(move, composesRecords, startLevel, startPosition, filterComposesId);
			expect(results).to.have.length(1);
			expect(_.isEqual(l4P1, results[0])).to.be.true;
		});

	});

	describe('Moves nodes by incrementing level or position', function() {

		it('Increments levels for move = top', function() {
			var nodes = [
				{"id":1,"ld_id":1,"activity_id":1,"ld_part_id":null,"activity_group_id":null,"level":1,"position":1},
				{"id":2,"ld_id":1,"activity_id":2,"ld_part_id":null,"activity_group_id":null,"level":2,"position":1},
				{"id":3,"ld_id":1,"activity_id":3,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1}
			];
			
			var results = fixture.moveNodes('top', nodes);
			expect(results).to.have.length(3);
			
			// Verify levels are incremented
			expect(results[0].level).to.equal(nodes[0].level + 1);
			expect(results[1].level).to.equal(nodes[1].level + 1);
			expect(results[2].level).to.equal(nodes[2].level + 1);
			
			// Verify positions are unchanged
			expect(results[0].position).to.equal(nodes[0].position);
			expect(results[1].position).to.equal(nodes[1].position);
			expect(results[2].position).to.equal(nodes[2].position);
		});

		it('Decrements levels for move = bottom', function() {
			var nodes = [
				{"id":1,"ld_id":1,"activity_id":1,"ld_part_id":null,"activity_group_id":null,"level":1,"position":1},
				{"id":2,"ld_id":1,"activity_id":2,"ld_part_id":null,"activity_group_id":null,"level":2,"position":1},
				{"id":3,"ld_id":1,"activity_id":3,"ld_part_id":null,"activity_group_id":null,"level":3,"position":1}
			];
			var results = fixture.moveNodes('bottom', nodes);
			expect(results).to.have.length(3);
			
			// Verify levels are incremented
			expect(results[0].level).to.equal(nodes[0].level - 1);
			expect(results[1].level).to.equal(nodes[1].level - 1);
			expect(results[2].level).to.equal(nodes[2].level - 1);
			
			// Verify positions are unchanged
			expect(results[0].position).to.equal(nodes[0].position);
			expect(results[1].position).to.equal(nodes[1].position);
			expect(results[2].position).to.equal(nodes[2].position);
		});

		it('Increments positions for move = left', function() {
			var nodes = [
				{"id":1,"ld_id":1,"activity_id":1,"ld_part_id":null,"activity_group_id":null,"level":1,"position":1},
				{"id":2,"ld_id":1,"activity_id":2,"ld_part_id":null,"activity_group_id":null,"level":1,"position":2},
				{"id":3,"ld_id":1,"activity_id":3,"ld_part_id":null,"activity_group_id":null,"level":1,"position":3}
			];
			
			var results = fixture.moveNodes('left', nodes);
			expect(results).to.have.length(3);
			
			// Verify positions are incremented
			expect(results[0].position).to.equal(nodes[0].position + 1);
			expect(results[1].position).to.equal(nodes[1].position + 1);
			expect(results[2].position).to.equal(nodes[2].position + 1);
			
			// Verify levels are unchanged
			expect(results[0].level).to.equal(nodes[0].level);
			expect(results[1].level).to.equal(nodes[1].level);
			expect(results[2].level).to.equal(nodes[2].level);
		});

		it('Decrements positions for move = right', function() {
			var nodes = [
				{"id":1,"ld_id":1,"activity_id":1,"ld_part_id":null,"activity_group_id":null,"level":1,"position":1},
				{"id":2,"ld_id":1,"activity_id":2,"ld_part_id":null,"activity_group_id":null,"level":1,"position":2},
				{"id":3,"ld_id":1,"activity_id":3,"ld_part_id":null,"activity_group_id":null,"level":1,"position":3}
			];
			
			var results = fixture.moveNodes('right', nodes);
			expect(results).to.have.length(3);
			
			// Verify positions are decremented
			expect(results[0].position).to.equal(nodes[0].position - 1);
			expect(results[1].position).to.equal(nodes[1].position - 1);
			expect(results[2].position).to.equal(nodes[2].position - 1);
			
			// Verify levels are unchanged
			expect(results[0].level).to.equal(nodes[0].level);
			expect(results[1].level).to.equal(nodes[1].level);
			expect(results[2].level).to.equal(nodes[2].level);
		});

	});

});