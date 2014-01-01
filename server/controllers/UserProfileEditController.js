var userProfileEditValidator = require('../validate/UserProfileEditValidator');
var userProfileAvatarValidator = require('../validate/UserProfileAvatarValidator');
var userProfileEditService = require('../service/UserProfileEditService');
var fs = require('fs');

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
	},

	// #48 wip...
	// TODO: Validation on file size, type?
	// TODO: Delegate file handling to service
	// TODO: Determine file extension for rename
	// TODO: Insert into image table and update user.image_id with inserted image id
	//		--> Also add columns creation_date and ip to image table for tracking
	// Consider ImageMagik for resizing?
	// updateAvatar: function(req, res) {

	// 	console.log('************** req.files: ' + JSON.stringify(req.files));

	// 	// experiment for tracking client IP
	// 	// var ip = req.headers['x-forwarded-for'] || 
 //  //    req.connection.remoteAddress || 
 //  //    req.socket.remoteAddress ||
 //  //    req.connection.socket.remoteAddress;
 //  //   console.log('***************** updateAvatar ip: ' + ip);
 //  //   console.log('***************** updateAvatar req.ip: ' + req.ip);

 //  	// 'userProfileImage' comes from client side UserProfileEditController.js
	// 	var oldPath = req.files.userProfileImage.path;
	// 	var newPath = __dirname + '/../../user-upload/avatar/avatar-' + req.user.id + '.png';
	// 	fs.rename(oldPath, newPath, function(err) {
	// 		if(err) {
	// 			console.log('updateAvatar err: ' + JSON.stringify(err));
	// 			return res.send(500, 'Avatar upload failed');
	// 		} else {
	// 			res.json(200, {});
	// 		}
	// 	});
	// }

	// #48 wip...
	updateAvatar: function(req, res) {
		var validationMessages = userProfileAvatarValidator.validate(req);
		if (validationMessages.length > 0) {
			res.send(400, validationMessages);
		} else {
			// userProfileAvatarService.updateAvatar(req.user.id, req.files.userProfileImage, function(err, userImageUri){//do something});
			res.json(200, {});
		}
	}

};