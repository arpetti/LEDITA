var logger = require('../util/LogWrapper');
var composesService = require('../service/ComposesService');

module.exports = {

	nodeToNode: function(req, res) {
		var ldId = req.params.id;
		var requestData = req.body;
		composesService.nodeToNode(ldId, requestData.dragSource, requestData.dropTarget, function(err, result, message) {
			if(err) {
                return res.send(500, message);
            } else {
            	res.json(200, result);
            }
		})
	}
};