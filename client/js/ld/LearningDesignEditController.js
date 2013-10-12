angular.module('ledita-app')
.controller('LdEditCtrl',
['$scope', '$routeParams', '$location', 'LDService', 'LDEditService', function($scope, $routeParams, $location, LDService, LDEditService) {

	$scope.ldid = $routeParams.ldid;

    LDEditService.getLearningDesign($scope.ldid, function(res) {
        $scope.learningDesign = res;
    }, function(err) {
        $location.path('/');
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

    $scope.open = function (node) {
        $scope.shouldBeOpen = true;
        var selectedNode;
        $scope.selectedNode = node;
        $scope.selectedNode.displayName = node.node_name || node.group_child_name;
        return selectedNode;
    };

    $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpen = false;
    };

    $scope.opts = {
        backdropFade: true,
        dialogFade:true
    };

    $scope.createActivity = function (node) {
        $scope.addActivity = true;
    };

    $scope.closeAddActivity = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.addActivity = false;
    };

    $scope.optsAddActivity = {
        backdropFade: true,
        dialogFade:true,
        backdropClick:false
    };
 
 	$scope.createGroup = function (node) {
        $scope.addGroup = true;
    };

    $scope.closeAddGroup = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.addGroup = false;
    };

    $scope.optsAddGroup = {
        backdropFade: true,
        dialogFade:true,
        backdropClick:false
    };

    $scope.addingLD = function (node) {
        $scope.addLD = true;
    };

    $scope.closeAddLD = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.addLD = false;
    };

    $scope.optsAddLD = {
        backdropFade: true,
        dialogFade:true,
        backdropClick:false
    };

    $scope.createResource = function (node) {
        $scope.addResource = true;
    };

    $scope.closeAddResource = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.addResource = false;
        $scope.addActivity = true;
    };

    $scope.optsAddResource = {
        backdropFade: true,
        dialogFade:true,
        backdropClick:false
    };

}]);