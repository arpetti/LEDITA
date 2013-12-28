var mysql = require('mysql');
var dao = require('./Dao');

var UPDATE_FIRST_NAME = 'update user set name = ? where id = ?';
var UPDATE_LAST_NAME = 'update user set last_name = ? where id = ?';
var UPDATE_EMAIL = 'update user set email = ? where id = ?';

module.exports = {

	updateFirstName: function(userId, firstName, callback) {
		dao.insertOrUpdateRecord(UPDATE_FIRST_NAME, [firstName, userId], function(err, result) {
			dao.handleResult(callback, err, result);
		})
	},

	updateLastName: function(userId, lastName, callback) {
		dao.insertOrUpdateRecord(UPDATE_LAST_NAME, [lastName, userId], function(err, result) {
			dao.handleResult(callback, err, result);
		})
	},

	updateEmail: function(userId, email, callback) {
		dao.insertOrUpdateRecord(UPDATE_EMAIL, [email, userId], function(err, result) {
			dao.handleResult(callback, err, result);
		})
	}	

}