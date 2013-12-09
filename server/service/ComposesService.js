var composesDao = require('../dao/ComposesDao');
var async = require('async');
var messages = require('../validate/ValidationMessages');
var logger = require('../util/LogWrapper');

var createComposesObj = function(ldId, activityId, maxLevelPlusOne) {
	return {
		"ld_id" : ldId,
		"activity_id" : activityId,
		"level" : maxLevelPlusOne,
		"position" : 1
	};
};

module.exports = {
	
	// cb(err, composesId, message)
	addActivity: function(ldId, activityId, cb) {
		async.waterfall([
				
				// Step 1: find max level in COMPOSES for ldId
		    function(callback){
		    	composesDao.findMaxLevel(ldId, function(err, result) {
		    		if (err) {
		    			logger.log().error('Composes Service error finding max composes level for LD', err);
		    			callback(new Error(messages.ACTIVITY_FIND_MAX_LEVEL_FAIL));
		    		} else if (!result[0].max_level) {
		    			callback(null, 1);
		    		} else {
		      		callback(null, result[0].max_level + 1);
		    		}
		    	});
		    },

				// Step 2: insert into COMPOSES
		    function(maxLevelPlusOne, callback){
		    	var composesObj = createComposesObj(ldId, activityId, maxLevelPlusOne);
		    	composesDao.insertComposes(composesObj, function(err, composesId) {
		    		if (err) {
		    			logger.log().error('Composes Service error inserting activity', err);
		    			callback(new Error(messages.ACTIVITY_INSERT_COMPOSES_FAIL));
		    		} else {
		      		callback(null, composesId);
		    		}
		    	});
		    }

		], function (err, composesId) {
		   if(err) {
		   	cb(err, null, err.message);
		   } else {
		   	cb(null, composesId, null);
		   }    
		});
	}

}; 