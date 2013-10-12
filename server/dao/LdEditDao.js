var mysql = require('mysql')
var dao = require('./Dao.js');

var UPDATE_LD = 'UPDATE ld SET name = ?, last_edit_date = ? WHERE id = ?';

module.exports = {

	updateLdName: function(ldName, ldId, callback) {
		var ldData = [ldName, new Date(), ldId];
		dao.insertRecord(UPDATE_LD, ldData, function(err, result) {
			if(err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	},

};