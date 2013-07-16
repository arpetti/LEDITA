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
    
    //TODO: Also support array of queryParams
    findAll: function(queryString, queryParams, callback) {
		var results = [];
      	pool.getConnection(function(err, connection) {
      	if (err) {
          console.log('db connection error', err);
			    callback(err);
          return;
        }
        connection.query(queryString, queryParams, function(err, rows) {
			if (err) {
				console.log('db query error', err);
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
  	}

};