'use strict';


ddescribe('Activity Controller', function() {

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
  		scope.actName = "my new activity";
  		scope.modality = 1;
  		scope.dur_mon = 2;
  		scope.dur_d = 3;
  		scope.dur_h = 4;
  		scope.dur_min = 5;
  		scope.org = 4;
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

});