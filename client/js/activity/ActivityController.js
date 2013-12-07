angular.module('ledita-app')
.controller('ActCreateCtrl',
['$scope', 'TypeaheadHelper', '$log', 'LDEditService', 'ActivityService', function($scope, TypeaheadHelper, $log, LDEditService, ActivityService) {

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
    	var activityData = {
    		actName: $scope.actName,
    		modality: $scope.modality,
    		dur_mon: $scope.dur_mon,
    		dur_d: $scope.dur_d,
    		dur_h: $scope.dur_h,
    		dur_min: $scope.dur_min,
    		org: $scope.org,
    		group_number: $scope.group_number,
    		people_per_group: $scope.people_per_group,
    		technologies: $scope.appendInputToItems($scope.technology, $scope.selectedTechnologies),
    		pract_descr: $scope.pract_descr,
    		edu_descr: $scope.edu_descr
    	};
    	ActivityService.createActivity(currentLdId, activityData,
	        function(res) {
	        	$log.info('Activity created');
	        	// Hmm.. what should happen now?
	        	// Probably broadcast an event so that modal can be be closed from the other controller that launched it
	        	// And somehow, the new activity structure must be fetched from server, and underlying controller must put that in scope
	        },
	        function(err) {
	        	$log.error(err);
	        	$scope.activityCreateError = err; // TODO UI to display this
	        }
	    );
    };

}]);