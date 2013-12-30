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
			},

			updateEmail: function(userData, success, error) {
				$http.put('/userprofile/email', userData).success(function(res) {
					success(res);
				}).error(error);
			},

			updateWorkplace: function(userData, success, error) {
				$http.put('/userprofile/workplace', userData).success(function(res) {
					success(res);
				}).error(error);
			},

			updateCity: function(userData, success, error) {
				$http.put('/userprofile/city', userData).success(function(res) {
					success(res);
				}).error(error);
			},

			updateCountry: function(userData, success, error) {
				$http.put('/userprofile/country', userData).success(function(res) {
					success(res);
				}).error(error);
			}

		};
	});