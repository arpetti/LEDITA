var moveNodeParser = require('../util/MoveNodeParser');
var composesDao = require('../dao/ComposesDao');
var _ = require('underscore');
var messages = require('./ValidationMessages');

var MAX_POSITION = 4;

var validateMaxPosition = function(source, target, composesRecords) {
	var recordsAtTargetLevel = _.where(composesRecords, {level: target.level});
	var maxPositionAtLevelRecord = _.max(recordsAtTargetLevel, function(rec) { return rec.position; } );
	if (maxPositionAtLevelRecord.position >= MAX_POSITION) {
		return messages.INVALID_MOVE_MAX_POSITION;
	} else {
		return null;
	}
}

var validateLevelPosition = function(source, target, composesRecords) {
	
	// Is this level already full?
	var maxPosErrMsg = validateMaxPosition(source, target, composesRecords);
	if (maxPosErrMsg) {
		return maxPosErrMsg;
	}
	
	// is target immediately to the left of source?
	if (source.level === target.level && target.position === source.position) {
		return messages.INVALID_MOVE_LEVEL_POSITION_LEFT;
	}

	// is target immediately to the right of source?
	if (source.level === target.level && target.position === source.position + 1) {
		return messages.INVALID_MOVE_LEVEL_POSITION_RIGHT;
	}

	return null;
}

// TODO: Implement
var validateLevel = function(source, target, composesRecords) {
	return null;
}

// TODO: Implement
var validateMaxLevel = function(source, target, composesRecords) {
	return null;
}

var moveTypeValFuncMap = {
	level: validateLevel,
	levelPosition: validateLevelPosition,
	maxLevel: validateMaxLevel,
	maxPosition: validateMaxPosition
};

module.exports = {

	// callback(errorMessage)
	validateNodeToNode: function(ldId, sourceId, targetId, callback) {
		var source;
		var target;
		var errorMessage;
		var valFunc;

		composesDao.findAllComposes([ldId], function(err, composesRecords) {
			if (!err && composesRecords && composesRecords.length > 0) {
				source = moveNodeParser.parseSourceId(sourceId);
				target = moveNodeParser.parseTargetId(targetId);
				valFunc = moveTypeValFuncMap[target.moveType];
				errorMessage = valFunc.apply(null, [source, target, composesRecords]);
				callback(errorMessage);
			} else {
				callback(null);
			}
		});
	}
}; 