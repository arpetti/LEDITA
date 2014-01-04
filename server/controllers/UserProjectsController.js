var userProjectsService = require('../service/UserProjectsService');

module.exports = {

	getPublicProjects: function(req, res) {
		var userId = req.params.id;
		userProjectsService.getPublicProjects(userId, function(err, results) {
			if (err) {
				res.send(500, err.message);
			} else {
				res.json(200, results);
			}
		});
	}

};