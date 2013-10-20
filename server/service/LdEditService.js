var LdEditDao = require('../dao/LdEditDao');
var ScopeService = require('./ScopeService');
var QcerService = require('./QcerService');
var TopicService = require('./TopicService');
var ObjectiveService = require('./ObjectiveService');
var messages = require('../validate/ValidationMessages');

var updateLdPublicationCommon = function(publicationIndicator, ldId, cb) {
	LdEditDao.updateLdPublication(publicationIndicator, ldId, function(err, result) {
		if(err) {
			cb(err, messages.LD_PUBLICATION_UPDATE_FAIL);
		} else {
			cb();
		}
	});
};

module.exports = {

	LD_PUBLIC_INDICATOR: 1,
	LD_PRIVATE_INDICATOR: 0,

	// callback(err, message)
	updateLdName: function(ldName, ldId, callback) {
		LdEditDao.updateLdName(ldName, ldId, function(err, result) {
			if(err) {
				callback(err, messages.LD_NAME_UPDATE_FAIL);
			} else {
				callback();
			}
		});
	},

	// callback(err, message)
	updateLdScope: function(scope, ldId, callback) {
		ScopeService.getScopeId(scope, function(err, scopeId) {
			if(err) {
				callback(err, messages.LD_SCOPE_UPDATE_FAIL);
			} else {
				LdEditDao.updateLdScope(scopeId, ldId, function(err, result) {
					if(err) {
						callback(err, messages.LD_SCOPE_UPDATE_FAIL);
					} else {
						callback();
					}
				});
			}
		});
	},

	// callback(err, message)
	updateLdPublic: function(ldId, callback) {
		updateLdPublicationCommon(module.exports.LD_PUBLIC_INDICATOR, ldId, callback);
	},

	// callback(err, message)
	updateLdPrivate: function(ldId, callback) {
		updateLdPublicationCommon(module.exports.LD_PRIVATE_INDICATOR, ldId, callback);
	},

	// callback(err, message)
	updateStudentsDescr: function(studentsDescr, ldId, callback) {
		LdEditDao.updateLdStudentsDescr(studentsDescr, ldId, function(err, result) {
			if(err) {
				callback(err, messages.STUDENTS_DESCR_UPDATE_FAIL);
			} else {
				callback();
			}
		});
	},

	// callback(err, message)
	updateQcers: function(qcers, ldId, callback) {
		QcerService.attachQcers(ldId, qcers, function(err) {
			if (err) {
				callback(err, messages.QCER_UPDATE_FAIL)
			} else {
				callback();
			}
		});
	},

	// callback()
	addTopic: function(topic, ldId, callback) {
		TopicService.insertTopics(ldId, [topic], function() {
			callback();
		});
	},

	// callback()
	addObjective: function(objective, ldId, callback) {
		ObjectiveService.insertObjectives(ldId, [objective], function() {
			callback();
		});
	}
};