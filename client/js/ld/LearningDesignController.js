angular.module('ledita-app')
.controller('LdViewCtrl',
['$scope', '$routeParams', 'LDService', function($scope, $routeParams, LDService) {

	$scope.ldid = $routeParams.ldid;

    LDService.getLearningDesign($scope.ldid, function(res) {
        $scope.learningDesign = res;
    }, function(err) {
        $scope.error = "Failed to fetch learning design.";
    });

    LDService.getActivities($scope.ldid, function(res) {
        $scope.levels = res;
    }, function(err) {
        $scope.error = "Failed to fetch learning design activities.";
        $scope.alertMsg = err;
    });

    $scope.getBoxClass = function(node) {
      return LDService.getBoxClass(node);
    };

    $scope.getGroupBoxClass = function(node) {
        return LDService.getGroupBoxClass(node);
    };

    $scope.isBtnActive = function (data) {
       if (data == true)
       return "btnActive";
   }                      ;

    $scope.open = function (nodeName) {
        $scope.shouldBeOpen = true;
        var nameSelected;
        $scope.nameSelected = nodeName;
        return nameSelected;
    };

    $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpen = false;
    };

    $scope.opts = {
        backdropFade: true,
        dialogFade:true
    };

}]);