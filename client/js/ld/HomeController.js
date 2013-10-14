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
['$scope', '$timeout', function($scope, $timeout) {
    $scope.createLD = function () {
        $scope.beOpen = true;
    };

    $scope.closeLD = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.beOpen = false;
    };

    $scope.$on('closeLdCreateModal', function (event) {
        $timeout(function () {
            $scope.closeLD();
        }, 10);
    });

    $scope.opts = {
        backdropFade: true,
        dialogFade:true,
        backdropClick: false
    };

}]);

angular.module('ledita-app')
.controller('LdCreateCtrl',
['$rootScope', '$scope', '$http', 'Home', 'TypeaheadHelper', '$location', 
function($rootScope, $scope, $http, Home, TypeaheadHelper, $location) {

	Home.getQcers(function(res) {
        $scope.qceropts = res;
    }, function(err) {
        $scope.qcerError = err;
    });

    $scope.selectedQcers = {};
    $scope.selectedTopics = [];
    $scope.selectedObjectives = [];
    $scope.selectedPrerequisites = [];

    $scope.getScopes = function(scope) {
    	return TypeaheadHelper.getScopes(scope);
  	};

  	$scope.getSubjects = function(subject) {
    	return TypeaheadHelper.getSubjects(subject);
  	};

  	$scope.getObjectives = function(objective) {
    	return TypeaheadHelper.getObjectives(objective);
  	};

  	var addTopic = function(topic) {
  		$scope.selectedTopics.push(topic);
  	};

  	var clearCurrentTopic = function() {
  		$scope.ldTopic = " ";
  	};

  	$scope.addTopicFromSuggestion = function() {
  		addTopic($scope.ldTopic);
  		clearCurrentTopic();
  	};

  	$scope.addTopicFromUserInput = function($event) {
        $event.preventDefault();
        addTopic($scope.ldTopic);
        clearCurrentTopic();
    };

  	var addObjective = function(objective) {
  		$scope.selectedObjectives.push(objective);
  	};

  	var clearCurrentObjective = function() {
  		$scope.ldObjective = " ";
  	};

  	$scope.addObjectiveFromSuggestion = function() {
  		addObjective($scope.ldObjective);
  		clearCurrentObjective();
  	};

  	$scope.addObjectiveFromUserInput = function($event) {
        $event.preventDefault();
        addObjective($scope.ldObjective);
        clearCurrentObjective();
    };

    var addPrerequisite = function(prerequisite) {
  		$scope.selectedPrerequisites.push(prerequisite);
  	};

  	var clearCurrentPrerequisite = function() {
  		$scope.ldRequisite = " ";
  	};

  	$scope.addPrerequisiteFromSuggestion = function() {
  		addPrerequisite($scope.ldRequisite);
  		clearCurrentPrerequisite();
  	};

  	$scope.addPrerequisiteFromUserInput = function($event) {
        $event.preventDefault();
        addPrerequisite($scope.ldRequisite);
        clearCurrentPrerequisite();
    };

    $scope.appendInputToItems = function(item, items) {
    	if(item && item.length > 0 && item !== " ") {
    		return items.concat(item);
    	} else {
    		return items;
    	};
    };

    var removeItem = function(item, list) {
		var index = list.indexOf(item);
    	if(index >-1){
    		list.splice(index,1);
		}
    };

    $scope.removeTopic = function(topic) {
    	removeItem(topic, $scope.selectedTopics);
    };

    $scope.removeObjective = function(objective) {
    	removeItem(objective, $scope.selectedObjectives);
    };

    $scope.removePrerequisite = function(prerequisite) {
    	removeItem(prerequisite, $scope.selectedPrerequisites);
    };

    $scope.submitLD = function() {
    	Home.createLd({
    		name: $scope.ldName,
    		qcers: $scope.selectedQcers,
    		scope: $scope.ldScope,
    		topics: $scope.appendInputToItems($scope.ldTopic, $scope.selectedTopics),
    		objectives: $scope.appendInputToItems($scope.ldObjective, $scope.selectedObjectives),
    		requisites: $scope.appendInputToItems($scope.ldRequisite, $scope.selectedPrerequisites),
    		studentsDescription: $scope.ldStudentsDescr
    	},
        function(res) {
        	$scope.ldCreateErrors = null;
            $location.path('/ldedit/' + res.ldid);
            $rootScope.$broadcast('closeLdCreateModal');
        },
        function(err) {
            $scope.ldCreateErrors = err;
        });
    };

}]);