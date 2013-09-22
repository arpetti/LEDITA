var RefDao = require('../dao/RefDao');
var async = require('async');
var messages = require('./ValidationMessages');
var _ = require('underscore');

var generateConcerns = function(existingTopics, ldid) {
	var topicIds = _.pluck(existingTopics, 'id');	
	return _.map(topicIds, function(topicId){ return [topicId, ldid]; });
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
		    	console.log('Future task will bulk insert concerns: ' + JSON.stringify(concerns));
		        callback(null, existingTopics);
		    },
		    function(existingTopics, callback){
		        console.log('Future task will insert entries in topicNames that are not existingTopics');
		        callback(null, 'done');
		    }
		], function (err, result) {
		   callback(); // don't cb with err because shouldn't halt rest of callers' flow   
		});
	}

};