var userProfileEditService = require('../service/UserProfileEditService');

module.exports = {

	getUserProfile: function(req, res) {
		var userId = req.user.id;
		userProfileEditService.getUserProfile(userId, function(err, user, message) {
			if(err) {
				return res.send(500, message);
			} else if (!user) {
				return res.send(404, message);
			} else {
				res.json(200, user);
			}
		});
	},

	// TODO #47 validate userData.firstName before passing it on to service
	updateFirstName: function(req, res) {
		var userId = req.user.id;
		var userData = req.body;
		userProfileEditService.updateFirstName(userId, userData.firstName, function(err, message) {
			if(err){
				return res.send(500, message);
			} else {
				res.json(200, {});
			}
		});
	},

	// TODO #47 validate userData.lastName before passing it on to service
	updateLastName: function(req, res) {
		var userId = req.user.id;
		var userData = req.body;
		userProfileEditService.updateLastName(userId, userData.lastName, function(err, message) {
			if(err){
				return res.send(500, message);
			} else {
				res.json(200, {});
			}
		});
	},

	// TODO #47 validate userData.email before passing it on to service
	updateEmail: function(req, res) {
		var userId = req.user.id;
		var userData = req.body;
		userProfileEditService.updateEmail(userId, userData.email, function(err, message) {
			if(err){
				return res.send(500, message);
			} else {
				res.json(200, {});
			}
		});
	}

};