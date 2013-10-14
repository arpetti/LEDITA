var mysql = require('mysql')
var dao = require('./Dao.js');

var UPDATE_LD_COMMON = ', last_edit_date = ? WHERE id = ?';

var UPDATE_LD_NAME = 'UPDATE ld SET name = ?' + UPDATE_LD_COMMON;
var UPDATE_LD_SCOPE = 'UPDATE ld SET scope_id = ?' + UPDATE_LD_COMMON;
var UPDATE_LD_PUBLICATION = 'UPDATE ld SET publication = ?' + UPDATE_LD_COMMON;
var UPDATE_STUDENTS_DESCR = 'UPDATE ld set students_profile = ?' + UPDATE_LD_COMMON;

var buildLdData = function(item, ldId) {
	return [item, new Date(), ldId];
};

module.exports = {

	updateLdName: function(ldName, ldId, callback) {
		dao.insertOrUpdateRecord(UPDATE_LD_NAME, buildLdData(ldName, ldId), function(err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	updateLdScope: function(scopeId, ldId, callback) {
		dao.insertOrUpdateRecord(UPDATE_LD_SCOPE, buildLdData(scopeId, ldId), function(err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	updateLdPublication: function(publication, ldId, callback) {
		dao.insertOrUpdateRecord(UPDATE_LD_PUBLICATION, buildLdData(publication, ldId), function(err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	updateLdStudentsDescr: function(ldStudentsDescr, ldId, callback) {
		dao.insertOrUpdateRecord(UPDATE_STUDENTS_DESCR, buildLdData(ldStudentsDescr, ldId), function(err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	}

};