var mysql = require('mysql')
var dao = require('./Dao.js');

var GET_COMPOSES_COUNT = 'select count(id) as count_id from composes where ld_id = ? and activity_id = ?';

module.exports = {

	getComposesCount: function(ldId, activityId, callback) {
		dao.findAll(GET_COMPOSES_COUNT, [ldId, activityId], function(err, result) {
			dao.handleResult(callback, err, result);
		});
	}

};