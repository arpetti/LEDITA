var mysql = require('mysql')
  , dao = require('./Dao');

var GET_LD_NODES = 'select ld_id, ld_name, level, position, node_id, node_name, type, org_label ' +
  'from vw_ld_node where ld_id = ? order by level, position';

var GET_GROUPS = 'select group_id, group_name, level, position, ' +
  'group_child_id, group_child_name, max_position, group_child_type ' + 
  'from vw_group where group_id in (?) ' +
  'order by group_id, level, position';

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

  getGroups: function(groupids, callback) {
    dao.findAll(GET_GROUPS, [groupids], function(err, rows) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  }

}