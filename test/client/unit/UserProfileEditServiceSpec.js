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

	it('Updates First Name', function() {
		var userData = {firstName: 'johnny'};
		var serverResponseSuccess = {};
		var success = function(res) {
			expect(res).toEqual(serverResponseSuccess);
		};
		var error = function() {
			expect(false).toBe(true); // should not get here
		};
		$httpBackend.when('PUT', '/userprofile/firstname', userData).respond(serverResponseSuccess);
    service.updateFirstName(userData, success, error);
    $httpBackend.flush();
	});

	it('Updates Last Name Success', function() {
		var userData = {lastName: 'brown'};
		var serverResponseSuccess = {};
		var success = function(res) {
			expect(res).toEqual(serverResponseSuccess);
		};
		var error = function() {
			expect(false).toBe(true); // should not get here
		};
		$httpBackend.when('PUT', '/userprofile/lastname', userData).respond(200, serverResponseSuccess);
    service.updateLastName(userData, success, error);
    $httpBackend.flush();
	});

	it('Updates Last Name Error', function() {
		var userData = {lastName: 'brown'};
		var serverResponseError = 'update failed';
		var success = function(res) {
			expect(false).toBe(true); // should not get here
		};
		var error = function(err) {
			expect(err).toEqual(serverResponseError);
		};
		$httpBackend.when('PUT', '/userprofile/lastname', userData).respond(500, serverResponseError);
    service.updateLastName(userData, success, error);
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