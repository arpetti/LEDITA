var ActivityDao = require('../dao/ActivityDao');
var messages = require('./ValidationMessages');
var _ = require('underscore');

module.exports = {

	// callback(err, result, message)
	getLDActivityStructure: function(ldid, callback) {
		ActivityDao.getLdActivities(ldid, function(err, results) {
			if (err) {
				callback(err, null, {message: messages.UNABLE_TO_RETRIEVE_ACTIVITIES});
				return;
			}
			if (results.length === 0) {
				callback(null, null, {message: messages.NO_ACTIVITIES_FOUND});
				return;
			}
			var byLevel = _.groupBy(results, function(result){ return result.level; });
			var activityGroupIds = _.pluck(_.where(results, {type: "ACTIVITY_GROUP"}), 'target_id');
			ActivityDao.getActivityGroups(activityGroupIds, function(err, results) {
				if (err) {
					callback(err, null, {message: messages.UNABLE_TO_RETRIEVE_ACTIVITIES});
					return;
				}
				if (results.length === 0) {
					callback(null, null, {message: messages.NO_ACTIVITIES_FOUND});
					return;
				}
				var byActivityGroupId = _.groupBy(results, function(result){ return result.activity_group_id; });
				
				var allTogether = [byLevel, byActivityGroupId];
				callback(null, allTogether, null);
			});
		});
	}

};