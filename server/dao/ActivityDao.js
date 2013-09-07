var mysql = require('mysql');
var dao = require('./Dao');
var async = require('async');

var GET_LD_NODES = 'select ld_id, ld_name, level, position, node_id, node_name, scope, type, org_label, ' +
  'dur_min, dur_hh, dur_dd, dur_mon, pract_descr, edu_descr, modality ' + 
  'from vw_ld_node where ld_id = ? order by level, position';

var GET_GROUPS = 'select group_id, group_name, level, position, ' +
  'group_child_id, group_child_name, scope, max_position, group_child_type, org_label, ' + 
  'dur_min, dur_hh, dur_dd, dur_mon, pract_descr, edu_descr, modality ' + 
  'from vw_group where group_id in (?) ' +
  'order by group_id, level, position';

var GET_TECHNOLOGIES = 'select activity_id, activity_name, technology_id, technology_name ' +
  'from vw_activity_technology where activity_id in (?) ' +
  'order by activity_id, technology_name';

var GET_RESOURCES = 'select activity_id, activity_name, ' +
  'resource_id, resource_name, resource_descr, resource_copy, resource_link ' +
  'from vw_activity_resource where activity_id in (?)';

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
  },

  getActivityDetails: function(activityids, callback) {
    async.parallel({
      technology: function(callback) {
        dao.findAll(GET_TECHNOLOGIES, [activityids], function(err, rows) {
          if (err) 
            callback(err);
          else
            callback(null, rows);
        });
      },
      resource: function(callback) {
        dao.findAll(GET_RESOURCES, [activityids], function(err, rows) {
          if (err) 
            callback(err);
          else
            callback(null, rows);
        });
      }
    },
    function(err, results) {
      if (err) 
        callback(err);
      else
        callback(null, results);
    });  
  }

}