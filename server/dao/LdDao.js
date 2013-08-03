var mysql = require('mysql')
  , dao = require('./Dao.js');

var GET_LEARNING_DESIGNS = 'SELECT ld_id, ld_name, ld_scope, ld_publication, user_name, user_last_name from vw_ld_user';
var GET_LEARNING_DESIGN = 'SELECT ld_id, ld_name, ld_scope, ld_publication, user_name, user_last_name from vw_ld_user where ld_id = ?';

module.exports = {

  getLearningDesigns: function(callback) {
    dao.findAll(GET_LEARNING_DESIGNS, [], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  getLearningDesign: function(id, callback) {
    dao.findAll(GET_LEARNING_DESIGN, [id], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }

};