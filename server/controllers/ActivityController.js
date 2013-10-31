var ActivityService = require('../service/ActivityService');

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
	}

};