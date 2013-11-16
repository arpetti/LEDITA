
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

var parseDragSource = function(id) {
	var data = id.split('-');
	return new DragSource(data);
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

	parseSourceTargetIds: function(sourceId, targetId) {
		var dragSource = parseDragSource(sourceId);
		var moveType = targetId.split('-')[0];
		var targetParseFunc = moveTypeParser[moveType];
		var dropTarget = targetParseFunc.apply(null, [targetId]);
		return {
			source: dragSource,
			target: dropTarget
		};
	}
};