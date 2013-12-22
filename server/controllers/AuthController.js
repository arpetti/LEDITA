var passport = require('passport'),
	User = require('../models/User.js'),
	UserValidator = require('../validate/UserValidator'),
	UserService = require('../service/UserService'),
	HashHelper = require('../util/HashHelper'),
	ConfigHelper = require('../util/ConfigHelper'),
	config = ConfigHelper.config();

// Return same structured response as res.cookie set in routes.js
var buildUserResponse = function(userObj) {
	return {
		"role": userObj.role,
		"username": userObj.username,
		"id": userObj.id,
		"name": userObj.name,
		"last_name": userObj.last_name
	};
}

module.exports = {

	registerNewUser: function(req, res, next) {
		var user = req.body;

		var registrationErrors = UserValidator.validate(user);
		if (registrationErrors.length > 0) {
			return res.send(400, registrationErrors);
		}

		UserValidator.validateExists(user.username, function(err, message) {
			if (err) {
				return res.send(500);
			}
			if (message) {
				return res.send(403, message);
			} else {
				HashHelper.generateHash(user.password, function(err, hash) {
					if (err) {
						return res.send(500);
					}
					UserService.addNewUser(user, hash, function(err, addedUser) {
						if (err) {
							return res.send(500);
						}
						req.logIn(addedUser, function(err) {
							if (err) {
								next(err);
							}
							else {
								var userResponse = buildUserResponse(addedUser);
								res.json(200, userResponse);
							}
						});
					});
				});
			}
		});

	},

	login: function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.send(400, info);
			}
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				if (req.body.rememberme) {
					req.session.cookie.maxAge = config.remember_me_ms;
				}
				var userResponse = buildUserResponse(user);
				res.json(200, userResponse);
			});
		})(req, res, next);
	},

	logout: function(req, res) {
		req.logout();
		res.send(200);
	}
};