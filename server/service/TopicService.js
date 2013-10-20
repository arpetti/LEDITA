var RefDao = require('../dao/RefDao');
var LdCreateDao = require('../dao/LdCreateDao');
var LdEditDao = require('../dao/LdEditDao');
var async = require('async');
var _ = require('underscore');
var messages = require('../validate/ValidationMessages');

var generateConcerns = function(existingTopics, ldId) {
	var topicIds = _.pluck(existingTopics, 'id');	
	return _.map(topicIds, function(topicId){ return [topicId, ldId]; });
};

var extractNewTopics = function(topicNames, existingTopics) {
	var existingTopicNames = _.pluck(existingTopics, 'name');
	return _.difference(topicNames, existingTopicNames);
};

module.exports = {

	// callback()
	insertTopics: function(ldId, topicNames, callback) {
		async.waterfall([
			// Step 1: Find topics that already exist in the system
		    function(callback){
		    	if (topicNames && topicNames.length > 0) {
			    	RefDao.findSubjectsByName(topicNames, function(err, existingTopics) {
			    		if (err) {
			    			callback(err); // If existing cannot be determined, halt entire flow
			    		} else {
			    			var concerns = generateConcerns(existingTopics, ldId);
			    			callback(null, concerns, existingTopics);
			    		}
			    	});
		    	} else {
		    		// Jump out of the flow because we have nothing to do
		    		callback(new Error('No topics provided')); 
		    	};
		    },
		    // Step 2: Bulk insert concerns for those topics that already exist
		    function(concerns, existingTopics, callback) {
		    	if (concerns.length > 0) {
		    		LdCreateDao.insertConcerns(concerns, function(err, results) {
		    			callback(null, existingTopics);
		    		});
		    	} else {
			        callback(null, existingTopics);
		    	}
		    },
		    // Step 3: For each new topic - insert it, get its id, and insert related concern
		    function(existingTopics, callback) {
		    	var newTopicsToInsert = extractNewTopics(topicNames, existingTopics);
		    	if (newTopicsToInsert.length > 0) {
			    	async.each(newTopicsToInsert, function(topicName, callback) {
			    		LdCreateDao.insertSubject({name: topicName}, function(err, subjectId) {
							if (!err) {
								LdCreateDao.insertConcern({subject_id: subjectId, ld_id: ldId}, function(err, result) {
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

	// callback(err, message)
	removeConcern: function(ldId, topicName, callback) {
		async.waterfall([
			// Step 1: Find topic id
		    function(callback){
		    	RefDao.findSubjectsByName([topicName], function(err, results) {
		    		if(err) {
		    			callback(err);
		    		} else {
		    			if(results.length === 0) {
		    				callback(new Error('Topic not found'));
		    			} else {
		    				callback(null, results[0].id);
		    			}
		    		}
		    	});
		    },
		    // Step 2: Delete the concern
		    function(topicId, callback) {
		    	LdEditDao.deleteConcern(ldId, topicId, function(err, result) {
		    		if(err) {
		    			callback(err);
		    		} else {
		    			callback(null, 'done');
		    		}
		    	});
		    }
		], function (err, result) {
			if(err) {
				callback(err, messages.TOPIC_REMOVE_FAIL);
			} else {
		   		callback(); 
			};
		});
	}

};