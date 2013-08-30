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
		ActivityDao.getLdActivities(ldid, function(err, ldLevelResults) {
			if (err) {
				callback(err, null, {message: messages.UNABLE_TO_RETRIEVE_ACTIVITIES});
				return;
			}
			if (ldLevelResults.length === 0) {
				callback(null, null, {message: messages.NO_ACTIVITIES_FOUND});
				return;
			}
			
			// var byLevel = _.groupBy(ldLevelResults, function(result){ return result.level; });
			var activityGroupIds = _.pluck(_.where(ldLevelResults, {type: "ACTIVITY_GROUP"}), 'target_id');
			
			ActivityDao.getActivityGroups(activityGroupIds, function(err, activityGroupResults) {
				if (err) {
					callback(err, null, {message: messages.UNABLE_TO_RETRIEVE_ACTIVITIES});
					return;
				}
				if (activityGroupResults.length === 0) {
					callback(null, null, {message: messages.NO_ACTIVITIES_FOUND});
					return;
				}
				
				var testMultiGroup = _.groupByMulti(activityGroupResults, ['activity_group_id', 'level']);

				var enrichLdLevels = _.map(ldLevelResults, function(element) {
					if (element.type === 'ACTIVITY_GROUP') {
						element.children = testMultiGroup[element.target_id];
						return element;
					} else {
						return element;
					}
				});

				var groupEnrichedLdLevels = _.groupBy(enrichLdLevels, function(result){ return result.level; });
				callback(null, groupEnrichedLdLevels, null);
			});
		});
	}

};