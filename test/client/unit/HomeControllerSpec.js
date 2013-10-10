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

	  	it('Removes topic from middle of list', function() {
	  		var topics = ["Topic 1", "Topic 2", "Topic 3"];
	  		scope.selectedTopics = topics;

	  		scope.removeTopic("Topic 2");

	  		expect(scope.selectedTopics.length).toEqual(2);
	  		expect(scope.selectedTopics[0]).toEqual("Topic 1");
	  		expect(scope.selectedTopics[1]).toEqual("Topic 3");
	  	});

	  	it('Removes topic from beginning of list', function() {
	  		var topics = ["Topic 1", "Topic 2", "Topic 3"];
	  		scope.selectedTopics = topics;

	  		scope.removeTopic("Topic 1");

	  		expect(scope.selectedTopics.length).toEqual(2);
	  		expect(scope.selectedTopics[0]).toEqual("Topic 2");
	  		expect(scope.selectedTopics[1]).toEqual("Topic 3");
	  	});

	  	it('Removes topic from end of list', function() {
	  		var topics = ["Topic 1", "Topic 2", "Topic 3"];
	  		scope.selectedTopics = topics;

	  		scope.removeTopic("Topic 3");

	  		expect(scope.selectedTopics.length).toEqual(2);
	  		expect(scope.selectedTopics[0]).toEqual("Topic 1");
	  		expect(scope.selectedTopics[1]).toEqual("Topic 2");
	  	});

	  	it('Remove does nothing if topic not found in list', function() {
	  		var topics = ["Topic 1", "Topic 2", "Topic 3"];
	  		scope.selectedTopics = topics;

	  		scope.removeTopic("Topic 999");

	  		expect(scope.selectedTopics.length).toEqual(3);
	  		expect(scope.selectedTopics[0]).toEqual("Topic 1");
	  		expect(scope.selectedTopics[1]).toEqual("Topic 2");
	  		expect(scope.selectedTopics[2]).toEqual("Topic 3");
	  	});

	  	it('Remove does nothing if topic is null', function() {
	  		var topics = ["Topic 1", "Topic 2", "Topic 3"];
	  		scope.selectedTopics = topics;

	  		scope.removeTopic(null);

	  		expect(scope.selectedTopics.length).toEqual(3);
	  		expect(scope.selectedTopics[0]).toEqual("Topic 1");
	  		expect(scope.selectedTopics[1]).toEqual("Topic 2");
	  		expect(scope.selectedTopics[2]).toEqual("Topic 3");
	  	});

	  	it('Remove does nothing if topic is undefined', function() {
	  		var topics = ["Topic 1", "Topic 2", "Topic 3"];
	  		scope.selectedTopics = topics;

	  		scope.removeTopic();

	  		expect(scope.selectedTopics.length).toEqual(3);
	  		expect(scope.selectedTopics[0]).toEqual("Topic 1");
	  		expect(scope.selectedTopics[1]).toEqual("Topic 2");
	  		expect(scope.selectedTopics[2]).toEqual("Topic 3");
	  	});

	  	it('Removes objective from middle of list', function() {
	  		var objectives = ["Objective 1", "Objective 2", "Objective 3"];
	  		scope.selectedObjectives = objectives;

	  		scope.removeObjective("Objective 2");

	  		expect(scope.selectedObjectives.length).toEqual(2);
	  		expect(scope.selectedObjectives[0]).toEqual("Objective 1");
	  		expect(scope.selectedObjectives[1]).toEqual("Objective 3");
	  	});

	  	it('Removes prerequisite from middle of list', function() {
	  		var prerequisites = ["Prerequisite 1", "Prerequisite 2", "Prerequisite 3"];
	  		scope.selectedPrerequisites = prerequisites;

	  		scope.removePrerequisite("Prerequisite 2");

	  		expect(scope.selectedPrerequisites.length).toEqual(2);
	  		expect(scope.selectedPrerequisites[0]).toEqual("Prerequisite 1");
	  		expect(scope.selectedPrerequisites[1]).toEqual("Prerequisite 3");
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

	describe('Append item to items', function() {

		it('Appends a non empty item', function() {
			var item = 'Add me';
			var items = ['something 1', 'something 2'];
			
			var newItems = scope.appendInputToItems(item, items);

			expect(newItems.length).toEqual(3);
			expect(newItems[0]).toEqual(items[0]);
			expect(newItems[1]).toEqual(items[1]);
			expect(newItems[2]).toEqual(item);
		});

		it('Does not append a single space item', function() {
			var item = ' ';
			var items = ['something 1', 'something 2'];
			
			var newItems = scope.appendInputToItems(item, items);

			expect(newItems.length).toEqual(2);
			expect(newItems[0]).toEqual(items[0]);
			expect(newItems[1]).toEqual(items[1]);
		});

		it('Does not append an empty item', function() {
			var item = '';
			var items = ['something 1', 'something 2'];
			
			var newItems = scope.appendInputToItems(item, items);

			expect(newItems.length).toEqual(2);
			expect(newItems[0]).toEqual(items[0]);
			expect(newItems[1]).toEqual(items[1]);
		});

		it('Does not append a null item', function() {
			var item = null;
			var items = ['something 1', 'something 2'];
			
			var newItems = scope.appendInputToItems(item, items);

			expect(newItems.length).toEqual(2);
			expect(newItems[0]).toEqual(items[0]);
			expect(newItems[1]).toEqual(items[1]);
		});

		it('Does not append an undefined item', function() {
			var item = undefined;
			var items = ['something 1', 'something 2'];
			
			var newItems = scope.appendInputToItems(item, items);

			expect(newItems.length).toEqual(2);
			expect(newItems[0]).toEqual(items[0]);
			expect(newItems[1]).toEqual(items[1]);
		});

	});

});