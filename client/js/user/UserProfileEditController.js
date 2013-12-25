angular.module('ledita-app')
	.controller('UserProfileEditCtrl', ['$scope', 'UserProfileEditService',
		function($scope, UserProfileEditService) {

			UserProfileEditService.getUserProfile(function(res) {
				$scope.userProfile = res;
			}, function(err) {
				$scope.error = "Failed to load user profile.";
			});

		}
	]);