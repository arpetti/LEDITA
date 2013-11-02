var expect = require('chai').expect;
var fixture = require('../../../server/dao/ComposesDao');
var Dao = require('../../../server/dao/Dao');

describe('Composes DAO', function() {

	describe('Find All Composes for LD', function() {

		it('Finds results for existing LD', function(done) {
			var ld_id = 1;
			var criteria = [ld_id];
			fixture.findAllComposes(criteria, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(7);
				done();
			});
		});

		it('Returns no results if LD not found', function(done) {
			var ld_id = 9999;
			var criteria = [ld_id];
			fixture.findAllComposes(criteria, function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(0);
				done();
			});
		});

	});

	describe('Updates Composes Multi', function() {

		var composesIdToUpdate1 = 1;
		var originalLevel1 = 1;
		var originalPosition1 = 1;

		var composesIdToUpdate2 = 2;
		var originalLevel2 = 2;
		var originalPosition2 = 1;

		var verifyComposes = 'SELECT id, level, position FROM composes WHERE id IN (?)';
		var verifyCompseIds = [composesIdToUpdate1, composesIdToUpdate2];

		var resetComposes = 'UPDATE composes set level = ?, position = ? WHERE id = ?; UPDATE composes set level = ?, position = ? WHERE id = ?;';
		var resetParams = [originalLevel1, originalPosition1, composesIdToUpdate1, originalLevel2, originalPosition2, composesIdToUpdate2];

		afterEach(function(done) {
			Dao.multiStatement(resetComposes, resetParams, function(err, results) {
				expect(err).to.be.null;
				done();
			});
		});

		it('Generates update statements', function() {
			var nodes = [
				{"id":1,"ld_id":1,"activity_id":1,"ld_part_id":null,"activity_group_id":null,"level":1,"position":4},
				{"id":2,"ld_id":1,"activity_id":2,"ld_part_id":null,"activity_group_id":null,"level":2,"position":5},
				{"id":3,"ld_id":1,"activity_id":3,"ld_part_id":null,"activity_group_id":null,"level":3,"position":6}
			];
			var expectedConcatStatement = 'UPDATE composes set level = ?, position = ? WHERE id = ?; UPDATE composes set level = ?, position = ? WHERE id = ?; UPDATE composes set level = ?, position = ? WHERE id = ?';
			var expectedParams = [1,4,1,2,5,2,3,6,3];
			
			var results = fixture.generateComposeUpdates(nodes);
			expect(results.concatStatement).to.equal(expectedConcatStatement);
			expect(results.params).to.have.members(expectedParams);
		});

		it('Updates multiple composes records', function(done) {
			var nodes = [
				{"id":composesIdToUpdate1,"ld_id":1,"activity_id":1,"ld_part_id":null,"activity_group_id":null,"level":9,"position":3},
				{"id":composesIdToUpdate2,"ld_id":1,"activity_id":3,"ld_part_id":null,"activity_group_id":null,"level":10,"position":4}
			];
			fixture.updateComposesMulti(nodes, function(err, results) {
				expect(err).to.be.null;
				Dao.findAll(verifyComposes, [verifyCompseIds], function(err, results) {
					expect(err).to.be.null;
					expect(results).to.have.length(2);
					done();
				});
			});
		});
	});

});