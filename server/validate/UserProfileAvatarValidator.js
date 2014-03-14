var m = require('../validate/ValidationMessages');
var _ = require('underscore');

var ACCEPTED_MIME_TYPES = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'];
var MAX_AVATAR_SIZE = 2000 * 1024; // 200K

module.exports = {
	
	validate: function(req) {
		var em = [];
		em.push(module.exports.validateExists(req));
		em.push(module.exports.validateType(req));
		em.push(module.exports.validateSize(req));
		return _.filter(em, function(message){ return message !== null; });
	},

	validateExists: function(req) {
		if (!req.files.userProfileImage) {
			return m.USER_PROFILE_AVATAR_MISSING;
		}
		if (req.files.userProfileImage && req.files.userProfileImage.size === 0) {
			return m.USER_PROFILE_AVATAR_EMPTY;
		}
		return null;
	},

	validateType: function(req) {
		if (req.files.userProfileImage) {
			var imgType = req.files.userProfileImage.type;
			if (!_.contains(ACCEPTED_MIME_TYPES, imgType)) {
				return m.USER_PROFILE_AVATAR_INVALID_TYPE;
			}
		}
		return null;
	},

	validateSize: function(req) {
		if (req.files.userProfileImage) {
			var imgSize = req.files.userProfileImage.size;
			if (imgSize > MAX_AVATAR_SIZE) {
				return m.USER_PROFILE_AVATAR_SIZE;
			}
		}
		return null;
	}

};