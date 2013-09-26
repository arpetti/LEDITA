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
	var newTopicNames = _.difference(topicNames, existingTopicNames);
	return _.map(newTopicNames, function(name){ return [name]; });
};

module.exports = {

	// callback()
	insertTopics: function(ldid, topicNames, callback) {
		async.waterfall([
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
		    function(concerns, existingTopics, callback) {
		    	if (concerns.length > 0) {
		    		LdCreateDao.insertConcerns(concerns, function(err, results) {
		    			callback(null, existingTopics);
		    		});
		    	} else {
			        callback(null, existingTopics);
		    	}
		    },
		    function(existingTopics, callback){
		        var newTopicsToInsert = extractNewTopics(topicNames, existingTopics);
		        if (newTopicsToInsert.length > 0) {
			        LdCreateDao.insertSubjects(newTopicsToInsert, function(err, results) {
			        	callback(null, newTopicsToInsert);
			        });
		        } else {
		        	callback(null, newTopicsToInsert);
		        }
		    }
		], function (err, result) {
		   callback(); // don't cb with err because shouldn't halt rest of callers' flow   
		});
	}

};