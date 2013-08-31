var mysql = require('mysql')
  , dao = require('./Dao');

var GET_LD_NODES = 'select ld_id, ld_name, level, position, node_id, node_name, type ' +
  'from vw_ld_node where ld_id = ? order by level, position';

var GET_ACTIVITY_GROUPS = 'select activity_group_id, activity_group_name, level, position, ' +
  'activity_id, activity_name from vw_activity_group where activity_group_id in (?)';

var GET_ACTIVITY_GROUPS_MAX_POSITION = 'select activity_group_id, max(position) as max_position ' +
  'from vw_activity_group group by activity_group_id having activity_group_id in (?)';  

module.exports = {

  getLdNodes: function(ldid, callback) {
    dao.findAll(GET_LD_NODES, [ldid], function(err, rows) {
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
  },

  getActivityGroupsMaxPosition: function(groupids, callback) {
    dao.findAll(GET_ACTIVITY_GROUPS_MAX_POSITION, [groupids], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }

}