var logWrapper = require('../util/LogWrapper');

module.exports = {

	// #43 wip, verifying client to server communication w.r.t dragSource and dropTarget
	updateLevelPosition: function(req, res) {
		var ldId = req.params.id;
		var levelPositionData = req.body;
		logWrapper.log().info('Update Level Position, ldId = ' + ldId + ' levelPositionData = ' + JSON.stringify(levelPositionData));
		res.json(200, {});
	}
};