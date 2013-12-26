angular.module('ledita-app')
	.factory('UserProfileEditService', function($http) {
		return {

			getUserProfile: function(success, error) {
				$http.get('/userprofile').success(success).error(error);
			},

			shouldUpdate: function(modifiedField) {
				return modifiedField && modifiedField.length > 0;
			},

			updateFirstName: function(userData, success, error) {
				$http.put('/userprofile/firstname', userData).success(function(res) {
					success(res);
				}).error(error);
			},

			updateLastName: function(userData, success, error) {
				$http.put('/userprofile/lastname', userData).success(function(res) {
					success(res);
				}).error(error);
			}

		};
	});