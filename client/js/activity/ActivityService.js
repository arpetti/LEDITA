angular.module('ledita-app')
.factory('ActivityService', function($http, _) {

	return {

		createActivity: function(ldId, ldData, success, error) {
      $http.post('/learningdesign/activity/' + ldId, ldData).success(function(res) {
          success(res);
      }).error(error);
  	}

	};

});