var _s = require('underscore.string');

// http://www.diveintojavascript.com/projects/javascript-sprintf
var NAME_FORMAT = 'avatar-%u.%s';
var URI_FORMAT = 'avatar/avatar-%u.%s';
var PATH_FORMAT = '%s/../../user-upload/avatar/avatar-%u.%s';

var mimeToExt = {
	'image/gif': 'gif',
	'image/jpeg': 'jpg',
	'image/pjpeg': 'jpg',
	'image/png': 'png'
};

module.exports = {

	getImageDetails: function(userId, userProfileImage) {
		return {
			name: module.exports.buildImageName(userId, userProfileImage),
			uri: module.exports.buildImageUri(userId, userProfileImage),
			sourcePath: userProfileImage.path,
			targetPath: module.exports.buildImageTargetPath(userId, userProfileImage)
		};
	},
	
	buildImageName: function(userId, userProfileImage) {
		var ext = mimeToExt[userProfileImage.type];
		var imgName = _s.sprintf(NAME_FORMAT, userId, ext);
		return imgName;
	},

	buildImageUri: function(userId, userProfileImage) {
		var ext = mimeToExt[userProfileImage.type];
		var uri = _s.sprintf(URI_FORMAT, userId, ext);
		return uri;
	},

	buildImageTargetPath: function(userId, userProfileImage) {
		var ext = mimeToExt[userProfileImage.type];
		var imgPath = _s.sprintf(PATH_FORMAT, __dirname, userId, ext);
		return imgPath;
	},

	buildImageRecord: function(userId, userProfileImage) {
		return {
			name: module.exports.buildImageName(userId, userProfileImage),
			size: userProfileImage.size,
			uri: module.exports.buildImageUri(userId, userProfileImage),
			mime: userProfileImage.type
		}
	}

};