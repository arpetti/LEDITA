var expect = require('chai').expect;
var ActivityEditDao = require('../../../server/dao/ActivityEditDao');

describe('Activity Edit DAO', function() {

	describe('Find Composes Activity', function() {

		it('Finds Relationship from LD to Activity', function(done) {
			var ld_id = 2;
			var activity_id = 20;
			var level = 4;
			var position = 1;
			var criteria = [ld_id, activity_id, level, position];
			var expectedComposesId = 15; // known from demo data
			ActivityEditDao.findComposesActivity(criteria, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(1);
				expect(result[0].id).to.equal(expectedComposesId);
				done();
			});
		});

		it('Returns no results if criteria not found', function(done) {
			var ld_id = 2;
			var activity_id = 20;
			var level = 4;
			var position = 99; // LD has Activity, but not in this position
			var criteria = [ld_id, activity_id, level, position];
			ActivityEditDao.findComposesActivity(criteria, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(0);
				done();
			});
		});

	});

	describe('Find Composes LD', function() {

		it('Finds Relationship from LD to LD', function(done) {
			var ld_id = 5;
			var ld_part_id = 2;
			var level = 6;
			var position = 2;
			var criteria = [ld_id, ld_part_id, level, position];
			var expectedComposesId = 36; // known from demo data
			ActivityEditDao.findComposesLd(criteria, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(1);
				expect(result[0].id).to.equal(expectedComposesId);
				done();
			});
		});

		it('Returns no results if criteria not found', function(done) {
			var ld_id = 5;
			var ld_part_id = 2;
			var level = 6;
			var position = 99; // LD has LD, but not in this position
			var criteria = [ld_id, ld_part_id, level, position];
			ActivityEditDao.findComposesLd(criteria, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(0);
				done();
			});
		});

	});

	describe('Find Composes Group', function() {

		it('Finds Relationship from LD to Group', function(done) {
			var ld_id = 1;
			var activity_group_id = 1;
			var level = 2;
			var position = 1;
			var criteria = [ld_id, activity_group_id, level, position];
			var expectedComposesId = 2; // known from demo data
			ActivityEditDao.findComposesGroup(criteria, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(1);
				expect(result[0].id).to.equal(expectedComposesId);
				done();
			});
		});

		it('Returns no results if criteria not found', function(done) {
			var ld_id = 1;
			var activity_group_id = 1;
			var level = 2;
			var position = 99; // LD has Group, but not in this position
			var criteria = [ld_id, activity_group_id, level, position];
			ActivityEditDao.findComposesGroup(criteria, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(0);
				done();
			});
		});

	});

});