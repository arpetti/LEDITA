var configHelper = require('../../config/configHelper');
var config = configHelper.config();
var mysql = require('mysql');

// TODO: Also configure pool size
var pool  = mysql.createPool({
  host     : config.db_host,
  user     : config.db_user,
  password : config.db_pswd,
  database : config.db_schema
});

module.exports = {
    getConnectionPool: function() {
       return pool;
    }
};