var expect = require('chai').expect;
var messages = require('../../../server/validate/ValidationMessages');
var dao = require('../../../server/dao/Dao');
var fixture = require('../../../server/service/ActivityCreateService');

describe('Activity Create Service Integration', function() {

	var cleanupComposes = 'delete from composes where id= ?';
	var cleanupStudents = 'delete from students where id = ?';
	var cleanupActivity = 'delete from activity where id = ?';

	it('Inserts Activity and Composes', function(done) {
		var ldId = 24;
		var activityData = {
			"actName" : "Activity Created via Integration Test",
			"modality" : "2",
			"dur_mon" : 1,																
			"dur_d" : 2,																	
			"dur_h" : 3,																	
			"dur_min" : 4,																
			"org" : "1",																	
			"group_number" : 5,														
			"people_per_group" : 6,												
			"technologies" : ["Whiteboard","touch screen"],
			"pract_descr" : "long description",						
			"edu_descr" : "pedagogical long description"	
		};

		fixture.createActivity(ldId, activityData, function(err, successInfo, message) {
			expect(err).to.be.null;
			expect(successInfo).not.to.be.null;
			expect(successInfo.activity_id).to.be.above(0);
			expect(successInfo.composes_id).to.be.above(0);
			expect(successInfo.students_id).to.be.above(0);
			expect(message).to.be.null;
			dao.deleteRecord(cleanupComposes, [successInfo.composes_id], function(err, result) {
				expect(err).to.be.null;
				dao.deleteRecord(cleanupActivity, [successInfo.activity_id], function(err, result) {
					expect(err).to.be.null;
					dao.deleteRecord(cleanupStudents, [successInfo.students_id], function(err, result) {
						expect(err).to.be.null;
						done();
					});
				});
			});
		});
	});

});
