var LdCreateDao = require('../dao/LdCreateDao');
var ScopeService = require('./ScopeService');
var QcerService = require('./QcerService');
var TopicService = require('./TopicService');
var ObjectiveService = require('./ObjectiveService');
var PrerequisiteService = require('./PrerequisiteService');
var async = require('async');
var messages = require('../validate/ValidationMessages');
var _ = require('underscore');

var createLdForInsert = function(userId, scopeId, ldData) {
	var ldObj = {
		user_id: userId,
		name: ldData.name,
		scope_id: scopeId,
		students_profile: ldData.studentsDescription
	};
	return ldObj;
};

module.exports = {

	// callback(err, ldid, message)
	createLd: function(userId, ldData, callback) {

		async.waterfall([
			// Step 1: Determine Scope Id
			function(callback) {
				ScopeService.getScopeId(ldData.scope, function(err, scopeId) {
					if (err) {
						callback(err);
					} else {
						callback(null, scopeId);
					}
				});
			},
			// Step 2: Create LD
            function(scopeId, callback) {
            	var ldObj = createLdForInsert(userId, scopeId, ldData);
                LdCreateDao.createLd(ldObj, function(err, ldid) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, ldid);
                    }
                })
            },
            // Step 3: Associate Qcer's to the LD
            function(ldid, callback)  {
            	QcerService.attachQcers(ldid, ldData.qcers, function(err, results) {
            		callback(null, ldid);
            	});
            },
            // Step 4: Associate Topics to the LD (creating if necessary)
            function(ldid, callback)  {
            	TopicService.insertTopics(ldid, ldData.topics, function() {
            		callback(null, ldid); 
            	});
            },
            // Step 5: Associate Objectives to the LD (creating if necessary)
            function(ldid, callback)  {
            	ObjectiveService.insertObjectives(ldid, ldData.objectives, function() {
            		callback(null, ldid); 
            	});
            },
            // Step 6: Associate Prerequisites (i.e. Objectives) to the LD (creating if necessary)
            function(ldid, callback)  {
            	PrerequisiteService.insertPrerequisites(ldid, ldData.requisites, function() {
            		callback(null, ldid); 
            	});
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