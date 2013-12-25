angular.module('ledita-app')
	.factory('UserProfileEditService', function($http) {
		return {

			getUserProfile: function(success, error) {
				$http.get('/userprofile').success(success).error(error);
			},

			shouldUpdate: function(modifiedField) {
				return modifiedField && modifiedField.length > 0;
			}

		};
	});