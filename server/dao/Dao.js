var configHelper = require('../../config/configHelper');
var config = configHelper.config();
var mysql = require('mysql');

var pool  = mysql.createPool({
  host     : config.db_host,
  user     : config.db_user,
  password : config.db_pswd,
  database : config.db_schema,
  connectionLimit : config.db_pool_connection_limit
});

module.exports = {
    getConnectionPool: function() {
       return pool;
    }
};