var chai = require('chai');
var expect = require('chai').expect
var fixture = require('../../../server/dao/ActivityCreateDao');
var dao = require('../../../server/dao/Dao');

describe('Activity Create DAO', function() {

	var cleanupActivity = 'delete from activity where id = ?';

	it('Inserts a new activity', function(done) {
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

});