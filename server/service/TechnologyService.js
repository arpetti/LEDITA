var RefDao = require('../dao/RefDao');
var ActivityCreateDao = require('../dao/ActivityCreateDao');
var TechnologyHelper = require('../util/TechnologyHelper');
var async = require('async');
var messages = require('../validate/ValidationMessages');

module.exports = {

	// callback()
	insertSupports: function(activityId, technologyNames, callback) {
		async.waterfall([
			// Step 1: Find technologies that already exist in the system
		    function(callback){
		    	if (technologyNames && technologyNames.length > 0) {
			    	RefDao.findTechnologiesByName(technologyNames, function(err, existingTechnologies) {
			    		if (err) {
			    			callback(err); // If existing cannot be determined, halt entire flow
			    		} else {
			    			var supports = TechnologyHelper.generateRelationshipRecords(existingTechnologies, activityId);
			    			callback(null, supports, existingTechnologies);
			    		}
			    	});
		    	} else {
		    		// Jump out of the flow because we have nothing to do
		    		callback(new Error('No technologies provided')); 
		    	};
		    },
		    // Step 2: Bulk insert supports for those objectives that already exist
		    function(supports, existingTechnologies, callback) {
		    	if (supports.length > 0) {
		    		ActivityCreateDao.bulkInsertSupports(supports, function(err, results) {
		    			callback(null, existingTechnologies);
		    		});
		    	} else {
			        callback(null, existingTechnologies);
		    	}
		    },
		    // Step 3: For each new technology - insert it, get its id, and insert related support
		    function(existingTechnologies, callback) {
		    	var newTechnologyToInsert = TechnologyHelper.extractNewTechnologies(technologyNames, existingTechnologies);
		    	if (newTechnologyToInsert.length > 0) {
			    	async.each(newTechnologyToInsert, function(technologyName, callback) {
			    		ActivityCreateDao.insertTechnology({name: technologyName}, function(err, technologyId) {
							if (!err) {
								ActivityCreateDao.insertSupports({technology_id: technologyId, activity_id: activityId}, function(err, result) {
									callback();
								});
							}
						});
			    	});
		    	}
		    	callback(null, 'done');
		    }
		], function (err, result) {
		   callback(); // don't cb with err because shouldn't halt rest of callers' flow   
		});
	},

};