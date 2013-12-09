var studentsDao = require('../dao/StudentsDao');
var async = require('async');
var messages = require('../validate/ValidationMessages');
var logger = require('../util/LogWrapper');

var createStudentsObj = function(studentsType, groupNumber, peoplePerGroup) {
	return {
		"type" : studentsType,
		"group_number" : groupNumber,
		"people_per_group" : peoplePerGroup
	};
};

module.exports = {
	
	// cb(err, studentsId, message)
	insertStudents: function(studentsType, groupNumber, peoplePerGroup, cb) {
		async.waterfall([
				
				// Step 1: Verify studentsType is an existing type
		    function(callback) {
		    	studentsDao.findStudentsType(studentsType, function(err, results) {
		    		if (err) {
		    			logger.log().error('Students Service error finding students type.', err);
		    			callback(new Error(messages.ACTIVITY_STUDENTS_TYPE_FIND_ERROR));
		    		} else if(results.length === 0) {
		    			logger.log().warn('Students Service zero results returned for finding students type.');
		    			callback(new Error(messages.ACTIVITY_STUDENTS_TYPE_INVALID));
		    		} else {
		      		callback(null, results[0].type, results[0].description);
		    		}
		    	});
		    },
		    
				// Step 2: Insert into STUDENTS
		    function(type, description, callback) {
		    	var studentsObj = createStudentsObj(type, groupNumber, peoplePerGroup);
		    	studentsDao.insertStudents(studentsObj, function(err, studentsId) {
		    		if(err) {
		    			logger.log().error('Students Service error inserting students.', err);
		    			callback(new Error(messages.ACTIVITY_STUDENTS_TYPE_INSERT_FAIL));
		    		} else {
		      		callback(null, studentsId);
		    		}
		    	});
		    }

		], function (err, studentsId) {
		   if(err) {
		   	cb(err, null, err.message);
		   } else {
		   	cb(null, studentsId, null);
		   }
		});
	}

}; 