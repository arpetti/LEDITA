angular.module('ledita-app')
.controller('HomeCtrl',
['$scope', 'Home', 'Auth', function($scope, Home, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    Home.getLearningDesigns(function(res) {
        $scope.learningDesigns = res;
        $scope.loading = false;
    }, function(err) {
        $scope.error = "Failed to fetch learning designs.";
        $scope.loading = false;
    });

}]);