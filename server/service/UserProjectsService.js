var userDao = require('../dao/UserDao');
var userProjectsDao = require('../dao/UserProjectsDao');
var async = require('async');
var messages = require('../validate/ValidationMessages');
var logger = require('../util/LogWrapper');

/* 
*		Do not expose email! 
*		Only return what is strictly necessary to display public profile. 
*/
var extractPublicUserProfile = function(userProfile) {
	return {
		name: userProfile.name,
		last_name: userProfile.last_name,
		workplace: userProfile.workplace,
		city: userProfile.city,
		country: userProfile.country,
		image_uri: userProfile.image_uri
	}
};

module.exports = {

	// callback(err, {userInfo: userProfile, userProjects: [LDs]})
	getPublicProjects: function(userId, callback) {
		async.series({
		    userInfo: function(callback){
		    	userDao.getUserById(userId, function(err, results) {
		    		if(err){
		    			logger.log().error('Error occurred finding user by id: ' + userId, err);
		    			callback(new Error(messages.USER_PROJECTS_ERROR));
		    		} else if(results.length === 0) {
		    			logger.log().warn('getPublicProjects could nto find user by id: ' + userId);
		    			callback(new Error(messages.USER_PROJECTS_USER_NOT_FOUND));
		    		} else {
		    			callback(null, extractPublicUserProfile(results[0]));
		    		}
		    	});
		    },
		    userProjects: function(callback){
		    	userProjectsDao.getPublicProjects(userId, function(err, results) {
		    		if(err){
		    			logger.log().error('Error occurred finding user projects for user id: ' + userId, err);
		    			callback(new Error(messages.USER_PROJECTS_ERROR));
		    		} else {
		    			callback(null, results);
		    		}
		    	});
		    }
		},
		function(err, results) {
		    if(err){
		    	callback(err);
		    }else{
		    	callback(null, results);
		    }
		});
	}

};