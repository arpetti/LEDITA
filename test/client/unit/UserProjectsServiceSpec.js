'use strict';

describe('User Projects Service', function() {

	beforeEach(module('ledita-app'));

	var service;
	var $httpBackend;

	beforeEach(inject(function(UserProjectsService) {
		service = UserProjectsService;
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

	it('Gets user projects - success', function() {
		var userId = 23;
		var serverResposeSuccess = {userInfo: {name: 'joe'}, userProjects: [{ld_name: 'LD1'}, {ld_name: 'LD2'}]};
		var success = function(res) {
			expect(res).toEqual(serverResposeSuccess);
		};
		var error = function() {
			expect(false).toBe(true); // should not get here
		};
		$httpBackend.when('GET', '/userprojects/23').respond(serverResposeSuccess);
		service.getUserProjects(userId, success, error);
		$httpBackend.flush();
	});

	it('Gets user projects - error', function() {
		var userId = 23;
		var serverResponseError = 'get failed';
		var success = function(res) {
			expect(false).toBe(true); // should not get here
		};
		var error = function(err) {
			expect(err).toEqual(serverResponseError);
		};
		$httpBackend.when('GET', '/userprojects/23').respond(500, serverResponseError);
		service.getUserProjects(userId, success, error);
		$httpBackend.flush();
	});

});