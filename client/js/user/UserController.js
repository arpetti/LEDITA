angular.module('ledita-app')
    .controller('UserProfileCtrl',
        ['$scope', '$routeParams', 'UserProfileService', function($scope, $routeParams, UserProfileService) {

            $scope.userid = $routeParams.userid;


            UserProfileService.getUserProfiles(function(res) {
                $scope.userProfiles = res;
                $scope.loading = false;
            }, function(err) {
                $scope.error = "Failed to fetch user profiles.";
                $scope.loading = false;
            });

            UserProfileService.getUniqueUsers(function(res) {
                $scope.uniqueUsers = res;
                $scope.loading = false;
            }, function(err) {
                $scope.error = "Failed to fetch user profiles.";
                $scope.loading = false;
            });

            UserProfileService.getUserProfile($scope.userid, function(res) {
                $scope.user = res;
                $scope.loading = false;
            }, function(err) {
                $scope.error = "Failed to fetch user.";
                $scope.loading = false;
            });


        }]);



