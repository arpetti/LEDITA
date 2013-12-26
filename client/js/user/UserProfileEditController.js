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
				if (UserProfileEditService.shouldUpdate(modifiedFirstName)) {
					UserProfileEditService.updateFirstName({firstName: modifiedFirstName},
						function(res) {
							$log.info('updateUserProfile firstName successful');
							$scope.userProfileUpdateErrors = "Modifica salvata!";
						},
						function(err) {
							$log.error(err);
							$scope.userProfileUpdateErrors = err; 
						});
				};
			};

		}
	]);