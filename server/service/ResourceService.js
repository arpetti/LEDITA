var activityCreateDao = require('../dao/ActivityCreateDao');
var _ = require('underscore');
var logger = require('../util/LogWrapper');

module.exports = {

	generateResourceRecords: function(activityId, resources) {
		return _.map(resources, function(resource) {
			return [activityId, resource.name, resource.type, resource.descr, resource.link];
		});
	},

	addResources: function(activityId, resources, callback) {
		var resourceRecords = module.exports.generateResourceRecords(activityId, resources);
		activityCreateDao.bulkInsertResource(resourceRecords, function(err, results) {
			if(err) {
				logger.log().error('Failed to insert resources.', err);
			}
			callback(); // don't cb with error because this shouldn't halt the callers flow
		});
	}

}; 