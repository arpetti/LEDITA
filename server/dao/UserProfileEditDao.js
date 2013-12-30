var mysql = require('mysql');
var dao = require('./Dao');

var UPDATE_FIRST_NAME = 'update user set name = ? where id = ?';
var UPDATE_LAST_NAME = 'update user set last_name = ? where id = ?';
var UPDATE_EMAIL = 'update user set email = ? where id = ?';
var UPDATE_WORKPLACE = 'update user set workplace = ? where id = ?';
var UPDATE_CITY = 'update user set city = ? where id = ?';
var UPDATE_COUNTRY = 'update user set country = ? where id = ?';

var updateProfile = function(userId, updateQuery, dataValue, callback) {
	dao.insertOrUpdateRecord(updateQuery, [dataValue, userId], function(err, result) {
		dao.handleResult(callback, err, result);
	});
};

module.exports = {

	updateFirstName: function(userId, firstName, callback) {
		updateProfile(userId, UPDATE_FIRST_NAME, firstName, callback);
	},

	updateLastName: function(userId, lastName, callback) {
		updateProfile(userId, UPDATE_LAST_NAME, lastName, callback);
	},

	updateEmail: function(userId, email, callback) {
		updateProfile(userId, UPDATE_EMAIL, email, callback);
	},

	updateWorkplace: function(userId, workplace, callback) {
		updateProfile(userId, UPDATE_WORKPLACE, workplace, callback);
	},

	updateCity: function(userId, city, callback) {
		updateProfile(userId, UPDATE_CITY, city, callback);
	},

	updateCountry: function(userId, country, callback) {
		updateProfile(userId, UPDATE_COUNTRY, country, callback);
	}	

}