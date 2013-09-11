var mysql = require('mysql')
  , dao = require('./Dao');

var GET_LEARNING_DESIGNS = 'SELECT ld_id, ld_name, ld_scope, ld_publication, ld_students_profile, ld_creation_date, ld_last_edit_date, user_name, user_last_name from vw_ld_user';
var GET_LEARNING_DESIGN = GET_LEARNING_DESIGNS + ' where ld_id = ?';

var GET_SUBJECTS = 'select subject_name from vw_ld_subject where ld_id = ?';
var GET_OBJECTIVES = 'select objective_descr from vw_ld_objective where ld_id = ?';
var GET_PREREQUISITES = 'select prereq_name, prereq_type from vw_ld_prerequisite where ld_id = ?';
var GET_LD_QCERS = 'select qcer_name from vw_ld_qcer where ld_id in (?) order by qcer_name';
var GET_LD_QCERS_WITH_LD_ID = 'select ld_id, qcer_name from vw_ld_qcer where ld_id in (?)';

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
    dao.findAll(GET_SUBJECTS, [ldid], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  getLearningDesignObjectives: function(ldid, callback) {
    dao.findAll(GET_OBJECTIVES, [ldid], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  getPrerequisites: function(ldid, callback) {
    dao.findAll(GET_PREREQUISITES, [ldid], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }, 

  getQcers: function(ldid, callback) {
    dao.findAll(GET_LD_QCERS, [ldid], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  getQcersWithLdId: function(ldid, callback) {
    dao.findAll(GET_LD_QCERS_WITH_LD_ID, [ldid], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }

};