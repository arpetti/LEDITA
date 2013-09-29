var RefDao = require('../dao/RefDao');
var LdCreateDao = require('../dao/LdCreateDao');
var async = require('async');
var _ = require('underscore');

var generateAims = function(existingObjectives, ldId) {
	var objectiveIds = _.pluck(existingObjectives, 'id');	
	return _.map(objectiveIds, function(objectiveId){ return [objectiveId, ldId]; });
};

var extractNewObjectives = function(objectiveNames, existingObjectives) {
	var existingObjectiveNames = _.pluck(existingObjectives, 'descr');
	return _.difference(objectiveNames, existingObjectiveNames);
};

module.exports = {

	// callback()
	insertObjectives: function(ldId, objectiveNames, callback) {
		async.waterfall([
			// Step 1: Find objectives that already exist in the system
		    function(callback){
		    	if (objectiveNames && objectiveNames.length > 0) {
			    	RefDao.findObjectivesByName(objectiveNames, function(err, existingObjectives) {
			    		if (err) {
			    			callback(err); // If existing cannot be determined, halt entire flow
			    		} else {
			    			var aims = generateAims(existingObjectives, ldId);
			    			callback(null, aims, existingObjectives);
			    		}
			    	});
		    	} else {
		    		// Jump out of the flow because we have nothing to do
		    		callback(new Error('No objectives provided')); 
		    	};
		    },
		    // Step 2: Bulk insert aims for those objectives that already exist
		    function(aims, existingObjectives, callback) {
		    	if (aims.length > 0) {
		    		LdCreateDao.insertAims(aims, function(err, results) {
		    			callback(null, existingObjectives);
		    		});
		    	} else {
			        callback(null, existingObjectives);
		    	}
		    },
		    // Step 3: For each new objective - insert it, get its id, and insert related aim
		    function(existingObjectives, callback) {
		    	var newObjectivesToInsert = extractNewObjectives(objectiveNames, existingObjectives);
		    	if (newObjectivesToInsert.length > 0) {
			    	async.each(newObjectivesToInsert, function(objectiveName, callback) {
			    		LdCreateDao.insertObjective({descr: objectiveName}, function(err, objectiveId) {
							if (!err) {
								LdCreateDao.insertAim({objective_id: objectiveId, ld_id: ldId}, function(err, result) {
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