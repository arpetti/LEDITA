angular.module('ledita-app')
.controller('LdEditCtrl',
['$scope', '$routeParams', '$location', 'TypeaheadHelper', 'LDService', 'LDEditService', 'Home', 
function($scope, $routeParams, $location, TypeaheadHelper, LDService, LDEditService, Home) {

	$scope.ldid = $routeParams.ldid;
	$scope.selectedQcers = {};
	$scope.selectedTopics = [];
    $scope.selectedObjectives = [];
    $scope.selectedPrerequisites = [];

    LDEditService.getLearningDesign($scope.ldid, function(res) {
        $scope.learningDesign = res;
        initLdPublicationFlag();
        initMultiSelections();
        Home.getQcers(function(res) {
	        $scope.qceropts = res;
        	initSelectedQcers()
	    }, function(err) {
	        $scope.qcerError = err;
	    });
    }, function(err) {
        $location.path('/');
    });

    initLdPublicationFlag = function() {
    	if ($scope.learningDesign.ld_publication === 0) {
    		$scope.ldPublicationFlag = false;
    	} else {
    		$scope.ldPublicationFlag = true;
    	}
    };

    initMultiSelections = function() {
    	$scope.selectedTopics = LDEditService.extractTopicNames($scope.learningDesign.subjects);
    	$scope.selectedObjectives = LDEditService.extractObjectiveNames($scope.learningDesign.objectives);
    	$scope.selectedPrerequisites = LDEditService.extractPrerequisiteNames($scope.learningDesign.prerequisites);
    };

    initSelectedQcers = function() {
		$scope.selectedQcers = LDEditService.generateSelectedQcers(
			$scope.learningDesign.qcers, $scope.qceropts); 
    };

    LDService.getActivities($scope.ldid, function(res) {
        $scope.levels = res;
    }, function(err) {
        $scope.error = "Failed to fetch learning design activities.";
        $scope.alertMsg = err;
    });

    $scope.getScopes = function(scope) {
    	return TypeaheadHelper.getScopes(scope);
  	};

  	$scope.getSubjects = function(subject) {
    	return TypeaheadHelper.getSubjects(subject);
  	};

  	$scope.getObjectives = function(objective) {
    	return TypeaheadHelper.getObjectives(objective);
  	};

  	// #28 wip - only add to the selected items list if not already there
  	$scope.addTopic = function() {
  		console.log('addTopic: ' + $scope.ldTopic);
  	};
  	$scope.addObjective = function() {
  		console.log('addObjective: ' + $scope.ldObjective);
  	};
  	$scope.addPrerequisite = function() {
  		console.log('addPrerequisite: ' + $scope.ldRequisite);
  	};

  	// TODO: client-side validation: if all are false, display error instead of calling service
  	$scope.updateQcer = function() {
  		LDEditService.updateLdQcers($scope.ldid, {ldQcers: $scope.selectedQcers},
        function(res) {
        },
        function(err) {
            $scope.ldUpdateErrors = err; // TODO UI to display these
        });
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