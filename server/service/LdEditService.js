var LdEditDao = require('../dao/LdEditDao');
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