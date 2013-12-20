var expect = require('chai').expect;
var messages = require('../../../server/validate/ValidationMessages');
var dao = require('../../../server/dao/Dao');
var fixture = require('../../../server/service/ActivityCreateService');
var async = require('async');
var _ = require('underscore');

describe('Activity Create Service Integration', function() {

	var verifyTechnologyCreated = 'select id, name from technology where name = ?';
	var verifyResourcesCreated = 'select id, activity_id, name, type, descr, link from resource where activity_id = ?';
	var verifySupports = 'select technology_id, activity_id from supports where activity_id = ?'
	var cleanupComposes = 'delete from composes where id = ?';
	var cleanupResources = 'delete from resource where activity_id = ?';
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
			"edu_descr" : "pedagogical long description",
			"resources":[
				{"name":"res1","type":"restype1","descr":"res descr 1","link":"http://res.1"},
				{"name":"res2","type":"restype2","descr":"res 2 description","link":"http://res.2"}
			]	
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
		    	dao.findAll(verifyResourcesCreated, [successInfo.activity_id], function(err, results) {
		    		expect(err).to.be.null;
		    		expect(results).to.have.length(activityData.resources.length);
		    		expect(_.contains(_.pluck(results, "name"), activityData.resources[0].name)).to.be.true;
		    		expect(_.contains(_.pluck(results, "name"), activityData.resources[1].name)).to.be.true;
		    		callback(null, 'Resource creation verified for: ' + _.pluck(results, "name"));
		    	})
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
		    	dao.deleteRecord(cleanupResources, [successInfo.activity_id], function(err, results) {
	        	expect(err).to.be.null;
	        	callback(null, 'Resources cleaned up for activity id: ' + successInfo.activity_id);
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
				expect(results).to.have.length(9);
				done();
			});
			
		});
	});

	describe('Has Resources', function() {

		it('Returns false if activity has empty resources', function() {
			var sampleActivity = {name : 'some name', resources : []};
			var result = fixture.hasResources(sampleActivity);
			expect(result).to.be.false;
		});

		it('Returns undefined if activity has no resources', function() {
			var sampleActivity = {name : 'some name'};
			var result = fixture.hasResources(sampleActivity);
			expect(result).to.be.undefined;
		});

		it('Returns true if activity has resources', function() {
			var sampleActivity = {
				name : 'some name', 
				resources : [
					{name: 'resource name'}
				]
			};
			var result = fixture.hasResources(sampleActivity);
			expect(result).to.be.true;
		});

	});

});
