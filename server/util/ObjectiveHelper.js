var _ = require('underscore');

module.exports = {

	generateRelationshipRecords: function(existingObjectives, ldId) {
		var objectiveIds = _.pluck(existingObjectives, 'id');	
		return _.map(objectiveIds, function(objectiveId){ return [objectiveId, ldId]; });
	},

	extractNewObjectives: function(objectiveNames, existingObjectives) {
		var existingObjectiveNames = _.pluck(existingObjectives, 'descr');
		return _.difference(objectiveNames, existingObjectiveNames);
	}

};