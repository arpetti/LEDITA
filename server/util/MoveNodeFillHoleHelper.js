var _ =  require('underscore');

// wip...
var fillPositionHolesMapFunc = function(nodesInALevel, key) {
	result = ['a', 'b', 'c'];
	return result;
};

module.exports = {

	fillHoles: function(composesRecords) {
		var sortedByLevel = _.sortBy(composesRecords, function(rec) {return rec.level;} );
		var recordsWithLevelHolesFilled = this.fillLevelHoles(sortedByLevel);
		
		//TODO fillPositionHoles
		// this.fillPositionHoles(recordsWithLevelHolesFilled);

		return recordsWithLevelHolesFilled;
	},

	// wip...
	fillPositionHoles: function(recordsWithLevelHolesFilled) {
		var byLevel = _.groupBy(recordsWithLevelHolesFilled, function(rec) {return rec.level;});
		console.log('byLevel: ' + JSON.stringify(byLevel));
		var processed = _.map(byLevel, fillPositionHoles);
		console.log('processed: ' + JSON.stringify(processed));
	},

	fillLevelHoles: function(recordsSortedByLevel) {
		var byLevel = _.groupBy(recordsSortedByLevel, function(rec) {return rec.level;});
		var levels = _.keys(byLevel);
		
		_.each(byLevel, function(records, level) {
			var indexPlusOne = _.indexOf(levels, level) + 1;
			_.each(records, function(rec) {
				rec.level = indexPlusOne;
			});
		});
		return _.flatten(_.values(byLevel));
	}

};