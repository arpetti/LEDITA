angular.module('ledita-app')
.controller('ActCreateCtrl',
['$scope', '$rootScope', 'TypeaheadHelper', '$log', 'LDEditService', 'ActivityService', 
	function($scope, $rootScope, TypeaheadHelper, $log, LDEditService, ActivityService) {

	$scope.selectedTechnologies = [];
    
    $scope.getTechnologies = function(technology) {
    	return TypeaheadHelper.getTechnologies(technology);
  	};

  	var addTechnology = function(technology) {
  		$scope.selectedTechnologies.push(technology);
  	};

  	var clearCurrentTechnology = function() {
  		$scope.technology = " ";
  	};

  	$scope.addTechnologyFromSuggestion = function() {
  		addTechnology($scope.technology);
  		clearCurrentTechnology();
  	};

  	$scope.addTechnologyFromUserInput = function($event) {
        $event.preventDefault();
        addTechnology($scope.technology);
        clearCurrentTechnology();
    };

    var removeItem = function(item, list) {
		var index = list.indexOf(item);
    	if(index >-1){
    		list.splice(index,1);
		}
    };

    $scope.removeTechnology = function(technology) {
    	removeItem(technology, $scope.selectedTechnologies);
    };

    $scope.appendInputToItems = function(item, items) {
    	if(item && item.length > 0 && item !== " ") {
    		return items.concat(item);
    	} else {
    		return items;
    	};
    };

    // #34 wip...
    $scope.submitActivity = function() {
    	var currentLdId = LDEditService.getCurrentLdId();
    	ActivityService.createActivity(currentLdId, $scope.buildActivityData(),
	        function(res) {
	        	$log.info('Activity created successfully');
	        	$rootScope.$broadcast('closeActivityModal');
	        	$rootScope.$broadcast('activityCreated');
	        },
	        function(err) {
	        	$log.error(err);
	        	$scope.activityCreateError = err; // TODO UI to display this
	        }
	    );
    };

    $scope.buildActivityData = function() {
    	var activityData = {
    		actName: getValueOrNull($scope.actName),
    		modality: getValueOrNull($scope.modality),
    		dur_mon: getValueOrNull($scope.dur_mon),
    		dur_d: getValueOrNull($scope.dur_d),
    		dur_h: getValueOrNull($scope.dur_h),
    		dur_min: getValueOrNull($scope.dur_min),
    		org: getValueOrNull($scope.org),
    		group_number: getValueOrNull($scope.group_number),
    		people_per_group: getValueOrNull($scope.people_per_group),
    		technologies: $scope.appendInputToItems($scope.technology, $scope.selectedTechnologies),
    		pract_descr: getValueOrNull($scope.pract_descr),
    		edu_descr: getValueOrNull($scope.edu_descr)
    	};
    	return activityData;
    }

    var getValueOrNull = function(value) {
    	return getValueOrDefault(value, null);
    };

    var getValueOrDefault = function(value, defaultVal) {
    	return value ? value : defaultVal;
    }

}]);