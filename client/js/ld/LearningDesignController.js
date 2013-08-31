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
    });

    //TODO Add Angular Karma unit test!
    $scope.getBoxClass = function(node) {
      if (node.type === 'ACTIVITY') {
        return 'actBox';
      }
      if (node.type === 'LD') {
        return 'ldBox';
      }
      if (node.type === 'ACTIVITY_GROUP') {
        return 'groupBox3'; //FIXME different style based on MAXIMUM number of children IN A LEVEL
      }

    };

   $scope.isBtnActive = function (data) {
       if (data == true)
       return "btnActive";
   }                      ;

    $scope.open = function () {
        $scope.shouldBeOpen = true;
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