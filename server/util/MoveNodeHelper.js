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
		this.fillHoles(modifiedComposesRecords, sourceComposesRecord.id);
		return modifiedComposesRecords;
	},

	fillHoles: function(composesRecords) {
		var sortedByLevel = _.sortBy(composesRecords, function(rec){return rec.level;});
		this.fillLevelHoles(sortedByLevel);
		//TODO fillPositionHoles
	},

	fillLevelHoles: function(composesRecords) {
		var numRecords = composesRecords.length;
		var currentRecord;
		var nextRecord;
		var levelDiff;

		for(var i=0; i<numRecords; i++) {
			
			// First record must always have level = 1
			if(i === 0 && composesRecords[i].level !== 1) {
				composesRecords[i].level = 1;
			}
			
			// If diff between current record and next is > 1, reset next level (diff of 0 is ok)
			if ((i+1) < numRecords) {
				currentRecord = composesRecords[i];
				nextRecord = composesRecords[i+1];
				levelDiff = Math.abs(nextRecord.level - currentRecord.level);
				if (levelDiff > 1) {
					nextRecord.level = currentRecord.level + 1;
				}
			}
		}

	}
	
};