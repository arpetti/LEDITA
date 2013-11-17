var _ =  require('underscore');

module.exports = {

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