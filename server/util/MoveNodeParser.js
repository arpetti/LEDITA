
var DragSource = function DragSource(data) {
	this.nodeId = parseInt(data[0]);
	this.nodeType = data[1];
	this.level = parseInt(data[2]);
	this.position = parseInt(data[3]);
};

var DropTarget = function DropTarget(moveType, level, position) {
	this.moveType = moveType;
	this.level = level ? parseInt(level) : null;
	this.position = position ? parseInt(position) : null;
};

var parseDropTargetLevel = function(id) {
	var data = id.split('-');
	return new DropTarget(data[0], data[1]);
};

var parseDropTargetLevePosition = function(id) {
	var data = id.split('-');
	return new DropTarget(data[0], data[1], data[2]);
};

var parseDropTargetMaxPosition = function(id) {
	var data = id.split('-');
	return new DropTarget(data[0], data[1]);
};

var parseDropTargetMaxLevel = function(id) {
	var data = id.split('-');
	return new DropTarget(data[0]);
};

var moveTypeParser = {
	level: parseDropTargetLevel,
	levelPosition: parseDropTargetLevePosition,
	maxPosition: parseDropTargetMaxPosition,
	maxLevel: parseDropTargetMaxLevel
};

module.exports = {

	parseTargetId: function(targetId) {
		var moveType = targetId.split('-')[0];
		var targetParseFunc = moveTypeParser[moveType];
		return targetParseFunc.apply(null, [targetId]);
	},

	parseSourceId: function(sourceId) {
		var data = sourceId.split('-');
		return new DragSource(data);
	}
};