angular.module('ledita-app')
.controller('HomeCtrl',
['$scope', 'Home', function($scope, Home) {
    $scope.loading = true;

    // TODO: Infinite Scroll http://binarymuse.github.io/ngInfiniteScroll/demo_basic.html

    Home.getLearningDesigns(function(res) {
        $scope.learningDesigns = res;
        $scope.loading = false;
    }, function(err) {
        $scope.error = "Failed to fetch learning designs.";
        $scope.loading = false;
    });

}]);

angular.module('ledita-app')
.controller('NavActionCtrl',
['$scope', function($scope) {
    $scope.createLD = function () {
        $scope.beOpen = true;
    };

    $scope.closeLD = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.beOpen = false;
    };

    $scope.opts = {
        backdropFade: true,
        dialogFade:true,
        backdropClick: false
    };

}]);

angular.module('ledita-app')
.controller('LdCreateCtrl',
['$scope', function($scope) {

    //TODO Replace with call to service
    $scope.qceropts = [
    	{"qcer_id": 1, "qcer_name": "A1"},
    	{"qcer_id": 2, "qcer_name": "A2"},
    	{"qcer_id": 3, "qcer_name": "B1"},
    	{"qcer_id": 4, "qcer_name": "B2"},
    	{"qcer_id": 5, "qcer_name": "C1"},
    	{"qcer_id": 6, "qcer_name": "C2"},
    ];
    $scope.selectedQcers = {};

}]);