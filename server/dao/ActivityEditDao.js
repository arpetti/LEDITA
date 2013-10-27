var mysql = require('mysql')
var dao = require('./Dao.js');

var FIND_COMPOSES_ACTIVITY = 'SELECT id FROM composes WHERE ld_id = ? and activity_id = ? and level = ? and position = ?';

// TODO: Same method in LdEditDao, refactor to Dao.js to make it common
var handleResult = function(cb, err, result) {
	if(err) {
		cb(err);
	} else {
		cb(null, result);
	}
};

module.exports = {

	findComposesActivity: function(criteria, callback) {
		dao.findAll(FIND_COMPOSES_ACTIVITY, criteria, function(err, result) {
			handleResult(callback, err, result);
		});
	}

}