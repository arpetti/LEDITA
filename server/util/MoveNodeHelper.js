var moveNodeParser = require('./MoveNodeParser');
var moveNodeFillHoleHelper = require('./MoveNodeFillHoleHelper');
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

var moveMaxPosition = function(sourceComposesId, composesRecords, target) {
	var recordsAtTargetLevel = _.where(composesRecords, {level: target.level});
	var maxPositionAtLevelRecord = _.max(recordsAtTargetLevel, function(rec) { return rec.position; } );
	
	var composesRecordsById = _.indexBy(composesRecords, function(rec){return rec.id;});
	var composesRecordToModify = composesRecordsById[sourceComposesId];

	composesRecordToModify.level = target.level;
	composesRecordToModify.position = maxPositionAtLevelRecord.position + 1;
	return _.values(composesRecordsById);
};

var moveLevel = function(sourceComposesId, composesRecords, target) {
	var results = [];
	var composesRecordsById = _.indexBy(composesRecords, function(rec){return rec.id;});
	
	var composesRecordToModify = composesRecordsById[sourceComposesId];
	composesRecordToModify.level = target.level;

	var recordsToIncrementLevel = _.filter(composesRecords, function(rec) { 
		return (rec.level >= target.level) && (rec.id !== sourceComposesId); 
	});

	var recordsNotToIncrementLevel = _.filter(composesRecords, function(rec) { 
		return (rec.level < target.level) && (rec.id !== sourceComposesId); 
	});

	var recordsWithLevelIncremented = _.map(recordsToIncrementLevel, function(rec){ 
		var newRec = _.clone(rec); 
		newRec.level = rec.level + 1; 
		return newRec;
	});

	results.push(composesRecordToModify, recordsNotToIncrementLevel, recordsWithLevelIncremented)
	return _.flatten(results);
}

var moveLevelPosition = function(sourceComposesId, composesRecords, target) {
	var results = [];
	var composesRecordsById = _.indexBy(composesRecords, function(rec){return rec.id;});

	var composesRecordToModify = composesRecordsById[sourceComposesId];
	composesRecordToModify.level = target.level;
	composesRecordToModify.position = target.position;

	var recordsToIncrementPosition = _.filter(composesRecords, function(rec) {
		return (rec.level === target.level) && (rec.position >= target.position) && (rec.id !== sourceComposesId);
	});

	var recordsNotToIncrementPosition = _.filter(composesRecords, function(rec) {
		return ((rec.level !== target.level) || (rec.position < target.position)) && (rec.id !== sourceComposesId);
	});

	var recordsWithPositionIncremented = _.map(recordsToIncrementPosition, function(rec){ 
		var newRec = _.clone(rec); 
		newRec.position = rec.level + 1; 
		return newRec;
	});

	results.push(composesRecordToModify, recordsNotToIncrementPosition, recordsWithPositionIncremented)
	return _.flatten(results);
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
		// FIXME: if sourceComposesRecord not found, LOG an ERROR and return unmodified composesRecords
		var moveFunc = moveTypeFuncMap[target.moveType];
		var modifiedComposesRecords = moveFunc.apply(null, [sourceComposesRecord.id, composesRecords, target]);
		var recordsWithHolesFilled = moveNodeFillHoleHelper.fillHoles(modifiedComposesRecords);
		return recordsWithHolesFilled;
	}
	
};