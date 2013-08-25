var configHelper = require('../util/ConfigHelper');
var logWrapper = require('../util/LogWrapper');
var config = configHelper.config();
var mysql = require('mysql');

var pool = mysql.createPool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_pswd,
  database: config.db_schema,
  connectionLimit: config.db_pool_connection_limit
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
          callback(err);
          return;
        }
        for (var i = 0; i < rows.length; i++) {
          results.push(rows[i]);
        }
        connection.end();
        callback(null, results);
      });
    });
  },

  insertRecord: function(queryString, jsonData, callback) {
    var insertedRowId;
    pool.getConnection(function(err, connection) {
      if (err) {
        logWrapper.log().error('db connection error', err);
        callback(err);
        return;
      }
      connection.query(queryString, jsonData, function(err, result) {
        if (err) {
          logWrapper.log().error('db insert error', err);
          callback(err);
          return;
        }
        connection.end();
        callback(null, result.insertId);
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
          callback(err);
          return;
        }
        connection.end();
        callback(null, null);
      });
    });
  }

};