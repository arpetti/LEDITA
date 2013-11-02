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

	getNodesInPath: function(move, composesRecords, startLevel, startPosition, filterComposesId) {
		var moveTypes = {
			top: module.exports.getNodesInPathTop,
			bottom: module.exports.getNodesInPathBottom,
			left: module.exports.getNodesInPathLeft,
			right: module.exports.getNodesInPathRight
		};
		var findFunc = moveTypes[move];
		var nodesInPath = findFunc.apply(null, [composesRecords, startLevel, startPosition]);
		return _.reject(nodesInPath, function(node){return node.id === filterComposesId;});
	},

	getNodesInPathTop: function(composesRecords, startLevel, startPosition) {
		var criteria = {position: startPosition};
		var posResults = _.where(composesRecords, criteria);
		var filterFunc = function(node) {return node.level >= startLevel;};
		var results = _.filter(_.where(composesRecords, criteria), filterFunc);
		return results;
	},

	getNodesInPathBottom: function(composesRecords, startLevel, startPosition) {
		var criteria = {position: startPosition};
		var posResults = _.where(composesRecords, criteria);
		var filterFunc = function(node) {return node.level <= startLevel;};
		var results = _.filter(_.where(composesRecords, criteria), filterFunc);
		return results;
	},

	getNodesInPathLeft: function(composesRecords, startLevel, startPosition) {
		var criteria = {level: startLevel};
		var levelResults = _.where(composesRecords, criteria);
		var filterFunc = function(node) {return node.position >= startPosition;};
		var results = _.filter(_.where(composesRecords, criteria), filterFunc);
		return results;
	},

	getNodesInPathRight: function(composesRecords, startLevel, startPosition) {
		var criteria = {level: startLevel};
		var levelResults = _.where(composesRecords, criteria);
		var filterFunc = function(node) {return node.position <= startPosition;};
		var results = _.filter(_.where(composesRecords, criteria), filterFunc);
		return results;
	},

	//var nodesMoved = ch.moveNodes(target.move, nodesToMove)
	moveNodes: function(move, nodes) {
		
	}
};