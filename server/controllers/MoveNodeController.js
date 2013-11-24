var logger = require('../util/LogWrapper');
var moveNodeService = require('../service/MoveNodeService');

module.exports = {

	// TODO: Call MoveNodeValidator first (async waterfall)
	// TODO: Add unit test
	nodeToNode: function(req, res) {
		var ldId = req.params.id;
		moveNodeService.nodeToNode(ldId, req.body.dragSourceId, req.body.dropTargetId, function(err, result, message) {
			if(err) {
                return res.send(500, message);
            } else {
            	res.json(200, result);
            }
		})
	}
};