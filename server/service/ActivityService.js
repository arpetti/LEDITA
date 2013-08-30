var ActivityDao = require('../dao/ActivityDao');
var messages = require('./ValidationMessages');
var _ = require('underscore');

_.groupByMulti = function (obj, values, context) {
    if (!values.length)
        return obj;
    var byFirst = _.groupBy(obj, values[0], context),
        rest = values.slice(1);
    for (var prop in byFirst) {
        byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
    }
    return byFirst;
};

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
				// Group results by activity_group_id, then level
				var testMultiGroup = _.groupByMulti(results, ['activity_group_id', 'level']);

				// temp debug
				var allTogether = [byLevel, testMultiGroup];
				callback(null, allTogether, null);
			});
		});
	}

};