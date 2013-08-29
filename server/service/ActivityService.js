var ActivityDao = require('../dao/ActivityDao');
var messages = require('./ValidationMessages');
var _ = require('underscore');

module.exports = {

	// callback(err, result, message)
	getLDActivityStructure: function(ldid, callback) {

		ActivityDao.getLdActivities(ldid, function(err, results) {
			if (err) {
				callback(err, null, {message: messages.UNABLE_TO_RETRIEVE_ACTIVITIES});
				return;
			}
			if (results.length === 0) {
				callback(null, null, {message: messages.NO_ACTIVITIES_FOUND});
				return;
			}
			var byLevel = _.groupBy(results, function(result){ return result.level; });
			callback(null, byLevel, null);
		});
	}

};