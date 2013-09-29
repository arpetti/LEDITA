var RefDao = require('../dao/RefDao');
var LdCreateDao = require('../dao/LdCreateDao');
var ObjectiveHelper = require('../util/ObjectiveHelper');
var async = require('async');

module.exports = {

	// Prerequisites ARE Objectives
	// callback()
	insertPrerequisites: function(ldId, objectiveNames, callback) {
		async.waterfall([
			// Step 1: Find objectives that already exist in the system
		    function(callback){
		    	if (objectiveNames && objectiveNames.length > 0) {
			    	RefDao.findObjectivesByName(objectiveNames, function(err, existingObjectives) {
			    		if (err) {
			    			callback(err); // If existing cannot be determined, halt entire flow
			    		} else {
			    			var needs = ObjectiveHelper.generateRelationshipRecords(existingObjectives, ldId);
			    			callback(null, needs, existingObjectives);
			    		}
			    	});
		    	} else {
		    		// Jump out of the flow because we have nothing to do
		    		callback(new Error('No prerequisites provided')); 
		    	};
		    },
		    // Step 2: Bulk insert needs for those objectives that already exist
		    function(needs, existingObjectives, callback) {
		    	if (needs.length > 0) {
		    		LdCreateDao.bulkInsertNeeds(needs, function(err, results) {
		    			callback(null, existingObjectives);
		    		});
		    	} else {
			        callback(null, existingObjectives);
		    	}
		    },
		    // Step 3: For each new objective - insert it, get its id, and insert related need
		    function(existingObjectives, callback) {
		    	var newObjectivesToInsert = ObjectiveHelper.extractNewObjectives(objectiveNames, existingObjectives);
		    	if (newObjectivesToInsert.length > 0) {
			    	async.each(newObjectivesToInsert, function(objectiveName, callback) {
			    		LdCreateDao.insertObjective({descr: objectiveName}, function(err, objectiveId) {
							if (!err) {
								LdCreateDao.insertNeed({objective_id: objectiveId, ld_id: ldId}, function(err, result) {
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
	}

};