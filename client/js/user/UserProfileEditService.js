angular.module('ledita-app')
	.factory('UserProfileEditService', function($http) {
		return {

			getUserProfile: function(success, error) {
				$http.get('/userprofile').success(success).error(error);
			}

		};
	});