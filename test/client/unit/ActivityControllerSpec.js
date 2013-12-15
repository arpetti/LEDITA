'use strict';


describe('Activity Controller', function() {

	var scope;
	var ctrl;

	beforeEach(module('ledita-app'));

	beforeEach(inject(function($controller, $rootScope) {
  	scope = $rootScope.$new();
  	ctrl = $controller('ActCreateCtrl', {
    		$scope: scope
  	});
	}));

	it('Controller is defined', function() {
    expect(ctrl).not.toEqual(null);
  });

  describe('Build Activity Data', function() {

  	it('Builds a fully populated Activity from scope', function() {
  		scope.selectedTechnologies = ['techA'];
  		scope.actName = 'my new activity';
  		scope.modality = '1';
  		scope.dur_mon = 2;
  		scope.dur_d = 3;
  		scope.dur_h = 4;
  		scope.dur_min = 5;
  		scope.org = '4';
  		scope.group_number = 6;
  		scope.people_per_group = 7;
  		scope.technology = 'techB';
  		scope.pract_descr = 'practical description';
  		scope.edu_descr = 'educational description';

	  	var result = scope.buildActivityData();
	  	
	  	expect(result.actName).toEqual(scope.actName);
	  	expect(result.modality).toEqual(scope.modality);
	  	expect(result.dur_mon).toEqual(scope.dur_mon);
	  	expect(result.dur_d).toEqual(scope.dur_d);
	  	expect(result.dur_h).toEqual(scope.dur_h);
	  	expect(result.dur_min).toEqual(scope.dur_min);
	  	expect(result.org).toEqual(scope.org);
	  	expect(result.group_number).toEqual(scope.group_number);
	  	expect(result.people_per_group).toEqual(scope.people_per_group);
	  	expect(result.technologies).toEqual(['techA', 'techB']);
	  	expect(result.pract_descr).toEqual(scope.pract_descr);
	  	expect(result.edu_descr).toEqual(scope.edu_descr);
  	});

		it('Builds an Activity with properties null when not found on scope', function() {
			var result = scope.buildActivityData();
	  	
	  	expect(result.actName).toBe(null);
	  	expect(result.modality).toBe(null);
	  	expect(result.dur_mon).toBe(null);
	  	expect(result.dur_d).toBe(null);
	  	expect(result.dur_h).toBe(null);
	  	expect(result.dur_min).toBe(null);
	  	expect(result.org).toBe(null);
	  	expect(result.group_number).toBe(null);
	  	expect(result.people_per_group).toBe(null);
	  	expect(result.technologies).toEqual([]);
	  	expect(result.pract_descr).toBe(null);
	  	expect(result.edu_descr).toBe(null);
		});

  });

	describe('Build Resource Data', function() {

		it('Adds a single resource to the resource list', function() {
			scope.resourceName = 'Basic Pronounciation';
			scope.resourceType = 'Podcast';
			scope.resourceDescr = 'Helpful listening for proper pronounciation';
			scope.resourceLink = 'http://itunes.com/awesome/pronounciation';

			// Before adding the resource, list should be empty
			expect(scope.resources.length).toEqual(0);
			
			scope.addResource();
			
			// After adding resource, list should contain one item
			expect(scope.resources.length).toEqual(1);
			expect(scope.resources[0].name).toEqual(scope.resourceName);
			expect(scope.resources[0].type).toEqual(scope.resourceType);
			expect(scope.resources[0].descr).toEqual(scope.resourceDescr);
			expect(scope.resources[0].link).toEqual(scope.resourceLink);
		});

		it('Adds multiple resources to the resource list', function() {
			
			// First Resource
			scope.resourceName = 'Basic Pronounciation';
			scope.resourceType = 'Podcast';
			scope.resourceDescr = 'Helpful listening for proper pronounciation';
			scope.resourceLink = 'http://itunes.com/awesome/pronounciation';

			// Before adding the resource, list should be empty
			expect(scope.resources.length).toEqual(0);
			
			scope.addResource();

			// After adding first resource, list should contain one item
			expect(scope.resources.length).toEqual(1);

			// Second Resource
			scope.resourceName = 'Resource 2';
			scope.resourceType = 'Whitepaper';
			scope.resourceDescr = 'Advanced research topic';
			scope.resourceLink = 'http://whitepapers.edu';

			scope.addResource();

			// After adding second resource, list should contain two items
			expect(scope.resources.length).toEqual(2);

			// Verify list contents
			expect(scope.resources[0].name).toEqual('Basic Pronounciation');
			expect(scope.resources[0].type).toEqual('Podcast');
			expect(scope.resources[0].descr).toEqual('Helpful listening for proper pronounciation');
			expect(scope.resources[0].link).toEqual('http://itunes.com/awesome/pronounciation');
			expect(scope.resources[1].name).toEqual('Resource 2');
			expect(scope.resources[1].type).toEqual('Whitepaper');
			expect(scope.resources[1].descr).toEqual('Advanced research topic');
			expect(scope.resources[1].link).toEqual('http://whitepapers.edu');
		});

	});

});