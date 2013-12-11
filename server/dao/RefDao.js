var mysql = require('mysql')
var dao = require('./Dao');

var GET_QCERS = "select id, name from qcer order by name";
var GET_SCOPES_MATCHING = "select name from scope where name like ? order by name";
var GET_SUBJECTS_MATCHING = "select name from subject where name like ? order by name";
var GET_OBJECTIVES_MATCHING = "select descr from objective where descr like ? order by descr";
var GET_TECHNOLOGY_MATCHING	= 'select name from technology where name like ? order by name';

var FIND_SUBJECTS_BY_NAME = "select id, name from subject where name in (?)";
var FIND_OBJECTIVES_BY_NAME = "select id, descr from objective where descr in (?)";
var FIND_TECHNOLOGIES_BY_NAME = "select id, name from technology where name in (?)";
var FIND_SCOPE_BY_NAME = "select id, name from scope where ?";

var addWildCard = function(partial) {
	return '%' + partial + '%';
}

var handleMatchingResults = function(query, partial, cb) {
	dao.findAll(query, [addWildCard(partial)], function(err, results) {
		if (err) {
			cb(err);
		} else {
			cb(null, results);
		}
	});
};

var handleByNameResults = function(query, values, cb) {
	dao.findAll(query, values, function(err, results) {
    	if (err) {
			cb(err);
		} else {
			cb(null, results);
		}
    });
};

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
		handleMatchingResults(GET_SCOPES_MATCHING, partial, callback);
	},

	getSubjectsMatching: function(partial, callback) {
		handleMatchingResults(GET_SUBJECTS_MATCHING, partial, callback);
	},

	getObjectivesMatching: function(partial, callback) {
		handleMatchingResults(GET_OBJECTIVES_MATCHING, partial, callback);
	},

	getTechnologiesMatching: function(partial, callback) {
		handleMatchingResults(GET_TECHNOLOGY_MATCHING, partial, callback);
	},

	findSubjectsByName: function(subjectNames, callback) {
		handleByNameResults(FIND_SUBJECTS_BY_NAME, [subjectNames], callback);
	},

	findObjectivesByName: function(objectiveNames, callback) {
		handleByNameResults(FIND_OBJECTIVES_BY_NAME, [objectiveNames], callback);
	},

	findScopeByName: function(scopeName, callback) {
		handleByNameResults(FIND_SCOPE_BY_NAME, [scopeName], callback);
	},

	findTechnologiesByName: function(technologyName, callback) {
		handleByNameResults(FIND_TECHNOLOGIES_BY_NAME, [technologyName], callback);
	}

};