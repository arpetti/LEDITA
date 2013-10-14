var mysql = require('mysql')
var dao = require('./Dao.js');

var CREATE_LD = 'INSERT INTO ld SET ?';
var DELETE_USER = 'DELETE FROM ld WHERE ?';

var BULK_INSERT_CLASSIFICATES = "INSERT INTO classificates (qcer_id, ld_id) VALUES ?";
var BULK_INSERT_CONCERNS = "INSERT INTO concerns (subject_id, ld_id) VALUES ?";
var BULK_INSERT_AIMS = "INSERT INTO aims (objective_id, ld_id) VALUES ?";
var BULK_INSERT_NEEDS = "INSERT INTO needs (objective_id, ld_id) VALUES ?";

var INSERT_SCOPE = "INSERT INTO scope SET ?";
var INSERT_SUBJECT = "INSERT INTO subject SET ?";
var INSERT_CONCERN = "INSERT INTO concerns SET ?";

var INSERT_OBJECTIVE = "INSERT INTO objective SET ?";
var INSERT_AIM = "INSERT INTO aims SET ?";
var INSERT_NEED = "INSERT INTO needs SET ?";

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

	insertAims: function(aims, callback) {
		dao.bulkInsert(BULK_INSERT_AIMS, aims, function(err, result) {
			if (err) {
	        	callback(err);
	      	} else {
		    	callback(null, result);
	      	}
		});
	},

	bulkInsertNeeds: function(aims, callback) {
		dao.bulkInsert(BULK_INSERT_NEEDS, aims, function(err, result) {
			if (err) {
	        	callback(err);
	      	} else {
		    	callback(null, result);
	      	}
		});
	},

	insertScope: function(scopeData, callback) {
		dao.insertOrUpdateRecord(INSERT_SCOPE, scopeData, function(err, scopeId) {
			if(err) {
				callback(err);
			} else {
				callback(null, scopeId);
			}
		});
	},

	insertSubject: function(subjectData, callback) {
		dao.insertOrUpdateRecord(INSERT_SUBJECT, subjectData, function(err, subjectId) {
			if(err) {
				callback(err);
			} else {
				callback(null, subjectId);
			}
		});
	},
	
	insertConcern: function(concernData, callback) {
		dao.insertOrUpdateRecord(INSERT_CONCERN, concernData, function(err, id) {
			if(err) {
				callback(err);
			} else {
				callback(null, id);
			}
		});
	},

	insertObjective: function(objectiveData, callback) {
		dao.insertOrUpdateRecord(INSERT_OBJECTIVE, objectiveData, function(err, objectiveId) {
			if(err) {
				callback(err);
			} else {
				callback(null, objectiveId);
			}
		});
	},
	
	insertAim: function(aimData, callback) {
		dao.insertOrUpdateRecord(INSERT_AIM, aimData, function(err, id) {
			if(err) {
				callback(err);
			} else {
				callback(null, id);
			}
		});
	},

	insertNeed: function(needData, callback) {
		dao.insertOrUpdateRecord(INSERT_NEED, needData, function(err, id) {
			if(err) {
				callback(err);
			} else {
				callback(null, id);
			}
		});
	}

};