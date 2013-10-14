var mysql = require('mysql')
var dao = require('./Dao.js');

var UPDATE_LD_NAME = 'UPDATE ld SET name = ?, last_edit_date = ? WHERE id = ?';
var UPDATE_LD_SCOPE = 'UPDATE ld SET scope_id = ?, last_edit_date = ? WHERE id = ?';
var UPDATE_STUDENTS_DESCR = 'UPDATE ld set students_profile = ?, last_edit_date = ? WHERE id = ?';

module.exports = {

	updateLdName: function(ldName, ldId, callback) {
		var ldData = [ldName, new Date(), ldId];
		dao.insertOrUpdateRecord(UPDATE_LD_NAME, ldData, function(err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	updateLdScope: function(scopeId, ldId, callback) {
		var ldData = [scopeId, new Date(), ldId];
		dao.insertOrUpdateRecord(UPDATE_LD_SCOPE, ldData, function(err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

	updateLdStudentsDescr: function(ldStudentsDescr, ldId, callback) {
		var ldData = [ldStudentsDescr, new Date(), ldId];
		dao.insertOrUpdateRecord(UPDATE_STUDENTS_DESCR, ldData, function(err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	}

};