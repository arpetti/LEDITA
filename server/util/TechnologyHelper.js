var _ = require('underscore');

module.exports = {

	generateRelationshipRecords: function(existingTechnologies, activityId) {
		var technologyIds = _.pluck(existingTechnologies, 'id');	
		return _.map(technologyIds, function(technologyId){ return [technologyId, activityId]; });
	},

	extractNewTechnologies: function(technologyNames, existingTechnologies) {
		var existingTechnologyNames = _.pluck(existingTechnologies, 'name');
		return _.difference(technologyNames, existingTechnologyNames);
	}

};