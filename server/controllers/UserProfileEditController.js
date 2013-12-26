var userProfileEditService = require('../service/UserProfileEditService');

module.exports = {

	getUserProfile: function(req, res) {
		var currentlyLoggedInUserId = req.user.id;
		userProfileEditService.getUserProfile(currentlyLoggedInUserId, function(err, user, message) {
			if(err) {
				return res.send(500, message);
			} else if (!user) {
				return res.send(404, message);
			} else {
				res.json(200, user);
			}
		});
	},

	// #47 wip...
	updateFirstName: function(req, res) {
		var currentlyLoggedInUserId = req.user.id;
		var userData = req.body;
		// TODO validate userData.firstName before passing it on to service
		res.json(200, {});
	}

};