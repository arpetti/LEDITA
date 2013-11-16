var moveNodeParser = require('./MoveNodeParser');
var _ =  require('underscore');

var findComposesRecord = function(source, composesRecords) {
	var activityTypes = {
	    ACTIVITY: "activity_id",
	    LD: "ld_part_id",
	    ACTIVITY_GROUP: "activity_group_id"
	};
	var idType = activityTypes[source.nodeType];
	var criteria = {};
	criteria[idType] = source.nodeId;
	criteria.level= source.level;
	criteria.position = source.position;

	var results = _.where(composesRecords, criteria);
	if(results && results.length > 0) {
		return results[0];
	} else {
		return null;
	}
};

var moveMaxLevel = function(sourceComposesId, composesRecords, target) {
	var maxLevelRecord = _.max(composesRecords, function(rec){return rec.level;});
	var composesRecordsById = _.indexBy(composesRecords, function(rec){return rec.id;});
	var composesRecordToModify = composesRecordsById[sourceComposesId];
	composesRecordToModify.level = maxLevelRecord.level + 1;
	return _.values(composesRecordsById);
};

// TODO: Implement
var moveMaxPosition = function(sourceComposesId, composesRecords, target) {
	return composesRecords;
};

// TODO: Implement
var moveLevel = function(sourceComposesId, composesRecords, target) {
	return composesRecords;
};

// TODO: Implement
var moveLevelPosition = function(sourceComposesId, composesRecords, target) {
	return composesRecords;
};

var moveTypeFuncMap = {
	level: moveLevel,
	levelPosition: moveLevelPosition,
	maxLevel: moveMaxLevel,
	maxPosition: moveMaxPosition
};

module.exports = {

	moveNode: function(sourceId, targetId, composesRecords) {
		var source = moveNodeParser.parseSourceId(sourceId);
		var target = moveNodeParser.parseTargetId(targetId);
		var sourceComposesRecord = findComposesRecord(source, composesRecords);
		var moveFunc = moveTypeFuncMap[target.moveType];
		var modifiedComposesRecords = moveFunc.apply(null, [sourceComposesRecord.id, composesRecords, target]);
		// TODO fill holes
		return modifiedComposesRecords;
	}
	
};