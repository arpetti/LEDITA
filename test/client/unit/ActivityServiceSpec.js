'use strict';

describe('Activity Service', function() {

	beforeEach(module('ledita-app'));

    var service;

    beforeEach(inject(function (ActivityService) {
        service = ActivityService;
    }));

    it('Service is defined', function () {
        expect(service).toBeDefined();
    });

    it('Parses Drag Source', function() {
    	var dragElementId = '10-LD-2-1';
    	var actual = service.parseDragSource(dragElementId);
    	expect(actual.nodeId).toEqual('10');
    	expect(actual.nodeType).toEqual('LD');
    	expect(actual.level).toEqual(2);
    	expect(actual.position).toEqual(1);
    });

});