var mysql = require('mysql')
  , dao = require('./Dao');

var GET_LEARNING_DESIGNS = 'SELECT ld_id, ld_name, ld_scope, ld_publication, ld_students_profile, ld_creation_date, ld_last_edit_date, user_name, user_last_name from vw_ld_user';
var GET_LEARNING_DESIGN = GET_LEARNING_DESIGNS + ' where ld_id = ?';

var GET_LEARNING_DESIGN_SUBJECTS = 'select ld_id, ld_name, subject_id, subject_name from vw_ld_subject where ld_id = ?';

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
  },

  getLearningDesignSubjects: function(ldid, callback) {
    dao.findAll(GET_LEARNING_DESIGN_SUBJECTS, [ldid], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }

};