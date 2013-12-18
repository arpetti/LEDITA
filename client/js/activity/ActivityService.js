angular.module('ledita-app')
.factory('ActivityService', function($http, _) {

	// Resources cached here for communication between Activity and Resource modals
	var resources = [];

	return {

		createActivity: function(ldId, ldData, success, error) {
      $http.post('/learningdesign/activity/' + ldId, ldData).success(function(res) {
          success(res);
      }).error(error);
  	},

  	addResource: function(resource) {
  		resources.push(resource);
  	},

  	getResources: function() {
  		return resources;
  	},

  	resetResources: function() {
  		resources = [];
  	}

	};

});