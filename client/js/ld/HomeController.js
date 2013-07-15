angular.module('ledita-app')
.controller('HomeCtrl',
['$scope', 'Home', function($scope, Home) {
    $scope.loading = true;

    Home.getLearningDesigns(function(res) {
        $scope.learningDesigns = res;
        $scope.loading = false;
    }, function(err) {
        $scope.error = "Failed to fetch learning designs.";
        $scope.loading = false;
    });

}]);