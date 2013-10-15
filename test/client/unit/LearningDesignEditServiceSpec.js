'use strict';

describe('Learning Design Edit Service', function() {

	beforeEach(module('ledita-app'));

    var service;

    beforeEach(inject(function (LDEditService) {
        service = LDEditService;
    }));

    it('Service is defined', function () {
        expect(service).toBeDefined();
    });

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

});