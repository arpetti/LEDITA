'use strict';

describe('Activity Service', function() {

	beforeEach(module('ledita-app'));

	var service;
	var $httpBackend;

	beforeEach(inject(function (ActivityService) {
		service = ActivityService;
	}));

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
	}));

	afterEach(function() {
	  $httpBackend.verifyNoOutstandingExpectation();
	  $httpBackend.verifyNoOutstandingRequest();
	});

	it('Service is defined', function () {
    expect(service).toBeDefined();
  });

  it('Creates an activity', function() {
  	var ldId = 8;
  	var activityData = {"actName": "my new activity"};
  	var activityCreated = {"id": 34};

  	var success = function(res) {
    	expect(res.id).toEqual(activityCreated.id);
    };
		var error = function() {
			expect(false).toBe(true); // should not get here
		};

		$httpBackend.when('POST', '/learningdesign/activity/' + ldId, activityData).respond(activityCreated);
    service.createActivity(ldId, activityData, success, error);
    $httpBackend.flush();

  });

});