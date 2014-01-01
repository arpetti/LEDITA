var _s = require('underscore.string');
var uuid = require('node-uuid');

var NAME_FORMAT = 'avatar-%u-%s.%s'; 
var URI_FORMAT = 'avatar/%s';
var PATH_FORMAT = '%s/../../user-upload/%s';

var mimeToExt = {
	'image/gif': 'gif',
	'image/jpeg': 'jpg',
	'image/pjpeg': 'jpg',
	'image/png': 'png'
};

buildImageName = function(userId, userProfileImage) {
	var ext = mimeToExt[userProfileImage.type];
	var uniqueVal = uuid.v4();
	var imgName = _s.sprintf(NAME_FORMAT, userId, uniqueVal, ext);
	return imgName;
};

buildImageUri = function(imgName) {
	var uri = _s.sprintf(URI_FORMAT, imgName);
	return uri;
};

buildImageTargetPath = function(imgUri) {
	var imgPath = _s.sprintf(PATH_FORMAT, __dirname, imgUri);
	return imgPath;
};

module.exports = {

	getImageDetails: function(userId, userProfileImage) {
		var imgName = buildImageName(userId, userProfileImage);
		var imgUri = buildImageUri(imgName);
		var imgTargetPath = buildImageTargetPath(imgUri);
		return {
			name: imgName,
			uri: imgUri,
			sourcePath: userProfileImage.path,
			targetPath: imgTargetPath
		};
	},
	
	buildImageRecord: function(userId, userProfileImage) {
		var imgName = buildImageName(userId, userProfileImage);
		var imgUri = buildImageUri(imgName);
		return {
			name: imgName,
			size: userProfileImage.size,
			uri: imgUri,
			mime: userProfileImage.type
		}
	}

};