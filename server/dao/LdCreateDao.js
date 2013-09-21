var mysql = require('mysql')
var dao = require('./Dao.js');

var CREATE_LD = 'INSERT INTO ld SET ?';
var DELETE_USER = 'DELETE FROM ld WHERE ?';

var BULK_INSERT_CLASSIFICATES = "INSERT INTO classificates (qcer_id, ld_id) VALUES ?";

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

	insertClassificates: function(classificates, callback) {
		dao.bulkInsert(BULK_INSERT_CLASSIFICATES, classificates, function(err, result) {
			if (err) {
	        	callback(err);
	      	} else {
		    	callback(null, result);
	      	}
		});
	}

};