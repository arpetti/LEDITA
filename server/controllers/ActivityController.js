var ActivityService = require('../service/ActivityService');
var logger = require('../util/LogWrapper');
var ActivityCreateService = require('../service/ActivityCreateService');

module.exports = {

	getLDNodes: function(req, res) {
		var ldid = req.params.id;
		ActivityService.getEnrichedLDActivityStructure(ldid, function(err, result, message) {
			if (err) {
				return res.send(500, message);
			}
			if (!result) {
				return res.send(404, message);
			} else {
				res.json(200, result);
			}
		});
	},

	createActivity: function(req, res) {
		var ldId = req.params.id;
		var activityData = req.body;
		// TODO: #34 Call validator first
		ActivityCreateService.createActivity(ldId, activityData, function(err, successInfo, message) {
			if (err) {
				res.send(400, message);
			} else {
				res.json(200, {});
			}
		});
	}

}