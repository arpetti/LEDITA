var chai = require('chai');
var expect = require('chai').expect
var fixture = require('../../../server/dao/ActivityCreateDao');
var dao = require('../../../server/dao/Dao');
var _ = require('underscore');

describe('Activity Create DAO', function() {

	it('Inserts a new activity', function(done) {
		var cleanupActivity = 'delete from activity where id = ?';
		var activityObj = {
			students_id : 1,
			name : 'New Activity created by DAO test',
			dur_min : 15,
			dur_hh : 1,
			dur_dd : 0,
			dur_mon : 0,
			pract_descr : 'Practical description from dao test',
			edu_descr : 'Educational description from dao test',
			modality : '1'
		};
		fixture.insertActivity(activityObj, function(err, activityId) {
			expect(err).to.be.null
			expect(activityId).not.to.be.null;
			expect(activityId).to.be.above(0);
			dao.deleteRecord(cleanupActivity, [activityId], function(err, result) {
				expect(err).to.be.null;
				done();
			});
		});
	});

	it('Inserts a single SUPPORTS record', function(done) {
		var cleanupSupports = 'delete from supports where technology_id = ? and activity_id = ?';
		var verifySupports = 'select technology_id, activity_id from supports where technology_id = ? and activity_id = ?';
		var supportsObj = {
			technology_id : 1,
			activity_id : 55
		}
		fixture.insertSupports(supportsObj, function(err, result) {
			expect(err).to.be.null;
			dao.findAll(verifySupports, [supportsObj.technology_id, supportsObj.activity_id], function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(1);
				expect(_.contains(_.pluck(results, "technology_id"), supportsObj.technology_id)).to.be.true;
				expect(_.contains(_.pluck(results, "activity_id"), supportsObj.activity_id)).to.be.true;
				dao.deleteRecord(cleanupSupports, [supportsObj.technology_id, supportsObj.activity_id], function(err, result) {
					expect(err).to.be.null;
					done();
				});
			});
		});
	});

	it('Bulk inserts multiple SUPPORTS records', function(done) {
		var cleanupSupports = 'delete from supports where activity_id = ?';
		var verifySupports = 'select technology_id, activity_id from supports where activity_id = ?';
		var activityId = 56; // known from demo data not to have any technologies
		var technologyId1 = 1;
		var technologyId2 = 2;
		var supportss = [[technologyId1, activityId], [technologyId2, activityId]];
		fixture.bulkInsertSupports(supportss, function(err, results) {
			expect(err).to.be.null;
			expect(results).not.to.be.null;
			expect(results.affectedRows).to.equal(supportss.length);
			dao.findAll(verifySupports, [activityId], function(err, results) {
				expect(err).to.be.null;
				expect(results).to.have.length(2);
				expect(_.contains(_.pluck(results, "technology_id"), technologyId1)).to.be.true;
				expect(_.contains(_.pluck(results, "technology_id"), technologyId2)).to.be.true;
				dao.deleteRecord(cleanupSupports, [activityId], function(err, result) {
					expect(err).to.be.null;
					done();
				});
			});
		});
	});

	it('Bulk inserts multiple RESOURCE records', function(done) {
		var cleanupResource = 'delete from resource where activity_id = ?';
		var verifyResource = 'select id, activity_id, name, type, descr, link from resource where activity_id = ?';
		var activityId = 3; // known from demo data not to have any resources
		var resource1 = [activityId, 'res name 1', 'res type 1', 'res descr 1', 'http://res.1'];
		var resource2 = [activityId, 'res name 2', 'res type 2', 'res descr 2', 'http://res.2'];
		var resources = [resource1, resource2];
		fixture.bulkInsertResource(resources, function(err, result) {
			expect(result.affectedRows).to.equal(resources.length);
			expect(err).to.be.null;
			dao.findAll(verifyResource, [activityId], function(err, result) {
				expect(err).to.be.null;
				expect(result).to.have.length(resources.length);
				expect(result[0].id).to.be.above(40);
				expect(result[1].id).to.be.above(40);
				dao.deleteRecord(cleanupResource, [activityId], function(err, result) {
					expect(err).to.be.null;
					done();
				});
			})
		});
	});

});