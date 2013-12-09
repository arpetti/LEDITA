var mysql = require('mysql')
var dao = require('./Dao');

var INSERT_ACTIVITY = 'INSERT INTO activity SET ?';

var handleResult = function(cb, err, result) {
	if(err) {
		cb(err);
	} else {
		cb(null, result);
	}
};

module.exports = {

	insertActivity: function(activityObj, callback) {
		dao.insertOrUpdateRecord(INSERT_ACTIVITY, activityObj, function(err, activityId) {
			handleResult(callback, err, activityId);
		});
	}

};