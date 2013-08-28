var mysql = require('mysql')
  , dao = require('./Dao');

var GET_LD_ACTIVITES = 'select source_id, source_name, level, position, target_id, target_name, type ' +
  'from vw_ld_activity where source_id = ? order by level, position';

var GET_ACTIVITY_GROUPS = 'select activity_group_id, activity_group_name, level, position, ' +
  'activity_id, activity_name from vw_activity_group where activity_group_id in (?)';

module.exports = {

  getLdActivities: function(ldid, callback) {
    dao.findAll(GET_LD_ACTIVITES, [ldid], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  getActivityGroups: function(groupids, callback) {
    dao.findAll(GET_ACTIVITY_GROUPS, [groupids], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }

}