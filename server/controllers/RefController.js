var RefService = require('../service/RefService');

module.exports = {

	getQcers: function(req, res) {
		RefService.getQcers(function(err, result, message) {
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

	getSubjectsMatching: function(req, res) {
		RefService.getSubjectsMatching(function(err, results, message) {
			if (err) {
				return res.send(500, message);
			} else {
				res.json(200, results);
			}
		});
	}

};