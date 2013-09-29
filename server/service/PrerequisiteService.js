var RefDao = require('../dao/RefDao');
var LdCreateDao = require('../dao/LdCreateDao');
var async = require('async');
var _ = require('underscore');

// TODO: These two methods duplicated in ObjectiveService - extract common util/ObjectiveHelper
var generateNeeds = function(existingObjectives, ldid) {
	var objectiveIds = _.pluck(existingObjectives, 'id');	
	return _.map(objectiveIds, function(objectiveId){ return [objectiveId, ldid]; });
};

var extractNewObjectives = function(objectiveNames, existingObjectives) {
	var existingObjectiveNames = _.pluck(existingObjectives, 'descr');
	return _.difference(objectiveNames, existingObjectiveNames);
};

module.exports = {

	// Prerequisites ARE Objectives
	// callback()
	insertPrerequisites: function(ldid, objectiveNames, callback) {
		async.waterfall([
			// Step 1: Find objectives that already exist in the system
		    function(callback){
		    	if (objectiveNames.length > 0) {
			    	RefDao.findObjectivesByName(objectiveNames, function(err, existingObjectives) {
			    		if (err) {
			    			callback(err); // If existing cannot be determined, halt entire flow
			    		} else {
			    			var needs = generateNeeds(existingObjectives, ldid);
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
		    	var newObjectivesToInsert = extractNewObjectives(objectiveNames, existingObjectives);
		    	if (newObjectivesToInsert.length > 0) {
			    	async.each(newObjectivesToInsert, function(objectiveName, callback) {
			    		LdCreateDao.insertObjective({descr: objectiveName}, function(err, objectiveId) {
							if (!err) {
								LdCreateDao.insertNeed({objective_id: objectiveId, ld_id: ldid}, function(err, result) {
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