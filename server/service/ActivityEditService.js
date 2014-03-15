var activityEditDao = require('../dao/ActivityEditDao');
var mysql = require('mysql');
var dao = require('../dao/Dao.js');
var messages = require('../validate/ValidationMessages');
var activityService = require('../service/ActivityService.js');

var DELETE_ACTIVITY = 'DELETE FROM composes WHERE ld_id = ? AND activity_id = ?';

module.exports = {
	
	doesActivityBelongToLD: function(ldId, activityId, callback) {
		activityEditDao.getComposesCount(ldId, activityId, function(err, result) {
			if(err || result[0].count_id !== 1){
				callback(false);
			} else {
				callback(true);
			}
		});
	},
//
    deleteActivity: function(ldId, activityId, callback){
        dao.deleteRecord(DELETE_ACTIVITY, [ldId, activityId], function(err, result){
            if(err){
                callback(err, null, messages.DELETE_ACTIVITY_FAIL);
            } else {
                activityService.getEnrichedLDActivityStructure(ldId, function(err, result, message) {
                    if(err) {
                        callback(err, null, message);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });

}}