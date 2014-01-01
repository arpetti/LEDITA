var async = require('async');

module.exports = {

	// callback(err, userImageUri)
	updateAvatar: function(userId, userProfileImage, callback) {
		/*
		async.waterfall:
			Step 1: Construct image uri from userId, 'avatar' and mime type (eg: avatar/avatar-1.png)
			Step 2: Copy file from temp path to new path: fs.rename(old, new...)
				var oldPath = userProfileImage.path;
				var newPath = __dirname + '/../../user-upload/ + imageUri;
			Step 3: Call UserEditDao to insert image and get inserted image id
			Step 4: Call UserEditDao to update user profile for image_id
			Callback with image uri (success case)
		*/
	}

};