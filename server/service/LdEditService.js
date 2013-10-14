var LdEditDao = require('../dao/LdEditDao');
var ScopeService = require('./ScopeService');
var messages = require('../validate/ValidationMessages');

module.exports = {

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

	// TODO integration test
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
	updateStudentsDescr: function(studentsDescr, ldId, callback) {
		LdEditDao.updateLdStudentsDescr(studentsDescr, ldId, function(err, result) {
			if(err) {
				callback(err, messages.STUDENTS_DESCR_UPDATE_FAIL);
			} else {
				callback();
			}
		});
	}
};