'use strict';

describe('Learning Design Edit Service', function() {

	beforeEach(module('ledita-app'));

    var service;
    var $httpBackend;
    var ldId = 7;
    var ldData = {"ld_id": 7};
    var ldName = {ldName: "update name"};

    beforeEach(inject(function (LDEditService) {
        service = LDEditService;
    }));

    beforeEach(inject(function($injector) {
  		$httpBackend = $injector.get('$httpBackend');
  		$httpBackend.when('GET', '/learningdesign/' + ldId).respond(ldData);
  		$httpBackend.when('PUT', '/learningdesign/name/' + ldId, ldName).respond(ldName);
	}));

	afterEach(function() {
	  $httpBackend.verifyNoOutstandingExpectation();
	  $httpBackend.verifyNoOutstandingRequest();
	});

    it('Service is defined', function () {
        expect(service).toBeDefined();
    });

    it('Gets a Learning Design by ID', function() {
    	var success = function(res) {
    		expect(res.ld_id).toEqual(ldData.ld_id);
    	};
		var error = function() {
			expect(false).toBe(true); // should not get here
		};

    	service.getLearningDesign(ldId, success, error);
    	$httpBackend.flush();
    });

    it('Updates LD Name', function() {
    	var success = function(res) {
    		expect(res.ldName).toEqual(ldName.ldName);
    	};
		var error = function() {
			expect(false).toBe(true); // should not get here
		};

    	service.updateLdName(ldId, ldName, success, error);
    	$httpBackend.flush();
    })

    describe('Generate selected qcers', function() {

    	var qcerOpts = [
    		{"id":1,"name":"A1"},
    		{"id":2,"name":"A2"},
    		{"id":3,"name":"B1"},
    		{"id":4,"name":"B2"},
    		{"id":5,"name":"C1"},
    		{"id":6,"name":"C2"}
    	];

    	it('Maps multiple selected qcer names to their corresponding qcer IDs', function() {
    		var ldQcers = [{"qcer_name": "A1"}, {"qcer_name": "C1"}, {"qcer_name": "B2"}];
    		var results = service.generateSelectedQcers(ldQcers, qcerOpts);
    		
    		expect(results[1]).toBe(true);
    		expect(results[2]).toBe(undefined);
    		expect(results[3]).toBe(undefined);
    		expect(results[4]).toBe(true);
    		expect(results[5]).toBe(true);
    		expect(results[6]).toBe(undefined);
    	});

    	it('Maps a single selected qcer name to its corresponding qcer ID', function() {
    		var ldQcers = [{"qcer_name": "C2"}];
    		var results = service.generateSelectedQcers(ldQcers, qcerOpts);
    		
    		expect(results[1]).toBe(undefined);
    		expect(results[2]).toBe(undefined);
    		expect(results[3]).toBe(undefined);
    		expect(results[4]).toBe(undefined);
    		expect(results[5]).toBe(undefined);
    		expect(results[6]).toBe(true);
    	});

    	it('Handles LD with no selected qcers', function() {
    		var ldQcers = [];
    		var results = service.generateSelectedQcers(ldQcers, qcerOpts);
    		
    		expect(results[1]).toBe(undefined);
    		expect(results[2]).toBe(undefined);
    		expect(results[3]).toBe(undefined);
    		expect(results[4]).toBe(undefined);
    		expect(results[5]).toBe(undefined);
    		expect(results[6]).toBe(undefined);
    	});

    });

	describe('Extract Topic Names', function() {

		it('Extracts names from list with multiple items', function() {
			var ldTopics = [{"subject_name":"Topic 1"},{"subject_name":"Topic 5"}];
			var results = service.extractTopicNames(ldTopics);

			expect(results.length).toEqual(2);
			expect(results[0]).toEqual("Topic 1");
			expect(results[1]).toEqual("Topic 5");
		});

		it('Extracts name from list with single item', function() {
			var ldTopics = [{"subject_name":"Topic 5"}];
			var results = service.extractTopicNames(ldTopics);

			expect(results.length).toEqual(1);
			expect(results[0]).toEqual("Topic 5");
		});

		it('Returns empty list when input is empty', function() {
			var ldTopics = [];
			var results = service.extractTopicNames(ldTopics);
			expect(results.length).toEqual(0);
		});
	});

	describe('Extract Objective Names', function() {

		it('Extracts names from list with multiple items', function() {
			var ldObjectives = [{"objective_descr":"Objective 1"},{"objective_descr":"Objective 6"}];
			var results = service.extractObjectiveNames(ldObjectives);

			expect(results.length).toEqual(2);
			expect(results[0]).toEqual("Objective 1");
			expect(results[1]).toEqual("Objective 6");
		});

		it('Extracts name from list with single item', function() {
			var ldObjectives = [{"objective_descr":"Objective 6"}];
			var results = service.extractObjectiveNames(ldObjectives);

			expect(results.length).toEqual(1);
			expect(results[0]).toEqual("Objective 6");
		});

		it('Returns empty list when input is empty', function() {
			var ldObjectives = [];
			var results = service.extractObjectiveNames(ldObjectives);
			expect(results.length).toEqual(0);
		});
	});

	describe('Extract Prerequisite Names', function() {

		it('Extracts names from list with multiple items', function() {
			var ldPrerequisites = [
				{"prereq_name":"Objective 1","prereq_type":"OBJECTIVE"},
				{"prereq_name":"Objective 2","prereq_type":"OBJECTIVE"}
			];
			var results = service.extractPrerequisiteNames(ldPrerequisites);

			expect(results.length).toEqual(2);
			expect(results[0]).toEqual("Objective 1");
			expect(results[1]).toEqual("Objective 2");
		});

		it('Extracts name from list with single item', function() {
			var ldPrerequisites = [
				{"prereq_name":"Objective 1","prereq_type":"OBJECTIVE"}
			];
			var results = service.extractPrerequisiteNames(ldPrerequisites);

			expect(results.length).toEqual(1);
			expect(results[0]).toEqual("Objective 1");
		});

		it('Returns empty list when input is empty', function() {
			var ldPrerequisites = [];
			var results = service.extractPrerequisiteNames(ldPrerequisites);
			expect(results.length).toEqual(0);
		});
	});

});