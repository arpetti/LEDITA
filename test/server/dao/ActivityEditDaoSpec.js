var chai = require('chai');
var expect = require('chai').expect
var fixture = require('../../../server/dao/ActivityEditDao');

describe('Activity Edit Dao', function() {

	describe('Get Composes Count', function() {

		it('Returns 1 for activity that belongs to LD', function(done) {
			var ldId = 2;
			var activityId = 16; // known from demo data to belong to LD 2
			fixture.getComposesCount(ldId, activityId, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(1);
				expect(result[0].count_id).to.equal(1);
				done();
			});
		});

		it('Returns 0 for activity that does not belong to LD', function(done) {
			var ldId = 3;
			var activityId = 16;
			fixture.getComposesCount(ldId, activityId, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(1);
				expect(result[0].count_id).to.equal(0);
				done();
			});
		});

		it('Returns 0 for LD that does not exist', function(done) {
			var ldId = 99999;
			var activityId = 16;
			fixture.getComposesCount(ldId, activityId, function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(1);
				expect(result[0].count_id).to.equal(0);
				done();
			});
		});

	});

});