var _ = require('underscore');

var getNodesInPathTop = function(composesRecords, startLevel, startPosition) {
	var criteria = {position: startPosition};
	var posResults = _.where(composesRecords, criteria);
	var filterFunc = function(node) {return node.level >= startLevel;};
	return _.filter(_.where(composesRecords, criteria), filterFunc);
};

var getNodesInPathBottom =  function(composesRecords, startLevel, startPosition) {
	var criteria = {position: startPosition};
	var posResults = _.where(composesRecords, criteria);
	var filterFunc = function(node) {return node.level <= startLevel;};
	return _.filter(_.where(composesRecords, criteria), filterFunc);
};

var getNodesInPathLeft = function(composesRecords, startLevel, startPosition) {
	var criteria = {level: startLevel};
	var levelResults = _.where(composesRecords, criteria);
	var filterFunc = function(node) {return node.position >= startPosition;};
	return _.filter(_.where(composesRecords, criteria), filterFunc);
};

var getNodesInPathRight =  function(composesRecords, startLevel, startPosition) {
	var criteria = {level: startLevel};
	var levelResults = _.where(composesRecords, criteria);
	var filterFunc = function(node) {return node.position <= startPosition;};
	return _.filter(_.where(composesRecords, criteria), filterFunc);
};

var cloneNode = function(node) {
	return JSON.parse(JSON.stringify(node));
};

var incrementLevel = function(node) {var newNode = cloneNode(node); newNode.level = node.level + 1; return newNode;};
var decrementLevel = function(node) {var newNode = cloneNode(node); newNode.level = node.level - 1; return newNode;};
var incrementPosition = function(node) {var newNode = cloneNode(node); newNode.position = node.position + 1; return newNode;};
var decrementPosition = function(node) {var newNode = cloneNode(node); newNode.position = node.position - 1; return newNode;};

var moveTypes = {
	top: {pathFunc: getNodesInPathTop, moveFunc: incrementLevel},
	bottom: {pathFunc: getNodesInPathBottom, moveFunc: decrementLevel},
	left: {pathFunc: getNodesInPathLeft, moveFunc: incrementPosition},
	right: {pathFunc: getNodesInPathRight, moveFunc: decrementPosition}
};

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
		var findFunc = moveTypes[move].pathFunc;
		var nodesInPath = findFunc.apply(null, [composesRecords, startLevel, startPosition]);
		return _.reject(nodesInPath, function(node){return node.id === filterComposesId;});
	},

	moveNodes: function(move, nodes) {
		return _.map(nodes, moveTypes[move].moveFunc);
	}
};