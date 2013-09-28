var LdCreateDao = require('../dao/LdCreateDao');
var TopicService = require('./TopicService');
var ObjectiveService = require('./ObjectiveService');
var async = require('async');
var messages = require('./ValidationMessages');
var _ = require('underscore');

var createLdForInsert = function(userId, ldData) {
	var ldObj = {
		user_id: userId,
		name: ldData.name,
		scope: ldData.scope,
		students_profile: ldData.studentsDescription
	};
	return ldObj;
};

var getSelectedQcers = function(ldData) {
	var potentialQcers = ldData.qcers;
	var selectedQcers = [];
	for (var key in potentialQcers) {
		var value = potentialQcers[key];
		if(value === true) {
			selectedQcers.push(key);
		}
	};
	return _.map(selectedQcers, function(element) {return parseInt(element,10); });
}

var buildClassificates = function(ldid, qcerIds) {
	return _.map(qcerIds, function(qcerId){ return [qcerId, ldid]; });
};

module.exports = {

	// callback(err, ldid, message)
	createLd: function(userId, ldData, callback) {

		// TODO Input validation, make sure qcer ids are numbers, at least one topic

		async.waterfall([
			// Step 1: Create LD
            function(callback) {
            	var ldObj = createLdForInsert(userId, ldData);
                LdCreateDao.createLd(ldObj, function(err, ldid) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, ldid);
                    }
                })
            },
            // Step 2: Associate Qcer's to the LD
            function(ldid, callback)  {
            	var qcersToAttach = buildClassificates(ldid, getSelectedQcers(ldData));
            	if (qcersToAttach.length > 0) {
	            	LdCreateDao.insertClassificates(qcersToAttach, function(err, results) {
	            		if (err) {
	            			callback(err);
	            		} else {
	            			callback(null, ldid);
	            		}
	            	})
            	} else {
            		callback(null, ldid);
            	}
            },
            // Step 3: Associate Topics to the LD (creating if necessary)
            function(ldid, callback)  {
            	TopicService.insertTopics(ldid, ldData.topics, function() {
            		callback(null, ldid); 
            	});
            },
            // Step 4: Associate Objectives to the LD (creating if necessary)
            function(ldid, callback)  {
            	ObjectiveService.insertObjectives(ldid, ldData.objectives, function() {
            		callback(null, ldid); 
            	});
            },
            function(ldid, callback)  {
            	console.log('Future task to insert or attach requisites for ldid: ' + ldid);
            	callback(null, ldid); 
            }
        ], function (err, ldid) {
           if (err) {
                callback(err, null, messages.UNABLE_TO_CREATE_LD);
           } else {
                callback(null, ldid, null);
           }
        });
	}

};