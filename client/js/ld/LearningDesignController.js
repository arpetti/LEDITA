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

  	$scope.getBoxClass = function (node) {
  		if (node.children) {
  			if (node.children.length >= 4)
  				return "groupBox4";
  			if (node.children.length >= 3)
  				return "groupBox3";
  			if (node.children.length >= 2)
  				return "groupBox1";
  			if (node.children.lenght >= 1)
  				return "groupBox1";
  		}
  		return "actBox";
    };  

}]);