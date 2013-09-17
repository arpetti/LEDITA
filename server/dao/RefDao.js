var mysql = require('mysql')
var dao = require('./Dao');

var GET_QCERS = 'select id, name from qcer order by name';
var GET_SUBJECTS_MATCHING = "select name from subject where name like ? order by name";

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