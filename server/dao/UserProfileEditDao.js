var mysql = require('mysql');
var dao = require('./Dao');

var UPDATE_FIRST_NAME = 'update user set name = ? where id = ?';

module.exports = {

	updateFirstName: function(userId, firstName, callback) {
		dao.insertOrUpdateRecord(UPDATE_FIRST_NAME, [firstName, userId], function(err, result) {
			dao.handleResult(callback, err, result);
		})
	}	

}