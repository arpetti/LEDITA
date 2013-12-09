var chai = require('chai');
var expect = require('chai').expect;
var messages = require('../../../server/validate/ValidationMessages');
var dao = require('../../../server/dao/Dao');
var fixture = require('../../../server/service/ComposesService');

describe('Composes Service Integration', function() {

	var verifyComposes = 'select id, ld_id, activity_id, level, position from composes where id = ?';
	var cleanupComposes = 'delete from composes where id = ?';

	it('New composes record for LD having none goes to level 1, position 1', function(done) {
		var ldId = 17;
		var activityId = 60;
		var expectedLevel = 1;
		var expectedPosition = 1;
		fixture.addActivity(ldId, activityId, function(err, composesId, message) {
			expect(err).to.be.null;
			expect(composesId).not.to.be.null;
			expect(composesId).to.be.above(0);
			expect(message).to.be.null;
			dao.findAll(verifyComposes, [composesId], function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(1);
				expect(result[0].id).to.equal(composesId);
				expect(result[0].ld_id).to.equal(ldId);
				expect(result[0].activity_id).to.equal(activityId);
				expect(result[0].level).to.equal(expectedLevel);
				expect(result[0].position).to.equal(expectedPosition);
				dao.deleteRecord(cleanupComposes, [composesId], function(err, result) {
					expect(err).to.be.null;
					done();
				});
			});
		});
	});

	it('New composes record for LD having 3 levels goes to level 4, position 1', function(done) {
		var ldId = 4; // known from demo data to have 3 levels
		var activityId = 60;
		var expectedLevel = 4;
		var expectedPosition = 1;
		fixture.addActivity(ldId, activityId, function(err, composesId, message) {
			expect(err).to.be.null;
			expect(composesId).not.to.be.null;
			expect(composesId).to.be.above(0);
			expect(message).to.be.null;
			dao.findAll(verifyComposes, [composesId], function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(1);
				expect(result[0].id).to.equal(composesId);
				expect(result[0].ld_id).to.equal(ldId);
				expect(result[0].activity_id).to.equal(activityId);
				expect(result[0].level).to.equal(expectedLevel);
				expect(result[0].position).to.equal(expectedPosition);
				dao.deleteRecord(cleanupComposes, [composesId], function(err, result) {
					expect(err).to.be.null;
					done();
				});
			});
		});
	});

});