'use strict';

describe('Typeahead Service', function() {

	beforeEach(module('ledita-app'));

    var service;
    var $httpBackend;

    var buildList = function(numItems, itemValue) {
    	var results = [];
    	for(var i=0; i<numItems; i++) {
    		results.push(itemValue + i);
    	};
    	return results;
    };

    beforeEach(inject(function (TypeaheadHelper) {
        service = TypeaheadHelper;
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

    it('Max number of results', function() {
    	var actual = service.getMaxNumberResults();
    	expect(actual).toEqual(15);
    });

    it('Gets Scopes', function() {
    	var maxNumResults = service.getMaxNumberResults();
    	var scope = 'Le';
    	var scopeMatches = buildList(maxNumResults, scope);

		$httpBackend.expect('GET', '/reference/scopes/' + scope).respond(200, scopeMatches);
    	
    	service.getScopes(scope).then(function(data) {
    		expect(data.length).toEqual(scopeMatches.length);
    		for(var i=0; i<scopeMatches.length; i++) {
    			expect(data[i]).toEqual(scopeMatches[i]);
    		};
  		});
    	
    	$httpBackend.flush();
    });

    it('Get Scopes returns first max number of results', function() {
    	var maxNumResults = service.getMaxNumberResults();
    	var scope = 'Le';
    	var scopeMatches = buildList(maxNumResults+1, scope);

		$httpBackend.expect('GET', '/reference/scopes/' + scope).respond(200, scopeMatches);
    	
    	service.getScopes(scope).then(function(data) {
    		expect(data.length).toEqual(scopeMatches.length - 1);
    		for(var i=0; i<scopeMatches.length-1; i++) {
    			expect(data[i]).toEqual(scopeMatches[i]);
    		};
  		});
    	
    	$httpBackend.flush();
    });

    it('Gets Subjects', function() {
    	var maxNumResults = service.getMaxNumberResults();
    	var subject = 'Subj';
    	var subjectMatches = buildList(maxNumResults, subject);

		$httpBackend.expect('GET', '/reference/subjects/' + subject).respond(200, subjectMatches);
    	
    	service.getSubjects(subject).then(function(data) {
    		expect(data.length).toEqual(subjectMatches.length);
    		for(var i=0; i<subjectMatches.length; i++) {
    			expect(data[i]).toEqual(subjectMatches[i]);
    		};
  		});
    	
    	$httpBackend.flush();
    });

    it('Get Subjects returns first max number of results', function() {
    	var maxNumResults = service.getMaxNumberResults();
    	var subject = 'Subj';
    	var subjectMatches = buildList(maxNumResults+1, subject);

		$httpBackend.expect('GET', '/reference/subjects/' + subject).respond(200, subjectMatches);
    	
    	service.getSubjects(subject).then(function(data) {
    		expect(data.length).toEqual(subjectMatches.length - 1);
    		for(var i=0; i<subjectMatches.length-1; i++) {
    			expect(data[i]).toEqual(subjectMatches[i]);
    		};
  		});
    	
    	$httpBackend.flush();
    });

    it('Gets Objectives', function() {
    	var maxNumResults = service.getMaxNumberResults();
    	var objective = 'Obj';
    	var objectiveMatches = buildList(maxNumResults, objective);

		$httpBackend.expect('GET', '/reference/objectives/' + objective).respond(200, objectiveMatches);
    	
    	service.getObjectives(objective).then(function(data) {
    		expect(data.length).toEqual(objectiveMatches.length);
    		for(var i=0; i<objectiveMatches.length; i++) {
    			expect(data[i]).toEqual(objectiveMatches[i]);
    		};
  		});
    	
    	$httpBackend.flush();
    });

    it('Get Objectives returns first max number of results', function() {
    	var maxNumResults = service.getMaxNumberResults();
    	var objective = 'Obj';
    	var objectiveMatches = buildList(maxNumResults+1, objective);

		$httpBackend.expect('GET', '/reference/objectives/' + objective).respond(200, objectiveMatches);
    	
    	service.getObjectives(objective).then(function(data) {
    		expect(data.length).toEqual(objectiveMatches.length - 1);
    		for(var i=0; i<objectiveMatches.length-1; i++) {
    			expect(data[i]).toEqual(objectiveMatches[i]);
    		};
  		});
    	
    	$httpBackend.flush();
    });

});