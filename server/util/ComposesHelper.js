var _ = require('underscore');

module.exports = {

	getComposesRecord: function(composesRecords, nodeId, nodeType, level, position) {
		var activityTypes = {
		    ACTIVITY: "activity_id",
		    LD: "ld_part_id",
		    ACTIVITY_GROUP: "activity_group_id"
		};
		var idType = activityTypes[nodeType];
		var criteria = {};
		criteria[idType] = nodeId;
		criteria.level= level;
		criteria.position = position;

		var results = _.where(composesRecords, criteria);
		if(results && results.length > 0) {
			return results[0];
		} else {
			return null;
		}
	},

	getNodesInPath: function(move, composesRecords, startLevel, startPosition) {
		var moveTypes = {
			top: module.exports.getNodesInPathTop,
			bottom: module.exports.getNodesInPathBottom,
			left: module.exports.getNodesInPathLeft,
			right: module.exports.getNodesInPathRight
		};
		var findFunc = moveTypes[move];
		return findFunc.apply(null, [composesRecords, startLevel, startPosition]);
	},

	getNodesInPathTop: function(composesRecords, startLevel, startPosition) {
		var criteria = {position: startPosition};
		var posResults = _.where(composesRecords, criteria);
		var filterFunc = function(num) {
			return num.level >= startLevel;
		};
		var results = _.filter(_.where(composesRecords, criteria), filterFunc);
		return results;
	}
};