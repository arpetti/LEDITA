var mysql = require('mysql')
  , dao = require('./ConnectPool.js');

module.exports = {

	getLearningDesigns: function(callback) {
      var learningDesigns = [];
      dao.getConnectionPool().getConnection(function(err, connection) {
        connection.query('SELECT id, name, scope from ld', function(err, rows) {
          if (err) { throw err; }
          for (var i = 0; i < rows.length; i++) {            
            learningDesigns.push(rows[i]);
          }
          connection.end();
          callback(null, learningDesigns);
		    });
      });
      
  }

};