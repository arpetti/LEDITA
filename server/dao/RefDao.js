var mysql = require('mysql')
var dao = require('./Dao');

var GET_QCERS = "select id, name from qcer order by name";
var GET_SCOPES_MATCHING = "select name from scope where name like ? order by name";
var GET_SUBJECTS_MATCHING = "select name from subject where name like ? order by name";
var GET_OBJECTIVES_MATCHING = "select descr from objective where descr like ? order by descr";

var FIND_SUBJECTS_BY_NAME = "select id, name from subject where name in (?)";
var FIND_OBJECTIVES_BY_NAME = "select id, descr from objective where descr in (?)";

var addWildCard = function(partial) {
	return '%' + partial + '%';
}

module.exports = {

	getQcers: function(callback) {
		dao.findAll(GET_QCERS, [], function(err, rows) {
			if (err) {
				callback(err);
				return;
			}
			callback(null, rows);
		});
	},

	getScopesMatching: function(partial, callback) {
		dao.findAll(GET_SCOPES_MATCHING, [addWildCard(partial)], function(err, results) {
			if (err) {
				callback(err);
			} else {
				callback(null, results);
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
	},

	getObjectivesMatching: function(partial, callback) {
		dao.findAll(GET_OBJECTIVES_MATCHING, [addWildCard(partial)], function(err, results) {
			if (err) {
				callback(err);
			} else {
				callback(null, results);
			}
		});
	},

	findSubjectsByName: function(subjectNames, callback) {
	    dao.findAll(FIND_SUBJECTS_BY_NAME, [subjectNames], function(err, results) {
	    	if (err) {
				callback(err);
			} else {
				callback(null, results);
			}
	    });
  	},

  	findObjectivesByName: function(objectiveNames, callback) {
	    dao.findAll(FIND_OBJECTIVES_BY_NAME, [objectiveNames], function(err, results) {
	    	if (err) {
				callback(err);
			} else {
				callback(null, results);
			}
	    });
  	}

};