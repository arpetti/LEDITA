var ActivityService = require('../service/ActivityService');
var logger = require('../util/LogWrapper');

module.exports = {

	getLDNodes: function(req, res) {
		var ldid = req.params.id;
		ActivityService.getEnrichedLDActivityStructure(ldid, function(err, result, message) {
			if(err) {
                return res.send(500, message);
            }
            if (!result) {
                return res.send(404, message);
            } else {
            	res.json(200, result);
            }
		});
	},

	// #34 wip... 
	createActivity: function(req, res) {
		var ldId = req.params.id;
		var activityData = req.body;
		logger.log().info('Server Activity Controller: ldId = ' + ldId);
		logger.log().info('Server Activity Controller: activityData = ' + JSON.stringify(activityData));
		//ActivityCreateService.createActivity...
		res.json(200, {});
	}

};