var async = require('async');
var studentsService = require('./StudentsService');
var activityCreateDao = require('../dao/ActivityCreateDao');
var composesService = require('./ComposesService');
var technologyService = require('./TechnologyService');
var resourceService = require('./Resourceservice');
var messages = require('../validate/ValidationMessages');
var logger = require('../util/LogWrapper');

var createActivityObj = function(studentsId, activityData) {
	return {
		students_id : studentsId,
		name : activityData.actName,
		dur_min : activityData.dur_min,
		dur_hh : activityData.dur_h,
		dur_dd : activityData.dur_d,
		dur_mon : activityData.dur_mon,
		pract_descr : activityData.pract_descr,
		edu_descr : activityData.edu_descr,
		modality : activityData.modality
	};
};

module.exports = {

	hasResources: function(activityData) {
		return activityData.resources && activityData.resources.length > 0;
	},

	// cb(err, {activity_id : activityId, composes_id : composesId}, message)
	createActivity: function(ldId, activityData, cb) {
		logger.log().info('ActivityCreateService: ' + JSON.stringify(activityData));
		// Sample Data:
		// {
		// 	"actName":"my activity name",										name
		// 	"modality":"1",																	modality
		//	"dur_mon":1,																		dur_mon
		// 	"dur_d":2,																			dur_dd
		// 	"dur_h":3,																			dur_hh
		// 	"dur_min":4,																		dur_min
		// 	"org":"1",																			--> ref: students_type.type
		//	"group_number":5,																--> insert: students.group_number
		//	"people_per_group":6,														--> insert: students.people_per_group
		// 	"technologies":["Whiteboard","touch screen"],		--> get activity.id after insert, pass to TechnologyService
		// 	"pract_descr":"long description",								pract_descr
		// 	"edu_descr":"pedagogical long description",			edu_descr
		//	"resources":[
		//		{"name":"res1","type":"restype1","descr":"res descr 1","link":"http://res.1"},
		//		{"name":"res2","type":"restype2","descr":"res 2 description","link":"http://res.2"}
		//	]
		// }

		async.waterfall([
				
				// Step 1: Insert STUDENTS
		    function(callback){
		    	studentsService.insertStudents(activityData.org, activityData.group_number, activityData.people_per_group, function(err, studentsId, message) {
		    		if(err) {
		    			callback(new Error(message));
		    		} else {
		      		callback(null, studentsId);
		    		}
		    	});
		    },
				
				// Step 2: Insert ACTIVITY
		    function(studentsId, callback) {
		    	var activityObj = createActivityObj(studentsId, activityData)
		    	activityCreateDao.insertActivity(activityObj, function(err, activityId) {
		    		if(err) {
		    			logger.log().error('Activity Create Service error inserting activity', err);
		    			callback(new Error(messages.ACTIVITY_INSERT_FAIL));
		    		} else {
		      		callback(null, activityId, studentsId);
		    		}
		    	});
		    },
				
				// Step 3: Insert COMPOSES
		    function(activityId, studentsId, callback) {
		      composesService.addActivity(ldId, activityId, function(err, composesId, message) {
		      	if(err) {
		    			callback(new Error(message));
		    		} else {
		    			var successInfo = {
		    				activity_id : activityId,
		    				students_id : studentsId,
		    				composes_id : composesId
		    			};
		      		callback(null, activityId, successInfo);
		    		}
		      });
		    },

		    // Step 4: Insert or Connect Technologies
		    function(activityId, successInfo, callback) {
		    	technologyService.insertSupports(activityId, activityData.technologies, function() {
		    		callback(null, activityId, successInfo);
		    	})
		    },

		    // Step 5: Add Resources
		    function(activityId, successInfo, callback) {
		    	if(module.exports.hasResources(activityData)) {
		    		resourceService.addResources(activityId, activityData.resources, function() {
		    			callback(null, successInfo);
		    		});
		    	}
		    }

		], function (err, successInfo) {
		   if(err) {
		   	cb(err, null, err.message);
		   } else {
		   	logger.log().info('Activity successfully created: ' + JSON.stringify(successInfo));
		   	cb(null, successInfo, null);
		   }       
		});
	}

};