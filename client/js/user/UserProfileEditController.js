angular.module('ledita-app')
	.controller('UserProfileEditCtrl', ['$scope', 'UserProfileEditService', '$log',
		function($scope, UserProfileEditService, $log) {

			UserProfileEditService.getUserProfile(function(res) {
				$scope.userProfile = res;
			}, function(err) {
				$scope.error = "Failed to load user profile.";
			});

			var shouldUpdate = function(modifiedField) {
				return modifiedField && modifiedField.length > 0;
			}

			$scope.updateUserProfileFirstName = function() {
				var modifiedFirstName = $scope.userProfile.name;
				if(UserProfileEditService.shouldUpdate(modifiedFirstName)) {
					$log.info('User Profile First Name will be updated: ' + modifiedFirstName);
				};
			};

		}
	]);