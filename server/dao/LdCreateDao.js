var mysql = require('mysql')
var dao = require('./Dao.js');

var CREATE_LD = 'INSERT INTO ld SET ?';
var DELETE_USER = 'DELETE FROM ld WHERE ?';

var GET_SUBJECTS_MATCHING = "select name from subject where name like ?";

var addWildCard = function(partial) {
	return '%' + partial + '%';
}

module.exports = {

	createLd: function(ldData, callback) {
		dao.insertRecordWithCreationDate(CREATE_LD, ldData, function(err, ldid) {
			if(err) {
				callback(err);
			} else {
				callback(null, ldid);
			}
		});
	},

	deleteLd: function(userJsonData, callback) {
	    dao.deleteRecord(DELETE_USER, userJsonData, function(err, result) {
	    	if (err) {
	        	callback(err);
	      	} else {
		    	callback(null, null);
	      	}
	    });
	},

	getSubjectsMatching: function(partial, callback) {
		dao.findAll(GET_SUBJECTS_MATCHING, [addWildCard(partial)], function(err, results) {
			if (err) {
				callback(err);
			} else {
				callback(null, results);
			}
		});
	}

};