var mysql = require('mysql')
var dao = require('./Dao.js');

var CREATE_LD = 'INSERT INTO ld SET ?';
var DELETE_USER = 'DELETE FROM ld WHERE ?';

var BULK_INSERT_CLASSIFICATES = "INSERT INTO classificates (qcer_id, ld_id) VALUES ?";
var BULK_INSERT_CONCERNS = "INSERT INTO concerns (subject_id, ld_id) VALUES ?";
var BULK_INSERT_SUBJECTS = "INSERT INTO subject (name) VALUES ?";

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
	},

	insertConcerns: function(concerns, callback) {
		dao.bulkInsert(BULK_INSERT_CONCERNS, concerns, function(err, result) {
			if (err) {
	        	callback(err);
	      	} else {
		    	callback(null, result);
	      	}
		});
	},

	insertSubjects: function(subjects, callback) {
		dao.bulkInsert(BULK_INSERT_SUBJECTS, subjects, function(err, result) {
			if (err) {
	        	callback(err);
	      	} else {
		    	callback(null, result);
	      	}
		});
	}

};