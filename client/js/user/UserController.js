angular.module('ledita-app')
	.controller('UserProfileCtrl', ['$scope', 'UserProfileService',
		function($scope, UserProfileService) {

			UserProfileService.getUniqueUsers(function(res) {
				$scope.uniqueUsers = res;
				$scope.loading = false;
			}, function(err) {
				$scope.error = "Failed to fetch user profiles.";
				$scope.loading = false;
			});

		}
	]);