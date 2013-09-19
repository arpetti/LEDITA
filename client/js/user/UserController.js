angular.module('ledita-app')
    .controller('UserCtrl',
        ['$scope', '$routeParams', 'UserService', function($scope, $routeParams, UserService) {

            $scope.userid = $routeParams.userid;

            UserService.getUserProfiles(function(res) {
                $scope.userProfiles = res;
                $scope.loading = false;
            }, function(err) {
                $scope.error = "Failed to fetch user profiles.";
                $scope.loading = false;
            });


            UserService.getUserById($scope.userid, function(res) {
                $scope.user = res;
                $scope.loading = false;
            }, function(err) {
                $scope.error = "Failed to fetch user.";
                $scope.loading = false;
            });






        }]);
