var userProfileEditValidator = require('../validate/UserProfileEditValidator');
var userProfileEditService = require('../service/UserProfileEditService');

var updateProfile = function(updateFunc, userId, dataValue, res) {
	updateFunc.apply(null, [userId, dataValue, function(err, message) {
		if(err){
			return res.send(500, message);
		} else {
			res.json(200, {});
		}
	}]);
};

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

	updateFirstName: function(req, res) {
		var vmessages = userProfileEditValidator.validateFirstName(req.body.firstName);
		if (vmessages.length > 0) {
			return res.send(400, vmessages);
		} else {
			updateProfile(userProfileEditService.updateFirstName, req.user.id, req.body.firstName, res);
		}
	},

	// TODO #47 validate userData.lastName before passing it on to service
	updateLastName: function(req, res) {
		updateProfile(userProfileEditService.updateLastName, req.user.id, req.body.lastName, res);
	},

	// TODO #47 validate userData.email before passing it on to service
	updateEmail: function(req, res) {
		updateProfile(userProfileEditService.updateEmail, req.user.id, req.body.email, res);
	},

	// TODO #47 validate userData.workplace before passing it on to service
	updateWorkplace: function(req, res) {
		updateProfile(userProfileEditService.updateWorkplace, req.user.id, req.body.workplace, res);
	},

	// TODO #47 validate userData.city before passing it on to service
	updateCity: function(req, res) {
		updateProfile(userProfileEditService.updateCity, req.user.id, req.body.city, res);
	},

	// TODO #47 validate userData.country before passing it on to service
	updateCountry: function(req, res) {
		updateProfile(userProfileEditService.updateCountry, req.user.id, req.body.country, res);
	}

};