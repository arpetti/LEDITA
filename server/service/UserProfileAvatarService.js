var async = require('async');
var fs = require('fs');
var logger = require('../util/LogWrapper');
var avatarHelper = require('../util/AvatarHelper');
var imageDao = require('../dao/ImageDao');
var userProfileEditDao = require('../dao/UserProfileEditDao');
var messages = require('../validate/ValidationMessages');

module.exports = {

	// callback(err, userImageUri)
	updateAvatar: function(userId, userProfileImage, callback) {
		
		var imgDetails = avatarHelper.getImageDetails(userId, userProfileImage);

		async.waterfall([
	    
	    // Step 1: Copy avatar image from temp dir to user-upload dir
	    function(callback){
	    	fs.rename(imgDetails.sourcePath, imgDetails.targetPath, function(err) {
	    		if(err) {
	    			logger.log().error('Error occurred copying avatar image.', err);
	    			callback(err);
	    		} else {
	      		callback(null);
	    		}
	    	})
	    },
	    
	    // Step 2: Insert image
	    function(callback){
	    	imageDao.insertImage(avatarHelper.buildImageRecord(imgDetails, userProfileImage), function(err, imageId) {
	    		if(err) {
	    			logger.log().error('Error occurred inserting avatar image.', err);
	    			callback(err);
	    		} else {
	    			callback(null, imageId);
	    		}
	    	});
	    },

      // Step 3: Update User Profile with Image ID
	    function(imageId, callback){
	    	userProfileEditDao.updateImage(userId, imageId, function(err, result) {
	    		if(err) {
	    			logger.log().error('Error ocurred updating user profile with avatar image id.', err);
	    			callback(err);
	    		} else {
        		callback(null, imageId);
	    		}
	    	});
	    }

		], function (err, imageId) {
		   if(err) {
		   	callback(new Error(messages.USER_PROFILE_UPDATE_AVATAR_FAIL));
		   } else {
		   	logger.log().info('Updated user profile with imageId: ' + imageId + ', uri: ' + imgDetails.uri);
		   	callback(null, imgDetails.uri);
		   }
		});
	},


};