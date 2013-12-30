angular.module('ledita-app')
	.controller('UserProfileEditCtrl', ['$scope', 'UserProfileEditService', '$log',
		function($scope, UserProfileEditService, $log) {

			UserProfileEditService.getUserProfile(function(res) {
				$scope.userProfile = res;
			}, function(err) {
				$scope.error = "Failed to load user profile.";
			});

			var handleUpdateSuccess = function(res) {
				$log.info('User Profile updated successfully');
				$scope.userProfileUpdateErrors = "Modifica salvata!"; // not an error, but this is how we display user feedback that update worked
			};

			var handleUpdateError = function(err) {
				$log.error(err);
				$scope.userProfileUpdateErrors = err; 
			};

			$scope.updateUserProfileFirstName = function() {
				if (UserProfileEditService.shouldUpdate($scope.userProfile.name)) {
					UserProfileEditService.updateFirstName({firstName: $scope.userProfile.name}, handleUpdateSuccess, handleUpdateError);
				};
			};

			$scope.updateUserProfileLastName = function() {
				if (UserProfileEditService.shouldUpdate($scope.userProfile.last_name)) {
					UserProfileEditService.updateLastName({lastName: $scope.userProfile.last_name}, handleUpdateSuccess, handleUpdateError);
				};
			};

			$scope.updateUserProfileEmail = function() {
				if (UserProfileEditService.shouldUpdate($scope.userProfile.email)) {
					UserProfileEditService.updateEmail({email: $scope.userProfile.email}, handleUpdateSuccess, handleUpdateError);
				};
			};

			$scope.updateUserProfileWorkplace = function() {
				if (UserProfileEditService.shouldUpdate($scope.userProfile.workplace)) {
					UserProfileEditService.updateWorkplace({workplace: $scope.userProfile.workplace}, handleUpdateSuccess, handleUpdateError);
				};
			};

			$scope.updateUserProfileCity = function() {
				if (UserProfileEditService.shouldUpdate($scope.userProfile.city)) {
					UserProfileEditService.updateCity({city: $scope.userProfile.city}, handleUpdateSuccess, handleUpdateError);
				};
			};

			$scope.updateUserProfileCountry = function() {
				if (UserProfileEditService.shouldUpdate($scope.userProfile.country)) {
					UserProfileEditService.updateCountry({country: $scope.userProfile.country}, handleUpdateSuccess, handleUpdateError);
				};
			};

		}
	]);