var configHelper = require('../util/ConfigHelper');
var logWrapper = require('../util/LogWrapper');
var config = configHelper.config();
var mysql = require('mysql');

var pool = mysql.createPool({
	host: config.db_host,
	user: config.db_user,
	password: config.db_pswd,
	database: config.db_schema,
	connectionLimit: config.db_pool_connection_limit,
	debug: config.db_debug_sql,
	multipleStatements: true
});

module.exports = {

	findAll: function(queryString, queryParams, callback) {
		var results = [];
		pool.getConnection(function(err, connection) {
			if (err) {
				logWrapper.log().error('db connection error', err);
				callback(err);
				return;
			}
			connection.query(queryString, queryParams, function(err, rows) {
				if (err) {
					logWrapper.log().error('db query error', err);
					connection.release();
					callback(err);
					return;
				}
				for (var i = 0; i < rows.length; i++) {
					results.push(rows[i]);
				}
				connection.release();
				callback(null, results);
			});
		});
	},

	insertOrUpdateRecord: function(queryString, jsonData, callback) {
		var insertedRowId;
		pool.getConnection(function(err, connection) {
			if (err) {
				logWrapper.log().error('db connection error', err);
				callback(err);
				return;
			}
			connection.query(queryString, jsonData, function(err, result) {
				if (err) {
					logWrapper.log().error('db insert or update error', err);
					connection.release();
					callback(err);
					return;
				}
				connection.release();
				callback(null, result.insertId);
			});
		});
	},

	insertRecordWithCreationDate: function(queryString, jsonData, callback) {
		jsonData.creation_date = new Date();
		module.exports.insertOrUpdateRecord(queryString, jsonData, callback);
	},

	bulkInsert: function(queryString, values, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				logWrapper.log().error('db connection error', err);
				callback(err);
				return;
			}
			connection.query(queryString, [values], function(err, result) {
				if (err) {
					logWrapper.log().error('db bulk insert error', err);
					connection.release();
					callback(err);
					return;
				}
				connection.release();
				callback(null, result);
			});
		});
	},

	multiStatement: function(concatenatedQueries, values, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				logWrapper.log().error('db connection error', err);
				callback(err);
				return;
			}
			connection.query(concatenatedQueries, values, function(err, result) {
				if (err) {
					logWrapper.log().error('db multiple statement error', err);
					connection.release();
					callback(err);
					return;
				}
				connection.release();
				callback(null, result);
			});
		});
	},

	deleteRecord: function(queryString, jsonData, callback) {
		pool.getConnection(function(err, connection) {
			if (err) {
				logWrapper.log().error('db connection error', err);
				callback(err);
				return;
			}
			connection.query(queryString, jsonData, function(err, result) {
				if (err) {
					logWrapper.log().error('db delete error', err);
					connection.release();
					callback(err);
					return;
				}
				connection.release();
				callback(null, null);
			});
		});
	},

	handleResult: function(cb, err, result) {
		if (err) {
			cb(err);
		} else {
			cb(null, result);
		}
	}

};