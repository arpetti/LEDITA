var expect = require('chai').expect;
var messages = require('../../../server/validate/ValidationMessages');
var dao = require('../../../server/dao/Dao');
var fixture = require('../../../server/service/ActivityCreateService');
var async = require('async');

describe('Activity Create Service Integration', function() {

	var verifyTechnologyCreated = 'select id, name from technology where name = ?';
	var verifySupports = 'select technology_id, activity_id from supports where activity_id = ?'
	var cleanupComposes = 'delete from composes where id = ?';
	var cleanupStudents = 'delete from students where id = ?';
	var cleanupTechnology = 'delete from technology where name = ?';
	var cleanupSupports = 'delete from supports where activity_id = ?';
	var cleanupActivity = 'delete from activity where id = ?';

	it('Inserts Activity and all related Children', function(done) {
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
			"technologies" : ["Whiteboard", "Touch Screen"],
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

			async.series([
		    function(callback) {
	        dao.findAll(verifyTechnologyCreated, activityData.technologies[1], function(err, results) {
	        	expect(err).to.be.null;
	        	expect(results).to.have.length(1);
	        	callback(null, 'Technology creation verified for technology: ' + activityData.technologies[1]);
	        });
		    },
		    function(callback) {
	        dao.findAll(verifySupports, [successInfo.activity_id], function(err, results) {
	        	expect(err).to.be.null;
	        	expect(results).to.have.length(2);
	        	callback(null, 'Supports verified for activity: ' + successInfo.activity_id);
	        });
		    },
		    function(callback) {
	        dao.deleteRecord(cleanupSupports, [successInfo.activity_id], function(err, results) {
	        	expect(err).to.be.null;
	        	callback(null, 'Supports cleaned up for activity: ' + successInfo.activity_id);
	        });
		    },
		    function(callback) {
	        dao.deleteRecord(cleanupTechnology, activityData.technologies[1], function(err, results) {
	        	expect(err).to.be.null;
	        	callback(null, 'Cleaned up technology: ' + activityData.technologies[1]);
	        });
		    },
		    function(callback) {
	        dao.deleteRecord(cleanupComposes, [successInfo.composes_id], function(err, results) {
	        	expect(err).to.be.null;
	        	callback(null, 'Composes cleaned up: ' + successInfo.composes_id);
	        });
		    },
		    function(callback) {
	        dao.deleteRecord(cleanupActivity, [successInfo.activity_id], function(err, results) {
	        	expect(err).to.be.null;
	        	callback(null, 'Activity cleaned up: ' + successInfo.activity_id);
	        });
		    },function(callback) {
	        dao.deleteRecord(cleanupStudents, [successInfo.students_id], function(err, results) {
	        	expect(err).to.be.null;
	        	callback(null, 'Students cleaned up: ' + successInfo.students_id);
	        });
		    }
			],
			function(err, results) {
				console.log('ActivityCreateServiceIntSpec results: ' + JSON.stringify(results));
				expect(err).to.be.null;
				expect(results).to.have.length(7);
				done();
			});
			
		});
	});

});
