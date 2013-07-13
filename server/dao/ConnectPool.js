var mysql = require('mysql');

// FIXME: Use environment variables from config, also configure pool size
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'ledita',
  password : 'web*app01',
  database : 'ledita-web-app'
});

module.exports = {
    getConnectionPool: function() {
       return pool;
    }
};