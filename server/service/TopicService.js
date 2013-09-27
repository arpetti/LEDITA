var RefDao = require('../dao/RefDao');
var LdCreateDao = require('../dao/LdCreateDao');
var async = require('async');
var messages = require('./ValidationMessages');
var _ = require('underscore');

var generateConcerns = function(existingTopics, ldid) {
	var topicIds = _.pluck(existingTopics, 'id');	
	return _.map(topicIds, function(topicId){ return [topicId, ldid]; });
};

var extractNewTopics = function(topicNames, existingTopics) {
	var existingTopicNames = _.pluck(existingTopics, 'name');
	return _.difference(topicNames, existingTopicNames);
	//var newTopicNames = _.difference(topicNames, existingTopicNames);
	//return _.map(newTopicNames, function(name){ return [name]; });
};

module.exports = {

	// callback()
	insertTopics: function(ldid, topicNames, callback) {
		async.waterfall([
			// Step 1: Find topics that already exist in the system
		    function(callback){
		    	RefDao.findSubjectsByName(topicNames, function(err, existingTopics) {
		    		if (err) {
		    			callback(err)
		    		} else {
		    			var concerns = generateConcerns(existingTopics, ldid);
		    			callback(null, concerns, existingTopics);
		    		}
		    	});
		    },
		    // Step 2: Insert concerns for those topics that already exist
		    function(concerns, existingTopics, callback) {
		    	if (concerns.length > 0) {
		    		LdCreateDao.insertConcerns(concerns, function(err, results) {
		    			callback(null, existingTopics);
		    		});
		    	} else {
			        callback(null, existingTopics);
		    	}
		    },
		    // Step 3: For each new topic - insert it, get its id, and insert concern
		    function(existingTopics, callback) {
		    	var newTopicsToInsert = extractNewTopics(topicNames, existingTopics);
		    	if (newTopicsToInsert.length > 0) {
			    	async.each(newTopicsToInsert, function(topicName, callback) {
			    		LdCreateDao.insertSubject({name: topicName}, function(err, subjectId) {
							if (!err) {
								LdCreateDao.insertConcern({subject_id: subjectId, ld_id: ldid}, function(err, result) {
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