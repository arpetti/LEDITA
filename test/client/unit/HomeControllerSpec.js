'use strict';


describe('Create Learning Design Controller', function() {

	var clearSuggestion = " ";
	var scope, ctrl, $httpBackend;
	var mockHomeService = {
		getQcers: function (res) {
    		return [];
    	}
	};

	beforeEach(module('ledita-app'));

	beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
    	scope = $rootScope.$new();
    	$httpBackend = _$httpBackend_;
    	ctrl = $controller('LdCreateCtrl', {
      		$scope: scope,
      		Home: mockHomeService
    	});
	}));

	it('Controller is defined', function() {
    	expect(ctrl).not.toEqual(null);
  	});

  	describe('Topic', function() {

	  	it('Add topic from suggestion adds to selected topics and clears the current topic', function() {
	  		var suggestion = "Topic 1";
	  		scope.ldTopic = suggestion;
	  		
	  		scope.addTopicFromSuggestion();
	  		
	  		expect(scope.selectedTopics.length).toEqual(1);
	  		expect(scope.selectedTopics[0]).toEqual(suggestion);
	  		expect(scope.ldTopic).toEqual(clearSuggestion);
	  	});

	  	it('Add topic from user input adds to selected topics and clears the current topic', function() {
	  		var userAddedTopic = "My New Topic ABC";
	  		var mockEvent = {
	  			preventDefault: function() {}
	  		}
	  		scope.ldTopic = userAddedTopic;

	  		spyOn(mockEvent, 'preventDefault');
	  		
	  		scope.addTopicFromUserInput(mockEvent);
	  		
	  		expect(mockEvent.preventDefault).toHaveBeenCalled();
	  		expect(scope.selectedTopics.length).toEqual(1);
	  		expect(scope.selectedTopics[0]).toEqual(userAddedTopic);
	  		expect(scope.ldTopic).toEqual(clearSuggestion);
	  	});
	  	
  	});

  	describe('Objective', function() {

	  	it('Add objective from suggestion adds to selected objectives and clears the current objective', function() {
	  		var suggestion = "Objective 1";
	  		scope.ldObjective = suggestion;
	  		
	  		scope.addObjectiveFromSuggestion();
	  		
	  		expect(scope.selectedObjectives.length).toEqual(1);
	  		expect(scope.selectedObjectives[0]).toEqual(suggestion);
	  		expect(scope.ldObjective).toEqual(clearSuggestion);
	  	});

	  	it('Add objective from user input adds to selected objectives and clears the current objective', function() {
	  		var userAddedObjective = "My New Objective XYZ";
	  		var mockEvent = {
	  			preventDefault: function() {}
	  		}
	  		scope.ldObjective = userAddedObjective;

	  		spyOn(mockEvent, 'preventDefault');
	  		
	  		scope.addObjectiveFromUserInput(mockEvent);
	  		
	  		expect(mockEvent.preventDefault).toHaveBeenCalled();
	  		expect(scope.selectedObjectives.length).toEqual(1);
	  		expect(scope.selectedObjectives[0]).toEqual(userAddedObjective);
	  		expect(scope.ldObjective).toEqual(clearSuggestion);
	  	});

  	});


});