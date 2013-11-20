var _ =  require('underscore');

var processFillPositionHoles = function(nodesInALevel, key) {
	var byPosition = _.groupBy(nodesInALevel, function(rec) {return rec.position;});
	var positions = _.keys(byPosition);

	_.each(byPosition, function(records, position) {
		var indexPlusOne = _.indexOf(positions, position) + 1;
		_.each(records, function(rec) {
			rec.position = indexPlusOne;
		});
	});
	return _.flatten(_.values(byPosition));
};

module.exports = {

	fillHoles: function(composesRecords) {
		var sortedByLevel = _.sortBy(composesRecords, function(rec) {return rec.level;} );
		var recordsWithLevelHolesFilled = this.fillLevelHoles(sortedByLevel);
		return this.fillPositionHoles(recordsWithLevelHolesFilled);
	},

	fillPositionHoles: function(recordsWithLevelHolesFilled) {
		var byLevel = _.groupBy(recordsWithLevelHolesFilled, function(rec) {return rec.level;});
		var processed = _.map(byLevel, processFillPositionHoles);
		return _.flatten(processed);
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