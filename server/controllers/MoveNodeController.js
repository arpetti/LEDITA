var logger = require('../util/LogWrapper');
var moveNodeService = require('../service/MoveNodeService');
var moveNodeValidator = require('../validate/MoveNodeValidator');

module.exports = {

	nodeToNode: function(req, res) {
		var ldId = req.params.id;
		var sourceId = req.body.dragSourceId;
		var targetId = req.body.dropTargetId;

		moveNodeValidator.validateNodeToNode(ldId, sourceId, targetId, function(errorMessage) {
			if(errorMessage) {
				return res.send(400, errorMessage);
			} else {
				moveNodeService.nodeToNode(ldId, sourceId, targetId, function(err, result, message) {
					if(err) {
		                return res.send(500, message);
		            } else {
		            	res.json(200, result);
		            }
				});
			}
		});
	}
};