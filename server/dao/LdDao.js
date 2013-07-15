var mysql = require('mysql')
  , dao = require('./Dao.js');

var QUERY_GET_LEARNING_DESIGNS = 'SELECT ld_id, ld_name, ld_scope, ld_publication, user_name, user_last_name from vw_ld_user';

module.exports = {

	getLearningDesigns: function(callback) {
      var learningDesigns = [];
      dao.getConnectionPool().getConnection(function(err, connection) {
        if (err) {
          callback(err);
          return;
        }
        connection.query(QUERY_GET_LEARNING_DESIGNS, function(err, rows) {
          if (err) {
            callback(err);
            return;
          }
          for (var i = 0; i < rows.length; i++) {            
            learningDesigns.push(rows[i]);
          }
          connection.end();
          callback(null, learningDesigns);
		    });
      });
      
  }

};