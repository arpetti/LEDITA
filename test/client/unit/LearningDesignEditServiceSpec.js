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

    	it('Finds matches', function() {
    		var ldQcers = [{"qcer_name": "A1"}, {"qcer_name": "A2"}];
    		var results = service.generateSelectedQcers(ldQcers, qcerOpts);
    		expect(results[1]).toBe(true);
    		expect(results[2]).toBe(true);
    		expect(results[3]).toBe(undefined);
    		expect(results[4]).toBe(undefined);
    		expect(results[5]).toBe(undefined);
    		expect(results[6]).toBe(undefined);
    	});

    });

});