var mysql = require('mysql')
var dao = require('./Dao.js');

var CREATE_LD = 'INSERT INTO ld SET ?';
var DELETE_USER = 'DELETE FROM ld WHERE ?';

var BULK_INSERT_CLASSIFICATES = "INSERT INTO classificates (qcer_id, ld_id) VALUES ?";
var BULK_INSERT_CONCERNS = "INSERT INTO concerns (subject_id, ld_id) VALUES ?";

var INSERT_SUBJECT = "INSERT INTO subject SET ?";
var INSERT_CONCERN = "INSERT INTO concerns SET ?";

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

	insertSubject: function(subjectData, callback) {
		dao.insertRecord(INSERT_SUBJECT, subjectData, function(err, subjectId) {
			if(err) {
				callback(err);
			} else {
				callback(null, subjectId);
			}
		});
	},
	
	insertConcern: function(concernData, callback) {
		dao.insertRecord(INSERT_CONCERN, concernData, function(err, id) {
			if(err) {
				callback(err);
			} else {
				callback(null, id);
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
	}

};