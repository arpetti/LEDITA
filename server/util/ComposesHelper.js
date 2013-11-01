var _ = require('underscore');

var activityTypes = {
    ACTIVITY: "activity_id",
    LD: "ld_id",
    ACTIVITY_GROUP: "activity_group_id"
};

module.exports = {

	getComposesRecord: function(composesRecords, nodeId, nodeType, level, position) {
		var idType = activityTypes[nodeType];
		var criteria = {};
		criteria[idType] = nodeId;
		criteria.level= level;
		criteria.position = position;

		var results = _.where(composesRecords, criteria);
		return results[0];
	}
};