var mysql = require('mysql')
var dao = require('./Dao.js');

var FIND_ALL_COMPOSES = 'SELECT id, ld_id, activity_id, ld_part_id, activity_group_id, level, position FROM composes where ld_id = ? ORDER BY level, position';

var FIND_COMPOSES_ACTIVITY = 'SELECT id FROM composes WHERE ld_id = ? and activity_id = ? and level = ? and position = ?';
var FIND_COMPOSES_LD = 'SELECT id FROM composes WHERE ld_id = ? and ld_part_id = ? and level = ? and position = ?';
var FIND_COMPOSES_GROUP = 'SELECT id FROM composes WHERE ld_id = ? and activity_group_id = ? and level = ? and position = ?';

var UPDATE_COMPOSES = 'UPDATE composes set level = ?, position = ? WHERE id = ?';

// TODO: Same method in LdEditDao, refactor to Dao.js to make it common
var handleResult = function(cb, err, result) {
	if(err) {
		cb(err);
	} else {
		cb(null, result);
	}
};

module.exports = {

	findAllComposes: function(criteria, callback) {
		dao.findAll(FIND_ALL_COMPOSES, criteria, function(err, result) {
			handleResult(callback, err, result);
		});
	},

	findComposesActivity: function(criteria, callback) {
		dao.findAll(FIND_COMPOSES_ACTIVITY, criteria, function(err, result) {
			handleResult(callback, err, result);
		});
	},

	findComposesLd: function(criteria, callback) {
		dao.findAll(FIND_COMPOSES_LD, criteria, function(err, result) {
			handleResult(callback, err, result);
		});
	},

	findComposesGroup: function(criteria, callback) {
		dao.findAll(FIND_COMPOSES_GROUP, criteria, function(err, result) {
			handleResult(callback, err, result);
		});
	},

	updateComposes: function(criteria, callback) {
		dao.insertOrUpdateRecord(UPDATE_COMPOSES, criteria, function(err, result) {
			handleResult(callback, err, result);
		});
	}

}