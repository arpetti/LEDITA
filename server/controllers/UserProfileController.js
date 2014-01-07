var UserProfileService = require('../service/UserProfileService');

module.exports = {

	getUniqueUsers: function(req, res) {
		UserProfileService.getUniqueUsers(function(err, result, message) {
			if (err) {
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