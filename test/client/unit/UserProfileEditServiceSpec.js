'use strict';

describe('User Profile Edit Service', function() {

	beforeEach(module('ledita-app'));

	var service;
	var $httpBackend;

	beforeEach(inject(function(UserProfileEditService) {
		service = UserProfileEditService;
	}));

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('Service is defined', function() {
		expect(service).toBeDefined();
	});

	it('Gets user profile', function() {
		var user = {id: 23, name: 'john'};
		var success = function(res) {
			expect(res).toEqual(user);
		};
		var error = function() {
			expect(false).toBe(true); // should not get here
		};
		$httpBackend.when('GET', '/userprofile').respond(user);
		service.getUserProfile(success, error);
		$httpBackend.flush();
	});

	describe('Should Update Field', function() {

		it('Is truthy if modified field is populated', function() {
			var modifiedField = 'foo';
			var result = service.shouldUpdate(modifiedField);
			expect(result).toBeTruthy();
		});

		it('Is falsy if modified field is empty', function() {
			var modifiedField = '';
			var result = service.shouldUpdate(modifiedField);
			expect(result).toBeFalsy();
		});

		it('Is falsy if modified field is null', function() {
			var modifiedField = null;
			var result = service.shouldUpdate(modifiedField);
			expect(result).toBeFalsy();
		});

		it('Is falsy if modified field is undefined', function() {
			var result = service.shouldUpdate();
			expect(result).toBeFalsy();
		});

	});

});