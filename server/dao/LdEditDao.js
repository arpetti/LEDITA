var mysql = require('mysql')
var dao = require('./Dao.js');

var UPDATE_LD_COMMON = ', last_edit_date = ? WHERE id = ?';

var UPDATE_LD_NAME = 'UPDATE ld SET name = ?' + UPDATE_LD_COMMON;
var UPDATE_LD_SCOPE = 'UPDATE ld SET scope_id = ?' + UPDATE_LD_COMMON;
var UPDATE_LD_PUBLICATION = 'UPDATE ld SET publication = ?' + UPDATE_LD_COMMON;
var UPDATE_STUDENTS_DESCR = 'UPDATE ld set students_profile = ?' + UPDATE_LD_COMMON;

var DELETE_CLASSIFICATES = 'DELETE FROM classificates WHERE ld_id = ?';
var DELETE_CONCERN = 'DELETE FROM concerns WHERE ld_id = ? AND subject_id = ?';
var DELETE_AIM = 'DELETE FROM aims where ld_id = ? and objective_id = ?';

var buildLdData = function(item, ldId) {
	return [item, new Date(), ldId];
};

var handleResult = function(cb, err, result) {
	if(err) {
		cb(err);
	} else {
		cb(null, result);
	}
};

module.exports = {

	updateLdName: function(ldName, ldId, callback) {
		dao.insertOrUpdateRecord(UPDATE_LD_NAME, buildLdData(ldName, ldId), function(err, result) {
			handleResult(callback, err, result);
		});
	},

	updateLdScope: function(scopeId, ldId, callback) {
		dao.insertOrUpdateRecord(UPDATE_LD_SCOPE, buildLdData(scopeId, ldId), function(err, result) {
			handleResult(callback, err, result);
		});
	},

	updateLdPublication: function(publication, ldId, callback) {
		dao.insertOrUpdateRecord(UPDATE_LD_PUBLICATION, buildLdData(publication, ldId), function(err, result) {
			handleResult(callback, err, result);
		});
	},

	updateLdStudentsDescr: function(ldStudentsDescr, ldId, callback) {
		dao.insertOrUpdateRecord(UPDATE_STUDENTS_DESCR, buildLdData(ldStudentsDescr, ldId), function(err, result) {
			handleResult(callback, err, result);
		});
	},

	deleteClassificates: function(ldId, callback) {
		dao.deleteRecord(DELETE_CLASSIFICATES, [ldId], function(err, result) {
			handleResult(callback, err, result);
		});
	},

	deleteConcern: function(ldId, subjectId, callback) {
		dao.deleteRecord(DELETE_CONCERN, [ldId, subjectId], function(err, result) {
			handleResult(callback, err, result);
		});
	},

	deleteAim: function(ldId, objectiveId, callback) {
		dao.deleteRecord(DELETE_AIM, [ldId, objectiveId], function(err, result) {
			handleResult(callback, err, result);
		});
	}

};