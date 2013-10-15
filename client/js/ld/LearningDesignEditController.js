angular.module('ledita-app')
.controller('LdEditCtrl',
['$scope', '$routeParams', '$location', 'TypeaheadHelper', 'LDService', 'LDEditService', 'Home', 
function($scope, $routeParams, $location, TypeaheadHelper, LDService, LDEditService, Home) {

	$scope.ldid = $routeParams.ldid;

    LDEditService.getLearningDesign($scope.ldid, function(res) {
        $scope.learningDesign = res;
        initLdPublicationFlag($scope.learningDesign.ld_publication);
    }, function(err) {
        $location.path('/');
    });

    initLdPublicationFlag = function(ld_publication) {
    	if (ld_publication === 0) {
    		$scope.ldPublicationFlag = false;
    	} else {
    		$scope.ldPublicationFlag = true;
    	}
    };

    LDService.getActivities($scope.ldid, function(res) {
        $scope.levels = res;
    }, function(err) {
        $scope.error = "Failed to fetch learning design activities.";
        $scope.alertMsg = err;
    });

    Home.getQcers(function(res) {
        $scope.qceropts = res;
    }, function(err) {
        $scope.qcerError = err;
    });

	// TODO generate value for $scope.selectedQcers from $scope.learningDesign.qcers and $scope.qceropts
	// $scope.selectedQcers = {"1":true,"2":true};  
	// currently we have $scope.learningDesign.qcers:
	//  [{"qcer_name": "A1"}, {"qcer_name": "A2"}]
	// and qceropts:
	//   [{"id":1,"name":"A1"},{"id":2,"name":"A2"},{"id":3,"name":"B1"},{"id":4,"name":"B2"},{"id":5,"name":"C1"},{"id":6,"name":"C2"}] 
	LDEditService.generateSelectedQcers();
	$scope.selectedQcers = {};  

    $scope.getScopes = function(scope) {
    	return TypeaheadHelper.getScopes(scope);
  	};

  	$scope.getSubjects = function(subject) {
    	return TypeaheadHelper.getSubjects(subject);
  	};

  	$scope.getObjectives = function(objective) {
    	return TypeaheadHelper.getObjectives(objective);
  	};

    $scope.updateLdName = function() {
    	var modifiedLdName = $scope.learningDesign.ld_name;
    	if (modifiedLdName && modifiedLdName.length > 0) {
    		LDEditService.updateLdName($scope.ldid, {ldName: modifiedLdName},
	        function(res) {
	        },
	        function(err) {
	            $scope.ldUpdateErrors = err; // TODO UI to display these
	        });
    	};
    };

    $scope.updateLdScope = function() {
    	var modifiedLdScope = $scope.learningDesign.ld_scope;
    	if (modifiedLdScope && modifiedLdScope.length > 0) {
    		LDEditService.updateLdScope($scope.ldid, {ldScope: modifiedLdScope},
	        function(res) {
	        },
	        function(err) {
	            $scope.ldUpdateErrors = err; // TODO UI to display these
	        });
    	};
    };

    $scope.updateStudentsDescr = function() {
    	var modifiedStudentsDescr = $scope.learningDesign.ld_students_profile;
    	if (modifiedStudentsDescr && modifiedStudentsDescr.length > 0) {
    		LDEditService.updateStudentsDescr($scope.ldid, {studentsDescr: modifiedStudentsDescr},
	        function(res) {
	        },
	        function(err) {
	            $scope.ldUpdateErrors = err; // TODO UI to display these
	        });
    	};
    };

    $scope.updateLdPublication = function() {
    	if ($scope.ldPublicationFlag) {
    		LDEditService.updateLdPublic($scope.ldid,
	        function(res) {
	        },
	        function(err) {
	            $scope.ldUpdateErrors = err; // TODO UI to display these
	        });
    	} else {
    		LDEditService.updateLdPrivate($scope.ldid,
	        function(res) {
	        },
	        function(err) {
	            $scope.ldUpdateErrors = err; // TODO UI to display these
	        });
    	}
    };

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