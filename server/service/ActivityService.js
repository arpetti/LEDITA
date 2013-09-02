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
		ActivityDao.getLdNodes(ldid, function(err, ldNodeResults) {
			if (err) {
				callback(err, null, messages.UNABLE_TO_RETRIEVE_LD_NODES);
				return;
			}
			if (ldNodeResults.length === 0) {
				callback(null, null, messages.NO_LD_NODES_FOUND);
				return;
			}
			
			var activityGroupIds = _.pluck(_.where(ldNodeResults, {type: "ACTIVITY_GROUP"}), 'node_id');
			if (activityGroupIds.length === 0) {
				callback(null, _.groupBy(ldNodeResults, function(result){ return result.level; }), null);
				return;
			}
			
			ActivityDao.getGroups(activityGroupIds, function(err, activityGroupResults) {
				if (err) {
					callback(err, null, messages.UNABLE_TO_RETRIEVE_ACTIVITIES);
					return;
				}
				if (activityGroupResults.length === 0) {
					callback(null, null, messages.NO_ACTIVITIES_FOUND);
					return;
				}
				
				var groupsById = _.groupBy(activityGroupResults, function(element){return element.group_id});
				var groupsByIdThenLevel = _.groupByMulti(activityGroupResults, ['group_id', 'level']);

				var enrichLdNodes = _.map(ldNodeResults, function(element) {
					if (element.type === 'ACTIVITY_GROUP') {
						if (groupsById[element.node_id]) {  // check for empty group
							element.max_position = groupsById[element.node_id][0].max_position;
						}
						element.children = groupsByIdThenLevel[element.node_id];
						return element;
					} else {
						return element;
					}
				});

				var ldNodesByLevel = _.groupBy(enrichLdNodes, function(result){ return result.level; });
				callback(null, ldNodesByLevel, null);
			});
		});
	}

};