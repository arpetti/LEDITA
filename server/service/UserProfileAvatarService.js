var async = require('async');
var _s = require('underscore.string');

// http://www.diveintojavascript.com/projects/javascript-sprintf
var URI_FORMAT = 'avatar/avatar-%u.%s';
var PATH_FORMAT = '%s/../../user-upload/%s';

var mimeToExt = {
	'image/gif': 'gif',
	'image/jpeg': 'jpeg',
	'image/pjpeg': 'jpeg',
	'image/png': 'png'
};

module.exports = {

	// callback(err, userImageUri)
	updateAvatar: function(userId, userProfileImage, callback) {
		/*
		async.waterfall:
			Step 1: 
				Construct image uri from userId, 'avatar' and mime type (eg: avatar/avatar-1.png)
				Copy file from temp path to new path: fs.rename(old, new...)
					var oldPath = userProfileImage.path;
					var newPath = __dirname + '/../../user-upload/ + imageUri;
			Step 2: Call UserEditDao to insert image and get inserted image id
			Step 3: Call UserEditDao to update user profile for image_id
			Callback with image uri (success case)
		*/
	},

	buildImageUri: function(userId, userProfileImage) {
		var ext = mimeToExt[userProfileImage.type];
		var uri = _s.sprintf(URI_FORMAT, userId, ext);
		return uri;
	},

	buildImagePath: function(imageUri) {
		var imgPath = _s.sprintf(PATH_FORMAT, __dirname, imageUri);
		return imgPath;
	}

};