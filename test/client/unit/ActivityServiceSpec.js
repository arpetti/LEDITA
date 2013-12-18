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

  it('Adds a resource to an empty list', function() {
  	var resource = {
  		name : "resource name",
  		type : "reource type",
  		descr : "resource description",
  		link : "http://resource.link"
  	}
  	expect(service.getResources().length).toEqual(0);
  	service.addResource(resource);
  	expect(service.getResources().length).toEqual(1);
  });

  it('Adds multiple resources', function() {
  	var resource1 = {
  		name : "resource name",
  		type : "reource type",
  		descr : "resource description",
  		link : "http://resource.link"
  	}
  	expect(service.getResources().length).toEqual(0);
  	service.addResource(resource1);
  	expect(service.getResources().length).toEqual(1);

  	var resource2 = {
  		name : "resource name 2",
  		type : "reource type 2",
  		descr : "resource description 2",
  		link : "http://resource.link.2"
  	}
  	service.addResource(resource2);
  	expect(service.getResources().length).toEqual(2);
  });

  it('Resets resources', function() {
  	var resource = {name: "something"};
  	expect(service.getResources().length).toEqual(0);
  	service.addResource(resource);
  	expect(service.getResources().length).toEqual(1);
  	service.resetResources();
  	expect(service.getResources().length).toEqual(0);
  });

});