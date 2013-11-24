var moveNodeParser = require('../util/MoveNodeParser');
var composesDao = require('../dao/ComposesDao');
var _ = require('underscore');
var messages = require('./ValidationMessages');

var MAX_POSITION = 4;

var validateMaxPosition = function(source, target, composesRecords) {
	var recordsAtTargetLevel = _.where(composesRecords, {level: target.level});
	var maxPositionAtLevelRecord = _.max(recordsAtTargetLevel, function(rec) { return rec.position; } );
	if (maxPositionAtLevelRecord.position >= MAX_POSITION) {
		return messages.INVALID_LEVEL_POSITION_MOVE;
	} else {
		return null;
	}
}

var validateLevelPosition = function(source, target, composesRecords) {
	return null;
}

var moveTypeValFuncMap = {
	level: null,
	levelPosition: validateLevelPosition,
	maxLevel: null,
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